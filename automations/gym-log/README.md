# gym-log automation

Shared helper for the `gym-log` skill: reads/writes Alex's training log
Google Sheet ["My training"](https://docs.google.com/spreadsheets/d/19JNFjYcnJJ-_haU_vLIf5nC5UVqDTEAR0P-LazbTUt0)
(`GYM_SHEET_ID`, tab `Sheet1`).

The skill (`.claude/skills/gym-log/`) does the smart part — reading the
handwritten notebook photo, section filtering, exercise-name matching.
`gym_sheet.py` does the dumb-but-fiddly part: keeping the sheet's structure
intact (merged date headers, per-date 4-column blocks, category groups
merged in column A, template formatting cloned onto new blocks/rows).

## Files

- `config.sh` — env (`GYM_SHEET_ID`, `GYM_TAB`, `GYM_SHEET`) on top of the
  shared Google Sheets credential it sources from
  `automations/gsheets/config.sh` (`GSHEETS_TOKEN`, `SHEETS_CREDS`,
  `PYTHON_BIN`, `GSHEETS`). Source before use.
- `gym_sheet.py` — CLI. Commands:
  - `auth` — the shared consent flow (same as `gsheets.py auth`), kept here
    for muscle memory. Scope: `spreadsheets` (read-write).
  - `dump` — JSON snapshot: dates, body weights, categories → exercises →
    per-date entries. Also the cheapest auth check.
  - `progress M/D/YYYY` — per-exercise w_end deltas (kg + %) for that
    session vs the previous occurrence and vs the ~3-month baseline
    (earliest entry in the prior 90 days; omitted when it IS the previous
    occurrence), plus body-weight delta. Feeds the 🏋️ Trainings Telegram
    digest (`TG_TOPIC=trainings`, thread in `automations/telegram/topics.env`).
  - `log` — upsert one session from stdin JSON:
    `{"date":"7/22/2026","my_weight":73.6,"entries":[{"category":"Back",
    "exercise":"Верт. тяга","sets":3,"reps":10,"w_start":52,"w_end":62},…]}`
    Creates the date block / category / exercise row if missing, overwrites
    if present (idempotent). Date = `M/D/YYYY`, no leading zeros. Exit 3 =
    credential problem (see Auth).
- `apply_pending.sh` — flushes queued payloads (`pending/*.json`) into the
  sheet, moving each applied one to `pending/applied/`. Re-running is a no-op.
- `pending/` — committed queue for sessions parsed where the credential is
  not available (a cloud session whose environment lacks
  `GSHEETS_TOKEN_JSON`, a fresh clone without `.work/`). The skill writes the
  ready `log` payload here instead of dropping the training, and says it is
  queued rather than reporting it logged.
- `.work/` — git-ignored. Nothing lives here any more: the token moved to
  `automations/gsheets/.work/token.json` (2026-09). The old
  `.work/sheets/token.json` is still honoured as a fallback until
  `automations/gsheets/setup.sh` has copied it over.

## Auth

The credential is the shared one — `automations/gsheets/README.md`: one
read-write token for every sheet in Alex's account. It reaches the script as
the `automations/gsheets/.work/token.json` file on the Mac, and as the
`GSHEETS_TOKEN_JSON` env var in Claude Code cloud sessions and in GitHub
Actions (secret of the same name). Nothing gym-specific to set up.

If Google rejects the refresh token (`invalid_grant`), any command exits 3.
Rotate per that README: re-run `auth` on the Mac, then re-copy the token
into the cloud environment and the repo secret — the new refresh token
invalidates the old one everywhere.

## Running off the Mac (Claude Code cloud sessions)

- **Credentials** — the session's environment must carry
  `GSHEETS_TOKEN_JSON` (`automations/gsheets/README.md`, "Claude Code cloud
  environment"). Exit 3 = it is unset, mis-pasted, or stale — only Alex can
  fix that; never report a session as logged on the strength of a queued
  payload.
- **Dependencies** — with the google libs absent, the script talks to the
  Sheets REST API over stdlib `urllib` (the four calls it needs). `python3`
  alone is enough. `GYM_FORCE_REST=1` forces that path on the Mac too, which
  is how it stays tested.
- **Or let CI do the write** — `.github/workflows/gym-log-apply.yml` applies
  anything committed to `pending/*.json` (any branch), then commits the flush.
  It reads the repo secret `GSHEETS_TOKEN_JSON` (same README, "GitHub
  Actions"). This is the only route that works from a session that has
  already started (env vars are fixed at session start) and from a phone. On
  failure the payload stays queued and the workflow files an issue naming
  the cause.

Caveats worth knowing:

- That JSON is a **secret**: env var / secret store only. Never commit it,
  never paste it into a chat message or an issue — a transcript is not a vault.
- Its scope (`spreadsheets`) is read-write to **every** sheet in the account,
  not just this one — by design: one credential for every sheet use case.
- Re-running `auth` mints a **new** refresh token and invalidates the old
  one — re-copy it into the cloud environment and the repo secret, or cloud
  runs and CI start failing with exit 3.
- If the GCP consent screen is still in *Testing*, Google expires refresh
  tokens after 7 days. Publishing the app (still unverified, personal use)
  is what makes them durable.

## Sheet layout contract

Row 1–2: `Category` (A1:A2) | `Excercise` (B1:B2) | per date a merged
4-col header (date, DATE-formatted) over `Sets | Reps per set |
Weight (start) | Weight (end)`. Row 3: `My weight` label + merged 4-col
value per date. Rows 4+: one exercise per row, category name in col A
merged down its group. New date blocks append to the right; new exercises
insert at the end of their category group; new categories append at the
bottom. Formats/widths are cloned from the previous block / row above, so
the template styling propagates.

Single-number weights in the notebook ("70кг") land as start = end = 70.

⚠️ Known bug in `log`: value writes are planned against row indices captured
before the batch's structural inserts run, so when one call both matches an
existing row and creates a new exercise row above it, the existing row's
values land one row off and get overwritten (2026-08-03: the 31.07
«Жим L 45°» entry was displaced by the «Жим в брусьях сидя» insert).
`log` is an upsert, so re-running the same payload — now with no new rows to
create — heals the date. Until the planner renumbers writes after inserts:
after any run whose output lists `created.exercises`, re-run `log` with the
same payload and re-check `dump`.

## Consumers

- `.claude/skills/gym-log/` — the only caller today.
