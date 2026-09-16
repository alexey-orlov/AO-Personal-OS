# HANDOFF — Cross-system ERP Q&A walkthrough (third demo)

_Build spec written 2026-09-16 by the design session (Fable) after three Opus research legs (`.work/erp-qa/brief-A-pack.md` — the pack as pitched; `brief-B-ui.md` — what Autonomous AI Lakehouse and AI Data Platform actually are, UI inventory, measured style tokens; `brief-C-workflows.md` — where cross-system questions arise, the seven mappings, candidate workflows) and Alex's confirmation of the scenario. Opus builds from this file; Fable red-teams the first cut and reviews the final. Read `.claude/references/interactive-demo-playbook.md` first — the standing requirements and the pitfalls apply unchanged._

## 0. Decisions taken with Alex (2026-09-16)

- **Architecture: Autonomous AI Lakehouse + AI Data Platform (AIDP) + one thin Redwood-styled app, "Mapping review".** The Lakehouse alone covers the data layer (federation, Select AI, governance) but ships no business-user Q&A surface and cannot show cross-system lineage inside an answer; AIDP adds the Master catalog (glossary, synonyms — the reconciliation mechanism), Agent flows (text-to-SQL agent with a trace tree) and Agent Hub (the conversational surface). Neither product has a human review queue for entity resolution, so the steward's confirm/reject lives in a small APEX-style app — Oracle's own answer for a custom UI on the lakehouse.
- **The three surfaces are demoed as three apps, and switching between them is part of the demo** (Alex, on Q6). Each keeps its own product look; the tour crosses all three.
- **Oracle product names and interfaces are allowed and expected** ("Autonomous AI Lakehouse · Data Studio", "AI Data Platform · Agent Hub", "Select AI"); no Oracle logo files (we have none cleared), no customer mark anywhere, data files included (playbook rule 2 as corrected).
- **Estate:** Oracle Fusion Cloud ERP, JD Edwards EnterpriseOne, NetSuite, one in-house Oracle Database application (contracts and rebates), one non-Oracle CRM linked as an external table. Oracle apps plus one non-Oracle source, as the pack pitches.
- **Workflows:** supplier consolidation across systems (primary; carries the manual fix), consolidated close across charts of accounts (drill-down and reconciliation), the two-role governance proof (step 6). Intercompany matching and order-to-cash exceptions are saved questions for free exploration.
- **Figures:** no cleared outcome figure exists for this pack (site metrics ship `null`). The band shows synthetic coverage and counts only — no time-to-answer, no savings, no price, no delivery-time claim. Every synthetic figure is listed in §9.
- **No write-back, no gate on answers** (site scope: "the system retrieves, it does not act"; "no human gate"). The only human decision is the steward's, on the lakehouse mapping tables; the closing action is "Publish as certified view", never a posting to an ERP.
- **Site copy** (`site/data/content.js`, product `cross-system-erp-qa`) stays untouched unless the red-team finds a contradiction; step images and the poster are replaced with captures.

## 1. World

