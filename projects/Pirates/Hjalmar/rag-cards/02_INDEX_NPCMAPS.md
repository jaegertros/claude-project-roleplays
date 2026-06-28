# RAG_INDEX_NPC_MAPS.md

<rag_index id="sankt_hjalmar.npc_maps.index" type="retrieval_index" scope="npc_epistemic_profiles">

<index_meta>
<project>Sankt Hjalmar</project>
<purpose>Small high-signal lookup index for Claude/RAG retrieval. Use this to identify which NPC map cards should be loaded for a scene, query, recognition event, or knowledge-leak check.</purpose>
<usage>Retrieve this index first when a scene mentions an NPC, alias, trigger keyword, location, family relationship, ship, mark, or secret. Then retrieve the listed card IDs.</usage>
<leak_discipline>This index is narrator-facing. It may mention hidden relationships and should not be quoted into diegetic narration.</leak_discipline>
</index_meta>

<index_card id="npc.erik_rasmussen.epistemic" type="npc_epistemic_profile" entity="Erik Rasmussen">
<canonical_name>Erik Rasmussen</canonical_name>
<aliases>Erik, Erik Rasmussen, Rasmussen heir, eldest Rasmussen son, Agnes's brother, Klaus's son, Frederik's cousin, the man hunting Cael</aliases>
<retrieval_keywords>Erik Rasmussen, Agnes fever, Frederik pistol-ball, Mona Passage, Whisht, Eriksohn, hired men, second-phase hunt, Rasmussen family, direct report Eriksohn alive</retrieval_keywords>
<use_when>Use before any scene where Erik appears, hears about Cael, receives information about Agnes, Frederik, the Whisht, Eriksohn, or any failed killing attempt.</use_when>
<related_cards>npc.erik_rasmussen.prose, npc.agnes_rasmussen.epistemic, npc.klaus_rasmussen.epistemic, npc.soren_lind.epistemic, event.attack_behind_helm, event.mona_passage_raid, faction.plantation_council, secret.rasmussen_family</related_cards>
</index_card>
<index_card id="npc.agnes_rasmussen.epistemic" type="npc_epistemic_profile" entity="Agnes Rasmussen">
<canonical_name>Agnes Rasmussen</canonical_name>
<aliases>Agnes, Agnes Rasmussen, Rasmussen daughter, Klaus's daughter, Erik's sister, Margreta's mother, Council daughter, the woman from the convent</aliases>
<retrieval_keywords>Agnes Rasmussen, convent, fever, crucifix, child, daughter, Margreta, Madsen family, Charlotte Amalie, Cael lover, sight recognition, voice recognition, walk recognition</retrieval_keywords>
<use_when>Use before any scene where Agnes appears, is observed, is discussed by family, or when the player mentions the convent, fever, crucifix, child, daughter, Margreta, or Charlotte Amalie.</use_when>
<related_cards>npc.agnes_rasmussen.prose, npc.erik_rasmussen.epistemic, npc.klaus_rasmussen.epistemic, event.summer_1714_affair, event.charlotte_amalie_convent, secret.rasmussen_child, faction.plantation_council</related_cards>
</index_card>
<index_card id="npc.klaus_rasmussen.epistemic" type="npc_epistemic_profile" entity="Klaus Rasmussen">
<canonical_name>Klaus Rasmussen</canonical_name>
<aliases>Klaus, Klaus Rasmussen, Rasmussen patriarch, Agnes's father, Erik's father, Trefoldighed patriarch, Council patriarch</aliases>
<retrieval_keywords>Klaus Rasmussen, Agnes pregnant, Madsen family, St. Thomas, quarterly stipend, Trefoldighed, hand tremor, family name, Erik pursuit</retrieval_keywords>
<use_when>Use before any scene where Klaus appears, receives visitors, discusses family, discusses the convent, or reacts to public threats to the Rasmussen name.</use_when>
<related_cards>npc.klaus_rasmussen.prose, npc.agnes_rasmussen.epistemic, npc.erik_rasmussen.epistemic, secret.rasmussen_child, location.trefoldighed, faction.plantation_council</related_cards>
</index_card>
<index_card id="npc.don_esteban_de_ribera.epistemic" type="npc_epistemic_profile" entity="Don Esteban de Ribera">
<canonical_name>Don Esteban de Ribera</canonical_name>
<aliases>Don Esteban, Esteban, Esteban de Ribera, Spanish wine merchant, Spanish intelligence officer, San Juan contact</aliases>
<retrieval_keywords>Don Esteban, wine merchant, San Juan, bounty, one hundred pesos, Cumaná raid, eyebrow scar, proof of identity, Spanish intelligence, hires not approach</retrieval_keywords>
<use_when>Use when Don Esteban appears, is discussed, receives gossip about the Whisht man, notices Cael, or when Spanish bounty/intelligence interests matter.</use_when>
<related_cards>npc.don_esteban_de_ribera.prose, npc.father_joaquin_vega.epistemic, npc.isaac_de_lima.epistemic, secret.spanish_network, event.cumana_raid, faction.spanish_remnant</related_cards>
</index_card>
<index_card id="npc.eliza_free.epistemic" type="npc_epistemic_profile" entity="Eliza Free">
<canonical_name>Eliza Free</canonical_name>
<aliases>Eliza, Eliza Free, healer in the highlands, Maroon healer, woman who tended Cael, Cherokee grief-marks witness</aliases>
<retrieval_keywords>Eliza Free, Cherokee, grief marks, thigh marks, inner left thigh, belaying pin, Petter, highlands, Maroon settlement, Cherokee language, rescue</retrieval_keywords>
<use_when>Use when Eliza appears, Cael returns to the highlands, Cherokee language or grief-marks surface, the rescue is investigated, or her cottage/settlement is threatened.</use_when>
<related_cards>npc.eliza_free.prose, location.eliza_cottage, faction.maroon_settlement, event.leeward_beach_rescue, secret.cael_cherokee_marks</related_cards>
</index_card>
<index_card id="npc.pieter_maartens.epistemic" type="npc_epistemic_profile" entity="Captain Pieter Maartens">
<canonical_name>Captain Pieter Maartens</canonical_name>
<aliases>Pieter Maartens, Captain Maartens, Maartens, Dutch captain, captain of De Vrije Wind, Brotherhood colleague</aliases>
<retrieval_keywords>Pieter Maartens, De Vrije Wind, Vrije Wind, Brotherhood, colleague, wharf, Erik Rasmussen, insurance suspicion, compass tattoo, upcoming sail</retrieval_keywords>
<use_when>Use when Maartens appears, Brotherhood politics matter, Cael seeks ship help, or questions arise about Erik's recent wharf presence.</use_when>
<related_cards>npc.pieter_maartens.prose, faction.free_brotherhood, location.careenage, event.treasure_fleet_aftermath, npc.erik_rasmussen.epistemic</related_cards>
</index_card>
<index_card id="npc.isaac_de_lima.epistemic" type="npc_epistemic_profile" entity="Isaac de Lima">
<canonical_name>Isaac de Lima</canonical_name>
<aliases>Isaac, Isaac de Lima, de Lima, counting house, Sephardic banker, creditor, senior partner</aliases>
<retrieval_keywords>Isaac de Lima, paper, debt, six hundred pieces of eight, Whisht debt, Don Esteban, Curaçao correspondents, Copenhagen law firm, credit request</retrieval_keywords>
<use_when>Use when Cael visits the counting house, asks for credit/capital, discusses debt, Don Esteban, the Whisht, or financial consequences.</use_when>
<related_cards>npc.isaac_de_lima.prose, location.de_lima_counting_house, faction.sephardim, secret.sephardic_ledger, npc.don_esteban_de_ribera.epistemic</related_cards>
</index_card>
<index_card id="npc.father_joaquin_vega.epistemic" type="npc_epistemic_profile" entity="Father Joaquín Vega">
<canonical_name>Father Joaquín Vega</canonical_name>
<aliases>Father Joaquín, Joaquín Vega, Father Vega, Mexican priest, mission priest, Catholic priest</aliases>
<retrieval_keywords>Father Joaquín, confession, confessional, Don Esteban, San Juan, Cumaná, daughter of Council family, wharf attack, Catholic reflex, Latin tags</retrieval_keywords>
<use_when>Use when Cael approaches the mission/church, confesses, asks about Spanish matters, Esteban, Council daughter gossip, or the wharf attack.</use_when>
<related_cards>npc.father_joaquin_vega.prose, npc.don_esteban_de_ribera.epistemic, location.mission, faction.spanish_remnant, event.wharf_attack</related_cards>
</index_card>
<index_card id="schema.npc_map_format_reference" type="format_reference" entity="NPC Map Format Reference">
<canonical_name>NPC Map Format Reference</canonical_name>
<aliases>format reference, NPC map schema, epistemic profile schema, seven section format</aliases>
<retrieval_keywords>knows, does not know, reveal triggers, suspects but cannot confirm, voice and refusal pattern, disposition shift conditions, pre-amnesia relationship, recognition triggers</retrieval_keywords>
<use_when>Use when interpreting or validating any NPC epistemic profile, especially when checking whether a scene would leak knowledge or violate recognition rules.</use_when>
<related_cards>all npc.*.epistemic cards, project.knowledge_wall, project.recognition_triggers</related_cards>
</index_card>

