# SCHEMA.md — the shape of `site/data/content.js`

`site/data/content.js` assigns one object to `window.SITE_CONTENT`. It holds every string the site renders. `site/data/config.js` (`window.SITE_CONFIG`) holds every URL, flag and address — see `CONFIG.md`. Nothing else in the site should carry copy.

Conventions used below:

- `string` — render as-is. Copy is final; it is not a template.
- `string?` — the key may be absent on some products. **Absent means the block does not render.** It never means "render a placeholder".
- `[]` — an array; an **empty** array means the section has no items and should render its empty state, not disappear silently where the spec asks for a container.
- Every `route` is a hash route ready to put in an `href`.

Three rules the renderers must hold to, because the copy depends on them:

1. **A number never renders without the disclaimer that sits beside it.** Where a block has `footnote`, `footnotes[]` or `disclaimers[]`, render them in the same visual block as the figures.
2. **Absence renders as an empty instance of the same component, or as nothing at all.** A missing price renders the component with its `emptyState` line — never a sentence saying the component is missing. But where absence has no honest content of its own — a marketplace listing, a seller material, a success story — the element does not render. A section whose only content is that there is no content is never shipped. The hero demo frame is the one deliberate exception, and only because it has honest content to show while it waits: a product flagged `video: true` in `SITE_CONFIG` renders the frame before the recording exists, and the click answers with `shared.videoPending` — when the recording is coming, and the live demo in the meantime.
3. **Facets and availability are data, not classes.** Read the chip label and tooltip from `facets` / `availability`; do not hard-code either.
4. **Every product fills every grammar slot.** The seven product pages share one component grammar, documented in `VISUAL-GRAMMAR.md`. A product with no published number fills its metric row with *qualitative* tiles (`value: null`); it never renders a shorter page than its peers. `tools/check-grammar.js` enforces this.

---

## Top level

```
window.SITE_CONTENT = {
  site, media, disclaimers, shared,
  overview, productsPage, facets, availability,
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

Used in two places: the 50/50 media row beside THE SOLUTION on a product Overview tab, and the mirrored media row beside ARCHITECTURE on its Technology tab. Product tile plates use artwork only when a key carries a raster `src`; with a diagram-only entry — the current state — they render the typographic plate instead, since a full architecture diagram is illegible at tile size. A missing key degrades cleanly: the tile falls back to the type plate and the media row to a plain text panel.

---

## `disclaimers`

Flat map of reusable strings: `kpiTile`, `kpiTileTargets`, `packageTable`, `lakehousePricing`, `accountInsightsEvaluation`, `publicPricingFootnote`, `modelledResults`, `ladderFallback`. Products carry their own copies inside `pov.disclaimers[]` and `overview.*.footnote` so a renderer never has to look up which disclaimer applies — this map exists for shared surfaces (the Services ladder) and for a single point of edit.

---

## `shared`

| Key | Type | Notes |
|---|---|---|
| `preFlightGate` | `{ title, body }` | Renders at the end of every product's POV tab. |
| `credibilityBlock` | `{ heading, items: [{ title, body }] }` | Same four items on every product page and on Services. |
| `engageLink` | `{ label, route }` | The single link out of each POV tab. |
| `productTabs` | `[{ id, label, locked?, legacyId? }]` | Tab bar order for every product page: `overview`, `technology`, `pov`, `contacts`, `sellers`. `locked: true` draws the lock icon. The `id` is also the optional third route segment: `#/products/<slug>/<id>`. `legacyId` is a retired route segment the router must **redirect** to this tab, not render — `contacts` carries `legacyId: "demo"`, so `#/products/<slug>/demo` lands on `#/products/<slug>/contacts`. Every "Request a demo" control on a product page points at the contacts tab. |
| `contact` | `{ name, title, email, photo, blurb, linkedin? }` | The one named human on the site. Rendered as a contact card at the top of the Contacts tab and above the Services contact form. `title` is a string and may be **empty** — it is printed only where a source states it; the card then renders name + email alone. `email` is fixed to the practice mailbox `oracle@softserveinc.com`; no personal mailbox is ever printed. `photo` is `assets/img/people/<name>.jpg`, rendered as a circle. `blurb` is one line saying what to get in touch about. `linkedin` is **omitted** unless a public LinkedIn URL exists in the sources — an absent key renders no link. |
| `ladderColumns` | `[string]` | Column headers for the three-tier ladder. |
| `heroAsideTitle`, `heroAsideFootLabel` | `string` | Carried for reference; no surface renders them since the product hero became a single-column block over its background image. |
| `videoCaption` | `string` | Caption printed on the hero video frame, and the label of the fallback "watch" button. |
| `videoPending` | `{ body, cta }` | The panel a demo frame opens while `SITE_CONFIG.products[slug].videoUrl` is still empty and `video` is `true`. `body` says the recording is being prepared; `cta` labels the primary button, which goes to `#/products/<slug>/demo` and closes the panel. The product name is the panel's heading and comes from the product, not from here. Never write a date into `body`: the copy has to stay true on the day it is read. |
| `industryLabels` | map | The sixteen fixed industry keys → display label. A product's `overview.industries[]` holds bare keys; the renderer looks the label up here and the icon up as `industry-<key>`. No product may use a key absent from this map. |
| `sectionLabels` | map | The standing headings of the visual grammar — the Overview, Technology and POV section titles that are the same on all seven products (`metrics`, `metricsPlanned`, `roi`, `features`, `industries`, `scopeIn`, `scopeOut`, `moreDetail`, `moreDetailFeatures`, `architecture`, `flow`, `components`, `stack`, `notUsed`, `integration`, `security`, `povFact*`, `deliverables`, `pricing`, `terms`, `matrix`, `ladder`, `povScopeIn`, `povScopeOut`, `povRollout`, `povPhases`, `povMeasured`, plus `scope` and `povHeading`). Product-specific headings stay in the product object. Added for the compact Overview and the layered stack: `howItWorks`, `industryCases`, `caseProblem`, `caseSolution`, `outcomes`, `atAGlance`, `factCategory`, `factPlatform`, `factAvailability`, `factPovDuration`, `factPovPrice`, `povLink`, `layerRequired`, `layerOptional`, `directionInbound`, `directionOutbound`, `contacts`. |
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
| `evidenceIntro` | `{ title, body }` | Heads band 1. |
| `evidence` | `[EvidenceCard]` | See below. |
| `servicesTeaser` | `{ title, body, platforms: [{ name, body }], secondParagraph, cta }` | |

