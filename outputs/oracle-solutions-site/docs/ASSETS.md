# ASSETS.md — step frames, industry images, headshot

What the E2 stepper, the E2 industry tabs and the E5 contact card render, where
each file came from, what was done to it, and what the licensing position is.

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

### Real product UI (2 frames, 1 product)

| File | Shows | Source deck |
|---|---|---|
| `large-document-extraction-2.jpg` | The extracted rate rows, column by column, against the rules for the document type | Workforce/product draft deck, `media/image16.jpeg` |
| `large-document-extraction-3.jpg` | Reviewer console: rule, confidence, source page, approve | R&D GenAI Solutions monthly update (Jun), `media/image6.png` |

**Treatment.** Crop to the legible region (2.0–2.6× into the source frame) →
Lanczos to 1600 × 1000 → unsharp (r 1.1 / 70 %) → a per-channel curve that takes
white down to about `#B0B8C0` and cools it, so a light product UI is no longer
the brightest thing on a dark page. `-2` also carries a soft right-edge fade into
the panel ground, where the source's own horizontal scroll clipped a column.
Progressive JPEG, 4:2:2. `.step-frame` adds a 1 px inset rim in CSS so every
frame, raster or vector, is bounded the same way.

**Data shown.** Both frames run on a **synthetic** contract — "Synthetic Envelope
ID", `SYN-GHA-RL-001`, invented stations "Northbridge International (NBI)" and
"Westport Gateway (WPG)". That is the standard any future product screenshot has
to meet before it ships.

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
  content. The product ships four designed illustrations instead, and will keep
  doing so until the captures are regenerated against synthetic data — a
  fictional metro, invented zone names, synthetic ids, and deltas inside the
  cleared band.
- **The Account Insights reviewer console.** Every frame of it fans real
  published news to named real companies — the account, the news source, the
  cross-account effects and the opportunity chips are all real company names,
  several of them SoftServe customers. Blurring them leaves an empty page.
- **The Intelligent Document Extraction service-packages deck** contains no
  product UI — its 40 images are slide exports, and those carry a customer name
  in the case study.

### Designed step illustrations (26 frames, 7 products)

`account-insights-1..4`, `case-evidence-collection-1..4`,
`plan-vs-actual-investigation-1..4`, `cross-system-erp-qa-1..4`,
`business-metrics-qa-1..4`, `workforce-optimization-1..4`,
`large-document-extraction-1` and `-4`.

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

## 3. Headshot — none ships

`shared.contact.photo` is **empty** and the contact card renders its "KT"
initials avatar. There is no file under `assets/img/people/`.

A candidate was prepared and then withdrawn. It came from **SoftServe AIDP
Factory V2** (presentation templates), `ppt/media/image76.jpeg`, and it was
identified by **position, not by face**: on the "Oracle AI DP Team at a Glance"
slide each person's picture sits at a fixed offset to the left of their name box
(pic `x` = name `x` − ≈ 567 000 EMU, one row down), and the picture carrying that
offset from the text run "Karsten Tramborg" is `rId7` → `image76.jpeg`. No facial
comparison was made, and the site prints that name, that title and a working
mailto beside the picture on every Contacts tab. If the offset heuristic picked a
neighbouring tile, the site publishes a different colleague's face under Karsten's
name to customers. An unverified portrait is not a shippable asset.

**To restore it:** get Karsten's (or Alex's) confirmation that the image is him,
re-run the crop (Lanczos to 480 × 480, light unsharp, +4 % contrast; deliberately
**not** teal-graded — a portrait in a contact card should read as a portrait),
put the file back at `assets/img/people/karsten-tramborg.jpg` and set
`shared.contact.photo` to that path. `check-grammar.js` warns while the key is
empty; nothing else changes.

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

## 4. Licensing and provenance caveats

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
- **No headshot ships.** The one located was matched by its position on a team
  slide, never by a face, so it is withheld until someone confirms it is the
  person the card names (see §3).
- Nothing on OneDrive was modified; every extraction was a read-only
  `unzip -p` or `pdftotext`/`pdfimages` against a copy.
