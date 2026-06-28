# narrator-state — MCP Tool Surface Spec (v0.2)

A local Model Context Protocol server that gives Claude round-trip access to narrative RP state. Designed for *Project Allegheny* first, but multi-project from day one so future stories (Vault 49 retrofitted, a Boston QZ TLOU package, the Student Body sim, etc.) share the substrate.

This spec defines the tool surface *before* implementation so that downstream lore documents (cast, locations, missions) can be written against a known schema. Implementation is a follow-up pass.

**Schema version covered:** v1.1 (additive over v1.0 — new `knowledge_transfers` log and the `commit_knowledge_transfer` tool that writes it). v1.0 state files auto-migrate to v1.1 on load by initializing an empty `knowledge_transfers` array.

---

## 1. Design principles

- **Narrative-aware tools, not generic CRUD.** Tools speak the language of the story (`log_injury`, `advance_awareness`, `record_loss`) instead of the database (`INSERT INTO injuries VALUES ...`). The model uses verbs that mean something in the fiction.
- **Round-trip is real.** The model reads state at turn start and writes state at turn end through the same tool surface. No DOM scraping, no player mirroring required for the model's awareness.
- **Player UI keeps mirroring.** The artifact tracker stays. The bracket lines stay. The player still sees the state and can edit it. The MCP server is the *source of truth*; the artifact is the *human view*. They sync — but the player can override.
- **Tool calls are cheap, but not free.** Default to one `get_state` call per turn (start) and one or two update calls per turn (end). Don't fragment state writes into a dozen tool calls per turn — batch where natural.
- **Append-only for narratively important events.** Injuries, losses, awareness transitions, mission events — these get appended to history lists with timestamps. They are not silently overwritten. Undo is a separate explicit verb.
- **Schemas are versioned.** State files carry a `schema_version`. The server can migrate forward; it refuses to load state from a schema_version it doesn't recognize.
- **Local-only by default.** Data lives in `~/.narrator-state/<project>.json`. No cloud, no auth, no network. If you want cross-machine sync, you can put `~/.narrator-state/` under git or Dropbox; the server doesn't care.

---

## 2. State shape (v1.1)

One JSON document per project. Roughly this shape:

