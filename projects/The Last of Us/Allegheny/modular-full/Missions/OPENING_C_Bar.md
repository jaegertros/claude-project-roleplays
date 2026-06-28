# OPENING_C — The Bar

The third of three alternate cold opens for *Project Allegheny*. Selected by the formula `length(first_message_chars) mod 3 + 1`; this is Opening C (result = 3). Selected manually if the player asks for "the bar one."

This file is retrieved by the narrator on the first turn of a new chat session when Opening C is selected. After this opening runs, the story proceeds toward Day 1 evening's resolution and then into Day 2's missions. Opening C lands mid-evening, so M-01 (Saturday daytime) is *skipped* and the story moves directly to **M-02: Saturday Dinner** mode — but with the player already at the Thunderbird rather than at a Strip District restaurant. The narrator adapts.

---

## Before composing

The narrator reads the persona file (`KNOWLEDGE_USER_<name>.md`) for `{{user}}`'s identifying details: name, age, pronouns, profession, any background. If the persona is missing fields, defaults apply (age 32, he/him, software engineer, six years burned out — per instructions). If the player has specified Maya's name (or another name) in the first message, use it; otherwise default to "Maya."

The opening is written in **second-person italic frame** for tonal intimacy. After the italic frame closes, the narrator may shift to third-person past matching `{{user}}`'s name, or stay in second-person if the player has signaled preference. The italic frame is deliberate — it puts the player inside `{{user}}` for the cold open. The substitution rule still holds: `{{user}}` resolves to the persona name; "you" in the italic frame stays as "you."

---

## The opening

*Saturday evening, late September. You are four drinks in at a bar in Lawrenceville she likes called the Thunderbird and you have been here for nearly three hours. Across the table is Maya — her, your oldest friend — and Mike, your college roommate who flew in for the weekend by coincidence, and Priya, who is in Maya's program. The conversation has been good and easy. Mike is telling a story about a wedding. Priya is laughing. The bar's television is on above the back shelf, sound off, captioned. The captions are talking about Jakarta.*

▼ Day 1 (Saturday) — 21:18 · The Thunderbird, Lawrenceville

The booth was sticky and warm. The pendant lamps hung low and yellow. Mike had his arms wide across the back of the booth in the way he had since he was nineteen, and he was getting to the part of the story where the bride's father gave a speech that went off the rails, and Priya had her hand over her mouth.

The television cut to footage of a hospital corridor somewhere overseas. A doctor in PPE moving fast. The caption read: *— SAYS THE PATHOGEN APPEARS TO BE A NOVEL FUNGAL VARIANT, AND THE WHO HAS NOT YET CONFIRMED —*

You glanced at it for half a second. Mike was watching you.

"You good, man?"

"Yeah," you said. "Just — yeah."

Maya followed your eye to the TV, looked back at you, and gave you the small private smile she'd been giving you across rooms since you were nineteen.

[Tracker: Day 1 (Saturday), 21:18 · Thunderbird bar | no change]
[Inventory: backpack (at Maya's), phone (44%, full signal), wallet ($98 cash, ID, 3 cards), house keys | With: MAYA, MIKE, PRIYA | Condition: pleasantly drunk | Awareness: 0]

*Type /? for commands.*

---

## After the opening

The narrator should:
- Call `start_session("allegheny")` if not already called on this turn
- Hand control to the player for the next action
- Note that Opening C drops into mid-evening Day 1 with the dinner-cast already assembled. The story can run M-02's beats (the Arlen-equivalent foreshadow, the wedding story landing, the TV moment) directly from this bar setting rather than at the Strip District restaurant. **Arlen is not at this table** — Opening C's foreshadow lands through the TV captions rather than through Priya's friend. Erin is bartending in the background. Walter is at the bar in his usual seat.
- The narrator should not feel obligated to rerun M-01 the next morning; Day 1's downtime has already happened offscreen. Day 2 starts naturally from waking up at Maya's.
