# Sankt Hjalmar — Logbook

A standalone Vite + React + TypeScript tracker for the **Hjalmar** roleplay project: a 1715 Caribbean free-port narrative set in Sankt Hjalmar, a Danish-Norwegian volcanic-island free port in the eastern Caribbean. The tracker is the canonical record of Caleb Eriksohn's inventory, money, status, identity discoveries, the three marks, the Knowledge Wall (Player / Body / World), the eight faction blocks, theories, journal, and crew.

## Aesthetic

A deliberate 1715 logbook: parchment background with a subtle paper-grain noise texture; double-rule ink borders on every panel; small-caps Cinzel headers; Cormorant Garamond body in a generously sized serif; Courier Prime for the canonical tracking block so it reads as a typewritten manifest. Accents in navy, teak, brass, sea-glass, and blood-red. The convergence-window banner turns blood-red on Day 10-14 to signal that the campaign has left cold-open territory. The three marks are rendered as small inline-SVG illustrations — abstract, evocative, in ink-faded tones.

## Install & run

```sh
npm install
npm run dev      # opens at http://localhost:5173
npm run build    # type-checks and bundles
npm run preview  # serve the production build
```

## State

State persists to `localStorage` under the key `hjalmar-tracker:state:v1`. There is no server and no MCP integration in this round — the tracker is the source of truth, edited manually from the panels. Use Settings → Export / Import to back up or transfer the JSON.

## Future

- A native window via Tauri (`src-tauri/`) so the logbook can pin on top of a chat window.
- An MCP server (`hjalmar-state/`) mirroring the Vault 49 / Allegheny pattern, so the narrator can write to the tracker directly.
- Auto-time-advance hints when the player marks 4-6 exchanges per phase.
