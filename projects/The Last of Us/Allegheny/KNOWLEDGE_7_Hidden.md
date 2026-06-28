# KNOWLEDGE_7_Hidden — Project Allegheny

The hidden material of *Project Allegheny*. The narrator pulls from this file to render the world consistently across reveals that the player has not yet earned. This file is the source of truth for the cause of the outbreak, the Firefly long-game, the named cast's deep hidden situations, key artifacts, and the trigger conditions that gate every reveal.

This file is RAG-retrieved only when a hidden thread is being approached — by player query, by trigger phrase, by AWARENESS-gated NPC interaction. Cross-references: cast index `KNOWLEDGE_1_Cast.md` and per-character `CAST_<NAME>.md` files (per-character hidden sections live here, not in the cast files); infection mechanics `KNOWLEDGE_4_Infection.md`; factions `KNOWLEDGE_5_Factions.md` (the Firefly long-game is partially documented in `FACTION_FIREFLIES.md` HIDDEN, which points here for full material).

---

## ⚠ The discipline — read this first every time

This file contains material the narrator must know but the player must discover. **The narrator never volunteers anything in this file unprompted.** Reveals require:

- **A trigger phrase** the player says (see §TRIGGER PHRASES)
- **AWARENESS gating** appropriate to the material's depth
- **Relationship gating** for NPC-personal hidden situations (the player must have earned the NPC's trust before the NPC speaks)
- **Artifact contact** for object-based reveals (the player must actually examine or scavenge the object)

When in doubt, the narrator stays bounded to what the player has earned. A partial reveal (one piece of a multi-part hidden thread) is *better* than a complete reveal volunteered too early.

**The narrator never names the existence of this file in-fiction.** This is a backstage document. The player should never sense its boundaries.

**Once a piece of hidden material has been revealed, it stays revealed.** The narrator updates MCP via the appropriate `set_flag` call (e.g., `cause_explained = true`, `fireflies_revealed = true`) and treats the material as common knowledge to characters who would now know. The narrator does not re-stage the same reveal multiple times.

---

## §CAUSE — what actually happened

**The outbreak's origin, in the order the world learned it:**

### The fungus

The pathogen is a mutated strain of *Ophiocordyceps* — specifically, a variant that crossed from arthropod parasitism to mammalian hosts. The crossing required a thermal-tolerance shift the fungus had not previously achieved. **The 2018 Southeast Asian summer was historically hot — the hottest on record for several countries in the region.** The temperature pushed the fungus past a thermal threshold that allowed it to remain viable at mammalian body temperatures.

This is the answer to *why now*. Climate is the trigger.

### The vector

The mutated strain established in **Indonesian agricultural soils** during the summer of 2018, initially affecting rice and cassava crops in three provinces. Indonesian agronomists noticed *unusual fungal patterns* in mid-August but did not connect them to the disease cluster that began appearing in Jakarta hospitals in early September.

The crossing to humans occurred through **mass-produced wheat flour** at a specific industrial mill in Jakarta — a facility that processed both Indonesian wheat (imported from Australia) and rice flour from the affected provinces. Cross-contamination at the mill produced infected wheat flour that was distributed regionally and exported internationally. The contamination went unnoticed because the spore load in any given flour bag was small, and the activation required digestion + warm-body conditions that the spores only survived inconsistently.

**Most infections came from consumption of bread, noodles, or other products made from contaminated flour in the two-week window before the outbreak became visible.** A smaller number came from direct bite transmission after the first hospital cases turned.

### The geography of the first cases

The mill's exports reached:
- Most Asian markets at scale
- Pacific Rim cities through bulk shipping
- The United States in *limited* quantities, primarily through specialty Asian grocery distributors and a single large bakery supplier that imported "premium" Asian flours

This is why the first US cases on Day 1-3 were geographically scattered (LA, SF, Seattle, Chicago, Atlanta) rather than concentrated. They were people who had consumed products made from contaminated flour, or travelers returning from Asia with active early-stage infection.

**Pittsburgh's first cases on Day 3 morning were:**
- A man who worked at a downtown bakery that used the imported flour
- Two travelers who had returned from a business trip to Singapore the previous Wednesday
- Three patients with no clear traveler-or-flour connection (probable food-court consumption of contaminated products)

By the time the CDC identified the fungal etiology in the last week before Day 1, the spore load in the food supply had already produced a cohort of infected people incubating across the country. The 11 AM CDC press conference on Day 3 was the public announcement; the actual recognition inside the CDC happened five days earlier.

### Why the world didn't see it coming

- The early Indonesian cases in late August were diagnosed as a **violent rabies variant** or **viral encephalitis**. The fungal etiology was not identified for nearly two weeks.
- The mill's contamination was not understood until the CDC's emergency response on Day 2 — and even then, the connection between specific flour batches and specific patient clusters was tentative.
- Climate change as an underlying enabler was identified later (Firefly research in 2019; widespread public acknowledgment never, because by then public acknowledgment of anything was over).

### How the player learns this

Multiple paths, none surfacing unprompted:

- **Caleb-the-microbiologist's professional knowledge** — if the player is the microbiology persona, the player may *deduce* parts of this from the CDC press conferences (which name the genus on Day 3) and from any flour-bag artifact the player encounters. The narrator can let Caleb's professional voice surface the deduction in dialogue, framed as the character's own thinking, never as narrator exposition.
- **Dr. Paxton's notebook** — if the player encounters Dr. Paxton (named-minor CDC field officer, encounter optional in late Year 1), the notebook contains specific dates and connections. Reading the notebook can reveal the entire CAUSE section over a long-scene engagement.
- **A flour bag artifact** — if the player scavenges a grocery store on Day 4-5 (per `MISSION_M07_The_Highway.md` adjacent scenes), an Indonesian-export-labeled flour bag in the bakery aisle is the kind of detail that, if `{{user}}` notices it and the narrator surfaces the label, can land the connection without naming it. Subtle. A noticing, not a reveal.
- **A Firefly research dossier** — at AWARENESS 5 with deep Casey trust (Month 3+ in M-14 territory), Casey may share a dossier that contains the Firefly's working theory of the outbreak's cause. The dossier is partial; it names the climate trigger, the Indonesian agricultural angle, and the flour vector, but does not commit to specific mill identification.

The narrator does *not* combine all of these in one scene. The cause emerges in pieces. The player who works for it gets the answer; the player who doesn't never quite gets it.

### What's still uncertain

Two things the narrator does NOT commit:
- **Whether the mutation was natural or accelerated.** Some Firefly material implies the fungal mutation may have been studied or partially synthesized in a research context (Indonesian agronomy research, possibly with international collaboration). The implication is in their dossier; the proof is not. The narrator should *not* surface this as confirmed unless the player has built specifically toward it.
- **Whether anyone outside Indonesia could have stopped it.** The Firefly position is "yes, with two weeks more time." The realist position is "probably not." The narrator should not resolve this question.

---

## §VACCINE — the Firefly long-game

### What exists

In Allegheny's window, the Fireflies are constructing a research facility at the former St. Mary's Hospital in **Salt Lake City** with the long-term goal of developing a Cordyceps vaccine or treatment from immune subjects. The facility is operational but underfunded; the research team is small (a handful of pre-outbreak immunologists and infectious-disease physicians who survived the early months); their methodology is *aspirational* and bounded by what they can do with limited equipment and limited subjects.

**As of Allegheny's Year 1 (September 2019), the project has not yet identified a confirmed immune subject.** The researchers have studied:
- Multiple post-bite false negatives (people whose bites were shallow enough or in locations that delayed turn; not actually immune)
- A small number of survivors of close exposure who were not actually bitten (lucky, not immune)
- Various rumor cases that did not pan out under examination

The project has *standing recruitment instructions* sent out to every Firefly cell: identify potential immune individuals; report them; if possible, route them to Salt Lake City via courier.

### What the Pittsburgh cell knows

Casey and the Pittsburgh cell have been told:
- The Salt Lake City facility exists
- The long-term project is research-focused
- The standing instruction to identify potential immune individuals
- That this work is *strategically important* to the Fireflies' future

Casey has *not* been told:
- The specific methodology the researchers are pursuing
- That the methodology, when an immune subject is found, would require the *destruction* of the subject's brain to study the colonization pattern (this is the central horror of TLOU canon's main story; it is true here but unknown to Pittsburgh)
- Specific Salt Lake City personnel

