<rag_card id="mission.m15_the_road" type="mission_or_opening_card" entity="M-15: The Road" spoiler_level="mixed" visibility="retrieve_when_relevant">
<card_meta>
<canonical_name>M-15: The Road</canonical_name>
<project>The Last of Us / Allegheny</project>
<source_file>modular-full/Missions/MISSION_M15_The_Road.md</source_file>
<aliases>M-15: The Road, M15 the Road, MISSION M15 The Road</aliases>
<retrieval_keywords>The Last of Us / Allegheny, Missions, M-15: The Road, M15 the Road, MISSION M15 The Road, PREMISE, SPECTACLE, THE BEAT, EXIT CONDITIONS, HIDDEN, LEAVES BEHIND, CRAFT NOTES</retrieval_keywords>
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
# M-15: The Road

**ACT:** Month 4 (mid-January 2019) and onward into the open road
**TRIGGER:** The Pittsburgh QZ has fallen (or is in the final hours of falling). FEDRA is retreating; Hunters are moving in. The group must leave — through the chaos of the collapse, out of the city, onto whatever route they have planned.
**ANCHOR LOCATION:** Pittsburgh QZ → the route out (depending on path) → the first night beyond the city limits
**PRESENT NPCS:** Maya, surviving companions (Erin if alive and the group has integrated her, Ray if defected, others), Casey may or may not be reachable, the QZ in chaos
**MORTALITY-ELIGIBLE:** **yes** — the collapse is the campaign's second major mortality window after M-10

## PREMISE

The QZ is collapsing. FEDRA has lost containment of a civilian insurrection that has been building for weeks. The walls are breached in three places. Hunter scouts are visible in the abandoned neighborhoods. FEDRA is loading what they can onto trucks and pulling out. The group has *hours*, not days, to get out before the city becomes Hunter territory.

This mission is the **transition from the QZ era into the road era.** Everything that comes after is improvisational — there is no M-16. The road begins here.

## SPECTACLE

- The QZ in its final hours — smoke from multiple fires, civilians running in every direction, FEDRA personnel breaking discipline, the sound of weapons that should not be firing inside the wall firing inside the wall
- The collapse infrastructure — checkpoints abandoned, the Convention Center on fire in one wing, the trucks that FEDRA is loading at the Steel Tower
- The route out — depending on path — through the breach in the wall, over the Sixteenth Street Bridge in the wrong direction (out of the QZ), through a service tunnel that Ray knows about, on foot through the chaos
- The buffer zone neighborhoods — Lawrenceville already empty, the streets `{{user}}` knew now permanently strange
- The first horizon — the moment beyond the city limits, looking back at Pittsburgh as a silhouette against a winter sky

## THE BEAT

