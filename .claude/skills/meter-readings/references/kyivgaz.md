# Київгаз gas readings: provider card

- **Meter:** `meters.json` → kyivgaz. Победы, account 5920300061, meter 00205019 (ГАЛЛУС-2000
  G6-4.0(x)). Readings only for Победы, as Alex asked.
- **Page:** `https://cabinet.kyivgaz.ua/indicator` («Показання лічильників») shows the active account.
  Check the account in the top-left corner; the account menu («Мій кабінет») switches it.
- **History:** the «Показання» table with a year select lists Місяць, Лічильник, Показання, Дата and
  Походження. The origin is «Особ. кабінет» for a reading sent through the cabinet and
  «Розрахунок» for Київгаз's own estimate. Since 25.01.2026 (6854.00, «Особ. кабінет») every
  month has been an estimate, up to 7316.00 on 31.10.2026.
- **The form:** «Внести показання» opens a dialog. «Попередні показання» shows the newest value,
  even when it is an estimate. «Поточні показання» is 7 digit boxes, 5 + 2 (`07075.00`),
  prefilled with the previous value, each with ˄/˅ arrows. A triple-click on a box and a typed
  digit sets it. «Об'єм(різниця)» recalculates, and «Внести. Показання правильні» sends.
- **Previous reading:** show Alex both the newest value and the last reading whose origin is not
  «Розрахунок». A value below an estimate is plausible, because the estimate can overshoot, but it
  still goes to Alex first.
- **When:** «передавайте показання лічильників з 1 по 3 число кожного місяця»; «несвоєчасно передані
  показання враховуються в наступному місяці».
- **Refusal (20.11 and 24.11.2026):** «Показання не передавали більше одного місяця. Показання не
  прийнято! Надішліть, будь-ласка, фото лічильника через розділ "Звернення" для перевірки та внесення
  показань.» Nothing is recorded then. The way back is a meter photo filed through «Звернення»
  (`/message`): only Alex can supply the photo, and filing it is a message on his behalf, so it
  needs his yes.
- **Appeals:** `/message` lists them by Тема, Зміст and Дата, without a status. The status and the
  answer arrive as notifications in the bell (links whose text holds the appeal number). Alex's
  №218832 (23.11.2026, photo, 07150.946) was answered on 24.11: «Виконано… Показання лічильника
  прийнято в обробку». The answer also asked for a reading every month on the 1st–3rd, even with no
  use. It said the address lacks a signed «заява-приєднання» to the distribution contract (the
  owner's documents, one PDF through «Звернення та документи»). It also said the meter is due for
  verification, to be booked through the contact centre.