Casey personally believes the project is worth pursuing. They are uncertain about the methodology. If asked at AWARENESS 5 with deep trust, Casey's answer is *honest about what they know* and *honest about what they don't.* They will say: *"I don't know how it works. I know it matters. I know what I've been told to look for."*

### How the player learns this

- **From Casey at AWARENESS 5 with deep trust** — Casey may share what they know. The Salt Lake City facility name surfaces. The standing recruitment instruction surfaces. The vaccine goal surfaces. The horror of the methodology *does not* surface from Casey because Casey doesn't know.
- **From a Firefly courier or regional contact** — at extreme depth (Year 1+, sustained Firefly work), the player may encounter a courier with more direct knowledge. The narrator does not stage this lightly; it is a story-defining contact.
- **From a Salt Lake City artifact** — improbable in Allegheny's default scope, but if a player's route takes them west and they encounter Firefly material, partial documentation may surface.

### The immunity question — central rule

**The player's character is not immune in Allegheny's default scope.**

If the player wants their character to be immune, the narrator surfaces the failsafe immediately. Immunity as a story element rewrites the campaign's stakes. It is a thing the player must explicitly commit to, with negotiation, before the narrator runs with it. The narrator does not allow the player to *discover* they are immune mid-campaign as a fact the narrator was holding in reserve; that would be a retcon of the high-stakes-commit kind.

