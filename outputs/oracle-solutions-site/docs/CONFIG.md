# CONFIG.md — how to change the site without touching page code

Everything that changes after launch — links, the contact address, the form destination, who can open the seller panel — lives in **one file**:

```
site/data/config.js      →  window.SITE_CONFIG
```

It is plain JavaScript, loaded before the app. Edit it with any text editor, save, reload the page. There is no build step, no npm install, nothing to compile. The file must stay valid JavaScript: every value in quotes, every line ending in a comma except the last one in its block.

Copy (headlines, product descriptions, prices, disclaimers) lives in `site/data/content.js` instead — see `SCHEMA.md`.

---

## 1. The whole file at a glance

```js
window.SITE_CONFIG = {
  contactEmail: "oracle@softserveinc.com",
  formEndpoint: "",
  sellerGate: {
    allowedDomains: ["softserveinc.com", "oracle.com"],
    storageKey: "oracle-ai-solutions:seller-unlocked",
    notesUrl: ""
  },
  productOrder: ["<slug>", "<slug>", ...],
  products: {
    "<slug>": {
      marketplaceUrl: "",
      video: false,
      videoUrl: "",
      videoPoster: "",
      successStoryUrl: "",
      materials: { "sales-deck": "", "one-pager": "", ... }
    }
  }
};
```

**The rule that governs every URL field: an empty string means the control is not rendered at all.** No placeholder, no greyed-out button, no "coming soon" line in its place. The page simply does not show it. Paste a URL and the control appears on the next reload.

`video` is the one field that is not a URL, and the one deliberate exception to that rule — §3 says what it does and why it exists.

---

## 2. Top-level keys

### `contactEmail`

The mailbox every form falls back to when `formEndpoint` is empty. Today: `oracle@softserveinc.com` — **the same address the contact card prints**, and that is the rule: the card and the form directly beneath it must reach one destination. They did not, once: the card printed the practice mailbox while the form composed to an unverified `RnDrequest@` alias, so a seller demoing the Contacts tab saw the mismatch the moment the mail client opened. If a different routing address is ever wanted here, it has to be verified first and the reason recorded in this file.

```js
contactEmail: "oracle@softserveinc.com",
```

This address is **never printed on a page**. It is used only as the destination of the `mailto:` the form composes. If the alias is replaced, change it here and nothing else.

### `formEndpoint`

Where the demo form and the Services contact form send their data.

| Value | What happens on submit |
|---|---|
| `""` (empty — today) | The browser opens the visitor's mail client with a pre-composed message to `contactEmail`, the form fields in the body. The page shows the "Your mail client opened with the request" confirmation. |
| A URL | The form `POST`s JSON to that URL with `fetch`, and shows the "Thanks — your request is in." confirmation on a 2xx response, or the error message on anything else. |

```js
formEndpoint: "https://example.invalid/hook/leads",
```

**Payload shape posted to the endpoint** (JSON, `Content-Type: application/json`):

```json
{
  "form": "demo",
  "name": "…",
  "email": "…",
  "company": "…",
  "role": "customer",
  "product": "workforce-optimization",
  "message": "…",
  "consent": true,
  "page": "#/products/workforce-optimization",
  "submittedAt": "2026-09-13T18:00:00.000Z"
}
```

`form` is `"demo"` or `"contact"`. `role` is one of `customer`, `oracle-seller`, `softserve`, `other`. `product` is a product slug or `""` when the visitor chose "Not sure yet".

The endpoint must answer with a 2xx status and must allow cross-origin POSTs from the site's origin (`Access-Control-Allow-Origin`). If it does not, submissions will silently fail CORS and the visitor sees the error message — test one submission from the deployed URL, not from `file://`.

**Security note.** Do not commit a live trigger URL for a paid or side-effectful automation (an n8n webhook, a Zapier hook). Bots scrape new URLs out of public repositories within the hour. If the endpoint has to be a webhook, require header auth on it and keep the URL out of version control — set it on the deployed copy only.

