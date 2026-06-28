import { useState } from "react";
import type { HjalmarState } from "../types";
import type { UseHjalmarState } from "../state";
import { Panel } from "./Panel";

interface Props {
  state: HjalmarState;
  store: UseHjalmarState;
}

export function IdentityLedgerPanel({ state, store }: Props) {
  const [fact, setFact] = useState("");
  const [source, setSource] = useState("");

  function commit() {
    if (!fact.trim()) return;
    store.commitIdentity({
      fact: fact.trim(),
      committed_week: state.week,
      committed_day: state.day,
      source: source.trim() || "self",
    });
    setFact("");
    setSource("");
  }

  return (
    <Panel title="Identity Ledger" count={state.identity_ledger.length}>
      {state.identity_ledger.length === 0 ? (
        <div className="empty-msg">
          He knows nothing of himself yet but a name on a folded paper.
        </div>
      ) : (
        <ul className="identity-list">
          {state.identity_ledger.map((i) => (
            <li key={i.id}>
              <div className="identity-fact">{i.fact}</div>
              <div className="identity-meta">
                W{i.committed_week} D{i.committed_day} · {i.source}{" "}
                <button
                  className="kw-rm"
                  onClick={() => store.removeIdentity(i.id)}
                  style={{ marginLeft: 4 }}
                  title="Remove"
                >
                  ×
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div style={{ marginTop: 10, display: "grid", gap: 6 }}>
        <input
          placeholder="A new fact committed (NPC named him, mark identified, etc.)"
          value={fact}
          onChange={(e) => setFact(e.target.value)}
        />
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 6 }}>
          <input
            placeholder="Source"
            value={source}
            onChange={(e) => setSource(e.target.value)}
          />
          <button onClick={commit}>Commit</button>
        </div>
      </div>
    </Panel>
  );
}
