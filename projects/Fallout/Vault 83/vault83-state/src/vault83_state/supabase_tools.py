"""Supabase-backed MCP tools and mirror helpers for vault83-state.

Adapted from hohenwald_state.supabase_tools. Extension surface: tier
transitions, advancement reviews, admission ledger inspections, depth,
anchor attendance, the Day-7 ending, plus the shared Pip-Boy journal.

Internal `_append_*` helpers run as best-effort mirrors from server.py;
they no-op silently when Supabase is unavailable. Public `list_*` tools
query the tables for the tracker artifact and session-startup orientation.
When Supabase is unconfigured, public tools return ok:False with a setup
hint. `_append_journal_entry` returns None loudly so add_journal_entry
surfaces the failure (the journal is Supabase-only by design).


# === Vault-83-specific Supabase tables — DDL (NOT executed; for reference) ===
#
# Plus the shared `journal_entries` table that vault83 already uses
# (columns: id, project_id, playthrough_id, in_game_day, day_of_week,
# in_game_time, entry, delivery_from, pertains_to, note_type, created_at).
# The journal table is NOT created here — it is the shared roleplay-repo
# journal, written by add_journal_entry with project_id='vault83'.
#
# -- vault83_tier_transitions
# CREATE TABLE vault83_tier_transitions (
#   id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
#   project_id      text NOT NULL DEFAULT 'vault83',
#   playthrough_id  uuid NOT NULL,
#   character_id    text NOT NULL,
#   story_day       int NOT NULL,
#   story_time      text NOT NULL,
#   from_tier       text,
#   to_tier         text NOT NULL,
#   reason          text NOT NULL,
#   notes           text,
#   created_at      timestamptz DEFAULT now()
# );
#
# -- vault83_advancement_reviews
# CREATE TABLE vault83_advancement_reviews (
#   id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
#   project_id      text NOT NULL DEFAULT 'vault83',
#   playthrough_id  uuid NOT NULL,
#   character_id    text NOT NULL,
#   decision        text NOT NULL,
#   basis           text,
#   story_day       int NOT NULL DEFAULT 3,
#   notes           text,
#   created_at      timestamptz DEFAULT now()
# );
#
# -- vault83_admission_ledger_views
# CREATE TABLE vault83_admission_ledger_views (
#   id                   uuid PRIMARY KEY DEFAULT gen_random_uuid(),
#   project_id           text NOT NULL DEFAULT 'vault83',
#   playthrough_id       uuid NOT NULL,
#   ledger_section       text NOT NULL,
#   story_day            int NOT NULL,
#   story_time           text NOT NULL,
#   depth_gate_passed    int NOT NULL,
#   notes                text,
#   created_at           timestamptz DEFAULT now()
# );
#
# -- vault83_depth_log
# CREATE TABLE vault83_depth_log (
#   id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
#   project_id      text NOT NULL DEFAULT 'vault83',
#   playthrough_id  uuid NOT NULL,
#   story_day       int NOT NULL,
#   story_time      text NOT NULL,
#   from_depth      int NOT NULL,
#   to_depth        int NOT NULL,
#   reason          text NOT NULL,
#   created_at      timestamptz DEFAULT now()
# );
#
# -- vault83_anchor_attendance
# CREATE TABLE vault83_anchor_attendance (
#   id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
#   project_id      text NOT NULL DEFAULT 'vault83',
#   playthrough_id  uuid NOT NULL,
#   story_day       int NOT NULL,
#   anchor_key      text NOT NULL,
#   attendees       text[] NOT NULL,
#   notes           text,
#   created_at      timestamptz DEFAULT now()
# );
#
# -- vault83_endings
# CREATE TABLE vault83_endings (
#   id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
#   project_id      text NOT NULL DEFAULT 'vault83',
#   playthrough_id  uuid NOT NULL UNIQUE,    -- one ending per playthrough
#   ending_chosen   text NOT NULL,
#   basis           text,
#   story_day       int NOT NULL DEFAULT 7,
#   story_time      text,
#   notes           text,
#   created_at      timestamptz DEFAULT now()
# );
"""

from __future__ import annotations

from typing import Any

from .server import mcp, _err, _ok  # reuse the FastMCP instance + helpers
from .store import load_state
from .supabase_client import require_client


# ---------- Shared helpers (adapted from hohenwald_state.supabase_tools) ----------


def get_playthrough_id(project: str) -> str | None:
    """Read playthrough_id from local state. None if not minted yet."""
    state, _ = load_state(project)
    return state.get("playthrough_id")


def get_clock(project: str) -> tuple[int, str]:
    """Return (story_day, story_time) for stamping rows."""
    state, _ = load_state(project)
    clk = state["clock"]
    return int(clk["story_day"]), str(clk["story_time"])


def _require_playthrough(project: str) -> tuple[str | None, dict | None]:
    """Resolve playthrough_id; return (pt_id, error_dict). One is None."""
    pt = get_playthrough_id(project)
    if not pt:
        return None, _err("No active playthrough_id. Call start_session(project) first — "
                          "it mints a UUID the first time it runs against a fresh state.")
    return pt, None


