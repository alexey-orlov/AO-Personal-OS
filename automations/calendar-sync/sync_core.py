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


def content_hash(norm_title, start_kiev_iso, end_kiev_iso, location, join_url,
                 description="", resp="", transparency=""):
    # description carries note + organizer + participants + the user's RSVP; resp + transparency
    # carry the Busy/Free state. Any of these changing -> the copy is updated.
    return _sha(norm_title, start_kiev_iso, end_kiev_iso, location or "", join_url or "",
                description or "", resp or "", transparency or "")[:16]


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
_CONN_PREFIXES = ("join:", "join microsoft teams", "join on your computer", "join the meeting now",
                  "meeting id:", "passcode:", "phone conference id:", "video conference id",
                  "dial-in", "dial in", "find a local number", "one tap mobile",
                  "need help?", "for organizers:", "org help", "tenant id", "alternate vtc")
_STATUS_LABEL = {"accepted": "accepted", "declined": "declined", "tentative": "tentative", "needsAction": "no response"}


def clean_notes(raw):
    """Real meeting note only — drop the Teams/Zoom join boilerplate + confidentiality footer."""
    if not raw:
        return ""
    t = raw.replace("\r", "")
    for pat in (r"(?is)_{4,}.*?Microsoft Teams.*$", r"(?is)Microsoft Teams meeting.*$",
                r"(?is)_{4,}.*?Join Zoom.*$", r"(?is)Join Zoom Meeting.*$",
                r"(?is)[^\n]*is inviting you to a scheduled Zoom meeting.*$"):
        t = re.sub(pat, "", t)
    out = []
    for ln in t.split("\n"):
        s, low = ln.strip(), ln.strip().lower()
        if re.fullmatch(r"_{4,}", s) or re.fullmatch(r"\[.*\]", s):
            continue
        if any(low.startswith(p) for p in _CONN_PREFIXES):
            continue
        if "may contain confidential" in low or "strictly prohibited" in low:
            continue
        out.append(ln)
    return re.sub(r"\n{3,}", "\n\n", "\n".join(out)).strip()


def build_description(ev):
    """Clean, human description: real note (if any) + organizer + participants with status."""
    blocks = []
    note = clean_notes(ev.get("notes"))
    if note:
        blocks.append(note)
    # The user's own RSVP, stated plainly — this is the honest "did I accept?" signal,
    # since Google forces the owner's attendee responseStatus to 'accepted' regardless.
    blocks.append("Your response: " + _STATUS_LABEL.get(ev.get("my_status") or "", "no response"))
    org, orgmail = (ev.get("organizer") or "").strip(), (ev.get("organizer_email") or "").strip()
    if org or orgmail:
        blocks.append("Organizer: " + ("%s <%s>" % (org, orgmail) if (org and orgmail) else (org or orgmail)))
    atts = ev.get("attendees") or []
    if atts:
        lines = ["Participants (%d):" % len(atts)]
        for a in atts[:25]:
            nm = (a.get("name") or a.get("email") or "").strip()
            st = _STATUS_LABEL.get(a.get("status"), "")
            lines.append("  • " + nm + ((" — " + st) if st else ""))
        if len(atts) > 25:
            lines.append("  • (+%d more)" % (len(atts) - 25))
        blocks.append("\n".join(lines))
    return "\n\n".join(blocks)


def response_status(my):
    """SS participation -> Google attendee responseStatus.

    Crucially, an absent/unknown/unanswered RSVP maps to 'needsAction', NEVER to
    'accepted' — we must not assert an acceptance the user didn't make (the bug this
    fixes). NOTE: Google forces the calendar OWNER's responseStatus to 'accepted' on
    events they own, so this field is best-effort; the user-visible Busy/Free signal is
    carried by `transparency`, and the honest RSVP is spelled out in the description."""
    return {"accepted": "accepted", "declined": "declined",
            "tentative": "tentative", "needsAction": "needsAction"}.get(my or "", "needsAction")


def is_busy(my):
    """Block time only for meetings the user positively committed to: accepted or
    tentative -> Busy. Declined / not-yet-answered / unknown -> Free (don't hold time)."""
    return (my or "") in ("accepted", "tentative")


def build_payload(ev, start_kiev, end_kiev, cfg):
    """create_event/update_event params. The sync marker lives in extendedProperties (set by run.py),
    so the description stays clean."""
    join = ev.get("join_url")
    payload = {
        "summary": cfg["prefix"] + display_title(ev.get("title", "")),
        "attendees": [{"email": cfg["attendee"], "responseStatus": response_status(ev.get("my_status"))}],
        "location": join or ev.get("location") or "",
        "description": build_description(ev),
        "visibility": "private",
        "notificationLevel": "NONE",
        "timeZone": cfg["tz"],
        # Busy only for meetings the user positively committed to (accepted/tentative);
        # declined / unanswered / unknown -> Free, so they never silently hold the user's time.
        "transparency": "opaque" if is_busy(ev.get("my_status")) else "transparent",
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

        payload = build_payload(ev, start_kiev, end_kiev, cfg)
        chash = content_hash(normalize_title(ev.get("title", "")),
                             start_kiev.isoformat(), end_kiev.isoformat(),
                             payload["location"], ev.get("join_url"),
                             payload["description"], payload["attendees"][0].get("responseStatus", ""),
                             payload.get("transparency", ""))
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
# extract — split a connector list_events payload into our copies vs natives
# --------------------------------------------------------------------------- #
def extract(inp):
    """Parse Google events (as returned by the connector's list_events) into:
      google_copies  — ours (description carries the [[marker:key]] tag)
      google_native  — everything else (candidates for native-duplicate match)
    Keeps the gid/source_key/hash binding exact so updates/deletes never go astray.
    """
    cfg = dict(DEFAULT_CONFIG)
    cfg.update((inp or {}).get("config") or {})
    key_re = re.compile(r"\[\[%s:([^\]]+)\]\]" % re.escape(cfg["marker"]))
    hash_re = re.compile(r"\[\[ss-hash:([^\]]+)\]\]")
    copies, natives = [], []
    for e in inp.get("events") or []:
        start = (e.get("start") or {}).get("dateTime") or (e.get("start") or {}).get("date")
        end = (e.get("end") or {}).get("dateTime") or (e.get("end") or {}).get("date")
        ep = ((e.get("extendedProperties") or {}).get("private") or {})
        key, chash = ep.get("ssSync"), ep.get("ssHash")
        if not key:                                    # fallback: legacy in-description marker
            m = key_re.search(e.get("description") or "")
            if m:
                key = m.group(1)
                hh = hash_re.search(e.get("description") or "")
                chash = hh.group(1) if hh else None
        if key:
            copies.append({"google_event_id": e.get("id"), "source_key": key,
                           "content_hash": chash, "start_kiev": start, "title": e.get("summary")})
        else:
            atts = [a.get("email") for a in (e.get("attendees") or []) if a.get("email")]
            natives.append({"title": e.get("summary"), "start_kiev": start, "end_kiev": end,
                            "attendees": atts, "organizer": (e.get("organizer") or {}).get("email")})
    return {"google_copies": copies, "google_native": natives}


# --------------------------------------------------------------------------- #
# CLI
# --------------------------------------------------------------------------- #
_COMMANDS = {
    "reconcile": reconcile,
    "extract": extract,
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
