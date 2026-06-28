import { useState } from "react";
import type { HjalmarState } from "../types";
import type { UseHjalmarState } from "../state";
import { Panel } from "./Panel";

interface Props {
  state: HjalmarState;
  store: UseHjalmarState;
}

export function CrewPanel({ state, store }: Props) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  function add() {
    if (!name.trim()) return;
    store.addCrew({
      name: name.trim(),
      role: role.trim() || "hand",
      share: 1,
      alive: true,
      loyalty: 50,
    });
    setName("");
    setRole("");
  }

  return (
    <Panel title="The Crew" count={state.crew.length}>
      {state.crew.length === 0 ? (
        <div className="crew-empty">
          — no crew. A captain without a ship is only a man with a memory of one. —
        </div>
      ) : (
        <ul className="crew-list">
          {state.crew.map((c) => (
            <li
              key={c.id}
              className={`crew-row ${c.alive ? "" : "crew-dead"}`}
            >
              <span className="crew-name">{c.name}</span>
              <span className="crew-role">{c.role}</span>
              <span className="crew-loyalty">
                <input
                  type="number"
                  value={c.loyalty}
                  onChange={(e) =>
                    store.updateCrew(c.id, {
                      loyalty: Math.max(
                        0,
                        Math.min(100, Number(e.target.value) || 0),
                      ),
                    })
                  }
                  style={{ width: 50 }}
                />
                /100
              </span>
              <button
                onClick={() => store.updateCrew(c.id, { alive: !c.alive })}
                title={c.alive ? "Mark dead" : "Mark alive"}
              >
                {c.alive ? "alive" : "dead"}
              </button>
              <button
                className="kw-rm"
                onClick={() => store.removeCrew(c.id)}
                title="Remove"
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr auto",
          gap: 6,
          marginTop: 8,
        }}
      >
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Role (bosun, gunner…)"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
        <button onClick={add}>Sign on</button>
      </div>
    </Panel>
  );
}
