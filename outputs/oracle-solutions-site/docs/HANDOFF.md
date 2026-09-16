# Handoff — Oracle AI mini-site (repo-only session)

Written 2026-09-16 by the build session on Alex's Mac. Everything a new session needs is in this repository; nothing below requires the laptop. Read this file first, then `README.md`, `docs/CONFIG.md`, `docs/SCHEMA.md`, `docs/VISUAL-GRAMMAR.md`, `docs/PROVENANCE.md`.

## 1. State of the site

- Served root: `outputs/oracle-solutions-site/site/` — static, no build step, hash-routed SPA (`index.html`, `assets/site.css`, `assets/app.js`, `assets/forms.js`, `pages/*.js`, `data/content.js`, `data/config.js`, `data/diagrams.js`, `assets/img/**`).
- Live preview (private, owned by Alex): https://claude.ai/code/artifact/41e4f3b6-47d9-4ef2-af99-99c40c02b89b — last published as version 16 (round 4 plus canonical technology facets, 2026-09-16).
- Pages: Overview (home), Products (facet rail + tiles), 7 product pages (Overview · Technology · Jumpstart · Contacts · For sellers), Services (practice + contact).
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
| About-SoftServe corporate facts | not in the repo; fetch from https://www.softserveinc.com (About page) | yes (web) |

Git: git-autosync runs only on the Mac. On another machine: `git pull` first, commit with conventional messages (`feat(site): …`), `git push` when done.

## 3. Standing rules (do not relax)

- Copy lives in `data/content.js`; renderers read data. No invented facts, numbers, customers, URLs. New copy for thin spots is written in the same register and logged in `docs/PROVENANCE.md`.
- No customer names or logos anywhere in shipped files (Bosch, BSH, Riyadh Air, DHL, SBG are banned; the checker enforces a deny-list). Anonymized descriptors only. No € figures, headcounts, baselines or contract values.
- Naming: "Oracle Autonomous AI Lakehouse", "Oracle AI Data Platform" (never "AIDP"), "Oracle AI for Fusion Applications", "AI-Q", "cuOpt", "OCI", "NVIDIA". Never mention GigaCloud.
- Nothing internal ships: no source/assumption comments, TODOs, "(assumed)", wiki jargon, internal codes.
- Design system stays: near-black ground, teal accent `#35CCBA`, Montserrat 900 uppercase headlines + Open Sans body, 1.5px line icons, equal-height peers, no emoji, reduced-motion respected, mobile clean at 375.
- Config-driven states: `video`, `videoUrl`, `videoPoster`, `marketplace`, `marketplaceUrl`, `successStoryUrl`, seller materials, `productOrder` — see `docs/CONFIG.md`. Elements whose URL is empty are not rendered, except the demo frame (pending state).
- Model split Alex asked for: creative, messaging and layout decisions by the main (Fable) session; mechanical implementation, verification and QA by Opus subagents.

## 4. How to run, verify, publish

Run: `.claude/launch.json` has entry `oracle-site` (python3 `http.server` on port 8765, `--directory outputs/oracle-solutions-site/site`, relative to the repo root). Open it with the in-app browser (`preview_start {name:"oracle-site"}`) and browse `http://127.0.0.1:8765` — not `localhost`, whose cache goes stale; hard-reload after edits. In the in-app browser, screenshots taken after scrolling can come back black: screenshot at scroll 0 or resize the viewport tall (e.g. 1440×2400) to see a whole page.

Verify before publishing: `node --check` on changed JS, `node tools/check-grammar.js` → OK, console clean on every route, `grep -ri "bosch\|riyadh\|dhl\|sbg\|logos/" site --include=*.js --include=*.css --include=*.html` returns nothing.

Publish (updates the same URL): create a wrapper copy of `site/index.html` with the `<!doctype>`, `<html>`, `<head>`, `<body>` tags stripped and `<title>SoftServe Oracle AI Solutions</title>` (the Artifact tool wraps its own skeleton), then call the Artifact tool with `url: https://claude.ai/code/artifact/41e4f3b6-47d9-4ef2-af99-99c40c02b89b`, `root: outputs/oracle-solutions-site/site`, and a `files` map of every changed/added file (published path → source path). Read the artifact (`action: read`) once before the first publish from a new session, or the publish is refused. Files not passed are kept; new images must be passed explicitly.

## 5. Task 0 — canonical technology facet (DONE 2026-09-16)

Done 2026-09-16: `facets.technology` is the canonical four — `oci-nvidia` "OCI + NVIDIA", `oracle-ai-data-platform` "Oracle AI Data Platform", `oracle-ai-lakehouse` "Oracle Autonomous AI Lakehouse", `oracle-ai-fusion` "Oracle AI for Fusion Applications" (the `Other` catch-all is retired); the Products rail (All 7 · 5 · 0 · 2 · 0, zero-count options listed and disabled, `?tech=<id>` rendering `emptyState`), the hero chip, the tile image-band, the home grid and the Services platform cards all render that label verbatim, engine detail (AI-Q, cuOpt, Select AI) stays in `technology.stack`, each facet has a glyph in `shared.tagFamilies.tech.icons` under the tooltip "Runs on", and `tools/check-grammar.js` fails on any drift — contract and naming rationale in `docs/SCHEMA.md`, `docs/VISUAL-GRAMMAR.md`, `docs/CONFIG.md` and `docs/PROVENANCE.md` §17.7.

## 6. Task 1 — Home page rebuild (creative decisions, made by Fable)

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
