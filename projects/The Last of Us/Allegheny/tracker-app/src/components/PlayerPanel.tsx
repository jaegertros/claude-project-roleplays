import type { Player } from "../types";
import { Panel } from "./Panel";

interface Props {
  player: Player;
}

export function PlayerPanel({ player }: Props) {
  const totalItems = player.inventory.reduce((sum, i) => sum + i.qty, 0);
  return (
    <Panel title="Player" defaultOpen>
      <div className="player-id">
        <div className="player-name">{player.name || "(unset)"}</div>
        <div className="player-meta muted">
          {[player.age, player.pronouns, player.profession].filter(Boolean).join(" · ") || "—"}
        </div>
        <div className="player-cond">
          Condition: <strong>{player.condition || "—"}</strong>
        </div>
      </div>

      <div className="subsection">
        <div className="subhead">Active injuries ({player.active_injuries.length})</div>
        {player.active_injuries.length === 0 ? (
          <div className="muted">None.</div>
        ) : (
          <ul className="injury-list">
            {player.active_injuries.map((inj) => (
              <li key={inj.id}>
                <span className="injury-part">{inj.body_part}</span>
                <span className="injury-sev">{inj.severity.replace(/_/g, " ")}</span>
                <span className={`injury-clean ${inj.clean ? "ok" : "bad"}`}>
                  {inj.clean ? "clean" : "dirty"}
                </span>
                {inj.infection_clock_minutes != null && (
                  <span className="injury-clock" title="Infection incubation minutes">
                    ⏱ {inj.infection_clock_minutes}m
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="subsection">
        <div className="subhead">
          Inventory ({player.inventory.length} stacks · {totalItems} items)
        </div>
        {player.inventory.length === 0 ? (
          <div className="muted">Empty.</div>
        ) : (
          <ul className="inv-list">
            {player.inventory.map((it) => (
              <li key={it.id}>
                <span className="inv-name">{it.name}</span>
                <span className="inv-qty">×{it.qty}</span>
                {it.notes && <span className="inv-notes muted">{it.notes}</span>}
              </li>
            ))}
          </ul>
        )}
      </div>
    </Panel>
  );
}
