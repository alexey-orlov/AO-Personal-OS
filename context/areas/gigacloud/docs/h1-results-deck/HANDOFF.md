# Half-year product results deck — handoff

_Rewritten 2026-11-10 on Alex's MacBook Air, when v2 was delivered (v2 = his feedback on v1). Read fully before touching the deck._

⛔ GigaCloud = internal-only area. The deck is internal; nothing from it goes into external-facing artifacts.

## The deck

| Deck | State | Live copy (Alex hand-edits it — living-documents rule) | In this repo |
|---|---|---|---|
| **Розвиток продуктів** — `GigaCloud_Product Results H1_10-NOV-2026 (v2).pptx`: the product team's half-year achievements and plans, for Alex's 15-minute talk | v2, 24 slides, UA (2026-11-10); v1 (25 slides) kept beside it | MacBook Air: `~/Desktop/GigaCloud/` | **not committed** (internal commercial detail: vendor contract dates, margin model, a CRM screenshot) |

**Deck map (v2)**, as the brief orders it:
1. Cover «Розвиток продуктів · Досягнення за півріччя і плани · Листопад 2026».
2. «Загальна стратегія 2026»: the Miro goal tree as a nested table — pillars GTM and Business efficiency, blocks IaaS / Resell / Services, seven goals with «Мета» and «Що робимо», an icon on every pillar, block and goal. IaaS order per the brief: cost-ефективність → диверсифікація → розвиток продуктів на запит ринку і sales enablement (the last merges two Miro leaves).
3. Section «IaaS» (red full-bleed, a "you are here" strip of the three sections).
4. «Три цілі IaaS»: three buckets, each an icon, the goal and a one-line purpose — no item lists (Alex, v2).
5–8. Cost-ефективність: Гнучкі конфігурації заліза · Private Cloud on OpenStack · Advanced Memory Tiering · «Що далі».
9–11. Стратегічна диверсифікація: Private Cloud on OpenStack і Azure Local · Модель VCFaaS · «Що далі».
12–15. Розвиток продуктів: Public S3 Storage · Ціни під квоту і складські ціни · Продукти для держзамовників · «Що далі».
16. Section «Resell + Prof Services».
17–20. Ресел Microsoft Azure і AWS · Ціни в USD для ліцензій · Security Authorization Services · «Що далі».
21. Section «Business efficiency».
22–24. Аналіз причин програних угод · Оновлений PLM: публікація продуктів (with the CRM checklist screenshot) · Реальна маржинальність продуктів.

No closing slide (Alex, v2).

**Sources:** the brief (Google Doc «Бріф», id `1UO0z-rR-pOgV1WqFuaQPTP1vsmGIGayI4qGGmUz27zM`, with the Miro goal tree), and `~/Documents/GigaCloud context/` on the MacBook Air: Product Catalog Updates Feb–May and Jun–Aug 2026 (PDF emails), «Product presentation.pptx» (sales update, source of the 3D product images), «MNC+GOV.pptx» (Security Authorization Services, Azure/AWS resell, Advanced Compliance), «Оновлення приватних хмар VMware vSAN та Azure Local.pptx», «Weekly meetings.pptx» (status to 28.10.2026), and the margin-results and publication-process decks. Every slide's speaker notes carry its talk track, its sources and what is inferred.

## How it is built

- **Toolchain (local only):** `~/Desktop/GigaCloud/toolchain/h1/`.
  - `h1_data.py` holds all copy: goals (one `name` used everywhere, hand-broken `lines` / `nav`, the nav `oneliner`), the done slides (problem / solution / value / notes), the Business-efficiency slides, the roadmaps, section subtitles. Edit text there.
  - `build_h1.py <base.pptx> <out.pptx>` builds the deck on `../plm/base_margin_v25.pptx` (the GigaCloud 2× template; its cover is reused) with helpers from `../plm/gclib.py`. `h1_data_v1.py` / `build_h1_v1.py` reproduce v1.
  - Render: `PY=python3 zsh ~/Desktop/GigaCloud/toolchain/pp_render.sh <deck> <outdir> 80` (PowerPoint → PDF → PNG + contact sheets; system python3 has PyMuPDF).
- **Icons:** Tabler Icons 3.31.0 (MIT), outline SVGs in `h1/icons/` (downloaded from cdn.jsdelivr.net with Alex's OK, 2026-11-10). `h1/tabler.py` converts each SVG path into a native, stroke-only custom shape (arcs → Béziers), grouped per icon: recolour by line colour, resize freely. To add an icon, put `<name>.svg` from the same Tabler version into `icons/` and call `tabler.badge(...)` / `tabler.glyph(...)`.
- **Images:**
  - The 3D product renders (disk, RAM, server, cloud) and the GigaCloud logo come from «Product presentation.pptx». The builder trims their transparent margins into `h1/img/_crop/`.
  - The PLM slide's checklist is `../plm/img/product_checklist.png` (the publication deck's edited capture), cropped to its counters and first six rows. It shows at 0.0056 in/px, readable for a 2× capture.
