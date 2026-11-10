# Half-year product results deck — handoff

_Written 2026-11-10 on Alex's MacBook Air, when v1 was delivered. Read fully before touching the deck._

⛔ GigaCloud = internal-only area. The deck is internal; nothing from it goes into external-facing artifacts.

## The deck

| Deck | State | Live copy (Alex hand-edits it — living-documents rule) | In this repo |
|---|---|---|---|
| **Розвиток продуктів** — `GigaCloud_Product Results H1_10-NOV-2026 (v1).pptx`: the product team's half-year achievements and plans, for Alex's 15-minute talk | v1, 25 slides, UA (2026-11-10) | MacBook Air: `~/Desktop/GigaCloud/` | **not committed** (internal commercial detail: vendor contract dates, margin model) |

**Deck map (v1)**, as the brief orders it:
1. Cover «Розвиток продуктів · Досягнення за півріччя і плани · Листопад 2026».
2. «Загальна стратегія 2026»: the Miro goal tree as a nested table — pillars GTM and Business efficiency, blocks IaaS / Resell / Services, seven goals with «Мета» and «Що робимо», an icon on every pillar, block and goal. IaaS order per the brief: cost-ефективність → диверсифікація → розвиток продуктів і sales enablement (the last merges two Miro leaves).
3. Section «IaaS» (red full-bleed, a "you are here" strip of the three sections).
4. «Три цілі IaaS»: navigation over the three goals, each with its done and next initiatives.
5–8. Cost-ефективність: Гнучкі конфігурації заліза · Private Cloud on OpenStack · vSAN Advanced Memory Tiering · «Що далі» (roadmap).
9–11. Стратегічна диверсифікація: Private Cloud on OpenStack і Azure Local · Модель VCFaaS · «Що далі».
12–15. Розвиток продуктів і sales enablement: Public S3 Storage · Ціни під квоту і складські ціни · Продукти для держзамовників · «Що далі».
16. Section «Resell + Prof Services».
17–20. Ресел Microsoft Azure і AWS · Ціни в USD для ліцензій · Security Authorization Services · «Що далі».
21. Section «Business efficiency».
22–24. Аналіз причин програних угод · Оновлений PLM: публікація продуктів · Реальна маржинальність продуктів (each: problem, done, in progress, value).
25. Closing «Дякую! · Питання й обговорення».

**Sources:** the brief (Google Doc «Бріф», id `1UO0z-rR-pOgV1WqFuaQPTP1vsmGIGayI4qGGmUz27zM`, with the Miro goal tree), and `~/Documents/GigaCloud context/` on the MacBook Air: Product Catalog Updates Feb–May and Jun–Aug 2026 (PDF emails), «Product presentation.pptx» (sales update, source of the 3D product images), «MNC+GOV.pptx» (Security Authorization Services, Azure/AWS resell, Advanced Compliance), «Оновлення приватних хмар VMware vSAN та Azure Local.pptx», «Weekly meetings.pptx» (status to 28.10.2026), and the margin-results and publication-process decks. Every slide's speaker notes carry its talk track, its sources and what is inferred.

## How it is built

- **Toolchain (local only):** `~/Desktop/GigaCloud/toolchain/h1/`.
  - `h1_data.py` holds all copy: goals, the done slides (problem / solution / value / notes), the Business-efficiency slides, the roadmaps, section subtitles. Edit text there.
  - `build_h1.py <base.pptx> <out.pptx>` builds the deck on `../plm/base_margin_v25.pptx` (the GigaCloud 2× template; its cover is reused) with helpers from `../plm/gclib.py`.
  - Render: `PY=python3 zsh ~/Desktop/GigaCloud/toolchain/pp_render.sh <deck> <outdir> 80` (PowerPoint → PDF → PNG + contact sheets; system python3 has PyMuPDF).
