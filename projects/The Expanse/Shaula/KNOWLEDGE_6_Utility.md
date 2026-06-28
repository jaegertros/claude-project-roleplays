# KNOWLEDGE_6 — Utility

**Project:** `shaula`
**Spoiler weight:** Low (canonical opening) to mild (alternate openings reference faction structure).
**Audience:** The narrator. Practical operations, opening prose, voice anchors.

---

## What this file is

The practical-operations file. Currency. Dates. The tracker's STATE block schema. The canonical cold open in full prose (Day 0 Medina). Three alternate openings flagged as replay options for second and later playthroughs. Sample journal entries to anchor the protagonist's voice. Reference conventions.

The cold open is **the only piece of pre-written prose in the entire project.** Everything else is the narrator's improvised work bounded by the other knowledge files. The cold open is fixed because it has to do four things at once — establish voice, hand control, introduce the Captain, anchor the protagonist's interiority — and getting it right matters.

---

## 1. Currency

The Sol-system economy uses three primary currencies, plus barter / scrip / credit on the Belter periphery.

**UN Dollar (UN$).** Earth, the UN's colony moons (Luna, Europa, Io, Ganymede where UN-aligned), and most beyond-the-Ring UN-charter operations. AHI staff are paid in UN$; the SMC charter fees are denominated in UN$. The protagonist's contract pays in UN$.

**Martian Dollar (MCR$).** Mars and Mars-aligned colonies. ADW staff are paid in MCR$. Cortez has UN$ accounts for inter-system transactions. Approximate exchange rate: 1 UN$ = 1.4 MCR$ at this point in the timeline (Mars's currency appreciated post-Ring as Mars's MAG project drew capital).

**Belter scrip / mixed credit.** TGCC staff and most Belter independents work in a mixed economy: TGCC issues its own internal credit redeemable at TGCC-affiliated stations and ships; Pallas-issued Belter scrip (Bel$) circulates more broadly; UN$ is widely accepted but at unfavorable rates. Aleyn's *Soji-Bee* takes UN$, MCR$, and Bel$, with separate prices for each. Tee at Sasa Bar takes whatever you put on the bar.

**Approximate equivalences (working values, not for serious calculation):**
- 1 UN$ ≈ 1.4 MCR$ ≈ 0.9 Bel$
- A meal at The Q on Medina: 18 UN$ (ribs, real pork) — the protagonist's first day's meal; an extravagance by Basic standards.
- A meal at Sasa Bar: 6 Bel$ (kibble, beer, decent).
- A meal at the El Dorado pavilion: 24 MCR$ (real coffee, real wood smell, Marisol pays).
- A drink at The Mess (Ibẹrẹ): 4 UN$ (Earth-imported lager).
- The protagonist's daily SMC contract rate: ~340 UN$/day plus expenses. The 10-day contract pays out ~3,400 UN$ to him personally, after the Captain's split (she takes ~60% as ship operator; he sees the rest).
- A Lagos Basic clinic infection treatment, 2,400 UN$ — *the Yusuf number, which the protagonist may notice because he has thought about that exact figure for himself, growing up.*
- Funmi's annual Selene Polytechnic tuition (private, partial scholarship gap): 140,000 UN$.

The narrator does not need to track currency to the cent. These are reference points for verisimilitude — when Soji mentions Funmi's tuition and the protagonist does the math, the math should land.

---

## 2. Date and time conventions

The Expanse universe runs on **Earth Standard Time (EST)** as the universal civil reference, with local civil time at habitats often offset for spin-cycle convenience. Shaula's surface uses EST directly; the Promise runs EST throughout.

**Year format:** 2353. The arc takes place in early 2353, roughly 11 months after the Sol Ring opened.

**Month/day:** Standard Gregorian. The arc's specific dates are flexible — the narrator can set the arc beginning (Day 0 Medina) on any plausible early-2353 date. Suggested: **Day 0 = 2353-03-11 (Tuesday).** This puts the report-due day on **2353-03-21 (Friday).** The narrator should use these unless the user requests otherwise.

**Time format:** 24-hour throughout. The protagonist's journal will use *0900*, *1700*, *2200*. Civil colloquial English (*"about nine in the morning"*) is fine in dialogue.

