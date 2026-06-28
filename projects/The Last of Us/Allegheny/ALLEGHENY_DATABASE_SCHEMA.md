# Allegheny — Database Support Design

Same Supabase database as Vault 83 / Shaula. Scoped via `project_id = 'allegheny'`. Designed around the actual failure modes this playthrough surfaced, not generic RP needs.

The `narrator-state` MCP already handles characters, inventory, clock, awareness, flags, missions, injuries, perceptions. **This document specifies the gaps that need new tables.**

---

## Summary of new tables

| Table | Purpose | Solves |
|---|---|---|
| `commitment_log` | Off-screen info transfers between NPCs | Observation Check enforcement; NPCs knowing things they shouldn't |
| `negotiated_agreements` | Versioned record of standing agreements w/ NPCs | Maya's renegotiated hard line; Ruthie's Barolo terms; polyam terms |
| `narrator_corrections` | OOC calibrations + standing rules from play | Henry/Theresa-not-Spanish; don't-decide-for-Caleb; userPreferences-disabled |
| `recurring_bits` | Running gags, catchphrases, in-jokes | Sombra Blanca, "and my axe," "baby," Buster's catchphrases |
| `residency_map` | Building/location occupancy w/ per-floor structure | 23 people across 4 apartments tracking; who-is-where |
| `pending_beats` | Time-pinned in-fiction commitments waiting to land | Mark's mom ETA; Henry will-tell-after-dinner; Theresa convo parked |
| `caleb_journal` (optional) | Caleb's in-fiction pocket journal | If we want the Vault-83-style journal mechanic |

---

## 1. `commitment_log` — the Observation Check enforcement layer

**Problem this solves.** The PROJECT_INSTRUCTIONS already specifies the Observation Check ("was this NPC present, or did Caleb tell them") and references a Commitment Log. That log doesn't exist as a table yet — the narrator commits transfers in prose and hopes they're remembered. This is the single highest-ROI table.

```sql
CREATE TABLE commitment_log (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id      text NOT NULL,           -- 'allegheny'
  playthrough_id  uuid NOT NULL,
  from_character  text NOT NULL,           -- character_id or 'OBSERVATION' or 'PLAYER'
  to_character    text NOT NULL,           -- character_id; multi-recipient = multiple rows
  topic           text NOT NULL,           -- slug, e.g. 'daniel_buchanan_kill', 'maya_priya_polyam_terms'
  scope           text NOT NULL,           -- 'full' | 'partial' | 'rumor' | 'wrong_version'
  story_day       int NOT NULL,
  story_time      text NOT NULL,
  notes           text,                    -- one-line context
  source_event    text,                    -- if from another commit, what event
  created_at      timestamptz DEFAULT now()
);

CREATE INDEX idx_commitlog_to_topic ON commitment_log(to_character, topic);
CREATE INDEX idx_commitlog_topic ON commitment_log(topic);
```

**How it gets used.**

Before any NPC speaks about an off-screen topic, the narrator runs:
```sql
SELECT scope, story_day, story_time, notes
FROM commitment_log
WHERE project_id = 'allegheny'
  AND playthrough_id = :playthrough
  AND to_character = :npc_id
  AND topic = :topic_slug;
```
If returns rows → NPC knows at the recorded scope.
If returns no rows → NPC does not know.

**Auto-commits on rendering.** When the narrator writes a scene where information transfers (Caleb tells Maya about the Marisol shower agreement; Marisol surfaces Daniel Buchanan at dinner and the whole table is now in-scope), the narrator inserts rows in the same turn — one row per (from, to, topic) tuple. Multi-recipient events (the dinner table) generate ~20 rows; cheap.

