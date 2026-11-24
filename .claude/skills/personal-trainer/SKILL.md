---
name: personal-trainer
description: Alex's personal trainer. Builds the next gym session in his Kyiv trainer's format (I warm-up · II strength · III crossfit) from his "My training" log — the same exercise complexes and day rotation, the trainer's slow weight progression, nothing that loads the lower back, weights in kg and lb for his US gym (24 Hour Fitness Walnut Creek), machine names in Alex's Russian/surzhyk and in US English, as short phone-readable tables. Accounts for a pause since the last session (asks when the log is unclear), for how he feels today (pain, fatigue, little time), for which machines the gym has or lacks, and for his feedback after a session (easy / hard / pain, the weights he actually used), which moves the next weights. Use on /personal-trainer, "дай треню", "тренировка на сегодня", "что делать в зале", "план на тренировку", "собери тренировку", "сегодня болит поясница — что делать", "нет тренажёра X", "в зале есть X", "было легко/тяжело", "запиши фидбек по тренировке", "workout for today".
disable-model-invocation: false
user-invocable: true
---

# personal-trainer

`T=automations/personal-trainer/trainer.py`, run from the repo root with
`python3 $T …`. The engine gives every number (day, weights, kg↔lb, warm-up
trio, crossfit doses) and lints the plan: never compute or invent weights.
What you choose: `references/methodology.md`. Alex's words → flags and
ratings: `references/feedback.md`. Reply in Russian with the render output
only, nothing around it unless he asks.

## Mode 1 — Plan (default)

1. **Brief.** `python3 $T brief [flags]` (flags from his words, feedback.md;
   `--today` only in tests). It prints compact JSON. gym-log keeps
   `data/history.json` current; if he mentions a logged session the brief
   lacks, refresh first with `python3 $T sync` (Sheets token), or exit 3 →
   connector: read `Sheet1!1:1`, then `A1:B90` plus the missing date blocks,
   save each response as JSON, `python3 $T import-grid a.json b.json`.
2. **Ask** the brief's `ask` questions in one message, only those, and wait
   (a pause since the last logged session, a joint that hurt last time).
   Sessions he did since → log them via gym-log first; a hurting joint →
   rerun the brief with `--pain`.
3. **Compose** `automations/personal-trainer/.work/plan.json` (Write tool),
   by methodology.md:
   - `warmup` = `warmup.suggested` as is;
   - `strength` = `strength.items`, each item copied whole (`id`, `sets`,
     `reps`, `kg`, `lb`, `action`, `step_lb`, `hint_lb`, `cue`,
     `if_missing`, `replaces`), `"superset_next": true` on the first of the
     trainer's pairs, `trim.drop` removed when present;
   - `crossfit` = `{"format", "rounds", "cap_min", "items": [{"id", "reps"
     or "secs", "kg"?, "unit"?, "fallback"?}]}` from `crossfit.pool` and
     `crossfit.dose`;
   - plus `"date"`, `"day"`, `"pre"` (copy the brief's `pre`), optional
     `"note"` (one line, only after a pause, in a new gym or with pain),
     `"overrides"` `{id: reason}` for any departure from the brief.
4. **Check.** `python3 $T check automations/personal-trainer/.work/plan.json`.
   Fix every error; fix each warning or justify it in `overrides`. Repeat
   until `ok`.
5. **Show.** `python3 $T render automations/personal-trainer/.work/plan.json --save`
   (`--fmt text` when replying through the Telegram bridge) saves the plan
   to `outputs/personal-trainer/plans/<date>.json` and prints the tables
   and the closing question. Send that output as is.

## Mode 2 — Adjust today's plan

Pain, fatigue, little time, a busy or missing machine before or during the
session: rerun brief with the new flags (`--missing <id>` for a machine
that is busy or absent today), recompose only what changed, check, render
with `--save`, and send only the changed table.

## Mode 3 — After the session

1. Map his words to ratings (feedback.md) and record:
   `echo '<json>' | python3 $T feedback <date>` with
   `{"items": {"<id>": {"rating": "...", "joint": "...", "note": "..."}},
   "actual": {"<id>": {"lb": [..], "reps": ".."}}, "crossfit_time": "9:40"}`.
2. Its `next_time` says what each rated exercise does next. Reply one line
   per exercise that changes («ГАКК: легко → в следующий раз 230/250/270
   lb»); nothing changes → one line «Записал».
3. A notebook photo of the session goes to gym-log as usual; its numbers win.

## Mode 4 — Sync the phone app

On "синхронизируй приложение / треню из приложения": follow
`automations/personal-trainer/app/README.md`, section "Skill side". That
file owns the steps and any hold on pushing data to the app.

## Machines the gym has or lacks

Whenever he says a machine is there or not (any mode):
`python3 $T gym --have <id>` / `--missing <id>` (+ `--use <id>=<alt_id>`
for a substitute he names); kit for crossfit: `--equip rope=have|missing`.
Ids are in `automations/personal-trainer/catalog.json`. Confirm in one line.
