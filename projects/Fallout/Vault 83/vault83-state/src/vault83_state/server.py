"""FastMCP server for vault83-state.

Each tool: load -> validate -> mutate -> audit-append -> save -> structured
response. Adapted from hohenwald_state.server. Tool surface is
Vault-83-specific: the Tier Protocol, the Day-3 Advancement Review, DEPTH,
the Admission Ledger, daily anchors, the Pip-Boy journal, the Day-7 Choice.
"""

from __future__ import annotations

import copy
import uuid
from datetime import datetime, timezone
from typing import Any

from mcp.server.fastmcp import FastMCP

from .schema import (
    DAILY_ANCHORS,
    DAY_OF_WEEK_FOR_STORY_DAY,
    KNOWN_FLAGS,
    VALID_ADVANCEMENT_DECISIONS,
    VALID_CHOICE_ENDINGS,
    VALID_DAY_NAMES,
    VALID_DEPTH_VALUES,
    VALID_LEVELS,
    VALID_NOTE_TYPES,
    VALID_RELATIONSHIPS,
    VALID_TIERS,
    VALID_TIER_TRANSITION_REASONS,
    default_state,
)
from .store import (
    append_audit,
    backup_state,
    load_state,
    next_id,
    pop_audit,
    save_state,
)


mcp = FastMCP("vault83-state", host="127.0.0.1", port=8767)


# ---------- Helpers (adapted from hohenwald_state.server) ----------


def _now_iso() -> str:
    return datetime.now(timezone.utc).isoformat(timespec="seconds")


def _err(message: str) -> dict:
    """Build an error response payload."""
    return {"ok": False, "error": message}


def _ok(**fields: Any) -> dict:
    """Build a success response payload."""
    return {"ok": True, **fields}


def _current_turn(state: dict) -> int:
    """Increment and return the current session's turn counter."""
    sid = state["session"]["current_session_id"]
    if not sid:
        return 0
    for sess in state["session"]["sessions"]:
        if sess["id"] == sid:
            sess["turns"] += 1
            return sess["turns"]
    return 0


def _find_resident_or_error(state: dict, character_id: str) -> dict:
    """Return the resident dict, or raise a ToolError."""
    cid = character_id.upper()
    if cid not in state["residents"]:
        raise ToolError(f"Resident {cid!r} not found. Available: "
                        f"{sorted(state['residents'].keys())}. Use register_resident to add them.")
    return state["residents"][cid]


def _trim_state_for_get(
    state: dict, include_residents: bool, include_history: bool,
) -> dict:
    """get_state view of the full state. Hides _audit_log and _counters.
    Trims history arrays unless include_history; drops resident detail
    unless include_residents."""
    out = copy.deepcopy(state)
    out.pop("_audit_log", None)
    out.pop("_counters", None)

    if not include_residents:
        # Keep only present residents, summarised.
        kept: dict[str, dict] = {}
        for cid, r in out["residents"].items():
            if r.get("present"):
                kept[cid] = {
                    "display_name": r.get("display_name"),
                    "current_tier": r.get("current_tier"),
                    "level": r.get("level"),
                    "location_slug": r.get("location_slug"),
                    "caleb_relationship": r.get("caleb_relationship"),
                }
        out["residents"] = kept

    if not include_history:
        out["clock"]["history"] = out["clock"]["history"][-3:]
        out["session"]["sessions"] = out["session"]["sessions"][-3:]
        out["tier_transitions"] = out["tier_transitions"][-5:]
        out["admission_ledger_views"] = out["admission_ledger_views"][-5:]
        for cid in list(out["residents"].keys()):
            r = out["residents"][cid]
            if isinstance(r, dict) and "history" in r:
                r["history"] = r["history"][-3:]

    return out


class ToolError(Exception):
    """Raised by tool helpers to surface clean errors to MCP clients."""


# ---------- 1. Session and state ----------


@mcp.tool()
def start_session(project: str = "vault83", session_note: str = "") -> dict:
    """Begin a new session. Mints playthrough_id on first call."""
    try:
        state, created = load_state(project)

        # Mint playthrough_id if missing (fresh state or post-reset).
        minted_playthrough = False
        if not state.get("playthrough_id"):
            state["playthrough_id"] = str(uuid.uuid4())
            minted_playthrough = True

        # Implicitly close any open session.
        if state["session"]["current_session_id"]:
            for sess in state["session"]["sessions"]:
                if (
                    sess["id"] == state["session"]["current_session_id"]
                    and sess["ended"] is None
                ):
                    sess["ended"] = _now_iso()

        state["session"]["session_count"] += 1
        new_id = f"s-{state['session']['session_count']:03d}"
        state["session"]["current_session_id"] = new_id
        state["session"]["sessions"].append({
            "id": new_id,
            "started": _now_iso(),
            "ended": None,
            "turns": 0,
            "note": session_note,
        })

        append_audit(state, {
            "op": "start_session",
            "session_id": new_id,
            "minted_playthrough": minted_playthrough,
        })
        save_state(project, state)

        view = _trim_state_for_get(state, include_residents=False, include_history=False)
        view["_meta"] = {
            "created_now": created,
            "session_id": new_id,
            "playthrough_id": state["playthrough_id"],
            "minted_playthrough_id": minted_playthrough,
        }
        return _ok(
            state=view,
            session_id=new_id,
            playthrough_id=state["playthrough_id"],
        )
    except Exception as e:
        return _err(str(e))


