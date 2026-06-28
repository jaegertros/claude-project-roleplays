"""Embedding model switcher — pick which model powers live holystone recall.

Recall embeds each query with HOLYSTONE_EMBED_MODEL (from holystone/.env) and
searches the one hs_chunks vector column. So switching models = (1) rewrite that
.env lever and (2) re-embed the 'marauders' corpus with the new model (recreating
the column if its dimension changes). This menu does both, safely, resumably.

Run:  python embed_menu.py
"""
import os, sys, json, glob, re, time, shutil
from pathlib import Path

BASE=Path(__file__).resolve().parent; MAR=BASE.parent; STATE=MAR/"state"
RPDIR=MAR/"RP_chronological_cleaned_v4_bundle"/"RP_chronological_cleaned_v4"
try: import holystone
except ModuleNotFoundError:
    for c in [MAR.parents[3]/"holystone", MAR.parents[2]/"holystone"]:
        if (c/"holystone").exists(): sys.path.insert(0,str(c)); break
    import holystone
HS=Path(holystone.__file__).resolve().parent.parent; ENV=HS/".env"
try:
    from dotenv import load_dotenv
    for p in [ENV,BASE/".env",MAR/".env"]:
        if p.exists(): load_dotenv(p)
    load_dotenv()
except ModuleNotFoundError: pass
from holystone import db, corpus, chunking, openrouter

PROJECT="marauders"; CHUNK=1000; BATCH=32
SWPROG=BASE/"switch_progress.json"
# model -> (input_mode, dim) ; dims from the full trial
MODELS={
 "nvidia/llama-nemotron-embed-vl-1b-v2:free":("param",2048),
 "thenlper/gte-base":("none",768),
 "intfloat/e5-large-v2":("prefix",1024),
 "thenlper/gte-large":("none",1024),
 "sentence-transformers/multi-qa-mpnet-base-dot-v1":("none",768),
 "sentence-transformers/all-minilm-l6-v2":("none",384),
 "intfloat/e5-base-v2":("prefix",768),
 "intfloat/multilingual-e5-large":("prefix",1024),
 "sentence-transformers/all-mpnet-base-v2":("none",768),
 "sentence-transformers/paraphrase-minilm-l6-v2":("none",384),
 "perplexity/pplx-embed-v1-0.6b":("none",1024),
 "sentence-transformers/all-minilm-l12-v2":("none",384),
 "baai/bge-base-en-v1.5":("none",768),
}
def scores():
    try: return {r["model"]:r for r in json.load(open(BASE/"full_results.json"))}
    except Exception: return {}
def cur_model():
    return os.environ.get("HOLYSTONE_EMBED_MODEL","nvidia/llama-nemotron-embed-vl-1b-v2:free")
def col_dim():
    try:
        with db.connect() as c:
            r=c.execute("select atttypmod from pg_attribute where attrelid='hs_chunks'::regclass and attname='embedding'").fetchone()
            return (r[0] if r and r[0]>0 else None)
    except Exception as e: return f"?({type(e).__name__})"
def sessions():
    try:
        with db.connect() as c: return db.list_sessions(c,PROJECT)
    except Exception: return []
def files():
    return sorted(f for f in glob.glob(str(RPDIR/"RP_*.md")) if "report" not in f and "manifest" not in f)

def write_env(model,mode):
    if not ENV.exists(): print("  ! holystone/.env not found"); return False
    shutil.copy(ENV, str(ENV)+".bak")
    lines=ENV.read_text().splitlines(); got={"HOLYSTONE_EMBED_MODEL":False,"HOLYSTONE_EMBED_INPUT_TYPE_MODE":False}
    out=[]
    for ln in lines:
        if ln.startswith("HOLYSTONE_EMBED_MODEL="): out.append(f"HOLYSTONE_EMBED_MODEL={model}"); got["HOLYSTONE_EMBED_MODEL"]=True
        elif ln.startswith("HOLYSTONE_EMBED_INPUT_TYPE_MODE="): out.append(f"HOLYSTONE_EMBED_INPUT_TYPE_MODE={mode}"); got["HOLYSTONE_EMBED_INPUT_TYPE_MODE"]=True
        else: out.append(ln)
    for k,v in [("HOLYSTONE_EMBED_MODEL",model),("HOLYSTONE_EMBED_INPUT_TYPE_MODE",mode)]:
        if not got[k]: out.append(f"{k}={v}")
    ENV.write_text("\n".join(out)+"\n"); print(f"  .env updated (backup: {ENV.name}.bak)"); return True