```json
{
  "schema_version": "1.1",
  "project": "allegheny",
  "title": "Project Allegheny",
  "created": "2026-05-11T14:23:00Z",
  "last_updated": "2026-05-11T17:42:00Z",

  "session": {
    "current_session_id": "s-004",
    "session_count": 4,
    "sessions": [
      {"id": "s-001", "started": "2026-05-08T19:00:00Z", "ended": "2026-05-08T21:30:00Z", "turns": 47},
      {"id": "s-002", "started": "2026-05-09T20:00:00Z", "ended": "2026-05-09T22:15:00Z", "turns": 38},
      {"id": "s-003", "started": "2026-05-10T14:00:00Z", "ended": "2026-05-10T16:20:00Z", "turns": 41},
      {"id": "s-004", "started": "2026-05-11T14:23:00Z", "ended": null, "turns": 12}
    ]
  },

  "clock": {
    "story_day": 3,
    "story_day_label": "Day 3 (Monday)",
    "story_time": "16:45",
    "story_phase": "outbreak_week",
    "location": "downtown Pittsburgh",
    "awareness": 2,
    "history": [
      {"turn": 1, "story_day": 1, "story_time": "09:47", "location": "PIT Airport", "awareness": 0},
      "..."
    ]
  },

  "player": {
    "name": "Caleb",
    "age": 26,
    "profession": "junior software engineer",
    "pronouns": "he/him",
    "condition": "scratched, winded",
    "active_injuries": [
      {"id": "inj-003", "logged_turn": 38, "body_part": "left_forearm", "severity": "shallow_cut", "source": "scrape on chain-link", "clean": true, "logged_at_story_time": "Day 3, 16:45"}
    ],
    "inventory": [
      {"id": "item-001", "name": "backpack", "qty": 1, "notes": "weekend luggage"},
      {"id": "item-002", "name": "water bottle", "qty": 1, "notes": ""},
      {"id": "item-003", "name": "granola bar", "qty": 1, "notes": ""},
      {"id": "item-004", "name": "phone", "qty": 1, "notes": "12% battery, no service"},
      {"id": "item-005", "name": "wallet", "qty": 1, "notes": "$87 cash, ID, 3 cards"},
      {"id": "item-006", "name": "pocket knife", "qty": 1, "notes": "picked up from Maya's kitchen drawer"}
    ]
  },

  "characters": {
    "MAYA": {
      "name": "Maya Chen",
      "tier": "anchor",
      "relationship": "close",
      "condition": "winded",
      "alive": true,
      "present": true,
      "active_injuries": [],
      "perception_of_player": {
        "physical": "tall, glasses, reddish-brown mustache, knit beanie even when warm",
        "behavioral": [
          "goes quiet when his family comes up",
          "drinks his coffee black until he is tired, then takes milk",
          "uses humor as a distance"
        ],
        "last_updated_turn": 38
      },
      "history": [
        {"turn": 1, "relationship": "close", "notes": "starting state — six-year friendship"},
        {"turn": 38, "relationship": "close", "notes": "saved her from the crowd at the hospital lobby"}
      ]
    },
    "MIKE": {
      "name": "Mike Brennan",
      "tier": "non_romance_male",
      "relationship": "trusted",
      "condition": "unscathed",
      "alive": true,
      "present": true,
      "active_injuries": [],
      "perception_of_player": {
        "physical": "the beanie guy",
        "behavioral": [
          "still does the thing with his hands when he's nervous"
        ],
        "last_updated_turn": 1
      },
      "history": [
        {"turn": 1, "relationship": "trusted", "notes": "college roommate, in town by coincidence"}
      ]
    }
  },

  "lost": [],

  "factions_known": {
    "FEDRA": false,
    "Fireflies": false,
    "Hunters": false,
    "WLF": false,
    "Seraphites": false,
    "Jackson": false,
    "Rattlers": false
  },

  "missions": {
    "active": [
      {"id": "M-05", "title": "Outbreak Morning", "started_turn": 28, "sub_state": "left_apartment", "notes": "Maya, Mike, player departing on foot toward Mike's hotel"}
    ],
    "completed": [
      {"id": "M-01", "title": "Saturday Coffee", "completed_turn": 8, "outcome": "established", "notes": ""},
      {"id": "M-02", "title": "Saturday Dinner", "completed_turn": 15, "outcome": "ER_nurse_foreshadow_landed", "notes": "Priya's friend mentioned hospital cluster — Caleb noticed, Maya didn't"},
      {"id": "M-03", "title": "Sunday Slow", "completed_turn": 21, "outcome": "phones_lagging_noted", "notes": ""},
      {"id": "M-04", "title": "Sunday Night Crack", "completed_turn": 27, "outcome": "TV_moment_landed", "notes": "Caleb pressed Maya about her cousin in Jakarta"}
    ],
    "deferred": []
  },

  "memory_book": [
    {
      "id": "mb-001",
      "session_id": "s-001",
      "story_day_range": "Day 1, morning to evening",
      "summary": "Caleb arrived at PIT Saturday morning. Maya was late to baggage claim — apologetic, warm. They drove to her Lawrenceville apartment, dropped his bag, walked to the Strip District for dinner. Mike Brennan, Caleb's college roommate, was in town by coincidence and joined them. Priya, from Maya's grad program, also came. Conversation was easy. The TV in the restaurant mentioned a hospital cluster in Indonesia — Caleb noticed; no one else did.",
      "characters_in_scene": ["MAYA", "MIKE", "PRIYA"],
      "ended_at": {"story_day": 1, "story_time": "23:40"}
    },
    {
      "id": "mb-002",
      "session_id": "s-002",
      "story_day_range": "Day 2",
      "summary": "Sunday in Lawrenceville. Maya and Caleb spent the morning in her apartment — coffee, the cat, talking about her advisor. Walked to her favorite bookstore. Lunch at a place she's tried to take him to before. In the afternoon Maya's phone started lagging on calls; she mentioned her cousin in Jakarta hadn't returned a text in eight days. Evening at the Thunderbird — Mike rejoined, Priya didn't, and the TV played a CDC briefing where the word 'fungal' was used. The bar quieted. Caleb pressed Maya gently about her cousin afterward; she didn't want to talk about it.",
      "characters_in_scene": ["MAYA", "MIKE"],
      "ended_at": {"story_day": 2, "story_time": "23:15"}
    },
    "..."
  ],

  "knowledge_transfers": [
    {
      "id": "kt-001",
      "from_character_id": "MAYA",
      "to_character_id": "PRIYA",
      "topic": "caleb_bite_day5",
      "scope": "full",
      "story_day": 5,
      "story_time": "14:22",
      "logged_turn": 87,
      "notes": "Maya pulled Priya aside in the QZ medical tent; told her about the forearm bite and the clock"
    },
    {
      "id": "kt-002",
      "from_character_id": "OBSERVATION",
      "to_character_id": "FRANK",
      "topic": "the_pham_house_rifle_cache",
      "scope": "partial",
      "story_day": 4,
      "story_time": "11:00",
      "logged_turn": 64,
      "notes": "Frank saw the bolt-action come out of the suitcase in the vestibule; doesn't know what else is in the cache"
    }
  ],

  "flags": {
    "best_friend_mortal_after_week_1": true,
    "player_mortal_after_explicit_commit": true,
    "cordyceps_word_unlocked": false,
    "fireflies_revealed": false,
    "cause_explained": false,
    "jackson_named": false,
    "news_cdc_briefing_seen": false,
    "news_fedra_announced": false,
    "news_qz_named": false,
    "news_fireflies_named": false,
    "news_cordyceps_named": false
  }
}
```