**Example rows from this playthrough that should exist:**
- `from='PLAYER', to='MAYA', topic='daniel_buchanan_kill', scope='full', day=2, time='10:33'` (apartment debrief)
- `from='PLAYER', to='MARISOL', topic='daniel_buchanan_kill', scope='full', day=2, time='~12:00'` (in the car after)
- `from='MARISOL', to='ALL_DINNER_TABLE', topic='daniel_buchanan_kill', scope='full', day=2, time='18:19'` (Marisol surfaced at dinner) — actually expands to ~20 rows, one per attendee
- `from='PLAYER', to='MAYA', topic='priya_polyam_terms_v2', scope='full', day=2, time='16:42'` (shower)
- `from='OBSERVATION', to='HECTOR', topic='caleb_hugs_marisol_at_dinner', scope='full', day=2, time='18:21'`

**Why this matters.** The narrator slipped earlier in the playthrough on what NPCs knew. This makes it impossible to slip — the SELECT is cheap and the answer is binary.

---

## 2. `negotiated_agreements` — versioned standing terms

**Problem this solves.** Maya negotiated polyam terms at 08:14 Day 2 (hard line: "no Caleb-Priya intimate touch without me"). At 16:42 she renegotiated upward. The original is **stale** but lives in the chat record. The narrator could easily reference the wrong version in a future turn. Same shape for Ruthie's Barolo deal, the Pham house plan, the Sombra Blanca tariff schedule.

```sql
CREATE TABLE negotiated_agreements (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id      text NOT NULL,
  playthrough_id  uuid NOT NULL,
  agreement_slug  text NOT NULL,           -- 'maya_polyam_terms', 'ruthie_barolo_pact', 'pham_house_plan'
  version         int NOT NULL DEFAULT 1,
  parties         text[] NOT NULL,         -- character_ids involved
  status          text NOT NULL,           -- 'active' | 'superseded' | 'broken' | 'fulfilled'
  terms           text NOT NULL,           -- the actual terms, narrator's voice
  story_day       int NOT NULL,
  story_time      text NOT NULL,
  superseded_by   uuid REFERENCES negotiated_agreements(id),
  notes           text,
  created_at      timestamptz DEFAULT now()
);

CREATE UNIQUE INDEX idx_agreement_active ON negotiated_agreements(playthrough_id, agreement_slug)
  WHERE status = 'active';
```

**How it gets used.**

