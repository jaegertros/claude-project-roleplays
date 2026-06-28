import type { FactionStanding, HjalmarState } from "../types";
import type { UseHjalmarState } from "../state";
import { Panel } from "./Panel";

interface Props {
  state: HjalmarState;
  store: UseHjalmarState;
}

const STANDINGS: FactionStanding[] = [
  "unknown",
  "hostile",
  "wary",
  "neutral",
  "friendly",
  "allied",
  "oathbound",
];

export function FactionsPanel({ state, store }: Props) {
  return (
    <Panel title="The Eight Blocks" count={state.factions.length}>
      <div className="faction-grid">
        {state.factions.map((f) => (
          <div className="faction-tile" key={f.id}>
            <h4>{f.name}</h4>
            <div className="faction-short">({f.short_name})</div>
            <div className="faction-standing">
              <span
                className={`faction-pip standing-${f.player_standing}`}
                title={f.player_standing}
              />
              <select
                value={f.player_standing}
                onChange={(e) =>
                  store.updateFaction(f.id, {
                    player_standing: e.target.value as FactionStanding,
                  })
                }
              >
                {STANDINGS.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );
}
