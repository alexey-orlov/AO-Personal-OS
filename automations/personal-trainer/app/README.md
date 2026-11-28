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
- Capabilities: `db` (owner-only rules), `sample` (Claude inside the page),
  `assets` (Alex's own exercise photos and videos) and `mcp` (Alex's Google
  Sheets connector, to write each finished session to "My training"):
  ```json
  {"db": {"rules": [{"path": "", "read": "owner", "write": "owner"}]}, "sample": {}, "assets": {},
   "mcp": {"servers": [{"server": "Google Sheets", "tools": ["get_values", "get_spreadsheet", "update_spreadsheet"]}]}}
  ```
  On a republish from this session, omit `capabilities` to keep them.

## Nothing logged is lost; "Save session" writes the sheet

- **Every tap is saved twice:** to the artifact's database (server side, so
  it survives a reload, a sign-out or another device) and, the same moment,
  to a copy on the phone (`localStorage`, `tn.draft.<id>`). The phone copy
  is removed once the database holds that version and comes back on load if
  it is newer, so a dropped connection at the gym loses nothing. The workout
  header says "Saved", "Saving…" or "Not saved online yet: kept on this
  phone, retrying". A half-done session reopens where it was, clocks
  included (they are timestamps in the record), on any device.
- **The session clock:** "Start workout" starts it, "Save session" stops it,
  and during a session the sticky header shows it with the part in progress
  ("Hack Squat + Hip Abduction · 4:12"). `log.timeline` records which part
  has the floor: the warm-up (one clock), each strength slot (a swap keeps
  the slot's time; a superset shares one), the crossfit (set-up and the
  for-time clock), then nothing. Finishing a part hands the floor to the
  next, so the parts add up to the session; cards and section heads show
  their own times, the summary and History the totals. If "Save session"
  comes 15+ minutes after the last logged set, the finish sheet offers that
  set's time as the end.
- **"Save session" writes the session to "My training" at once**, through
  Alex's own Google Sheets connector (`config/sheet` holds the sheet id and
  tab): the same payload as `app_sync.py sheet` and the same layout rules as
  gym-log's `gym_sheet.py log` (date block, rows by name inside their
  section, new rows and blocks with their neighbours' format), sent as one
  all-or-nothing `update_spreadsheet` batch and read back cell by cell. Then
  `sync.sheet_logged_at` / `sheet_by: "app"` / `sheet_block` are set. A
  re-save rewrites the same block, never a second one. The summary shows the
  outcome with a code-specific fix and "Try again"; History marks each
  session "in the sheet" / "not in the sheet".
