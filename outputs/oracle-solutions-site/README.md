# Oracle AI Solutions — site

A small marketing site for SoftServe's Oracle-based AI solutions: seven packaged applications built on Oracle Cloud Infrastructure with NVIDIA and on Oracle Autonomous AI Lakehouse, plus the services of the Oracle dedicated practice that delivers them. It is used two ways — sent to customers as a link, and opened live by SoftServe and Oracle sellers during a call.

Static site. No build step, no framework, no package manager: plain HTML, CSS and vanilla JavaScript, rendered client-side by a hash router. It runs from a `file://` path, from any static host, and as a multi-file artifact. The only external resource is Google Fonts (Montserrat + Open Sans); everything else is local.

---

## Preview

- **Private preview artifact:** https://claude.ai/code/artifact/41e4f3b6-47d9-4ef2-af99-99c40c02b89b — sign-in required.
- **Locally:** any static server pointed at `site/` — `python3 -m http.server 8765 --directory site`, or the `oracle-site` entry in `.claude/launch.json`. See [Run it locally](#run-it-locally).

---

## Folder layout

```
oracle-solutions-site/
├── README.md                 this file
├── docs/                     internal notes — never deployed
│   ├── CONFIG.md             every switch in data/config.js, field by field
│   ├── SCHEMA.md             the shape of data/content.js
│   ├── VISUAL-GRAMMAR.md     the one component grammar all seven product pages follow
│   ├── PROVENANCE.md         where each fact and number on the site came from
│   └── asset-candidates/     images considered but not shipped
├── tools/
│   └── check-grammar.js      asserts every product fills every grammar slot
└── site/                     ← THE DEPLOYABLE ROOT. Everything below is served.
    ├── index.html            the single page: head, header, <main>, footer, script tags
    ├── assets/
    │   ├── site.css          all styling — design tokens in :root, then components
    │   ├── app.js            UI helpers (window.UI), header, footer, router, modal
    │   ├── forms.js          the demo and contact forms (window.FORMS)
    │   └── img/              logos and wordmarks (SVG)
    │       └── heroes/       per-page hero background images + heroes.json
    ├── data/
    │   ├── config.js         window.SITE_CONFIG — links, gate, form destination
    │   ├── content.js        window.SITE_CONTENT — every word on the site
    │   └── diagrams.js       window.SITE_DIAGRAMS — the per-product architecture diagrams, drawn as inline SVG
    ├── pages/
    │   ├── overview.js       window.PAGES.overview   →  #/
    │   ├── products.js       window.PAGES.products   →  #/products
    │   ├── product.js        window.PAGES.product    →  #/products/<slug>[/<tab>]
    │   └── services.js       window.PAGES.services   →  #/services
    └── demo/
        └── large-document-extraction/   the interactive walkthrough — index.html, demo.css, demo.js, data.js
```

Script order in `index.html` matters: `data/*` → `assets/forms.js` → `pages/*` → `assets/app.js`, which renders on load. A new page script goes before `assets/app.js`.

### Routes

| Hash | Page |
|---|---|
| `#/` | Overview — hero, products, customer evidence, services teaser, demo form |
| `#/products` | Product marketplace — facet rail (technology, category, marketplace), search, tiles |
| `#/products/<slug>` | One product — hero plus tabs |
| `#/products/<slug>/<tab>` | `overview` · `technology` · `jumpstart` · `contacts` · `sellers`. The retired segments `pov` → `jumpstart` and `demo` → `contacts` redirect in place, so Back still returns to where the reader came from and an old link still lands on the right tab. |
| `#/services` | The Oracle dedicated practice — platforms, what we do, how we engage, why SoftServe, proof, contact form |
| anything else | A designed not-found page |

An anchor can follow the route: `#/services#contact`, `#/#request-a-demo`. The router scrolls to that element with a 96 px offset. Query parameters work too — `#/products?tech=lakehouse` opens the marketplace with that facet applied, which makes filtered views shareable.

---

## Run it locally

Open `site/index.html` in a browser. That is the whole procedure — the site is written to work from `file://`.

If a browser blocks local file access, serve the folder over HTTP instead:

```bash
python3 -m http.server 8765 --directory site
# then open http://localhost:8765/
```

That same command is registered as the `oracle-site` entry in `.claude/launch.json`. Any static server will do. Nothing needs to be installed or compiled.

---

## Configure it

Two data files hold everything that changes after launch. Edit, save, reload — there is nothing to rebuild.

### `site/data/config.js` — links, gate, form destination

Full field-by-field reference: `docs/CONFIG.md`. In short:

| Key | What it does |
|---|---|
| `contactEmail` | Mailbox the forms fall back to when no endpoint is set. Never printed on a page. |
| `formEndpoint` | Empty → forms compose a `mailto:`. A URL → forms `POST` JSON to it and show the confirmation only on a 2xx response. |
| `sellerGate.allowedDomains` | Email domains that unlock the "For sellers" tab. Today: `softserveinc.com`, `oracle.com`. |
| `sellerGate.storageKey` | `localStorage` key holding the unlock. Change it to invalidate every existing unlock. |
| `sellerGate.notesUrl` | Where the seller-notes block fetches its text after the gate passes. Empty → no seller notes ship. Point it only at a path the deployment actually authenticates. |
| `products.<slug>.marketplaceUrl` | The single Marketplace switch. Non-empty → the "On Oracle Marketplace" badge, the "Available on Oracle Marketplace" facet and the "View on Oracle Marketplace" hero button all appear together. Empty → none of them exist. |
| `products.<slug>.video` | `true` → the product hero carries the 16:9 demo frame. With no `videoUrl` yet, clicking it opens a short panel saying the recording is being prepared, with a button to that product's Contacts tab. `true` today on `workforce-optimization`, `large-document-extraction` and `account-insights`. |
| `products.<slug>.videoUrl` | Non-empty → the same frame plays the video in a modal instead (YouTube, Vimeo, SharePoint and Stream URLs embed as an iframe; anything else plays natively), and turns the frame on by itself even where `video` is `false`. |
| `products.<slug>.successStoryUrl` | Non-empty → a "Download the success story" button appears. |
| `products.<slug>.materials.<key>` | Non-empty → that row in the seller panel gets a download button instead of a disabled "Link pending" control. |

**The rule behind every URL field: an empty string means the control is not rendered at all** — no placeholder, no greyed-out button, no "coming soon" line. Paste a URL and it appears on the next reload. Every URL is empty today, so none of those controls ship yet. `video` is the one boolean and the one exception: it puts the demo frame up ahead of the recording, and the panel behind the click is what keeps that honest.

The seller gate is a client-side convenience, not security. It checks the domain of a typed email and stores a flag in `localStorage`. Anything that must not leak belongs behind a real login, not in this repo.

### `site/data/content.js` — the words

Every headline, description, chip label, price line and disclaimer. Structure documented in `docs/SCHEMA.md`; the component grammar the seven product pages share in `docs/VISUAL-GRAMMAR.md`; sources for the facts and numbers in `docs/PROVENANCE.md`. Prices ship with their disclaimers attached — keep them together.

After any edit to either data file, run:

```
node --check site/data/content.js
node --check site/data/config.js
node tools/check-grammar.js
```

`check-grammar.js` fails if a product stops filling a grammar slot, if a metric row loses its disclaimer, if an industry key is not in the fixed set, or if an internal string reaches the data layer.

---

## The interactive walkthrough

`site/demo/large-document-extraction/` is a self-contained guided demo of the Large docs processing and review pack: plain HTML, CSS and JavaScript, no dependency beyond Google Fonts (Inter), no build step, and nothing leaves the page — the upload and the download are mocked. It mirrors the product's layout and information model — upload → documents → split-view review (source page beside the extracted rows, a citation on every value, confidence, business-rule validators) → rate-card export — on two synthetic documents of different types — a supplier agreement (rate schedule, commercial terms, insurance requirements) and an insurance policy schedule (locations, deductibles, sub-limits, endorsements, premium), each with its own schema, its own columns per group and its own validators — and walks the viewer through six steps on the agreement with anchored hints that let only the designated control through. After the last step, or on "Exit guide", the workspace is free to explore; the policy is where the other validator kinds live (a value outside its expected band, a required field not found, a cross-field check, a low-confidence value routed to review), and `?doc=pol` opens it directly.

- Linked from the product hero through `products["large-document-extraction"].demoUrl` in `config.js` (`docs/CONFIG.md` §3); the button opens a new tab, and the same button sits in the pending-video panel. While the site is previewed as a claude.ai artifact the buttons go to `demoPreviewUrl` — the walkthrough published as its own artifact — because the artifact host will not open a supporting file as a page of its own.
- Brand-agnostic by design: no SoftServe, Oracle or NVIDIA mark inside it, and no customer — it can be shown to any prospect in any industry.
- URL switches: `?tour=off` skips the welcome card and the guide (free mode); `?ui=clean` also hides the guide toggle — the mode the step frames were captured in.
- The four step frames on the product page and the video-frame poster are captures of it, made with `tools/capture-demo-frames.mjs` (`docs/ASSETS.md` §1).

---

## Deploy it

Upload the **contents of `site/`** to any static host, so that `index.html` sits at the root of whatever URL is handed out. No server-side logic, no redirects, no rewrite rules: the router lives in the hash, so every route is the same `index.html`.

```bash
# a few examples — all of them just copy files
aws s3 sync site/ s3://<bucket>/ --delete
netlify deploy --dir=site --prod
gh-pages -d site
scp -r site/* user@host:/var/www/oracle-ai-solutions/
```

Notes that matter in production:

- **Serve over HTTPS.** The forms post from the browser; mixed content will be blocked.
- **Do not deploy `docs/`.** It is internal.
- **Google Fonts must be reachable.** If the target network blocks it, self-host the two families into `assets/` and change the `<link>` in `index.html`; the CSS already falls back to system faces.
- **Caching:** `index.html` should be served with a short cache lifetime, `assets/` and `data/` can be cached longer — but remember that `config.js` and `content.js` are how the site is edited, so do not put them behind a year-long cache.
- **Add `<meta property="og:url" content="…">`** to `index.html` once the final address is known; the other OpenGraph and Twitter tags are already there (title, description, site name, type — no image).

---

## Conventions worth keeping

- **One accent.** Teal `#35CCBA` on near-black `#131313`, and the accent carries the first word of each headline. Nothing else competes.
- **Filled navy pill = a fact** (category, platform, availability, marketplace). **Outlined pill = a filter you can toggle.** Never mix the two meanings.
- **Absence renders as an empty instance of the same component** (`UI.empty(...)`), not as a sentence where the component should be.
- **The light two-tone band is the only inversion** and appears at most once per page.
- **All nine heroes hold one visual register** — photography drawn from SoftServe's own decks and put through a single grade: cool slate-teal, median luminance 55–63, 1920×900, progressive JPEG. A replacement image has to land in that grade and carry no rendered text, no fake UI labels and no identifiable face — a set that mixes registers reads as assembled from whatever was to hand, and a hero carrying garbled glyphs or malformed anatomy is the loudest "AI page" tell on a surface sellers demo live. The grade recipe, per-file sources and the rights caveat are in `docs/PROVENANCE.md` §11.1; the swap procedure is in `docs/CONFIG.md` §3b.
- **Only the top block carries a background image.** Every page hero sits on its own image under a left-to-right dark gradient plus a bottom fade into `#131313`, so the headline and CTAs always sit on near-black; heroes run 60–70 vh on desktop and auto height on mobile with the image faded harder. Below the hero, no section takes a photographic background.
- **No customer names anywhere**, including in the data files. Evidence is anonymized by industry.
- **Motion is subtle:** blocks fade up 14 px once on first view, interactions run at 250 ms, and everything collapses to instant under `prefers-reduced-motion`.
