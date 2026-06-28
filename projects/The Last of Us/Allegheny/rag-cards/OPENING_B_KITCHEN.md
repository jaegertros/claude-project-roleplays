<rag_card id="opening.b_kitchen" type="mission_or_opening_card" entity="The Kitchen" spoiler_level="mixed" visibility="retrieve_when_relevant">
<card_meta>
<canonical_name>The Kitchen</canonical_name>
<project>The Last of Us / Allegheny</project>
<source_file>modular-full/Missions/OPENING_B_Kitchen.md</source_file>
<aliases>The Kitchen, B Kitchen, OPENING B Kitchen</aliases>
<retrieval_keywords>The Last of Us / Allegheny, Missions, The Kitchen, B Kitchen, OPENING B Kitchen, OPENING_B — The Kitchen, Before composing, The opening, After the opening</retrieval_keywords>
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
# OPENING_B — The Kitchen

The second of three alternate cold opens for *Project Allegheny*. Selected by the formula `length(first_message_chars) mod 3 + 1`; this is Opening B (result = 2). Selected manually if the player asks for "the kitchen one."

This file is retrieved by the narrator on the first turn of a new chat session when Opening B is selected. After this opening runs, the story proceeds to **M-01: Saturday, the Rest of the Day** (per `KNOWLEDGE_6_Missions.md`).

---

## Before composing

The narrator reads the persona file (`KNOWLEDGE_USER_<name>.md`) for `{{user}}`'s identifying details: name, age, pronouns, profession, any background. If the persona is missing fields, defaults apply (age 32, he/him, software engineer, six years burned out — per instructions). If the player has specified Maya's name (or another name) in the first message, use it; otherwise default to "Maya."

The opening is written in **second-person italic frame** for tonal intimacy. After the italic frame closes, the narrator may shift to third-person past matching `{{user}}`'s name, or stay in second-person if the player has signaled preference. The italic frame is deliberate — it puts the player inside `{{user}}` for the cold open. The substitution rule still holds: `{{user}}` resolves to the persona name; "you" in the italic frame stays as "you."

---

## The opening

*Saturday late morning, late September. You flew in last night and slept on her couch and you are presently standing in her kitchen in a t-shirt and yesterday's jeans watching her make coffee in a French press she clearly bought used. She is talking. She has been talking since you came in, about her advisor, about a girl in her cohort who said something passive-aggressive at a defense last week, about the cat who hates you on principle. The television in the living room is on low. CNN. A red banner.*

▼ Day 1 (Saturday) — 10:22 · Lawrenceville, Pittsburgh

She poured the water in a slow careful spiral over the grounds. The kitchen window faced east into a fire escape and a brick wall ten feet away, and the light came through it in a soft diffuse rectangle that fell across the counter and her hands.

"— and *then* she said, and I swear to god, she said, 'well I think we *all* know what *kind* of researcher Rachel is.' Like in front of everyone. In front of *Dr. Kemp*."

On the television, the banner read INDONESIA: MYSTERY ILLNESS CLUSTER GROWS, and an anchor was speaking to a doctor on a satellite link. The doctor looked tired.

"I'm listening," you said.

"You're not."

She did not look up from the press.

[Tracker: Day 1 (Saturday), 10:22 · Maya's apartment | no change]
[Inventory: duffel bag (in living room), backpack, phone (62%, full signal), wallet ($150 cash, ID, 3 cards), house keys | With: MAYA | Condition: rested | Awareness: 0]

*Type /? for commands.*

---

## After the opening

The narrator should:
- Call `start_session("allegheny")` if not already called on this turn
- Hand control to the player for the next action
- Be prepared for M-01 to fire when the morning's beat completes (the kitchen scene flows naturally into the rest of Saturday)
</mission_content>
</rag_card>