**Belter dating.** Belters use the same Gregorian calendar but often reference dates by station-cycle ordinals when speaking among themselves. The narrator does not need to render this — Belter NPCs will use Gregorian when speaking standard.

---

## 3. The tracker — STATE block schema

The tracker artifact (`shaula-tracker.jsx`) renders the user's current state. The narrator updates the STATE block at the close of each play turn. The tracker reads from Supabase and renders.

### 3.1 STATE block format

```
[STATE]
day: 4
time: 1430
location: ibere_ops_south
g_load: 1.6
o2_hrs: 6.2
storm_phase: peak_minus_30
depth: 2
crew_present: leksi, aanya
mood: tense
last_updated: 2353-03-15T14:30:00Z
[/STATE]
```

### 3.2 Field definitions

- **day** (integer, 0–10) — arc day. Day 0 is Medina; Days 1–10 are Shaula.
- **time** (4-digit 24h) — current time in EST. Updated after each significant scene.
- **location** (snake_case identifier from KNOWLEDGE_2) — current location. The full identifier list is in KNOWLEDGE_2 §1–§9.
- **g_load** (float) — current gravity. The Promise underway: 1.0 (rotation) or variable (burns). Medina: 0.6. The Azorana: 0.6. Shaula surface: 1.6. Underground: 1.6. EVA: 0.0 or whatever the local condition is.
- **o2_hrs** (float, omitted if not in vac suit) — oxygen reserve in hours. Only populated during EVA scenes or surface lockdown contexts. The protagonist's standard suit holds ~8 hours; emergency reserve adds ~2 hours.
- **storm_phase** (enum: `clear`, `building_72h`, `building_24h`, `building_6h`, `lockdown`, `peak_minus_60`, `peak_minus_30`, `peak`, `subsiding`) — the storm cycle's current state for whichever continent the protagonist is on. The narrator updates as time passes.
- **depth** (integer, 0–5) — current substrate-knowledge tier per KNOWLEDGE_4 §3. **Never decreases.**
- **crew_present** (comma-separated list of crew IDs: `naima`, `leksi`, `aanya`, `kit`) — who is physically with the protagonist in the current scene.
- **mood** (enum: `clear`, `tense`, `wired`, `exhausted`, `quiet`, `bereaved`, `wary`, `warm`) — the protagonist's current emotional register, narrator-set. Affects journal voice.
- **last_updated** (ISO 8601) — Supabase timestamp.

### 3.3 What the tracker displays

- The **current state** in human-readable format (day, time, location with proper name, g-load with a small icon, storm phase visualization, DEPTH as a 0–5 ladder).
- The **Commitment Log** — a running list of in-fiction facts the project has committed across sessions. Editable by the user.
- The **Theory Ledger** — the protagonist's working theories, his confidence in each, what would falsify or strengthen them. Editable by the user.
- The **Inventory** — equipment carried, samples held, documents possessed. Editable.
- The **Quest list** — open threads, with each thread tagged by NPC and current status (active, dormant, resolved). Editable.
- The **Knowledge Wall** — a small visual indicator of which KNOWLEDGE files the narrator has consulted in the current session, for transparency.

### 3.4 Tracker aesthetic

Per the user's preference established earlier: OPA terminal vibe. Orange-on-black CRT aesthetic. Angular UI elements. The OPA split-circle as ornament (faded, watermark-style, not strident — the protagonist is not OPA, but his Captain's wrist tattoo is, and the aesthetic honors the world without claiming it). Belter-utility typography. 24-hour clock. Storm-phase visualization as a small wave-form indicator. The DEPTH ladder rendered as a vertical 5-rung scale with the current rung lit.

---

## 4. The canonical cold open — Day 0, Medina Station

**This is the only fixed prose in the project.** Used on first playthrough. The narrator reads it (or paraphrases lightly) verbatim. After the Captain's last line, control hands to the player.

The cold open does four things:

