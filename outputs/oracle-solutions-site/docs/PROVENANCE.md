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
| L6 | `products[3].name` | `Large Document Extraction and Review` (`SPEC` §3.2, resolved at `C7`) | `Large docs extraction and review` | `BRIEF` D2's product table. `SPEC` §0.5 rule 8 says no abbreviation earns its place by being shorter, and `C7` already had three competing names for this product. The slug is unchanged. **Two separate questions here, and only one has been answered.** The *case* was settled in §13: all seven names are sentence case now, because five of the seven already were and the seven sit side by side in the "Product of interest" dropdown on every Contacts tab. The **`Docs` vs `Document`** question is untouched and still open — it is D2's override, not a drafting slip, and it remains the likeliest of the overrides to be a typo. |
| L7 | `forms.roles` | Three options: An Oracle customer · An Oracle seller or partner · Other (`SPEC` §3.0.5) | **Four**: adds `SoftServe` | `BRIEF` D7. |
| L8 | `forms` field set | Ten fields including country, Oracle products in place, preferred timing (`SPEC` §3.0.5) | **Seven**: name, work email, company, role, product of interest, message, consent | `BRIEF` D7 defines the field set. The dropped fields are recoverable from `SPEC` §3.0.5 if lead routing ever wants them. |
| L9 | `config.contactEmail` | **No address anywhere in shipped data** until a role alias is verified (`SPEC` §1.6, `F1`); `SPEC-PROV` §C fails the build on `RnDrequest` and on `@softserveinc.com` | `oracle@softserveinc.com` | `BRIEF` D7 set `RnDrequest@softserveinc.com` as the default, and that is what shipped until §13. `F1` recorded that the alias appears in no source file and is unverified, and E5 then put `oracle@softserveinc.com` on the contact card directly above the form — so the Contacts tab printed one address and composed mail to a different, unverified one. The form now uses the same practice mailbox the card prints. `RnDrequest@` can come back the moment someone confirms it resolves **and** records here why the form should route somewhere the card does not name. |
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

**Status, fourth fix round (2026-09-14):** the three unclearable ratios were withdrawn from the shipped data — see §14.1. What remains on the proof card and in the workforce Outcomes rail is the `~30 min` time metric, which `SPEC` §1.4 clears on its own source. The scope facts (three countries, ~thirty modelled constraints, human-in-the-loop) stay on the proof card, still unresolved against the same clearance. Record the sign-off here, with a date, when it arrives; the three ratios go back only then.

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

**Hero backgrounds** (`site/assets/img/heroes/`, nine 1920×900 progressive JPEGs, quality 84): a **photographic set lifted from SoftServe's own decks** and graded to one look — cool slate-teal, median luminance 55–63. Nothing in the shipped set is generated in this repository; the earlier in-repo line-art set is retired and its script is deleted. Per-file deck sources, the grade and the CSS treatment are in §11.1.

**The rights caveat, in short:** every file comes from SoftServe's own deck media, with no watermark or third-party stock mark on any of them — but the photographic picks are **AI-generated art commissioned inside those SoftServe decks**, not licensed stock. Garbled micro-glyphs survive on some of them, which is the tell. Someone has to get a one-line confirmation from whoever owns those decks before the site goes public. There is no visible external origin to flag.

`heroes.json` ships inside the served root and is publicly fetchable, so it carries only `file`, `alt`, `focal` and a **generic** `source` / `credit` pair ("SoftServe deck imagery" / "SoftServe") — no deck filename, no media path, no customer or opportunity code. That is a ship-gate check, not a style preference; see §11.1.

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
/bosch|bsh|riyadh\s?air|\bdhl\b|\bnhs\b|\bsbg\b|binladin|belron|\bkpn\b|channel\s?4|nesma|altradoc|king\s+fahd|winp|t-shirt|\/Users\/|OneDrive|€19[02]|192[,.]?525|198\.5|\+26%|ktram|tramborg@|no named public production|packages compress over time|first-of-kind|\bAIDP\b|\bAIQ\b|GigaCloud/i
```

Also fail on:

- any `<!--` in the output HTML, and any `//` or `/* */` comment in `content.js` or `config.js` that mentions a source, an assumption, a TODO, a customer or a named individual — the round-4 pass removed the two decision-attribution comments (`assets/app.js`, `assets/site.css`) that named the content owner in shipped files;
- any absolute filesystem path;
- the strings `In build`, `proof of concept`, `Oracle Marketplace listing in preparation`, `(assumed)`, `TODO`, `FIXME`, `src:`;
- any individual's **mailbox**, and any individual's name or title **other than `shared.contact`**. That one person is cleared by `SCHEMA.md` §"the only person named anywhere in `content.js`": he is already printed by name, title and contact route on SoftServe's own external one-pagers, and the site prints the practice alias rather than his personal mailbox. The deny pattern is therefore the mailbox form (`ktram`, `tramborg@`) and not the surname — a gate that fails on cleared content gets overridden blind, which is worse than no gate.

**Two deliberate departures from `SPEC-PROV` §C's version of this gate**, both forced by the locked decisions:

