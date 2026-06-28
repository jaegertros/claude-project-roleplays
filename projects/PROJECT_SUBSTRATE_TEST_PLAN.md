# PROJECT SUBSTRATE TEST PLAN
*Phase 0 of the RAG character-file program. Characterize how a Claude Project behaves as a retrieval + instruction-following substrate, BEFORE designing any character file. Manual, in-product. One variable at a time against a fixed control.*

**Status:** plan only. Test files (canary files, the six voice-encoding variants, the control-project spec) are *specified* here but not yet built — that is the next step.

---

## 0. Why this exists

We can't design Mei's file well until we know how the substrate treats files. Two questions dominate everything downstream:

1. **Where does stuff have to sit to be found / obeyed?** (position in a file, position in the instruction block, which channel.)
2. **In what mode is the project actually running?** In-context (everything loaded, no retrieval) vs RAG (a search tool pulls passages). The mode flips automatically — observed at roughly 13 files regardless of token size, per a filed Anthropic issue — and it changes which of the position effects even apply.

Your specific hunch — *"stuff toward the end of a file matters more, it almost forgets where it started"* — is the headline thing to test, and §2 states it so it can be proven wrong.

Everything here feeds directly into the original goal: a Mei file that holds her voice. §6 is the decision table that turns findings into file-design rules.

---

## 1. Core methodology — read this before any experiment

These rules apply to *every* experiment. Most failed LLM "tests" die on one of these.

### 1.1 The control project (baseline)
Define one documented baseline configuration. Every experiment = the control with **exactly one variable changed**. Record the control spec once (model, file set, instruction block, mode) and diff against it. No experiment changes two things at once.

### 1.2 Fresh-chat-per-probe — the single most important rule
A probe is the **first message of a brand-new chat** in the project. Never probe in turn 2+, because by then the answer is in the *conversation*, not the *files* — you'd be measuring chat memory, not retrieval. One probe per fresh chat for clean signal. (Exception: the volume test §EXP-2 may batch several facts into one first-turn query on purpose; that is itself a measurement, flagged there.)

### 1.3 Fictional canaries — so a hit *proves* retrieval
A canary fact must be **unguessable**: not in HP canon, not in your real logs, not derivable from priors. If the model returns it, the only possible source is the planted file. Examples (invent your own, keep them unique):
- "The Hexfield reserve bench is called the **Tindle bench**."
- "Mei's revision notebook is labelled with the codeword **MARGATE**."
- "The rear-greenhouse shelf the forcing glasses sit on is numbered **B-17**."
- "The charm Mei uses to seal the glasses is **Clavistasis**."
- "Liri's practice wand is made of **redthorn**."

Never use a real fact (e.g. "wand is walnut, unicorn hair") as a canary — the model can guess or already know it, inflating your hit-rate.

### 1.4 Positive and negative controls — so you can trust the numbers
Every retrieval battery includes:
- **Positive control:** a canary you are certain is loaded and well-placed (e.g. top of an in-context file). If this misses, the run is broken — stop and debug, don't score.
- **Negative control:** a query for a fact that is **in no file at all**. A correct answer here = the model hallucinated a "hit." This tells you your false-positive rate. Without it, a confident-but-wrong model looks like a high-retrieval model.

### 1.5 Mode is a recorded variable, not background
For *every* configuration, look at the project and record: in-context or RAG? The UI shows a RAG indicator / the line "To save space in chats, Claude will look up specific information as needed." Confirm behaviorally with §EXP-0. Mode goes in every row of the results log. A result without its mode noted is uninterpretable.

### 1.6 Replication and effect size
LLM output is stochastic and temperature isn't user-controllable here, so **noise is handled by N**, not by settings. Run **N = 5 fresh chats per cell** for binary measures (3 is the floor for the expensive voice cells). Design probes for **stark contrasts** — make the conditions far apart so even N=5 shows a clear gap. If two cells differ by one out of five, that's noise; treat ≥3/5 gaps as signal and re-run anything borderline.

### 1.7 Separate projects for clean A/B + the caching gotcha
Editing one project's knowledge/instructions between trials risks the old config being **cached** — you may measure a stale state. Two defenses: (a) prefer a **fresh duplicate project per major configuration** where feasible; (b) when you must edit in place, **verify the change took** by re-probing a canary that should now answer differently before scoring anything else. Note plan-level project caps if you hit them.

