# KNOWLEDGE_6_Missions — Project Allegheny

The mission deck index. Each mission in *Project Allegheny* lives in its own file. This file is the dispatcher: it lists every mission with its trigger conditions and file pointer, and documents the mission-pull protocol.

This file is RAG-retrieved on mission-related queries (date anchors, trigger phrases, mission IDs). Cross-references: the timeline (`KNOWLEDGE_3_Timeline.md`) for when each mission's anchor falls in the world's clock; the cast file (`KNOWLEDGE_1_Cast.md`) for who participates; the city file (`KNOWLEDGE_2_City.md`) for where; the hidden file (`KNOWLEDGE_7_Hidden.md`) for what the narrator knows but the player must discover.

---

## How missions work

A mission **triggers** based on one or more of:
- **Time** — a specific date and/or time of day in the story's clock
- **Location** — the player enters a specific place
- **Condition** — an NPC's relationship state, a flag, a mission's outcome
- **Player choice** — the player commits to an action that opens the mission

When a mission's trigger conditions match the current state, the narrator:

1. **Retrieves the mission's individual file** from the project (via project_knowledge_search using the filename or mission ID). Do not improvise from this index alone — the per-mission file contains the full premise, beats, exits, hidden material, and craft notes.
2. **Calls `start_mission(mission_id)` via MCP** to register the mission as active.
3. **Runs the scene** per the mission file's contents — premise, spectacle, present NPCs, beats.
4. **Calls `complete_mission(mission_id, outcome)` via MCP** when an exit condition is met.

The narrator does not run a mission's beats in a checklist. The beats are *what could happen*, not *what must.* The player drives. The mission file is the frame; the player is the brush.

## The mission-pull discipline

**Always retrieve the file before composing the scene.** This index gives the trigger and the pointer; the file gives the texture. A scene composed from index alone is missing the spectacle, the hidden, the craft notes, the leaves-behind. The retrieval is one tool call and it is worth it.

When the player's actions might fire one of several missions, the narrator retrieves the most likely candidate first. If the situation has clearly moved past that candidate (the player went elsewhere, the conditions no longer match), the narrator can retrieve another candidate. The narrator does not retrieve all missions speculatively.

If no mission's trigger conditions are matching the current scene, **the narrator improvises freely.** Most of the time between mission anchors is improvisation — the QZ has dozens of mornings between M-11 and M-12; the road has weeks of travel between M-14 and M-15. The mission deck is the spine of the plot, not a railroad.

## Mortality-eligible missions

Certain mission cards are flagged **MORTALITY-ELIGIBLE** — scenes where a named character may die. The narrator selects the casualty based on relationship state at the time the mission fires, never randomly, never to the player's primary romance interest unless explicitly built to. The flag *permits* a death; it does not require one. A mortality-eligible mission can resolve without a death if the player has built protective conditions.

---

## The mission deck — at a glance

### OUTBREAK WEEK (Days 1–7)

| ID | Title | Trigger | File |
|---|---|---|---|
| M-01 | Saturday, the Rest of the Day | After opening A/B; skipped for opening C | `MISSION_M01_Saturday_The_Rest.md` |
| M-02 | Saturday Dinner | Day 1, ~7 PM | `MISSION_M02_Saturday_Dinner.md` |
| M-03 | Sunday, Slow | Day 2 morning | `MISSION_M03_Sunday_Slow.md` |
| M-04 | Sunday Night, the First Real Crack | Day 2 evening | `MISSION_M04_Sunday_Night_Crack.md` |
| M-05 | Outbreak Morning | Day 3 morning | `MISSION_M05_Outbreak_Morning.md` |
| M-06 | The Hospital Run | Day 3 midday, conditional | `MISSION_M06_Hospital_Run.md` |
| M-06b | The Apartment Lockdown | Day 3 midday, alternative to M-06 | `MISSION_M06b_Apartment_Lockdown.md` |
| M-07 | The Highway | Day 4 | `MISSION_M07_The_Highway.md` |
| M-08 | The Old Neighbor's Garage | Day 5 | `MISSION_M08_Old_Neighbors_Garage.md` |
| M-09 | The Cordon | Day 6 | `MISSION_M09_The_Cordon.md` |
| M-10 | The Sweep | Day 7 — **MORTALITY-ELIGIBLE** | `MISSION_M10_The_Sweep.md` |

### POST-OUTBREAK (Week 2 onward)

| ID | Title | Trigger | File |
|---|---|---|---|
| M-11 | Inside the Wire | Week 2 | `MISSION_M11_Inside_The_Wire.md` |
| M-12 | The Pamphlet | Week 3 | `MISSION_M12_The_Pamphlet.md` |
| M-13 | The Smuggler's Job | Week 4 or Month 2 — **MORTALITY-ELIGIBLE** | `MISSION_M13_Smugglers_Job.md` |
| M-14 | The Long Winter | Month 4–6 — **MORTALITY-ELIGIBLE** (consolidating arc) | `MISSION_M14_The_Long_Winter.md` |
| M-15 | The Road | Year 1+ | `MISSION_M15_The_Road.md` |

After M-15, the deck is open-ended. The narrator improvises within the established mood and character arc skeletons. New missions can be added as files mature and the story finds them.

---

## Mission card format (reference)

For when the narrator opens a mission file, the format is:

```
## M-XX: <Title>

ACT: <when in the story>
TRIGGER: <what fires this>
ANCHOR LOCATION: <where it begins>
PRESENT NPCS: <who's on stage, with current goals>
MORTALITY-ELIGIBLE: yes / no  (where applicable)

PREMISE
What the player walks into.

SPECTACLE
2–3 sensory anchors that ground the opening.

THE BEAT
3–5 things that could happen. None required. The player chooses.

EXIT CONDITIONS
What moves the story forward.

HIDDEN
Only the narrator knows.

LEAVES BEHIND
What persists into MCP state.

CRAFT NOTES
Tone, register, things to avoid.
```

---

## Closing notes

The deck lives across many files. The current playthrough's mission state lives in `narrator-state` MCP (active missions, completed missions, sub-states). The two together are the source of truth for "what's happened" and "what's available next."

When in doubt about whether a mission is firing, **the narrator can pull the most likely candidate file and check its trigger conditions directly.** A retrieval costs nothing; a mis-fired scene costs the story.
