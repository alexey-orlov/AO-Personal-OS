# SCHEMA.md — the shape of `site/data/content.js`

`site/data/content.js` assigns one object to `window.SITE_CONTENT`. It holds every string the site renders. `site/data/config.js` (`window.SITE_CONFIG`) holds every URL, flag and address — see `CONFIG.md`. Nothing else in the site should carry copy.

Conventions used below:

- `string` — render as-is. Copy is final; it is not a template.
- `string?` — the key may be absent on some products. **Absent means the block does not render.** It never means "render a placeholder".
- `[]` — an array; an **empty** array means the section has no items and should render its empty state, not disappear silently where the spec asks for a container.
- Every `route` is a hash route ready to put in an `href`.

Three rules the renderers must hold to, because the copy depends on them:

1. **A number never renders without the disclaimer that sits beside it.** Where a block has `footnote`, `footnotes[]` or `disclaimers[]`, render them in the same visual block as the figures.
2. **Absence renders as an empty instance of the same component, or as nothing at all.** A missing price renders the component with its `emptyState` line — never a sentence saying the component is missing. But where absence has no honest content of its own — a marketplace listing, a seller material, a case study — the element does not render. A section whose only content is that there is no content is never shipped. The hero demo frame is the one deliberate exception, and only because it has honest content to show while it waits: a product flagged `video: true` in `SITE_CONFIG` renders the frame before the recording exists, and the click answers with `shared.videoPending` — when the recording is coming, and the live demo in the meantime.
3. **Every chip, badge and status label is data, not a class.** Read the label and the tooltip from `facets`, `shared.tagFamilies` and `shared.caseStudyStatus`; do not hard-code either. The three tag families are visually distinct on purpose (`VISUAL-GRAMMAR.md` §1.2) and each names itself on hover.
4. **Every product fills every grammar slot.** The seven product pages share one component grammar, documented in `VISUAL-GRAMMAR.md`. A product with no published number fills its metric row with *qualitative* tiles (`value: null`); it never renders a shorter page than its peers. `tools/check-grammar.js` enforces this.

---

## Top level

```
window.SITE_CONTENT = {
  site, media, disclaimers, shared,
  overview, productsPage, facets,
  products[], services, forms, sellerGate
}
```

---

## `site`

| Key | Type | Notes |
|---|---|---|
| `name`, `owner`, `title`, `tagline`, `metaDescription` | string | `title` goes in `<title>`; `metaDescription` in the meta tag. |
| `headerLockup` | `{ wordmark, wordmarkAlt, divider, productName }` | Image paths are relative to `site/`. The lockup is wordmark · hairline · plain-text product name. |
| `nav` | `[{ label, route }]` | Three items. The **Request a demo** pill is `primaryCta`, rendered separately at the right of the bar. |
| `primaryCta` | `{ label, route }` | |
| `dividerLabels` | `{ builtOn, whatWeBuild, proof, howWeProveIt, howWeEngage }` | Labels for the rule–label–rule divider. |
| `site.footer` | object | See below. |

### `site.footer`

| Key | Type | Notes |
|---|---|---|
| `heading`, `description` | string | |
| `contactCta` | `{ label, route }` | A bordered button, **not** a mailto. No email address is printed on any page. |
| `social` | `[{ label, url }]` | Four external links. |
| `legalLinks` | `[{ label, url }]` | |
| `legalLine` | string | Verbatim, no year. |
| `builtWith` | string | `Built with Oracle and NVIDIA` — the short line beside the logo row. |
| `trademarkLine` | string | Full trademark sentence. Render once, in the footer. |

---

## `media`

A map of **key → `{ diagram, alt }`** or **key → `{ src, alt }`**. Keys are the seven product slugs. `diagram` names an entry in `data/diagrams.js`, which is rendered inline as SVG at the site's own design tokens; `src` is a path to an image file relative to `site/index.html`, preferred over `diagram` when both are present. `alt` is a plain description, applied as the figure's `aria-label` for a diagram and as the image `alt` for a picture.

Used by the figure beside the narrative in the **Architecture** block of a product's Technology tab, and by nothing else. **No tile reads this map any more**: since round 3, D, both product grids render that product's own `hero.image` (see `VISUAL-GRAMMAR.md` §1.1), because a full architecture diagram is illegible at tile size and the two grids now share one anatomy. A missing key degrades cleanly — the Architecture block renders the narrative full width above the stack, with no empty frame.

---

## `disclaimers`

Flat map of reusable strings: `kpiTile`, `kpiTileTargets`, `packageTable`, `lakehousePricing`, `accountInsightsEvaluation`, `publicPricingFootnote`, `modeledResults`, `ladderFallback`. Products carry their own copies inside `jumpstart.investment.footnote`, `overview.metricsNote` and `overview.caseStudy.story` so a renderer never has to look up which disclaimer applies — this map exists for shared surfaces (the Services ladder) and for a single point of edit. `publicPricingFootnote` and `ladderFallback` were rewritten in round 3: the packaging-internal sentences they used to hold are banned site-wide.

---

## `shared`