### `productOrder`

The order the seven products are presented in, everywhere at once. An array of slugs, best first.

```js
productOrder: [
  "large-document-extraction",
  "account-insights",
  "workforce-optimization",
  "plan-vs-actual-investigation",
  "case-evidence-collection",
  "cross-system-erp-qa",
  "business-metrics-qa"
],
```

One list drives every surface that shows more than one product: the Overview page's product tiles, the Products page tiles and the facet-rail counts, the Previous/Next pager at the foot of a product page, and the "Which product?" select in both forms. There is no second place to edit and no way for two surfaces to disagree — a seller who scrolls the Products page and then pages through with Previous/Next walks the same sequence both times.

**It is presentation order, not a list of what exists.** The products themselves are declared in `content.js`; this array only says what sequence they are shown in. That split is what makes the three fallbacks safe:

| Situation | What happens |
|---|---|
| A slug in `products[]` (`content.js`) is **missing** from this array | It still renders. It keeps its `content.js` position relative to the other unlisted ones and sorts after every listed product. |
| A slug here matches **no** product in `content.js` | Ignored silently. A typo or a slug left behind after a product is removed costs nothing. |
| `productOrder` is **empty or absent** | Every surface falls back to the order the products appear in `content.js`. |

So a partial list is legitimate: name only the two or three you care about seeing first and let the rest fall in behind them in their declared order.

The array is **sort order only** — it never filters. All seven products render whatever this list says, and the Products page still reports "7 products". To take a product off the site, remove it from `content.js`, not from here.

### `sellerGate.allowedDomains`

The email domains that unlock the "For sellers" tab. A visitor types a work email; if the part after the `@` matches one of these (case-insensitively, subdomains included), the panel opens and stays open on that browser for the session.

```js
allowedDomains: ["softserveinc.com", "oracle.com"],
```

- **Add a domain:** add a quoted string to the array, comma-separated.
- **Remove one:** delete its entry.
- **Open the panel to everyone:** not supported by design — use an empty array only if you also intend the panel to be unreachable.

**This is not access control.** It is a speed bump so a seller can open the panel mid-demo without a password. Anything whose exposure actually matters must not be in the bundle at all: a determined reader can open `content.js` in a browser's view-source regardless of which tab renders it. No individual's name, title or mailbox goes in either data file.

### `sellerGate.storageKey`

The `localStorage` key the unlock state is remembered under. Change it to force every seller to unlock again (for example after changing the allowed domains).

### `sellerGate.notesUrl`

Where the seller-only **Seller notes** block gets its text. Empty today, so no seller notes ship at all.

```js
notesUrl: "/private/seller-notes.json",
```

This exists because of the sentence two headings up: the gate is a speed bump, not access control, so **commercial notes must not live in `content.js`**. Notes of the kind this block is for — how packages are expected to compress over time, what a first-of-kind engagement does to pricing, which piece of collateral still carries an old product name — tell a buyer things a seller would not say in the room. Shipped in the bundle they are one view-source away from the customer being quoted.

So they live behind whatever authentication the deployment actually has. Point `notesUrl` at a path your server only serves to an authenticated reader; the seller panel fetches it (`same-origin` credentials) after the gate passes and renders what comes back. A fetch that fails, 404s or returns nothing renders nothing — no error, no empty heading.

Expected shape:

```json
{
  "packagingNotes": ["…applies to every product that prints a price…"],
  "products": {
    "workforce-optimization": ["…note for this product only…"]
  }
}
```

`packagingNotes` are appended only on products whose `pov.pricing` or `pov.ladder` actually prints a currency figure; per-product notes always render. Leave `notesUrl` empty on any deployment that cannot authenticate the request — an unauthenticated JSON file at a guessable path is the same leak with an extra step.

---

## 3. Per-product keys — `products["<slug>"]`

