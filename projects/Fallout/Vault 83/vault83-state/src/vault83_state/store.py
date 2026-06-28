"""Storage layer for vault83-state.

One JSON document per project at ~/.vault83-state/<project>.json.
Atomic writes via tempfile + rename. Auto-create on first access.

Adapted from hohenwald_state.store — same atomic-write + audit log +
counter pattern. Vault 83 starts at schema v1.0, so there are no legacy
migrations to chain through. If a v1.0 -> v1.x migration ever lands, drop
it into load_state in the same idempotent style Allegheny uses for
v1.0 -> v1.2.
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


# ---------- Paths ----------


def state_dir() -> Path:
    """Where state files live. Created on first call."""
    d = Path.home() / ".vault83-state"
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


# ---------- Read / write ----------


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
    validate_schema_version(state)

    # v1.0 is current; no migrations yet. When a v1.1 lands, slot the
    # idempotent migration block here (see hohenwald_state.store for the
    # backup-then-save pattern).

    return state, False


def save_state(project: str, state: dict) -> None:
    """Persist state atomically.

    Updates last_updated timestamp on every save. Uses tempfile + rename
    so a crash mid-write doesn't corrupt the file.
    """
    state["last_updated"] = datetime.now(timezone.utc).isoformat(timespec="seconds")

    path = state_path(project)
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


# ---------- Audit log + undo ----------


def append_audit(state: dict, entry: dict[str, Any]) -> None:
    """Append an entry to the audit log for undo."""
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


# ---------- Counter helpers ----------


def next_id(state: dict, counter_name: str, prefix: str) -> str:
    """Allocate the next monotonic ID for a given counter."""
    if counter_name not in state["_counters"]:
        state["_counters"][counter_name] = 0
    state["_counters"][counter_name] += 1
    return f"{prefix}-{state['_counters'][counter_name]:03d}"
