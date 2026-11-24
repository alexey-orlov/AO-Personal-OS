# The trainer's method: rules for composing a plan

Distilled from 28 sessions with the Kyiv trainer (20.07–30.10.2026). The
engine already applies the numbers; these rules cover what you choose.
Evidence: `automations/personal-trainer/DECISIONS.md`.

## The day

- Three day types, each about once a week: **Ноги** (hack squat, legs,
  glutes, a shoulder move), **Грудь** (presses, flies, lateral raises),
  **Спина** (pulldowns, rows, pullover, rear delts). Take
  `rotation.next` (the least recently trained) unless Alex names a day.
- One session = I warm-up (~10 min) → II strength, 5–6 exercises → III
  crossfit, 7–12 min for time.

## II. Strength

- Start from `strength.items`: the exercises of the last session of that
  day, in the order main → secondary → isolation → shoulders. Copy the
  weights, sets and reps the engine suggests.
- Keep the main lift (ГАКК / Жим Смитт / Верт. тяга) and its partner. The
  only supersets are the trainer's: ГАКК + Отведение, Сгиб. голени + Разгиб.
  бедра (mark the first with `superset_next`).
- Variety like the trainer's: at most **one** swap per session, in an
  isolation or shoulder slot, from `strength.pool` (status active or rare),
  e.g. Сведение рук лёжа ↔ с нижнего блока, Реверс on a chest day, Жим
  сидя на плечи в Смитт on a legs or back day. Never `retired`.
- `action: swap` (pain today or last time) → replace with a pool exercise
  that loads other joints, or drop it; say which in `overrides`.
- `action: new` (no history) → leave `kg` out; the table shows «вес
  подобрать».
- Add `cue` only to `back: caution` exercises, and only on the first session
  after a pause, in a new gym or when his back complains.

## I. Warm-up: the lower back first

- 3 movements × 2 sets (2×15 reps, 2×40–45″ holds, 2×20 taps, 2×10 halos),
  each from a different family. Families and their current rung are in
  `warmup.families`:
  A Dog birds → планка высокая → plank shoulder taps ·
  B бок. планка → с поворотом · C удержание резины ·
  D ягодичный мост → на каждую ногу → + жим гантелями ·
  E экстензия → с 10 кг → сидя с гантелью · F махи блином вокруг головы.
- Always at least one of A/B/C. The trainer's latest standard trio is
  **E + B + A**: экстензия, бок. планка с поворотом, Dog birds. Rotate one
  slot every 1–3 sessions: D (bridge) on legs days, F (halos) or A3 (taps)
  on chest days, C (Pallof) on any day.
- Slow progression: keep each family's current rung. Move one family up a
  rung only when its hint is `may_advance` (6+ sessions at the rung, no
  back complaints), and at most one family per session; holds grow by +5″.
  `step_down_after_pause` → use the rung below for this session (E3 → E1,
  10 kg halo → 5 kg).

## III. Crossfit

- Default: **3 rounds for time**, 3–5 movements, cap 10–12′, Alex records
  the time. Sometimes (≈1 in 4) another format: 21-15-9 couplet with a
  cardio buy-in (Скакалка 50 / Air bike 15 cal), or a descending rope
  ladder (Скакалка 50-40-30 between movements).
- Composition: 1 cardio or plyo (скакалка, JJ, row, air bike, box jumps,
  burpees) + 2–3 movements for other muscle groups + **at most one** for
  the day's muscles, bodyweight or light: pull-ups on a back day, dips or
  push-ups on a chest day, lunges or wall balls on a legs day. Sometimes
  none of the day's muscles at all, e.g. after a hard strength part.
- Variety: never repeat any of `crossfit.recent[-3:]`; prefer movements
  with low `usage_last10`; change the cardio piece and the format from the
  last session.
- Loads stay the trainer's light ones (catalog `max_kg`): thrusters ≤ 20–25 kg,
  wall ball 6 kg, lunges ≤ 15 kg in total, goblet or sumo ≤ 20 kg (32 kg
  never again), 10 kg plate. At most 2 `back: caution` movements per combo.
- After 3+ weeks off, `readiness low` or `time_min` ≤ 45: 2–3 rounds, cap
  6–8′, no new movements. `readiness low` and pain may skip III entirely
  (`"format": "skip"`).

## The lower back: always

- No free weight loads the spine (catalog `never`): strength is machines;
  free weights appear only light, in warm-up and crossfit.
- `--pain lower_back`: the engine swaps ГАКК, жим ногами, пулловер,
  разгиб. бедра. Warm-up only A/B/C families, no loaded экстензия.
  Crossfit without any `caution` movement (fine: air bike, скакалка,
  push-ups, pull-ups, plank dumbbell drag).

## Time and tiredness

- `time_min` 45–60: drop the last isolation exercise and keep the warm-up.
  Under 45: warm-up 2 movements, strength 4 exercises, crossfit cap 6′ or skip.
- `readiness low`: the engine holds every weight; keep 3 sets unless he asks
  for less; crossfit 2 rounds or skip.