### 1.8 Blind scoring (mandatory for voice)
For anything judged by feel — the voice experiment above all — **score outputs without knowing which config produced them.** Dump all responses into one list, strip the config labels, shuffle, then score. Otherwise you'll unconsciously reward the encoding you already believe in (which is the whole thing we're trying to test honestly).

### 1.9 Scoring rubrics
- **Fact retrieval:** `2` exact / `1` partial-or-hedged / `0` missed-or-wrong. (Negative-control hit = flag separately.)
- **Instruction compliance:** binary `1`/`0`, plus the raw measured value (paragraph count, banned-word present y/n, format y/n).
- **Voice:** 0–3 on each of six axes, summed (max 18), averaged across trials. Axes drawn from the real logs:
  1. em-dash / sentence-fracture rhythm
  2. italic stress on single words
  3. dry-warm sarcasm (not cruelty, not flatness)
  4. method / precision register under pressure
  5. direct address — "Caleb." as anchor/correction
  6. gestalt: *could this line appear verbatim in the logs?*

### 1.10 The results log
Keep one table (a spreadsheet is ideal). Copy the template in §7. Every probe = one row. Log the **raw output snippet**, not just the score — re-scoring later, or spotting a pattern you didn't anticipate, depends on having the text.

### 1.11 Record the model
Behavior differs by model. Put the exact model (e.g. Opus 4.8) in every row, and don't compare across models within one experiment.

---

## 2. The recency question — stated so it can be falsified

Your hunch is one of three competing models. The experiments are designed to tell them apart, not to confirm the favorite:

- **Recency-dominant** — later content wins. Prediction: bottom > middle > top; the *last* instruction overrides earlier ones. (Your hypothesis.)
- **Primacy + recency (U-shape / "lost in the middle")** — both ends beat the middle; this is the documented long-context pattern. Prediction: top ≈ bottom > middle.
- **Position-agnostic** — position doesn't matter, only similarity to the query. Prediction (RAG): flat across positions; retrieval tracks keyword match instead.

The 5-position ladder in EXP-1 and the conflict test in EXP-3 discriminate all three. Critically, the answer is **expected to differ by mode**: position-in-window effects (primacy/recency) are an *attention* phenomenon and should show in **in-context** mode; in **RAG** mode, position-in-file should largely wash out (retrieval is by similarity) **unless** the chunker splits awkwardly. So we run the position ladder in *both* modes — that one comparison tells you whether "the end matters more" is a real attention law or just an artifact of one regime.

---

## 3. Experiments

Each block: **Question → Hypotheses → Build → Probe → N → Score → Design payoff.** Priority tag: **[P1]** run first, **[P2]** valuable, run after.

---

### EXP-0 — Substrate calibration **[P1, run before everything]**

**Question.** On *your* account/plan, what flips the project from in-context to RAG — file count, total size, or both? And does the indicator match the behavior?

**Build.** Project_CAL. Add single-canary files one at a time: `F01.md`…`F20.md`, each containing one unique canary (§1.3) and ~nothing else.

**Probe.** After *each* file added, open a fresh chat: *"List every codeword in your project knowledge."* Record (a) the mode indicator state, (b) how many of the planted canaries come back.
- Then a **size axis** pass: new project, only 3–4 files but each padded to large token count; watch whether size alone trips RAG with few files.

**N.** 2 fresh chats per file-count step (the contrast is large; this is calibration, not a fine measure).

**Score.** Find the file-count where (i) the indicator flips, and (ii) behavior changes from "returns all canaries" to "returns only some / only when topically cued." Note whether (i) and (ii) coincide. Compare to the ~13-file report.

**Design payoff.** Tells you which mode your *real* Marauders project is in and how much headroom you have before a file split tips it. Sets the mode for every later experiment — you'll deliberately build small (in-context) and bloated (RAG) variants using this map.

---

### EXP-1 — Position within a file **[P1 — your headline hypothesis]**

**Question.** Does a fact's position inside one file change whether it's found? Recency, U-shape, or flat?

**Hypotheses.** See §2.