- The trainer's engine (ratings, next weights) still learns the session at
  the next sync; until then the app plans from what was actually lifted.

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
| `config/sheet` | skill (`app_sync.py export`, from gym-log's `config.sh`) | `{"spreadsheet_id", "tab"}` — where "Save session" writes |
| `config/records` | skill (`app_sync.py export`, from `data/history.json`) | `{"as_of", "computed_at", "items": {"<id>": {"last": {"date", "gym", "sets", "reps", "kg": [start, end]}, "best": {"date", "gym", "kg", "reps"}}}}` — the "Last … · Best …" line on every exercise card; the app folds in its own finished sessions the history doesn't hold yet. Weights show in the units of the gym they were lifted in (Kyiv kg, US lb) |
| `config/figures` | skill (`app_sync.py export`, from `figures.json`) | `{"_doc", "items": {"<id>": {"view", "eq", "frames", "arrow", "hl", "thumb"}}}` — the picture of every exercise, drawn by the page (see "Exercise figures") |
| `briefs/legs` · `briefs/push` · `briefs/pull` | skill | `{"for_date", "computed_at", "normal": <trainer.py brief --day X>, "low": <… --readiness low>}` |
| `workouts/<YYYY-MM-DD>` | app (skill may create a `planned` one) | see below |
| `media/<exercise id>` | skill (demo videos) and app (Alex's uploads) | `{"id", "items": [{"kind": "youtube \| video \| image \| link", "url": "https://…", "asset_id": "…", "title", "source", "added_by": "skill \| me", "added_at", "role"}]}` — append, never drop Alex's items. The skill adds videos only; pictures from the skill are no longer shown (every exercise has its figure). Images are Alex's own photos; `role` (`machine`, `placard`) is on the ones taken before 2026-11-25 |
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
    "strength": {"<id>": {"sets": [{"lb": 120, "kg": 54.4, "reps": 10, "done": true, "at": "..."}],
                          "machine": "optional: the US machine used instead (alt_us)"}},
    "crossfit": {"time": "9:40", "rounds_done": 3, "items": {"<id>": {"reps": "50"}}},
    "timeline": [{"k": "warmup | s:<planned id> | crossfit | idle | end", "at": "..."}],   // who had the floor, from when
    "last_at": "..."                  // the last logged action: the end time a late "Save session" offers
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
- Every change Alex makes mid-session is reversible and keeps his data, and
  no swap, skip or rebuild deletes a logged set. A slot's swaps form one
  fixed ring: the planned exercise first, then the catalog's own
  alternatives (`alt_ids`, both ways, whatever their role: a busy hack squat
  goes to the leg press), then the pool's, best first. Picking never
  reorders the ring, the swapped card keeps "↻ Planned: … · Back", and "This
  gym doesn't have it" moves to the next ring entry; going back to the
  planned exercise withdraws that report (2026-11-25: on 11/23 the swaps
  ping-ponged Smith Shoulder Press ↔ Cable Lateral Raise with no way back
  to the Rear Delt Fly). The crossfit kit fallback ("No rope") keeps a
  "Back" the same way.

## Skill side: "sync the app" (to fold into the skill as its own mode)

> **Brief compatibility.** The app (version 6, 2026-11-25) reads the first
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
   2026-11-24). The app writes it itself on "Save session"; when the doc has
   `sync.sheet_logged_at` with `sheet_by: "app"`, skip the sheet write and
   only run `trainer.py ingest` on the `app_sync.py sheet` payload plus the
   digest. Otherwise (the app couldn't reach Google Sheets), by gym-log's own
   writer and rules:
   `app_sync.py sheet <file> --dump <dump.json>` builds the `log` payload
   (catalog `sheet_rows` names, or the gym's own row from `gym.json`
   `sheet_rows` where its machine's kg don't compare with the old gym's,
   kg at one decimal, `M/D/YYYY`, crossfit only
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
   `config/*` (records included) and `briefs/*` bodies (it runs `trainer.py
   brief` for the three days at normal and low readiness; on the session's
   own day it plans for the next day, since a brief leaves out sessions
   dated on its own day) and prints the
   `ArtifactData batch` writes; fill each `if_version` from a `list` of
   `config` and `briefs` first.
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
   play inside the page, so each opens in a new tab. Record what was added
   in `media-sources.json`. Pictures are not media: a new catalog exercise
   gets its figure in `figures.json` (see "Exercise figures"), pushed with
   step 2.
4. **Optional: a ready plan.** After Mode 1, write `workouts/<date>` with
   `status: planned`, `source: skill`, `built_by: skill`, `plan` = the checked
   plan. The app opens it as "Trainer's plan for today". Rewriting the
   numbers of a session already in the app adds a `changes` entry (`kind:
   rebuild`) whose summary gives each new number with the engine's own `why`
   for it, never a cause the engine didn't compute.

### The nightly run (scheduled task)

Steps 1–3 also run on their own: the scheduled task "Trainer Notebook →
sheet sync" (`trig_01XnowrFjfm8LNznfA7ecU7P`, created 2026-11-25 on Alex's
request) starts a fresh cloud session every night at 21:41 Pacific
(`CRON_TZ=America/Los_Angeles 41 21 * * *`) in the Default environment,
which carries `GSHEETS_TOKEN_JSON`. Its prompt points here and adds only
the guard rails: first a `git push --dry-run` preflight, and without push
access it writes nothing anywhere and sends Alex a phone notification;
nothing waiting means no change and no commit; no `dev/sandbox.sh`; a
session counts as synced only once its sheet row is confirmed; any failure
sends one phone notification plus a Telegram card in the trainings topic.
It stores no claude.ai connectors (it needs none: the sheet goes through
`gym_sheet.py`, the app through the built-in ArtifactData tool). The app
also keeps the id in `config/automation`. Change the schedule or prompt
with `update_trigger`, never by deleting and recreating it.
Push access: a task created from a chat session starts without repository
sources, so its runs can clone the repo but the git proxy refuses the push
(2026-11-25 test run: "not in this session's authorized repository set").
The repository has to be added to the routine, with push access, in
claude.ai; until then every run stops at the preflight and notifies.

## What the app does with stale data

The brief is only as fresh as the last push. When finished app sessions are
newer than the brief and not yet synced, the app (a) moves the day rotation
past them and (b) starts those exercises from the weights actually lifted,
never higher (`fail` → one step back, `pain` → swap), and says so on the
check-in screen. The real progression comes back after the next sync.

## Exercise figures (the picture of every exercise)

Every exercise has one picture in one style, drawn by the page itself: a
figure of thick rounded strokes like the instruction plates on gym
machines, the machine or kit in greys, the working muscle and an arrow for
the movement in the accent colour, in both themes. A movement gets two
frames, start and end, each with one line on what to watch in that
position; a hold gets one frame with its cue beside it; burpees get three.
Where it shows: the "How to" button on every card and warm-up / crossfit
row (the start and end frames, small), the swap list (one frame), and the
How-to sheet (the frames large, with the cues). Decided 2026-11-25 on
Alex's correction: the earlier mix (Everkinetic drawings for 44 exercises,
nothing for the rest, empty slots for his own photos) was not what he
asked for; a movement needs two pictures to read; one style for all.

- **Source of truth:** `figures.json` (one entry per catalog id), pushed as
  `config/figures` by `app_sync.py export`; the renderer is the FIGURES
  block of `index.html` (`FIG.of` / `FIG.pair` / `FIG.thumb`). Only numbers
  and fixed class names reach the SVG markup. Covers 66 of the 67 catalog
  ids; `squat_high_pull` is retired and has none. A new exercise without
  an entry shows a plain "How to" button and a sheet without a picture.
- **An entry:** `view` `side` (faces right), `front` (faces you; limb
  angles given for the limb on the right of the picture and mirrored) or
  `top` (shoulders and arms from above or head-on: pallof hold, DB fly from
  the head end, plank drag); `eq`, the machine and kit; `frames`, each
  `{"pose", "cue", "label"?, "eq"?}`; `arrow` (`arrow2` from the 2nd to the
  3rd frame), the joint whose path the start frame shows, `[joint]` straight
  or `[joint, pivot]` as an arc; `hl`, the regions in the accent colour
  (default: the catalog's first muscle); `thumb`, the frame for lists.
- **A pose:** body units (standing ≈ 105 tall, floor at y = 0, up is
  negative). `at: [joint, x, y]` places one joint; `t` torso and `h` head
  directions; `a: [upper arm, forearm, len, len]` and `l: [thigh, shin,
  foot, len, len]` as absolute directions (0 down, 90 forward or out, 180
  up; the lengths shorten a segment that points at you); or targets `ah` /
  `lf` (hand, ankle) with the elbow or knee solved, `ab` / `lb` the side it
  bends to. `a2` `l2` `ah2` `lf2` set the far or left limb; `r` turns the
  body (the side plank); `behind: true` draws front-view arms behind the
  body (the rear delt fly, seen from behind).
- **Equipment** (`[kind, …, {"z": 1|2, "f": frame}]`, points as `[x, y]`,
  `["joint"]`, `["joint", dx, dy]` or `["joint", "segment", along,
  across]`): `floor`, `wall`, `pad`, `frame`, `path`, `lever` (with a plate
  on it), `roll`, `pulley`, `cable`, `band`, `bar`, `handle`, `stack`,
  `box`, `plate`, `plateside`, `db`, `dbe` (end-on), `kb`, `ball`, `disc`,
  `ring`, `arc`, `earc`, `rope`.
- **Checking one:** `python3 app/dev/figure_gallery.py` writes
  `.work/harness/figures.html`; open it on the `trainer-app-harness` server
  (`?only=id,id`, `?light` / `?dark`, `?thumbs`, `?big`) and look at every
  frame at phone size before it ships: is the start and end each clear on
  its own, the machine the gym's kind, the muscle right, the cue true to
  the trainer's notes?

The machine drawn is the kind the gym has, not the exact Matrix or Hoist
model; the manufacturers' photos and plates are not copied (copyrighted,
and no openly licensed photo of those models exists on Commons, Openverse
or Flickr as of 2026-11-25). His own photos of this gym's machines and the
"See the <brand> machine" link cover the exact model.

## The How-to sheet

A bottom sheet with a fixed header (name, ✕; drag it down or press Escape
to close) that keeps its scroll and its Claude tips when data refreshes.
In order: the figure (frames and cues) · his own photos, if any (tap one
to see it full screen and delete it there) · the trainer's notes · saved
videos · "Find more": "Search YouTube" ("<en name> proper form"), "See the
<brand> machine" (Google Images for the brand gym.json `brands_seen` gives
that kind of machine: Matrix for weight stacks, Hoist for plate-loaded),
"Technique tips from Claude" (quick tier, from the catalog cues; cached
24 h), "Ask the trainer to find a demo" (a `media_requests` row the next
sync fills) and "Add a photo or video" (shrunk to 1600 px before it goes
up to `assets`).