The seven slugs, exactly:

```
account-insights
case-evidence-collection
plan-vs-actual-investigation
large-document-extraction
workforce-optimization
cross-system-erp-qa
business-metrics-qa
```

### `marketplaceUrl`

The public Oracle Cloud Marketplace listing URL, and **the only thing that puts Oracle Marketplace on a customer-facing surface.** Empty today on all seven, because no pack is listed yet.

```js
marketplaceUrl: "https://cloudmarketplace.oracle.com/marketplace/en_US/listing/000000",
```

Paste a real listing URL and four things appear together, on the next reload:

- the **"On Oracle Marketplace"** badge on the product hero,
- the same badge on the product's card in the Products list and on its overview tile,
- the **"Available on Oracle Marketplace"** checkbox in the Products facet rail (the rail hides that group entirely while no product has a listing),
- the secondary **"View on Oracle Marketplace"** button in the product hero.

There is deliberately no separate boolean. A badge claiming a listing that has no URL behind it is a claim the site cannot honour, so the URL is the single switch.

### `video`

A boolean — the only non-URL field in a product block. **It decides whether the hero carries a demo frame at all**, which is also the switch between the hero's two layouts.

```js
video: true,
```

| `video` | `videoUrl` | Product hero |
|---|---|---|
| `false` | `""` | Single column: text over the hero background image. No video frame, no poster, no greyed play button, no "coming soon" line. |
| `true` | `""` — today on the three | Two columns: text left, a 16:9 media frame right — poster, teal play button, caption "Watch the demo". Clicking it opens a small panel: the product name, the line *"The demo recording is being prepared."*, and a **"Request a live demo"** button that goes to that product's Contacts tab and closes the panel. Escape and the close button work as on any modal. |
| `true` or `false` | a URL | Same two-column frame; clicking it plays the video in a modal. A URL turns the frame on by itself, so a product whose video arrives before anyone edits this flag still gets its frame. |

In every case where the frame renders, the frame *is* the watch affordance, so the separate secondary "Watch the demo" button drops out of the CTA row and **"Request a demo"** stays the only primary CTA.

`true` today on `workforce-optimization`, `large-document-extraction` and `account-insights` — the three that will have a recording. `false` on the other four.

**Why a boolean here when `marketplaceUrl` has none.** A badge claiming a marketplace listing that does not exist is a claim about a third party the site cannot honour, and nothing behind the click can repair it. A demo frame is a promise about our own recording, and the panel behind the click keeps it honest: it says the recording is being prepared and hands over the thing that *is* available, a live demo. The flag is therefore only for a video someone is actually making — if a recording stops being planned, set `video: false` and the frame goes, rather than leaving a promise on the page.

### `videoUrl`

The demo video itself. Empty while the recording is being made; paste the link when it lands and the same frame stops opening the pending panel and starts playing the video. Nothing else needs to change — leave `video: true` where it is.

```js
videoUrl: "https://www.youtube.com/watch?v=…",
```

A normal share link is fine. YouTube `watch?v=`, `youtu.be/`, `youtube.com/shorts/` and `vimeo.com/<id>` links are converted to their embed form before the player is framed; links already in embed/player form are passed through unchanged.

Expected to be filled first for `workforce-optimization`, `large-document-extraction` and `account-insights`. Empty on all seven today.

### `videoPoster`

The still image shown inside that media frame. **Only ever used where the frame renders** — that is, where `video` is `true` or `videoUrl` is set; on a product with neither it is dead weight, which is why it is safe to leave empty everywhere.

```js
videoPoster: "assets/img/posters/workforce-optimization.jpg",
```

A path relative to `site/index.html`, or an absolute `https://` URL. Landscape, 16:9, at least 1280×720.

The renderer resolves the poster in this order, first non-empty wins:

1. **`videoPoster`** — what you set here.
2. **The YouTube thumbnail** — `https://img.youtube.com/vi/<id>/maxresdefault.jpg`, derived automatically when `videoUrl` is a YouTube link.

