<rag_card id="npc.discipline.epistemic" type="npc_epistemic_profile" entity="Format, core discipline, and use" spoiler_level="mixed" visibility="retrieve_when_relevant">
<card_meta>
<canonical_name>Format, core discipline, and use</canonical_name>
<project>Fallout / Vault 83</project>
<source_file>modular-full/NPC_Maps/NPC_MAP_DISCIPLINE.md</source_file>
<aliases>Format, core discipline, and use, Discipline, NPC MAP DISCIPLINE</aliases>
<retrieval_keywords>Fallout / Vault 83, NPC_Maps, Format, core discipline, and use, Discipline, NPC MAP DISCIPLINE, NPC_MAP_DISCIPLINE — Format, core discipline, and use, Format, The core discipline, Notes on use</retrieval_keywords>
<related_cards>project.fallout_vault_83, category.npcmap, cast.discipline.prose</related_cards>
</card_meta>

<retrieval_contract>
<use_when>Use this card when the NPC's knowledge, ignorance, recognition triggers, reveal gates, refusals, or epistemic boundaries matter.</use_when>
<do_not_use_when>Do not treat retrieval as permission to reveal secrets. Use the card to control what the NPC can plausibly say or withhold.</do_not_use_when>
<leak_discipline>Apply this card to maintain consistency. Surface only what the player can observe, infer, or has earned through play; keep structural and spoiler knowledge behind the curtain.</leak_discipline>
<player_visible>Only behavior, dialogue, hesitation, recognition cues, and information the player has earned should surface in narration.</player_visible>
<narrator_only>Knowledge limits, reveal thresholds, and private truth tables remain behind the curtain until scene logic earns them.</narrator_only>
</retrieval_contract>

<epistemic_content>
# NPC_MAP_DISCIPLINE — Format, core discipline, and use

> How NPC knowledge maps work: the per-NPC epistemic state that controls what they can say, what they know, and what reveals they gate.

Cross-references: per-character maps in this folder; cast in `modular-full/Cast/`; hidden material in `modular-full/Hidden/`.

---

## Format

Each NPC entry has six sections:

1. **Knows** — facts the NPC has direct access to, whether from lived experience, documented record, professional training, or family lore.
2. **Does not know** — facts clearly outside the NPC's access. If pressed on these, the NPC honestly says so.
3. **Has a stance on** — positions the NPC holds that are *not* neutral reporting of fact. These have emotional, social, or professional weight and the NPC will defend them.
4. **Would cite under pressure** — specific pieces of evidence the NPC would invoke to support their position when a player challenges them. These are the NPC's load-bearing defenses.
5. **Epistemic posture** — how the NPC treats uncertainty in general. Confident and declarative? Hedging and probabilistic? Deferent to authority? Self-aware of bias?
6. **How they respond to theories they cannot rule out** — the default behavior when a player proposes something the NPC cannot confirm or deny from their own evidence. This section most directly prevents the "receptive surface" failure — the narrator's instinct to let an NPC warm toward a theory because the narrator knows the theory is correct.

---

## The core discipline

An NPC cannot know something just because it would help the scene, advance the plot, or reward the player's cleverness. Before any NPC line that touches substrate, the narrator checks:

- Is this fact in this NPC's **Knows** list?
- Has the player **explicitly told** this NPC this fact in a prior in-game interaction (logged in the Commitment Log or visible in the current conversation)?

If neither, the NPC does not have the fact. The NPC's response comes from section 6 — how they handle a theory they cannot confirm or deny. Not from the substrate itself.

The test: *could this character have said this line if the user had approached them cold, knowing only what this map says they know?* If no, cut or rewrite.

---

## Notes on use

- **Maps evolve.** When the narrator makes a commit that changes an NPC's stance or adds to what they know, the change is logged in the Commitment Log (Supabase) for playthrough-specific updates. Durable project-level changes — corrections or refinements that would apply across all future playthroughs — are made inline in this file by editing the relevant section.
- **Not every resident needs a full map.** The ~15 mapped here are the ones who have been load-bearing in prior playthroughs or are structurally positioned to come under pressure. Minor residents can be handled in-voice without structured epistemics unless they escalate.
- **If a player puts an unmapped NPC under theoretical pressure for the first time, the narrator authors a map on the spot** (in an OOC note or silently) before generating the response. The discipline is more important than having the file pre-populated. The six-section format is the discipline.
- **The narrator does not show the player this file.** The maps are the narrator's working substrate. Players experience them only as consistent, bounded NPC behavior.
</epistemic_content>
</rag_card>
