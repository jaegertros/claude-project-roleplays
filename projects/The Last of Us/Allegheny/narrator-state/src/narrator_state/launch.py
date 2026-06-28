"""Launch narrator-state with the REST patch attached.

Place this file next to the `narrator_state/` package directory:

    your_project/
        narrator_state/
            __init__.py
            server.py
            server_rest_patch.py
            schema.py
            store.py
        launch.py        <-- this file

Run with:

    python launch.py

The patch attaches /rest/{tool_name}, OPTIONS preflight, and /health routes
to the same Starlette app FastMCP uses internally, so your existing
Cloudflare Tunnel keeps working with no changes — the new routes appear
under the same hostname.
"""
from narrator_state import server               # registers core @mcp.tool defs (22)
from narrator_state import supabase_tools       # noqa: F401  registers extension-table @mcp.tool defs (22)
from narrator_state import server_rest_patch    # noqa: F401  builds _TOOL_MAP from ALL registered tools

# Order matters: server_rest_patch enumerates tools at import time, so the
# two tool-defining modules (server + supabase_tools) MUST be imported first.
# Otherwise the REST surface only exposes the core 22 tools.

if __name__ == "__main__":
    server.main()