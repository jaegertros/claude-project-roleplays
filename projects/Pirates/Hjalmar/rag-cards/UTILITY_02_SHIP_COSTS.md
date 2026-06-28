<rag_card id="utility.prices.ship_costs" type="price_lookup" entity="ship_costs" spoiler_level="player_safe" visibility="mechanical_lookup">
<card_meta>
<canonical_name>Prices — Ship costs</canonical_name>
<aliases>ship costs, boat, sloop, brigantine, schooner, careening, refit, outfitting, letters of marque</aliases>
<retrieval_keywords>fishing boat, pinnace, used sloop, brigantine, schooner, careening fees, refit, 90-day cruise, letters of marque</retrieval_keywords>
<content_role>Mechanical utility reference for prices, money, time, distance, schedules, weather, and tracker consistency.</content_role>
</card_meta>

<retrieval_contract>
<use_when>Use when the player buys, sells, asks about, hires, receives, loses, owes, or negotiates anything in the ship costs category.</use_when>
<do_not_use_when>Do not use for unrelated goods. Retrieve a closer price card if this table is not the nearest anchor.</do_not_use_when>
<player_visible>Player may see exact costs when asked or when spending occurs.</player_visible>
<narrator_only>Use exact listed prices to update money. Use closest listed item as anchor for unlisted goods.</narrator_only>
<leak_discipline>Do not recite the whole table in narration. Give one concrete cost or apply it silently unless the player asks for a list.</leak_discipline>
<tracker_rule>When this card changes money, time, status, inventory, or travel progress, update the tracking block exactly and consistently.</tracker_rule>
<related_cards>
- faction.free_brotherhood
- locations.sea_approaches
- utility.currency
</related_cards>
<output_rule>When a transaction occurs, subtract or add the exact amount and update the tracking block immediately.</output_rule>
</retrieval_contract>

<utility_content format="markdown">
## II. PRICES

All prices in reales unless otherwise noted. Round up by half a real for negotiable goods; the figures are the typical opening number.

### Ship costs

| Item | Price |
|---|---|
| Used fishing boat, single-mast | 2–3 doubloons |
| Sound pinnace | 5–10 doubloons |
| Used sloop, small (8 guns or fewer) | 30–50 doubloons |
| Used sloop, good (10–14 guns, recent careen) | 60–100 doubloons |
| Brigantine, working condition | 150–250 doubloons |
| Schooner, fast | 100–180 doubloons |
| Careening fees (Sankt Hjalmar careenage) | 2 doubloons base, plus labor |
| Refit (depending on damage) | 5–20 doubloons |
| Outfitting for a 90-day cruise (provisions, powder, water) | 15–25 doubloons depending on crew size |
| Letters of marque (Danish, if obtainable) | 1–2 doubloons, plus political favors |
</utility_content>
</rag_card>
