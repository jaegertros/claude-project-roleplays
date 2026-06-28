// Not strictly listed in the spec, but the player needs to edit inventory
// from somewhere; we slot a compact editor under the tracking block.

import { useState } from "react";
import type { HjalmarState } from "../types";
import type { UseHjalmarState } from "../state";
import { Panel } from "./Panel";

interface Props {
  state: HjalmarState;
  store: UseHjalmarState;
}

export function InventoryPanel({ state, store }: Props) {
  const [name, setName] = useState("");
  const [qty, setQty] = useState(1);
  const [notes, setNotes] = useState("");

  function add() {
    if (!name.trim()) return;
    store.addInventory({
      name: name.trim(),
      qty: Math.max(1, qty),
      notes: notes.trim() || undefined,
    });
    setName("");
    setQty(1);
    setNotes("");
  }

  return (
    <Panel title="On his person" count={state.inventory.length}>
      {state.inventory.length === 0 ? (
        <div className="empty-msg">— nothing —</div>
      ) : (
        <ul className="inv-list">
          {state.inventory.map((i) => (
            <li className="inv-row" key={i.id}>
              <span className="inv-qty">{i.qty}×</span>
              <span>
                <span className="inv-name">{i.name}</span>
                {i.notes && <span className="inv-notes">— {i.notes}</span>}
              </span>
              <button
                className="kw-rm"
                onClick={() => store.removeInventory(i.id)}
                title="Remove"
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}
      <div className="inv-add">
        <input
          type="number"
          min={1}
          value={qty}
          onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
        />
        <input
          placeholder="Item"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && add()}
        />
        <input
          placeholder="Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        <button onClick={add}>Add</button>
      </div>
    </Panel>
  );
}
