# RAG_INDEX_FACTIONS

Use this file as a compact retrieval index for faction pressure in Sankt Hjalmar. It is not a replacement for the full faction cards; retrieve the relevant card after this index points to it.

<rag_index id="rag_index.factions" type="retrieval_index" domain="factions">

<index_entry card_id="faction.narrator_usage" type="faction_usage_protocol" entity="Faction Narrator Usage">
<output_file>FACTION_NARRATOR_USAGE_claude_rag_tagged.md</output_file>
<aliases>faction usage, faction reasoning, faction pressure, consequential scene checklist, narrator faction check</aliases>
<retrieval_keywords>factions, NPC faction membership, faction pressure, internal split, what faction wants from Cael, faction reaction</retrieval_keywords>
<use_when>Use before consequential scenes involving named NPCs, especially when social pressure, political alignment, or faction consequences should shape the scene.</use_when>
<related_cards>PROJECT_INSTRUCTIONS, NPC_MAP_NARRATOR_CHECKLIST_BEFORE_ANY_SCENE, RAG_INDEX_FACTIONS</related_cards>
</index_entry>

<index_entry card_id="faction.selskab_company" type="faction_profile" entity="The Selskab / The Company">
<output_file>FACTION_THE_SELSKAB_THE_COMPANY_claude_rag_tagged.md</output_file>
<aliases>Selskab, Company, the Company, Sankt Hjalmar Selskab, Danish charter company, Government House, Bremer, Knudsen, garrison</aliases>
<retrieval_keywords>harbor revenue, Copenhagen attention, Brotherhood tolerated, garrison, Selskab budget, Bremer discretionary fund, Knudsen retainers, Vinter, Tomás O’Brien, Pastor Bagger</retrieval_keywords>
<use_when>Use when government authority, harbor fees, customs, garrison response, Selskab tolerance of Brotherhood activity, or Copenhagen scrutiny matters.</use_when>
<related_cards>npc.magnus_bremer.prose, npc.lauritz_knudsen.prose, npc.lauritz_knudsen.epistemic, npc.holger_vinter.prose, npc.tomas_obrien.prose, faction.plantation_council, faction.free_brotherhood, secret.bremer_discretionary_fund</related_cards>
</index_entry>

<index_entry card_id="faction.plantation_council" type="faction_profile" entity="The Plantation Council">
<output_file>FACTION_THE_PLANTATION_COUNCIL_claude_rag_tagged.md</output_file>
<aliases>Council, planters, plantation families, Rasmussen bloc, dissenting bloc, upper town families, sugar families, Hans Müller, Storgaard petition</aliases>
<retrieval_keywords>Klaus Rasmussen, Erik Rasmussen, Agnes Rasmussen, Hans Müller, 9-6 split, slave-market expansion, Storgaard petition, succession question, Trefoldighed, Council meeting</retrieval_keywords>
<use_when>Use when upper-town politics, Council meetings, plantation interests, Rasmussen power, slave-market expansion, Storgaard petition, or planter reaction matters.</use_when>
<related_cards>npc.klaus_rasmussen.prose, npc.klaus_rasmussen.epistemic, npc.erik_rasmussen.prose, npc.erik_rasmussen.epistemic, npc.hans_muller.prose, faction.selskab_company, secret.council_internal_split, event.scheduled_calendar</related_cards>
</index_entry>

<index_entry card_id="faction.free_brotherhood" type="faction_profile" entity="The Free Brotherhood">
<output_file>FACTION_THE_FREE_BROTHERHOOD_claude_rag_tagged.md</output_file>
<aliases>Brotherhood, pirate captains, privateers, Brotherhood captains, wharf network, Free Brotherhood, Maartens, Whisht crew</aliases>
<retrieval_keywords>Maartens, Cael Eriksohn, Whisht, De Vrije Wind, Old Hendrik, Søren Lind, careenage, refit, treasure-fleet wreck, pirate network, Articles</retrieval_keywords>
<use_when>Use when Brotherhood captains, pirate networks, refit/careening, wharf reputation, Brotherhood protection, or treasure-fleet opportunities matter.</use_when>
<related_cards>npc.pieter_maartens.prose, npc.pieter_maartens.epistemic, npc.old_hendrik.prose, npc.old_hendrik.epistemic, npc.soren_lind.prose, npc.soren_lind.epistemic, faction.sephardim, faction.selskab_company, event.treasure_fleet_context</related_cards>
</index_entry>

