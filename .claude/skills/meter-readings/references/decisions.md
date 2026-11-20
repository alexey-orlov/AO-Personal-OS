# meter-readings: decisions and lessons

Rationale only; the runtime steps are in `SKILL.md`. Rewrite an entry when it changes.

## 2026-11-19: first run (built by walking the path first, then writing the skill)

### Rules from Alex
- Submitting is outward-facing and cannot be undone: no test or wrong submissions.
- Use Водоканал's «Змінити вид» list view, where all meters are visible and sent as one list,
  not the circle view that sends one meter at a time.
- If an interface no longer matches, find the new way; when in doubt, ask. The same applies to
  `facilities-bills`.
- A new reading lower than the previous one, read from the submission page, goes back to Alex to
  resolve.
- Yasno readings only for Смоленская and Победы; Антоновича is collected automatically.
- His mother sends readings by room: «Гор кухня 1.16 Ванная 1.43 / Хол кухня 2.382 Ванная 5.435».
  Only Антоновича has two meters of a kind; the cabinet shows meters by serial, with readings
  that had been entered rounded to whole numbers.

### What the first run did
- Водоканал, Антоновича, cold: 220047843 А (кухня) 2.000 → 2.382 and 220047865 А (ванная)
  5.000 → 5.435. Sent; «Історія» shows «Споживач», 19.11.2026 06:21. The mapping is forced: the
  other way round, 2.382 would be below the previous 5.000.
- Водоканал, Антоновича, hot: both meters read 1.000 and the history did not tell them apart
  (220055398 А had been entered as 1.6 → 1.8 and reset to 1 by an operator in October;
  220055399 А was 1 throughout). Nothing was sent until Alex settled it. His first answer was
  "398 = кухня"; he then said "wait, I'll check" and corrected it to 220055399 А = кухня,
  220055398 А = ванная. Sent after the correction: 220055399 А 1 → 1.16 and 220055398 А
  1 → 1.43, «Споживач», 19.11.2026 07:46. The lesson: a mapping recalled from memory can be wrong;
  it goes into `meters.json` only once Alex confirms it, and «почекай» stops everything.
- Yasno, Победы: 31 943 → 33427 (1 484 kWh since 25.01.2026). Saved; «Показання успішно
  збережені».

## 2026-11-19: Київтеплоенерго added

### Rules from Alex
- Extend the readings to Київтеплоенерго for all three addresses; test on Антоновича's hot-water
  meters with the values already in hand. The format is the site's own: «для лічильників гарячої
  води: 5 символів до крапки і 4 після».

### What the run did
- Антоновича, sent 2026-11-20 03:22 Kyiv time with real typing:
  - 220055398 (ванная): 1.42 → `00001.4300`.
  - 220055399 (кухня): `00001.1600`. Its «Попередні показання» said 1.03, the last subscriber
    reading. The field held 1.16 from a KTE «Контрольне знімання» dated 01.11.2026, so there was no
    consumption since that inspection.

  The page said «Дякуємо за внесення показників!». Both histories show «Зараховано», «Поточні» and
  «ОК абонента».
- Победы (4816600) and Смоленская (250046123) were only read, not sent: one hot meter each, the
  same physical meters as at Водоканал.

### Lessons
6. The «Попередні показання» column can be older than the latest accepted reading: an inspection
   reading shows only in the prefilled field and in the history. The lower-than-previous check
   takes the highest of the three.
7. KTE's «Місце розташування» labels both Антоновича meters «Сан вузол», so the page cannot settle
   which room a meter is in. The mapping Alex confirmed for Водоканал carries over, because the
   meters are the same.
8. The form has no per-row selection: «Передати показання» sends every row of the account.

## Lessons from the first run
1. The list view starts with every row of every address ticked. Sending at once would have
   submitted all 8 meters, 6 of them with zero consumption.
2. Changing the account filter re-ticks every row, the unticked ones included; typed values
   survive. The selection is therefore set last, on the unfiltered list, and `__vk.send` re-checks
   it in the same call that presses the button.
3. Real typing of `00005.435` works. A value typed by script without a preceding keydown is ignored
   by PrimeNG (seen on the statement pages).
4. «Історія» dialogs stack when one is not closed; a script then reads the first meter's history
   for every meter. Close each dialog through its header ×.
5. Yasno's «Зберегти» takes 3–5 s and lands on a top-up page. Clicking twice risks a duplicate
   submission.
