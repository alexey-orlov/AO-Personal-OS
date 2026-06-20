#!/usr/bin/env python3
"""
run.py — one calendar-sync pass, pure code (no Claude, no browser).

  Apple Calendar (EventKit via ss-cal-read)  ->  sync_core.reconcile  ->  Google (gcal.py)

Run isolated so zoneinfo imports cleanly under macOS TCC:
    python3 -I run.py            # honors CALSYNC_DRY_RUN; prints a one-line result
Env (from config.sh): CALSYNC_HERE, CALSYNC_LEDGER, CALSYNC_RUNLOG, CALSYNC_CALENDAR_ID,
CALSYNC_ATTENDEE, CALSYNC_SS_EMAIL, CALSYNC_TZ, CALSYNC_PREFIX, CALSYNC_DAYS_AHEAD,
CALSYNC_DRY_RUN, CALSYNC_GOOGLE_CLIENT_ID/_SECRET.
"""
import os
import re
import sys
import json
import subprocess
from datetime import datetime, timedelta, timezone
from zoneinfo import ZoneInfo

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import sync_core as sc  # noqa: E402

HERE = os.environ.get("CALSYNC_HERE", os.path.dirname(os.path.abspath(__file__)))
READER = os.path.join(HERE, ".work", "ss-cal-read")
WRITER = os.path.join(HERE, ".work", "ss-cal-write")
LEDGER = os.environ.get("CALSYNC_LEDGER", os.path.join(HERE, ".work/state/ledger.json"))
REV_LEDGER = os.environ.get("CALSYNC_REV_LEDGER", os.path.join(HERE, ".work/state/reverse-ledger.json"))
RUNLOG = os.environ.get("CALSYNC_RUNLOG", os.path.join(HERE, ".work/state/run-log.jsonl"))
DAYS = int(os.environ.get("CALSYNC_DAYS_AHEAD", "14"))
DRY = os.environ.get("CALSYNC_DRY_RUN", "1") == "1"
REVERSE = os.environ.get("CALSYNC_REVERSE", "1") == "1"   # reverse leg on by default; CALSYNC_REVERSE=0 disables
CFG = {
    "days_ahead": DAYS,
    "prefix": os.environ.get("CALSYNC_PREFIX", "SS: "),
    "attendee": os.environ.get("CALSYNC_ATTENDEE", "orlov.alexej@gmail.com"),
    "softserve_email": os.environ.get("CALSYNC_SS_EMAIL", "olekorlov@softserveinc.com"),
    "tz": os.environ.get("CALSYNC_TZ", "Europe/Kyiv"),
    "reverse_marker": os.environ.get("CALSYNC_REVERSE_MARKER", "gcal-busy"),
    "busy_title": os.environ.get("CALSYNC_BUSY_TITLE", "Busy"),
}
_REVKEY = re.compile(r"\[\[%s:([^\]]+)\]\]" % re.escape(CFG["reverse_marker"]))


def read_ss():
    """Apple Calendar (Exchange source) -> (forward source_events, reverse placeholders, complete, err).

    Splits the single EventKit read: our own reverse 'Busy' placeholders (notes carry the
    [[gcal-busy:...]] marker) are pulled OUT of the forward source — that's the Loop-B
    recursion break — and returned separately so the reverse leg can reconcile them."""
    try:
        out = subprocess.run([READER, "--exchange", "--days", str(DAYS)],
                             capture_output=True, text=True, timeout=60)
    except Exception as e:
        return [], [], False, "reader spawn failed: %s" % e
    if out.returncode != 0:
        return [], [], False, "reader exit %s: %s" % (out.returncode, (out.stderr or "")[:200])
    try:
        raw = json.loads(out.stdout or "[]")
    except json.JSONDecodeError as e:
        return [], [], False, "reader bad JSON: %s" % e
    try:    # keep the last raw EventKit read for diagnostics (local-only; .work is git-ignored)
        with open(os.path.join(HERE, ".work/state/last-read.json"), "w", encoding="utf-8") as f:
            f.write(out.stdout or "[]")
    except OSError:
        pass
    evs, placeholders = [], []
    marker = "[[" + CFG["reverse_marker"]
    for e in raw:
        if e.get("all_day"):        # skip all-day holidays / placeholders — mirror timed meetings only
            continue
        notes = e.get("notes") or ""
        if marker in notes:         # our own reverse 'Busy' placeholder -> NOT a forward source (anti-recursion)
            m = _REVKEY.search(notes)
            placeholders.append({"ss_id": e.get("uid"), "key": m.group(1) if m else None,
                                 "start": e.get("start"), "end": e.get("end")})
            continue
        evs.append({
            "owa_id": e.get("uid"),                 # stable EventKit id -> reschedules = updates
            "title": e.get("title", ""),
            "start_wall": e.get("start"),           # absolute ISO (Kyiv) — naive-stripped + reinterpreted in tz
            "end_wall": e.get("end"),
            "all_day": e.get("all_day", False),
            "recurring": e.get("recurring", False),   # recurring instances share one id -> key adds the date
            "online": e.get("online", False),
            "join_url": e.get("join_url"),
            "location": e.get("location", ""),
            "organizer": e.get("organizer", ""),
            "organizer_email": e.get("organizer_email", ""),
            "my_status": e.get("my_status", ""),    # the user's RSVP — drives Busy/Free + the description
            "attendees": e.get("attendees", []),
        })
    return evs, placeholders, True, None


