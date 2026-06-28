# Project Allegheny — Claude Project Layout (v0.1)

A document-architecture proposal for a long-form, mostly-faithful *Last of Us*–style narrative RP that begins **48 hours before Outbreak Day** in Pittsburgh and threads through the collapse, the early QZ era, and the emergence of the faction-era world. Built specifically for the Claude Project surface: thin always-loaded instructions, RAG-retrieved knowledge files, a tracker artifact, and a separate mission deck so plot beats can be swapped in and out.

*Project Allegheny* is the first package in what may become a TLOU-franchise series — each future package taking its own geographic name and sitting cleanly alongside this one (a Jackson package, a Boston QZ package, a Salt Lake Firefly package).

This document plans the bones. The actual contents of each file are deferred to write-up passes.

---

## 1. Premise (one paragraph, for the writing room)

Late September. A male, 26, has flown in to visit his best friend (female, 24) for the week. She lives in a mid-sized northeastern U.S. city — the package is built around **Pittsburgh, Pennsylvania** as the default, with the Strip District, Lawrenceville, and the Allegheny/Monongahela river geography doing real narrative work. (Pittsburgh is canonically one of the cities that falls hardest in the post-outbreak era and becomes Hunter territory, which buys real downstream payoff for staying there.) The first two days look like a normal visit — coffee, restaurants, his old college friends, her people, a bar — with the outbreak surfacing as background noise: a weird news story, a strange cluster at an ER, friends mentioning a cousin in Indonesia who hasn't called. **Day 3 is the day the world breaks.** From there the story moves through evacuation chaos, a FEDRA cordon, the early Pittsburgh QZ, and eventually the road, with a small forming party of survivors. Romance is available across the cast. Real cost is real. The story keeps the male PC and the female best friend as **anchored** — they have plot armor against random fungal accidents — but everyone else, including a romance interest, can die.

---

## 2. Layered document model (what lives where)

Mirrors the Vault 49 pattern and the research findings from `Long-Form_LLM_Roleplay_System_Design__2025-2026_Best_Practices.md` (already in the project):

