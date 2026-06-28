# Marauders tooling — what you have, and what I'd build

You asked me to compare the inventory ledger and holystone, figure out how holystone is meant to be used, and recommend an HP-specific setup. Here it is.

## The three things you already have (and why they kept feeling tangled)

They aren't competitors. They're **three layers of one design**, and you only ever wired two of them for Harry Potter.

| Layer | What it is | What it's *for* | State for Marauders? |
|---|---|---|---|
| **holystone** | A local Python pipeline + MCP server that cleans your logs and indexes them (full-text + vector) | **Memory.** "What was actually said / established about X" — verbatim recall to stop voice and fact from drifting | ✅ Works. All 10 sessions already indexed. |
| **marauders-inventory-ledger.jsx** | A React artifact (localStorage) | **The view.** A panel you glance at — inventory, money, clock, potions | ✅ Real HP data, but trapped in the artifact and current only to ~RP_09 |
| **narrator-state** (illucidate.org) | A FastMCP state server (`get_state`, `add_inventory`, `set_flag`, …) | **The source of truth.** Structured campaign state the narrator reads/writes during play | ❌ Its "marauders" slot is still shaped like *The Last of Us* — factions are Jackson/FEDRA/Fireflies, flags are about cordyceps. It holds none of your wand/wood/potion state. |

holystone's own README says the boundary out loud: *"Structured campaign state stays where it belongs — in your state tables; holystone is the texture layer underneath it."* So the question was never "holystone **or** the ledger" — it's **memory (holystone) + state (a ledger/server) + a view (the artifact)**, and the state layer was never reshaped from LoU to HP. That's the whole confusion, in one sentence.

Even the integration you want is already documented in holystone: you can `register(narrator_state.mcp)` to mount recall onto a state server so **one endpoint serves state *and* memory**.

## What I'd build (and what I already built)

You said an artifact is great for *referring to* but "can't communicate out." Exactly right — an artifact can show you state, but the narrator can't read it back. So the source of truth has to be a **file or a server**, with the artifact as a window onto it. Given you're in Claude Desktop, here's the ladder, lowest-friction first:

### Tier 1 — **Skill + JSON state file** ✅ *built, usable today*
- `state/marauders-state.json` — the reconciled, HP-shaped source of truth (this replaces the LoU-shaped narrator-state blob).
- `state/MARAUDERS_STATE.md` — the human-readable version (what you read).
- `marauders-narrator-skill/` — a Claude skill that, at the start of a chat, loads the JSON, calls holystone `recall` to re-ground voice, and knows the update rules (including the Athena/Patronus split and per-person devotion).

This needs **no server and no hosting**. You install the skill, and in any Marauders chat the narrator opens with correct state and updates the JSON as you play. Its one limit: it's session-scoped to a chat unless you save the JSON back to the repo (the skill tells you to).

### Tier 2 — **Reshape narrator-state for HP** *(when you want live, multi-chat state)*
Your `narrator-state` server already has the right *machinery* (inventory/clock/missions/flags tools) — it's just wearing LoU clothes. Reshape its schema to the HP one in `marauders-state.json` (relationships+devotion, the Path, the shrine, silver-water, wand projects, the office-vault) and seed it from the JSON. Then the narrator reads/writes real state over MCP, across chats. This is the "communicate out" upgrade.

### Tier 3 — **One endpoint: state + recall, and the artifact reads it** *(the full holystone design)*
Mount holystone onto the reshaped narrator-state server (`register(narrator_state.mcp)`), so one URL/token gives the narrator both live state and verbatim memory. Then re-point the ledger artifact at it (it already has an experimental sync client built in — `callMcpTool`, push/pull) so the panel mirrors the live server instead of localStorage. That's all three layers, wired, for HP.

**Colab** isn't the right home for any of this — it's good for a one-time backfill (re-embedding logs into holystone), but it's a notebook that turns off, so it can't be your live state. Use it only if you want to re-run holystone's embed step in the cloud.

## My recommendation

Run **Tier 1 now** (it's done — install the skill, keep playing). Move to **Tier 2** when chat-scoped state starts to chafe — i.e., when you want the narrator to remember state without you pasting the JSON. Do **Tier 3** only if you want the artifact to be live rather than a manual mirror. Each tier reuses the one below it, so nothing is wasted.

## How to install the skill

The skill folder is at `marauders-narrator-skill/`. To use it in Claude Desktop / Cowork: open **Settings → Capabilities**, add a skill, and point it at that folder (or zip it and install the `.skill`). Then start a Marauders chat and say "load Marauders state." (I can't register the skill into your installed-skills cache from here — that's a Settings action — but the folder is ready to install.)
