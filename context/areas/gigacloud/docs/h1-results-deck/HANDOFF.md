# Half-year product results deck — handoff

_Rewritten 2026-11-12 on Alex's MacBook Air, when v5 was delivered: every project slide cut to problem, solution, one plain visual and value; the government and VCFaaS slides reframed; VCFaaS moved to Resell; a sub-header before each IaaS goal and the goal strip in every IaaS header; the strategy slide animated. Read fully before touching the deck._

⛔ GigaCloud = internal-only area. The deck is internal; nothing from it goes into external-facing artifacts.

## The deck

| Deck | State | Live copy (Alex hand-edits it — living-documents rule) | In this repo |
|---|---|---|---|
| **Розвиток продуктів** — `GigaCloud_Product Results H1_10-NOV-2026 (v5).pptx`: the product team's half-year achievements and plans, for Alex's 15-minute talk | v5, 27 slides, UA (2026-11-12); v1–v4 kept beside it | MacBook Air: `~/Desktop/GigaCloud/` | **not committed** (internal commercial detail: vendor contract dates, margin model, a CRM screenshot) |

**Deck map (v5)**, as the brief orders it:
1. Cover «Розвиток продуктів · Досягнення за півріччя і плани · Листопад 2026».
2. «Загальна стратегія 2026»: the Miro goal tree as a nested table. Pillars GTM and Business efficiency, blocks IaaS / Resell / Services, seven goals with «Мета» and «Що робимо», an icon on every pillar, block and goal. IaaS order per the brief: cost-ефективність → диверсифікація → розвиток продуктів на запит ринку і sales enablement (the last merges two Miro leaves).
   - Animated on click: first the pillars and blocks, then one goal row per click; the column headers come with the first row. Eight clicks in all.
3. Section «IaaS» (red full-bleed, a "you are here" strip of the three sections).
4. «Три цілі IaaS»: three buckets, each with an icon, «ЦІЛЬ N», the goal and a one-line purpose.
5. Sub-header for goal 1 (the same slide with that goal outlined and the other two greyed out).
   - 6–8: Гнучкі конфігурації заліза · Private Cloud on OpenStack · Advanced Memory Tiering.
   - 9: «Що далі».
10. Sub-header for goal 2.
   - 11: Private Cloud on OpenStack і Azure Local.
   - 12: «Що далі» in two groups: «Диверсифікація від Broadcom» (licences through evoila, readiness to migrate customers off VMware) and «Диверсифікація від продажу VM на користь Kubernetes» (Private Kubernetes by vCluster).
13. Sub-header for goal 3.
   - 14–16: Public S3 Storage · Ціни під квоту і складські ціни · Продукти для держзамовників.
   - 17: «Що далі».
18. Section «Resell + Prof Services».
   - 19–22: Ресел Microsoft Azure і AWS · Модель VCFaaS · Ціни в USD для ліцензій · Security Authorization Services.
   - 23: «Що далі».
24. Section «Business efficiency».
   - 25–27: Аналіз причин програних угод · Оновлений PLM: публікація продуктів (with the CRM checklist screenshot) · Реальна маржинальність продуктів.

No closing slide.

**Sources:**
- The brief: Google Doc «Бріф», id `1UO0z-rR-pOgV1WqFuaQPTP1vsmGIGayI4qGGmUz27zM`, with the Miro goal tree.
- `~/Documents/GigaCloud context/` on the MacBook Air:
  - Product Catalog Updates Feb–May and Jun–Aug 2026 (PDF emails);
  - «Product presentation.pptx» (sales update, source of the 3D product images);
  - «MNC+GOV.pptx» (Security Authorization Services, Azure / AWS resell, Advanced Compliance);
  - «Оновлення приватних хмар VMware vSAN та Azure Local.pptx»;
  - «Weekly meetings.pptx» (status to 28.10.2026);
  - the margin-results and publication-process decks.
- Alex in chat, 2026-11-12: the government and VCFaaS framing below.

Every slide's speaker notes carry:
- its talk track and sources;
- what is inferred;
- every detail the slide leaves out (specs, node counts, ratios, hours, tier names, locations, conditions), so Alex has them for questions.

## How it is built