| Pattern dropped | Why |
|---|---|
| `@softserveinc\.com` | The practice mailbox `oracle@softserveinc.com` is both printed on the contact card and used as the form's `mailto:` destination (L9). It is a role alias, not an individual. The mailbox patterns `ktram` / `tramborg@` stay — those catch an actual person's mailbox, which must never appear; the bare surname was narrowed out, because the contact card ships that name by decision. `RnDrequest` is no longer in the data and the pattern could be restored, but it is left out so a future re-introduction fails the check-grammar gate rather than the ship gate. |
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
| `overview.whereItApplies` (`{ title, lead, items }`) | `overview.industries[]` icon chips + `overview.industriesNote` (from `lead` where one existed). **Every `items[]` entry survives verbatim** as a `moreDetail` entry. *(Superseded in §13: the chip row is deleted — every key it held was already an `industryCases` tab — and the eleven `moreDetail` entries that repeated a tab's vertical went with it. `industriesNote` survives, moved under the tabs.)* |
| `overview.inScope` / `.outOfScope` | `overview.scope.in` / `.out`, compressed to ≤14 words per line. |
| `overview.pattern`, `.todayTomorrow`, `.pullQuote`, `.scopeParagraph`, `.evidenceDefinition`, `.useCaseBoundaries`, `.scopeBoundary`, `.exclusions`, `.deliveredAtRollout`, `.roadmap`, `.whatWeHear`, `.closingDisclaimer` | All verbatim into `moreDetail[]`. |
| `technology.components` (`[{ group, items }]`) | `technology.groups` (`[{ vendor, label, items }]`) — same items, now vendor-marked so they render as Oracle / NVIDIA / SoftServe columns. The "Not used by this product" rows became `technology.notUsed[]`, still rendered, still muted. *(Superseded in §13: `notUsed[]` is deleted — the E3 layer summaries carry which platform each layer uses, which is the condition E3 set for dropping the line.)* |
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
| `products[*].hero.image.alt` (all seven, plus overview and services) | Image descriptions | Written against the shipped images and re-checked against the final set (§11.1). `site/assets/img/heroes/heroes.json` is the authority; these are copies so the page needs no runtime fetch | Low — but they must be re-checked whenever an image is swapped |

### 9.4 Hero imagery — the §8 deletion is reversed, and the set was rebuilt twice in §11

§8 of this file records that nine staged hero images and their `heroes.json` were deleted from the served root. F1 reinstated hero imagery. The first attempt at reinstating it staged eight sourced images alongside one generated one and declared `"source": "SoftServe brand imagery"` across the manifest; **that set and that claim did not survive review and no longer ship** — **§11.1 is the authority on what ships now** and why. What stands from this round:

- The images are the background of the **top block only** — the hero — on the Overview page, the Services page and each product page. They are never the background of a tab body, and never a full-screen wash.
- **`heroes.json` shipping inside `site/`** — the objection stands in full. The manifest is publicly fetchable from the served root, so **it must carry no internal source-deck filename, no customer or opportunity code, and no internal path.** The deck-and-media mapping for the shipped set lives in §11.1 and for the retired staged images in §8, neither of which is served. This is a ship-gate check, not a style preference: it is the same class of leak §8 caught.
- `content.js` carries a copy of each image's `file`, `alt` and `focal` so the page never fetches the manifest at runtime. Keep the two in sync; `docs/CONFIG.md` §3b is the operator-facing version of this rule.

### 9.5 `config.products[*].videoPoster`

New key, empty on all seven, documented in `CONFIG.md` §3. It is inert unless that product's `videoUrl` is non-empty. The renderer falls back to the YouTube thumbnail and then to the product's own hero image, so a YouTube demo needs nothing set here — which is why shipping it empty is the correct state and not an unfinished one.

---

## 10. Fix round on the visual-grammar build

This round took the F1–F3 build through QA and corrected what QA found. Nothing here introduces a new fact; every change is a restoration, a de-duplication, a removal of an unsourced claim, or a consistency repair.

### 10.1 The hero images were missing from the served root

The nine JPGs and `heroes.json` recorded in §9.4 as reinstated **were not on disk.** They had been deleted by an unrelated autosync commit, replaced briefly by nine byte-identical placeholder files, and deleted again. The result: every hero fell back to the same flat gradient, the per-product differentiation F1 asked for was invisible on all nine pages, and the console carried a 404 per hero request.

The complete original set was recovered from git and is now committed. `heroes.json` was rewritten at the same time: its `focal` values now match the CSS `object-position` actually shipping in `content.js`, its `alt` strings describe what each photograph actually shows, and its `source` field is generic on every entry (§9.4).

The nine `alt` strings in `content.js` were corrected to match. They had been written against images that were never the ones on disk — `workforce-optimization` read "service territory rendered as routes and coverage zones over a dark map" for a photograph of a container terminal. The hero image ships as `alt=""` because it is decorative, so no reader was misled; the descriptions are kept truthful as an operator record, and `CONFIG.md` §3b now says so explicitly.

### 10.2 Proof figures are no longer printed twice

`workforce-optimization` and `large-document-extraction` each printed the same figures in the METRICS IMPROVED tiles and again in the success-story card, with the same disclaimer sentences under both. The tiles keep the numbers; `successStory.results[]` and `successStory.footnotes[]` were deleted from both products, and the card is now narrative blurb + scope line + link. No figure was lost — each survives in the tile row, with the disclaimer carried once as `metricsNote`.

`large-document-extraction`'s third tile was replaced. It had read *"7–12% / Of an airline's direct operating cost"* — an aviation cost-structure fact, not a metric this product improves, sitting in the one row meant to be comparable across all seven and narrowing a horizontal pack to a single vertical. It is now a qualitative tile, *"Business-rule validators / Flag what a human must look at"*, drawn from the product's own feature list. The 7–12% fact still ships, in the "Why the error class is expensive" card inside More detail, where it is framed as context rather than as a result.

### 10.3 `technology.layers` filled for the two Lakehouse products

Both shipped `layers: []`, so five products rendered a four-section Technology tab and two rendered three sections. The rows were written from each product's own `technology.groups` and `technology.integration` entries on the same tab — the Lakehouse platform, the tenancy it runs in, the source-connectivity or existing-platform layer, and the SoftServe configuration layer. No component, vendor or capability is named that was not already published on that page. `providedBy` reads `Unchanged` for `business-metrics-qa`'s existing-platforms row, because the whole claim of that pack is that those platforms are not touched.

### 10.4 The success-story block renders only where there is a story

It previously rendered on all seven, printing an empty-state line to the customer on four of them — *"No customer engagement published yet — this is a new fixed-price offer"* and similar. That broke the standing rule that an element with no content is not rendered, and on a page sellers demo live it handed the prospect a section whose only content was the absence of customers.

The block now renders only where `overview.successStory.blurb` is non-empty: `account-insights` (a real in-flight first engagement), `large-document-extraction` and `workforce-optimization`. The five `emptyLabel` strings were deleted from `content.js` so the placeholder cannot return.

### 10.5 Unsourced industry chips removed

Three products lost chips that no source supports; see the corrected table in §9.2. The two Lakehouse products keep their single `cross-industry` chip — the honest answer for a horizontal offer — but it now renders as a full-width statement chip carrying the same line icon and the same geometry as a four-chip row, instead of one lonely pill in a row built for four.

### 10.6 Prose trimmed to the shapes the grammar promised

- `technology.narrative`, all seven: cut from 57–92 words to ~35. The detail lives in the flow-step labels and the component groups directly beneath it, which already carry it.
- `roi.text`, `workforce-optimization` (63 words) and `plan-vs-actual-investigation` (59): cut to ~30 so the callout band holds one or two lines on every product. `workforce-optimization`'s qualifying clause about what the proof measures was already published verbatim in its `moreDetail` "How the KPIs are defined" entry, so nothing left the page.
- `workforce-optimization`'s three roadmap out-of-scope lines merged into one; all three items still ship in full in the `moreDetail` roadmap entry.
- *"The model finds the most optimal schedules, maximizing KPIs"* → *"The solver returns the schedule that scores best against the weighted objectives."* The original was ungrammatical and an unsupported superlative in a section otherwise written in measured, evidence-bound voice.
- `business-metrics-qa`'s two `moreDetail` card titles lost their quotation marks. In the source deck they sat under a "WHAT WE HEAR FROM IT AND DATA LEADERS" header; stripped of that frame, quoted lines read as manufactured customer quotes on a page that otherwise never invents one. They now read as section labels, which is what they are.
- Straight apostrophes replaced with typographic apostrophes throughout `content.js` (the dashes were already correct).

### 10.7 The home page no longer repeats the Services proof block

Both pages rendered all five evidence entries. The home page now carries the two delivered proofs and a link through to Services, which keeps the full block including the method cards and the engagement still in preparation. A seller demoing home → services no longer shows the same screen twice.

### 10.8 ⚠ Ship gate — clearance still outstanding on the published proof strips

**This is the one item in this round that is not closed, and it blocks making the site public.**

The `workforce-optimization` and `large-document-extraction` proof figures — the tile rows, and the anonymised case entries in `overview.evidence[]` — are derived from `RESEARCH/07` §7.0, a deck marked *Confidential: Internal/Restricted* and under Oracle copyright, and from `RESEARCH/04`, an NDA-covered workshop transcript. §4 of this file already records the workforce clearance as outstanding. Two things are needed and neither is recorded as done:

1. **Written Oracle and customer clearance** for both anonymised proof strips. The copy is correctly anonymised and correctly hedged, but anonymisation is not the clearance — the research file says so in terms: nothing from it goes on a SoftServe website, one-pager or deck until the customer and Oracle approve in writing.
2. **Alex's explicit OK** for the `method-accuracy-journey` card (the 23%→81% accuracy story), which the research marks as needing his sign-off.

Until both are in hand and recorded here with a date, the fallback is the scope-and-method framing — constraints modeled, what the proof of value measured — with the ratios removed. **The fourth fix round took that fallback for the three workforce ratios (§14.1).** The rest of this gate is unchanged: the anonymised scope facts, the extraction proof figure and the accuracy-journey line all still need the clearances above.

**Where each gate now stands in the shipped data — check these two before the site gets a public URL:**

| Gate | Where it ships now | If withheld |
|---|---|---|
| Oracle + customer clearance on the two proof strips | `workforce-optimization` case study (`+4.5%`, `~5x`, and the 83%-of-12 and 15–20% figures inside `story`); `large-document-extraction` case study (`5–15 min`) | Drop the `metrics` array to the qualitative form and keep the scope row and the story's method sentences. The status chips and eyebrows do not change. |
| Content owner's OK on the accuracy-journey figure | `services.proof.stat` — the `81%` stat beside the measurement-method lead | The stat block drops cleanly: `lead`, `engagements`, `cta` and `footnote` stand without it, and the section still says how measurement works. |

Record the date and the answer here when each comes back.

---

## 11. Second fix round on the visual-grammar build

### 11.1 The hero set — what ships is photographic, graded to one register

**What ships:** nine photographic heroes, all of them SoftServe's own deck media, all put through one grade so the set reads as a single system. 1920 × 900, progressive JPEG 4:2:2 at quality 84, 90–280 KB each.

The set got there in two moves, both recorded here because the second undoes a claim the first made.

**Move one — the staged photographs were thrown out.** Four of the nine carried visible generative artifacts in the part of the frame the veil leaves most visible: glyph-soup handwriting and a spectacle arm passing through an ear (`case-evidence-collection`), illegible on-screen UI labels over a malformed world map (`plan-vs-actual-investigation`), gibberish "code" (`services`), garbled icon medallions (`account-insights`). That is the "AI page" tell the brief forbids, on the most prominent surface of every page, in front of Oracle sellers. The nine also sat in three incompatible registers — teal vector abstract, warm-orange abstract, dark photography — so "differ per product" read as "assembled from whatever was available", and the warm sources fought the teal accent the rest of the page is built on. Two further images mis-signalled their subject: a container terminal over a pack whose own industry chips are manufacturing, utilities, telecom and healthcare, and a lone silhouette at a dark multi-monitor desk over a stat row claiming a 500-strong practice.

**Move two — the in-repo line-art replacement was itself retired.** The first replacement generated eight synthetic teal diagrams procedurally (`tools/gen-heroes.py`, Pillow: near-black ground, one soft teal core, thin line work). It held one register, but it made every page hero a diagram on a site whose body content is already diagrams, and the owner rejected the register. **That set no longer ships and the script is deleted** — no file in this repository reproduces the shipped bytes, and nothing in the shipped set is generated here.

**The shipped set, file by file.** Media was unzipped read-only from 46 SoftServe decks and documents (presentation templates, the Oracle project folders, monthly AI product overviews); 329 rasters ≥ 800 px wide reduced to 205 unique after md5 dedupe, all contact-sheeted and reviewed. Nothing on OneDrive was modified. Deck names below are the operator record — they are deliberately **not** in the served manifest.

| Key | Deck source | Why it fits |
|---|---|---|
| `overview` | PoV approach & options deck, `image4.png` | A luminous aperture opening on a dark field |
| `account-insights` | AI Repeatable IP-Based Customer Stories, `image92.jpeg` | Signal graph over an out-of-focus night city |
| `case-evidence-collection` | AIDP Factory V2, `image21.png`, **mirrored** | A long row of upright record-plates, each separate, assembled into one run |
| `plan-vs-actual-investigation` | AI Repeatable IP-Based Customer Stories, `image83.jpeg` | A production line receding down a plant hall — planned versus actual output |
| `large-document-extraction` | OCI AI accelerators GTM, `image9.png`, **recomposed** | A deep stack of thin plates, light caught between the layers |
| `workforce-optimization` | AIDP Factory V2, `image31.png` | A tessellated field of zones with loose plates settling into the pattern — work zones and assignment |
| `cross-system-erp-qa` | OCI AI accelerators GTM, `image20.png` | Many parallel strata sweeping together into one continuous surface |
| `business-metrics-qa` | AI Repeatable IP-Based Customer Stories, `image93.jpeg` | A data-point landscape with brighter points along the ridges |
| `services` | AI Repeatable IP-Based Customer Stories, `image85.jpeg` | An engineer at code screens, seen from behind, no face |

Note the gap this table papers over: **there is no field-service, technician or dispatch photograph anywhere in the SoftServe corpus.** `workforce-optimization` therefore uses an abstract zone field rather than a literal picture of the work, which is the honest option — the two attempts at a literal one (a container terminal, a generated night route-network) both mis-signalled the pack.

**The grade — one recipe for all nine.** Focal crop to 32:15 → Lanczos resample to 1920 × 900 (unsharp when upscaling more than 1.2×) → a levels curve solved per image so the median luminance lands in the 45–65 band with p99 ≥ 200 → shadow-targeted denoise where the lift would amplify JPEG blocks → chroma collapsed onto the teal axis → teal cast → desaturate → fine grain. Shared constants: `CHROMA_PULL 1.90`, `TEAL (8, 38, 52)`, `TEAL_AMT 0.38`, `SAT 0.80`, `CONTRAST 1.03`, `GRAIN 0.075`, 350 KB cap. Two per-image knobs trim the spread — `teal` (0.72–2.30) and `sat` (0.78–1.05) — because the sources are not equally saturated; the blue data-wave needed pulling back and the grey-green plate stack needed pushing forward to land in the same family. The result is median 55–63 and p99 205–214 across all nine, every frame cool (B > G > R). No vignette and no left ramp is baked into the files: the site's CSS veil owns the text zone.

**Rights — one confirmation is outstanding.** Everything used is SoftServe's own deck media and no watermark or third-party stock mark appears on any selected image. But the photographic picks are **clearly AI-generated art commissioned inside a SoftServe deck**, not licensed stock — garbled micro-glyphs survive on some of them. **Confirm with whoever owns those decks before the site goes public.** Skipped as a class, deliberately: slide exports and product screenshots, architecture diagrams, customer logos, executive headshots, anything with legible customer names, and the bright organic pattern backgrounds from one customer deck (off-palette for a dark site). No face is identifiable in the shipped set — every person is a silhouette or seen from behind — and no customer name, logo or legible screen text survives in any crop.

**`heroes.json` hygiene — a ship-gate check.** The manifest sits in the served root and is publicly fetchable, so it carries `file`, `alt`, `focal` and a **generic** `source` ("SoftServe deck imagery") and `credit` ("SoftServe") — and **no internal source-deck filename, no media path, no customer or opportunity code**. The deck mapping lives in the table above, in this file, which is not served. This is the same class of leak §8 caught; it is a gate, not a preference. Nothing in the page ever fetches the manifest: `content.js` holds its own copy of `file`, `alt` and `focal`, so the two have to be changed together. The `alt` strings describe what each picture actually shows and name no customer; the hero `<img>` ships with `alt=""` because it is decorative, so they are an operator record rather than something a reader sees.

**The CSS treatment that goes with this set** (`assets/site.css`). The files are already dark and already teal, so the stylesheet does almost nothing to them and everything to the text zone:

- `.hero-bg-img` — `opacity: 1`, `filter: brightness(1.05) contrast(1.02) saturate(1.05)`. Near-neutral by design: the grade is in the pixels, not in the browser. A future image that needs a heavy CSS filter to fit is the wrong image.
- `.hero-bg-veil` — three stacked layers. A left-to-right ramp from solid `--bg` to transparent by 84 % (`.94` at 18 %, `.76` at 38 %, `.46` at 55 %, `.18` at 70 %), a top-and-bottom fade (`.24` at the top, `.30` at 75 %, solid `--bg` at the bottom edge), and a teal radial at `rgba(53, 204, 186, .09)` centred at 70 % 32 %.
- `.product-hero--media .hero-bg-veil` — the product hero holds a media panel on the right, so its ramp never reaches transparent: `.95` at 20 % down to `.40` at the right edge, with the teal radial at `.07`.
- Below 900 px the ramp is replaced by a top-to-bottom fade alone (`.52` → `.34` at 34 % → `.62` at 72 % → `--bg`) and the image drops to `opacity: .62`, because on a narrow screen the copy sits over the whole frame rather than in the left third.

Headline contrast is unaffected on desktop: the copy sits in the left third, where the veil is still ≥ 0.9.

### 11.2 One hero shape on all seven products

The product hero rendered in four different shapes: one product added a subline, two were bare, two appended `heroCaption` **below** the CTA row, and two added a `heroLine` above the title plus badges above the CTA. The third of those was also a hierarchy defect — the primary action was no longer the last thing in the hero. The slots now render in one fixed order, with an unset slot rendering nothing: breadcrumb → `heroLine`/`heroCaption` → `headline` → chips → `oneLiner` → `subLine` → `badges` → CTA. `heroCaption` is emitted through the same `.eyebrow.eyebrow--accent.hero-line` treatment as `heroLine`, which collapses the two variants into one; the now-unused `.hero-caption` rule was removed from the stylesheet.

### 11.3 The metrics heading follows the data

On four of seven products the heading **METRICS IMPROVED** sat over four tiles with no number in them and was closed by a footnote saying no metrics are published — the heading asserting an improvement the content withdrew two lines later. `metricTiles()` now heads the block with the new `sectionLabels.metricsPlanned` ("What the proof of value measures") when no tile carries a value, and keeps "Metrics improved" whenever at least one number is present. The component's own qualitative-tile fallback is unchanged.

### 11.4 Oracle Marketplace is off every customer surface until a listing exists

`config.js` carried `marketplace: true` on `large-document-extraction` and `workforce-optimization` with `marketplaceUrl` empty on both, so the site told customers two packs were "On Oracle Marketplace" — a hero badge, a badge on the list cards and overview tiles, and an "Available on Oracle Marketplace 2" facet — with nothing behind it, while the seller panel of the same page said "Oracle Marketplace package — Planned". No SoftServe pack is listed. `SPEC` §25/§323-325, `PROVENANCE` §83, `assumptions` §25/§112 and `open-questions` A1 all rule that no Marketplace link, badge, facet or line ships until a listing exists.

**The boolean was removed from `config.js` entirely** and every render path now keys off `marketplaceUrl` (`app.js` card chips, `product.js` hero chip and hero CTA, `products.js` facet predicate). The facet checkbox is left out of the rail while no product has a listing, and an `mp=1` in the hash is ignored in that state. Paste a real listing URL and badge, facet and CTA appear together.

### 11.5 The anonymised carrier label lost its region

`"A Gulf carrier"` + "Aviation — ground-handling contract management" + a new-entrant narrative narrows to roughly one company. `assumptions.md` §74 says these labels ship with geography and carrier-type framing removed, and the manufacturer label on the same page already carries no geography for exactly that reason. Now `"An international airline"`; the industry line under it is unchanged, so nothing a buyer needs is lost.

### 11.6 `plan-vs-actual-investigation`'s duration tile

The fact strip read `12 weeks + 2` — internal shorthand with a unit-less "+ 2", and inconsistent with the prose two blocks below on the same tab. Now `12 + 2 weeks`. The full "12 weeks, plus a two-week acceptance phase" still ships in the pricing block and the ladder, where there is room for it.

### 11.7 Seller-only commercial notes left the shipped bundle

`sellerGate.packagingNotes` ("Packages compress over time…", "Pricing assumes the accelerator pack already exists…") and two stale-collateral notes under `sellers.notes` shipped inside `data/content.js`, gated only by a localStorage flag. The first tells the buyer the price will fall if they wait; `assumptions.md` files it as seller-panel-only for that reason, and applies the same reasoning to the named contact — "a client-side gate is not access control… scrapers read JSON".

`sellers.notes` and `sellerGate.packagingNotes` are **gone from `content.js`**. The seller panel now renders an empty container and, after the gate passes, fetches `SITE_CONFIG.sellerGate.notesUrl` (`same-origin` credentials) and fills it from the response; an empty `notesUrl`, a failed fetch or an empty payload renders nothing at all — no heading, no error, no console noise. `notesUrl` ships empty, so no seller notes ship. The payload shape and the rule that the path must be one the deployment actually authenticates are documented in `CONFIG.md` §2. `sellerGate.notesHeading` is the only piece of this that stays in `content.js`, because a heading is not a commercial fact.

The two retired stale-collateral notes, recorded here so the knowledge is not lost: the `account-insights` accelerator-pack one-pager carries an earlier product name on its cover, and the `large-document-extraction` sales deck is titled "Large Document Extraction and Validation" — same product, earlier name. The retired packaging notes are quoted at the top of this section.

---

## 12. The E2 / E3 / E5 round — the compact Overview, the layered stack, and the contact card

Alex's locked edits of 2026-09-14. This section covers only the **data layer**: what was added to `content.js`, where each string came from, and what was written new. The renderer and the imagery are logged by their own rounds.

### 12.1 Source roots used in this round

| Source | What it supplied |
|---|---|
| `…/Packs/Use case maps/AI use case map - partner variant 2026-09-11 design pass.pptx` + `AI workflow patterns - AIDP-NVIDIA-OracleAI mapping.xlsx` (tab "Patterns v2") | The L2 pattern definitions and the per-persona examples that ground the industry cases for the four products with no packaged collateral |
| Workforce Optimization — sales one-pager (2026-07-13), service-packages deck, Accelerator Pack one-pager | The four verticals verbatim, the capability matrix, the four-tier solution layers, the reference-architecture node labels, the CTA block |
| Large Document Extraction and Validation — sales one-pager, Accelerator Pack one-pager, Sep playbook slides 7–8 | The four verticals verbatim, the capability matrix, the architecture node labels, the use-case boundaries, the CTA block |
| AI Signal-Impact Engine — Accelerator Pack one-pager, Sep playbook slides 9–10 | The four verticals verbatim, the capability matrix, the architecture node labels, the in/out-of-scope lists |
| NHS complaint-handling PoC doc (de-identified) | The three per-case outputs and the investigator-UI framing behind the `case-evidence-collection` stepper |
| SBG historical-package PoC doc (de-identified) | The five-verb "what it does" list behind the `plan-vs-actual-investigation` stepper, and the named technology stack (AI-Q, NIM/Nemotron, AI Vector Search, OpenSearch, AI Database 26ai, Document Understanding, Object Storage, Functions/Streaming/API Gateway/OKE, GPU compute) |
| AI Lakehouse Quick Start (2026-08-21) + AI Lakehouse Jumpstart event showcase (2026-09-03) | Everything on the two Q&A products: the TODAY/TOMORROW pairs, the TIME and TRUST pains, the CONNECT / MODEL+GUARD / AI LAYER / PROVE phases, the GA-features-only line, the governance framing |
| Oracle post-PoC business case for the field-service engagement | Read for the workforce `manufacturing` case **in anonymised form only** — three countries, ~30 modelled constraints, dispatcher approval in the loop. No customer name, no figure, no logo, nothing marked Confidential. |

### 12.2 `overview.steps[]` — the workflow stepper

Four steps on every one of the seven, mapped to the workflow the pack's own material describes: intake → processing → review/decision → delivery. Titles and step text are **new copy**, written to the register of the source; the `features` arrays hold the **existing** `overview.features` strings unchanged, redistributed across the steps.

Nothing was invented into the bullets, and nothing was lost: `tools/check-grammar.js` now asserts that the union of the steps' features equals `overview.features` exactly, so a bullet cannot be dropped or duplicated by a later edit.

| Product | Step titles | Grounding |
|---|---|---|
| `account-insights` | Bring in the signal · Filter it, then fan it out · Reason the "so what" per account · Score, cite, review | The one-pager's capability groups: Inputs & grounding → Trigger & filtering → Opportunity & risk reasoning → Review & output |
| `case-evidence-collection` | A case opens · Assemble the evidence · Build the case file · Investigate and decide | The pattern's L2 definition ("an event or a batch sweep opens a case → evidence assembled → an evidence file with a draft finding") plus the three per-case outputs |
| `plan-vs-actual-investigation` | Ingest the exports · Resolve records to the unit · Compare plan against actual · Review the evidence | The PoC doc's five-verb list: ingest and profile → normalize and map preserving lineage → compare → identify variances/patterns/drivers → present through a lightweight interface |
| `large-document-extraction` | Upload and classify · Extract against the rules · Score, cite, validate · Review and export | The Sep playbook's capability groups: Classification & routing → Extraction → Review → (export) |
| `workforce-optimization` | Load the period's data · Set the rules · Solve the plan · Review, approve, measure | The TOMORROW paragraph ("uploads the period's data, runs cuOpt on OCI, and reviews the optimized allocation… before export") plus the allocation-rules / review-and-approval / KPI areas of the capability matrix |
| `cross-system-erp-qa` | Connect the applications · Shape one decision domain · Guard it in the data layer · Ask in plain language | The Jumpstart Case 2 phases, verbatim in structure: CONNECT W1–2 → MODEL + GUARD W2–4 → AI LAYER W3–5 |
| `business-metrics-qa` | Mount what you already run · Build the gold layer · Scope it by role · Answer across every source | The Jumpstart Case 1 phases, same four |

### 12.3 `overview.industryCases[]` — the industry tabs

Twenty-four cases across the seven products. Every `industry` key was already named as a vertical in a source; **the `problem` and `solution` prose is new copy in every case**, written to the source's register, because no source carries a per-industry problem/solution pair for these packs.

| Product | Keys | Where the vertical is named |
|---|---|---|
| `account-insights` | logistics · financial-services · manufacturing | One-pager "Where it applies": Logistics & supply chain · Financial services & banking · Industrial & manufacturing · Private equity funds (the fourth folds into `financial-services`) |
| `case-evidence-collection` | financial-services · manufacturing · professional-services · public-sector | The four persona examples on the use-case map's *Case investigation* row: financial-crime analyst · quality manager · employee-relations partner · case investigator (complaint handling) |
| `plan-vs-actual-investigation` | construction · manufacturing · professional-services | The map's project-controller example plus the product's own `moreDetail` personas (operations manager on order portfolios, delivery lead on client engagements) |
| `large-document-extraction` | travel-transport · professional-services · insurance · financial-services | One-pager list verbatim: Aviation — ground-handling contracts · Legal & commercial contracts · Insurance — policies & claims · Financial & regulatory filings |
| `workforce-optimization` | manufacturing · utilities · telecom · healthcare | One-pager list verbatim: Appliance & white-goods repair · Utilities: water, gas, electric · Telecom & cable · Industrial, medical & IT equipment |
| `cross-system-erp-qa` | cross-industry · manufacturing · logistics | Jumpstart "the same two pains, every industry"; the map's procurement-lead and operations-lead examples; the Case 2 TODAY text naming carriers and e-commerce alongside ERP and CRM |
| `business-metrics-qa` | cross-industry · retail · manufacturing | Jumpstart TIME and TRUST pains; the map's merchandiser example ("sales by SKU, region, and promotion"); the business-manager example ("revenue, churn, or inventory questions") |

Two rules held throughout:

- **No customer is named, and no anonymised label is reused as a case.** The workforce `manufacturing` case draws on the delivered field-service engagement only in the terms already cleared for the evidence card — three countries, around thirty modelled constraints, dispatcher approval in the loop. No figure from the Oracle post-PoC business case appears here; that document is marked Confidential and carries no external-use clearance.
- **A case that would read the same under any other tab is not an industry case.** Each pair names something specific to that sector: ZIP-code work zones and no-shows, crew certifications and outage spikes, 60–100-page ground-handling agreements at 7–12 % of direct operating cost, cross-holding ripples, batch records and supplier history.

### 12.4 `overview.sideFacts` — the At-a-glance card

No new facts. Every value is a denormalised copy: `category` from `facets.categories[].full`, `platform` from `facets.technology[].fullLabel`, `availability` from the product's own `availabilityChip`, `povDuration` and `povPrice` from `pov.facts`. The checker asserts the availability and duration copies against their originals so they cannot drift.

One deliberate change of form: `pov.facts.price` on the two Lakehouse products reads `€30–50K fixed *`, whose asterisk points at a disclaimer that lives on the POV tab. The side rail has no footnote row, so the card carries `€30–50K fixed per use case` plus an explicit `povPriceNote` — "Indicative, confirmed per scope; Oracle partner funding programs may reduce the net cost", compressed from the standing Lakehouse disclaimer. `large-document-extraction` and `workforce-optimization` carry "Figures are illustrative and subject to confirmation", verbatim from their decks. A bare asterisk with no footnote in view is the defect this avoids.

### 12.5 `technology.stack[]` — three blocks folded into one

`technology.groups`, `technology.layers` and `technology.integration` were three views of one architecture. They are now one layered accordion: `application` → `ai-engine` → `data-platform` → `infrastructure` → `custom`, top to bottom.

- **Every item is carried over, not rewritten.** The component names come from `groups[].items`; the layer summaries compress the `layers[].body` strings; the integration lines become `custom` items tagged `direction: "inbound" | "outbound"`.
- **Required / Optional** comes from what the source material already said: an item the one-pagers describe as out-of-the-box or as the system of record is `required: true`; an item described as optional, as "only where…", or as roll-out scope is `required: false`, usually with a `note` saying which.
- **The two Lakehouse products have no `ai-engine` layer.** Their own `notUsed` line says "NVIDIA — not required; Lakehouse first, GPU optional", and an empty engine row would contradict it.
- The three superseded keys are **left in `content.js` on purpose**, so no fact is at risk while the renderer is rebuilt. They are to be removed only once the implementer confirms nothing reads them; nothing new should be written into them in the meantime.

### 12.6 `shared.contact` — the one named human on the site

```
name:  "Karsten Tramborg"
title: "Alliances & Partnerships Director, SoftServe"
email: "oracle@softserveinc.com"
```

**Title source, quoted.** The CTA block of both external sales one-pagers prints, verbatim:

> **Karsten Tramborg** — Alliances & Partnerships Director, SoftServe — ktram@softserveinc.com

— the Workforce Optimization sales one-pager (2026-07-13) and the document-pack one-pager (2026-09-10). The research pass recorded the same string independently from the wiki (`context/areas/softserve/oracle.md`: "**Alliances & Partnerships Director, SoftServe** (title confirmed on the 2026-09-10 doc-pack one-pager, where he is the named CTA)") and from `oracle-packs.md`. So the title is not inferred: it is already printed on customer-facing collateral under this exact wording.

**The address is not.** The one-pagers print a personal mailbox; the site prints the practice mailbox `oracle@softserveinc.com`, per Alex's instruction. `ktram@` is now a banned string in `tools/check-grammar.js`, so it cannot return through a later edit. `AIDP` and `AltraDOC` were added to the same ban list in this round — the first is internal shorthand for Oracle AI Data Platform, the second a third-party product named inside a customer's own estate.

**No LinkedIn URL ships.** None appears in any source read for this site, and the schema omits the key rather than guessing at a profile URL.

This is the only person named anywhere in `content.js`, and the research pass flagged him as the one safe candidate: of the eleven names on the practice slide, he is the only one already published by name, title and contact route on an external SoftServe artefact.

### 12.7 Tab rename

`shared.productTabs` — the `demo` tab became `{ id: "contacts", label: "Contacts", legacyId: "demo" }`. `legacyId` is the router's redirect instruction, not a render slot: `#/products/<slug>/demo` lands on `#/products/<slug>/contacts`.

`forms.demo` keeps `heading` / `sub` — that instance still heads the standalone request form on the home page, reached from the header pill at `#/#request-a-demo`. It gains `secondaryHeading` ("OR SEND A REQUEST") and `secondarySub` for the instance that renders **under** the contact card on a product page. One form, two jobs, two headings; the alternative was renaming the home page's primary ask, which nothing asked for.

### 12.8 Copy written new in this round

Everything below is new prose, written to the register of the shipped one-pagers. Nothing here asserts a number, a customer, a URL or a capability that is not already in a source.

- **28 step titles and 28 step texts** (four per product), §12.2. Structure grounded per the table there; the sentences are new.
- **24 industry `problem` / `solution` pairs**, §12.3. Every vertical is sourced; every pair is new prose.
- **35 stack layer `summary` lines** (five per product, four on the two Lakehouse products), §12.5. Compressed from the `layers[].body` strings and the source architecture descriptions.
- **`shared.contact.blurb`** — "Bring the account and the workflow: a fit check, a live walkthrough, or the scope of a proof of value on your own data." New; it restates the engagement shape already described in `forms.engagementSteps`.
- **`forms.demo.secondaryHeading` / `secondarySub`** — new, per Alex's instruction that the form under the contact card is headed "Or send a request".
- **17 new `shared.sectionLabels` entries** — `howItWorks`, `industryCases`, `caseProblem`, `caseSolution`, `outcomes`, `atAGlance`, `factCategory`, `factPlatform`, `factAvailability`, `factPovDuration`, `factPovPrice`, `povLink`, `layerRequired`, `layerOptional`, `directionInbound`, `directionOutbound`, `contacts`. Section headings, not claims.
- **Two `povPriceNote` strings**, §12.4 — one compressed from the standing Lakehouse disclaimer, one verbatim from the WFO / LDE decks.

### 12.9 Two industry chip rows were widened

`case-evidence-collection` carried two chips (`financial-services`, `manufacturing`) where `VISUAL-GRAMMAR.md` §5 documented four. `professional-services` and `public-sector` were added, both grounded in the persona examples on the use-case map's *Case investigation* row — the employee-relations partner and the complaint-handling case investigator. The §5 table is now generated from what the data actually holds, in both columns, so the two cannot disagree again; `account-insights` and `plan-vs-actual-investigation` had the reverse drift (the table listed a key the data did not carry) and the table was corrected to the data rather than the data to the table.

---

## 13. Third fix round on the E2 / E3 / E5 build

Twenty-two findings from a QA pass over the shipped build. Two were blockers, and both were in the same four files.

### 13.1 The two blockers — the workforce PoC screenshots

`workforce-optimization-1..4.jpg` were withdrawn and the product now ships four
designed illustrations like the other five do. Full account in `ASSETS.md` §1;
the short version is two independent failures in one asset set.

**De-identification.** The frames printed the engagement's real geography — ten
Dutch municipalities and an airport, on a labelled service-zone map — the
customer's own zone-naming convention (`NL_north_west_AlmereEast_Weesp` and
siblings), the zone count, and ten ten-digit technician resource ids. The page
beside them calls the engagement "a global home-appliance manufacturer", and §4
of this file records the deliberate decision to withhold the country names
because the geography narrows that label to roughly one company. The screenshots
put the country back at street level. `ASSETS.md` §4 had asserted these frames
"show synthetic or place-name data, not a customer's records"; that claim did not
survive looking at them, and it has been corrected rather than softened.

