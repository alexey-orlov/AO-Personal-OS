# VISUAL-GRAMMAR.md — one component grammar for all seven product pages

This file is the contract between `site/data/content.js` and the product renderer (`site/pages/product.js`). It answers one question: **what component renders each fact, and does it look the same on all seven products?**

The rule that produced it: a reader who has seen one product page must be able to read the next six without re-learning the layout. Same eyebrow treatment, same icon style, same card geometry, same order. Only the words change.

Three hard rules:

1. **Every product fills every slot.** No product is allowed to render a shorter Overview than another. Where a product has no published number, the slot is filled with a **qualitative** instance of the same component — never a blank, never a missing section, never a sentence apologising for the absence.
2. **A number never renders without the disclaimer beside it.** `metricsNote` renders as a footnote line directly under the metric row, in the same block. `pov.disclaimers[]` render as footnotes under the price table.
3. **Icons are 1.5px line icons, teal, from the one registry in `assets/app.js`.** No emoji anywhere. No filled icons except the existing `play` and `dot`.

---

## 1. Hero (top block) — every page

The hero is the only block that carries a background image.

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
3. `products[].hero.image.file` — the product's own hero image

A frame waiting for its recording lands on step 3, so it carries the product's own photograph; the hero backdrop is veiled harder on this layout so the card still reads as a card. The frame's own veil stays light enough to keep the poster a picture rather than a grey field — only the caption's corner is shaded.

A product with neither flag nor URL never renders an empty frame, a greyed play button, or a "video coming soon" line.

---

## 2. Overview tab — two columns, a fixed order in each

**Target: the Overview reads in ~1.5 desktop screens at 1440×900 without feeling cramped.** If a product exceeds that, prose moves into §2.7 — it does not stay on the page.

The tab is a **two-column layout on desktop**: a MAIN column at roughly two thirds, and a **sticky SIDE rail** at roughly one third, on the right. On mobile it is a single column and the side rail follows the main column.

| Column | Order |
|---|---|
| **MAIN** | §2.1 Problem ↔ Solution → §2.2 How it works (the stepper) → §2.3 Industry use cases (the tabs) → §2.7 More detail (one disclosure) |
| **SIDE rail** | §2.4 Outcomes & ROI → §2.5 At a glance → §2.6 Success story |

Nothing else is a top-level block. The old standalone key-features checklist, in-scope/out-of-scope pair, industry chip row and long-form feature list are all still in the data and all render **inside** §2.7 — the compactness target is met by moving prose, never by dropping a fact.

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

**Interaction.** Desktop: the step list sits left inside the MAIN column, the selected step's frame large on the right. Clicking a step highlights it and swaps the frame. Mobile: stacked, each step with its own frame under it. Step 1 is selected on load. The list is a keyboard-navigable set of buttons; the frame carries the step title as its accessible name.

### 2.3 Industry use cases — the tab component (MAIN)

`overview.industryCases[]` — **3–6 cases**, `{ industry, label, image, problem, solution }`. Heading from `sectionLabels.industryCases`.

A row of tabs, each an industry icon (§5) plus its label. The selected tab shows: a treated industry photograph (`assets/img/industries/<key>.jpg`), the industry name, then **The problem** and **The solution** — 2–3 sentences each, headed from `sectionLabels.caseProblem` / `caseSolution`.

- The images are keyed by **industry, not product**, so one file serves every product that uses that tab.
- First tab open by default. Tabs are a proper `role="tablist"`: arrow keys move, Enter/Space selects, the panel is labelled by its tab.
- The two Lakehouse products lead with the `cross-industry` tab, because "the same two pains in every industry, regardless of stack" is their honest answer; the vertical tabs beside it are illustrations of it, not a claim of vertical focus.
- The failure mode to watch: a `problem`/`solution` pair that would read identically under any other tab. If it would, it is not an industry case.

This block also **replaces the industry chip row** on the Overview. `overview.industries[]` and `industriesNote` are unchanged in the data and render inside §2.7.

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

In the rail the tiles **stack vertically** rather than sitting in a row — 3–4 tiles, then the `roi` callout, then `metricsNote` as the footnote line closing the block. All three stay in the same visual block: rule 2 of this file is that a number never renders away from its disclaimer, and a sticky rail that scrolls the figure past its footnote breaks it as surely as a missing footnote would.

