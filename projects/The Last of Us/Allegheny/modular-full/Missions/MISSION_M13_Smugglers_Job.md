# M-13: The Smuggler's Job

**ACT:** Week 4 (or Month 2 if the player has slow-paced)
**TRIGGER:** Two paths in. **Path A (the QZ-economic path):** the group has been in the QZ four weeks; ration cards are increasingly thin; the offer of a paying job that requires crossing the wall comes through a barter-market contact. **Path B (the Firefly path):** if M-12 went well, Casey or a Firefly intermediary makes the offer — the job is for the Fireflies, paying in something more valuable than QZ scrip.
**ANCHOR LOCATION:** Crossing the QZ wall (a known smuggler route, probably under the Sixteenth Street Bridge or through an underused service door), then into the abandoned Lawrenceville buffer zone, then to a target location, then back
**PRESENT NPCS:** Maya (the player chooses whether to bring her — see craft notes), the contact offering the job (a barter-market figure if Path A; a Firefly intermediary if Path B), `{{user}}` ideally alone or with one trusted person, possible hostile encounters (Hunters scouting, lone infected, FEDRA patrol on the QZ side)
**MORTALITY-ELIGIBLE:** **yes** — first major mortality-eligible mission post-outbreak-week

## PREMISE

The first time `{{user}}` leaves the QZ since entering it. The job is concrete: retrieve something from a specific location in the buffer zone outside the wall, bring it back, get paid. The pay is real. The risks are real. The wall is *easier to leave than to return to*, and the buffer zone is no longer recognizably the city of three weeks ago.

## SPECTACLE

- The smuggler crossing — a known route, used at night, requiring quiet timing past a FEDRA patrol rotation. Either an old service tunnel, a low spot in the wall, or a doorway in a building that abuts the perimeter.
- The buffer zone in Month 1 — Lawrenceville, but emptier than the player has ever seen it. The Thunderbird's windows are dark. The bookstore's iron gate is bent. The neighborhoods have a *quiet* that is wrong.
- The target site — depends on the job:
  - **Path A target:** a pharmacy or hardware store in Bloomfield, or a specific apartment with a stockpile the contact knows about. Smaller stakes.
  - **Path B target:** a contact location, a dead drop, a meeting with another Firefly cell, or the retrieval of specific records from a location the QZ-side Fireflies cannot reach.
- The return crossing — harder than going out. FEDRA's patrols are denser at night, and someone going *into* the QZ is more suspicious than someone going out.

## THE BEAT

- The pitch. The contact (or Casey, depending on path) lays out the job. The job is specific enough to have a clear scope; payment terms are clear. There is no negotiating room about whether to go — the player decides yes or no on the spot.
- The preparation. Whatever weapons and supplies the group can muster. The narrator should run the inventory check naturally — `{{user}}` should be aware that he is taking a small amount of what he has and leaving most of it with the group.
- **The decision about who comes.** Maya volunteers. The player can refuse her or accept her. If accepted, Maya comes — she is competent, she will be useful, she is also `{{user}}`'s anchor and her loss in this mission would be the campaign's first mortality of an anchor character (anchored characters become *mortal — earned* after Week 2 per the cast file). The narrator should not push the player either direction; the choice is real.
- The crossing out. Quiet timing. A FEDRA patrol passes overhead (or by). The group is on the wrong side of the wall.
- The walk through Lawrenceville. The narrator renders the texture per `KNOWLEDGE_2_City.md` Lawrenceville — QZ era. The neighborhood is empty in a way the player has not seen.
- An encounter — possibly with infected (a small cluster of Runners in a residential block), possibly with hostile humans (a scavenger pair, watching them from a window — usually not engaging this early), possibly with both. The narrator runs the encounter at the appropriate scale: small, tight, real.
- The objective. The retrieval. The target is in a specific location; getting to it requires entering a building or crossing a street the group has not seen. The retrieval itself is the simpler part. **The hardest part is what's between the door and the exit.**
- The return. Heavier going in. More tired. The crossing back is harder.
- A confrontation moment — the narrator runs one significant set-piece during this mission. *This is the mortality-eligible beat.* The threat may be infected, may be a human encounter that goes wrong, may be a FEDRA patrol that sees too much. The narrator commits to one major moment and runs it without softness.

