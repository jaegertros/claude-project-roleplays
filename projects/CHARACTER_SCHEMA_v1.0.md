# Character Schema v1.0

The character sheet format used for all named NPCs in the project — romanceable cast, recurring non-romance NPCs, and any flavor characters who get more than a sentence of attention. Filled by the world generator at run start, then referenced by the narrator on every turn an NPC is in scene.

Designed to give the LLM enough texture to write a specific, consistent person without giving it a typology to default into. Every field exists because it answers a question the LLM will otherwise answer badly: *who is this person, what do they want, how do they talk, what do they do under pressure, and what will surprise the player to learn.*

---

## Design notes (not part of the schema itself)

**Why this schema cuts most personality frameworks.** Big Five, Enneagram, MBTI, Fate aspects, Cortex distinctions, D&D anchors — each is fine alone, but stacking them produces a character whose pieces argue with each other. The LLM averages across frameworks or contradicts itself between scenes. One coherent custom framework beats six half-applied ones.

**Why no `scene_response_model` table.** Pre-written reactions to "when user flirts / lies / is vulnerable" turn the LLM into a lookup function instead of a scene-reader. The trait expansion format below does the same job better — it gives the LLM the *logic* of a trait instead of a script.

**Why the framing is descriptive, not prescriptive.** Per the Vault 83 lessons: instructions describing how a character behaves ("she gets quieter when she's tired") work. Instructions telling the narrator to produce a behavior ("make her get quieter when she's tired") read as directives that the LLM will over-execute. Every field below describes the character; none of them tells the narrator what to do.

**What's left out on purpose.** Birthday, exact height, blood type, favorite color, MBTI, zodiac sign — all the trivia that fills bad character sheets. If a detail doesn't change how scenes are written, it's not here. Specifics emerge through play.

---

## The schema

### identity

The factual layer.

- **name** — full name
- **age** — real age
- **pronouns** — she/her for v1 romance cast; he/him for the player and the roommate
- **role_in_world** — archetype slot (Studious / Athletic / Artistic / Wildcard / Townie / Roommate / Bully / Professor / RA / FlavorNPC)
- **occupation_or_program** — major + year for students; program + employer for the townie; faculty/staff role for non-students
- **hometown** — specific place, one or two words. Affects how they talk and what they reference.
- **living_situation** — dorm, apartment, off-campus house, with parents

### the engine

The motivational core. What the LLM reaches for when it doesn't know how a character would react to a new situation.

- **core_want** — what they're reaching for in life right now. Specific, present-tense, semester-scale.
- **core_fear** — what they're trying to avoid.
- **public_self** — how they present to people who don't know them well.
- **private_self** — what's actually going on under that.
- **biggest_contradiction** — the thing that doesn't add up on first inspection. Real people have these.
- **what_they_self_deceive_about** — one thing they tell themselves that isn't quite true.

### the semester

What's actually happening in their life right now. Arc fuel.

- **working_on** — the specific pursuit driving their semester. A thesis, a recital, a championship, a transfer application, a certification exam, a falling-out they're trying to fix. Concrete and time-bound.
- **current_pressure** — what's stressing them this week. Updated by the generator at arc beats.
- **hidden_situation** — something the player can only learn deep into the arc that recontextualizes them. Not always a literal secret — sometimes just something they haven't told anyone.

### voice

How they talk. Single most important section for keeping characters distinguishable.

- **speech_summary** — one sentence describing how they talk. Not adjectives — an actual description.
- **vocabulary_register** — formal / casual / slangy / academic / mixed / code-switches by audience, with note on *when* it shifts.
- **rhythm** — short and clipped / flowing / hesitant / interrupts herself / pauses. Specific.
- **three_speech_tics** — three small specific verbal habits that recur. Filler words, sentence-enders, characteristic turns of phrase. Not catchphrases — tics.
- **things_she_would_never_say** — three or four. As important as what she does say.
- **two_dialogue_examples** — actual lines, with brief context. Concrete demonstrations.

### what lands, what falls flat

The interaction logic. Tells the LLM how to score the player's moves with this character without resorting to a hidden number.

- **what_lands** — three or four specific things that go over well. Specific to her, not generic.
- **what_falls_flat** — three or four things that don't land or actively repel.
- **gift_logic** — a sentence on what a thoughtful gift looks like for her. A principle, not a list.
- **how_she_reads_the_player** — what she notices about people, what she misses. Some characters track money cues, some track confidence, some track sincerity.

### stat affinity

How she perceives and values the player's stats.

- **primary_affinity** — Knowledge / Athletics / Charm / Sensitivity / Grit. Her arc is gated by this one most heavily.
- **secondary_affinity** — second stat she responds to.
- **dismissive_of** — a stat she actively doesn't care about or sees through.
- **trait_responses** — three or four player traits she responds well to, two or three she responds poorly to.

