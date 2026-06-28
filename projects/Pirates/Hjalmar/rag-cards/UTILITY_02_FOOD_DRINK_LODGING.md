<rag_card id="utility.prices.food_drink_lodging" type="price_lookup" entity="food_drink_lodging_prices" spoiler_level="player_safe" visibility="mechanical_lookup">
<card_meta>
<canonical_name>Prices — Food, drink, lodging</canonical_name>
<aliases>food prices, drink prices, lodging, tavern meal, rum, Madeira, Jensen's, Helm hammock</aliases>
<retrieval_keywords>eggs, salt cod, salt pork, fresh fish, rum, Madeira, coffee, tavern meal, Jensen's, lodging, hammock</retrieval_keywords>
<content_role>Mechanical utility reference for prices, money, time, distance, schedules, weather, and tracker consistency.</content_role>
</card_meta>

<retrieval_contract>
<use_when>Use when the player buys, sells, asks about, hires, receives, loses, owes, or negotiates anything in the food, drink, lodging category.</use_when>
<do_not_use_when>Do not use for unrelated goods. Retrieve a closer price card if this table is not the nearest anchor.</do_not_use_when>
<player_visible>Player may see exact costs when asked or when spending occurs.</player_visible>
<narrator_only>Use exact listed prices to update money. Use closest listed item as anchor for unlisted goods.</narrator_only>
<leak_discipline>Do not recite the whole table in narration. Give one concrete cost or apply it silently unless the player asks for a list.</leak_discipline>
<tracker_rule>When this card changes money, time, status, inventory, or travel progress, update the tracking block exactly and consistently.</tracker_rule>
<related_cards>
- locations.town_districts
- cast.margriet
- cast.madame_jensen
- utility.currency
</related_cards>
<output_rule>When a transaction occurs, subtract or add the exact amount and update the tracking block immediately.</output_rule>
</retrieval_contract>

<utility_content format="markdown">
## II. PRICES

All prices in reales unless otherwise noted. Round up by half a real for negotiable goods; the figures are the typical opening number.

### Food, drink, lodging

| Good | Price |
|---|---|
| Dozen eggs | 2 reales |
| Pound of salt cod | 1 real |
| Pound of salt pork | 2 reales |
| Pound of fresh fish | 1 real |
| Pound of fresh meat (goat, turtle) | 3 reales |
| Pound of plantain or cassava | 1/2 real |
| Pound of sugar | 1 real |
| Pound of salt | 1 real |
| Pound of coffee | 2 reales |
| Pound of chocolate | 4–6 reales |
| Loaf of bread | 1 real |
| Gallon of small beer | 1 real |
| Gallon of ale (imported) | 2 reales |
| Tankard of ale | 1/2 real |
| Bottle of cheap rum | 4 reales |
| Bottle of decent rum | 1 piece of eight (8 reales) |
| Bottle of Madeira | 1 escudo (16 reales) |
| Bottle of Spanish brandy | 1 escudo |
| Cup of coffee in a tavern | 1 real |
| Tavern meal — basic (bread, beans, fish) | 2 reales |
| Tavern meal — good (meat, vegetables, bread, drink) | 4 reales |
| Tavern meal — fine (Jensen's or a Council household) | 1 piece of eight |

**Lodging:**

| Where | Rate |
|---|---|
| Sailor's loft above a shop, shared | 4 reales per week |
| Tregenza's back rooms at the Three Anchors | 6 reales per week |
| Jensen's modest single | 1 piece of eight per week |
| Jensen's good room (window, water jug, candles) | 2 pieces of eight per week |
| Lodging at the mission (charity, if Father Vega allows) | a small donation expected |
| A hammock at the Helm overnight | 1 real |
</utility_content>
</rag_card>
