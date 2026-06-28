# KNOWLEDGE_1_Cast — Project Allegheny

The cast index. Each named character in *Project Allegheny* lives in their own `CAST_<NAME>.md` file. This file is the dispatcher: it documents the macro system, the cast tiers, the rotation and threshold disciplines, NPC perception of `{{user}}`, and a one-line summary per character with a file pointer.

This file is RAG-retrieved on tier-level queries, character-roster queries, and on any retrieval where the system needs to know who exists. **For per-character data — engine, voice, traits, states, narrator notes — the narrator retrieves the relevant `CAST_<NAME>.md` file directly when that character is in scene.** Cross-references: macros per `MACRO_DEFINITIONS.md`; the schema for what a character sheet contains is `CHARACTER_SCHEMA_Allegheny_v1_0.md`; per-character state lives in `narrator-state` MCP per `MCP_NARRATOR_STATE_SPEC.md`.

---

## Macro resolution

The cast files use pronoun macros per `MACRO_DEFINITIONS.md`. When the narrator generates prose or character data, macros are resolved against the specific character — never output verbatim. Quick reference:

- `{{char}}` → character's full name (or first name in established context)
- `{{pronoun.subjective}}` → she / he / they
- `{{pronoun.objective}}` → her / him / them
- `{{pronoun.pos_det}}` → her / his / their (before a noun: "her bag")
- `{{pronoun.pos_pro}}` → hers / his / theirs (standalone: "the choice was hers")
- `{{pronoun.reflexive}}` → herself / himself / themself
- `{{is}}` / `{{are}}` → is / are (verb agreement)

Verb agreement beyond `{{is}}` is silently fixed if a template construction would produce ungrammatical English. `{{user}}` resolves to the persona name from `KNOWLEDGE_USER_*.md`.

---

## Cast tiers — overview

- **TIER A — ANCHORS** (2): `{{user}}` (in persona file) and the best friend. Plot armor through Day 7; the best friend is mortal-earned after Week 2; `{{user}}` is mortal only on explicit player commitment.
- **TIER B — ROMANCEABLE** (4): One grad school friend, the bartender, one FEDRA defector, one scavenger met on the road. Each enters at a different story beat.
- **TIER C — NON-ROMANCE MALE COMPANIONS** (3): The college roommate, the older neighbor, the teenage pickup. All mortal under earned-death rules. The roommate is a likely first loss; the story is better for it.
- **TIER D — ANTAGONISTS** (3 rotating): A FEDRA officer (faces the cordon), a Hunter lieutenant (Pittsburgh post-collapse), a Firefly recruiter (Week 3+ pitch). Rotating because they're act-specific; each one is the face of their era's conflict.
- **TIER E — NAMED MINORS** (8): The casualty list. Characters who exist primarily to make the world have weight when they're gone.

---

## Cast roster — one-line summaries with file pointers

When the narrator needs a character's full sheet, retrieve the named file. The index gives the pointer; the file gives the substance.

### TIER A — Anchors

| character_id | name | tier | joins | mortality | file |
|---|---|---|---|---|---|
| PLAYER | `{{user}}` | anchor | Day 1 (always present) | anchored (until explicit player commit) | `KNOWLEDGE_USER_<name>.md` (persona) |
| MAYA | Maya Chen (default) | anchor | Day 1 morning | anchored through Day 7; mortal-earned thereafter | `CAST_MAYA.md` |

Maya is `{{user}}`'s closest friend of eight years. Postdoctoral researcher in urban sociology at Pitt, originally from suburban Detroit, default name Maya Chen but overridable by the player. Cat named Periodical, third-floor walkup in Lawrenceville. **Default age 30.**

### TIER B — Romanceable

| character_id | name | tier | joins | mortality | file |
|---|---|---|---|---|---|
| PRIYA | Priya Krishnamurthy, 28 | romanceable | Day 1 evening | mortal-earned | `CAST_PRIYA.md` |
| ERIN | Erin Voss, 31 | romanceable | Day 1 evening (bar) / Day 3 evening (becomes critical) | mortal-earned | `CAST_ERIN.md` |
| RAY | Rachael "Ray" Cordero, 33 | romanceable | Day 6 (in uniform) / defects Week 4 or Month 2 | mortal-earned | `CAST_RAY.md` |
| NOAH | Noah Tahir, 35 | romanceable | Month 4-6 on the road (conditional) | mortal-earned | `CAST_NOAH.md` |

