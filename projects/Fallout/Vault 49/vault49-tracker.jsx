import React, { useState, useEffect, useCallback } from "react";
import { Plus, Minus, X, RotateCcw } from "lucide-react";

const STORAGE_KEY = "vault49-tracker";

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
  time: "07:30",
  hp: 100,
  rads: 0,
  scrip: 150,
  items: [
    "Vault 49 jumpsuit",
    "Pip-Boy 3000 Mk IV",
    "10mm pistol (12/12)",
    "Stimpak x2",
    "Pocket journal",
    "Vote pin — YELLOW cohort",
  ],
  notes: [],
};

export default function Vault49Tracker() {
  const [state, setState] = useState(INITIAL_STATE);
  const [loaded, setLoaded] = useState(false);
  const [newItem, setNewItem] = useState("");
  const [newNote, setNewNote] = useState("");
  const [scripDelta, setScripDelta] = useState("");
  const [hpDelta, setHpDelta] = useState("");
  const [radDelta, setRadDelta] = useState("");
  const [timeInput, setTimeInput] = useState("");
  const [confirmReset, setConfirmReset] = useState(false);

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

  const setDay = (d) => setState((s) => ({ ...s, day: d }));
  const setTime = (t) => setState((s) => ({ ...s, time: t }));

  const adjustHp = (amount) => {
    setState((s) => ({ ...s, hp: Math.max(0, Math.min(100, s.hp + amount)) }));
  };
  const adjustRad = (amount) => {
    setState((s) => ({ ...s, rads: Math.max(0, Math.min(1000, s.rads + amount)) }));
  };
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
  const applyHpDelta = () => {
    const n = parseInt(hpDelta, 10);
    if (!isNaN(n)) {
      adjustHp(n);
      setHpDelta("");
    }
  };
  const applyRadDelta = () => {
    const n = parseInt(radDelta, 10);
    if (!isNaN(n)) {
      adjustRad(n);
      setRadDelta("");
    }
  };
  const applyTime = () => {
    if (timeInput.trim()) {
      setTime(timeInput.trim());
      setTimeInput("");
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

  const addNote = () => {
    const trimmed = newNote.trim();
    if (trimmed) {
      setState((s) => ({ ...s, notes: [...s.notes, trimmed] }));
      setNewNote("");
    }
  };
  const removeNote = (idx) => {
    setState((s) => ({ ...s, notes: s.notes.filter((_, i) => i !== idx) }));
  };

  const reset = () => {
    setState(INITIAL_STATE);
    setConfirmReset(false);
  };

  // Pip-Boy green on dark
  const green = "#15ff6b";
  const greenDim = "#0fa843";
  const greenFaint = "#0a5a25";
  const bg = "#0a1a0d";
  const bgDark = "#050f07";
  const line = "#1a4a20";

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

  // HP bar
  const hpPct = state.hp;
  const hpColor = hpPct > 50 ? green : hpPct > 25 ? "#ffcc00" : "#ff4444";

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
          <div
            style={{
              fontSize: "14px",
              fontWeight: "bold",
              letterSpacing: "3px",
            }}
          >
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
            ROBCO INDUSTRIES · VAULT 49 TERMINAL
          </div>
        </div>
        <div
          style={{
            fontSize: "10px",
            letterSpacing: "1px",
            color: greenDim,
            textAlign: "right",
          }}
        >
          RESIDENT<br />
          ID-7294
        </div>
      </div>

      {/* Day dial */}
      <div style={{ marginBottom: "14px" }}>
        <div
          style={{
            fontSize: "10px",
            letterSpacing: "2px",
            color: greenDim,
            marginBottom: "6px",
          }}
        >
          DAY OF CYCLE
        </div>
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
                <div
                  style={{
                    fontSize: "8px",
                    opacity: 0.8,
                    marginTop: "1px",
                  }}
                >
                  {d.name}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Time */}
      <div style={{ marginBottom: "14px" }}>
        <div
          style={{
            fontSize: "10px",
            letterSpacing: "2px",
            color: greenDim,
            marginBottom: "6px",
          }}
        >
          CHRONOMETER
        </div>
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

      {/* STATS row: HP / RAD / SCRIP */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "10px",
          marginBottom: "14px",
        }}
      >
        {/* HP */}
        <div
          style={{
            border: `1px solid ${greenFaint}`,
            padding: "8px 10px",
            background: bgDark,
          }}
        >
          <div
            style={{
              fontSize: "9px",
              letterSpacing: "2px",
              color: greenDim,
              marginBottom: "4px",
            }}
          >
            HP
          </div>
          <div
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              color: hpColor,
              marginBottom: "4px",
              textShadow: `0 0 3px ${hpColor}`,
            }}
          >
            {state.hp}
          </div>
          <div
            style={{
              height: "4px",
              background: line,
              marginBottom: "6px",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${hpPct}%`,
                background: hpColor,
                transition: "width 0.3s",
                boxShadow: `0 0 4px ${hpColor}`,
              }}
            />
          </div>
          <div style={{ display: "flex", gap: "3px" }}>
            <input
              type="number"
              value={hpDelta}
              onChange={(e) => setHpDelta(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") applyHpDelta();
              }}
              placeholder="±"
              style={{ ...inputStyle, fontSize: "11px", padding: "2px 6px" }}
            />
            <button
              onClick={applyHpDelta}
              style={{ ...btnStyle, padding: "2px 8px", fontSize: "10px" }}
            >
              APP
            </button>
          </div>
        </div>

        {/* RADS */}
        <div
          style={{
            border: `1px solid ${greenFaint}`,
            padding: "8px 10px",
            background: bgDark,
          }}
        >
          <div
            style={{
              fontSize: "9px",
              letterSpacing: "2px",
              color: greenDim,
              marginBottom: "4px",
            }}
          >
            RAD
          </div>
          <div
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              color: state.rads > 200 ? "#ffcc00" : green,
              marginBottom: "4px",
              textShadow: `0 0 3px ${state.rads > 200 ? "#ffcc00" : green}`,
            }}
          >
            {state.rads}
          </div>
          <div
            style={{
              height: "4px",
              background: line,
              marginBottom: "6px",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${Math.min(100, state.rads / 10)}%`,
                background: state.rads > 200 ? "#ffcc00" : green,
                transition: "width 0.3s",
              }}
            />
          </div>
          <div style={{ display: "flex", gap: "3px" }}>
            <input
              type="number"
              value={radDelta}
              onChange={(e) => setRadDelta(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") applyRadDelta();
              }}
              placeholder="±"
              style={{ ...inputStyle, fontSize: "11px", padding: "2px 6px" }}
            />
            <button
              onClick={applyRadDelta}
              style={{ ...btnStyle, padding: "2px 8px", fontSize: "10px" }}
            >
              APP
            </button>
          </div>
        </div>
      </div>

      {/* Scrip */}
      <div style={{ marginBottom: "14px" }}>
        <div
          style={{
            fontSize: "10px",
            letterSpacing: "2px",
            color: greenDim,
            marginBottom: "6px",
          }}
        >
          SCRIP
        </div>
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

      {/* Items */}
      <div style={{ marginBottom: "14px" }}>
        <div
          style={{
            fontSize: "10px",
            letterSpacing: "2px",
            color: greenDim,
            marginBottom: "6px",
          }}
        >
          ITEMS
        </div>
        <div
          style={{
            background: bgDark,
            border: `1px solid ${greenFaint}`,
            padding: "8px 10px",
            minHeight: "60px",
            maxHeight: "200px",
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
                    idx < state.items.length - 1
                      ? `1px dotted ${greenFaint}`
                      : "none",
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

      {/* Notes / Quests */}
      <div style={{ marginBottom: "14px" }}>
        <div
          style={{
            fontSize: "10px",
            letterSpacing: "2px",
            color: greenDim,
            marginBottom: "6px",
          }}
        >
          NOTES &amp; QUESTS
        </div>
        <div
          style={{
            background: bgDark,
            border: `1px solid ${greenFaint}`,
            padding: "8px 10px",
            minHeight: "50px",
            maxHeight: "160px",
            overflowY: "auto",
          }}
        >
          {state.notes.length === 0 ? (
            <div
              style={{
                color: greenFaint,
                fontSize: "11px",
                textAlign: "center",
                padding: "8px 0",
                letterSpacing: "1px",
              }}
            >
              [ NO ACTIVE NOTES ]
            </div>
          ) : (
            state.notes.map((note, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "6px",
                  padding: "4px 0",
                  fontSize: "11px",
                  borderBottom:
                    idx < state.notes.length - 1
                      ? `1px dotted ${greenFaint}`
                      : "none",
                }}
              >
                <span style={{ color: greenDim, fontSize: "9px", marginTop: "2px" }}>
                  ✦
                </span>
                <span style={{ flex: 1, lineHeight: "1.4" }}>{note}</span>
                <button
                  onClick={() => removeNote(idx)}
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
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") addNote();
            }}
            placeholder="Log a quest, clue, or note"
            style={inputStyle}
          />
          <button onClick={addNote} style={btnStyle}>
            LOG
          </button>
        </div>
      </div>

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
            <RotateCcw size={10} /> NEW RESIDENT
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
              style={{ ...btnStyle, color: "#ff4444", borderColor: "#ff4444" }}
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