There is no third step, and the product's hero image is explicitly **not** one. It used to be, and the result was the hero photograph rendered inside a frame sitting on top of the same photograph — a brighter cut-out of the wallpaper with a play button on it, in the first screen of the page (`PROVENANCE.md` §14.6).

So a YouTube demo needs nothing here at all, and a frame waiting for its recording (`video: true`, no URL) renders with no `<img>`: the `video-card--plate` ground, the teal play button and the caption. That is the pending state, and it is the site's own rule for a missing asset. The backdrop behind the hero is held a stop darker on this layout so the frame still reads as a card and not as a hole cut in the background.

Set `videoPoster` when the auto-derived thumbnail is a bad frame, when the video is on Vimeo or Stream (no public thumbnail), when you want a designed still rather than a screenshot, or when you want a pending frame to carry a picture — a product screenshot, a step frame, a desaturated crop at another focal point. Never point it at the hero file.

**If the poster cannot be loaded, it is dropped rather than shown broken.** The media frame keeps its veil, teal play button and caption over the inset panel, which already reads as a deliberate frame. One case needs naming: YouTube has `maxresdefault.jpg` only for videos uploaded above 720p, and for the rest it answers `200` with a 120×90 grey stand-in instead of a `404`. The renderer therefore treats a 120-pixel-wide YouTube thumbnail as a miss, retries `hqdefault.jpg` (which exists for every real video), and drops the poster only if that fails too. Nothing about this reaches the console.

Empty on all seven today.

### `successStoryUrl`

A hosted case summary. When non-empty, the Overview tab's success-story block and the product hero each gain an **"Open the success story"** link, which opens the file in a new tab. It is deliberately not a forced download: browsers ignore the `download` attribute on a cross-origin URL, so a button labelled "Download" would have opened a tab anyway and the label would have been a small lie.

The success-story block itself is governed by `content.js`, not by this URL: it renders only where that product has a real story to tell (a non-empty `overview.successStory.blurb`), and is omitted entirely otherwise. A section whose only content is "no customers yet" is worse than no section on a page sellers demo live.

Expected first for `workforce-optimization` and `large-document-extraction`. Empty on all seven today.

### `materials` — the "For sellers" download links

A map of **material key → URL**. The key must match a `key` in that product's `sellers.materials` array in `content.js`; the title, description and state come from there, and only the URL comes from here.

```js
materials: {
  "sales-deck": "https://softserveinc.sharepoint.com/:p:/s/…",
  "one-pager": "",
  "feature-list": "",
  "demo-video": ""
}
```

- URL present → an enabled **Open** button, which opens the material in a new tab.
- Empty string → a disabled **Link pending** control, with the row's title and description still shown.

Keys in use, per product:

| Product | Material keys |
|---|---|
| account-insights | `accelerator-pack-onepager`, `sales-deck`, `one-pager`, `feature-list`, `demo-video` |
| case-evidence-collection | `sales-deck`, `one-pager`, `feature-list`, `demo-video` |
| plan-vs-actual-investigation | `sales-deck`, `one-pager`, `feature-list`, `demo-video` |
| large-document-extraction | `sales-deck`, `one-pager`, `feature-list`, `demo-video`, `marketplace-package` |
| workforce-optimization | `sales-deck`, `one-pager`, `feature-list`, `demo-video`, `marketplace-package` |
| cross-system-erp-qa | `lakehouse-jumpstart-deck`, `lakehouse-quickstart-deck`, `one-pager`, `feature-list`, `demo-video` |
| business-metrics-qa | `lakehouse-jumpstart-deck`, `lakehouse-quickstart-deck`, `one-pager`, `feature-list`, `demo-video` |

A row whose `state` in `content.js` is `superseded` stays disabled even if a URL is pasted here — that state exists to stop a file circulating, and the URL alone must not override it. Change the state in `content.js` once the file is confirmed current.

