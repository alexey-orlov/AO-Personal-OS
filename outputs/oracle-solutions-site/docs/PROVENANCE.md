# PROVENANCE — where every string in the data layer comes from

**⛔ INTERNAL. This file never ships and is never bundled.** It names internal source files and the customers behind the anonymised proof cards. It exists so that no `<!-- src: … -->` comment ever has to appear in shipped HTML, CSS, JS or data.

Scope: `site/data/content.js`, `site/data/config.js`, `site/assets/img/*`.

Labels: **verbatim** = the source string unchanged · **adapted** = the source string cut, generalised or de-identified · **written** = no source contains it.

---

## 0. Source roots

| Short name | Path |
|---|---|
| `SPEC` | `…/scratchpad/spec/content-spec.md` (revision 3) — the paste-ready copy the data layer is built from |
| `SPEC-ASSETS` | `…/scratchpad/spec/assets.json` |
| `SPEC-PROV` | `…/scratchpad/spec/PROVENANCE.md` — the section-keyed source map this file carries forward |
| `SPEC-ASSUM` | `…/scratchpad/spec/assumptions.md` |
| `SPEC-OQ` | `…/scratchpad/spec/open-questions.md` |
| `DESIGN` | `…/scratchpad/spec/design-brief.md` |
| `RESEARCH/01…07` | `…/scratchpad/research/01-products-wiki.md` … `07-bsh-business-case.md` |
| `BRAND` | `…/scratchpad/research/brand/` and `…/brand/logos/` |
| `MAP-PARTNER` | `…/OneDrive-SoftServe,Inc/Projects/Oracle/Packs/Use case maps/AI use case map - partner variant 2026-09-11 design pass.png` |
| `BRIEF` | Alex's locked decisions D1–D13, given with this task |

Everything cited below as `SPEC §n` traces one further step back through `SPEC-PROV` §A to the original one-pager, deck or wiki page. That second hop is not duplicated here; `SPEC-PROV` remains the authority on which shipped artefact a given sentence came out of.

---

## 1. Locked decisions that override the spec

Every row here is a place where `BRIEF` and `SPEC` disagree and the data layer follows `BRIEF`. Each is a small, reversible edit if the spec's reasoning turns out to be the one Alex wants.

| # | Where in the data | Spec default | What shipped | Why it matters |
|---|---|---|---|---|
| L1 | `facets.technology` | **Three** facets: All · OCI + NVIDIA · Oracle Autonomous AI Lakehouse (`SPEC` §2.2, `C12`) | **Four**, in `BRIEF` D2's order: `OCI + NVIDIA`, `Oracle AI Data Platform`, `Oracle Autonomous AI Lakehouse`, `Other` | Two of the four match no product and render `emptyState`. `SPEC` argued dead filter segments read as an unfinished site; `BRIEF` D2 requires the four with a designed empty state. |
| L2 | `facets.technology[].emptyState` | — | `"No packaged offering on this platform yet — the practice delivers on it; see Services"` | Copy supplied verbatim by `BRIEF` D2. It reads slightly oddly on the `Other` facet, where "the practice delivers on it" has no specific referent. One-line fix if that grates. |
| L3 | `facets.marketplace`, `config.products[*].marketplace` | **No Marketplace control anywhere on a customer-facing surface** (`SPEC` §2.2, `A1`) — no checkbox, no badge, no muted line | A `Available on Oracle Marketplace` checkbox facet, and `marketplace: true` on `workforce-optimization` and `large-document-extraction` | `BRIEF` D4, on Alex's own statement. `RESEARCH/06` §A.1 found no SoftServe listing on Oracle Cloud Marketplace for any pack and no owner, date or process; five public searches returned zero. **This is the single claim on the site that public evidence does not support — confirm the two listings exist before launch.** |
| L4 | `products[].sellers.materials` (the two packaged packs) | An asset row `Oracle Marketplace package — Planned` (`SPEC` §3.1, §3.2) | That row is **removed** from both | It would contradict the Marketplace badge L3 puts on the same page. If L3 is reverted, reinstate the row. |
| L5 | `shared.productTabs[2].label` | Tab label `Proof of value`; `SPEC-PROV` §C fails the build on the string `POV Jumpstart` | `POV Jumpstart` | `BRIEF` D5 spells the tab bar out. `SPEC` §3 argues "POV" reads as *point of view* outside the team. Purely a label: the tab id stays `pov`, and one string changes it back. **Worth a look before launch.** |
| L6 | `products[3].name` | `Large Document Extraction and Review` (`SPEC` §3.2, resolved at `C7`) | `Large Docs Extraction and Review` | `BRIEF` D2's product table. `SPEC` §0.5 rule 8 says no abbreviation earns its place by being shorter, and `C7` already had three competing names for this product. The slug is unchanged. **Likeliest of the overrides to be a typo — one string, used in six places in `content.js`.** |
| L7 | `forms.roles` | Three options: An Oracle customer · An Oracle seller or partner · Other (`SPEC` §3.0.5) | **Four**: adds `SoftServe` | `BRIEF` D7. |
| L8 | `forms` field set | Ten fields including country, Oracle products in place, preferred timing (`SPEC` §3.0.5) | **Seven**: name, work email, company, role, product of interest, message, consent | `BRIEF` D7 defines the field set. The dropped fields are recoverable from `SPEC` §3.0.5 if lead routing ever wants them. |
| L9 | `config.contactEmail` | **No address anywhere in shipped data** until a role alias is verified (`SPEC` §1.6, `F1`); `SPEC-PROV` §C fails the build on `RnDrequest` and on `@softserveinc.com` | `RnDrequest@softserveinc.com` | `BRIEF` D7 sets it as the default. It is a **role alias, not an individual's mailbox**, which is exactly what `F1` asked for — but `F1` also records that it appears in no source file and is unverified. **Confirm it resolves before launch**; a form that composes mail to a dead alias loses every lead silently. It is never printed on a page: it is only the `mailto:` destination. |
| L10 | `products[4].overview.successStory.results`, `overview.evidence[0].metrics` | Only the time metric ships; every productivity percentage is suppressed as internally disputed (`SPEC` §1.4, `C2`) | The time metric **plus** the post-proof business-case figures: 83% of 12 modelled simulations positive, median +4.5% jobs per technician per day, 15–20% dispatcher productivity (case built on 15%), ~5x modelled ROI over three years | `BRIEF` D8 authorises exactly this list from `RESEARCH/07` §7.1. Note this is **not** a reversal of `C2`: the disputed `+26%` and `€190K/month` from the sales one-pager are still absent, and so is `up to ~5%`. What ships is the business case that superseded them. See §4 below for the clearance that is still outstanding. |
| L11 | `config.products[*].videoUrl` / `successStoryUrl` / `marketplaceUrl` | Same rule | Same rule, all empty | No override. `BRIEF` D4 restates `SPEC` §3.0.1: the control renders only when the URL is non-empty, with nothing in its place otherwise. |
| L12 | Not in the data layer | Ship the customer-free use-case map in the hero frame (`SPEC` §1.1, `A3`) | **No map image is staged in `site/assets/img/`** | See §5. The only customer-free variant carries internal vocabulary that `BRIEF` D10/D11 ban outright. |

