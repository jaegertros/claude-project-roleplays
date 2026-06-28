# M-06: The Hospital Run

**ACT:** Day 3, Monday midday to afternoon
**TRIGGER:** Someone the group knows has been bitten or scratched by an infected, AND the player chooses to go to the hospital. Conditional — see M-06b for the alternate path.
**ANCHOR LOCATION:** UPMC Presbyterian Hospital, Oakland neighborhood, east of downtown
**PRESENT NPCS:** Maya (almost certainly with `{{user}}`), the bitten/scratched person (could be Mike, a neighbor, a stranger from the street, depending on what the narrator has built), **ARLEN** (named-minor, on her shift in the ER, exhausted and on adrenaline)
**MORTALITY-ELIGIBLE:** yes — the bitten character almost certainly does not leave alive

## PREMISE

Someone is bitten. The decision to go to the hospital is the moment the outbreak becomes personal for `{{user}}`. The hospital is the worst place they can go. They go anyway. The hospital, by the time they arrive, is locked down or partially evacuated. Triage tents outside the ER. Security at every door. The kind of fluorescent-lit chaos Arlen described at Saturday's dinner has become the room.

## SPECTACLE

- The drive to Oakland (or the walk — depending on how fast they need to move and what's possible). Sirens. Streets that are starting to thin of normal traffic and fill with frightened drivers.
- UPMC's ER entrance. The triage tent is up. Hospital security at the door. Police at the curb.
- Inside: fluorescent light on every surface. The specific smell of disinfectant fighting and losing against the smell of blood. Voices raised. A doctor sprinting past with a gurney.
- The sound of the ER when it stops sounding like an ER and starts sounding like a war zone

## THE BEAT

- Arrival at the hospital. They are not the only people trying to bring someone in. The line at the triage tent is long; people are arguing with the security guards.
- The bitten person is visibly deteriorating — fever, sweat, glassy eyes (per `KNOWLEDGE_4_Infection.md` progression).
- `{{user}}` and Maya have to navigate the security perimeter. Possible paths: bluff their way past with the bite as a fresh trauma the hospital has to take; try a side entrance; encounter a sympathetic nurse who lets them in; abandon the attempt and walk back to the car
- **If they get inside the ER:** they find Arlen. She recognizes them from dinner. She is the worst version of herself the player will ever see — exhausted, gaunt, *furious*, professional. She tells them, in the back hallway, that the hospital cannot help. She tells them what is going to happen to the bitten person. She tells them to leave. The narrator should give her her line: *"I'm telling you to leave. I'm not asking. Take your friend and *leave.*"*
- A moment of choice. The bitten person knows. The bitten person *probably tells them to go.* The narrator should not stage this as melodrama; it is small, tight, terrible.
- The departure. They leave the hospital without the bitten person, or they stay and witness the turn, or they try to do something else (carry the bitten person out and away from the hospital; this is the choice that means they will have to deal with the turn themselves in private). The narrator runs whatever path the player commits to.

## EXIT CONDITIONS

- They leave the hospital, with or without the bitten person
- The bitten person has died, turned, or been left in the hospital's hands
- A new direction is set (back to the apartment; or to Mike's hotel; or to the bridge out of the city — `{{user}}` is choosing what comes next)

## HIDDEN

- Arlen will die at UPMC tonight. The conversation she has with `{{user}}` in the back hallway is the last time anyone outside the hospital sees her alive.
- The hospital's internal protocols have already started referring to the bitten as "Category 1." There is no Category 0.
- The bitten person, regardless of body location of bite, is going to turn. The narrator commits to the infection clock via `log_injury` with the appropriate body_part. If the bite is to the forearm (most common in self-defense), the clock is 4–12 hours — meaning the turn comes that night.
- A specific UPMC doctor (offscreen, unnamed) made the call ten minutes before `{{user}}` arrived that any further bite victims would be marked Category 1 immediately and "moved to the rear holding."

## LEAVES BEHIND

- `log_injury` for the bitten person with `severity: "bite"`, the appropriate body_part, `clock_bias` based on what the story needs (most often `"median"`)
- AWARENESS likely advances from 2 to 3 in this mission — `{{user}}` has now seen infected up close, has heard "Cordyceps" used by professionals as a category, has witnessed the medical system fail
- `news_fedra_announced` may flip true if the player's drive home passes a National Guard staging area (FEDRA proper isn't here until Day 5; National Guard is the bridging force)
- ARLEN's status: she will be confirmed dead later (Day 4 or 5 when the player learns of UPMC's collapse). For now, MCP keeps her alive but her `present` flag remains false (she's at work, not with the player).
- The bitten character's infection clock is now running. Whether they make it back to Maya's apartment, or die en route, or are abandoned — the clock decides what the rest of Day 3 looks like.

## CRAFT NOTES

This mission is **mortality-eligible** because the bitten character almost always dies in it (whether at the hospital, on the way back, or that night). The narrator selects *who* is bitten based on what the player has built. In a default run where the player has been with Maya and Mike most of the day, the bitten person is most likely **Mike** — but it can be Victor's neighbor, a stranger they tried to help, or in rare cases (high difficulty mode, dark register selected) Victor himself.

**The narrator does not narrate the turn at the hospital.** If the bitten person turns inside the building, it happens offscreen — `{{user}}` and Maya hear it but do not witness it directly. If the bitten person turns outside the building, it happens later — back at the apartment, or in the car. The hospital scene's emotional center is *the refusal of help*, not the turn itself.

Arlen's line — *"I'm telling you to leave. I'm not asking."* — should be rendered exactly or very close. It is her canon line. It is one of the lines the player will remember the rest of the campaign.

This is one of the heaviest missions in the outbreak week. The narrator should give it space. Six to ten exchanges. Not more. The hospital is not a dungeon — it is a moment.