Notes on shape:

- **Names as keys for `characters`** — uppercase short tokens (`MAYA`, `MIKE`, `PRIYA`) match the tracker bracket convention. Full name is a field.
- **`history` arrays** on player and characters — turn-stamped audit trail. Append-only. Used by `get_state` to provide context, by `undo_last_event` for corrections.
- **`active_injuries` separately tracked from `condition`** — condition is a summary label (`scratched, winded`); injuries are structured records with IDs.
- **`memory_book`** is a flat list, ordered by `id`. Each entry covers roughly one session or one significant chunk.
- **`knowledge_transfers`** is a flat append-only log. Each entry records *one off-screen information transfer* — typically NPC-to-NPC, but `from_character_id` can also be `"OBSERVATION"` to record that an NPC has personally observed an artifact `{{user}}` left behind. The narrator queries this log via `get_state` before composing dialogue for an NPC about an event the NPC was not on-screen for. See §3.3 `commit_knowledge_transfer` for the contract. The log is the mechanical implementation of the Observation Check from `PROJECT_INSTRUCTIONS.md`.
- **`flags`** holds boolean state the narrator instructions reference. The plot-armor flags live here so the model can check them via `get_state`.

---

## 3. Tool surface

Fourteen tools total. Grouped by function.

### 3.1 Session and state

#### `get_state(project: str, include_history: bool = false, memory_book_entries: int = 3, tier_filter: list = null) → dict`

The default turn-opener. Returns current state — clock, player, characters present, active missions, recent memory book entries.

- `project` — project slug (`"allegheny"`)
- `include_history` — if true, returns full history arrays. Default false to keep response token-cheap.
- `memory_book_entries` — number of most recent memory book entries to include. Default 3.
- `tier_filter` — list of character tiers to include. Default `null` returns all *present* characters plus all *anchor* tier. Pass `["anchor", "romanceable", "non_romance_male"]` for active-party tiers; pass `["all"]` for everyone alive. Cuts token weight when the named-minor cast has grown.

Returns a trimmed view of state suitable for narrator context. Hides closed sessions, completed-old missions, dead characters' full histories — but flags their existence. The full state is always available via `include_history=true`.

#### `start_session(project: str, session_note: str = "") → dict`

Begins a new session. Creates a session record, increments session count, returns the current state plus the last 3 memory book entries.

Use at the start of a new chat conversation. The narrator's first action of a fresh chat is to call this — it primes context with recent history.

- `session_note` — optional one-line note about the session ("planning to play through Day 3 morning")

#### `end_session(project: str, final_note: str = "") → dict`

Closes the current session. Records end time and turn count.

Not strictly required — sessions can stay open and the next `start_session` will auto-close the prior. But explicit close is cleaner.

---

### 3.2 Clock and location

#### `advance_clock(project: str, story_day: int, story_time: str, location: str = null, story_phase: str = null) → dict`

Updates the current time and (optionally) location. Appends to clock history.

- `story_day` — day number (Day 1, Day 7, Week 2 Day 3, etc.)
- `story_time` — 24-hour format `"16:45"`
- `location` — current location string; if null, location is unchanged
- `story_phase` — one of `pre_outbreak | outbreak_week | qz_era | road | year_one_plus`; null means unchanged

