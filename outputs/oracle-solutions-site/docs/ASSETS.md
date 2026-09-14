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

### Real product UI (6 frames, 2 products)

| File | Shows | Source deck |
|---|---|---|
| `workforce-optimization-1.jpg` | The Run Optimization dialog — region, period, roster upload | Work Zone Optimization PoC user guide (SoftServe), `media/image1.png` |
| `workforce-optimization-2.jpg` | Dashboard: service zones on the map above the weekly schedule | same deck, `image12.png` |
| `workforce-optimization-3.jpg` | Current allocation beside optimized allocation | same deck, `image4.png` |
| `workforce-optimization-4.jpg` | Weekly schedule with accept / reject / comment per zone | same deck, `image10.png` |
| `large-document-extraction-2.jpg` | Contract page beside the rates extracted from it | Workforce/product draft deck, `media/image16.jpeg` |
| `large-document-extraction-3.jpg` | Reviewer console: rule, confidence, source page, approve | R&D GenAI Solutions monthly update (Jun), `media/image6.png` |

**Treatment.** Focal crop to 16:10 → Lanczos to 1600 × 1000 → light unsharp
(r 0.8 / 55 %) → a per-channel curve that takes white down to about
`#D6DEE4` and cools it slightly, so a light product UI sits inside a dark page
without glaring. Progressive JPEG, 4:2:2.

**Redaction.** `workforce-optimization-3.jpg` has both map Details drawers
Gaussian-blurred (r 14) before the crop: those panels listed appliance-category
job names that identify the engagement. Nothing else on any shipped frame needed
redaction — the header reads "NVIDIA cuOPT powered by OCI", the zone names are
Dutch place names, the technician identifiers are opaque numbers, and the
document-extraction frames run on a **synthetic** contract ("Synthetic Envelope
ID", invented station names) rather than a customer's.

**What was rejected.** The Account Insights reviewer console exists in the decks,
but every frame of it fans real published news to named real companies — the
account, the news source, the cross-account effects and the opportunity chips are
all real company names, several of them SoftServe customers. Blurring them leaves
an empty page, so the product ships four illustrations instead. The Intelligent
Document Extraction service-packages deck contains no product UI — its 40 images
are slide exports, and those carry a customer name in the case study.

### Designed step illustrations (22 frames, 6 products)

`account-insights-1..4`, `case-evidence-collection-1..4`,
`plan-vs-actual-investigation-1..4`, `cross-system-erp-qa-1..4`,
`business-metrics-qa-1..4`, `large-document-extraction-1` and `-4`.

Drawn, not sourced. One grammar across all of them: ground `#10161A` with a
`#0E2D4D` radial lift, 2–3 px strokes (≈ 1.5 px on screen at the rendered size),
teal `#35CCBA` for the active path and slate `#496683` for structure, one
teal eyebrow of **at most three words** per frame and short uppercase labels
underneath. No emoji, no filled icons, no sentences inside the artwork — the step
title and caption live in the page, not in the picture.

Scene vocabulary, so the same step reads the same way on every product:
fan-in (intake), graph / dossier / semantic layers / bars (processing),
three decision rows (review), fan-out and answer card (delivery). The three
answer cards carry a different inner glyph — bars, merge, trend — so a reader
moving between products can tell them apart.

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

480 × 480 JPEG, q85, ~30 KB. Source: **SoftServe AIDP Factory V2** (presentation
templates), `ppt/media/image76.jpeg`, a 460 × 460 square already framed on the
face.

Identified by **position, not by face**: on the "Oracle AI DP Team at a Glance"
slide, each person's picture sits at a fixed offset to the left of their name box
(pic `x` = name `x` − ≈ 567 000 EMU, one row down). The picture carrying that
offset from the text run "Karsten Tramborg" is `rId7` → `image76.jpeg`. No facial
comparison was made.

**Treatment.** Lanczos to 480 × 480, light unsharp, +4 % contrast. Deliberately
**not** teal-graded — a portrait in a contact card should read as a portrait.

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
- The step screenshots are **SoftServe product UI** — the workforce optimizer and
  the document-extraction reviewer, both built by SoftServe on OCI. They show
  synthetic or place-name data, not a customer's records.
- The headshot is a SoftServe colleague's own deck photograph. Confirm with him
  before the site is published externally.
- Nothing on OneDrive was modified; every extraction was a read-only
  `unzip -p` or `pdftotext`/`pdfimages` against a copy.
