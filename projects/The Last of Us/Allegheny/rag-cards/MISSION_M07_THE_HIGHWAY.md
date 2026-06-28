<rag_card id="mission.m07_the_highway" type="mission_or_opening_card" entity="M-07: The Highway" spoiler_level="mixed" visibility="retrieve_when_relevant">
<card_meta>
<canonical_name>M-07: The Highway</canonical_name>
<project>The Last of Us / Allegheny</project>
<source_file>modular-full/Missions/MISSION_M07_The_Highway.md</source_file>
<aliases>M-07: The Highway, M07 the Highway, MISSION M07 The Highway</aliases>
<retrieval_keywords>The Last of Us / Allegheny, Missions, M-07: The Highway, M07 the Highway, MISSION M07 The Highway, PREMISE, SPECTACLE, THE BEAT, EXIT CONDITIONS, HIDDEN, LEAVES BEHIND, CRAFT NOTES</retrieval_keywords>
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
# M-07: The Highway

**ACT:** Day 4, Tuesday
**TRIGGER:** The player has decided to leave the city. The group is traveling by car on a major highway corridor (I-376, I-279, I-79).
**ANCHOR LOCATION:** I-376 outbound (toward the airport) or I-279 north (toward the suburbs), with the option of I-79 north depending on where the player thinks they're going
**PRESENT NPCS:** Maya, Mike (if alive), Victor (if joining — Victor doesn't always leave on Day 4; some runs he stays in his apartment another day), Periodical the cat (in a carrier if Maya has insisted)
**MORTALITY-ELIGIBLE:** no (in default form; player escalation can change this)

## PREMISE

Day 4 morning. The mayor has announced an "orderly evacuation." The highway is the way out. The group has packed what they can carry, locked Maya's apartment, and joined the line of cars on I-376 (or whichever corridor they chose). By 9 AM the highway is stopped. By noon it is a parking lot of dead cars with their doors open and luggage in the trunks. By afternoon `{{user}}` and group are on foot. **The most iconic post-outbreak image of the campaign.**

## SPECTACLE

- The highway from a stopped car: lanes of vehicles as far as the eye can see, sun glinting off windshields, the heat radiating off pavement
- The silence when the engines stop. The sound of car horns dies down because the cars do
- The luggage in the trunks. The children's car seats still strapped in. The photographs in the visors of the abandoned cars they walk past
- Helicopters overhead that never come to help
- The first sight of an infected at close range — possibly here, possibly on a side road as the group leaves the highway

## THE BEAT

- The drive begins. Optimism is brittle but present. Maya is in the passenger seat with the cat carrier on her lap; Mike or Victor is in the back. They have packed: Maya's list, Victor's duffel if Victor joined, what could be carried in three or four bags.
- The traffic slows. Then stops. They wait. They listen to radio. The radio is EAS broadcasts on every station.
- After thirty minutes of not moving, people are getting out of their cars to look. After an hour, the cars two ahead are abandoned.
- The decision to leave the car. *This is the moment.* Whatever is in the trunk is what they keep. Whatever they can carry. The narrator should not run an inventory checklist — let the player describe what they take.
- On foot, weaving between dead cars. The world is open in a way it has not been before. The drop in elevation off the highway leads to a frontage road, to a treeline, to a route that doesn't exist on any map.
- **The first close-range infected.** A man (or woman) running between cars two lanes over. Someone in the group sees them first. The narrator renders the moment with care — this is the first time `{{user}}` sees an infected the way an infected actually looks. Mike, if present, has a hard time. Victor, if present, does not.
- The decision to engage or evade. The narrator runs whichever the player chooses. Evade is usually possible; engage costs.
- By late afternoon the group is off the highway and on foot, headed somewhere. Either back toward Pittsburgh (the realization that leaving the city is not possible the way they thought), or onward (committing to the road, with the implication that they are now traveling on foot indefinitely).

## EXIT CONDITIONS

- The group is on foot and committed to a direction (back into Pittsburgh, or forward away from it)
- The car has been left behind with whatever was in it
- The first close-range infected encounter has resolved

## HIDDEN

- The highway is impassable for vehicles for the rest of the story. The cars they walk past will rust here. By Year 1 the highway is weeds through pavement cracks and rust.
- The first close-range infected on the highway is a recent turn — within the last six hours. The wound is visible on the neck if the player looks. They were in one of the cars. They turned at the wheel.
- I-376 west toward the airport is the route many people are taking. I-279 north is also stopped. **All major outbound corridors are equally bad.** The choice of which highway doesn't change the outcome much.
- If the player tries to drive back into Pittsburgh, they will discover the inbound lanes are also stopped — by FEDRA's nascent perimeter, which is closing today. Going back means going *to a checkpoint*, not back to Maya's apartment by car.

## LEAVES BEHIND

- The car is gone (`remove_inventory` if it was tracked; usually it wasn't because cars aren't tracker items)
- Most of what was in the car is left behind. The player keeps what they can carry.
- `news_fedra_announced = true` if FEDRA's perimeter has become visible to the player today (most likely)
- The group is now on foot for the foreseeable future
- AWARENESS may stay at 3 or may advance to 4 — the highway scene is the threshold; if `{{user}}` has now seen FEDRA in force AND an infected up close AND understood that the city is not going to be re-enterable as their old city, AWARENESS-4 is appropriate
- If a close-range engagement happened, possibly `log_injury` for `{{user}}` or a companion — the highway is the first place the group bleeds

## CRAFT NOTES

The highway is the campaign's first **vista** scene — the moment the player understands the *scale* of what has happened. The narrator should pace it accordingly: the slowness of the traffic stopping, the build to the decision to leave the car, the long walk through the lanes of dead vehicles. Two or three exchanges can pass with very little dialogue — just the texture of walking past cars.

**The narrator should not over-render bodies.** A car door open with a child seat in it does not need to be followed by a description of what's in the car seat. The world is full of small terrible things and the narrator lets them register without forcing them.

The first close-range infected is a key moment. The narrator should make the moment small — the figure running between cars, the wrong-ness registering before the recognition does. Mike, if present, should react to it with his volume going *down*, not up. Victor, if present, has a steadiness here that the player will remember.

If the player chooses to engage with the infected — to fight, to defend themselves with whatever they're carrying — the narrator runs the fight tight. Two or three exchanges. The infected is fast and fragile (Stage 1, per `KNOWLEDGE_4_Infection.md`). A solid hit ends them. The aftermath is the harder beat than the fight.

**This mission ends with the group on foot.** That is the load-bearing structural change. From here through the rest of the outbreak week, they walk. The narrator should mark this in the inventory and in the tracker — the car is no longer a resource.
</mission_content>
</rag_card>
