# personal-trainer automation

Deterministic half of the `personal-trainer` skill
(`.claude/skills/personal-trainer/`). It reads Alex's training history and
computes everything a session plan needs that must not drift between runs:
the pause, the day rotation, every weight under the trainer's slow
progression, which machines this gym has and what replaces the rest, kg ↔
lb, the warm-up trio and the crossfit doses. It renders the plan as the
trainer's three-part page in phone-width tables and lints a finished plan.
The skill makes the few judgment calls left (crossfit picks, reading
Alex's words). stdlib Python only: any Mac, a cloud session, CI.

The plan and feedback JSON below are also the contract for the training
mini-app (`app/`, owned by its own session; `app/README.md`).

## Files

| File | What |
|---|---|
| `trainer.py` | CLI, see commands below |
| `catalog.json` | every exercise the trainer gave: sheet row names, RU display name, US name, day, role/order, rep range, progression cadence, steps, how its weight carries to another gym (`us_transfer`), substitutes (`alt_ids`), joints, lower-back status; warm-up families and rungs, with the kit a rung needs and its stand-in; crossfit movements with patterns, timing, kit and fallbacks; the never-list |
| `gym.json` | current gym (24 Hour Fitness Walnut Creek North Main, lb, since 2026-11-19): weight steps, plate grid, machine availability, substitutions, crossfit kit |
| `data/history.json` | normalized snapshot of the "My training" sheet (strength, warm-up, crossfit per date); committed so every device sees it |
| `DECISIONS.md` | evidence behind each rule (trainer pages, backtest, gym research, test rounds); never loaded at runtime |
| `.work/` | git-ignored drafts (`plan.json` before render) |
| `../../outputs/personal-trainer/plans/<date>.json` | each issued plan + Alex's feedback (committed) |

## Commands

```bash
T=automations/personal-trainer/trainer.py
python3 $T brief [--today 2026-11-24] [--day legs|push|pull] [--pain lower_back,knee] [--ok knee] [--readiness low] [--time 45] [--missing id,id]
python3 $T check .work/plan.json                  # exit 1 on errors; warnings justified in overrides → accepted; session/crossfit estimate
python3 $T render .work/plan.json [--fmt md|text] [--save] [--only warmup|strength|crossfit]
echo '{...}' | python3 $T feedback 2026-11-24     # prints next_time; marks machines he trained on as have
python3 $T gym --missing chest_supported_tbar --have hack_squat --use X=Y --equip rope=have
python3 $T sync                                   # full refresh with the Sheets token
python3 $T import-grid a.json b.json [--replace]  # Sheets-connector responses, stitched by range
python3 $T ingest < gym-log-payload.json          # one session (gym-log calls this after each log)
python3 $T lb 6 --load ball
python3 $T backtest [--from 2026-09-14] [--verbose]
```

`TRAINER_HISTORY`, `TRAINER_PLANS`, `TRAINER_GYM` point the engine at
fixtures for tests; a test must never write the real plans dir or gym.json.

## History refresh

The sheet is the log of record (gym-log writes it and then runs `ingest`
with the same payload). `sync` rebuilds from the sheet where the Sheets
token exists; `import-grid` merges connector reads and replaces only the
sections the grid covers. A plan with recorded feedback counts as a done
session until gym-log logs the real numbers (`actual` weights beat the
prescription), so a US session without a notebook photo still moves the
next plan.

## Plan JSON

```json
{"date": "2026-11-24", "day": "legs", "note": "одна строка или нет",
 "pre": {"pain": ["lower_back"], "readiness": "low", "time_min": 45, "missing": [], "recent_pain": {}},
 "warmup": [{"id": "back_extension", "sets": 2, "reps": 15, "kg": 10}, {"id": "pallof_hold", "sets": 2, "secs": 45}],
 "strength": [{"id": "hack_squat", "sets": 3, "reps": "6", "kg": [95.3, 104.3, 113.4], "lb": [210, 230, 250],
               "action": "calibrate", "step_lb": 20, "cue": "...", "if_missing": "Жим ногами сидя", "superset_next": true},
              {"id": "cable_lateral_raise_1arm", "sets": 3, "reps": "10-12", "action": "probe", "hint_lb": "10–15",
               "replaces": "lateral_raise_1arm"}],
 "crossfit": {"format": "rounds|ladder|skip", "rounds": 3, "scheme": "21-15-9", "cap_min": 8,
              "items": [{"id": "jump_rope", "reps": 35, "fallback": "jumping_jacks"}, {"id": "wall_ball", "reps": 10, "kg": 6}]},
 "overrides": {"<id>": "reason"}, "why": ["..."],
 "feedback": {"items": {"<id>": {"rating": "easy|ok|hard|fail|pain|skipped", "joint": "knee", "note": "..."}},
              "actual": {"<id>": {"lb": [180, 200, 200], "reps": "15"}},
              "crossfit_time": "9:40", "overall": "...", "recorded_at": "..."}}
```

Ids are catalog ids. `kg` is the unit of record; `lb` is what to set on a
US machine (the brief computes both: stacks on a 5-lb grid, plates and Smith
on 10 lb, i.e. 5 lb a side).

## How the weights are set (engine)

1. First time on a machine in a new gym: the last Kyiv weight × the pause
   cut × the transfer factor (cable/Smith 0.9, plates 0.85, selectorized
   machines 0.75; free weights 1.0), floored to the grid; the first set two
   steps lighter as a probe. `probe` exercises (single-arm lateral raise,
   glute kickback: machines too different) get no number, only an lb hint;
   the weight Alex reports becomes the start. A substitute (`alt_ids`,
   `gym.json` substitutions) calibrates from the exercise it replaces.
2. 14+ days away from an exercise: same weight, first set two steps
   lighter, reps at the bottom of the range. A muscle group untrained for
   5+ weeks: −10 % (8 weeks −20 %, 13 weeks −30 %). Lower-back-caution
   exercises: −10 % after 3+ weeks.
3. Feedback first: `fail` or `hard` twice → one step back; `hard` or missed
   reps → hold; `pain` → swap; a joint that hurt in the last 14 days → no
   increase on anything loading it, and the brief asks about it until a
   plan carries `pre.cleared` (`--ok <joint>`).
4. Back to the pre-break (Kyiv) weight after a pause or the gym change: one
   step a session (two when `easy`) once the reps reach the top of the
   range, back-safe non-probe exercises only.
5. Slow progression: close the ramp → reps to the top of the range → hold N
   flat sessions (upper body 3, leg isolation 2, hack squat and abduction 1;
   `easy` takes one off) → one step up on sets 2–3. `readiness low` holds
   every weight and puts a calibration one step lighter.

Backtest against the trainer's own choices, 14.09–30.10 (79 exercise
entries): top weight within one step in 72, exact in 46; the misses are
the engine starting lighter than the trainer after the August break.