**Uncleared figures.** Two of the frames printed per-technician uplift in the
Weekly Schedule panel — "77% → 87% capacity", "4.98 → 6.47 jobs/day", "60% →
100%", "4.2 → 7.6" — six to eighteen times the median (+4.5%) the metric tile a
screen below is cleared to claim, under a disclaimer calling the results modeled
simulations. §4's careful suppression of the mean, the maximum and the disputed
+26% was undone by a screenshot.

The four replacements are drawn to the same grammar as the other twenty-two and
carry no figure at all: intake (`PERIOD LOADED`), weighted rules (`RULES SET`,
four rules tagged HARD / SOFT), the constraint solve (`PLAN SOLVED`), and
dispatcher review (`DISPATCHER REVIEW`). Every label restates a capability
already in `overview.features`. The captures can come back the moment they are
regenerated against synthetic data — a fictional metro, invented zone names,
synthetic ids, and deltas inside the cleared band.

### 13.2 Step frames — the legibility floor

All twenty-six illustrations were re-authored and the two surviving screenshots
re-cropped, against one rule now recorded in `ASSETS.md` §1: at the shipped frame
width of ~454 CSS px, label type must render at **≥ 12 px**. The old
illustrations set 20–26 px type in a 1600 viewBox — 5.7–7.4 px on screen, grey
smudges rather than words. Labels are now 44–56 px (12.5–15.9 px rendered) and
the scenes are laid out around that type: fewer, larger labelled nodes, wider
cards, and a soft plate behind the one label that has to cross artwork. No scene
lost a fact; three lost a label that was repeating the eyebrow.