**The heading follows the data.** When at least one tile carries a `value`, the block is headed `sectionLabels.metrics` ("Metrics improved"). When every tile is qualitative it is headed `sectionLabels.metricsPlanned` ("What the proof of value measures") instead — a heading asserting improvement over four tiles with no number, closed by a footnote saying no metrics are published, contradicts itself two lines later.

Three of the seven carry published figures; the other four are all-qualitative and still render a full block.

### 2.5 At a glance (SIDE rail)

`overview.sideFacts` → `{ category, platform, availability, povDuration, povPrice, povPriceNote? }`. Heading from `sectionLabels.atAGlance`.

A compact definition-list card: five label/value rows, labels from `sectionLabels.factCategory` / `factPlatform` / `factAvailability` / `factPovDuration` / `factPovPrice`. `povPriceNote`, where present, renders as a small line under the price row. The card closes with the `sectionLabels.povLink` link to that product's POV Jumpstart tab, where the full terms and the disclaimer stack live.

Every value is a denormalised copy of a fact that already exists elsewhere in the product object — the card is a summary, never a new claim. `povPrice` never carries a bare asterisk: an asterisk with no footnote in view is the defect this block was shaped to avoid.

### 2.6 Success story (SIDE rail)

`overview.successStory` renders as it does today (see `SCHEMA.md`), at the foot of the rail. The **Open the success story** control renders only when `SITE_CONFIG.products[slug].successStoryUrl` is non-empty; a product with `state: "none"` renders no block at all.

### 2.7 More detail — one collapsible disclosure (MAIN)

Collapsed by default, one control at the end of the MAIN column. Inside, in order:

1. `overview.moreDetail[]` — `[{ title, body }]`: the today/tomorrow pairs, the pattern definitions, the pull quotes, the per-persona "where it applies" paragraphs, the scope boundaries, the roadmap notes, the evaluation disclaimer.
2. `overview.scope` → in / out, the two compact lists, under `sectionLabels.scope`.
3. `overview.industries[]` + `industriesNote` — the icon chip row, under `sectionLabels.industries`.
4. `overview.featuresDetail[]` — the long-form feature list, under `sectionLabels.moreDetailFeatures`.
5. `overview.featuresNote?` — the asterisked caveat, where the product carries one. Only `workforce-optimization` does.

Nothing that reads as a wall of text sits above the fold. Equally, **nothing is dropped**: every one of those five is a shipped fact that used to have a top-level block, and the disclosure is where it went.
## 3. Technology tab

### 3.1 Narrative

`technology.narrative` — **three sentences maximum**, enforced. One paragraph, no heading beyond the eyebrow.

### 3.2 Flow diagram — identical geometry on all seven

`technology.flow` — **exactly four steps**, `[{ step, label }]`.

- `step` is the canonical stage name, set large: one of a small vocabulary per product (`Sources`, `Ingest`, `Extract`, `Mount`, `Reason`, `Optimize`, `Govern`, `Validate`, `Deliver`).
- `label` is the product-specific line under it, ≤ 10 words.

Render as inline SVG or a CSS flex row: four equal boxes, three connecting arrows, identical widths and heights on every product. The diagram is the same shape everywhere; only the words differ. Stacks vertically on mobile with the arrows rotated.

The canonical shape is **Sources → Ingest/Extract → Reason/Optimize → Deliver**. Step 2 and step 3 take the verb the product actually uses.

### 3.3 Component groups — vendor-marked columns

`technology.groups[]` — `{ vendor, label, items: [string] }`.

| `vendor` | Mark rendered above the group |
|---|---|
| `oracle` | `assets/img/oracle-wordmark-white.svg` |
| `nvidia` | `assets/img/nvidia-wordmark.svg` |
| `softserve` | `assets/img/softserve-wordmark-white.svg` |
| `other` | No mark — the `label` alone, in the same slot |

A product may have more than one `oracle` group (OCI, Autonomous AI Lakehouse, Fusion Applications). Render each as its own column with the same mark; `label` disambiguates. Items are short strings, one per line, no sentences.

`technology.notUsed[]` — an honest muted line under the columns: what the product deliberately does **not** use. Present on all seven; never dropped, never expanded into a card.

`technology.layers[]` is the four-tier layer cake carried forward from the one-pagers. Two products (both Lakehouse) have an empty array — render nothing rather than an empty table. Where present, it belongs below the groups, not above the flow.

