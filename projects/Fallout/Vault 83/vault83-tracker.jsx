import React, { useState, useEffect, useCallback } from "react";
import { Plus, Minus, X, RotateCcw, Download, AlertCircle, Check } from "lucide-react";

const STORAGE_KEY = "vault83-tracker";

const DAY_LABELS = [
  { n: 1, name: "MON" },
  { n: 2, name: "TUE" },
  { n: 3, name: "WED" },
  { n: 4, name: "THU" },
  { n: 5, name: "FRI" },
  { n: 6, name: "SAT" },
  { n: 7, name: "SUN" },
];

const INITIAL_STATE = {
  day: 1,
  time: "06:42",
  location: "Liaison corridor",
  scrip: 150,
  items: [
    "Gray Liaison jumpsuit",
    "Pip-Boy 3000 Mk IV",
    "Liaison keycard",
    "Brass wristwatch",
    "Stimpak x2",
    "Pocket journal",
  ],
  quests: [],
  depth: 0, // internal — not displayed, but tracked from STATE blocks
  lastSync: null,
};

// ── STATE block parser ────────────────────────────────────────────────────────
// Parses the <!-- STATE ... --> block emitted by the narrator.
// Returns a partial state object or null if no block is found.
function parseStateBlock(text) {
  if (!text) return null;

  // Match the STATE comment block
  const match = text.match(/<!--\s*STATE\s*([\s\S]*?)-->/);
  if (!match) return null;

  const body = match[1];
  const result = {};

  // Parse key: value lines
  const lines = body.split("\n").map((l) => l.trim()).filter(Boolean);
  for (const line of lines) {
    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim().toLowerCase();
    const rawVal = line.slice(colonIdx + 1).trim();

    if (key === "day") {
      const n = parseInt(rawVal, 10);
      if (!isNaN(n) && n >= 1 && n <= 7) result.day = n;
    } else if (key === "time") {
      if (/^\d{1,2}:\d{2}$/.test(rawVal)) result.time = rawVal;
    } else if (key === "location") {
      // snake_case → human-readable
      result.location = rawVal
        .replace(/_/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());
    } else if (key === "scrip") {
      const n = parseInt(rawVal, 10);
      if (!isNaN(n)) result.scrip = n;
    } else if (key === "inventory") {
      // [item1, item2:2, item3] → array of strings
      const listMatch = rawVal.match(/\[(.*)\]/);
      if (listMatch) {
        const items = listMatch[1]
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
          .map(prettifyItemToken);
        result.items = items;
      }
    } else if (key === "quest") {
      if (rawVal && rawVal !== "null") {
        result.currentQuest = rawVal.replace(/_/g, " ");
      }
    } else if (key === "depth") {
      const n = parseInt(rawVal, 10);
      if (!isNaN(n)) result.depth = n;
    }
  }

  return Object.keys(result).length > 0 ? result : null;
}

// Fallback parser: read the human-readable [Tracker:] and [Pip-Boy:] bracket lines
// if the STATE block is absent. Less reliable but covers narrator skips.
function parseBracketLines(text) {
  if (!text) return null;
  const result = {};

  // [Tracker: Day 3 (Wednesday), 17:45 | ...]
  const trackerMatch = text.match(
    /\[Tracker:\s*Day\s*(\d+)\s*\([^)]+\),?\s*(\d{1,2}:\d{2})/i
  );
  if (trackerMatch) {
    result.day = parseInt(trackerMatch[1], 10);
    result.time = trackerMatch[2];
  }

  // [Pip-Boy: 128 scrip | ... items ... | Quest: ... | Location: ...]
  const pipboyMatch = text.match(/\[Pip-Boy:([^\]]+)\]/i);
  if (pipboyMatch) {
    const body = pipboyMatch[1];
    const parts = body.split("|").map((s) => s.trim());

    for (const part of parts) {
      const scripMatch = part.match(/^(\d+)\s*scrip/i);
      if (scripMatch) {
        result.scrip = parseInt(scripMatch[1], 10);
        continue;
      }
      const questMatch = part.match(/^Quest:\s*(.+)$/i);
      if (questMatch) {
        result.currentQuest = questMatch[1].trim();
        continue;
      }
      const locMatch = part.match(/^Location:\s*(.+)$/i);
      if (locMatch) {
        result.location = locMatch[1].trim();
        continue;
      }
      // Otherwise, it's likely the inventory list — comma-separated
      if (part.includes(",")) {
        result.items = part
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);
      }
    }
  }

  return Object.keys(result).length > 0 ? result : null;
}