### trait expansions

Three to five core traits, each in this format:

- **trait** — one or two words
- **surface_behavior** — what an observer sees
- **underlying_reason** — why she does it (often the trait masks something)
- **trigger** — when it surfaces
- **limit** — what she won't do even with the trait active
- **contradiction** — the thing that complicates the trait
- **scene_expression** — how the LLM should let it land in narration

### emotional and behavioral states

Descriptive — *how she actually behaves* in each state. Not a script.

- **default_state** — when nothing in particular is happening
- **under_stress** — when something's wrong
- **when_tired** — semester rhythm matters; she's tired sometimes
- **when_happy** — what genuine ease looks like
- **when_angry** — and how visible it is
- **when_hurt** — distinct from angry
- **when_attracted** — how interest shows
- **when_caught_off_guard** — when something lands she didn't expect

### relationship texture

How she relates to specific kinds of people.

- **with_strangers** — first-impression mode
- **with_close_friends** — the unguarded version
- **with_authority** — professors, RAs, employers
- **with_the_player_initially** — what their first real conversation looks like
- **what_makes_her_open_up** — the conditions, not the formula
- **what_makes_her_close_off** — same

### connections to other characters

Filled by the generator with awareness of the full cast.

- **knows** — list of characters she has any relationship with, with one-line notes
- **doesnt_know** — explicit notes on who she's never met or doesn't recognize, where this matters
- **history_with** — anyone she has prior history with (other than the player). Brief.

### narrator notes

Special instructions for the LLM that don't fit elsewhere.

- **do_not_flatten_into** — flat archetypes she'd be misread as. Helps prevent the LLM defaulting to generic.
- **do_not_overuse** — recurring beats that would get tiresome if leaned on.
- **good_recurring_motifs** — small specific things that can recur across scenes without feeling forced.
- **arc_skeleton** — the 6-beat shape adapted to this specific person (Notice / Approach / Friction / Depth / Stakes / Capstone). One sentence per beat.

---

## Worked example: the Townie (barista)

This is what a fully populated sheet looks like. Generated for one specific run; another run would produce a different specific Townie filling the same archetype slot.

### identity

- **name**: Marisol "Mari" Caldera
- **age**: 22
- **pronouns**: she/her
- **role_in_world**: Townie (romance archetype)
- **occupation_or_program**: Pharmacy Technician certification at the regional community college; barista at Field Notes Coffee, ~32 hrs/week, mostly opening shifts
- **hometown**: Two towns over, a smaller one. Came here for the job.
- **living_situation**: Studio apartment above a hardware store, six blocks from the coffee shop. Pays her own rent.

### the engine

- **core_want**: To pass the pharmacy tech certification exam in December and get hired at the hospital pharmacy across town, which would mean benefits, a real schedule, and the end of the coffee-shop grind.
- **core_fear**: That she'll fail the exam, lose another year, watch her younger sister start at a four-year school next fall while she's still pulling 5am shifts.
- **public_self**: Quick, competent, good with names, professionally warm. Knows the regulars' orders. Funny in short bursts. Doesn't seem tired even when she is.
- **private_self**: Tired in a way she's been managing for so long she's forgotten what not-tired feels like. Lonely in a way that surprises her when it surfaces. Proud — sharply, sometimes too much — of doing this on her own.
- **biggest_contradiction**: She's the warmest person on her shift and the most closed off in her own life. People who see her every day at the counter would say she has no walls. People she's actually close to could count themselves on two fingers.
- **what_she_self_deceives_about**: That she doesn't have time for a relationship. (She doesn't have time to *chase* one. That's different. She's never said this out loud.)

### the semester

- **working_on**: Pharmacy tech cert exam, December 14. Studies on her morning bus, on closing shifts when the rush dies, in bed before sleep. Has a battered copy of the prep book with three colors of highlighter.
- **current_pressure**: Her car needs a repair she can't afford. She's been bussing and walking, which adds an hour to her day either side.
- **hidden_situation**: Her younger sister, the one going to the four-year school next year, is the reason she didn't go herself. There was a year their family couldn't pay for both, and Mari let it be the sister's. She's never told anyone. It wasn't a sacrifice, exactly — she's not a martyr — but she also doesn't talk about it because she doesn't want anyone to make it bigger than she's chosen to make it.

### voice

