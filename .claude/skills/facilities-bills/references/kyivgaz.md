# Київгаз statements: provider card

- **Cabinet:** `https://cabinet.kyivgaz.ua` (server-rendered pages, jQuery, Bootstrap 4). Alex's
  Chrome session usually stays logged in; on a login page, Alex logs in.
- **Accounts:** `kyivgaz-accounts.json`. One login holds both Победы (5920300061, «Перемоги 45 кв 25»)
  and Смоленская (1000604991, «Смоленська 5/1 кв 37»). The cabinet shows one account at a time,
  the "active" one in the top-left corner. The account menu («Мій кабінет») switches it with GET
  `/change-active-account/<id>`, which changes the cabinet's state for Alex too, so a run switches
  back at the end.
- Київгаз is the gas *distribution* operator. Its bill is a fixed monthly volume (Об'єм, a twelfth
  of the yearly capacity) at the distribution tariff, so it does not move with the meter. The
  building's ТО ВБСГ (gas equipment maintenance) is billed on the same page.

## The page: «Рахунки та оплати» (`/accrual-and-payment`)

| Card | What it shows |
|---|---|
| Рахунки + year select `filter[year]` (2015 onward) | one row per month, newest first: На початок, Об'єм, Тариф, Нараховано, Сплачено, Пеня, До сплати, and an icon for the month's bill PDF |
| Оплати (next to it) | that year's payments: date, amount, bank, status |
| Рахунки за ТО ВБСГ багатоквартирного будинку + year select `filter[toVbsgYear]` (2024 onward) | per month: Нараховано, bill icon |
| Оплати (next to it) | ТО ВБСГ payments, or «Немає результатів» |

The top bar shows the tariff, the meter's «Попередні показання» and «До сплати». Each year select
is a plain GET form (`onchange="this.form.submit()"`) that carries the other select's value as a
hidden field, so a year is a page load: `/accrual-and-payment?...&filter[year]=Y&filter[toVbsgYear]=Y`.
Before 2024 the ТО ВБСГ card cannot show the same year.

Print: one PDF per account and year, `Київгаз - <Folder> - Рахунки та оплати <YYYY>`, one A4 page.

## How the script drives it (`scripts/kyivgaz.js`)

- **One tab, one frame.** Switching the account and loading each year happen inside a same-origin
  iframe (`frame()`); the script checks the top-left account and the year select before every snap,
  and switches back to the account that was active at the start.
- **Print settings:** A4 portrait, scale 0.55, screen styles, and `fixed: 'absolute'`. The top bar
  and the side menu are `position: fixed`, and in the flow they would push the content down a
  page. The two card columns appear only at the xl breakpoint (≥ 1200 px). Print media queries
  see 718 px ÷ scale, the portrait width, in either orientation (lesson 24 in `decisions.md`), so
  the scale must stay below 0.6. At 0.55 the page is about 1305 px wide and fits on one page.
- **Assets:** 2 stylesheets and the logos come through `collectAssets` without trouble.
