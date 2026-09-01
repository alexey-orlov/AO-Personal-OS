---
name: ss-monthly-report
description: Build the monthly SoftServe "Contingent Worker Subcontractor" hours report from Clockify — pull the month's SS time entries (Clockify API, an already-exported detailed-report PDF, or by exporting one via the Chrome extension in an interactive session), rebuild the Details tab grouped by the "[Prefix]" in each entry description, subtotal each group at the contract rate, preserve the business-trip line, and write each group's amount into its project row on the summary tab. Use on /ss-monthly-report, "build my SoftServe monthly report", "do the Clockify report for last month", "prepare the contingent worker report", "update the hours in the Jul'26 report", or when Alex drops a Clockify detailed-report PDF and asks to turn it into the client Excel. Also the engine behind the monthly launchd job (automations/ss-monthly-report/run.sh, 08:00 on the 1st).
disable-model-invocation: false
user-invocable: true
---

# SoftServe monthly contingent-worker report

Turns a month of Clockify time into the client workbook Alex sends to SoftServe:
`~/Desktop/Monthly reports/Contingent Worker Subcontractor_Oleksii Orlov_<Mon>'<yy>.xlsx`.

**This is a billing document.** Every number goes to a client. The helper scripts refuse
to guess and abort loudly instead — never work around an abort, fix the input or ask Alex.

## The workbook

Three tabs, and you only ever write two of them:

| Tab | Role |
|---|---|
| `Oleksii Orlov` (1st) | Summary. One row per SoftServe project: Period, Subcontractor ID/Name, **Project ID (PR-…)**, Project Name, **Amount gross**, Currency. You fill `Amount gross`. |
| `Details` (2nd) | The timesheet. Columns A–F: Description, Start Date, Start Time, End Time, Duration (h), Amount USD. You rebuild this entirely. |
| `BT details` (3rd) | Business-trip expense maths. **Never touch it.** |

`Details` layout the scripts produce, one block per project, in summary-tab row order:

```
<grey band>  <Project Name>  (PR-…)
   …entries, newest first…
Subtotal - hours          =SUM(...)      =RATE*ROUND(<hours>*24,2)     ← only when this group has a trip
Business trip   X X X X                  <amount, verbatim>            ← only in the group that owns it
Subtotal - PR-…           =<hours>       =<hours money>+<trip>
(blank)
<next block…>
(blank)
GRAND TOTAL               =sum of hours  =sum of group subtotals
```

A group without a business trip gets a single `Subtotal - PR-…` row and no `Subtotal - hours`.

## Grouping

Entries are grouped by a leading `[Prefix]` in the Clockify description. `[Payworks] Jumpstart PM …`
→ the Payworks group; everything un-prefixed → the other project. The prefix is matched against
each summary row's **Project Name**, so nothing depends on a hard-coded PR code — SoftServe
reissues those every month.

**Match on the prefix only, never on what the description is "about".** In Jul'26,
`PM Jumpstart - repo prep; calls with Payworks team` (7h11m) is plainly Payworks work but
carries no prefix, so it billed to the other project. That is the rule working as intended —
but always **flag entries whose text names another group while lacking its prefix**, with the
dollar value, so Alex can decide. Do not move them yourself.

## Procedure

Run from the repo root. Scripts live in `automations/ss-monthly-report/`; use its venv
(`.work/venv/bin/python`, created by `setup.sh`).

1. **Settle the month and the paths.** Default target = the month that just ended.
   - Target: `<REPORTS_DIR>/Contingent Worker Subcontractor_Oleksii Orlov_<Mon>'<yy>.xlsx`
   - Template: the target **if it already exists**, otherwise the previous month's file.
   - Headless runs get `month`, `entries`, `template`, `target`, `template_is_target` in the prompt — use them and do not re-derive.

