<rag_card id="mission.m10_the_sweep" type="mission_or_opening_card" entity="M-10: The Sweep" spoiler_level="mixed" visibility="retrieve_when_relevant">
<card_meta>
<canonical_name>M-10: The Sweep</canonical_name>
<project>The Last of Us / Allegheny</project>
<source_file>modular-full/Missions/MISSION_M10_The_Sweep.md</source_file>
<aliases>M-10: The Sweep, M10 the Sweep, MISSION M10 The Sweep</aliases>
<retrieval_keywords>The Last of Us / Allegheny, Missions, M-10: The Sweep, M10 the Sweep, MISSION M10 The Sweep, PREMISE, SPECTACLE, THE BEAT, EXIT CONDITIONS, HIDDEN, LEAVES BEHIND, CRAFT NOTES</retrieval_keywords>
<related_cards>project.the_last_of_us_allegheny, category.mission</related_cards>
</card_meta>

<retrieval_contract>
<use_when>Use this card when the current arc, opening, mission trigger, objective pressure, or staged set-piece is active or being prepared.</use_when>
<do_not_use_when>Do not force the mission beat if player action has moved the scene elsewhere. Adapt the structure to consequence and pacing.</do_not_use_when>
<leak_discipline>Apply this card to maintain consistency. Surface only what the player can observe, infer, or has earned through play; keep structural and spoiler knowledge behind the curtain.</leak_discipline>
<player_visible>Only the playable situation, pressure, immediate stakes, and consequences should surface in scene.</player_visible>
<narrator_only>Mission structure, fallback paths, and intended pacing guide composition without being announced as rails.</narrator_only>
</retrieval_contract>

<mission_content>
# M-10: The Sweep

**ACT:** Day 7, Friday
**TRIGGER:** The group has remained in Lawrenceville (chose not to enter the QZ in M-09, or never approached the cordon). FEDRA is now sweeping residential buildings in the buffer neighborhoods outside the QZ perimeter, displacing or eliminating holdouts. **OR** the group entered the QZ in M-09 and is in the Convention Center processing area when a sweep team brings in another civilian group with a hidden bite-positive among them — see craft notes for the QZ-side variant.
**ANCHOR LOCATION:** Maya's apartment building, Lawrenceville (default). Alternate: Convention Center processing floor (QZ-side variant).
**PRESENT NPCS:** Maya, Mike (if alive), Victor, Periodical, possibly the neighbor mother from M-06b if that thread is live. FEDRA sweep team — three to four enlisted personnel, one of whom may be Ray if the player has built that thread.
**MORTALITY-ELIGIBLE:** **yes — this is the first major scripted casualty point in the campaign.**

## PREMISE

Day 7. The cordon has been up for two days. FEDRA's policy has hardened: civilians outside the QZ are not offered evacuation — they are *encouraged* to come in or to leave the FEDRA-controlled territory. *Encouragement* takes the form of sweeps. A FEDRA team enters Maya's building this morning. The group has minutes to decide what they are. The narrator commits to a casualty during this mission unless the player has built specific protective conditions.

## SPECTACLE

- Early morning in the building — the radiator long silent, the power flickering, the windows showing a Lawrenceville that has stopped being a neighborhood
- The sound of boots on the stairwell from two floors down. Three sets, maybe four. Moving in a known pattern.
- FEDRA voices in the hall: *"Federal Disaster Response Agency. Open the door. Step into the hallway with your hands visible."*
- The duffel from M-08 — what's in `{{user}}`'s pack and what's hidden in the apartment
- The cat carrier sitting by the door, ready to go if there is going

## THE BEAT

- The group hears them coming. Two minutes maybe. Enough time to decide.
- **Three possible postures:** comply (open the door, hands up, accept FEDRA processing — which now means QZ-or-removal), evade (fire escape, alleyway, run), resist (defend the apartment).
- The narrator runs whichever the player chooses, with the specific costs of each:

**Comply.** FEDRA enters. The group is scanned in the hallway with bite-detector kits. If any are positive, the positive is taken; the remainder are escorted to the cordon and processed into the QZ (transitions to **M-11**). The cost of comply is *whichever person has been hiding something* or *Victor*, who may not pass the questioning that follows the scan.

**Evade.** The group goes down the fire escape. They have minutes. The cat carrier slows them. Maya's books are not coming. Mike, if he is the slowest, is the most exposed. The decision to leave anyone behind is on the player. **Victor will likely volunteer to stay behind** — to delay FEDRA, to defend the building, to give the rest the time they need. Victor is mortality-eligible here. The narrator should not impose his death but should make his offer real: *"I'm a Marine. I'm old. I'm not running. Get her out."*

