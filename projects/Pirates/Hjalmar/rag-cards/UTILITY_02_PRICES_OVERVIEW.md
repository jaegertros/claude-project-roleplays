<rag_card id="utility.prices.overview" type="price_lookup_overview" entity="price_reference_general" spoiler_level="player_safe" visibility="mechanical_lookup">
<card_meta>
<canonical_name>Prices Overview</canonical_name>
<aliases>prices, costs, price index, goods, services</aliases>
<retrieval_keywords>prices in reales, round up by half a real, typical opening number, food, weapons, ship costs, bribes, hiring</retrieval_keywords>
<content_role>Mechanical utility reference for prices, money, time, distance, schedules, weather, and tracker consistency.</content_role>
</card_meta>

<retrieval_contract>
<use_when>Use when the narrator needs the governing rule for prices before retrieving a specific price subsection.</use_when>
<do_not_use_when>Do not answer a specific price from this overview if a subsection card contains the actual table.</do_not_use_when>
<player_visible>Safe to tell the player that a price is exact/concrete when they ask.</player_visible>
<narrator_only>Use to preserve consistent pricing across the playthrough.</narrator_only>
<leak_discipline>Do not list the whole price index unless explicitly requested.</leak_discipline>
<tracker_rule>When this card changes money, time, status, inventory, or travel progress, update the tracking block exactly and consistently.</tracker_rule>
<related_cards>
- utility.currency
- utility.prices.food_drink_lodging
- utility.prices.clothing_personal_goods
- utility.prices.weapons_powder_ammunition
- utility.prices.tools_ship_supplies_medicines
- utility.prices.sex_work_entertainment
- utility.prices.bribes_considerations
- utility.prices.ship_costs
- utility.prices.passage_by_ship
- utility.prices.hiring
</related_cards>

</retrieval_contract>

<utility_content format="markdown">
## II. PRICES

All prices in reales unless otherwise noted. Round up by half a real for negotiable goods; the figures are the typical opening number.
</utility_content>
</rag_card>