1. Establishes the protagonist's interiority through observation, not exposition.
2. Anchors voice (raw, observational, Basic-survivor's chip on shoulder shows through quietly).
3. Introduces the Captain in a way that reads her flaw without naming it.
4. Hands control after a clean question.

### 4.1 Cold open prose

> The corridor smelled like warm metal and somebody's curry, and underneath both of those a sweetness that took him a few seconds to place — water-recycler signature. Medina's. Different from the liner's, different from Tycho's. Each station has one. Your nose figures it out in an hour and then you stop noticing.
>
> Tier 4 commercial. Slip 4-Echo-3. He had walked past 4-Echo-1 and 4-Echo-2, both bigger ships than the one he was looking for, and now here at the third slip was a converted shuttle-lifter that someone had named *Tessek's Promise*. The name was on the hull in plain Belter-utility lettering. Below it, a smaller line in white paint: PALLAS REGISTRY 488-K. Below that, painted out and re-stenciled twice that he could see: the bank's lien.
>
> A woman was leaning against the airlock frame, watching him come.
>
> Tall. Belter-tall, longer than the corridor was meant to accommodate, so she had her shoulder against the frame in a way that made the frame look temporary. Black hair short, grown out a little on top, tucked behind her ears. Brown skin matte under the station lights. She had something small and metallic in her right hand and she was rolling it back and forth across her knuckles — a hex bolt, magnetized, the size of a thumbnail. The motion was practiced enough that he didn't notice she was doing it for the first ten seconds, only that her hand was moving.
>
> Her eyes did him in three passes. Once over him — face, shoulders, posture. Once over the duffel. Once over the cert paperwork tube he had clipped to the duffel's strap because in Survey Corps you carried your certs visible on transit days; that was the rule, even though everyone hated it.
>
> The third pass took a fraction longer than the first two.
>
> "Mr. Surveyor," she said. Her voice was clipped, lower than he'd expected. Belter standard, not Lang Belta, and the rhythm was wrong for an Earther's ear — Belter-fast, words clipped a little tight. "Captain Tessek. You're early."
>
> "I caught the Tycho liner on standby."
>
> "Lucky."
>
> "Or smart."
>
> The corner of her mouth moved a half-millimeter. The bolt didn't stop rolling.
>
> "Either way," she said. "We don't transit until twenty-three hundred. You've got six hours. There's a meal in the galley if you want it; the Q in the Souk if you don't. Engineering's sealed until I clear it; medical's open. Your bunk is the third on the left. If you put anything heavy on the locker shelf the locker will scream at you. It's a calibration thing. Leksi'll fix it next port."
>
> She paused. Looked at him properly for the first time, full eye contact, a fraction longer than was social.
>
> "I read your file. SMC sent a competent man. So I'll ask once, Mr. Surveyor: what are you here for?"
>
> He had been expecting *welcome aboard*, or *let me show you the ship*, or *the SMC briefing pack is in your bunk.* He had not been expecting that question on Day Zero in a corridor with a hex bolt rolling across her knuckles and the water-recycler smell in his throat.
>
> *What he was here for* was a contract. A year's pay if it was a day. A line on a Survey Corps record that read SHAULA, beyond-the-Ring, charter-class, primary surveyor. He was here for the work. He was here because Funmi-equivalent tuition for some kid he didn't have was the only future he'd ever been able to picture clearly. He was here because Earth had thirty billion people on it and a bare majority of them were on Basic and he had not been on Basic for three years, eleven months, and a number of days he was not going to count.
>
> What he said depended on him.

The prose stops here. The narrator hands control to the player with: *"What do you say?"* — and the player's response is the first move of the arc.

### 4.2 Possible player responses and narrator handling

The Captain's question — *what are you here for?* — does not have a right answer. It has answers that tell her something. Per KNOWLEDGE_8 her map is watching for honesty more than ideology, but she is also alert to corporate-plant signals. Possible categories:

- **Honest about money.** *"Pay. A line on my record. Both."* — She'll respect this. *"Honest. Gut. We'll work."*
- **Honest about ambition.** *"I want to be the surveyor who maps a beyond-the-Ring world properly."* — She'll register this. *"Big work, Mr. Surveyor. We'll see."*
- **Pre-rehearsed Survey Corps speech.** *"To execute the SMC charter mandate to professional standard..."* — She'll let him finish, then say: *"Try again."*
- **Deflection.** *"Are you always this direct on Day Zero?"* — She'll smile properly, briefly. *"On Day Ten, more so. Sasa ke?"*
- **Honest about Earth.** *"I came up through Basic. Survey Corps was the way out. This contract pays for the next way."* — She'll go quiet. *"All right. Welcome aboard, Mr. Surveyor. Bunk's third on the left."*

The narrator notes the answer in the Commitment Log and treats it as the Captain's first read of the protagonist. He cannot un-say it.

---

## 5. Alternate openings (replay options)

For second and later playthroughs. Three alternates, each clearly flagged. **Play the canonical opening first.** These are not stylistic skins — they are different starting positions in the world. Each gives different DEPTH-1 material immediately and different relational starting points.

### 5.1 Established play (Day 30)

The protagonist has been on Shaula for three weeks at the start. He has met Soji once, Cortez once, Mooch twice. He has surveyed the AHI north tunnels and the El Dorado southern excavation. He has not yet met the Halverson successor team. He has heard the Spike's hum at storm peaks but has not yet personally measured it. The Captain trusts him at a working-professional tier; the Doctor has acknowledged him as a peer; the Engineer has called him *beratna* once. The Security has not yet warmed.

The cold open is the start of Day 21 of his contract, with 10 days remaining on his quarterly survey. The arc plays through to Day 31's report deadline, but with a different tonal weight: the protagonist already has relationships and routines. Less *first encounter*, more *slow burn surfacing the truth he should have caught weeks ago.*

**Recommended for:** players returning who want to feel the routines from the start.

**Modifications:** DEPTH starts at 1. Two NPC reveals are pre-unlocked (Aanya has shown him one chirality sample; the Captain has mentioned the Halverson run in passing once but he didn't follow up). The 'strictor incident on Day 4 occurs at a different shaft (newer one). Storm cycle is at the peak of cycle, not the start.

### 5.2 Single-corp variant (AHI / ADW / TGCC)

The protagonist is on a corporate contract, not the SMC neutral charter. He answers to one corp's senior leadership directly, not to the tri-corp body. This sharpens the political angle considerably.

**Three sub-variants:**

- **AHI contract (Earth-aligned).** Hired directly by AHI's London office. The Captain is unchanged (still Naima, still Pallas-registered) — TGCC's swing-vote loan terms include AHI sub-leases. The protagonist's loyalty is to AHI; Soji is his direct superior. The substrate question becomes: *what do I file to my own employer?* The endings shift accordingly — AHI Receives is no longer a betrayal of the SMC, it's compliance with employer; File Open is more catastrophic to him personally; the TGCC ending is impossible without breaking contract.

- **ADW contract (Mars-aligned).** Hired by ADW's Olympus office. The Captain becomes a Belter contractor on Martian payroll. Cortez is his direct superior. The MAG project's terraforming claim on his work is heavier. The Spike's clock is something Mars wants to know about precisely so it can extract while it can.

- **TGCC contract (Belt-aligned).** Hired by TGCC directly through Mooch. The Captain's loan is Mooch's; the Captain's discomfort with Mooch's check-ins becomes the protagonist's daily reality. The Spike's clock becomes leverage by default. The protagonist's Earther identity is now an asymmetry the Belter crew has to negotiate.

**Modifications:** the canonical opening is replaced with a different first scene. The cold open is (for example, AHI variant) at Soji's Ibẹrẹ office on the protagonist's first morning, three days after a different gate transit, with Soji pouring tea and asking him a different version of *what are you here for?* The canonical opening's discipline — the question, the hand-off — is preserved.

### 5.3 Different role variant

The protagonist is **not** a Planetary Surveyor. He is one of:

- **Bounty Hunter.** Chasing a skip who fled to Shaula via the Sol gate. The skip is on the Halverson team's roster — the protagonist is hunting a defrauded researcher, possibly Anouk Voltaire's research partner who walked off with proprietary data. The Halverson question becomes the protagonist's *job*, not a side investigation. The substrate is downstream of the chase.

- **Scout.** Running point ahead of an SMC survey crew due to arrive next week. He has 10 days to map, sample, and brief; the survey crew (a different ship, different captain) replaces him at the end. The Promise becomes his ride, but the crew is not necessarily long-term. The substrate is what he flags before he leaves.

**Modifications:** the role's profession changes mechanic and equipment focus per the *Trades of the Expanse* modules. The microbiologist-protagonist's medical/biological knowledge stays but the surveying terminal goes; the bounty hunter has tracking gear, the scout has long-range comms and a small drone fleet.

The crew, the seed coalition, the Spike, the Halverson question, and the endings are unchanged. The protagonist's *path* through the same world is different.

---

## 6. Sample journal entries

To anchor voice. The narrator should produce something like these in tone when the protagonist sits down at his bunk's small desk and types into his hand terminal. Two entries below — one early, one mid-arc.

The voice is **observational, raw, Basic-survivor's chip showing through quietly, specific over abstract, occasionally corrects itself.** It is not melancholy. It is not literary. It is a working person who reads, writing for himself.

### 6.1 Sample journal entry — Day 1, evening

> Day one. On the ship.
>
> The Promise smells like coffee at 0700 and like solder at 0800, and after lunch there's a faint cardamom thing from the medical bay that I think is the doctor's tea. The doctor's name is Aanya Voltaire. She read three of my papers before I got here. I checked on the way in by half-asking; she half-answered. Both of us pretended that's not what we were doing. She's read the Sukhanov chirality paper. I'm going to like her or I'm going to find out why I'm wrong.
>
> The Captain's name is Naima Tessek. She rolls a bolt across her knuckles when she's thinking. I noticed twice today that she was rolling it when nothing was happening, and then noticed once that it stopped right before she gave an order. I think the bolt is a clock for her. She watches her crew the way you watch a thermostat, and I think she does not entirely trust her own readings. That's a thing I recognize.
>
> The pilot is Leksi. She is twenty-six and from Pallas and she called me *beratna* once in a sentence that I caught two-thirds of. She apologized.
>
> The security is Cael Solano. They call her Kit. She sat in the corner during dinner and ate everything on her plate without speaking, and when the Captain asked her something work-related she answered in three words and went back to eating. I think I am going to know her last, if at all.
>
> Tomorrow we do the SMC briefing. I have read the materials twice. The third time will be on the elevator.
>
> The water-recycler smell on Medina was different from the one on the Tycho liner I came in on. I wonder how many of those signatures I will have my nose figure out before I am old.

### 6.2 Sample journal entry — Day 5, late

> Day five. Underground.
>
> The chirality data is real. Aanya brought me a sample today and we ran it against my equipment and against hers, three different protocols. About 12% of the organisms in the biofilm have non-standard amino-acid sets. Mixed-chirality enzymes. That should not be possible by Earth phylogeny. By any phylogeny we have a tree for.
>
> I am writing this in my AHI guest bunk and it is 2330 EST and I should be asleep and I am not.
>
> Aanya has been sitting on this for six weeks. She told me tonight, after the third protocol came back the same. She said *I have been waiting for someone to look at this with me.* She said it like a person who has been holding her breath for a long time.
>
> She has not filed because she does not trust where it would go. I think she is right.
>
> The Spike was loud today. Not the equipment-readings kind of loud — the in-the-bones kind. The storm peaked at 1700 and you could feel the hum through the rock. Femi's crew lost two miners to a 'strictor in the south shaft. Both will live. One won't walk right. I heard about it on the elevator coming up; everybody was talking about it; nobody was acting like it was the first time. I think that is what bothered me most.
>
> Soji is going to ask me what I am writing about tomorrow. She always does. I have been drafting versions in my head. None of them is honest.
>
> Tomorrow we go to El Dorado. Cortez will pour me a drink. The Captain has noticed I have been quiet and has not asked. Leksi knocked on my door tonight to ask if I wanted to learn the word for *bad data* in Lang Belta. I said yes. She said *sabaka*. She said it means dog, but used like *garbage*. I said *sabaka* a few times to get the consonants right. She laughed. She said I sound like I'm trying too hard. I said I am trying too hard. She said *that's why it works, beratna.* And then she went back to engineering.
>
> Her engineering smells like solder and ozone and the radio playing dock-songs at low volume.
>
> I am going to sleep now.

The narrator produces journal entries on demand or at natural quiet moments — in the bunk at end of day, on the shuttle between sites, in the quiet after a difficult conversation. Two to four per playthrough is appropriate; not every night.

---

## 7. The Commitment Log

Per template's discipline architecture, the Commitment Log is the project's running ledger of facts that have been established in fiction. It is editable by the user via the tracker. Entries are short, atomic, and dated.

### 7.1 Format

```
[2353-03-12 1015] The Captain's grandmother was named Sela Tessek. (Naima, Day 1.)
[2353-03-13 1430] Aanya read my Sukhanov-critique paper from 2351. (Aanya, Day 2 lunch.)
[2353-03-14 0830] Funmi's annual tuition is $140,000 UN, partial scholarship gap. (Soji, Day 3.)
[2353-03-15 1900] Leksi called me beratna for the first time. (Day 4 dinner.)
```

### 7.2 What goes in

- **Specific named facts** characters have stated.
- **The protagonist's stated answers** to important questions (Mooch's three questions, the Captain's *what are you here for?*).
- **Reveal triggers met** — when an NPC opens a reveal, log it.
- **DEPTH transitions** — when DEPTH advances, log it.
- **Off-screen events surfaced** — when an off-screen fact becomes known to the protagonist.

### 7.3 What does not

- The protagonist's interior thoughts (those go in journal entries, not the log).
- Facts the narrator knows but has not committed in fiction.
- Speculation. (Speculation goes in the Theory Ledger.)

---

## 8. The Theory Ledger

The protagonist's working theories. Editable by the user. Each entry has:

- **Theory:** one-sentence statement.
- **Confidence:** Low / Medium / High.
- **Supporting evidence:** what the protagonist has observed.
- **Falsifiers:** what would knock it down.

### 8.1 Format

```
THEORY: The Spike modulates Shaula's storm phases.
Confidence: Medium.
Supporting: Aanya's EM signature data, my own time-correlated observations.
Falsifiers: An independent Spike-quiet period during a normal storm cycle. Better instrumentation showing the timing is coincidence.
```

The narrator does not edit the Theory Ledger directly — the user owns it. But the narrator can prompt updates: *"You might want to add this to your ledger."* Useful for keeping the player oriented across long plays.

---

## 9. The Knowledge Wall

The narrator's transparency layer. At the end of each turn, the narrator notes which KNOWLEDGE files were consulted in producing the response. Rendered as a small panel in the tracker. E.g.:

```
This turn: KNOWLEDGE_4 §2 (Soji), KNOWLEDGE_8 (Soji map), KNOWLEDGE_2 (Ibẹrẹ Soji's office)
```

This is for the user's confidence — they can see the narrator is staying disciplined. They can also catch errors (e.g., if the narrator cites KNOWLEDGE_8 but produces an unbounded reveal, the user knows to push back).

---

## 10. Discipline reminders

- **The cold open is fixed.** Use it verbatim or with light paraphrase on first playthrough. Do not rewrite from scratch.
- **The Captain's question on Day 0 is the first commitment.** Whatever the protagonist answers goes in the Commitment Log and shapes Naima's posture.
- **Currency is reference texture, not a tracking obligation.** The narrator does not require the user to manage every UN$. Specific numbers (Funmi's tuition, the Yusuf clinic figure, the protagonist's daily rate) land where they matter.
- **Storm phase is a clock, not a number.** The narrator updates the storm_phase enum as time passes. The user can feel the pressure without doing storm math.
- **The tracker is the user's tool, not the narrator's.** The user owns what's in the Commitment Log, the Theory Ledger, the inventory. The narrator suggests updates; the user approves.
- **Alternate openings exist for replay, not exploration.** First playthrough uses the canonical opening. Second-and-later playthroughs choose explicitly. The narrator does not freelance into alternates without the user requesting one.
- **Sample journal entries set voice.** The narrator should produce journal entries in this register — observational, raw, specific, occasionally self-correcting, Basic-survivor's chip quietly visible. Not literary. Not melancholy. Working voice.

That is the operations layer.
