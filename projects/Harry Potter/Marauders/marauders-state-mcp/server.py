"""marauders-state — a live FastMCP server over the campaign state JSON.

The source of truth stays the two files the rest of the toolchain already uses:
    ../state/marauders-state.json          (core)
    ../state/marauders-relationships.json  (standing registry)

This server is a thin, live API over them: the narrator reads/writes state
through MCP tools during play, and a panel artifact calls get_full() on load
to render it live. holystone's recall tools are mounted on the SAME server, so
one endpoint serves state AND memory (one URL, one token).

Run:
    # local stdio (Claude Desktop / Code) — narrator calls tools mid-play
    python server.py
    # remote/http (for the live artifact) — adds /rest + /health
    python server.py --http --host 0.0.0.0 --port 8800

Env:
    MARAUDERS_STATE_DIR   override the state dir (default: ../state)
    MARAUDERS_REST_TOKEN / HOLYSTONE_REST_TOKEN  bearer token for the /rest surface
"""
from __future__ import annotations
import argparse, json, os, sys, datetime, copy
from pathlib import Path

try:
    from mcp.server.fastmcp import FastMCP
except ModuleNotFoundError as exc:
    raise SystemExit("Needs the 'mcp' package: pip install 'mcp>=1.2'") from exc

PKG = Path(__file__).resolve().parent
STATE_DIR = Path(os.environ.get("MARAUDERS_STATE_DIR", PKG.parent / "state"))

# auto-load holystone/.env so recall + vectorization tools get OPENROUTER_API_KEY / DATABASE_URL
try:
    from dotenv import load_dotenv as _ld
    try:
        import holystone as _hs
        _hsenv = Path(_hs.__file__).resolve().parent.parent / ".env"
        if _hsenv.exists(): _ld(_hsenv)
    except Exception:
        pass
    for _e in [PKG / ".env", PKG.parent / ".env"]:
        if _e.exists(): _ld(_e)
    _ld()
except Exception:
    pass
CORE = STATE_DIR / "marauders-state.json"
REL  = STATE_DIR / "marauders-relationships.json"

mcp = FastMCP("marauders-state")

# ---- file helpers -----------------------------------------------------------
def _load(p: Path) -> dict:
    return json.loads(p.read_text(encoding="utf-8"))

def _save(p: Path, data: dict) -> None:
    p.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

def _touch(core: dict) -> None:
    core["last_reconciled"] = datetime.date.today().isoformat()

def _deep_merge(dst: dict, patch: dict) -> dict:
    for k, v in patch.items():
        if isinstance(v, dict) and isinstance(dst.get(k), dict):
            _deep_merge(dst[k], v)
        else:
            dst[k] = v
    return dst

# ---- read tools -------------------------------------------------------------
@mcp.tool()
def get_state(section: str | None = None) -> str:
    """Return the core campaign state (clock, player, money, creatures, lore,
    wand_projects, inventory_summary, open_threads, flags, ...). Pass `section`
    to return just one top-level key (e.g. 'clock', 'open_threads')."""
    d = _load(CORE)
    return json.dumps(d.get(section) if section else d, indent=2, ensure_ascii=False)

@mcp.tool()
def get_relationships(group: str | None = None, name: str | None = None) -> str:
    """Return the relationship registry. `group` (inner_circle, family,
    mentors_and_teachers, war_and_field, cohort_and_other) and `name` narrow it."""
    d = _load(REL)
    if group and name:
        return json.dumps(d.get(group, {}).get(name, {}), indent=2, ensure_ascii=False)
    if group:
        return json.dumps(d.get(group, {}), indent=2, ensure_ascii=False)
    return json.dumps(d, indent=2, ensure_ascii=False)

@mcp.tool()
def get_full() -> str:
    """Return {state, relationships} in one call — for the live panel artifact."""
    return json.dumps({"state": _load(CORE), "relationships": _load(REL)},
                      indent=2, ensure_ascii=False)