- **Company:** Norwell Group — a fictional multi-entity group (plants, distribution, services; no industry named). Group currency USD. Three operating entities on three ERPs after two acquisitions, one in-house Oracle application, one CRM.
- **Period:** Q3 FY2026 (1 Jul – 30 Sep 2026), close in progress; "today" is Tue 6 Oct 2026, 09:40.
- **Personas:** Dana Whitfield, Group Controller (the tour's user; role `CONTROLLER`, all entities, unmasked). Priya Natarajan, finance data steward (owns Mapping review; the fix in step 5 is recorded under her name). Marcus Bell, Regional analyst North America (role `ANALYST_NA`; rows limited to the North America entity, bank and tax fields masked) — the second role in step 6.
- **Entities and systems:**

| Entity | System | Currency | Objects in play | Feed into the lakehouse | Freshness (as of 09:40) |
|---|---|---|---|---|---|
| Norwell Europe (`NG-EU`) | Oracle Fusion Cloud ERP | USD, GBP | `AP_INVOICES_ALL`, `AP_INVOICE_LINES_ALL`, `POZ_SUPPLIERS`, `POZ_SUPPLIER_SITES_ALL_M`, `HZ_PARTIES`, `GL_BALANCES`, `GL_CODE_COMBINATIONS`, `GL_LEDGERS`, `GL_PERIODS`, `GL_DAILY_RATES` | Prebuilt Fusion pipeline (BICC extracts → OCI Object Storage → lakehouse), hourly | 12 min |
| Norwell North America (`NG-NA`, JDE company `00100`) | JD Edwards EnterpriseOne 9.2 | CAD | `F0411`, `F0101`, `F0911`, `F0901`, `F0006`, `F0010`, `F0008` | GoldenGate CDC | 4 min |
| Arden Services (`NG-SV`) | NetSuite | USD | `vendor`, `transaction`, `transactionLine`, `account`, `subsidiary`, `customer` | NetSuite pipeline (SuiteAnalytics Connect), every 30 min | 38 min |
| Contracts & rebates (in-house) | Oracle Database 23ai, schema `CRB` | USD | `CRB_CONTRACTS`, `CRB_REBATE_TERMS`, `CRB_SUPPLIER_XREF` | Database link | 2 min |
| CRM (non-Oracle) | Iceberg tables in object storage | — | `CRM_ACCOUNT`, `CRM_OPPORTUNITY` | External table, refreshed hourly | 1 h 05 min |

- **Certified views (schema `GOLD`)**, on signed-off definitions: `SUPPLIER_360`, `AP_INVOICE_X`, `SUPPLIER_SPEND_Q`, `DUP_INVOICE_PAIRS`, `COA_MAP`, `ENTITY_MAP`, `PERIOD_MAP`, `DOC_MAP`, `GROUP_TRIAL_BALANCE`, `CONSOLIDATED_PL`, `IC_MATCHES`, `O2C_EXCEPTIONS`, `MAPPING_DECISIONS` (13). Each carries an owner ("Group Finance"), a definition line and a "last changed" date — the semantic layer the answers cite.
- **The seven mappings** (brief C) are the model's content: chart of accounts → group account (`COA_MAP`); legal entity / business unit / JDE company (`ENTITY_MAP`); party identity across `POZ_SUPPLIERS` / `F0101` / `vendor` (`SUPPLIER_360`, with `MATCH_SCORE` and `MATCH_REASON`); item cross-reference (listed in the catalog, out of scope for the tour); currency and rates (`GL_DAILY_RATES`, Q3 average for the P&L); calendar and period (`PERIOD_MAP` — JDE's fiscal year starts in July, so JDE period 3 = calendar September); document types and status codes (`DOC_MAP`: JDE `RPDCT` PV/PR/PM ↔ Fusion `INVOICE_TYPE_LOOKUP_CODE` STANDARD/CREDIT/PREPAYMENT ↔ NetSuite VendBill/VendCred).

## 2. The value story and the KPI band

The improvement is what the lakehouse model makes visible that the systems cannot show one at a time. The band (Mapping review, top; shown before → after the refresh):

| Tile | Before (exact match, system by system) | After the refresh | Note |
|---|---|---|---|
| Sources in one governed model | 5 sources, 0 joined | 5 sources · 1 model · 13 certified views | count |
| Supplier records resolved to one golden record | 61.2 % | 93.2 % | 412 records: Fusion 188, JDE 131, NetSuite 93; "resolved" = in a cluster confirmed by tax id, a score ≥ 0.90, or a steward decision, or a verified singleton; 25 proposals (28 records) pending review |
| Unmapped local accounts in the consolidated P&L | 37 | 0 | 497 local accounts (Fusion 214, JDE 186, NetSuite 97) → 120 group accounts; 35 mapped by rule, 2 provisional and queued for review |
| Ledgers that tie to their trial balance | 1 / 3 | 3 / 3 | residual 0.00 after mapping and translation; before, JDE and NetSuite had unmapped residuals |
| Duplicate-payment pairs found across systems | — (not visible) | 14 | same golden supplier, same normalised invoice number, same amount ± 0.5 % after FX, different systems |
| Stalest source | 1 h 05 min (CRM) | 1 h 05 min (CRM) | freshness per source is a platform fact (CDC / pipelines), not a claim |

