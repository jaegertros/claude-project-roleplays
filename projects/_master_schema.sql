-- ============================================================================
-- Master Roleplay Database Schema v1.1
-- ============================================================================
--
-- Reflects the live `vaultbank` Supabase project (jqrvdyyulimjhkyaxnip) as
-- queried 2026-05-19. Five projects share this database, scoped by
-- project_id: vault49, vault83, shaula, marauders, allegheny.
--
-- v1.1 reconciliation:
--   - Added 9 tables that exist live but were missing from v1.0:
--       commitments, theories, journal_entries, correspondence,
--       world_events, event_effects, user_observations,
--       character_profiles, recurring_minor_npcs.
--   - Removed 3 v1.0 aspirational tables that don't exist live:
--       sessions, narrator_state (JSONB), player_journal.
--     (Local narrator-state JSON is the source of truth for runtime state;
--      only extension/event data is in Supabase.)
--   - Adjusted projects/playthroughs/narrator_corrections to live shape.
--
-- Idempotent via IF NOT EXISTS; safe to re-run against the live DB.
--
-- Companion doc: projects/_MASTER_DATABASE_SCHEMA.md
-- ============================================================================


-- ============================================================================
-- FOUNDATION — projects, playthroughs
-- ============================================================================

CREATE TABLE IF NOT EXISTS projects (
  id              text PRIMARY KEY,
  name            text NOT NULL,
  created_at      timestamptz NOT NULL DEFAULT now()
);


CREATE TABLE IF NOT EXISTS playthroughs (
  id                    uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id            text NOT NULL REFERENCES projects(id),
  label                 text NOT NULL,
  character_name        text,
  started_at            timestamptz NOT NULL DEFAULT now(),
  ended_at              timestamptz,
  status                text NOT NULL DEFAULT 'active'
                          CHECK (status IN ('active','completed','abandoned')),
  notes                 text,
  -- Marauders-specific columns; nullable for other projects.
  vantage               text CHECK (vantage IS NULL OR vantage IN ('student','order','ministry','civilian')),
  campaign_start_date   date,
  local_secret_alt      text CHECK (local_secret_alt IS NULL OR local_secret_alt IN ('A_owen','B_marcus','C_ferenc','custom')),
  inherited_secret      text
);


-- ============================================================================
-- COMMITMENTS — the OG simpler shape (used by vault49, vault83, shaula, marauders)
-- ============================================================================
-- Note: Allegheny uses commitment_log instead (richer columns). Both coexist.

