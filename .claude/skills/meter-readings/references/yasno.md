# Yasno electricity readings: provider card

- **Accounts:** `meters.json` → yasno. Submit only for Победы (326798) and Смоленская (326797).
  Both are single-zone, «4.32 ₴ за кВт·год», so each takes one value. Антоновича (two-zone,
  день/ніч) is read remotely by the distribution operator; do not submit it.
- **Path:** `https://yasno.ua/my/personal-accounts?accountId=<id>` selects the account, even on a
  fresh page load. Check the card's name and «Світло <number>», then click «Передати показання».
  That opens `/my/metering/create?accountId=<id>` with:
  - «Нові» → one input «Показання» (`name="AllTime"`, a number);
  - «Попередні» → the previous reading (Победы on 2026-11-19: 31 943, from 25.01.2026);
  - «Спожито» and «Всього спожито, кВт·год» → recomputed as you type;
  - «Зберегти».
- **After «Зберегти»:** the button spins for 3–5 s, so do not click it again. Then
  `/my/metering/top-up-balance` says «Показання успішно збережені» and offers a top-up («Перейти
  до оплати»). Never pay; close or leave the page. The balance updates once the distribution
  operator confirms the reading.
- **Advice on the form:** submit in the last two days of a month or the first three of the next
  for accurate billing. It is advice, not a block; mention it when today is outside that window.
