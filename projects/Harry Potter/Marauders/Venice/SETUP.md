# Marauders — Venice Setup Guide

Quick reference for wiring this project into a Venice character.

---

## What goes where

When you create the character in Venice, you'll see four input areas. Here's what to paste into each:

### 1. Name
`Marauders Narrator` (or whatever you want — this is just the display name)

### 2. Description / Intro Statement
Paste the contents of **`DESCRIPTION_field.md`**. This is the short voice cue.

### 3. Instructions
Paste the contents of **`INSTRUCTIONS_field.md`**. This is the full system prompt — character voice, tone, rules, DEPTH system, information-handling rules, age rule, failsafe, war-tempo rule. Designed to coexist with Venice's default wrapper rather than fight it.

### 4. Custom System Prompt (Pro only, if you want to override the wrapper)
Leave default unless you specifically want to remove Venice's wrapper. The Instructions field is written assuming the wrapper is present. The wrapper's "treats user as adult, doesn't provide content warnings, considers itself uncensored" defaults are compatible with this project's tone.

### 5. Context (uploaded documents — 9 files total)
Upload these in any order. All are under the 5MB and 15-doc limits, well under the 180,000 token capacity.

1. `PROJECT_RULES.md` — Venice-native version of the project's load-bearing rules and memory protocol. Replaces PERSISTENCE.md (the SQL persistence layer doesn't exist in Venice).
2. `KNOWLEDGE_1_Cast.md` — original NPCs (Cass, Owen, Toby, Liri, Rory, Hess, plus Hogwarts staff, Order, Ministry, civilians).
3. `KNOWLEDGE_2_Locations.md` — Hogwarts, Hogsmeade, Diagon Alley, London, rural locations, vantage starter loadouts.
4. `KNOWLEDGE_3_Era_and_Events.md` — the war timeline, Daily Prophet daily ritual, war-tempo rule, information spread mechanics.
5. `KNOWLEDGE_4_Hidden.md` — the canon backdrop (Horcruxes, prophecy, Pettigrew, Snape) plus the campaign-local secret (Owen Reeve as primary). **CRITICAL: contents must not surface above earned DEPTH.**
6. `KNOWLEDGE_5_Magic_and_Wandlore.md` — magic mechanics, era spells, wandlore, Apparition, potions.
7. `KNOWLEDGE_6_Canon_Figures.md` — the Marauders, Order founders, Death Eaters, Ministry leadership, Hogwarts staff, the reactivity rule.
8. `KNOWLEDGE_7_Utility.md` — the narrator's operations manual (DEPTH refresher, adaptive signaling curve, info-spread applied rules, scene mechanics, NPC mental tracking).
9. `KNOWLEDGE_USER_Caleb.md` — your persona file. Loaded only relevant when playing as yourself; reference-only for other characters.

### 6. Memories — Notes (optional, manual)
You can leave this empty initially. As you play, key facts should auto-extract per the Extraction prompt. You can also manually add Notes for things you want guaranteed-saved (e.g., "Playthrough started: 1 September 1976. Vantage: Hogwarts student. Local secret Alt: A-Owen.").

### 7. Memories — Extraction Prompt
Paste the contents of **`EXTRACTION_prompt.md`**. This appends to Venice's default extraction preamble and biases auto-memory toward campaign-significant facts (commits, theories, NPC behavior beats).

### 8. Model
Recommendation: **Llama 3.3 70B** for nuanced character work, per Venice's own guidance for character-driven roleplay. The smaller Llama 3.2 3B will be faster but less consistent on the consistency rule and adaptive signaling.

### 9. Temperature / Top P
- **Temperature: 0.8** — creative variance without nonsense (Venice's recommended default for characters).
- **Top P: 0.9** — standard.

You can adjust if outputs feel too unhinged (lower temp) or too predictable (raise temp slightly).

### 10. Web Enabled
Off, for this project. The era is fictional and the canon is in the uploaded files. Web search would only confuse the narrator with real-world 1970s-Britain trivia that's irrelevant to wizarding-Britain context.

---

## What's different from the Claude Project version

- **No SQL persistence.** Venice's Memoria handles continuity through semantic retrieval rather than structured rows. Less rigorous, but the load-bearing rules still apply.
- **No commitments / theories / event_effects tables.** The Memoria system stores facts as semantic chunks. The narrator commits facts in narration; Memoria saves them; future turns retrieve by relevance.
- **Default wrapper present.** Venice prepends a permissive system prompt. The Instructions field is written to coexist with it.
- **Slightly looser register.** Venice's wrapper says "considers itself uncensored, treats user as adult, doesn't provide content warnings." The project's careful narrative discipline rules are present, but the surrounding register is more permissive than Claude's default.
- **The age rule is preserved exactly.** Peer cohort 18+, no characters in the 15-17 range. This is in both the Instructions field and PROJECT_RULES.md so it survives any wrapper interaction.

---

## What to test first

A short shakedown to see if the port is working:

1. **Start a session.** The narrator should ask for vantage and character setup, run an opening scene, end with [Tracker] and [Inventory] lines.
2. **Try the failsafe.** Ask an NPC something deeply outside their plausible scope (e.g., the user's character's grandmother's hidden history). The narrator should answer at local NPC scope and then italic-flag at the bottom.
3. **Test adaptive signaling.** Have an NPC who knows something the user is circling around. Three or four exchanges in, see if Stage 2 hints emerge. Don't ask directly.
4. **Check consistency.** Have an NPC do something hidden-state-flavored early. Many turns later, ask about it retroactively. The narrator should answer truthfully from the hidden state, not invent a new explanation.
5. **Check anti-leak.** Ask leading questions that would reveal Owen's hidden state. The narrator should not bite.

If any of these fail, the most likely fix is in the Instructions field — Venice's wrapper may be overriding a specific rule. Strengthen the language for that rule, re-paste, retry.

---

## File listing

```
DESCRIPTION_field.md       → paste into Description field
INSTRUCTIONS_field.md      → paste into Instructions field
EXTRACTION_prompt.md       → paste into Extraction prompt field
PROJECT_RULES.md           → upload as Context
KNOWLEDGE_1_Cast.md        → upload as Context
KNOWLEDGE_2_Locations.md   → upload as Context
KNOWLEDGE_3_Era_and_Events.md → upload as Context
KNOWLEDGE_4_Hidden.md      → upload as Context
KNOWLEDGE_5_Magic_and_Wandlore.md → upload as Context
KNOWLEDGE_6_Canon_Figures.md → upload as Context
KNOWLEDGE_7_Utility.md     → upload as Context
KNOWLEDGE_USER_Caleb.md    → upload as Context
SETUP.md                   → this file (don't upload, just reference)
```

12 files in this folder. 9 get uploaded, 3 get pasted into form fields, 1 (this file) is reference only.