2. **Get the entries** (skip if the wrapper already produced an entries JSON). Three routes, in
   priority order — always take the highest one available:

   **(a) Clockify REST API** — the only route that works headless/unattended:
   ```bash
   automations/ss-monthly-report/.work/venv/bin/python \
     automations/ss-monthly-report/clockify_fetch.py --month 2026-07 --project SS -o /tmp/e.json
   ```

   **(b) An already-exported detailed-report PDF** in `~/Downloads`:
   ```bash
   … /pdf_parse.py ~/Downloads/Clockify_Time_Report_Detailed_01_07_2026-31_07_2026.pdf -o /tmp/e.json
   ```

   **(c) Export the PDF yourself via the Chrome extension** — interactive sessions only, when
   there is no API key and no PDF on disk. Follow the procedure in
   [`references/chrome-export.md`](references/chrome-export.md).
   Do **not** invent a fourth route: never scrape the report DOM (see Hard-won facts) and never
   try to lift the app's auth token — that is credential interception, it is correctly blocked,
   and it must not be worked around.

   Whichever route produced the file, `pdf_parse.py` aborts if its own row sum disagrees with the
   PDF's `Total:` header. That gate is not advisory — it caught two silently-dropped entries
   (6h48m) during the first build. When you used route (c) you also have the `Total:` read off the
   Clockify page: state both and confirm they agree (Aug'26: 90:54:50 on screen == 90:54:50
   parsed), which makes the entry count independently corroborated rather than self-reported.

