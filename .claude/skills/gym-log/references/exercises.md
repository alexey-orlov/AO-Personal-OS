# Exercise registry — canonical names, aliases, categories

Canonical name = exactly what's in column B of the sheet (Alex's own RU
wording). Matching is the agent's job; `gym_sheet.py` only does exact
(normalized) lookup. Add a row for every new exercise; add aliases as new
spellings show up in the notes. Categories are EN muscle groups.

**Reconcile both directions against `dump`, every run.** A row that exists in
the sheet but not here means an earlier session skipped step 8 — register it
in the same pass, don't treat it as a new exercise and don't create a second
row for it (14.09.26: `Жим ногами сидя` had been in the sheet since 14.08
unregistered, and the old `Жим L 45°` note still claimed a leg press had
never appeared).

## Strength exercises (section II — the only logged part)

| Canonical (sheet row) | Category | Aliases / variants seen | Notes, stack hints |
| --- | --- | --- | --- |
| Жим лёжа | Chest | Жим лежа, Жим лёжа в тренажере | chest-press machine; 70 (20.07), 60→80 (31.07, last set 80×6), 75 4×8 (03.08) |
| Жим сидя | Chest | | seated chest press machine; 70 (20.07), 60→70 (31.07), 70 (03.08) |
| Сведение рук | Chest | Сведение, Сведение рук перед собой | pec fly machine; 7-kg tiles 45/52/59/66/73 **plus a fine-tune add-on** — 68.3 (31.07), 66→68.5 (03.08); non-tile decimals are real, not a misread |
| Жим в брусьях сидя | Chest | | seated dip / chest-press-in-bars machine; 63.5 (31.07, 03.08). Filed under Chest as part of the push day — no Arms category in the sheet yet |
| Жим 45° (Смитт) | Chest | Жим ∠45° (Смитт), Жим L 45° (смитт) | Incline 45° press **in the Smith machine** — a different machine from `Жим L 45°`, so its own row (Alex, 03.08.26). Bar weight, not a stack: 50→40 (03.08, started too heavy and dropped) |
| Верт. тяга | Back | Вертикальная тяга, Тяга верт., Тяга вертикального блока | lat pulldown; 52→62 (2026-07); grip variants share this row with the grip noted in the report — «шир. хват» 52-59-59 (29.07) |
| Горизонт. тяга | Back | Горизонтальная тяга, Тяга горизонт. блока | seated row; 45→59 (2026-07); 7-kg tiles 45/52/59 |
| Тяга верт. одной рукой | Back | Тяга одной рукой, Тяга верт. бл. одной рукой | single-arm pulldown; 36→45 |
| Пулловер с колен | Back | Пулловер, Пуловер с колен | kneeling pullover; 36→45; stack 36/41/45 |
| Тяга в упоре | Back | | chest-supported row, plate-loaded; 25→35 (29.07) |
| Сгиб. на бицепс | Back | Сгибание на бицепс | biceps curl; 7-kg tiles 45/52. Filed under Back as part of the pull day — no Arms category in the sheet yet (same precedent as Жим в брусьях сидя → Chest) |
| Жим L 45° | Chest | Жим ∠45°, Жим 45° | **Seated 45° press with the ARMS, not a leg press** (Alex, 31.07.26 — applies to every past entry too). The notebook glyph is the angle symbol `∠`, not an "L for legs". 30→40 (20.07), 40→45 (31.07). Sheet row moved into the Chest group on 03.08.26 (merge boundary shifted; `log` matches by name only and never moves rows). A real leg press did appear on 14.08.26 as its own row, `Жим ногами сидя` |
| ГАКК присед | Legs | ГАКК приседания, Гакк | hack squat; plate-loaded, 75→120 |
| Жим ногами сидя | Legs | Жим ногами | seated leg press, plate-loaded; 95/104/113 — even ~9-kg steps; 95→113 (14.08 and 14.09, identical). The "real leg press" the `Жим L 45°` row warned about — NOT the same machine as either 45° press |
| Разгиб. голени | Legs | Разгибание голени | leg extension; 7-kg tiles 52/59/66/73 |
| Сгиб. голени | Legs | Сгибание голени | leg curl; 59/66 tiles **plus a fine-tune add-on** at the top — 63 (24.07), 64→68 (14.08), 59→68.5 (14.09); non-tile decimals are real, same as Сведение рук |
| Разгиб. бедра в упоре | Glutes | Разгибание бедра | kickback; half-tiles: 22.5/27.5/29.5 |
| Жим на плечи сидя | Shoulders | Жим сидя на плечи | shoulder press machine; stack 36/41/45 |
| Махи на плечи | Shoulders | Махи, Махи на плечи в тренаж. | lateral-raise machine; tiles 32/36/39/41 (fine steps at top); 32→36 (24.07), 36→39 (14.08), 39→41 (14.09) — rising every session |
| Реверс | Shoulders | Реверс (обратное сведение) | reverse fly — the `Сведение рук` machine run backwards, so it shares that 7-kg tile ladder (45/52/59/66/73); 59/59/59 (14.09, first log). Filed under **Shoulders**, not Chest: it loads the rear delts and it sits in the shoulder block of the page. Planned-and-crossed-out for months before its first real log |
| Протяжка к ключицам | Shoulders | Протяжка | upright row to the clavicles, stack machine; 7-kg tiles, 45/45/45 (14.09, first log). **Not** the crossfit `Протяжка с приседом` (section III, bodyweight/light) — different exercise, different section |

Planned-but-skipped so far (crossed out, never logged): Шаги на плечи.
«Реверс» graduated to a real row on 14.09.26 — a crossed-out name can come
back later, so never delete its registry row, just move it out of this list.

## Not logged — section recognition vocabulary

Warm-up (section I): Dog birds, Бок. планка / Боковая планка, Удержание
резины / Удерж. резины, Ягодичный мост. Format: `2x15`, `2x40"` (seconds).

Crossfit closing (section III): Thrusters (20-24кг), T2B, Sit-ups, Скакалка,
Канат, Row (N cal), Pull-ups, Lunges, Walking Lunges (15кг), Burpees, Squats,
Протяжка с приседом, Hand stand push-ups, Wall-ball. Markers: `(x3)` rounds, `12'` time cap, boxed finish
time like `11'53"` / `8'01"`.
