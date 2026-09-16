# Handoff — Oracle AI mini-site (repo-only session)

Written 2026-09-16 by the build session on Alex's Mac. Everything a new session needs is in this repository; nothing below requires the laptop. Read this file first, then `README.md`, `docs/CONFIG.md`, `docs/SCHEMA.md`, `docs/VISUAL-GRAMMAR.md`, `docs/PROVENANCE.md`.

## 1. State of the site

- Served root: `outputs/oracle-solutions-site/site/` — static, no build step, hash-routed SPA (`index.html`, `assets/site.css`, `assets/app.js`, `assets/forms.js`, `pages/*.js`, `data/content.js`, `data/config.js`, `data/diagrams.js`, `assets/img/**`).
- Live preview (private, owned by Alex): https://claude.ai/code/artifact/41e4f3b6-47d9-4ef2-af99-99c40c02b89b — last published 2026-09-16 as version 27, the site rename to **Oracle AI & Data Solutions** (`PROVENANCE.md` §20); the round-5 home page (label "Round 5 — home page rebuild") and the Workforce-demo session's `demo/workforce-optimization/**`, step frames, poster and linking `config.js` went out earlier that day. A publish from a new session must `read` the artifact first, and a publish refused as "not built on the newer version" means another session published in between: re-read, then publish the current tree again — the shared working tree is the merge.
- Pages: **Home — seven screens, still seven** (hero with the built-on stack visual + a **three-tile** proof strip · two ways in · products, headed *"Agents that read, extract, plan and answer."* · how we deliver · case studies · about SoftServe · contact; rebuilt in round 5, `PROVENANCE.md` §18, `VISUAL-GRAMMAR.md` §9), Products (facet rail + tiles — **the rail lists only options a click returns, so today the platform group is All · OCI + NVIDIA · Oracle Autonomous AI Lakehouse**, and the results line prints no total), 7 product pages (Overview · Technology · Jumpstart · Contacts · For sellers), Services (practice + contact).
- Three further owner instructions landed the same day, after that review (`PROVENANCE.md` §18.9): **the catalog must not read as a ceiling** — no total, no denominator, no negation, and no zero-count platform in the rail; **the case studies must say the status once, in one plain word** — the chips are now `Proven` / `Forecast` / `Estimated`, the metric eyebrow is retired on both surfaces, and each footnote carries evidence instead of a restatement; **the positioning is agents *and workflows*** — the hero stack, both S2 panels and the Agentic-AI pillar say both halves. Data keys deleted: `productsPage.count`, `facets.footnote`, `overview.caseStudies[].metricEyebrow`, `overview.caseStudy.metricsEyebrow`. `check-grammar.js` fails all four if they return.
- The owner reviewed the shipped home page on 2026-09-16 and raised nine items — link styling, the About block's sourcing, the contact heading, a CTA, the metrics strip, a block name, and three verbosity cuts. All nine are answered; the round, every changed string with its before value, and the sourcing of the three strip figures are in `PROVENANCE.md` §18.8. **No screen was added or removed**: the changes are copy, two links, one CTA and the strip's geometry.
- Checker: `node tools/check-grammar.js` (run from `outputs/oracle-solutions-site/`) asserts the content contract; it must print `OK` before any publish.

## 2. What lives where (and what does not exist on other machines)

| Need | Location | Available off the laptop? |
|---|---|---|
| Site code, data, images, docs, checker | this folder | yes (repo) |
| Practice facts (external-safe) | `site/data/content.js` → `services.*`, `shared.*`; wiki pages `context/areas/softserve/oracle.md`, `oracle-ai-offerings.md`, `oracle-packs.md`, `oracle-team.md` | yes (repo) |
| Case-study figures and their sources | `docs/PROVENANCE.md` (§4, §17) | yes (repo) |
| Brand tokens | `site/assets/site.css` `:root`; `.claude/references/softserve-deck-kit.md` | yes (repo) |
| Hero / step / industry images, logos (unreferenced), headshot | `site/assets/img/**` | yes (repo) |
| Raw deck media (OneDrive `Projects/Oracle/…`), BSH business case PDF | Alex's Mac / SoftServe OneDrive (`ms365` MCP when authenticated) | no — only needed for NEW imagery; reuse existing assets instead |
| Research scratchpad (`research/*.md`, `spec/*.md`) | deleted with the session scratchpad | no — do not look for it; PROVENANCE.md holds what was kept |
| About-SoftServe corporate facts | **now in the repo:** `docs/PROVENANCE.md` §18.2 records every figure the About block uses, verbatim, with its URL and the 2026-09-16 fetch date. Re-fetch only to refresh a figure — and note that `/en-us/about`, `/en-us/partners`, `/en-us/partners/oracle` and `/en-us/partners/nvidia` all 404; the working paths are `/en-us/about-us` and `/en-us/our-partners[/oracle\|/nvidia]` | yes (repo; web to refresh) |

