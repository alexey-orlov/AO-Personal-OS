# Trainer Notebook — the phone app for the personal-trainer skill

A claude.ai artifact Alex opens at the gym. It shows the session in the
trainer's three parts (I warm-up · II strength · III crossfit), logs every
set (weight, reps, done), takes a rating after each exercise, and rebuilds
the rest of the session when something hurts, he is tired or sick, short on
time, or a machine is busy or missing. English UI, Russian exercise names in
small type under the US names, weights in the gym's units (lb in the US gym)
with the other unit beside them.

- Source: `index.html` (this folder). Publish it with the Artifact tool,
  passing the capabilities below and the same artifact URL, so the data and
  the link survive.
- Artifact URL: see "Live artifact" at the end of this file.
- Capabilities: `db` (owner-only rules), `sample` (Claude inside the page) and
  `assets` (Alex's own exercise photos and videos):
  ```json
  {"db": {"rules": [{"path": "", "read": "owner", "write": "owner"}]}, "sample": {}, "assets": {}}
  ```
  On a republish from this session, omit `capabilities` to keep them.

The skill stays the brain. The engine (`../trainer.py`) computes every
weight; the app never invents one. Inside the page, Claude only composes and
adjusts plans from the engine's brief, by the skill's own
`references/methodology.md`, and a JavaScript copy of `trainer.py check`
(errors and warnings) lints every plan before Alex sees it. When Claude is
unavailable in the page, a deterministic template builder makes the plan
from the same brief.

## Data contract (the artifact's database)

All documents are JSON. The skill writes `config/*` and `briefs/*`; the app
writes `workouts/*`; the skill writes `workouts/<id>.sync` after processing.

| Path | Written by | Body |
|---|---|---|
| `config/catalog` | skill | `catalog.json` as is |
| `config/gym` | skill | `gym.json` as is |
| `config/skill` | skill | `{"methodology_md": "...", "feedback_md": "...", "pushed_at": "..."}` — the two reference files verbatim; the page's Claude reads them |
| `config/sync` | skill | `{"pushed_at", "for_date", "history_synced_at", "last_session"}` |
| `briefs/legs` · `briefs/push` · `briefs/pull` | skill | `{"for_date", "computed_at", "normal": <trainer.py brief --day X>, "low": <… --readiness low>}` |
| `workouts/<YYYY-MM-DD>` | app (skill may create a `planned` one) | see below |
| `media/<exercise id>` | skill (demos) and app (Alex's uploads) | `{"id", "items": [{"kind": "youtube \| video \| image \| link", "url": "https://…", "asset_id": "…", "title", "source", "license", "added_by": "skill \| me", "added_at"}]}` — append, never drop Alex's items |
| `media_requests/<exercise id>` | app ("Ask the trainer to find a demo"); skill sets `done` | `{"id", "en", "ru", "requested_at", "done": false}` |

### `workouts/<id>`

`<id>` is the date; a second session the same day gets `<date>-2`.

```jsonc
{
  "id": "2026-11-24", "date": "2026-11-24", "day": "legs",
  "status": "planned | active | done | cancelled",
  "source": "app | skill",            // who created the plan
  "built_by": "claude | template | skill",
  "created_at": "...", "started_at": "...", "finished_at": "...", "updated_at": "...",
  "checkin": {
    "readiness": "normal | low | high", "sick": false,
    "pain": ["knee"],                 // trainer.py --pain vocabulary
    "pain_detail": [{"joint": "knee", "side": "left"}],
    "pain_note": "", "time_min": 60,
    "pause_answer": "break | unlogged | null"   // asked when brief.pause.ask
  },
  "plan": { /* trainer.py plan shape (SKILL.md step 4): date, day, gym, note,
              pre, warmup[], strength[], crossfit{}, overrides{}, why[] */ },
  "changes": [{"at": "...", "kind": "pain | tired | sick | time | busy | missing | swap | skip | rebuild",
               "summary": "...", "ids": ["..."]}],
  "log": {
    "warmup":   {"<id>": {"sets_done": 2}},
    "strength": {"<id>": {"sets": [{"lb": 120, "kg": 54.4, "reps": 10, "done": true}],
                          "machine": "optional: the US machine used instead (alt_us)"}},
    "crossfit": {"time": "9:40", "rounds_done": 3, "items": {"<id>": {"reps": "50"}}}
  },
  "feedback": {                       // = stdin of `trainer.py feedback <date>`, verbatim
    "items":  {"<id>": {"rating": "easy | ok | hard | fail | pain | skipped", "note": "..."}},
    "actual": {"<id>": {"lb": [120, 130, 130], "kg": [54.4, 59, 59], "sets": 3, "reps": "10",
                        "reps_per_set": [10, 10, 10]}},
    "crossfit_time": "9:40", "crossfit_rating": "ok", "overall": "...", "done": true
  },
  "body_weight_kg": 72.3,
  "machine_missing": {"<id>": {"kind": "busy | missing", "replaced_by": "<id>", "machine": "..."}},
  "sync": {"feedback_recorded_at": "...", "sheet_logged_at": "...", "note": "..."}   // skill only
}
```

Rules the app keeps, so the engine can trust the data:

- An exercise Alex did not rate has no entry in `feedback.items`
  (feedback.md: not said ≠ `ok`). "Skip" writes `skipped`.
- `actual` holds only what was logged: done sets, in the order done; `reps`
  is one number when every set matched, else the per-set series
  (`"10-9-8"`), and `reps_per_set` always carries the array (a two-set
  `"8-10"` would otherwise read as a range).
- `pain` uses the engine's joints: `lower_back`, `neck`, `knee`, `shoulder`,
  `elbow`, `wrist`, `hip`, `calf`; the side and free text go to
  `pain_detail` / `pain_note`.
- A sharp, sudden or spreading pain stops the plan for that area and tells
  Alex to skip it and see a doctor if it persists (feedback.md).

## Skill side: "sync the app" (to fold into the skill as its own mode)

> **Hold (2026-11-23):** don't run step 2 (push) until the app reads the
> brief shape of 2026-11-23 (compact brief with `ask`, `trim`,
> `warmup.suggested`, `crossfit.dose` / `crossfit.pool`, flat
> `strength.pool` items, `probe` / `hint_lb` / `step_lb` / `if_missing` /
> `replaces`). The published app still reads the earlier shape and breaks
> on a push. Steps 1, 3 and 4 are safe. Remove this note when the app is
> updated.

1. **Pull finished sessions.** `ArtifactData query` on `workouts` with
   `where status == done`, saving to a scratch dir (`out_dir`). For each one
   without `sync.feedback_recorded_at`:
   `python3 automations/personal-trainer/app/app_sync.py feedback <file> --apply`
   runs `trainer.py feedback <date>` with the document's `feedback` (plan
   included, so `_merge_plans` can stand in for an unphotographed session).
   A machine marked `missing` → add it to `gym.json` `substitutions`.
   The strength / warm-up / crossfit numbers can go to the sheet through
   gym-log (`entries` from `feedback.actual` + catalog `sheet_rows`).
   Then `ArtifactData update workouts/<id>` with
   `{"sync": {"feedback_recorded_at": "<now>", "sheet_logged_at": "<now or null>"}}`.
2. **Push fresh data.** `app_sync.py export <dir> [--today D]` writes
   `config/*` and `briefs/*` bodies (it runs `trainer.py brief` for the
   three days at normal and low readiness) and prints the `ArtifactData
   batch` writes; fill each `if_version` from a `list` of `config` and
   `briefs` first.
   On a first push the documents don't exist yet: send the batch without
   `if_version`.
3. **Demos.** `ArtifactData list media_requests`; for each with `done: false`,
   find one good form video (WebSearch; a YouTube watch URL from a coaching
   channel, matched to the machine type in catalog `en` / `alt_us`), append it
   to `media/<id>` `items` (`added_by: skill`, `source`, `title`), then
   `update media_requests/<id> {"done": true}`. Only real https URLs from a
   search result, never a guessed one. The app shows them under "How to";
   YouTube can't play inside the page, so each opens in a new tab.
4. **Optional: a ready plan.** After Mode 1, write `workouts/<date>` with
   `status: planned`, `source: skill`, `built_by: skill`, `plan` = the checked
   plan. The app opens it as "Trainer's plan for today".

## What the app does with stale data

The brief is only as fresh as the last push. When finished app sessions are
newer than the brief and not yet synced, the app (a) moves the day rotation
past them and (b) starts those exercises from the weights actually lifted,
never higher (`fail` → one step back, `pain` → swap), and says so on the
check-in screen. The real progression comes back after the next sync.

## Exercise demos ("How to" on every exercise)

In order: demos saved in `media/<id>` (or a `media` list on the catalog
entry) · "Search YouTube" (opens YouTube with "<en name> proper form") ·
"Technique tips from Claude" (the page's Claude, quick tier, from the
catalog cues; cached 24 h) · "Ask the trainer to find a demo" (a
`media_requests` row the next sync fills) · "Add your own photo or video"
(`assets`, shown inline). The trainer's catalog cues show on top.

## Known gaps

- `trainer.py check` errors on an `action: new` exercise without weights
  ("0 весов на 3 подхода"), while methodology.md says to leave `kg` out for
  it. The app's JS check follows methodology.md (no error); the engine's
  check needs the same exemption.
- A second session on one date (`<date>-2`) merges its feedback into
  `plans/<date>.json`: `trainer.py feedback` takes a date, not an id.
- No demos are pre-loaded yet: requests fill them sync by sync.

## Live artifact

- URL: https://claude.ai/artifact/8AfbgUP6bi5akSgRR9nf8i (private to Alex;
  first published and seeded 2026-11-24 from the engine's briefs)
