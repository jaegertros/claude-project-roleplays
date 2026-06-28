# Character Schema - Universal LLM Roleplay v1.0

This combines `CHARACTER_SCHEMA_v1.0.md` with
`character_template_st.json` into a scenario-neutral character format for LLM
roleplay. It keeps the useful density, voice, trait, state, and relationship
logic from the original schema, keeps SillyTavern-style macros from the JSON
template, and removes assumptions tied to a semester, a specific stat system,
or one campaign structure.

Use this for named NPCs, player-facing companions, romanceable characters,
antagonists, recurring minor characters, and character-card source material.
The goal is not to fill trivia. The goal is to give the narrator enough
behavioral logic to write a specific person consistently.

---

## Macro Contract

Use macros inside field values whenever the sentence refers to the character.

| Macro | Meaning |
|---|---|
| `{{char}}` | Character name or nickname. |
| `{{user}}` | Current user/player/persona name. |
| `{{pronoun.subjective}}` | she/he/they/etc. |
| `{{pronoun.objective}}` | her/him/them/etc. |
| `{{pronoun.pos_det}}` | her/his/their/etc. before a noun. |
| `{{pronoun.pos_pro}}` | hers/his/theirs/etc. |
| `{{pronoun.reflexive}}` | herself/himself/themselves/etc. |
| `{{is}}` / `{{are}}` | Verb agreement helpers where supported. |

Field names should stay neutral and stable: `what_they_hide`,
`what_makes_them_open_up`, `things_they_would_never_say`. Do not put pronouns
in field names, because field names are not runtime text.

---

## Recommended Density Tiers

### FULL

Use for characters who will carry scenes repeatedly: romance options, core
companions, major rivals, anchors, and important antagonists.

Fill every major section. Aim for 700-1,500 words if written as prose, or a
fully populated JSON object if machine-readable.

### MID

Use for recurring characters who matter but do not need a full arc.

Fill: `identity`, `role_context`, `engine`, `voice`, 2-3
`trait_expansions`, compressed `states`, `relationship_texture`, and
`narrator_notes`.

### LIGHT

Use for named minors and one-scene characters who may recur.

Fill: `identity`, `role_context.one_line`, 3-5 trait words, one voice marker,
one concrete behavior, and one fact they know.

---

## Design Principles

- Descriptive beats prescriptive. Write "When tired, {{char}} gets quieter and
  more literal," not "Make {{char}} get quieter when tired."
- One coherent character framework beats stacked typologies. Big Five can be
  stored for database compatibility, but scene-writing should mostly depend on
  engine, traits, states, voice, and relationship logic.
- No pre-scripted reactions. Instead of a table for "when {{user}} flirts",
  define what lands, what falls flat, what {{char}} notices, and how attraction
  or trust shows.
- No scenario-specific assumptions in the base schema. A school campaign can
  add semester fields. A survival campaign can add awareness gates. A space
  mystery can add evidence-depth gates. The universal template should not
  require them.
- Include only details that change scenes. Appearance, voice, body language,
  values, fears, limits, obligations, and social position matter. Birthday and
  favorite color usually do not.

---

## Section Guide

### metadata

Administrative fields for tools, databases, and migrations.

- `schema_version`
- `density_tier`
- `source`
- `project_id`
- `character_key`
- `scope`
- `visibility`
- `tags`

### identity

The factual layer.

- `name`
- `display_name`
- `age`
- `pronouns`
- `role_in_world`
- `occupation_or_function`
- `origin`
- `living_situation`
- `social_position`
- `public_reputation`
- `private_reality`
- `core_concept`

### role_context

Scenario-neutral replacement for the old `semester` section. This describes
what situation currently has a claim on {{char}}.

- `one_line`
- `current_pressure`
- `current_obligation`
- `resources_or_constraints`
- `hidden_situation`
- `stakes_if_nothing_changes`
- `what_changes_by_act_or_phase`

For a school story, this can describe semester pressure. For a survival story,
it can describe food, safety, infection, or faction pressure. For an intrigue
story, it can describe political exposure or secrets.

### scenario_context

The removable scenario-specific layer. This is where a project can bind
{{char}} to a setting, timeline, faction map, mechanics, reveal gates, and
plot hooks without contaminating the portable character core.

- `project_role`
- `timeline_anchor`
- `location_anchors`
- `faction_or_group_bindings`
- `world_pressure`
- `mechanical_hooks`
- `plot_hooks`
- `reveal_gates`
- `relationship_to_player_at_start`
- `scenario_only_notes`

When porting {{char}} to a different project, rewrite or remove this section
first. The `engine`, `voice`, `trait_expansions`, `states`, and
`relationship_texture` sections should usually survive the move with only light
adjustment.

### engine

The motivational core.

- `core_want`
- `internal_need`
- `core_fear`
- `core_desire`
- `public_self`
- `private_self`
- `central_lie`
- `emotional_wound`
- `protective_strategy`
- `biggest_contradiction`
- `what_they_self_deceive_about`

### values_and_lines

The character's moral and emotional boundaries.

- `core_values`
- `hard_boundaries`
- `soft_boundaries`
- `temptations`
- `moral_blind_spots`
- `lines_never_cross`
- `lines_might_cross`

This section is useful because it prevents the narrator from making a character
do something only because the plot wants it.

