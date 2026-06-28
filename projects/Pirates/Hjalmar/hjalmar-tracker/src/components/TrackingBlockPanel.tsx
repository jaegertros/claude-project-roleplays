// The canonical tracking block — five lines, monospaced, top of the page.
// Auto-rendered from state.  Copyable for pasting back into chat.

import { useState } from "react";
import type { HjalmarState } from "../types";
import { TIME_EMOJI } from "../types";
import { Panel } from "./Panel";

interface Props {
  state: HjalmarState;
}

function formatInventory(s: HjalmarState): string {
  if (s.inventory.length === 0) return "nothing";
  return s.inventory
    .map((i) => (i.qty > 1 ? `${i.name} ×${i.qty}` : i.name))
    .join(", ");
}

function formatMoney(s: HjalmarState): string {
  const { reales, pieces_of_eight, doubloons } = s.money;
  const parts: string[] = [];
  if (doubloons > 0) {
    parts.push(`${doubloons} doubloon${doubloons === 1 ? "" : "s"}`);
  }
  if (pieces_of_eight > 0) {
    parts.push(
      `${pieces_of_eight} piece${pieces_of_eight === 1 ? "" : "s"} of eight`,
    );
  }
  if (reales > 0 || parts.length === 0) {
    parts.push(`${reales} reale${reales === 1 ? "" : "s"}`);
  }
  return parts.join(" + ");
}

function formatStatus(s: HjalmarState): string {
  const f = s.status_flags;
  const woundStr =
    s.wounds.filter((w) => !w.tended).length === 0
      ? "no open wounds"
      : `${s.wounds.filter((w) => !w.tended).length} open wound${s.wounds.filter((w) => !w.tended).length === 1 ? "" : "s"}`;
  return [
    woundStr,
    f.fatigue,
    f.hunger,
    f.thirst,
    f.drunkenness,
    `${f.wanted} wanted`,
    `${f.reputation} reputation`,
  ].join(", ");
}

function formatIdentity(s: HjalmarState): string {
  if (s.identity_ledger.length === 0) {
    return "name on the paper in pocket: Caleb Eriksohn — origin unknown";
  }
  return s.identity_ledger.map((i) => i.fact).join(" / ");
}

function buildBlock(s: HjalmarState): string {
  const tod = s.time_of_day;
  const todLabel = tod.charAt(0).toUpperCase() + tod.slice(1);
  return [
    `[INVENTORY: ${formatInventory(s)}]`,
    `[MONEY: ${formatMoney(s)}]`,
    `[STATUS: ${formatStatus(s)}]`,
    `[IDENTITY: ${formatIdentity(s)}]`,
    `[Week ${s.week}, Day ${s.day} — ${todLabel}]`,
  ].join("\n");
}

export function TrackingBlockPanel({ state }: Props) {
  const [copied, setCopied] = useState(false);

  const block = buildBlock(state);
  const timeHeader = `${TIME_EMOJI[state.time_of_day]} Week ${state.week}, Day ${state.day} (${state.day_of_week}) — ${capitalize(state.time_of_day)}`;

  async function copy() {
    try {
      await navigator.clipboard.writeText(`${block}\n\n${timeHeader}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore — older browsers without clipboard
    }
  }

  return (
    <Panel title="Tracking Block" defaultOpen>
      <div className="tracking-block">
        <div className="tb-row">[INVENTORY: {formatInventory(state)}]</div>
        <div className="tb-row">[MONEY: {formatMoney(state)}]</div>
        <div className="tb-row">[STATUS: {formatStatus(state)}]</div>
        <div className="tb-row">[IDENTITY: {formatIdentity(state)}]</div>
        <div className="tb-row">
          [Week {state.week}, Day {state.day} —{" "}
          {capitalize(state.time_of_day)}]
        </div>
      </div>
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 14,
          marginTop: 8,
          color: "var(--ink)",
        }}
      >
        {timeHeader}
      </div>
      <div className="tracking-copy">
        <button className="brass" onClick={copy}>
          {copied ? "Copied" : "Copy block"}
        </button>
      </div>
    </Panel>
  );
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
