# Hours per presale for Workday

A second deliverable from the same Clockify entries: a colleague (Bohdan, 2026-11-27) asks for the month's hours per presale, "client name and a short comment", to open Workday reporting. It is a message, not the workbook; draft it through `message-writing`.

## Splitting the hours (Alex's rules, 2026-11-27)

- Source: the month's SS entries, fetched by the same routes as the monthly report (step 2 of `SKILL.md`).
- An entry that is clearly one account goes to that account whole.
- Jumpstart outreach that names no single account: split it by what that day's calls and Claude sessions show; when nothing shows, put it in one outreach line that Alex splits himself.
- Everything else goes to its bucket: Oracle, or R&D (offering building, team syncs, 1:1s).
- Only an account in an active presale gets a row: tracker status talking or yes. Research on accounts not yet engaged (not-started, reached-out, parked) goes to R&D (inferred from Alex moving NextEra and L'Oréal to R&D, 2026-11-27).
- Attribute work by the artifact it produced, not by the session it ran in. One deck session built the tailored decks for several accounts (OneDrive `Current offerings/AI Jumpstart for Hardware & Embedded R&D/Customer decks/`, one file per account, dated versions in `_previous/`), so its hours belong to each of those accounts, not only to the one the session is named after (Alex moved 6h from ALSO to Maximo, ecobee, Semtech and QNX, 2026-11-27).
- Evidence for the splits:
  - A call's time is its recording start, the call note's `_source:` stamp (Mac local time).
  - Past SoftServe meetings can't be read from a session: Google's `SS:` copies are deleted once they pass, and `ss-cal-read` returns `EVENTKIT_DENIED` outside CalendarSync.app. Its `.work/state/last-read.json` holds only upcoming meetings.
  - Claude session activity comes from the transcripts in `~/.claude/projects/<encoded repo>/*.jsonl` (timestamps, first prompt).
- Add planned hours to month end from upcoming meetings and the accounts' open next steps, and tell Alex they are estimates.
- Keep the split per entry in `automations/ss-monthly-report/.work/presale-split-<YYYY-MM>.json` for the 1st-of-month report.

## The message (Alex, 2026-11-27)

- One table: Client | Hours | Comment, rows by hours, descending.
- One number per row: hours done plus hours planned to month end.
- Comments are for the accounting team and internal stakeholders who read Workday: the kind of work in general words, one product name (AI Jumpstart), no people's names, no internal shorthand (two-pager, ADP, account-plan details).
- Clients by the name SoftServe's account uses (Ride ALSO, Generac (ecobee)).
- Non-presale hours go in a second table below, same columns, one row per bucket (R&D, Oracle partnership), each with its own one-liner of what was done that month (Alex, 2026-11-27). The unsplit outreach line goes to Alex with its hours by day, never into a table.
