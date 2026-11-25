# Yasno electricity readings: provider card

- **Accounts:** `meters.json` → yasno. Submit only for Победы (326798) and Смоленская (326797).
  Both are single-zone, «4.32 ₴ за кВт·год», so each takes one value. Антоновича (two-zone,
  день/ніч) is read remotely by the distribution operator; do not submit it.
- **Path:** `https://yasno.ua/my/personal-accounts?accountId=<id>` selects the account, even on a
  fresh page load. Check the card's name and «Світло <number>», then click «Передати показання».
  That opens `/my/metering/create?accountId=<id>` with:
  - «Нові» → one input «Показання» (`name="AllTime"`, a number), filled in whole kWh: the meter's
    digit after the comma is not reported (`83699,9` → `83699`), and ОСР's own readings are whole;
  - «Попередні» → the previous reading (Победы on 2026-11-19: 31 943, from 25.01.2026);
  - «Спожито» and «Всього спожито, кВт·год» → recomputed as you type;
  - «Зберегти».
- **After «Зберегти»:** the button spins for 3–5 s, so do not click it again. Then
  `/my/metering/top-up-balance` says «Показання успішно збережені» and offers a top-up («Перейти
  до оплати»). Never pay; close or leave the page. The balance updates once the distribution
  operator confirms the reading.
- **History:** «Усі показання» (`/my/metering?accountId=<id>`) has a toggle «Тільки враховані» /
  «Усі». Each line gives the month, the source and the kWh: «Від клієнта · Особистий кабінет
  YASNO», «Від ОСР · Зчитування контролера» (a reading the distribution operator took) or plain «Від
  ОСР». «Не враховані» marks a reading that was not counted. A reading saved through the form shows
  at once as «Від клієнта <date>».
- **ОСР's figure for the 1st:** around 24.11.2026 ОСР booked plain «Від ОСР» figures for 01.11.2026 on
  both accounts (Победы 34 061, Смоленская 83 935), above the real meters (inferred: estimates). The
  readings sent earlier that month (Победы 33427 on 19.11, Смоленская 83699 on 23.11) then vanished
  from the history, not even listed as «Не враховані». «Попередні» shows that figure, and the form
  still saves a lower value («Спожито» goes negative). On 2026-11-24 Alex chose zero-difference
  readings equal to the ОСР figure for both accounts.
- **Advice on the form:** submit in the last two days of a month or the first three of the next
  for accurate billing. It is advice, not a block; mention it when today is outside that window.
