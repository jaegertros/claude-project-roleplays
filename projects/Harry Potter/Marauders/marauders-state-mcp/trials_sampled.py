"""Resumable, time-boxed embedding trials over a deterministic chunk SAMPLE.
Same sample for every model => fair ranking. Run repeatedly until 'ALL DONE'."""
import os, sys, glob, time, json
from dotenv import load_dotenv
load_dotenv('/sessions/upbeat-stoic-brahmagupta/mnt/holystone/.env')
SD="/sessions/upbeat-stoic-brahmagupta/mnt/llm-roleplay/projects/Harry Potter/Marauders/state"
os.environ["MARAUDERS_STATE_DIR"]=SD
sys.path.insert(0,"/sessions/upbeat-stoic-brahmagupta/mnt/holystone"); sys.path.insert(0,".")
from holystone import chunking, openrouter
def _save(path,doc):
    import os,json as J
    t=path+'.tmp'; J.dump(doc,open(t,'w')); os.replace(t,path)
VEC=SD+"/vectors"; os.makedirs(VEC,exist_ok=True)
RP="/sessions/upbeat-stoic-brahmagupta/mnt/llm-roleplay/projects/Harry Potter/Marauders/RP_chronological_cleaned_v4_bundle/RP_chronological_cleaned_v4"
files=sorted(f for f in glob.glob(RP+"/RP_*.md") if "report" not in f and "manifest" not in f)
K=40  # max chunks sampled per file (even spacing)
MODELS=[("nvidia/llama-nemotron-embed-vl-1b-v2:free","param"),
        ("intfloat/e5-large-v2","prefix"),
        ("intfloat/multilingual-e5-large","prefix"),
        ("sentence-transformers/all-minilm-l6-v2","none"),
        ("baai/bge-base-en-v1.5","none")]
def slug(m): import re; return re.sub(r"[^a-z0-9]+","-",m.lower()).strip("-")
def sample(text):
    cs=chunking.split_chunks(text, max_chars=1000)
    if len(cs)<=K: return cs
    step=len(cs)/K
    return [cs[int(i*step)] for i in range(K)]
cl=openrouter.OpenRouter()
budget=time.time()+30; did=0
for model,mode in MODELS:
    path=f"{VEC}/marauders@{slug(model)}.vec.json"
    REGIME="1000c-K40"
    try:
        doc=json.load(open(path)) if os.path.exists(path) else {}
    except Exception:
        doc={}
    if doc.get("regime")!=REGIME: doc={"model":model,"mode":mode,"regime":REGIME,"items":[]}
    done={it["session"] for it in doc["items"]}
    for f in files:
        sess=os.path.basename(f)[:24]
        if sess in done: continue
        if time.time()>budget:
            print(f"[timebox] paused; {did} pairs done this call"); 
            _save(path,doc); sys.exit(0)
        chunks=sample(open(f,encoding="utf-8",errors="replace").read())
        vecs=None
        for attempt in range(3):
            try:
                vecs=cl.embed(chunks, model=model, input_type="passage", mode=mode, batch_size=16); break
            except Exception as e:
                print(f"  retry {attempt+1} {slug(model)[:20]} {sess}: {type(e).__name__}",flush=True); time.sleep(2)
        if vecs is None:
            print(f"  SKIP {slug(model)} {sess} after retries",flush=True); _save(path,doc); continue
        doc["dim"]=len(vecs[0])
        for i,(t,v) in enumerate(zip(chunks,vecs)):
            doc["items"].append({"session":sess,"idx":i,"text":t,"vec":[round(x,5) for x in v]})
        done.add(sess); did+=1
        _save(path,doc)
        print(f"  {slug(model)[:30]:30s} {sess:24s} +{len(chunks)} (dim {doc['dim']})",flush=True)
    _save(path,doc)
print("=== ALL DONE ===")
