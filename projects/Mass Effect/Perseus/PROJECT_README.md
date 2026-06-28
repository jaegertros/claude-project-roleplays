❈ Project Perseus — Read Me First ❈
This is a complete immersive literary roleplay package, utilizing the structural scaffolding of the provided roleplay templates but set entirely within the Mass Effect universe
,
. The specific story, the crew of the SSV Hastings, and the central mystery are original concepts designed for this experience, drawing on established Mass Effect lore regarding the Systems Alliance, the Geth, and the Perseus Veil
,
.
The setting, the cast of characters, and the narrative arc are all intended to be a surprise
. Do not open the spoiler files
.

--------------------------------------------------------------------------------
What's in this package
#
File
Purpose
Spoiler?
1
PROJECT_README.md
This file
.
Safe
.
2
PROJECT_INSTRUCTIONS.md
The narrator's system prompt. Paste into the Project Instructions field
.
Heavy spoilers. Do not read
.
3
KNOWLEDGE_1_Crew.md
The cast. Bios, psychological profiles, and epistemic maps
.
Heavy spoilers. Do not read
.
4
KNOWLEDGE_2_Locations.md
The ship's layout and clearance levels
.
Mild — glance if curious about the setting
.
5
KNOWLEDGE_3_Events.md
The scripted beats of the 5-Jump Patrol Route
.
Heavy spoilers. Do not read
.
6
KNOWLEDGE_4_Hidden.md
The deep lore and the AI substrate
.
MAXIMUM SPOILERS. Absolutely do not read
.
7
KNOWLEDGE_5_Lore_Constraints.md
How the crew handles anachronisms and player "meta" knowledge
.
Safe to glance
.
8
KNOWLEDGE_6_Utility.md
Clearances, mechanics, and tracker format. Includes the cold-open scenes written out — skip that section if you want them to be surprises
.
Safe to glance
.
9
perseus-datapad.jsx
The Citadel News Network Datapad UI tracker artifact
.
Safe (the UI gives nothing away)
.

--------------------------------------------------------------------------------
Setup (two minutes)
Create a new AI Project. Call it whatever you like (e.g., "Project Perseus")
.
Copy the full contents of PROJECT_INSTRUCTIONS.md into the Project Instructions or Custom Instructions field
. (Paste blind — don't read it first)
.
Upload files 3 through 8 (KNOWLEDGE_1 through KNOWLEDGE_6) as Project Knowledge
. (Upload blind)
.
Open a new conversation in the project. In a second tab or window, open the tracker: paste perseus-datapad.jsx into an artifact and run it
. The tracker persists its own state, so you only need to set it up once
.
Say anything to begin — "ready", "start", "I'm here", describe your character, anything
. The narrator will take it from there with a randomized cold open
.

--------------------------------------------------------------------------------
What's different this time
The Military Hierarchy. You are not on a civilian station or a post-apocalyptic settlement; you are aboard a cutting-edge Systems Alliance deep-space frigate
. The social structure is dictated by military rank and strict Clearance Levels (White, Green, Blue, Black).
The Datapad Tracker. Instead of an Omni-tool or a Pip-Boy, your UI is a sleek Citadel News Network (CNN) Datapad
,
. It tracks the current Jump (1-5), your Clearance Level, gathered evidence, and your current location on the ship.
The 5-Jump Clock. Instead of a 7-day calendar, the escalation is tied to the ship's FTL jumps
. With each drop out of faster-than-light travel into a new, uncharted system near the Perseus Veil, the isolation increases and the internal tension ratchets up
,
.
The Role of the Embedded Journalist. You are the only civilian on a military vessel. You have basic "White" clearance. You are actively watched, highly visible, and must rely on your charm, journalism instincts, and manipulation to get past locked bulkheads and tight-lipped soldiers.

--------------------------------------------------------------------------------
How to play
Write in first or third person — the narrator will match you. You control your character
. The narrator controls everything else, from the humming Mass Effect drive core to the Turian exchange officer
,
.
Response length is tight by design. The narrator gives you 80–150 words per turn
. You drive the scene, not the narrator
.
The Datapad tracker at the end of every response tells you what changed. Mirror those updates into the React artifact as you go
. The artifact is your ledger; the chat is the story
.
Nothing comes easily. The narrator will not volunteer the strange things happening on the ship
. If you want to find something, you must look for it
. If you want to know something, ask—and ask the right person
. Some crew members will only open up after you have earned their trust
.
Romance is available. Cross-species and human romances are handled with realism and literary care
. Earned intimacy matters, and fade-to-black is used as a tool rather than a default
. The narrator will not push a romance you don't engage
.

--------------------------------------------------------------------------------
Playing across conversations
If a conversation gets too long or you want to continue in a new window, the AI's memory might begin to drift
. The bracketed [Tracker] and [Datapad] lines at the end of every response are your canonical save state
. Simply copy the latest tracker lines and paste them into the first message of the new conversation
. The narrator will resume seamlessly
.
If you want deeper state preserved (which crew member you've been building trust with, what hidden DEPTH you've reached, or what active investigations you have), ask the narrator at the end of a session for a full [SAVE] line
. They will produce one
.

--------------------------------------------------------------------------------
The one thing worth knowing before you start
The year is 2187 CE.
You are an embedded journalist for the Citadel News Network, invited by the Systems Alliance to document a routine, deep-space patrol
,
. You are aboard the SSV Hastings, a state-of-the-art frigate charting the anomalies near the Perseus Veil—the treacherous border of Geth space
,
.
The Alliance wants you to broadcast a story of human bravery, galactic cooperation, and peaceful exploration
. You have been given White Clearance, a comfortable bunk, and an itinerary of five planned FTL jumps. Captain Elias Thorne is a decorated war hero, and his crew operates with flawless discipline.
That is the story they want you to write.
But out here on the edge of uncharted space, the ship's internal clocks are beginning to desync. Bulkhead doors are opening before crew members touch the panels. The Turian observer is asking questions off the record, and the Chief Engineer looks like he hasn't slept in a month.
You have your datapad. You have your press credentials. You have five jumps to find out what is really powering the SSV Hastings.
Welcome aboard.