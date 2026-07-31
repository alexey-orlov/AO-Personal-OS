# Exercise registry — canonical names, aliases, categories

Canonical name = exactly what's in column B of the sheet (Alex's own RU
wording). Matching is the agent's job; `gym_sheet.py` only does exact
(normalized) lookup. Add a row for every new exercise; add aliases as new
spellings show up in the notes. Categories are EN muscle groups.

## Strength exercises (section II — the only logged part)

| Canonical (sheet row) | Category | Aliases / variants seen | Notes, stack hints |
| --- | --- | --- | --- |
| Жим лёжа | Chest | Жим лежа, Жим лёжа в тренажере | chest-press machine; 70 (20.07), 60→80 (31.07, last set 80×6) |
| Жим сидя | Chest | | seated chest press machine; 70 (20.07), 60→70 (31.07) |
| Сведение рук | Chest | Сведение, Сведение рук перед собой | pec fly machine; 7-kg tiles 45/52/59/66/73 **plus a fine-tune add-on** — 68.3 logged 31.07, so non-tile decimals are real, not a misread |
| Жим в брусьях сидя | Chest | | seated dip / chest-press-in-bars machine; 63.5 (31.07, first log). Filed under Chest as part of the push day — no Arms category in the sheet yet |
| Верт. тяга | Back | Вертикальная тяга, Тяга верт. | lat pulldown; 52→62 (2026-07) |
| Горизонт. тяга | Back | Горизонтальная тяга | seated row; 45→59 (2026-07) |
| Тяга верт. одной рукой | Back | Тяга одной рукой | single-arm pulldown; 36→45 |
| Пулловер с колен | Back | Пулловер | kneeling pullover; 36→45 |
| Жим L 45° | Chest | Жим ∠45°, Жим 45° | **Seated 45° press with the ARMS, not a leg press** (Alex, 31.07.26 — applies to every past entry too). The notebook glyph is the angle symbol `∠`, not an "L for legs". 30→40 (20.07), 40→45 (31.07). ⚠️ The sheet row still sits in the **Legs** group — move it into Chest by hand; `log` matches by name only and will not move it. A real leg press, if it ever appears, is a NEW exercise |
| ГАКК присед | Legs | ГАКК приседания, Гакк | hack squat; plate-loaded, 75→120 |
| Разгиб. голени | Legs | Разгибание голени | leg extension; 7-kg tiles 59/66/73 |
| Сгиб. голени | Legs | Сгибание голени | leg curl; 59/59/63 seen — stack has small steps at top |
| Разгиб. бедра в упоре | Glutes | Разгибание бедра | kickback; half-tiles: 22.5/27.5/29.5 |
| Жим на плечи сидя | Shoulders | Жим сидя на плечи | shoulder press machine; stack 36/41/45 |
| Махи на плечи | Shoulders | Махи | lateral-raise machine; 32/36 |

Planned-but-skipped so far (crossed out, never logged): Шаги на плечи,
«Реверс» (reverse fly — the Сведение рук machine reversed), Тяга в упоре,
Сгиб. на бицепс.

## Not logged — section recognition vocabulary

Warm-up (section I): Dog birds, Бок. планка, Удержание резины / Удерж.
резины, Ягодичный мост. Format: `2x15`, `2x40"` (seconds).

Crossfit closing (section III): Thrusters (24кг), T2B, Sit-ups, Скакалка,
Канат, Row (N cal), Pull-ups, Lunges, Burpees, Squats, Протяжка с приседом,
Hand stand push-ups. Markers: `(x3)` rounds, `12'` time cap, boxed finish
time like `11'53"`.
