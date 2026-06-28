<rag_card id="utility.currency" type="mechanical_lookup" entity="currency_and_coinage" spoiler_level="player_safe" visibility="mechanical_lookup">
<card_meta>
<canonical_name>Currency and Coinage</canonical_name>
<aliases>currency, coins, money, reales, piece of eight, peso, escudo, doubloon, maravedí, treasure-fleet coinage</aliases>
<retrieval_keywords>reales, pieces of eight, pesos, escudos, doubloons, Spanish silver, Mexico City mint, Lima mint, Bogotá mint, treasure fleet coin</retrieval_keywords>
<content_role>Mechanical utility reference for prices, money, time, distance, schedules, weather, and tracker consistency.</content_role>
</card_meta>

<retrieval_contract>
<use_when>Use whenever money is counted, paid, converted, laundered, discounted, noticed, stolen, owed, or updated in the tracker.</use_when>
<do_not_use_when>Do not invent exchange rates when a listed conversion applies. Do not treat dangerous treasure-fleet coinage as ordinary safe money in Spanish-facing contexts.</do_not_use_when>
<player_visible>Player may see exact coin conversions and concrete prices when relevant.</player_visible>
<narrator_only>Use the danger of treasure-fleet coinage to shape NPC attention without dumping exposition.</narrator_only>
<leak_discipline>Retrieval gives permission to compute or apply money; it does not require a lecture on currency unless the player asks.</leak_discipline>
<tracker_rule>When this card changes money, time, status, inventory, or travel progress, update the tracking block exactly and consistently.</tracker_rule>
<related_cards>
- utility.quick_conversion_reference
- utility.bribes_and_considerations
- hidden.sephardic_ledger
- cast.lauritz_knudsen
- cast.isaac_de_lima
</related_cards>
<output_rule>Prefer exact amounts in reales internally; render as pieces of eight, escudos, or doubloons only when convenient and consistent.</output_rule>
</retrieval_contract>

<utility_content format="markdown">
## I. CURRENCY

### Coins in circulation

**Spanish silver and gold dominate.** Most actual coinage in the Caribbean was struck in the Spanish mints (Mexico, Lima, Potosí, Bogotá). English, Dutch, French, and Danish colonies use Spanish coin alongside their own.

| Coin | Metal | Value in reales |
|---|---|---|
| 1 real | silver | 1 |
| 1 piece of eight (peso) | silver | 8 |
| 1 escudo | gold | 16 |
| 1 doubloon | gold | 32 |
| 1 maravedí | copper | 1/8 (sub-unit, mostly for small change in Spanish ports) |

**Other coin you may encounter in the port:**

- **English shilling** — silver, roughly 1 real (slight variance by year and condition).
- **English crown** — silver, roughly 5 reales.
- **English guinea** — gold, roughly 25 reales (about three-quarters of a doubloon).
- **French écu** — silver, roughly 6 reales.
- **French louis d'or** — gold, roughly 25 reales.
- **Dutch guilder** — silver, roughly 2.5 reales.
- **Danish rigsdaler** — silver, roughly 8 reales (par with a piece of eight, by design).

Knudsen at the Customs House and Isaac de Lima at the counting house both keep current exchange tables. Tavern keepers and shopkeepers take any silver or gold without quibbling — they know the rough rates and round in their own favor by half a real.

### Treasure-fleet coinage

The 1715 fleet's silver and gold are identifiable by:

- Mexico City mint mark (M with a small o above it) — most common
- Lima mint mark (L) — common
- Bogotá mint mark (NR for *Nuevo Reyno*) — less common
- Fresh strike — the dies were new, edges are still bright
- "Pillar dollar" reverse on some — two crowned pillars (Hercules), banner reading *PLVS VLTRA*

**Carrying treasure-fleet coin in 1715 is dangerous.** Spanish authorities will hang a foreigner for it without trial. The Selskab tolerates it because it cannot afford not to, but a man visibly spending bright-struck Mexico City reales in the wrong tavern attracts attention. Fences in Sankt Hjalmar (Isaac de Lima, quietly; Tregenza at the Three Anchors, less quietly) discount treasure-fleet coin by 30% for the risk and the laundering work.

---
</utility_content>
</rag_card>
