#!/usr/bin/env python3
"""calendar_lookup.py <iso_local_timestamp> <header_out> <context_out>

Looks up a Google Calendar event overlapping the given recording-start
timestamp, and writes two artefacts:

  <header_out>   Markdown block prepended to the call note (visible).
  <context_out>  Plain-text event metadata fed to the analyser as context.

Both files are always created. If no event matches, <header_out> contains a
short "no match" line and <context_out> is empty. Auth/lib errors are logged
to stderr and treated as no-match — the pipeline keeps moving.

Env (set by config.sh):
  CALENDAR_CREDS   OAuth client-secret JSON (Desktop app) path
  CALENDAR_TOKEN   refreshable user token JSON path (written on first run)
  CALENDAR_IDS     comma-separated calendar IDs (default: "primary")
  CALENDAR_TZ      IANA tz for the recording timestamp (default: system local)
"""
import datetime as dt
import os
import sys
from pathlib import Path


CREDS = os.environ.get("CALENDAR_CREDS", "")
TOKEN = os.environ.get("CALENDAR_TOKEN", "")
CAL_IDS = [c.strip() for c in os.environ.get("CALENDAR_IDS", "primary").split(",") if c.strip()]
TZ_NAME = os.environ.get("CALENDAR_TZ", "")


def _local_tz():
    if TZ_NAME:
        try:
            from zoneinfo import ZoneInfo

            return ZoneInfo(TZ_NAME)
        except Exception as e:
            sys.stderr.write(f"[calendar_lookup] bad CALENDAR_TZ={TZ_NAME!r}: {e}\n")
    return dt.datetime.now().astimezone().tzinfo


def _format_attendees(event) -> str:
    atts = event.get("attendees") or []
    if not atts:
        org = event.get("organizer") or {}
        if org.get("email"):
            return f"{org.get('displayName') or org['email']} <{org['email']}>"
        return "-"
    parts = []
    for a in atts:
        name = a.get("displayName") or a.get("email", "?")
        email = a.get("email", "")
        tag = ""
        if a.get("optional"):
            tag = " (optional)"
        elif a.get("resource"):
            tag = " (resource)"
        parts.append(f"{name} <{email}>{tag}" if email else f"{name}{tag}")
    return ", ".join(parts)


def _gcal_service():
    from google.auth.transport.requests import Request
    from google.oauth2.credentials import Credentials
    from google_auth_oauthlib.flow import InstalledAppFlow
    from googleapiclient.discovery import build

    scopes = ["https://www.googleapis.com/auth/calendar.readonly"]
    creds = None
    if TOKEN and Path(TOKEN).exists():
        creds = Credentials.from_authorized_user_file(TOKEN, scopes)
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            if not (CREDS and Path(CREDS).exists()):
                raise RuntimeError(
                    f"no Google OAuth client at CALENDAR_CREDS={CREDS!r}. "
                    "Drop a Desktop-app credentials.json into .work/calendar/."
                )
            flow = InstalledAppFlow.from_client_secrets_file(CREDS, scopes)
            creds = flow.run_local_server(port=0)
        if TOKEN:
            Path(TOKEN).parent.mkdir(parents=True, exist_ok=True)
            Path(TOKEN).write_text(creds.to_json())
    return build("calendar", "v3", credentials=creds, cache_discovery=False)


def _candidates(svc, target: dt.datetime):
    lo = (target - dt.timedelta(hours=2)).isoformat()
    hi = (target + dt.timedelta(hours=2)).isoformat()
    out = []
    for cal_id in CAL_IDS:
        try:
            resp = svc.events().list(
                calendarId=cal_id,
                timeMin=lo,
                timeMax=hi,
                singleEvents=True,
                orderBy="startTime",
                maxResults=50,
            ).execute()
        except Exception as e:
            sys.stderr.write(f"[calendar_lookup] list {cal_id}: {e}\n")
            continue
        for ev in resp.get("items", []):
            if ev.get("status") == "cancelled":
                continue
            sd = (ev.get("start") or {}).get("dateTime")
            ed = (ev.get("end") or {}).get("dateTime")
            if not sd or not ed:
                # all-day or malformed — too coarse to be a useful match
                continue
            try:
                sdt = dt.datetime.fromisoformat(sd.replace("Z", "+00:00"))
                edt = dt.datetime.fromisoformat(ed.replace("Z", "+00:00"))
            except Exception:
                continue
            if sdt <= target <= edt:
                out.append((sdt, edt, ev, cal_id))
    return out


def main() -> int:
    if len(sys.argv) != 4:
        sys.stderr.write("usage: calendar_lookup.py <YYYY-MM-DDTHH:MM:SS> <header_out> <context_out>\n")
        return 2

    iso, header_out, context_out = sys.argv[1], sys.argv[2], sys.argv[3]
    Path(header_out).write_text("")
    Path(context_out).write_text("")

    try:
        tz = _local_tz()
        target = dt.datetime.strptime(iso, "%Y-%m-%dT%H:%M:%S").replace(tzinfo=tz)
    except Exception as e:
        Path(header_out).write_text(f"> _Calendar match skipped: bad timestamp {iso!r} ({e})._\n")
        return 0

    try:
        svc = _gcal_service()
    except Exception as e:
        sys.stderr.write(f"[calendar_lookup] auth: {e}\n")
        Path(header_out).write_text(f"> _Calendar match skipped: {e}._\n")
        return 0

    cands = _candidates(svc, target)
    if not cands:
        Path(header_out).write_text(
            f"> _No calendar event matched recording start {target.strftime('%Y-%m-%d %H:%M:%S %Z')}._\n"
        )
        return 0

    # Prefer events with attendees (real meetings), then shorter duration (more specific).
    cands.sort(key=lambda c: (0 if (c[2].get("attendees") or []) else 1, (c[1] - c[0]).total_seconds()))
    sdt, edt, ev, _cal_id = cands[0]

    title = ev.get("summary") or "(no title)"
    location = (ev.get("location") or "").strip()
    description = (ev.get("description") or "").strip()
    link = ev.get("htmlLink") or ""
    conf = ""
    for entry in (ev.get("conferenceData") or {}).get("entryPoints") or []:
        if entry.get("uri"):
            conf = entry["uri"]
            break
    attendees = _format_attendees(ev)

    duration_min = int((edt - sdt).total_seconds() // 60)
    offset_min = int((target - sdt).total_seconds() // 60)
    when_fmt = f"{sdt.strftime('%Y-%m-%d %H:%M')}–{edt.strftime('%H:%M %Z')}"

    header = [
        f"> **Calendar event**: {title}",
        f"> **When**: {when_fmt}  ({duration_min} min; recording started +{offset_min} min in)",
        f"> **Attendees**: {attendees}",
    ]
    if location:
        header.append(f"> **Location**: {location}")
    if conf:
        header.append(f"> **Conference**: {conf}")
    if link:
        header.append(f"> **Event link**: {link}")
    if description:
        snippet = "\n".join("> " + ln for ln in description.splitlines()[:6])
        header.append("> **Description**:")
        header.append(snippet)
    Path(header_out).write_text("\n".join(header) + "\n")

    context = [
        f"Title: {title}",
        f"When: {when_fmt} ({duration_min} min total; recording started {offset_min} min in)",
        f"Attendees: {attendees}",
    ]
    if location:
        context.append(f"Location: {location}")
    if description:
        context.append("Description:")
        context.append(description)
    Path(context_out).write_text("\n".join(context) + "\n")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
