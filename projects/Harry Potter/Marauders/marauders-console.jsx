// marauders-console.jsx
// Marauders Campaign Console as a self-contained React component.
//
// Data source is auto-detected:
//   • Inside Cowork  -> window.cowork.callMcpTool("mcp__marauders-state__<tool>")
//   • Anywhere else  -> HTTP POST {serverUrl}/rest/<tool> (+ optional bearer token),
//     the same surface marauders-tracker-live.html uses (run: python server.py --http).
//
// Renders live campaign state from get_full() (clock, player, money, flags,
// inventory, wand projects, relationships, threads, lore) and runs recall /
// find_quote / list_sessions over the holystone-indexed log.
//
// No required props. Default export. Theme matches marauders-tracker-live.html.

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

const PROJECT = "marauders";

const CSS = `
.mcc{--bg:#14171c;--card:#1d222b;--ink:#e7e3d8;--mut:#9aa3b2;--am:#d8a657;--em:#a9c98f;--in:#7daea9;--ro:#d39ab0;--line:#2c333f;
  background:var(--bg);color:var(--ink);font:15px/1.5 "Iowan Old Style",Georgia,serif;min-height:100%}
.mcc *{box-sizing:border-box}
.mcc .wrap{max-width:1000px;margin:0 auto;padding:22px}
.mcc h1{font-size:24px;margin:0}
.mcc .meta{color:var(--mut);font-size:12px;margin:2px 0 14px}
.mcc .dot{display:inline-block;width:7px;height:7px;border-radius:50%;background:#3f8f54;margin-right:5px;vertical-align:middle}
.mcc .dot.off{background:#8a6d3b}
.mcc .bar{display:flex;gap:8px;flex-wrap:wrap;align-items:center;background:var(--card);border:1px solid var(--line);border-radius:10px;padding:10px;margin-bottom:14px}
.mcc input,.mcc select{background:#11141a;border:1px solid var(--line);color:var(--ink);border-radius:7px;padding:7px 9px;font:inherit;font-size:13px}
.mcc input.url{flex:1;min-width:200px} .mcc input.tok{width:150px}
.mcc button{background:var(--card);border:1px solid var(--line);color:var(--ink);padding:7px 14px;border-radius:8px;cursor:pointer;font:inherit;font-size:14px}
.mcc button.primary{border-color:var(--am);color:var(--am)} .mcc button:hover{border-color:var(--am)}
.mcc .tabs{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:14px}
.mcc .tab{background:var(--card);border:1px solid var(--line);color:var(--mut);padding:7px 14px;border-radius:8px;cursor:pointer;font:inherit;font-size:14px}
.mcc .tab.active{color:var(--ink);border-color:var(--am);box-shadow:inset 0 -2px 0 var(--am)}
.mcc .card{background:var(--card);border:1px solid var(--line);border-radius:12px;padding:14px 16px;margin-bottom:14px}
.mcc .card h3{margin:0 0 10px;font-size:13px;letter-spacing:.06em;text-transform:uppercase;color:var(--am)}
.mcc .grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}
@media(max-width:680px){.mcc .grid{grid-template-columns:1fr}}
.mcc .hero .big{font-size:20px;color:var(--am)} .mcc .hero .loc{margin:4px 0} .mcc .hero .phase{color:var(--mut);font-size:13px}
.mcc .kv{display:flex;gap:10px;padding:3px 0;border-bottom:1px dotted var(--line)} .mcc .kv:last-child{border:0}
.mcc .k{flex:0 0 150px;color:var(--mut);font-size:12px;text-transform:capitalize} .mcc .v{flex:1}
.mcc .money{font-size:22px;color:var(--am)} .mcc .money span{font-size:13px;color:var(--mut)}
.mcc .note{color:var(--mut);font-size:12.5px;margin-top:6px}
.mcc .flags{display:flex;flex-wrap:wrap;gap:6px} .mcc .flag{font-size:11.5px;padding:3px 8px;border-radius:6px;border:1px solid var(--line)}
.mcc .flag.on{color:var(--em);border-color:#3a4a39} .mcc .flag.off{color:var(--mut);opacity:.6}
.mcc .row{padding:7px 0;border-bottom:1px dotted var(--line)} .mcc .row:last-child{border:0} .mcc .sub{color:var(--mut);font-size:13px;margin-top:3px}
.mcc .tag{font-size:10.5px;color:var(--in);border:1px solid var(--line);border-radius:5px;padding:1px 6px;margin-left:6px}
.mcc .person{padding:10px 0;border-bottom:1px solid var(--line)} .mcc .person:last-child{border:0} .mcc .pname{font-size:16px;color:var(--ro);margin-bottom:5px}
.mcc .callout{background:#20262f;border-left:3px solid var(--am);padding:10px 12px;border-radius:8px;margin-bottom:14px;font-size:13.5px}
.mcc .callout.warn{border-left-color:var(--ro)} .mcc .callout ul{margin:6px 0 0 18px;padding:0}
.mcc ol.threads{padding-left:20px} .mcc .threads li{margin:5px 0}
.mcc .banner{background:#20262f;border:1px solid var(--line);border-left:3px solid var(--am);border-radius:8px;padding:12px 14px;font-size:13.5px}
.mcc .banner code{background:#11141a;border:1px solid var(--line);border-radius:5px;padding:1px 6px}
.mcc .rbar{display:flex;gap:8px;flex-wrap:wrap;align-items:center}
.mcc input.rq{flex:1;min-width:200px}
.mcc .chunk{border:1px solid var(--line);border-radius:10px;margin-top:12px;overflow:hidden}
.mcc .chunk-h{display:flex;gap:8px;flex-wrap:wrap;align-items:center;background:#20262f;border-bottom:1px solid var(--line);padding:7px 12px}
.mcc .badge{font-size:10.5px;padding:1px 8px;border-radius:999px;border:1px solid var(--line)}
.mcc .badge.sess{color:var(--am);border-color:#4a3f25} .mcc .badge.idx{color:var(--mut)} .mcc .badge.m{color:var(--em);border-color:#3a4a39} .mcc .badge.m.lex{color:var(--in)}
.mcc .chunk-b{padding:4px 14px 12px}
.mcc .scene{margin-top:10px} .mcc .scene-h{font-size:12px;color:var(--ro);border-left:2px solid var(--line);padding-left:8px;margin-bottom:3px}
.mcc .scene-t{white-space:pre-wrap;font-size:13.5px;line-height:1.55} .mcc .scene-t em{color:var(--mut)}
.mcc mark{background:#4a3f25;color:var(--ink);border-radius:2px;padding:0 1px}
.mcc .sesschip{display:inline-block;font-size:11.5px;color:var(--mut);border:1px solid var(--line);border-radius:6px;padding:2px 8px;margin:0 6px 6px 0}
`;