@mcp.tool()
def end_session(project: str = "vault83", summary: str = "") -> dict:
    """Close the current session. Records end time + optional summary."""
    try:
        state, _ = load_state(project)
        sid = state["session"]["current_session_id"]
        if not sid:
            return _err("No active session to end.")
        for sess in state["session"]["sessions"]:
            if sess["id"] == sid:
                sess["ended"] = _now_iso()
                if summary:
                    sess["summary"] = summary
                break
        state["session"]["current_session_id"] = None
        append_audit(state, {"op": "end_session", "session_id": sid})
        save_state(project, state)
        return _ok(session_id=sid)
    except Exception as e:
        return _err(str(e))


@mcp.tool()
def get_state(
    project: str = "vault83",
    include_residents: bool = True,
    include_history: bool = False,
) -> dict:
    """Return current state. Trims internal fields. Set include_residents=False
    for a presence-summary view; set include_history=True for full history."""
    try:
        state, created = load_state(project)
        view = _trim_state_for_get(state, include_residents, include_history)
        view["_meta"] = {
            "created_now": created,
            "schema_version": state["schema_version"],
        }
        return _ok(state=view)
    except Exception as e:
        return _err(str(e))


@mcp.tool()
def reset_state(project: str = "vault83", confirm: bool = False) -> dict:
    """Wipe state back to the fresh default. Destructive. Backs up to
    ~/.vault83-state/backups/ first; pass confirm=True to execute."""
    if not confirm:
        return _err("reset_state is destructive — it overwrites the current playthrough "
                    "with a fresh default state. Pass confirm=True to execute. "
                    "The current state will be backed up first.")
    try:
        state, was_created = load_state(project)
        if was_created:
            return _ok(reset=False, reason="State was empty — already at defaults.")

        day = state.get("clock", {}).get("story_day", 0)
        label = f"pre-reset-day{day}"
        backup_path = backup_state(project, label=label)

        cleared = {
            "residents":             len(state.get("residents", {})),
            "lost":                  len(state.get("lost", [])),
            "liaison_class_members": len(state.get("liaison_class_members", [])),
            "tier_transitions":      len(state.get("tier_transitions", [])),
            "ledger_views":          len(state.get("admission_ledger_views", [])),
            "inventory":             len(state.get("player", {}).get("inventory", [])),
            "audit_log":             len(state.get("_audit_log", [])),
            "flags_set":             sum(1 for v in state.get("flags", {}).values() if v),
        }

        # Preserve `created` + `title`; reset playthrough_id (new run gets fresh UUID).
        fresh = default_state(project, title=state.get("title"))
        fresh["created"] = state.get("created", fresh["created"])
        save_state(project, fresh)

        return _ok(reset=True, backup=str(backup_path), cleared=cleared)
    except Exception as e:
        return _err(str(e))


# ---------- 2. Clock, level, anchors ----------


@mcp.tool()
def advance_clock(
    project: str = "vault83",
    new_time: str = "",
    new_day: int | None = None,
    new_level: str | None = None,
    new_location_slug: str | None = None,
) -> dict:
    """Set clock to HH:MM, optionally moving the protagonist.

    Vault 83 tracks `level` (1/2/3/4/sub_basement) explicitly. If new_time
    rolls past midnight AND new_day isn't supplied, story_day increments
    and day_of_week rolls. Pass new_day to skip days explicitly.
    """
    try:
        if not new_time:
            return _err("new_time is required (HH:MM, 24-hour).")
        if len(new_time) != 5 or new_time[2] != ":":
            return _err(f"new_time must be HH:MM, got {new_time!r}.")
        if new_level is not None and new_level not in VALID_LEVELS:
            return _err(f"Invalid level {new_level!r}. Valid: {sorted(VALID_LEVELS)}")
        if new_day is not None and new_day not in DAY_OF_WEEK_FOR_STORY_DAY:
            return _err(f"new_day must be 1-7, got {new_day}.")

        state, _ = load_state(project)
        clk = state["clock"]
        prev = {
            "story_day": clk["story_day"],
            "day_of_week": clk["day_of_week"],
            "story_time": clk["story_time"],
            "level": clk["level"],
            "location_slug": clk["location_slug"],
        }

        # Day rollover: if previous time was 18:00+ and new time is 00:00..07:59
        # AND new_day wasn't supplied explicitly, we crossed midnight.
        rolled_day = False
        if new_day is not None:
            if new_day != clk["story_day"]:
                clk["story_day"] = new_day
                clk["day_of_week"] = DAY_OF_WEEK_FOR_STORY_DAY[new_day]
                rolled_day = True
                state["daily_anchor_attendance"] = {}
        else:
            try:
                prev_hh = int(clk["story_time"].split(":")[0])
                new_hh = int(new_time.split(":")[0])
                if prev_hh >= 18 and new_hh <= 7:
                    if clk["story_day"] < 7:
                        clk["story_day"] += 1
                        clk["day_of_week"] = DAY_OF_WEEK_FOR_STORY_DAY[clk["story_day"]]
                        rolled_day = True
                        # New day clears today's anchor attendance.
                        state["daily_anchor_attendance"] = {}
            except (ValueError, KeyError):
                pass  # Best-effort parse; bad times don't crash the clock.

        clk["story_time"] = new_time
        if new_level is not None:
            clk["level"] = new_level
        if new_location_slug is not None:
            clk["location_slug"] = new_location_slug

        clk["history"].append({
            "turn": _current_turn(state),
            "story_day": clk["story_day"],
            "day_of_week": clk["day_of_week"],
            "story_time": new_time,
            "level": clk["level"],
            "location_slug": clk["location_slug"],
            "depth": clk["depth"],
        })

        append_audit(state, {"op": "advance_clock", "prev": prev, "rolled_day": rolled_day})
        save_state(project, state)
        return _ok(clock=clk, rolled_day=rolled_day)
    except Exception as e:
        return _err(str(e))


