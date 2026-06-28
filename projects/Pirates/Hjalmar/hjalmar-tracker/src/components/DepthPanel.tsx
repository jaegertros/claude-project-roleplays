import type { DepthLevel, HjalmarState } from "../types";
import type { UseHjalmarState } from "../state";
import { Panel } from "./Panel";

interface Props {
  state: HjalmarState;
  store: UseHjalmarState;
}

const LABELS: Record<DepthLevel, string> = {
  0: "Surface — port walked, no names yet named.",
  1: "Names exchanged — first NPCs known to the player.",
  2: "Faction angles — he sees the eight blocks beginning to push.",
  3: "Triggers fired — DEPTH keywords have surfaced.",
  4: "Convergence — two ignition paths burning at once.",
  5: "Settled — the past is no longer past.",
};

export function DepthPanel({ state, store }: Props) {
  return (
    <Panel title="Depth">
      <div className="depth-row">
        {([0, 1, 2, 3, 4, 5] as DepthLevel[]).map((d) => (
          <span
            key={d}
            className={`depth-pip ${d <= state.depth ? "filled" : ""}`}
            onClick={() => store.bumpDepth(d)}
            title={`Set depth to ${d}`}
          >
            {d}
          </span>
        ))}
      </div>
      <div className="depth-label">DEPTH {state.depth} / 5</div>
      <div
        className="empty-msg"
        style={{ fontStyle: "italic", textAlign: "center" }}
      >
        {LABELS[state.depth]}
      </div>
    </Panel>
  );
}
