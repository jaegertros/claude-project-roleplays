# Marauders tooling — what you have, and what I'd build

You asked me to compare the inventory ledger and holystone, figure out how holystone is meant to be used, and recommend an HP-specific setup. Here it is.

## The three things you already have (and why they kept feeling tangled)

They aren't competitors. They're **three layers of one design**, and you only ever wired two of them for Harry Potter.

| Layer | What it is | What it's *for* | State for Marauders? |
|---|---|---|---|
| **holystone** | A local Python pipeline + MCP server that cleans your logs and indexes them (full-text + vector) | **Memory.** "What was actually said / established about X" — verbatim recall to stop voice and fact drifting | Works. **All 11 sessions (rp01–rp11) now indexed.** |
| **marauders-inventory-ledger.jsx** | A React artifact (localStorage) | **The view.** A panel you glance at | Real HP data, but trapped in the artifact and current only to ~RP_09 |
| **narrator-state** (illucidate.org) | A FastMCP state server (`get_state`, `add_inventory`, …) | **The source of truth.** Structured state the narrator reads/writes during play | Its "marauders" slot is still shaped like *The Last of Us* — holds none of your wand/wood/potion state |

holystone's own README says the boundary out loud: *"Structured campaign state stays where it belongs — in your state tables; holystone is the texture layer underneath it."* So it was never "holystone **or** the ledger" — it's **memory (holystone) + state (the JSON / a server) + a view (the artifact)**, and the state layer was never reshaped from LoU to HP.

## What I built (the state layer, for HP)

- `state/marauders-state.json` — the reconciled, HP-shaped **source of truth** (clock, player, money, creatures, lore, wand projects, inventory, threads, flags), current through the end of RP_11.
- `state/marauders-relationships.json` — the **standing registry**: every character + an `earned` field, with the anti-reset rule so nobody forgets what Caleb has proven.
- `state/MARAUDERS_STATE.md` — the human-readable mirror.
- `marauders-narrator-skill/` — a Claude skill that loads the JSON + calls holystone at the start of a chat and carries the update/disambiguation rules.
- `build_tracker.py` + `marauders-tracker.html` — the visual dashboard (see below).

## The setup, lowest-friction first

### Tier 1 — Skill + JSON + holystone  ✅ *in use*
Claude Desktop. holystone runs as a local stdio MCP (memory); the skill + JSON hold state and are read/written locally; `PROJECT_INSTRUCTIONS.md` now forces the load every session. No hosting. This is what you're running.

### Tier 2 — Live state MCP  ✅ *BUILT (`marauders-state-mcp/`)*
The narrator-state server already has the machinery (inventory/clock/missions/flags) — it's just wearing LoU clothes. Give it the HP schema from the two JSON files and seed it from them. Then the narrator reads/writes real state over MCP across chats.

### Tier 3 — One endpoint (state + recall) + live panel  ✅ *BUILT*
Mount holystone onto the reshaped narrator-state (`register(narrator_state.mcp)`) so one URL serves state AND memory, then point an artifact at it (the ledger jsx already has a `callMcpTool` client). That's all three layers wired — and the auto-refreshing visual panel.

**Colab** isn't the home for any of this — good only for a one-time re-embed of logs into holystone, never live state.

## My recommendation
Run **Tier 1 now** (done). Move to **Tier 2** when chat-scoped state chafes. Do **Tier 3** for the always-on live panel. Each tier reuses the one below it.

## How to install the skill
Claude Desktop → **Settings → Capabilities** → add a skill → point it at `marauders-narrator-skill/`. Then start a Marauders chat (or Project) and say "load Marauders state."

## Visual tracker — what exists now, and the live version (next step)

**Now (built):** `build_tracker.py` renders the two state JSON files into a self-contained `marauders-tracker.html` — a tabbed dashboard (Overview / Inventory / Relationships / Threads / Lore). The skill's `/tracker` re-runs it, so it always reflects the latest saved state. It's a *snapshot you open*, not a self-refreshing page — accurate every time you regenerate it.

**Next step — the auto-refreshing panel.** To get a panel that updates itself without being re-asked, the state has to sit behind an MCP (not a local file), because a persistent Cowork/claude.ai artifact pulls from connectors. The path:

1. **Reshape `narrator-state` into an HP FastMCP.** Give the existing (LoU-shaped) server the HP schema from `marauders-state.json` + `marauders-relationships.json`, with `get_state` / `update_*` tools. Seed it from the JSON.
2. **Mount holystone onto it** — `from holystone.mcp_server import register as register_recall; register_recall(server.mcp)` — so one endpoint serves *state + memory* (one URL, one token).
3. **Point a persistent artifact at it.** A Cowork `create_artifact` page (or the existing `marauders-inventory-ledger.jsx`, which already has a `callMcpTool` sync client) calls `get_state` on load and renders it live — reload button included, no manual regeneration.

That makes the JSON the seed and the MCP the live source; the narrator writes state through the MCP during play and the panel just shows it. Until then, `/save` + `/tracker` is the reliable loop.
