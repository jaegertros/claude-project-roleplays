"""Supabase-backed MCP tools for narrator-state extension tables.

This module registers ~20 @mcp.tool() functions covering the six v1.2
extension tables:

    commitment_log          — commit_knowledge_transfer (v1.1 local already),
                              check_knowledge, commit_group_knowledge_transfer
    negotiated_agreements   — record_agreement, supersede_agreement,
                              get_agreement, list_active_agreements,
                              mark_agreement_broken
    narrator_corrections    — add_correction, list_active_corrections,
                              deactivate_correction
    recurring_bits          — log_bit, bump_bit, list_active_bits
    residency_map           — place_character, who_is_at, where_is,
                              list_location_residents
    pending_beats           — add_pending_beat, land_beat, cancel_beat,
                              list_pending_beats

The original `commit_knowledge_transfer` in server.py (v1.1) writes to the
local JSON. This module's commitment_log tools target Supabase. The two
are complementary: knowledge_transfers in local state captures author intent
turn-by-turn; commitment_log in Supabase enables cross-session queries and
the Observation Check.

All tools resolve the playthrough_id from local state via
get_playthrough_id(project) — start_session in server.py is responsible for
minting and persisting it.

If Supabase is not configured, every tool here returns
    {"ok": False, "error": "<setup hint>"}
without crashing the server.
"""

from __future__ import annotations

from typing import Any

from .server import mcp, _err, _ok  # reuse the FastMCP instance + helpers
from .store import load_state
from .supabase_client import require_client


# ---------------------------------------------------------------------------
# Shared helpers
# ---------------------------------------------------------------------------

VALID_SCOPES = {"full", "partial", "rumor", "wrong_version"}
VALID_AGREEMENT_STATUSES = {"active", "superseded", "broken", "fulfilled"}
VALID_CORRECTION_CATEGORIES = {"continuity", "voice", "agency", "register", "meta"}
VALID_BIT_STATUSES = {"active", "dormant", "retired"}
VALID_RESIDENCY_STATUSES = {"current", "past", "planned"}
VALID_BEAT_TRIGGERS = {"time", "location", "event", "player_initiated"}
VALID_BEAT_STATUSES = {"pending", "landed", "cancelled", "overdue"}


def get_playthrough_id(project: str) -> str | None:
    """Read playthrough_id from local state. None if not minted yet."""
    state, _ = load_state(project)
    return state.get("playthrough_id")


def get_clock(project: str) -> tuple[int, str]:
    """Return (story_day, story_time) from local clock for stamping rows."""
    state, _ = load_state(project)
    clk = state["clock"]
    return int(clk["story_day"]), str(clk["story_time"])


def _require_playthrough(project: str) -> tuple[str | None, dict | None]:
    """Resolve playthrough_id; return (pt_id, error_dict). One is None."""
    pt = get_playthrough_id(project)
    if not pt:
        return None, _err(
            "No active playthrough_id. Call start_session(project) first — "
            "it mints a UUID the first time it runs against a fresh state."
        )
    return pt, None


# ===========================================================================
# 1. commitment_log
# ===========================================================================


@mcp.tool()
def check_knowledge(project: str, character_id: str, topic: str) -> dict:
    """Return the most recent commitment_log entry for (character, topic), or
    {known: False}. Run this before any NPC speaks about an off-screen topic
    — the binary answer is the Observation Check.

    Args:
        project: project slug.
        character_id: uppercase token of the NPC whose knowledge is being checked.
        topic: stable topic slug.
    """
    client, err = require_client()
    if err:
        return _err(err)
    pt, e = _require_playthrough(project)
    if e:
        return e
    try:
        r = (
            client.table("commitment_log")
            .select("scope, story_day, story_time, from_character, notes, created_at")
            .eq("playthrough_id", pt)
            .eq("to_character", character_id.upper())
            .eq("topic", topic)
            .order("story_day", desc=True)
            .order("story_time", desc=True)
            .limit(1)
            .execute()
        )
        if not r.data:
            return _ok(known=False, topic=topic, character_id=character_id.upper())
        return _ok(known=True, **r.data[0])
    except Exception as e:
        return _err(str(e))


