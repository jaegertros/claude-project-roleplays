import { useState } from "react";
import type { HjalmarState, KnowledgeWallItem } from "../types";
import type { UseHjalmarState } from "../state";
import { Panel } from "./Panel";

type ColumnKey = KnowledgeWallItem["column"];

interface Props {
  state: HjalmarState;
  store: UseHjalmarState;
}

const COL_LABELS: Record<ColumnKey, string> = {
  player: "Player knows",
  body: "Body knows",
  world: "World knows about him",
};

export function KnowledgeWallPanel({ state, store }: Props) {
  const [text, setText] = useState("");
  const [col, setCol] = useState<ColumnKey>("player");
  const [source, setSource] = useState("");

  function add() {
    if (!text.trim()) return;
    store.addKnowledge({
      text: text.trim(),
      column: col,
      added_week: state.week,
      added_day: state.day,
      source: source.trim() || undefined,
    });
    setText("");
    setSource("");
  }

  const grouped: Record<ColumnKey, KnowledgeWallItem[]> = {
    player: [],
    body: [],
    world: [],
  };
  for (const k of state.knowledge_wall) grouped[k.column].push(k);

  return (
    <Panel title="The Knowledge Wall" count={state.knowledge_wall.length}>
      <div className="kw-wall">
        {(Object.keys(COL_LABELS) as ColumnKey[]).map((key) => (
          <div className="kw-col" key={key}>
            <h3>{COL_LABELS[key]}</h3>
            {grouped[key].length === 0 ? (
              <div className="empty-msg small">— silent —</div>
            ) : (
              <ul className="kw-list">
                {grouped[key].map((k) => (
                  <li key={k.id}>
                    <span className="kw-marker">
                      W{k.added_week}D{k.added_day}
                    </span>
                    <span className="kw-text">
                      {k.text}
                      {k.source && (
                        <span className="kw-source"> — {k.source}</span>
                      )}
                    </span>
                    <button
                      className="kw-rm"
                      title="Remove"
                      onClick={() => store.removeKnowledge(k.id)}
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
      <div className="kw-add">
        <select value={col} onChange={(e) => setCol(e.target.value as ColumnKey)}>
          <option value="player">Player</option>
          <option value="body">Body</option>
          <option value="world">World</option>
        </select>
        <input
          placeholder="What was learned…"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && add()}
        />
        <input
          placeholder="Source (NPC, scene…)"
          value={source}
          onChange={(e) => setSource(e.target.value)}
        />
        <button onClick={add}>Add</button>
      </div>
    </Panel>
  );
}
