"""vectorlab — vectorization management for the Marauders workbench.

Same interface as the rest: these tools mount onto the marauders-state MCP
server, so one endpoint manages state + memory + vectorization.

What it does:
  * embed any file with a chosen OpenRouter embedding model
  * store the vectors in your holystone Postgres (model-tagged corpus) AND/OR
    as a portable local file named by model (so you can try other vectorizations)
  * keep a MANIFEST recording, per corpus: model, dim, input-mode, and which
    source files are already incorporated (with hashes) — so you always know
    which corpus pairs with which query model

Key truth: embeddings are model-specific. A corpus embedded with model X can
only be queried with model X (same dimension). That's why every corpus is
tagged with its model, in the project_id, the local filename, and the manifest.
"""
from __future__ import annotations
import json, os, re, math, hashlib, datetime
from pathlib import Path

PKG = Path(__file__).resolve().parent
STATE_DIR = Path(os.environ.get("MARAUDERS_STATE_DIR", PKG.parent / "state"))
MANIFEST = STATE_DIR / "corpus_manifest.json"
# Local vector store lives OUTSIDE the synced repo (large, regenerable, and the
# mounted-folder permission bridge can't be written to). Defaults to the home dir,
# matching holystone's ~/.narrator-state pattern. Override with MARAUDERS_VECTORS_DIR.
VEC_DIR = Path(os.environ.get("MARAUDERS_VECTORS_DIR",
               Path.home() / ".narrator-state" / "marauders" / "vectors"))

def _hs():
    """Import holystone lazily (chunking/openrouter/db)."""
    from holystone import chunking, openrouter, db
    return chunking, openrouter, db

