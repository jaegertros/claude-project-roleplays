# marauders-state — live state MCP

A thin, live FastMCP server over the campaign state. It does **not** copy state
anywhere — its source of truth is the two files the rest of the toolchain uses:

    ../state/marauders-state.json          (core)
    ../state/marauders-relationships.json  (standing registry)

The narrator reads/writes state through MCP tools during play; the live panel
(`../marauders-tracker-live.html`) calls `get_full()` to render it. holystone's
recall tools are mounted on the **same** server, so one endpoint serves state
AND memory.

## Tools
- `get_state(section?)`, `get_relationships(group?, name?)`, `get_full()`
- `update_state(patch_json)`, `set_value(path, value_json)`
- `add_thread(text)`, `resolve_thread(substring)`, `set_flag(name, value)`
- `update_relationship(group, name, patch_json)`
- `recall`, `find_quote`, `list_sessions`  ← mounted from holystone

## Install (one-time)
```
pip install -e .              # or: pip install -r requirements.txt
# recall needs holystone importable — you already have it; if not:
pip install -e C:\Users\cwadd\Documents\GitHub\holystone
```

## Run

**A. Local stdio — Claude Desktop (narrator calls tools mid-play).**
Add to `claude_desktop_config.json`:
```json
"mcpServers": {
  "marauders-state": {
    "command": "python",
    "args": ["C:\\Users\\cwadd\\Documents\\GitHub\\llm-roleplay\\projects\\Harry Potter\\Marauders\\marauders-state-mcp\\server.py"]
  }
}
```
Restart Desktop. Now the narrator can call `get_state` / `update_state` / `set_flag`
etc., and recall — all from one server.

**B. Local HTTP — the live panel, no tunnel needed.**
```
set MARAUDERS_REST_TOKEN=pick-a-secret
python server.py --http --host 127.0.0.1 --port 8800
```
Open `../marauders-tracker-live.html` in your browser, set the URL to
`http://127.0.0.1:8800` and the token, click **Reload**. It re-fetches live each
time. (CORS is open; localhost needs no HTTPS.)

**C. Remote HTTP — for a claude.ai / Cowork artifact.**
Run B, then expose :8800 over HTTPS with a tunnel (cloudflared/ngrok) and use that
public URL + token in the panel (or paste the panel HTML into a claude.ai artifact).
> Security: the endpoint returns your campaign data. Always set the token; only
> serve over HTTPS; never expose it open.

## Precedence
When this server is connected, prefer its tools over hand-editing the JSON — both
hit the same files, but the tools keep `last_reconciled`/`clock` tidy and are
harder to corrupt. The skill + `build_tracker.py` still work unchanged.

## Env
- `MARAUDERS_STATE_DIR` — override the state dir (default `../state`)
- `MARAUDERS_REST_TOKEN` (or `HOLYSTONE_REST_TOKEN`) — bearer token for `/rest`

## Vectorization (the workbench's memory-building side)

`vectorlab.py` mounts five more tools on this same server, so one endpoint does
state + memory + **vectorization management**:

- `vec_list_models` — your current embedder + the same-model rule. (OpenRouter
  doesn't enumerate embedding models, so there's no auto-populated picker; pass any
  model id to try it.)
- `vec_list_corpora` — the manifest: which files are embedded, with which model + dim.
- `vec_embed_file(path, project, model?, input_mode?, store, session?, date?)` —
  embed any file. `store` = `db` | `local` | `both`. The corpus is auto **tagged by
  model** (DB project `marauders@<model-slug>`, local file `<corpus>-<dim>.vec.json`).
- `vec_local_recall(corpus_file, query, k)` — query a portable local vector file
  (embeds the query with that file's own model, so the comparison is valid).
- `vec_drop_corpus(project_id)` — delete a model-tagged DB corpus (clean up experiments).

### Why everything is tagged by model
Embeddings are model-specific: a corpus built with model X can only be queried with
model X at the same dimension. So each corpus carries its model in three places — the
DB `project_id`, the local filename, and `state/corpus_manifest.json` — and you always
know which query-model to pair with which corpus. To compare a *different*
vectorization, embed into a new tag (`marauders@<other-model>`); the original is
untouched.

### Two stores
- **DB** (holystone Postgres): live recall via `recall`/`find_quote` on the matching
  `project_id`. One model per corpus.
- **Local** (`state/vectors/*.vec.json`): portable, named by model, queried with
  `vec_local_recall`. This is the path for trying embedders OpenRouter can't serve
  (e.g. a local sentence-transformers model) — point `HOLYSTONE_EMBED_MODEL` at it or
  extend `vectorlab.embed_file`'s embedder hook.

### Manifest
`state/corpus_manifest.json` is the record of truth for "what's embedded where":
per corpus — `model`, `dim`, `input_mode`, `store`, `local_file`, and each session's
source file + sha1 + chunk count. Backfilled for the live `marauders` corpus.
