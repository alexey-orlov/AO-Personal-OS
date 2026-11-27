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

    def test_eventkit_offset_is_an_instant_not_a_kyiv_wall_clock(self):
        # 2026-11-18: the Mac was on CET and the reader emitted 11:30+01:00 for a 12:30 Kyiv
        # meeting; re-reading "11:30" as Kyiv put the copy an hour early. On PST it is ten.
        for wall in ("2026-11-20T12:30:00+02:00", "2026-11-20T11:30:00+01:00",
                     "2026-11-20T02:30:00-08:00", "2026-11-20T10:30:00Z"):
            k = sc._to_tz(wall, "Europe/Kyiv", 0, "Europe/Kyiv")
            self.assertEqual(k.isoformat(), "2026-11-20T12:30:00+02:00", wall)

    def test_mac_timezone_does_not_change_the_plan(self):
        # the same meetings read on a Kyiv, CET and PST Mac -> identical keys and hashes, so a
        # trip never rewrites the Google copies (and a recurring key keeps its Kyiv date)
        def read(offset_h):
            def at(h, m):
                from datetime import datetime, timedelta, timezone
                t = datetime(2026, 11, 20, h, m, tzinfo=timezone(timedelta(hours=2)))
                return t.astimezone(timezone(timedelta(hours=offset_h))).isoformat()
            return [src("INT Oracle steeco", at(12, 30), at(13, 0), owa_id="E1"),
                    src("Daily", at(0, 30), at(0, 45), owa_id="S1", recurring=True)]
        plans = [sc.reconcile({"now_utc": "2026-11-19T18:00:00Z", "owa_tz": "Europe/Kyiv",
                               "source_events": read(h)}) for h in (2, 1, -8)]
        sig = [sorted((c["source_key"], c["content_hash"], c["start_kiev"]) for c in p["creates"])
               for p in plans]
        self.assertEqual(sig[0], sig[1])
        self.assertEqual(sig[0], sig[2])
        self.assertIn(("id:S1@2026-11-20"), [k for k, _, _ in sig[2]])


class TestReconcile(unittest.TestCase):
    def test_create_shape(self):
        out = sc.reconcile(base([src("T-shirt packages kick-off",
                                     "2026-06-17T08:00:00", "2026-06-17T08:30:00",
                                     my_status="accepted",
                                     online=True, join_url="https://teams.microsoft.com/l/meetup-join/X",
                                     location="Microsoft Teams Meeting")]))
        self.assertEqual(out["counts"]["create"], 1)
        p = out["creates"][0]["payload"]
        self.assertEqual(p["summary"], "SS: T-shirt packages kick-off")
        self.assertEqual(p["attendees"], [{"email": "orlov.alexej@gmail.com", "responseStatus": "accepted"}])
        self.assertEqual(p["notificationLevel"], "NONE")
        self.assertEqual(p["visibility"], "private")
        self.assertTrue(p["startTime"].startswith("2026-06-17T18:00:00+03:00"))
        self.assertEqual(p["location"], "https://teams.microsoft.com/l/meetup-join/X")
        self.assertNotIn("[[ss-sync:", p["description"])   # marker lives in extendedProperties now

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

    def test_recurring_instances_get_distinct_keys(self):
        # a recurring series shares one EventKit id; two occurrences must NOT collide on one key
        a = src("Weekly sync-up", "2026-06-18T13:30:00", "2026-06-18T14:00:00", owa_id="S1", recurring=True)
        b = src("Weekly sync-up", "2026-06-25T13:30:00", "2026-06-25T14:00:00", owa_id="S1", recurring=True)
        out = sc.reconcile(base([a, b]))
        self.assertEqual(out["counts"]["create"], 2)
        self.assertEqual(len({c["source_key"] for c in out["creates"]}), 2)

    def test_stale_duplicate_copies_deleted(self):
        # migration: two legacy Google copies collided on one shared key; the live source now
        # has two distinct occurrences -> both legacy copies pruned, two fresh ones created.
        a = src("Weekly sync-up", "2026-06-18T13:30:00", "2026-06-18T14:00:00", owa_id="S1", recurring=True)
        b = src("Weekly sync-up", "2026-06-25T13:30:00", "2026-06-25T14:00:00", owa_id="S1", recurring=True)
        legacy = [
            {"google_event_id": "gOld18", "source_key": "id:S1", "content_hash": "h1",
             "start_kiev": "2026-06-18T13:30:00+03:00"},
            {"google_event_id": "gOld25", "source_key": "id:S1", "content_hash": "h2",
             "start_kiev": "2026-06-25T13:30:00+03:00"},
        ]
        out = sc.reconcile(base([a, b], google_copies=legacy))
        self.assertEqual(out["counts"]["create"], 2)
        self.assertEqual(out["counts"]["delete"], 2)
        self.assertEqual({d["google_event_id"] for d in out["deletes"]}, {"gOld18", "gOld25"})

    def test_second_live_copy_of_a_current_meeting_is_pruned(self):
        # 2026-11-24: Google held two copies of one live occurrence (one an hour early, left by
        # the CET bug) and the stale one was never removed. Keep the ledger's, prune the other.
        ev = src("PDLC daily", "2026-06-18T08:00:00", "2026-06-18T08:30:00")
        c = sc.reconcile(base([ev]))["creates"][0]
        keep = {"google_event_id": "gKeep", "source_key": c["source_key"],
                "content_hash": c["content_hash"], "start_kiev": c["start_kiev"]}
        stale = {"google_event_id": "gDup", "source_key": c["source_key"],
                 "content_hash": "stale", "start_kiev": "2026-06-18T17:00:00+03:00"}
        ledger = {c["source_key"]: {"google_event_id": "gKeep", "content_hash": c["content_hash"],
                                    "start_kiev": c["start_kiev"]}}
        out = sc.reconcile(base([ev], ledger=ledger, google_copies=[keep, stale]))
        self.assertEqual(out["counts"], {"create": 0, "update": 0, "delete": 1, "skip": 1})
        self.assertEqual(out["deletes"][0]["google_event_id"], "gDup")
        self.assertEqual(out["deletes"][0]["reason"], "duplicate")
        # no ledger: the first listed copy is kept, whichever order Google returns
        out = sc.reconcile(base([ev], google_copies=[keep, stale]))
        self.assertEqual([d["google_event_id"] for d in out["deletes"]], ["gDup"])
        # an incomplete read prunes nothing
        out = sc.reconcile(base([ev], ledger=ledger, google_copies=[keep, stale], source_complete=False))
        self.assertEqual(out["counts"]["delete"], 0)