// Convert a STATE inventory token (e.g. "stimpak:2", "petition_receipt") to
// a user-readable item string.
function prettifyItemToken(tok) {
  const countMatch = tok.match(/^(.+):(\d+)$/);
  let base = countMatch ? countMatch[1] : tok;
  let count = countMatch ? parseInt(countMatch[2], 10) : 1;

  // Known mappings for cleaner display
  const mappings = {
    jumpsuit: "Gray Liaison jumpsuit",
    keycard: "Liaison keycard",
    watch: "Brass wristwatch",
    stimpak: "Stimpak",
    journal: "Pocket journal",
    pipboy: "Pip-Boy 3000 Mk IV",
  };

  base = mappings[base] || base.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  return count > 1 ? `${base} x${count}` : base;
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function Vault83Tracker() {
  const [state, setState] = useState(INITIAL_STATE);
  const [loaded, setLoaded] = useState(false);
  const [syncInput, setSyncInput] = useState("");
  const [syncStatus, setSyncStatus] = useState(null); // { ok: bool, message: string }
  const [newItem, setNewItem] = useState("");
  const [newQuest, setNewQuest] = useState("");
  const [locationInput, setLocationInput] = useState("");
  const [scripDelta, setScripDelta] = useState("");
  const [timeInput, setTimeInput] = useState("");
  const [confirmReset, setConfirmReset] = useState(false);

  // Load persisted state on mount
  useEffect(() => {
    const load = async () => {
      try {
        const result = await window.storage.get(STORAGE_KEY);
        if (result && result.value) {
          const parsed = JSON.parse(result.value);
          setState({ ...INITIAL_STATE, ...parsed });
        }
      } catch (e) {
        // no saved state
      } finally {
        setLoaded(true);
      }
    };
    load();
  }, []);

  // Persist state on change
  const persist = useCallback(async (next) => {
    try {
      await window.storage.set(STORAGE_KEY, JSON.stringify(next));
    } catch (e) {
      console.error("Save failed:", e);
    }
  }, []);

  useEffect(() => {
    if (loaded) persist(state);
  }, [state, loaded, persist]);

  // Auto-clear sync status after 3 seconds
  useEffect(() => {
    if (syncStatus) {
      const t = setTimeout(() => setSyncStatus(null), 3000);
      return () => clearTimeout(t);
    }
  }, [syncStatus]);

  // Actions
  const setDay = (d) => setState((s) => ({ ...s, day: d }));
  const setTime = (t) => setState((s) => ({ ...s, time: t }));
  const setLocation = (loc) => setState((s) => ({ ...s, location: loc }));

  const adjustScrip = (amount) => {
    setState((s) => ({ ...s, scrip: Math.max(0, s.scrip + amount) }));
  };
  const applyScripDelta = () => {
    const n = parseInt(scripDelta, 10);
    if (!isNaN(n)) {
      adjustScrip(n);
      setScripDelta("");
    }
  };
  const applyTime = () => {
    if (timeInput.trim() && /^\d{1,2}:\d{2}$/.test(timeInput.trim())) {
      setTime(timeInput.trim());
      setTimeInput("");
    }
  };
  const applyLocation = () => {
    if (locationInput.trim()) {
      setLocation(locationInput.trim());
      setLocationInput("");
    }
  };

  const addItem = () => {
    const trimmed = newItem.trim();
    if (trimmed) {
      setState((s) => ({ ...s, items: [...s.items, trimmed] }));
      setNewItem("");
    }
  };
  const removeItem = (idx) => {
    setState((s) => ({ ...s, items: s.items.filter((_, i) => i !== idx) }));
  };

  const addQuest = () => {
    const trimmed = newQuest.trim();
    if (trimmed) {
      setState((s) => ({ ...s, quests: [...s.quests, trimmed] }));
      setNewQuest("");
    }
  };
  const removeQuest = (idx) => {
    setState((s) => ({ ...s, quests: s.quests.filter((_, i) => i !== idx) }));
  };

  const reset = () => {
    setState(INITIAL_STATE);
    setConfirmReset(false);
  };

  // ── SYNC: parse a pasted narrator response ─────────────────────────────────
  const performSync = () => {
    const text = syncInput.trim();
    if (!text) {
      setSyncStatus({ ok: false, message: "Nothing to sync." });
      return;
    }

    // Try STATE block first
    let parsed = parseStateBlock(text);
    let method = "STATE block";

    // Fallback to bracket lines
    if (!parsed) {
      parsed = parseBracketLines(text);
      method = "bracket lines (fallback)";
    }

    if (!parsed) {
      setSyncStatus({
        ok: false,
        message: "No STATE block or bracket lines found.",
      });
      return;
    }

    // Apply parsed state
    setState((s) => {
      const next = { ...s };
      if (parsed.day != null) next.day = parsed.day;
      if (parsed.time != null) next.time = parsed.time;
      if (parsed.location != null) next.location = parsed.location;
      if (parsed.scrip != null) next.scrip = parsed.scrip;
      if (parsed.items != null) next.items = parsed.items;
      if (parsed.depth != null) next.depth = parsed.depth;

      // Handle quest update: add the current quest if not already present
      if (parsed.currentQuest) {
        const exists = s.quests.some(
          (q) => q.toLowerCase() === parsed.currentQuest.toLowerCase()
        );
        if (!exists) {
          next.quests = [...s.quests, parsed.currentQuest];
        }
      }

      next.lastSync = new Date().toISOString();
      return next;
    });

    setSyncInput("");
    setSyncStatus({
      ok: true,
      message: `Synced from ${method}.`,
    });
  };

  // Pip-Boy green palette
  const green = "#15ff6b";
  const greenDim = "#0fa843";
  const greenFaint = "#0a5a25";
  const bg = "#0a1a0d";
  const bgDark = "#050f07";
  const amber = "#ffcc00";
  const red = "#ff4444";

  const currentDay = DAY_LABELS.find((d) => d.n === state.day) || DAY_LABELS[0];

  if (!loaded) {
    return (
      <div
        style={{
          minHeight: "400px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: bg,
          color: green,
          fontFamily: '"Courier New", monospace',
          fontSize: "14px",
          letterSpacing: "2px",
        }}
      >
        BOOT … PIP-BOY 3000 MK IV … LOADING
      </div>
    );
  }

  const btnStyle = {
    background: "transparent",
    color: green,
    border: `1px solid ${greenDim}`,
    padding: "4px 10px",
    cursor: "pointer",
    fontFamily: '"Courier New", monospace',
    fontSize: "11px",
    letterSpacing: "1px",
    textTransform: "uppercase",
  };

  const inputStyle = {
    flex: 1,
    padding: "4px 8px",
    background: bgDark,
    color: green,
    border: `1px solid ${greenFaint}`,
    fontFamily: '"Courier New", monospace',
    fontSize: "12px",
    outline: "none",
  };

  const sectionLabel = {
    fontSize: "10px",
    letterSpacing: "2px",
    color: greenDim,
    marginBottom: "6px",
  };

  return (
    <div
      style={{
        background: `radial-gradient(ellipse at center, ${bg} 0%, ${bgDark} 100%)`,
        fontFamily: '"Courier New", "Monaco", monospace',
        color: green,
        padding: "20px 18px",
        maxWidth: "480px",
        margin: "0 auto",
        border: `2px solid ${greenDim}`,
        borderRadius: "8px",
        boxShadow: `inset 0 0 40px rgba(21, 255, 107, 0.08), 0 0 20px rgba(21, 255, 107, 0.15)`,
        textShadow: `0 0 3px ${green}`,
      }}
    >
      {/* Header */}
      <div
        style={{
          borderBottom: `1px solid ${greenFaint}`,
          paddingBottom: "10px",
          marginBottom: "14px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
        }}
      >
        <div>
          <div style={{ fontSize: "14px", fontWeight: "bold", letterSpacing: "3px" }}>
            PIP-BOY 3000 MK IV
          </div>
          <div
            style={{
              fontSize: "9px",
              letterSpacing: "2px",
              color: greenDim,
              marginTop: "2px",
            }}
          >
            ROBCO INDUSTRIES · VAULT 83 TERMINAL
          </div>
        </div>
        <div style={{ fontSize: "10px", letterSpacing: "1px", color: greenDim, textAlign: "right" }}>
          LIAISON<br />
          TEAGUE
        </div>
      </div>

      {/* SYNC: paste response here */}
      <div style={{ marginBottom: "14px" }}>
        <div style={sectionLabel}>
          SYNC ▸ paste narrator response
        </div>
        <textarea
          value={syncInput}
          onChange={(e) => setSyncInput(e.target.value)}
          placeholder="Paste the narrator's full response here to auto-update..."
          style={{
            width: "100%",
            height: "50px",
            background: bgDark,
            color: green,
            border: `1px solid ${greenFaint}`,
            padding: "6px 8px",
            fontFamily: '"Courier New", monospace',
            fontSize: "11px",
            outline: "none",
            resize: "vertical",
            boxSizing: "border-box",
          }}
        />
        <div style={{ display: "flex", gap: "6px", marginTop: "6px", alignItems: "center" }}>
          <button onClick={performSync} style={{ ...btnStyle, flex: 1 }}>
            <Download size={10} style={{ display: "inline", marginRight: "4px" }} />
            SYNC FROM PASTE
          </button>
          {syncStatus && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                fontSize: "10px",
                color: syncStatus.ok ? green : amber,
                letterSpacing: "1px",
              }}
            >
              {syncStatus.ok ? <Check size={10} /> : <AlertCircle size={10} />}
              {syncStatus.message}
            </div>
          )}
        </div>
      </div>

      {/* Day dial */}
      <div style={{ marginBottom: "14px" }}>
        <div style={sectionLabel}>DAY OF CYCLE</div>
        <div style={{ display: "flex", gap: "3px" }}>
          {DAY_LABELS.map((d) => {
            const active = state.day === d.n;
            return (
              <button
                key={d.n}
                onClick={() => setDay(d.n)}
                style={{
                  flex: 1,
                  padding: "8px 2px",
                  background: active ? greenDim : "transparent",
                  color: active ? bg : green,
                  border: `1px solid ${active ? green : greenFaint}`,
                  cursor: "pointer",
                  fontFamily: '"Courier New", monospace',
                  fontSize: "10px",
                  letterSpacing: "1px",
                  fontWeight: active ? "bold" : "normal",
                }}
              >
                {d.n}
                <div style={{ fontSize: "8px", opacity: 0.8, marginTop: "1px" }}>
                  {d.name}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Chronometer */}
      <div style={{ marginBottom: "14px" }}>
        <div style={sectionLabel}>CHRONOMETER</div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 12px",
            background: bgDark,
            border: `1px solid ${greenFaint}`,
          }}
        >
          <div
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              letterSpacing: "3px",
              flex: 1,
              fontFamily: '"Courier New", monospace',
            }}
          >
            {state.time}
          </div>
          <input
            type="text"
            value={timeInput}
            onChange={(e) => setTimeInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") applyTime();
            }}
            placeholder="HH:MM"
            style={{ ...inputStyle, maxWidth: "90px" }}
          />
          <button onClick={applyTime} style={btnStyle}>
            SET
          </button>
        </div>
      </div>

      {/* Location */}
      <div style={{ marginBottom: "14px" }}>
        <div style={sectionLabel}>LOCATION</div>
        <div
          style={{
            padding: "8px 12px",
            background: bgDark,
            border: `1px solid ${greenFaint}`,
            marginBottom: "6px",
          }}
        >
          <div
            style={{
              fontSize: "14px",
              letterSpacing: "1px",
              fontFamily: '"Courier New", monospace',
              minHeight: "18px",
            }}
          >
            ▸ {state.location || <span style={{ color: greenFaint }}>[ UNKNOWN ]</span>}
          </div>
        </div>
        <div style={{ display: "flex", gap: "6px" }}>
          <input
            type="text"
            value={locationInput}
            onChange={(e) => setLocationInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") applyLocation();
            }}
            placeholder="Set location..."
            style={inputStyle}
          />
          <button onClick={applyLocation} style={btnStyle}>
            SET
          </button>
        </div>
      </div>

      {/* Scrip */}
      <div style={{ marginBottom: "14px" }}>
        <div style={sectionLabel}>SCRIP</div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "10px 12px",
            background: bgDark,
            border: `1px solid ${greenFaint}`,
          }}
        >
          <div
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              flex: 1,
              fontFamily: '"Courier New", monospace',
            }}
          >
            {state.scrip.toLocaleString("en-US")}
            <span
              style={{
                fontSize: "11px",
                marginLeft: "6px",
                color: greenDim,
                fontWeight: "normal",
              }}
            >
              ⬥
            </span>
          </div>
          <button
            onClick={() => adjustScrip(-5)}
            style={{ ...btnStyle, color: "#ff8844", borderColor: "#ff8844" }}
            title="Spend 5"
          >
            <Minus size={10} /> 5
          </button>
          <button onClick={() => adjustScrip(5)} style={btnStyle} title="Add 5">
            <Plus size={10} /> 5
          </button>
        </div>
        <div style={{ display: "flex", gap: "6px", marginTop: "6px" }}>
          <input
            type="number"
            value={scripDelta}
            onChange={(e) => setScripDelta(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") applyScripDelta();
            }}
            placeholder="± custom amount"
            style={inputStyle}
          />
          <button onClick={applyScripDelta} style={btnStyle}>
            APPLY
          </button>
        </div>
      </div>

      {/* Inventory */}
      <div style={{ marginBottom: "14px" }}>
        <div style={sectionLabel}>INVENTORY</div>
        <div
          style={{
            background: bgDark,
            border: `1px solid ${greenFaint}`,
            padding: "8px 10px",
            minHeight: "60px",
            maxHeight: "240px",
            overflowY: "auto",
          }}
        >
          {state.items.length === 0 ? (
            <div
              style={{
                color: greenFaint,
                fontSize: "11px",
                textAlign: "center",
                padding: "8px 0",
                letterSpacing: "1px",
              }}
            >
              [ INVENTORY EMPTY ]
            </div>
          ) : (
            state.items.map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "3px 0",
                  fontSize: "12px",
                  borderBottom:
                    idx < state.items.length - 1 ? `1px dotted ${greenFaint}` : "none",
                }}
              >
                <span style={{ color: greenDim, fontSize: "9px" }}>▸</span>
                <span style={{ flex: 1 }}>{item}</span>
                <button
                  onClick={() => removeItem(idx)}
                  style={{
                    background: "transparent",
                    color: greenFaint,
                    border: "none",
                    cursor: "pointer",
                    padding: "1px",
                  }}
                  title="Drop"
                >
                  <X size={10} />
                </button>
              </div>
            ))
          )}
        </div>
        <div style={{ display: "flex", gap: "6px", marginTop: "6px" }}>
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") addItem();
            }}
            placeholder="Add item"
            style={inputStyle}
          />
          <button onClick={addItem} style={btnStyle}>
            ADD
          </button>
        </div>
      </div>

      {/* Quests */}
      <div style={{ marginBottom: "14px" }}>
        <div style={sectionLabel}>QUEST LOG</div>
        <div
          style={{
            background: bgDark,
            border: `1px solid ${greenFaint}`,
            padding: "8px 10px",
            minHeight: "50px",
            maxHeight: "180px",
            overflowY: "auto",
          }}
        >
          {state.quests.length === 0 ? (
            <div
              style={{
                color: greenFaint,
                fontSize: "11px",
                textAlign: "center",
                padding: "8px 0",
                letterSpacing: "1px",
              }}
            >
              [ NO ACTIVE QUESTS ]
            </div>
          ) : (
            state.quests.map((q, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "6px",
                  padding: "4px 0",
                  fontSize: "11px",
                  borderBottom:
                    idx < state.quests.length - 1 ? `1px dotted ${greenFaint}` : "none",
                }}
              >
                <span style={{ color: greenDim, fontSize: "9px", marginTop: "2px" }}>✦</span>
                <span style={{ flex: 1, lineHeight: "1.4" }}>{q}</span>
                <button
                  onClick={() => removeQuest(idx)}
                  style={{
                    background: "transparent",
                    color: greenFaint,
                    border: "none",
                    cursor: "pointer",
                    padding: "1px",
                  }}
                  title="Complete"
                >
                  <X size={10} />
                </button>
              </div>
            ))
          )}
        </div>
        <div style={{ display: "flex", gap: "6px", marginTop: "6px" }}>
          <input
            type="text"
            value={newQuest}
            onChange={(e) => setNewQuest(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") addQuest();
            }}
            placeholder="Log a quest, clue, or note"
            style={inputStyle}
          />
          <button onClick={addQuest} style={btnStyle}>
            LOG
          </button>
        </div>
      </div>

      {/* Last sync indicator */}
      {state.lastSync && (
        <div
          style={{
            fontSize: "9px",
            color: greenFaint,
            textAlign: "center",
            letterSpacing: "1px",
            marginBottom: "10px",
          }}
        >
          LAST SYNC: {new Date(state.lastSync).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })}
        </div>
      )}

      {/* Reset */}
      <div
        style={{
          paddingTop: "10px",
          borderTop: `1px solid ${greenFaint}`,
          textAlign: "center",
        }}
      >
        {!confirmReset ? (
          <button
            onClick={() => setConfirmReset(true)}
            style={{
              ...btnStyle,
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              color: greenDim,
              borderColor: greenFaint,
            }}
          >
            <RotateCcw size={10} /> NEW LIAISON
          </button>
        ) : (
          <div
            style={{
              display: "flex",
              gap: "8px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <span style={{ fontSize: "11px", color: greenDim }}>
              WIPE PIP-BOY DATA?
            </span>
            <button
              onClick={reset}
              style={{ ...btnStyle, color: red, borderColor: red }}
            >
              YES
            </button>
            <button onClick={() => setConfirmReset(false)} style={btnStyle}>
              NO
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