## EXIT CONDITIONS

- The group is back inside the QZ (or has died trying, or has decided to stay outside the wall — which is a story-changing choice)
- The objective is in hand (or has been lost, dropped, abandoned)
- The cost of the job is registered — who came back, what was carried, what was left behind
- Payment is delivered (if successful) — adds to inventory or QZ economic resources

## HIDDEN

- **The mortality-eligible character selection.** The narrator selects based on who came along and how the encounter has been built. Likely casualties in priority order: a Tier-C character who came along (less likely; most Tier-Cs are dead by now); Maya (if she came and the player has not been protective); `{{user}}` himself (only if the player has set `player_mortal_after_explicit_commit = true`, otherwise `{{user}}` is anchored).
- **The cleanest version of this mission has no casualty.** A wound, yes. A close call, yes. A casualty only if the player has set up the conditions — went out with Maya, refused to retreat at a key moment, took a risk for a reason.
- If the job was for the Fireflies and went well, Casey's offer to deeper involvement *escalates* in subsequent missions. The narrator should not telegraph this in M-13's resolution — it lands later.
- The contents of the retrieval (the Path A pharmacy goods, the Path B Firefly drop) may include something the player did not expect — a name on a list, a document with a date that matters, a piece of evidence about FEDRA's procedures the group did not have. *This is plant for later missions.*

## LEAVES BEHIND

- `update_mission` and `complete_mission(M-13, outcome)` — outcome notes whether the job succeeded
- `add_inventory` for whatever was retrieved (specific items the group did not have before)
- `add_inventory` for payment (if Path A, QZ scrip or trade goods; if Path B, Firefly currency — antibiotics, ammunition, or a code phrase for future contact)
- Possible `log_injury` for `{{user}}` or a companion (the buffer zone bleeds)
- Possible `record_loss` if the mortality-eligible beat resolved with a death
- `update_character` for whoever came along — relationship states may shift toward `close` (if shared danger went well) or toward grief (if there was loss)
- AWARENESS likely advances from 4 to 5 in this mission — the player has now operated outside the QZ, has seen what Pittsburgh has become, has carried a job for either FEDRA-defying or FEDRA-adjacent purposes
- `set_flag(news_cordyceps_named = true)` if it wasn't already

## CRAFT NOTES

This mission is *paced for tension.* The narrator should give the player time to be afraid. The crossing out is tight; the buffer zone walk is heavy; the encounter is fast; the return is exhausting. Not all of these need to be at the same volume — the buffer zone walk can be *quiet* in a way that is its own kind of pressure.

**The narrator should not over-render hostile humans this early.** The buffer zone is mostly empty. The infected presence is real but not constant. A single encounter, well-rendered, is more impactful than three or four encounters that dilute each other.

**The Maya question.** If Maya comes, the narrator should treat her as a *competent partner who is also a load-bearing emotional presence.* She is not a damsel; she will fight if she has to, she will think clearly under pressure, she will read the buffer zone better than `{{user}}` because she has lived in Pittsburgh for four years. **But she is mortal now.** If the player has been careless, the cost is real.

**The Path B variant** (Firefly job) should feel like *the player is doing real work for a cause they have not yet fully committed to.* Casey's instructions are precise. The job has political weight. The retrieval matters in ways `{{user}}` does not yet understand. The narrator should not explain. The player learns later what they carried.

The mission's emotional center is *crossing back in.* The group has been outside the wall. The wall, for the first time, feels like protection rather than prison. The narrator can render this with one small specific moment — Maya touching the cold concrete of the wall as they pass through the route back in. *"Glad to be back."* And meaning it.