@mcp.tool()
def enter_anchor(project: str = "vault83", anchor_key: str = "") -> dict:
    """Switch into a named daily anchor. Returns expected attendees (every
    present, living resident). Useful for the Morning Hymn / dinner framing."""
    try:
        if anchor_key not in DAILY_ANCHORS:
            return _err(f"Unknown anchor {anchor_key!r}. Valid: {sorted(DAILY_ANCHORS.keys())}")
        state, _ = load_state(project)
        prev = state["clock"].get("current_anchor")
        state["clock"]["current_anchor"] = anchor_key
        time_str, description = DAILY_ANCHORS[anchor_key]
        expected = [cid for cid, r in state["residents"].items() if r.get("present")]

        append_audit(state, {"op": "enter_anchor", "prev": prev, "anchor_key": anchor_key})
        save_state(project, state)
        return _ok(
            anchor_key=anchor_key,
            time=time_str,
            description=description,
            expected_attendees=sorted(expected),
        )
    except Exception as e:
        return _err(str(e))


@mcp.tool()
def exit_anchor(project: str = "vault83") -> dict:
    """Clear clock.current_anchor."""
    try:
        state, _ = load_state(project)
        prev = state["clock"].get("current_anchor")
        if prev is None:
            return _err("Not currently inside an anchor.")
        state["clock"]["current_anchor"] = None
        append_audit(state, {"op": "exit_anchor", "prev": prev})
        save_state(project, state)
        return _ok(exited_anchor=prev)
    except Exception as e:
        return _err(str(e))


@mcp.tool()
def mark_anchor_attendance(
    project: str = "vault83",
    anchor_key: str = "",
    attendees: list[str] | None = None,
    notes: str = "",
) -> dict:
    """Record who attended today's named anchor. Overwrites any prior
    record for the same anchor today. Mirrors to vault83_anchor_attendance."""
    try:
        if anchor_key not in DAILY_ANCHORS:
            return _err(f"Unknown anchor {anchor_key!r}. Valid: {sorted(DAILY_ANCHORS.keys())}")
        attendees = attendees or []
        state, _ = load_state(project)
        normalized = [a.upper() for a in attendees]

        # Validate every attendee exists.
        unknown = [a for a in normalized if a not in state["residents"]]
        if unknown:
            return _err(f"Unknown residents: {unknown}. Register them first.")

        prev = state["daily_anchor_attendance"].get(anchor_key)
        state["daily_anchor_attendance"][anchor_key] = {
            "story_day": state["clock"]["story_day"],
            "day_of_week": state["clock"]["day_of_week"],
            "attendees": normalized,
            "notes": notes,
        }

        append_audit(state, {
            "op": "mark_anchor_attendance",
            "anchor_key": anchor_key,
            "prev": prev,
        })
        save_state(project, state)

        try:
            from . import supabase_tools as _st
            _st._append_anchor_attendance(
                project=project,
                anchor_key=anchor_key,
                attendees=normalized,
                notes=notes,
            )
        except Exception:
            pass

        return _ok(
            anchor_key=anchor_key,
            story_day=state["clock"]["story_day"],
            attendees=normalized,
            absent=sorted(
                cid for cid, r in state["residents"].items()
                if r.get("present") and cid not in normalized
            ),
        )
    except Exception as e:
        return _err(str(e))


# ---------- 3. Residents — registration, placement, the Tier Protocol ----------


