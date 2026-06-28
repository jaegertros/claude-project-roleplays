# 01_INDEX_MASTER

<master_index id="vault83.master_index" project="vault83" format="xml_md">

<deployment_note>
Upload this file after 00_PROJECT_RUNTIME.md and 00_PROJECT_REFERENCE.md. This is a routing index, not a lore source. Use it to decide which specific card to retrieve.
</deployment_note>

<upload_order>
1. 00_PROJECT_RUNTIME.md
2. 00_PROJECT_REFERENCE.md
3. 01_INDEX_MASTER.md
4. 02_INDEX_*.md category indexes
5. NPCMAP_*.md, CAST_*.md, EVENT_*.md, HIDDEN_*.md, LOCATION_*.md, UTILITY_*.md, ANACHRONISM_*.md
</upload_order>

<collection prefix="NPCMAP_" category_index="02_INDEX_NPCMAPS.md">
<use_for>NPC knowledge boundaries, what an NPC knows, does not know, can cite, disclose, refuse, confirm, deny, or speculate about.</use_for>
<retrieve_when>Any NPC is under pressure to disclose, confirm, speculate, or react to substrate.</retrieve_when>
<do_not_use_for>Physical appearance or prose flavor unless no CAST card exists.</do_not_use_for>
</collection>

<collection prefix="CAST_" category_index="02_INDEX_CAST.md">
<use_for>Appearance, voice, routine, personality, narration texture, relationship surface.</use_for>
<retrieve_when>An NPC appears in scene or needs distinctive voice/prose rendering.</retrieve_when>
<do_not_use_for>Secret knowledge, reveal authorization, substrate confirmation.</do_not_use_for>
</collection>

<collection prefix="EVENT_" category_index="02_INDEX_EVENTS.md">
<use_for>Scheduled anchors, scripted beats, trigger events, ceremonies, day/time logic, week structure.</use_for>
<retrieve_when>Time advances, a scheduled beat approaches, a trigger condition may fire, or the user asks what is happening in the vault.</retrieve_when>
<do_not_use_for>Changing, softening, or delaying anchors.</do_not_use_for>
</collection>

<collection prefix="HIDDEN_" category_index="02_INDEX_HIDDEN.md">
<use_for>Narrator-only substrate, secrets, hidden motives, founding fraud, Ledger, Dane, true structural mechanics.</use_for>
<retrieve_when>The user has earned a discovery path, proposes a theory, or an NPC with proper access is dealing with hidden truth.</retrieve_when>
<do_not_use_for>Exposition, hints, or unsolicited reveals.</do_not_use_for>
<leak_rule>Retrieval is permission to reason, not permission to reveal.</leak_rule>
</collection>

<collection prefix="LOCATION_" category_index="02_INDEX_LOCATIONS.md">
<use_for>Vault spaces, access constraints, sensory details, floor/level geography, movement time, room functions.</use_for>
<retrieve_when>The scene moves, a space matters, access is attempted, or the STATE location must be canonicalized.</retrieve_when>
</collection>

<collection prefix="UTILITY_" category_index="02_INDEX_UTILITY.md">
<use_for>Opening text, loadout, scrip, prices, inventory, tracker/save mechanics, timekeeping, templates.</use_for>
<retrieve_when>First response, resource changes, shopping, item use, save line, state formatting, time advance.</retrieve_when>
</collection>

<collection prefix="ANACHRONISM_" category_index="02_INDEX_ANACHRONISMS.md">
<use_for>Vault responses to post-2077 language and outsider political vocabulary.</use_for>
<retrieve_when>The user uses words like privilege, classism, caste system, systemic, oppression, marginalized, 1%, dystopia, AI, internet, meme, or other outside-frame terms.</retrieve_when>
</collection>

<core_entities>
<entity name="Teague">
<files>00_PROJECT_RUNTIME.md, 00_PROJECT_REFERENCE.md, UTILITY_PLAYER_LOADOUT.md</files>
<keywords>Liaison, gray jumpsuit, no tier pin, all-floor access, Ezra, Mae, Generation 10</keywords>
</entity>
<entity name="Reeve Callender">
<files>NPCMAP_REEVE_CALLENDER.md, CAST_REEVE_CALLENDER.md, EVENT_DAY3_TRIBUNAL.md, EVENT_REEVE_ESCORT.md</files>
<keywords>demotion, Reeve, Callender, suitcase, Level 4, 4b-11, Day 3, Tribunal</keywords>
</entity>
<entity name="Camille Wren">
<files>NPCMAP_CAMILLE_WREN.md, CAST_CAMILLE_WREN.md, HIDDEN_LEDGER_HANDWRITING.md, LOCATION_ARCHIVE.md</files>
<keywords>Archive, back stacks, Hocking, handwriting anomaly, books, Wren</keywords>
</entity>
<entity name="Dane">
<files>HIDDEN_DANE_TAMPERING.md, HIDDEN_FOUNDING_FRAUD.md, HIDDEN_COMMAND_ALCOVE.md</files>
<keywords>Dane, Ledger, Admission Ledger, tampering, founding fraud, command alcove</keywords>
</entity>
<entity name="Wren Gallagher">
<files>NPCMAP_WREN_GALLAGHER.md, CAST_WREN_GALLAGHER.md, EVENT_FOUNDING_DAY_DINNER.md, EVENT_DAY7_ADDRESS.md</files>
<keywords>Founding Day, formal address, toast, Day 6, Day 7, Hymn Hall</keywords>
</entity>
</core_entities>

<runtime_reminder>
Always obey 00_PROJECT_RUNTIME.md over any retrieved lore card. If a lore card conflicts with a high-stakes Commitment Log entry, the Commitment Log wins for that playthrough.
</runtime_reminder>

</master_index>