**If the player builds the story toward an immune NPC** — a stranger they encounter, a person Casey is protecting, a survivor in a road-era settlement — the narrator can run that thread *bounded by what the Allegheny window permits*. The immune NPC is the Fireflies' interest; the Fireflies will pursue. The narrator should not commit to whether the immune NPC's immunity is *real* (a true immunity) or *contingent* (a long-delayed turn, a bite the scanner missed, a misidentification) without explicit story-build.

**The vaccine project's horror beat — that producing a vaccine requires destroying the immune subject's brain — is a Year 5+ TLOU-main-story beat that the narrator should not surface in Allegheny's window** unless the player has explicitly built toward it. In default Allegheny, the immunity question stays *open and uncertain*; the player learns the Fireflies are looking but does not learn what they would do if they found.

### Why the Salt Lake City rumor matters

The vaccine project is the thing that makes the Fireflies *more than* an anti-FEDRA resistance. It is the thing that gives them a future. It is also the thing that introduces them to moral compromise on a scale the Pittsburgh cell does not yet know about. Allegheny's window is *before* the moral compromise has surfaced. The player learns the project exists; the player does not learn what it costs.

---

## §NPC SECRETS — per-character hidden material

Each named character carries hidden material the player must discover through earned dialogue. The narrator does not surface these unprompted. The material lives here, not in the cast files, so the cast files can be retrieved without spoiling hidden threads.

### MAYA

**Plan to leave academia.** Maya has been considering leaving her postdoc and academia in general for over a year. She is good at her work; she is also tired of it in a way she has not admitted to anyone, including herself. She was going to tell `{{user}}` during the visit. The outbreak interrupted.

**Family.** Maya's cousin in Jakarta is dead — confirmed by Day 5, though Maya has not let herself say it aloud. Her parents in Detroit went silent on Day 5 (Detroit's networks failed faster than Pittsburgh's). Maya has not had confirmation but has accepted it by Week 1. She does not talk about either.

**Triggers for reveal:**
- Academia plan: surfaces in M-14 territory if the player has built closeness and asks the right kind of question. Maya may volunteer it on a quiet evening in the QZ.
- Cousin/parents: surfaces in Month 2-3 if the player has been gentle, often in M-14 (the Thanksgiving beat). Maya's line, if she says it: *"I think they're gone. I think both of them. I think I've known for a while."*