Git: git-autosync runs only on the Mac. On another machine: `git pull` first, commit with conventional messages (`feat(site): …`), `git push` when done.

## 3. Standing rules (do not relax)

- Copy lives in `data/content.js`; renderers read data. No invented facts, numbers, customers, URLs. New copy for thin spots is written in the same register and logged in `docs/PROVENANCE.md`.
- No customer names or logos anywhere in shipped files (Bosch, BSH, Riyadh Air, DHL, SBG are banned; the checker enforces a deny-list). Anonymized descriptors only. No € figures, headcounts, baselines or contract values.
- Naming: "Oracle Autonomous AI Lakehouse", "Oracle AI Data Platform" (never "AIDP"), "Oracle AI for Fusion Applications", "AI-Q", "cuOpt", "OCI", "NVIDIA". Never mention GigaCloud.
- Nothing internal ships: no source/assumption comments, TODOs, "(assumed)", wiki jargon, internal codes.
- **No total, and no gap.** The catalog is what is packaged today, not a ceiling, so no surface prints the size of it (*seven products*, a `5 of 7` denominator, a count in a headline or a stat tile) and no surface names what is missing (*so far*, *yet*, *not seeing your workflow*, *no packaged offering*, a zero-count facet standing beside a vendor's product name). Breadth is stated **positively and only where it is already cleared** — *"or build the one your workflow needs"*, sourced to `services.whatWeDo.lead` and `layering[0].body`. Commercial shape is stated without counting it: *"at a fixed price where one is published, otherwise scoped per engagement"*. `check-grammar.js` enforces both halves over `productsPage.intro`, `productsPage.bottomBlock.heading` / `.body`, `overview.twoWays.panels[0].body`, `overview.catalog.lead` and `overview.catalog.title`, and fails `productsPage.count` and `facets.footnote` outright (`PROVENANCE.md` §18.9).
- **A case study states its status once, in one plain word.** The chip — `Proven` / `Forecast` / `Estimated`, from `shared.caseStudyStatus` — is the only place it appears; the metric eyebrow that repeated it is retired on both the home card and the product callout, and both keys are build failures. The footnote spends its line on **evidence** (on whose data, against what baseline, what an estimate is measured against, who validates it), never on the chip's word or its negation. The modeled card is the one with a fixed substance: `PROVENANCE.md` §4 requires that its caveat keep saying the figures are simulations against the customer's own historical baseline rather than production, whatever words carry it — the §4 / §10.8 clearance gates are unchanged.
- Design system stays: near-black ground, teal accent `#35CCBA`, Montserrat 900 uppercase headlines + Open Sans body, 1.5px line icons, equal-height peers, no emoji, reduced-motion respected, mobile clean at 375.
- **An address renders as a link, never as a filled button** — an email or a website URL is an underlined anchor at body size with its glyph, on every surface (contact card on all three of its pages, the About band's `softserveinc.com`). A filled button is the screen's one ask; an address is a destination (`VISUAL-GRAMMAR.md` §9, `PROVENANCE.md` §18.8).
- **No Oracle partner-standing claim, ever** — no tier, no "partner of the year", no implied equivalence with the public NVIDIA Elite relationship (which does not ship either). softserveinc.com states no Oracle tier and its public Oracle page is a NetSuite services and staffing page. What may be claimed is joint **delivery** with Oracle's AI & Data organization (§18.8 d).
- Config-driven states: `video`, `videoUrl`, `videoPoster`, `marketplace`, `marketplaceUrl`, `successStoryUrl`, seller materials, `productOrder` — see `docs/CONFIG.md`. Elements whose URL is empty are not rendered, except the demo frame (pending state).
- Model split Alex asked for: creative, messaging and layout decisions by the main (Fable) session; mechanical implementation, verification and QA by Opus subagents.

## 4. How to run, verify, publish

Run: `.claude/launch.json` has entry `oracle-site` (python3 `http.server` on port 8765, `--directory outputs/oracle-solutions-site/site`, relative to the repo root). `preview_start {name:"oracle-site"}` started it normally in the rename session (2026-09-16, evening); the round-5 session earlier that day saw the spawned python die in `http.server`'s argument parser with `PermissionError: [Errno 1] Operation not permitted` from `os.getcwd()` (cause not established). If that recurs, start the server from the Bash tool inside `site/` (`python3 -m http.server 8765 --bind 127.0.0.1`, run in the background), then open the pane with `preview_start {url:"http://127.0.0.1:8765/"}`. Browse `http://127.0.0.1:8765` — not `localhost`, whose cache goes stale. Even there a reload can keep the old `site.css`: before measuring a CSS change, confirm the new rule is in `document.styleSheets`, or re-point the stylesheet link with a `?v=` query from the console. In the in-app browser, screenshots taken after scrolling can come back black: screenshot at scroll 0 or resize the viewport tall (e.g. 1440×2400) to see a whole page.

Verify before publishing: `node --check` on changed JS, `node tools/check-grammar.js` → OK, console clean on every route, `grep -ri "bosch\|riyadh\|dhl\|sbg\|logos/" site --include=*.js --include=*.css --include=*.html` returns nothing.

Publish (updates the same URL): create a wrapper copy of `site/index.html` with ONLY the document-skeleton tags stripped — `<!DOCTYPE html>`, `<html …>`, `</html>`, `<head>`, `</head>`, `<body>`, `</body>` — and the site's own `<title>` kept (`AI Agents on Oracle — SoftServe`; the Artifact tool wraps its own skeleton). Strip by exact tag, never by a `<head` prefix: version 16 was published with `<header class="masthead">` and `</header>` stripped as well, so the live masthead had no sticky bar behind the nav until version 17. Write the wrapper to `outputs/oracle-solutions-site/.work/publish/index.html` — git-ignored, and under the working directory, which the Artifact tool requires for every source it reads (a scratchpad path is refused). Then call the Artifact tool with `url: https://claude.ai/code/artifact/41e4f3b6-47d9-4ef2-af99-99c40c02b89b`, `root: outputs/oracle-solutions-site/site`, and a `files` map of every changed/added file (published path → source path). Read the artifact (`action: read`) once before the first publish from a new session, or the publish is refused. Files not passed are kept; new images must be passed explicitly.

## 5. Task 0 — canonical technology facet (DONE 2026-09-16)

Done 2026-09-16: `facets.technology` is the canonical four — `oci-nvidia` "OCI + NVIDIA", `oracle-ai-data-platform` "Oracle AI Data Platform", `oracle-ai-lakehouse` "Oracle Autonomous AI Lakehouse", `oracle-ai-fusion` "Oracle AI for Fusion Applications" (the `Other` catch-all is retired); the Products rail, the hero chip, the tile image-band, the home grid and the Services platform cards all render that label verbatim, engine detail (AI-Q, cuOpt, Select AI) stays in `technology.stack`, each facet has a glyph in `shared.tagFamilies.tech.icons` under the tooltip "Runs on", and `tools/check-grammar.js` fails on any drift — contract and naming rationale in `docs/SCHEMA.md`, `docs/VISUAL-GRAMMAR.md`, `docs/CONFIG.md` and `docs/PROVENANCE.md` §17.7.

**Amended 2026-09-16 (§18.9): the rail no longer lists a platform with no products.** Round 4 rendered all four options with their counts and disabled the zeroes — *All 7 · 5 · 0 · 2 · 0*. It now offers **All · OCI + NVIDIA (5) · Oracle Autonomous AI Lakehouse (2)**: the two zero-count platforms are simply absent, the **All** option carries no count, and a zero renders no number. The four canonical ids, labels and `emptyState`s are untouched, and **`?tech=<id>` still resolves for all four** — the active facet renders its own option, selected, above its `emptyState` in the normal grid container. The reason for the reversal is in §18.9 (c): a `0` printed beside two of Oracle's own AI platforms, on a page an Oracle account executive opens live on a call, is a scoreboard rather than a filter. `facets.footnote` and the `.rail-note` line under the group went with it.

## 6. Task 1 — Home page rebuild (creative decisions, made by Fable) — (DONE 2026-09-16 — see PROVENANCE §18)

**The plan below is kept as written**, because it is the reasoning the build was judged against, not a to-do list. Where the build deviated from it — *ready-to-run*, the duration stat, four S2 bullets, the method line and the NDA line, the partner strip, the H1 scale, the two ladder vocabularies — `PROVENANCE.md` §18.0 records each deviation and the reason for it. The data model that shipped is in `SCHEMA.md` §`overview`; §6.4's execution split is history now.

**None of the copy below is live any more.** The §18.7 messaging pass rewrote the home page against an Oracle rep and an enterprise buyer, and retired this brief's *best-of-breed*, *ready-to-run*, *packaged*, *workflow pattern* and its counted headlines (*Seven products, three workflow patterns.*). Read §6 for the reasoning; read `content.js` and `PROVENANCE.md` §18.7 for the words.

### 6.1 Positioning and naming

Value proposition (the practice's, expressed through products + services): **best-of-breed enterprise AI agents and workflows on Oracle platforms.** SoftServe builds AI agents and workflows on Oracle's leading platforms — OCI (with NVIDIA), Fusion Applications, AI Data Platform, Autonomous AI Lakehouse — compounding Oracle's AI databases and platforms with hands-on experience delivering enterprise agentic AI. The answer has two sides: ready-to-run products (grouped by workflow pattern) and a dedicated Oracle AI & Data practice (packaged delivery model + expert teams).

- Site name (lockup and `<title>`): **AI Agents on Oracle** — lockup `softserve | AI Agents on Oracle`; `<title>` "AI Agents on Oracle — SoftServe"; product titles "<Product> — AI Agents on Oracle — SoftServe". Not "practice" in the name; the practice is the engine, the agents are the promise.
- Meta description: "Best-of-breed enterprise AI agents and workflows on Oracle platforms — ready-to-run products and a dedicated Oracle AI & Data practice from SoftServe."
- Nav: `Products · Services · Case studies` (anchor to the home proof screen) + header button **Talk to us** (→ Services contact). The logo is the home link; drop "Overview". Product pages keep "Request a demo" CTAs.
- Words to use: "AI agents and workflows", "Oracle platforms", "ready-to-run", "Jumpstart proof of value", "in your Oracle tenancy", "measured". Words to avoid: "practice" in headlines, "cutting-edge", "seamlessly", "unlock", "empower", "revolutionary".

### 6.2 Structure — seven screens, each content-sized (no 100vh heroes), ~80–90vh at 1440×900

**S1 Hero — the thesis.**
- Eyebrow: `SOFTSERVE × ORACLE · AI AGENTS AND WORKFLOWS`
- H1 (two lines, second line teal): `Enterprise AI agents and workflows.` / `Built on Oracle.`
- Lead (≤ 45 words): "Oracle's AI platforms, compounded by SoftServe's enterprise agentic-AI experience: ready-to-run agents and workflows for the jobs enterprises repeat most, and a dedicated practice that takes them from a fixed-scope proof of value to production."
- CTAs: primary `Explore the products` (→ S3), secondary `How we deliver` (→ S4).
- Visual, right column (HTML/CSS or inline SVG, no photo): the **"built on" stack** — three bands. Bottom band: four Oracle platform tiles (OCI + NVIDIA · Oracle AI for Fusion Applications · Oracle AI Data Platform · Oracle Autonomous AI Lakehouse) with the Oracle wordmark at the band's edge. Middle band: SoftServe layer — "Agentic-AI patterns · Evaluation frameworks · Packaged delivery". Top band: three workflow-pattern tiles (Deep research · Processing pipelines · Data analysis & optimization) with the seven product names as small chips under them. Thin connector lines; on load the lines draw in over ~1.2 s (static under reduced motion). Bands are peers: same height, same padding.
- Proof strip under the hero, hairline-divided, 4 stats: `7` ready-to-run products · `4` Oracle AI platforms · `30–45 days` to a proof of value (the Lakehouse Jumpstart figure in content.js; if another product's Jumpstart is shorter/longer, phrase as "weeks, not quarters") · `500+` data and AI experts (cleared SoftServe data-practice figure already in content.js `overview.hero.stats`; keep only numbers that exist there).

**S2 Two ways in — products and services.**
- Eyebrow `TWO WAYS IN`; H2 `Products you can run now. A practice that makes them yours.`
- Two equal panels, thin divider, each: icon, title, 3-line text, three proof bullets with check icons, one CTA.
  - Left — `Ready-to-run AI agents and workflows`: "Seven packaged products for the workflows enterprises repeat most: deep research, document processing, data analysis and optimization. Each runs on Oracle, in your tenancy, and starts with a fixed-scope Jumpstart." Bullets: "Grouped by workflow pattern, so you find the job first" · "Built on OCI + NVIDIA or Oracle Autonomous AI Lakehouse" · "Demo, Jumpstart scope and pricing on every product page". CTA `See the products ↓` (scrolls one screen).
  - Right — `A dedicated Oracle AI & Data practice`: "One packaged delivery model — Jumpstart proof of value, integration, scale — run by teams who build on Oracle's AI platforms every day. The people who built the products build yours." Bullets: "Fixed scope, fixed price, weeks not quarters" · "Evaluation-first: results are measured before you commit" · "Expert pods: AI engineers, data engineers, Oracle architects". CTA `How we deliver ↓` (scrolls two screens).
  - Verify every bullet against `content.js` `services.*` and the wiki; drop, don't replace, anything unsupported.

**S3 Products — one screen.**
- Eyebrow `PRODUCTS`; H2 `Seven products, three workflow patterns.`; one-line lead.
- Layout: three columns = the three patterns, each with pattern icon, name, one-line definition, then compact product rows (name, ≤ 12-word one-liner, tiny Demo/Marketplace badges) linking to product pages. Order inside columns follows `SITE_CONFIG.productOrder`. Peer rows identical; columns equal height (the single-product column carries a longer pattern definition, not an empty card).
- Footer link: `Browse all products with filters →` (Products page).

**S4 Services — one screen, "How we deliver".**
- Eyebrow `SERVICES`; H2 `From proof of value to production, in one packaged model.`
- Left 60%: horizontal three-step ladder — `1 Jumpstart Proof-of-Value` (fixed scope and price, on your data, decision-ready result; duration only where content supports it) → `2 Integration` (connect to your systems, harden, hand over) → `3 Scale` (roll out across units and regions, managed evolution). Each step: title, two lines, one fact.
- Right 40%: `Why SoftServe on Oracle` — three pillars: Platform depth (OCI + NVIDIA, AI Data Platform, Autonomous AI Lakehouse, Fusion Applications) · Agentic-AI experience (pattern library, evaluation frameworks, human-in-the-loop design) · Packaged delivery (fixed scope, measurable outcomes, weeks not quarters). CTAs `Explore the services →` (Services page) and `Talk to us`.

**S5 Social proof — "Proven on customer data".**
- Eyebrow `CASE STUDIES`; H2 `Measured on customer data, under NDA.`; the existing four case-study cards (component from round 4, 2×2, equal height) + the method line (`services.proof.methodNote`, the 81% evaluation story) + "Reference calls available on request." Anchor `#case-studies` for the nav.

**S6 About SoftServe — credibility.**
- Eyebrow `ABOUT SOFTSERVE`; H2 `A global digital engineering company, building on Oracle and NVIDIA.`
- One paragraph + four stat tiles with corporate facts fetched from https://www.softserveinc.com (About/company pages) — founding year, headquarters, headcount, offices/countries, or whatever the public page states. Do not invent; if a figure is not on the public site, leave the tile out. Partner line `Built with Oracle and NVIDIA` with the two wordmarks (no partner-tier claims). Link `softserveinc.com`.

**S7 Contact.** Reuse the contact split (card + form) with heading `Talk to the Oracle AI & Data team`.

### 6.3 Layout and motion decisions

- Keep the design system; the home page differs from product pages by composition, not tokens. Alternate full-bleed sections and inset panels; hairline rules between screens; one accent per screen.
- Hero type: H1 at the existing display scale; the stack visual is the only "illustration" — no stock photo on the home hero (the photo stays on product/services heroes).
- Motion: line-draw in the stack visual, scroll-reveal on section entry (visible resting state, never parked at opacity 0), hover lift on panels/rows. Nothing else.
- Every screen ends with one CTA at most. Peers equal height. Mobile: stacks in the same order; the stack visual collapses to a vertical three-band list.

### 6.4 Execution split

- Fable (main session): confirm the copy above against `content.js`/wiki facts, adjust wording, decide any deviation; review screenshots once; publish.
- Opus subagents: (1) fetch the public SoftServe corporate facts and write S6 data; (2) rewrite `overview.*` in `content.js` to the S1–S7 model + update `docs/SCHEMA.md`, `docs/VISUAL-GRAMMAR.md`, `docs/PROVENANCE.md`, `tools/check-grammar.js`; (3) implement `pages/overview.js` + CSS (stack visual, two-panel screen, catalog columns, ladder + pillars, case grid, about block, contact) and the nav/title/lockup changes in `index.html`, `app.js`, `content.js`; (4) QA: design critic + copy/leak critic, one fix pass; then Fable publishes.

## 7. Open inputs (unchanged, Alex to supply)

Demo video URLs and posters (Workforce optimization, Large Docs, Account Insights); Oracle Marketplace listing URLs (Workforce optimization, Large Docs); success-story files; OneDrive share links for seller materials; a verified public contact alias (`oracle@softserveinc.com` is the printed one); form endpoint or lead route; hosting subdomain; written approval to name customers (none today); rights confirmation for deck imagery and product screenshots.

## 8. Paste-ready prompt for the new session

```
Read outputs/oracle-solutions-site/docs/HANDOFF.md first and follow it. You are continuing the SoftServe "AI Agents on Oracle" mini-site (static site at outputs/oracle-solutions-site/site). This machine has only the repo: no OneDrive, no old scratchpad — do not search for them; everything needed is in the repo or on the public web, as the handoff's table says.

Do, in order:
1. Task 1 (HANDOFF §6): rebuild the home page to the seven-screen structure and copy in §6.2, with the naming in §6.1 and the layout/motion rules in §6.3. You (Fable) own every creative, messaging and layout decision — verify each claim against site/data/content.js and the wiki pages named in §2, adjust wording where a fact is unsupported, and keep the structure. Delegate the tedious work to Opus subagents per §6.4 (facts fetch, content model, implementation, QA critics + fix). Do not re-derive earlier rounds; do not restyle the design system.
2. Verify per §4 (node --check, tools/check-grammar.js OK, console clean, customer-name grep empty), then publish per §4 to the existing artifact URL and report: what changed, the copy as shipped for S1/S2/S6, and anything you decided differently from the handoff and why.

Rules in §3 are non-negotiable. Commit with conventional messages and push when done (no autosync here).
```

---

## 9. Runtime note — Node is not on PATH on this Mac

`node` is not installed on the PATH here, so `node tools/check-grammar.js` and
`node --check` fail with *command not found* until you point at a bundled
binary. Two work:

- **Codex's bundled Node (v24), the simple one:**
  `/Applications/Codex.app/Contents/Resources/cua_node/bin/node`. Symlink it
  into a scratch `bin/` and prepend that to `PATH` for the session, and every
  command in this file works verbatim.
- **VS Code's Electron**, run as Node: `ELECTRON_RUN_AS_NODE=1` before the
  Electron binary. Fine for the checker, which is plain CommonJS with no
  dependencies.

**Do not use the Claude desktop app's bundled binary for this.** It ignores
`ELECTRON_RUN_AS_NODE` and launches a second GUI instance of the app instead of
executing the script — a visible, confusing failure rather than an error
message.

Nothing needs to be installed: the site has no build step, and the checker has
no dependencies. If a real Node lands on this machine later, delete this note
rather than keeping two procedures.

**The shared local preview server is not yours alone.** Each Opus critic spawned
in the §18.7 messaging round stopped the shared `python3 -m http.server` preview
when it finished its read, so the next tool call hit a dead port. A session that
runs a critic must expect to restart the server afterwards — check it before
blaming a page for not loading.
