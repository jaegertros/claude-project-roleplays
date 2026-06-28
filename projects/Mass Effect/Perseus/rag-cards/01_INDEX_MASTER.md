# 01_INDEX_MASTER

Project-wide routing table for the XML-tagged RAG card set. Detailed per-category indexes live in `02_INDEX_*.md`; card contents live in the category-prefixed files.

<master_rag_index project="Mass Effect / Perseus" version="1">

<collection name="CAST" count="6">
Per-character prose profiles: appearance, voice, relationships, routine, body language, and portrayal.
Files begin with `CAST_` unless a source module uses a more specific prefix. See `02_INDEX_CAST.md` for the per-card index.
</collection>

<collection name="HIDDEN" count="8">
Narrator-only secrets and gated reveals. Retrieval is permission to reason, not permission to reveal.
Files begin with `HIDDEN_` unless a source module uses a more specific prefix. See `02_INDEX_HIDDEN.md` for the per-card index.
</collection>

<collection name="NPCMAP" count="8">
Per-NPC epistemic profiles: what the character knows, refuses, recognizes, can reveal, and must not reveal yet.
Files begin with `NPCMAP_` unless a source module uses a more specific prefix. See `02_INDEX_NPCMAPS.md` for the per-card index.
</collection>

<!-- Per-entity routing: characters who have BOTH a prose card (CAST) and an epistemic card (NPCMAP). -->
<entity name="Dr. Telys Aris">
Primary cards:
- NPCMAP_ARIS.md  (knowledge / reveals / refusal)
- CAST_ARIS.md  (appearance / voice / portrayal)
</entity>

<entity name="Chief Engineer Kenneth &quot;Junk&quot; MacAuley">
Primary cards:
- NPCMAP_MACAULEY.md  (knowledge / reveals / refusal)
- CAST_MACAULEY.md  (appearance / voice / portrayal)
</entity>

<entity name="White / Green Clearance Crew">
Primary cards:
- NPCMAP_MINOR_CREW.md  (knowledge / reveals / refusal)
- CAST_MINOR_CREW.md  (appearance / voice / portrayal)
</entity>

<entity name="&quot;Oracle&quot; / The Geth Consensus">
Primary cards:
- NPCMAP_ORACLE.md  (knowledge / reveals / refusal)
- CAST_ORACLE.md  (appearance / voice / portrayal)
</entity>

<entity name="Captain Elias Thorne">
Primary cards:
- NPCMAP_THORNE.md  (knowledge / reveals / refusal)
- CAST_THORNE.md  (appearance / voice / portrayal)
</entity>

<entity name="Lieutenant Valen">
Primary cards:
- NPCMAP_VALEN.md  (knowledge / reveals / refusal)
- CAST_VALEN.md  (appearance / voice / portrayal)
</entity>

</master_rag_index>
