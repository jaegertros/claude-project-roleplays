# Marauders — Setup & Operating Guide

**Important reality about file access:** a normal Claude Desktop **chat/Project cannot
read or write your local files.** Only **Cowork** has folder access. So in a normal
RP chat, the bridge to your live campaign state is an **MCP server** — `marauders-state`,
which runs locally, touches the JSON on disk, and exposes the data to the chat as tools.

```
 marauders-state MCP (local)  ── ONE connector, gives the chat:
    • get_state / update_state / get_full      -> your live state (server reads/writes the JSON)
    • recall / find_quote / list_sessions      -> holystone memory (mounted on it)
    • vec_* tools                              -> vectorization
 marauders-narrator skill     -> tells the narrator to USE those tools + the rules
 state/*.json                 -> source of truth on disk (managed by the server)
```

================================================================
## RECOMMENDED — play in a normal Desktop chat/Project
================================================================

### One-time
1. **Add the marauders-state MCP** to
   `C:\Users\cwadd\AppData\Roaming\Claude\claude_desktop_config.json`:
   ```json
   "mcpServers": {
     "marauders-state": {
       "command": "python",
       "args": ["C:\\Users\\cwadd\\Documents\\GitHub\\llm-roleplay\\projects\\Harry Potter\\Marauders\\marauders-state-mcp\\server.py"]
     }
   }
   ```
   Restart Desktop. (It auto-loads `holystone/.env` for the DB + key.) This one server
   covers state **and** memory **and** vectorization, so you don't need a separate
   holystone entry — though keeping one is harmless.

2. **Install the skill** — Settings → Capabilities → add a skill → point at
   `...\Marauders\marauders-narrator-skill`. The skill is written to prefer the MCP
   tools (`get_full`, `update_state`, …) when they're connected — which is exactly the
   no-file-access chat case.

3. **Set up the Project** (chat Project for organising):
   - Upload the lore as Project knowledge: `KNOWLEDGE_*.md`, `PROJECT_INSTRUCTIONS.md`,
     and a copy of `state/MARAUDERS_STATE.md`.
   - Paste this into the Project's **custom instructions**:
     > At the start of every session, before narrating, invoke the marauders-narrator
     > skill: call `get_full` on the marauders-state server for current state, call
     > `recall` (project "marauders") to ground voice, then give a short "where we are
     > now." Update state with `update_state` as things change. Never reset a
     > character's standing (see each entry's `earned` field).

### Every session
- Start a chat in the Project: **“load Marauders state.”**
  (Narrator calls `get_full` + `recall`, gives the recap, plays.)
- It writes changes with `update_state`. `/recap`, `/where <name>`, `/save`, `/tracker`
  work as before — all through the server's tools.

================================================================
## ALTERNATIVE — Cowork (has folder access)
================================================================
In Cowork the skill can read/write `state/*.json` **directly** (no server needed for
state), and holystone recall is available as an MCP. Good for maintenance/edits; not
the ideal surface for long RP chats. If you play here, just say “load Marauders state.”

================================================================
## OPTIONAL — live dashboard
================================================================
- In chat: `/tracker` renders `marauders-tracker.html` from current state.
- Live web panel: in a terminal —
  ```
  cd "...\Marauders\marauders-state-mcp"
  $env:MARAUDERS_REST_TOKEN="pick-a-secret"
  python server.py --http --port 8800
  ```
  open `..\marauders-tracker-live.html`, enter `http://127.0.0.1:8800` + token, Reload.
  (Run it with `--http` for the panel; the Desktop MCP entry above runs it in stdio mode
  for the chat. They're the same server, two transports — use whichever you need.)

================================================================
## OPTIONAL — embedding model tools (terminal only, never needed to play)
================================================================
- `python embed_menu.py`  — view scores, switch the live recall model
- `python full_trials.py` — re-run the full benchmark -> full_results.md
- Live model now: free `nemotron` (fine). Trial winner: `thenlper/gte-base`.

================================================================
## Requirements (already on your machine)
================================================================
holystone pip-installed; `holystone/.env` has OPENROUTER_API_KEY + DATABASE_URL;
`pip install numpy mcp psycopg[binary] httpx python-dotenv`; Python 3.10+.

## File map
- `state/` — state JSON + readable mirror + corpus manifest
- `marauders-narrator-skill/` — the skill (install)
- `marauders-state-mcp/` — the bridge server + vectorization tools + embed_menu.py
- `marauders-tracker*.html` — dashboards · `MARAUDERS_TOOLING.md` — architecture notes
