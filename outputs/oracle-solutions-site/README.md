# Oracle AI & Data Solutions — site

A small marketing site for SoftServe's enterprise AI agents and workflows on Oracle platforms: **packaged products**, grouped by the job they do and built on Oracle Cloud Infrastructure with NVIDIA and on Oracle Autonomous AI Lakehouse, plus the **dedicated Oracle AI & Data practice** that delivers them — and builds the one a customer's workflow needs — from a fixed-scope Jumpstart proof of value to production. It is used two ways — sent to customers as a link, and opened live by SoftServe and Oracle sellers during a call.

The site is named **Oracle AI & Data Solutions** (renamed by Alex on 2026-09-16; *AI Agents on Oracle* in round 5, *Oracle AI Solutions* before that). The name lives in two files, and a rename edits both: `data/content.js` (`site.name`; `site.title`, which every page title is built from; `headerLockup.productName`, which nothing renders) and `index.html`, where the lockup is static markup (its text and `aria-label`, plus `<title>`, `og:title` and `twitter:title`). The lockup's type steps in `assets/site.css` are sized to the name's length: re-measure them after a rename (`docs/PROVENANCE.md` §20).

Static site. No build step, no framework, no package manager: plain HTML, CSS and vanilla JavaScript, rendered client-side by a hash router. It runs from a `file://` path, from any static host, and as a multi-file artifact. The only external resource is Google Fonts (Montserrat + Open Sans); everything else is local.

---

## Preview

- **Private preview artifact:** https://claude.ai/artifact/98wafGUphFSyGSr6ctJiiN (the same artifact as the older link https://claude.ai/code/artifact/41e4f3b6-47d9-4ef2-af99-99c40c02b89b) — sign-in required. The walkthroughs also stand alone, one artifact each:

| Walkthrough | Standalone preview |
|---|---|
| Large docs processing and review | https://claude.ai/artifact/NdxY4f1D6hxC7pjyMRs6zP |
| Workforce optimization | https://claude.ai/code/artifact/343ab0d5-1d99-4038-a395-6f177c3f5e2e |
| Cross-system ERP Q&A | https://claude.ai/code/artifact/6c822cc7-1c05-4504-ad61-7b64c86e9ceb |

  A standalone URL belongs in that product's `demoPreviewUrl` in `config.js` as soon as it exists (`docs/CONFIG.md` §3) — that is the link the site's own artifact preview uses.
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
│   ├── check-grammar.js      asserts every product fills every grammar slot
│   ├── erp-qa-check.js       reconciles the ERP Q&A walkthrough's numbers (329 assertions)
│   ├── capture-demo-frames.mjs   drives a walkthrough in headless Chrome (tour QA, step frames, poster)
│   └── capture-*.json        the scripted scenarios the capture tool replays
│       ├── capture-erpqa-tour.json     the ERP Q&A tour, every sub-step (regression: LOGS: none)
│       └── capture-erpqa-frames.json   its four step frames + the poster
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
    │   ├── overview.js       window.PAGES.overview   →  #/   (the seven-screen home page)
    │   ├── products.js       window.PAGES.products   →  #/products
    │   ├── product.js        window.PAGES.product    →  #/products/<slug>[/<tab>]
    │   └── services.js       window.PAGES.services   →  #/services
    └── demo/
        ├── large-document-extraction/   the Large docs walkthrough — index.html, demo.css, demo.js, data.js
        ├── workforce-optimization/      the Workforce optimization walkthrough — same four files
        └── cross-system-erp-qa/         the Cross-system ERP Q&A walkthrough — same four files, three product surfaces
