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
- Водоканал, Антоновича, hot: not sent. Both meters (220055398 А, 220055399 А) read 1.000. The
  history does not tell them apart: 220055398 А was entered as 1.6 → 1.7 → 1.8 in August and
  September and reset to 1 by an operator in October; 220055399 А was 1 throughout. Alex was asked
  which one is the kitchen meter.
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
