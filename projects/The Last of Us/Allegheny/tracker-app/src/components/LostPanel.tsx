import type { LostEntry } from "../types";
import { Panel } from "./Panel";

interface Props {
  lost: LostEntry[];
}

export function LostPanel({ lost }: Props) {
  return (
    <Panel title="Lost" count={lost.length} defaultOpen={false}>
      {lost.length === 0 ? (
        <div className="muted">No losses yet.</div>
      ) : (
        <ul className="lost-list">
          {lost.map((l) => (
            <li key={l.character_id}>
              <div className="lost-line">
                <span className="lost-name">{l.name}</span>
                <span className="lost-id muted">{l.character_id}</span>
                <span className="lost-when muted small">· {l.story_day_label}</span>
              </div>
              <div className="lost-cause muted small">{l.cause}</div>
              <div className="lost-obit">{l.obit}</div>
            </li>
          ))}
        </ul>
      )}
    </Panel>
  );
}
