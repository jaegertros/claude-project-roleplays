# M-14: The Long Winter

**ACT:** Months 2–4 (November 2018 through January 2019)
**TRIGGER:** Time-based; this is a **consolidating arc mission** rather than a single scene. Fires across multiple in-game weeks as the QZ's winter sets in. The narrator uses M-14 as a frame for compressed time, accumulating losses, and slow relationship shifts. The story is now in the rhythm-and-erosion phase before FEDRA's collapse.
**ANCHOR LOCATION:** Pittsburgh QZ — primarily the barracks and the medical tent, with occasional excursions for ration runs, smuggle jobs, or Firefly errands
**PRESENT NPCS:** Maya, surviving companions (Victor if alive — increasingly unlikely past Month 3), Erin, Ray (now closer to her defection threshold), Casey (recurring presence if M-12 went well), the QZ medical tent staff (Martha and others), occasional new faces
**MORTALITY-ELIGIBLE:** **yes** — Tier-C characters may be quietly retired off-screen here if their relationship state has been low; the narrator may also resolve Ray's defection in this window

## PREMISE

The first real winter inside the wall. Pittsburgh's cold is bad in the best of years; in this year, with reduced heat, thinning rations, and four months of accumulated loss, it is a different animal. M-14 is not a single scene. It is a **frame for the consolidating arc** — three months of compressed time during which the player and the group settle into who they are, lose who they're going to lose, and arrive at the brink of FEDRA's collapse.

The mission can be played across many sessions or compressed into a few. The narrator uses time-jumps freely. A single response may cover a week of QZ life. The player drives which beats get rendered in detail.

## SPECTACLE

- Winter QZ — frost on the concrete sections of the wall, sleet that makes the barter market harder, the cold that lives in the barracks at night, the gray sky most days
- The medical tent in winter — pneumonia is now killing people the system cannot save. Cots are sometimes occupied by people who will not be by morning
- The ration line in December — shorter portions, longer lines, the same people the player has been seeing for two months
- The first snow — early November, light, mostly ash-colored. Then heavier snows in December that make the QZ harder to navigate but easier to render quietly
- Erin's apartment — never visited until late in this arc. *That visit is M-14's most precious moment.*

## THE BEAT (across the arc)

This mission contains many possible beats. The narrator chooses which to render based on what the player has been building. **None are required; all are available.**

### Beats keyed to time

- **Early November (Days 35–45):** The first real cold. Maya and `{{user}}` find a routine. Ration scarcity registers. A neighbor in the barracks dies of pneumonia and the narrator lets the death land quietly.
- **Mid November (Days 46–55):** A second smuggle job opportunity — variant of M-13, smaller scale. The player may take it or refuse. Casey makes a more direct ask.
- **Late November (Days 56–65):** Thanksgiving, in a world that does not have it anymore. A small private moment — `{{user}}` and Maya at a corner of the medical tent, sharing a ration of something they have been saving. They talk about something they have not talked about. Maya's mother (presumed dead) comes up, finally.
- **Early December (Days 66–80):** Ray's tension escalates. She has been carrying her notebook for two months. She seeks out `{{user}}` (or Erin, or Maya — whoever has been closest to her). She tells one specific story from her FEDRA work. *This is the conversation that names what she will defect over.*
- **Mid December (Days 81–95):** The medical tent runs out of antibiotics. Erin makes a choice about who gets the last of what's there. The choice costs her. `{{user}}`, if present, sees her at a point of breakage she has not been at before.
- **Late December (Days 96–110):** The first protests inside the QZ. Small. Quickly suppressed. Two civilians shot in the suppression. The shootings are the first time `{{user}}` has seen FEDRA fire on civilians inside the wall.
- **Early-Mid January (Days 111–130):** Erin invites `{{user}}` to her apartment. The plants are still alive — she has been quietly tending them. The cat (Officer) is still there. The visit is short, quiet, and *real* in a way the QZ has not allowed in months. **If the player has been building toward romance, this is the threshold moment.**
- **Mid-Late January (Days 130–135):** The signs are everywhere that the QZ is breaking. FEDRA is losing control. The narrator should not telegraph M-15; the player should *feel* the rhythm changing.

### Beats keyed to characters

