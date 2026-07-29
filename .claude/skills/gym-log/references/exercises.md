# Exercise registry — canonical names, aliases, categories

Canonical name = exactly what's in column B of the sheet (Alex's own RU
wording). Matching is the agent's job; `gym_sheet.py` only does exact
(normalized) lookup. Add a row for every new exercise; add aliases as new
spellings show up in the notes. Categories are EN muscle groups.

## Strength exercises (section II — the only logged part)

| Canonical (sheet row) | Category | Aliases / variants seen | Notes, stack hints |
| --- | --- | --- | --- |
| Жим лёжа | Chest | Жим лежа | barbell bench press; 70 kg (2026-07) |
| Жим сидя | Chest | | seated chest press machine; 70 kg (2026-07) |
| Сведение рук | Chest | Сведение | pec fly machine; 7-kg tiles: 45/52/59/66/73 |
| Верт. тяга | Back | Вертикальная тяга, Тяга верт., Верт. тяга (шир. хват) | lat pulldown; 52→62 (2026-07) |
| Горизонт. тяга | Back | Горизонтальная тяга | seated row; 45→59 (2026-07) |
| Тяга верт. одной рукой | Back | Тяга одной рукой | single-arm pulldown; 36→45 |
| Пулловер с колен | Back | Пулловер | kneeling pullover; 36→45 |
| Тяга в упоре | Back | Тяга в упоре (лёжа) | chest-supported row; plate-loaded, 25→35 (first done 2026-07-29) |
| Сгиб. на бицепс | Arms | Сгибание на бицепс, Сгиб. бицепс | biceps curl machine; 7-kg tiles 45/52/59 (first done 2026-07-29) |
| Жим L 45° | Legs | Жим ногами 45° | 45° leg press ("L" = legs); 30→40 |
| ГАКК присед | Legs | ГАКК приседания, Гакк | hack squat; plate-loaded, 75→120 |
| Разгиб. голени | Legs | Разгибание голени | leg extension; 7-kg tiles 59/66/73 |
| Сгиб. голени | Legs | Сгибание голени | leg curl; 59/59/63 seen — stack has small steps at top |
| Разгиб. бедра в упоре | Glutes | Разгибание бедра | kickback; half-tiles: 22.5/27.5/29.5 |
| Жим на плечи сидя | Shoulders | Жим сидя на плечи | shoulder press machine; stack 36/41/45 |
| Махи на плечи | Shoulders | Махи | lateral-raise machine; 32/36 |

Planned-but-skipped so far (crossed out, never logged): Шаги на плечи,
«Реверс» (reverse fly — the Сведение рук machine reversed).

**A parenthetical after an exercise name is usually a grip/stance annotation,
not a new exercise** — "Верт. тяга (шир. хват)" is the same lat-pulldown row as
"Верт. тяга". Open a new row only when the movement pattern itself differs
(hence "Тяга верт. одной рукой" IS its own row). When unsure, keep the existing
row and flag the call to Alex — a wrongly split row silently breaks the
left-to-right dynamics the sheet exists for.

## Not logged — section recognition vocabulary

Warm-up (section I): Dog birds, Бок. планка, Удержание резины / Удерж.
резины, Ягодичный мост. Format: `2x15`, `2x40"` (seconds).

Crossfit closing (section III): Thrusters (24кг), T2B, Sit-ups, Скакалка,
Канат, Row (N cal), Pull-ups, Lunges, Burpees, Squats, Протяжка с приседом,
Hand stand push-ups. Markers: `(x3)` rounds, `12'` time cap, boxed finish
time like `11'53"`.
