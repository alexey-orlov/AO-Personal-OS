# Київтеплоенерго statements: provider card

- **Cabinet:** `https://kte.kmda.gov.ua/my-cabinet/userhome_new` («Мої особові рахунки»). Drupal 7,
  server-rendered pages (every page is a full load), Bootstrap 3, jQuery. Alex's Chrome session
  usually stays logged in. When it has expired, the login form shows his password autofilled: the
  agent never presses «Увійти», Alex logs in.
- **Accounts:** `kte-accounts.json`: the 15-digit особовий рахунок plus the cabinet's own id, which is
  what the URLs use. The site writes the addresses as «вул. Бродських Сім`ї (Смоленська), буд. №5/1»
  and «просп. Берестейський (Перемоги), буд. №45»; the JSON copies them as shown.
- **Services (all three accounts):** Постачання гарячої води · Постачання теплової енергії (ЦО) ·
  Плата за абонентське обслуговування ТЕ · Плата за абонентське обслуговування ГВ.

## Pages

| Page | URL | What it shows | Print |
|---|---|---|---|
| Мої особові рахунки | `/my-cabinet/userhome_new` | every account: holder, address, residents, area; per service the Фінансовий стан (Борг in red, Переплата in green) and the Останній платіж | one print per run, filed in every apartment folder: `Київтеплоенерго - Усі адреси - Стан оплат <YYYY-MM-DD>` (2 pages) |
| Звіт про оплати | `/my-cabinet/personal_account/oborot_info_new/<cabinet_id>` | form: Послуга, Період з <month> <year> по <month> <year>, «Сформувати». The table has one row per month, newest first: Стан розрахунків (ПОЧАТОК), Обсяг споживання, Перерахунок, Оплата, Пільга, Субсидія, Стан розрахунків (КІНЕЦЬ). The current month is marked as not final | one per account, service and year, Січень–Грудень: `Київтеплоенерго - <Folder> - Звіт про оплати - <service> <YYYY>` (1 page) |
| Передача показань | `/my-cabinet/send_counters/send_current_new/<cabinet_id>` | see the `meter-readings` skill | – |

«Послуга» select values: 3 Гаряча вода · 5 Теплова енергія · 13 Плата за абонентське обслуговування
ГВ (file name «Абонплата ГВ») · 11 Плата за абонентське обслуговування ТЕ («Абонплата ТЕ»). Values 31
and 34, the ВКО contributions, are not collected. The year select starts at 2018; Антоновича's
hot-water history starts in May 2018.

## How the script drives it (`scripts/kte.js`)

- **One tab, no navigation.** A full page load would wipe the injected script and its queue. The run
  starts on the status page and snaps it first. It then opens each account's report page in a
  same-origin iframe over that page (1280×1000, on screen) and snaps the iframe's document
  (`snap(meta, doc)`). The site sends no X-Frame-Options.
- **The form.** The selects have no handlers, so setting their values is enough. The «Сформувати»
  button is Drupal AJAX bound to **mousedown**, so the script triggers that event.
  `#oborot-tables-wrapper` is then replaced, and jQuery's request counter (`$.active`) going back to 0
  marks the end of the request. A Drupal AJAX error calls `alert()`, which would block the page and
  the extension, so the script replaces `alert` in the frame and reports the message instead.
- **Check before the snap:** the caption reads «Послуга: <service>» and every month row is from the
  year. About 1 s per report after the first.
- **Print with the screen styles** (`media: 'screen'`), A4 portrait, scale 0.65. The site's Bootstrap
  print sheet appends every link's URL to its text, blanks the buttons' labels and turns the red and
  green amounts black. At scale 1 (about 720 px wide) the site falls to its phone layout. At 0.65 it
  is laid out about 1100 px wide, its desktop grid, and a 12-month report fits on one page with the
  site footer; at 0.7 the footer spilled onto a second page.
- **Assets:** the 4 stylesheets (one is 2.4 MB with its fonts), the logo and the service-centre banner
  come through `collectAssets` without trouble.
