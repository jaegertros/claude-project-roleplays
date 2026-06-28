// The three marks rendered as small inline SVG illustrations — stylized,
// abstract, evocative.  Sharing the parchment palette.

import { useState, type ReactElement } from "react";
import type { HjalmarState, MarkId } from "../types";
import type { UseHjalmarState } from "../state";
import { Panel } from "./Panel";

interface Props {
  state: HjalmarState;
  store: UseHjalmarState;
}

function EyebrowScarSVG() {
  return (
    <svg viewBox="0 0 64 64" width="56" height="56" aria-hidden="true">
      <path
        d="M10 36 Q24 30 38 32 Q48 33 56 30"
        stroke="var(--ink-faded)"
        strokeWidth="1.2"
        fill="none"
      />
      <path
        d="M18 26 L46 22"
        stroke="var(--ink)"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M28 24 L34 26"
        stroke="var(--ink)"
        strokeWidth="1"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

function ForearmTattooSVG() {
  return (
    <svg viewBox="0 0 64 64" width="56" height="56" aria-hidden="true">
      <rect
        x="20"
        y="8"
        width="24"
        height="48"
        rx="10"
        fill="rgba(184,163,115,0.2)"
        stroke="var(--ink-faded)"
        strokeWidth="0.8"
      />
      <path
        d="M28 18 L36 18 L36 26 L32 30 L28 26 Z"
        fill="var(--navy-deep)"
        stroke="var(--ink)"
        strokeWidth="0.6"
      />
      <line
        x1="32"
        y1="30"
        x2="32"
        y2="46"
        stroke="var(--navy-deep)"
        strokeWidth="1.6"
      />
      <line
        x1="26"
        y1="42"
        x2="38"
        y2="42"
        stroke="var(--navy-deep)"
        strokeWidth="1.6"
      />
      <circle cx="32" cy="50" r="1.5" fill="var(--navy-deep)" />
    </svg>
  );
}

function InnerThighScarsSVG() {
  return (
    <svg viewBox="0 0 64 64" width="56" height="56" aria-hidden="true">
      <rect
        x="14"
        y="10"
        width="36"
        height="44"
        rx="4"
        fill="rgba(184,163,115,0.15)"
        stroke="var(--ink-faded)"
        strokeWidth="0.6"
      />
      <line
        x1="22"
        y1="18"
        x2="22"
        y2="46"
        stroke="var(--ink)"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <line
        x1="32"
        y1="18"
        x2="32"
        y2="46"
        stroke="var(--ink)"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <line
        x1="42"
        y1="18"
        x2="42"
        y2="46"
        stroke="var(--ink)"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

const MARK_SVG: Record<MarkId, () => ReactElement> = {
  eyebrow_scar: EyebrowScarSVG,
  forearm_tattoo: ForearmTattooSVG,
  inner_thigh_scars: InnerThighScarsSVG,
};

export function ThreeMarksPanel({ state, store }: Props) {
  const [editing, setEditing] = useState<MarkId | null>(null);
  const [theory, setTheory] = useState("");

  function startEdit(id: MarkId) {
    setEditing(id);
    setTheory(state.marks[id].partial_theory ?? "");
  }

  function saveTheory(id: MarkId) {
    store.updateMark(id, { partial_theory: theory.trim() || undefined });
    setEditing(null);
  }

  const order: MarkId[] = [
    "eyebrow_scar",
    "forearm_tattoo",
    "inner_thigh_scars",
  ];

  return (
    <Panel title="The Three Marks">
      <div className="marks-grid">
        {order.map((id) => {
          const m = state.marks[id];
          const Svg = MARK_SVG[id];
          return (
            <div key={id} className="mark-row">
              <div className="mark-svg">
                <Svg />
              </div>
              <div>
                <div className="mark-name">{m.name}</div>
                <div className="mark-desc">{m.description}</div>
                {m.partial_theory && (
                  <div
                    className="mark-desc"
                    style={{ color: "var(--teak)", fontStyle: "normal" }}
                  >
                    Theory: <em>{m.partial_theory}</em>
                  </div>
                )}
                {m.identified && m.full_truth && (
                  <div className="mark-identified">
                    Identified — {m.full_truth}
                  </div>
                )}
                {editing === id && (
                  <div style={{ marginTop: 6, display: "flex", gap: 4 }}>
                    <input
                      value={theory}
                      onChange={(e) => setTheory(e.target.value)}
                      placeholder="Theory…"
                    />
                    <button onClick={() => saveTheory(id)}>Save</button>
                    <button onClick={() => setEditing(null)}>×</button>
                  </div>
                )}
              </div>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 4 }}
              >
                <button
                  className="brass"
                  onClick={() =>
                    store.updateMark(id, { identified: !m.identified })
                  }
                  title="Mark as identified"
                >
                  {m.identified ? "✓" : "○"}
                </button>
                <button onClick={() => startEdit(id)}>Theory</button>
              </div>
            </div>
          );
        })}
      </div>
    </Panel>
  );
}
