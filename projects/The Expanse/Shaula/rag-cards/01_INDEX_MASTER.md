# 01_INDEX_MASTER

Project-wide routing table for the XML-tagged RAG card set. Detailed per-category indexes live in `02_INDEX_*.md`; card contents live in the category-prefixed files.

<master_rag_index project="The Expanse / Shaula" version="1">

<collection name="CAST" count="12">
Per-character prose profiles: appearance, voice, relationships, routine, body language, and portrayal.
Files begin with `CAST_` unless a source module uses a more specific prefix. See `02_INDEX_CAST.md` for the per-card index.
</collection>

<collection name="EVENT" count="14">
Event and schedule cards: timed beats, triggers, daily rhythms, and scripted or atmospheric developments.
Files begin with `EVENT_` unless a source module uses a more specific prefix. See `02_INDEX_EVENTS.md` for the per-card index.
</collection>

<collection name="HIDDEN" count="9">
Narrator-only secrets and gated reveals. Retrieval is permission to reason, not permission to reveal.
Files begin with `HIDDEN_` unless a source module uses a more specific prefix. See `02_INDEX_HIDDEN.md` for the per-card index.
</collection>

<collection name="LOCATION" count="12">
Location profiles: geography, sensory details, public layout, travel constraints, hazards, and local hooks.
Files begin with `LOCATION_` unless a source module uses a more specific prefix. See `02_INDEX_LOCATIONS.md` for the per-card index.
</collection>

<collection name="NPCMAP" count="12">
Per-NPC epistemic profiles: what the character knows, refuses, recognizes, can reveal, and must not reveal yet.
Files begin with `NPCMAP_` unless a source module uses a more specific prefix. See `02_INDEX_NPCMAPS.md` for the per-card index.
</collection>

<!-- Per-entity routing: characters who have BOTH a prose card (CAST) and an epistemic card (NPCMAP). -->
<entity name="Dr. Aanya Voltaire">
Primary cards:
- NPCMAP_AANYA.md  (knowledge / reveals / refusal)
- CAST_AANYA.md  (appearance / voice / portrayal)
</entity>

<entity name="Captain Tomás Cortez">
Primary cards:
- NPCMAP_CORTEZ.md  (knowledge / reveals / refusal)
- CAST_CORTEZ.md  (appearance / voice / portrayal)
</entity>

<entity name="Cael &quot;Kit&quot; Solano">
Primary cards:
- NPCMAP_KIT.md  (knowledge / reveals / refusal)
- CAST_KIT.md  (appearance / voice / portrayal)
</entity>

<entity name="Dr. Ingrid Kyei">
Primary cards:
- NPCMAP_KYEI.md  (knowledge / reveals / refusal)
- CAST_KYEI.md  (appearance / voice / portrayal)
</entity>

<entity name="Leksi Ojara">
Primary cards:
- NPCMAP_LEKSI.md  (knowledge / reveals / refusal)
- CAST_LEKSI.md  (appearance / voice / portrayal)
</entity>

<entity name="Mari &quot;Mooch&quot; Asarat-Garai">
Primary cards:
- NPCMAP_MOOCH.md  (knowledge / reveals / refusal)
- CAST_MOOCH.md  (appearance / voice / portrayal)
</entity>

<entity name="Captain Naima Tessek">
Primary cards:
- NPCMAP_NAIMA.md  (knowledge / reveals / refusal)
- CAST_NAIMA.md  (appearance / voice / portrayal)
</entity>

<entity name="Project Shaula">
Primary cards:
- NPCMAP_OUTSIDE_GROUPS.md  (knowledge / reveals / refusal)
- CAST_OUTSIDE_GROUPS.md  (appearance / voice / portrayal)
</entity>

<entity name="Adesoji &quot;Soji&quot; Oduya">
Primary cards:
- NPCMAP_SOJI.md  (knowledge / reveals / refusal)
- CAST_SOJI.md  (appearance / voice / portrayal)
</entity>

</master_rag_index>
