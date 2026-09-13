# SCHEMA.md — the shape of `site/data/content.js`

`site/data/content.js` assigns one object to `window.SITE_CONTENT`. It holds every string the site renders. `site/data/config.js` (`window.SITE_CONFIG`) holds every URL, flag and address — see `CONFIG.md`. Nothing else in the site should carry copy.

Conventions used below:

- `string` — render as-is. Copy is final; it is not a template.
- `string?` — the key may be absent on some products. **Absent means the block does not render.** It never means "render a placeholder".
- `[]` — an array; an **empty** array means the section has no items and should render its empty state, not disappear silently where the spec asks for a container.
- Every `route` is a hash route ready to put in an `href`.

Three rules the renderers must hold to, because the copy depends on them:

1. **A number never renders without the disclaimer that sits beside it.** Where a block has `footnote`, `footnotes[]` or `disclaimers[]`, render them in the same visual block as the figures.
2. **Absence renders as an empty instance of the same component.** A missing price, video or case study renders the component with its `emptyState` / `emptyLabel` line — never a sentence saying the component is missing, and never a disabled placeholder where a locked decision says nothing should render.
3. **Facets and availability are data, not classes.** Read the chip label and tooltip from `facets` / `availability`; do not hard-code either.

---

## Top level

```
window.SITE_CONTENT = {
  site, disclaimers, shared,
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

## `disclaimers`

Flat map of reusable strings: `kpiTile`, `kpiTileTargets`, `packageTable`, `lakehousePricing`, `accountInsightsEvaluation`, `publicPricingFootnote`, `modelledResults`, `ladderFallback`. Products carry their own copies inside `pov.disclaimers[]` and `overview.*.footnote` so a renderer never has to look up which disclaimer applies — this map exists for shared surfaces (the Services ladder) and for a single point of edit.

---

## `shared`

| Key | Type | Notes |
|---|---|---|
| `preFlightGate` | `{ title, body }` | Renders at the end of every product's POV tab. |
| `credibilityBlock` | `{ heading, items: [{ title, body }] }` | Same four items on every product page and on Services. |
| `engageLink` | `{ label, route }` | The single link out of each POV tab. |
| `productTabs` | `[{ id, label, locked? }]` | Tab bar order for every product page: `overview`, `technology`, `pov`, `demo`, `sellers`. `locked: true` draws the lock icon. The `id` is also the optional third route segment: `#/products/<slug>/<id>`. |
| `ladderColumns` | `[string]` | Column headers for the three-tier ladder. |
| `materialStates` | map | `state` value → button label for seller materials. |

---

## `overview`

| Key | Type | Notes |
|---|---|---|
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
| `marketplace` | `{ label, badge, heroCta }` | `label` is the checkbox facet, `badge` the tile/hero badge (driven by `config.products[slug].marketplace`), `heroCta` the secondary hero button (rendered only when `marketplaceUrl` is non-empty). |

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
| `heroLine?` | string | A short slogan that heads the hero above the name (two Lakehouse products). |
| `heroCaption?` | string | Caption under the hero media frame. |
| `badges?` | `[string]` | Small uppercase hero badges (two Lakehouse products). |
| `tags` | `[string]` | Filled navy metadata pills on the tile, in order. Facts, not toggles. |
| `tile.outcomes` | `[string]` | Exactly three outcome bullets. |

### `overview`

Every key is optional except `metrics`, `roi`, `features` and `successStory`; render only the blocks present, in the order below.

| Key | Type | Notes |
|---|---|---|
| `pattern?` | `{ title, body }` | "The pattern" / "What this covers". |
| `problem` | `{ title, lead, bullets: [{ title, body }], context? }` | `bullets` may be empty. |
| `solution` | `{ title, lead, valueStrip?, expanded?, items?, closing? }` | `expanded` is a longer version behind a disclosure control. `items[]` is used where the solution is a set of named outputs. |
| `todayTomorrow?` | `{ today: { title, body }, tomorrow: { title, body } }` | Two-column block. |
| `pullQuote?` | string | |
| `scopeParagraph?`, `evidenceDefinition?`, `useCaseBoundaries?`, `scopeBoundary?`, `exclusions?`, `deliveredAtRollout?`, `roadmap?`, `whatWeHear?` | `{ title, body }` or `{ title, body, extra }` or `{ title, items[] }` | Product-specific blocks; render if present. |
| `metrics` | `{ title, rows: [{ label, value }], footnote?, emptyState?, proofLine? }` | When `rows` is empty, render the same tile container with `emptyState` as its one honest line. `proofLine` renders under the block where present. `footnote` is mandatory to render whenever `rows` is non-empty. |
| `roi` | `{ title, body }` | |
| `whereItApplies?` | `{ title, lead?, items: [{ title, body }] }` | |
| `features` | `{ title, items: [{ title, body }], footnote? }` | 6–8 items. |
| `inScope?`, `outOfScope?` | `{ title, items: [string] }` | |
| `closingDisclaimer?` | string | Print verbatim at the bottom of the tab. |
| `successStory` | object | See below. |

