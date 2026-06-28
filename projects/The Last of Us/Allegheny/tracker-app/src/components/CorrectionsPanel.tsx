import type { CorrectionEntry } from "../types";
import { Panel } from "./Panel";

interface Props {
  corrections: CorrectionEntry[];
}

const CATEGORY_ORDER: CorrectionEntry["category"][] = [
  "continuity",
  "agency",
  "voice",
  "register",
  "meta",
];

export function CorrectionsPanel({ corrections }: Props) {
  // Group by category for readability.
  const grouped = CATEGORY_ORDER.map((cat) => ({
    category: cat,
    items: corrections.filter((c) => c.category === cat),
  })).filter((g) => g.items.length > 0);

  return (
    <Panel
      title="Narrator Corrections"
      count={corrections.length}
      defaultOpen={false}
    >
      {corrections.length === 0 && <div className="muted">No active corrections.</div>}
      {grouped.map((g) => (
        <div key={g.category} className="correction-group">
          <div className="subhead">{g.category}</div>
          <ul className="correction-list">
            {g.items.map((c) => (
              <li key={c.rule_slug} className="correction-line">
                <div className="correction-slug small muted">{c.rule_slug}</div>
                <div className="correction-text">{c.rule_text}</div>
                {c.notes && <div className="correction-notes small muted">{c.notes}</div>}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </Panel>
  );
}