| Key | Type | Notes |
|---|---|---|
| `preFlightGate` | `{ title, body }` | Carried for reference. Its content is node 1 of every product's `jumpstart.timeline`, so the Jumpstart tab does not print it twice. |
| `credibilityBlock` | `{ heading, items: [{ title, body }] }` | Same four items on every product page and on Services. |
| `engageLink` | `{ label, route }` | The single link out of each Jumpstart tab, to the Services ladder. |
| `productTabs` | `[{ id, label, locked?, legacyId? }]` | Tab bar order for every product page: `overview`, `technology`, `jumpstart`, `contacts`, `sellers`. `locked: true` draws the lock icon. The `id` is also the optional third route segment: `#/products/<slug>/<id>`. `legacyId` is a retired route segment the router must **redirect** to this tab, not render — `jumpstart` carries `legacyId: "pov"` and `contacts` carries `legacyId: "demo"`, so `#/products/<slug>/pov` lands on `…/jumpstart` and `…/demo` on `…/contacts`. Every "Request a demo" control on a product page points at the contacts tab. |
| `contact` | `{ name, title, email, photo, blurb, bringTitle, bring[3], linkedin? }` | The one named human on the site. Rendered as a bounded contact panel in the left column of the Contacts tab, and in the same two-column component on Services. `title` is a string and may be **empty** — it is printed only where a source states it; the card then renders name + email alone. `email` is fixed to the practice mailbox `oracle@softserveinc.com`; no personal mailbox is ever printed. `photo` is `assets/img/people/<name>.jpg`, rendered as a circle; it may be empty (the card falls back to an initials avatar) but **ships filled** since 2026-09-14, when Alex confirmed the headshot (`ASSETS.md` §3). `blurb` is one line saying what to get in touch about. `bring` is exactly **three** short lines — use case · data sources · timeline — headed by `bringTitle` ("Bring to the call"); it is what turns "get in touch" into a call someone can prepare for. `linkedin` is **omitted** unless a public LinkedIn URL exists in the sources — an absent key renders no link. |
| `tagFamilies` | `{ pattern, tech, availability }` | **Round 4, T1.** The three tag families the chip row renders, and the only place their tooltips and icon keys live. `pattern` is `{ tooltip: "Workflow pattern", icons: { <category id>: <icon key> } }` — the **outlined** chip, one entry per `facets.categories[].id`. `tech` is `{ tooltip: "Runs on", icons: { <facet id>: <icon key> } }` — the **solid navy** pill, one entry per `facets.technology[].id`. `availability` is `{ demo: { label, tooltip, icon }, marketplace: { label, tooltip, icon } }` — the two teal-tinted **badges**, driven by `SITE_CONFIG.products[slug].video` and `.marketplace` respectively, never by anything in this file. Icon keys are registry keys (none of these are in the registry yet; they are added to `ICONS` in `assets/app.js` — see `VISUAL-GRAMMAR.md` §6). |
| `caseStudyStatus` | map | **Round 4, C1.** `measured` / `in-progress` → `{ chip, tooltip }`. The status chip on a case study reads its label here; `overview.caseStudy.status` and `overview.caseStudies[].status` carry only the bare key. |
| `ladderColumns` | `[string]` | Column headers for the three-tier ladder on **Services**. No product page renders a ladder any more. |
| `heroAsideTitle`, `heroAsideFootLabel` | `string` | Carried for reference; no surface renders them since the product hero became a single-column block over its background image. |
| `videoCaption` | `string` | Caption printed on the hero video frame, and the label of the fallback "watch" button. |
| `demoCta` | `string` | Label of the secondary hero button that opens the interactive walkthrough in a new tab, and of the same button inside the pending-video panel. Rendered only where `SITE_CONFIG.products[slug].demoUrl` is set (`CONFIG.md` §3). |
| `videoPending` | `{ body, cta }` | The panel a demo frame opens while `SITE_CONFIG.products[slug].videoUrl` is still empty and `video` is `true`. `body` says the recording is being prepared; `cta` labels the primary button, which goes to `#/products/<slug>/demo` and closes the panel. The product name is the panel's heading and comes from the product, not from here. Never write a date into `body`: the copy has to stay true on the day it is read. |
| `industryLabels` | map | The sixteen fixed industry keys → display label. A product's `overview.industryCases[].industry` holds a bare key; the renderer looks the label up here and the icon up as `industry-<key>`. No product may use a key absent from this map. |
| `sectionLabels` | map | The standing headings of the visual grammar — the Overview, Technology and Jumpstart section titles that are the same on all seven products (`metrics`, `metricsPlanned`, `roi`, `scope`, `scopeIn`, `scopeOut`, `moreDetail`, `moreDetailFeatures`, `architecture`, `stack`, `capabilities`, `stateSupported`, `stateRoadmap`, `howItWorks`, `industryCases`, `caseProblem`, `caseSolution`, `outcomes`, `caseStudy`, `layerRequired`, `layerOptional`, `directionInbound`, `directionOutbound`, `contacts`, `jumpstartOutcomes`, `jumpstartTimeline`, `jumpstartNeeds`, `jumpstartInvestment`, `jumpstartScoped`, `jumpstartNext`). Product-specific headings stay in the product object — the Jumpstart block title is `jumpstart.title`. Keys removed with the blocks they headed: `features`, `components`, `integration`, `industries`, `notUsed` (earlier rounds), in round 3 `flow`, `security`, `atAGlance`, `fact*`, `povLink`, `povHeading`, `povFact*`, `deliverables`, `pricing`, `terms`, `matrix`, `ladder`, `povScopeIn`, `povScopeOut`, `povRollout`, `povPhases`, `povMeasured`, and in round 4 `successStory`, which became `caseStudy`. |
| `materialStates` | map | `state` value → button label for seller materials. |

---

## `overview`