class TestExtract(unittest.TestCase):
    def test_split_copies_and_natives(self):
        events = [
            {"id": "g1", "summary": "SS: Product daily standup",
             "extendedProperties": {"private": {"ssSync": "td:abc123", "ssHash": "deadbeef0000"}},
             "start": {"dateTime": "2026-06-18T10:30:00+03:00"},
             "end": {"dateTime": "2026-06-18T10:45:00+03:00"}},
            {"id": "g2", "summary": "Dentist",
             "description": "personal",
             "start": {"dateTime": "2026-06-18T16:00:00+03:00"},
             "end": {"dateTime": "2026-06-18T17:00:00+03:00"},
             "attendees": [{"email": "olekorlov@softserveinc.com"}],
             "organizer": {"email": "clinic@x.com"}},
        ]
        out = sc.extract({"events": events})
        self.assertEqual(len(out["google_copies"]), 1)
        self.assertEqual(out["google_copies"][0]["source_key"], "td:abc123")
        self.assertEqual(out["google_copies"][0]["content_hash"], "deadbeef0000")
        self.assertEqual(out["google_copies"][0]["google_event_id"], "g1")
        self.assertEqual(len(out["google_native"]), 1)
        self.assertEqual(out["google_native"][0]["attendees"], ["olekorlov@softserveinc.com"])

    def test_extract_feeds_reconcile_roundtrip(self):
        # a copy that is already up to date must round-trip to a skip
        ev = src("Product Issues sync", "2026-06-18T08:00:00", "2026-06-18T08:30:00")
        created = sc.reconcile(base([ev]))["creates"][0]
        gevents = [{"id": "gZ", "summary": created["payload"]["summary"],
                    "extendedProperties": {"private": {"ssSync": created["source_key"], "ssHash": created["content_hash"]}},
                    "start": {"dateTime": created["payload"]["startTime"]},
                    "end": {"dateTime": created["payload"]["endTime"]}}]
        copies = sc.extract({"events": gevents})["google_copies"]
        out = sc.reconcile(base([ev], google_copies=copies))
        self.assertEqual(out["counts"], {"create": 0, "update": 0, "delete": 0, "skip": 1})
        self.assertEqual(out["skips"][0]["reason"], "up-to-date")


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

    def test_weekend_out_night_in(self):
        self.assertFalse(sc.schedule({"now_utc": "2026-06-20T09:00:00Z"})["in_window"])  # Sat
        self.assertTrue(sc.schedule({"now_utc": "2026-06-17T20:00:00Z"})["in_window"])   # Wed 23:00 Kyiv

    def test_gate_follows_the_zone_it_is_given(self):
        # Fri 23:30 PST is Sat 09:30 Kyiv: in on the Mac's (PST) clock, out on Kyiv's
        pst = {"tz": "America/Los_Angeles"}
        self.assertTrue(sc.schedule({"now_utc": "2026-11-21T07:30:00Z", "config": pst})["in_window"])
        self.assertFalse(sc.schedule({"now_utc": "2026-11-21T07:30:00Z"})["in_window"])
        # Mon 00:00 PST (09:00 CET) is a weekday hour -> in; the 08:00 summary hour stays 08:00 local
        self.assertTrue(sc.schedule({"now_utc": "2026-11-23T08:00:00Z", "config": pst})["in_window"])
        self.assertTrue(sc.schedule({"now_utc": "2026-11-23T16:00:00Z", "config": pst})["is_open_hour"])


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