- **Toolchain (local only):** `~/Desktop/GigaCloud/toolchain/h1/`.
  - `h1_data.py` holds all copy:
    - goals: one `name` used everywhere, hand-broken `lines` / `nav`, the nav `oneliner`;
    - the done slides: problem, solution, value, notes;
    - the Business-efficiency slides, the roadmaps, the section subtitles;
    - the sub-header notes (`SUB_NOTES`).

    Edit text there.
  - `build_h1.py <base.pptx> <out.pptx>` builds the deck on `../plm/base_margin_v25.pptx`, the GigaCloud 2× template whose cover it reuses. Shared helpers come from `../plm/gclib.py`.
  - `h1_data_v<N>.py` / `build_h1_v<N>.py` reproduce v1–v4.
  - `compare_decks.py <his.pptx> <build.pptx>` tells whether a delivered file was hand-edited (exit 0 = no content edits).
  - A roadmap in `ROADMAPS` takes either `items` or `groups` = [(group title, items)]. Each group gets a blue caps header with a hairline, and the rows shrink to make room.
  - `iaas_nav_slide(active)` draws the navigation slide. With a goal key it draws that goal's sub-header instead.
  - `goal_strip()` draws the three goal icons in the kicker row of every IaaS slide, and on the blue band of the IaaS roadmaps.
  - The strategy slide's parts are grouped (`group_since`), and `add_click_fades` writes the click animation as the XML PowerPoint itself writes for a Fade entrance.
- **Render:** `PY=python3 zsh ~/Desktop/GigaCloud/toolchain/pp_render.sh <deck> <outdir> 80 [pages]` (PowerPoint → PDF → PNG + contact sheets; system python3 has PyMuPDF). The PDF shows every animated shape.
- **Animation check:** `zsh ~/Desktop/GigaCloud/toolchain/anim_check.sh <deck> <slide#>` opens a copy in PowerPoint and lists the slide's main-sequence effects in order. v5's slide 2 has nine effects: blocks, goal 1, the column headers (with goal 1), then goals 2–7.
- **Icons:** Tabler Icons 3.31.0 (MIT), outline SVGs in `h1/icons/` (downloaded from cdn.jsdelivr.net with Alex's OK, 2026-11-10).
  - `h1/tabler.py` converts each SVG path into a native, stroke-only custom shape (arcs → Béziers), grouped per icon. Recolour it by line colour; resize it freely.
  - To add an icon, put `<name>.svg` from the same Tabler version into `icons/` and call `tabler.badge(...)` / `tabler.glyph(...)`.
- **Images:**
  - The 3D product renders (disk, RAM, server, cloud) and the GigaCloud logo come from «Product presentation.pptx». The builder trims their transparent margins into `h1/img/_crop/`.
  - The PLM slide's checklist is `../plm/img/product_checklist.png` (the publication deck's edited capture), cropped to its counters and first six rows.
- **Text that wraps lives in one text box per column** (labels, paragraphs, bulleted lists as paragraphs). PowerPoint flows it, so an edited line never collides with the next block. List bullets: Wingdings ✓ (done, green) and Arial → (next, blue), both cross-platform.
- **Line-break hygiene:** `build_h1.py` extends gclib's non-breaking rules:
  - a number never splits from its unit (TB, GB, год, нод, %, 50 000);
  - «№ 712» and «vSphere 9» stay together;
  - a dash never starts a line.

  PowerPoint ignores U+2060 (word joiner), so a numeric range like «17,5–35» still breaks after its dash. Rephrase ranges in running text.
