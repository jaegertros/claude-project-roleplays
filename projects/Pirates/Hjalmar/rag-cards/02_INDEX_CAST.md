# RAG_INDEX_CAST.md

<rag_index type="cast_prose_profiles" version="3">
<index_usage>
Use this index to route character-description queries to the correct cast prose card. These cards govern how a character is written: appearance, voice, routine, personality, and narration style. They do not replace NPC_MAP / epistemic cards for knowledge, reveal triggers, or recognition logic.
</index_usage>

<index_entry entity="Agnes Rasmussen" card_id="cast.agnes_rasmussen.prose">
<aliases>Agnes, Agnes Rasmussen, Rasmussen daughter, Klaus's daughter, Erik's sister, the woman from the convent</aliases>
<retrieval_keywords>Agnes, Rasmussen, convent, Charlotte Amalie, fever, crucifix, dark dress, Mahamad House, Christianstorv, Trefoldighed</retrieval_keywords>
<use_when>Render or describe this character in scene; retrieve companion epistemic card if the scene involves secrets, recognition, knowledge limits, or reveal triggers.</use_when>
<related_cards>npc.agnes_rasmussen.epistemic, faction.plantation_council, location.trefoldighed, location.christianstorv, location.mahamad_house</related_cards>
</index_entry>

<index_entry entity="Big Anna" card_id="cast.big_anna.prose">
<aliases>Anna, Big Anna, smith, master smith, Saint-Domingue smith, blacksmith</aliases>
<retrieval_keywords>Big Anna, smith, forge, Saint-Domingue, formerly enslaved, French sugar plantation, knife, lower town</retrieval_keywords>
<use_when>Render or describe this character in scene; retrieve companion epistemic card if the scene involves secrets, recognition, knowledge limits, or reveal triggers.</use_when>
<related_cards>location.smithy, faction.free_black_population, faction.maroon_adjacent, utility.weapons_repairs</related_cards>
</index_entry>

<index_entry entity="Captain Holger Vinter" card_id="cast.holger_vinter.prose">
<aliases>Holger, Holger Vinter, Captain Vinter, garrison captain, Danish-Norwegian officer</aliases>
<retrieval_keywords>Holger Vinter, garrison, Danish-Norwegian, uniform, regulation sword, Fort Christiansborg, orders</retrieval_keywords>
<use_when>Render or describe this character in scene; retrieve companion epistemic card if the scene involves secrets, recognition, knowledge limits, or reveal triggers.</use_when>
<related_cards>faction.selskab_company, location.fort_christiansborg, faction.garrison</related_cards>
</index_entry>

<index_entry entity="Captain Pieter Maartens" card_id="cast.pieter_maartens.prose">
<aliases>Pieter, Pieter Maartens, Captain Maartens, Maartens, captain of De Vrije Wind, Brotherhood captain</aliases>
<retrieval_keywords>Maartens, De Vrije Wind, Free Wind, brigantine, careening, Dutch, Brotherhood, Jens Eriksohn, Three Anchors</retrieval_keywords>
<use_when>Render or describe this character in scene; retrieve companion epistemic card if the scene involves secrets, recognition, knowledge limits, or reveal triggers.</use_when>
<related_cards>npc.pieter_maartens.epistemic, faction.free_brotherhood, location.careenage, location.three_anchors</related_cards>
</index_entry>

<index_entry entity="Corporal Tomás O&#x27;Brien" card_id="cast.tomas_obrien.prose">
<aliases>Tomás, Tomas, Tomás O'Brien, Tomas O'Brien, Corporal O'Brien, Charleston corporal, garrison corporal</aliases>
<retrieval_keywords>Tomás O'Brien, Charleston, Irish-Catholic, Spanish-Catholic, rosary, garrison, eyebrow scar, Irish-mixed face</retrieval_keywords>
<use_when>Render or describe this character in scene; retrieve companion epistemic card if the scene involves secrets, recognition, knowledge limits, or reveal triggers.</use_when>
<related_cards>npc.tomas_obrien.epistemic, faction.selskab_company, location.fort_christiansborg, event.charleston_1711</related_cards>
</index_entry>

<index_entry entity="Doña Inés" card_id="cast.dona_ines.prose">
<aliases>Doña Inés, Dona Ines, Inés, Ines, El Yelmo keeper, Spanish tavern keeper</aliases>
<retrieval_keywords>Doña Inés, El Yelmo, Canarian Spanish, San Yelmo, Spanish remnant, hospitality, crucifix, lower town</retrieval_keywords>
<use_when>Render or describe this character in scene; retrieve companion epistemic card if the scene involves secrets, recognition, knowledge limits, or reveal triggers.</use_when>
<related_cards>location.el_yelmo, faction.spanish_remnant, npc.dona_ines.epistemic</related_cards>
</index_entry>