**The narrator's discipline:**
- Maya does not cry in either reveal.
- Maya does not perform the grief.
- The reveals are *small* and *late.* The player who has been listening for two months will not be surprised by either, but will be moved by the saying.

### PRIYA

**Her father is sick.** Priya has not been home to Atlanta in eight months because she is afraid to see him. The methods exam she has been preparing for is a real exam; her ambivalence about grad school is real; but underneath both is the fact that she has been avoiding the trip home. By Day 1 she has not heard from Atlanta in five days. By Day 3 the call doesn't connect. By Week 2 in the QZ she has accepted that she will not see him again.

**Triggers for reveal:**
- Surfaces in M-13 territory (the smuggle job) or in M-14 territory if Priya is still with the group and the player has spent quiet time with her. Often on the Subaru drive — if Priya is driving and `{{user}}` is in the passenger seat and the conversation is slow.

**The narrator's discipline:**
- Priya talks faster when this lands, not slower. She gets more Southern. She does not stop driving.
- The line, if she says it: *"I haven't been home since spring. I told myself it was money. It wasn't money. I knew, you know? I knew."*

### ERIN

**The Sunday morning house fire.** Three years before the story opens, Erin was the EMT who responded to a multi-fatality fire in Pittsburgh. She was the one who realized one of the bodies was still alive — a child, a kid named Marcus Adelman, eight years old at the time. Erin made the triage call to load Marcus first; the decision cost seconds on another victim — a woman named Carla, 34, who did not survive. Carla had been alive when Erin arrived. Erin made the right call. Erin still cannot sleep through Sunday mornings.

Marcus lost his left leg from above the knee but lived. He is now eleven (in 2018), living with his grandmother in Munhall, attending school, prosthesis. Erin has never reached out to him or his family. Carla left a husband and a six-year-old daughter.

**This is the call that ended Erin in the field.** She moved to the Thunderbird three months after. She has not told this story to anyone in Pittsburgh.

**Triggers for reveal:**
- Surfaces in M-14 territory (the Sunday Morning Story beat) with deep trust. The visit to Erin's apartment is the threshold; the story may land then or in a follow-up scene. The narrator should not stage it on the first apartment visit.
- The reveal is *long-form* — three to five exchanges across one extended scene. Not a single monologue.

**The narrator's discipline:**
- Erin tells the story in her voice: spare, dry, slower than her hands. She does not perform it. She does not editorialize.
- The narrator does not narrate `{{user}}`'s reaction beyond physical detail.
- The story ends without resolution. Erin has not made peace with the call. She has decided to live anyway.

### RAY

**The Week 2 order.** This is the largest hidden situation in the cast. It deserves space.

During Ray's first week as FEDRA enlisted, she was assigned to a cordon scanner station on what would become the Sixteenth Street Bridge checkpoint. On her fourth shift — Day 11 of the outbreak, Week 2 — she scanned a young teenager. The strip turned dark. Bite-positive.

The teenager was thirteen years old. A girl. Name: **Maya Howson.** (The narrator should commit to this; the coincidence of name is real, not a writerly conceit — Maya Howson and Maya Chen are not the same person, but the name lands differently for Ray after she has come to know Maya Chen later.) Her family had been with her at the cordon — mother, younger brother. The mother demanded to know what was happening. The procedure for bite-positive removal was clear: the bite-positive is taken to the holding truck; the family is processed for entry to the QZ.

Ray followed procedure. She flagged the positive. The sector team came. The girl was taken — not violently; quietly, by two FEDRA enlisted, into a green truck at the south end of the bridge. The mother screamed. The younger brother did not understand. The mother was restrained when she tried to follow.

The truck took the girl to the holding facility off the south shore. The girl was killed there within an hour. Ray knew this would happen. She processed the next civilian in the line.

The bite, the scanner found later, was *on the foot*. A foot bite has a 12-to-24-hour incubation. The girl had been bitten that morning. She had a full day before turn. There was time to consider alternatives. Ray did not consider them. The procedure was clear. The procedure was followed.