**Share-link scope.** A SharePoint or OneDrive link generated "for people in SoftServe" will not open for an Oracle seller. Generate links at the scope you actually want before pasting them, and remember that anyone who unlocks the panel can pass the link on.

---

## 3b. Hero images — where they live and how to swap one

Hero background images are **not** in `config.js`. They are content, so they live in `content.js`:

| Surface | Key |
|---|---|
| Overview page | `overview.hero.image` |
| Services page | `services.hero.image` |
| Each product page | `products[].hero.image` |

Each is `{ file, alt, focal }`:

```js
hero: {
  image: {
    file: "assets/img/heroes/workforce-optimization.jpg",
    alt: "An overhead field of interlocking hexagonal plates, with loose ones still settling into the pattern from above",
    focal: "50% 55%"
  }
}
```

- **`file`** — path relative to `site/index.html`. The files sit in `site/assets/img/heroes/`, named by product slug, plus `overview.jpg` and `services.jpg`.
- **`alt`** — a plain description of the picture, kept as a record of what the file actually shows. The hero image is decorative — the headline beside it carries the meaning — so it ships as `alt=""` and is hidden from assistive tech. Keep the description truthful anyway: it is how the next person knows which file is which without opening all nine.
- **`focal`** — a CSS `object-position` value, e.g. `"55% 40%"`. This is the knob to turn when a crop clips the wrong part of the image on a wide screen; it changes nothing else.

### The manifest — `site/assets/img/heroes/heroes.json`

The manifest is the source of truth for `alt` and `focal`. `content.js` holds a copy so the page needs no runtime fetch — **when you change one, change the other.** Nothing in the page ever loads `heroes.json`; it is an operator record that happens to sit in the served root.

Each entry carries five fields — `file`, `alt`, `focal`, `source` and `credit` — and `source` / `credit` are **deliberately generic** on every entry: `"SoftServe deck imagery"` and `"SoftServe"`.

> **Ship-gate rule:** `heroes.json` is publicly fetchable. It must carry **no source-deck filename, no media path, no customer or opportunity code, no internal path.** A per-file provenance line belongs in `PROVENANCE.md` §11.1, which is not served — record a new image's real source there, and leave the manifest generic.

### The register a replacement has to hold

**All nine heroes are photography from SoftServe's own decks, put through one grade** — cool slate-teal, median luminance 55–63, 1920 × 900, progressive JPEG at quality 84. That is the constraint, not a coincidence: a hero set assembled from several looks reads as whatever was to hand rather than as one system.

A replacement image must therefore:

- land in the same grade — cool (blue above green above red), median luminance in the 45–65 band, bright points at p99 ≥ 200, 1920 × 900, under 350 KB;
- carry **no rendered text, no fake UI labels, no identifiable face and no legible customer name, logo or screen text** — a hero carrying garbled glyphs or malformed anatomy is the loudest "AI page" tell on a surface sellers demo live;
- keep its brightest element clear of the bottom edge, which fades into the page ground, and clear of the left third, which the veil darkens for the headline.

The grade recipe and its constants are in `PROVENANCE.md` §11.1. Do not compensate with a CSS filter: `.hero-bg-img` ships near-neutral (`opacity: 1`, `brightness(1.05) contrast(1.02) saturate(1.05)`) precisely because the grade is baked into the pixels, and an image that needs the filter bent to fit is the wrong image.

**If a hero image is missing**, the renderer drops the `<img>` and the hero falls back to the gradient alone. That is a safety net, not a mode to ship in: it makes every hero identical and flat, which is exactly what the per-product image is there to prevent. `node tools/check-grammar.js` warns for each hero file that is not on disk.