@mcp.tool()
def register_resident(
    project: str = "vault83",
    character_id: str = "",
    display_name: str = "",
    original_tier: str = "",
    level: str = "",
    room_slug: str = "",
    is_liaison: bool = False,
) -> dict:
    """Add a resident. Idempotent on collision.

    original_tier is the tier they were born to (the Admission Ledger's
    official record); current_tier starts equal and changes via
    record_tier_transition. is_liaison=True adds the character to
    state.liaison_class_members.
    """
    try:
        if not character_id:
            return _err("character_id is required.")
        if original_tier and original_tier not in VALID_TIERS:
            return _err(f"Invalid original_tier {original_tier!r}. Valid: {sorted(VALID_TIERS)}")
        if level and level not in VALID_LEVELS:
            return _err(f"Invalid level {level!r}. Valid: {sorted(VALID_LEVELS)}")
        state, _ = load_state(project)
        cid = character_id.upper()

        if cid in state["residents"]:
            return _ok(resident=state["residents"][cid], created=False)

        # Default the tier to "liaison" when the caller marks this character a Liaison.
        tier = original_tier or ("liaison" if is_liaison else "")
        resident = {
            "character_id": cid,
            "display_name": display_name or cid.title(),
            "present": True,
            "level": level or "",
            "location_slug": room_slug,
            "room_slug": room_slug,
            "current_tier": tier,
            "original_tier": tier,
            "last_anchor_attended": None,
            "caleb_relationship": "stranger",
            "is_liaison": bool(is_liaison),
            "notes": "",
            "history": [],
        }
        state["residents"][cid] = resident

        if is_liaison and cid not in state["liaison_class_members"]:
            state["liaison_class_members"].append(cid)

        append_audit(state, {"op": "register_resident", "character_id": cid,
                             "is_liaison": is_liaison})
        save_state(project, state)
        return _ok(resident=resident, created=True)
    except Exception as e:
        return _err(str(e))


@mcp.tool()
def place_resident(
    project: str = "vault83",
    character_id: str = "",
    level: str = "",
    location_slug: str = "",
) -> dict:
    """Move a resident to a different level / sub-location.

    Both args are individually optional but at least one is required.
    (Reeve moves Level 1 -> Level 4 on Day 3, 17:45.)
    """
    try:
        if not level and not location_slug:
            return _err("At least one of level or location_slug is required.")
        if level and level not in VALID_LEVELS:
            return _err(f"Invalid level {level!r}. Valid: {sorted(VALID_LEVELS)}")
        state, _ = load_state(project)
        resident = _find_resident_or_error(state, character_id)
        prev_level = resident.get("level")
        prev_loc = resident.get("location_slug")
        if level:
            resident["level"] = level
        if location_slug:
            resident["location_slug"] = location_slug

        append_audit(state, {
            "op": "place_resident",
            "character_id": character_id.upper(),
            "prev_level": prev_level,
            "prev_location": prev_loc,
        })
        save_state(project, state)
        return _ok(
            character_id=character_id.upper(),
            prev_level=prev_level,
            prev_location=prev_loc,
            new_level=resident["level"],
            new_location=resident["location_slug"],
        )
    except ToolError as e:
        return _err(str(e))
    except Exception as e:
        return _err(str(e))


@mcp.tool()
def update_relationship(
    project: str = "vault83",
    character_id: str = "",
    new_relationship: str = "",
    notes: str = "",
) -> dict:
    """Set the Caleb-NPC relationship label on a resident. Gradual movement;
    'in_love' is the romance terminus."""
    try:
        if new_relationship not in VALID_RELATIONSHIPS:
            return _err(f"Invalid relationship {new_relationship!r}. Valid: {sorted(VALID_RELATIONSHIPS)}")
        state, _ = load_state(project)
        resident = _find_resident_or_error(state, character_id)
        prev = resident.get("caleb_relationship")
        resident["caleb_relationship"] = new_relationship
        if notes:
            resident.setdefault("history", []).append({
                "turn": _current_turn(state),
                "story_day": state["clock"]["story_day"],
                "story_time": state["clock"]["story_time"],
                "kind": "relationship",
                "from": prev,
                "to": new_relationship,
                "notes": notes,
            })

        append_audit(state, {
            "op": "update_relationship",
            "character_id": character_id.upper(),
            "prev": prev,
            "new": new_relationship,
        })
        save_state(project, state)
        return _ok(
            character_id=character_id.upper(),
            prev=prev,
            new=new_relationship,
        )
    except ToolError as e:
        return _err(str(e))
    except Exception as e:
        return _err(str(e))