`technology.governance?` — the two Lakehouse products. One band, same shape as the ROI band.

### 3.4 Integration and security — two icon-led lists

`technology.integration[]` and `technology.security[]` — both `[{ icon, text }]`. Two equal columns, each item an icon plus one line. Integration items conventionally use `inbound` / `outbound` / `trigger` / `link`; security items use `shield` / `lock` / `eye` / `audit`.

### 3.5 Media row

Unchanged: the mirrored media row beside ARCHITECTURE, driven by `media[slug]`.

---

## 4. POV Jumpstart tab

| Order | Component | Source |
|---|---|---|
| 1 | **Four-tile fact strip** | `pov.facts` → `{ duration, team, price, deliverablesCount }`. Four tiles of equal height: value large, label small. `deliverablesCount` renders as the number plus "deliverables". `price` reads `Scoped per engagement` where none is published — the tile is never empty. |
| 2 | **Deliverables checklist** | `pov.deliverables[]`, `check` icons, one column. Heading from `pov.deliverablesTitle` (default "Deliverables"). |
| 3 | **Price table** | `pov.pricing[]` as a small table; **`pov.disclaimers[]` render as footnotes directly beneath it**, all of them, in order. `pov.creditNote?` renders under the footnotes where present. |
| 4 | **The three-tier ladder** | `pov.ladder[]` — always exactly three, as three peer columns with **identical geometry**: same heading height, same `includes` list position, same duration and pricing rows at the bottom. `pov.ladderFootnote?` under it. |
| 5 | **One CTA** | `shared.preFlightGate`, `shared.credibilityBlock`, then `shared.engageLink` — unchanged. |

`pov.howItRuns?`, `pov.prerequisites?`, `pov.statNotes?`, `pov.capabilityMatrix?`, `pov.phases?`, `pov.gateNote?`, `pov.howMeasured?` are product-specific and render between 2 and 3 where present. They are the one place the POV tab is allowed to differ in length.

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

| Product | Industry keys |
|---|---|
| `account-insights` | logistics · financial-services · manufacturing · professional-services |
| `case-evidence-collection` | financial-services · manufacturing · professional-services · public-sector |
| `plan-vs-actual-investigation` | construction · manufacturing · professional-services · retail |
| `large-document-extraction` | travel-transport · professional-services · insurance · financial-services |
| `workforce-optimization` | manufacturing · utilities · telecom · healthcare |
| `cross-system-erp-qa` | cross-industry |
| `business-metrics-qa` | cross-industry |

Four keys — `energy`, `automotive`, `life-sciences` — are declared and currently unused. They exist because the source decks name adjacent verticals; do not delete them to tidy up.

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
| `overview.metrics` | 3–4 tiles; each has `label`, `qualifier`, `icon`; `value` is a non-empty string **or** `null` |
| `overview.metricsNote` | non-empty string |
| `overview.roi` | `{ icon, text }`, both non-empty |
| `overview.features` | 6–8 strings, each ≤ 12 words |
| `overview.featuresDetail` | ≥ 6 `{ title, body }` |
| `overview.industries` | ≥ 1 key, every key in the set of 16 |
| `overview.industriesNote` | non-empty string |
| `overview.scope.in` / `.out` | ≥ 4 items each |
| `overview.moreDetail` | ≥ 3 `{ title, body }` |
| `overview.successStory` | present |
| `technology.narrative` | ≤ 3 sentences |
| `technology.flow` | exactly 4 `{ step, label }` |
| `technology.groups` | ≥ 3, every `vendor` in `oracle` / `nvidia` / `softserve` / `other`, every group with ≥ 1 item |
| `technology.integration` / `.security` | ≥ 3 `{ icon, text }` each |
| `pov.facts` | `{ duration, team, price, deliverablesCount }`, all non-empty; `deliverablesCount === pov.deliverables.length` |
| `pov.deliverables` | ≥ 4 |
| `pov.pricing` | ≥ 2 |
| `pov.disclaimers` | ≥ 1 |
| `pov.ladder` | exactly 3, in the order proof-of-value → rollout → scaling |

A slot that cannot be filled with a fact is filled with a **qualitative** instance — a `null`-valued metric tile, a `cross-industry` chip, a `Scoped per engagement` price. It is never left out, and it never renders an apology.
