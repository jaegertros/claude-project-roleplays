# RAG_INDEX_ERA.md

<rag_index id="era.index" type="historical_guardrail_index">
<purpose>
Use this index to route era/history queries toward the correct historical guardrail card. Era cards are primarily for preventing anachronism and enriching scene texture, not for exposition.
</purpose>

<routing_notes>
- For exact money, prices, wages, travel times, weather schedules, or tracker updates, prefer Utility cards.
- For place-specific sensory rendering, prefer Location cards.
- For NPC behavior, prefer CAST and NPC_MAP cards.
- For secrets and discovery thresholds, prefer Hidden cards.
- Era cards answer: "What belongs in 1715 Caribbean reality, and what should not drift in from Hollywood or later pirate lore?"
</routing_notes>

<index_entry id="era.overview">
<file>ERA_OVERVIEW_claude_rag_tagged.md</file>
<entity>Historical guardrails for the 1715 Caribbean</entity>
<aliases>era overview, historical guardrails, reference shelf, 1715 Caribbean</aliases>
<retrieval_keywords>1715 Caribbean, historical guardrails, narrator reference shelf, render period, ships, coin, disease, superstition, consequence</retrieval_keywords>
<use_when>Use as the umbrella card for era accuracy and the principle that the world is conveyed through prices, dialogue, smells, and consequence.</use_when>
</index_entry>
<index_entry id="era.historical_guardrails_for_the_1715_caribbean">
<file>ERA_HISTORICAL_GUARDRAILS_FOR_THE_1715_CARIBBEAN_claude_rag_tagged.md</file>
<entity>Historical guardrails for the 1715 Caribbean</entity>
<aliases>Historical guardrails for the 1715 Caribbean</aliases>
<retrieval_keywords>Historical guardrails for the 1715 Caribbean</retrieval_keywords>
<use_when>Use when the scene needs era guardrails for Historical guardrails for the 1715 Caribbean.</use_when>
</index_entry>
<index_entry id="era.moment_in_history">
<file>ERA_THE_MOMENT_IN_HISTORY_claude_rag_tagged.md</file>
<entity>THE MOMENT IN HISTORY</entity>
<aliases>history moment, 1715 Caribbean, Spanish Succession, treasure fleet, Nassau, Spain, Royal Navy, slavery</aliases>
<retrieval_keywords>Treaty of Utrecht, Treaty of Rastatt, 1715 Spanish Treasure Fleet, Nassau, Henry Jennings, Hornigold, Teach, Spain, Royal Navy, slavery, sugar</retrieval_keywords>
<use_when>Use when the narrator needs the broad historical pressure of mid-to-late 1715, including recent war, treasure-fleet wreck, Nassau, Spanish urgency, thin Royal Navy coverage, or the economic centrality of slavery.</use_when>
</index_entry>
<index_entry id="era.political_map">
<file>ERA_THE_POLITICAL_MAP_claude_rag_tagged.md</file>
<entity>THE POLITICAL MAP</entity>
<aliases>political map, Caribbean powers, Spain, England, France, Netherlands, Denmark-Norway, Indigenous, Maroons</aliases>
<retrieval_keywords>Spain, England, Jamaica, Bahamas, Barbados, France, Saint-Domingue, Netherlands, Curacao, Denmark-Norway, Charlotte Amalie, Caribs, Maroons</retrieval_keywords>
<use_when>Use when a scene references imperial powers, trade routes, naval pressure, colonial politics, regional identity, or where ships and rumors come from.</use_when>
</index_entry>
<index_entry id="era.ships_and_sea">
<file>ERA_SHIPS_AND_THE_SEA_claude_rag_tagged.md</file>
<entity>SHIPS AND THE SEA</entity>
<aliases>ships, sailing, sea, sloop, schooner, brigantine, snow, frigate, galleon, periagua, careening</aliases>
<retrieval_keywords>sloop, schooner, brigantine, snow, frigate, galleon, periagua, piragua, careening, beating to windward, scurvy, hurricane season, crew sizes</retrieval_keywords>
<use_when>Use whenever ships, sea travel, ship classes, naval threats, careening, crew size, navigation, sailing limitations, or maritime realism matters.</use_when>
</index_entry>
<index_entry id="era.currency_and_prices">
<file>ERA_CURRENCY_AND_PRICES_claude_rag_tagged.md</file>
<entity>CURRENCY AND PRICES</entity>
<aliases>currency, coins, money, reales, pieces of eight, escudos, doubloons, treasure-fleet coinage</aliases>
<retrieval_keywords>real, piece of eight, peso, dollar, escudo, doubloon, Spanish currency, treasure-fleet coinage, mint marks, discount</retrieval_keywords>
<use_when>Use when money, coinage, treasure-fleet silver, fences, or the period value of coin appears. For exact prices, retrieve the Utility cards.</use_when>
</index_entry>
<index_entry id="era.weapons">
<file>ERA_WEAPONS_claude_rag_tagged.md</file>
<entity>WEAPONS</entity>
<aliases>weapons, cutlass, pistol, musket, blunderbuss, knife, powder, armor</aliases>
<retrieval_keywords>cutlass, boarding pike, flintlock pistol, musket, musketoon, blunderbuss, knife, belaying pin, marlinspike, capstan bar, black powder, misfire, armor</retrieval_keywords>
<use_when>Use for fights, weapon purchases, threats, boarding actions, firearm reliability, powder problems, armor expectations, or plausible violence.</use_when>
</index_entry>
<index_entry id="era.daily_life_disease_food_water_rum">
<file>ERA_DAILY_LIFE_DISEASE_FOOD_WATER_RUM_claude_rag_tagged.md</file>
<entity>DAILY LIFE — DISEASE, FOOD, WATER, RUM</entity>
<aliases>daily life, disease, food, water, rum, yellow fever, malaria, dysentery, scurvy, tobacco, coffee, chocolate</aliases>
<retrieval_keywords>yellow fever, malaria, dysentery, typhus, smallpox, seasoning, water casks, small beer, rum, watered rum, hardtack, citrus, scurvy, tobacco, coffee, chocolate</retrieval_keywords>
<use_when>Use when scenes need period texture involving sickness, heat, sailor life, food, drink, intoxication, provisions, or medical plausibility.</use_when>
</index_entry>
<index_entry id="era.slavery">
<file>ERA_SLAVERY_claude_rag_tagged.md</file>
<entity>SLAVERY</entity>
<aliases>slavery, sugar islands, domestic slavery, maritime slavery, free Black population, Maroons, piracy and race</aliases>
<retrieval_keywords>slavery, sugar, enslaved labor, domestic slavery, maritime slavery, free Black population, Maroons, pirate crews, plantation mortality</retrieval_keywords>
<use_when>Use when scenes touch plantation labor, town labor, free Black residents, enslaved residents, Maroon communities, pirate race dynamics, or the economic structure of the Caribbean.</use_when>
</index_entry>
<index_entry id="era.religion_and_superstition">
<file>ERA_RELIGION_AND_SUPERSTITION_claude_rag_tagged.md</file>
<entity>RELIGION AND SUPERSTITION</entity>
<aliases>religion, superstition, Catholic, Lutheran, Sephardic, Quaker, Methodist, sailor superstition, tattoos</aliases>
<retrieval_keywords>Catholic, Franciscan, Jesuit, Dominican, Anglican, Reformed, Quaker, Moravian, Lutheran, Sephardic Jewish merchants, syncretic religion, Vodou, Santeria, Obeah, sailor superstition, tattoos</retrieval_keywords>
<use_when>Use when religious identity, confessional practice, missions, Jewish community life, sailor superstition, protective tattoos, or faith-based faction pressure matters.</use_when>
</index_entry>
<index_entry id="era.anti_hollywood_pirate_rules">
<file>ERA_WHAT_IS_HOLLYWOOD_PIRATE_AND_WHAT_IS_NOT_claude_rag_tagged.md</file>
<entity>WHAT IS HOLLYWOOD PIRATE AND WHAT IS NOT</entity>
<aliases>anti-Hollywood, pirate cliches, real pirate practices, pirate speech, articles, marooning, Jolly Roger</aliases>
<retrieval_keywords>arrr, matey, Long John Silver, eyepatch, treasure map, walking the plank, parrots, Jolly Roger, articles of agreement, marooning, Brotherhood of the Coast, press gangs</retrieval_keywords>
<use_when>Use as an anti-anachronism guardrail whenever pirate speech, pirate behavior, flags, punishments, treasure, or shipboard culture appears.</use_when>
</index_entry>
<index_entry id="era.timing_references">
<file>ERA_TIMING_REFERENCES_claude_rag_tagged.md</file>
<entity>TIMING REFERENCES</entity>
<aliases>timing references, historical timing, Blackbeard, Woodes Rogers, Henry Jennings, Anne Bonny, Mary Read, Jacobite Rising</aliases>
<retrieval_keywords>Treaty of Utrecht, Treaty of Rastatt, Treasure Fleet, Henry Jennings, Edward Teach, Blackbeard, Stede Bonnet, Anne Bonny, Mary Read, Calico Jack Rackham, Woodes Rogers, Jacobite Rising</retrieval_keywords>
<use_when>Use to prevent the narrator from introducing historical people, events, or pirate careers before they belong in the campaign calendar.</use_when>
</index_entry>
<index_entry id="era.narrative_guidelines">
<file>ERA_NARRATIVE_GUIDELINES_claude_rag_tagged.md</file>
<entity>NARRATIVE GUIDELINES</entity>
<aliases>narrative guidelines, render through detail, period dialogue, money matters, disease, heat, sea, violence</aliases>
<retrieval_keywords>render through detail, never lecture, period dialogue, regional voice, money matters, disease, heat, sea, violence fast and ugly</retrieval_keywords>
<use_when>Use as a writing-style guardrail for period texture, sensory realism, dialogue authenticity, money pressure, disease, heat, sea presence, and violence.</use_when>
</index_entry>
</rag_index>
