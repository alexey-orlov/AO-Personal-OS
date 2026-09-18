# Start here — Oracle AI & Data Solutions mini-site

Read this page first in every new session. It holds what the site is for, the brief and the rules it is built to, how a round of work runs, and what earlier rounds learned the hard way. Detail lives in the docs mapped in §10. Keep this page current: when a requirement, rule or procedure changes, rewrite the line — never append a dated update.

Current as of 2026-09-18 (after the current-SoftServe-brand theme).

## 1. What it is

- **The site:** one small site for SoftServe's Oracle AI & Data practice, named **Oracle AI & Data Solutions**. It offers *products* (AI agents and workflows on Oracle platforms) and *services* (the practice that delivers them, from a 4–8-week proof of value to scale).
- **How it is used:** Oracle and SoftServe sellers open it live on a call, and customers receive it as a link.
- **People:** Alex owns the site and every decision on it. The person on the contact card is Karsten Tramborg (Alliances & Partnerships Director). The practice mailbox is oracle@softserveinc.com.
- **Code:** a static, hash-routed SPA in `site/` with no build step and no framework.
  - **Two themes share one tree.** `site/index.html` + `assets/site.css` is the original
    near-black theme; `site/index-v2.html` + `assets/site-v2.css` is the **SS26 theme**,
    re-skinned to the brand softserveinc.com runs today (white ground, Azurio serif over
    Replica LL, Lviv blue with Austin orange, octagonal corner cuts). Read
    `docs/SS26-THEME.md` before touching either. Images, renderers and copy are shared:
    logo paths go through `assets/brand.js`, and the SS26 theme re-cases the
    stored-capitals strings through `data/content-v2.js` rather than editing `content.js`.
  - Copy: `site/data/content.js`.
  - Switches: `site/data/config.js`.
  - Page renderers: `site/pages/`, one per page.
  - Shared UI and the router: `site/assets/app.js`.
  - Forms: `site/assets/forms.js`.
- **Preview:** two artifacts, one per theme, both **shared with anyone who has the link**, so every publish is live at once.
  - Original theme: https://claude.ai/artifact/98wafGUphFSyGSr6ctJiiN (the same artifact as https://claude.ai/code/artifact/41e4f3b6-47d9-4ef2-af99-99c40c02b89b).
  - SS26 theme: https://claude.ai/artifact/HTEJADBQF3ZevFPuSoTHri.
  - Which of the two becomes the site is Alex's call and is still open.
- **Stage:** prototype. The *Internal* button (bottom right) opens a checklist of the assumptions still to be confirmed, and it comes off before launch (§8).

## 2. The brief

These are Alex's working assumptions as of 2026-09-17, and **each one is still to be confirmed**. The *Internal* panel shows them as a checklist (`site/data/review.js`). Alex's ticks are saved only in his own browser and never reach the repo, so a confirmation counts when Alex tells a session. That session then rewrites the line here and removes or rewords the item in `review.js`.

- **Audience, in priority order:**
  1. Oracle sellers and partners.
  2. SoftServe sellers.
  3. End customers.
- **Positioning:**
  - Experts in AI and in Oracle's platforms, with a multi-year, top-class enterprise track record.
  - Ready-made solutions, fast proofs of value and a dedicated practice.
  - We offer products *and* services.
- **Commitments and disclosures:**
  - A proof of value takes **4–8 weeks**, everywhere. This still needs agreement with delivery; `tools/check-grammar.js` already fails any other duration.
  - The proof-of-value price is the only price on the site. Every other package price goes in the sales materials.
  - No customer names, because no customer has confirmed we may use theirs.
  - The catalog holds both existing and planned products.
- **Communication flow:**
  - One mailbox, oracle@softserveinc.com, receives every request.
  - Karsten is the contact for communications.
  - Sales materials go only to corporate addresses at softserveinc.com or oracle.com.

