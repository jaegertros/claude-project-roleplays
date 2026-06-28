#!/usr/bin/env python3
"""
Clean exported RP transcripts for LLM context.

Default behavior is conservative:
- removes tracker/status blocks like [Tracker: ...] and [Inventory: ...]
- removes Claude/Chat export clutter: source URL, message timestamps, separators
- removes repeated command footers like *Type /? for commands.*
- normalizes turn headings to "## User" and "## Narrator"
- preserves actual RP prose, OOC corrections, dialogue, and scene time headers

Optional correction-retcon behavior:
- detects user turns that are correction-only bracketed notes, e.g. [[...]], [OOC: ...]
- when the next narrator turn clearly re-runs the scene with a fresh "▼" scene header,
  removes the previous narrator turn (the wrong version), removes the user's correction note,
  and keeps only the corrected scene from the narrator repair turn
- with --canon-notes, fact-only corrections that do not re-run a scene are kept as compact
  "Canon note" blocks instead of noisy OOC discussion

Usage:
    python rp_transcript_cleaner_v3.py "Greeting(3).md"
    python rp_transcript_cleaner_v3.py "Greeting(3).md" -o Greeting_cleaned.md
    python rp_transcript_cleaner_v3.py *.md --out-dir cleaned
    python rp_transcript_cleaner_v3.py "Greeting(3).md" --apply-correction-retcons
    python rp_transcript_cleaner_v3.py "Greeting(3).md" --apply-correction-retcons --canon-notes
"""

from __future__ import annotations

import argparse
import re
from collections import Counter
from dataclasses import dataclass
from pathlib import Path


TRACKER_LINE_RE = re.compile(r"^\s*\[(?:Tracker|Inventory):")
COMMAND_FOOTER_RE = re.compile(r"^\s*\*?Type /\? for commands\.\*?(?:\s*[—-].*)?\s*$")
MESSAGE_TIME_RE = re.compile(r"^message time:\s*\d{4}-\d{2}-\d{2}")
SOURCE_RE = re.compile(r"^>\s*From:\s+")
SEPARATOR_RE = re.compile(r"^---\s*$")
TURN_HEADER_RE = re.compile(r"(?m)^#?\s*(you asked|claude response)\s*$")
SCENE_HEADER_RE = re.compile(r"(?m)^\s*▼\s+")

# Deliberately broad, but only used when the user turn is bracket-only and the
# following narrator response looks like a repair. This avoids catching normal RP actions.
CORRECTION_HINT_RE = re.compile(
    r"\b("
    r"correction|correct|fix|wrong|retcon|back\s*up|reset|redo|rerun|re-run|"
    r"doesn.?t make sense|does not make sense|did not|didn.?t|was not|wasn.?t|"
    r"not what|not where|not there|no[,.;: ]|you said|you made|made up|inventing|"
    r"I would have|I was|that was not|that is not|isn.?t|should have"
    r")\b",
    re.IGNORECASE,
)

REPAIR_CUE_RE = re.compile(
    r"\b("
    r"OOC:|Backing up|Back up|backing up|retcon|retconned|corrected|correction|"
    r"fix|redo|re-running|rerunning|realigning|running with|confirmed|right\b|"
    r"fair callout|fair catch|you.?re right|got it"
    r")\b",
    re.IGNORECASE,
)

# Stronger evidence that the next narrator reply is replacing/repairing prior prose,
# not merely answering an OOC question before continuing. Used with bracket-only user notes.
STRONG_REPAIR_PREFACE_RE = re.compile(
    r"\b("
    r"Backing up|Back up|backing up|re-running|rerunning|redo|retcon|retconned|"
    r"fix(?:ing)?|correct(?:ed|ion)?|wrong|dropping|adjusting|realigning|"
    r"I (?:made|invented|had|scripted|wrote)|I should|should have"
    r")\b",
    re.IGNORECASE,
)