- **Text that wraps lives in one text box per column** (labels, paragraphs, bulleted lists as paragraphs). PowerPoint flows it, so an edited line never collides with the next block. List bullets: Wingdings ✓ (done, green) and Arial → (next, blue), both cross-platform.
- **Line-break hygiene:** `build_h1.py` extends gclib's non-breaking rules: a number never splits from its unit (TB, GB, год, нод, %, 50 000), «№ 712», «vSphere 9», and a dash never starts a line. PowerPoint ignores U+2060 (word joiner): a numeric range like «17,5–35» still breaks after its dash. Rephrase ranges in running text («між 17,5 і 35 TB»).
- **After delivery Alex owns the file.** Never regenerate over his edits. Check first whether the Desktop copy still matches the build (`cmp`). If he has edited it, build only the changed slides and clone them into his file (the margin deck's transplant approach, `../margin-deck/HANDOFF.md`).

## Conventions (v2)

The general rules are in `.claude/references/slide-design.md` (rules 35–38 come from this deck).
- **Colour code = status only.** Done = green (`2E8540`): a «✓ Зроблено» pill on every done slide, green ✓ lists. Next = blue (`1F5FA8`).
  - Roadmap slides: a full-width blue header band, blue icon badges, blue left accent bars on the rows, and a status pill (В роботі / Заплановано).
  - Business-efficiency slides: the «В роботі» list in blue with → bullets.
  - Red stays the brand: kickers, icons on done slides, the value band.
- **Tags are neutral peers:** one light-grey chip style (`EFEFEF`, dark text) for Запуск продукту (rocket), Оновлення продукту (refresh) and Product operations (gear). One tag per initiative: at the right end of the kicker row on done slides, at the right of each roadmap row.
- **Done slide:**
  - kicker = block · goal's full name with the goal's icon;
  - left: «Проблема» (one short line, 27 pt at 2×) and «Рішення» (one short bold line), plus a product render where one exists;
  - right: one diagram;
  - bottom: the «Цінність для бізнесу» band with 2–3 tiles, one type size per band.
- **Roadmap «Що далі»:** no recap of the done items. One row per next item: icon, name, one line, tag. The row size scales with the count.
- **PLM slide:** the five stages as a chevron strip in brand tints (the publication deck's stage colours would collide with the status code), then the CRM checklist screen with its UI-path caption.
- Margin results are shown as the method (price stack, «Раніше» vs «Нова модель»), with no percentages, while the results wait for the corrected workbook.

## Decisions

- **v2, Alex (2026-11-10):**
  - slide 4 shows three buckets with a one-liner;
  - status and roadmap read as different slide types (colour code + structure);
  - tags have equal weight;
  - Public S3 has fewer details (the four tiers with a one-word profile; incident behaviour and volumes are in the notes);
  - the pricing slide drops «Наявність і залишки на складі — в один клік» and says «Більша гнучкість цін»;
  - all project text is shorter;
  - the PLM slide gets the checklist screenshot;
  - no «Дякую» slide.
- **v1 content review** (fresh-eyes Opus reviewer against the brief and the sources):
  - VCFaaS shows v.2: licences through the partner from 01.11.2026, no hardware lease, delivery and contract processes approved;
  - the partner is evoila (the weekly writes «evoila / 11:11»; the brief's «Evolia» is a typo);
  - the full-cost margin model counts as done, while its results going into the CRM is «В роботі»;
  - one name per thing: «Advanced Memory Tiering» (the catalog name), «Colocation», «Готовність до міграції клієнтів з VMware»;
  - value tiles state business outcomes;
  - tag changes: gov versions and the Azure / AWS resell → Оновлення продукту (both existed before); low-cost hardware → Product operations.

## Open items for Alex

- **VCFaaS v.2:** confirm the partner contract is signed and orders through evoila started on 1 November.
- **Azure Local:** the brief lists it as done; the Jun–Aug digest put it into Draft for repackaging, and weekly 28.10 still had sales / presales training open (finish 02.11). Confirm it is back in active sale; the card says «Нова платформа».
- **Low-cost залізо:** weekly 1.1.2 (used hardware) has been on pause since September; the roadmap keeps it «В роботі», as the brief does.
- **Tags** are proposals where the brief gave none.
- **Inferred one-liners** (marked in the notes): Private Kubernetes by vCluster, Продуктивність СЗД, Private S3 Storage, and the problem statements of several done slides.
- **AI Implementation Services** (weekly 4.1 / 4.2) is not in the brief, so the deck leaves it out; its note on the Resell + Prof Services roadmap gives a one-line answer if asked.