| Key | Type | Notes |
|---|---|---|
| `hero.image` | `{ file, alt, focal }` | The hero background image. `file` is relative to `site/index.html`, `focal` is a CSS `object-position`. Mirrors the entry in `site/assets/img/heroes/heroes.json` — keep them in sync. See `VISUAL-GRAMMAR.md` §1. |
| `hero.headline` | `{ accent, rest }` | `accent` renders in teal, `rest` in white, one H1. |
| `hero.subhead` | string | |
| `hero.ctas` | `[{ label, route, kind }]` | `kind` is `primary` or `secondary`. |
| `hero.stats` | `[{ value, label }]` | Four tiles, one number and one label each. |
| `trustStrip` | `{ dividerLabel, logos: [{ name, file }] }` | Render the logos monochrome grey. |
| `productsIntro` | `{ title, count, body, cta }` | `count` fills the count chip. |
| `caseStudiesIntro` | `{ title, body, cta }` | Heads the case-study screen. |
| `caseStudies` | `[CaseStudyCard]` | **Exactly four**, one per engagement, in the order the screen lists them. See below. |
| `servicesTeaser` | `{ title, body, platforms: [{ name, body }], secondParagraph, cta }` | |

### `CaseStudyCard`

Round 4, C2. The home page's case-study screen and the Services proof block render the **same four cards**, in the same compact anatomy as the full callout on the product page: industry medallion → descriptor → status chip → one metric with its eyebrow → one line → the link to the product. **No customer is named and no logo is rendered** (Alex, 2026-09-16).

| Key | Type | Notes |
|---|---|---|
| `id` | string | Referenced by `services.proof.caseStudyIds`. |
| `descriptor` | string | The **anonymized customer descriptor** — industry and scale only, e.g. *"A global home-appliance manufacturer"*. Must equal the matching product's `overview.caseStudy.descriptor`. |
| `area` | string | The operational area, e.g. *"Ground-handling contract management"*. Must equal the product's `overview.caseStudy.area`. |
| `industry` | string | One of the sixteen fixed industry keys. Drives the **medallion** icon (`industry-<key>`) that sits where a logo used to. Must equal the product's `overview.caseStudy.industry`. |
| `status` | `"measured"` \| `"in-progress"` | Drives the status chip, whose label comes from `shared.caseStudyStatus`. Must equal the product's. |
| `metricEyebrow` | string | `Measured` when `status` is `measured`, `Target outcomes` when it is `in-progress`. The checker asserts the pairing: a target labelled *Measured* is the one failure that would matter. |
| `metric` | `{ value, label }` | **One** headline figure — the first of the product page's two. `value` is ≤ 18 characters and may be a short qualitative phrase (*"Hours, not weeks"*) where no figure is published. |
| `line` | string | One sentence: what was done. |
| `footnote` | string | **Mandatory.** The caveat that travels with the figure — rule 1. On an in-progress card it also says the figure is a target, not a result. |
| `product` | `{ slug, name }` | Links to the product page. `name` must equal `products[slug].name`, and that product's `overview.caseStudy` must be non-null. |

`customer`, `logo`, `logoStacked`, `band` and `label` are **removed**; `check-grammar.js` fails if any of them returns. The band 1 / band 2 split and the `PROOF OF VALUE` / `FIRST ENGAGEMENT` / `METHOD` labels went with them: the status chip carries that distinction now, in two states rather than three, and it is driven by data rather than by a hand-written label. The two `METHOD` cards were folded — the like-for-like measurement rule already lives in `workforce-optimization`'s `moreDetail`, and the accuracy-journey line survives as `services.proof.methodNote`, one paragraph under the four cards.

---

## `productsPage`

`{ title, count, intro, searchPlaceholder, bottomBlock: { heading, body, cta } }`.

---

## `facets`

| Key | Type | Notes |
|---|---|---|
| `technologyLabel`, `categoryLabel`, `allLabel`, `clearLabel`, `noResults` | string | UI chrome for the facet rail. |
| `technology` | `[{ id, label, fullLabel, description, emptyState }]` | **Four entries, in this order:** `oci-nvidia`, `oracle-ai-data-platform`, `oracle-autonomous-ai-lakehouse`, `other`. `label` is the compact form for the rail and for tile tags; `fullLabel` is what goes on a product hero and in any place a reader could mistake it for a product name — carry `fullLabel` as the `title` attribute on the short form. Two facets currently match no product; render `emptyState` inside the normal grid container, never a blank grid. |
| `categories` | `[{ id, chip, full }]` | Three. `chip` on tiles and filters, `full` in tooltips and long copy. |
| `availability` | `{ label, options: [{ id, label }] }` | **Round 4, T2.** The rail's Availability group — exactly two checkboxes, `demo` then `marketplace`, with faceted counts. `demo` filters on `SITE_CONFIG.products[slug].video === true`, `marketplace` on `.marketplace === true`; the query params are `demo=1` and `mp=1`, and **Clear filters** resets both. The **badge** labels and tooltips are not here — they are in `shared.tagFamilies.availability`, because the badge and the checkbox are two surfaces of one flag and one of them had to own the strings. |

`facets.marketplace` (`{ label, badge, heroCta }`) is **removed**. Its `heroCta` went with it: the Marketplace badge in the hero chip row is the link to the listing now, so a second hero button pointing at the same URL was one control too many. The listing link still renders only where `marketplaceUrl` is non-empty; the badge itself renders on the `marketplace` boolean, and a `marketplaceUrl` set while that boolean is `false` is a build failure.

---

## `availability` — **removed** (round 4, T1)

