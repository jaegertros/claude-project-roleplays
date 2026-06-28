# Vault 83 — SillyTavern Character Cards

42 character cards in SillyTavern Character Card V2 spec format (`chara_card_v2` / `spec_version: 2.0`). Each is a standalone `.json` file ready for import into SillyTavern.

## What's in the bundle

- `vault83-character-cards.zip` — all 42 cards, one JSON file each
- `vault83-cards/` — the unzipped directory version

## Import into SillyTavern

**Individual import:** SillyTavern accepts single V2 card JSON files via `Character Management → Import Character (from file)`. Drop in the JSON, or the entire folder.

**Bulk import:** many ST forks support folder-drop or zip-import. Use whichever your install supports.

**Group chat:** create a new group in ST, add the narrator card + any character cards you want active for a scene. The bridge architecture (claude.ai engine → ST frontend) routes by `**Name:**` speaker tag — add whichever cards you expect to speak.

## Card roster

**Narrator + Protagonist (2):**
- `Vault_83_Narrator.json` — GM card, carries the week's premise
- `Teague_Protagonist.json` — shell card for the user's own protagonist (edit description before use)

**Romance pool (6):**
- `Beatrix_Novak.json` — Liaison, 22, childhood friend, Opening D
- `Reeve_Callender.json` — Tier 1b → Tier 4, 38, cross-tier, the week's moral center
- `Linnet_Abernathy.json` — Tier 3a, 26, the warmest
- `Samia_Reyes.json` — Tier 2a, 29, electronics tradesperson, the PA favor
- `Nessa_Galvin.json` — Tier 4a, 24, Galley cook, the most radical Exit
- `Verity_Callender-Voss.json` — Tier 1c, 24, the antagonist's daughter

**Load-bearing NPCs (4):**
- `Camille_Wren.json` — Tier 1a Archivist, DEPTH 3 route
- `Irena_Teague.json` — Liaison elder, DEPTH 3 route via oral tradition
- `Eldon_Callender-Voss.json` — Tier 1a, week's primary antagonist-by-position
- `Wren_Gallagher.json` — Tier 1a Chief Administrator, ceremonial face

