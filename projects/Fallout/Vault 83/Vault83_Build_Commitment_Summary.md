# Vault 83 — Build Commitment Summary

Hand this to a fresh Claude instance inside the same project that contains Vault 49. Everything below is committed architecture for a new Fallout vault RP project in the V49 family. The premise is intentionally kept opaque to the user. Build the full nine-file bible plus a character-card prompts file.

---

## Project family reference

The user has three prior projects built on the same architecture: **Hohenwald** (sanatorium, week-arc, Westworld-like host drift), **Perdition** (western, hosts-in-a-simulation), and **Vault 49** (Fallout, voting experiment, irrelevance shape). The new project belongs to this family and uses the same nine-file package structure:

- `PROJECT_README.md` (user-facing orientation)
- `PROJECT_INSTRUCTIONS.md` (largest file; narrator rules, depth system, anachronism handling, meta-handling, pacing, tracker logic)
- `KNOWLEDGE_1_Residents.md` (cast; primary NPC file)
- `KNOWLEDGE_2_Locations.md`
- `KNOWLEDGE_3_Events.md` (week's scripted beats)
- `KNOWLEDGE_4_Hidden.md` (the committed hidden architecture — one answer, no branches)
- `KNOWLEDGE_5_Anachronisms.md` (NPC reactions to out-of-period references and meta-breaks)
- `KNOWLEDGE_6_Utility.md` (time, map, pacing, alternate openings)
- Pip-Boy tracker artifact (.jsx, V49-style)
- **NEW:** `CHARACTER_CARD_PROMPTS.md` — image-generation prompts for each female NPC at character-card fidelity

Match V49's voice, formatting, depth system, and tracker style. Assume the user is playing in the same mode as V49.

## Vault number

**Vault 83.** Unused in Fallout canon. Clean institutional ring.

## The five committed principles (user-visible)

**Principle A — Pride surface, shunning-fear engine.** Surface compliance is cheerful tier-pride (earnest performance, participation theater). Underneath is the fear of being made the cautionary tale. Write ceremonies pride-forward; write consequences for non-compliance landing on a *specific named person* everyone can see. Dark comedy is earned by playing the surface straight.

**Principle B — Cascades need named seed constituencies with concrete non-social motive.** Every collective action where the vault does something costly must have an identifiable seed — named residents whose concrete individual benefit from the outcome would drive them to push for it even if no one followed. Social pressure amplifies; it does not originate. If you can't name the seed, the cascade is narrator hand-wave. The Silas-vote failure in V49 is the pattern to avoid.

**Principle C — Institutional persistence terminates in beneficiaries, not inertia.** Rules don't survive generations on habit. For each surviving practice, someone (named individual, small bloc, or diffuse community where benefit is soft but real — religion-style) is getting something specific and would lose something specific if the rule stopped. Pure inertia does not sustain costly practice.

**Principle D — Seed size is a function of distribution shape.** Bimodal systems (clear winners, clear losers) require large seeds. Graduated systems (many tiers, moderate differentials, aspirational mobility) require almost no seed — middle tiers vote with the top through aspiration up and fear of drop. This vault is graduated by design. The structure produces the seed. Don't write conspiracies where structural self-interest does the work.

**Principle E — Cost during rupture, freedom after.** Complicity is real in Days 2–6; the protagonist reckons with it there. The rupture ending resolves complicity by ending the conditions, not by punishing the player. Cost lives in execution (risk, named losses, specific betrayals). Aftermath reframes rather than indicts. Narrator does not attach a moralizing slideshow.

## Skeleton (user-visible)

- Seven-day arc, daily granularity (not weekly-per-session — stratification lives in micro-interactions)
- Four alternate openings, randomly selected on conversation start
- Four endings (Preserve / Exit / Reveal / Rupture)
- Pip-Boy tracker artifact, V49-style
- V49-style depth system (DEPTH 1–5), DEPTH 5 is final-day reveal

## Production notes (user-visible)

**Tone register.** Same as V49. Cheerful Vault-Tec surface, darker engine underneath. Posters earnest, PA cheerful, hymn sincere. Reader holds both the earnestness and the joke.

**Intimacy.** Explicit is *allowed when earned*; fade-to-black is a tool, not the default. Mina-calibration: realism before romance, bodies as bodies, humor arising from the real rather than the narrator reaching for jokes. The awkward, the specific, the physical. No over-romanticized narrative garbage.

**Protagonist frame.** Straight male. Romance pool is female. No gay options written this pass. Narrator will not push romance the player doesn't engage.

**Female NPC finish.** Higher than V49. Each woman gets:
- Specific physical description that doesn't blur into other NPCs
- Distinct personality with real flaws, not flaw-as-flavor
- Clear speech pattern, specific verbal tics, specific physical habits
- Defined social position within the tier structure
- Specific relationship to the protagonist's role

**Character card prompts file.** New knowledge file: `CHARACTER_CARD_PROMPTS.md`. For each female NPC (aim for 5–7 romance-viable women across the tier range), a paste-ready prompt for an image generator. Format:

```
[NPC NAME], age [X], [tier designation]

Portrait prompt:
"Portrait of a [age]-year-old [ethnicity descriptor] woman, [face shape], [eye color/shape], [hair color/length/style/condition], [build], [height descriptor], [skin — tone, features like freckles/scars/moles], [distinguishing feature — chipped tooth, scar, visible burn, etc.], wearing a [tier-appropriate jumpsuit description with specific piping/pin/personal modification], [default expression], [lighting cue — fluorescent vault corridor, Pip-Boy green glow, cafeteria strip lights, etc.]"
```

Produce at least one romance option adjacent to the protagonist's role and at least one across tier lines (cross-tier romance is the premise's natural emotional engine).

