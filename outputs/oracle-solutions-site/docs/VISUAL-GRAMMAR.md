# VISUAL-GRAMMAR.md — one component grammar for all seven product pages

This file is the contract between `site/data/content.js` and the product renderer (`site/pages/product.js`). It answers one question: **what component renders each fact, and does it look the same on all seven products?**

The rule that produced it: a reader who has seen one product page must be able to read the next six without re-learning the layout. Same eyebrow treatment, same icon style, same card geometry, same order. Only the words change.

Three hard rules:

1. **Every product fills every slot.** No product is allowed to render a shorter Overview than another. Where a product has no published number, the slot is filled with a **qualitative** instance of the same component — never a blank, never a missing section, never a sentence apologising for the absence.
2. **A number never renders without the disclaimer beside it.** `metricsNote` renders as a footnote line directly under the metric row, in the same block; `jumpstart.investment.footnote` under the price card, in its block; and the success-story callout, which has no footnote row, carries its caveat in the last sentence of `story`.
3. **Icons are 1.5px line icons, teal, from the one registry in `assets/app.js`.** No emoji anywhere. No filled icons except the existing `play` and `dot`.

---

## 1. Hero (top block) — every page

The hero is the only block on a page that carries a background image — and the same file has one other job, described at the end of this section: it is the tile on the Products page.

| Part | Source | Notes |
|---|---|---|
| Background image | `products[].hero.image` · `overview.hero.image` · `services.hero.image` — `{ file, alt, focal }` | `file` is a path relative to `site/index.html`. `focal` is a CSS `object-position` value. `alt` is the accessible description; because the image is decorative background, carry it as the container's `aria-label` only if no other label exists, otherwise `aria-hidden`. The authority on `alt` and `focal` is `site/assets/img/heroes/heroes.json`; `content.js` carries a copy so nothing has to fetch JSON at runtime — **keep them in sync**. |
| Treatment | — | Image right/top, dark gradient left-to-right plus a bottom fade into the page ground `#131313`, so headline and CTAs sit on near-black. A subtle teal tint over the image is allowed. |
| Height | — | 60–70vh maximum on desktop. **Not** full-screen. Auto height on mobile, with the image faded harder. |
| Content | `headline`, `heroLine?`, `badges?`, chips (`availabilityChip`, `categoryChip`, facet label), `oneLiner`, `subLine?`, CTAs | Unchanged from today. |

**Two hero layouts, chosen by data — nothing else changes.**

- **Single column** (default) — text over the background image. Used when `SITE_CONFIG.products[slug].video` is `false` and `videoUrl` is empty.
- **Two column** — text left, a 16:9 media frame right, when `video` is `true` **or** `videoUrl` is non-empty. The frame has a thin border and a slight lift, shows a poster image with a teal circular play button overlay and the caption **"Watch the demo"**. With a URL it opens the video modal; without one it opens the pending panel — product name, `shared.videoPending.body`, and a primary button to that product's Request-a-demo tab. Same frame either way, so a product does not change layout the day its recording lands.

Poster resolution order, first non-empty wins:

1. `SITE_CONFIG.products[slug].videoPoster`
2. `https://img.youtube.com/vi/<id>/maxresdefault.jpg` — only when `videoUrl` is a YouTube link

There is no third step. **The hero image is never the poster.** Rendering the
hero photograph inside a frame that sits on top of that same photograph makes
the frame read as a brighter cut-out of the wallpaper rather than as a video
still, and it is the first thing on the page a seller demos.

A frame with no poster renders without its `<img>` and carries the
`video-card--plate` modifier: a navy-to-inset gradient ground with the accent
glow, a lighter veil, the teal play button and the caption. That is the
documented pending state, and it is the same rule every other missing asset on
this site follows. The frame's veil stays light enough to keep a real poster a
picture rather than a grey field — only the caption's corner is shaded.

To give a pending frame a still before the recordings land, set `videoPoster` to
a **distinct** treated frame — a step screenshot, a desaturated crop at another
focal point. Never the hero file.

A product with neither flag nor URL never renders an empty frame, a greyed play button, or a "video coming soon" line.

### 1.1 The same image, as a Products-page tile

Round 3, D: text never sits on the photograph. Every tile is **an image band over a solid body**, and both halves are the same size on every tile — two per row, equal height.

| Part | Content |
|---|---|
| **Image band** (~16:7, top) | That product's own `hero.image`, same file and `focal`, with a dark gradient at its lower edge. Overlaid: the **facet label** top-left (e.g. "OCI + NVIDIA") and the **availability chip** top-right. Nothing else. |
| **Body** (solid dark surface) | The **category chip**, the product **name** as an H3, the `oneLiner`, the three `tile.outcomes` as check-icon bullets, and **one** CTA — `Learn more →`. |

The second "Request a demo" CTA is gone from the tile: a tile with two actions makes the reader choose before they know what the product is, and the product page's hero carries the demo ask anyway. Hover lifts the tile slightly and scales the image 1.05, which `prefers-reduced-motion` disables. An odd count ends with the last tile alone in the left column.