### `EvidenceCard`

| Key | Type | Notes |
|---|---|---|
| `id` | string | Referenced by `services.proof.evidenceIds` and by a product's `overview.successStory.evidenceId`. |
| `band` | 1 or 2 | Band 1 = full-size proof cards **with** a metric slot. Band 2 = lighter cards **with no metric slot**; "results to follow" is not an outcome and must not sit in one. |
| `label` | string | `PROOF OF VALUE` / `FIRST ENGAGEMENT` / `METHOD`. Deliberately not uniform — do not flatten. |
| `customer?` | string | An anonymised descriptor. **Never a company name**; none exists anywhere in this data. |
| `industry?` | string | |
| `title?` | string | Present on `METHOD` cards instead of `customer`. |
| `body` | string | |
| `scopeLine?` | string | One extra line about how the proof was run. |
| `metrics?` | `[{ value, label }]` | Band 1 only. |
| `footnotes?` | `[string]` | Render all of them, in order, inside the card. Mandatory wherever `metrics` is present. |
| `product?` | `{ slug, name }` | Renders as a link to the product page. |

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
| `marketplace` | `{ label, badge, heroCta }` | All three are driven by one switch, `config.products[slug].marketplaceUrl`: while it is empty, the badge does not render on any surface, the `label` checkbox is left out of the facet rail entirely, and the `heroCta` button does not appear. There is no separate boolean — a badge with no listing behind it is an unsupported claim. |

---

## `availability`

