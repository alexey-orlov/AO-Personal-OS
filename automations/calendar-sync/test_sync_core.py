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


class TestEnrichment(unittest.TestCase):
    def test_description_status_and_note(self):
        ev = src("Products: weekly meeting", "2026-06-17T05:00:00", "2026-06-17T05:30:00",
                 my_status="accepted", organizer="Bohdan Khomych", organizer_email="bkhomych@softserveinc.com",
                 notes=("Agenda: review Q3 roadmap.\n________________________________\nMicrosoft Teams meeting\n"
                        "Join: https://teams.microsoft.com/x\nMeeting ID: 123\nPasscode: abc\n"
                        "Need help? https://aka.ms\nThis email may contain confidential material."),
                 attendees=[{"name": "Oleksii Orlov", "email": "olekorlov@softserveinc.com", "status": "accepted"},
                            {"name": "Pawel Domal", "email": "pdomal@softserveinc.com", "status": "needsAction"}])
        p = sc.reconcile(base([ev]))["creates"][0]["payload"]
        self.assertEqual(p["attendees"][0]["responseStatus"], "accepted")
        d = p["description"]
        self.assertIn("Agenda: review Q3 roadmap.", d)
        self.assertIn("Organizer: Bohdan Khomych <bkhomych@softserveinc.com>", d)
        self.assertIn("Your response: accepted", d)
        self.assertIn("Oleksii Orlov — accepted", d)
        self.assertIn("Pawel Domal — no response", d)
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

    def gev(self, id="e1", cal="cal1", summary="GigaCloud sync",
            start="2026-06-20T15:00:00+03:00", end="2026-06-20T15:30:00+03:00", **kw):
        e = {"id": id, "_cal": cal, "summary": summary,
             "start": {"dateTime": start}, "end": {"dateTime": end}}
        e.update(kw)
        return e

    def test_busy_and_antirecursion_filters(self):
        events = [
            self.gev(id="keep", summary="GigaCloud <> Rafay"),
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

    def test_delete_guarded_on_incomplete_read(self):
        ledger = {"cal1::gone": {"ss_id": "SSx", "hash": "h"}}
        full = sc.reverse_reconcile({"busy_events": [], "reverse_ledger": ledger, "ss_placeholders": []})
        self.assertEqual(full["counts"]["delete"], 1)
        guarded = sc.reverse_reconcile({"busy_events": [], "reverse_ledger": ledger,
                                        "ss_placeholders": [], "source_complete": False})
        self.assertEqual(guarded["counts"]["delete"], 0)


if __name__ == "__main__":
    unittest.main(verbosity=2)
