"""
Allegheny — narrator-state MCP tool extensions v1

Add these tools to the existing narrator-state MCP server. Assumes the server
already has a Supabase client at self.supabase and a way to resolve the
current playthrough_id (likely from the active session).

Pattern matches the existing tools (log_injury, update_character, etc.) —
named for the fiction, not the database.
"""

from typing import Optional, List
from uuid import UUID


# ============================================================================
# 1. commitment_log
# ============================================================================

@mcp.tool()
async def commit_knowledge_transfer(
    project: str,
    from_character: str,
    to_character: str,
    topic: str,
    scope: str = "full",
    notes: Optional[str] = None,
    source_event: Optional[str] = None,
) -> dict:
    """Record an off-screen information transfer between characters.

    Called by the narrator when info moves from one character to another:
    via dialogue ('Caleb tells Maya about X'), observation ('OBSERVATION' as
    from_character means an artifact/scene was witnessed), or group reveal
    (call once per recipient).

    scope: 'full' | 'partial' | 'rumor' | 'wrong_version'
    """
    pt_id = await get_active_playthrough(project)
    story_day, story_time = await get_clock(project)

    if scope not in ("full", "partial", "rumor", "wrong_version"):
        return {"ok": False, "error": f"invalid scope: {scope}"}

    row = supabase.table("commitment_log").insert({
        "project_id": project,
        "playthrough_id": str(pt_id),
        "from_character": from_character,
        "to_character": to_character,
        "topic": topic,
        "scope": scope,
        "story_day": story_day,
        "story_time": story_time,
        "notes": notes,
        "source_event": source_event,
    }).execute()

    return {"ok": True, "id": row.data[0]["id"]}


@mcp.tool()
async def check_knowledge(
    project: str,
    character_id: str,
    topic: str,
) -> dict:
    """Check whether a character knows about a topic, and at what scope.

    Returns the most recent transfer record if any exists, or {"known": false}.
    The narrator runs this before composing NPC dialogue about off-screen events.
    """
    pt_id = await get_active_playthrough(project)

    result = supabase.table("commitment_log") \
        .select("scope, story_day, story_time, from_character, notes") \
        .eq("playthrough_id", str(pt_id)) \
        .eq("to_character", character_id) \
        .eq("topic", topic) \
        .order("story_day", desc=True) \
        .order("story_time", desc=True) \
        .limit(1) \
        .execute()

    if not result.data:
        return {"known": False, "topic": topic, "character_id": character_id}

    return {"known": True, **result.data[0]}


@mcp.tool()
async def commit_group_knowledge_transfer(
    project: str,
    from_character: str,
    to_characters: List[str],
    topic: str,
    scope: str = "full",
    notes: Optional[str] = None,
) -> dict:
    """Convenience: one transfer to many recipients (e.g., dinner-table reveal).
    Inserts one row per recipient."""
    pt_id = await get_active_playthrough(project)
    story_day, story_time = await get_clock(project)

    rows = [{
        "project_id": project,
        "playthrough_id": str(pt_id),
        "from_character": from_character,
        "to_character": recipient,
        "topic": topic,
        "scope": scope,
        "story_day": story_day,
        "story_time": story_time,
        "notes": notes,
    } for recipient in to_characters]

    supabase.table("commitment_log").insert(rows).execute()
    return {"ok": True, "transferred_to": to_characters, "count": len(rows)}


# ============================================================================
# 2. negotiated_agreements
# ============================================================================

@mcp.tool()
async def record_agreement(
    project: str,
    agreement_slug: str,
    parties: List[str],
    terms: str,
    notes: Optional[str] = None,
) -> dict:
    """Create a new agreement. If an active version exists with this slug, errors —
    use supersede_agreement instead."""
    pt_id = await get_active_playthrough(project)
    story_day, story_time = await get_clock(project)

    existing = supabase.table("negotiated_agreements") \
        .select("id, version") \
        .eq("playthrough_id", str(pt_id)) \
        .eq("agreement_slug", agreement_slug) \
        .eq("status", "active") \
        .execute()

    if existing.data:
        return {
            "ok": False,
            "error": f"active agreement '{agreement_slug}' already exists (v{existing.data[0]['version']}). Use supersede_agreement.",
            "existing_id": existing.data[0]["id"],
        }

    row = supabase.table("negotiated_agreements").insert({
        "project_id": project,
        "playthrough_id": str(pt_id),
        "agreement_slug": agreement_slug,
        "version": 1,
        "parties": parties,
        "status": "active",
        "terms": terms,
        "story_day": story_day,
        "story_time": story_time,
        "notes": notes,
    }).execute()

    return {"ok": True, "id": row.data[0]["id"]}


