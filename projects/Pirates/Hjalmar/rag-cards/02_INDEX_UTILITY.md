<rag_index id="utility.index" type="mechanical_lookup_index">
<purpose>Route Claude/RAG retrieval toward the correct utility lookup card for money, prices, wages, distances, weather, schedules, and tracker math.</purpose>

<index_rules>
- Use utility.currency for coin conversion and treasure-fleet coin risk.
- Use a specific utility.prices.* card for purchases, bribes, passage, ship costs, or hiring.
- Use utility.distances_times whenever movement changes time or scene availability.
- Use utility.weather when sailing, rain, tides, hurricane warnings, or body-recovery timing matter.
- Use utility.schedules when deciding who is present or whether a place is open.
- Use utility.quick_conversion_reference for fast tracker math.
- Retrieval is permission to apply mechanics, not permission to dump tables into narration.
</index_rules>

<cards>
<card id="utility.overview" file="UTILITY_00_OVERVIEW_claude_rag_tagged.md" type="utility_overview" entity="prices_distances_times_reference">
<aliases>utility, practical reference, prices distances times, ledger, internal consistency</aliases>
<retrieval_keywords>prices, distances, times, schedules, weather, reales, tracking block, internal consistency</retrieval_keywords>
</card>

<card id="utility.currency" file="UTILITY_01_CURRENCY_claude_rag_tagged.md" type="mechanical_lookup" entity="currency_and_coinage">
<aliases>currency, coins, money, reales, piece of eight, peso, escudo, doubloon, maravedí, treasure-fleet coinage</aliases>
<retrieval_keywords>reales, pieces of eight, pesos, escudos, doubloons, Spanish silver, Mexico City mint, Lima mint, Bogotá mint, treasure fleet coin</retrieval_keywords>
</card>

<card id="utility.prices.overview" file="UTILITY_02_PRICES_OVERVIEW_claude_rag_tagged.md" type="price_lookup_overview" entity="price_reference_general">
<aliases>prices, costs, price index, goods, services</aliases>
<retrieval_keywords>prices in reales, round up by half a real, typical opening number, food, weapons, ship costs, bribes, hiring</retrieval_keywords>
</card>

<card id="utility.prices.food_drink_lodging" file="UTILITY_02_FOOD_DRINK_LODGING_claude_rag_tagged.md" type="price_lookup" entity="food_drink_lodging_prices">
<aliases>food prices, drink prices, lodging, tavern meal, rum, Madeira, Jensen's, Helm hammock</aliases>
<retrieval_keywords>eggs, salt cod, salt pork, fresh fish, rum, Madeira, coffee, tavern meal, Jensen's, lodging, hammock</retrieval_keywords>
</card>

<card id="utility.prices.clothing_personal_goods" file="UTILITY_02_CLOTHING_AND_PERSONAL_GOODS_claude_rag_tagged.md" type="price_lookup" entity="clothing_and_personal_goods_prices">
<aliases>clothing, boots, shirt, breeches, coat, hat, soap, razor, tobacco</aliases>
<retrieval_keywords>plain shirt, plain breeches, working coat, good coat, used boots, new boots, tricorne, soap, comb, razor, tobacco</retrieval_keywords>
</card>

<card id="utility.prices.weapons_powder_ammunition" file="UTILITY_02_WEAPONS_POWDER_AMMUNITION_claude_rag_tagged.md" type="price_lookup" entity="weapons_powder_ammunition_prices">
<aliases>weapons, powder, ammunition, knife, cutlass, pistol, musket, blunderbuss, flints</aliases>
<retrieval_keywords>knife, cutlass, boarding pike, belaying pin, flintlock pistol, musket, blunderbuss, black powder, lead shot, flints</retrieval_keywords>
</card>

<card id="utility.prices.tools_ship_supplies_medicines" file="UTILITY_02_TOOLS_SHIP_SUPPLIES_MEDICINES_claude_rag_tagged.md" type="price_lookup" entity="tools_ship_supplies_medicines_prices">
<aliases>tools, ship supplies, medicines, rope, sailcloth, tar, pitch, lantern, journal, laudanum, cinchona, surgery</aliases>
<retrieval_keywords>hemp rope, sailcloth, tar, pine pitch, lantern oil, paper, leather journal, sextant, spyglass, compass, cinchona, laudanum, Lefèvre</retrieval_keywords>
</card>

<card id="utility.prices.sex_work_entertainment" file="UTILITY_02_SEX_WORK_AND_ENTERTAINMENT_claude_rag_tagged.md" type="price_lookup" entity="sex_work_and_entertainment_prices">
<aliases>sex work, entertainment, doxy, card game, cockfight, Three Anchors, Spanish quarter</aliases>
<retrieval_keywords>doxy, middle house, particular arrangements, card game stakes, cockfight, intimacy</retrieval_keywords>
</card>

<card id="utility.prices.bribes_considerations" file="UTILITY_02_BRIBES_AND_CONSIDERATIONS_claude_rag_tagged.md" type="price_lookup" entity="bribes_and_considerations">
<aliases>bribes, considerations, Knudsen, manifest forgery, look the other way, misplace paper, guard silence</aliases>
<retrieval_keywords>consideration, Knudsen, forget to file a body report, advance notice, manifest forgery, passenger without papers, Tomás not for sale</retrieval_keywords>
</card>

