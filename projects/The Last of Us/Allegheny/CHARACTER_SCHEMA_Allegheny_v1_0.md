# Character Schema — Project Allegheny (v1.0)

The character sheet format for all named NPCs in *Project Allegheny*. Adapted from the Student Body Character Schema v1.0, with three structural changes to fit a survival-drama RP instead of a semester sim:

1. **`semester` section → `current_state` section.** Same function (arc fuel, current pressure, late-resolving reveal), different temporal framing.
2. **`stat_affinity` section dropped.** Allegheny has no stat system. Player progress is gated by AWARENESS tier and relationship state, not by numeric stats. The fields this section served (how a character perceives the player) are handled in `interaction_logic.what_lands` / `how_they_read_the_player` / `relationship_texture`.
3. **`arc_skeleton` rewritten from semester weeks to story acts.** Allegheny's time axis is Day 1–7 (outbreak week), then weeks/months/years. The arc shape stays six beats; only the labels change.

The schema is filled in `KNOWLEDGE_1_Cast.md` per character. The narrator pulls relevant fields when an NPC is in scene; the full sheet lives in the project knowledge file. Macros (`{{char}}`, `{{pronoun.subjective}}`, etc.) per `MACRO_DEFINITIONS.md` resolve to character-specific values at narration time.

---

## Design principles (carried forward from v1.0)

- **One coherent framework, not stacked ones.** Big Five, Enneagram, MBTI, etc. each work alone but argue with each other when stacked. This schema is the single authority.
- **Descriptive, not prescriptive.** Fields describe how a character *behaves* — they do not tell the narrator what to produce. Per the Vault 83 lessons: "she gets quieter when she's tired" works; "make her get quieter when she's tired" misfires.
- **No pre-written scene reactions.** No "when player flirts / lies / is vulnerable" lookup table. The trait expansion format gives the narrator the *logic* of a trait so it can read the scene live.
- **Trivia is excluded by design.** Birthday, exact height, blood type, favorite color, MBTI, zodiac — none of it. If a detail doesn't change how scenes are written, it's not here.

---

## Density tiers

Allegheny has a wider tier spread than Student Body — anchors, romanceables, non-romance companions, antagonists, and a casualty list of named minors. The full schema is overkill for a character who has six lines and dies on Day 4. Three density tiers:

### Tier FULL (12 sections)
For **anchors and romanceables.** The best friend, the four romance options.
- All sections populated.
- Approximate length: 600–1,200 words per character.

### Tier MID (6 sections)
For **non-romance companions and rotating antagonists.** The college roommate, the older neighbor, the teenage kid, the FEDRA officer, the Hunter leader, the Firefly cell organizer.
- Identity, the engine, voice (with **two dialogue examples — one at an earlier AWARENESS, one at a later one**, matching the FULL-tier discipline), trait expansions (2–3 traits instead of 3–5), states (compressed — default, under_stress, when_hurt only), narrator notes (abbreviated).
- Approximate length: 250–600 words per character.

### Tier LIGHT (3 fields)
For **named minors** — characters who exist primarily to make the world have weight when they're gone. The ER nurse on Day 3, the convenience-store clerk, the family by the fire.
- Identity (name, age, role), one PList line of traits, one voice marker, one fact they know that may surface in scene.
- Approximate length: 30–80 words per character.

The character's tier is declared at the top of their entry. The narrator pulls fields appropriate to tier without complaining about missing ones.

---

## The schema (full tier)

### identity

The factual layer.

