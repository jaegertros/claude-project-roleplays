# narrator-state

A local Model Context Protocol (MCP) server that gives Claude round-trip access to narrative roleplay state. Designed for long-form RP campaigns where the model needs durable memory of clock, location, characters, inventory, missions, and reveal flags.

Built first for *Project Allegheny*, but multi-project from day one — future stories share the substrate.

## Quick start

### Install

Requires Python 3.10 or newer.

```bash
git clone https://github.com/yourusername/narrator-state.git
cd narrator-state
pip install -e .
```

Or with uv:

```bash
uv pip install -e .
```

### Run

```bash
narrator-state
```

The server runs on stdio (the MCP standard). It does not open a network port. The first time you start it, it creates `~/.narrator-state/` for state files; subsequent runs reuse it.

### Connect to Claude

Add the server to your Claude Desktop configuration at:

- macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`
- Linux: `~/.config/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "narrator-state": {
      "command": "narrator-state"
    }
  }
}
```

Restart Claude Desktop. The tools should appear in the Claude tool inventory.

## What it does

The server exposes **19 tools** that let Claude read and write the campaign's persistent state. The state is structured around the narrative concepts — clock, characters, inventory, missions, flags — not the database underneath.

Key tools:

| Tool | What it does |
|---|---|
| `get_state` | Returns current state for the project (clock, characters present, active missions, recent memory book) |
| `start_session` / `end_session` | Bookend a chat session |
| `advance_clock` | Update story day, time, location, phase |
| `advance_awareness` | Bump AWARENESS (monotonic; rejects regression) |
| `update_character` | Update a named NPC's state; creates on first reference |
| `update_perception` | Track what an NPC has observed about the player |
| `log_injury` / `heal_injury` | Wound bookkeeping; bites get auto-computed infection clocks |
| `record_loss` | Mark a character dead; moves them to the lost list |
| `add_inventory` / `remove_inventory` | Item management with auto-stacking |
| `start_mission` / `update_mission` / `complete_mission` | Mission lifecycle |
| `finalize_story_day` | Write the day's memory book entry; called before crossing to a new day |
| `set_flag` / `set_faction_known` | Reveal-gate booleans |
| `undo_last_event` | Reverse the most recent state change (preview required) |

See `MCP_NARRATOR_STATE_SPEC.md` (in the parent project) for full tool surface documentation.

## How state is stored

One JSON document per project at `~/.narrator-state/<project>.json`. Atomic writes via tempfile + rename, so a crash mid-write does not corrupt the file.

Backups (currently from `undo_last_event`) live in `~/.narrator-state/backups/`. Backups are not auto-pruned; you manage the directory if it grows.

State files are human-readable and editable. If state gets weird, you can edit the file directly with your editor of choice.

## Multi-project

The server handles any number of projects. Each is identified by a slug (alphanumeric, hyphens, underscores) passed as the `project` parameter on every tool call.

For *Project Allegheny*, use `project="allegheny"`. For other campaigns, pick a slug and use it consistently.

## Schema versioning

State files carry a `schema_version` field. The server refuses to load files from a schema_version it doesn't recognize. v0.1 supports schema v1.0 only. Future versions add migrations.

When a migration runs (in a future server version), the file is backed up to `~/.narrator-state/backups/` with a timestamped label before migration applies.

## Failure modes

| Failure | How the tool responds |
|---|---|
| Project doesn't exist | Auto-created on first call with defaults; response includes `_meta.created_now: true` |
| AWARENESS regression attempted | Tool returns error; AWARENESS is monotonic |
| Healing a non-existent injury | Tool returns error with current injury IDs |
| Inventory underflow | Tool rejects with explanatory error |
| Death of an already-dead character | Tool rejects; previous death is canonical |
| Unknown flag name in `set_flag` | Tool rejects with known-flags list |
| Schema version mismatch on load | Server raises `SchemaVersionError` and refuses to load |

Tools never silently corrupt state. If a call fails, the file is unchanged.

## Architecture notes

- Single-user, single-machine. No concurrency handling beyond atomic writes. Last-write-wins.
- No authentication. The MCP server runs on stdio, not on a port.
- No telemetry. The server doesn't phone home.
- The audit log is capped at 100 entries to bound file size; `undo_last_event` reaches back through this log.

## Development

```bash
git clone https://github.com/yourusername/narrator-state.git
cd narrator-state
pip install -e ".[dev]"
```

Tests (when added):

```bash
pytest
```

## License

MIT.