def _query_preamble(project: str) -> tuple[Any, str | None, dict | None]:
    """Resolve client + playthrough_id together. Returns (client, pt, err_dict).
    On any failure, err_dict is set and client/pt are None."""
    client, err = require_client()
    if err:
        return None, None, _err(err)
    pt, e = _require_playthrough(project)
    if e:
        return None, None, e
    return client, pt, None


# ---------- Internal mirror helpers (called from server.py) ----------
# Best-effort side-effects of the core mutation tools; silently no-op when
# Supabase is unavailable. Local JSON is the source of truth except for
# the Pip-Boy journal, which lives only in journal_entries.


def _insert(project: str, table: str, payload: dict) -> dict[str, Any] | None:
    """Shared insert path. Returns first row or None on any failure."""
    client = require_client()[0]
    if client is None:
        return None
    pt = get_playthrough_id(project)
    if not pt:
        return None
    payload = {"project_id": project, "playthrough_id": pt, **payload}
    try:
        r = client.table(table).insert(payload).execute()
        return r.data[0] if r.data else None
    except Exception:
        return None


def _append_tier_transition(
    project: str,
    character_id: str,
    story_day: int,
    story_time: str,
    from_tier: str,
    to_tier: str,
    reason: str,
    notes: str = "",
) -> dict[str, Any] | None:
    return _insert(project, "vault83_tier_transitions", {
        "character_id": character_id.upper(),
        "story_day": story_day,
        "story_time": story_time,
        "from_tier": from_tier or None,
        "to_tier": to_tier,
        "reason": reason,
        "notes": notes or None,
    })


def _append_advancement_review(
    project: str,
    character_id: str,
    decision: str,
    basis: str = "",
    story_day: int = 3,
    notes: str = "",
) -> dict[str, Any] | None:
    return _insert(project, "vault83_advancement_reviews", {
        "character_id": character_id.upper(),
        "decision": decision,
        "basis": basis or None,
        "story_day": story_day,
        "notes": notes or None,
    })


def _append_ledger_view(
    project: str,
    ledger_section: str,
    story_day: int,
    story_time: str,
    depth_gate_passed: int,
    notes: str = "",
) -> dict[str, Any] | None:
    return _insert(project, "vault83_admission_ledger_views", {
        "ledger_section": ledger_section,
        "story_day": story_day,
        "story_time": story_time,
        "depth_gate_passed": depth_gate_passed,
        "notes": notes or None,
    })


def _append_depth_log(
    project: str,
    from_depth: int,
    to_depth: int,
    reason: str,
) -> dict[str, Any] | None:
    day, t = get_clock(project)
    return _insert(project, "vault83_depth_log", {
        "story_day": day,
        "story_time": t,
        "from_depth": from_depth,
        "to_depth": to_depth,
        "reason": reason,
    })


def _append_anchor_attendance(
    project: str,
    anchor_key: str,
    attendees: list[str],
    notes: str = "",
) -> dict[str, Any] | None:
    day, _ = get_clock(project)
    return _insert(project, "vault83_anchor_attendance", {
        "story_day": day,
        "anchor_key": anchor_key,
        "attendees": [a.upper() for a in attendees],
        "notes": notes or None,
    })


def _append_ending(
    project: str,
    ending_chosen: str,
    basis: str = "",
    story_day: int = 7,
    story_time: str = "",
    notes: str = "",
) -> dict[str, Any] | None:
    return _insert(project, "vault83_endings", {
        "ending_chosen": ending_chosen,
        "basis": basis or None,
        "story_day": story_day,
        "story_time": story_time or None,
        "notes": notes or None,
    })


def _append_journal_entry(
    project: str,
    in_game_day: int,
    day_of_week: str,
    in_game_time: str,
    entry: str,
    note_type: str = "observation",
    delivery_from: str | None = None,
    pertains_to: str | None = None,
) -> dict[str, Any] | None:
    """Write to the SHARED journal_entries table; project_id='vault83'."""
    return _insert(project, "journal_entries", {
        "in_game_day": in_game_day,
        "day_of_week": day_of_week,
        "in_game_time": in_game_time,
        "entry": entry,
        "note_type": note_type,
        "delivery_from": delivery_from,
        "pertains_to": pertains_to,
    })


# ---------- Public query tools (for the narrator or tracker) ----------


@mcp.tool()
def list_tier_transitions(
    project: str = "vault83",
    character_id: str | None = None,
    limit: int = 50,
) -> dict:
    """Tier transitions, newest first. Filter by character_id. Use to see who
    has moved tiers this playthrough — Reeve's Day-3 demotion is the typical
    row; ledger_reckoning rows show post-Rupture restorations."""
    client, pt, err = _query_preamble(project)
    if err:
        return err
    try:
        q = (
            client.table("vault83_tier_transitions")
            .select("character_id, story_day, story_time, from_tier, to_tier, "
                    "reason, notes, created_at")
            .eq("playthrough_id", pt)
        )
        if character_id:
            q = q.eq("character_id", character_id.upper())
        r = (
            q.order("story_day", desc=True).order("story_time", desc=True)
             .limit(max(1, min(limit, 200)))
             .execute()
        )
        return _ok(transitions=r.data or [])
    except Exception as e:
        return _err(str(e))