- **Icons:** Tabler Icons 3.31.0 (MIT), outline SVGs in `h1/icons/` (downloaded from cdn.jsdelivr.net with Alex's OK, 2026-11-10). `h1/tabler.py` converts each SVG path into a native, stroke-only custom shape (arcs → Béziers), grouped per icon: recolour by line colour, resize freely. To add an icon, put `<name>.svg` from the same Tabler version into `icons/` and call `tabler.badge(...)` / `tabler.glyph(...)`.
- **Images:** the 3D product renders (disk, RAM, server, cloud) and the GigaCloud logo come from «Product presentation.pptx»; the builder trims their transparent margins into `h1/img/_crop/`.
- **Text that wraps lives in one text box per column** (labels, paragraphs, bulleted lists as paragraphs). PowerPoint flows it, so an edited line never collides with the next block. List bullets: Wingdings ✓ (done, green) and Arial ○ (in progress / planned, grey), both cross-platform.
- **Line-break hygiene:** `build_h1.py` extends gclib's non-breaking rules: a number never splits from its unit (TB, GB, год, нод, %, 50 000), «№ 712», «vSphere 9», and a dash never starts a line.
- **After v1 Alex owns the file.** Never regenerate over his edits: build changed slides and clone them into his file (the margin deck's transplant approach, `../margin-deck/HANDOFF.md`).

## Conventions (v1)

- **Tags** (brief): Запуск продукту = solid red chip with a rocket; Оновлення продукту = light-red chip with a refresh arrow; Product operations = white outlined chip with a gear. One tag per initiative, at the right end of the kicker row (done slides) or of the row (roadmaps).
- **Done slide:** kicker = block · goal with the goal's icon (the same icon as on the strategy and navigation slides); title = initiative; left = «Проблема» / «Рішення» (+ a product render where one exists); right = one native diagram; bottom = «Цінність для бізнесу» band with 2–3 tiles, one type size per band.
- **Roadmap slide «Що далі»:** a green «Зроблено» strip recapping the goal's done initiatives, then one row per next initiative (big icon, name, one line, tag); row size scales with the count.
- **Business-efficiency slides:** «Проблема» · «Зроблено» (✓) · «В роботі» (○) on the left, the diagram on the right, the value band at the bottom. The PLM slide reuses the publication deck's five stage colours.
- Margin results are shown as the method (price stack, before / now), with no percentages, while the results wait for the corrected workbook.

## Content review (v1)

A fresh-eyes Opus reviewer checked v1's content against the brief and the sources (2026-11-10). Applied:
- **VCFaaS** shows the model in force now, v.2: licences through the partner from 01.11.2026, no hardware lease, delivery and contract processes approved (weekly 28.10). The July leasing relaunch is history in the notes.
- **Partner name:** the weekly writes «evoila / 11:11»; the brief's «Evolia» is a typo, so the deck says evoila.
- **Margin slide:** the full-cost model counts as done (steps 1–5 computed); updating the results and entering them in the CRM is «В роботі». The bracket reads «Нова модель», not «Тепер».
- **One name per thing:** every kicker uses the goal's full name. The renames are «Advanced Memory Tiering» (the catalog name), «Colocation» (not «Collocation») and «Готовність до міграції клієнтів з VMware» (the brief's «спроможність до можливої міграції»). The text also uses «обсяг», «реселу», «нода» and «Product Insights» throughout.
- **Value tiles** now state business outcomes: S3 «Нова лінія виручки», gov «Новий сегмент · Вища маржа», USD «Маржа не залежить від курсу», lost deals «Перші інсайти в роботі» (the weekly's pricing, battle-card and Hyper-V insights).
- **Tags changed:**
  - gov versions and the Azure / AWS resell → Оновлення продукту (both existed before; Azure has sold since 2025);
  - low-cost hardware → Product operations.
- Also: the GigaCloud recommendation of 1:1 as a footnote on the memory-tiering table, the minimum node count only on the platform cards (64 vs 40 conflict), and «Моніторинг» instead of «Контроль» of the Azure / AWS budget.

## Open items for Alex

- **VCFaaS v.2:** confirm the partner contract is signed and orders through evoila started on 1 November.
- **Azure Local:** the brief lists it as done; the Jun–Aug digest put it into Draft for repackaging, and weekly 28.10 still had sales / presales training open (finish 02.11). Confirm it is back in active sale before the talk; the card says «Нова платформа».
- **Low-cost залізо:** weekly 1.1.2 (used hardware) has been on pause since September; the slide keeps it «В роботі», as the brief does.
- **Tags** are proposals where the brief gave none (see the review list above).
- **Inferred one-liners** (marked in the notes): Private Kubernetes by vCluster, Продуктивність СЗД, Private S3 Storage, and the problem statements of several done slides.
- **AI Implementation Services** (weekly 4.1 / 4.2: contract terms agreed, process being documented) is not in the brief, so the deck leaves it out; its note on the Resell + Prof Services roadmap gives a one-line answer if asked.
- The closing slide is an addition; delete it if the talk ends on the last content slide.
