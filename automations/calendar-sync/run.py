#!/usr/bin/env python3
"""
run.py — one calendar-sync pass, pure code (no Claude, no browser).

  forward:   SoftServe (EventKit, ss-cal-read)    -> sync_core.reconcile          -> Google (gcal.py)
  reverse:   Google + GigaCloud (EventKit)         -> sync_core.reverse_reconcile  -> SoftServe (ss-cal-write)
  gigacloud: SoftServe (EventKit) + personal Google -> sync_core.reverse_reconcile -> GigaCloud (ss-cal-write --source ...)

Run isolated so zoneinfo imports cleanly under macOS TCC:
    python3 -I run.py            # honors CALSYNC_DRY_RUN; prints a one-line result
Env (from config.sh): CALSYNC_HERE, CALSYNC_LEDGER, CALSYNC_RUNLOG, CALSYNC_CALENDAR_ID,
CALSYNC_ATTENDEE, CALSYNC_SS_EMAIL, CALSYNC_SS_SOURCE, CALSYNC_EK_SOURCES, CALSYNC_TZ,
CALSYNC_PREFIX, CALSYNC_DAYS_AHEAD, CALSYNC_DRY_RUN, CALSYNC_GOOGLE_CLIENT_ID/_SECRET,
CALSYNC_GC_SOURCE / _WRITE_CAL / _EMAIL / _GOOGLE_COPY / _LEDGER / _DRY_RUN (the GigaCloud leg).
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
SS_SOURCE = os.environ.get("CALSYNC_SS_SOURCE", "Exchange")   # SoftServe's account title in Apple Calendar
# GigaCloud leg: off unless config.sh names GigaCloud's account; writes only when the whole sync is
# live AND its own flag (.work/state/LIVE-GC -> CALSYNC_GC_DRY_RUN=0) is set, else it plans.
GC_SOURCE = os.environ.get("CALSYNC_GC_SOURCE", "")
GC_CAL = os.environ.get("CALSYNC_GC_WRITE_CAL", "Календар")
GC_EMAIL = os.environ.get("CALSYNC_GC_EMAIL") or GC_SOURCE        # the account is titled by its address
GC_GOOGLE_COPY = os.environ.get("CALSYNC_GC_GOOGLE_COPY", "")
GC_LEDGER = os.environ.get("CALSYNC_GC_LEDGER", os.path.join(HERE, ".work/state/gc-ledger.json"))
GC_DRY = DRY or os.environ.get("CALSYNC_GC_DRY_RUN", "1") == "1"
CFG = {
    "days_ahead": DAYS,
    "prefix": os.environ.get("CALSYNC_PREFIX", "SS: "),
    "attendee": os.environ.get("CALSYNC_ATTENDEE", "orlov.alexej@gmail.com"),
    "softserve_email": os.environ.get("CALSYNC_SS_EMAIL", "olekorlov@softserveinc.com"),
    "tz": os.environ.get("CALSYNC_TZ", "Europe/Kyiv"),
    "reverse_marker": os.environ.get("CALSYNC_REVERSE_MARKER", "gcal-busy"),
    "gc_marker": os.environ.get("CALSYNC_GC_MARKER", "busy-sync"),
    "gc_email": GC_EMAIL,
    "gc_google_copy": GC_GOOGLE_COPY,
    "busy_title": os.environ.get("CALSYNC_BUSY_TITLE", "Busy"),
}
_REVKEY = re.compile(r"\[\[%s:([^\]]+)\]\]" % re.escape(CFG["reverse_marker"]))
_GCKEY = re.compile(r"\[\[%s:([^\]]+)\]\]" % re.escape(CFG["gc_marker"]))
GC_WRITER_ARGS = ["--source", GC_SOURCE, "--calendar", GC_CAL, "--marker", CFG["gc_marker"]]


def read_ss():
    """Apple Calendar (SoftServe's Exchange account only) -> (forward source_events, reverse
    placeholders, complete, err).

    Pinned to the account titled CALSYNC_SS_SOURCE: another Exchange account in Apple Calendar
    (GigaCloud's, since 2026-11-24) must never be read as SoftServe. Splits the single EventKit
    read: our own reverse 'Busy' placeholders (notes carry the [[gcal-busy:...]] marker) are pulled
    OUT of the forward source — that's the Loop-B recursion break — and returned separately so the
    reverse leg can reconcile them."""
    try:
        out = subprocess.run([READER, "--type", "exchange", "--source", SS_SOURCE, "--days", str(DAYS)],
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


def write_busy(commands, args=()):
    """Apply create/update/delete commands through the EventKit writer. `args` pins the calendar it
    writes; none = SoftServe's, from CALSYNC_SS_SOURCE / CALSYNC_SS_WRITE_CAL."""
    if not commands:
        return []
    p = subprocess.run([WRITER] + list(args), input=json.dumps(commands), capture_output=True, text=True, timeout=120)
    if p.returncode != 0:
        raise RuntimeError("writer exit %s: %s" % (p.returncode, (p.stderr or "")[:200]))
    return json.loads(p.stdout or "[]")


def ss_write(commands):
    return write_busy(commands)


def gc_write(commands):
    return write_busy(commands, GC_WRITER_ARGS)


def gc_preflight():
    """The GigaCloud writer with no commands: exit 0 when its calendar is there and writable."""
    try:
        p = subprocess.run([WRITER] + GC_WRITER_ARGS, input="[]", capture_output=True, text=True, timeout=60)
    except Exception as e:
        return False, "spawn failed: %s" % e
    return p.returncode == 0, "exit %s: %s" % (p.returncode, (p.stderr or "").strip()[:200])


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
        for x in plan["deletes"]:
            cur = ledger.get(x["source_key"]) or {}
            print("   would delete %s @ %s (%s)" % (cur.get("title", x["source_key"]), cur.get("start_kiev", "?"),
                                                    x.get("reason")))
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
    deleted = 0
    for x in plan["deletes"]:
        try:
            gcal.delete_event(x["google_event_id"])
            deleted += 1
            if x.get("reason") != "duplicate":   # a pruned duplicate leaves the kept copy's ledger entry
                applied["deletes"].append({"source_key": x["source_key"]})
        except Exception as e:
            errors.append("fwd delete %s: %s" % (x["google_event_id"], e))
    sc.commit({"path": LEDGER, "applied": applied})
    return {"added": len(applied["creates"]), "modified": len(applied["updates"]),
            "deleted": deleted}, errors


_LIST_LINE = re.compile(r"^\[(.*)\] \((\w+)\) :: (.*)$")


def ek_sources():
    """CALSYNC_EK_SOURCES ("type:Title[=Google calendar id it replaces]", comma-separated, type
    and title as `ss-cal-read --list` prints them) -> [(type, title, replaced Google id or None)]."""
    out = []
    for item in os.environ.get("CALSYNC_EK_SOURCES", "").split(","):
        spec, _, gid = item.strip().partition("=")
        typ, _, title = spec.partition(":")
        if typ.strip() and title.strip():
            out.append((typ.strip().lower(), title.strip(), gid.strip() or None))
    return out


def _not_ss(source):
    """A calendar of any account but SoftServe's: SS events must never block SS (they'd loop)."""
    return (source or "").casefold() != SS_SOURCE.casefold()


def _read_window(args, g_min, g_max):
    """ss-cal-read <args> over the Google window [g_min, g_max) -> (rows overlapping it, error)."""
    lo = datetime.fromisoformat(g_min.replace("Z", "+00:00"))
    hi = datetime.fromisoformat(g_max.replace("Z", "+00:00"))
    try:
        out = subprocess.run([READER] + list(args) + ["--from", g_min, "--days", str((hi - lo).days + 1)],
                             capture_output=True, text=True, timeout=60)
    except Exception as e:
        return None, "reader spawn failed: %s" % e
    if out.returncode != 0:
        return None, "reader exit %s: %s" % (out.returncode, (out.stderr or "").strip()[:200])
    try:
        rows = json.loads(out.stdout or "[]")
    except json.JSONDecodeError as e:
        return None, "reader bad JSON: %s" % e
    return [r for r in rows if sc._utc(r["start"]) < hi and sc._utc(r["end"]) > lo], None   # Google's overlap rule


def read_ek(typ, title, g_min, g_max):
    """One Apple Calendar calendar (of any account but SoftServe's) over the Google window -> (rows, error)."""
    rows, err = _read_window(["--type", typ, "--calendar", title], g_min, g_max)
    if err:
        return None, err
    return [r for r in rows if _not_ss(r.get("source"))], None


def google_events(gcal, cals, skip, g_min, g_max, tag):
    """Events of every listed Google calendar not in `skip`, each tagged with `_cal` -> (events,
    errors); an error means that calendar could not be read, so the read is incomplete."""
    events, errors = [], []
    for cal in cals:
        if cal["id"] in skip:
            continue
        try:
            for ev in gcal.list_events(g_min, g_max, calendar_id=cal["id"]):
                ev["_cal"] = cal["id"]
                events.append(ev)
        except Exception as e:
            errors.append("%s list %s: %s" % (tag, cal.get("summaryOverride") or cal.get("summary") or cal["id"], e))
    return events, errors


def print_dry(tag, plan, complete):
    """A DRY run lists every create, update and delete a busy-block plan would make."""
    c = plan["counts"]
    print("[%s] DRY plan: +%d ~%d -%d =%d skip (complete=%s)"
          % (tag, c["create"], c["update"], c["delete"], c["skip"], complete))
    for x in plan["creates"] + plan["updates"]:
        print("   would %s Busy %s .. %s  [%s]" % (x["op"], x["start"], x["end"], x["key"][:70]))
    for x in plan["deletes"]:
        print("   would delete %s%s" % (x.get("key") or x["ss_id"], " (duplicate)" if x.get("duplicate") else ""))


def apply_busy(plan, ledger, ledger_path, write, tag):
    """Run a busy-block plan through its writer and record in its ledger what landed.
    Returns ((added, modified, deleted), errors)."""
    by_key = {x["key"]: x for x in (plan["creates"] + plan["updates"])}
    dup_ids = {d["ss_id"] for d in plan["deletes"] if d.get("duplicate")}
    try:
        results = write(plan["creates"] + plan["updates"] + plan["deletes"])
    except Exception as e:
        return (0, 0, 0), ["%s writer: %s" % (tag, e)]
    ledger.update(plan.get("relinks") or {})   # point the ledger at the placeholder the calendar really holds
    a = m = d = 0
    errors = []
    for r in results:
        if not r.get("ok"):
            errors.append("%s %s %s: %s" % (tag, r.get("op"), r.get("key") or r.get("ss_id"), r.get("error")))
            continue
        op = r.get("op")
        if op in ("create", "update"):
            ledger[r["key"]] = {"ss_id": r.get("ss_id"), "hash": by_key.get(r["key"], {}).get("hash")}
            a += (op == "create"); m += (op == "update")
        elif op == "delete":
            if r.get("ss_id") not in dup_ids:      # pruning a duplicate keeps the slot's entry
                ledger.pop(r.get("key"), None)
            d += 1
    try:
        with open(ledger_path, "w", encoding="utf-8") as f:
            json.dump(ledger, f, ensure_ascii=False, indent=2, sort_keys=True)
    except OSError as e:
        errors.append("%s ledger save: %s" % (tag, e))
    return (a, m, d), errors


def reverse_pass(placeholders, g_min, g_max, gcal, ek_cals=None):
    """Busy time in every Google calendar and in the calendars read straight from Apple Calendar
    (CALSYNC_EK_SOURCES) -> SS 'Busy' placeholders. Returns (counts, errors)."""
    zero = {"rev_added": 0, "rev_modified": 0, "rev_deleted": 0}
    events, complete, errors = [], True, []
    try:
        cals = gcal.list_calendars()
    except Exception as e:
        return zero, ["rev list_calendars: %s" % e]
    # A calendar read from Apple Calendar replaces its slower Google copy while it is there. When
    # Apple Calendar can't be listed or read, neither copy is used and nothing is pruned: falling
    # back to the Google copy for one run would re-key every placeholder of that calendar twice.
    ek_busy, skip = [], set()
    for typ, title, gid in ek_sources():
        if ek_cals is None:
            complete = False
            if gid:
                skip.add(gid)
            errors.append("rev %s: Apple Calendar list unavailable" % title)
            continue
        if not any(t == typ and c.casefold() == title.casefold() and _not_ss(s) for s, t, c in ek_cals):
            continue                                  # not in Apple Calendar: its Google copy stays the source
        if gid:
            skip.add(gid)
        rows, err = read_ek(typ, title, g_min, g_max)
        if err:
            complete = False
            errors.append("rev %s: %s" % (title, err))
            continue
        ek_busy += sc.eventkit_busy({"events": rows, "config": CFG})["busy_events"]
    events, lerr = google_events(gcal, cals, skip, g_min, g_max, "rev")
    if lerr:
        complete = False                              # a calendar failed -> don't prune placeholders this run
        errors += lerr
    busy = sc.reverse_sources({"events": events, "config": CFG})["busy_events"] + ek_busy
    rledger = _load_json(REV_LEDGER, {})
    plan = sc.reverse_reconcile({"busy_events": busy, "reverse_ledger": rledger,
                                 "ss_placeholders": placeholders, "source_complete": complete, "config": CFG})
    if DRY:
        print_dry("reverse", plan, complete)
        return zero, errors
    (ra, rm, rd), werr = apply_busy(plan, rledger, REV_LEDGER, ss_write, "rev")
    return {"rev_added": ra, "rev_modified": rm, "rev_deleted": rd}, errors + werr


def gc_pass(g_min, g_max, gcal, ek_cals):
    """Busy at SoftServe (its account, read straight from Apple Calendar) or in a personal Google
    calendar -> GigaCloud 'Busy' blocks in GC_CAL of the account GC_SOURCE. Plans only while
    GC_DRY. Returns (counts, errors)."""
    zero = {"gc_added": 0, "gc_modified": 0, "gc_deleted": 0}
    if ek_cals is None:
        return zero, ["gc: Apple Calendar list unavailable"]
    if not any(s.casefold() == GC_SOURCE.casefold() and t == "exchange" and c.casefold() == GC_CAL.casefold()
               for s, t, c in ek_cals):
        return zero, ["gc: %s of %s is not in Apple Calendar" % (GC_CAL, GC_SOURCE)]
    # The blocks GigaCloud already holds. Unread, nothing is written: every slot would be created twice.
    rows, err = _read_window(["--type", "exchange", "--source", GC_SOURCE, "--calendar", GC_CAL], g_min, g_max)
    if err:
        return zero, ["gc read: %s" % err]
    marker = "[[%s:" % CFG["gc_marker"]
    placeholders = []
    for r in rows:
        notes = r.get("notes") or ""
        if marker in notes:
            m = _GCKEY.search(notes)
            placeholders.append({"ss_id": r.get("uid"), "key": m.group(1) if m else None,
                                 "start": r.get("start"), "end": r.get("end")})
    # Sources: SoftServe's whole account over the same window (its own "Busy" blocks drop out in
    # eventkit_busy), and every Google calendar but Google's copy of GigaCloud.
    complete, errors = True, []
    ss_rows, err = _read_window(["--type", "exchange", "--source", SS_SOURCE], g_min, g_max)
    if err:
        complete = False
        errors.append("gc SoftServe read: %s" % err)
    busy = sc.eventkit_busy({"events": ss_rows or [], "config": CFG, "target_email": GC_EMAIL})["busy_events"]
    try:
        events, lerr = google_events(gcal, gcal.list_calendars(), {GC_GOOGLE_COPY}, g_min, g_max, "gc")
    except Exception as e:
        events, lerr = [], ["gc list_calendars: %s" % e]
    if lerr:
        complete = False
        errors += lerr
    busy += sc.gc_google_busy({"events": events, "config": CFG})["busy_events"]
    ledger = _load_json(GC_LEDGER, {})
    plan = sc.reverse_reconcile({"busy_events": busy, "reverse_ledger": ledger, "ss_placeholders": placeholders,
                                 "source_complete": complete, "config": dict(CFG, reverse_marker=CFG["gc_marker"])})
    if GC_DRY:
        print_dry("gigacloud", plan, complete)
        ok, why = gc_preflight()
        print("   GigaCloud calendar writable: %s" % ("yes" if ok else why))
        return zero, errors + ([] if ok else ["gc writer preflight: %s" % why])
    (a, m, d), werr = apply_busy(plan, ledger, GC_LEDGER, gc_write, "gc")
    return {"gc_added": a, "gc_modified": m, "gc_deleted": d}, errors + werr


def snapshot_calendars(g_min, g_max):
    """EventKit's calendar list -> [(source, type, title)], or None when it can't be read. Also saved,
    with each calendar's count of timed events in the sync window, to .work/state/calendars.txt, so a
    session without the host app's Calendar grant can see what every calendar holds."""
    try:
        out = subprocess.run([READER, "--list"], capture_output=True, text=True, timeout=30)
    except Exception:
        return None
    if out.returncode != 0:
        return None
    cals = [m.groups() for m in (_LIST_LINE.match(x.strip()) for x in out.stdout.splitlines()) if m]
    timed = {}
    try:
        lo = datetime.fromisoformat(g_min.replace("Z", "+00:00"))
        hi = datetime.fromisoformat(g_max.replace("Z", "+00:00"))
        allr = subprocess.run([READER, "--from", g_min, "--days", str((hi - lo).days + 1)],
                              capture_output=True, text=True, timeout=60)
        for r in json.loads(allr.stdout or "[]") if allr.returncode == 0 else []:
            if not r.get("all_day") and sc._utc(r["start"]) < hi:
                k = (r.get("source"), r.get("source_type"), r.get("calendar"))
                timed[k] = timed.get(k, 0) + 1
    except Exception:
        timed = None
    try:
        with open(os.path.join(HERE, ".work/state/calendars.txt"), "w", encoding="utf-8") as f:
            for s, t, c in cals:
                n = "?" if timed is None else timed.get((s, t, c), 0)
                f.write("[%s] (%s) :: %s  —  %s timed events in %s .. %s\n" % (s, t, c, n, g_min[:10], g_max[:10]))
    except OSError:
        pass
    return cals


def main():
    now = datetime.now(timezone.utc)
    g_min, g_max = window_bounds(now)
    ek_cals = snapshot_calendars(g_min, g_max)
    # SoftServe is pinned by account title in the reader and the writer, and a title two accounts
    # share fails both (README, gotcha 8), so a second Exchange account can't pass for SoftServe.
    source, placeholders, complete, err = read_ss()
    if not complete:
        sc.log_run({"path": RUNLOG, "ok": False, "error": err or "incomplete read"})
        print("ERROR: %s" % err)
        return 1
    import gcal

    counts = {"added": 0, "modified": 0, "deleted": 0, "rev_added": 0, "rev_modified": 0, "rev_deleted": 0,
              "gc_added": 0, "gc_modified": 0, "gc_deleted": 0}
    errors = []
    try:
        fwd, ferr = forward_pass(now, source, g_min, g_max, gcal)
        counts.update(fwd); errors += ferr
    except Exception as e:
        errors.append("forward pass: %s" % e)
    if REVERSE:
        try:
            rev, rerr = reverse_pass(placeholders, g_min, g_max, gcal, ek_cals)
            counts.update(rev); errors += rerr
        except Exception as e:
            errors.append("reverse pass: %s" % e)
    if GC_SOURCE:
        try:
            gcc, gerr = gc_pass(g_min, g_max, gcal, ek_cals)
            counts.update(gcc); errors += gerr
        except Exception as e:
            errors.append("gc pass: %s" % e)

    sc.log_run({"path": RUNLOG, "ok": not errors,
                "added": counts["added"], "modified": counts["modified"], "deleted": counts["deleted"],
                "rev_added": counts["rev_added"], "rev_modified": counts["rev_modified"],
                "rev_deleted": counts["rev_deleted"], "gc_added": counts["gc_added"],
                "gc_modified": counts["gc_modified"], "gc_deleted": counts["gc_deleted"],
                "error": ("; ".join(errors)[:400] or None)})
    gc_line = ""
    if GC_SOURCE:
        gc_line = "   ->GC: " + ("plan only" if GC_DRY else "+%d ~%d -%d" % (
            counts["gc_added"], counts["gc_modified"], counts["gc_deleted"]))
    print("%s  SS->G: +%d ~%d -%d   G->SS: +%d ~%d -%d%s%s" % (
        "DRY-RUN" if DRY else "applied", counts["added"], counts["modified"], counts["deleted"],
        counts["rev_added"], counts["rev_modified"], counts["rev_deleted"], gc_line,
        ("  (%d errors)" % len(errors)) if errors else ""))
    return 0


if __name__ == "__main__":
    sys.exit(main())
