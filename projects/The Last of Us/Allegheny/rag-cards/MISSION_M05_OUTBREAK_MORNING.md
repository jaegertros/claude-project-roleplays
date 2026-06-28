<rag_card id="mission.m05_outbreak_morning" type="mission_or_opening_card" entity="M-05: Outbreak Morning" spoiler_level="mixed" visibility="retrieve_when_relevant">
<card_meta>
<canonical_name>M-05: Outbreak Morning</canonical_name>
<project>The Last of Us / Allegheny</project>
<source_file>modular-full/Missions/MISSION_M05_Outbreak_Morning.md</source_file>
<aliases>M-05: Outbreak Morning, M05 Outbreak Morning, MISSION M05 Outbreak Morning</aliases>
<retrieval_keywords>The Last of Us / Allegheny, Missions, M-05: Outbreak Morning, M05 Outbreak Morning, MISSION M05 Outbreak Morning, PREMISE, SPECTACLE, THE BEAT, EXIT CONDITIONS, HIDDEN, LEAVES BEHIND, CRAFT NOTES</retrieval_keywords>
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
# M-05: Outbreak Morning

**ACT:** Day 3, Monday morning — **Outbreak Day**
**TRIGGER:** Story clock advances to Day 3 morning
**ANCHOR LOCATION:** Maya's apartment, then the street outside, then wherever the player goes
**PRESENT NPCS:** Maya, Periodical the cat, eventually Mike (calling from the hotel, then arriving at the apartment by mid-morning if `{{user}}` has not gone to him), Victor (passing in the hallway, then knocking by 10 AM)
**MORTALITY-ELIGIBLE:** no

## PREMISE

The day the world breaks. Monday morning starts almost ordinarily — coffee, the cat, the radiator banging at six-thirty — but by 9 AM something is wrong on the news, and by 11 AM the CDC press conference uses a word that didn't exist in public yesterday. The phones lag worse than they did Sunday. Maya cannot reach her mother. By noon, sirens.

## SPECTACLE

- The radiator bangs at six-thirty. The cat wants out.
- The light through the bay window is the same gold it was yesterday and the day before
- The TV is on now in a way it wasn't yesterday. CNN, MSNBC, BBC — the player can flip. The news is no longer ambient.
- Maya's phone vibrates and goes dark. Vibrates again. The connection chimes are slower than they should be.

## THE BEAT

- A normal morning that won't stay normal. Coffee. The cat. The radiator.
- Maya checks her phone. Tries her mother. Doesn't connect. Tries again. Eventually a text goes through. Her mother responds: "we're fine, watching the news, are you ok"
- The TV: at 8 AM the story is still Los Angeles overnight; at 9 AM the headlines shift to multiple US cities; at 10 AM the screen banner reads "CDC PRESS CONFERENCE 11 AM EST"
- Mike calls. He's at his hotel. The wedding is "canceled" — the family in Sewickley has decided to delay. He sounds shaken; he doesn't say why.
- A neighbor pounds on the door at some point — not violently, just urgently. Victor across the hall. He's been calling his daughter in Cleveland for an hour. He came to see if Maya's phone is working any better than his. *(This is Victor's first meaningful appearance in the story; if he hasn't been seeded already, this is where he lands. See `KNOWLEDGE_1_Cast.md` VICTOR.)*
- **The 11 AM CDC press conference.** If the player has the TV on (almost certainly yes), the briefing plays in full. The director uses the word **"Cordyceps."** AWARENESS bumps from 0 to 1 or 2 here, depending on whether the player has been paying attention to prior beats.
- Sirens at some point during the early afternoon. Distant at first. Closer.

## EXIT CONDITIONS

- The player commits to an action — go somewhere, gather supplies, find Mike, find Maya's people. Whatever they choose, the story moves into M-06 (Hospital Run) or M-06b (Apartment Lockdown) depending on the player's path.
- If the player just stays put and watches the TV, the narrator runs the day forward: noon arrives, then 2 PM, then 4 PM, and the world worsens in the background. The narrator should *not* fill the entire afternoon with watching TV; eventually a beat forces a decision (someone known is bitten, the building neighbor needs help, Mike calls in distress).

## HIDDEN

- **Maya's cousin in Jakarta is now dead.** Maya does not know this and will not know for some time. The cousin's silence has been ten days now.
- Arlen (the ER nurse from Saturday's dinner) is at UPMC working her morning shift. Her ER will lock down at 10 AM after the first turning event inside the hospital.
- Mike is shaken because he tried to walk to the lobby of his hotel and saw something through the front window — a person being restrained by two others while a third called 911 on the sidewalk. He won't talk about it in the call. He will eventually, that evening, when he's at Maya's place.
- Victor is more worried than he lets on. His daughter Janice in Cleveland normally picks up immediately. The fact that she hasn't is the worst news he's had since his wife died.
- **`set_flag` triggers in this mission:**
  - `news_cdc_briefing_seen = true` if the player has the TV on during the 11 AM briefing
  - `cordyceps_word_unlocked = true` simultaneously (the word is now in `{{user}}`'s hearing)
  - AWARENESS advances from 0 to 1 (default) or to 2 (if the player has been actively absorbing the news)

## LEAVES BEHIND

- AWARENESS = 1 or 2 (logged via `advance_awareness` with reason)
- `news_cdc_briefing_seen = true`
- `cordyceps_word_unlocked = true` (if conference was seen)
- Maya's `update_character` notes register "couldn't reach her mom this morning"
- Victor is now actively in the cast — `update_character` to `present: true` if he had not been
- Mike is at his hotel; will likely arrive at Maya's by afternoon
- The story has advanced from Sunday morning to Day 3 active outbreak

## CRAFT NOTES

The hardest mission in the deck to pace correctly. The day must feel *gradual* — the difference between 7 AM and 11 AM is the difference between a normal Monday and the day the world ends, and the narrator must render the slope rather than the cliff.

- 6:30 AM (the radiator) should feel exactly like Sunday morning, except for one small detail: the cat is restless.
- 8 AM (the TV) is the first signal the player can pick up. The narrator should not announce it; the player has to look at the TV.
- 9 AM is where it becomes clear that today is not yesterday.
- 11 AM is the named moment — the word Cordyceps enters the world.

**The narrator should not be in a hurry.** This day, played carefully, is six or eight exchanges across the morning and another four or five through the afternoon. The player should feel time *passing*. The next decisions are weighty because the morning has earned them.

The CDC press conference at 11 AM can be rendered in caption form — the player reads it on TV, sees the director's face, hears the word. The narrator does not need to write a full press-conference monologue; one paragraph of caption-quoted speech and the player's reaction is the right shape.

When Mike calls, his voice does the work. *"Hey. Hey, I'm gonna come over, is that okay? Is Maya there? Can I — yeah. I'm gonna come."* The narrator should not have him explain. He shows up at the apartment within the hour.

This mission ends when the player makes a choice. The narrator does not force the player out of the apartment, but the narrator does not let them coast. By mid-afternoon something will need a response.
</mission_content>
</rag_card>
