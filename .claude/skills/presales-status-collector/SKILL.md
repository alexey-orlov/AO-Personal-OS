---
name: presales-status-collector
description: Prepare Alex's weekly pre-sales status for the R&D "Physical & Bio AI Accounts" tracker (sheet Outreach list) as a paste-back Markdown file that Bohdan and the team can use without access to this repo. Finds Alex's rows in the tracker, takes the evidence from his outreach artifact ("California Jumpstart Outreach") and the repo's context wiki since the last status column, asks him only about the gaps in one short round, and outputs the tracker's columns plus the new status column, each status tagged [C] confirmed from logged interactions or [P] provided by Alex. Use on /presales-status-collector, "update my pre-sales", "prepare my weekly status", "fill my accounts for the product weekly", "status for the accounts table", "presale update", "оновити статус по акаунтах", or any mention of the Physical & Bio AI Accounts table, the outreach list or the product weekly, even when the table isn't named.
disable-model-invocation: false
user-invocable: true
---

# Pre-sales status collector

Each week the R&D product team updates one shared tracker, **Physical & Bio AI Accounts.xlsx** (sheet *Outreach list*), and reviews it at the product weekly. This skill prepares Alex's update: it reads what he already logged, asks him only about what it could not confirm, and hands back a Markdown table he sends to Bohdan or pastes into the tracker.

Adapted from the R&D team's skill of the same name (received 2026-11-22). The team's version gathers evidence from Teams, Outlook and the calendar. **Alex's sources of truth are his outreach artifact and this repo** (Alex, 2026-11-22), so this version reads those and does not search Teams, Outlook or the calendar.

The skill itself never edits the tracker, never writes to the outreach artifact and never sends messages. It reads, asks, and writes one Markdown file. Its last step folds what Alex said through `context-update`, which also updates the outreach artifact under the tracker ↔ wiki contract (`.claude/references/jumpstart-outreach-tracker.md`).

## Sources

