# 02_INDEX_LOCATIONS

<location_index id="vault83.index.locations" collection="LOCATION" format="xml_md">

<purpose>
Use LOCATION files for named vault spaces, floor/level geography, access constraints, sensory detail, location identifiers for STATE, and movement time.
</purpose>

<state_rule>
The STATE location field must use a snake_case identifier matching the canonical location card.
</state_rule>

<expected_card_schema>
<rag_card id="location.location_name" type="location" visibility="player_safe_or_mixed">
<aliases></aliases>
<canonical_state_id></canonical_state_id>
<use_when></use_when>
<access_rules></access_rules>
<sensory_palette></sensory_palette>
<connected_npcs></connected_npcs>
<connected_events></connected_events>
<hidden_hooks></hidden_hooks>
</rag_card>
</expected_card_schema>

<priority_locations>
Level 1; Liaison corridor; Hymn Hall; Archive; Archive back stacks; Tribunal chamber; Level 4 corridor; 4b-11; Galley; sub-basement pipe chase; Command Alcove; armory; maintenance spaces.
</priority_locations>

</location_index>
