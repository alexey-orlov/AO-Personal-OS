# ASSETS.md — step frames, industry images, headshot, customer logos

What the E2 stepper, the E2 industry tabs, the E5 contact card and the named
success stories render, where each file came from, what was done to it, and what
the licensing position is.

This file is **not served** — the site root is `site/`. It is the operator record
that `site/assets/img/manifest-edits.json` deliberately does not carry, under the
same ship gate as `heroes.json` (PROVENANCE §8 / §11.1): nothing served from the
public root may name an internal deck, a customer, or an internal path.

Manifest: `site/assets/img/manifest-edits.json`
Build scripts (scratch, rerunnable): `steps_shots.py`, `steps_illus.py`,
`industries.py`, `manifest.py`, `grade.py` in the assets working folder.

---

## 1. Step frames — `assets/img/steps/`

Every product ships **four** steps: intake → processing → review/decision →
delivery. Frames are 16:10. Screenshots are 1600 × 1000 JPEG (q86, ≤ 300 KB);
illustrations are SVG at a 1600 × 1000 viewBox (≈ 3 KB each).

**The legibility rule, for both kinds.** The frame renders about **454 CSS px
wide** on the Overview tab. A frame whose type does not survive that reduction is
not a picture of the product doing the step — it is a decorative placeholder, and
it reads as one.

- Illustrations: `rendered = font-size × (454 / viewBox width)` must be **≥ 12**.
  At a 1600 viewBox that means 44 px type or larger, which is why the scenes
  carry few, large labels rather than many small ones.
- Screenshots: `rendered = source px × (454 / crop width in source px)`, same
  floor. A full application capture cannot clear it — crop to the one region the
  step is about, and keep every heading whole inside the crop.

### Product frames from the interactive walkthroughs (12 frames + 3 posters, 3 products)