@mcp.tool()
async def supersede_agreement(
    project: str,
    agreement_slug: str,
    new_terms: str,
    parties: Optional[List[str]] = None,
    notes: Optional[str] = None,
) -> dict:
    """Renegotiate. Old version goes to status='superseded', new version becomes active.
    parties defaults to existing if not provided."""
    pt_id = await get_active_playthrough(project)
    story_day, story_time = await get_clock(project)

    existing = supabase.table("negotiated_agreements") \
        .select("*") \
        .eq("playthrough_id", str(pt_id)) \
        .eq("agreement_slug", agreement_slug) \
        .eq("status", "active") \
        .execute()

    if not existing.data:
        return {"ok": False, "error": f"no active agreement '{agreement_slug}' to supersede"}

    old = existing.data[0]

    new_row = supabase.table("negotiated_agreements").insert({
        "project_id": project,
        "playthrough_id": str(pt_id),
        "agreement_slug": agreement_slug,
        "version": old["version"] + 1,
        "parties": parties or old["parties"],
        "status": "active",
        "terms": new_terms,
        "story_day": story_day,
        "story_time": story_time,
        "notes": notes,
    }).execute()

    supabase.table("negotiated_agreements") \
        .update({"status": "superseded", "superseded_by": new_row.data[0]["id"]}) \
        .eq("id", old["id"]) \
        .execute()

    return {"ok": True, "new_id": new_row.data[0]["id"], "new_version": old["version"] + 1, "superseded_id": old["id"]}


@mcp.tool()
async def get_agreement(project: str, agreement_slug: str) -> dict:
    """Get the active version of an agreement."""
    pt_id = await get_active_playthrough(project)
    result = supabase.table("negotiated_agreements") \
        .select("*") \
        .eq("playthrough_id", str(pt_id)) \
        .eq("agreement_slug", agreement_slug) \
        .eq("status", "active") \
        .execute()
    return result.data[0] if result.data else {"found": False}


@mcp.tool()
async def list_active_agreements(project: str) -> dict:
    """List all active agreements for orientation at session start."""
    pt_id = await get_active_playthrough(project)
    result = supabase.table("negotiated_agreements") \
        .select("agreement_slug, parties, terms, story_day, story_time, version") \
        .eq("playthrough_id", str(pt_id)) \
        .eq("status", "active") \
        .order("story_day").order("story_time") \
        .execute()
    return {"agreements": result.data}


@mcp.tool()
async def mark_agreement_broken(project: str, agreement_slug: str, notes: Optional[str] = None) -> dict:
    """Mark an agreement broken — one party violated the terms."""
    pt_id = await get_active_playthrough(project)
    supabase.table("negotiated_agreements") \
        .update({"status": "broken", "notes": notes}) \
        .eq("playthrough_id", str(pt_id)) \
        .eq("agreement_slug", agreement_slug) \
        .eq("status", "active") \
        .execute()
    return {"ok": True}


# ============================================================================
# 3. narrator_corrections
# ============================================================================

@mcp.tool()
async def add_correction(
    project: str,
    rule_slug: str,
    rule_text: str,
    category: str,
    playthrough_scoped: bool = False,
    notes: Optional[str] = None,
) -> dict:
    """Record a standing OOC calibration. Default: project-wide (all playthroughs).
    Set playthrough_scoped=True for one-playthrough-only rules.

    category: 'continuity' | 'voice' | 'agency' | 'register' | 'meta'
    """
    if category not in ("continuity", "voice", "agency", "register", "meta"):
        return {"ok": False, "error": f"invalid category: {category}"}

    pt_id = await get_active_playthrough(project) if playthrough_scoped else None
    story_day, story_time = await get_clock(project)

    row = supabase.table("narrator_corrections").upsert({
        "project_id": project,
        "playthrough_id": str(pt_id) if pt_id else None,
        "rule_slug": rule_slug,
        "rule_text": rule_text,
        "category": category,
        "surfaced_at_day": story_day,
        "surfaced_at_time": story_time,
        "active": True,
        "notes": notes,
    }, on_conflict="project_id,playthrough_id,rule_slug").execute()

    return {"ok": True, "id": row.data[0]["id"]}


@mcp.tool()
async def list_active_corrections(project: str) -> dict:
    """List all active corrections for this project + current playthrough.
    Called at session start to load calibrations into context."""
    pt_id = await get_active_playthrough(project)
    result = supabase.rpc("list_active_corrections_fn", {
        "p_project_id": project,
        "p_playthrough_id": str(pt_id),
    }).execute()
    # Fallback if RPC isn't set up: do two queries
    return {"corrections": result.data}


