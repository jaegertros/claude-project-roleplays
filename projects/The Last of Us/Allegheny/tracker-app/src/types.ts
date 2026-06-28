// Mirrors narrator_state/schema.py.
// Keep in sync when the schema changes.

export const SCHEMA_VERSION = "1.0";

export const KNOWN_FLAGS = [
  "best_friend_mortal_after_week_1",
  "player_mortal_after_explicit_commit",
  "cordyceps_word_unlocked",
  "fireflies_revealed",
  "cause_explained",
  "jackson_named",
  "news_cdc_briefing_seen",
  "news_fedra_announced",
  "news_qz_named",
  "news_fireflies_named",
  "news_cordyceps_named",
] as const;
export type FlagName = (typeof KNOWN_FLAGS)[number];

export const KNOWN_FACTIONS = [
  "FEDRA",
  "Fireflies",
  "Hunters",
  "WLF",
  "Seraphites",
  "Jackson",
  "Rattlers",
] as const;
export type FactionName = (typeof KNOWN_FACTIONS)[number];

export const STORY_PHASES = [
  "pre_outbreak",
  "outbreak_week",
  "qz_era",
  "road",
  "year_one_plus",
] as const;
export type StoryPhase = (typeof STORY_PHASES)[number];

export interface Clock {
  story_day: number;
  story_day_label: string;
  story_time: string;
  story_phase: StoryPhase;
  location: string;
  awareness: number; // 0-5
  history?: ClockHistoryEntry[];
}

export interface ClockHistoryEntry {
  turn: number;
  story_day: number;
  story_time: string;
  location: string;
  awareness: number;
  reason?: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  qty: number;
  notes?: string;
}

export interface Injury {
  id: string;
  logged_turn: number;
  body_part: string;
  severity: string;
  source: string;
  clean: boolean;
  infection_clock_minutes?: number | null;
  closed_turn?: number;
  outcome?: string;
  heal_notes?: string;
}

export interface Player {
  name: string;
  age: number | null;
  profession: string;
  pronouns: string;
  condition: string;
  active_injuries: Injury[];
  inventory: InventoryItem[];
}

export interface Perception {
  physical: string;
  behavioral: string[];
  last_updated_turn: number;
}

export interface Character {
  name: string;
  tier: string;
  relationship: string;
  condition: string;
  alive: boolean;
  present: boolean;
  active_injuries: Injury[];
  perception_of_player: Perception;
  history?: CharacterHistoryEntry[];
  injury_history?: Injury[];
  died_on?: string;
  cause_of_death?: string;
  obit?: string;
  died_turn?: number;
}

export interface CharacterHistoryEntry {
  turn: number;
  story_day: number;
  story_time: string;
  relationship: string;
  condition: string;
  present: boolean;
  notes: string;
}

export interface LostEntry {
  character_id: string;
  name: string;
  tier: string;
  story_day_label: string;
  cause: string;
  obit: string;
  died_turn: number;
}

export interface Mission {
  id: string;
  title: string;
  started_turn: number;
  started_at: string;
  sub_state: string;
  notes: string;
  completed_turn?: number;
  completed_at?: string;
  outcome?: string;
}

export interface MemoryBookEntry {
  id: string;
  session_id: string | null;
  story_day_range: string;
  summary: string;
  characters_in_scene: string[];
  ended_at: {
    story_day: number;
    story_time: string;
  };
  awareness_at_end: number;
  finalized_turn: number;
}

export interface SessionEntry {
  id: string;
  started: string;
  ended: string | null;
  turns: number;
  note: string;
  final_note?: string;
}

export interface State {
  schema_version: string;
  project: string;
  title: string;
  created: string;
  last_updated: string;
  session: {
    current_session_id: string | null;
    session_count: number;
    sessions: SessionEntry[];
  };
  clock: Clock;
  player: Player;
  characters: Record<string, Character>;
  lost: LostEntry[];
  factions_known: Record<FactionName, boolean>;
  missions: {
    active: Mission[];
    completed: Mission[];
    deferred: Mission[];
  };
  memory_book: MemoryBookEntry[];
  flags: Record<FlagName, boolean>;
  _meta?: { created_now?: boolean; schema_version?: string; session_id?: string };
}

// REST response envelope from server_rest_patch.py.
export type RestResponse<T = unknown> =
  | ({ ok: true } & T)
  | { ok: false; error: string; available?: string[] };

// Audit log entry for undo preview.
export interface AuditEntry {
  op: string;
  ts?: string;
  [key: string]: unknown;
}

// =========================================================================
// Extension state (Supabase-backed; six tables from v1.2 schema)
// Mirrors narrator_state/supabase_tools.py return shapes.
// =========================================================================

export interface CommitmentEntry {
  id: string;
  from_character: string;
  to_character: string;
  topic: string;
  scope: "full" | "partial" | "rumor" | "wrong_version";
  story_day: number;
  story_time: string;
  notes: string | null;
  source_event: string | null;
  created_at: string;
}

export interface AgreementEntry {
  agreement_slug: string;
  parties: string[];
  terms: string;
  story_day: number;
  story_time: string;
  version: number;
  notes: string | null;
}

export interface CorrectionEntry {
  rule_slug: string;
  rule_text: string;
  category: "continuity" | "voice" | "agency" | "register" | "meta";
  surfaced_at_day: number | null;
  surfaced_at_time: string | null;
  notes: string | null;
}

export interface BitEntry {
  bit_slug: string;
  bit_text: string;
  parties: string[];
  last_used_day: number | null;
  last_used_time: string | null;
  use_count: number;
  origin_context: string | null;
}

export interface ResidencyEntry {
  character_id: string;
  location_slug: string;
  arrived_day: number;
  arrived_time: string;
  notes: string | null;
}

export interface PendingBeatEntry {
  id: string;
  beat_slug: string;
  description: string;
  earliest_day: number | null;
  earliest_time: string | null;
  latest_day: number | null;
  latest_time: string | null;
  trigger_type: "time" | "location" | "event" | "player_initiated" | null;
  trigger_detail: string | null;
  parties: string[] | null;
  notes: string | null;
  created_day: number | null;
  created_time: string | null;
}

// Shape returned by the useExtensionState hook.
export interface ExtensionState {
  commitments: CommitmentEntry[];
  agreements: AgreementEntry[];
  corrections: CorrectionEntry[];
  bits: BitEntry[];
  residency: ResidencyEntry[];
  pending: PendingBeatEntry[];
  overdue: PendingBeatEntry[];
}