Map keyed by the product's `availability` value — `available`, `fixed-price-offer`, `in-preparation` — each `{ chip, tooltip }`. Each product also carries a denormalised `availabilityChip` / `availabilityTooltip` so a tile renderer needs no lookup; they are the same strings.

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
| `availability` | string | A key of `availability`. |
| `availabilityChip`, `availabilityTooltip` | string | Denormalised. |
| `oneLiner` | string | The tile description and the hero lead. |
| `subLine?` | string | A second hero line where the one-liner is very short. |
| `heroLine?` | string | A short slogan that heads the hero above the name (two Lakehouse products). Takes precedence over `heroCaption` if both are set. |
| `hero` | `{ image: { file, alt, focal } }` | The product hero's background image. Same contract as `overview.hero.image`. Required on all seven. |
| `heroCaption?` | string | An alternative to `heroLine`, for products that carry a short line rather than a slogan. Rendered in the **same slot and the same `.eyebrow.eyebrow--accent.hero-line` treatment** as `heroLine`, so every product hero has one shape. A product sets one or the other, never both. |
| `badges?` | `[string]` | Small uppercase hero badges (two Lakehouse products). |
| `tags` | `[string]` | Filled navy metadata pills on the tile, in order. Facts, not toggles. |
| `tile.outcomes` | `[string]` | Exactly three outcome bullets. |

**One hero shape on all seven products.** The slots render in a fixed order and an unset one simply does not render: breadcrumb → `heroLine`/`heroCaption` → `headline` → chips → `oneLiner` → `subLine` → `badges` → CTA row. **The CTA row is always last** — nothing is appended below the primary action, so "Request a demo" is the last thing in every hero.

### `overview`

**The Overview tab follows the fixed component grammar in `VISUAL-GRAMMAR.md`. Every product fills every slot** — a product with no published number fills its metric row with qualitative tiles rather than rendering a shorter page. Render the blocks in the order below; none is optional.

| Key | Type | Notes |
|---|---|---|
| `problemSolution` | `{ problem: { title, text, icon }, solution: { title, text, icon } }` | The paired two-panel strip. `text` is 1–2 sentences per panel; `icon` is an icon-registry key (today `alert` / `spark` on all seven). |
| `metrics` | `[{ value, label, qualifier, icon }]` | 3–4 stat tiles. **`value: null` is a qualitative tile** — the icon renders at display size where the number would be, and the tile keeps its height so the row stays level. `value` as a string is ≤ 20 characters. `qualifier` is the baseline or caveat, ≤ 14 words. |
| `metricsNote` | string | **Mandatory on every product.** Renders as one footnote line under the metric row, in the same block. Carries the disclaimer that travels with the figures, or the honest "no published metrics yet" line where there are none. |

**The section heading follows the data.** When at least one tile carries a `value`, the block is headed `sectionLabels.metrics` ("Metrics improved"). When every tile is qualitative, it is headed `sectionLabels.metricsPlanned` ("What the proof of value measures") instead — a heading asserting improvement over four tiles with no number, closed by a footnote saying no metrics are published, contradicts itself two lines later, and it is the first claim a seller lands on in a live demo.