CANON_FACT_CUE_RE = re.compile(
    r"\b(locked in|confirmed|correct(?:ed)?|right|got it|from now on|going forward|on record|"
    r"actual(?:ly)?|canon|retconned|inventory corrected)\b",
    re.IGNORECASE,
)


@dataclass
class Turn:
    role: str  # "you asked" or "claude response"
    content: str
    removed: bool = False


def strip_export_lines(content: str, stats: Counter | None = None) -> str:
    """Remove per-turn export boilerplate without changing role headers."""
    out: list[str] = []
    for raw_line in content.splitlines():
        line = raw_line.rstrip()
        stripped = line.strip()

        if MESSAGE_TIME_RE.match(stripped):
            if stats is not None:
                stats["message_times_removed"] += 1
            continue

        if SEPARATOR_RE.match(stripped):
            if stats is not None:
                stats["separators_removed"] += 1
            continue

        out.append(line)

    return "\n".join(out).strip()


def clean_inner_lines(content: str, stats: Counter) -> str:
    """Remove tracker/inventory/footer clutter inside a single turn.

    Handles both one-line tracker/inventory records and occasional wrapped
    status blocks by skipping continuation lines until a closing bracket.
    """
    out: list[str] = []
    skipping_status_block: str | None = None

    for raw_line in content.splitlines():
        line = raw_line.rstrip()
        stripped = line.strip()

        if skipping_status_block:
            # Continuation of a wrapped tracker/inventory block.
            if "]" in stripped:
                skipping_status_block = None
            continue

        if SOURCE_RE.match(line):
            stats["source_url_removed"] += 1
            continue

        if TRACKER_LINE_RE.match(line):
            if stripped.startswith("[Tracker:"):
                stats["tracker_lines_removed"] += 1
                skipping_status_block = "Tracker" if "]" not in stripped else None
            else:
                stats["inventory_lines_removed"] += 1
                skipping_status_block = "Inventory" if "]" not in stripped else None
            continue

        if COMMAND_FOOTER_RE.match(stripped):
            stats["command_footers_removed"] += 1
            continue

        out.append(line)

    return "\n".join(out).strip()


def split_turns(text: str) -> tuple[str, list[Turn]]:
    parts = TURN_HEADER_RE.split(text)
    preamble = parts[0]
    turns: list[Turn] = []
    for i in range(1, len(parts), 2):
        turns.append(Turn(role=parts[i], content=parts[i + 1]))
    return preamble, turns


def is_bracket_only_user_note(content: str) -> bool:
    s = strip_export_lines(content).strip()
    if not s:
        return False

    # Common forms: [[...]], [OOC: ...], [correction...]
    if s.startswith("[[") and s.endswith("]]" ):
        return True
    if s.startswith("[OOC:") and s.endswith("]"):
        return True
    if s.startswith("[") and s.endswith("]") and "\n" not in s:
        return True
    return False


def looks_like_correction_user_turn(content: str) -> bool:
    s = strip_export_lines(content).strip()
    return is_bracket_only_user_note(s) and bool(CORRECTION_HINT_RE.search(s))


def repair_preface_before_scene(content: str) -> str:
    s = strip_export_lines(content).strip()
    match = SCENE_HEADER_RE.search(s)
    if not match:
        return ""
    return s[: match.start()]


def looks_like_high_confidence_scene_repair(user_content: str, repair_content: str) -> bool:
    """Detect [[correction]] -> OOC repair -> fresh scene restart.

    This catches short corrections like [[we did get points]] where the user note
    does not contain obvious correction keywords, but the narrator explicitly says
    it is backing up/fixing/re-running before a new scene header.
    """
    if not is_bracket_only_user_note(user_content):
        return False
    preface = repair_preface_before_scene(repair_content)
    return bool(preface and STRONG_REPAIR_PREFACE_RE.search(preface))


