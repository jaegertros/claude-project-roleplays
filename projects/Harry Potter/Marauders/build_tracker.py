#!/usr/bin/env python3
"""Render the Marauders state JSON into a self-contained HTML dashboard.
Usage:  python build_tracker.py   (run from the Marauders folder)
Reads state/marauders-state.json + state/marauders-relationships.json,
writes marauders-tracker.html. Re-run any time the state changes (this is
what the skill's /tracker command does)."""
import json, html, datetime, pathlib

BASE = pathlib.Path(__file__).resolve().parent
core = json.load(open(BASE/"state"/"marauders-state.json", encoding="utf-8"))
rel  = json.load(open(BASE/"state"/"marauders-relationships.json", encoding="utf-8"))
e = lambda x: html.escape(str(x))

def kv(d, keys):
    out=[]
    for k in keys:
        if k in d and d[k] not in (None,"",[],{}):
            out.append(f'<div class="kv"><span class="k">{e(k.replace("_"," "))}</span><span class="v">{e(d[k])}</span></div>')
    return "".join(out)

# ---- Overview ----
c=core["clock"]; p=core["player"]; m=core["money"]
ov = f"""
<div class="card hero">
  <div class="big">{e(c.get('story_date',''))} — {e(c.get('story_time',''))}</div>
  <div class="loc">{e(c.get('location',''))}</div>
  <div class="phase">{e(c.get('phase',''))}</div>
</div>
<div class="grid">
  <div class="card"><h3>Player</h3>{kv(p,['name','age','house','year','role','working_wand','condition'])}</div>
  <div class="card"><h3>Money</h3>
    <div class="money">{m.get('galleons',0)}<span>G</span> {m.get('sickles',0)}<span>S</span> {m.get('knuts',0)}<span>K</span> &nbsp;·&nbsp; £{m.get('muggle_gbp',0)}</div>
    <div class="note">{e(m.get('notes',''))}</div>
    <div class="note">{e(m.get('office_vault_balance',''))}</div>
  </div>
</div>
<div class="card"><h3>Flags</h3><div class="flags">""" + "".join(
   f'<span class="flag {"on" if v else "off"}">{e(k)}</span>' for k,v in core.get("flags",{}).items()
) + "</div></div>"

# ---- Inventory ----
inv=core.get("inventory_summary",{}); wp=core.get("wand_projects",{}); dl=core.get("the_dead_and_loot_discipline",{}); wb=core.get("wiggenweld_bench",{})
invh = '<div class="card"><h3>Inventory</h3>' + "".join(
    f'<div class="kv"><span class="k">{e(k.replace("_"," "))}</span><span class="v">{e(v)}</span></div>'
    for k,v in inv.items() if k!="_note") + "</div>"
wph = '<div class="card"><h3>Wand projects</h3>' + "".join(
    f'<div class="row"><b>{e(k.replace("_"," "))}</b> <span class="tag">{e(v.get("status",""))}</span><div class="sub">{e(v.get("detail",""))}</div></div>'
    for k,v in wp.items()) + "</div>"
dlh = '<div class="card"><h3>The dead &amp; loot</h3>' + "".join(
    f'<div class="kv"><span class="k">{e(k.replace("_"," "))}</span><span class="v">{e(v)}</span></div>' for k,v in dl.items()) + "</div>"
wbh = ('<div class="card"><h3>Wiggenweld bench</h3>'
       f'<div class="note">{e(wb.get("unit",""))} — {e(wb.get("owed",""))}</div>'
       + "".join(f'<span class="flag on">{e(k)}: {e(v)}</span>' for k,v in wb.get("batches",{}).items()) + "</div>")
invtab = invh+wph+dlh+wbh

# ---- Relationships ----
GROUPS=[("inner_circle","Inner circle"),("family","Family"),
        ("mentors_and_teachers","Mentors & teachers"),("war_and_field","War & field"),
        ("cohort_and_other","Cohort & others")]
FIELDS=["tier","who","bond","earned","register","last_status","open","anti_reset","note","do_not_confuse"]
rblocks=[]
if rel.get("found_family_milestone"):
    rblocks.append(f'<div class="callout">★ {e(rel["found_family_milestone"])}</div>')
if rel.get("do_not_confuse"):
    rblocks.append('<div class="callout warn"><b>Do not confuse:</b><ul>'+"".join(f"<li>{e(x)}</li>" for x in rel["do_not_confuse"])+"</ul></div>")
for gk,gl in GROUPS:
    g=rel.get(gk,{})
    if not g: continue
    rows=[]
    for name,info in g.items():
        if not isinstance(info,dict): continue
        body="".join(
            f'<div class="kv"><span class="k">{e(f)}</span><span class="v">{e(info[f])}</span></div>'
            for f in FIELDS if f in info and info[f])
        tier=info.get("tier","")
        rows.append(f'<div class="person"><div class="pname">{e(name)} {f"<span class=tag>{e(tier)}</span>" if tier else ""}</div>{body}</div>')
    rblocks.append(f'<div class="card"><h3>{e(gl)}</h3>{"".join(rows)}</div>')
reltab="".join(rblocks)

# ---- Threads ----
threads="".join(f"<li>{e(t)}</li>" for t in core.get("open_threads",[]))
thtab=f'<div class="card"><h3>Open threads</h3><ol class="threads">{threads}</ol></div>'

