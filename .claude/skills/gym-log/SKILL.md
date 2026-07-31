---
name: gym-log
description: Parse a photo of Alex's handwritten gym notebook page and log the core strength-training part into his "My training" Google Sheet (one row per exercise, one 4-column block per date, body-weight row), keeping the same exercise matched to the same row across sessions. Also records a body-weight measurement when given, and closes by sending a short progress digest (deltas in kg and % vs last occurrence and vs 3-month baseline) to the 🏋️ Trainings Telegram topic. Use when Alex shares a training-note photo, says "log my training / workout", "добавь тренировку", "log this to my training sheet", or sends just a weigh-in for the training log. Photo + optional comment + optional weight in; updated sheet + Telegram digest out.
disable-model-invocation: false
user-invocable: true
---

# gym-log — handwritten training note → "My training" Google Sheet

Input: photo(s) of a notebook page (HEIC/JPG path, pasted image, or a
Telegram message's `image_path`), optionally a text comment and a body-weight
measurement. Output: the strength part logged into the sheet, plus a short
report of what was written, skipped, and any doubts.

Sheet: "My training" (`GYM_SHEET_ID` in `automations/gym-log/config.sh`).
Layout: rows = exercises grouped by Category (EN muscle groups: Chest / Back /
Legs / Glutes / Shoulders / ...); each training date = 4 columns
(Sets | Reps per set | Weight start | Weight end) under a merged date header;
row 3 = "My weight" per date. The whole point: **same exercise lands in the
same row every time**, so weight/rep dynamics read left-to-right.

## Procedure

### 1. Prep the image

Work in the session scratchpad dir. HEIC → JPEG, and fix rotation (phone
photos of the notebook usually need 90° CW — letters' tops face right in the
raw file):

```bash
sips -s format jpeg -s formatOptions 90 IN.HEIC --out page.jpg
sips -r 90 page.jpg --out page_r.jpg   # verify by Reading; if wrong try -r 270
```

Read the rotated image. For any unclear line, crop + upscale that region and
re-read (far more legible than squinting at the full page):

```bash
# crop(x0,y0,x1,y1): sips -c H W --cropOffset Y0 X0, then upscale ~1.4x
sips -c 600 2700 --cropOffset 1800 950 page_r.jpg --out zoom.jpg
sips -z 840 3780 zoom.jpg
```

### 2. Date

`mdls -name kMDItemContentCreationDate <photo>` gives the shoot time — Alex
photographs the page right after the morning workout, so it pins the training
date. Cross-check against the handwritten header (DD.MM.YYг). On conflict the
EXIF date wins (pen slips happen — 2026-07-22 was handwritten "28.07.26"),
but say so in the report. Sheet date format is **M/D/YYYY without leading
zeros** ("7/22/2026") — block lookup is an exact string match.

### 3. Parse the page — strength section only

A session is three parts, usually separated by horizontal rules and circled
markers: **I** warm-up → **II** core strength → **III** crossfit closing
(often with `(x3)` rounds and a boxed finish time). **Log section II only.**
When markers are missing, recognize parts by vocabulary —
`references/exercises.md` lists known warm-up and crossfit items; strength
lines have per-set weights in kg, warm-up/crossfit lines have times (40",
12'), cal counts, or bodyweight reps.

Line rules:
- **Crossed-out exercise = planned but not done — never log it.** A struck
  name with sets/weights still written next to it is still skipped.
- Sets notation `3x10` = 3 sets × 10 reps.
- Weights: one number → start = end = it; `A→B` / `A-B` → start A, end B;
  a series `A/B/C/D` or `A-B-C` → start = first, end = last.
- A small number-series squeezed above/below a line belongs to the adjacent
  exercise that has **no inline weights** — each exercise ends up with exactly
  one weight series. Match series length to set count when attributing.
- Ambiguous digits: machine stacks step by one tile — see per-exercise stack
  hints in `references/exercises.md` (e.g. Сведение рук tiles ...52/59/66/73);
  weights grow monotonically within an exercise. Use that to disambiguate.
- Overwritten/corrected digits: read the correction, and confirm with Alex in
  the report ("read 52→62 — corrected digits").
- **If a line stays unreadable after zooming — ask Alex** (AskUserQuestion or
  a Telegram reply), don't guess silently.

### 4. Canonicalize exercise names

Alex names the same exercise slightly differently across notes. Resolve each
parsed name against `references/exercises.md` (canonical RU name + aliases +
category) AND the live sheet state from `dump` (step 5). Adjacent-exercise
context helps: e.g. a pull day's "Тяга верт." next to "Горизонт. тяга" is
"Верт. тяга". **Never infer the muscle group from a letter or symbol inside
the name** — the block Alex actually trained decides it. A press sitting
between two chest presses on a push day is Chest, whatever the glyph next to
it looks like (`Жим ∠45°` was filed as a leg press for a week because the
angle symbol read as "L for legs"). When the abbreviation is what decides the
category, ask instead of guessing. Genuinely new exercise → keep his wording as the new canonical
name, assign an EN muscle-group category (reuse existing categories before
inventing one), and **add a row to the registry file** after logging.

### 5. Write to the sheet

```bash
source automations/gym-log/config.sh
"$PYTHON_BIN" "$GYM_SHEET" dump            # current rows/dates — also validates auth
echo '{"date":"7/22/2026","my_weight":73.6,"entries":[
  {"category":"Back","exercise":"Верт. тяга","sets":3,"reps":10,"w_start":52,"w_end":62}
]}' | "$PYTHON_BIN" "$GYM_SHEET" log
```

- One `log` call per training date; several photos/sessions → chronological
  order. Upsert semantics: re-logging a date overwrites that block, never
  duplicates.
- `my_weight` only when Alex gave a weigh-in (kg, one decimal). Weight-only
  update (no training): `{"date":"...","my_weight":74.2,"entries":[]}`.
- Numbers as JSON numbers (22.5, not "22,5"). Exit code 3 → token expired:
  run `"$PYTHON_BIN" "$GYM_SHEET" auth` (browser consent; ask Alex first).
- **Category is ignored for an exercise that already has a row** — `log`
  matches by name only. Re-categorizing means moving the row into the other
  group by hand in the sheet; say so explicitly instead of assuming the
  payload fixed it.
- **Off the Mac (cloud run, fresh clone — no `.work/`)?** It still writes:
  credentials come from the `GYM_SHEETS_TOKEN_JSON` env var and the script
  falls back to a stdlib REST client when the google libs are missing — see
  "Running off the Mac" in `automations/gym-log/README.md`. Exit 3 there
  means that env var is unset or stale, and only Alex can refresh it.
- **No credentials at all?** Never drop the session and never report it as
  logged. Write the exact payload to
  `automations/gym-log/pending/<YYYY-MM-DD>.json`, commit it, and tell Alex
  it is queued plus the one command that applies it:
  `automations/gym-log/apply_pending.sh` (run on the Mac). Skip the step-7
  digest in that case — it must be built from real post-write sheet numbers,
  not from the payload.

### 6. Verify & report

`dump` again; confirm every entry landed in the right row/block. Report to
Alex (in-session, or Telegram reply if the request came via the bridge): a
compact per-date table of what was logged, what was skipped as crossed-out /
warm-up / crossfit, uncertain readings, and new exercises/categories created.
No invented data anywhere: only what the page shows or Alex said.

### 7. Telegram digest → 🏋️ Trainings topic

After a successful log, always send a digest to the `trainings` topic —
one message per training date (a multi-session backfill gets ONE combined
message instead). Numbers come from the helper, never from mental math:

```bash
"$PYTHON_BIN" "$GYM_SHEET" progress 7/24/2026   # deltas vs prev + vs 3-mo baseline
echo "$MSG" | TG_TOPIC=trainings automations/telegram/telegram_send.sh
```

Message spec — short, structured, motivating; plain text; aim well under
~1500 chars; EN labels, RU exercise names as in the sheet; dates as DD.MM:

```
🏋️ 24.07 — Legs, Glutes, Shoulders
⚖️ 73.8 kg (+0.2 vs 22.07)

ГАКК присед 4×10 → 120 kg
  vs last (22.07): +10 kg (+9.1%) 📈
  vs 3 mo (12.05): +20 kg (+20%)
Сгиб. голени 3×12 → 63 kg
  vs last (22.07): −3 kg (−4.5%) 📉
✨ Верт. тяга 3×10 → 62 kg — first log, baseline set
```

- Per exercise: `sets×reps → end-weight kg`; then `vs last (DD.MM)` and, when
  the 3-month baseline is a DIFFERENT session (`base_3mo` present), a
  `vs 3 mo (DD.MM)` line. Signs always explicit, negatives shown honestly
  (📉, no sugarcoating) — both directions are information.
- All-new session (`compared_count` 0): collapse to a 3–4-line note — session
  logged, N exercises, baselines set, comparisons start next time 💪.
- Close with ONE short motivating line only when there's real progress to
  point at; never invent praise after a down session.

### 8. Learn

New exercise, new alias spotted, or a parsing correction from Alex → update
`references/exercises.md` (aliases/stack hints) or this file's rules (root
cause, not the instance), per the repo's self-correction loop.
