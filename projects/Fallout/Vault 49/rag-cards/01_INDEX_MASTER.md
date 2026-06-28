# 01_INDEX_MASTER

Project-wide routing table for the XML-tagged RAG card set. Detailed per-category indexes live in `02_INDEX_*.md`; card contents live in the category-prefixed files.

<master_rag_index project="Fallout / Vault 49" version="1">

<collection name="CAST" count="20">
Per-character prose profiles: appearance, voice, relationships, routine, body language, and portrayal.
Files begin with `CAST_` unless a source module uses a more specific prefix. See `02_INDEX_CAST.md` for the per-card index.
</collection>

<collection name="EVENT" count="8">
Event and schedule cards: timed beats, triggers, daily rhythms, and scripted or atmospheric developments.
Files begin with `EVENT_` unless a source module uses a more specific prefix. See `02_INDEX_EVENTS.md` for the per-card index.
</collection>

<collection name="HIDDEN" count="9">
Narrator-only secrets and gated reveals. Retrieval is permission to reason, not permission to reveal.
Files begin with `HIDDEN_` unless a source module uses a more specific prefix. See `02_INDEX_HIDDEN.md` for the per-card index.
</collection>

<collection name="NPCMAP" count="16">
Per-NPC epistemic profiles: what the character knows, refuses, recognizes, can reveal, and must not reveal yet.
Files begin with `NPCMAP_` unless a source module uses a more specific prefix. See `02_INDEX_NPCMAPS.md` for the per-card index.
</collection>

<!-- Per-entity routing: characters who have BOTH a prose card (CAST) and an epistemic card (NPCMAP). -->
<entity name="Ada Tiss">
Primary cards:
- NPCMAP_ADA.md  (knowledge / reveals / refusal)
- CAST_ADA.md  (appearance / voice / portrayal)
</entity>

<entity name="Dr. Cass Holloway">
Primary cards:
- NPCMAP_CASS.md  (knowledge / reveals / refusal)
- CAST_CASS.md  (appearance / voice / portrayal)
</entity>

<entity name="Chief Counter Eben Oleander">
Primary cards:
- NPCMAP_EBEN.md  (knowledge / reveals / refusal)
- CAST_EBEN.md  (appearance / voice / portrayal)
</entity>

<entity name="Harker Wolfe">
Primary cards:
- NPCMAP_HARKER.md  (knowledge / reveals / refusal)
- CAST_HARKER.md  (appearance / voice / portrayal)
</entity>

<entity name="&quot;Mother&quot; Ilse Vogt">
Primary cards:
- NPCMAP_ILSE.md  (knowledge / reveals / refusal)
- CAST_ILSE.md  (appearance / voice / portrayal)
</entity>

<entity name="Speaker Margit Dailey">
Primary cards:
- NPCMAP_MARGIT.md  (knowledge / reveals / refusal)
- CAST_MARGIT.md  (appearance / voice / portrayal)
</entity>

<entity name="Mercy Quint">
Primary cards:
- NPCMAP_MERCY.md  (knowledge / reveals / refusal)
- CAST_MERCY.md  (appearance / voice / portrayal)
</entity>

<entity name="Nia Esperanza">
Primary cards:
- NPCMAP_NIA.md  (knowledge / reveals / refusal)
- CAST_NIA.md  (appearance / voice / portrayal)
</entity>

<entity name="Marguerite &quot;Peg&quot; Unsworth">
Primary cards:
- NPCMAP_PEG.md  (knowledge / reveals / refusal)
- CAST_PEG.md  (appearance / voice / portrayal)
</entity>

<entity name="Junior Counter Perrin">
Primary cards:
- NPCMAP_PERRIN.md  (knowledge / reveals / refusal)
- CAST_PERRIN.md  (appearance / voice / portrayal)
</entity>

<entity name="&quot;Old Roy&quot; Vickers">
Primary cards:
- NPCMAP_ROY.md  (knowledge / reveals / refusal)
- CAST_ROY.md  (appearance / voice / portrayal)
</entity>

<entity name="Ruth Zhang-McCann">
Primary cards:
- NPCMAP_RUTH.md  (knowledge / reveals / refusal)
- CAST_RUTH.md  (appearance / voice / portrayal)
</entity>

<entity name="Silas Mott">
Primary cards:
- NPCMAP_SILAS.md  (knowledge / reveals / refusal)
- CAST_SILAS.md  (appearance / voice / portrayal)
</entity>

</master_rag_index>
