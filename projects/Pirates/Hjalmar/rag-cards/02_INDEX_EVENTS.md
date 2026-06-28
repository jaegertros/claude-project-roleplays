# RAG_INDEX_EVENTS.md

<rag_index type="events" project="sankt_hjalmar">
<purpose>
High-signal lookup index for Sankt Hjalmar event/calendar/timeline cards. Retrieve this first when the query concerns timing, past events, scheduled campaign motion, convergence, trigger conditions, or atmospheric beats.
</purpose>

<retrieval_rule>
Project/system instructions govern all event use. Event cards do not override player agency, the Knowledge Wall, NPC epistemic limits, or the locked backstory.
</retrieval_rule>

<cards>

<event_card_ref id="event.narrator_usage" type="event_control_contract">
<file>EVENT_NARRATOR_USAGE_claude_rag_tagged.md</file>
<canonical_name>Narrator Usage</canonical_name>
<aliases>event narrator usage, event rules, scheduled calendar usage, trigger event usage, pre-amnesia timeline usage, convergence usage</aliases>
<keywords>scheduled calendar, trigger events, pre-amnesia timeline, NPC_Maps Section 3, reveal triggers, convergence window, anti-stall</keywords>
<use_when>Use before applying any event file. This governs whether scheduled, triggered, pre-amnesia, and convergence events should surface.</use_when>
<related_cards>event.scheduled_calendar, event.trigger_events, event.pre_amnesia_timeline, event.convergence_window</related_cards>
</event_card_ref>

<event_card_ref id="event.random_atmospheric_events" type="atmosphere_pool">
<file>EVENT_RANDOM_ATMOSPHERIC_EVENTS_claude_rag_tagged.md</file>
<canonical_name>Random Atmospheric Events</canonical_name>
<aliases>atmospheric events, random events, color beats, background events, world alive beats</aliases>
<keywords>Three Anchors fight, last rites, yellow fever, barrel of nails, broadsides, treasure-fleet rumors, garrison soldier, dead fish, Council carriage, jewelry fence</keywords>
<use_when>Use to add light environmental motion between consequential moments, especially when the town needs life but not plot pressure.</use_when>
<related_cards>location.wharf_side, location.three_anchors, location.christianstorv, faction.selskab, faction.free_brotherhood</related_cards>
</event_card_ref>

<event_card_ref id="event.convergence_window.day_10_to_day_14" type="campaign_clock">
<file>EVENT_THE_CONVERGENCE_WINDOW_DAY_10_TO_DAY_14_claude_rag_tagged.md</file>
<canonical_name>The Convergence Window — Day 10 to Day 14</canonical_name>
<aliases>convergence window, Day 10, Day 14, anti-stall, ignition paths, Alpha Beta Gamma Delta</aliases>
<keywords>Stickjaw panic, Agnes makes her move, Søren breaks, Don Esteban learns, Day 10, Day 14, two paths fire, anti-stall mechanism</keywords>
<use_when>Use at or near Day 10 through Day 14, or when assessing whether campaign ignition paths should activate based on prior player history.</use_when>
<related_cards>event.scheduled_calendar, event.trigger_events, npc.kristoffer_stickjaw_holm.epistemic, npc.agnes_rasmussen.epistemic, npc.soren_lind.epistemic, npc.don_esteban_de_ribera.epistemic</related_cards>
</event_card_ref>

<event_card_ref id="event.pre_amnesia_timeline" type="pre_amnesia_timeline">
<file>EVENT_THE_PRE_AMNESIA_TIMELINE_claude_rag_tagged.md</file>
<canonical_name>The Pre-Amnesia Timeline</canonical_name>
<aliases>pre-amnesia timeline, backstory timeline, Cael history, Whisht history, Agnes history, Rasmussen brig, beach rescue</aliases>
<keywords>1714 Spring, 1714 Summer, 1714 Autumn, 1714 Winter, 1715 Spring, 1715 Summer, September 12 attack, Whisht, Agnes, Frederik, Mona Passage, Søren, Hendrik, Eliza, Petter, Stickjaw</keywords>
<use_when>Use when NPCs reference past events, reveal triggers fire, Cael investigates his missing history, or the narrator needs continuity for what happened before Day 1.</use_when>
<related_cards>npc.agnes_rasmussen.epistemic, npc.erik_rasmussen.epistemic, npc.soren_lind.epistemic, npc.old_hendrik.epistemic, npc.kristoffer_stickjaw_holm.epistemic, event.trigger_events</related_cards>
</event_card_ref>