A product with no hero file on disk renders the same tile with the band on the flat ground, because the image guard drops an `<img>` that will not load. **The home page's product grid uses the same anatomy** at its compact size, so a reader meets one tile shape on both pages.

---

## 2. Overview tab — two columns, a fixed order in each

**Target: the MAIN column reads in ~1.5 desktop screens at 1440×900 without feeling cramped.** If a product exceeds that, prose moves into §2.7 — it does not stay on the page. (The site footer sits below the tab body and adds about half a screen of its own; the target is about the tab, not about the scroll height of the document. The Previous/Next pager was removed in round 3 — the tab bar and the Products grid are the navigation.)

The tab is a **two-column layout on desktop**: a MAIN column at roughly two thirds, and a SIDE rail at roughly one third, on the right. The rail cell stretches to the height of MAIN and holds **one card, §2.4 Outcomes & ROI**, which scrolls with the page. **Nothing pins any more** — the card that used to be sticky was §2.5 At a glance, and it went with round 3, H. Below 1100 px the layout collapses to one column and the rail follows the main column.

| Column | Order |
|---|---|
| **MAIN** | §2.1 Problem ↔ Solution → §2.2 How it works (the stepper) → §2.3 Industry use cases (the tabs) → §2.6 Success story → §2.7 More detail (one disclosure) |
| **SIDE rail** | §2.4 Outcomes & ROI — and nothing else |

**The rail is never taller than MAIN.** That is the constraint that decides what goes in it: a rail that out-runs its column leaves dead gutter at the foot of the page, and a pinned card that is taller than the viewport hides its own bottom for the whole scroll. Nothing else is a top-level block. The old standalone key-features checklist, in-scope/out-of-scope pair and long-form feature list are all still in the data and all render **inside** §2.7 — the compactness target is met by moving prose, never by dropping a fact.

### 2.1 Problem → Solution — paired two-panel strip

`overview.problemSolution` → `{ problem: { title, text, icon }, solution: { title, text, icon } }`

Two panels of identical height side by side, an arrow glyph (`icon("arrow")`) between them. Each panel: icon, eyebrow (`title`, uppercase), 1–2 sentences (`text`). Panels stack vertically on mobile with the arrow rotated 90°.

Icon convention today: `problem.icon = "alert"`, `solution.icon = "spark"` on all seven. It is data so it can diverge — but only for a reason.

### 2.2 How it works — the workflow stepper (MAIN)

`overview.steps[]` — **3–5 steps**, `{ n, title, text, image, features }`. Heading from `sectionLabels.howItWorks`.

This block **replaces the flat key-features checklist**. The same bullets are still on the page; they now sit under the step of the workflow they belong to, so a reader learns the shape of the work rather than a list of nouns.

| Field | Rule |
|---|---|
| `n` | 1-based, in order. The circle beside the title. |
| `title` | The step, as a verb phrase. One line. |
| `text` | ≤ 2 lines (≤ 30 words). What happens at this step. |
| `image` | `assets/img/steps/<slug>-<n>.jpg` — a real product screenshot where one exists, otherwise a designed step illustration built to the same frame. Either way it renders in **one 16:10 frame with a thin border**, so the two kinds are visually interchangeable and a screenshot can replace an illustration later with no layout change. |
| `features` | The exact `overview.features` strings that belong to this step. Rendered as check-icon bullets under the step text. |

**The coverage invariant.** Across a product's steps, the union of `features` must equal `overview.features` exactly — every bullet in one step, no bullet in two. That is what makes it safe for the stepper to be the only surface those bullets have. `tools/check-grammar.js` asserts it in both directions.

**Interaction.** Desktop: the step list sits left inside the MAIN column, the selected step's frame large on the right. Clicking a step highlights it, opens its `text` + `features`, and swaps the frame; the other steps collapse to number + title, which is what keeps the block to one screen. Mobile: one column, the list first and the frame under it — the same selection, never four open steps. Step 1 is selected on load. The list is a keyboard-navigable set of buttons (↑/↓, Home, End move and select; Enter/Space activate), each carrying `aria-expanded` over its own body, and the frame's image `alt` is the step title.

### 2.3 Industry use cases — the tab component (MAIN)

`overview.industryCases[]` — **3–6 cases**, `{ industry, label, image, problem, solution }`. Heading from `sectionLabels.industryCases`.

A row of tabs, each an industry icon (§5) plus its label. The selected tab shows: a treated industry photograph (`assets/img/industries/<key>.jpg`), the industry name, then **The problem** and **The solution** — 2–3 sentences each, headed from `sectionLabels.caseProblem` / `caseSolution`.

- The images are keyed by **industry, not product**, so one file serves every product that uses that tab.
- First tab open by default. Tabs are a proper `role="tablist"` with roving `tabindex`: ←/→, Home and End move and select, Enter/Space activate, and each panel is `aria-labelledby` its tab and hidden with the `hidden` attribute.
- The two Lakehouse products lead with the `cross-industry` tab, because "the same two pains in every industry, regardless of stack" is their honest answer; the vertical tabs beside it are illustrations of it, not a claim of vertical focus.
- The failure mode to watch: a `problem`/`solution` pair that would read identically under any other tab. If it would, it is not an industry case.

