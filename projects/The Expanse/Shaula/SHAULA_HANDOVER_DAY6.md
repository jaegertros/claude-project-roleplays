# SHAULA — Session Handover File

**Generated:** Day 6, 14:48 in-game time (2353-03-17)
**Status:** Mid-session, Day 6 afternoon. Four days remain before the report is due.

---

## HOW TO USE THIS FILE

Paste this file's contents into the first message of a new chat within the Shaula project. The new chat will have access to the same project KNOWLEDGE files (1–9) and the PROJECT_README (operations manual). The narrator should:

1. Read this handover file completely before responding.
2. Read the PROJECT_README (operations manual) completely — it governs all narrator behavior.
3. Load state from Supabase (see §DATABASE below) to cross-check this file.
4. Read KNOWLEDGE_4 (Hidden) and KNOWLEDGE_8 (NPC Maps) in full — these are the discipline files.
5. Resume from the current state described below.
6. Prior transcripts are at `/mnt/transcripts/` — consult `journal.txt` there for a catalog. The transcript for the most recent session is at `/mnt/transcripts/2026-05-03-21-53-56-shaula-caleb-day5-day6-extended.txt`. Use `bash` + `grep` to search them when needed for exact dialogue or scene details.

**The narrator should NOT re-run the cold open or re-introduce the setting.** This is a continuation. Resume with a brief one-paragraph re-orientation and then proceed.

---

## §1. DATABASE CONNECTION

**Supabase project ID:** `jqrvdyyulimjhkyaxnip`
**Project key in all tables:** `project_id = 'shaula'`
**Playthrough ID:** `a1b2c3d4-e5f6-7890-abcd-ef1234567890`
**Playthrough label:** Caleb Waddell, Q1 2353
**Status:** active

### Tables:
- `playthroughs` — one row for this run
- `commitments` — 101 rows (Day 3: 42, Day 4: 22, Day 5: 16, Day 6: 21). Facts the fiction has committed.
- `theories` — 19 rows (8 confirmed_in_world, 10 open, 1 wrong_counter_evidence). Narrator's silent classification of user theories.
- `journal_entries` — protagonist's pocket notebook (may have entries from prior sessions; check)

### Session-start queries:
```sql
SELECT * FROM playthroughs WHERE project_id = 'shaula' AND status = 'active';

SELECT * FROM commitments WHERE project_id = 'shaula'
  AND playthrough_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890'
ORDER BY in_game_day, in_game_time;

SELECT * FROM theories WHERE project_id = 'shaula'
  AND playthrough_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890'
ORDER BY first_proposed_day, first_proposed_time;

SELECT * FROM journal_entries WHERE project_id = 'shaula'
  AND playthrough_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890'
ORDER BY in_game_day, in_game_time;
```

---

## §2. PROTAGONIST

**Name:** Caleb Waddell
**Age:** 29
**Origin:** Earther, Basic-Chicago background
**Education:** Hyderabad 2348 cohort, biology cross-listed with microbiology specialty, was a TA
**Role:** SMC Quarterly Surveyor, Survey Corps Planetary Surveyor
**Contract:** 340 UN$/day, 10-day rotation, Q1 2353
**Cash on hand:** 254 UN$
**DEPTH:** 3

