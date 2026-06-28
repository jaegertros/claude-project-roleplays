"""REST + CORS wrapper for the narrator-state FastMCP server.

This module mounts a thin REST surface alongside the standard MCP
streamable-http endpoint. It is intended to be IMPORTED by your launcher
*before* `mcp.run(...)`, so that the routes/middleware are attached to the
underlying Starlette app at startup time.

Usage (in your launcher):

    from narrator_state import server               # registers @mcp.tool defs
    from narrator_state import server_rest_patch    # this file; mounts REST routes
    server.main()                                   # or: server.mcp.run(transport="streamable-http")

What you get:

    POST   /rest/{tool_name}    JSON body in, JSON out. Calls the named tool.
    OPTIONS /rest/{tool_name}   CORS preflight (handled by middleware).
    GET    /health              Liveness check.

CORS:
    Currently set to allow_origins=["*"] so the tracker artifact (which
    runs from an opaque Anthropic-controlled origin) can hit it. Tighten
    after observing the actual Origin header in production logs.

Why a patch and not edits to server.py:
    server.py is the canonical source the Allegheny project ships with.
    Adding routes here keeps that file clean and makes path-2 opt-in.

Notes:
    - `custom_route` documents that decorated routes do NOT require
      authorization. If you want to gate the REST surface, add a token
      check inside `_dispatch_tool` (e.g. read X-Narrator-Token header
      and compare against an env var).
    - The REST handler imports tool functions by name from `.server`.
      That works because the @mcp.tool() decorator returns the original
      function unchanged.
"""

from __future__ import annotations

import inspect
import json
import os
from typing import Any, Callable

from starlette.requests import Request
from starlette.responses import JSONResponse, Response

# Import the FastMCP instance and all tool functions from the sibling module.
# Relative import — this module ships in the same package as server.py.
from . import server as _server

# Optional shared-secret check. If NARRATOR_REST_TOKEN is set in env, every
# POST must include `Authorization: Bearer <token>` or it gets a 401.
_REST_TOKEN = os.environ.get("NARRATOR_REST_TOKEN", "").strip() or None


# ---------------------------------------------------------------------------
# CORS — handled at response time. Starlette's CORSMiddleware would also work,
# but it has to be applied to the outer app construction, which is harder to
# retrofit. Inline headers on each response gets the same result and is
# easier to reason about for a debugging workflow.
# ---------------------------------------------------------------------------

_CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS, GET",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Narrator-Token",
    "Access-Control-Max-Age": "600",
}


def _cors(response: Response) -> Response:
    """Stamp CORS headers onto an outgoing response."""
    for k, v in _CORS_HEADERS.items():
        response.headers[k] = v
    return response


# ---------------------------------------------------------------------------
# Tool discovery — find the plain Python functions decorated with @mcp.tool
# ---------------------------------------------------------------------------


def _discover_tools() -> dict[str, Callable[..., dict]]:
    """Build a name -> callable map of all tools registered on the FastMCP instance.

    Pulls each Tool object directly from the tool manager and uses its `.fn`
    attribute — the original undecorated Python callable. This works
    regardless of which module the @mcp.tool was applied in (server.py,
    supabase_tools.py, or any future extension module).

    Fallback path scans `_server` module attributes for first-param-is-project
    functions, but should never trigger on current FastMCP versions.
    """
    tools: dict[str, Callable[..., dict]] = {}
    mcp = _server.mcp
    tm = getattr(mcp, "_tool_manager", None)

    # Primary path: extract callable from each Tool object in the tool manager.
    if tm is not None and hasattr(tm, "_tools"):
        for name, tool in tm._tools.items():
            fn = getattr(tool, "fn", None)
            if callable(fn):
                tools[name] = fn
        if tools:
            return tools

    # Fallback: scan _server for functions whose first param is `project`.
    # Used only if the tool manager interface changes shape.
    for name, obj in inspect.getmembers(_server, inspect.isfunction):
        if name.startswith("_") or name in {"main"}:
            continue
        if getattr(obj, "__module__", "") != _server.__name__:
            continue
        sig = inspect.signature(obj)
        params = list(sig.parameters.values())
        if not params or params[0].name != "project":
            continue
        tools[name] = obj
    return tools


# Build the map once at import time. If the server adds new tools later,
# re-import this module or restart.
_TOOL_MAP = _discover_tools()


