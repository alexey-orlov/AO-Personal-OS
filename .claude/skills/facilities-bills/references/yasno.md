# Yasno cabinet: provider card

- **Cabinet:** `https://yasno.ua/my/`. The old domain `yasno.com.ua` redirects there.
- **Login:** `https://yasno.ua/pre-login` → «Електроенергія для дому» (phone number + password).
  Only Alex logs in. The session lasts across days in his Chrome.
- **App:** a single-page app (Vite + React Router, stylesheet `/my/assets/index-<hash>.css`, font
  YasnoRaleway Medium/Bold). A cold load of most `/my/` routes lands on `/my/not-found`. Only
  `/my/personal-accounts` and `/my/payments/history?accountId=<id>` load cold. Reach every other
  page inside the app with `__ps.go(path)`.
- **Accounts:** `yasno-accounts.json` holds each account's `account_id` (the app's id) and
  `account_number` (the «Світло …» number on bills). Pass both in the URL, because the account
  selector does not update `accountNumber` in the URL.

## Pages

| Page | Route | Content | How it is printed |
|---|---|---|---|
| Особові рахунки | `/my/personal-accounts` | the accounts list: holder, address, amount due | not printed; used for the preflight check |
| Історія платежів | `/my/payments/history?accountId=<id>` | every payment, newest first, 40 per scroll. Account selector at top right. No year filter | one print per year, with the other years' rows hidden. A4 portrait, 1 page |
| Платіж | `/my/payments/<uuid>`, linked from each history row | amount, date, holder, address, «Світло <number>», «За електроенергію» | A4 portrait, 1 page |
| Абонентська книжка | `/my/account-book?accountId=<id>&accountNumber=<n>` | year tabs (Усі роки, 2026 … 2021). Per month: start and end readings, kWh, charged, paid, balance | one print per year tab. A4 landscape (portrait clips the last two columns), 2 pages |

## Quirks the scripts rely on

- History rows read `9 вер 2026 397.44 ₴`. Months are abbreviated: січ лют бер квіт трав черв лип
  серп вер жовт лист груд. Thousands are separated by a space: `1 395.36 ₴`.
- Each child of the history list (`[class*="_list"] > *`) holds one payment card. The first card
  of each month also holds the month label, so hiding a child hides both.
- The account book's year tab is a `button` whose text is the year. The table shows `<YYYY> рік`
  as its group row.
- The site formats addresses oddly («вул., Антоновича», «буд. 5 1»). Print headers use the clean
  `address` from the JSON instead.
- The site has no print styles (no `@media print`), so a print shows the screen styles at paper
  width, which is the tablet layout.
- Older payments go back to 2021. At 2026-11-18 there were 48 for Антоновича, 69 for Победы and
  57 for Смоленская.

## Folder mapping (Alex, 2026-11-18)

All Yasno files go into `<apartment folder>/Электроэнергия/`, never into the apartment folder
itself.

| Apartment folder | Yasno account address | Note |
|---|---|---|
| Антоновича | вул. Антоновича, буд. 160, к. 16 | |
| Победы | просп. Берестейський, буд. 45, к. 25 | the avenue was formerly Перемоги |
| Смоленская | вул. Сім'ї Бродських, буд. 51, к. 37 | Kyiv renamed Смоленська to Сім'ї Бродських |