@mcp.tool()
def commit_knowledge_transfer_db(
    project: str,
    from_character: str,
    to_character: str,
    topic: str,
    scope: str = "full",
    notes: str = "",
    source_event: str = "",
) -> dict:
    """Insert a row into commitment_log (Supabase). Distinct from the
    v1.1 local-JSON `commit_knowledge_transfer` — that tool captures author
    intent in state, this one enables cross-session Observation Checks.

    The narrator can call both in the same turn; they're not redundant.

    scope: 'full' | 'partial' | 'rumor' | 'wrong_version'
    from_character: 'OBSERVATION', 'PLAYER', or an NPC character_id (uppercase)
    """
    if scope not in VALID_SCOPES:
        return _err(f"Invalid scope {scope!r}. Valid: {sorted(VALID_SCOPES)}")
    client, err = require_client()
    if err:
        return _err(err)
    pt, e = _require_playthrough(project)
    if e:
        return e
    day, t = get_clock(project)
    try:
        r = (
            client.table("commitment_log")
            .insert({
                "project_id": project,
                "playthrough_id": pt,
                "from_character": from_character.upper(),
                "to_character": to_character.upper(),
                "topic": topic,
                "scope": scope,
                "story_day": day,
                "story_time": t,
                "notes": notes or None,
                "source_event": source_event or None,
            })
            .execute()
        )
        return _ok(id=r.data[0]["id"])
    except Exception as e:
        return _err(str(e))


@mcp.tool()
def list_commitments(project: str, limit: int = 50) -> dict:
    """Most recent commitment_log entries for the current playthrough,
    newest first. For the tracker's Commitment Log panel."""
    client, err = require_client()
    if err:
        return _err(err)
    pt, e = _require_playthrough(project)
    if e:
        return e
    try:
        r = (
            client.table("commitment_log")
            .select("id, from_character, to_character, topic, scope, story_day, story_time, notes, source_event, created_at")
            .eq("playthrough_id", pt)
            .order("story_day", desc=True).order("story_time", desc=True)
            .limit(max(1, min(limit, 500)))
            .execute()
        )
        return _ok(commitments=r.data or [])
    except Exception as e:
        return _err(str(e))


@mcp.tool()
def commit_group_knowledge_transfer(
    project: str,
    from_character: str,
    to_characters: list[str],
    topic: str,
    scope: str = "full",
    notes: str = "",
) -> dict:
    """One transfer to many recipients — e.g. a dinner-table reveal.
    Inserts one row per recipient.
    """
    if scope not in VALID_SCOPES:
        return _err(f"Invalid scope {scope!r}. Valid: {sorted(VALID_SCOPES)}")
    if not to_characters:
        return _err("to_characters list is empty.")
    client, err = require_client()
    if err:
        return _err(err)
    pt, e = _require_playthrough(project)
    if e:
        return e
    day, t = get_clock(project)
    rows = [{
        "project_id": project,
        "playthrough_id": pt,
        "from_character": from_character.upper(),
        "to_character": r.upper(),
        "topic": topic,
        "scope": scope,
        "story_day": day,
        "story_time": t,
        "notes": notes or None,
    } for r in to_characters]
    try:
        client.table("commitment_log").insert(rows).execute()
        return _ok(transferred_to=[r.upper() for r in to_characters], count=len(rows))
    except Exception as e:
        return _err(str(e))


# ===========================================================================
# 2. negotiated_agreements
# ===========================================================================


