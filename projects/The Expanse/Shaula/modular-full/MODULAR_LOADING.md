# Modular vs Monolithic Loading — How Each Variant Works

Every project package in this repository ships in three sibling folders:

```
<package>/
  monolithic/         # the original aggregated KNOWLEDGE_*.md files
  modular-character/  # cast files only, one file per character
  modular-full/       # everything split: cast + locations + events + factions + missions
```

This document explains what each folder is for, when to use it, and what the narrator's retrieval discipline looks like in each mode. It applies to every project in `projects/`.

---

## 1. The three loading variants

### `monolithic/` — the original

Holds the package's original `KNOWLEDGE_<N>_<Topic>.md` files exactly as authored. Cast, locations, events, factions, hidden material, utility — each topic is one file, and each file may contain many named entities.

**When to use:** for small projects where the entire cast and world fit comfortably in seven or eight Project Knowledge files, and per-entity retrieval is not worth the bookkeeping. This is the default Allegheny / Vault 49 shape.

**Retrieval shape:** RAG surfaces a whole file (e.g., the full `KNOWLEDGE_1_Cast.md`) any time *any* character is named. Pro: connections between characters are always in context. Con: irrelevant characters consume the retrieval budget.

### `modular-character/` — cast-only modular

Holds one file per named character (`CAST_<NAME>.md`) and nothing else. Locations, events, factions, etc. continue to live in the monolithic files at the package root (or in `monolithic/`).

**When to use:** when the cast is large enough that you want per-character retrieval — but the rest of the world (locations, events, factions) is small enough to stay aggregated.

**Retrieval shape:** when a named character surfaces in scene, the narrator pulls *only* that character's file (plus the cast index if one exists). Locations and events are still retrieved as whole files.

### `modular-full/` — fully modular

Holds one file per named entity of every kind:

```
modular-full/
  Cast/         CAST_<NAME>.md          (one per named character)
  Locations/    LOCATION_<SLUG>.md      (one per significant location)
  Events/       EVENT_<SLUG>.md         (one per significant event)
  Factions/     FACTION_<NAME>.md       (one per faction; only where the world has them)
  Missions/     MISSION_M<NN>_<Slug>.md (one per scripted mission/beat; only where the package uses a mission deck)
```

Not every folder is present in every package — Vault 49 has no Factions, Hohenwald has no Missions, etc. The folders that *do* exist are the canonical home for that entity type.

**When to use:** for the project's mature, long-running state. Once a cast is 12+ named characters and the world has 20+ named locations, monolithic files start surfacing far more content than the scene needs.

**Retrieval shape:** before composing any scene, the narrator retrieves the specific files for entities that are about to be on screen — the character files for present NPCs, the location file for the setting, the mission file if a scripted beat is firing. Connections between entities are explicit cross-references inside each file (e.g., `see CAST_MAYA.md` inside a location file).

---

## 2. The cast-pull discipline (modular modes)

In both modular modes, the same rule applies whenever a named character appears in scene:

> **Always retrieve the relevant `CAST_<NAME>.md` file before composing a scene involving a named character.**

The cast index (if present at the package root or inside the modular folder) gives one-line summaries and file pointers; the per-character file gives the substance — engine, voice, dialogue examples, traits, states, relationship texture, narrator notes, arc skeleton.

A scene composed from index alone produces a flat character. The retrieval is one tool call and it is worth it. Multiple named NPCs in scene means multiple retrievals — that is fine; the alternative is voice contamination and dialogue blur across the cast.

If the player names a character the narrator has not pulled this session, retrieve before responding. If the player references a relationship between two characters, retrieve both files so the connection logic is accurate.

---

## 3. Per-entity file shape (the canonical structure)

Each per-entity file follows the same general skeleton, lifted from Allegheny's `CAST_<NAME>.md` pattern. Not every section is required for every entity type — locations don't have a "voice" section, events don't have a "current_state" — but the heading order is preserved when a section applies.

