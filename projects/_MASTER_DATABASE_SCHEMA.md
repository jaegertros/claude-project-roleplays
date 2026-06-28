# Master Supabase Schema — Multi-Project Narrator State (v1.1)

> **v1.1 — reconciled with the live `vaultbank` Supabase project on 2026-05-19.** The v1.0 draft was based on the Allegheny SQL file alone and undercounted the live database; this revision reflects what's actually deployed.

A single Supabase database (`vaultbank` / project ref `jqrvdyyulimjhkyaxnip`) backs every roleplay project in this repo. Five packages currently use it: **vault49, vault83, shaula, marauders, allegheny**. Everything is scoped by `project_id` so a single connection serves all of them.

Companion SQL: [`_master_schema.sql`](_master_schema.sql).

---

## 1. The 17 live tables, grouped by concern

```
Foundation
├─ projects                       4 rows  — registry (id, name, created_at)
└─ playthroughs                   6 rows  — runs, with Marauders-specific extras

Commitments (two parallel implementations)
├─ commitments                  307 rows  — OG simpler shape: vault49/83, shaula, marauders
└─ commitment_log                29 rows  — Allegheny's richer version with scope enum

Investigation arc
└─ theories                      23 rows  — shaula (19) + vault49/83 (2 each)

In-fiction artifacts
├─ journal_entries                3 rows  — vault83
└─ correspondence                 6 rows  — marauders (letters in/out)

Propagating war timeline (marauders)
├─ world_events                  19 rows  — canon vs campaign-local
├─ event_effects                  0 rows  — npc/location/news effects from a world_event
└─ user_observations              0 rows  — when the player witnessed an effect

Per-character data
├─ character_profiles            39 rows  — marauders; rich Big-Five / mask / voice schema
└─ recurring_minor_npcs          19 rows  — marauders; minor-NPC tracking

Allegheny's 5 net-new extension tables
├─ negotiated_agreements          1 row   — versioned standing terms
├─ narrator_corrections           3 rows  — OOC calibrations
├─ recurring_bits                15 rows  — running gags / catchphrases
├─ residency_map                 30 rows  — character location with sub-floor granularity
└─ pending_beats                 15 rows  — time-pinned in-fiction commitments
```

