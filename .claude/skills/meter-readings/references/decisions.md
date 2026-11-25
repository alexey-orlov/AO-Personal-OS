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

### Lessons
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

## 2026-11-20: Київгаз added

### Rules from Alex
- Gas readings for Победы; the input format is 5 digits and 2 decimals (`07075.00`).
- His value 7075 was below the cabinet's «Попередні показання» of 7316.00. The history showed that
  value as Київгаз's own estimate («Розрахунок», 31.10.2026), with 6854.00 on 25.01.2026 as the
  last real reading. Shown both, he chose to send 7075 to correct the estimate.

### What the run did
- Typed 07075.00 (difference −241.00) and pressed «Внести. Показання правильні» once. Київгаз
  refused it: «Показання не передавали більше одного місяця. Показання не прийнято! Надішліть,
  будь-ласка, фото лічильника через розділ "Звернення"…». The history was unchanged.

### Lessons
9. A cabinet's "previous reading" can be the provider's own estimate. Show Alex both the newest
   value and the last real reading before deciding.
10. Київгаз refuses a reading when none came in for more than a month. Readings sent every month
    avoid that; after a gap the route is a meter photo through «Звернення».

## 2026-11-23: Смоленская from photos

### Rules from Alex
- The water readings came as two meter photos, the electricity as text («83699,9»).
- Cold 250619461 read 46.678 on the photo, below Водоканал's «Початковий» 50.263. The history
  back to January: the last real reading was 23.99 (period December 2025, entered 25.01.2026);
  January–August 2026 were «Оператор» estimates of 3.284 m³ each (to 50.262); September was a
  «Споживач» 50.263, only 0.001 more (inferred: someone's placeholder against further estimates).
  Shown three options (zero-difference 50.263, a correction request with the photo, or skipping
  the month), Alex chose 50.263 for this month. The next month the meter will still read below
  the cabinet, so the run asks him again; `meters.json` holds the numbers for that question.

### What the run did
- Yasno: 83 217 (ОСР, 12.08.2026) → 83699, 482 kWh. «Показання успішно збережені».
- Водоканал: hot 250046123 0.016 → 0.016 and cold 250619461 50.263 → 50.263, both «Споживач»,
  period «жовтень 2026 (10)».
- Київтеплоенерго: 250046123 0.016 → `00000.0160`, «Дякуємо за внесення показників!», history
  «2026-11-24 · Зараховано · Поточні · ОК абонента». KTE had replaced its May–September
  «Норма (не передача >3 місяців)» bills with 0.016 after a «претензія» on 24.10.2026.

### Lessons
11. A photo is a reading source. Chat thumbnails are small: crop and enlarge the digit window, read
    5 black and 3 red digits, and let the cabinet's previous value confirm an unclear last digit
    (hot 0.016 matched its 24.10 reading).
12. A photo below the cabinet is usually an estimate, not a misread. Open the history back to the
    last «Споживач» value before asking, so the question shows where the gap came from.
13. Водоканал prints times in the browser's timezone and Київтеплоенерго in Kyiv's: with the Mac in
    SF, 23.11 21:47 at Водоканал and 24.11 07:48 at КТЕ were a minute apart.
14. Writing Alex's one-month choice into `meters.json` as a standing "send without asking" rule was
    refused by the permission classifier: a lower-than-previous reading stays his call every month.

## 2026-11-24: Победы, every cabinet ahead of the meter

### Rules from Alex
- The readings came as the tenant's text «Ноябрь 26. Показания: х/в-392, г/в-13, газ-7150,
  эл/эн-33937».
- After ten months of estimates every cabinet except KTE was above the meter. Each meter was shown
  with its last real reading. Alex chose zero-difference readings for both Водоканал meters and for
  Yasno. For gas he asked to retry now and, if refused, to check his appeal and retry on 01.12.
- On Смоленская: «если не приняло снижение — то там тоже нужно было отправить нулевое (равное
  прошлому)». When ОСР's figure has displaced a reading, a zero-difference reading equal to that
  figure goes instead.

### What the run did
- Водоканал: cold 2310504 398.434 → 398.434 and hot 4816600 15.5 → 15.5, both «Споживач», period
  «жовтень 2026 (10)», 24.11.2026 18:37 Pacific.
- Київтеплоенерго: 4816600 13 → `00013.0000`, «Дякуємо за внесення показників!», history
  «2026-11-25 · Зараховано · Поточні · ОК абонента».
- Yasno Победы: 34 061 → 34061 (0), «Показання успішно збережені», listed at once as «Від клієнта
  25 лист 2026».
- Yasno Смоленская: 83 935 → 83935 (0), the same, after Alex's answer above.
- Київгаз: 07150.00 was refused again («не передавали більше одного місяця»). Alex's own appeal
  №218832 had been answered «Виконано… прийнято в обробку». The scheduled task
  `kyivgaz-pobedy-retry-2026-12-01` checks the history and retries on 01.12.

### Lessons
15. After months without readings, every provider at an address can be ahead of the meter at once.
    Read every history first, then ask once: one question per meter, with the last real reading and
    where the gap came from.
16. A hot meter shared by Водоканал and KTE can hold different values in each cabinet. KTE's
    «Контрольне знімання» settles which one is real.
17. Yasno's «Показання успішно збережені» is not the end. ОСР can later book its own figure for the
    1st, and the reading then disappears from the history. The next run checks «Усі показання».
18. Київгаз answers appeals in the notification bell, and the answer can hold tasks for Alex
    (documents for the contract, meter verification). Relay them.