**To swap a hero image:** drop the new file into `site/assets/img/heroes/`, point `file` at it, adjust `focal` until the crop sits right, update the same entry in `heroes.json` (generic `source` / `credit` only), and record where it actually came from in `PROVENANCE.md` §11.1. On a page the image is the background of the **top block only** — never the Overview tab, never a full-screen wash. It renders at 60–70vh maximum on desktop under a left-to-right dark veil plus a bottom fade, so the headline always sits on near-black; below 900 px the veil becomes a top-to-bottom fade and the image drops to `opacity: .62`.

**A product hero has a second surface: its Products-page tile.** Every tile on `#/products` is that product's own `hero.image`, same file and same `focal`, cropped by CSS under a heavier gradient veil so the name, chips, one-liner and outcome bullets stay legible on top of it. Swapping a hero therefore changes two things at once — check the tile as well as the page, and pick a `focal` that survives both crops (16:9-ish on the page, roughly 4:3 in the tile). A product with no hero file on disk falls back to the flat tile ground rather than a broken frame.

### The other image families

| Family | Path | Keyed by | Used by |
|---|---|---|---|
| Step frames | `assets/img/steps/<slug>-<n>.<ext>` | product **and** step number | the How-it-works stepper on the Overview tab, one 16:10 frame per step — a real product screenshot where one exists, otherwise a designed illustration built to the same frame |
| Industry photographs | `assets/img/industries/<key>.<ext>` | **industry**, not product | the industry use-case tabs; one file serves every product whose tabs include that industry |
| The contact portrait | `assets/img/people/<name>.<ext>` | the one person in `shared.contact` | the contact card on every Contacts tab and above the Services form, as a circle. **None ships today** — `shared.contact.photo` is empty and the card renders an initials avatar until a portrait is confirmed to be the person named (`ASSETS.md` §3) |

All three are named in `content.js` (`overview.steps[].image`, `overview.industryCases[].image`, `shared.contact.photo`), not here — they are copy-side facts, not switches. A missing file is a warning from `check-grammar.js`, never a failure; the contact portrait degrades to an initials monogram, and the other two to an empty frame.

---

## 4. Adding an eighth product

1. Add the product object to `products[]` in `content.js` (see `SCHEMA.md` for every field).
2. Add a matching `products["<new-slug>"]` block to `config.js` with all six keys (`marketplaceUrl`, `video`, `videoUrl`, `videoPoster`, `successStoryUrl`, `materials`). `video` must be a real boolean — `check-grammar.js` rejects a missing one and a quoted `"false"`, which would be truthy and turn the frame on.
3. Add the slug to `productOrder` where you want it to appear. Skipping this step is not an error — the product lands at the end of every list instead — but the position is a judgement about what a seller should meet first, so make it deliberately rather than by omission.
4. If it lands on a technology facet that currently has no products, nothing else is needed — the facet is already declared and will stop rendering its empty state once a product carries it.

If the config block is missing, the product page still renders; every optional control simply stays hidden, exactly as if all its URLs were empty.

---

## 5. Checking a change

After editing either data file:

```
node --check site/data/config.js
node --check site/data/content.js
node tools/check-grammar.js
```

The first two must print nothing. A syntax error there blanks the whole site, because the page cannot read its own content — a trailing comma in the wrong place is the usual cause.

`check-grammar.js` must print `OK`. It asserts that every product still fills every slot of the component grammar (see `VISUAL-GRAMMAR.md`): hero image, problem/solution pair, 1–4 metric tiles with their note, ROI band, 6–8 short feature lines each landing in exactly one workflow step, 3–5 steps, 3–6 industry cases with keys from the fixed set, the at-a-glance side facts, in/out of scope, the four-step flow, the 4–5 layer solution stack with a Required item in every layer and both an inbound and an outbound integration, and the POV fact strip. Site-wide it also asserts the contact card, the `contacts` tab and the absence of the retired `demo` tab. It also fails on any banned string — internal vocabulary or an uncleared customer name — reaching the data layer. It exits non-zero and names each failure.