All four `large-document-extraction-*.jpg` frames are captures of the site's own
interactive walkthrough (`site/demo/large-document-extraction/`, 2026-09-15),
not of the delivered product. The walkthrough keeps the product's layout and
data model — upload → documents → split-view review with a citation on every
value, confidence and business-rule validators → rate-card export — on a
**synthetic** supplier agreement (`MSA-2026-014`, "Meridian Facility Services
Ltd", invented sites NGC / RDC, invented rates and clauses), so the frames carry
no customer, no real counterparty and no real figure. That is the standard any
future product screenshot has to meet before it ships.

| File | Shows | Capture state |
|---|---|---|
| `large-document-extraction-1.jpg` | Upload: the pipeline stages — classify, route pages, extract, score and cite, validate | Upload screen mid-processing |
| `large-document-extraction-2.jpg` | Extract: a group expanded in the columns its schema needs — rows, rate basis, section, confidence, status | Review tab, Routine cleaning open |
| `large-document-extraction-3.jpg` | Score, cite, validate: the flagged row's details — evidence, confidence, the validator's rule and its suggested fix | Review tab, Volume discounts open, flagged row selected |
| `large-document-extraction-4.jpg` | Review and export: the flat table against the reference template, XLSX / CSV, and the send to the target system | Export tab after approval |

**Capture.** `tools/capture-demo-frames.mjs` drives the walkthrough in headless
Chrome over the DevTools protocol (`MODE=frames DPR=2`, the page opened with
`?tour=off&ui=clean` — no welcome card, no guide, no guide toggle) through the
same clicks a viewer makes, at 1600 × 1000 CSS px and device scale 2. Each frame
is then a **640 × 400 CSS-px crop of the region the step is about** (1280 × 800
device px), Lanczos to 1600 × 1000, light unsharp, progressive JPEG q≈86 — the
crop, not the full screen, is what keeps 13–14 px UI text near 10 px at the
frame's 454 px render width, the same band the earlier video-derived frames sat
in. The crop offsets used: `-1` (260, 150) · `-2` (880, 350, 700 × 438) · `-3`
(880, 560, 700 × 438) · `-4` (880, 130, 700 × 438). `.step-frame` adds a 1 px
inset rim in CSS so every frame, raster or vector, is bounded the same way.

**Poster.** `assets/img/posters/large-document-extraction.jpg`, 1600 × 900: the
full review screen with the first group open and no details panel, set as
`videoPoster` so the pending video frame shows a still of the product instead of
the plate. It is a distinct capture from every step frame, as VISUAL-GRAMMAR §1
requires.

**Re-captured 2026-09-16** after the generalisation round — two document types, schema-specific columns per group, four validator kinds (PROVENANCE §16.4) — with the same crops and the same capture states.

**Workforce optimization (2026-09-16).** All four `workforce-optimization-*.jpg`
frames and `posters/workforce-optimization.jpg` are captures of the second
walkthrough (`site/demo/workforce-optimization/`, PROVENANCE §19), not of the
delivered product. The walkthrough keeps the product's flow and information
model — run optimization (region · period · XLSX) → schematic map with zone and
technician details → current-vs-optimized compare → weekly schedule in zone and
technician view with before/after KPIs → accept / reject / comment →
re-optimize with feedback → export in the field-service import format — on a
**fictional metro** ("Harborview": twelve invented districts HV-01…HV-12 with
invented postcodes, eighteen synthetic technician ids T-1041…T-1058, no names),
so the frames carry no customer geography, no real zone-naming convention, no
real resource id and no figure outside the cleared band (fleet productivity
4.54 → 4.75 jobs per technician per day, +4.5%). That closes the rejection
recorded below.

| File | Shows | Capture state |
|---|---|---|
| `workforce-optimization-1.jpg` | Load the period's data: the Run optimization modal — sources (manual XLSX · field-service system connected · booking, inventory, HR/WFM, forecast, BI configured), region, period, the attached file and its seven sheets | Run modal, file chosen, before Optimize |
| `workforce-optimization-2.jpg` | Set the rules: the Optimization settings drawer — planning mode and capacity, objectives and weights (productivity 40 · waiting time 35 · workload balance 25) and the first hard rule | Settings drawer over the optimized plan |
| `workforce-optimization-3.jpg` | Solve the plan: the solver stages — validate the input (with its warning), travel matrix, rules, GPU solve, KPIs | Run modal 2.3 s into the run |
| `workforce-optimization-4.jpg` | Review, approve, measure: the value readout under the toolbar — the first three KPI tiles, each a big coloured delta over its before → after line (jobs per technician per day +4.5%, capacity used +3 pts, avg wait −0.6 d) | Final plan (v2, decisions accepted), KPI band, narrow viewport |

**Capture.** The same tool in `MODE=script` with `tools/capture-wfo-frames.json`,
`DPR=2` (`tools/capture-wfo-tour.json` drives the whole guided tour by real
clicks and is the tour's regression test — it reports console exceptions).
`-1`, `-2` and `-3` are taken with the page opened at `?tour=off&ui=clean&state=start`
(the scenario runs the optimization itself); `-4` and the poster with
`&state=final` — plan v2 with the decisions accepted, so the band reads the
cleared +4.5% rather than plan v1's +4.8% — and only the two last shots of the
scenario are kept from those runs. Two viewports:

    MODE=script STEPS=tools/capture-wfo-frames.json DPR=2 W=1600 H=1000 \
      node tools/capture-demo-frames.mjs \
      "file://<repo>/site/demo/workforce-optimization/index.html?tour=off&ui=clean&state=start" /tmp/wfo1600
    MODE=script STEPS=tools/capture-wfo-frames.json DPR=2 W=1184 H=1000 \
      node tools/capture-demo-frames.mjs "<same URL>" /tmp/wfo1184

`-1`, `-2`, `-3` and the poster come from 1600 × 1000 runs; `-4` comes from
the 1184 × 1000 run, because three of the band's five tiles fit a 640 px crop
only in the narrow window between 1181 px (below it the band reflows to three
columns 349 px wide) and ~1185 px (above it five 1/5-width tiles are again too
wide). At 1184 px the three span 639 px and fill the crop edge to edge.

Crops follow the rule above and were converted with `sips` (crop → resample →
JPEG) on a Mac without ffmpeg; no unsharp pass — e.g. for `-1`

    sips -c 800 1280 --cropOffset 522 960 frame-1.png --out c.png   # device px, Y then X
    sips -z 1000 1600 c.png --out b.png
    sips -s format jpeg -s formatOptions 86 b.png --out workforce-optimization-1.jpg

Offsets in CSS px (device px are twice these, at `DPR=2`): `-1` (480, 261,
640 × 400) · `-2` (960, 176, 640 × 400) · `-3` (480, 298, 640 × 400) · `-4`
(87.5, 130, 640 × 400, at the 1184 px viewport). The poster is a 1600 × 900
crop of the 1600 × 1000 dashboard taken from y = 66 rather than from the very
top: dropping the topbar buys the whole schedule header, so the poster carries
the KPI band, the map with every zone, the "What the solver changed" list and
the Weekly schedule header, with no details panel and the toast hidden. It is
JPEG q82 (q86 puts it at 314 KB, over the 300 KB ceiling); the four step
frames are q86. **`sips` gotcha:** `--cropOffset 0 0` means *centred*, not
top-left — any other value is an absolute top-left origin, so a true top crop
needs a non-zero offset on one axis.

**Superseded.** The two earlier real-UI frames (`-2`, `-3`, crops of the
customer-demo recording on the synthetic `SYN-GHA-RL-001` ground-handling
contract, with the per-channel darkening curve) and the two illustrations at
`-1` and `-4` are gone from disk; the walkthrough frames replace all four so the
product's stepper reads as one system.

**What was rejected.**

- **The four workforce-optimization PoC captures.** They were shipped once and
  have been withdrawn. Between them they printed the engagement's real
  geography (ten Dutch municipalities and an airport, on a labelled service-zone
  map), the customer's zone-naming convention (`NL_north_west_…`), the zone
  count, and ten ten-digit technician resource ids — while the page beside them
  calls the engagement "a global home-appliance manufacturer" and `PROVENANCE`
  §4 records the deliberate decision to withhold the country names because the
  geography narrows that label to roughly one company. Two of them additionally
  printed per-technician uplift ("77% → 87% capacity", "4.98 → 6.47 jobs/day",
  "60% → 100%", "4.2 → 7.6") six to eighteen times the median figure the product
  is cleared to claim, under a disclaimer calling the results modeled
  simulations. Blurring is not enough: the map, the ids and the figures are the
  content. The product shipped four designed illustrations instead until the
  captures could be regenerated against synthetic data — a fictional metro,
  invented zone names, synthetic ids, and deltas inside the cleared band.
  **Done 2026-09-16:** the four frames are captures of the walkthrough on
  exactly that data (block above); the illustrations are gone from disk.
- **The Account Insights reviewer console.** Every frame of it fans real
  published news to named real companies — the account, the news source, the
  cross-account effects and the opportunity chips are all real company names,
  several of them SoftServe customers. Blurring them leaves an empty page.
- **The Intelligent Document Extraction service-packages deck** contains no
  product UI — its 40 images are slide exports, and those carry a customer name
  in the case study.

**Cross-system ERP Q&A (2026-09-16).** All four `cross-system-erp-qa-*.jpg`
frames and `posters/cross-system-erp-qa.jpg` are captures of the third
walkthrough (`site/demo/cross-system-erp-qa/`, PROVENANCE §22). There is no
delivered product behind this pack, so the "real product" the frames have to be
faithful to is the **platform** — Oracle Autonomous AI Lakehouse (Data Studio)
and Oracle AI Data Platform (Agent Hub), replicated from Oracle's own product
videos and doc figures, plus a small Redwood steward app. The world is
synthetic throughout: a fictional multi-entity group, invented supplier names
(Kestrel Components, Orion Fasteners, Halden Tooling …), invented ids on each
system's real key shapes (Fusion `S-10422`, JDE `AB 118207`, NetSuite `V-4187`),
invented balances, and a coverage band that carries **no** time-to-answer, cost,
saving or delivery-time figure — the pack has no cleared outcome number, and the
band shows counts and coverage only. No customer mark, no Oracle logo file, no
currency symbol beyond the USD column header.

| File | Shows | Capture state |
|---|---|---|
| `cross-system-erp-qa-1.jpg` | Connect the applications: Data Studio › Catalog with the five mounted source catalogs (`FUSION_ERP` · `JDE_E1` · `NETSUITE` · `CRB_INHOUSE` · `CRM_ICEBERG`), the entity-type pills and "Showing 41 entities" | `state=start`, Catalog, 640 px viewport |
| `cross-system-erp-qa-2.jpg` | Shape one decision domain: the Mapping review health band in full — six tiles, before → after the rebuild (5 sources · 1 model · 13 certified views; 61.2 % → 93.2 % resolved; 37 → 0 unmapped accounts; ledgers 1/3 → 3/3; 14 duplicate pairs; stalest source unchanged) | `state=refreshed`, Mapping review, 676 px viewport |
| `cross-system-erp-qa-3.jpg` | Guard it in the data layer: the **same question, answered under a role** — the "Viewing as Marcus Bell · Regional analyst NA" chip, "Total rows: 4", four JDE rows in a "Q3 spend, NG-NA (USD)" column, and the policy banner "Rows are limited to NG-NA by the row policy; BANK_ACCOUNT redacted · TAX_ID partially redacted" over the action chips | `state=final`, `role=analyst`, `q=1`, Agent Hub, 868 px viewport |
| `cross-system-erp-qa-4.jpg` | Ask in plain language: the Agent Hub answer to question 1 as the controller — "Total rows: 11 · Displayed: 11 · as of 09:02 (stalest: NetSuite, 38 min behind)" over the three `GOLD` views it read, and seven of the eleven rows carrying their Fusion / JDE / NetSuite badges | `state=final`, `q=1`, Agent Hub, 868 px viewport |

**Capture.** `tools/capture-demo-frames.mjs` in `MODE=script` with
`tools/capture-erpqa-frames.json`, `DPR=2`, the page opened at
`?tour=off&ui=clean&state=start`
(`tools/capture-erpqa-tour.json` drives the whole guided tour by real clicks and
is the tour's regression test — `LOGS: none` is the gate). The scenario itself
walks every state through `window.DEMO` — `prime('start'|'refreshed'|'final')`,
`setApp`, `ask`, `openPanel`, and for `-4` a real `decide('M-ORION','reject')`
followed by `rerun()` — so one scenario file produces all five shots and each
**viewport** run keeps only the shot it was sized for:

    MODE=script STEPS=tools/capture-erpqa-frames.json DPR=2 W=640 H=900 \
      node tools/capture-demo-frames.mjs \
      "file://<repo>/site/demo/cross-system-erp-qa/index.html?tour=off&ui=clean&state=start" /tmp/erp640
    # …the same command with W=676 H=900, W=860 H=1200 and W=980 H=1100

Four viewports, because each surface fits a 640 CSS-px crop at a different
width: `-1` from the 640 run (the left nav takes 172 px, so the five
mounted-catalog chips only wrap inside the remaining 468 px — and therefore
inside the crop — at a viewport that narrow; the price is that the entity-type
pill row, which is centred and does not wrap, runs past the page and its last
pill sits on the crop's right edge);
`-2` and `-4` from the 676 run (the health band reflows to 3 × 2 tiles under
1120 px and is exactly 640 px wide at a 676 px viewport, so all six tiles land
inside the crop at the same apparent size three of six would have at 1240 px);
`-3` from the 860 run (the answer grid is 630 px wide there, so the crop holds
the badges, the chips and the trace); the poster from the 980 run (nav 180 px +
page 800 px, so an 800 px crop is the whole page with nothing cut).

Crop offsets in CSS px (device px are twice these, at `DPR=2`): `-1` (0, 44,
640 × 400) · `-2` (18, 100) · `-3` (200, 675) · `-4` (18, 100). Every edge is
placed on a real boundary — `-1` starts at the Data Studio bar and ends in the
white below the green *View* band; `-3` starts on an answer-row boundary and
ends on a trace-span boundary. Converted with `sips` (crop → resample to
1600 × 1000 → progressive JPEG q86) on a Mac without ffmpeg; 203–240 KB each,
inside the 300 KB ceiling. **`sips` gotcha, again:** `--cropOffset 0 0` means
*centred*, so a crop anchored at the left edge needs a non-zero Y with X = 0.

**Poster.** `assets/img/posters/cross-system-erp-qa.jpg`, 1600 × 900 (an
800 × 450 CSS-px crop at `DPR=2`, offset (180, 86), no resample, q86, 247 KB):
the Agent Hub answer at `state=final` — the question in plain English, the
"Total rows: 11 · as of 09:02 (stalest: NetSuite, 38 min behind)" line with the
three `GOLD` views it read, and eight of the eleven rows with their source
badges. It is wired as `videoPoster` but **nothing renders it yet**: the product
has `video: false`, so the hero has no media frame (`docs/CONFIG.md` §3). It is
captured now so that turning the frame on later is a one-word change.

### Designed step illustrations (16 frames, 4 products)

`account-insights-1..4`, `case-evidence-collection-1..4`,
`plan-vs-actual-investigation-1..4`, `business-metrics-qa-1..4`. Large docs,
Workforce optimization and Cross-system ERP Q&A are the three products whose
frames are captures (above); the four `cross-system-erp-qa-*.svg` illustrations
were deleted from disk on 2026-09-16 when the captures replaced them.

Drawn, not sourced. One grammar across all of them: ground `#10161A` with a
`#0E2D4D` radial lift, 2–3 px strokes (≈ 1.5 px on screen at the rendered size),
teal `#35CCBA` for the active path and slate `#496683` for structure, one
teal eyebrow of **at most three words** per frame and short uppercase labels
underneath. No emoji, no filled icons, no sentences inside the artwork — the step
title and caption live in the page, not in the picture.

Scene vocabulary, so the same step reads the same way on every product:
fan-in (intake), graph / dossier / semantic layers / bars / weighted rules /
constraint solve (processing), three decision rows (review), fan-out and answer
card (delivery). The three answer cards carry a different inner glyph — bars,
merge, trend — so a reader moving between products can tell them apart.

Labels are 44–56 px in the 1600 viewBox (12.5–15.9 CSS px in the frame) and the
eyebrow is 50 px. The scenes are laid out around that type: three or four
labelled nodes, wide cards, generous gaps. Where a label has to cross artwork —
the account-map frame — it sits on a soft `#10161A` plate rather than shrinking.

---

## 2. Industry images — `assets/img/industries/`

One file per key in the fixed set of sixteen (VISUAL-GRAMMAR §5), 1200 × 750
JPEG, q86, ≤ 180 KB.

| Key | Source | Register |
|---|---|---|
| `manufacturing` | IP Customer Stories deck, `image83.jpeg` (tight crop, different framing from the `plan-vs-actual-investigation` hero) | photo |
| `logistics` | IP Customer Stories, `image91.jpeg` | photo |
| `utilities` | IP Customer Stories, `image89.jpeg` | photo |
| `healthcare` | IP Customer Stories, `image96.png` (cropped below the head) | photo |
| `travel-transport` | IP Customer Stories, `image90.jpeg` | photo |
| `public-sector` | IP Customer Stories, `image87.jpeg` | photo |
| `professional-services` | IP Customer Stories, `image84.jpeg` | photo |
| `retail` | AIDP Factory V2, `image83.png` | photo |
| `life-sciences` | AIDP Factory V2, `image88.png` | photo |
| `financial-services` | IP Customer Stories, `image25.png` | abstract render |
| `insurance` | IP Customer Stories, `image56.png` | abstract render |
| `telecom` | IP Customer Stories, `image37.png` | abstract render |
| `energy` | IP Customer Stories, `image46.png` | abstract render |
| `automotive` | IP Customer Stories, `image65.png` | abstract render |
| `construction` | IP Customer Stories, `image63.png` | abstract render |
| `cross-industry` | AIDP Factory V2, `image2.png` | abstract render |

**Treatment.** The hero recipe (`heroes-work/process3.py`), unchanged in
substance: focal crop to 8:5 → Lanczos with unsharp when upscaling > 1.2× →
shadow-targeted denoise on the photographs → a solved levels curve landing the
median in the 45–63 band with p99 ≥ 204 → off-teal chroma collapsed onto luma →
teal cast → desaturate → fine grain. Per-image `teal`, `sat` and chroma-pull
knobs trim the spread; the values are in `industries.py`.

**Why six keys are abstract.** The harvest holds no photograph of an insurance,
banking, telecom, energy, automotive or construction scene — the only genuinely
photographic pool in the whole corpus is eleven frames in one deck. Rather than
mix photographs with synthetic line art, the six fall back to metallic renders
from the same decks, graded identically, so the strip reads as one system.

**People.** No face is identifiable in any shipped industry image: every person
is a silhouette, seen from behind, blurred, or cropped below the head. No logo,
no shopfront name and no legible screen text survives in any crop.

---

## 3. Headshot — `assets/img/people/karsten-tramborg.jpg`

Ships. 480 × 480 JPEG, progressive, q85, 33 KB. `shared.contact.photo` points at
`assets/img/people/karsten-tramborg.jpg` and the contact card renders the
portrait instead of the "KT" initials avatar.

**Source.** **SoftServe AIDP Factory V2** (presentation templates),
`ppt/media/image76.jpeg`, 460 × 460. It was located by **position, not by face**:
on the "Oracle AI DP Team at a Glance" slide each person's picture sits at a
fixed offset to the left of their name box (pic `x` = name `x` − ≈ 567 000 EMU,
one row down), and the picture carrying that offset from the text run "Karsten
Tramborg" is `rId7` → `image76.jpeg`. That heuristic alone was **not** enough to
ship — the site prints the name, the title and a working mailto beside the
picture on every Contacts tab, so a neighbouring tile would publish a colleague's
face under Karsten's name. **Alex confirmed the identity on 2026-09-14**; that
confirmation, not the offset, is what clears it.

**Treatment.** `-auto-orient` → Lanczos to 480 × 480 with a centre `^`/extent
square crop → light unsharp (`0x0.8+0.6+0.02`) → +4 contrast → strip → progressive
JPEG q85. Deliberately **not** teal-graded: a portrait in a contact card should
read as a portrait, not as part of the hero system.

**Title.** The pack one-pagers print his contact block as

> Karsten Tramborg · Alliances & Partnerships Director, SoftServe

in both the Workforce Optimization sales one-pager and the Intelligent Document
Extraction sales one-pager. Use **Alliances & Partnerships Director**. The AIDP
Factory deck labels the same person "NVIDIA Partner Director" — the one-pagers
are the pack's own contact block and the later source, so they win; the site must
not print both. Neither one-pager contains a picture element, so the headshot had
to come from the team slide.

The email on the site is the shared alias `oracle@softserveinc.com` as
instructed. The one-pagers print his personal address; it must not ship.

---

## 4. Customer logos — `assets/img/logos/`

> ⛔ **Round 4, 2026-09-16 — nothing in this folder is referenced any more, and
> no customer is named anywhere on the site.** Alex withdrew the 2026-09-14
> clearance that named two customers: there are now no customer names, no logos,
> no names in alt text, captions, data files or shipped docs. Every case study
> identifies its customer by an **anonymized descriptor** (industry and scale)
> and an **industry medallion** — a circle carrying the industry line icon —
> where the logo used to sit (`VISUAL-GRAMMAR.md` §2.6).
>
> **The files stay on disk, unreferenced, pending customer approval.** They are
> not deleted, because the approval that would bring them back is a conversation
> with two account teams, not a re-derivation: the recolouring recipes below are
> the part that would be expensive to redo. `check-grammar.js` fails the build
> if any path under `assets/img/logos/` reappears in `data/content.js`, and it
> fails on each customer name as a string, so the files cannot come back by
> accident — only by removing that guard deliberately, which is the record that
> a permission arrived.

The section below describes the two files as they were prepared on 2026-09-14,
and the licensing position that applied while they shipped. It is history, not
current state.

| File | Size | What it is | Source |
|---|---|---|---|
| `bosch.png` | 720 × 161, 21 KB | Bosch supergraphic + wordmark, **all-white**, transparent | `WF_draft.pptx` (Monthly AI product overviews / AI Solutions review – Sep), `ppt/media/image7.png` — 960 × 216 transparent PNG of the official brand lockup |
| `riyadh-air.svg` | 14.8 KB | Riyadh Air roundel + Latin/Arabic wordmark, **all-white**, vector | `NEW_09.06 Riyadh Air – Oracle – SoftServe PoC Demo.pptx` (Projects/Oracle/Customers/RiyahdAir), `ppt/media/image15.svg` — the deck's own vector logo, single-fill `#250852` |
| `riyadh-air.png` | 720 × 247, 25 KB | raster fallback of the same, transparent | rendered from `riyadh-air.svg` |

**Treatment.** Both are reduced to a **single white ink** so they sit on the dark
surface the same way the shipped `softserve-logo-white.svg` and
`oracle-wordmark-white.svg` do, and so no brand colour competes with the site's
teal accent.

- Bosch: `-trim` → alpha preserved, RGB set to 100 % (white) → Lanczos to 720 px
  wide → PNG32. The source's red wordmark and black supergraphic both become
  white; the anchor symbol's interior counters stay transparent, so the mark reads
  correctly. Black-on-dark would have been invisible, which is why the original
  full-colour file is not what ships.
- Riyadh Air: the single fill class `#250852` (and the stray `#1A1A1A` presentation
  attributes under it) rewritten to `#FFFFFF`, the Office-specific class name and
  `id="AW"` dropped. Geometry untouched — this is the airline's own vector
  artwork, not a trace.

**No Wikimedia fallback was needed.** Both marks came out of SoftServe's own
customer decks, so nothing was fetched from the open web and there is no external
source URL to record.

**Licensing position.** These are third-party registered trademarks reproduced to
identify the customer in a reference story. They ship on Alex's statement that
both customers are referenceable; the permission lives with the account teams, not
in this repo. Recolouring to a single white ink is the standard reversed-logo
treatment both brands publish for dark grounds, but it is still a modification —
if either account team supplies an official reversed asset, replace the file
rather than re-deriving it.

**This is what happened on 2026-09-16**, in the other direction: the names came
out of `data/content.js` in the same change that unreferenced the logos, because
the logo was never the only place the customer was identified — the descriptor,
the industry string and the story all named them too. Bringing either back is a
three-part change (the file reference, the descriptor, the deny-list entry in
`check-grammar.js`) and it needs the account team's written permission recorded
here, with a date.

---

## 5. Licensing and provenance caveats

- Every raster used is from **SoftServe's own decks**; nothing carries a
  watermark or a third-party stock mark.
- The photographic picks are **AI-generated art commissioned inside a SoftServe
  deck**, not licensed stock — garbled micro-glyphs survive on a couple of them.
  Worth one line of confirmation with whoever owns that deck before the site goes
  public. There is no visible external origin to flag.
- The two step screenshots are **SoftServe product UI** — the document-extraction
  reviewer, built by SoftServe on OCI. Both run on a synthetic contract with
  invented station names, not on a customer's records. This was **not** true of
  the four workforce captures that shipped alongside them: those printed the
  engagement's real geography, its zone-naming convention, technician resource
  ids and uncleared uplift figures, and they have been withdrawn (see §1). Check
  a capture frame by frame before trusting a sentence like this one about it.
- **The headshot ships on a human confirmation, not on the offset heuristic that
  found it** (see §3). If that confirmation is ever retracted, pull the file and
  blank `shared.contact.photo` in the same change — the card falls back to its
  initials avatar on its own.
- **The two customer logos are third-party trademarks** (see §4). They were the
  only assets on the site whose right to ship rested on a customer's permission
  rather than on SoftServe owning the file — which is exactly why they are the
  two that came off the site on 2026-09-16. They remain on disk and
  **unreferenced**; nothing renders them, and the build fails if anything starts
  to. Everything else in `assets/img/` is SoftServe's own material.
- Nothing on OneDrive was modified; every extraction was a read-only
  `unzip`/`unzip -p` or `pdftotext`/`pdfimages` against a copy.
