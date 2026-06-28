import { useState } from "react";
import type {
  Drunkenness,
  Fatigue,
  HjalmarState,
  Hunger,
  Reputation,
  Thirst,
  Wanted,
  WoundSeverity,
} from "../types";
import type { UseHjalmarState } from "../state";
import { Panel } from "./Panel";

interface Props {
  state: HjalmarState;
  store: UseHjalmarState;
}

const FATIGUE: Fatigue[] = ["rested", "tired", "spent", "collapsing"];
const HUNGER: Hunger[] = ["fed", "peckish", "hungry", "starving"];
const THIRST: Thirst[] = ["slaked", "thirsty", "dry", "parched"];
const DRUNK: Drunkenness[] = [
  "sober",
  "warm",
  "drunk",
  "reeling",
  "insensate",
];
const WANTED: Wanted[] = ["unknown", "no", "rumored", "posted", "pursued"];
const REP: Reputation[] = [
  "unknown",
  "invisible",
  "noticed",
  "rumored",
  "known",
  "feared",
];
const SEV: WoundSeverity[] = [
  "scratch",
  "minor",
  "moderate",
  "severe",
  "grave",
];

export function StatusPanel({ state, store }: Props) {
  const [loc, setLoc] = useState("");
  const [sev, setSev] = useState<WoundSeverity>("minor");
  const f = state.status_flags;

  function setFlag<K extends keyof typeof f>(key: K, val: (typeof f)[K]) {
    store.update({ status_flags: { ...f, [key]: val } });
  }

  function addWound() {
    if (!loc.trim()) return;
    store.addWound({
      location: loc.trim(),
      severity: sev,
      tended: false,
      acquired_week: state.week,
      acquired_day: state.day,
    });
    setLoc("");
    setSev("minor");
  }

  return (
    <Panel
      title="Status"
      count={state.wounds.filter((w) => !w.tended).length || undefined}
    >
      <div className="status-grid">
        <label>
          <span>Fatigue</span>
          <select
            value={f.fatigue}
            onChange={(e) => setFlag("fatigue", e.target.value as Fatigue)}
          >
            {FATIGUE.map((v) => (
              <option key={v}>{v}</option>
            ))}
          </select>
        </label>
        <label>
          <span>Hunger</span>
          <select
            value={f.hunger}
            onChange={(e) => setFlag("hunger", e.target.value as Hunger)}
          >
            {HUNGER.map((v) => (
              <option key={v}>{v}</option>
            ))}
          </select>
        </label>
        <label>
          <span>Thirst</span>
          <select
            value={f.thirst}
            onChange={(e) => setFlag("thirst", e.target.value as Thirst)}
          >
            {THIRST.map((v) => (
              <option key={v}>{v}</option>
            ))}
          </select>
        </label>
        <label>
          <span>Drunkenness</span>
          <select
            value={f.drunkenness}
            onChange={(e) =>
              setFlag("drunkenness", e.target.value as Drunkenness)
            }
          >
            {DRUNK.map((v) => (
              <option key={v}>{v}</option>
            ))}
          </select>
        </label>
        <label>
          <span>Wanted</span>
          <select
            value={f.wanted}
            onChange={(e) => setFlag("wanted", e.target.value as Wanted)}
          >
            {WANTED.map((v) => (
              <option key={v}>{v}</option>
            ))}
          </select>
        </label>
        <label>
          <span>Reputation</span>
          <select
            value={f.reputation}
            onChange={(e) =>
              setFlag("reputation", e.target.value as Reputation)
            }
          >
            {REP.map((v) => (
              <option key={v}>{v}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="subhead">Wounds</div>
      {state.wounds.length === 0 ? (
        <div className="empty-msg small">— whole and unhurt —</div>
      ) : (
        <ul className="wound-list">
          {state.wounds.map((w) => (
            <li
              key={w.id}
              className={`wound-row sev-${w.severity} ${w.tended ? "tended" : ""}`}
            >
              <span className="wound-loc">{w.location}</span>
              <span className="wound-sev">{w.severity}</span>
              <span className="wound-actions">
                {!w.tended && (
                  <button onClick={() => store.tendWound(w.id)}>Tend</button>
                )}
                <button onClick={() => store.removeWound(w.id)}>×</button>
              </span>
            </li>
          ))}
        </ul>
      )}
      <div className="wound-add">
        <input
          placeholder="Location (left forearm, ribs…)"
          value={loc}
          onChange={(e) => setLoc(e.target.value)}
        />
        <select
          value={sev}
          onChange={(e) => setSev(e.target.value as WoundSeverity)}
        >
          {SEV.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
        <button onClick={addWound}>Log</button>
      </div>
    </Panel>
  );
}
