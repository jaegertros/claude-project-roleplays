import type { CommitmentEntry } from "../types";
import { Panel } from "./Panel";

interface Props {
  commitments: CommitmentEntry[];
}

const SCOPE_BADGE: Record<CommitmentEntry["scope"], string> = {
  full: "scope-full",
  partial: "scope-partial",
  rumor: "scope-rumor",
  wrong_version: "scope-wrong",
};

export function CommitmentLogPanel({ commitments }: Props) {
  return (
    <Panel
      title="Commitment Log"
      count={commitments.length}
      defaultOpen={false}
    >
      {commitments.length === 0 && <div className="muted">No transfers logged yet.</div>}
      <ul className="commit-list">
        {commitments.map((c) => (
          <li key={c.id} className="commit-line">
            <div className="commit-head">
              <span className="commit-from">{c.from_character}</span>
              <span className="commit-arrow">→</span>
              <span className="commit-to">{c.to_character}</span>
              <span className={`commit-scope ${SCOPE_BADGE[c.scope]}`}>{c.scope}</span>
              <span className="commit-time muted small">
                Day {c.story_day} {c.story_time}
              </span>
            </div>
            <div className="commit-topic">{c.topic}</div>
            {c.notes && <div className="commit-notes small muted">{c.notes}</div>}
          </li>
        ))}
      </ul>
    </Panel>
  );
}
