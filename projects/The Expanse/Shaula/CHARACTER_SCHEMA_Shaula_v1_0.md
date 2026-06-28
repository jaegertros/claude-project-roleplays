# Character Schema — Project Shaula (v1.0)

This is the character sheet format for named NPCs in *Project Shaula*. It adapts the *Project Allegheny* `CAST_<NAME>.md` pattern to Shaula's 10-day investigation arc, where the governing pressure is **DEPTH**, not outbreak awareness.

The old `KNOWLEDGE_1_Residents.md` cast file mixed everyone into one long document. The new model splits the layer:

- `KNOWLEDGE_1_Cast.md` = dispatcher / roster / retrieval discipline.
- `CAST_<NAME>.md` = one file per major named NPC.
- `CAST_OUTSIDE_GROUPS.md` = recurring social groups and engagement ladders.
- `CAST_SUPPORTING_AND_DEAD.md` = low-resolution supporting cast and recurring dead names.

---

## Design principles

- **One character, one file.** If the narrator is writing Aanya, pull `CAST_AANYA.md`. If writing Naima and Leksi together, pull both. Index-only scenes are a failure mode.
- **Descriptive, not prescriptive.** Fields describe how the character behaves. They do not script exact reactions.
- **No romance-as-unlock.** Romance changes warmth and access, but not epistemic permission. DEPTH gates and KNOWLEDGE_8 still rule reveals.
- **Flaws stay operational.** Every plot-critical NPC has a flaw that is not flavor. The narrator honors it even when it complicates the scene.
- **No trivia unless it writes scenes.** Physical markers, voice, tic, and history matter only because they change prose and choices.

---

## Density tiers

### Tier FULL / `romanceable_core`
For the four shipboard romance-capable core crew: Naima, Leksi, Aanya, Kit. These files should carry the full sheet: identity, engine, current state, physical presence, voice, interaction logic, states, narrator notes, and arc skeleton.

### Tier FULL / `romanceable_outside`
For outside romance candidates whose route can become substrate-relevant: Yusra and Mags. Yusra starts full because her storm notebook and Archive-adjacent position can become a major DEPTH path. Mags starts mid-light and should be promoted if play centers her.

### Tier MID / `power_player`
For senior figures whose choices shape the ending but who are not written as romance candidates: Soji, Cortez, Mooch, Kyei. These need a strong engine, voice, flaw, and reveal discipline.

### Tier GROUP
For recurring social worlds: Kerent Lab, Sasa Bar / Azorana itinerants, El Dorado Pavilion, and the *Soji-Bee*. These live in `CAST_OUTSIDE_GROUPS.md` because the relationship ladder matters more than one person's private arc.

### Tier LIGHT
For supporting cast and the dead. These live in `CAST_SUPPORTING_AND_DEAD.md` unless they recur three meaningful times or become a romance / DEPTH path.

---

## Full character sheet sections

### identity
Factual layer: name, age, pronouns, tier, `character_id`, role, affiliation/home, joining moment, mortality/consequence handling, romance status.

### the_engine
Motivational layer: core want, core fear, public self, private self, biggest contradiction, self-deception, and flaw-that-is-not-flavor.

### current_state
What is true at the start of play and what is pressuring the character right now. In Shaula, this is keyed to Day 0–10 and the report deadline, not a semester or outbreak week.

### physical_presence
The concrete visual / embodied layer: body, dress, scars, gestures, posture. This exists so `/vision` prompts and prose do not drift generic.

### voice
Speech summary, cadence, register, code-switching, tic/physical tell, and at least one canonical quote.

### interaction_logic
What lands, what misses, how the character reads the protagonist, romance logic if relevant, and DEPTH/reveal discipline.

### states
Compressed behavioral modes: default, under stress, when trusting, when hurt. Add specialized states only when they will actually write scenes.

### narrator_notes
Do-not-flatten warning, retrieval rule, voice-contamination warning, original source pointer.

### arc_skeleton
Six beats adapted to Shaula:

1. **Notice** — first read / first pressure.
2. **Approach** — the route by which the protagonist can become relevant to them.
3. **Friction** — the flaw starts costing something.
4. **Depth** — the character can meaningfully affect DEPTH or the report.
5. **Stakes** — the report deadline forces the conflict into consequence.
6. **Capstone** — their ending shape.

---

## Retrieval contract

Before writing any scene involving a named NPC, retrieve:

1. `KNOWLEDGE_1_Cast.md` if the roster / file pointer is needed.
2. The specific `CAST_<NAME>.md` file for each named character present.
3. `KNOWLEDGE_8` for that character's epistemic map and reveal triggers.
4. `KNOWLEDGE_2` / `KNOWLEDGE_3` / `KNOWLEDGE_4` as needed for location, date, or substrate.

The narrator should not compose a named-character scene from the cast index alone.
