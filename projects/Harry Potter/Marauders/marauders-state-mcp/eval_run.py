"""Resumable eval: scores one not-yet-done corpus per run; accumulates into
eval_results.json; rebuilds eval_results.md each time. Run until all done."""
import os, sys, json, glob
from dotenv import load_dotenv
load_dotenv('/sessions/upbeat-stoic-brahmagupta/mnt/holystone/.env')
SD="/sessions/upbeat-stoic-brahmagupta/mnt/llm-roleplay/projects/Harry Potter/Marauders/state"
os.environ["MARAUDERS_STATE_DIR"]=SD
sys.path.insert(0,"/sessions/upbeat-stoic-brahmagupta/mnt/holystone"); sys.path.insert(0,".")
import vectorlab as V
qs=json.load(open("eval_queries.json"))
res=json.load(open("eval_results.json")) if os.path.exists("eval_results.json") else []
done={r["file"] for r in res}
def ok(f):
    try:
        d=json.load(open(f)); return d.get("regime")=="1000c-K40" and len({i["session"] for i in d["items"]})==11
    except Exception: return False
corpora=[f for f in sorted(glob.glob(str(V.VEC_DIR/"*.vec.json"))) if ok(f) and os.path.basename(f) not in done]
if corpora:
    cf=corpora[0]; doc=json.load(open(cf)); hits=rr=0.0
    for item in qs:
        r=V.local_recall(os.path.basename(cf), item["q"], k=5)
        rank=0
        for i,h in enumerate(r["hits"],1):
            if any(e in h["text"].lower() for e in item["expect"]): rank=i; break
        if rank: hits+=1; rr+=1.0/rank
    n=len(qs)
    res.append({"model":doc["model"],"dim":doc["dim"],"hit@5":round(hits/n,3),"MRR":round(rr/n,3),"file":os.path.basename(cf)})
    json.dump(res,open("eval_results.json","w"),indent=2)
    print(f"scored {doc['model']}")
else:
    print("no more corpora to score")
res.sort(key=lambda r:(-r["hit@5"],-r["MRR"]))
md=["# Embedding model trial — recall scoreboard","",
    f"{len(qs)} campaign queries · 40-chunk/file sample (1000-char chunks) · hit@5 + MRR","",
    "| rank | model | dim | hit@5 | MRR |","|---|---|---|---|---|"]
for i,r in enumerate(res,1): md.append(f"| {i} | {r['model']} | {r['dim']} | {r['hit@5']} | {r['MRR']} |")
open("eval_results.md","w").write("\n".join(md)+"\n")
print("done so far:", [r['model'].split('/')[-1] for r in res])
