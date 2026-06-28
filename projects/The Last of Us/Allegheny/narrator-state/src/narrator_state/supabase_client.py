"""Supabase client init for narrator-state extension tables.

The local-JSON store (store.py / schema.py) is unchanged and authoritative for
core state (characters, inventory, clock, awareness, flags, missions, etc.).
The Supabase backend ONLY handles the six v1.2 extension tables:

    commitment_log, negotiated_agreements, narrator_corrections,
    recurring_bits, residency_map, pending_beats

Config resolution order (env vars override config file):

    1. Env vars `SUPABASE_URL` and `SUPABASE_KEY` (if both set, win)
    2. ~/.narrator-state/config.json — {"supabase_url": "...", "supabase_key": "..."}
    3. None — extension tools then return ok:False with a clear setup hint.

The client is lazily initialized on first call and cached. Returns None if
config is missing or the client construction fails — extension tools check
for None and error gracefully without crashing the server.
"""

from __future__ import annotations

import json
import os
from pathlib import Path
from typing import Any

try:
    from supabase import create_client, Client
except ImportError:
    create_client = None
    Client = None


# Module-level cache. Read once per process. To force re-read, call reset().
_client_cache: Any = "uninitialized"  # sentinel; not None (None = explicit "no config")
_last_error: str | None = None


def _config_path() -> Path:
    return Path.home() / ".narrator-state" / "config.json"


def _read_config_file() -> tuple[str | None, str | None]:
    p = _config_path()
    if not p.exists():
        return None, None
    try:
        with p.open("r", encoding="utf-8") as f:
            cfg = json.load(f)
        return cfg.get("supabase_url"), cfg.get("supabase_key")
    except Exception:
        return None, None


def _resolve_creds() -> tuple[str | None, str | None]:
    """Env vars override config file. Either source must provide both fields."""
    env_url = os.environ.get("SUPABASE_URL")
    env_key = os.environ.get("SUPABASE_KEY")
    if env_url and env_key:
        return env_url, env_key

    file_url, file_key = _read_config_file()
    if file_url and file_key:
        # Allow env to partial-override file (e.g. config has url, env sets key)
        return env_url or file_url, env_key or file_key

    # Otherwise: not enough config to construct a client
    return None, None


def get_supabase() -> Any:
    """Return the Supabase client, or None if not configured.

    Caches the result across calls. Safe to call from every tool.
    """
    global _client_cache, _last_error

    if _client_cache != "uninitialized":
        return _client_cache

    if create_client is None:
        _last_error = (
            "supabase-py is not installed. Run: pip install supabase>=2.0.0"
        )
        _client_cache = None
        return None

    url, key = _resolve_creds()
    if not url or not key:
        _last_error = (
            "Supabase credentials not configured. Set SUPABASE_URL and "
            "SUPABASE_KEY env vars, or write {\"supabase_url\": \"...\", "
            "\"supabase_key\": \"...\"} to ~/.narrator-state/config.json. "
            "The local-JSON tools (clock, characters, inventory, missions, "
            "etc.) will keep working; only the six extension tools "
            "(commitment_log, negotiated_agreements, narrator_corrections, "
            "recurring_bits, residency_map, pending_beats) need Supabase."
        )
        _client_cache = None
        return None

    try:
        _client_cache = create_client(url, key)
        _last_error = None
    except Exception as e:
        _last_error = f"create_client failed: {e!r}"
        _client_cache = None

    return _client_cache


def last_error() -> str | None:
    """Return the last init error message, or None if the client is healthy
    or hasn't been queried yet."""
    return _last_error


def reset() -> None:
    """Drop the cached client. Next get_supabase() call re-reads config.
    Used by tests; not generally called by tool code."""
    global _client_cache, _last_error
    _client_cache = "uninitialized"
    _last_error = None


def require_client() -> tuple[Any, str | None]:
    """Convenience for tool implementations: returns (client, error_message).

    If client is None, error_message contains a user-facing string the tool
    can put in its `error` field. If client is not None, error_message is None.
    """
    client = get_supabase()
    if client is None:
        return None, last_error() or "Supabase client unavailable."
    return client, None