Before any scene that touches a standing agreement (the bedroom-three setup, Ruthie's wine, the 212 plan):
```sql
SELECT terms, story_day, story_time, version, notes
FROM negotiated_agreements
WHERE playthrough_id = :pt AND agreement_slug = :slug AND status = 'active';
```

When an agreement is renegotiated, the old row goes to `status='superseded'`, `superseded_by = new_id`. Audit trail is preserved.

**Existing agreements that should be rows:**
- `maya_polyam_terms` v1 (Day 2 08:14, superseded) + v2 (Day 2 16:42, active) — the renegotiated version
- `ruthie_barolo_pact` (Day 2 16:32, active) — 8 Barolos, one glass shared each time, toast Phil+Daniel, get up next day to try
- `pham_house_plan` (Day 2 16:55, active w/ open clause for Henry+Theresa stay-or-move decision)
- `sombra_blanca_tariffs` (running gag, active) — $17 Sophie, $1000 Ace, $300 pho
- `biscuit_alert_protocol` (Day 2 18:27, active) — ears up + look + boof + head-to-door = alarm

---

## 3. `narrator_corrections` — standing OOC calibrations

**Problem this solves.** Calibrations like "Henry+Theresa are Vietnamese-American, never Spanish" and "don't decide for Caleb what he takes from bodies" and "userPreferences ask-clarifying-questions doesn't apply" emerge through play and are essential to honor — but they live in the chat record and get lost on session boundaries. The compaction summary catches them but not durably.

```sql
CREATE TABLE narrator_corrections (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id      text NOT NULL,
  playthrough_id  uuid,                    -- nullable: if NULL, applies to all playthroughs of project
  rule_slug       text NOT NULL,           -- 'pham_no_spanish', 'no_decisions_for_caleb', 'marisol_flirty_register'
  rule_text       text NOT NULL,           -- the rule, narrator's voice
  category        text NOT NULL,           -- 'continuity' | 'voice' | 'agency' | 'register' | 'meta'
  surfaced_at_day int,
  surfaced_at_time text,
  active          boolean NOT NULL DEFAULT true,
  notes           text,
  created_at      timestamptz DEFAULT now()
);

CREATE INDEX idx_corrections_active ON narrator_corrections(project_id, playthrough_id, active);
```

**How it gets used.**

At session start, after `start_session`:
```sql
SELECT rule_slug, rule_text, category
FROM narrator_corrections
WHERE project_id = 'allegheny'
  AND (playthrough_id = :pt OR playthrough_id IS NULL)
  AND active = true
ORDER BY category, surfaced_at_day;
```
Narrator reads these into context. **These are equal in authority to the system prompt for this playthrough.**

**Rules that should be rows from this playthrough:**
- `pham_no_spanish` — Henry+Theresa Vietnamese-American; never Spanish
- `no_decisions_for_caleb` — sub-tactical choices, body/car loot, interior reasoning all belong to player
- `no_moralize_caleb` — narrator does not editorialize on katana/kills/heists/polyam
- `name_continuity_errors` — surface mistakes in one OOC line, revert, continue; 1-retcon-per-session disabled
- `userPreferences_disabled` — "Ask clarifying questions" preference does not apply to this RP
- `marisol_flirty_register` — Marisol stays in established flirty register; not a consent-counselor mid-scene
- `run_beat_then_stop` — don't chain into next action or skip ahead
- `caleb_takes_everything_from_bodies` — player decides what to leave from cars, but takes all from bodies

---

## 4. `recurring_bits` — the catchphrase ledger

**Problem this solves.** Running gags, in-jokes, and catchphrases accumulate across days ("Sombra Blanca," "and my axe," "baby," "Pendejo te amo," Buster's "goddammit Phil!" and "good morning Mr. Soto!"). The narrator has to remember them from context. Compaction strips the texture. A bit that lived for 30 hours of play can quietly die because the narrator forgot it after a session boundary.

```sql
CREATE TABLE recurring_bits (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id      text NOT NULL,
  playthrough_id  uuid NOT NULL,
  bit_slug        text NOT NULL,
  bit_text        text NOT NULL,           -- the gag itself
  origin_day      int,
  origin_time     text,
  origin_context  text,                    -- "Hector named Caleb this when..."
  parties         text[],                  -- character_ids who use/share it
  last_used_day   int,
  last_used_time  text,
  use_count       int DEFAULT 1,
  status          text DEFAULT 'active',   -- 'active' | 'dormant' | 'retired'
  notes           text
);

CREATE INDEX idx_bits_active ON recurring_bits(playthrough_id, status);
```

**Bits that should be rows:**
- `sombra_blanca` — Hector's name for Caleb, w/ inscrutable tariff schedule
- `and_my_axe` — Marisol's oath / mission-joining phrase
- `hermano_hermana` — Caleb+Marisol mutual address
- `baby_maya_caleb` — Maya's address for Caleb (Day 1 night onward)
- `baby_maya_priya` — Maya's address for Priya (Day 2 morning, the "self-information")
- `pendejo_te_amo` — Marisol's whisper into Caleb's collar after the dinner reckoning
- `buster_phil` — "goddammit, Phil!"
- `buster_soto` — "good morning Mr. Soto!" (12-yr-old Hector echo)
- `bad_boys_karate` — the Mike+Caleb black-belt joke
- `tau_delta_2017` — Mike's wine-bottle narrative anchor for Caleb+Maya
- `emma_curtsy` — hand-kiss-and-curtsy w/ 6-yr-old Emma
- `pulse_check_ruthie` — the gag
- `anthony_joseph` — Linda's full-government-name move on Tony

---

## 5. `residency_map` — building/location occupancy

**Problem this solves.** 23 people across 4 apartments. Narrator has to hold who-lives-where, who-was-last-where, who-drifted-off-camera. Greg disappeared for 7 hours of story time. The MCP `update_character` has a `present` boolean but not a *location* field with floor granularity.

```sql
CREATE TABLE residency_map (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id      text NOT NULL,
  playthrough_id  uuid NOT NULL,
  character_id    text NOT NULL,
  location_slug   text NOT NULL,           -- '213_butler_3F_L', '212_butler', '213_butler_1F_R'
  arrived_day     int NOT NULL,
  arrived_time    text NOT NULL,
  departed_day    int,
  departed_time   text,
  status          text NOT NULL,           -- 'current' | 'past' | 'planned'
  notes           text                     -- "sleeping on couch", "outside on porch watch"
);

CREATE INDEX idx_residency_current ON residency_map(playthrough_id, location_slug)
  WHERE status = 'current';
CREATE INDEX idx_residency_char ON residency_map(playthrough_id, character_id, status);
```

**Query patterns.**

"Who is currently at 213 Butler 3F-L?"
```sql
SELECT character_id, notes
FROM residency_map
WHERE playthrough_id = :pt
  AND location_slug = '213_butler_3F_L'
  AND status = 'current';
```

"Where was Greg last seen?"
```sql
SELECT location_slug, arrived_day, arrived_time, notes
FROM residency_map
WHERE playthrough_id = :pt
  AND character_id = 'GREG'
ORDER BY arrived_day DESC, arrived_time DESC
LIMIT 1;
```

The narrator runs the "who's currently here" query before composing a scene at a known location. If a character should plausibly be present but their last-known is elsewhere, surface them lightly per the ambient-continuity rule. If they're in another apartment of the same building, easy beat. If they're missing entirely, surface that explicitly.

---

## 6. `pending_beats` — time-pinned in-fiction commitments

**Problem this solves.** Mark's mom is on I-79 S, ETA 18:00–18:30. Henry will tell Caleb the stay-or-move decision after dinner. Theresa conversation parked. The Facebook post is still live. These are *story commitments* the narrator has made and is responsible for landing. They live in scattered Tracker notes and the narrator's working memory.

```sql
CREATE TABLE pending_beats (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id      text NOT NULL,
  playthrough_id  uuid NOT NULL,
  beat_slug       text NOT NULL,           -- 'mark_mom_arrives', 'henry_decides', 'theresa_convo'
  description     text NOT NULL,
  earliest_day    int,
  earliest_time   text,
  latest_day      int,
  latest_time     text,
  trigger_type    text,                    -- 'time' | 'location' | 'event' | 'player_initiated'
  trigger_detail  text,                    -- specifics for non-time triggers
  status          text NOT NULL,           -- 'pending' | 'landed' | 'cancelled' | 'overdue'
  parties         text[],                  -- who's involved
  notes           text,
  created_day     int,
  created_time    text,
  landed_day      int,
  landed_time     text
);

CREATE INDEX idx_pending_active ON pending_beats(playthrough_id, status);
```

**How it gets used.**

At every turn end after state writes, narrator runs:
```sql
SELECT beat_slug, description, latest_day, latest_time
FROM pending_beats
WHERE playthrough_id = :pt
  AND status = 'pending'
  AND (latest_day < :current_day
    OR (latest_day = :current_day AND latest_time < :current_time));
```
Anything returned is **overdue** — a story commitment that should have landed by now. The narrator either lands it on the next available beat or surfaces in OOC that it's slipping.

**Beats currently pending in this playthrough:**
- `mark_mom_arrives` (ETA 18:00–18:30 Day 2; currently overdue at 18:48)
- `henry_pham_decides` (after dinner Day 2; parked)
- `theresa_pham_convo` (Caleb hasn't gone to ask her directly; parked)
- `power_drop_registered` (grid dropped 17:30–18:00 Day 2; no character has noted it yet in scene)
- `facebook_post_consequences` (Day 2 13:00 post still live; future-record implication)
- `aarav_ratna_silent_check` (Jakarta silent since Day 1 15:14)
- `maya_father_call` (pending)
- `maya_aunt_call` (pending)
- `212_butler_first_light` (Day 3 dawn; window-board work w/ Robbie+Mike+Schmidt)
- `bedroom_three_conversation` (post-kegger Day 2, "by midnight")

---

## 7. `caleb_journal` — optional, the Vault-83 mechanic adapted

**If we want this.** Vault 83 has Caleb keeping a Liaison's pocket notebook with `[journal - write]` bracket commands. For Allegheny, an equivalent makes sense: Caleb keeping a microbiologist's field notebook on the outbreak as he learns about it, plus people-observations.

```sql
CREATE TABLE caleb_journal (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id      text NOT NULL DEFAULT 'allegheny',
  playthrough_id  uuid NOT NULL,
  story_day       int NOT NULL,
  story_time      text NOT NULL,
  entry           text NOT NULL,
  category        text,                    -- 'observation' | 'oddity' | 'biology' | 'people' | 'tactical'
  pertains_to     text,                    -- character_id or topic slug
  created_at      timestamptz DEFAULT now()
);
```

Same bracket-command UX as Vault 83 (`[journal - write]`, `[journal - Monday]`, `[journal - Marisol]`). **Especially useful for Allegheny because Caleb is a microbiologist** — his biology observations on bites, on the dispersal pattern of UPMC Children's ER chaos, on the rumored Indonesia origin — these accumulate and matter for AWARENESS-gated late-game content.

Lower priority than 1-6.

---

## Migration plan

In rough priority order:

1. **`commitment_log`** — highest ROI, directly enforces the Observation Check that's already in the prompt
2. **`negotiated_agreements`** — Maya's renegotiated terms are stale-and-dangerous right now
3. **`narrator_corrections`** — durable home for the calibrations that currently live only in the chat record
4. **`residency_map`** — solves the 23-person tracking problem before it becomes 30 people in the QZ
5. **`pending_beats`** — catches drifted commitments (Mark's mom is already overdue)
6. **`recurring_bits`** — texture preservation across compactions
7. **`caleb_journal`** — optional, low priority

Schema migrations can land 1–3 immediately. 4–5 are higher complexity but solve concrete observed problems. 6 is a nice-to-have. 7 is opt-in.

---

## MCP tool additions

Each table needs corresponding `narrator-state` MCP tools so the narrator can call them without writing SQL:

| Table | Tools |
|---|---|
| `commitment_log` | `commit_knowledge_transfer(from, to, topic, scope, notes)`; `check_knowledge(character_id, topic)` |
| `negotiated_agreements` | `record_agreement(slug, parties, terms)`; `supersede_agreement(slug, new_terms)`; `get_agreement(slug)` |
| `narrator_corrections` | `add_correction(slug, rule_text, category)`; `list_active_corrections()` |
| `recurring_bits` | `log_bit(slug, text, parties)`; `bump_bit(slug)`; `list_active_bits()` |
| `residency_map` | `place_character(char_id, location, time)`; `move_character(char_id, new_location)`; `who_is_at(location)` |
| `pending_beats` | `add_pending_beat(slug, desc, latest_day, latest_time, parties)`; `land_beat(slug)`; `list_overdue_beats()` |

The auto-loader on `start_session` should pull active corrections, active agreements, current residency, and overdue beats into the narrator's first-turn context.

---

## What this prevents going forward

- **Maya saying a stale rule out loud** — the 16:42 version is what's active; the 08:14 version is `superseded`
- **Henry speaking Spanish** — `pham_no_spanish` is in `narrator_corrections`, loaded at session start
- **Greg vanishing for 7 hours** — `residency_map` shows his last known is 3F-L kegger at 18:30; if 19:00 comes and he's not there, the narrator can place him organically
- **Mark's mom drifting past her ETA window** — `pending_beats` returns overdue at the first turn past 18:30
- **An NPC at the kegger somehow not knowing about the Daniel Buchanan kill 30 minutes after Marisol surfaced it** — `commitment_log` has 20 rows from that dinner moment
- **The narrator forgetting "and my axe" by Week 2** — `recurring_bits` keeps it live

All scoped per-playthrough. New chats in the same project inherit. Different replays of Allegheny get fresh playthrough IDs and clean slates.