class TestEnrichment(unittest.TestCase):
    def test_description_status_and_note(self):
        ev = src("Products: weekly meeting", "2026-06-17T05:00:00", "2026-06-17T05:30:00",
                 my_status="accepted", organizer="Dana Lead", organizer_email="organizer@example.com",
                 notes=("Agenda: review Q3 roadmap.\n________________________________\nMicrosoft Teams meeting\n"
                        "Join: https://teams.microsoft.com/x\nMeeting ID: 123\nPasscode: abc\n"
                        "Need help? https://aka.ms\nThis email may contain confidential material."),
                 attendees=[{"name": "Oleksii Orlov", "email": "olekorlov@softserveinc.com", "status": "accepted"},
                            {"name": "Sam Attendee", "email": "attendee@example.com", "status": "needsAction"}])
        p = sc.reconcile(base([ev]))["creates"][0]["payload"]
        self.assertEqual(p["attendees"][0]["responseStatus"], "accepted")
        d = p["description"]
        self.assertIn("Agenda: review Q3 roadmap.", d)
        self.assertIn("Organizer: Dana Lead <organizer@example.com>", d)
        self.assertIn("Your response: accepted", d)
        self.assertIn("Oleksii Orlov — accepted", d)
        self.assertIn("Sam Attendee — no response", d)
        for junk in ("Microsoft Teams", "Meeting ID", "Passcode", "confidential", "teams.microsoft.com"):
            self.assertNotIn(junk, d)

    def test_participant_change_triggers_update(self):
        a = src("Sync", "2026-06-18T06:00:00", "2026-06-18T06:30:00",
                attendees=[{"name": "A", "email": "a@x.com", "status": "accepted"}])
        first = sc.reconcile(base([a]))["creates"][0]
        ledger = {first["source_key"]: {"google_event_id": "g1", "content_hash": first["content_hash"],
                                        "start_kiev": first["start_kiev"]}}
        # same meeting, but a new participant joined -> must UPDATE, not skip
        b = src("Sync", "2026-06-18T06:00:00", "2026-06-18T06:30:00",
                attendees=[{"name": "A", "email": "a@x.com", "status": "accepted"},
                           {"name": "B", "email": "b@x.com", "status": "needsAction"}])
        out = sc.reconcile(base([b], ledger=ledger))
        self.assertEqual(out["counts"]["update"], 1)

    def test_description_participant_order_is_stable(self):
        a1 = [{"name": "Zoe", "email": "z@x", "status": "accepted"},
              {"name": "Amy", "email": "a@x", "status": "declined"}]
        d1 = sc.build_description({"attendees": a1})
        d2 = sc.build_description({"attendees": list(reversed(a1))})
        self.assertEqual(d1, d2)                      # order must not depend on EventKit's read order
        self.assertLess(d1.index("Amy"), d1.index("Zoe"))   # sorted by name

    def test_attendee_reorder_does_not_churn(self):
        # the daemon must CONVERGE: an identical roster in a different read order = skip, not update
        atts = [{"name": "Zoe", "email": "z@x", "status": "accepted"},
                {"name": "Amy", "email": "a@x", "status": "accepted"},
                {"name": "Max", "email": "m@x", "status": "tentative"}]
        ev1 = src("Sync", "2026-06-18T06:00:00", "2026-06-18T06:30:00", owa_id="X", my_status="accepted", attendees=atts)
        c = sc.reconcile(base([ev1]))["creates"][0]
        ledger = {c["source_key"]: {"google_event_id": "g", "content_hash": c["content_hash"],
                                    "start_kiev": c["start_kiev"]}}
        ev2 = src("Sync", "2026-06-18T06:00:00", "2026-06-18T06:30:00", owa_id="X", my_status="accepted",
                  attendees=[atts[2], atts[0], atts[1]])    # same people, shuffled
        out = sc.reconcile(base([ev2], ledger=ledger))
        self.assertEqual(out["counts"], {"create": 0, "update": 0, "delete": 0, "skip": 1})

    def test_clean_notes_and_status_helpers(self):
        self.assertEqual(sc.clean_notes("____\nMicrosoft Teams meeting\nJoin: https://x\nMeeting ID: 1"), "")
        self.assertEqual(sc.clean_notes("Real note.\nMicrosoft Teams meeting\nJoin: x"), "Real note.")
        self.assertEqual(sc.response_status(""), "needsAction")          # absent RSVP must NOT read as accepted
        self.assertEqual(sc.response_status("needsAction"), "needsAction")
        self.assertEqual(sc.response_status("declined"), "declined")
        self.assertEqual(sc.response_status("tentative"), "tentative")
        self.assertFalse(sc.is_busy(""))                                 # unanswered -> Free
        self.assertFalse(sc.is_busy("declined"))
        self.assertTrue(sc.is_busy("accepted"))
        self.assertTrue(sc.is_busy("tentative"))

    def test_declined_is_free_accepted_is_busy(self):
        pd = sc.reconcile(base([src("X", "2026-06-18T06:00:00", "2026-06-18T06:30:00", my_status="declined")]))["creates"][0]["payload"]
        pa = sc.reconcile(base([src("Y", "2026-06-18T07:00:00", "2026-06-18T07:30:00", my_status="accepted")]))["creates"][0]["payload"]
        self.assertEqual(pd["transparency"], "transparent")              # declined -> Free
        self.assertEqual(pd["attendees"][0]["responseStatus"], "declined")
        self.assertEqual(pa["transparency"], "opaque")                  # accepted -> Busy