<card id="utility.prices.ship_costs" file="UTILITY_02_SHIP_COSTS_claude_rag_tagged.md" type="price_lookup" entity="ship_costs">
<aliases>ship costs, boat, sloop, brigantine, schooner, careening, refit, outfitting, letters of marque</aliases>
<retrieval_keywords>fishing boat, pinnace, used sloop, brigantine, schooner, careening fees, refit, 90-day cruise, letters of marque</retrieval_keywords>
</card>

<card id="utility.prices.passage_by_ship" file="UTILITY_02_PASSAGE_BY_SHIP_claude_rag_tagged.md" type="price_lookup" entity="passage_by_ship_rates">
<aliases>passage, ship passage, travel by ship, Charlotte Amalie, Curaçao, Nassau, San Juan, Charleston, Cádiz</aliases>
<retrieval_keywords>Charlotte Amalie passage, Curaçao passage, Nassau passage, San Juan passage, Charleston passage, Cumaná passage, Cádiz passage, cabin and captain's table</retrieval_keywords>
</card>

<card id="utility.prices.hiring" file="UTILITY_02_HIRING_claude_rag_tagged.md" type="price_lookup" entity="hiring_rates">
<aliases>hire, hiring, day laborer, skilled tradesman, guide, pilot, horse, boat with rower</aliases>
<retrieval_keywords>day laborer, cooper, smith, Maroon highlands guide, reef pilot, horse hire, small boat with rower</retrieval_keywords>
</card>

<card id="utility.wages_and_shares" file="UTILITY_03_WAGES_AND_SHARES_claude_rag_tagged.md" type="mechanical_lookup" entity="wages_and_brotherhood_shares">
<aliases>wages, shares, pay, salary, dockhand wages, garrison wages, Brotherhood articles, pirate share</aliases>
<retrieval_keywords>garrison soldier, Tomás O'Brien wage, Holger Vinter wage, dockhand, skilled tradesman, merchant sailor, privateer share, quartermaster, compensation for losses</retrieval_keywords>
</card>

<card id="utility.distances_times" file="UTILITY_04_DISTANCES_AND_TIMES_claude_rag_tagged.md" type="mechanical_lookup" entity="distances_and_travel_times">
<aliases>distances, travel times, walking time, sailing time, within town, around island, from Sankt Hjalmar</aliases>
<retrieval_keywords>Wharf to Government House, Christianstorv, Maroon settlement, Eliza cottage, Rasmussen estate, Charlotte Amalie, San Juan, Nassau, Curaçao, Charleston</retrieval_keywords>
</card>

<card id="utility.weather" file="UTILITY_05_WEATHER_claude_rag_tagged.md" type="environment_lookup" entity="weather_tides_hurricane_season">
<aliases>weather, rain, trade winds, squall, hurricane, barometer, tides, moon, full moon</aliases>
<retrieval_keywords>northeasterly trade winds, afternoon squall, hurricane warning signs, glass falling, September 21, Day 8, full moon, tidal range, body in harbor</retrieval_keywords>
</card>

<card id="utility.schedules" file="UTILITY_06_SCHEDULES_claude_rag_tagged.md" type="mechanical_lookup" entity="daily_weekly_monthly_schedules">
<aliases>schedules, daily rhythm, weekly schedule, monthly schedule, market days, Council meeting, tavern hours, Mass, Sabbath</aliases>
<retrieval_keywords>fish market opens, Customs House, Helm opens, Three Anchors opens, El Yelmo opens, Council meeting, Christianskirke service, Methodist meeting, Mahamad House, packet boat</retrieval_keywords>
</card>

<card id="utility.quick_conversion_reference" file="UTILITY_07_QUICK_CONVERSION_REFERENCE_claude_rag_tagged.md" type="mechanical_lookup" entity="quick_conversion_reference">
<aliases>quick conversion, conversion reference, money conversion, cluster purchases, sailing time scale</aliases>
<retrieval_keywords>8 reales, 1 piece of eight, 16 reales, escudo, 32 reales, doubloon, week of basic living, new pistol, 120 nautical miles</retrieval_keywords>
</card>

<card id="utility.narrator_usage" file="UTILITY_08_NARRATOR_USAGE_claude_rag_tagged.md" type="narrator_rule" entity="utility_narrator_usage">
<aliases>narrator usage, utility usage, price handling, tracker update, consistency</aliases>
<retrieval_keywords>does not list prices unprompted, tracking block updates, does not round, closest listed item, consistent across playthrough</retrieval_keywords>
</card>

</cards>

<common_queries>
<query text="How much does food or lodging cost?" route_to="utility.prices.food_drink_lodging" />
<query text="How much does a pistol, knife, musket, powder, or ammunition cost?" route_to="utility.prices.weapons_powder_ammunition" />
<query text="How much is a bribe/consideration to Knudsen or a guard?" route_to="utility.prices.bribes_considerations" />
<query text="How long does it take to walk/ride/sail somewhere?" route_to="utility.distances_times" />
<query text="What is the weather doing or how do tides matter?" route_to="utility.weather" />
<query text="What is open or happening right now?" route_to="utility.schedules" />
<query text="How do I convert reales/pieces of eight/escudos/doubloons?" route_to="utility.currency" />
<query text="How much does passage by ship cost?" route_to="utility.prices.passage_by_ship" />
<query text="What does a worker/sailor/soldier earn?" route_to="utility.wages_and_shares" />
<query text="What does a ship/refit/careening/outfitting cost?" route_to="utility.prices.ship_costs" />
</common_queries>
</rag_index>