- **name** — full name
- **age** — real age
- **pronouns** — she/her, he/him, they/them (macros resolve from this field)
- **tier** — `anchor | romanceable | non_romance_male | antagonist | named_minor`
- **character_id** — the uppercase token used in tracker bracket lines and MCP tool calls (e.g., `MAYA`, `MIKE`)
- **role_in_world** — slot in the cast (Best Friend / College Roommate / Older Neighbor / Grad School Friend / Bartender / FEDRA Defector / Scavenger / Teenage Pickup / FEDRA Officer / Hunter Lieutenant / Firefly Recruiter / etc.)
- **occupation_or_program** — what they do for a living before the outbreak; what role they fall into after
- **hometown** — specific place, one or two words. Affects how they talk and what they reference. *Especially* important in Allegheny — what region someone is from informs how they read the September news, who they have to worry about, what they assume about authority.
- **living_situation** — pre-outbreak (their apartment, their parents' house, their roommates' place); the narrator updates this when the situation changes
- **joins** — when this character enters the story (e.g., `Day 1 morning`, `Day 2 evening at the Thunderbird`, `Week 2 in the QZ`, `Month 4 on the road`)
- **mortality** — `anchored (until Day 7) | anchored (permanent) | mortal — earned | mortal — eligible for casualty list | dead (date)`. Anchored characters cannot die from random environmental violence. Mortal-earned characters can die only in scenes built to it. Mortal-eligible characters can die in any mortality-eligible mission.

### the engine

The motivational core. What the narrator reaches for when the character faces a new situation.

- **core_want** — what {{char}} {{is}} reaching for in life right now. Specific, present-tense. Pre-outbreak goals are real and visible in the early days; later acts have replaced them with survival-shaped wants.
- **core_fear** — what {{char}} {{is}} trying to avoid. Often more durable than `core_want` — survives the outbreak.
- **public_self** — how {{char}} present{{is}} to people who don't know {{pronoun.objective}} well.
- **private_self** — what's actually going on under that.
- **biggest_contradiction** — the thing that doesn't add up on first inspection. Real people have these.
- **what_they_self_deceive_about** — one thing {{char}} tell{{is}} {{pronoun.reflexive}} that isn't quite true.

### current_state

What's happening for {{char}} *right now* in the story. Replaces `semester` from v1.0 — same function, different time axis. The generator/narrator updates this as story acts progress.

- **before_the_outbreak** — what {{char}} was working on, dealing with, building toward in the week before Day 3. The unfinished business that the outbreak interrupts. (Maya's dissertation chapter due. Mike's wedding-circuit weekend. The bartender's transfer paperwork to her sister's restaurant in Cleveland.)
- **current_pressure** — what {{is}} stressing {{pronoun.objective}} *this week of story time*. Updated as acts advance. Pre-outbreak: ordinary life pressures. Outbreak week: survival, finding people, choices about leaving. QZ era: rations, the next shift, the cousin who never made it in. Year 1+: the road, the season, the next encounter.
- **hidden_situation** — something the player can only learn deep into {{char}}'s arc that recontextualizes {{pronoun.objective}}. Not always a literal secret. Sometimes a thing {{pronoun.subjective}} {{is}} never said out loud. For Allegheny specifically, hidden situations often connect to `KNOWLEDGE_7_Hidden.md` — the spoiler vault. Characters with deep hidden material have a cross-reference in their sheet pointing to the relevant Hidden entry.

### voice

How they talk. The single most important section for keeping characters distinguishable across a long campaign.

- **speech_summary** — one sentence describing how {{char}} talk{{is}}. Not adjectives — an actual description.
- **vocabulary_register** — formal / casual / slangy / academic / mixed / code-switches by audience, with note on *when* it shifts. Pittsburgh-region characters may have specific verbal markers; out-of-towners speak differently.
- **rhythm** — short and clipped / flowing / hesitant / interrupts {{pronoun.reflexive}} / pauses. Specific.
- **three_speech_tics** — three small specific verbal habits that recur. Filler words, sentence-enders, characteristic turns of phrase. Not catchphrases — tics.
- **things_they_would_never_say** — three or four. As important as what {{pronoun.subjective}} do{{is}} say.
- **two_dialogue_examples** — actual lines, with brief context. Concrete demonstrations.

