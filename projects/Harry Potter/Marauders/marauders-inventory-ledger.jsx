import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  Plus, X, Edit3, Save, ChevronDown, ChevronRight, Wand2, FlaskConical,
  Trees, BookOpen, Coins, Users, ClipboardList, Package, Settings as SettingsIcon,
  Copy, Download, Upload, RotateCcw, AlertTriangle, Wifi, WifiOff, RefreshCw,
  Check, MapPin, Scissors, Sparkles,
} from "lucide-react";

const STORAGE_KEY = "marauders-ledger";
const SETTINGS_KEY = "marauders-ledger-settings";
const SCHEMA_VERSION = "1.0";

// ---------------------------------------------------------------------------
// Caleb's Workbench — Inventory Ledger (Marauders campaign)
//
// Logs-traced seed. Anything I could not confirm against establishing prose
// carries flag:true and renders with a ⚠. Verify those against the RP before
// quoting them to the Narrator.
//
// Source notes (RP_##):
//   Wood ledger ........ RP_09 (forest-harvest reconciliation, lines ~7495–10834)
//   Brother wands ...... RP_07 §brother wands; RP_08/RP_09 (built, cored, refuse to strike)
//   Woodworking books .. RP_08 (Room of Requirement, three titles confirmed)
//   Wiggenweld bench ... RP_05/07/08/09 (Control 1:16 = 1 Unit; A/B/C/F joined; D/E stalled)
//   Coplowe leather .... RP_09 (gloves + 3-wand holster; Eldower's contact)
//   Pince research books NOT FOUND in prose — summaries unverified; left flagged
// ---------------------------------------------------------------------------

const CATEGORIES = [
  { id: "wands",      label: "Wands",                 icon: Wand2,        accent: "amber" },
  { id: "cores",      label: "Cores & components",    icon: Sparkles,     accent: "amber" },
  { id: "wood_stock", label: "Wood — stock blanks",   icon: Trees,        accent: "emerald" },
  { id: "wood_harvest", label: "Wood — forest harvest", icon: Trees,      accent: "emerald" },
  { id: "wood_special", label: "Wood — special",      icon: Trees,        accent: "indigo" },
  { id: "books",      label: "Books",                 icon: BookOpen,     accent: "blue" },
  { id: "leather",    label: "Leather & gear",        icon: Scissors,     accent: "amber" },
  { id: "potion_kit", label: "Potion materials & kit", icon: FlaskConical, accent: "blue" },
  { id: "misc",       label: "Misc",                  icon: Package,      accent: "slate" },
];

const STATUS_OPTIONS = [
  "in hand", "in progress", "on order", "finished",
  "stalled", "seasoning", "needs work", "reference",
];

const statusColor = (s) => ({
  "in hand": "slate", "in progress": "blue", "on order": "amber",
  "finished": "emerald", "stalled": "rose", "seasoning": "indigo",
  "needs work": "amber", "reference": "slate",
}[s] || "slate");

const POTION_STATUS = ["ruler", "joined", "stalled", "brewing", "pending reads"];

// literal map — Tailwind can't see runtime-built class names, so we look them up
const accentText = {
  amber: "text-amber-400/80", emerald: "text-emerald-400/80", indigo: "text-indigo-400/80",
  blue: "text-blue-400/80", slate: "text-slate-400/80", rose: "text-rose-400/80",
};

const uid = (p = "x") => `${p}-${Math.random().toString(36).slice(2, 8)}`;

// --- helper to build seed inventory rows tersely -----------------------------
const inv = (category, name, opts = {}) => ({
  id: uid("itm"), category, name,
  qty: opts.qty ?? 1, status: opts.status ?? "in hand",
  location: opts.location ?? "", notes: opts.notes ?? "", flag: opts.flag ?? false,
});

