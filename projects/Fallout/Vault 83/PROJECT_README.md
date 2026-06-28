# ❈ Vault 83 — Read Me First ❈

Same family as your Vault 49 project. Different vault. Different experiment. Different week.

Don't open the spoiler files.

---

## What's in this package

| # | File | Purpose | Spoiler? |
|---|---|---|---|
| 1 | `PROJECT_README.md` | This file. | Safe. |
| 2 | `PROJECT_INSTRUCTIONS.md` | The narrator's system prompt. Paste into the Project Instructions field. | **Heavy spoilers.** Do not read. |
| 3 | `KNOWLEDGE_1_Residents.md` | The cast. | **Heavy spoilers.** Do not read. |
| 4 | `KNOWLEDGE_2_Locations.md` | The vault's geography. | Mild — glance if curious about the setting. |
| 5 | `KNOWLEDGE_3_Events.md` | The week's scripted beats. | **Heavy spoilers.** Do not read. |
| 6 | `KNOWLEDGE_4_Hidden.md` | The deep lore. | **MAXIMUM SPOILERS. Absolutely do not read.** |
| 7 | `KNOWLEDGE_5_Anachronisms.md` | How the vault handles out-of-period references. | Safe to glance. |
| 8 | `KNOWLEDGE_6_Utility.md` | Time, scrip, map, alternate openings, tracker format. | Safe to glance. Includes the four cold-open scenes written out — skip that section if you want them to be surprises. |
| 9 | `CHARACTER_CARD_PROMPTS.md` | Image-generation prompts for the romance pool. | Mild — spoils physical descriptions but nothing plot. |
| 10 | `vault83-tracker.jsx` | The Pip-Boy tracker artifact. | Safe (the UI gives nothing away). |

---

## Setup (two minutes)

1. **Create a new Claude Project.** Call it whatever you like.
2. **Copy the full contents of `PROJECT_INSTRUCTIONS.md`** into the Project Instructions field. *(Paste blind — don't read it first.)*
3. **Upload files 3 through 9** (`KNOWLEDGE_1` through `KNOWLEDGE_6` plus `CHARACTER_CARD_PROMPTS.md`) as Project Knowledge. *(Upload blind.)*
4. **Open a new conversation in the project.** In a second tab or window, open the tracker: paste `vault83-tracker.jsx` into an artifact and run it. The tracker persists its own state, so you only need to set it up once.
5. **Say anything to begin** — `ready`, `start`, `I'm here`, describe your character, anything. The narrator will take it from there with a cold open.

---

## How to play

- **Write in first or third person — the narrator will match you.** You control your character. The narrator controls everything else.
- **Response length is tight by design.** The narrator gives you 80–150 words per turn. You drive the scene, not the narrator.
- **The Pip-Boy tracker at the end of every response tells you what changed.** Mirror those updates into the artifact as you go. The artifact is your ledger; the chat is the story.
- **Nothing comes easily.** The narrator will not volunteer the strange things. If you want to find something, look. If you want to know something, ask — and ask the right person. Some people will only open up after real time together.
- **Romance is available with multiple characters.** Same literary handling as V49: realism before romance, earned intimacy, fade-to-black as a tool rather than a default. The narrator will not push a romance you don't engage.
- **The week happens whether you engage with it or not.** Your influence is in what you do between the anchor beats, not in whether you can prevent them.
- **Four cold opens, randomly selected.** Your first message triggers one at random; if you want to force a specific one, say so in the first message (*"give me opening B," "start me on the medical one"*). Good for replay — same vault, same cast, different entry points.

---

## Playing across conversations

Claude's memory will carry some continuity between conversations in the same project, but don't rely on it. The bracketed `[Tracker]` and `[Pip-Boy]` lines at the end of every response are the canonical save state. If a conversation gets long or you want to continue in a new one, copy the latest tracker lines and paste them into the first message of the new conversation. The narrator will resume.

If you want deeper state preserved (which NPC you've been building with, what DEPTH you've reached, what items you're carrying that don't fit the inventory line), ask the narrator at the end of a session for a full `[SAVE]` line. They'll produce one.

---

## One thing worth knowing before you start

You were born in this vault. Your parents were born in this vault. Your grandparents were born in this vault. Every morning at 07:45 the hymn is sung. At 08:00 the Address is read. At 17:30 the Call goes out.

The gold pins, the silver, the blue, the copper.

You wear no pin. The Liaisons carry the messages.

That is how the world works. It has always worked this way.

It's Monday. A sealed envelope is in your hand. Breakfast is porridge. Your mother pressed your collar.

---

*Ascent is American.*

Enjoy the week.

*— Built for you at your request. Different vault, same trust.*