@mcp.tool()
async def deactivate_correction(project: str, rule_slug: str) -> dict:
    """Retire a correction that no longer applies."""
    supabase.table("narrator_corrections") \
        .update({"active": False}) \
        .eq("project_id", project) \
        .eq("rule_slug", rule_slug) \
        .execute()
    return {"ok": True}


# ============================================================================
# 4. recurring_bits
# ============================================================================

@mcp.tool()
async def log_bit(
    project: str,
    bit_slug: str,
    bit_text: str,
    parties: Optional[List[str]] = None,
    origin_context: Optional[str] = None,
) -> dict:
    """Record a new recurring gag/catchphrase."""
    pt_id = await get_active_playthrough(project)
    story_day, story_time = await get_clock(project)

    row = supabase.table("recurring_bits").upsert({
        "project_id": project,
        "playthrough_id": str(pt_id),
        "bit_slug": bit_slug,
        "bit_text": bit_text,
        "origin_day": story_day,
        "origin_time": story_time,
        "origin_context": origin_context,
        "parties": parties or [],
        "last_used_day": story_day,
        "last_used_time": story_time,
        "status": "active",
    }, on_conflict="playthrough_id,bit_slug").execute()

    return {"ok": True, "id": row.data[0]["id"]}


@mcp.tool()
async def bump_bit(project: str, bit_slug: str) -> dict:
    """Mark a bit as used in the current scene. Updates last_used + increments use_count."""
    pt_id = await get_active_playthrough(project)
    story_day, story_time = await get_clock(project)

    # Manual increment since supabase-py doesn't support .increment() in upsert
    current = supabase.table("recurring_bits") \
        .select("use_count") \
        .eq("playthrough_id", str(pt_id)) \
        .eq("bit_slug", bit_slug) \
        .single() \
        .execute()

    if not current.data:
        return {"ok": False, "error": f"bit '{bit_slug}' not found"}

    supabase.table("recurring_bits") \
        .update({
            "last_used_day": story_day,
            "last_used_time": story_time,
            "use_count": current.data["use_count"] + 1,
        }) \
        .eq("playthrough_id", str(pt_id)) \
        .eq("bit_slug", bit_slug) \
        .execute()
    return {"ok": True}


@mcp.tool()
async def list_active_bits(project: str) -> dict:
    """List active bits for orientation at session start."""
    pt_id = await get_active_playthrough(project)
    result = supabase.table("recurring_bits") \
        .select("bit_slug, bit_text, parties, last_used_day, use_count") \
        .eq("playthrough_id", str(pt_id)) \
        .eq("status", "active") \
        .order("last_used_day", desc=True) \
        .execute()
    return {"bits": result.data}


# ============================================================================
# 5. residency_map
# ============================================================================

@mcp.tool()
async def place_character(
    project: str,
    character_id: str,
    location_slug: str,
    notes: Optional[str] = None,
) -> dict:
    """Place a character at a location. Closes any existing 'current' row for them."""
    pt_id = await get_active_playthrough(project)
    story_day, story_time = await get_clock(project)

    # Close existing current row
    supabase.table("residency_map") \
        .update({"status": "past", "departed_day": story_day, "departed_time": story_time}) \
        .eq("playthrough_id", str(pt_id)) \
        .eq("character_id", character_id) \
        .eq("status", "current") \
        .execute()

    # Insert new current row
    row = supabase.table("residency_map").insert({
        "project_id": project,
        "playthrough_id": str(pt_id),
        "character_id": character_id,
        "location_slug": location_slug,
        "arrived_day": story_day,
        "arrived_time": story_time,
        "status": "current",
        "notes": notes,
    }).execute()

    return {"ok": True, "id": row.data[0]["id"]}


@mcp.tool()
async def who_is_at(project: str, location_slug: str) -> dict:
    """List characters currently at a location."""
    pt_id = await get_active_playthrough(project)
    result = supabase.table("residency_map") \
        .select("character_id, arrived_day, arrived_time, notes") \
        .eq("playthrough_id", str(pt_id)) \
        .eq("location_slug", location_slug) \
        .eq("status", "current") \
        .execute()
    return {"location": location_slug, "characters": result.data}