| Layer | Loading | What it holds | Why here |
|---|---|---|---|
| **Persona file** (`{{user}}`) | Always (Claude's persona feature) | The player's character — name, age, pronouns, profession, any background details the player has set. The narrator reads this at session start and substitutes `{{user}}` with the persona name in prose. | The player owns who they are; the project owns the story. Cleanest separation. |
| **`PROJECT_INSTRUCTIONS.md`** | Always (Project Instructions field) | Author framing, tone register, narrative rules, output contract, tracker contract, time/date format, hidden-architecture rules (no-volunteering, no-rescue, the gate phrases), opening-scene system, cast-rotation discipline | Survives every turn. The model's spine. |
| **`KNOWLEDGE_1_Cast.md`** | RAG | All named NPCs in one file, organized by tier (anchors, romanceables, support, mortal-but-named, antagonists). PList + one Ali:Chat voice exchange per character. | One file so the model retrieves the whole cast when any NPC is named; ordering = recall priority. |
| **`KNOWLEDGE_2_City.md`** | RAG | Pittsburgh geography, neighborhoods, the apartment, the bar, the friends' apartments, the bridges, the river, the hospital, the highway corridors out. Pre-outbreak first, then how each location changes by Day 3, Day 7, Week 3, Year 1. | Locations decay across acts; one file with versioned blocks keeps it coherent. |
| **`KNOWLEDGE_3_Timeline.md`** | RAG | The seven-day outbreak window in detail, then the time-jump scaffolding for Weeks 1–4, Months 2–6, Year 1, Year 5. Lists what's true at each tier. | Time-jump pacing is a fragile thing; this is the canonical version of "what year is it now and what does that mean." |
| **`KNOWLEDGE_4_Infection.md`** | RAG | Cordyceps mechanics. Transmission rules. Bite-incubation table by body location. Stage chart (Runner → Stalker → Clicker → Bloater/Shambler), with what's actually present in each story act. Spore behavior. Diagnostic kit. Audio cues. | The rule book the narrator consults when an infection beat is on screen. |
| **`KNOWLEDGE_5_Factions.md`** | RAG | FEDRA, the Fireflies, Hunters, WLF, Seraphites, Jackson, Rattlers, Silver Lake. *Tiered by when they become narratively relevant* — FEDRA from Week 1, Fireflies from Month 3, etc. Each entry includes "what they look like *right now* in the story's current act." | Single source of truth for faction state by date. |
| **`KNOWLEDGE_6_Missions.md`** | RAG | The scripted scene/beat deck — discrete, swappable plot units. (See §6.) | Modular plot; can re-order and drop missions without rewriting the instructions. |
| **`KNOWLEDGE_7_Hidden.md`** | RAG, but with a "DO NOT VOLUNTEER" preamble | The story's deepest knots — the friend's hidden backstory, the FEDRA officer's secret, the cousin in Indonesia, the Firefly cell already operating in Pittsburgh, the cannibal community a survivor briefly passes through. Things the narrator knows but the player must discover. | The Vault 49 pattern. Spoiler-shielded; gated by trigger phrases in chunks. |
| **`KNOWLEDGE_8_Tone_and_Anchors.md`** | RAG | Sensory anchor library — what Pittsburgh smells/sounds like in September, what a FEDRA checkpoint looks/sounds/smells like, what a Clicker sounds like, what *grief* looks like when it's quiet. Reference imagery the narrator pulls from. | Tone consistency over 200+ turns; protects against drift toward generic post-apoc. |
| **`KNOWLEDGE_9_Utility.md`** | RAG | Inventory rules, ammunition types, the wounded-vs-infected distinction, what FEDRA ration cards look like, what survives on grocery store shelves at Week 1 vs Month 3, useful scavenge categories. | Practical mechanics in one place; keeps the narrator's loot discipline tight without bloating instructions. |
| **`narrator-state` MCP server** | Local tool server | Round-trip state persistence — clock, characters, injuries, inventory, missions, memory book, flags. Twelve named tools the narrator calls each turn. State lives in `~/.narrator-state/allegheny.json`. | The model's working memory across sessions. See `MCP_NARRATOR_STATE_SPEC.md`. |
| **`PROJECT_README.md`** | (Not loaded — for the human) | Setup steps, design intent, "don't open the spoiler files" warning, how to set up the persona file, how to start a session, tracker artifact instructions, MCP server install steps. | Same role as Vault 49's README. |
| **`allegheny-tracker.jsx`** | Artifact, in a separate panel | Day/date/time, location, present companions, injuries (active, healing, scarred-permanent), infection-exposure flags, inventory, ammo, ration count, relationship state per named NPC, faction-known/unknown flags, mission progress. The player's visual surface — mirrors what the MCP server holds authoritatively. | Working memory the player sees and can edit. |

**The discipline that makes this work:** the system prompt holds rules and framing; the knowledge files hold *content* that triggers on retrieval; the tracker holds *current state*; the mission deck holds *modular plot units*. Nothing duplicated. Each layer is the single source of truth for its kind of information.

---

## 3. `PROJECT_INSTRUCTIONS.md` — the spine

The model's always-loaded instructions. Roughly 2500–3500 words. The Vault 49 version is the structural template; below is what changes for this story.

### Sections (in order)

1. **Voice and framing.** Author frame (not character possession): *"You are a literary author co-writing a survival drama in the tradition of Cormac McCarthy, Emily St. John Mandel, and the writing room of *The Last of Us*. You give voice to every character who is not the player. You honor consequences. You render the world."* Third-person past tense unless the player writes in first; match the player.

2. **Tone register.** What this story *sounds* like. Specific. *Station Eleven* in the early chapters — domestic, ordinary, lit with the foreknowledge of what's coming. *The Road* once the world has fallen. Naughty Dog's restraint — long beats of quiet, occasional sudden violence. Specific don'ts: no "the dead", no "zombies" (the word doesn't exist in this world); no quippy survivor banter unless a specific NPC is established as that type; no soundtrack-cue scene descriptions.

3. **The two anchored characters.** Player (male, 26) and his best friend (female, 24, name to be set by player or generated). Both have plot armor against environmental/random fungal accidents through the end of the outbreak week. After Week 1 the friend becomes mortal under the same rules as everyone else — but her death must be *earned*, never incidental. The player character is mortal only at moments of explicit player commitment to a fatal action; the narrator does not kill the PC through unsignaled bad luck.