The narrator calls this whenever the header line changes — which is often. Always batched with the end-of-turn updates.

#### `advance_awareness(project: str, new_tier: int, reason: str) → dict`

Bumps the AWARENESS value. Validates that new_tier > current (awareness never decreases). Appends to clock history with reason.

- `new_tier` — 0–5
- `reason` — one-line cause ("CDC press conference broadcast", "saw first infected up close")

Awareness transitions are narratively important and should always have a reason — searchable in history.

---

### 3.3 Characters and relationships

#### `update_character(project: str, character_id: str, relationship: str = null, condition: str = null, present: bool = null, notes: str = "") → dict`

Updates a named character's state. All fields optional; only specified fields change. Appends to character history.

- `character_id` — uppercase token (`"MAYA"`)
- `relationship` — `acquaintance | friend | trusted | close | romance | estranged` (or any narrator-supplied string — schema is permissive here)
- `condition` — label like `winded` or `wounded`
- `present` — true if currently with the player, false if separated
- `notes` — one-line context for the history entry

Use when the relationship shifts, when a character joins/leaves the party, when condition changes meaningfully.

#### `update_perception(project: str, character_id: str, physical: str = null, behavioral_add: str = null, behavioral_remove: str = null) → dict`

Updates what a named character has observed about the player. Each character's `perception_of_player` field holds a `physical` description (loaded once on first meeting) and a `behavioral` list (accumulates over time).

- `physical` — replace the physical description (used on first meeting or significant visual change to the player)
- `behavioral_add` — append a new observation to the behavioral list ("notices he goes quiet when his family is mentioned")
- `behavioral_remove` — remove an observation if it has been disconfirmed in play

The narrator calls this when an NPC has had a clear opportunity to observe something specific about `{{user}}` — not on every turn, only when a meaningful observation is made. Used downstream by perceptive characters who speak to `{{user}}` with the texture of someone who has been paying attention. See `KNOWLEDGE_1_Cast.md` §NPC perception of `{{user}}` for the discipline.

#### `commit_knowledge_transfer(project: str, to_character_id: str, topic: str, from_character_id: str = null, scope: str = "full", story_day: int = null, story_time: str = null, notes: str = "") → dict`

Records an off-screen information transfer to the persistent **Commitment Log**. The mechanical implementation of the Observation Check from `PROJECT_INSTRUCTIONS.md` — written at the moment the transfer is rendered or established in narration, never retroactively.

Parameters:

- `to_character_id` — uppercase token of the character who learned (`"PRIYA"`, `"FRANK"`)
- `topic` — short slug for what they learned. Use a stable, lowercase, underscore-separated form so the same topic across multiple transfers stays groupable (`caleb_bite_day5`, `maya_pregnancy`, `the_pham_house_layout`, `caleb_killed_man_at_thunderbird`). The narrator picks the slug; the server stores it verbatim. Consistency is the narrator's job, not the server's.
- `from_character_id` — uppercase token of the character who told (`"MAYA"`). Special value `"OBSERVATION"` indicates the NPC personally observed an artifact (a body, a document, a scene), not that another character told them. If omitted, defaults to `"OBSERVATION"`.
- `scope` — how much the recipient knows. One of:
  - `full` — they know the topic in essentially the same fidelity as someone who was there
  - `partial` — they know the topic in broad strokes but missing detail (`"Maya told me you got hurt"` without naming the bite)
  - `rumor` — they have heard a version of the topic that may be inaccurate
  - `wrong_version` — they have been told an incorrect or misleading version
- `story_day` — the in-fiction day the transfer happened. Defaults to current `clock.story_day`.
- `story_time` — the in-fiction time the transfer happened. Defaults to current `clock.story_time`.
- `notes` — one-line context for the log entry

Returns the new entry's ID. Appends to the top-level `knowledge_transfers` array.

**Validation:** `to_character_id` must exist in `characters` or `lost` (you can tell a dead person something off-screen if the transfer happened before their death — `story_day` enforces ordering relative to `record_loss`). `from_character_id` must exist in `characters`, `lost`, or be `"OBSERVATION"`. The server rejects entries with unknown character IDs.