CREATE TABLE IF NOT EXISTS commitments (
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


-- ============================================================================
-- THEORIES — investigation-arc tracking (shaula, vault49, vault83)
-- ============================================================================

CREATE TABLE IF NOT EXISTS theories (
  id                     uuid PRIMARY KEY DEFAULT gen_random_uuid(),
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
  status                 text NOT NULL DEFAULT 'open'
                           CHECK (status IN ('open','confirmed_in_world','disproven_in_world','abandoned')),
  notes                  text,
  created_at             timestamptz NOT NULL DEFAULT now(),
  updated_at             timestamptz NOT NULL DEFAULT now()
);


-- ============================================================================
-- JOURNAL_ENTRIES — in-fiction notebook (vault83; opt-in elsewhere)
-- ============================================================================

CREATE TABLE IF NOT EXISTS journal_entries (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id          text NOT NULL REFERENCES projects(id),
  playthrough_id      uuid NOT NULL REFERENCES playthroughs(id),
  in_game_day         int NOT NULL CHECK (in_game_day BETWEEN 1 AND 7),
  day_of_week         text NOT NULL,
  in_game_time        text NOT NULL,
  entry               text NOT NULL,
  delivery_from       text,
  pertains_to         text,
  note_type           text DEFAULT 'observation',
  created_at          timestamptz NOT NULL DEFAULT now()
);


-- ============================================================================
-- CORRESPONDENCE — letters in/out (marauders; potentially others)
-- ============================================================================

CREATE TABLE IF NOT EXISTS correspondence (
  id                          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id                  text NOT NULL REFERENCES projects(id),
  playthrough_id              uuid NOT NULL REFERENCES playthroughs(id),
  in_game_date                date NOT NULL,
  in_game_time                text,
  kind                        text NOT NULL
                                CHECK (kind IN ('letter_in','letter_out','journal')),
  sender                      text,
  recipient                   text,
  content                     text NOT NULL,
  location_written            text,
  pertains_to                 text,
  note_type                   text DEFAULT 'mundane'
                                CHECK (note_type IN ('mundane','oddity')),
  direction                   text CHECK (direction IN ('sent_to','received_from')),
  delivery_method             text,
  status                      text DEFAULT 'sent'
                                CHECK (status IN ('sent','in_transit','delivered','replied',
                                                  'unanswered','overdue','rejected','lost')),
  expected_reply_window_days  int,
  summary                     text,
  character_key               text,
  created_at                  timestamptz NOT NULL DEFAULT now()
);


-- ============================================================================
-- WORLD_EVENTS / EVENT_EFFECTS / USER_OBSERVATIONS — propagating war timeline
-- (marauders; the canon-vs-campaign-local event tracker)
-- ============================================================================

CREATE TABLE IF NOT EXISTS world_events (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id          text NOT NULL REFERENCES projects(id),
  playthrough_id      uuid REFERENCES playthroughs(id),   -- NULL = project-canonical (applies to all playthroughs)
  event_date          date NOT NULL,
  event_time          text,
  location            text,
  severity            text NOT NULL
                        CHECK (severity IN ('minor','notable','major','catastrophic')),
  source              text NOT NULL
                        CHECK (source IN ('canon','campaign_local')),
  canonical_event_id  text,
  description         text NOT NULL,
  created_at          timestamptz NOT NULL DEFAULT now()
);

COMMENT ON COLUMN world_events.playthrough_id IS
  'Null means project-scope canonical event (applies to all playthroughs of the project). '
  'Set to a playthrough_id for per-playthrough events.';


CREATE TABLE IF NOT EXISTS event_effects (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id          text NOT NULL REFERENCES projects(id),
  playthrough_id      uuid NOT NULL REFERENCES playthroughs(id),
  world_event_id      uuid NOT NULL REFERENCES world_events(id),
  effect_type         text NOT NULL CHECK (effect_type IN (
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
  created_at          timestamptz NOT NULL DEFAULT now()
);


CREATE TABLE IF NOT EXISTS user_observations (
  id                    uuid PRIMARY KEY DEFAULT gen_random_uuid(),
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
  created_at            timestamptz NOT NULL DEFAULT now()
);


-- ============================================================================
-- CHARACTER_PROFILES — rich per-character data (marauders)
-- ============================================================================
-- The CHARACTER_SCHEMA_*.md design realized: Big-Five, core concept,
-- mask/private split, voice mechanics, behavioral patterns, perception state.

CREATE TABLE IF NOT EXISTS character_profiles (
  id                       uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id               text NOT NULL REFERENCES projects(id),
  playthrough_id           uuid REFERENCES playthroughs(id),
  scope                    text NOT NULL DEFAULT 'project'
                             CHECK (scope IN ('project','playthrough')),
  character_key            text NOT NULL,
  display_name             text NOT NULL,
  age                      text,
  role_in_story            text,
  social_position          text,
  public_reputation        text,
  private_reality          text,
  core_concept             text,
  -- Personality models
  big_five                 jsonb,
  temperament_summary      text,
  mbti_or_archetype        text,
  enneagram_or_core_fear   text,
  -- Wants / fears / lies / wounds
  external_want            text,
  internal_need            text,
  core_fear                text,
  core_desire              text,
  central_lie              text,
  emotional_wound          text,
  protective_strategy      text,
  contradiction            text,
  -- Values and lines
  core_values              jsonb,
  hard_boundaries          jsonb,
  soft_boundaries          jsonb,
  temptations              jsonb,
  moral_blind_spots        jsonb,
  lines_never_cross        jsonb,
  lines_might_cross        jsonb,
  -- Mask / private self
  public_mask              text,
  private_self             text,
  what_they_hide           text,
  what_they_overperform    text,
  what_leaks_under_stress  text,
  what_ashamed_of          text,
  what_they_want_noticed   text,
  -- Behavioral
  pressure_behavior        jsonb,
  relationship_behavior    jsonb,
  -- Voice
  voice_summary            text,
  sentence_length          text,
  vocabulary               text,
  humor_style              text,
  emotional_directness     text,
  common_phrases           jsonb,
  rarely_says              jsonb,
  body_language            text,
  -- Mechanics
  how_they_lie             text,
  how_they_apologize       text,
  how_they_flirt           text,
  how_they_argue           text,
  things_to_remember       jsonb,
  things_misinterpret      jsonb,
  recurring_concerns       jsonb,
  -- Runtime state
  state_variables          jsonb DEFAULT '{}'::jsonb,
  npc_perception_of_user   jsonb DEFAULT '{}'::jsonb,
  notes                    text,
  example_exchanges        jsonb,
  created_at               timestamptz NOT NULL DEFAULT now(),
  updated_at               timestamptz NOT NULL DEFAULT now()
);


-- ============================================================================
-- RECURRING_MINOR_NPCS — minor NPC tracking (marauders)
-- ============================================================================

CREATE TABLE IF NOT EXISTS recurring_minor_npcs (
  id                        uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id                text NOT NULL REFERENCES projects(id),
  playthrough_id            uuid REFERENCES playthroughs(id),
  scope                     text NOT NULL
                              CHECK (scope IN ('project','playthrough')),
  character_key             text NOT NULL,
  display_name              text NOT NULL,
  primary_location          text,
  where_met                 text,
  when_met                  date,
  one_line                  text NOT NULL,
  caleb_owes                boolean DEFAULT false,
  they_owe_caleb            boolean DEFAULT false,
  pull_strength_seek        int DEFAULT 5  CHECK (pull_strength_seek BETWEEN 1 AND 10),
  pull_strength_seek_caleb  int DEFAULT 1  CHECK (pull_strength_seek_caleb BETWEEN 1 AND 10),
  ambient_presence          int DEFAULT 3  CHECK (ambient_presence BETWEEN 0 AND 10),
  notes                     text,
  hidden_seed               text,
  created_at                timestamptz NOT NULL DEFAULT now(),
  updated_at                timestamptz NOT NULL DEFAULT now()
);


-- ============================================================================
-- ALLEGHENY'S 6 EXTENSION TABLES
-- ============================================================================
-- The richer set built for Allegheny. commitment_log is the upgraded
-- successor to commitments. The other five (agreements / corrections /
-- bits / residency / pending_beats) are net new.

-- 1. commitment_log — Observation Check enforcement (allegheny's version)
CREATE TABLE IF NOT EXISTS commitment_log (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id      text NOT NULL REFERENCES projects(id),
  playthrough_id  uuid NOT NULL REFERENCES playthroughs(id),
  from_character  text NOT NULL,
  to_character    text NOT NULL,
  topic           text NOT NULL,
  scope           text NOT NULL
                    CHECK (scope IN ('full','partial','rumor','wrong_version')),
  story_day       int NOT NULL,
  story_time      text NOT NULL,
  notes           text,
  source_event    text,
  created_at      timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_commitlog_to_topic
  ON commitment_log(playthrough_id, to_character, topic);
CREATE INDEX IF NOT EXISTS idx_commitlog_topic
  ON commitment_log(playthrough_id, topic);


-- 2. negotiated_agreements — versioned standing terms
CREATE TABLE IF NOT EXISTS negotiated_agreements (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id      text NOT NULL REFERENCES projects(id),
  playthrough_id  uuid NOT NULL REFERENCES playthroughs(id),
  agreement_slug  text NOT NULL,
  version         int NOT NULL DEFAULT 1,
  parties         text[] NOT NULL,
  status          text NOT NULL
                    CHECK (status IN ('active','superseded','broken','fulfilled')),
  terms           text NOT NULL,
  story_day       int NOT NULL,
  story_time      text NOT NULL,
  superseded_by   uuid REFERENCES negotiated_agreements(id),
  notes           text,
  created_at      timestamptz NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX IF NOT EXISTS idx_agreement_active_unique
  ON negotiated_agreements(playthrough_id, agreement_slug)
  WHERE status = 'active';
CREATE INDEX IF NOT EXISTS idx_agreement_lookup
  ON negotiated_agreements(playthrough_id, agreement_slug, status);


-- 3. narrator_corrections — standing OOC calibrations
CREATE TABLE IF NOT EXISTS narrator_corrections (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id        text NOT NULL REFERENCES projects(id),
  playthrough_id    uuid REFERENCES playthroughs(id),    -- NULL = project-wide
  rule_slug         text NOT NULL,
  rule_text         text NOT NULL,
  category          text NOT NULL
                      CHECK (category IN ('continuity','voice','agency','register','meta')),
  surfaced_at_day   int,
  surfaced_at_time  text,
  active            boolean NOT NULL DEFAULT true,
  notes             text,
  created_at        timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_corrections_active
  ON narrator_corrections(project_id, playthrough_id, active);
CREATE UNIQUE INDEX IF NOT EXISTS idx_corrections_slug_unique
  ON narrator_corrections(
       project_id,
       COALESCE(playthrough_id, '00000000-0000-0000-0000-000000000000'::uuid),
       rule_slug);


-- 4. recurring_bits — running gags / catchphrases
CREATE TABLE IF NOT EXISTS recurring_bits (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id      text NOT NULL REFERENCES projects(id),
  playthrough_id  uuid NOT NULL REFERENCES playthroughs(id),
  bit_slug        text NOT NULL,
  bit_text        text NOT NULL,
  origin_day      int,
  origin_time     text,
  origin_context  text,
  parties         text[],
  last_used_day   int,
  last_used_time  text,
  use_count       int NOT NULL DEFAULT 1,
  status          text NOT NULL DEFAULT 'active'
                    CHECK (status IN ('active','dormant','retired')),
  notes           text,
  created_at      timestamptz NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX IF NOT EXISTS idx_bits_slug_unique
  ON recurring_bits(playthrough_id, bit_slug);
CREATE INDEX IF NOT EXISTS idx_bits_active
  ON recurring_bits(playthrough_id, status);


-- 5. residency_map — who's where, with sub-location granularity
CREATE TABLE IF NOT EXISTS residency_map (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id      text NOT NULL REFERENCES projects(id),
  playthrough_id  uuid NOT NULL REFERENCES playthroughs(id),
  character_id    text NOT NULL,
  location_slug   text NOT NULL,
  arrived_day     int NOT NULL,
  arrived_time    text NOT NULL,
  departed_day    int,
  departed_time   text,
  status          text NOT NULL
                    CHECK (status IN ('current','past','planned')),
  notes           text,
  created_at      timestamptz NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX IF NOT EXISTS idx_residency_one_current
  ON residency_map(playthrough_id, character_id)
  WHERE status = 'current';
CREATE INDEX IF NOT EXISTS idx_residency_location
  ON residency_map(playthrough_id, location_slug, status);
CREATE INDEX IF NOT EXISTS idx_residency_character
  ON residency_map(playthrough_id, character_id);


-- 6. pending_beats — time-pinned in-fiction commitments
CREATE TABLE IF NOT EXISTS pending_beats (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id      text NOT NULL REFERENCES projects(id),
  playthrough_id  uuid NOT NULL REFERENCES playthroughs(id),
  beat_slug       text NOT NULL,
  description     text NOT NULL,
  earliest_day    int,
  earliest_time   text,
  latest_day      int,
  latest_time     text,
  trigger_type    text
                    CHECK (trigger_type IN ('time','location','event','player_initiated')),
  trigger_detail  text,
  status          text NOT NULL DEFAULT 'pending'
                    CHECK (status IN ('pending','landed','cancelled','overdue')),
  parties         text[],
  notes           text,
  created_day     int,
  created_time    text,
  landed_day      int,
  landed_time     text,
  created_at      timestamptz NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX IF NOT EXISTS idx_pending_slug_unique
  ON pending_beats(playthrough_id, beat_slug);
CREATE INDEX IF NOT EXISTS idx_pending_active
  ON pending_beats(playthrough_id, status);


-- ============================================================================
-- SEED — projects rows currently in the live DB
-- ============================================================================
INSERT INTO projects (id, name) VALUES
  ('vault49',   'Vault 49'),
  ('vault83',   'Vault 83'),
  ('shaula',    'Shaula'),
  ('marauders', 'Marauders — First Wizarding War (Sept 1971 – Oct 1981)'),
  ('allegheny', 'Project Allegheny')
ON CONFLICT (id) DO NOTHING;


-- ============================================================================
-- RLS — currently DISABLED on all tables in the live DB.
-- ============================================================================
-- WARNING: With RLS off, anyone with the anon key can read/modify every row.
-- To enable RLS with a permissive allow-all policy (single-user / personal):
--
-- ALTER TABLE projects               ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE playthroughs           ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE commitments            ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE theories               ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE journal_entries        ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE correspondence         ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE world_events           ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE event_effects          ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE user_observations      ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE character_profiles     ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE recurring_minor_npcs   ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE commitment_log         ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE negotiated_agreements  ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE narrator_corrections   ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE recurring_bits         ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE residency_map          ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE pending_beats          ENABLE ROW LEVEL SECURITY;
--
-- CREATE POLICY allow_all ON projects              USING (true) WITH CHECK (true);
-- CREATE POLICY allow_all ON playthroughs          USING (true) WITH CHECK (true);
-- CREATE POLICY allow_all ON commitments           USING (true) WITH CHECK (true);
-- CREATE POLICY allow_all ON theories              USING (true) WITH CHECK (true);
-- CREATE POLICY allow_all ON journal_entries       USING (true) WITH CHECK (true);
-- CREATE POLICY allow_all ON correspondence        USING (true) WITH CHECK (true);
-- CREATE POLICY allow_all ON world_events          USING (true) WITH CHECK (true);
-- CREATE POLICY allow_all ON event_effects         USING (true) WITH CHECK (true);
-- CREATE POLICY allow_all ON user_observations     USING (true) WITH CHECK (true);
-- CREATE POLICY allow_all ON character_profiles    USING (true) WITH CHECK (true);
-- CREATE POLICY allow_all ON recurring_minor_npcs  USING (true) WITH CHECK (true);
-- CREATE POLICY allow_all ON commitment_log        USING (true) WITH CHECK (true);
-- CREATE POLICY allow_all ON negotiated_agreements USING (true) WITH CHECK (true);
-- CREATE POLICY allow_all ON narrator_corrections  USING (true) WITH CHECK (true);
-- CREATE POLICY allow_all ON recurring_bits        USING (true) WITH CHECK (true);
-- CREATE POLICY allow_all ON residency_map         USING (true) WITH CHECK (true);
-- CREATE POLICY allow_all ON pending_beats         USING (true) WITH CHECK (true);