@mcp.tool()
def record_tier_transition(
    project: str = "vault83",
    character_id: str = "",
    from_tier: str = "",
    to_tier: str = "",
    reason: str = "",
    story_day: int | None = None,
    story_time: str | None = None,
    notes: str = "",
) -> dict:
    """Move a resident between tiers. The core Vault 83 mechanic.

    Updates current_tier; original_tier is preserved. Appends to
    vault83_tier_transitions (Supabase) as the canonical history; local
    state retains a last-20 mirror in state.tier_transitions. See
    VALID_TIER_TRANSITION_REASONS for the reason set.
    """
    try:
        if to_tier not in VALID_TIERS:
            return _err(f"Invalid to_tier {to_tier!r}. Valid: {sorted(VALID_TIERS)}")
        if from_tier and from_tier not in VALID_TIERS:
            return _err(f"Invalid from_tier {from_tier!r}. Valid: {sorted(VALID_TIERS)}")
        if reason not in VALID_TIER_TRANSITION_REASONS:
            return _err(f"Invalid reason {reason!r}. Valid: {sorted(VALID_TIER_TRANSITION_REASONS)}")

        state, _ = load_state(project)
        resident = _find_resident_or_error(state, character_id)
        cid = character_id.upper()
        actual_from = from_tier or resident.get("current_tier") or ""
        sd = story_day if story_day is not None else state["clock"]["story_day"]
        st = story_time if story_time is not None else state["clock"]["story_time"]

        resident["current_tier"] = to_tier
        transition = {
            "id": next_id(state, "tier_transition", "tt"),
            "character_id": cid,
            "story_day": sd,
            "story_time": st,
            "from_tier": actual_from,
            "to_tier": to_tier,
            "reason": reason,
            "notes": notes,
        }
        resident.setdefault("history", []).append({
            "turn": _current_turn(state),
            "story_day": sd,
            "story_time": st,
            "kind": "tier_transition",
            "from": actual_from,
            "to": to_tier,
            "reason": reason,
            "notes": notes,
        })
        state["tier_transitions"].append(transition)
        if len(state["tier_transitions"]) > 20:
            state["tier_transitions"] = state["tier_transitions"][-20:]

        # Reeve flag side-effects: Day-3 demotion + post-Rupture restoration.
        if cid == "REEVE" and actual_from.startswith("1") and to_tier.startswith("4") \
                and reason == "advancement_review":
            state["flags"]["reeve_demotion_executed"] = True
        if cid == "REEVE" and actual_from.startswith("4") and to_tier.startswith("1") \
                and reason == "ledger_reckoning":
            state["flags"]["reeve_demotion_reversed"] = True

        append_audit(state, {
            "op": "record_tier_transition",
            "transition_id": transition["id"],
            "character_id": cid,
            "from_tier": actual_from,
            "to_tier": to_tier,
            "reason": reason,
        })
        save_state(project, state)

        try:
            from . import supabase_tools as _st
            _st._append_tier_transition(
                project=project, character_id=cid, story_day=sd, story_time=st,
                from_tier=actual_from, to_tier=to_tier, reason=reason, notes=notes,
            )
        except Exception:
            pass

        return _ok(transition=transition)
    except ToolError as e:
        return _err(str(e))
    except Exception as e:
        return _err(str(e))


@mcp.tool()
def record_advancement_review_decision(
    project: str = "vault83",
    character_id: str = "",
    decision: str = "",
    from_tier: str = "",
    to_tier: str = "",
    basis: str = "",
    notes: str = "",
) -> dict:
    """Record the Day-3 Tribunal hearing outcome.

    Inlines a tier transition (reason='advancement_review') when the
    decision moves the candidate between tiers. Always appends to
    vault83_advancement_reviews. The Tribunal vote weighting and seed
    coalition motives are narrator-described; this captures only outcome
    and basis. See VALID_ADVANCEMENT_DECISIONS for valid decisions.
    """
    try:
        if decision not in VALID_ADVANCEMENT_DECISIONS:
            return _err(f"Invalid decision {decision!r}. Valid: {sorted(VALID_ADVANCEMENT_DECISIONS)}")
        state, _ = load_state(project)
        resident = _find_resident_or_error(state, character_id)
        cid = character_id.upper()
        sd = state["clock"]["story_day"]
        st = state["clock"]["story_time"]

        # If the decision is a tier-moving one, fold it into a tier_transition.
        moves_tier = decision in {"demotion_passed", "promotion_passed"}
        transition_id: str | None = None
        if moves_tier:
            if not to_tier or to_tier not in VALID_TIERS:
                return _err(f"decision {decision!r} requires a valid to_tier. Valid: {sorted(VALID_TIERS)}")
            actual_from = from_tier or resident.get("current_tier") or ""
            # Inline the tier transition rather than recursing the @mcp.tool.
            resident["current_tier"] = to_tier
            tt = {
                "id": next_id(state, "tier_transition", "tt"),
                "character_id": cid,
                "story_day": sd,
                "story_time": st,
                "from_tier": actual_from,
                "to_tier": to_tier,
                "reason": "advancement_review",
                "notes": notes,
            }
            state["tier_transitions"].append(tt)
            if len(state["tier_transitions"]) > 20:
                state["tier_transitions"] = state["tier_transitions"][-20:]
            transition_id = tt["id"]

            if (
                cid == "REEVE"
                and actual_from.startswith("1")
                and to_tier.startswith("4")
            ):
                state["flags"]["reeve_demotion_executed"] = True

            try:
                from . import supabase_tools as _st
                _st._append_tier_transition(
                    project=project,
                    character_id=cid,
                    story_day=sd,
                    story_time=st,
                    from_tier=actual_from,
                    to_tier=to_tier,
                    reason="advancement_review",
                    notes=notes,
                )
            except Exception:
                pass

        # Always log the Review row itself.
        review_id = next_id(state, "tier_transition", "rev")
        review_row = {
            "id": review_id,
            "character_id": cid,
            "decision": decision,
            "from_tier": from_tier,
            "to_tier": to_tier,
            "basis": basis,
            "notes": notes,
            "transition_id": transition_id,
            "story_day": sd,
            "story_time": st,
        }
        resident.setdefault("history", []).append({
            "turn": _current_turn(state),
            "story_day": sd,
            "story_time": st,
            "kind": "advancement_review",
            "decision": decision,
            "from_tier": from_tier,
            "to_tier": to_tier,
            "basis": basis,
            "notes": notes,
        })

        state["flags"]["advancement_review_attended"] = True

        append_audit(state, {
            "op": "record_advancement_review_decision",
            "review_id": review_id,
            "character_id": cid,
            "decision": decision,
            "linked_transition_id": transition_id,
        })
        save_state(project, state)

        try:
            from . import supabase_tools as _st
            _st._append_advancement_review(
                project=project,
                character_id=cid,
                decision=decision,
                basis=basis,
                story_day=sd,
                notes=notes,
            )
        except Exception:
            pass

        return _ok(review=review_row)
    except ToolError as e:
        return _err(str(e))
    except Exception as e:
        return _err(str(e))