@mcp.tool()
async def where_is(project: str, character_id: str) -> dict:
    """Get a character's current location."""
    pt_id = await get_active_playthrough(project)
    result = supabase.table("residency_map") \
        .select("location_slug, arrived_day, arrived_time, notes") \
        .eq("playthrough_id", str(pt_id)) \
        .eq("character_id", character_id) \
        .eq("status", "current") \
        .single() \
        .execute()
    return result.data if result.data else {"found": False, "character_id": character_id}


@mcp.tool()
async def list_location_residents(project: str) -> dict:
    """All current location placements. For orientation."""
    pt_id = await get_active_playthrough(project)
    result = supabase.table("residency_map") \
        .select("character_id, location_slug, notes") \
        .eq("playthrough_id", str(pt_id)) \
        .eq("status", "current") \
        .order("location_slug") \
        .execute()
    return {"residents": result.data}


# ============================================================================
# 6. pending_beats
# ============================================================================

@mcp.tool()
async def add_pending_beat(
    project: str,
    beat_slug: str,
    description: str,
    earliest_day: Optional[int] = None,
    earliest_time: Optional[str] = None,
    latest_day: Optional[int] = None,
    latest_time: Optional[str] = None,
    trigger_type: str = "time",
    trigger_detail: Optional[str] = None,
    parties: Optional[List[str]] = None,
    notes: Optional[str] = None,
) -> dict:
    """Record a story commitment waiting to land.

    trigger_type: 'time' | 'location' | 'event' | 'player_initiated'
    """
    pt_id = await get_active_playthrough(project)
    story_day, story_time = await get_clock(project)

    row = supabase.table("pending_beats").upsert({
        "project_id": project,
        "playthrough_id": str(pt_id),
        "beat_slug": beat_slug,
        "description": description,
        "earliest_day": earliest_day,
        "earliest_time": earliest_time,
        "latest_day": latest_day,
        "latest_time": latest_time,
        "trigger_type": trigger_type,
        "trigger_detail": trigger_detail,
        "parties": parties or [],
        "notes": notes,
        "status": "pending",
        "created_day": story_day,
        "created_time": story_time,
    }, on_conflict="playthrough_id,beat_slug").execute()

    return {"ok": True, "id": row.data[0]["id"]}


@mcp.tool()
async def land_beat(project: str, beat_slug: str, notes: Optional[str] = None) -> dict:
    """Mark a pending beat as landed (rendered in scene)."""
    pt_id = await get_active_playthrough(project)
    story_day, story_time = await get_clock(project)

    supabase.table("pending_beats") \
        .update({
            "status": "landed",
            "landed_day": story_day,
            "landed_time": story_time,
            "notes": notes,
        }) \
        .eq("playthrough_id", str(pt_id)) \
        .eq("beat_slug", beat_slug) \
        .eq("status", "pending") \
        .execute()
    return {"ok": True}


@mcp.tool()
async def cancel_beat(project: str, beat_slug: str, notes: Optional[str] = None) -> dict:
    """Cancel a pending beat (the situation that motivated it changed)."""
    pt_id = await get_active_playthrough(project)
    supabase.table("pending_beats") \
        .update({"status": "cancelled", "notes": notes}) \
        .eq("playthrough_id", str(pt_id)) \
        .eq("beat_slug", beat_slug) \
        .execute()
    return {"ok": True}


@mcp.tool()
async def list_pending_beats(project: str, include_overdue: bool = True) -> dict:
    """List all pending beats. Auto-flags overdue ones based on current clock."""
    pt_id = await get_active_playthrough(project)
    story_day, story_time = await get_clock(project)

    result = supabase.table("pending_beats") \
        .select("*") \
        .eq("playthrough_id", str(pt_id)) \
        .eq("status", "pending") \
        .order("latest_day").order("latest_time") \
        .execute()

    pending = []
    overdue = []
    for beat in result.data:
        is_overdue = (
            beat["latest_day"] is not None and beat["latest_time"] is not None
            and (beat["latest_day"] < story_day
                 or (beat["latest_day"] == story_day and beat["latest_time"] < story_time))
        )
        if is_overdue:
            overdue.append(beat)
        else:
            pending.append(beat)

    out = {"pending": pending}
    if include_overdue:
        out["overdue"] = overdue
    return out


# ============================================================================
# start_session extension
# ============================================================================

# Add to the existing start_session tool's return payload these fields:
#
#   "active_corrections": <list_active_corrections result>
#   "active_agreements": <list_active_agreements result>
#   "active_bits": <list_active_bits result>
#   "current_residency": <list_location_residents result>
#   "pending_beats": <list_pending_beats result, with overdue flagged>
#
# These five additions give the narrator everything needed to honor
# calibrations, standing terms, recurring bits, who's where, and what
# story commitments are due.
