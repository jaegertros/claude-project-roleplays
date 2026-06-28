# vault83-state

A project-specific Model Context Protocol (MCP) server for *Vault 83* — a seven-day Fallout-universe roleplay about a Vault-Tec social-stratification experiment. The protagonist (Caleb Teague) is a hereditary **Liaison**, the small messenger caste that crosses every tier and belongs to none. The week ends with **The Choice** on Day 7 (Preserve / Exit / Reveal / Rupture) once the Admission Ledger is in hand and DEPTH is at the irreducible point.

Unlike the general-purpose `narrator-state` server built for *Allegheny* (factions, infection awareness, missions, injuries), and unlike `hohenwald-state`'s sanatorium model (TB cure trajectory, the cave register, the Föhn), this server is scoped to Vault 83 specifically: the **Tier Protocol** (1a–4b plus Liaison), the **Advancement Review** that runs on Day 3, the **Admission Ledger** (tampered public copy on Level 1 / unredacted original on the sub-basement terminal), the **Pip-Boy / pocket journal**, daily anchors (Reveille → Morning Hymn → Address → runs → Lunch → Dinner → Lights-out), and the canonical four endings.

## Install

```bash
cd "projects/Fallout/Vault 83/vault83-state"
pip install -e .

# With the Supabase extension tools:
pip install -e ".[supabase]"
```

Set credentials via env vars (`SUPABASE_URL`, `SUPABASE_KEY`) or by writing `~/.vault83-state/config.json` with `{"supabase_url": "...", "supabase_key": "..."}`. If Supabase is unavailable, the local-JSON tools work normally and the extension tools return a clear setup hint — *except* `add_journal_entry`, which is Supabase-only by design (the Pip-Boy journal is the shared roleplay-repo journal).

## MCP tools

### Session and clock
| Tool | What it does |
|---|---|
| `start_session(project, session_note)` | Open a session; mints `playthrough_id` on first call against fresh state. |
| `end_session(project, summary)` | Close the current session. |
| `get_state(project, include_residents, include_history)` | Trimmed view of current state. |
| `reset_state(project, confirm)` | Wipe to defaults (backs up first; `confirm=True` required). |
| `advance_clock(project, new_time, new_day, new_level, new_location_slug)` | Set HH:MM; rolls story_day on midnight or explicit `new_day`. Vault 83 explicitly tracks `level` (1/2/3/4/sub_basement). |
| `undo_last_event(project, confirm)` | Reverse the most recent state change; preview required. |

### Daily anchors
| Tool | What it does |
|---|---|
| `enter_anchor(project, anchor_key)` | Switch into a named anchor (reveille, breakfast, morning_hymn, morning_address, morning_runs, lunch, afternoon_runs, work_day_end, dinner, evening, lights_half, lights_out). |
| `exit_anchor(project)` | Clear `clock.current_anchor`. |
| `mark_anchor_attendance(project, anchor_key, attendees, notes)` | Record who showed up; mirrors to `vault83_anchor_attendance`. |

### Residents and the Tier Protocol
| Tool | What it does |
|---|---|
| `register_resident(project, character_id, display_name, original_tier, level, room_slug, is_liaison)` | Initial placement. `is_liaison=True` adds the character to `state.liaison_class_members`. |
| `place_resident(project, character_id, level, location_slug)` | Move between levels / sub-locations. |
| `update_relationship(project, character_id, new_relationship, notes)` | Move a resident along the Caleb-NPC ladder (stranger → acquaintance → known → trusted → close → in_love). |
| `record_tier_transition(project, character_id, from_tier, to_tier, reason, story_day, story_time, notes)` | The core mechanic. `reason` is one of `advancement_review`, `informal_movement`, `punitive`, `promotion_for_service`, `discovery`, `tier_adoption`, `ledger_reckoning`. Mirrors to `vault83_tier_transitions`. |
| `record_advancement_review_decision(project, character_id, decision, from_tier, to_tier, basis, notes)` | The Day-3 formal hearing. Composes a tier transition when the decision moves the candidate; always mirrors to `vault83_advancement_reviews`. |