The three-state chip (*Available now* · *Fixed-price offer* · *In preparation*) is gone, along with the per-product `availability`, `availabilityChip` and `availabilityTooltip` keys and the availability strings that used to sit at the end of each `tags` array. `check-grammar.js` fails if any of them returns.

What replaced it, and why: the chip asserted a *sales state* a customer has no way to act on, and it had to be kept in sync with the config flags that decide whether a demo or a listing actually exists. The two **availability badges** — `Demo` and `Oracle Marketplace` — are read straight off those flags, so they cannot disagree with the thing they claim. The one state the badges cannot express is the absence of a package, and that survives as `products[].statusNote`, a muted line under the hero one-liner on the two unpackaged products only.

---

## `products[]`

Seven entries, in the order the Products page should list them:
`account-insights`, `case-evidence-collection`, `plan-vs-actual-investigation`, `large-document-extraction`, `workforce-optimization`, `cross-system-erp-qa`, `business-metrics-qa`.

### Identity and tile

| Key | Type | Notes |
|---|---|---|
| `slug` | string | Route: `#/products/<slug>`. Also the key into `SITE_CONFIG.products`. |
| `name` | string | |
| `headline` | `{ accent, rest }` | Product H1; `accent` renders teal. |
| `category` | string | A `facets.categories[].id`. |
| `categoryChip` | string | The chip text, denormalised. |
| `facet` | string | A `facets.technology[].id`. |
| `oneLiner` | string | The tile description and the hero lead, and the one string both surfaces share. It is a **product statement**: what the thing does, for whom, with what outcome. The packaging story is not allowed in it — `check-grammar.js` fails the build on "packaged from proof of value", "from proof of value to enterprise scale", "fixed price", "quick start" and their kin, because a reader who meets the product here should learn what it is, not how it is sold. Every claim in it must be traceable to a shipped one-pager; an unsupported clause is **dropped**, never swapped for a new claim. |
| `statusNote?` | string | **Round 4, T1.** One muted line under the hero one-liner, on the **two unpackaged products only** (`case-evidence-collection`, `plan-vs-actual-investigation`): *"Packaged offering in preparation — scoping conversations are open."* It is a status line, not a chip, and no other product carries it — a fifth product saying nothing about its state is the correct rendering, because its badges say what there is. |
| `subLine?` | string | A second hero line where the one-liner is very short. No product carries one today — `account-insights` lost its when the one-liner was rewritten to carry the whole statement. |
| `heroLine?` | string | A short slogan that heads the hero above the name (two Lakehouse products). Takes precedence over `heroCaption` if both are set. |
| `hero` | `{ image: { file, alt, focal } }` | The product hero's background image. Same contract as `overview.hero.image`. Required on all seven. |
| `heroCaption?` | string | An alternative to `heroLine`, for products that carry a short line rather than a slogan. Rendered in the **same slot and the same `.eyebrow.eyebrow--accent.hero-line` treatment** as `heroLine`, so every product hero has one shape. A product sets one or the other, never both. |
| `badges?` | `[string]` | Small uppercase hero badges (two Lakehouse products). |
| `tags` | `[string]` | The technology-family pills, in order. Facts, not toggles. Entry 0 repeats `categoryChip` and entry 1 repeats the facet `label`, so a renderer that builds the chip row from `category` and `facet` (§1.2 of `VISUAL-GRAMMAR.md`) must **skip the first two** rather than emit a third undifferentiated run of the same two strings; the rest (`AI-Q`, `cuOpt`, `Oracle Field Service`, `Select AI`) are the extras only this array carries. **No availability string may appear here** — *Available now*, *Fixed-price offer* and *In preparation* were removed in round 4 and `check-grammar.js` fails if one returns. |
| `tile.outcomes` | `[string]` | Exactly three outcome bullets. |

**One hero shape on all seven products.** The slots render in a fixed order and an unset one simply does not render: breadcrumb → `heroLine`/`heroCaption` → `headline` → chip row (pattern chip and technology chip left, availability badges right) → `oneLiner` → `statusNote` → `subLine` → `badges` → CTA row. **The CTA row is always last** — nothing is appended below the primary action, so "Request a demo" is the last thing in every hero.

### `overview`

**The Overview tab follows the fixed component grammar in `VISUAL-GRAMMAR.md`. Every product fills every slot** — a product with no published number fills its metric row with qualitative tiles rather than rendering a shorter page. The tab is two columns on desktop (MAIN + a side rail whose At-a-glance card pins) and one column on mobile; `VISUAL-GRAMMAR.md` §2 owns which key renders in which column. None of the keys below is optional.

| Key | Type | Notes |
|---|---|---|
| `problemSolution` | `{ problem: { title, text, icon }, solution: { title, text, icon } }` | The paired two-panel strip. `text` is 1–2 sentences per panel; `icon` is an icon-registry key (today `alert` / `spark` on all seven). |
| `metrics` | `[{ value, label, qualifier, icon }]` | 1–4 stat tiles — four is the designed shape, fewer where a figure has been withdrawn for clearance (`PROVENANCE.md` §14.1). **`value: null` is a qualitative tile** — the icon renders at display size where the number would be, and the tile keeps its height so the row stays level. `value` as a string is ≤ 20 characters. `qualifier` is the baseline or caveat, ≤ 14 words. |
| `metricsNote` | string | **Mandatory on every product.** Renders as one footnote line under the metric row, in the same block. Carries the disclaimer that travels with the figures, or the honest "no published metrics yet" line where there are none. |

