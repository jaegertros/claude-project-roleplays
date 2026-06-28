# RAG_INDEX_LOCATIONS

<rag_index id="locations.index" type="location_retrieval_index">
<purpose>
Use this file as the high-signal lookup layer for Sankt Hjalmar locations. Retrieve the listed location card first, then retrieve related NPC, faction, event, hidden, or utility cards as needed.
</purpose>

<global_rules>
- Locations are not empty backgrounds; every scene should have sensory texture, population, and geographic constraints.
- Travel consumes time and should update the tracker honestly.
- Hidden hooks attached to places are not automatically revealed when a location card is retrieved.
- Use town/district cards for public texture; use hidden cards only when discovery conditions are active.
</global_rules>

<location_lookup>
<entry name="Narrative location rules" card_id="location.narrative_guidelines" file="LOCATION_NARRATIVE_GUIDELINES_FOR_LOCATIONS_claude_rag_tagged.md">
<keywords>sensory detail, three senses, population present, distances matter, geography constrains, hidden hooks</keywords>
<retrieve_with>project.instructions, utility.travel_times</retrieve_with>
</entry>

<entry name="Sankt Hjalmar island overview" card_id="location.island_outline" file="LOCATION_THE_ISLAND_IN_OUTLINE_claude_rag_tagged.md">
<keywords>Sankt Hjalmar, volcanic island, harbor, reefs, climate, population, Danish-Norwegian</keywords>
<retrieve_with>location.town_districts, location.sea_approaches, location.plantation_belt_windward_valleys, location.highlands_bush</retrieve_with>
</entry>

<entry name="Wharf Side / Lower Town" card_id="location.town_districts" file="LOCATION_THE_TOWN_DISTRICTS_claude_rag_tagged.md">
<keywords>Wharf Side, Lower Town, Helm, Three Anchors, El Yelmo, Lind chandlery, careenage, fish market, slave pen, customs house</keywords>
<retrieve_with>npc.margriet.prose, npc.old_hendrik.epistemic, npc.soren_lind.epistemic, npc.knudsen.epistemic, faction.free_brotherhood, hidden.slave_pen_book</retrieve_with>
</entry>

<entry name="The Helm Tavern" card_id="location.town_districts" file="LOCATION_THE_TOWN_DISTRICTS_claude_rag_tagged.md">
<keywords>Helm, Margriet, wharf tavern, alley behind Helm, Hendrik, rum, recognition accident</keywords>
<retrieve_with>npc.margriet.prose, npc.old_hendrik.epistemic, event.trigger_events, event.pre_amnesia_timeline</retrieve_with>
</entry>

<entry name="The Three Anchors" card_id="location.town_districts" file="LOCATION_THE_TOWN_DISTRICTS_claude_rag_tagged.md">
<keywords>Three Anchors, Tregenza, Brotherhood tavern, rough tavern, back rooms, shelter one night</keywords>
<retrieve_with>npc.tregenza.prose, faction.free_brotherhood, npc.maartens.prose</retrieve_with>
</entry>

<entry name="El Yelmo" card_id="location.town_districts" file="LOCATION_THE_TOWN_DISTRICTS_claude_rag_tagged.md">
<keywords>El Yelmo, Dona Ines, Spanish tavern, Spanish Quarter, rum punch, strangers noticed</keywords>
<retrieve_with>npc.dona_ines.prose, faction.spanish_remnant, npc.stickjaw.epistemic</retrieve_with>
</entry>

<entry name="Lind's Chandlery" card_id="location.town_districts" file="LOCATION_THE_TOWN_DISTRICTS_claude_rag_tagged.md">
<keywords>Lind chandlery, Soren Lind, rope, pitch, sailcloth, Whisht, quartermaster, betrayal</keywords>
<retrieve_with>npc.soren_lind.prose, npc.soren_lind.epistemic, event.trigger_events</retrieve_with>
</entry>

<entry name="Fish Market" card_id="location.town_districts" file="LOCATION_THE_TOWN_DISTRICTS_claude_rag_tagged.md">
<keywords>fish market, Karin Holm, gossip, information traffic, eel and conch stall</keywords>
<retrieve_with>npc.karin_holm.prose, npc.stickjaw.epistemic, hidden.don_esteban_network</retrieve_with>
</entry>

