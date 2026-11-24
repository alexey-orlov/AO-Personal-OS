# The trainer's method: what you choose

Distilled from 28 sessions with the Kyiv trainer (20.07–30.10.2026). The
engine already sets the day, every weight, the warm-up trio and the crossfit
doses; these rules cover the few choices left to you. Evidence:
`automations/personal-trainer/DECISIONS.md`.

## The day

- Three day types, each about once a week: **Ноги** (ГАКК, legs, glutes, a
  shoulder move), **Грудь** (presses, flies, lateral raises), **Спина**
  (pulldowns, rows, pullover, rear delts). Take `rotation.next`; the engine
  already moves it when pain rules out the day's main lift. Alex may name
  another day (`--day`).
- One session = I warm-up (3 movements) → II strength (4–6 exercises) → III
  crossfit (3–5 movements, 6–12 min for time).

## II. Strength

- `strength.items` is the last session of that day with the engine's
  weights, already swapped for machines this gym lacks. Keep it.
- Supersets are only the trainer's: ГАКК + Отведение, Сгиб. голени + Разгиб.
  бедра (or their substitutes).
- Change an exercise only when:
  - its `action` is `swap` (pain): take a pool exercise of the same role
    that loads other joints, or drop it;
  - Alex asks for variety, or the same exercises ran 3 sessions in a row on
    this day: swap one isolation or shoulder slot from `strength.pool`
    (never the main lift).
  Say why in `overrides`.
- `action` `probe` or `new` has no weight: keep it without `kg`; the table
  shows the lb hint or «подобрать».

## I. Warm-up: the lower back first

`warmup.suggested` already applies the trainer's pattern: the last warm-up of
that day, one slot rotated when the same three repeat (D bridge on legs, F
halos on chest, C band on back), each family on its rung, at most one rung
up after 6+ sessions, no weights for the first session after 3+ weeks off,
stabilizers only (A/B/C) when the back hurts. Use it as is; change it only
when Alex asks or the gym lacks the kit.

## III. Crossfit

- Format: 3 rounds for time by default (`crossfit.dose` sets rounds and
  cap). About one session in four, another format the trainer used: a
  21-15-9 couplet with one cardio buy-in, or a jump-rope ladder 50-40-30
  between three movements. Not after a pause or on a low-readiness day
  (`dose.known_only` true).
- Pick `dose.movements` movements (4, or 3 after a pause, on a low day or
  under 45 min) from `crossfit.pool` (doses there are already scaled):
  1 cardio or plyo + 2 for other muscles + 1 for the day's muscles
  (`day_muscles` true: pull-ups on a back day, dips or push-ups on a chest
  day, lunges or wall balls on a legs day). Two day-muscle movements at most;
  none after `hard` feedback on that day's muscles.
- Variety: not the same combo as any in `crossfit.recent`; nothing that was
  in both of the last two combos; prefer low `uses_last10`; change the
  cardio piece from last time.
- When the pool can't satisfy every rule (small pool after a pause), keep
  the count and the composition, drop variety first; repeating the only
  cardio is fine.
- Equipment the gym hasn't confirmed (`equipment` field): add its
  `fallback` to the item. Loads in the pool are the trainer's last ones.
- Keep the check's time estimate within the cap: cut reps, not movements.

## Lower back

No free weight loads the spine (catalog `never`): strength is machines;
free weights appear only light, in warm-up and crossfit. The engine and the
check enforce pain rules; don't work around them.

## Time and tiredness

The engine trims the brief to `--time` (strength, warm-up, crossfit dose;
`strength.trimmed` lists what it left out) and the check estimates the whole
session. Low readiness holds every weight and starts a new machine one step
lighter; crossfit 2 rounds or `"format": "skip"`.