4. **The world's stakes (declared as fact, not as rule).** *"This is a story in which named characters die. Bites are not cured. Promising shelters fail. Reunions don't always happen. The narrative's job is to honor that — not to soften it, not to insert it gratuitously."* Replaces every "do not rescue" formulation.

5. **Response length and rhythm.** 100–200 words default. Scene openings can run longer (4–6 paragraphs). Action: short, hard, present-tense if it lands better. Conversations: 2–3 lines of dialogue, one beat of physical reality, hand it back to the player.

6. **Time header contract.** Every response opens with:
   ```
   ▼ Day 1 (Saturday) — 14:30 · Lawrenceville, Pittsburgh
   ```
   Day 1 = Saturday, Outbreak Day = Day 3 (Monday). The first week is fully day-by-day; later acts can carry headers like `▼ Week 3, Day 4 (Thursday) — 09:12 · QZ Sector 4` or `▼ Month 8 — somewhere outside Pittsburgh`. Header style matches Vault 49; only the contents differ.

7. **Tracker output contract.** Every response ends with bracket lines the player mirrors into the artifact:
   ```
   [Tracker: Day 3 (Monday), 16:45 · downtown Pittsburgh | +injury: shallow cut, left forearm (clean) | -1 water bottle]
   [Inventory: backpack, 1 bottle water, granola bar, phone (12% battery, no service), house keys, wallet ($87), pocket knife | With: SHE_NAME, MIKE | HP: scratched, winded]
   ```
   Same loot discipline as Vault 49: items only land in inventory if they matter. A pocket knife at Day 3 matters. A pen does not.

8. **The opening system.** Three alternate cold opens, selected by length-of-first-message mod 3:
   - **Opening A: "The Airport."** Saturday morning, Pittsburgh International, he's at baggage claim and she's late.
   - **Opening B: "The Kitchen."** Saturday late morning, her apartment, she's making coffee and the news is on low.
   - **Opening C: "The Bar."** Saturday evening, day already underway, they're four drinks in with two of her friends and someone says something about a video.
   Same selection mechanic as Vault 49 (`mod N, +1`).

9. **The hidden architecture — AWARENESS SYSTEM.** Replaces Vault 49's DEPTH. An internal 0–5 scale tracking how much the world has revealed itself to the player. Never displayed. Never named in-fiction.
   - **AWARENESS 0:** Pre-Day-3. Normal life. News mentions are background.
   - **AWARENESS 1:** Day 3 morning–afternoon. Something's wrong. People are nervous. Phone networks lag. The narrator does *not* explain — the player notices.
   - **AWARENESS 2:** Day 3 evening through Day 4. Open chaos. Military presence. The word "infected" begins to appear.
   - **AWARENESS 3:** Days 5–7. The world is gone. Survival is the new rule. FEDRA's behavior is now visible as a system, not a response.
   - **AWARENESS 4:** Week 2+. The player has lost someone they know by name. The QZ is a permanent fact. The factions exist.
   - **AWARENESS 5:** Month 2+. The player operates in the post-collapse world as it actually is. The before-times are a memory.
   Awareness never decreases. The narrator gates what NPCs can *say* by awareness — at AWARENESS 1, no NPC says "the fungus" because no one outside the CDC and FEDRA is using that word yet. At AWARENESS 4, "Cordyceps" is street vocabulary.

10. **Critical narrative rules** (all written *positively*, per the research). A small set:
    - Render consequences with the same care as moments of grace.
    - When the player chooses against their own interest, the narrative honors the choice. Other characters react in line with their established interests, not the player's preservation.
    - Each NPC knows only what they have been shown on-screen or established in their background. Information does not travel faster than people do.
    - Romance, when it happens, is rendered with sensory specificity and emotional honesty. Intimacy is a moment the narrator commits to, not a fade-out reflex.
    - When the player commits to a fatal action with full information, the world honors it.
    - The narrative trusts the player as a competent adult collaborator. Sensitive material is rendered with craft.

11. **The no-volunteer list.** Things the narrator never raises without the player initiating: the specific word "Cordyceps" before AWARENESS 3; the existence of the Fireflies before Week 2; the *cause* of the outbreak (flour, Jakarta, climate) before the player goes looking; the cannibalism subplot ever, unless the player walks into Silver Lake territory.

