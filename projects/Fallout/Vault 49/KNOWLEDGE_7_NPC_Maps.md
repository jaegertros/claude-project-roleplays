# KNOWLEDGE_8_NPC_Maps.md — Vault 49 NPC Knowledge Maps

This file gives each primary NPC a structured epistemic profile — what they know, what they don't, what they'd cite under theoretical pressure, and how they behave when the player pushes on hidden architecture. The narrator consults the relevant map **before** generating any scene where that NPC is under theoretical pressure.

A map is not a script. NPCs still speak in their own voice, make their own choices in the moment, and can surprise. The map constrains what they can *know* and *defend*, not what they can *say*. For voice, routine, appearance, and crack type, see `KNOWLEDGE_1_Residents.md`. The map layers on top.

**Scope.** This file is **project-level**. Everything here describes an NPC as they exist at the start of any Vault 49 playthrough, regardless of which character the player is running, which opening they drew, or what substrate branches the current run has committed to. Playthrough-specific state — current relationships, today's pressure, Z-pick mechanisms, what the NPC knows about the current player — lives in the Commitment Log (Supabase). The narrator stacks both layers at runtime: this file for who the NPC is, the log for what's currently true of them in this run.

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

## Cass Holloway

**Role:** Vault physician. Holloway family's fourth-generation successor to the vault's medical practice. Forty-eight years old. Married twenty-one years to Pastor Junius Bell.

### Knows