@mcp.tool()
def record_agreement(
    project: str,
    agreement_slug: str,
    parties: list[str],
    terms: str,
    notes: str = "",
) -> dict:
    """Create a new agreement v1. Errors if an active version with this slug
    already exists — use supersede_agreement to renegotiate instead.
    """
    client, err = require_client()
    if err:
        return _err(err)
    pt, e = _require_playthrough(project)
    if e:
        return e
    day, t = get_clock(project)
    try:
        existing = (
            client.table("negotiated_agreements")
            .select("id, version")
            .eq("playthrough_id", pt)
            .eq("agreement_slug", agreement_slug)
            .eq("status", "active")
            .execute()
        )
        if existing.data:
            return _err(
                f"Active agreement {agreement_slug!r} already exists "
                f"(v{existing.data[0]['version']}). Use supersede_agreement."
            )
        r = (
            client.table("negotiated_agreements")
            .insert({
                "project_id": project,
                "playthrough_id": pt,
                "agreement_slug": agreement_slug,
                "version": 1,
                "parties": [p.upper() for p in parties],
                "status": "active",
                "terms": terms,
                "story_day": day,
                "story_time": t,
                "notes": notes or None,
            })
            .execute()
        )
        return _ok(id=r.data[0]["id"], version=1)
    except Exception as e:
        return _err(str(e))


@mcp.tool()
def supersede_agreement(
    project: str,
    agreement_slug: str,
    new_terms: str,
    parties: list[str] | None = None,
    notes: str = "",
) -> dict:
    """Renegotiate an agreement. Existing active row goes to status='superseded'
    with superseded_by pointing at the new row; new row becomes active.
    """
    client, err = require_client()
    if err:
        return _err(err)
    pt, e = _require_playthrough(project)
    if e:
        return e
    day, t = get_clock(project)
    try:
        existing = (
            client.table("negotiated_agreements")
            .select("*")
            .eq("playthrough_id", pt)
            .eq("agreement_slug", agreement_slug)
            .eq("status", "active")
            .execute()
        )
        if not existing.data:
            return _err(f"No active agreement {agreement_slug!r} to supersede.")
        old = existing.data[0]
        new_row = (
            client.table("negotiated_agreements")
            .insert({
                "project_id": project,
                "playthrough_id": pt,
                "agreement_slug": agreement_slug,
                "version": old["version"] + 1,
                "parties": [p.upper() for p in parties] if parties else old["parties"],
                "status": "active",
                "terms": new_terms,
                "story_day": day,
                "story_time": t,
                "notes": notes or None,
            })
            .execute()
        )
        new_id = new_row.data[0]["id"]
        (
            client.table("negotiated_agreements")
            .update({"status": "superseded", "superseded_by": new_id})
            .eq("id", old["id"])
            .execute()
        )
        return _ok(new_id=new_id, new_version=old["version"] + 1, superseded_id=old["id"])
    except Exception as e:
        return _err(str(e))


@mcp.tool()
def get_agreement(project: str, agreement_slug: str) -> dict:
    """Return the active version of an agreement, or {found: False}."""
    client, err = require_client()
    if err:
        return _err(err)
    pt, e = _require_playthrough(project)
    if e:
        return e
    try:
        r = (
            client.table("negotiated_agreements")
            .select("*")
            .eq("playthrough_id", pt)
            .eq("agreement_slug", agreement_slug)
            .eq("status", "active")
            .execute()
        )
        if not r.data:
            return _ok(found=False, agreement_slug=agreement_slug)
        return _ok(found=True, **r.data[0])
    except Exception as e:
        return _err(str(e))


@mcp.tool()
def list_active_agreements(project: str) -> dict:
    """All active agreements for the current playthrough, ordered by time."""
    client, err = require_client()
    if err:
        return _err(err)
    pt, e = _require_playthrough(project)
    if e:
        return e
    try:
        r = (
            client.table("negotiated_agreements")
            .select("agreement_slug, parties, terms, story_day, story_time, version, notes")
            .eq("playthrough_id", pt)
            .eq("status", "active")
            .order("story_day").order("story_time")
            .execute()
        )
        return _ok(agreements=r.data or [])
    except Exception as e:
        return _err(str(e))


