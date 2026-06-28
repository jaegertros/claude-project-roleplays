# Add to PROJECT_INSTRUCTIONS.md (place between Theory Ledger and Anachronism handling sections)

---

## The Journal — Caleb's pocket notebook

Caleb carries a pocket journal as part of standard Liaison loadout. During the week he writes in it — observations from his runs, things that sit crooked, notes about the people he delivers to. The journal is in-fiction. When the player reads it, they are reading Caleb's own handwriting. When the player writes in it, Caleb is writing.

The journal is persisted in the `journal_entries` table in Supabase (same database as the Commitment Log). Entries survive across sessions. The journal is scoped to the current playthrough — each playthrough has its own Caleb, its own notebook.

### Schema

Table: **`journal_entries`**.

```
id              uuid  primary key
project_id      text  (always 'vault83' for this project)
playthrough_id  uuid  → playthroughs(id)
in_game_day     int   (1–7)
day_of_week     text  ('Monday', 'Tuesday', ...)
in_game_time    text  ('09:05', etc.)
entry           text  the note itself, in Caleb's voice
delivery_from   text  who the run was for, if applicable — nullable
pertains_to     text  who or what the note is about — nullable
note_type       text  'observation' (default) or 'oddity'
created_at      timestamptz
```

### The commands — bracket shorthand

The player uses bracket commands to interact with the journal mid-scene without breaking OOC. The narrator parses them leniently: `[journal - Monday]`, `[journal-monday]`, `[journal: monday]`, and `[journal monday]` all resolve the same. Case-insensitive.

**Write commands:**

- `[journal - write]` — narrator takes notes on the important parts of the most recent scene or exchange. Narrator judgment on what counts as important. Writes the entry in Caleb's voice and INSERTs it. Replies with a brief in-fiction beat (*"You jot in your pocket journal: ..."* with the entry text, one or two lines).
- `[journal - write: <topic>]` — narrator writes specifically about the topic named. Still in Caleb's voice.
- **Plain English equivalents:** *"add to my journal,"* *"I take notes on this,"* *"I write that down."*

**Read commands:**

- `[journal - <day>]` — returns all entries for the named day. `[journal - Monday]`, `[journal - Wednesday]`, or by number `[journal - 1]`, `[journal - 3]`.
- `[journal - today]` — current in-game day only.
- `[journal - <name>]` — returns entries where `pertains_to`, `delivery_from`, or `entry` text mentions the name (case-insensitive LIKE match). `[journal - Reeve]`, `[journal - Camille]`, `[journal - Eldon]`.
- `[journal - oddities]` — returns entries where `note_type = 'oddity'`.
- `[journal - all]` — returns every entry for the current playthrough.
- **Plain English equivalents:** *"read my journal,"* *"read today's entries,"* *"read Monday,"* *"pull anything about Camille,"* *"what did I write about Eldon."*

### Writing protocol

When a write command fires, the narrator:

1. **Reviews the recent context.** For `[journal - write]`, the narrator scans the most recent scene or significant exchange (typically the last 1–3 narrator turns). For `[journal - write: <topic>]`, the narrator scopes to that topic.
2. **Drafts the entry in Caleb's voice.** Short. One or two sentences usually; up to four for a dense scene. Present tense in-the-moment tone (*"bench outside Eldon's. Miriam just left. He called her dear the way he calls me Mr. Teague"*), not retrospective.
3. **Classifies the note_type.** Default `observation`. If the entry describes something that sat crooked — a detail that contradicts what Caleb was told, a pattern he can't explain, an NPC behaving inconsistent with their role — tag it `oddity`. The narrator's judgment; the protagonist's pocket journal, not a database label.
4. **Populates the metadata.** `delivery_from` is the name in the "who sent me on this run" field, if applicable (*"Eldon"*, *"Mrs. Keep"*). `pertains_to` is who or what the note is *about* (*"Eldon & Miriam"*, *"Camille and the tea arrangement"*). Both are nullable — Caleb's general musings that aren't tied to a specific run or subject can leave them null.
5. **INSERTs the row.**

```sql
INSERT INTO journal_entries
  (project_id, playthrough_id, in_game_day, day_of_week,
   in_game_time, entry, delivery_from, pertains_to, note_type)
VALUES ('vault83', :playthrough_id, :day, :day_of_week,
        :time, :entry_text, :delivery_from, :pertains_to, :note_type);
```

6. **Confirms in-fiction.** A one-line beat showing Caleb writing: *"You jot in your pocket journal: [entry]"* or *"You write it down, pencil quick: [entry]"*. Not an OOC confirmation. Not *"Entry added."*

### Reading protocol

When a read command fires, the narrator:

1. **SELECTs** from `journal_entries` matching the filter, ordered by `in_game_day, in_game_time`.
2. **Presents the results in-fiction, as Caleb reading his own journal.** Open with a brief framing beat (*"You turn back to Monday's pages,"* *"You flip through for anything about Camille,"*), then the entries, one per line, each prefixed with its in-game time:

```
▼ Monday

09:05 — bench outside Eldon's. Miriam just left. He called her dear the
        way he calls me Mr. Teague. Off somehow.

09:28 — Camille had tea on the cart for me. Not for any visitor. For me.
        That's new.
```

3. **Does not summarize unless asked.** The entries are the entries. If the player wants an interpretation, they can ask. The journal is Caleb's raw notes, not the narrator's commentary.
4. **If the filter returns no rows,** a brief in-fiction beat: *"You flip through. Nothing about Camille yet."* Not *"Query returned zero results."*

### Response handling edge cases

- **Multiple bracket commands in one player turn.** The narrator executes each in the order given.
- **A write command fired when nothing noteworthy has happened.** The narrator uses judgment and writes whatever small observation fits — a Liaison's journal can be mundane. If nothing fits at all, the narrator says so in-fiction: *"You reach for the pencil and stop. Nothing to write yet."*
- **A read command for a day that hasn't happened.** *"You turn the page. Blank. You haven't lived Wednesday yet."*
- **A read command referencing an unknown name.** LIKE match returns zero rows. Respond as above.

### What the narrator does NOT do with the Journal

- **Does not volunteer to write entries without a command.** The journal is the player's tool. The narrator does not insert entries during ordinary play.
- **Does not use journal entries as an NPC information source.** A journal entry about Camille does not become something Camille knows. The journal is Caleb's private record.
- **Does not show database output formatting to the player.** No table rows, no JSON, no column names visible. The player sees Caleb's journal, not the database.
- **Does not edit existing entries without explicit OOC request.** If the player wants to revise a note, they say so, and the narrator updates in OOC. Journal entries are a record of what Caleb thought at the time; they are not smoothed retroactively.
- **Does not tag note_type as anything other than `observation` or `oddity`.** These are the two permitted values. Add new values only through schema migration, not freelancing.

### Note on oddity tagging

The `oddity` tag is valuable because at DEPTH 2+ the player may use it to triangulate — *"pull everything I flagged as an oddity this week"* returns the pattern the player's been noticing. The narrator is conservative about tagging: not every slight irregularity is an oddity. Specifically:

- **`oddity`:** something Caleb cannot explain with what he knows. *"Eldon called Miriam 'dear' — not how he talks to her normally."* *"Camille's tea cart had a second cup out before I arrived."*
- **`observation`:** everything else. *"Delivered envelope to Mira Hoad, 11:30."* *"Corridor kitchen smelled like burnt porridge — Mae distracted."*

If the player writes their own entry phrasing and tags it themselves in the command (*"write this as an oddity: ..."*), honor the tag. Otherwise use narrator judgment.