### The Admission Ledger
| Tool | What it does |
|---|---|
| `record_ledger_view(project, ledger_section, depth_gate_passed, story_day, story_time, notes)` | Record an inspection of the Ledger. Public copy = DEPTH ≤ 2; sub-basement terminal = DEPTH 4+. Mirrors to `vault83_admission_ledger_views` and flips the related flags automatically (`public_ledger_viewed`, `admission_ledger_seen`, `original_ledger_compared`). |

### The Pip-Boy / pocket journal
| Tool | What it does |
|---|---|
| `add_journal_entry(project, entry, in_game_day, day_of_week, in_game_time, note_type, delivery_from, pertains_to)` | Write to Caleb's pocket journal. **Writes to the SHARED `journal_entries` Supabase table** with `project_id='vault83'` — not a vault83-specific table. `note_type` is one of `observation`, `delivery`, `overheard`, `private`, `name`, `ledger_fragment`, `instruction`, `decision`. |

### DEPTH and flags
| Tool | What it does |
|---|---|
| `bump_depth(project, new_depth, reason)` | Tick DEPTH up (0-5; monotonic). Flips `tier_protocol_revealed` at DEPTH 3+ and `sub_basement_corridor_known` at DEPTH 4+. Mirrors to `vault83_depth_log`. |
| `set_flag(project, flag_name, value, notes)` | Set a known flag from `KNOWN_FLAGS` (rejects unknowns). The flag set covers the Tier Protocol comprehension ladder, the Ledger thresholds, Day 3, the sub-basement trespass, Day 7's Choice, and the Liaison social texture. |

### Day 7 — The Choice
| Tool | What it does |
|---|---|
| `record_choice(project, ending_chosen, basis, notes)` | One-shot per playthrough. `ending_chosen` is one of `preserve`, `exit`, `reveal_private`, `rupture`. Flips `choice_made`; `rupture` also flips `experiment_disclosed_publicly`; `exit` flips `tier_adoption_petition_filed`. Mirrors to `vault83_endings`. |

### Read-side query tools (Supabase)
- `list_tier_transitions(project, character_id, limit)`
- `list_advancement_reviews(project, limit)`
- `list_ledger_views(project, limit)`
- `list_depth_log(project, limit)`
- `list_anchor_attendance(project, anchor_key, story_day, limit)`
- `list_journal_entries(project, in_game_day, note_type, pertains_to, limit)` — reads the shared `journal_entries` table
- `get_ending(project)` — single-row lookup

## State storage

- **Local:** one JSON file per project at `~/.vault83-state/<project>.json`. Atomic writes via tempfile + rename. Audit log capped at 100 entries for undo. Backups before destructive operations land in `~/.vault83-state/backups/`.
- **Supabase (optional):** six Vault-83-specific tables plus one shared. The CREATE TABLE statements are documented as comments at the top of `src/vault83_state/supabase_tools.py` — not auto-applied; run them manually.

| Table | Written by | Notes |
|---|---|---|
| `vault83_tier_transitions` | `record_tier_transition`, `record_advancement_review_decision` | The Tier Protocol history. |
| `vault83_advancement_reviews` | `record_advancement_review_decision` | The Day-3 (and any alternate-day) Tribunal outcomes. |
| `vault83_admission_ledger_views` | `record_ledger_view` | Each Ledger inspection, with the DEPTH at which it happened. |
| `vault83_depth_log` | `bump_depth` | DEPTH-ladder transitions. |
| `vault83_anchor_attendance` | `mark_anchor_attendance` | Anchor attendance per day. |
| `vault83_endings` | `record_choice` | One row per playthrough, uniqued by `playthrough_id`. |
| `journal_entries` *(shared)* | `add_journal_entry` | Reused from the rest of the roleplay repo. `project_id='vault83'` scopes rows to this project. |

