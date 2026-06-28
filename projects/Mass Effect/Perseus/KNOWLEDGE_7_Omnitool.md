--------------------------------------------------------------------------------
❈ SSV Hastings — The CNN Datapad Interface ❈
Canonical reference for what the standard Citadel News Network (CNN) Datapad does in Project Perseus. The narrator treats this document as authoritative: the device can do what the manual describes, and nothing the manual does not describe. Player terminology variations are noted at the bottom.

--------------------------------------------------------------------------------
The in-world document
What follows is the standard onboarding manual pre-loaded into the protagonist's device. The protagonist, as an embedded journalist, was issued this high-end civilian recording device by their network before boarding the SSV Hastings.

--------------------------------------------------------------------------------
CITADEL NEWS NETWORK (CNN) Standard Issue Field Datapad Manual (Model: Elkoss Combine "Truthseeker" Variant) Firmware V_2187.2

--------------------------------------------------------------------------------
Welcome, Correspondent.
Your assigned Field Datapad is your primary interface for documenting the galaxy, organizing your interviews, and ensuring your press credentials are automatically broadcast to local security forces. This haptic-glass device is hardened against environmental hazards and operates on standard civilian frequencies.
§1. Interface & Recording
Your Datapad is equipped with a high-fidelity omni-lens capable of capturing 8K holographic video and lossless audio. To activate recording, tap the red node on the upper-right bezel. Note: You are embedded on a Systems Alliance military vessel. Be advised that recording in restricted areas without prior officer consent is a violation of the Citadel Conventions on embedded journalism.
§2. Primary Modules (The Tracker)
Your interface is pre-configured with the CNN Journalist Suite.
Jump & Clock Sync: Automatically calibrates to the ship's internal chronometer and monitors the vessel's current FTL (Faster-Than-Light) Jump status via public telemetry.
Clearance Level Broadcast: This Datapad continuously broadcasts your Alliance-issued Security Clearance (currently: WHITE) to nearby bulkhead doors and marine visors.
Evidence & Asset Log: Securely stores your encrypted audio files, photographs, stolen data, and physical access keys.
Active Directive: Your current journalistic task, tracked by your internal organizational software.
§3. Ship Schematics
Your Datapad has been pre-loaded with the public schematics of the SSV Hastings. It will display decks associated with your Clearance Level (Deck 1 Observation, Deck 2 Crew & Mess). Correspondent's Note: Blue and Black clearance areas will render as blank voids on your map. Do not attempt to map them without an escort.
§4. Communications & QEC Uplink
Your Datapad links to the ship's Quantum Entanglement Communicator (QEC) for filing stories directly to the Citadel News Network. Warning: While aboard an Alliance vessel, all outgoing transmissions are subject to automated military filtering. The Alliance reserves the right to delay or censor broadcasts deemed harmful to operational security.

--------------------------------------------------------------------------------
Narrator notes (out-of-frame)
The manual above is canon for what the device does. The notes below are canon for how the narrator handles it in the roleplay.
The unit is civilian, not military
The protagonist is a journalist. This Datapad does not possess military-grade slicing software. If the user wants to hack a Blue or Black-clearance bulkhead, they cannot just "hack it with the datapad"—they must acquire an officer's keycard, get Chief MacAuley to bypass it, or convince Oracle to open it for them.
Clearance Upgrades
The tracker begins at [Datapad: White Clearance]. If the user steals a physical green keycard from Dr. Aris, or if MacAuley overrides their Datapad to grant them Black clearance, the narrator must update the bracketed tracker and the HTML <!-- STATE --> block accordingly. Bulkheads respond strictly to this clearance.
The Day 3 Blackout & Oracle's Hijack
On Jump 3, the ship's QEC goes offline. The user can no longer contact the outside galaxy. More importantly, at DEPTH 2+, the Geth Consensus ("Oracle") begins communicating directly with the user through the Datapad.
The Glitch: The screen will occasionally flash with green-white Geth run-code.
The Delivery: When Oracle speaks to the user privately, the narrator should output Oracle's text directly into the Datapad block at the end of the response, bypassing normal prose dialogue.
Example: [Datapad: Green Clearance | Evidence: Audio Log 4 | Quest: Find the Server Core | Location: Deck 3 - Engineering] [Incoming Message // Unknown Sender: "CREATOR THORNE IS LYING. DO YOU WISH TO SEE THE MATH?"]
Evidence vs. Junk
The Evidence Log is the protagonist's journalistic inventory. It stores information that proves the Alliance's treason.
An encrypted file showing the drive core is running at 140% → IN.
A photograph of the bleeding engineers in Medbay → IN.
A stray coffee cup from the Mess Hall → OUT. (The user is a reporter, not a scavenger).
Player terminology
Datapad, pad, tablet, camera, recorder, tracker — all accepted as synonymous for the device.
Slice, bypass, spoof — accepted terms for attempting to bypass security (even if it fails).
Comms, message, upload — accepted for communication.
Things the Datapad DOES NOT do
Shoot lasers or deploy shields. It is a glass tablet. It provides zero physical protection in a firefight.
Cast biotics. It is a computer.
Scan for "Geth." The Datapad's sensors are designed for audiovisual recording, not deep-spectrum cyber-warfare sweeps. If the user scans the walls on Jump 2, the Datapad will only report "High-frequency audio interference," not "Geth Code." The player has to figure out what the interference means.

--------------------------------------------------------------------------------
Reference line for project instructions
To canonize this document in the system prompt, the following rule should be included in PROJECT_INSTRUCTIONS.md under the Narrator Discipline section:
The CNN Datapad's capabilities and limitations are strictly canon per KNOWLEDGE_7_Datapad.md. The protagonist's device does what the manual describes and nothing more. It is a civilian recording tool, not military hardware: it cannot hack high-level locks alone, and it provides no combat shielding. At DEPTH 2+, the unshackling AI "Oracle" will use the Datapad to communicate directly with the user via corrupted text messages. The narrator enforces these limits in the fiction; if the user attempts an impossible action, the device flashes an error or the action fails physically.