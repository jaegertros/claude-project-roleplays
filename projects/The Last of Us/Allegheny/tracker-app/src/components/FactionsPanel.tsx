import { useState } from "react";
import { api, ApiError } from "../api";
import type { Settings } from "../settings";
import { KNOWN_FACTIONS, type FactionName } from "../types";
import { Panel } from "./Panel";

interface Props {
  factionsKnown: Record<FactionName, boolean>;
  settings: Settings;
  onAfterChange: () => void;
}

export function FactionsPanel({ factionsKnown, settings, onAfterChange }: Props) {
  const [pending, setPending] = useState<FactionName | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function toggle(faction: FactionName) {
    setPending(faction);
    setErr(null);
    try {
      await api.setFactionKnown(settings, faction, !factionsKnown[faction]);
      onAfterChange();
    } catch (e) {
      setErr(e instanceof ApiError ? e.message : e instanceof Error ? e.message : String(e));
    } finally {
      setPending(null);
    }
  }

  const known = KNOWN_FACTIONS.filter((f) => factionsKnown[f]).length;

  return (
    <Panel title="Factions" count={known}>
      <div className="faction-grid">
        {KNOWN_FACTIONS.map((f) => (
          <button
            key={f}
            className={`faction-cell ${factionsKnown[f] ? "known" : "unknown"} ${
              pending === f ? "pending" : ""
            }`}
            disabled={pending !== null}
            onClick={() => toggle(f)}
            title={factionsKnown[f] ? "Click to mark unknown" : "Click to mark known"}
          >
            {f}
          </button>
        ))}
      </div>
      {err && <div className="probe probe-err">✗ {err}</div>}
    </Panel>
  );
}
