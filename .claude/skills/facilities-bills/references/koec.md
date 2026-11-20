# Київобленерго statements: provider card

- **Cabinet:** `https://ok.koec.com.ua/home/` of ТОВ «Київська обласна ЕК» (brand ONDO), the electricity
  supplier for the Чубинское house. Rails with jQuery UJS. The session expires after a while ("через
  тривалу відсутність звернення до сервера"), and then Alex logs in.
- **Account:** `koec-accounts.json`: 000400843314, «Чубинське, вул. Садово-Дачна буд.1/_13», holder
  Орлова Тетяна Володимирівна. The same login also holds 000401027917, which Alex did not ask for.
- **Choosing the account:** after login the cabinet asks to «Оберіть особовий рахунок»; loading
  `account_path` (`/home/accounts/145119`) makes 000400843314 the working account. The top bar then
  shows «№ 000400843314» (`.user_abcode`).
- **Frames are forbidden:** `frame-ancestors 'none'`, even from the site's own pages. So the run
  happens in the page itself.

## Pages

| Page | URL | What it shows | Saved as |
|---|---|---|---|
| Історія платежів | `/home/payments` | year tabs (2023 onward); a table of that year's payments (Дата оплати, Дата надходження, Сума, Спосіб оплати, Призначення, Банк; «Всього: N шт.»); a monthly chart «Платежі за YYYY рік» and a chart by year | page print per year: `Київобленерго - Чубинское - Історія платежів <YYYY>` |
| Довідка про розрахунки | `/home/state` | per month: Борг на початок, Сплачено, Нараховано (кількість, грн), Борг на кінець, and «Вхідне сальдо на 01.01.YYYY». Alex treats it as the cabinet's «абонентська книжка» | the site's own PDF per year, `/home/state.pdf?f[year]=YYYY`: `Київобленерго - Чубинское - Довідка про розрахунки <YYYY>` |

## How the script drives it (`scripts/koec.js`)

- **Year tabs** (`a.payment_year_YYYY`) are remote links: a click loads the year by AJAX and changes
  the address with pushState, so the script survives. Click only after the first load has finished;
  an earlier click is lost. The year is loaded when the tab shows as the current one
  (`span.current-year`), «Завантажую…» is gone, the table's group row reads the year and the
  chart title says «за YYYY рік». The run polls for this, because the loading text is hidden by a
  style change that a DOM-mutation wait does not see.
- **Non-breaking spaces:** «№ 000400843314» and «за 2025 рік» are written with U+00A0; compare
  normalized text.
- **The «Довідка» PDF** is fetched in the page with the session cookie (`fetchFile`) and travels in
  the bundle unchanged, so Alex never confirms a save. It is about 12 KB, one page.
- **Print:** A4 portrait, scale 0.55, screen styles, `fixed: 'absolute'` (fixed top bar
  `#meta-nav` and side menu `#sidebar-nav`). The «go to top» button is removed. Highcharts 4.1.9
  draws its SVGs at the screen's pixel width with no viewBox. The script adds a viewBox before the
  snapshot, and the extra CSS shrinks the charts to the printed column; without it the monthly
  chart was cut off on the right.
- **Assets:** the site's stylesheet and the Google Fonts one; the Google sheet is fetched by the
  renderer.