This block **is** the Overview's industry telling. The old `overview.industries[]` chip row is gone from the data: every key it held was already a tab here, so the disclosure was saying the same verticals a second time. `industriesNote` survives and renders as the footnote line closing this block — one telling per vertical, per product. A `moreDetail` entry that repeats a vertical already covered by a tab is the same defect and is removed on sight.

### 2.4 Outcomes & ROI (SIDE rail)

`overview.metrics[]` + `overview.metricsNote` + `overview.roi`, stacked as one compact block. Heading from `sectionLabels.outcomes`.

Tile shape:

```js
{ value: "~30 min" | null, label: "…", qualifier: "…", icon: "clock" }
```

| Field | Rule |
|---|---|
| `value` | The figure, short enough to set large (≤ 14 characters). **`null` means a qualitative tile** — the value slot renders the `icon` at display size instead of a number, and the tile keeps its full height so the stack stays even. |
| `label` | What the figure measures. One line, ≤ 8 words. |
| `qualifier` | The honest caveat or baseline: "Down from ~2 days", "Targeted reduction at proof of value". ≤ 12 words. |
| `icon` | An icon-registry key (§4). Always present, on numeric and qualitative tiles alike. |

In the rail the tiles **stack vertically** rather than sitting in a row — up to four tiles in their compact form, then the `roi` callout in its compact single-column form, then `metricsNote` as the footnote line closing the block. All three stay in the same visual block: rule 2 of this file is that a number never renders away from its disclaimer, and a rail that scrolled the figure past its footnote would break it as surely as a missing footnote would.

**The heading follows the data.** When at least one tile carries a `value`, the block is headed `sectionLabels.metrics` ("Metrics improved"). When every tile is qualitative it is headed `sectionLabels.metricsPlanned` ("What the proof of value measures") instead — a heading asserting improvement over four tiles with no number, closed by a footnote saying no metrics are published, contradicts itself two lines later.

Three of the seven carry published figures; the other four are all-qualitative and still render a full block.

### 2.5 At a glance — **removed** (round 3, H)

`overview.sideFacts` and the card it fed are gone. Every row on it — category, platform, availability, proof-of-value duration and price — was a denormalised copy of something printed on the same page: the chips in the hero, the Jumpstart investment card, the stack. It was therefore a second place to keep in sync, and the first to go stale; `check-grammar.js` fails if the key returns. The rail is §2.4 alone, which is also what keeps it shorter than MAIN without pinning anything.

### 2.6 Success story — a dark callout (MAIN)

`overview.successStory`, at the foot of the MAIN column under the industry tabs. **`null` on five of the seven products, and then nothing renders** — there is no empty state.

The block is a **surface-level dark panel with a 3px teal left rule** — not the white band it used to be, and not a card in the rail. Inside, in order:

1. The customer's **logo** (`logo`, a light mark, capped to the same cap-height the stack uses for vendor marks) beside the customer **name**.
2. The `headline` — one line naming what the engagement did.
3. The two `metrics`, set as **big figures** with their labels beneath. Exactly two, always: a third makes the panel a metric row competing with §2.4.
4. The `story` — two to three sentences, the last of which carries the caveat that qualifies the figures. The panel has no footnote row, so the caveat lives in the sentence; that is how rule 2 of this file is satisfied here.
5. **`downloadLabel`** as the one link out, rendered **only** when `SITE_CONFIG.products[slug].successStoryUrl` is non-empty. No URL, no control.

Only two customers are named — Bosch and Riyadh Air (Alex, 2026-09-14) — and no € figure from a customer's business case appears in the panel.

### 2.7 More detail — one collapsible disclosure (MAIN)

Collapsed by default, one control at the end of the MAIN column. Inside, in order:

1. `overview.moreDetail[]` — `[{ title, body }]`: the today/tomorrow pairs, the pattern definitions, the pull quotes, the per-persona "where it applies" paragraphs, the scope boundaries, the roadmap notes, the evaluation disclaimer.
2. `overview.scope` → in / out, the two compact lists, under `sectionLabels.scope`.
3. `overview.featuresDetail[]` — the long-form feature list, under `sectionLabels.moreDetailFeatures`.
4. `overview.featuresNote?` — the asterisked caveat, where the product carries one. Only `workforce-optimization` does.

Nothing that reads as a wall of text sits above the fold. Equally, **nothing is dropped**: every one of those five is a shipped fact that used to have a top-level block, and the disclosure is where it went.
## 3. Technology tab — exactly two blocks

**Architecture** (§3.1 narrative + §3.3 the layer stack) and **Capabilities** (§3.2). Nothing else. The How-it-runs flow diagram and the Security-and-deployment list were both removed in round 3: the stack read top to bottom *is* the flow, drawn once and with the components attached, and the security lines were four restatements of facts the layer summaries, the scope lists and the Jumpstart `low-risk` pillar already carry.

