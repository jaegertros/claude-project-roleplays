# Vault 83 XML-MD Upload Set

This package contains the core project-control and index files needed to run Vault 83 with individual Claude/RAG uploads.

## Upload order

1. `00_PROJECT_RUNTIME.md` — pin this if possible. It is the compact runtime contract.
2. `00_PROJECT_REFERENCE.md` — full XML-MD reference copy of the original project instructions.
3. `01_INDEX_MASTER.md` — top-level routing index.
4. `02_INDEX_*.md` files — category-specific routing indexes.
5. Split lore cards: `NPCMAP_*.md`, `CAST_*.md`, `EVENT_*.md`, `HIDDEN_*.md`, `LOCATION_*.md`, `UTILITY_*.md`, `ANACHRONISM_*.md`.

## File strategy

Use `.md` files with XML-style tags inside. Do not use strict `.xml` unless you want to maintain valid XML forever.

## Do not upload redundant broad files

After you split the lore into individual cards, avoid uploading old broad files like `KNOWLEDGE_1_Residents.md`, `KNOWLEDGE_3_Events.md`, or `KNOWLEDGE_4_Hidden.md` alongside the split cards. They will compete with the smaller cards and increase blending.

## Runtime vs reference

- `00_PROJECT_RUNTIME.md` is short and operational. Claude should obey it every turn.
- `00_PROJECT_REFERENCE.md` preserves the original instruction text with semantic tags for lookup.
- Index files are routing tools, not lore sources.

## What still needs split card creation

This package creates the control/index layer from `00_PROJECT_INSTRUCTIONS.md`. To fully populate the vault, convert the actual lore files into split cards using the naming scheme in the indexes:
- `NPCMAP_*.md`
- `CAST_*.md`
- `EVENT_*.md`
- `HIDDEN_*.md`
- `LOCATION_*.md`
- `UTILITY_*.md`
- `ANACHRONISM_*.md`
