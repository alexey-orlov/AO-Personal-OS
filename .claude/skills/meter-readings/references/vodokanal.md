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
- The «Поточний» input is prefilled with the previous value (`5`, `398.434`). Real typing of
  `00005.435` is accepted as is, and «Кількість» updates to the difference.
- «Надіслати покази» opens «Підтвердження · Підтверджуєте внесення показу? · Ні / Так». After
  «Так»: the toast «Покази успішно збережені!», «Останнє внесення» becomes today, and «Історія»
  shows a new line «листопад 2026 (11) 5 → 5.435 · 0.435 · <date time> · Споживач» with the full
  precision.
- «Історія» opens a dialog per meter (period, previous, final, quantity, date, source: Споживач,
  Оператор or Розрахунковий) for a selectable period; close it with its header ×. Dialogs stack
  if one is not closed.

## Accounts and meters

See `meters.json`. On 2026-11-19 Антоновича (1088235) had four meters: cold 220047843 А (кухня)
and 220047865 А (ванная), and hot 220055398 А and 220055399 А, whose rooms were not yet known.
Победы (0251754) and Смоленская (0251689) have one cold and one hot meter each.