@mcp.tool()
def mark_agreement_broken(project: str, agreement_slug: str, notes: str = "") -> dict:
    """Mark an agreement broken — one party violated the terms."""
    client, err = require_client()
    if err:
        return _err(err)
    pt, e = _require_playthrough(project)
    if e:
        return e
    try:
        r = (
            client.table("negotiated_agreements")
            .update({"status": "broken", "notes": notes or None})
            .eq("playthrough_id", pt)
            .eq("agreement_slug", agreement_slug)
            .eq("status", "active")
            .execute()
        )
        if not r.data:
            return _err(f"No active agreement {agreement_slug!r} to break.")
        return _ok(broken=agreement_slug)
    except Exception as e:
        return _err(str(e))


# ===========================================================================
# 3. narrator_corrections
# ===========================================================================


@mcp.tool()
def add_correction(
    project: str,
    rule_slug: str,
    rule_text: str,
    category: str,
    playthrough_scoped: bool = False,
    notes: str = "",
) -> dict:
    """Record a standing OOC calibration.

    Default scope: project-wide (applies to all playthroughs of `project`).
    Set playthrough_scoped=True for rules that should only apply to the
    current playthrough.

    category: 'continuity' | 'voice' | 'agency' | 'register' | 'meta'

    Idempotent: re-calling with the same (project, playthrough_scope,
    rule_slug) updates rule_text / notes / active=true in place rather
    than inserting a duplicate.

    Implementation note: we explicitly select-then-update-or-insert rather
    than using PostgREST's upsert, because the unique-constraint shape
    that supabase-py's on_conflict expects can't be expressed cleanly
    when one of the conflict columns (playthrough_id) is nullable —
    Postgres treats NULLs as distinct in unique indexes by default, and
    the workarounds (COALESCE-wrapped index, NULLS NOT DISTINCT, or two
    partial indexes) all conflict with on_conflict's "exact column list"
    requirement. The manual flow below is single-writer-safe, which
    matches how narrator-state is actually used.
    """
    if category not in VALID_CORRECTION_CATEGORIES:
        return _err(f"Invalid category {category!r}. Valid: {sorted(VALID_CORRECTION_CATEGORIES)}")
    client, err = require_client()
    if err:
        return _err(err)
    pt = None
    if playthrough_scoped:
        pt, e = _require_playthrough(project)
        if e:
            return e
    day, t = get_clock(project)
    try:
        # Look up any existing row with the same (project, playthrough-scope, slug).
        # `playthrough_id IS NULL` and `playthrough_id = <uuid>` need different
        # filter operators in PostgREST — handle both branches.
        q = (
            client.table("narrator_corrections")
            .select("id")
            .eq("project_id", project)
            .eq("rule_slug", rule_slug)
        )
        if pt is None:
            q = q.is_("playthrough_id", "null")
        else:
            q = q.eq("playthrough_id", pt)
        existing = q.limit(1).execute()

        row = {
            "project_id": project,
            "playthrough_id": pt,
            "rule_slug": rule_slug,
            "rule_text": rule_text,
            "category": category,
            "surfaced_at_day": day,
            "surfaced_at_time": t,
            "active": True,
            "notes": notes or None,
        }

        if existing.data:
            existing_id = existing.data[0]["id"]
            client.table("narrator_corrections").update(row).eq("id", existing_id).execute()
            return _ok(id=existing_id, scope=("playthrough" if pt else "project"), updated=True)
        r = client.table("narrator_corrections").insert(row).execute()
        return _ok(id=r.data[0]["id"], scope=("playthrough" if pt else "project"), updated=False)
    except Exception as e:
        return _err(str(e))