<event_card_ref id="event.scheduled_calendar" type="scheduled_calendar">
<file>EVENT_THE_SCHEDULED_CALENDAR_claude_rag_tagged.md</file>
<canonical_name>The Scheduled Calendar</canonical_name>
<aliases>scheduled calendar, campaign calendar, Week 1 events, Week 2 events, Week 3 events, clock events</aliases>
<keywords>Day 1 Monday, Day 2 Tuesday, Council meeting, Christianstorv market, Sankt Anna, Methodist meeting, Spanish patrol vessel, convent letter, Sabbath, Christianskirke, full moon, convergence opens, Maartens careening, Hans Müller dinner, hurricane warning, Curaçao packet, Henry Jennings</keywords>
<use_when>Use at the start of each in-world day, during time advancement, or when the player asks what is happening in town on a given day.</use_when>
<related_cards>event.narrator_usage, event.convergence_window.day_10_to_day_14, event.trigger_events, faction.plantation_council, npc.klaus_rasmussen.epistemic, npc.erik_rasmussen.epistemic</related_cards>
</event_card_ref>

<event_card_ref id="event.trigger_events" type="trigger_event_rules">
<file>EVENT_TRIGGER_EVENTS_claude_rag_tagged.md</file>
<canonical_name>Trigger Events</canonical_name>
<aliases>trigger events, event triggers, recognition triggers, Bangs, player action triggers</aliases>
<keywords>Mahamad House Saturday, coat sleeves rolled, Hendrik, Whisht aloud, Søren chandlery, Cherokee, Danish, Eliza, Helm evening, Lefèvre apothecary, upper town daylight, garrison, Tomás O'Brien, folded paper, handwriting, bathed shaved dressed</keywords>
<use_when>Use whenever a player action crosses a specific condition listed here, especially recognition, body-knowledge, or identity-trigger moments.</use_when>
<related_cards>npc.old_hendrik.epistemic, npc.soren_lind.epistemic, npc.eliza_free.epistemic, npc.tomas_obrien.epistemic, npc.lauritz_knudsen.epistemic, npc.isaac_de_lima.epistemic</related_cards>
</event_card_ref>

</cards>

<timeline_lookup>
<section name="1714 Spring">
<keywords>March Whisht outfitted, Søren quartermaster, Hendrik boatswain, April Cumaná raid, May Cael meets Agnes at Christianstorv</keywords>
<card>event.pre_amnesia_timeline</card>
</section>
<section name="1714 Summer">
<keywords>affair, careening, refit, Agnes pregnant, letters through Karin Holm, Father Joaquín confession, Else</keywords>
<card>event.pre_amnesia_timeline</card>
</section>
<section name="1714 Autumn">
<keywords>Klaus discovers pregnancy, Charlotte Amalie convent, fever story, Cael returns, Agnes gone, Frederik purser berth</keywords>
<card>event.pre_amnesia_timeline</card>
</section>
<section name="1714 Winter">
<keywords>Mona Passage, Rasmussen brig, Frederik killed by pistol-ball, Søren swears Cael fired, de Lima correspondent, Erik investigation</keywords>
<card>event.pre_amnesia_timeline</card>
</section>
<section name="1715 Spring">
<keywords>Margreta born, Mette Madsen, Sister Brigitte, Agnes returns, silver crucifix, Don Esteban bounty, San Juan</keywords>
<card>event.pre_amnesia_timeline</card>
</section>
<section name="1715 Summer">
<keywords>Whisht last successful cruise, Spanish treasure fleet wreck, August 24 Whisht returns damaged, crew paid off, September 9 Søren payment</keywords>
<card>event.pre_amnesia_timeline</card>
</section>
<section name="Three nights before campaign opens">
<keywords>September 12 Helm, alley attack, Stickjaw, Jens Kruse, Mads Holst, belaying pin, Petter rescue, Eliza cottage, September 15 opening</keywords>
<card>event.pre_amnesia_timeline</card>
</section>
</timeline_lookup>