<index_entry entity="Don Esteban de Ribera" card_id="cast.don_esteban_de_ribera.prose">
<aliases>Don Esteban, Esteban, Esteban de Ribera, wine merchant, Spanish intelligence officer, San Juan agent</aliases>
<retrieval_keywords>Don Esteban, de Ribera, wine merchant, San Juan, Spanish intelligence, Madeira, rapier, bounty, Customs House</retrieval_keywords>
<use_when>Render or describe this character in scene; retrieve companion epistemic card if the scene involves secrets, recognition, knowledge limits, or reveal triggers.</use_when>
<related_cards>npc.don_esteban_de_ribera.epistemic, secret.spanish_network, faction.spanish_remnant, location.customs_house, location.helm_tavern</related_cards>
</index_entry>

<index_entry entity="Eliza Free" card_id="cast.eliza_free.prose">
<aliases>Eliza, Eliza Free, healer, herbalist, midwife, Cherokee healer, Maroon healer</aliases>
<retrieval_keywords>Eliza Free, Cherokee, grief-marks, thigh-marks, healer, herbalist, midwife, Maroon community, cottage, Petter beach</retrieval_keywords>
<use_when>Render or describe this character in scene; retrieve companion epistemic card if the scene involves secrets, recognition, knowledge limits, or reveal triggers.</use_when>
<related_cards>npc.eliza_free.epistemic, faction.maroon_community, location.eliza_cottage, npc.petter_halvorsen.epistemic</related_cards>
</index_entry>

<index_entry entity="Erik Rasmussen" card_id="cast.erik_rasmussen.prose">
<aliases>Erik, Erik Rasmussen, Rasmussen heir, Agnes's brother, Klaus's son, Trefoldighed heir</aliases>
<retrieval_keywords>Erik Rasmussen, Agnes, Frederik, Trefoldighed, estate discipline, dark green velvet coat, dueling pistol, Rasmussen</retrieval_keywords>
<use_when>Render or describe this character in scene; retrieve companion epistemic card if the scene involves secrets, recognition, knowledge limits, or reveal triggers.</use_when>
<related_cards>npc.erik_rasmussen.epistemic, faction.plantation_council, location.trefoldighed, event.mona_passage_raid</related_cards>
</index_entry>

<index_entry entity="Ezekiel Boatswain" card_id="cast.ezekiel_boatswain.prose">
<aliases>Ezekiel, Ezekiel Boatswain, Methodist elder, net mender, rigging mender, old sailor</aliases>
<retrieval_keywords>Ezekiel Boatswain, Methodist, Bible, Carolina, formerly enslaved, wharf, nets, rigging, genuine need</retrieval_keywords>
<use_when>Render or describe this character in scene; retrieve companion epistemic card if the scene involves secrets, recognition, knowledge limits, or reveal triggers.</use_when>
<related_cards>faction.free_black_population, faction.methodist_meeting, location.wharf_side</related_cards>
</index_entry>

<index_entry entity="Father Joaquín Vega" card_id="cast.father_joaquin_vega.prose">
<aliases>Father Joaquín, Father Joaquin, Joaquín Vega, Joaquin Vega, Father Vega, Franciscan, priest, mission priest</aliases>
<retrieval_keywords>Father Joaquín Vega, Mision de San Yelmo, Spanish remnant, Catholic, Franciscan, confession, Latin tags, Puerto Rico</retrieval_keywords>
<use_when>Render or describe this character in scene; retrieve companion epistemic card if the scene involves secrets, recognition, knowledge limits, or reveal triggers.</use_when>
<related_cards>npc.father_joaquin_vega.epistemic, faction.spanish_remnant, location.mision_de_san_yelmo, secret.spanish_network</related_cards>
</index_entry>

<index_entry entity="Hans Müller" card_id="cast.hans_muller.prose">
<aliases>Hans, Hans Müller, Hans Muller, Müller, Muller, Council dissenter, Holstein-Danish planter</aliases>
<retrieval_keywords>Hans Müller, Plantation Council, Rasmussens, dissenting vote, roses, Holstein Danish, Council meetings, plantation owner</retrieval_keywords>
<use_when>Render or describe this character in scene; retrieve companion epistemic card if the scene involves secrets, recognition, knowledge limits, or reveal triggers.</use_when>
<related_cards>faction.plantation_council, secret.council_split, location.plantation_belt</related_cards>
</index_entry>

