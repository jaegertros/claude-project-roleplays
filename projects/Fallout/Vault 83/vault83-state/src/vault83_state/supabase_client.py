"""Supabase client init for vault83-state extension tables.

Adapted from hohenwald_state.supabase_client — same lazy-init + env-or-config
file resolution pattern. The local-JSON store (store.py / schema.py) is
authoritative for core state. Supabase handles the Vault-83-specific
extension tables plus the shared journal_entries table:

    vault83_tier_transitions, vault83_advancement_reviews,
    vault83_admission_ledger_views, vault83_depth_log,
    vault83_anchor_attendance, vault83_endings,
    journal_entries (shared with the rest of the roleplay repo)

Config resolution order (env vars override config file):

    1. Env vars `SUPABASE_URL` and `SUPABASE_KEY` (if both set, win)
    2. ~/.vault83-state/config.json — {"supabase_url": "...", "supabase_key": "..."}
    3. None — extension tools then return ok:False with a clear setup hint.
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
_client_cache: Any = "uninitialized"  # sentinel; not None
_last_error: str | None = None


def _config_path() -> Path:
    return Path.home() / ".vault83-state" / "config.json"


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
        return env_url or file_url, env_key or file_key

    return None, None


def get_supabase() -> Any:
    """Return the Supabase client, or None if not configured."""
    global _client_cache, _last_error

    if _client_cache != "uninitialized":
        return _client_cache

    if create_client is None:
        _last_error = (
            "supabase-py is not installed. Run: "
            "pip install 'vault83-state[supabase]' "
            "(or pip install supabase>=2.0.0)."
        )
        _client_cache = None
        return None

    url, key = _resolve_creds()
    if not url or not key:
        _last_error = (
            "Supabase credentials not configured. Set SUPABASE_URL and "
            "SUPABASE_KEY env vars, or write "
            "{\"supabase_url\": \"...\", \"supabase_key\": \"...\"} to "
            "~/.vault83-state/config.json. The local-JSON tools (clock, "
            "residents, tier, depth, flags, anchors, choice) keep working; "
            "only the extension tools (tier_transitions, advancement_reviews, "
            "ledger_views, depth_log, anchor_attendance, endings, journal) "
            "need Supabase."
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
    """Last init error message, or None if the client is healthy / unqueried."""
    return _last_error


def reset() -> None:
    """Drop the cached client. Used by tests; not generally called by tools."""
    global _client_cache, _last_error
    _client_cache = "uninitialized"
    _last_error = None


def require_client() -> tuple[Any, str | None]:
    """Convenience for tool implementations: returns (client, error_message).

    If client is None, error_message contains a user-facing string. If client
    is not None, error_message is None.
    """
    client = get_supabase()
    if client is None:
        return None, last_error() or "Supabase client unavailable."
    return client, None
