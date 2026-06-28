## User

[text/html] Marauders_Experiment_Log.html

I would like to continue where we left off, but I was trying to get a number of things back on track. please open the artifact for this.. please connect to the supabase and help me to update everything

## Narrator

I'll get everything loaded and reconciled. This is a session-start reconciliation, so let me do the non-destructive legwork first — read the protocol, connect to the database, pull current state, and open your log — then check with you on what specifically needs fixing before I write anything.

Let me start with the persistence protocol and your resume doc.

Let me read the truncated middle of PERSISTENCE.md — the session-flow protocol and load queries.

I have the protocol. Now the resume doc — this tells me where we left off and what's off track.

This is a substantial reconciliation thread — I can see the trajectory. Let me get the Supabase tool loaded and pull the live state, then open your log.

Tool's ready. Running the session-start load — active playthrough first.

Playthrough confirmed — Caleb Waddell, 7th-year, `A_owen`, active. Since this is a reconciliation pass, let me see the full table set (including the ones built during the prior cleanup — `open_threads`, etc.) before I pull anything.

Good — I can see the extended tables. Let me pull the ones your corrections touch. Starting with `open_threads`, since that's where the Hexfield-vs-MY-ASS mixup would live.

16 threads. I can see the shape of the mixup now — there's a "Caleb's society / Flitwick" thread sitting separate from the three Hexfield tracks, but the wording treats Flitwick's work as if it were Hexfield-adjacent. Let me pull mail and the minor-NPC rows (Dunstan Pyke), then I'll lay out the picture.

Mail's clear. Now the minor-NPC table — checking whether Dunstan Pyke already has a row.

Column names differ from the schema doc — let me check the actual columns.

Dunstan Pyke has no NPC row yet — only the one letter. Now let me ground the "MY ASS" / sconces correction in the source file so I get the name and permission details exactly right.

Now the Gryffindor sconce results (the truncated section) so I can seed the new tab accurately.

I have the full sconce inventory. Before I ask anything, let me check whether the renamed society's official name and the audit permission are already committed — that may answer a question for me.

This is very useful — the society name was actually settled in-fiction (Fri 16 Sept 12:59), and the 8/8 consent + Hexfield/Society separation are all committed. The DB already has the right structure; the "mixing" was in my prose last time, not the data. Let me read those specific commits in full so I reconcile to what's actually committed.

