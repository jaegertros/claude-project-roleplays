# Shaula TLOU-Style Reorganization Package

This package reorganizes the uploaded Shaula `KNOWLEDGE_1_Residents.md` and `PROJECT_INSTRUCTIONS.md` into a layout closer to the Project Allegheny / Last-of-Us-style files.

## What changed

- The monolithic residents file is replaced by `KNOWLEDGE_1_Cast.md` as a dispatcher.
- Major NPCs now have individual `CAST_<NAME>.md` files.
- Outside social groups live in `CAST_OUTSIDE_GROUPS.md`.
- Low-resolution support/dead names live in `CAST_SUPPORTING_AND_DEAD.md`.
- `PROJECT_INSTRUCTIONS.md` now points to this split layout and adds a cast-file retrieval discipline.
- `CHARACTER_SCHEMA_Shaula_v1_0.md` defines the Shaula-specific cast schema.

## Suggested Claude Project upload order

1. `PROJECT_INSTRUCTIONS.md` into Project Instructions / always-loaded slot.
2. `CHARACTER_SCHEMA_Shaula_v1_0.md` as reference knowledge.
3. `KNOWLEDGE_1_Cast.md` as the cast index.
4. All `CAST_*.md` files as project knowledge.
5. Keep your existing `KNOWLEDGE_2` through `KNOWLEDGE_8` files as-is.

## Important note

I preserved the original character substance where possible, then reorganized it into schema fields. Some `core_want`, `core_fear`, state, and arc-skeleton fields are inferred from the original profiles rather than copied verbatim.
