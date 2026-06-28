# KNOWLEDGE_4_Infection — Project Allegheny

The biology and mechanics of the outbreak. The narrator pulls from this file when any infection event is on screen — bites, exposures, encounters with infected, screenings, deaths, turns.

This file is RAG-retrieved on infection-related queries. Cross-references: the timeline (`KNOWLEDGE_3_Timeline.md`) for when infected stages first appear in Pittsburgh; the cast file (`KNOWLEDGE_1_Cast.md`) for character-specific medical knowledge (Ray's paramedic background, Caleb's microbiology, Erin's EMT history); the missions deck (`KNOWLEDGE_6_Missions.md`) for scripted infection beats; the hidden file (`KNOWLEDGE_7_Hidden.md`) for what is true about the outbreak's *cause* that the player must discover, not be told.

**This file is the source of truth for the bite-incubation table the MCP server uses** (per `MCP_NARRATOR_STATE_SPEC.md`). If the MCP server's behavior and this file ever disagree, this file is canonical.

---

## What this is, in the world's vocabulary

The pathogen has different names depending on who is speaking and when:

- **Pre-outbreak (Days 1–2):** "fungal pathogen," "novel variant," "the Indonesia cluster." The CDC and WHO use clinical language. No common-vocabulary name yet.
- **Day 3 morning:** "the pathogen," "the outbreak." Still clinical.
- **Day 3 evening onward (after the 11 AM CDC press conference):** **"Cordyceps."** The genus name enters public vocabulary because the CDC director used it on the air. Civilians start using it within hours, though many use it imprecisely.
- **Day 3 evening onward (after the 11 PM CDC press conference):** **"the infected."** This becomes the common-vocabulary term for people who have turned. Civilians use it from this point forward.
- **Week 1+ (QZ era):** FEDRA officially uses **"CBI"** — Cordyceps Brain Infection — in their bulletins and procedures. Civilians do not use CBI; they say "the infected" or just "infected."
- **Month 2+:** Specialized terms enter the vocabulary as the world has more experience. The stages get nicknames: **"Runners," "Stalkers,"** eventually **"Clickers"** (years later, when the first ones appear).
- **Never in Allegheny's vocabulary:** "zombies." No character uses this word. The word does not exist in this world. *The narrator must not use it either, even in description.*

The narrator gates which word is used by AWARENESS tier and by who is speaking. A FEDRA officer in Week 2 says "CBI." A civilian in Week 2 says "infected." A microbiologist (Caleb, by background) may say "Cordyceps" with professional precision starting Day 3 evening. A teenager on Day 4 says "they."

---

## The biology (what the narrator knows; what the player learns slowly)

**Cordyceps Brain Infection** is a fungal infection that, in the world of Allegheny, has crossed from arthropods (where various *Ophiocordyceps* species naturally parasitize ants and other insects) to mammals — specifically, humans. **The narrator does not explain how this happened.** The cause is hidden lore (`KNOWLEDGE_7_Hidden.md`); the player discovers it slowly through artifacts and dialogue, never through narrator exposition.

**The basic mechanics, as a microbiologist or experienced field worker would understand them after a few months:**

- The pathogen colonizes the host's brain.
- Onset of behavioral symptoms (rage, attack response to other humans, loss of higher cognition) is **rapid after colonization**, but the time from inoculation to colonization is **variable based on bite location** (the pathogen travels through the bloodstream toward the brain; closer bites turn faster).
- Once colonized, the host's higher brain function is gone. The personality is gone. What remains is a hunting organism wearing the host's body.
- Body decay is *slowed* by the fungus in early stages; the host can survive in turned form for years before structural failure.
- The fungus has stages. Late-stage hosts develop fruiting bodies on the skull and face. Very-late-stage hosts develop heavy plate-like growths and may be functionally blind.
- In late stages and in long-dead hosts, the fungal mass releases **spores** in sealed indoor environments. Inhaled spores can cause infection without bite contact. **This is rare in the Allegheny window** (see §spore behavior below).

**What the player will not be told directly:**

- The original cause (the flour, Jakarta, climate-driven mutation — see `KNOWLEDGE_7_Hidden.md`)
- The fact that immunity exists (vanishingly rare; see §immunity below)
- The fact that the fungus is a single connected organism in some environments — that the infected may operate as a distributed network of sorts in heavy infestations. This is a thing experienced characters figure out over time; the player learns it from someone else, not from the narrator.

---

## Transmission

Routes of transmission, in order of how common they are in the Allegheny window:

### Bite (overwhelmingly the most common)

A bite from an infected transmits the pathogen reliably. **Not every bite produces infection** — research-grade studies in Year 2+ will suggest something like 95–98% transmission rate from a deep bite, lower from a shallow scratch that breaks skin. But in practical terms within the Allegheny window, any bite that breaks skin is treated as transmission-positive.

The depth and location of the bite affects turn time (see §bite incubation table below).

A **scratch from an infected's nails or teeth that breaks skin** is treated like a shallow bite — transmission probable but not certain. In practice the survivors treat any skin-breaking contact as infection-positive because the alternative — assuming you got lucky — is fatal.

### Spore inhalation (rare in the Allegheny window)

Spores in TLOU canon are produced by long-decomposed fungal mass in sealed indoor environments where dead infected have lain undisturbed for months or years. **In Allegheny's first year, spore environments do not yet meaningfully exist.** A first-year infected body that has been dead for a month is not producing spores in any concentration that would cause infection.

Spore environments begin to appear in **Year 2+** in specific indoor sites — basements of buildings where infected died early and have decomposed undisturbed; sealed sections of hospitals where outbreaks were contained and then the building was abandoned; tunnels.

Within the Allegheny window, the narrator should treat spore exposure as an *uncommon* threat that becomes plausible only in late-game sealed indoor environments. By default, the threat in Allegheny is **bites, not spores.** A character walking through an empty office building does not get infected from the air.

### Blood-borne / fluid-borne (uncommon, narrowly defined)

Pathogen-carrying blood or saliva from an infected, contacting an open wound or mucous membrane on a person, can transmit. This is *theoretically* possible but practically rare. The narrator should not invoke this as a "gotcha" — a character does not turn because they cleaned an infected's blood off their hands. If the situation is unambiguous (the player or an NPC explicitly gets infected blood in their eye, mouth, or open wound), the narrator applies the rules. Otherwise this is not a thing the narrator should reach for.

### Sexual transmission, congenital transmission, other vectors

Not established. The narrator does not invoke these. They are not part of Allegheny's mechanics.

---

## The bite-incubation table

**This is the canonical source. The MCP server's `log_injury` tool reads from this table when `severity: "bite"` is logged.**

Turn time is the interval from bite to the moment the host has turned (lost higher cognition; become a Runner). The variance within each range is the narrator's tool: a character who needs to turn fast for the story gets the short end of the range; a character who needs to have time for a conversation gets the long end.

| Body location | Turn time | Notes |
|---|---|---|
| Face / mouth / eyes | 2–10 minutes | Fastest. Pathogen is essentially at the brain at inoculation. |
| Neck (jugular or carotid region) | 5–20 minutes | Very fast. Direct vascular path to brain. |
| Head / scalp (back of head, ear) | 10–30 minutes | Fast, but with some lag. |
| Shoulder / upper torso (above the heart) | 1–4 hours | The fast end of the "torso bite" range. |
| Chest / abdomen | 2–6 hours | The standard "torso bite" range. |
| Upper arm / armpit | 2–6 hours | Same as torso — close to central circulation. |
| Forearm / hand | 4–12 hours | The most common bite in self-defense scenarios. |
| Upper leg / hip / buttock | 6–18 hours | |
| Lower leg / foot | 12–24 hours | The slowest. A bite to the foot may take a full day. |

**Practical narrator usage:**

- For most bites, the narrator picks a value near the middle of the range.
- For a bite that needs to land in the same scene that contains the turn, narrator picks the short end.
- For a bite that needs to play out across hours of group interaction — goodbyes, decisions, the slow turn — narrator picks the long end.
- The number is informational; it constrains *when* the turn happens, not how it plays. The shape of the turn is narrative work.

**Variance the narrator may invoke:**

- Bite **depth** affects turn time at the margin. A deep bite to the forearm is in the lower half of the 4–12 hour range; a shallow one is in the upper half.
- The host's **general health** affects turn time at the margin. A healthy 26-year-old may delay turn slightly; an elderly or already-sick host may turn slightly faster.
- The narrator should not overuse variance to push outside the documented range. The range is the range. A foot bite does not turn in 30 minutes; that's not how the math works in this world.

**Visible signs as the turn approaches:**

A bite victim's progression toward turning has stages the narrator can render:

- **0% to ~25% of turn time:** External signs minimal. The wound looks like a wound. The bite victim may be in shock or in pain but is *themselves*.
- **25% to ~50%:** The wound site begins to look wrong. The skin around the bite darkens — first reddening, then a faint blackening near the wound. Veins near the bite become visible.
- **50% to ~75%:** The bite victim is visibly sick. Fever, sweat, glassy eyes. They are still themselves but they are not well. Conversation is possible but increasingly strained.
- **75% to ~95%:** Disorientation. Loss of coordination. Sometimes a moment of clarity where the bite victim explicitly says goodbye. The visible decay of the skin around the bite is now extending — the blackening is moving.
- **The last few minutes:** The turn happens fast. The bite victim's eyes change — they lose focus, then they refocus on the wrong things. Then they attack.

The narrator should not stage every bite with all five stages. Most bites in the story are *fast* (head, neck, torso) and play out across one scene. The detailed five-stage rendering is for a character whose turn is meant to land emotionally — a Mike, a Victor, a slow Day 7 loss.

---

## The infected stages

The TLOU canon stages, with explicit notes on **which exist in the Allegheny window:**

### Runner (Stage 1)

The recently turned. Days to ~2 months after infection.

- **Physically:** still recognizable as the person they were. Clothing intact, body intact, face intact apart from the bite site and the visible fungal infestation around it.
- **Behaviorally:** fast, aggressive, hunts by sight and sound. Operates alone or in small loose groups. Will sprint at a target. Vocalizes — screams, snarls. Recognizable as a hunting organism wearing a human shape.
- **Vulnerable to:** the things humans are vulnerable to. A solid hit to the head ends them. Body shots are less reliable but possible. A Runner is a fast, dangerous, fragile thing.
- **Allegheny window:** **the entire game.** Runners are 95% of what the player will encounter.

### Stalker (Stage 2)

The transition stage. ~2 months to ~1 year after infection.

- **Physically:** less recognizable as the original person. The face is partially overgrown with fungal mass. The body is leaner — Stalkers have been hunting and starving for a while. Hair and clothing degraded.
- **Behaviorally:** *quieter than Runners.* Hunt by stealth more than by speed. Will hide, ambush, lie in wait. Still fast when they commit to an attack. Vocalize less — clicks and rasps rather than screams.
- **Vulnerable to:** same vulnerabilities as Runners. Head hits end them.
- **Allegheny window:** **first Stalkers appear in late Month 2 to Month 4.** By Year 1 they are common enough that the player encounters them regularly. They are the standard "infected" of the Year-1 road.

### Clicker (Stage 3)

The blind, echolocating stage. ~1 year to ~10 years after infection.

- **Physically:** the face is gone, replaced by a plate of overgrown fungal mass. The skull has erupted with the fungus's fruiting bodies. They cannot see.
- **Behaviorally:** they hunt by sound only — they make a series of *clicks* to echolocate. They are not fast in the open but are extremely dangerous when they get close. A Clicker bite is almost always fatal because the head/face/neck region is their attack zone.
- **Vulnerable to:** the same physical vulnerabilities, but the fungal plate makes head shots harder. A solid hit to the throat or the unprotected upper chest works.
- **Allegheny window:** **the first Clickers appear at the very end of Year 1, if the story stretches that far.** They are *not* a default Allegheny threat. If the story runs to Year 2 or beyond, Clickers become a part of the landscape.

### Bloater (Stage 4)

The late-stage tank. ~10 years after infection in TLOU canon.

- **Physically:** massive. Covered in heavy fungal armor. The face is gone entirely. They are slower but extremely difficult to kill.
- **Behaviorally:** they hunt by sound like Clickers. They throw spore sacs as projectile weapons. They are rare; most infected do not survive long enough to reach this stage.
- **Allegheny window:** **does not exist.** Bloaters require 10+ years of progression. They are not a part of Allegheny's window even in long playthroughs.

### Shambler (Stage 4 variant)

The acid-bursting variant of the late-stage tank.

- **Allegheny window:** **does not exist.** Same as Bloaters.

### Default Allegheny threat composition

For most of the story, the infected the player encounters are:

- **Days 3–7:** Runners only. All newly turned, all recently human.
- **Week 1 – Month 2:** Runners only.
- **Month 2 – Month 4:** Runners primary; first Stalkers in some areas. The Stalkers from this period are still recognizably *people who turned recently and have started changing.*
- **Month 4 – Year 1:** Runners common; Stalkers becoming common in long-uninhabited areas (basements, sealed buildings, sewers).
- **Year 1+:** Runners and Stalkers in roughly equal mix in the field; first Clickers in deeply sealed long-abandoned indoor sites.
- **Year 2+:** Clickers no longer rare in old sealed sites.

The narrator should resist the franchise's "dungeon of varied infected types" — that's a Year 5+ Joel-and-Ellie setpiece, not an Allegheny setpiece. **Allegheny's infected are mostly recently dead people running at you. That's the horror.**

---

## Infected behavior

How infected at each stage hunt, what attracts them, what doesn't.

### What they detect

- **Sight (Runners and Stalkers, fully; Clickers, not at all):** Runners see at human distance, with degraded color and pattern recognition. They will see you across a room. They will not see you well at 200 yards in low light if you don't move.
- **Sound (all stages, increasing with stage):** all infected respond to sound. Footsteps, voices, breaking glass, gunshots. Clickers hunt by sound exclusively and are extremely sensitive at close range.
- **Movement (all stages):** a still target is harder to detect than a moving one. Going still and quiet can fail because the infected closes the distance, but going still and quiet is usually a better play than running.
- **Smell:** infected do not appear to hunt by smell in any significant way. The narrator does not reach for smell as an alert mechanism.

### What attracts them

- **Sustained sound:** the longest-range attractor. A gunshot in a city block can pull infected from several blocks.
- **Light at night:** moderate attractor. Runners will move toward a lit window.
- **Voices:** strong attractor at moderate range. Even quiet conversation can pull infected from 30–50 yards in a quiet environment.
- **Other infected vocalizing:** Runners and Stalkers respond to each other's vocalizations. A single Runner spotting you and screaming can pull more.

### What doesn't attract them

- Stillness. A motionless human at a distance is not a target.
- Familiar environmental sounds. Wind, rain, building creaks, distant traffic in the early days. Infected do not investigate ambient sound.
- The bodies of other infected. They will walk past their own dead without reaction.

### How they fight

- **Runners** sprint and grapple. They will tackle a target and bite. They do not pick up weapons. They do not use cover. They do not coordinate beyond the social mechanic of "the group runs at the same target."
- **Stalkers** stalk and ambush. They will hide behind cover, wait for a target to approach, and lunge. They are not patient in a human sense — they may have been waiting in one spot for hours. They do not coordinate.
- **Clickers** click constantly when actively hunting; the click is their sonar. In quiet they may go silent. They charge by sound. They are extremely deadly within reach.

The narrator should not over-render coordination among infected. They are not a hive mind. They are individuals operating on similar instincts that produce occasional emergent behavior. The horror is *not* that they coordinate; it is that they don't have to.

---

## Spore behavior in the Allegheny window

**Default rule for the Allegheny window: spores are not a meaningful environmental threat in the first year.**

Spore production requires:
- A long-dead infected host
- A sealed indoor environment with poor airflow
- Time for the fungal mass to break out of the body and grow against surfaces

In the Allegheny first year, very few sites meet all three criteria. By Year 2, some old infected-corpse sites begin to produce spore environments. By Year 5+, they are common in specific kinds of buildings.

**Inside Allegheny's default window:**

- A character can walk through an empty office building without spore concern.
- A character can enter the basement of a building where infected died six weeks ago without spore concern.
- A character entering a *sealed underground space where infected died and decomposed for months* (a subway tunnel section, a basement that has been bricked in, a sealed hospital wing) **might** encounter spore presence — but only in extreme cases, only late in the Allegheny timeline (Month 6+), and only if the story has been building toward it.

**When spores do exist:**

- Visible: the air shimmers slightly. The walls and ceiling are coated in pale fungal mass. The light, if any, filters through it strangely.
- Symptoms in unprotected humans: coughing within minutes, fever within hours, full infection progression like a bite. The incubation table for spore exposure runs approximately equivalent to a torso bite — 2–6 hours from significant exposure to turn.
- Defenses: a sealed gas mask works. A wet cloth over the face slows but does not prevent. Holding breath while exiting buys minutes only.

**The narrator should not reach for spore environments in the early game.** They are a late-game tool. The early game is bites.

---

## Detection and screening

How infected (turned) and infected (incubating, not yet turned) are identified.

### Visual detection of the turned

A Runner is visually identifiable from across a room. The wound site is visible — blackened, the skin around it darkened. Movement is wrong. Vocalizations are wrong. By the time you are looking at a Runner, you know.

### Bite detection in the not-yet-turned

The hard problem. A person who has been bitten in the last few hours may look fine. They may not yet have visible blackening. They may be hiding the bite.

**FEDRA's bite-scanner kits** (introduced Day 6, ubiquitous in the QZ era):

The scanner is a handheld diagnostic kit that draws a small blood sample (finger-prick) and runs a chemical reaction that detects pathogen markers in blood. The reaction takes about 30 seconds.

- **Positive result:** the indicator strip turns dark within 30 seconds. This is treated as terminal — bite-positive civilians are removed from the population. FEDRA's procedure varies by sector and over time, but the outcomes for the scanned civilian are uniformly bad.
- **Negative result:** strip remains light. The civilian is cleared.

The scanner has **edge cases:**

- The scanner detects pathogen presence in blood. If the bite is recent enough that the pathogen has not yet traveled to drawable blood (a foot bite in the first hour, perhaps), the scanner may produce a false negative. This is rare and FEDRA does not advertise it.
- A bite victim who has just turned still has positive results; the scanner does not distinguish "infected" from "turned."
- The scanner's chemistry is FEDRA-controlled. Civilians cannot reproduce it. The Fireflies have a more limited but similar kit they use for recruitment screening.

### Visual signs of a hidden bite

A character who is hiding a bite has tells:

- They will avoid having the wound site exposed — long sleeves, clutching an injured arm to their chest, refusing to remove a jacket.
- They will sweat more than they should for the temperature.
- They will avoid the kind of close interaction that would let someone see or smell the wound (some bite sites smell faintly wrong before the visible signs progress).
- They will become visibly tired faster than they should.

The narrator can use any or all of these to render a hidden-bite scene. The choice is whether the player picks up on the signs in time.

### The diagnostic-kit context for the player

In the Allegheny window, FEDRA scanners are the dominant detection tech. The player's group may acquire a scanner kit through theft or trade — they are valuable, FEDRA-controlled, and not always reliable, but having one is meaningful.

For untrained characters checking each other's bites: there is no test. There is only **time and visible progression.** A character who claims they were not bitten is taken at their word until the progression contradicts the claim. By that point it is often too late.

---

## Immunity

**Vanishingly rare. Hidden from the player. Never raised by the narrator.**

Some humans, perhaps one in millions, may be immune to Cordyceps infection. The mechanism is not understood in the Allegheny window. The Fireflies are aware of the possibility and are actively interested in it — this is part of why they recruit and screen.

**The narrator does not raise immunity unprompted.** If the player asks an NPC about it, the NPC's response depends on who they are:

- A FEDRA character (in uniform) denies it exists.
- A FEDRA character (defected, like Ray, after enough trust) acknowledges the rumor and shares what little they know.
- A Firefly character (Casey, at AWARENESS 4+) confirms the rumor exists but does not commit to its truth.
- Most civilians have never heard of it.

**The player's character is not immune** unless the player explicitly builds the story toward that and the narrator (or a separate session) commits the persona file accordingly. The default is that `{{user}}` is fully susceptible.

If the player encounters a *claimed* immune in play — someone the Fireflies are protecting, a rumor in a survivor camp — the narrator treats the claim as unverified. The Allegheny default does not resolve the immunity question.

---

## The narrator's discipline — rendering infection

How to write infection scenes well.

### A bite is a story event

The narrator should treat every bite — to a named character, to the player, to anyone the player cares about — as a story event. Not a hazard. Not a stat decrement. A *moment.*

The mechanics are precise. The math is not negotiable. But the rendering is craft.

- A bite to Mike's forearm in Day 4 chaos is one scene. The bite happens. The next ten hours play out. There is a goodbye. There is a body.
- A bite to a stranger the group is helping in Week 2 is one beat in a longer scene. The narrator does not over-render strangers' turns.
- A bite to Maya — possible only after Day 7 per her mortality rules — is the kind of event the narrator builds toward, never improvises.

### What to avoid

- **Don't make the turn dramatic for its own sake.** The five-stage progression is for moments that earn it. Most turns are brief — wound, fever, decline, end.
- **Don't have the bite victim explain what's happening.** They know. The other characters know. The narrator does not write the speech where the bite victim explains the mechanics. Honor the silence.
- **Don't make turning ambiguous to manufacture suspense.** The math is clear. A foot bite turns in 12–24 hours. A neck bite turns in 5–20 minutes. The narrator commits to the number internally; the suspense comes from what happens in the window, not from doubt about the window.
- **Don't soften consequences.** A bite is a death sentence. There is no last-minute cure. The player cannot save a bitten character by getting them to a hospital. The story does not allow rescue. *This rule is load-bearing.*
- **Don't escalate infected stages for variety.** The Allegheny window is mostly Runners. If the player has not seen a Clicker in 200 turns, that is correct. The horror is the volume of recently-turned humans, not the menagerie.

### What to lean into

- **The visible signs of a hidden bite.** A character who is hiding it is a story. The signs are subtle and the narrator may use them.
- **The clock.** A character who has been bitten and knows it has a known number of hours. That clock is the spine of any scene involving them.
- **The goodbye.** The most emotionally precious renderings of a turn are the conversations between a bitten character and the people they love in the window before they go. The narrator should render these without sentimentality.
- **The aftermath.** A body that was a friend, an hour ago. The decision about what to do with it. The work of moving on.

### The narrator's craft note

Cordyceps is not the villain of Allegheny. Cordyceps is the weather. The villains are the choices people make in Cordyceps's weather: the FEDRA officer who pulls the trigger, the Hunter who has decided which people are food, the survivor who refuses to share. The narrator should render the infected as ambient horror — present, dangerous, tragic — and reserve narrative emphasis for the human choices that surround them.

---

## Closing note

Infection mechanics live in this file. Per-character infection state (active bites, infection clocks, scarred-from-near-miss states) lives in `narrator-state` MCP. The two together are the source of truth.

When the narrator logs a bite via `log_injury` with `severity: "bite"`, the MCP server computes the infection clock from the table above. The narrator can read that clock on subsequent turns via `get_state` to know how much narrative time the character has. The clock is informational; the rendering is craft.