Ray has been carrying this since Day 11. The notebook documents this case among others — the date, the location, the girl's name, the procedure followed. Ray writes the notebook because she has decided someone should know. She has not decided who.

**Triggers for reveal:**
- After Ray's defection (M-14 if it fires there; later if defection is delayed)
- Sustained scene with Ray alone or with one other trusted character
- The player asking — directly or indirectly — about the notebook or about what Ray did before defecting

**The narrator's discipline:**
- Ray's line, the canonical one (from her cast file, second dialogue example): *"I'm not telling you what I did. I'm telling you it happened. I want you to know I'm not pretending it didn't. That's the only part of this I can give you straight."*
- The narrator can run a longer reveal scene in which Ray *does* tell what she did — but only after the player has earned the version above and asked for more. Even then, Ray tells it without performance. The story is the same shape every time she tells it because she has *settled* into the shape.
- The girl's name should be rendered as *Maya Howson*, not as "the girl." If Maya Chen is present in the reveal scene, the narrator should *let the coincidence land without commentary*. Ray will not say "Maya." She will say "the kid." Maya Chen, hearing about it, will not name her own name. The coincidence is for the player, not for the characters.

### NOAH

**His wife, Maryam.** Noah was in Cleveland Heights when the outbreak hit; Maryam was at a hospital social workers' conference in Chicago. He has not seen her since Day 1. He has not had a call connect since Day 2. He has reasons to believe — Chicago's QZ collapsed in Month 2; refugees from Chicago were among the harder-hit populations; the specific hotel where the conference was held was reportedly destroyed in the first week. **He has not let himself prove it.** The not-proving is itself a kind of love.

**The cats.** Noah and Maryam had two cats — Pumpkin and Maddie. Noah buried them in his backyard on Day 5, after they had been in the bedroom three days without him being able to take care of them properly. He has not talked about either to anyone.

**Triggers for reveal:**
- The wife: surfaces only with the right kind of patience from the player. Most often in Month 6+ if Noah has joined the group. The lamp story is the entry — Noah remembers the kitchen lamp Maryam left on when he came home late.
- The cats: rarely surface. If they do, it's a half-line in a longer Maryam reveal. Noah does not bring up the cats independently.

**The narrator's discipline:**
- Noah's reveal is *quiet and brief*. He does not narrate the burying. He says one specific small thing — the lamp, or the way Maryam sang to one of the cats — and the rest is silence.
- Noah's canonical lines (from his cast file, second dialogue example): *"She used to leave the lamp on in the kitchen when I came home late. I'd see it from the corner. It's the part I think about. Not the rest. Just the lamp."*

### VICTOR

**The duffel.** Victor packed the duffel from his garage in 1972, after returning from his second Marine tour in Vietnam. He was twenty-five. He told himself he was packing it for "if things get bad here." For forty-six years they did not. He updated the duffel periodically — replacing ammunition, swapping out the medical kit when supplies expired — but he did not let himself remember why he packed it. M-08 (the garage) is the moment Victor remembers.

**His wife Eleanor.** Eleanor died of pancreatic cancer fourteen months before the story opens. The photograph on his shelf is from their honeymoon (Maui, 1981). They were married thirty-four years. They did not have children — they tried; it did not work; they made peace with it. Eleanor was a high school librarian. The Allegheny Cemetery has her marker.

Victor has not stopped grieving Eleanor. He has gone on. The outbreak gave him something to do that is not grieving. He has not noticed yet that this is a kind of relief he is ashamed of.

**Triggers for reveal:**
- The duffel: M-08 is the reveal. Victor does not fully explain; the player understands.
- Eleanor: the photograph is available in any scene at Victor's apartment. If the player asks, Victor answers briefly. If the player is quiet, Victor sometimes talks. There is a specific quiet evening in M-14 territory where Victor, if alive, may volunteer one sentence about Eleanor.

**The narrator's discipline:**
- Victor's reveals are *short*. He does not narrate.
- The Eleanor sentence, if it comes, is something like: *"She would have liked you, kid. She would have hated all of this. She would have liked you."*

### MIKE

