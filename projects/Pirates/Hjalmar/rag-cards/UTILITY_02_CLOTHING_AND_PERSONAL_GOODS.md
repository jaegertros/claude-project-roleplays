<rag_card id="utility.prices.clothing_personal_goods" type="price_lookup" entity="clothing_and_personal_goods_prices" spoiler_level="player_safe" visibility="mechanical_lookup">
<card_meta>
<canonical_name>Prices — Clothing and personal goods</canonical_name>
<aliases>clothing, boots, shirt, breeches, coat, hat, soap, razor, tobacco</aliases>
<retrieval_keywords>plain shirt, plain breeches, working coat, good coat, used boots, new boots, tricorne, soap, comb, razor, tobacco</retrieval_keywords>
<content_role>Mechanical utility reference for prices, money, time, distance, schedules, weather, and tracker consistency.</content_role>
</card_meta>

<retrieval_contract>
<use_when>Use when the player buys, sells, asks about, hires, receives, loses, owes, or negotiates anything in the clothing and personal goods category.</use_when>
<do_not_use_when>Do not use for unrelated goods. Retrieve a closer price card if this table is not the nearest anchor.</do_not_use_when>
<player_visible>Player may see exact costs when asked or when spending occurs.</player_visible>
<narrator_only>Use exact listed prices to update money. Use closest listed item as anchor for unlisted goods.</narrator_only>
<leak_discipline>Do not recite the whole table in narration. Give one concrete cost or apply it silently unless the player asks for a list.</leak_discipline>
<tracker_rule>When this card changes money, time, status, inventory, or travel progress, update the tracking block exactly and consistently.</tracker_rule>
<related_cards>
- utility.currency
- locations.town_districts
</related_cards>
<output_rule>When a transaction occurs, subtract or add the exact amount and update the tracking block immediately.</output_rule>
</retrieval_contract>

<utility_content format="markdown">
## II. PRICES

All prices in reales unless otherwise noted. Round up by half a real for negotiable goods; the figures are the typical opening number.

### Clothing and personal goods

| Good | Price |
|---|---|
| Plain shirt (linen) | 4 reales |
| Plain breeches (canvas) | 4 reales |
| Plain coat (working) | 1 piece of eight |
| Good coat (well-made) | 2 pieces of eight |
| Used boots | 1 piece of eight |
| New boots | 1 escudo (16 reales) |
| Cheap straw hat | 1 real |
| Felt hat | 4 reales |
| Tricorne (good) | 1 piece of eight |
| Leather belt | 2 reales |
| Cloak | 1 piece of eight |
| Bar of soap (luxury for sailors) | 2 reales |
| Comb and razor | 2 reales each |
| Pipe (clay) | 1/2 real |
| Twist of tobacco | 1 real |
| Pound of tobacco (good) | 4 reales |
</utility_content>
</rag_card>