```

Script order in `index.html` matters: `data/*` → `assets/forms.js` → `pages/*` → `assets/app.js`, which renders on load. A new page script goes before `assets/app.js`.

### Routes

| Hash | Page |
|---|---|
| `#/` | Home — hero with the built-on stack, a three-figure proof strip, two ways in, the agents by what they do, how we deliver, case studies, about SoftServe, contact |
| `#/products` | Product marketplace — facet rail (Oracle platform, what it does, availability), search, tiles. The rail lists **only options a click returns**: a platform with no products is not shown, the *All* options carry no count, and the results line reports what a filter returned with no denominator — nothing at all when nothing is filtered. `?tech=<id>` still resolves for every platform, rendering that facet's `emptyState` (`docs/PROVENANCE.md` §18.9) |
| `#/products/<slug>` | One product — hero plus tabs |
| `#/products/<slug>/<tab>` | `overview` · `technology` · `jumpstart` · `contacts` · `sellers`. The retired segments `pov` → `jumpstart` and `demo` → `contacts` redirect in place, so Back still returns to where the reader came from and an old link still lands on the right tab. |
| `#/services` | Services, in three screens and the contact block, one message each (round 7, `docs/PROVENANCE.md` §22): AI depth with Oracle expertise — hero on the practice, stat band, platform chips · it's all about ROI (`#how-we-engage`: Discovery → Jumpstart proof of value → Integration → Scale, each ending in a measured result) · a fast proof of value, no hassle (`#proof-of-value`: the light band with **4–8 weeks**, then what you bring and what you leave with) · contact form (`#contact`) |
| anything else | A designed not-found page |

An anchor can follow the route: `#/services#contact`, `#/#request-a-demo`. The router scrolls to that element with a 96 px offset. Query parameters work too — `#/products?tech=oracle-ai-lakehouse` opens the marketplace with that facet applied, which makes filtered views shareable.

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
| `products.<slug>.demoUrl` | Non-empty → the secondary "Try the interactive demo" button in the product hero and the same button in the pending-video panel, both opening a new tab. Relative to `site/` so the walkthrough deploys with the site. Set today on `large-document-extraction`, `workforce-optimization` and `cross-system-erp-qa`. |
| `products.<slug>.demoPreviewUrl` | The walkthrough published as its own claude.ai artifact. Used instead of `demoUrl` only while the site itself runs as a claude.ai artifact, which refuses to open a supporting file as a page of its own. Ignored on the real host. |
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

## The interactive walkthroughs

Three products carry a self-contained guided demo. `site/demo/large-document-extraction/` is a guided demo of the Large docs processing and review pack: plain HTML, CSS and JavaScript, no dependency beyond Google Fonts (Inter), no build step, and nothing leaves the page — the upload and the download are mocked. It mirrors the product's layout and information model — upload → documents → split-view review (source page beside the extracted rows, a citation on every value, confidence, business-rule validators) → rate-card export — on two synthetic documents of different types — a supplier agreement (rate schedule, commercial terms, insurance requirements) and an insurance policy schedule (locations, deductibles, sub-limits, endorsements, premium), each with its own schema, its own columns per group and its own validators — and walks the viewer through six steps on the agreement with anchored hints that let only the designated control through. After the last step, or on "Exit guide", the workspace is free to explore; the policy is where the other validator kinds live (a value outside its expected band, a required field not found, a cross-field check, a low-confidence value routed to review), and `?doc=pol` opens it directly.

- Linked from the product hero through `products["large-document-extraction"].demoUrl` in `config.js` (`docs/CONFIG.md` §3); the button opens a new tab, and the same button sits in the pending-video panel. While the site is previewed as a claude.ai artifact the buttons go to `demoPreviewUrl` — the walkthrough published as its own artifact — because the artifact host will not open a supporting file as a page of its own.
- Brand-agnostic by design: no SoftServe, Oracle or NVIDIA mark inside it, and no customer — it can be shown to any prospect in any industry.
- URL switches: `?tour=off` skips the welcome card and the guide (free mode); `?ui=clean` also hides the guide toggle — the mode the step frames were captured in.
- The four step frames on the product page and the video-frame poster are captures of it, made with `tools/capture-demo-frames.mjs` (`docs/ASSETS.md` §1).

`site/demo/workforce-optimization/` is the second walkthrough, built the same way (same tour engine, same URL switches, same standards) for the Workforce optimization pack, and built around the value rather than the screens: a dispatcher runs a four-week optimization for a fictional coastal metro of twelve work zones and eighteen technicians — region and period, the period's XLSX attached through a mock picker, a validation warning, the solver stages — and the first thing back is a **KPI band**, before → after on the pack's own KPIs (jobs per technician per day, capacity used, average wait, visits placed) beside a count of what changed. A **"What the solver changed" list** sits next to the schematic map (inline SVG, no tiles, no real geography): one row per change with the rule that produced it and its effect on the numbers; **Show** opens the zone or technician on the map and jumps the schedule to the week; **Undo** reverts a change by hand and the KPI band, the map pills, the tinted schedule cells and the flags recompute at once; **Note** attaches the reason. The plan is the uploaded allocation plus the applied changes, so every number is traceable to a change. The tour: run → review the improved metrics (a step that pauses on the KPI band) → see where the gain comes from → drill into a change and compare with today → check the numbers per technician → undo the one change the solver got wrong, note why, re-optimize around the fix → accept the rest (never a flagged zone) and export in the field-service import format, with a mocked write-back. Rules that visibly matter in the data: a vacation, a same-day sickness, a max-load day, a specialist-only zone, non-movable appointments, an uncovered postcode, and three dates allocated on last year's demand. The KPIs follow the pack's methodology (productivity = jobs ÷ days with a job, capacity at 7 visits a day, wait time in calendar days) and the fleet delta is the cleared median, +4.5% jobs per technician per day. Free exploration after the six steps: filters, the Runs and Settings panels (objectives, hard/soft rules, regions, connectors), the other flagged zone. Switches: `?tour=off`, `?ui=clean`, `?view=tech`, `?plan=compare`, `?state=start|v1|v2|final`, `?week=n`. Frames and poster: `docs/ASSETS.md` §1; the round: `docs/PROVENANCE.md` §19.

`site/demo/cross-system-erp-qa/` is the third walkthrough — same tour engine, same URL switches, same standards — and the first one that is not a single application. It was rebuilt on 2026-09-17 around **revenue at risk across systems**: Dana Whitfield, VP Commercial Operations of a fictional multi-entity group, asks one question in plain English — *which open orders are at risk this week, and which of our best accounts are exposed?* — and four agents read three order books (Oracle Fusion Cloud ERP with Enterprise Contracts, JD Edwards EnterpriseOne, NetSuite), an in-house delivery-tracking database and a non-Oracle CRM to answer it. The answer is an **analysis, not a table**: 138 open lines worth USD 4.18 M, nine tier-A accounts inside it, a cause attributed to every line (stock sitting in another plant, a late supplier, a credit hold, a shipment whose carrier scans already say it will miss the date), the late-delivery penalty read out of the contract *clause text*, and four recommended actions, each with an owner and a value and each only ever a task — nothing is written back to any order system. Dana **overrules one recommendation** ("the customer accepted 20 Oct"), re-analyses, and every number moves; then the AI **builds a dashboard** from the same certified views, which she checks under a regional analyst's role before sharing. **Three product surfaces** sit under one neutral workspace switcher, each keeping its own look: *Autonomous AI Lakehouse · Data Studio* (Live Feed with the five source cards and the model job, Catalog with the `GOLD` certified views, Analysis), *AI Data Platform · Agent Hub* (the greeting and saved questions, the multi-agent run card, the analysis view, the evidence panel, Trace, the generated dashboard in Insights, plus Master catalog, column-level Lineage, Auto-populate catalog and Sessions) and **Decisions · review & act**, a small Redwood app — the same six-tile band, the four recommendations with Accept / Decline, the steward's customer-match and item-cross-reference queues, and the decisions log.

- The six steps, all business tasks in Dana's words: **1** everything you run on, in one place (the five source cards in Live Feed — this is what lets one question cross all of them) → **2** ask the AI what is at risk this week (the run card plays: order agent, identity agent, cause agent, impact agent, each with its sub-steps) → **3** read what the AI found (a passive stop on the band, the causes and the four actions) → **4** check one finding before you trust it (Evidence on Halden Tooling Group: its lines in JD Edwards, the same part on hand in another plant, the CRM tier and owner, the contract clause the penalty came from — then Trace, for why the AI ranked it there) → **5** overrule the AI where you know better (Decline with a reason in Decisions, Re-analyse, and the band, the actions and the log move together; a rule is kept) → **6** give the team a dashboard, safely (Create dashboard → View as Marcus Bell, a regional analyst: North America rows only, contacts, credit limits and penalty terms masked in the database → Share). The tour never runs a model refresh — round 1's opening step; the job card is still there to open in free exploration, but the story starts with the sources and the question.
- Switches: `?tour=off`, `?ui=clean`, `?state=start|analysed|decided|final`, `?app=lakehouse|aidp|review`, `?role=commercial|analyst`, `?q=1..10`, and `?panel=` — `analysis|evidence|trace|explain|dashboard` (the analysis view and what is open under it), `catalog|feeds|analysis-ds` (a Data Studio screen), `home|insights|mcatalog|apc|lineage|sessions` (an Agent Hub nav item), `recommendations|matches|xrefs|decisions` (a Decisions tab).
- Every number on screen is computed in the page from `data.js`; `node tools/erp-qa-check.js` reconciles them (329 assertions, before and after the override) and `tools/capture-erpqa-tour.json` replays the whole tour by real clicks as the regression test (`LOGS: none` is the gate).
- Frames and poster: `docs/ASSETS.md` §1; the rounds: `docs/PROVENANCE.md` §22. The standalone artifact in the preview table above is round 1's build until the main session republishes it.

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
- **An address is a link, never a filled button.** An email address or a website URL renders as an underlined anchor at body size with its glyph — in the contact card on all three pages that show it, and in the About band. A filled button is the screen's one ask; an address is a destination.
- **Absence renders as an empty instance of the same component** (`UI.empty(...)`), not as a sentence where the component should be.
- **The light two-tone band is the only inversion** and appears at most once per page. On the home page it is the **About SoftServe** block, and the two partner wordmarks sit in a navy strip inside it — the NVIDIA asset is light grey, and navy is this site's "fact" surface anyway.
- **All nine hero files hold one visual register** (eight of them referenced — see the bullet below) — photography drawn from SoftServe's own decks and put through a single grade: cool slate-teal, median luminance 55–63, 1920×900, progressive JPEG. A replacement image has to land in that grade and carry no rendered text, no fake UI labels and no identifiable face — a set that mixes registers reads as assembled from whatever was to hand, and a hero carrying garbled glyphs or malformed anatomy is the loudest "AI page" tell on a surface sellers demo live. The grade recipe, per-file sources and the rights caveat are in `docs/PROVENANCE.md` §11.1; the swap procedure is in `docs/CONFIG.md` §3b.
- **Only the top block carries a background image — and the home page has none at all.** Every product hero and the Services hero sits on its own image under a left-to-right dark gradient plus a bottom fade into `#131313`, so the headline and CTAs always sit on near-black; those heroes run 60–70 vh on desktop and auto height on mobile with the image faded harder. Below a hero, no section takes a photographic background. **The home hero is the exception**: it carries no photograph, and its right column holds the built-on stack visual — three peer bands (what the products do · SoftServe · the four Oracle platforms) joined by connector lines that draw in on load. `assets/img/heroes/overview.jpg` stays on disk, unreferenced.
- **No customer names anywhere**, including in the data files. Evidence is anonymized by industry.
- **Motion is subtle:** blocks fade up 14 px once on first view, interactions run at 250 ms, and everything collapses to instant under `prefers-reduced-motion`.