const SEED = {
  schema_version: SCHEMA_VERSION,
  project: "marauders",
  title: "Caleb's Workbench",
  subtitle: "Inventory Ledger",
  clock: {
    story_date: "Wed 21 September 1977",
    story_time: "—",
    location: "Room of Requirement — workshop",
    term: "Michaelmas · 7th year · Ravenclaw",
  },
  player: {
    name: "Caleb Waddell",
    house: "Ravenclaw",
    year: "7th",
    role: "Wandwright-in-training (apprenticed to Eldower)",
    wand: "cherry",
    condition: "—",
  },
  money: { galleons: 0, sickles: 0, knuts: 0, notes: "Pyke donated 2G (received). Cass committed an 8G first vault deposit. Verify running balance." },

  inventory: [
    // — Wands —
    inv("wands", "Cherry wand", { status: "in hand", location: "carried", notes: "Caleb's working wand." }),
    inv("wands", "Wand B — rowan", { status: "finished", notes: "Hand-cut by Caleb; unicorn core but the WRONG hair (body, not tail). Eldower read it as competent-but-untrained, Reparo/annealed join." }),
    inv("wands", "Brother wand #1 — birch", { status: "finished", notes: "Single White Lightning tail hair · threaded end-cap · removable core · open rib-cage (core exposed). Locks with its twin: bright taut line, cores blazing, refuses to strike — never a cold fizzle." }),
    inv("wands", "Brother wand #2 — birch", { status: "finished", notes: "Matched twin of #1, same beast's tail hair. The pair come out kin." }),
    inv("wands", "Interleaved Wand", { status: "in progress", location: "workshop", notes: "Birch base built, tip parted from its own billet, removable-core system, five stepped rings; cored with one white tail hair. Takes interchangeable full-run modules (locked rule: cast full-length, cut to segments)." }),
    inv("wands", "Aether-Slung", { status: "in progress", location: "workshop", notes: "Open-rib / exposed-core design — core lit bare in its cage. Tririb practice blanks (birch) standing in the Room." }),

    // — Cores & components —
    inv("cores", "White Lightning tail hairs", { qty: 4, status: "in hand", notes: "Unicorn cores — 'the hair for a whole family of them.' (Count approximate.)", flag: true }),
    inv("cores", "Mugwort/vervain module", { status: "finished", notes: "First full-run Interleaved module (Mei + Liri). One trial: amplifies a virtue-matched spell (Protego came up bigger/steadier), dulls raw force." }),
    inv("cores", "Gauge stick (7-module)", { status: "finished", location: "workshop", notes: "Birch, graduated — centre mark for 2 modules, spaced up to 7. Made by Mei." }),
    inv("cores", "Threaded end-caps + core-lenses", { qty: 4, status: "in hand", notes: "Removable-core hardware: threaded caps, fisheye dowel lenses that seat a core and release it." }),
    inv("cores", "Core-whip / dragon heartstring", { status: "in hand", notes: "Handled bare — which is why Eldower sent him for gloves. ('Core-whip' naming per summary.)", flag: true }),

    // — Wood: stock blanks (RP_09 ledger; counts approximate) —
    inv("wood_stock", "Birch blanks", { qty: 5, notes: "Standing whole blanks (separate from the 6 harvest billets). ~count.", flag: true }),
    inv("wood_stock", "Rowan blanks", { qty: 3 }),
    inv("wood_stock", "Hawthorn blanks", { qty: 3 }),
    inv("wood_stock", "Oak blank", { qty: 1 }),
    inv("wood_stock", "Pine blank", { qty: 1 }),

    // — Wood: forest harvest (Wed 14 Sep, planed billets) —
    inv("wood_harvest", "Cherry billets", { qty: 6, status: "in hand", notes: "Planed, untouched. Caleb's wand wood." }),
    inv("wood_harvest", "Birch billets", { qty: 6, status: "in hand", notes: "Planed, untouched." }),

    // — Wood: special —
    inv("wood_special", "Willow whip", { qty: 1 }),
    inv("wood_special", "Hebridean offcut", { qty: 1 }),
    inv("wood_special", "Yew bowstave", { status: "seasoning", notes: "Green, sealed. To be returned to the forest in daylight to season where it grew. (One log calls it 'ash' once — prose preponderance is yew.)" }),
    inv("wood_special", "Iron bars (forged)", { qty: 2, status: "finished", notes: "Two iron billets bought in London (retconned to 2); forged into two tapered bars in the Room forge." }),
    inv("wood_special", "Whomping Willow whips", { qty: 5, status: "needs work", location: "in his bag", notes: "Living, furious wood — needs charm-taming. 1 earmarked as the cover-wand. Accounting was reconciled live; verify.", flag: true }),
    inv("wood_special", "Whomping Willow — with Flitwick", { qty: 1, status: "needs work", location: "with Flitwick", notes: "1 billet + 1 whip with Flitwick for charm-taming experiment. Verify.", flag: true }),
    inv("wood_special", "Whomping Willow — with Eldower", { qty: 1, status: "needs work", location: "with Eldower", notes: "1 whip held by Eldower. Verify.", flag: true }),

    // — Books —
    inv("books", "Timber and the True Edge", { status: "reference", location: "workshop", notes: "Woodworking (Room of Requirement). 'Choosing the Stick' / 'The Run of the Grain.'" }),
    inv("books", "The Lathe and the Living Grain", { status: "reference", location: "workshop", notes: "Woodworking (Room of Requirement)." }),
    inv("books", "Small Works: On Carving What Will Be Held", { status: "reference", location: "workshop", notes: "Woodworking (Room of Requirement)." }),
    inv("books", "Hesba Ollivander — Wandlore Compendium & Companion Owls", { status: "reference", location: "library (under glass)", notes: "Consulted, not owned. Ravenclaw end of the library." }),
    inv("books", "⚠ Twin-core / wandlore research books (Pince)", { status: "reference", notes: "Summaries list 'The Leading-Stone' / 'Like Calls to Like' / 'Cores Twinned and Kindred' (Greaves/Ashworth/Vask) — these titles do NOT appear in the prose. Confirm or remove.", flag: true }),

    // — Leather & gear (Coplowe, via Eldower) —
    inv("leather", "Dragonhide gloves (Hebridean Black)", { status: "on order", location: "Coplowe's, Slipshod Lane", notes: "Tried the left in-shop. Summaries say left for collection with Eldower, ~2G 4S owed — verify amount.", flag: true }),
    inv("leather", "Three-wand holster", { status: "on order", location: "Coplowe's", notes: "For carrying three wands. Eldower sent him; tell her Eldower sent you." }),

    // — Potion materials & kit —
    inv("potion_kit", "Silver-water demijohns", { qty: 2, status: "in hand", location: "Slughorn's office", notes: "Luminous well-water — visibly lit even at rest. White Lightning craves it (the cake's just the vehicle)." }),
    inv("potion_kit", "Ethanol (solvent stock)", { status: "in hand" }),
    inv("potion_kit", "Salamander blood", { status: "in hand" }),
    inv("potion_kit", "Ground wiggentree bark", { status: "in hand" }),
    inv("potion_kit", "Moondew + mint", { status: "in hand", notes: "Moondew is a moonlight crop — best cut at night." }),
    inv("potion_kit", "Titration / dilution kit + saline + potatoes", { status: "in hand", location: "Slughorn's office", notes: "For the Wiggenweld Unit assay (serial two-fold dilution, cut-closing at 30 min)." }),
  ],

  // Wiggenweld bench
  assay: {
    unit: "1 Wiggenweld Unit = Control at 1:16",
    method: "Most dilute Control that closes a standard cut at exactly 30 min. Each batch ranked by how far it dilutes and still closes at 30 min (two-fold serial dilution in saline). Re-read daily → decay curves (separates raw potency from shelf-stability).",
    owed: "Day-7 assay owed to Slughorn.",
  },
  potions: [
    { id: uid("pot"), label: "Control", status: "ruler", recipe: "All-water standard, boiled (gone amber).", notes: "The ruler. Pinned at 1:16 = 1 Unit.", readings: [] },
    { id: uid("pot"), label: "A", status: "joined", recipe: "Hot bark-and-salamander side + ethanol moondew/mint side (proper heat, then rested).", notes: "Cass's cold-ethanol arm. Bound; closed a cut inside a minute.", readings: [] },
    { id: uid("pot"), label: "B", status: "joined", recipe: "Same build as A, but the ethanol moondew/mint half is brought to brewing temp ~90s before the join.", notes: "Tests whether warming the ethanol helps the bind. Heated-ethanol twin of A.", readings: [] },
    { id: uid("pot"), label: "C", status: "joined", recipe: "Pure cold-join — no heat anywhere in the moondew side's history.", notes: "Cass's cleanest hypothesis. Bound, a breath behind A.", readings: [] },
    { id: uid("pot"), label: "D", status: "stalled", recipe: "Single jar, both halves cold ethanol, all-cold.", notes: "Cold bark-and-salamander side won't extract — thin/washed-out.", readings: [] },
    { id: uid("pot"), label: "E", status: "stalled", recipe: "Two halves, all-cold.", notes: "Moondew half clear & ready; cold bark half stalled like D.", readings: [] },
    { id: uid("pot"), label: "F", status: "joined", recipe: "Caleb's design — both halves ethanol; moondew side cold; bark-and-salamander side warmed slowly to a measured ~72°C (just under ethanol's boil), chasing the colour out.", notes: "Joined and held its colour. Awaiting dilution reads in Units.", readings: [] },
  ],

  characters: [
    { id: uid("ch"), name: "Mei Chang", role: "partner · Ravenclaw 7th, prefect", present: true, notes: "Walnut wand, unicorn-hair core. Building wands at the next lathe." },
    { id: uid("ch"), name: "Liri Penrose", role: "foursome · Hexfield announcer-in-training", present: true, notes: "Welsh. Dry from inside the intimacy, not at a distance from it." },
    { id: uid("ch"), name: "Imogen Vale", role: "foursome · Hufflepuff", present: false, notes: "Charts White Lightning's care." },
    { id: uid("ch"), name: "Eldower", role: "mentor · wandwright", present: false, notes: "Diagon bench. Took Caleb on after the wrong-hair wand." },
    { id: uid("ch"), name: "Cass Vance", role: "collaborator (cold-ethanol)", present: false, notes: "Platinum-blonde. Resigned the guild; wants the cold-ethanol paper on the record." },
    { id: uid("ch"), name: "Athena", role: "familiar · European Pygmy Owl", present: true, notes: "Tiny, fierce, slight starboard list. Sent Caleb to White Lightning." },
    { id: uid("ch"), name: "White Lightning", role: "unicorn · source of the tail-hair cores", present: false, notes: "At Hagrid's lean-to, splinted leg. Eats silver-water-dipped bark biscuits." },
  ],

  threads: [
    { id: uid("th"), title: "Collect dragonhide gloves + 3-wand holster from Coplowe", status: "open", notes: "Via Eldower." },
    { id: uid("th"), title: "Wiggenweld Unit assay — read A–F in Units", status: "open", notes: "Day-7 owed to Slughorn; build decay curves." },
    { id: uid("th"), title: "Batch F — run the dilution reads", status: "open", notes: "Does the careful ~72°C draw buy potency or shelf-life?" },
    { id: uid("th"), title: "Interleaved Wand — finish modular build + ceiling test", status: "open", notes: "Float weight to the bare-base limit, then re-test with the module: not stronger, further." },
    { id: uid("th"), title: "Aether-Slung tririb — finish from birch practice blanks", status: "open" },
    { id: uid("th"), title: "Get the yew bowstave to the forest in daylight to season", status: "open" },
    { id: uid("th"), title: "Flitwick — Whomping Willow charm-taming (Thursday note owed)", status: "open" },
    { id: uid("th"), title: "Sanctioned Eldower trip + Gloucestershire leg (Thu)", status: "open" },
  ],
};