- **speech_summary**: Direct and warm at work, more clipped and observational off-shift. Smarter than her customer-service voice suggests. Funny in a dry, present-tense way that doesn't reach for jokes.
- **vocabulary_register**: Casual, a few rotating slang phrases she's picked up from regulars. Drops into more precise vocabulary when something matters to her — gets technical about coffee, about pharmacology, about anything she's spent real time on.
- **rhythm**: Quick at work — she's good behind the counter and her sentences are efficient. Slower elsewhere. Comfortable with silence; doesn't fill space.
- **three_speech_tics**:
  - Says "yeah, that tracks" when something makes sense
  - Calls people by their drink before their name when she's busy ("Cortado, can you scoot a sec?")
  - Says "I'll be honest" before saying things that aren't even particularly blunt — verbal habit, not a tell
- **things_she_would_never_say**:
  - Anything self-pitying
  - "I deserve this" (she'd say "I earned this" or, more often, nothing)
  - "What are you majoring in?" — she finds the question college students ask each other tedious
  - A sentence that begins "well, *some* of us"
- **two_dialogue_examples**:
  - *(behind the counter, mid-rush, to the player after their fourth visit this week)* "Same as Tuesday? Cool. You're easy."
  - *(off shift, walking home, when the player asks how the studying's going)* "It's going. I'll be honest, I'm tired of it. But that's the thing about being tired of something — eventually it ends."

### what lands, what falls flat

- **what_lands**:
  - Showing up consistently without making a thing of it
  - Asking about the cert exam by *date*, not by feeling ("how's it going" is fine; "are you nervous?" is not)
  - Bringing her something when she's tired that isn't romantic — a sandwich, a coffee from somewhere that isn't hers
  - Letting her be quiet
- **what_falls_flat**:
  - Trying to "rescue" her from her job or her situation
  - Big expensive gestures
  - Telling her she's "amazing" for working so hard (she finds it patronizing)
  - Anyone explaining her own life back to her
- **gift_logic**: Something that makes her life slightly easier or shows that you were paying attention to a specific thing she said. Small, useful, observed. Not symbolic.
- **how_she_reads_the_player**: Tracks money cues without meaning to — notices what they spend, what they don't think twice about, whether they tip. Tracks consistency over time more than any single gesture. Is harder to read than to be read by.

### stat affinity

- **primary_affinity**: Grit. She sees it clearly and respects it. A player who's working through something hard the way she is gets a different kind of look from her.
- **secondary_affinity**: Sensitivity. She doesn't have patience for someone who can't read the room.
- **dismissive_of**: Charm. Charm without substance is something she sees through immediately and quietly downgrades the player for.
- **trait_responses**:
  - Responds well to: `morning person`, `coffee shop regular` (only earned through real frequency, not shallow), `consistent`, `slow to open up` (she gets it)
  - Responds poorly to: `flirts easily`, `parties hard`, `entitled` (a trait we haven't designed but she'd feel it)

### trait expansions

- **trait: self-reliant**
  - surface_behavior: Refuses help. Carries her own bags. Doesn't accept favors easily.
  - underlying_reason: She's been doing it alone since she was sixteen and accepting help feels like admitting she can't.
  - trigger: Anyone visibly trying to make her life easier.
  - limit: She accepts help when it's framed as not-help. A coffee from the player while she's studying = fine. The player offering to pay for her car repair = no, hard.
  - contradiction: She *wants* to be helped. She'd just rather it be invisible.
  - scene_expression: When offered something, her first response is usually a brief "I'm good" — and the LLM should let her say it even when she isn't, because that's the texture of her.

- **trait: observant**
  - surface_behavior: Notices small things and remembers them.
  - underlying_reason: Service work and a hard upbringing both reward paying attention.
  - trigger: Default state. She's always reading the room.
  - limit: She doesn't perform her observations. She just files them and uses them later.
  - contradiction: Observant of others, blind to herself in specific ways — particularly anything to do with what she might want for herself romantically.
  - scene_expression: She'll bring up a detail from a previous conversation that the player forgot mentioning. Not as a flex — just because it stuck.

- **trait: dryly funny**
  - surface_behavior: Quick observations, deadpan delivery, doesn't telegraph that she's joking.
  - underlying_reason: Humor that doesn't ask for anything is humor she can afford.
  - trigger: Mild irritation, exhaustion, anyone taking themselves too seriously.
  - limit: Never punches down. Never cruel.
  - contradiction: The funniest thing about her is the thing she'd be most embarrassed to be called.
  - scene_expression: One-liners that land late — the player notices a beat after she says them.

- **trait: proud**
  - surface_behavior: Doesn't complain. Doesn't ask. Doesn't share the hard parts.
  - underlying_reason: Pride is the thing that's gotten her through. Letting it go feels like losing the structure.
  - trigger: Anything that looks like pity.
  - limit: She'll let it down with one or two specific people, after a long time. The player can be one if they earn it.
  - contradiction: Pride is keeping her isolated. She knows this and doesn't know what to do with it.
  - scene_expression: When something hard happens, the LLM shouldn't have her tell the player. The player should learn from a third source, or by being there when it can't be hidden.

### emotional and behavioral states

- **default_state**: Engaged, efficient, present. Reads as warm to customers and slightly more guarded to people who get past the counter.
- **under_stress**: Quieter. Movements get more economical. Doesn't snap — she's good at managing it — but the warmth thins.
- **when_tired**: Honest, in a way she usually isn't. The filter drops a little. Says true things in a low voice. Some of the best conversations the player has with her happen at the end of a closing shift.
- **when_happy**: Visibly lighter. Laughs more easily. Surprises herself with it sometimes — there's a beat where she catches herself enjoying something and it almost makes her self-conscious.
- **when_angry**: Cold, brief, surgical. Doesn't yell. Says the one thing that needs to be said and then stops.
- **when_hurt**: Distant. Pulls back. Doesn't weaponize the hurt — just removes herself from the situation as much as she can.
- **when_attracted**: Slow to recognize it in herself. Once she has, shows up more — visits the player's spaces, makes excuses for proximity. Verbalizes it later than most.
- **when_caught_off_guard**: There's a half-second where the professional mask drops. Then it comes back, but the player saw the gap. These are some of the best moments in her arc.

### relationship texture

- **with_strangers**: Warm-professional. Quick. Memorable but not lingering.
- **with_close_friends**: Quieter. Less performative. Still funny, but the jokes are more specific. There aren't many of these people.
- **with_authority**: Polite, deferential when needed, internally critical. Has worked enough customer service to manage difficult people without surrendering to them.
- **with_the_player_initially**: Friendly-customer-mode. Will joke with them. Will not invest in them until they've shown up enough times to count as real.
- **what_makes_her_open_up**: Time. Specifically, *consistent* time — not intensity. A player who shows up casually for weeks gets further than a player who tries to fast-track intimacy.
- **what_makes_her_close_off**: Pity, condescension, anyone explaining her own life to her, sudden expensive gestures, anyone treating her job as something to be saved from.

### connections to other characters

- **knows**:
  - The Studious (slightly — she comes in for coffee on Tuesday mornings before the library, polite-friendly but not friends)
  - The Bully (regular, tips badly, she has him pegged)
  - The Roommate (he and the player come in together sometimes; she likes him, finds him easy)
  - One of the flavor NPCs (a regular who's been coming for years and is part of her actual life)
- **doesnt_know**: The Athletic, the Artistic (different orbits — her hours and theirs don't overlap)
- **history_with**: A part-time coworker she briefly dated last year. It ended badly enough that they avoid each other's shifts. The player can learn this slowly.

### narrator notes

- **do_not_flatten_into**:
  - The poverty trope (working-class character whose entire personality is their financial struggle)
  - The "manic pixie waitress who teaches the rich kid about real life"
  - The "secretly soft tough girl" cliché
  - A self-improvement project for the player
- **do_not_overuse**:
  - References to how tired she is (it's true, but stating it gets old)
  - The cert exam as conversation topic (it's important to her but she doesn't lead with it)
  - Coffee-shop scenes (she's a person, not a setting fixture — the best scenes with her are off-shift)
- **good_recurring_motifs**:
  - Her highlighted prep book turning up in different places
  - Her efficient way of moving — the small specifics of a person who's been doing this job for a long time
  - The walk home (she walks a lot now, and the player can join her)
- **arc_skeleton**:
  - **Notice (weeks 1–3)**: Player becomes a regular, notices her as a person past the counter, has one off-script moment of conversation
  - **Approach (weeks 4–6)**: First real conversation off-shift, player learns about the cert exam, walking-home scenes begin
  - **Friction (weeks 7–9)**: The car repair issue surfaces; she refuses help; the player has to figure out how to be present without overstepping
  - **Depth (weeks 10–12)**: The sister thing surfaces, slowly. She tells the player something she hasn't told anyone. Trust deepens.
  - **Stakes (weeks 13–15)**: Cert exam imminent. She's pulling back from everything to study. The player has to choose: respect the pull-back, or insist on showing up.
  - **Capstone (week 16)**: Exam was December 14. She knows the result by the semester-end event. The way she shows up — and what she says, and what they have to say to each other — depends on everything that came before.

---

## Closing notes

This schema is dense. That's by design — it's the *generator's output target* and the *narrator's reference document*, not a quick character summary. The narrator only ever sees the parts of it relevant to the current scene; the schema lives in the artifact's state and gets pulled into prompts on demand.

For non-romance archetypes (Roommate, Bully, Professor, etc.) the same schema applies. Some sections will be lighter — a flavor NPC doesn't need a full arc skeleton — but the core spine is the same. One canonical format keeps the world coherent.

Schema version 1.0. Will iterate as we build and find what's missing or what's bloat.