---

## 2. Source map by section of `content.js`

### `site`

| Key | Source | Label |
|---|---|---|
| `title`, `metaDescription` | `SPEC` §0.1 | verbatim (meta description is **written** at source) |
| `headerLockup` | `SPEC` §0.1 + `DESIGN` §4.1 — mirrors `genai.softserveinc.com` | adapted |
| `nav`, `primaryCta` | `SPEC` §0.2 + `BRIEF` D1 | verbatim |
| `dividerLabels` | `SPEC` §0.3 | verbatim |
| `footer.*` | `SPEC` §1.6 | verbatim |
| `footer.contactCta` | `SPEC` §1.6 — a button, not a mailto, because no address is printed on a customer-facing page (`F1`) | decision |
| `footer.trademarkLine` | — | **written; needs a legal eye** (`C15`) |

### `disclaimers`

All seven strings: `SPEC` §0.4 — each is printed on a shipped one-pager or deck. **verbatim, never paraphrase.** `modelledResults` is **written**, from the framing caution in `RESEARCH/07` §7.3 ("say modelled simulations against a historical baseline, not delivered or achieved").

### `shared`

| Key | Source | Label |
|---|---|---|
| `preFlightGate` | `SPEC` §3.0.3 (the Quick Start W0 gate, generalised — `SPEC-ASSUM` #51) | adapted |
| `credibilityBlock` | `SPEC` §3.0.4 | adapted |
| `productTabs` | `BRIEF` D5 — see L5 | decision |
| `ladderColumns` | `SPEC` §3.0.7 | verbatim |
| `materialStates` | `SPEC` §3.0.6 | adapted |

### `overview`

| Key | Source | Label |
|---|---|---|
| `hero.headline`, `hero.subhead`, `hero.ctas` | `SPEC` §1.1 | verbatim (subhead is **written** at source, `SPEC-ASSUM` #3) |
| `hero.stats` (4) | `SPEC` §1.1 — stats 1, 2 and 3 are **written**/corrected at source (`SPEC-ASSUM` #4, #5); stat 4 is verbatim from the data-practice credentials | mixed |
| `trustStrip` | `SPEC` §1.2 — no Oracle Partner badge exists and no partner-tier claim is cleared (`C15`) | verbatim + fact |
| `productsIntro` | `SPEC` §1.3 | verbatim (**written** at source, `SPEC-ASSUM` #6) |
| `evidenceIntro` | `SPEC` §1.4 band 1 intro | verbatim |
| `evidence[0]` workforce proof | `SPEC` §1.4 Card A for the narrative and the time metric; `RESEARCH/07` §7.1 for the four modelled figures and the scope line | adapted — see L10, and §4 |
| `evidence[1]` extraction proof | `SPEC` §1.4 Card B | adapted — customer name, third-party SaaS name and the customer's app name removed at source |
| `evidence[2]` first engagement | `SPEC` §1.4 Card C — only the "what it measures" half is external-safe; the deal value, data-source count, customer name and contract duration are all omitted (`C4`) | adapted |
| `evidence[3]`, `evidence[4]` method cards | `SPEC` §1.4 Card D, Card E — Card E is re-voiced; the 23% starting figure and "a partner's production AI solution" are removed (`C5`) | adapted |
| `servicesTeaser` | `SPEC` §1.5 | verbatim |

### `productsPage`

`SPEC` §2.1 and §2.4 — verbatim. The intro is **written** at source (`SPEC-ASSUM` #8). The seven-pattern taxonomy is deliberately **not** restated here; it appears once, on Services (`SPEC` §2.4 behaviour note).

### `facets`

| Key | Source | Label |
|---|---|---|
| `technology[0]`, `technology[2]` — labels and descriptions | `SPEC` §2.2 / `SPEC-ASSETS.facets` | verbatim |
| `technology[1]` `Oracle AI Data Platform` description | `SPEC` §4.1 platform card ("Governed enterprise data for AI"; "structured, unstructured and real-time enterprise data — governed, AI-ready, multi-cloud") compressed to one line | **written** |
| `technology[3]` `Other` label and description | — | **written** — the facet exists because `BRIEF` D2 requires it (L1) |
| `emptyState` (all four) | `BRIEF` D2 | verbatim from the brief |
| `footnote` | `SPEC` §2.2 | verbatim (**written** at source, `SPEC-ASSUM` #10) |
| `categories` | `SPEC` §0.6 | verbatim (`C10`) |
| `marketplace` | `BRIEF` D2, D4 | decision — see L3 |
| `noResults` | — | **written** |
| `fullLabel` on every facet | `SPEC` §0.5 — "Oracle Cloud Infrastructure + NVIDIA" is a SoftServe composition, not a product brand; the short form is permitted only in the compact tag row, carrying the full label as a `title` | verbatim rule |

### `availability`

`SPEC` §0.7 / `BRIEF` D3 — three chips and their tooltips, verbatim. The underlying internal three-state legend on `MAP-PARTNER` reads "packaged offering available / WinP package / Roadmap"; **"WinP" is internal shorthand and must never appear** (`BRIEF` D11).

### `products[]` — per product

Each product's blocks come from the matching section of `SPEC`, which in turn maps back through `SPEC-PROV` §A to the pack's own one-pager, deck or capability matrix.

| Product | `SPEC` § | Open questions the copy rests on |
|---|---|---|
| `account-insights` | §3.3 | `C4` (may the site say a first engagement exists), `C19` (is "about 12 weeks" a pack duration or one contract's), `C5` (the adjacent method card) |
| `case-evidence-collection` | §3.4 | `C6` (is "Case evidence collection" the name — the string appears in no source; the internal map card reads "Complaint evidence assembly"), `C20` (no acceptance phase on this product) |
| `plan-vs-actual-investigation` | §3.5 | — (duration and phases are sourced from the engagement it is packaged from, generalised) |
| `large-document-extraction` | §3.2 | `C7` (the product's name — three competing names; see L6), `C8` (AI-Q vs NeMo Retriever on the Technology tab), **`C18` (is the accelerator-pack one-pager current or superseded — the whole `inScope` / `outOfScope` block comes from it, and its seller row ships as `superseded`)** |
| `workforce-optimization` | §3.1 | `C2` (which numbers ship — see L10), `C14` (confirm €90K / €4K / €300–500K / ~€25K), `C16` (what the commitment-rules asterisk actually restricts), `C17` (page count of the sales one-pager — deliberately not stated) |
| `cross-system-erp-qa` | §3.6 | `C9` (is this mapping the right way round — almost all of this page depends on it), `C13` (€30–50K band vs ~€50K point), `C21` (is the fee-credit term customer-facing) |
| `business-metrics-qa` | §3.7 | `C9`, `C13`, `C21` |

Blocks that are **written** rather than quoted, product by product — these are the sentences with no source behind them:

| Product | Written block | Built on |
|---|---|---|
| account-insights | `overview.roi` | No ROI framing exists for this pack anywhere (`SPEC-ASSUM` #21) |
| account-insights | `technology.layers` | The four-tier stack the sibling AI-Q products carry (`SPEC-ASSUM` #22) |
| account-insights | `pov.scope`, `pov.deliverables` | Composed from the in-scope list + the evaluation harness + the reviewer UI (`SPEC-ASSUM` #22); `pov.scope` is newly composed here, see §3 |
| account-insights | `pov.ladder` rows for Roll-out and Scaling | `SPEC` §3.0.7 fallback rows + the product's own "THEN → ROLL-OUT" line; see §3 |
| case-evidence-collection | `overview.problem`, `overview.roi`, `pov.scope`, `technology.layers` | `SPEC-ASSUM` #23, #24, #25 |
| case-evidence-collection | `pov.ladder` rows | `SPEC` §3.0.7 fallback + the product's own prerequisites; see §3 |
| plan-vs-actual-investigation | `overview.problem`, `overview.roi`, three of four `whereItApplies` bullets | `SPEC-ASSUM` #26, #27, #28, #60 |
| plan-vs-actual-investigation | `pov.ladder` rows | `SPEC` §3.0.7 fallback + the product's own phases; see §3 |
| large-document-extraction | `overview.roi`, `overview.todayTomorrow`, `technology.layers`, the two parentheticals on out-of-scope items 4 and 6 | `SPEC-ASSUM` #17, #18, #19, #20 |
| workforce-optimization | `overview.roi`, `overview.deliveredAtRollout`, the commitment-rules footnote, `pov.deliverables` | `SPEC-ASSUM` #15, #16, #62 |
| cross-system-erp-qa | The differentiating framing (prebuilt Oracle pipelines), `badges` | `SPEC-ASSUM` #29, #30 |
| business-metrics-qa | The differentiating framing (catalog federation), `badges`, `overview.roi` | `SPEC-ASSUM` #29, #30, #31 |
| all seven | `pov.team` | See §3 |
| all seven | `sellers.materials[].description` where `SPEC` printed "—" | See §3 |

### `services`

`SPEC` §4.1–§4.4, verbatim except where `SPEC-ASSUM` marks a block written: the hero lead (#32), "WHO YOU WORK WITH" (#33), "WHO DELIVERS IT" (#34), the ladder duration column naming all three clocks (#35), the unnumbered proof-of-value steps (#36), Why-SoftServe cards 2 and 4 (#37). The Databricks and Snowflake partner dates and certification counts in card 1 are the **only** publishable credential numbers in the corpus (`RESEARCH/03`); no Oracle partner tier, OPN status or Oracle certification count appears anywhere (`C15`, `SPEC` §5 rule 6).

### `forms`, `sellerGate`

The whole form is **written** — no form exists anywhere in the corpus (`SPEC-ASSUM` #13, #39), field set per `BRIEF` D7 (L7, L8). Confirmation and error copy: `SPEC` §3.0.5, with the `mailto` variant written here because `BRIEF` D7 introduces that path (§3).

`sellerGate` copy: `SPEC` §3.0.6 for the heading, locked-state body and the CTA. The gate mechanism is `BRIEF` D6 (email-domain check) rather than `SPEC`'s shared access code (`H2`) — a lateral change, not an override, since `H2` was open. The CTA's `contactLabel` is a **role alias**, never a person (`F1`).

**Deliberately absent from the seller panel, in both data files:** the named external contact, the two seller-only packaging notes ("Packages compress over time"; "Pricing assumes the accelerator pack already exists"), and the objection-handling card about Oracle Autonomous AI Lakehouse having no named public production customer. `SPEC` §3.0.6 and `SPEC-ASSUM` §4 give the reasoning: a client-side gate is not access control, so anything whose exposure matters cannot be in the bundle at all. This build has no authenticated endpoint, so those strings are simply not on the site.

---

## 3. Copy written new for this data layer

Everything in this section exists in `content.js` and in no source. It is written in the spec's register — short declaratives, concrete nouns, no number that is not already on the page.

| Where | What was written | Built on | Risk if wrong |
|---|---|---|---|
| `products[*].pov.team` (all seven) | *"One team: AI, data and OCI architects, a product manager and a project manager, and senior AI and data engineers. The team grows with the scope."* | `SPEC` §4.2 "WHO DELIVERS IT", verbatim content, re-pointed from the Services page to each product. `BRIEF` D5 requires a `team` field per product; `SPEC` deliberately keeps the delivery-team block on Services only | Low — it is the practice's own sentence, and it claims no product-specific staffing. If the seven pages should not each carry it, delete the field and let Services keep it |
| `facets.technology[1].description` | *"Governed enterprise data for AI — structured, unstructured and real-time, multi-cloud."* | `SPEC` §4.1's Oracle AI Data Platform card, compressed to one line | None |
| `facets.technology[3]` (`Other`) | Label *"Other"*, full label *"Other Oracle platforms"*, description *"Everything outside the three above, including Oracle AI for Fusion Applications."* | `BRIEF` D2 requires the facet; the description names the one platform the practice actually delivers on that has no facet of its own | Low |
| `facets.noResults` | *"No product matches these filters. Clear one and try again, or tell us the workflow you need fixed."* | The Products page's own bottom-block posture | None |
| `products[*].pov.ladder[].scope` and `includes[]` on the three per-engagement products | Roll-out and Scaling scope cells from `SPEC` §3.0.7's fallback table, verbatim; the `includes[]` bullets composed from each product's own "THEN → ROLL-OUT" line, prerequisites and phases | `SPEC` §3.0.7 requires the same three-column component on every page, scope cells filled, every price cell `Scoped per engagement` | Low — no price and no duration appears that is not already elsewhere on the same page |
| `products[*].pov.ladder[].includes[]` on the four priced products | Composed from each product's own capability matrix rows and offer phases | `SPEC` §3.1, §3.2, §3.6, §3.7 | Low — every bullet restates a matrix row that also ships as `capabilityMatrix` |
| `sellers.materials[].description` where `SPEC` printed "—" (every "Demo video" row; the Lakehouse one-pagers and feature lists; account-insights' sales deck, one-pager and feature list) | One line each, describing what the asset will contain, not what exists | `SPEC-ASSUM` #61 established this pattern for §3.4/§3.5 so the Description column survives when every state is "Coming soon" | Low |
| `sellerGate.unlockedIntro`, `emailPlaceholder`, `rejected`, `lockLabel` | The unlocked panel's chrome | `BRIEF` D6 defines the mechanism; no source has the copy | Low |
| `forms.confirmations.mailto` | *"Your mail client opened with the request."* plus a line on what to do if nothing opened | `BRIEF` D7 requires this path and forbids faking a success. `SPEC` §3.0.5 has only the POST confirmation | Low — but read it once: it is the message most visitors will actually see today |
| `forms.labels.*` (field labels, validation messages) | Field chrome for `BRIEF` D7's seven-field set | `SPEC` §3.0.5 field table | None |
| `disclaimers.modelledResults` | *"Results are modelled simulations against a historical baseline, not measured production outcomes."* | `RESEARCH/07` §7.3, which requires exactly this framing for any external use of the business-case figures | **Medium — it is load-bearing.** Without it the four figures in L10 read as delivered production outcomes, which they are not |
| `products[4].overview.successStory.scopeLine` and `evidence[0].scopeLine` | *"A three-month proof of value across three countries, with around thirty real-world constraints modelled … and dispatcher approval in the loop."* | `RESEARCH/07` §7.1 rows 1, 4 and 6, all on the candidate-external-safe tier, with the country names withheld | Low |
| `products[5].overview.problem` / `.solution` (cross-system ERP Q&A) and `products[6].overview.problem` / `.solution` | Restatements of the page's own TODAY / TOMORROW blocks, so the two Lakehouse products carry the same `problem` / `solution` shape as the other five | `SPEC` §3.6, §3.7 | None — same words, different container |

---

## 4. The workforce-optimization business-case figures — clearance still outstanding

`BRIEF` D8 authorises four figures from `RESEARCH/07` for the anonymised proof card. They are on that document's **candidate external-safe** tier, and that tier carries a condition the data layer cannot satisfy on its own:

- The source deck is **Oracle-authored and Oracle-copyright**, stamped *Confidential: Internal/Restricted/Highly Restricted* on every content page, and names SoftServe as the development partner. `RESEARCH/07` §7.0 is explicit that anonymised reuse of its figures is still reuse of Oracle's confidential material, and that **Oracle sign-off is needed as well as the customer's**.
- The section is headed "candidates to take through clearance", not "cleared".

What the data layer did to stay inside the brief:

- Only the seven facts `BRIEF` D8 lists are used. The customer name, every € figure, all headcounts, baselines, pre-proof scenarios and cost bands are absent — verified by a deny-list pass over the built data.
- The 5x ROI ratio appears with **no absolute figure anywhere near it**, per `RESEARCH/07` §7.3 (pairing them lets the customer's economics be back-solved).
- The median (+4.5%) leads; the mean (6.1%) and the maximum (21.7%) are absent.
- The country names are withheld — "three countries", not "US, UK, Netherlands" — because the geography narrows the anonymised label to roughly one company (`SPEC-ASSUM` §3).
- The work-zone count (~5,300) and the 38/75/100% phasing are absent: `RESEARCH/07` rates them **medium re-identification risk**.
- Every figure is framed as modelled, never delivered, and carries both `disclaimers.modelledResults` and the standing KPI disclaimer.

**The open item is permission, not wording.** Nothing further can be done inside the repository; someone has to ask.

---

## 5. Assets — what was staged and its licensing status

Staged into `site/assets/img/`:

| File | Source | What it is | Status |
|---|---|---|---|
| `softserve-wordmark-white.svg` | `BRAND/genai-logo-57c5dfbd.svg` | SoftServe wordmark, white, 149×26 — the header lockup mark | SoftServe's own mark, taken from SoftServe's own public product microsite. Internal use on a SoftServe property; no third-party licence involved |
| `softserve-wordmark-black.svg` | `BRAND/genai-logo-black-2dc46216.svg` | Same mark, black — for the one light inversion band | Same |
| `header-divider-white.svg` / `-black.svg` | `BRAND/genai-line-6eb1faae.svg` / `genai-line-black-a20ffa29.svg` | The 2×34 hairline between wordmark and product name | Same |
| `softserve-logo-white.svg` | `BRAND/logos/softserve-logo-white.svg` | Stacked SoftServe logo, 324×96 — footer or hero lockup | Same |
| `softserve-star-white.svg` | `BRAND/logos/softserve-star-white.svg` | The star mark, 135×154 — favicon / watermark | Same |
| `sphere.webp` | `BRAND/genai-ball-4519c583.webp` | The decorative teal sphere, 1920×1920. One instance only, rotated 180°, bleeding off the footer edge | Same. **Note it is teal-green: if the accent colour ever moves off `#35CCBA` (`H4`), the sphere stops matching** |
| `oracle-wordmark-white.svg` | `BRAND/logos/oracle-wordmark-white.svg` | Oracle wordmark, 231×30, clean vector | **Third-party mark.** Oracle Corporation's trademark, used to identify the platform the products run on. Nominative use; render monochrome grey in the partner strip and never imply a partner tier or certification. No Oracle brand-guideline review has been done |
| `oracle-wordmark-grey.svg` | `BRAND/genai-ico-Oracle.svg` | Oracle mark as shipped on SoftServe's own microsite — raster-masked, 26 KB, self-contained | Same. Kept as the fallback; prefer the clean vector above |
| `nvidia-wordmark.svg` | `BRAND/genai-ico-Nvidia.svg` | NVIDIA wordmark — raster-masked, 22 KB, self-contained (the only NVIDIA-only asset on disk) | **Third-party mark.** NVIDIA Corporation's trademark, nominative use, monochrome. No NVIDIA brand-guideline review has been done |
| `lockup-softserve-nvidia-white.svg` | `BRAND/logos/lockup-softserve-nvidia-white.svg` | SoftServe + NVIDIA lockup, 803×148 | An **existing approved SoftServe lockup** taken from SoftServe's own deck template — the safest way to show the pairing. Use it rather than composing a new lockup |

**Fonts:** none staged. Montserrat and Open Sans load from Google Fonts (SIL Open Font License), which is what SoftServe itself ships on its dark product microsite — `H3` records this as the deliberate answer to the licensing question. The real brand faces (Azurio, Replica LL TT) are commercial and are not used.

**Not staged, deliberately:**

- **No Oracle Partner / Oracle PartnerNetwork badge.** No such asset exists on disk or on either live SoftServe site, and no partner-tier claim is cleared (`C15`). Do not fabricate one.
- **No SoftServe + Oracle lockup.** Same — none exists anywhere.
- **No product screenshots and no footage**, for any of the seven (`A2`, `A3`). Any Account Insights screenshot that is ever made must use **synthetic accounts**: the existing ones fan a real news story out to named real companies.
- **No use-case map image.** `MAP-PARTNER` is the only customer-free variant of the map, and it is genuinely customer-free — but it carries **"WinP package"** in its legend and **"AIDP"** on every family footer, both banned outright by `BRIEF` D10 and D11, plus the internal deck framing "Oracle <> SoftServe: Partnership vision". It cannot ship as-is, and cropping does not fix it — the banned strings are in the legend *and* in six footers. The file is staged for review at `docs/asset-candidates/use-case-map-partner-variant.png`, outside `site/`. **To use it, someone has to re-export the slide with the legend relabelled and "AIDP" spelled out as "Oracle AI Data Platform".** Until then the hero frame has no honest fill and the design should not assume one.

---

## 6. The ship gate

Run against the built output — HTML, CSS, JS and every data file that reaches the browser. Fail the build on any match:

```
/bosch|bsh|riyadh\s?air|\bdhl\b|\bnhs\b|\bsbg\b|binladin|belron|\bkpn\b|channel\s?4|nesma|altradoc|king\s+fahd|winp|t-shirt|\/Users\/|OneDrive|€19[02]|192[,.]?525|198\.5|\+26%|tramborg|\bktram\b|no named public production|packages compress over time|first-of-kind|\bAIDP\b|\bAIQ\b|GigaCloud/i
```

Also fail on:

- any `<!--` in the output HTML, and any `//` or `/* */` comment in `content.js` or `config.js` that mentions a source, an assumption, a TODO or a customer;
- any absolute filesystem path;
- the strings `In build`, `proof of concept`, `Oracle Marketplace listing in preparation`, `(assumed)`, `TODO`, `FIXME`, `src:`;
- any individual's name, title or mailbox.

**Two deliberate departures from `SPEC-PROV` §C's version of this gate**, both forced by the locked decisions:

| Pattern dropped | Why |
|---|---|
| `RnDrequest` and `@softserveinc\.com` | `BRIEF` D7 puts `RnDrequest@softserveinc.com` in `config.js` as the form's fallback destination (L9). It is a role alias, not an individual, and it is never printed on a page. The `tramborg` / `ktram` patterns stay — those catch an actual person's mailbox, which must never appear. |
| `POV Jumpstart` | `BRIEF` D5 makes it the tab label (L5). If L5 is reverted, put this pattern back. |
| `packages compress over time` and `first-of-kind` | `BRIEF` D5 requires the spec's seller-only packaging notes (`content-spec.md:459-462`) inside the gated panel, and the first QA pass found them missing site-wide. They now live in `sellerGate.packagingNotes` and render on the four products that print a price. **This is a knowing trade-off:** the D6 gate is client-side, so both sentences are readable in `content.js` by anyone who fetches the bundle. They were judged safe to expose — neither names a customer, a person, a figure or an internal system; both are commercial caveats a seller would state aloud in the same conversation. If that judgement is reversed, delete `sellerGate.packagingNotes` and restore the pattern; nothing else depends on it. |

Everything else in the original gate still applies, and the current data layer passes all of it.

---

## 7. Departures from the spec introduced by the first QA fix round

Each of these changes published copy that `SPEC` prescribed verbatim. They are listed here so the content owner can accept or revert them individually.

| Where | Was | Is now | Why |
|---|---|---|---|
| `overview.hero.stats[0]` | "seven applications on the Oracle stack — three packaged today, four in preparation" (`content-spec.md:116`) | "…three packaged today, two sellable as a fixed-price offer, two in preparation" | The spec line contradicted the site's own chips one click away: `/products` shows 3 × *Available now*, 2 × *Fixed-price offer*, 2 × *In preparation*, and both Q&A products state the offer is live today. A reader who counts got 2 in preparation, not 4. **Content owner's call** — the alternative wording that also reconciles is "three packaged today, four still being packaged". |
| `pov.ladder[2].pricing` on `workforce-optimization` and `large-document-extraction` | "to be defined" (`content-spec.md:596-597`, `:761-762`) | "Scoped per engagement" | Reads as an unfinished placeholder on a customer-facing surface, and the other five ladders already use "Scoped per engagement" in the same slot — the inconsistency was visible within one page-turn. **Content owner's call** if the one-pager wording is contractually load-bearing. |
| `sellerGate.cta.body` | one shared line, "…2 months to measurable KPIs" (`content-spec.md` §3.0.6) | per-product, interpolating each product's own `pov.durationShort` | The shared line was wrong for five of the seven products and contradicted their own POV Jumpstart tabs (30–45 days / about 12 weeks / 12–15 weeks). A seller quoting the panel was misquoting the offer. |
| `case-evidence-collection` POV duration | three phrasings on one tab — "scoped per engagement — comparable investigation proofs run 12–15 weeks", "12–15 weeks", "12–15 weeks" | "12–15 weeks (indicative; scoped per engagement)" in all three slots | Same fact, three commitments, a screen apart. The hedged form is the honest one for an unstarted product. |
| Success-story empty line on both Q&A products | "Built to prove, not promise — the readout is a measurement, not a story." | "No customer engagement published yet — this is a new fixed-price offer. Proof points will be published here." | The slogan dodged the question and repeated a heading that appears verbatim on the same product's POV tab. The other four products answer plainly in this slot. "Built to prove, not promise" is unchanged as the POV section heading. |
| `cross-system-erp-qa` / `business-metrics-qa` — THE PROBLEM and THE SOLUTION | word-for-word identical to the TODAY / TOMORROW pair on the same tab | rewritten to a tighter altitude, one sentence each, stating the pattern rather than re-telling the scenario | Readers hit the same paragraph twice within a screen. Today/tomorrow keeps the narrative contrast; problem/solution now states the shape. |
| `large-document-extraction` success story | a published blurb rendered beside "No case summary is published yet." | the two spec-sanctioned metrics (`content-spec.md:238-239`) rendered as the band's proof column; the empty line removed | The two strings contradicted each other on the same screen. |
| Spelling | mixed British / American (4 × `-ise`, 40+ × `-ize`) | American throughout (`optimized`, `customization`, `Anonymization`, `organization`, `neighboring`, `modeled`) | One convention, chosen to match the Oracle / US-seller audience and the already-dominant form. |
| CTA labels | six labels for two actions | two: **Request a demo** for anything product-scoped, **Request a scoping call** for practice-scoped — including the submit buttons of the two forms | The Services form submitted under "Send" while the identical demo form submitted under "Request a demo". |

### Imagery wired in this round

Superseded by the second fix round — see §8.

---

## 8. Imagery — second fix round

The nine staged hero images and their manifest (`site/assets/img/heroes/`, including `heroes.json`) were **deleted from the served root**. Two reasons:

1. `heroes.json` shipped inside `site/` and was publicly fetchable. It carried internal source-deck filenames and media paths — exactly the "src:" note class the locked decisions forbid, including one filename keyed to a customer/opportunity code. Nothing in the page ever loaded it.
2. Every image was generic dark stock photography with no relationship to the product it illustrated — a container terminal for a dispatcher-scheduling app, a glowing-network plate for Account Insights. That is the loudest generic-page tell the design brief names, and the first question a customer asks in a live demo.

The retired manifest, recorded here so the mapping is not lost:

| Key | Source |
|---|---|
| `account-insights` | `SoftServe AI Repeatable IP-Based Customer Stories.pptx` / `ppt/media/image92.jpeg` |
| `case-evidence-collection` | same deck / `ppt/media/image84.jpeg` |
| `plan-vs-actual-investigation` | same deck / `ppt/media/image89.jpeg` |
| `workforce-optimization` | same deck / `ppt/media/image91.jpeg` |
| `business-metrics-qa` | same deck / `ppt/media/image93.jpeg` |
| `services` | same deck / `ppt/media/image85.jpeg` |
| `large-document-extraction` | `OCI AI accelerators - GTM deck.pptx` / `ppt/media/image9.png`, recomposed on a dark field |
| `overview` | `SBG - PoV approach and options.pptx` / `ppt/media/image4.png` |
| `cross-system-erp-qa` | generated |

**What replaced them.** `site/data/diagrams.js` — seven authored architecture/flow diagrams, one per product, rendered as inline SVG at the site's own design tokens (teal `#35CCBA` flows, `#0E2D4D` group field, Montserrat titles, Open Sans labels). They inherit the page's fonts and colours because they are inlined into the DOM rather than loaded as image files, so they work from `file://`, in a static host, and in a multi-file Artifact with no extra request. Every box and label traces to that product's own `technology.narrative`, `technology.layers` and `technology.integration` strings in `content.js` — no new facts are introduced by the artwork. They render in the 50/50 row beside THE SOLUTION and the mirrored row beside ARCHITECTURE.

The product-tile plates no longer carry artwork at all: they fall back to the typographic plate that was already in `UI.tilePlate` — the product headline set large, first word in teal, on the black plate with its teal glow. A designed container with the product's own name in it beats a stock photograph of something else.

**Still true:** there are no product screenshots for any of the seven. When screenshots exist, add `src` back to that product's `media` entry and `UI.figure` / `UI.tilePlate` prefer the image with no other change. The `Account Insights` rule still applies: any screenshot ever made for it must use synthetic accounts — a production instruction, recorded here and deliberately nowhere inside `site/`.

---

## 9. The visual-grammar round — what moved, what was written, and where the industries came from

Alex's feedback F1–F3 (2026-09-13) replaced the free-form product Overview with **one component grammar shared by all seven pages** (`docs/VISUAL-GRAMMAR.md`). This section records what that did to the data layer.

### 9.1 The restructure — no fact was dropped

Every prose block that used to render above the fold was either compressed into a grammar component or moved, verbatim, into `overview.moreDetail[]` (the collapsible disclosure at the end of the tab). Mapping:

| Old key | Where it went |
|---|---|
| `overview.problem` (lead + bullets + context) | Panel text of `overview.problemSolution.problem`, compressed. The bullets and the `context` sentence moved verbatim to `moreDetail` (`large-document-extraction`, `workforce-optimization`). |
| `overview.solution` (lead, expanded, items, closing, valueStrip) | Panel text of `overview.problemSolution.solution`, compressed. `expanded`, `items[]` and `closing` moved verbatim to `moreDetail`. `valueStrip` was dropped — it duplicated the metric row it sat beside. |
| `overview.metrics` (`{ title, rows, footnote, emptyState, proofLine }`) | `overview.metrics[]` tiles + `overview.metricsNote`. Every `footnote` and every `emptyState` string survives **verbatim** as the `metricsNote`. `workforce-optimization`'s four KPI-definition rows moved to `moreDetail` as "How the KPIs are defined"; its tiles now carry the four business-case figures that already shipped in its `successStory.results`. |
| `overview.roi` (`{ title, body }`) | `overview.roi` (`{ icon, text }`). `text` is the same body, trimmed to two sentences on four products; nothing was added. |
| `overview.features` (`{ title, items[{title,body}], footnote }`) | `overview.features[]` — 6–8 lines of ≤12 words each, each a compression of one `{title, body}` pair. **The original pairs are kept in full** as `overview.featuresDetail[]`. `footnote` → `overview.featuresNote`. |
| `overview.whereItApplies` (`{ title, lead, items }`) | `overview.industries[]` icon chips + `overview.industriesNote` (from `lead` where one existed). **Every `items[]` entry survives verbatim** as a `moreDetail` entry. |
| `overview.inScope` / `.outOfScope` | `overview.scope.in` / `.out`, compressed to ≤14 words per line. |
| `overview.pattern`, `.todayTomorrow`, `.pullQuote`, `.scopeParagraph`, `.evidenceDefinition`, `.useCaseBoundaries`, `.scopeBoundary`, `.exclusions`, `.deliveredAtRollout`, `.roadmap`, `.whatWeHear`, `.closingDisclaimer` | All verbatim into `moreDetail[]`. |
| `technology.components` (`[{ group, items }]`) | `technology.groups` (`[{ vendor, label, items }]`) — same items, now vendor-marked so they render as Oracle / NVIDIA / SoftServe columns. The "Not used by this product" rows became `technology.notUsed[]`, still rendered, still muted. |
| `technology.integration` / `.security` (`[string]`) | `[{ icon, text }]` — the same strings, each given an icon key. |
| `technology.narrative` | Rewritten to three sentences on all seven. The facts are unchanged; the sentence count is the only edit. Cut again to ~40 words in the round recorded in §10. |
| `technology.layers` | Unchanged in this round (empty on the two Lakehouse products). Filled for both in the round recorded in §10 — see §10.3. |
| `pov.*` | Unchanged, plus the new `pov.facts` fact strip. `pricing`, `disclaimers` and `ladder` are byte-identical. |

`technology.flow` and `pov.facts` are **new containers for existing facts** — see 9.3.

### 9.2 Industries — source per product

The industry chips are an icon-set rendering of the verticals each pack already publishes. No new vertical was invented, and no customer name is implied by any key.

| Product | Keys | Source |
|---|---|---|
| `account-insights` | logistics · financial-services · manufacturing | `RESEARCH/02` §3.4, the accelerator one-pager's verbatim four-vertical list (Logistics & supply chain · Financial services & banking · Industrial & manufacturing · Private equity funds). Private equity is carried by `financial-services`, and the full PE paragraph survives in `moreDetail`. **Three chips, not four:** the fourth was `professional-services`, taken from a different card's vertical list, and it contradicted the product's own expanded where-it-applies entries on the same tab, which name private-equity funds as the fourth vertical. A chip a reader cannot trace to the detail below it is worse than a shorter row. |
| `case-evidence-collection` | financial-services · manufacturing | `RESEARCH/01` §5.2 — the L2 card's generic persona examples: financial-crime analyst → financial-services; quality manager → manufacturing. **No pack one-pager exists for this product.** The row previously also carried `professional-services` (from the employee-relations persona) and `public-sector` (from a defence re-skin of the map); neither appears in `spec/content-spec.md` or the research files as a vertical this pack claims, so both were dropped rather than padded to four. |
| `plan-vs-actual-investigation` | construction · manufacturing · professional-services | `RESEARCH/01` §5.3 — the generalised card text names the class as "projects, work packages, orders, engagements, campaigns", and the architecture names zone layouts, bills of quantity and contract amendments (capital-project shaped) → construction; order portfolios → manufacturing; client engagements → professional-services. **Adapted, not quoted** — the source names personas, not industries. A fourth chip, `retail`, was dropped: it was inferred from the campaign-owner persona, and no source names retail for this pack. |
| `large-document-extraction` | travel-transport · professional-services · insurance · financial-services | `RESEARCH/02` §2.5, the one-pager's verbatim list: "Aviation - ground-handling contracts (SGHA) · Legal & commercial contracts · Insurance - policies & claims · Financial & regulatory filings". Aviation → travel-transport; legal & commercial → professional-services. |
| `workforce-optimization` | manufacturing · utilities · telecom · healthcare | `RESEARCH/02` §1.5, the one-pager's verbatim list: "Appliance & white-goods repair · Utilities: water, gas, electric · Telecom & cable · Industrial, medical & IT equipment". Appliance repair and industrial/IT equipment service → manufacturing; medical-device service → healthcare, corroborated by the same section's wider GTM list ("Hospital/health system"). |
| `cross-system-erp-qa` | cross-industry | `RESEARCH/02` (Jumpstart deck, "WHAT WE HEAR FROM IT AND DATA LEADERS"): *"The same two pains, every industry, regardless of stack."* No vertical list exists for either Lakehouse product, and inventing one would be fabrication. |
| `business-metrics-qa` | cross-industry | Same source, same reasoning. |

`energy`, `automotive` and `life-sciences` are declared in the fixed set and currently unused — the source decks name them as adjacent verticals but no pack claims them.

### 9.3 Copy written new for the grammar

| Where | What was written | Built on | Risk if wrong |
|---|---|---|---|
| `overview.metrics[].label` / `.qualifier` (all seven) | The tile captions | Each is a compression of the product's own `metrics.rows`, `metrics.emptyState` or `successStory.results` string. **No figure appears that was not already in `content.js`.** Four products have no numbers at all and ship four `value: null` tiles apiece | Low — but check the four all-qualitative products read as *"this is what we will measure"*, not as claims |
| `overview.metricsNote` (all seven) | — | **Verbatim** from the old `metrics.footnote` or `metrics.emptyState`. `workforce-optimization`'s is the two existing footnotes concatenated, in order | None |
| `overview.industriesNote` (all seven) | One line under the chips | account-insights' is the one-pager's verbatim lead ("Any business that needs to turn market and customer developments into pursuable opportunities across its account base, quickly."). The Lakehouse pair adapt the Jumpstart deck's "same two pains, every industry, regardless of stack". The other four are **written** — one sentence each, restating the class of work the product already describes | Low |
| `overview.scope.in` / `.out` (all seven) | — | account-insights and large-document-extraction: compressions of their own shipped `inScope` / `outOfScope` lists. workforce-optimization: its own `pov.inScope` / `pov.notInScope` strings, split on `·`, plus its roadmap items as out-of-scope lines. case-evidence-collection, plan-vs-actual-investigation and the two Lakehouse products: composed from their own `pov.scope`, `pov.ladder[0].includes` and the exclusion blocks that now sit in `moreDetail` | Low — every line restates something already on the same page |
| `technology.flow[].step` / `.label` (all seven) | The four-step diagram labels | Composed from each product's own `technology.narrative` and `technology.integration` strings. The canonical stage vocabulary (Sources → Ingest/Extract/Mount → Reason/Optimize/Govern/Validate → Deliver) is **written**, and is the thing that makes the seven diagrams comparable | Low — no new component or vendor is named |
| `technology.groups[].label` (all seven) | Column headings | The old `components[].group` names, plus a `SoftServe application layer` / `SoftServe delivery layer` heading over what used to be filed under `Other` | None |
| `pov.facts` (all seven) | The four-tile fact strip | `duration` is `durationShort` shortened further; `price` is the headline of `pov.pricing[0]` or `Scoped per engagement`; `deliverablesCount` is `deliverables.length`, asserted by the checker; `team` is **written** as *"One SoftServe team"* — a compression of the standing `pov.team` sentence, which still ships in full on the same tab | Low |
| `products[*].hero.image.alt` (all seven, plus overview and services) | Image descriptions | Written against the generated images. `site/assets/img/heroes/heroes.json` is the authority; these are copies so the page needs no runtime fetch | Low — but they must be re-checked against the final images |

### 9.4 Hero imagery — the §8 deletion is reversed, with one condition carried forward

§8 of this file records that nine staged hero images and their `heroes.json` were deleted from the served root. F1 reinstates hero imagery, and the two reasons §8 gave are addressed differently:

- **Generic stock photography** — the objection is answered by selection, not by generation. Eight of the nine are SoftServe brand imagery chosen per product against that product's essence and re-cropped to 1920×900 on a dark field; `cross-system-erp-qa` is generated. §8's specific complaint — a container terminal standing in for a dispatcher-scheduling app — was reconsidered rather than inherited: a field force moving containers under work lights is the operation the pack schedules, and at hero scale under the veil it reads as that operation, not as a stock plate. Each image is checked against its own product before it ships; the nine are all different files, and a flat identical gradient across all seven products is the failure this replaces.
- **`heroes.json` shipping inside `site/`** — the objection stands in full. The manifest is publicly fetchable from the served root, so **it must carry no internal source-deck filename, no customer or opportunity code, and no internal path.** Its `source` field now reads `SoftServe brand imagery` for every entry; the deck-and-media-path mapping lives in §8 of this file, which is not served. This is a ship-gate check, not a style preference: it is the same class of leak §8 caught.

`content.js` carries a copy of each image's `file`, `alt` and `focal` so the page never fetches the manifest at runtime. Keep the two in sync; `docs/CONFIG.md` §3b is the operator-facing version of this rule.

The images are the background of the **top block only** — the hero — on the Overview page, the Services page and each product page. They are never the background of a tab body, and never a full-screen wash.

### 9.5 `config.products[*].videoPoster`

New key, empty on all seven, documented in `CONFIG.md` §3. It is inert unless that product's `videoUrl` is non-empty. The renderer falls back to the YouTube thumbnail and then to the product's own hero image, so a YouTube demo needs nothing set here — which is why shipping it empty is the correct state and not an unfinished one.
