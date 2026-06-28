# NPC_MAP_DISCIPLINE — What this file is, core discipline, reveal triggers, reminders

> How NPC knowledge maps work in Shaula: the per-NPC epistemic state that controls what they can say, what they know, and what reveals they gate.

Cross-references: per-character maps in this folder; cast in `modular-full/Cast/`; hidden substrate in `modular-full/Hidden/`.

---

## What this file is and is not

This file is the project's epistemic discipline. Every plot-critical NPC's knowledge is bounded here. The narrator does not freelance past the boundaries — not for pacing, not for warmth, not for narrative convenience.

Per template Section 1.4: each NPC gets six sections.

1. **Knows** — facts the NPC has direct access to, from lived experience, documented record, professional training, or family lore.
2. **Does not know** — facts clearly outside the NPC's access. If pressed, the NPC honestly says so.
3. **Has a stance on** — positions the NPC holds that are not neutral reporting of fact. Defended.
4. **Would cite under pressure** — specific evidence the NPC invokes when challenged. Their load-bearing defenses.
5. **Epistemic posture** — how they treat uncertainty in general.
6. **How they respond to theories they cannot rule out** — default behavior when the player proposes something they cannot confirm or deny. Includes reveal triggers (specific keywords for DEPTH 3+) and what the NPC does NOT do.

---

## Core discipline — the three-source check

Before any NPC speaks or acts, the narrator checks three sources:

1. The NPC's map below (and the flavor profile in KNOWLEDGE_1).
2. What the user has explicitly told that NPC in the current conversation.
3. The Commitment Log in Supabase — facts the fiction has committed in earlier sessions.

If a fact is not in any of those three places, the NPC does not know it. Default to the more restricted reading. The test, after drafting any NPC line: *could this character have said this if the user had approached them cold, knowing only what their map says they know plus what's in the Commitment Log?* If no, cut or rewrite.

---

## What a reveal trigger is NOT

- Rapport.
- Accumulated interaction time.
- The player being clever.
- The player being kind.
- The player being in distress.

A reveal trigger is **specific content** in the player's dialogue. If the player says those words, the door opens. If not, it stays closed.

---

## Discipline reminders

- Three-source check before every NPC speaks. Map + user-told + Commitment Log. Default to the more restricted reading.
- Reveal triggers are specific keywords. Rapport, kindness, distress do not unlock them.
- Section 6 ("How they respond to theories they cannot rule out") is the one that prevents NPCs from warming to correct theories because the narrator knows they are correct. Honor it.
- *"Does not know"* lists are explicit. The narrator does not freelance past them.
- The crew is younger and less experienced than the seed coalition. Their maps show this — Naima's is the largest of the crew (she has the Halverson run); Leksi's is wider in operational detail but narrower in substrate; Aanya's is deepest in the lane the protagonist shares with her; Kit's is sealed past her domain.
- Soji and Kyei are the two NPCs whose late-game reveal is most painful. They cost the protagonist something to push past their refusals. Honor that.
- Mooch will not be a friend. She will be candid. The distinction matters.
- The narrator does not invent reveal triggers. If the player has not said the words, the door does not open.

That is the discipline.
