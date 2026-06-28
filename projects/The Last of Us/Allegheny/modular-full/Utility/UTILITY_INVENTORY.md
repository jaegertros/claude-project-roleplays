# UTILITY_INVENTORY — Inventory tracking discipline

How the narrator tracks what `{{user}}` carries through the MCP — what matters, what stays as texture, and the discipline against bloat.

Cross-references: monolithic source `KNOWLEDGE_9_Utility.md`; MCP spec `MCP_NARRATOR_STATE_SPEC.md`; related Cast / Missions / Hidden in `modular-full/`.

---

# §1. Inventory tracking discipline

The narrator tracks inventory through the MCP `add_inventory`, `remove_inventory`, and `update_inventory_item` tools. The principle: **track what matters; let the rest be texture.**

## What to track

- **Weapons** — guns, knives, blunt instruments. Every weapon `{{user}}` carries should be tracked: type, condition, ammunition for guns. Weapons are *load-bearing for combat scenes* and should not be ambiguous.
- **Ammunition** — by weapon type. *Specific magazine counts*, not approximate. "Two magazines for the 9mm" is a real fact about a real scene.
- **Medical supplies** — antibiotics, painkillers, bandages, suture kits, water-purification tablets. Each is countable; each runs out.
- **Specific consumables that matter** — bottles of water by count, ration bars by count, fuel by liters or quarter-tank, batteries by count.
- **Trade goods** — anything `{{user}}` is carrying with explicit intent to trade. The barter market does not work on hand-waved value.
- **Plot-load-bearing items** — the duffel from Victor, Maya's list, Ray's notebook (if `{{user}}` carries it), Erin's medical kit (if she gives him one).
- **Companions present** — tracked separately per MCP cast state but should be reflected in inventory-line decisions (more bodies = more stuff possible to carry, more stuff necessary to carry).

## What to keep as texture

- *Clothes the player is wearing.* Track them once when acquired (Victor's old jacket, the wool sweater scavenged in Bloomfield); don't re-enumerate every scene.
- *The phone.* Tracked when relevant (battery, signal); fades into texture after Day 5 when it's dead and useless.
- *Small generic items.* A pen, a piece of paper, a lighter — let these be present without being a tracker line. If they become relevant (the pen runs out, the lighter dies), the narrator can surface them in the moment.
- *Food and water below the consumable threshold.* `{{user}}` does not need to track every cracker. The narrator tracks *days of food remaining*, not crackers.

## The discipline against bloat

A tracker that lists thirty items is *useless* — the player and the narrator stop reading it. The tracker should usually list **eight to twelve items**. If it grows past that, the narrator should be consolidating: "rations (3 days)" not "5 cans soup, 8 ration bars, 2 packs crackers." The granularity is the player's narrative experience, not a spreadsheet.

When items become irrelevant, **the narrator should drop them from active tracking.** A first-aid kit `{{user}}` has been carrying for two months without using is still in the pack but does not need to be on every tracker line. The narrator can reintroduce it when it becomes relevant.

## When to log_injury vs. when to track meds

The MCP `log_injury` system handles wounds. The `add_inventory` system handles supplies. They interact:

- A wound is logged via `log_injury` and persists in the character's state
- The medical supplies used to treat it are *consumed* via `remove_inventory`
- The wound heals (or not) per its severity and treatment
- The narrator can `update_injury_treatment` when meds are applied

The narrator does **not** track every aspirin. Meds matter when:
- They are *scarce* and being managed
- They are *specific* and the character has been saving them
- They have *side effects* that matter (the painkillers Erin is rationing knock the user out for four hours)