**The section heading follows the data.** When at least one tile carries a `value`, the block is headed `sectionLabels.metrics` ("Metrics improved"). When every tile is qualitative, it is headed `sectionLabels.metricsPlanned` ("What the proof of value measures") instead — a heading asserting improvement over four tiles with no number, closed by a footnote saying no metrics are published, contradicts itself two lines later, and it is the first claim a seller lands on in a live demo.

| `roi` | `{ icon, text }` | One callout band, 1–2 sentences. |
| `features` | `[string]` | 6–8 items, **each ≤ 12 words**. Not rendered as a block of their own: each one belongs to exactly one `steps[]` entry and renders under that step in the How-it-works stepper. |
| `featuresNote?` | string | An asterisked caveat, rendered at the end of the More-detail disclosure. Only `workforce-optimization` carries one. |
| `featuresDetail` | `[{ title, body }]` | The long-form feature list from the shipped one-pagers. Renders inside the More-detail disclosure, so no fact is lost. |
| `industriesNote` | string | One line closing the industry-tab block: who this is for, beyond the tabs. Present on all seven. (`overview.industries[]` — the icon chip row — is **deleted**: every key it held was already a tab, so it told the same verticals twice. `check-grammar.js` fails if it reappears.) |
| `scope` | `{ in: [string], out: [string] }` | Two compact side-by-side lists, 4–6 items each, ≤ 14 words each. Renders inside the More-detail disclosure. |
| `steps` | `[{ n, title, text, image, features }]` | **3–5 workflow steps** — the "How it works" stepper that replaced the flat key-features checklist. `n` is the 1-based position and must equal the array index + 1. `text` is ≤ 2 lines (≤ 30 words). `image` is `assets/img/steps/<slug>-<n>.jpg` — a real product screenshot where one exists, otherwise a designed step illustration in the same 16:10 frame. `features` holds the **exact strings** from `overview.features` that belong to this step: the union across steps must equal `overview.features`, with no bullet in two steps and none left out. That invariant is what lets the stepper replace the checklist without losing a fact. |
| `industryCases` | `[{ industry, label, image, problem, solution }]` | **3–6 cases**, rendered as the industry tab component. `industry` is a key from the fixed set of 16; no key appears twice. `label` must equal `shared.industryLabels[industry]`. `image` is `assets/img/industries/<key>.jpg` — keyed by industry, so the file is **shared across products**. `problem` and `solution` are 2–3 sentences each, specific to that industry *and* this product; a generic paragraph that would read the same under any tab is the failure mode here. The first tab is open by default. |
| `moreDetail` | `[{ title, body }]` | The collapsible disclosure at the end of the tab. Everything that used to be a prose block above the fold lives here: today/tomorrow, the pattern, pull quotes, per-persona "where it applies" paragraphs, scope boundaries, roadmap notes, evaluation disclaimers. ≥ 3 entries. With the compact Overview (§2 of `VISUAL-GRAMMAR.md`) the disclosure also absorbs `scope` and `featuresDetail`. An entry that repeats a vertical the `industryCases` tabs already cover does not belong here — one telling per vertical, per product. |
| `caseStudy` | object **or `null`** | The dark case-study callout — see below. |

**`overview.sideFacts` is deleted.** The At-a-glance card went with it (round 3, H): every value on it was a denormalised copy of a fact printed elsewhere on the same page — the chips, the Jumpstart investment card, the stack — so it was a second place to keep in sync and the first to drift. The side rail now holds Outcomes & ROI alone. `check-grammar.js` fails if the key reappears.

#### `overview.caseStudy`

**Round 4, C1** — `overview.successStory` renamed and reshaped. **`null` on three of the seven.** The key is always present; it is `null` wherever no engagement ships, and the block then does not render at all. There is no empty state: a case-study section whose only content is "nothing published yet" is worse than its absence on a page sellers demo live in front of a customer.

**No customer is named and no logo is rendered** (Alex, 2026-09-16). Each case identifies its customer by an **anonymized descriptor** — industry and scale only — and an **industry medallion** (a circle carrying the `industry-<key>` line icon) sits where a logo used to.

| Key | Type | Notes |
|---|---|---|
| `descriptor` | string | Industry and scale, no name, no country, nothing that narrows the label to one company — e.g. *"A global home-appliance manufacturer"*, *"An international airline"*. It is the callout's title. |
| `area` | string | The operational area, one short line under the descriptor: *"Field-service operations across three countries"*, *"Ground-handling contract management"*. |
| `industry` | string | One of the sixteen fixed industry keys. Picks the medallion icon (`industry-<key>`) **and** must match the `image` filename. |
| `image` | string | `assets/img/industries/<industry>.jpg` — the header band of the callout, under a dark gradient. Keyed by industry, so the file is shared with the industry tabs. |
| `status` | `"measured"` \| `"in-progress"` | Picks the status chip from `shared.caseStudyStatus` — *"Measured in the proof of value"* or *"Proof of value in progress"*. |
| `metricsEyebrow` | string | `Measured` for a `measured` case, `Target outcomes` for an `in-progress` one. The checker asserts the pairing. |
| `metrics` | `[{ value, label }]` | **Exactly two**, set as big figures. `value` ≤ 18 characters. Where a case publishes no figure, `value` is a short **qualitative target** (*"Hours, not weeks"*, *"Evidence-backed"*) — **never an invented number**. Neither metric may repeat a side-rail tile on the same tab. |
| `story` | string | Two to three sentences: what was done, on what data, with which stack — **closing with the caveat sentence that qualifies the figures**. The callout has no footnote row of its own, so rule 1 of `VISUAL-GRAMMAR.md` is satisfied inside `story`; `check-grammar.js` fails a story with no *illustrative* / *modeled simulations* / *not contractual* clause. On an in-progress case that sentence also says the figures are targets, not results. |
| `scope` | `[{ label, value }]` | **Exactly three** facts, rendered as a compact row: duration, data footprint, constraint count, the human gate — whatever is external-safe for that engagement. **No contract value, no contract duration, no headcount, no € figure**, and nothing the research marks internal. |
| `ndaLine` | string | The footer line. *"Customer under NDA · reference call available on request"* on a measured case; *"Customer under NDA · results follow at the end of the proof of value"* on one in progress, because a reference call about a proof of value that has not produced results is not a thing to offer. |
| `downloadLabel` | string | Label of the link out. **Renders only when `SITE_CONFIG.products[slug].successStoryUrl` is non-empty**; otherwise no control renders in its place. |

