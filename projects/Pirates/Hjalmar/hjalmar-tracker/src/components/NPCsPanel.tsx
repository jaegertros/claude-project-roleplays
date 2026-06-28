import { useState } from "react";
import type { HjalmarState, NPC, Relationship } from "../types";
import type { UseHjalmarState } from "../state";
import { Panel } from "./Panel";

interface Props {
  state: HjalmarState;
  store: UseHjalmarState;
}

const RELS: Relationship[] = [
  "unknown",
  "stranger",
  "acquaintance",
  "wary",
  "friendly",
  "allied",
  "hostile",
  "sworn",
];

export function NPCsPanel({ state, store }: Props) {
  const [name, setName] = useState("");
  const [factionId, setFactionId] = useState("");

  function add() {
    if (!name.trim()) return;
    store.addNPC({
      name: name.trim(),
      faction_id: factionId || undefined,
      present: true,
      relationship: "stranger",
      body_recognizes: false,
      mind_remembers: false,
    });
    setName("");
    setFactionId("");
  }

  function factionName(id?: string): string {
    if (!id) return "";
    const f = state.factions.find((x) => x.id === id);
    return f ? f.short_name : id;
  }

  const present = state.npcs.filter((n) => n.present);
  const absent = state.npcs.filter((n) => !n.present);

  return (
    <Panel title="Cast in scene" count={state.npcs.length}>
      {present.length === 0 && absent.length === 0 ? (
        <div className="empty-msg">— no named souls yet recorded —</div>
      ) : null}

      {present.length > 0 && (
        <>
          <div className="subhead">Present</div>
          <ul className="npc-list">
            {present.map((n) => (
              <NPCRow
                key={n.id}
                npc={n}
                factionLabel={factionName(n.faction_id)}
                onUpdate={(p) => store.updateNPC(n.id, p)}
                onRemove={() => store.removeNPC(n.id)}
              />
            ))}
          </ul>
        </>
      )}

      {absent.length > 0 && (
        <>
          <div className="subhead">Off-scene</div>
          <ul className="npc-list">
            {absent.map((n) => (
              <NPCRow
                key={n.id}
                npc={n}
                factionLabel={factionName(n.faction_id)}
                onUpdate={(p) => store.updateNPC(n.id, p)}
                onRemove={() => store.removeNPC(n.id)}
              />
            ))}
          </ul>
        </>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr auto",
          gap: 6,
          marginTop: 8,
        }}
      >
        <input
          placeholder="NPC name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <select value={factionId} onChange={(e) => setFactionId(e.target.value)}>
          <option value="">— faction (none) —</option>
          {state.factions.map((f) => (
            <option key={f.id} value={f.id}>
              {f.short_name}
            </option>
          ))}
        </select>
        <button onClick={add}>Add</button>
      </div>
    </Panel>
  );
}

interface NPCRowProps {
  npc: NPC;
  factionLabel: string;
  onUpdate: (p: Partial<NPC>) => void;
  onRemove: () => void;
}

function NPCRow({ npc, factionLabel, onUpdate, onRemove }: NPCRowProps) {
  return (
    <li className={`npc-row ${npc.present ? "present" : ""}`}>
      <span className="npc-name">
        {npc.name}
        {factionLabel && (
          <span className="npc-faction">· {factionLabel}</span>
        )}
        <div style={{ marginTop: 4, display: "flex", gap: 8, fontSize: 11 }}>
          <label style={{ display: "inline-flex", gap: 3 }}>
            <input
              type="checkbox"
              checked={npc.body_recognizes}
              onChange={(e) =>
                onUpdate({ body_recognizes: e.target.checked })
              }
              style={{ width: "auto" }}
            />
            body recognizes
          </label>
          <label style={{ display: "inline-flex", gap: 3 }}>
            <input
              type="checkbox"
              checked={npc.mind_remembers}
              onChange={(e) =>
                onUpdate({ mind_remembers: e.target.checked })
              }
              style={{ width: "auto" }}
            />
            mind remembers
          </label>
        </div>
      </span>
      <select
        className="npc-rel"
        value={npc.relationship}
        onChange={(e) =>
          onUpdate({ relationship: e.target.value as Relationship })
        }
      >
        {RELS.map((r) => (
          <option key={r}>{r}</option>
        ))}
      </select>
      <button onClick={() => onUpdate({ present: !npc.present })}>
        {npc.present ? "leave" : "enter"}
      </button>
      <button className="npc-rm" onClick={onRemove} title="Remove">
        ×
      </button>
    </li>
  );
}
