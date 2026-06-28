<rag_card id="utility.overview" type="utility_overview" entity="prices_distances_times_reference" spoiler_level="player_safe" visibility="mechanical_lookup">
<card_meta>
<canonical_name>Utility Overview</canonical_name>
<aliases>utility, practical reference, prices distances times, ledger, internal consistency</aliases>
<retrieval_keywords>prices, distances, times, schedules, weather, reales, tracking block, internal consistency</retrieval_keywords>
<content_role>Mechanical utility reference for prices, money, time, distance, schedules, weather, and tracker consistency.</content_role>
</card_meta>

<retrieval_contract>
<use_when>Use as the entry point when the narrator needs to understand what the Utility file governs.</use_when>
<do_not_use_when>Do not use as a substitute for exact price, distance, or schedule lookup; retrieve the specific card for the table needed.</do_not_use_when>
<player_visible>Safe to surface as practical campaign logic when the player asks about cost, distance, timing, or weather.</player_visible>
<narrator_only>Use to keep the campaign economy, travel time, and calendar internally consistent.</narrator_only>
<leak_discipline>Do not list utility rules unless the player asks; apply them quietly through concrete costs, time passage, and tracker updates.</leak_discipline>
<tracker_rule>When this card changes money, time, status, inventory, or travel progress, update the tracking block exactly and consistently.</tracker_rule>
<related_cards>
- project.instructions.tracking_block
- events.scheduled_calendar
- locations.index
</related_cards>

</retrieval_contract>

<utility_content format="markdown">
# KNOWLEDGE_6_Utility.md
## Prices, distances, times — the practical reference

A working ledger for the narrator. When the player buys a meal, hires a horse, books passage, or asks how long it takes to reach the Maroon settlement, the answer comes from this file. Prices, distances, schedules, and weather are calibrated to mid-September 1715, eastern Caribbean, Sankt Hjalmar. Internal consistency matters more than absolute realism — a piece of eight buys here what it buys elsewhere in this file, every time.

---
</utility_content>
</rag_card>
