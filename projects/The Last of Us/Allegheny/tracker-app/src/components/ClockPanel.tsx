import type { Clock } from "../types";
import { Panel } from "./Panel";

interface Props {
  clock: Clock;
}

const PHASE_LABEL: Record<string, string> = {
  pre_outbreak: "Pre-Outbreak",
  outbreak_week: "Outbreak Week",
  qz_era: "QZ Era",
  road: "The Road",
  year_one_plus: "Year 1+",
};

export function ClockPanel({ clock }: Props) {
  return (
    <Panel title="Clock" defaultOpen>
      <div className="clock-grid">
        <div className="clock-time">
          <div className="clock-day">{clock.story_day_label}</div>
          <div className="clock-hh">{clock.story_time}</div>
        </div>
        <div className="clock-meta">
          <div className="clock-row">
            <span className="muted">Phase</span>
            <span>{PHASE_LABEL[clock.story_phase] ?? clock.story_phase}</span>
          </div>
          <div className="clock-row">
            <span className="muted">Location</span>
            <span>{clock.location || "—"}</span>
          </div>
          <div className="clock-row">
            <span className="muted">Awareness</span>
            <AwarenessBar value={clock.awareness} />
          </div>
        </div>
      </div>
    </Panel>
  );
}

function AwarenessBar({ value }: { value: number }) {
  const filled = Math.max(0, Math.min(5, value));
  return (
    <span className="awareness">
      {[0, 1, 2, 3, 4].map((i) => (
        <span key={i} className={`awareness-cell ${i < filled ? "on" : ""}`} />
      ))}
      <span className="awareness-num">{filled}/5</span>
    </span>
  );
}