3. **Read the target workbook from disk before building.** Alex edits these files in Excel
   after delivery (he rewrote a `BT details` formula 7 minutes after the Jul'26 hand-off).
   The file on disk is the truth; never rebuild from memory of an earlier run.
   Also check for a `~$…xlsx` lock file next to it — if present, Excel has it open, so **tell
   Alex to close it without saving** before or right after you write, or his stale window will
   clobber the result on save.

4. **Build.**
   ```bash
   … /report_build.py --entries /tmp/e.json --template "<template>" --out "<target>" \
        --month 2026-07 --rate 120 --bt keep --bt-group ''
   ```
   `--bt` is mandatory whenever the template carries a Business trip row. Decide it by the rule
   in "Judgment calls" below — never by guessing. `--bt-group` names the prefix that owns the
   trip (`''` = the un-prefixed group).

5. **Verify — always, before telling anyone it is done.**
   ```bash
   … /report_verify.py --xlsx "<target>" --entries /tmp/e.json --rate 120
   ```
   It recalculates through LibreOffice and re-checks hours against the source entries, each
   group's money against rate × hours, the grand total against the subtotals, and the summary
   tab against `Details`. Non-zero exit ⇒ the workbook does not go out.

6. **Report** — subtotals per project, grand total, and every flag from below. Headless runs
   must write this to `.work/summary.txt`; the wrapper sends it to Telegram.

## Judgment calls

- **Business trip.** Alex supplies it; it is never invented or carried forward.
  - Template *is* the target (Alex already prepared this month's file) → `--bt keep`.
  - Template is *last month's* file → `--bt drop`, and flag: "if there was a trip in <month>,
    add it to the workbook and re-run."
  - The trip belongs to the project whose work occasioned it — for the recurring
    `GenAI Lab: R&D Team Onsite Presence` row that is the un-prefixed group (`--bt-group ''`).
    Say which group you put it in, every time.
- **Project rows.** SoftServe issues the `PR-…` codes; they are **not** derivable from Clockify.
  If the target was cloned from last month, its PR codes are last month's — flag that they must
  be confirmed. If a prefix has no matching row, `report_build.py` aborts: report the abort, do
  not invent a row.
- **Rate.** $120/h per contract. Hours are rounded to 2 dp, then multiplied. If Alex says the
  rate changed, pass `--rate`; never silently reuse a stale one.
- **Anomalies to surface, not fix:** entries naming another group without its prefix; a
  description that looks personal or non-billable; a day with implausible total hours; a
  midnight-crossing entry (legitimate — `09/07 22:00→00:00` — but worth a line).
- **Overlapping timers.** `report_verify.py` prints a `WARN` for any two entries on the same
  day whose intervals intersect: those minutes are billed twice, and when the two sit in
  different groups they land on two different client projects. Jul'26 had exactly one
  (27/07, 1h15m ≈ $150). Always repeat these warnings verbatim in the summary with the dollar
  figure — they are a warning, not a failure, because only Alex knows if the double-booking
  was real work.

## Hard-won facts

- **Dates are written as `dd/mm/yyyy` TEXT.** Real dates get parsed US-style by Excel, which
  silently mangles every day ≤ 12 — the Jun'26 sheet has seven cells reading as December,
  November, October… Do not "improve" this to real date cells.
- **The entry-row style must be snapshotted from a real entry row, never from row 2.** In any
  workbook this script has already built, row 2 is the grey group band — so `snapshot(ws, 2)`
  handed every entry the band's bold font, grey fill and `General` format, and the times rendered
  as raw serial fractions (`0.08333333` instead of `02:00:00`). It stayed hidden for a generation:
  Jun'26 was hand-made with no band rows, so Jul'26 built from it was fine, and only Aug'26 —
  the first workbook built from a script-built template — showed it. `find_entry_row()` now locates
  the row by its data (dd/mm/yyyy text in B, a time in C) and aborts if there is none, and the
  builder re-asserts `h:mm:ss` on C/D/E after stamping. `report_verify.py` check 6 fails the run if
  any entry time cell lacks a time format. **When a bug is generational like this, rebuild from the
  last GOOD workbook, not from the corrupted one** — rebuilding Aug from Aug would have re-inherited
  the broken style.
- **openpyxl round-trips drop parts.** `customXml/*` (SharePoint content-type metadata) and
  `printerSettings` vanish; `report_build.py` re-injects them. `calcChain`/`sharedStrings` are
  deliberately not restored — Excel rebuilds the first, and openpyxl writes inline strings.
- **Formulas carry no cached values.** Excel recalculates on open; that is why verification
  goes through LibreOffice rather than reading openpyxl's `data_only` values (which are `None`).
- **`timeout`/`gtimeout` are not installed on this Mac.** Guard any `soffice` call with a
  poll-loop plus `kill`, as `report_verify.py` does.
- The Clockify project is `SS`; the split into two billing projects happens purely through
  description prefixes, not through Clockify projects.
- **Never rebuild the timesheet by scraping the report DOM.** It looks readable and is not
  (verified 2026-09-01): the date cell renders a *relative label* (`Today`), start/end/duration
  live in `<input>` values that `innerText` returns empty, midnight crossings show only as a
  `+1` badge, and a `SHOW MORE` button means what is in the DOM is not the whole month. Every one
  of those is a silent wrong-number path into a billing document. Export, then parse.
- **A Clockify export can fail silently in Chrome.** The save-file picker is a native OS window
  the extension cannot touch; if it is dismissed, the PDF never lands while the page looks
  perfectly normal. Chrome records it as `state=2` (cancelled), `interrupt_reason=40`
  (user-canceled), empty `target_path` — readable from
  `~/Library/Application Support/Google/Chrome/Default/History` (copy it first; it is locked while
  Chrome runs). So **never treat the export click as success** — poll `~/Downloads` for the file
  and only proceed once it exists. Re-clicking Export worked on the second try (2026-09-01).

## Self-check before delivering

1. Did `report_verify.py` exit 0? If not, stop — say what failed.
2. Do the summary-tab amounts sum to the `Details` GRAND TOTAL?
3. Do the hours equal the source total (PDF header / API sum) to the second — and, if I exported
   via Chrome, does that also match the `Total:` I read off the Clockify page?
4. Is the business trip present exactly once, with the amount unchanged, in the group I named?
5. Are the `PR-…` codes the ones for *this* month, or cloned and unconfirmed?
6. Did I state every flagged entry — and every `WARN` overlap — with its dollar value?
7. `BT details` untouched, and the `Details` header still the six expected columns?