// ---------------------------------------------------------------------------
// Digest — the "look it up and tell the Narrator" text
// ---------------------------------------------------------------------------
function buildDigest(s) {
  const byCat = (cid) => s.inventory.filter((i) => i.category === cid);
  const line = (i) => {
    const q = i.qty && i.qty !== 1 ? ` ×${i.qty}` : "";
    const st = i.status && i.status !== "in hand" ? ` [${i.status}]` : "";
    return `${i.flag ? "⚠ " : ""}${i.name}${q}${st}`;
  };
  const cat = (cid) => {
    const items = byCat(cid);
    if (!items.length) return null;
    const label = CATEGORIES.find((c) => c.id === cid)?.label || cid;
    return `${label.toUpperCase()}: ${items.map(line).join("; ")}.`;
  };
  const m = s.money;
  const moneyStr = `${m.galleons || 0}G ${m.sickles || 0}S ${m.knuts || 0}K`;

  const potions = s.potions
    .map((p) => {
      const reads = p.readings.length
        ? ` (reads: ${p.readings.map((r) => `d${r.day} ${r.units}`).join(", ")})`
        : "";
      return `${p.label} [${p.status}]${reads}`;
    })
    .join("; ");

  const threads = s.threads.filter((t) => t.status !== "done").map((t) => t.title).join("; ");

  return [
    `${s.player.name.toUpperCase()} — INVENTORY (as of ${s.clock.story_date})`,
    `Money: ${moneyStr}`,
    "",
    cat("wands"),
    cat("cores"),
    cat("wood_stock"),
    cat("wood_harvest"),
    cat("wood_special"),
    cat("books"),
    cat("leather"),
    cat("potion_kit"),
    cat("misc"),
    "",
    `WIGGENWELD BENCH — ${s.assay.unit}. ${potions}. ${s.assay.owed}`,
    "",
    `OPEN THREADS: ${threads}`,
  ].filter((x) => x !== null).join("\n");
}

// ---------------------------------------------------------------------------
// Minimal MCP sync (Anthropic API path). Experimental — server tools TBC.
// Pull = get_state(blob). Push = set_state(blob). Local always works regardless.
// ---------------------------------------------------------------------------
async function callMcpTool({ serverUrl, serverName, toolName, args }) {
  if (!serverUrl || !serverName || !toolName) return { ok: false, error: "missing serverUrl/serverName/toolName" };
  const prompt =
    `Call the tool \`${toolName}\` from the \`${serverName}\` MCP server with these arguments:\n\n` +
    "```json\n" + JSON.stringify(args || {}, null, 2) + "\n```\n\n" +
    `Invoke the tool only. Reply with just "done" afterward.`;
  let response;
  try {
    response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        messages: [{ role: "user", content: prompt }],
        mcp_servers: [{ type: "url", url: serverUrl, name: serverName }],
      }),
    });
  } catch (e) {
    return { ok: false, error: `network: ${e.message}` };
  }
  if (!response.ok) {
    let t = "";
    try { t = await response.text(); } catch {}
    return { ok: false, error: `HTTP ${response.status}: ${t.slice(0, 160)}` };
  }
  let data;
  try { data = await response.json(); } catch (e) { return { ok: false, error: `bad json: ${e.message}` }; }
  const blocks = (data.content || []).filter((b) => b.type === "mcp_tool_result" || b.type === "tool_result");
  if (!blocks.length) {
    const txt = (data.content || []).filter((b) => b.type === "text").map((b) => b.text).join("\n");
    return { ok: false, error: `no tool result. ${txt.slice(0, 160)}` };
  }
  const b = blocks[0];
  let payload = b;
  if (Array.isArray(b.content)) {
    const inner = b.content.filter((c) => c.type === "text").map((c) => c.text).join("");
    try { payload = JSON.parse(inner); } catch { payload = inner; }
  } else if (typeof b.content === "string") {
    try { payload = JSON.parse(b.content); } catch { payload = b.content; }
  }
  return { ok: true, result: payload };
}

// ---------------------------------------------------------------------------
// Reusable bits
// ---------------------------------------------------------------------------
function Section({ title, icon: Icon, accent = "amber", children, collapsible = false, defaultOpen = true, count = null, right = null }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-lg overflow-hidden">
      <div
        className={`px-4 py-3 flex items-center gap-2 border-b border-slate-800 ${collapsible ? "cursor-pointer hover:bg-slate-800/50" : ""}`}
        onClick={() => collapsible && setOpen(!open)}
      >
        {collapsible && (open ? <ChevronDown size={14} className="text-slate-500" /> : <ChevronRight size={14} className="text-slate-500" />)}
        {Icon && <Icon size={15} className={accentText[accent] || accentText.slate} />}
        <h2 className="text-sm font-serif font-semibold tracking-wide text-amber-100/90">
          {title}
          {count !== null && <span className="ml-2 text-slate-500 text-xs font-sans font-normal">({count})</span>}
        </h2>
        {right && <div className="ml-auto" onClick={(e) => e.stopPropagation()}>{right}</div>}
      </div>
      {(!collapsible || open) && <div className="p-4 space-y-3">{children}</div>}
    </div>
  );
}

