# Київводоканал meters: provider card

- **Page:** `https://my.vodokanal.kiev.ua/dashboard/counters` (Angular + PrimeNG). Alex's Chrome
  session is logged in; on a login page, ask him to log in himself.
- **Window:** no readings from the 1st to the 10th of a month. A blue banner names the month the
  readings will be billed to ("будуть використані в нарахуванні за листопад 2026 року").

## Two views; use the list

| View | What it shows | Use |
|---|---|---|
| **List** | One table with every meter of every account: «Рахунок», «Тип лічильника», «Адреса», «Держ. номер» (serial), «Показник» (Початковий = previous · Поточний = input · Кількість), «Останнє внесення», «Повірка», «Історія». A checkbox per row, one «Надіслати покази» for all ticked rows | **yes** (Alex, 2026-11-19) |
| Circle | One meter at a time: 8 digit boxes (5 + 3) prefilled with the previous reading, «Об'єм», a «ПОДАТИ» per meter, the meter list on the left | no |

«Змінити вид» switches between the two. The page may open in either view (the last one used).

## Meter types

- «Централізоване водопостачання та водовідведення» is the **cold** meter.
- «Централізоване водовідведення (ГВ)» is the **hot** meter: hot water, billed as sewerage only.

## Quirks that matter for a safe submission

- Every row is **ticked by default**, the other addresses' meters included. Pressing «Надіслати
  покази» as the page opens would send every meter, the untouched ones with zero consumption.
- **Any change of the account filter re-ticks all rows**, including ones you unticked; typed values
  survive. Set the selection last, on the unfiltered list. An unticked row's input is disabled.
- **Ticking re-renders the table.** After a click on the header checkbox or a row checkbox the
  extension's element references go stale: look them up again before the next click or typing.
- After a long pause, such as a question to Alex, the tab can fall back to `/dashboard/home`. Open
  `/dashboard/counters` again and paste `scripts/vk_list.js` again.
- The «Поточний» input is prefilled with the previous value (`5`, `398.434`). Real typing of
  `00005.435` is accepted as is, and «Кількість» updates to the difference.
- «Надіслати покази» opens «Підтвердження · Підтверджуєте внесення показу? · Ні / Так». After
  «Так»: the toast «Покази успішно збережені!», «Останнє внесення» becomes today, and «Історія»
  shows a new line «листопад 2026 (11) 5 → 5.435 · 0.435 · <date time> · Споживач» with the full
  precision.
- «Історія» opens a dialog per meter (period, previous, final, quantity, date, source: Споживач,
  Оператор or Розрахунковий) for a selectable period; close it with its header ×. Dialogs stack
  if one is not closed. The period defaults to the last four months in every meter's dialog and does
  not take typing: widen it in the date picker (arrows, the start day, the end day), then press the
  magnifier.
- Dates («Дата введення», «Останнє внесення») print in the browser's timezone, Pacific while the Mac
  is in SF: 23.11.2026 21:47 here was 24.11.2026 07:47 in Kyiv. Київтеплоенерго prints Kyiv time.
- **Estimates.** A period with no reading gets an estimate on the last day of the next month at
  13:59: «Оператор» with an equal monthly amount (the average), or «Розрахунковий». Estimates can
  take «Початковий» above the real meter, and a photo then reads lower than the cabinet. Before
  asking Alex, widen the history back to the last «Споживач» line, so he sees where the gap came
  from. The page's own banner asks for a zero-difference reading when no water was used.

## Accounts and meters

See `meters.json`. On 2026-11-19 Антоновича (1088235) had four meters: cold 220047843 А (кухня)
and 220047865 А (ванная), and hot 220055398 А and 220055399 А, whose rooms were not yet known.
Победы (0251754) and Смоленская (0251689) have one cold and one hot meter each.
