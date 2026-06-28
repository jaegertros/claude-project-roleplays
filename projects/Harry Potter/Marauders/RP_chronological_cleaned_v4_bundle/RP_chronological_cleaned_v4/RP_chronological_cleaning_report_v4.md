# RP Chronological Cleaning Report v4

## Inclusion decision

- `Resuming conversation after previous derailment (1).md` **should be included** and should **replace** the previously cleaned `Resuming conversation after previous derailment(3).md`. It is the same Claude chat/export prefix, but longer: the shorter file ends at Tuesday 13 September 1977 — 15:58, while the new full file extends to Tuesday 13 September 1977 — 19:18.
- `Resuming from current checkpoint(1).md` **was missing** and should be included. It picks up immediately after the full derailment file, at Tuesday 13 September 1977 — 19:18/19:20, and continues into Wednesday 14 September 1977 — 18:16.

## Batch totals

- Included chronological files: **9**
- Source characters: **12,285,859**
- Cleaned characters: **6,752,466**
- Removed characters: **5,533,393**
- Overall reduction: **45.0%**
- Tracker lines removed: **3,564**
- Inventory lines removed: **3,545**
- Command footers removed: **3,800**
- Wrong narrator turns removed through correction-retcon pass: **264**
- User correction turns removed through correction-retcon pass: **264**

## Chronological output set

| # | Output file | Source | Story range | Notes |
|---:|---|---|---|---|
| 1 | `RP_01__1977-09-01_to_1977-09-08__greeting.md` | `Greeting(3).md` | Thursday, 1 September 1977 — 07:42 → Thursday, 8 September 1977 — 19:32 | Opening campaign through Thu 8 Sep evening. |
| 2 | `RP_02__1977-09-08_to_1977-09-10__cass_and_athena.md` | `Continuing with Cass and Athena (1)(3).md` | Thursday, 8 September 1977 — 19:34 → Saturday, 10 September 1977 — 14:17 | Thu 8 Sep evening through Sat 10 Sep before Hexfield. |
| 3 | `RP_03__1977-09-10_to_1977-09-11__hexfield_match.md` | `Continuing the Hexfield match(3).md` | Saturday, 10 September 1977 — 14:18 → Sunday, 11 September 1977 — 09:23 | Sat 10 Sep match through Sun 11 Sep morning threshold. |
| 4 | `RP_04__1977-09-11__mcgonagall_hidden_room.md` | `Disagreement with McGonagall's perspective(2).md` | Sunday, 11 September 1977 — 09:24 → Sunday, 11 September 1977 — 16:00 | Sun 11 Sep morning hidden-room material through afternoon. |
| 5 | `RP_05__1977-09-11_to_1977-09-13__previous_derailment_FULL_REPLACES_SHORT.md` | `Resuming conversation after previous derailment (1).md` | Sunday, 11 September 1977 — 16:03 → Tuesday, 13 September 1977 — 19:18 | This supersedes the earlier shorter file; same chat URL and exact prefix, but extends to Tue 13 Sep 19:18. |
| 6 | `RP_06__1977-09-13_to_1977-09-14__current_checkpoint_unicorn_rescue.md` | `Resuming from current checkpoint(1).md` | Tuesday, 13 September 1977 — 19:20 → Wednesday, 14 September 1977 — 18:16 | New missing continuation: picks up Tue 13 Sep 19:18/19:20 and continues through Wed 14 Sep. |
| 7 | `RP_07__1977-09-15_to_1977-09-16__waddellia_and_wandwrights.md` | `S05.5__1977-09-15_to_09-16__waddellia-named-and-the-wandwrights.md` | Thursday, 15 September 1977 — 07:34 → Friday, 16 September 1977 — 15:46 | Thu 15 Sep to Fri 16 Sep; bare-heading export format. |
| 8 | `RP_08__1977-09-16_to_1977-09-17__supabase_update_and_transition.md` | `Supabase database update (1).md` | Friday, 16 September 1977 — 16:42 → **Saturday, 17 September 1977 — 18:47** | Reconciliation/artifact session plus transition into Sat 17 Sep. |
| 9 | `RP_09__1977-09-17_to_1977-09-21__white_lightning_devotion.md` | `White Lightning's devotion.md` | **Saturday, 17 September 1977 — 18:47** → **Wednesday, 21 September 1977 — 14:22** | Sat 17 Sep evening through Wed 21 Sep. |

## Excluded / superseded

| Source | Reason |
|---|---|
| `Resuming conversation after previous derailment(3).md` | Same chat URL and exact prefix of the newly uploaded full version; replaced to avoid duplicate context. |

## Quality check

All included cleaned files were checked for remaining tracker headers, inventory headers, command footers, and message-time lines.

| File | Tracker | Inventory | Command footers | Message-time lines |
|---|---:|---:|---:|---:|
| `RP_01__1977-09-01_to_1977-09-08__greeting.md` | 0 | 0 | 0 | 0 |
| `RP_02__1977-09-08_to_1977-09-10__cass_and_athena.md` | 0 | 0 | 0 | 0 |
| `RP_03__1977-09-10_to_1977-09-11__hexfield_match.md` | 0 | 0 | 0 | 0 |
| `RP_04__1977-09-11__mcgonagall_hidden_room.md` | 0 | 0 | 0 | 0 |
| `RP_05__1977-09-11_to_1977-09-13__previous_derailment_FULL_REPLACES_SHORT.md` | 0 | 0 | 0 | 0 |
| `RP_06__1977-09-13_to_1977-09-14__current_checkpoint_unicorn_rescue.md` | 0 | 0 | 0 | 0 |
| `RP_07__1977-09-15_to_1977-09-16__waddellia_and_wandwrights.md` | 0 | 0 | 0 | 0 |
| `RP_08__1977-09-16_to_1977-09-17__supabase_update_and_transition.md` | 0 | 0 | 0 | 0 |
| `RP_09__1977-09-17_to_1977-09-21__white_lightning_devotion.md` | 0 | 0 | 0 | 0 |