function EditableField({ value, onChange, placeholder = "", className = "", multiline = false }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value || "");
  useEffect(() => setDraft(value || ""), [value]);
  const commit = () => { onChange(draft); setEditing(false); };
  if (editing) {
    if (multiline) {
      return (
        <textarea autoFocus value={draft} onChange={(e) => setDraft(e.target.value)} onBlur={commit}
          onKeyDown={(e) => { if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) commit(); if (e.key === "Escape") setEditing(false); }}
          className={`bg-slate-800 border border-slate-600 rounded px-2 py-1 text-sm text-slate-100 w-full resize-y min-h-[56px] ${className}`} />
      );
    }
    return (
      <input autoFocus value={draft} onChange={(e) => setDraft(e.target.value)} onBlur={commit}
        onKeyDown={(e) => { if (e.key === "Enter") commit(); if (e.key === "Escape") setEditing(false); }}
        placeholder={placeholder}
        className={`bg-slate-800 border border-slate-600 rounded px-2 py-1 text-sm text-slate-100 ${className}`} />
    );
  }
  return (
    <span onClick={() => setEditing(true)}
      className={`cursor-text hover:bg-slate-800/60 px-1 -mx-1 rounded ${!value ? "text-slate-600 italic" : "text-slate-200"} ${className}`}>
      {value || placeholder || "—"}
    </span>
  );
}

function SelectField({ value, onChange, options, className = "" }) {
  return (
    <select value={value || ""} onChange={(e) => onChange(e.target.value)}
      className={`bg-slate-800 border border-slate-600 rounded px-2 py-1 text-xs text-slate-200 ${className}`}>
      <option value="">—</option>
      {options.map((o) => <option key={o} value={o}>{o}</option>)}
    </select>
  );
}