#### `overview.successStory`

| Key | Type | Notes |
|---|---|---|
| `title` | string | Section heading. |
| `state` | `published` / `first-engagement` / `none` | Drives which shape renders. |
| `blurb` | string | Empty on `none`. |
| `scopeLine?`, `results?`, `footnotes?` | as on `EvidenceCard` | Present where the product has delivered proof. |
| `emptyLabel` | string | The one honest line shown when there is nothing to publish, and the label of the download control while `config.products[slug].successStoryUrl` is empty. |
| `evidenceId?` | string | Renders the matching `overview.evidence[]` card rather than duplicating it. |
| `adjacentMethodId?` | string | A `METHOD` card that may render alongside as method proof. |

The **Download the success story** button renders only when `SITE_CONFIG.products[slug].successStoryUrl` is non-empty. Otherwise the control renders in its empty state carrying `emptyLabel`.

### `technology`

| Key | Type | Notes |
|---|---|---|
| `narrative` | string | One paragraph. |
| `layers` | `[{ layer, providedBy, body }]` | Bottom → top. **May be empty** (the two Lakehouse products have no four-tier stack); render nothing rather than an empty table. |
| `components` | `[{ group, items: [string] }]` | Groups are `Oracle Cloud Infrastructure`, `NVIDIA`, `Oracle AI Data Platform`, `Oracle Autonomous AI Lakehouse`, `Other`. A group whose only item reads "Not used by this product" is a deliberate honest row — render it, muted. |
| `governance?` | `{ title, body }` | The two Lakehouse products. |
| `integration` | `[string]` | |
| `security` | `[string]` | |

### `pov`

Renders the `POV Jumpstart` tab.

| Key | Type | Notes |
|---|---|---|
| `heading` | string | |
| `scope` | string | One paragraph: what the proof of value covers. |
| `inScope?`, `notInScope?`, `thenRollout?` | string | Single-line lists separated by `·`. |
| `duration` | string | |
| `durationNote?`, `phases?`, `gateNote?` | string | |
| `team` | string | Who delivers the proof of value. |
| `prerequisites?` | `{ title, items: [string] }` | |
| `howMeasured?` | string | |
| `statStrip?`, `statNotes?` | string / `[{ title, body }]` | The Quick Start offer block on the two Lakehouse products. |
| `deliverables` | `[string]` | |
| `deliverablesTitle?` | string | Defaults to "Deliverables"; the Lakehouse products override it with "WHAT YOU KEEP". |
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
| `notes` | `[string]` | Short seller-facing notes; may be empty. |

---

## `services`

| Key | Type |
|---|---|
| `hero` | `{ headline: { accent, rest }, lead, secondParagraph, platformsTitle, platforms: [{ name, short, long }], cta }` |
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
| `demo`, `contact` | `{ anchor, heading, sub, submitLabel }` | The two form instances. |
| `confirmations` | `{ posted, mailto, contactPosted, error }` | Each `{ title, body }`. Pick by outcome: `posted` after a successful POST to `SITE_CONFIG.formEndpoint`; `mailto` after composing a `mailto:` because the endpoint is empty; `contactPosted` for the Services form; `error` on failure. **Never show a success confirmation for an action that did not happen.** |

---

## `sellerGate`

| Key | Type | Notes |
|---|---|---|
| `heading`, `lockedBody`, `accessNote` | string | `accessNote` is the one-line note under the input. |
| `emailLabel`, `emailPlaceholder`, `unlockLabel`, `lockLabel`, `rejected` | string | |
| `linkPendingLabel`, `downloadLabel`, `unlockedIntro` | string | |
| `cta` | `{ heading, body, contactLabel, action }` | `contactLabel` is a **role alias**, not a person and not an address. `action` opens the contact form with `I am a…` pre-set to `oracle-seller`. |

The gate checks the domain of the entered email against `SITE_CONFIG.sellerGate.allowedDomains` and stores the unlock under `SITE_CONFIG.sellerGate.storageKey`. It is a convenience, not access control: nothing in either data file is secret, and nothing secret may be added to them.

---

## Invariants a renderer can rely on

- `products.length === 7`, and every `slug` has a matching key in `SITE_CONFIG.products`.
- Every product's `facet` is one of the four `facets.technology[].id` values; two of those four match no product.
- Every product's `category` is one of the three `facets.categories[].id` values.
- Every product's `pov.ladder.length === 3`, in the order proof-of-value → rollout → scaling.
- Every product has `tile.outcomes.length === 3`.
- No customer name, person's name, mailbox, internal file name, internal state name or meeting date appears anywhere in `content.js`.
