# Vault 83 Tracker

A self-contained desktop app that runs the `vault83-state` MCP server **and** displays the Pip-Boy 3000 Mk IV tracker UI in one floating window.

Built with Tauri 2 + React + TypeScript. Adapted from `Allegheny/tracker-app/`.

## What it does

When you launch the app it:

1. **Auto-detects** Python and the `vault83-state` directory.
2. **Spawns** `python -m vault83_state.launch` (so Claude can reach the MCP tools).
3. **Streams** the MCP server's stdout/stderr into a log panel — click the ≡ icon in the title bar.
4. **Renders** the Pip-Boy tracker — day dial, chronometer, scrip, inventory, quest log.
5. **Reaps** the MCP child process when the app closes.

The window is always-on-top by default (toggle 📌 in the title bar) so you can keep Claude full-width in Chrome while the Pip-Boy floats above.

### How it's different from the Allegheny tracker

Allegheny's tracker polls `http://127.0.0.1:8765/rest/get_state` and re-renders from the server's authoritative state. **Vault 83 doesn't do that.** The vault83-state server has no REST patch (the project was designed for paste-driven syncing from the start), so this app's tracker UI:

- Persists state in `localStorage` under the key `vault83-tracker`.
- Optionally syncs from a narrator response — paste the response into the SYNC textarea and click **Sync from paste**. The parser reads the `<!-- STATE … -->` block first, then falls back to `[Tracker: …]` / `[Pip-Boy: …]` bracket lines.
- All other state edits happen locally in the UI (day buttons, time SET, scrip +/−, inventory ADD/X, quest LOG/X).

There's also **no Cloudflare tunnel** managed by this app. Vault 83 is local-only — Claude calls the vault83-state MCP server over whatever transport you configure separately. If you ever need to expose this MCP over a tunnel, run `cloudflared` yourself; the app deliberately doesn't manage it.

## One-time setup (Windows)

You already have the Rust + MSVC toolchain installed from building Allegheny's `.exe`. If not, see `Allegheny/tracker-app/README.md` for the full bootstrap (winget Rustup + Visual Studio Build Tools VCTools workload). Always build from a **Developer PowerShell for VS 2022** to avoid the Git-shipped GNU `link.exe` shadowing MSVC's.

```powershell
cd "C:\Users\cwadd\Documents\GitHub\llm-roleplay\projects\Fallout\Vault 83\vault83-tracker-app"
npm install
```

Make sure these exist before launching:

- Python ≥ 3.11 on PATH or at `C:\Python313\python.exe` / `C:\Python312\python.exe`.
- The `vault83-state` package's Python deps installed. Easiest:
  ```powershell
  pip install -e "..\vault83-state"
  ```
  Anything is fine as long as the Python the app spawns can `import vault83_state`.

## Run in dev mode

```powershell
npm run tauri:dev
```

First launch:

- The app calls `detect_paths` from Rust to auto-fill Python and `vault83-state` directory paths.
- If `manageServices` + `autoStartServices` are on (default), the MCP server starts automatically.
- The Pip-Boy UI renders immediately — it doesn't wait for the MCP.

If the MCP doesn't start, open **Settings** (⚙) → click **Auto-detect paths**, fix anything that's wrong, click **Save**.

## Build a release `.exe` / `.msi`

```powershell
npm run tauri:build
```

`tauri build` will fail until icons exist under `src-tauri/icons/`. Generate them once:

```powershell
npx @tauri-apps/cli icon path/to/source-icon-1024.png
```

The Allegheny tracker-app's `src-tauri/icons/` got copied over with this scaffold — you can re-use those if you don't want a distinct Vault 83 icon yet.

## Title-bar controls

| Icon | What it does |
|---|---|
| ● MCP | Status dot — green = running, grey = stopped, red = crashed |
| ▶ / ■ | Start or stop the MCP server |
| ≡ | Open the live log viewer (stdout+stderr from `python -m vault83_state.launch`) |
| 📌 / 📍 | Always-on-top toggle |
| ⚙ | Open Settings |

## Settings

**Service management** — Python path, `vault83-state` directory, auto-start toggle. The **Auto-detect paths** button re-runs the Rust detection if the layout ever moves.

**Window** — Always-on-top toggle (mirrored from the title-bar pin).

## Architecture

```
┌─────────────────────────────────────────────┐
│ Tauri renderer (React)                      │
│   – TitleBar / Settings / Logs              │
│   – PipBoyTracker (localStorage + paste-    │
│     sync from narrator <!-- STATE --> blk)  │
│   – invoke(start_services / stop / status)  │
│   – listen("services:status" / ":log")      │
└────────────┬────────────────────────────────┘
             │ Tauri IPC
┌────────────▼────────────────────────────────┐
│ Tauri main (Rust)                           │
│   – ServicesManager                         │
│     • spawns python -m vault83_state.launch │
│     • watcher thread for stdout/stderr      │
│     • ring-buffered log + event emitter     │
│     • kills child on RunEvent::Exit         │
└────────┬────────────────────────────────────┘
         │ spawn
┌────────▼──────────────────┐
│ python.exe -m             │
│ vault83_state.launch      │
│   PYTHONPATH=…\src        │
└───────────────────────────┘
```

The tracker UI never talks to the MCP server — it's pure paste-based sync. The MCP server is here so Claude can call `bump_scrip`, `add_item`, `set_flag`, etc. when you wire up the project.

## Project layout

```
vault83-tracker-app/
  index.html
  package.json
  vite.config.ts
  tsconfig.json
  src/
    main.tsx
    App.tsx                  # Tauri shell + service management
    services.ts              # Frontend wrapper for Tauri IPC commands
    settings.ts              # localStorage settings
    styles.css               # shared with the Allegheny shell — most rules unused
    components/
      TitleBar.tsx           # single-service status dot + control buttons
      SettingsModal.tsx      # Python + vault83-state paths
      LogViewer.tsx          # live tail of the MCP server's stdout/stderr
      PipBoyTracker.tsx      # the Pip-Boy UI (ported from vault83-tracker.jsx)
  src-tauri/
    Cargo.toml
    tauri.conf.json
    src/
      main.rs
      lib.rs                 # Tauri builder + commands
      services.rs            # process spawning + watcher thread + logs
    capabilities/default.json
```

## When vault83-state's schema changes

The Pip-Boy tracker is self-contained: it doesn't read the MCP server's state, only the narrator's `<!-- STATE … -->` paste blocks. If the STATE block format changes, update `parseStateBlock` in `src/components/PipBoyTracker.tsx`.

If you ever add a REST patch to `vault83-state` and want polling like Allegheny has, see `Allegheny/tracker-app/src/api.ts` + `useNarratorState.ts` for the pattern — you'd drop them into this scaffold.

## Troubleshooting

**`failed to spawn mcp: program not found`** — Python path is wrong in Settings. Click *Auto-detect paths* or set it manually.

**MCP dot goes red immediately** — open the log viewer (≡). Most common: missing `mcp` Python package on the Python the app picked. Either install it (`<that-python> -m pip install mcp starlette`) or change the Python path in Settings to a venv that has it.

**MCP dot stays grey** — services are disabled. Open Settings, check "This app manages the vault83-state MCP server", click Save.

**Pip-Boy data won't persist** — the renderer uses `localStorage`, which Tauri scopes per identifier. If you change `identifier` in `tauri.conf.json`, you'll start with a fresh storage.

**Want to wipe the Pip-Boy?** Click **NEW LIAISON** at the bottom of the tracker, then **YES**.