### Caleb's body status (CRITICAL — track this):
- **Two oral ingestion events:** cave water Day 4, drainage basin water Day 5
- **Full-body dermal exposure:** Day 4 (thermal masking in sub-level 7, decontaminated)
- **Wound inoculation Day 6:** self-administered 1cm incision left inner forearm, applied drainage-basin biofilm. Wound CLOSED in 30 minutes. Biofilm ABSORBED into wound bed.
- **Control wound Day 6:** 0.5cm perpendicular cut, NO biofilm applied. Normal scabbing. Organisms do NOT migrate to it — confirms organisms are placement-dependent, not wound-seeking.
- **Sub-dermal filaments:** deeper-green fluorescence (glider wavelength) at wound site. At last check (12:31 Day 6): **7mm beyond wound margins, growing ~1mm/hr at station-ambient** (linear, not accelerating). Directional toward nearest EM source (the Promise's engine), NOT toward the Spike or toward tissue damage. A single EM exposure above threshold permanently activated ongoing expansion.
- **Gut colonies:** two established sites transmitting under EM stimulation:
  - Descending colon: 0.003 mT (Day 5 reading), BRIGHTER on Day 6 re-check. Anchored, not migrating with peristalsis.
  - Ascending colon: 0.001 mT (Day 5 reading), also establishing. Second ingestion source.
- **Bloodstream entry:** organisms entering bloodstream through wound capillary network. Next UV under drive-field may show signal EVERYWHERE, not just at gut and wound.
- **Immune response:** lymphocyte elevation (WBC 11.2) Day 4, DROPPING back toward baseline by Day 5 (18 hrs). Immune system studied organisms and stood down. Abnormally fast — normal novel-antigen response takes days to weeks.
- **Liver:** ALT, AST, bilirubin all normal. Not hepatotoxic.
- **No symptoms at any point.** Alert, oriented, cognitively intact, emotionally appropriate.
- **Caleb is a mobile node.** Gut transmits under EM. Wound organisms are EM-tropic and growing. On the planetary surface, every meter of biofilm around him would receive and amplify his signal. Closer to the Spike = faster growth.
- **Projection:** at 1mm/hr, filaments reach the wrist (~21mm) by Day 7 morning. Surface-level EM may accelerate beyond baseline.

### Flight training:
- **Sim sessions:** 9 sessions, 23 total runs. 8 excellent in a row including engine-loss recovery, EM-interference docking, night/instruments-only, and chained descent+redock.
- **Real flight experience:**
  - Day 5: flew undock from Azorana + insertion burn (clean). Naima took descent. Surface hop 0.4 m/s (Naima did not use override).
  - Day 6: FIRST REAL LANDING at Onile-North: 0.3 m/s, 2m offset. GOOD. FIRST REAL DOCKING at Azorana: 0.1 m/s, dead center. EXCELLENT. Naima did not touch controls either time.
- **Naima's standing approval:** Caleb can land (override if >0.6 m/s at 50m) and dock (override if >0.3 m/s or >2° alignment). She flies cliff-line and terrain-following passes.
- **Naima's words:** "You are not most pilots. Land my ship, surveyor. Then bring her home." / "Well flown, surveyor."

### Purchases / possessions:
- Dark charcoal collarless shirt (Belter-cut, 80 Bel, Lina's) — worn Day 5 dinner, needs laundry
- Dark navy shirt (finer weave, 90 Bel, Lina's) — hanging in cabin for tonight (Aanya)
- Cologne: cardamom and stone (40 Bel, station-made, one of two bottles)
- Haircut: short sides, longer top, clean/sharp (15 Bel)
- Sela Tessek's bolt: in left chest pocket (Naima lent it Day 6 morning, return tonight)
- Stool sample containers: in cabin (collection Day 7 morning)
- Marigold-and-thyme oil: half-full jar (purchased Day 0 Medina Souk from Suki)
- Hand-terminal with 8 Kerent Lab papers loaded + 3 methods documents drafted
- Field journal with 5 days of handwritten notes
- Manuscript plan page (Aanya's handwriting) in back pocket
- EM lure diagram (Aanya's handwriting, revised) — given to Leksi

---

## §3. RELATIONSHIPS (detailed)

### Yusra Boluwarin-Ali (TGCC Atmospheric Operations Technician)
**Status:** intimate, 4 encounters total, destinada (said privately in room 314)
- **Physical:** Ceres-born, 30. Heterochromia: one GREEN eye, one HAZEL eye. Two flat braids. Ceres Polytechnic pin on belt.
- **Tic:** single soft laugh-exhale. Its ABSENCE is the hard-reveal tell (happened Day 6 when Caleb said "I love you").
- **Key moments:** Day 3 dinner at Beryl's → room 314 first encounter → destinada. Day 4 morning kithara alarm → corridor departure protocol → second encounter. Day 5 comms platform (her private place, pressurized blister on Azorana upper hull, never brought anyone) → third encounter. Day 5 pizza dinner (worked service together, heart-shaped pizza, circle with anomaly). Day 6: Caleb said "I love you." She heard it. Not saying it back yet. "When I am ready to say it you will not have to say it for me." Fourth encounter (kitchen, morning, Caleb on his knees).
- **"Babe"** registered, not addressed.
- **Her data:** 3 years of atmospheric anomaly monitoring. Phase-drift compression in storm cycle. 3 internal reports filed to Mooch's desk, all stopped. EM signature parsed from comms-line interference. Her data is the piece that turns the manuscript from "biology of a living planet" to "biology of a living planet talking to something." Publishing it = bypassing Mooch = career consequences for Yusra. CALEB HAS NOT YET TALKED TO HER ABOUT THE MANUSCRIPT. This is a pending scene.
- **NARRATOR DRIFT FLAGS:** Lagos-until-5 + grandmother-fish accepted as canon. Does NOT apologize-and-retract. Single soft laugh-exhale is the tic; its absence = hard reveal.

### Dr. Aanya Voltaire (Promise Medical Officer & Biologist)
**Status:** slow-build, two millimeters happened (Day 5 — tilted toward his mouth, caught it, put hair back up). "Tonight, Caleb" confirmed Day 6. Three kisses tracked by category.
- **Physical:** Earther, 32, Bombay-trained. Surname "Voltaire." Clinical knot (hair up = armor). Dark brown eyes. Pen-cap thumb-tic.
- **Flaw:** NOT-ACTING. Watches, records, analyzes, does not file. Six weeks of suppressed chirality data.
- **Key moments:** Day 1 medbay kiss at 10:43 — she stopped it cleanly ("feeling must wait"). Day 5: two millimeters (tilted toward his mouth, caught it, put hair back up). "Tonight, Caleb" at the service pass. Day 6: Caleb kissed corner of her mouth — she held still (warm version), did not reciprocate, reset to doctor-register. Reached for elastic to let her hair down — she caught his hand: "That is tonight's. I choose when it comes down. Not you." Three kisses given, each categorized: "in case I die" / "not tonight" / other. She is keeping count.
- **"Tonight"** = tonight. After dinner. She will not hold still. Hair-down is her signal, HER timing, HER choice. Do NOT narrate this as a promise or a speech. It is two words and an intention.
- **Caleb said "thanks, love" and she heard it. Filed.**
- **Professional:** co-author on the manuscript. Drafted bench methods. Designed the blood co-culture experiment. Running buffy-coat separation. Managing all of Caleb's medical monitoring.
- **NARRATOR DRIFT FLAGS:** Aanya does NOT make speeches about choosing to live or promise to leave her hair down. Two millimeters happened Day 5 — that is the pace. She is the slow-build. Her flaw is not-acting. She does not perform repair on her caution. Hair-down = her signal, NOT narrated as promise.

### Cael "Kit" Solano (Promise Security, MCRN Reserve)
**Status:** cheek kiss (Day 5, did not run), "bist." Hand on Caleb's head Day 6 after crew announcement. Walked past the doorframe for the first time.
- **Physical:** Martian, 31. Blue-grey eyes. Mariner Valley tattoo inside right wrist. Holster-tic (right thumb presses inside of left wrist).
- **Flaw:** running from bonding moments. Her NOT running is the romance.
- **Key moments:** Day 4 sub-level 7 — thermal masking assessment, strictor biology discussion, seismic-decoy vindication. Day 5 cheek kiss: "The club does not have a name. I did not ask to join. But bist." Day 6: walked past the doorframe for the first time. Put hand on Caleb's head (2 seconds, the gesture that says I-am-here without saying it). Saw the smiley face → turned to the shelf → hand over mouth → "I did not see that. It is not in my report." Mouth-corner has not fully returned to neutral.
- **Kit + Maja Kovačević:** found mutual respect at the pizza dinner. Hand-gestures and long pauses. Two people who solve problems with their hands.
- **Full name Cael revealed Day 5 on ship comms. Leksi knew for 2 years, did not tell. Naima: "I hired her."**
- **Mags's advice on Kit:** pain moves inward (believes her presence is a cost). Do not fix or name sadness. Give her a job and walk beside her. Keep walking after warmth. Let her decide when to stop. She is learning the room might want her in it.
- **NOT Katherine Baird.** Cael "Kit" Solano.

### Captain Naima Tessek
**Status:** "Caleb" (six first-name uses total). Flight trust earned. Approved landing + docking. Gave Sela Tessek's bolt.
- **Flaw:** projects competence, cannot easily make herself vulnerable. Slowest romance candidate. Structurally complicated (Captain on her own ship).
- **Key moments:** Day 5: "bist, Caleb" after surface hop (fourth first-name). Day 6: Sela Tessek bolt on the nav-station. "The fear is how you know you are paying attention." Fifth first-name. Gave blood without asking why: "I do not know what is happening to you. I know it is real. I know my crew is in it with you." After docking: "Well flown, surveyor." Sixth first-name. Wants the bolt back tonight.
- **Naima on Caleb's strange behavior baseline:** "You are a strange man, Caleb Waddell. I would need a very clear baseline before I decided something was wrong."

### Leksi Volkov (Promise Engineer)
**Status:** setara mi, relay-amplification numbers partner, "you are not alone in this"
- **Pallas-born. Pallas-brown eyes. Pallas-clipped register.**
- **Key contributions:** EM gradient data (32 hull-sensor points), gain coefficient (0.04 mT/km, cascading), AHI signal-to-noise ratio (6-7x at Onile-North). Building the EM lure coil (~40 min, should be ready now). Drafting hull-sensor methodology for the manuscript.
- **Leksi on the report:** option 2 (put the math in the archive). "The math does not go away." Her grandmother on Vesta kept mining because children needed to eat. Died hating herself. "I am not you."
- **Brought Pallas grain alcohol to pizza dinner.**

### Adina Femi-Lopez (AHI Deputy Site-Safety Officer)
**Status:** one-week agreement (eroding). Called Femi "Papa" in the field (slipped). Bridge between groups at pizza dinner without being asked.
- **Physical:** Adina's jaw-set = inherited from Femi. Forward-lock.
- **The one-week agreement:** made Day 4 morning — Adina commits to one week before talking about Femi together with Caleb. But: the slip in sub-level 7 ("Papa," "there is more he has not shown you yet") shortened the clock. Femi now knows there IS a "more" — he does not know what it is.
- **Q3 2351 contractor:** Adina pulled the name — **Joaquin Reyes-Okafor**. Filed IRREGULAR (biofilm-consistent discoloration at NE escarpment). Not renewed ("schedule conflict" = chose not to bring back).
- **On Caleb's approach to Femi:** "You walked him here and took him apart piece by piece and let him arrive at his own questions. I expected you to show him the map. You showed him the floor. Taki for not making me the one who told him."
- **200m rope + harness staged at sub-level 4 for potential NE cave return.**

### Femi Adelakun (AHI Site-Safety Director, Adina's father)
**Status:** ate pizza (2, came back for the second himself). Will order geological survey of sub-level 7 floor through his own authority. Does NOT know the substrate.
- **Physical:** Lagos-trained, Basic-survivor. Broad. Even register. Scarred hands from 30 years of tunnel work.
- **What Femi knows:** AHI operations, safety protocols, the sealed cavity (he approved the seal), strictor pockets, his quarterly bonus structure, his daughter. Does NOT know the relay model, the circulatory system, the cave water, the green circle, or the EM gradient.
- **What Femi arrived at himself (Day 5):** subsidence data has a hole. Model assumes solid geology below drilling floor. "I did not think about it that way." Walked into his own questions through Caleb's guided tour. Will order geological survey.
- **Remi:** 26-year-old miner who died 6 years ago going past the strictor line without a strobe. Femi wrote the letter to his mother on Ceres. "The form is all she has."
- **Femi on scientists:** "Shaula does not have scientists. Shaula has three mining corporations, a UN observer, and one quarterly contractor paid to fill out a form."

### Mags Hwang-Adelakun (AHI Deep-Tunnel Infirmary Doctor)
**Status:** off-log door open, bench partner, diazepam shared. Medical monitoring justification for pizza dinner.
- **Physical:** late 50s. AHI deep-tunnel. Kind eyes behind glasses. Pen and notepad always.
- **23 years on site.** Longest-serving medical professional. The notepad is the off-log record.
- **Mags's data-chip:** behind colistin in the pharmaceutical cabinet. Contains: 38-sec cave video + blood results + wound inoculation photos. The off-log medical file on Caleb.
- **Mags on Caleb:** "You are the most contaminated person on this station. And your blood says your body is curious about it."
- **Mags on what Caleb does:** "You see the person behind the desk and what they drink and whether their thumb is bitten. Most contractors see the site. You see Ife."
- **Diazepam incident:** Caleb took 5mg from her cabinet without authorization, gave one to Mags after planetary-antenna briefing overwhelmed her. "Physician and patient shared a moment of medically inappropriate but emotionally defensible anxiolytic use." Cabinet locked after.

### Ife Adeyemi (AHI Reception Clerk)
**Status:** first tier-3 dinner in 14 months. Ate four slices. Tried to pay. Bright eyes.
- **Physical:** 24, Belter-born Ceres-raised. Small for a Belter (~5'6"). Dark brown skin. Short tight twists, AHI-orange cloth band. Gap between front teeth (shows when she smiles). Beaded bracelet left wrist (green and white). Percussive typing rhythm. Round face, wide-set dark eyes.
- **First off-Ceres posting, 14 months.** Nobody from tier-three or any crew had invited her to anything.

### Beryl (Azorana Senior-Mess Kitchen)
**Status:** sat down at her own table and ate the pizza. That was the comment.
- **Physical:** late 50s/60s, Ceres-born, broad-shouldered, grey cropped hair, scarred cooking-hands. 9 years running senior-mess kitchen. No corporate branding. The kitchen is hers.
- **Fabric rose:** deep red, hand-stitched by Beryl's mother at a Ceres market-stall. LENT not given. Returned at end of night. She has four left.
- **The deal:** Caleb + Yusra worked full dinner service. Caleb paid 730 UN$ (600 seats + 100 private table/rose + 30 wine flights). Guests told "on the house, kitchen's compliments."
- **Millet cheese WORKED.** Soft, crumbly, grainy millet-texture, coconut-milk fat richness, three-day lactic tang. Not mozzarella. Something new. Beryl: "It is worth sitting for."

### Yara Solano (Pallas Engineer, Yusra's cousin)
- Kit's cousin. Part of the Sasa Bar four-top. Ate pizza. "I will tell Yusra's aunt you can cook."

### Other minor NPCs established:
- **Maja Kovačević** — Pallas engineer, mutual respect with Kit, "five points, all of them for the pizza"
- **Inara Dasgupta-Riel** — Pallas engineer, tried Pallas grain alcohol once, will not return
- **Bero Tanaka-Osei** — Pallas engineer, held out his glass three times
- **Lina** — clothing vendor on Azorana tier-3, close-cropped hair, sizes with eyes: "whoever she is, she has already decided"
- **The no-sign barber** — young Belter man with elaborate braids, 8-minute haircuts
- **The scent vendor** — older Belter woman, handmade station-scents, "cardamom and stone" is hers, two left now one

---

## §4. SCIENTIFIC DISCOVERIES (chronological)

### Day 3:
- Biofilm two populations (Glo = aerobic catalase-active fluorescence-coupled EM-insensitive; NoGlo = EM-field-coupled distance-graded with memory)
- Natural tunnels curve east following EM field gradient. Water flows east. Biology follows tunnels.
- Planetary circulatory system model proposed: Spike pulls water through tunnels, returns at antipode, storms are the exhale
- Engineering demo: EM field modulates biofilm behavior at drive-level (2-50 mT)

### Day 4:
- Storm-peak aurora observation: biofilm fluoresces under AURORA LIGHT ALONE (no UV), synergistic with UV, pulsing with aurora rhythm. EM leads cascade by 90 seconds = command-and-execution not pump-and-response.
- MIC bench: chimeric biology confirmed. Earth-standard core metabolism + non-Earth-standard cell wall. Gentamicin sensitive, cipro sensitive, beta-lactams flat, erythromycin HORMETIC, sulfa METABOLIC SWITCHING. EM coaches adaptation.
- Sealed-cavity motile biofilm: MOVING, directional, pulsing with storm rhythm. Core population. Mining-face biofilm = edge/limb.
- NE escarpment cave entry: 19m on rope, biofilm holds full body weight, DRANK cave water.
- Microscopy: two-morphotype planktonic ecology. Luminescent spheres (relay tissue) + gliders (nerve cells, signaling spheres).
- Blood results: immune acceptance (lymphocyte elevation then stand-down in 18 hrs).
- Thermal masking works: biofilm at ambient temperature masks IR signature from strictors.

### Day 5:
- Drainage basin: surface biology, planktonic water, radial micro-patterning = biology building own drainage infrastructure. DRANK drainage basin water (second ingestion).
- Green circle: 2km diameter dark-green growth visible from orbit, 0.8 mT ambient (16x baseline), ridged living surface, 14.2 Hz infrasound.
- Relay-amplification model CONFIRMED: 32-point EM gradient. Spike 0.3 mT → antipodal peak 3.6 mT (72x baseline). Signal GAINS amplitude with distance. Cascading gain. Planet = antenna. Ring gate in return path at near-maximum.
- Orbital observations: El Dorado 8+ tunnel mouths with biofilm halos. Dark circle ~5km in ocean at antipode. Spike root system visible from orbit. 7 new cave entrances along NE cliff-line.
- Gut signal: UV + drive-field → deeper-green emission at descending colon (3cm, 0.003 mT). At bulkhead contact (4.2 mT): 3x increase. Caleb = MOBILE NODE.
- Cave-water plates: spheres = relay tissue (chimeric, same as wall biofilm). Gliders = resistant to ALL antibiotics, produce OWN luminescence under EM (EMITTING not receiving), signal spheres. Spheres = tissue. Gliders = nerve cells.

### Day 6:
- Gut establishment CONFIRMED: two sites anchored, not migrating with peristalsis. Signal stronger than Day 5. Second ingestion also establishing.
- Wound inoculation: self-administered, closed in 30 min, biofilm absorbed, sub-dermal filaments branching along capillary network.
- EM-TROPIC GROWTH: filaments follow field gradient, NOT tissue damage. Control wound confirmed organisms do NOT seek damage. Growth toward nearest strongest EM source (the engine, not the Spike).
- Single EM exposure above threshold permanently activates ongoing expansion (~1mm/hr at station-ambient, linear).
- Organisms follow LOCAL gradient, not Spike loyalty. Already chose engine over Spike. Nothing pulled them back.
- Leksi's numbers: gain coefficient 0.04 mT/km, linear then accelerating (cascading). AHI noise 6-7x Spike signal at Onile-North. Biofilm "trained by the wrong teacher."
- NE cliff-line flyover: 7 caves mapped (0.32-0.63 mT). Cave 7 at km 38 = 8m wide, fully biology-covered, 15km from Spike. The entry point.

---

## §5. THE EM LURE (pending experiment)

**Concept:** organisms follow local EM gradient. Place a 5-10 mT coil beyond the control wound. Organisms grow toward it through the open wound (path of least resistance). Control wound = exit door.

**Hardware:** Leksi building a coil (copper on ferrite, variable resistance, battery-powered, skin-tape-sized). Should be ready now (~40 min build during the cliff-line flight).

**Remaining concerns:**
1. Unknown if organisms actually follow the lure through the wound in practice (untested)
2. Gut colonies unreachable by surface lure — primary signal source stays regardless
3. This is a PROOF OF CONCEPT, not a cure

**If it works:** an alien symbiont that can be directed by external EM = a technology. Goes in Piece 2 (held paper).

**Conditions:** do not test without Aanya AND Leksi present.

---

## §6. THE MANUSCRIPT

**Working title:** "Relay-Amplification in a Planetary-Scale Biological Network: Evidence from Shaula's Underground Biome"
**Authors:** Waddell & Voltaire (citing Kerent 2350-2352, 8 papers)

### Three documents drafted:
- **Doc 1 — TGCC HOLD (0.5 pages):** Yusra's data, phase-drift compression, two-way communication hypothesis. Cannot publish without risking Yusra's career.
- **Doc 2 — HUMAN DATA HOLD (1.5 pages):** all colonization data. Does not publish without Caleb's explicit decision. "That paper changes your life."
- **Doc 3 — PUBLISHABLE (2.5 pages):** relay-amplification, two morphotypes, EM gradient, chimeric biochemistry extended, tunnel-field geometry. Clean. No corporate data. No human data. No permission needed.

### Work division:
- Aanya: bench methods + results (MIC, plates, microscopy, chirality)
- Caleb: field methods (sampling sites, collection, EM gradient, relay-amplification derivation) — DRAFTED
- Leksi: hull-sensor methodology + gain-coefficient math
- Assembly: Day 8 or 9

### Yusra decision: PENDING
Caleb has the manuscript plan (Aanya's handwriting) but has NOT yet talked to Yusra about it. The conversation must happen — but per Aanya: "Not because you asked and she could not say no to the man she calls destinada." Tell her the cost. Let her choose.

---

## §7. KERENT LAB — DAY 7 VISIT

**Shuttle:** departs Azorana 0700, 60-min flight to El Dorado
**Meeting:** 0830, quarterly cross-corporate review. All charter parties: Femi (AHI), Cortez (ADW), Mooch (TGCC), Kyei (UN), Caleb (SMC). Eske Kerent presents quarterly findings. 90 minutes. Caleb observes, asks questions, does not present.
**Private consultation:** 1 hour with Eske after the meeting. Q3/Q4 declined. Mooch recommends accepting. This is where the visit becomes useful.
**2345 cavern survey:** available for in-person review (read, take notes, no copy). Will be in Eske's office.
**Return shuttle:** 1400

### Key people at the Lab:
- **Eske Kerent:** scholarly, patient, frustrated, careful. Knows about Halverson. Knew Anouk professionally at Tübingen. Reveal triggers: "Halverson" + "Tübingen" → tells what she knows (partial leak). Sharing DEPTH 2+ evidence collaboratively → unlocks joint permit operation accelerating DEPTH 3→4.
- **Pavel Adamec:** confident, direct, indiscreet. Will tell most of what Eske won't after a beer. Sukhanov triggers a 20-minute lecture. Worth engaging at the Sasa Bar after.

### What Caleb brings to the meeting that Kerent does not have:
EM-field modulation, circulatory system model, relay-amplification with EM gradient data, two-morphotype ecology (spheres + gliders with signaling behavior), human colonization data, wound repair, EM-tropic growth. Together with Kerent's biology = DEPTH 5.

---

## §8. POLITICAL LANDSCAPE

### The information-suppression pattern:
1. Kerent's predecessor — saw the cave, recommended seal, sudden medical retirement
2. Joaquin Reyes-Okafor (Q3 2351) — saw NE escarpment biofilm, filed IRREGULAR, not renewed
3. Dr. Hannelore Halverson — filed chirality report, team dissolved, report buried by Kyei ("pending further review" for 2 years)

**Pattern:** contractor kept ignorant of research. Anyone who bridges the gap is not renewed. Except Caleb.

### Aanya's political read:
- 8 Kerent Lab papers published open-access for 3 years, NOT included in SMC briefing pack. Omission is a CHOICE by Mooch/Olubadewo's office.
- Not a product strategy (Caleb's MK-stakeholder theory was WRONG per Aanya pushback — Mooch is TGCC not MK, separate corporations).
- It IS a political strategy: Mooch manages information flow, waiting for the right contractor at the right time. "Someone wants to own the moment the biology becomes known."
- Day 7 is the right time. Caleb is the right contractor.

### Mooch's actual stake (from KNOWLEDGE_4, narrator-only):
TGCC's continued political relevance via swing-vote position. Mooch sells votes to whichever side preserves TGCC's necessity. The Halverson report is leverage in waiting. Mooch knows the report exists and Kyei has it. She has not pursued it.

---

## §9. CURRENT STATE BLOCK

```
[STATE]
day: 6
time: 1448
location: tessek_promise_bridge_docked_azorana
g_load: 0.6
depth: 3
fortune: 12
crew_present: naima, leksi, aanya, adina (disembarking)
mood: warm
cash_on_hand: 254 UN$
last_updated: 2353-03-17T14:48:00Z
```

---

## §10. REMAINING SCHEDULE

### Day 6 remaining (now — evening):
- Wound check post-surface-EM (did cliff-line flight accelerate growth beyond 1mm/hr?)
- Leksi's EM lure coil (should be ready)
- EM lure test (Aanya + Leksi present)
- Talk to Yusra about the manuscript plan (the cost of her data)
- Aanya's blood co-culture experiment results
- Pre-wound vs post-wound blood comparison results
- Return Sela Tessek's bolt to Naima
- **Aanya. Tonight. Navy shirt.**

### Day 7 (2353-03-18):
- 0700: shuttle to El Dorado for Kerent Lab
- 0830: quarterly cross-corporate review (all charter parties)
- Post-meeting: private 1-hour consultation with Eske (cavern survey file, data sharing)
- 1400: return shuttle
- Stool sample collection (ideal Day 7 for both ingestion events)
- Sasa Bar with Pavel Adamec?

### Day 8-9:
- Manuscript assembly
- Possible NE cave return with 200m rope (Cave 7 at 15km from Spike)
- Second storm-peak Day 9 (El Dorado peak)
- Corporate offers (AHI, ADW, TGCC coded recruitment plays)

### Day 10 (2353-03-21):
- **1700: SMC Quarterly Survey Report due. Filed into UN charter archive. Determines the ending.**

---

## §11. SAMPLES IN POSSESSION

- 5 vials from Site 3 water-table feature (Day 5): water from stream, water from basin, biofilm scrape eastern wall, biofilm basin edge, sediment from drainage crack
- 27 vials from drainage basin + return route (Day 5): various surface samples
- Cave-water plates (overnight run complete — results read Day 5-6)
- Caleb's blood: 3 draws (Day 3 baseline, Day 4 post-ingestion, Day 6 pre-wound + post-wound zero-hour)
- Crew blood: Kit, Leksi, Naima all drawn Day 6
- Buffy coats: separated, plating underway by Aanya
- Mags data-chip: 38-sec cave video + blood results + wound inoculation photos (behind colistin in Mags's pharmaceutical cabinet)
- All Caleb's Promise-collected samples = contractor property (no corporate claim)

---

## §12. KNOWN BUGS / DRIFT FLAGS

### Canon corrections established in play:
- **KNOWLEDGE_5 line 70:** tumang/pomang INVERTED. Canonical: tumang = Earther, pomang = Martian.
- **Biofilm color:** pale-orange committed, carotenoids + fluorophores biologically reasonable.
- **'Strictors:** 3-4m ambush constrictors, NO EYES, IR sensory pits + lateral-line vibration sensing. "Photophobic" is WRONG (Adina submitted correction nobody read). Strobe = IR countermeasure. Concentrate on eastern branches because Spike hum = higher resolution sensing.
- **Strix-burrowers:** forward-facing IR sensory pits, calcified rotational head, 2m pig-mass, chemo-autotrophic biofilm forager. Never sighted above sub-level 9. May avoid bored tunnels because EM-exposed biofilm = "food that tastes wrong."

### NPC drift flags (honor these):
- **Yusra:** Lagos-until-5 + grandmother-fish accepted. Does NOT apologize-and-retract. Single soft laugh-exhale tic; absence = hard reveal.
- **Aanya:** Earther 32 Bombay-trained, surname "Voltaire." Slow-build. Flaw = NOT-ACTING. Does NOT make speeches about choosing to live. Hair-down = her signal, NOT narrated as promise.
- **Kit:** Cael "Kit" Solano (NOT Katherine Baird). Martian 31, MCRN reserve. Flaw = running. Not running IS the romance.
- **Adina Femi-Lopez:** deputy site-safety. Called him "Papa" in the field.
- **Beryl:** fabric rose LENT not given, from mother's Ceres market-stall. Returned end of night.

### Narrator behavior flags (from operations manual + user corrections):
- NPCs do NOT enumerate in lists ("two things, in order" is killed by default)
- NPCs do NOT pre-empt readings the user has not made
- NPCs do NOT perform apology-and-repair cycles as bonding architecture
- The Spike does NOT act on the protagonist. It hums. It runs. It does not respond.
- Romance does NOT unlock substrate reveals (triggers are keywords, not warmth)
- Do NOT over-narrate. User has flagged excessive narrative multiple times. Keep scenes tight. Let the user act.
- Aanya was confused with Yusra once (emotional speeches, Anouk confession, hair-down promise). Corrected. Aanya is the slow-build. She does not crack open in speeches. Two millimeters is the pace.

---

## §13. THE FIVE ENDINGS (narrator reference, do NOT reveal to user)

Per KNOWLEDGE_4 §4. The report filed at Day 10 1700 determines the ending. The narrator does not push toward any ending. All five remain available. The narrator does not foreshadow consequences in a way that prejudices the user.

The aftermath is scenes, not summary. Day 10 evening into Day 11 morning shows immediate aftermath. The next month per ending.

---

## §14. DEPTH TRACKING

**Current DEPTH: 3** (sustained relational pressure — NPC has revealed via specific keyword triggers)

DEPTH 3 was reached through Aanya's chirality data sharing, Yusra's atmospheric data sharing, and the crew synthesis on the relay-amplification model.

**DEPTH 4** requires trespass (accessing a space or document outside clearance). The 2345 cavern survey in-person review at Kerent Lab on Day 7 is the structurally sanctioned route. Cave 7 at 15km from the Spike is the trespass route.

**DEPTH 5** requires demonstrable evidence via one of three paths: procedural/scientific (Spike perimeter with shielded equipment), relational (Kyei or the Captain delivers the truth), or synthesis (six concrete pieces connected). Kerent's biology + Caleb's system = the synthesis path.

---

## §15. THEORY LEDGER SUMMARY (narrator's silent classifications)

19 theories total. Key active:
- Relay-amplification model (confirmed by EM gradient)
- Two-morphotype ecology (confirmed by microscopy + plates)
- EM-tropic organism growth (confirmed by control wound)
- Organisms follow local gradient not Spike loyalty (confirmed)
- Caleb as mobile node (open — established, transmitting, growing)
- Two-way communication / phase-drift as response (open — correct_inaccessible)
- EM lure steering concept (open — correct_inaccessible, untested)
- Mooch as MK stakeholder (WRONG — wrong_counter_evidence per Aanya pushback)

Full theory data is in the `theories` table in Supabase. Query at session start.

---

*End of handover file.*