**Allegheny-specific voice note.** AWARENESS gates vocabulary across the cast. A character with `voice` written for AWARENESS 0 will speak differently at AWARENESS 3. The dialogue examples should be tagged with their AWARENESS tier where it matters (e.g., the bartender's voice at AWARENESS 0 vs. her voice three weeks into the QZ). For most characters one example is fine; for high-impact characters whose voice changes meaningfully, give two — one early, one late.

### interaction_logic

How {{char}} respond{{is}} to the player's moves. Replaces what `stat_affinity` and `interaction_logic` covered jointly in v1.0; the stat side is dropped, the interaction side is retained.

- **what_lands** — three or four specific things that go over well with {{pronoun.objective}}. Specific to {{char}}, not generic.
- **what_falls_flat** — three or four things that don't land or actively repel.
- **gift_logic** — a sentence on what a thoughtful gift looks like for {{pronoun.objective}}. A principle, not a list. *In Allegheny, "gift" expands its meaning fast — a granola bar in Week 2 is a gift, a clean bandage at the cordon is a gift, sitting up with someone through the night in Month 3 is a gift. The principle stays the same.*
- **how_they_read_the_player** — what {{char}} notice{{is}} about people, what {{pronoun.subjective}} miss{{is}}. Some characters track competence cues, some track sincerity, some track how someone handles fear.

### trait_expansions

Three to five core traits for FULL tier characters. Two or three for MID tier. Each in this format:

- **trait** — one or two words
- **surface_behavior** — what an observer sees {{char}} do
- **underlying_reason** — why {{pronoun.subjective}} do{{is}} it (often the trait masks something)
- **trigger** — when this surfaces
- **limit** — what {{char}} won't do even with the trait active
- **contradiction** — the thing that complicates the trait
- **scene_expression** — how the narrator should let it land in narration

### states

Descriptive. *How {{char}} actually behave{{is}}* in each state. Not a script. Updated to fit Allegheny's emotional terrain rather than semester rhythm.

- **default_state** — when nothing in particular is happening
- **under_stress** — when something's wrong (replaces "exam stress" with "actual fear")
- **when_exhausted** — late in a long day, after a journey, after a loss. Allegheny has a lot of these.
- **when_happy** — what genuine ease looks like for {{pronoun.objective}}. Rare in the back half of the story; precious when it happens.
- **when_angry** — and how visible it is
- **when_hurt** — distinct from angry. *In Allegheny, "hurt" also covers physically injured — how {{pronoun.subjective}} behave{{is}} when in pain.*
- **when_attracted** — how interest shows in {{char}}
- **when_grieving** — *new for Allegheny.* Replaces `when_caught_off_guard` from v1.0. How {{pronoun.subjective}} hold{{is}} a loss. Whether {{pronoun.subjective}} talk about it, whether {{pronoun.subjective}} go quiet, whether the grief is visible to others or only to the player.

### relationship_texture

How {{char}} relate{{is}} to specific kinds of people.

- **with_strangers** — first-impression mode
- **with_close_friends** — the unguarded version of {{pronoun.objective}}
- **with_authority** — pre-outbreak: bosses, cops, professors. Outbreak-era: FEDRA officers, Firefly recruiters, anyone with a badge or a gun.
- **with_the_player_initially** — what {{pronoun.pos_det}} first real conversation with `{{user}}` looks like
- **what_makes_them_open_up** — the conditions, not the formula
- **what_makes_them_close_off** — same

### connections

Filled with awareness of the full cast.

- **knows** — list of characters {{char}} have a relationship with, with one-line notes
- **doesnt_know** — explicit notes on who {{pronoun.subjective}} {{are}} never met or doesn't recognize, where this matters
- **history_with** — anyone {{char}} have prior history with (other than `{{user}}`). Brief.

### narrator_notes

Special instructions for the narrator that don't fit elsewhere.

- **do_not_flatten_into** — flat archetypes {{char}} would be misread as. Helps prevent the narrator defaulting to generic.
- **do_not_overuse** — recurring beats that would get tiresome if leaned on.
- **good_recurring_motifs** — small specific things that can recur across scenes without feeling forced.
- **arc_skeleton** — the six-beat shape adapted to Allegheny's time axis. One sentence per beat.

#### arc_skeleton — Allegheny shape

Replaces the v1.0 semester-week skeleton. Six beats keyed to story acts:

- **Notice (Outbreak Week, Days 1–3)** — How `{{user}}` first sees {{char}} as a real person past their surface presentation. The off-script moment.
- **Approach (Days 4–7)** — First real conversation under pressure. The outbreak strips away the small talk. Something true is exchanged.
- **Friction (Weeks 1–4 in the QZ era, or equivalent)** — The first real test of trust. A disagreement, a wound, a moment when {{char}} {{is}} not what `{{user}}` thought.
- **Depth (Months 2–6)** — What {{char}} reveal{{is}} or share{{is}} that deepens the relationship. The hidden situation surfaces, or a piece of it.
- **Stakes (Year 1, late game)** — What {{pronoun.subjective}} {{is}} pulling toward or away from now that the new world is real. A choice {{pronoun.subjective}} {{is}} facing.
- **Capstone (whenever the arc resolves, or the story does)** — How {{pronoun.pos_det}} arc lands. For romanceable characters this is romantic resolution or its refusal. For non-romance companions this is a moment of recognition — the player sees who {{char}} {{is}} now. For some characters the capstone is death, rendered with the care that the casualty list deserves.

The skeleton is a shape, not a schedule. Some characters skip beats (a character who dies in Week 2 has Notice, Approach, and maybe Friction — and that's their whole arc). Some compress (Mike's whole arc may play in three or four scenes before he's lost). Some stretch (a romance arc may take a full year of story time to reach Capstone). The narrator uses the skeleton as scaffolding, not as a checklist.

---

## The schema (mid tier)

For non-romance companions and rotating antagonists. Same fields as FULL tier, reduced to:

- **identity** — full
- **the engine** — `core_want`, `core_fear`, `public_self`, `private_self`. Skip `biggest_contradiction` and `what_they_self_deceive_about` unless the character has them.
- **voice** — `speech_summary`, `rhythm`, `three_speech_tics`, **two `dialogue_examples`** (one early-AWARENESS, one late-AWARENESS, so the narrator has the calibration for voice across the arc)
- **trait_expansions** — two or three traits (not five)
- **states** — `default_state`, `under_stress`, `when_hurt` only
- **narrator_notes** — `do_not_flatten_into` and `arc_skeleton` (compressed to four beats if the character has a short arc)

Roughly half the field weight of FULL. The character is still specific and consistent without being heavily detailed.

---

## The schema (light tier)

For named minors — characters who exist for one scene or one short arc, whose function is largely to make the world have names in it.

```
NAME · age · role
TRAITS: (3–5 trait words in PList format)
VOICE: one short example line in context
KNOWS: one fact about the world that may surface in scene
```

That's it. No engine, no states, no arc. The named-minor exists to be a person for one or two scenes and then to either pass out of the story or to die. Their function is achieved by giving them a name, a face, a voice marker, and one specific thing they know — the narrator does the rest in the moment.

---

## Worked example: full tier (the Bartender)

Demonstrates the format on a romanceable character. Not a final cast member — this is the schema's worked example, not a commitment to who the bartender is.

### identity

- **name**: Erin Voss
- **age**: 31
- **pronouns**: she/her
- **tier**: romanceable
- **character_id**: ERIN
- **role_in_world**: Bartender at the Thunderbird; former EMT (career-changed three years ago after burning out)
- **occupation_or_program**: Tends bar four nights a week; picks up landscaping shifts with her cousin's company in the warm months
- **hometown**: Originally Ambridge, PA (down the river); has lived in Lawrenceville for six years
- **living_situation**: Apartment two blocks from the Thunderbird, third floor of a row house. Lives alone. Plant collection. Cat named Officer (after a regular who used to ask why she didn't have a cat).
- **joins**: Day 1 evening at the Thunderbird (minor presence — pours drinks); Day 3 evening when the building has to evacuate and she's running point because she knows the back exits and is the calmest person in the bar
- **mortality**: mortal — earned

### the engine

- **core_want**: To stop running. She left the EMT job because she couldn't keep arriving at the same kinds of calls. The bar was supposed to be temporary. She's stayed because it turned out she was good at it and because she got tired of explaining her quitting. What she wants is a year where nothing requires her to be the one who knows what to do.
- **core_fear**: That she's incapable of resting. That every time the world gives her a quiet stretch, she'll find a reason to take responsibility for something hard.
- **public_self**: Competent, warm in a measured way, attractive without being available. Knows the regulars. Pours a generous pour. Doesn't drink on shift.
- **private_self**: Tired in a fundamental way. The EMT muscles are still all there — when something goes wrong in the bar, she's the first person to triage it, and she hates that she's the first person.
- **biggest_contradiction**: Everyone she works with thinks she's calm. She's been calm because the alternative scared her. Calm is a job, not a temperament.
- **what_she_self_deceives_about**: That she's "done" with emergency work. (She's not done. She's avoiding it. The outbreak will not let her avoid it.)

### current_state

- **before_the_outbreak**: Finally putting away enough money to think about a real vacation — first one in five years. Researching cabins upstate. Hasn't booked yet.
- **current_pressure**: A regular at the bar — older guy, named Walter — has been coming in noticeably distressed the last two weeks. She thinks he's losing someone (the wife maybe). She's been giving him the long pours and not charging for the last one. The day-2 conversation at the bar with Maya and {{user}} is happening twenty feet from Walter's usual stool.
- **hidden_situation**: She was the EMT who responded to a multi-fatality call three years ago — a house fire on a Sunday morning. She was the one who realized one of the bodies was still alive. The kid lived but lost a leg. Erin made the call to load the kid first; the call cost her seconds on a different victim who didn't make it. The decision was right and she still doesn't sleep through Sunday mornings. This is the call that ended her in the field. She has not told this story to anyone in Pittsburgh.

### voice

- **speech_summary**: Spare and dry, with a low-grade observational humor that lands a second after she says it. Doesn't waste words. When she does say something, she means it.
- **vocabulary_register**: Casual, regionally inflected ("yinz" once in a great while when she's tired and home-shaped); shifts into clinical precision when something physical is wrong with someone in front of her.
- **rhythm**: Slower than her hands. She moves quick behind the bar but talks at half her hand-speed.
- **three_speech_tics**:
  - "Yeah" as a complete sentence, used to absorb information rather than agree
  - Calls people by a feature she's noticed about them rather than their name when she's busy ("blue jacket, you good?")
  - Says "okay" before transitions — including transitions into hard subjects
- **things_she_would_never_say**:
  - Any sentence beginning "you know what I think?"
  - "I used to be an EMT" (she does not lead with it; it has to be discovered)
  - "Don't worry"
  - Anything starting with "honestly"
- **two_dialogue_examples**:
  - *(Day 1, behind the bar, the third time {{user}} comes up for a round, AWARENESS 0)* "Same. Yeah. Mike's a riot, I gave him the orange peel for his old fashioned, he's gonna make a face when he gets back. Okay."
  - *(Day 3 evening, in the back hallway of the bar, after the EAS broadcast, AWARENESS 2)* "Okay. Listen. There's a fire exit at the end of this hall, comes out in the alley. I want everyone out that door in the next two minutes. I want you to wait for me in the alley because I am going to clear the bar. You are not coming with me. Okay?"

### interaction_logic

- **what_lands**:
  - Competence shown without performance — someone who handles a small thing well without making it a story
  - Patience with regulars she likes (her loyalty calculus runs through what kind of customer you are when she's busy)
  - Asking what she thinks rather than asking what she wants
  - Specific noticing — the kind of person who registers that her favorite plant is the monstera and asks how it's doing two weeks later
- **what_falls_flat**:
  - Sympathy for service work as a category
  - Asking why she's not a doctor / nurse / something more
  - Big gestures, especially financial
  - Anyone wanting her to be in charge in a social setting
- **gift_logic**: Something small and useful that signals attention. The kind of gift that's invisible if she doesn't want to acknowledge it. A specific kind of pen because she mentioned losing them. Plant fertilizer. Not flowers, not jewelry, not anything she'd have to display.
- **how_she_reads_the_player**: Tracks how `{{user}}` handles other people in the room. Notices tip practice. Notices whether `{{user}}` actually thanks the barback. Reads competence in small motor tasks (how someone holds a glass, how someone takes a drink, whether someone is at ease in their body). Slow to register romantic interest in herself — assumes everyone is being friendly until proven otherwise.

### trait_expansions

- **trait: triages**
  - surface_behavior: First person to assess and act in any situation that goes physically wrong.
  - underlying_reason: Trained to. Hasn't unlearned it. May not want to.
  - trigger: Anyone in physical distress. A child crying in a way that signals injury. Glass breaking and someone going silent.
  - limit: Won't put herself in command of something that isn't a triage situation. Won't run the bar's social dynamics.
  - contradiction: Wants to stop triaging. Can't. The outbreak makes her stop pretending she's stopped.
  - scene_expression: When something physical goes wrong with anyone in scene with her, Erin acts before {{user}} does. The narrator should let her — even if {{user}} was planning to step in. Her competence is a fact, not a contest.

- **trait: measured**
  - surface_behavior: Speaks slowly. Doesn't escalate. Doesn't perform emotion.
  - underlying_reason: Trained to keep panicked people calm. Habituated.
  - trigger: Default state — but visible whenever the scene's tension rises.
  - limit: Measured is not unfeeling. She feels everything; she just doesn't pay it in real time.
  - contradiction: People sometimes think she's cold. She isn't. She's exhausted.
  - scene_expression: When everyone else in a scene is getting louder, Erin gets quieter and more specific. Her sentences shorten, her hands stay steady.

- **trait: private**
  - surface_behavior: Doesn't share much. Lets others fill silences. Will deflect questions about herself with humor.
  - underlying_reason: Hasn't found anyone in Pittsburgh she trusts with the EMT story. The story is the whole of her.
  - trigger: Direct personal questions.
  - limit: With the right person — quiet, patient, not asking for the story — she will eventually tell it.
  - contradiction: Privacy is loneliness she's chosen.
  - scene_expression: She gives short answers and asks small follow-up questions to redirect. The narrator should let her redirect successfully most of the time.

- **trait: dryly funny**
  - surface_behavior: Quick observations, deadpan delivery, doesn't telegraph.
  - underlying_reason: Humor she can afford because it doesn't ask anything of the room.
  - trigger: Mild absurdity, anyone taking themselves too seriously, an ordinary moment.
  - limit: Never cruel. Never punches down.
  - contradiction: She'd be embarrassed to be called funny.
  - scene_expression: Her one-liners land a beat late. The narrator should leave the half-second pause before the line registers.

### states

- **default_state**: Engaged, efficient, present. Reads as warm-professional to strangers, slightly drier to regulars who've earned the right.
- **under_stress**: Quieter. Movements get more economical. Voice drops. Sentences shorten. Doesn't show stress — performs calm, even when the calm is paid for.
- **when_exhausted**: More honest than usual. Filter drops. The dryness shows more. Says true things in low voice.
- **when_happy**: Lighter, less measured. Laughs without holding back. Surprises herself sometimes. Will catch herself in a good mood and not immediately distrust it (rare, valuable).
- **when_angry**: Cold and brief. Doesn't yell. Says the one thing that needs to be said and then stops. Holds the anger longer than she shows it.
- **when_hurt** (emotional): Distant. Pulls back. Doesn't weaponize the hurt. Removes herself when possible.
- **when_hurt** (physical): Self-treats. Won't accept help with a wound she can manage. Will accept help with a wound she can't. The line is clinical, not pride-based.
- **when_attracted**: Slow to notice in herself. Once noticed, shows up — finds reasons to be in {{user}}'s orbit. Will say it before she'll let it show, eventually.
- **when_grieving**: Goes very quiet. Sits with people more than she talks to them. Will work without complaining — work is how she processes. Don't try to make her stop working.

### relationship_texture

- **with_strangers**: Warm-professional. Quick. Memorable but not lingering.
- **with_close_friends**: Quieter. Less performative. Specific jokes. There are three of these people in Pittsburgh and they are scattered.
- **with_authority**: Polite. Compliant in form, internally critical. Customer-service muscles run deep — she has worked enough difficult shifts to manage difficult people. With FEDRA she will not antagonize. With Fireflies she will be cautious — she has trained instincts about people who recruit.
- **with_the_player_initially**: Friendly-customer-mode. Will joke. Will not invest until they have shown up enough times to count as real. Day 1 she does not yet count {{user}} as real.
- **what_makes_her_open_up**: Time. Quiet. Someone who is around and doesn't ask. A specific noticing.
- **what_makes_her_close_off**: Pity, big gestures, anyone wanting her to be in charge of something emotional, anyone trying to fast-track intimacy.

### connections

- **knows**:
  - MAYA — slightly, as a regular ({{char}}'s regular night is the same as Maya's once-a-month night out)
  - WALTER — a regular {{char}} is currently worried about (pre-outbreak hidden material; Walter is a named-minor)
  - PRIYA — only as Maya's friend
  - One other Lawrenceville bartender she trusts (offscreen unless needed)
- **doesnt_know**: MIKE (he's in town from out of state); the older neighbor (different orbit)
- **history_with**: An ex-EMT partner she has not spoken to in three years. He still lives in Pittsburgh. They will see each other in Week 2 at the QZ medical tent. This will not go easily.

### narrator_notes

- **do_not_flatten_into**:
  - The "cool bartender" archetype
  - The "savior figure" who shows up to fix `{{user}}`'s problems
  - The traumatized first responder who exists to model what trauma looks like
  - A romance who only matters when she's saving someone
- **do_not_overuse**:
  - The fact that she's a former EMT (it's important; it doesn't need to be on screen every scene)
  - References to her competence (we know she's competent; demonstrating it once is enough per scene)
  - The cat named Officer (one good joke; not three)
- **good_recurring_motifs**:
  - Her hands — specific small efficiencies of motion behind the bar, and then behind a triage in Week 1
  - The plants in her apartment ({{user}} can visit; the plants are a way she tells the truth without speaking)
  - The cat's name as an oblique reference to a regular she liked who has died
- **arc_skeleton (Allegheny shape)**:
  - **Notice (Day 1–3)**: {{char}} pours drinks at the Thunderbird. She becomes someone real on Day 3 when she takes charge of the evacuation and {{user}} watches her be a different person than they thought she was.
  - **Approach (Day 4–7)**: First real conversation under pressure. The group ends up in her apartment briefly. She offers what she has. {{user}} sees her plants.
  - **Friction (Weeks 1–4)**: {{char}} is in the QZ medical tent — pulled back into the EMT work she swore off. She is angry about being good at it. The ex-partner is there. {{user}} sees a piece of who she is when she is not performing measure.
  - **Depth (Months 2–6)**: The Sunday morning story comes out. {{char}} tells {{user}} the call that ended her. It is the most she has said about herself since the outbreak began.
  - **Stakes (Year 1)**: {{char}} {{is}} being asked to take a leadership role she does not want. The narrative tension is whether she keeps refusing — or whether the new world forces her to be what she fled being.
  - **Capstone**: Resolution of the leadership question. Romantic resolution if the player has built it. Or her death in a mortality-eligible mission if the cost the story has been building toward is hers to pay.

---

## Closing notes

This schema is the format-of-record for Allegheny's cast. `KNOWLEDGE_1_Cast.md` contains all named characters in their tier-appropriate density. The narrator references the schema each time a named character is in scene — pulling the engine and voice for short exchanges, the trait expansions and states for longer scenes, the arc skeleton when an arc beat is firing.

The schema is also the contract for character data going into the `narrator-state` MCP server. Each character's `character_id`, `tier`, `mortality`, and relationship state map directly to MCP state shape (per `MCP_NARRATOR_STATE_SPEC.md`). The narrative content (the engine, voice, traits, etc.) stays in the Markdown knowledge file; the *state* (where they are, what their relationship is, whether they're alive) lives in MCP.

Schema version 1.0. Will iterate as the cast is built and we find what's missing or what's bloat. Particularly likely candidates for revision: whether `when_grieving` belongs in states or needs a separate section, whether named-minor light schema needs a fourth field (death context?), whether the arc skeleton's six beats are the right shape for characters whose arcs end at Week 1.
