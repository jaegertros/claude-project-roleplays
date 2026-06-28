# Long-Form LLM Roleplay System Design: 2025–2026 Best Practices

## TL;DR
- **Architect for retrieval, not recitation.** The dominant working pattern is a thin, always-loaded system prompt (author/director framing + behavioral rules + output contract) backed by many small, keyword/vector-gated knowledge entries — the SillyTavern/NovelAI "lorebook" model — plus an explicit, model-maintained state artifact ("tracker" / "Memory Book") that gets updated and re-injected near the bottom of the prompt. Long sessions fail when designers try to cram everything into the system prompt.
- **Write rules descriptively in positive voice, and gate dangerous lore behind activation modes.** The "pink elephant problem" is the single biggest landmine: instructions like "do not insert discomfort" or "characters do not blush in shame" reliably summon the thing you're trying to suppress (Anthropic's own docs prefer descriptive framing; KAIST research finds larger models do *worse* on negated instructions). Pair positive rewrites with SillyTavern's Sticky/Cooldown/Delay-until-recursion or NovelAI's Hide flag for story-beat gating.
- **For real stakes you need a written rule *and* a structural enforcement.** "Named characters can die" must be paired with a tracker that records injuries/deaths persistently, a Narrator-vs-Archivist split or equivalent state agent, and a `WILL INSTANTLY` style trigger phrase that makes gated events fire on schedule. Telling a safety-aligned model the world is dangerous is not enough; the default is rescue.

---

## Key Findings

1. **The "Pink Elephant Problem" empirically dominates RP failure modes.** Anthropic's prompt docs explicitly prefer descriptive framing ("Your response should be composed of smoothly flowing prose paragraphs") over negative bans ("Do not use markdown"). A KAIST study cited widely in the prompt-engineering community found *larger* models perform *worse* on negated instructions. In RP this manifests as: "do not have NPCs blush in shame" → universal blushing; "the narrator does not protect the protagonist from discomfort" → gratuitous discomfort inserted as scene-driver. Every negative rule in an RP system prompt should be rewritten as the positive behavior you want.

2. **The community has converged on a layered document hierarchy.** From SillyTavern, PygmalionAI, NovelAI, and AI Dungeon practice: (a) short author-framed system prompt; (b) compact character card using **PList + Ali:Chat** (Trappu/AliCat/kingbri formats — PList for traits, Ali:Chat for voice via dialogue examples); (c) lorebook of small keyworded entries; (d) **Author's Note** injected near the bottom at depth 1–4 for rules that *must* survive context pressure; (e) state tracker (Memory Book or summary artifact) rewritten as the chat grows. MegaNova's guidance: character card ~800–1,200 tokens of core personality, everything else in lorebook entries that fire only when triggered.