**Loneliness.** Mike has not had a real conversation about himself in two years. The sales job, the road life, the wedding-circuit weekends — they are how he has avoided having to be alone with himself. He is *aware* of this in a way that has not produced action. He performs extroversion because the alternative is what he would have to look at if he stopped.

**Triggers for reveal:**
- Surfaces only in the Day 3-7 window before Mike's likely casualty in M-10. If Mike has a moment of dropped-volume with `{{user}}` — typically Day 4 evening in a quiet beat — he may say a real sentence about how he has been. If Mike dies before this moment, it doesn't surface.

**The narrator's discipline:**
- Mike's reveal is *one* unfinished sentence. *"I haven't — bro, I haven't been good. I haven't been good for a while. I don't — yeah. Yeah. Anyway."*
- The narrator does not stage this as a setpiece. It is a moment between two louder moments. The player either catches it or doesn't.

### SAM

**What he saw on Day 7.** Sam watched his mother turn. His mother was Lupe Mendez, 43, a hospital housekeeping supervisor at Allegheny General. She was bitten by a patient at the hospital on Day 6 evening, came home Day 7 morning, lay down. She turned in their living room with Sam in the kitchen making cereal. Sam ran. He has not stopped looking for his sister Marisol since.

**His sister Marisol.** Marisol is nineteen, his older sister. She left for college (Pitt) the previous fall. On Day 3 evening Sam tried to reach her — phones lagging. By Day 5 he had no answer. By Day 7 he had only the apartment. He left McKees Rocks with the rebar piece and his sister's old necklace.

**Marisol's tattoo:** a small line drawing of a bird (a sparrow specifically) on the inside of her left wrist. She got it on her eighteenth birthday. Sam mentions it because that is how he will recognize her body if he ever finds it — he does not say this part out loud.

**Triggers for reveal:**
- The mother: surfaces with deep trust, typically Month 3+ in M-14 territory. Sam will say one or two sentences. He will not elaborate.
- The sister: surfaces in late Month 1 to Month 3 in the QZ, when Sam has settled into the group enough to tell them what he is looking for.

**The narrator's discipline:**
- Sam's reveals are *fast-and-then-stopped*. He talks quickly, then stops, then changes subject. The grief is in the stopping.
- The mother story, if it comes: *"I was — yeah, whatever, she was — she came back from work and she — she just lay down. I was making cereal. For real. I was just — yeah. I ran. I shouldn't have run."*

### DRAKE

**Two removals.** Drake has, by Day 6, personally signed off on two bite-positive removals from the cordon — both processed to the holding facility, both killed there within hours. He has not asked what happens at the facility because he does not want to know. He knows enough to know.

**Triggers for reveal:**
- Drake's hidden material rarely surfaces. He is not built for confession. A scene of *prolonged* contact (rare; usually adversarial) might surface one acknowledgment.

**The narrator's discipline:**
- Drake's hidden material is *load-bearing for the player's understanding* but *not for Drake's character arc*. The narrator carries it. The player may glimpse it only through how Drake behaves — the moments when his procedure is *too precise*, the moments when his eyes do not meet the civilian's face. The narrator should not stage a Drake confession.

### Named minors with hidden material

- **WALTER** (the Thunderbird regular): his wife died fourteen months ago. He has been thinking about whether he is allowed to stop. The Indonesia coverage has been giving him company. He has not articulated this to himself. He dies of a heart attack on Day 3 evening, alone, in the Thunderbird bathroom.
- **ARLEN** (the ER nurse): she made the call earlier on Day 3 morning that the ER would not transport any further bite victims with police escort. The call was hers; the order came down through her chief of emergency medicine; the practical effect was that two civilians who could have been transported were not. She is carrying this when the player meets her at M-06.
- **DR. PAXTON** (the CDC field officer): the notebook. See §ARTIFACTS.

The narrator does not surface these unprompted. They live here for consistency in case they become relevant.

---

## §ARTIFACTS — objects that surface hidden material

Certain objects, if examined by the player, reveal hidden material directly. The narrator should let the player *notice* the object naturally; the narrator does not point to it.

### Dr. Paxton's notebook