| `roi` | `{ icon, text }` | One callout band, 1–2 sentences. |
| `features` | `[string]` | 6–8 items, **each ≤ 12 words**, rendered as a two-column checklist with check icons. |
| `featuresNote?` | string | An asterisked caveat under the checklist. Only `workforce-optimization` carries one. |
| `featuresDetail` | `[{ title, body }]` | The long-form feature list from the shipped one-pagers. Not rendered in the checklist — it renders inside the More detail disclosure, so no fact is lost. |
| `industries` | `[string]` | Keys from the **fixed set of 16** in `VISUAL-GRAMMAR.md` §5. Rendered as icon chips. `cross-industry` is the reserved honest answer where no vertical list exists. |
| `industriesNote` | string | One line under the chips: who this is for. Present on all seven. |
| `scope` | `{ in: [string], out: [string] }` | Two compact side-by-side lists, 4–6 items each, ≤ 14 words each. |
| `steps` | `[{ n, title, text, image, features }]` | **3–5 workflow steps** — the "How it works" stepper that replaced the flat key-features checklist. `n` is the 1-based position and must equal the array index + 1. `text` is ≤ 2 lines (≤ 30 words). `image` is `assets/img/steps/<slug>-<n>.jpg` — a real product screenshot where one exists, otherwise a designed step illustration in the same 16:10 frame. `features` holds the **exact strings** from `overview.features` that belong to this step: the union across steps must equal `overview.features`, with no bullet in two steps and none left out. That invariant is what lets the stepper replace the checklist without losing a fact. |
| `industryCases` | `[{ industry, label, image, problem, solution }]` | **3–6 cases**, rendered as the industry tab component. `industry` is a key from the fixed set of 16; no key appears twice. `label` must equal `shared.industryLabels[industry]`. `image` is `assets/img/industries/<key>.jpg` — keyed by industry, so the file is **shared across products**. `problem` and `solution` are 2–3 sentences each, specific to that industry *and* this product; a generic paragraph that would read the same under any tab is the failure mode here. The first tab is open by default. |
| `sideFacts` | `{ category, platform, availability, povDuration, povPrice, povPriceNote? }` | The "At a glance" card in the sticky side rail. Every value is a **denormalised copy** of a fact that already exists: `category` from `facets.categories[].full`, `platform` from `facets.technology[].fullLabel`, `availability` from `availabilityChip`, `povDuration` and `povPrice` from `pov.facts`. `povPrice` never carries a bare asterisk — where the figure needs a caveat it ships as `povPriceNote`, since the side rail has no footnote row of its own. The card links to the POV Jumpstart tab, where the full terms live. |
| `moreDetail` | `[{ title, body }]` | The collapsible disclosure at the end of the tab. Everything that used to be a prose block above the fold lives here: today/tomorrow, the pattern, pull quotes, per-persona "where it applies" paragraphs, scope boundaries, roadmap notes, evaluation disclaimers. ≥ 3 entries. With the compact Overview (§2 of `VISUAL-GRAMMAR.md`) the disclosure also absorbs `scope`, `industries` + `industriesNote` and `featuresDetail`. |
| `successStory` | object | Unchanged — see below. |

#### `overview.successStory`

| Key | Type | Notes |
|---|---|---|
| `title` | string | Section heading. |
| `state` | `published` / `first-engagement` / `none` | Drives which shape renders. |
| `blurb` | string | **The whole block renders only when this is non-empty.** Empty on `none`, and the section is then omitted entirely. |
| `scopeLine?` | string | One line naming the shape of the engagement — duration, countries, what was modelled. |
| `evidenceId?` | string | Renders the matching `overview.evidence[]` card rather than duplicating it. |
| `adjacentMethodId?` | string | A `METHOD` card that may render alongside as method proof. |

**No story, no band.** A success-story section whose only content is "nothing published yet" is worse than its absence on a page sellers demo live in front of a customer, so there is no empty state here — the block is simply not rendered. This is the same rule that governs every other URL-gated element on the site.

**Figures live in the metric tiles, not here.** The card carries the narrative, the scope line and at most one link. Printing the same numbers in `overview.metrics[]` and again in the story card, each under its own copy of the same disclaimer, was the duplication the compactness target exists to prevent; the tile row's `metricsNote` carries the disclaimer once per tab.

The **Open the success story** link renders only when `SITE_CONFIG.products[slug].successStoryUrl` is non-empty; otherwise no control renders in its place. It opens in a new tab rather than forcing a download, because browsers ignore `download` on a cross-origin URL.

The block renders as a single-tone light band.

### `technology`