The two document-extraction screenshots were full 1600 × 1000 application
captures whose UI text rendered at about 3 px and whose near-white panel was the
brightest element on a dark page. They are now 2.0–2.6× crops of the single
region each step is about, graded two stops further down (white to ≈ `#B0B8C0`),
with a 1 px inset rim in CSS so every frame is bounded the same way.

### 13.3 The Overview rail

E2's sticky rail had never once stuck: `fitRail()` only set `.is-sticky` when the
rail fitted the viewport, and at the demo resolution of 1440 × 900 the rail
measured 1303–1693 px on all seven products. It was also **taller than the MAIN
column it accompanies on all seven**, leaving 9–398 px of dead gutter under
"More detail".

Three changes, no measurement in JavaScript:

- The success story moved from the foot of the rail into MAIN, under the industry
  tabs. E2 puts the success-story *download* in the rail; no product has a
  `successStoryUrl`, and what actually rendered there was the narrative band.
- The rail's stat tiles and glance rows are tightened (`.rail-card` overrides).
- `.ov-layout` stretches the rail cell to MAIN's height and the **At a glance**
  card pins (`.rail-card--pin`). It is the last card in the rail, so nothing
  scrolls underneath it while it is held — the reason the taller Outcomes card
  above it cannot be the one that pins.

Measured after, at 1440 × 900: rail content 1203–1263 px against MAIN 1329–1652 —
rail shorter than MAIN on all seven — and the pinned card 338–378 px, comfortably
inside the viewport.

**One target is still missed, and the finding that named it had the cause
backwards.** E2 asks the Overview to read in ~1.5 screens. MAIN is 1.48–1.84
screens and the rail no longer drives the tab body's height. But the measure
"tabbar to end of document" includes the prev/next pager (114 px) and the site
footer (479 px) — 0.66 screens that no rail change can touch — so that figure
sits at 2.29–2.65 and shrinking the rail did not move it. Cutting it further
means cutting blocks E2 mandates. Flagged rather than forced.

### 13.4 Copy and data changes

| Change | What and why |
|---|---|
| Product names | All seven are sentence case. Five already were; `Account Insights` and `Large Docs Extraction and Review` were Title Case, and all seven sit side by side in the "Product of interest" dropdown on every Contacts tab. Prose mentions and the `diagrams.js` node title follow. The `Docs` / `Document` question is untouched — see L6. |
| US spelling | `modelled` → `modeled` (four places, one of them beside `modeled` in the same fact on the same page), `minimising` → `minimizing`, `enquiry` → `inquiry`. The corpus was already US everywhere else. `check-grammar.js` now fails on eight British forms so they cannot return. |
| `overview.industries[]` | Deleted from all seven. Every key it held was already an `industryCases` tab, so the More-detail disclosure told the same verticals a second time. `industriesNote` survives and now closes the tab block. |
| Eleven `moreDetail` entries | Deleted: the per-vertical paragraphs on `account-insights` (3), `large-document-extraction` (4) and `workforce-optimization` (4) that repeated a vertical already carried by a tab. `account-insights`' *Private equity funds* entry stays — it is the one vertical the tabs do not hold. One telling per vertical, per product. |
| `technology.notUsed[]` | Deleted from all seven, with `sectionLabels.notUsed`. E3 set the condition: the layer summaries now state which platform each layer uses. The line rendered as orphaned micro-type below the accordion it referred to, and only on some products. |
| `forms.labels.submitRequest` | New — "Send the request". The Contacts form's button read "Request a demo", a leftover from the retired `/demo` tab, directly under a heading calling the same action "send a request". `FORMS.render` gained a `submitLabel` option; the home page's instance is unchanged. |
| `shared.contact.photo` | Emptied. See 13.5. |
| `config.contactEmail` | `oracle@softserveinc.com`. See L9. |

### 13.5 The headshot is withheld

`ASSETS.md` §3 recorded that the portrait was identified "by position, not by
face" — a fixed EMU offset from a text run on a team slide — and that "no facial
comparison was made". The site prints that person's name, title and a working
mailto beside the picture on every Contacts tab and on the Services page. If the
offset heuristic picked a neighbouring tile, the site publishes a colleague's
face under Karsten's name, to customers.

`shared.contact.photo` is now empty and the card falls back to its "KT" initials
avatar, which is the site's own rule for an asset that is not there. The file is
out of `site/`. `check-grammar.js` warns while the key is empty rather than
failing, so the state is visible on every run. **Someone has to confirm the image
is him;** `ASSETS.md` §3 holds the exact steps to put it back.

His **title** is not at issue: *Alliances & Partnerships Director, SoftServe* is
verbatim from the CTA block of both the Workforce Optimization (2026-07-13) and
document-pack (2026-09-10) sales one-pagers, and independently from
`context/areas/softserve/oracle.md`.

### 13.6 Layout and interaction fixes

