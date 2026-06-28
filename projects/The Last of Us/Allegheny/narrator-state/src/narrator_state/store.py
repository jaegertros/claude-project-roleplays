"""Storage layer for narrator-state.

One JSON document per project at ~/.narrator-state/<project>.json.
Atomic writes via tempfile + rename. Auto-create on first access.
"""

from __future__ import annotations

import json
import os
import shutil
import tempfile
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

from .schema import (
    SCHEMA_VERSION,
    SchemaVersionError,
    default_state,
    validate_schema_version,
)


# ---------------------------------------------------------------------------
# Paths
# ---------------------------------------------------------------------------


def state_dir() -> Path:
    """Where state files live. Created on first call."""
    d = Path.home() / ".narrator-state"
    d.mkdir(parents=True, exist_ok=True)
    return d


def backup_dir() -> Path:
    """Where schema-migration backups go."""
    d = state_dir() / "backups"
    d.mkdir(parents=True, exist_ok=True)
    return d


def state_path(project: str) -> Path:
    """Path to a specific project's state file."""
    # Project name is a slug — restrict to safe chars to avoid path traversal.
    if not project or not all(c.isalnum() or c in "-_" for c in project):
        raise ValueError(
            f"Invalid project name {project!r} — must be alphanumeric, "
            "with hyphens or underscores."
        )
    return state_dir() / f"{project}.json"


# ---------------------------------------------------------------------------
# Read / write
# ---------------------------------------------------------------------------


def load_state(project: str) -> tuple[dict, bool]:
    """Load a project's state, creating it if absent.

    Returns:
        (state_dict, created_flag) — created_flag is True if the file didn't
        exist and was just created with defaults.
    """
    path = state_path(project)
    if not path.exists():
        state = default_state(project)
        save_state(project, state)
        return state, True

    with path.open("r", encoding="utf-8") as f:
        state = json.load(f)

    # Schema check — refuse to load incompatible versions.
    try:
        validate_schema_version(state)
    except SchemaVersionError:
        raise

    # Lazy v1.0 -> v1.1 migration: add knowledge_transfers if missing, add
    # the kt counter if missing. Idempotent — running on a v1.1 file is a no-op.
    if state.get("schema_version") == "1.0":
        if "knowledge_transfers" not in state:
            state["knowledge_transfers"] = []
        state.setdefault("_counters", {}).setdefault("kt", 0)
        state["schema_version"] = "1.1"
        try:
            backup_state(project, label="pre-v1.1-migration")
        except FileNotFoundError:
            pass  # First-touch edge case; nothing to back up.
        save_state(project, state)

    # Lazy v1.1 -> v1.2 migration: add playthrough_id field (None until first
    # start_session mints a UUID). Idempotent — v1.2 files skip this branch.
    if state.get("schema_version") == "1.1":
        state.setdefault("playthrough_id", None)
        state["schema_version"] = SCHEMA_VERSION
        try:
            backup_state(project, label="pre-v1.2-migration")
        except FileNotFoundError:
            pass
        save_state(project, state)

    return state, False


def save_state(project: str, state: dict) -> None:
    """Persist state atomically.

    Updates last_updated timestamp on every save. Uses tempfile + rename
    so a crash mid-write doesn't corrupt the file.
    """
    state["last_updated"] = datetime.now(timezone.utc).isoformat(timespec="seconds")

    path = state_path(project)
    # Atomic write: write to a tempfile in the same directory, then rename.
    fd, tmp_path = tempfile.mkstemp(
        prefix=f".{project}.",
        suffix=".tmp",
        dir=path.parent,
    )
    try:
        with os.fdopen(fd, "w", encoding="utf-8") as f:
            json.dump(state, f, indent=2, ensure_ascii=False)
            f.flush()
            os.fsync(f.fileno())
        os.replace(tmp_path, path)
    except Exception:
        # Clean up tempfile on failure.
        try:
            os.unlink(tmp_path)
        except OSError:
            pass
        raise


def backup_state(project: str, label: str = "manual") -> Path:
    """Copy current state to backups/ with a timestamped label.

    Returns the backup path. Used before risky operations.
    """
    src = state_path(project)
    if not src.exists():
        raise FileNotFoundError(f"No state file to back up for project {project!r}.")

    ts = datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%SZ")
    dst = backup_dir() / f"{project}.json.bak-{ts}-{label}"
    shutil.copy2(src, dst)
    return dst


# ---------------------------------------------------------------------------
# Audit log + undo
# ---------------------------------------------------------------------------


def append_audit(state: dict, entry: dict[str, Any]) -> None:
    """Append an entry to the audit log for undo.

    Each entry records the operation type and enough information to
    reverse it. Entries are minimal — the state itself is the source
    of truth; the audit log only records the diff.
    """
    state["_audit_log"].append(
        {
            "ts": datetime.now(timezone.utc).isoformat(timespec="seconds"),
            **entry,
        }
    )
    # Cap audit log to last 100 entries to bound file size.
    if len(state["_audit_log"]) > 100:
        state["_audit_log"] = state["_audit_log"][-100:]


def pop_audit(state: dict) -> dict | None:
    """Remove and return the most recent audit entry, or None if empty."""
    if not state["_audit_log"]:
        return None
    return state["_audit_log"].pop()


# ---------------------------------------------------------------------------
# Counter helpers
# ---------------------------------------------------------------------------


def next_id(state: dict, counter_name: str, prefix: str) -> str:
    """Allocate the next monotonic ID for a given counter."""
    if counter_name not in state["_counters"]:
        state["_counters"][counter_name] = 0
    state["_counters"][counter_name] += 1
    return f"{prefix}-{state['_counters'][counter_name]:03d}"
