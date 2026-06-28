"""Smoke tests for narrator-state.

Run with: pytest tests/

Or directly: python tests/test_smoke.py

These tests use a temporary HOME directory so they don't touch real state.
"""

import os
import shutil
import tempfile
import unittest
from pathlib import Path


class NarratorStateSmokeTest(unittest.TestCase):
    """Verify all tools work end-to-end against an isolated state directory."""

    def setUp(self):
        """Set up a clean test state directory."""
        self.test_home = tempfile.mkdtemp(prefix="narrator-state-test-")
        self._orig_home = os.environ.get("HOME")
        os.environ["HOME"] = self.test_home

        # Re-import server module so it picks up the new HOME.
        # We do this fresh each test to avoid cross-test contamination
        # of the state directory path cache.

    def tearDown(self):
        """Clean up test directory and restore HOME."""
        shutil.rmtree(self.test_home, ignore_errors=True)
        if self._orig_home is not None:
            os.environ["HOME"] = self._orig_home
        elif "HOME" in os.environ:
            del os.environ["HOME"]

    def test_full_lifecycle(self):
        """End-to-end: create project, run scene, close out."""
        from narrator_state.server import (
            start_session,
            advance_clock,
            advance_awareness,
            update_character,
            log_injury,
            heal_injury,
            add_inventory,
            remove_inventory,
            start_mission,
            complete_mission,
            finalize_story_day,
            set_flag,
            record_loss,
            end_session,
            get_state,
        )

        P = "lifecycle_test"

        # Session begins
        r = start_session(project=P, session_note="lifecycle test")
        self.assertTrue(r["ok"])

        # Set the scene
        r = advance_clock(
            project=P,
            story_day=1,
            story_time="09:47",
            location="PIT Airport",
            story_phase="pre_outbreak",
            story_day_label="Day 1 (Saturday)",
        )
        self.assertTrue(r["ok"])

        # Add Maya
        r = update_character(
            project=P,
            character_id="MAYA",
            name="Maya Chen",
            tier="anchor",
            relationship="close",
            present=True,
            notes="meeting at baggage claim",
        )
        self.assertTrue(r["ok"])

        # Awareness progression
        r = advance_awareness(project=P, new_tier=1, reason="TV news on Indonesia cluster")
        self.assertTrue(r["ok"])
        self.assertEqual(r["awareness"], 1)

        # Try regression
        r = advance_awareness(project=P, new_tier=0, reason="should fail")
        self.assertFalse(r["ok"])
        self.assertIn("monotonic", r["error"].lower())

        # Inventory
        r = add_inventory(project=P, item_name="backpack", notes="weekend bag")
        self.assertTrue(r["ok"])

        # Injury
        r = log_injury(
            project=P,
            character_id="PLAYER",
            body_part="left_forearm",
            severity="scratch",
            source="chain-link fence",
        )
        self.assertTrue(r["ok"])
        injury_id = r["injury"]["id"]

        # Heal it
        r = heal_injury(project=P, injury_id=injury_id, outcome="healed_clean")
        self.assertTrue(r["ok"])

        # Mission
        r = start_mission(project=P, mission_id="M-01", title="Saturday, the Rest")
        self.assertTrue(r["ok"])
        r = complete_mission(project=P, mission_id="M-01", outcome="established")
        self.assertTrue(r["ok"])

        # Day end
        r = finalize_story_day(
            project=P,
            summary="Day 1 was uneventful. Caleb arrived; Maya was warm and late.",
            characters_in_scene=["MAYA"],
        )
        self.assertTrue(r["ok"])

        # Flag
        r = set_flag(project=P, flag_name="news_cdc_briefing_seen", value=True)
        self.assertTrue(r["ok"])

        # Session end
        r = end_session(project=P, final_note="end of lifecycle")
        self.assertTrue(r["ok"])

        # Verify state via get_state
        r = get_state(project=P)
        self.assertTrue(r["ok"])
        self.assertEqual(r["state"]["clock"]["awareness"], 1)
        self.assertEqual(r["state"]["flags"]["news_cdc_briefing_seen"], True)
        self.assertEqual(len(r["state"]["memory_book"]), 1)

    def test_bite_clock_assignment(self):
        """Bites get infection_clock_minutes within the right range."""
        from narrator_state.server import (
            start_session,
            update_character,
            log_injury,
        )
        from narrator_state.schema import BITE_INCUBATION_MINUTES

        P = "bite_test"
        start_session(project=P)
        update_character(project=P, character_id="MAYA", name="Maya", tier="anchor", present=True)

        # Face bite — should be 2-10 minutes
        r = log_injury(
            project=P,
            character_id="MAYA",
            body_part="face",
            severity="bite",
            source="test bite",
            clock_bias="median",
        )
        self.assertTrue(r["ok"])
        clock = r["injury"]["infection_clock_minutes"]
        self.assertGreaterEqual(clock, 2)
        self.assertLessEqual(clock, 10)

        # Foot bite — should be 720-1440 minutes
        r = log_injury(
            project=P,
            character_id="MAYA",
            body_part="foot",
            severity="bite",
            source="test bite",
            clock_bias="median",
        )
        self.assertTrue(r["ok"])
        clock = r["injury"]["infection_clock_minutes"]
        self.assertGreaterEqual(clock, 720)
        self.assertLessEqual(clock, 1440)

        # Invalid body part for bite
        r = log_injury(
            project=P,
            character_id="MAYA",
            body_part="elbow",
            severity="bite",
            source="should fail",
        )
        self.assertFalse(r["ok"])

    def test_undo_round_trip(self):
        """undo_last_event reverses the most recent operation."""
        from narrator_state.server import (
            start_session,
            set_flag,
            undo_last_event,
            get_state,
        )

        P = "undo_test"
        start_session(project=P)

        # Set then undo
        r = set_flag(project=P, flag_name="cordyceps_word_unlocked", value=True)
        self.assertTrue(r["ok"])

        state = get_state(project=P)
        self.assertTrue(state["state"]["flags"]["cordyceps_word_unlocked"])

        # Preview undo
        r = undo_last_event(project=P, confirm=False)
        self.assertTrue(r["ok"])
        self.assertEqual(r["preview"]["op"], "set_flag")

        # Execute undo
        r = undo_last_event(project=P, confirm=True)
        self.assertTrue(r["ok"])

        state = get_state(project=P)
        self.assertFalse(state["state"]["flags"]["cordyceps_word_unlocked"])

    def test_double_death_rejected(self):
        """Once dead, always dead."""
        from narrator_state.server import (
            start_session,
            update_character,
            record_loss,
        )

        P = "death_test"
        start_session(project=P)
        update_character(
            project=P,
            character_id="MIKE",
            name="Mike",
            tier="non_romance_male",
            present=True,
        )

        r = record_loss(
            project=P,
            character_id="MIKE",
            story_day_label="Day 7",
            cause="shot",
            one_line_obit="He was gone.",
        )
        self.assertTrue(r["ok"])

        # Try to kill again
        r = record_loss(
            project=P,
            character_id="MIKE",
            story_day_label="Day 7",
            cause="again",
            one_line_obit="nope",
        )
        self.assertFalse(r["ok"])
        self.assertIn("already dead", r["error"].lower())


if __name__ == "__main__":
    unittest.main()
