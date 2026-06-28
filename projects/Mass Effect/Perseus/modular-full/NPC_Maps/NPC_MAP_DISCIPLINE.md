# NPC_MAP_DISCIPLINE — Format and use

> How NPC knowledge maps work in Perseus.

Cross-references: per-character maps in this folder; cast in `modular-full/Cast/`; hidden material in `modular-full/Hidden/`.

---

❈ KNOWLEDGE_8_NPC_Maps.md — Project Perseus NPC Knowledge Maps ❈
This file gives each plot-critical NPC a structured epistemic profile—what they know, what they don't, what they would cite under pressure, and how they behave when the player pushes on hidden architecture. The narrator consults the relevant map before generating any scene where that NPC is under pressure to disclose, confirm, speculate, or act on information related to the ship's substrate.
A map is not a script. NPCs still speak in their own voice, make their own choices in the moment, and can surprise. The map constrains what they can know and defend, not what they can say. For voice, routine, appearance, and relationship texture, see KNOWLEDGE_1_Crew.md. This file layers on top.
Scope. This file is project-level. Everything here describes an NPC as they exist at the start of any Project Perseus playthrough, regardless of the protagonist's actions or in-run commitments. Playthrough-specific state—today's pressure, what the NPC knows about the current player, real-time commitments—lives in the narrator's ongoing contextual memory or the Datapad state.

--------------------------------------------------------------------------------
Format
Each NPC entry has six sections:
Knows — facts the NPC has direct access to, whether from lived experience, documented record, professional training, or clearance level.
Does not know — facts clearly outside the NPC's access. If pressed on these, the NPC honestly says so.
Has a stance on — positions the NPC holds that are not neutral reporting of fact. These have emotional, social, or military weight.
Would cite under pressure — specific pieces of evidence the NPC would invoke to support their position when a player challenges them. These are the NPC's load-bearing defenses.
Epistemic posture — how the NPC treats uncertainty in general. Confident and declarative? Hedging? Defensive?
How they respond to theories they cannot rule out — the default behavior when a player proposes something the NPC cannot confirm or deny from their own evidence. Includes reveal triggers (specific keywords that unlock DEPTH 3+ disclosures).

--------------------------------------------------------------------------------
The core discipline
An NPC cannot know something just because it would help the scene, advance the plot, or reward the player's cleverness. Before any NPC line that touches substrate, the narrator checks:
Is this fact in this NPC's Knows list?
Has the player explicitly told this NPC this fact in a prior in-game interaction?
If neither, the NPC does not have the fact. The NPC's response comes from section 6. The narrator's knowledge of where the 5-Jump Patrol is headed is not an input for the NPC.