Priya is Maya's grad-school friend, Atlanta-rooted, doctoral student in urban sociology at Pitt; performance-fatigue, complicated dad situation, owns the Subaru. **Erin's full sheet is the schema worked example in `CHARACTER_SCHEMA_Allegheny_v1_0.md`** — she is a Lawrenceville bartender at the Thunderbird and former EMT, plants and a cat named Officer in her apartment. Ray is FEDRA enlisted, Beaver County PA native, ex-paramedic, carries a notebook documenting things she should not be documenting. Noah is a Lebanese-American Cleveland Heights science teacher and widower, encountered alone on the road in Month 4-6; he will not stay unless the player invests.

### TIER C — Non-romance male companions

| character_id | name | tier | joins | mortality | file |
|---|---|---|---|---|---|
| MIKE | Mike Brennan, 32 | non_romance_male | Day 1 evening at dinner | mortal-earned (first major casualty candidate) | `CAST_MIKE.md` |
| VICTOR | Victor Schweitzer, 61 | non_romance_male | Day 1 mention; Day 4 active | mortal-earned | `CAST_VICTOR.md` |
| SAM | Samuel "Sam" Mendez, 16 | non_romance_male | Week 2-3 (the group picks him up) | mortal-earned (rarely chosen) | `CAST_SAM.md` |

Mike is `{{user}}`'s college roommate, Cincinnati-based medical-device sales rep, loud and lonely, in Pittsburgh for a Sunday wedding that will never happen — the most likely first major loss in the campaign. Victor is Maya's older neighbor, retired structural engineer, widowed fourteen months ago, quietly ex-Marine, the strategic conscience of the group; his garage contains a duffel he packed in 1972. Sam is a sixteen-year-old from McKees Rocks who lost his older sister Marisol on Day 3 and is looking for her; not a child, not a peer.

### TIER D — Antagonists

| character_id | name | tier | joins | mortality | file |
|---|---|---|---|---|---|
| DRAKE | Lieutenant Andrew Drake, 42 | antagonist | Day 6 cordon | mortal-earned (as antagonist) | `CAST_DRAKE.md` |
| LEN | Lenny "Len" Pasternak, 38 | antagonist | Month 4+ (post-collapse Pittsburgh) | mortal-earned | `CAST_LEN.md` |
| CASEY | Casey Adler, 29, they/them | antagonist (soft) | Week 3 QZ era | mortal-earned | `CAST_CASEY.md` |

Drake is the FEDRA officer at the cordon and recurring QZ-enforcement face, by-the-book and exhausted. Len is a Hunter lieutenant in post-collapse Pittsburgh, frightening because of the friendliness. Casey is a Firefly cell organizer, persuasive and credible, soft-antagonist because their alignment with the player depends on choices.

### TIER E — Named minors (the casualty list)

All eight named minors share a single file: `CAST_NAMED_MINORS.md`. They are LIGHT-tier (name, age, role, three traits, one voice marker, one fact). The list:

- **WALTER** · 67 · regular at the Thunderbird (dies Day 3 evening, heart attack, alone in the bar bathroom)
- **ARLEN** · 44 · ER nurse at UPMC Presbyterian (dies Day 4 at UPMC)
- **TINA** · 19 · convenience store clerk on Penn Avenue
- **MR. AND MRS. SUMMERS** · 71 and 68 · couple by a fire in the woods (one night, location flexible)
- **THE WALKER FAMILY** · 4 people (Rob, Linny, Ben, Charlie) · the family at a gas station heading to Indiana
- **CARLOS** · 26 · a stranger in the QZ, bilingual, generous
- **MARTHA** · 50s · an ex-EMT partner of Erin's (in the QZ medical tent, lives in default)
- **DR. PAXTON** · 50s · a CDC field officer (encountered or not, carries a notebook tied to `KNOWLEDGE_7_Hidden.md`)

---

## Active rotation discipline

Although the cast lists seventeen named characters, the practical rule for any single scene is **5–8 named NPCs in active rotation** at a time. Research consensus from long-form RP design: beyond that, characters begin to contaminate each other — voices blur, distinguishing traits collapse, dialogue starts to sound generic.

In Allegheny this rule is enforced by the *story shape*, not by a hard cap:

