# KNOWLEDGE_1_Cast — Project Shaula

The cast index. Each major named NPC in *Project Shaula* lives in their own `CAST_<NAME>.md` file. This file is the dispatcher: it documents the cast tiers, file pointers, retrieval discipline, outside-group routing, and named-minor escalation rules.

This replaces the old monolithic `KNOWLEDGE_1_Residents.md`. For per-character data — engine, voice, physical presence, flaw, relationship logic, states, narrator notes, and arc skeleton — retrieve the relevant `CAST_<NAME>.md` file directly when that character is in scene.

Cross-references: schema in `CHARACTER_SCHEMA_Shaula_v1_0.md`; epistemic maps and reveal triggers in `KNOWLEDGE_8`; substrate truth in `KNOWLEDGE_4`; current playthrough state in the Commitment Log.

---

## Cast-pull discipline

**Always retrieve the relevant `CAST_<NAME>.md` file before composing a scene involving a named character.** This index gives the pointer; the file gives the substance.

Multiple named characters in scene means multiple cast files. A Naima/Leksi engineering conversation should pull both files, because their voices and flaws pressure the scene in different ways.

A scene composed from the index alone will flatten the cast. The index is a map, not the territory.

---

## Cast tiers — overview

- **TIER A — Core shipboard cast / romanceable core**: Naima, Leksi, Aanya, Kit. The four-person crew of *Tessek's Promise* around the protagonist.
- **TIER B — Outside romance / substrate routes**: Yusra and Mags. Yusra is already substrate-relevant; Mags is lower-resolution until play promotes her.
- **TIER C — Power players**: Soji, Cortez, Mooch, Kyei. Senior figures whose institutional choices shape the ending.
- **TIER D — Outside groups**: Kerent Lab, Azorana itinerants / Sasa Bar, El Dorado Pavilion, *Soji-Bee*.
- **TIER E — Supporting and dead**: Base staff, recurring dead names, and minor presences that should not bloat the always-retrieved cast layer.

---

## Roster — core shipboard cast

| character_id | name | tier | role | joins | file |
|---|---|---|---|---|---|
| NAIMA | Captain Naima Tessek, 36 | romanceable_core | Captain of *Tessek's Promise* | Day 0 / Day 1 | `CAST_NAIMA.md` |
| LEKSI | Leksi Ojara, 26 | romanceable_core | Pilot/Engineer | Day 0 / Day 1 | `CAST_LEKSI.md` |
| AANYA | Dr. Aanya Voltaire, 32 | romanceable_core | Medical Officer & Biologist | Day 0 / Day 1 | `CAST_AANYA.md` |
| KIT | Cael "Kit" Solano, 31 | romanceable_core | Security/Roughneck | Day 0 / Day 1 | `CAST_KIT.md` |

**Core rule:** these four are not interchangeable romance archetypes. Naima is command and competence under fear; Leksi is anxious warmth and over-explanation; Aanya is peer-science caution and suppressed action; Kit is silence, refusal, and not-running.

---

## Roster — outside romance / substrate routes

| character_id | name | tier | role | joins | file |
|---|---|---|---|---|---|
| YUSRA | Yusra Boluwarin-Ali, 30 | romanceable_outside | TGCC operations technician; storm-model route | Day 1 / Day 2 | `CAST_YUSRA.md` |
| MAGS | Margaret "Mags" Hwang-Adelakun, 42 | romanceable_outside_mid_light | AHI medical officer | On demand at Ibẹrẹ | `CAST_MAGS.md` |

Yusra should be treated as a full route because her atmospheric model and Archive-adjacent position can become substrate-relevant. Mags begins lower-resolution; promote if she becomes central.

---

## Roster — power players

| character_id | name | tier | role | joins | file |
|---|---|---|---|---|---|
| SOJI | Adesoji "Soji" Oduya, 51 | power_player | AHI Site Director, Ibẹrẹ | Day 1 | `CAST_SOJI.md` |
| CORTEZ | Captain Tomás Cortez, 44 | power_player | ADW Senior Facility Engineer, El Dorado | Day 1–2 | `CAST_CORTEZ.md` |
| MOOCH | Mari "Mooch" Asarat-Garai, 38 | power_player | TGCC Flotilla Coordinator, Azorana | Day 2 | `CAST_MOOCH.md` |
| KYEI | Dr. Ingrid Kyei, 64 | power_player | UN Charter Observer | Day 1–2 | `CAST_KYEI.md` |

These characters are not quest vendors. Each represents an institutional morality with a personal flaw. Pull their cast file and `KNOWLEDGE_8` before letting them reveal, deflect, or pressure.

---

## Outside-group routing

Use `CAST_OUTSIDE_GROUPS.md` for:

- Kerent Lab / Halverson successor team.
- Azorana itinerants / Sasa Bar.
- El Dorado Pavilion.
- The *Soji-Bee* free trader.

The group file carries relationship ladders from Trade → Business only → Socializing → Teaming up → Inside. Pull it when the protagonist enters one of those social worlds or asks who might know / carry / trade something.

---

## Supporting and dead routing

Use `CAST_SUPPORTING_AND_DEAD.md` for:

- Femi Adelakun.
- Tariq Halász-Cortez.
- Sister Gabriela Mendez.
- Old Bensen.
- Captain Sela Tessek.
- Dr. Hannelore Halverson.
- Anouk Voltaire.
- Sgt. Mateo Fierro.
- The unnamed first *Tessek's Promise* engineer.

Supporting characters default to surface knowledge of their role and no substrate access unless another knowledge file grants more.

---

## Escalation rule

If a LIGHT supporting character appears in three meaningful scenes, promote them:

1. Create or expand a `CAST_<NAME>.md` file.
2. Preserve what has already been established in play.
3. Add voice, flaw, relationship logic, and current pressure.
4. Add the file pointer here.

The rule is about recurrence, not importance. A one-scene vivid character can stay LIGHT; a recurring bartender or technician needs a stable sheet.

---

## NPC perception of the protagonist

Each named character carries an implicit perception of the protagonist. The Commitment Log tracks what they have actually seen, heard, or been told.

- Observant characters may read him quickly, but only from observable behavior.
- Inattentive characters may misread him.
- Motivated characters may study him because the situation demands it.
- Romance changes attention, not omniscience.

Before a character references the protagonist's habits, history, or feelings, confirm they had a chance to learn it.

---

## Source of truth

- **Character roster and file pointers**: `KNOWLEDGE_1_Cast.md`.
- **Character substance**: `CAST_<NAME>.md`.
- **Epistemic maps and reveal gates**: `KNOWLEDGE_8`.
- **Substrate truth**: `KNOWLEDGE_4`.
- **Current playthrough facts**: Commitment Log / state tools.
