# Connecting narrator-state to Cowork

Goal: light up the **Story-state** panel in the Marauders Campaign Console with live
clock / cast / missions / flags, the same way the **Recall** half already works.

## Why this is the path (and why the tunnel won't do it)

A Cowork artifact runs in a **sandbox with no outbound network** except a short list of
whitelisted CDNs. The desktop tracker reaches narrator-state by `fetch`-ing your
Cloudflare tunnel (`/rest/get_state`) — that call is **blocked** from inside a Cowork
artifact. The only channel an artifact has is `window.cowork.callMcpTool()`, and that can
only reach MCP servers **Cowork itself has connected**.

holystone shows up in the console because it's connected to Cowork as an MCP server
(its tools surface as `mcp__holystone__recall`, `…__find_quote`, `…__list_sessions`).
narrator-state has to be connected the same way. It's a **registration step, not a build** —
the server and `get_state` already exist.

## The working example: how holystone is wired

- `holystone-mcp` console script → `FastMCP("holystone")`, **stdio** transport
  (`holystone/holystone/mcp_server.py`).
- Registered as a Cowork connector → tools appear under `mcp__holystone__*`.

narrator-state mirrors this exactly:

- `pyproject.toml` exposes console script **`narrator-state`** → `narrator_state.server:main`,
  which is `FastMCP("narrator-state")`, stdio by default.
- `get_state(project, include_history=false, memory_book_entries=5)` returns `{ "state": {…} }` —
  precisely the shape the panel reads. No new code needed for the base panel.

## Steps

1. **Install so the command is on PATH** (same interpreter Cowork launches):

   ```
   pip install -e "C:\Users\cwadd\Documents\GitHub\llm-roleplay\projects\The Last of Us\Allegheny\narrator-state"
   ```

   Add the Supabase extra only if you want the v1.2 extension tables (commitments,
   agreements, pending beats, etc.):

   ```
   pip install -e "…\narrator-state[supabase]"
   ```

2. **Register it as a Cowork MCP server.** In the desktop app: Settings → Connectors /
   Extensions → add a local (stdio) MCP server with command `narrator-state`, no args.
   If you edit the config file directly, the entry mirrors holystone's:

   ```json
   {
     "mcpServers": {
       "narrator-state": { "command": "narrator-state" }
     }
   }
   ```

   If the bare command isn't found, use the full path to the console script or
   `python -m narrator_state.server`. Add an `env` block (SUPABASE_URL / key) only if the
   extension tables need it — the base state tools don't.

3. **Restart Cowork** so it launches the server. The tools appear as
   `mcp__narrator-state__*` (or `mcp__narrator_state__*`).

The console panel already probes both id spellings and renders automatically once either
answers. If your registered id differs, tell me the exact name and I'll set it (one line).

## Match the project slug

The console is wired to project **`marauders`**. narrator-state keeps one JSON per project
at `~/.narrator-state/<project>.json` and auto-creates it on first `get_state`. For the two
halves to describe the *same* campaign, use the **same slug** for both the holystone embed
and the narrator-state project. (The tracker uses `allegheny`; `marauders` has no
narrator-state file yet, so `get_state` will return an empty default until you run a session
under that slug.)

## Optional: one endpoint for both

holystone's `register()` is written to mount recall onto narrator-state's server:

```python
from holystone.mcp_server import register as register_recall
register_recall(narrator_state.mcp)   # one server exposes state AND recall
```

Handy for your remote/tunnel + the tracker. For Cowork, connecting the two servers
independently is simpler and works just as well.

## Security

Keep narrator-state on **stdio** for Cowork — no port is exposed. Only use `--http` + the
REST patch behind the token/tunnel for the desktop tracker.