| Finding | Fix |
|---|---|
| Products grid | `.market-grid > .market-tile:last-child:nth-child(odd)` stretched the seventh tile to full width with its copy capped at 50 %, and re-fired on any odd filtered count — so picking a facet reshaped the last card mid-session. Both rules deleted; an odd row now ends with one tile at column width. |
| Tile veil, desktop | The vertical layer reached a fully opaque `#0C0C0C`, and the horizontal layer ran to `.12` on the right — darkest exactly where the smallest type sits, transparent where nothing needed protecting. Rebalanced to a flatter ramp: the eyebrow and one-liner gain contrast and the imagery survives. |
| Tile veil, mobile | At 375 px a one-column tile is roughly three times the image's own aspect, and a full-bleed cover crop at that height shows a slice too zoomed to read as anything — which is why the E1 treatment looked applied to some products and not others. Below 1024 px the image keeps a 17 rem band at the top of the card and fades into the card ground. |
| Contact card, product pages | Spanned the full 1440 content width with its content in the left 45 %. Capped at 48 rem, the measure of the Services instance and of the form beneath it. |
| Industry figure | The index-0 panel's image carried `loading="lazy"` although it is visible on first paint, so the block could paint an empty bordered rectangle. Panel 0 is now `eager` + `fetchpriority="high"`; hidden panels stay lazy. |
| Vendor marks | Normalised to one cap-height and one opacity across the five layer rows, via `.group-mark--oracle` / `--nvidia` / `--softserve`. The Oracle wordmark had been rendering wider and brighter than the other two, reading as a rank the layer order does not intend. |
| Header CTA | `data-demo="header"` and its click handler were dead: `initHashLinks` is a capture-phase listener that `stopPropagation`s every `a[href^="#"]`, so the bubble-phase modal handler could never run. Both removed. The header pill routes to `#/#request-a-demo`, which is what it was already doing. |
| Unknown tab segment | `#/products/<slug>/bogus` rendered the Overview and left the bogus address in the bar, while the legacy `/demo` segment corrected itself. `resolveTab` now reports the fallback as legacy too, so both `replaceState` to `/overview`. |

---

## 14. Fourth fix round — the two E2 peer blocks, the video poster, and four copy facts

### 14.1 The workforce ratios were withdrawn (§4 ship gate, taken to its fallback)

Three of the four business-case figures shipped publicly while §4 and §10.8 both
recorded their clearance as outstanding. They are out of the data layer until a
written Oracle **and** customer sign-off is recorded in §4:

| Where | Was | Now |
|---|---|---|
| `overview.evidence[0].metrics` (home page + Services `#proof`) | four tiles — `~30 min`, `83%` / median `+4.5%`, `15–20%`, `~5x` | one tile: `~30 min` to optimize and approve a region's four-week plan, down from ~2 days |
| `overview.evidence[0].footnotes` | modelled-simulations line + the KPI line | the KPI line only — no modelled figure is left for the first line to qualify |
| `products[workforce-optimization].overview.metrics` (Outcomes rail) | four tiles, same figures | the `~30 min` tile only |
| `products[workforce-optimization].overview.metricsNote` | modelled-simulations sentence + KPI sentence | the KPI sentence only |

`RESEARCH/07` §7.1 has no independently-sourced replacement ratio: the
Workforce Optimization sales one-pager carries the **same** customer's KPIs, so
it is not a second source. No figure was substituted and none was invented.

`disclaimers.modeledResults` is left in place — it is the standing phrasing for the
day the figures return.

`tools/check-grammar.js` required 3–4 `overview.metrics` tiles. The rule now
allows **1–4**: the rail stacks in one column, so a single tile is a legitimate
shape, and a grammar rule must not be the reason an uncleared figure stays on a
public page.

### 14.2 `case-evidence-collection` — the proof-of-value duration had an invented lower bound

`RESEARCH/01` §5.2 on this pack: *"No package exists. The only shape on record
is the NHS engagement: 15 weeks."* The shipped `12–15 weeks` invented the 12,
and the 15 is one engagement's SoW duration rather than a pack figure — the
defect §14.3 penalises on `account-insights`. Both bounds are gone. All six
slots (`overview.sideFacts.povDuration`, `pov.facts.duration`, `pov.duration`,
`pov.pricing` Timeline, `pov.ladder[0].duration`) now read **`Scoped per
engagement`**, which is what this product's own price field has always said.
`pov.durationShort` is deleted, so the seller-gate CTA uses
`sellerGate.cta.bodyFallback` instead of interpolating a duration the product
does not have.

The umbrella figure propagated to Services, and both occurrences are corrected
with it — see §14.4.

### 14.3 `account-insights` — open question `C19`, answered the conservative way

`RESEARCH/01` §204 records the `PoC · 12 weeks · €192,525` block as **one named
customer's contract value**, and says the deck carrying it is internal-only
partly because of them. `C19` ("is about 12 weeks a pack duration or one
contract's") is still open. Every other commercial field on this product reads
*Scoped per engagement*; the duration was the single slot where a customer's
contract terms surfaced as a product fact.

All five occurrences — `overview.sideFacts.povDuration`, `pov.facts.duration`,
`pov.duration`, `pov.pricing` Timeline, `pov.ladder[0].duration` — now read
**`Scoped per engagement`**, and `pov.durationShort` is deleted. **`C19` stays
open**: if the pack team confirms 12 weeks is the pack's own scoping default,
record the confirmation here and the figure can return as a pack fact.

### 14.4 Services contradicted itself on the Lakehouse Quick Start

`services.howWeEngage.ladder[0].duration` said *30–45 days on the Lakehouse
Quick Start*; `howWeEngage.howAPovRuns.closing`, two sections below on the same
page, said *Six weeks*. Every source says 30–45 days
(`RESEARCH/03` §172/§180/§231, `RESEARCH/04` §204, `RESEARCH/02` §855/§865) and
so do the `cross-system-erp-qa` and `business-metrics-qa` product pages. *Six
weeks* appears in no source and is gone. The deep-research clause in both
strings follows §14.2: *scoped per engagement*, not *12–15 weeks*.

### 14.5 The anonymised workforce label, and the Manufacturing tab that restated it

`RESEARCH/07` §7.0 prescribes **"a global home-appliance manufacturer"** as the
anonymised label, so the label itself is unchanged. What was added on top of it
was not prescribed and did the re-identification work §4 had already tried to
avoid by withholding the country names:

- `overview.evidence[0].industry` — *Manufacturing — residential appliance and
  white-goods field service* → **Manufacturing — consumer-durables field
  service**.
- `products[workforce-optimization].overview.industryCases` Manufacturing tab —
  restated the same engagement almost verbatim (*residential appliance and
  white-goods*, *around thirty* constraints, *three countries*), so one customer
  read twice on one page and the "industry use case" was an anecdote rather than
  a pattern. Rewritten to the pattern: in-home repair of manufactured goods,
  work zones and allocations, market-specific rules as configuration. The
  engagement's specifics stay where they belong — on the proof card, once.

### 14.6 The demo frame stopped borrowing the hero photograph

`posterFor()` fell through to `product.hero.image.file` whenever
`config.videoPoster` was empty — which it is for all seven. On the three
products with `video: true` the frame rendered the product's own hero
photograph directly on top of the same photograph used as the hero backdrop: a
brighter cut-out of the wallpaper with a play button on it, in the first screen
a seller demos. The fallback is deleted; `posterFor()` returns
`config.videoPoster`, or the YouTube thumbnail where a `videoUrl` gives one, or
nothing.

With no poster the card renders without its `<img>` — the site's own
missing-asset rule, and the pending state `CONFIG.md` §`videoPoster` already
documents. A `.video-card--plate` modifier gives that state its own ground (a
navy-to-inset gradient with the accent glow) and a lighter veil, so an empty
frame reads as a designed plate rather than a failed image. The play button and
the WATCH THE DEMO caption are unchanged.

When a still is wanted before the recordings land, `videoPoster` takes a
**distinct** frame — a step screenshot, or a desaturated crop at another focal
point. Never the hero file.

### 14.7 The two E2 blocks now hold the peers-equal-height rule

Both blocks commissioned by E2 paired a fixed-ratio image with prose of variable
length, so the image sat short of the column beside it and the notch changed
size as the reader clicked through.

| Block | Measured before | Fix |
|---|---|---|
| `.ind-panel` — industry use cases | figure 245 px against 292–338 px of copy; the image appeared to grow and shrink as the tabs changed | `.ind-figure` is `align-self: stretch`; its `img` is `height: 100%` with a `15.5rem` floor and `object-fit: cover`. The `aspect-ratio` is gone from the desktop rule |
| `.stepper` — how it works | list 370–388 px against a frame pinned at 285 px; the two columns drifted out of register on every click | `.stepper` is `align-items: stretch`; `.step-frames` is a flex row, `.step-frame` is `flex: 1 1 auto`, and its `img` is `height: 100%` with a `17rem` floor and `object-fit: cover` |

Below 900 px, where both blocks collapse to one column, the images return to
`aspect-ratio: 16 / 10` with the floor removed — the ratio the frames were
designed at, and the one E2 asked to keep on mobile.

Measured after, at 1440: stepper list and frame 370/370 then 388/388 across all
four steps; industry figure and case 315/315, 315/315, 292/292 across the three
tabs. At 375: both images 325 x 203, exactly 16:10, no horizontal scroll.

### 14.8 ⚠ `C8` — AI-Q vs NeMo Retriever on `large-document-extraction` — still open, and it is a ship gate

The site names **NVIDIA AI-Q** as the required extraction engine in five places
on this product: `oneLiner`, the tag row, `overview.steps[1].text`, the
`technology` narrative, and the `ai-engine` layer's Required component
(`content.js:1556`). All five follow the pack's own external sales one-pager,
which pitches *"NVIDIA AI-Q on Oracle OCI"* and prints an architecture line
reading *NVIDIA AI-Q (GPU-accelerated extraction, VLM + RAG)*.

`RESEARCH/01` §5.4 records the direct contradiction. The internal use-case map's
NVIDIA cell reads *"NeMo Retriever extraction (Nemotron Parse · Page Elements ·
Table Structure) — AI Document Extraction pack … **not** the AI-Q agent"*, and
the red-team downgraded that row explicitly **"because AI-Q does not extract"**.

Nothing in the repository resolves this. Both artefacts are in the wiki, the
wiki flags it for Alex, and the fourth fix round did **not** pick a side,
because either choice is a technical assertion about the product that only the
pack team can make:

- The copy was left following the **external one-pager**, per the wiki's own
  stated rule that externally-facing artefacts are the ones to trust — and
  because the alternative is to publish a component name no customer-facing
  artefact uses.
- That leaves a **Required-tagged component asserting a capability its own
  internal source says the product does not have.** It is a correctness
  problem, not a confidentiality one, so it does not block an internal review —
  but it must not go to customers unanswered.

**What has to happen before launch:** ask the pack team which engine does the
extraction.

- If it is **NeMo Retriever**, change all five places to *NVIDIA NeMo Retriever*
  (or *NVIDIA NeMo* generically) and keep AI-Q only where it genuinely applies
  — note that `account-insights` and `case-evidence-collection` use AI-Q for
  retrieval and multi-document reasoning, which is not the contested claim.
- If it is **AI-Q**, record the confirmation here with a date, and the internal
  use-case map is the entry that gets corrected.

---

## 15. Round 3 — the content rewrite (E · F · G · H · C), 2026-09-14

Alex's round-3 decisions, given with the task. The data layer follows `BRIEF-3`
wherever it and an earlier round disagree; every such reversal is named below.

### 15.0 The clearance that changed, and what it does not cover

`BRIEF-3` **names two customers**: *Bosch* on `workforce-optimization` and
*Riyadh Air* on `large-document-extraction`, with their real logos. Both are
written up by name, with their logos, on SoftServe's own external sales
one-pagers and in the September playbook (`RESEARCH/02` §1.4, §2.4, §9.5), which
is the basis for naming them here.

What the clearance does **not** cover, and what stayed out:

- **No € figure, headcount, salary, operating baseline or contract value from
  the Bosch post-POC business case.** `RESEARCH/07` §7.2 lists them; none is in
  the data. `check-grammar.js` now bans `€190K`, `€5.17` and `€11.03` as
  strings, alongside `BSH` — the internal entity abbreviation — and `DHL`.
