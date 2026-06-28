# Allegheny Tracker

A self-contained desktop app that runs the `narrator-state` MCP server, the Cloudflare tunnel that exposes it to Claude, and a floating tracker UI — all from a single launch.

Built with Tauri 2 + React + TypeScript.

## What it does

When you launch the app it:

1. **Auto-detects** Python, `cloudflared`, the narrator-state directory, and your `~/.cloudflared/config.yml`.
2. **Spawns** `python -m narrator_state.launch` (so Claude can reach the MCP tools).
3. **Spawns** `cloudflared --config <config.yml> tunnel run` (so the tunnel hostname routes to localhost).
4. **Streams** both processes' stdout/stderr into a log panel — click the ≡ icon in the title bar.
5. **Polls** `http://127.0.0.1:8765/rest/get_state` every 5 s and renders the tracker UI.
6. **Reaps** both child processes when the app closes.

The window is always-on-top by default (toggle 📌 in the title bar) so you can keep Claude full-width in Chrome while it floats above.

## One-time setup (Windows)

1. **Install Rust** (required to build Tauri):
   ```powershell
   winget install Rustlang.Rustup
   rustup-init.exe -y
   ```

2. **Install MSVC Build Tools** (the real `cl.exe` / `link.exe`):
   ```powershell
   winget install --id Microsoft.VisualStudio.2022.BuildTools --override "--wait --passive --add Microsoft.VisualStudio.Workload.VCTools --includeRecommended"
   ```
   Takes ~5–15 minutes (3–6 GB download).

   **Always build from a Developer Shell.** After install, open the Start Menu entry **"Developer PowerShell for VS 2022"** and run `npm run tauri:dev` from there. The Developer Shell prepends MSVC's `Hostx64\x64` to PATH, which is critical because **Git for Windows ships a GNU coreutils `link.exe`** at `C:\Program Files\Git\usr\bin\link.exe` that otherwise wins the PATH lookup and produces `link: extra operand …` linker errors from cargo. (Symptom: linker errors mentioning `"Try 'link --help' for more information."` — that text only comes from GNU coreutils.)

   To make a regular PowerShell into a Developer Shell on demand:
   ```powershell
   & "C:\Program Files (x86)\Microsoft Visual Studio\2022\BuildTools\Common7\Tools\Launch-VsDevShell.ps1" -Arch amd64 -SkipAutomaticLocation
   ```

3. **Install Node deps:**
   ```powershell
   cd "C:\Users\cwadd\Documents\GitHub\llm-roleplay\projects\The Last of Us\Allegheny\tracker-app"
   npm install
   ```

4. **Confirm the prerequisites the app will manage:**
   - Python ≥ 3.11 on PATH or at `C:\Python313\python.exe` / `C:\Python312\python.exe`
   - `cloudflared.exe` at `C:\Program Files (x86)\cloudflared\` (or on PATH)
   - `~\.cloudflared\config.yml` with a tunnel UUID, credentials file, and an ingress rule routing your hostname to `http://localhost:8765`
   - The `narrator-state` package's Python deps installed (`pip install -e ../narrator-state` works, but installing the deps any way you like is fine — the launcher just needs `mcp` and Starlette available to whichever Python the app spawns)

## Run in dev mode

```powershell
npm run tauri:dev
```

First launch:

- The Settings modal opens.
- The app calls `detect_paths` from Rust to auto-fill Python / cloudflared / config / narrator-state directory.
- Click **Save** — services start automatically.
- After a couple of seconds the status dots in the title bar turn green and the panels populate.

## Build a release `.exe` / `.msi`

```powershell
npm run tauri:build
```

`tauri build` will fail until icons exist under `src-tauri/icons/`. Generate them once:
```powershell
npx @tauri-apps/cli icon path/to/source-icon-1024.png
```

## Title-bar controls

