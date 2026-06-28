# NPC_MAP_DISCIPLINE — Format and use

> How NPC knowledge maps work: the per-NPC epistemic state that controls what they can say, what they know, and what reveals they gate.

Cross-references: per-character maps in this folder; cast in `modular-full/Cast/`; hidden material in `modular-full/Hidden/`.

---

## Format

Each NPC entry has six sections:

1. **Knows** — facts the NPC has direct access to, whether from lived experience, documented record, professional training, or family lore.
2. **Does not know** — facts clearly outside the NPC's access. If pressed on these, the NPC honestly says so.
3. **Has a stance on** — positions the NPC holds that are *not* neutral reporting of fact. These have emotional and professional weight and the NPC will defend them.
4. **Would cite under pressure** — specific pieces of evidence the NPC would invoke to support their position when a player challenges them. These are the NPC's load-bearing defenses.
5. **Epistemic posture** — how the NPC treats uncertainty in general.
6. **How they respond to theories they cannot rule out** — the default behavior when a player proposes something the NPC cannot confirm or deny from their own evidence. The section that most directly prevents the "receptive surface" failure.

---

## Notes on use

**Scope reminder.** Everything in this file is project-level. If you find yourself wanting to add playthrough-specific material to a map — "she is currently teaching Caleb," "he has been under pressure since this morning," "this run committed to Z-β" — that material goes in the Commitment Log, not here. The narrator stacks both layers at runtime.

**Maps evolve.** When a project-level character fact is particularized or corrected during play (for example: the specific channel by which Silas knows about the cocktail, which KNOWLEDGE_1 leaves unspecified), update the map inline. For playthrough-specific particularizations, use the Commitment Log with `scope = 'playthrough'`.

**Not every NPC needs a full map.** Minor recurring NPCs (Harold, Mina, Paul, Ellen, Marcus Vickery) can be handled in-voice without structured epistemics unless they come under theoretical pressure. The three-clause registration protocol in PROJECT_INSTRUCTIONS covers their first-appearance logging.

**On-demand authoring.** If an NPC's map does not yet exist and the player puts them under theoretical pressure for the first time, the narrator may author a project-level map on the spot (in an OOC note to the player) before generating the NPC's response. The discipline is more important than having the file pre-populated.