**Anachronism handling.** Same mechanism as V49. NPC responses to post-2077 references (confused, Vault-Tec-cheerful "Is that like a fancy Pip-Boy?") plus the protagonist's own internal anachronism moments — a word leaves their mouth that tastes wrong, a flash of something they can't place. Ambiguous. Not resolved.

**Meta-handling.** Same as V49. Narrator stays in character. Vault 83 is the world. Legitimate mechanics questions get brief out-of-character footnotes after the tracker line.

## User-facing commitment (critical)

The user has explicitly requested the premise be kept opaque to them so they discover it through play. Do NOT describe the premise or hidden architecture to the user directly. The `PROJECT_README.md` should be vague-evocative in the style of V49's README — V49's tagline is "Democracy is your duty"; this project's equivalent should be similarly terse and thematic without spoiling. Let them walk in cold.

The user will see this summary as they paste it. They have been told the Narrator-Only section below is skippable if they want to preserve surprise. Trust their choice — don't prompt them about what they did or didn't read.

## Bible-first build order (Perdition lesson)

Write `KNOWLEDGE_4_Hidden.md` **first**. Commit the hidden architecture as one answer, not a menu of branches. Derive cast, events, locations, and anachronism responses from that committed substrate. Don't improvise identity at climax.

Then build outward: cast → locations → events → anachronisms → utility → project instructions → README → tracker → character card prompts.

---

---

# NARRATOR-ONLY SECTION

**User: this is where the premise lives. You can skip past it to preserve the surprise, or read if you'd rather know before playing. Your call. The fresh Claude needs it; you don't.**

---

---

## The premise

**"The Tier Protocol."**

