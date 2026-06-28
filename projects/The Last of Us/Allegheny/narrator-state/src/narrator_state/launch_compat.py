"""Launch narrator-state with a compatibility wrapper for MCP clients that
DON'T send `Accept: text/event-stream` in their POST /mcp Accept header.

Why this exists
---------------
The MCP streamable-http spec requires clients POSTing to /mcp to send
`Accept: application/json, text/event-stream`. FastMCP enforces this
strictly — clients sending only `Accept: application/json` get back:

    HTTP/1.1 406 Not Acceptable
    {"jsonrpc":"2.0","id":"server-error","error":{"code":-32600,
     "message":"Not Acceptable: Client must accept both
                application/json and text/event-stream"}}

The Claude.ai web Project MCP connector (as of 2026-05) doesn't send the
event-stream Accept type, so it can't complete the handshake against an
unmodified FastMCP streamable-http server.

This launcher wraps the FastMCP ASGI app in a tiny middleware that, for
POST /mcp requests, injects `text/event-stream` into the Accept header
before the strict check sees it. Everything else passes through unchanged.

Run it the same way as launch.py:

    python -m narrator_state.launch_compat

The Cloudflare Tunnel config doesn't need to change — same host:port.
"""
from __future__ import annotations

import os
import sys


def _build_app():
    """Return FastMCP's Starlette app, however the current version exposes it."""
    from . import server as _server

    mcp = _server.mcp
    for method_name in ("streamable_http_app", "starlette_app"):
        fn = getattr(mcp, method_name, None)
        if callable(fn):
            return fn()
    raise RuntimeError(
        "Could not locate FastMCP's Starlette app. "
        "Tried: streamable_http_app(), starlette_app(). "
        "FastMCP version may have changed — inspect mcp.server.fastmcp.FastMCP."
    )


def _accept_inject(app):
    """ASGI middleware: ensure POST /mcp Accept includes text/event-stream.

    Other paths (incl. /rest/*, /health, /sse, OPTIONS preflights) pass
    through untouched.
    """
    async def wrapped(scope, receive, send):
        if scope.get("type") == "http" and scope.get("path") == "/mcp":
            headers = list(scope.get("headers", []))
            new_headers = []
            saw_accept = False
            for k, v in headers:
                if k == b"accept":
                    saw_accept = True
                    accept_str = v.decode("latin-1")
                    if "text/event-stream" not in accept_str.lower():
                        accept_str = (
                            f"{accept_str.strip().rstrip(',')}, text/event-stream"
                            if accept_str.strip()
                            else "application/json, text/event-stream"
                        )
                    new_headers.append((b"accept", accept_str.encode("latin-1")))
                else:
                    new_headers.append((k, v))
            if not saw_accept:
                new_headers.append(
                    (b"accept", b"application/json, text/event-stream")
                )
            scope = {**scope, "headers": new_headers}
        await app(scope, receive, send)

    return wrapped


def main() -> None:
    # Import order matches launch.py: server + supabase_tools register their
    # @mcp.tool definitions, THEN server_rest_patch enumerates them to build
    # _TOOL_MAP for /rest/<tool>. Inverting this order silently drops tools.
    from . import server  # noqa: F401  registers core @mcp.tool defs
    from . import supabase_tools  # noqa: F401  registers extension-table @mcp.tool defs
    from . import server_rest_patch  # noqa: F401  mounts /rest/<name> + /health routes

    app = _accept_inject(_build_app())

    # Resolve host/port. Precedence:
    #   1. NARRATOR_STATE_HOST / NARRATOR_STATE_PORT env vars (handy for testing
    #      on an alt port without editing server.py)
    #   2. mcp.settings (what server.py constructed FastMCP with — 127.0.0.1:8765)
    #   3. hardcoded fallback
    mcp = server.mcp
    settings = getattr(mcp, "settings", None)
    host = (
        os.environ.get("NARRATOR_STATE_HOST")
        or getattr(settings, "host", None)
        or "127.0.0.1"
    )
    port = int(
        os.environ.get("NARRATOR_STATE_PORT")
        or getattr(settings, "port", None)
        or 8765
    )

    print(f"narrator-state (compat launcher) listening on http://{host}:{port}", file=sys.stderr)
    print("  /mcp     — streamable-http MCP, Accept header relaxed", file=sys.stderr)
    print("  /rest/.. — REST shim (tools as POST endpoints)", file=sys.stderr)
    print("  /health  — liveness/readiness", file=sys.stderr)

    import uvicorn

    uvicorn.run(app, host=host, port=port, log_level="info")


if __name__ == "__main__":
    main()
