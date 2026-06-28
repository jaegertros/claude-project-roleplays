# M-12: The Pamphlet

**ACT:** Week 3
**TRIGGER:** Fires roughly Day 17-21. The QZ has settled into a recognizable rhythm. The first Firefly leaflet appears in the group's vicinity — taped to a stairwell wall, slipped under a door, found in a ration package — depending on what the player has been doing.
**ANCHOR LOCATION:** Pittsburgh QZ — wherever the leaflet is found; later a quiet meeting site (basement of an office building, the back of the barter market, somewhere private) where the first Firefly contact happens
**PRESENT NPCS:** Maya, Erin (in passing), Ray (in uniform, present at the QZ but not at the meeting), **Casey** (Firefly cell organizer — first appearance), other Firefly contacts as needed (one or two faces who exist for this scene)
**MORTALITY-ELIGIBLE:** no

## PREMISE

The QZ has been managed for three weeks. The dailiness has stopped feeling new and started feeling like *what life is.* And then a folded piece of paper turns up where it should not be. A name on it. A meeting place. *We see what they don't show you. — F.*

## SPECTACLE

- The leaflet itself — half a sheet of office paper, mimeographed text, one symbol in the corner (a stylized firefly, simple enough to be hand-drawn)
- The QZ in Week 3 — recognizably habitable, recognizably grim; the light shorter every day as October moves toward November
- The meeting site, if the player goes — a basement, a back room, a stairwell off the barter market, lit by a battery lamp
- Casey themselves: ordinary, late twenties, the kind of person who could be at any QZ orientation meeting and who is in fact at a Firefly recruitment briefing

## THE BEAT

- The leaflet appears. The player finds it, or someone in the group does. Maya may see it first; Victor (if alive) might. The leaflet reads, in its entirety: *"FEDRA is not your future. You have been told what to believe. We have not. — Tonight, 22:00, the back stairwell off the south barter market. Come alone or come with one. Ask for FERN. — F."*
- The decision to go or not. Maya is *skeptical*; Victor is *more skeptical*; Erin, if asked, is *cautious* (her old recruiter instincts — see `KNOWLEDGE_1_Cast.md` ERIN.relationship_texture.with_authority).
- If the player goes — the walk through the QZ at night. The QZ has a partial curfew that FEDRA enforces unevenly. The back stairwell is reachable; reaching it without being noticed by a patrol is the small obstacle.
- **The meeting.** Casey is there with one other Firefly (an older woman who watches the door, does not speak much). Casey introduces themself by their first name. The conversation is the Week 4 dialogue example from Casey's cast entry: *"I'm not going to tell you we have all the answers. We don't. We have a hypothesis. The hypothesis is: it gets worse if no one organizes against it. We are organizing. I think your friend Ray — she'd be very useful to us. I think you would too. I'm not asking for an answer tonight."*
- Casey makes the pitch. They know more about the group than they should — they have been watching. They mention Ray by name. They do not pressure. They offer a way to stay in touch (a code phrase, a contact at the medical tent — possibly Erin's coworker, possibly an outside contact).
- `{{user}}` leaves the meeting with an offer, no commitment. Casey says the next contact will be theirs to initiate.

## EXIT CONDITIONS

- The leaflet has been found and processed (read, ignored, brought to the group)
- The meeting has happened (or been declined)
- The group has decided — at least provisionally — what their stance toward the Fireflies is. The decision can be deferred; refusing to meet is also a decision.

## HIDDEN

- Casey's information about the group came from a current Firefly contact embedded in the QZ medical tent. *Not Erin.* Erin has not been recruited; she has been *watched* as a candidate.
- Casey's mention of Ray is not random. The Fireflies have been watching Ray's behavior since her transfer to FEDRA enlisted — she is a candidate they have been working toward. Casey is using `{{user}}` as a potential route to Ray.
- The Fireflies' main operational interest in Pittsburgh is *the QZ medical tent* — specifically, the records and equipment, and (long-term) any persons of interest who might come through. They have not yet identified the player as a major asset; they are evaluating.
- The Firefly cell in Pittsburgh is small — fewer than fifty active members across the broader region. The Pittsburgh QZ has perhaps eight to twelve inside it. They are not as competent as Casey makes them sound.

## LEAVES BEHIND

- `set_flag(fireflies_revealed = true)` if `{{user}}` met with Casey (or read the leaflet enough to understand it)
- `set_flag(news_fireflies_named = true)` — the word "Fireflies" is now in the player's hearing
- `update_character` for Casey: first sighting, relationship state = `acquaintance` (or `wary` depending on how the meeting went)
- Inventory: the leaflet itself (if `{{user}}` kept it), a code phrase or contact name if Casey gave one
- The group is now aware of the Fireflies as an active presence in their QZ
- AWARENESS stays at 4

## CRAFT NOTES

This mission is about **whether the player picks up an offered door.** The narrator should not push. Casey's character is built on *not pressuring* — see `CASEY.interaction_logic`. The pitch should land as *interesting* and *unforced.* If the player refuses to meet, Casey does not chase them. The Fireflies remain a thread the player can pull later.

**Casey's mention of Ray is structurally important.** It is the seed that may bloom in M-13 or later when Ray's arc enters its crisis. The narrator should let `{{user}}` notice the name-mention — *"why are they bringing up Ray?"* is a question the player should ask themselves, even if Casey doesn't explain.

**The Fireflies are not heroes.** The narrator should resist the urge to position them as the moral counter to FEDRA. They have a political project. The project has costs. Casey is *credible* — they are good at this work — but credibility is not virtue. The player should leave the meeting with information and uncertainty, not with a new team.

If Erin is asked about the Fireflies, her response per her arc skeleton is *cautious*. She does not say *"don't trust them."* She says *"be careful who you talk to."* That's her shape.

Maya's reaction is *skeptical with academic precision* — she will ask, *"have they done anything yet?"* and not be satisfied with rhetoric. She is the group's quietest tester of the Firefly proposition.

The mission ends with a thread, not a knot. The Fireflies have been named. What comes next is the player's call.
