import type { DayOfWeek, HjalmarState, TimeOfDay } from "../types";
import { DAY_ORDER, TIME_EMOJI, TIME_ORDER } from "../types";
import type { UseHjalmarState } from "../state";
import { Panel } from "./Panel";

interface Props {
  state: HjalmarState;
  store: UseHjalmarState;
}

function inConvergence(week: number, day: number): boolean {
  // Days 10-14 of the campaign: Week 2 days 3-7, with optional 2-3 day extension.
  if (week >= 3) return true;
  if (week === 2 && day >= 3) return true;
  return false;
}

function approachingConvergence(week: number, day: number): boolean {
  return week === 1 && day >= 5;
}

function advanceTime(
  state: HjalmarState,
  store: UseHjalmarState,
  dir: 1 | -1,
) {
  const idx = TIME_ORDER.indexOf(state.time_of_day);
  let nextIdx = idx + dir;
  let week = state.week;
  let day = state.day;
  let dow = state.day_of_week;
  if (nextIdx >= TIME_ORDER.length) {
    nextIdx = 0;
    day += 1;
    if (day > 7) {
      day = 1;
      week += 1;
    }
    const ix = (DAY_ORDER.indexOf(dow) + 1) % DAY_ORDER.length;
    dow = DAY_ORDER[ix];
  } else if (nextIdx < 0) {
    nextIdx = TIME_ORDER.length - 1;
    day -= 1;
    if (day < 1) {
      day = 7;
      week = Math.max(1, week - 1);
    }
    const ix = (DAY_ORDER.indexOf(dow) - 1 + DAY_ORDER.length) %
      DAY_ORDER.length;
    dow = DAY_ORDER[ix];
  }
  store.update({
    time_of_day: TIME_ORDER[nextIdx],
    week,
    day,
    day_of_week: dow,
  });
}

export function CalendarPanel({ state, store }: Props) {
  const conv = inConvergence(state.week, state.day);
  const pre = approachingConvergence(state.week, state.day);

  return (
    <Panel title="The Calendar" defaultOpen>
      <div className="cal-grid">
        <div className="cal-day-of-week">{state.day_of_week}</div>

        <div className="cal-row">
          <span className="cal-key">Week / Day</span>
          <span className="cal-val">
            <input
              type="number"
              min={1}
              value={state.week}
              onChange={(e) =>
                store.update({ week: Math.max(1, Number(e.target.value) || 1) })
              }
              style={{ width: 60, display: "inline-block", marginRight: 6 }}
            />
            /
            <input
              type="number"
              min={1}
              max={7}
              value={state.day}
              onChange={(e) =>
                store.update({
                  day: Math.min(7, Math.max(1, Number(e.target.value) || 1)),
                })
              }
              style={{ width: 60, display: "inline-block", marginLeft: 6 }}
            />
          </span>
        </div>

        <div className="cal-row">
          <span className="cal-key">Day of week</span>
          <span className="cal-val">
            <select
              value={state.day_of_week}
              onChange={(e) =>
                store.update({ day_of_week: e.target.value as DayOfWeek })
              }
            >
              {DAY_ORDER.map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>
          </span>
        </div>

        <div className="cal-row">
          <span className="cal-key">Time of day</span>
          <span
            className="cal-val"
            style={{ display: "flex", gap: 6, alignItems: "center" }}
          >
            <span className="cal-emoji">{TIME_EMOJI[state.time_of_day]}</span>
            <select
              value={state.time_of_day}
              onChange={(e) =>
                store.update({ time_of_day: e.target.value as TimeOfDay })
              }
              style={{ flex: 1 }}
            >
              {TIME_ORDER.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
            <button onClick={() => advanceTime(state, store, -1)}>−</button>
            <button onClick={() => advanceTime(state, store, 1)}>+</button>
          </span>
        </div>

        <div className="cal-row">
          <span className="cal-key">Location</span>
          <span className="cal-val">
            <input
              value={state.location}
              onChange={(e) => store.update({ location: e.target.value })}
            />
          </span>
        </div>
      </div>

      {conv && (
        <div className="cal-convergence">
          ⚔ Convergence Window — at least two ignition paths burning ⚔
        </div>
      )}
      {!conv && pre && (
        <div className="cal-pre-convergence">
          Approaching convergence — the week turns
        </div>
      )}
    </Panel>
  );
}
