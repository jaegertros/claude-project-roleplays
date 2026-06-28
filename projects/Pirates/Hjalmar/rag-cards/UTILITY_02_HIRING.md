<rag_card id="utility.prices.hiring" type="price_lookup" entity="hiring_rates" spoiler_level="player_safe" visibility="mechanical_lookup">
<card_meta>
<canonical_name>Prices — Hiring</canonical_name>
<aliases>hire, hiring, day laborer, skilled tradesman, guide, pilot, horse, boat with rower</aliases>
<retrieval_keywords>day laborer, cooper, smith, Maroon highlands guide, reef pilot, horse hire, small boat with rower</retrieval_keywords>
<content_role>Mechanical utility reference for prices, money, time, distance, schedules, weather, and tracker consistency.</content_role>
</card_meta>

<retrieval_contract>
<use_when>Use when the player buys, sells, asks about, hires, receives, loses, owes, or negotiates anything in the hiring category.</use_when>
<do_not_use_when>Do not use for unrelated goods. Retrieve a closer price card if this table is not the nearest anchor.</do_not_use_when>
<player_visible>Player may see exact costs when asked or when spending occurs.</player_visible>
<narrator_only>Use exact listed prices to update money. Use closest listed item as anchor for unlisted goods.</narrator_only>
<leak_discipline>Do not recite the whole table in narration. Give one concrete cost or apply it silently unless the player asks for a list.</leak_discipline>
<tracker_rule>When this card changes money, time, status, inventory, or travel progress, update the tracking block exactly and consistently.</tracker_rule>
<related_cards>
- utility.distances_times
- locations.highlands_bush
- locations.sea_approaches
- utility.currency
</related_cards>
<output_rule>When a transaction occurs, subtract or add the exact amount and update the tracking block immediately.</output_rule>
</retrieval_contract>

<utility_content format="markdown">
## II. PRICES

All prices in reales unless otherwise noted. Round up by half a real for negotiable goods; the figures are the typical opening number.

### Hiring

| Hire | Rate |
|---|---|
| Day laborer at the wharf | 4–6 reales per day |
| Skilled tradesman (cooper, smith) | 1 piece of eight per day |
| Guide to the Maroon highlands (the few who know the path) | 1 doubloon per trip |
| Local pilot through the reef channels | 1 piece of eight per passage |
| Hire of a horse, daylight hours | 4 reales |
| Hire of a horse, overnight | 1 piece of eight |
| Hire of a small boat with rower | 1 piece of eight for the morning |

---
</utility_content>
</rag_card>
