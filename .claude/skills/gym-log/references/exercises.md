# Exercise registry — canonical names, aliases, categories

Canonical name = exactly what's in column B of the sheet (Alex's own RU
wording). Matching is the agent's job; `gym_sheet.py` only does exact
(normalized) lookup. Add a row for every new exercise; add aliases as new
spellings show up in the notes. Categories are EN muscle groups.

## Strength exercises (section II — the only logged part)

| Canonical (sheet row) | Category | Aliases / variants seen | Notes, stack hints |
| --- | --- | --- | --- |
| Жим лёжа | Chest | Жим лежа, Жим лёжа в тренажере | chest-press machine; 70 (20.07), 60→80 (31.07, last set 80×6), 75 4×8 (03.08), 80 3×(8-8-6) (18.09) |
| Жим сидя | Chest | | seated chest press machine; 70 (20.07), 60→70 (31.07), 70 (03.08) |
| Сведение рук | Chest | Сведение, Сведение рук перед собой | pec fly machine; 7-kg tiles 45/52/59/66/73 **plus a fine-tune add-on** — 68.3 (31.07), 66→68.5 (03.08), 73 (18.09); non-tile decimals are real, not a misread |
| Жим в брусьях сидя | Chest | | seated dip / chest-press-in-bars machine; 63.5 (31.07, 03.08). Filed under Chest as part of the push day — no Arms category in the sheet yet |
| Жим 45° (Смитт) | Chest | Жим ∠45° (Смитт), Жим L 45° (смитт) | Incline 45° press **in the Smith machine** — a different machine from `Жим L 45°`, so its own row (Alex, 03.08.26). Bar weight, not a stack: 50→40 (03.08, started too heavy and dropped), 40 3×10 (18.09 — same weight, reps 8→10) |
| Верт. тяга | Back | Вертикальная тяга, Тяга верт., Тяга вертикального блока | lat pulldown; 52→62 (2026-07); grip variants share this row with the grip noted in the report — «шир. хват» 52-59-59 (29.07) |
| Горизонт. тяга | Back | Горизонтальная тяга, Тяга горизонт. блока | seated row; 45→59 (2026-07); 7-kg tiles 45/52/59 |
| Тяга верт. одной рукой | Back | Тяга одной рукой, Тяга верт. бл. одной рукой | single-arm pulldown; 36→45 |
| Пулловер с колен | Back | Пулловер, Пуловер с колен | kneeling pullover; 36→45; stack 36/41/45 |
| Тяга в упоре | Back | | chest-supported row, plate-loaded; 25→35 (29.07) |
| Сгиб. на бицепс | Back | Сгибание на бицепс | biceps curl; 7-kg tiles 45/52. Filed under Back as part of the pull day — no Arms category in the sheet yet (same precedent as Жим в брусьях сидя → Chest) |
| Жим L 45° | Chest | Жим ∠45°, Жим 45° | **Seated 45° press with the ARMS, not a leg press** (Alex, 31.07.26 — applies to every past entry too). The notebook glyph is the angle symbol `∠`, not an "L for legs". 30→40 (20.07), 40→45 (31.07). Sheet row moved into the Chest group on 03.08.26 (merge boundary shifted; `log` matches by name only and never moves rows). A real leg press, if it ever appears, is a NEW exercise |
| ГАКК присед | Legs | ГАКК приседания, Гакк | hack squat; plate-loaded, 75→120 |
| Разгиб. голени | Legs | Разгибание голени | leg extension; 7-kg tiles 59/66/73 |
| Сгиб. голени | Legs | Сгибание голени | leg curl; 59/59/63 seen — stack has small steps at top |
| Жим ногами сидя | Legs | | seated leg press; 95→113 (14.08, 14.09). A genuine leg press, so a separate row from `Жим L 45°` (an ARMS press) — never merge the two |
| Разгиб. бедра в упоре | Glutes | Разгибание бедра | kickback; half-tiles: 22.5/27.5/29.5 |
| Жим на плечи сидя | Shoulders | Жим сидя на плечи | shoulder press machine; stack 36/41/45 |
| Жим гантелями сидя на плечи | Shoulders | Жим гантелями на плечи, Жим гант. сидя на плечи | seated DUMBBELL shoulder press — **weight is per dumbbell**, written `15кг [×2 р.]` (= ×2 руки); logged as 15, not 30. A different implement from `Жим на плечи сидя` (machine, stack 36→54), so its own row — merging them would fabricate a 39-kg collapse. 15 3×8 (18.09) |
| Махи на плечи | Shoulders | Махи | lateral-raise machine; stack 32/36/39/41 — 32→36 (24.07), 36→39 (14.08), 39→41 (14.09, 18.09) |
| Реверс | Shoulders | «Реверс» | reverse fly — the Сведение рук machine reversed; 59 3×10 (14.09) |
| Протяжка к ключицам | Shoulders | | upright row to the collarbones; 45 3×10 (14.09) |

Planned-but-skipped so far (crossed out, never logged): Шаги на плечи.
(«Реверс» was crossed out through July but really trained on 14.09 — it has a
row now. A name in this list is skipped only for the page it was struck on.)

## Not logged — section recognition vocabulary

Warm-up (section I): Dog birds, Бок. планка / Боковая планка с поворотом,
Удержание резины / Удерж. резины, Ягодичный мост. Format: `2x15`, `2x40"`
(seconds).

Crossfit closing (section III): Thrusters (24кг), T2B, Sit-ups, Скакалка,
Канат, Row (N cal), Pull-ups, Lunges, Burpees, Squats, Протяжка с приседом,
Hand stand push-ups, Wall-ball / Wall ball, Отжимания от пола, Приседания с
гирей. Markers: `(x3)` rounds, `12'` time cap, boxed finish
time like `11'53"`.
