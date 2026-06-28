import type { ResidencyEntry } from "../types";
import { Panel } from "./Panel";

interface Props {
  residency: ResidencyEntry[];
}

export function ResidencyPanel({ residency }: Props) {
  // Group by location for readability.
  const byLocation = new Map<string, ResidencyEntry[]>();
  for (const r of residency) {
    const list = byLocation.get(r.location_slug) || [];
    list.push(r);
    byLocation.set(r.location_slug, list);
  }
  const sortedLocations = Array.from(byLocation.keys()).sort();

  return (
    <Panel
      title="Residency"
      count={residency.length}
      defaultOpen={residency.length > 0}
    >
      {residency.length === 0 && <div className="muted">No current placements.</div>}
      {sortedLocations.map((loc) => (
        <div key={loc} className="residency-group">
          <div className="subhead">{loc}</div>
          <ul className="residency-list">
            {byLocation.get(loc)!.map((r) => (
              <li key={`${r.character_id}-${r.location_slug}`} className="residency-line">
                <span className="residency-char">{r.character_id}</span>
                <span className="residency-time muted small">
                  since Day {r.arrived_day} {r.arrived_time}
                </span>
                {r.notes && <span className="residency-notes small muted"> · {r.notes}</span>}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </Panel>
  );
}
