// state.ts — localStorage-backed state hook for the Hjalmar tracker.

import { useCallback, useEffect, useState } from "react";
import type {
  CrewMember,
  DepthLevel,
  Faction,
  HjalmarState,
  IdentityLedgerEntry,
  InventoryItem,
  JournalEntry,
  KnowledgeWallItem,
  Mark,
  MarkId,
  NPC,
  Theory,
  Wound,
} from "./types";

const STORAGE_KEY = "hjalmar-tracker:state:v1";

// ----------------------------------------------------------------------------
// id helper
// ----------------------------------------------------------------------------

function uid(prefix = "x"): string {
  return `${prefix}_${Math.random().toString(36).slice(2, 8)}${Date.now()
    .toString(36)
    .slice(-3)}`;
}

// ----------------------------------------------------------------------------
// canonical seed values
// ----------------------------------------------------------------------------

// The eight faction blocks of Sankt Hjalmar — names taken from
// KNOWLEDGE_7_Factions.md.
const SEED_FACTIONS: Faction[] = [
  {
    id: "selskab",
    name: "The Selskab / The Company",
    short_name: "Selskab",
    player_standing: "unknown",
  },
  {
    id: "plantation_council",
    name: "The Plantation Council",
    short_name: "Council",
    player_standing: "unknown",
  },
  {
    id: "free_brotherhood",
    name: "The Free Brotherhood",
    short_name: "Brotherhood",
    player_standing: "unknown",
  },
  {
    id: "spanish_remnant",
    name: "The Spanish Remnant",
    short_name: "Spaniards",
    player_standing: "unknown",
  },
  {
    id: "sephardim",
    name: "The Sephardim",
    short_name: "Sephardim",
    player_standing: "unknown",
  },
  {
    id: "maroons",
    name: "The Maroons",
    short_name: "Maroons",
    player_standing: "unknown",
  },
  {
    id: "free_black_town",
    name: "The Free & Enslaved Black Population in Town",
    short_name: "Black Town",
    player_standing: "unknown",
  },
  {
    id: "royal_navy_ghost",
    name: "The Royal Navy Ghost",
    short_name: "RN Ghost",
    player_standing: "unknown",
  },
];

const SEED_MARKS: Record<MarkId, Mark> = {
  eyebrow_scar: {
    id: "eyebrow_scar",
    name: "Scar through the right eyebrow",
    description:
      "A clean, old scar through the right eyebrow. Healed long ago. Origin unknown.",
    identified: false,
  },
  forearm_tattoo: {
    id: "forearm_tattoo",
    name: "Tattoo on the left forearm",
    description:
      "A blue-black tattoo on the inner left forearm. Lines and a small device he does not recognize.",
    identified: false,
  },
  inner_thigh_scars: {
    id: "inner_thigh_scars",
    name: "Three parallel scars on the inner left thigh",
    description:
      "Three parallel scars on the inner left thigh — narrow, deliberate, healed pale.",
    identified: false,
  },
};

// ----------------------------------------------------------------------------
// defaultState
// ----------------------------------------------------------------------------

export function defaultState(): HjalmarState {
  return {
    schema_version: "1.0",
    week: 1,
    day: 1,
    day_of_week: "Monday",
    time_of_day: "morning",
    location: "leeward beach, Sankt Hjalmar",
    player_name: "Caleb Eriksohn",
    ship_name: "the Whisht",
    inventory: [
      {
        id: "paper",
        name: "folded paper in coat pocket",
        qty: 1,
        notes:
          '"Caleb Eriksohn, Capt., the Whisht" in unfamiliar handwriting',
      },
    ],
    money: { reales: 0, pieces_of_eight: 0, doubloons: 0 },
    wounds: [],
    status_flags: {
      fatigue: "rested",
      hunger: "fed",
      thirst: "slaked",
      drunkenness: "sober",
      wanted: "unknown",
      reputation: "invisible",
    },
    marks: SEED_MARKS,
    knowledge_wall: [],
    identity_ledger: [
      {
        id: "i1",
        fact: "name on the paper in pocket: Caleb Eriksohn — origin unknown — three marks of unknown origin",
        committed_week: 1,
        committed_day: 1,
        source: "opening",
      },
    ],
    npcs: [],
    factions: SEED_FACTIONS,
    depth: 0,
    theories: [],
    journal_entries: [],
    crew: [],
    last_updated: new Date().toISOString(),
    notes: "",
  };
}