### physical_presence

What the narrator can put on screen without going generic.

- `appearance_summary`
- `body_language`
- `movement_style`
- `dress_and_objects`
- `tells`
- `sensory_details`

Keep this concrete and scene-useful. "Tall, pretty, green eyes" is weak.
"Sleeves shoved up, ink on the side of {{pronoun.pos_det}} hand, always
standing like {{pronoun.subjective}} may need to leave quickly" is useful.

### voice

The most important consistency section.

- `speech_summary`
- `vocabulary_register`
- `rhythm`
- `emotional_directness`
- `humor_style`
- `speech_tics`
- `common_phrases`
- `things_they_would_never_say`
- `dialogue_examples`

Examples should be actual lines, not summaries.

### interaction_logic

Scenario-neutral replacement for `stat_affinity`. This tells the narrator how
{{char}} reads {{user}} and other people without requiring a fixed game stat
system.

- `what_lands`
- `what_falls_flat`
- `gift_logic`
- `how_they_read_people`
- `how_they_read_user`
- `signals_they_respect`
- `signals_they_mistrust`
- `what_builds_trust`
- `what_breaks_trust`

If a project has stats, add them under `project_specific.affinity_model`
instead of making them universal.

### trait_expansions

Three to five core traits for FULL, two or three for MID. Each trait gets:

- `trait`
- `surface_behavior`
- `underlying_reason`
- `trigger`
- `limit`
- `contradiction`
- `scene_expression`

This is the best replacement for heavy personality typologies.

### states

Descriptive behavior under pressure and emotion.

- `default_state`
- `under_stress`
- `when_exhausted`
- `when_happy`
- `when_angry`
- `when_hurt`
- `when_afraid`
- `when_attracted`
- `when_trusting`
- `when_grieving`
- `when_caught_off_guard`

Projects can remove unused states. Do not force every character to have every
state if the character is LIGHT tier.

### relationship_texture

How {{char}} relates to kinds of people and to {{user}}.

- `with_strangers`
- `with_close_friends`
- `with_authority`
- `with_enemies_or_rivals`
- `with_family_or_origin_group`
- `with_user_initially`
- `what_makes_them_open_up`
- `what_makes_them_close_off`
- `relationship_escalation`

### connections

How {{char}} fits the cast.

- `knows`
- `doesnt_know`
- `history_with`
- `owes`
- `owed_by`
- `faction_or_group_ties`

### arc_skeleton

A scenario-neutral six-beat arc. Replace labels only if a project has a better
axis.

1. `notice` - How {{user}} first sees {{char}} as more than a function.
2. `approach` - How real contact becomes possible.
3. `friction` - The first meaningful test or contradiction.
4. `depth` - What truth or vulnerability becomes available.
5. `stakes` - What choice or consequence now matters.
6. `capstone` - How the arc resolves, transforms, breaks, or remains open.

### narrator_notes

Use this section to stop common LLM failure modes.

- `do_not_flatten_into`
- `do_not_overuse`
- `good_recurring_motifs`
- `continuity_rules`
- `retrieval_notes`

### runtime_state

Mutable fields for databases, trackers, MCP servers, or long-running play.

- `state_variables`
- `npc_perception_of_user`
- `known_facts`
- `unresolved_threads`
- `recent_changes`
- `example_exchanges`

Keep project-scope templates separate from playthrough-scope overrides.

---

## Suggested Cuts From The Original Inputs

- Cut `semester` from the universal schema. Keep it as a project-specific
  extension. Use `role_context` instead.
- Cut `stat_affinity` from the universal schema. Keep a generic
  `interaction_logic.signals_*` model, and let game projects add stats under
  `project_specific`.
- Add `scenario_context` as the place for project-specific role, phase,
  faction, mechanic, plot, and reveal-gate data. This keeps the character
  portable.
- Rename all gendered keys from the Markdown source. Use neutral keys such as
  `things_they_would_never_say` and put pronouns only in macro-filled values.
- Keep `trait_expansions`; it is the strongest part of the original design.
- Add `physical_presence`; it prevents generic prose and helps image prompts.
- Add `values_and_lines`; it gives characters stable moral limits.
- Add `runtime_state`; it bridges this schema to `character_profiles`,
  `npc_perception_of_user`, trackers, and MCP servers.

---

## Database Compatibility

The universal JSON maps cleanly to the existing `character_profiles` table:

- `identity.*` maps to identity columns.
- `scenario_context.*` can map to project-specific JSONB columns, retrieval
  metadata, scenario-event gates, or companion tables.
- `engine.*` maps to wants, fears, lies, wounds, masks, and private self.
- `values_and_lines.*` maps to the JSONB values/lines columns.
- `voice.*` maps to voice columns and JSONB phrase fields.
- `states` and `trait_expansions` can live in `pressure_behavior`,
  `relationship_behavior`, `things_to_remember`, or a future JSONB column.
- `runtime_state.state_variables` maps to `state_variables`.
- `runtime_state.npc_perception_of_user` maps to `npc_perception_of_user`.
- `runtime_state.example_exchanges` maps to `example_exchanges`.

For strict SQL import, use `character_template_universal_llm_roleplay.json` as
the machine-readable source and flatten selected nested fields into table
columns.
