---
name: meter-readings
description: Submit Alex's utility meter readings in the providers' web cabinets. Four providers so far. Київводоканал (water) has hot and cold meters at Антоновича, Победы and Смоленская. Київтеплоенерго (heating of the hot water) takes the same hot-water readings at all three addresses. Yasno (electricity) is submitted only for Победы and Смоленская, because Антоновича is read remotely. Київгаз (gas) is submitted for Победы. The skill parses the readings as Alex or his mother sends them (e.g. "Гор кухня 1.16 Ванная 1.43 / Хол кухня 2.382 Ванная 5.435"), maps each one to its meter, checks every value against the previous reading shown on the submission page, submits through Alex's logged-in Chrome session and verifies that the provider stored the value. It never sends a value it is not sure of. Use on /meter-readings, "передай показания", "внеси показники", "подай показания счётчиков", "submit the meter readings", "показания от мамы: …", "внеси газ", or when Alex pastes readings for water, electricity or gas.
disable-model-invocation: false
user-invocable: true
---

# Meter readings → Водоканал, Київтеплоенерго, Yasno and Київгаз

The meters, their accounts and which room each one is in are listed in `references/meters.json`.
Each provider's page and its quirks are in `references/vodokanal.md`, `references/kte.md`,
`references/yasno.md` and `references/kyivgaz.md`. The reasons behind the rules are in `references/decisions.md`. Payment
history and statements are a separate skill: `facilities-bills`.

## Hard rules (Alex, 2026-11-19)

- **Never send test or wrong data.** These are submissions to an external provider and cannot be
  undone. Send only values Alex (or his mother, via Alex) gave for this period, and only to a meter
  whose mapping is certain. A meter whose `room` is `null` in `meters.json` is never sent: ask Alex.
- **New must not be lower than previous.** Read the previous value on the submission page itself
  (Водоканал: «Початковий»; Київтеплоенерго: the highest of «Попередні показання», the field's
  prefilled value and the meter history's newest line; Yasno: «Попередні», which can be ОСР's own
  figure for the 1st; Київгаз: «Попередні
  показання», which can be Київгаз's own estimate, together with the last real reading in the
  history). If a new value is lower, do not send that meter; show Alex the numbers and let him
  resolve it.
- **Never type a password or OTP, never press a login button over a password Chrome autofilled,
  and never solve a captcha.** This holds although Alex has said he allows it (2026-11-20): it is the
  agent's own rule. Ask Alex once, up front, to log in where needed (step 3).
- **Use the views and paths written here.** Водоканал: the list view (all meters in one table, one
  «Надіслати покази»), never the circle view that submits one meter at a time. If the interface no
  longer matches the provider card (buttons, columns or dialogs changed), stop and look for the new
  way. When in doubt, ask Alex before anything is sent.
- **Pay nothing.** Yasno shows a top-up page after saving. Close it.

## Run

1. **Parse.** Turn the message into one line per meter: address, provider, kind (гор/хол), room,
   value. Water values go to Водоканал in the 5+3 digit format: `1.16` → `00001.160`, `5.435` →
   `00005.435`. A hot-water value also goes to Київтеплоенерго (the same physical meter) in the 5+4
   format: `1.16` → `00001.1600`. Gas goes to Київгаз as 5 + 2 digits: `7075` → `07075.00`.
   Electricity goes to Yasno in whole kWh: `83699,9` → `83699`. A photo of a water meter reads as 5
   black digits (m³) and 3 red ones (litres), a rolling digit as the lower one; enlarge a small photo
   with `magick <img> -crop WxH+X+Y +repage -resize 500% -channel G -separate -auto-level <out>` and
   match the serial printed on the dial. Map each line through `meters.json`. If anything stays
   unmapped, ask before going on.
2. **Check the window.** Водоканал takes no readings from the 1st to the 10th of the month.
   Київтеплоенерго asks for the last week of the month. Yasno advises the last two days of a month
   or the first three of the next. Київгаз asks for the 1st to the 3rd and counts a late reading in
   the next month. Say so when today is outside a provider's advice; only Водоканал's rule blocks a
   submission.
3. **Open and read, without sending yet.** Use the Chrome extension in your own tabs. First open
   every cabinet this run needs; if any shows a login page, ask Alex once to log in to all of those.
   - Водоканал: open `/dashboard/counters`. If `__vk.view()` says `circle`, click «Змінити вид»
     once. Paste `scripts/vk_list.js` and read `__vk.state()`.
   - Київтеплоенерго: open `/my-cabinet/send_counters/send_current_new/<cabinet_id>`. Read each row's
     «Попередні показання» and its field's value, then the newest line of each meter's «Історія
     лічильника».
   - Yasno: open `/my/personal-accounts?accountId=<id>`, click «Передати показання» and read
     «Попередні». Open «Усі показання» too (`/my/metering?accountId=<id>`, toggle «Усі»): the
     reading sent last time must still be listed «Від клієнта». If ОСР's figure replaced it, tell Alex.
   - Київгаз: open `https://cabinet.kyivgaz.ua/indicator` and check the account in the top-left
     corner. Read the history: the newest value and the last one whose origin is not «Розрахунок».
4. **Validate and show the table.** Show Alex one row per meter: previous, new and consumption.
   - A new value below the previous one stops that meter: ask Alex. Show where the gap came from
     (the last real reading and the provider's estimates since) and offer a zero-difference reading,
     equal to the previous value, as the first option: Alex chose it for water on 2026-11-23 and for
     water and electricity on 2026-11-24. It stays his call every month.
   - A consumption that looks implausible (several times the usual monthly amount) also gets asked
     about first.
   - If Alex's message already said to submit and every check passes, go on. Otherwise ask once.
5. **Submit.**
   - **Водоканал.** All of it happens in the final, unfiltered list:
     1. Click the header checkbox to untick every row.
     2. Tick only the rows being sent, and type each value with a real triple-click and typing.
     3. Run `await __vk.send({serial: value, …})`. It checks the selection, presses «Надіслати
        покази» only if that check passes, and returns the confirmation dialog.
     4. Click «Так» with a real click.
     5. Run `await __vk.verify([serials])`. Each meter's newest history line must show the new
        value, today's date in the Mac's timezone (not Kyiv's) and «Споживач».

     Changing the filter re-ticks every row, so never filter after setting the selection.
   - **Київтеплоенерго.** One «Передати показання» sends every row of the account, so send only when
     each meter of the account has its new value.
     1. Type each value with a real triple-click and typing, in the 5+4 format.
     2. Check that every field reads back exactly as intended.
     3. Press «Передати показання» once. The page must say «Дякуємо за внесення показників!».
     4. Open each meter's history. The newest line must show the new value, today's date (Kyiv
        time), «Зараховано» and «ОК абонента».
   - **Київгаз.** Click «Внести показання». In «Поточні показання», triple-click each digit box that
     changes and type its digit. Check that the boxes read the value and that «Об'єм(різниця)» is the
     expected difference. Then press «Внести. Показання правильні» once. A red message under the
     field means the reading was refused: read it, close the dialog, check the history and tell
     Alex. Accepted, the history gets a new line with today's date and «Особ. кабінет».
   - **Yasno.** Type the value into «Показання» and check that «Спожито» is the expected
     difference. Then press «Зберегти» once and wait: the button spins for a few seconds. The page
     must say «Показання успішно збережені», and «Усі показання» must list the value as «Від
     клієнта» with today's date.
6. **Report** each meter: previous → new (consumption) and the provider's confirmation, plus
   anything not sent and why. Close your tabs.