<calendar_lookup>
<week name="Week 1">
<days>Day 1 campaign opens; Day 2 market and Council; Day 3 Methodist meeting and Sankt Anna sails; Day 4 Spanish patrol; Day 5 convent letter and Sabbath; Day 7 Christianskirke</days>
<card>event.scheduled_calendar</card>
</week>
<week name="Week 2">
<days>Day 8 full moon; Day 9 Erik raises returned man; Day 10 convergence opens; Day 11 Vrije Wind careening complete; Day 12 packet; Day 13 Hans Müller dinner; Day 14 convergence closes</days>
<card>event.scheduled_calendar</card>
</week>
<week name="Week 3 and beyond">
<days>Day 16-17 hurricane warning; Day 18 Vrije Wind provisions; Day 21 earliest sail; Day 22 Curaçao packet; Day 28 Henry Jennings rumor</days>
<card>event.scheduled_calendar</card>
</week>
</calendar_lookup>

<trigger_lookup>
<trigger key="Mahamad House Saturday morning"><card>event.trigger_events</card><related>location.mahamad_house, npc.aaron_de_castro</related></trigger>
<trigger key="coat sleeves rolled in tavern"><card>event.trigger_events</card><related>npc.old_hendrik.epistemic</related></trigger>
<trigger key="Whisht aloud in Søren chandlery"><card>event.trigger_events</card><related>npc.soren_lind.epistemic, location.linds_chandlery</related></trigger>
<trigger key="Whisht aloud in tavern"><card>event.trigger_events</card><related>faction.free_brotherhood, npc.old_hendrik.epistemic</related></trigger>
<trigger key="Cherokee or Danish in Eliza hearing"><card>event.trigger_events</card><related>npc.eliza_free.epistemic</related></trigger>
<trigger key="Helm evening and Hendrik present"><card>event.trigger_events</card><related>npc.old_hendrik.epistemic, location.helm_tavern</related></trigger>
<trigger key="Lefèvre treatment"><card>event.trigger_events</card><related>npc.lefevre.prose, npc.don_esteban_de_ribera.epistemic</related></trigger>
<trigger key="upper town daylight coat"><card>event.trigger_events</card><related>npc.tomas_obrien.epistemic, faction.selskab</related></trigger>
<trigger key="folded paper shown"><card>event.trigger_events</card><related>npc.lauritz_knudsen.epistemic, npc.isaac_de_lima.epistemic, npc.soren_lind.epistemic</related></trigger>
<trigger key="bathed shaved dressed"><card>event.trigger_events</card><related>all pre-amnesia recognition NPCs</related></trigger>
</trigger_lookup>

<convergence_lookup>
<path id="alpha" name="Stickjaw's panic"><card>event.convergence_window.day_10_to_day_14</card><related>npc.kristoffer_stickjaw_holm.epistemic, npc.karin_holm.prose</related></path>
<path id="beta" name="Agnes makes her move"><card>event.convergence_window.day_10_to_day_14</card><related>npc.agnes_rasmussen.epistemic, npc.dona_ines.prose, npc.karin_holm.prose, npc.lefevre.prose</related></path>
<path id="gamma" name="Søren breaks"><card>event.convergence_window.day_10_to_day_14</card><related>npc.soren_lind.epistemic, location.linds_chandlery</related></path>
<path id="delta" name="Don Esteban learns"><card>event.convergence_window.day_10_to_day_14</card><related>npc.don_esteban_de_ribera.epistemic, npc.lauritz_knudsen.epistemic</related></path>
</convergence_lookup>

<atmosphere_lookup>
<card>event.random_atmospheric_events</card>
<rule>Use sparingly, roughly one per three turns, as color rather than plot pressure.</rule>
<keywords>Three Anchors fight, last rites, yellow fever, nail barrel, pamphlet hawker, dog child plantains, garrison soldier romance, dead fish, Council case, jewelry fence</keywords>
</atmosphere_lookup>
</rag_index>