# ---- write tools ------------------------------------------------------------
@mcp.tool()
def update_state(patch_json: str) -> str:
    """Deep-merge a JSON patch into the core state and save. Example:
    update_state('{"clock":{"story_time":"~19:05"},"flags":{"crane_caught":true}}')"""
    core = _load(CORE)
    _deep_merge(core, json.loads(patch_json)); _touch(core); _save(CORE, core)
    return "ok: core state updated"

@mcp.tool()
def set_value(path: str, value_json: str) -> str:
    """Set one dotted path in the core state. Example:
    set_value('clock.location', '\"Hogwarts — the Bone Zone\"')"""
    core = _load(CORE); node = core; keys = path.split(".")
    for k in keys[:-1]:
        node = node.setdefault(k, {})
    node[keys[-1]] = json.loads(value_json); _touch(core); _save(CORE, core)
    return f"ok: set {path}"

@mcp.tool()
def add_thread(text: str) -> str:
    """Append an open thread."""
    core = _load(CORE); core.setdefault("open_threads", []).append(text)
    _touch(core); _save(CORE, core); return "ok: thread added"

@mcp.tool()
def resolve_thread(substring: str) -> str:
    """Remove the first open thread containing `substring`."""
    core = _load(CORE); ts = core.get("open_threads", [])
    for i, t in enumerate(ts):
        if substring.lower() in t.lower():
            removed = ts.pop(i); _touch(core); _save(CORE, core)
            return f"ok: resolved -> {removed}"
    return f"no open thread matched {substring!r}"

@mcp.tool()
def set_flag(name: str, value: bool = True) -> str:
    """Set a boolean flag in core.flags."""
    core = _load(CORE); core.setdefault("flags", {})[name] = bool(value)
    _touch(core); _save(CORE, core); return f"ok: flag {name}={bool(value)}"

@mcp.tool()
def update_relationship(group: str, name: str, patch_json: str) -> str:
    """Merge a JSON patch into one relationship entry (status/earned/last_status/...).
    ANTI-RESET: only raise standing or change last_status; never blank `earned`."""
    rel = _load(REL); grp = rel.setdefault(group, {})
    entry = grp.setdefault(name, {}); _deep_merge(entry, json.loads(patch_json))
    _save(REL, rel); return f"ok: {group}/{name} updated"

# ---- mount holystone recall (state + memory on one server) ------------------
def _mount_recall():
    try:
        from holystone.mcp_server import register as register_recall
        register_recall(mcp)
        return True
    except Exception as exc:  # holystone optional
        print(f"[marauders-state] holystone recall not mounted: {exc}", file=sys.stderr)
        return False

# ---- entrypoint -------------------------------------------------------------
def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__,
                                 formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--http", action="store_true", help="serve streamable-http + /rest")
    ap.add_argument("--host", default="127.0.0.1")
    ap.add_argument("--port", type=int, default=8800)
    ap.add_argument("--no-recall", action="store_true", help="don't mount holystone recall")
    args = ap.parse_args()

    if not args.no_recall:
        _mount_recall()
    try:
        import vectorlab
        vectorlab.register(mcp)
    except Exception as exc:
        print(f"[marauders-state] vectorlab not mounted: {exc}", file=sys.stderr)

    if args.http:
        os.environ.setdefault("HOLYSTONE_REST_TOKEN",
                              os.environ.get("MARAUDERS_REST_TOKEN", ""))
        try:
            from holystone import rest_patch
            names = rest_patch.apply(mcp)
            print(f"[rest] POST /rest/{{{','.join(names)}}} + GET /health", file=sys.stderr)
        except Exception as exc:
            print(f"[marauders-state] REST surface not mounted: {exc}", file=sys.stderr)
        mcp.settings.host = args.host; mcp.settings.port = args.port
        mcp.run(transport="streamable-http")
    else:
        mcp.run()  # stdio

if __name__ == "__main__":
    main()
