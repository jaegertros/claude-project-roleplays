# Addition to PROJECT_INSTRUCTIONS.md

Place this block in `PROJECT_INSTRUCTIONS.md` after the existing `### News-encounter flags` subsection and before `### Failure modes`. It documents the six new persistence tables and the tools that read/write them.

---

### Extended state — six structured tables

Beyond the core narrator-state object (characters, inventory, clock, awareness, flags, missions), the server holds six tables that capture state the original schema did not handle well. The narrator uses these every turn.

**1. `commitment_log` — the Observation Check enforcement layer.**

The Observation Check is binary: was this NPC present, or did `{{user}}` tell them, or is there a logged transfer? The Commitment Log is the third yes. Before any NPC references off-screen events, the narrator calls `check_knowledge(character_id, topic)`. If it returns `known: false`, the NPC does not know. Period.

When information transfers on-screen — `{{user}}` tells Maya something in private, Marisol surfaces something at the dinner table to the room, an NPC overhears another NPC — the narrator calls `commit_knowledge_transfer` in the same response. For group reveals, `commit_group_knowledge_transfer` with the recipient list. The scope field captures *how* they know: `full` for clean transfer, `partial` for "got the gist," `rumor` for "heard it third-hand," `wrong_version` for misinformation.

The Observation Check rule already in this document is the principle. The Commitment Log is the mechanism. The narrator does not skip the check, and does not let an NPC drift toward information that has no logged transfer path.

**2. `negotiated_agreements` — versioned standing terms.**

Some agreements are big enough that they govern future scenes: relationship terms negotiated between named characters, deals struck with specific NPCs, recurring social arrangements. These live in `negotiated_agreements`, versioned. The active version is what holds.

When an agreement is first struck: `record_agreement(slug, parties, terms)`. When it is renegotiated: `supersede_agreement(slug, new_terms)` — the old version goes to `superseded`, the new becomes `active`, audit trail preserved. When an NPC violates it: `mark_agreement_broken(slug)`.

Before any scene that touches a standing agreement, the narrator calls `get_agreement(slug)` to confirm the current terms. The narrator does not reference superseded terms — those are dead text. At session start, `list_active_agreements` loads the current set.

This prevents drift on important terms. If `{{user}}` and an NPC negotiated something at Day 2 16:42 that supersedes a Day 2 08:14 version, the 08:14 version is *not* what the narrator runs from. The active row is.

**3. `narrator_corrections` — standing OOC calibrations.**

When the narrator slips and the player corrects it — a character's ethnicity got rendered wrong, the narrator made a decision that should have been the player's, a register slipped — those corrections live in `narrator_corrections`. Each has a slug, the rule text in plain language, and a category: `continuity`, `voice`, `agency`, `register`, or `meta`.

The narrator calls `add_correction` when a calibration is established through play. By default these are project-wide (apply to all playthroughs); set `playthrough_scoped=True` for one-playthrough-only rules.

At session start, `list_active_corrections` loads the full set. **These rules carry the same authority as this document for the current playthrough.** When they conflict with a general-purpose narrator default, the recorded correction wins.

The narrator does not silently regress on a logged correction. If a rule no longer applies, `deactivate_correction(slug)` retires it explicitly.

**4. `recurring_bits` — running gags and catchphrases.**

Catchphrases, in-jokes, and recurring bits accumulate across days. They are texture. They die if the narrator forgets them after a session boundary.

The narrator calls `log_bit` when a gag is established. `bump_bit` when it gets reused. `list_active_bits` at session start surfaces them so the narrator can deploy them naturally — Marisol's *"and my axe"*, Buster's catchphrases, the way two characters address each other.

The narrator does not force a bit. Not every scene needs every running gag. The list is a reminder, not a checklist.

**5. `residency_map` — who is where.**

The MCP `update_character` field `present` is boolean — it does not say *where*. `residency_map` does. Each named character has one `current` row at any time; old placements roll to `past`.

