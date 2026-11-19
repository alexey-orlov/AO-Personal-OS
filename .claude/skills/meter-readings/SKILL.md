---
name: meter-readings
description: Submit Alex's utility meter readings in the providers' web cabinets. Two providers so far. Київводоканал (water) has hot and cold meters at Антоновича, Победы and Смоленская. Yasno (electricity) is submitted only for Победы and Смоленская, because Антоновича is read remotely. The skill parses the readings as Alex or his mother sends them (e.g. "Гор кухня 1.16 Ванная 1.43 / Хол кухня 2.382 Ванная 5.435"), maps each one to its meter, checks every value against the previous reading shown on the submission page, submits through Alex's logged-in Chrome session and verifies that the provider stored the value. It never sends a value it is not sure of. Use on /meter-readings, "передай показания", "внеси показники", "подай показания счётчиков", "submit the meter readings", "показания от мамы: …", or when Alex pastes readings for water or electricity.
disable-model-invocation: false
user-invocable: true
---

# Meter readings → Водоканал and Yasno

The meters, their accounts and which room each one is in are listed in `references/meters.json`.
Each provider's page and its quirks are in `references/vodokanal.md` and `references/yasno.md`. The
reasons behind the rules are in `references/decisions.md`. Payment history and statements are a
separate skill: `facilities-bills`.

## Hard rules (Alex, 2026-11-19)

- **Never send test or wrong data.** These are submissions to an external provider and cannot be
  undone. Send only values Alex (or his mother, via Alex) gave for this period, and only to a meter
  whose mapping is certain. A meter whose `room` is `null` in `meters.json` is never sent: ask Alex.
- **New must not be lower than previous.** Read the previous value on the submission page itself
  (Водоканал: «Початковий»; Yasno: «Попередні»). If a new value is lower, do not send that meter;
  show Alex both numbers and let him resolve it.
- **Never type a password or OTP, and never solve a captcha.** On a login page, ask Alex to log in.
- **Use the views and paths written here.** Водоканал: the list view (all meters in one table, one
  «Надіслати покази»), never the circle view that submits one meter at a time. If the interface no
  longer matches the provider card (buttons, columns or dialogs changed), stop and look for the new
  way. When in doubt, ask Alex before anything is sent.
- **Pay nothing.** Yasno shows a top-up page after saving. Close it.

## Run

1. **Parse.** Turn the message into one line per meter: address, provider, kind (гор/хол), room,
   value. Water values go in the 5+3 digit format: `1.16` → `00001.160`, `5.435` → `00005.435`.
   Map each line through `meters.json`. If anything stays unmapped, ask before going on.
2. **Check the window.** Водоканал takes no readings from the 1st to the 10th of the month. Yasno
   advises the last two days of a month or the first three of the next; say so if today is outside
   that, but it does not block a submission.
3. **Open and read, without sending yet.** Use the Chrome extension in your own tab.
   - Водоканал: open `/dashboard/counters`. If `__vk.view()` says `circle`, click «Змінити вид»
     once. Paste `scripts/vk_list.js` and read `__vk.state()`.
   - Yasno: open `/my/personal-accounts?accountId=<id>`, click «Передати показання» and read
     «Попередні».
4. **Validate and show the table.** Show Alex one row per meter: previous, new and consumption.
   - A new value below the previous one stops that meter: ask Alex.
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
        value, today's date and «Споживач».

     Changing the filter re-ticks every row, so never filter after setting the selection.
   - **Yasno.** Type the value into «Показання» and check that «Спожито» is the expected
     difference. Then press «Зберегти» once and wait: the button spins for a few seconds. The page
     must say «Показання успішно збережені».
6. **Report** each meter: previous → new (consumption) and the provider's confirmation, plus
   anything not sent and why. Close your tabs.
