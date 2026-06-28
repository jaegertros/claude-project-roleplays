"""Schema definitions for vault83-state v1.0.

Project Vault 83 is a Vault-Tec social-stratification experiment. Residents
are sorted into tiers (1a/1b/1c, 2a/2b/2c, 3a/3b/3c, 4a/4b, plus a Tier-4
culture stratum); a small hereditary Liaison class sits outside the tier
structure as the cross-floor messenger caste. The protagonist (Caleb Teague)
is a Liaison. Seven days, Monday through Sunday. Day 3 = the Advancement
Review hearing. Day 7 = The Choice (Preserve / Exit / Reveal / Rupture).

DEPTH (0-5, monotonic) tracks how much of the experiment's hidden
architecture the protagonist has uncovered. The Admission Ledger is the
tampered founding record (public copy on Level 1) versus the unredacted
original on the sub-basement terminal (DEPTH 4+).

Adapted from hohenwald_state.schema — same default_state shape; Vault-83
enums throughout.
"""

from __future__ import annotations

from datetime import datetime, timezone


SCHEMA_VERSION = "1.0"


# DEPTH ladder: 0=unaware, 1=passive observation, 2=active investigation,
# 3=relational pressure (NPC slipped), 4=trespass (papers/corridor/tally),
# 5=sub-basement terminal (unredacted Ledger in hand).
VALID_DEPTH_VALUES: set[int] = {0, 1, 2, 3, 4, 5}


VALID_DAY_NAMES: set[str] = {
    "Monday", "Tuesday", "Wednesday", "Thursday",
    "Friday", "Saturday", "Sunday",
}

DAY_OF_WEEK_FOR_STORY_DAY: dict[int, str] = {
    1: "Monday", 2: "Tuesday", 3: "Wednesday", 4: "Thursday",
    5: "Friday", 6: "Saturday", 7: "Sunday",
}


# Four residential floors plus the hidden sub-basement.
VALID_LEVELS: set[str] = {"1", "2", "3", "4", "sub_basement"}


# Tier Protocol. Tier 1/2/3 each have a/b/c sub-grades; Tier 4 has only a/b.
# "tier_4_culture" is the cultural stratum of long-time Tier-4 residents.
# "liaison" sits outside the tier system entirely.
VALID_TIERS: set[str] = {
    "1a", "1b", "1c",
    "2a", "2b", "2c",
    "3a", "3b", "3c",
    "4a", "4b",
    "tier_4_culture",
    "liaison",
}


# Daily anchors — fixed routine that runs every weekday. Mapping of
# anchor_key -> (time_window, narrator-facing description). The enter_anchor /
# exit_anchor / mark_anchor_attendance tools accept only these keys.
DAILY_ANCHORS: dict[str, tuple[str, str]] = {
    "reveille":          ("06:30",       "the reveille chime + PA salutation"),
    "breakfast":         ("07:00",       "breakfast (per-tier dining)"),
    "morning_hymn":      ("07:45",       "the Morning Hymn in the Hymn Hall"),
    "morning_address":   ("08:00",       "Wren Gallagher's Morning Address"),
    "morning_runs":      ("08:30-11:30", "Liaison morning delivery rounds"),
    "lunch":             ("12:00",       "lunch (per-tier)"),
    "afternoon_runs":    ("13:00-17:00", "Liaison afternoon delivery rounds"),
    "work_day_end":      ("17:30",       "the work day ends"),
    "dinner":            ("18:00",       "dinner (per-tier)"),
    "evening":           ("20:00",       "open evening — common areas, suites, the corridor"),
    "lights_half":       ("21:00",       "lights to half-strength on residential floors"),
    "lights_out":        ("22:00",       "lights out on residential floors"),
}


# Reasons accepted by record_tier_transition.
VALID_TIER_TRANSITION_REASONS: set[str] = {
    "advancement_review",      # Day-3 formal Tribunal hearing
    "informal_movement",       # social drift / unofficial reclassification
    "punitive",                # demotion as penalty
    "promotion_for_service",   # rare reward
    "discovery",               # uncovered fact forced reclassification
    "tier_adoption",           # cross-tier marriage (Exit ending)
    "ledger_reckoning",        # post-Rupture review revising a prior decision
}


# How a single Admission Ledger row reads (narrator-supplied label).
VALID_ADMISSION_STATUS: set[str] = {
    "admitted", "denied", "deferred", "post_hoc_added", "redacted",
}


# What the Tribunal returned on a single advancement case.
VALID_ADVANCEMENT_DECISIONS: set[str] = {
    "demotion_passed", "demotion_failed",
    "promotion_passed", "promotion_failed",
    "reaffirmed",   # tier maintained without movement
    "deferred",     # held over to a future Review
    "recused",      # petition withdrawn or recused mid-hearing
}