# ---------- 4. The Admission Ledger (DEPTH 4+ artifact) ----------


@mcp.tool()
def record_ledger_view(
    project: str = "vault83",
    ledger_section: str = "",
    depth_gate_passed: int = -1,
    story_day: int | None = None,
    story_time: str | None = None,
    notes: str = "",
) -> dict:
    """Record an inspection of the Admission Ledger.

    Public copy = Level 1 Archive glass case. Original (unredacted) =
    sub-basement terminal, DEPTH 4+. `ledger_section` is a free-text slug
    naming what was looked at (e.g. 'public_full', 'plant_seven_names',
    'dane_confession_video', 'transmission_log_2085'). depth_gate_passed
    is the DEPTH at which this view happened (0-5); 0/1/2 = public copy,
    3/4/5 = sub-basement. Not DEPTH-enforced — narrator decides what
    counts. Mirrors to vault83_admission_ledger_views.
    """
    try:
        if not ledger_section:
            return _err("ledger_section is required (free-text slug).")
        if depth_gate_passed not in VALID_DEPTH_VALUES:
            return _err(f"depth_gate_passed must be 0-5, got {depth_gate_passed}.")
        state, _ = load_state(project)
        sd = story_day if story_day is not None else state["clock"]["story_day"]
        st = story_time if story_time is not None else state["clock"]["story_time"]

        view_id = next_id(state, "ledger_view", "lv")
        view = {
            "id": view_id,
            "ledger_section": ledger_section,
            "story_day": sd,
            "story_time": st,
            "depth_gate_passed": depth_gate_passed,
            "notes": notes,
        }
        state["admission_ledger_views"].append(view)
        if len(state["admission_ledger_views"]) > 20:
            state["admission_ledger_views"] = state["admission_ledger_views"][-20:]

        # Flag side-effects.
        if depth_gate_passed <= 2:
            state["flags"]["public_ledger_viewed"] = True
        if depth_gate_passed >= 4:
            state["flags"]["admission_ledger_seen"] = True
        # If both copies have been viewed, mark the comparison flag.
        if (
            state["flags"]["public_ledger_viewed"]
            and state["flags"]["admission_ledger_seen"]
        ):
            state["flags"]["original_ledger_compared"] = True

        append_audit(state, {"op": "record_ledger_view", "id": view_id})
        save_state(project, state)

        try:
            from . import supabase_tools as _st
            _st._append_ledger_view(
                project=project,
                ledger_section=ledger_section,
                story_day=sd,
                story_time=st,
                depth_gate_passed=depth_gate_passed,
                notes=notes,
            )
        except Exception:
            pass

        return _ok(view=view)
    except Exception as e:
        return _err(str(e))


# ---------- 5. The Pip-Boy / pocket journal (shared journal_entries) ----------


@mcp.tool()
def add_journal_entry(
    project: str = "vault83",
    entry: str = "",
    in_game_day: int | None = None,
    day_of_week: str | None = None,
    in_game_time: str | None = None,
    note_type: str = "observation",
    delivery_from: str | None = None,
    pertains_to: str | None = None,
) -> dict:
    """Write a line to Caleb's pocket journal (the Pip-Boy notebook).

    Persists to the SHARED `journal_entries` table (project_id='vault83').
    NOT mirrored locally — rereads go through Supabase. See VALID_NOTE_TYPES
    for note_type. Returns the inserted row, or an error if Supabase is
    unavailable.
    """
    try:
        if not entry or not entry.strip():
            return _err("entry text is required (the line Caleb is writing).")
        if note_type not in VALID_NOTE_TYPES:
            return _err(f"Invalid note_type {note_type!r}. Valid: {sorted(VALID_NOTE_TYPES)}")
        state, _ = load_state(project)
        sd = in_game_day if in_game_day is not None else state["clock"]["story_day"]
        dow = day_of_week or state["clock"]["day_of_week"]
        if dow not in VALID_DAY_NAMES:
            return _err(f"Invalid day_of_week {dow!r}. Valid: {sorted(VALID_DAY_NAMES)}")
        igt = in_game_time or state["clock"]["story_time"]

        # The append helper inserts into Supabase. We log the operation
        # locally for the audit trail but don't mirror the entry itself.
        append_audit(state, {
            "op": "add_journal_entry",
            "in_game_day": sd,
            "in_game_time": igt,
            "note_type": note_type,
        })
        save_state(project, state)

        try:
            from . import supabase_tools as _st
            row = _st._append_journal_entry(
                project=project,
                in_game_day=sd,
                day_of_week=dow,
                in_game_time=igt,
                entry=entry,
                note_type=note_type,
                delivery_from=delivery_from,
                pertains_to=pertains_to,
            )
        except Exception as e:
            return _err(f"journal write failed: {e}")

        if row is None:
            return _err("journal write returned no row — Supabase may be unconfigured. "
                        "The Pip-Boy journal requires the shared journal_entries table.")
        return _ok(entry=row)
    except Exception as e:
        return _err(str(e))