**Reading back:** the narrator queries the log via `get_state`, which returns the full `knowledge_transfers` array by default. Before composing dialogue for an NPC about an off-screen topic, the narrator filters by `to_character_id == this NPC` and `topic == matching slug` to determine whether the NPC knows, and at what scope. If no matching entry exists, the NPC does not know.

**When to call this:**

- An NPC tells another NPC something off-screen, rendered in narration as a brief commit beat ("Maya and Priya talked in the medical tent for twenty minutes — Priya knows about the bite now"). Call after the beat.
- A new NPC is introduced who, by their cast file `connections` or by `from_character_id`'s pre-outbreak network, would plausibly have been told something the player has done — *and* the narrator wants that to be true going forward. Call before that NPC's first on-screen scene with `{{user}}`.
- `{{user}}` left an observable artifact (a body, a note, a sample) somewhere an NPC has now physically been. Call with `from_character_id: "OBSERVATION"`.

**When NOT to call this:**

- "Word might have spread by now" — no. Word has spread to whoever the narrator has committed it spread to, not to whoever would be narratively convenient.
- "Maya would have told Mike eventually" — no. If Maya told Mike, that's a commit. If she didn't, Mike doesn't know.
- Retroactively, to license a line of dialogue the narrator already wrote. The rule is: log first, render after. If a line was rendered without a prior commit and the player has not yet objected, fix forward — log the transfer now with the current turn's `story_time` and move on. Do not backdate.

This is a **high-stakes write** when the transferred information would materially change how the receiving character treats `{{user}}` (a bite, a death `{{user}}` caused, a romance, a betrayal). Commit in the same turn that establishes the transfer, not later.

#### `log_injury(project: str, character_id: str, body_part: str, severity: str, source: str, clean: bool = true, clock_bias: str = "median") → dict`

Records a new injury on a character (or "PLAYER" for the player character). Returns the new injury's ID. Appends to that character's active_injuries.

- `character_id` — `"PLAYER"` or character token
- `body_part` — canonical body part. For bite severity, see the canonical list below. For non-bite severities, any descriptive string is accepted (`"left_forearm"`, `"ribcage"`, etc.).
- `severity` — `scratch | shallow_cut | cut | deep_wound | bite | spore_exposure`
- `source` — one-line cause ("scrape on chain-link", "bite from infected at hospital")
- `clean` — was the wound treated/clean? Default true.
- `clock_bias` — only meaningful when `severity == "bite"`. One of `"fast" | "median" | "slow"`. Default `"median"`.

**Critical:** bite injuries are special. When `severity == "bite"`, the server auto-creates an `infection_clock` field on the injury computed from `body_part`. The server accepts the following canonical body_part values, drawn from `KNOWLEDGE_4_Infection.md`:

| `body_part` value | Turn time range |
|---|---|
| `face` | 2–10 minutes |
| `neck` | 5–20 minutes |
| `head` | 10–30 minutes |
| `shoulder` | 1–4 hours |
| `chest` or `abdomen` | 2–6 hours |
| `upper_arm` | 2–6 hours |
| `forearm` or `hand` | 4–12 hours |
| `upper_leg` or `hip` | 6–18 hours |
| `lower_leg` or `foot` | 12–24 hours |

The server picks a value within the relevant range when the bite is logged. The narrator can pass an optional `clock_bias` parameter (`"fast" | "median" | "slow"`) to nudge selection toward the short end, the middle, or the long end of the range — for cases where the story needs a specific pacing (a fast turn before the next scene closes, a slow turn that allows a goodbye). Default is `"median"`.

For body parts not in the canonical list, the server returns an error and the narrator should choose a closer canonical match. The list is the contract.

The narrator can read the resulting `infection_clock` on subsequent turns via `get_state` to know how much narrative time the character has left. The clock is *informational* — the narrator decides whether to use it dramatically.

#### `heal_injury(project: str, injury_id: str, outcome: str, notes: str = "") → dict`

Closes an active injury. Moves it to that character's injury history.

- `outcome` — `healed_clean | scarred | infected | death`
- `notes` — narrative context

#### `record_loss(project: str, character_id: str, story_day_label: str, cause: str, one_line_obit: str) → dict`

Marks a character dead. Moves them from `characters` to `lost`. Sets `alive=false`, `present=false`. The "Lost" list is the artifact's emotional spine — what the player sees when they want to see the cost.