### 3.1 Narrative

`technology.narrative` — **three sentences maximum**, enforced. One paragraph at the head of the Architecture block.

### 3.2 Capabilities — the complete feature list, by workflow stage

`technology.capabilities` — **exactly four stage groups**, `[{ stage, items: [{ name, state? }] }]`. Heading from `sectionLabels.capabilities`.

- The four `stage` names are the product's own four workflow stages — the same sequence the §2.2 stepper walks a reader through, in the product's vocabulary (`Classification & routing` · `Extraction` · `Review & export` · `Quality & integrations`). Four on every product, so two Technology tabs compare column for column.
- Each stage is a column on desktop (a row group on mobile) holding its `items` as a list. ≥ 3 items per stage; together the four groups cover every capability the product claims anywhere on the site.
- `state` renders as a small tag — **Supported** or **Roadmap**, labels from `sectionLabels.stateSupported` / `stateRoadmap`. It is **absent** unless a shipped capability matrix states it; today only `workforce-optimization` carries tags. An untagged item renders with no tag at all, never with a default one: a guessed tag is a claim.

### 3.3 Solution stack — one accordion, organised by layer

`technology.stack[]` — `{ key, label, summary, vendors, items }`. Heading from `sectionLabels.stack`.

**This one block replaces three.** The vendor-marked component columns, the four-tier solution-stack table and the integration list were three views of the same architecture, printed one under another; a technical buyer comparing two products had to reconcile them himself. They are now one thing, read top to bottom the way an architect draws it.

| Order | `key` | What sits there | Mark |
|---|---|---|---|
| 1 | `application` | The SoftServe accelerator / business app | SoftServe |
| 2 | `ai-engine` | NVIDIA AI-Q · cuOpt · NeMo · NIM-served models | NVIDIA |
| 3 | `data-platform` | Oracle Autonomous AI Lakehouse · Oracle AI Data Platform · Oracle data services · the source application where it is the system of record | Oracle |
| 4 | `infrastructure` | OCI compute, GPUs, networking, storage, tenancy | Oracle |
| 5 | `custom` | Integrations, connectors, signal sources, tenancy specifics — everything set per engagement | SoftServe |

