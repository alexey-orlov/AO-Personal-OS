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
import sys
import json
import subprocess
from datetime import datetime, timedelta, timezone

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import sync_core as sc  # noqa: E402

HERE = os.environ.get("CALSYNC_HERE", os.path.dirname(os.path.abspath(__file__)))
READER = os.path.join(HERE, ".work", "ss-cal-read")
LEDGER = os.environ.get("CALSYNC_LEDGER", os.path.join(HERE, ".work/state/ledger.json"))
RUNLOG = os.environ.get("CALSYNC_RUNLOG", os.path.join(HERE, ".work/state/run-log.jsonl"))
DAYS = int(os.environ.get("CALSYNC_DAYS_AHEAD", "14"))
DRY = os.environ.get("CALSYNC_DRY_RUN", "1") == "1"
CFG = {
    "days_ahead": DAYS,
    "prefix": os.environ.get("CALSYNC_PREFIX", "SS: "),
    "attendee": os.environ.get("CALSYNC_ATTENDEE", "orlov.alexej@gmail.com"),
    "softserve_email": os.environ.get("CALSYNC_SS_EMAIL", "olekorlov@softserveinc.com"),
    "tz": os.environ.get("CALSYNC_TZ", "Europe/Kyiv"),
}


def read_ss():
    """Apple Calendar (Exchange source) -> source_events for reconcile. Returns (events, complete)."""
    try:
        out = subprocess.run([READER, "--exchange", "--days", str(DAYS)],
                             capture_output=True, text=True, timeout=60)
    except Exception as e:
        return [], False, "reader spawn failed: %s" % e
    if out.returncode != 0:
        return [], False, "reader exit %s: %s" % (out.returncode, (out.stderr or "")[:200])
    try:
        raw = json.loads(out.stdout or "[]")
    except json.JSONDecodeError as e:
        return [], False, "reader bad JSON: %s" % e
    evs = []
    for e in raw:
        if e.get("all_day"):        # skip all-day holidays / placeholders — mirror timed meetings only
            continue
        evs.append({
            "owa_id": e.get("uid"),                 # stable EventKit id -> reschedules = updates
            "title": e.get("title", ""),
            "start_wall": e.get("start"),           # absolute ISO (Kyiv) — naive-stripped + reinterpreted in tz
            "end_wall": e.get("end"),
            "all_day": e.get("all_day", False),
            "online": e.get("online", False),
            "join_url": e.get("join_url"),
            "location": e.get("location", ""),
            "organizer": e.get("organizer", ""),
            "attendees": e.get("attendees", []),
        })
    return evs, True, None


def to_api_body(p):
    """sync_core payload -> Google Calendar API v3 body (sendUpdates=none handles 'no email')."""
    body = {
        "summary": p["summary"],
        "attendees": p.get("attendees", []),
        "location": p.get("location", ""),
        "description": p.get("description", ""),
        "visibility": p.get("visibility", "private"),
    }
    if p.get("allDay"):
        body["start"] = {"date": p["startTime"]}
        body["end"] = {"date": p["endTime"]}
    else:
        tz = p.get("timeZone", CFG["tz"])
        body["start"] = {"dateTime": p["startTime"], "timeZone": tz}
        body["end"] = {"dateTime": p["endTime"], "timeZone": tz}
    return body


def main():
    now = datetime.now(timezone.utc)
    source, complete, err = read_ss()
    if not complete:
        sc.log_run({"path": RUNLOG, "ok": False, "error": err or "incomplete read"})
        print("ERROR: %s" % err)
        return 1

    # Window for reading Google (a hair wider than the reconcile window).
    from zoneinfo import ZoneInfo
    z = now.astimezone(ZoneInfo(CFG["tz"]))
    start = (z - timedelta(days=z.weekday())).replace(hour=0, minute=0, second=0, microsecond=0)
    g_min = start.astimezone(timezone.utc).isoformat()
    g_max = (start + timedelta(days=DAYS + 2)).astimezone(timezone.utc).isoformat()

    import gcal
    try:
        gevents = gcal.list_events(g_min.replace("+00:00", "Z"), g_max.replace("+00:00", "Z"))
    except Exception as e:
        sc.log_run({"path": RUNLOG, "ok": False, "error": "google list failed: %s" % e})
        print("ERROR: google list failed: %s" % e)
        return 1
    ext = sc.extract({"events": gevents, "config": CFG})

    try:
        with open(LEDGER) as f:
            ledger = json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        ledger = {}

    plan = sc.reconcile({
        "now_utc": now.isoformat(), "owa_tz": CFG["tz"], "source_complete": True,
        "source_events": source, "ledger": ledger,
        "google_copies": ext["google_copies"], "google_native": ext["google_native"], "config": CFG,
    })
    c = plan["counts"]
    if DRY:
        print("DRY-RUN plan: +%d create  ~%d update  -%d delete  =%d skip (no writes)"
              % (c["create"], c["update"], c["delete"], c["skip"]))
        for x in plan["creates"]:
            print("   would create %s @ %s" % (x["payload"]["summary"], x["payload"]["startTime"]))
        sc.log_run({"path": RUNLOG, "ok": True, "added": 0, "modified": 0, "deleted": 0})
        return 0

    applied = {"creates": [], "updates": [], "deletes": []}
    errors = []
    for x in plan["creates"]:
        try:
            ev = gcal.create_event(to_api_body(x["payload"]))
            applied["creates"].append({**{k: x[k] for k in ("source_key", "content_hash", "start_kiev", "title")},
                                       "google_event_id": ev["id"]})
        except Exception as e:
            errors.append("create '%s': %s" % (x["payload"]["summary"], e))
    for x in plan["updates"]:
        try:
            gcal.update_event(x["google_event_id"], to_api_body(x["payload"]))
            applied["updates"].append({k: x[k] for k in ("source_key", "content_hash", "start_kiev", "title", "google_event_id")})
        except Exception as e:
            errors.append("update '%s': %s" % (x["payload"]["summary"], e))
    for x in plan["deletes"]:
        try:
            gcal.delete_event(x["google_event_id"])
            applied["deletes"].append({"source_key": x["source_key"]})
        except Exception as e:
            errors.append("delete %s: %s" % (x["google_event_id"], e))

    sc.commit({"path": LEDGER, "applied": applied})
    sc.log_run({"path": RUNLOG, "ok": not errors,
                "added": len(applied["creates"]), "modified": len(applied["updates"]),
                "deleted": len(applied["deletes"]), "error": ("; ".join(errors)[:400] or None)})
    print("applied: +%d created  ~%d updated  -%d deleted%s"
          % (len(applied["creates"]), len(applied["updates"]), len(applied["deletes"]),
             ("  (%d errors)" % len(errors)) if errors else ""))
    return 0


if __name__ == "__main__":
    sys.exit(main())