def model_slug(model: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", model.lower()).strip("-")

def tagged_project(base: str, model: str) -> str:
    """Model-tagged corpus id, e.g. marauders@nvidia-...-2048 (dim added later)."""
    return f"{base}@{model_slug(model)}"

def _sha1(p: Path) -> str:
    return hashlib.sha1(p.read_bytes()).hexdigest()[:12]

def load_manifest() -> dict:
    if MANIFEST.exists():
        return json.loads(MANIFEST.read_text(encoding="utf-8"))
    return {"_about": "Which source files are embedded into which corpus, with which model. "
                      "Embeddings are model-specific: query a corpus only with its `model`.",
            "corpora": {}}

def save_manifest(m: dict) -> None:
    m["updated"] = datetime.datetime.now().isoformat(timespec="seconds")
    MANIFEST.write_text(json.dumps(m, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

def _cosine(a, b):
    s=da=db_=0.0
    for x, y in zip(a, b):
        s += x*y; da += x*x; db_ += y*y
    return s / (math.sqrt(da)*math.sqrt(db_) + 1e-9)

# ---------------------------------------------------------------- embed
def embed_file(path: str, project: str = "marauders", model: str | None = None,
               input_mode: str | None = None, store: str = "both",
               session: str | None = None, date: str | None = None) -> dict:
    """Embed one file into a model-tagged corpus. store: 'db' | 'local' | 'both'.
    Returns a summary and updates the manifest."""
    chunking, openrouter, db = _hs()
    model = model or os.environ.get("HOLYSTONE_EMBED_MODEL", "")
    input_mode = input_mode or os.environ.get("HOLYSTONE_EMBED_INPUT_TYPE_MODE", "param")
    src = Path(path)
    if not src.exists():
        return {"ok": False, "error": f"file not found: {path}"}
    text = src.read_text(encoding="utf-8", errors="replace")
    chunk_chars = int(os.environ.get("HOLYSTONE_CHUNK_CHARS", "6000"))
    chunks = chunking.split_chunks(text, max_chars=chunk_chars)
    session = session or src.stem
    vectors = openrouter.OpenRouter().embed(chunks, model=model, input_type="passage", mode=input_mode)
    dim = len(vectors[0])
    corpus_project = tagged_project(project, model)        # DB project_id (model-tagged)
    corpus_id = f"{corpus_project}-{dim}"                   # manifest + local-file key
    wrote = []

    if store in ("db", "both"):
        with db.connect() as conn:
            db.init_schema(conn); db.ensure_vector_column(conn, dim)
            db.upsert_chunks(conn, corpus_project, session, chunks, vectors,
                             source_file=src.name, in_fiction_date=date)
        wrote.append(f"db:{corpus_project}/{session}")

    local_file = None
    if store in ("local", "both"):
        VEC_DIR.mkdir(parents=True, exist_ok=True)
        local_file = VEC_DIR / f"{corpus_id}.vec.json"
        doc = json.loads(local_file.read_text(encoding="utf-8")) if local_file.exists() else {
            "model": model, "dim": dim, "input_mode": input_mode,
            "project": corpus_project, "items": []}
        # drop any prior items from this session, then add fresh
        doc["items"] = [it for it in doc["items"] if it.get("session") != session]
        for i, (txt, vec) in enumerate(zip(chunks, vectors)):
            doc["items"].append({"session": session, "idx": i, "source": src.name, "text": txt, "vec": vec})
        local_file.write_text(json.dumps(doc, ensure_ascii=False), encoding="utf-8")
        wrote.append(f"local:{local_file.name}")

    # manifest
    m = load_manifest()
    c = m["corpora"].setdefault(corpus_id, {
        "project_id": corpus_project, "model": model, "dim": dim,
        "input_mode": input_mode, "store": store,
        "local_file": (local_file.name if local_file else None),
        "created": datetime.datetime.now().isoformat(timespec="seconds"),
        "sessions": {}})
    c["store"] = store if c.get("store") == store else "both"
    if local_file: c["local_file"] = local_file.name
    c["sessions"][session] = {"source_file": src.name, "path": str(src),
                              "sha1": _sha1(src), "chunks": len(chunks),
                              "added": datetime.datetime.now().isoformat(timespec="seconds")}
    save_manifest(m)
    return {"ok": True, "corpus": corpus_id, "model": model, "dim": dim,
            "chunks": len(chunks), "wrote": wrote,
            "note": f"Query this corpus only with model '{model}' (dim {dim})."}

# ---------------------------------------------------------------- recall (local)
def local_recall(corpus_file: str, query: str, k: int = 4) -> dict:
    """Recall against a portable local vector file (embeds the query with that
    file's own model so the comparison is valid)."""
    chunking, openrouter, db = _hs()
    fp = Path(corpus_file)
    if not fp.is_absolute(): fp = VEC_DIR / corpus_file
    if not fp.exists(): return {"ok": False, "error": f"no such corpus file: {fp}"}
    doc = json.loads(fp.read_text(encoding="utf-8"))
    qvec = openrouter.OpenRouter().embed([query], model=doc["model"],
                                         input_type="query", mode=doc.get("input_mode", "param"))[0]
    scored = sorted(doc["items"], key=lambda it: _cosine(qvec, it["vec"]), reverse=True)[:k]
    return {"ok": True, "model": doc["model"], "hits": [
        {"session": it["session"], "idx": it["idx"], "score": round(_cosine(qvec, it["vec"]), 4),
         "text": it["text"][:600]} for it in scored]}

# ---------------------------------------------------------------- manage
def list_corpora() -> dict:
    return load_manifest()

def drop_db_corpus(project_id: str) -> dict:
    """Delete all chunks for a (model-tagged) project_id from the DB. For cleaning
    up vectorization experiments. Does not touch the manifest or local files."""
    chunking, openrouter, db = _hs()
    with db.connect() as conn, conn.cursor() as cur:
        cur.execute("delete from hs_chunks where project_id = %s", (project_id,))
        n = cur.rowcount; conn.commit()
    return {"ok": True, "deleted_rows": n, "project_id": project_id}

def list_embed_models() -> dict:
    """What you can embed with. OpenRouter does NOT enumerate embedding models in
    its /models API, so this is a curated note + your current default. Type any
    model id into embed_file to try it; for genuinely different vectorizations,
    use a local embedder and the local store."""
    return {
        "current_default": os.environ.get("HOLYSTONE_EMBED_MODEL", ""),
        "current_input_mode": os.environ.get("HOLYSTONE_EMBED_INPUT_TYPE_MODE", "param"),
        "openrouter_known_embedders": [
            "nvidia/llama-nemotron-embed-vl-1b-v2:free  (2048-d, input_mode=param)"],
        "note": ("OpenRouter is chat-first; it doesn't list embedding models, so a picker "
                 "can't auto-populate. Pass any model id to embed_file to try it (it succeeds "
                 "or errors, and the manifest records what worked)."),
        "other_vectorizations": ("To actually compare different vectorizations today, run a local "
                                 "embedder (e.g. sentence-transformers bge/MiniLM) and write to the "
                                 "local store; each model gets its own model-tagged corpus + file."),
    }

# ---------------------------------------------------------------- MCP registration
def register(mcp):
    """Attach vectorization tools to a FastMCP instance (same endpoint as state)."""
    @mcp.tool()
    def vec_list_corpora() -> str:
        """List embedded corpora: which files, which model, which dimension."""
        return json.dumps(list_corpora(), indent=2, ensure_ascii=False)

    @mcp.tool()
    def vec_list_models() -> str:
        """What embedding models are usable, and the same-model constraint."""
        return json.dumps(list_embed_models(), indent=2, ensure_ascii=False)

    @mcp.tool()
    def vec_embed_file(path: str, project: str = "marauders", model: str = "",
                       input_mode: str = "", store: str = "both",
                       session: str = "", date: str = "") -> str:
        """Embed a file into a model-tagged corpus (store: db|local|both). Updates the manifest."""
        return json.dumps(embed_file(path, project, model or None, input_mode or None,
                                     store, session or None, date or None),
                          indent=2, ensure_ascii=False)

    @mcp.tool()
    def vec_local_recall(corpus_file: str, query: str, k: int = 4) -> str:
        """Recall against a portable local vector file (embeds the query with its own model)."""
        return json.dumps(local_recall(corpus_file, query, k), indent=2, ensure_ascii=False)

    @mcp.tool()
    def vec_drop_corpus(project_id: str) -> str:
        """Delete a model-tagged corpus from the DB (cleanup for experiments)."""
        return json.dumps(drop_db_corpus(project_id), indent=2, ensure_ascii=False)
