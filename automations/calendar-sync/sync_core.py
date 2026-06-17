#!/usr/bin/env python3
"""
sync_core.py — deterministic brain for the calendar-sync automation.

One-way mirror: SoftServe (read from Outlook-on-the-web by the skill) -> Google
Calendar. This module owns everything that must be EXACT and testable; the skill
owns the I/O it can't (OWA DOM read via the Chrome MCP, Google writes via the
connector). No network, stdlib only, single file.

Run isolated to avoid the macOS TCC import-scan of ~/Documents:
    python3 -I automations/calendar-sync/sync_core.py <subcommand>   # see main()

Subcommands (all JSON on stdin -> JSON on stdout unless noted):
  reconcile       source events + known copies -> {creates,updates,deletes,skips}
  schedule        -> {in_window, is_open_hour, next_delay_seconds, ...}
  log-run         append one run record to the run-log (jsonl)
  daily-summary   aggregate UNREPORTED runs -> one Telegram message; mark reported
  commit          apply executed creates/updates/deletes to the ledger

Design notes:
  * OWA renders this SS mailbox in a non-Kyiv timezone (observed: US/Pacific).
    We self-calibrate: the skill passes OWA's displayed "current time" wall clock
    (`owa_now_wall`) alongside true `now_utc`; we derive the offset and convert
    every event to Europe/Kyiv. An explicit `owa_tz` (IANA) overrides and is
    DST-correct per-event. Getting this wrong = every event hours off.
  * We only ever touch Google events we created: each carries an `SS: ` prefix
    AND a hidden `[[ss-sync:<key>]]` marker. The ledger is the primary index;
    the marker lets us re-link if the ledger is lost.
"""

import sys
import json
import re
import hashlib
from datetime import datetime, timedelta, timezone, date
from zoneinfo import ZoneInfo

DEFAULT_CONFIG = {
    "days_ahead": 14,                       # this week + next week (2 full weeks)
    "prefix": "SS: ",
    "attendee": "orlov.alexej@gmail.com",   # sole attendee — never SS colleagues
    "softserve_email": "olekorlov@softserveinc.com",
    "tz": "Europe/Kyiv",
    "marker": "ss-sync",
    "match_overlap_minutes": 90,            # native-dup time tolerance
}

# Titles that mean "this meeting is off" — RU / UK / EN. Case-insensitive.
_CANCEL_RE = re.compile(
    r"^\s*(отмен[её]н[оаы]?|скасовано|відмінено|cancell?ed|canceled)\s*[:\-–]\s*",
    re.IGNORECASE | re.UNICODE,
)
_PREFIX_RE = re.compile(r"^\s*SS:\s*", re.IGNORECASE)
_WS_RE = re.compile(r"\s+")


# --------------------------------------------------------------------------- #
# small helpers
# --------------------------------------------------------------------------- #
def _utc(dt_iso):
    """Parse an ISO timestamp to an aware UTC datetime. Accepts trailing 'Z'."""
    s = dt_iso.strip().replace("Z", "+00:00")
    dt = datetime.fromisoformat(s)
    if dt.tzinfo is None:
        dt = dt.replace(tzinfo=timezone.utc)
    return dt.astimezone(timezone.utc)


def _naive(dt_iso):
    """Parse a naive wall-clock ISO string (no tz) -> naive datetime."""
    s = dt_iso.strip().replace("Z", "")
    # drop any offset if present; we want the wall clock only
    s = re.sub(r"[+\-]\d{2}:?\d{2}$", "", s)
    return datetime.fromisoformat(s)


def is_cancelled(title):
    return bool(_CANCEL_RE.match(title or ""))


def normalize_title(title):
    """Strip an SS:/cancel prefix, collapse whitespace, casefold — for keys/match."""
    t = title or ""
    t = _CANCEL_RE.sub("", t)
    t = _PREFIX_RE.sub("", t)
    t = _WS_RE.sub(" ", t).strip()
    return t.casefold()


def display_title(title):
    """The title we actually copy (cancel/SS prefixes removed, whitespace tidy)."""
    t = _PREFIX_RE.sub("", title or "")
    return _WS_RE.sub(" ", t).strip()


def _sha(*parts):
    h = hashlib.sha1("".join("" if p is None else str(p) for p in parts).encode("utf-8"))
    return h.hexdigest()