<index_entry entity="Hazzan Joaquim Ribera" card_id="cast.hazzan_joaquim_ribera.prose">
<aliases>Hazzan Ribera, Joaquim Ribera, Hazzan Joaquim, prayer leader, Mahamad House hazzan</aliases>
<retrieval_keywords>Hazzan Joaquim Ribera, Mahamad House, Sephardic, Amsterdam, Portuguese family, skull-cap, ink-stained fingers, no relation to Don Esteban</retrieval_keywords>
<use_when>Render or describe this character in scene; retrieve companion epistemic card if the scene involves secrets, recognition, knowledge limits, or reveal triggers.</use_when>
<related_cards>location.mahamad_house, faction.sephardim, npc.isaac_de_lima.epistemic</related_cards>
</index_entry>

<index_entry entity="Hosea Penn" card_id="cast.hosea_penn.prose">
<aliases>Hosea, Hosea Penn, printer, the printer, Quaker printer, weekly editor</aliases>
<retrieval_keywords>Hosea Penn, printer, press, weekly, Quaker, Pennsylvania, broad-brimmed hat, ink-stained hands</retrieval_keywords>
<use_when>Render or describe this character in scene; retrieve companion epistemic card if the scene involves secrets, recognition, knowledge limits, or reveal triggers.</use_when>
<related_cards>location.print_shop, secret.storgaard_petition, faction.selskab_company</related_cards>
</index_entry>

<index_entry entity="Isaac de Lima" card_id="cast.isaac_de_lima.prose">
<aliases>Isaac, Isaac de Lima, de Lima, De Lima & Sons, counting house, Sephardic banker, merchant</aliases>
<retrieval_keywords>Isaac de Lima, De Lima & Sons, counting house, Curaçao, Amsterdam, Whisht debt, paper, Mahamad House</retrieval_keywords>
<use_when>Render or describe this character in scene; retrieve companion epistemic card if the scene involves secrets, recognition, knowledge limits, or reveal triggers.</use_when>
<related_cards>npc.isaac_de_lima.epistemic, location.de_lima_and_sons, location.mahamad_house, faction.sephardim, secret.sephardic_ledger</related_cards>
</index_entry>

<index_entry entity="Joseph Tide" card_id="cast.joseph_tide.prose">
<aliases>Joseph, Joseph Tide, master cooper, cooper, Bajan cooper, Mary Tide's husband</aliases>
<retrieval_keywords>Joseph Tide, cooper, barrels, Barbados, Bajan, Methodist, ships, wharf, barrels leak</retrieval_keywords>
<use_when>Render or describe this character in scene; retrieve companion epistemic card if the scene involves secrets, recognition, knowledge limits, or reveal triggers.</use_when>
<related_cards>location.cooperage, faction.free_black_population, faction.methodist_meeting, location.wharf_side</related_cards>
</index_entry>

<index_entry entity="Karin Holm" card_id="cast.karin_holm.prose">
<aliases>Karin, Karin Holm, Stickjaw's sister, eel stall woman, conch stall woman, fish market vendor</aliases>
<retrieval_keywords>Karin Holm, Stickjaw, eel, conch, fish market, cooperage, lower-town Danish, letters, gossip</retrieval_keywords>
<use_when>Render or describe this character in scene; retrieve companion epistemic card if the scene involves secrets, recognition, knowledge limits, or reveal triggers.</use_when>
<related_cards>npc.kristoffer_stickjaw_holm.epistemic, location.fish_market, event.attack_behind_helm</related_cards>
</index_entry>

<index_entry entity="Klaus Rasmussen" card_id="cast.klaus_rasmussen.prose">
<aliases>Klaus, Klaus Rasmussen, Rasmussen patriarch, Agnes's father, Erik's father, Trefoldighed patriarch</aliases>
<retrieval_keywords>Klaus Rasmussen, Trefoldighed, Plantation Council, Holstein Danish, cane, pocket-watch, tremor, patriarch</retrieval_keywords>
<use_when>Render or describe this character in scene; retrieve companion epistemic card if the scene involves secrets, recognition, knowledge limits, or reveal triggers.</use_when>
<related_cards>npc.klaus_rasmussen.epistemic, faction.plantation_council, location.trefoldighed, secret.rasmussen_family</related_cards>
</index_entry>

