<rag_card id="utility.prices.tools_ship_supplies_medicines" type="price_lookup" entity="tools_ship_supplies_medicines_prices" spoiler_level="player_safe" visibility="mechanical_lookup">
<card_meta>
<canonical_name>Prices — Tools, ship supplies, medicines</canonical_name>
<aliases>tools, ship supplies, medicines, rope, sailcloth, tar, pitch, lantern, journal, laudanum, cinchona, surgery</aliases>
<retrieval_keywords>hemp rope, sailcloth, tar, pine pitch, lantern oil, paper, leather journal, sextant, spyglass, compass, cinchona, laudanum, Lefèvre</retrieval_keywords>
<content_role>Mechanical utility reference for prices, money, time, distance, schedules, weather, and tracker consistency.</content_role>
</card_meta>

<retrieval_contract>
<use_when>Use when the player buys, sells, asks about, hires, receives, loses, owes, or negotiates anything in the tools, ship supplies, medicines category.</use_when>
<do_not_use_when>Do not use for unrelated goods. Retrieve a closer price card if this table is not the nearest anchor.</do_not_use_when>
<player_visible>Player may see exact costs when asked or when spending occurs.</player_visible>
<narrator_only>Use exact listed prices to update money. Use closest listed item as anchor for unlisted goods.</narrator_only>
<leak_discipline>Do not recite the whole table in narration. Give one concrete cost or apply it silently unless the player asks for a list.</leak_discipline>
<tracker_rule>When this card changes money, time, status, inventory, or travel progress, update the tracking block exactly and consistently.</tracker_rule>
<related_cards>
- utility.currency
- cast.lefevre
- hidden.lefevres_customer_list
- locations.town_districts
</related_cards>
<output_rule>When a transaction occurs, subtract or add the exact amount and update the tracking block immediately.</output_rule>
</retrieval_contract>

<utility_content format="markdown">
## II. PRICES

All prices in reales unless otherwise noted. Round up by half a real for negotiable goods; the figures are the typical opening number.

### Tools, ship supplies, medicines

| Good | Price |
|---|---|
| Hemp rope, per fathom | 1 real |
| Sailcloth, per yard | 4 reales |
| Tar, per gallon | 4 reales |
| Pine pitch, per gallon | 3 reales |
| Iron nail (large) | 1 real |
| Lantern (oil) | 1 piece of eight |
| Lantern oil, per pint | 1 real |
| Tinder box | 4 reales |
| Quill and ink, set | 2 reales |
| Paper, quire (24 sheets) | 1 real |
| Leather journal (Hosea Penn's shop) | 1 piece of eight |
| Sextant (Lefèvre carries one used) | 4 doubloons |
| Spyglass | 2 doubloons |
| Compass (boxed) | 1 doubloon |
| Cinchona bark, per ounce | 1 escudo |
| Laudanum, small bottle | 1 piece of eight |
| Mercurial preparation (course of treatment for pox) | 2 escudos |
| Common herbal remedies | 1–2 reales each |
| Bandaging and basic surgery (Lefèvre, no questions) | 1 piece of eight |
| Stitching of a knife wound (Lefèvre) | 4 reales |
| Pulling a tooth | 2 reales (any cooper or smith will do it for less) |
</utility_content>
</rag_card>
