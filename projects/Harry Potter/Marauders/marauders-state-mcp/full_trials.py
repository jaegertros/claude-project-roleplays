"""FULL embedding trial — all 13 OpenRouter embedders, every chunk. Efficient
(.npy + vectorized scoring), resumable, and TOLERANT: if a model's endpoint
keeps erroring it is SKIPPED (recorded) and the run continues; rerun later to
retry skipped ones. Flaky endpoints (bge) are ordered last so they can't block.

Run:   python full_trials.py      (rerun to resume / retry skips)
Needs: holystone importable + OPENROUTER_API_KEY in holystone/.env, numpy
Knobs: KEEP_VECTORS=1, MAXCHUNKS=N (smoke test), ONLY=bge,gte-large (restrict models)
"""
import os, sys, glob, json, time, re
from pathlib import Path
import numpy as np

BASE=Path(__file__).resolve().parent; MAR=BASE.parent; STATE=MAR/"state"
RPDIR=MAR/"RP_chronological_cleaned_v4_bundle"/"RP_chronological_cleaned_v4"
try: import holystone
except ModuleNotFoundError:
    for c in [MAR.parents[3]/"holystone", MAR.parents[2]/"holystone"]:
        if (c/"holystone").exists(): sys.path.insert(0,str(c)); break
    import holystone
from holystone import chunking, openrouter
try:
    from dotenv import load_dotenv
    HS=Path(holystone.__file__).resolve().parent.parent
    for p in [HS/".env",BASE/".env",MAR/".env"]:
        if p.exists(): load_dotenv(p)
    load_dotenv()
except ModuleNotFoundError: pass
if not os.environ.get("OPENROUTER_API_KEY"):
    sys.exit("OPENROUTER_API_KEY not found (holystone/.env or $env:OPENROUTER_API_KEY).")

# Benchmark scratch lives outside the synced repo (home dir), same as vectorlab's store.
WORK=Path(os.environ.get("MARAUDERS_VECTORS_DIR",
          Path.home()/".narrator-state"/"marauders"/"vectors"))/"_full_work"
WORK.mkdir(parents=True,exist_ok=True)
CHUNKS_F=WORK/"chunks.json"; PROG=BASE/"full_progress.json"
RESULTS=BASE/"full_results.json"; SKIP=BASE/"full_skipped.json"; QF=BASE/"eval_queries.json"
CHUNK=1000; BATCH=32; CKPT=8
BUDGET=int(os.environ.get("TRIAL_BUDGET","100000000"))
KEEP=os.environ.get("KEEP_VECTORS","")=="1"
# flaky/HF endpoints last so they can't block the rest; bge dead last
MODELS=[("nvidia/llama-nemotron-embed-vl-1b-v2:free","param"),
        ("perplexity/pplx-embed-v1-0.6b","none"),
        ("intfloat/e5-large-v2","prefix"),
        ("intfloat/multilingual-e5-large","prefix"),
        ("intfloat/e5-base-v2","prefix"),
        ("thenlper/gte-large","none"),
        ("thenlper/gte-base","none"),
        ("sentence-transformers/all-mpnet-base-v2","none"),
        ("sentence-transformers/multi-qa-mpnet-base-dot-v1","none"),
        ("sentence-transformers/all-minilm-l12-v2","none"),
        ("sentence-transformers/all-minilm-l6-v2","none"),
        ("sentence-transformers/paraphrase-minilm-l6-v2","none"),
        ("baai/bge-base-en-v1.5","none")]
only=os.environ.get("ONLY","").strip()
if only:
    keys=[s.strip() for s in only.split(",")]
    MODELS=[m for m in MODELS if any(k in m[0] for k in keys)]

def jload(p,d):
    try:
        s=open(p).read().strip(); return json.loads(s) if s else d
    except Exception: return d
def jsave(p,o): t=str(p)+".tmp"; json.dump(o,open(t,"w")); os.replace(t,p)
def nsave(p,a): t=str(p)+".tmp"; np.save(t,a.astype(np.float32)); os.replace(t+".npy",p)
def slug(m): return re.sub(r"[^a-z0-9]+","-",m.lower()).strip("-")

if CHUNKS_F.exists() and open(CHUNKS_F).read().strip():
    CHUNKS=json.load(open(CHUNKS_F))
else:
    FILES=sorted(f for f in glob.glob(str(RPDIR/"RP_*.md")) if "report" not in f and "manifest" not in f)
    if not FILES: sys.exit(f"No RP_*.md under {RPDIR}")
    CHUNKS=[]
    for f in FILES:
        for i,c in enumerate(chunking.split_chunks(open(f,encoding="utf-8",errors="replace").read(),max_chars=CHUNK)):
            CHUNKS.append({"session":os.path.basename(f)[:24],"idx":i,"text":c})
    jsave(CHUNKS_F,CHUNKS)