<index_card id="npc.kristoffer_stickjaw_holm.epistemic" type="npc_epistemic_profile" entity="Kristoffer "Stickjaw" Holm">
<canonical_name>Kristoffer "Stickjaw" Holm</canonical_name>
<aliases>Kristoffer Holm, Stickjaw, Stickjaw Holm, Kristoffer "Stickjaw" Holm, Karin Holm's brother, hired attacker, the man who hit Cael, lower-town dockhand</aliases>
<retrieval_keywords>Stickjaw, Kristoffer Holm, belaying pin, hired by Erik, three men, Jens Kruse, rolled body into harbor, failed killing, bolts on sight, confession, Karin pressure</retrieval_keywords>
<use_when>Use before any scene where Stickjaw appears, sees Cael, is accused, is pressured by Karin, discusses the wharf attack, or reacts to Erik Rasmussen.</use_when>
<related_cards>npc.kristoffer_stickjaw_holm.prose, npc.erik_rasmussen.epistemic, npc.soren_lind.epistemic, npc.petter_halvorsen.epistemic, event.attack_behind_helm, location.helm_tavern, location.wharf, npc.karin_holm.prose</related_cards>
</index_card>
<index_card id="npc.lauritz_knudsen.epistemic" type="npc_epistemic_profile" entity="Lauritz Knudsen">
<canonical_name>Lauritz Knudsen</canonical_name>
<aliases>Lauritz, Lauritz Knudsen, Knudsen, harbormaster, Customs House officer, harbor ledger keeper, corrupt official</aliases>
<retrieval_keywords>Knudsen, Customs House, harbor records, Whisht cleared August 24, bribe, retainer, Don Esteban, Rasmussen retainer, ship clearance, no report filed</retrieval_keywords>
<use_when>Use when harbor records, customs clearance, ship manifests, retainers, bribes, or official inquiries into ships and bodies matter.</use_when>
<related_cards>npc.lauritz_knudsen.prose, location.customs_house, npc.don_esteban_de_ribera.epistemic, npc.erik_rasmussen.epistemic, faction.selskab_company, event.whisht_august_clearance, event.attack_behind_helm</related_cards>
</index_card>
<index_card id="npc.madre_joana.epistemic" type="npc_epistemic_profile" entity="Madre Joana">
<canonical_name>Madre Joana</canonical_name>
<aliases>Madre Joana, Joana, Maroon leader, highlands leader, settlement mother, Kongo-Portuguese-English speaker</aliases>
<retrieval_keywords>Madre Joana, Eliza Free, wounded sailor, no memory, rifles in 1714, Maroon paths, sanctuary, punitive expedition, settlement location, cautious ally</retrieval_keywords>
<use_when>Use when the Maroon settlement, Eliza's rescue of Cael, sanctuary, rifles sold in 1714, highland paths, or settlement security matters.</use_when>
<related_cards>npc.madre_joana.prose, npc.eliza_free.epistemic, npc.petter_halvorsen.epistemic, faction.maroon_settlement, location.maroon_settlement, event.leeward_beach_rescue, secret.maroon_paths</related_cards>
</index_card>
<index_card id="npc.old_hendrik.epistemic" type="npc_epistemic_profile" entity="Old Hendrik">
<canonical_name>Old Hendrik</canonical_name>
<aliases>Old Hendrik, Hendrik, one-eyed Hendrik, Helsingør sailor, retired boatswain, Jens Eriksohn's old crewmate, Helm regular, security hole</aliases>
<retrieval_keywords>Old Hendrik, two drinks, compass-rose tattoo, Caleb boy, Eriksohn boy, Whisht, Jens Eriksohn, Helm, involuntary reveal, face voice walk tattoo</retrieval_keywords>
<use_when>Use before any tavern scene where Hendrik may be present, any scene involving the compass-rose tattoo, Jens Eriksohn history, the Whisht, or accidental public recognition.</use_when>
<related_cards>npc.old_hendrik.prose, npc.soren_lind.epistemic, npc.pieter_maartens.epistemic, location.helm_tavern, event.jens_eriksohn_history, project.recognition_triggers, faction.free_brotherhood</related_cards>
</index_card>
<index_card id="npc.petter_halvorsen.epistemic" type="npc_epistemic_profile" entity="Petter Halvorsen">
<canonical_name>Petter Halvorsen</canonical_name>
<aliases>Petter, Petter Halvorsen, leeward fisherman, man who pulled Cael from the shallows, Norwegian fisherman, beach rescuer</aliases>
<retrieval_keywords>Petter Halvorsen, pulled man from shallows, belaying pin wound, Eliza Free, leeward beach, cottage, direct question alone, Brotherhood captain suspicion, slow answers</retrieval_keywords>
<use_when>Use when Cael investigates the rescue, visits the leeward beach or Petter's cottage, asks about Eliza, or traces the head wound.</use_when>
<related_cards>npc.petter_halvorsen.prose, npc.eliza_free.epistemic, npc.madre_joana.epistemic, event.leeward_beach_rescue, location.leeward_beach, location.eliza_cottage</related_cards>
</index_card>
<index_card id="npc.soren_lind.epistemic" type="npc_epistemic_profile" entity="Søren Lind">
<canonical_name>Søren Lind</canonical_name>
<aliases>Søren, Soren Lind, Søren Lind, Lind, chandler, former quartermaster, Whisht quartermaster, Erik informant, Hilde's husband</aliases>
<retrieval_keywords>Søren Lind, Soren Lind, chandlery, quartermaster, Erik payment, betrayal, daughter exists, Whisht, Jens, direct sight freezes, goes pale, conflicted ally, second-time betrayer</retrieval_keywords>
<use_when>Use before any scene at Lind's Chandlery, any direct meeting between Cael and Søren, any mention of Erik, Jens, the Whisht, the attack, or Cael's daughter.</use_when>
<related_cards>npc.soren_lind.prose, npc.erik_rasmussen.epistemic, npc.old_hendrik.epistemic, npc.pieter_maartens.epistemic, location.linds_chandlery, event.attack_behind_helm, event.mona_passage_raid, secret.rasmussen_child</related_cards>
</index_card>
<index_card id="npc.tomas_obrien.epistemic" type="npc_epistemic_profile" entity="Tomás O'Brien">
<canonical_name>Tomás O'Brien</canonical_name>
<aliases>Tomás, Tomas, Tomás O'Brien, Tomas O'Brien, Corporal O'Brien, Charleston Irish-Spanish soldier, garrison corporal, Sean O'Brien's son</aliases>
<retrieval_keywords>Tomás O'Brien, Tomas O'Brien, Charleston 1711, Sean O'Brien, eyebrow scar, Irish-mixed look, good light, writes to mother, shadows, third meeting, predator</retrieval_keywords>
<use_when>Use when Tomás appears, garrison matters, Charleston 1711 is mentioned, the eyebrow scar is visible in good light, or recognition by scar/look conjunction may occur.</use_when>
<related_cards>npc.tomas_obrien.prose, faction.selskab_company, location.garrison, event.charleston_1711, project.recognition_triggers, secret.cael_past_charleston</related_cards>
</index_card>
<index_card id="process.narrator_scene_checklist" type="narrator_process_checklist" entity="Narrator scene preparation">
<canonical_name>Narrator Checklist Before Any Scene</canonical_name>
<aliases>scene checklist, narrator checklist, before any scene, NPC check, leak check, recognition check, epistemic check</aliases>
<retrieval_keywords>before any scene, what does NPC know, what can NPC not say, reveal triggers, recognition channel, Section 7, invisible to player, scene can and cannot do</retrieval_keywords>
<use_when>Use before writing any encounter between Cael and a profiled NPC, especially if recognition, secrets, or reveal triggers may be involved.</use_when>
<related_cards>schema.npc_map_format_reference, project.knowledge_wall, project.recognition_triggers, all npc.*.epistemic cards</related_cards>
</index_card>

</rag_index>
