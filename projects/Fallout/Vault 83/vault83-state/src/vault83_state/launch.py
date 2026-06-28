"""Launch vault83-state.

Place this file next to the `vault83_state/` package directory:

    your_project/
        vault83_state/
            __init__.py
            server.py
            supabase_tools.py
            schema.py
            store.py
            supabase_client.py
        launch.py        <-- this file

Run with:

    python launch.py
"""
# Adapted from hohenwald_state.launch
from vault83_state import server               # registers core @mcp.tool defs
from vault83_state import supabase_tools       # noqa: F401  registers extension @mcp.tool defs

# Order matters: importing supabase_tools registers its @mcp.tool decorators
# on the same FastMCP instance the core server module exposes.

if __name__ == "__main__":
    server.main()