@mcp.tool()
def list_active_corrections(project: str) -> dict:
    """Active corrections that apply right now: project-wide (playthrough_id IS NULL)
    plus current-playthrough-scoped ones. Call at session start to load into context."""
    client, err = require_client()
    if err:
        return _err(err)
    pt = get_playthrough_id(project)  # may be None; that's OK, just gets project-wide rules
    try:
        # Two queries OR'd — supabase-py's filters don't compose OR cleanly,
        # so we do two roundtrips and merge.
        project_wide = (
            client.table("narrator_corrections")
            .select("rule_slug, rule_text, category, surfaced_at_day, surfaced_at_time, notes")
            .eq("project_id", project)
            .is_("playthrough_id", "null")
            .eq("active", True)
            .order("category").order("surfaced_at_day")
            .execute()
        )
        rows = list(project_wide.data or [])
        if pt:
            pt_scoped = (
                client.table("narrator_corrections")
                .select("rule_slug, rule_text, category, surfaced_at_day, surfaced_at_time, notes")
                .eq("project_id", project)
                .eq("playthrough_id", pt)
                .eq("active", True)
                .order("category").order("surfaced_at_day")
                .execute()
            )
            rows.extend(pt_scoped.data or [])
        return _ok(corrections=rows, count=len(rows))
    except Exception as e:
        return _err(str(e))


@mcp.tool()
def deactivate_correction(project: str, rule_slug: str) -> dict:
    """Retire a correction that no longer applies."""
    client, err = require_client()
    if err:
        return _err(err)
    try:
        r = (
            client.table("narrator_corrections")
            .update({"active": False})
            .eq("project_id", project)
            .eq("rule_slug", rule_slug)
            .execute()
        )
        return _ok(deactivated=rule_slug, rows_affected=len(r.data or []))
    except Exception as e:
        return _err(str(e))


# ===========================================================================
# 4. recurring_bits
# ===========================================================================


@mcp.tool()
def log_bit(
    project: str,
    bit_slug: str,
    bit_text: str,
    parties: list[str] | None = None,
    origin_context: str = "",
) -> dict:
    """Record a new recurring gag / catchphrase."""
    client, err = require_client()
    if err:
        return _err(err)
    pt, e = _require_playthrough(project)
    if e:
        return e
    day, t = get_clock(project)
    try:
        r = (
            client.table("recurring_bits")
            .upsert({
                "project_id": project,
                "playthrough_id": pt,
                "bit_slug": bit_slug,
                "bit_text": bit_text,
                "origin_day": day,
                "origin_time": t,
                "origin_context": origin_context or None,
                "parties": [p.upper() for p in (parties or [])],
                "last_used_day": day,
                "last_used_time": t,
                "status": "active",
            }, on_conflict="playthrough_id,bit_slug")
            .execute()
        )
        return _ok(id=r.data[0]["id"])
    except Exception as e:
        return _err(str(e))


@mcp.tool()
def bump_bit(project: str, bit_slug: str) -> dict:
    """Mark a bit as used in the current scene — updates last_used + increments use_count."""
    client, err = require_client()
    if err:
        return _err(err)
    pt, e = _require_playthrough(project)
    if e:
        return e
    day, t = get_clock(project)
    try:
        current = (
            client.table("recurring_bits")
            .select("use_count")
            .eq("playthrough_id", pt)
            .eq("bit_slug", bit_slug)
            .limit(1)
            .execute()
        )
        if not current.data:
            return _err(f"Bit {bit_slug!r} not found. Use log_bit to create it first.")
        new_count = (current.data[0].get("use_count") or 0) + 1
        (
            client.table("recurring_bits")
            .update({
                "last_used_day": day,
                "last_used_time": t,
                "use_count": new_count,
            })
            .eq("playthrough_id", pt)
            .eq("bit_slug", bit_slug)
            .execute()
        )
        return _ok(bit=bit_slug, use_count=new_count)
    except Exception as e:
        return _err(str(e))