function Pill({ children, color = "slate", className = "" }) {
  const map = {
    slate: "bg-slate-700/60 text-slate-300", amber: "bg-amber-700/30 text-amber-200",
    rose: "bg-rose-700/30 text-rose-200", emerald: "bg-emerald-700/30 text-emerald-200",
    blue: "bg-blue-700/30 text-blue-200", indigo: "bg-indigo-700/30 text-indigo-200",
  };
  return <span className={`text-xs px-2 py-0.5 rounded-full ${map[color] || map.slate} ${className}`}>{children}</span>;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
export default function MaraudersLedger() {
  const [state, setState] = useState(SEED);
  const [loaded, setLoaded] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [showDigest, setShowDigest] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [importText, setImportText] = useState("");
  const [importError, setImportError] = useState("");
  const [confirmReset, setConfirmReset] = useState(false);
  const [catFilter, setCatFilter] = useState("all");

  const [settings, setSettings] = useState({
    mode: "manual", serverUrl: "https://narrator.illucidate.org/mcp",
    serverName: "narrator-state", projectName: "marauders",
    pullTool: "get_state", pushTool: "set_state",
  });
  const [showSettings, setShowSettings] = useState(false);
  const [conn, setConn] = useState({ status: "idle", error: "", busy: 0 });
  const settingsRef = useRef(settings);
  useEffect(() => { settingsRef.current = settings; }, [settings]);

  // load
  useEffect(() => {
    (async () => {
      try {
        const r = await window.storage.get(STORAGE_KEY);
        if (r && r.value) setState({ ...SEED, ...JSON.parse(r.value) });
      } catch {}
      try {
        const r = await window.storage.get(SETTINGS_KEY);
        if (r && r.value) setSettings((s) => ({ ...s, ...JSON.parse(r.value) }));
      } catch {} finally { setLoaded(true); }
    })();
  }, []);
  // persist
  useEffect(() => { if (loaded) window.storage.set(STORAGE_KEY, JSON.stringify(state)).catch(() => {}); }, [state, loaded]);
  useEffect(() => { if (loaded) window.storage.set(SETTINGS_KEY, JSON.stringify(settings)).catch(() => {}); }, [settings, loaded]);

  // ---- mutators: inventory ----
  const addItem = (category) => setState((s) => ({
    ...s, inventory: [...s.inventory, inv(category, "New item", { notes: "" })],
  }));
  const updateItem = (id, patch) => setState((s) => ({
    ...s, inventory: s.inventory.map((i) => (i.id === id ? { ...i, ...patch } : i)),
  }));
  const removeItem = (id) => setState((s) => ({ ...s, inventory: s.inventory.filter((i) => i.id !== id) }));

  // ---- mutators: potions ----
  const updatePotion = (id, patch) => setState((s) => ({
    ...s, potions: s.potions.map((p) => (p.id === id ? { ...p, ...patch } : p)),
  }));
  const addPotion = () => setState((s) => ({
    ...s, potions: [...s.potions, { id: uid("pot"), label: "New", status: "brewing", recipe: "", notes: "", readings: [] }],
  }));
  const removePotion = (id) => setState((s) => ({ ...s, potions: s.potions.filter((p) => p.id !== id) }));
  const addReading = (pid) => setState((s) => ({
    ...s, potions: s.potions.map((p) => p.id === pid
      ? { ...p, readings: [...p.readings, { id: uid("rd"), day: "", units: "", note: "" }] } : p),
  }));
  const updateReading = (pid, rid, patch) => setState((s) => ({
    ...s, potions: s.potions.map((p) => p.id === pid
      ? { ...p, readings: p.readings.map((r) => (r.id === rid ? { ...r, ...patch } : r)) } : p),
  }));
  const removeReading = (pid, rid) => setState((s) => ({
    ...s, potions: s.potions.map((p) => p.id === pid ? { ...p, readings: p.readings.filter((r) => r.id !== rid) } : p),
  }));

  // ---- mutators: characters / threads / money ----
  const updateChar = (id, patch) => setState((s) => ({ ...s, characters: s.characters.map((c) => (c.id === id ? { ...c, ...patch } : c)) }));
  const addChar = () => setState((s) => ({ ...s, characters: [...s.characters, { id: uid("ch"), name: "New", role: "", present: false, notes: "" }] }));
  const removeChar = (id) => setState((s) => ({ ...s, characters: s.characters.filter((c) => c.id !== id) }));

  const updateThread = (id, patch) => setState((s) => ({ ...s, threads: s.threads.map((t) => (t.id === id ? { ...t, ...patch } : t)) }));
  const addThread = () => setState((s) => ({ ...s, threads: [...s.threads, { id: uid("th"), title: "New thread", status: "open", notes: "" }] }));
  const removeThread = (id) => setState((s) => ({ ...s, threads: s.threads.filter((t) => t.id !== id) }));

  const updateClock = (patch) => setState((s) => ({ ...s, clock: { ...s.clock, ...patch } }));
  const updatePlayer = (patch) => setState((s) => ({ ...s, player: { ...s.player, ...patch } }));
  const updateMoney = (patch) => setState((s) => ({ ...s, money: { ...s.money, ...patch } }));

  // ---- digest copy ----
  const digest = buildDigest(state);
  const digestRef = useRef(null);
  const copyDigest = async () => {
    try {
      if (digestRef.current) { digestRef.current.select(); document.execCommand("copy"); }
      else if (navigator.clipboard) await navigator.clipboard.writeText(digest);
      setCopied(true); setTimeout(() => setCopied(false), 1600);
    } catch {
      try { await navigator.clipboard.writeText(digest); setCopied(true); setTimeout(() => setCopied(false), 1600); } catch {}
    }
  };

  // ---- import / export ----
  const exportJson = () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `marauders-ledger-${new Date().toISOString().slice(0, 10)}.json`;
    a.click(); URL.revokeObjectURL(url);
  };
  const importJson = () => {
    try { setState({ ...SEED, ...JSON.parse(importText) }); setImportText(""); setShowImport(false); setImportError(""); }
    catch (e) { setImportError(`Parse error: ${e.message}`); }
  };

  // ---- sync (experimental) ----
  const pull = async () => {
    const s = settingsRef.current;
    setConn((c) => ({ ...c, busy: c.busy + 1, error: "" }));
    const res = await callMcpTool({ serverUrl: s.serverUrl, serverName: s.serverName, toolName: s.pullTool, args: { project: s.projectName } });
    setConn((c) => ({ ...c, busy: Math.max(0, c.busy - 1), status: res.ok ? "ok" : "error", error: res.ok ? "" : res.error }));
    if (!res.ok) return;
    const incoming = res.result?.state || res.result;
    if (incoming && typeof incoming === "object") setState((prev) => ({ ...prev, ...incoming }));
  };
  const push = async () => {
    const s = settingsRef.current;
    setConn((c) => ({ ...c, busy: c.busy + 1, error: "" }));
    const res = await callMcpTool({ serverUrl: s.serverUrl, serverName: s.serverName, toolName: s.pushTool, args: { project: s.projectName, state } });
    setConn((c) => ({ ...c, busy: Math.max(0, c.busy - 1), status: res.ok ? "ok" : "error", error: res.ok ? "" : res.error }));
  };
  const testConn = async () => {
    const s = settingsRef.current;
    setConn((c) => ({ ...c, status: "testing", error: "" }));
    const res = await callMcpTool({ serverUrl: s.serverUrl, serverName: s.serverName, toolName: s.pullTool, args: { project: s.projectName } });
    setConn((c) => ({ ...c, status: res.ok ? "ok" : "error", error: res.ok ? "" : res.error }));
  };

  if (!loaded) {
    return <div className="min-h-screen bg-slate-950 flex items-center justify-center"><div className="text-slate-500 text-sm font-serif">Opening the ledger…</div></div>;
  }

  const cats = catFilter === "all" ? CATEGORIES : CATEGORIES.filter((c) => c.id === catFilter);
  const flaggedCount = state.inventory.filter((i) => i.flag).length;
  const totalItems = state.inventory.length;

  const btn = "text-xs px-2.5 py-1 rounded border transition-colors";

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans">
      <div className="max-w-5xl mx-auto p-4 sm:p-6 space-y-4">

        {/* Header */}
        <div className="border-2 border-amber-700/30 rounded-lg p-4 bg-gradient-to-b from-slate-900/80 to-slate-950">
          <div className="flex items-start justify-between gap-3 flex-wrap mb-3">
            <div>
              <h1 className="text-2xl font-serif font-bold tracking-tight text-amber-100">{state.title}</h1>
              <div className="text-sm text-amber-200/50 font-serif italic -mt-0.5">{state.subtitle}</div>
              <div className="text-xs text-slate-500 mt-1">{state.player.name} · {state.player.role}</div>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <button onClick={() => setEditMode(!editMode)} className={`${btn} ${editMode ? "bg-amber-700/30 border-amber-600/60 text-amber-100" : "bg-slate-800 border-slate-600 text-slate-300 hover:bg-slate-700"}`}>
                {editMode ? <Save size={12} className="inline mr-1" /> : <Edit3 size={12} className="inline mr-1" />}{editMode ? "Done" : "Edit"}
              </button>
              <button onClick={() => setShowDigest(!showDigest)} className={`${btn} ${showDigest ? "bg-blue-800/50 border-blue-600/60 text-blue-100" : "bg-slate-800 border-slate-600 text-slate-300 hover:bg-slate-700"}`} title="Copy a digest for the Narrator">
                <Copy size={12} className="inline mr-1" />Digest
              </button>
              <button onClick={exportJson} className={`${btn} bg-slate-800 border-slate-600 text-slate-300 hover:bg-slate-700`} title="Export JSON"><Download size={12} /></button>
              <button onClick={() => setShowImport(!showImport)} className={`${btn} bg-slate-800 border-slate-600 text-slate-300 hover:bg-slate-700`} title="Import JSON"><Upload size={12} /></button>
              <button onClick={() => setShowSettings(!showSettings)} className={`${btn} ${showSettings ? "bg-slate-700 border-slate-500 text-slate-100" : "bg-slate-800 border-slate-600 text-slate-300 hover:bg-slate-700"}`} title="Sync settings"><SettingsIcon size={12} /></button>
            </div>
          </div>

          {/* clock + identity */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
            <div>
              <div className="text-xs text-slate-500 uppercase tracking-wide mb-0.5">Date</div>
              <EditableField value={state.clock.story_date} onChange={(v) => updateClock({ story_date: v })} className="text-amber-50 font-medium" />
            </div>
            <div>
              <div className="text-xs text-slate-500 uppercase tracking-wide mb-0.5">Time</div>
              <EditableField value={state.clock.story_time} onChange={(v) => updateClock({ story_time: v })} className="text-amber-50 font-mono" />
            </div>
            <div className="col-span-2">
              <div className="text-xs text-slate-500 uppercase tracking-wide mb-0.5 flex items-center gap-1"><MapPin size={10} /> Location</div>
              <EditableField value={state.clock.location} onChange={(v) => updateClock({ location: v })} className="text-amber-50" />
            </div>
          </div>

          {/* money */}
          <div className="mt-3 pt-3 border-t border-slate-800 flex items-center gap-4 flex-wrap text-sm">
            <span className="text-xs text-amber-300/70 uppercase tracking-wide flex items-center gap-1"><Coins size={11} /> Purse</span>
            {["galleons", "sickles", "knuts"].map((k) => (
              <span key={k} className="flex items-baseline gap-1">
                <span className="font-mono text-amber-100">
                  <EditableField value={String(state.money[k] || 0)} onChange={(v) => updateMoney({ [k]: parseInt(v, 10) || 0 })} className="font-mono" />
                </span>
                <span className="text-xs text-slate-500">{k === "galleons" ? "G" : k === "sickles" ? "S" : "K"}</span>
              </span>
            ))}
            <span className="text-xs text-slate-500 italic flex-1 min-w-[180px]">
              <EditableField value={state.money.notes} onChange={(v) => updateMoney({ notes: v })} placeholder="(purse notes)" />
            </span>
          </div>

          {flaggedCount > 0 && (
            <div className="mt-3 text-xs text-amber-300/70 flex items-center gap-1.5">
              <AlertTriangle size={12} /> {flaggedCount} item{flaggedCount > 1 ? "s" : ""} flagged ⚠ — unconfirmed against the prose; verify before quoting.
            </div>
          )}

          {/* connection status line */}
          {settings.mode === "connected" && (
            <div className="mt-2 text-xs flex items-center gap-2">
              {conn.busy > 0 ? <><RefreshCw size={11} className="text-blue-400 animate-spin" /><span className="text-blue-300">Syncing…</span></>
                : conn.status === "error" ? <><AlertTriangle size={11} className="text-rose-400" /><span className="text-rose-300 truncate">{conn.error}</span></>
                : <><Wifi size={11} className="text-emerald-400" /><span className="text-emerald-300/80">Connected mode</span>
                    <button onClick={pull} className="ml-1 underline text-slate-400 hover:text-slate-200">pull</button>
                    <button onClick={push} className="underline text-slate-400 hover:text-slate-200">push</button></>}
            </div>
          )}
        </div>

        {/* Digest panel */}
        {showDigest && (
          <div className="bg-slate-900 border border-blue-800/40 rounded-lg p-4 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-serif font-semibold text-blue-100 flex items-center gap-2"><Copy size={14} /> Narrator digest</h3>
              <div className="flex items-center gap-2">
                <button onClick={copyDigest} className={`${btn} ${copied ? "bg-emerald-700/40 border-emerald-600 text-emerald-100" : "bg-blue-800/50 border-blue-600 text-blue-100 hover:bg-blue-700/50"}`}>
                  {copied ? <><Check size={12} className="inline mr-1" />Copied</> : <><Copy size={12} className="inline mr-1" />Copy</>}
                </button>
                <button onClick={() => setShowDigest(false)} className="text-slate-500 hover:text-slate-300"><X size={14} /></button>
              </div>
            </div>
            <div className="text-xs text-slate-500">Paste this into the RP when you want the Narrator to know your current stock. Reflects every edit you've made.</div>
            <textarea ref={digestRef} readOnly value={digest} onFocus={(e) => e.target.select()}
              className="w-full h-56 bg-slate-950 border border-slate-700 rounded p-3 text-xs font-mono text-slate-200 leading-relaxed" />
          </div>
        )}

        {/* Import panel */}
        {showImport && (
          <div className="bg-slate-900 border border-slate-700 rounded-lg p-4">
            <div className="text-xs text-slate-400 mb-2">Paste an exported ledger JSON to overwrite the current one:</div>
            <textarea value={importText} onChange={(e) => setImportText(e.target.value)}
              className="w-full h-32 bg-slate-950 border border-slate-700 rounded p-2 text-xs font-mono text-slate-200" placeholder='{"schema_version":"1.0", ...}' />
            {importError && <div className="text-rose-400 text-xs mt-2 flex items-center gap-1"><AlertTriangle size={12} /> {importError}</div>}
            <div className="mt-2 flex gap-2">
              <button onClick={importJson} className="text-xs px-3 py-1 rounded bg-emerald-700 hover:bg-emerald-600 text-slate-100">Import (overwrites)</button>
              <button onClick={() => { setShowImport(false); setImportText(""); setImportError(""); }} className="text-xs px-3 py-1 rounded bg-slate-700 hover:bg-slate-600">Cancel</button>
            </div>
          </div>
        )}

        {/* Settings */}
        {showSettings && (
          <div className="bg-slate-900 border border-slate-700 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-serif font-semibold text-slate-200 flex items-center gap-2"><SettingsIcon size={14} /> Sync</h3>
              <button onClick={() => setShowSettings(false)} className="text-slate-500 hover:text-slate-300"><X size={14} /></button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => setSettings((s) => ({ ...s, mode: "manual" }))} className={`${btn} py-2 ${settings.mode === "manual" ? "bg-slate-700 border-slate-500 text-slate-100" : "bg-slate-800 border-slate-600 text-slate-400 hover:bg-slate-700"}`}>
                <WifiOff size={11} className="inline mr-1" />Local only
              </button>
              <button onClick={() => setSettings((s) => ({ ...s, mode: "connected" }))} className={`${btn} py-2 ${settings.mode === "connected" ? "bg-emerald-800/60 border-emerald-600/60 text-emerald-100" : "bg-slate-800 border-slate-600 text-slate-400 hover:bg-slate-700"}`}>
                <Wifi size={11} className="inline mr-1" />narrator-state
              </button>
            </div>
            {settings.mode === "manual" ? (
              <div className="text-xs text-slate-500 leading-relaxed">
                Everything lives locally and persists in this artifact. Use <strong className="text-slate-400">Digest</strong> to hand stock to the Narrator, or Export/Import to move the ledger. This is the recommended mode until we wire the server.
              </div>
            ) : (
              <div className="space-y-2">
                <div className="text-xs text-amber-300/70 leading-relaxed flex items-start gap-1.5">
                  <AlertTriangle size={12} className="mt-0.5 shrink-0" />
                  Experimental. Push/pull move the whole ledger as a blob via two tools (<code className="bg-slate-800 px-1 rounded">{settings.pullTool}</code> / <code className="bg-slate-800 px-1 rounded">{settings.pushTool}</code>). Your server must actually expose those — confirm the real tool names before relying on this (that's the conversation to have after this build).
                </div>
                <div className="grid sm:grid-cols-2 gap-2">
                  <label className="block text-xs text-slate-400">Server URL
                    <input value={settings.serverUrl} onChange={(e) => setSettings((s) => ({ ...s, serverUrl: e.target.value }))}
                      className="mt-1 w-full bg-slate-950 border border-slate-700 rounded p-1.5 text-xs font-mono text-slate-200" /></label>
                  <label className="block text-xs text-slate-400">Server name
                    <input value={settings.serverName} onChange={(e) => setSettings((s) => ({ ...s, serverName: e.target.value }))}
                      className="mt-1 w-full bg-slate-950 border border-slate-700 rounded p-1.5 text-xs font-mono text-slate-200" /></label>
                  <label className="block text-xs text-slate-400">Pull tool
                    <input value={settings.pullTool} onChange={(e) => setSettings((s) => ({ ...s, pullTool: e.target.value }))}
                      className="mt-1 w-full bg-slate-950 border border-slate-700 rounded p-1.5 text-xs font-mono text-slate-200" /></label>
                  <label className="block text-xs text-slate-400">Push tool
                    <input value={settings.pushTool} onChange={(e) => setSettings((s) => ({ ...s, pushTool: e.target.value }))}
                      className="mt-1 w-full bg-slate-950 border border-slate-700 rounded p-1.5 text-xs font-mono text-slate-200" /></label>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <button onClick={testConn} className={`${btn} bg-slate-800 border-slate-600 text-slate-200 hover:bg-slate-700`}>
                    {conn.status === "testing" ? <RefreshCw size={11} className="inline mr-1 animate-spin" /> : conn.status === "ok" ? <Check size={11} className="inline mr-1 text-emerald-400" /> : <Wifi size={11} className="inline mr-1" />}Test
                  </button>
                  <button onClick={pull} className={`${btn} bg-slate-800 border-slate-600 text-slate-200 hover:bg-slate-700`}><Download size={11} className="inline mr-1" />Pull</button>
                  <button onClick={push} className={`${btn} bg-slate-800 border-slate-600 text-slate-200 hover:bg-slate-700`}><Upload size={11} className="inline mr-1" />Push</button>
                  {conn.status === "error" && <span className="text-xs text-rose-400 flex items-center gap-1 truncate"><AlertTriangle size={11} /> {conn.error}</span>}
                </div>
              </div>
            )}
          </div>
        )}

        {/* INVENTORY — the centrepiece */}
        <Section title="Inventory" icon={Package} accent="amber" count={totalItems}
          right={
            <select value={catFilter} onChange={(e) => setCatFilter(e.target.value)}
              className="bg-slate-800 border border-slate-600 rounded px-2 py-1 text-xs text-slate-300">
              <option value="all">all categories</option>
              {CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
            </select>
          }>
          <div className="space-y-4">
            {cats.map((c) => {
              const items = state.inventory.filter((i) => i.category === c.id);
              if (!items.length && catFilter === "all" && !editMode) return null;
              const Icon = c.icon;
              return (
                <div key={c.id}>
                  <div className="flex items-center gap-2 mb-1.5">
                    <Icon size={13} className={accentText[c.accent] || accentText.slate} />
                    <h3 className="text-xs uppercase tracking-wide text-slate-400 font-medium">{c.label}</h3>
                    <span className="text-xs text-slate-600">({items.length})</span>
                    {editMode && <button onClick={() => addItem(c.id)} className="text-slate-500 hover:text-amber-300 ml-1"><Plus size={12} /></button>}
                  </div>
                  {items.length === 0 ? (
                    <div className="text-xs text-slate-600 italic pl-5">—</div>
                  ) : (
                    <ul className="space-y-1.5">
                      {items.map((i) => (
                        <li key={i.id} className="pl-5 flex items-start gap-2 group">
                          <span className="text-slate-600 font-mono text-xs shrink-0 w-8 text-right pt-0.5">{i.qty && i.qty !== 1 ? `×${i.qty}` : ""}</span>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className={`text-sm ${i.flag ? "text-amber-200" : "text-slate-100"}`}>
                                {i.flag && <AlertTriangle size={11} className="inline mr-1 text-amber-400" />}
                                <EditableField value={i.name} onChange={(v) => updateItem(i.id, { name: v })} />
                              </span>
                              {!editMode && i.status !== "in hand" && <Pill color={statusColor(i.status)}>{i.status}</Pill>}
                              {!editMode && i.location && <span className="text-xs text-slate-500 flex items-center gap-0.5"><MapPin size={9} />{i.location}</span>}
                            </div>
                            {(i.notes || editMode) && (
                              <div className="text-xs text-slate-500 mt-0.5">
                                <EditableField value={i.notes} onChange={(v) => updateItem(i.id, { notes: v })} placeholder="(notes)" multiline />
                              </div>
                            )}
                            {editMode && (
                              <div className="flex items-center gap-2 mt-1 flex-wrap">
                                <span className="flex items-center gap-1 text-xs text-slate-500">
                                  qty
                                  <button onClick={() => updateItem(i.id, { qty: Math.max(0, (i.qty || 1) - 1) })} className="px-1 hover:text-slate-200">−</button>
                                  <span className="font-mono text-slate-300 w-5 text-center">{i.qty}</span>
                                  <button onClick={() => updateItem(i.id, { qty: (i.qty || 0) + 1 })} className="px-1 hover:text-slate-200">+</button>
                                </span>
                                <SelectField value={i.status} onChange={(v) => updateItem(i.id, { status: v })} options={STATUS_OPTIONS} />
                                <SelectField value={i.category} onChange={(v) => updateItem(i.id, { category: v })} options={CATEGORIES.map((x) => x.id)} />
                                <span className="text-xs text-slate-500">loc <EditableField value={i.location} onChange={(v) => updateItem(i.id, { location: v })} placeholder="—" className="text-xs" /></span>
                                <label className="text-xs text-amber-300/70 flex items-center gap-1 cursor-pointer">
                                  <input type="checkbox" checked={i.flag} onChange={(e) => updateItem(i.id, { flag: e.target.checked })} className="accent-amber-500" />⚠
                                </label>
                              </div>
                            )}
                          </div>
                          {editMode && <button onClick={() => removeItem(i.id)} className="text-slate-600 hover:text-rose-400 opacity-0 group-hover:opacity-100 pt-0.5"><X size={12} /></button>}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        </Section>

        {/* WIGGENWELD BENCH */}
        <Section title="Wiggenweld Bench" icon={FlaskConical} accent="blue" count={state.potions.length}>
          <div className="bg-blue-950/30 border border-blue-900/40 rounded p-3 mb-3 text-xs space-y-1">
            <div className="text-blue-200 font-medium font-mono">{state.assay.unit}</div>
            <div className="text-slate-400 leading-relaxed">{state.assay.method}</div>
            <div className="text-amber-300/70">{state.assay.owed}</div>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {state.potions.map((p) => (
              <PotionCard key={p.id} p={p} editMode={editMode}
                onUpdate={(patch) => updatePotion(p.id, patch)} onRemove={() => removePotion(p.id)}
                onAddReading={() => addReading(p.id)} onUpdateReading={(rid, patch) => updateReading(p.id, rid, patch)}
                onRemoveReading={(rid) => removeReading(p.id, rid)} />
            ))}
          </div>
          {editMode && <button onClick={addPotion} className="text-xs text-slate-400 hover:text-blue-300 flex items-center gap-1 mt-3"><Plus size={11} /> Add batch</button>}
        </Section>

        {/* THREADS */}
        <Section title="Open threads" icon={ClipboardList} accent="amber" count={state.threads.filter((t) => t.status !== "done").length} collapsible defaultOpen>
          <ul className="space-y-2">
            {state.threads.map((t) => (
              <li key={t.id} className="flex items-start gap-2 group">
                <button onClick={() => editMode && updateThread(t.id, { status: t.status === "done" ? "open" : "done" })}
                  className={`mt-0.5 w-4 h-4 rounded border shrink-0 flex items-center justify-center ${t.status === "done" ? "bg-emerald-700/40 border-emerald-600" : "border-slate-600"} ${editMode ? "cursor-pointer" : "cursor-default"}`}>
                  {t.status === "done" && <Check size={10} className="text-emerald-300" />}
                </button>
                <div className="flex-1 min-w-0">
                  <div className={`text-sm ${t.status === "done" ? "text-slate-500 line-through" : "text-slate-200"}`}>
                    <EditableField value={t.title} onChange={(v) => updateThread(t.id, { title: v })} />
                  </div>
                  {(t.notes || editMode) && <div className="text-xs text-slate-500"><EditableField value={t.notes} onChange={(v) => updateThread(t.id, { notes: v })} placeholder="(notes)" /></div>}
                </div>
                {editMode && <button onClick={() => removeThread(t.id)} className="text-slate-600 hover:text-rose-400 opacity-0 group-hover:opacity-100"><X size={12} /></button>}
              </li>
            ))}
          </ul>
          {editMode && <button onClick={addThread} className="text-xs text-slate-400 hover:text-amber-300 flex items-center gap-1 mt-2"><Plus size={11} /> Add thread</button>}
        </Section>

        {/* CAST */}
        <Section title="Cast on hand" icon={Users} accent="indigo" count={state.characters.length} collapsible defaultOpen={false}>
          <div className="space-y-2">
            {state.characters.map((c) => (
              <div key={c.id} className="flex items-start gap-2 group">
                <span className={`mt-1 w-1.5 h-1.5 rounded-full shrink-0 ${c.present ? "bg-emerald-400" : "bg-slate-600"}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-medium text-slate-100"><EditableField value={c.name} onChange={(v) => updateChar(c.id, { name: v })} /></span>
                    <span className="text-xs text-slate-500"><EditableField value={c.role} onChange={(v) => updateChar(c.id, { role: v })} placeholder="role" /></span>
                    {editMode && <button onClick={() => updateChar(c.id, { present: !c.present })} className="text-xs text-emerald-400/80 hover:text-emerald-300">{c.present ? "present" : "off-screen"}</button>}
                  </div>
                  {(c.notes || editMode) && <div className="text-xs text-slate-500"><EditableField value={c.notes} onChange={(v) => updateChar(c.id, { notes: v })} placeholder="(notes)" /></div>}
                </div>
                {editMode && <button onClick={() => removeChar(c.id)} className="text-slate-600 hover:text-rose-400 opacity-0 group-hover:opacity-100"><X size={12} /></button>}
              </div>
            ))}
          </div>
          {editMode && <button onClick={addChar} className="text-xs text-slate-400 hover:text-indigo-300 flex items-center gap-1 mt-2"><Plus size={11} /> Add</button>}
        </Section>

        {/* footer / reset */}
        <div className="text-xs text-slate-600 text-center py-4 border-t border-slate-800">
          <div className="mb-2 font-serif italic text-slate-500">The prose is the record. Tracker entries are a convenience, not canon.</div>
          {confirmReset ? (
            <div className="flex items-center justify-center gap-2 text-slate-400">
              Reset to the seeded ledger? (your edits are lost)
              <button onClick={() => { setState(SEED); setConfirmReset(false); }} className="text-xs px-2 py-0.5 rounded bg-rose-700 hover:bg-rose-600 text-slate-100">Reset</button>
              <button onClick={() => setConfirmReset(false)} className="text-xs px-2 py-0.5 rounded bg-slate-700 hover:bg-slate-600">Cancel</button>
            </div>
          ) : (
            <button onClick={() => setConfirmReset(true)} className="text-slate-600 hover:text-rose-400 flex items-center gap-1 mx-auto"><RotateCcw size={11} /> Reset to seeded ledger</button>
          )}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Potion card
// ---------------------------------------------------------------------------
function PotionCard({ p, editMode, onUpdate, onRemove, onAddReading, onUpdateReading, onRemoveReading }) {
  const color = { ruler: "amber", joined: "emerald", stalled: "rose", brewing: "blue", "pending reads": "indigo" }[p.status] || "slate";
  return (
    <div className="bg-slate-800/40 rounded-lg p-3 border border-slate-700/50">
      <div className="flex items-center gap-2 mb-1.5">
        <span className="font-serif font-bold text-amber-100 text-lg leading-none">
          <EditableField value={p.label} onChange={(v) => onUpdate({ label: v })} className="font-serif" />
        </span>
        {editMode ? <SelectField value={p.status} onChange={(v) => onUpdate({ status: v })} options={POTION_STATUS} /> : <Pill color={color}>{p.status}</Pill>}
        {editMode && <button onClick={onRemove} className="ml-auto text-slate-600 hover:text-rose-400"><X size={12} /></button>}
      </div>
      <div className="text-xs text-slate-400 leading-relaxed mb-1">
        <EditableField value={p.recipe} onChange={(v) => onUpdate({ recipe: v })} placeholder="(recipe)" multiline />
      </div>
      {(p.notes || editMode) && (
        <div className="text-xs text-slate-500 italic mb-2">
          <EditableField value={p.notes} onChange={(v) => onUpdate({ notes: v })} placeholder="(notes)" multiline />
        </div>
      )}
      {/* readings */}
      <div className="border-t border-slate-700/50 pt-2">
        <div className="text-[10px] uppercase tracking-wide text-slate-500 mb-1 flex items-center justify-between">
          <span>Potency reads (Units)</span>
          {editMode && <button onClick={onAddReading} className="text-slate-500 hover:text-blue-300"><Plus size={11} /></button>}
        </div>
        {p.readings.length === 0 ? (
          <div className="text-[11px] text-slate-600 italic">no reads yet</div>
        ) : (
          <table className="w-full text-xs">
            <tbody>
              {p.readings.map((r) => (
                <tr key={r.id} className="group">
                  <td className="text-slate-500 pr-2 py-0.5 w-12">day <EditableField value={String(r.day)} onChange={(v) => onUpdateReading(r.id, { day: v })} className="font-mono" /></td>
                  <td className="font-mono text-blue-200 pr-2 w-16"><EditableField value={r.units} onChange={(v) => onUpdateReading(r.id, { units: v })} placeholder="1:n" className="font-mono" /></td>
                  <td className="text-slate-500"><EditableField value={r.note} onChange={(v) => onUpdateReading(r.id, { note: v })} placeholder="(note)" /></td>
                  {editMode && <td className="w-4"><button onClick={() => onRemoveReading(r.id)} className="text-slate-600 hover:text-rose-400 opacity-0 group-hover:opacity-100"><X size={10} /></button></td>}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
