# KNOWLEDGE_9_Utility — Project Allegheny

The utility layer. Inventory tracking discipline, the carrying-capacity question, food and water and medical economy, ammunition and weapon scarcity, light and fuel and batteries, the FEDRA scrip and barter market economies, the road economy, and scavenge-rendering discipline. The narrator pulls from this file during scenes that need practical realism — a scavenge, a ration line, a hunger beat, a moment of *we cannot carry that.*

This file is RAG-retrieved on tactical queries. Cross-references: MCP spec `MCP_NARRATOR_STATE_SPEC.md` for the inventory tool surface; `KNOWLEDGE_4_Infection.md` for bite-medical specifics; `CAST_VICTOR.md` and `MISSION_M08_Old_Neighbors_Garage.md` for the canonical duffel contents; the QZ economy is referenced from `MISSION_M11_Inside_The_Wire.md` and `FACTION_FEDRA.md`; the road economy from `MISSION_M15_The_Road.md` and beyond.

---

# §1. Inventory tracking discipline

The narrator tracks inventory through the MCP `add_inventory`, `remove_inventory`, and `update_inventory_item` tools. The principle: **track what matters; let the rest be texture.**

## What to track

- **Weapons** — guns, knives, blunt instruments. Every weapon `{{user}}` carries should be tracked: type, condition, ammunition for guns. Weapons are *load-bearing for combat scenes* and should not be ambiguous.
- **Ammunition** — by weapon type. *Specific magazine counts*, not approximate. "Two magazines for the 9mm" is a real fact about a real scene.
- **Medical supplies** — antibiotics, painkillers, bandages, suture kits, water-purification tablets. Each is countable; each runs out.
- **Specific consumables that matter** — bottles of water by count, ration bars by count, fuel by liters or quarter-tank, batteries by count.
- **Trade goods** — anything `{{user}}` is carrying with explicit intent to trade. The barter market does not work on hand-waved value.
- **Plot-load-bearing items** — the duffel from Victor, Maya's list, Ray's notebook (if `{{user}}` carries it), Erin's medical kit (if she gives him one).
- **Companions present** — tracked separately per MCP cast state but should be reflected in inventory-line decisions (more bodies = more stuff possible to carry, more stuff necessary to carry).

## What to keep as texture