<index_entry entity="Kristoffer " card_id="cast.kristoffer_stickjaw_holm.prose">
<aliases>Kristoffer Holm, Stickjaw, Stickjaw Holm, Kristoffer "Stickjaw" Holm, Karin's brother, hired dockhand</aliases>
<retrieval_keywords>Stickjaw, Kristoffer Holm, broken jaw, wharf, dockhand, hired to kill Cael, belaying pin, Three Anchors, El Yelmo</retrieval_keywords>
<use_when>Render or describe this character in scene; retrieve companion epistemic card if the scene involves secrets, recognition, knowledge limits, or reveal triggers.</use_when>
<related_cards>npc.kristoffer_stickjaw_holm.epistemic, npc.karin_holm.prose, event.attack_behind_helm, location.wharf_side</related_cards>
</index_entry>

<index_entry entity="Lauritz Knudsen" card_id="cast.lauritz_knudsen.prose">
<aliases>Lauritz, Lauritz Knudsen, Knudsen, harbormaster, customs officer, Customs House clerk</aliases>
<retrieval_keywords>Lauritz Knudsen, harbormaster, Customs House, ship clearances, retainers, bribes, notebook, Copenhagen Danish</retrieval_keywords>
<use_when>Render or describe this character in scene; retrieve companion epistemic card if the scene involves secrets, recognition, knowledge limits, or reveal triggers.</use_when>
<related_cards>npc.lauritz_knudsen.epistemic, location.customs_house, faction.selskab_company, secret.spanish_network</related_cards>
</index_entry>

<index_entry entity="Lefèvre" card_id="cast.lefevre.prose">
<aliases>Lefèvre, Lefevre, the apothecary, Curaçao apothecary, Amsterdam-trained apothecary, poison seller, physician-adjacent supplier</aliases>
<retrieval_keywords>Lefèvre, Lefevre, apothecary, Curaçao, Amsterdam, poisons, sedatives, contraceptives, clinical, discreet, records nothing, medicine</retrieval_keywords>
<use_when>Render or describe this character in scene; retrieve companion epistemic card if the scene involves secrets, recognition, knowledge limits, or reveal triggers.</use_when>
<related_cards>location.apothecary, utility.medicine, utility.poisons_sedatives, faction.merchant_row, npc.lefevre.epistemic</related_cards>
</index_entry>

<index_entry entity="Madame Margrethe Jensen" card_id="cast.madame_margrethe_jensen.prose">
<aliases>Madame Jensen, Margrethe Jensen, Jensen, boarding house keeper, upper-town boarding-house widow</aliases>
<retrieval_keywords>Madame Margrethe Jensen, boarding house, upper town, keys, Don Esteban lodges there, Maartens lodges there, neutral location, strict, fair</retrieval_keywords>
<use_when>Render or describe this character in scene; retrieve companion epistemic card if the scene involves secrets, recognition, knowledge limits, or reveal triggers.</use_when>
<related_cards>location.jensens_boarding_house, npc.don_esteban_de_ribera.prose, npc.pieter_maartens.prose, faction.merchant_row</related_cards>
</index_entry>

<index_entry entity="Madre Joana" card_id="cast.madre_joana.prose">
<aliases>Madre Joana, Joana, Maroon leader, Kongo leader, leader of the Maroon settlement</aliases>
<retrieval_keywords>Madre Joana, Kongo, Maroon settlement, Müller estate, escaped, ritual scars, settlement survival, knives, escorted</retrieval_keywords>
<use_when>Render or describe this character in scene; retrieve companion epistemic card if the scene involves secrets, recognition, knowledge limits, or reveal triggers.</use_when>
<related_cards>npc.madre_joana.epistemic, faction.maroon_community, location.maroon_settlement, npc.eliza_free.prose</related_cards>
</index_entry>

<index_entry entity="Magnus Bremer" card_id="cast.magnus_bremer.prose">
<aliases>Magnus Bremer, Governor Bremer, Bremer, Selskab governor, governor of Sankt Hjalmar</aliases>
<retrieval_keywords>Magnus Bremer, governor, Selskab, Government House, Danish Navy, Køge Bay, left arm, harbor fees, Council meetings</retrieval_keywords>
<use_when>Render or describe this character in scene; retrieve companion epistemic card if the scene involves secrets, recognition, knowledge limits, or reveal triggers.</use_when>
<related_cards>faction.selskab_company, location.government_house, secret.selskab_revenue, faction.plantation_council</related_cards>
</index_entry>

