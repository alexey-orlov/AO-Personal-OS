#!/usr/bin/env python3
"""Unit tests for sync_core.  Run isolated, from any cwd:

    python3 -I automations/calendar-sync/test_sync_core.py
"""
import os
import sys
import json
import tempfile
import unittest

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import sync_core as sc  # noqa: E402

# OWA renders this mailbox in US/Pacific (observed). 08:49 UTC == 01:49 PDT.
NOW_UTC = "2026-06-17T08:49:00Z"
OWA_NOW = "2026-06-17T01:49:00"      # PDT wall clock -> offset -420


def src(title, start_wall, end_wall, **kw):
    ev = {"title": title, "start_wall": start_wall, "end_wall": end_wall}
    ev.update(kw)
    return ev


def base(events, **kw):
    inp = {"now_utc": NOW_UTC, "owa_now_wall": OWA_NOW, "source_events": events}
    inp.update(kw)
    return inp


class TestTimezone(unittest.TestCase):
    def test_offset_pacific(self):
        self.assertEqual(sc.owa_offset_minutes(sc._naive(OWA_NOW), sc._utc(NOW_UTC)), -420)

    def test_pacific_to_kyiv(self):
        # T-shirt kick-off shows "8:00 AM" in OWA (PDT) -> 18:00 Kyiv (EEST, +03:00)
        k = sc.to_kiev(sc._naive("2026-06-17T08:00:00"), None, -420, "Europe/Kyiv")
        self.assertEqual(k.hour, 18)
        self.assertEqual(k.utcoffset().total_seconds(), 3 * 3600)

    def test_owa_tz_override_matches(self):
        a = sc.to_kiev(sc._naive("2026-06-17T08:00:00"), "America/Los_Angeles", 0, "Europe/Kyiv")
        b = sc.to_kiev(sc._naive("2026-06-17T08:00:00"), None, -420, "Europe/Kyiv")
        self.assertEqual(a, b)


class TestReconcile(unittest.TestCase):
    def test_create_shape(self):
        out = sc.reconcile(base([src("T-shirt packages kick-off",
                                     "2026-06-17T08:00:00", "2026-06-17T08:30:00",
                                     online=True, join_url="https://teams.microsoft.com/l/meetup-join/X",
                                     location="Microsoft Teams Meeting")]))
        self.assertEqual(out["counts"]["create"], 1)
        p = out["creates"][0]["payload"]
        self.assertEqual(p["summary"], "SS: T-shirt packages kick-off")
        self.assertEqual(p["attendees"], [{"email": "orlov.alexej@gmail.com"}])
        self.assertEqual(p["notificationLevel"], "NONE")
        self.assertEqual(p["visibility"], "private")
        self.assertTrue(p["startTime"].startswith("2026-06-17T18:00:00+03:00"))
        self.assertEqual(p["location"], "https://teams.microsoft.com/l/meetup-join/X")
        self.assertIn("[[ss-sync:", p["description"])

    def test_idempotent_second_run(self):
        ev = src("Weekly sync-up - R&D Product", "2026-06-18T06:30:00", "2026-06-18T07:00:00")
        first = sc.reconcile(base([ev]))
        c = first["creates"][0]
        ledger = {c["source_key"]: {"google_event_id": "g1", "content_hash": c["content_hash"],
                                    "start_kiev": c["start_kiev"]}}
        second = sc.reconcile(base([ev], ledger=ledger))
        self.assertEqual(second["counts"], {"create": 0, "update": 0, "delete": 0, "skip": 1})
        self.assertEqual(second["skips"][0]["reason"], "up-to-date")

    def test_update_on_change(self):
        ev = src("Product daily standup", "2026-06-18T00:30:00", "2026-06-18T00:45:00")
        first = sc.reconcile(base([ev]))
        c = first["creates"][0]
        ledger = {c["source_key"]: {"google_event_id": "g9", "content_hash": "stalehash",
                                    "start_kiev": c["start_kiev"]}}
        # same day, time moved later -> same key -> update
        ev2 = src("Product daily standup", "2026-06-18T02:30:00", "2026-06-18T02:45:00")
        out = sc.reconcile(base([ev2], ledger=ledger))
        self.assertEqual(out["counts"]["update"], 1)
        self.assertEqual(out["updates"][0]["google_event_id"], "g9")

    def test_native_duplicate_skipped(self):
        ev = src("Oracle packages: current status kick-off", "2026-06-15T23:00:00", "2026-06-16T00:00:00")
        conv = sc._convert(ev, None, -420, sc.DEFAULT_CONFIG)
        native = {"title": "Oracle packages: current status kick-off",
                  "start_kiev": conv[0].isoformat(),
                  "attendees": ["olekorlov@softserveinc.com"], "organizer": "someone"}
        out = sc.reconcile(base([ev], google_native=[native]))
        self.assertEqual(out["counts"]["create"], 0)
        self.assertEqual(out["skips"][0]["reason"], "native-duplicate")

    def test_cancelled_title_deletes_copy(self):
        ev = src("Отменено: Sync_up/ OKR", "2026-06-21T13:00:00", "2026-06-21T13:30:00")
        # the live copy is keyed off the *normalized* (un-cancelled) title
        plain = src("Sync_up/ OKR", "2026-06-21T13:00:00", "2026-06-21T13:30:00")
        c = sc.reconcile(base([plain]))["creates"][0]
        ledger = {c["source_key"]: {"google_event_id": "gX", "content_hash": c["content_hash"],
                                    "start_kiev": c["start_kiev"]}}
        out = sc.reconcile(base([ev], ledger=ledger))
        self.assertEqual(out["counts"]["create"], 0)
        self.assertEqual(out["counts"]["delete"], 1)
        self.assertEqual(out["deletes"][0]["google_event_id"], "gX")

    def test_delete_when_gone_but_guarded_on_incomplete(self):
        ledger = {"td:ghost": {"google_event_id": "gGhost", "content_hash": "h",
                               "start_kiev": "2026-06-20T10:00:00+03:00"}}
        gone = sc.reconcile(base([], ledger=ledger))
        self.assertEqual(gone["counts"]["delete"], 1)
        guarded = sc.reconcile(base([], ledger=ledger, source_complete=False))
        self.assertEqual(guarded["counts"]["delete"], 0)


