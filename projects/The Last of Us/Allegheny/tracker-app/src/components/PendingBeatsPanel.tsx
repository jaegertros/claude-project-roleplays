import type { PendingBeatEntry } from "../types";
import { Panel } from "./Panel";

interface Props {
  pending: PendingBeatEntry[];
  overdue: PendingBeatEntry[];
}

function fmtWindow(b: PendingBeatEntry): string {
  const ed = b.earliest_day != null ? `Day ${b.earliest_day}` : "";
  const et = b.earliest_time || "";
  const ld = b.latest_day != null ? `Day ${b.latest_day}` : "";
  const lt = b.latest_time || "";
  const earliest = [ed, et].filter(Boolean).join(" ");
  const latest = [ld, lt].filter(Boolean).join(" ");
  if (earliest && latest && earliest !== latest) return `${earliest} – ${latest}`;
  return latest || earliest || "(no window)";
}

export function PendingBeatsPanel({ pending, overdue }: Props) {
  const total = pending.length + overdue.length;
  return (
    <Panel
      title="Pending Beats"
      count={overdue.length > 0 ? `${total} (${overdue.length} overdue)` : total}
      defaultOpen={total > 0}
    >
      {total === 0 && <div className="muted">No pending beats.</div>}
      {overdue.length > 0 && (
        <div className="beat-group overdue">
          <div className="subhead overdue-label">⚠ Overdue</div>
          <ul className="beat-list">
            {overdue.map((b) => (
              <li key={b.id} className="beat-line overdue-line">
                <div className="beat-head">
                  <span className="beat-slug">{b.beat_slug}</span>
                  <span className="beat-window muted small">{fmtWindow(b)}</span>
                </div>
                <div className="beat-desc">{b.description}</div>
                {b.parties && b.parties.length > 0 && (
                  <div className="beat-parties small muted">{b.parties.join(", ")}</div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
      {pending.length > 0 && (
        <div className="beat-group">
          <div className="subhead">Pending</div>
          <ul className="beat-list">
            {pending.map((b) => (
              <li key={b.id} className="beat-line">
                <div className="beat-head">
                  <span className="beat-slug">{b.beat_slug}</span>
                  <span className="beat-window muted small">{fmtWindow(b)}</span>
                  {b.trigger_type && b.trigger_type !== "time" && (
                    <span className="beat-trigger small">[{b.trigger_type}]</span>
                  )}
                </div>
                <div className="beat-desc">{b.description}</div>
                {b.parties && b.parties.length > 0 && (
                  <div className="beat-parties small muted">{b.parties.join(", ")}</div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </Panel>
  );
}
