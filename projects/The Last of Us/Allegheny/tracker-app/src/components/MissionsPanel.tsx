import type { Mission } from "../types";
import { Panel } from "./Panel";

interface Props {
  missions: { active: Mission[]; completed: Mission[]; deferred: Mission[] };
}

export function MissionsPanel({ missions }: Props) {
  return (
    <Panel
      title="Missions"
      count={missions.active.length}
      defaultOpen={missions.active.length > 0}
    >
      <Group label="Active" missions={missions.active} emptyText="No active missions." />
      {missions.deferred.length > 0 && (
        <Group label="Deferred" missions={missions.deferred} dim />
      )}
      {missions.completed.length > 0 && (
        <Group label={`Completed (${missions.completed.length})`} missions={missions.completed} dim />
      )}
    </Panel>
  );
}

function Group({
  label,
  missions,
  emptyText,
  dim,
}: {
  label: string;
  missions: Mission[];
  emptyText?: string;
  dim?: boolean;
}) {
  return (
    <div className={`mission-group ${dim ? "dim" : ""}`}>
      <div className="subhead">{label}</div>
      {missions.length === 0 && emptyText && <div className="muted">{emptyText}</div>}
      <ul className="mission-list">
        {missions.map((m) => (
          <li key={m.id}>
            <div className="mission-line">
              <span className="mission-id">{m.id}</span>
              <span className="mission-title">{m.title || "(no title)"}</span>
            </div>
            <div className="mission-meta muted small">
              {m.sub_state}
              {m.outcome ? ` · ${m.outcome}` : ""}
              {m.started_at ? ` · started ${m.started_at}` : ""}
            </div>
            {m.notes && <div className="mission-notes small">{m.notes}</div>}
          </li>
        ))}
      </ul>
    </div>
  );
}
