<rag_card id="event.narrator_usage" type="event_control_contract" entity="Narrator Usage" spoiler_level="narrator_only">
<card_meta>
<canonical_name>Narrator Usage</canonical_name>
<aliases>event narrator usage, event rules, scheduled calendar usage, trigger event usage, pre-amnesia timeline usage, convergence usage</aliases>
<retrieval_keywords>scheduled calendar, trigger events, pre-amnesia timeline, NPC_Maps Section 3, reveal triggers, convergence window, anti-stall</retrieval_keywords>
<related_cards>event.scheduled_calendar, event.trigger_events, event.pre_amnesia_timeline, event.convergence_window</related_cards>
</card_meta>

<retrieval_contract>
<use_when>Use before applying any event file. This governs whether scheduled, triggered, pre-amnesia, and convergence events should surface.</use_when>
<do_not_use_when>Do not use as scene prose. Do not show this control text directly to the player.</do_not_use_when>
<leak_discipline>Treat as narrator-only operating procedure. It controls event surfacing; it is not in-world knowledge.</leak_discipline>
<player_visible>false</player_visible>
<narrator_only>true</narrator_only>
</retrieval_contract>

<content>
## NARRATOR USAGE

The narrator holds the scheduled calendar in working memory and surfaces its events on the appointed days. Trigger events activate only when the trigger fires; the narrator does not pre-announce them. Pre-amnesia timeline content surfaces only through NPC dialogue when the conditions of NPC_Maps Section 3 (reveal triggers) are met.

The convergence window is the campaign's anti-stall mechanism. The narrator may select which two paths fire. The narrator may not select none.
</content>
</rag_card>