def content_hash(norm_title, start_kiev_iso, end_kiev_iso, location, join_url):
    return _sha(norm_title, start_kiev_iso, end_kiev_iso, location or "", join_url or "")[:16]


def source_key(ev, start_kiev):
    """Stable key. Prefer OWA's own id; else title + Kyiv calendar-date.

    Title+date means a same-day reschedule is an UPDATE (key stable) while a
    cross-day move degrades to delete+create — both leave Google correct, and
    recurring daily instances stay distinct (one per date).
    """
    if ev.get("owa_id"):
        return "id:" + str(ev["owa_id"])
    return "td:" + _sha(normalize_title(ev.get("title", "")), start_kiev.date().isoformat())[:16]


# --------------------------------------------------------------------------- #
# timezone self-calibration
# --------------------------------------------------------------------------- #
def owa_offset_minutes(owa_now_wall, now_utc):
    """OWA wall clock minus true UTC, rounded to the nearest 15 minutes.

    owa_now_wall: naive datetime shown by OWA ("current time" label).
    now_utc:      aware UTC datetime (true now).
    Returns int minutes (negative when OWA is behind UTC, e.g. -420 = PDT).
    """
    delta_min = (owa_now_wall - now_utc.replace(tzinfo=None)).total_seconds() / 60.0
    return int(round(delta_min / 15.0)) * 15


def to_kiev(start_wall, owa_tz, offset_min, tz):
    """Interpret an OWA-displayed wall time and return it in the target tz (aware)."""
    if owa_tz:
        aware = start_wall.replace(tzinfo=ZoneInfo(owa_tz))
    else:
        aware = (start_wall - timedelta(minutes=offset_min)).replace(tzinfo=timezone.utc)
    return aware.astimezone(ZoneInfo(tz))


def week_window(now_utc, days_ahead, tz):
    """[Monday 00:00 of this week, +days_ahead) in the target tz — 'this+next week'."""
    znow = now_utc.astimezone(ZoneInfo(tz))
    start = znow.replace(hour=0, minute=0, second=0, microsecond=0) - timedelta(days=znow.weekday())
    return start, start + timedelta(days=days_ahead)


# --------------------------------------------------------------------------- #
# Google payload
# --------------------------------------------------------------------------- #
def build_payload(ev, start_kiev, end_kiev, key, chash, cfg):
    """Connector create_event/update_event params for one converted event."""
    marker = "[[%s:%s]] [[ss-hash:%s]]" % (cfg["marker"], key, chash)
    note = "Mirrored from SoftServe (Outlook). Do not edit — managed by calendar-sync.\n\n" + marker
    join = ev.get("join_url")
    location = join or ev.get("location") or ""
    payload = {
        "summary": cfg["prefix"] + display_title(ev.get("title", "")),
        "attendees": [{"email": cfg["attendee"]}],
        "location": location,
        "description": (("Join: %s\n\n" % join) if join else "") + note,
        "visibility": "private",
        "notificationLevel": "NONE",
        "timeZone": cfg["tz"],
    }
    if ev.get("all_day"):
        payload["allDay"] = True
        payload["startTime"] = start_kiev.date().isoformat()
        payload["endTime"] = end_kiev.date().isoformat()
    else:
        payload["startTime"] = start_kiev.isoformat()
        payload["endTime"] = end_kiev.isoformat()
    return payload


# --------------------------------------------------------------------------- #
# reconcile
# --------------------------------------------------------------------------- #
def _convert(ev, owa_tz, offset_min, cfg):
    start = to_kiev(_naive(ev["start_wall"]), owa_tz, offset_min, cfg["tz"])
    end = to_kiev(_naive(ev["end_wall"]), owa_tz, offset_min, cfg["tz"])
    return start, end


def _native_duplicate(ev, start_kiev, end_kiev, natives, cfg):
    """A pre-existing Google event that already represents this SS meeting."""
    nt = normalize_title(ev.get("title", ""))
    tol = timedelta(minutes=cfg["match_overlap_minutes"])
    ss = cfg["softserve_email"].casefold()
    for n in natives:
        if normalize_title(n.get("title", "")) != nt:
            continue
        try:
            nstart = _utc(n["start_kiev"])
        except Exception:
            continue
        if abs((nstart - start_kiev.astimezone(timezone.utc)).total_seconds()) > tol.total_seconds():
            continue
        people = [p.casefold() for p in (n.get("attendees") or [])]
        if n.get("organizer"):
            people.append(str(n["organizer"]).casefold())
        if any(ss in p for p in people):
            return True
    return False


