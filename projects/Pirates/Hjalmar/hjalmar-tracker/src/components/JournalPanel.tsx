import { useState } from "react";
import type { HjalmarState } from "../types";
import type { UseHjalmarState } from "../state";
import { Panel } from "./Panel";

interface Props {
  state: HjalmarState;
  store: UseHjalmarState;
}

export function JournalPanel({ state, store }: Props) {
  const [text, setText] = useState("");
  const [pertains, setPertains] = useState("");

  function add() {
    if (!text.trim()) return;
    store.addJournal({
      week: state.week,
      day: state.day,
      time_of_day: state.time_of_day,
      entry: text.trim(),
      pertains_to: pertains.trim() || undefined,
    });
    setText("");
    setPertains("");
  }

  const sorted = [...state.journal_entries].sort(
    (a, b) => b.week * 100 + b.day - (a.week * 100 + a.day),
  );

  return (
    <Panel title="The Leather-bound Book" count={state.journal_entries.length}>
      {state.journal_entries.length === 0 ? (
        <div className="empty-msg">
          — no journal yet. Pick one up at the print shop, Day 2 —
        </div>
      ) : (
        <ul className="journal-list">
          {sorted.map((j) => (
            <li key={j.id} className="journal-row">
              <div className="journal-head">
                <span>
                  W{j.week} D{j.day} · {j.time_of_day}
                </span>
                {j.pertains_to && (
                  <span style={{ color: "var(--teak)" }}>
                    re: {j.pertains_to}
                  </span>
                )}
                <span style={{ marginLeft: "auto" }}>
                  <button
                    className="kw-rm"
                    onClick={() => store.removeJournal(j.id)}
                    title="Remove"
                  >
                    ×
                  </button>
                </span>
              </div>
              <div className="journal-text">{j.entry}</div>
            </li>
          ))}
        </ul>
      )}
      <div className="journal-add">
        <textarea
          placeholder="His hand. His ink. (entered by player)"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <input
          placeholder="Pertains to (NPC, mark, theory…)"
          value={pertains}
          onChange={(e) => setPertains(e.target.value)}
        />
        <button onClick={add}>Write</button>
      </div>
    </Panel>
  );
}