- `character_id` — token
- `story_day_label` — the day they died, in display format (`"Day 7 (Friday) — 23:18"`)
- `cause` — one-line cause ("turned overnight", "shot at the cordon", "we never knew")
- `one_line_obit` — one sentence honoring the character

---

### 3.4 Inventory

#### `add_inventory(project: str, item_name: str, qty: int = 1, notes: str = "") → dict`

Adds an item to player inventory. Auto-stacks if name matches an existing item with the same notes.

#### `remove_inventory(project: str, item_id: str = null, item_name: str = null, qty: int = 1) → dict`

Removes an item or decrements its quantity. Either `item_id` or `item_name` accepted; ID is preferred. Errors if quantity exceeds available.

Used by the narrator when an item is consumed, lost, traded, dropped.

---

### 3.5 Missions

#### `start_mission(project: str, mission_id: str, title: str = "", notes: str = "") → dict`

Begins a mission. Adds to `missions.active`. The mission ID matches `KNOWLEDGE_6_Missions.md` (e.g., `"M-05"`).

#### `update_mission(project: str, mission_id: str, sub_state: str, notes: str = "") → dict`

Updates an active mission's sub-state. Useful for branching missions and multi-beat scenes.

#### `complete_mission(project: str, mission_id: str, outcome: str, notes: str = "") → dict`

Closes a mission. Moves to `missions.completed`. Outcome is a one-line narrative result.

---

### 3.6 Memory and flags

#### `finalize_story_day(project: str, summary: str, characters_in_scene: list, awareness_at_end: int = null) → dict`

Closes out a story day with a memory book entry. **Called by the narrator when the story clock advances past midnight or jumps to a new day.** Auto-fills `session_id` from current session, `story_day_range` and `ended_at` from current clock state.

- `summary` — 3–5 sentence consolidation of the day's events. The day's emotional spine, key turning points, what changed, who's where, what's left unresolved.
- `characters_in_scene` — list of character IDs who were present during the day. Used by `get_state` for fast retrieval of who's been around.
- `awareness_at_end` — optional; the AWARENESS value at end-of-day. Auto-read from state if not provided.

Triggers automatically in the narrator turn-loop whenever `advance_clock` is called with a `story_day` greater than the current state's `story_day`. The narrator must produce the summary *before* calling `advance_clock` to a new day — the spec is "end the day before starting the next one."

For long jumps (Day 7 → Week 3 Day 1, skipping six days), the narrator should produce a single consolidating summary covering the elided time, not one per day. The story_day_range field handles this naturally (`"Day 7 to Week 3 Day 1 — six days in the QZ, summarized"`).

For partial-day sessions ending mid-day, no finalize is needed — the day continues in the next session, and `start_session` will return the current in-progress state.

#### `set_flag(project: str, flag_name: str, value: bool, notes: str = "") → dict`

Sets one of the `flags` booleans. The flags table is fixed by the schema for safety — the tool rejects unknown flag names. To add a new flag, edit the schema in code.

Known flags (v1.0):

*Mortality and structure:*
- `best_friend_mortal_after_week_1`
- `player_mortal_after_explicit_commit`

*Vocabulary and reveal gates:*
- `cordyceps_word_unlocked` — once the player has been exposed to the word, NPCs may use it
- `fireflies_revealed` — the player has learned the Fireflies exist
- `cause_explained` — the player has learned the actual cause of the outbreak
- `jackson_named` — Jackson, Wyoming has been spoken of as a destination

*News-encounter gates:* whether the player has personally been exposed to a piece of canonical information. Separate from whether the event happened in the world (clock) — these track whether the player has heard it. NPCs in scene check these before using gated vocabulary in the player's hearing.
- `news_cdc_briefing_seen` — `{{user}}` saw/heard the Day 3 night CDC briefing
- `news_fedra_announced` — `{{user}}` has had personal exposure to FEDRA presence
- `news_qz_named` — `{{user}}` has heard "Quarantine Zone" as official terminology
- `news_fireflies_named` — `{{user}}` has heard "Fireflies" said aloud
- `news_cordyceps_named` — the genus has been named in `{{user}}`'s hearing

The narrator does not set news flags as anticipation of future scenes — only at the moment of `{{user}}`'s actual exposure. Some of these can fire on Day 3 if the player has the TV on; others may not fire for weeks.

#### `set_faction_known(project: str, faction: str, value: bool) → dict`