def reconcile(inp):
    cfg = dict(DEFAULT_CONFIG)
    cfg.update(inp.get("config") or {})
    now_utc = _utc(inp["now_utc"])
    owa_tz = inp.get("owa_tz")
    offset_min = owa_offset_minutes(_naive(inp["owa_now_wall"]), now_utc) if inp.get("owa_now_wall") else 0
    win_start, win_end = week_window(now_utc, cfg["days_ahead"], cfg["tz"])

    # Existing copies we own: union of the ledger and any marker-tagged Google events.
    existing = {}  # source_key -> {google_event_id, content_hash, start_kiev}
    for k, v in (inp.get("ledger") or {}).items():
        existing[k] = dict(v)
    for c in inp.get("google_copies") or []:
        k = c.get("source_key")
        if k:
            existing.setdefault(k, {}).update(
                {"google_event_id": c.get("google_event_id"),
                 "content_hash": c.get("content_hash", existing.get(k, {}).get("content_hash")),
                 "start_kiev": c.get("start_kiev", existing.get(k, {}).get("start_kiev"))}
            )

    natives = inp.get("google_native") or []
    creates, updates, skips = [], [], []
    seen = set()

    for ev in inp.get("source_events") or []:
        start_kiev, end_kiev = _convert(ev, owa_tz, offset_min, cfg)
        key = source_key(ev, start_kiev)
        seen.add(key)

        if is_cancelled(ev.get("title", "")):
            # handled in the deletion pass via `seen` exclusion; nothing to create
            seen.discard(key)
            continue

        chash = content_hash(normalize_title(ev.get("title", "")),
                             start_kiev.isoformat(), end_kiev.isoformat(),
                             ev.get("location"), ev.get("join_url"))
        payload = build_payload(ev, start_kiev, end_kiev, key, chash, cfg)
        rec = {"source_key": key, "content_hash": chash,
               "start_kiev": start_kiev.isoformat(), "title": payload["summary"]}

        if key in existing:
            cur = existing[key]
            if cur.get("content_hash") == chash and cur.get("google_event_id"):
                skips.append({"source_key": key, "reason": "up-to-date"})
            else:
                updates.append({**rec, "google_event_id": cur.get("google_event_id"), "payload": payload})
        elif _native_duplicate(ev, start_kiev, end_kiev, natives, cfg):
            skips.append({"source_key": key, "reason": "native-duplicate"})
        else:
            creates.append({**rec, "payload": payload})

    # Deletions: copies we own whose source vanished (cancelled / removed / moved
    # out of window). Guard: never prune on an incomplete OWA read.
    deletes = []
    if inp.get("source_complete", True):
        for key, cur in existing.items():
            if key in seen:
                continue
            sk = cur.get("start_kiev")
            try:
                future = sk is None or _utc(sk) >= win_start.astimezone(timezone.utc)
            except Exception:
                future = True
            if future and cur.get("google_event_id"):
                deletes.append({"source_key": key, "google_event_id": cur["google_event_id"],
                               "reason": "gone-or-cancelled"})

    return {
        "owa_offset_minutes": offset_min,
        "window": {"start_kiev": win_start.isoformat(), "end_kiev": win_end.isoformat()},
        "creates": creates, "updates": updates, "deletes": deletes, "skips": skips,
        "counts": {"create": len(creates), "update": len(updates),
                   "delete": len(deletes), "skip": len(skips)},
    }


# --------------------------------------------------------------------------- #
# schedule gate  (hourly, Mon–Fri, 08:00–20:00 EET)
# --------------------------------------------------------------------------- #
def schedule(inp):
    cfg = dict(DEFAULT_CONFIG)
    cfg.update((inp or {}).get("config") or {})
    now = _utc(inp["now_utc"]) if inp.get("now_utc") else datetime.now(timezone.utc)
    z = now.astimezone(ZoneInfo(cfg["tz"]))
    in_window = z.weekday() <= 4 and 8 <= z.hour <= 20
    secs = 3600 - (z.minute * 60 + z.second)
    if secs <= 0:
        secs += 3600
    return {
        "tz_now": z.isoformat(),
        "weekday": z.weekday(),
        "hour": z.hour,
        "in_window": in_window,
        "is_open_hour": z.hour == 8 and z.weekday() <= 4,
        "next_delay_seconds": max(60, min(3600, secs)),
    }