```
# <ENTITY_TYPE>_<SLUG> — <Full Name or Title>

Tier: <tier> · <entity>_id: <SLUG> · <one-line context about when/where this entity matters>

<1–3 paragraphs of orientation. What is this entity? Why is it in the world?>

Cross-references: <pointers to other files this entity touches — character index, schema, hidden material, state spec, etc.>

---

## <SLUG> — <short epithet or role>

### identity
- name, age, pronouns, tier/role, role_in_world, affiliation, joins/founded, mortality

### the_engine               (characters only — core want / core fear / public vs private self / biggest contradiction / what they self-deceive about / flaw_that_is_not_flavor)

### voice                    (characters only — speech_summary, 1–2 dialogue examples)

### trait_expansions          (per-trait blocks: surface_behavior, underlying_reason, limit, contradiction, scene_expression)

### current_state             (at_start, current_pressure, hidden_or_late_resolving_pressure)

### narrator_notes            (do_not_flatten_into, arc_skeleton, anything else the narrator needs in mind while writing this entity)
```

For locations: `identity / sensory / state_by_act / what_happens_here / narrator_notes`.
For events: `when / who / what_actually_happens / consequences_for_state / narrator_notes`.
For factions: `identity / posture / what_they_want / current_state / narrator_notes`.
For missions: `act / trigger / anchor_location / premise / spectacle / present_npcs / the_beat / exit_conditions / hidden / leaves_behind`.

Stay loose. The point is per-entity retrieval, not schematic uniformity — but the heading skeleton makes a cast of fifteen characters legible at a glance.

---

## 4. Setting up a Project to use a given variant

All three folders coexist on disk; **which variant Claude actually sees is decided by what is uploaded into the Claude Project's Knowledge surface**.

- **Monolithic mode:** upload `monolithic/*.md` (or the equivalent root-level `KNOWLEDGE_*.md` files). Leave the per-entity folders unloaded.
- **Cast-only modular:** upload `modular-character/*.md` plus the monolithic files for everything that *isn't* cast (locations, events, hidden, utility, etc.).
- **Fully modular:** upload `modular-full/**/*.md` plus the always-loaded `PROJECT_INSTRUCTIONS.md` and persona file.

`PROJECT_INSTRUCTIONS.md` is always loaded regardless of variant. So is the player persona file (`KNOWLEDGE_USER_*.md`). The variant only changes how *world knowledge* is partitioned for retrieval.

---

## 5. What stays the same across variants

- `PROJECT_INSTRUCTIONS.md` — the spine. Voice, tone, output contracts, hidden architecture rules, opening system. Survives every turn.
- The persona file (`KNOWLEDGE_USER_*.md`) — the player's character.
- The tracker artifact (`<package>-tracker.jsx` and any related schema docs).
- The MCP server, if the package has one. State persistence is orthogonal to how world knowledge is partitioned.

---

## 6. What changes per variant

| Concern | monolithic | modular-character | modular-full |
|---|---|---|---|
| Cast retrieval | whole `KNOWLEDGE_1_Cast.md` | per-character `CAST_<NAME>.md` | per-character `CAST_<NAME>.md` |
| Location retrieval | whole `KNOWLEDGE_2_Locations.md` | whole `KNOWLEDGE_2_Locations.md` | per-location `LOCATION_<SLUG>.md` |
| Event retrieval | whole `KNOWLEDGE_3_Events.md` | whole `KNOWLEDGE_3_Events.md` | per-event `EVENT_<SLUG>.md` |
| File count | ~7 | ~7 + cast-size | ~7 + cast-size + locations + events (+ factions + missions if present) |
| Retrieval precision | low — surfaces unrelated content | medium — character precise, world coarse | high — every entity precise |
| Bookkeeping cost | low | medium | higher — must maintain per-entity files |
| Best for | early/small projects | mid-size casts | mature, long-running projects |

---

## 7. Source-of-truth note

When a project ships in modular form, the per-entity files in `modular-character/` or `modular-full/` are the **source of truth** for that entity. The aggregated `KNOWLEDGE_*.md` in `monolithic/` is a snapshot — it may lag, and any divergence is resolved in favor of the per-entity file. Keep the monolithic snapshot in sync only when convenient; don't treat it as authoritative once the modular split exists.
