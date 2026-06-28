import type { HjalmarState } from "../types";
import { TIME_EMOJI } from "../types";

interface Props {
  state: HjalmarState;
}

function totalReales(s: HjalmarState): number {
  return (
    s.money.reales +
    s.money.pieces_of_eight * 8 +
    s.money.doubloons * 16 * 8
  );
}

function inConvergence(week: number, day: number): boolean {
  // Days 10-14 of the campaign: Week 2 days 3-7, or Week 3 day 1 if we
  // extend by a day. Conservative: highlight when week >= 2 and day >= 3.
  if (week >= 3) return true;
  if (week === 2 && day >= 3) return true;
  return false;
}

export function StatusStrip({ state }: Props) {
  const conv = inConvergence(state.week, state.day);
  return (
    <footer className="statusbar">
      <span className="strip-key">Vessel</span>
      <span className="strip-val">{state.ship_name}</span>
      <span>·</span>
      <span className="strip-key">Captain</span>
      <span className="strip-val">{state.player_name}</span>
      <span className="strip-spacer" />
      <span className="strip-key">Purse</span>
      <span className="strip-val">{totalReales(state)} reales</span>
      <span className="strip-spacer" />
      <span className="strip-key">Depth</span>
      <span className="strip-val">{state.depth}/5</span>
      <span className="strip-spacer" />
      {conv && <span className="strip-val urgent">CONVERGENCE WINDOW</span>}
      <span>{TIME_EMOJI[state.time_of_day]}</span>
      <span className="strip-val">
        Week {state.week}, Day {state.day} — {state.day_of_week} {" "}
        {capitalize(state.time_of_day)}
      </span>
    </footer>
  );
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
