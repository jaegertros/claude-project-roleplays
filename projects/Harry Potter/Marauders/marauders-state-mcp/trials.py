"""Embed all 11 RP files into a local model-tagged corpus, for several models.
Run in background; logs progress to trials.log. Local store only."""
import os, sys, glob, time, traceback
from dotenv import load_dotenv
load_dotenv('/sessions/upbeat-stoic-brahmagupta/mnt/holystone/.env')
os.environ["MARAUDERS_STATE_DIR"]="/sessions/upbeat-stoic-brahmagupta/mnt/llm-roleplay/projects/Harry Potter/Marauders/state"
sys.path.insert(0,"/sessions/upbeat-stoic-brahmagupta/mnt/holystone"); sys.path.insert(0,".")
import vectorlab as V

RP_DIR="/sessions/upbeat-stoic-brahmagupta/mnt/llm-roleplay/projects/Harry Potter/Marauders/RP_chronological_cleaned_v4_bundle/RP_chronological_cleaned_v4"
files=sorted(f for f in glob.glob(RP_DIR+"/RP_*.md") if "report" not in f and "manifest" not in f)

# (model id, input_mode)  — mode matters: e5 wants query:/passage: prefixes; minilm symmetric; nemotron param
TRIALS=[
 ("nvidia/llama-nemotron-embed-vl-1b-v2:free","param"),     # baseline, free
 ("baai/bge-base-en-v1.5","none"),
 ("intfloat/e5-large-v2","prefix"),
 ("intfloat/multilingual-e5-large","prefix"),
 ("sentence-transformers/all-minilm-l6-v2","none"),
]
def log(m): open("trials.log","a").write(m+"\n"); print(m,flush=True)
log(f"=== START {time.strftime('%H:%M:%S')} | {len(files)} files x {len(TRIALS)} models ===")
for model,mode in TRIALS:
    t0=time.time()
    try:
        for f in files:
            r=V.embed_file(f, project="marauders", model=model, input_mode=mode, store="local")
            log(f"  {model.split('/')[-1]:32s} {os.path.basename(f)[:28]:28s} chunks={r.get('chunks')} dim={r.get('dim')}")
        log(f"DONE {model} in {time.time()-t0:.0f}s")
    except Exception as e:
        log(f"FAIL {model}: {type(e).__name__}: {e}")
        log(traceback.format_exc())
log("=== ALL DONE ===")