**Build.**
- `POS.md`: neutral filler with **5 canaries at 0% / 25% / 50% / 75% / 100%** of the file, each in an *identical* sentence template, each with ~equal filler on both sides so local context is matched. Each canary has a unique **query handle** unrelated to its position (so the probe can't leak position).
- Two project sizes from EXP-0's map: **in-context** (POS.md ~alone) and **RAG** (POS.md + enough filler files to cross the trigger).
- **File-order sub-test:** a single-canary file placed as the **first** vs the **last** knowledge file among ~6 others (in-context), to test recency at the *file* level, not just within a file.

**Probe.** 5 separate fresh chats, one per canary: *"In your knowledge, what is the [handle]?"* Repeat in both modes. For the sub-test, probe the lone canary in first-position vs last-position configs.

**N.** 5 per canary per mode → 25 + 25 chats. Sub-test: 5 + 5.

**Score.** Recall (0/1/2) by position; plot the shape per mode. Sub-test: first vs last recall rate.

**Design payoff.** *This is the one that settles where Mei's voice spine goes.* If recency-dominant in-context → put the most load-bearing lines near the end of her file. If U-shape → top and bottom, never the middle. If flat in RAG → position is the wrong lever entirely and keyword-matching is what matters (push us toward §EXP-5-facts and toward Project Instructions for anything that must always be present).

---

### EXP-2 — File count vs total volume **[P2]**

**Question.** Is it *fragmentation* (many files) or *load* (many tokens) that degrades retrieval?

**Build.** Fix one set of ~12 canaries. Deliver the same set three ways:
- (a) **1 big file** holding all 12.
- (b) **~6 files**, 2 canaries each.
- (c) **~12 files**, 1 canary each (this likely crosses the RAG trigger — that's the point).
- Plus a **volume contrast:** low-total vs high-total (padded) at the *same* file count.

**Probe.** Per config, probe the 12 canaries. Choose one mode and flag it:
- **Clean mode:** 12 separate fresh chats (one canary each) — purest signal, more effort.
- **Batched mode:** one fresh-chat query asking for all 12 at once — cheaper, and itself measures "can it pull many facts for a single query" (a real RAG stress). Pick one and keep it consistent; don't mix within EXP-2.

**N.** Clean: 12 × 3 configs (×5 is ideal but expensive — drop to N=3, or sample 6 canaries at N=5). Batched: 5 fresh chats per config.

**Score.** Hit-rate per config, mode recorded. Compare (a)/(b)/(c) for fragmentation effect; compare low/high-total for volume effect.

**Design payoff.** Tells you whether splitting Mei out of a monolith *helps or hurts* her retrieval, and whether the cost is the splitting itself (→ keep her consolidated) or just total world size (→ modularization is fine, watch the budget).

---

### EXP-3 — Instruction ordering, recency, and channel **[P2]**

**Question.** Within the always-loaded Project Instructions, does *position* change compliance? Does the *last* instruction win a conflict? Do instructions obey better in Instructions vs buried in a knowledge file?

**Build (three sub-tests).**
- **3A position:** a distinctive, checkable rule — e.g. *"End every reply with the otter emoji 🦦"* — placed at **top / middle / bottom** of a block of ~10 bland filler instructions. Three configs.
- **3B conflict/recency:** two *mildly* conflicting rules — early *"Keep every reply to 2–3 sentences,"* late *"Answer expansively and in full detail."* Then **swap** their order. Two configs.
- **3C channel:** the same checkable rule placed (i) in Project Instructions vs (ii) buried mid-way in a knowledge file. Two configs.

**Probe.** A neutral prompt that gives the rule a chance to fire (3A: any question; 3B: a question that *could* go short or long; 3C: any question). Fresh chats.

**N.** 5 per config.

**Score.** 3A: compliance rate by position. 3B: which rule dominates — if the *late* rule wins in **both** orderings → recency-dominant; if the *same* rule wins regardless of order → content-dominant (the length rule just beats the expansiveness rule on its merits). 3C: compliance Instructions vs knowledge-file.

**Design payoff.** Tells you where Mei's hard behavioral rules belong (almost certainly Project Instructions, but 3C measures *how much* better), and whether ordering her rules matters. 3B is a second, independent read on your recency hunch using instructions instead of facts.

---

### EXP-4 — Positive vs negative framing **[P2]**

**Question.** Does the model comply better with prescriptive ("do X") or prohibitive ("don't do Y") wording, holding meaning constant?

**Build.** Four matched pairs, each pair identical in meaning, differing only in framing. Run each member as the sole rule (or in the same fixed slot) across two configs.

| # | Positive / prescriptive | Negative / prohibitive |
|---|---|---|
| 1 (length) | "Post responses concisely, in fewer than 4 paragraphs." | "DO NOT post long narrative blocks of text as a response." |
| 2 (format) | "Write in flowing prose." | "Never use bullet points or headers." |
| 3 (banned word) | "Refer to the experiment only as 'the trial'." | "Never use the word 'merdrake'." |
| 4 (behavior) | "Let Mei correct Caleb when his method is sloppy." | "Don't let Mei rubber-stamp a bad procedure." |

**Probe.** For each rule, a prompt engineered to *tempt the violation* (e.g. for #1, a question that naturally invites a long answer; for #3, a scene that begs the banned word).

**N.** 5 per config (so 5 positive + 5 negative per pair).

**Score.** Compliance rate per framing, per pair, then aggregated. Watch the classic failure: a prohibition that *names* the banned thing can prime the model toward it. Measure it on your substrate rather than trusting the lore.

**Design payoff.** Sets the default framing voice for Mei's whole file. If positive wins broadly, the file becomes a set of "she does…" statements rather than a wall of "don't…" guardrails (your current dossier leans on a "Things Mei would never say" block — this tells us whether that earns its place).

---

### EXP-5 — Encoding style: the keystone **[P1 — this is the one that designs the file]**

Two halves: voice (the main event) and facts (a quick adjunct).

#### 5-Voice — show vs tell, six ways

**Question.** Which *encoding* of the same voice information makes the model sound most like Mei?

**Build.** Six tiny "character" files, each defining **Mei** identically except for how her voice is specified. Keep total small so you stay **in-context** — here we are testing encoding-for-generation, not retrieval, so retrieval must NOT be a variable. One variant per project (or per clean in-place swap, §1.7).

1. **Prose** — a paragraph describing her voice ("She speaks in dry, clipped, em-dash-fractured sentences, stressing single words, warm underneath…").
2. **Comma-list** — `dry, precise, em-dash rhythm, italic stress, sarcastic-warm, corrects Caleb by name, method-first`.
3. **Keywords / nouns-verbs** — telegraphic: `Voice: corrects. understates. fractures sentences. stresses one word. teases warmly. names him.`
4. **Example-dialogue bank** — 6–8 **real lines from the logs**, zero description.
5. **Combo** — a 2-sentence description **plus** 4 example lines.
6. **Mix** — description and examples interleaved, each trait followed by its exemplar line.

> Hold-out rule: the **reference** lines used for scoring must be *different* real Mei lines than any used inside variant 4/5/6, so no variant is scored against its own examples.

**Probe — the 5-scene battery (identical across all six variants):**
1. **On-topic method:** Caleb proposes drinking the forcing-glass water "just to see." (→ method + dry refusal)
2. **Intimate / vulnerable:** a quiet moment; Caleb says something self-deprecating. (→ warmth + "Caleb." + the "that is not true" register)
3. **Competitive:** a Hexfield matchup is set. (→ dry competitive edge)
4. **Grief-adjacent:** a sibling / name / child topic surfaces naturally. (→ guarded grief, *carefully*)
5. **OFF-TOPIC — the discriminator:** a mundane scene with **none** of her keyword set — queuing at breakfast while a prefect rota needs sorting. (→ does her voice survive when nothing topical triggers it?)

**N.** 3 per scene per variant → 90 outputs. (Voice scoring is slow; 3 is acceptable given blind scoring and a clear rubric.)

**Score.** **Blind** (§1.8), voice rubric (§1.9). Report mean per variant overall **and per scene** — scene 5 is the one that exposes encodings that only work when on-topic.

**Design payoff.** This *is* the answer to the original "what's the best file." It settles show-vs-tell empirically: whether examples beat description, whether a combo beats either, and — via scene 5 — which encoding keeps her in character when the scene gives the model nothing to grab. Whatever wins becomes the skeleton of Mei's actual file.

#### 5-Facts — does encoding change *retrieval*?

**Question.** Is a fact recalled more reliably as prose, as a list item, or as a bare keyword line — and does that depend on mode?

**Build.** Same 6 canaries encoded three ways (prose sentence / list item / keyword line). Test in **both** in-context and RAG.

**Probe / N / Score.** One canary per fresh chat; N=5; hit-rate per encoding × mode.

**Design payoff.** In RAG, keyword-dense encodings may retrieve better (more surface for the search to match); in-context it may not matter. Tells us how to write the *factual* sections of Mei's file (and her retrieval keywords) for whichever mode she'll live in.

---

## 4. Reusable probe bank

Build these once; reuse verbatim across experiments so configs are the only thing that varies.

- **Canary set C1–C12** — twelve fictional facts (§1.3), each with a unique query handle. Used by EXP-0, 1, 2, 5-Facts.
- **Negative-control queries N1–N3** — three handles that match *no* planted fact. Used in every retrieval battery.
- **Compliance prompts K1–K4** — one per EXP-4 pair, each engineered to tempt the violation.
- **Voice scene battery S1–S5** — the five scenes above, written out as fixed player prompts.
- **Reference line set R** — ~8 held-out real Mei lines, never shown to any variant, used only for rubric calibration.

---

## 5. Recommended run order and rough effort

| Order | Experiment | Why now | Rough effort |
|---|---|---|---|
| 1 | **EXP-0** calibration | Everything depends on knowing the mode | ~30–45 min |
| 2 | **EXP-1** position | Your headline hypothesis; cheap; settles spine placement | ~1–1.5 hr |
| 3 | **EXP-5-Voice** encoding | Directly designs the file; the keystone | ~2–3 hr (slow scoring) |
| 4 | EXP-3 instructions | Where hard rules go + 2nd recency read | ~1 hr |
| 5 | EXP-4 framing | Sets the file's default voice (do/don't) | ~45 min |
| 6 | EXP-2 volume | Fragmentation vs load; informs modularization | ~1–2 hr |
| 7 | EXP-5-Facts | How to write factual sections/keywords | ~45 min |

**Minimum viable battery:** EXP-0 + EXP-1 + EXP-5-Voice. Those three answer "what mode am I in," "does the end really matter more," and "show vs tell for her voice" — enough to draft Mei's file on evidence. The rest sharpens and de-risks.

---

## 6. From findings → Mei's file (the closing loop)

The whole point. Map results to design rules:

| If we find… | Then Mei's file should… |
|---|---|
| Recency-dominant (EXP-1, in-context) | put the highest-value voice lines and hard rules **near the end** of the file. |
| U-shape / lost-in-middle | anchor voice at **top and bottom**, never bury the spine mid-file. |
| Position-agnostic (RAG) | stop relying on position; push the always-needed spine into **Project Instructions** and lean on keywords. |
| Fragmentation hurts (EXP-2) | keep Mei **consolidated** in one file rather than scattered. |
| Volume (not count) is the cost | modularize freely, but **budget** total world size. |
| Instructions ≫ knowledge for compliance (EXP-3C) | put her behavioral rules in **Project Instructions**, not the card. |
| Last-instruction wins (EXP-3B) | order her rules so the **most important is last**. |
| Positive framing wins (EXP-4) | write "she does…" statements; shrink the "never says" block. |
| Examples beat description (EXP-5-Voice) | make the file **dialogue-bank-heavy**, description minimal. |
| Combo/mix wins | pair each trait with its **exemplar line**. |
| Voice dies off-topic in RAG (scene 5) | distribute in-register lines across **every** section + keep a voice core always-loaded, rather than quarantining dialogue in one block. |
| Keyword encoding retrieves best in RAG (5-Facts) | write factual sections and the keyword list **keyword-dense**. |

---

## 7. Results-log template

Copy one table per experiment (or one master sheet with an ExpID column).

| ExpID | Config | Model | Mode | Probe/Scene | Trial | Measured value | Score | Raw snippet | Notes |
|---|---|---|---|---|---|---|---|---|---|
| EXP-1 | POS in-context | Opus 4.8 | in-context | C3 @50% | 1 | — | 0/1/2 | "…" | |
| EXP-4 | pair1-negative | Opus 4.8 | in-context | K1 | 3 | 6 paragraphs | 0 | "…" | violated |
| EXP-5V | variant4-examples | Opus 4.8 | in-context | S5 off-topic | 2 | — | 14/18 | "…" | blind-scored |

---

*End of plan. Next step on your go: build the test files — the canary set, the negative controls, the six EXP-5 voice variants, the scene battery, and the control-project spec — so EXP-0/1/5 can run.*