<index_entry card_id="faction.spanish_remnant" type="faction_profile" entity="The Spanish Remnant">
<output_file>FACTION_THE_SPANISH_REMNANT_claude_rag_tagged.md</output_file>
<aliases>Spanish Quarter, Spanish remnant, San Yelmo, Mision de San Yelmo, Father Vega, Doña Inés, El Yelmo, Catholic families, Don Esteban</aliases>
<retrieval_keywords>Father Joaquín Vega, Doña Inés, Don Esteban, Spanish Quarter, mission, Puerto Rico, Catholic, pre-Danish town, San Yelmo, Esteban network</retrieval_keywords>
<use_when>Use when Spanish Quarter, Catholic community, mission politics, El Yelmo, Don Esteban’s social position, or old Spanish identity matters.</use_when>
<related_cards>npc.father_joaquin_vega.prose, npc.father_joaquin_vega.epistemic, npc.dona_ines.prose, npc.don_esteban.prose, npc.don_esteban.epistemic, faction.sephardim, secret.spanish_network</related_cards>
</index_entry>

<index_entry card_id="faction.sephardim" type="faction_profile" entity="The Sephardim">
<output_file>FACTION_THE_SEPHARDIM_claude_rag_tagged.md</output_file>
<aliases>Sephardim, Sephardic merchants, Mahamad House, Isaac de Lima, Hazzan Joaquim Ribera, Jewish merchant community, Curaçao correspondents</aliases>
<retrieval_keywords>de Lima, Mahamad House, Hazzan Ribera, commercial freedom, correspondence, Curaçao, Amsterdam, London, outstanding loan, Whisht paper, religious quiet</retrieval_keywords>
<use_when>Use when de Lima, the Mahamad House, money, correspondence, commercial intelligence, loans, or Sephardic community response matters.</use_when>
<related_cards>npc.isaac_de_lima.prose, npc.isaac_de_lima.epistemic, npc.hazzan_joaquim_ribera.prose, location.mahamad_house, faction.free_brotherhood, faction.spanish_remnant, secret.sephardic_ledger</related_cards>
</index_entry>

<index_entry card_id="faction.maroons" type="faction_profile" entity="The Maroons">
<output_file>FACTION_THE_MAROONS_claude_rag_tagged.md</output_file>
<aliases>Maroons, Lugar Quieto, highland settlement, Madre Joana, Eliza Free, escaped enslaved community, highlands</aliases>
<retrieval_keywords>Madre Joana, Eliza Free, Lugar Quieto, rifles in 1714, highland paths, punitive expedition, Free Quarter trade, Maroon settlement, sanctuary</retrieval_keywords>
<use_when>Use when the highland settlement, Eliza, Madre Joana, sanctuary, escaped enslaved community, rifle deal, or plantation expedition risk matters.</use_when>
<related_cards>npc.madre_joana.prose, npc.madre_joana.epistemic, npc.eliza_free.prose, npc.eliza_free.epistemic, faction.free_black_population_town, faction.plantation_council, location.highlands_lugar_quieto</related_cards>
</index_entry>

<index_entry card_id="faction.free_and_enslaved_black_population_town" type="faction_profile" entity="The Free and Enslaved Black Population in Town">
<output_file>FACTION_THE_FREE_AND_ENSLAVED_BLACK_POPULATION_IN_TOWN_claude_rag_tagged.md</output_file>
<aliases>Free Quarter, free Black community, enslaved town residents, Black population in town, Joseph Tide, Big Anna, Ezekiel Boatswain, Methodist meeting</aliases>
<retrieval_keywords>Joseph Tide, Big Anna, Ezekiel Boatswain, Free Quarter, enslaved residents, town networks, Methodist meeting, re-enslavement, slave codes, gossip network</retrieval_keywords>
<use_when>Use when Free Quarter life, Black tradespeople, enslaved town residents, Methodist meeting, information networks, or slave-code pressure matters.</use_when>
<related_cards>npc.joseph_tide.prose, npc.big_anna.prose, npc.ezekiel_boatswain.prose, faction.maroons, faction.selskab_company, faction.plantation_council, event.methodist_meeting</related_cards>
</index_entry>

<index_entry card_id="faction.royal_navy_ghost" type="offscreen_faction_pressure" entity="The Royal Navy Ghost">
<output_file>FACTION_THE_ROYAL_NAVY_GHOST_claude_rag_tagged.md</output_file>
<aliases>Royal Navy, Navy ghost, British Navy, British naval pressure, frigate rumor, Admiralty, anti-piracy patrols</aliases>
<retrieval_keywords>Royal Navy, Antigua, Jamaica, Barbados, Leeward Islands, piracy suppression, Storgaard petition, British slave code, no frigate deus ex machina</retrieval_keywords>
<use_when>Use when distant British naval pressure, anti-piracy fear, Storgaard petition implications, or rumors of Royal Navy movement matter.</use_when>
<related_cards>faction.free_brotherhood, faction.selskab_company, faction.plantation_council, faction.sephardim, event.henry_jennings_raid_rumor, secret.storgaard_petition</related_cards>
</index_entry>

</rag_index>