| Key | Type | Notes |
|---|---|---|
| `narrative` | string | **Two short sentences, ~40 words maximum.** One paragraph. The flow steps and the component groups directly beneath it carry the detail; a long paragraph here is the text dump the flow diagram was added to replace. |
| `flow` | `[{ step, label }]` | **Exactly four steps**, rendered as the standard compact flow diagram — identical geometry on all seven pages. `step` is the canonical stage name (`Sources`, `Ingest`/`Extract`/`Mount`, `Reason`/`Optimize`/`Govern`/`Validate`, `Deliver`); `label` is the product-specific line, ≤ 10 words. |
| `stack` | `[{ key, label, summary, vendors, items }]` | **The layered solution stack — the block the Technology tab renders below the flow diagram.** 4–5 accordion rows, top → bottom, in the fixed order `application` → `ai-engine` → `data-platform` → `infrastructure` → `custom`. A layer may be **omitted** (the two Lakehouse products have no `ai-engine`: NVIDIA is not required there) but never re-ordered, and `application`, `data-platform`, `infrastructure` and `custom` are present on all seven. `summary` is **one sentence** — the collapsed row. `vendors` is a non-empty array of `oracle` / `nvidia` / `softserve` and selects the wordmark(s) on the row. `items` is `[{ name, required, note?, direction? }]`; `required` is a real boolean rendering as the **Required / Optional** tag, and every layer carries at least one `required: true`. `direction` is `inbound` / `outbound` / `both`, is only legal on the `custom` layer, and is what turns the old `integration` list into separate **Inbound** and **Outbound** lines inside that layer. The custom layer always names at least one inbound and one outbound item. |
| `groups` | `[{ vendor, label, items: [string] }]` | The older vendor-marked component columns. **Superseded by `stack`** for rendering; kept in the data until the implementer confirms nothing reads it. `vendor` is `oracle`, `nvidia`, `softserve` or `other`; `label` disambiguates the several `oracle` groups. Every product has at least one `oracle` group and exactly one `softserve` group. |
| `notUsed` | `[string]` | The honest "not used by this product" line, rendered muted under the columns. May be empty; the key must exist. |
| `layers` | `[{ layer, providedBy, body }]` | The four-tier layer cake, bottom → top. **Superseded by `stack`**, which folds it in; kept in the data until the implementer confirms nothing reads it. |
| `governance?` | `{ title, body }` | The two Lakehouse products. |
| `integration` | `[{ icon, text }]` | Icon-led list. **Superseded by the `direction`-tagged items of the `custom` stack layer**; kept in the data until the implementer confirms nothing reads it. Icons by convention `inbound` / `outbound` / `trigger` / `link`. |
| `security` | `[{ icon, text }]` | Icon-led list. Icons by convention `shield` / `lock` / `eye` / `audit`. |

### `pov`

Renders the `POV Jumpstart` tab.

The tab renders one fixed sequence on **all seven products**: fact strip → deliverables checklist → price table with its disclaimers as footnotes → the three-tier ladder → the standing gate and credibility blocks → one primary CTA. Everything else a product carries — `statStrip`, `inScope`/`notInScope`/`thenRollout`/`phases`/`howMeasured`, `statNotes`, `prerequisites`, `howItRuns`, `capabilityMatrix` — renders inside a single collapsed **More detail** disclosure placed after the ladder. A seller flipping between two product tabs in front of a customer must not get a different page shape each time, so none of the optional keys below may add or remove a top-level section.

| Key | Type | Notes |
|---|---|---|
| `facts` | `{ duration, team, price, deliverablesCount }` | The four-tile fact strip at the top of the tab. All four are short display strings except `deliverablesCount`, which is a **number** and must equal `deliverables.length`. `price` reads `Scoped per engagement` where none is published — the tile is never empty. |
| `scope` | string | One paragraph: what the proof of value covers. |
| `inScope?`, `notInScope?`, `thenRollout?` | string | Single-line lists separated by `·`. |
| `duration` | string | |
| `durationShort` | string | The same duration in its shortest honest form (e.g. `2 months`, `30–45 days`). Interpolated into `sellerGate.cta.body` at `{duration}`; never rendered on its own. |
| `durationNote?`, `phases?`, `gateNote?` | string | |
| `team` | string | Who delivers the proof of value. |
| `prerequisites?` | `{ title, items: [string] }` | |
| `howMeasured?` | string | |
| `statStrip?`, `statNotes?` | string / `[{ title, body }]` | The Quick Start offer block on the two Lakehouse products. |
| `deliverables` | `[string]` | Rendered under the shared `sectionLabels.deliverables` heading. The heading is not overridable per product — see the fixed sequence above. |
| `howItRuns?` | `{ title, steps: [{ title, body }], closing? }` | |
| `pricing` | `[{ label, value, note? }]` | The proof-of-value's own price lines. Render as a small table with the `disclaimers` beneath. |
| `disclaimers` | `[string]` | Render **all** of them, in order, in the same block as the figures. The last one is always the public packaging footnote. |
| `creditNote?` | string | The Quick Start fee-credit term. |
| `ladder` | `[{ tier, title, scope, includes: [string], duration, pricing }]` | Always exactly three entries: `proof-of-value`, `rollout`, `scaling`. **Render the same three-column component on all seven pages**; where no price is published every `pricing` cell reads `Scoped per engagement`. |
| `ladderFootnote?` | string | Present on the three products with no published price table; render under the ladder. |
| `capabilityMatrix?` | `{ legend, rows: [{ label, pov, rollout, scaling }] }` | The two packaged products. Cell values are `●`, `◐`, `●●` or `—`. |

