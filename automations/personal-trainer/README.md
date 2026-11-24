# personal-trainer automation

Deterministic half of the `personal-trainer` skill
(`.claude/skills/personal-trainer/`): it reads Alex's training history and
computes everything a session plan needs that must not drift between runs:
the pause, the day rotation, every weight under the trainer's slow
progression, kg ↔ lb for the gym he is in. It renders the plan as the
trainer's three-part page in phone-width tables and lints a finished plan
against the method. The skill makes the judgment calls (which warm-up rung,
which crossfit combo, how to read feedback). stdlib Python only, so it runs
on any Mac, in a cloud session and in CI.

The plan and feedback JSON below are also the contract for the planned
training mini-app (artifact) that will sit on top of this.

## Files

| File | What |
|---|---|
| `trainer.py` | CLI, see commands below |
| `catalog.json` | every exercise the trainer gave: sheet row names, RU display name, US name, day, role/order, rep range, progression cadence, steps, joints, lower-back status; warm-up families and rungs; crossfit movements with patterns and load caps; the never-list |
| `gym.json` | current gym (`us`, lb, since 2026-11-19), its weight steps, machine substitutions |
| `data/history.json` | normalized snapshot of the "My training" sheet (strength, warm-up, crossfit per date); committed so every device sees it |
| `DECISIONS.md` | evidence from the 28 trainer sessions and the backtest behind each rule; never loaded at runtime |
| `../../outputs/personal-trainer/plans/<date>.json` | each issued plan + Alex's feedback (committed) |

## Commands

```bash
T=automations/personal-trainer/trainer.py
python3 $T brief [--today 2026-11-24] [--day legs|push|pull] [--pain lower_back,knee] [--readiness low] [--time 45]
python3 $T check plan.json            # exit 1 on errors
python3 $T render plan.json [--fmt md|text] [--save]
echo '{...}' | python3 $T feedback 2026-11-24
source automations/gym-log/config.sh && python3 $T sync     # full refresh with the Sheets token
python3 $T import-grid a.json b.json [--replace]           # connector responses, stitched by range
python3 $T ingest < gym-log-payload.json                   # one session
python3 $T lb 68 [--load stack|kb|ball|plate|db_each|bar]
python3 $T backtest [--from 2026-09-14] [--verbose]        # engine vs the trainer's real weights
```

`TRAINER_HISTORY`, `TRAINER_PLANS`, `TRAINER_GYM` point the engine at
fixtures for tests (a scenario must never write to the real plans dir).

## History refresh

The sheet stays the log of record (gym-log writes it). The snapshot is
refreshed by `sync` where the Sheets token exists (the Mac that has
`automations/gsheets/.work/token.json`, cloud sessions and CI with
`GSHEETS_TOKEN_JSON`), else by `import-grid` from Sheets-connector reads.
`import-grid` replaces only the sessions present in the grid; `--replace`
rebuilds from scratch. A plan with recorded feedback counts as a done
session until gym-log logs the real numbers (`actual` weights in the
feedback beat the prescription), so a US session without a notebook photo
still moves the next plan.

## Plan JSON

```json
{"date": "2026-11-24", "day": "legs", "note": "одна строка или нет",
 "pre": {"pain": ["lower_back"], "readiness": "low", "time_min": 45},
 "warmup": [{"id": "back_extension", "sets": 2, "reps": 15, "kg": 10},
            {"id": "side_plank", "sets": 2, "secs": 40}],
 "strength": [{"id": "hack_squat", "sets": 3, "reps": "6", "kg": [102.1, 111.1, 120.2],
               "lb": [225, 245, 265], "superset_next": true, "cue": "..."}],
 "crossfit": {"format": "rounds|ladder|skip", "rounds": 3, "scheme": "21-15-9", "cap_min": 10,
              "items": [{"id": "wall_ball", "reps": 10, "kg": 6}, {"id": "row_erg", "reps": 15, "unit": "cal"}]},
 "overrides": {"<id>": "reason"}, "why": ["..."],
 "feedback": {"items": {"<id>": {"rating": "easy|ok|hard|fail|pain|skipped", "note": "..."}},
              "actual": {"<id>": {"lb": [180, 200, 200], "reps": "15"}},
              "crossfit_time": "9:40", "overall": "...", "recorded_at": "..."}}
```

Ids are catalog ids. `kg` is the unit of record; `lb` is what to set on a
US machine (the brief computes both, rounded to the gym's 5-lb grid).

## How the weights are set (engine)

1. First time on a machine in a new gym: the last Kyiv weight × pause cut
   × 0.9, floored to the lb grid; first set two steps lighter as a probe.
2. 14+ days away from an exercise: same weight, first set two steps
   lighter, reps at the bottom of the range. A muscle group untrained for
   5+ weeks: −10 % (8 weeks −20 %, 13 weeks −30 %). Lower-back-caution
   exercises: −10 % after 3+ weeks.
3. Feedback first: `fail` or `hard` twice → one step back; `hard` or missed
   reps → hold; `pain` → swap.
4. Back to the pre-break weight after a pause or the gym change: one step a
   session (two when `easy`), back-safe exercises only.
5. Slow progression: close the ramp (first set up to the working weight) →
   reps to the top of the range → hold N flat sessions (upper body 3, leg
   isolation 2, hack squat and abduction 1; `easy` takes one off) → one
   step up on sets 2–3.

Backtest against the trainer's own choices, 14.09–30.10 (79 exercise
entries): top weight within one step in 72, exact in 46; the misses are
the engine starting lighter after the August break.
