# Exercise registry — canonical names, aliases, categories

Canonical name = exactly what's in column B of the sheet (Alex's own RU
wording). Matching is the agent's job; `gym_sheet.py` only does exact
(normalized) lookup. Add a row for every new exercise; add aliases as new
spellings show up in the notes. Categories are EN muscle groups.

## Strength exercises (section II — the only logged part)

| Canonical (sheet row) | Category | Aliases / variants seen | Notes, stack hints |
| --- | --- | --- | --- |
| Жим лёжа | Chest | Жим лежа, Жим лёжа в тренажере, Жим лёжа в трен.-е | chest-press machine; 70 (20.07), 60→80 (31.07, last set 80×6), 75 4×8 (03.08), 80 3×8 (18.09–02.10) |
| Жим сидя | Chest | | seated chest press machine; 70 (20.07), 60→70 (31.07), 70 (03.08) |
| Сведение рук | Chest | Сведение, Сведение рук перед собой, Сведение рук сидя | pec fly machine; 7-kg tiles 45/52/59/66/73 **plus a fine-tune add-on** — 68.3 (31.07), 66→68.5 (03.08); non-tile decimals are real, not a misread. 73 (18.09–02.10) |
| Жим в брусьях сидя | Chest | | seated dip / chest-press-in-bars machine; 63.5 (31.07, 03.08). Filed under Chest as part of the push day — no Arms category in the sheet yet |
| Жим 45° (Смитт) | Chest | Жим ∠45° (Смитт), Жим L 45° (смитт), Жим в Смит 45° | Incline 45° press **in the Smith machine** — a different machine from `Жим L 45°`, so its own row (Alex, 03.08.26). Bar weight, not a stack: 50→40 (03.08, started too heavy and dropped), 40 3×10 (18.09–02.10) |
| Верт. тяга | Back | Вертикальная тяга, Тяга верт., Тяга вертикального блока | lat pulldown; 52→62 (2026-07), 66/68/68 (28.09); grip variants share this row with the grip noted in the report — «шир. хват» 52-59-59 (29.07) |
| Горизонт. тяга | Back | Горизонтальная тяга, Тяга горизонт. блока | seated row; 45→59 (2026-07); 7-kg tiles 45/52/59; 63/63/63 (28.09) sits between tiles and read clearly |
| Тяга верт. одной рукой | Back | Тяга одной рукой, Тяга верт. бл. одной рукой | single-arm pulldown; 36→45 (22.07), 41/50/50 (28.09) |
| Пулловер с колен | Back | Пулловер, Пуловер, Пуловер с колен | kneeling pullover; 36→45; stack 36/41/45, then 45.5 (28.09: 41→45.5) |
| Тяга в упоре | Back | | chest-supported row, plate-loaded; 25→35 (29.07) |
| Сгиб. на бицепс | Back | Сгибание на бицепс | biceps curl; 7-kg tiles 45/52. Filed under Back as part of the pull day — no Arms category in the sheet yet (same precedent as Жим в брусьях сидя → Chest) |
| Жим L 45° | Chest | Жим ∠45°, Жим 45° | **Seated 45° press with the ARMS, not a leg press** (Alex, 31.07.26 — applies to every past entry too). The notebook glyph is the angle symbol `∠`, not an "L for legs". 30→40 (20.07), 40→45 (31.07). Sheet row moved into the Chest group on 03.08.26 (merge boundary shifted; `log` matches by name only and never moves rows). The real leg press is `Жим ногами сидя` |
| ГАКК присед | Legs | ГАКК приседания, Гакк, Приседания в ГАКК | hack squat; plate-loaded, 75→120 (07–09), 100/120/140 (05.10) |
| Разгиб. голени | Legs | Разгибание голени | leg extension; 7-kg tiles 52/59/66/73; 59/66/66 (05.10) |
| Сгиб. голени | Legs | Сгибание голени | leg curl; 59/59/63 seen — stack has small steps at top; 68.5 (14.09), 66 ×3 (05.10) |
| Жим ногами сидя | Legs | | seated leg press; 95→113 (14.08, 14.09) |
| Разгиб. бедра в упоре | Glutes | Разгибание бедра, Разгиб. бедра | kickback; half-tiles: 22.5/27.5/29.5; 30/32/32 (05.10) |
| Отведение на ягодицы | Glutes | | glute abduction machine (inferred from the name); 7-kg steps 86/93/100, 3×15 (05.10, first log) |
| Жим на плечи сидя | Shoulders | Жим сидя на плечи | shoulder press machine; stack 36/41/45 |
| Махи на плечи | Shoulders | Махи | two-arm lateral-raise machine; 32/36 (07), 39→41 (14.09, 18.09). One-arm work goes to `Махи на плечи одной рукой` |
| Реверс | Shoulders | | reverse fly — the Сведение рук machine reversed; 59 (14.09) |
| Протяжка к ключицам | Shoulders | | 45 (14.09) |
| Жим гантелями сидя на плечи | Shoulders | | dumbbells; 15 (18.09) |
| Жим в Hammer под углом 60° | Shoulders | Hammer Front military press | Hammer machine; 40 3×8 (23.09, 02.10). The 02.10 page named it «Hammer Front military press»: matched on machine, weight, sets and its slot in the push day — not yet confirmed by Alex |
| Махи на плечи одной рукой | Shoulders | Махи на плечи (по одной руке), Махи на плечи в тренажере одной рукой | single-arm lateral raise on the machine, its own row; 27→34 (23.09), 34/36.5/39 (28.09), 34 ×3 (02.10, 05.10) |

Planned-but-skipped so far (crossed out, never logged): Шаги на плечи.

A `+` written between two strength lines marks a superset (05.10: ГАКК +
Отведение, Сгиб. голени + Разгиб. бедра). Log both lines as usual.

## Not logged — section recognition vocabulary

Warm-up (section I): Dog birds, Бок. планка (с поворотом), Удержание резины /
Удерж. резины, Ягодичный мост (на каждую ногу), Экстензия (с контролем
осанки; sometimes 10кг), Махи блином вокруг головы (10кг). Format: `2x15`,
`2x40"` (seconds); a single implement weight in brackets does not make a
line strength work.

Crossfit closing (section III): Thrusters (24кг / 10кг), T2B, Sit-ups,
Скакалка, Канат, Row (N cal), Pull-ups, Dips, JJ (jumping jacks), Lunges /
Lunges walking (15кг), Burpees, Squats, Приседания с блином над головой,
Box jumps, Зашагивание на тумбу (20кг), Протяжка с приседом, Hand stand
push-ups, Wall-ball (6кг). Markers: `(x3)` rounds, `12'` time cap, finish
time like `11'53"` (boxed or plain). «Приседания» alone says nothing: the
section decides (ГАКК is section II, the overhead-plate squat section III).