**Tier 1 secondary (6):**
- `Dr_Hadrian_Oke.json` — Chief Physician
- `Garson_Locke.json` — Senior Engineer (one of Dane's plants; does not know)
- `Miriam_Callender.json` — rumor-carrier, 1b widow
- `Felix_Brunell.json` — Mathematics Instructor, Tribunal abstainer
- `Wynn_Dorrance.json` — Composer, peripheral
- `Theo_Callender-Voss.json` — Verity's unreflective younger brother

**Tier 2 (4):**
- `Mira_Hoad.json` — Tribunal YES vote, purchased with housing
- `Mrs_Petra_Ashdown.json` — Tailor, vault warmth
- `Harrin_Keep.json` — Tribunal YES vote, housing advancement
- `Owen_Fenn_Sr.json` — Cook, father of the Liaison Owen Jr.

**Tier 3 (5):**
- `Tess_Oloyede.json` — Tribunal YES, hydroponics plot deal
- `Harold_Mackie.json` — Cook (one of Dane's plants; family; does not know)
- `Reese_Hoad.json` — Reeve's secret student, Mira's son
- `Delia_Oloyede.json` — hydroponics worker, dating Kit Abadi
- `Old_Pell_Mackie.json` — Tier 3b retiree, Harold's father

**Tier 4 (5):**
- `Jessa_Yarrow.json` — Dead-room attendant, Nessa's mother
- `Old_Hew_Mackie.json` — Tier 4b elder (one of Dane's plants; does not know)
- `Marlon_Galvin.json` — Sanitation supervisor, Nessa's brother
- `Ida_Thale.json` — Widow, soap-maker (Opening B stroke variant)
- `Marta_Thale.json` — Tribunal NO vote, Ida's niece

**Liaisons (9):**
- `Ezra_Teague.json` — Senior Liaison, protagonist's father
- `Mae_Teague.json` — protagonist's mother
- `Gideon_Wright.json` — retired, Irena's husband, 80
- `Owen_Fenn_Jr.json` — engaged to Ruth
- `Hest_Sejic.json` — Head Liaison
- `Nadia_Abadi.json` — mother of Arden and Simi
- `Marcus_Sejic.json` — Nadia's husband, Hest's nephew
- `Ruth_Osundairo.json` — engaged to Owen Jr.
- `Kit_Abadi.json` — caste record-keeper, dating Delia

**Minor (1):**
- `Mrs_Linnea_Keep.json` — Eldon's secretary, Harrin's wife, Opening A

**Total: 42 cards**

## Excluded (child safety)

The following named characters are under 18 and are NOT represented in this bundle:

- Pip Novak (14, Beatrix's brother)
- Arden Abadi-Sejic (6)
- Simi Abadi-Sejic (3)
- The two unnamed Liaison children under 10

These are present in the RP as corridor texture and referenced by name where relevant in adult character cards — but they do not get their own cards, portraits, or first-message dialogue. Treat them as narrative-only presences.

## Card structure

Each card follows the V2 spec:

```json
{
  "spec": "chara_card_v2",
  "spec_version": "2.0",
  "data": {
    "name": "...",
    "description": "Physical + role + voice + week-specific state",
    "personality": "One-line summary",
    "scenario": "Where/when the user encounters them",
    "first_mes": "Opening scene line when user engages",
    "mes_example": "<START>\\n{{user}}: ...\\n{{char}}: ...",
    "creator_notes": "V83-build-specific guidance for ST users",
    "system_prompt": "",
    "post_history_instructions": "",
    "alternate_greetings": [],
    "tags": ["vault-83", "tier-Xa", "romance", ...],
    "creator": "Vault 83 build",
    "character_version": "1.0",
    "extensions": {}
  }
}
```

`system_prompt` and `post_history_instructions` are intentionally empty — the narrator system prompt lives in `PROJECT_INSTRUCTIONS.md` in the claude.ai project. These cards are designed for the bridge architecture where claude.ai is the engine and ST is the frontend.

For standalone ST use (no bridge), the individual cards will each chat as themselves, but without the V83 world logic (tier dynamics, DEPTH system, committed week-beats). For the full experience, use the bridge.

## Tags

Every card has at minimum `vault-83` and `fallout`. Other tags used:
- Tier: `tier-1a`, `tier-1b`, `tier-1c`, `tier-2a`, `tier-2b`, `tier-2c`, `tier-3a`, `tier-3b`, `tier-4a`, `tier-4b`, `liaison`
- Role: `romance`, `antagonist`, `major`, `elder`, `doctor`, `cook`, `engineer`, `archivist`, etc.
- Structure: `tribunal`, `depth-3`, `depth-5-plant`, `teague-family`, `callender-voss`, `mackie`, `galvin-yarrow`

Filter in ST to surface specific sub-casts (e.g., `romance` for the six romance options, `depth-5-plant` for the three Dane-tampering load-bearers).

## Portraits

The cards do NOT embed portraits — V2 cards are JSON-only. Portraits are expected to be supplied as matching `.png` files in ST's card directory, OR as PNG character cards (V2 cards embedded in PNG metadata, the format ST prefers for visual work).

Generate portraits using the prompts in `CHARACTER_CARD_PROMPTS.md` (from the main V83 knowledge-base bundle) and convert the JSON + portrait into PNG cards using a tool like **ccard** or ST's built-in PNG export.

## Next steps

1. Import the bundle into ST.
2. Generate portraits from `CHARACTER_CARD_PROMPTS.md`.
3. Combine JSON + portrait into PNG cards (ST handles this via its character editor).
4. If running the bridge: set up ST → bridge extension → claude.ai, and use the narrator card as the group-chat GM.
5. If running standalone: pick one card to chat with at a time; the V83 world will be thin but present.

Ascent is American.