# Reveal gates for the experiment's architecture. Derived from
# KNOWLEDGE_4_Hidden.md (DEPTH Gating, Endings) and KNOWLEDGE_3_Events.md
# (Day 3, Day 7, Conditional Access Summary).
KNOWN_FLAGS: set[str] = {
    # The Tier Protocol comprehension ladder
    "tier_protocol_named",                # protagonist or NPC said it aloud
    "tier_protocol_revealed",             # DEPTH 3+ — design intent understood
    "liaison_class_understood",           # protagonist has consciously named what the caste is for
    # The Admission Ledger
    "public_ledger_viewed",               # the Level 1 Archive copy in its glass case
    "ledger_handwriting_anomaly_noticed", # the Camille / Day-5 micro-discovery
    "admission_ledger_seen",              # the unredacted ledger on the sub-basement terminal — DEPTH 4+
    "original_ledger_compared",           # public vs. original side-by-side, post-DEPTH 4
    # Day 3 — the Advancement Review (Reeve Callender's demotion)
    "advancement_review_attended",        # protagonist witnessed the hearing day
    "advancement_review_intervened",      # protagonist took an action that shaped the day
    "reeve_demotion_executed",            # Reeve carried her suitcase
    "reeve_demotion_reversed",            # post-Rupture restoration
    # Sub-basement / DEPTH 4-5 thresholds
    "sub_basement_corridor_known",        # location received from Irena/Camille/Reeve
    "sub_basement_entered",               # DEPTH 4 trespass
    "hocking_slip_retrieved",             # ISOKRATOUMENOS in hand
    "terminal_password_entered",          # DEPTH 5 access
    "dane_confession_video_viewed",       # the 4-minute video on the terminal
    "ledger_printed",                     # the 14-page thermal print in the protagonist's hand
    # DEPTH 5 / the irreducible point
    "irreducible_point_named",            # the protagonist articulates the system shape
    # Day 7 — the Choice
    "choice_made",                        # any ending recorded
    "experiment_disclosed_publicly",      # Rupture branch
    "samia_pa_favor_called_in",           # vault-wide broadcast amplifier
    # Liaison social texture
    "liaison_oral_tradition_heard",       # Aunt Irena told the grandfather story
    "head_liaison_offered",               # Preserve aftermath
    "tier_adoption_petition_filed",       # Exit pathway
}


# Caleb-NPC relationship ladder — state.residents[id].caleb_relationship.
# Narrator picks the label after meaningful scenes. "in_love" is the romance terminus.
VALID_RELATIONSHIPS: set[str] = {
    "stranger", "acquaintance", "known", "trusted", "close", "in_love",
}


# Day-7 endings. Read KNOWLEDGE_4_Hidden.md "Endings" + KNOWLEDGE_3_Events.md DAY 7.
VALID_CHOICE_ENDINGS: set[str] = {
    "preserve",        # remain Liaison; Head Liaison role within six weeks
    "exit",            # tier-adoption petition; cross-tier marriage; caste exit
    "reveal_private",  # tell one named confidant; reaction depends on who
    "rupture",         # Founding Day broadcast of Dane's annotation aloud
}


# Note type for journal entries (the Pip-Boy / pocket journal). Mirrors the
# shared `journal_entries` Supabase table; Vault 83 already has live rows
# under project_id='vault83'.
VALID_NOTE_TYPES: set[str] = {
    "observation",      # something seen during a run
    "delivery",         # a delivery the protagonist made
    "overheard",        # a fragment caught from another tier's table
    "private",          # a personal thought
    "name",             # someone the protagonist wants to remember
    "ledger_fragment",  # text quoted from the Ledger (DEPTH 4+)
    "instruction",      # something Ezra or Aunt Irena said
    "decision",         # a Day-7 commitment
}


# Default state factory — adapted from hohenwald_state.schema.default_state
# with Vault-83-specific clock fields (story_day 1-7, level, depth,
# current_anchor) and a residents dict keyed by character_id.


def default_state(
    project: str = "vault83",
    title: str | None = None,
) -> dict:
    """Build a fresh state document for a new Vault 83 playthrough."""
    now = datetime.now(timezone.utc).isoformat(timespec="seconds")
    return {
        "schema_version": SCHEMA_VERSION,
        "project": project,
        "title": title or "Vault 83",
        "created": now,
        "last_updated": now,
        # Minted on first start_session; foreign key for Supabase extension tables.
        "playthrough_id": None,
        "session": {"current_session_id": None, "session_count": 0, "sessions": []},
        "clock": {
            "story_day": 1,
            "day_of_week": "Monday",
            "story_time": "06:30",                            # canonical wake-up time
            "level": "2",                                     # Liaison corridor on Level 2
            "location_slug": "liaison_corridor_kitchen",
            "depth": 0,                                       # 0-5, monotonic
            "current_anchor": None,
            "history": [],
        },
        # Caleb Teague, Liaison caste.
        "player": {
            "name": "Caleb",
            "family_name": "Teague",
            "profession": "liaison",
            "tier": "liaison",
            "room_slug": "L-01",
            "inventory": [],
            "current_pipboy_text": "",   # scratch buffer for in-progress journal text
            "observations": [],
        },
        # Registered residents keyed by uppercase character_id. Each entry holds
        # present, level, location_slug, current_tier, original_tier,
        # last_anchor_attended, caleb_relationship, notes, history.
        "residents": {},
        "liaison_class_members": [],     # other Liaison-caste character_ids
        "lost": [],                      # died / expelled / removed
        "flags": {f: False for f in KNOWN_FLAGS},
        # Local mirror of recent Supabase rows for offline tracker rendering.
        "admission_ledger_views": [],
        "tier_transitions": [],
        # Today's anchor attendance, cleared on story_day rollover.
        "daily_anchor_attendance": {},
        # The Day-7 commitment. Set by record_choice.
        "choice": {
            "ending_chosen": None,
            "made_at_day": None,
            "made_at_time": None,
            "basis": None,
            "notes": None,
        },
        "_audit_log": [],
        "_counters": {"item": 0, "observation": 0, "ledger_view": 0, "tier_transition": 0},
    }


def validate_schema_version(state: dict) -> None:
    """Raise if state's schema_version isn't loadable. v1.0 is the only
    currently supported version; future versions add migrations here."""
    sv = state.get("schema_version")
    if sv == SCHEMA_VERSION:
        return
    raise SchemaVersionError(
        f"State file has schema_version={sv!r}, server supports "
        f"{SCHEMA_VERSION!r}. Unknown version."
    )


class SchemaVersionError(Exception):
    """Raised when state file's schema_version is incompatible."""
