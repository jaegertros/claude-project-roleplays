import type { AgreementEntry } from "../types";
import { Panel } from "./Panel";

interface Props {
  agreements: AgreementEntry[];
}

export function AgreementsPanel({ agreements }: Props) {
  return (
    <Panel
      title="Standing Agreements"
      count={agreements.length}
      defaultOpen={agreements.length > 0}
    >
      {agreements.length === 0 && <div className="muted">No active agreements.</div>}
      <ul className="agreement-list">
        {agreements.map((a) => (
          <li key={a.agreement_slug} className="agreement-line">
            <div className="agreement-head">
              <span className="agreement-slug">{a.agreement_slug}</span>
              <span className="agreement-version muted small">v{a.version}</span>
              <span className="agreement-time muted small">
                Day {a.story_day} {a.story_time}
              </span>
            </div>
            <div className="agreement-parties small muted">
              {a.parties.join(" + ")}
            </div>
            <div className="agreement-terms">{a.terms}</div>
            {a.notes && <div className="agreement-notes small muted">{a.notes}</div>}
          </li>
        ))}
      </ul>
    </Panel>
  );
}