## Testing a change (app or engine)

1. `python3 app/app_sync.py export app/.work/harness/seed --today <date>`, then
   `python3 app/dev/make_harness.py` builds `app/.work/harness/harness.html`: the
   page with a stand-in db (that seed, plus any `seed/media/*.json`), a
   stand-in Claude that returns the page's own draft and a stand-in asset
   store. Serve it with the `trainer-app-harness` entry in
   `.claude/launch.json` and drive it at phone width. The stand-in db and
   clock survive a reload of the tab (that is how to test a half-done
   session coming back); `harness.html?fresh` starts over. Uploaded photos
   stay in the page as object URLs; `.work/harness/_blob/<asset id>.<ext>`
   serves a real asset fetched with the Artifact tool's `read` (the id as
   `path`). Figures: `dev/figure_gallery.py` (see "Exercise figures").
2. Check parity: build plans in the page (`buildTemplate(contextFor(day, ck))`
   for several check-ins, plus a broken one), save them, run
   `trainer.py check` on each; the error and warning counts, `accepted` and
   `estimate.session_min` must match the page's `checkPlan` (2026-11-24: 9 of 9).
3. The sheet writer: the test page swaps in `dev/sheet_mock.js` (the sheet's
   layout as of 2026-11-24) and keeps every batch in `window.__sheetRequests`.
   Replay a batch on a scratch copy of the tab (Drive `create_file` a blank
   spreadsheet, `copy_sheet_to_another_spreadsheet`, swap the `sheetId`),
   read it back, then trash the copy; never test on "My training" itself.
   2026-11-24: a new block, a new row and a re-save checked this way; the
   copy caught a date header that read "46350".