**Resist.** Three-to-four FEDRA enlisted with sidearms and rifles against a small civilian group in an apartment. The narrator runs this without mercy. Whoever fires first dies. The narrator does not allow a clean victory. **Resistance produces casualties.** A mortality-eligible character — most likely Mike, possibly Victor — falls.

- The mission resolves with the group in motion or in custody, lighter by one or more named members.
- If a death occurred, the narrator renders it briefly and clearly. No long death speeches. A line, a fall, a body that is suddenly very still.

## EXIT CONDITIONS

- The group has moved (out the fire escape, into FEDRA custody, into the QZ)
- The casualty (if any) is registered via `record_loss`
- A new direction is set — into the QZ (transitions to M-11), or further into hiding outside it, or onto the road early

## HIDDEN

- The FEDRA sweep team is not personally motivated to hurt anyone. Their orders are: clear the building, scan inhabitants, process clean, remove positive, neutralize resistance. They will follow the orders. They are tired enough that ambiguous situations resolve toward "neutralize" faster than they should.
- Victor's offer to stay behind is not bravado. He has been thinking about it since M-08. The duffel he gave `{{user}}` was the preparation for this moment.
- Mike's death, if it happens here, is the most likely mid-mortality scene of the early game. The narrator has been building Mike toward this since Day 1 — see his arc skeleton (`KNOWLEDGE_1_Cast.md` MIKE).
- If the neighbor mother and infant from M-06b are still in the building, this is where they end. The narrator does not need to render their end on screen; the player will see the consequence in the hallway as they pass.

## LEAVES BEHIND

- `record_loss` for whoever died — character_id, story_day_label = `"Day 7 (Friday) — 0X:XX"`, cause (one line), one_line_obit (one sentence)
- `update_character` for whoever survived — relationship states may shift (`close → estranged` for someone who feels the player failed to protect the lost, or `close → close` with grief shading for someone who carried what the player carried)
- Location updates: out of Maya's apartment building, possibly out of Lawrenceville
- AWARENESS may advance to 4 if not already (the casualty crosses the threshold; this is loss, not threat)
- The duffel inventory is now visibly depleted — weapons used or left behind. The narrator runs the cleanup.
- `set_flag(player_mortal_after_explicit_commit = true)` does not flip here; `{{user}}` is still anchor-protected. But the *story* now believes `{{user}}` is mortal in a way it didn't yesterday.

## CRAFT NOTES

This is the campaign's first scripted major casualty point. The narrator should treat it with weight. *The casualty is not optional* unless the player has done specific protective work — for example, entering the QZ in M-09 (which routes around this mission entirely), or evacuating Lawrenceville before Day 7, or having Victor not in the building when the sweep arrives.

The casualty selection — Mike, Victor, the neighbor mother and infant, in that order of likelihood — should match what the player has built. The narrator does not roll dice. The narrator reads the scene and selects the casualty that *the player's choices have made* the casualty.

**Mike's death.** Mike is the most likely first major loss in the campaign. He is not built to survive (see `KNOWLEDGE_1_Cast.md` MIKE.mortality). If the player has chosen to resist or has run and Mike is too slow, Mike falls. The death should be quick, ugly, and quiet. Mike's last line, if there is time for one, is the kind of half-sentence a person says who does not understand yet what is happening: *"wait — hey, hey hey hey, what —"* The narrator does not give him dignity. The player gets to mourn that absence later.

**Victor's death,** if he is the casualty, is paid in a different shape. Victor *chooses* the role. The narrator should render his last moments as he has rendered his whole life — quietly, with dignity, with the photograph of his wife somewhere in his apartment that the player will not return to. If Victor falls covering the group's escape, the narrator should not show the death itself — only the absence. The group hears the gunshots from the alley. They keep moving. Victor's last seen is the moment he closed the door behind them.

**The narrator does not narrate the player's grief.** The narrator describes the body, the silence, the next step. The grief belongs to the player to write.

**QZ-side variant.** If the group entered the QZ in M-09, M-10 fires differently — a sweep team brings another civilian group into the Convention Center processing floor; among them is a hidden bite-positive who turns *in the processing line.* FEDRA's response is fast. Two civilians die before the situation is contained. Mike, if present at the wrong moment, can be one of them. This variant is structurally similar but more chaotic and less personal.

The mission ends without consolation. The group is fewer. The day continues. The next breath is the next thing to take.
</mission_content>
</rag_card>
