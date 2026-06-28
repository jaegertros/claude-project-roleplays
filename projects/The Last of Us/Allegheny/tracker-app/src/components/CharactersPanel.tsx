import type { Character } from "../types";
import { Panel } from "./Panel";

interface Props {
  characters: Record<string, Character>;
}

const TIER_ORDER: Record<string, number> = {
  anchored: 0,
  romanceable: 1,
  support: 2,
  named_minor: 3,
  antagonist: 4,
};

export function CharactersPanel({ characters }: Props) {
  const entries = Object.entries(characters).sort(([ai, a], [bi, b]) => {
    // Present first, then by tier, then by name.
    if (a.present !== b.present) return a.present ? -1 : 1;
    const at = TIER_ORDER[a.tier] ?? 99;
    const bt = TIER_ORDER[b.tier] ?? 99;
    if (at !== bt) return at - bt;
    return a.name.localeCompare(b.name) || ai.localeCompare(bi);
  });

  const presentCount = entries.filter(([, c]) => c.present).length;

  return (
    <Panel title="Characters" count={entries.length} defaultOpen>
      <div className="muted small">{presentCount} present in scene</div>
      {entries.length === 0 ? (
        <div className="muted">No characters yet.</div>
      ) : (
        <ul className="char-list">
          {entries.map(([id, c]) => (
            <li key={id} className={`char-row ${c.present ? "present" : ""}`}>
              <div className="char-line">
                <span className={`char-dot tier-${c.tier}`} title={c.tier} />
                <span className="char-name">{c.name}</span>
                <span className="char-id muted">{id}</span>
              </div>
              <div className="char-meta">
                <span>{c.relationship}</span>
                <span className="muted">·</span>
                <span>{c.condition}</span>
                {c.present && <span className="char-here">here</span>}
              </div>
              {c.active_injuries.length > 0 && (
                <div className="char-inj muted">
                  {c.active_injuries.map((i) => `${i.body_part} (${i.severity})`).join(", ")}
                </div>
              )}
              {c.perception_of_player.behavioral.length > 0 && (
                <div className="char-percep muted small">
                  sees: {c.perception_of_player.behavioral.join(", ")}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </Panel>
  );
}