4. Anything that runs `trainer.py feedback`, `ingest` or `gym` first does
   `eval "$(app/dev/sandbox.sh)"`: those commands write `gym.json`,
   `history.json` and `plans/`, and the sandbox points all three at copies.

## Known gaps

- Stored briefs are computed without `--pain` / `--time` / `--missing`: the
  app applies those itself (swaps from the pool, the engine's 4/5-exercise
  trim, the time dose for crossfit, the alternative named in `if_missing`).
- A second session on one date (`<date>-2`) merges its feedback into
  `plans/<date>.json`: `trainer.py feedback` takes a date, not an id.
- Five figures are diagrams more than portraits: the pallof hold and the
  plank drag (from above / head-on), the DB fly (from the head end), the
  rear delt fly (from behind) and the pec deck's end frame (arms meeting in
  front, foreshortened). Each says its viewpoint in the cue. "Seated back
  extension with a DB" is drawn as a seated lean forward and back up
  (inferred from its name); correct the figure if the trainer meant
  another movement.
- The asset store still holds the 66 Everkinetic SVGs the media docs used
  until 2026-11-25; nothing references them. Deleting them (Artifact tool,
  `delete` with the asset id as `path`) only frees storage.
- "Save session" writing the sheet from the phone has been tested against
  a scratch copy of the tab, not yet on a real session: the 11/23 session
  went into the sheet through the trainer's sync.

## Live artifact

- URL: https://claude.ai/artifact/8AfbgUP6bi5akSgRR9nf8i (private to Alex;
  first published and seeded 2026-11-24 from the engine's briefs)
