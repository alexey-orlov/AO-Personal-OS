# ss-monthly-report

Builds the monthly SoftServe **Contingent Worker Subcontractor** hours report from Clockify
and drops it in `~/Desktop/Monthly reports/`. Runs itself at **08:00 on the 1st of each month**
(launchd) for the month that just ended; also runnable by hand, and by the
[`/ss-monthly-report`](../../.claude/skills/ss-monthly-report/SKILL.md) skill in a chat.

```
Clockify ──► entries JSON ──► report_build.py ──► <Mon>'<yy>.xlsx ──► report_verify.py ──► Telegram
  API │                            ▲                                      (LibreOffice recalc)
  or  └─ PDF ─► pdf_parse.py       └── last month's workbook = template / styles
```

## Layout it produces

`Details` gets one block per SoftServe project, ordered to match the summary tab. Entries are
assigned by the `[Prefix]` leading their Clockify description (`[Payworks] …` → the Payworks
project; un-prefixed → the other). Each block subtotals at the contract rate; the block that
owns the business trip gets a `Subtotal - hours` line, the trip line, then its combined
`Subtotal - PR-…`. A `GRAND TOTAL` closes the sheet, and each block's amount is written into
its `Amount gross` cell on the summary tab as a cross-sheet formula, so the tabs cannot drift.

## Files

| File | What it does |
|---|---|
| `clockify_fetch.py` | Clockify REST → entries JSON. Stdlib only. Converts UTC to the profile timezone so evening entries don't slide a day. |
| `pdf_parse.py` | Exported "Detailed report" PDF → the same JSON. Fallback when there's no API key. |
| `report_build.py` | entries + template workbook → this month's workbook. Owns grouping, styles, and the OOXML salvage. |
| `report_verify.py` | Recalculates via LibreOffice and re-checks the arithmetic end to end. Non-zero exit = do not send. |
| `run.sh` | launchd entry point: pick month, get entries, run the skill, alert on Telegram. |
| `setup.sh` | venv + launchd install. `--uninstall` to remove. |

## Setup

```bash
automations/ss-monthly-report/setup.sh
```

Creates `.work/venv` (openpyxl), installs `com.user.ss-monthly-report`. Needs `pdftotext`
(poppler) for the PDF route and LibreOffice for verification; setup warns if either is missing.

### Making it fully unattended

Without a Clockify API key the 1st-of-month run **cannot fetch anything** — it sends a Telegram
message with a deep link to the pre-filtered report and waits for you to export a PDF. One
command removes that step for good:

```bash
security add-generic-password -U -a "$USER" -s CLOCKIFY_API_KEY -w <your-key>
```

Key from Clockify → Profile settings → API. It's the same Keychain entry
`automations/clockify-panel` uses, so setting it up serves both.

## Running by hand

```bash
automations/ss-monthly-report/run.sh            # the month that just ended
automations/ss-monthly-report/run.sh 2026-07    # a specific month
```

Idempotent: re-running a month rebuilds from the workbook currently on disk. Override
`REPORTS_DIR` to build somewhere harmless while testing.

## Why not drive the browser

Alex's first instinct was the Chrome extension, since Clockify is a web app. It doesn't survive
the schedule: per [`automations/chrome-mcp/preflight.md`](../chrome-mcp/preflight.md) the
`mcp__claude-in-chrome__*` tools only exist when the extension is live in an interactive
session, so a headless `claude -p` under launchd has no browser tools at all. On top of that the
"Print PDF" button opens an OS print dialog, which is not scriptable unattended. The REST API
returns the same rows with no browser, and the PDF parser covers the manual path — so the
browser is never the automated route, only the human one.

## Failure behaviour

Per the repo rule that a delivery leg must surface its own failures, every exit that leaves work
undone sends a Telegram message naming the cause and the fix: no workbook to build from, no
timesheet source, CLI not authenticated, skill run failed, or a clean run that wrote no file.
The full transcript is at `.work/last_run.out`, launchd output at `.work/launchd.log`.

Notifications go to the **General** topic — there's no reports topic yet. To give it one, add a
slug to `TOPIC_DEFS` in `automations/telegram/setup_group.sh`, re-run it, and set
`TG_TOPIC=<slug>` on the `alert()` calls in `run.sh`.

## Gotchas worth knowing before editing

- Dates are written as **text** `dd/mm/yyyy`. Excel reads real dates US-style and corrupts every
  day ≤ 12 (visible in the Jun'26 sheet). Don't "fix" this.
- `pdf_parse.py` strips form-feeds before matching: `pdftotext -layout` glues a `\f` to the first
  date of each page, which silently swallowed 2 of 46 entries in the first build.
- The parsed total is checked against the PDF's own `Total:` header and a mismatch is fatal.
- `report_build.py` re-injects `customXml/*` and `printerSettings`, which openpyxl drops.
- `timeout`/`gtimeout` aren't installed here; `soffice` calls are guarded with a poll-loop.
- The business trip is never carried forward silently — `--bt keep|drop` is required whenever
  the template has one.