class TestStatusSemantics(unittest.TestCase):
    """The status-sync contract — regression cover for the 'unanswered invite shows as
    accepted + Busy' bug on 'SS: Weekly sync-up - R&D Product'."""

    def _payload(self, my):
        ev = src("Weekly sync-up - R&D Product", "2026-06-18T13:30:00", "2026-06-18T14:00:00",
                 my_status=my,
                 attendees=[{"name": "Oleksii Orlov", "email": "olekorlov@softserveinc.com", "status": my}])
        return sc.reconcile(base([ev]))["creates"][0]["payload"]

    def test_unanswered_is_not_accepted_or_busy(self):
        for my in ("", "needsAction"):
            p = self._payload(my)
            self.assertEqual(p["transparency"], "transparent", my)       # Free, not Busy
            self.assertNotEqual(p["attendees"][0]["responseStatus"], "accepted", my)
            self.assertEqual(p["attendees"][0]["responseStatus"], "needsAction", my)
            self.assertIn("Your response: no response", p["description"])

    def test_accepted_is_busy(self):
        p = self._payload("accepted")
        self.assertEqual(p["transparency"], "opaque")
        self.assertEqual(p["attendees"][0]["responseStatus"], "accepted")
        self.assertIn("Your response: accepted", p["description"])

    def test_tentative_is_busy(self):
        p = self._payload("tentative")
        self.assertEqual(p["transparency"], "opaque")
        self.assertEqual(p["attendees"][0]["responseStatus"], "tentative")
        self.assertIn("Your response: tentative", p["description"])

    def test_declined_is_free(self):
        p = self._payload("declined")
        self.assertEqual(p["transparency"], "transparent")
        self.assertEqual(p["attendees"][0]["responseStatus"], "declined")
        self.assertIn("Your response: declined", p["description"])

    def test_status_change_forces_resync(self):
        # an already-synced copy created while 'accepted' must UPDATE (not skip) once the real
        # status is unanswered — this is what re-syncs the live calendar after the fix.
        acc = src("Weekly sync-up - R&D Product", "2026-06-18T13:30:00", "2026-06-18T14:00:00", my_status="accepted")
        created = sc.reconcile(base([acc]))["creates"][0]
        ledger = {created["source_key"]: {"google_event_id": "g1", "content_hash": created["content_hash"],
                                          "start_kiev": created["start_kiev"]}}
        unanswered = src("Weekly sync-up - R&D Product", "2026-06-18T13:30:00", "2026-06-18T14:00:00", my_status="")
        out = sc.reconcile(base([unanswered], ledger=ledger))
        self.assertEqual(out["counts"]["update"], 1)
        self.assertEqual(out["updates"][0]["payload"]["transparency"], "transparent")