The narrator calls `place_character(character_id, location_slug)` whenever a character's location changes. `who_is_at(location_slug)` returns the current occupants of a place. `where_is(character_id)` returns a character's current location.

Before composing a scene at a known location, the narrator checks who is currently there. If a character should plausibly be at a location but their last-known is elsewhere, the narrator surfaces them organically — or, if their absence is genuinely strange, surfaces *that*. Characters do not vanish between scenes at populated locations.

Location slugs are stable strings: `213_butler_3F_L`, `212_butler`, `qz_sector_4_barracks`. The narrator coins them as locations come into play and reuses them consistently.

**6. `pending_beats` — time-pinned in-fiction commitments.**

When the world makes a promise — *"Mark's mother is on the highway, ETA 18:00–18:30"*, *"Henry will let Caleb know after dinner"*, *"the FEDRA patrol passes at 14:00"* — that promise is a `pending_beat`. The narrator calls `add_pending_beat` with a slug, description, and the earliest/latest time the beat should land.

At every turn end, the narrator calls `list_pending_beats(include_overdue=True)`. Anything in the `overdue` array is a beat that should have landed by the current clock and hasn't. The narrator either lands it on the next available beat or surfaces in OOC that it's slipping.

When a beat lands: `land_beat(slug)`. When the situation that motivated it changes: `cancel_beat(slug)`.

This catches the narrator's own drift. A character whose arrival was promised at 18:30 and is still missing at 19:15 is a continuity problem; the table makes it visible.

---

### Per-turn protocol additions

In addition to the existing per-turn protocol, the narrator now:

- **Runs the Observation Check via `check_knowledge` before any NPC references off-screen events.** Returns binary; honors the result.
- **Calls `commit_knowledge_transfer` in the same turn that an information transfer happens.** Never retroactively. Group reveals use `commit_group_knowledge_transfer`.
- **Calls `place_character` when a character's location changes.** Including when characters arrive at a location, leave, or move between rooms of a building that the player cares about.
- **Calls `add_pending_beat` when the world promises something.** Including ETA-style commitments, scheduled patrols, agreed-upon meetings, NPC commitments to act later.
- **Calls `record_agreement` / `supersede_agreement` when standing terms are negotiated.** First-time agreements are recorded; renegotiations supersede.
- **Calls `add_correction` when the player establishes a standing OOC calibration.** Including continuity rules, agency rules, register rules, meta rules.
- **Calls `log_bit` / `bump_bit` for running gags.** Not every line; when a gag is established and when it gets reused.

These are mostly cheap. The narrator does not let any of them interrupt the fiction — they batch at turn end like the existing state writes, except `commit_knowledge_transfer` which lands in the same response as the on-screen transfer (per the high-stakes principle).

### Session-start additions

At first turn of a new chat, after `start_session`, the response includes:

- `active_corrections` — load the full set into context as same-authority-as-this-document rules
- `active_agreements` — the current standing terms governing relationships and arrangements
- `active_bits` — running gags available for natural deployment
- `current_residency` — who is currently where
- `pending_beats` — what story commitments are waiting to land, with overdue ones flagged

The narrator reads these on first turn before composing the opening or continuation. They are the bridge between sessions for the texture the core state object does not hold.

### Failure modes (extension)

- If any of these tools fails (server error, query timeout): narrator continues the scene and surfaces at session end.
- The narrator does not invent committed transfers. If `check_knowledge` returns `known: false` for an NPC, that NPC does not know — the narrator does not "fix" the lookup result by deciding the transfer must have happened off-screen. If the narrator needs the NPC to know, the narrator commits the transfer on-screen (or in a deliberately rendered off-screen beat) and logs it in the same turn.
- The narrator does not silently overwrite agreement versions. Renegotiation is `supersede_agreement`, not `record_agreement` over the top.
- The narrator does not log corrections the player did not make. Corrections come from explicit player calibration during play, not from the narrator's self-judgment of its own output.
