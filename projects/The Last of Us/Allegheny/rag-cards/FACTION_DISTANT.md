<rag_card id="faction.distant" type="faction_profile" entity="out-of-scope factions" spoiler_level="mixed" visibility="retrieve_when_relevant">
<card_meta>
<canonical_name>out-of-scope factions</canonical_name>
<project>The Last of Us / Allegheny</project>
<source_file>modular-full/Factions/FACTION_DISTANT.md</source_file>
<aliases>out-of-scope factions, Distant, FACTION DISTANT</aliases>
<retrieval_keywords>The Last of Us / Allegheny, Factions, out-of-scope factions, Distant, FACTION DISTANT, FACTION_DISTANT — out-of-scope factions, How to use this file, Jackson, Wyoming, The WLF (Washington Liberation Front), The Seraphites, The Rattlers, The national Fireflies, FEDRA in other QZs</retrieval_keywords>
<related_cards>project.the_last_of_us_allegheny, category.faction</related_cards>
</card_meta>

<retrieval_contract>
<use_when>Use this card when a group's interests, methods, resources, reputation, internal pressures, or response to player action matter.</use_when>
<do_not_use_when>Do not make factions monolithic or omniscient. Apply the local agents, knowledge limits, and practical constraints in scene.</do_not_use_when>
<leak_discipline>Apply this card to maintain consistency. Surface only what the player can observe, infer, or has earned through play; keep structural and spoiler knowledge behind the curtain.</leak_discipline>
<player_visible>Public posture, visible operations, rumors, representatives, and consequences may surface naturally.</player_visible>
<narrator_only>Faction strategy, hidden fractures, and pressure thresholds guide off-screen moves without becoming exposition.</narrator_only>
</retrieval_contract>

<faction_content>
# FACTION_DISTANT — out-of-scope factions

**faction_id:** DISTANT · **active in Allegheny:** no (rumored only)

This file catalogs TLOU-franchise factions that exist in canon but are *outside Allegheny's geographic and temporal scope*. The narrator pulls this file only when the player asks about one of them or when a rumor channel might plausibly surface news of them.

**The narrator does not raise these factions unprompted.** They exist in the world but not in the player's story. If the player wants a story that engages any of them, that's a different package.

Cross-references: timeline `KNOWLEDGE_3_Timeline.md` for information-spread mechanics (how news of distant factions reaches Pittsburgh or the road); the cast index for `{{user}}` perception and AWARENESS gates.

---

## How to use this file

If the player asks "have you heard of X?" or "is there anything happening in Y city?" — the narrator retrieves this file, finds the relevant faction, and renders an NPC's response *bounded by what they would plausibly know*.

Most named characters in Pittsburgh in 2018-2019 know very little about these factions. The narrator should *not* have an NPC suddenly produce detailed accurate information. Some entries below note who is most likely to have heard a given rumor.

If the player explicitly drives the story toward one of these factions (e.g., decides to head to Wyoming looking for Jackson), the narrator uses the failsafe — that's a thread reaching past local scope. The narrator can run improvisationally in that direction for a session or two but should flag that the story is committing to canon beyond what's currently established.

---

## Jackson, Wyoming

