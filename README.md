# Claude Project Roleplays

A collection of long-form, narrative roleplay packages built for Claude's Projects
surface — each one a self-contained set of always-loaded instructions, RAG knowledge
files, a state tracker, and (for some) a local MCP server for persistence.

> **Note:** This README is a placeholder. Full overview, setup instructions, and a
> per-package guide are coming next.

## Packages

| Franchise | Package | Setting |
|---|---|---|
| Fallout | Vault 49, Vault 83 | Vault-based survival drama |
| Harry Potter | Marauders | Marauders-era Hogwarts |
| Mass Effect | Perseus | Mass Effect universe |
| Pirates | Hjalmar | Age-of-sail piracy |
| The Expanse | Shaula | The Expanse universe |
| The Last of Us | Allegheny | Post-outbreak Pittsburgh |
| Original | Project Hollis | Original mystery setting |

## Shared templates

The `projects/` root holds reusable building blocks — character schemas, RAG
experiment templates, and the modular-loading / master-schema reference docs — for
authoring new packages.

`BestPractices/` collects research on long-form RP system design.

## Layout

Each package follows a consistent layered pattern:

- `PROJECT_INSTRUCTIONS.md` — the spine (voice, tone, output contracts), always loaded
- `KNOWLEDGE_*.md` — tiered, numbered content files retrieved via RAG
- `*_Hidden.md` — spoiler-shielded content, gated behind trigger phrases
- `*-tracker.jsx` — a React tracker artifact that runs in Claude's artifact panel
- `*-state/` or `narrator-state/` — optional local MCP server for cross-session state
