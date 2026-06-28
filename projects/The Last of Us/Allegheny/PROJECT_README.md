# Project Allegheny

A narrative roleplay system for Claude. Pittsburgh, late September 2018, two days before the Cordyceps outbreak. Caleb-as-himself plus Maya, anchored through Day 7.

This is a Claude Project: a collection of structured knowledge files, persistent state infrastructure, and a UI tracker, designed for long-form RP that survives across chat sessions.

---

## Table of contents

1. [What this is](#what-this-is)
2. [Quick start](#quick-start)
3. [The full architecture](#the-full-architecture)
4. [File reference — what every file does](#file-reference)
5. [The MCP server — setup, transports, deployment](#the-mcp-server)
6. [The tracker artifact](#the-tracker-artifact)
7. [Troubleshooting](#troubleshooting)
8. [Design philosophy — why it's built this way](#design-philosophy)
9. [Roadmap and limitations](#roadmap-and-limitations)

---

## What this is

A Last of Us-style outbreak campaign, with two design commitments that distinguish it from a typical RP setup:

**Plot armor is structural, not vibes-based.** Maya cannot die before Week 2. Caleb cannot die before he explicitly commits to a high-stakes action. These are mechanically enforced via flags in the system, not asked-nicely-of-the-AI. After the protective window, the narrator's mandate flips: NPCs become genuinely mortal, the player included.

**State persists across sessions.** Day 3 of the outbreak in one chat is still Day 3 in the next chat, with the same characters in the same conditions, the same flags set, the same memory of who said what. This is what the MCP server and tracker exist for.

The campaign covers the outbreak week (Days 1–7), the Quarantine Zone era (Weeks 2–N), and optional long-arc material (the Road, Year 1+). About 16 missions are pre-written; the narrator improvises within them.

---

## Quick start

The minimum to get playing, in order:

### 1. Set up the Claude Project

Create a new project at [claude.ai/projects](https://claude.ai/projects). Upload all the files listed in the [file reference](#file-reference) below. The order doesn't matter; what matters is that all the knowledge files are present.

### 2. Run the MCP server (optional but recommended)

The server gives the narrator persistent memory across sessions. Without it, you can still play — the narrator will use the bracket lines in chat as state — but losing context between sessions is a real cost for a long campaign.

Two install modes:

- **Local (Claude Desktop only)** — install once, point Claude Desktop at it, done. See [Local install](#local-install-claude-desktop) below.
- **Remote (works in the web client too)** — install + expose via tunnel. More setup, more power. See [Remote install](#remote-install-tunnel-or-vps) below.

### 3. Set up the tracker (optional)

The tracker artifact gives you a visual view of campaign state. Open it in any chat where you want it. It works in manual sync mode by default; if you set up the remote MCP server, you can switch to Connected mode for live two-way sync.

### 4. Start a session

In a chat with the project knowledge files loaded (and the MCP connector toggled on, if you set it up), say something like:

> *"Let's start. I'd like the airport opening — Saturday morning, Caleb arriving at PIT."*

The narrator will call `start_session`, set the scene, and we're off.

---

## The full architecture

Three layers, each with a clear role:

```
┌──────────────────────────────────────────────────────────────────┐
│  KNOWLEDGE LAYER — uploaded as project files                     │
│                                                                  │
│  PROJECT_INSTRUCTIONS.md (the spine — how the narrator behaves) │
│  KNOWLEDGE_USER_Caleb.md (the player's persona)                 │
│  KNOWLEDGE_1_Cast.md → 12 CAST_*.md files                       │
│  KNOWLEDGE_2_City.md, _3_Timeline.md, _4_Infection.md           │
│  KNOWLEDGE_5_Factions.md → 4 FACTION_*.md files                 │
│  KNOWLEDGE_6_Missions.md → 16 MISSION_*.md + 3 OPENING_*.md     │
│  KNOWLEDGE_7_Hidden.md (spoilers — the model uses, doesn't tell)│
│  KNOWLEDGE_8_Tone_and_Anchors.md (voice and pacing)             │
│  KNOWLEDGE_9_Utility.md (currency, supplies, economy)           │
│  CHARACTER_SCHEMA_Allegheny_v1_0.md (NPC structure reference)   │
└──────────────────────────────────────────────────────────────────┘
                                  │
                                  ▼
┌──────────────────────────────────────────────────────────────────┐
│  STATE LAYER — narrator-state MCP server                         │
│                                                                  │
│  Python server with 19 tools (get_state, advance_clock,         │
│  log_injury, record_loss, set_flag, finalize_story_day, ...)    │
│                                                                  │
│  State persists as JSON at ~/.narrator-state/allegheny.json     │
│  Available to the narrator via stdio (Desktop) or HTTPS (web)   │
└──────────────────────────────────────────────────────────────────┘
                                  │
                                  ▼
┌──────────────────────────────────────────────────────────────────┐
│  PRESENTATION LAYER — tracker artifact                           │
│                                                                  │
│  React component with two modes:                                 │
│  - Manual: window.storage, sync via import/export                │
│  - Connected: live MCP calls via Anthropic API in artifacts     │
│                                                                  │
│  The player's editable view of state. The bracket lines in      │
│  chat are the always-on at-a-glance view.                        │
└──────────────────────────────────────────────────────────────────┘
```

**The flow during a turn:**

1. The narrator calls `get_state` (or remembers state from last turn)
2. It writes prose for the scene, with the time/location/AWARENESS bracket lines at the bottom
3. It calls the state-mutation tools (`advance_clock`, `update_character`, etc.) at end of turn
4. The player can also open the tracker to see/edit state, which is mirrored back

---

## File reference

Every file in the project, what it does, and whether it's required.

### Spine files — required

| File | Purpose |
|---|---|
| `PROJECT_INSTRUCTIONS.md` | The narrator's behavioral contract. How it speaks, how it paces, what plot armor flags it respects, what tools it calls and when. ~7,000 words. **The most important file.** |
| `KNOWLEDGE_USER_Caleb.md` | The player's persona — Caleb's age (32), profession, voice, relationships, what he knows about Pittsburgh, his blind spots. |
| `CHARACTER_SCHEMA_Allegheny_v1_0.md` | The schema all NPCs follow. Reference doc the narrator consults when introducing a new minor character. Erin is the worked example. |

### Cast — required

| File | Purpose |
|---|---|
| `KNOWLEDGE_1_Cast.md` | Index file. Lists everyone, their tier, presence in the opening, current state. |
| `CAST_MAYA.md` | Best friend. Anchor through Week 2. The campaign's emotional spine. |
| `CAST_PRIYA.md` | Maya's grad school friend, ER nurse — knows the outbreak before anyone else does. |
| `CAST_MIKE.md` | Caleb's college roommate, coincidence visitor. |
| `CAST_NOAH.md` | Romanceable. Met at the bar Saturday. |
| `CAST_ERIN.md` | Romanceable. Met after the outbreak. |
| `CAST_RAY.md` | Antagonist arc. FEDRA officer who gives the order to kill Maya. |
| `CAST_VICTOR.md`, `CAST_SAM.md`, `CAST_DRAKE.md`, `CAST_LEN.md`, `CAST_CASEY.md` | Recurring named NPCs in the QZ era. |
| `CAST_NAMED_MINORS.md` | The smaller named cast — barista, neighbors, etc. People the narrator can introduce when needed. |

### World — required

| File | Purpose |
|---|---|
| `KNOWLEDGE_2_City.md` | Pittsburgh geography. Neighborhoods, distances, key buildings, what each district looks like before and after the outbreak. |
| `KNOWLEDGE_3_Timeline.md` | What happens when. Day-by-day for the outbreak week, week-by-week after. The narrator references this for "what's the world doing right now." |
| `KNOWLEDGE_4_Infection.md` | Cordyceps biology and timing. Bite incubation per body part (matches the MCP server's lookup). Stages of infection. How spores work. |

### Factions — required

| File | Purpose |
|---|---|
| `KNOWLEDGE_5_Factions.md` | Index. Which factions exist, when the player encounters them, what they know about each other. |
| `FACTION_FEDRA.md` | The federal government's emergency response — military, hospitals, the QZ structure. |
| `FACTION_FIREFLIES.md` | The resistance. Pittsburgh cell + the broader movement. Their vaccine project at the former St. Mary's in Salt Lake City. |
| `FACTION_HUNTERS.md` | Pittsburgh's emergent post-FEDRA gang. The threat in the QZ era. |
| `FACTION_DISTANT.md` | Factions in other places — Jackson, WLF, Seraphites, Rattlers — referenced but not encountered locally. |

### Missions — required

| File | Purpose |
|---|---|
| `KNOWLEDGE_6_Missions.md` | Index. Lists every mission, its act, its trigger conditions, its dependencies. |
| `OPENING_A_Airport.md`, `OPENING_B_Kitchen.md`, `OPENING_C_Bar.md` | Three possible openings. Player picks one. |
| `MISSION_M01_Saturday_The_Rest.md` through `MISSION_M15_The_Road.md` | The pre-written missions. Each describes its scene, the characters involved, the branches available, and what state changes (flags, AWARENESS, mortality) it should produce. |
| `MISSION_M06b_Apartment_Lockdown.md` | Branch alternate for M06 if the player skipped the hospital. |

### Hidden — required

| File | Purpose |
|---|---|
| `KNOWLEDGE_7_Hidden.md` | **Spoilers.** The real cause of the outbreak (climate-driven Cordyceps at the Sumber Pertama mill, Jakarta). NPC secrets. Plot reveals. The narrator uses this material but never reveals it directly — it informs subtext and lets the world feel consistent. |

### Tone and utility — required

| File | Purpose |
|---|---|
| `KNOWLEDGE_8_Tone_and_Anchors.md` | Voice. Pacing. What "anchored" means and how it operates mechanically. AWARENESS tier descriptions. The narrator's lens. |
| `KNOWLEDGE_9_Utility.md` | The campaign economy. Cigarettes as currency. FEDRA scrip. Antibiotics black market. Distances, walking times, supply realities. |

### Code and tooling — separately stored, not uploaded to the project

| File | Where it lives | Purpose |
|---|---|---|
| `narrator-state/` (folder) or `narrator-state.tar.gz` | Local install on your computer | The MCP server. Python package, runs as a subprocess (stdio) or HTTP service. |
| `allegheny-tracker.jsx` | Copy/paste into a Claude artifact | The React tracker UI. Opens in any chat where you ask for it. |
| `MCP_NARRATOR_STATE_SPEC.md` | Reference doc, can be uploaded if you want the narrator to know it | Documents the tool surface. Useful if you're modifying the server or want the narrator to know what tools exist by name. |

### Layout reference — informational

| File | Purpose |
|---|---|
| `PROJECT_ALLEGHENY_LAYOUT_CLAUDE.md` | A diagram-and-prose description of how the whole project hangs together. Reference doc for future-you wondering "what was in this thing." |
| `TLOU_OUTBREAK_LAYOUT_CLAUDE_PROJECT.md` | The earlier draft layout doc. Superseded but kept for reference. |

---

## The MCP server

The narrator-state server is what makes campaign memory persistent. It's a Python program (~1,700 lines) implementing 19 tools.

### What gets stored

Everything the campaign cares about over time:

- **Clock** — story day, time, location, story phase, AWARENESS tier
- **Player** — name, condition, active injuries, inventory
- **Characters** — each named NPC's name, tier, relationship state, condition, presence, active injuries, what they've observed about Caleb
- **Lost** — the casualty list (the emotional spine)
- **Missions** — active, completed, deferred
- **Memory book** — day-by-day or session-by-session prose summaries
- **Flags** — the boolean reveal gates (`cordyceps_word_unlocked`, `fireflies_revealed`, etc.)
- **Factions known** — which factions the player has been exposed to

All as JSON at `~/.narrator-state/allegheny.json` (or on Windows, `C:\Users\<you>\.narrator-state\allegheny.json`).

### Install

You have the tarball `narrator-state.tar.gz`. Extract and install:

**Mac/Linux:**
```bash
cd ~/Downloads
tar xzf narrator-state.tar.gz
cd narrator-state
pip install -e .
```

**Windows PowerShell:**
```powershell
cd $HOME\Downloads
tar -xzf narrator-state.tar.gz
cd narrator-state
pip install -e .
```

Verify:
```
narrator-state
```

If it sits silently waiting for stdio input, that's success — it's the stdio default. Press Ctrl+C to stop.

### Local install (Claude Desktop)

Edit your Claude Desktop config:

- macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`
- Linux: `~/.config/Claude/claude_desktop_config.json`

Add the server:

```json
{
  "mcpServers": {
    "narrator-state": {
      "command": "narrator-state"
    }
  }
}
```

Restart Claude Desktop. The tools should appear in the tool inventory of any new chat. **The tracker artifact cannot reach this configuration** — it works only with Desktop. For tracker live sync you need the remote install.

### Remote install (tunnel or VPS)

This makes the server reachable from the Claude web client and from artifacts. You need:

1. The server running with HTTP transport
2. A way to expose it over the public internet via HTTPS

#### Step 1 — switch the server to HTTP

Set an environment variable, then run:

**Mac/Linux:**
```bash
NARRATOR_STATE_TRANSPORT=streamable-http narrator-state
```

**Windows PowerShell:**
```powershell
$env:NARRATOR_STATE_TRANSPORT="streamable-http"
narrator-state
```

Should print "Uvicorn running on http://127.0.0.1:8765." Leave running.

To change the port or host, set `NARRATOR_STATE_PORT` and `NARRATOR_STATE_HOST` before starting.

#### Step 2 — expose it via Cloudflare Tunnel (recommended)

Cloudflare Tunnel is free, has no time limits, and uses your own domain if you have one. Setup once, runs forever.

Prerequisites:
- A domain in Cloudflare (Free plan is fine)
- `cloudflared` installed (Mac: `brew install cloudflared`; Windows: `winget install Cloudflare.cloudflared`; Linux: download the .deb from GitHub)

Walkthrough:

```bash
# Authenticate with Cloudflare (opens browser)
cloudflared tunnel login

# Create the tunnel
cloudflared tunnel create narrator-state
# → Prints a UUID. Save it.

# Route a subdomain to the tunnel
cloudflared tunnel route dns narrator-state narrator.yourdomain.com
```

Create `~/.cloudflared/config.yml` (Windows: `C:\Users\<you>\.cloudflared\config.yml`):

```yaml
tunnel: <YOUR-UUID-HERE>
credentials-file: /path/to/.cloudflared/<UUID>.json

ingress:
  - hostname: narrator.yourdomain.com
    service: http://localhost:8765
    originRequest:
      httpHostHeader: 127.0.0.1:8765
  - service: http_status:404
```

The `httpHostHeader` rewrite is **required** — without it Starlette/Uvicorn rejects requests with "Invalid Host header" because the incoming Host doesn't match the bind address.

Run the tunnel:
```bash
cloudflared tunnel run narrator-state
```

Verify in a browser: visit `https://narrator.yourdomain.com/mcp`. You should see:
```json
{"jsonrpc":"2.0","id":"server-error","error":{"code":-32600,"message":"Not Acceptable: Client must accept text/event-stream"}}
```
That's the success state — the server is alive and enforcing the MCP protocol.

#### Step 3 — add it to Claude

Go to [claude.ai/customize/connectors](https://claude.ai/customize/connectors). Click `+` → "Add custom connector." Name: `narrator-state`. URL: `https://narrator.yourdomain.com/mcp`. Skip OAuth. Click Add.

In each chat where you want the narrator to use it, click `+` (bottom left) → Connectors → toggle `narrator-state` on.

#### Step 4 — make it persistent (optional)

The two PowerShell windows (server + tunnel) close when you reboot. To make them auto-start:

**Cloudflared as a Windows service** — open PowerShell as Administrator:
```powershell
cloudflared service install
```

**Narrator-state server on login** — Task Scheduler:
1. Open Task Scheduler
2. Create Basic Task
3. Trigger: "When I log on"
4. Action: Start a program: `narrator-state.exe` (find with `where.exe narrator-state`)
5. Start in: your install folder
6. Add an environment variable in the task's Settings: `NARRATOR_STATE_TRANSPORT=streamable-http` (Task Scheduler doesn't have direct env var support — easier is to make a small `.bat` script that sets the env and starts the server, and point the task at the `.bat`)

### Alternative deployments

If Cloudflare Tunnel doesn't fit:

- **ngrok** — easier setup, free tier has a 2-hour limit per session and URLs rotate
- **Google Colab** — free CPU instance, but rotating URL and 90-minute idle timeout
- **Small VPS** — DigitalOcean, Hetzner, Oracle Cloud Free Tier — $0–$5/month, durable, custom domain works directly without a tunnel

For long-term campaign use the right answer is a small VPS or Cloudflare Tunnel on a home machine that stays on.

### Security

The server has no authentication. Anyone who finds the URL can read and write your campaign state. For personal RP this is usually fine but be aware:

- Don't put the URL in public places (git repos, screenshots)
- Pick an obscure subdomain if you want defense-in-depth
- For real auth, set up Cloudflare Access — free up to 50 users, gives email-magic-link login before traffic reaches your server

---

## The tracker artifact

The tracker is a React component that gives you a visual, editable view of campaign state. Open it in any chat by asking for it:

> *"Open the Allegheny tracker artifact."*

Two modes:

### Manual mode (default)

- State persists in the browser via `window.storage`
- Edit anything by clicking it
- Export downloads a timestamped JSON file
- Import accepts pasted JSON — paste the contents of `~/.narrator-state/allegheny.json` for full sync from the server side

### Connected mode

If you've done the remote install:

1. Click the gear icon → toggle "Connected (live MCP)"
2. Paste your server URL: `https://narrator.yourdomain.com/mcp`
3. Server name: `narrator-state`
4. Project name: `allegheny`
5. Click "Test connection" — should turn green
6. Click "Pull state from server" to sync

In Connected mode, edits in the tracker propagate to the server via the Anthropic API. Reading "Pull state from server" overwrites the tracker with whatever the narrator has been doing.

The tracker is a *supplementary* surface. The bracket lines in each chat response are your primary at-a-glance view. The tracker is for when you want a wider view or want to override something.

---

## Troubleshooting

### "narrator-state command not found" after install

PATH issue. Try `python -m narrator_state.server` instead, or check your Python Scripts directory is on PATH.

### "TypeError: FastMCP.run() got an unexpected keyword argument 'host'"

You're trying to use the old code with the new MCP SDK. The current code passes host/port to the `FastMCP(...)` constructor, not to `.run()`. Pull the latest `server.py`.

### "Invalid Host header" when hitting the tunnel URL

Add the `httpHostHeader: 127.0.0.1:8765` rewrite in your cloudflared config under `originRequest`. Without it, Starlette rejects the request because the incoming Host doesn't match the bind address.

### Cloudflare Error 1033 in browser

Tunnel isn't running, or the config has a YAML error preventing it from loading. Check the cloudflared PowerShell window — if it crashed silently, re-run and watch the startup output. If indentation in `config.yml` is off, cloudflared rejects the file.

### Tracker says "No tool result in response"

The MCP block-type parsing in the tracker is best-guess. If you get this error, open browser dev tools, hit Test Connection, look at the response from `api.anthropic.com`. Look for what the tool-result blocks are called and update `callMcpTool` in the tracker source accordingly.

### Narrator forgot a flag / character state / what happened yesterday

Three things to check:
1. Is the MCP connector toggled on in this chat? (`+` → Connectors)
2. Is `~/.narrator-state/allegheny.json` actually getting updated? Open it in a text editor.
3. Did the narrator call `start_session` at the beginning of the chat? It should — that's what loads state into context.

If state on disk is correct but the narrator's behavior contradicts it, the narrator's not reading state. Ask it explicitly: "Call `get_state` for project `allegheny` and confirm the current AWARENESS tier."

### State got corrupted / I want to start over

Delete `~/.narrator-state/allegheny.json`. Next call to any tool will auto-create a fresh project. Optionally also delete `allegheny-tracker` from window.storage in the tracker (click Reset Tracker at the bottom).

### How do I edit state by hand?

`~/.narrator-state/allegheny.json` is plain JSON. Open in any editor, change what you want, save. The server reads on next call. The tracker pulls on next "Pull state from server" click.

---

## Design philosophy

A few things I want future-me (or anyone forking) to understand about why this is structured the way it is.

### Plot armor as structural, not as vibes

LLMs are good at maintaining narrative consistency when they have explicit machinery to reference. They're bad at it when asked to keep promises in their head. The flag system (`best_friend_mortal_after_week_1`, `player_mortal_after_explicit_commit`) is the load-bearing piece — without these flags, the narrator drifts toward either too-safe (nothing bad ever happens) or too-cruel (everyone dies on day 3). The flags give the narrator a clean rule it can mechanically check.

### Consequences emerge from actions, not from interruption

The narrator does not warn the player before they do something risky. It does not say "are you sure?" It does not add hesitation beats unless the *character* would hesitate. The cost of an action is shown after, in the consequences, not gated before, in the prompt. This is the major behavioral commitment of `PROJECT_INSTRUCTIONS.md`.

### State as canonical, prose as performance

The MCP server is the source of truth. The prose can be revised, the bracket lines can drift, but the JSON file is what the world is. If state and prose disagree, the narrator must produce prose that conforms to state, not the other way around. This is why `record_loss`, `set_flag`, etc. are written as separate explicit tool calls — they are commitments the narrator can't take back without using `undo_last_event` and surfacing the change.

### Information gating vs behavioral gating

Some things the player *can't* know yet — the cause of the outbreak, the Fireflies' existence in week 1, the Cordyceps name before the CDC briefing. These are gated by AWARENESS tier and by news flags. The narrator can know them (they're in `KNOWLEDGE_7_Hidden.md`) but won't let NPCs use those words in the player's hearing until the appropriate flag flips.

This is different from gating the player's *behavior*. The player can do anything; the world's reaction varies based on what's been revealed. The narrator doesn't say "you can't go there yet." It says "you go there, and here's what you find."

### The tracker is a mirror, not a remote

The player edits the tracker because they want to override or correct something. The narrator does not consult the tracker as its source of state — it consults the MCP server. When connected mode is on, the tracker syncs *to* the server, which keeps both views consistent. When manual mode is on, the player accepts that the views can drift, and reconciles when they care to.

---

## Roadmap and limitations

### Known limitations of v1

- **Single-project tracker.** The tracker's storage key is `allegheny-tracker`. If you run multiple campaigns from the same browser, they'd conflict. Workaround: use different browsers, or wait for a future version with a project picker.
- **Tracker live-sync block-type parsing is best-guess.** The Anthropic API's tool-result block shape isn't documented in a way I could verify before shipping. If sync fails with "No tool result in response," the fix is a one-line change in `callMcpTool`.
- **Some mutations don't sync from tracker to server.** Specifically: editing an inventory item's notes in place (no clean server tool for it), removing an injury (needs server-side injury_id which the tracker doesn't know), removing a completed mission (no server-side delete). The "Pull from server" button reconciles.
- **No authentication on the MCP server.** See [Security](#security).
- **`undo_last_event` is best-effort.** Simple reversals are exact; complex multi-step operations might not perfectly reverse if other operations happened in between.

### Planned

- **SillyTavern port.** The system was designed with V3 character cards in mind. The MACRO_DEFINITIONS doc is already written. The port would mainly be format translation.
- **PROJECT_README split.** Once the project stabilizes, this README could split into setup-only and reference-only files.
- **Authentication on the MCP server.** Cloudflare Access integration is the cheapest path; documenting it would unblock more cautious users.

### Not planned

- Multi-player simultaneous play. The server is single-user.
- Voice integration. Out of scope.
- Image generation. Out of scope (though `IMAGE_PROMPTS_*` files in some related projects are useful reference if you want to build that on top).

---

## License and credits

This project is personal work by Caleb. The system is open for anyone to fork, adapt, or learn from. The Last of Us setting is owned by Naughty Dog / Sony; this project is fan work and not for commercial distribution.

Built with Claude (Anthropic) over many iterations. The MCP server design follows the Model Context Protocol spec. The tracker uses React, Tailwind, and lucide-react.

---

*Last updated: May 2026, v1.0*