# ---------- 6. DEPTH and flags ----------


@mcp.tool()
def bump_depth(
    project: str = "vault83",
    new_depth: int = -1,
    reason: str = "",
) -> dict:
    """Tick the DEPTH ladder upward (0-5). Monotonic.

    Logs the change with a narrator-supplied reason; mirrors to
    vault83_depth_log on Supabase.
    """
    try:
        if new_depth not in VALID_DEPTH_VALUES:
            return _err(f"DEPTH must be 0-5, got {new_depth}. Valid: {sorted(VALID_DEPTH_VALUES)}")
        if not reason:
            return _err("reason is required — DEPTH advances need a why.")
        state, _ = load_state(project)
        current = state["clock"]["depth"]
        if new_depth <= current:
            return _err(f"DEPTH cannot decrease or stay equal. Current={current}, "
                        f"requested={new_depth}. DEPTH is monotonic.")
        state["clock"]["depth"] = new_depth
        state["clock"]["history"].append({
            "turn": _current_turn(state),
            "story_day": state["clock"]["story_day"],
            "story_time": state["clock"]["story_time"],
            "from_depth": current,
            "to_depth": new_depth,
            "reason": reason,
        })

        # DEPTH 3 is when the Tier Protocol's design becomes legible.
        if new_depth >= 3:
            state["flags"]["tier_protocol_revealed"] = True
        if new_depth >= 4:
            state["flags"]["sub_basement_corridor_known"] = True

        append_audit(state, {
            "op": "bump_depth",
            "from": current,
            "to": new_depth,
            "reason": reason,
        })
        save_state(project, state)

        try:
            from . import supabase_tools as _st
            _st._append_depth_log(
                project=project,
                from_depth=current,
                to_depth=new_depth,
                reason=reason,
            )
        except Exception:
            pass

        return _ok(from_depth=current, to_depth=new_depth, reason=reason)
    except Exception as e:
        return _err(str(e))


@mcp.tool()
def set_flag(
    project: str = "vault83",
    flag_name: str = "",
    value: bool = True,
    notes: str = "",
) -> dict:
    """Set a known flag. Rejects unknown names. See schema.KNOWN_FLAGS."""
    try:
        if flag_name not in KNOWN_FLAGS:
            return _err(f"Unknown flag {flag_name!r}. Known: {sorted(KNOWN_FLAGS)}. "
                        f"To add a flag, edit schema.py KNOWN_FLAGS.")
        state, _ = load_state(project)
        prev = state["flags"].get(flag_name)
        state["flags"][flag_name] = value
        append_audit(state, {
            "op": "set_flag",
            "flag": flag_name,
            "prev": prev,
            "new": value,
            "notes": notes,
        })
        save_state(project, state)
        return _ok(flag=flag_name, value=value, prev=prev)
    except Exception as e:
        return _err(str(e))


# ---------- 7. The Choice — Day 7 commitment ----------


@mcp.tool()
def record_choice(
    project: str = "vault83",
    ending_chosen: str = "",
    basis: str = "",
    notes: str = "",
) -> dict:
    """Record the Day-7 ending commitment. One-shot per playthrough.

    Sets state.choice.ending_chosen and flips choice_made. Also flips
    experiment_disclosed_publicly on 'rupture' and tier_adoption_petition_filed
    on 'exit'. Mirrors to vault83_endings. See VALID_CHOICE_ENDINGS.
    """
    try:
        if ending_chosen not in VALID_CHOICE_ENDINGS:
            return _err(f"Invalid ending {ending_chosen!r}. Valid: {sorted(VALID_CHOICE_ENDINGS)}")
        state, _ = load_state(project)
        prev = state["choice"].get("ending_chosen")
        if prev:
            return _err(f"Choice already committed: {prev!r}. The Day-7 ending is "
                        f"one-shot. Use undo_last_event to reverse.")

        sd = state["clock"]["story_day"]
        st = state["clock"]["story_time"]
        state["choice"] = {
            "ending_chosen": ending_chosen,
            "made_at_day": sd,
            "made_at_time": st,
            "basis": basis,
            "notes": notes,
        }
        state["flags"]["choice_made"] = True
        if ending_chosen == "rupture":
            state["flags"]["experiment_disclosed_publicly"] = True
        if ending_chosen == "exit":
            state["flags"]["tier_adoption_petition_filed"] = True

        append_audit(state, {
            "op": "record_choice",
            "ending_chosen": ending_chosen,
            "prev": prev,
        })
        save_state(project, state)

        try:
            from . import supabase_tools as _st
            _st._append_ending(
                project=project,
                ending_chosen=ending_chosen,
                basis=basis,
                story_day=sd,
                story_time=st,
                notes=notes,
            )
        except Exception:
            pass

        return _ok(choice=state["choice"])
    except Exception as e:
        return _err(str(e))


# ---------- 8. Maintenance — undo ----------