# ---------------------------------------------------------------------------
# REST handlers
# ---------------------------------------------------------------------------


def _coerce_args(fn: Callable[..., Any], payload: dict) -> dict:
    """Drop keys not in the function's signature; coerce list-from-null cases.

    Tool functions are strict about their kwargs — passing an unknown key
    raises TypeError. This filter lets the artifact send a slightly-too-rich
    body without breaking. Anything strictly typed (e.g. list[str]) we leave
    to the function to validate.
    """
    sig = inspect.signature(fn)
    accepted = set(sig.parameters)
    return {k: v for k, v in payload.items() if k in accepted}


async def _dispatch_tool(request: Request) -> Response:
    """Handle POST /rest/{tool_name}.

    Body is JSON; we forward the parsed dict as **kwargs to the tool.
    Returns whatever the tool returns, JSON-encoded, with CORS headers.
    """
    # Auth check (optional, env-driven)
    if _REST_TOKEN:
        auth = request.headers.get("Authorization", "")
        token = request.headers.get("X-Narrator-Token", "")
        bearer = auth.removeprefix("Bearer ").strip() if auth.startswith("Bearer ") else ""
        if bearer != _REST_TOKEN and token != _REST_TOKEN:
            return _cors(JSONResponse({"ok": False, "error": "unauthorized"}, status_code=401))

    tool_name = request.path_params.get("tool_name", "")
    fn = _TOOL_MAP.get(tool_name)
    if fn is None:
        return _cors(
            JSONResponse(
                {"ok": False, "error": f"unknown tool: {tool_name!r}", "available": sorted(_TOOL_MAP)},
                status_code=404,
            )
        )

    # Parse body. Empty body is allowed (means no args other than project,
    # which still must be in the URL or body — we don't pull from URL here,
    # so it has to be in the body).
    try:
        body_bytes = await request.body()
        payload = json.loads(body_bytes) if body_bytes else {}
    except json.JSONDecodeError as e:
        return _cors(JSONResponse({"ok": False, "error": f"invalid JSON body: {e}"}, status_code=400))

    if not isinstance(payload, dict):
        return _cors(JSONResponse({"ok": False, "error": "body must be a JSON object"}, status_code=400))

    args = _coerce_args(fn, payload)

    # Call the tool. These are sync functions (despite the MCP server being
    # async-aware) — they read/write files, no awaiting needed.
    try:
        result = fn(**args)
    except TypeError as e:
        # Missing required argument, wrong type, etc.
        return _cors(JSONResponse({"ok": False, "error": f"call error: {e}"}, status_code=400))
    except Exception as e:
        # The tools themselves catch most internal errors and return _err(...).
        # This catches anything that escapes — unexpected, log-worthy.
        return _cors(JSONResponse({"ok": False, "error": f"unhandled: {type(e).__name__}: {e}"}, status_code=500))

    return _cors(JSONResponse(result))


async def _preflight(request: Request) -> Response:
    """Handle OPTIONS /rest/{tool_name} preflight — empty body, CORS headers."""
    return _cors(Response(status_code=204))


async def _health(request: Request) -> Response:
    """GET /health — liveness/readiness probe. Lists discovered tools."""
    return _cors(JSONResponse({"ok": True, "tools": sorted(_TOOL_MAP)}))


# ---------------------------------------------------------------------------
# Wire routes onto the FastMCP server
# ---------------------------------------------------------------------------


# Note: custom_route is a decorator factory — we use it imperatively here
# because we want to register module-level functions, not nested closures.
_server.mcp.custom_route("/rest/{tool_name}", methods=["POST"])(_dispatch_tool)
_server.mcp.custom_route("/rest/{tool_name}", methods=["OPTIONS"])(_preflight)
_server.mcp.custom_route("/health", methods=["GET", "OPTIONS"])(_health)


# Convenience export for callers that want to verify the patch took effect.
def installed_tools() -> list[str]:
    """Return the list of tool names exposed at /rest/{name}."""
    return sorted(_TOOL_MAP)


if __name__ == "__main__":  # pragma: no cover
    # Print the routes for debugging. Don't run the server here — that's
    # the launcher's job. Just import this module before launch.
    print("REST tools registered:")
    for name in installed_tools():
        print(f"  POST /rest/{name}")
    print("  GET  /health")
    print()
    print(f"Auth: {'token required (NARRATOR_REST_TOKEN set)' if _REST_TOKEN else 'open (no token)'}")