| What | Where |
|---|---|
| Tracker | The live file is in Bohdan Khomych's OneDrive. Reach it with the `ms365` MCP when it is signed in (`list-drives`, `search-onedrive-files`); otherwise take the newest local copy, `~/Downloads/Physical & Bio AI Accounts*.xlsx` or the CSV export in OneDrive `Projects/Jumpstart for scientists/Outreach/`. Say which copy you used and its date. |
| Outreach log | The artifact "California Jumpstart Outreach", `https://claude.ai/artifact/5spjsfxGjGhj9ynmkh67qe`. Read its database with `ArtifactData`: collection `tracking`, one document per account slug with `status`, `notes` (the next step), `contacts`, `account_summary` (SoftServe's own context on the account), `updated_at`; collection `accounts` holds the research, for background only. Statuses: not-started · reached-out (to the AM) · talking (with the AM) · yes (AM yes → presales chat) · no (AM no → reason logged) · parked. |
| Repo | `context/areas/softserve/jumpstart-science.md` (its Active threads hold the outreach rows and their history), account pages such as `generac.md` and `blackberry.md`, call notes under `context/areas/softserve/calls/` dated inside the window, and `git log --since=<window start> --date=short --format='%ad %s' -- context/areas/softserve` for what was folded when. |

## Workflow

### 1. Find the tracker and Alex's rows

- Read the sheet with the bundled reader (openpyxl is not installed): copy the .xlsx into a new, empty scratchpad folder and run `python3 -I .claude/skills/presales-status-collector/scripts/read_xlsx.py "<copy>" "Outreach list"`.
- Columns: `Account | Relevant service | Owner | CSL/Delivery | Status DD.MM | Status DD.MM | …`. Ignore empty trailing columns and stray headers (the 16.11 sheet has a lone `1`).
- Keep the rows whose **Owner** contains `Orlov`. Match loosely: cells carry leading spaces, typos and notes.
- **Last status column** = the right-most `Status DD.MM` header. **Evidence window** starts on that date.
- **New status column** = last status date + 7 days; if that date has passed, the next Monday from today. Name it `Status DD.MM`.
- Show Alex the accounts found in one line and carry on; stop only when no row matched.
- An account Alex works that the sheet does not give him (an empty Owner, e.g. BlackBerry (QNX)) stays out of the file. Ask once in the interview whether to add it.

### 2. Gather evidence per account

- **Outreach log:** match each row to its `tracking` document by the slug in the registry, `context/_meta/outreach-tracker.md` ("Ride Also" is `also`, "NextEra Energy, Inc" is `nextera-energy`); an account missing there is new to the outreach. An entry updated inside the window is new evidence; an older one is context the last status already holds.
- **Repo:** search the account name, its short forms (strip region suffixes and legal forms) and the AE and DO names from the *CSL/Delivery* cell in `context/areas/softserve/`. Open the call notes and page sections that carry substance; a summary line in `index.md` is not enough.
- **What counts:** client-facing and decision signals: meetings held or scheduled, replies, materials sent, scope or ROM changes, owner changes, cancellations, go / no-go decisions. Research, internal drafting and undated plans do not.
- **Check the previous status.** If the last cell said "call on Friday", look for that call. If no record shows it happened, ask; never assume it did.
- **Don't attribute ambiguous items.** A note that could belong to more than one account (the same AM on several rows, a contact who belongs to another account) stays out of every row and becomes a question.
- Dates as `DD.MM`, in Alex's time zone (Pacific since 2026-11-19). Resolve relative dates ("Monday", "Friday") against the day the note was written, and ask when unsure.

### 3. Interview Alex

Send one chat message in the language Alex is using; don't use the question widget, the answers are open. For each account show:
- **Confirmed**: 2–4 short facts, each with its date and source (outreach log, call note, wiki page).
- **Draft status**: the one-line status you would write from confirmed facts alone.

Then ask the gap questions as one numbered list, at most two per account, only where something is missing or unclear: the outcome of the step named in the previous status; the next step and date when none is logged; owner changes; contradictions between the tracker and the log; the ambiguous items from step 2. An account with no evidence at all gets one question: "any activity, or leave it empty?"

Say that he can answer by voice, in any order, and that "nothing to add" is a valid answer. Then end the turn and wait.

If he answers "nothing to add" or skips an account, use the confirmed draft as is and move on; don't ask again.

### 4. Write the output

Merge the answers into the drafts and write one Markdown file to the SoftServe OneDrive, next to the outreach list:

`~/Library/CloudStorage/OneDrive-SoftServe,Inc/Projects/Jumpstart for scientists/Outreach/Status updates/presales_update_alex_orlov_<YYYY-MM-DD of new column>.md`

The file goes to people who cannot open this repo or the artifact, so it stands alone: no repo paths, no artifact or GitHub links, no wiki vocabulary, no "(inferred)" markers. Keep exactly the tracker's columns and Alex's rows in the tracker's order. Copy existing cells verbatim, typos included: this is a paste-back file, not an edit. Fill only the new status column. Nothing else in the file: no evidence section, no open points, no commentary.

```markdown
# Pre-sales update — <Full Name> — Status <DD.MM>

`[C]` confirmed from logged calls and outreach notes · `[P]` provided by the person · `—` no update

| Account | Relevant service | Owner | CSL/Delivery | Status 09.11 | Status 16.11 | Status 23.11 |
|---|---|---|---|---|---|---|
| Bicycle Therapeutics | Scientific / Biological AI Jumpstart | Bohdan Khomych | Tom Landers (AE) · DO: Natalia Paniv | 13.11.2026 being assigned | Onsite visit to the customer on Nov 17 | Onsite with VP Science 17.11; interest in PK/PD, lab automation, imaging; tailored deck shared 20.11 `[C]`. Follow-up call targeted for w/c 30.11 `[P]` |
| AstraZeneca EMEA | Scientific / Biological AI Jumpstart | Bohdan Khomych | Tom Landers (AE) · DO: Natalia Paniv |  |  | — |
```

Status cell style:
- One or two sentences, about 40 words at most: past facts first, then the next step with a date.
- Tag each sentence or clause `[C]` or `[P]`. If Alex corrected a confirmed fact, his version wins and is tagged `[P]`.
- Escape any `|` inside a cell as `\|`.
- `—` when there is neither evidence nor input.

Send the file to Alex with `SendUserFile` and end with one line: how many accounts were updated and how many came from his input.

### 5. Fold the new facts

What Alex said in the interview is new context: after the file is delivered, fold it into the wiki with the `context-update` skill (pasted mode), which also pushes each account's status, next step and summary to the outreach artifact under the contract. Never write it into the team's xlsx tracker.

## Example run (condensed)

Alex: "Prepare my pre-sales update for Monday."
1. The connector is not signed in, so the newest local copy of the tracker is used (dated in the reply); 7 rows owned by Alex; last column `Status 16.11` → new column `Status 23.11`, window from 16.11.
2. One account's log entry from inside the window says the AM agreed and a client call is scheduled → draft `[C]`.
3. Another account's log names a meeting with a person who is a different account's client partner → kept out of both rows, asked as a question.
4. Alex replies "nothing to add" for the rest → file written with `[C]` statuses only, then his answers are folded into the wiki.
