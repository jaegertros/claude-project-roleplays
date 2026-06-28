# Full embedding trial — efficient & resumable

`full_trials.py` embeds the WHOLE corpus (every ~1000-char chunk of all 11 RP
files) with all 13 OpenRouter embedding models, scores each on the 20-query eval,
and writes a ranked scoreboard. Rewritten to be fast and robust:

- vectors stored as compact float32 **.npy** (not giant JSON)
- scoring is a vectorized numpy matmul (instant)
- **resumable**: checkpoints every few batches; rerun to continue after any stop
- disk kept small: each model's vectors are discarded once it's scored
  (set `KEEP_VECTORS=1` to keep them, e.g. to promote a winner to live use)

## Run
    python full_trials.py
Rerun the same command if it's interrupted — it picks up where it left off.

Requirements: holystone importable (you have it) + `OPENROUTER_API_KEY` in
`holystone/.env` (auto-loaded), and `numpy` (`pip install numpy`).
~20-40 min, ~$0.15 total.

Output: `full_results.md` (ranked scoreboard) + `full_results.json`.
Progress: `full_progress.json`; shared chunk text: `state/vectors/_full_work/chunks.json`.

## Knobs (optional)
- `KEEP_VECTORS=1`  keep each model's .npy after scoring
- `MAXCHUNKS=200`   only embed the first N chunks (quick smoke test)
- `$env:OPENROUTER_API_KEY="sk-..."`  set the key by hand in PowerShell if needed
  (note: `set VAR=...` is cmd syntax and does NOT work in PowerShell)

## Fresh restart
Empty/delete `full_progress.json`, `full_results.json`, and
`state/vectors/_full_work/` then run again.

> Verified here on a capped smoke test: it embedded, scored, discarded, and
> RESUMED across interruptions for 5 models (incl. bge and pplx-embed). The
> earlier "OPENROUTER_API_KEY is not set" and the 149 MB-JSON stall are both fixed.