**Where the site does not match the brief today** (flagged in the panel and left unchanged until Alex decides):
- Two products print an **Integration price** on their Jumpstart tab: *Large docs processing and review* and *Workforce optimization* (€300–500K services plus infrastructure).
- **No product is marked as planned**, so all seven read as available now.
- **Partners** are priority 1, but they cannot receive the sales kit, which goes only to @oracle.com and @softserveinc.com. The brief contradicts itself here.

## 3. The site, page by page

| Route | What it does | Record |
|---|---|---|
| `#/` Home | Seven screens: <br>• hero with the built-on stack and a three-figure strip <br>• two ways in <br>• the agents by what they do <br>• how we deliver <br>• anonymized case studies (Proven / Forecast / Estimated) <br>• About SoftServe (the page's one light band) <br>• contact | PROVENANCE §18 |
| `#/products` | Catalog with a facet rail (platform, what it does, availability) and tiles. It never prints a total, a denominator or a zero-count platform. | §17, §18.9 |
| `#/products/<slug>[/<tab>]` | Seven product pages. <br>• Tabs: Overview · Technology · Jumpstart · Contacts · For sellers (that product's sales-kit request). <br>• Three products have an interactive walkthrough under `site/demo/`. | §15–§19, §22, §24 |
| `#/services` | Three screens, one message each, then contact: <br>• *Frontier AI on Oracle* (the practice) <br>• *Every step has a number* (Discovery → proof of value → Integration → Scale) <br>• *Not a project. A proof.* (4–8 weeks) | §21, §23 |
| `#/sellers` | *Get the sales kit*, for all offers or one product (work email at softserveinc.com or oracle.com). Below it, the demo form for a seller who already has an account in mind. | §24 |

- **Header:** Products · Services, plus *Talk to us*. *For sellers* is not in the header (Alex, 2026-09-17).
- **Footer:** *For sellers* comes first in the link row. It is the only permanent way to `#/sellers`; the other is *Get the full kit* in the confirmation after a product kit request.

## 4. Standing rules

These hold unless Alex changes them, and `tools/check-grammar.js` enforces most of them. The full wording is in HANDOFF §3 and `.claude/references/client-documents.md`.

**Content**
- Every word lives in `content.js`, and renderers only read data. No invented facts, numbers, customers or URLs. Log every new line of copy in PROVENANCE.
- **No customer names or logos** in anything shipped. Describe customers by industry and scale. The checker and the deny-list grep both enforce this.
- **No Oracle partner-standing claim**: no tier, no award. What may be said is joint delivery with Oracle's AI & Data organization.
- **Naming:**
  - Oracle products: "Oracle Autonomous AI Lakehouse", "Oracle AI Data Platform" (never "AIDP"), "Oracle AI for Fusion Applications", "OCI".
  - NVIDIA products: "NVIDIA", "AI-Q", "cuOpt".
  - GigaCloud never appears.
- **Prices:**
  - No € figures on Services.
  - A price never ships without its disclaimer.
  - Beyond that, the brief in §2 applies (still to be confirmed).
- **No totals and no gaps.** Never print the size of the catalog ("seven products"). Never name what is missing ("yet", "so far").
- **A case study states its status once**, in one word: the chip.
- **Truthful confirmations.** Never say "we've emailed" unless something actually sent the email. With no `formEndpoint`, a form opens the visitor's mail client, and the page says so.
- **Nothing internal ships in site copy.** The *Internal* panel is the only exception, and it is temporary (§8).

**Messaging** (from Alex's reviews)
- **Persona first.** Every headline speaks to its reader (a rep on a live call, a buyer on Oracle) in that reader's words. Never counts, taxonomy or packaging terms ("packaged", "workflow pattern", "ready-to-run", "pods").
- **Structure before copy.** Work out the audience, then the positioning, then three or four messages, then one screen per message, and set the length target first. A page is an argument, not an inventory.
- **Headings are display lines**, so the argument moves into the lead:
  - H1: two to four words, ≤ ~24 characters a line, two lines at most.
  - H2: five words or fewer, ≤ ~30 characters.
  - Light-band title: ≤ ~28 characters.
  - Check where the line breaks on a phone: no lone short word on a line.
- **Repetition:**
  - No content word three times on one screen.
  - One word for one thing across the whole site.
  - No claim repeated in more than two places.

**Design** — the rules below hold for BOTH themes except where the SS26 column differs.

| Rule | Original theme | SS26 theme (`docs/SS26-THEME.md`) |
|---|---|---|
| Ground | near-black, at most **one light band** per page | white, at most **one dark band** per page (`#about`, `.services-page-proof`); `#edf0f2` for cards |
| Accent | one teal `#35CCBA` per screen | **two roles**: `#1485c4` = act on / selected, `#f46a4a` = one hero accent line per page. Facts are neutral |
| Display type | Montserrat 900 **uppercase** | **Azurio serif, 400, sentence case**; H2-H4 in Replica 400; uppercase only as 12-16 px micro-type at +.06em |
| Shape | radii, `9999px` pills | **octagonal `clip-path` cuts** 4/8/12 px; `border-radius: 0` but inputs (2 px) and dots |
| Elevation | glows | **surface steps**; no shadow, no lift, no press-scale |
| Fact vs filter pill | filled navy is a fact, outlined is a filter | filled grey is a fact, outlined is a filter, blue tint is **selected** |
| Heading budget | H1 2-4 words, ≤ ~24 chars a line | H1 ≤ 15 chars a line × 2; product name ≤ 22 × 2; H2 ≤ 30 |

Holding for both: 1.5 px line icons and no emoji · peers are equal height · an address is
a link, never a filled button, and a filled button is the screen's one ask · only the top
block carries a photo, and the home hero carries none · clean at 375, and the H1 still
holds at 320.

## 5. How a round runs

1. **Check the state.**
   - Run `git log` on the folder, and read every file you will edit fresh from disk.
   - Another session publishes this same tree: Alexs-MacBook-Air, which owns the walkthroughs under `site/demo/`.
   - git-autosync commits every ~30 s.
2. **Brief.**
   - Opus gathers the facts from the decks, the site and the wiki `context/areas/softserve/oracle*.md`.
   - It labels each fact: [site] already on the site · [pub] from a deck, publishable · [clr] needs clearance.
   - It writes a short brief to the scratchpad.
3. **Decide.**
   - One Fable pass, working from the brief, makes the messaging, UX and design decisions and writes the copy.
   - Opus does the rest: research, build, checker, QA, publish, docs.
   - The report says which steps used Fable. Token efficiency matters: one compact Fable pass, not a fan-out.
4. **Build.**
   - Run `node --check` on changed JS, then `node tools/check-grammar.js`, which must print OK.
   - Turn every new owner rule into a checker assertion, so it survives the next rewrite.
5. **Look, then publish** (§6).
6. **Record.**
   - Add a new PROVENANCE section: the asks, the split, the decisions, a before/after table, the checks and *Open for Alex*.
   - Update SCHEMA, CONFIG, VISUAL-GRAMMAR and README wherever the contract moved.
   - Rewrite this page wherever the brief, a rule or a procedure changed.
7. **Report** to Alex: what changed, what was decided differently and why, and what is still open.

## 6. Run, QA, publish (short version)

Exact commands are in HANDOFF §4.

- **Run.**
  - Start the server with `preview_start {name: "oracle-site"}` (python `http.server` on 8765).
  - Browse `http://127.0.0.1:8765`, not `localhost`.
  - A QA subagent can kill the shared server; restart it before blaming the page.
- **Fresh assets.** The preview caches hard. Call `fetch('<file>', {cache: 'reload'})` for every changed file, or re-point the stylesheet link with `?v=`, then navigate.
- **Layout QA.**
  - Check every changed screen at 1440, 1280, 1024, 768 and 375, and the H1 at 320.
  - Hide the other `#app` sections and add `is-in` to the `.reveal` blocks, so each screenshot is taken at scroll 0 (screenshots taken after scrolling come back black).
  - Check horizontal overflow at every width.
  - A component moved to a new page takes its wrapper, modifier classes and breakpoints with it.
- **Gates.** All three must pass:
  - the checker prints OK;
  - the console is clean on every route;
  - `grep -ri "bosch\|riyadh\|dhl\|sbg\|logos/" site --include='*.js' --include='*.css' --include='*.html'` returns nothing. In zsh, quote the globs. If ugrep hits its complexity limit, use `/usr/bin/grep`.
- **Publish** — each theme to its own artifact (§1); never cross them.
  - Strip the nine skeleton lines from `site/index.html` (or `site/index-v2.html`) into `.work/publish/` (exact-line `grep -v -x -F`, HANDOFF §4). The two entries differ in their `<html>` line, so strip against the file you are publishing.
  - The SS26 publish must carry `assets/fonts/*` with an explicit `contentType`, and only what its page references — nine legacy files and `assets/site.css` are deliberately absent from it.
  - Call the Artifact tool with `file_path` = that wrapper, `root` = `site`, and a `files` map of every changed or new file.
  - Then run `action: list_files` to confirm that the new files are live and that nothing is published that should not be.
- **Refused publish** ("not built on the newer version") means another session published in between:
  1. `read_file` the live copies of the files you changed.
  2. Diff them against local; the working tree is the merge.
  3. Run `action: read`, then publish again.
- **Node:** `/opt/homebrew/bin/node` on this Mac (KN7X2Y65NX). On a machine without Node, see HANDOFF §9.

## 7. Learnings: mistakes not to repeat

- **A background agent's silence is not progress.**
  - Have it write intermediate output early, and check that file's mtime when the stage should be done.
  - If nothing has moved, stop the agent and take the work over. A research agent stalled for over an hour in round 6 (rule in `CLAUDE.md`).
- **Fable's copy gets an Opus pass before it ships:**
  - The renderer escapes HTML, so `&amp;` prints literally; write `&`.
  - Retired vocabulary creeps back (*ready-to-run*).
  - Leads run long. Count lines in the browser, not characters in the file.
- **Headings over budget** drew the owner's sharpest correction ("too long of a heading", round 6). Budget before writing, and check at 375.
- **Moving a component breaks it quietly.** Version 28 shipped the Services hero without its wrapper and with an 84 px H1 (PROVENANCE §21.7).
- **The publish wrapper strips by exact line.**
  - Stripping by prefix once removed the `<header>` (version 16).
  - Keeping the meta lines once shipped them twice (version 26).
- **Parallel sessions share PROVENANCE numbering.** Read the last heading before numbering a round; round 7 had to move from §22 to §23.
- **Checker regexes need word boundaries.** "2 months" matched "3–12 months".
- **A duration, a price or a promise is a commitment, not copy.**
  - The 4–8-week sweep compressed *Plan vs actual investigation* from 12 + 2 weeks. It was flagged for delivery, not shipped as settled.
  - The same goes for the kit's "two working days".
- **Truthful states beat optimistic ones.** The kit form has three confirmations (mail client opened · request received · kit emailed), and only a real auto-sender may use the third.
- **A name built on "Oracle" needs a trademark check** against Oracle's third-party guidelines before launch.
- **A checklist is for ticking, not reading.** The first Internal panel gave every item a status chip, a flag and an "On the site" paragraph; Alex: "much less verbose (1–2 line items)". One line to tick; the analysis goes in the docs and the report.
- **Use the lightest storage that does the job.** "Saved" meant saved in Alex's browser, not a database. Check what a capability costs before reaching for it: `db` would have made the artifact organization-internal.
- **Unreferenced is not unshipped.** The customer logos had sat, unreferenced, under `site/assets/img/logos/`. Whole-tree publishes carried them onto the link-shared artifact, downloadable by path, until version 36 removed them. Anything that must never ship lives outside `site/`: the logos are now in `docs/asset-candidates/logos/`, and the checker fails if that folder reappears under `site/`.

## 8. The Internal review panel (temporary)

- **What it is:** an *Internal · N to confirm* pill at the bottom right of every page. It opens a checklist drawer with one line per assumption, grouped as in §2, and each item has a checkbox.
- **Where ticks are saved:** in the viewer's browser only (`localStorage` key `oracle-ai-solutions:review-ticks`), by item id. Alex chose this over a shared database: declaring the artifact `db` capability would make the artifact organization-internal and break the public preview link. Ticks never reach the repo; §2 is the record.
- **Files:**
  - `site/data/review.js` holds the list: groups of items, each with `id`, `text` and an optional `note`, where the note names what the site does not match yet.
  - `site/assets/review.js` renders the button and the drawer, styles included, with no other dependency.
  - Two `<script>` tags at the end of `site/index.html` load them.
- **Keep it short** (Alex: "1–2 line items"): `text` ≤ 70 characters, ≤ 47 when there is a note, `note` ≤ 45. No other keys: detail belongs in the docs. The checker enforces all of this.
- **Changing the list:**
  - Never rename an item's id; the ticks are keyed by it.
  - Remove an item once §2 records its outcome.
  - Run the checker and republish.
- **Visibility:** anyone with the preview link sees the panel. Set `enabled: false` to hide it without deleting anything.
- **Before launch:** delete both files and both script tags. Until then the checker warns on every run.

## 9. Open items

- **The brief (§2):** every item stays open until Alex confirms it in a session. The panel ticks are only his own progress marks.
- **Round 7 (PROVENANCE §23.4):**
  - delivery sign-off on *Plan vs actual investigation* in 4–8 weeks;
  - clearance for the stronger *Frontier AI* proof points.
- **Round 8 (§24.4):**
  - what sits behind `formEndpoint` for kit requests;
  - whether the mailbox is watched, and whether two working days is the right promise;
  - whether the kit is ready (most manifest links are still pending);
  - whether *all offers* is one bundle;
  - whether subdomains qualify;
  - where partner demo requests go.
- **Inputs Alex supplies (HANDOFF §7):** demo videos and posters, Marketplace URLs, success stories, kit links, form endpoint, hosting subdomain, customer-name approvals, image rights.
- **At launch:**
  - the site name checked against Oracle's trademark guidelines;
  - the Internal panel removed;
  - `og:url` set.

## 10. Map of the docs

| Doc | Read it when |
|---|---|
| `README.md` | You need the folder layout, the routes, the config keys at a glance, the three walkthroughs or deployment |
| `docs/HANDOFF.md` | You need the exact run, verify and publish commands (§4), the standing rules in full (§3), the inputs list (§7) or the Node note (§9) |
| `docs/SCHEMA.md` | You add, rename or retire a `content.js` key |
| `docs/CONFIG.md` | You touch a switch in `config.js` |
| `docs/VISUAL-GRAMMAR.md` | You change a component or a page composition |
| `docs/PROVENANCE.md` | You need a fact's source or a round's decisions (§18 home, §20 name, §21 and §23 Services, §24 sales kit, §25 START-HERE, Internal panel and logos). At 4,500 lines, search it; don't read it top to bottom. |
| `docs/SS26-THEME.md` | You touch either theme: what the current SoftServe brand is, the token map, the shape and colour rules, the fonts, and what is open |
| `docs/ASSETS.md` | You work on images, step frames or posters, and how they were made |
| `docs/HANDOFF-workforce-demo.md`, `docs/HANDOFF-erp-qa-demo.md` | You work on a walkthrough; each is owned by its own session |
| `.claude/references/client-documents.md` | You write marketing copy |
