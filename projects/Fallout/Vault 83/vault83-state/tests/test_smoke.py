"""Smoke tests for vault83-state. Run with: pytest tests/

Uses a temporary HOME directory; the local-JSON path is under test.
Supabase mirror calls are stubbed out via monkeypatching the _append_*
helpers; add_journal_entry gets a fake row so it reports ok=True.
Adapted from hohenwald_state.tests.test_smoke.
"""

from __future__ import annotations

import os
import shutil
import tempfile
import unittest
from pathlib import Path


class Vault83StateSmokeTest(unittest.TestCase):
    """Verify core tools work end-to-end against an isolated state dir."""

    def setUp(self) -> None:
        self.test_home = tempfile.mkdtemp(prefix="vault83-state-test-")
        self._orig_home = os.environ.get("HOME")
        self._orig_userprofile = os.environ.get("USERPROFILE")
        os.environ["HOME"] = self.test_home
        # Windows: Path.home() consults USERPROFILE before HOME.
        os.environ["USERPROFILE"] = self.test_home

        # Stub the Supabase mirror helpers so unit tests don't require
        # a live client. The journal helper returns a synthetic row so
        # add_journal_entry can report success.
        from vault83_state import supabase_tools as _st
        self._orig_appenders: dict[str, object] = {}
        for name in (
            "_append_tier_transition",
            "_append_advancement_review",
            "_append_ledger_view",
            "_append_depth_log",
            "_append_anchor_attendance",
            "_append_ending",
        ):
            self._orig_appenders[name] = getattr(_st, name)
            setattr(_st, name, lambda *a, **kw: None)

        def _fake_journal(*a, **kw):
            return {
                "in_game_day": kw.get("in_game_day"),
                "in_game_time": kw.get("in_game_time"),
                "entry": kw.get("entry"),
                "note_type": kw.get("note_type"),
            }
        self._orig_appenders["_append_journal_entry"] = _st._append_journal_entry
        _st._append_journal_entry = _fake_journal  # type: ignore[assignment]

    def tearDown(self) -> None:
        shutil.rmtree(self.test_home, ignore_errors=True)
        if self._orig_home is not None:
            os.environ["HOME"] = self._orig_home
        elif "HOME" in os.environ:
            del os.environ["HOME"]
        if self._orig_userprofile is not None:
            os.environ["USERPROFILE"] = self._orig_userprofile
        elif "USERPROFILE" in os.environ:
            del os.environ["USERPROFILE"]

        from vault83_state import supabase_tools as _st
        for name, fn in self._orig_appenders.items():
            setattr(_st, name, fn)

    # ----- core lifecycle -----

    def test_package_import(self) -> None:
        import vault83_state
        self.assertEqual(vault83_state.__version__, "0.1.0")

    def test_start_session_mints_playthrough(self) -> None:
        from vault83_state.server import start_session, get_state

        r = start_session(project="v83_test", session_note="Day 1, Monday morning")
        self.assertTrue(r["ok"], r)
        self.assertIsNotNone(r["playthrough_id"])

        # State file actually created on disk.
        state_file = Path(self.test_home) / ".vault83-state" / "v83_test.json"
        self.assertTrue(state_file.exists())

        s = get_state(project="v83_test")
        self.assertTrue(s["ok"])
        self.assertEqual(s["state"]["clock"]["story_day"], 1)
        self.assertEqual(s["state"]["clock"]["day_of_week"], "Monday")
        self.assertEqual(s["state"]["clock"]["depth"], 0)
        self.assertEqual(s["state"]["clock"]["level"], "2")
        self.assertEqual(s["state"]["player"]["family_name"], "Teague")
        self.assertEqual(s["state"]["player"]["profession"], "liaison")

    def test_register_resident_and_tier_transition(self) -> None:
        from vault83_state.server import (
            start_session, register_resident, record_tier_transition, get_state,
        )

        P = "v83_tier"
        start_session(project=P)

        r = register_resident(
            project=P, character_id="REEVE",
            display_name="Dr. Reeve Callender",
            original_tier="1b", level="1", room_slug="1b-09",
        )
        self.assertTrue(r["ok"], r)
        self.assertTrue(r["created"])
        self.assertEqual(r["resident"]["current_tier"], "1b")
        self.assertEqual(r["resident"]["original_tier"], "1b")

        # Bad tier rejected.
        r = record_tier_transition(
            project=P, character_id="REEVE",
            from_tier="1b", to_tier="hellfire",
            reason="advancement_review",
        )
        self.assertFalse(r["ok"])

        # Bad reason rejected.
        r = record_tier_transition(
            project=P, character_id="REEVE",
            from_tier="1b", to_tier="4b",
            reason="just_because",
        )
        self.assertFalse(r["ok"])

        # Valid Day-3 demotion path.
        r = record_tier_transition(
            project=P, character_id="REEVE",
            from_tier="1b", to_tier="4b",
            reason="advancement_review",
            story_day=3, story_time="17:30",
            notes="Tribunal returned 8-1; demotion to sanitation apprenticeship",
        )
        self.assertTrue(r["ok"], r)
        self.assertEqual(r["transition"]["to_tier"], "4b")

        s = get_state(project=P)
        self.assertEqual(s["state"]["residents"]["REEVE"]["current_tier"], "4b")
        self.assertEqual(s["state"]["residents"]["REEVE"]["original_tier"], "1b")
        self.assertTrue(s["state"]["flags"]["reeve_demotion_executed"])

    def test_record_advancement_review_decision_flow(self) -> None:
        from vault83_state.server import (
            start_session, register_resident,
            record_advancement_review_decision, get_state,
        )

        P = "v83_review"
        start_session(project=P)
        register_resident(
            project=P, character_id="REEVE",
            display_name="Dr. Reeve Callender",
            original_tier="1b", level="1", room_slug="1b-09",
        )

        # Bad decision rejected.
        r = record_advancement_review_decision(
            project=P, character_id="REEVE",
            decision="vibes",
        )
        self.assertFalse(r["ok"])

        # A demotion_passed must supply to_tier.
        r = record_advancement_review_decision(
            project=P, character_id="REEVE",
            decision="demotion_passed",
            from_tier="1b",
        )
        self.assertFalse(r["ok"])

        # Valid demotion_passed; flips flags, mirrors a tier transition.
        r = record_advancement_review_decision(
            project=P, character_id="REEVE",
            decision="demotion_passed",
            from_tier="1b", to_tier="4b",
            basis="seed coalition / housing motive",
            notes="weighted 8-1",
        )
        self.assertTrue(r["ok"], r)
        self.assertEqual(r["review"]["decision"], "demotion_passed")

        s = get_state(project=P)
        self.assertEqual(s["state"]["residents"]["REEVE"]["current_tier"], "4b")
        self.assertTrue(s["state"]["flags"]["advancement_review_attended"])
        self.assertTrue(s["state"]["flags"]["reeve_demotion_executed"])

    def test_bump_depth_monotonic_and_flag_side_effects(self) -> None:
        from vault83_state.server import start_session, bump_depth, get_state

        P = "v83_depth"
        start_session(project=P)

        r = bump_depth(project=P, new_depth=3, reason="Camille hinted at the founding records")
        self.assertTrue(r["ok"], r)
        self.assertEqual(r["to_depth"], 3)

        s = get_state(project=P)
        self.assertTrue(s["state"]["flags"]["tier_protocol_revealed"])

        # Regression rejected.
        r = bump_depth(project=P, new_depth=2, reason="should fail")
        self.assertFalse(r["ok"])
        self.assertIn("monotonic", r["error"].lower())

        # Same value also rejected.
        r = bump_depth(project=P, new_depth=3, reason="should also fail")
        self.assertFalse(r["ok"])

        # Out-of-range rejected.
        r = bump_depth(project=P, new_depth=9, reason="off the ladder")
        self.assertFalse(r["ok"])

        # DEPTH 4 flips sub_basement_corridor_known.
        r = bump_depth(project=P, new_depth=4, reason="Irena's grandfather story")
        self.assertTrue(r["ok"], r)
        s = get_state(project=P)
        self.assertTrue(s["state"]["flags"]["sub_basement_corridor_known"])

    def test_journal_entry(self) -> None:
        from vault83_state.server import start_session, add_journal_entry

        P = "v83_journal"
        start_session(project=P)
        r = add_journal_entry(
            project=P,
            entry="Mira's face when she opened the envelope. Not surprise.",
            note_type="observation",
            pertains_to="MIRA",
        )
        self.assertTrue(r["ok"], r)
        self.assertEqual(r["entry"]["note_type"], "observation")

        # Bad note_type rejected.
        r = add_journal_entry(
            project=P, entry="x", note_type="vibes",
        )
        self.assertFalse(r["ok"])

        # Empty entry rejected.
        r = add_journal_entry(
            project=P, entry="   ", note_type="observation",
        )
        self.assertFalse(r["ok"])

    def test_set_flag_known_vs_unknown(self) -> None:
        from vault83_state.server import start_session, set_flag

        P = "v83_flags"
        start_session(project=P)
        r = set_flag(project=P, flag_name="sub_basement_entered", value=True)
        self.assertTrue(r["ok"])
        r = set_flag(project=P, flag_name="not_a_real_flag", value=True)
        self.assertFalse(r["ok"])

    def test_anchor_attendance(self) -> None:
        from vault83_state.server import (
            start_session, register_resident, enter_anchor,
            mark_anchor_attendance, exit_anchor,
        )

        P = "v83_anchor"
        start_session(project=P)
        for cid in ("WREN_GALLAGHER", "CAMILLE", "BEATRIX"):
            register_resident(
                project=P, character_id=cid,
                display_name=cid.title(),
                original_tier="1a",
                level="1", room_slug=f"room_{cid.lower()}",
            )
        r = enter_anchor(project=P, anchor_key="morning_hymn")
        self.assertTrue(r["ok"], r)
        self.assertEqual(r["anchor_key"], "morning_hymn")
        self.assertEqual(sorted(r["expected_attendees"]),
                         ["BEATRIX", "CAMILLE", "WREN_GALLAGHER"])

        r = mark_anchor_attendance(
            project=P, anchor_key="morning_hymn",
            attendees=["CAMILLE", "BEATRIX"],
        )
        self.assertTrue(r["ok"], r)
        self.assertEqual(sorted(r["attendees"]), ["BEATRIX", "CAMILLE"])
        self.assertEqual(r["absent"], ["WREN_GALLAGHER"])

        r = exit_anchor(project=P)
        self.assertTrue(r["ok"])

    def test_record_choice_one_shot(self) -> None:
        from vault83_state.server import start_session, record_choice, get_state

        P = "v83_choice"
        start_session(project=P)

        # Bad ending rejected.
        r = record_choice(project=P, ending_chosen="rupture_with_extra_cheese")
        self.assertFalse(r["ok"])

        # Valid Rupture commit.
        r = record_choice(
            project=P,
            ending_chosen="rupture",
            basis="Read Dane's annotation aloud at the Founding Day address",
        )
        self.assertTrue(r["ok"], r)
        self.assertEqual(r["choice"]["ending_chosen"], "rupture")

        s = get_state(project=P)
        self.assertTrue(s["state"]["flags"]["choice_made"])
        self.assertTrue(s["state"]["flags"]["experiment_disclosed_publicly"])

        # One-shot: a second call is rejected.
        r = record_choice(project=P, ending_chosen="preserve")
        self.assertFalse(r["ok"])

    def test_undo_round_trip(self) -> None:
        from vault83_state.server import (
            start_session, set_flag, undo_last_event, get_state,
        )

        P = "v83_undo"
        start_session(project=P)
        set_flag(project=P, flag_name="liaison_oral_tradition_heard", value=True)

        s = get_state(project=P)
        self.assertTrue(s["state"]["flags"]["liaison_oral_tradition_heard"])

        r = undo_last_event(project=P, confirm=False)
        self.assertTrue(r["ok"])
        self.assertEqual(r["preview"]["op"], "set_flag")

        r = undo_last_event(project=P, confirm=True)
        self.assertTrue(r["ok"])

        s = get_state(project=P)
        self.assertFalse(s["state"]["flags"]["liaison_oral_tradition_heard"])

    def test_ledger_view_and_depth_compare_flag(self) -> None:
        from vault83_state.server import (
            start_session, record_ledger_view, get_state,
        )

        P = "v83_ledger"
        start_session(project=P)

        # Public viewing — DEPTH 1.
        r = record_ledger_view(
            project=P,
            ledger_section="public_full",
            depth_gate_passed=1,
            notes="Glass case, Level 1 Archive. Signed the register.",
        )
        self.assertTrue(r["ok"], r)

        s = get_state(project=P)
        self.assertTrue(s["state"]["flags"]["public_ledger_viewed"])
        self.assertFalse(s["state"]["flags"]["admission_ledger_seen"])

        # Sub-basement viewing — DEPTH 5.
        r = record_ledger_view(
            project=P,
            ledger_section="plant_seven_names",
            depth_gate_passed=5,
            notes="ISOKRATOUMENOS. Terminal in the command alcove.",
        )
        self.assertTrue(r["ok"], r)

        s = get_state(project=P)
        self.assertTrue(s["state"]["flags"]["admission_ledger_seen"])
        self.assertTrue(s["state"]["flags"]["original_ledger_compared"])


if __name__ == "__main__":
    unittest.main()
