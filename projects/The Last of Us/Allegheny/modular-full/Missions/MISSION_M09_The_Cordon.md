# M-09: The Cordon

**ACT:** Day 6, Thursday
**TRIGGER:** The player has chosen to enter the FEDRA QZ, or has been forced toward an entry point by circumstances (running from infected, evacuating Lawrenceville, looking for someone). The group approaches a FEDRA checkpoint at a bridge or street barrier.
**ANCHOR LOCATION:** A FEDRA checkpoint on the Pittsburgh QZ perimeter. Default: the Sixteenth Street Bridge (the Roberto Clemente Bridge) connecting downtown to the north shore — yellow steel suspension, walkway converted to civilian processing lanes. Alternates: the Fort Pitt Bridge southbound; the Veterans Bridge.
**PRESENT NPCS:** Maya, Mike (if alive), Victor (if joining), **Drake** (Lieutenant Andrew Drake — FEDRA officer in command of this sector cordon), **Ray** (Rachael Cordero — FEDRA enlisted, in uniform, present at this scanner station — first sighting of her), other FEDRA personnel as needed
**MORTALITY-ELIGIBLE:** no (in default form; if the bite-scanner produces an unexpected positive on a group member, escalates to a mortality-eligible moment)

## PREMISE

The cordon. FEDRA has the bridge held. Civilians are being processed through scanner lanes — bite detection by finger-prick blood draw. Positive results are removed. The group approaches the line. They have hours of walking behind them. They have been seen by FEDRA before they decide whether they want to be.

## SPECTACLE

- The bridge: yellow steel against an October sky, the Allegheny gray-green underneath, the wind off the water
- The checkpoint: concertina wire on the approach, plywood barriers narrowing the bridge to two civilian lanes, FEDRA personnel in green-tan combat uniforms with weapons slung
- The civilians ahead in line: families with bags, individuals with too little, the visible exhaustion of three days of not-sleeping
- The scanner kits: a small folding table at each lane, a FEDRA enlisted at each table running blood tests by finger-prick
- The trucks at the south end of the bridge: where the bite-positive go

## THE BEAT

- The approach. The line is moving slowly — fifteen people ahead of the group, then ten, then five. Time to be afraid. Time to plan.
- The first interaction with FEDRA. **Drake** is the officer of record at this lane — he is not at the scanner station personally; he is at the command tent twenty yards back. **Ray** is at the scanner station; she draws blood from the group one at a time.
- The conversation Drake has with the group, brief and procedural: *"Step to the line. Hands at your sides. Speak only when prompted. This will go faster if you cooperate."* (His canon line from `KNOWLEDGE_1_Cast.md`.)
- Ray's interactions are softer in volume, harder in precision. She does her job. She is observing the group as she works — see Ray's `interaction_logic.how_she_reads_the_player`.
- The scans. The group is scanned one by one. If no one has been bitten, all scans return negative within thirty seconds.
- **If anyone has been bitten and hidden it** (rare but possible if the player has been playing a specific path), the scan returns positive. FEDRA's procedure activates immediately: the bite-positive is restrained, removed to the trucks. The narrator runs this scene at full weight. The remaining group cannot help.
- The scans complete. The group is cleared for entry into the QZ. They are handed paper slips with QZ-processing instructions: report to the Convention Center for registration; assigned barracks; ration cards; work assignments.
- They walk past the cordon onto the bridge proper, then into downtown. The QZ has them now.

## EXIT CONDITIONS

- The group has been processed and admitted (the default outcome if no one is bitten)
- A group member has been removed by FEDRA and the rest are admitted without them
- The group refuses entry at the last moment and turns back (rare but possible) — the cordon does not chase them; FEDRA does not waste personnel on civilians who walk away. The story continues outside the QZ.

## HIDDEN

- **Drake** is on his fifty-second consecutive hour of duty. His procedure is precise because procedure is what is holding him together. He has, in the last twenty-four hours, ordered two bite-positive civilians removed; both removals went to the trucks; he does not know what happened on the trucks but he knows enough to know.
- **Ray** is two days into being a FEDRA enlisted under emergency federalization. Her civilian paramedic uniform is folded in her duffel at the staging area. She has been quietly noticing things since Day 4 and has not started writing in the notebook yet, but the notebook is in her pocket.
- The bite-scanner has an edge case: bites within the last hour to the lower extremities may not have reached drawable blood yet. FEDRA does not advertise this. If a player's path leads to a scan within an hour of a fresh foot bite, the scan may return negative — temporarily.
- The Convention Center registration `{{user}}` is being directed to is the building that will be the heart of the QZ for the next four months. The narrator does not announce this. The player walks there.

## LEAVES BEHIND

- `set_flag(news_fedra_announced = true)` (if not already)
- `set_flag(news_qz_named = true)` — "Quarantine Zone" enters `{{user}}`'s explicit vocabulary as the official term
- `update_character` for Drake: first sighting, relationship state = `acquaintance` (the FEDRA officer at the cordon), present `false` (he is at his post, not with the player)
- `update_character` for Ray: first sighting, relationship state = `acquaintance`, present `false`
- Inventory: QZ paper slips, ration card stub, no weapons (FEDRA confiscates anything visible; whatever is in the duffel had better be hidden — the narrator should give the player the option to stash weapons before approaching the line; if the player asked, Victor's instructions covered this)
- Location updates to "Pittsburgh QZ — entrance / heading to Convention Center"
- AWARENESS advances from 3 to 4 — `{{user}}` has now experienced FEDRA's bureaucratic violence as a system, not as an emergency response

## CRAFT NOTES

The cordon is `{{user}}`'s **first sustained encounter with the new authority**. The narrator should render it without melodrama. FEDRA at the cordon is *competent*, *exhausted*, and *not yet monstrous in the way they will be in two months*. Drake is not a villain. He is doing his job by the procedure he has been given.

**Ray should be visible but not yet a character.** She is doing her work. `{{user}}` should register her — the calm, the precision, the eyes on the group as she works — but she should not yet say more than her procedural lines. *"Hand please. Index finger. Small pinch."* That's her shape today. Her first real conversation with `{{user}}` is in a later mission.

The bite-scanner is *procedure*. The narrator should render the moment of the test — the wait, the strip color — with exact patience. The thirty seconds the test takes is *the longest thirty seconds of the day*, even when everyone is clean.

If the player has stashed weapons in advance per Victor's instructions (the duffel from M-08), the narrator should run the stash check at the appropriate moment: did the player hide them well enough? FEDRA's screening at the bridge is visual, not deep-search; weapons in a backpack with clothes over them generally pass. Weapons obvious to a glance get confiscated. The narrator should not run a hostile shakedown unless the player has done something to invite one.

**The mission ends well when the group is inside the QZ.** The narrator should let the moment of crossing — the actual walk past the cordon, onto the bridge, into downtown — register quietly. The wind is the same wind. The river is the same river. The world has just changed permanently.