# --------------------------------------------------------------------------- #
# run-log + daily summary
# --------------------------------------------------------------------------- #
def _read_jsonl(path):
    rows = []
    try:
        with open(path, "r", encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if line:
                    rows.append(json.loads(line))
    except FileNotFoundError:
        pass
    return rows


def log_run(inp):
    path = inp["path"]
    rec = {
        "ts": inp.get("ts") or datetime.now(timezone.utc).isoformat(),
        "ok": bool(inp.get("ok", False)),
        "added": int(inp.get("added", 0)),
        "modified": int(inp.get("modified", 0)),
        "deleted": int(inp.get("deleted", 0)),
        "error": inp.get("error"),
        "reported": False,
    }
    with open(path, "a", encoding="utf-8") as f:
        f.write(json.dumps(rec, ensure_ascii=False) + "\n")
    return {"ok": True, "logged": rec["ts"]}


def daily_summary(inp):
    path = inp["path"]
    rows = _read_jsonl(path)
    pending = [r for r in rows if not r.get("reported")]
    attempts = len(pending)
    ok = sum(1 for r in pending if r.get("ok"))
    events = sum(int(r.get("added", 0)) + int(r.get("modified", 0)) for r in pending)
    deleted = sum(int(r.get("deleted", 0)) for r in pending)
    msg = "SoftServe calendar sync: %d attempts, %d successful. %d events added/modified." % (
        attempts, ok, events)
    if deleted:
        msg += " %d removed." % deleted
    errs = [r for r in pending if r.get("error")]
    if errs:
        msg += "\n\nErrors:"
        for r in errs[:5]:
            msg += "\n- %s: %s" % (r.get("ts", "?")[:16], str(r["error"])[:200])
        if len(errs) > 5:
            msg += "\n- (+%d more)" % (len(errs) - 5)

    if not inp.get("dry_run"):
        for r in rows:
            if not r.get("reported"):
                r["reported"] = True
        with open(path, "w", encoding="utf-8") as f:
            for r in rows:
                f.write(json.dumps(r, ensure_ascii=False) + "\n")
    return {"message": msg, "attempts": attempts, "ok": ok,
            "events": events, "deleted": deleted, "had_errors": bool(errs)}


# --------------------------------------------------------------------------- #
# ledger commit
# --------------------------------------------------------------------------- #
def commit(inp):
    path = inp["path"]
    try:
        with open(path, "r", encoding="utf-8") as f:
            ledger = json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        ledger = {}
    applied = inp.get("applied") or {}
    now = datetime.now(timezone.utc).isoformat()
    for item in (applied.get("creates") or []) + (applied.get("updates") or []):
        k = item["source_key"]
        ledger[k] = {
            "google_event_id": item.get("google_event_id"),
            "content_hash": item.get("content_hash"),
            "start_kiev": item.get("start_kiev"),
            "title": item.get("title"),
            "last_synced": now,
        }
    for item in applied.get("deletes") or []:
        ledger.pop(item.get("source_key"), None)
    with open(path, "w", encoding="utf-8") as f:
        json.dump(ledger, f, ensure_ascii=False, indent=2, sort_keys=True)
    return {"ok": True, "entries": len(ledger)}


# --------------------------------------------------------------------------- #
# CLI
# --------------------------------------------------------------------------- #
_COMMANDS = {
    "reconcile": reconcile,
    "schedule": schedule,
    "log-run": log_run,
    "daily-summary": daily_summary,
    "commit": commit,
}


def main(argv):
    if len(argv) < 2 or argv[1] not in _COMMANDS:
        sys.stderr.write("usage: sync_core.py {%s} < input.json\n" % "|".join(_COMMANDS))
        return 2
    raw = sys.stdin.read().strip()
    inp = json.loads(raw) if raw else {}
    out = _COMMANDS[argv[1]](inp)
    sys.stdout.write(json.dumps(out, ensure_ascii=False, indent=2))
    sys.stdout.write("\n")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
