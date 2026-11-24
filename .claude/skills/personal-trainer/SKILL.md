---
name: personal-trainer
description: Alex's personal trainer. Builds the next gym session in his Kyiv trainer's format (I warm-up · II strength · III crossfit) from his "My training" log — the same exercise complexes and day rotation, the trainer's slow weight progression, nothing that loads the lower back, weights in kg and lb for the US gym, machine names in Alex's Russian/surzhyk and in US English, as short phone-readable tables. Accounts for a pause since the last session (asks when the log is unclear), for how he feels today (pain, fatigue, little time, a missing machine) and for his feedback after a session (easy / hard / pain), which moves the next weights. Use on /personal-trainer, "дай треню", "тренировка на сегодня", "что делать в зале", "план на тренировку", "собери тренировку", "сегодня болит поясница — что делать", "нет тренажёра X", "было легко/тяжело", "запиши фидбек по тренировке", "workout for today".
disable-model-invocation: false
user-invocable: true
---

# personal-trainer

The engine `automations/personal-trainer/trainer.py` gives every number
(pause, day, weights, kg↔lb) and lints the plan: never compute weights by
hand. Composition rules: `references/methodology.md`. Alex's words to
flags and ratings: `references/feedback.md`. Run commands from the repo root.

Reply in Russian, short: the rendered tables plus at most one line. No
explanations, method notes or option lists unless he asks.

## Mode 1 — Plan (default)

1. **Fresh history.** `python3 automations/personal-trainer/trainer.py brief`
   reads `automations/personal-trainer/data/history.json`. If gym-log wrote
   sessions after its `history_synced_at`, refresh it first:
   `source automations/gym-log/config.sh && python3 automations/personal-trainer/trainer.py sync`.
   If that exits 3 (no token on this machine), use the Sheets connector:
   read `Sheet1!1:1`, then the missing date blocks plus `A1:B90` (names),
   save each response as JSON and run `trainer.py import-grid a.json b.json`.
2. **Pause.** If `pause.ask` is true (10+ days since the last logged
   session) and Alex hasn't said, ask one question: did he train since
   `pause.last_session`? If yes, get those sessions logged (gym-log) first.
3. **Today's state.** Turn his words into `--pain`, `--readiness low`,
   `--time N`, `--day` (feedback.md) and run
   `trainer.py brief [flags] > <scratchpad>/brief.json`.
4. **Compose** `<scratchpad>/plan.json` from the brief by methodology.md:
   strength = `strength.items` with their suggested `kg`/`lb`/`reps`
   copied as is; warm-up = 3 movements; crossfit = 3–5 movements. Shape:

   ```json
   {"date": "2026-11-24", "day": "legs", "note": "≤1 строка, только если есть что сказать",
    "pre": {"pain": [], "readiness": "normal"},
    "warmup": [{"id": "back_extension", "sets": 2, "reps": 15}, {"id": "side_plank", "sets": 2, "secs": 40}],
    "strength": [{"id": "hack_squat", "sets": 3, "reps": "6", "kg": [102.1, 111.1, 120.2], "lb": [225, 245, 265],
                  "superset_next": true, "cue": "поясница прижата к спинке"}],
    "crossfit": {"format": "rounds", "rounds": 3, "cap_min": 10,
                 "items": [{"id": "jump_rope", "reps": 50}, {"id": "wall_ball", "reps": 10, "kg": 6}]},
    "overrides": {"<id>": "why this weight or exercise departs from the brief"},
    "why": ["≤2 коротких пункта, только когда план отходит от обычного"]}
   ```
   `format` is `rounds` | `ladder` (+ `"scheme": "21-15-9"`) | `skip`.
5. **Check.** `trainer.py check <scratchpad>/plan.json`. Fix every error;
   fix each warning or justify it in `overrides`. Re-run until `ok`.
6. **Show and save.** `trainer.py render <scratchpad>/plan.json --save`
   prints the tables and saves the plan to
   `outputs/personal-trainer/plans/<date>.json`. Show its output exactly,
   then one line: «После тренировки напиши, где было легко/тяжело/больно».

## Mode 2 — Adjust today's plan

Pain, fatigue, little time, a busy or missing machine before or during the
session: rerun brief with the new flags, change only what the flag hits
(swap from `strength.pool`; gym.json `substitutions` for a machine the gym
lacks), then check, render, save. Show only the changed table.

## Mode 3 — Feedback after the session

Map his words to ratings (feedback.md) and record:
`echo '<json>' | trainer.py feedback <date>` with
`{"items": {"<id>": {"rating": "easy|ok|hard|fail|pain", "note": "..."}},
"actual": {"<id>": {"lb": [..], "reps": ".."}}, "crossfit_time": "9:40",
"overall": "..."}`. Weights he names go to `actual`; if he also logs a
notebook photo, gym-log owns the sheet and its numbers win. Reply in one
line per changed exercise: what moves next time («Верт. тяга: легко →
в следующий раз +5 lb»).