There is **no `sessions` table, no `narrator_state` JSONB table, and no `player_journal` table** in the live DB (the v1.0 doc anticipated these; they're not deployed). The local narrator-state JSON file remains the source of truth for runtime state; only event/extension data lives in Supabase.

---

## 2. What each project uses

| Table | vault49 | vault83 | shaula | marauders | allegheny |
|---|---|---|---|---|---|
| `commitments`            | 69  | 77  | 101 | 60  | —   |
| `commitment_log`         | —   | —   | —   | —   | 29  |
| `theories`               | 2   | 2   | 19  | —   | —   |
| `journal_entries`        | —   | 3   | —   | —   | —   |
| `correspondence`         | —   | —   | —   | 6   | —   |
| `world_events`           | —   | —   | —   | 19  | —   |
| `event_effects`          | —   | —   | —   | 0   | —   |
| `user_observations`      | —   | —   | —   | 0   | —   |
| `character_profiles`     | —   | —   | —   | 39  | —   |
| `recurring_minor_npcs`   | —   | —   | —   | 19  | —   |
| `negotiated_agreements`  | —   | —   | —   | —   | 1   |
| `narrator_corrections`   | —   | —   | —   | —   | 3   |
| `recurring_bits`         | —   | —   | —   | —   | 15  |
| `residency_map`          | —   | —   | —   | —   | 30  |
| `pending_beats`          | —   | —   | —   | —   | 15  |

**Patterns:**
- **`commitments` is the shared OG truth store** for off-screen information transfer. Four projects use it; Allegheny went its own way with `commitment_log`.
- **Marauders is the heaviest user of the database** — it's the only project using the world-events propagation stack, the rich character-profiles schema, the minor-NPC tracker, and the correspondence ledger.
- **Allegheny is the second-heaviest** — it added the entire OOC calibration / agreement / residency / pending-beats stack.
- **Shaula uses commitments heavily and is the dominant user of theories** (investigation arc).
- **Hohenwald, Perseus, Perdition are not in the database at all** — they're tracker-artifact-only projects.

---

## 3. The two commitments tables — why both exist

| | `commitments` | `commitment_log` |
|---|---|---|
| Used by | vault49, vault83, shaula, marauders | allegheny |
| `from` field | implicit (assumed observation) | explicit `from_character` |
| Topic field | `fact` (free-text) | `topic` (slug) |
| Scope enum | `'playthrough'\|'project'` | `'full'\|'partial'\|'rumor'\|'wrong_version'` |
| Time fields | `in_game_day`, `in_game_time`, `in_game_date` | `story_day`, `story_time` |
| Stakes | `'normal'\|'high'` | — |

The shapes serve different intents: `commitments` is "what was said in scene, and at what stakes." `commitment_log` is "who told whom what, and with what fidelity." Allegheny's version enforces the **Observation Check** discipline (NPCs only know what they witnessed or were told); the older `commitments` table is more of a fact-anchoring store.

A future migration could consolidate them. For now, both coexist — projects opt into whichever fits.

---

## 4. Conventions used across every table

- **`project_id text NOT NULL REFERENCES projects(id)`** — the project slug. Five canonical values: `vault49`, `vault83`, `shaula`, `marauders`, `allegheny`.
- **`playthrough_id uuid REFERENCES playthroughs(id)`** — the run. Nullable in some tables to allow project-scope rows (e.g., a project-canonical `world_event` applies to every playthrough).
- **In-fiction time** is stored two ways depending on the table:
  - `story_day int + story_time text` — Allegheny convention (`'15:30'`)
  - `in_game_day int + in_game_time text + in_game_date date` — Vault49/83/Shaula/Marauders convention (the `_date` field lets queries sort chronologically across long campaigns)
- **`character_key` / `character_id`** — snake_case slug matching the per-character file in `modular-full/Cast/` (e.g., `BRIGGS`, `MAYA`, `AANYA`).
- **`scope`** — recurring enum meaning *"how broadly does this row apply"*:
  - In `commitments`, `character_profiles`, `recurring_minor_npcs`: `'project' | 'playthrough'`
  - In `commitment_log`: `'full' | 'partial' | 'rumor' | 'wrong_version'` (different concept; fidelity of the transfer)
- **Status enums** are table-specific; see the SQL for the full check constraints.
- **Created/updated timestamps** are real wall-clock; the `in_game_*` / `story_*` fields are in-fiction.

---

## 5. Foundation tables

### `projects`

```sql
CREATE TABLE projects (
  id          text PRIMARY KEY,
  name        text NOT NULL,
  created_at  timestamptz NOT NULL DEFAULT now()
);
```

Just `(id, name, created_at)` — no franchise, no package_path. Five rows currently seeded.

### `playthroughs`

```sql
CREATE TABLE playthroughs (
  id                    uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id            text NOT NULL REFERENCES projects(id),
  label                 text NOT NULL,
  character_name        text,
  started_at            timestamptz DEFAULT now(),
  ended_at              timestamptz,
  status                text NOT NULL DEFAULT 'active'
                          CHECK (status IN ('active','completed','abandoned')),
  notes                 text,
  -- Marauders-specific (nullable for other projects):
  vantage               text CHECK (vantage IS NULL OR vantage IN ('student','order','ministry','civilian')),
  campaign_start_date   date,
  local_secret_alt      text CHECK (local_secret_alt IS NULL OR local_secret_alt IN ('A_owen','B_marcus','C_ferenc','custom')),
  inherited_secret      text
);
```

The four Marauders-specific columns (`vantage`, `campaign_start_date`, `local_secret_alt`, `inherited_secret`) live in the shared table rather than a project-specific extension. Other projects leave them NULL.

---

## 6. Commitments — the OG shape

```sql
CREATE TABLE commitments (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id      text NOT NULL REFERENCES projects(id),
  playthrough_id  uuid REFERENCES playthroughs(id),
  scope           text NOT NULL DEFAULT 'playthrough'
                    CHECK (scope IN ('playthrough','project')),
  in_game_day     int,
  in_game_time    text,
  in_game_date    date,
  npc             text,
  fact            text NOT NULL,
  stakes          text NOT NULL DEFAULT 'normal'
                    CHECK (stakes IN ('normal','high')),
  created_at      timestamptz NOT NULL DEFAULT now()
);
```

Used by every project except Allegheny. The "what was committed to in scene" store — facts the narrator anchored that have to remain true going forward. 307 rows live.

---

## 7. Theories — investigation arc

```sql
CREATE TABLE theories (
  id                     uuid PRIMARY KEY,
  project_id             text NOT NULL REFERENCES projects(id),
  playthrough_id         uuid REFERENCES playthroughs(id),
  theory                 text NOT NULL,
  classification         text CHECK (classification IN (
                            'correct_confirmable','correct_inaccessible',
                            'wrong_counter_evidence','wrong_not_rulable','out_of_frame')),
  reasoning              text,
  relevant_npc           text,
  first_proposed_day     int,
  first_proposed_time    text,
  first_proposed_date    date,
  status                 text DEFAULT 'open'
                           CHECK (status IN ('open','confirmed_in_world','disproven_in_world','abandoned')),
  notes                  text,
  created_at             timestamptz DEFAULT now(),
  updated_at             timestamptz DEFAULT now()
);
```

Player-proposed theories with a classification that says how they relate to the substrate truth. Dominant user: Shaula (19 rows, since the whole project is an investigation).

The **classification** is the narrator's secret read on the theory — `correct_confirmable` means the player is right and can find evidence; `correct_inaccessible` means right but the evidence is gone or sealed; `wrong_counter_evidence` means actively contradicted by the world; `wrong_not_rulable` means wrong but unfalsifiable; `out_of_frame` means the theory misunderstands the scope of the substrate. **Status** is the public-facing in-fiction state.

---

## 8. Journal entries (Vault 83) and correspondence (Marauders)

### `journal_entries`

```sql
CREATE TABLE journal_entries (
  id                  uuid PRIMARY KEY,
  project_id          text NOT NULL REFERENCES projects(id),
  playthrough_id      uuid NOT NULL REFERENCES playthroughs(id),
  in_game_day         int NOT NULL CHECK (in_game_day BETWEEN 1 AND 7),
  day_of_week         text NOT NULL,
  in_game_time        text NOT NULL,
  entry               text NOT NULL,
  delivery_from       text,
  pertains_to         text,
  note_type           text DEFAULT 'observation',
  created_at          timestamptz DEFAULT now()
);
```

The Vault 83 Liaison's pocket notebook mechanic. Constrained to 7-day campaign arcs (the `BETWEEN 1 AND 7` check).

### `correspondence`

```sql
CREATE TABLE correspondence (
  id                          uuid PRIMARY KEY,
  project_id                  text NOT NULL REFERENCES projects(id),
  playthrough_id              uuid NOT NULL REFERENCES playthroughs(id),
  in_game_date                date NOT NULL,
  in_game_time                text,
  kind                        text CHECK (kind IN ('letter_in','letter_out','journal')),
  sender                      text,
  recipient                   text,
  content                     text NOT NULL,
  location_written            text,
  pertains_to                 text,
  note_type                   text DEFAULT 'mundane' CHECK (note_type IN ('mundane','oddity')),
  direction                   text CHECK (direction IN ('sent_to','received_from')),
  delivery_method             text,
  status                      text DEFAULT 'sent'
                                CHECK (status IN ('sent','in_transit','delivered','replied',
                                                  'unanswered','overdue','rejected','lost')),
  expected_reply_window_days  int,
  summary                     text,
  character_key               text,
  created_at                  timestamptz DEFAULT now()
);
```

Marauders-specific letters and journal entries. Tracks delivery state (an owl can be intercepted), expected reply windows for nagging overdue correspondence into pending-beat territory, and a `note_type` that flags supernatural / impossible content as `'oddity'`.

---

## 9. The world-events propagation stack (Marauders)

Three tables modeling how a war event in the world propagates to NPC behavior changes that the player may or may not witness.

```
world_events  ──▶  event_effects  ──▶  user_observations
(canon or       (npc unavailable,  (when/how/where the
 campaign-local  location closed,   player saw the effect)
 timeline)       news surfaced,
                 etc.)
```

### `world_events`

```sql
CREATE TABLE world_events (
  id                  uuid PRIMARY KEY,
  project_id          text NOT NULL REFERENCES projects(id),
  playthrough_id      uuid REFERENCES playthroughs(id),    -- NULL = project-canonical
  event_date          date NOT NULL,
  event_time          text,
  location            text,
  severity            text CHECK (severity IN ('minor','notable','major','catastrophic')),
  source              text CHECK (source IN ('canon','campaign_local')),
  canonical_event_id  text,
  description         text NOT NULL,
  created_at          timestamptz DEFAULT now()
);
```

`playthrough_id IS NULL` flags a canonical event that applies to every playthrough of the project (e.g., "Voldemort attacks the Bones family, October 1979"). Non-null = a campaign-local event specific to one run.

### `event_effects`

```sql
CREATE TABLE event_effects (
  id                  uuid PRIMARY KEY,
  project_id          text NOT NULL REFERENCES projects(id),
  playthrough_id      uuid NOT NULL REFERENCES playthroughs(id),
  world_event_id      uuid NOT NULL REFERENCES world_events(id),
  effect_type         text CHECK (effect_type IN (
                        'npc_unavailable','npc_grief','npc_changed_behavior',
                        'location_closed','location_changed',
                        'news_surfaced','npc_referenced')),
  affected_npc        text,
  affected_location   text,
  surfacing_channel   text CHECK (surfacing_channel IS NULL OR surfacing_channel IN (
                        'daily_prophet','letter_from_X','gossip_at_Y','floo_call',
                        'patronus_message','direct_witness','staff_announcement',
                        'ministry_memo','npc_disclosure')),
  surfaced_at_date    date,
  witnessed_by_user   boolean DEFAULT false,
  notes               text,
  active              boolean DEFAULT true,
  created_at          timestamptz DEFAULT now()
);
```

Each `world_event` can spawn multiple `event_effects` — Voldemort attacking the Bones family produces: Edgar Bones unavailable; Susan/Mark NPCs in grief; *Daily Prophet* surfaces it as `news_surfaced`; Amelia Bones changes behavior; etc.

### `user_observations`

```sql
CREATE TABLE user_observations (
  id                    uuid PRIMARY KEY,
  project_id            text NOT NULL REFERENCES projects(id),
  playthrough_id        uuid NOT NULL REFERENCES playthroughs(id),
  event_effect_id       uuid NOT NULL REFERENCES event_effects(id),
  observed_at_date      date NOT NULL,
  observed_at_time      text,
  observed_via          text,
  observed_at_location  text,
  emotional_register    text,
  user_response         text,
  notes                 text,
  created_at            timestamptz DEFAULT now()
);
```

When the player witnessed a specific effect — both *that* they saw it and *how* they responded. Empty in the live DB (effects haven't been observed yet, or aren't being logged this way yet).

---

## 10. `character_profiles` — the Big-Five sheet (Marauders)

The realization of the `CHARACTER_SCHEMA_*.md` design as a queryable database row. 39 rows live, all for marauders. Columns grouped:

- **Identity**: `display_name`, `age`, `role_in_story`, `social_position`, `public_reputation`, `private_reality`, `core_concept`
- **Personality models**: `big_five jsonb`, `temperament_summary`, `mbti_or_archetype`, `enneagram_or_core_fear`
- **Wants/fears/lies/wounds**: `external_want`, `internal_need`, `core_fear`, `core_desire`, `central_lie`, `emotional_wound`, `protective_strategy`, `contradiction`
- **Values and lines**: `core_values jsonb`, `hard_boundaries jsonb`, `soft_boundaries jsonb`, `temptations jsonb`, `moral_blind_spots jsonb`, `lines_never_cross jsonb`, `lines_might_cross jsonb`
- **Mask / private self**: `public_mask`, `private_self`, `what_they_hide`, `what_they_overperform`, `what_leaks_under_stress`, `what_ashamed_of`, `what_they_want_noticed`
- **Behavioral**: `pressure_behavior jsonb`, `relationship_behavior jsonb`
- **Voice**: `voice_summary`, `sentence_length`, `vocabulary`, `humor_style`, `emotional_directness`, `common_phrases jsonb`, `rarely_says jsonb`, `body_language`
- **Mechanics**: `how_they_lie`, `how_they_apologize`, `how_they_flirt`, `how_they_argue`, `things_to_remember jsonb`, `things_misinterpret jsonb`, `recurring_concerns jsonb`
- **Runtime state**: `state_variables jsonb`, `npc_perception_of_user jsonb`, `example_exchanges jsonb`

`scope = 'project'` rows are character templates that apply across every playthrough; `scope = 'playthrough'` rows are per-run state overrides.

---

## 11. `recurring_minor_npcs` (Marauders)

```sql
CREATE TABLE recurring_minor_npcs (
  id                        uuid PRIMARY KEY,
  project_id                text NOT NULL REFERENCES projects(id),
  playthrough_id            uuid REFERENCES playthroughs(id),
  scope                     text CHECK (scope IN ('project','playthrough')),
  character_key             text NOT NULL,
  display_name              text NOT NULL,
  primary_location          text,
  where_met                 text,
  when_met                  date,
  one_line                  text NOT NULL,
  caleb_owes                boolean DEFAULT false,
  they_owe_caleb            boolean DEFAULT false,
  pull_strength_seek        int CHECK (pull_strength_seek BETWEEN 1 AND 10),
  pull_strength_seek_caleb  int CHECK (pull_strength_seek_caleb BETWEEN 1 AND 10),
  ambient_presence          int CHECK (ambient_presence BETWEEN 0 AND 10),
  notes                     text,
  hidden_seed               text,
  created_at                timestamptz DEFAULT now(),
  updated_at                timestamptz DEFAULT now()
);
```

The "named minors" graduation tier. Each row is a minor NPC that has crossed the **three-appearance threshold** described in Allegheny's KNOWLEDGE_1_Cast.md but hasn't earned a full `character_profiles` row yet. `pull_strength_seek` / `pull_strength_seek_caleb` quantify how likely the narrator is to bring this NPC back into scene; `caleb_owes` / `they_owe_caleb` track running debts.

---

## 12. Allegheny's 5 net-new extension tables

These were exhaustively documented in v1.0 — same shape in the live DB. Quick reminder:

| Table | Purpose | Rows |
|---|---|---|
| `commitment_log` | Observation Check enforcement (richer commitments variant) | 29 |
| `negotiated_agreements` | Versioned standing terms between parties | 1 |
| `narrator_corrections` | OOC calibrations (project-wide or per-playthrough) | 3 |
| `recurring_bits` | Running gags / catchphrases | 15 |
| `residency_map` | Per-character location with sub-floor granularity | 30 |
| `pending_beats` | Time-pinned in-fiction commitments with overdue detection | 15 |

Detailed schemas in the SQL file. The `narrator_corrections.category` enum in the live DB has **5** values (`continuity, voice, agency, register, meta`) — the v1.0 doc speculated about 7 values, but the live constraint is stricter.

---

## 13. What's not in Supabase (and why)

- **`narrator-state` runtime JSON** (clock, characters, inventory, missions, flags, memory_book) — stays in the local `~/.narrator-state/<project>.json` file. The current architecture treats Supabase as the **event/extension store**, not the runtime mirror. Cross-session continuity for runtime state relies on the local file persisting between sessions.
- **Sessions** — there's no `sessions` table. Session tracking happens inside the local JSON (`state.session.sessions[]`).
- **The tracker artifact's `window.storage`** — independent persistence layer for the React tracker; nothing flows from there to Supabase.
- **Hohenwald, Perseus, Perdition** — not in the DB. Smaller-scale or differently-architected projects.

---

## 14. Security advisory — RLS is DISABLED on every table

The Supabase MCP raised this as critical when I queried the database. With RLS off, **anyone with the project's anon key can read or modify every row** via the Supabase client libraries. This is fine for a single-user / personal workflow but is a real exposure if the anon key ever leaks.

To turn RLS on with a permissive allow-all policy (single-user safe), see the commented block at the bottom of `_master_schema.sql`. For multi-user, key policies off `auth.uid()` against a `user_id` column added to `playthroughs`.

---

## 15. Future migrations worth considering

- **Consolidate `commitments` + `commitment_log`.** Two tables solving overlapping problems. Could converge to a single richer table; would require backfilling 307 + 29 rows.
- **`sessions` table.** Currently only inside the JSON. Promoting it would let admin dashboards count sessions per playthrough, identify long-idle runs, etc.
- **Bring Hohenwald / Perseus into the DB.** Currently tracker-only; if a playthrough grows past ~30 turns, the durability arguments for `commitments` / `pending_beats` apply.
- **Indexed search over `commitments.fact`** — currently full-text; for `fact LIKE '%X%'` queries to scale, add a tsvector index.

---

## 16. How to query a specific project's state

Quick patterns useful for narrator tools and dashboards:

```sql
-- "What does NPC X currently know about topic Y?"  (Allegheny)
SELECT scope, story_day, story_time
  FROM commitment_log
 WHERE project_id = 'allegheny'
   AND playthrough_id = :pt
   AND to_character = :npc
   AND topic = :topic;

-- "What facts has the narrator anchored for this playthrough?"  (others)
SELECT in_game_date, in_game_time, npc, fact, stakes
  FROM commitments
 WHERE project_id = :proj
   AND playthrough_id = :pt
 ORDER BY in_game_date, in_game_time;

-- "What pending beats are overdue right now?"  (Allegheny)
SELECT beat_slug, description, latest_day, latest_time
  FROM pending_beats
 WHERE playthrough_id = :pt
   AND status = 'pending'
   AND (latest_day, latest_time) < (:current_day, :current_time);

-- "What does Sirius Black's character profile say his core_fear is?"  (Marauders)
SELECT display_name, core_fear, core_desire, central_lie, voice_summary
  FROM character_profiles
 WHERE project_id = 'marauders'
   AND character_key = 'SIRIUS_BLACK';

-- "What world events have happened by the current story date?"  (Marauders)
SELECT event_date, severity, source, description
  FROM world_events
 WHERE project_id = 'marauders'
   AND (playthrough_id = :pt OR playthrough_id IS NULL)
   AND event_date <= :current_date
 ORDER BY event_date;
```

---

## Appendix — diff from v1.0

| Change | Status |
|---|---|
| Add `commitments` (the simpler shared shape) | ✅ Added |
| Add `theories` | ✅ Added |
| Add `journal_entries` (live shape, replaces v1.0's `player_journal`) | ✅ Added |
| Add `correspondence` | ✅ Added |
| Add `world_events` / `event_effects` / `user_observations` | ✅ Added |
| Add `character_profiles` (the rich Big-Five schema) | ✅ Added |
| Add `recurring_minor_npcs` | ✅ Added |
| Drop `sessions` (not in live DB) | ✅ Removed |
| Drop `narrator_state` JSONB table (not in live DB) | ✅ Removed |
| Drop `player_journal` (replaced by `journal_entries`) | ✅ Removed |
| Adjust `projects` to live shape `(id, name, created_at)` | ✅ Fixed |
| Adjust `playthroughs` to include Marauders columns (vantage etc.) | ✅ Fixed |
| Adjust `narrator_corrections.category` to 5 values | ✅ Fixed |
| RLS advisory surfaced | ✅ Documented |