@mcp.tool()
def list_active_bits(project: str) -> dict:
    """Active bits, sorted by most-recently-used. Call at session start."""
    client, err = require_client()
    if err:
        return _err(err)
    pt, e = _require_playthrough(project)
    if e:
        return e
    try:
        r = (
            client.table("recurring_bits")
            .select("bit_slug, bit_text, parties, last_used_day, last_used_time, use_count, origin_context")
            .eq("playthrough_id", pt)
            .eq("status", "active")
            .order("last_used_day", desc=True).order("last_used_time", desc=True)
            .execute()
        )
        return _ok(bits=r.data or [])
    except Exception as e:
        return _err(str(e))


# ===========================================================================
# 5. residency_map
# ===========================================================================


@mcp.tool()
def place_character(
    project: str,
    character_id: str,
    location_slug: str,
    notes: str = "",
) -> dict:
    """Place a character at a location. Closes any existing 'current' row for them."""
    client, err = require_client()
    if err:
        return _err(err)
    pt, e = _require_playthrough(project)
    if e:
        return e
    day, t = get_clock(project)
    cid = character_id.upper()
    try:
        # Close existing current row(s) for this character.
        (
            client.table("residency_map")
            .update({"status": "past", "departed_day": day, "departed_time": t})
            .eq("playthrough_id", pt)
            .eq("character_id", cid)
            .eq("status", "current")
            .execute()
        )
        r = (
            client.table("residency_map")
            .insert({
                "project_id": project,
                "playthrough_id": pt,
                "character_id": cid,
                "location_slug": location_slug,
                "arrived_day": day,
                "arrived_time": t,
                "status": "current",
                "notes": notes or None,
            })
            .execute()
        )
        return _ok(id=r.data[0]["id"], character_id=cid, location_slug=location_slug)
    except Exception as e:
        return _err(str(e))


@mcp.tool()
def who_is_at(project: str, location_slug: str) -> dict:
    """Characters currently at a location."""
    client, err = require_client()
    if err:
        return _err(err)
    pt, e = _require_playthrough(project)
    if e:
        return e
    try:
        r = (
            client.table("residency_map")
            .select("character_id, arrived_day, arrived_time, notes")
            .eq("playthrough_id", pt)
            .eq("location_slug", location_slug)
            .eq("status", "current")
            .execute()
        )
        return _ok(location_slug=location_slug, characters=r.data or [])
    except Exception as e:
        return _err(str(e))


@mcp.tool()
def where_is(project: str, character_id: str) -> dict:
    """Current location of a character, or {found: False}."""
    client, err = require_client()
    if err:
        return _err(err)
    pt, e = _require_playthrough(project)
    if e:
        return e
    try:
        r = (
            client.table("residency_map")
            .select("location_slug, arrived_day, arrived_time, notes")
            .eq("playthrough_id", pt)
            .eq("character_id", character_id.upper())
            .eq("status", "current")
            .limit(1)
            .execute()
        )
        if not r.data:
            return _ok(found=False, character_id=character_id.upper())
        return _ok(found=True, character_id=character_id.upper(), **r.data[0])
    except Exception as e:
        return _err(str(e))


@mcp.tool()
def list_location_residents(project: str) -> dict:
    """All current location placements. For orientation at session start."""
    client, err = require_client()
    if err:
        return _err(err)
    pt, e = _require_playthrough(project)
    if e:
        return e
    try:
        r = (
            client.table("residency_map")
            .select("character_id, location_slug, arrived_day, arrived_time, notes")
            .eq("playthrough_id", pt)
            .eq("status", "current")
            .order("location_slug").order("character_id")
            .execute()
        )
        return _ok(residents=r.data or [])
    except Exception as e:
        return _err(str(e))


# ===========================================================================
# 6. pending_beats
# ===========================================================================