# ---- Lore ----
lore=core.get("lore_threads",{})
loreblocks=[]
for k,v in lore.items():
    inner="".join(
        f'<div class="kv"><span class="k">{e(ik.replace("_"," "))}</span><span class="v">{e(iv if not isinstance(iv,(list,dict)) else json.dumps(iv,ensure_ascii=False))}</span></div>'
        for ik,iv in v.items()) if isinstance(v,dict) else f'<div class="v">{e(v)}</div>'
    loreblocks.append(f'<div class="card"><h3>{e(k.replace("_"," "))}</h3>{inner}</div>')
loretab="".join(loreblocks)

gen=datetime.datetime.now().strftime("%Y-%m-%d %H:%M")
TABS=[("ov","Overview",ov),("inv","Inventory",invtab),("rel","Relationships",reltab),("th","Threads",thtab),("lore","Lore",loretab)]
btns="".join(f'<button class="tab{" active" if i==0 else ""}" onclick="show(\'{tid}\')" id="b-{tid}">{lbl}</button>' for i,(tid,lbl,_) in enumerate(TABS))
panes="".join(f'<div class="pane{" active" if i==0 else ""}" id="p-{tid}">{con}</div>' for i,(tid,_,con) in enumerate(TABS))

HTML=f"""<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Marauders — Tracker</title><style>
:root{{--bg:#14171c;--card:#1d222b;--ink:#e7e3d8;--mut:#9aa3b2;--am:#d8a657;--em:#a9c98f;--in:#7daea9;--ro:#d39ab0;--line:#2c333f}}
*{{box-sizing:border-box}} body{{margin:0;background:var(--bg);color:var(--ink);font:15px/1.5 "Iowan Old Style",Georgia,serif}}
.wrap{{max-width:1000px;margin:0 auto;padding:22px}}
h1{{font-size:24px;margin:0}} .meta{{color:var(--mut);font-size:12px;margin:2px 0 16px}}
.tabs{{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:14px}}
.tab{{background:var(--card);border:1px solid var(--line);color:var(--mut);padding:7px 14px;border-radius:8px;cursor:pointer;font:inherit;font-size:14px}}
.tab.active{{color:var(--ink);border-color:var(--am);box-shadow:inset 0 -2px 0 var(--am)}}
.pane{{display:none}} .pane.active{{display:block}}
.card{{background:var(--card);border:1px solid var(--line);border-radius:12px;padding:14px 16px;margin-bottom:14px}}
.card h3{{margin:0 0 10px;font-size:13px;letter-spacing:.06em;text-transform:uppercase;color:var(--am)}}
.grid{{display:grid;grid-template-columns:1fr 1fr;gap:14px}} @media(max-width:680px){{.grid{{grid-template-columns:1fr}}}}
.hero .big{{font-size:20px;color:var(--am)}} .hero .loc{{margin:4px 0;color:var(--ink)}} .hero .phase{{color:var(--mut);font-size:13px}}
.kv{{display:flex;gap:10px;padding:3px 0;border-bottom:1px dotted var(--line)}} .kv:last-child{{border:0}}
.k{{flex:0 0 150px;color:var(--mut);font-size:12px;text-transform:capitalize}} .v{{flex:1}}
.money{{font-size:22px;color:var(--am)}} .money span{{font-size:13px;color:var(--mut)}}
.note{{color:var(--mut);font-size:12.5px;margin-top:6px}}
.flags{{display:flex;flex-wrap:wrap;gap:6px}}
.flag{{font-size:11.5px;padding:3px 8px;border-radius:6px;border:1px solid var(--line)}}
.flag.on{{color:var(--em);border-color:#3a4a39}} .flag.off{{color:var(--mut);opacity:.6}}
.row{{padding:7px 0;border-bottom:1px dotted var(--line)}} .row:last-child{{border:0}} .sub{{color:var(--mut);font-size:13px;margin-top:3px}}
.tag{{font-size:10.5px;color:var(--in);border:1px solid var(--line);border-radius:5px;padding:1px 6px;margin-left:6px}}
.person{{padding:10px 0;border-bottom:1px solid var(--line)}} .person:last-child{{border:0}}
.pname{{font-size:16px;color:var(--ro);margin-bottom:5px}}
.callout{{background:#20262f;border-left:3px solid var(--am);padding:10px 12px;border-radius:8px;margin-bottom:14px;font-size:13.5px}}
.callout.warn{{border-left-color:var(--ro)}} .callout ul{{margin:6px 0 0 18px;padding:0}} .callout li{{margin:3px 0}}
.threads li{{margin:5px 0}} ol.threads{{padding-left:20px}}
</style></head><body><div class="wrap">
<h1>Caleb's Workbench — Marauders Tracker</h1>
<div class="meta">{e(core.get('as_of_session',''))} · generated {gen} · snapshot of state/marauders-state.json</div>
<div class="tabs">{btns}</div>{panes}
</div><script>
function show(id){{document.querySelectorAll('.pane').forEach(p=>p.classList.remove('active'));
document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
document.getElementById('p-'+id).classList.add('active');document.getElementById('b-'+id).classList.add('active');}}
</script></body></html>"""

out=BASE/"marauders-tracker.html"
out.write_text(HTML, encoding="utf-8")
print("wrote", out, len(HTML), "bytes")
