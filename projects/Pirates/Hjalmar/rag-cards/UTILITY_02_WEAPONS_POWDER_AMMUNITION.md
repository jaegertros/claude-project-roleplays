<rag_card id="utility.prices.weapons_powder_ammunition" type="price_lookup" entity="weapons_powder_ammunition_prices" spoiler_level="player_safe" visibility="mechanical_lookup">
<card_meta>
<canonical_name>Prices — Weapons, powder, ammunition</canonical_name>
<aliases>weapons, powder, ammunition, knife, cutlass, pistol, musket, blunderbuss, flints</aliases>
<retrieval_keywords>knife, cutlass, boarding pike, belaying pin, flintlock pistol, musket, blunderbuss, black powder, lead shot, flints</retrieval_keywords>
<content_role>Mechanical utility reference for prices, money, time, distance, schedules, weather, and tracker consistency.</content_role>
</card_meta>

<retrieval_contract>
<use_when>Use when the player buys, sells, asks about, hires, receives, loses, owes, or negotiates anything in the weapons, powder, ammunition category.</use_when>
<do_not_use_when>Do not use for unrelated goods. Retrieve a closer price card if this table is not the nearest anchor.</do_not_use_when>
<player_visible>Player may see exact costs when asked or when spending occurs.</player_visible>
<narrator_only>Use exact listed prices to update money. Use closest listed item as anchor for unlisted goods.</narrator_only>
<leak_discipline>Do not recite the whole table in narration. Give one concrete cost or apply it silently unless the player asks for a list.</leak_discipline>
<tracker_rule>When this card changes money, time, status, inventory, or travel progress, update the tracking block exactly and consistently.</tracker_rule>
<related_cards>
- utility.currency
- cast.big_anna
- faction.free_brotherhood
</related_cards>
<output_rule>When a transaction occurs, subtract or add the exact amount and update the tracking block immediately.</output_rule>
</retrieval_contract>

<utility_content format="markdown">
## II. PRICES

All prices in reales unless otherwise noted. Round up by half a real for negotiable goods; the figures are the typical opening number.

### Weapons, powder, ammunition

| Good | Price |
|---|---|
| Knife (sailor's, rough) | 4 reales |
| Knife (well-made) | 1 piece of eight |
| Cutlass (rough) | 1 piece of eight |
| Cutlass (good) | 1 escudo |
| Boarding pike | 4 reales |
| Belaying pin (or equivalent improvised weapon) | nothing; ambient |
| Flintlock pistol (used, marginal) | 4 pieces of eight |
| Flintlock pistol (decent) | 1 doubloon (32 reales) |
| Flintlock pistol (good Spanish or Dutch make) | 2 doubloons |
| Pair of matched pistols | 4 doubloons |
| Musket (military-grade) | 1 doubloon |
| Blunderbuss | 1.5 doubloons |
| Powder horn (filled, ~1/2 pound) | 4 reales |
| Black powder per pound (small quantity) | 4 reales |
| Black powder per cask (~25 pounds) | 2 doubloons |
| Lead shot per pound | 2 reales |
| Pre-cast pistol ball, bag of 20 | 2 reales |
| Flints, dozen | 1 real |
</utility_content>
</rag_card>
