<rag_card id="utility.prices.sex_work_entertainment" type="price_lookup" entity="sex_work_and_entertainment_prices" spoiler_level="player_safe" visibility="mechanical_lookup">
<card_meta>
<canonical_name>Prices — Sex work and entertainment</canonical_name>
<aliases>sex work, entertainment, doxy, card game, cockfight, Three Anchors, Spanish quarter</aliases>
<retrieval_keywords>doxy, middle house, particular arrangements, card game stakes, cockfight, intimacy</retrieval_keywords>
<content_role>Mechanical utility reference for prices, money, time, distance, schedules, weather, and tracker consistency.</content_role>
</card_meta>

<retrieval_contract>
<use_when>Use when the player buys, sells, asks about, hires, receives, loses, owes, or negotiates anything in the sex work and entertainment category.</use_when>
<do_not_use_when>Do not use for unrelated goods. Retrieve a closer price card if this table is not the nearest anchor.</do_not_use_when>
<player_visible>Player may see exact costs when asked or when spending occurs.</player_visible>
<narrator_only>Use exact listed prices to update money. Use closest listed item as anchor for unlisted goods.</narrator_only>
<leak_discipline>Do not recite the whole table in narration. Give one concrete cost or apply it silently unless the player asks for a list.</leak_discipline>
<tracker_rule>When this card changes money, time, status, inventory, or travel progress, update the tracking block exactly and consistently.</tracker_rule>
<related_cards>
- project.instructions.violence_and_intimacy
- locations.town_districts
- cast.tregenza
</related_cards>
<output_rule>When a transaction occurs, subtract or add the exact amount and update the tracking block immediately.</output_rule>
</retrieval_contract>

<utility_content format="markdown">
## II. PRICES

All prices in reales unless otherwise noted. Round up by half a real for negotiable goods; the figures are the typical opening number.

### Sex work and entertainment

Sex work in Sankt Hjalmar is centered on three establishments — one above the Three Anchors (rough), one in a discreet house off Merchant Row (middle), and one in a Spanish-quarter house with a few specific arrangements rather than a general clientele (particular). The narrator handles intimacy per `PROJECT_INSTRUCTIONS.md`.

| Service | Rate |
|---|---|
| A doxy above the Three Anchors, an hour | 1 piece of eight |
| A doxy above the Three Anchors, the night | 1 escudo |
| Middle house, an evening | 1 escudo |
| Middle house, the night | 1 doubloon |
| Particular arrangements (Spanish quarter) | by negotiation, never less than 2 escudos |
| Card game stakes (Helm) | typical pot 1–2 pieces of eight |
| Card game stakes (private upper-town) | typical pot 1–2 doubloons |
| Cockfight admission | 1 real; betting separate |
</utility_content>
</rag_card>
