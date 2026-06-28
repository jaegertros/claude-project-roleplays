# 01_INDEX_MASTER

Project-wide routing table. Tells the retriever which collection of files to consult for which kind of question, plus a small per-entity hint block for the central NPCs. Detailed per-category indexes live in `02_INDEX_*.md`. Card contents live in the category-prefixed files (`NPCMAP_*`, `CAST_*`, etc.).

<master_rag_index>

<collection name="NPCMAP" count="17">
Per-NPC epistemic profiles. What this character knows, what they refuse, what recognition triggers fire on, how reveals are gated. Pull these for any scene where the character is in dialogue or witnessing.
Files begin with `NPCMAP_`. See `02_INDEX_NPCMAPS.md` for the per-card index.
</collection>

<collection name="CAST" count="30">
Per-character prose profiles. Appearance, voice, routine, personality, body language, narration cues. Use for *how* a character is rendered, not what they know.
Files begin with `CAST_`. See `02_INDEX_CAST.md` for the per-card index.
</collection>

<collection name="EVENT" count="7">
Timeline cards: pre-amnesia history, the scheduled calendar, scripted trigger events, the convergence window (Days 10–14), random atmospheric beats.
Files begin with `EVENT_`. See `02_INDEX_EVENTS.md` for the per-card index.
</collection>

<collection name="FACTION" count="10">
The eight political blocks of Sankt Hjalmar. Use when the player engages with a group's interests, methods, or sphere of influence.
Files begin with `FACTION_`. See `02_INDEX_FACTIONS.md` for the per-card index.
</collection>

<collection name="HIDDEN" count="11">
Narrator-only secrets. Retrieval is *permission to reason*, not permission to reveal. Reveals require trigger events plus DEPTH gating.
Files begin with `HIDDEN_`. See `02_INDEX_HIDDEN.md` for the per-card index.
</collection>

<collection name="LOCATION" count="8">
Places — the island, the town districts, the plantations, the highlands, the sea approaches, off-map references.
Files begin with `LOCATION_`. See `02_INDEX_LOCATIONS.md` for the per-card index.
</collection>

<collection name="ERA" count="14">
Historical guardrails for the 1715 Caribbean: currency, daily life, ships, religion, slavery, political map, what is and isn't Hollywood-pirate.
Files begin with `ERA_`. See `02_INDEX_ERA.md` for the per-card index.
</collection>

<collection name="UTILITY" count="19">
Practical reference: currency conversion, prices, bribes, hiring rates, lodging, ship passage, distances and times.
Files begin with `UTILITY_`. See `02_INDEX_UTILITY.md` for the per-card index.
</collection>

<!-- Per-entity routing: characters who have BOTH a prose card (CAST) and an epistemic card (NPCMAP). -->
<entity name="Agnes Rasmussen">
Primary cards:
- NPCMAP_AGNES_RASMUSSEN.md  (knowledge / reveals / refusal)
- CAST_AGNES_RASMUSSEN.md  (appearance / voice / portrayal)
</entity>

<entity name="Captain Pieter Maartens">
Primary cards:
- NPCMAP_CAPTAIN_PIETER_MAARTENS.md  (knowledge / reveals / refusal)
- CAST_CAPTAIN_PIETER_MAARTENS.md  (appearance / voice / portrayal)
</entity>

<entity name="Don Esteban De Ribera">
Primary cards:
- NPCMAP_DON_ESTEBAN_DE_RIBERA.md  (knowledge / reveals / refusal)
- CAST_DON_ESTEBAN_DE_RIBERA.md  (appearance / voice / portrayal)
</entity>

<entity name="Eliza Free">
Primary cards:
- NPCMAP_ELIZA_FREE.md  (knowledge / reveals / refusal)
- CAST_ELIZA_FREE.md  (appearance / voice / portrayal)
</entity>

<entity name="Erik Rasmussen">
Primary cards:
- NPCMAP_ERIK_RASMUSSEN.md  (knowledge / reveals / refusal)
- CAST_ERIK_RASMUSSEN.md  (appearance / voice / portrayal)
</entity>

<entity name="Father Joaquin Vega">
Primary cards:
- NPCMAP_FATHER_JOAQUIN_VEGA.md  (knowledge / reveals / refusal)
- CAST_FATHER_JOAQUIN_VEGA.md  (appearance / voice / portrayal)
</entity>

<entity name="Isaac De Lima">
Primary cards:
- NPCMAP_ISAAC_DE_LIMA.md  (knowledge / reveals / refusal)
- CAST_ISAAC_DE_LIMA.md  (appearance / voice / portrayal)
</entity>

<entity name="Klaus Rasmussen">
Primary cards:
- NPCMAP_KLAUS_RASMUSSEN.md  (knowledge / reveals / refusal)
- CAST_KLAUS_RASMUSSEN.md  (appearance / voice / portrayal)
</entity>

<entity name="Kristoffer Stickjaw Holm">
Primary cards:
- NPCMAP_KRISTOFFER_STICKJAW_HOLM.md  (knowledge / reveals / refusal)
- CAST_KRISTOFFER_STICKJAW_HOLM.md  (appearance / voice / portrayal)
</entity>

<entity name="Lauritz Knudsen">
Primary cards:
- NPCMAP_LAURITZ_KNUDSEN.md  (knowledge / reveals / refusal)
- CAST_LAURITZ_KNUDSEN.md  (appearance / voice / portrayal)
</entity>

<entity name="Madre Joana">
Primary cards:
- NPCMAP_MADRE_JOANA.md  (knowledge / reveals / refusal)
- CAST_MADRE_JOANA.md  (appearance / voice / portrayal)
</entity>

<entity name="Old Hendrik">
Primary cards:
- NPCMAP_OLD_HENDRIK.md  (knowledge / reveals / refusal)
- CAST_OLD_HENDRIK.md  (appearance / voice / portrayal)
</entity>

<entity name="Petter Halvorsen">
Primary cards:
- NPCMAP_PETTER_HALVORSEN.md  (knowledge / reveals / refusal)
- CAST_PETTER_HALVORSEN.md  (appearance / voice / portrayal)
</entity>

<entity name="Sren Lind">
Primary cards:
- NPCMAP_SREN_LIND.md  (knowledge / reveals / refusal)
- CAST_SREN_LIND.md  (appearance / voice / portrayal)
</entity>

</master_rag_index>
