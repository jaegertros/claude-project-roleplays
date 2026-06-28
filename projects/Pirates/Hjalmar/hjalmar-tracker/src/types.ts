// types.ts — TypeScript shape of the Hjalmar tracker state.
// All values are edited manually from the panels; localStorage is the
// source of truth. There is no MCP server yet.

export type TimeOfDay =
  | "dawn"
  | "morning"
  | "afternoon"
  | "evening"
  | "dusk"
  | "twilight"
  | "night";

export type DayOfWeek =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export const TIME_ORDER: TimeOfDay[] = [
  "dawn",
  "morning",
  "afternoon",
  "evening",
  "dusk",
  "twilight",
  "night",
];

export const DAY_ORDER: DayOfWeek[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const TIME_EMOJI: Record<TimeOfDay, string> = {
  dawn: "🌅",
  morning: "🌅",
  afternoon: "☀️",
  evening: "🌇",
  dusk: "🌇",
  twilight: "🌇",
  night: "🌙",
};

export interface Money {
  reales: number;
  pieces_of_eight: number;
  doubloons: number;
}

export interface KnowledgeWallItem {
  id: string;
  text: string;
  column: "player" | "body" | "world";
  added_week: number;
  added_day: number;
  source?: string;
}

export interface IdentityLedgerEntry {
  id: string;
  fact: string;
  committed_week: number;
  committed_day: number;
  source: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  qty: number;
  notes?: string;
}

export type WoundSeverity =
  | "scratch"
  | "minor"
  | "moderate"
  | "severe"
  | "grave";

export interface Wound {
  id: string;
  location: string;
  severity: WoundSeverity;
  tended: boolean;
  acquired_week: number;
  acquired_day: number;
  notes?: string;
}

export type Relationship =
  | "unknown"
  | "stranger"
  | "acquaintance"
  | "wary"
  | "friendly"
  | "allied"
  | "hostile"
  | "sworn";

export interface NPC {
  id: string;
  name: string;
  faction_id?: string;
  present: boolean;
  relationship: Relationship;
  body_recognizes: boolean;
  mind_remembers: boolean;
  notes?: string;
}

export type FactionStanding =
  | "unknown"
  | "hostile"
  | "wary"
  | "neutral"
  | "friendly"
  | "allied"
  | "oathbound";

export interface Faction {
  id: string;
  name: string;
  short_name: string;
  player_standing: FactionStanding;
  notes?: string;
}

export type MarkId = "eyebrow_scar" | "forearm_tattoo" | "inner_thigh_scars";

export interface Mark {
  id: MarkId;
  name: string;
  description: string;
  identified: boolean;
  partial_theory?: string;
  full_truth?: string;
}

export type TheoryStatus = "open" | "confirmed" | "disproven" | "abandoned";

export interface Theory {
  id: string;
  theory: string;
  status: TheoryStatus;
  first_proposed_week: number;
  first_proposed_day: number;
  notes?: string;
}

export interface JournalEntry {
  id: string;
  week: number;
  day: number;
  time_of_day: TimeOfDay;
  entry: string;
  pertains_to?: string;
  created_at: string;
}

export interface CrewMember {
  id: string;
  name: string;
  role: string;
  share: number;
  alive: boolean;
  loyalty: number;
  notes?: string;
}

export type Fatigue = "rested" | "tired" | "spent" | "collapsing";
export type Hunger = "fed" | "peckish" | "hungry" | "starving";
export type Thirst = "slaked" | "thirsty" | "dry" | "parched";
export type Drunkenness =
  | "sober"
  | "warm"
  | "drunk"
  | "reeling"
  | "insensate";
export type Wanted = "unknown" | "no" | "rumored" | "posted" | "pursued";
export type Reputation =
  | "unknown"
  | "invisible"
  | "noticed"
  | "rumored"
  | "known"
  | "feared";

export interface StatusFlags {
  fatigue: Fatigue;
  hunger: Hunger;
  thirst: Thirst;
  drunkenness: Drunkenness;
  wanted: Wanted;
  reputation: Reputation;
}

export type DepthLevel = 0 | 1 | 2 | 3 | 4 | 5;

export interface HjalmarState {
  schema_version: "1.0";
  // Clock
  week: number;
  day: number;
  day_of_week: DayOfWeek;
  time_of_day: TimeOfDay;
  location: string;
  // Player
  player_name: string;
  ship_name: string;
  inventory: InventoryItem[];
  money: Money;
  wounds: Wound[];
  status_flags: StatusFlags;
  // Three marks
  marks: Record<MarkId, Mark>;
  // Knowledge wall
  knowledge_wall: KnowledgeWallItem[];
  identity_ledger: IdentityLedgerEntry[];
  // NPCs / factions
  npcs: NPC[];
  factions: Faction[];
  // Investigation
  depth: DepthLevel;
  theories: Theory[];
  // Journal
  journal_entries: JournalEntry[];
  // Crew
  crew: CrewMember[];
  // Meta
  last_updated: string;
  notes: string;
}
