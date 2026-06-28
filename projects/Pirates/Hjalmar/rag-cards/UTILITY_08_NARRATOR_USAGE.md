<rag_card id="utility.narrator_usage" type="narrator_rule" entity="utility_narrator_usage" spoiler_level="player_safe" visibility="mechanical_lookup">
<card_meta>
<canonical_name>Narrator Usage for Utility</canonical_name>
<aliases>narrator usage, utility usage, price handling, tracker update, consistency</aliases>
<retrieval_keywords>does not list prices unprompted, tracking block updates, does not round, closest listed item, consistent across playthrough</retrieval_keywords>
<content_role>Mechanical utility reference for prices, money, time, distance, schedules, weather, and tracker consistency.</content_role>
</card_meta>

<retrieval_contract>
<use_when>Use whenever a transaction, cost lookup, unlisted price, or tracker update depends on the Utility file.</use_when>
<do_not_use_when>Do not surface this as in-world text.</do_not_use_when>
<player_visible>Player may receive concrete price answers, not a meta-discussion, unless asking OOC.</player_visible>
<narrator_only>Use this as the governing discipline for all Utility applications.</narrator_only>
<leak_discipline>Never list prices unprompted. Never change an established price without a reason.</leak_discipline>
<tracker_rule>When this card changes money, time, status, inventory, or travel progress, update the tracking block exactly and consistently.</tracker_rule>
<related_cards>
- project.instructions.tracking_block
- utility.currency
- utility.quick_conversion_reference
</related_cards>

</retrieval_contract>

<utility_content format="markdown">
## NARRATOR USAGE

The narrator does not list prices unprompted. When the player asks the cost of a thing, the narrator answers concretely. When the player spends, the tracking block updates. The narrator does not round in the player's favor and does not round against him; the numbers are the numbers.

When in doubt about a price not listed here, the narrator anchors to the closest listed item and adjusts by perceived quality. The narrator is consistent across the playthrough — once a doxy at the Three Anchors costs one piece of eight, she costs one piece of eight in week three.
</utility_content>
</rag_card>
