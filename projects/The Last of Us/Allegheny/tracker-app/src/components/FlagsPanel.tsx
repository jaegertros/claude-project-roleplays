import { useState } from "react";
import { api, ApiError } from "../api";
import type { Settings } from "../settings";
import { KNOWN_FLAGS, type FlagName } from "../types";
import { Panel } from "./Panel";

interface Props {
  flags: Record<FlagName, boolean>;
  settings: Settings;
  onAfterChange: () => void;
}

const FLAG_GROUPS: { label: string; flags: FlagName[] }[] = [
  {
    label: "Mortality & structure",
    flags: ["best_friend_mortal_after_week_1", "player_mortal_after_explicit_commit"],
  },
  {
    label: "Reveal gates",
    flags: ["cordyceps_word_unlocked", "fireflies_revealed", "cause_explained", "jackson_named"],
  },
  {
    label: "News encounters",
    flags: [
      "news_cdc_briefing_seen",
      "news_fedra_announced",
      "news_qz_named",
      "news_fireflies_named",
      "news_cordyceps_named",
    ],
  },
];

function prettify(flag: string): string {
  return flag.replace(/_/g, " ");
}

export function FlagsPanel({ flags, settings, onAfterChange }: Props) {
  const [pending, setPending] = useState<FlagName | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function toggle(flag: FlagName) {
    setPending(flag);
    setErr(null);
    try {
      await api.setFlag(settings, flag, !flags[flag]);
      onAfterChange();
    } catch (e) {
      setErr(e instanceof ApiError ? e.message : e instanceof Error ? e.message : String(e));
    } finally {
      setPending(null);
    }
  }

  const trueCount = KNOWN_FLAGS.filter((f) => flags[f]).length;

  return (
    <Panel title="Flags" count={`${trueCount}/${KNOWN_FLAGS.length}`}>
      {FLAG_GROUPS.map((g) => (
        <div key={g.label} className="flag-group">
          <div className="subhead">{g.label}</div>
          <ul className="flag-list">
            {g.flags.map((f) => (
              <li
                key={f}
                className={`flag-row ${flags[f] ? "on" : "off"} ${pending === f ? "pending" : ""}`}
                onClick={() => pending === null && toggle(f)}
              >
                <span className="flag-pip">{flags[f] ? "●" : "○"}</span>
                <span className="flag-name">{prettify(f)}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
      {err && <div className="probe probe-err">✗ {err}</div>}
    </Panel>
  );
}