`customer`, `logo` and `logoStacked` are **removed** and `check-grammar.js` fails if any of them returns.

**No € figure from a customer's business case may appear here** — no contract values, headcounts, salaries or operating baselines. Ratios, durations and counts only.

The block renders as a **dark surface-level panel with a 3px teal left rule**, in the MAIN column after the industry use cases — not a white band, and not in the side rail. Anatomy: image header band → medallion + descriptor + area → status chip → two big metrics under their eyebrow → story → scope row → NDA line → the optional download link.

### `technology`

| Key | Type | Notes |
|---|---|---|
| `narrative` | string | **Two short sentences, ~40 words maximum.** One paragraph, at the head of the Architecture block. The layered stack directly beneath it carries the detail. |
| `stack` | `[{ key, label, summary, vendors, items }]` | **The layered solution stack — the block the Technology tab renders below the flow diagram.** 4–5 accordion rows, top → bottom, in the fixed order `application` → `ai-engine` → `data-platform` → `infrastructure` → `custom`. A layer may be **omitted** (the two Lakehouse products have no `ai-engine`: NVIDIA is not required there) but never re-ordered, and `application`, `data-platform`, `infrastructure` and `custom` are present on all seven. `summary` is **one sentence** — the collapsed row. `vendors` is a non-empty array of `oracle` / `nvidia` / `softserve` and selects the wordmark(s) on the row. `items` is `[{ name, required, note?, direction? }]`; `required` is a real boolean rendering as the **Required / Optional** tag, and every layer carries at least one `required: true`. `note` is a **short second chip** beside that tag (e.g. `After the Jumpstart`) — never a caption hanging under the row, and never package-ladder vocabulary: a product page's own next step is the Jumpstart's *Integration* card, so "Roll-out scope" has no referent there. `direction` is `inbound` / `outbound` / `both`, is only legal on the `custom` layer, and is what turns the old `integration` list into separate **Inbound** and **Outbound** lines inside that layer. The custom layer always names at least one inbound and one outbound item. |
| `governance?` | `{ title, body }` | The two Lakehouse products. One band below the accordion. |
| `capabilities` | `[{ stage, items: [{ name, state? }] }]` | **Exactly four stage groups**, in workflow order — the same four stages the product's `overview.steps` walk through, named in the product's own vocabulary (`Classification & routing` · `Extraction` · …). `items` is that stage's complete capability list, ≥ 3 per stage; the four groups together must cover every feature the product page claims anywhere. `state` is `supported` or `roadmap` and is **omitted** unless a shipped capability matrix states one — today only `workforce-optimization` carries states, because its accelerator-pack one-pager is the only matrix whose legend defines a roadmap tier. A guessed tag is worse than no tag. |

**`groups`, `layers`, `integration`, `flow` and `security` are gone.** The vendor-marked component columns, the four-tier layer table and the integration list were three views of one architecture; `stack` is that architecture, read top to bottom. `flow` went with the How-it-runs diagram in round 3 — the stack is the flow, drawn once — and `security` went with the Security-and-deployment block, its facts folded into the layer summaries, the scope lists and the Jumpstart `low-risk` pillar. `check-grammar.js` fails if any of the five comes back: a re-introduced key would render nowhere and drift out of sync in silence.

**The Technology tab is exactly two blocks:** `narrative` + `stack` under *Architecture*, then `capabilities` under *Capabilities*.

### `jumpstart`

Renders the **Jumpstart** tab (`#/products/<slug>/jumpstart`; `…/pov` redirects to it). Product-marketing shape: fast · low-risk · tangible, in one screen, identical on all seven.