def looks_like_repair_response(content: str) -> bool:
    s = strip_export_lines(content).strip()
    return bool(REPAIR_CUE_RE.search(s[:2500]))


def keep_from_corrected_scene(content: str) -> str | None:
    """Return only the corrected scene restart from a repair response, if present."""
    s = strip_export_lines(content).strip()
    match = SCENE_HEADER_RE.search(s)
    if not match:
        return None
    return s[match.start():].strip()


def compact_canon_note(content: str) -> str:
    """
    Preserve the useful result of a fact-only correction without keeping the full OOC debate.
    This is intentionally light-touch: keep the first useful paragraph/list section.
    """
    s = strip_export_lines(content).strip()
    s = re.sub(r"^OOC:\s*", "", s, flags=re.IGNORECASE).strip()

    # Stop before the narrator asks to continue; that is UI/process clutter.
    s = re.split(r"\n\s*(?:Ready to keep going|Want me to|Better\?|Once you|Picking up|Running|Re-running|Backing up)", s, maxsplit=1)[0].strip()

    # Prefer all early paragraphs up to about 1200 chars, preserving bullets if present.
    paragraphs = re.split(r"\n\s*\n", s)
    kept: list[str] = []
    total = 0
    for para in paragraphs:
        para = para.strip()
        if not para:
            continue
        if total and total + len(para) > 1200:
            break
        kept.append(para)
        total += len(para)
        # For simple single-paragraph confirmations, one is enough.
        if total > 450 and not para.startswith(("-", "1.", "2.", "**")):
            break

    note = "\n\n".join(kept).strip()
    return f"> Canon note: {note}" if note else ""


def apply_correction_retcons(turns: list[Turn], stats: Counter, canon_notes: bool = False) -> None:
    """
    Remove wrong-version turns when a bracketed correction is followed by a narrator repair.

    Safe default: only performs the destructive retcon when the repair response has a fresh
    scene header. Fact-only repairs can be converted to compact canon notes when requested.
    """
    for i, turn in enumerate(turns):
        if turn.role != "you asked" or turn.removed:
            continue
        if i + 1 >= len(turns) or turns[i + 1].role != "claude response":
            continue
        repair_turn = turns[i + 1]
        corrected_scene = keep_from_corrected_scene(repair_turn.content)

        is_correction = looks_like_correction_user_turn(turn.content)
        is_scene_repair = looks_like_high_confidence_scene_repair(turn.content, repair_turn.content)
        if not (is_correction or is_scene_repair):
            continue

        # If the user explicitly said [[fix...]] / [[wrong...]] and the next
        # narrator turn is a fresh scene, accept it even when the narrator did
        # not include an OOC preface. Some corrected turns are clean reruns only.
        if not corrected_scene and not looks_like_repair_response(repair_turn.content):
            continue

        if corrected_scene:
            # Remove the immediately previous narrator response, because it is the wrong version.
            if i - 1 >= 0 and turns[i - 1].role == "claude response" and not turns[i - 1].removed:
                turns[i - 1].removed = True
                stats["wrong_narrator_turns_removed_for_corrections"] += 1

            turn.removed = True
            stats["correction_user_turns_removed"] += 1

            repair_turn.content = corrected_scene
            stats["repair_prefaces_removed_kept_corrected_scene"] += 1
            continue

        if canon_notes and CANON_FACT_CUE_RE.search(strip_export_lines(repair_turn.content)[:2500]):
            if i - 1 >= 0 and turns[i - 1].role == "claude response" and not turns[i - 1].removed:
                turns[i - 1].removed = True
                stats["wrong_narrator_turns_removed_for_corrections"] += 1

            turn.removed = True
            stats["correction_user_turns_removed"] += 1

            note = compact_canon_note(repair_turn.content)
            if note:
                repair_turn.content = note
                stats["fact_only_repairs_compacted_to_canon_notes"] += 1
            else:
                repair_turn.removed = True
                stats["fact_only_repairs_removed_empty"] += 1


