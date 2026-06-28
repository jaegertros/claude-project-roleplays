import { useState } from "react";
import type { HjalmarState, TheoryStatus } from "../types";
import type { UseHjalmarState } from "../state";
import { Panel } from "./Panel";

interface Props {
  state: HjalmarState;
  store: UseHjalmarState;
}

const STATUSES: TheoryStatus[] = [
  "open",
  "confirmed",
  "disproven",
  "abandoned",
];

export function TheoriesPanel({ state, store }: Props) {
  const [text, setText] = useState("");

  function add() {
    if (!text.trim()) return;
    store.addTheory({
      theory: text.trim(),
      status: "open",
      first_proposed_week: state.week,
      first_proposed_day: state.day,
    });
    setText("");
  }

  return (
    <Panel title="Theories" count={state.theories.length}>
      {state.theories.length === 0 ? (
        <div className="empty-msg">
          — he has not yet committed a theory to memory —
        </div>
      ) : (
        <ul className="theory-list">
          {state.theories.map((t) => (
            <li
              key={t.id}
              className={`theory-row status-${t.status}`}
            >
              <div className="theory-head">
                <span>
                  W{t.first_proposed_week} D{t.first_proposed_day}
                </span>
                <select
                  className="theory-status"
                  value={t.status}
                  onChange={(e) =>
                    store.updateTheory(t.id, {
                      status: e.target.value as TheoryStatus,
                    })
                  }
                >
                  {STATUSES.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
                <button
                  className="kw-rm"
                  onClick={() => store.removeTheory(t.id)}
                  title="Remove"
                >
                  ×
                </button>
              </div>
              <div className="theory-text">{t.theory}</div>
            </li>
          ))}
        </ul>
      )}
      <div className="theory-add">
        <textarea
          placeholder="What does he suspect?"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={add}>Propose</button>
      </div>
    </Panel>
  );
}