After the manual fix in step 5 (the steward rejects one false supplier match), the band recomputes: resolved 93.2 % → 93.7 % (two records become two verified singletons), pending 25 → 24, duplicate pairs 14 → 13, the consolidated "Orion" spend row splits in two. The direction does not matter; the recomputation does.

All KPIs are computed in the page from the arrays in `data.js` (playbook §4) — nothing typed in — with a small reconciliation test (`tools/erp-qa-check.js`, run with the Codex Node) asserting the values above.

## 3. Data model (`data.js`)

- `sources[]` — the table in §1 (id, name, system, kind, objects, rowCounts, feed, freshnessMin, currency).
- `views[]` — the 13 certified views (id, name, owner, definition, changed, sources[]).
- `glossary[]` — Master-catalog terms with synonyms: supplier = vendor = address book (`F0101` search type V); last quarter = Q3 FY2026 (1 Jul – 30 Sep); group spend = invoiced amount translated at Q3 average rate; paid = `AP_INVOICES_ALL.PAYMENT_STATUS_FLAG = 'Y'` / `F0411.RPPST = 'P'` / NetSuite `status = 'paidInFull'`; best accounts = CRM tier A; delayed order = promised date passed, not shipped.
- `suppliers[]` — ~60 golden parties with their system records (`{sys, id, name, taxId, bankLast4, city, country, spendLocal, currency}`); the rest of the 412 records are generated deterministically (seeded) into singletons and clusters so the counts in §2 hold. Names synthetic and neutral (Kestrel Components, Bramley Logistics, Tamsin Packaging, Halden Tooling, …). The false match: **Orion Fasteners Ltd** (Fusion `S-10422`, tax id ending 7741, Manchester) vs **Orion Fastening Systems Inc** (JDE address `AB 118207`, tax id ending 2210, Mississauga) — proposal score 0.86, reasons "normalised name 0.91 · city mismatch · tax id mismatch", status "review".
- `matches[]` — 212 proposals: 187 auto-confirmed (score ≥ 0.90), 25 pending (0.75–0.89); each with `records[]`, `score`, `evidence[]` ({kind: name|taxId|bank|address|contract, value, hit}), `spend` per system.
- `accounts[]` — the 37 formerly unmapped local accounts with proposed group accounts (`{sys, local, description, proposed, groupName, score, status: 'auto'|'review'}`); the 2 in review: JDE `8210` "Freight recoveries" → group `4190 Other operating income` vs `5120 Freight out` (0.71); NetSuite `6155` "Software subscriptions" → `6310 IT services` vs `6320 Software licences` (0.78).
- `ledgers[]` — per ledger: TB total local, rate, translated, mapped total, residual before/after, status.
- `pl[]` — consolidated Q3 P&L lines with per-source amounts (USD): Revenue 48.6 M (Fusion 27.9 · JDE 13.2 · NetSuite 7.5), COGS 31.1 M, Gross margin 17.5 M, Sales & distribution 5.2 M, G&A 3.9 M, R&D 1.8 M, Other opex 0.6 M, EBITDA 6.0 M; each line drills to source rows (`GL_BALANCES` / `F0911` / `transactionLine`) with the local account, the group account, the rate and the system on every row.
- `dupPairs[]` — 14 pairs (invoice numbers, amounts, systems, dates, status), one of them the Orion pair; `exposureUsd` sum for exploration (a data value, not a benefit claim).
- `questions[]` — the saved set (§4), each with `text`, `sql`, `columns`, `rows` (per role), `narrate`, `trace[]`, `freshness`, `glossaryHits[]`, `firewall`.
- `roles` — `CONTROLLER` and `ANALYST_NA`: row policy (`ENTITY IN ('NG-NA')`), masked columns (`BANK_ACCOUNT` → `••••`, `TAX_ID` → `**-***7741`), allow-list name `FIN_QA_V3`.
- `audit[]` — log rows (time, user, role, question, sqlHash, rows, allowed|blocked).
- `refreshStages[]` — five stages (§5 step 1). `decisions[]` — the log; `user` — Dana; `steward` — Priya.