- **After delivery Alex owns the file.** Never regenerate over his edits; check first whether the Desktop copy still matches the build.
  - A plain `cmp` is not enough: PowerPoint re-serialises every part on save, dropping empty runs, merging same-format runs and rewriting group transforms.
  - Compare shapes, geometry, normalised runs and notes instead (`compare_decks.py`). v2's re-save, v3 and v4 had no content edits.
  - If he has edited it, build only the changed slides and clone them into his file (the margin deck's transplant approach, `../margin-deck/HANDOFF.md`).

## Conventions

The general rules are in `.claude/references/slide-design.md`; rules 35–39 come from this deck.
- **A project slide carries four things** (rule 37, Alex 2026-11-12):
  - «Проблема» and «Рішення», one short line each, told from the customer's side;
  - one plain visual of the change: before → after, who it is for, how the parts connect, in a few words;
  - the «Цінність для бізнесу» band with two tiles.

  Specs, internals and fine print go to the notes.
- **Colour code = status only.**
  - Done = green (`2E8540`): a «✓ Зроблено» pill on every done slide, green ✓ lists.
  - Next = blue (`1F5FA8`). Roadmap slides get a full-width blue header band, blue icon badges, blue left accent bars on the rows and a status pill (В роботі / Заплановано). Business-efficiency slides set the «В роботі» list in blue with → bullets.
  - Red stays the brand: kickers, icons on done slides, the value band, «Стало» / «Тепер» in before → after visuals (grey = before).
- **Tags are neutral peers.** One light-grey chip style (`EFEFEF`, dark text) serves Запуск продукту (rocket), Оновлення продукту (refresh) and Product operations (gear). Each initiative has one tag: at the right end of the kicker row on done slides, at the right of each roadmap row.
- **Where you are in IaaS** (rule 39):
  - a sub-header before each goal: the navigation slide with that goal outlined in red and the other two greyed out, in identical geometry;
  - the goal strip (three goal icons, the current one in full colour) in the kicker row of every IaaS done and roadmap slide, next to «IaaS · <goal name>».
- **Roadmap «Що далі»:** no recap of the done items. One row per next item: icon, name, one line, tag. The row size scales with the count.
- **PLM slide:** the five stages as a chevron strip in brand tints (the publication deck's stage colours would collide with the status code), then the CRM checklist screen.
- **Margin slide:** shown as the method, a price stack labelled in plain words, «Раніше» vs «Нова модель», with no percentages while the results wait for the corrected workbook.

## Decisions

- **v5, Alex (2026-11-12):**
  - a sub-header before each IaaS goal, with the current goal highlighted and the others greyed out, and the current goal referenced in every header;
  - VCFaaS moves to Resell; the strategy row «Зростання через ресел» now reads «Azure і AWS, VCFaaS, ціни в USD»;
  - project slides cut hard: structure, problem → solution, a visual where it helps, value, and no technical details, features or internals («У нас 15 хвилин»);
  - **government customers are an old segment, not a new one.** The issue was pricing: solutions were calculated case by case and often came out more expensive. The slide now says a separate government version with ready prices replaces the custom calculations;
  - **VCFaaS:** a customer with its own hardware who does not want to buy the VMware subscription from Broadcom buys it, with support, from GigaCloud. Under the hood a leasing scheme (GigaCloud nominally leases the customer's hardware) fits this into Broadcom's policies. The scheme stays off the slide and is only in the notes;
  - the strategy slide builds on click: blocks first, then goal by goal.
- **v4, Alex (2026-11-10):** the goal «Стратегічна диверсифікація» carries both directions on slides 2 and 4. «Мета» = «Менша залежність від Broadcom і продажу VM»; «Що робимо» = «Нові платформи, моделі ліцензій і Kubernetes».
- **v3, Alex (2026-11-10):** the diversification roadmap splits into two named directions: away from Broadcom, and from selling VMs towards Kubernetes.
- **v2, Alex (2026-11-10):**
  - the IaaS navigation slide shows three buckets with a one-liner;
  - status and roadmap read as different slide types (colour code + structure);
  - tags have equal weight;
  - the pricing slide drops «Наявність і залишки на складі — в один клік» and says «Більша гнучкість цін»;
  - the PLM slide gets the checklist screenshot;
  - no «Дякую» slide.
- **v1 content review** (fresh-eyes Opus reviewer against the brief and the sources):
  - the partner is evoila; the weekly writes «evoila / 11:11», and the brief's «Evolia» is a typo;
  - the full-cost margin model counts as done, while its results going into the CRM is «В роботі»;
  - one name per thing: «Advanced Memory Tiering» (the catalog name), «Colocation», «Готовність до міграції клієнтів з VMware»;
  - tag changes: gov versions and the Azure / AWS resell → Оновлення продукту (both existed before); low-cost hardware → Product operations.

## Open items for Alex

- **VCFaaS:** weekly 28.10 says the v.2 model needs no lease of the customer's hardware and that licences come through evoila from 1 November. Alex's framing (12.11) has the leasing scheme under the hood. The notes follow Alex; confirm which scheme is current and that the partner contract is signed.
- **Azure Local:** the brief lists it as done; the Jun–Aug digest put it into Draft for repackaging, and weekly 28.10 still had sales / presales training open (finish 02.11). Confirm it is back in active sale; the card says «Нова платформа».
- **Low-cost залізо:** weekly 1.1.2 (used hardware) has been on pause since September; the roadmap keeps it «В роботі», as the brief does.
- **Tags** are proposals where the brief gave none.
- **Inferred wording** (marked in the notes):
  - the one-liners of Private Kubernetes by vCluster, Продуктивність СЗД and Private S3 Storage;
  - several problem statements;
  - the value tiles «Ширший ринок» (OpenStack), «Швидша пропозиція» (government), «Додаткова виручка» and «Утримуємо клієнтів» (VCFaaS).
- **AI Implementation Services** (weekly 4.1 / 4.2) is not in the brief, so the deck leaves it out. Its note on the Resell + Prof Services roadmap gives a one-line answer if asked.
