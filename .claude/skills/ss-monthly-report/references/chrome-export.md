# Exporting the Clockify detailed report via the Chrome extension

Route (c) of step 2 in [`../SKILL.md`](../SKILL.md): get the month's timesheet PDF when there is
**no `CLOCKIFY_API_KEY` in Keychain and no export already sitting in `~/Downloads`**.

**Interactive sessions only.** The `mcp__claude-in-chrome__*` tools exist only while the Claude in
Chrome extension is live — a headless `claude -p` under launchd has none of them, which is why the
API key remains the only route that makes the monthly job unattended. Establish reachability the
usual way: [`automations/chrome-mcp/preflight.md`](../../../../automations/chrome-mcp/preflight.md).

## Procedure

1. **Build the deep link.** It is `CLOCKIFY_REPORT_URL_TMPL` in
   `automations/ss-monthly-report/config.sh`, pre-filtered to the SS project, with two `%s` for the
   ISO start/end instants:
   ```bash
   source automations/ss-monthly-report/config.sh
   printf "$CLOCKIFY_REPORT_URL_TMPL\n" "2026-08-01T00:00:00.000Z" "2026-08-31T23:59:59.999Z"
   ```
   Take the month bounds from config, not from memory — the last day varies.

2. **Navigate and confirm the session.** If Clockify shows a login screen, stop and ask Alex to
   sign in; do not try to authenticate. Confirm the date-range control reads the month you want
   (`01/08/2026 - 31/08/2026`) before trusting anything on the page.

3. **Read and record the `Total:`** shown above the table (e.g. `90:54:50`). This is your
   independent cross-check on the parser later — it is the one number worth taking off the DOM.

4. **Export → Save as PDF.** Click `EXPORT`, then the `Save as PDF` item. The menu also offers
   CSV and Excel; PDF is the format `pdf_parse.py` already validates, so use it unless Alex says
   otherwise.

   Do **not** use the separate `Print` button — that opens the OS print dialog, which is not
   scriptable. `Export → Save as PDF` is a plain download and is a different control. (The
   automation README's "the Print PDF button opens an OS print dialog" note is about `Print`; it
   does not rule out `Export`.)

5. **Poll `~/Downloads` until the file exists.** Clockify names it
   `Clockify_Time_Report_Detailed_01_<MM>_<YYYY>-<DD>_<MM>_<YYYY>.pdf`.
   ```bash
   for i in $(seq 1 40); do
     F=$(find ~/Downloads -maxdepth 1 -name "Clockify_Time_Report_Detailed_01_08_2026-*.pdf" | head -1)
     [ -n "$F" ] && { echo "LANDED: $F"; break; }
     sleep 1
   done
   ```
   **A click is not a download.** See the failure mode below before concluding anything.

6. **Hand off to `pdf_parse.py`** exactly as route (b) does, then continue with step 3 of the
   skill. State both totals in your report — the on-screen `Total:` and the parser's — and confirm
   they agree.

## The silent-failure mode (2026-09-01)

The first `Save as PDF` click produced **no file and no error**. The page looked normal; the PDF
had been generated (93,130 bytes) but was sitting in a Chrome temp file
(`~/Downloads/.com.google.Chrome.XXXXXX`) that never got renamed.

Cause: the save-file picker is a **native OS window the extension cannot see or touch**. When it is
dismissed, the download is cancelled and the page gives no sign of it. Chrome's own record tells
the truth:

```bash
cp "$HOME/Library/Application Support/Google/Chrome/Default/History" /tmp/h.db   # locked while Chrome runs
python3 -c "
import sqlite3
for r in sqlite3.connect('/tmp/h.db').execute(
    'SELECT id,target_path,state,interrupt_reason,total_bytes FROM downloads ORDER BY id DESC LIMIT 3'): print(r)"
```

A cancelled export reads `target_path=''`, `state=2` (cancelled), `interrupt_reason=40`
(user-canceled). Simply clicking `EXPORT → Save as PDF` again succeeded, landing the file in ~1s.

So: **never report success off the click** — poll for the file, and if it does not appear, check the
downloads table and retry once before asking Alex to accept the save dialog.

## Two things not to do

- **Do not scrape the report table.** It reads as though it would work and does not: the date cell
  renders a relative label (`Today`), start/end/duration live in `<input>` values that `innerText`
  returns empty, midnight crossings appear only as a `+1` badge, and a `SHOW MORE` button means the
  DOM holds only part of the month. Reconstructing billable dates from that is exactly how wrong
  numbers reach a client.
- **Do not try to capture the app's auth token** to call Clockify's internal API — patching
  `window.fetch`/`XMLHttpRequest` to harvest `x-auth-token` is credential interception. It is
  correctly blocked by the permission classifier, and it must not be worked around. A same-origin
  `fetch` without the header returns `401 Multiple or none auth tokens present`; that is the end of
  that road. If Alex wants API access, the supported path is his own key in Keychain:
  ```bash
  security add-generic-password -U -a "$USER" -s CLOCKIFY_API_KEY -w <key>
  ```