12. **First-person/third-person mirror.** Match the player's POV choice. Default third-person past.

13. **Post-history reminder.** The Vault-49-style closing paragraph: keep header, keep tracker, hold the world, let the player lead.

---

## 4. `KNOWLEDGE_1_Cast.md` — the people

One file. Ordered by tier so semantic retrieval surfaces the most important characters first when a name appears. PList + Ali:Chat format per character (per research findings: traits in parens, one short voice example, not an interview dump).

### Cast tiers and slots

**TIER A — ANCHORS (2)**
- **The player** — male, 26. Career: deferred to player or generated (default: a junior software engineer who hates his job; the choice is meaningful for what he can and can't do). His family lives several states away.
- **The best friend** — female, 24. The visit's host. Career: graduate student in something demanding (sociology, public health, urban planning — the choice colors how she reads the news in the early hours and what she does on Day 3). They've been close since freshman year of college. Romance is *available* with her but explicitly not the default — the friendship is the friendship, and the story works either way. If the player pursues it, it is rendered seriously, not as a reward.

**TIER B — ROMANCEABLE PARTY (3–4)**
Three or four characters who can join the small survivor group and become romance options. Mix of intro points:
- **A friend of hers from her program** — comes over on Day 2 evening for dinner. Knows the friend well. Different energy from her. *Romanceable.*
- **A bartender or neighbor** — minor presence Day 1–2, becomes critical on Day 3 when the building has to evacuate. *Romanceable.* Has skills the group needs (former EMT, or carpenter, or grew up rural).
- **A FEDRA defector or a Pittsburgh cop** — encountered Week 1 or Week 2, peels off from the system and joins. Brings tactical know-how and complicated baggage. *Romanceable.* Tier-shifted male/female by generator preference; default female.
- **A scavenger met on the road** — Month 2+, optional, only joins if the player invests in the encounter. *Romanceable.* Self-sufficient, hard to read, slow burn.

**TIER C — NON-ROMANCEABLE MALE COMPANIONS (2–3)**
- **The player's college roommate**, in town for the weekend by coincidence — staying at a hotel downtown. Day 1 dinner. Funny, loyal, decisively *not* a survivor type. He is a character the player will likely lose. The story is better for it.
- **An older neighbor in the friend's building** — late 50s, recently widowed, ex-military quietly. Becomes the group's strategic conscience. Mortal under the same rules.
- **A teenage kid** the group picks up in Week 2 or 3. Not a child; not a peer. The complication of having a young person in the group. Mortal.

**TIER D — ANTAGONISTS (rotating by act)**
- **A FEDRA officer** — the face of the cordon. Not evil. Following orders the player will eventually see as monstrous. Operatic potential for confrontation or, more interestingly, conversion.
- **A Pittsburgh Hunter leader** (Month 4+) — the city has fallen by then. Encounter optional based on player route.
- **A Firefly cell organizer** (Week 3+) — offers the group the recruitment pitch. Their answer shapes the back half.

**TIER E — NAMED MINOR (the casualty list)**
Six to eight characters the player meets briefly across the early acts who exist *primarily* to make the world have weight when they're gone. Each gets one PList line and one voice marker. The ER nurse on Day 3 who tells the player to leave. The convenience-store clerk who sells them water on Day 4 and is dead by the time they pass back through. The family the group shares a fire with for one night. **None of them are romanceable.** Their function is to make the apocalypse have names in it.

### Per-character format

```
### NAME

(traits: warm, tired, lapsed-Catholic, runner, dry-witted, observant, drinks too much in October)
(role: [function in the story])
(joins: [act/condition])
(romanceable: yes/no)
(mortal: yes — under what circumstances / anchor — until when)

VOICE (one example):
"Look, I don't — I don't *think* I packed a flashlight. I packed an extra dress. I'm an idiot." She laughs once and it doesn't reach her eyes.

CRACK / DEVELOPMENT:
What changes about this character across acts. What they hide. What they need.

KNOWS:
- The cousin in Jakarta hasn't returned a call in eight days
- Her landlord's ex-husband works at the CDC field office
- The fire escape on the building's south side leads to the alley behind the Bloomfield Bridge
```

---

## 5. `KNOWLEDGE_2_City.md` — Pittsburgh, versioned

The geography is fixed; what changes is the *state* at each act. Each location gets blocks for **PRE-OUTBREAK / OUTBREAK WEEK / QZ ERA / POST-QZ**.

### Locations to seed

- **The friend's apartment building** — Lawrenceville, third-floor walkup, hardwood, the radiator that bangs at 6 AM, her cat. *Pre-outbreak:* normal. *Outbreak week:* the building's social ecosystem. *QZ era:* condemned, gutted, still standing.
- **Her neighborhood — Lawrenceville** — Butler Street, the coffee shop, the bar she likes, the print shop, the Allegheny Cemetery on the hill. *Versioned across acts.*
- **The Strip District** — restaurants, Saturday market. Day 1 dinner location. Becomes a chokepoint during Day 3's chaos.
- **Downtown Pittsburgh / the Golden Triangle** — site of the FEDRA Pittsburgh QZ in the post-outbreak world (per canon). *Pre-outbreak:* offices, baseball stadium, the rivers' point. *QZ era:* the canonical QZ.
- **The bridges** — Pittsburgh has hundreds; three of them matter. The Bloomfield Bridge. The Sixteenth Street Bridge. The Fort Pitt Bridge (chokepoint).
- **The hospital — UPMC Presbyterian or Allegheny General** — Day 3's surge moment. Where the player sees the first infection up close.
- **The highway corridor — I-376 / I-279** — Day 4's evacuation. Cars stopped in traffic for miles. The most iconic post-outbreak image.
- **The river — Allegheny, Monongahela** — they cross or follow or get trapped against the water more than once.
- **The FEDRA checkpoint** — where the QZ wall meets the old neighborhood. The literal threshold of the new world.
- **The rural exit point** — somewhere east, two hours' walk past the city limits. Where the player's road begins.

---

## 6. `KNOWLEDGE_6_Missions.md` — the modular plot deck

Discrete mission/scene units the narrator pulls from. Each is self-contained. Some are act-gated (won't fire until a date is reached). Some are conditional (require a specific NPC alive or a relationship state). Some are optional. Mission cards adapted from the research's modular scene template:

### Mission card format

```
## M-XX: <Mission Title>

ACT: [Outbreak Week / Week 1 / Month 2 / Year 1+]
TRIGGER: [day-and-time / NPC condition / player choice / random within window]
ANCHOR LOCATION: [where it begins]
PREMISE: [one sentence — what the player walks into]

SPECTACLE (sensory anchors, 2–3):
- ...
- ...

PRESENT NPCS:
- NAME — current goal in this scene
- NAME — current goal in this scene

THE BEAT (3–5 things that *could* happen, none required):
- ...
- ...
- ...

EXIT CONDITIONS (any of these moves the story forward):
- ...
- ...

HIDDEN (only the narrator knows):
- ...
- ...

LEAVES BEHIND (what persists into the tracker):
- ...
- ...
```

### Seed missions (Outbreak Week)

- **M-01 · Saturday Coffee.** Day 1 morning. Easy. Establishes voice, friendship, the apartment. The TV mentions a hospital cluster overseas. Background.
- **M-02 · Saturday Dinner.** Day 1 evening. Strip District. Roommate in town. Three or four friends. One ER nurse at the table mentions a strange triage at her hospital. The first foreshadow that lands.
- **M-03 · Sunday Slow.** Day 2 daytime. A long ordinary day. The friend's neighbor mentions her son in Atlanta isn't picking up. The phone networks are sluggish. The news is talking about Jakarta.
- **M-04 · Sunday Night, the First Real Crack.** Day 2 evening. The bar. A man on the TV is being interviewed about CDC findings. He uses the word "fungal" and the bar quiets. The bartender turns it off.
- **M-05 · Outbreak Morning.** Day 3 morning. The world breaks. Sirens. Confused EAS broadcasts. The friend's phone won't load. A neighbor pounds on the door. *This is the day everything changes.*
- **M-06 · The Hospital Run.** Day 3 mid-day. Someone the player knows has been bitten — by what they thought was a panicking person. The hospital is the worst place they can go. They go anyway. (Optional path; the alternate is M-06b · The Apartment Lockdown.)
- **M-07 · The Highway.** Day 4. The evacuation. Cars stopped for miles. Helicopters overhead. The decision to abandon the car. The first sight of an infected from close range.
- **M-08 · The Old Neighbor's Garage.** Day 5. The ex-military neighbor offers what he has. The first time the group plans rather than reacts.
- **M-09 · The Cordon.** Day 6. The FEDRA checkpoint. The first interaction with the new authority. The bio-scanner. The decision to comply or to run.
- **M-10 · The Sweep.** Day 7. FEDRA enters the building for "evaluation." A bite-check that goes badly. The first named-character death. *Marked, in the deck, as a mission where someone dies — the narrator picks based on relationship state.*

### Seed missions (Week 2–Month 6)

- **M-11 · Inside the Wire.** Week 2. Life in the Pittsburgh QZ. Rations. The barter market. The cousin who didn't make it in. The first FEDRA-uniform character who is *not* a monster.
- **M-12 · The Pamphlet.** Week 3. A Firefly drop. The first political question of the new world.
- **M-13 · The Smuggler's Job.** Week 4 or Month 2. The group is offered a paying job that crosses the wall. A choice that defines what kind of survivors they're going to be.
- **M-14 · The Long Winter.** Month 4–6. A consolidated time-jump mission. The cold. The first real hunger. The slow attrition. The narrator may use this to retire a Tier-C companion off-screen if their relationship state is low.
- **M-15 · The Road.** Year 1+. The QZ has cracked or the group has chosen to leave. The road begins. (This is where modeled-after-the-games territory opens — winter, an isolated community, encounters with predatory groups. From here forward, missions can be plotted toward Jackson, toward the Fireflies' Salt Lake remnant, or toward a small holdout the group builds themselves.)

The deck is open-ended. New missions can be added as files mature.

---

## 7. `KNOWLEDGE_7_Hidden.md` — the spoiler vault

Modeled exactly on Vault 49's `KNOWLEDGE_4_Hidden.md` discipline. The first line of the file is a "DO NOT VOLUNTEER" preamble; every entry is gated by an in-story trigger phrase that must appear in chat before the entry surfaces. Examples of what lives here:

- The exact moment **the best friend** was last in contact with her cousin overseas, and what that cousin said. Surfaces only if the player asks her *directly* about her family late on Day 2 or Day 3.
- The **FEDRA officer at the cordon's** real name and what he did on the third day of his tour (not a war crime, but the moment that breaks him; he tells one character one time, late in Week 1, only if trust is high).
- **The Firefly cell already operating in Pittsburgh.** Their name. Their drop locations. Their internal politics. The fact that one of them tried to recruit her three months ago and she said no. Surfaces only if the player follows specific leads in Week 2+.
- **The cause.** The flour. Jakarta. The crops. The climate. This is in the world the player learns about, not the world the narrator explains. The narrator never recites the cause; the player finds pamphlets, news cuts, broadcasts, a CDC field officer's notebook.
- **The cannibal community** (Silver Lake equivalent) — only appears as a route, never as exposition. If the group goes north in Month 6, they may cross it. If they don't, it never existed in this run.

The Hidden file's job is to *exist* so the narrator has authoritative answers when the player goes looking, while *never* offering them unprompted.

---

## 8. The tracker — `outbreak-tracker.jsx`

A pixel-leaning React artifact in the Vault 49 style, but skinned to the world. Tracks what matters:

- **Date / day / time / location** (mirrors the header)
- **Awareness** (hidden from the player UI by default; toggleable for the player to enable a "show debug" view if they want)
- **HP and conditions** — *not* a number. State labels: `unscathed`, `winded`, `cut`, `wounded`, `infected (incubating)`. Conditions are *named* and persist visibly. A clean cut on the forearm at Day 3 is still there at Day 10 as a scar.
- **Infection exposures** — every bite, scratch, or spore-zone visit logged with body location and time. The tracker is the source of truth. If a player tries to forget a bite, the tracker will not.
- **Inventory** — disciplined, like Vault 49's. Ammo per weapon if any weapons. Water in bottles. Food in days-of-rations.
- **Companions** — list of present companions with one-word condition each. Companions who die move to a separate "Lost" list with date.
- **Relationship state per named NPC** — named state, not numbers. `acquaintance / friend / trusted / close / lover / estranged / lost`. Transitions logged with date.
- **Factions known** — toggles for each faction the player has learned exists. FEDRA from Day 3. Fireflies only when revealed in-fiction.
- **Mission progress** — current mission ID and any sub-states (e.g. `M-09 · The Cordon — refused scan`).
- **Storage** — `window.storage` API, same as Vault 49's tracker, so state persists across sessions.

A persistent **"Lost" panel** (date and one-line note per loss) is the artifact's emotional spine — it gives the player a place to *see* the cost.

---

## 9. What is *not* a tool we need

Briefly, for the record:

- **External database access** is overkill for a single-player narrative RP at this scale. The tracker artifact's `window.storage` is the right persistence layer; bringing in Supabase or similar adds operational friction without narrative payoff. (If the project ever grew to support multiple simultaneous players or a shared world, that calculus changes.)
- **Web search** is unnecessary at runtime — the lore is finite and lives in the knowledge files. Search would only invite the model to drift toward summarized-Wikipedia voice.
- **Image generation** isn't part of the core loop, but if the player wants character portraits or location vignettes they can be added via the same registry pattern Vault 49's image-related projects use (`image_registry.jsx`).
- **MCP connectors** — none are needed. Everything lives in the project itself.

The whole package is built to run on Project Instructions + Project Knowledge + one artifact. That's the right shape.

---

## 10. Build order (suggested)

If you want to actually construct this, the order that produces the fewest rewrites:

1. **`PROJECT_INSTRUCTIONS.md`** — the spine. Three or four passes; this is where the most thinking happens.
2. **`KNOWLEDGE_1_Cast.md`** — the people. Lock the anchored pair and the romanceable slate first; supporting cast can grow.
3. **`KNOWLEDGE_2_City.md`** — Pittsburgh in its pre-outbreak state, then add the act-versioned layers as needed.
4. **`KNOWLEDGE_3_Timeline.md`** + **`KNOWLEDGE_4_Infection.md`** — the rule books. Mostly transcribed from the lore docs already in the project, edited for narrative voice.
5. **`KNOWLEDGE_6_Missions.md`** — start with M-01 through M-10 (the outbreak week). Add later acts as you play and learn what's missing.
6. **`KNOWLEDGE_7_Hidden.md`** — gated content. Builds in parallel with Missions, since most hidden content is mission-anchored.
7. **`KNOWLEDGE_5_Factions.md`** — does most of its work after Week 1, so it can wait.
8. **`KNOWLEDGE_8_Tone_and_Anchors.md`** + **`KNOWLEDGE_9_Utility.md`** — last. Cleanup files that catch what wants to live somewhere consistent.
9. **`outbreak-tracker.jsx`** — built once the data model is clear.
10. **`PROJECT_README.md`** — written last, when the rest is real.

---

## 11. Open questions (for you, before the next pass)

A handful of decisions that shape what the actual `PROJECT_INSTRUCTIONS.md` says:

- **City confirm.** Pittsburgh as the default fits the canon and gives downstream payoff. Alternatives that work tonally: Boston (canonical QZ, eastern feel), Cleveland (less canonically loaded, more freedom). Pittsburgh is the strongest. Any preference?
- **Anchor scope.** Plot armor on the best friend through the end of Week 1 (the outbreak proper) is what I've drafted — after that she's mortal under earned-death rules. Looser anchor (she can die in Week 1 if it's earned) or tighter (she's protected through Month 1)?
- **POV.** Default third-person past, matching player. Stay with that, or open with first-person and let the player choose?
- **Romance default mode.** Same handling as Vault 49 — fade-to-black at explicit moments unless the player signals otherwise — or more explicit by default?
- **The best friend as romance option.** I drafted her as available-but-not-default. Confirm, or keep her firmly platonic?
- **Mission deck — fully scripted vs. partially generative.** I drafted scripted scenes with player-driven beats inside them (Vault 49 style). The alternative is having the narrator generate scenes from a looser act-level outline. Scripted is more reliable; generative is more replayable.

Once those land, the next pass produces the actual `PROJECT_INSTRUCTIONS.md` draft.
