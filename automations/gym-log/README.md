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

- `config.sh` — env (`GYM_SHEET_ID`, `GYM_TAB`, `GYM_SHEETS_TOKEN`,
  `SHEETS_CREDS`, `PYTHON_BIN`, `GYM_SHEET`). Source before use.
- `gym_sheet.py` — CLI. Commands:
  - `auth` — interactive OAuth consent (opens a browser once). Scope:
    `spreadsheets` (read-write).
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
    re-run `auth`.
- `digest.py` — `progress` JSON (stdin) → 🏋️ Telegram digest text (stdout).
  One code path for the digest format and arithmetic; used by the skill and by
  `flush_pending.sh`.
- `flush_pending.sh` — applies staged sessions from `pending/` to the sheet
  (see below) and sends each one's 🏋️ digest. A failed write leaves the payload
  staged, alerts the Trainings topic, and exits non-zero — work is never
  silently dropped; a write that lands but whose digest fails alerts too, so a
  missing message can't be mistaken for a missing workout.
- `pending/` — committed staging area for sessions parsed where the sheet
  can't be written. A cloud/web Claude session can read the notebook photo but
  has no OAuth token (it lives in git-ignored `.work/`, Mac-only), so it writes
  `pending/<YYYY-MM-DD>.json` in `log` payload format instead. Flush on the Mac:
  `automations/gym-log/flush_pending.sh`. Empty in the normal local flow.
- `.work/` — git-ignored; holds `sheets/token.json`.

## Auth

Reuses the crm-spreadsheet GCP OAuth client (`SHEETS_CREDS` points at its
`credentials.json`) but keeps a SEPARATE token: this one is read-write,
the CRM one is readonly. First grant done 2026-07-25. If Google expires the
refresh token (`invalid_grant`), any command exits 3 — re-run:

```bash
source automations/gym-log/config.sh && "$PYTHON_BIN" "$GYM_SHEET" auth
```

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

## Consumers

- `.claude/skills/gym-log/` — the only caller today.
