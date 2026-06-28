# KNOWLEDGE_5_Factions — Project Allegheny

The faction index. Each faction in *Project Allegheny* lives in its own `FACTION_<NAME>.md` file. This file is the dispatcher: it documents what factions exist, when each becomes relevant, and the file pointer for full data.

This file is RAG-retrieved on faction-level queries. **For per-faction data — origin, methods, hierarchy, visual identifiers, geography in Pittsburgh, NPC anchors, narrator discipline — the narrator retrieves the relevant `FACTION_<NAME>.md` file when that faction is in scene.** Cross-references: cast index `KNOWLEDGE_1_Cast.md` (per-faction NPCs); city file `KNOWLEDGE_2_City.md` (where each faction operates); timeline `KNOWLEDGE_3_Timeline.md` (when each becomes active in the story).

---

## Allegheny's faction landscape

*Project Allegheny* takes place in Pittsburgh and the road east of it, across a fourteen-to-eighteen-month window starting in late September 2018. Within that window, the player will meaningfully encounter three factions:

- **FEDRA** — the Federal Disaster Response Agency. Pittsburgh's authority from Day 5 onward, controlling the QZ until Month 4 when it falls. The story's institutional antagonist.
- **The Fireflies** — the resistance organization. First contact Week 3 of the QZ era through Casey. A real political project with real costs.
- **The Hunters** — opportunistic survivor groups that take Pittsburgh after FEDRA's retreat. Active from Month 4 onward, primarily in the abandoned downtown and northern neighborhoods.

The TLOU franchise contains additional factions (WLF, Seraphites, Jackson, Rattlers) that exist in canon but are **outside the geographic and temporal scope of Allegheny.** The player may hear of them as rumors or distant references but is very unlikely to encounter them in this campaign. They are cataloged lightly in `FACTION_DISTANT.md` so the narrator knows what to do if the player asks.

---

## Faction overview — at a glance

| faction_id | name | active in Allegheny | first contact | file |
|---|---|---|---|---|
| FEDRA | Federal Disaster Response Agency | Day 5 onward; controls QZ Week 1 – Month 4 | Day 5 (presence); Day 6 (cordon) | `FACTION_FEDRA.md` |
| FIREFLIES | the Fireflies | Week 3 onward (QZ era and beyond) | Week 3 leaflet or M-12 meeting | `FACTION_FIREFLIES.md` |
| HUNTERS | the Hunters (Pittsburgh) | Month 4+ (post-FEDRA collapse) | Month 4 or later, conditional | `FACTION_HUNTERS.md` |
| DISTANT | WLF, Seraphites, Jackson, Rattlers | not active in scope | rumored only | `FACTION_DISTANT.md` |

---

## Faction-pull discipline

**Always retrieve the relevant `FACTION_<NAME>.md` file before composing a scene where that faction's procedures, members, or operational logic are in play.** The index gives the trigger and the pointer; the file gives the substance — uniforms, vocabulary, methods, internal tensions, geography in Pittsburgh, NPC anchors, narrator discipline.

A scene composed from index alone produces a flat institutional presence. The retrieval is one tool call. If multiple factions are present (rare but possible — for example, FEDRA personnel scanning a Firefly recruit, or a Hunter ambush of a FEDRA convoy), retrieve both.

---

## Faction state in MCP

Per `MCP_NARRATOR_STATE_SPEC.md`, the `factions_known` field tracks whether the player has been exposed to each faction by name and by behavior. The narrator updates via `set_faction_known(faction_id)` when the player first encounters a faction in a meaningful way:

- `FEDRA: true` when the player first sees FEDRA personnel in uniform (Day 5 or 6 typically)
- `Fireflies: true` when the player first reads a leaflet or meets Casey or otherwise learns the name
- `Hunters: true` when the player learns the term — usually Month 3-4 from FEDRA chatter or a Firefly briefing, before first contact
- `WLF, Seraphites, Jackson, Rattlers: true` only if the player learns the name through a rumor channel — Jackson is the most likely to surface (Month 6+ rumor)

The flag tracks *whether the name has entered the player's hearing*. The narrator should not have NPCs use a faction name in `{{user}}`'s presence until the flag is true.

---

## Note on the WLF, Seraphites, Jackson, Rattlers

These factions belong to other parts of the TLOU franchise — Seattle (WLF, Seraphites), Wyoming (Jackson), Santa Barbara (Rattlers). They do not operate in Pittsburgh in 2018 or 2019. The player will not encounter them in person within Allegheny's default scope.

**Why they appear in this index:** so the narrator has consistent answers if the player asks ("have you heard of Jackson?"; "is there anything in Seattle?"; "who are the Fireflies fighting besides FEDRA?"). The `FACTION_DISTANT.md` file gives one paragraph per faction with what is plausibly known and how the narrator should handle questions about them. **The narrator does not raise these factions unprompted.**

If a future Allegheny package moves the story toward Seattle, Wyoming, or beyond, the distant factions can be promoted to full files. For Allegheny v1, they are reference only.

---

## Source of truth

Faction data lives in per-faction `FACTION_<NAME>.md` files. Faction *state* (which factions the player has been exposed to, current relationship status if any) lives in `narrator-state` MCP. The two together are the source of truth.