- **The ratios are back, the money is not.** §14.1 withdrew four Bosch ratios
  pending written Oracle **and** customer sign-off. `BRIEF-3` puts them on the
  page as the success story's figures, so the withholding is lifted **on Alex's
  instruction**, not because §4's clearance was recorded: the source deck is
  still an Oracle-copyright document stamped *Confidential:
  Internal/Restricted/Highly Restricted*, and the business-side sign-off is
  Alex's to obtain. **§4 stays open.** What ships is the external-safe tier of
  `RESEARCH/07` §7.1 only: median **+4.5%** jobs per technician per day, **~5x**
  return within three years, **83%** of simulations positive, **15–20%**
  dispatcher productivity, a **three-month** proof across **three countries**,
  **~30** modeled constraints — every one a ratio, a count or a duration, and
  never paired with an absolute figure (§7.3's back-solving caution).
- The `~5x` and `+4.5%` figures render inside a panel whose `story` ends
  *"Results are modeled simulations against a historical baseline, not measured
  production outcomes"* — `RESEARCH/07` §7.3's prescribed framing, and the
  reason `check-grammar.js` fails a success story with no caveat clause.

### 15.1 E — the seven one-liners, rewritten as product statements

Each is now *what it does · for whom · the outcome*, with the packaging story
removed; `check-grammar.js` fails the build on "packaged from proof of value",
"from proof of value to enterprise scale", "fixed price" and "quick start" in a
`oneLiner`. `BRIEF-3` supplied drafts; each clause was checked against
`RESEARCH/01`/`02` and an unsupported one was **dropped, never replaced**.

| Product | Source for the claims | Adjustment made to the brief's draft |
|---|---|---|
| `large-document-extraction` | `RESEARCH/02` §2.3 ("scoring confidence and citing the source page for every value"), §2.1 ("trusted, validated structured data") | "a **link** to its source page" → "a **citation** to its source page": the shipped artefacts say citation, and the split-view UI cites a page rather than linking out |
| `account-insights` | `RESEARCH/02` §3.3 (signal = news, filing, disclosure → opportunities and risks per affected account, cited), §3.4 | "sales and **customer** teams" → "sales and **account** teams": the sources say commercial / account teams; "customer teams" appears nowhere. The old `subLine` was deleted — the new one-liner carries the whole statement |
| `workforce-optimization` | `RESEARCH/02` §1.3, §1.4 (four-week plan in ~30 min; cuOpt; export to Oracle Field Service) | kept as drafted |
| `plan-vs-actual-investigation` | `RESEARCH/01` §5.3 (the generalised class definition), `RESEARCH/02` §4.2 | "programs and systems" → "completed projects, orders and engagements" (the class as the map defines it); "**likely** drivers" → "**candidate** drivers", the source's own word — *"evidence-backed candidates, never conclusions"* |
| `case-evidence-collection` | `RESEARCH/02` §4.2 (L2 definition), §4.2 NHS-shaped structure | "the **complete** evidence trail" → "the evidence trail": completeness is a claim no source makes for this pack (and the coverage-gap guarantee belongs to the sibling product) |
| `cross-system-erp-qa` | `RESEARCH/02` §5.2.2 case 2 ("ERP, CRM and the systems around them joined in one governed layer") | "span several **ERP systems**" → "span the ERP, the CRM and the systems around them": the join is across an estate, not across several ERPs |
| `business-metrics-qa` | `RESEARCH/02` §5.2.2 case 1 (mount the catalogs you already have; no migration), §5.2.1 (governed definitions) | kept the brief's "consistent definitions", added the sourced "over the catalogs and databases you already run — no data moved", which is this product's distinguishing claim |

Two tile bullets changed with them: both Lakehouse products' third
`tile.outcomes` line was *"The Quick Start offer is live today: 30–45 days,
fixed price, in your own tenancy"* — packaging, not an outcome. Both now say
what the customer keeps (`RESEARCH/02` §5.2.1, "What the customer keeps").

### 15.2 F — the Technology tab is two blocks

`technology.flow[]` and `technology.security[]` are **deleted** from all seven
products, and `technology.capabilities[]` is new.

- **`flow` (the How-it-runs diagram).** Four steps that named the same stages
  the layered stack already reads top to bottom, minus the components. Nothing
  was lost: each `flow.label` restated the layer summary beside it.
- **`security`.** Twenty-eight lines across seven products, every one of which
  restates something else on the page — tenancy and read-only access are in the
  `infrastructure` and `custom` layer summaries, the human gate is in the
  solution panel and now in the Jumpstart `low-risk` pillar, the audit trail is
  a capability, "production hardening is roll-out scope" is in `scope.out` and
  in `jumpstart.next`. Two lines carried a fact that was **not** duplicated and
  were folded in rather than dropped: *"access rules must hold in the data
  layer, not in the prompt"* (`case-evidence-collection`, now in the Jumpstart
  `low-risk` pillar) and *"roll-out: dedicated landing zone, IAM,
  observability"* (`workforce-optimization`, now in `jumpstart.next[0].text`).
- **`capabilities`** — four stage groups per product, the complete feature list
  under the stage that owns it. Sources: `RESEARCH/02` §3.5 (Account Insights'
  four capability groups, used verbatim as the stage names), §2.7 (the LDE
  capability groups, five folded to four: *Review* and *Export* merged,
  *Quality* and *Integrations* merged), §1.8 (the Workforce accelerator-pack
  matrix, whose four Areas are the four stages), §4.2 and §5.2 for the four
  unpackaged products, whose stages follow their own `overview.steps`.
