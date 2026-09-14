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
  contactEmail: "RnDrequest@softserveinc.com",
  formEndpoint: "",
  sellerGate: {
    allowedDomains: ["softserveinc.com", "oracle.com"],
    storageKey: "oracle-ai-solutions:seller-unlocked"
  },
  products: {
    "<slug>": {
      marketplace: false,
      marketplaceUrl: "",
      videoUrl: "",
      videoPoster: "",
      successStoryUrl: "",
      materials: { "sales-deck": "", "one-pager": "", ... }
    }
  }
};
```

**The rule that governs every URL field: an empty string means the control is not rendered at all.** No placeholder, no greyed-out button, no "coming soon" line in its place. The page simply does not show it. Paste a URL and the control appears on the next reload.

---

## 2. Top-level keys

### `contactEmail`

The mailbox every form falls back to when `formEndpoint` is empty. Today: `RnDrequest@softserveinc.com`.

```js
contactEmail: "RnDrequest@softserveinc.com",
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

### `marketplace` (true / false)

Drives two things: the **"On Oracle Marketplace" badge** on the product tile and product hero, and whether the product is returned by the **"Available on Oracle Marketplace"** checkbox on the Products page. It is a flag about the listing's existence — it does not itself produce a link.

Today: `true` on `workforce-optimization` and `large-document-extraction`, `false` on the other five.

### `marketplaceUrl`

The public Oracle Cloud Marketplace listing URL. **Only when this is non-empty** does the product hero gain its secondary **"View on Oracle Marketplace"** button. Empty today on all seven.

```js
marketplaceUrl: "https://cloudmarketplace.oracle.com/marketplace/en_US/listing/000000",
```

Set `marketplace: true` and `marketplaceUrl` together when a listing goes live.

### `videoUrl`

A demo video. **This single field switches the product hero between its two layouts.**

| Value | Hero layout |
|---|---|
| `""` (empty — today) | Single column: text over the hero background image. No video frame, no poster, no greyed play button, no "coming soon" line. |
| A URL | Two columns: text left, a 16:9 media frame right showing a poster image with a play button and the caption "Watch the demo". Clicking the frame opens the video in a modal. The frame *is* the watch affordance, so the separate secondary "Watch the demo" button drops out of the CTA row; **"Request a demo"** stays the primary CTA. |

```js
videoUrl: "https://www.youtube.com/watch?v=…",
```

A normal share link is fine. YouTube `watch?v=`, `youtu.be/`, `youtube.com/shorts/` and `vimeo.com/<id>` links are converted to their embed form before the player is framed; links already in embed/player form are passed through unchanged.

Expected to be filled first for `workforce-optimization`, `large-document-extraction` and `account-insights`. Empty on all seven today.

### `videoPoster`

The still image shown inside that media frame before the video plays. **Only ever used when `videoUrl` is non-empty** — on a product with no video it is dead weight, which is why it is safe to leave empty everywhere.

```js
videoPoster: "assets/img/posters/workforce-optimization.jpg",
```

A path relative to `site/index.html`, or an absolute `https://` URL. Landscape, 16:9, at least 1280×720.

The renderer resolves the poster in this order, first non-empty wins:

1. **`videoPoster`** — what you set here.
2. **The YouTube thumbnail** — `https://img.youtube.com/vi/<id>/maxresdefault.jpg`, derived automatically when `videoUrl` is a YouTube link.
3. **The product's own hero image** — `products[].hero.image.file` in `content.js`.

So a YouTube demo needs nothing here at all. Set `videoPoster` when the auto-derived thumbnail is a bad frame, when the video is on Vimeo or Stream (no public thumbnail), or when you want a designed still rather than a screenshot.

Empty on all seven today.

### `successStoryUrl`

A downloadable case summary. When non-empty, the Overview tab's success-story block gains a **"Download the success story"** button. When empty, the block renders its honest empty line instead (the copy for that line is in `content.js`, not here).

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

- URL present → an enabled **Download** button.
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
    alt: "Service territory rendered as routes and coverage zones over a dark map",
    focal: "55% 50%"
  }
}
```

- **`file`** — path relative to `site/index.html`. The files sit in `site/assets/img/heroes/`, named by product slug, plus `overview.jpg` and `services.jpg`.
- **`alt`** — a plain description of the picture. The image is a background, so the renderer applies it as the hero's `aria-label` (or hides the image from assistive tech when the hero is already labelled by its headline).
- **`focal`** — a CSS `object-position` value, e.g. `"55% 40%"`. This is the knob to turn when a crop clips the wrong part of the image on a wide screen; it changes nothing else.

`site/assets/img/heroes/heroes.json` is the source of truth for `alt` and `focal` and carries each image's provenance. `content.js` holds a copy so the page needs no runtime fetch — **when you change one, change the other.**

**To swap a hero image:** drop the new file into `site/assets/img/heroes/`, point `file` at it, adjust `focal` until the crop sits right, and update the same entry in `heroes.json`. The image is the background of the **top block only** — never the Overview tab, never a full-screen wash. It renders at 60–70vh maximum on desktop with a dark gradient over it so the headline stays on near-black.

---

## 4. Adding an eighth product

1. Add the product object to `products[]` in `content.js` (see `SCHEMA.md` for every field).
2. Add a matching `products["<new-slug>"]` block to `config.js` with all six keys (`marketplace`, `marketplaceUrl`, `videoUrl`, `videoPoster`, `successStoryUrl`, `materials`).
3. If it lands on a technology facet that currently has no products, nothing else is needed — the facet is already declared and will stop rendering its empty state once a product carries it.

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

`check-grammar.js` must print `OK`. It asserts that every product still fills every slot of the component grammar (see `VISUAL-GRAMMAR.md`): hero image, problem/solution pair, 3–4 metric tiles with their note, ROI band, 6–8 short feature lines, industry keys from the fixed set, in/out of scope, the four-step flow, vendor groups, and the POV fact strip. It also fails on any banned string — internal vocabulary or an uncleared customer name — reaching the data layer. It exits non-zero and names each failure.