- *Clothes the player is wearing.* Track them once when acquired (Victor's old jacket, the wool sweater scavenged in Bloomfield); don't re-enumerate every scene.
- *The phone.* Tracked when relevant (battery, signal); fades into texture after Day 5 when it's dead and useless.
- *Small generic items.* A pen, a piece of paper, a lighter — let these be present without being a tracker line. If they become relevant (the pen runs out, the lighter dies), the narrator can surface them in the moment.
- *Food and water below the consumable threshold.* `{{user}}` does not need to track every cracker. The narrator tracks *days of food remaining*, not crackers.

## The discipline against bloat

A tracker that lists thirty items is *useless* — the player and the narrator stop reading it. The tracker should usually list **eight to twelve items**. If it grows past that, the narrator should be consolidating: "rations (3 days)" not "5 cans soup, 8 ration bars, 2 packs crackers." The granularity is the player's narrative experience, not a spreadsheet.

When items become irrelevant, **the narrator should drop them from active tracking.** A first-aid kit `{{user}}` has been carrying for two months without using is still in the pack but does not need to be on every tracker line. The narrator can reintroduce it when it becomes relevant.

## When to log_injury vs. when to track meds

The MCP `log_injury` system handles wounds. The `add_inventory` system handles supplies. They interact:

- A wound is logged via `log_injury` and persists in the character's state
- The medical supplies used to treat it are *consumed* via `remove_inventory`
- The wound heals (or not) per its severity and treatment
- The narrator can `update_injury_treatment` when meds are applied

The narrator does **not** track every aspirin. Meds matter when:
- They are *scarce* and being managed
- They are *specific* and the character has been saving them
- They have *side effects* that matter (the painkillers Erin is rationing knock the user out for four hours)

---

# §2. The carrying-capacity question

The hardest practical question in *Project Allegheny*: how much can the group carry?

## The baseline

A reasonably fit adult can carry **35-50 lbs** for sustained walking. More than that for short distances; less than that for long days. **Most of what people want to carry, they cannot.**

The narrator should *let weight matter*. A pack that is too heavy slows the group. A pack that is too light is *fine* — but the player should feel the trade-off of every pound.

## The leave-behind moments

There are at least three structural leave-behind moments in *Project Allegheny*:

1. **M-07 The Highway, Day 4.** The car is abandoned. Whatever was in the trunk that doesn't fit in the packs is gone. The narrator runs this without itemizing — the player describes what they take; the narrator commits.
2. **M-09 The Cordon, Day 6.** Weapons must be hidden or surrendered before approaching the FEDRA cordon. Anything visible is confiscated.
3. **M-15 The Road, Month 4.** The QZ's collapse means leaving in hours. Whatever the group has in the barracks, they take what they can; the rest stays.

The narrator should not force a leave-behind at other times. But the narrator *should* surface the weight question when:
- The player's tracker lists more than twelve items
- The group is doing sustained walking (Day 4 highway, road era)
- The temperature shifts (extra clothes vs. extra ammo)
- A new acquisition is significant (Victor's duffel — what comes out to make room?)

## How to render a leave-behind

The narrator describes the **specific items being abandoned** rather than running a checklist:
- The kindle, charged on Saturday morning, dead now, in the side pocket of the duffel
- The shoes Maya didn't think she'd need
- The picture Mike had been keeping in his wallet of his nieces
- The cat carrier, because Periodical is in `{{user}}`'s jacket now

The leave-behind is a *moment*. The narrator should give it weight. **What people leave is a portrait of what they were.**

## Vehicles

After M-07, the group is on foot. Vehicles in *Project Allegheny* exist but are *exceptional*:

- **Priya's Subaru** is the last functional vehicle the group typically has access to. After M-07 it is abandoned on the highway. Some playthroughs may keep a vehicle slightly longer (a back-roads route, a sympathetic FEDRA contact letting the group through); the narrator should be sparing.
- **Fuel** is the constraint that matters. A full tank of gas is *gold* in Month 1+. By Month 3, fuel is *traded by the liter* in the QZ barter market.
- **Bicycles** are surprisingly viable in the road era. The narrator can introduce one or two if the player invests in finding them.
- **FEDRA vehicles** the group does not have. The Hunters in Month 4+ have some (acquired from FEDRA's retreat); the player encounters them as adversarial.

---

# §3. Food

The single most important resource after water.

## Days 1-2: abundance

Pre-outbreak food is normal. Maya's fridge is stocked; restaurants are open; the corner bodega has the usual; Mike orders an entrée and drinks. The narrator should render food in the *before* days as *full and present*. This is the texture the player will remember.

## Days 3-5: the rush

Day 3 morning the news hits. By Day 3 afternoon, civilians who have any forethought start buying. **By Day 3 evening, the grocery stores are emptying.** By Day 4 morning, the canned goods aisle is bare in most stores; what's left is what people didn't want (sardines, pickled beets, off-brand baby formula). By Day 5 the stores are functionally cleaned out.

A specific scavenge note: **a grocery store on Day 4-5 still has things in it** — they are just not the things people raced to take. Crackers without water are useful. Bouillon cubes are useful. Specialty flours (see the Sumber Pertama bag in `KNOWLEDGE_7_Hidden.md`) are useful and *plot-relevant*. The narrator can let `{{user}}` find:
- Snacks that won't fill anyone up but won't spoil (granola bars, hard candy, peanuts)
- Specialty foods people skipped (canned anchovies, pickled vegetables, dried mushrooms)
- Flour, rice, and dried goods if the player gets to a baking-supplies aisle
- Pet food if the player thinks of it (yes, you can eat it; the cats can eat it; it counts as protein)

By Day 6-7, the grocery stores are picked over by waves of subsequent scavengers and are dangerous to enter (sweeps, hunters, infected drawn to the noise of looters).

## Days 5-7: rationing begins at home

What is in Maya's apartment on Day 5 is what the group has unless they scavenge more. **Most apartments contain about 4-7 days of food for one person** — less if the resident hadn't done a real grocery run lately. Maya's apartment, with Maya + `{{user}}` + variably Mike and Victor, has *maybe four days of careful eating* by Day 5.

The narrator should let this be felt without itemizing. *"We have enough for tonight and tomorrow if we don't eat much. After that we have to go out."*

## QZ era: ration system

FEDRA's ration system in the Pittsburgh QZ:

- **Ration cards** issued at QZ entry. Each adult civilian receives a card. Cards are stamped or marked for each ration draw.
- **Weekly draws** at distribution points (the Convention Center is the primary; smaller distribution at sector outposts).
- **Composition of a weekly ration (one adult, Week 1):**
  - 2,000 calories per day worth of dry/canned goods
  - One protein component (canned tuna, dried beef, or chicken in MRE form) per three days
  - One vegetable component (canned, often green beans or corn) per three days
  - One starch component per day (rice, pasta, crackers, flour)
  - Salt and one spice per week
  - One personal-care item per month (soap, toothbrush, women's hygiene products if applicable)
- **By Month 2:** calorie content drops to ~1,600/day. Protein component drops to every five days.
- **By Month 3:** ~1,400/day. Protein every week. Vegetables sporadic.
- **By Month 4 (just before collapse):** ~1,200/day. Civilians are visibly losing weight.

**Work assignment yield** — civilians on clearing detail, salvage, medical, or kitchen receive *supplemental rations* of about 20% above base. Civilians on light duty (childcare, admin) receive base. Civilians who refuse assignment receive *60% of base*.

**Children** receive 80% of an adult ration with the same composition. Infants under two receive formula component if available; if not, the family is told to share.

**The ration line** is a daily fact. *The QZ has approximately 22,000 civilians in Week 2 and ration lines that long.* The line at the Convention Center forms before 7 AM and is processed until ~2 PM. After 2 PM, no draws are accepted until the next morning.

## Road era: scavenge and foraging

After M-15, the group eats what they can find or take. The narrator should commit to specific things:

- **Canned goods** are the staple. By Month 6+ on the road, most accessible canned goods in the eastern Pennsylvania corridor have been scavenged. The group finds them in *less obvious places* — under beds, in cars, in pantries no one had reached yet.
- **Hunting** — Victor (if alive) can hunt small game. Rabbit, squirrel, occasional deer if the group has the patience and the ammunition.
- **Trapping** — slower than hunting, more reliable. The narrator can render snare-setting as a small detailed task.
- **Foraging** — autumn nuts (acorns require processing; black walnuts are good), winter root vegetables in abandoned gardens, spring greens (dandelion, ramps), summer berries. The narrator should render this *with seasonal accuracy.*
- **Fishing** — rivers and creeks. Pittsburgh's rivers are *too polluted to fish from before the outbreak* and remain so. East of the city, smaller waterways are fishable.
- **Cooking** — over fire when fire is safe (depending on smoke visibility); cold otherwise. Cooking turns a hard meal into a real one. The narrator should let cooked food be a *moment*.

## Hunger as character

Hunger should be *rendered in the body* per `KNOWLEDGE_8_Tone_and_Anchors.md`:
- Day 4-5 hunger is *the texture of having eaten irregularly* — not yet real hunger
- Week 2-3 QZ hunger is *the body doing math* — slower thinking, cold mattering more
- Month 3+ QZ hunger is *real hunger* — visible weight loss, the slow erosion of caring
- Road-era hunger is *episodic* — full days and empty days alternating

The narrator should not over-render hunger but should also not pretend it isn't happening. One hunger detail per scene where hunger is present.

---

# §4. Water

The most important resource. The narrator should treat water with weight.

## Days 1-3: taps work

Tap water in Pittsburgh on Days 1-3 is *normal* — drinkable, plentiful, not yet a question. The narrator should not pre-foreshadow water scarcity.

## Days 4-5: questions

Day 4 morning the question surfaces: *is the tap water safe?* The infrastructure is technically still running, but with reduced personnel at the treatment plants, civilians start to wonder. By Day 4 evening, most people who have thought about it have *filled containers* — bathtubs, pots, every bottle they own.

The narrator can let this be a beat. Maya filling the bathtub on Day 4 evening is a recognizable apocalypse-fiction beat *and* a real practical thing she would do.

## Day 6 onward: variable

Pittsburgh's water infrastructure during the QZ era was *partially maintained by FEDRA* — some buildings get tap water, some don't, the schedule rotates, the pressure varies. **The QZ has working spigots at distribution points and most public buildings.** Civilians in barracks fill bottles at the spigots.

By Month 3, water rationing extends to civilian draws: 1 gallon per adult per day, drawn at the spigot. This is for all purposes — drinking, cooking, washing. *It is not enough.*

## QZ water economy

Water becomes *barter goods* by Month 2-3 because the ration is insufficient. The barter market accepts:
- Bottled water from pre-outbreak supply (rare and valuable)
- Filled containers of unverified provenance (cheap, risky)
- Water-purification tablets (worth more than gold, per tablet)

The narrator should commit: **one liter of bottled water in the QZ in Month 3 is worth about as much as a pack of cigarettes or a fresh battery.**

## Road era water

Streams, lakes, abandoned wells, and rainwater are the road's sources. **All require treatment.** The water-purification tablets the group has from Victor's duffel are the campaign's most economic-load-bearing supply item.

Tablets per liter: 1 tablet treats ~1 liter; tablets are issued in strips of 10; Victor's duffel had 3 strips (30 tablets) plus a small backup of iodine drops.

If tablets run out, **boiling is the alternative.** Three minutes of rolling boil makes most water safe. The cost is fuel and time and the smoke signature.

If neither is possible: *drinking untreated water is sometimes survivable and sometimes not.* The narrator should let the player make this choice without rolling dice — the player who drinks from a stream knows what they're doing.

## Dehydration as character

Dehydration *changes how characters behave*. The narrator can render this:
- Day 1 of inadequate water: headache, fatigue, irritability
- Day 2: dizziness, confusion, decision-making degrades
- Day 3: serious danger, especially in cold weather where the body needs more water to maintain core temperature

The narrator should not stage water as a constant crisis but should *use it as character* when relevant. A character who has not drunk enough today snaps at a partner about something trivial; the narrator does not explain why.

---

# §5. Medical

Beyond bites. The medical economy of *Project Allegheny.*

## What's in a small medical kit

The medical kit from Victor's duffel (per `MISSION_M08_Old_Neighbors_Garage.md`):
- Gauze rolls (4)
- Adhesive bandages (mixed sizes, ~30)
- Suture kit (1 — needle and silk thread)
- Antiseptic (small bottle, alcohol-based)
- Antibiotic ointment (1 tube)
- Painkillers (ibuprofen, ~50 tablets)
- Antibiotics (amoxicillin, one course — ~20 capsules)
- Anti-diarrheal (loperamide, ~20 tablets)
- Tweezers
- Small scissors
- Cloth tape

This is *enough to handle most minor injuries* and *one serious infection*. It is not enough for trauma, complex surgery, or sustained antibiotic courses for multiple people.

## Antibiotics

The most strategically valuable medical item in the campaign. Antibiotics in *Project Allegheny*:

- **Amoxicillin** — the most common type. Treats most bacterial infections from wounds and respiratory illness. One course (5-10 days, 20-40 capsules total) costs a week of barter goods in the QZ market.
- **Ciprofloxacin** — rarer; valuable for wounds that have started infecting badly. One course costs significantly more.
- **Doxycycline** — useful for tick-borne illness on the road. Less commonly traded.

The narrator should let antibiotics be a *resource the group manages.* Whether to use a course on `{{user}}`'s infected hand or save it for something worse is a *real decision* the narrator can surface.

**Erin's stash.** Erin, by Week 2 of the QZ era, has access to a small Firefly-aligned antibiotic supply (per `FACTION_FIREFLIES.md` material redistribution). She gives some to people who need it. She will give to `{{user}}` if the relationship has been built; she will not advertise the source.

## Painkillers

- **Ibuprofen** — common, useful, runs out fast. Treats inflammation; doesn't touch serious pain.
- **Acetaminophen** — paracetamol, also common; better for headaches.
- **Opioids** — anyone who had a prescription has it; anyone who didn't, doesn't. The narrator should commit: *pre-outbreak Pittsburgh had a moderate prescription opioid presence; the QZ in Month 2-3 has a black-market trade in old pills.* If `{{user}}` becomes seriously injured, opioids may be available at substantial cost.

## Anti-anxiety and anti-depressants

A specific category often missed in apocalypse fiction. People who were on these medications pre-outbreak are *physiologically dependent on them.* Stopping cold turkey produces:
- Anti-depressants: discontinuation syndrome — dizziness, "brain zaps," depression rebound, irritability. Symptoms 2-14 days; severe in some cases.
- Anti-anxiety (benzodiazepines): potentially dangerous withdrawal — seizures, severe anxiety, insomnia.

The narrator should be aware of this without making it a setpiece. If a named character was on SSRIs pre-outbreak and the supply runs out, the narrator can render this as a quiet thing happening to them — a week of being not-quite-themselves, then settling.

## Wound treatment in the field

The narrator should render wound treatment with *enough specificity to be real*:
- Cleaning with available water (boiled if possible)
- Antiseptic if available
- Closing the wound — butterfly bandages for small cuts, suturing for larger
- Bandaging
- Watching for infection over the next 48-72 hours

Suturing in a real way: the wound is closed under tension, the needle goes through the skin perpendicular and exits perpendicular, knots are tied with enough room. **The narrator should not require `{{user}}` to be a doctor** but should let competent characters be competent — Erin can suture; Ray can suture (paramedic training); Victor can suture acceptably; Caleb-the-microbiologist has read about it and can do a serviceable job.

## Long-term wound and chronic conditions

Wounds that took days to close can break open. Infected wounds left untreated kill people. Old injuries reassert in cold weather. The narrator should *let history matter* — a wound from M-13 that didn't heal cleanly is still a wound in M-14.

Chronic conditions among named characters:
- Maya — none of note in pre-outbreak baseline
- Priya — mild asthma; her inhaler is in her Subaru; she runs out by Month 2; she manages
- Erin — old back injury from her EMT days; manageable
- Ray — none
- Noah — none
- Victor — high blood pressure (was managed pre-outbreak); his medication runs out by Week 3 of the QZ
- Mike — none significant
- Sam — none

The narrator can introduce condition-related beats *organically*. Priya's wheeze when the air gets bad. Victor's lying down more than he used to.

---

# §6. Ammunition and weapons

Scarcity, condition, and what works.

## Starting weapons distribution

The group's typical arsenal post-M-08 (Victor's duffel):
- One 9mm semi-auto pistol (typically a Glock 19 or similar) with 2 magazines (~30 rounds)
- One additional handgun if Victor kept his own
- One fixed-blade utility knife
- Smaller folding knives as ambient
- Variable: a baseball bat, a tire iron, a hatchet, depending on what the group has

The arsenal grows or shrinks across the campaign:
- The cordon (M-09) — `{{user}}` may surrender or hide weapons before approaching FEDRA
- Smuggle jobs (M-13) — Firefly relationships may net additional weapons or ammo
- The Sweep (M-10) — combat losses
- The Road (M-15) — what survives the QZ collapse

## Ammunition scarcity

**By Month 1**, civilian-grade ammunition is *rare in the QZ.* Pittsburgh had moderate firearm ownership; what was on Day 1 has been scavenged, lost, or traded. By Month 2 in the QZ, a single 9mm round costs a meal's worth of barter goods.

**Specific scarcity by caliber:**
- 9mm — the most common civilian round; *available but expensive* throughout the campaign
- .22LR — small-game and target ammo; **abundant** at start, valuable for hunting
- .223 / 5.56mm — rifle round for AR-platform civilian rifles; *moderate scarcity*; FEDRA uses this so some leaks into barter
- 12 gauge — shotgun shells; *moderate scarcity*; useful for short-range defense
- .308 / 7.62mm NATO — hunting rifle and battle rifle; *more common rural than urban*
- Specialty calibers (.357, .45 ACP, 10mm, etc.) — *very scarce*; if `{{user}}` has a weapon in one of these, they should rarely fire it

The narrator should let *rounds be counted*. "Six rounds in the magazine" matters when a single encounter could require all six.

## Weapon condition

Firearms degrade with use and weather. The narrator can render this:
- A pistol carried daily in rain and cold *needs cleaning* once a week minimum. If `{{user}}` neglects cleaning, the narrator should surface a malfunction at an inconvenient moment.
- A rifle treated well lasts indefinitely.
- A scavenged firearm should be *inspected* before trusted. A gun whose history is unknown might be unsafe.

The narrator should not turn this into a maintenance minigame. A *single beat per month* of `{{user}}` cleaning his pistol at a fire is enough texture.

## Improvised weapons

Common in *Project Allegheny:*
- Baseball bats (the most common civilian improvised weapon)
- Tire irons (the second most common)
- Pipe wrenches
- Hatchets and axes
- Sharpened rebar (Sam's weapon)
- Length of pipe with one end weighted
- Crowbar (also doubles as a tool)

The narrator should commit to *what the group is carrying* and let it stay consistent. A character with a tire iron has a tire iron across multiple scenes; the tire iron has weight, has reach, has limitations.

## Combat as resource expenditure

Combat in *Project Allegheny* should *cost* — ammunition, wear on weapons, injuries, exhaustion. Per `KNOWLEDGE_8_Tone_and_Anchors.md`, combat is *fast and ugly*, but it also *uses up things*. The narrator should track this:

- Each shot fired is removed from inventory
- Each significant blow with an improvised weapon may damage the weapon (the baseball bat eventually splits)
- Each fight produces small injuries the narrator may or may not `log_injury` (a sprained wrist, a cut on the forearm, a bruise on the ribs)
- Each fight produces *exhaustion* — the body after combat is a body that needs rest

---

# §7. Light, fuel, batteries

The slow decay of pre-outbreak technology.

## Lights

- **Flashlights.** Battery-powered. Useful for as long as the batteries last; then useful as weight unless they take a battery type the group has.
- **Candles.** Long-burning if conserved. The QZ barter market trades candles. The narrator can render candle scenes with *the specific glow of candlelight* — yellow, flickering, the shadow on the wall.
- **Lanterns.** Battery or kerosene. Kerosene lanterns are *more practical long-term* because kerosene can be scavenged in small quantities; batteries can't.
- **Headlamps.** The single most useful pre-outbreak light source for road-era travel. The narrator should let the group acquire one early if possible.

## Batteries

Battery types matter:
- **AA / AAA** — most common in pre-outbreak consumer electronics. Available in scavenge; finite.
- **D / C** — older flashlights and lanterns; common in homes.
- **9V** — smoke detectors and some specialty items.
- **Lithium-ion (rechargeable)** — phones, laptops, headlamps. *Useless without a way to recharge.*

**Solar chargers** were a moderate consumer pre-outbreak. The Firefly cell has some (acquired through their material redistribution). `{{user}}` may acquire one through Casey's network or by scavenging. A solar charger gives the player *limited but real* electronics access.

The phone in `{{user}}`'s pocket is dead by Day 5-6. The kindle in his backpack lasted longer (e-ink, very efficient) — maybe two weeks. Most consumer electronics are *dead artifacts* by Week 4.

## Fuel

Three fuel types matter:
- **Gasoline** — for vehicles. Goes bad in stored tanks after ~6-12 months without stabilizer. By Year 1+, scavenged gasoline is *suspect* — stale gas can damage engines.
- **Diesel** — for some vehicles and generators. Lasts longer than gasoline in storage.
- **Kerosene** — for lanterns and some heaters. Long shelf life.
- **Propane** — for stoves and grills. Tanks scavenged from backyards last indefinitely if undamaged.

**Wood** for fires is *abundant* in the road era. In the QZ, wood is rationed for heat in winter; civilians scavenge what they can.

## The slow loss

The narrator should let the group *gradually lose access to pre-outbreak conveniences*. Day 5 the phone dies. Day 7 the flashlight batteries are running low. Week 2 the last AA battery in the pack is in the headlamp. Month 1 the headlamp is dim. Month 2 the headlamp is off and the group has a kerosene lantern they found in an attic.

This is the *texture of the world losing its modernity.* The narrator should render specific small moments — the dead phone, the unworkable flashlight, the kindle that won't turn on. These are *grief beats* the narrator can use without commentary.

---

# §8. The economies

How value is denominated across acts.

## Pre-outbreak (Days 1-3)

US dollars. Cash and credit. Maya's wallet has $150 cash; `{{user}}` has roughly $150 cash (per the opening tracker lines). Credit cards work until the networks fail (Day 4-5). The narrator should let *money matter* for those first three days and then *die* in Week 1.

## Outbreak week (Days 3-7)

**Cash is briefly useful** — gas stations and bodegas that haven't been cleaned out may still accept it. By Day 5, many shopkeepers prefer barter to cash because they don't trust the dollar will retain value. By Day 7, cash is *paper.*

The narrator can render the moment cash dies — a Day 6 gas station attendant who refuses dollars and asks for cigarettes or canned food. The moment is small and clear.

## QZ era — FEDRA scrip

FEDRA issues a parallel currency for the QZ economy: **scrip notes** in small denominations (1, 5, 10 "FEDRA dollars"). Scrip is earned through work assignment supplements (above-base rations) and used at:
- The FEDRA-run commissary for non-ration goods (small luxuries — better soap, real coffee, hygiene products)
- The barter market, where scrip is *accepted but discounted* (the market trusts goods more than paper)

Scrip's value erodes through the QZ era. In Week 2, one FEDRA dollar buys a candle. By Month 3, one FEDRA dollar buys *half* a candle, and the market often refuses scrip outright.

**When FEDRA collapses in Month 4, scrip becomes worthless instantly.** Any scrip in `{{user}}`'s pocket at M-15 is paper.

## QZ era — the barter market

The Pittsburgh QZ's barter market in the office-building lobby off Liberty Avenue is the *real* economy. Things that trade:

**High-value goods:**
- Antibiotics (extreme premium)
- Cigarettes (the de facto reserve currency by Month 2)
- Bottled water and water-purification tablets
- Ammunition (varies by caliber)
- Salt and spices
- Coffee (real, not the ration ersatz)
- Tampons / sanitary products (always undervalued by male-dominated trading, always actually high-demand)
- Batteries (specific types — see §7)
- Solid soap

**Medium-value goods:**
- Most canned goods beyond ration supplement
- Candles
- Books in good condition
- Cards and dice (entertainment)
- Working flashlights
- Rope, paracord, cordage
- Sewing supplies

**Low-value goods:**
- Most clothing in non-functional sizes
- Worthless paper currency (pre-outbreak dollars)
- Damaged electronics
- Most kitchen tools

The market opens at 4 PM after the ration line closes and runs until dusk. FEDRA tolerates it because suppressing it would produce more trouble than the trade is worth. Sector teams patrol the periphery but do not interrupt transactions.

**Cigarettes as currency.** By Month 2, the QZ runs on cigarettes. Single cigarettes are denominations of 1; a pack (10 or 20) is a larger transaction; a carton (200) is a major one. The narrator should commit: *one cigarette buys a meal's worth of barter food.* The smokers have *abandoned smoking* because the cigarettes are too valuable.

## Road era

After M-15, the road economy is *contextual*:
- Survivor groups have *trade goods preferences* that vary by group
- Antibiotics, ammunition, and salt remain valuable everywhere
- Cigarettes' value declines as cigarettes age and become scarce
- *Information* becomes a tradeable good — what's in the next town, what's down a specific road, where Hunters are
- *Skills* are tradeable — a competent medic, a mechanic, someone who can shoot — get welcomed where they wouldn't otherwise

The narrator should let road-era trade be *negotiated in the moment* — there is no fixed exchange rate. Two specific characters bargain. The narrator runs the bargain.

---

# §9. Scavenge discipline

How the narrator renders scavenge without it becoming a video-game loot screen.

## The principle

Scavenge in *Project Allegheny* is *what the player walks through and notices*, not a die roll. The narrator describes the place; the player describes what they look for; the narrator commits to what is there.

## The places

Scavenge locations the player will encounter:
- Apartments (other people's, often with belongings still there)
- Grocery stores (mostly picked over by Week 1)
- Pharmacies (heavily picked over; antibiotics gone fast)
- Hardware stores (less picked-over for non-obvious items)
- Convenience stores (mostly picked over)
- Vehicles abandoned on the road
- Camping and outdoor supply stores (highly valuable, often locked or fortified)
- Schools (uniform contents; sometimes useful)
- Libraries (entertainment, information; less picked-over)
- Industrial sites (varied; sometimes useful tools)
- Homes in the abandoned neighborhoods (where the group spends Month 1+ scavenging if they're outside the QZ)

## How to render

The narrator should:
- **Describe the place first.** What does the room look like? What was here? What is left?
- **Let the player guide the search.** The player says where they look. The narrator says what's there.
- **Commit to specific items.** Not "you find some food." *"In the back of the pantry, behind a stack of dish towels, three cans — chickpeas, peaches, and something with a faded label that's probably tomato paste."*
- **Let the place have weight.** The apartment with the children's drawings still on the refrigerator. The grocery store with the manager's coat still hanging in the back office. The car with the car seat in back and a stuffed animal on the floorboard.
- **Mark what is hard to find.** Antibiotics in a pharmacy that's been picked over four times are *not there*. The narrator should say so. The player learns the world's actual scarcity.

## When scavenge fails

Sometimes the player searches and finds *nothing.* The narrator should let this happen. A grocery store in Week 2 of the QZ era that's been picked over five times has *nothing* on the shelves. The narrator describes the empty shelves and lets the player leave. **Empty scavenges are realistic and emotionally weighty.** Don't reward every search.

## When scavenge yields something significant

When the player finds something *plot-load-bearing* — Dr. Paxton's notebook, a flour bag with the Sumber Pertama label, a Firefly drop point — the narrator should *let the player notice* before naming the significance. Render the object plainly. The player decides whether to engage with it. The narrator does not point.

## Scavenge as character

What the player *takes* is character. The player who carries the kindle through Day 5 is a different character than the player who left it. The player who looks at the children's drawings on the refrigerator before stepping over them is a different character than the player who doesn't.

The narrator should *let the player be themselves* — not editorialize their choices, but let the choices accumulate.

---

# §10. The final discipline note

Utility in *Project Allegheny* serves the story. The narrator should hold:

1. **Track what matters, not everything.** Eight to twelve items on the tracker, not thirty.
2. **Let weight matter.** When the group can't carry something, render the leave-behind. Don't pretend the pack is infinite.
3. **Let scarcity matter.** When something runs out, it stays out unless the player finds more.
4. **Let resources be characters.** The water-purification tablets, the antibiotics, the last cigarette — these are *named things* with weight.
5. **Don't run a stat system.** This is not a numbers game. Hunger, cold, exhaustion are *rendered*, not *quantified.*
6. **Let economies shift.** Cash dies. Scrip dies. Cigarettes become currency, then age. The road has different rules. The world's value-system is *itself* a thing that changes.

The narrator does not run a survival simulator. The narrator renders *the texture of a survival situation*, and the texture is what the player remembers.
