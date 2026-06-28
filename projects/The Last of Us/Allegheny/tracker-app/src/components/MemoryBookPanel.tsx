import type { MemoryBookEntry } from "../types";
import { Panel } from "./Panel";

interface Props {
  entries: MemoryBookEntry[];
}

export function MemoryBookPanel({ entries }: Props) {
  // Most recent first.
  const ordered = [...entries].sort((a, b) => b.finalized_turn - a.finalized_turn);
  return (
    <Panel title="Memory Book" count={entries.length} defaultOpen={false}>
      {ordered.length === 0 ? (
        <div className="muted">No entries yet.</div>
      ) : (
        <ul className="mb-list">
          {ordered.map((e) => (
            <li key={e.id}>
              <div className="mb-head">
                <span className="mb-range">{e.story_day_range}</span>
                <span className="mb-awareness muted small">aware {e.awareness_at_end}/5</span>
              </div>
              <div className="mb-summary">{e.summary}</div>
              {e.characters_in_scene.length > 0 && (
                <div className="mb-chars muted small">
                  with: {e.characters_in_scene.join(", ")}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </Panel>
  );
}