def to_api_body(p, source_key=None, content_hash=None):
    """sync_core payload -> Google Calendar API v3 body (sendUpdates=none handles 'no email').
    The sync marker goes in private extendedProperties, keeping the description clean."""
    body = {
        "summary": p["summary"],
        "attendees": p.get("attendees", []),
        "location": p.get("location", ""),
        "description": p.get("description", ""),
        "visibility": p.get("visibility", "private"),
        "transparency": p.get("transparency", "opaque"),   # Busy unless declined
    }
    if source_key:
        body["extendedProperties"] = {"private": {"ssSync": source_key, "ssHash": content_hash or ""}}
    if p.get("allDay"):
        body["start"] = {"date": p["startTime"]}
        body["end"] = {"date": p["endTime"]}
    else:
        tz = p.get("timeZone", CFG["tz"])
        body["start"] = {"dateTime": p["startTime"], "timeZone": tz}
        body["end"] = {"dateTime": p["endTime"], "timeZone": tz}
    return body


def ss_write(commands):
    """Apply create/update/delete commands to the SS Exchange calendar via the EventKit writer."""
    if not commands:
        return []
    p = subprocess.run([WRITER], input=json.dumps(commands), capture_output=True, text=True, timeout=120)
    if p.returncode != 0:
        raise RuntimeError("writer exit %s: %s" % (p.returncode, (p.stderr or "")[:200]))
    return json.loads(p.stdout or "[]")


def _load_json(path, default):
    try:
        with open(path) as f:
            return json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        return default


def window_bounds(now):
    """[Monday 00:00 this week, +DAYS+2) as RFC3339-Z strings for the Google reads."""
    z = now.astimezone(ZoneInfo(CFG["tz"]))
    start = (z - timedelta(days=z.weekday())).replace(hour=0, minute=0, second=0, microsecond=0)
    g_min = start.astimezone(timezone.utc).isoformat().replace("+00:00", "Z")
    g_max = (start + timedelta(days=DAYS + 2)).astimezone(timezone.utc).isoformat().replace("+00:00", "Z")
    return g_min, g_max


def forward_pass(now, source, g_min, g_max, gcal):
    """SS -> Google (SS: copies). Returns (counts, errors)."""
    gevents = gcal.list_events(g_min, g_max)
    ext = sc.extract({"events": gevents, "config": CFG})
    ledger = _load_json(LEDGER, {})
    plan = sc.reconcile({
        "now_utc": now.isoformat(), "owa_tz": CFG["tz"], "source_complete": True,
        "source_events": source, "ledger": ledger,
        "google_copies": ext["google_copies"], "google_native": ext["google_native"], "config": CFG,
    })
    c = plan["counts"]
    if DRY:
        print("[forward] DRY plan: +%d ~%d -%d =%d skip" % (c["create"], c["update"], c["delete"], c["skip"]))
        for x in plan["creates"]:
            print("   would create %s @ %s" % (x["payload"]["summary"], x["payload"]["startTime"]))
        return {"added": 0, "modified": 0, "deleted": 0}, []
    applied, errors = {"creates": [], "updates": [], "deletes": []}, []
    for x in plan["creates"]:
        try:
            ev = gcal.create_event(to_api_body(x["payload"], x["source_key"], x["content_hash"]))
            applied["creates"].append({**{k: x[k] for k in ("source_key", "content_hash", "start_kiev", "title")},
                                       "google_event_id": ev["id"]})
        except Exception as e:
            errors.append("fwd create '%s': %s" % (x["payload"]["summary"], e))
    for x in plan["updates"]:
        try:
            gcal.update_event(x["google_event_id"], to_api_body(x["payload"], x["source_key"], x["content_hash"]))
            applied["updates"].append({k: x[k] for k in ("source_key", "content_hash", "start_kiev", "title", "google_event_id")})
        except Exception as e:
            errors.append("fwd update '%s': %s" % (x["payload"]["summary"], e))
    for x in plan["deletes"]:
        try:
            gcal.delete_event(x["google_event_id"])
            applied["deletes"].append({"source_key": x["source_key"]})
        except Exception as e:
            errors.append("fwd delete %s: %s" % (x["google_event_id"], e))
    sc.commit({"path": LEDGER, "applied": applied})
    return {"added": len(applied["creates"]), "modified": len(applied["updates"]),
            "deleted": len(applied["deletes"])}, errors