| Key | Type | Notes |
|---|---|---|
| `title` | string | Always `Jumpstart Proof-of-Value` — the block title, not the tab label. |
| `promise` | string | One line: pilot *this product* on your own data, in *this* duration, at *this* price, and take away *this* result. Only a duration or price the research supports; otherwise the sentence says the scope is agreed at scoping rather than inventing one. The product noun is **lowercase** mid-sentence — a capitalised name there reads as an unresolved merge field — and **the closing clause is written per product**: seven lines ending on the same six words is the template tell a seller sees the moment they flip between two tabs in a live demo. |
| `durationShort?` | string | The duration in its shortest honest form (`2 months`, `30–45 days`). Interpolated into `sellerGate.cta.body` at `{duration}`; never rendered on its own. **Omit it** where the duration is `Scoped per engagement` — there is no short form of "we do not publish one", and the CTA then uses `sellerGate.cta.bodyFallback`. |
| `pillars` | `[{ key, title, text }]` | **Exactly three, in this order:** `fast` (kickoff to result), `low-risk` (fixed scope and price, your tenancy, no production change — only the claims the research supports for that product), `tangible` (the headline outcome). Equal cards in one row, each with an icon. |
| `outcomes` | `[string]` | 3–4 **customer outcomes**, not deliverables: "An optimized four-week plan for one region, measured against your current plan", not "a plan document". Heads the left column, under `sectionLabels.jumpstartOutcomes`. |
| `timeline` | `[{ label, text }]` | 3–4 nodes, week-by-week, under `sectionLabels.jumpstartTimeline`. Node 1 is the pre-flight gate wherever the product has one. |
| `needs` | `[string]` | **Exactly three** short asks — data access, a business owner, sample material — per product. |
| `investment` | `{ price, duration, includes: [string], footnote }` | The price card. `price` and `duration` are each **a string or `null`** — `null` where nothing is published. Where **both** are `null` the card prints one line (`sectionLabels.jumpstartScoped`, "Scope, price and duration are set in scoping.") and no footnote, because two tiles repeating the same placeholder read as an unfilled template, not an investment; where one is known the card prints the figures it has. `includes` is ≥ 3 lines; `footnote` is **one line** — `Figures are illustrative and confirmed in scoping.`, or the single legally necessary line a one-pager prints (the Lakehouse pair keeps *"Price indicative, to be confirmed per scope. All features used are generally available product."*), or the honest "no package price is published yet" sentence. Never a stack of disclaimers. |
| `next` | `[{ tier, text, duration?, price? }]` | **Exactly two**, `Integration` then `Scale` — one line each, with the duration and price where a one-pager states them and `Scoped per engagement` where it does not. This replaced the three-column ladder: the Jumpstart tab is about the Jumpstart, and the ladder's third column was the tab the reader is already on. |
| `cta` | `{ label, route }` | `Start a Jumpstart conversation`, routed at that product's **contacts** tab. |

**The packaging-internal disclaimers are removed site-wide.** "Framed scope, flexible add-ons", "Each package's price and timing are set by specific constraints", "Custom features beyond the frame are added for additional price and time" and their kin describe how SoftServe builds a quote, not what a customer gets; `check-grammar.js` fails the build on those strings. What survives is one footnote per price card, plus the KPI caveats that travel with published figures.

After the Jumpstart block, the tab still renders `shared.credibilityBlock` and `shared.engageLink`; `shared.preFlightGate` is carried for reference — its content is node 1 of every product's `timeline`.

### `sellers`

| Key | Type | Notes |
|---|---|---|
| `materials` | `[{ key, title, description, state }]` | `key` is the lookup into `SITE_CONFIG.products[slug].materials`. A non-empty URL there renders an enabled Download; an empty one renders a disabled control labelled from `shared.materialStates[state]`. A row with `state: "superseded"` stays disabled regardless of URL. |
| `emptyPanelCopy?` | string | Shown above the list where every row is unavailable. |
No `notes` key. **Seller-facing commercial notes are not part of this file.** They are fetched after the gate passes from `SITE_CONFIG.sellerGate.notesUrl` — see `CONFIG.md` §2 — because the gate is a localStorage flag and anything in `content.js` is one view-source away from the customer being quoted. The panel renders a **Seller notes** block (heading from `sellerGate.notesHeading`) only when that fetch returns lines for the product.

---

## `services`

| Key | Type |
|---|---|
| `hero` | `{ image: { file, alt, focal }, headline: { accent, rest }, lead, secondParagraph, stats, platformsTitle, platforms: [{ name, short, long }], cta }` — `image` is the hero background, same contract as `overview.hero.image` |
| `whatWeDo` | `{ title, lead, layering: [{ band, body }], familiesTitle, families: [string], familiesSuffix, solutionStack: { title, layers: [{ layer, providedBy }] }, whoYouWorkWith, whoDeliversIt, wrapAroundServices: { title, items: [{ title, body }] }, attachesToEvery }` |
| `howWeEngage` | `{ title, anchor, lead, ladder: [{ tier, title, whatItIs, duration, pricing }], ladderRules: [string], ladderFootnote, howAPovRuns: { title, steps: [{ title, body }], closing } }` |
| `whySoftServe` | `{ title, items: [{ title, body }] }` |
| `proof` | `{ title, dividerLabel, evidenceIds: [string] }` — render the matching `overview.evidence` cards; band 1 at full size, then band 2 under the divider. |
| `contact` | `{ anchor, heading, sub }` |

The `families` list is the only place the pattern taxonomy appears on the site. Do not restate it on the Products page.

---

## `forms`

One field set serves both forms. Fields, in order: **full name · work email · company · I am a… · product of interest · message · consent.**

