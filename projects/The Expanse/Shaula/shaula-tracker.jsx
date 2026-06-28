import React, { useState, useEffect, useRef } from "react";

// --- OPA Terminal Tracker for the SHAULA project ---
// Single-key persistent storage. All edits flush back to one Supabase row.

const STORAGE_KEY = "shaula:state";

// ---- Display dictionaries ----------------------------------------------------

const LOCATION_NAMES = {
  medina_berth_t4: "Medina · Tier 4 · Slip 4-Echo-3",
  medina_souk: "Medina · The Souk",
  ship_bridge: "Promise · Bridge",
  ship_engineering: "Promise · Engineering",
  ship_medbay: "Promise · Medical Bay",
  ship_galley: "Promise · Galley",
  ship_bunks: "Promise · Crew Bunks",
  ship_cargo: "Promise · Cargo / Survey",
  ship_airlock: "Promise · Airlock",
  azorana_dock: "Azorana · Dock",
  azorana_command: "Azorana · Command Level",
  azorana_sasa_bar: "Azorana · Sasa Bar",
  azorana_archive: "Azorana · TGCC Archive",
  azorana_itinerant_berths: "Azorana · Itinerant Berths",
  ibere_surface: "Ibẹrẹ · Surface Pad",
  ibere_elevator: "Ibẹrẹ · Main Elevator",
  ibere_admin: "Ibẹrẹ · Admin Levels",
  ibere_soji_office: "Ibẹrẹ · Soji's Office",
  ibere_ops_north: "Ibẹrẹ · North Tunnels",
  ibere_ops_south: "Ibẹrẹ · South Tunnels",
  ibere_ops_central: "Ibẹrẹ · Central Ops",
  ibere_ops_deep: "Ibẹrẹ · Deep Ops",
  ibere_mess: "Ibẹrẹ · The Mess",
  ibere_medical: "Ibẹrẹ · Medical Wing",
  el_dorado_approach: "El Dorado · Cliff Pad",
  el_dorado_pavilion: "El Dorado · Pavilion",
  el_dorado_cortez_office: "El Dorado · Cortez's Office",
  el_dorado_survey: "El Dorado · Survey Wing",
  el_dorado_reading_room: "El Dorado · Reading Room",
  kerent_approach: "Kerent · Approach",
  kerent_lab: "Kerent · Main Lab",
  kerent_bunker: "Kerent · Sample Bunker",
  spike_un_post: "Spike · UN Observation Post",
  spike_perimeter: "Spike · 3km Perimeter",
  spike_proximate: "Spike · Proximate (≤500m)",
  tunnels_eight_branch: "Tunnels · Eight-Branch Grotto",
  tunnels_verdant_pool: "Tunnels · Verdant Pool",
  tunnels_south_network: "Tunnels · South Network",
  tunnels_mole_field: "Tunnels · Breaching Moles",
  tunnels_halverson_site: "Tunnels · Halverson Site",
};

const CREW_NAMES = {
  naima: "Naima",
  leksi: "Leksi",
  aanya: "Aanya",
  kit: "Kit",
};

const STORM_PHASES = {
  clear: { label: "CLEAR", urgency: 0 },
  building_72h: { label: "BUILDING · 72h", urgency: 1 },
  building_24h: { label: "BUILDING · 24h", urgency: 2 },
  building_6h: { label: "BUILDING · 6h", urgency: 3 },
  lockdown: { label: "LOCKDOWN", urgency: 4 },
  peak_minus_60: { label: "PEAK − 60m", urgency: 4 },
  peak_minus_30: { label: "PEAK − 30m", urgency: 5 },
  peak: { label: "PEAK", urgency: 5 },
  subsiding: { label: "SUBSIDING", urgency: 2 },
};

const MOODS = ["clear", "tense", "wired", "exhausted", "quiet", "bereaved", "wary", "warm"];

// ---- Default state (Day 0 cold open) ----------------------------------------

const defaultState = {
  state: {
    day: 0,
    time: "0900",
    location: "medina_berth_t4",
    g_load: 0.6,
    o2_hrs: null,
    storm_phase: "clear",
    depth: 0,
    fortune: 12,
    crew_present: ["naima"],
    mood: "wary",
    last_updated: new Date().toISOString(),
  },
  commitments: [],
  theories: [],
  inventory: [
    { id: "duffel", name: "Survey Corps duffel", notes: "Standard issue." },
    { id: "certs", name: "Cert paperwork tube", notes: "Clipped to strap." },
    { id: "hand_terminal", name: "SMC hand terminal", notes: "Briefing materials loaded." },
  ],
  quests: [],
  knowledge_wall: [],
};

// ---- Storage helpers ---------------------------------------------------------

