<rag_card id="mission.m08_old_neighbors_garage" type="mission_or_opening_card" entity="M-08: The Old Neighbor&#x27;s Garage" spoiler_level="mixed" visibility="retrieve_when_relevant">
<card_meta>
<canonical_name>M-08: The Old Neighbor's Garage</canonical_name>
<project>The Last of Us / Allegheny</project>
<source_file>modular-full/Missions/MISSION_M08_Old_Neighbors_Garage.md</source_file>
<aliases>M-08: The Old Neighbor's Garage, M08 Old Neighbors Garage, MISSION M08 Old Neighbors Garage</aliases>
<retrieval_keywords>The Last of Us / Allegheny, Missions, M-08: The Old Neighbor's Garage, M08 Old Neighbors Garage, MISSION M08 Old Neighbors Garage, PREMISE, SPECTACLE, THE BEAT, EXIT CONDITIONS, HIDDEN, LEAVES BEHIND, CRAFT NOTES</retrieval_keywords>
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
# M-08: The Old Neighbor's Garage

**ACT:** Day 5, Wednesday
**TRIGGER:** The group has consolidated at Maya's apartment building (whether they left on Day 4 and came back, or never left). It is Day 5; FEDRA's perimeter is forming downtown; the question of leaving has become serious.
**ANCHOR LOCATION:** Victor's apartment, then the garage in the alley behind the building
**PRESENT NPCS:** Maya, **Victor** (the mission anchor character), Mike (if alive), Periodical
**MORTALITY-ELIGIBLE:** no

## PREMISE

Day 5. The neighborhood is quiet in the wrong way. Victor knocks on Maya's door in the morning and asks `{{user}}` to come with him to his apartment. He has something to show them. The conversation moves to the garage at the back of the building. Inside the garage, behind a workbench, a panel comes off. There is a duffel. Victor has been waiting forty years to be the kind of person who needed it.

## SPECTACLE

- Victor's apartment, smaller than Maya's, more lived-in by a single person — a photograph of his wife on a shelf, books on structural engineering and military history, a kitchen table set for one
- The route to the garage: down the back stairs, through the alley behind the building, the smell of damp brick and the river not far off
- The garage itself — narrow, cinderblock, a workbench along one wall, an old chair, the faint smell of oil
- The duffel: heavy canvas, military-surplus origin, locked with a small combination padlock Victor has clearly not forgotten in forty years

## THE BEAT

- The morning interaction. Victor at Maya's door. He looks at `{{user}}` more than at Maya. "Come with me a minute. I want to show you something."
- The walk down. The walk through the alley. Victor's pace is slower than `{{user}}`'s. The alley is empty in a way it never was last week.
- Inside Victor's apartment first. Victor offers `{{user}}` coffee. (`{{user}}` may or may not accept.) Victor says, quietly: *"I was in the Marines a long time ago. I packed something then I never threw out. I want to show it to you."*
- The garage. The panel. The duffel.
- Inside the duffel: two handguns and ammunition, three knives, a small medical kit, paracord, a folding shovel, water-purification tablets. The contents have been updated periodically; the duffel itself has been sealed since the 1970s.
- Victor's offer. *"I don't want to use any of it. But you should know it's here. And you should take some of it now."*
- A conversation that is the most personal Victor has had with anyone since his wife died. He does not explain. The duffel is the explanation.
- `{{user}}` takes what they take. Victor specifies what he wants left for himself.

## EXIT CONDITIONS

- The duffel has been distributed. `{{user}}` has acquired what Victor has shared.
- The conversation has ended — Victor walks `{{user}}` back to Maya's apartment, or they go together to find Maya and continue planning
- The day continues toward Day 6's pressures (the cordon forming downtown, the question of staying in Lawrenceville or trying to enter the QZ)

## HIDDEN

- The duffel was packed in 1972 after Victor returned from his second tour. He was twenty-five. He told himself he was packing it for "if things get bad here." For forty-six years they did not. He never opened the duffel — he updated the contents periodically by replacing items, but he never let himself remember why he packed it.
- The photograph of his wife on the shelf is from their honeymoon in 1981. Victor looks at the photograph often. He does not have other photographs of her displayed.
- The fact that Victor is making this offer to `{{user}}` rather than to Maya is not an accident. Victor sees `{{user}}` and Maya as a unit, and he believes (correctly) that `{{user}}` will accept the weapons and Maya will accept them once `{{user}}` has them. Maya would not have accepted them directly.
- Victor is making one other offer this week, silently: he has decided that *if the building has to be defended, he will be the one to do the defending.* He has not told Maya this. He is telling `{{user}}` indirectly, by giving him most of the duffel.

## LEAVES BEHIND

- `add_inventory` for whatever `{{user}}` takes from the duffel. A typical distribution: one handgun (probably a 9mm semi-auto) with two magazines, one knife (a fixed-blade utility knife), the small medical kit, water-purification tablets, paracord. Victor keeps: one handgun for himself, the other knives, the folding shovel.
- `update_character` for Victor — relationship state shifts from `friend` (Maya's neighbor) to something approaching `trusted` for `{{user}}`. The MCP note: *"showed `{{user}}` the duffel; this matters."*
- `update_perception` on Victor — what Victor has observed about `{{user}}` over four days of intermittent contact registers as a richer picture
- Victor's apartment has been internally established more deeply — the photograph, the books, the table set for one

## CRAFT NOTES

This is Victor's mission. The narrator should let him lead it. His pace is slow. He does not waste words. The narrator should render his sentences short and his silences long.

**The duffel reveal should not feel like a video-game loot moment.** It is not loot. It is a man giving `{{user}}` what he packed when he was younger than `{{user}}` is now. The narrator should render the moment with the weight Victor brings to it — *quiet*, deliberate, unsentimental.

The photograph of Victor's wife is available but the narrator does not draw direct attention to it. If `{{user}}` looks at it, Victor may or may not say anything. If `{{user}}` asks, Victor's answer is brief: *"Eleanor. She died last year. Cancer."* He does not elaborate.

Victor's line — *"I don't want to use any of it. But you should know it's here. And you should take some of it now."* — is his canon line. The narrator should render it close.

The mission ends well when `{{user}}` and Victor have a moment of *understanding* that does not require words. Maya, at the other end of the building, has not been part of this scene. The narrator should not have Victor say *"don't tell Maya."* He does not need to.

This is one of the warmest missions in the deck — *warm* in the McCarthy sense, the warmth that exists *because* of the cold. The narrator should let Victor be a good man, plainly and without irony.
</mission_content>
</rag_card>
