import type { BitEntry } from "../types";
import { Panel } from "./Panel";

interface Props {
  bits: BitEntry[];
}

export function BitsPanel({ bits }: Props) {
  return (
    <Panel
      title="Recurring Bits"
      count={bits.length}
      defaultOpen={false}
    >
      {bits.length === 0 && <div className="muted">No active bits.</div>}
      <ul className="bit-list">
        {bits.map((b) => (
          <li key={b.bit_slug} className="bit-line">
            <div className="bit-head">
              <span className="bit-slug">{b.bit_slug}</span>
              <span className="bit-count muted small">
                used {b.use_count}×
                {b.last_used_day != null && b.last_used_time ? `, last Day ${b.last_used_day} ${b.last_used_time}` : ""}
              </span>
            </div>
            <div className="bit-text">{b.bit_text}</div>
            {b.parties.length > 0 && (
              <div className="bit-parties small muted">{b.parties.join(", ")}</div>
            )}
            {b.origin_context && (
              <div className="bit-origin small muted">origin: {b.origin_context}</div>
            )}
          </li>
        ))}
      </ul>
    </Panel>
  );
}