After the ladder, every POV tab renders, in order: `shared.preFlightGate`, `shared.credibilityBlock`, `shared.engageLink`.

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
| `demo.secondaryHeading`, `demo.secondarySub` | string | The heading the **same** demo form takes when it renders *underneath* the contact card on a product's Contacts tab — "Or send a request". `heading` / `sub` stay as they are, because that instance still heads the standalone request form on the home page. Two headings for one form because the form has two jobs: the primary ask on the home page, the fallback path behind a named human on a product page. |
| `engagementSteps` | `{ title, steps: [{ title, body }], responseLine }` | The three-step "what happens next" block that fills the copy column beside both contact forms. |
| `confirmations` | `{ posted, mailto, contactPosted, error }` | Each `{ title, body }`. Pick by outcome: `posted` after a successful POST to `SITE_CONFIG.formEndpoint`; `mailto` after composing a `mailto:` because the endpoint is empty; `contactPosted` for the Services form; `error` on failure. **Never show a success confirmation for an action that did not happen.** |

---

## `sellerGate`

| Key | Type | Notes |
|---|---|---|
| `heading`, `lockedBody`, `accessNote` | string | `accessNote` is the one-line note under the input. |
| `emailLabel`, `emailPlaceholder`, `unlockLabel`, `lockLabel`, `rejected` | string | |
| `linkPendingLabel`, `downloadLabel`, `unlockedIntro` | string | |
| `notesHeading` | string | Heading of the seller-notes block. The notes themselves are **not in this file** — they are fetched from `SITE_CONFIG.sellerGate.notesUrl` after the gate passes. |
| `cta` | `{ heading, body, bodyFallback, contactLabel, action }` | `body` carries the `{duration}` placeholder, filled from that product's `pov.durationShort`; `bodyFallback` is used when a product has none. `contactLabel` is a **role alias**, not a person and not an address. `action` opens the demo form with the product pre-selected and `I am a…` pre-set to `oracle-seller`. |

The gate checks the domain of the entered email against `SITE_CONFIG.sellerGate.allowedDomains` and stores the unlock under `SITE_CONFIG.sellerGate.storageKey`. It is a convenience, not access control: nothing in either data file is secret, and nothing secret may be added to them.

---

## Invariants a renderer can rely on

- `products.length === 7`, and every `slug` has a matching key in `SITE_CONFIG.products`.
- Every product's `facet` is one of the four `facets.technology[].id` values; two of those four match no product.
- Every product's `category` is one of the three `facets.categories[].id` values.
- Every product's `pov.ladder.length === 3`, in the order proof-of-value → rollout → scaling.
- Every product has `tile.outcomes.length === 3`.
- Every product fills every slot of the visual grammar: `hero.image`, `overview.problemSolution`, 3–4 `overview.metrics` plus `metricsNote`, `overview.roi`, 6–8 `overview.features`, 3–5 `overview.steps` covering every one of those features exactly once, 3–6 `overview.industryCases`, `overview.sideFacts`, `overview.industries` (keys from the fixed set of 16) plus `industriesNote`, `overview.scope.in/.out`, `overview.moreDetail`, exactly four `technology.flow` steps, a 4–5 layer `technology.stack` with a required item in every layer, and `pov.facts`.
- `shared.contact` exists, its `email` is `oracle@softserveinc.com`, and `shared.productTabs` carries a `contacts` tab and no `demo` tab.
- `tools/check-grammar.js` asserts all of the above. Run `node tools/check-grammar.js` after any edit to either data file; it exits non-zero and names every failure. Missing image files are **warnings**, not failures: copy and imagery ship on separate tracks.
- The only person named anywhere in `content.js` is `shared.contact` — a person already printed by name, title and contact route on SoftServe's own external one-pagers. No customer name, no personal mailbox, no internal file name, no internal state name and no meeting date appears anywhere in the file.