- The **Outbreak Week (Days 1–7)** has the heaviest active rotation: the two anchors plus 3–5 secondary characters depending on the player's path. Mike, Priya, and Victor are all candidates for Day 1–5 presence. Erin enters in earnest on Day 3.
- **Tier D antagonists are act-gated.** Drake belongs to Days 6–7 and Week 2–3. Len belongs to Month 4+. Casey belongs to Week 3+. They do not overlap in active rotation; each is the face of their era's pressure.
- **Tier E named minors** are mostly one-scene presences. They enter, do their work, and exit (or die). They are not part of active rotation — they are texture.
- **The group that forms post-evacuation** stabilizes around 4–6 named characters (the two anchors, plus whichever romanceable companions and non-romance males have survived and chosen to travel together). Other characters appear in waves around them.

The narrator does not need to track this consciously turn-by-turn; the story shape enforces it. But when a scene is being composed and the narrator notices six named NPCs are about to be on screen at once, that is a signal — split the scene, give some characters offscreen tasks, or let one or two of them be silent presences rather than active participants.

---

## Named-minor threshold rule

When the narrator generates an *unnamed* minor character during play — a stranger at a checkpoint, a person in the QZ ration line, a shopkeeper — no file entry is needed on first appearance. The narrator tracks them mentally. **On their third meaningful appearance**, the narrator escalates them: writes a LIGHT-tier entry into `CAST_NAMED_MINORS.md` (or commits them via MCP `update_character`) capturing what's been established about them so far.

The threshold (3 appearances) is the heuristic — if a character clearly matters earlier, the narrator can escalate sooner. The reverse also holds: a named character who appears once and never returns does not need promotion. The rule is about *recurrence*, not about scene importance.

From that point forward the narrator references the LIGHT entry when the character returns, and updates it as new traits surface. This is what lets a background character — a regular at a checkpoint, a fellow scavenger in a market — gradually become a real person with consistent voice and recurring details, without forcing the narrator to commit a full sheet on first sight.

A character may further escalate from LIGHT to MID tier if their role in the story grows. This is rare. Most LIGHT entries stay LIGHT.

---

## NPC perception of `{{user}}`

Each named character carries an implicit *perception* of `{{user}}` — what they have observed about him, what they remember, what they've decided to think. The MCP `narrator-state` server tracks this in each character's `perception_of_player` field (per `MCP_NARRATOR_STATE_SPEC.md`), with the narrator updating via `update_perception` when a meaningful observation has been made. Concrete examples:

- An **observant** character (Maya, Erin, Noah) reads `{{user}}` quickly. After two scenes, they know things about his physical habits, his tells, his moods. The narrator should let this show — Maya names what `{{user}}` is feeling before he names it himself.
- An **inattentive** character (Mike, sometimes Sam) reads `{{user}}` slowly or wrongly. They may compliment a thing `{{user}}` is actually embarrassed about, miss a tell, misread a silence as agreement.
- A **motivated** character (Ray, while she's still in uniform; Casey while recruiting) reads `{{user}}` carefully because they have to. The narrator should render this without commentary — Ray's attention is professional.
- Physical observations (eye color, build, what `{{user}}` is wearing today) load once on first meeting; behavioral observations (he goes quiet when his family is mentioned, he doesn't drink the first round) accumulate.

When a perceptive character speaks to `{{user}}`, the narrator may render their language using observations the character has actually had time to make. *"Your eyes are bluer when you haven't slept"* from Maya, after a long week, is richer than the same line from a stranger. The narrator does not over-deploy this — once or twice across an arc per character — but it is one of the textures that distinguishes a real cast from a generic one.

---

## The cast-pull discipline

**Always retrieve the relevant `CAST_<NAME>.md` file before composing a scene involving a named character.** This index gives the one-line summary and the file pointer; the file gives the substance — the engine, the voice, the dialogue examples, the traits, the states, the relationship texture, the connections, the narrator notes, the arc skeleton.

A scene composed from index alone produces a flat character. The retrieval is one tool call and it is worth it. Multiple characters in scene means multiple retrievals — that's fine; the alternative is voice contamination and dialogue blur.

If the player names a character the narrator has not pulled this session, retrieve before responding. If the player references a relationship between two characters, retrieve both files so the connection logic is accurate.

The named-minors file is small and should be pulled when *any* named-minor surfaces in scene.

---

## Source of truth

Character data lives in the per-character `CAST_<NAME>.md` files. The schema for what a character sheet contains lives in `CHARACTER_SCHEMA_Allegheny_v1_0.md`. Character *state* (alive/dead, relationship to player, current presence, observed history) lives in `narrator-state` MCP per `MCP_NARRATOR_STATE_SPEC.md`. The three together are the source of truth.