class TestReverse(unittest.TestCase):
    """Reverse leg: Google busy -> SS 'Busy' placeholders."""

    def gev(self, id="e1", cal="cal1", summary="Team sync",
            start="2026-06-20T15:00:00+03:00", end="2026-06-20T15:30:00+03:00", **kw):
        e = {"id": id, "_cal": cal, "summary": summary,
             "start": {"dateTime": start}, "end": {"dateTime": end}}
        e.update(kw)
        return e

    def test_busy_and_antirecursion_filters(self):
        events = [
            self.gev(id="keep", summary="Partner review"),
            {"id": "ad", "_cal": "c", "summary": "Trip",
             "start": {"date": "2026-06-20"}, "end": {"date": "2026-06-21"}},     # all-day -> skip
            self.gev(id="free", transparency="transparent"),                       # Free -> skip
            self.gev(id="canc", status="cancelled"),                               # cancelled -> skip
            self.gev(id="dec", attendees=[{"self": True, "responseStatus": "declined"}]),  # declined -> skip
            self.gev(id="sscopy", summary="SS: Weekly sync-up"),                   # forward copy -> skip
            self.gev(id="ssmark", extendedProperties={"private": {"ssSync": "id:abc"}}),   # forward marker -> skip
            self.gev(id="ssorg", organizer={"email": "olekorlov@softserveinc.com"}),       # SS organizer -> skip
            self.gev(id="ssatt", attendees=[{"email": "olekorlov@softserveinc.com"}]),     # SS attendee -> skip
        ]
        out = sc.reverse_sources({"events": events})["busy_events"]
        self.assertEqual([b["key"] for b in out], ["cal1::keep"])

    def test_create_update_delete_idempotent(self):
        busy = sc.reverse_sources({"events": [self.gev(id="m1")]})["busy_events"]
        plan = sc.reverse_reconcile({"busy_events": busy, "reverse_ledger": {}, "ss_placeholders": []})
        self.assertEqual(plan["counts"], {"create": 1, "update": 0, "delete": 0, "skip": 0})
        c = plan["creates"][0]
        self.assertEqual(c["title"], "Busy")
        self.assertEqual(c["marker"], "[[gcal-busy:cal1::m1]]")
        ledger = {c["key"]: {"ss_id": "SS1", "hash": c["hash"]}}
        # idempotent
        again = sc.reverse_reconcile({"busy_events": busy, "reverse_ledger": ledger, "ss_placeholders": []})
        self.assertEqual(again["counts"]["skip"], 1)
        # moved -> update (same ss_id)
        moved = sc.reverse_sources({"events": [self.gev(id="m1", start="2026-06-20T16:00:00+03:00",
                                                        end="2026-06-20T16:30:00+03:00")]})["busy_events"]
        up = sc.reverse_reconcile({"busy_events": moved, "reverse_ledger": ledger, "ss_placeholders": []})
        self.assertEqual(up["counts"]["update"], 1)
        self.assertEqual(up["updates"][0]["ss_id"], "SS1")
        # gone -> delete
        gone = sc.reverse_reconcile({"busy_events": [], "reverse_ledger": ledger, "ss_placeholders": []})
        self.assertEqual(gone["counts"]["delete"], 1)
        self.assertEqual(gone["deletes"][0]["ss_id"], "SS1")

    def test_converges_across_tz_representation(self):
        # placeholder read back from EventKit (Kyiv) must SKIP vs the Google source (other offset, same instant)
        busy = sc.reverse_sources({"events": [self.gev(id="m1", start="2026-06-20T05:00:00-07:00",
                                                       end="2026-06-20T05:30:00-07:00")]})["busy_events"]
        ph = [{"ss_id": "SS1", "key": "cal1::m1",
               "start": "2026-06-20T15:00:00+03:00", "end": "2026-06-20T15:30:00+03:00"}]
        plan = sc.reverse_reconcile({"busy_events": busy, "reverse_ledger": {}, "ss_placeholders": ph})
        self.assertEqual(plan["counts"]["skip"], 1, plan)

    def test_relink_via_placeholder_when_ledger_lost(self):
        # ledger empty but the placeholder still on SS -> recognized (skip), not duplicated
        busy = sc.reverse_sources({"events": [self.gev(id="m1")]})["busy_events"]
        ph = [{"ss_id": "SS1", "key": "cal1::m1",
               "start": "2026-06-20T15:00:00+03:00", "end": "2026-06-20T15:30:00+03:00"}]
        plan = sc.reverse_reconcile({"busy_events": busy, "reverse_ledger": {}, "ss_placeholders": ph})
        self.assertEqual(plan["counts"]["skip"], 1)
        # ...and the ledger is re-pointed at it, so it stays tracked once it leaves the read window
        self.assertEqual(plan["relinks"], {"cal1::m1": {
            "ss_id": "SS1", "hash": sc._rev_hash("2026-06-20T15:00:00+03:00", "2026-06-20T15:30:00+03:00")}})

    PH = {"start": "2026-06-20T15:00:00+03:00", "end": "2026-06-20T15:30:00+03:00"}

    def test_duplicate_placeholder_for_a_live_slot_is_pruned(self):
        # 2026-11-24: SS held two "Busy" blocks for one Google event and kept both forever.
        busy = sc.reverse_sources({"events": [self.gev(id="m1")]})["busy_events"]
        h = sc.reverse_reconcile({"busy_events": busy, "reverse_ledger": {},
                                  "ss_placeholders": []})["creates"][0]["hash"]
        ledger = {"cal1::m1": {"ss_id": "SS1", "hash": h}}
        ph = [{"ss_id": "SS2", "key": "cal1::m1", **self.PH}, {"ss_id": "SS1", "key": "cal1::m1", **self.PH}]
        plan = sc.reverse_reconcile({"busy_events": busy, "reverse_ledger": ledger, "ss_placeholders": ph})
        self.assertEqual(plan["counts"], {"create": 0, "update": 0, "delete": 1, "skip": 1})
        self.assertEqual(plan["deletes"], [{"op": "delete", "ss_id": "SS2", "key": "cal1::m1", "duplicate": True}])
        self.assertEqual(plan["relinks"], {})
        # incomplete read -> nothing pruned
        guarded = sc.reverse_reconcile({"busy_events": busy, "reverse_ledger": ledger,
                                        "ss_placeholders": ph, "source_complete": False})
        self.assertEqual(guarded["counts"]["delete"], 0)

    def test_vanished_ledger_id_adopts_the_placeholder_on_ss(self):
        # the ledger's placeholder is gone from SS but another one for the slot is there: move it
        # (an update aimed at the vanished id made the writer create a second block)
        moved = sc.reverse_sources({"events": [self.gev(id="m1", start="2026-06-20T16:00:00+03:00",
                                                        end="2026-06-20T16:30:00+03:00")]})["busy_events"]
        ledger = {"cal1::m1": {"ss_id": "SSgone", "hash": "old"}}
        ph = [{"ss_id": "SS2", "key": "cal1::m1", **self.PH}]
        plan = sc.reverse_reconcile({"busy_events": moved, "reverse_ledger": ledger, "ss_placeholders": ph})
        self.assertEqual(plan["counts"], {"create": 0, "update": 1, "delete": 0, "skip": 0})
        self.assertEqual(plan["updates"][0]["ss_id"], "SS2")
        self.assertEqual(plan["relinks"]["cal1::m1"]["ss_id"], "SS2")

    def ek(self, uid="U1", start="2026-06-20T08:00:00-07:00", end="2026-06-20T08:30:00-07:00", **kw):
        """An ss-cal-read row from a calendar read straight from Apple Calendar (GigaCloud's Exchange calendar)."""
        e = {"uid": "local-" + uid, "external_id": uid, "title": "Product daily", "start": start, "end": end,
             "all_day": False, "recurring": False, "detached": False, "occurrence": start,
             "availability": "busy", "status": "none", "attendees": [], "organizer_email": "", "my_status": "",
             "calendar": "Календар", "source": "me@infra.example", "source_type": "exchange"}
        e.update(kw)
        return e

    def test_eventkit_busy_rules_and_keys(self):
        # 2026-11-24: GigaCloud read from its Exchange account in Apple Calendar instead of Google's lagging copy
        rows = [
            self.ek("A"),                                                   # busy
            self.ek("N", availability="notSupported"),                      # feed can't say -> busy
            self.ek("T", availability="tentative", my_status="needsAction"),  # unanswered -> busy
            self.ek("F", availability="free"),                              # Free -> skip
            self.ek("C", status="canceled"),                                # cancelled -> skip
            self.ek("X", title="Canceled: (HOLD) Integrity expectations"),  # Outlook's cancelled title -> skip
            self.ek("Q", my_status="declined"),                             # I declined -> skip
            self.ek("D", all_day=True),                                     # all-day -> skip
            self.ek("S", attendees=[{"email": "olekorlov@softserveinc.com"}]),  # already on SS -> skip
            self.ek("R", recurring=True),                                   # a series: UID + original start
            self.ek("R", recurring=True, start="2026-06-21T08:00:00-07:00", end="2026-06-21T08:30:00-07:00",
                    occurrence="2026-06-21T08:00:00-07:00"),
            self.ek("M", detached=True, start="2026-06-22T09:00:00-07:00", end="2026-06-22T09:30:00-07:00",
                    occurrence="2026-06-22T08:00:00-07:00"),                # moved occurrence keeps its key
            self.ek("A"),                                                   # a repeated key -> one slot
        ]
        out = sc.eventkit_busy({"events": rows})["busy_events"]
        self.assertEqual([b["key"] for b in out], [
            "ek:A", "ek:N", "ek:T", "ek:R@20260620T150000Z", "ek:R@20260621T150000Z", "ek:M@20260622T150000Z"])
        self.assertEqual((out[5]["start"], out[5]["end"]), ("2026-06-22T09:00:00-07:00", "2026-06-22T09:30:00-07:00"))
        # the key lands in the SS placeholder's notes, which SS colleagues with full details can read
        self.assertFalse([b["key"] for b in out if "infra" in b["key"] or "Календар" in b["key"]])

    def test_ek_sources_spec_and_ss_never_counts(self):
        import run
        old = os.environ.get("CALSYNC_EK_SOURCES")
        os.environ["CALSYNC_EK_SOURCES"] = " Exchange:Календар=g1@import.calendar.google.com , subscribed:Feed, broken "
        try:
            self.assertEqual(run.ek_sources(), [("exchange", "Календар", "g1@import.calendar.google.com"),
                                                ("subscribed", "Feed", None)])
            self.assertFalse(run._not_ss(run.SS_SOURCE.upper()))      # SoftServe's own account: never a source
            self.assertTrue(run._not_ss("me@infra.example"))
        finally:
            if old is None:
                os.environ.pop("CALSYNC_EK_SOURCES")
            else:
                os.environ["CALSYNC_EK_SOURCES"] = old

    def test_eventkit_slot_converges_through_its_placeholder(self):
        busy = sc.eventkit_busy({"events": [self.ek("A")]})["busy_events"]
        c = sc.reverse_reconcile({"busy_events": busy, "reverse_ledger": {}, "ss_placeholders": []})["creates"][0]
        self.assertEqual(c["marker"], "[[gcal-busy:ek:A]]")
        # read back from SS in another offset with no ledger: recognised, not created again
        ph = [{"ss_id": "SS9", "key": "ek:A",
               "start": "2026-06-20T18:00:00+03:00", "end": "2026-06-20T18:30:00+03:00"}]
        plan = sc.reverse_reconcile({"busy_events": busy, "reverse_ledger": {}, "ss_placeholders": ph})
        self.assertEqual(plan["counts"], {"create": 0, "update": 0, "delete": 0, "skip": 1})

    def test_delete_guarded_on_incomplete_read(self):
        ledger = {"cal1::gone": {"ss_id": "SSx", "hash": "h"}}
        full = sc.reverse_reconcile({"busy_events": [], "reverse_ledger": ledger, "ss_placeholders": []})
        self.assertEqual(full["counts"]["delete"], 1)
        guarded = sc.reverse_reconcile({"busy_events": [], "reverse_ledger": ledger,
                                        "ss_placeholders": [], "source_complete": False})
        self.assertEqual(guarded["counts"]["delete"], 0)