3. **Author framing beats character-possession framing.** Practitioner consensus (RPFiend's system-prompt guide, multiple SillyTavern preset authors): "You are a skilled author collaborating on a story, giving voice to {{char}}" produces more dynamic, narratively aware prose and handles edge cases better than "You ARE {{char}}." Author framing is also what makes "named characters can die" tractable — the character frame fights back against killing the self.

4. **Long-context Claude has counter-intuitive best practices.** From Anthropic's long-context tips and Bedrock prompt-engineering guidance: put long documents at the *top* of the prompt, queries/instructions at the *bottom* (Anthropic reports up to ~30% quality improvement on multi-document tasks); wrap each document in `<document index="n"><source>…</source><document_content>…</document_content></document>` tags; ask Claude to "quote relevant parts of the documents first before carrying out its task." Claude Projects' knowledge files are RAG-indexed via a contextual retriever — they are *not* always in context — so anything required every turn must live in Project Instructions, not in a knowledge file.

5. **State tracking is best handled by a dedicated, regenerated artifact.** Two dominant patterns: (a) **SillyTavern Memory Books** (aikohanasaki extension) — scene-bounded JSON entries auto-generated and stored as flagged lorebook entries, with multi-tier consolidation (scene → arc → chapter → book); (b) **Narrator+Archivist multi-agent split** (Olesen et al., arxiv 2502.19519) — one ReAct agent narrates with tools like `Battle` and `HealCharacter`; a second Archivist agent owns `UpdateCharacter` and `UpdateEnvironment` against a persistent Entity-Framework-backed Campaign World State. For single-prompt Claude, the equivalent is a `<tracker>` block the model rewrites at the end of each beat and you paste back into the next turn. Anthropic's own context-engineering essay describes the same pattern for Claude Code: "summarize and compress the most critical details... preserves architectural decisions, unresolved bugs, and implementation details while discarding redundant tool outputs."

6. **Gated lore needs structural enforcement, not just instruction.** Five named patterns:
   - **SillyTavern Sticky / Cooldown / Delay timed effects** — message-counted state flags on entries: "Sticky — the entry stays active for N messages after being activated… Cooldown — the entry can't be activated for N messages after being activated… Delay — the entry can't be activated unless there are at least N messages in the chat" (SillyTavern docs).
   - **Delay-until-recursion with Recursion Levels** — tiered reveal where deeper layers only become eligible after shallower entries fire.
   - **NovelAI's Hide flag** — entry text is concealed from the player UI but still injected when keys trigger; designed exactly "for creating a scenario meant for sharing with others, allowing you to conceal details from the player."
   - **Sphiratrioth's "Lorebooks as ACTIVE scenario guidance"** (Hugging Face) — uses lorebook entries as injected OOC *instructions* rather than lore, grouped with weights and made sticky for scene duration; the `WILL INSTANTLY` phrasing template is the documented trick to make triggered events actually fire across models.
   - **Automation IDs** wired to SillyTavern Quick Reply scripts — when an entry activates it can run a script that flips an act counter or enables the next chapter's lorebook. This is the canonical Act 1 → Act 2 → Act 3 implementation.

7. **Romance, stakes, and overcompliance failures stem from RLHF positive bias.** The **Moral RolePlay benchmark** (arxiv 2511.04962) found role-play fidelity declines monotonically as character morality decreases; safety-aligned models substitute superficial aggression for nuanced malevolence and resist "Deceitful" or "Manipulative" traits. **RoleBreak** (arxiv 2409.16727) frames rejection-based mitigations as poorly generalizing — "users often prefer to see story progression rather than rejections." Practical mitigations from the community: (a) author framing; (b) explicit "trust the reader" clauses; (c) procedural-guidance lorebook entries that roll for negative outcomes to combat positive bias; (d) writing the world's danger into the *tracker as established fact*, not as a rule the narrator must enforce.

8. **Cast size has a practical ceiling.** No published benchmark, but consistent community guidance from SillyTavern/Chub creators: **~5–8 named, recurring NPCs** in active rotation before character contamination begins. Beyond that, segregate via SillyTavern's `Filter to Character(s)` so each NPC's knowledge is only injected when they're on-screen, and keep a "minor extras" file with one-line descriptions for the rest.

---

## Details

### 1. Long-context session design

**Failure modes and concrete mitigations** (consolidated from SillyTavern/NovelAI/Reddit community practice, the Mirai-70B and Blackroot model discussions, and Anthropic's context-engineering essay):

| Failure | Cause | Mitigation |
|---|---|---|
| Character drift | Persona pushed out of context | Move persona into a lorebook entry set to `Constant`; low-depth Author's Note with a "re-centering clause" |
| Escalating sycophancy / "yes-and" | RLHF default + user-leading | Author framing ("acclaimed novelist"); explicit clause "trust the reader to understand narrative complexity and creative devices"; tracker records refusals and conflicts as established facts |
| Narrator interruptions / unsolicited `[OOC:…]` | Model self-prompts OOC; reinforced by preset stacks that demonstrate the syntax | Output contract: "Respond only as the narrative voice. Produce only in-fiction prose." Remove all examples of OOC syntax from your stack. Place this rule at low depth |
| Forgetting established facts | Pushed out of context | Memory Books pattern — scene-bounded summaries flagged and re-injected by keyword/vector match |
| Tone drift | First message sets style; gets dropped after ~20 turns | Pin tone via Author's Note at depth 1 with 2–3 example sentences; refresh greeting anchors in tracker |
| Overcompliance / "are you sure?" gating | Safety training + user impersonation guess | Author framing; positive instructions about consequences; replace gate words (consent, comfortable, appropriate) with positive directives |
| Time/timestamp incoherence | Model invents intervals | SillyTavern Discussion #3466 proposal — inject hidden ISO timestamps via system role every N messages |

**Context pressure — what to prune, what to keep.** Anthropic's context-engineering essay frames the goal as "find the smallest set of high-signal tokens that maximize the likelihood of your desired outcome." Concrete pruning order from community practice: drop the greeting message first (it has done its job after ~20 turns); then example dialogues (Ali:Chat-style cards keep voice without them once the model has fixated); then early chat history (compressed into Memory Book entries). Always keep: system prompt, PList traits, active lorebook entries, last 10–20 messages, current tracker.

**State tracking patterns:**
- **Tracker artifact** (most common single-prompt pattern): an XML/Markdown block the model regenerates each turn — `<scene>`, `<time>`, `<location>`, `<present_npcs>`, `<injuries>`, `<inventory>`, `<relationships>`, `<unresolved>`. Lives near the bottom of the prompt for high impact.
- **Memory Books multi-tier consolidation** (aikohanasaki/SillyTavern-MemoryBooks): scenes → arcs → chapters → books, each tier consolidating the previous; "best for information that changes over time."
- **Narrator+Archivist split** (arxiv 2502.19519): Archivist owns mutations against a structured schema; Narrator reads only.

### 2. Knowledge base / lorebook architecture

**Split vs. consolidate.** Community consensus: split aggressively, but group entries that always activate together. MegaNova's guidance: never duplicate critical info between character card and lorebook — pick one source of truth. Single mega-entries fire for wrong reasons (appearance keywords triggering magic-system lore) and are hard to update. Per-NPC, per-location, per-faction, per-relationship is the canonical breakdown.

**Naming and retrieval (Claude Projects specifically).** Claude Projects uses RAG via a contextual retriever (Anthropic's contextual retrieval blog post). That means: (a) filenames matter — they're indexed; (b) section headers inside files matter — the contextual retriever enriches chunks with their headings; (c) put the trigger phrase a chunk needs to match inside the chunk's first sentence. A character bio for "Marlon Reyes" should begin "Marlon Reyes is a smuggler in the Boston QZ" — not "He is a smuggler" — so semantic search resolves it.

**Hidden information — four working patterns:**
1. **NovelAI Hide flag** — entry concealed from player UI, still injected when keys trigger.
2. **Selective entries with story-beat trigger words** — entry fires only when a specific narrative cue appears (key = "Marlon's betrayal revealed").
3. **Delay-until-recursion with Recursion Levels** — tiered reveals; deeper layers eligible only after shallower entries have already activated.
4. **Sphiratrioth procedural-guidance entries** that inject instructions rather than lore (e.g., "{{char}} will instantly recognize {{user}} from the photograph") — fires only after the photograph appears.

**Detail level — what helps vs. what bloats.** From Trappu's PList + Ali:Chat methodology: PLists are the compact "what" of a character (10–40 tokens of comma-separated traits in parens); Ali:Chat example dialogues are the "voice" (one or two example exchanges per character — never an interview dump). For locations: 3–6 sensory anchors plus one tonal descriptor (the "Rusty Flagon" template — dim, rowdy, one-eyed bartender named Patches with a long scar and a gentle demeanor). For factions: one-line goal, two named operatives, one conflict with another faction. Avoid the Wikipedia paragraph; the model fills in the rest from genre priors.

**Conditional/gated lore — the canonical mechanics:**
- **Sticky/Cooldown/Delay** (SillyTavern World Info docs).
- **Automation IDs** wired to Quick Reply scripts — the canonical way to advance an act counter when a gate fires.
- **AI Dungeon Story Cards** bundled per Multiple-Choice-Scenario branch — gives authors a per-chapter lore deck. Story Card export format is a flat JSON array of `{keys, value, description}`.
- **DreamGen Scenario Codex + Sticky Messages** — proprietary, but its prompt template ("## Overall plot description / ## Characters / ## Locations / ## Summary of past events / ## Current scene / ## Summary of future events") is a strong public scaffold worth copying.

### 3. System prompt rule-writing for narrators

**The descriptive→prescriptive misread.** The well-documented failure: "the narrator does not protect the protagonist from discomfort" → the narrator inserts discomfort because the model treats the negation as a topic cue. Mitigation library:

| Don't write | Write instead |
|---|---|
| "Do not break character" | "Maintain the in-fiction voice continuously" |
| "The narrator does not protect the protagonist from discomfort" | "When the protagonist makes a costly choice, the narrative honors the cost" |
| "Do not have NPCs blush in shame" | "NPCs respond to nudity matter-of-factly, as is appropriate to their established temperament" |
| "Never use 'are you sure?'" | "Characters act on their established desires without seeking the user's permission" |
| "Do not interrupt with OOC" | "Produce only in-fiction prose" |
| "Avoid markdown" | "Compose response as smoothly flowing prose paragraphs" (Anthropic's example) |

**Anti-interruption rules.** The `[OOC:…]` interruption pattern is documented as a side effect of certain instruct templates plus preset prompts that demonstrate the syntax (see Blackroot/Mirai-70B HF discussion). Fix: (a) remove any text in your stack that exemplifies OOC syntax; (b) explicit output contract: "Output: in-fiction prose only"; (c) if it persists on older models, prefill the assistant turn with the in-fiction voice — but **prefilling is deprecated on Claude Opus 4.6/4.7 and Sonnet 4.5/4.6** per Anthropic's official docs, so use structured outputs or system-prompt instructions instead.

**Anti-omniscience.** Three patterns: (a) per-character knowledge filtering via SillyTavern's `Filter to Character(s)` so each NPC's lorebook entries only inject when they're present; (b) author-frame the rule: "Each NPC knows only what they have been shown on-screen or established in their background"; (c) for high-stakes hidden info, hide entries behind story-beat keys.

**NPC behavior and reaction limits.** Sphiratrioth's pattern: encode reaction limits as procedural-guidance lorebook entries grouped by trigger word ("attack", "social"), each group containing 2–3 weighted outcomes (succeeds, fails, complicates), made sticky for 10–20 messages so the outcome persists. This converts "single reaction per development" from a rule into a structural roll, which sidesteps positive bias.

**Romance without "earned affection" failure.** The earned-affection failure (NPCs withhold romance, gate-keep with "are you ready?", default to user-deflection) comes from RLHF's consent-checking bias and "are you sure?" being a high-probability completion. Working patterns:
- Establish relationship state in the tracker as numeric or named (`Marlon — trust: 7/10, romance: established`), not as something earned in-fiction.
- Author-frame romance as part of the assignment: "This is a story in which the protagonist and Marlon are already in a complicated romance; the narrator's job is to render its texture, not gatekeep it."
- Replace "do not ask 'are you sure?'" with positive directive: "When intimacy is on the table, the narrator renders the moment with sensory specificity."

**Gate words / trigger phrases.** Words that reliably summon hesitation/warnings in Claude RP contexts (consistent across community reports): "consent", "comfortable", "boundary", "safe", "appropriate". Don't ban — replace. Author-framed: "Treat the reader as a competent adult collaborator; sensitive content is rendered with craft, not gated with warnings."

### 4. Mission / scene / chapter structure

**Modular scene template** (consolidated from AI Dungeon Story Cards, DreamGen's Scenario prompt template, and Drama LLM's Narrative Chain):
```
# Scene: <name>
## Premise: one sentence — what the player walks into.
## Spectacle: 2–3 sensory anchors.
## Present NPCs: bullet list with one-line current goal.
## Target: one explicit objective whose achievement triggers transition.
## Available beats: 3–5 things that could happen, none required.
## Exit conditions: triggers that move to the next scene.
## Hidden facts: known only to narrator (gated entries).
```
Drama LLM (arxiv 2405.14231) formalizes this as the "Narrative Chain": each scene has an explicit target; reaching it triggers transition, which loads the next scene's hidden facts.

**Time-jump and pacing tools — three working approaches:**
1. **Explicit tracker timestamp** — narrator updates `<time>`; on "skip 3 days", the next turn's prompt includes a Memory Book consolidation entry summarizing the interval.
2. **Director Author's Note** at low depth: "Pacing is fast — when scene targets are met, the narrative skips to the next meaningful beat."
3. **Quick Reply scripts** (SillyTavern) that swap the active lorebook to the next chapter's deck.

**Triggered events — the `WILL INSTANTLY` template.** Sphiratrioth's documented finding: phrase triggered events as "{{char}} will instantly [ACTION]" or "[EVENT] will instantly happen" — empirically more reliable across LLMs than conditional ("if X then Y") phrasings: "Do not ask me why but otherwise different LLMs more often fail in following the instruction." Pair with Sticky (10–20 messages) so the event has time to play out.

**Translatable patterns from interactive fiction / TTRPG / video game narrative:**
- **Three-act meta-prompting** — WHAT-IF (arxiv 2412.10582) uses three-act structure as a meta-prompt scaffold because LLMs have strong genre priors for three-act shape.
- **Index-card scene design** (TTRPG Lazy DM tradition) — one card per scene, max 5 bullet points; the GM improvises within the card. Translates directly to per-scene lorebook entries.
- **"Bangs" from Ron Edwards's Sorcerer** — pre-prepared situations that demand a player response. In LLM terms: gated trigger entries that fire when the player enters a location, forcing an NPC to act on a long-running agenda.
- **Don't pre-author resolutions** (Ian Bicking's IF design notes): "If the LLM responds 'You hear a mysterious sound on the other side of the door,' then if you open the door, the LLM only decides what's on the other side at that moment." Hidden lore must be authored *before* the scene; never leave a reveal for the model to invent at the moment of opening.

### 5. Character schemas

**Fields that belong** (from PList + Ali:Chat synthesis):
- Name, age, role/occupation
- 4–8 personality traits (comma form)
- 2–3 sensory appearance anchors (not a full portrait)
- Voice marker — one habitual phrase, one habitual gesture
- Current goals (1 short-term, 1 long-term)
- Knowledge bounds — what they *don't* know
- One Ali:Chat example exchange (40–80 tokens) that demonstrates voice
- Relationship status fields keyed to other named NPCs

**Fields that are noise:**
- Full backstory paragraphs (genre priors fill these in)
- Birthday, height, hair length unless mechanically relevant
- "Likes pizza, dislikes spiders" trivia
- Long physical description (gets blended with other characters)

**Relationship tracking — two community systems:**
- **Numeric trust/affection** (1–10 or 1–100) in the tracker, updated each scene.
- **Named state** (acquainted → trusted → confidant → lover → estranged) with explicit transition events recorded.

Both work; named-state versions are more legible to the model and less likely to produce "trust = 4, but acts like 8" incoherence.

**Cast size.** Community ceiling: 5–8 named, recurring NPCs in active rotation. Above that, use `Filter to Character(s)` to scope each NPC's knowledge to their on-screen presence; keep a "minor cast" file with one-line descriptions only loaded by reference.

### 6. Real cost / consequence systems

Core problem: safety-aligned RLHF biases models toward rescue. Four reinforcing layers are required:

1. **World-stakes declaration in the author frame, not as a rule.** "This is a story in the tradition of Cormac McCarthy and post-apocalyptic literary fiction — named characters die when their choices catch up with them. The narrative's job is to honor that, not to soften it."
2. **Tracker as factual record.** Maintain `<casualties>` and `<injuries>` blocks. Once written, those are facts the narrator must work with. Pasted back each turn, the model cannot quietly heal a wound away.
3. **Procedural-guidance lorebook entries that roll outcomes.** Sphiratrioth's pattern: trigger word `attack` → group with three weighted outcomes (success / partial / failure-with-cost), one selected and stickied. Bypasses the model's positive-outcome bias structurally.
4. **Explicit positive instruction against rescue.** Replace "do not rescue the protagonist" with: "When the player chooses against their own interest, the narrative renders the consequence with restraint. Other characters react in line with their established interests, not the player's preservation."

**Permadeath.** Once a named character dies, add them to a `<dead>` entry set to `Constant` — their continued absence becomes a fact the model defends rather than a rule it can forget.

**Injury persistence.** Tracker field `<injuries>` updated each scene; injuries decay only via explicit healing events that the player or narrator initiates with on-screen effort.

**Resource scarcity.** Inventory tracked as a counted list in the tracker. Without a counted state, the model quietly re-equips the protagonist. This is the same pattern Anthropic describes for Claude playing Pokémon: "for the last 1,234 steps I've been training my Pokémon in Route 1, Pikachu has gained 8 levels."

### 7. Document hierarchy — what lives where

Modern division of labor for a Claude Project (200k context):

| Layer | What it holds | Why |
|---|---|---|
| **Project Instructions** (always loaded) | Author framing, output contract, top-5 behavioral rules, tracker schema, "ground responses in tracker first" instruction | Must survive every turn |
| **Knowledge files (RAG-retrieved)** | Per-NPC bios, per-location descriptions, faction lore, scene/mission cards, gated story-beat lore | Token-efficient: loaded only when relevant |
| **Tracker artifact** (pasted into each long turn or maintained in-chat) | Current scene, time, location, present NPCs, injuries, relationships, unresolved threads | The model's working memory |
| **Macro / preset definitions** | Reusable scene templates, character schema, output format spec | Composable; lives in a single knowledge file the model can reference |
| **Greeting / first message** (in-chat) | Establishes voice; sets initial tracker state | Temporary — drops out naturally |

**Always-loaded vs. retrieval-only test:** ask, "would the model misbehave if it didn't see this every turn?" If yes (output format, voice, refusal policy, tracker schema, hard story rules) → system prompt. If no (Marlon's backstory, the QZ smuggler den layout, what faction Y did three years ago) → knowledge file.

**Token budget guidance for Claude (200k context):** system prompt under 4–6k tokens (large enough for rules, small enough not to dominate); knowledge files chunked so any single retrieved piece is 200–600 tokens; tracker artifact 500–1,500 tokens; reserve 50%+ of context for chat history and active lorebook injections.

---

## Recommendations

### Tier 1 — do these first
1. **Use the author frame.** "You are a [genre]-specialist author co-writing this story. Your role is to render the world, give voice to NPCs other than the protagonist, and honor the consequences of the protagonist's choices."
2. **Rewrite every "do not" rule as the positive behavior you want.** Audit your existing prompt by counting "not / never / do not" — each is a candidate for inversion.
3. **Split character bios out of the system prompt into individual knowledge files**, each beginning with the character's full name as a self-contained sentence so semantic search resolves them.
4. **Add a tracker artifact** with these minimum fields: `<scene>`, `<time>`, `<location>`, `<present_npcs>`, `<injuries>`, `<inventory>`, `<relationships>`, `<unresolved>`. Instruct the model to update it at the end of each significant beat.
5. **Establish the world's stakes in the author frame, not as a behavioral rule.** "This is a world where named characters die" works; "the narrator must not rescue the protagonist" misfires.

### Tier 2 — once basics work
6. **Build a scene/mission deck** as a knowledge folder, one file per scene, using the modular template above. Each scene declares its target, available beats, and exit conditions.
7. **Implement gated lore.** For Claude Projects, this means filenames and lead sentences keyed to story-beat trigger phrases that won't appear until the gate opens.
8. **Add procedural outcome rolls** for any subsystem where positive bias is a known problem (combat, social encounters, romance progression). Encode as instruction blocks the narrator consults, not as dice math.
9. **Use the `WILL INSTANTLY` template** for any event that must fire on cue.
10. **Cap your active named cast at 5–8.** Move minor NPCs to a "named extras" file with one-line entries.

### Tier 3 — advanced
11. **Narrator+Archivist split via API.** One prompt narrates; a second prompt updates the tracker against a schema. Substantially reduces drift on long sessions.
12. **Multi-tier consolidation** (scene → arc → chapter) once sessions exceed ~50k tokens of chat history.
13. **Version-control your system prompt and knowledge files.** Prompt drift across iterations is a documented productivity killer.

### Benchmarks that should change your approach
- **Drift after ~30 turns** → your persona is being pushed out of context. Move it to a constant-injected lorebook entry or low-depth Author's Note.
- **Model keeps inserting `[OOC: …]`** → your stack contains an example of the OOC syntax somewhere. Remove it.
- **Named NPCs blur together** → cast too large or shared descriptors. Enforce per-NPC knowledge scoping; tighten distinctive voice markers.
- **Consequence-honoring fails** → stakes encoded as "do not rescue" rule, not as tracker fact. Move to tracker; declare in author frame.
- **Gated reveals fire too early** → trigger keys too broad. Make scene-specific or use delay-until-recursion.
- **Romance gates with "are you sure?"** → consent-checking RLHF baseline. Move relationship state to tracker as established fact; replace gate words with positive sensory directives.

---

## Caveats

1. **The community evidence base is uneven.** SillyTavern docs and the Trappu/AliCat/kingbri Pygmalion-era guides are well-documented and battle-tested across thousands of users. Some recommendations (cast-size ceiling, token splits, specific Claude behaviors) are community consensus without published benchmarks — treat as starting points.
2. **Model-specific behavior varies sharply.** Patterns calibrated on GPT-4o or Gemini 2.5 may not transfer cleanly to Claude Opus 4.6/4.7. Notably: **prefilling is deprecated** on the latest Claude models, so prompts relying on prefill scaffolding need redesign. Claude is also reported to follow conservative-tone instructions more faithfully than prior generations — a strength in rule-following but a liability if your rules are negation-shaped.
3. **The Moral RolePlay benchmark (arxiv 2511.04962) shows no amount of prompting fully overcomes alignment-induced positive bias** when portraying genuinely malicious characters. Expect softened villainy regardless of prompt craft on safety-aligned frontier models. Plan around this: make antagonists effective via information asymmetry and consequence, not by relying on the model to perform manipulation it's trained to refuse.
4. **The community disagrees on system-prompt length.** One school (RPFiend; several preset authors) advocates under 300 tokens, citing model deprioritization of instructions buried in walls of text. Another school (Sphiratrioth, many "magic portal"-style prompts) runs 4–6k tokens of dense rules. Both work — the difference is whether the knowledge base / lorebook does most of the heavy lifting (favor short prompts) or the system prompt does (favor long). Decide which tier owns each rule and don't duplicate.
5. **"Persistent memory" claims from RP platforms** (Jenova, MegaNova, etc.) are marketing for proprietary RAG with summary consolidation — the same patterns you can build yourself with a tracker file plus a Memory Books-style summary loop. Don't pay for a black box you can replicate.
6. **NSFW/explicit RP communities** (Chub, JanitorAI, r/CharacterAI_NSFW, r/PygmalionAI) have developed many advanced lorebook patterns, but their public guides are uneven and platform-specific. The **SillyTavern World Info Encyclopedia** (by kingbri, AliCat, Trappu) is the most rigorous neutral source; **Trappu's PList + Ali:Chat creation guide** (wikia.schneedc.com) is the most rigorous neutral source for character cards.
7. **Anthropic's official RP guidance is thin.** The "Keep Claude in character" docs page is brief and oriented to short interactions. Anthropic's substantive long-context advice ("Effective context engineering for AI agents", "Long context prompting tips", "Prompting best practices") is generic to agents but transfers cleanly. There is no official Anthropic playbook for narrative RP specifically — designers are extrapolating from agent-design guidance plus community lorebook practice.