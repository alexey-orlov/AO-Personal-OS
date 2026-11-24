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
| `media/<exercise id>` | skill (demos) and app (Alex's uploads) | `{"id", "items": [{"kind": "youtube \| video \| image \| link", "url": "https://…", "asset_id": "…", "title", "source", "license", "license_url", "source_url", "added_by": "skill \| me", "added_at"}]}` — append, never drop Alex's items |
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
  "gym_reports": [{"have": "<id>"} | {"missing": "<id>"} | {"equip": "<kit key>", "status": "have | missing"}],
                                      // what Alex told the app about this gym; each carries "at"
  "sync": {"feedback_recorded_at": "...", "sheet_logged_at": "...", "note": "...",
           "next_time": {"<id>": {"ru", "action", "lb": [..], "kg": [..], "why"}}}   // skill only
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
- Every change Alex makes mid-session is reversible and keeps his data: a
  swap offers a choice, the swapped exercise keeps "Back to <original>", and
  no swap, skip or rebuild deletes a logged set (2026-11-24: a one-way
  auto-swap left him unable to return to the Rear Delt Fly).

## Skill side: "sync the app" (to fold into the skill as its own mode)

> **Brief compatibility.** The app (version 4, 2026-11-24) reads the first
> brief shape and the compact one of engine `8b8cc1ac` (`ask` with recent-pain
> questions, `pre.recent_pain` / `pre.cleared`, `trim`, `warmup.suggested`,
> `crossfit.dose` with `movements` / `why`, `crossfit.pool` with `fallback`,
> flat `strength.pool` items, `template_streak`, `dropped` / `trimmed`,
> `probe` / `hint_lb` / `step_lb` / `if_missing` / `replaces`), and its JS
> check is a copy of `trainer.py check` at `8b8cc1ac`, `accepted` and
> `estimate` included. When `trainer.py` changes the brief, plan or check
> shape again, hold step 2 until `index.html` is updated and re-tested
> against `trainer.py check`; until then the app keeps working on the last
> data it got.

1. **Pull finished sessions.** `ArtifactData query` on `workouts` with
   `where status == done`, saving to a scratch dir (`out_dir`). For each one
   without `sync.feedback_recorded_at`:
   `python3 automations/personal-trainer/app/app_sync.py feedback <file> --apply`
   runs `trainer.py feedback <date>` with the document's `feedback` (plan
   included, so `_merge_plans` can stand in for an unphotographed session).
   A `pain` item carries `joint` (trainer.py `JOINTS`); the engine's
   `next_time` gives the one-line replies («Верт. тяга: ок → 120/130/130 lb»).
   A machine marked `missing` → `python3 automations/personal-trainer/trainer.py gym --missing <id>`
   (`--use <id>=<alt>` only when Alex says the swap is the gym's standing one).
   Each `gym_reports` entry → `trainer.py gym --have <id>` / `--missing <id>` /
   `--equip <kit>=<have|missing>` (the app collects them from "This gym has
   …", "This gym doesn't have it" and the crossfit kit questions).
   **Every finished session goes to the "My training" sheet** (Alex,
   2026-11-24), by gym-log's own writer and rules:
   `app_sync.py sheet <file> --dump <dump.json>` builds the `log` payload
   (catalog `sheet_rows` names, kg at one decimal, `M/D/YYYY`, crossfit only
   when a time or rating was recorded; notes on stderr flag new rows),
   `source automations/gym-log/config.sh && "$PYTHON_BIN" "$GYM_SHEET" log < payload.json`
   writes it, a second `dump` must show every entry in its row, then
   `python3 automations/personal-trainer/trainer.py ingest < payload.json`
   and the gym-log step-7 digest (`progress M/D/YYYY`,
   `TG_OUTBOX=1 TG_TOPIC=trainings automations/telegram/telegram_send.sh` in
   a cloud session). Exit 3 = the Sheets credential: stop and tell Alex.
   Only after the sheet write is confirmed, `ArtifactData update workouts/<id>`
   with `{"sync": {"feedback_recorded_at": "<now>", "sheet_logged_at": "<now>", "note": "...",
   "next_time": <the engine's next_time>}}` (pinned with `if_version`); the
   app's session summary shows each exercise's next weights from it. Commit `data/history.json`,
   `outputs/personal-trainer/plans/` and the outbox card.
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
   search result, never a guessed one; confirm each with YouTube oEmbed
   (`https://www.youtube.com/oembed?format=json&url=<watch url>` gives title
   and channel; watch pages are bot-walled from cloud IPs). YouTube can't
   play inside the page, so each opens in a new tab.
   Pictures: the Everkinetic drawings first (public repo
   `github.com/everkinetic/data`, CC BY-SA 4.0: `exercises.json` maps a name
   to `id_num`, the pair is `dist/svg/<id_num>-relaxation.svg` / `-tension.svg`;
   a `--filter=blob:none` clone plus `git checkout HEAD -- <paths>` fetches
   only those). Wikimedia Commons as a fallback: its API answers 429 to cloud
   IPs, while file pages (licence, author) and `upload.wikimedia.org` work at
   a few requests a minute. Look at every picture before attaching it, and
   never attach one that shows a variant the catalog bans (barbell hack squat,
   free-standing T-bar row, behind-the-neck pulldown). Upload with the
   Artifact tool (`asset: true`, `file_paths`), then write `media/<id>` with
   `asset_id`, `title` (Start / End), `source`, `license`, `license_url`,
   `source_url`. Record what was added in `media-sources.json`.
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
(`assets`, shown inline). The trainer's catalog cues show on top. Drawings
sit on a white panel in both themes (black line art), and the "How to"
button shows the start-position thumbnail when an exercise has one.

## Known gaps

- Stored briefs are computed without `--pain` / `--time` / `--missing`: the
  app applies those itself (swaps from the pool, the engine's 4/5-exercise
  trim, the time dose for crossfit, the alternative named in `if_missing`).
- A second session on one date (`<date>-2`) merges its feedback into
  `plans/<date>.json`: `trainer.py feedback` takes a date, not an id.
- Demos are pre-loaded for 26 exercises: the next Legs session, the first
  Pull session and the back-pain warm-ups (`media-sources.json`). Bird dog
  and jumping jacks have a video but no picture yet (Commons throttled the
  download); the other catalog exercises get theirs through requests.

## Live artifact

- URL: https://claude.ai/artifact/8AfbgUP6bi5akSgRR9nf8i (private to Alex;
  first published and seeded 2026-11-24 from the engine's briefs)
