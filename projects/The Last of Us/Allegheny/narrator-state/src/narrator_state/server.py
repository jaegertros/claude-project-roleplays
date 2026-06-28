"""FastMCP server for narrator-state.

All tools are defined here as decorated async functions. Each tool:
  1. Loads state for the named project
  2. Validates inputs
  3. Mutates state
  4. Appends to audit log for undo
  5. Saves atomically
  6. Returns a structured response

For details on each tool see MCP_NARRATOR_STATE_SPEC.md.
"""

from __future__ import annotations

import copy
import random
import uuid
from datetime import datetime, timezone
from typing import Any

from mcp.server.fastmcp import FastMCP

from .schema import (
    BITE_INCUBATION_MINUTES,
    KNOWN_FACTIONS,
    KNOWN_FLAGS,
    VALID_HEAL_OUTCOMES,
    VALID_SEVERITIES,
    VALID_STORY_PHASES,
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


# ---------------------------------------------------------------------------
# Server instance
# ---------------------------------------------------------------------------

mcp = FastMCP("narrator-state", host="127.0.0.1", port=8765)


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------


def _now_iso() -> str:
    return datetime.now(timezone.utc).isoformat(timespec="seconds")


def _trim_state_for_get(
    state: dict,
    include_history: bool,
    memory_book_entries: int,
    tier_filter: list[str] | None,
) -> dict:
    """Return a get_state-shaped view of the full state.

    Hides _audit_log and _counters always. Trims history arrays unless
    include_history. Filters characters by tier_filter. Trims memory_book.
    """
    out = copy.deepcopy(state)

    # Strip internal fields.
    out.pop("_audit_log", None)
    out.pop("_counters", None)

    # Memory book trim.
    if memory_book_entries >= 0:
        out["memory_book"] = out["memory_book"][-memory_book_entries:] if memory_book_entries else []

    # Character filter.
    if tier_filter is not None:
        if "all" in tier_filter:
            pass  # include everyone alive
        else:
            allowed = set(tier_filter)
            kept = {}
            for cid, char in out["characters"].items():
                # Always include present characters and anchor tier.
                if char.get("tier") in allowed or char.get("tier") == "anchor" or char.get("present"):
                    kept[cid] = char
            out["characters"] = kept
    else:
        # Default: present + anchor tier
        kept = {}
        for cid, char in out["characters"].items():
            if char.get("present") or char.get("tier") == "anchor":
                kept[cid] = char
        out["characters"] = kept

    # History trim.
    if not include_history:
        out["clock"]["history"] = out["clock"]["history"][-3:]
        for cid in out["characters"]:
            ch = out["characters"][cid]
            if "history" in ch:
                ch["history"] = ch["history"][-3:]
        out["session"]["sessions"] = out["session"]["sessions"][-3:]

    return out


def _find_character_or_error(state: dict, character_id: str) -> dict:
    """Return the character dict, or raise a clean error."""
    cid = character_id.upper() if character_id != "PLAYER" else "PLAYER"
    if cid == "PLAYER":
        return state["player"]
    if cid not in state["characters"]:
        raise ToolError(
            f"Character {cid!r} not found. Available: "
            f"{sorted(state['characters'].keys())}"
        )
    return state["characters"][cid]


def _find_injury_or_error(state: dict, injury_id: str) -> tuple[dict, dict, str]:
    """Return (owner_dict, injury_dict, owner_id) or raise."""
    # Check player first.
    for inj in state["player"]["active_injuries"]:
        if inj["id"] == injury_id:
            return state["player"], inj, "PLAYER"
    # Check named characters.
    for cid, char in state["characters"].items():
        for inj in char.get("active_injuries", []):
            if inj["id"] == injury_id:
                return char, inj, cid
    raise ToolError(f"Injury {injury_id!r} not found in any character's active injuries.")


class ToolError(Exception):
    """Raised by tool helpers to surface clean errors to MCP clients."""


def _err(message: str) -> dict:
    """Build an error response payload."""
    return {"ok": False, "error": message}


def _ok(**fields: Any) -> dict:
    """Build a success response payload."""
    return {"ok": True, **fields}


# ===========================================================================
# 3.1 Session and state
# ===========================================================================


@mcp.tool()
def get_state(
    project: str,
    include_history: bool = False,
    memory_book_entries: int = 3,
    tier_filter: list[str] | None = None,
) -> dict:
    """Return current state for the project.

    Trims internal fields, history arrays (unless include_history), and
    filters characters by tier. Default returns present + anchor characters.
    """
    try:
        state, created = load_state(project)
        view = _trim_state_for_get(state, include_history, memory_book_entries, tier_filter)
        view["_meta"] = {"created_now": created, "schema_version": state["schema_version"]}
        return _ok(state=view)
    except Exception as e:
        return _err(str(e))


@mcp.tool()
def start_session(project: str, session_note: str = "") -> dict:
    """Begin a new session. Returns current state + recent memory book.

    Mints a playthrough_id (UUID4) on the first call against a fresh or
    reset state. The id is preserved across all subsequent sessions of the
    same playthrough, and is the foreign key the Supabase-backed extension
    tables (commitment_log, negotiated_agreements, etc.) use to group rows.
    """
    try:
        state, created = load_state(project)

        # Mint playthrough_id if missing (fresh state or post-reset).
        minted_playthrough = False
        if not state.get("playthrough_id"):
            state["playthrough_id"] = str(uuid.uuid4())
            minted_playthrough = True

        # If there's an open session, close it implicitly.
        if state["session"]["current_session_id"]:
            for sess in state["session"]["sessions"]:
                if sess["id"] == state["session"]["current_session_id"] and sess["ended"] is None:
                    sess["ended"] = _now_iso()

        # Create new session.
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

        view = _trim_state_for_get(state, False, 3, None)
        view["_meta"] = {
            "created_now": created,
            "session_id": new_id,
            "playthrough_id": state["playthrough_id"],
            "minted_playthrough_id": minted_playthrough,
        }
        return _ok(state=view, session_id=new_id, playthrough_id=state["playthrough_id"])
    except Exception as e:
        return _err(str(e))


@mcp.tool()
def end_session(project: str, final_note: str = "") -> dict:
    """Close the current session. Records end time."""
    try:
        state, _ = load_state(project)
        sid = state["session"]["current_session_id"]
        if not sid:
            return _err("No active session to end.")
        for sess in state["session"]["sessions"]:
            if sess["id"] == sid:
                sess["ended"] = _now_iso()
                if final_note:
                    sess["final_note"] = final_note
                break
        state["session"]["current_session_id"] = None
        append_audit(state, {"op": "end_session", "session_id": sid})
        save_state(project, state)
        return _ok(session_id=sid)
    except Exception as e:
        return _err(str(e))


@mcp.tool()
def reset_state(
    project: str,
    confirm: str = "",
    label: str | None = None,
) -> dict:
    """Wipe a project's state back to the fresh default. Destructive.

    Automatically backs up the existing state to
    ~/.narrator-state/backups/<project>.json.bak-<timestamp>-<label>
    BEFORE wiping. If `label` is omitted, it defaults to
    "pre-reset-day<N>" where N is the current story_day (so backups are
    self-describing — e.g. `allegheny.json.bak-20260517T180000Z-pre-reset-day5`).

    The new state is the same shape as a brand-new project: empty
    characters/missions/inventory/flags/memory_book, clock at Day 1 00:00
    pre_outbreak, awareness 0, audit log cleared. The `created` timestamp
    is preserved (the project wasn't recreated, just the playthrough).
    Schema version is whatever the server is currently running.

    Args:
        project: project slug, e.g. "allegheny".
        confirm: must be the literal string "yes" to actually execute.
            Any other value (including the default "") returns an error
            describing what would happen. This is a deliberate guard
            against accidental destructive calls.
        label: optional backup label suffix. Defaults to "pre-reset-day<N>".

    Returns:
        {"ok": True, "reset": True, "backup": "<path>", "cleared": {...}}
        where `cleared` reports the counts that were wiped.

        On confirm guard:
        {"ok": False, "error": "reset_state is destructive. Pass confirm=..."}.
    """
    if confirm != "yes":
        return _err(
            "reset_state is destructive — it overwrites the current playthrough "
            "with a fresh default state. Pass confirm=\"yes\" to execute. "
            "The current state will be automatically backed up to "
            "~/.narrator-state/backups/ before wiping."
        )
    try:
        state, was_created = load_state(project)
        if was_created:
            # File didn't exist before this call — load_state just created it
            # fresh. Nothing meaningful to wipe.
            return _ok(reset=False, reason="State was empty — already at defaults.")

        # Auto-label from current playthrough so the backup name signals
        # what was wiped (e.g. "pre-reset-day5" when wiping after Day 5).
        effective_label = label
        if effective_label is None:
            day = state.get("clock", {}).get("story_day", 0)
            effective_label = f"pre-reset-day{day}"

        backup_path = backup_state(project, label=effective_label)

        # Snapshot counts for the return value before we wipe.
        cleared = {
            "characters":         len(state.get("characters", {})),
            "lost":               len(state.get("lost", [])),
            "missions_active":    len(state.get("missions", {}).get("active", [])),
            "missions_completed": len(state.get("missions", {}).get("completed", [])),
            "missions_deferred":  len(state.get("missions", {}).get("deferred", [])),
            "memory_book":        len(state.get("memory_book", [])),
            "knowledge_transfers": len(state.get("knowledge_transfers", [])),
            "inventory":          len(state.get("player", {}).get("inventory", [])),
            "audit_log":          len(state.get("_audit_log", [])),
            "flags_set":          sum(1 for v in state.get("flags", {}).values() if v),
            "factions_revealed":  sum(1 for v in state.get("factions_known", {}).values() if v),
        }

        # Build fresh state. Preserve `created` (project itself wasn't
        # recreated) and `title` (cosmetic, stable across playthroughs).
        # playthrough_id is INTENTIONALLY reset to None — the new playthrough
        # gets a fresh UUID on the next start_session call, so its rows in
        # the Supabase extension tables stay segregated from the prior run.
        fresh = default_state(project, title=state.get("title", project))
        fresh["created"] = state.get("created", fresh["created"])
        save_state(project, fresh)

        return _ok(
            reset=True,
            backup=str(backup_path),
            cleared=cleared,
        )
    except Exception as e:
        return _err(str(e))


# ===========================================================================
# 3.2 Clock and location
# ===========================================================================


@mcp.tool()
def advance_clock(
    project: str,
    story_day: int,
    story_time: str,
    location: str | None = None,
    story_phase: str | None = None,
    story_day_label: str | None = None,
) -> dict:
    """Set the clock to a specific day/time, with optional location/phase.

    Despite the "advance" name, this is a SET operation — passing a day/time
    earlier than the current values is permitted. Use it during narrator
    corrections, or when starting a new playthrough after reset_state to
    move from the default Day 1 00:00 to wherever the new playthrough
    actually opens. The function appends the new clock value to
    clock.history and saves; it does NOT enforce monotonicity.

    Awareness, in contrast, IS monotonic — see advance_awareness, which
    explicitly rejects regression.

    Appends to clock history. Does not auto-finalize previous day — that's
    the narrator's responsibility via finalize_story_day, called first.
    """
    try:
        state, _ = load_state(project)

        if story_phase is not None and story_phase not in VALID_STORY_PHASES:
            return _err(f"Invalid story_phase {story_phase!r}. Valid: {sorted(VALID_STORY_PHASES)}")

        prev = {
            "story_day": state["clock"]["story_day"],
            "story_time": state["clock"]["story_time"],
            "story_day_label": state["clock"]["story_day_label"],
            "story_phase": state["clock"]["story_phase"],
            "location": state["clock"]["location"],
        }

        state["clock"]["story_day"] = story_day
        state["clock"]["story_time"] = story_time
        if story_day_label is not None:
            state["clock"]["story_day_label"] = story_day_label
        if location is not None:
            state["clock"]["location"] = location
        if story_phase is not None:
            state["clock"]["story_phase"] = story_phase

        # Append to clock history (turn-stamped via session turns counter).
        turn = _current_turn(state)
        state["clock"]["history"].append({
            "turn": turn,
            "story_day": story_day,
            "story_time": story_time,
            "location": state["clock"]["location"],
            "awareness": state["clock"]["awareness"],
        })

        append_audit(state, {"op": "advance_clock", "prev": prev})
        save_state(project, state)
        return _ok(clock=state["clock"])
    except Exception as e:
        return _err(str(e))


@mcp.tool()
def advance_awareness(project: str, new_tier: int, reason: str) -> dict:
    """Bump AWARENESS. Rejects regression."""
    try:
        state, _ = load_state(project)
        current = state["clock"]["awareness"]
        if new_tier <= current:
            return _err(
                f"AWARENESS cannot decrease or stay equal. Current={current}, "
                f"requested={new_tier}. Awareness is monotonic."
            )
        if new_tier < 0 or new_tier > 5:
            return _err(f"AWARENESS tier must be 0-5, got {new_tier}.")

        state["clock"]["awareness"] = new_tier
        state["clock"]["history"].append({
            "turn": _current_turn(state),
            "story_day": state["clock"]["story_day"],
            "story_time": state["clock"]["story_time"],
            "location": state["clock"]["location"],
            "awareness": new_tier,
            "reason": reason,
        })
        append_audit(state, {"op": "advance_awareness", "from": current, "to": new_tier})
        save_state(project, state)
        return _ok(awareness=new_tier, reason=reason)
    except Exception as e:
        return _err(str(e))


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


# ===========================================================================
# 3.3 Characters
# ===========================================================================


@mcp.tool()
def update_character(
    project: str,
    character_id: str,
    relationship: str | None = None,
    condition: str | None = None,
    present: bool | None = None,
    notes: str = "",
    name: str | None = None,
    tier: str | None = None,
) -> dict:
    """Update a named character's state. Creates the character if missing.

    All field updates are optional. Appends to character history.
    """
    try:
        state, _ = load_state(project)
        cid = character_id.upper()

        if cid == "PLAYER":
            return _err("Use update_character for named characters only; use update_player for the player.")

        # Create on first reference if not present.
        created_now = False
        if cid not in state["characters"]:
            state["characters"][cid] = {
                "name": name or cid.title(),
                "tier": tier or "named_minor",
                "relationship": relationship or "acquaintance",
                "condition": condition or "unscathed",
                "alive": True,
                "present": present if present is not None else False,
                "active_injuries": [],
                "perception_of_player": {
                    "physical": "",
                    "behavioral": [],
                    "last_updated_turn": 0,
                },
                "history": [],
            }
            created_now = True

        char = state["characters"][cid]
        prev = {
            "relationship": char.get("relationship"),
            "condition": char.get("condition"),
            "present": char.get("present"),
        }

        if relationship is not None:
            char["relationship"] = relationship
        if condition is not None:
            char["condition"] = condition
        if present is not None:
            char["present"] = present
        if name is not None:
            char["name"] = name
        if tier is not None:
            char["tier"] = tier

        char["history"].append({
            "turn": _current_turn(state),
            "story_day": state["clock"]["story_day"],
            "story_time": state["clock"]["story_time"],
            "relationship": char["relationship"],
            "condition": char["condition"],
            "present": char["present"],
            "notes": notes,
        })

        append_audit(state, {
            "op": "update_character",
            "character_id": cid,
            "prev": prev,
            "created": created_now,
        })
        save_state(project, state)
        return _ok(character=char, created=created_now)
    except Exception as e:
        return _err(str(e))


@mcp.tool()
def update_perception(
    project: str,
    character_id: str,
    physical: str | None = None,
    behavioral_add: str | None = None,
    behavioral_remove: str | None = None,
) -> dict:
    """Update what an NPC has observed about the player."""
    try:
        state, _ = load_state(project)
        char = _find_character_or_error(state, character_id)
        if "perception_of_player" not in char:
            char["perception_of_player"] = {
                "physical": "",
                "behavioral": [],
                "last_updated_turn": 0,
            }
        prev = copy.deepcopy(char["perception_of_player"])

        if physical is not None:
            char["perception_of_player"]["physical"] = physical
        if behavioral_add:
            char["perception_of_player"]["behavioral"].append(behavioral_add)
        if behavioral_remove:
            try:
                char["perception_of_player"]["behavioral"].remove(behavioral_remove)
            except ValueError:
                pass  # Idempotent: removing what wasn't there is fine.
        char["perception_of_player"]["last_updated_turn"] = _current_turn(state)

        append_audit(state, {
            "op": "update_perception",
            "character_id": character_id.upper(),
            "prev": prev,
        })
        save_state(project, state)
        return _ok(perception=char["perception_of_player"])
    except Exception as e:
        return _err(str(e))


@mcp.tool()
def commit_knowledge_transfer(
    project: str,
    to_character_id: str,
    topic: str,
    from_character_id: str = "OBSERVATION",
    scope: str = "full",
    story_day: int | None = None,
    story_time: str | None = None,
    notes: str = "",
) -> dict:
    """Record an off-screen information transfer to the Commitment Log.

    Mechanical implementation of the Observation Check from
    PROJECT_INSTRUCTIONS.md. Call when an NPC learns something off-screen —
    either from another character, or by observing an artifact (use
    from_character_id='OBSERVATION' for the latter).

    Args:
        project: project slug, e.g. "allegheny".
        to_character_id: uppercase character token of the recipient (e.g. "PRIYA").
        topic: stable slug for what was learned (e.g. "caleb_bite_day5",
            "maya_pregnancy"). The narrator picks the slug; consistency
            across turns is the narrator's responsibility.
        from_character_id: uppercase token of the source character, or
            "OBSERVATION" if the recipient personally witnessed an artifact.
            Defaults to "OBSERVATION".
        scope: how much the recipient knows. One of "full" | "partial" |
            "rumor" | "wrong_version". Default "full".
        story_day: in-fiction day of the transfer. Defaults to clock.story_day.
        story_time: in-fiction time HH:MM. Defaults to clock.story_time.
        notes: one-line context for the log entry.

    Returns:
        {"ok": True, "entry": {...}} on success, or {"ok": False, "error": "..."}.

    Validation:
        - scope must be in {full, partial, rumor, wrong_version}
        - to_character_id must currently be in state['characters'] (live).
          Dead recipients are rejected — the Commitment Log tracks current
          knowledge of living characters; pre-death transfers are rendered
          in prose without logging.
        - from_character_id must be in state['characters'], state['lost'],
          or the literal string "OBSERVATION".
    """
    try:
        state, _ = load_state(project)

        VALID_SCOPES = {"full", "partial", "rumor", "wrong_version"}
        if scope not in VALID_SCOPES:
            return _err(
                f"Invalid scope {scope!r}. Valid: {sorted(VALID_SCOPES)}"
            )

        to_cid = to_character_id.upper()
        from_cid = from_character_id.upper() if from_character_id else "OBSERVATION"

        if to_cid == "PLAYER":
            return _err(
                "Cannot commit a knowledge transfer to PLAYER. "
                "Information learned by the player is rendered in prose; "
                "the Commitment Log is for NPC knowledge."
            )

        if to_cid not in state["characters"]:
            in_lost = any(
                l.get("character_id") == to_cid for l in state.get("lost", [])
            )
            if in_lost:
                return _err(
                    f"Cannot transfer information to {to_cid!r}: character "
                    f"is dead. The Commitment Log tracks current knowledge "
                    f"of living characters. Pre-death transfers can be "
                    f"rendered in prose without logging."
                )
            return _err(
                f"Character {to_cid!r} not found in characters. "
                f"Available: {sorted(state['characters'].keys())}"
            )

        if from_cid != "OBSERVATION":
            if from_cid not in state["characters"]:
                in_lost = any(
                    l.get("character_id") == from_cid for l in state.get("lost", [])
                )
                if not in_lost:
                    return _err(
                        f"Source character {from_cid!r} not found. "
                        f"Must be in characters, in lost, or 'OBSERVATION'. "
                        f"Available characters: {sorted(state['characters'].keys())}"
                    )
                # Dead sources are fine — a transfer that happened before
                # their death is still valid. The narrator handles temporal
                # consistency in prose.

        if story_day is None:
            story_day = state["clock"]["story_day"]
        if story_time is None:
            story_time = state["clock"]["story_time"]

        entry_id = next_id(state, "kt", "kt")

        entry = {
            "id": entry_id,
            "from_character_id": from_cid,
            "to_character_id": to_cid,
            "topic": topic,
            "scope": scope,
            "story_day": story_day,
            "story_time": story_time,
            "logged_turn": _current_turn(state),
            "logged_at": _now_iso(),
            "notes": notes,
        }

        state.setdefault("knowledge_transfers", []).append(entry)

        append_audit(state, {
            "op": "commit_knowledge_transfer",
            "entry_id": entry_id,
            "to_character_id": to_cid,
            "topic": topic,
        })
        save_state(project, state)
        return _ok(entry=entry)
    except Exception as e:
        return _err(str(e))


@mcp.tool()
def log_injury(
    project: str,
    character_id: str,
    body_part: str,
    severity: str,
    source: str,
    clean: bool = True,
    clock_bias: str = "median",
) -> dict:
    """Log a new injury. For bite severity, computes infection_clock."""
    try:
        state, _ = load_state(project)

        if severity not in VALID_SEVERITIES:
            return _err(f"Invalid severity {severity!r}. Valid: {sorted(VALID_SEVERITIES)}")

        # Bite-specific: validate body_part and compute clock.
        infection_clock_minutes = None
        if severity == "bite":
            if body_part not in BITE_INCUBATION_MINUTES:
                return _err(
                    f"For bite severity, body_part must be one of: "
                    f"{sorted(BITE_INCUBATION_MINUTES.keys())}. Got {body_part!r}."
                )
            lo, hi = BITE_INCUBATION_MINUTES[body_part]
            if clock_bias == "fast":
                # First third of range.
                infection_clock_minutes = random.randint(lo, lo + (hi - lo) // 3)
            elif clock_bias == "slow":
                # Last third of range.
                infection_clock_minutes = random.randint(hi - (hi - lo) // 3, hi)
            else:
                # Median: middle third.
                third = (hi - lo) // 3
                infection_clock_minutes = random.randint(lo + third, hi - third)

        owner = _find_character_or_error(state, character_id)
        injury_id = next_id(state, "injury", "inj")

        injury = {
            "id": injury_id,
            "logged_turn": _current_turn(state),
            "body_part": body_part,
            "severity": severity,
            "source": source,
            "clean": clean,
            "logged_at_story_time": f"Day {state['clock']['story_day']}, {state['clock']['story_time']}",
        }
        if infection_clock_minutes is not None:
            injury["infection_clock_minutes"] = infection_clock_minutes
            injury["clock_bias"] = clock_bias

        owner["active_injuries"].append(injury)

        append_audit(state, {
            "op": "log_injury",
            "character_id": character_id.upper(),
            "injury_id": injury_id,
        })
        save_state(project, state)
        return _ok(injury=injury)
    except Exception as e:
        return _err(str(e))


@mcp.tool()
def heal_injury(
    project: str,
    injury_id: str,
    outcome: str,
    notes: str = "",
) -> dict:
    """Close an active injury."""
    try:
        state, _ = load_state(project)

        if outcome not in VALID_HEAL_OUTCOMES:
            return _err(f"Invalid outcome {outcome!r}. Valid: {sorted(VALID_HEAL_OUTCOMES)}")

        owner, injury, owner_id = _find_injury_or_error(state, injury_id)

        owner["active_injuries"].remove(injury)
        injury["closed_turn"] = _current_turn(state)
        injury["outcome"] = outcome
        injury["heal_notes"] = notes
        owner.setdefault("injury_history", []).append(injury)

        append_audit(state, {
            "op": "heal_injury",
            "owner_id": owner_id,
            "injury": injury,
        })
        save_state(project, state)
        return _ok(injury=injury)
    except Exception as e:
        return _err(str(e))


@mcp.tool()
def record_loss(
    project: str,
    character_id: str,
    story_day_label: str,
    cause: str,
    one_line_obit: str,
) -> dict:
    """Mark a character dead. Moves them from characters to lost."""
    try:
        state, _ = load_state(project)
        cid = character_id.upper()
        if cid == "PLAYER":
            return _err("Use record_loss for named NPCs; the player's mortality is handled differently.")

        # Check if already in lost list — this catches the double-death case.
        for lost_entry in state["lost"]:
            if lost_entry["character_id"] == cid:
                return _err(
                    f"Character {cid!r} is already dead "
                    f"(died on {lost_entry['story_day_label']}). "
                    f"Previous death is canonical."
                )

        if cid not in state["characters"]:
            return _err(f"Character {cid!r} not found in characters.")

        char = state["characters"][cid]
        if not char.get("alive", True):
            return _err(f"Character {cid!r} is already dead. Previous death is canonical.")

        char["alive"] = False
        char["present"] = False
        char["died_on"] = story_day_label
        char["cause_of_death"] = cause
        char["obit"] = one_line_obit
        char["died_turn"] = _current_turn(state)

        # Move to lost.
        state["lost"].append({
            "character_id": cid,
            "name": char.get("name", cid),
            "tier": char.get("tier", "named_minor"),
            "story_day_label": story_day_label,
            "cause": cause,
            "obit": one_line_obit,
            "died_turn": char["died_turn"],
        })
        del state["characters"][cid]

        append_audit(state, {"op": "record_loss", "character_id": cid, "char_snapshot": char})
        save_state(project, state)
        return _ok(lost=state["lost"][-1])
    except Exception as e:
        return _err(str(e))


@mcp.tool()
def remove_character(
    project: str,
    character_id: str,
    confirm: str = "",
    reason: str = "",
) -> dict:
    """Delete a character from state['characters'] entirely. Destructive.

    Distinct from record_loss, which moves a character to state['lost'] as a
    canonical in-fiction death with a turn-stamped obit. Use remove_character
    when a character should not exist in the playthrough at all — added by
    mistake, carried over from a wiped playthrough, or being removed during
    state cleanup.

    The deleted character is preserved in the audit log so undo_last_event
    can restore it on the next call.

    Args:
        project: project slug, e.g. "allegheny".
        character_id: uppercase token (e.g. "MARISOL"). Case-normalized.
        confirm: must be "yes" to execute. Anything else returns an error.
        reason: optional one-line reason, recorded in the audit log.

    Returns:
        {"ok": True, "removed": "<id>", "snapshot": {...}} on success.
        {"ok": False, "error": "..."} if not confirmed, not found, etc.
    """
    if confirm != "yes":
        return _err(
            "remove_character is destructive — pass confirm=\"yes\" to execute. "
            "For canonical death, use record_loss instead (moves to state['lost'])."
        )
    try:
        state, _ = load_state(project)
        cid = character_id.upper()
        if cid not in state["characters"]:
            return _err(
                f"Character {cid!r} not found in characters. "
                f"(For characters already in state['lost'], use undo_last_event "
                f"if you need to roll back a record_loss call.)"
            )
        snapshot = state["characters"].pop(cid)
        append_audit(state, {
            "op": "remove_character",
            "character_id": cid,
            "snapshot": snapshot,
            "reason": reason,
        })
        save_state(project, state)
        return _ok(removed=cid, snapshot=snapshot, reason=reason)
    except Exception as e:
        return _err(str(e))


# ===========================================================================
# 3.4 Inventory
# ===========================================================================


@mcp.tool()
def add_inventory(
    project: str,
    item_name: str,
    qty: int = 1,
    notes: str = "",
) -> dict:
    """Add an item to the player's inventory. Auto-stacks on matching name+notes."""
    try:
        state, _ = load_state(project)

        # Try to auto-stack on identical name + notes.
        for item in state["player"]["inventory"]:
            if item["name"] == item_name and item.get("notes", "") == notes:
                item["qty"] += qty
                append_audit(state, {"op": "add_inventory", "item_id": item["id"], "qty": qty})
                save_state(project, state)
                return _ok(item=item, stacked=True)

        # New item.
        item_id = next_id(state, "item", "item")
        item = {"id": item_id, "name": item_name, "qty": qty, "notes": notes}
        state["player"]["inventory"].append(item)

        append_audit(state, {"op": "add_inventory", "item_id": item_id, "qty": qty})
        save_state(project, state)
        return _ok(item=item, stacked=False)
    except Exception as e:
        return _err(str(e))


@mcp.tool()
def remove_inventory(
    project: str,
    item_id: str | None = None,
    item_name: str | None = None,
    qty: int = 1,
) -> dict:
    """Remove or decrement an inventory item. Either item_id or item_name."""
    try:
        state, _ = load_state(project)

        if not item_id and not item_name:
            return _err("Must provide either item_id or item_name.")

        # Find the item.
        target = None
        for item in state["player"]["inventory"]:
            if item_id and item["id"] == item_id:
                target = item
                break
            if item_name and item["name"] == item_name and target is None:
                target = item

        if not target:
            ident = item_id or item_name
            return _err(f"Item {ident!r} not found in inventory.")

        if qty > target["qty"]:
            return _err(
                f"Underflow: trying to remove {qty} of item {target['name']!r}, "
                f"but only {target['qty']} available."
            )

        target["qty"] -= qty
        removed_item = copy.deepcopy(target)
        if target["qty"] == 0:
            state["player"]["inventory"].remove(target)

        append_audit(state, {"op": "remove_inventory", "item": removed_item, "qty": qty})
        save_state(project, state)
        return _ok(removed=removed_item, remaining_qty=target["qty"])
    except Exception as e:
        return _err(str(e))


# ===========================================================================
# 3.5 Missions
# ===========================================================================


@mcp.tool()
def start_mission(
    project: str,
    mission_id: str,
    title: str = "",
    notes: str = "",
) -> dict:
    """Begin a mission. Adds to missions.active."""
    try:
        state, _ = load_state(project)

        for m in state["missions"]["active"]:
            if m["id"] == mission_id:
                return _err(f"Mission {mission_id!r} is already active.")

        mission = {
            "id": mission_id,
            "title": title,
            "started_turn": _current_turn(state),
            "started_at": f"Day {state['clock']['story_day']}, {state['clock']['story_time']}",
            "sub_state": "started",
            "notes": notes,
        }
        state["missions"]["active"].append(mission)

        append_audit(state, {"op": "start_mission", "mission_id": mission_id})
        save_state(project, state)
        return _ok(mission=mission)
    except Exception as e:
        return _err(str(e))


@mcp.tool()
def update_mission(
    project: str,
    mission_id: str,
    sub_state: str,
    notes: str = "",
) -> dict:
    """Update an active mission's sub-state."""
    try:
        state, _ = load_state(project)
        for m in state["missions"]["active"]:
            if m["id"] == mission_id:
                prev = m.get("sub_state")
                m["sub_state"] = sub_state
                if notes:
                    m["notes"] = notes
                append_audit(state, {"op": "update_mission", "mission_id": mission_id, "prev": prev})
                save_state(project, state)
                return _ok(mission=m)
        return _err(f"Mission {mission_id!r} not in active missions.")
    except Exception as e:
        return _err(str(e))


@mcp.tool()
def complete_mission(
    project: str,
    mission_id: str,
    outcome: str,
    notes: str = "",
) -> dict:
    """Close a mission. Moves from active to completed."""
    try:
        state, _ = load_state(project)
        for i, m in enumerate(state["missions"]["active"]):
            if m["id"] == mission_id:
                m["completed_turn"] = _current_turn(state)
                m["completed_at"] = f"Day {state['clock']['story_day']}, {state['clock']['story_time']}"
                m["outcome"] = outcome
                if notes:
                    m["notes"] = notes
                state["missions"]["completed"].append(m)
                del state["missions"]["active"][i]
                append_audit(state, {"op": "complete_mission", "mission_id": mission_id, "mission": m})
                save_state(project, state)
                return _ok(mission=m)
        return _err(f"Mission {mission_id!r} not in active missions.")
    except Exception as e:
        return _err(str(e))


# ===========================================================================
# 3.6 Memory and flags
# ===========================================================================


@mcp.tool()
def finalize_story_day(
    project: str,
    summary: str,
    characters_in_scene: list[str],
    awareness_at_end: int | None = None,
) -> dict:
    """Close out a story day with a memory book entry.

    Called by the narrator when the story clock advances past midnight or
    jumps to a new day. The day's summary is the narrator's; the bookkeeping
    (session, day range, ended_at) is auto-filled from current state.
    """
    try:
        state, _ = load_state(project)

        mb_id = next_id(state, "memory_book", "mb")
        entry = {
            "id": mb_id,
            "session_id": state["session"]["current_session_id"],
            "story_day_range": state["clock"]["story_day_label"],
            "summary": summary,
            "characters_in_scene": [c.upper() for c in characters_in_scene],
            "ended_at": {
                "story_day": state["clock"]["story_day"],
                "story_time": state["clock"]["story_time"],
            },
            "awareness_at_end": (
                awareness_at_end
                if awareness_at_end is not None
                else state["clock"]["awareness"]
            ),
            "finalized_turn": _current_turn(state),
        }
        state["memory_book"].append(entry)

        append_audit(state, {"op": "finalize_story_day", "mb_id": mb_id})
        save_state(project, state)
        return _ok(memory_book_entry=entry)
    except Exception as e:
        return _err(str(e))


@mcp.tool()
def set_flag(
    project: str,
    flag_name: str,
    value: bool,
    notes: str = "",
) -> dict:
    """Set a known flag. Rejects unknown names."""
    try:
        if flag_name not in KNOWN_FLAGS:
            return _err(
                f"Unknown flag {flag_name!r}. Known: {sorted(KNOWN_FLAGS)}. "
                f"To add a flag, edit schema.py KNOWN_FLAGS."
            )
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


@mcp.tool()
def set_faction_known(
    project: str,
    faction: str,
    value: bool,
) -> dict:
    """Toggle whether a faction is known to the player."""
    try:
        if faction not in KNOWN_FACTIONS:
            return _err(f"Unknown faction {faction!r}. Known: {sorted(KNOWN_FACTIONS)}")
        state, _ = load_state(project)
        prev = state["factions_known"].get(faction)
        state["factions_known"][faction] = value
        append_audit(state, {
            "op": "set_faction_known",
            "faction": faction,
            "prev": prev,
            "new": value,
        })
        save_state(project, state)
        return _ok(faction=faction, value=value, prev=prev)
    except Exception as e:
        return _err(str(e))


# ===========================================================================
# 3.7 Maintenance
# ===========================================================================


@mcp.tool()
def undo_last_event(project: str, confirm: bool = False) -> dict:
    """Revert the most recent state change.

    First call returns a preview of what would be undone. Pass confirm=True
    to actually execute. The narrator should rarely use this; the player
    can request it.
    """
    try:
        state, _ = load_state(project)
        if not state["_audit_log"]:
            return _err("Audit log is empty. Nothing to undo.")

        last = state["_audit_log"][-1]
        if not confirm:
            return _ok(
                preview=last,
                message="Pass confirm=True to execute the undo. "
                        "Note: undo only reverses the most recent state change.",
            )

        # Execute the undo. Take a backup first.
        try:
            backup_path = backup_state(project, label="pre-undo")
        except Exception:
            backup_path = None

        last = pop_audit(state)
        op = last["op"]

        # Reverse the operation.
        try:
            _reverse_op(state, last)
        except Exception as e:
            return _err(f"Undo failed for op {op!r}: {e}. Backup at {backup_path}.")

        save_state(project, state)
        return _ok(undone=last, backup_path=str(backup_path) if backup_path else None)
    except Exception as e:
        return _err(str(e))


def _reverse_op(state: dict, audit_entry: dict) -> None:
    """Reverse a single audit entry. Best-effort; complex ops may not fully reverse."""
    op = audit_entry["op"]

    if op == "set_flag":
        state["flags"][audit_entry["flag"]] = audit_entry["prev"]
    elif op == "set_faction_known":
        state["factions_known"][audit_entry["faction"]] = audit_entry["prev"]
    elif op == "advance_clock":
        prev = audit_entry["prev"]
        state["clock"]["story_day"] = prev["story_day"]
        state["clock"]["story_time"] = prev["story_time"]
        state["clock"]["story_day_label"] = prev["story_day_label"]
        state["clock"]["story_phase"] = prev["story_phase"]
        state["clock"]["location"] = prev["location"]
        if state["clock"]["history"]:
            state["clock"]["history"].pop()
    elif op == "advance_awareness":
        state["clock"]["awareness"] = audit_entry["from"]
        if state["clock"]["history"]:
            state["clock"]["history"].pop()
    elif op == "update_character":
        cid = audit_entry["character_id"]
        if audit_entry.get("created"):
            state["characters"].pop(cid, None)
        else:
            char = state["characters"].get(cid)
            if char:
                prev = audit_entry["prev"]
                if prev["relationship"] is not None:
                    char["relationship"] = prev["relationship"]
                if prev["condition"] is not None:
                    char["condition"] = prev["condition"]
                if prev["present"] is not None:
                    char["present"] = prev["present"]
                if char.get("history"):
                    char["history"].pop()
    elif op == "log_injury":
        cid = audit_entry["character_id"]
        injury_id = audit_entry["injury_id"]
        owner = state["player"] if cid == "PLAYER" else state["characters"].get(cid)
        if owner:
            owner["active_injuries"] = [i for i in owner["active_injuries"] if i["id"] != injury_id]
    elif op == "heal_injury":
        owner_id = audit_entry["owner_id"]
        injury = audit_entry["injury"]
        owner = state["player"] if owner_id == "PLAYER" else state["characters"].get(owner_id)
        if owner:
            # Restore to active_injuries; remove from injury_history.
            for k in ("closed_turn", "outcome", "heal_notes"):
                injury.pop(k, None)
            owner["active_injuries"].append(injury)
            if "injury_history" in owner and injury in owner["injury_history"]:
                owner["injury_history"].remove(injury)
    elif op == "record_loss":
        cid = audit_entry["character_id"]
        char = audit_entry["char_snapshot"]
        char["alive"] = True
        char["present"] = False
        for k in ("died_on", "cause_of_death", "obit", "died_turn"):
            char.pop(k, None)
        state["characters"][cid] = char
        # Remove from lost.
        state["lost"] = [l for l in state["lost"] if l["character_id"] != cid]
    elif op == "remove_character":
        cid = audit_entry["character_id"]
        snapshot = audit_entry["snapshot"]
        state["characters"][cid] = snapshot
    elif op == "add_inventory":
        item_id = audit_entry["item_id"]
        qty = audit_entry["qty"]
        for item in state["player"]["inventory"]:
            if item["id"] == item_id:
                item["qty"] -= qty
                if item["qty"] <= 0:
                    state["player"]["inventory"].remove(item)
                break
    elif op == "remove_inventory":
        original = audit_entry["item"]
        qty = audit_entry["qty"]
        # Find existing or restore.
        for item in state["player"]["inventory"]:
            if item["id"] == original["id"]:
                item["qty"] += qty
                return
        # If item was fully consumed, restore it.
        original["qty"] = qty
        state["player"]["inventory"].append(original)
    elif op == "start_mission":
        mid = audit_entry["mission_id"]
        state["missions"]["active"] = [m for m in state["missions"]["active"] if m["id"] != mid]
    elif op == "update_mission":
        mid = audit_entry["mission_id"]
        for m in state["missions"]["active"]:
            if m["id"] == mid:
                m["sub_state"] = audit_entry["prev"]
                break
    elif op == "complete_mission":
        mid = audit_entry["mission_id"]
        mission = audit_entry["mission"]
        state["missions"]["completed"] = [m for m in state["missions"]["completed"] if m["id"] != mid]
        for k in ("completed_turn", "completed_at", "outcome"):
            mission.pop(k, None)
        state["missions"]["active"].append(mission)
    elif op == "finalize_story_day":
        mb_id = audit_entry["mb_id"]
        state["memory_book"] = [e for e in state["memory_book"] if e["id"] != mb_id]
    elif op == "update_perception":
        cid = audit_entry["character_id"]
        char = state["characters"].get(cid)
        if char:
            char["perception_of_player"] = audit_entry["prev"]
    elif op in ("start_session", "end_session"):
        # Sessions are generally not undone.
        pass
    else:
        raise ValueError(f"No reverse handler for op {op!r}.")


# ===========================================================================
# Entry point
# ===========================================================================


def main() -> None:
    """Run the MCP server over HTTP."""
    mcp.run(transport="streamable-http")


if __name__ == "__main__":
    main()