class TestSchedule(unittest.TestCase):
    def test_weekday_in_window(self):
        s = sc.schedule({"now_utc": "2026-06-17T07:30:00Z"})  # Wed 10:30 Kyiv
        self.assertTrue(s["in_window"])
        self.assertFalse(s["is_open_hour"])
        self.assertEqual(s["next_delay_seconds"], 1800)

    def test_open_hour_eight(self):
        s = sc.schedule({"now_utc": "2026-06-15T05:00:00Z"})  # Mon 08:00 Kyiv
        self.assertTrue(s["in_window"])
        self.assertTrue(s["is_open_hour"])

    def test_weekend_and_offhours(self):
        self.assertFalse(sc.schedule({"now_utc": "2026-06-20T09:00:00Z"})["in_window"])  # Sat
        self.assertFalse(sc.schedule({"now_utc": "2026-06-17T20:00:00Z"})["in_window"])  # Wed 23:00 Kyiv


class TestDailySummary(unittest.TestCase):
    def test_aggregate_and_mark(self):
        fd, path = tempfile.mkstemp(suffix=".jsonl")
        os.close(fd)
        try:
            rows = [
                {"ts": "2026-06-16T06:00:00Z", "ok": True, "added": 2, "modified": 1, "deleted": 0,
                 "error": None, "reported": True},   # already reported -> excluded
                {"ts": "2026-06-16T07:00:00Z", "ok": True, "added": 1, "modified": 0, "deleted": 1,
                 "error": None, "reported": False},
                {"ts": "2026-06-17T05:00:00Z", "ok": False, "added": 0, "modified": 0, "deleted": 0,
                 "error": "OWA timeout", "reported": False},
            ]
            with open(path, "w") as f:
                for r in rows:
                    f.write(json.dumps(r) + "\n")
            out = sc.daily_summary({"path": path})
            self.assertEqual(out["attempts"], 2)
            self.assertEqual(out["ok"], 1)
            self.assertEqual(out["events"], 1)  # 1 added + 0 modified
            self.assertTrue(out["message"].startswith(
                "SoftServe calendar sync: 2 attempts, 1 successful. 1 events added/modified."))
            self.assertIn("OWA timeout", out["message"])
            # all rows now reported
            with open(path) as f:
                after = [json.loads(l) for l in f if l.strip()]
            self.assertTrue(all(r["reported"] for r in after))
        finally:
            os.unlink(path)


if __name__ == "__main__":
    unittest.main(verbosity=2)