@mcp.tool()
def undo_last_event(project: str = "vault83", confirm: bool = False) -> dict:
    """Revert the most recent state change. First call returns a preview;
    pass confirm=True to execute."""
    try:
        state, _ = load_state(project)
        if not state["_audit_log"]:
            return _err("Audit log is empty. Nothing to undo.")

        last = state["_audit_log"][-1]
        if not confirm:
            return _ok(
                preview=last,
                message="Pass confirm=True to execute the undo.",
            )

        try:
            backup_path = backup_state(project, label="pre-undo")
        except Exception:
            backup_path = None

        last = pop_audit(state)
        op = last["op"]
        try:
            _reverse_op(state, last)
        except Exception as e:
            return _err(f"Undo failed for op {op!r}: {e}. Backup at {backup_path}.")

        save_state(project, state)
        return _ok(undone=last, backup_path=str(backup_path) if backup_path else None)
    except Exception as e:
        return _err(str(e))


def _reverse_op(state: dict, audit_entry: dict) -> None:
    """Reverse a single audit entry. Best-effort; adapted from
    hohenwald_state.server._reverse_op with Vault-83-specific ops added."""
    op = audit_entry["op"]

    if op == "set_flag":
        state["flags"][audit_entry["flag"]] = audit_entry["prev"]
    elif op == "advance_clock":
        prev = audit_entry["prev"]
        state["clock"]["story_day"] = prev["story_day"]
        state["clock"]["day_of_week"] = prev["day_of_week"]
        state["clock"]["story_time"] = prev["story_time"]
        state["clock"]["level"] = prev["level"]
        state["clock"]["location_slug"] = prev["location_slug"]
        if state["clock"]["history"]:
            state["clock"]["history"].pop()
    elif op == "enter_anchor":
        state["clock"]["current_anchor"] = audit_entry["prev"]
    elif op == "exit_anchor":
        state["clock"]["current_anchor"] = audit_entry["prev"]
    elif op == "register_resident":
        cid = audit_entry["character_id"]
        state["residents"].pop(cid, None)
        if audit_entry.get("is_liaison"):
            state["liaison_class_members"] = [c for c in state["liaison_class_members"] if c != cid]
    elif op == "place_resident":
        cid = audit_entry["character_id"]
        resident = state["residents"].get(cid)
        if resident:
            resident["level"] = audit_entry["prev_level"]
            resident["location_slug"] = audit_entry["prev_location"]
    elif op == "update_relationship":
        cid = audit_entry["character_id"]
        resident = state["residents"].get(cid)
        if resident:
            resident["caleb_relationship"] = audit_entry["prev"]
            if resident.get("history") and resident["history"][-1].get("kind") == "relationship":
                resident["history"].pop()
    elif op == "record_tier_transition":
        cid = audit_entry["character_id"]
        resident = state["residents"].get(cid)
        if resident:
            resident["current_tier"] = audit_entry["from_tier"]
            if resident.get("history") and resident["history"][-1].get("kind") == "tier_transition":
                resident["history"].pop()
        tid = audit_entry["transition_id"]
        state["tier_transitions"] = [t for t in state["tier_transitions"] if t["id"] != tid]
    elif op == "record_advancement_review_decision":
        cid = audit_entry["character_id"]
        resident = state["residents"].get(cid)
        if resident and resident.get("history") and resident["history"][-1].get("kind") == "advancement_review":
            resident["history"].pop()
        linked = audit_entry.get("linked_transition_id")
        if linked:
            state["tier_transitions"] = [t for t in state["tier_transitions"] if t["id"] != linked]
            # Subtle multi-step undo of the linked tier change is out of scope.
    elif op == "mark_anchor_attendance":
        ak = audit_entry["anchor_key"]
        prev = audit_entry["prev"]
        if prev is None:
            state["daily_anchor_attendance"].pop(ak, None)
        else:
            state["daily_anchor_attendance"][ak] = prev
    elif op == "bump_depth":
        state["clock"]["depth"] = audit_entry["from"]
        if state["clock"]["history"]:
            state["clock"]["history"].pop()
    elif op == "record_ledger_view":
        vid = audit_entry["id"]
        state["admission_ledger_views"] = [v for v in state["admission_ledger_views"] if v["id"] != vid]
    elif op == "add_journal_entry":
        # Journal rows live in Supabase; the remote row is not undone here.
        pass
    elif op == "record_choice":
        prev = audit_entry["prev"]
        state["choice"] = {"ending_chosen": prev, "made_at_day": None,
                           "made_at_time": None, "basis": None, "notes": None}
        state["flags"]["choice_made"] = bool(prev)
        # experiment_disclosed_publicly is not auto-reverted; use set_flag if needed.
    elif op in ("start_session", "end_session"):
        pass  # Sessions are generally not undone.
    else:
        raise ValueError(f"No reverse handler for op {op!r}.")


# ---------- Entry point ----------


def main() -> None:
    """Run the MCP server. Importing this module registers the core tools;
    supabase_tools is imported here to register the extension tools on the
    same FastMCP instance (lazy so unit tests skip Supabase import)."""
    from . import supabase_tools  # noqa: F401
    mcp.run(transport="streamable-http")


if __name__ == "__main__":
    main()