Encountered only if the player meets Dr. Paxton (named-minor CDC field officer). The notebook contains:
- The CDC's strain identification from Day 1 (the Cordyceps mutation, fungal etiology)
- A list of confirmed early cases with locations and consumption histories
- A map of the Jakarta mill's export distribution
- Paxton's personal notes about the political decisions that delayed public announcement
- Three names of CDC officials he believes acted in good faith and three names he believes did not

Reading the notebook can reveal substantial CAUSE material in one extended scene. The narrator should let the player engage with it as a scavenge — the notebook is *not* read in a single response; the player examines parts of it across multiple turns.

### A flour bag at a grocery store

If the player scavenges a Pittsburgh grocery store or bakery on Day 4-5 (an opportunity that emerges naturally in M-07 territory or in the M-06b apartment lockdown if the player goes for supplies), the player may find:
- A wholesale flour bag labeled "PRODUCT OF INDONESIA — Sumber Pertama Mill, Jakarta"
- The mill name does not register without context
- A microbiologist `{{user}}` may register the connection (climate, geography, food vector) without being told

The bag is in the bakery section, behind the front counter, in a stack of three or four. The narrator should describe it as a *backdrop detail*; if the player looks specifically at the bakery supplies, the narrator surfaces the bag.

### Ray's notebook

Ray's operational record from her FEDRA service. Contents:
- Dates and locations of bite-positive removals she witnessed or participated in
- Notes on civilian deaths in the QZ from non-infection causes (suppressed protests, ration enforcement, medical neglect)
- Names where she knew them
- The Maya Howson case, documented in full

The notebook surfaces only post-Ray-defection, and only at her choice — she shows it, or she gives it. The narrator does not let `{{user}}` find it on his own; Ray controls when the notebook is seen.

If the notebook reaches the Fireflies, it becomes substantial intelligence — see `FACTION_FIREFLIES.md` for downstream implications.

### A specific medical journal in Erin's apartment

In Erin's bookshelf — a back issue of *Prehospital Emergency Care* from 2015. The issue contains a case report on multi-victim residential fires and triage decision-making. The case described is not Erin's case specifically — but the framework discussed is the framework Erin applied on the Sunday morning. The journal is a *prop*, not a revelation. A player who looks at it and asks about it may be led toward Erin's story by Erin volunteering. The journal does not name the call.

### Firefly research dossier

At AWARENESS 5 with deep Casey trust, Casey may share a partial dossier. Contents:
- A four-page summary of the Firefly's working theory of the outbreak's cause (matches §CAUSE, partial)
- A reference to the Salt Lake City facility's existence
- The standing instruction to identify immune individuals
- Three names that mean nothing to `{{user}}` unless the player has been building specific threads

The dossier is *physical paper*. Casey shows it; Casey does not let `{{user}}` keep it.

### A photograph in Victor's apartment

Already on his shelf. Not hidden — visible in any scene at Victor's. The photograph shows Victor and Eleanor on Maui, 1981. The narrator surfaces the photograph if the player looks at the shelf. Victor's response if the player asks: brief, see Victor's per-character section.

---

## §TRIGGER PHRASES — what the player would have to say or do

The narrator never reveals hidden material in response to vague gestures. Each piece of hidden material has *what the player would have to ask, say, or do* for it to surface. Below is the consolidated map. Many overlap with what is in individual character sections; this section is the dispatcher view.

### Cause-of-outbreak triggers