<entry name="Customs House" card_id="location.town_districts" file="LOCATION_THE_TOWN_DISTRICTS_claude_rag_tagged.md">
<keywords>Customs House, Knudsen, harbor records, clearances, slave pen, registers</keywords>
<retrieve_with>npc.lauritz_knudsen.prose, npc.lauritz_knudsen.epistemic, hidden.slave_pen_book, hidden.don_esteban_network</retrieve_with>
</entry>

<entry name="Merchant Row / Middle Town" card_id="location.town_districts" file="LOCATION_THE_TOWN_DISTRICTS_claude_rag_tagged.md">
<keywords>Merchant Row, Christianstorv, De Lima, Mahamad House, Jensen boarding house, apothecary, print shop</keywords>
<retrieve_with>npc.isaac_de_lima.epistemic, npc.lefevre.prose, npc.hosea_penn.prose, faction.sephardim, hidden.print_shop_archive, hidden.sephardic_ledger</retrieve_with>
</entry>

<entry name="Government Hill / Upper Town" card_id="location.town_districts" file="LOCATION_THE_TOWN_DISTRICTS_claude_rag_tagged.md">
<keywords>Government Hill, Government House, Christianskirke, Fort Christiansborg, Blockhouse, garrison, Government Square</keywords>
<retrieve_with>npc.magnus_bremer.prose, npc.holger_vinter.prose, npc.tomas_obrien.epistemic, faction.selskab_company, hidden.selskab_books</retrieve_with>
</entry>

<entry name="Spanish Quarter / Old Town" card_id="location.town_districts" file="LOCATION_THE_TOWN_DISTRICTS_claude_rag_tagged.md">
<keywords>Spanish Quarter, San Yelmo, mission, Father Joaquin, Spanish fountain, old town, El Yelmo</keywords>
<retrieve_with>npc.father_joaquin_vega.prose, npc.dona_ines.prose, faction.spanish_remnant, hidden.mission_confessional</retrieve_with>
</entry>

<entry name="Free Quarter" card_id="location.town_districts" file="LOCATION_THE_TOWN_DISTRICTS_claude_rag_tagged.md">
<keywords>Free Quarter, cooperage, Joseph Tide, smithy, Big Anna, Methodist meeting, Ezekiel Boatswain</keywords>
<retrieve_with>npc.joseph_tide.prose, npc.big_anna.prose, npc.ezekiel_boatswain.prose, faction.free_black_population, hidden.maroon_network</retrieve_with>
</entry>

<entry name="Sea approaches" card_id="location.sea_approaches" file="LOCATION_THE_SEA_APPROACHES_claude_rag_tagged.md">
<keywords>harbor mouth, reef belt, Petter's Cut, Spanish Channel, Whisht Channel, Leeward Beach, Fort Concepcion</keywords>
<retrieve_with>npc.petter_halvorsen.prose, faction.free_brotherhood, event.pre_amnesia_timeline</retrieve_with>
</entry>

<entry name="Highlands / The Bush" card_id="location.highlands_bush" file="LOCATION_THE_HIGHLANDS_THE_BUSH_claude_rag_tagged.md">
<keywords>highlands, Maroon settlement, Lugar Quieto, Eliza cottage, Hjalmars Top Trail, Old Spanish Stones</keywords>
<retrieve_with>npc.eliza_free.epistemic, npc.madre_joana.epistemic, faction.maroons, hidden.maroon_network</retrieve_with>
</entry>

<entry name="Plantation Belt / Windward Valleys" card_id="location.plantation_belt_windward_valleys" file="LOCATION_THE_PLANTATION_BELT_WINDWARD_VALLEYS_claude_rag_tagged.md">
<keywords>plantation belt, Trefoldighed, Rasmussen estate, Tre Kilder, Müller estate, Coffee Hills, Eastern Cove</keywords>
<retrieve_with>faction.plantation_council, hidden.plantation_council_internal_split, npc.rasmussen_family, npc.hans_muller.prose</retrieve_with>
</entry>

<entry name="Off-map locations" card_id="location.off_map_locations" file="LOCATION_OFF_MAP_LOCATIONS_THE_NARRATOR_SHOULD_KNOW_claude_rag_tagged.md">
<keywords>Charlotte Amalie, Nassau, San Juan, Charleston, Treasure Fleet Wreck, Mosquito Coast</keywords>
<retrieve_with>event.scheduled_calendar, event.pre_amnesia_timeline, npc.agnes_rasmussen.epistemic, npc.tomas_obrien.epistemic, npc.don_esteban_de_ribera.epistemic</retrieve_with>
</entry>
</location_lookup>
</rag_index>
