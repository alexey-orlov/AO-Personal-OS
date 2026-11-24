# Exercise registry — canonical names, aliases, categories

Canonical name = exactly what's in column B of the sheet (Alex's own RU
wording). Matching is the agent's job; `gym_sheet.py` only does exact
(normalized) lookup. Add a row for every new exercise; add aliases as new
spellings show up in the notes. Categories are EN muscle groups.

## Strength exercises (section II)

| Canonical (sheet row) | Category | Aliases / variants seen | Notes, stack hints |
| --- | --- | --- | --- |
| Жим лёжа | Chest | Жим лежа, Жим лёжа в тренажере, Жим лёжа в трен.-е | chest-press machine; 70 (20.07), 60→80 (31.07, last set 80×6), 75 4×8 (03.08), 80 3×8 (18.09–02.10) |
| Жим сидя | Chest | Жим сидя на грудь, Жим от груди сидя | seated chest press machine; 70 (20.07), 60→70 (31.07), 70 (03.08), 62→70 (10.08), 61→70 (07.10) |
| Сведение рук | Chest | Сведение, Сведение рук перед собой, Сведение рук сидя, Сведение рук сидя горизонт | pec fly machine; 7-kg tiles 45/52/59/66/73 **plus a fine-tune add-on** — 68.3 (31.07), 66→68.5 (03.08); non-tile decimals are real, not a misread. 66→73 (10.08); 73→75 (17.08: a small «2» sits over the last, bolder «5»; 75 confirmed by Alex, 23.11.26); 73 (18.09–21.10); 73→79 (07.10); 79→73 (14.10, first set heavier). «горизонт» is what sets it apart from the low-pulley fly below |
| Жим в брусьях сидя | Chest | | seated dip / chest-press-in-bars machine; 63.5 (31.07, 03.08), 63→73 (10.08), 73 ×3 (17.08). Filed under Chest as part of the push day — no Arms category in the sheet yet |
| Жим 45° (Смитт) | Chest | Жим ∠45° (Смитт), Жим L 45° (смитт), Жим в Смит 45°, Жим в Смитт (45°), Жим в Смитт, Жим Смитт, Жим. Смитт | Incline 45° press **in the Smith machine** — a different machine from `Жим L 45°`, so its own row (Alex, 03.08.26). From 14.10 the notebook drops the angle: «Жим Смитт» is this row (Alex, 23.11.26). Bar weight, not a stack: 50→40 (03.08, started too heavy and dropped), 40 3×8 (10.08), 40 3×10 (17.08, 18.09–05.10), 40→45 (07.10), 45 3×10 (14.10, 21.10) |
| Верт. тяга | Back | Вертикальная тяга, Тяга верт., Тяга вертикального блока | lat pulldown; 52→62 (2026-07), 66/68/68 (28.09); grip variants share this row with the grip noted in the report — «шир. хват» 52-59-59 (29.07) |
| Горизонт. тяга | Back | Горизонтальная тяга, Тяга горизонт. блока | seated row; 45→59 (2026-07); 7-kg tiles 45/52/59; 63/63/63 (28.09) sits between tiles and read clearly |
| Тяга верт. одной рукой | Back | Тяга одной рукой, Тяга верт. бл. одной рукой | single-arm pulldown; 36→45 (22.07), 41/50/50 (28.09) |
| Пулловер с колен | Back | Пулловер, Пуловер, Пуловер с колен | kneeling pullover; 36→45; stack 36/41/45, then 45.5 (28.09: 41→45.5); 45/45/41 (09.10: reps not on the page, 10 inferred from the day's 3×10 — Alex left the call to the agent, 23.11.26); 41 ×3 (16.10–30.10) |
| Тяга в упоре | Back | Т-тяга | chest-supported row, plate-loaded; 25→35 (29.07). The notebook's «Т-тяга» is this machine (Alex, 23.11.26); 35 ×3 (19.08, 09.10, 16.10–30.10). The 19.08 page put the name between question marks («?Тяга в упоре?»); the weights match this row |
| Сгиб. на бицепс | Back | Сгибание на бицепс, Сгибание предплечья (на бицепс) | biceps curl; 7-kg tiles 45/52; 52→54 (05.08, 12.08). Filed under Back as part of the pull day — no Arms category in the sheet yet (same precedent as Жим в брусьях сидя → Chest) |
| Жим L 45° | Chest | Жим ∠45°, Жим 45° | **Seated 45° press with the ARMS, not a leg press** (Alex, 31.07.26 — applies to every past entry too). The notebook glyph is the angle symbol `∠`, not an "L for legs". 30→40 (20.07), 40→45 (31.07). Sheet row moved into the Chest group on 03.08.26 (merge boundary shifted; `log` matches by name only and never moves rows). The real leg press is `Жим ногами сидя` |
| Сведение рук лёжа | Chest | | lying fly, «по 18 на руку» (18 kg per hand); 18 ×3 (14.10, first log) |
| Сведение рук сидя с нижнего блока | Chest | | seated cable fly from the low pulley, **not** the pec-fly machine (`Сведение рук`, which the same page calls «… сидя горизонт»); 16 ×3 (21.10, first log) |
| ГАКК присед | Legs | ГАКК приседания, Гакк, Приседания в ГАКК, Присед. в ГАКК | hack squat; plate-loaded, 75→120 (07–09), 100/120/140 (05.10), 130/140/150 3×6-8 (12.10) |
| Разгиб. голени | Legs | Разгибание голени | leg extension; 7-kg tiles 52/59/66/73; 59/66/66 (05.10); 62/66/68 (12.10), off-tile values written clearly |
| Сгиб. голени | Legs | Сгибание голени | leg curl; 59/59/63 seen — stack has small steps at top; 68.5 (14.09), 66 ×3 (05.10) |
| Жим ногами сидя | Legs | | seated leg press; 95→113 (14.08, 14.09) |
| Разгиб. бедра в упоре | Glutes | Разгибание бедра, Разгиб. бедра | kickback; half-tiles: 22.5/27.5/29.5; 30/32/32 (05.10) |
| Отведение на ягодицы | Glutes | | glute abduction machine (inferred from the name); 7-kg steps 86/93/100, 3×15 (05.10, first log); 89/100/107 (12.10; the overwritten 89 confirmed by Alex) |
| Жим на плечи сидя | Shoulders | Жим сидя на плечи | shoulder press machine; stack 36/41/45 |
| Махи на плечи | Shoulders | Махи, Махи на плечи в тренаж. | two-arm lateral-raise machine; 32/36 (07), 45→39 (19.08), 39→41 (14.09, 18.09), 41 3×8-10 (21.09). One-arm work goes to `Махи на плечи одной рукой` |
| Реверс | Shoulders | Реверс на заднюю Δ, Реверс. на заднюю Δ, Реверс (задняя дельта) | reverse fly for the rear delts — the Сведение рук machine reversed; 59→66 (19.08, 21.09), 59 (14.09), 61→70 (07.10), 70 3×8 (16.10), 70 3×10 (23.10, 30.10). Same row for «на заднюю Δ» (Alex, 23.11.26) |
| Протяжка к ключицам | Shoulders | | 45 (14.09) |
| Жим гантелями сидя на плечи | Shoulders | | dumbbells; 15 (18.09) |
| Жим в Hammer под углом 60° | Shoulders | Hammer Front military press, Front military press | Hammer machine; 40 3×8 (23.09, 02.10), 40 3×10 (07.10). The notebook itself ties the names: the 23.09 page footnotes this line «(*) Front military press», and 07.10 logs «Front military press 40-40-40» |
| Махи на плечи одной рукой | Shoulders | Махи на плечи (по одной руке), Махи на плечи в тренажере одной рукой, Махи на плечи в тр. одной рукой, Махи на плечи одной р. | single-arm lateral raise on the machine, its own row; 27→34 (23.09), 34 ×3 (25.09), 34/36.5/39 (28.09), 34 ×3 (02.10, 05.10, 09.10), 39 ×3 (12.10–21.10) |
| Жим сидя на плечи в Смитт | Shoulders | Жим сидя на плечи Смитт | seated shoulder press **in the Smith machine**, not the shoulder-press machine (`Жим на плечи сидя`, whose alias «Жим сидя на плечи» comes without «Смитт»); bar weight 20→30 (25.09, first log), 30 ×3 (09.10) |

Planned-but-skipped so far (crossed out, never logged): Шаги на плечи.

A `+` written between two strength lines marks a superset (05.10: ГАКК +
Отведение, Сгиб. голени + Разгиб. бедра). Log both lines as usual.

## Sections I and III — Warm-up and Crossfit rows

Logged like the strength rows, in the categories Warm-up and Crossfit under
the strength part (backfilled by hand for 20.07–30.10 on 23.11.26; layout and
cell conventions in the README).
Recognition: warm-up lines read `2x15` / `2x40"` (seconds), a single
implement weight in brackets does not make a line strength work; crossfit
lines carry `(x3)` rounds, `12'` time caps, `N cal`, a finish time like
`11'53"`. «Приседания» alone says nothing: the section decides (ГАКК is
section II, the overhead-plate squat section III).

Warm-up rows (canonical = column B):

| Canonical | Aliases seen | Notes |
| --- | --- | --- |
| Dog birds | | 2x15 |
| Бок. планка | Боковая планка, Боковая планка на удерж. | static hold, 2x40" |
| Бок. планка с поворотом | Боковая планка с поворотом | 2x15 reps |
| Удержание резины | Удерж. резины, Удержание резины с колен(а), Резина удержание | 2x40", 2x45" on 12.10 |
| Ягодичный мост | Ягодичной мост | kept apart from the single-leg row until Alex says they are one exercise |
| Ягодичный мост на каждую ногу | на к.н., по 1 ноге | |
| Ягодичный мост + жим гантелями | | 10+10 кг (23.09) |
| Экстензия с контролем осанки | Экстензия, Экстензия (10кг), Экстензия с контролем | 10 kg on 05.10–14.10 |
| Экстензия сидя с гантелью | Экстензия сидя с гант., Экстенсия с гант., Экстензия сидя (10кг) | from 16.10 |
| Махи блином вокруг головы | Махи блином (10кг) | 2x10, 10 kg |
| Plank shoulders touch | | 2x20 |
| Планка со сменой рук | Планка с переменной сменой рук, Планка с перекрёстной сменой рук | 14.10; the letters fit «переменной» (another reading: «перекрёстной»), the neutral row name covers both |
| Планка высокая | | 2x40" |

Crossfit rows: four summary rows first (Combination (crossfit), Rounds,
Time cap / plan, Finish time), then one row per exercise:

| Canonical | Aliases seen | Notes |
| --- | --- | --- |
| Pull-ups | | |
| Thrusters | | 24 → 25 → 20 kg; 02.10 «(10кг)/10» = two 10-kg dumbbells, logged as text `10+10` (agent's call at Alex's request, 23.11.26) |
| Walking lunges | Lunges walking, Lunges (15кг) | 15 kg |
| Выпады | | 10 kg (23.10, 30.10); kept apart from Walking lunges |
| Скакалка | Rope jumps | |
| Dips | Deeps | |
| T2B | | |
| Hand stand push-ups | Hand stand push ups, Отжимания вниз головой, HP | «HP 15» (03.08) is this movement: no weight next to it, and every loaded movement carries one (agent's call at Alex's request, 23.11.26; the separate HP row was removed) |
| Wall ball | Wall-ball | 6 kg |
| Push-ups | | |
| Squats | | 32 / 20 / 16 kg |
| Sumo squats | | 32 kg |
| Burpees | | |
| Box jumps | | |
| Приседания с блином над головой | Присед. с блином над головой | 10 kg plate |
| Sit-ups, Row (cal), Air bike (cal), Канат (sec), Протяжка с приседом, Жим швунговый, Зашагивание на тумбу, Plank dumbbell drag, JJ | | one row each |