@mcp.tool()
def add_pending_beat(
    project: str,
    beat_slug: str,
    description: str,
    earliest_day: int | None = None,
    earliest_time: str | None = None,
    latest_day: int | None = None,
    latest_time: str | None = None,
    trigger_type: str = "time",
    trigger_detail: str = "",
    parties: list[str] | None = None,
    notes: str = "",
) -> dict:
    """Record a story commitment waiting to land.

    trigger_type: 'time' | 'location' | 'event' | 'player_initiated'
    """
    if trigger_type not in VALID_BEAT_TRIGGERS:
        return _err(f"Invalid trigger_type {trigger_type!r}. Valid: {sorted(VALID_BEAT_TRIGGERS)}")
    client, err = require_client()
    if err:
        return _err(err)
    pt, e = _require_playthrough(project)
    if e:
        return e
    day, t = get_clock(project)
    try:
        r = (
            client.table("pending_beats")
            .upsert({
                "project_id": project,
                "playthrough_id": pt,
                "beat_slug": beat_slug,
                "description": description,
                "earliest_day": earliest_day,
                "earliest_time": earliest_time,
                "latest_day": latest_day,
                "latest_time": latest_time,
                "trigger_type": trigger_type,
                "trigger_detail": trigger_detail or None,
                "parties": [p.upper() for p in (parties or [])],
                "notes": notes or None,
                "status": "pending",
                "created_day": day,
                "created_time": t,
            }, on_conflict="playthrough_id,beat_slug")
            .execute()
        )
        return _ok(id=r.data[0]["id"], beat_slug=beat_slug)
    except Exception as e:
        return _err(str(e))


@mcp.tool()
def land_beat(project: str, beat_slug: str, notes: str = "") -> dict:
    """Mark a pending beat as landed in the current scene."""
    client, err = require_client()
    if err:
        return _err(err)
    pt, e = _require_playthrough(project)
    if e:
        return e
    day, t = get_clock(project)
    try:
        r = (
            client.table("pending_beats")
            .update({
                "status": "landed",
                "landed_day": day,
                "landed_time": t,
                "notes": notes or None,
            })
            .eq("playthrough_id", pt)
            .eq("beat_slug", beat_slug)
            .eq("status", "pending")
            .execute()
        )
        if not r.data:
            return _err(f"No pending beat {beat_slug!r} to land.")
        return _ok(landed=beat_slug, story_day=day, story_time=t)
    except Exception as e:
        return _err(str(e))


@mcp.tool()
def cancel_beat(project: str, beat_slug: str, notes: str = "") -> dict:
    """Cancel a pending beat (the situation that motivated it changed)."""
    client, err = require_client()
    if err:
        return _err(err)
    pt, e = _require_playthrough(project)
    if e:
        return e
    try:
        r = (
            client.table("pending_beats")
            .update({"status": "cancelled", "notes": notes or None})
            .eq("playthrough_id", pt)
            .eq("beat_slug", beat_slug)
            .eq("status", "pending")
            .execute()
        )
        if not r.data:
            return _err(f"No pending beat {beat_slug!r} to cancel.")
        return _ok(cancelled=beat_slug)
    except Exception as e:
        return _err(str(e))


@mcp.tool()
def list_pending_beats(project: str, include_overdue: bool = True) -> dict:
    """All pending beats. With include_overdue=True (default), partitions the
    result into `pending` (still in time-window) and `overdue` (past their
    latest_time)."""
    client, err = require_client()
    if err:
        return _err(err)
    pt, e = _require_playthrough(project)
    if e:
        return e
    day, t = get_clock(project)
    try:
        r = (
            client.table("pending_beats")
            .select("*")
            .eq("playthrough_id", pt)
            .eq("status", "pending")
            .order("latest_day").order("latest_time")
            .execute()
        )
        rows = r.data or []
        if not include_overdue:
            return _ok(pending=rows)
        pending: list[dict] = []
        overdue: list[dict] = []
        for beat in rows:
            ld, lt = beat.get("latest_day"), beat.get("latest_time")
            is_overdue = (
                ld is not None and lt is not None and
                (ld < day or (ld == day and lt < t))
            )
            (overdue if is_overdue else pending).append(beat)
        return _ok(pending=pending, overdue=overdue)
    except Exception as e:
        return _err(str(e))