def render_turns(preamble: str, turns: list[Turn], stats: Counter) -> str:
    out: list[str] = []

    preamble_clean = clean_inner_lines(strip_export_lines(preamble, stats), stats)
    if preamble_clean:
        out.append(preamble_clean)

    for turn in turns:
        if turn.removed:
            continue

        content = clean_inner_lines(strip_export_lines(turn.content, stats), stats)
        if not content:
            continue

        if out and out[-1].strip():
            out.append("")

        if turn.role == "you asked":
            stats["role_headers_normalized"] += 1
            out.append("## User")
        else:
            stats["role_headers_normalized"] += 1
            out.append("## Narrator")
        out.append("")
        out.append(content)

    cleaned = "\n".join(out)
    cleaned = re.sub(r"\n{3,}", "\n\n", cleaned).strip() + "\n"
    return cleaned


def clean_text(text: str, apply_correction_retcons_flag: bool = False, canon_notes: bool = False) -> tuple[str, Counter]:
    stats: Counter = Counter()
    preamble, turns = split_turns(text)

    if turns:
        if apply_correction_retcons_flag:
            apply_correction_retcons(turns, stats, canon_notes=canon_notes)
        cleaned = render_turns(preamble, turns, stats)
    else:
        # Fallback for already-normalized or non-export files.
        cleaned = clean_inner_lines(strip_export_lines(text, stats), stats)
        cleaned = re.sub(r"\n{3,}", "\n\n", cleaned).strip() + "\n"

    return cleaned, stats


def default_output_path(path: Path, out_dir: Path | None, suffix_label: str = "cleaned_for_LLM") -> Path:
    stem = path.stem
    suffix = path.suffix or ".md"
    name = f"{stem}_{suffix_label}{suffix}"
    return (out_dir / name) if out_dir else path.with_name(name)


def main() -> None:
    parser = argparse.ArgumentParser(description="Clean RP markdown transcripts for LLM context.")
    parser.add_argument("files", nargs="+", type=Path, help="Input .md transcript files")
    parser.add_argument("-o", "--output", type=Path, help="Output path; only valid with one input file")
    parser.add_argument("--out-dir", type=Path, help="Directory for cleaned outputs")
    parser.add_argument(
        "--apply-correction-retcons",
        action="store_true",
        help="Remove bracketed correction turns, the immediately previous wrong narrator turn, and repair prefaces when a corrected scene restart is detected.",
    )
    parser.add_argument(
        "--canon-notes",
        action="store_true",
        help="With --apply-correction-retcons, compact fact-only repairs into short Canon note blocks. Without this, only scene re-runs are retconned.",
    )
    args = parser.parse_args()

    if args.output and len(args.files) != 1:
        parser.error("--output can only be used with one input file")
    if args.output and args.out_dir:
        parser.error("Use either --output or --out-dir, not both")
    if args.canon_notes and not args.apply_correction_retcons:
        parser.error("--canon-notes requires --apply-correction-retcons")

    if args.out_dir:
        args.out_dir.mkdir(parents=True, exist_ok=True)

    for input_path in args.files:
        text = input_path.read_text(encoding="utf-8", errors="replace")
        cleaned, stats = clean_text(
            text,
            apply_correction_retcons_flag=args.apply_correction_retcons,
            canon_notes=args.canon_notes,
        )

        label = "cleaned_for_LLM_retcons" if args.apply_correction_retcons else "cleaned_for_LLM"
        output_path = args.output if args.output else default_output_path(input_path, args.out_dir, label)
        output_path.write_text(cleaned, encoding="utf-8")

        print(f"{input_path} -> {output_path}")
        print(f"  chars: {len(text):,} -> {len(cleaned):,} ({len(text)-len(cleaned):,} removed)")
        for key, value in sorted(stats.items()):
            print(f"  {key}: {value:,}")


if __name__ == "__main__":
    main()