| Icon | What it does |
|---|---|
| ● MCP / ● Tunnel | Status dots — green = running, grey = stopped, red = crashed |
| ▶ / ■ | Start or stop both services |
| ≡ | Open the live log viewer (stdout+stderr from both processes) |
| 📌 / 📍 | Always-on-top toggle |
| ↻ | Refresh tracker state now (don't wait for the poll) |
| ⚙ | Open Settings |
| ● | Tracker connection status (separate from service status) |

## Settings

Two sections:

**Service management** — paths and auto-start toggle. The **Auto-detect paths** button re-runs the Rust detection if you ever need to refresh.

**Tracker connection** — server URL (default `http://127.0.0.1:8765`, only override for remote setups), optional bearer token (matches `NARRATOR_REST_TOKEN` env on the server), project name, poll interval.

## Architecture

```
┌─────────────────────────────────────────────┐
│ Tauri renderer (React)                      │
│   – TitleBar / Panels / Settings / Logs     │
│   – fetch http://127.0.0.1:8765/rest/...    │
│   – invoke(start_services / stop / status)  │
│   – listen("services:status" / ":log")      │
└────────────┬────────────────────────────────┘
             │ Tauri IPC
┌────────────▼────────────────────────────────┐
│ Tauri main (Rust)                           │
│   – ServicesManager                         │
│     • spawns child processes                │
│     • watcher threads for stdout/stderr     │
│     • ring-buffered log + event emitter     │
│     • kills children on RunEvent::Exit      │
└────────┬──────────────────────┬─────────────┘
         │ spawn                │ spawn
┌────────▼────────┐    ┌────────▼─────────────┐
│ python.exe -m   │    │ cloudflared.exe      │
│ narrator_state. │    │ --config config.yml  │
│ launch          │    │ tunnel run           │
│   PYTHONPATH=…  │    │                      │
│   :8765         │    │                      │
└─────────────────┘    └──────────────────────┘
       ▲                          ▲
       │ MCP over Cloudflare tunnel
       └──────────────────────────┴────────── Claude (chat) calls tools
```

The tracker UI itself never crosses the tunnel — it goes straight to `127.0.0.1:8765` over the REST surface exposed by `server_rest_patch.py`. The tunnel only exists so Claude (running in the cloud) can reach the same MCP server.

## Project layout

```
tracker-app/
  index.html
  package.json
  vite.config.ts
  tsconfig.json
  src/
    main.tsx
    App.tsx
    api.ts                   # REST client for narrator-state
    services.ts              # Frontend wrapper for Tauri IPC commands
    settings.ts              # localStorage settings
    types.ts                 # mirrors narrator_state/schema.py
    useNarratorState.ts      # polling hook
    styles.css
    components/
      TitleBar.tsx           # service dots + control buttons
      SettingsModal.tsx      # services + tracker settings
      LogViewer.tsx          # live tail of both processes
      StatusStrip.tsx        # undo + tracker sync status
      Panel.tsx
      ClockPanel.tsx
      PlayerPanel.tsx
      CharactersPanel.tsx
      MissionsPanel.tsx
      FactionsPanel.tsx
      FlagsPanel.tsx
      MemoryBookPanel.tsx
      LostPanel.tsx
  src-tauri/
    Cargo.toml
    tauri.conf.json
    src/
      main.rs
      lib.rs                 # Tauri builder + commands
      services.rs            # process spawning + watcher threads + logs
    capabilities/default.json
```

## When the schema changes

`src/types.ts` mirrors `narrator-state/src/narrator_state/schema.py`. If you add a flag/faction/phase, edit it in both places.

## Troubleshooting

**`failed to spawn mcp: program not found`** — Python path is wrong in Settings. Click *Auto-detect paths* or set it manually.

**MCP dot goes red immediately** — open the log viewer (≡). Most common: missing `mcp` Python package on the Python the app picked. Either install it (`<that-python> -m pip install mcp starlette`) or change the Python path in Settings to a venv that has it.

**Tunnel dot goes red** — log viewer shows the cloudflared error. Common causes: cert expired (re-run `cloudflared tunnel login`), credentials file moved, no internet.

**Tracker status red but services green** — services are up but the REST surface isn't responding. Check the log for `server_rest_patch` errors; the most common cause is forgetting to import the patch in `launch.py` (it should already be there).