def reset_column(new_dim):
    cd=col_dim()
    if isinstance(cd,int) and cd!=new_dim:
        print(f"  dim change {cd} -> {new_dim}: dropping + recreating embedding column (FTS/text kept)…")
        with db.connect() as c:
            c.execute("alter table hs_chunks drop column if exists embedding"); c.commit()

def reembed(model,mode,dim):
    os.environ["HOLYSTONE_EMBED_MODEL"]=model
    os.environ["HOLYSTONE_EMBED_INPUT_TYPE_MODE"]=mode
    os.environ["HOLYSTONE_CHUNK_CHARS"]=str(CHUNK)
    reset_column(dim)
    prog=json.load(open(SWPROG)) if SWPROG.exists() else {}
    done=set(prog.get(model,[]))
    fs=files()
    for f in fs:
        label=os.path.basename(f)[:24]
        if label in done: print(f"  skip {label} (done)"); continue
        print(f"  embedding {label} …",flush=True)
        try:
            corpus.embed_files([Path(f)], project_id=PROJECT, session_label=label, in_fiction_date=None)
        except Exception as e:
            print(f"  ! {label} failed: {type(e).__name__} {str(e)[:80]} — rerun option 3 to resume"); 
            prog[model]=sorted(done); json.dump(prog,open(SWPROG,"w")); return False
        done.add(label); prog[model]=sorted(done); json.dump(prog,open(SWPROG,"w"))
    print("  corpus re-embedded. Restart the holystone MCP so live queries use the new model.")
    return True

def menu():
    sc=scores()
    while True:
        cm=cur_model(); cd=col_dim(); ss=sessions()
        print("\n=== Marauders embedding model switcher ===")
        print(f"active recall model : {cm}")
        print(f"DB embedding column : vector({cd})   | 'marauders' sessions: {len(ss)}")
        print("\n  models (★=active, scores from the full trial if present):")
        ranked=sorted(MODELS, key=lambda m: (-(sc.get(m,{}).get('hit@5',0)), -(sc.get(m,{}).get('MRR',0)), m))
        for i,m in enumerate(ranked,1):
            mode,dim=MODELS[m]; s=sc.get(m,{})
            tag="★" if m==cm else " "
            sct=f"hit@5 {s['hit@5']} MRR {s['MRR']}" if s else "(not scored)"
            print(f"  {i:>2}.{tag} {m:48s} {dim:>4}d  {sct}")
        print("\n  a) switch active model (rewrite .env + re-embed corpus)")
        print("  r) resume an interrupted re-embed")
        print("  q) quit")
        ch=input("> ").strip().lower()
        if ch=="q": return
        if ch=="r":
            mode,dim=MODELS[cm]; reembed(cm,mode,dim); continue
        if ch=="a":
            pick=input("  model number: ").strip()
            if not pick.isdigit() or not(1<=int(pick)<=len(ranked)): print("  ?"); continue
            m=ranked[int(pick)-1]; mode,dim=MODELS[m]
            print(f"  switch live recall to {m} ({dim}d, mode={mode})")
            print("  this rewrites holystone/.env and RE-EMBEDS the 'marauders' corpus")
            print("  (dim change wipes the shared vector column; full-text search is unaffected).")
            if input("  proceed? type 'yes': ").strip().lower()!="yes": continue
            if write_env(m,mode): reembed(m,mode,dim)
            continue
        print("  ? pick a, r, or q")

if __name__=="__main__":
    menu()