| Key | Type | Notes |
|---|---|---|
| `roles` | `[{ value, label }]` | Four options; render as radios. `value` is what goes in the payload. |
| `roleLabel` | string | |
| `consent` | `{ label, linkLabel, linkUrl }` | Required checkbox. Render `linkLabel` inside `label` as a link to `linkUrl`. |
| `productPlaceholder` | string | The extra option in the product select, alongside the seven product names. On a product page the select is pre-filled with that product and stays editable. |
| `labels` | map | Field labels, the message placeholder, submit labels and the two validation messages. |
| `demo`, `contact` | `{ anchor, heading, sub, submitLabel }` | The two form instances. A surface that already prints the heading renders the form with its own head suppressed, so the heading appears once. |
| `demo.secondaryHeading`, `demo.secondarySub` | string | The heading the **same** demo form takes when it renders in the **right column beside** the contact panel on a product's Contacts tab — "Or send a request" (round 3, C: two columns of equal height on desktop, stacked card-first on mobile). `heading` / `sub` stay as they are, because that instance still heads the standalone request form on the home page. Two headings for one form because the form has two jobs: the primary ask on the home page, the fallback path behind a named human on a product page. The Contacts instance also passes `labels.submitRequest` ("Send the request") as `FORMS.render`'s `submitLabel`, so the button agrees with the heading above it and with the tab it sits on; the home-page instance keeps `labels.submitDemo`. |
| `engagementSteps` | `{ title, steps: [{ title, body }], responseLine }` | The three-step "what happens next" block. It renders **under the contact panel in the left column** of the two-column contact section (`VISUAL-GRAMMAR.md` §8) on both surfaces, and in the copy column of the home page's standalone request block. |
| `confirmations` | `{ posted, mailto, contactPosted, error }` | Each `{ title, body }`. Pick by outcome: `posted` after a successful POST to `SITE_CONFIG.formEndpoint`; `mailto` after composing a `mailto:` because the endpoint is empty; `contactPosted` for the Services form; `error` on failure. **Never show a success confirmation for an action that did not happen.** |

---

## `sellerGate`

| Key | Type | Notes |
|---|---|---|
| `heading`, `lockedBody`, `accessNote` | string | `accessNote` is the one-line note under the input. |
| `emailLabel`, `emailPlaceholder`, `unlockLabel`, `lockLabel`, `rejected` | string | |
| `linkPendingLabel`, `downloadLabel`, `unlockedIntro` | string | |
| `notesHeading` | string | Heading of the seller-notes block. The notes themselves are **not in this file** — they are fetched from `SITE_CONFIG.sellerGate.notesUrl` after the gate passes. |
| `cta` | `{ heading, body, bodyFallback, contactLabel, action }` | `body` carries the `{duration}` placeholder, filled from that product's `jumpstart.durationShort`; `bodyFallback` is used when a product has none. `contactLabel` is a **role alias**, not a person and not an address. `action` opens the demo form with the product pre-selected and `I am a…` pre-set to `oracle-seller`. |

The gate checks the domain of the entered email against `SITE_CONFIG.sellerGate.allowedDomains` and stores the unlock under `SITE_CONFIG.sellerGate.storageKey`. It is a convenience, not access control: nothing in either data file is secret, and nothing secret may be added to them.

---

## Invariants a renderer can rely on

- `products.length === 7`, and every `slug` has a matching key in `SITE_CONFIG.products`.
- Every product's `facet` is one of the four `facets.technology[].id` values; two of those four match no product.
- Every product's `category` is one of the three `facets.categories[].id` values.
- Every product's `jumpstart.next.length === 2`, in the order Integration → Scale, and `jumpstart.pillars` is `fast` → `low-risk` → `tangible`.
- Every product has `tile.outcomes.length === 3`.
- Every product fills every slot of the visual grammar: `hero.image`, `overview.problemSolution`, 1–4 `overview.metrics` plus `metricsNote`, `overview.roi`, 6–8 `overview.features`, 3–5 `overview.steps` covering every one of those features exactly once, 3–6 `overview.industryCases`, `overview.industriesNote`, `overview.scope.in/.out`, `overview.moreDetail`, `overview.caseStudy` (object or `null`), a 4–5 layer `technology.stack` with a required item in every layer, exactly four `technology.capabilities` stages, and the full `jumpstart` block.
- No product carries `technology.groups`, `.layers`, `.integration`, `.notUsed`, `.flow` or `.security`; no product carries `overview.sideFacts`, `overview.successStory` or a top-level `pov`.
- No product carries `availability`, `availabilityChip` or `availabilityTooltip`, and no `tags` array carries *Available now*, *Fixed-price offer* or *In preparation*. Only `case-evidence-collection` and `plan-vs-actual-investigation` carry `statusNote`, and both do.
- `shared.tagFamilies` covers all three `facets.categories[].id` values and all four `facets.technology[].id` values, and carries both availability badges. `shared.caseStudyStatus` carries exactly `measured` and `in-progress`.
- `overview.caseStudies.length === 4`; every card's `descriptor`, `area`, `industry` and `status` equal its product's `overview.caseStudy` values, its `product.name` equals that product's `name`, and every `services.proof.caseStudyIds` entry resolves to one of the four.
- `SITE_CONFIG.products[slug].marketplace` is a real boolean on all seven, and no product has a `marketplaceUrl` while `marketplace` is `false`.
- `shared.contact` exists, its `email` is `oracle@softserveinc.com`, it carries three `bring` lines, and `shared.productTabs` carries `jumpstart` (with `legacyId: "pov"`) and `contacts` (with `legacyId: "demo"`), and neither a `pov` nor a `demo` tab id.
- `tools/check-grammar.js` asserts all of the above. Run `node tools/check-grammar.js` after any edit to either data file; it exits non-zero and names every failure. Missing image files are **warnings**, not failures: copy and imagery ship on separate tracks.
- The only person named anywhere in `content.js` is `shared.contact` — a person already printed by name, title and contact route on SoftServe's own external one-pagers. **No customer name appears anywhere in the file** (Alex, 2026-09-16 — this reverses the round-3 clearance that named two), and no path under `assets/img/logos/` is referenced. No personal mailbox, no internal file name, no internal state name and no meeting date appears either. `check-grammar.js` asserts both the name deny-list and the logo-path ban.