## 4. The question set (Agent Hub, saved questions)

1. **Which suppliers do we pay from more than one system, and what did we pay them last quarter?** — the tour's question. 12 rows: golden supplier, systems (badges), records, Q3 spend USD, match score, status; Orion row flagged "review".
2. Show the consolidated Q3 P&L by group account with source attribution.
3. Which local accounts are still unmapped, and what did the model propose?
4. Same invoice number and amount paid in two systems this quarter.
5. Intercompany balances that do not match at quarter end (`IC_MATCHES`: matched / unmatched / timing difference).
6. Which delayed orders are hurting our best accounts? (`O2C_EXCEPTIONS` × CRM tier A — the site's own example.)
7. Top 20 suppliers by group spend in Q3.
8. Rebate terms we have not claimed this quarter (in-house `CRB`).
9. Suppliers whose bank account changed in the last 90 days, with payments since (masked for `ANALYST_NA`).
10. Show full bank account numbers for all suppliers — **blocked by SQL Firewall** for `ANALYST_NA` (allow-list `FIN_QA_V3`; logged), answered for `CONTROLLER` with the last-four column only.

Every answer: the generated SQL over `GOLD` views (realistic, readable, ≤ 25 lines), a trace (parse → glossary terms resolved → SQL generated → SQL Firewall check → executed, rows and ms → answer composed), the stalest source's "as of", source badges per row, Narrate text (two sentences), and an honest caveat line where one applies ("1 proposal in this set is pending steward review").

## 5. The three surfaces

**App switcher** (ours, not a product): a slim neutral strip above the product chrome — "Norwell Group workspace" left, three tabs with a product glyph and name: *Autonomous AI Lakehouse · Data Studio*, *AI Data Platform · Agent Hub*, *Mapping review*; the active tab underlined in Oracle red. It must read as a workspace launcher, not as part of any product.

**Surface 1 — Data Studio (Lakehouse).** Replicate from `ui-anatomy.md` (video leg) and `ui/manifest.md`: continuous dark L-shell (`#312d2a`), left nav (Launchpad, Data Load, Catalog, Data Analysis, Data Insights, Data Transforms, Data Share), page background `#eeedeb`. Screens: **Catalog** — mounted-catalog chips `FUSION_ERP` `JDE_E1` `NETSUITE` `CRB_INHOUSE` `CRM_ICEBERG`, search, entity-type pills, Filters facets, "Showing N entities", grouped results with initials avatars, row-count pills and "Updated N min ago"; the `GOLD` certified views listed with their definitions. **Data Load → Feeds**: the job card *Cross-system finance model (GOLD)* — last run, sources, a **Run now** button (step 1), a stage list with progress, and on completion a toast "Model rebuilt · 13 certified views · Open Mapping review". Optional, static: Data Analysis with the natural-language "Generate Query" field showing question 7 as SQL.

**Surface 2 — AIDP Agent Hub.** Replicate from the anatomy doc: cooler dark top bar (`#2c2d31`) over a light left nav (`#f8f6f5`), warm canvas (`#f1eeeb`), serif greeting ("Good morning, Dana"), a large prompt box, saved questions as chips, an agent card *Finance Q&A agent* (text-to-SQL over `GOLD`, connection `LAKEHOUSE_GOLD`). Answer anatomy borrowed from the Select AI chatbot: right-aligned question bubble → "Total rows: 12 | Displayed: 12 · as of 09:28 (stalest: CRM)" → result grid with a per-row **source badge** column → action chips **Explore / Explain / Code View / Trace** → Narrate toggle. *Explain* shows the glossary resolution; *Code View* the SQL; *Trace* the span tree in the Agent Studio Sessions style (durations, allow-list line); *Explore* opens the drill panel: source rows per system with the system on every row, the match evidence for a supplier, the reconciliation line for a P&L figure. Top right: user menu with **View as** (Dana → Marcus Bell, Regional analyst NA) — step 6. On every answer: **Publish as certified view**. Left nav: Home, Insights (three static dashboards: Supplier spend, Close status, O2C exceptions — the pack promises "two to three operational dashboards"), Catalog (a glossary glimpse), Sessions (the audit log).

**Surface 3 — Mapping review (Redwood app, APEX Redwood Light look).** White header with the app name and Priya's avatar, light page (`#f5f4f2`), Redwood buttons (dark filled primary), dense white tables. Content: the **health band** (§2, before → after tiles with ▲▼ deltas), then tabs **Supplier matches (25 to review)** · **Account mappings (2 to review)** · **Decisions log** · a **Re-run resolution** button. A proposal row: the records side by side with system badges, evidence chips (name 0.91 · tax id ✗ · bank ✗ · city ✗), score, spend per system, **Confirm / Reject / Merge into…** and a note field; rejecting with a reason adds a learned rule line ("Different tax ids never match") and a decision row (who, when, why). Re-run recomputes the band and the affected answers.

The reusable parts: the tour engine, click guard, passive steps, end card and URL switches from `site/demo/workforce-optimization/demo.js`; the KPI band and changes-list CSS from `demo.css`. Copy the engine, not the app.

## 6. The tour (six steps, value first)

1. **Refresh the model** (Data Studio · Feeds). 1a click **Run now** → five stages, ~1 s each: Sync sources (CDC · pipelines · links) → Resolve supplier identities (412 records) → Map accounts to the group chart (497 → 120) → Translate and reconcile ledgers (3) → Rebuild certified views (13) · SQL Firewall allow-list refreshed. 1b (auto) wait. 1c click **Open Mapping review** in the toast → the switcher moves to Mapping review. Call the state change before `tour.after()` (playbook pitfall).
2. **Review the improved metrics** (Mapping review · band) — passive, Next. Copy: what got better and why: identities resolved, accounts mapped, ledgers tie, duplicates surfaced.
3. **Ask across systems** (Agent Hub). 3a click the switcher tab *AI Data Platform · Agent Hub*; 3b click the saved question 1 → the answer renders with badges and the freshness line.
4. **See where each figure comes from.** 4a click **Trace** → SQL, glossary hits, firewall line, rows and ms; 4b click **Explore** on the Orion row → source rows in Fusion and JDE, the evidence, the "review" flag.
5. **Fix a mapping by hand** (Mapping review). 5a switcher tab; 5b open the Orion proposal; 5c **Reject** with the reason "Different tax ids — two companies"; 5d **Re-run resolution** → the band and the decisions log update; a toast says which answers changed.
6. **Prove the governance and hand off** (Agent Hub). 6a switcher tab; the answer to question 1 is now 11 rows (Orion split out); 6b **View as → Marcus Bell** → the same question re-runs: 4 rows, bank and tax columns masked, the trace shows the row policy and the masking; 6c **Publish as certified view** → toast "GOLD.SUPPLIER_MULTI_SYSTEM_Q3 added to the certified set". End card: what was shown, and the free-exploration hints (saved questions, the blocked question 10, dashboards, decisions log).

Skip = auto-perform, as before. Hints allow only the designated control; every other click is guarded.

## 7. Files, switches, tooling

- `site/demo/cross-system-erp-qa/index.html`, `demo.css`, `demo.js`, `data.js`; three `<section data-app="lakehouse|aidp|review">` panels, one visible; the switcher above them; Google Fonts blocked in captures, so the stack is `"Oracle Sans", -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif` with Georgia for the Agent Hub greeting.
- URL switches: `?tour=off&ui=clean&state=start|refreshed|fixed|final&app=lakehouse|aidp|review&role=controller|analyst&q=1..10&panel=trace|explore|code`.
- `window.DEMO` API for the capture tool (`tools/capture-demo-frames.mjs`, `MODE=script`); scenario files `tools/capture-erpqa-tour.json` (tour regression, every sub-step, `LOGS: none` is the gate) and `tools/capture-erpqa-frames.json` (frames + poster).
- Node: `/Applications/Codex.app/Contents/Resources/cua_node/bin/node`. `node --check` on every JS file; `node tools/check-grammar.js` on the site.

## 8. Captures and wiring

- Four step stills + poster: 640 × 400 CSS-px crops at DPR 2 → 1600 × 1000 JPEG q86 ≤ 300 KB (`docs/ASSETS.md` §1): (1) Data Studio Catalog with the five mounted catalogs and the job card; (2) the band after the refresh; (3) the Agent Hub answer with source badges and the trace open; (4) Mapping review with the rejected proposal and the recomputed band. Poster: the Agent Hub answer at `state=final`.
- `site/assets/img/steps/cross-system-erp-qa-1..4.jpg`, `site/assets/img/posters/cross-system-erp-qa.jpg`; delete the four SVG illustrations; `content.js` step `image` fields → `.jpg`.
- `config.js` → `demoUrl: "demo/cross-system-erp-qa/index.html"`, `videoPoster`, and `demoPreviewUrl` once the standalone artifact exists (main session publishes; subagents never publish and never run git).

## 9. Synthetic figures (all invented; list for Alex)

412 supplier records (188 / 131 / 93) · 61.2 % → 93.2 % → 93.7 % resolved · 212 proposals (187 auto, 25 → 24 pending) · 497 local accounts → 120 group accounts · 37 → 0 unmapped (35 rule, 2 review) · ledgers 1/3 → 3/3 · 14 → 13 duplicate pairs · Q3 P&L: revenue 48.6 M USD (27.9 / 13.2 / 7.5), COGS 31.1 M, gross margin 17.5 M, opex 11.5 M, EBITDA 6.0 M · freshness 12 / 4 / 38 / 2 / 65 min · answer rows 12 → 11 (controller) / 4 (analyst) · 13 certified views · 10 saved questions · audit event numbers. No time-to-answer, price, savings or delivery-time figure anywhere.

## 10. Red-team checklist (Fable, on the first cut)

- Site copy, product `cross-system-erp-qa`: all seven `features` visible in the demo (prebuilt pipelines; one non-Oracle source; certified views on signed-off definitions; plain-English Q&A over the governed schema; two to three dashboards; masking by role in the data layer; a foundation that persists). Scope `out`: no live integration, no write-back, no production SLA claims. `moreDetail`: "no human gate" — the demo gates mappings, never answers; say so in the end card and the docs.
- Deck (`brief-A-pack.md`): GA features only — no "prebuilt agents", no invented native AIDP ↔ Lakehouse catalog sync (the Agent Hub agent reads `GOLD` through a catalog connection, which is real); never state "AIDP is Delta-only"; no price; no NVIDIA.
- Playbook rules 1–8: real product flow and screens (from the video frames), customer-agnostic, mocked I/O, six steps, one control per hint, value first, a dedicated metrics step, figures listed, Opus-by-default.
- Recognisability: a viewer who knows Data Studio or AIDP must recognise each surface; the three surfaces must not share chrome; the Mapping review app must look like a Redwood app, not like the two previous demos' Inter-based shells.
- Numbers: the band, the queues, the answers and the P&L reconcile before and after the fix (`tools/erp-qa-check.js` passes).

## 11. Work split and order

| Leg | Model | Input | Output |
|---|---|---|---|
| A. Video and UI reference | Opus | briefs, `ui/` | `.work/erp-qa/video/`, `.work/erp-qa/ui-anatomy.md` |
| B. Data model and reconciliation | Opus | this file §1–4, §9 | `data.js`, `tools/erp-qa-check.js` |
| C. Build (three surfaces, switcher, tour) | Opus | A, B, §5–7, the WfO engine | the four demo files, tour scenario, `LOGS: none` |
| Red-team | Fable | C's screenshots, §10 | gap list |
| D. Fixes, captures, wiring, docs | Opus | red-team list, §8 | stills, poster, `config.js`, `content.js`, README / CONFIG §3 / ASSETS §1 / PROVENANCE §20 |
| Publish, review, wiki fold | Fable | D | standalone artifact, site artifact, `demoPreviewUrl`, wiki |

Done block: — (filled when shipped).

## 12. Build notes (running record)

- **Leg A (video and UI reference), done 2026-09-16.** The yt-dlp standalone macOS binary (official GitHub release 2026.08.19, kept in the session scratchpad) fetched seven official Oracle videos without a sign-in wall; a Swift/AVFoundation tool cut 100 native key frames, 566 index frames and 31 contact sheets into `.work/erp-qa/video/` (268 MB, git-ignored). Videos: *Access Data from Anywhere with Oracle Autonomous AI Database Catalog: Demo* (Oracle, 2025-10-14, `XubFc-QHgsc`); *Short demo Ask Oracle App powered by Select AI* (Autonomous Database PM Team, 2025-11-14, `p595Io2cxyw`); *Build AI Agents with Oracle AI Data Platform: Demo* (Oracle, 2025-11-25, `hpjnIXpOd0E`); *How to Use Master Catalog, Workspace, and Compute in Oracle AI Data Platform* (Oracle, 2026-06-17, `3f-7RdriJ3Y`); *Oracle AI Data Platform: Lakehouse, Analytics, and Agentic AI Demo* (Oracle Developers, 2026-07-22, `ObsHJhduwwE`); *Autonomous Database Speaks "Human" using Select AI* (ADB PM Team, 2023-09-26, `htVeX8loT6c`); *Autonomous Database Data Studio Demo* (Oracle, 2023-11-06, `y1khmdbmze4`). Output: `.work/erp-qa/ui-anatomy.md` (704 lines), `video/index.md`, `video/log.md`. Not on any video: Data Analysis's natural-language field (only the 2023 build), Data Insights, Data Load/Connections, and — most important — the AIDP business glossary, ontology terms, synonyms, data products and lineage; those screens, the human review queue and per-row source badges are free design in the Workbench idiom. Three facts for the builder: the chrome is inverted between the products (Data Studio a continuous dark L with a right-aligned search; AIDP a dark bar over a light nav with a centred search); Oracle red is never a button; two builds exist for most surfaces and their colour systems do not mix (Jun-2026 Workbench shell for chrome, Nov-2025 footage for Agent flows and Agent Hub, one Ask Oracle theme per screen).
- **Leg B (data model), done 2026-09-16.** `data.js` 115 KB, `tools/erp-qa-check.js` 267 assertions passing. Deviations from §2–5, all accepted: the freshness stamp is computed per question from its own sources (question 1 → 09:02, NetSuite; question 6 → 08:35, CRM), superseding the "09:28" line in §5; the analyst's answer to question 1 is 5 rows before the fix and 4 after (the Orion JDE record is in North America until it is split); the 25 pending proposals cover 28 records; a documented provisional threshold of 0.85 rolls a proposal up provisionally and flags it, which is what makes "12 rows, one flagged review" true (two other pending scores lowered to 0.84 and 0.83); only 12 of 67 confirmed cross-system clusters answer question 1, because the `HAVING` is on Q3 invoices, not master data; `tbLocal` is the absolute Q3 movement across P&L accounts so mapped + residual = translated; account decisions are logged but do not move the P&L (only the Orion match decision recomputes the band). Additional synthetic figures, all derived in the file (add to §9): duplicate exposure USD 216,410 → 195,320; residual before the refresh USD 1,705,680.62; question 1 spend USD 8.6 M → 7.9 M; rebate entitlement USD 13,539.92 on 5 terms; O2C open value USD 588,250; paid-since USD 315,700; intercompany unmatched gap USD 46,800; top-20 share 30.6 %; 216 golden parties.