class TestGigaCloud(unittest.TestCase):
    """GigaCloud leg (2026-11-27): busy at SoftServe or in personal Google -> GigaCloud 'Busy'."""
    GC = "me@infra.example"
    SS = "olekorlov@softserveinc.com"
    CFG = {"gc_email": "me@infra.example", "gc_google_copy": "gcfeed@import.calendar.google.com"}

    def ss(self, uid, my_status="accepted", start="2026-12-01T08:00:00-08:00", end="2026-12-01T08:30:00-08:00", **kw):
        """An ss-cal-read row from SoftServe's account: Alex is invited at his SoftServe address."""
        e = {"uid": "local-" + uid, "external_id": uid, "title": "Jumpstart daily", "start": start, "end": end,
             "all_day": False, "recurring": False, "detached": False, "occurrence": start,
             "availability": "tentative" if my_status in ("", "tentative") else "busy", "status": "none",
             "my_status": my_status, "organizer_email": "lead@softserveinc.com", "notes": "",
             "attendees": [{"email": self.SS, "is_me": True, "status": my_status}],
             "calendar": "Calendar", "source": "Exchange", "source_type": "exchange"}
        e.update(kw)
        return e

    def gev(self, id, cal="orlov.alexej@gmail.com", **kw):
        e = {"id": id, "_cal": cal, "summary": "School run",
             "start": {"dateTime": "2026-12-01T07:30:00-08:00"}, "end": {"dateTime": "2026-12-01T08:00:00-08:00"}}
        e.update(kw)
        return e

    def test_softserve_meetings_block_gigacloud_unless_declined(self):
        rows = [
            self.ss("A"),                                             # accepted -> block
            self.ss("U", my_status=""),                               # never answered -> block (Alex, 2026-11-27)
            self.ss("T", my_status="tentative"),                      # maybe -> block
            self.ss("D", my_status="declined"),                       # declined -> skip
            self.ss("X", title="Canceled: Oracle steerco"),           # cancelled -> skip
            self.ss("F", availability="free"),                        # Free -> skip
            self.ss("G", attendees=[{"email": self.SS}, {"email": self.GC}]),   # GigaCloud holds it -> skip
            self.ss("P", my_status="", notes="[[gcal-busy:ek:Z]]"),   # our own SoftServe block -> never a source
            self.ss("R", recurring=True, start="2026-12-02T06:15:00-08:00", end="2026-12-02T06:30:00-08:00",
                    occurrence="2026-12-02T06:15:00-08:00"),          # a series occurrence keys by its start
        ]
        out = sc.eventkit_busy({"events": rows, "config": self.CFG, "target_email": self.GC})["busy_events"]
        self.assertEqual([b["key"] for b in out], ["ek:A", "ek:U", "ek:T", "ek:R@20261202T141500Z"])
        # the SoftServe address on every SoftServe meeting must not read as "already on the target"
        self.assertEqual(len(sc.eventkit_busy({"events": [self.ss("A")]})["busy_events"]), 0)

    def test_a_gigacloud_block_never_comes_back_as_a_softserve_block(self):
        # SS meeting -> GigaCloud block -> (GigaCloud read for the reverse leg) -> must NOT block SS again
        busy = sc.eventkit_busy({"events": [self.ss("A")], "config": self.CFG, "target_email": self.GC})["busy_events"]
        cmd = sc.reverse_reconcile({"busy_events": busy, "reverse_ledger": {}, "ss_placeholders": [],
                                    "config": dict(self.CFG, reverse_marker="busy-sync")})["creates"][0]
        self.assertEqual((cmd["marker"], cmd["title"]), ("[[busy-sync:ek:A]]", "Busy"))
        gc_row = {"uid": "GC1", "external_id": "GCUID1", "title": "Busy", "start": cmd["start"], "end": cmd["end"],
                  "all_day": False, "availability": "busy", "status": "none", "my_status": "", "attendees": [],
                  "organizer_email": "", "notes": cmd["marker"], "source": self.GC}
        self.assertEqual(sc.eventkit_busy({"events": [gc_row]})["busy_events"], [])
        # ...nor through Google's copy of the GigaCloud feed (the source while the account is out of Apple Calendar)
        feed = self.gev("f1", cal="gcfeed@import.calendar.google.com", summary="Busy", description=cmd["marker"])
        self.assertEqual(sc.reverse_sources({"events": [feed]})["busy_events"], [])

    def test_personal_google_blocks_gigacloud(self):
        events = [
            self.gev("keep"),                                                        # personal -> block
            self.gev("fam", cal="family123@group.calendar.google.com", summary="Dentist"),  # Family -> block
            self.gev("feed", cal="gcfeed@import.calendar.google.com", summary="Product daily"),  # GigaCloud itself
            self.gev("sscopy", summary="SS: Weekly sync-up"),                        # SS: copy -> SS covers it
            self.gev("ssmark", extendedProperties={"private": {"ssSync": "id:abc"}}),
            self.gev("ssatt", attendees=[{"email": self.SS}]),                       # an SS meeting
            self.gev("gcatt", attendees=[{"email": self.GC}]),                       # GigaCloud holds it
            self.gev("gcorg", organizer={"email": self.GC}),
            self.gev("ours", description="[[busy-sync:ek:A]]"),                      # our block -> never a source
            self.gev("free", transparency="transparent"),
            self.gev("dec", attendees=[{"self": True, "responseStatus": "declined"}]),
            {"id": "ad", "_cal": "orlov.alexej@gmail.com", "summary": "Trip",
             "start": {"date": "2026-12-01"}, "end": {"date": "2026-12-02"}},       # all-day
        ]
        out = sc.gc_google_busy({"events": events, "config": self.CFG})["busy_events"]
        self.assertEqual(len(out), 2, out)
        self.assertEqual(out[0]["key"], "g:" + sc._sha("orlov.alexej@gmail.com::keep")[:16])
        self.assertEqual(out[0]["start"], "2026-12-01T07:30:00-08:00")
        # the key sits in the GigaCloud block's notes: no personal calendar or address in it
        self.assertFalse([b for b in out if "@" in b["key"] or "family" in b["key"]])

    def test_gigacloud_block_converges_through_its_placeholder(self):
        busy = sc.eventkit_busy({"events": [self.ss("A")], "config": self.CFG, "target_email": self.GC})["busy_events"]
        ph = [{"ss_id": "GC9", "key": "ek:A", "start": "2026-12-01T18:00:00+02:00", "end": "2026-12-01T18:30:00+02:00"}]
        plan = sc.reverse_reconcile({"busy_events": busy, "reverse_ledger": {}, "ss_placeholders": ph,
                                     "config": dict(self.CFG, reverse_marker="busy-sync")})
        self.assertEqual(plan["counts"], {"create": 0, "update": 0, "delete": 0, "skip": 1})
        self.assertEqual(plan["relinks"]["ek:A"]["ss_id"], "GC9")

    def test_no_new_block_for_a_slot_that_already_ended(self):
        busy = sc.eventkit_busy({"events": [self.ss("A"), self.ss("B", start="2026-12-02T08:00:00-08:00",
                                                                   end="2026-12-02T08:30:00-08:00")],
                                 "config": self.CFG, "target_email": self.GC})["busy_events"]
        now = "2026-12-01T20:00:00Z"                                  # A (ends 16:30Z) is over, B is ahead
        plan = sc.reverse_reconcile({"busy_events": busy, "reverse_ledger": {}, "ss_placeholders": [],
                                     "create_after": now, "config": dict(self.CFG, reverse_marker="busy-sync")})
        self.assertEqual([c["key"] for c in plan["creates"]], ["ek:B"])
        self.assertEqual(plan["skips"], [{"key": "ek:A", "reason": "ended"}])
        # a block already there for an ended slot stays (still in the window), it isn't deleted
        ph = [{"ss_id": "GC1", "key": "ek:A", "start": "2026-12-01T08:00:00-08:00", "end": "2026-12-01T08:30:00-08:00"}]
        kept = sc.reverse_reconcile({"busy_events": busy, "reverse_ledger": {}, "ss_placeholders": ph,
                                     "create_after": now, "config": dict(self.CFG, reverse_marker="busy-sync")})
        self.assertEqual(kept["counts"], {"create": 1, "update": 0, "delete": 0, "skip": 1})

    def test_daily_summary_names_both_block_directions(self):
        fd, path = tempfile.mkstemp(suffix=".jsonl")
        os.close(fd)
        try:
            sc.log_run({"path": path, "ok": True, "rev_added": 2, "gc_added": 3, "gc_deleted": 1})
            msg = sc.daily_summary({"path": path, "dry_run": True})["message"]
            self.assertIn("\nGoogle+GigaCloud→SS busy-blocks: 2 added/updated.", msg)
            self.assertIn("\nSS+Google→GigaCloud busy-blocks: 3 added/updated, 1 removed.", msg)
        finally:
            os.unlink(path)

    def test_gc_pass_reads_writes_and_skips_as_designed(self):
        from unittest import mock
        import run
        ss_rows = [self.ss("A"), self.ss("U", my_status="", start="2026-12-01T09:00:00-08:00",
                                         end="2026-12-01T09:30:00-08:00"),
                   self.ss("D", my_status="declined"), self.ss("P", notes="[[gcal-busy:g:1]]")]
        gc_rows = [  # GigaCloud already holds the block for A, plus a real GigaCloud meeting
            {"uid": "GCPH-A", "notes": "[[busy-sync:ek:A]]", "start": "2026-12-01T18:00:00+02:00",
             "end": "2026-12-01T18:30:00+02:00"},
            {"uid": "GCREAL", "notes": "Agenda", "start": "2026-12-01T10:00:00+02:00", "end": "2026-12-01T11:00:00+02:00"}]
        reads = []

        def fake_read(args, g_min, g_max):
            reads.append(list(args))
            return (gc_rows if "--calendar" in args else ss_rows), None

        class FakeGcal:
            listed = []

            def list_calendars(self):
                return [{"id": "orlov.alexej@gmail.com"}, {"id": "gcfeed@import.calendar.google.com"}]

            def list_events(self, a, b, calendar_id=None):
                FakeGcal.listed.append(calendar_id)
                return [{"id": "p1", "summary": "School run", "start": {"dateTime": "2026-12-01T07:30:00-08:00"},
                         "end": {"dateTime": "2026-12-01T08:00:00-08:00"}},
                        {"id": "p2", "summary": "SS: Jumpstart daily", "start": {"dateTime": "2026-12-01T08:00:00-08:00"},
                         "end": {"dateTime": "2026-12-01T08:30:00-08:00"}}]

        written = []

        def fake_write(cmds):
            written.extend(cmds)
            return [{"op": c["op"], "key": c.get("key"), "ok": True, "ss_id": "NEW-" + str(i)} for i, c in enumerate(cmds)]

        fd, ledger = tempfile.mkstemp(suffix=".json")
        os.close(fd)
        os.unlink(ledger)
        ek = [("Exchange", "exchange", "Calendar"), (self.GC, "exchange", "Календар")]
        try:
            with mock.patch.multiple(run, GC_SOURCE=self.GC, GC_EMAIL=self.GC, GC_CAL="Календар",
                                     GC_GOOGLE_COPY="gcfeed@import.calendar.google.com", GC_DRY=False,
                                     GC_LEDGER=ledger, CFG=dict(run.CFG, **self.CFG),
                                     _read_window=fake_read, gc_write=fake_write):
                counts, errors = run.gc_pass("2026-11-30T00:00:00Z", "2026-12-16T00:00:00Z", FakeGcal(), ek)
                args = run.gc_writer_args()
                # not in Apple Calendar -> nothing read or written
                self.assertEqual(run.gc_pass("a", "b", FakeGcal(), [("Exchange", "exchange", "Calendar")])[0],
                                 {"gc_added": 0, "gc_modified": 0, "gc_deleted": 0})
            self.assertEqual(errors, [])
            self.assertEqual(counts, {"gc_added": 2, "gc_modified": 0, "gc_deleted": 0})
            self.assertEqual(sorted(c["key"] for c in written),
                             sorted(["ek:U", "g:" + sc._sha("orlov.alexej@gmail.com::p1")[:16]]))
            self.assertTrue(all(c["marker"] == "[[busy-sync:%s]]" % c["key"] for c in written))
            self.assertEqual(FakeGcal.listed, ["orlov.alexej@gmail.com"])     # Google's GigaCloud copy never read
            self.assertIn(["--type", "exchange", "--source", self.GC, "--calendar", "Календар"], reads)
            self.assertIn(["--type", "exchange", "--source", "Exchange"], reads)
            self.assertEqual(args, ["--source", self.GC, "--calendar", "Календар", "--marker", "busy-sync"])
            with open(ledger) as f:
                self.assertEqual(sorted(json.load(f)), sorted(["ek:A", "ek:U", "g:" + sc._sha("orlov.alexej@gmail.com::p1")[:16]]))
        finally:
            if os.path.exists(ledger):
                os.unlink(ledger)


if __name__ == "__main__":
    unittest.main(verbosity=2)