def reverse_pass(placeholders, g_min, g_max, gcal):
    """Google busy (all calendars) -> SS 'Busy' placeholders. Returns (counts, errors)."""
    events, complete = [], True
    try:
        cals = gcal.list_calendars()
    except Exception as e:
        return {"rev_added": 0, "rev_modified": 0, "rev_deleted": 0}, ["rev list_calendars: %s" % e]
    for cal in cals:
        try:
            for ev in gcal.list_events(g_min, g_max, calendar_id=cal["id"]):
                ev["_cal"] = cal["id"]
                events.append(ev)
        except Exception:
            complete = False                      # a calendar failed -> don't prune placeholders this run
    busy = sc.reverse_sources({"events": events, "config": CFG})["busy_events"]
    rledger = _load_json(REV_LEDGER, {})
    plan = sc.reverse_reconcile({"busy_events": busy, "reverse_ledger": rledger,
                                 "ss_placeholders": placeholders, "source_complete": complete, "config": CFG})
    c = plan["counts"]
    if DRY:
        print("[reverse] DRY plan: +%d ~%d -%d =%d skip (complete=%s)"
              % (c["create"], c["update"], c["delete"], c["skip"], complete))
        return {"rev_added": 0, "rev_modified": 0, "rev_deleted": 0}, []
    by_key = {x["key"]: x for x in (plan["creates"] + plan["updates"])}
    try:
        results = ss_write(plan["creates"] + plan["updates"] + plan["deletes"])
    except Exception as e:
        return {"rev_added": 0, "rev_modified": 0, "rev_deleted": 0}, ["rev writer: %s" % e]
    ra = rm = rd = 0
    errors = []
    for r in results:
        if not r.get("ok"):
            errors.append("rev %s %s: %s" % (r.get("op"), r.get("key") or r.get("ss_id"), r.get("error")))
            continue
        op = r.get("op")
        if op in ("create", "update"):
            rledger[r["key"]] = {"ss_id": r.get("ss_id"), "hash": by_key.get(r["key"], {}).get("hash")}
            ra += (op == "create"); rm += (op == "update")
        elif op == "delete":
            rledger.pop(r.get("key"), None); rd += 1
    try:
        with open(REV_LEDGER, "w", encoding="utf-8") as f:
            json.dump(rledger, f, ensure_ascii=False, indent=2, sort_keys=True)
    except OSError as e:
        errors.append("rev ledger save: %s" % e)
    return {"rev_added": ra, "rev_modified": rm, "rev_deleted": rd}, errors


def main():
    now = datetime.now(timezone.utc)
    source, placeholders, complete, err = read_ss()
    if not complete:
        sc.log_run({"path": RUNLOG, "ok": False, "error": err or "incomplete read"})
        print("ERROR: %s" % err)
        return 1
    g_min, g_max = window_bounds(now)
    import gcal

    counts = {"added": 0, "modified": 0, "deleted": 0, "rev_added": 0, "rev_modified": 0, "rev_deleted": 0}
    errors = []
    try:
        fwd, ferr = forward_pass(now, source, g_min, g_max, gcal)
        counts.update(fwd); errors += ferr
    except Exception as e:
        errors.append("forward pass: %s" % e)
    if REVERSE:
        try:
            rev, rerr = reverse_pass(placeholders, g_min, g_max, gcal)
            counts.update(rev); errors += rerr
        except Exception as e:
            errors.append("reverse pass: %s" % e)

    sc.log_run({"path": RUNLOG, "ok": not errors,
                "added": counts["added"], "modified": counts["modified"], "deleted": counts["deleted"],
                "rev_added": counts["rev_added"], "rev_modified": counts["rev_modified"],
                "rev_deleted": counts["rev_deleted"], "error": ("; ".join(errors)[:400] or None)})
    print("%s  SS->G: +%d ~%d -%d   G->SS: +%d ~%d -%d%s" % (
        "DRY-RUN" if DRY else "applied", counts["added"], counts["modified"], counts["deleted"],
        counts["rev_added"], counts["rev_modified"], counts["rev_deleted"],
        ("  (%d errors)" % len(errors)) if errors else ""))
    return 0


if __name__ == "__main__":
    sys.exit(main())