<index_entry entity="Margriet" card_id="cast.margriet_helm.prose">
<aliases>Margriet, Margriet of the Helm, Helm keeper, Frisian tavern keeper, woman behind the Helm bar</aliases>
<retrieval_keywords>Margriet, Helm, tavern, Frisian, rum, tab, information price, wharf side, club under the bar, Old Hendrik</retrieval_keywords>
<use_when>Render or describe this character in scene; retrieve companion epistemic card if the scene involves secrets, recognition, knowledge limits, or reveal triggers.</use_when>
<related_cards>location.helm_tavern, npc.old_hendrik.prose, event.attack_behind_helm, faction.free_brotherhood</related_cards>
</index_entry>

<index_entry entity="Old Hendrik" card_id="cast.old_hendrik.prose">
<aliases>Old Hendrik, Hendrik, the old sailor, Jens Eriksohn crewmate, Helm drunk, boatswain</aliases>
<retrieval_keywords>Old Hendrik, Helsingør, eye-patch, compass-rose tattoo, blue wool coat, Helm, Jens Eriksohn, two drinks, security hole</retrieval_keywords>
<use_when>Render or describe this character in scene; retrieve companion epistemic card if the scene involves secrets, recognition, knowledge limits, or reveal triggers.</use_when>
<related_cards>npc.old_hendrik.epistemic, location.helm_tavern, faction.free_brotherhood, event.jens_eriksohn_history</related_cards>
</index_entry>

<index_entry entity="Pastor Anders Bagger" card_id="cast.pastor_anders_bagger.prose">
<aliases>Pastor Bagger, Anders Bagger, Lutheran pastor, Council pastor, Selskab-paid pastor</aliases>
<retrieval_keywords>Pastor Anders Bagger, Lutheran, Copenhagen-trained, Council sermon, Selskab, pulpit, anxious, conventional</retrieval_keywords>
<use_when>Render or describe this character in scene; retrieve companion epistemic card if the scene involves secrets, recognition, knowledge limits, or reveal triggers.</use_when>
<related_cards>faction.selskab_company, faction.plantation_council, location.christianskirke</related_cards>
</index_entry>

<index_entry entity="Petter Halvorsen" card_id="cast.petter_halvorsen.prose">
<aliases>Petter, Petter Halvorsen, old Norwegian fisherman, leeward beach fisherman, man who rescued Cael</aliases>
<retrieval_keywords>Petter Halvorsen, leeward beach, reefs, fisherman, driftwood cottage, pulled Cael from shallows, took Cael to Eliza</retrieval_keywords>
<use_when>Render or describe this character in scene; retrieve companion epistemic card if the scene involves secrets, recognition, knowledge limits, or reveal triggers.</use_when>
<related_cards>npc.petter_halvorsen.epistemic, location.leeward_beach, npc.eliza_free.prose, event.cael_rescue</related_cards>
</index_entry>

<index_entry entity="Søren Lind" card_id="cast.soren_lind.prose">
<aliases>Søren Lind, Soren Lind, Søren, Soren, Lind, chandler, former quartermaster, Whisht quartermaster</aliases>
<retrieval_keywords>Søren Lind, Soren Lind, Lind’s Chandlery, Whisht, quartermaster, compass-rose tattoo, Erik Rasmussen informant, wharf side, Hilde</retrieval_keywords>
<use_when>Render or describe this character in scene; retrieve companion epistemic card if the scene involves secrets, recognition, knowledge limits, or reveal triggers.</use_when>
<related_cards>npc.soren_lind.epistemic, location.linds_chandlery, faction.free_brotherhood, event.attack_behind_helm</related_cards>
</index_entry>

<index_entry entity="Tregenza" card_id="cast.tregenza.prose">
<aliases>Tregenza, Three Anchors keeper, Cornish tavern keeper, one-eyed tavern keeper, Brotherhood tavern man</aliases>
<retrieval_keywords>Tregenza, Three Anchors, Cornish, eye patch, Brotherhood, shelter one night, sell out second night, short sword, wharf tavern</retrieval_keywords>
<use_when>Render or describe this character in scene; retrieve companion epistemic card if the scene involves secrets, recognition, knowledge limits, or reveal triggers.</use_when>
<related_cards>location.three_anchors, faction.free_brotherhood, npc.pieter_maartens.prose, location.wharf_side</related_cards>
</index_entry>

</rag_index>