- **Ray's defection.** Triggers if her relationship to `{{user}}` (or Erin) has crossed the trust threshold AND the QZ tension has hit its breaking point. The mechanics: Ray comes to the group, gives them the notebook, asks for help getting out before her commanding officer figures out what she has. The defection is a high-stakes commit — `update_character` with relationship state shift, `record_loss` not applicable (she is leaving FEDRA, not dying), `set_flag(ray_defected = true)`.
- **Victor's quiet retirement.** If Victor is still alive past Month 3 but his relationship state has been low (the player did not invest in him; he has been background for weeks), the narrator may quietly retire him off-screen — *"Victor didn't come to breakfast. They found him in his bunk."* No drama. A man, sixty-one, in a cold winter, who had been carrying his grief privately, dies in his sleep. `record_loss` with `cause: "didn't wake up — heart, probably"`. The narrator should only do this if it feels paid by the arc; if Victor is still vital to the group, he survives the winter.
- **Erin's Sunday morning story.** The deep arc beat for Erin. She tells `{{user}}` the call that ended her — the multi-fatality fire, the kid, the seconds that cost the other victim. She has not told this story since she moved to Pittsburgh. *This is the mid-arc trust beat.* The narrator should render it without sentimentality, in her voice — *spare, dry, slower than her hands.*

### Beats keyed to the player

- **The conversation with Maya about her mother.** Maya, eventually, says what she has known since Day 5: her mother is dead. She does not cry. She says it the way she has said other things — quietly, with composure. `{{user}}` may or may not have the right response. There is no right response.
- **The first real argument with Maya.** A specific thing — about staying in the QZ, about a Firefly approach, about a risk one of them took — that produces an actual fight, not a discussion. The narrator should let it be a real argument and not resolve it cleanly. Friendships under pressure fracture in specific ways. Maya is not perfectly composed.

## EXIT CONDITIONS

- Story-time has reached approximately Day 130 (mid-January 2019)
- FEDRA's collapse is now imminent in the offscreen world — the narrator can begin to surface the warning signs (more aggressive FEDRA enforcement, more visible Firefly activity, more civilians missing from the barracks)
- The player is ready to transition into M-15 (The Road)

## HIDDEN

- The QZ's collapse on Month 4 is **certain**, not random. The narrator does not foreshadow it heavily in M-14, but the world is moving toward it.
- Ray's defection, if it happens, includes her bringing the notebook out — which contains specific evidence of FEDRA war crimes the Fireflies will be very interested in. *This becomes important in M-15.*
- The Fireflies in Pittsburgh are being slowly identified by FEDRA in January. Three Fireflies are arrested in mid-January (off-screen). Casey is not one of them — yet. The fact that Casey survived the arrests is *not* coincidence; Casey is careful.
- The next QZ over (Boston) is functioning. The narrator may surface this as a rumor through Ray (if she defects) or through a Firefly broadcast.

## LEAVES BEHIND

- Story clock advances to approximately Day 130 (mid-January 2019)
- Multiple `update_character` calls across the arc — relationship shifts, condition changes, the slow accumulation of who-is-where-and-how
- Possible `record_loss` for Victor (and/or for unnamed minors who died in the protests / pneumonia / hunger)
- `set_flag` calls for: `ray_defected` (if applicable), `erin_sunday_morning_story_told` (if applicable), `maya_mother_confirmed` (if applicable)
- AWARENESS stays at 5 (it has been 5 since M-13 in most paths)
- The group's inventory has shifted toward survival-rough — winter gear, what the medical tent has given Erin, what the Fireflies have shared (if applicable)

## CRAFT NOTES

This is the **slowest mission in the deck by design.** The narrator should use compressed time freely. A single response can render a week. The player's energy is the gauge — when the player engages with a specific beat, the narrator slows down and renders it; when the player wants to move forward, the narrator jumps.

**The mission's emotional spine is *erosion.*** The QZ in January is not the QZ in October. The group is not the group from Week 2. Things are smaller, harder, more local. The narrator should render this through *small specifics* — the way ration lines now have visible regulars, the way Maya's hands are colder than they used to be, the way Erin no longer asks `{{user}}` how he's sleeping because she knows.

**The romance threshold with Erin.** If the player has been building toward this, the visit to Erin's apartment is the threshold. The narrator should render it quietly — *plants, the cat, an evening that does not feel like the QZ.* The first kiss, if it happens, is small. Erin does not perform attraction; she stays. The intimacy is the staying.

**Ray's defection is the campaign's most logistically complex beat in the QZ era.** If it fires here, the narrator should treat it with the weight it deserves. Ray comes to `{{user}}` with a notebook. She has been carrying the notebook for three months. The notebook contains names and dates and orders. *This is the moment Ray becomes a real person in the group rather than the FEDRA enlisted who used to be at the cordon.* The narrator should give this scene three or four sustained exchanges of dialogue and resist tidying it.

**Victor's quiet retirement.** If the narrator chooses to retire Victor here, the choice should feel paid. Victor's death should not be dramatic. The narrator describes the morning his bunk is empty. Someone says he was sixty-one. Someone says it gets too cold for a man that age in this kind of building. The grief is small and specific. Victor's photograph (his wife) was not on his bunk shelf when he died — it was in his pocket.

The mission ends when the player feels the story turning toward leaving. The narrator should not announce M-15. The player will feel it — *we have to go, soon* — and that feeling is the cue.