@mcp.tool()
def list_advancement_reviews(
    project: str = "vault83",
    limit: int = 50,
) -> dict:
    """Advancement Review hearings on record, newest first. One row per outcome."""
    client, pt, err = _query_preamble(project)
    if err:
        return err
    try:
        r = (
            client.table("vault83_advancement_reviews")
            .select("character_id, decision, basis, story_day, notes, created_at")
            .eq("playthrough_id", pt)
            .order("story_day", desc=True).order("created_at", desc=True)
            .limit(max(1, min(limit, 200)))
            .execute()
        )
        return _ok(reviews=r.data or [])
    except Exception as e:
        return _err(str(e))


@mcp.tool()
def list_ledger_views(project: str = "vault83", limit: int = 20) -> dict:
    """Admission Ledger inspections, newest first. Public copy (DEPTH ≤ 2)
    and sub-basement terminal (DEPTH 4+) both appear here."""
    client, pt, err = _query_preamble(project)
    if err:
        return err
    try:
        r = (
            client.table("vault83_admission_ledger_views")
            .select("ledger_section, story_day, story_time, depth_gate_passed, "
                    "notes, created_at")
            .eq("playthrough_id", pt)
            .order("story_day", desc=True).order("story_time", desc=True)
            .limit(max(1, min(limit, 100)))
            .execute()
        )
        return _ok(views=r.data or [])
    except Exception as e:
        return _err(str(e))


@mcp.tool()
def list_depth_log(project: str = "vault83", limit: int = 20) -> dict:
    """DEPTH ladder transitions, newest first. One row per bump_depth call,
    with the narrator's reason."""
    client, pt, err = _query_preamble(project)
    if err:
        return err
    try:
        r = (
            client.table("vault83_depth_log")
            .select("story_day, story_time, from_depth, to_depth, reason, created_at")
            .eq("playthrough_id", pt)
            .order("story_day", desc=True).order("story_time", desc=True)
            .limit(max(1, min(limit, 100)))
            .execute()
        )
        return _ok(transitions=r.data or [])
    except Exception as e:
        return _err(str(e))


@mcp.tool()
def list_anchor_attendance(
    project: str = "vault83",
    anchor_key: str | None = None,
    story_day: int | None = None,
    limit: int = 50,
) -> dict:
    """Anchor attendance records. Filter by anchor_key and/or story_day. Useful
    for spotting who skipped the Morning Hymn or who was in the cafeteria
    when a rumor moved."""
    client, pt, err = _query_preamble(project)
    if err:
        return err
    try:
        q = (
            client.table("vault83_anchor_attendance")
            .select("story_day, anchor_key, attendees, notes, created_at")
            .eq("playthrough_id", pt)
        )
        if anchor_key:
            q = q.eq("anchor_key", anchor_key)
        if story_day is not None:
            q = q.eq("story_day", story_day)
        r = (
            q.order("story_day", desc=True).order("anchor_key")
             .limit(max(1, min(limit, 200)))
             .execute()
        )
        return _ok(attendance=r.data or [])
    except Exception as e:
        return _err(str(e))


@mcp.tool()
def list_journal_entries(
    project: str = "vault83",
    in_game_day: int | None = None,
    note_type: str | None = None,
    pertains_to: str | None = None,
    limit: int = 50,
) -> dict:
    """Caleb's pocket-journal entries from the shared journal_entries table.
    Filter by in_game_day, note_type, or pertains_to. Ordered ascending by
    (in_game_day, in_game_time) so rereads flip forward through pages."""
    client, pt, err = _query_preamble(project)
    if err:
        return err
    try:
        q = (
            client.table("journal_entries")
            .select("in_game_day, day_of_week, in_game_time, entry, note_type, "
                    "delivery_from, pertains_to, created_at")
            .eq("playthrough_id", pt)
        )
        if in_game_day is not None:
            q = q.eq("in_game_day", in_game_day)
        if note_type:
            q = q.eq("note_type", note_type)
        if pertains_to:
            q = q.eq("pertains_to", pertains_to)
        r = (
            q.order("in_game_day").order("in_game_time")
             .limit(max(1, min(limit, 500)))
             .execute()
        )
        return _ok(entries=r.data or [])
    except Exception as e:
        return _err(str(e))


@mcp.tool()
def get_ending(project: str = "vault83") -> dict:
    """Recorded Day-7 ending for this playthrough, or None. Single-row lookup."""
    client, pt, err = _query_preamble(project)
    if err:
        return err
    try:
        r = (
            client.table("vault83_endings")
            .select("ending_chosen, basis, story_day, story_time, notes, created_at")
            .eq("playthrough_id", pt)
            .limit(1)
            .execute()
        )
        rows = r.data or []
        return _ok(ending=rows[0] if rows else None)
    except Exception as e:
        return _err(str(e))