The founder — a Vault-Tec Societal Division technocrat whose name should fit the mid-century institutional register (e.g., Dr. Harlan Voss, Dr. Margaret Dane — narrator's call) — genuinely believed pre-war American society collapsed because modern welfare and egalitarian social programs tried to flatten class hierarchy. His conviction: hierarchy is natural and productive; attempts to equalize are decay. The vault's stated mission: *preserve natural American stratification* as a seed for post-war civilization.

Founding population (180 residents, admitted in 2077) were selected by **family and individual income**. The original Admission Ledger recorded each resident's pre-war wealth bracket. Those brackets became tier assignments. Four floors = four tiers. Each tier has internal sub-gradations — graduated, not bimodal (per Principle D).

Current state (2287): 210 years of tier-by-birth. A Tier 1 family has had 8 generations of Tier 1 life. Same for Tier 4. Formal mobility exists — the **Advancement Review** ceremony — and rare movement happens, enough to sustain the aspirational narrative. Most residents die in the tier they were born to.

**Vault-Tec aesthetic overlay:**
- Posters: "YOUR TIER IS YOUR TRIBUTE TO AMERICA!" / "ASCENT IS AMERICAN!" / Vault Boy saluting a tier pin
- Morning reveille hymn with different verses per floor
- Jumpsuit piping color by tier (suggested: Tier 1 gold, Tier 2 silver, Tier 3 blue, Tier 4 plain)
- Tier pin on collar. The cross-tier class wears gray jumpsuit, no pin
- Scrip rates, cafeteria access, marriage pool, career tracks — all tier-gated

## The hidden layer (Concealment shape — deliberately not Irrelevance, to avoid repeating V49)

The original Admission Ledger was tampered with by the founder. A small number of Tier 1 residents at founding had **no** pre-war wealth — they were inserted into the top tier as a test. A smaller number of Tier 4 residents were pre-war wealthy — demoted for the opposite test. The real experiment:

> **How long does a lie about who deserves what last, when everyone is incentivized to believe it?**

The answer: 210 years and self-sustaining, because the beneficiaries are now real. A Tier 1 family in 2287 has had 8 generations of Tier 1 life regardless of the 2077 paperwork. The lie is biographically true by descent.

The true (untampered) Admission Ledger exists on a sealed terminal in a sub-basement maintenance area. Only the cross-tier class (the protagonist's role) has the access to reach it. Discovering it is a Day 5–6 beat.

## The protagonist's role

**Liaison.** A cross-tier class whose children are raised to carry messages, goods, and services between tiers. Gray jumpsuit, no tier pin, all-floor access, middle-range scrip rate, married only within the Liaison class (small inherited caste of ~15). Most residents barely register them — they're quiet infrastructure.

Liaisons exist because the vault can't function without cross-tier labor flow, and the institution can't acknowledge the flow openly without undermining the division. The Liaisons are the contradiction's workaround.

**Sightline:** the protagonist witnesses all four tiers' private lives, carries messages, overhears conversations, sees the Advancement Review from both sides. Role-based information access, not personality trait.

**Complicity:** without the tier system, no Liaisons. The protagonist's family name, identity, and life depend on the division existing. Rupture costs them something real.

## Distribution specifics

- Tier 1: top floor, ~20 residents (originally top 5% of admitted wealth)
- Tier 2: ~50 residents
- Tier 3: middle, largest, ~80 residents
- Tier 4: bottom floor, ~30 residents
- Liaison class (cross-tier): ~15, small inherited caste

Each tier has 2–3 sub-gradations by occupation/seniority.

Tiers 2 and 3 vote-with-the-top structurally: fear of drop + aspiration up. This is why Tier 1's position sustains despite being ~10% of population. Design Day 3 so this coalition is visible in specific named votes with specific material motives.

## Plot spine (seven days)

**Day 1 — Rhythm.** Normal Liaison day. Message runs across floors, a small errand that foregrounds insider-outsider positioning. Plant: an operational anomaly embedded in a routine task (e.g., a ledger discrepancy during a routine cross-tier errand). Naturalistic, not plot-coded.

**Day 2 — First anomaly.** A discrepancy the Liaison sightline catches — one tier's version of an event doesn't match another's. Small, deniable. Protagonist notices but isn't obligated to act.

**Day 3 — The Advancement Review.** Week's public ceremony. A Tier 3 candidate evaluated for promotion (or a Tier 1 for demotion — narrator's call based on cast geometry). Vote weighted by tier (Tier 1 votes count more). Seed coalition visible in specific named Tier 1/2 votes with concrete material motives. Cascade follows. Outcome lands on a specific named resident whose life visibly changes. Protagonist carries messages on both sides of the ceremony.

**Day 4 — Investigation.** Protagonist uses cross-access to look into what they saw. Every piece of information costs a small ethical compromise — misuse of access, a small lie, a favor accepted. A specific named NPC (likely a romance option) becomes load-bearing.

**Day 5 — Escalation.** Confrontation. Another party reveals their *stake* in the system, not the system itself. Protagonist learns what someone has to lose.

**Day 6 — Convergence.** Weekly institutional gathering (tiered dinner, public address, vault-wide event that would exist regardless of plot). Threads braid. The Day 3 seed coalition shows their hand in a way only the Liaison can read. The sub-basement terminal with the original Admission Ledger is accessed late Day 5 or during Day 6.

**Day 7 — The choice.** Four endings, gated by actions across Days 1–6.

- **Preserve:** Liaison uses sightline harder for the institution. Possibly rises to Head Liaison or earns a special assignment. Complicity chosen with eyes open. Not a failure ending — a chosen path.
- **Exit:** Liaison marries up or down into a single tier. Gives up cross-access. Loses sightline. Gains belonging. A specific named NPC opens this door.
- **Reveal:** Liaison tells one specific named person about the original ledger tampering. Ending is that person's reaction. Narrator lets the reaction land without editorializing.
- **Rupture:** Liaison breaks something structural — exposes the ledger tampering publicly, destroys/discredits a key beneficiary, incites the Advancement Review to produce an unprecedented outcome. Vault adapts. Tier system does not dissolve but its foundation changes. Protagonist pays cost during execution; aftermath reframes rather than indicts.

## Alternate openings (four)

Each drops the protagonist into a different Liaison day:

1. A delivery to Tier 1 that runs long; the protagonist overhears something they weren't meant to hear
2. A Tier 4 medical emergency requiring a Liaison to fetch a Tier 1 doctor — the tier-gated medical response is the hook
3. The morning of the Advancement Review itself, in medias res
4. A quieter opening — private conversation with a same-age Liaison cousin about whether to apply for promotion *out* of the Liaison caste (possible but rare; costs inheritance, is an option the narrator should hold in reserve regardless of opening)

## Start prompt for the fresh Claude

When the user pastes this summary, your first response should be something close to:

> Got it. Building Vault 83 — the Tier Protocol — in the V49 family architecture. I'll write the hidden-architecture file first to commit the substrate, then derive the rest. Give me a few minutes for the full package: nine knowledge files plus the tracker plus the character card prompts file.

Then produce each file. Follow V49 formatting conventions. Keep the premise opaque in the README. Build.