_mx=int(os.environ.get("MAXCHUNKS","0"))
if _mx: CHUNKS=CHUNKS[:_mx]
TOTAL=len(CHUNKS); TEXTS=[c["text"].lower() for c in CHUNKS]
QS=json.load(open(QF))
cl=openrouter.OpenRouter(); t_end=time.time()+BUDGET
prog=jload(PROG,{}); results=jload(RESULTS,[]); done={r["model"] for r in results}; skipped=jload(SKIP,[])
print(f"corpus: {TOTAL} chunks | done {len(done)}/{len(MODELS)} | skipped {len(skipped)}",flush=True)

def emb(texts,model,mode,itype):
    wait=2
    for _ in range(5):
        try: return cl.embed(texts,model=model,input_type=itype,mode=mode,batch_size=BATCH)
        except Exception as e:
            print(f"   retry {type(e).__name__} {str(e)[:50]} (wait {wait}s)",flush=True); time.sleep(wait); wait=min(wait*2,30)
    return None

def score(model,mode,M):
    M=M/(np.linalg.norm(M,axis=1,keepdims=True)+1e-9); hits=rr=0.0
    for item in QS:
        qv=emb([item["q"]],model,mode,"query")
        if qv is None: continue
        q=np.array(qv[0],np.float32); q/=(np.linalg.norm(q)+1e-9)
        top=np.argsort(M@q)[::-1][:5]; rank=0
        for r,idx in enumerate(top,1):
            if any(e in TEXTS[idx] for e in item["expect"]): rank=r; break
        if rank: hits+=1; rr+=1.0/rank
    n=len(QS); return round(hits/n,3), round(rr/n,3)

for model,mode in MODELS:
    if model in done: continue
    npy=WORK/f"vec_{slug(model)}.npy"
    base=np.load(npy) if (npy.exists() and npy.stat().st_size>200) else None
    i=base.shape[0] if base is not None else 0; buf=[]; stalled=False
    while i<TOTAL:
        if time.time()>t_end:
            if buf: base=np.vstack([base]+buf) if base is not None else np.vstack(buf); nsave(npy,base)
            prog[model]=int(base.shape[0]) if base is not None else 0; jsave(PROG,prog)
            print(f"[paused] {slug(model)} {prog.get(model,0)}/{TOTAL}",flush=True); sys.exit(0)
        v=emb([c["text"] for c in CHUNKS[i:i+BATCH]],model,mode,"passage")
        if v is None:
            if buf: base=np.vstack([base]+buf) if base is not None else np.vstack(buf); nsave(npy,base)
            prog[model]=int(base.shape[0]) if base is not None else 0; jsave(PROG,prog)
            stalled=True; break
        buf.append(np.array(v,np.float32)); i+=len(v)
        if len(buf)>=CKPT:
            base=np.vstack([base]+buf) if base is not None else np.vstack(buf); buf=[]
            nsave(npy,base); prog[model]=int(base.shape[0]); jsave(PROG,prog)
            print(f"  {slug(model)[:28]:28s} {base.shape[0]}/{TOTAL}",flush=True)
    if stalled:
        if model not in skipped: skipped.append(model); jsave(SKIP,skipped)
        print(f"[SKIP] {model} stalled at {prog.get(model,0)}/{TOTAL} — moving on; rerun later to retry",flush=True)
        continue
    if buf: base=np.vstack([base]+buf) if base is not None else np.vstack(buf); nsave(npy,base)
    M=np.load(npy); h,mrr=score(model,mode,M)
    results.append({"model":model,"dim":int(M.shape[1]),"chunks":int(M.shape[0]),"hit@5":h,"MRR":mrr})
    jsave(RESULTS,results); done.add(model)
    if model in skipped: skipped.remove(model); jsave(SKIP,skipped)
    if not KEEP: nsave(npy,np.zeros((0,1),np.float32))
    print(f"SCORED {model}: hit@5={h} MRR={mrr} ({M.shape[0]} chunks, dim {M.shape[1]})",flush=True)

results.sort(key=lambda r:(-r["hit@5"],-r["MRR"]))
md=["# FULL embedding trial — all chunks, all models","",
    f"{len(QS)} queries · full corpus = {TOTAL} chunks (~{CHUNK}-char) · hit@5 + MRR","",
    "| rank | model | dim | hit@5 | MRR |","|---|---|---|---|---|"]
for i,r in enumerate(results,1): md.append(f"| {i} | {r['model']} | {r['dim']} | {r['hit@5']} | {r['MRR']} |")
if skipped: md+=["","**Incomplete (endpoint kept erroring — rerun to retry):** "+", ".join(skipped)]
open(BASE/"full_results.md","w").write("\n".join(md)+"\n")