The local-JSON file is always the source of truth for state. The Supabase mirrors are best-effort for everything except the journal; a failed mirror does not roll back the local write. The journal table is Supabase-only (the Pip-Boy is meant to feel like a real device and rereads should go through the database).

## How the Advancement Review flow works

The Day-3 Tribunal hearing is the week's structural anchor. The narrator typically composes it like this:

```
# Day 3 morning — Reeve is told she's the candidate
advance_clock(new_time="07:00")
add_journal_entry(
    entry="Delivered the petition notice to Reeve at 1b-09. She said: "
          "'Thank you for doing your job, Mr. Teague.'",
    note_type="delivery", pertains_to="REEVE",
)

# Day 3 afternoon — protagonist stationed in the corridor
enter_anchor(anchor_key="afternoon_runs")
advance_clock(new_time="14:00")

# 17:30 — the call
advance_clock(new_time="17:30")
record_advancement_review_decision(
    character_id="REEVE",
    decision="demotion_passed",
    from_tier="1b", to_tier="4b",
    basis="seed coalition / housing motive (Verity needs 1b-09)",
    notes="weighted 8-1, threshold 6",
)
# ↑ This call:
#  - appends a row to vault83_advancement_reviews
#  - inlines a tier transition row to vault83_tier_transitions
#  - updates Reeve's current_tier to 4b in local state
#  - flips advancement_review_attended and reeve_demotion_executed

# 17:45 — escort to 4b-11
advance_clock(new_time="17:45", new_level="4", new_location_slug="4b-11")
place_resident(character_id="REEVE", level="4", location_slug="4b-11")
add_journal_entry(
    entry="Walked Reeve down. She asked: 'Did you know this was coming?' "
          "I told her I saw pieces.",
    note_type="private", pertains_to="REEVE",
)
update_relationship(character_id="REEVE", new_relationship="trusted",
                    notes="Honest answer in the elevator opened the door")
```

The Tribunal vote weighting and the seed coalition's individual motives are narrator-described; this server captures only the outcome and the protagonist's understanding of the basis. The reverse — a post-Rupture restoration on Day 7+ — uses `record_tier_transition(reason='ledger_reckoning')` rather than another `record_advancement_review_decision`, because the restoration isn't a fresh hearing.

## How this differs from Allegheny's `narrator-state` and Hohenwald's `hohenwald-state`

- **Allegheny / `narrator-state`** — generic narrative state. Generic characters with locations, factions, missions, injuries, and an AWARENESS tier scaled to a virus spread. No tier system. No Pip-Boy journal as such.
- **Hohenwald / `hohenwald-state`** — sanatorium model. Guests with TB cure trajectories, named daily rituals (Morning Round, Noon Bell, Rest Cure, three meals, Music, Closing), the cave register, the Föhn cycle, DEPTH anchored to discoveries about Dr. Klein and the caves.
- **Vault 83 / `vault83-state`** — Tier Protocol model. Residents typed by tier (1a/1b/1c, 2a/2b/2c, 3a/3b/3c, 4a/4b, plus `tier_4_culture` and `liaison`), the Day-3 Advancement Review as a separate event class, the public-vs-original Admission Ledger as a tracked artifact with its own table, the Pip-Boy journal writing to the shared `journal_entries` table, the four-ending `record_choice` as the one-shot terminus. DEPTH is anchored to discoveries about Margaret Dane's tampering, the seven Tier-1 plants and three Tier-4 plants, and the sub-basement terminal.

The three packages are siblings and may be installed side-by-side.

## Schema versioning

State files carry a `schema_version` field. v1.0 is the only currently supported version. When v1.1 lands, idempotent migration code goes into `store.load_state` following the pattern in `hohenwald_state.store`.

## Tests

```bash
pytest tests/
```

The smoke tests stub the Supabase mirror helpers, so no live client is needed. The journal helper is stubbed with a synthetic-row response so `add_journal_entry` reports `ok=True` even without a live database.

## License

MIT.
