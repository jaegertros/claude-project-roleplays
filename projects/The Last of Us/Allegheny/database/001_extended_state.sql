-- Allegheny — Schema extension v1
-- Adds 6 tables to the existing narrator-state Supabase database.
-- All scoped via project_id = 'allegheny' and playthrough_id.
-- Run as a single migration; idempotent via IF NOT EXISTS.

-- ============================================================================
-- 1. commitment_log — Observation Check enforcement
-- ============================================================================

CREATE TABLE IF NOT EXISTS commitment_log (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id      text NOT NULL,
  playthrough_id  uuid NOT NULL,
  from_character  text NOT NULL,           -- character_id, 'OBSERVATION', or 'PLAYER'
  to_character    text NOT NULL,           -- character_id
  topic           text NOT NULL,           -- slug
  scope           text NOT NULL CHECK (scope IN ('full','partial','rumor','wrong_version')),
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

-- ============================================================================
-- 2. negotiated_agreements — versioned standing terms
-- ============================================================================

CREATE TABLE IF NOT EXISTS negotiated_agreements (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id      text NOT NULL,
  playthrough_id  uuid NOT NULL,
  agreement_slug  text NOT NULL,
  version         int NOT NULL DEFAULT 1,
  parties         text[] NOT NULL,
  status          text NOT NULL CHECK (status IN ('active','superseded','broken','fulfilled')),
  terms           text NOT NULL,
  story_day       int NOT NULL,
  story_time      text NOT NULL,
  superseded_by   uuid REFERENCES negotiated_agreements(id),
  notes           text,
  created_at      timestamptz NOT NULL DEFAULT now()
);

-- Only one active version per (playthrough, slug)
CREATE UNIQUE INDEX IF NOT EXISTS idx_agreement_active_unique
  ON negotiated_agreements(playthrough_id, agreement_slug)
  WHERE status = 'active';

CREATE INDEX IF NOT EXISTS idx_agreement_lookup
  ON negotiated_agreements(playthrough_id, agreement_slug, status);

-- ============================================================================
-- 3. narrator_corrections — standing OOC calibrations
-- ============================================================================

CREATE TABLE IF NOT EXISTS narrator_corrections (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id        text NOT NULL,
  playthrough_id    uuid,                  -- NULL = applies to all playthroughs of project
  rule_slug         text NOT NULL,
  rule_text         text NOT NULL,
  category          text NOT NULL CHECK (category IN ('continuity','voice','agency','register','meta')),
  surfaced_at_day   int,
  surfaced_at_time  text,
  active            boolean NOT NULL DEFAULT true,
  notes             text,
  created_at        timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_corrections_active
  ON narrator_corrections(project_id, playthrough_id, active);
CREATE UNIQUE INDEX IF NOT EXISTS idx_corrections_slug_unique
  ON narrator_corrections(project_id, COALESCE(playthrough_id, '00000000-0000-0000-0000-000000000000'::uuid), rule_slug);

-- ============================================================================
-- 4. recurring_bits — running gags / catchphrases
-- ============================================================================

CREATE TABLE IF NOT EXISTS recurring_bits (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id      text NOT NULL,
  playthrough_id  uuid NOT NULL,
  bit_slug        text NOT NULL,
  bit_text        text NOT NULL,
  origin_day      int,
  origin_time     text,
  origin_context  text,
  parties         text[],
  last_used_day   int,
  last_used_time  text,
  use_count       int NOT NULL DEFAULT 1,
  status          text NOT NULL DEFAULT 'active' CHECK (status IN ('active','dormant','retired')),
  notes           text,
  created_at      timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_bits_slug_unique
  ON recurring_bits(playthrough_id, bit_slug);
CREATE INDEX IF NOT EXISTS idx_bits_active
  ON recurring_bits(playthrough_id, status);

-- ============================================================================
-- 5. residency_map — who's where, per location with floor granularity
-- ============================================================================

CREATE TABLE IF NOT EXISTS residency_map (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id      text NOT NULL,
  playthrough_id  uuid NOT NULL,
  character_id    text NOT NULL,
  location_slug   text NOT NULL,
  arrived_day     int NOT NULL,
  arrived_time    text NOT NULL,
  departed_day    int,
  departed_time   text,
  status          text NOT NULL CHECK (status IN ('current','past','planned')),
  notes           text,
  created_at      timestamptz NOT NULL DEFAULT now()
);

-- Only one current row per (character) — character is in one place at a time
CREATE UNIQUE INDEX IF NOT EXISTS idx_residency_one_current
  ON residency_map(playthrough_id, character_id)
  WHERE status = 'current';

CREATE INDEX IF NOT EXISTS idx_residency_location
  ON residency_map(playthrough_id, location_slug, status);
CREATE INDEX IF NOT EXISTS idx_residency_character
  ON residency_map(playthrough_id, character_id);

-- ============================================================================
-- 6. pending_beats — time-pinned in-fiction commitments
-- ============================================================================

CREATE TABLE IF NOT EXISTS pending_beats (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id      text NOT NULL,
  playthrough_id  uuid NOT NULL,
  beat_slug       text NOT NULL,
  description     text NOT NULL,
  earliest_day    int,
  earliest_time   text,
  latest_day      int,
  latest_time     text,
  trigger_type    text CHECK (trigger_type IN ('time','location','event','player_initiated')),
  trigger_detail  text,
  status          text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','landed','cancelled','overdue')),
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
-- Seed rows from current playthrough (Day 2 Sunday 18:48)
-- Replace :pt_id with the active playthrough UUID before running.
-- These can also be inserted by the narrator via MCP after migration runs.
-- ============================================================================

-- Example seeds commented out — narrator should backfill via MCP tool calls
-- after the tools are wired up. Leaving the structure here for reference.

/*

-- narrator_corrections (project-wide, no playthrough_id):
INSERT INTO narrator_corrections (project_id, rule_slug, rule_text, category, notes) VALUES
('allegheny','pham_no_spanish','Henry and Theresa Pham are Vietnamese-American. They never speak Spanish. Hard rule.','continuity','Slipped multiple times in early play; corrected.'),
('allegheny','no_decisions_for_caleb','Sub-tactical choices, what Caleb takes from bodies vs cars, his interior reasoning, and his change of mind belong to the player. Narrator describes the wall and returns control.','agency',NULL),
('allegheny','no_moralize_caleb','Narrator does not editorialize on katana, kills, heists, or polyam dynamic.','voice',NULL),
('allegheny','name_continuity_errors','When narrator slips, surface in one OOC line, revert, continue. 1-retcon-per-session limit disabled for this play.','meta',NULL),
('allegheny','userprefs_disabled','userPreferences "Ask clarifying questions" does not apply to this RP.','meta',NULL),
('allegheny','marisol_flirty_register','Marisol stays in her established flirty register. Not a consent-counselor mid-scene.','register',NULL),
('allegheny','run_beat_then_stop','Run the beat the player asked for, then stop. No chaining, no skipping ahead.','meta',NULL),
('allegheny','caleb_takes_all_bodies','Caleb takes everything from a body. Player decides what to leave from cars.','agency',NULL);

*/