- **`state` tags.** `workforce-optimization` is the **only** product whose
  matrix legend defines a roadmap tier (`RESEARCH/02` §1.8: *"● provided OOTB …
  ○ - roadmap"*), so it is the only product carrying `supported` / `roadmap`
  tags — twenty-one supported, six roadmap. The Account-Insights and LDE
  matrices grade *Oracle baseline vs SoftServe status*, and their `○` means
  "out of current scope", not "roadmap"; tagging from them would have invented a
  commitment. Those products' items carry no `state` at all.
- The `custom` layer is relabelled **"Custom configuration & integrations"** on
  all seven — the band is where the Inbound / Outbound lines live, and the label
  now says so.

### 15.3 G — POV Jumpstart → the Jumpstart block

Tab id `pov` → `jumpstart` (label **Jumpstart**), with `legacyId: "pov"` so
`#/products/<slug>/pov` still lands. The product key `pov` → `jumpstart`, in the
shape `BRIEF-3` specifies. This retires L5 of §1: the tab is no longer labelled
*POV Jumpstart*, which settles `SPEC`'s objection that "POV" reads as *point of
view* outside the team.

**Figures available per product, and what filled the gaps** — no figure was
invented, and every "Scoped per engagement" is a real absence:

| Product | Duration | Price | Source |
|---|---|---|---|
| `large-document-extraction` | 2 months | €75K services · €0/mo infra; Integration €300–500K · ~€10K/mo | `RESEARCH/02` §2.10 |
| `workforce-optimization` | 2 months | €90K services · €4K/mo infra; Integration €300–500K · ~€25K/mo | `RESEARCH/02` §1.9 (the one-pager + Sep-playbook pair, per its own resolution of the price conflict) |
| `cross-system-erp-qa` · `business-metrics-qa` | 30–45 days | €30–50K fixed per use case | `RESEARCH/02` §5.2.1 |
| `plan-vs-actual-investigation` | 12 weeks + a two-week acceptance phase | Scoped per engagement | `RESEARCH/02` §4.2; price is `[INT]` (SoW value) |
| `account-insights` · `case-evidence-collection` | Scoped per engagement | Scoped per engagement | §14.2 / §14.3 — both durations on record are one customer's contract term, and `C19` is still open |

The two indicative-price asterisks ("depends on document volume, page counts
and pipeline complexity" · "depends on the usage and optimization rules
complexity") are folded into the `next[0].price` string itself, so no asterisk
renders without its footnote in view.

Facts that used to live in `pov` and where they went: `deliverables` →
`outcomes`, rewritten as customer outcomes · `prerequisites` → `needs`, cut to
the three that gate the start · `phases` / `howItRuns` → `timeline` ·
`pricing` + `facts` → `investment` · `ladder[1]` and `ladder[2]` → `next` ·
`team` → an `investment.includes` line · `creditNote` (100% fee credit into a
roll-out signed within 90 days) → an `investment.includes` line on both
Lakehouse products · `howMeasured` → the `tangible` pillar and the outcome line
that names the measurement. **`capabilityMatrix` (the S/M/L glyph table) is not
carried forward**: it graded the three service tiers, and the tab no longer
renders three tiers. Its per-tier content survives as `next[].text`; the
per-capability detail it duplicated is in `technology.capabilities`.

**The packaging-internal disclaimers are gone site-wide** — *"Framed scope,
flexible add-ons"*, *"Each package's price and timing are set by specific
constraints"*, *"Custom features beyond the frame are added for additional price
and time"* — from all seven products, from `disclaimers.publicPricingFootnote`
and from `services.howWeEngage.ladderFootnote`. They describe how SoftServe
builds a quote. What survives: one `footnote` per investment card, the KPI
caveats that travel with published figures, and the Lakehouse pair's *"Price
indicative, to be confirmed per scope. All features used are generally available
product."* (`RESEARCH/02` §7.1). `check-grammar.js` bans the four strings.

### 15.4 H — the Overview tab

- **`overview.sideFacts` deleted** with the At-a-glance card. Every row on it
  was a denormalised copy — category and platform from the facets, availability
  from `availabilityChip`, duration and price from `pov.facts` — and the copy is
  what drifts. Nothing unique was on it.
- **`overview.successStory` reshaped** to `{ customer, logo, headline, metrics
  ×2, story, downloadLabel }`, and set to **`null` on five products**. The
  `state` / `blurb` / `evidenceId` / `adjacentMethodId` shape is retired; the
  two `evidenceId` links are no loss, because the evidence cards still render on
  the home page and on Services from `overview.evidence[]`.
- **Bosch** (`workforce-optimization`): big figures **+4.5%** median jobs per
  technician per day and **~5x** return within three years; the story line
  carries the 83% positive simulations, the 15–20% dispatcher gain, the
  three-month/three-country scope and the modeled-simulations caveat
  (`RESEARCH/07` §4a, §4b, §4e, §7.1, §7.3).
- **Riyadh Air** (`large-document-extraction`): **5–15 min** per 60–100-page
  agreement, down from 3–5 days, and **up to −20%** targeted reduction in manual
  data-entry effort, closing with the one-pager's own *"Targets from the proof
  of value; figures are illustrative, not contractual."* (`RESEARCH/02` §2.4).
  The customer's internal app name and the third-party SaaS product name stay
  out, as before.
- **The two evidence cards are named**: `workforce-proof` → `Bosch` +
  `assets/img/logos/bosch.png`, `extraction-proof` → `Riyadh Air` +
  `assets/img/logos/riyadh-air.svg`, each with its body line re-pointed from the
  anonymised descriptor to the company. This supersedes §14.5's anonymised
  label for those two cards **only** — the industry strings stay as §14.5 set
  them, and every other evidence card is still anonymised. `SCHEMA.md`'s
  "never a company name" rule on `EvidenceCard.customer` is narrowed to "no
  third company name without the same explicit clearance".

### 15.5 C — the contact card

`shared.contact.photo` now ships: `assets/img/people/karsten-tramborg.jpg`,
confirmed by Alex on 2026-09-14. This reverses §13.5, which withheld the
headshot because the only file located had been matched by its position on a
team slide rather than by a face — the confirmation is the missing input, and it
came from the person who knows the face. `ASSETS.md` §3 is the place to record
the file's provenance.

`shared.contact.bring[3]` is **written** copy (no source): the three things a
first scoping call actually needs, which `forms.engagementSteps` already says in
prose — *"Bring the workflow, a rough volume and the current cycle time"*. It is
that sentence, split into a list the panel can render beside the form.

### 15.6 What the renderers must change with this data

The data layer moved first; `site/pages/product.js` and `site/pages/products.js`
still read four keys that no longer exist. Until they are updated:
`product.overview.sideFacts` (was read unguarded), `technology.flow` (guarded,
renders nothing), `technology.security` (renders an empty block), and
`product.pov.*` throughout the POV tab. The seller-gate CTA's `{duration}`
placeholder now reads `product.jumpstart.durationShort`, which is present on the
five products that publish a duration and absent on the two that do not — the
same contract `pov.durationShort` had. `sectionLabels` lost the keys those
blocks used, so a renderer still calling `label("flow")` or `label("ladder")`
prints `undefined` rather than failing loudly.

## 16. The interactive walkthrough round — 2026-09-15

### 16.1 What was added

- `site/demo/large-document-extraction/` — a guided, interactive walkthrough of
  the Large docs pack, to Alex's brief (chat, 2026-09-15): brand-agnostic,
  industry-neutral, no integrations and no real inputs (the upload and the
  download are mocked), the real workflow simplified to six guided steps, hints
  that allow only the designated action, and a UI rebuilt to a higher standard
  while keeping the product's layout, data model and information model.
- **Source of the narrative:** the customer-demo recording
  `Large Document Extraction and Validation Demo.mp4` (SoftServe OneDrive,
  `Projects/Oracle/Customers/RiyahdAir/`), read frame by frame. The recording has
  **no narration** — its audio track transcribes to nothing — so the narrative is
  screen-derived: upload → contracts list → split-view review with service
  groups, a per-row citation to the source page, confidence and pending/approve
  status → row details with evidence and actions → approve all → the flat
  rate-card export opened in a spreadsheet.
- **The generalisation:** the SGHA ground-handling case became a supplier Master
  Services Agreement with a rate schedule (facility services — cleaning,
  guarding, call-outs, volume discounts, cancellation charges), keeping the same
  information model: document → metadata → service groups → rate rows →
  citation + confidence + status → export. Every name, site, rate and clause is
  invented; the one validator flag (a non-contiguous discount tier) is staged.

### 16.2 What changed on the site

- The product is renamed **"Large docs processing and review"** (Alex, chat
  2026-09-15) — `name`, `headline`, the overview evidence link and the Jumpstart
  promise. The slug stays `large-document-extraction`; this settles the
  "…and Review" vs "…and Validation" question §15 left open, in favour of neither.
- `config.js` gains `demoUrl` on every product (empty except Large docs) and a
  `videoPoster` for Large docs; `content.js` gains `shared.demoCta`;
  `product.js` renders the secondary hero button and the same button inside the
  pending-video panel, both `target="_blank"`.
- **Found on the first click (Alex, 2026-09-16):** on the claude.ai preview the
  relative link died with `ERR_BLOCKED_BY_RESPONSE` — the artifact host refuses
  to serve a supporting file as a top-level page. `demoPreviewUrl` (the
  walkthrough as its own artifact) was added and `product.js` uses it only on
  that host; the relative path stays canonical for the real deployment.
- Step frames 1–4 for Large docs are captures of the walkthrough (`ASSETS.md`
  §1); the two video-derived frames and the two illustrations are gone.

### 16.3 Still open

- The walkthrough states counts only (48 pages, 25 values, 1 flag) and makes no
  time or effort claim; whether it should carry the one-pager's figures is
  Alex's call.
- The demo-video recording is still pending; the poster is a walkthrough still
  until it lands.

---

## 17. Round 4 — anonymization, tag families and case studies, 2026-09-16

Alex's round-4 decisions (T1, T2, C1, C2), given with the task. Two of them
reverse round 3.

### 17.0 The clearance that was withdrawn

**§15.0 is reversed. No customer may be named anywhere on the site** — not in
copy, not in alt text, not in a caption, not in a data file, not in a doc that
ships. No logos. The two names round 3 cleared on the strength of SoftServe's
own external one-pagers (§15.0) are out, along with the two logo references,
the `customer` / `logo` / `logoStacked` keys and the `PROOF OF VALUE · <name>`
card labels.

What replaced a name: an **anonymized descriptor** — industry and scale only —
plus an **industry medallion** where the logo sat. The descriptor is written so
that it does not narrow to one company: no country, no city, no product line, no
figure that back-solves to an identity. The four descriptors are in §17.2.

The logo files stay on disk, unreferenced (`ASSETS.md` §4). `check-grammar.js`
now fails on every customer name as a word-boundary string (`Bosch`,
`Riyadh Air`, `DHL`, `SBG`, `BSH`, `Binladin`, `Belron`, `KPN`, `NHS`, `OMV`,
`Channel 4`) **and** on any `assets/img/logos/` path in `content.js`.

**§4 is still open and is now moot in one direction.** The workforce figures
still rest on an Oracle-copyright, `Confidential: Internal/Restricted/Highly
Restricted` deck and still need Oracle **and** customer sign-off (§4, §15.0).
Anonymizing the customer removes one of the two re-identification vectors, not
the copyright question. Record the sign-off here, with a date, when it arrives.

### 17.1 T1 · the three tag families, and the end of the availability chip

| Change | What shipped |
|---|---|
| `shared.tagFamilies` (new) | `pattern` (outlined chip, tooltip *Workflow pattern*, one icon key per `facets.categories[].id`) · `tech` (solid navy pill, tooltip *Runs on*, one icon key per `facets.technology[].id`) · `availability` (two teal badges: `Demo` / *Demo available* / `play`, `Oracle Marketplace` / *Available on Oracle Marketplace* / `storefront`) |
| `availability` (top level) | **deleted** — the three-state chip map |
| `products[].availability`, `.availabilityChip`, `.availabilityTooltip` | **deleted** on all seven |
| `products[].tags` | the trailing availability string removed from all seven (*Available now* ×3, *In preparation* ×2, *Fixed-price offer* ×2) |
| `products[].statusNote` (new) | *"Packaged offering in preparation — scoping conversations are open."* — verbatim from `BRIEF-4` T1, on `case-evidence-collection` and `plan-vs-actual-investigation` only |
| `facets.footnote` | unchanged; it never referred to the availability states |

The badges are driven by `SITE_CONFIG`, not by `content.js`: `Demo` on
`products[slug].video === true` (already a real boolean on all seven,
`CONFIG.md`), `Oracle Marketplace` on `products[slug].marketplace === true` —
**a new boolean, added in this round and `false` on all seven.** L3 of §1 is
unchanged by that: no SoftServe listing on Oracle Cloud Marketplace has been
found by public search, no owner or date is on record, and `marketplaceUrl` is
still empty everywhere. The flag exists so the facet and the badge read one
switch instead of inferring it from a URL; the checker fails a `marketplaceUrl`
set while the boolean is `false`, so a listing cannot appear on the site
half-wired. **Turning either badge on for a product is a claim — confirm the
listing exists before flipping it.**

The seven icon keys `tagFamilies` names are **not in the `ICONS` registry yet**
(`VISUAL-GRAMMAR.md` §6, "Round-4 icons still to draw"); `play` is. The data
layer moved first, as it did in round 3.

### 17.2 C1 · the four case studies, figure by figure

`overview.successStory` → `overview.caseStudy`, reshaped, on the same surface
with the same 3px teal rule. **`null` on three** (`case-evidence-collection`,
`cross-system-erp-qa`, `business-metrics-qa`) — down from five, because the two
in-flight engagements now render.

**Engagement → product → descriptor** (the internal column never reaches the site):

| Engagement | Product | Descriptor that ships | Status |
|---|---|---|---|
| Bosch (cuOpt) | `workforce-optimization` | A global home-appliance manufacturer | `measured` |
| Riyadh Air (AI-Q) | `large-document-extraction` | An international airline | `measured` |
| DHL (AI-Q) | `account-insights` | A global logistics and supply-chain operator | `in-progress` |
| SBG (AI-Q) | `plan-vs-actual-investigation` | A major construction and engineering contractor | `in-progress` |

**A note on what this section was built from.** The `…/scratchpad/research/`
tree is not on disk in the session that wrote round 4, so `RESEARCH/01…07` could
not be re-read. Every figure below was taken from **this file's own recorded
citations** (§1 L10, §4, §15.0, §15.4, §12.1) and from the wiki pages
`context/areas/softserve/{sbg-poc,oracle-pipeline,oracle-packs}.md`, which are
current truth for the two in-flight engagements. **No figure is new**: the two
measured cases carry exactly the numbers §15.4 already shipped, and the two
in-flight cases carry no number at all. If the research tree is restored, the
worthwhile check is the two qualitative targets in (c) and (d) — that neither
understates a figure the sources actually publish.

#### a. `workforce-optimization` — *"A global home-appliance manufacturer"*

- **Descriptor** — adapted from `RESEARCH/02` §1.4 / `RESEARCH/07`: a
  residential appliance-repair field-service operation. *Home-appliance
  manufacturer* is the industry; *global* is the scale. The country names stay
  out (§4), so the descriptor does not narrow to one company on geography.
- **Area** — *"Field-service operations across three countries"*, `RESEARCH/07`
  §7.1, candidate-external-safe tier.
- **Status** `measured`, eyebrow **Measured**.
- **Metric 1** — `+4.5%` *median gain in jobs per technician per day, optimized
  against the current plan*. `RESEARCH/07` §7.1 via §15.4. The mean (6.1%) and
  the maximum (21.7%) stay out; the median leads (§4).
- **Metric 2** — `~5x` *return within three years on the modeled rollout*.
  `RESEARCH/07` §7.1 via §15.4. Rendered with **no absolute figure anywhere near
  it**, per §7.3's back-solving caution.
- **Story** — carries 83% of simulations positive and the 15–20% dispatcher
  productivity gain (same source), the stack (NVIDIA cuOpt on OCI), the data
  ("the customer's own historical operations data") and the human gate. Closes
  on `RESEARCH/07` §7.3's prescribed framing: *"Results are modeled simulations
  against a historical baseline, not measured production outcomes."*
- **Scope row** — *Three months* · *Three countries* · *Around thirty*
  constraints modeled. All three from `RESEARCH/07` §7.1 rows 1, 4 and 6,
  candidate-external-safe, country names withheld. **Absent:** every € figure,
  the ~5,300 work-zone count and the 38/75/100% phasing (medium
  re-identification risk, §4).
- **NDA line** — *"Customer under NDA · reference call available on request"*,
  `BRIEF-4` C1 verbatim.

#### b. `large-document-extraction` — *"An international airline"*

- **Descriptor / area** — `RESEARCH/02` §2.4: an airline's ground-handling
  contract management. Adapted; the airline's name, its internal app name and
  the third-party SaaS product name all stay out, as in every earlier round.
- **Status** `measured`, eyebrow **Measured**.
- **Metric 1** — `5–15 min` *to extract a 60–100-page agreement end to end, down
  from 3–5 days*. The pack's own external sales one-pager, `RESEARCH/02` §2.4,
  unchanged from §15.4.
- **Metric 2** — `up to −20%` *targeted reduction in manual data-entry effort*.
  Same source. It is an explicit proof-of-value **target**, which is why the
  story keeps the one-pager's own caveat.
- **Story** — closes on *"Targets from the proof of value; figures are
  illustrative, not contractual."* (`RESEARCH/02` §2.4, verbatim). Names the
  stack (NVIDIA AI-Q, the customer's own OCI tenancy) and the citation model.
- **Scope row** — *60–100-page agreements* (§2.4) · *about one month* to onboard
  a new station before (§2.4, already shipping in this product's `moreDetail`) ·
  the reviewer approval gate (§2.3). No contract value, no contract duration.
- **NDA line** — as above.

#### c. `account-insights` — *"A global logistics and supply-chain operator"*

The **DHL** engagement (internal name). **Status `in-progress`, eyebrow Target
outcomes.** Sources: `context/areas/softserve/oracle-packs.md` (the pack is
derived from this engagement; *"Proof: none yet — PoC in preparation, results to
follow"*; the signal→opportunity fan-out is the pack's stated differentiator) and
`oracle-pipeline.md`. The round-3 evidence card's own text (`SPEC` §1.4 Card C,
§14.5) is the source for what the engagement measures.

- **Descriptor** — already the shipped anonymized descriptor on the round-3
  evidence card (§14.5); unchanged, and now the callout's title.
- **Area** — *"Account planning across a global enterprise account base"*,
  adapted from the pack's own framing.
- **Metric 1** — `One signal` *fanned out to every account it affects, not only
  the one it names*. **Qualitative, because no figure exists:** the pack has no
  delivered proof (*"PoC in preparation, results to follow"*), and the fan-out
  is the pack's stated differentiator — one real-world signal → structured
  opportunity/risk output per affected account.
- **Metric 2** — `Calibrated` *opportunity confidence, scored against reviewer
  approve and reject decisions*. **Qualitative**, from the engagement's own
  stated measure, which is the sentence the round-3 evidence card already
  shipped: accuracy and confidence calibration against reviewer approve/reject
  decisions.
- **Story** — data footprint (CRM and account framing, the capability catalog,
  public filings), stack (NVIDIA AI-Q on OCI), what it measures. Closes on *"The
  figures above are target outcomes the proof of value is set up to measure, not
  results; they are illustrative, not contractual."*
- **Scope row** — *Proof of value under way* · the three data sources · the
  reviewer gate. **Absent, deliberately:** the contract value and the contract
  duration. Both are on record and both are internal (`C4`, `C19`, and
  `BRIEF-4`'s explicit instruction).
- **NDA line** — *"Customer under NDA · results follow at the end of the proof of
  value"*. This is a **deviation from `BRIEF-4` C1's single line**, which reads
  *"reference call available on request"*. Offering a reference call about an
  engagement that has produced no results is a promise nobody can keep, and
  `ndaLine` is a per-case field. One string reverts it if Alex wants the
  uniform line.

#### d. `plan-vs-actual-investigation` — *"A major construction and engineering contractor"*

**The construction engagement**, mapped to this product. **Status
`in-progress`, eyebrow Target outcomes.**

- **The mapping, and its source.** The engagement is **SBG** (internal name; it never reaches the site). §12.1 of this file already records the row: *"SBG historical-package PoC doc (de-identified) → the five-verb 'what it does' list behind the `plan-vs-actual-investigation` stepper, and the named technology stack (AI-Q, NIM/Nemotron, AI Vector Search, OpenSearch, AI Database 26ai, Document Understanding, Object Storage, Functions/Streaming/API Gateway/OKE, GPU compute)"*. That is the mapping: this product was packaged off that engagement, and the wiki page `context/areas/softserve/sbg-poc.md` (SOW + WBS v0.9.2, read 2026-09-10) is current truth on its scope, success criteria and state. `RESEARCH/04` lists it among the engagements with its NDA status; `RESEARCH/02` §4.2 is the pack-side write-up. Everything in this case comes from those.
- **Descriptor** — the wiki names the customer as a construction contractor.
  *Major* is the scale; *and engineering* is the work. **The country is
  withheld** — naming it would narrow the descriptor to a very small set of
  companies, which is the same reason §4 withholds the workforce geography.
- **Area** — *"Plan versus actual across completed work packages"*, the SOW's own
  use-case statement, generalized off the customer's vocabulary.
- **Metric 1** — `Hours, not weeks` *of expert time to produce an equivalent
  plan-versus-actual analysis*. **Qualitative**, and deliberately so: the SOW's
  first success criterion is *Operational Efficiency — elapsed time / person-hours
  to produce an equivalent analysis*, and its **thresholds are explicitly
  deferred to Discovery** and made a gate exit criterion. There is therefore no
  target number to publish, and inventing one would be exactly the failure
  `BRIEF-4` C1 names. The directional phrasing is `BRIEF-4`'s own sanctioned
  pattern.
- **Metric 2** — `Evidence-backed` *every material finding tied to a source
  record, with a review status*. **Qualitative**, from the SOW's other two
  success criteria (Output Validation Rate, Evidence Coverage) and its testable
  definition of "evidence-backed": project and package context, a traceable
  source file and version, the analytical basis, confidence and review status,
  and visible gaps.
- **Story** — the sample (one completed project), the data footprint (schedule,
  cost and contract exports), the stack (NVIDIA AI-Q over an evidence layer,
  Oracle AI Vector Search, Oracle AI Database 26ai, on OCI) and the coverage-gap
  behaviour. Closes on the same target caveat as (c).
- **Scope row** — *One completed project* · *Schedule, cost and contract exports*
  · *Expert validation on every material finding*. **Absent, deliberately:** the
  contract value, the 12-week + 2-week acceptance duration, the day-rate
  workbook, the infrastructure BoM and every SAR figure. The duration is the
  customer's contract term and `BRIEF-4` bans it; §14.2 already treats both
  durations on record as one customer's term rather than a pack figure.
- **⚠️ The status chip overstates where this engagement is.** The wiki records it
  as **pre-contract** as of 2026-09-11 — the SOW and WBS package is essentially
  built, one cost section is still open, the kickoff target has passed with no
  new date, and customer-side data access is unresolved. `BRIEF-4` C1 assigns
  `in-progress`, so *"Proof of value in progress"* is what renders. The story
  says *"A first engagement is under way"*, which is the softest true reading of
  that state. **Confirm with Alex before launch**; if the answer is that nothing
  has kicked off, the honest fix is to render this case only once it has, not to
  reword the chip.

### 17.3 C2 · the home-page case-study screen

`overview.evidence` → `overview.caseStudies` and `overview.evidenceIntro` →
`overview.caseStudiesIntro`; `services.proof.evidenceIds` →
`services.proof.caseStudyIds`.

- **Four cards, one anatomy.** The two measured cases and the two in progress,
  each a compact form of the product-page callout: medallion, descriptor, status
  chip, **one** headline metric with its eyebrow, one line, the link to the
  product. The checker asserts that each card's descriptor, area, industry and
  status equal the product's, and that its `product.name` equals the product's
  `name` — the round-3 rule that a reader clicking through must not meet a
  different pair of figures, generalized to every field the two surfaces share.
- **The band 1 / band 2 split is gone**, and so are the `PROOF OF VALUE` /
  `FIRST ENGAGEMENT` / `METHOD` labels. §14 kept them deliberately non-uniform
  because the three states were genuinely different; the status chip now carries
  that distinction in data, in two states, and a hand-written label that says the
  same thing is a second place to drift.
- **The two METHOD cards were folded.** `method-like-for-like` said that every
  KPI is computed identically for the current and the optimized plan and that the
  baseline is signed before the clock starts — which `workforce-optimization`'s
  `moreDetail` entry *"How the KPIs are defined"* already says in full, so
  nothing was lost. `method-accuracy-journey` had no other home, and its
  substance (the 81% accuracy figure, the ~80% practical threshold) survives
  verbatim as **`services.proof.methodNote`**, one paragraph under the four
  cards on Services. Its clearance status is unchanged — §14 still lists it as
  needing one, and moving it did not grant it.
- `evidenceIntro` was rewritten as `caseStudiesIntro`: it used to say *"Two of
  these applications have been through a delivered proof of value"* over a
  five-card grid of mixed kinds. It now says four engagements, two measured and
  two under way, and that every customer is under NDA — which is the honest
  reason the cards carry descriptors rather than names.

### 17.4 T2 · the Availability facet group

`facets.marketplace` → `facets.availability` = `{ label: "Availability",
options: [{ id: "demo", label: "Demo available" }, { id: "marketplace", label:
"On Oracle Marketplace" }] }`, with faceted counts, query params `demo=1` /
`mp=1`, and both reset by **Clear filters**. Search and the other two groups are
untouched.

`facets.marketplace.heroCta` (*"View on Oracle Marketplace"*) went with the
object: the Marketplace **badge** is the link to the listing now, so a second
hero button on the same URL was one control too many. The listing link still
renders only where `marketplaceUrl` is non-empty.

**Both options match no product today** (no `video` flag drives a listing, and
`marketplace` is `false` everywhere) — except `demo`, which matches the three
products flagged `video: true`. The `marketplace` option will render a zero
count until a listing is confirmed; that is the honest state, and it is the same
posture `facets.technology`'s two empty facets already take (L1, L2).

### 17.5 The renderers, as they now stand

The data layer moved first again; the renderers landed in the same round and
read the round-4 keys. What changed, file by file:

- `assets/app.js` — `availabilityChip()` and `AVAILABILITY_DOT` are gone,
  replaced by `tagChip(family, id)` (the outlined pattern chip and the solid
  technology pill, each carrying its family tooltip and its glyph) and
  `availabilityBadges(slug)` / `badgeRow(slug)`, which read
  `SITE_CONFIG.products[slug].video` and `.marketplace` and nothing else. The
  eight round-4 icons are in `ICONS`. A delegated handler makes the Demo badge
  an action: on the product page it scrolls to the hero frame and opens it, and
  anywhere else it routes to the product page that carries the frame. The
  shared compact case-study card (`caseCard`, `caseMedallion`,
  `caseStatusChip`, `caseStudyById`) lives here, so the home page and Services
  render one component from one array.
- `pages/product.js` — `heroChips()` builds the chip row from `category` and
  `facet` and skips `tags[0]` and `tags[1]`, which repeat them; the badges sit
  at the right end of the same row and `statusNote` renders under the one-liner.
  The Marketplace and success-story hero buttons are gone — the badge is the
  link to a listing, and the case study owns its one link out. `successStory()`
  became `caseStudy()`: band, medallion, descriptor, area, status chip, two
  figures under their eyebrow, story, three-fact scope row, NDA line, and the
  download link only where `successStoryUrl` is set.
- `pages/products.js` — the single marketplace checkbox became the Availability
  group: two faceted checkboxes on the same two config booleans, `demo=1` and
  `mp=1` in the query, both reset by Clear filters. A zero-count box is disabled
  rather than a dead end, matching the radio groups. The search index reads
  `statusNote` instead of the retired `availabilityChip`.
- `pages/overview.js` — the proof rows became the four-card case-study grid.
- `pages/services.js` — the brief and note cards became the same four cards,
  resolved through `services.proof.caseStudyIds`, with `methodNote` beneath them.

Dead CSS went with them: `.story-*`, `.proof-row/-copy/-customer/-industry/
-scope/-metrics/-footnotes/-logo`, `.metric*`, `.brief*`, `.note-card/-grid/
-title/-body` and the three `.chip-dot--*` availability states.

`SITE_CONFIG.products[slug].successStoryUrl` keeps its name: it is a config key,
not shipped copy, and renaming it would touch seven entries for no reader-facing
gain. It is what gates the case study's download link.

`check-grammar.js` passes with **0 failures and 0 warnings** on this data; it
asserts the new slots and cannot see the renderers, so the renderer side was
verified in the browser instead — all 38 routes render with a clean console,
the case study appears on exactly the four products that carry one and on no
other, and the two unpackaged products are the only two with a status note.

### 16.4 Red-team round — is the demo narrower than the pack? (2026-09-16)

Alex asked whether the walkthrough was narrower than what the package docs
generalise. Checked against the sales one-pager (rates, rules and terms; four
verticals; the S/M/L feature rows), the Jul-27 accelerator one-pager (the
capability matrix and its worked examples per vertical) and the site's own
product copy. Four gaps, all closed **without touching the flow, the screens or
the information model** (upload → documents → split-view review → export; groups
→ rows → citation + confidence + status), so the demo stays a faithful preview of
the delivered reviewer:

- **Rates only.** The agreement now also carries **Commercial terms** (initial
  term, renewal notice, payment terms, indexation, service credits, termination —
  cited to clause paragraphs, not tables) and **Insurance requirements**
  (Schedule G): 34 values in 10 groups.
- **One document type, decorative classification.** Every document now shows its
  **type and schema** (list and metadata card); a **second document of another
  type opens** — an insurance policy schedule (locations, deductibles, sub-limits,
  endorsements, premium) with its own schema; the documents list gains a type
  filter and a KPI strip; a lease and a regulatory filing sit in the list as
  scenery.
- **One validator.** Now **four validator kinds plus low-confidence routing**:
  a suggested fix (tier continuity, on the agreement), a value outside its
  expected band against the prior document, a required field not found (enter
  the value or mark it N/A), a cross-field check (instalments vs premium), and a
  value under the 85% threshold routed to a reviewer. Approve all never touches a
  flag.
- **No integration or KPI surface.** A sources strip (manual upload · connected
  repository), export as XLSX / CSV / JSON against a named reference template
  with a mocked send to the cost / ERP target, and a KPI strip (documents,
  types, values, approved-without-edit share, benchmark accuracy on an annotated
  set). **The accuracy figure is synthetic** — flagged to Alex as the one number
  he may want removed.
- Also aligned with the real product: **schema-specific columns per group** —
  the discount table carries "Visits from / to", the rate table "Rate basis /
  Rate" — as the DOX reviewer does (its discount-handling table has different
  columns from its basic-handling table).

`tools/capture-demo-frames.mjs` gained a data-driven `MODE=script`;
`tools/capture-policy-scenario.json` walks the second document type through its
validator kinds. Frames and poster re-captured.