async function loadState() {
  try {
    const result = await window.storage.get(STORAGE_KEY);
    if (result && result.value) return JSON.parse(result.value);
  } catch (e) {
    // Key not found is normal on first run.
  }
  return defaultState;
}

async function saveState(s) {
  try {
    await window.storage.set(STORAGE_KEY, JSON.stringify(s));
    return true;
  } catch (e) {
    console.error("save failed", e);
    return false;
  }
}

// ---- Style constants ---------------------------------------------------------

const C = {
  bg: "#06070a",
  bgPanel: "#0c0d11",
  bgPanelHover: "#13141a",
  amber: "#ff9530",
  amberBright: "#ffaf52",
  amberDim: "#a35d1f",
  amberFaint: "#5a3614",
  amberGhost: "#2a1808",
  red: "#e34a3a",
  green: "#4caf80",
  border: "#3a2410",
  borderBright: "#7a4820",
};

// ---- Inline OPA emblem (split-circle) ---------------------------------------

const OpaEmblem = ({ size = 28, opacity = 0.6 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={{ opacity }}>
    <circle cx="50" cy="50" r="44" fill="none" stroke={C.amber} strokeWidth="4" />
    <path d="M 6 50 L 94 50" stroke={C.amber} strokeWidth="4" />
    <path
      d="M 50 6 A 44 44 0 0 1 50 94 Z"
      fill={C.amber}
      opacity="0.18"
    />
  </svg>
);

// ---- Storm-phase waveform indicator -----------------------------------------

const StormBar = ({ phase }) => {
  const u = STORM_PHASES[phase]?.urgency ?? 0;
  const bars = 6;
  return (
    <div className="flex items-end gap-1 h-5">
      {Array.from({ length: bars }).map((_, i) => {
        const active = i < u;
        const peak = u >= 5 && i >= 4;
        return (
          <div
            key={i}
            style={{
              width: 4,
              height: 4 + i * 3,
              background: active ? (peak ? C.red : C.amber) : C.amberGhost,
              transition: "background 240ms",
            }}
          />
        );
      })}
    </div>
  );
};

// ---- DEPTH ladder ------------------------------------------------------------

const DepthLadder = ({ depth }) => (
  <div className="flex flex-col-reverse gap-1">
    {[0, 1, 2, 3, 4, 5].map((rung) => {
      const lit = rung <= depth;
      return (
        <div
          key={rung}
          className="flex items-center gap-2"
          style={{ opacity: lit ? 1 : 0.28 }}
        >
          <div
            style={{
              width: 18,
              height: 6,
              background: lit ? (rung === depth ? C.amberBright : C.amberDim) : C.amberGhost,
              transition: "all 240ms",
            }}
          />
          <span
            style={{
              fontFamily: "VT323, monospace",
              fontSize: 16,
              color: lit ? (rung === depth ? C.amberBright : C.amberDim) : C.amberGhost,
            }}
          >
            D{rung}
          </span>
        </div>
      );
    })}
  </div>
);

// ---- Section header ----------------------------------------------------------

const SectionHeader = ({ children, count }) => (
  <div
    className="flex items-center justify-between px-3 py-2"
    style={{
      borderBottom: `1px solid ${C.border}`,
      background: "linear-gradient(90deg, rgba(255,149,48,0.08) 0%, transparent 100%)",
    }}
  >
    <span
      style={{
        fontFamily: "VT323, monospace",
        fontSize: 22,
        color: C.amber,
        letterSpacing: 2,
        textTransform: "uppercase",
      }}
    >
      {children}
    </span>
    {count !== undefined && (
      <span
        style={{
          fontFamily: "VT323, monospace",
          fontSize: 18,
          color: C.amberDim,
        }}
      >
        [{count}]
      </span>
    )}
  </div>
);

// ---- Editable text helper ----------------------------------------------------

const EditableField = ({ value, onChange, placeholder, multiline = false }) => {
  const Tag = multiline ? "textarea" : "input";
  return (
    <Tag
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={multiline ? 2 : undefined}
      style={{
        background: "transparent",
        border: "none",
        outline: "none",
        color: C.amberBright,
        fontFamily: "JetBrains Mono, IBM Plex Mono, monospace",
        fontSize: 13,
        width: "100%",
        resize: multiline ? "vertical" : "none",
        padding: 4,
      }}
      onFocus={(e) => (e.target.style.background = "rgba(255,149,48,0.06)")}
      onBlur={(e) => (e.target.style.background = "transparent")}
    />
  );
};

// ---- State Panel -------------------------------------------------------------

const StatePanel = ({ state, onChange }) => {
  const setField = (k, v) => onChange({ ...state, [k]: v, last_updated: new Date().toISOString() });

  return (
    <div>
      <SectionHeader>Current State</SectionHeader>
      <div className="grid grid-cols-12 gap-3 p-4">
        {/* Left: Day, Time, Location, Mood */}
        <div className="col-span-7 flex flex-col gap-3">
          <div className="flex items-baseline gap-3">
            <span style={{ fontFamily: "VT323, monospace", fontSize: 14, color: C.amberDim }}>DAY</span>
            <input
              type="number"
              value={state.day}
              min={0}
              max={10}
              onChange={(e) => setField("day", parseInt(e.target.value) || 0)}
              style={{
                background: "transparent",
                border: `1px solid ${C.border}`,
                color: C.amberBright,
                fontFamily: "VT323, monospace",
                fontSize: 32,
                width: 64,
                padding: "0 8px",
                outline: "none",
              }}
            />
            <span style={{ fontFamily: "VT323, monospace", fontSize: 14, color: C.amberDim }}>· TIME</span>
            <input
              value={state.time}
              onChange={(e) => setField("time", e.target.value)}
              maxLength={4}
              style={{
                background: "transparent",
                border: `1px solid ${C.border}`,
                color: C.amberBright,
                fontFamily: "VT323, monospace",
                fontSize: 32,
                width: 80,
                padding: "0 8px",
                outline: "none",
                letterSpacing: 2,
              }}
            />
          </div>
          <div className="flex items-baseline gap-2">
            <span style={{ fontFamily: "VT323, monospace", fontSize: 14, color: C.amberDim, minWidth: 40 }}>LOC</span>
            <select
              value={state.location}
              onChange={(e) => setField("location", e.target.value)}
              style={{
                background: C.bg,
                border: `1px solid ${C.border}`,
                color: C.amberBright,
                fontFamily: "JetBrains Mono, monospace",
                fontSize: 12,
                padding: "4px 6px",
                outline: "none",
                flex: 1,
              }}
            >
              {Object.entries(LOCATION_NAMES).map(([k, v]) => (
                <option key={k} value={k} style={{ background: C.bg }}>
                  {v}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-baseline gap-2">
            <span style={{ fontFamily: "VT323, monospace", fontSize: 14, color: C.amberDim, minWidth: 40 }}>MOOD</span>
            <select
              value={state.mood}
              onChange={(e) => setField("mood", e.target.value)}
              style={{
                background: C.bg,
                border: `1px solid ${C.border}`,
                color: C.amberBright,
                fontFamily: "JetBrains Mono, monospace",
                fontSize: 12,
                padding: "4px 6px",
                outline: "none",
                width: 140,
              }}
            >
              {MOODS.map((m) => (
                <option key={m} value={m} style={{ background: C.bg }}>
                  {m}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-start gap-2">
            <span style={{ fontFamily: "VT323, monospace", fontSize: 14, color: C.amberDim, minWidth: 40, paddingTop: 4 }}>CREW</span>
            <div className="flex flex-wrap gap-2">
              {Object.entries(CREW_NAMES).map(([k, v]) => {
                const present = state.crew_present.includes(k);
                return (
                  <button
                    key={k}
                    onClick={() => {
                      const next = present
                        ? state.crew_present.filter((c) => c !== k)
                        : [...state.crew_present, k];
                      setField("crew_present", next);
                    }}
                    style={{
                      background: present ? "rgba(255,149,48,0.18)" : "transparent",
                      border: `1px solid ${present ? C.amber : C.border}`,
                      color: present ? C.amberBright : C.amberFaint,
                      fontFamily: "JetBrains Mono, monospace",
                      fontSize: 11,
                      padding: "4px 10px",
                      cursor: "pointer",
                      letterSpacing: 1,
                    }}
                  >
                    {v.toUpperCase()}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: g-load, storm, fortune, depth */}
        <div className="col-span-5 flex flex-col gap-3">
          <div className="grid grid-cols-3 gap-2">
            <div style={{ border: `1px solid ${C.border}`, padding: "6px 8px" }}>
              <div style={{ fontFamily: "VT323, monospace", fontSize: 11, color: C.amberDim, letterSpacing: 1 }}>G-LOAD</div>
              <input
                type="number"
                step={0.1}
                value={state.g_load}
                onChange={(e) => setField("g_load", parseFloat(e.target.value) || 0)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: state.g_load >= 1.5 ? C.red : C.amberBright,
                  fontFamily: "VT323, monospace",
                  fontSize: 22,
                  width: "100%",
                  outline: "none",
                  padding: 0,
                }}
              />
            </div>
            <div style={{ border: `1px solid ${C.border}`, padding: "6px 8px" }}>
              <div style={{ fontFamily: "VT323, monospace", fontSize: 11, color: C.amberDim, letterSpacing: 1 }}>O₂ HRS</div>
              <input
                type="number"
                step={0.1}
                value={state.o2_hrs ?? ""}
                placeholder="--"
                onChange={(e) =>
                  setField("o2_hrs", e.target.value === "" ? null : parseFloat(e.target.value))
                }
                style={{
                  background: "transparent",
                  border: "none",
                  color: state.o2_hrs !== null && state.o2_hrs < 2 ? C.red : C.amberBright,
                  fontFamily: "VT323, monospace",
                  fontSize: 22,
                  width: "100%",
                  outline: "none",
                  padding: 0,
                }}
              />
            </div>
            <div style={{ border: `1px solid ${C.border}`, padding: "6px 8px" }}>
              <div style={{ fontFamily: "VT323, monospace", fontSize: 11, color: C.amberDim, letterSpacing: 1 }}>FORTUNE</div>
              <input
                type="number"
                value={state.fortune}
                onChange={(e) => setField("fortune", parseInt(e.target.value) || 0)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: state.fortune <= 3 ? C.red : C.amberBright,
                  fontFamily: "VT323, monospace",
                  fontSize: 22,
                  width: "100%",
                  outline: "none",
                  padding: 0,
                }}
              />
            </div>
          </div>

          <div style={{ border: `1px solid ${C.border}`, padding: "6px 10px" }}>
            <div className="flex items-center justify-between mb-1">
              <span style={{ fontFamily: "VT323, monospace", fontSize: 11, color: C.amberDim, letterSpacing: 1 }}>
                STORM PHASE
              </span>
              <StormBar phase={state.storm_phase} />
            </div>
            <select
              value={state.storm_phase}
              onChange={(e) => setField("storm_phase", e.target.value)}
              style={{
                background: C.bg,
                border: `1px solid ${C.amberGhost}`,
                color: STORM_PHASES[state.storm_phase].urgency >= 4 ? C.red : C.amberBright,
                fontFamily: "VT323, monospace",
                fontSize: 18,
                padding: "2px 6px",
                outline: "none",
                width: "100%",
                letterSpacing: 1,
              }}
            >
              {Object.entries(STORM_PHASES).map(([k, v]) => (
                <option key={k} value={k} style={{ background: C.bg }}>
                  {v.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-4" style={{ border: `1px solid ${C.border}`, padding: "6px 10px" }}>
            <div className="flex flex-col">
              <span style={{ fontFamily: "VT323, monospace", fontSize: 11, color: C.amberDim, letterSpacing: 1 }}>
                DEPTH
              </span>
              <input
                type="number"
                value={state.depth}
                min={0}
                max={5}
                onChange={(e) => setField("depth", Math.max(0, Math.min(5, parseInt(e.target.value) || 0)))}
                style={{
                  background: "transparent",
                  border: "none",
                  color: C.amberBright,
                  fontFamily: "VT323, monospace",
                  fontSize: 28,
                  width: 40,
                  outline: "none",
                  padding: 0,
                }}
              />
            </div>
            <DepthLadder depth={state.depth} />
          </div>
        </div>
      </div>
    </div>
  );
};

// ---- Commitment Log ----------------------------------------------------------

const CommitmentLog = ({ items, onChange }) => {
  const [draft, setDraft] = useState("");
  const add = () => {
    if (!draft.trim()) return;
    const stamp = new Date().toISOString().slice(0, 16).replace("T", " ");
    onChange([...items, { id: `c_${Date.now()}`, stamp, text: draft.trim() }]);
    setDraft("");
  };
  const remove = (id) => onChange(items.filter((i) => i.id !== id));
  const update = (id, text) => onChange(items.map((i) => (i.id === id ? { ...i, text } : i)));

  return (
    <div>
      <SectionHeader count={items.length}>Commitment Log</SectionHeader>
      <div className="p-3 flex flex-col gap-1.5 max-h-72 overflow-y-auto">
        {items.length === 0 && (
          <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 12, color: C.amberFaint, fontStyle: "italic", padding: 8 }}>
            -- no commitments yet --
          </div>
        )}
        {items.map((c) => (
          <div key={c.id} className="flex gap-2 items-start group">
            <span
              style={{
                fontFamily: "VT323, monospace",
                fontSize: 14,
                color: C.amberDim,
                minWidth: 110,
                paddingTop: 6,
              }}
            >
              [{c.stamp}]
            </span>
            <EditableField value={c.text} onChange={(v) => update(c.id, v)} multiline />
            <button
              onClick={() => remove(c.id)}
              style={{
                background: "transparent",
                border: "none",
                color: C.amberFaint,
                cursor: "pointer",
                fontFamily: "VT323, monospace",
                fontSize: 18,
                padding: "0 6px",
                opacity: 0.4,
              }}
              onMouseEnter={(e) => (e.target.style.color = C.red)}
              onMouseLeave={(e) => (e.target.style.color = C.amberFaint)}
              title="remove"
            >
              ×
            </button>
          </div>
        ))}
      </div>
      <div className="flex gap-2 px-3 pb-3 pt-1" style={{ borderTop: `1px solid ${C.amberGhost}` }}>
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && add()}
          placeholder="commit a fact..."
          style={{
            background: "transparent",
            border: `1px solid ${C.border}`,
            color: C.amberBright,
            fontFamily: "JetBrains Mono, monospace",
            fontSize: 12,
            flex: 1,
            padding: "6px 8px",
            outline: "none",
          }}
        />
        <button
          onClick={add}
          style={{
            background: "rgba(255,149,48,0.12)",
            border: `1px solid ${C.amber}`,
            color: C.amberBright,
            fontFamily: "VT323, monospace",
            fontSize: 16,
            padding: "0 16px",
            cursor: "pointer",
            letterSpacing: 1,
          }}
        >
          ADD
        </button>
      </div>
    </div>
  );
};

// ---- Theory Ledger -----------------------------------------------------------

const CONFIDENCES = ["LOW", "MED", "HIGH"];

const TheoryLedger = ({ items, onChange }) => {
  const [draft, setDraft] = useState("");
  const add = () => {
    if (!draft.trim()) return;
    onChange([
      ...items,
      {
        id: `t_${Date.now()}`,
        theory: draft.trim(),
        confidence: "LOW",
        supporting: "",
        falsifiers: "",
      },
    ]);
    setDraft("");
  };
  const remove = (id) => onChange(items.filter((i) => i.id !== id));
  const update = (id, k, v) => onChange(items.map((i) => (i.id === id ? { ...i, [k]: v } : i)));

  return (
    <div>
      <SectionHeader count={items.length}>Theory Ledger</SectionHeader>
      <div className="p-3 flex flex-col gap-3 max-h-96 overflow-y-auto">
        {items.length === 0 && (
          <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 12, color: C.amberFaint, fontStyle: "italic", padding: 8 }}>
            -- no theories yet --
          </div>
        )}
        {items.map((t) => (
          <div key={t.id} style={{ border: `1px solid ${C.border}`, padding: 10 }}>
            <div className="flex justify-between items-start gap-2">
              <div className="flex-1">
                <EditableField value={t.theory} onChange={(v) => update(t.id, "theory", v)} placeholder="theory..." />
              </div>
              <select
                value={t.confidence}
                onChange={(e) => update(t.id, "confidence", e.target.value)}
                style={{
                  background: C.bg,
                  border: `1px solid ${C.border}`,
                  color:
                    t.confidence === "HIGH"
                      ? C.amberBright
                      : t.confidence === "MED"
                      ? C.amber
                      : C.amberDim,
                  fontFamily: "VT323, monospace",
                  fontSize: 14,
                  padding: "2px 6px",
                  outline: "none",
                }}
              >
                {CONFIDENCES.map((c) => (
                  <option key={c} value={c} style={{ background: C.bg }}>
                    {c}
                  </option>
                ))}
              </select>
              <button
                onClick={() => remove(t.id)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: C.amberFaint,
                  cursor: "pointer",
                  fontSize: 18,
                  fontFamily: "VT323, monospace",
                  opacity: 0.4,
                }}
                onMouseEnter={(e) => (e.target.style.color = C.red)}
                onMouseLeave={(e) => (e.target.style.color = C.amberFaint)}
              >
                ×
              </button>
            </div>
            <div className="mt-2 grid grid-cols-2 gap-3">
              <div>
                <div style={{ fontFamily: "VT323, monospace", fontSize: 11, color: C.amberDim, letterSpacing: 1 }}>
                  SUPPORTING
                </div>
                <EditableField
                  value={t.supporting}
                  onChange={(v) => update(t.id, "supporting", v)}
                  placeholder="evidence..."
                  multiline
                />
              </div>
              <div>
                <div style={{ fontFamily: "VT323, monospace", fontSize: 11, color: C.amberDim, letterSpacing: 1 }}>
                  FALSIFIERS
                </div>
                <EditableField
                  value={t.falsifiers}
                  onChange={(v) => update(t.id, "falsifiers", v)}
                  placeholder="what would knock it down..."
                  multiline
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-2 px-3 pb-3 pt-1" style={{ borderTop: `1px solid ${C.amberGhost}` }}>
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && add()}
          placeholder="propose a theory..."
          style={{
            background: "transparent",
            border: `1px solid ${C.border}`,
            color: C.amberBright,
            fontFamily: "JetBrains Mono, monospace",
            fontSize: 12,
            flex: 1,
            padding: "6px 8px",
            outline: "none",
          }}
        />
        <button
          onClick={add}
          style={{
            background: "rgba(255,149,48,0.12)",
            border: `1px solid ${C.amber}`,
            color: C.amberBright,
            fontFamily: "VT323, monospace",
            fontSize: 16,
            padding: "0 16px",
            cursor: "pointer",
            letterSpacing: 1,
          }}
        >
          ADD
        </button>
      </div>
    </div>
  );
};

// ---- Inventory ---------------------------------------------------------------

const Inventory = ({ items, onChange }) => {
  const [draft, setDraft] = useState("");
  const add = () => {
    if (!draft.trim()) return;
    onChange([...items, { id: `i_${Date.now()}`, name: draft.trim(), notes: "" }]);
    setDraft("");
  };
  const remove = (id) => onChange(items.filter((i) => i.id !== id));
  const update = (id, k, v) => onChange(items.map((i) => (i.id === id ? { ...i, [k]: v } : i)));

  return (
    <div>
      <SectionHeader count={items.length}>Inventory</SectionHeader>
      <div className="p-3 flex flex-col gap-1.5 max-h-72 overflow-y-auto">
        {items.length === 0 && (
          <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 12, color: C.amberFaint, fontStyle: "italic", padding: 8 }}>
            -- empty --
          </div>
        )}
        {items.map((it) => (
          <div key={it.id} className="grid grid-cols-12 gap-2 items-center" style={{ borderBottom: `1px dashed ${C.amberGhost}`, paddingBottom: 4 }}>
            <div className="col-span-4">
              <EditableField value={it.name} onChange={(v) => update(it.id, "name", v)} />
            </div>
            <div className="col-span-7">
              <EditableField value={it.notes} onChange={(v) => update(it.id, "notes", v)} placeholder="notes..." />
            </div>
            <button
              onClick={() => remove(it.id)}
              className="col-span-1"
              style={{
                background: "transparent",
                border: "none",
                color: C.amberFaint,
                cursor: "pointer",
                fontSize: 18,
                fontFamily: "VT323, monospace",
                opacity: 0.4,
              }}
              onMouseEnter={(e) => (e.target.style.color = C.red)}
              onMouseLeave={(e) => (e.target.style.color = C.amberFaint)}
            >
              ×
            </button>
          </div>
        ))}
      </div>
      <div className="flex gap-2 px-3 pb-3 pt-1" style={{ borderTop: `1px solid ${C.amberGhost}` }}>
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && add()}
          placeholder="item name..."
          style={{
            background: "transparent",
            border: `1px solid ${C.border}`,
            color: C.amberBright,
            fontFamily: "JetBrains Mono, monospace",
            fontSize: 12,
            flex: 1,
            padding: "6px 8px",
            outline: "none",
          }}
        />
        <button
          onClick={add}
          style={{
            background: "rgba(255,149,48,0.12)",
            border: `1px solid ${C.amber}`,
            color: C.amberBright,
            fontFamily: "VT323, monospace",
            fontSize: 16,
            padding: "0 16px",
            cursor: "pointer",
            letterSpacing: 1,
          }}
        >
          ADD
        </button>
      </div>
    </div>
  );
};

// ---- Quests ------------------------------------------------------------------

const QUEST_STATUSES = ["active", "dormant", "resolved"];

const Quests = ({ items, onChange }) => {
  const [draft, setDraft] = useState("");
  const add = () => {
    if (!draft.trim()) return;
    onChange([
      ...items,
      { id: `q_${Date.now()}`, title: draft.trim(), npc: "", status: "active", notes: "" },
    ]);
    setDraft("");
  };
  const remove = (id) => onChange(items.filter((i) => i.id !== id));
  const update = (id, k, v) => onChange(items.map((i) => (i.id === id ? { ...i, [k]: v } : i)));

  const statusColor = (s) => (s === "active" ? C.amberBright : s === "dormant" ? C.amberDim : C.green);

  return (
    <div>
      <SectionHeader count={items.length}>Open Threads</SectionHeader>
      <div className="p-3 flex flex-col gap-2 max-h-80 overflow-y-auto">
        {items.length === 0 && (
          <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 12, color: C.amberFaint, fontStyle: "italic", padding: 8 }}>
            -- no open threads --
          </div>
        )}
        {items.map((q) => (
          <div key={q.id} style={{ border: `1px solid ${C.border}`, padding: 8 }}>
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <EditableField value={q.title} onChange={(v) => update(q.id, "title", v)} />
              </div>
              <select
                value={q.status}
                onChange={(e) => update(q.id, "status", e.target.value)}
                style={{
                  background: C.bg,
                  border: `1px solid ${C.border}`,
                  color: statusColor(q.status),
                  fontFamily: "VT323, monospace",
                  fontSize: 14,
                  padding: "2px 6px",
                  outline: "none",
                }}
              >
                {QUEST_STATUSES.map((s) => (
                  <option key={s} value={s} style={{ background: C.bg }}>
                    {s.toUpperCase()}
                  </option>
                ))}
              </select>
              <button
                onClick={() => remove(q.id)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: C.amberFaint,
                  cursor: "pointer",
                  fontSize: 18,
                  fontFamily: "VT323, monospace",
                  opacity: 0.4,
                }}
                onMouseEnter={(e) => (e.target.style.color = C.red)}
                onMouseLeave={(e) => (e.target.style.color = C.amberFaint)}
              >
                ×
              </button>
            </div>
            <div className="mt-1 grid grid-cols-12 gap-2">
              <div className="col-span-3">
                <input
                  value={q.npc}
                  onChange={(e) => update(q.id, "npc", e.target.value)}
                  placeholder="NPC..."
                  style={{
                    background: "transparent",
                    border: "none",
                    borderBottom: `1px dashed ${C.amberGhost}`,
                    color: C.amber,
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: 11,
                    width: "100%",
                    padding: "2px 0",
                    outline: "none",
                  }}
                />
              </div>
              <div className="col-span-9">
                <EditableField value={q.notes} onChange={(v) => update(q.id, "notes", v)} placeholder="notes..." />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-2 px-3 pb-3 pt-1" style={{ borderTop: `1px solid ${C.amberGhost}` }}>
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && add()}
          placeholder="open a thread..."
          style={{
            background: "transparent",
            border: `1px solid ${C.border}`,
            color: C.amberBright,
            fontFamily: "JetBrains Mono, monospace",
            fontSize: 12,
            flex: 1,
            padding: "6px 8px",
            outline: "none",
          }}
        />
        <button
          onClick={add}
          style={{
            background: "rgba(255,149,48,0.12)",
            border: `1px solid ${C.amber}`,
            color: C.amberBright,
            fontFamily: "VT323, monospace",
            fontSize: 16,
            padding: "0 16px",
            cursor: "pointer",
            letterSpacing: 1,
          }}
        >
          ADD
        </button>
      </div>
    </div>
  );
};

// ---- Knowledge Wall ----------------------------------------------------------

const KnowledgeWall = ({ items, onChange }) => {
  const clear = () => onChange([]);
  return (
    <div>
      <SectionHeader count={items.length}>Knowledge Wall · last turn</SectionHeader>
      <div className="p-3">
        {items.length === 0 ? (
          <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 12, color: C.amberFaint, fontStyle: "italic" }}>
            -- narrator has not yet logged this turn --
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {items.map((k, i) => (
              <span
                key={i}
                style={{
                  border: `1px solid ${C.amber}`,
                  background: "rgba(255,149,48,0.06)",
                  color: C.amberBright,
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: 11,
                  padding: "3px 8px",
                  letterSpacing: 0.5,
                }}
              >
                {k}
              </span>
            ))}
          </div>
        )}
        {items.length > 0 && (
          <button
            onClick={clear}
            style={{
              marginTop: 10,
              background: "transparent",
              border: `1px solid ${C.amberGhost}`,
              color: C.amberDim,
              fontFamily: "VT323, monospace",
              fontSize: 13,
              padding: "2px 8px",
              cursor: "pointer",
              letterSpacing: 1,
            }}
          >
            CLEAR
          </button>
        )}
      </div>
    </div>
  );
};

// ---- Main component ----------------------------------------------------------

export default function ShaulaTracker() {
  const [data, setData] = useState(defaultState);
  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [tab, setTab] = useState("commitments");
  const saveTimer = useRef(null);

  // Load on mount
  useEffect(() => {
    loadState().then((s) => {
      setData(s);
      setLoaded(true);
    });
  }, []);

  // Debounced save on data change
  useEffect(() => {
    if (!loaded) return;
    if (saveTimer.current) clearTimeout(saveTimer.current);
    setSaving(true);
    saveTimer.current = setTimeout(async () => {
      await saveState(data);
      setSaving(false);
    }, 500);
    return () => saveTimer.current && clearTimeout(saveTimer.current);
  }, [data, loaded]);

  const update = (k, v) => setData((d) => ({ ...d, [k]: v }));

  const tabs = [
    { id: "commitments", label: "COMMITMENTS", count: data.commitments.length },
    { id: "theories", label: "THEORIES", count: data.theories.length },
    { id: "inventory", label: "INVENTORY", count: data.inventory.length },
    { id: "quests", label: "THREADS", count: data.quests.length },
    { id: "wall", label: "WALL", count: data.knowledge_wall.length },
  ];

  return (
    <div
      style={{
        background: C.bg,
        minHeight: "100vh",
        color: C.amber,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Font imports & global effects */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=VT323&family=JetBrains+Mono:wght@400;500&display=swap');

        * { box-sizing: border-box; }

        @keyframes flicker {
          0%, 100% { opacity: 1; }
          92% { opacity: 1; }
          93% { opacity: 0.95; }
          94% { opacity: 1; }
        }

        @keyframes scan {
          0% { background-position: 0 0; }
          100% { background-position: 0 4px; }
        }

        .crt-overlay {
          position: fixed;
          inset: 0;
          pointer-events: none;
          background-image: repeating-linear-gradient(
            0deg,
            rgba(0,0,0,0.18) 0px,
            rgba(0,0,0,0.18) 1px,
            transparent 1px,
            transparent 3px
          );
          z-index: 100;
          mix-blend-mode: multiply;
        }

        .crt-glow {
          position: fixed;
          inset: 0;
          pointer-events: none;
          background: radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.4) 100%);
          z-index: 99;
        }

        .terminal-content { animation: flicker 8s infinite; }

        select option { background: ${C.bg}; color: ${C.amberBright}; }

        /* hide number spinner */
        input[type=number]::-webkit-inner-spin-button,
        input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
        input[type=number] { -moz-appearance: textfield; }

        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: ${C.bg}; }
        ::-webkit-scrollbar-thumb { background: ${C.amberGhost}; }
        ::-webkit-scrollbar-thumb:hover { background: ${C.amberFaint}; }
      `}</style>

      <div className="crt-overlay" />
      <div className="crt-glow" />

      <div className="terminal-content max-w-5xl mx-auto p-4 md:p-6 relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 pb-3" style={{ borderBottom: `1px solid ${C.borderBright}` }}>
          <div className="flex items-center gap-3">
            <OpaEmblem size={36} opacity={0.85} />
            <div>
              <div
                style={{
                  fontFamily: "VT323, monospace",
                  fontSize: 38,
                  color: C.amberBright,
                  letterSpacing: 6,
                  lineHeight: 1,
                  textShadow: `0 0 8px rgba(255,149,48,0.4)`,
                }}
              >
                SHAULA
              </div>
              <div
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: 10,
                  color: C.amberDim,
                  letterSpacing: 3,
                  marginTop: 2,
                }}
              >
                SMC · CHARTER · QUARTERLY SURVEY
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div
              style={{
                fontFamily: "VT323, monospace",
                fontSize: 14,
                color: saving ? C.red : C.green,
                letterSpacing: 1,
              }}
            >
              {!loaded ? "● LOAD…" : saving ? "● SYNC" : "● OK"}
            </div>
            <div
              style={{
                fontFamily: "JetBrains Mono, monospace",
                fontSize: 10,
                color: C.amberFaint,
              }}
            >
              {data.state.last_updated?.slice(0, 16).replace("T", " ") ?? "--"}
            </div>
          </div>
        </div>

        {/* State panel */}
        <div style={{ border: `1px solid ${C.border}`, marginBottom: 16 }}>
          <StatePanel state={data.state} onChange={(s) => update("state", s)} />
        </div>

        {/* Tabs */}
        <div className="flex gap-0 mb-0" style={{ borderBottom: `1px solid ${C.amber}` }}>
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                background: tab === t.id ? "rgba(255,149,48,0.14)" : "transparent",
                border: "none",
                borderRight: `1px solid ${C.amberGhost}`,
                borderBottom: tab === t.id ? `2px solid ${C.amberBright}` : "2px solid transparent",
                color: tab === t.id ? C.amberBright : C.amberDim,
                fontFamily: "VT323, monospace",
                fontSize: 17,
                padding: "8px 14px",
                cursor: "pointer",
                letterSpacing: 2,
                transition: "all 200ms",
              }}
            >
              {t.label} <span style={{ color: C.amberFaint, marginLeft: 4 }}>[{t.count}]</span>
            </button>
          ))}
        </div>

        {/* Active tab content */}
        <div style={{ border: `1px solid ${C.border}`, borderTop: "none", marginBottom: 24 }}>
          {tab === "commitments" && (
            <CommitmentLog items={data.commitments} onChange={(v) => update("commitments", v)} />
          )}
          {tab === "theories" && (
            <TheoryLedger items={data.theories} onChange={(v) => update("theories", v)} />
          )}
          {tab === "inventory" && (
            <Inventory items={data.inventory} onChange={(v) => update("inventory", v)} />
          )}
          {tab === "quests" && (
            <Quests items={data.quests} onChange={(v) => update("quests", v)} />
          )}
          {tab === "wall" && (
            <KnowledgeWall items={data.knowledge_wall} onChange={(v) => update("knowledge_wall", v)} />
          )}
        </div>

        {/* Footer */}
        <div
          className="flex items-center justify-between py-2 px-1"
          style={{ borderTop: `1px solid ${C.amberGhost}`, fontFamily: "JetBrains Mono, monospace", fontSize: 10, color: C.amberFaint }}
        >
          <div>TGCC · TERMINAL · v1.0 · {Object.keys(LOCATION_NAMES).length} LOC</div>
          <div className="flex items-center gap-2">
            <span>SOL · MEDINA · SHAULA</span>
            <OpaEmblem size={14} opacity={0.5} />
          </div>
        </div>
      </div>
    </div>
  );
}