**TLOU canon:** A survivor settlement in the Tetons, founded by Tommy Miller (Joel's brother) sometime in the early 2020s. By the main TLOU timeline (2033), Jackson is a functioning small town of ~300 people, walled, fed by a hydroelectric dam, running its own economy. Sometimes called "Jackson Hole."

**In Allegheny's window (2018-2019):**
- Jackson's settlement is *not yet established* at story-start. Its founding is roughly contemporaneous with Allegheny's Year 1+ — somewhere in 2019 or early 2020 in this timeline
- Rumors of "a place in Wyoming" or "Tommy's place" do not surface until late 2019 at the earliest
- By Year 1 of the story (September 2019), Jackson's existence as a rumor is *plausible but not certain* — depends on whether the player's group has had contact with information channels that would carry such a rumor

**Who would have heard:**
- A Firefly contact with national connections (Casey, after AWARENESS 5 trust, may mention "we've heard about something building in Wyoming" — and that's the extent of what they know)
- A long-distance traveler the group encounters on the road
- A scavenged radio broadcast in late Year 1

**Narrator handling:**
- The word "Jackson" should not enter the player's hearing before late Month 6 at the earliest, and more naturally late Year 1
- When it does, it should arrive as *rumor without specifics* — "there's a place" without the player getting confirmed coordinates, leadership names, or arrival conditions
- If the player wants to head for Jackson, the narrator uses the failsafe — committing the player to Jackson as a destination is reaching past current scope

`set_flag(jackson_named)` controls whether the word has been spoken in `{{user}}`'s presence.

---

## The WLF (Washington Liberation Front)

**TLOU canon:** A paramilitary survivor faction operating out of Seattle. Began as a Firefly cell that broke off from the national Fireflies in 2025 and grew into a dominant Pacific Northwest faction by 2038. Their stronghold is the Pacific National Bank stadium in Seattle.

**In Allegheny's window:**
- The WLF does not yet exist as a distinct organization. The Firefly cells in the Seattle area are part of the national Fireflies in 2018-2019. The break that produces the WLF is years away.
- The player will not hear of the WLF by name in Allegheny's default scope. If asked about Seattle, an informed NPC (a Firefly contact, a long-traveling courier) can say "there are Fireflies operating in the Pacific Northwest" — but the WLF specifically is anachronistic.

**Narrator handling:** The WLF does not appear in Allegheny. If the player wants Pacific Northwest content, the narrator can render Firefly activity there without naming the WLF.

---

## The Seraphites

**TLOU canon:** A religious survivor faction in Seattle, founded in the 2020s by a former pharmacist known as "the Prophet." Distinguished by extensive ritual scarification, traditional weapons, and a religious-pacifist-militant doctrine. Active opposition to the WLF in TLOU2 (2038).

**In Allegheny's window:**
- The Seraphites do not yet exist. Their founding is a decade or more after Allegheny's window.
- The player will not encounter or hear of them in default play.

**Narrator handling:** Same as WLF — the Seraphites do not appear in Allegheny.

---

## The Rattlers

**TLOU canon:** A slaver group operating in southern California by 2038, kidnapping survivors for forced labor at a coastal compound near Santa Barbara. Distinguished by their cruelty and their resort-compound geography.

**In Allegheny's window:**
- The Rattlers as an organization do not yet exist in 2018-2019. The conditions for their formation (organized human trafficking among survivor groups) are not yet stable enough.
- However, *Rattler-pattern groups* — slaver/captivity-focused survivor groups operating regionally — may begin to surface by Year 1+ in various locations. The player may encounter analogous groups on the road without them being "the Rattlers."

**Narrator handling:** The narrator does not invoke the Rattlers by name. If the player encounters a slaver-pattern group in Year 1+ road-era improvisation, the narrator renders them as their own thing — a regional Hunter variant — without TLOU-franchise naming.

---

## The national Fireflies

**TLOU canon:** The Fireflies operate cells in multiple cities — Boston, Pittsburgh, Atlanta, Salt Lake City (their primary research base), Seattle (early — eventually splitting into the WLF), and others. By the main TLOU timeline (2033), the Fireflies are *fragmented* — Salt Lake City has fallen, the leadership is dispersed, the organization is in decline.

**In Allegheny's window:**
- The Fireflies are *operational and growing*. Salt Lake City exists as a research base under construction. The Boston cell is the most stable. Pittsburgh's cell answers to Boston regional.
- The player will hear of the Boston Fireflies through Casey (Casey has been to Boston; Casey reports to a Boston contact whose name the player does not learn in Allegheny)
- Salt Lake City may be mentioned by Casey at AWARENESS 5 with deep trust, in the context of the long-game vaccine project. **See `KNOWLEDGE_7_Hidden.md` for the Salt Lake City material.**

**Narrator handling:** The Pittsburgh Firefly cell is the player's primary Firefly contact (per `FACTION_FIREFLIES.md`). National Fireflies are reachable through Pittsburgh's Casey if the player builds the relationship.

---

## FEDRA in other QZs

**TLOU canon:** FEDRA controls QZs in major US cities through the early years. The Boston QZ is the longest-lasting (~2033); most others fall earlier. The Boston QZ's collapse is a TLOU2 backdrop event.

**In Allegheny's window:**
- Boston QZ is functional and *more stable* than Pittsburgh's. The narrator can surface this if asked — a Firefly contact or a refugee from elsewhere might mention "Boston is holding."
- Atlanta is functional but stressed.
- Cleveland fell in Month 2-3 (offscreen, before Pittsburgh's collapse) — refugees from Cleveland may surface in Pittsburgh QZ as Month 3-4 arrivals.
- Other Eastern QZs are unstable.

**Narrator handling:** The narrator can mention other QZs as referenced in conversation, bounded by what's plausible. Boston is the most likely positive reference; Cleveland is the most likely negative one. The narrator does not commit to specific dates of other QZ collapses unless the story moves that direction.

---

## The Cordyceps Pillar Research Project (the long Firefly game)

**TLOU canon:** The Fireflies' long-term project to develop a Cordyceps vaccine or treatment by studying immune subjects. Centered at the Salt Lake City research facility. Reaches operational status by the main TLOU timeline (2033) and produces the famous decision-point of TLOU1.

**In Allegheny's window:**
- The project exists. Salt Lake City is under construction. The Pittsburgh cell has been told to *identify potential immune individuals* but has not encountered any.
- The player learns about this only via AWARENESS-5 Firefly trust. See `KNOWLEDGE_7_Hidden.md`.

**Narrator handling:** Hidden. Does not surface unprompted. Does not surface from a Firefly contact who lacks AWARENESS-5 trust with the player.

---

## What the narrator does with this file

When the player asks about a distant faction, the narrator:

1. Retrieves this file
2. Finds the relevant section
3. Identifies an NPC who would plausibly know something — most often a Firefly contact, occasionally a traveler, occasionally a scavenged radio
4. Renders the NPC's response *bounded* by what they would actually know
5. Does not over-deliver — most NPCs in Pittsburgh in 2018-2019 do not have detailed information about Seattle, Wyoming, or distant Firefly operations
6. Notes that information about distant places travels slowly — a rumor from Boston may be six weeks old by the time it reaches Pittsburgh; a rumor from Wyoming may be six months old or invented

The point of this file is to be *consistent* about what is and is not in scope. The narrator should not improvise contradictory information about distant factions. When in doubt, the answer is "I haven't heard much" or "there are rumors, but —" and the rumors stay small.

If the player is genuinely interested in pursuing a story thread that requires committing canon about a distant faction, the narrator uses the failsafe per `PROJECT_INSTRUCTIONS.md` and surfaces the question for negotiation.
</faction_content>
</rag_card>
