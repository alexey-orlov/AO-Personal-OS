# Київводоканал statements: provider card

- **Cabinet:** `https://my.vodokanal.kiev.ua/dashboard/invoices`. An Angular + PrimeNG app with
  `<base href="/">`. Alex's Chrome session stays logged in.
- **Tabs:** «Абон книжка» (`/dashboard/invoices`) · «Здійснені платежі» (`/dashboard/payments`) ·
  «Надавачі послуг» · «Лічильники» (`/dashboard/counters`, see the `meter-readings` skill) ·
  «Оплатити послуги».
- **Accounts:** `vodokanal-accounts.json`. Alex's mapping of 2026-11-18: 1088235 → Антоновича,
  0251754 → Победы, 0251689 → Смоленская. The site prints the Смоленская building as «буд. 5/1».

## Pages (both are statements: filter by account and period, then press search)

| Page | Filters | Table | Print |
|---|---|---|---|
| Абонентська книжка | provider (all) · account (`p-dropdown`, label «По всіх рахунках» or the 7-digit number) · **month-range** picker | per month and service (3 services): borg at month start, charged, benefits, subsidies, paid, borg at month end; «Разом за <місяць>», «Разом за період» | one per account and year, Січень–Грудень. A4 landscape at **scale 0.6** |
| Здійснені платежі | provider · account · bank (all) · **day-range** field `dd.mm.yyyy - dd.mm.yyyy` | account, service, date, bank, recipient, amount; «Разом: N грн.» | one per account and year, 01.01–31.12. A4 landscape at scale 0.6 |

No pagination. An empty period shows «Немає даних.» and «Разом: 0 грн.». The 2026 «Оплачено»
total of the account book equalled the 2026 payments total (Антоновича: 664.31).

## How the script drives it (`scripts/vodokanal.js`)

- **Account:** open the dropdown, click the item whose text is the number, and wait for the label.
  A closing panel lingers in the DOM, so wait for old panels to go, use this dropdown's own panel
  and try twice.
- **Month range:** the calendar trigger opens a month picker. Step `.p-datepicker-prev/next` to the
  year, then click Січ and Гру.
- **Day range:** a typed value is ignored unless a keydown came first, so dispatch a keydown, set
  the value, then dispatch `input`.
- **Closing the picker:** an open picker eats the next click. Close it with its trigger button;
  Escape and outside clicks from script do nothing.
- **Search:** the search button is `button.p-fluid-button`; it has no `.pi-search` icon on one of
  the pages. After the click, wait for the request to finish (XHR/fetch counted), then check that
  every row is this account's and this year's.
- **Leave out of the print:** `.chat-bot-block` (the chat bubble), `.p-toast` and open pickers or
  panels.
- **Scale 0.6:** at A4 width the site switches to its mobile layout and the table loses columns.
  The print dialog's 60 % keeps the desktop layout.
- **Assets:** the server answers 403 to anything but the browser session, the logo included. The
  stylesheets, the icon font and the logo are fetched in the page (`collectAssets`) and shipped in
  the bundle.
