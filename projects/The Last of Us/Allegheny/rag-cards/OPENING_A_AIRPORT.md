<rag_card id="opening.a_airport" type="mission_or_opening_card" entity="The Airport" spoiler_level="mixed" visibility="retrieve_when_relevant">
<card_meta>
<canonical_name>The Airport</canonical_name>
<project>The Last of Us / Allegheny</project>
<source_file>modular-full/Missions/OPENING_A_Airport.md</source_file>
<aliases>The Airport, A Airport, OPENING A Airport</aliases>
<retrieval_keywords>The Last of Us / Allegheny, Missions, The Airport, A Airport, OPENING A Airport, OPENING_A — The Airport, Before composing, The opening, After the opening</retrieval_keywords>
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
# OPENING_A — The Airport

The first of three alternate cold opens for *Project Allegheny*. Selected by the formula `length(first_message_chars) mod 3 + 1`; this is Opening A (result = 1). Selected manually if the player asks for "the airport one."

This file is retrieved by the narrator on the first turn of a new chat session when Opening A is selected. After this opening runs, the story proceeds to **M-01: Saturday, the Rest of the Day** (per `KNOWLEDGE_6_Missions.md`).

---

## Before composing

The narrator reads the persona file (`KNOWLEDGE_USER_<name>.md`) for `{{user}}`'s identifying details: name, age, pronouns, profession, any background. If the persona is missing fields, defaults apply (age 32, he/him, software engineer, six years burned out — per instructions). If the player has specified Maya's name (or another name) in the first message, use it; otherwise default to "Maya."

The opening is written in **second-person italic frame** for tonal intimacy. After the italic frame closes, the narrator may shift to third-person past matching `{{user}}`'s name, or stay in second-person if the player has signaled preference. The italic frame is deliberate — it puts the player inside `{{user}}` for the cold open. The substitution rule still holds: `{{user}}` resolves to the persona name; "you" in the italic frame stays as "you."

---

## The opening

*Saturday morning, late September. You've just landed at Pittsburgh International, the only person on your flight who didn't sleep through descent, and you've been standing at baggage claim for eleven minutes watching the same three bags go around. She was supposed to be here. She is not here. Your phone says she texted forty minutes ago that she was leaving the apartment, and the read receipt on your reply has never appeared.*

▼ Day 1 (Saturday) — 09:47 · Pittsburgh International Airport

The carousel made its slow loop. A man in a Steelers jacket lifted a duffel and walked away whistling. Above the carousel, a television was playing the morning news on mute — a banner about a hospital in Indonesia, an anchor's serious face, a graphic with a fungal cell illustration that you registered without registering. Your phone vibrated.

*sorry sorry sorry parking is a nightmare i'm here i'm here in the loop in the silver thing*

You shouldered your duffel and pushed toward the doors. The September air outside was warm and smelled faintly of jet fuel and someone's cigarette. She was leaning against the hood of a battered silver Honda waving with both hands.

"There he is," she called. "There's my guy. Come here."

[Tracker: Day 1 (Saturday), 09:47 · PIT Airport | no change]
[Inventory: duffel bag, backpack (laptop, charger, kindle), phone (78%, full signal), wallet ($150 cash, ID, 3 cards), keys (home) | With: MAYA | Condition: travel-tired | Awareness: 0]

*Type /? for commands.*

---

## After the opening

The narrator should:
- Call `start_session("allegheny")` if not already called on this turn
- Hand control to the player for the next action
- Be prepared for M-01 to fire when the day's downtime starts (the drive home from the airport transitions naturally into M-01's frame: settling in at Maya's apartment, the rest of Saturday)
</mission_content>
</rag_card>