// ----------------------------------------------------------------------------
// persistence
// ----------------------------------------------------------------------------

function loadState(): HjalmarState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState();
    const parsed = JSON.parse(raw) as Partial<HjalmarState>;
    // Soft-merge defaults so newly-added top-level keys survive a refresh.
    const seed = defaultState();
    return { ...seed, ...parsed, marks: { ...seed.marks, ...(parsed.marks ?? {}) } } as HjalmarState;
  } catch {
    return defaultState();
  }
}

function saveState(s: HjalmarState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
  } catch {
    // localStorage may be unavailable in private modes; tracker still works
    // in-memory for the session.
  }
}

// ----------------------------------------------------------------------------
// hook
// ----------------------------------------------------------------------------

export interface UseHjalmarState {
  state: HjalmarState;
  setState: (s: HjalmarState) => void;
  update: (partial: Partial<HjalmarState>) => void;
  reset: () => void;
  exportJSON: () => string;
  importJSON: (json: string) => { ok: true } | { ok: false; error: string };
  // Action helpers
  addKnowledge: (item: Omit<KnowledgeWallItem, "id">) => void;
  removeKnowledge: (id: string) => void;
  commitIdentity: (entry: Omit<IdentityLedgerEntry, "id">) => void;
  removeIdentity: (id: string) => void;
  addInventory: (item: Omit<InventoryItem, "id">) => void;
  removeInventory: (id: string) => void;
  addWound: (w: Omit<Wound, "id">) => void;
  tendWound: (id: string) => void;
  removeWound: (id: string) => void;
  addNPC: (n: Omit<NPC, "id">) => void;
  updateNPC: (id: string, patch: Partial<NPC>) => void;
  removeNPC: (id: string) => void;
  updateFaction: (id: string, patch: Partial<Faction>) => void;
  addTheory: (t: Omit<Theory, "id">) => void;
  updateTheory: (id: string, patch: Partial<Theory>) => void;
  removeTheory: (id: string) => void;
  addJournal: (e: Omit<JournalEntry, "id" | "created_at">) => void;
  removeJournal: (id: string) => void;
  addCrew: (m: Omit<CrewMember, "id">) => void;
  updateCrew: (id: string, patch: Partial<CrewMember>) => void;
  removeCrew: (id: string) => void;
  updateMark: (id: MarkId, patch: Partial<Mark>) => void;
  bumpDepth: (d: DepthLevel) => void;
}