const E = (s) => String(s == null ? "" : s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const hasCowork = () => typeof window !== "undefined" && window.cowork && typeof window.cowork.callMcpTool === "function";

function _coworkText(r) {
  if (r == null) return null;
  if (r.isError) throw new Error((r.content && r.content[0] && r.content[0].text) || "tool error");
  const sc = r.structuredContent;
  if (sc != null) {
    if (typeof sc === "string") return sc;
    if (typeof sc === "object" && typeof sc.result === "string") return sc.result;
    if (typeof sc === "object") return JSON.stringify(sc);
  }
  if (r.content && r.content[0] && r.content[0].text != null) return r.content[0].text;
  return null;
}

// Returns raw tool text. In Cowork, tries candidate server names; over HTTP, one server.
async function callText(tool, body, conn) {
  if (hasCowork()) {
    const cands = ["mcp__marauders-state__" + tool, "mcp__holystone__" + tool];
    let err;
    for (const n of cands) {
      try {
        const t = _coworkText(await window.cowork.callMcpTool(n, body || {}));
        if (t != null) return t;
      } catch (e) { err = e; }
    }
    throw err || new Error("no tool responded");
  }
  const url = (conn.url || "").trim().replace(/\/+$/, "");
  if (!url) throw new Error("Set the server URL (run: python server.py --http).");
  const headers = { "Content-Type": "application/json" };
  if (conn.token) headers["Authorization"] = "Bearer " + conn.token;
  const res = await fetch(url + "/rest/" + tool, { method: "POST", headers, body: JSON.stringify(body || {}) });
  const j = await res.json();
  if (!j.ok) throw new Error(j.error || "HTTP " + res.status);
  return j.result;
}
async function callJson(tool, body, conn) {
  const t = await callText(tool, body, conn);
  try { return JSON.parse(t); } catch (e) { return t; }
}

// ---- HTML builders (ported verbatim from marauders-tracker-live.html) ----
function kv(o, keys) {
  return keys.filter((k) => o && o[k] != null && o[k] !== "").map((k) =>
    `<div class="kv"><span class="k">${E(k.replace(/_/g, " "))}</span><span class="v">${E(o[k])}</span></div>`).join("");
}
function buildStateTabs(full) {
  const s = full.state || {}, rel = full.relationships || {};
  const c = s.clock || {}, p = s.player || {}, m = s.money || {};
  const tabs = {};
  tabs.Overview = `<div class="card hero"><div class="big">${E(c.story_date)} — ${E(c.story_time)}</div>
    <div class="loc">${E(c.location)}</div><div class="phase">${E(c.phase)}</div></div>
    <div class="grid"><div class="card"><h3>Player</h3>${kv(p, ["name", "age", "house", "year", "role", "working_wand", "condition"])}</div>
    <div class="card"><h3>Money</h3><div class="money">${m.galleons || 0}<span>G</span> ${m.sickles || 0}<span>S</span> ${m.knuts || 0}<span>K</span> &nbsp;·&nbsp; £${m.muggle_gbp || 0}</div>
    <div class="note">${E(m.notes)}</div></div></div>
    <div class="card"><h3>Flags</h3><div class="flags">` +
      Object.entries(s.flags || {}).map(([k, v]) => `<span class="flag ${v ? "on" : "off"}">${E(k)}</span>`).join("") + `</div></div>`;

  const inv = s.inventory_summary || {}, wp = s.wand_projects || {}, dl = s.the_dead_and_loot_discipline || {}, wb = s.wiggenweld_bench || {};
  let it = `<div class="card"><h3>Inventory</h3>` + Object.entries(inv).filter(([k]) => k !== "_note").map(([k, v]) => `<div class="kv"><span class="k">${E(k.replace(/_/g, " "))}</span><span class="v">${E(v)}</span></div>`).join("") + `</div>`;
  it += `<div class="card"><h3>Wand projects</h3>` + Object.entries(wp).map(([k, v]) => `<div class="row"><b>${E(k.replace(/_/g, " "))}</b> <span class="tag">${E(v.status)}</span><div class="sub">${E(v.detail)}</div></div>`).join("") + `</div>`;
  it += `<div class="card"><h3>The dead &amp; loot</h3>` + kv(dl, Object.keys(dl)) + `</div>`;
  it += `<div class="card"><h3>Wiggenweld</h3><div class="note">${E(wb.unit)} — ${E(wb.owed)}</div><div class="flags">` + Object.entries(wb.batches || {}).map(([k, v]) => `<span class="flag on">${E(k)}: ${E(v)}</span>`).join("") + `</div></div>`;
  tabs.Inventory = it;

  const GROUPS = [["inner_circle", "Inner circle"], ["family", "Family"], ["mentors_and_teachers", "Mentors & teachers"], ["war_and_field", "War & field"], ["cohort_and_other", "Cohort & others"]];
  const F = ["tier", "who", "bond", "earned", "register", "last_status", "open", "anti_reset", "note", "do_not_confuse"];
  let rt = "";
  if (rel.found_family_milestone) rt += `<div class="callout">★ ${E(rel.found_family_milestone)}</div>`;
  if (rel.do_not_confuse) rt += `<div class="callout warn"><b>Do not confuse:</b><ul>` + rel.do_not_confuse.map((x) => `<li>${E(x)}</li>`).join("") + `</ul></div>`;
  for (const [gk, gl] of GROUPS) {
    const g = rel[gk]; if (!g) continue;
    rt += `<div class="card"><h3>${E(gl)}</h3>` + Object.entries(g).map(([name, info]) => {
      if (typeof info !== "object") return "";
      const body = F.filter((f) => info[f]).map((f) => `<div class="kv"><span class="k">${E(f)}</span><span class="v">${E(info[f])}</span></div>`).join("");
      return `<div class="person"><div class="pname">${E(name)} ${info.tier ? `<span class="tag">${E(info.tier)}</span>` : ""}</div>${body}</div>`;
    }).join("") + `</div>`;
  }
  tabs.Relationships = rt || `<div class="note">No relationship registry returned.</div>`;

  tabs.Threads = `<div class="card"><h3>Open threads</h3><ol class="threads">` + (s.open_threads || []).map((t) => `<li>${E(t)}</li>`).join("") + `</ol></div>`;

  let lt = "";
  for (const [k, v] of Object.entries(s.lore_threads || {})) {
    const inner = (typeof v === "object") ? Object.entries(v).map(([ik, iv]) => `<div class="kv"><span class="k">${E(ik.replace(/_/g, " "))}</span><span class="v">${E(typeof iv === "object" ? JSON.stringify(iv) : iv)}</span></div>`).join("") : E(v);
    lt += `<div class="card"><h3>${E(k.replace(/_/g, " "))}</h3>${inner}</div>`;
  }
  tabs.Lore = lt || `<div class="note">No lore threads.</div>`;
  return { tabs, asOf: s.as_of_session || "" };
}

// ---- recall parsing / rendering ----
function parseChunks(text) {
  if (!text || !text.trim()) return [];
  return text.split(/\n(?=###\s)/).map((b) => {
    const h = b.match(/^###\s+(.+?)\s+#(\d+)(?:\s+—\s+([^()]+?))?\s*\(([^)]*)\)\s*/);
    if (!h) return null;
    const scenes = []; const body = b.slice(h[0].length);
    body.split(/\n(?=##\s)/).forEach((seg) => {
      const sm = seg.match(/^##\s+(.+?)(?:\n|$)/);
      if (sm) scenes.push({ head: sm[1].trim(), text: seg.slice(sm[0].length).trim() });
      else if (seg.trim()) scenes.push({ head: null, text: seg.trim() });
    });
    return { session: h[1].trim(), idx: h[2], date: (h[3] || "").trim(), methods: h[4].split(",").map((s) => s.trim()).filter(Boolean), scenes };
  }).filter(Boolean);
}
function fmt(t) { return E(t).replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>").replace(/(^|[^*])\*([^*\n][^*]*?)\*(?!\*)/g, "$1<em>$2</em>"); }
function hl(html, terms) {
  terms.forEach((w) => { if (w.length < 3) return; const re = new RegExp("(" + w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")", "ig"); html = html.replace(/>([^<]+)</g, (m, x) => ">" + x.replace(re, "<mark>$1</mark>") + "<"); });
  return html;
}
function renderChunks(chunks, terms) {
  if (!chunks.length) return `<div class="note">No matches.</div>`;
  return chunks.map((c) => {
    let h = `<div class="chunk"><div class="chunk-h"><span class="badge sess">${E(c.session)}</span><span class="badge idx">#${c.idx}</span>`
      + (c.date ? `<span class="badge idx">${E(c.date)}</span>` : "")
      + c.methods.map((m) => `<span class="badge m ${m === "lexical" ? "lex" : ""}">${E(m)}</span>`).join("") + `</div><div class="chunk-b">`;
    h += c.scenes.map((sc) => `<div class="scene">${sc.head ? `<div class="scene-h">${fmt(sc.head)}</div>` : ""}<div class="scene-t">${hl(fmt(sc.text), terms)}</div></div>`).join("");
    return h + `</div></div>`;
  }).join("");
}

export default function MaraudersConsole() {
  const cowork = hasCowork();
  const [conn, setConn] = useState(() => {
    let url = "", token = "";
    try { url = localStorage.getItem("mcc_url") || ""; token = localStorage.getItem("mcc_tok") || ""; } catch (e) {}
    return { url, token };
  });
  const [full, setFull] = useState(null);
  const [asOf, setAsOf] = useState("");
  const [err, setErr] = useState(null);
  const [active, setActive] = useState("Overview");

  // recall state
  const [q, setQ] = useState(() => { try { return localStorage.getItem("mcc_q") || ""; } catch (e) { return ""; } });
  const [mode, setMode] = useState(() => { try { return localStorage.getItem("mcc_mode") || "recall"; } catch (e) { return "recall"; } });
  const [k, setK] = useState(() => { try { return localStorage.getItem("mcc_k") || "4"; } catch (e) { return "4"; } });
  const [results, setResults] = useState("");
  const [rstatus, setRstatus] = useState("");
  const [sessions, setSessions] = useState("");

  const loadState = useCallback(async () => {
    setErr(null);
    try {
      const f = await callJson("get_full", {}, conn);
      if (f && f.state) { const r = buildStateTabs(f); setFull(r.tabs); setAsOf(r.asOf); }
      else { setFull(null); setErr("Empty state."); }
    } catch (e) { setFull(null); setErr(e.message || String(e)); }
  }, [conn]);

  const loadSessions = useCallback(async () => {
    try {
      const t = await callText("list_sessions", { project: PROJECT }, conn);
      const lines = t.split(/\r?\n/).filter((l) => /^\s*-\s/.test(l));
      setSessions(lines.length ? lines.map((l) => { const m = l.match(/-\s+(.+?):\s+(\d+)\s+chunks/); return m ? `<span class="sesschip">${E(m[1])} · ${m[2]}</span>` : ""; }).join("") : E(t));
    } catch (e) { setSessions("recall unavailable: " + (e.message || e)); }
  }, [conn]);

  useEffect(() => { loadState(); loadSessions(); }, [loadState, loadSessions]);

  const runRecall = useCallback(async () => {
    const query = q.trim(); if (!query) return;
    try { localStorage.setItem("mcc_q", query); localStorage.setItem("mcc_mode", mode); localStorage.setItem("mcc_k", k); } catch (e) {}
    setRstatus("searching…"); setResults("");
    try {
      const text = mode === "quote"
        ? await callText("find_quote", { phrase: query, project: PROJECT, k: +k }, conn)
        : await callText("recall", { query, project: PROJECT, k: +k }, conn);
      const chunks = parseChunks(text);
      const terms = mode === "quote" ? [query] : query.split(/\s+/).filter((w) => w.length > 2);
      setRstatus(chunks.length + " result" + (chunks.length === 1 ? "" : "s") + " for “" + query + "”");
      setResults(renderChunks(chunks, terms));
    } catch (e) { setRstatus("error: " + (e.message || e)); }
  }, [q, mode, k, conn]);

  const saveConn = () => { try { localStorage.setItem("mcc_url", conn.url); localStorage.setItem("mcc_tok", conn.token); } catch (e) {} loadState(); loadSessions(); };

  const stateTabNames = ["Overview", "Inventory", "Relationships", "Threads", "Lore"];
  const tabNames = (full ? stateTabNames : ["Status"]).concat(["Recall"]);
  const liveOk = !!full;

  return (
    <div className="mcc">
      <style>{CSS}</style>
      <div className="wrap">
        <h1>Marauders — Campaign Console</h1>
        <div className="meta">
          <span className={"dot" + (liveOk ? "" : " off")} />
          {liveOk ? "live · as of " + asOf : (cowork ? "state offline — recall live" : "enter server URL below")}
          {" · state + memory from the "}<code>marauders-state</code>{" server"}
        </div>

        {!cowork && (
          <div className="bar">
            <input className="url" placeholder="server URL e.g. http://127.0.0.1:8800" value={conn.url}
              onChange={(e) => setConn({ ...conn, url: e.target.value })} />
            <input className="tok" type="password" placeholder="token (if set)" value={conn.token}
              onChange={(e) => setConn({ ...conn, token: e.target.value })} />
            <button className="primary" onClick={saveConn}>Reload state</button>
          </div>
        )}

        <div className="tabs">
          {tabNames.map((name) => (
            <button key={name} className={"tab" + (active === name ? " active" : "")} onClick={() => setActive(name)}>{name}</button>
          ))}
        </div>

        {/* state tabs */}
        {full && stateTabNames.map((name) => (
          active === name ? <div key={name} dangerouslySetInnerHTML={{ __html: full[name] }} /> : null
        ))}

        {/* status tab when not connected */}
        {!full && active === "Status" && (
          <div className="banner">
            <b>marauders-state isn't returning state{err ? " (" + E(err) + ")" : ""}.</b><br />
            {cowork
              ? <>Restart the Claude desktop app to activate the <code>marauders-state</code> server, then reload. Recall already works below (via holystone).</>
              : <>Start the server with <code>python server.py --http --port 8800</code>, then set the URL above. Recall needs the same server.</>}
          </div>
        )}

        {/* recall tab */}
        {active === "Recall" && (
          <>
            <div className="card">
              <h3>Recall</h3>
              <div className="rbar">
                <input className="rq" placeholder="search the log by meaning or words…" value={q}
                  onChange={(e) => setQ(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") runRecall(); }} />
                <select value={mode} onChange={(e) => setMode(e.target.value)}>
                  <option value="recall">Recall</option>
                  <option value="quote">Find quote</option>
                </select>
                <select value={k} onChange={(e) => setK(e.target.value)}>
                  <option>3</option><option>4</option><option>6</option><option>8</option>
                </select>
                <button className="primary" onClick={runRecall}>Search</button>
              </div>
              <div className="note">{rstatus || "Try a name, place, or phrase — e.g. silver water, White Lightning, the Path."}</div>
              <div dangerouslySetInnerHTML={{ __html: results }} />
            </div>
            <div className="card">
              <h3>Indexed sessions</h3>
              <div className="note" dangerouslySetInnerHTML={{ __html: sessions || "loading…" }} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