- **A layer may be omitted, never re-ordered.** The two Lakehouse products carry no `ai-engine`: NVIDIA is not required on that route, and an empty engine row would be a worse answer than its absence. `application`, `data-platform`, `infrastructure` and `custom` are present on all seven.
- **Row, collapsed:** layer name · one-line `summary` · vendor mark(s) from `vendors` · chevron. The marks are normalised to **one cap-height and one opacity** across the five rows (`.group-mark--oracle` / `--nvidia` / `--softserve` set only the height each mark's own box needs to land on that cap-height). The layer order is what ranks the rows; whichever wordmark happens to set widest must not. **Row, expanded:** the `items`, each tagged **Required** or **Optional** from its boolean `required`, with `note` as a small trailing line. Every layer carries at least one Required item — a layer where nothing is required is not a layer of this stack.
- **Integrations live in the `custom` layer** — labelled *Custom configuration & integrations*, the fifth band — as items carrying `direction: "inbound" | "outbound" | "both"`. Render them as two labelled lines — **Inbound** and **Outbound**, from `sectionLabels.directionInbound` / `directionOutbound` — inside the expanded layer, or as annotations down the side of the stack. `direction` is illegal anywhere but `custom`.
- **No "not used" footnote.** The layer summaries carry which platform each layer actually uses, which is the condition for dropping the line; a muted micro-line below the accordion, present on some products and absent on others, read as an orphan rather than as honesty. `technology.notUsed[]` is deleted from the data and `check-grammar.js` fails if it reappears.
- `technology.governance?` — the two Lakehouse products. One band, same shape as the ROI band, below the accordion.

`technology.groups[]`, `technology.layers[]`, `technology.integration[]` and `technology.notUsed[]` are the superseded shapes. They are **deleted** from `content.js`; `check-grammar.js` fails if one reappears, because a key nothing renders drifts out of sync in silence.

**The accordion opens on its first layer** (`application`) so the pattern is visible without a click; each row toggles independently, `aria-expanded` follows the visible state, and the panel is hidden with the `hidden` attribute rather than a class.

### 3.4 Security and deployment — **removed** (round 3, B)

`technology.security[]` is deleted from the data. Each product's four lines restated facts that are already on the page: the tenancy and read-only access are in the `infrastructure` and `custom` layer summaries, the human gate is in the solution panel and the `low-risk` pillar, the audit trail is a capability, and "production hardening is roll-out scope" is in `overview.scope.out` and in `jumpstart.next`. `check-grammar.js` fails if the key returns.

### 3.5 The architecture figure

`media[slug]` still supplies the figure, but it is no longer a mirrored 50/50 media row of its own: it sits **inside** the Architecture block, beside the narrative, above the stack (`.arch-head--media`). Two blocks means two blocks — a third full-width row between them would put a picture where the stack has to be. A product with no `media` entry renders the narrative full width and the stack beneath it, with no empty frame.

---

## 4. Jumpstart tab

Tab label **Jumpstart**; block title **Jumpstart Proof-of-Value** (`jumpstart.title`). Route `#/products/<slug>/jumpstart`, with `…/pov` redirecting to it. The tab sells one thing — *fast · low-risk · tangible* — and every product renders the same six pieces in the same order.

| Order | Component | Source |
|---|---|---|
| 1 | **Promise line** | `jumpstart.promise`. One sentence, set as the block's lead. |
| 2 | **Three pillars** | `jumpstart.pillars[]` — exactly three equal cards in one row, each an icon, a `title` and one short paragraph, in the fixed order `fast` → `low-risk` → `tangible`. Peers in a row are equal height. They stack on mobile. |
| 3 | **Two columns** | LEFT: `jumpstart.outcomes[]` — 3–4 outcome lines with check icons, under `sectionLabels.jumpstartOutcomes` ("What you get"). RIGHT: `jumpstart.timeline[]` — 3–4 nodes as a compact week-by-week rail, under `sectionLabels.jumpstartTimeline` ("How it runs"). Equal height on desktop; the outcomes come first on mobile. |
| 4 | **Needs beside the investment card** | LEFT: `jumpstart.needs[]` — exactly three short asks, under `sectionLabels.jumpstartNeeds`. RIGHT: the **investment card** — `price` and `duration` set large, `includes[]` beneath, and `footnote` as the single footnote line inside the same block as the figures. |
| 5 | **After the Jumpstart** | `jumpstart.next[]` — exactly two compact cards, `Integration` then `Scale`, one line each plus `duration` / `price` where they exist. Heading from `sectionLabels.jumpstartNext`. This replaced the three-tier ladder. |
| 6 | **One CTA**, then the standing blocks | `jumpstart.cta` → that product's contacts tab, then `shared.credibilityBlock` and `shared.engageLink`. |

**One footnote, not a stack.** The price card carries exactly one line. The packaging-internal disclaimers ("Framed scope, flexible add-ons", "…set by specific constraints", "…beyond the frame") are removed site-wide and banned by `check-grammar.js`: they describe how a quote is built, not what a customer gets, and four of them under one small table read as a hedge.

**No product-specific extra sections.** `facts`, `deliverables`, `pricing`, `disclaimers[]`, `ladder`, `capabilityMatrix`, `statNotes`, `howItRuns` and `prerequisites` are all gone from the product data — the facts they held live in `promise`, `pillars`, `outcomes`, `timeline`, `needs`, `investment` and `next`, or (for the per-capability detail) in `technology.capabilities`. A seller flipping between two product tabs gets the same page shape every time.

---

## 5. The fixed industry icon set

Sixteen keys. **No product may invent a seventeenth.** A new industry is added here first, with its icon, before any product references it.

| Key | Display label |
|---|---|
| `manufacturing` | Manufacturing |
| `logistics` | Logistics & supply chain |
| `utilities` | Utilities |
| `telecom` | Telecom & cable |
| `healthcare` | Healthcare |
| `financial-services` | Financial services |
| `insurance` | Insurance |
| `retail` | Retail |
| `energy` | Energy |
| `public-sector` | Public sector |
| `automotive` | Automotive |
| `life-sciences` | Pharma & life sciences |
| `professional-services` | Professional services |
| `construction` | Construction |
| `travel-transport` | Travel & transport |
| `cross-industry` | Every industry |

`cross-industry` is reserved: it means "no vertical list exists because the constraint is the system landscape, not the sector", and it always ships with an `industriesNote` that says so.

### Who uses what today

`overview.industryCases[]` drives the industry tab component in the MAIN column (§2.3) and is the only industry surface on a product page; the old `overview.industries[]` chip row is deleted. The first column below is kept only to show that the two lists agreed when the chips were removed.

| Product | former `industries[]` (chips, deleted) | `industryCases[]` (tabs) |
|---|---|---|
| `account-insights` | logistics · financial-services · manufacturing | logistics · financial-services · manufacturing |
| `case-evidence-collection` | financial-services · manufacturing · professional-services · public-sector | financial-services · manufacturing · professional-services · public-sector |
| `plan-vs-actual-investigation` | construction · manufacturing · professional-services | construction · manufacturing · professional-services |
| `large-document-extraction` | travel-transport · professional-services · insurance · financial-services | travel-transport · professional-services · insurance · financial-services |
| `workforce-optimization` | manufacturing · utilities · telecom · healthcare | manufacturing · utilities · telecom · healthcare |
| `cross-system-erp-qa` | cross-industry | cross-industry · manufacturing · logistics |
| `business-metrics-qa` | cross-industry | cross-industry · retail · manufacturing |

The two Lakehouse products are the one place the two columns differ, and deliberately. `cross-industry` stays their only chip because the honest claim is that the constraint is the system landscape, not the sector; the vertical tabs beside it illustrate that claim on concrete estates named in the source material, and each of them leads with the `cross-industry` tab so the framing is read first.

Three keys — `energy`, `automotive`, `life-sciences` — are declared and currently unused. They exist because the source decks name adjacent verticals; do not delete them to tidy up.

### Industry imagery

Each key used by any `industryCases[]` entry needs one treated photograph at `assets/img/industries/<key>.jpg`. The file is keyed by industry, **not** by product, so one image serves every product whose tabs include it. Thirteen are in use today: `logistics`, `financial-services`, `manufacturing`, `professional-services`, `public-sector`, `construction`, `travel-transport`, `insurance`, `utilities`, `telecom`, `healthcare`, `retail`, `cross-industry`.

---

## 6. The icon registry — what to add to `assets/app.js`

All 24×24, stroke-only, matching the existing `ICONS` entries (the `.icon` class supplies stroke, width and colour). Paste these into the `ICONS` object.

### Semantic icons

```js
alert: '<path d="M10.3 3.9 2.7 17a2 2 0 0 0 1.7 3h15.2a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"></path><path d="M12 8.5v5M12 16.6v.4"></path>',
spark: '<path d="M12 3.5 13.8 9l5.7 1.8-5.7 1.8L12 18.3l-1.8-5.7L4.5 10.8 10.2 9z"></path><path d="m18.6 16.4.7 2.1 2.1.7-2.1.7-.7 2.1-.7-2.1-2.1-.7 2.1-.7z"></path>',
roi: '<path d="M4 18.5 9.5 13l3.5 3.2L20 8.5"></path><path d="M15.5 8.5H20v4.3"></path><path d="M3 21h18"></path>',
clock: '<circle cx="12" cy="12" r="8.5"></circle><path d="M12 7v5.3l3.4 2"></path>',
gauge: '<path d="M3.5 17a8.5 8.5 0 1 1 17 0"></path><path d="m12 17 4-5.5"></path><circle cx="12" cy="17" r="1"></circle>',
users: '<circle cx="9" cy="8.5" r="3.2"></circle><path d="M3 19.5a6 6 0 0 1 12 0"></path><path d="M16 6.2a3 3 0 0 1 0 5.6M17.5 19.5a5.8 5.8 0 0 0-2.2-4.3"></path>',
shield: '<path d="M12 3 4.5 6v6c0 4.2 3 7.6 7.5 9 4.5-1.4 7.5-4.8 7.5-9V6z"></path>',
trendUp: '<path d="M4 17 9.5 11.5l3.5 3.3L20 7.5"></path><path d="M15 7.5h5v5"></path>',
trendDown: '<path d="M4 7.5 9.5 13l3.5-3.3L20 17"></path><path d="M15 17h5v-5"></path>',
calendar: '<rect x="3.5" y="5" width="17" height="15.5" rx="2"></rect><path d="M3.5 10h17M8 3v4M16 3v4"></path>',
link: '<path d="M10 14a4.5 4.5 0 0 0 6.4 0l2.6-2.6a4.5 4.5 0 0 0-6.4-6.4L11 6.6"></path><path d="M14 10a4.5 4.5 0 0 0-6.4 0L5 12.6a4.5 4.5 0 0 0 6.4 6.4L13 17.4"></path>',
network: '<circle cx="12" cy="5" r="2.5"></circle><circle cx="5" cy="18" r="2.5"></circle><circle cx="19" cy="18" r="2.5"></circle><path d="M10.3 7.1 6.4 15.7M13.7 7.1l3.9 8.6M7.5 18h9"></path>',
inbound: '<path d="M12 3v12"></path><path d="m7 10 5 5 5-5"></path><path d="M4 20h16"></path>',
outbound: '<path d="M12 21V9"></path><path d="m7 14 5-5 5 5"></path><path d="M4 4h16"></path>',
trigger: '<path d="M20 12a8 8 0 1 1-2.4-5.7"></path><path d="M20.5 4v4.2h-4.2"></path>',
eye: '<path d="M2.5 12S6 6 12 6s9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z"></path><circle cx="12" cy="12" r="2.8"></circle>',
audit: '<rect x="5" y="3" width="14" height="18" rx="2"></rect><path d="M9 8h6M9 12h6M9 16h3"></path>',
```

### Industry icons

```js
"industry-manufacturing": '<path d="M3.5 20V11l5 3V11l5 3V7l5.5 4v9Z"></path><path d="M2.5 20h19"></path>',
"industry-logistics": '<rect x="2.5" y="7" width="10.5" height="9" rx="1.5"></rect><path d="M13 10h4l4 3.5V16h-8z"></path><circle cx="7" cy="18.3" r="1.7"></circle><circle cx="17" cy="18.3" r="1.7"></circle>',
"industry-utilities": '<path d="M13.2 2.5 5.5 13.2h5.6L10 21.5l7.8-11h-5.6z"></path>',
"industry-telecom": '<path d="M12 10.5v10"></path><circle cx="12" cy="8" r="2"></circle><path d="M7.5 3.5a7 7 0 0 0 0 9M16.5 3.5a7 7 0 0 1 0 9"></path>',
"industry-healthcare": '<rect x="3" y="3" width="18" height="18" rx="4.5"></rect><path d="M12 8v8M8 12h8"></path>',
"industry-financial-services": '<path d="M3 10h18M4 10 12 4l8 6M6.5 10v7M10 10v7M14 10v7M17.5 10v7M3 20.5h18"></path>',
"industry-insurance": '<path d="M12 3 4.5 6v6c0 4.2 3 7.6 7.5 9 4.5-1.4 7.5-4.8 7.5-9V6z"></path><path d="m9 12 2 2 4-4"></path>',
"industry-retail": '<path d="M5 8h14l-1 12H6z"></path><path d="M9 8V6a3 3 0 0 1 6 0v2"></path>',
"industry-energy": '<path d="M9 3v5M15 3v5"></path><path d="M6 8h12v3a6 6 0 0 1-12 0z"></path><path d="M12 17v4"></path>',
"industry-public-sector": '<path d="M6 21V3.5"></path><path d="M6 4h11l-2 3.6L17 11H6"></path>',
"industry-automotive": '<path d="M5 15.2 6.4 10A2 2 0 0 1 8.3 8.5h7.4A2 2 0 0 1 17.6 10L19 15.2"></path><rect x="3" y="15" width="18" height="4" rx="1.5"></rect><path d="M7 19v1.5M17 19v1.5"></path>',
"industry-life-sciences": '<path d="M10 3v6L4.6 18a2 2 0 0 0 1.8 3h11.2a2 2 0 0 0 1.8-3L14 9V3"></path><path d="M9 3h6M7.3 14h9.4"></path>',
"industry-professional-services": '<rect x="3" y="7" width="18" height="13" rx="2"></rect><path d="M9 7V5.2A2.2 2.2 0 0 1 11.2 3h1.6A2.2 2.2 0 0 1 15 5.2V7M3 12.5h18"></path>',
"industry-construction": '<path d="M4 16a8 8 0 0 1 16 0"></path><path d="M9.5 16V8.5a2.5 2.5 0 0 1 5 0V16"></path><rect x="2.5" y="16" width="19" height="3.5" rx="1.5"></rect>',
"industry-travel-transport": '<path d="M21 3 3 10.5l7 2.8L12.8 21z"></path><path d="m10 13.3 11-10.3"></path>',
"industry-cross-industry": '<circle cx="12" cy="12" r="8.5"></circle><path d="M3.5 12h17M12 3.5c2.4 2.5 3.6 5.4 3.6 8.5S14.4 18 12 20.5C9.6 18 8.4 15.1 8.4 12S9.6 6 12 3.5Z"></path>',
```

Industry keys in `content.js` are bare (`"manufacturing"`); the renderer prefixes `industry-` when it calls `UI.icon()`. That keeps the data readable and the registry namespaced.

---

## 7. The completeness rule, stated as a test

Every product object must satisfy all of the following. `tools/check-grammar.js` asserts it; run it after any edit to `content.js`.

| Slot | Requirement |
|---|---|
| `hero.image` | `{ file, alt, focal }`, all non-empty |
| `overview.problemSolution.problem` | `{ title, text, icon }`, all non-empty |
| `overview.problemSolution.solution` | `{ title, text, icon }`, all non-empty |
| `overview.metrics` | 1–4 tiles; each has `label`, `qualifier`, `icon`; `value` is a non-empty string **or** `null`. Four is the shape the rail is designed at; fewer is legitimate when a figure has been withdrawn (see `PROVENANCE.md` §14.1) and never a reason to keep an uncleared number on the page |
| `overview.metricsNote` | non-empty string |
| `overview.roi` | `{ icon, text }`, both non-empty |
| `overview.features` | 6–8 strings, each ≤ 12 words |
| `overview.steps` | 3–5 `{ n, title, text, image, features }`; `n === index + 1`; `text` ≤ 30 words; `image` is `assets/img/steps/<slug>-<n>.<ext>`; the union of `features` equals `overview.features`, no bullet twice, none missing |
| `overview.industryCases` | 3–6 `{ industry, label, image, problem, solution }`; `industry` in the set of 16 and unique; `label` matches `shared.industryLabels[industry]`; `image` is `assets/img/industries/<key>.<ext>`; `problem` and `solution` are 2–3 sentences each |
| `overview.sideFacts` | **absent** — the At-a-glance card was removed; the checker fails if it returns |
| `overview.featuresDetail` | ≥ 6 `{ title, body }` |
| `overview.industries` | **absent** — superseded by `industryCases` |
| `overview.industriesNote` | non-empty string |
| `overview.scope.in` / `.out` | ≥ 4 items each |
| `overview.moreDetail` | ≥ 3 `{ title, body }` |
| `overview.successStory` | present — `null`, or `{ customer, logo, headline, metrics ×2, story, downloadLabel }` with a caveat clause inside `story` |
| `technology.narrative` | ≤ 3 sentences |
| `technology.capabilities` | exactly 4 `{ stage, items }`; stages unique; ≥ 3 items each; `state`, where present, is `supported` or `roadmap` |
| `technology.stack` | 4–5 layers, keys a subsequence of `application` → `ai-engine` → `data-platform` → `infrastructure` → `custom`; `application`, `data-platform`, `infrastructure` and `custom` all present; `summary` one sentence; `vendors` non-empty from `oracle` / `nvidia` / `softserve`; every layer ≥ 1 item and ≥ 1 with `required: true`; `direction` only on `custom`, and that layer names at least one inbound and one outbound |
| `technology.groups` / `.layers` / `.integration` / `.notUsed` / `.flow` / `.security` | **absent** — all folded into `stack` and `capabilities` and deleted; the checker fails if one returns |
| `pov` | **absent** — superseded by `jumpstart` |
| `jumpstart.title` | exactly `Jumpstart Proof-of-Value` |
| `jumpstart.promise` | non-empty string |
| `jumpstart.pillars` | exactly 3, keys `fast` → `low-risk` → `tangible`, each `{ title, text }` |
| `jumpstart.outcomes` | 3–4 outcome lines |
| `jumpstart.timeline` | 3–4 `{ label, text }` |
| `jumpstart.needs` | exactly 3 |
| `jumpstart.investment` | `{ price, duration, includes ≥ 3, footnote }`; `footnote` is one line (≤ 2 sentences) |
| `jumpstart.next` | exactly 2, `Integration` then `Scale`, each with `text` and a `price` (`Scoped per engagement` where none is published) |
| `jumpstart.cta` | `{ label, route }`, routed at `#/products/<slug>/contacts` |

Site-level, asserted once rather than per product:

| Slot | Requirement |
|---|---|
| `shared.contact` | `{ name, title, email, photo, blurb, bringTitle, bring ×3 }`; `title` is a string and **may be empty**; `email` is exactly `oracle@softserveinc.com`; `blurb` is one sentence; `photo` is `assets/img/people/<name>.<ext>`, may be empty (initials fallback) and **ships filled**; `bring` is exactly three lines; `linkedin`, if present, is a public `linkedin.com` URL |
| `shared.productTabs` | carries `jumpstart` (with `legacyId: "pov"`) and `contacts` (with `legacyId: "demo"`), and neither a `pov` nor a `demo` tab id |
| `products[].oneLiner` | carries no packaging phrase — "packaged from proof of value", "from proof of value to enterprise scale", "fixed price", "quick start" all fail the build |
| `forms.demo.secondaryHeading` | non-empty — the heading the form takes under the contact card |

A slot that cannot be filled with a fact is filled with a **qualitative** instance — a `null`-valued metric tile, a `cross-industry` chip, a `Scoped per engagement` price. It is never left out, and it never renders an apology.

A **missing image file is a warning, not a failure.** Copy and imagery ship on separate tracks; the checker names each file that is not on disk yet so nothing is forgotten, and still exits 0.

---

## 8. Contacts tab and the contact card

`shared.contact` → `{ name, title, email, photo, blurb, linkedin? }`.

The tab formerly labelled **Request a demo** is now **Contacts**, at `#/products/<slug>/contacts`. `#/products/<slug>/demo` redirects to it (`legacyId: "demo"` on the tab), and every "Request a demo" control on a product page points at the contacts tab rather than at a form anchor. The header pill and the home-page CTAs are unchanged: they still open the standalone request form at `#/#request-a-demo`.

The tab is **two columns of equal height on desktop**, one column on mobile with the card first:

1. **LEFT — the contact panel**, a bounded surface (not a bare row of text): circular `photo` at the top, then `name`, `title`, a primary **mailto** button on `email`, the one-line `blurb`, and the three-line **Bring to the call** list from `bringTitle` + `bring[]`. `title` renders only when non-empty; an empty one leaves name + email, never a placeholder. `linkedin` renders only when the key exists.
2. **RIGHT — the request form**, headed `forms.demo.secondaryHeading` ("Or send a request") with `forms.demo.secondarySub` beneath it, and `labels.submitRequest` on the button. On Services the same slot takes `forms.contact.sub` and `labels.submitContact`, under the page's own `services.contact` heading.

`forms.engagementSteps` — the three-step "what happens next" block — renders **under the contact panel, in the left column**, outside the panel's border. It used to fill a copy column that no longer exists; it is what keeps the left column level with the form on the right, and it answers the question the panel raises ("what happens if I write?"). The two columns are `align-items: stretch`, so they are the same height on desktop and stack card-first below 900 px.

No stray empty panel on either side: the two columns are the whole section. The **same component** renders the Services page contact section, from the same object. One person, one address, one place to edit.

**The address is the practice mailbox, never a personal one.** `oracle@softserveinc.com` is what ships; the checker bans the string `ktram@` site-wide. A personal mailbox on a public page is a scraping target and an availability risk, and the person named here is a partnerships role rather than an inbox.
