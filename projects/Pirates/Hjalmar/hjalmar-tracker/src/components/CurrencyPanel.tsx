import type { HjalmarState, Money } from "../types";
import type { UseHjalmarState } from "../state";
import { Panel } from "./Panel";

interface Props {
  state: HjalmarState;
  store: UseHjalmarState;
}

function bump(store: UseHjalmarState, state: HjalmarState, key: keyof Money, by: number) {
  const next = Math.max(0, state.money[key] + by);
  store.update({ money: { ...state.money, [key]: next } });
}

function totalReales(m: Money): number {
  // 1 piece of eight = 8 reales; 1 doubloon = 16 reales of silver value
  // (rough — gold doubloon ≈ 2 pieces of eight, i.e. 16 reales).
  return m.reales + m.pieces_of_eight * 8 + m.doubloons * 16;
}

export function CurrencyPanel({ state, store }: Props) {
  const total = totalReales(state.money);
  return (
    <Panel title="The Purse" defaultOpen>
      <div className="currency-grid">
        <div className="currency-cell reales">
          <h4>Reales</h4>
          <div className="currency-amt">{state.money.reales}</div>
          <div className="currency-controls">
            <button onClick={() => bump(store, state, "reales", -1)}>−1</button>
            <button onClick={() => bump(store, state, "reales", 1)}>+1</button>
            <button onClick={() => bump(store, state, "reales", 8)}>+8</button>
          </div>
        </div>
        <div className="currency-cell poe">
          <h4>Pieces of Eight</h4>
          <div className="currency-amt">{state.money.pieces_of_eight}</div>
          <div className="currency-controls">
            <button onClick={() => bump(store, state, "pieces_of_eight", -1)}>
              −1
            </button>
            <button onClick={() => bump(store, state, "pieces_of_eight", 1)}>
              +1
            </button>
            <button onClick={() => bump(store, state, "pieces_of_eight", 10)}>
              +10
            </button>
          </div>
        </div>
        <div className="currency-cell doubloons">
          <h4>Doubloons</h4>
          <div className="currency-amt">{state.money.doubloons}</div>
          <div className="currency-controls">
            <button onClick={() => bump(store, state, "doubloons", -1)}>
              −1
            </button>
            <button onClick={() => bump(store, state, "doubloons", 1)}>
              +1
            </button>
            <button onClick={() => bump(store, state, "doubloons", 5)}>
              +5
            </button>
          </div>
        </div>
      </div>
      <div className="currency-total">
        ≈ {total} reales total · 1 P/8 = 8 reales · 1 doubloon ≈ 16 reales
      </div>
    </Panel>
  );
}