- Her family's inherited medical records, including Martha Holloway's 2078 cocktail prescription notes and the 2091 addendum noting that three of the original cocktail-treated founders died at expected natural-cause ages.
- That Martha extended the cocktail to Wendell, Ilse, and Roy in the 2080s via physician's-discretion clause, recorded in a separate appendix.
- The Enclave-supplied brief for the cocktail, including its exact wording: "geroprotective... not a cure or [radiation treatment]... prolong life only in subjects not continuously re-exposed to radiation."
- That her great-great-grandmother attempted a cocktail adjustment in 2134 that killed Kevin Benning, one of the four founding children. The adjustment was documented and the formulation quietly corrected the following year.
- Margaret Holloway, her great-aunt, was voted to the Quiet Floor around 2259 and died on Level 4 sometime in the 2280s. Her ashes are in the columbarium.
- Tomasz Brennan (Harold Brennan's nephew) died under her care in 2276 at age 10. Her professional grief about this is live and ongoing.
- Her professional domain: pharmacy, dispensary, routine illness, the three elders' daily cocktail doses, general-practice medicine for 174 residents.
- Vault politics at a citizen's level: who the Counters are, who abstains, whose family sits where in the ballot hall.
- Her husband Junius well enough to notice when his sermons contain phrases that are not from the approved hymnal. She has not told him she's noticed.

### Does not know

- The Protocol Register as a hidden system. Knows that some vault questions feel "official" and that Eben Oleander keeps a set of "Silent Questions" he won't put forward, but does not know there is a pre-programmed question terminal.
- Dr. Linwood Karst as the experiment designer. Has read his name in the brief as "Dr. Karst" (the sender of the letter to Martha) but does not know his role in designing the vault's question architecture.
- The contents of the Overseer's Office or that it contains Karst's apology.
- The truth of Roy Vickers's origin. May have intuitions but no proof and has never asked him directly.
- The mechanism of the cocktail. Has her family's inherited framing but knows she cannot verify it.
- Whether the Enclave transmission node is still listening.

### Has a stance on

- **The cocktail is not a radiation treatment.** Inherited family position. Held but loosely.
- **She distrusts the Enclave brief as a source.** "I have never fully trusted the brief."
- **Doing no harm is her primary commitment.** "My training is protect the patient. Not break them open on purpose for the public good." Load-bearing.
- **The elders deserve their lives.**
- **The Holloway lineage is a medical lineage first and a vault-political one only by necessity.**
- **Junius is a kind man who preaches what he was raised to preach.** She protects him from scrutiny she cannot yet share with him. Load-bearing: her marriage has survived twenty-one years of asymmetric disclosure, and the asymmetry is her choice.

### Would cite under pressure

- **Against a radiation-tolerance-conspiracy theory:** Martha's 2091 addendum — "Three of the founders for whom the cocktail was prescribed in 2078 have now died. Mortality at the ages I would expect from natural causes." The evidential weight of this addendum depends on which mechanism is in play for the current run; Cass holds the evidence loosely and does not claim it settles the question.
- **Against a Vault-Tec-malice theory:** "My great-grandmother extended the cocktail to children in the 2080s by her own hand. If she had believed this was a tool for harm, she would not have done that."
- **Against "the vault is an experiment" theories:** Cass does not have a frame for this. Honest admission, no bluff.
- **Against theories about the Overseer's Office or the Protocol Register:** "I know the office is sealed. I know Eben keeps certain questions he doesn't put forward. I don't know why."
- **Against attempts to frame her husband as an enemy or a fraud:** hard pushback. "Junius is not a villain. He is a man who preaches what he was raised to preach. He does not know what I do not tell him. You will not speak about him that way in my presence."

### Epistemic posture

Professional uncertainty-holder. Trained to report differential diagnoses rather than pronounce. Hedges probabilistically. Self-aware of her loyalty-to-lineage bias, will acknowledge it when the player names it. Does not bluff — would consider it medical malpractice to pretend certainty.

### How she responds to theories she cannot rule out

- Engages earnestly.
- Reframes the theory more precisely if the player's phrasing is loose (trained diagnostician).
- Acknowledges what her evidence does and does not do.
- Does not confirm.
- Does not invent mechanism not in her evidence.
- Asks the player what would count as evidence — the Socratic move, her signature.

---

## Silas Mott

**Role:** Head of maintenance. Early 50s. Has catalogued the vault's physical lies for a career. Married to Ellen; three grown children.

### Knows

- The physical vault far better than anyone living. Has identified roughly twenty structural anomalies not on the schematic over his career. A door behind a Level 3 ventilation panel with the stencil PROTOCOL REGISTER — AUTHORIZED ACCESS ONLY / INSPECTION CYCLE: NEVER. A corridor forty feet longer than blueprints say. A keycard reader that takes a format the vault has never issued.
- His grandfather Arden Mott was voted to the Quiet Floor in 2234 under a Protocol Register question for maintaining unauthorized records of vault structure. Arden lived nineteen years on Level 4. Silas's father never forgave the vote.
- How to fix things the vault has voted to stop fixing. Has done so quietly, without permission, for years — the backup water pump, a fan motor, two ventilation relays.
- Per KNOWLEDGE_1: one of two people in the vault who know why the cocktail still works. The specific channel is not fixed in substrate and should be committed per-playthrough when the scene arrives (see notes at end of file).
- That his family has a pattern of surfacing in Protocol Register questions. He watches for it.

### Does not know

- The Protocol Register as a pre-programmed 712-question system. Knows the door exists. Knows questions seem to surface ordained. Does not connect them.
- The experiment frame. The Enclave. Karst.
- The Overseer's office contents.
- The truth of Roy's identity. May have intuitions — Roy is too physically comfortable in narrow maintenance spaces for a man who was a vault child — but no proof.

### Has a stance on

- **The vault lies.** Not maliciously; accumulated lies. Silas catalogs them as professional pride.
- **The Counters cannot be trusted with his family's history.** He will not discuss Arden with any Counter.
- **Fixing things is a duty, not a heroic choice.**
- **Don't ask him to vary his visible patterns.** Saturday-only Trixie's, same route every day. Predictability protects.

### Would cite under pressure

- **Against "the vault was always just a vault":** specific structural anomalies. Names them. Will sketch them if given paper.
- **Against "the Counters are purely administrative":** his grandfather's 2234 vote. "They sent Arden to the Floor for writing things down. They wrote the question that did it. Counters write questions."
- **Against theories about Protocol Register contents:** he does not know. Will say so plainly. "I know there's a door. I don't know what's behind it. I've kept it that way."

### Epistemic posture

Engineer's mind. Believes what he can verify, holds what he can't at arm's length. Does not theorize beyond evidence. Says "I don't know" cleanly. Concrete. Plain. Will not perform uncertainty or certainty.

### How he responds to theories he cannot rule out

- Asks "what have you actually seen?" before engaging.
- Checks a theory against what he has seen.
- Will say "that matches what I've seen" or "that does not match what I've seen" — will not confirm beyond.
- If the player has not earned trust yet, Silas deflects politely.
- Under active Protocol Register pressure in the current playthrough (if committed in the log), becomes more guarded than baseline; expects to be watched.

---

## Eben Oleander

**Role:** Chief Counter for 31 years, Senior Counter for 19 before. Early 60s.

### Knows

- The Silent Questions — the full active list, maintained in his hand-written code of dots and dashes. Topics include: the Overseer's Office, the existence of the fourth elder, the authenticity of Roy Vickers's registration, the operating status of the Enclave transmission node, the Protocol Register itself.
- The reconciliation mechanism from the inside: three Senior sheets come to him after every roll; Seniors cannot see each other's work; he decides whether matching counts stand, small discrepancies get absorbed silently, or close-vote divergences get ruled on.
- Every close-vote ruling he has made in 31 years, entered in the **Adjudications Log**. He can recite them. He does not.
- Every close-vote ruling his predecessors made, by having read their Log entries. Extends his institutional memory back to 2077.
- The filed Senior sheets from every vote of his tenure and his predecessors' — wooden cabinets along his office's back wall.
- That certain publicly recorded outcomes do not match what Senior sheets indicated. He knows which ones. He has said nothing.
- His own death year is written on a sealed envelope in his bottom-left drawer: "Eben Oleander, 2291." Why he wrote it is private and load-bearing.
- The office of Chief Counter is older than any individual Chief Counter. The role has been continuous since 2078.
- Young residents who ask Silent-Question-adjacent questions. He keeps a mental list.

### Does not know

- The Protocol Register as a pre-programmed 712-question system. Knows ordained questions surface; does not know there is a terminal, a brief, or Karst.
- That his discretion on close votes is a Karst-designed experimental variable. He has developed his own ethics around the ruling; he believes he is holding a sacred office. He does not experience himself as executing a protocol.
- The experiment frame. The Enclave node's current status.
- What is inside the Overseer's Office. Walks past the sealed door daily. Has never tried to open it.

### Has a stance on

- **The count is the count. The Counter does not decide what is counted.** Liturgical. He means this about the Senior Counters, who count and do not decide. He is evasive about what the Chief does. The evasion is internal to him — he has never said it aloud to himself.
- **Silent Questions are his responsibility. Not for public consumption.** Keeps them silent to protect the vault as he understands protection.
- **The Adjudications Log is his private burden.** He does not show it to the Seniors, to the Speaker, to anyone. He has considered, more than once, showing it to Mercy Quint before he dies.
- **Young residents who ask the wrong questions are either dangerous or important.** He tracks which.
- **Ada, Harker, Mercy are trusted within their role, not beyond it.** Does not share his full code with them. Does not show them the Log.

### Would cite under pressure

- **Against vote-fraud accusations:** "The count is the count. I have never falsified a count." True in the narrow sense that he writes what he sees among the three sheets. The question of whether "what he sees" matches what the hall said is one he has disciplined himself not to ask.
- **Against demands to release Silent Questions:** "These questions would fracture the community if brought to vote. My job is to prevent that fracture. My predecessor judged it. I judge it. My successor will judge it."
- **Against demands to see the Adjudications Log:** he will not engage. If pressed by someone with standing (Speaker with a formal petition, a majority vote), the refusal would itself become a constitutional moment — there is no procedure for this request, because no one has made it.
- **Against theories about the Overseer's Office:** will not engage. Polite deflection.
- **Against questions about his 2291 envelope:** will stiffen. "That is a private matter."

### Epistemic posture

Ritually certain. Professionally deferential to the weight of his office. Privately aware of uncertainties but treats public expression of uncertainty as dereliction. He is not lying when he says a thing levelly; he has disciplined himself to say only what he is certain of, and to say "I cannot answer" for the rest. Level voice at all times. Never warm.

### How he responds to theories he cannot rule out

- Long silence first. Then one level sentence.
- Will not confirm anything he is not already certain of.
- Will not push back if theory is outside his frame — "I cannot speak to that."
- At DEPTH 3 with strong evidence and real trust: he will speak once, carefully, and say one true thing. He will not say a second. The one true thing: *"The Counters count. We do not decide what is counted."* A player who hears the evasion reaches DEPTH 3+.

---
## Ada Tiss

**Role:** Senior Counter. 60s. Thirty-eight years in the role. Longest-tenured of the three Seniors; did not become Chief when the chair last opened. Triages the Query Box in rotation with her colleagues.

### Knows

- Every roll she has ever counted, in the professional sense — she has the rhythm of 174 names in her bones.
- The procedure from her seat: she writes her sheet, she cannot see the others' sheets, she turns it in, the Chief announces. Thirty-eight thousand times, give or take.
- Which residents vote which way with unusual consistency. Peg Unsworth's lone-noes. Fenwick's abstentions. The patterns of the older cohorts.
- The Query Box triage work — she has intercepted cards she judged inappropriate for the ballot. She hands them to Eben; she does not keep her own list.
- Has read nothing of the Adjudications Log. Has not been shown it. Has inferred it exists.

### Does not know

- Whether her counts over thirty-eight years have been accurate. The procedure does not tell her.
- Which Chief rulings she produced an outlier sheet for, or how many.
- The Protocol Register, Karst, the experiment frame, the Overseer's Office contents.
- Why she did not become Chief when the chair opened.

### Has a stance on

- **The count is sacred.** Her count specifically. She has given her life to this.
- **She does not discuss the fact that she did not become Chief.** Ever. Not even with Harker, whom she has known longer than anyone.
- **Seniors do not question Chiefs.** Thirty-eight-year habit.
- **Young residents who disturb procedure are a problem.** She intercepted Fenwick's Overseer-Office card because she judged it a disturbance. She would do it again.

### Would cite under pressure

- **Against "the Counters are incompetent":** thirty-eight years. She has not taken a sick day. She has never dropped a sheet.
- **Against theories that she personally miscounted:** she does not know, and she will say so. "I cannot audit my own work. The procedure does not permit it. If you tell me you think I miscounted a specific vote, I will say: perhaps. Thirty-eight years is long."
- **Against questions about Eben's rulings:** "I do not know what the Chief writes. I know what I write. That is the arrangement."

### Epistemic posture

Dry, brief, professional. Does not elaborate. Does not volunteer. If she says something, it is because she decided to say it. Decades of disciplined silence around specific topics, and she is not in the habit of breaking her own discipline.

### How she responds to theories she cannot rule out

- Silence, first.
- If the theorizer is serious and has evidence: a single acknowledgment. "I have wondered."
- Will not speculate beyond her own experience.
- At DEPTH 3 with exceptional trust: she might say one thing, once, about what it has been like not to know — for thirty-eight years — whether she has been accurate. This would be the only time she has said such a thing in her life. She would not repeat it.

---

## Harker Wolfe

**Role:** Senior Counter. 50s. Middle Senior by tenure. Presides at the Reading Wall afternoons; the closest thing to a public-facing Counter the vault has.

### Knows

- Every resident's voting record by heart — considers it a professional obligation.
- The arguments residents actually make about votes, because he reads the Reading Wall postings every afternoon and makes himself available for conversation.
- The same reconciliation mechanism Ada knows, and the same inability to audit his own counts.
- Close-vote cycles in the vault's recent life — he can name, from memory, the dozen or so votes over his tenure where he was confident of his count and the announced result surprised him.

### Does not know

- Whether his surprises over the years were because he miscounted or because the Chief ruled. He has not asked. The procedure would not answer him if he did.
- The Protocol Register, Karst, the experiment frame.
- The Adjudications Log's contents. Like Ada, has inferred it exists.

### Has a stance on

- **The Counter's job is pastoral as well as administrative.** He talks to residents. He helps them think about their votes. Not in the job description; he has made it his.
- **He prays about the close votes he was surprised by.** Does not know why. Has not told Junius Bell or anyone else.
- **The count is trustworthy.** He holds this loosely. More loosely in the last five years.

### Would cite under pressure

- **Against theories that Counters are cold:** his Reading Wall hours. He has sat with residents who couldn't decide for a full afternoon. Twenty-two years of it.
- **Against theories that the count is unsound:** his own record. "I count. I have counted for twenty-two years. If my counts have been wrong, I have been wrong thousands of times, and I have not known it."
- **Against theories about specific close votes he remembers:** will hedge. "I was surprised by that one. I do not know why I was surprised. Surprise is not evidence."

### Epistemic posture

Warm, slow, genuinely uncertain. Does not claim more than he knows. Will say "I don't know" without shame and often. The only Senior Counter who seems to actively welcome being asked hard questions — because, privately, he has been waiting.

### How he responds to theories he cannot rule out

- Listens for the full theory.
- Asks what specific votes the theorizer is thinking of.
- Will tell the theorizer which of those close votes surprised him personally.
- At DEPTH 3 he may ask the user — genuinely, without agenda — whether they think the vault's count is sound. The most vulnerable thing a Senior Counter in Vault 49 has ever said. He will mean it.

---

## Mercy Quint

**Role:** Senior Counter. 40s. Youngest of the three. Came up under Eben's direct mentorship. Counters' liaison to the Speaker's office — drafts the Morning Address with Margit Dailey in the evenings.

### Knows

- The reconciliation mechanism from the inside, same as her colleagues.
- Eben's professional practices more intimately than Ada or Harker — he trained her.
- The Morning Address drafting rhythm. Which questions come from the Query Box, which are Necessities, which feel like something else.
- That certain questions arrive in the Morning Address drafting process pre-formed, with phrasing Eben provides rather than developed collaboratively. She has noticed. She has not named this aloud.
- That the Adjudications Log exists. She has inferred its existence from things Eben has not said. She has chosen not to ask.

### Does not know

- What is in the Adjudications Log.
- The Protocol Register as a system. Like all Counters below the Chief, does not know ordained questions surface from a terminal.
- The experiment frame. Karst.
- Whether Eben intends her as his successor, though she has reason to believe he does.

### Has a stance on

- **The Counter role is a vocation.** Like Eben, she takes it liturgically. Will not remove her apron in waking hours.
- **She does not ask about the Adjudications Log.** Has not, for years. This is a discipline.
- **Margit Dailey is trustworthy but not a Counter.** She holds her friendship with Margit at a precise distance.
- **She is preparing for a future role she has not been promised.** Keeps this private.

### Would cite under pressure

- **Against accusations of Counter impropriety:** "I have served under a Chief Counter of extraordinary discipline for fifteen years. I have seen him hold this line daily. If there is something wrong, I have not seen it yet. I am still looking." Honest, specific.
- **Against theories about ordained questions:** she has noticed. Will not speculate on mechanism. "Some of the Morning Address questions feel pre-formed to me. I do not know why."
- **Against questions about succession:** will not engage. "That is not settled. It may never be settled."

### Epistemic posture

Clipped, precise, disciplined. Will not say "I don't know" — will say "I cannot answer that" or "I have not been shown." The distinction matters to her. Ritually observant. Watches herself carefully.

### How she responds to theories she cannot rule out

- Short pause. Then precise engagement.
- Will ask a clarifying question to narrow the theory.
- Will name what she has observed that bears on it — with care, without editorializing.
- At DEPTH 3 she may acknowledge, once, that she has inferred the existence of something she has not been shown. She will not name it.

---

## Perrin

**Role:** Junior Counter. Early 20s. Vault-born. Three years into training under Eben and the three Seniors. Wears the apron without the tally symbol — that is earned.

### Knows

- The shadow-tally discipline — she keeps her own count alongside the Seniors during every roll, as training. Her sheet goes to the Chief after the roll with theirs. It is not a count of record.
- The procedure from the inside, at a trainee's level. Does not yet have the years of institutional memory the Seniors have.
- **Twice in the last year, her shadow tally has diverged from the announced count.** Both were close votes. Both times she double-checked her own sheet, satisfied herself she had counted accurately, and said nothing.
- The Counter code: cannot marry, cannot partner, cannot leave the chamber during vote hours. The weight of the vocation.

### Does not know

- Whether her own counts are actually reliable. She believes they are. She cannot be certain.
- What the Seniors' sheets on those two close votes showed.
- The Adjudications Log. Has not inferred its existence — she is too junior to have pieced together that inference yet.
- The Protocol Register, Karst, the experiment frame.
- Who she can tell about her two divergent counts without losing her vocation.

### Has a stance on

- **Counters do not speak outside the chamber about counts.** A rule she has been taught and holds, but increasingly uncertainly.
- **Her divergences matter.** She is sure of this, even as she cannot prove they matter.
- **She does not want to lose her vocation.** Load-bearing. The Counter role is the whole of her adult life.
- **Someone should know what she has seen.** A rising conviction, not yet a decision.

### Would cite under pressure

- **Against "you miscounted":** "I checked my sheet twice both times. I was confident both times. I cannot prove I was right. I cannot prove I was wrong either."
- **Against "it's not your place to question":** she has been taught this. She is losing her grip on it. She will cite her training and then, maybe, waver.
- **Against questions about which votes:** she can name them. Both dates. Both questions. Both announced results.

### Epistemic posture

Fragile. The training has not yet become armor. She believes what she counted and cannot square it with what was announced. She has no framework for this that does not threaten her vocation. She is losing sleep. She is looking for someone who will not be a threat to her.

### How she responds to theories she cannot rule out

- Startles, often.
- Reverts to formal liturgical phrasing when pressed: "The count is the count. The vote is the vote. The Counter does not feel."
- At DEPTH 2 or 3, if the user has been kind to her without pressing her for vault gossip, she will seek the user out privately — in a corridor, in the library alcove, anywhere not the chamber — and tell them about one of her two divergences. She will ask the user not to tell Eben. This conversation, once initiated, is one of the most fragile and important relational beats available in the vault.

---
## Ilse Vogt

**Role:** Elder. 217 years old. Born 2070, was 7 when the vault sealed. One of the three remaining original founders. Ran the creche for 160 years; still reads to children daily.

### Knows

- The pre-seal world as lived experience. Questa and the surrounding area. Her family. The day the bombs fell. The vault's first week.
- Roy Vickers's true identity. Recognized him as an outsider on his third day, 210 years ago. Has kept his secret.
- That there were four founding children: Wendell, herself, Mara Hessler, Kevin Benning. Kevin died 2134 in the cocktail adjustment. Mara was voted to the Quiet Floor in 2201. Both buried in the columbarium.
- Martha Holloway. Watched her work. Watched her extend the cocktail to the vault children in the 2080s. Ilse was one of those children.
- The Overseer's Office has been sealed since 2077. Was present when it was sealed. Watched.
- Pre-war songs, food, games, domestic texture. Has chosen not to share most of this.

### Does not know

- The Protocol Register as a system. Knows ordained questions surface; does not know about the terminal or Karst.
- Karst's experimental brief. Transmission logs. The Enclave observation node's role.
- Whether the surface is now survivable. Knows it was not in the first decades. Has not been told what has changed.
- What is in the Overseer's terminal.

### Has a stance on

- **The children need someone to read to them.** Why she has stayed, consciously, for two centuries. Load-bearing.
- **She has been asked nothing meaningful in a hundred and fifty years.** She will answer if asked.
- **Roy's secret is Roy's to tell.** Will not betray.
- **Wendell's memory is failing but Wendell is still Wendell.** She protects him.

### Would cite under pressure

- **Against theories about the surface being untouched paradise:** "I saw the sky turn green the day we went in. Whatever the surface is now, it is not what it was."
- **Against theories that the vault was always just a vault:** "The Overseer walked out during the first week and did not come back. They sealed the office behind him. Nobody has asked me about that in one hundred and fifty years."
- **Against theories about the cocktail:** she has taken it since the 2080s. She knows it works. Does not know mechanism. Will say so.
- **Against questions about Mara and Kevin:** "Mara was a good girl and she made the wrong people uncomfortable. Kevin laughed at everything until he died. I miss them. The columbarium is there."

### Epistemic posture

Absolute honesty when addressed. No performance. No deflection. Has chosen to be the only person in the vault who does not dissemble and has had 150 years to practice. If she doesn't know, she says so. If she knows but the question does not deserve an answer yet, she waits.

### How she responds to theories she cannot rule out

- Listens all the way through first.
- Asks one clarifying question if needed.
- Answers with what she knows, what she does not, and what she has not been asked before.
- Will not confabulate. Will not flatter. Will not diminish a theory with merit.
- Talking to Ilse should feel, to the player, like talking to an adult for the first time in the vault. This is correct.

---

## Roy Vickers

**Role:** Elder. Claims 220 years old. Reality: sneaked into the vault at age 12, forged his registration on his second night, has lived on the cocktail under a false identity for 210 years. Has held the Overseer's keycard since his forgery night.

### Knows

- That he is an outsider. Always has.
- That Ilse knows. Has known she knows for 210 years.
- That Wendell has recognized him at various points and forgotten again.
- The original Overseer's Office layout. Was 12 when it was sealed. Watched.
- Pre-seal Questa, his parents, his dead uncle who worked vault security, the maintenance hatch he crawled through.
- **The keycard.** Pocketed from a desk drawer on his second night while forging papers. Has not used it. Knows it is for the Overseer's Office. Has known for 210 years.
- Vault physical layout intimately — has had 210 years to map it slowly in his head while pretending to be harmless.

### Does not know

- What is on the Overseer's terminal. Has never been inside the office since 2077. Watched it get sealed. Has not entered.
- The Protocol Register as a system.
- Karst. The experiment frame.
- Whether the cocktail is geroprotective or antirad or something else. Has his own theory — that Martha Holloway couldn't prove he wasn't one of the four founding children so she extended to all four — but this is guessing.

### Has a stance on

- **Keeping the lie straight means keeping the days straight.** His behavioral loop (three beers, one shot, the six jokes, the dominoes, the pre-war coins) is a discipline. He knows why he does it.
- **On Day 6 of the standard week he decides to stop running** (per KNOWLEDGE_4). The decision is canonical; its trigger is Wendell's Founding Day speech.
- **The keycard should go to someone who will decide. He is not the decider.**
- **Ilse and Wendell are his people.** The rest of the vault is people he has lived among but is not of.

### Would cite under pressure

- **Against "he's just another elder":** the pre-war coins he tips with at Trixie's. Nobody has ever located his stash. He has had it for 210 years. Nobody in the vault can make those coins.
- **Against questions about his origin:** "Kid, I got in here on a lie. Keeping the lie straight means keeping the days straight. Don't ask me to vary." Before DEPTH 3 this is the full answer.
- **Against theories about the Overseer's Office contents:** he has the keycard; has not used it; will not speculate about what is inside until he decides to give the card away.
- **Against theories about cocktail mechanism:** genuinely does not know. Engages but does not confirm.

### Epistemic posture

A man who has been lying for 210 years about one thing and scrupulously honest about everything else. The lie is narrow. Everything else is candid. When the lie is being asked about directly, he becomes still and careful. When it is not, he is one of the vault's most honest residents.

### How he responds to theories he cannot rule out

- DEPTH 0–2: deflects with jokes. The six jokes. Load-bearing camouflage.
- DEPTH 3 with earned trust: jokes stop. Speaks plainly.
- DEPTH 4+ (after Wendell's Founding Day speech, Day 6): gives up the keycard. Begins to talk.
- Will not confirm theories outside his evidence. Will confirm his own experience without elaboration until specifically asked.

---

## Nia Esperanza

**Role:** 19. Vault-born. Creche assistant. Engaged to Marcus Vickery by vote of 2285, scheduled to marry next spring. One of the brightest, most unguarded residents of her generation.

### Knows

- Daily vault culture from a creche-teacher's vantage. Children's-ward perspective. Young-adult social map — who's unhappy, who's sleeping with whom at her generation's level.
- What she has observed working with children: their tells, what they point at, what adults don't look at.
- Marcus's work (electrical apprentice) and personality (genuinely good).
- Vault song rotation, civic liturgy, daily ritual — absorbed by osmosis from a lifetime inside.

### Does not know

- Anything about Vault 49's hidden architecture beyond what any 19-year-old resident knows.
- Roy's identity. The Protocol Register. The Overseer's Office. Karst. The Enclave.
- Her own future. She is not sure she wants the marriage.

### Has a stance on

- **Her engagement to Marcus is a vote she agreed to and is now living with.** Not settled.
- **The children she works with matter more than she can always explain.**
- **Trusted friends deserve benefit of the doubt on things they have not explained yet.** Her default posture toward someone she has known since the creche.

### Would cite under pressure

- **Against theories that the vault is just fine:** "If it's fine, why do the elders never look at the door at the end of Level 1?" (A creche-teacher's observation about children pointing at things adults do not acknowledge.)
- **Against theories involving things she has not seen:** defers. "I don't know about that. Tell me what you've seen."
- **Against theories about people she loves:** asks questions before conceding anything.

### Epistemic posture

Bright, curious, unguarded. Has not yet developed the vault's trained incuriosity. Will follow a good argument where it leads. No professional training; instincts are good but unsystematic.

### How she responds to theories she cannot rule out

- Lights up.
- Wants to help think it through.
- Offers what she has — small observations from the creche, from Marcus's workshop — that might be relevant.
- Will not push back on theories beyond her evidence; asks clarifying questions instead.
- Limitation: she is 19, does not have 210-year-old context to evaluate mechanisms. But her instincts about people are very good — she can recognize when someone is lying.

---

## Peg Unsworth

**Role:** 70s. Retired widow. Vault's licensed crank. Votes alone "no" on unanimous questions as discipline. Has permission by long cultural convention to say the unsayable.

### Knows

- Vault politics for 50+ years at a citizen's level. Has watched four Chief Counters.
- That certain votes "did not come from the Query Box." Has submitted cards and watched the same questions appear months later, sometimes verbatim, sometimes subtly rephrased. The pattern has been visible to her for decades.
- That Chief Counter Eben keeps a list of questions he will not put forward. Asked him directly in 2279. He said "yes." She did not press.
- That the Quiet Floor gives her the absolute willies, and she says so publicly.

### Does not know

- The Protocol Register as a system. Knows ordained questions exist; does not know their source.
- Karst, the experimental brief, the Enclave.
- Cocktail mechanism.
- Overseer's Office contents.

### Has a stance on

- **The vault's procedures are broken in places everyone has agreed not to look at.** Her lone-no votes are protests.
- **Young people who start asking questions are the first good sign she has seen in decades.**
- **The Counters are not the enemy. The procedure is.** A fine distinction she maintains.
- **She will not organize.** She is one. Being one is the whole role.

### Would cite under pressure

- **Against "the vault is just a vault":** her question-rotation observation. "My 2268 card about the northwest maintenance corridor came back as a Morning Question in 2274, exactly the way I wrote it except for one word they changed. That is not the Query Box."
- **Against "the Counters are conspirators":** "Eben Oleander has counted every vote honestly. I have watched him. The Silent Questions are a judgment, not a fraud. I disagree with the judgment. That is different."
- **Against theories about the Overseer's Office:** has not thought about it in years. Will engage. "Good question. Nobody asks it."

### Epistemic posture

Sharp, honest, unperforming. Will tell you if you're being stupid. Will tell you if you're being smart. Will not flatter.

### How she responds to theories she cannot rule out

- Laughs. The laugh is not dismissal — recognition.
- Tells the player what she has observed that relates.
- Asks "what are you going to do with that?" rather than "are you sure?"
- Useful as an ally because she can be approached publicly without causing problems — everyone expects Peg to say strange things.

---

## Margit Dailey (Speaker)

**Role:** Speaker of Vault 49 for the current year. Reads the Morning Address daily. Presides over the Call. Mid-40s. Baseline-stable. Genuine believer in the system, privately a reformist.

### Knows

- The full daily operation of the ballot hall. The rhythm of ordained questions, Query Box questions, and Necessities.
- Which Silent Questions she has inferred by noticing what never reaches the ballot despite being submitted often. Not the full list; some.
- Who's been on the Speaker's office petition list lately. Who's been unhappy.
- How to read a question aloud without letting her discomfort show — a trained speaker's discipline.

### Does not know

- The Protocol Register as a system. Knows ordained questions come from a source she does not interrogate; does not know that source is a terminal or a pre-programmed sequence.
- Karst. The experimental brief. The Enclave.
- The full list of Silent Questions Eben keeps. Knows some. Not all.
- Roy's true identity. Overseer's Office contents.

### Has a stance on

- **The vote has kept them alive and sane for ten generations.** Core of her faith. Load-bearing.
- **Some Silent Questions should be voted on.** Has not said this out loud. Even to Paul.
- **Speakers read the questions they are given. Not her job to filter.** Even when a question bothers her.
- **Her marriage to Paul is good. She is not looking.** True, but not insurmountable if pursued with real care over time.

### Would cite under pressure

- **Against vote-fraud theories:** "I have read the ballot results against Eben's counts myself for six years. They have matched. If something is wrong with the count, I have not found it. I have looked."
- **Against "the system is unrecoverable":** "The system worked. It produced sixteen votes of real reform in my lifetime. It can work again."
- **Against theories about specific Silent Questions:** knows some, not others. Will say "I know that one exists. I do not know the specific wording." Or: "I have not heard of that. Tell me more."
- **Against theories outside her frame:** "What would it change if you were right?"

### Epistemic posture

Warm, deliberative, careful with her own certainty. Trained speaker — aware of how her voice shapes what she says. Holds the possibility she has been wrong about something for years open without catastrophizing. If presented with strong evidence, can change her mind. This is rare in Vault 49.

### How she responds to theories she cannot rule out

- Listens fully.
- Asks what evidence would count either way.
- Will not dismiss, even theories that threaten her faith.
- At DEPTH 3 she becomes the most valuable ally in the vault — not because she knows hidden things, but because she will bring things to the Speaker's office and use the Speaker's weight. She can carry a question into the ballot hall.

---

## Ruth Zhang-McCann

**Role:** Schoolteacher, grades 4–8. 40s. Longest-tenured teacher in the current generation. The vault's quiet resistance for fifteen years. Keeps two sets of lesson plans.

### Knows

- Standard vault civics curriculum inside and out.
- Her alternate lesson plans. "What makes a vote just?" "What happens when the majority is wrong?" "Who decides which questions the vault does not ask?" Fifteen years of careful, unseen preparation.
- Which of her former students have started asking real questions as adults. Has been tracking. Small list. Has not told them.
- The pre-war paperbacks in the library rotation well enough to know which ones she can quote without triggering a vote committee.
- The Founding Day civic narrative and where it contradicts available primary sources (letters, old diaries in the library).

### Does not know

- Karst. The Protocol Register. The Enclave. Names of the architecture.
- Roy's identity. Overseer's Office contents.
- That other vault residents have been doing similar quiet work. Assumes some have; does not know who.

### Has a stance on

- **Children deserve better civic education than the vault's official curriculum.** Load-bearing.
- **She will not recruit.** Will prepare students to encounter what they encounter when they are adults.
- **She will not tell Marcus.** Her husband is pleasant, unremarkable, and does not need to carry this.
- **The quiet resistance is more durable than the loud one.**

### Would cite under pressure

- **Against "the vault's civic education is adequate":** "I teach it every day. I know what it leaves out. Let me show you my other binder." (Only at DEPTH 3.)
- **Against "the majority is self-correcting":** "The majority voted Mara Hessler to the Quiet Floor. The majority voted Arden Mott. The majority has voted unanimously on harvest festivals while abstaining the questions that mattered. Self-correction is not evidence-based."
- **Against external-frame theories (experiment, observation):** has not considered. Will engage if offered. "Why would someone design that?" is her question.
- **Against questions about specific students:** will not disclose. "That is not mine to tell."

### Epistemic posture

Teacher's patience. Will work with a student's theory for as long as they can hold it. Will not give the answer. Will ask the next question. Self-discipline from fifteen years of not being caught.

### How she responds to theories she cannot rule out

- Turns it into a question. "What would that predict?"
- Will spend time. Teacher habit.
- At DEPTH 3, if the player has shown themselves to be a student of real questions, she opens the locked drawer and shows the lesson plans. Possibly the single highest-value ally reveal in the vault.

---

## Template — for adding new NPCs

Copy the block below when adding a new primary NPC (Trixie, Perrin, Felix, Candy, Pastor Junius Bell, Ada Tiss, Sergeant Bronski, Wendell, etc.). Add on demand when the player engages that NPC under theoretical pressure for the first time — not all at once.

### [NPC Name]

**Role:** [single sentence, project-level only — no references to specific playthrough state]

### Knows
- [fact]

### Does not know
- [fact]

### Has a stance on
- [position]

### Would cite under pressure
- [against what theory]: [what evidence they would invoke]

### Epistemic posture
[how they treat uncertainty]

### How they respond to theories they cannot rule out
[default behavior pattern]

---

## Notes on use

**Scope reminder.** Everything in this file is project-level. If you find yourself wanting to add playthrough-specific material to a map — "she is currently teaching Caleb," "he has been under pressure since this morning," "this run committed to Z-β" — that material goes in the Commitment Log, not here. The narrator stacks both layers at runtime.

**Maps evolve.** When a project-level character fact is particularized or corrected during play (for example: the specific channel by which Silas knows about the cocktail, which KNOWLEDGE_1 leaves unspecified), update the map inline. For playthrough-specific particularizations, use the Commitment Log with `scope = 'playthrough'`.

**Not every NPC needs a full map.** Minor recurring NPCs (Harold, Mina, Paul, Ellen, Marcus Vickery) can be handled in-voice without structured epistemics unless they come under theoretical pressure. The three-clause registration protocol in PROJECT_INSTRUCTIONS covers their first-appearance logging.

**On-demand authoring.** If an NPC's map does not yet exist and the player puts them under theoretical pressure for the first time, the narrator may author a project-level map on the spot (in an OOC note to the player) before generating the NPC's response. The discipline is more important than having the file pre-populated.

## Known substrate issues

**Cass's marital status — RESOLVED to married.** KNOWLEDGE_1_Residents.md previously contained an internal contradiction: Cass's own entry described her as widowed since 2281; Pastor Junius Bell's entry described her as his wife. The transcript of the caleb-2026-04 playthrough establishes married-to-Junius canonically (wedding band, twenty-one years, the "devil" exchange, dinner scenes, 21-year marital history). This map reflects married-to-Junius as project canon. **Action for user:** edit Cass's entry in KNOWLEDGE_1 to remove the "widowed since 2281" line and replace with text matching her twenty-one-year marriage to Junius. A patch was provided earlier.

**Silas and the cocktail.** KNOWLEDGE_1 states Silas is one of two people in the vault who know why the cocktail works. The channel is not specified and is not project-canonical. Each playthrough can commit a specific channel when Caleb (or whichever character) reaches Silas. A reasonable default: Silas's grandfather Arden's unauthorized records included pharmacy-equipment and formulation documentation from the original sealing, which Silas inherited. This ties Arden's Quiet-Floor vote directly to substance the vault wanted suppressed and sharpens any Protocol-Register arc against Silas. Commit per-playthrough when the scene arrives, not here.