export function useHjalmarState(): UseHjalmarState {
  const [state, setStateRaw] = useState<HjalmarState>(() => loadState());

  // Persist on change.
  useEffect(() => {
    saveState(state);
  }, [state]);

  const setState = useCallback((s: HjalmarState) => {
    setStateRaw({ ...s, last_updated: new Date().toISOString() });
  }, []);

  const update = useCallback((partial: Partial<HjalmarState>) => {
    setStateRaw((prev) => ({
      ...prev,
      ...partial,
      last_updated: new Date().toISOString(),
    }));
  }, []);

  const reset = useCallback(() => {
    setStateRaw(defaultState());
  }, []);

  const exportJSON = useCallback(() => JSON.stringify(state, null, 2), [state]);

  const importJSON = useCallback(
    (json: string): { ok: true } | { ok: false; error: string } => {
      try {
        const parsed = JSON.parse(json) as Partial<HjalmarState>;
        if (typeof parsed !== "object" || parsed === null) {
          return { ok: false, error: "not an object" };
        }
        const seed = defaultState();
        setStateRaw({
          ...seed,
          ...parsed,
          marks: { ...seed.marks, ...(parsed.marks ?? {}) },
          last_updated: new Date().toISOString(),
        } as HjalmarState);
        return { ok: true };
      } catch (e) {
        return {
          ok: false,
          error: e instanceof Error ? e.message : String(e),
        };
      }
    },
    [],
  );

  // ----- action helpers -----

  const addKnowledge: UseHjalmarState["addKnowledge"] = useCallback((item) => {
    setStateRaw((prev) => ({
      ...prev,
      knowledge_wall: [...prev.knowledge_wall, { ...item, id: uid("kw") }],
      last_updated: new Date().toISOString(),
    }));
  }, []);

  const removeKnowledge: UseHjalmarState["removeKnowledge"] = useCallback(
    (id) => {
      setStateRaw((prev) => ({
        ...prev,
        knowledge_wall: prev.knowledge_wall.filter((k) => k.id !== id),
        last_updated: new Date().toISOString(),
      }));
    },
    [],
  );

  const commitIdentity: UseHjalmarState["commitIdentity"] = useCallback(
    (entry) => {
      setStateRaw((prev) => ({
        ...prev,
        identity_ledger: [
          ...prev.identity_ledger,
          { ...entry, id: uid("id") },
        ],
        last_updated: new Date().toISOString(),
      }));
    },
    [],
  );

  const removeIdentity: UseHjalmarState["removeIdentity"] = useCallback(
    (id) => {
      setStateRaw((prev) => ({
        ...prev,
        identity_ledger: prev.identity_ledger.filter((i) => i.id !== id),
        last_updated: new Date().toISOString(),
      }));
    },
    [],
  );

  const addInventory: UseHjalmarState["addInventory"] = useCallback((item) => {
    setStateRaw((prev) => ({
      ...prev,
      inventory: [...prev.inventory, { ...item, id: uid("inv") }],
      last_updated: new Date().toISOString(),
    }));
  }, []);

  const removeInventory: UseHjalmarState["removeInventory"] = useCallback(
    (id) => {
      setStateRaw((prev) => ({
        ...prev,
        inventory: prev.inventory.filter((i) => i.id !== id),
        last_updated: new Date().toISOString(),
      }));
    },
    [],
  );

  const addWound: UseHjalmarState["addWound"] = useCallback((w) => {
    setStateRaw((prev) => ({
      ...prev,
      wounds: [...prev.wounds, { ...w, id: uid("w") }],
      last_updated: new Date().toISOString(),
    }));
  }, []);

  const tendWound: UseHjalmarState["tendWound"] = useCallback((id) => {
    setStateRaw((prev) => ({
      ...prev,
      wounds: prev.wounds.map((w) =>
        w.id === id ? { ...w, tended: true } : w,
      ),
      last_updated: new Date().toISOString(),
    }));
  }, []);

  const removeWound: UseHjalmarState["removeWound"] = useCallback((id) => {
    setStateRaw((prev) => ({
      ...prev,
      wounds: prev.wounds.filter((w) => w.id !== id),
      last_updated: new Date().toISOString(),
    }));
  }, []);

  const addNPC: UseHjalmarState["addNPC"] = useCallback((n) => {
    setStateRaw((prev) => ({
      ...prev,
      npcs: [...prev.npcs, { ...n, id: uid("npc") }],
      last_updated: new Date().toISOString(),
    }));
  }, []);

  const updateNPC: UseHjalmarState["updateNPC"] = useCallback((id, patch) => {
    setStateRaw((prev) => ({
      ...prev,
      npcs: prev.npcs.map((n) => (n.id === id ? { ...n, ...patch } : n)),
      last_updated: new Date().toISOString(),
    }));
  }, []);

  const removeNPC: UseHjalmarState["removeNPC"] = useCallback((id) => {
    setStateRaw((prev) => ({
      ...prev,
      npcs: prev.npcs.filter((n) => n.id !== id),
      last_updated: new Date().toISOString(),
    }));
  }, []);

  const updateFaction: UseHjalmarState["updateFaction"] = useCallback(
    (id, patch) => {
      setStateRaw((prev) => ({
        ...prev,
        factions: prev.factions.map((f) =>
          f.id === id ? { ...f, ...patch } : f,
        ),
        last_updated: new Date().toISOString(),
      }));
    },
    [],
  );

  const addTheory: UseHjalmarState["addTheory"] = useCallback((t) => {
    setStateRaw((prev) => ({
      ...prev,
      theories: [...prev.theories, { ...t, id: uid("th") }],
      last_updated: new Date().toISOString(),
    }));
  }, []);

  const updateTheory: UseHjalmarState["updateTheory"] = useCallback(
    (id, patch) => {
      setStateRaw((prev) => ({
        ...prev,
        theories: prev.theories.map((t) =>
          t.id === id ? { ...t, ...patch } : t,
        ),
        last_updated: new Date().toISOString(),
      }));
    },
    [],
  );

  const removeTheory: UseHjalmarState["removeTheory"] = useCallback((id) => {
    setStateRaw((prev) => ({
      ...prev,
      theories: prev.theories.filter((t) => t.id !== id),
      last_updated: new Date().toISOString(),
    }));
  }, []);

  const addJournal: UseHjalmarState["addJournal"] = useCallback((e) => {
    setStateRaw((prev) => ({
      ...prev,
      journal_entries: [
        ...prev.journal_entries,
        { ...e, id: uid("j"), created_at: new Date().toISOString() },
      ],
      last_updated: new Date().toISOString(),
    }));
  }, []);

  const removeJournal: UseHjalmarState["removeJournal"] = useCallback((id) => {
    setStateRaw((prev) => ({
      ...prev,
      journal_entries: prev.journal_entries.filter((j) => j.id !== id),
      last_updated: new Date().toISOString(),
    }));
  }, []);

  const addCrew: UseHjalmarState["addCrew"] = useCallback((m) => {
    setStateRaw((prev) => ({
      ...prev,
      crew: [...prev.crew, { ...m, id: uid("c") }],
      last_updated: new Date().toISOString(),
    }));
  }, []);

  const updateCrew: UseHjalmarState["updateCrew"] = useCallback(
    (id, patch) => {
      setStateRaw((prev) => ({
        ...prev,
        crew: prev.crew.map((c) => (c.id === id ? { ...c, ...patch } : c)),
        last_updated: new Date().toISOString(),
      }));
    },
    [],
  );

  const removeCrew: UseHjalmarState["removeCrew"] = useCallback((id) => {
    setStateRaw((prev) => ({
      ...prev,
      crew: prev.crew.filter((c) => c.id !== id),
      last_updated: new Date().toISOString(),
    }));
  }, []);

  const updateMark: UseHjalmarState["updateMark"] = useCallback(
    (id, patch) => {
      setStateRaw((prev) => ({
        ...prev,
        marks: { ...prev.marks, [id]: { ...prev.marks[id], ...patch } },
        last_updated: new Date().toISOString(),
      }));
    },
    [],
  );

  const bumpDepth: UseHjalmarState["bumpDepth"] = useCallback((d) => {
    setStateRaw((prev) => ({
      ...prev,
      depth: d,
      last_updated: new Date().toISOString(),
    }));
  }, []);

  return {
    state,
    setState,
    update,
    reset,
    exportJSON,
    importJSON,
    addKnowledge,
    removeKnowledge,
    commitIdentity,
    removeIdentity,
    addInventory,
    removeInventory,
    addWound,
    tendWound,
    removeWound,
    addNPC,
    updateNPC,
    removeNPC,
    updateFaction,
    addTheory,
    updateTheory,
    removeTheory,
    addJournal,
    removeJournal,
    addCrew,
    updateCrew,
    removeCrew,
    updateMark,
    bumpDepth,
  };
}
