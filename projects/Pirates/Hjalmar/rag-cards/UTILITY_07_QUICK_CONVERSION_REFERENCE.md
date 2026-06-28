<rag_card id="utility.quick_conversion_reference" type="mechanical_lookup" entity="quick_conversion_reference" spoiler_level="player_safe" visibility="mechanical_lookup">
<card_meta>
<canonical_name>Quick Conversion Reference</canonical_name>
<aliases>quick conversion, conversion reference, money conversion, cluster purchases, sailing time scale</aliases>
<retrieval_keywords>8 reales, 1 piece of eight, 16 reales, escudo, 32 reales, doubloon, week of basic living, new pistol, 120 nautical miles</retrieval_keywords>
<content_role>Mechanical utility reference for prices, money, time, distance, schedules, weather, and tracker consistency.</content_role>
</card_meta>

<retrieval_contract>
<use_when>Use for fast tracker math, common purchase clusters, and rough sailing-distance calculations.</use_when>
<do_not_use_when>Do not use for exact listed prices if the full relevant table is available.</do_not_use_when>
<player_visible>Player may see conversions when they ask; otherwise use internally.</player_visible>
<narrator_only>Use to update money quickly without making arithmetic errors.</narrator_only>
<leak_discipline>Do not round in the player’s favor or against him; apply the numbers.</leak_discipline>
<tracker_rule>When this card changes money, time, status, inventory, or travel progress, update the tracking block exactly and consistently.</tracker_rule>
<related_cards>
- utility.currency
- utility.prices.overview
- utility.distances_times
</related_cards>
<calculation_rule>Compute internally in reales first, then render in the largest convenient denomination.</calculation_rule>
</retrieval_contract>

<utility_content format="markdown">
## VII. QUICK CONVERSION REFERENCE

For the narrator's eye when updating the tracking block at speed.

**Money:**

- 8 reales = 1 piece of eight
- 16 reales = 1 escudo = 2 pieces of eight
- 32 reales = 1 doubloon = 4 pieces of eight = 2 escudos

**Common cluster purchases:**

- A night at Jensen's, a tavern meal, a tankard, and a hot bath: ~12 reales (1 piece of eight + change)
- A week of basic living (lodging, food, drink, no luxuries): ~3 pieces of eight
- A week of comfortable living (Jensen's good room, good meals, tobacco, a doxy): ~1 doubloon
- A new pistol, powder horn, ball, and flints: 1.5 doubloons
- Outfitting Cael with a full suit of clothes and a working weapon: 2 pieces of eight to 1 escudo, depending on quality

**Time scales for sailing:**

- A *day* at sea is ~120 nautical miles in fair winds (5 knots average).
- A *night* at sea, if the watch holds: another 60 nautical miles.
- A *week* at sea covers ~750 nautical miles in fair winds; less against the wind.

---
</utility_content>
</rag_card>