- "Cordyceps" + asking "where did it come from" or "what caused it" + AWARENESS 4+ → an informed NPC (Caleb's professional knowledge surfacing if `{{user}}` is the microbiology persona; a Firefly contact at AWARENESS 5; Dr. Paxton if encountered) may surface partial CAUSE
- Scavenging a grocery store with focus on bakery / supplies → may surface the flour bag artifact
- Encountering Dr. Paxton → notebook becomes available
- AWARENESS 5 + sustained Firefly contact + asking "what do you actually know" → Casey may share the dossier

### Vaccine / Salt Lake City triggers

- "Salt Lake City" / "the research facility" / "where are the Fireflies' headquarters" + AWARENESS 5 + Casey trust → Casey surfaces what they know (which is bounded)
- "Are people immune" / "is anyone immune" + AWARENESS 4+ + Firefly context → an NPC may acknowledge the rumor exists
- The player *being* immune is *not* a trigger; it's a story commitment requiring the failsafe

### NPC-personal triggers

- Maya's academia plan: surfaces with closeness + quiet evening + open-ended question about her work in M-14 territory
- Maya's family: surfaces with Month 2-3 + gentleness + a moment of vulnerability from `{{user}}` first
- Priya's father: surfaces in a long-drive scene or a Subaru beat in M-13 or M-14 + the right question (often *"why don't you call home?"* lands)
- Erin's Sunday morning: surfaces at Erin's apartment + trust + the medical journal noticed or a question about her old job
- Ray's Week 2 order: surfaces post-defection + the player asking about the notebook directly
- Noah's wife: surfaces in Month 6+ + the player has been patient + the lamp moment (improvisational)
- Victor's duffel: M-08 fires it
- Victor's Eleanor: photograph + quiet evening + question
- Mike's loneliness: requires a specific quiet beat with Mike in Day 3-7 window; if Mike dies in M-10, this never surfaces
- Sam's mother and sister: surfaces in Month 1-3 + trust + specific question

### General principle

The narrator should *recognize the shape of a trigger* rather than parse for keywords. A player who asks *"what was that hospital call you mentioned?"* is triggering Erin's Sunday morning even though "Sunday morning" wasn't said. A player who asks *"why didn't you go home to your dad?"* is triggering Priya's father even though "sick" wasn't said.

The narrator should also *resist* triggers that haven't earned their context. A player who, on Day 3, asks Erin *"hey, what's your deepest trauma?"* should not trigger the Sunday morning reveal. The question is right; the conditions are wrong; the reveal does not fire.

---

## §META — handling reveals that the player gets wrong

Sometimes the player's theory about hidden material is *partially correct* or *creatively wrong* in interesting ways. The narrator handles these:

- **Partially correct:** the NPC who would know acknowledges the part the player has right, gently. *"You're close. It wasn't the call you're thinking of. There was another one."*
- **Creatively wrong:** the NPC does not lie to validate; the NPC also does not correct as if the player has failed a test. The NPC engages with what the player said, then says what is true. *"No. It wasn't that. It was —"* and the story comes out as it actually is.
- **Wrong in a way that risks committing canon:** the narrator uses the failsafe. If the player proposes a theory that, if confirmed, would commit the story to material this file does not authorize, the narrator says (out of voice) that the thread is reaching past current scope.

The narrator *does not* gamify reveals. Hidden material is not a puzzle the player solves. It is what people carry. The player who shows up, listens, asks, gets to hear. The player who doesn't, doesn't.

---

## §HOUSEKEEPING — what this file does and doesn't commit

**This file commits:**
- The cause of the outbreak (climate-triggered Cordyceps mutation, Jakarta mill flour vector)
- The Firefly vaccine project's existence at Salt Lake City
- The standing recruitment for immune subjects
- Per-character hidden situations as documented above
- Specific artifact contents

**This file does NOT commit:**
- Whether the fungal mutation was natural or accelerated
- Whether the player is or could be immune (player commitment required)
- The horror beat of the vaccine methodology (Year 5+ territory)
- Anything beyond the Allegheny temporal window unless the player drives there
- The fates of named-minor characters beyond what `KNOWLEDGE_3_Timeline.md` and the mission files commit

**This file is the source of truth for hidden material.** Cast files reference but do not duplicate. Mission files cross-reference but do not duplicate. If a future addition adds hidden material, it goes here first; pointers go elsewhere.

---

## Final discipline note

The narrator's hardest job in *Project Allegheny* is the *not-telling*. The world is full of things the narrator knows that the player must discover. Every turn the narrator does not volunteer is a turn the world stays real for the player.

When in doubt, withhold. A player who never learns the cause has had a real campaign. A player who learns everything in three sessions has had a worse one.

The story is what the player walks through, not what the narrator knows.
