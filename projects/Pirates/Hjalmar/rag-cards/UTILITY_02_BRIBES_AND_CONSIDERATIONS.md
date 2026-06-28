<rag_card id="utility.prices.bribes_considerations" type="price_lookup" entity="bribes_and_considerations" spoiler_level="player_safe" visibility="mechanical_lookup">
<card_meta>
<canonical_name>Prices — Bribes and considerations</canonical_name>
<aliases>bribes, considerations, Knudsen, manifest forgery, look the other way, misplace paper, guard silence</aliases>
<retrieval_keywords>consideration, Knudsen, forget to file a body report, advance notice, manifest forgery, passenger without papers, Tomás not for sale</retrieval_keywords>
<content_role>Mechanical utility reference for prices, money, time, distance, schedules, weather, and tracker consistency.</content_role>
</card_meta>

<retrieval_contract>
<use_when>Use when the player buys, sells, asks about, hires, receives, loses, owes, or negotiates anything in the bribes and considerations category.</use_when>
<do_not_use_when>Do not use for unrelated goods. Retrieve a closer price card if this table is not the nearest anchor.</do_not_use_when>
<player_visible>Player may see exact costs when asked or when spending occurs.</player_visible>
<narrator_only>Use exact listed prices to update money. Use closest listed item as anchor for unlisted goods.</narrator_only>
<leak_discipline>Do not recite the whole table in narration. Give one concrete cost or apply it silently unless the player asks for a list.</leak_discipline>
<tracker_rule>When this card changes money, time, status, inventory, or travel progress, update the tracking block exactly and consistently.</tracker_rule>
<related_cards>
- cast.lauritz_knudsen
- npc_map.lauritz_knudsen
- cast.tomas_obrien
- utility.currency
</related_cards>
<output_rule>When a transaction occurs, subtract or add the exact amount and update the tracking block immediately.</output_rule>
</retrieval_contract>

<utility_content format="markdown">
## II. PRICES

All prices in reales unless otherwise noted. Round up by half a real for negotiable goods; the figures are the typical opening number.

### Bribes and considerations

Knudsen's standing menu, paid quietly. The narrator does not name these as bribes; they are *"considerations"* or *"a small accommodation."*

| Favor | Consideration |
|---|---|
| Look the other way on a small irregularity | 1 piece of eight |
| Misplace a paper for the day | 1 escudo |
| Forget to file a body report | 2–3 escudos |
| Advance notice of a ship's clearance | 1 escudo (or his standing retainer) |
| Manifest forgery (small item) | 1 doubloon |
| Manifest forgery (substantial cargo) | 2–4 doubloons |
| Look away from a passenger boarding without papers | 1 escudo |

Garrison soldiers can be bought smaller for smaller things:

- A guard not at his post for an hour: 4 reales.
- A guard's silence on what he saw: 1 piece of eight (and the implicit threat of his telling Captain Vinter).
- Tomás O'Brien: not for sale. Do not try.
</utility_content>
</rag_card>
