<rag_card id="mission.m11_inside_the_wire" type="mission_or_opening_card" entity="M-11: Inside the Wire" spoiler_level="mixed" visibility="retrieve_when_relevant">
<card_meta>
<canonical_name>M-11: Inside the Wire</canonical_name>
<project>The Last of Us / Allegheny</project>
<source_file>modular-full/Missions/MISSION_M11_Inside_The_Wire.md</source_file>
<aliases>M-11: Inside the Wire, M11 Inside the Wire, MISSION M11 Inside The Wire</aliases>
<retrieval_keywords>The Last of Us / Allegheny, Missions, M-11: Inside the Wire, M11 Inside the Wire, MISSION M11 Inside The Wire, PREMISE, SPECTACLE, THE BEAT, EXIT CONDITIONS, HIDDEN, LEAVES BEHIND, CRAFT NOTES</retrieval_keywords>
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
# M-11: Inside the Wire

**ACT:** Week 2
**TRIGGER:** The group has entered the QZ (via M-09 or post-M-10 processing) and is now in their first stable week of QZ life. Fires roughly Day 10-14.
**ANCHOR LOCATION:** Pittsburgh QZ — Convention Center barracks (where civilians are housed in the early weeks), ration distribution, the barter market in the office-building lobby near Liberty Avenue, the QZ medical tent
**PRESENT NPCS:** Maya, surviving companions (Victor if alive, Mike if alive — at least one of them is usually gone by this point), **Erin** (now pulled into the QZ medical tent — first major reunion since Day 7), **Ray** (encountered in passing on FEDRA QZ patrol), other QZ civilians as ambient population
**MORTALITY-ELIGIBLE:** no

## PREMISE

The first sustained week of QZ life. The group has been processed, housed, given ration cards, assigned work. They are alive. They are also being managed by an institution that has, in seven days, gone from "emergency response" to "bureaucracy with weapons." This mission establishes what QZ life *is*, finds the group their rhythm, and brings Erin back into the cast — pulled by competence into the EMT work she swore off.

## SPECTACLE

- The Convention Center barracks — a converted exhibition hall divided by sheets and partitions into rough family-sized units, cots in rows, the high industrial ceiling, the fluorescent lights some of which are out
- The ration line in the morning — civilians queued with paper cards, FEDRA enlisted at folding tables checking IDs and stamping cards, the food itself (cold MREs, packaged crackers, occasionally something hot)
- The barter market — informal, in the lobby of an older office building two blocks away. FEDRA tolerates it. The currency is what people brought in: cigarettes, antibiotics, batteries, intact clothing.
- The QZ medical tent — also in the Convention Center, in a separate hall. Triage signage, cots, civilian volunteers in scrubs.
- The walls — visible from streetside, concrete sections trucked in, barbed wire on top, the river just beyond. Civilians cannot reach the river. The river is *right there.*

## THE BEAT

- The group navigates QZ procedure for the first time. Ration cards picked up. Work assignments received (most adults get "clearing detail" — moving debris, hauling supplies, salvage; a few get medical or kitchen).
- Maya is assigned to clearing. She handles it. She is quieter than she was a week ago. The work is the only place her mind goes quiet.
- `{{user}}` is assigned per his profession (if Caleb the microbiologist: medical detail in the QZ tent, which is where this scene's anchor encounter happens). If `{{user}}` is the default software engineer: clearing or admin work.
- **The reunion with Erin.** If `{{user}}` is on medical detail, Erin is the senior person in the tent. She nods when she sees `{{user}}` and goes back to what she is doing. Hours later, on a break, she says: *"Yeah. Yeah. Glad you got in."* The conversation is short. There is a thing she has not said and will not say today.
- A brief sighting of Ray, in uniform, walking past the medical tent with two other FEDRA. She does not stop. She glances at the tent.
- The first ration line. The first sleep in the barracks. The first morning waking up to the sound of a hundred other people waking up.
- A small evening moment — Maya, in the bunk next to `{{user}}`'s, doing whatever she does at the end of these days. The cat is on her lap (Periodical made it; the narrator should let this be a small gift). She is doing some version of the list-making she did at the apartment. They talk briefly about something small.

## EXIT CONDITIONS

- The group has settled into a rhythm — three or four days have passed inside this mission's frame, time has compressed naturally
- A first relationship beat with Erin has registered (even if it is small)
- Ray has been seen at least once
- The next mission's conditions are forming (`KNOWLEDGE_3_Timeline.md` has Week 3 firing M-12 — the Firefly pamphlet)

## HIDDEN

- The QZ in Week 2 has approximately 22,000 civilians. By Month 4 (when it falls) it will be down to ~14,000. Half of the missing are dead; half escaped, or were removed.
- Erin's old EMT partner **Martha** (named-minor) is also working the QZ medical tent. The first reunion between Erin and Martha happens this week, *not on screen with `{{user}}`*. The narrator may surface Martha if `{{user}}` is on medical detail at the right moment; otherwise Martha remains background, with Erin's tension about her registering as a small private note.
- Ray's first notebook entries are happening this week. She does not show them to anyone. The notebook is in her breast pocket.
- The neighbor mother from M-06b, if she lived, is not in this QZ. The QZ admitted limited populations and she was not among them.
- Maya's mother is presumed dead by this week. Detroit went dark on Day 5. Maya knows. She has not said.

## LEAVES BEHIND

- `update_character` for Erin: relationship state `friend` (re-established after Day 3 evening), `present: true` (in the same QZ space as `{{user}}`)
- `update_character` for Ray: `present: false` (in the same QZ but on duty elsewhere); first acknowledgment
- New character: **MARTHA** added to MCP cast at LIGHT tier
- AWARENESS stays at 4
- `set_flag(news_qz_named = true)` if not already
- Inventory: ration card stub (renewed weekly), QZ-assigned blanket and toiletries, whatever the group brought in
- Location: Pittsburgh QZ — Convention Center barracks
- The story clock has advanced through Week 2

## CRAFT NOTES

This is a **mood mission**, not an event mission. The job is to establish the *texture of QZ life* so that later missions in this setting (M-12, M-13) can land without re-establishment. The narrator should resist the urge to stage drama. The drama of Week 2 is *the dailyness of it* — the way Maya now eats her ration in eight minutes flat, the way `{{user}}` knows the names of three of the medical volunteers within four days, the way Erin moves through the medical tent with the same economy she had at the Thunderbird but now applied to a much worse job.

**Erin's reunion** is the emotional center of this mission. The narrator should keep it small. Erin does not embrace `{{user}}`. She nods. She says four words. She goes back to work. The intimacy is in *being in the same building doing related work for the same reasons.* If `{{user}}` has been built toward romance with her, the seeds are here — but they are seeds, not flowers. Week 2 is not where romance lands. Romance lands in M-14 territory.

**Ray's appearance** is *a glance.* The narrator should not stage Ray for `{{user}}`. She walks past. She does her job. She continues. If the player wants to engage her, the narrator can find a moment — but Ray is not yet a person `{{user}}` knows. She is the FEDRA enlisted who recognized them at the cordon and has glanced at them three times in Week 2.

**Time compression** is allowed in this mission. The narrator may move through the four or five days of Week 2 in compressed beats — a morning, an afternoon, an evening across two days, a quiet conversation on the fifth day. The mission ends when the rhythm has settled.

The cat made it. Periodical is in the barracks. The narrator should not make this a setpiece — just let it be true. Maya brought her cat to the apocalypse. The cat is fine.
</mission_content>
</rag_card>
