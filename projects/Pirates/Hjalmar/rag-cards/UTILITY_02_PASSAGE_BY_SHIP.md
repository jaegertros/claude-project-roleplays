<rag_card id="utility.prices.passage_by_ship" type="price_lookup" entity="passage_by_ship_rates" spoiler_level="player_safe" visibility="mechanical_lookup">
<card_meta>
<canonical_name>Prices — Passage by ship</canonical_name>
<aliases>passage, ship passage, travel by ship, Charlotte Amalie, Curaçao, Nassau, San Juan, Charleston, Cádiz</aliases>
<retrieval_keywords>Charlotte Amalie passage, Curaçao passage, Nassau passage, San Juan passage, Charleston passage, Cumaná passage, Cádiz passage, cabin and captain's table</retrieval_keywords>
<content_role>Mechanical utility reference for prices, money, time, distance, schedules, weather, and tracker consistency.</content_role>
</card_meta>

<retrieval_contract>
<use_when>Use when the player buys, sells, asks about, hires, receives, loses, owes, or negotiates anything in the passage by ship category.</use_when>
<do_not_use_when>Do not use for unrelated goods. Retrieve a closer price card if this table is not the nearest anchor.</do_not_use_when>
<player_visible>Player may see exact costs when asked or when spending occurs.</player_visible>
<narrator_only>Use exact listed prices to update money. Use closest listed item as anchor for unlisted goods.</narrator_only>
<leak_discipline>Do not recite the whole table in narration. Give one concrete cost or apply it silently unless the player asks for a list.</leak_discipline>
<tracker_rule>When this card changes money, time, status, inventory, or travel progress, update the tracking block exactly and consistently.</tracker_rule>
<related_cards>
- utility.distances_times
- locations.off_map_locations
- utility.currency
</related_cards>
<output_rule>When a transaction occurs, subtract or add the exact amount and update the tracking block immediately.</output_rule>
</retrieval_contract>

<utility_content format="markdown">
## II. PRICES

All prices in reales unless otherwise noted. Round up by half a real for negotiable goods; the figures are the typical opening number.

### Passage by ship

For a paying passenger on a working vessel, basic passage (deck space, ship's biscuit and water, no comforts):

| To | Rate |
|---|---|
| Charlotte Amalie, St. Thomas | 1 escudo |
| Curaçao | 2 escudos |
| Nassau, New Providence | 1 doubloon |
| San Juan, Puerto Rico | 1 escudo |
| Charleston, Carolinas | 2 doubloons |
| Cumaná | 1 doubloon |
| Cádiz, Spain | 4–6 doubloons |

A cabin and the captain's table doubles or triples these figures.
</utility_content>
</rag_card>