- The signs the QZ is going. Specific moments the narrator can stage: a FEDRA truck driving past full of personnel and gear; a wall-section breach the group hears about (or sees); a fire in the Convention Center that is not being fought.
- The decision moment. The group has to leave *now.* Hours, not days. Whatever supplies they have, whatever weapons, whatever people. Some of them they will leave behind — by death, by separation, by choice.
- **The route.** Different paths produce different routes:
  - **Path A (improvised escape):** the group goes through the nearest breach in the wall, into the abandoned northern neighborhoods, on foot, picking direction by what is moving and what isn't.
  - **Path B (Ray's route):** if Ray has defected and integrated, she knows a service tunnel that connects the QZ's medical infrastructure to the Strip District side. The group goes through the tunnel.
  - **Path C (Firefly extraction):** if the group has been useful enough to the Fireflies, Casey has prepared an extraction route. A meeting point, a vehicle (real vehicle, not a relic), a planned destination.
- The encounters during the exit. Whatever happens, it is fast. A FEDRA squad still trying to enforce procedure runs into the group. Or a Hunter scout pair has moved into the buffer zone faster than expected. Or infected, drawn to the noise of the collapse, have come into the QZ's empty streets.
- **The mortality-eligible beat.** Someone may fall here. The narrator selects per the campaign-built. Most likely casualties at this stage: Erin (if her romance arc has built and the narrator chooses the highest-cost moment), Ray (if her defection has cost her FEDRA's interest and they catch up), Casey (if the Fireflies extraction goes wrong). Maya is mortal-earned at this point but the narrator should not select her unless the player has built specifically toward that loss. *The narrator does not require a casualty.*
- The crossing out. On foot through Lawrenceville, or on a vehicle if Path C, or through the tunnel and out the other side. The buffer zone is dangerous in different ways now — Hunters are real.
- **The first night out.** The group, fewer than they were, somewhere on the eastern edge of the city or in the rural exit point (per `KNOWLEDGE_2_City.md`). A small fire if it is safe to have one. The first night without the wall.

## EXIT CONDITIONS

- The group is out of Pittsburgh — past the city limits, on a back road, in a clearing or a tree line
- The casualties are registered (if any)
- A first direction is set (east toward Westmoreland County, south toward the West Virginia border, north toward Erie, or holding to assess in the morning)
- The story has transitioned into open-road improvisational mode

## HIDDEN

- The Pittsburgh QZ fell because a specific event tipped the civilian population — a FEDRA shooting of three civilians in the ration line on a specific Thursday morning that was witnessed by enough people to no longer be containable. The protests on Friday were larger than FEDRA could suppress. By Saturday they had lost the Convention Center. By Sunday FEDRA's command made the call to retreat. The whole collapse takes four days. The group is leaving in hour ~72 of those four days.
- Ray's notebook, if she defected with it, is the primary cargo of this mission. The narrator may render Ray clutching it during the exit, may register that she has it more carefully than her supplies. The Fireflies, if integrated, may attempt to get the notebook to a regional contact later in the road era.
- The Hunters who will hold Pittsburgh by Week 5 of the collapse are organized faster than FEDRA's command anticipated. The narrator does not telegraph this; Len's group is coming together as the group is leaving.
- **Jackson, Wyoming** does not enter the conversation yet. It is too far for current planning. The group will hear of Jackson months later. The narrator should not name it.

## LEAVES BEHIND

- `complete_mission(M-15, outcome)` with one-line note: *"out of Pittsburgh, on foot, heading east"* (or whichever direction)
- `record_loss` for any casualties
- `update_character` for the surviving group — relationship shifts toward `close` for those who have made it together through the collapse
- Location updates dramatically: out of Pittsburgh QZ, somewhere on the road, exact location improvisational
- The inventory is at its leanest — what could be carried at speed, what survived the exit
- AWARENESS stays at 5
- `set_flag(pittsburgh_qz_fallen = true)` — a new flag the narrator may surface in later improvisation
- `set_flag(player_mortal_after_explicit_commit = true)` may flip here if the player has signaled the story is now mortal for everyone — the narrator should not flip this without the player's signal

## CRAFT NOTES

This is the **longest and highest-stakes mission in the seeded deck.** The narrator should give it sustained pacing — the QZ's collapse, the exit, the first night out can span ten or twelve substantial exchanges. The narrator should not compress this; it is the campaign's hinge.

**The collapse should feel like collapse.** Not a scripted set-piece. *Chaos* — civilians moving in every direction, FEDRA breaking discipline, fires that are not being fought, the wall losing meaning section by section. The narrator should render the small specifics of an institution failing in real time.

**The exit should feel like exit.** The narrator should resist staging a clean victory. Some things are left behind. Someone may be left behind. The group that walks out of the city is *smaller* than the group that walked in three months ago.

**The first night out** is the campaign's *first new beginning*. The narrator should let it be quiet. The group has been inside walls for fourteen weeks. The sky is the sky again. The cold is cleaner. Whatever happens next has not happened yet.

**The road era after M-15 is improvisational by design.** The narrator does not have an M-16. The mission deck ends here. From this point forward the narrator works from:
- The cast's arc skeletons (`KNOWLEDGE_1_Cast.md`) — characters' long-arc capstones may fire in the road era
- The timeline's road-era framing (`KNOWLEDGE_3_Timeline.md` Months 6–12, Year 1+)
- The named-minors who exist for the road (the Walker family Month 1; Mr. and Mrs. Summers one night; potentially Noah encounter in Month 4–6)
- The factions document (`KNOWLEDGE_5_Factions.md`, when written) for who is where
- Improvisation within the established mood

**The narrator should not commit destinations.** Jackson, Boston, a winter holdout — these are *possible*, not promised. The group goes where the player takes them. The narrator surfaces appropriate texture based on direction.

The mission ends, in the cleanest version, with `{{user}}` and one or two others sitting around a small fire, looking back at the dark silhouette of Pittsburgh on the western horizon, the wind cold and clean, the next thing being whatever comes in the morning. The narrator does not announce that the road has begun. The road has begun.
</mission_content>
</rag_card>