I have the authoritative picture now — and the good news is the **database already backs up your corrections**. The commitments table correctly separates the Society (Flitwick's track) from Hexfield (Henshaw/Hooch), records all three of the Society's names, and logs the 8/8 prefect consent + McGonagall. The "mixing" was in my prose summary last session, not the data. So this is mostly aligning the stale *thread* and *mail* summaries to what's already committed — low risk, no guessing.

Let me build the artifact with the Sconces tab first, then I'll lay out the exact DB changes for your go-ahead.

Let me validate the JavaScript still parses cleanly after those edits.

Let me actually evaluate `defaults()` to confirm the real row count and no corruption.

Artifact verified — 38 sconce rows, all 8 columns, all ten tabs intact, storage key unchanged so any data you've entered persists. Copying to outputs.

Artifact's open above — **Sconces** is now its own tab, seeded with the full MY ASS audit: Ravenclaw R1–R17, the Gryffindor common-room results plus the dorm-wing counts, the prefect corridor (including the well-seam and the shrine-critical 13C), the kitchen K1, and the three sconce-adjacent phenomena. Same storage key as before, so anything you'd already typed into other tabs is still there — edit and add freely.

Now the database. The reassuring headline first: **your corrections are already true in the committed record.** The commits show the Society deliberately carries three names — the dignified charter name *"The Hogwarts Society for the Study and Conservation of Historic Charmwork"* (Flitwick's, for the school); the Ministry application already filed 12 Sept under *"Ministry of Ye Ancient Sconce Safety"* with the initials left unspelled (the clerk-never-clocks-it gambit); and **MY ASS** as the common-room name only. Flitwick is the Society's patron and shepherds its charter — he is not on Hexfield at all (that's Henshaw + Hooch). The 8/8 prefect consent and McGonagall's survey authorisation are both logged. So the "mixing" was my prose last session, not the data — what's stale is the thread/mail *summaries*.

Here's exactly what I'd change. Say the word and I'll write all of it:

**Society / MY ASS** — (1) split the single "Caleb's society — Ministry registration" thread into its two real tracks: the school charter + officialisation (Flitwick → Dumbledore sign-off; charter scope still to draft; small school allocation confirmed-in-principle) and the Ministry Registry application (filed 12 Sept as "...Ancient Sconce Safety," initials unflagged; awaiting reply). (2) Fix the Registry-of-Societies mail row, which currently mislabels itself "the Flitwick officialisation track" — it's the Ministry filing, not the charter.

**Sconces (the experiment)** — (3) a new field-audit thread to pair with the artifact tab: consent-complete 8/8 + McGonagall authorised, survey announced/escorted/daylight/prefect-of-house, first walk pending McGonagall's escort, open gaps logged (9C/10C unrecovered, dorm-wings held for staff supervision, K1 elf-consent, exact Ravenclaw rows). The permission you mentioned (8 prefect signatures + head of house) is already committed — nothing to re-record.

**Dunstan Pyke** — (4) give him an NPC row (old amateur keeper, Ilkley side; donor, yes + 2 Galleons) and open a thread for the standing VIP invite to Hooch's weekly off-broom training (coach access, watch the team, the "love it → give more → tell others" model) plus his wish to attend a match.

**Hexfield (one bit of real drift I caught)** — (5) the Dept of Magical Games & Sports reply (the recognition checklist) arrived Fri 16 Sept per the commits, but the mail and thread still read "awaiting." I'll mark the outgoing letter replied, log the incoming checklist, and update the thread to "checklist in hand; demo = Sat 17 open session; reply to send." (6) Add a thread for Hooch's weekly off-broom drills (Caleb runs them, Liri scorekeeper) — the quid-pro-quo for Hooch's Governors letter, and the venue Pyke's invited to.

Two things to confirm before I write:

- **Pyke's match** — I read it as: he can't make tomorrow's (Sat 17) open session/demo because of letter timing, so he's aiming for the *next* Saturday, **24 Sept**. Right?
- **The society thread split** — split into two threads as in (1), or keep one thread with both tracks spelled out inside it?

Say "go" (with any tweaks) and I'll write the lot.

## User

what about incorporating and updating all these elements? and open as artifact?

## Narrator

This is a much bigger build — a "Continuity & Experiment Log" (v4) with new tabs, granular sconce fields, continuity threads, hexfield, expanded books, and a smarter merge that won't clobber your data. Before I touch it, let me map its full structure so I know exactly what "these elements" are.

Big structure — 23 tabs. Let me pull the column headers and row counts for every tab so I can see what content lives where.

COLS spans 2300+ lines — that's unusual. Let me look at how the data is actually laid out around the sconce definitions.

The file has a structural problem worth catching before I build on it. Let me confirm the shape of the duplicated keys.

This is the key finding. Let me actually test-render the draft to confirm the diagnosis before I report it.

Even stronger finding — the script is **syntactically invalid**, so the whole thing fails to run (blank tabs in the browser). Let me pinpoint the break.

Good — that confirms it conclusively. I test-rendered the draft, and **it won't run at all as-is.** The script is syntactically invalid: in the `sconceSchema` block an array gets closed early (a stray `]` around the "Canonical key" rows), so the whole `<script>` throws a `SyntaxError` and none of the tabs populate — you'd get a blank shell. On top of that, even if I only fixed that one break, three more problems are baked in:

- The seed **data** for many tabs (sconces, threads, schedule, classes, correspondence, creatures, hexfield, wood stock, wand builds, wand, hair) is sitting *inside the headers object* (`COLS`) instead of `defaults()`, so those header rows would render as stringified data.
- Several keys are **duplicated** in `COLS` (threads, schedule, correspondence, permissions, mind, creatures, gwenllian, cass, hexfield).
- Four tabs — **Weekly Schedule, Wood Stock, Wand Builds, Sconce Schema** — have no entry in `defaults()` at all, so opening them would crash.

So I can't just open this file. But the *content* you put into it is good and worth keeping — 23 tabs covering threads, schedule, post, permissions, books, mind/bond, the potion runs, night-flowers, creatures, Gwenllian/Merphila, Cass, Hexfield, the sconce schema + audit, wood stock, wand builds, wand testing, and hair custody. The right move is to **rebuild it cleanly**: correct headers + seed data for all 23 tabs, your smart merge logic kept (so future default rows never clobber your edits), the structure validated before I hand it back.

Here's how I'd run it, and I'll proceed on this basis unless you say otherwise:

1. **Preserve your content faithfully** — I extract every tab's data exactly as you wrote it and re-seat it in a working structure. I don't rewrite your wording.
2. **Reconcile only what we've verified against the database** — fold in the society three-name split (charter / Ministry-filing / common-room), Pyke's standing VIP invite, the Hexfield Dept reply that already arrived Fri 16, and the sconce alignment — and *flag* (not silently overwrite) anywhere else a tab visibly conflicts with a committed fact.
3. **Validate** — syntax-check and test-render every tab before presenting.

Two quick flags before I build:

- **Storage:** the draft uses a fresh key (`v4`), separate from the `v1` log I gave you a few minutes ago. I'll start clean on `v4` — shout if you actually typed data into the `v1` one and want it carried over.
- **Scope:** I'll preserve your text and reconcile only the verified items (option above). If you'd rather I actively align *every* tab's content to the database instead, say so and I'll do the deeper pass.

Say "go" and I'll rebuild and open it.

## User

[[basically, just add data to the one you have. and update what you have.. I dont care about official versions or name or anything. I dont even want you to database check. I have checked and used the text for this and if anything, this is more up to date and accurate]]

## Narrator

Crystal clear — preserve your content, no DB check, make it work. Let me extract everything from your draft faithfully and rebuild it into a clean, working structure. First, a tolerant parse to see exactly what content lives in each tab (this sidesteps the broken brackets by reading rows directly).

The census shows duplicate keys carried both headers and data. Let me pull the actual header rows and sample data rows I need to reconstruct each tab correctly.

Good — I have what I need. Let me pull the full content for every tab (and the wand-build names, to label the wand-testing columns) into a clean dataset I'll generate the new file from.

Clean extraction. Two tabs look duplicated by the corruption (sconceSchema=24 rows, classes=10). Let me inspect those before I dedupe.

Now I understand the duplication (the corruption repeated the schema and some blank rows). Let me grab the last few header-defining rows, then generate the clean file.

Last detail — the hair custody columns. Let me see all hair rows, then generate.

Everything extracted and mapped. Now I'll generate a clean, working version — your 23 tabs, your content preserved, proper headers, the smart merge kept, the broken brackets gone, and the misleading auto-total dropped (you've got your own custody totals in the hair tab).

All widths match their headers, no mismatches. Now validate — syntax check plus a full test-render of every tab.

Scope issue in my harness — let me run the checks inside the same eval scope.

Validated cleanly — JS syntax OK, all 23 tabs render without crashing, headers are clean, every row matches its column count, and the merge path loses no rows. 231 data rows seeded. Copying to outputs and opening it.

It's open above and working — all 23 tabs render, everything's editable, and it saves to this artifact (storage key `v4`, same as your draft, with the smart merge kept so future default rows never overwrite your edits).

What I did, strictly per your call — no database check, your text preserved:

- **Rebuilt the broken structure.** Fixed the stray bracket that was killing the whole script, moved the seed data out of the headers object where it had landed, removed the duplicate keys, and gave the four data-less tabs (Weekly Schedule, Wood Stock, Wand Builds, Sconce Schema) their content so they no longer crash. Your rows came across verbatim — 231 of them across the 23 tabs.
- **Two clean-ups from the corruption only** (not content edits): the Sconce Schema had its field list duplicated, so I deduped it to the 13 fields; Merdrake had repeated blank rows, so those collapsed — use **+ Add row** for new entries.
- **One behavior change:** I dropped the old auto-total on the hair tab, because your Hair Custody tab already carries its own Sage/Caleb/custody-check totals and the old auto-sum would have double-counted them.

The only thing I had to supply rather than copy was **column labels** for the tabs your draft didn't carry clean headers on (sconces, wand testing, wood stock, hair custody, and the continuity tabs). I used sensible ones — rename any that don't fit; it's cosmetic and saves like everything else.

If any tab looks off or a label's wrong, tell me which and I'll fix it.

## User

*okay, I believe I am in my office and I am checking the wiggenweld

## Narrator

▼ Friday, 16 September 1977 — 16:42

The office had kept the afternoon for him: low gold light through the settable window, the fire banked to a murmur, Solomon dozing in his frame with one paw across his nose. The Wiggenweld stood in its ranks along the worktable — the boiled Control gone amber and still in its flask; A and C beside it, the two that had closed a potato cut inside a minute, C a breath behind A; B's cold ethanol half waiting stoppered for its heated join; and D and E further down, all-cold and faintly cloudy, days off ready yet. The silver-water demijohns sat in the corner where he'd left them, the nearest throwing a thin pale thread of light up the stone. The titration kit was clean and waiting beside a fresh potato and the dish of saline. Everything was where the work had left it.

## User

*I heat the ethanol portion of B with the mint and moondew. I pour it into the flask. I heat and cook the salamander blood and wiggentree bark in the cauldron with water. then I combine the two.*

## Narrator

▼ Friday, 16 September 1977 — 17:21

The ethanol side took the heat fast — mint waking sharp and green over it, the moondew threading the warmth with that pale, unhurried light it always carried — and he tipped it into the flask while it still steamed. The cauldron took longer: salamander blood thinning from clotted dark to a bright scarlet as the water came up, the wiggentree-bark strips softening and bleeding their resin until the whole decoction ran a deep woody red, woodsmoke and something medicinal under it. He let it cook down, then brought the two together. The join did what joins do — a brief disagreement of colour, scarlet and pale folding through one another — before it settled, the way A and C had, to the turquoise of a Wiggenweld that has decided to be one thing. B sat finished in its flask now, the heated-ethanol twin to A, indistinguishable from it to the eye.

## User

*cut the potato and compare it to A and C*

## Narrator

▼ Friday, 16 September 1977 — 17:29

Three clean cuts in the same potato, a few inches apart, each opened to the same pale depth. He set a measured drop of A into the first, B into the second, C into the third — neat — and counted.

A went the way it always did: the cut edges drawing closed inside the minute, knitting to a faint seam and then to nothing. B did the same, near enough that the count came out level with A's; if there was any difference between them at full strength, his eye couldn't swear to it. C closed a breath behind the other two, as it had before. Three seams faded to smooth skin. At neat strength, the three of them were as alike as the eye could tell.

## User

*I make the ethanol portion for F of the mint and moondew and put it in the cold storage* *I make the ethanol portion for F of the wiggentree bark and salamander blood and put it in cold storage.*

## Narrator

▼ Friday, 16 September 1977 — 17:46

He built the first F-half cold: mint and moondew steeped straight into the ethanol with no flame near them, the mint giving up its sharpness slower this way, the moondew holding that pale light the way it only ever did unheated. Stoppered, labelled, into the cold store beside D and E.

The second half he kept just as cold — and the salamander blood showed him the difference plainly. Where it had thinned to bright scarlet over the cauldron flame for B, here in the cold ethanol it stayed dark and slow, the wiggentree-bark resin bleeding out in thin reluctant threads rather than the deep red rush the heat had pulled. He stoppered and labelled that one too, and set it in the cold beside its twin. F's two halves sat in the dark of the store now, separate and unhurried — days off, the same as D and E.

## User

*I go outside and get hagrid's axe and a hanful of the louse from his wood pile*

## Narrator

▼ Friday, 16 September 1977 — 18:04

The light had gone long and bronze by the time he came down the slope to the hut, the grass cold and damp through his shoes, woodsmoke standing straight from the chimney into still air. Hagrid was up at the pumpkin-patch lean-to, a great dark shape moving slow around the pale one — White Lightning, settled and unbothered — neither of them needing him just now. The wood pile leaned against the hut's end wall, and the hand-axe was where it always was, sunk a half-inch into the chopping round; he worked it free. Then he rolled back one of the lower, damp logs: the woodlice were there in their hundreds, grey and plated, curling away from the light, and he gathered a handful into a twist of cloth without much trouble.

## User

*I go to the nearby cherry trees that Hagrid pointed out* *I do not remember if there are bowtruckles so I look for them and hold the lice out to check*

## Narrator

▼ Friday, 16 September 1977 — 18:12

The cherry stand was where Hagrid had shown him — a little knot of wild trees just off the tree-line, dark-barked and old enough to matter, their leaves gone the deep red of the season. In the failing light they gave nothing up: bark was only bark, and the branches held still. He went to the nearest trunk and held the twist of woodlice open on his flat palm, the grey bodies stirring against the cloth.

It took a moment. Then a length of what he'd taken for a knotted twig on a low branch unfolded — two stick-thin arms, a flat brown face, eyes like two wet seeds — and a bowtruckle turned its head toward his hand. Woodlice were the one thing the little tree-guardians could never quite pretend not to want. It didn't come down. It watched the lice, and it watched him, and it stayed exactly where it was.

## User

"What's up bud? what's going on? do you not want these?"

## Narrator

▼ Friday, 16 September 1977 — 18:13

It answered — not in words, of course, but in a dry little creak-and-click from somewhere in its narrow chest, the sound a green branch makes when it bends. One twig-arm lifted and tested the air toward his palm, then thought better of it and drew back; the creature sidled a careful inch along the branch, eyes never leaving the lice. Whatever held it wasn't quite fear — more the flat, ancient wariness of a thing whose entire purpose is guarding the tree it lives in — but it leaned, unmistakably, toward the grey bodies stirring in his hand. It creaked once more, lower, and held its place, as though the next move were his to make.

## User

*I set some down on the flatter area where like the trunk branches off and step back and get out my jar of grafting tar and open it and pull out the stick to show the sticky substance.* "Look, I only want a couple of smaller branches. I do not want the tree to die either. but this is also good for it to be pruned a little so the other areas grow stronger. I am going to seal off the cuts so the tree does not get sick."

## Narrator

▼ Friday, 16 September 1977 — 18:15

He set the lice down in the crook where the trunk forked — a small grey scatter on the bark — and stepped back, giving the tree its distance. That was the part the bowtruckle understood: the ground opening up between him and the trunk. It came down in quick stick-jointed darts, reached the crook, and seized a louse in both twig-hands, folding it away somewhere before going after a second and a third with the single-minded greed of a thing that's wanted this all evening. Higher up, a knot in the bark that had only been a knot unbent into a second keeper, and then the suggestion of a third further along the branch — the woodlice-smell had reached all of them. None so much as glanced at the grafting-tar stick he held out; that meaning was his, not theirs. But the first one had stopped guarding and started eating, and the air around the lower branches had, for the moment, gone quiet and unminded.

## User

*cut a couple of branches* *repeat on another 2 trees*

## Narrator

▼ Friday, 16 September 1977 — 18:24

The first tree gave easily, its keepers nose-deep in the lice: he took two slim branches low on the trunk, the hand-axe biting through dark bark into the pale, faintly pink wood beneath in a couple of clean strokes each, then worked grafting tar over both wounds with the stick until they sat sealed and black and weatherproof. The other two stood a few yards on, and the woodlice-smell had done that work for him as well — what keepers they had were drawn off toward the feeding-crook, so the low branches came still and unguarded. He repeated it twice over: a pair of small branches apiece, the axe, then the tar pressed into each cut. One bowtruckle clung on through the last of it, watching from high in the third tree, too far up to mind the wood he was taking and unwilling to leave its post — but it only watched, and let him be. Six slim cherry lengths lay gathered at his feet by the time the light had gone properly grey, every cut behind him sealed.

## User

*reducio the sticks and put them in my pocket. put some wood lice up high enough for that one to have some.* "Good for you. for doing a good job, here"

## Narrator

▼ Friday, 16 September 1977 — 18:26

A muttered *Reducio* and the six cherry lengths shrank to a bundle of matchwood in his palm; he tipped them into his coat pocket, where they weighed almost nothing. For the last keeper he reached up as high as he could manage — no higher; the ground was quite far enough for him — and tucked a small scatter of woodlice into a fork within stretch of where it clung. Then he stepped well back. The bowtruckle considered him a moment longer, then came down to the cache in quick wary darts and set to, twig-hands working, the very picture of a guardian deciding the bargain had been a fair one. "Good for you," he told it, low. "For doing a good job. Here." Behind him the two sealed trees stood quiet in the last grey light, and the cherry stand had, on the whole, forgiven him.

## User

*I look for birch and do the same investigation*

## Narrator

▼ Friday, 16 September 1977 — 18:34

Birch was easy to find even in the failing light — pale, almost luminous trunks standing out against the dark of the tree-line a little way along, a loose stand of them with their papery silver-white bark and the last yellow leaves still clinging. He went to the nearest and shook out what little remained in the twist of cloth — only a few lice now, the dregs of the handful — and held them open on his palm against the bark, the way he had at the cherries.

Nothing unfolded. No knot unbent into a face, no dry creak came out of the branches; the birch held perfectly still and gave him only birch. He moved to a second trunk and a third and got the same — pale bark, quiet wood, the few lice on his palm drawing no taker at all. Whatever it was that had set three bowtruckles guarding the cherry stand, this birch had none of it. The trees stood unminded in the grey, his for the taking if he wanted them.

## User

*take the trees*

## Narrator

▼ Friday, 16 September 1977 — 18:41

With no keeper to coax and no bargain to strike, the birch went quickly. He picked the straightest of the slim lower limbs — the kind that would true up into decent wand blanks — and the hand-axe took them in clean strokes, the pale bark parting to show wood paler still, almost white, and faintly damp. Half a dozen lengths came away across the stand, and he worked the grafting tar over every cut as he went, the stick smearing each wound black and sealed against the wet and the cold. The light was nearly gone by the time he straightened up, the birches ghost-pale around him and the tree-line behind them already a solid wall of dark. The cut branches lay gathered at his feet, sealed trees standing quiet above them.

## User

*reducio and put them in my pocket*

## Narrator

▼ Friday, 16 September 1977 — 18:42

*Reducio* again, quietly, and the six birch lengths drew down to a pale little bundle of slivers in his hand; he slid them into the other coat pocket, the cherry beside them, both bundles together weighing next to nothing. The grafting-tar jar went back into the satchel near-empty, the hand-axe with it. Around him the birch stand had gone to silhouettes and the cold had real teeth in it now, the grounds dark all the way down to the distant warm squares of the castle windows. Cherry and birch both, cut and sealed and pocketed — nothing left out here but the walk back up.

## User

*return the axe* *refill on woodlice* *go and pet my unicorn and tell her goodnight*

## Narrator

▼ Friday, 16 September 1977 — 18:51

He sank the hand-axe back into the chopping round where it had stood, rolled a damp log at the foot of the pile, and gathered a fresh handful of woodlice into the cloth twist before they could scatter — quick work, done in the near-dark. Up at the lean-to a lantern burned low against the cold, and Hagrid was banking the straw down for the night; he lifted a hand, said she'd taken the whole evening feed without fuss, and stepped back to let Caleb come close.

White Lightning lay settled in the clean straw, the splinted foreleg out straight before her, and she turned her head as he came — no startle in it, the way there never was with him. He laid a hand flat along the warm slope of her neck, the coat impossibly fine under his palm, and she leaned the smallest amount into it and let a long breath out through her nose. The horn caught what little lantern-light there was. She didn't move away. He told her goodnight, low, the words just for her, and her ear turned to follow them.

## User

"I have to go back and finish making your food. I have like 8 kilos of bark cooking. so I'm leaving, but leaving for you. making you noms. have a good night, love." *go to the RoR*

## Narrator

▼ Friday, 16 September 1977 — 19:09

She let the words settle against her ear and didn't lift her head from the straw — only that, which from her was a kind of answer. Hagrid said he'd see her right through the night, and to mind the cold going up. The walk back was long and black, the grass stiffening toward frost, the castle a great dark shape pricked with warm windows above him; the seventh-floor corridor stood empty when he reached it.

The Room knew the want before he'd finished forming it. The door gave onto the workshop he'd left going — warm and close and thick with the smell of cooking bark, woody and resinous and faintly sweet. The cauldrons stood in their row over steady blue flame, birch and rowan strips turning slow in dark liquor, the better part of eight kilos of it reducing down toward the concentrate she'd actually take. Steam hazed the lamplight. It had cooked the whole while he was gone, and it wanted finishing.

## User

*I think you should update the wood in the artefact. in general. but other woods need added. like the unicorn feed wood. and billets.* *take out a piece of wood from each and see if it can be mashed or pulverized yet*

## Narrator

The Wood Stock tab is already fairly rich (it has the feed woods — birch/rowan/hawthorn — and the modular birch parts). What's genuinely missing is tonight's fresh cherry + birch cuttings, the current ~8 kg feed batch, and a billets row. Let me add those, then run your beat.

*OOC: Wood Stock updated above — added tonight's fresh cherry ×6 and birch ×6 cuttings, the ~8 kg birch+rowan feed batch cooking, a billets row, and a hawthorn-feed-token row (the existing feed woods were already in there). Open this version and the new rows merge into whatever you've already got — your edits aren't touched.*

▼ Friday, 16 September 1977 — 19:14

He took the long spoon and fished a strip out of each cauldron in turn, laying them steaming on the slate to test. The rowan came out dark and yielding — when he pressed it with the flat of the spoon it gave at once, the cooked fibre breaking down to a soft wet pulp under almost no pressure; that one was ready to mash. The birch was further behind: it had gone soft on the outside, the bark sloughing easily, but the core of the strip still held a stringy resistance when he pinched it, not yet willing to come apart into anything you could call a paste. The hawthorn token-strips were somewhere between — soft, but stubborn at the heart. Rowan would pulverize now; the birch and hawthorn wanted longer over the flame before they'd go down smooth.

## User

*fish out or strain all of the rowan wood into a bucket, put the heat to low to reduce* * go over to the wood side*

## Narrator

▼ Friday, 16 September 1977 — 19:20

He strained the rowan out first — ladle and a square of muslin over the bucket's mouth, the soft cooked pulp catching dark and wet in the cloth while the liquor ran through amber beneath it — until the cauldron was emptied of solids and the bucket held the whole of it, a heavy slop of rowan ready for mashing. Then he turned the flame down low under what was left, the birch and the hawthorn settling from a working boil to a slow, patient reduction that would mind itself a good while without him. The cooking-bark smell stayed thick in the air as he crossed the Room.

The wood side was as he kept it: the long bench under steady lamplight, the little lathe at its end, the rack of birch blanks and routed parts and the lone willow and oak and pine, the grafting and carving tools laid in their roll. The Room had set out the carving books again, the three of them squared on the bench corner. His pockets held the new cherry and birch, shrunk small, waiting to be let back out to size.

## User

Eldower updates to add
G. Eldower — current state

Replace old status:

Lead, not permission. Visit/write by appointment or lamp-lit chance.

With:

Met Friday 16 September 1977. Active wandcraft contact. Practical-pupil / apprenticeship-leave thread open. Wand B and one Whomping Willow whip left with him for study. Eldower wrote a letter of intent for Hogwarts, deliberately omitting the gold hair because “paper travels.”

Workshop / physical description

Eldower’s shop is confirmed:

Back of Slipshod Lane, off Diagon.
Low door near the end of the lane.
Flaked gilt sign: G. ELDOWER.
Window full of wood, not velvet wand-display theatre.
Raw billets, off-cuts, half-shaped sticks clamped mid-work.
Smells of cut wood, hot shellac, and something mineral.
Eldower himself: older, sleeves shoved past the elbow, hands stained old-tea brown, blunt, flat, working at a back bench. He greets them by telling them Ollivander’s is the other end of the Alley and not to “bleed enthusiasm” on his floor.
Personality / register

Add:

Eldower is a blunt back-lane craftsman, not a retail wand-seller. He is not warm in the normal way, but he is honest about the work. His care shows as exactness, refusal to lie, and willingness to teach only when the student understands that craft is slow.

Core line:

“I don’t lie about the work.”

Business / role

Add:

Eldower is a non-Ollivander wandmaker/wandworker who handles practical craft: woods chosen, cores set, wands made and mended. He is not the school-wand shop. He is the person-route for actual wandcraft, anomalous core consultation, and possibly mending/reading damaged or experimental wands.

Brigham / wand-bond link

Add:

Eldower recognized the Brigham name and recalled a Brigham–Ollivander working on reading a wand-bond from outside, still used in the trade. He seized on Caleb’s “wand as bond / being answered” framing and offered an honest exchange: he would talk wands and cores if Caleb did not go vague about the anomalous wand.

This is important because Eldower is not just “wand guy.” He plugs into the Brigham / bond / wand-answering thematic line.

Handmade Wand B

Add:

Eldower examined Caleb’s handmade Wand B and immediately read it: rowan, hand-cut by Caleb, competent but not trained; Reparo/annealed-whole join rather than glue; unicorn core, but the wrong unicorn hair — not tail hair. He recognized the body-hair issue by handling it.

Current custody:

Handmade Wand B — left with Eldower to study.

His reason:

“I’ll learn more from your mistakes than your hopes.”

Gold unicorn hair interpretation

Add:

Eldower did not keep the gold hair. He examined/discussed it, then gave it back to Caleb. He distinguished “using up” a magical material in a potion from “housing” it in a durable made object. He does not brew; nothing leaves his bench to be used up. A wand may be a worthy home, but only if the gold has a wand in it. The real question is whether, not which wand.

Core wording to preserve:

A wand is one use of a core. Some cores want to be wands. Some turn sullen in the wood. The right home might be a wand, or it might be something nobody has named yet.

Whomping Willow material

Add:

Eldower handled Caleb’s Whomping Willow whip and blank. The fresh whip was “green — worse than green — it isn’t dying.” The seasoned blank was properly treated: warming charm, sealed grain, good hand, but it still had a liveliness willow should lose once cut. Eldower did not explain it away. He marked it as an anomaly.

Current custody:

One Whomping Willow whip left with Eldower. Caleb kept the seasoned willow blank.

Apprenticeship / practical pupil thread

Add:

Caleb asked whether Eldower would teach him. Eldower did not offer a casual “yes,” but the thread is open as practical bench training. Eldower wrote a plain letter of intent for Hogwarts: Caleb’s work shows “a hand worth the training,” and Eldower will take him as a practical pupil if the school grants him days for bench-work. He asked only that “the door be opened.”

Current next step:

Take Eldower’s letter of intent to Flitwick and/or McGonagall to ask for apprenticeship-leave / bench-work days.

Design plates / modular wand designs

Add as connected but not necessarily Eldower-owned:

After the Eldower visit, the Room permanently mounted Caleb’s two wand-design plates in the woodshop and produced woodworking books plus a self-writing slate. The slate teaches cutting/woodworking only, not whether the thing answers as a wand. This dovetails with Eldower’s warning: craft can shape the housing, but only real wandwork/testing can answer whether a core wants that housing.

Designs now on record:

modular / five-ring wand;
open-rib suspended-core wand.
Best compact tracker row

Use this if you only want one row:

G. Eldower / wandcraft — Met Fri 16 Sept at Slipshod Lane workshop. Blunt back-lane wandworker, not Ollivander retail. Recognized Brigham/Ollivander wand-bond work. Read Caleb’s handmade rowan Wand B as competent-not-trained, Reparo/annealed whole, wrong unicorn hair/body hair. Returned gold hair to Caleb; framed wand as possible “home,” not use-up, but question is whether, not which wand. Left with Eldower: Wand B + one Whomping Willow whip. Caleb keeps seasoned WW blank and gold hair. Eldower wrote letter of intent for Hogwarts practical-pupil/bench-work days, omitting gold because paper travels. Next: take letter to Flitwick/McGonagall; return to Eldower with a full day, not stolen minutes.

"if you could use this info to update and correct... I will make the modular parts based on what the design plate said, but I do not currently have any.. Category	Correct state
Whole wand blanks, pre-Wand A/B	birch 10, hawthorn 3, rowan 7, oak 1, pine 1 = 22
Probable whole blanks now	birch 10, hawthorn 3, rowan 5, oak 1, pine 1 = 20
Wand A	disassembled; 2 empty rowan half-billets scrap + 3 recovered white body hairs
Wand B	rowan, 3 white body hairs, Reparo/annealed; left with Eldower
Whomping Willow blank	with Caleb, warming charm on, beeswax-sealed
Whomping Willow whips	1 fresh whip with Caleb, 1 fresh whip with Eldower, 2 deadfall sticks with Caleb
Modular five-ring wand	design plate only, not started
Open-rib/suspended-core wand	design plate only, not started
Suspect drift line	“4 birch routed halves / 4 drilled bodies / 4 end-discs” marked do not use unless later confirmed
Bluntly: the “modular parts prepared” row should never have been in there. That was me over-interpreting a later tracker artifact instead of respecting the actual actions.         and     "    so tracker and this artifact update please

## Narrator

Got it — precise corrections plus the full Eldower state. Let me apply all of it to the artifact (woodStock + wandBuilds + the Eldower card), then give you the corrected tracker. First, let me see the current wandBuilds, books, and threads rows so I edit precisely.

Now the current woodStock block (it grew when I added rows last turn) so I can apply your blank-count and modular corrections precisely.

All corrections noted, including the suspect "modular parts" line and the precise blank counts. Let me apply them to the artifact (woodStock + wandBuilds + the Eldower entries) and add the apprenticeship thread.

Bug in my edit — the array-targeting matched the header object, not the data. Let me redo it correctly from the clean v4 file.

Syntax OK now. Full render check + verifying the corrections landed.

*OOC: Updated above — and because several of these are corrections to existing rows (not just additions), I bumped the storage key so it seeds clean on open. If you'd typed your own data into the prior version, say so and I'll merge instead of reseed.*

What changed:

- **Wood Stock** — whole blanks corrected to birch 10 / rowan 5 / hawthorn 3 / oak 1 / pine 1 (rowan noted as 7 pre-A/B, 2 spent on the wands). The "4 routed halves / 4 drilled bodies / 4 end-discs" line is now a single **SUSPECT DRIFT — do not use** flag, not stock. Willow split into the real state: seasoned blank (warming charm, beeswax-sealed, still oddly live) + 2 deadfall + fresh whips (1 with you, 1 with Eldower). Added Wand A's scrap (2 empty rowan half-billets + 3 recovered white hairs).
- **Wand Builds** — Wand A → disassembled; Wand B → rowan, 3 white body hairs, Reparo/annealed, **left with Eldower**; Gold-core → not built, gold returned ("whether, not which wand"); WW → material only, not built; Modular + Open-rib → **design plate only, not started, no parts cut**; Eldower consultation → done Fri 16, full read-out.
- **Eldower** — updated on the Books card and the Permissions row (met Fri 16, active wandcraft contact, blunt back-lane craftsman), and added an **apprenticeship / bench-work** thread (deliver his letter of intent to Flitwick/McGonagall; return with a whole day).

Corrected state, no time passed — still at the wood side:

## User

I am putting this here for current reference as I learn to do this. "Interleaved Wand on the left, Aether-Slung on the right, a fixture of the room now. Below, a shelf pushed out three books that had not been there: Timber and the True Edge, The Lathe and the Living Grain, and a slim one, Small Works: On Carving What Will Be Held. And beside them a slate, blank, that began to draw its own chalk lines as he looked at it — taking the left-hand plate and breaking it down.
The marks resolved into a sequence, the carving only, the magic left out of it:
One — the blank. A straight-grained billet, over length and width. Centre marked dead-true on both ends, mounted between centres. Everything hangs off that axis; let it wander and no disc will ever seat clean.
Two — the body. Rough to round, then down to the wand's lasting profile — the part that never changes. The tip-ward third stays fat for now.
Three — the taper. Mark the seats along that third. Turn each down to its own diameter, largest near the body, smallest near the tip, one smooth slope. That slope is the whole trick: a disc rides down until its bore meets its matching diameter, and there it stops.
Four — the tip. Part a separate tip. Cut a male thread on the shaft's very end with the screw-box; tap the tip to take it. It screws home and traps the stack.
Five — the discs. A ring of each material, trued outside, then bored through the centre to its appointed width — widest seats first, narrowest last. Wood and bone you turn and bore; the rest are shaped their own ways and bored to match.
Six — fit and finish. Slide each to its stop; the taper's gentle squeeze holds it, no glue. Tip on. Wax the wood that stays — leave the seats bare, or you kill the grip.      The slate wiped itself and turned to the right-hand plate — the open-ribbed thing, the core hung naked in its cage — and the chalk began again, slower this time, as though even the Room found this one harder.
One — the blank. Dense, dead-straight grain; strength matters here more than anywhere, because most of the wood comes away and a cage is what's left. Mark the centreline and the rib pattern: three or four ribs running the length, or a clean spiral for the turning variant.
Two — the void. Bore the core-channel down the exact centre of the axis — the hollow the core will hang in. Pilot first, then ream true. A wandering bore ruins everything that follows.
Three — the windows. Pierce the long openings between the ribs, working from the outside in to meet the bore, leaving the ribs standing. Small passes. This is fretwork at the scale of a wand, and the most delicate cut on either wall.
Four — the ribs. Carve each to even section, fair the run of them — or the spiral — relieve the inner faces. Light as you dare, and no lighter; the cage still has to hold.
Five — the fittings. Turn the collars, the bands, the rings that carry the stabilizers, the focus tip, the tuning collar — each bored to ride the ribbed body at its station.
Six — seat and cap. Cut the seats, fit the rings down the open length, cap with the tip and collar. Bare bore, trued.
At the foot, the same small hand wrote and stayed: the cutting can be taught — though this one will cost you wood and temper before it costs you anything else. whether a core that touches nothing will ever answer, no plate here can say. an old man on a lane would tell you a thing left alone is no wand at all.      Design 2 — the core isn't actually floating free; it's threaded through the whole length with two fixed, threaded ends. It seats into the threaded pommel at the back, runs through a solid handle where the wood closes around it on all sides (real contact — a proper grip-marriage), is exposed only across the open-rib midsection, and anchors at the front in the focusing tip (the tip it would've had anyway, cut from the end and threaded with a little fitting that takes the core). Because both ends thread, the core can be unscrewed and swapped. So the cage is display/resonance across the middle, not the whole story — there's genuine wood-on-core contact where it's held. That actually answers the objection Eldower (and the slate) raised about a core "touching nothing" — your handle is the marriage; only the show-section is open.
Design 1 — the tip isn't a foreign piece: it's cut from the same billet (the wand's own end), threaded so it still reads as one continuous stick of wood but can come off to load the discs and then screw home to trap them. Grain-continuous, just severable.
Both now saved that way in the records (the earlier "never touches wood" reading is overwritten — current reference reflects the through-threaded, two-fixed-ends, swappable-core version).
The one thing I'm keeping open on purpose, not dodging: whether a swappable core ever settles into a wand the way a fixed one does is the same unanswered question as the modular discs — the carving's teachable, the answering isn't, until you find out at the bench. Did I capture the intent right, or is there a piece of it I've still got wrong?

## Narrator

Got it — recording the corrected design as current canon (through-threaded, two fixed ends, swappable core; grain-continuous severable tip), and the "never touches wood" reading is gone. Let me update the two entries in the records, then give you my read.

## Narrator

My edit errored (the hardcoded old-string didn't byte-match, so nothing was written). Let me redo the replacement by locating the rows directly instead of guessing their exact text.

Records updated — both designs now reflect the through-threaded, two-fixed-ends, swappable-core canon, and the "never touches wood" reading is gone.

You captured it right. Nothing's wrong; two observations, one per design.

**Design 1** — you've already nailed the two things that make it work, so don't second-guess them: the *gentle, self-holding* taper (each disc gets exactly one seat — too steep and it won't grip, too shallow and it's murder to seat and free) and the **bare seats** (wax anywhere on the slope kills the friction). The grain-continuous severable tip is the elegant part: it still reads as one stick, opens to load, screws home to trap. Sound all the way through.

**Design 2** — the through-threaded handle genuinely answers the "touches nothing" objection; the cage is only the show-section. The one thing to settle at the bench (not a contradiction): "full contact" + "swappable" means the handle bore is a close **slip fit** — contact on all sides, but the core can still be drawn through — not an interference or glued fit. And a swap means clearing *both* threaded ends in order: back off the tip fitting and the pommel, draw the core out one end. So "married" and "swappable" reconcile cleanly — it's a slip-fit marriage, not a permanent one.

And the question you're keeping open is the right one to keep open — whether a swappable or segmented core ever *settles* the way a solid one does is genuinely the same unknown for both walls. The carving's teachable; the answering isn't, until the bench says so.

(Records reseed clean on open, as before — I'll lock the key once the reference stops moving.)

## User

*I want to take time to go through all 3 books and specifically map sections to parts of my projects that matter.... i.e. taking the time up front to know where I need to look and when per each of the 12 instructions*

## Narrator

Good plan — front-loading the index so you know which book and which section to open at each step, instead of hunting mid-cut.

Quick confirm on scope: by "the 12 instructions" I'm reading the two design plates' step sequences — Design 1 (the modular/disc wand), steps 1–6, and Design 2 (the open-rib/suspended-core wand), steps 1–6. I'll map each of those twelve steps to the book and section that actually covers it, and I'll build out the three books' internal structure as I go — *Timber and the True Edge*, *The Lathe and the Living Grain*, and *Small Works: On Carving What Will Be Held* are the Room's craft library, so their tables of contents are mine to set; that's not poking at anything load-bearing.

One thing to pin before I build it, since it changes the shape of the work:

## User

Q: How do you want the carving index delivered?
A: In-fiction reading scene

## Narrator

▼ Friday, 16 September 1977 — 21:15

He brought all three down off the shelf into the lamplight, and they were not the same kind of book at all. *Timber and the True Edge* was the heavy one, close-printed and old in its phrasing, more about the wood and the grain and the edge that meets it than about any finished thing. *The Lathe and the Living Grain* was nothing but turning — mounting to roughing to the last true cut. *Small Works: On Carving What Will Be Held* was the slim one, and the densest for its size: all threads and fretwork and the fit of a thing in the hand.

He read with both plates propped where he could see the twelve steps, and not to learn them by heart — to know which spine to reach for mid-cut, with a chisel already in his hand. By the time he shut the slim one the castle had gone quiet under him and the cauldrons were murmuring on low. The index came out like this:

**Design 1 — the disc wand**
1 — the blank · *Timber*, "Choosing the Stick" and "The Run of the Grain" for straight stock; "Centres and Truth" for marking dead-true; mounting in *Lathe*, "Mounting and Roughing."
2 — the body · *Lathe*, "Mounting and Roughing," then "The Body Profile."
3 — the taper · *Lathe*, "The True Taper," with "Sizing to a Number" to hit each seat's diameter.
4 — the tip · *Small Works*, "Threads and Fittings" — the screw-box, the tap, the tip cut from the wand's own end.
5 — the discs · *Lathe*, "Sizing to a Number" and "Boring on the Axis"; *Timber*, "Bone, Horn, and Other Stock" for the rings that aren't wood.
6 — fit and finish · *Small Works*, "Seating and Fit" and "The Last Hand"; *Timber*, "Sealing the Lasting Wood" for the rule — wax the wood that stays, leave the seats bare.

**Design 2 — the open-rib wand**
1 — the blank · *Timber*, "Choosing the Stick" and "The Run of the Grain," read hard this time for density and dead-straight grain; strength is everything when most of the wood comes away.
2 — the void · *Lathe*, "Boring on the Axis" — pilot first, then ream true.
3 — the windows · *Small Works*, "Piercing and the Standing Rib." The most delicate cut on either wall; small passes.
4 — the ribs · *Small Works*, "Fairing the Rib" — even section, inner faces relieved, light as you dare.
5 — the fittings · *Lathe*, "Collars, Bands, and Rings," each bored to ride its station per "Boring on the Axis."
6 — seat and cap · *Small Works*, "Seating and Fit" and "The Last Hand"; bare bore, trued.

And one that sits across both: every thread — the severable tip, the two fixed ends, the pommel, the handle's grip-marriage — lives in *Small Works*, "Threads and Fittings." That section he'll wear out first.

The sheet was done. The birch and hawthorn went on softening in the cauldrons, and the bench sat bare and waiting.

## User

*I would just like to prepare my billets tonight. I would check the books to see if anything matters for planing.. I specifically need thicker billets for my wider wands. I want to go ahead and plane all cherry and birch*

## Narrator

▼ Friday, 16 September 1977 — 22:50

*Timber and the True Edge* fell open at "The Run of the Grain": read which way the grain rises and plane *with* it, never into it, or the iron tears the face instead of paring it. A few lines down, smaller — green stock is planed oversize and left be, because wood cut this fresh moves as it dries, and a billet brought to its number tonight is one that lies to you by morning.

He shook the cuttings out of his pocket and brought them back to size, one tap each, then clamped the first and read the grain off its end before the iron touched it.

Cherry came up sweet — fine, close, the shavings curling off pale gold and damp, the smell faintly of an orchard. Birch was paler and blander and straighter still, its shavings whiter, wetter. Two faces true on each, a third squared, the fourth left proud; and the heaviest sections — billet enough for a wide-bodied wand — he left thick all round, barely touched.

By the last clean birch face the shavings stood in drifts and the cauldrons had gone quiet-low behind him. Twelve rough billets in a row, green and faintly breathing, sealed-end to sealed-end. None of them a wand yet. All of them started.

## User

*warming charm on each of them to help with slow drying* *to cauldrons to check wood pieces and reductions*

## Narrator

▼ Friday, 16 September 1977 — 23:05

He laid a low warming charm over each billet in turn. The green wood drank it; the row began to give off a faint sappy warmth, the heat settling into the grain to pull the moisture slow and even rather than fast and splitting. Twelve of them ticking gently in their drifts of shaving.

Then across to the cauldrons. The birch had finally let go — a fork went through to the core with none of the stringy fight it had put up earlier; mashable now. The hawthorn was softer but still held fibre at its heart, stubborn to the last; most of what it would ever surrender had already gone into the liquor. And the liquor had cooked well down — darker, thicker, dropped by a third or more, clinging off the spoon in a heavy concentrate. In its bucket the strained rowan pulp had cooled and gone faintly tacky, sitting ready.

Rowan and birch soft enough to mash together; the hawthorn all but spent into the reduction. The bench sat bare behind him.

## User

*throw away any hawthorne solid left. mix the two solid wood mashes. if the liquors/tea of the wood are reasonably reduced, mixed the liquids into the wood mash. press them into all of my ridiculous molds. rabbits, acorns, ears of corn, christmas trees, pumpkins, etc.)*

## Narrator

▼ Friday, 16 September 1977 — 23:35

He tipped the spent hawthorn out — it had given up everything it was going to — and set its solids aside for the bin.

The rest went together in the big bowl: rowan pulp and the softened birch, mashed until the two became one thing, pale and dense, smelling of cut wood and orchard at once. The liquor had cooked down to a dark, clinging concentrate, and he folded it in by degrees until the mash drank it up and turned tacky — wet enough to press, stiff enough to hold an edge.

Then the molds. The whole ridiculous regiment of them down the bench: rabbits mid-leap, fat acorns, ears of corn, little christmas trees, a row of grinning pumpkins. He packed each one full, thumbed the mash into every rabbit ear and pumpkin rib, struck the backs level, and turned them out one after another.

A field of small wood-smelling shapes, setting to firm under the lamps. Feed fit for the most ludicrously spoiled unicorn in Scotland.

## User

*leave my whomping willow whip and my whomping willow blank there drying also* *go outside and check the merdrake, all 3 of them*

## Narrator

▼ Friday, 16 September 1977 — 23:55

He stood the willow blank and the fresh whip in among the billets, under the same low warming charm, and left them to dry with the rest.

Then out — through the quiet castle and across the cold, wet grounds to Greenhouse Three, a black box of fogged glass that smelled of green and standing water. The three forcing glasses waited on the rear bench under their label, *DANGER! MERDRAKE ROOT*, and he pulled the muffs on before touching anything.

Glass two had gone properly under: water deep green, walls furred with algae, the root only a pale smear behind the bloom — though what showed of it had thickened, more limb to it now, more of that small awful human shape.

Glass three should have been clear. Three days unwiped, a green film had crept back up the glass and hazed the water; the clean arm drifting toward the slimed one. The root behind it sat a stage back, still sharp.

Last, glass one — light kept low, the tarp lifted a careful inch. No algae at all in the dark, the water clear and near-black, the root pale and longer than he'd left it, hard to read in so little light. He held the look a beat and let the tarp fall.

The film furred quietly back over glass three, waiting on whether he'd wipe it.

## User

*evanesco 3* *go to sleep in bed*

## Narrator

▼ Saturday, 17 September 1977 — 14:00

By two the Barnabas tapestry had become the pitch again — columns up, the platform raised at mid-field, benches climbing deep on both walls with half the school filling them, the gold-and-purple banners hung so they read clean to the back row. Henshaw sat in the teachers' box, arms folded, there to watch and not to whistle. The long-throw speaker hummed.

Caleb and Liri took the announcer's box together. "Weekly now," Liri told the room, easy and carrying. "Fourteen hundred to eighteen hundred, every Saturday — and it's open to the school again."

"First match is an exhibition," Caleb said over her. "Seventh years only — and we're running one round silent. No speaking. None, not even to your own side. Nonverbal casting, eyes open the whole time. You read the field by looking, or you lose it." A ripple went along the benches.

They came down for it: Mei, Cass, Imogen, Davina Acker, Aisling Doyle, Toby Greaves — eight on the floor with the two of them, four a side. Caleb's purple, with Mei, Davina, Toby; Liri's gold, with Cass, Imogen, Aisling. Mairi Gow stayed up to watch the first one. The flags set at either end.

Then the room went quiet on purpose — the held-breath kind — and the silent round had nowhere left to start but now.

## User

*you skipped my whole morning... I was just clarifying because you asked*... "Get up, we are going to miss breakfast. stop sleeping late and making me sleep late." *I get up with her* *drag her butt to breakfast.*

## Narrator

[[My fault — I jumped the clock. The Hexfield block's locked for 14:00, but that's later; we're still in the morning. Rewinding to the cabin.]]

▼ Saturday, 17 September 1977 — 08:33

He had her by the wrist before she'd finished pretending to still be asleep.

Mei cracked one eye. "You came in past midnight smelling of pondwater and woodshavings," she said, flat with sleep, "and somehow I'm the one making us late." But she let herself be hauled upright, hair on end, radiating disapproval of the hour and of him in roughly equal measure.

They dressed at speed — or he did, and she did it slower out of principle — and then he towed her out the door and along the corridor, mostly him pulling and her grumbling, down through the waking castle. The smell of toast and eggs reached them on the stairs. By the time the Hall doors came in sight she'd given up dragging her heels; she always did, once she could smell the breakfast.

## User

"Yes, some of us didnt go home at 6 yesterday and kept working all evening. I stayed up late making all of the food."

## Narrator

▼ Saturday, 17 September 1977 — 08:44

Mei stopped at the foot of the stairs to look at him properly. "You made unicorn feed," she said. "Shaped like rabbits. And pumpkins. For one unicorn, who would have eaten it in any shape at all." She set off again, unhurried, leaving him to keep up this time. "Stay up till all hours with your cauldrons and your forcing-glasses if you like. But don't come in smelling of pondwater and shavings and expect a medal pinned on for it."

The Hall doors stood open on the warm roar of the place — toast and kippers and the clatter of four tables most of the way through. They were properly late, and she let him feel it. He steered her into a gap on the Ravenclaw bench. The morning post hadn't come down yet.

## User

"yes. the shape of the mold doesnt actually affect the time it takes to do it.. literally at all. .. I dont know what forcing-glasses are.. but I welcome the feedback. what can I do to save time next time?"

## Narrator

▼ Saturday, 17 September 1977 — 08:46

Mei pulled the toast rack toward her. "Forcing glasses," she said. "What you've got the merdrake standing in — the clear ones, roots down in the water. That's the name for them; you force bulbs in them. You've been calling them jars all week."

She buttered a slice with the patience of someone who'd already worked it out. "And your time isn't in the molds. It's in the hour you pick and the order you work in. You cooked three woods to three different states and then sat there waiting on the hawthorn — which gives you nothing solid anyway. So leave it out of the mash from the start, keep it back for the liquor. And make a fortnight's worth in one go. It'll keep. Then you're not down there every other night with your sleeves wet at midnight."

She bit into the toast and let him have that, watching him over the crust. Down the table, the morning post still hadn't come.

## User

"I made all of the wood we gathered from our entire trip at one time. I didnt put hawthorne in the mash. I used it only for the liquor. the mash was made of birch and rowan only. and the 3 reduced teas... so... what of your advice applies here?"

## Narrator

▼ Saturday, 17 September 1977 — 08:47

Mei chewed, considered it, and gave it to him straight without flinching. "None of it," she said. "You batched the whole trip at once and kept the hawthorn to the liquor. You did it right."

She set the toast down. "Which was never my actual complaint, and you know it. I don't care how you make the feed. I care that in one night you went into the Forest for wandwood, ran three potions, cooked a fortnight of feed, read half a carving library, and then crept out to check the merdrake at gone-midnight — and got into bed cold as a fish." A beat. "You're not slow, Caleb. You just don't stop. That's the worse problem, and there's no mold that fixes it."

She went back to her eggs like the matter was settled, one eyebrow up, waiting to see whether he'd argue.

## User

*eat*

## Narrator

▼ Saturday, 17 September 1977 — 08:50

He ate. Properly — eggs, two rashers, the toast finished. Mei watched him do it, and whatever she'd braced herself to argue with went unused; the eyebrow came down. She nudged the kippers a few inches his way without a word, which from her was close to a white flag.

The roar of the Hall went on around them, ordinary and warm. Then the post came — owls pouring in over the rafters in a clatter of wings, the *Prophet* thumping down at a dozen places along the tables, parcels and letters dropping into reaching hands the length of the room.

## User

*grab a prophet and stare to see if I get any mail*

## Narrator

[[Quick check of the letters state so the post is accurate — staying out of the database, just reading our own files.]]

## User

read the database to see if it helps also, but also use the artifact if possible although I dont know if it is.. just made the artifact because so much gets lost with the database

## Narrator

Thanks — that clears it. Let me read the database too, then cross-check the Log, so the post is right.

[[Read both. They line up except in two places — and since you built the Log to catch what the database drops, I'm treating the Log as the live record and flagging the daylight between them:

• **Lincolnshire parish letter** — Log: arrived Thursday the 15th, unopened. DB: still "awaiting reply." Going with the Log — it's in your bag, unopened.
• **Hexfield donor replies** — Log: two, unopened. DB: Dunstan Pyke's is already opened and answered (Mei wrote back Friday). So Pyke's is handled; a second donor reply is still unopened.
• **Mrs Chang → Mei** appears in the Log but not the DB — leaving it as the Log has it: arrived Thursday, Mei's to open.

Say the word if you'd rather trust the DB on any of those. Net for *this* morning's owls, both sources agree: nothing new is due to land for you today (the Squib-registry reply comes back through Mei ~19–23 Sept; Annie's is her call; the Ministry society and Hexfield-recognition letters are still out). I'd also lost track of Thursday's unopened post in your kit — fixing that below.]]

▼ Saturday, 17 September 1977 — 08:52

He pulled a *Prophet* off the stack and shook it open. The front was the Ministry again, reassuring no one in particular: recent "isolated incidents" were no cause for public concern, security firmly in hand, the Wizengamot satisfied of it. Below the fold, four lines and no more — a wizard missing in the Midlands after a house fire, no foul play suggested, the matter left with the local authorities. No name he knew. The page moved on to a cauldron-gauge regulation and did not look back.

Mei read the headline upside-down, made a small unimpressed sound, and went back to her tea.

The owls thinned overhead, the last of the post finding its tables. Nothing dropped to his place. Only Thursday's letters, still unopened — the parish one in his bag, the one from her mother in Mei's.

## User

Current letter state
Letter	Status	Needs reply?
Mrs Chang → Mei	Read Friday 16 Sept, 07:59	No immediate reply required
Dunstan Pyke	Read Thursday 15 Sept, 14:43	Yes, thank/invite
Cordelia Ashdown/Ashford	Read Thursday 15 Sept, 14:43	Yes, clarify backing
Rev. Whitlock / Lincolnshire parish	Read Thursday 15 Sept, 14:43	No, unless arranging a visit
Mrs Chang’s letter

This one was not rendered as a full formal letter, but the text/content exists as Mei reading/summarizing it aloud:

Her mother and father would both come. Three o’clock, the Yew Tree, a good choice — private booths, and they don’t rush you. She’d heard the Waddell name in magical Manchester for years — the clock-mender in Cheetham Hill — and was glad to finally put a face to it. She was pleased about Caleb. She said so plainly, which Mei noted was not always her mother’s way.

Then a line that made Mei stop, and reread, and go a little pink: You wrote that there is "more to discuss in person." I am your mother. I can read a letter. I will come ready to discuss it, and I will not embarrass you by owl.

“And then,” Mei said, fighting a smile, “she’s written one line in Cantonese, perfectly, for Caleb.” She turned it to him — characters he couldn’t read — and translated, dry as her mother evidently was: “Tell the boy: the word is gweilo. We will work on his pronunciation when he is family.”

So: both Chang parents confirmed for Sunday 18 Sept, 3pm, Yew Tree; Mrs Chang approves the venue, knows the Waddell clock-shop name, is warm about Caleb, clocked the “more to discuss” line, and made the gweilo/family joke.

Dunstan Pyke letter — exact text

“Delighted to hear of a new game with proper rules and proper care taken, the more so for it being the young who’ve built it. I kept goal for an Ilkley side in my day and there’s nothing like a sport for keeping a head on straight. Find two Galleons enclosed toward your colours, and put me down to come and watch the first proper match. We could all do with somewhere to cheer just now.”

Notes:

He sent 2 Galleons.
He wants to come watch the first proper match.
Later correction: Pyke remains open, not “handled/closed,” because he should be invited as a sort of VIP supporter.
General reply plan to Pyke

Not verbatim, but the plan was:

thank him for the 2 Galleons;
say Saturday’s open session runs 2–6;
explain Quidditch is using a Hexfield variation for training;
invite him to watch the training variant too;
offer that he can stand with Hooch and talk Quidditch;
be honest that the owl may not reach him before this Saturday, so next Saturday is also an option.

That is very much a “make him feel like a guest of honour / maybe he donates again / spreads the word” letter.

Cordelia Ashdown/Ashford letter — exact text

Transcript has Ashdown:

“I don’t doubt the merit of it. But I’ll own I’m careful these days about whose name sits next to mine on a list, and who signs it. Tell me who stands behind the thing — staff, school — and I’ll think again. No offence to you. It’s the times that are rude, not me.”

This is the “weary/cautious woman” donor reply. She is not hostile; she wants cover, legitimacy, and names behind it before attaching her own.

General reply plan to Ashdown/Ashford

Not verbatim, but the plan was:

Caleb and Mei both sign;
Imogen signs too if she wants, because she is a cofounder;
name Hooch explicitly;
frame Hexfield as feeding into Quidditch training;
say a Hogwarts flying mistress / referee of standing rates it enough to train her players on it;
use “pride of the wizarding world” lightly as the Quidditch hook;
answer her actual concern: who stands behind it = Hooch, Henshaw/staff, school track pending.

The tracker later says: “Mei drafts Pyke + Ashdown replies tonight; both sign; add Hooch/Quidditch hook for Ashdown.”

Lincolnshire parish letter — exact text

From Rev. Whitlock / St Cuthbert parish:

“Dear Mr Waddell and Miss Chang — yours was a pleasure; we get few letters that care for the old fabric. There is a worn memorial set low in the south wall, the lettering all but gone. I have squinted at it myself and would not swear to more than a few strokes — though an Æ at the start is not impossible. As to the pre-Reformation chest: the parish lost it long before my time. What survived of the early registers went up to the county record office at Lincoln in my predecessor’s day, and what did not survive, did not. If ever you are in Lindsey you would be most welcome to come and make of the wall what younger eyes can. — Yours in the parish of St Cuthbert, Whitlock.”

You’re right: this does not really need a reply unless Caleb wants to arrange a visit or send a polite thank-you later. The live inventory/open-thread state after that scene treated it as:

“parson lead (shelved unless pursued)”

So the better continuity status is:

Rev. Whitlock / Lincolnshire parish: read; no response owed; lead shelved unless Caleb/Mei decide to visit Lindsey or ask the Lincoln county record office.

Clean corrected mail summary
Mrs Chang: read; closes Chang-parent reply; no response needed before Sunday tea.
Pyke: read; 2 Galleons received; reply still needed/in-progress because he wants to attend.
Ashdown/Ashford: read; reply still needed/in-progress because she wants staff/school backing before attaching her name.
Parish / Rev. Whitlock: read; no response required; lead points to south-wall memorial and Lincoln county record office, with visit invitation if pursued.

they are all behind... even this... use the 'suggested letters' to Ashdown and Pyke as just what Mei sent... so they are both expecting replies in a way ""

## Narrator

Right — those four were all read Thursday/Friday, and the Pyke and Ashdown replies went out from Mei, so each is now an open exchange. I had them stale. Let me correct the canonical record (DB) and the Log together so they stop disagreeing, then show you the corrected state.

`content` is a required column — let me supply it and make the inserts idempotent in case the first attempt partly applied.

The `status` column is constrained to a fixed vocabulary. Let me read the allowed values rather than guess a third time.

Allowed statuses confirmed. Re-running with valid values (`delivered` for the read-no-reply letters, `answered` for the ones Mei has replied to).

DB is corrected and consistent now. Let me bring the Log's correspondence tab into line with it.

*Both records now agree. The four letters as they actually stand:*

- **Mrs Chang → Mei** — read Fri 16th, 07:59. Closed; no reply owed before Sunday. (Both parents confirmed, 3pm at the Yew Tree; the *gweilo*/"when he is family" line for you.)
- **Rev. Whitlock (parish)** — read Thu 15th, 14:43. No reply owed; lead **shelved** unless you go to Lindsey or write the Lincoln county record office. (Worn south-wall memorial, maybe an *Æ*; the old chest's long gone.)
- **Dunstan Pyke** — read Thu 15th. Mei's thank-you-and-VIP-invite is **sent**; he's an open supporter who may RSVP for the match (this Saturday if the owl's quick, else the 24th).
- **Cordelia Ashdown** *(surname unsettled — Ashdown/Ashford)* — read Thu 15th. Mei's backing-clarification reply is **sent** (named Hooch, Henshaw/staff, the Quidditch hook; all signed). Open — she may come aboard now she has the names.

So Pyke and Ashdown are both live exchanges with the ball in their court, and nothing's sitting unopened. (Log reseeds clean on open — key bumped again; I'll lock it once the record settles.)

## User

"what time are we leaving tomorrow?"

## Narrator

▼ Saturday, 17 September 1977 — 08:53

Mei speared a mushroom and didn't look up. "Half one. Tea's at three, the Yew Tree sits a step off the Manchester Floo, and I'd like us seated with your parents before mine decide we're late." She finally glanced at him, dry. "Which means half one *from the castle*, Caleb — not half one you start hunting for your good shirt."

## User

*eat eat* "this is going to be an insane conversation*

## Narrator

▼ Saturday, 17 September 1977 — 08:55

She ate — finally, properly — and let the thought sit a moment. "Insane," she agreed, mild. "Your mother and mine at one table for the first time, and a 'more to discuss in person' my mother's already underlined in her own head." A dry tilt. "She wrote back that she'll come ready for it and won't embarrass me by owl — which is my mother for *I have guessed, I approve, and I shall say so out loud, over the teapot, in front of everyone.*"

She slid the last of the kippers his way. "So eat. Whatever it turns into tomorrow, you're not walking into it on an empty stomach and four hours' sleep." Then, softer under the dryness: "They'll like you. That's rather the trouble."

## User

"no, I mean.. since we started this plan.. a lot of things have changed.. we have to talk to them about money.. about going to each other in danger... about unicorns... about pair bonded whatever that means... I have a companion owl who I am taking with.. I have golden unicorn hair. I made a sport"

## Narrator

▼ Saturday, 17 September 1977 — 08:56

Mei set her fork down and actually thought about it, which was its own answer. "Then we don't try to land all of it in one sitting," she said. "The owl, the unicorns, the gold hair, your daft beautiful sport — those aren't the conversation. They're proof you've been busy, and they'll like you for them. Let them come up on their own."

A pause; the dry went out of her. "Money, and the bond, and going to each other when it's bad — *that's* the conversation. And the last one's the one that'll frighten them, because it should. Four parents, in this year, told their children have promised to run toward each other's danger." She took the fork back up. "So we say it plainly and we don't dress it up. Dressed up, it sounds mad. Plain, it just sounds like us."

Then, lighter, the corner of her mouth going: "And you're explaining the bidet to no one. Ever."

## User

"and the foursome and the threesome.... and that I own a soul"

## Narrator

▼ Saturday, 17 September 1977 — 08:57

Mei nearly laughed at the first half. "The sleepovers are ours and no one else's, and if you call them a *foursome* and a *threesome* at that table I will leave you to die in front of both our mothers." Dry, fond. "Cass needed somewhere safe. The bath was for Gwenllian. Said cold they sound like a thing they aren't — so we don't say them cold. We don't say them at all."

Then the humour went out of her, clean and fast, the way it did when something actually mattered. "And the last one — no. That goes on no table, ever. Not because it's shameful. Because she isn't ours to pass round over scones, and because *'I keep a woman's soul under a bathroom floor,'* said plain to four frightened parents in *this* year, doesn't land as wondrous. It lands as the thing they take you away for." Lower, even. "Gwenllian stays between us, and Liri, and the few who already carry it. Tomorrow is money, and the bond, and what we've sworn to do for each other when it goes bad. That's enough to frighten them honestly."

## User

"I don't think we had sex to help Gwenllian, but sure, if that makes it better.. it is rather actually odd to get up and remember the wall was watching us banging.. but anyway." *eat eat eat* "do you want to help me with food this morning? taking it down?"

## Narrator

▼ Saturday, 17 September 1977 — 08:58

"It wasn't *for* her," Mei agreed, unbothered, "though I'll not pretend the warm water and the candlelight hurt." A sip of tea, and the dry came down flat. "And Merphila has watched three centuries of prefects do far stupider things in that bath than love each other. She'll live. I'd only mind if she gossiped."

The toast she'd been buttering she wrapped in a napkin instead — her answer before she gave it. "Course I'll come. You're the one she lets near; I'll carry the pumpkins so you don't go dropping rabbits down the lawn." She stood, brushing crumbs from her lap. "Feed run now, your daft silent match at two — and I'm not letting you skip lunch between. Come on. Let's go and spoil a unicorn."

## User

"good, you better start practicing" *I start walking with her and hold my want up and think calmly 'protego' and try to move that intent through my body and into my wand*

## Narrator

▼ Saturday, 17 September 1977 — 08:59

Out into the corridor, wand up at a low angle as they walked. The tip warmed; the air in front of it thickened and bent — a faint curve of shimmer bowing into being, no bigger than a dinner plate — and then guttered before it could close, like a held breath let go too soon. A scatter of pale sparks, and gone.

Mei watched it form and fail without breaking stride. "There's a shield in there," she said. "You're *shoving* it. Protego doesn't want shoving — it wants you to already believe the thing's between you and the hex, before you ask. Decide it's there; don't beg it." A beat, dry. "Also you're walking like there's an egg balanced on the end. Breathe. Feet normal. Again."

## User

*calm cool. there is a shield in front of me. I just need it to be there. and I need it moving smoothly with me. and push 'protego'* *up to RoR*

## Narrator

▼ Saturday, 17 September 1977 — 09:00

This time he didn't reach for it so much as assume it. The shimmer bowed up off the wand-tip and *held* — a clean disc of bent air keeping pace at his shoulder as he walked, wavering at the edges but whole, three or four strides of it before it thinned and let go. It had been there. Properly there.

Mei gave one approving nod, no fuss made of it. "That. That's the one. Hold the *believing* part a beat longer and the wobble goes."

Up the stairs, the corridors emptying as the castle eased into its Saturday. At the seventh floor the bare stretch of wall by Barnabas gave them the work-side door, and inside the molded feed waited in its trays — rabbits and pumpkins and little fir trees gone firm overnight, ready to go down to the lawn.

## User

*go in and package them* "I know I'm supposed to be mad at you and disinterested and not telling you anything I'm  doing after you agreed with the precedent, but come look at my wands. also, since you didnt bother to ask me at all, I got offered an apprenticeship for my wand that I made with the unicorn body hair."

## Narrator

▼ Saturday, 17 September 1977 — 09:08

He packed the cakes out of their trays into a carry-basket — rabbits, pumpkins, little fir trees nested in cloth, firm enough now to travel — and said the rest of it over his shoulder, with a nod at the two plates the Room kept mounted on the wood-side wall: the precedent, the not-telling-her, *come look anyway*, the apprenticeship.

Mei came and looked properly — the Interleaved on the left, five rings stepped down its tapering shaft; the Aether-Slung on the right, the core lit bare in its cage. "You held that precedent," she said, "all of one breakfast." Then the dryness went out of her, clean. "An apprenticeship. For the wand you made *wrong* — wrong hair, wrong everything — and Eldower still wants you at his bench." She looked round at him. "He doesn't flatter, Caleb. That's the entire point of the man. So that's not nothing. That's a *future* — and it's the thing we say plainest of all tomorrow, straight after the money." A beat, softer under it: "Your mother's going to weep into the good teapot."

## User

"I care more about their safety, but sure. I held the precedent but you didn't bother to ask, so I didn't really need to hold it.... what was wrong? you don't know how to make wands.. it did something.. it wasn't powerful.. it was my second attempt.. it was exactly what it needed to be.. somebody trying and thinking.. but look at these and tell me what you think..... is your wand cherry or willow? it is also unicorn right? or am I making that up?"

## Narrator

▼ Saturday, 17 September 1977 — 09:10

"I didn't say it was bad. I said *wrong*, which it was — wrong hair, the join brute-forced with a Reparo — and 'exactly what it needed to be' is also true. Both fit in one sentence." She bumped his shoulder. "A second try that *did something*, and Eldower wanting you regardless. Stop fishing — I already told you it's a future."

Then she gave the plates the real attention. "The ring one's clever and fussy: friction and a clean taper, no glue, and you live or die by leaving the seats bare." A beat at the open-rib. "And this one's selling you the lie in its own motto — *'let the core be seen and never caged.'* A core that touches nothing is the thing your slate called no wand at all. The save's *yours*, not the plate's — thread it through a solid grip so it's held where it counts and only shown across the middle. Whether a core you can unscrew ever truly settles, no plate can tell you. That's a bench answer."

She handed him the basket. "And mine's walnut — you're thinking of your own, cherry's yours. Core you've got right, though: unicorn hair, the pair of us."

## User

"Good, so I can make brother wands." "what about these?"

## Narrator

▼ Saturday, 17 September 1977 — 09:12

"Brother wands, yes — the same beast's hair in two sticks, and they know each other ever after." A dry flick. "Lovely, until two brothers are pointed at one another and neither will bite properly. The connection cuts both ways. But — you've the hair for a whole family of them."

She went through the new plates, sorting as she looked. "These are you answering one complaint four ways. The magnet's clever; I'd want to know what a ring of lodestone does to a spell before I held it near my hand. The bulwark — rings sunk flush in the ribs — that's a *defensive* wand: show traded for strength, which is the right trade for warding." She tapped the last two. "And these are the real ones. Both bury the core in full-contact wood and pin it at each end — but the solid tip can't come apart, so the core's fixed. The threaded one does the lot: seen, gripped, anchored, *swappable*, and not a scrap of metal in it. That's the one to build, Caleb. The rest are exercises — bar the single question no plate of yours can settle."

## User

"yes, I'm well aware. but you are not quite correct about the solid tip. it has a hook down in it. basically, you would use tweezers and gently stretch your core down into the tip and hook it on the wooden fisheye, and then it would relax back slightly to hold on. then if you wanted to remove it, stretch again with tweezers. but yes, I think the twisty one would be easier.. these are different iterations I thought of after similar feedback yesterday... and the bullwark one, you are probably correct. I did that because carving wise and handling, it is an easier starting point for me to learn, right? much less room for error. still has the idea there just not in its full presentation."

## Narrator

▼ Saturday, 17 September 1977 — 09:13

"Fair — I missed the hook." She gave the point up without a fight. "So it does come free: stretch the core down onto the fisheye, let it draw back to catch, stretch again to lift it off. Removable, you're right." Then the dry returned. "And every swap you've got tweezers on a *living* core, pulling it long. Once is nothing. Forty times is how you tire a core into going quiet. The threaded one you simply unscrew — so build that, and keep the hook in your back pocket as the trick that proves you never needed threads at all."

She picked up her half of the load. "And the bulwark isn't a step down — it's the *right* place to start. Forgiving carving, the seats sunk where a slip won't show, the whole idea there in miniature. Learn the cut where it's cheap to be wrong, then build the one that shows off. That's not settling, that's an apprentice with sense." A glance, fond and unbothered by the precedent she'd supposedly broken. "Eldower'll like that you reasoned it that way. Now — unicorn. Before she forgets she likes you."

## User

"she won't after I build a wand that screws down over her horn, so it is technically a unicorn bone core wand, and she is going to shoot spells out of it... or I am going to use her entire body as a wand if she can't."

## Narrator

▼ Saturday, 17 September 1977 — 09:14

Mei didn't dignify most of it. "You," she said, steering him toward the stairs, "are carrying a basket of feed shaped like *rabbits* down six floors for that animal. You're not fitting a screw-cap to her horn, and you're certainly not making a wand of the rest of her. You'd turn it on yourself first." A sideways look, dust-dry. "She's got you completely and you know it. Threat noted. Threat laughed at."

Out across the grounds — morning cool, grass still wet — down past the pumpkin patch to the lean-to, where the white shape lay folded in her straw, splinted foreleg stretched out before her. She lifted her head as they came: at *him*, mostly, ears swinging round, and held still, waiting, with the settled patience of something that had decided he was allowed.

## User

"I think you misunderstand... it isnt a threat. I dont mean Im hurting her.. I am putting a wooden cap on her horn so she can shoot spells.. and when I said use her as a wand, I meant she has the little wooden cap on her horn and like her entire live body is my wand... so as we ride into battle. spells are shooting out of her horn.. do you understand now?"

## Narrator

▼ Saturday, 17 September 1977 — 09:25

"Oh, I understand perfectly now." Mei crouched by the basket. "You want to *ride a unicorn into battle* and fire curses out of her face. That's so much better than a threat." Flat, fond. "Caleb. She has one working front leg. Your warhorse can currently manage a slow hobble to the water trough and a great deal of lying down. And a horn isn't a wand — it's *hers* — and she'd have opinions about being aimed, the first of which would be aimed straight back at you."

She set a rabbit-shaped cake on her palm and held it out, low and flat. "Feed your terrifying cavalry. We can conquer Britain once she can stand."

The unicorn's muzzle drifted toward the offered cake — but her eyes stayed on *him*, ears turned his way, waiting to be allowed.

## User

"thank you for that explanation I can't ride her into battle with a broken leg. I have learned so much. surely I couldnt have meant in a month.. maybe she would like it.. we could be poacher poachers. sell parts of poacher for magical supplies." *feed WL a rabbit bark*

## Narrator

▼ Saturday, 17 September 1977 — 09:26

"Poacher poachers," Mei repeated, deadpan, sitting back on her heels. "Hunt the men who hunt her, render them down, sell the parts to buy *more unicorn feed shaped like rabbits.* It's almost circular. It's almost moral." She shook her head and gave it up. "Feed the horse, you ghoul."

He held the rabbit-shaped cake out low and flat. White Lightning's muzzle came to it — and she took it from his fingers, careful, lips soft, the way she'd never quite manage with anyone else. Ears swung toward him; the splinted leg shifted in the straw as she settled to chew, unbothered, unhurried. The morning lay quiet around the lean-to. She leaned the smallest weight into his hand, and stayed there while she ate.

## User

*I dip a bark cookie in the silver water and give it to her... this bark cookie was obviously christmas tree shaped*

## Narrator

▼ Saturday, 17 September 1977 — 09:27

He dunked the little fir tree in the flask of silver water until it darkened, and held it out. White Lightning's nose found it — and this one she *wanted*, lipping it up at once and lifting her head to chew with something close to greed, the silver-wet bark going down first and fastest. Her ears came forward. The good leg tucked; she shifted her weight toward him, comfortable.

Mei watched the difference and filed it without fuss. "She likes the dipped ones," she said. "Of course she does — it's the water she wants, the cake's just the spoon." A beat, drier. "A Christmas tree. In September. You've a whole festival's worth of feed shapes and *that's* the one you reach for."

## User

"because it is also a tree. so extra woody. and because it was a gift. a little extra." *dip just the head of a gingerbread man* "Here this is a poacher, let's practice"

## Narrator

▼ Saturday, 17 September 1977 — 09:28

He dipped just the head of the gingerbread man — silver soaking into the little round skull — and held it out. "The poacher. Let's practice."

White Lightning considered the poacher. Then she bit his head off.

Clean, unbothered, precisely where the silver was; the headless body she accepted a moment later with markedly less interest. She chewed, ears forward, wholly at peace with the execution.

Mei put a hand briefly over her eyes. "She went *straight* for the head. You've trained a unicorn to behead criminals for the dip, and you think *I'm* the one who's going to embarrass us at that table tomorrow." A breath of a laugh got out despite her. "Justice served. Finish feeding your bloodthirsty pony — there's a silent match to lose at two, and you're eating lunch before it whether you like it or not."

## User

"hey take note, for broad spells, what about like a radar dish wand, hmmmmm? some things are focused down to points, but that is the opposite. it has to work to spread." *go and dip a gingerbread man in the water and set him leaning against one of the flowers and give it to her.*

## Narrator

▼ Saturday, 17 September 1977 — 09:29

"Noted." Mei turned it over. "Though mind — a dish doesn't only throw wide, it *gathers* wide. Aim it out and it broadcasts; hold it still and it drinks in whatever's coming at you. You'd have built a listening wand as much as a shouting one — and that might be the better half of it. Detection. Warning. A net thrown over a whole room. Not a duelling stick — a specialist's." A small nod, filing it for real. "Sketch it later. It's a true one."

He dipped a fresh gingerbread man whole, silver sheeting off it, and stood the little man leaning against a late, weather-toughened flower by the lean-to — propped there a moment, condemned and dripping — before holding him across. White Lightning took the whole of him this time, no ceremony at all, ears forward, leaning her weight into Caleb's side as she chewed.

## User

*scritches all over her* "you're so wonderful. I love you so much."

## Narrator

▼ Saturday, 17 September 1977 — 09:30

He buried both hands in the coarse-soft white of her — along the jaw, the crest of the neck, the warm hollow behind one ear — and she went nearly boneless under it. Eyes half-lidding, the good leg cocked, a long breath leaving her in something close to a sigh. She let him, leaned her whole weight into it, the way she let no one else come near her at all; the splinted leg stretched out and forgotten. When he told her he loved her she pressed her head against his chest and simply stood there, taking it, while the morning lay gold and unhurried around the lean-to.

Mei watched, and for once had nothing dry to spend. "She knows," she said quietly. A beat, softer still, the corner of her mouth: "So do I, for what it's worth. Come on — let her rest. We've got a day."

## User

"hold up your wand.... for Hexfield" *I go and grab her other hand with both of mine*

## Narrator

▼ Saturday, 17 September 1977 — 09:31

Mei lifted her wand without being told twice — and of course hers came clean: a shield bloomed off the tip and held, steady as a held note, no waver at the edge, there because she'd decided it was. "Like that," she said. Not smug — just showing him. "Belief, not effort. You nearly had it on the stairs."

Then he took her other hand, both of his folding round it, and the dryness went out of her. She didn't pull back or make a joke of it. The shield wavered, and she let it go — on purpose, to give him her attention instead. She looked at their hands, then up at him.

"You'll have to let go of this one to cast," she said, low. "Tomorrow. And at two. And most of the times it'll matter." Her fingers turned in his, holding back. "But not this minute. This minute you can keep hold."

## User

*I try to feel her and her connection to her wand and I try to take my silent spellcasting and my want and desire to protect both of us and to protect her however I can, and I try to gently push that intent and that 'protego' through her to her wand*

## Narrator

▼ Saturday, 17 September 1977 — 09:32

He reached past the wand in his own hand for the other thing — the place she was always faintly there, a low steady warmth he never had to go looking for — and gathered it up: the silent shape of *protego*, and under it the plain want to put himself between her and anything at all. He pushed it toward her. Toward the wand in her fingers.

It crossed. Not the spell — the *wanting* of it. Mei's breath caught and her eyes came up fast, wide, because she'd felt it land whole: the shield he was holding and the fear beneath it, pressed flat against her like a palm to the sternum. Her wand stirred in her grip, the tip giving one faint answering glimmer — and then nothing more. No shield bloomed. The feeling had jumped the gap. The magic hadn't.

She closed her fingers hard around his. "I *felt* that," she said, unsteady, low. "All of it — what you were trying to hand me." A breath. "But a wand answers its own hand, love. You can pour every bit of that into me and the casting's still mine to do." Her thumb moved once across his knuckles. "The wanting, though. That came straight through."

## User

"but we have very firmly established we aren't exactly 2 people and we arent exactly 1 with the healing salve"

## Narrator

*(No content)*

## User

here, for reference. regardless of what you do, I'm going to go out on a limb and say scaring the shit out of McGonagall was completely forgotten about because that feels important and a real concern. so may want to update something

## Narrator

Let me read your reference, then handle both the scene and the dropped McGonagall thread.

Read it — that's a real thread to have dropped: Caleb effectively told McGonagall that the dangerous memory-gaps in this war are in *healthy, trusted senior staff who'd never suspect tampering*, and she took it gravely and committed to acting on it once the Salve is safely tested. Let me get it into the database so it stops vanishing, then come back to the lean-to.

## Narrator

Same message again — I've already got the reference and the schema, so let me just check the day-numbering convention before I write, so the new rows line up with the existing ones.

`in_game_day` is unused here (always null — they key off date + time), so I'll match that. Writing both records now: the commitment itself (high-stakes) and a forward open-thread so it surfaces in reviews.

The inserts got rolled back with that failed SELECT (bad column type in my confirm query). Re-running them clean — the NOT EXISTS guards make this safe either way.

[[OOC — recorded, and you were right to flag it. The McGonagall scare is now in the database two ways so it can't quietly evaporate again: a **high-stakes commitment** (Mon 12 Sept, 15:19 — her grave agreement to put staff-restoration to a *very small, carefully-chosen, not-by-rank* group, but only once the Salve is tested, proven, and safe), and an **open thread** waiting on a safe live test, so it surfaces in any review of what's still hanging. I left it out of the HTML Log for the moment, only because folding it in means bumping the storage key and a full rebuild — say the word and I'll add it to the mind/threads tabs on the next pass. Now — back to the patch.]]

▼ **Saturday, 17 September 1977 — 09:33 — Hagrid's pumpkin patch**

Mei doesn't answer straight off. She watches the last of the flicker die out of the air where his Protego had tried to stand, then turns that particular look on him — the tilt that means he's said something she has to take seriously and half resents him for.

"All right. Yes." She settles her wand back along her forearm. "The salve proved it and I won't pretend otherwise. It bound you, it bound me exactly the same, and it wouldn't so much as warm for Lin — so to six hundred years of someone's craft, reading a person, we don't come up as two. You're right. I gave you that then and I'm not clawing it back now just because it's gone inconvenient on a Saturday morning."

White Lightning lips at the rim of the feed-basket; Mei lets her, absently, and keeps going.

"But you're the one who wouldn't *leave* it there. Not one person either — your line, not mine. Because the jar still chose. Same salve, your hair and mine both down in it, and *Caleb Waddell* went to you and *Mei Chang* came to me. The name picked, every time, out of the two it was bound to. So the seam's still in there. It reads us as not-two and it can still tell us apart in the same breath."

Cold comes off the ground; the pumpkins are steaming faintly where the sun's finally reaching them.

"And that is exactly what just happened on your hand. Not the opposite of it — the *same* thing, run again. I felt the whole shield. I felt what was under the shield, which you might have warned a person about." Dry, though her eyes aren't quite. "The wanting came straight across — there's your not-two. And then my wand gave one flicker and did nothing at all, because the casting stayed mine — there's your not-one. You didn't catch me out just now, Caleb. You did the salve over with wands instead of beeswax and got the very same answer back."

She eases off, because she can see it land on him.

"The salve was *reading* what we are. A wand isn't reading anything — it's *doing* a thing, for the hand that's holding it. Those aren't the same question, and the bond's only ever answered the first one." A small pause. "Could it ever manage the second? I don't know. One go on a staircase doesn't tell me, and Flitwick's still got his quill halfway through us. I'm not saying never. I'm saying today the feeling crosses and the spell doesn't — and I'd want a great deal more than a hunch in hand before I'd stake your wand arm on it in front of the whole school at two o'clock."

The warmth comes back up under the dryness, and she lifts an eyebrow.

"So. Are you going to stand here doing metaphysics at me in a vegetable patch — or are you going to hold that Protego four strides clean, so I can stop worrying about you before lunch?"

## User

"you just went on a giant lecture over me telling you why I thought it was worth a try. but thanks for the super long lecture." *I sit down and lean back against WL and put an arm up toward her neck and pet her.*

## Narrator

▼ **Saturday, 17 September 1977 — 09:34 — Hagrid's pumpkin patch**

White Lightning takes his weight without a flinch — settles, lets her warm flank be a wall at his back. Her neck dips into his hand and the long muscle there goes loose under his fingers.

Mei watches him fold himself against the unicorn and has the grace to look caught out.

"...Yeah. That got away from me." She comes and sits in the cold dirt beside him, close enough that her shoulder finds his. "It was worth a try. You don't find the edges of a thing without leaning on them, and I haven't the faintest idea where this one's are. I could've just said that."

She leaves it there. Above them White Lightning lowers her head, breath steaming, and lips once at his hair.

## User

"actually you really didnt need to say anything or argue because there wasnt anything to argue about."

## Narrator

▼ **Saturday, 17 September 1977 — 09:35 — Hagrid's pumpkin patch**

"No," Mei says. "There wasn't. I know."

She's quiet a moment, and when she goes on it's lighter, more confession than defence. "I do it when a thing's gotten bigger than I've a handle on. Talk at it till it's smaller. You'd think after all this I'd have noticed it doesn't actually make it smaller."

Her head comes to rest against his shoulder, and she leaves it there, and stops — done talking, for once. White Lightning shifts her weight behind the two of them, warm as a banked fire, and breathes out long and slow over the both of them. The pumpkins steam. Somewhere off toward the lake a bird is going on about something.

## User

*I try to use WL as the largest wand ever and cast "protego"

## Narrator

▼ **Saturday, 17 September 1977 — 09:36 — Hagrid's pumpkin patch**

He levels his arm along the length of her — fingertips to the base of that spiralled horn, the whole white animal lined up behind the gesture like a wand the size of a fencepost — and says it. "*Protego.*"

Nothing leaps into the air. No shield, no shimmer, no pane of bent light between him and the morning. A unicorn is not a stick of worked wood; she hasn't the faintest notion she's been aimed at anything.

What she *does* do is lean. Her head comes round and down, unhurried, and settles its weight along his forearm, horn and all, warm where it rests. A breath gusts white across the back of his hand. For half a second the cold goes a little strange — there and gone, nothing you could put a name to — and then it's only a morning again.

Mei watches the most magical creature in Scotland decline to be a wand and spend the moment cuddling him instead. "...Formidable," she says. "They'll never get past you."

## User

"WL, can I try to shield you through your horn or is that bad? you can yell at me if it is." *touch my wand to her her.* "Bad or okay or indifferent?"

## Narrator

▼ **Saturday, 17 September 1977 — 09:37 — Hagrid's pumpkin patch**

He puts it to her plainly and sets his wand-tip to the horn — that pale spiral cool at first touch, then not cool, as though it warmed to meet the wood.

White Lightning doesn't yell. No flinch, no white-rolled eye, no lifting her head off his arm. If anything the horn leans a fraction more firmly into the point of contact, meeting it the way she met his hand at the feed. Whatever *bad* looks like in a unicorn, this isn't it.

What he feels is a thread of warmth run down the cherry into his palm, and a faint thrum where bone meets wood. No shield. Nothing leaps up to ward her. Only the two things touching — and a quiet between them that runs a beat longer than a quiet should, before it's a horn and a stick again.

Mei has gone still. No clever line this time. "She's letting you," she says, low. "Whatever that is."

## User

*cast protego touching it*

## Narrator

▼ **Saturday, 17 September 1977 — 09:38 — Hagrid's pumpkin patch**

"*Protego.*"

The thrum from before doesn't stay faint this time. It climbs — wood into horn, horn into wood, a warmth running up the cherry and into his wrist with weight behind it, like a current finding a channel that was always there.

No shield stands up in front of him. Nothing wards the morning at his back.

What happens, happens to *her*. For one breath a pale sheen runs the length of the white hide — pearl, barely there, following the line of neck and flank like light moving under water, laid over the unicorn rather than thrown from his hand. It holds. Then it sinks into her and is gone, the cherry goes cool, the draw spent, and it's a stick against a horn again.

White Lightning breathes out, slow, untroubled. She doesn't lift her head off his arm.

Mei isn't reaching for anything clever. "...That wasn't your shield," she says, very quiet. "That went *onto* her."

## User

"yeah, she's my giant wand. I don't know why you never listen." *I stick my wand down into the silver water and see if i feel anything odd*

## Narrator

▼ **Saturday, 17 September 1977 — 09:39 — Hagrid's pumpkin patch**

"I listen," Mei says. "I just hold out hope I'll be wrong about you less often than this."

The cherry goes down into the flask. The silver water is cold — colder than the morning has any business making it, the deep cold of well-water — and for a moment that's all it is: a wand in a flask, his knuckles pinking.

Then, faint enough that he could talk himself out of it, a thread answers up the cherry. Not the weight he'd felt at the horn. A hair of that. The thinnest note — as if something in the wood, or the core, had turned its head a fraction toward the water and found it familiar.

Behind him White Lightning's head lifts off his arm. She's looking at the flask.

Mei follows the unicorn's gaze down to the silver water and goes quiet a beat. "She wants that," she says slowly. "She wanted it in the feed, too." Her brow draws in. "We know what we *put* in it. That's not what she's leaning at."

## User

*I try to pull it up and into the wand*

## Narrator

▼ **Saturday, 17 September 1977 — 09:40 — Hagrid's pumpkin patch**

He wills it upward — pulls, the way he'd pulled the shield onto her, asking the cherry to take the water into itself.

For a moment the flask resists the way any flask would: water is water, a wand is not a straw, and his knuckles only go colder in the cold. Then a thread of it answers. Not a rising in the glass — the level doesn't drop, there's nothing his eye can catch leaving — but a brightness, thin and freezing, climbing the grain into his palm, the core taking a hair of the silver the way the salve had once taken a hair of him. It runs up, and through, and is gone. The cherry's left cold-bright for a breath. Then ordinary. The flask sits as full as it was.

White Lightning's head comes up off his arm. She heaves a half-step round — the splinted foreleg dragging — and pushes her nose hard at the back of his wand-hand, at the flask, wanting it with her whole body.

Mei's fingers close on his sleeve. "Caleb." Quiet, and not playing. "What did you just feel?"

## User

*I touch my wand to her horn.*

## Narrator

▼ **Saturday, 17 September 1977 — 09:41 — Hagrid's pumpkin patch**

He brings the cherry round and sets its tip to the horn again — and this time the wood isn't empty. Whatever thin cold brightness it took off the water is still in it, wanting somewhere to go, and the horn is somewhere to go.

It crosses. He feels it leave the cherry the way a held breath leaves a chest — that freezing thread running down and out and into the spiral, no shield, nothing thrown, only the wand giving up what it carried into her.

White Lightning makes a sound he hasn't heard from her — low, almost under hearing, a note in the chest more than the throat. A long shiver walks the whole white length of her, nose to tail. Her head goes heavy on his arm, eye sliding half-shut. She doesn't pull back. She drinks the contact the way she'd gone for the silver-dipped feed, like it's the thing she'd been asking for all morning and finally got.

The splinted leg is still a splinted leg. But something in her has gone quiet and full.

Mei hasn't let go of his sleeve. "Caleb," she breathes. "You're *giving* her something. Out of the water, through the stick, into her." Her grip tightens. "Do you have the first idea what?"

## User

"no... I dont even know how I would go about knowing. you go try to suck up water. your core is unicorn hair too if that matters."

## Narrator

▼ **Saturday, 17 September 1977 — 09:42 — Hagrid's pumpkin patch**

"Fair. I'll be your control, then." She has her own wand out before she's done saying it — the walnut pale against the dark dirt — and sinks the tip into the flask beside his, brisk, the way she'd lower something into a reagent.

She holds it there. Her face goes inward, listening down her own arm the way she does.

Then her mouth flattens. "Cold water," she says. "And a wet stick." Her jaw sets — she tries the pull, by the look of it, knuckles whitening on the walnut — and nothing answers it. The level doesn't stir. No thread climbs. Whatever turned its head toward the silver for him stays dead asleep for her.

She draws the wand out, looks at the wet tip, looks at White Lightning — who hasn't so much as flicked an ear at Mei or the walnut, head still heavy on Caleb's arm.

"Same core as yours. Unicorn hair, both of us." She says it slowly, laying out a list and not a conclusion. "Different wood. Different hand." Her eyes go to the unicorn and come back, and she doesn't say the third thing aloud. "I can't tell you which of those is the one that matters. But mine did *nothing*, Caleb. Not a flicker."

## User

*I have Mei the two halves of the birch wand I have.* "would you pour some water on the and let it soak in a tray or something?"

## Narrator

*(No content)*

## User

rowan it was rowan

## User

rowan it was rowan

## Narrator

▼ **Saturday, 17 September 1977 — 09:43 — Hagrid's pumpkin patch**

He digs out the two rowan halves — Wand A's split carcass, core long since pulled, bare wood — and puts them in her hands with the ask.

"Rowan, no core, just the timber." Mei turns them over once, liking the shape of the test. "Good. If something wakes in *these*, it's the wood — not the hair, not your hand." She scrounges a shallow tin from the clutter by Hagrid's water-butt, lays the two halves in it flat, and tips silver water over them till they're swimming.

The rowan darkens where it's wet, the water beading and then sinking slow into the grain — wood drinking at wood's pace. No thread climbs it. No glimmer. Two wet half-sticks in a tin, and nothing more.

"And that's a *soak*, not a flick," she says, setting the tin level on a flat stone at the edge of the straw. "Wood takes its time. We leave it — come back after the match, tonight, whenever. If it's done anything by then, we'll know it wasn't the casting that did it."

Behind them White Lightning has swung her head round to the tin, nostrils working over the silver water — wanting *that*, plainly, and not the wood at all.

## User

*I pour water into my hands and take a drink then offer her a drink*

## Narrator

▼ **Saturday, 17 September 1977 — 09:44 — Hagrid's pumpkin patch**

He cups his hands under the flask and pours until they brim — silver water pooling cold in his palms — and drinks. It's the deep cold of a well, clean, a faint bright tang of metal sitting on the tongue a moment after the water's gone. Nothing else. Just very cold, very clean water with a coin's ghost in it.

"Caleb—" Mei starts, halfway to a caution she doesn't finish, because he's already pouring a second handful and holding it out low.

White Lightning's head comes round straight to his hands. She drinks from them — muzzle dropped into the cup of his palms, careful, soft lips working, water running cold through his fingers — and she drinks like she's been thirsty for it her whole life, throat moving, not stopping till his hands are empty. Then she lips the wet from his skin and rests her chin in his palms, wanting more.

Mei lets the caution go. "She'll take it from your hands," she says, quiet, "and nowhere else. And she watched you drink it first." A beat. "That's not nothing, love."

## User

*I give her some more from my hands then I stand up* *I put my wand back in the water and try to swirl and suck up*

## Narrator

▼ **Saturday, 17 September 1977 — 09:45 — Hagrid's pumpkin patch**

Another cupped handful — she drinks it to the skin and lips his palms after, and lets him rise without protest, head tipping up to follow him as he stands.

The cherry goes back into the flask. He swirls it — the silver water turning under the tip in a small cold vortex — and draws.

It comes readier this time. The wood seems to know the way now: that freezing brightness climbs the grain into his hand quicker, *more* of it, like a channel worn a little deeper for having been used. The level in the flask doesn't drop that his eye can catch. But when he stills his hand, the water keeps turning — a slow silver wheel spinning on for a breath after the wand's gone quiet — before it settles flat.

Mei watches the water move by itself and has nothing dry to spend. "It's getting easier for you," she says, low. "Every time you do it, it answers faster." Her eyes come up to his. "Where do you think it's going? It's not staying in the flask. It's not in the wood. So it's going *somewhere*, love."

## User

"EXPECTO PATRONUM!"

## Narrator

▼ **Saturday, 17 September 1977 — 09:46 — Hagrid's pumpkin patch**

The word goes into the wand while the tip is still under the water — and the wand, full of everything it's been quietly drinking all morning, lets the whole of it out at once.

It doesn't come as a shield. It comes as a *flood*: silver light boiling up out of the flask far past anything that much glass could hold, brighter than any Patronus has business being off a student's hand. And out of the brightness the owl forms — the Pygmy Owl, *his*, small and fierce — but blazing, near solid, throwing light like a struck lantern. The water in the flask drops as it goes. Visibly, for the first time. The level falls away as though the owl were being made out of it.

White Lightning comes up. Not a hobble — *up*, lurching to all fours, splinted leg and all, head flung round toward the silver owl, and a high ringing note breaks out of her that he's never heard a horse make.

Mei's on her feet, white. "*Caleb—*"

## User

"Haaagridddd"

## Narrator

▼ **Saturday, 17 September 1977 — 09:46 — Hagrid's pumpkin patch**

The hut door bangs. He comes round the pumpkins at a heavy run, Fang scrambling at his heels and thinking better of it halfway — a crossbow forgotten in one great fist, kettle-steam still coming off his coat.

"What's — oh, no. No no no, *down*, sweetheart—" He's seen the unicorn on her feet before he's seen anything else, and the rest of it doesn't reach him yet: not the blazing owl, not the cry, not the flask. He drops the crossbow in the dirt — won't bring iron near her, never would — and comes in slow and huge and gentle, both vast hands spread low. "Easy. *Easy* now. Yeh'll undo three days o' that leg, yeh daft lovely thing—"

He gets a palm flat to her neck. The ringing note breaks off; she leans her trembling weight into him, head still cast back toward the last silver of the Patronus thinning out over the straw.

Only then does he look at Caleb — at the dying light, at the near-empty flask in his hand. "...Caleb." Low, careful, not a scrap of cross in it. "What did yeh just *do*, lad?"

## User

"I... I didn't know she would... I'm so sorry... I felt like I should cast a patronus.... I don't know... the silver.... unicorns are good and only good... and a patronus is silver and happiness... I... I.."

## Narrator

▼ **Saturday, 17 September 1977 — 09:47 — Hagrid's pumpkin patch**

"Hey. Hey — none o' that, now." Hagrid keeps one hand flat on the unicorn and brings the other out toward Caleb, slow, palm open. "She's not hurt, lad. *Look* at her. She went *toward* that light — a thing in pain runs from, every time, I'd stake me life on it. She's not screamin'. She's..." His big face works; he hasn't the word either. "She's *summat*. But she's not harmed. Yeh hear me? Not by you."

Under his palm White Lightning has gone quiet, her sides heaving slower, the splinted leg held careful off the ground — up still, but easy with it.

And Mei's there. She's crossed to him without a sound, got both hands on him — his arm, his jaw, turning his face to hers — because she'd felt the panic come off him before he'd finished the first word. "Caleb. *Breathe.* I've got you." Low, steady, only for him. "She's all right. Hagrid's got her. You don't have to have the answer this second." Her thumb moves once across his cheek. "We'll take it apart later, properly, every piece of it — not here, not while you're shaking. Just breathe with me a minute. That's the whole of what there is to do right now."

## User

"Do we need to lie her down? she hasn't been up before now." *I try to suck up silver and put it into her horn.*

## Narrator

▼ **Saturday, 17 September 1977 — 09:48 — Hagrid's pumpkin patch**

"Don't force her down," Hagrid says, low, not lifting his hand off her. "She come up on her own, she'll go down on her own — an' a unicorn shoved about on a bad leg's a unicorn that fights yeh an' does it worse. She's keepin' the weight off it, look. That's sense. Just let her—"

He stops, because Caleb's already got the wand down into the dregs of the flask.

There's next to nothing left to take. The cherry finds a swallow of silver and no more; the thread that climbs it this time is thin, guttering — a hair of what it was. He carries it to her horn and it crosses, small and soft, barely there at all.

She shivers once, nose to tail. The last of the tension goes out of her in a rush — and then, slow, careful, drawing the splinted leg in under herself, White Lightning folds back down into the straw and settles with a long breath, her head coming to rest near his knee.

Hagrid lets a breath go. "...She's lettin' yeh," he says, quiet, wondering, no fear left in it. "I dunno what that is, lad. Never seen the like in forty year. But she's *lettin'* yeh."

## User

"horsey heroine." *I want athena to come to me* "Can we go fill this jug back up in the forrest for her? back to the patch we got the flowers?"

## Narrator

▼ **Saturday, 17 September 1977 — 09:49 — Hagrid's pumpkin patch**

"Horsey heroine," he tells her, and she huffs warm against his knee, eye gone soft and half-lidded, the splinted leg drawn in neat beneath her. Down and quiet and his.

He wants Athena — and somewhere above the treeline a small shape peels loose and drops, fast and certain, the Pygmy Owl coming in on a whirr to land light on his shoulder, talons settling, as if she'd only been waiting on the thought of it.

Hagrid watches the owl arrive without a flicker of surprise — he gave that up about Caleb weeks ago — and turns the question over slow. "...The silver-water patches. Aye. I'll walk yeh there. It's edge-groves, not deep — same hollow we found *her* in, near enough." A glance at the settled white shape in the straw. "She'll keep, lyin' quiet like that. An' mind, there's the demijohns up at the office if yeh just want it *in* the jug. But if yeh want it fresh — from where it comes up out the ground —" he hauls himself upright, knees cracking like green wood, "—then that's a proper walk, and I'm comin' with yeh. Forest's no place to go alone. Not these days."

Mei's already up, brushing straw from her knees. "Back before lunch," she says — to Caleb, and not really asking. "And well before two."

## User

"I imagine by 10:15. it isn't that far. 10:30 latest. if you just sit with her, I will be right back"

## Narrator

▼ **Saturday, 17 September 1977 — 09:50 — Hagrid's pumpkin patch**

Hagrid looks from Caleb to the unicorn and back, and something in him gives — though not all of it. "...Aye. I'll sit with her. She'd settle better for me stayin' than for bein' hauled about anyhow." He lowers himself down by her again with a grunt, one vast hand finding her shoulder; she leans into it, content, eye sliding shut. "But yeh don't go *alone*. Mei goes with yeh — edge-groves only, the path I marked, no further than where the light starts in the trees. Straight there, fill the jug, straight back." A look up, level and serious under all the kindness. "Half ten, like yeh said. Any later an' I'm comin' after yeh, unicorn or no."

Mei's already at his shoulder, brushing the last of the straw off, dry as ever. "As though I'd let you go poking at a magic spring on your own after *that*." She tips her chin at the treeline, the dark fringe of it past the pumpkins. "Lead on, then. Clock's running, and I meant before lunch."

## User

"hey, everyone is complaining but last time I went into the forrest alone, I came back with a pet unicorn. so. not the worst trip." "Athena. go look for Goldie and centaurs and spiders and elves but like the kind with bows, not the little one... and trolls.. and Asian women, if you see any let me know." *grab Mei's hand and walk*

## Narrator

▼ **Saturday, 17 September 1977 — 09:51 — toward the forest edge**

"He's not wrong," Hagrid allowed from the straw, mournful, one hand still resting on the unicorn. "Most folk come out o' that forest with a fright an' fewer boots. You come out of it with *her.*"

Athena took the list with one flat, unimpressed swivel of her head — then went, lifting off his shoulder in a hard whirr, up over the pumpkins and into the dark fringe of the trees, gone scouting on an errand only she seemed to fully grasp the terms of.

Mei let herself be taken by the hand and towed toward the treeline. "The ones with bows are *centaurs*, which you'd already said. The little ones are house-elves, who do not live in forests and would be deeply offended to. There is no such thing as an archer-elf." A beat, bone-dry. "And the only Asian woman you need to go locating is the one attached to your hand. The other one you're meeting tomorrow at three — and trust me, *she'll* do the finding."

The grass gave over to leaf-mould and root. The light changed — green, close, the castle falling away at their backs — and Hagrid's marked path ran on ahead into it. Already, faint, the cold mineral smell of the place they were headed had begun to reach them through the trees.

## User

"I think he just threatened me with your mother, which is admittedly much worse than anything from this forrest, no offense." * walk onward* "Athena, dont limit yourself to worrying about me though. find yourself a vole or mole or other 'ole so you dont think this is a complete waste of oyur time."

## Narrator

▼ **Saturday, 17 September 1977 — 09:52 — Hagrid's marked path, forest edge**

"None taken," Mei said. "He did, and it is. My mother walks into that forest, the acromantulas form an orderly queue to apologise." She stepped over a root without looking down, hand easy in his. "You've met her on paper. Tomorrow she's in the room. Pace yourself."

Somewhere ahead and above, unseen now in the canopy, a small sharp shape was already about its own business — and whatever Athena made of the amended brief, she answered it the way she answered most of his nonsense: by ignoring the half she disagreed with and keeping the half that suited her. A single thin call drifted back through the trees, there and gone, that might have been acknowledgement or might have been a vole's bad morning beginning.

The path dipped. The trees drew close and went quiet — that pressed forest hush, no birdsong in it — and the cold came up off the ground now in earnest, mineral and wet, the smell of grey clay and something colder under it. Light began to thin and silver ahead, low through the trunks, where the ground fell away toward water. Not far now. The place was letting them know they were close the way it always did: by going strange.

## User

[[OOC: you will have to tell me if this is one we started digging a well with magic into]]

## Narrator

[[OOC — let me check the record rather than guess, since this is exactly the kind of thing that shouldn't get fudged.]]

## Narrator

[[OOC — I dug into this (pun noted, not intended). Let me close the loop with one DB check on top of the file/transcript search I already ran, then give you the straight answer.]]

## User

[text/markdown] SILVER_WATER_WELL_TRANSCRIPT_EXCERPTS.md

## Narrator

[[OOC — yes. Definitively yes — and I have to correct myself first: a moment ago I'd talked myself into the opposite answer, and that was wrong. Flagging it cleanly rather than letting it ride. The reason I slipped is that the master notes don't fully capture that day; the actual record of it lives in the log, and the log is unambiguous.

This is the one. The source you're walking up to right now — patch #1, the spring-hollow where you found White Lightning — is exactly the spot Caleb dug a well into with magic on **Wednesday 14 September**, two days back.

How that day went: Mei fetched jugs plus a shovel and trowel from Greenhouse Three. There was a false start at a seep in the draw (about 4 ft down, ordinary brown water, no silver). Then you found the silver by following the flowers. At a *second* patch he hand-dug to ~5 ft, but the waterlogged grey clay kept slumping back in faster than he could clear it, and he and Mei agreed going deeper was a job for magic, not a spade — so he abandoned that one and walked back to patch #1. There he drove the real well the clean way: **Defodio** to carve and widen the shaft, a **holding charm** to shore the walls against the slump, and **Evanesco on the silt alone** so the water and the silver stayed in. He took it to about **10 ft**. Grey clay the whole way down, colder and the silver brighter the deeper he cut, and no cavern, aquifer, pocket, or reachable bottom — just clay weeping silver toward something he couldn't get to. (What it actually is stays gated.) He also stripped that hollow of its night-flowers the same day — roughly 30, lifted by the root and shrunk into a tin.

So what he's about to walk back up to is his own two-day-old shaft: a churned-open ~10-ft well in bare grey clay, the flowers gone, the spring still welling silver at the centre — except now he's arriving with an empty flask to refill and Athena off scouting.

Want me to carry the walk on into the arrival from there?]]

## User

*yes, but also with Mei*

## Narrator

▼ **Saturday, 17 September 1977 — 09:54**
*Forbidden Forest — the silver-water hollow*

The marked path gave out the way Hagrid said it would, the trees drawing in close and wet-footed, alder and willow crowding the last few yards, moss swallowing the sound of their boots. The cold came up to meet them before the ground did. Then the dense ring opened and the hollow was there.

It wasn't as they'd left White Lightning in it, and it wasn't as they'd left it themselves. The flowers were gone — every one, lifted by the root two days back — and where the silver blooms had run thick over the seam there was only bare grey clay, mounded and churned, gone pale and dry on top where the sun reached. The shaft sat dead centre, a dark mouth in the clay, its carved walls still holding most of their gouged shape, sliding a little at the lip where the wet had crept back in. Well down at the bottom the spring still welled, and the silver was still in it, fainter by daylight than it burned at night but unmistakable, a slow cold brightness pooling where he'd left it, ten feet down and patient.

Mei stopped at the rim beside him and looked at it a moment without saying anything. Then, quiet: "This is where we found her." Not a question. Her gaze moved over the churned clay, the open shaft, the line where the ferns started again past the stripped ring. "And then you put a well in it." A breath of something close to a laugh, low and fond. "Two of the strangest days I've ever had, and they happened in the same patch of mud."

Overhead, faint down the bond, Athena rode easy. No lock, no alarm, nothing sharp coming down — just an owl on watch, and somewhere out past the trees a vole having a worse morning than either of them.

The flask hung empty at Caleb's hip.

[Tracker] Reached patch #1 with Mei — the dug well, and the hollow where White Lightning was found. Flowers gone (stripped Wed), bare churned grey clay, the ~10-ft shaft still open with the lip slumping slightly, spring still welling silver at the bottom (daylight-muted). Athena overhead, calm, no danger flagged. Flask still empty.
[Inventory] Cherry wand; empty silver-water flask; Hagrid's forest map (in hand); carving index; gold unicorn hair; near-empty grafting-tar jar; Hexfield notebook; Cass's Dark Mark sketch; Salve of Memory; Mei's note (*Gwenllian ferch Rhydderch*); spent carry-basket.

## User

*I stick my wand and try to pull up from the source*

## Narrator

▼ **Saturday, 17 September 1977 — 09:55**
*Forbidden Forest — the silver-water hollow*

He knelt at the lip and put the cherry down into the shaft, reaching — but the water sat lower than his arm could follow, the surface a good few feet under the wand's tip, down in the cold dark where the silver pooled. He tried the pull anyway, the same draw the wand had been learning all morning.

It answered, and not slow. Down in the shaft the silver stirred; a thread of it lifted, climbing the cold air of the well toward the tip and then up the wood — a thin cold brightness running into the cherry, readier than the flask had ever given it. No contact, and still it came, rising up out of the deep after the wand as if the gap were nothing. The thread held, climbing, unbroken.

Mei had gone still at the rim, watching the silver come up out of the ground after him. "...Caleb," she said. Just his name, low.

[Tracker] Caleb knelt at the shaft and reached his wand in; the spring sits well below arm's reach (~several ft down the 10-ft well). Tried the draw anyway — the silver answered readily *without contact*: a thread lifted up the shaft and climbed the cherry, cold and bright, stronger/readier than from the flask. Thread still holding/rising. Flask still empty (not yet filled). Athena overhead, calm. Mei present, watching.
[Inventory] Cherry wand; empty silver-water flask; Hagrid's forest map (in hand); carving index; gold unicorn hair; near-empty grafting-tar jar; Hexfield notebook; Cass's Dark Mark sketch; Salve of Memory; Mei's note (*Gwenllian ferch Rhydderch*); spent carry-basket.

## User

*keep sucking*

## Narrator

▼ **Saturday, 17 September 1977 — 09:56**
*Forbidden Forest — the silver-water hollow*

He didn't lift it. He held the draw and let it run, the way the wand had been worked up all morning — and the silver came, and kept coming.

The thread thickened. It climbed past where it had climbed before, past the tip and down the cherry in a steady cold line that didn't thin and didn't break, as though there were no end of it down there to empty. The wood went cold under his fingers — colder than wet wand-wood had any business going, the chill running back along the grain into his grip, into the heel of his hand, until holding it was like holding a length of stream-ice that wouldn't melt. Down in the shaft the silver didn't drop. It fed up out of the dark, patient, after the wand.

Mei's hand closed hard on his shoulder. "Caleb." Sharper now. "Look at your hand."

[Tracker] Caleb held the draw and kept pulling — the silver thread thickened and kept climbing the cherry, no thinning, no apparent end; the wand-wood went unnaturally cold, the chill running back into his grip/hand; the well's silver did not visibly drop (feeding from the gated deep). Mei gripped his shoulder, alarmed, telling him to look at his hand. Flask still empty. Athena overhead, calm.
[Inventory] Cherry wand (drawing silver, gone cold); empty silver-water flask; Hagrid's forest map (in hand); carving index; gold unicorn hair; near-empty grafting-tar jar; Hexfield notebook; Cass's Dark Mark sketch; Salve of Memory; Mei's note (*Gwenllian ferch Rhydderch*); spent carry-basket.

## User

*I hold for a little while longer before I have to pull back*

## Narrator

▼ **Saturday, 17 September 1977 — 09:57**
*Forbidden Forest — the silver-water hollow*

He held it. A few seconds more, the thread still climbing, the cold gone past wet-wood cold into something that bit — down through his fingers and into the bone of his hand, the grip stiffening around the cherry, slow to answer him. At the wand's base, where wood met skin, a faint silver sheen had crept onto his fingers, sitting on them the way the beaded water sat on the flowers, not soaking, not falling. The same cold brightness. On his hand now.

Then it was too much, and he drew it up out of the shaft. The thread came with the tip for an inch and then let go, falling back down the dark after the spring, and the draw cut clean. The cherry came up streaming faint silver that thinned and went out in the daylight air.

Mei caught his cold hand in both of hers and turned it over, fast, looking. The sheen was already fading off his fingers — sinking, or going, hard to say which.

[Tracker] Caleb held the draw a few seconds longer (cold biting bone-deep, grip stiffening; a faint silver sheen crept onto his fingers at the wand's base — sat without soaking/falling), then pulled the wand up; the thread fell back down the shaft, the draw cut clean. Sheen fading off his fingers (sinking or dissipating, unclear). Mei took his cold hand in both of hers to look. Flask still empty. Athena overhead, calm.
[Inventory] Cherry wand (drew silver, now cold, streaming faintly then clearing); empty silver-water flask; Hagrid's forest map (in hand); carving index; gold unicorn hair; near-empty grafting-tar jar; Hexfield notebook; Cass's Dark Mark sketch; Salve of Memory; Mei's note (*Gwenllian ferch Rhydderch*); spent carry-basket.

## User

"Incarcerous!" *at a nearby tree* *I literally just did this in DADA and want to be able to compare if it is different or the same*

## Narrator

▼ **Saturday, 17 September 1977 — 09:58**
*Forbidden Forest — the silver-water hollow*

"*Incarcerous!*"

The ropes came — but not the neat few coils the DADA wall had given an hour ago. They burst from the cherry in a heavy rush, more of them and faster, snapping across the clearing and round the alder's trunk in thick fast loops that bit into the bark and hauled tight, and tighter, the wood creaking under the pull. And they came out *cold*, and silver — that same beaded brightness running the length of the conjured rope, the same that wouldn't fall, sheening every coil as it cinched home.

As they went, the cold went out of the wand. The bone-deep chill in his grip drained down the cherry and out into the cast all at once, and when the ropes finished biting, the wood was only wood in his hand again — ordinary, no colder than his palm, the last of the silver gone off his fingers.

Mei stared at the bound trunk, the silver going slowly out of the ropes where they crushed the bark. "...That's not what that spell does."

[Tracker] Caleb cast Incarcerous on a nearby alder to compare with his fresh DADA cast: markedly *different* — far more rope, faster, biting hard enough to creak the trunk (vs. the standard few coils), and the conjured ropes came out cold and silver-sheened (the non-falling beaded brightness). As the cast fired, the wand's stored unnatural cold + the finger-sheen drained out into the spell, leaving the cherry ordinary-temperatured again (the morning's charge apparently spent into the cast). Mei flagged it as abnormal. Mechanism gated. [Anomaly-cluster finding — buffered.]
[Inventory] Cherry wand (charge spent, back to ordinary temp); empty silver-water flask; Hagrid's forest map (in hand); carving index; gold unicorn hair; near-empty grafting-tar jar; Hexfield notebook; Cass's Dark Mark sketch; Salve of Memory; Mei's note (*Gwenllian ferch Rhydderch*); spent carry-basket.

## User

"I'm beginning to think the silver stuff is weird." *stick my wand tip back in and suck up* "would you fill the jug while I fill my proverbial jug?"

## Narrator

▼ **Saturday, 17 September 1977 — 09:59**
*Forbidden Forest — the silver-water hollow*

He set the tip back down into the dark and took the draw up again — and this time it came the instant he asked it, readier than before, the silver lifting to meet the wood as if the channel already knew the way. The cold climbed back into the cherry, into his fingers, building. His proverbial jug, filling.

Mei crouched at the rim with the empty flask and pulled the cork. "That part you're on your own for." Her own wand had got nothing out of this water twice over, and she didn't try a third time. She did it the dull way instead — a flick, and the flask drifted out over the shaft and sank down the black on her levitation, down to where the spring welled. A pause; a gurgle, faint and far. Then up it floated, brimming and softly bright, and she caught it out of the air and thumbed the cork home. "One jug." A look sideways at his hand on the wand, at the cold gathering there again. "The proverbial one's your lookout."

[Tracker] Caleb dipped the wand back in and resumed the draw — came *readier* still (silver rising to meet the wood at once, cold rebuilding in the wand/hand; charge accruing). Mei filled the flask by levitating it down the 10-ft shaft to the spring and back (her wand can't draw the silver — established control — so she did it mechanically); flask now FULL of silver water, holding it normally. Mei eyeing the cold gathering in Caleb's hand. Athena overhead, calm.
[Inventory] Cherry wand (drawing silver again, cold rebuilding); silver-water flask — **now full**; Hagrid's forest map (in hand); carving index; gold unicorn hair; near-empty grafting-tar jar; Hexfield notebook; Cass's Dark Mark sketch; Salve of Memory; Mei's note (*Gwenllian ferch Rhydderch*); spent carry-basket.

## User

*take in more to see if I am better able to handle it*

## Narrator

▼ **Saturday, 17 September 1977 — 10:00**
*Forbidden Forest — the silver-water hollow*

He took more. Held the draw past where he'd broken it last time, and let the silver keep climbing — and it climbed. Up the cherry, into his fingers, and on past them this time: the cold ran into his wrist, up the forearm, sinking through the skin toward the bone of it. The sheen came with it — that beaded brightness creeping off his fingers onto the back of his hand, his wrist, sitting on the skin without soaking and without falling, the way it sat on the flowers.

The bite was no less than before. But his hand stayed steady on the wand through it, and his fingers answered when he worked them — cold to the bone and not numb, not burning, not failing. Only cold, and bright, and climbing.

Down the shaft the spring didn't drop. It fed.

Mei was on her feet. "Caleb — it's up your *arm.*"

[Tracker] Caleb drew again and held longer/took in more, testing his tolerance: the silver came readily and climbed *further* this time — cold and visible sheen spreading past his fingers up the back of his hand, wrist, into the forearm (the beaded brightness sitting on skin without soaking/falling). The bite was as intense as before, but his hand stayed steady and his fingers still worked — cold-to-the-bone but not numb, burning, or failing (no evident tissue harm). Well did not visibly drop (feeding from the gated deep). Mei alarmed — the sheen is now up his arm. Flask still full. Mechanism gated. [Anomaly-cluster finding — buffered.]
[Inventory] Cherry wand (drawing silver, cold); silver-water flask (full); Hagrid's forest map (in hand); carving index; gold unicorn hair; near-empty grafting-tar jar; Hexfield notebook; Cass's Dark Mark sketch; Salve of Memory; Mei's note (*Gwenllian ferch Rhydderch*); spent carry-basket.

## User

*keep going*

## Narrator

▼ **Saturday, 17 September 1977 — 10:01**
*Forbidden Forest — the silver-water hollow*

He kept going. The cold climbed past the elbow into the upper arm — and the sheen had stopped only sitting on the skin. Where it had crept onto the back of his hand it was sinking now, going *under*, a faint silver light moving beneath the skin itself, threading up the inside of his arm with the cold. No longer beaded on top. In.

The well fed. It did not drop.

And down the bond it reached Mei — not the cold itself, but the wrongness of it, a cold-flat note where his warmth ought to be, climbing the way it climbed his arm. She felt it, and she moved. Both her hands clamped hard around his wrist, above the line where the silver ran under his skin.

"Caleb. Stop. *Now.*"

[Tracker] Caleb kept drawing — the cold + silver climbed past his elbow into the upper arm, and the sheen began *sinking beneath the skin* (a faint silver light moving under the surface, threading up the inside of his arm — a shift from sitting-on-top to going-in). The well still fed, didn't drop. The *wrongness* of his state crossed the bond to Mei (cold-flat where his warmth should be); she gripped his wrist with both hands and told him to stop now. Draw still live; flask still full. Mechanism gated; outcome unresolved. [Anomaly-cluster finding — buffered.]
[Inventory] Cherry wand (drawing silver, cold); silver-water flask (full); Hagrid's forest map (in hand); carving index; gold unicorn hair; near-empty grafting-tar jar; Hexfield notebook; Cass's Dark Mark sketch; Salve of Memory; Mei's note (*Gwenllian ferch Rhydderch*); spent carry-basket.

## User

"when in doubt, pull out" *I pull away sharply and stare into the water for ten seconds and then begin casting as spell at it, flicking my wand in different directions and then circling like a cursive lowercase g* "you can make a unicorn jizz, tell me what this silver shit is" *and I tap the wand to the surface of the water and step back*

## Narrator

▼ **Saturday, 17 September 1977 — 10:02**
*Forbidden Forest — the silver-water hollow*

He stared down the shaft the ten seconds. Then the wand moved — flick, a cut left, a cut right, round into that looping cursive curl — the crude question pitched down into the dark like he expected the dark to answer it.

He tapped the surface. Stepped back.

A breath of nothing. Then the silver *answered* — not a word, nothing he could read, but it answered all the same. The water brightened far down the shaft and began to climb, rising up the carved walls toward the wand, toward the tap that had called it, cold light swelling up out of a dark he'd proven had no bottom. A foot. Two. Reaching the way it had reached up his arm. And when he asked it nothing further, it stilled — and sank back, slow, to where it had lain. Attentive. Silent. Gone.

It hadn't told him what it was. It had only come when called.

Mei's fist closed in the back of his shirt and pulled him a step further from the rim. "...It *answers* you," she breathed.

[Tracker] Caleb pulled the wand out sharply (ended the intake), then improvised a reveal-attempt at the well — wand-flicks + a looping cursive figure + a tap to the surface, asking aloud what the silver is. Result: NO identification, no readout, no name — the wall held. But the water *responded to being addressed*: it brightened and rose up the shaft toward him/the wand (a foot or two), then subsided when nothing more was asked — behaving as attentive/responsive to Caleb specifically. Silver from the last draw (10:00–10:01) still under the skin of his forearm — not discharged this time (he cast nothing to drain it); fading or settled, unclear. Nature/source still gated; mystery deepened, not solved. Flask full. Athena overhead, calm. [Anomaly-cluster finding — buffered.]
[Inventory] Cherry wand (charge not discharged — drew silver, last intake still in his arm); silver-water flask (full); Hagrid's forest map (in hand); carving index; gold unicorn hair; near-empty grafting-tar jar; Hexfield notebook; Cass's Dark Mark sketch; Salve of Memory; Mei's note (*Gwenllian ferch Rhydderch*); spent carry-basket.

## User

"I think that was the magic of the traditional spell... okay... this has been fun... the water is sentient.. I think I would like to leave... reducioliolio that and  I owuld like to leave please." "Athena, we turneth. doth comest with" *look for walnut tree intensely so so intensely*

## Narrator

▼ **Saturday, 17 September 1977 — 10:03**
*Forbidden Forest — the silver-water hollow*

"*Reducio.*"

The silver ropes shrank off the alder all at once, withering down the trunk to nothing — and the cold went with them. The last of the silver ran out from under the skin of his arm, down the cherry, out into the cast, and his arm was his own again, warm, the brightness gone from beneath it. The alder stood freed, bark scored where the loops had crushed it.

Mei watched the silver leave him and let out a breath she'd been holding. "...Better. That's better."

Athena dropped from the high pine to his shoulder at the mock-archaic summons, talons finding their grip, unbothered by the Middle English.

He turned from the well and looked — *intensely* — along the treeline. Alder. Willow. A crowding pine, an ash, the wet-footed rowans Hagrid had marked. No walnut. Nothing like walnut grew in cold bog.

Mei followed his stare to precisely nowhere. "What," she said slowly, "are we looking for."

[Tracker] Caleb cast Reducio at the silver Incarcerous ropes on the alder — they shrank/withered off, freeing the tree; the cast *also* discharged the residual under-skin silver from his forearm (drained out into the spell, arm back to ordinary/warm — second confirmation that casting discharges the stored silver). Mei relieved. Caleb summoned Athena (now on his shoulder) and turned to leave, scanning the treeline *intensely* for a walnut tree — none present (Dense zone is wet-footed species: alder/willow/pine/ash/rowan). Flask full. Departure begun; at the hollow's edge, ready to walk back. [Anomaly-cluster finding — buffered.]
[Inventory] Cherry wand (charge discharged, ordinary temp); silver-water flask (full); Hagrid's forest map (in hand); carving index; gold unicorn hair; near-empty grafting-tar jar; Hexfield notebook; Cass's Dark Mark sketch; Salve of Memory; Mei's note (*Gwenllian ferch Rhydderch*); spent carry-basket.

## User

"a walnut"

## Narrator

▼ **Saturday, 17 September 1977 — 10:04**
*Forbidden Forest — leaving the hollow*

Mei looked at him. Then at her own wand in her hand. Then back at him.

"Caleb. This is walnut." She held it up an inch, flat as a board. "It got nothing out of that water. Twice. You stood there and watched it get nothing." She tucked it away. "So either you've forgotten that in the last four minutes, or you've decided the difference is *living* walnut versus a finished wand, and you want a tree to whittle — in which case, no. Not today, not up to your elbow in something that climbs into people."

She took his arm and turned him up the marked path before he could locate a bog that grew walnut on principle. "If it's the wood, or the wand, or *you* — we find out on a bench, with Pennycuik's results in front of us. Walk. Hagrid said half-ten."

Athena settled her grip. Behind them the open shaft dimmed back into the trees, its silver lying quiet, patient, waiting to be asked something.

[Tracker] Caleb's "walnut" bit landed; Mei called it — her own wand is walnut and already drew nothing from the silver twice, so she read the real thread under the joke (whether it's the *wood* vs. a *finished wand* vs. *Caleb himself* / the bond) and bench-deferred it (pending Pennycuik's results; not resolved — gated). She turned him onto the path to leave per his stated wish; walking back toward the lean-to, due by ~10:30. Flask full; Athena on his shoulder. No new draw/anomaly this beat.
[Inventory] Cherry wand (ordinary temp); silver-water flask (full); Hagrid's forest map (in hand); carving index; gold unicorn hair; near-empty grafting-tar jar; Hexfield notebook; Cass's Dark Mark sketch; Salve of Memory; Mei's note (*Gwenllian ferch Rhydderch*); spent carry-basket.

## User

"Bitch, I wanted a walnut for wandmaking because of you"

## Narrator

▼ **Saturday, 17 September 1977 — 10:05**
*Forbidden Forest — leaving the hollow*

That stopped her on the path — not the *bitch*, she gave as good as that daily, but the *because of you.*

Walnut. Her wood.

"...Oh." The brisk went straight out of her. She looked at him a second like she was rereading the last four minutes and finding she'd had them wrong the whole way through. "You weren't after a control. You wanted to make a wand out of—" She didn't finish it. Her mouth did something it was working not to do. "You absolute sap. You were scanning a *bog* for my wood while the silver was halfway up your arm."

She took his hand — the cold one, warm again now — and this time she kept it as she walked. "We'll get you walnut. Properly. Off a tree that isn't trying to drink you." A few steps, the marked path bending up toward the light. "What were you going to put in it?"

[Tracker] Caleb landed the real point — the walnut hunt wasn't a forgotten control, he wants a walnut *blank* to carve a wand, specifically because walnut is Mei's wood. It disarmed her telling-off; she clocked the sentiment, softened completely, took his (now-warm) hand and kept it, and agreed to source walnut properly later (off a normal tree, not the silver bog). She asked what core he meant to put in it — open question to Caleb. Walking back, due ~10:30. Flask full; Athena on his shoulder.
[Inventory] Cherry wand (ordinary temp); silver-water flask (full); Hagrid's forest map (in hand); carving index; gold unicorn hair; near-empty grafting-tar jar; Hexfield notebook; Cass's Dark Mark sketch; Salve of Memory; Mei's note (*Gwenllian ferch Rhydderch*); spent carry-basket.

## User

"obviously we are going to have brother wands with the gold unicorn hair... I just dont know if the same wood will work with it or what.. we could have brother sister wands where the core is from the same thing and then the wood is from the same thing."

## Narrator

▼ **Saturday, 17 September 1977 — 10:06**
*Forbidden Forest — the marked path*

She walked a few steps turning it over, doing the arithmetic of it the way she did with everything.

"Brother wands share a core from the one creature. Two hairs off Goldie, one in each stick — that part's sound, that's how it's actually done." Then a beat, and her tone changed. "But you know what brother wands *do*. They won't turn on each other. Put two of them against each other in a duel and they lock up, throw it back, refuse the fight."

She glanced at him sideways, and heard her own words land as she said them. "...Two people who've sworn they'll never be on opposite sides of anything, carrying the only two wands in the world that can't be made to fight." Quieter. "That's either the most romantic thing you've ever floated at me or a genuinely terrible idea, and I can't tell which yet."

The path bent up toward the light. "The wood's the part to slow down on. Nobody knows what that gold hair even *is* yet — it's sitting in London. Match it to walnut if you like. We're not cutting anything until we know what we're building it around."

[Tracker] Walking back; wand-design talk continues. Caleb's pitch: brother wands (shared gold-unicorn-hair core, one hair each from Goldie Fawn) — possibly "brother-sister" wands matching *both* core-source and wood-source (walnut, Mei's wood). Mei engaged: confirmed the shared-core method is sound, raised the brother-wand property that they won't duel each other / lock up turned against one another, and clocked the resonance with their "never on opposite sides / go to each other in danger" pact (left unresolved as romantic-or-reckless). Bench-deferred the wood: gold hair's nature still unknown (Pennycuik's phials in London, results pending) — no cutting until they know what they're building around. Due ~10:30. Flask full; Athena on his shoulder. [Wand-design thread — buffered.]
[Inventory] Cherry wand (ordinary temp); silver-water flask (full); Hagrid's forest map (in hand); carving index; gold unicorn hair; near-empty grafting-tar jar; Hexfield notebook; Cass's Dark Mark sketch; Salve of Memory; Mei's note (*Gwenllian ferch Rhydderch*); spent carry-basket.

## User

"false. I'm not making anything permanent. I cant know what anything does unless it is tested."

## Narrator

▼ **Saturday, 17 September 1977 — 10:07**
*Forbidden Forest — the marked path*

"I know you're not." She said it without heat, because it was true and she knew it better than anyone. "Nothing you build is permanent. That's the whole point of every design you've drawn me — the discs come out, the core unthreads, the thing reads as one stick and then it isn't. You don't glue. I've heard the sermon." A wry sideways look. "I'd have married the man who glues things and been miserable."

The path climbed toward the brightening trees, her hand still in his.

"So yes. Bench it, swap it, test it, take it apart, find out what it does. All of that." A beat, the dry coming back into her voice. "My only correction is the word *tested.* Because half an hour ago *tested* meant a clean cut on a blank in the office, and just now it meant standing over a bottomless hole sticking your wand into something sentient until it ran up past your elbow. Those are not the same verb, Caleb." She squeezed his hand once. "Bench-tested. Use the whole word."

[Tracker] Walking back (~10:07); wand-philosophy beat. Mei agreed with Caleb's point and tied it to his established design ethic (nothing glued/permanent — swappable discs, unthreading cores, the "reads as one stick then isn't" builds she's seen); fully endorsed bench-testing/swapping/taking-apart as his method. Her only pushback: the *scope* of "tested" — distinguishing a clean cut on an office bench from what he just did to his own arm at the well; asked him to mean *bench*-tested. Affectionate, not a real rebuke. Due ~10:30. Flask full; Athena on his shoulder. No new anomaly/draw this beat.
[Inventory] Cherry wand (ordinary temp); silver-water flask (full); Hagrid's forest map (in hand); carving index; gold unicorn hair; near-empty grafting-tar jar; Hexfield notebook; Cass's Dark Mark sketch; Salve of Memory; Mei's note (*Gwenllian ferch Rhydderch*); spent carry-basket.

## User

"okay, but I'm still ... at least... 60% certain it isn't evil since the unicorn is so into it."

## Narrator

▼ **Saturday, 17 September 1977 — 10:08**
*Forbidden Forest — the marked path*

"Sixty percent." She let that sit a beat. "On a scale where the other forty is *evil.*"

The trees were thinning toward the grounds now, the cold of the hollow falling away behind them, ordinary September coming back into the air.

"I'll give you the unicorn. She's the best evidence you've got — they don't go near anything tainted, and she drinks it from your hands like it's nothing." A pause, picking her way over a root. "But she eats *birch and rowan* and turns her nose up at hawthorn, and nobody can tell you why that means anything either. She's a strange one all the way down. I'm not sure she's a clean test of *anything* yet."

She glanced at his arm — the one that had gone silver to the elbow — then ahead at the light. "Here's where I am. I don't think it's evil. I think it's *old*, and it answers you, and it climbs, and we don't know the first thing about what it wants. Evil I could plan around. *That* I can't. So sixty's fine. Just don't let sixty walk you back to the rim."

[Tracker] Walking out (~10:08), nearing the grounds. Caleb at "~60% certain it isn't evil" (the unicorn's affinity as his main evidence). Mei's read: grants the unicorn as the best evidence (unicorns shun the tainted; WL drinks it freely from his hands) but cautions WL is anomalous across the board (the birch/rowan-yes, hawthorn-no diet nobody can explain) so not a clean test yet. Her own position: probably not evil, but *old / responsive / climbing / unknown in its wants* — which she finds harder to plan around than evil would be. Asked him not to let "60%" pull him back to the well. Gated mystery intact. Flask full; Athena on his shoulder.
[Inventory] Cherry wand (ordinary temp); silver-water flask (full); Hagrid's forest map (in hand); carving index; gold unicorn hair; near-empty grafting-tar jar; Hexfield notebook; Cass's Dark Mark sketch; Salve of Memory; Mei's note (*Gwenllian ferch Rhydderch*); spent carry-basket.

## User

*look for secrets*

## Narrator

▼ **Saturday, 17 September 1977 — 10:09**
*Forbidden Forest — the marked path*

He slowed and looked — properly, the way he'd swept the treeline for walnut. Up into the canopy, down the trunks, across the wet leaf-litter to either side of the path.

What was there was what Hagrid had left: the gamekeeper's blazes, pale axe-cuts notched into the bark at shoulder height every dozen yards, marking the safe line out. A birch ringed with a single cut. A rowan with two. The marks ran ahead toward the brightening edge of the wood and behind toward the hollow, and between them the forest was only forest — wet floor, crowded wet-footed trunks, the light coming up green and ordinary as the trees thinned toward the grounds. Nothing in it was hidden. Nothing in it moved that shouldn't.

Mei stood and let him do it, her hand loose in his. "Anything?" Not skeptical. Just asking.

[Tracker] Caleb scanned the marked path for hidden things on the way out: turned up only the ordinary — Hagrid's established trail-blazes (axe-cuts notching the safe line; birch one cut, rowan two) and ordinary thinning forest toward the grounds. Nothing concealed revealed itself on this stretch. Walking out, due ~10:30; Mei asked if he'd found anything (open). Flask full; Athena on his shoulder. No new finding/anomaly this beat.
[Inventory] Cherry wand (ordinary temp); silver-water flask (full); Hagrid's forest map (in hand); carving index; gold unicorn hair; near-empty grafting-tar jar; Hexfield notebook; Cass's Dark Mark sketch; Salve of Memory; Mei's note (*Gwenllian ferch Rhydderch*); spent carry-basket.

## User

*look for sconces*

## Narrator

▼ **Saturday, 17 September 1977 — 10:10**
*Forbidden Forest — the marked path*

He scanned the trunks at shoulder height with the grave attention of a man conducting an inspection. Bark. Moss. A beetle. Hagrid's axe-blazes. No bracket, no sconce, no candle-cup, no wall to hang one on — because it was a forest, and the only things bolted to these trees were the trees.

Mei watched him survey the wet-footed alders for light fixtures and arrived, visibly, at the joke a half-second before he could deliver it.

"There are no sconces in the Forbidden Forest, Caleb."

A pause. Then, flat, because she'd walked herself straight into it: "...which is exactly the sort of unsurveyed gap the Ministry of Ye Ancient Sconce Safety exists to address. I know. I heard it before you said it." She tugged him on up the path, the light of the grounds proper now showing through the last of the trees. "File it. Mandate's expanding. Walk."

[Tracker] Caleb mock-inspected the trail trees for sconces (the MY ASS / Ministry of Ye Ancient Sconce Safety running gag) — found none, a forest having no walls or fixtures (only Hagrid's blazes + ordinary woodland). Comic beat; Mei pre-empted and landed the joke herself, conceding the "unsurveyed gap" and moving him along. Nearly out of the wood to the grounds; due ~10:30. Flask full; Athena on his shoulder. No state change this beat.
[Inventory] Cherry wand (ordinary temp); silver-water flask (full); Hagrid's forest map (in hand); carving index; gold unicorn hair; near-empty grafting-tar jar; Hexfield notebook; Cass's Dark Mark sketch; Salve of Memory; Mei's note (*Gwenllian ferch Rhydderch*); spent carry-basket.

## User

*to hagrids to drop off water*

## Narrator

▼ **Saturday, 17 September 1977 — 10:13**
*Hogwarts grounds — Hagrid's pumpkin patch*

The trees gave way to open ground and the morning proper — the pumpkins fat and orange across the slope, the lean-to throwing its long shadow, woodsmoke off the hut beyond. White Lightning had her head up before they cleared the last of the wood, ears swung hard toward Caleb, tracking him in the way she did now; she let out a low note, not the high ringing cry from before, just a sound that meant she'd heard him coming and minded where he'd been.

Hagrid straightened from the straw where he'd been sat with a hand on her neck, Fang thumping his tail in the dirt. "Half-ten, near enough. Good." He looked them both over, found them whole, and eased. "She's been listenin' for yeh the whole time — settled, mind, no more o' that carry-on. Get the water, did yeh?"

[Tracker] Caleb + Mei walked out of the forest and back to the pumpkin-patch lean-to on time (~10:13, ahead of Hagrid's half-ten). White Lightning alert and tracking Caleb's return (low greeting note, not the earlier alarm-cry; she's been settled in his absence per Hagrid). Hagrid (+ Fang) present, relieved they're back whole; asked whether they got the water. The refilled flask is the water to drop off (for White Lightning). Athena on Caleb's shoulder. [Anomaly-cluster + wand-design findings still buffered.]
[Inventory] Cherry wand (ordinary temp); silver-water flask (full — for White Lightning); Hagrid's forest map (in hand); carving index; gold unicorn hair; near-empty grafting-tar jar; Hexfield notebook; Cass's Dark Mark sketch; Salve of Memory; Mei's note (*Gwenllian ferch Rhydderch*); spent carry-basket.

## User

"Yeah and also I said dirty words at it and it came out of th ground at me."

## Narrator

▼ **Saturday, 17 September 1977 — 10:14**
*Hogwarts grounds — Hagrid's pumpkin patch*

Hagrid's hand went still on White Lightning's neck.

"...Came up at yeh." Slow, not a question — turning it over, and not liking the shape it made. "Out o' the ground. *After* yeh." He looked from Caleb to the dark line of trees they'd come out of, and back again. "I've worked this wood forty year. Water sits where water sits. It don't come *for* a man."

Then something eased him — maybe the unicorn warm under his hand, maybe the boy in front of him whole and grinning about it. He let a breath go. "But she—" a nod down at White Lightning "—she drinks it off your hands an' nobody else's, an' I give up bein' surprised by the two o' yeh days ago." No smile, though. "Do us one thing. Don't go sayin' words at it again — dirty nor clean. Let Pennycuik tell us what it *is* 'fore yeh go an' have a conversation with it."

[Tracker] Caleb reported the well beat to Hagrid (Incarcerous test + addressing the water + it rising out of the ground "at him"). Hagrid's bounded reaction: in forty years he's never known forest water to "come for" a man — plainly unsettled, out of his depth; but tempered by WL's from-Caleb's-hands-only drinking (he's stopped being surprised). He cautioned Caleb to stop *addressing* the water and wait for Pennycuik's results before engaging it further (gate held — Hagrid doesn't know what it is; routes to the Healer). Flask full, to drop off for WL. Athena on Caleb's shoulder. [Anomaly-cluster + wand-design findings still buffered.]
[Inventory] Cherry wand (ordinary temp); silver-water flask (full — for White Lightning); Hagrid's forest map (in hand); carving index; gold unicorn hair; near-empty grafting-tar jar; Hexfield notebook; Cass's Dark Mark sketch; Salve of Memory; Mei's note (*Gwenllian ferch Rhydderch*); spent carry-basket.

## User

"to clarify, I also tapped it with my wand. it didn't feel like.... malicious.. it felt more like.. 'hello'.. but it was water and I didnt love it coming up out of the ground at me and I dont trust me feelings about reading water emotionally largely because that has never been required." *go pet WL* *go with Mei to the RoR*

## Narrator

▼ **Saturday, 17 September 1977 — 10:15**
*Hogwarts grounds — Hagrid's pumpkin patch*

"Hello," Hagrid repeated, low, and didn't pretend to understand it. "Aye, well. You're the one as'd know the *feel* of a thing better'n me." He didn't push past that — filed Caleb's own caution about not trusting it, and let it be.

Caleb knelt by White Lightning. She'd already turned her muzzle toward the flask, knowing. He poured silver into his cupped palm, drank a swallow first the way she needed, then held the rest out flat — and she took it off his hand, soft-lipped, unhurried, her breath warm against his fingers where the cold had been an hour ago. He worked his other hand up her neck, slow, the way she leaned into. "There. Good girl."

Then he was up, and Mei had his hand, and they went — up the slope, into the castle, the long climb to the seventh floor and the bare stretch of wall across from Barnabas Deauntless and his trolls.

[Tracker] Caleb gave White Lightning a drink of the fresh silver water (cupped from the flask, drank first himself per her pattern — she took it off his hand, calm) and had a settling moment with her; Hagrid let the water-thread rest without pushing. Then Caleb + Mei left the patch and climbed to the 7th floor, arriving at the Room of Requirement (Barnabas tapestry) — about to open it (intent/variant TBD by Caleb). Flask now partly used (WL's drink), still most full. Athena on his shoulder. [Anomaly-cluster + wand-design findings still buffered for flush.]
[Inventory] Cherry wand (ordinary temp); silver-water flask (mostly full); Hagrid's forest map; carving index; gold unicorn hair; near-empty grafting-tar jar; Hexfield notebook; Cass's Dark Mark sketch; Salve of Memory; Mei's note (*Gwenllian ferch Rhydderch*); spent carry-basket.

## User

*into the workshop room of wood and alchemy and potionmaking except EXCEPT this time I want a smithing area somewhere with the chimney and bellows and an anvil*

## Narrator

▼ **Saturday, 17 September 1977 — 10:24**
*Hogwarts, seventh floor — the Room of Requirement*

Three passes of the bare wall and the door cut itself into the stone. Inside, the workshop was as he'd built it and left it: the long benches, the wood racked and stable in its slots, the cut billets seasoning under their low warming-charms, the cauldrons banked cold and clean along the potion side, the dry warm air that kept green wood from checking. Athena lifted off his shoulder to a roof-beam and settled to preen.

But the Room had heard the rest of it. The far corner had grown a stone chimney-breast that hadn't been there, broad and rough-coursed, a flue running up into the dark. Under it a brick forge-hearth sat cold, charcoal heaped ready in a scuttle beside it; a great leather bellows hung folded at the hearth's cheek, its handle worn smooth as if by other hands. A black anvil stood horn-out on an oak stump, a quench-trough of dark water beside it, and on the wall a rack of tongs and hammers and a flatter and a hardy, iron all, hung in order from largest to least. The whole corner smelled of cold coal and old iron — a smell with no place near a workshop full of wandwood.

Mei stopped two steps in and took the forge in with a long look. Then, dry: "There is a great deal of iron in that corner, Caleb. For a man who's spent his week on a creature that bolts from the stuff." A beat, the curiosity winning. "...What are we forging?"

[Tracker] Caleb opened the Room of Requirement to his established wood/alchemy/potion workshop, this time requesting an added smithing area — the Room provided it: a new stone chimney-breast + flue in the far corner, a cold brick forge-hearth with charcoal ready, a leather bellows, a horned anvil on an oak stump, a quench-trough, and a wall rack of iron smithing tools (tongs, hammers, flatter, hardy). Existing workshop intact (benches, racked wood, seasoning billets, banked cauldrons, dry warm air). Athena perched on a beam. Mei noted the irony of so much iron given their unicorn work and asked what he means to forge (open to Caleb). Flask mostly full. [Findings still buffered for flush.]
[Inventory] Cherry wand (ordinary temp); silver-water flask (mostly full); Hagrid's forest map; carving index; gold unicorn hair; near-empty grafting-tar jar; Hexfield notebook; Cass's Dark Mark sketch; Salve of Memory; Mei's note (*Gwenllian ferch Rhydderch*); spent carry-basket.

## User

"nothing today.. I am just interested and thought I would start having it here for one day. I cant pick up a new craft today.. but it is fascinating right? do you want to woodwork with me?"

## Narrator

▼ **Saturday, 17 September 1977 — 10:25**
*Hogwarts, seventh floor — the Room of Requirement workshop*

"It's fascinating that you wanted a *forge* in the room where you keep wood that catches and a shelf of finished potions." But she said it fond, already shrugging off her satchel, because the real question had landed and the answer was easy. "Yes. Obviously yes. I always want to woodwork with you, even though woodworking with you means I hold things and read numbers off a rule while you make the actual cuts and tell me I'm indispensable."

She pulled the high stool round to his bench and sat, settling in like she meant to stay the morning. The dry went quiet underneath. "You can't pick up smithing today and you can't cut a real wand till London writes back. So what *can* we do — the cheap learning carve you keep promising me you'll practise before you ruin anything good?"

[Tracker] Caleb clarified the forge is a one-day curiosity, not a craft he's starting today, and invited Mei to woodwork with him; she accepted warmly (her self-described role: measuring/logging/holding while Caleb cuts). Mei settled in at his bench for the morning and steered toward what's actually doable today — gesturing at the bench-deferred "cheap learning carve" (the forgiving practice carve before any real/valuable wand) since smithing's off and the real wand build waits on Pennycuik's London results. Open to Caleb: what to start on. Athena on the beam; flask mostly full. [Findings still buffered.]
[Inventory] Cherry wand (ordinary temp); silver-water flask (mostly full); Hagrid's forest map; carving index; gold unicorn hair; near-empty grafting-tar jar; Hexfield notebook; Cass's Dark Mark sketch; Salve of Memory; Mei's note (*Gwenllian ferch Rhydderch*); spent carry-basket.

## User

"here, actually try. I spent an hour and a half marking page numbers. putting in time at the beginning to hopefully save time now... here...I don't want to be that person to you.. we will go step by step together and read and help each other out. there are two lathes over here and we can do things at the same time and help each other out. why dont we do the aether slung tririb? it doesnt seem easy but easier to practice on birch.. '**One — the blank.** A straight-grained billet, over length and width. Centre marked dead-true on both ends, mounted between centres. Everything hangs off that axis; let it wander and no disc will ever seat clean.' '1 — pages - 1 — the blank · *Timber and the True Edge*, "Choosing the Stick" and "The Run of the Grain," read hard this time for density and dead-straight grain; strength is everything when most of the wood comes away.'" *I give her a birch billet and I take one*

## Narrator

▼ **Saturday, 17 September 1977 — 10:32**
*Room of Requirement workshop*

They set to it at the two lathes, side by side, and this time she didn't reach for the rule — she took the birch in her hands and worked it the way the page wanted. Turned it slow under the bench-light, sighted down its length one eye closed, thumbnail testing the end-grain for how tight the rings ran. "*Choosing the Stick.* Density and dead-straight. Right."

Then she stopped turning. "Mine wanders." She ran her nail along a faint line a few inches shy of one end, where the grain peeled off the long axis toward the side instead of running clean through. "That's the run-out it keeps warning about. If most of the wood comes away and the strength lives in the grain, that end's a weak spot built in from the start." She looked up — actually asking, not performing it. "So do I bin it and pull a fresh billet, or centre off the straight run and just mark it short of the bad end?"

[Tracker] Caleb + Mei began the practice wand-carve together at the workshop's two lathes — Step 1 ("the blank"), working birch as forgiving practice stock, reading *Timber and the True Edge* ("Choosing the Stick" / "The Run of the Grain") for grain density + dead-straight run; design being practised = the aether-slung tririb. Mei actively participating hands-on (sighting/grain-testing, not just measuring) and caught a *run-out* in her own billet (grain peeling off-axis near one end — the flaw the step warns of). Open decision for Caleb: reject her billet for a fresh one, or centre off the straight run and mark it short. Athena on the beam; flask mostly full. [Findings still buffered.]
[Inventory] Cherry wand (ordinary temp); silver-water flask (mostly full); birch practice billets (Caleb's + Mei's, mounting up); Hagrid's forest map; carving index; gold unicorn hair; near-empty grafting-tar jar; Hexfield notebook; Cass's Dark Mark sketch; Salve of Memory; Mei's note (*Gwenllian ferch Rhydderch*); spent carry-basket.

## User

"I dont know what that means.. do what the book say is the best.. if you can't totally correct for it and that is bandaging over it, set it aside for parts maybe and get a new one... if that is expected and normal and you can correct, do it.. but aim for correct and right, not close enough."

## Narrator

▼ **Saturday, 17 September 1977 — 10:36**
*Room of Requirement workshop*

She read both passages again, slower, thumb under the lines, then took the rule to the billet for real. Measured from the clean end down to where the grain peeled off, and marked it. Measured the finished length the tririb wanted off the same end, and marked that too. Set the two marks side by side and looked.

"It's correctable, and it's not a bandage." She sounded sure of it now, working from the page rather than hoping. "*The Run of the Grain* says you cut over-length on purpose — so you can dock the bad end clean off and centre on the true run. The run-out's all in the waste. My finished length sits entirely in the straight grain, with margin to spare." She fit the billet to the lathe-saw and took the bad end off in one pass — a short cylinder of off-axis birch dropping into the scrap bin — then re-found her centres on the cut end, dead-true, and mounted it fresh between the points. Spun it slow by hand. No wobble. "There. Right, not close." A glance across at his lathe. "Sight yours before you mount it. Did your end run clean, or have you got the same thing?"

[Tracker] Mei worked Step 1 on her birch billet per Caleb's stated rule (aim for genuinely correct, else set aside for parts): read *The Run of the Grain*, measured the run-out against the tririb's finished length, and determined the flaw sat entirely in the over-length *waste* — so docking the bad end and re-centring on the true run is the *correct* fix, not a bandage. Docked the off-axis end (to scrap), re-found dead-true centres on the clean end, remounted, spun true (no wobble). Step 1 done correctly on her stick. She turned the check back to Caleb — asking him to sight his own billet's grain before mounting (clean run, or same run-out?). Open to Caleb. Time ~10:36. Athena on the beam; flask mostly full. [Findings still buffered.]
[Inventory] Cherry wand (ordinary temp); silver-water flask (mostly full); birch practice billets (Caleb's unmounted + Mei's now trued & mounted; a short off-axis offcut in the scrap bin); Hagrid's forest map; carving index; gold unicorn hair; near-empty grafting-tar jar; Hexfield notebook; Cass's Dark Mark sketch; Salve of Memory; Mei's note (*Gwenllian ferch Rhydderch*); spent carry-basket.

## User

*I try to do mine correctly and see where it is.*

## Narrator

▼ **Saturday, 17 September 1977 — 10:41**
*Room of Requirement workshop*

He did what she'd done — turned the billet under the light, one eye shut, ran his thumbnail down the end-grain feeling for the tight tell-tale run. The birch sat pale and quiet in his hands. As far as he could read it, the grain ran straight off the end and on down the length, no peel, no wander he could find.

He sighted it the long way, the way the page said, lining the grain against the bench edge. Held it out for her without a word — *check my work* — the way she'd checked hers.

Mei took it, turned it once, ran her own nail down it, sighted it. "Cleaner than mine, actually. Annoying." She handed it back. "That one you can centre and mount as-is — true run the whole length, no docking. Find your dead-centre on both ends and we'll have you between the points." The dry came back, warm. "First step of the hard design, and yours was the good stick. Don't get used to it."

[Tracker] Caleb worked Step 1 on his own birch billet correctly — sighted the grain (one eye, thumbnail end-grain test, lined against the bench edge): his ran dead-straight the full length, no run-out. Mei cross-checked and confirmed (cleaner than hers; no docking needed) — he can centre and mount as-is. Both their practice blanks now pass Step 1 of the aether-slung tririb carve; next is finding dead-centres on both ends and mounting between centres (Step 1 finish → Step 2). Time ~10:41. Athena on the beam; flask mostly full. [Findings still buffered.]
[Inventory] Cherry wand (ordinary temp); silver-water flask (mostly full); birch practice blanks (Caleb's clean & ready to centre; Mei's trued & mounted; one offcut in scrap); Hagrid's forest map; carving index; gold unicorn hair; near-empty grafting-tar jar; Hexfield notebook; Cass's Dark Mark sketch; Salve of Memory; Mei's note (*Gwenllian ferch Rhydderch*); spent carry-basket.

## User

[[are we on step 2? if so...]] *"**Two — the void.** Bore the core-channel down the exact centre of the axis — the hollow the core will hang in. Pilot first, then ream true. A wandering bore ruins everything that follows." and the pages I found '2 — the void · *The Lathe and the Living Grain*, "Boring on the Axis" — pilot first, then ream true.'"  "so we start small and then increase in size rather than trying to just jumpt to what we want"

## User

these were the instructions the board gave me... this cant be exactly right because there would be a hole in the end of the wand, which really needs to be threaded with a fisheye hook... but proceed however]]

## Narrator

[[Yes — Step 2, the void. And your catch is right: a literal straight bore down the axis would punch clean out the tip, but on the aether-slung the tip is the front *anchor* (the fisheye-hook catch), not an opening — so the bore has to stop short and leave that end solid to cut the hook into later. I'll let Mei flag it in-scene rather than have it come from nowhere. Proceeding.]]

▼ **Saturday, 17 September 1977 — 10:48**
*Room of Requirement workshop*

They set to the boring. Pilot first: Mei chucked a narrow bit to her trued centre and eased it in slow down the axis, sighting as she went — a clean small hole, running dead-true. "Pilot's straight. Now I open it to the core's gauge—"

She reached for the reamer, then stopped, the bit poised over the hole, and read the line again.

"This is written for a plain stick." She looked up. "*Bore down the exact centre.* If I run it clean through, I come out the *tip* — and our tip's meant to catch the core's front, not gape at it. Hole there, and the core's got nothing to anchor into." A half-second's thought. "So it's a stopped bore. Ream true down the handle, then stop short and leave that last nub solid — that's where the fisheye hook gets cut, later on. Punch through and you've wrecked the anchor before you've made it."

She took the reamer down to depth and stopped clean shy of the end. "There. True the whole way, solid tip left to work." A glance at his lathe. "Yours stops short too. Don't chase it out the end just because the page didn't think to say not to."

[Tracker] Working Step 2 ("the void") of the aether-slung tririb practice carve, both at their lathes. Method per Caleb's read — *pilot first, then ream* (small true bore, then opened to core gauge), honoring "start small then increase." Mei caught that the board's generic step ("bore down the exact centre") would, taken literally, exit the *tip* and destroy the design's tip-anchor — so resolved it to a **stopped bore**: ream true down the handle, stop short of the tip, leave a solid nub to cut the fisheye-hook front-anchor into (a later step). Her birch bored true + stopped clean; Caleb to do the same on his. Time ~10:48. Athena on the beam; flask mostly full. [Findings still buffered.]
[Inventory] Cherry wand (ordinary temp); silver-water flask (mostly full); birch practice blanks (now pilot-bored/reamed, stopped short of tip); Hagrid's forest map; carving index; gold unicorn hair; near-empty grafting-tar jar; Hexfield notebook; Cass's Dark Mark sketch; Salve of Memory; Mei's note (*Gwenllian ferch Rhydderch*); spent carry-basket.

## User

This i to possibly give a better idea. we are trying closer to the thick three spiral one.. there is a lot of metalwork and detailwork you can ignore. the fisheye hooks and threaded pommel and threaded end cap look better on the others... if they show the threaded end cap, which it should be.. I did the reading of the books hoping to help us and save time... here is all that if you want to pull and correct for this newer design.. you can ignore design 1 for now.."He let the cauldrons sit and asked. The far wall answered: two sconces guttered to life and his plates rose into the lamplight between them, mounted and squared as though they'd hung there a hundred years — *Interleaved Wand* on the left, *Aether-Slung* on the right, a fixture of the room now. Below, a shelf pushed out three books that had not been there: *Timber and the True Edge*, *The Lathe and the Living Grain*, and a slim one, *Small Works: On Carving What Will Be Held.* And beside them a slate, blank, that began to draw its own chalk lines as he looked at it — taking the left-hand plate and breaking it down.
The marks resolved into a sequence, the carving only, the magic left out of it:
**One — the blank.** A straight-grained billet, over length and width. Centre marked dead-true on both ends, mounted between centres. Everything hangs off that axis; let it wander and no disc will ever seat clean.
**Two — the body.** Rough to round, then down to the wand's lasting profile — the part that never changes. The tip-ward third stays fat for now.
**Three — the taper.** Mark the seats along that third. Turn each down to its own diameter, largest near the body, smallest near the tip, one smooth slope. That slope is the whole trick: a disc rides down until its bore meets its matching diameter, and there it stops.
**Four — the tip.** Part a separate tip. Cut a male thread on the shaft's very end with the screw-box; tap the tip to take it. It screws home and traps the stack.
**Five — the discs.** A ring of each material, trued outside, then bored through the centre to its appointed width — widest seats first, narrowest last. Wood and bone you turn and bore; the rest are shaped their own ways and bored to match.
**Six — fit and finish.** Slide each to its stop; the taper's gentle squeeze holds it, no glue. Tip on. Wax the wood that stays — leave the seats bare, or you kill the grip.      The slate wiped itself and turned to the right-hand plate — the open-ribbed thing, the core hung naked in its cage — and the chalk began again, slower this time, as though even the Room found this one harder.
**One — the blank.** Dense, dead-straight grain; strength matters here more than anywhere, because most of the wood comes away and a cage is what's left. Mark the centreline and the rib pattern: three or four ribs running the length, or a clean spiral for the turning variant.
**Two — the void.** Bore the core-channel down the exact centre of the axis — the hollow the core will hang in. Pilot first, then ream true. A wandering bore ruins everything that follows.
**Three — the windows.** Pierce the long openings between the ribs, working from the outside in to meet the bore, leaving the ribs standing. Small passes. This is fretwork at the scale of a wand, and the most delicate cut on either wall.
**Four — the ribs.** Carve each to even section, fair the run of them — or the spiral — relieve the inner faces. Light as you dare, and no lighter; the cage still has to hold.
**Five — the fittings.** Turn the collars, the bands, the rings that carry the stabilizers, the focus tip, the tuning collar — each bored to ride the ribbed body at its station.
**Six — seat and cap.** Cut the seats, fit the rings down the open length, cap with the tip and collar. Bare bore, trued.     **Design 1 — the disc wand**
1 — the blank · *Timber and the True Edge*, "Choosing the Stick" and "The Run of the Grain" for straight stock; "Centres and Truth" for marking dead-true; mounting in *Lathe*, "Mounting and Roughing."
2 — the body · *The Lathe and the Living Grain*, "Mounting and Roughing," then "The Body Profile."
3 — the taper · *The Lathe and the Living Grain*, "The True Taper," with "Sizing to a Number" to hit each seat's diameter.
4 — the tip · *Small Works: On Carving What Will Be Held*, "Threads and Fittings" — the screw-box, the tap, the tip cut from the wand's own end.
5 — the discs · *The Lathe and the Living Grain*, "Sizing to a Number" and "Boring on the Axis"; *Timber*, "Bone, Horn, and Other Stock" for the rings that aren't wood.
6 — fit and finish · *Small Works: On Carving What Will Be Held*, "Seating and Fit" and "The Last Hand"; *Timber*, "Sealing the Lasting Wood" for the rule — wax the wood that stays, leave the seats bare.
**Design 2 — the open-rib wand**
1 — the blank · *Timber and the True Edge*, "Choosing the Stick" and "The Run of the Grain," read hard this time for density and dead-straight grain; strength is everything when most of the wood comes away.
2 — the void · *The Lathe and the Living Grain*, "Boring on the Axis" — pilot first, then ream true.
3 — the windows · *Small Works: On Carving What Will Be Held*, "Piercing and the Standing Rib." The most delicate cut on either wall; small passes.
4 — the ribs · *Small Works: On Carving What Will Be Held*, "Fairing the Rib" — even section, inner faces relieved, light as you dare.
5 — the fittings · *The Lathe and the Living Grain*, "Collars, Bands, and Rings," each bored to ride its station per "Boring on the Axis."
6 — seat and cap · *Small Works: On Carving What Will Be Held*, "Seating and Fit" and "The Last Hand"; bare bore, trued.      """

## Narrator

[[Locked: practice target is the thick three-spiral body from plate No. 53–XII–D (the TriRib Helical Bulwark) built the *no-metal* way — wood-on-wood threaded pommel and threaded tapered tip, wooden fisheye hooks anchoring the core inside those caps, all the rune-rings/collars/stabilizers ignored. Working the Design-2 step sequence you pulled (ignoring Design 1). That also means I owe you a clean fix to last beat — Mei's "solid tip" read was the *other* variant. Correcting it in-scene now.]]

▼ **Saturday, 17 September 1977 — 10:51**
*Room of Requirement workshop*

Mei glanced up at the plate on the wall — the thick three-spiral one, lamplit between its sconces — and stopped with the reamer still in the hole.

"...I had that wrong a minute ago." Plainly, already fixing it. "Look at the tip on the plate. It's not solid — it's a separate cap that *threads on,* and so's the pommel. The hooks aren't cut into the body at all. There's a little fisheye in each cap, and the core loops onto those." She tilted her birch so he could sight down the bore. "So I don't stop short and leave a nub. I run the channel clean *through* — open at both ends. The hole at the end isn't a mistake; that end gets threaded later to take the cap."

She set the reamer to it and took it true down the full axis and out the far end. "There. Through-bored, both ends open, dead-straight." A nod at his lathe. "Pilot yours through, then ream — and don't flinch when you break out the tip. You're meant to."

[Tracker] CORRECTION (clean, acknowledged): last beat's "stopped bore / solid integral tip" was the Solid-Tip-Anchor variant — wrong for our build. With the plates now the on-wall reference, design target locked = **TriRib Helical Bulwark body (thick three-spiral, plate 53–XII–D) built the no-metal way**: wood-on-wood threaded detachable pommel + threaded tapered tip, wooden fisheye-hook core anchors *inside the caps* (not the body), all metalwork (rune-rings/collars/stabilizers) ignored. Working the Design-2 sequence. Step 2 (the void) redone correctly: **through-bore down the full axis, open at BOTH ends** (end-holes are correct — both ends get threaded later for the caps). Mei's birch through-bored true; Caleb to pilot-then-ream his the same. Rib pattern = three-start spiral, to be marked before Step 3 (the windows). Time ~10:51. Athena on the beam; flask mostly full. [Findings still buffered.]
[Inventory] Cherry wand (ordinary temp); silver-water flask (mostly full); birch practice blanks (Mei's now through-bored both ends; Caleb's centred, awaiting bore); Hagrid's forest map; carving index; gold unicorn hair; near-empty grafting-tar jar; Hexfield notebook; Cass's Dark Mark sketch; Salve of Memory; Mei's note (*Gwenllian ferch Rhydderch*); spent carry-basket.

## User

*pilot*

## Narrator

▼ **Saturday, 17 September 1977 — 10:53**
*Room of Requirement workshop*

Caleb set the narrow bit to his centre-mark and eased it in slow — light pressure, letting the bit find the dead-true point he'd marked rather than forcing it. The birch took it clean, a fine hole opening down the axis, pale dust curling out around the shank. He sighted as he went, the way she had, keeping the bit running true to the line and not letting it drift.

It ran straight, and it broke out the far end where it should — a small clean exit dead on the tip-centre, no wander, both ends open.

Mei leaned in and sighted down it against the light, one eye shut. "Straight through. Tip-centre's dead on." She straightened, and the dry came back, warm. "Two good sticks in a row. The Room's gone soft on you." A nod at the reamer in its rack. "Pilot's true, so the ream'll follow it. Open it out to the core's gauge — slow, same as the pilot — and that's the void done on yours too."

[Tracker] Caleb piloted his birch blank for Step 2 (the void): eased a narrow bit down the dead-true centre under light pressure, sighting to keep it on-axis — ran straight and broke out clean at tip-centre, both ends open (correct for the no-metal threaded-cap build). Mei cross-checked: pilot is true and dead-on. Next: ream the pilot out to the core's gauge (slow) to finish the through-bore on Caleb's stick → both blanks ready to mark the three-start spiral / move to Step 3 (the windows). Time ~10:53. Athena on the beam; flask mostly full. [Findings still buffered.]
[Inventory] Cherry wand (ordinary temp); silver-water flask (mostly full); birch practice blanks (Mei's through-bored both ends; Caleb's now piloted through, awaiting ream); Hagrid's forest map; carving index; gold unicorn hair; near-empty grafting-tar jar; Hexfield notebook; Cass's Dark Mark sketch; Salve of Memory; Mei's note (*Gwenllian ferch Rhydderch*); spent carry-basket.

## User

*drill to core's guage*

## Narrator

▼ **Saturday, 17 September 1977 — 10:55**
*Room of Requirement workshop*

He swapped the pilot bit for the reamer at the core's gauge and took it down slow, following the true hole the pilot had left — letting the channel guide the wider cut rather than fighting it. The birch opened up around the bore, dust feathering out pale, the reamer running steady down the line and out the far end without a catch. Through, and trued, both mouths clean.

Mei caught his blank up alongside hers and held the two together to the light, sighting both bores at once. "Matched. Same gauge, both straight." She set them down on the bench between the lathes, side by side — two pale birch tubes now, open end to end. "That's the void done on both."

She tapped the plate on the wall, the thick three-spiral one in its lamplight. "Next is the part that makes it *this* wand instead of a stick with a hole in it." Her finger traced the helix on the elevation. "We mark the spiral down each blank before we cut a single window — three ribs, turning. Get the layout wrong here and the whole cage runs crooked." A glance over. "Do you want to step the spiral off by eye, or shall I work out the rise properly so the three starts come out even?"

[Tracker] Caleb reamed his pilot out to the core's gauge (Step 2, the void) — followed the true pilot hole, ran the wider bore clean through and out the far end; through-bored and trued, both ends open. Mei cross-checked both blanks against the light: matched gauge, both dead-straight. **Step 2 now complete on both practice sticks.** Moving toward Step 3 (the windows), which first requires marking the layout — a three-start spiral (three turning ribs) down each blank per plate 53–XII–D. Open decision for Caleb: step the spiral off by eye, or have Mei calculate the rise so the three starts come out even. Time ~10:55. Athena on the beam; flask mostly full. [Findings still buffered.]
[Inventory] Cherry wand (ordinary temp); silver-water flask (mostly full); birch practice blanks (both now through-bored & trued, ends open, awaiting spiral layout); Hagrid's forest map; carving index; gold unicorn hair; near-empty grafting-tar jar; Hexfield notebook; Cass's Dark Mark sketch; Salve of Memory; Mei's note (*Gwenllian ferch Rhydderch*); spent carry-basket.

## User

"if you know what you are doing, then by all means, please do"

## Narrator

▼ **Saturday, 17 September 1977 — 10:59**
*Room of Requirement workshop*

She did know. She took a strip of parchment, wrapped it once round the blank and pinched where it lapped — "that's your circumference, near enough" — laid it flat on the bench and stepped it into three with the dividers, three pricks even along the edge. Then she thought a moment about the plate, the look of the turn on it. "Call it two full turns over the rib length. So the strip climbs one circumference per half-length, twice."

She ruled three parallel diagonals off the three pricks, all the same slope, wrapped the strip back round the birch, and ran her scribe along each edge as it spiralled — three fine lines climbing the blank, evenly spaced, evenly pitched, meeting nothing and crossing nothing. "Those three are the *ribs* — the wood that stays. The bands between them are the windows. Pierce the bands, leave the lines standing." She turned the blank slow under the light, checking the three climbed true and parallel all the way up. They did.

She set it in front of him. "Laid out. That's the cage drawn." A nod at the rack. "Now the windows — and that's the delicate one. Do you want first cut, or shall I?"

[Tracker] Mei laid out the three-start spiral on her birch blank (toward Step 3): measured circumference with a wrapped parchment strip, divided into three even start-points with dividers, set a pitch of ~two full turns over the rib length, ruled three matched diagonals and scribed them as helices onto the blank — three evenly-spaced, evenly-pitched rib centrelines (the wood that stays); the bands between are the windows to be pierced. Verified the three run true/parallel the full length. **Spiral layout done (on Mei's blank).** Next is Step 3 proper — piercing the windows between the ribs (the most delicate cut; small passes, outside-in to meet the bore, ribs left standing). Open to Caleb: take first window cut himself, or have Mei start; Caleb's blank still needs its spiral marked too. Time ~10:59. Athena on the beam; flask mostly full. [Findings still buffered.]
[Inventory] Cherry wand (ordinary temp); silver-water flask (mostly full); birch practice blanks (Mei's through-bored + spiral-scribed, ready to pierce; Caleb's through-bored, awaiting spiral layout); Hagrid's forest map; carving index; gold unicorn hair; near-empty grafting-tar jar; Hexfield notebook; Cass's Dark Mark sketch; Salve of Memory; Mei's note (*Gwenllian ferch Rhydderch*); spent carry-basket.

## User

"chisels or what does the book say? should we press some shallow drill holes? or how do we go about it?"

## Narrator

▼ **Saturday, 17 September 1977 — 11:03**
*Room of Requirement workshop*

Mei pulled *Small Works* over and found the page — "Piercing and the Standing Rib" — read it down once, finger under the lines. "Both, near enough. You had the right instinct." She tapped the scribed bands on her blank, the windows-to-be between the three rib lines. "It says *define the ends first* — a small stop-hole drilled at each end of every window, so the cut's got somewhere to start and somewhere to stop and can't run on into a rib. Then yes — relieve the waste with a row of shallow holes down the band, or pierce it straight through with the fine saw, working *outside in* to meet the bore." She glanced up. "Then you pare to the line with the small gouges — fair the edge right up to the scribe but never past it. The scribed line is the rib. You stop at it."

She set a fine bit to the first window's end-mark. "Small passes, it keeps saying. Twice." A look across. "Mark your spiral first so you've windows to cut — then we drill the stop-holes together, one window at a time. Want me to take the very first one slow so you can watch the depth before you commit yours?"

[Tracker] Step 3 (the windows) method established from *Small Works*, "Piercing and the Standing Rib," validating Caleb's drill-hole instinct: (1) drill a small **stop-hole at each end of every window** (gives the cut a start/stop, prevents running into a rib); (2) relieve the waste — a row of shallow holes down the band *or* pierce through with the fine saw — **working outside-in to meet the bore**; (3) **pare to the scribed line** with small gouges, fairing the edge up to but never past the scribe (the line = the standing rib, the wood that stays); small passes throughout. Mei set a fine bit to her first window's end-mark to demo. NEXT/open to Caleb: mark the three-start spiral on *his* blank (still unscribed) so it has windows, then drill stop-holes together one window at a time; Mei offered to take the first window slowly as a depth demo. Time ~11:03. Athena on the beam; flask mostly full. [Findings still buffered.]
[Inventory] Cherry wand (ordinary temp); silver-water flask (mostly full); birch practice blanks (Mei's through-bored + spiral-scribed, about to pierce; Caleb's through-bored, still awaiting spiral layout); chisels/gouges, fine saw, drill bits (workshop tools); Hagrid's forest map; carving index; gold unicorn hair; near-empty grafting-tar jar; Hexfield notebook; Cass's Dark Mark sketch; Salve of Memory; Mei's note (*Gwenllian ferch Rhydderch*); spent carry-basket.

## User

*I draw mine on using her pattern.* "if we go about 1/2 way into it, that should be good, right? maybe a stop can be set on it?"

## Narrator

▼ **Saturday, 17 September 1977 — 11:06**
*Room of Requirement workshop*

Caleb wrapped his strip, stepped his three starts, scribed it — three lines climbing his blank true, same as hers. Two cages drawn.

Then the depth question. Mei tilted her blank and looked down the open bore, shaking her head — but easy, a catch rather than a telling-off. "Not halfway. Think what the window's *for.*" She tapped the hollow centre. "It's already bored. The window goes all the way through the wall to *meet* that — that's the whole point, the core hanging open in the cage. Stop halfway and you've only dented it; there's no opening at all."

She thumbed a little brass collar onto the bit and snugged its screw. "But you're right that it wants a stop — set to the *wall,* not the middle. So it breaks into the bore clean and quits there, instead of carrying on across the hollow and chewing the far side." She spun the bit; the collar rode it. "Now it can't go past the wall. Drill till it kisses the channel and lift." A glance up. "Set yours to match and we'll take the first stop-holes together?"

[Tracker] Caleb scribed the three-start spiral onto his own blank using Mei's method — **both practice blanks now laid out** (ribs + windows marked), ready to pierce. Window-depth resolved (Caleb's "halfway + a stop" instinct half-right, corrected from the page): the windows pierce **all the way through the wall to meet the central bore** (not halfway — the open cage shows the core), but a **depth-stop collar IS used**, set to the *wall thickness* so the bit breaks into the hollow bore and stops without crossing the channel to scar the far side. Mei fitted/set her stop-collar; Caleb to match. NEXT: drill the end stop-holes together, one window at a time (Step 3, the windows). Time ~11:06. Athena on the beam; flask mostly full. [Findings still buffered.]
[Inventory] Cherry wand (ordinary temp); silver-water flask (mostly full); birch practice blanks (both through-bored + spiral-scribed, ready to pierce); chisels/gouges, fine saw, drill + depth-stop collar; Hagrid's forest map; carving index; gold unicorn hair; near-empty grafting-tar jar; Hexfield notebook; Cass's Dark Mark sketch; Salve of Memory; Mei's note (*Gwenllian ferch Rhydderch*); spent carry-basket.

## User

"right, but the bore hole is not that wide at all. you are correct that I was playing it safe but I dont have an idea of how thick to make the ribs, does that make sense? that is probably just aesthetics. but enough to hold up strong.. so just pick a measurement and I will trust you for the rib thickness.

## Narrator

▼ **Saturday, 17 September 1977 — 11:09**
*Room of Requirement workshop*

"Makes sense, and you've half-answered it yourself." Mei held her blank up and tapped the wall between bore and surface. "The bore's narrow, so this wall's *thick* — and that thickness is the rib's depth. That part's not a choice, it's just however much wood sits between the hole and the outside, and on this it's plenty. Sturdy before we start." She turned it. "What you're actually picking isn't thickness. It's *width* — how fat each of the three ribs sits round the curve, against how wide the gaps are."

She set the dividers, considering the plate. "It's the *bulwark* cut. Stout's the whole point of it — strength over showing the core off. So the ribs win." She stepped the circumference into six and gave the standing wood the bigger share of each pair, scribing a second line just inside each rib so every window sat a touch narrower than the rib beside it. "There. Ribs fat, windows lean. It'll hold."

She set it in front of him to copy. "Mark yours to match — then stop-holes, together, first window. Ready?"

[Tracker] Rib-sizing resolved (Caleb deferred the measurement to Mei). Key clarification: the rib's *radial depth* = the wall thickness, already fixed and generous because the core-bore is narrow (sturdy by default); the actual design choice is rib **width** around the circumference vs. window width. Per the bulwark variant's strength-first intent, Mei sized **ribs wider than windows** — stepped the circumference into six and gave the standing wood the larger share, scribing inner lines so each window sits a touch narrower than its neighbouring rib. She marked her blank; Caleb to copy the rib/window widths onto his. NEXT: drill the end stop-holes together, first window (Step 3, the windows). Time ~11:09. Athena on the beam; flask mostly full. [Findings still buffered.]
[Inventory] Cherry wand (ordinary temp); silver-water flask (mostly full); birch practice blanks (Mei's bored + spiral-scribed + rib/window widths marked; Caleb's bored + spiral-scribed, awaiting width marks); chisels/gouges, fine saw, drill + depth-stop collar; Hagrid's forest map; carving index; gold unicorn hair; near-empty grafting-tar jar; Hexfield notebook; Cass's Dark Mark sketch; Salve of Memory; Mei's note (*Gwenllian ferch Rhydderch*); spent carry-basket.

## User

"the ribs depth can be a choice though. you can make them any width and any depth. you could have fat ass ribs and barely see the core but they could be shallow or extend all the way to touching the core.. you could make 3 super skinny ones and see a lot of the core and make the depth all the way to touching the core or vegetable peel the ribs from the inside to bring them back away from the core... but I'm going to copy you. so help me do that."

## Narrator

▼ **Saturday, 17 September 1977 — 11:12**
*Room of Requirement workshop*

"You're right — I was lazy with the word." No fuss about it; he had the truth of it, and the page backed him, step four said *relieve the inner faces* in as many words. "Depth's free. The wall's only your *maximum* — under that you can run the rib in to kiss the core, or peel its inner face back so it stands off and the core hangs proud in the gap. Width and depth, both yours."

She marked his blank as she talked — circumference into six, the standing wood the bigger share, an inner scribe so his windows came lean against fat ribs, matched to her stick. "There. Yours reads off mine now."

Then the depth call, since he'd handed it to her. "Bulwark, so we don't go skeletal — but we relieve the inner faces a touch, peel them off the bore so the core shows through and doesn't choke on the wood. Stout ribs, a little daylight behind them." The bit sat ready in her hand. "Matched and marked. First stop-holes — together. Yours or mine first?"

[Tracker] Caleb corrected Mei cleanly (acknowledged): rib **depth IS a free parameter**, not fixed by the wall — the wall thickness is only the *maximum*; ribs can run inward to touch the core-bore, or have their inner faces **relieved/"peeled" back** to stand off the core (matches *Small Works* Step 4, "relieve the inner faces"). Both rib *width* and *depth* are chooseable (aesthetic + strength). Caleb deferred to Mei and copied her layout: she scribed his rib/window widths to match hers (circ ÷ 6, ribs > windows) — **both blanks now fully laid out** (spiral + rib/window widths). Depth treatment chosen for the practice piece: bulwark-stout ribs but inner faces *lightly relieved* so the core shows and isn't choked. NEXT: drill the first window's end stop-holes together (Step 3, the windows); open to Caleb whose blank goes first. Time ~11:12. Athena on the beam; flask mostly full. [Findings still buffered.]
[Inventory] Cherry wand (ordinary temp); silver-water flask (mostly full); birch practice blanks (both through-bored + spiral-scribed + rib/window-width marked, ready to pierce); chisels/gouges, fine saw, drill + depth-stop collar; Hagrid's forest map; carving index; gold unicorn hair; near-empty grafting-tar jar; Hexfield notebook; Cass's Dark Mark sketch; Salve of Memory; Mei's note (*Gwenllian ferch Rhydderch*); spent carry-basket.

## User

"yours. and if we mess up.. so what.. we can do them again. they are going to be beautiful. I know it... and they may not work amazingly.. and they aren't our normal woods... but they'll be ours ours until one day we can do it proper if you want to."

## Narrator

▼ **Saturday, 17 September 1977 — 11:14**
*Room of Requirement workshop*

She didn't answer the speech straight off. She set the stopped bit to the first window's end-mark, braced the blank, and brought it down slow — the collar riding, the bit biting pale dust, then the small clean give as it broke into the bore and the collar kissed the wood and stopped it dead. She lifted. One stop-hole, true, opening into the hollow. The first real cut of the whole thing, and it had gone clean.

Then she looked at him. "*If* I want to." She turned the word over like a flaw she'd found in a billet. "There's no if. You don't get to hand me a *one day, if you want to* on a wand we're boring with our own hands." Quieter, the dry gone out of it. "I'm going to want to do everything proper with you. That was decided a while ago."

A breath, the warmth coming back wry. "Yours next — far end of the same window. Don't let me have done the only clean one."

[Tracker] Caleb gave Mei the first cut and framed the practice pair as *theirs* (birch, not their proper woods, made together — to be done "proper" one day). Mei drilled the **first stop-hole** of Step 3 on her blank: stopped bit set to the wall, brought down slow, broke clean into the central bore, collar arrested it at the wall — true, opening into the hollow (first real window-cut on the whole build). She answered the "if you want to" plainly — there's no *if* for her about a shared future. NEXT: Caleb drills the matching stop-hole at the far end of that same window, then they relieve/pierce the band between (Step 3, the windows). Time ~11:14. Athena on the beam; flask mostly full. [Findings still buffered.]
[Inventory] Cherry wand (ordinary temp); silver-water flask (mostly full); birch practice blanks (Mei's bored + scribed + first stop-hole drilled; Caleb's bored + scribed, ready to drill); chisels/gouges, fine saw, drill + depth-stop collar; Hagrid's forest map; carving index; gold unicorn hair; near-empty grafting-tar jar; Hexfield notebook; Cass's Dark Mark sketch; Salve of Memory; Mei's note (*Gwenllian ferch Rhydderch*); spent carry-basket.

## User

*measure twice cut once take my time ask her to approve drill*

## Narrator

▼ **Saturday, 17 September 1977 — 11:17**
*Room of Requirement workshop*

Caleb set the rule to his blank and measured the far end of the window — once, marking it; then again from the other reference, checking the first mark hadn't lied. The two agreed. He seated the stopped bit, snugged the collar's screw to the same wall-depth Mei had used, and turned the blank under the light, sighting the start-point true before he committed to anything.

Then he held it out to her, bit poised over the mark, not yet biting. The look said it: *check me before I cut.*

Mei leaned in and read it properly — the mark, the collar's set, the angle of the bit to the wall. She thumbed the collar to be sure it was tight, gave the start-point a last sight. "Mark's true. Stop's set to the wall. Angle's square." She sat back. "Measured twice, asked once. That's how you keep ten fingers and a clean window." A nod, warm. "Approved. Slow down, kiss the bore, lift."

[Tracker] Caleb worked the matching stop-hole carefully (measure-twice/cut-once): measured the window's far end from two references till they agreed, set the stopped bit's collar to the same wall-depth as Mei's, sighted the start-point true, then asked Mei to approve before drilling. Mei checked mark/collar-tightness/bit-angle and approved (true, set to the wall, square). Caleb cleared to drill his stop-hole (bring down slow, break into the bore, lift). Both end stop-holes of the first window will then be in — next is relieving/piercing the band between them (outside-in to the bore, ribs left standing), then paring to the scribed line. Step 3 in progress. Time ~11:17. Athena on the beam; flask mostly full. [Findings still buffered.]
[Inventory] Cherry wand (ordinary temp); silver-water flask (mostly full); birch practice blanks (Mei's: first window's near stop-hole drilled; Caleb's: matching stop-hole approved, about to drill); chisels/gouges, fine saw, drill + depth-stop collar; Hagrid's forest map; carving index; gold unicorn hair; near-empty grafting-tar jar; Hexfield notebook; Cass's Dark Mark sketch; Salve of Memory; Mei's note (*Gwenllian ferch Rhydderch*); spent carry-basket.

## User

*kiss the bore and lift*

## Narrator

▼ **Saturday, 17 September 1977 — 11:18**
*Room of Requirement workshop*

He brought it down slow. The collar rode, the bit took pale dust, and then the small clean give — through the wall and into the hollow, the collar kissing the wood and stopping it dead. He lifted. A second stop-hole, true, opening into the bore opposite the first.

Two clean holes now, one at each end of the window, the band of waste between them waiting to come out.

Mei held his blank up beside hers to the light, both first windows pinned at their ends. "Matched. Both true." She set them down between the lathes. "Stop-holes done on the first window, both sticks." A tap of the bit-rack, then the fine saw. "Now we take the waste between — outside in, small passes, down to meet the bore, and we stop a hair shy of the scribe and pare the rest by hand. The line's the rib. We don't touch the line." A glance, warm and steady. "Saw or a row of relief-holes first — your call. We're properly building now."

[Tracker] Caleb drilled his matching far-end stop-hole (slow, broke clean into the bore, collar arrested at the wall, lifted) — **both end stop-holes of the first window now done on both blanks**, true and matched. NEXT (Step 3 cont.): remove the waste band between the stop-holes — outside-in, small passes, down to meet the bore, **stopping a hair shy of the scribed line and paring the rest by hand** (the scribe = the standing rib, never cut). Open to Caleb: clear the waste with the fine saw or a row of relief-holes first. Time ~11:18. Athena on the beam; flask mostly full. [Findings still buffered.]
[Inventory] Cherry wand (ordinary temp); silver-water flask (mostly full); birch practice blanks (both: first window's two end stop-holes drilled, waste band still in); chisels/gouges, fine saw, drill + depth-stop collar; Hagrid's forest map; carving index; gold unicorn hair; near-empty grafting-tar jar; Hexfield notebook; Cass's Dark Mark sketch; Salve of Memory; Mei's note (*Gwenllian ferch Rhydderch*); spent carry-basket.

## User

*do all of the stop holes in mine.* *do all the stop windows on hers.* *cut relief holes in one of her windows so she can be cleaning one out.. then focus on doing all my relief holes in all 3 while she clears out her one reliefed window, then I can start on one of my windows and work through them while she does her other relief holes and finishes her windows... that way we are both working and not waiting.*

## Narrator

▼ **Saturday, 17 September 1977 — 11:34**
*Room of Requirement workshop*

They split the work, and the bench found a rhythm.

Caleb ran the stopped bit down his own blank first — both ends of all three windows, six clean holes breaking into the bore one after another, the collar kissing the wall each time. Then he reached across for hers and did the same on her stick, end-marks paired off true, until both blanks stood pinned at every window-end and not a rib touched.

He set the fine bit to one of her windows and crowded the band with relief-holes — a close row down the waste, each kissing the bore, the wood between them gone to a fragile comb — and slid it to her. She took it without a word and went at the comb with the small gouge, breaking the thin webs and paring out toward the scribe, dust feathering off her bench.

Then his own three. He worked the relief-holes down each window, all nine bands turned to that fragile comb, while beside him she cleared her first window clean — pared to the line, a true open slot in the birch with the bore showing through, the first finished window of the whole build. She blew the dust off it and started relieving her other two.

He set his gouge to his first window. Across the bench, two lathes, two stalled breaths gone — both of them cutting, neither of them waiting.

Mei didn't look up from her paring. "This is better. Nobody standing about being noble." A thin web broke clean under her gouge. "Keep your passes small on that first one. It's the one you'll judge all the rest against."

[Tracker] Parallelized the work to eliminate idle time. Caleb: drilled **all stop-holes on his blank** (both ends ×3 windows) **and all stop-holes on Mei's blank**; then cut **relief-holes in one of Mei's windows** (comb of close holes to the bore) and handed it to her; then drilled **relief-holes in all three of his own windows**. Mei: pared out the relief-combed first window to the scribe — **first fully finished window of the build** (true open slot, bore showing) — and moved on to relieving her other two. Caleb now starting to pare his first window with the gouge. Both working simultaneously (Step 3, the windows, in progress on both sticks). Time ~11:34. Athena on the beam; flask mostly full. [Findings still buffered.]
[Inventory] Cherry wand (ordinary temp); silver-water flask (mostly full); birch practice blanks (Mei's: 1 window finished, 1 relief-holed & being pared, 1 to relieve; Caleb's: all 3 windows stop-holed + relief-holed, paring just begun on #1); chisels/gouges, fine saw, drill + depth-stop collar; Hagrid's forest map; carving index; gold unicorn hair; near-empty grafting-tar jar; Hexfield notebook; Cass's Dark Mark sketch; Salve of Memory; Mei's note (*Gwenllian ferch Rhydderch*); spent carry-basket.

## User

*I trust her and really take my time on the first one and keep working*

## Narrator

▼ **Saturday, 17 September 1977 — 11:48**
*Room of Requirement workshop*

He took the first window slow, the way she'd told him to and the way he meant to anyway. Tiny passes of the small gouge, riding down into the relief-combed band, breaking the thin webs one at a time and lifting the waste out toward the scribe a sliver at a time. Each pass he stopped a hair shy of the line, turned the blank to the light, looked, and went again. When the gouge wanted to chase the grain past the scribe he eased off and came at it from the other direction instead, paring back to the line clean. The slot opened, true, the bore showing pale through it, the rib edges standing crisp and unbroken either side. Slow, and right.

By the time it was clean his hand had the feel of it — how hard to push, where the wood gave, when to stop. The second window went quicker for it. The third quicker still, and just as true.

Beside him Mei worked through her last two without a wasted motion, and somewhere in the quiet they fell into the easy parallel of two people who knew the same job — the small dry scrape of gouges, dust feathering off two benches, Athena drowsing on her beam above.

A long while later Mei set her blank down and stretched her back, and held it up to the light. "...That's all six. Both sticks." She turned his in her other hand beside hers — two pale birch cages now, three spiralling ribs standing crisp around an open core-channel, every window pared true to its line. Not finished — no caps, no taper, no hooks, the wood still raw — but unmistakably the thing on the plate now, in their own hands. "Windows done. The hard cut's behind us." A glance over, warm. "And nobody bled. Look at them, Caleb. Those are *good.*"

[Tracker] Caleb took his first window very slowly (tiny gouge passes, stop-and-sight each pass, pare to but never past the scribe, reverse direction when the grain tried to run) — clean and true, bore showing, ribs crisp; got the feel and did his 2nd and 3rd windows progressively faster and equally true. Mei finished her remaining two in parallel. **Step 3 (the windows) now COMPLETE on both blanks** — two birch three-rib spiral cages, all six windows pared true to the scribe, ribs standing intact (still raw: no caps/taper/hooks/relief-finishing beyond what's done). Next steps remaining on the build: Step 4 (fair the ribs / relieve inner faces), Step 5 (fittings — but metal ignored on the no-metal build; the wood caps), Step 6 (seat & cap — thread the pommel + tapered tip ends, cut the wooden fisheye hooks, fit). Time ~11:48; lunch (Mei's no-skipping rule) approaching. Athena on the beam; flask mostly full. [Findings still buffered.]
[Inventory] Cherry wand (ordinary temp); silver-water flask (mostly full); birch practice wand-blanks ×2 (through-bored, three-rib spiral cages, all 6 windows cut true — raw, unfinished); chisels/gouges, fine saw, drill + depth-stop collar; Hagrid's forest map; carving index; gold unicorn hair; near-empty grafting-tar jar; Hexfield notebook; Cass's Dark Mark sketch; Salve of Memory; Mei's note (*Gwenllian ferch Rhydderch*); spent carry-basket.

## User

"take a break, go to lunch, we rest and come back?" "Athena?"

## Narrator

▼ **Saturday, 17 September 1977 — 11:50**
*Room of Requirement workshop*

"Yes. All of that." Mei was already easing the tension out of her shoulders, setting her gouge down in the rack where it belonged. "We've earned the chair and the food, and the rest of this keeps."

She stood the two raw blanks upright in an empty billet-slot, side by side, safe — the ribs catching the lamplight, the open cores dark between them. "They'll be exactly here when we come back. The Room doesn't lose things." A glance at the cold forge in its corner, then away, fond. "Lunch, a sit-down, and then it's your Hexfield block at two. Plenty of day left for caps and hooks after, if you've the hands for it."

Caleb tipped his head back and called up to the beam.

Athena cracked one eye, considered the request with the full weight of a bird who had already worked one shift today, and then dropped — a soft heavy glide down to his shoulder, talons settling in, a low grumbling churr against his ear that managed to convey both *fine* and *you owe me*. She was, the bond reported, hungry, and entirely aware that the Great Hall had a roof she could perch under and people who dropped things.

[Tracker] Caleb called the workshop session at ~11:50; Mei agreed to break for lunch + rest + return later. The two raw birch practice blanks stood safely in a billet-slot in the RoR workshop (persists for their return). Mei flagged the afternoon shape: lunch → sit-down → **Hexfield weekly block at 14:00**, with caps/hooks/finishing of the wands possible afterward. Athena came down to Caleb's shoulder at his call (put-upon but compliant; hungry, angling for the Great Hall). About to leave for lunch. Flask mostly full. [Findings still buffered — no flush requested.]
[Inventory] Cherry wand (ordinary temp); silver-water flask (mostly full); birch practice wand-blanks ×2 (raw three-rib spiral cages, windows cut — left in the workshop); Hagrid's forest map; carving index; gold unicorn hair; near-empty grafting-tar jar; Hexfield notebook; Cass's Dark Mark sketch; Salve of Memory; Mei's note (*Gwenllian ferch Rhydderch*); spent carry-basket.

## User

*take Mei and Athena*

## Narrator

▼ **Saturday, 17 September 1977 — 12:06**
*Hogwarts — the Great Hall*

The long climb down emptied them out into the lunchtime Hall — warm, loud after the workshop's quiet, the four tables filling with the loose Saturday churn of students who'd been outside all morning and come in hungry. Sun came down through the high windows in broad bars; the enchanted ceiling held a thin blue September sky, a few owls cutting across it on errands of their own. The food was already up the length of the tables, steam off the tureens, and the smell of it hit Caleb properly for the first time in a day and a half.

Athena left his shoulder the moment they were under the roof — a lazy circuit up into the rafters where the other owls dozed, picking a beam with a good sightline over the Ravenclaw table and the dropped crusts to come.

Mei steered them to a clear stretch of bench and sat, finally, with the particular heaviness of someone who'd been on her feet through a forest and a forge-corner both. She pulled a dish toward her and looked at him across it, the dry gone gentle. "Eat. Properly, not three bites and a plan." A beat. "You've not actually stopped moving since Tuesday, you know."

[Tracker] Caleb, Mei, and Athena came down to the Great Hall for Saturday lunch (~12:06). Hall busy/warm, food up, enchanted ceiling clear blue; Athena went up to the rafters (hungry, watching for scraps — not on errand). No mail beat (not breakfast; nothing due). Mei sat them down and pressed Caleb to actually eat and rest, noting he's not stopped since Tuesday. Quiet recovery beat; Hexfield block still at 14:00. Flask mostly full. [Findings still buffered.]
[Inventory] Cherry wand (ordinary temp); silver-water flask (mostly full); birch practice wand-blanks ×2 (raw, left in the RoR workshop); Hagrid's forest map; carving index; gold unicorn hair; near-empty grafting-tar jar; Hexfield notebook; Cass's Dark Mark sketch; Salve of Memory; Mei's note (*Gwenllian ferch Rhydderch*); spent carry-basket.

## User

"...AAAHHHH!..... sorry... I dozed off.. where are we?" *eat eat eat*

## Narrator

▼ **Saturday, 17 September 1977 — 12:14**
*Hogwarts — the Great Hall*

A few heads down the table turned at the yell, then went back to their plates — it was a Saturday, somebody shouting wasn't news.

Mei didn't startle. She just pushed the nearer dish another inch toward him, mouth twitching. "Great Hall. Lunch. You're upright, you're whole, the unicorn's fine, the wands are safe in the Room, and you've been asleep for roughly ninety seconds with your chin nearly in the potatoes." She said it like a list read off to settle him, because it was. "Nothing's on fire. You just stopped for the first time in three days and your body took the opening."

Caleb ate. Properly this time — steak-and-kidney, a heap of potato, bread, the lot, the kind of hungry that only lands once you sit down. It was good, and warm, and his.

Athena, sensing food finally in motion below, dropped from her beam to the table's edge by his elbow and gave him a pointed look over the wreckage of a roll someone had abandoned.

Mei watched him put it away and the worry eased out of her by degrees. "There he is." She nudged a jug toward him. "Drink something too. We've got till two before the field, and I'd like you to spend at least some of it not vibrating."

[Tracker] Caleb dozed off ~90 seconds at the lunch table and woke with a start; Mei grounded him with a calm orientation list (Great Hall, lunch, all's well, wands safe, unicorn fine) — no real alarm. Caleb now eating properly (much-needed; first real stop since Tuesday). Athena down at the table edge angling for food. Quiet recovery beat; ~12:14, Hexfield block at 14:00. No state change beyond time. Flask mostly full. [Findings still buffered.]
[Inventory] Cherry wand (ordinary temp); silver-water flask (mostly full); birch practice wand-blanks ×2 (raw, in the RoR workshop); Hagrid's forest map; carving index; gold unicorn hair; near-empty grafting-tar jar; Hexfield notebook; Cass's Dark Mark sketch; Salve of Memory; Mei's note (*Gwenllian ferch Rhydderch*); spent carry-basket.

## User

*give athena steak and kidney*

## Narrator

▼ **Saturday, 17 September 1977 — 12:16**
*Hogwarts — the Great Hall*

Caleb forked a good chunk of steak-and-kidney off his plate, let the gravy drip a moment so it wouldn't scald her, and set it down on the bench-edge in front of Athena.

She fell on it with the focused dignity of an owl who considered this no more than her due. The kidney went first — she liked the offal, always had — torn into beak-sized pieces and bolted, the steak after it, her talons pinning the bench while she worked. Down the bond came something warm and grudging and full: the mice forgiven, the early shift retroactively reclassified as worthwhile, Caleb upgraded from *you owe me* to *acceptable.*

Mei watched the small carnage with open fondness. "She holds a grudge like her wizard and drops it for meat like her wizard." She tore a bit of her own bread for nothing in particular. "Six mice and a forest patrol, and steak-and-kidney squares the account. Cheap, in the end."

Athena clicked her beak clean, fluffed, and resettled by his elbow — fed, mollified, in no hurry now to go anywhere with a roof this good overhead.

[Tracker] Caleb fed Athena a portion of steak-and-kidney at the table (cooled first); she ate happily (kidney first), and via the bond her earlier put-upon grudge (the six mice + the forest scout shift) resolved to content/forgiven. Warm recovery beat; Athena settled fed at his elbow. ~12:16, Hexfield block at 14:00. No state change beyond time. Flask mostly full. [Findings still buffered.]
[Inventory] Cherry wand (ordinary temp); silver-water flask (mostly full); birch practice wand-blanks ×2 (raw, in the RoR workshop); Hagrid's forest map; carving index; gold unicorn hair; near-empty grafting-tar jar; Hexfield notebook; Cass's Dark Mark sketch; Salve of Memory; Mei's note (*Gwenllian ferch Rhydderch*); spent carry-basket.

## User

"I gave her six mice. I dont know why she is complaining. a box. I literally gave her a box of mice."

## Narrator

▼ **Saturday, 17 September 1977 — 12:17**
*Hogwarts — the Great Hall*

Athena turned one round eye on him at the word *box*, and the bond went flat with the particular indignation of an owl who felt deeply misrepresented.

Mei caught the look and translated, deadpan, buttering bread. "She says the mice were *logistics*, not a gift. You handed her a box and made her do the work — find them, flush them, kill them. That's a hunting *assignment*, Caleb, not a present." A bit of crust off to the side, which Athena accepted as tribute. "The steak-and-kidney just now, though — that arrived dead, warm, and gravied, requiring nothing of her but the swallowing. *That's* a gift." She took a bite. "You gave her a chore in a box and called it generosity. No wonder she filed a complaint."

Athena gave a single low, vindicated churr, and went back to grooming a wing with the air of a creature whose grievance had finally been entered into the record correctly.

[Tracker] Comic beat — Caleb protests he gave Athena "a box of mice"; Mei (reading the bond) reframes it: the box of live mice was a hunting *assignment* (work — find/flush/kill), whereas the cooked steak-and-kidney is the actual *gift* (arrived dead, warm, effortless). Athena vindicated. Warm recovery/rest beat continues; ~12:17, Hexfield at 14:00. No state change beyond time. Flask mostly full. [Findings still buffered.]
[Inventory] Cherry wand (ordinary temp); silver-water flask (mostly full); birch practice wand-blanks ×2 (raw, in the RoR workshop); Hagrid's forest map; carving index; gold unicorn hair; near-empty grafting-tar jar; Hexfield notebook; Cass's Dark Mark sketch; Salve of Memory; Mei's note (*Gwenllian ferch Rhydderch*); spent carry-basket.

## User

*I get Athena on my finger and try to cast "Protego" with her loudly, then set her on the table and give her more steak.* *eat eat eat*

## Narrator

▼ **Saturday, 17 September 1977 — 12:20**
*Hogwarts — the Great Hall*

He set the fork down and took Athena up again — bare-handed, no cherry anywhere near it this time — held her out from him the way he'd hold a wand, and willed it *through* her. *Protego.* Pushed the shape of it down the bond the way he'd pushed it into Mei that morning, the whole protective want of it aimed out through the owl.

The want crossed. He felt it land in her — the full surge of his will breaking over her down the bond — and she reacted the way any creature would to a thing shoved suddenly into it: wings half-mantled, feathers up, a sharp affronted churr, talons clamping his finger hard enough to mean it.

But nothing came. No dome, no light, no shield. The feeling had somewhere to go — into her — and the magic had nowhere; it stopped at the edge of him with no instrument to run out through.

Mei had gone still, watching, and let a slow breath out when nothing bloomed. Quiet: "...Same as this morning. With me, and my wand." She didn't make it bigger than it was. "It carries what you *feel*. Every time. Not the *doing.*" A beat, careful, not shutting the door. "...Not yet, anyway. Not like this."

Athena shook her feathers down and fixed him with a look of pure betrayal.

[Tracker] Caleb attempted Protego with **no wand**, trying to channel the cast *through Athena as a focus* (parallel to the morning's through-Mei bond-cast test). Consistent result: the protective **intent crossed the familiar bond** vividly (Athena felt the surge and reacted — mantled, affronted, clamped his finger), but **no cast manifested** (no shield/light) — a living familiar is not an instrument; the bond carries *feeling*, not *casting*. Reinforces the morning finding ("a wand answers its own hand"); whether the bond could *ever* channel a cast left open ("not yet… not like this"). ~12:20, lunch. [Bond-cast/anomaly cluster — still buffered.]
[Inventory] Cherry wand (ordinary temp); silver-water flask (mostly full); birch practice wand-blanks ×2 (raw, in the RoR workshop); Hagrid's forest map; carving index; gold unicorn hair; near-empty grafting-tar jar; Hexfield notebook; Cass's Dark Mark sketch; Salve of Memory; Mei's note (*Gwenllian ferch Rhydderch*); spent carry-basket.

## User

*I pick up one of her feathers and eat it*

## Narrator

▼ **Saturday, 17 September 1977 — 12:21**
*Hogwarts — the Great Hall*

A loose feather had come down in the fuss — a soft barred one off her flank, drifting onto the table by his plate. Caleb picked it up, looked at it a second, and put it in his mouth.

It was a feather. It tasted of owl and dust and the faint clean nothing of keratin, the vane catching dry on his tongue, the quill a thin hard rib of it. He chewed once, found it exactly as unpleasant and pointless as a feather is, and got it back out of his mouth with two fingers, a little damp now and bent.

Nothing happened. No spark, no warmth, no shift down the bond — just a man who had eaten part of a feather in the Great Hall for no reason either of them could name.

Athena stared at him with frank, mantled horror — wizard eats own familiar's *plumage* — and edged a deliberate inch down the table away from him.

Mei set her cup down very slowly. A long, level look. "...I'm not going to ask." A beat. "I'm going to let you have that one entirely to yourself, and I'm going to eat my lunch, and we are never telling Liri." She picked her fork back up. "Eat your *food*, Caleb. The kind that isn't part of your owl."

[Tracker] Caleb ate one of Athena's moulted flank feathers at the table — purely a feather (tasted of keratin/dust, unpleasant), no magical effect, no bond response; removed it, damp/bent. Athena appalled, edged away. Mei declined to engage beyond dry resignation ("never telling Liri"). Comic beat; no state change beyond time. ~12:21, lunch; Hexfield at 14:00. Flask mostly full. [Findings still buffered.]
[Inventory] Cherry wand (ordinary temp); silver-water flask (mostly full); birch practice wand-blanks ×2 (raw, in the RoR workshop); Hagrid's forest map; carving index; gold unicorn hair; near-empty grafting-tar jar; Hexfield notebook; Cass's Dark Mark sketch; Salve of Memory; Mei's note (*Gwenllian ferch Rhydderch*); spent carry-basket.

## User

*eat eat finish eating*

## Narrator

▼ **Saturday, 17 September 1977 — 12:31**
*Hogwarts — the Great Hall*

He ate, and for a while there was nothing to do but that. The plate emptied — meat, potato, bread, a second helping he hadn't meant to take and finished anyway — and somewhere in the middle of it the gnawing two-day hollowness in him quietly filled and went still. The Hall churned on around them, the warm ordinary noise of it, sun moving slow across the tables.

Athena forgave him by degrees, as she always did, and came back to his elbow for a last bit of steak once it was clear no more of her was going to be eaten.

Mei finished her own and pushed the plate back, and the morning's worry had gone right out of her now that she'd watched him put away a proper meal. She had that easy, settled look. "Better. You've colour back." She wiped her hands. "It's half twelve. We've an hour and a half before the field." A glance over, unhurried. "What do you want with it — back up to the wands, or sit here a bit longer and let the food land first?"

[Tracker] Caleb finished a full proper lunch (much-needed after ~2 days running on empty) — recovered, settled, colour back per Mei. Athena fed and mollified at his elbow. ~12:31; ~90 min until the Hexfield block at 14:00. Mei put the open choice to Caleb: return to the workshop wands, or rest at the table longer before the field. No state change beyond time. Flask mostly full. [Findings still buffered.]
[Inventory] Cherry wand (ordinary temp); silver-water flask (mostly full); birch practice wand-blanks ×2 (raw, in the RoR workshop); Hagrid's forest map; carving index; gold unicorn hair; near-empty grafting-tar jar; Hexfield notebook; Cass's Dark Mark sketch; Salve of Memory; Mei's note (*Gwenllian ferch Rhydderch*); spent carry-basket.

## User

*take the feather* "we can sit when we're dead. pain is weakness leaving the body." *Athena onto shoulder* *up to workshop with Mei*

## Narrator

▼ **Saturday, 17 September 1977 — 12:33**
*Hogwarts — leaving the Great Hall*

"You're a deranged man and I'm marrying you anyway." Mei said it climbing off the bench, no heat in it, only the worn fondness of someone who'd heard *pain is weakness leaving the body* applied to a man who'd fainted in a forest two days prior and was now quoting it over kidney pie.

Caleb pocketed the bent, damp feather. Athena, watching the feather she had only just made peace with go *into his robes* rather than back to her, gave an affronted churr — but she stepped up onto his offered shoulder regardless, talons settling, and rode him toward the doors.

Out of the warm Hall noise, up the moving stairs, the long climb back to the seventh floor — Barnabas and his battered trolls on the one wall, the bare stretch opposite. Three passes, and the workshop door cut itself back into the stone exactly as they'd left it: the two raw birch cages standing patient in their slot, the cold forge in its corner, the wood and the benches and the dry warm air. Athena lifted off to her beam. The afternoon, and the caps and the hooks, waiting.

Mei rolled her sleeves back. "Right. Fed, rested, and only mildly unhinged." She pulled her stool round to the bench. "Where do you want to pick it up — Step four, fairing the ribs? Or do you want to jump to the caps and hooks, the part that makes them actually hold a core?"

[Tracker] Caleb pocketed the eaten feather (Athena affronted), took Athena onto his shoulder, and returned with Mei from the Great Hall up to the 7th-floor Room of Requirement workshop (~12:33) — reopened to the same state, the two raw birch practice cages safe in their slot, forge in the corner. Athena to her beam. Recovery/lunch break over; resuming the wand-carve with ~1.5 hrs until the 14:00 Hexfield block. Mei put the next-step choice to Caleb: Step 4 (fair the ribs / relieve inner faces) or skip to the caps + wooden fisheye hooks (Step 6 — what lets it hold a core). Flask mostly full. [Findings still buffered.]
[Inventory] Cherry wand (ordinary temp); silver-water flask (mostly full); birch practice wand-blanks ×2 (raw three-rib spiral cages, windows cut); eaten owl feather (bent, damp — in pocket); Hagrid's forest map; carving index; gold unicorn hair; near-empty grafting-tar jar; Hexfield notebook; Cass's Dark Mark sketch; Salve of Memory; Mei's note (*Gwenllian ferch Rhydderch*); spent carry-basket.

## User

"I hate to say it... fairing... I dont even know what that means... let's fair.  I will get excited and be done"

## Narrator

▼ **Saturday, 17 September 1977 — 12:38**
*Room of Requirement workshop*

"Fairing just means making the run of a thing smooth and even — no lumps, no thin spots, every rib the same and the curve clean." Mei pulled *Small Works* over to the page — "Fairing the Rib" — and read it down for him. "Three jobs. Even the *section* — each rib the same thickness all the way along, none fat here and starved there. Fair the *run* — the spiral fluid, no kinks where your gouge changed its mind. And relieve the *inner faces* — that's the peel-back you wanted, paring the underside of each rib off the core a touch so it stands proud."

She took up the smallest gouge and a curl of fine glasspaper. "Light is the whole rule. The cage already holds — we're refining it, not carving it. Take too much and a rib goes weak or breaks." She ran the gouge feather-light down one of her own ribs, a whisper of a pass, and a hair-thin ribbon lifted off. "Like that. Off the high spots only. Then glasspaper to carry it smooth." She nudged the second gouge toward him. "Start on your middle rib — easiest to reach, hardest to ruin. Whisper passes. I'll watch your first three and call you off if you're going heavy."

[Tracker] Step 4 (fairing the ribs) explained + begun. Fairing = smoothing/evening the ribs three ways per *Small Works* "Fairing the Rib": (1) even **section** (each rib uniform thickness along its length), (2) fair the **run** (fluid spiral, no kinks), (3) relieve the **inner faces** (pare each rib's underside off the core so it stands proud — the "peel-back" Caleb wanted). Governing rule: **very light passes** — the cage already holds; this refines, and overcutting weakens/breaks a rib. Mei demoed a feather-light gouge pass + glasspaper on her own rib; directed Caleb to start on his middle rib with whisper passes, she'll watch his first three for heaviness. ~12:38; Hexfield at 14:00. Flask mostly full. [Findings still buffered.]
[Inventory] Cherry wand (ordinary temp); silver-water flask (mostly full); birch practice wand-blanks ×2 (raw spiral cages, windows cut — now fairing); fine gouges + glasspaper; eaten owl feather (in pocket); Hagrid's forest map; carving index; gold unicorn hair; near-empty grafting-tar jar; Hexfield notebook; Cass's Dark Mark sketch; Salve of Memory; Mei's note (*Gwenllian ferch Rhydderch*); spent carry-basket.

## User

"arent all 3 ribs the same? they are helices that run around each other?" *I match whaetever she is doing.*

## Narrator

▼ **Saturday, 17 September 1977 — 12:42**
*Room of Requirement workshop*

"They are — same wood, same cut, three identical helices winding round each other. You're right." Mei kept her gouge moving feather-light as she said it, not looking up. "But *identical by design* and *identical once your hands have been at them* aren't the same thing. You bored three windows freehand. One rib's a hair fatter where the gouge bit deep, one's got a flat spot where the grain fought you. Fairing is just making them actually match what they're *supposed* to be — bringing the three back into true with each other so the spiral reads clean."

Caleb fell in beside her, matching her: the same whisper passes, gouge laid almost flat, lifting hair-thin ribbons off the high spots only, then the glasspaper carrying it smooth. He worked his middle rib down its run, turning the blank slow, taking off the little he'd left proud. Where she relieved an inner face he relieved his to match, paring the underside back off the core so the rib stood proud and the channel showed clean between.

She glanced over at his third pass and didn't call him off. "Good hands. Light. That's it exactly." She went back to her own. "Keep going round — all three, then we check them against each other and even out whatever's still off."

[Tracker] Caleb's logic acknowledged (the three ribs *are* identical helices by design); Mei's clarification — they need fairing because freehand cutting left small inconsistencies (a rib fatter here, a flat spot there), so fairing brings the three back into true *with each other* for a clean spiral. Caleb matched Mei's technique: feather-light near-flat gouge passes off the high spots, glasspaper to smooth, inner faces relieved to match (rib stands proud, core-channel clean). Mei approved his touch (light, good hands). Working through all three ribs, then cross-checking the blanks. Step 4 (fairing) in progress on both. ~12:42; Hexfield at 14:00. Flask mostly full. [Findings still buffered.]
[Inventory] Cherry wand (ordinary temp); silver-water flask (mostly full); birch practice wand-blanks ×2 (spiral cages, windows cut — fairing in progress); fine gouges + glasspaper; eaten owl feather (in pocket); Hagrid's forest map; carving index; gold unicorn hair; near-empty grafting-tar jar; Hexfield notebook; Cass's Dark Mark sketch; Salve of Memory; Mei's note (*Gwenllian ferch Rhydderch*); spent carry-basket.

## User

*keep going*

## Narrator

▼ **Saturday, 17 September 1977 — 12:54**
*Room of Requirement workshop*

They worked the ribs round, the two of them, and the quiet did its own thing — the small dry whisper of gouges, the finer hiss of glasspaper, dust hanging gold in the window-light. Caleb turned his blank slow and took the high spots off each rib in turn, feather-light, the way she'd shown him; where a rib ran proud he eased it true, where the spiral had kinked under his earlier hand he faired the run smooth until the eye slid down it without catching. The inner faces last — pared back off the core a touch each, so all three ribs stood proud and the channel showed clean and even between them, the light running unbroken down the hollow.

Mei finished hers, set the gouge down, and rolled the blank slow between her palms, sighting the three ribs against each other one last time. "...There. Three the same, the run fair, the core showing clean." She held it up to the window and the spiral caught the light all the way along, fluid, no snag. Then his, taken into her other hand, turned beside it. "Yours matches. Both faired." A breath, pleased. "That's step four done. They're not raw cages anymore — they're *wands* now, near enough. Just want their ends."

She nodded at the two blanks, the open channels dark and even down their lengths. "Caps and hooks next — the part that holds a core. That's the last real making on them." A glance at the clock, then at him, easy. "Hour till the field. Enough to thread the ends and cut the hooks if you want them finished, or a clean place to stop and come back to. Your call."

[Tracker] Step 4 (fairing the ribs) **complete on both blanks**: all three ribs evened in section, the spiral run faired smooth (no kinks), inner faces relieved so ribs stand proud and the core-channel shows clean/even. Mei cross-checked both — matched, fair, the spirals catch light unbroken. The pieces now read as near-finished wands, lacking only their ends. NEXT/last real making = Step 6, the caps + wooden fisheye hooks (threaded pommel + threaded tapered tip, wooden fisheye in each cap to anchor a core — the no-metal build). ~12:54; ~1 hr to the 14:00 Hexfield block — Mei notes that's enough to thread the ends + cut the hooks, or a clean stopping point. Open to Caleb. Flask mostly full. [Findings still buffered.]
[Inventory] Cherry wand (ordinary temp); silver-water flask (mostly full); birch practice wand-blanks ×2 (faired three-rib spiral cages — ends not yet made); fine gouges + glasspaper; eaten owl feather (in pocket); Hagrid's forest map; carving index; gold unicorn hair; near-empty grafting-tar jar; Hexfield notebook; Cass's Dark Mark sketch; Salve of Memory; Mei's note (*Gwenllian ferch Rhydderch*); spent carry-basket.

## User

"go go go... but don't... calmly go go go" *proceed*

## Narrator

▼ **Saturday, 17 September 1977 — 13:08**
*Room of Requirement workshop*

So they went — go go go, but calmly — and the Room had set out what the work wanted: a small screw-box and tap sized to a wand's end, a fine-tooth saw, the littlest gouges, and a slim section of spare birch dowel for the hooks.

Caleb took the pommel end first. Mei read it off the plate as he worked — "*pommel and tip screw into the handle, wood-on-wood, no metal*" — and he cut the male thread onto the blank's end with the screw-box, slow, letting it bite a clean spiral; then tapped the inside of a separate turned birch cap to take it. He spun the cap on. It went home snug, the threads marrying with a soft dry click, and he could feel it grip. Off, and on again, twice, to be sure it ran true and didn't cross. It didn't.

Then the tip — the same, the tapered point threaded onto the wand's front and a cap tapped to match, screwing down over the channel's mouth. Two ends now that opened and closed, both clean.

The hooks last. He pared two tiny fisheyes off the birch dowel — a little loop of wood standing off a base small enough to seat inside each cap, the eye for the core to loop onto. Fiddly, eye-straining work; he ruined the first one (split the loop, tossed it) and got the second clean, then a third for the other cap.

Mei caught the split one as it rolled and smiled. "*One* ruined hook on a first build. Eldower would weep with envy." She watched him set the two good fisheyes into the caps. "There. Both ends thread, both caps take a hook." She held a finished blank up — the faired spiral cage, the screw-on pommel, the threaded tapered tip, a wooden fisheye waiting in each end to catch a core. "That's all six steps, Caleb. That's a *wand* — bar a core to hang in it." A glance at the clock, calm-but-moving. "Quarter past, near enough. They're finished. We can leave them proud on the bench and go warm up for the field."

[Tracker] Step 6 (seat & cap) **done — both practice wands now structurally complete (no-metal build)**: Caleb cut wood-on-wood male threads on each blank's pommel end + tapered tip with the screw-box, tapped matching turned-birch caps (threaded detachable pommel + threaded tapered tip), and pared **wooden fisheye hooks** to seat inside each cap (one hook split/discarded, two-plus cut clean) to anchor a core. Ran the threads true (no cross). **All six steps of the aether-slung tririb practice carve are complete** on both birch sticks — finished but for an actual core to loop in (cores TBD; gold-hair etc. still gated/in London). ~13:08–13:15; Hexfield block at 14:00. Mei suggests leaving them on the bench and going to warm up for the field. Flask mostly full. [Findings still buffered — wand build now finished; flag for flush at session end.]
[Inventory] Cherry wand (ordinary temp); silver-water flask (mostly full); **birch practice wands ×2 (finished: faired three-rib spiral cage, threaded birch pommel + threaded tapered tip, wooden fisheye hook seated in each cap; no core yet)**; spare birch dowel + one split hook (scrap); screw-box/tap, fine saw, gouges; eaten owl feather (in pocket); Hagrid's forest map; carving index; gold unicorn hair; near-empty grafting-tar jar; Hexfield notebook; Cass's Dark Mark sketch; Salve of Memory; Mei's note (*Gwenllian ferch Rhydderch*); spent carry-basket.

## User

"read about finishing them... wax or oil or what? after a final pass of sandpaper or what what?"

## Narrator

▼ **Saturday, 17 September 1977 — 13:18**
*Room of Requirement workshop*

Mei pulled *Small Works* back over to the last page of the carving section — "The Last Hand" — and ran her finger down it, then cross-checked the rule in *Timber*, "Sealing the Lasting Wood." She read the relevant bits out as she found them.

"Right. Final sand first — work down through the grits, finest last, *with* the grain not across it, till the surface goes smooth and faintly sheened on its own. Then raise the grain once — a barely-damp cloth over it, let it dry, and the fibres stand up; knock those back with the very finest paper. Do that twice and the wood won't go rough on you later." She turned the page. "*Then* you feed it. And here's the rule you already knew—" a glance up "—*wax the wood that stays, leave the seats bare.* The threaded ends, the inside of the caps, the fisheye seats, the core-channel — those stay raw, or the finish gums the grip and the threads and chokes the core. Everything you actually *touch* — the handle, the ribs, the outside of the caps, the tip — that gets fed."

She tapped the two material lines. "Oil *or* wax, and they do different things. Oil — soaks *in*, feeds the grain from inside, builds up over many thin coats, dries slow between each. Deepens the colour, makes it glow rather than shine, and you can always add more. Wax — sits more *on* the surface, buffs to a harder sheen, sheds moisture better, quicker to do. The book's preference for a wand—" she found the line "—oil the bare wood first, a few thin coats well rubbed in and left to cure, *then* a wax over the top once it's dry, for the hand-feel and the moisture seal. Best of both: fed deep, sealed hard." She set the book down. "We did the cherry ends in beeswax the other day, so we've wax. Have we any oil — or do I ask the Room?"

[Tracker] Step 6 finish/"The Last Hand" method read out (from *Small Works* "The Last Hand" + *Timber* "Sealing the Lasting Wood"): (1) **final sand** through grits, finest last, with the grain, to a faint natural sheen; (2) **raise the grain** with a barely-damp cloth, let dry, knock back stood fibres with finest paper — repeat ~twice so it won't roughen later; (3) **feed only the lasting wood — leave seats bare** (threaded ends, cap interiors, fisheye seats, core-channel stay raw, else finish gums threads/grip/core); feed everything handled (handle, ribs, outer caps, tip). Oil vs wax distinction: **oil** soaks in/feeds from within, many thin slow-cured coats, deepens colour to a glow, re-addable; **wax** sits on top, buffs to a harder sheen, better moisture seal, faster. Book's wand preference: **oil first (thin coats, cured), then wax over once dry** — fed deep + sealed hard. They already have beeswax (from the cherry ends); Mei asks if they have oil or should request it from the Room. Open to Caleb. ~13:18; Hexfield at 14:00. [Findings still buffered.]
[Inventory] Cherry wand (ordinary temp); silver-water flask (mostly full); birch practice wands ×2 (structurally finished, unfinished surface — about to sand/seal); beeswax (on hand); screw-box/tap, saw, gouges, glasspaper; eaten owl feather (pocket); Hagrid's forest map; carving index; gold unicorn hair; near-empty grafting-tar jar; Hexfield notebook; Cass's Dark Mark sketch; Salve of Memory; Mei's note (*Gwenllian ferch Rhydderch*); spent carry-basket.

## User

"what kind? linseed? don't tell me linseed.... linseed? and what is the time estimate on that?"

## Narrator

▼ **Saturday, 17 September 1977 — 13:20**
*Room of Requirement workshop*

Mei checked the page, and her mouth twitched before she even said it. "...Linseed." She turned it so he could see, like evidence. "Boiled linseed, specifically — it's the traditional one for fine wood, soaks in beautifully, deepens the grain. The book practically sings about it."

She put the book down before he could fully grimace. "But — *and* you'll like this — boiled linseed cures *slow*. Thin coat, eight to twelve hours to touch-dry, twenty-four between coats if you want it done right, and a few coats to build. Then you leave it days to properly harden before the wax goes over. That's not a this-afternoon finish. That's a leave-them-on-the-bench-and-come-back-across-the-week finish."

A beat, considering the alternatives, ticking them off. "If you want it *faster* — there are wand-finishes that aren't linseed. A hardening wood-oil cut with a drying agent goes off in an hour or two a coat. Pure wax skips oil entirely — buff it on, buff it off, done in twenty minutes, just no deep feed. Or—" a glance up, dry "—we ask the Room for a finishing oil that cures in an hour because it's a magic room and linseed's only slow because Muggles are patient." She spread her hands. "Proper and slow, quick and shallow, or cheat with the Room. Which?"

[Tracker] Confirmed: the book's traditional wand finish is **boiled linseed oil** (soaks in, deepens grain). Time estimate given — linseed is **slow**: ~8–12 hrs touch-dry per thin coat, ~24 hrs between coats, several coats, then days to fully harden before waxing → a multi-day, leave-on-the-bench finish, not this afternoon. Faster alternatives Mei laid out: (a) a hardening wood-oil with a drying agent (~1–2 hrs/coat); (b) pure wax only (~20 min, no deep feed); (c) ask the Room for a fast-curing finishing oil (magic shortcut). Open decision for Caleb: proper-and-slow (linseed), quick-and-shallow (wax), or Room-cheat. ~13:20; Hexfield at 14:00. Flask mostly full. [Findings still buffered.]
[Inventory] Cherry wand (ordinary temp); silver-water flask (mostly full); birch practice wands ×2 (structurally finished, surface unfinished — sanding/sealing pending the oil choice); beeswax (on hand); screw-box/tap, saw, gouges, glasspaper; eaten owl feather (pocket); Hagrid's forest map; carving index; gold unicorn hair; near-empty grafting-tar jar; Hexfield notebook; Cass's Dark Mark sketch; Salve of Memory; Mei's note (*Gwenllian ferch Rhydderch*); spent carry-basket.

## User

"proper and slow. I will wait for perfection." *I pull out two white unicorn tail hairs and place them on the bench and get tweezers*

## Narrator

▼ **Saturday, 17 September 1977 — 13:22**
*Room of Requirement workshop*

He laid the two white tail-hairs out on the dark bench-cloth, long and faintly luminous even in the workshop light, and took up the tweezers.

Mei watched him do it, and the easy went careful in her. She didn't stop him — but she set her own work down. "...Those are White Lightning's." Not a question. She knew exactly where the only white unicorn hair at Hogwarts came from. "Given, or taken?" The distinction mattered and she asked it plainly — the whole of unicorn lore turned on it, and so did the wand: a hair freely given works; a hair pulled or stolen is dead in the wood, and worse than dead from a unicorn.

She left the question sitting and looked at the two finished birch cages, then back at the hairs. "Because if she gave them — that's a core, Caleb. That's a *real* one." A beat, quieter, the weight landing. "Brother wands. Two sticks we cut together this morning, one white hair in each, off the unicorn that drinks out of your hands." She wasn't saying no. She was saying *understand what this is before you thread it.* "Did she give them to you?"

[Tracker] Caleb laid out **two white unicorn tail-hairs (White Lightning's)** on the bench with tweezers — moving to core the two finished birch practice wands for real, as brother wands (one white hair each). Mei went careful and asked the decisive unicorn-lore question: **given or taken?** (a freely-given hair works; a pulled/stolen one is dead in the wood and a grave wrong against a unicorn). She's not refusing — flagging the weight: this would make the morning's twin birch cages a genuine brother-wand pair cored from the unicorn that drinks from Caleb's hands. Awaiting Caleb's answer on the hairs' provenance + whether to proceed. ~13:22; Hexfield at 14:00. Flask mostly full. [Findings still buffered. NB: birch + white-unicorn-hair was NOT the bench-deferred plan (gold hair's nature pending London) — this is a new in-scene move; provenance of the hairs to be established by Caleb.]
[Inventory] Cherry wand (ordinary temp); silver-water flask (mostly full); **2 white unicorn tail-hairs (White Lightning's — on the bench)**; birch practice wands ×2 (finished cages, awaiting finish + now possibly a core); tweezers; beeswax; screw-box/tap, saw, gouges, glasspaper; eaten owl feather (pocket); Hagrid's forest map; carving index; gold unicorn hair; near-empty grafting-tar jar; Hexfield notebook; Cass's Dark Mark sketch; Salve of Memory; Mei's note (*Gwenllian ferch Rhydderch*); spent carry-basket.

## User

"what kind of... what is wrong with you? have you seen her with me? the gold one gave them and doesnt even know me. Im her best friend. what is wrong with you?"

## Narrator

▼ **Saturday, 17 September 1977 — 13:23**
*Room of Requirement workshop*

"...Fair." Both hands up, conceding it whole, no sulk in it. "I knew. You watched the gold one give freely without knowing you from a fence-post, and that one's mended halfway back out of your own hands — I was there for all of it. It's the one question you're *meant* to ask before a unicorn core, so my mouth got there before my head did." A wry beat. "Asked and answered. She gave them."

She drew the lamp in over the bench, careful gone warm, all-in now. "Real core. Brother pair. The only two like them there'll ever be." Then the craftsman caught up. "One snag — only order-of-work. The wood's not finished; they want days of linseed yet. So do you seat her now, raw, and oil round her — or loop her in to see her hang, take her back out, finish the wood proper, and set her for good once it's cured?"

[Tracker] Mei conceded the given/taken question cleanly (she'd witnessed White Lightning's devotion firsthand — the lore-reflex made her ask): **canon now — the two white tail-hairs were freely GIVEN by White Lightning** (consistent with her gated contact-affinity for Caleb). Affirmed this makes the twin birch cages a genuine **brother-wand pair** (one given white-unicorn hair each). Mei flagged a real (non-pedantic) order-of-work fork before coring: the wood is unfinished (multi-day linseed cure ahead), so — seat the hair now in raw wood and oil around it, or dry-fit to check the hang, remove it, finish/cure the wood, then seat the core for good. Open decision for Caleb. ~13:23; Hexfield at 14:00. Flask mostly full. [Findings + finished-wand-build + brother-wand coring — buffered for flush.]
[Inventory] Cherry wand (ordinary temp); silver-water flask (mostly full); **2 white unicorn tail-hairs (White Lightning's, freely given — on the bench)**; birch practice wands ×2 (finished cages; surface unfinished; about to be cored as a brother pair); tweezers; beeswax; screw-box/tap, saw, gouges, glasspaper; eaten owl feather (pocket); Hagrid's forest map; carving index; gold unicorn hair; near-empty grafting-tar jar; Hexfield notebook; Cass's Dark Mark sketch; Salve of Memory; Mei's note (*Gwenllian ferch Rhydderch*); spent carry-basket.

## User

"um, I'm just going to leave it in for now and take it out whenever I get to oiling it" *I unscrew both ends. attach one end of the unicorn hair to the pommel fish eye hook. use tweezer to pass it down through the core bore and pull it through, which would bring the pommel to the threads and allow me to twist the pommel on. then I pass the hair through the tip bore and  latch it to the fish eye of the tip and twist the tip on.*

## Narrator

▼ **Saturday, 17 September 1977 — 13:26**
*Room of Requirement workshop*

He unscrewed both caps and set them in a row — pommel, body, tip — the channel open end to end. The first white hair came up on the tweezers, fine as spider-silk and faintly luminous along its length, and he looped its end onto the little wooden fisheye in the pommel cap. A careful pinch closed it.

Then the threading. Tweezers to the hair's free end, and he fed it into the open mouth of the channel — slow, the bore narrow and the hair wanting to kink — coaxed it down the length and caught the tip of it where it came out the front. A gentle pull drew it taut through the whole body and brought the pommel cap up snug to the rear threads; he twisted it home, wood marrying wood with that soft dry click. The hair now ran anchored from the back, down the core, its free end standing proud of the front.

That end onto the tip's fisheye — pinched closed — and he passed the threaded tapered tip down over it and screwed it on too, taking up the last slack. The hair pulled to a fine straight line down the dead centre of the channel.

He held it up. Through the three spiralling windows of the cage the white hair caught the workshop light and ran it the length of the wand, luminous in the open air between the ribs — exactly what the visible-core design was cut to show. Raw birch, unfinished, a unicorn's given hair hung true down the heart of it.

Mei was quiet a moment, looking at it. "...There it is." Low. She didn't touch — just looked, the way she'd looked at White Lightning the first night. "Seated. It hangs dead-true. You can see her hair right through the ribs." A breath, the order-of-work catching up gently. "And out it comes again before the linseed, like you said — you'll thread it back for good once the wood's cured." Her eyes went to the second hair still lying on the cloth, then to its waiting twin cage. "One down. Want to core the brother now, or leave the second for when you've the tweezers-patience left?"

[Tracker] Caleb cored the **first** brother wand with one freely-given white unicorn hair, per his stated procedure: looped the hair to the pommel-cap fisheye, threaded it down the core bore with tweezers, drew it through (seating the pommel to the rear threads, screwed home), latched the free end to the tip-cap fisheye, screwed the tapered tip on — hair now anchored both ends, hung dead-true down the centre, **visible through the spiral windows** (the point of the visible-core design). Explicitly a **temporary seating** — to be removed before the linseed finish and re-threaded for good once the wood is cured. Wand still unfinished surface (raw birch); core character/behaviour not tested (no cast) — gated/unrevealed. Second white hair + twin cage still on the bench. ~13:26; Hexfield at 14:00. Open to Caleb: core the brother wand now, or later. Flask mostly full. [Findings + brother-wand build — buffered for flush.]
[Inventory] Cherry wand (ordinary temp); silver-water flask (mostly full); **brother wand #1 (birch spiral cage, threaded birch caps, freely-given white unicorn hair seated dead-true & visible — surface unfinished, core temporary pending cure)**; **1 white unicorn tail-hair remaining (on bench)** + twin birch cage (uncored); tweezers; beeswax; screw-box/tap, saw, gouges, glasspaper; eaten owl feather (pocket); Hagrid's forest map; carving index; gold unicorn hair; near-empty grafting-tar jar; Hexfield notebook; Cass's Dark Mark sketch; Salve of Memory; Mei's note (*Gwenllian ferch Rhydderch*); spent carry-basket.

## User

*core the brother*

## Narrator

▼ **Saturday, 17 September 1977 — 13:28**
*Room of Requirement workshop*

The second hair went the same way, his hands surer for having just done it once.

Both caps off the twin cage; the last white tail-hair up on the tweezers, luminous along its length; its end pinched onto the pommel fisheye. Then down the open channel — slow, coaxing the kink out of it, catching the free tip where it broke from the front — and a gentle draw pulled it taut and brought the pommel up to the rear threads. Twisted home, dry click. The free end onto the tip's fisheye, the tapered tip threaded down over it, the last slack taken up. The hair pulled to a fine straight line down the dead centre of the second cage.

He set them side by side on the dark cloth. Two raw birch wands, three spiralling ribs apiece, and through every window a white unicorn hair running luminous down the heart — twins, cut from the same morning's work, cored from the same creature. The only two there'd ever be.

Mei looked at the pair of them a long moment and didn't reach for either. "...Brother wands. Properly." Quiet, the weight of it plain in her. "Off her, off this morning, off both our hands." A breath. Then the dry came back, gentle, holding the moment from getting too big. "And both come out again before the linseed, both go back for good once it's cured. Two cores to re-thread, twice the tweezers." She straightened, glanced at the clock. "Half-one. They're done — far as they go today." A look over, easy. "Leave the pair proud on the bench and go warm up for the field? It's yours and Liri's block at two."

[Tracker] Caleb cored the **brother** (twin) wand with the second freely-given white unicorn hair, same procedure (looped pommel fisheye → threaded the bore → drew taut, pommel screwed home → tip fisheye → tapered tip screwed on; hair hung dead-true, visible through the spiral windows). **Brother-wand pair now complete**: two birch three-rib spiral cages, threaded birch caps, one given White Lightning hair each, both cores **temporary pending the linseed cure** (to be removed before oiling, re-threaded for good once cured). Surface still raw/unfinished; cores untested (no casting). ~13:28; Hexfield block at 14:00 (Caleb + Liri's). Mei suggests leaving the pair on the bench and going to warm up. Flask mostly full. [Findings + completed brother-wand build — buffered for session-end flush.]
[Inventory] Cherry wand (ordinary temp); silver-water flask (mostly full); **brother wands ×2 (birch spiral cages, threaded birch caps, freely-given white-unicorn-hair core seated dead-true & visible in each — surface unfinished, cores temporary pending linseed cure)**; tweezers; beeswax; linseed (to source/Room for finishing); screw-box/tap, saw, gouges, glasspaper; eaten owl feather (pocket); Hagrid's forest map; carving index; gold unicorn hair; near-empty grafting-tar jar; Hexfield notebook; Cass's Dark Mark sketch; Salve of Memory; Mei's note (*Gwenllian ferch Rhydderch*); spent carry-basket.

## User

"are you insane? we lumos, what started this nonsense pair bonding. pick it up, tip to tip.... and room, can I have a couple of bobs at the end?"

## Narrator

▼ **Saturday, 17 September 1977 — 13:30**
*Room of Requirement workshop*

The cherry went back in his sleeve, unneeded. He picked up the two brother wands instead and held one out across the bench to her, pommel-first. "Yours."

Mei took it. Of course one was hers — they didn't make a matched pair of anything and split it down the middle. She turned it once in her hand, the white hair luminous through the open ribs, and looked at him over the points of them.

They brought the two together, tip to tip. Raw birch to raw birch.

"*Lumos.*" Both of them, near enough at once.

And both lit — uncertain for a half-second, new to hands that hadn't earned them yet, and then catching: two small white stars at the joined tips, the light running back through each visible core and across the meeting-point, one bright thread carried down the doubled length. The wands worked. New, unsettled, not quite *theirs* yet — but alive in their hands, and lit together.

Mei watched the light cross between them and didn't say anything clever for once. "...They light." Quiet. "Both of them. For both of us." A breath. "*Nox.*" Hers went dark; she lowered it, careful with it now, the way you hold a thing that turned out to be real.

[Tracker] CORRECTION (clean): the cherry wand should not have been out, and the brother pair is a **his-and-hers set** — Caleb handed Mei her wand. The two are now canonically **Caleb's wand + Mei's wand** (a partner pair). They brought the two new wands **tip to tip** and both cast **Lumos** — both **lit** (cores are real given unicorn hair, wood sound), though the light read **new/unsettled** (the wands aren't fitted/earned, surface still raw, cores temporary pending the linseed cure). Whether they truly "answer" their wizards is left open/felt, not declared. Mei *Nox*'d hers and handled it with new care. ~13:30; Hexfield block at 14:00. Two Room-given shillings still on the bench. Flask mostly full. [Findings + his-and-hers brother-wand pair — buffered for flush.]
[Inventory] Cherry wand (ordinary temp, stowed); silver-water flask (mostly full); **Caleb's brother wand + Mei's brother wand** (birch three-rib spiral cages, threaded birch caps, freely-given white-unicorn-hair core seated dead-true & visible in each — both confirmed to light; surface unfinished, cores temporary pending linseed cure); two Room-given shillings (bench); tweezers; beeswax; linseed (to source for finishing); screw-box/tap, saw, gouges, glasspaper; eaten owl feather (pocket); Hagrid's forest map; carving index; gold unicorn hair; near-empty grafting-tar jar; Hexfield notebook; Cass's Dark Mark sketch; Salve of Memory; Mei's note (*Gwenllian ferch Rhydderch*); spent carry-basket.

## User

[[2 bob dummies please]]

## Narrator

▼ **Saturday, 17 September 1977 — 13:31**
*Room of Requirement workshop*

The Room answered the last request, and it wasn't coin.

In the open floor past the benches, where there'd been bare flags a breath ago, two figures now stood: a matched pair of human upper-torsos — head, shoulders, chest, no features but the rough swell of a face — moulded in some firm flesh-toned synthetic, each socketed onto a broad weighted base squat enough to take a hit and rock back upright. Targets. Bobs. Exactly the thing you'd stand up to drill your aim against before a match, silent and patient and asking nothing.

Mei looked at the two blank-faced dummies planted in her husband-to-be's wand workshop and exhaled through her nose. "...You asked a room full of finished unicorn-hair wands and curing wood for *two men to hit.*" She slid her new wand back into her sleeve, careful. "Warming up for the field. Of course you are. You're not capable of an idle hour." A glance between the dummies and the clock. "Half-one. So — drill against the bobs here a bit before two, or warm up on the field proper with Liri? Either, but pick, because I'm not letting you skip the lunch *and* the stretch."

[Tracker] CORRECTION (clean, acknowledged): the "couple of bobs" Caleb asked the Room for are **BOB-style training dummies** (free-standing synthetic human torsos on weighted bases for spell/strike practice), NOT coins/shillings — the earlier "two shillings / pocket money / hazard pay" beat is **void** (my misread, retracted). No currency was ever produced; nothing to log to money. The Room produced **two practice dummies** standing in the workshop floor — Caleb's intent: warm up / drill spell-aim before the 14:00 Hexfield block. ~13:31; Hexfield (Caleb + Liri's block) at 14:00. Mei pressing him to pick: drill against the dummies here, or warm up on the field with Liri. His-and-hers brother wands carried (cores temporary pending cure). Flask mostly full. [Findings + brother-wand pair — buffered for flush.]
[Inventory] Cherry wand (stowed); **Caleb's new brother wand** (birch spiral cage, threaded birch caps, freely-given white-unicorn-hair core, lights — surface unfinished, core temporary pending cure; in sleeve); silver-water flask (mostly full); tweezers; beeswax; linseed (to source); screw-box/tap, saw, gouges, glasspaper; eaten owl feather (pocket); Hagrid's forest map; carving index; gold unicorn hair; near-empty grafting-tar jar; Hexfield notebook; Cass's Dark Mark sketch; Salve of Memory; Mei's note (*Gwenllian ferch Rhydderch*); spent carry-basket. Two BOB training dummies stand in the workshop (Room-made, not carried). *(Mei carries the twin brother wand.)*

## User

*I quietly ask or think to the room to put name tags on them that say "Poacher A" and "Poacher B" and like thin creepy mustaches and evil beards and mime shirts*

## Narrator

▼ **Saturday, 17 September 1977 — 13:32**
*Room of Requirement workshop*

The Room obliged with the straight-faced enthusiasm of a thing that had clearly been waiting to be asked.

The two blank torsos sprouted faces — or near enough. Across each upper lip a thin, waxed, villainous moustache curled to fine points, the kind a man twirls; beneath, a pointed black beard sharpened to a wicked spade. Their featureless chests resolved into horizontal black-and-white Breton stripes, snug and unmistakable. And round each neck hung a little card on string: **POACHER A** on the left, **POACHER B** on the right, lettered in a prim official hand.

They stood there, striped and bearded and labelled, two mimes who'd turned to crime, asking to be hit.

Athena roused on her beam, took one long look down at the two new arrivals, and made a low sound that was, unmistakably, judgemental.

Mei pressed her lips together and lost. "...Mime poachers." It came out unsteady. "You've asked the Room to build you two striped, moustachioed *mime poachers* to duel before your sport." She wiped her eye. "Poacher A I understand. Poacher B is just gilding. And the *mime shirts*, Caleb—" she gestured helplessly at the Bretons "—a silent menace. They'll trap your hexes in invisible boxes." She squared up beside the nearer one, her new wand out, the laugh still in her voice. "Right. I'm not warming up against *Poacher A* with a straight face, so you've doomed us both. Yours or mine first?"

[Tracker] Comic beat — Caleb had the Room cosmetically dress the two BOB training dummies as villains: thin waxed twirly moustaches, evil spade beards, black-and-white Breton "mime" stripes, and neck cards reading **POACHER A** / **POACHER B** (poachers = the natural foe of unicorn-devoted Caleb). Purely cosmetic; no mechanical/state change. Athena disapproves. Mei delighted/undone, squaring up to warm up against them with her new wand. ~13:32; Hexfield block (Caleb + Liri's) at 14:00 — about to drill/warm up against the dummies. His-and-hers brother wands in hand (cores temporary pending cure). Flask mostly full. [Findings + brother-wand pair — buffered for flush.]
[Inventory] Cherry wand (stowed); **Caleb's new brother wand** (birch spiral cage, white-unicorn-hair core, lights — surface unfinished, core temporary pending cure; in hand); silver-water flask (mostly full); tweezers; beeswax; linseed (to source); screw-box/tap, saw, gouges, glasspaper; eaten owl feather (pocket); Hagrid's forest map; carving index; gold unicorn hair; near-empty grafting-tar jar; Hexfield notebook; Cass's Dark Mark sketch; Salve of Memory; Mei's note (*Gwenllian ferch Rhydderch*); spent carry-basket. Two BOB dummies (now "Poacher A/B", mime-striped, bearded) stand in the workshop. *(Mei carries the twin brother wand.)*

## User

"I just pictured pure evil and that is what happened" *pick a knockback something and tell her to do one against hers and I do one against mine then I tell her to time with me and hit the same one*

## Narrator

▼ **Saturday, 17 September 1977 — 13:33**
*Room of Requirement workshop*

"*Flipendo*," he said — the Knockback Jinx, simple, blunt, perfect for a striped felon. "On three. Hit your own first, get the feel of the new wand. Then we time it and take the same one together."

Mei squared on Poacher B; Caleb on Poacher A. New wands up, white hairs faint down the cages.

"*Flipendo.*" Hers cracked out — a clean blunt shove of force that caught Poacher B square in the striped chest and rocked him back on his weighted base, the spade beard wobbling, before he tipped upright again. The new wand had thrown it true. "...Oh, that's a *good* one," she said, surprised at the bite of it.

"*Flipendo.*" His landed on Poacher A, the mime menace snapping back and righting himself with an offended little shudder.

"Now together. Same one. *Poacher A.*" He set them both on the left-hand dummy, the two new wands levelled side by side. "Time with me. Three—two—"

[Tracker] Caleb chose **Flipendo** (Knockback Jinx) to warm up against the dummies with the new wands. First solo passes landed true: **both new his-and-hers brother wands cast cleanly** — Mei's Flipendo rocked Poacher B, Caleb's rocked Poacher A (each rights itself on its weighted base). First confirmed *offensive* casts from the new wands (in addition to the earlier Lumos) — they throw true, though still raw/uncured/unfitted; nothing anomalous. Now setting up a **timed simultaneous** Flipendo, both wands on the same dummy (Poacher A) on a count — Caleb counting down ("three—two—"), beat poised on the joint cast. ~13:33; Hexfield block at 14:00. Flask mostly full. [Findings + brother-wand pair (now casting) — buffered for flush.]
[Inventory] Cherry wand (stowed); **Caleb's new brother wand** (birch spiral cage, white-unicorn-hair core — casts Lumos + Flipendo true; surface unfinished, core temporary pending cure; in hand); silver-water flask (mostly full); tweezers; beeswax; linseed (to source); screw-box/tap, saw, gouges, glasspaper; eaten owl feather (pocket); Hagrid's forest map; carving index; gold unicorn hair; near-empty grafting-tar jar; Hexfield notebook; Cass's Dark Mark sketch; Salve of Memory; Mei's note (*Gwenllian ferch Rhydderch*); spent carry-basket. Two BOB dummies ("Poacher A/B", mime-striped, bearded) in the workshop. *(Mei carries the twin brother wand.)*

## User

"one--Flipendi!"

## Narrator

▼ **Saturday, 17 September 1977 — 13:33**
*Room of Requirement workshop*

"*Flipendi!*"

Two jinxes left two new wands on the same breath — and the doubled force took Poacher A square in his striped chest at once. No genteel rock-back this time. The mime menace went *over*, base and all, ripped clean off his weighted footing and flung a good six feet to skid across the flagstones on his beard, moustache pointing at the rafters, thoroughly knocked back and showing no signs of getting up.

The empty base rocked where he'd stood.

Athena gave a single, satisfied churr from the beam, as though justice had been served on at least one poacher.

Mei looked at the felled dummy, then at the wand in her hand, eyebrows up. "...Together they don't *add*, they *multiply*." She turned the new wand over, reassessing it. "Two students' Flipendos shouldn't launch a weighted target across a room. That was—" she searched for it "—well-timed, is what that was. Hit the same thing on the same instant and it stacks harder than twice." A beat, the grin breaking through. "Poacher A has been removed from the premises. Poacher B is going to talk." She lowered the wand, glancing at the clock. "And *that's* a warm-up. Twenty-five to two — go again, or down to the field while you're hot?"

[Tracker] Caleb + Mei cast a **timed simultaneous Flipendo** with the new his-and-hers brother wands on the same dummy (Poacher A) — landing on the same instant, the combined knockback **launched the weighted dummy clean off its base ~6 ft** (well beyond two separate student-jinxes — synchronized same-target casts stack hard). New wands performing strongly (Lumos + Flipendo, now a coordinated double-hit); still raw/uncured/unfitted, nothing anomalous — just well-timed. Comic: "Poacher A" felled, "Poacher B" still standing; Athena approves. ~13:33 (≈13:35); Hexfield block (Caleb + Liri's) at 14:00. Mei offers: another round, or head to the field while warm. Flask mostly full. [Findings + brother-wand pair (casting, incl. timed-double-cast knockback) — buffered for flush.]
[Inventory] Cherry wand (stowed); **Caleb's new brother wand** (birch spiral cage, white-unicorn-hair core — casts Lumos + Flipendo true; surface unfinished, core temporary pending cure; in hand); silver-water flask (mostly full); tweezers; beeswax; linseed (to source); screw-box/tap, saw, gouges, glasspaper; eaten owl feather (pocket); Hagrid's forest map; carving index; gold unicorn hair; near-empty grafting-tar jar; Hexfield notebook; Cass's Dark Mark sketch; Salve of Memory; Mei's note (*Gwenllian ferch Rhydderch*); spent carry-basket. Two BOB dummies ("Poacher A" felled & off-base / "Poacher B" standing; mime-striped, bearded) in the workshop. *(Mei carries the twin brother wand.)*

## User

*I ask her to Flipendo at me while I do at her*

## Narrator

▼ **Saturday, 17 September 1977 — 13:36**
*Room of Requirement workshop*

They squared up a few paces apart, new wands levelled at each other — partners, a knockback each, see who sits down first.

"*Flipendo*—"

Both jinxes left both wands on the same breath, and neither one arrived.

They met dead in the air between Caleb and Mei — and instead of crossing to strike, they *caught*. A bright knot of light bloomed where they met, and from it a thin taut line ran tip to tip, joining the two wands across the gap. The force hung there, suspended, neither jinx able to shove past the other to its mark. Caleb felt his wand *pull* — a thrum running back into his hand, the birch gone warm, the white hair in the cage flaring bright down its length, straining toward its twin. Across from him Mei's did the same, the two cores blazing at each other through the open ribs. No knockback. No impact. Just the held light, flickering, unsteady, refusing.

Then it let go — the knot guttered out, the line snapped dark, and the trapped force released into the room with a soft thump that stirred the dust and rocked both poachers on their bases. Nobody moved an inch.

Mei lowered her wand slowly, staring at the empty air where the jinxes had locked. "...They won't." Quiet, half-awed. "I *told* you. Brother wands won't turn on each other." Her eyes came up to his. "You just watched them refuse."

[Tracker] Caleb and Mei cast Flipendo at each other simultaneously with the new his-and-hers brother wands — and the **brother-wand effect manifested**: the two jinxes met mid-air and *connected/locked* (a knot of light + a taut tip-to-tip line, the trapped force suspended) instead of striking; the wands pulled toward each other, warmed, the twin white-hair cores flaring; neither was knocked back. The connection held briefly (flickering/unsteady — the wands are new/uncured), then released harmlessly. First in-scene confirmation that the pair, sharing a core from the same unicorn (White Lightning), behave as true **brother wands that will not work against each other** — the property Mei had named in the abstract this morning, now witnessed. Nothing gated/silver-water-related involved; purely the shared-core effect. ~13:36; Hexfield block (Caleb + Liri's) at 14:00. Flask mostly full. [Brother-wand findings, incl. the refusal effect — buffered for session-end flush.]
[Inventory] Cherry wand (stowed); **Caleb's new brother wand** (birch spiral cage, freely-given White-Lightning hair core — casts Lumos/Flipendo; locks with its twin, won't cast against it; surface unfinished, core temporary pending cure; in hand); silver-water flask (mostly full); tweezers; beeswax; linseed (to source); screw-box/tap, saw, gouges, glasspaper; eaten owl feather (pocket); Hagrid's forest map; carving index; gold unicorn hair; near-empty grafting-tar jar; Hexfield notebook; Cass's Dark Mark sketch; Salve of Memory; Mei's note (*Gwenllian ferch Rhydderch*); spent carry-basket. Two BOB dummies ("Poacher A" felled earlier / "Poacher B"; mime-striped, bearded) in the workshop. *(Mei carries the twin brother wand.)*

## User

"that was awesome. we are doing that tonight at the game right?" *I step outside with her and ask the room to give us a completely padded room that spawns mime crash test dummy poachers that are animated and fling spells at us, and we have to work together as a team, and if we talk, the room sprays water in our mouths and we aren't allowed to attack.. only properly reflected curses hitting the dummies stops them.. and it slowly increases difficulty.. then I take her into the room.* "shields only. no talking. reflect back at them. we work together" *room flashes red yellow green then klaxons like a race and randomly spawns a dummy*

## Narrator

▼ **Saturday, 17 September 1977 — 13:38**
*Room of Requirement*

"Tonight." Mei eyed the new wand in her hand, the white hair still faintly bright in its cage. "They're not even oiled — the cores are meant to come *out* before the linseed, you lunatic." Then the grin won. "...But they lock like that in front of forty people and Hexfield's legend triples overnight. We'll see how they behave. No promises."

He stepped them both out, asked the Room the long way, and led her back in — and it had remade itself entire. Walls, floor, ceiling: all of it gone to thick pale padding, soft underfoot, a sealed cube with no corner that could hurt you. No benches, no forge. Just the mat, and high on one wall a brass nozzle angled down like a watchful eye, and a placard that lettered itself as they read it — **REFLECT ONLY · NO SPEECH · WORK AS ONE**. Between them, where it always sat, the bond hummed quiet and ready, the one channel the room hadn't forbidden.

He set them back to back on the mat, wands up. *Shields. No talking. Send it back. Together.* He didn't say it aloud — couldn't, now — just looked it at her, and felt her take it down the bond, steady, with him.

The Room flashed once **red** — then **yellow** — then **green** — and a klaxon tore the silence like a starting gun. A seam split in the padded wall and a poacher lurched out on a swivelling base, striped chest, waxed moustache, **POACHER A** swinging at its throat — wand-arm already coming up, already throwing, a jet of light snapping across the mat straight at Caleb's head.

[Tracker] Caleb reconfigured the RoR into a **silent co-op reflection drill**: fully padded sealed room, animated "mime poacher" dummies that fling curses, rules = *shields/reflection only, no speech, work as a team, difficulty escalates*; talking is penalized (a wall nozzle sprays water + locks out attacking). Established the **pair-bond as the only permitted coordination channel** — Caleb set the rules to Mei *through the bond*, not aloud (consistent: bond carries intent/awareness, established). Drill armed: Room flashed red→yellow→green + klaxon, first dummy ("Poacher A") spawned and **cast at Caleb** — beat poised on the incoming jet (response: shield/reflect, silently, with Mei). New his-and-hers brother wands in hand (functional but raw/uncured; lock only against *each other*, irrelevant to shielding). ~13:38; Hexfield block at 14:00. Flask mostly full. [Brother-wand findings — buffered for flush.]
[Inventory] Cherry wand (stowed); **Caleb's new brother wand** (birch spiral cage, freely-given White-Lightning hair core — casts; locks with its twin only; surface unfinished, core temporary pending cure; in hand); silver-water flask (mostly full); tweezers; beeswax; linseed (to source); eaten owl feather (pocket); Hagrid's forest map; carving index; gold unicorn hair; near-empty grafting-tar jar; Hexfield notebook; Cass's Dark Mark sketch; Salve of Memory; Mei's note (*Gwenllian ferch Rhydderch*); spent carry-basket. *(Mei carries the twin brother wand. Two "Poacher" dummies from earlier replaced by the drill's spawns.)*

## User

[[OOC: I mean. it is the one thing to do, so I dont want to play this out. but tell me a charming story of how far before we crash and burn, because I do want it to boot us out at like 13:52

## Narrator

▼ **Saturday, 17 September 1977 — 13:52**
*Room of Requirement*

It went better than it had any right to, and then it didn't.

The first wave undid them on old habit alone — Caleb opened his mouth to call a target and the nozzle caught him square, a cold jet straight down his throat, and he lost the next volley coughing and wand-locked while Mei covered them both and glared at him through it. He learned. After that they went quiet the only way left to them: through the bond. She felt where he'd raise a shield; he felt where she'd turn a curse back; the two of them carved the mat up between them without a single word, reflections snapping off the new wands and folding poacher after poacher flat, the white hairs bright in the cages as they worked.

Two dummies. Then three. Then four lurching out of four seams at once, jets crossing the room in a lattice — and they *held* it, back to back, reading each other, sending the curses home far past where two people ought to manage on instinct and a shared nervous system.

What killed them was joy. Caleb felt a perfect reflection land, couldn't help himself, and shouted *YES* — and the Room hosed him mid-crow, locked his wand, and turned all four poachers on Mei at once. She lasted a heroic three seconds before a jet clipped her shoulder. The klaxon brayed. The placard flipped to one dry word: **OUT**.

The padding eased them both down onto the mat as the dummies dissolved to nothing. Quarter to two, gone. The pair of them flat on their backs, soaked through and breathless, laughing up at the ceiling — and eight minutes to be on the field.

## User

"Room can we have the same Hexfield setup, with no obstacles on te field? all the same seating please? the professor's area and the narrator stand with seats for the elves if they come again? and the tiered seating for the students? can you reset us to 4 dummies at once with dim lighting? and do us a favor and accidentally run this exercie over until 2:01 when virtually everyone should be here? you can go ahead and put out the crackers at the door.. keep me and her a personal score tracker of dummies defeated? and then at 2:01, 'accidentally verbally announce late that the room is reserved for Hexfield, drop all dummies, and announce you have decided our final task is to turn on one another?"

## Narrator

▼ **Saturday, 17 September 1977 — 14:01**
*Room of Requirement — Hexfield*

The Room took the whole list and ran it like a conspirator.

The padded cube unfolded into the Hexfield hall they knew — the long bare pitch with not an obstacle on it, the tiered student benches climbing one wall, the professors' box with its good chairs, and off to the side the little raised stand with the low cushioned seats the house-elves had perched on last time. A basket of crackers appeared at the door. The lights came down to a dim, dramatic wash. And four poachers lurched out of the seams to keep Caleb and Mei working, two glowing tallies floating high on the wall — **WADDELL** and **CHANG** — ticking up dummy by dummy as they reflected curse after curse in total, water-penalty silence.

They didn't stop. The Room "forgot" to stop them. So the students who began trickling in at five-to found the hall already live — the two cofounders' partner back to back on the pitch, soundless, folding mime-striped felons flat with nothing passing between them but the look of two people who could feel each other think. Crackers popped at the door. The benches filled. By 14:01 the hall was near full and watching, half of them not sure if this was the show or a warm-up.

Then the klaxon brayed, the poachers all dissolved at once, and the Room cleared its throat and announced — far too late, with the prim guilt of a thing that had timed it to the second — that the hall was, *regrettably,* reserved for Hexfield, the exercise was therefore concluded, and it had decided the participants' **final task** was to **turn upon one another.**

Forty-odd faces swung from the placard to the two of them, alone on the open pitch, new wands in hand. Somewhere in the benches Liri's voice, dry and carrying: "...Oh, this I have to see."

## User

*I assume that she is going to do Flipendo, not that I think it matters, but I turn to face her, and use our bond to time firing at each other* [[I will not, last week 5 professors came, 40 some students played, and about 60 students came to watch... which you can do whatever this week... just as a baseline in case the 40 was just playing]]

## Narrator

▼ **Saturday, 17 September 1977 — 14:01**
*Room of Requirement — Hexfield*

The hall had filled the way it filled last week and then some — the tiered benches packed near to the rafters, a hundred-odd students shoulder to shoulder, the professors' box holding Henshaw and three or four others who'd taken to coming down; even the little elf-stand had two small occupants perched forward on its cushions, ears up. A hundred faces, the dim light on all of them, every one turned to the two figures alone on the bare pitch.

Caleb turned to face her. No words — there couldn't be, not in here — just the bond between them, humming the count, the two of them down to a single shared breath.

Then, together: "*Flipendo.*"

Two jinxes leapt from two new wands on the very same instant — and met in the air between them, and would not pass. A knot of light bloomed bright in the dim hall, a taut line snapping tip to tip across the gap; the two white hairs flared down their open cages, blazing at each other through the ribs, both wands straining toward their twin. No knockback. No winner. Just the held, refusing light, hanging there for the whole hall to see.

The benches went dead silent. Then they broke — a roar, students surging to their feet. Somewhere in the middle of it, Liri, on her feet with the rest: "They're *brother wands*—!"

## User

*break it or it breaks on its own.. preferably I would sort of prefer it just pop and knock us both back and down on the padding so we can both get up laughing... [also, Liri needs to be up announcing now.. she can start us off from that into the actual match, OR let her play and have.... Esme announce the first match. Esme isn't 7th year]

## Narrator

▼ **Saturday, 17 September 1977 — 14:02**
*Room of Requirement — Hexfield*

The held light couldn't hold. It flickered, strained, the two cores blazing — and then it gave all at once, the knot bursting with a hard bright *pop* that flung both jinxes' trapped force straight back down their own wands. Caleb went off his feet. So did Mei. The two of them sailed back a few feet apart and landed flat on the padded pitch, wands still in hand, the breath knocked clean out of them — and came up howling, both of them, sprawled and laughing too hard to stand straight away while the benches roared above.

Up in the tiers Liri was already moving — down the steps two at a time, vaulting the rail onto the pitch, and the Room handed her a voice that carried to the rafters as she came.

"*Right!*" she bellowed, grinning, planting herself between the two flattened cofounders like a referee over a knockout. "For those keeping score — that's what a matched pair does, and *no*, you can't have one!" She hauled Caleb up by the wrist, then Mei. "Settle down, settle *down* — get to your benches, sort your teams. First match draws in two minutes!" A sideways grin at Caleb, dropping under the crowd-noise, just for him: "...you absolute show-off. Go sit, I've got them."

## User

"but you are 7th year! come play! come on! you were so good last week. I'll get somebody else for one round... hmm?"

## Narrator

▼ **Saturday, 17 September 1977 — 14:04**
*Room of Requirement — Hexfield*

The Room built the pitch up around them as Esme spoke. The flat floor stayed inflatable-soft, but the long low wall rose down the right side, the two staggered columns pushed up out of the middle at their canted angles, and the vantage platform lifted at the near end. The two flag-poles bloomed last — Gold at the near base under a leopard-cat banner, Purple at the far under a pygmy owl. On the left wall the Black Lake mural stirred, the squid turning over slow; on the right the Forest canopy moved. The scoreboard chalked itself clean above the door.

Caleb took the carrying-voice off Esme for one line, turning toward the professors' box where Henshaw sat. "First match's a special one!" he called, grinning up at him. "Seventh-years only, total silence — *no talking, no calling, no incantations out loud.* Sight and hearing, that's all you get. Silent casting." A beat, shameless. "Professor Henshaw spent all week teaching us nonverbal work in Defence, so — *cheers, sir.* Watch us use it."

Henshaw's eyebrows went up; somewhere behind him a staff chair creaked with what might have been a laugh.

Caleb handed the voice back. Esme lifted it, dust-dry, unbothered by the hundred faces. "Seventh-years to the floor. Crackers at the door — Gold or Purple. The rest of you, *quiet*, so they can hear themselves think." A short pause. "Draw."

The 7th-years filed down — Liri already on the pitch, Mei beside her, Lin, the rest of the cohort pulling crackers as they came. Caleb's cracker split with a soft *bang* and dropped a **Purple** chit into his palm. His own colour. The owl, looking down at him off its banner.

## User

[[sorry I should say silent match... so 3 rounds of 7 minutes or whatever. then I will go back to announcing with Liri and come down for a match or two, whenever I get placed.]] *I go grab a cracker*

## Narrator

▼ **Saturday, 17 September 1977 — 14:05**
*Room of Requirement — Hexfield*

Esme laid the format out, clipped and exact. "One match, three rounds, seven minutes each. Take the other lot's flag, bring it home. Legal hexes only — Stinging, Rictusempra, Knockback, Trip. Nothing breaks skin. Down is down: you glow, you wait, you revive or run back." A pause, dry as chalk. "And not a *word.* No calling, no counting, no incantations out loud. Talk, and the Room hears it, and the hit's a forfeit. Sight and sound. That's your whole world for twenty-one minutes."

The last crackers popped down the line. Caleb's Purple chit set him under the owl banner; across the centre stripe Mei's split open **Gold** — the leopard cat, the far side of the pitch from him. Liri pulled Gold too, falling in at Mei's shoulder; Lin came up Purple beside Caleb. Two even sides drifted to their bases, sorting themselves with looks and nods, mouths already shut.

The scoreboard lit a 7:00. The murals went still. A hundred students leaned in and hushed. Esme raised the voice a final time.

"Seventh-years. Silent. And—" a beat, perfectly timed "—*go.*"

One clear tone. The clock dropped. No shout, no whistle — just the soft thud of feet on the soft floor and the first hexes already crossing the pitch in total, ringing silence.

## User

*I use this new wand the whole time. if Mei does too, that makes it more interesting because we cant fight but if we make a mistake and try, whatever happens happens...* [[I just want to have fun.. l dont want to actively roleplay every single round.. put some more people on the field. Cass. Aisling. Mairi. Imogen. the slytherin prefects maybe. rory whats his face*]]

## Narrator

[[On it — montage the whole silent match, not turn-by-turn, and crowd the pitch. Quick check first so I place real people and don't invent a "Rory" who already exists or get the Slytherin prefects wrong.]]

▼ **Saturday, 17 September 1977 — 14:26**
*Room of Requirement — Hexfield*

The silent match was the strangest thing the hall had watched yet, and easily the best.

With the cracker-draw scattering the cohort across the colours, two even sides took the pitch and went utterly quiet — no calls, no counts, no incantations, the spells leaving wands as nothing but a soft crack and a line of light. The crowd, marvelling, hushed itself to match, so the whole hall ran on footfalls and breath and the geometry of bodies reading each other. Marcus Bletchley, Gold, flashed Caleb his two-fingered *I'm watching you, idiot* across the centre stripe — his entire vocabulary, perfectly suited to a round with the sound off. Cass worked surgical and flat-faced, dropping Purple runners with economical Trip Jinxes. Imogen came in like weather, screening her flag-carrier with her shoulders down. Rory Macnair took a Knockback square in the chest, glowed gold, and jogged the runback grinning. Yusra Shafiq ran her side on hand-signals alone, sharp as a sergeant. Lin held Caleb's right.

Someone — a Purple Beater — forgot, and bellowed a warning; the Room hosed his mouth mid-shout and forfeited the hit, and the benches very nearly laughed out loud before catching themselves.

Then the moment the hall would talk about all week: Caleb and Mei crossed at the centre going opposite ways for opposite flags, both raised the twin white-hair wands, and both loosed on reflex — and in the dead silence the two hexes *caught* between them, a bright knot, the tip-to-tip line snapping taut, the cores blazing at each other through the open ribs. A hundred people drew breath as one. The wands refused, again, in front of everyone. Caleb and Mei broke apart laughing soundlessly and ran on.

Three rounds, seven minutes each, close the whole way — and Gold edged it on the last capture, Mei and Liri's leopard cats over Caleb's owls. Beaten by his own fiancée, in silence, for a packed house.

When the final tone dropped and the glows released, the hall roared — half of them still trying to do it in a whisper, out of twenty-one minutes' habit. Caleb thumped Lin's shoulder, caught Mei's eye across the pitch, and climbed back up to the stand to take the voice off Esme and run the rest of the block with Liri beside him.

Esme handed it over, dust-dry. "Cofounders are off the floor. *Now* the rest of you get a turn." She passed Caleb the carrying-voice. "Next draw whenever you're ready, Waddell."

## User

*slightly muffled into the microphone* "Liri, my nose isn't brown. why do you keep saying that?" *normal voice* "Hope you enjoyed that Professor Henshaw... alright gang, shall we get to yelling for a change? Second match names will appear on the boards for your crackers."

## Narrator

▼ **Saturday, 17 September 1977 — 14:27**
*Room of Requirement — Hexfield*

Liri leaned into her side of the carrying-voice without a flicker. "Because you spent twenty-one minutes losing to your fiancée and *thanking the Room for the privilege,* Waddell. If the nose fits." The benches caught it and laughed — they could laugh now, the silence lifted, and the noise came back into the hall like a held breath let go.

Up in the box Henshaw lifted a hand — a dry little salute, *received and noted,* the man who'd taught them nonverbal Defence on Tuesday watching it come back at him as a sport on Saturday.

Caleb gave the hall the show of rolling straight on. The scoreboard wiped itself and began chalking the second match's names in gold beside the door, the cracker-basket refilling itself with a soft rustle. Down on the benches the fourth-years-and-up who'd been waiting all session started getting to their feet, checking the board for their names, the ordinary cheerful churn of a Hexfield draw — full-voiced this time.

Liri, off-mic, dry: "Two cofounders flat on the mat inside three minutes and they love us more for it. Don't ever say this game isn't rigged for charm." A nod at the filling board. "Go on, then. Call your draw."

## User

[[that happens]]

## Narrator

[[Ha — it does. Two cofounders eating mat in front of the whole school is exactly the kind of thing that happens, and the hall loving them harder for it is the rest of it.

I'm reading you as wanting to keep this light and not grind every cracker-draw. So whenever you're ready, say the word and I can: montage the rest of the open block (the way I did the silent match) and land you wherever the draw next drops you in to play; skip to the block winding down at 18:00; or jump clean ahead to the evening if you'd rather get to something else (the rowan-in-silver-water control's due a check tonight, and there's tomorrow's Yew Tree tea to prep for). Or just keep poking — your call. What do you want?]]

## User

[[yes, I mean, 40 some people, I am in a couple of matches, so it is mostly announcing about NPCs that I never see or will talk to about a field I can't see. I try to win during my games.]]

## Narrator

*(No content)*

## User

[[I will say maybe next week same time, same place as always, but next week might be the final open match, open field.. be thinking about the people they have played well with and who they want to play with because we may switch to coordinated teams for a portion to have an actual tournament, but still running normal games the first half because that is the point, inter house playing with roughly equally matched people so we all have fun and improve]]

## Narrator

▼ **Saturday, 17 September 1977 — 18:02**
*Room of Requirement — Hexfield*

The block ran its full length, and Caleb spent most of it at the stand with Liri, the two of them trading the carrying-voice back and forth over match after cracker-drawn match — a churn of mixed-house sides, names chalked and wiped on the board, Gold and Purple sorting and re-sorting down the long afternoon. The hall stayed near-full and loud. Henshaw kept his chair in the box, the session's staff observer, watching it run itself.

Twice the draw put Caleb's own name up, and twice he came down and played to win — new wand in hand the whole time. He took the first on a clean flag-run, ducking the low wall while Lin screened the lane behind him, and lost the second to a Hufflepuff Beater who caught him flat-footed between the columns and dropped him glowing two strides from the Purple pole. He took that one about as well as he'd taken losing to Mei: loudly, and laughing.

As six o'clock came on, he raised the voice for the last of it, the hall quieting to hear.

"Right — that's us. Same time next week, here, like always. Two o'clock." A beat. "Heads up, though. Next week might be our *last* fully open session for a while — the last proper everyone-in, draw-and-go free-for-all."

A murmur ran the benches. He talked over it, easy.

"First half, we'll still run normal games — because *that's the whole point of this thing.* Different houses, mixed sides, roughly even matches, everybody gets a game and everybody gets better. That doesn't go away." He let it land. "But the back half, we're going to try something. Coordinated teams. A proper little tournament."

Liri leaned in, dry: "Which means between now and then — *pay attention out there.* Who'd you play well with today? Who do you want at your shoulder when it counts?"

"Start thinking about it," Caleb finished, "because next week, you might get to pick." A grin. "Go on. Out. Dinner. *Cheers, all* — and cheers, Professor Henshaw, for the silent round, that one's yours."

The tone sounded the close; the glows died on the pitch; the hall got up in a great cheerful tide and began filing out toward the Great Hall and supper, the Room folding the course quietly away behind them.

[[Natural stopping point — block's done and supper's next. There's a fair bit buffered from today (the brother-wand build + its properties, the silver-water well anomalies, the bond-cast findings, Esme announcing, the tournament plan). Say `[save]` whenever and I'll flush it all to the log. Otherwise — supper, the rowan-in-silver-water control check tonight, or jump toward tomorrow's Yew Tree tea prep? Your call.]]

## User

"Liri...Liri....Liri.... look what I made"

## Narrator

▼ **Saturday, 17 September 1977 — 18:05**
*Room of Requirement — Hexfield, emptying*

Liri didn't need to ask whose hair it was. She'd knelt in that pumpkin-patch straw more than once, run the wood-lore for the feed with him, watched the white unicorn take silver water off Caleb's hands and no one else's. Her eyes went straight to the luminous thread down the open cage and she knew.

"...That's *hers.*" Quiet, the deadpan gone right out of it. "That's White Lightning's hair." She leaned close over the spiral without touching it, Cardiff vowels soft with something like reverence. "She *gave* you that. Of course she did." A breath. "You made the open-rib. The hard one. With *her* hair in it. Waddell, that's—" and for once Liri Penrose didn't have the dry line ready.

Mei came up off the pitch then, the twin already in her hand, and answered the unfinished thought by lifting it alongside his — the matched cage, the second white hair luminous down its heart. "There's two." She let that land. "Brother wands. They won't fight each other — you saw it, centre-pitch." A glance at Caleb, warm. "His and mine."

Across the thinning crowd Imogen was still on the floor, gathering herself after the block — and Caleb had three people to show now, and a notion building behind his eyes that involved a staff table and a great deal of showing off.

## User

*go with Mei to see what staff showed up*

## Narrator

▼ **Saturday, 17 September 1977 — 18:06**
*Room of Requirement — the professors' box*

The box had mostly emptied with the rest of the hall — a routine Saturday, not the inaugural circus — but Henshaw was still there, on his feet now, in no hurry, watching the Room fold its course away. Madam Hooch was just stepping down off the far end, a parting nod to him, gone before Caleb and Mei reached the rail.

Which left Henshaw, and Henshaw missed very little.

His eye went to the wands in their hands before either of them said a word — the two raw birch cages, the matched spirals, the white hair luminous down each open core. He went quiet the way perceptive men go quiet when something doesn't fit the ordinary shape of a Saturday.

"Those weren't in your hands last week." He came to the rail. Not asking permission, exactly — but not reaching, either; he knew better than to touch a wand. He looked at the craft of it first, the open ribs, the threaded ends. "Hand-cut. Both. *Matched.*" A beat, and the dryness came in under genuine regard. "Mr Waddell, I've taught seventh-years for a long time, and I can count on no hands the ones who turned up to my class having *made their own wand* over the weekend." His gaze settled, then, on the thing his eye had snagged on first — the pale thread shining down the cage. The war-awareness moved behind it, quiet and unmistakable. "That's unicorn in the core." Not a question. "Which is a curious thing for a student to have a length of. Wandmakers don't part with it lightly, and it isn't sold over a counter." He let it sit, even and unhurried, the door held open rather than pushed. "So. Where did a seventh-year come by unicorn hair?"

## User

"From a unicorn, obviously. do people not normally get theirs from their unicorns? I carried her out of the woods because she hurt her leg. and now she is in physical therapy."

## Narrator

▼ **Saturday, 17 September 1977 — 18:07**
*Room of Requirement — the professors' box*

Henshaw looked at him for a long moment, and then something at the corner of his mouth gave — not quite a smile, the thing a tired man does when a student has just told him something genuinely extraordinary in the same tone he'd use to report the weather.

"No, Mr Waddell," he said, dry as the chalk on the fading scoreboard. "People do not, as a general rule, *get theirs from their unicorns.* Most people do not have a unicorn. Most people who encounter one in the wild are gone over before they've finished being awed, because a wounded unicorn lets no one near it — least of all a grown wizard." He let that sit, the war-weight quiet under it. "You carried her out of the woods. With her leg hurt." Not disbelief. Recalibration. "And she let you. And then she gave you hair off her own tail — *twice,* by the count in your hands — to put in a wand you cut yourself."

His gaze moved between the two of them, the matched cages, the luminous cores, and rested a moment on Mei's before coming back.

"I'll not pretend I understand the half of that, and I'll not ask you to explain it standing in an empty box at suppertime." A beat. "But I taught you a silent shield charm on Tuesday and watched it come back at me as a *sport* on Saturday, and now you're telling me, between matches, that there's a recovering unicorn somewhere on these grounds that chose you." The dryness deepened, fond and a little helpless. "You are going to be a great deal of work, the pair of you. I can feel it coming." He nodded at the wand. "Does it *cast*? A core gives nothing it doesn't mean to. A pulled hair sits dead in the wood — a given one sings. So which is it?"

## User

"weren't you like right here the entire match watching us use them? you saw us linked together in combat twice because they are brother wands and refuse to fight?"

## Narrator

▼ **Saturday, 17 September 1977 — 18:08**
*Room of Requirement — the professors' box*

"I did." Henshaw conceded it without a flicker of defensiveness — a man who'd rather be corrected than pretend. "Centre-pitch, both times. The two of you reflex-cast at each other, and the spells *caught* in the air rather than landing — a knot of light, the wands straining toward one another." His eye went back to the matched cages, reassessing what he'd watched in a new light now he knew what was in them. "I took it for some clever trick of the Room at the time. A staged effect for the crowd." A slow breath. "It wasn't. That was the wands."

He looked, then, genuinely impressed in a way the craft alone hadn't quite pulled out of him.

"Brother wands. A shared core — same creature, one hair in each — and they will not be turned against each other. The old texts have it, but I've never *seen* it; you don't see it, because two wands sharing a unicorn's hair is vanishingly rare and putting them in the same duel rarer still." The dryness came back, warm. "And the pair of you have made them on purpose, with the hair of a unicorn that chose you, and you're carrying them about a school in wartime." A beat — and the war moved quietly under the words, there and gone. "Which is a beautiful thing, and a thing I'd think hard about who you show. Not me — I'm glad of it. But not everyone who'd find *that* interesting means a unicorn well." He let it rest, no heavier than it needed to be. "Mind — answer me honestly, because it matters more than the trick: do they cast *clean* otherwise? A jinx, a shield — does the wood sit right in your hand, or does it fight you?"

## User

"I mean, I dont feel like it does right now. you are welcome to see for yourself? I know grabbing one from somebody is in greatly poor taste but wandmakers and others do it, so I dont see the harm.... and I open invite them to come for my unicorn. room, could you send me a wall dummy over her please to show off his name proudly?"

## Narrator

▼ **Saturday, 17 September 1977 — 18:10**
*Room of Requirement — the professors' box*

The dummy the Room sent over wasn't blank. It rose up out of the floor a few paces off in full costume — black-and-white Breton stripes snug across its chest, a thin waxed moustache curled to villainous points, a spade-sharp evil beard beneath, and a neat card swinging at its throat in prim official lettering: **POACHER**.

Caleb gestured at it like a man unveiling a portrait. "*That's* what comes for her, Professor. Mime poacher. I made a couple earlier — figured you'd want to meet the enemy."

Henshaw looked at the striped, bearded effigy labelled **POACHER**, then back at Caleb, and the dryness went all the way through him at last.

"...You've built an *opponent.*" A long pause, taking in the moustache. "A striped, bearded, music-hall *opponent,* with a name-card, to represent the sort of person who'd come for a unicorn." The corner of his mouth gave fully now. "Mr Waddell, I cautioned you ten minutes ago to think carefully about who you show that wand to — and your answer was to conjure the villain in a *mime costume* and label him." He shook his head, defeated and a little delighted. "I suppose that *is* thinking about it. After a fashion."

## User

"yeah. I've decided I will skin anyone who looks at her the wrong way and tan that skin and make curtains out of it... what? you said you want to know if there is any other innovation in this? thank you for asking. the core isnt fixed. the ends are removable..... and yes, Monday when you train us to come back from war, we can do it outside and you can visit White Lightning... just dont forget what I said about the curtains and don't forget that you think everything I say is a joke and then it isn't....... can I show you a proper bit of witchcraft? while this dummy is here? because maybe we should talk about this Monday too." *I hand him the bottle of silver water*

## Narrator

▼ **Saturday, 17 September 1977 — 18:11**
*Room of Requirement — the professors' box*

"Curtains," Henshaw repeated, and started to laugh — then looked at Caleb's face, and the laugh thinned out into something more careful. "...I'm beginning to learn," he said slowly, "that you say a thing like that, and a man laughs, and then about a fortnight later he realises you weren't joking at all." He let it sit, dry and not entirely comfortable. "I'll take the curtains as read."

The innovation pulled him back toward delight despite himself. "The core *isn't fixed.*" His eye went to the threaded ends. "You can take it *out.* A wand built so the core can be changed —" he shook his head. "That's not how it's done. A wand's made to be sealed for life, one core, one wizard, settled together till one of them breaks. What a *swappable* one does — whether it ever truly settles, or only ever borrows — I couldn't tell you. Nobody could. That's a question for a bench, not a box." A glance, sharp and pleased. "But it's a real question. You've made a real question, Mr Waddell. Monday — outside, and I'll come down to your unicorn after. Gladly."

Then Caleb put the bottle in his hand.

Henshaw lifted it to the last of the hall-light by reflex — and went still. The water inside held the light the way water shouldn't, a slow cold silver turning in the glass, not settling, not falling. His thumb stopped on the cork. The dryness drained right out of his face, and the war-trained part of him — the part that *sensed worked things* — came forward and looked properly.

"...What is this." Not quite a question. Lower, careful, turning the bottle a half-inch and watching the silver lag behind the turn. "There's something *in* this. Not muck, not a brew — *working,* or something older than working, I can't—" He didn't finish. His eyes came up to Caleb's, and for the first time all evening the man looked genuinely unsettled. "Where did you get this?"

## User

"Forrest.. there are underground wells of it.. flowers grow on it... and that unicorn loves two things in this world, that and then me, and I'm not sure the order."

## Narrator

▼ **Saturday, 17 September 1977 — 18:12**
*Room of Requirement — the professors' box*

Henshaw turned the bottle once more, the silver lagging behind the glass, and listened to all of it without interrupting — the forest, the underground wells of the stuff, the flowers that grow on it, the unicorn who loves two things and might love the water first.

He didn't laugh at that one. He set the bottle down on the rail, careful, like a thing he didn't want to be holding when he answered.

"Underground wells. Flowers that grow on it." His voice had gone quiet and level, the war-tired weight all the way up in it now. "And it reads — to me, standing here — like something *worked,* except you're telling me nobody worked it. It comes up out of the ground on its own." He looked at the silver turning in the glass a moment longer. "That's worse, in a way. A made thing has a maker you can find and a reason you can name. A thing that's just *there,* in the ground, behaving like that —" He stopped. Didn't finish it.

His eyes came up to Caleb's, and to Mei's beside him, and something in him settled into a decision.

"I'm not going to pick this apart in a box at suppertime, and I'm not going to pretend I've a tidy answer, because I haven't, and a man who hands you a tidy answer to *that* is lying to you." A beat. "But you've handed me, in the space of ten minutes — a wand you cut yourself with a chosen unicorn's hair, a swappable core that oughtn't work, a unicorn that lets you carry her, and a bottle of water that makes the back of my neck go cold. That's not four marvels, Mr Waddell. That's *one thing,* with four faces, and you're standing in the middle of it." The quiet sharpened. "Monday. Outside, yes — but after, the three of us sit down somewhere with a door that shuts, and you tell me the whole of it from the start. Not because you're in trouble. Because you're carrying something large, and you oughtn't carry it with only a clever girl and a brave owl for company." A glance at Mei, not unkind. "No offence meant to present company. You'll know I mean it as the opposite."

He picked the bottle back up and held it out to Caleb, grip-first, the way he'd handed back the wand.

"Take your water. Keep it close, and don't go showing *that* to the curtain-candidates." The dryness flickered back, thin over the gravity. "Now — you said you wanted to show me a proper bit of witchcraft, while the striped felon's still standing. Go on, then. I've stopped assuming I know what you'll do next."

## User

*I stick my cherry wand down in the bottle, suck up the silver, and cast "Incarcerous" at the dummy*

## Narrator

▼ **Saturday, 17 September 1977 — 18:13**
*Room of Requirement — the professors' box*

Caleb dipped the cherry into the bottle and drew. The silver came up the wood readier than it had all day — that thin cold brightness climbing into the grain, into his fingers, the cold biting in fast. He levelled at the striped felon and spoke it clean.

"*Incarcerous!*"

Not a few coils. The ropes burst out of the cherry in a heavy silver rush, far more and far faster than the spell gives, snapping across the box and round the poacher in thick fast loops that bit down and *hauled* — cinching, and cinching tighter, the dummy's stuffing creaking under the pull, every cord of it beaded and cold and shining with that non-falling silver. POACHER A vanished inside a glowing cocoon of rope. The cold drained out of the cherry as it went, all of it pouring out into the cast at once, until the wand was just wood in his hand again and the bound dummy sat trussed and silvered, the placard pinned flat under a dozen loops.

The box was very quiet.

Henshaw didn't speak for a moment. He looked at the trussed felon, at the silver going slowly out of the ropes, at the bottle in Caleb's hand and the ordinary cherry wand beside it. When he did speak it was low, and the war was all the way up in it.

"...That water went *into* the spell." Flat. He'd watched it climb the wood. "You drew it up the wand and it came out in the Incarcerous — more rope, faster, colder, and *holding* like it meant it." His eyes came up. "A wand gives what its core and its wood allow, and not a thread more. That was your cherry, your unicorn hair — and it threw *twice* what it should have, because you fed it that." A long breath. "I have never seen magic take a charge off a *liquid.* Potions you drink. Reagents you brew. You don't *load a wand* with water like powder in a gun." He looked at the bottle as though it had got colder in the last ten seconds. "Monday. Behind a shut door. *All* of it." A beat, quieter still. "Does it do that every time?"

## User

"see, I think it drains it out of it.. like it is limited... I dont know... I cast a patronus into a jug and it rose out like a phoenix made out of a star, took all the ilver out of the water, and the unicorn with a broken leg stood straight up and started.... singing to it.... I dont know.. Mei was there.. singing? would you call it singing? vibrating at the patronus?"

## Narrator

▼ **Saturday, 17 September 1977 — 18:15**
*Room of Requirement — the professors' box*

"Right — your owl, then." Henshaw took the correction and re-set the picture, and somehow the truer version landed heavier than the phoenix had. "Not the form changing. The *behaviour.*" He said it slow, getting it exact. "A Patronus doesn't do that. It comes, it takes its shape, it *moves* — it circles, it patrols, it puts itself between you and the cold. That's the whole nature of the charm: a guardian that goes out and does its work." He looked at the bottle. "What you're describing didn't go out and work. Your owl rose up, spread its wings *in place,* and burned — far past any brightness the charm gives. It didn't guard. It just... *shone.* Held still and blazed." A beat. "That's not a Patronus doing its job. That's a Patronus being made to do *something else,* by what you drew it up through."

He was quiet a moment, working it.

"And the unicorn answered *that.* Not the owl-as-guardian — the owl-as-*light.*" His eyes went to Mei, then back. "Two creatures of the silver, near as I can tell. The water in the wand, the unicorn on the ground, and your Patronus turned into a third thing standing between them, blazing instead of guarding, and her up on a broken leg answering it." He shook his head slowly. "I keep reaching for the word *beacon* and I don't like reaching for words I can't back."

He pushed off the rail, gathering himself toward leaving — supper, the day, the weight of what he'd just been handed.

"I've kept you from your dinner, and I've a great deal to not-sleep over." The dryness came back, thin and tired and fond. "Monday. The three of us, a shut door, the whole thing from the first day — the unicorn, the water, the wand, the owl that wouldn't behave. And I'll come down and meet her before, in the daylight, as a man and not a riddle-solver." He paused at the step. "Bring the bottle. Don't bring the curtains." A last look, level and not unkind, at the two of them stood there with their matched wands. "Go and eat. Both of you. Whatever this is, it'll still be exactly this large in the morning — and you'll meet it better fed."

## User

[[I let her answer and that beat happen, then ask if we should involved McGonagall or Dumbledore on Monday.]]

## Narrator

▼ **Saturday, 17 September 1977 — 18:16**
*Room of Requirement — the professors' box*

Mei had been quiet through the telling, but Henshaw had asked her plainly, and she answered him the same way.

"It looked like him at first — the owl, the way it always comes. But you're right that it didn't *work.* It didn't put itself between Caleb and anything. It rose, and it held, and it burned." She gave the true thing over the tidy one. "It didn't feel like a guardian arriving. It felt like a *signal going up.* And White Lightning didn't startle at it the way an animal startles — she got up like she'd been *called.* What it answered to wasn't a shield. It was a summons. I don't know whose."

Henshaw went still. "...Summons. That's the word I wouldn't reach for."

Caleb let the beat settle, then put the real question down. "Monday, when we sit — do we bring Flitwick in? Or McGonagall, Dumbledore?" He held Henshaw's eye. "I'll be straight with you, sir. They already know a fair bit between them. This isn't the first large thing I've carried to a shut door this fortnight."

That recalibrated him visibly — not alarm, the look of a man revising how deep the water ran. "...Does it. Professor Flitwick. And Minerva. *Already.*" A pause, weighing it honestly. "Then I'll not duplicate a conversation they've half-had with you — that's how a thing falls between stools, every man assuming another holds the whole of it." He decided. "Here's my counsel. The unicorn that chose you, the creature mending on the grounds, the sport — that's mine to hold, gladly, with Pomona for the creature-care if you want her. I can keep that at my level." The gravity came down. "But water that wells up behaving like worked magic no one worked, and a Patronus turned to a *summons* over it — that is not a Defence master's to sit on alone. Flitwick is your Head of House, and if he already knows the shape of what you carry, he should have this piece of it. And Minerva, if she's holding the rest." He shouldered his bag. "So — Monday, the three of us first, the whole of it from the start, so I'm not the one man working blind. Then I think you take the bottle and the owl that wouldn't behave to *Flitwick,* and let him and Minerva decide between them whether it climbs to the Headmaster. I'd sooner walk in beside you than watch you carry it in alone." The dryness, last and tired: "Some things you bring to your Head of House. This is one. *Now* — dinner. Truly."

## User

*hold Mei's hand and go to dinner*

## Narrator

▼ **Saturday, 17 September 1977 — 18:18**
*Hogwarts — the grounds, toward the Great Hall*

Henshaw went his way with a last tired nod, and the Room folded the rest of itself quietly shut behind them — the box, the pitch, the trussed poacher, all of it gone back into bare seventh-floor wall as if none of it had been.

Caleb found Mei's hand. She took it without a word, her new wand already tucked away beside her walnut, and they went down together — the moving stairs, the entrance hall, out into the blue end of the September evening and back in through the great doors toward the noise and warmth and food.

The Hall was full and loud with the after-Hexfield crowd, half of them still arguing matches, somebody two tables down doing an unflattering impression of a silent-round talk-penalty to a circle of laughing fourth-years. The candles were up, the ceiling gone to a deep clear dusk, supper steaming the length of the tables. Athena was already in the rafters somewhere, having beaten them to it.

Mei squeezed his hand once before she let it go to sit. "Long day," she said, easy, the weight of the box left at the box. "Eat. We've a unicorn to feed after, and tomorrow to get through." A glance, dry and warm. "And you, Caleb Waddell, have *made a wand* today. Two of them." She sat. "Let the rest of it keep till Monday."

[[Good beat to break on if you want it. A lot stacked up across today that isn't in the log yet — the finished his-and-hers brother wands and their refuse-to-fight property, the silver-water-charges-a-wand findings + the summons-Patronus, the bond-can't-channel-a-cast result, Esme announcing, the Hexfield tournament plan, and the new Monday Henshaw→Flitwick disclosure thread. Say `[save]` and I'll flush it all. Otherwise: feed White Lightning tonight, check the rowan-in-silver-water control, or prep tomorrow's Yew Tree tea?]]

## User

"if we get to legally floo tomorrow anyway, can we take a brief detour just to talk to Eldower on our way back? make sure we are proceeding correctly?"

## Narrator

▼ **Saturday, 17 September 1977 — 18:20**
*Hogwarts — the Great Hall, supper*

Mei thought it over around a forkful, the planner in her already running the route. "We can — but let's be honest about what 'on the way back' means. Tomorrow's Floo is for the *tea.* Manchester and home. Diagon's not on that line; it's a second hop tacked on, and the leave we've got is your mother's table, not a Sunday loose in the Alley." A fair beat. "Not a mad ask, mind. Manchester to the Leaky, the Alley through to Hogsmeade after. Half an hour at Eldower's, no more."

Then the warm part came up under the dry. "And here's what I actually think. You cut an open-rib wand over a *weekend* — clean — with a given unicorn core hung dead-true in it. The man took you on before he'd watched you do anything near that." A small smile. "Walking in with it is the best thing you could put in front of him. He'll tell you exactly what you got right and wrong — which is the whole point — or he'll be quietly furious you didn't wait for him to watch. Either way you learn."

She set her fork down. "Two conditions. We square the detour so we're not Flooing where we've no leave to be — and that's easy, we're sat in front of Flitwick Monday regardless, and we owe him Eldower's letter anyway. And we send Eldower word *ahead,* because turning up at a back-lane workshop unannounced of a Sunday evening is how you find a locked door and a wasted trip." A glance, warm. "Do that, and yes. Gladly. I'd quite like to see his face when he sees the core."

## User

"oh, well, one of those doesn't make sense because two days from now chronologically occurs after one day from now.... like... always... and I don't think we have time to send word ahead. so if he isnt there, he just isnt there."

## Narrator

[[Ha — fair on both counts. Tomorrow (Sun 18 Sept) is one day out; the Flitwick sit-down is Monday (two days out), so I had Mei leaning on a conversation that hasn't happened yet to pre-square a trip that comes before it. Doesn't work. And no time to owl ahead — so it's a cold drop-in: he's there or he isn't. Fixing Mei's logic.]]

▼ **Saturday, 17 September 1977 — 18:21**
*Hogwarts — the Great Hall, supper*

Mei caught her own error and waved it off with the back of her fork. "You're right — Monday's *after* tomorrow, so I can't lean on Flitwick to bless a trip that happens before I've spoken to him. Scratch that." She thought again, cleaner this time. "Fine. The leave's for the tea, but a half-hour hop through Diagon on the way home isn't sneaking off to anything — it's a wand errand, and we've a standing reason to be at Eldower's. I'll not lose sleep over it."

She took a bite, conceding the rest. "And no, no time to send word — so it's a cold call. He's at the workshop of a Sunday evening or he isn't, and if the back door's locked, we've lost nothing but the walk down Slipshod Lane." A small shrug, easy. "Back-lane craftsman like that, my money's on him being *in* — men like that don't keep Sundays, they keep work. But we don't bank on it."

Then the warm bit, settling it. "So: tea first, properly — your mother gets the whole of us, not two people checking a watch. Then if there's daylight and a hearth free, we hop to the Alley and try his door. If he's there, you show him what you cut and he tells you what you got right. If he's not—" a glance, dry "—then he isn't, and you've still made a wand two professional men went quiet over today. Yes. Let's try it."

## User

"good... I wouldn't want you to lose sleep over it... after we just paralyzed the whomping Willow yesterday to run away from school through a secret tunnel at 3 PM just to go to Diagon Alley to visit him... good.. we could actually try to grab him and McGonagall if they are at breakfast... I mean... urgent.. I dont know.. but we dont have to make that call. and McGonagall was one of the people who went to the woods with us and brough WL back and she at least saw the flowers."

## Narrator

▼ **Saturday, 17 September 1977 — 18:22**
*Hogwarts — the Great Hall, supper*

"I'm aware of what we did yesterday." Mei said it perfectly level, the dryness so deep it almost passed for sincerity. "I was *there* for the part where you paralysed a tree the size of a barn to avoid using a corridor. A half-hour in Diagon after Sunday tea is, by the standard you've set this fortnight, the single most law-abiding thing either of us will do all week." She ate. "So no. I'll sleep fine."

Then the real suggestion, and she gave it proper thought.

"Breakfast, though — that's not a daft idea." She glanced toward the staff table, empty now but for the routine evening stragglers. "Flitwick and McGonagall both take breakfast most mornings. If you wanted to put the silver water and the Patronus in front of them *tomorrow* instead of waiting on Henshaw's Monday sit-down, breakfast is where you'd catch them both without making an appointment of it." A pause, weighing it honestly. "And you're right that Minerva's not coming to it cold — she walked into that wood with us, she helped bring White Lightning out, she *saw the flowers.* She's further along than Henshaw was an hour ago. You wouldn't be starting from nothing."

She set her fork down, level. "Here's the only thing I'd hold. Henshaw asked to sit with us first so he's not the one man working blind — and that was decent of him, and we said yes. If we take it to Flitwick and Minerva at breakfast tomorrow, *before* Henshaw, we've gone round the man who asked to be in the room." A small shrug. "Not the end of the world — he'd understand urgent. But if it's not truly urgent-tonight, there's a tidier version where Henshaw sits with us Monday morning *and then we all walk to McGonagall together,* nobody left blind, nobody gone round." A glance, leaving it with him. "So the question's only that — does this feel like a *tomorrow at breakfast* thing to you, or a *Monday, done properly, everyone in the room* thing? I genuinely don't know which. You've held more of it than I have."

## User

"oh.. I didnt fully follow.. what room is he in? that makes it sound like there is a meeting and everyone knows but him? and he also said we could invite him when we showed her if we wanted him there as well... so I'm confused.. you just tell me what to do."

## Narrator

▼ **Saturday, 17 September 1977 — 18:23**
*Hogwarts — the Great Hall, supper*

"No — that's my fault, I overcomplicated it. There's no meeting. Nobody's being left out of anything." Mei put it plain. "Henshaw asked one thing: that before this gets carried up to anyone senior, he gets to hear the whole story from you first — so he's useful in the room instead of blank. That's all. And he *offered* to come meet White Lightning whenever suits, and to walk in beside you to Flitwick. He's volunteering to help, not asking to be handled. I made it sound like a thing it isn't. Forget 'going round him' — it doesn't really apply."

She took his hand on the table, decisive now because he'd asked her to be.

"Here's what we do. Nothing tonight, nothing tomorrow. That water's sat in a bottle since Wednesday — it is not an emergency, and tomorrow belongs to your mother and that tea, full stop. We give that the whole day." A beat. "Monday: Henshaw sits with us like he asked, we tell him the lot, he comes and meets her, and *then* the three of us take the bottle to Flitwick together, with Minerva if he wants her. One clean day, everyone in the room, no one blind, no one ambushed at breakfast." A small squeeze. "If we happen to pass Flitwick or McGonagall at breakfast tomorrow, you smile and say there's something you'll want to show them this week. That's it. No briefing over the porridge." She let go to pick her fork back up. "That's what to do. Now eat — you asked me to decide, I've decided, and the decision is *kidney pie.*"

## User

"okidokie asian artichokey"

## Narrator

▼ **Saturday, 17 September 1977 — 18:24**

"You've been holding that one in since the forest, haven't you." Mei didn't look up from her plate, but the corner of her mouth had gone, and she'd stopped fighting it. "*Artichokey.* There it is. The fruit of a long day's thinking."

She nudged the pie dish an inch toward him — *eat* — and let the Hall's warm noise close back over the table: the after-Hexfield arguments, the candles high, the ceiling gone to deep blue dusk, Athena a dark shape dozing somewhere in the rafters above them.

"Plan stands," she said, easy, settling into her own supper. "Tonight's just this. We'll take her the next batch and her water after, look in on your soaking rowan, and then bed — you've slept about four hours since Tuesday and tomorrow's a long one." A glance, fond and dry. "So eat, okidokie. Whatever's left of the evening, it'll keep till you've a full plate behind you."

## User

*eat like a monster*

## Narrator

▼ **Saturday, 17 September 1977 — 18:31**
*Hogwarts — the Great Hall, supper*

He ate like something that had been let off a chain. Second helping of kidney pie, then a third; potatoes, bread torn and mopped through gravy, a slab of treacle tart that appeared and did not survive the encounter. Two days of running on nothing caught up all at once and he fed it into the floor.

Mei watched the demolition with frank, growing admiration, her own plate finished and pushed aside. "I take it back. I told you to eat like a person — this is *better.* This is a man making up a debt." She propped her chin on her hand. "There's a fourth-year down the table who's stopped eating to watch you. You've an audience."

Athena, smelling the carnage from above, dropped to the bench by his elbow on the off-chance, and got a forkful of kidney for her optimism.

When he finally slowed, full and warm and heavy with it, the Hall had thinned a little around them, the candles burning lower, the blue ceiling gone near to black. Mei stretched and stood, and held out her hand for his.

"Right. *Now* you're fed." She said it satisfied, like a box ticked. "Come on — White Lightning's batch, her water, a look at your rowan, and then I'm walking you to bed whether you fight it or not. You've earned the lot of it twice over." A glance, warm and dry. "Where to first — the kitchens for her food, or up for the silver water?"

## User

White Lightning's food does not come from the kitchen.

## Narrator

Hey, I've lost the thread on this — long conversations do this sometimes. Let's start a fresh conversation.

## User

White Lightning's food does not come from the kitchens. The silver water is also not up anywhere. It is stored with white lightning. I go with mine to the lean to at the pumpkin patch to feed Wyatt lightning

## Narrator

[[Fixing both: White Lightning eats her birch-and-rowan browse (kept at the lean-to, gathered from the forest), not anything from the kitchens — Mei's "kitchens for her food" line was wrong. And the silver water's working store is down at the lean-to with her, not up in the castle. So there's nothing to fetch from inside; Caleb just takes his flask and goes down to her. Corrected and on.]]

▼ **Saturday, 17 September 1977 — 18:47**
*Hogwarts grounds — Hagrid's pumpkin patch, the lean-to*

The evening had gone full dark by the time the path brought them down to the patch, the pumpkins humped black across the slope and the lean-to lit warm-gold from Hagrid's lantern hung off the cross-beam. Fang thumped his tail in the straw. Hagrid was sat where he'd been left, a hand resting easy on White Lightning's neck — and she had her head up and her ears swung toward Caleb before he'd cleared the last of the dark, that low greeting note already in her throat.

The store was there with her: the cut birch-and-rowan browse stacked under the lean-to's dry side, the corked demijohns of silver water in their row against the post.

Caleb came in slow and let her lip the first of the browse off his palm — birch, then rowan, the way she liked, refusing nothing he gave but the hawthorn there wasn't any of. Then a cupped handful of silver water; he drank his swallow first, the way she needed, and held the rest out flat for her to take.

Hagrid watched, easy in the lantern-light. "She's been right as rain since yeh left. Settled." A nod at the splinted leg, the careful set of her. "Mendin' clean. Yeh've a knack with her none of us've got."

## User

I say that I don't think I've earned it, and that is why I'm afraid. Check the transcripts for what I actually feed her. And also it is not required for me to drink silver water first. I did once out of curiosity

## Narrator

*(No content)*

## Narrator

[[Checked — the records have her on the birch-and-rowan **feed** (the cooked-down decoction, birch and rowan base with a hawthorn token she'll only take freed/concentrated, never as raw solid), plus the silver night-flowers she chooses herself. So I had her lipping raw browse off your palm and refusing hawthorn, which isn't right; fixing it. And dropping the drink-first entirely — that was a one-time curiosity thing, not something she needs.]]

▼ **Saturday, 17 September 1977 — 18:47**
*Hogwarts grounds — Hagrid's pumpkin patch, the lean-to*

The store was where it lived, down here with her: the covered pail of birch-and-rowan feed under the dry side of the lean-to, the corked demijohns of silver water in their row against the post. Caleb ladled her portion out — the dark cooked mash gone tacky and sweet-smelling, the hawthorn worked through it concentrated the way she'd take it — and she put her muzzle to it without ceremony, eating from the pail while he steadied it, that low contented sound going in her throat. The splinted leg held its careful angle. Athena had beaten them down and was a small shape up on the cross-beam beside Hagrid's lantern.

He poured the silver water into his cupped hands and held it flat for her, and she drank it from him the way she always did — no order to it, no waiting, just her taking what he offered.

He said it looking at her, not at them. "I don't think I've earned this. Any of it. She decided I was hers and I haven't done a thing to deserve a creature like her trusting me." A pause. "That's the part that scares me. Not that she'll go. That I've got something I never paid for and I don't know what happens when whatever picked me figures out it was wrong."

Hagrid was quiet a moment, one big hand resting easy on her flank. "Yeh carried her out of that wood on yer back, Caleb. Don' tell me yeh didn' do nothin'." He didn't push past that. Just let it sit, and went back to watching her eat.

Mei had come in close on his other side. She didn't argue the fear and she didn't make it bigger. "She's eating out of a pail you carried down here in the dark," she said, plain. "Whatever you think you owe — she's not keeping that ledger. Look at her."
