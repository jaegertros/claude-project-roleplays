"""Schema definitions for narrator-state v1.2.

Holds the default-state factory, the canonical flag list, the body-part-to-
incubation-range lookup, and version constants. Migrations live alongside
this module — see the lazy v1.0 -> v1.1 -> v1.2 chain inside store.load_state.

v1.2 adds `playthrough_id` (UUID4) — the foreign key the Supabase-backed
extended-state tables (commitment_log, negotiated_agreements, etc.) use to
group rows belonging to the same playthrough across sessions. The id is
minted by start_session on first call against a fresh / reset state and
preserved across all subsequent sessions until reset_state clears it.
"""

from __future__ import annotations

from datetime import datetime, timezone


# ---------------------------------------------------------------------------
# Version
# ---------------------------------------------------------------------------

SCHEMA_VERSION = "1.2"


# ---------------------------------------------------------------------------
# Canonical flag list
#
# Adding a new flag requires a code change here. set_flag rejects unknown
# names; this is the contract. Per the spec, this is "cost of safety."
# ---------------------------------------------------------------------------

KNOWN_FLAGS: set[str] = {
    # Mortality and structure
    "best_friend_mortal_after_week_1",
    "player_mortal_after_explicit_commit",
    # Vocabulary and reveal gates
    "cordyceps_word_unlocked",
    "fireflies_revealed",
    "cause_explained",
    "jackson_named",
    # News-encounter gates
    "news_cdc_briefing_seen",
    "news_fedra_announced",
    "news_qz_named",
    "news_fireflies_named",
    "news_cordyceps_named",
}


# ---------------------------------------------------------------------------
# Canonical faction list
#
# set_faction_known accepts only these names.
# ---------------------------------------------------------------------------

KNOWN_FACTIONS: set[str] = {
    "FEDRA",
    "Fireflies",
    "Hunters",
    "WLF",
    "Seraphites",
    "Jackson",
    "Rattlers",
}


# ---------------------------------------------------------------------------
# Bite incubation lookup
#
# Returns the (min, max) minute range for a bite at the given body part.
# log_injury uses these when severity=="bite" and clock_bias selects within.
# ---------------------------------------------------------------------------

BITE_INCUBATION_MINUTES: dict[str, tuple[int, int]] = {
    "face": (2, 10),
    "neck": (5, 20),
    "head": (10, 30),
    "shoulder": (60, 240),
    "chest": (120, 360),
    "abdomen": (120, 360),
    "upper_arm": (120, 360),
    "forearm": (240, 720),
    "hand": (240, 720),
    "upper_leg": (360, 1080),
    "hip": (360, 1080),
    "lower_leg": (720, 1440),
    "foot": (720, 1440),
}


VALID_SEVERITIES: set[str] = {
    "scratch",
    "shallow_cut",
    "cut",
    "deep_wound",
    "bite",
    "spore_exposure",
}


VALID_HEAL_OUTCOMES: set[str] = {
    "healed_clean",
    "scarred",
    "infected",
    "death",
}


VALID_STORY_PHASES: set[str] = {
    "pre_outbreak",
    "outbreak_week",
    "qz_era",
    "road",
    "year_one_plus",
}


# ---------------------------------------------------------------------------
# Default state factory
#
# Called when a project is first accessed. The narrator's first set of tool
# calls will then populate the story-specific fields (player name, opening
# location, etc.).
# ---------------------------------------------------------------------------


def default_state(project: str, title: str | None = None) -> dict:
    """Build a fresh state document for a new project."""
    now = datetime.now(timezone.utc).isoformat(timespec="seconds")
    return {
        "schema_version": SCHEMA_VERSION,
        "project": project,
        "title": title or project,
        "created": now,
        "last_updated": now,
        # UUID grouping rows in Supabase-backed extension tables (commitment_log,
        # negotiated_agreements, etc.). None until first start_session, which
        # mints a fresh UUID4. reset_state clears it back to None.
        "playthrough_id": None,
        "session": {
            "current_session_id": None,
            "session_count": 0,
            "sessions": [],
        },
        "clock": {
            "story_day": 1,
            "story_day_label": "Day 1",
            "story_time": "00:00",
            "story_phase": "pre_outbreak",
            "location": "unset",
            "awareness": 0,
            "history": [],
        },
        "player": {
            "name": "",
            "age": None,
            "profession": "",
            "pronouns": "",
            "condition": "rested",
            "active_injuries": [],
            "inventory": [],
        },
        "characters": {},
        "lost": [],
        "factions_known": {f: False for f in KNOWN_FACTIONS},
        "missions": {
            "active": [],
            "completed": [],
            "deferred": [],
        },
        "memory_book": [],
        "knowledge_transfers": [],
        "flags": {f: False for f in KNOWN_FLAGS},
        # Internal: audit log for undo. Not exposed in get_state.
        "_audit_log": [],
        # Internal: monotonic ID counters for items, injuries, memory book.
        "_counters": {
            "injury": 0,
            "item": 0,
            "memory_book": 0,
            "kt": 0,
        },
    }


def validate_schema_version(state: dict) -> None:
    """Raise if state's schema_version isn't loadable.

    v1.2 reads v1.0, v1.1, and v1.2 files. Older files are migrated lazily
    on load (see store.load_state). Future versions add their own migrations
    here.
    """
    sv = state.get("schema_version")
    if sv in {"1.0", "1.1", "1.2"}:
        return
    raise SchemaVersionError(
        f"State file has schema_version={sv!r}, server supports "
        f"{SCHEMA_VERSION!r} (and reads {{'1.0', '1.1', '1.2'}}). "
        f"Unknown version."
    )


class SchemaVersionError(Exception):
    """Raised when state file's schema_version is incompatible."""