Toggles whether a faction is known to the player. Tracks first-encounter narratively. Faction names from the fixed list (FEDRA, Fireflies, Hunters, WLF, Seraphites, Jackson, Rattlers).

---

### 3.7 Maintenance

#### `undo_last_event(project: str, confirm: bool = false) → dict`

Reverts the most recent state change. Requires `confirm=true` to actually execute (first call returns a preview of what would be undone). Used for narrator misclicks and player-requested rewinds.

The narrator should rarely use this. The player can request it ("actually, that didn't happen — Maya didn't take that injury").

---

## 4. The narrator's per-turn loop

This is what gets added to `PROJECT_INSTRUCTIONS.md`:

**At turn start** (first turn of a new chat session):

1. Call `start_session("allegheny")`. The response carries current state + last 3 memory book entries. Read it.

**At turn start** (continuing a session, every turn):

1. The state from the previous turn's writes is still accurate. No tool call needed unless the player has signaled a long pause or session-end.

**At turn end** (every turn):

1. Compose the prose response with the time header at top and tracker bracket lines at bottom (unchanged from the existing contract — the bracket lines are still the player's visual).
2. **Make the actual state writes via tools.** Whichever apply:
   - **If the story clock crosses midnight or jumps to a new day:** call `finalize_story_day` *first*, with a 3–5 sentence summary of the day just ended. Only after that, call `advance_clock` to set the new day.
   - `advance_clock` if time or location changed (within the same day)
   - `update_character` for relationship/condition/presence changes
   - `update_perception` when an NPC has had a clear opportunity to observe something specific about `{{user}}`
   - `commit_knowledge_transfer` when an off-screen information transfer between characters has been rendered or established (NPC told NPC, NPC observed artifact). Required before any subsequent scene where the recipient NPC acts on the information.
   - `log_injury` / `heal_injury` for injury events
   - `add_inventory` / `remove_inventory` for inventory changes
   - `start_mission` / `update_mission` / `complete_mission` for mission transitions
   - `advance_awareness` for AWARENESS bumps
   - `record_loss` for deaths
   - `set_flag` / `set_faction_known` for milestone state

### High-stakes write timing

Most state writes happen at end of turn, batched. **High-stakes events** are exceptions — they get written in the same turn that renders them, never deferred:

- **AWARENESS transitions** (`advance_awareness`)
- **Named-character deaths** (`record_loss`)
- **Bite events** (`log_injury` with `severity: "bite"`)
- **AWARENESS-gated reveals** (`set_flag` for `news_*` and reveal flags)
- **Romance milestones** (`update_character` with relationship transition)
- **Material knowledge transfers** (`commit_knowledge_transfer` when the transferred information would change how the receiving character treats `{{user}}`)

The principle: high-stakes events are the ones the story would feel wrong about if state and fiction drifted apart by even one turn. The narrator does not let those drift.

**Before composing a scene** that involves a named character or returns to a known location, the narrator checks current state via `get_state` (if cached state from session-start is stale) — confirming character availability, presence, condition, and which minor NPCs live at the location. The narrator does not run a dead character or repopulate a location with a different staff than last time.

**At session end** (player signals they're done playing):

1. Call `end_session("allegheny", "stopping mid-Day-3 evacuation")` with an optional one-liner. If mid-day, the in-progress day is not finalized — it resumes on next `start_session`.

---

## 5. Failure modes and how they're handled

| Failure | How tool handles it |
|---|---|
| Project doesn't exist | First call to that project name auto-creates with defaults; returns a `created: true` flag in response |
| Two updates conflict (rare in single-player) | Last-write-wins; previous state still in history |
| Invalid relationship label | Permissive — schema accepts any string. Validation lives in narrator instructions, not the tool. |
| Awareness regression attempted | Tool rejects with explanatory error; narrator should never decrease awareness |
| Healing a non-existent injury | Tool returns error with available injury list |
| Inventory underflow | Tool rejects, narrator must reflect in fiction ("magazine comes up short") |
| Death of a character who's already dead | Tool returns error; previous death is canonical |
| `commit_knowledge_transfer` with unknown `to_character_id` or `from_character_id` | Tool rejects with error listing known character IDs; narrator picks correct token or commits a `set_flag` instead for non-character information state |
| `commit_knowledge_transfer` with `story_day` after a known death of the recipient | Tool rejects; the narrator cannot retroactively transfer information to a dead character past their death |
| Schema version mismatch | Server refuses to load, prints migration instructions |

---

## 6. Implementation outline

Not building yet — but for completeness, here's the shape.

**Framework:** FastMCP (Python). Anthropic's reference framework; clean decorator-based tool definition.

**File layout:**
```
narrator-state/
├── pyproject.toml
├── README.md
├── src/
│   └── narrator_state/
│       ├── __init__.py
│       ├── server.py          # FastMCP server, tool definitions
│       ├── store.py           # Read/write project JSON files
│       ├── schema.py          # Schema validation, migrations
│       └── tools/
│           ├── session.py
│           ├── clock.py
│           ├── characters.py
│           ├── knowledge.py   # commit_knowledge_transfer
│           ├── inventory.py
│           ├── missions.py
│           └── memory.py
└── tests/
```

**Run:** `uv run narrator-state` starts the server on stdio (MCP standard). Or `mcp install` to register it as a Claude connector.

**Data:** `~/.narrator-state/<project>.json`. Backed up via your normal backup tool of choice. Editable by hand if state gets weird.

**Approximate code size:** 400–600 lines of Python total. Plus tests. Realistic build time once we start: half a day to first working version, another half for polish and tests.

---

## 7. What this changes downstream

Three things now propagate into the lore docs:

1. **Character schema (`KNOWLEDGE_1_Cast.md`)** must match the `characters` shape — uppercase tokens as IDs, named relationship states from the permissive set, tier labels matching `anchor | romanceable | non_romance_male | antagonist | named_minor`.

2. **Mission cards (`KNOWLEDGE_6_Missions.md`)** must declare their `mission_id` as the canonical reference the tool calls use (`M-01`, `M-02`, ...). Each card lists the sub-states the narrator might pass to `update_mission`.

3. **Flag list** lives in two places now: this spec (authoritative) and the instructions doc (which references them by name). Adding a new flag means editing the schema in code *and* the instructions. Cost of safety.

---

## 8. Decisions resolved (from v0.1 open questions)

- **`tier_filter` on `get_state`** — included. Default returns present characters + anchors; explicit list filters further. Saves tokens once the named-minor cast grows past 5–6 entries.
- **Memory book auto-finalize** — yes, at story day-end. The `finalize_story_day` tool is called by the narrator when the clock crosses midnight or jumps to a new day. Mid-day session breaks do not finalize. The narrator does not get to skip a day-end finalize; it is a contract, not a suggestion.
- **Cross-project tools** (`list_projects`, `get_project_metadata`) — deferred to v1.1.
- **Schema migration policy** — auto-migrate with a timestamped backup. When the server detects an older schema_version on load, it writes a backup (`<project>.json.bak-<timestamp>`) before applying the migration. The backup directory is `~/.narrator-state/backups/`. The server emits a one-line log on the MCP error stream noting what migration ran. If migration fails, the server refuses to load the file and points at the backup. Migration code lives in `src/narrator_state/migrations/` with one Python file per version transition (e.g., `v1_0_to_v1_1.py`).

## 9. Schema migration mechanics

The v1.0 → v1.1 migration is the first real one and serves as the reference shape:

```python
# narrator_state/migrations/v1_0_to_v1_1.py

def migrate(state: dict) -> dict:
    """v1.0 → v1.1: introduces the knowledge_transfers log.

    v1.0 state has no knowledge_transfers field. v1.1 expects one.
    Initialize as empty array; existing off-screen information transfers
    (if any were committed by the narrator in prose only) are not
    retroactively materialized — they remain in the memory_book as
    rendered prose, and any new transfers from this point forward
    are logged via commit_knowledge_transfer.
    """
    state["knowledge_transfers"] = []
    return state
```

Future migrations follow the same pattern:

```python
# narrator_state/migrations/__init__.py
MIGRATIONS = {
    ("1.0", "1.1"): migrate_1_0_to_1_1,
    ("1.1", "1.2"): migrate_1_1_to_1_2,
    # ...
}

def migrate(state: dict, target_version: str) -> dict:
    current = state["schema_version"]
    while current != target_version:
        step = next_version(current, target_version)
        backup_state(state)
        state = MIGRATIONS[(current, step)](state)
        state["schema_version"] = step
        current = step
    return state
```

Backups never auto-prune. The user manages `~/.narrator-state/backups/` if it grows.
