# C — Alex's packaging feedback to Vlad (rules, process, S/M/L model)

_Research file for the packaging-skills build. Read-only pass over: the pasted 2026-07-24 partial transcript, Oracle call notes, the wiki, Vlad's and Alex's OneDrive artifacts, and local Claude Code session transcripts. Status: **COMPLETE** (2026-09-17)._

**Headline finding.** There is almost **no captured record of the Alex↔Vlad coaching** in this repo. The 2026-07-24 partial transcript Alex pasted is the ONLY verbatim source of him coaching Vlad on packaging. Everything else has to be reconstructed from (a) the artifacts on each side of the coaching — Alex's own templates before Vlad, Vlad's output after — and (b) Alex's packaging rules stated in other rooms (Gero session, Oracle syncs) that Vlad's work was measured against. The delta between Alex's Jul-07/Jul-13 artifacts and Vlad's Jul-27 artifact, and then between Vlad's Jul-27 and the Sep-10 pair, is the most reliable evidence of what Alex actually asked for.

---

## 1. Timeline of Alex↔Vlad packaging touchpoints

| Date | Event | Source | Transcribed? | What was reviewed / produced |
|---|---|---|---|---|
| 2026-06-12 | 1:1 with Olha Terendii — "Oracle productization: packages, current customers" | `context/areas/softserve/calls/oracle/2026-06-12_151312_one-on-one_20260612143223E84CB5DA.md` | yes (call note) | **Pre-Vlad.** Alex gathering inputs. Olha's framing — *"a universal product is unrealistic; standardize the engagement process"* — becomes the S/M/L premise. |
| 2026-06-12 | "T-Shirt Packaging approach discussion" | OneDrive `Projects/Oracle/T-Shirt Packaging approach discussion-20260612_093209-Meeting Recording.mp4` (304 MB) | **recording only, never transcribed** | The first packaging-approach meeting. **Ask Alex to export.** |
| 2026-06-15 | Oracle 1:1 — whiteboard S/M/L sketch | `calls/oracle/2026-06-15_200833_one-on-one_…md` → `docs/oracle-packages-tshirt-sizing.md` | yes | First S/M/L sketch (S=PoC/PoV, M=Integration, L=Product). Superseded 06-26. |
| 2026-06-26 | **Gero packaging session** (Oracle × SoftServe) | `calls/oracle/2026-06-26_sales-call_gero-tshirt-packaging.md` + full transcript `docs/2026-06-26_gero-tshirt-packaging-transcript.md` | yes (pasted transcript) | **The S/M/L model's origin.** Co-designed live. See §4. |
| 2026-07-01 | Oracle OCI GenAI PM walkthrough (Puket) | `calls/oracle/2026-07-01_200832_default_…md` | yes | Alex commits to **"a split of standard/productizable vs custom features for the Force Optimization pack"** — the capability-matrix schema. |
| **2026-07-06** | **Intro / onboarding — Vladyslav Butenko** | OneDrive `Recordings/Intro meeting  onboarding Vladyslav Butenko-20260706_142606-Meeting Transcript.mp4` — **609 KB** | recording exists, **not transcribed** (per brief: not attempted) | Vlad's onboarding. **Ask Alex to export the Teams transcript.** |
| 2026-07-07 | `Workforce optimization_productization.xlsx` written | OneDrive `Packs/Workforce optimization package/` | n/a (file) | **Alex's own template**, 3 sheets. Sheet "Matrix for meeting" = the three-lens capability matrix; Sheet1 = the four-axis generalization test; Sheet2 = capability × vertical applicability + "CROSS-VERTICAL EXTENSIONS (my additions)". This is the spec Vlad was handed. |
| 2026-07-13 | `Workforce Optimization - Sales one-pager - Oracle.pdf` + `- Service packages - Oracle.pptx` | OneDrive, same folder | n/a (file) | **Alex's own sales one-pager** — the anatomy every later pack one-pager converges on. See §5. |
| 2026-07-14 | Internal Oracle strategy sync (Alex + a senior peer) | `calls/oracle/2026-07-14_194126_sales-call_…md` | yes | Decides the packaging *order* (Bosch done, Riyadh Air/AI-Q and DHL next) and the "don't build in a vacuum" gate. |
| **2026-07-24** | **"Oracle Productization & BA JumpStart Sync"** (Teams, Alex + Vlad, RU) | `scratchpad/vlad-2026-07-24-transcript-partial.md` — **Alex's paste, PARTIAL** (0:03–0:35 and 27:02–30:52; 26 min missing) | partial | **The only verbatim coaching source.** Reviewing Vlad's 10-step capability/step table for the document-processing case. Rules R1–R7 and the whole of §3 come from here. |
| 2026-07-27 | `[Oracle Packages] Large Document Extraction and Validation - Acceleration Pack One-pager.pdf` | OneDrive `Packs/Large Document Extraction and review package/` | n/a (file) | **Vlad's first pack one-pager** — the direct output of the 07-24 sync ("finish this table … so that we have the table with the contents"). |
| 2026-08-18 | INT Oracle AI Tech SteerCo | `calls/oracle/2026-08-18_124942_default_…md` | yes | **No packaging feedback to Vlad.** Portfolio review only (DHL/NHS/SBG/Belron/Bosch/Sky). |
| 2026-08-27 | Work OS R&D demo (Vlad present) | `calls/jumpstart-pm/2026-08-27_202539_default_pasted-workos-rnd-demo.md` | yes (pasted) | **No packaging feedback.** Only: Alex asks Leonid + Vladyslav for an internal-adoption session. |
| 2026-09-08 | Alex rewrites Vlad's **Work-OS Prerequisites Report** (Payworks) | session `fb1bc804-dfcc-410b-a1bf-6af135c39233.jsonl`, turn 14:47 | yes (his own instructions) | **10 numbered document-edit rules** on a document Vlad wrote. Different document class, but the rules generalize. Rules R12–R19. |
| 2026-09-10 | `AI Signal-Impact Engine - Accelerator One-pager.pdf` + `Intelligent Document Extraction - Sales one-pager` + `- Service packages deck` | OneDrive `Packs/…` | n/a (files) | **Vlad's second wave.** Alex: *"For Large document processing and Account insights I just added additional files from Vlad recently"* (session `deb798ac`, 2026-09-10 21:02). The Account Insights one-pager adds a **4th matrix column — "ARTIFACT TO ACCELERATE THE DEVELOPMENT"** — i.e. Vlad's implementation of Alex's 07-24 "self-acceleration skills" rule. |
| 2026-09-10 | Alex processes the Account Insights one-pager into the wiki | session `99e4dea1`, turn 20:14 | yes | *"DHL-based pack (it has slightly shifted from original idea; working name … Account insights or AI Signal-Impact Engine)"* — no critique text; the critique is in the wiki's "Open loops". |
| 2026-09-15 | Tracker rows dated | OneDrive `Packs/Oracle packages.xlsx` | n/a | *Vlad: check existing materials* (demo videos, both packs) · *Alex: provide HTML to Vlad* (doc-pack one-pager). Both still open. |

**Is `2026-07-30_134222_sales-call_20260724123234A771B64E.md` the same meeting as the pasted transcript? NO.** It is recorded 2026-07-24 12:32:34 EEST, but it is an internal *vendor-team post-mortem* after an executive meeting with Neil / Gero / Hamad — six-plus English-speaking participants, follow-up-list logistics. The pasted transcript is a two-person RU Teams sync between Alex and Vlad about a capability table. **Different meetings on the same day.** The Alex↔Vlad sync was never recorded into the call pipeline.

---

## 2. Alex's feedback rules

Each rule: **verbatim quote** (EN gloss where the source is RU) · source · generalized rule · which of the 13 components / 5 artifacts it governs.

Component shorthand: `C1` app name · `C2` one-liner · `C3` problem↔solution · `C4` ICP · `C5` verticals + vertical framings · `C6` S/M/L table (handling / timeframe / cost per capability) · `C7` required Oracle products · `C8` optional Oracle products · `C9` capabilities→features + customization scope · `C10` high-level architecture · `C11` workflow architecture + HITL · `C12` ROI metrics · `C13` (residual: proof / evidence).
Artifact shorthand: `A1` feature list · `A2` sales deck · `A3` sales one-pager · `A4` interactive demo · `A5` mini-site listing.

### From the 2026-07-24 Alex↔Vlad sync (the only direct coaching source)

**R1 — Every workflow step must be named against the vendor taxonomy, not only against what we built.**
> "And where is this [in their taxonomy]? Isn't that what they call human-in-the-loop exception handling?"
> — Alex, 2026-07-24, 0:03–0:35 (`vlad-2026-07-24-transcript-partial.md`)

*Rule:* when you write a capability or a workflow step, check what the market/vendors call it. A step we named ourselves is a step no buyer can match to their own RFP language. Reconcile our step names with the established vocabulary before the table is final.
*Governs:* C9, C11 · A1, A5.

**R2 — Absence of a case is a finding, not a blank. Name what the system does NOT handle.**
> "We don't do any exception handling now, do we? What do we do with a document if it's such that we expected to see 5 parameters and didn't find them? We don't foresee that case."
> — Alex, 2026-07-24, 0:03–0:35

*Rule:* interrogate every step for the failure path (what happens when the expected thing isn't there). If there is no handling, that is an explicit "not covered" row / an OUT OF SCOPE line — never silence. This is why Vlad's Jul-27 one-pager carries an "Extraction fallback logic" row and a 6-item OUT OF SCOPE block.
*Governs:* C9, C11 · A1, A3.

**R3 — Differentiate every step across the vertical scenarios; the differences are the product.**
> "Now help me generate, for each of the 10 steps, what the specific differences may be across each of the 3 scenarios. E.g. … with fields, there can be specifics: what matters here. … a column 'what matters here', clear correspondence set in advance."
> — Alex, 2026-07-24, 27:02–30:52

*Rule:* a pack is not one workflow — it is one workflow whose steps vary by vertical. Build the step × vertical grid and fill "what matters here" per cell before writing prose. Alex does this himself in Sheet2 of `Workforce optimization_productization.xlsx` (capability blocks × Bosch(HOME) / UTIL / TEL / IND·MED·HT / CON / LOG, scored ● ◐ ○ — ✗ ~).
*Governs:* C5, C9 · A1, A3, A5.

**R4 — Prompt the model for candidate differences, then adjudicate them yourself; the value is the confidence that you covered the space.**
> "Naturally there will be a lot of water and Claude trying to satisfy you and find differences; you then need to figure out which of these are real differences — but then you'll be more confident that you really considered all these different scenarios and generalized enough."
> — Alex, 2026-07-24, 27:02–30:52

*Rule:* generation is for coverage, human judgment is for truth. Never ship the model's differentiation list unfiltered; the deliverable is the adjudicated subset plus the assurance that the space was swept.
*Governs:* all components · every artifact. **This is the core quality gate to encode in the skills.**

**R5 — Run a vendor-taxonomy gap check as a separate, up-front task.**
> "Maybe give it a separate task up front: 'I see it as these steps; look at such-and-such vendors and, based on how they structure their set of capabilities, highlight which steps I'm missing or where there are clearly other tasks.' Most likely it won't do it well unstructured, but it will highlight a gap in what we may have missed."
> — Alex, 2026-07-24, 27:02–30:52

*Rule:* before finalizing the capability list, compare it to how named competitors/vendors structure theirs, purely to surface missing steps. Expect low precision; the output is a gap list, not a structure. Alex's own version is the **"CROSS-VERTICAL EXTENSIONS (my additions)"** block in Sheet2 — 12 rows the Bosch delivery never had (routing & sequencing, real-time traffic, appointment-slot offering, SLA constraints, parts-coupled scheduling, crew jobs, multi-day scheduling, asset/PM-calendar scheduling, labor/overtime/union rules, customer time-window optimization, live OFS write-back vs file batch, subcontractor blending).
*Governs:* C9, C5 · A1.

**R6 — Finish the contents of the table before any formatting.**
> "Let's aim next time to finish this table for sure — maybe except formatting — so that we have the table with the contents. I'd set that as the goal."
> — Alex, 2026-07-24, 27:02–30:52

*Rule:* the feature/capability table is the spine artifact; everything else (deck, one-pager, demo, listing) derives from it. Complete the content first and treat layout as a later, separate pass. **Skill implication: the feature-list skill runs first and its output is the input to the other four.**
*Governs:* C9 (and, through it, all) · A1 before A2/A3/A4/A5.

**R7 — Turn every engagement into self-acceleration skills, named post-factum from the work you actually did.**
> "I urge you to think right away: 'my discovery work de facto consisted of three steps' — I just described post-factum the pattern of what steps the analytical work consisted of. Two of them are probably one skill, the third is another skill — so that's my list of skills, plus two skills as homework… Do it as you go if possible, so that our goal on the way out is, ideally, to give birth from each such [engagement] to self-acceleration skills."
> — Alex, 2026-07-24, 27:02–30:52 (and, at 0:18: "you do discovery, you build some skills, and in parallel you create your own discovery [skills]")

*Rule:* after each engagement, describe post-factum the steps the analytical work consisted of, cluster them into 2–3 skills, and write them. **Vlad demonstrably absorbed this** — the 2026-09-10 Account Insights one-pager adds a fourth matrix column, *"ARTIFACT TO ACCELERATE THE DEVELOPMENT"*, naming 10 reusable assets (feed connector templates · commercial data-source evaluator · internal-system extract validator + grounding profiler · capability scraper · relevance & de-dup skill · opportunity-reasoning prompt library · capability-mapping subagent + service-catalog schema + opportunity drafter · Signal→Opportunity JSON schema · opportunity evaluation harness · CRM export connector).
*Governs:* C9 · A1 — and it is the meta-rule behind this whole skills project.

### From Alex's own packaging templates (what Vlad was handed / measured against)

**R8 — Every capability gets three lenses: what the vendor pack gave us, what we have implemented, what stays custom per engagement.**
> Column headers, `Workforce optimization_productization.xlsx` → sheet "Matrix for meeting" (2026-07-07): *"Area · Category · Features · Initially available in the Oracle accelerator pack · Currently implementation status (by SoftServe) * · Custom work"*, with the legend *"🟣 — currently mostly implemented; improvements needed for configurability and extensibility; ⚪ — not implemented or very trivial implementation"*.

*Rule:* the feature list is a three-lens matrix, not a checklist. The third lens (custom work per engagement) is what turns it into a sellable scope. Vlad reproduced it exactly on 2026-07-27 (`ORACLE PACK · SOFTSERVE STATUS · CUSTOM WORK (PER ENGAGEMENT)` with ● ◐ ○), and extended it with the 4th lens on 2026-09-10.
*Governs:* C9, C7, C8 · A1, A3.

**R9 — Test every delivered feature on four specificity axes before you call it a product feature.**
> Sheet1 column headers, same workbook: *"Bosch specific (can not be used elsewhere)?"* · *"Nvidia cuOpt-specific (not relevant if other 'engine' is used)?"* · *"Workforce optimization-specific? (only relevant to workforce optimization; not relevant to supply-chain, warehouse operations, route / fleet optimization)"* · *"Home / commercial services workforce specific? (Applicable to the industry where Bosch sits in; not applicable to Telco / Manufacturing / med equipment service …)"*

*Rule:* generalization is a graded test with four independent axes — **customer-specific · engine/vendor-specific · use-case-specific · industry-specific**. A feature that fails an axis is not deleted; it is labelled and priced as custom work on that axis. This is the operational meaning of "the generalization is the actual product work".
*Governs:* C5, C9 · A1.

**R10 — The sales one-pager has a fixed anatomy, and it is not the capability matrix.**
> Structure of `Workforce Optimization - Sales one-pager - Oracle.pdf` (Alex, 2026-07-13): banner (`OCI AI ACCELERATORS`) → **app name** → **one-liner** ("Intelligent field-service planning with NVIDIA cuOpt on Oracle OCI: packaged from proof of value to enterprise scale") → **THE PROBLEM** (3 named pains) → **THE SOLUTION: REVIEW THE PLAN, NOT BUILD IT** (3 outcome arrows: Productivity ↑ · Capacity utilization ↑ · Customer wait time ↓, then a mechanism paragraph) → **architecture diagram** (boxes + labelled data flows) → **WHY IT SELLS: FOR ORACLE ACCOUNT TEAMS** (3 reasons in the seller's economics) → **WHERE IT APPLIES** (4 verticals) → **customer proof strip** (3 hard figures + the caveat *"KPIs measured before/after on proof-of-value data; figures are illustrative, not contractual."*) → **SERVICE PACKAGES** (S/M/L × price / infra price / timeline / 6 feature rows scaled ◐ ● ●●) → **CTA + named contact**.

*Rule:* an external pack one-pager must carry problem, solution-with-outcomes, architecture, proof-with-caveat, S/M/L with prices and timelines, the partner's own economics, verticals, and a named human. The Sep-10 large-doc one-pager reproduces this template line for line ("THE SOLUTION: REVIEW THE DATA, NOT TYPE IT"), which is how you can tell the template was handed over and adopted.
*Governs:* C1, C2, C3, C5, C6, C10, C12 · A3 (and A2, A5 derive from it).

**R11 — Solution headline is a "do X, not Y" reframe of the human's job.**
> "THE SOLUTION: **REVIEW THE PLAN, NOT BUILD IT**" (WfO, 2026-07-13) → "THE SOLUTION: **REVIEW THE DATA, NOT TYPE IT**" (Large Docs, 2026-09-10).

*Rule:* state the solution as the change in what the person does, in their words — not as the technology. Pairs with the standing `CLAUDE.md` rule that marketing headlines "state the job and the outcome in the reader's words, never the counts, taxonomy or packaging vocabulary".
*Governs:* C2, C3 · A2, A3, A5.

**R11a — …but the packaging tagline is NOT a product one-liner. Alex later rejected his own.**
> "Product's one liners: **'packaged from proof of value to enterprise scale.' and alike things don't fit as a good product one-liner**"
> — Alex, mini-site v1 review, 2026-09-14 20:13 (sessions `1c41e081` / `61c039ec`)

*Rule:* the one-liner (C2) says what the product does for the buyer. The S/M/L packaging promise ("from proof of value to enterprise scale") is *sales scaffolding* and must not occupy the one-liner slot — even though Alex's own Jul-13 and Sep-10 one-pagers both do exactly that. **The skills should generate a C2 that survives this test.**
*Governs:* C2 · A2, A3, A5.

**R11b — Don't mix features with architectural layers in one block.**
> "Solution stack — rethink the name of the block; I'm worried it mixes features with architectural layers; maybe layers should go into architecture (and you may actually visualize them as layers), while 2nd block could be 'features' (or similar?), which gives structured feature list + maybe how it runs folds inside"
> — Alex, mini-site v1 review, 2026-09-14 20:13

*Rule:* C9 (capabilities→features) and C10 (architecture layers) are separate artifacts with separate blocks. Layers get visualized as layers; features get a structured list. A block that does both is wrong.
*Governs:* C9 vs C10 · A2, A3, A5.

### From Alex's 2026-09-08 rewrite of Vlad's Work-OS Prerequisites Report (different document class, generalizable)

Source for all of these: session `fb1bc804-dfcc-410b-a1bf-6af135c39233.jsonl`, user turn 2026-09-08 14:47. Framing: *"Here are my changes — please apply them thoroughly, ask me where unclear. Other than that, keep the report as is."*

**R12 — Cut anything untested or out of scope.**
> "Remove analytics block as it was not tested / was out of scope (3.2)"

*Rule:* a delivered document may not carry a capability the engagement never tested. → C9 ("current status" must be evidence-backed), A1/A3.

**R13 — Don't state more precision than you can vouch for; state status, not contents.**
> "do not specify what is filled as it doesn't cover everything and sets expectations that what's listed as filled in is filled in correctly which might be wrong; specify just whether it's Filled / Partially filled / Not filled (one field) and Verified by Payworks / not verified."

*Rule:* replace an itemized claim you can't guarantee with a graded status plus a verification flag. This is the same instinct as the ● ◐ ○ legends and the "figures are illustrative, not contractual" caveat. → C9, C12 · A1, A3.

**R14 — Remove columns that push our work onto the reader.**
> "I would remove the Payworks source / Payworks source to provide column"

*Rule:* a client-facing artifact does not carry an internal to-do column addressed at the client. → A1, A3, A5.

**R15 — Say a shared thing once, and scope exactly which part is for the reader.**
> "Do not include Claude.md file in each block — just in business context. In description make sure it reflects its general nature and that just a portion of it is to be reviewed … Make sure that it is delivered concisely."

*Rule:* repetition across blocks is noise; name the shared asset once and bound the reader's job inside it. → C9 · A1.

**R16 — Structure the document the way the product is structured.**
> "Let's structure the section 3 as sections are structured in the most recent Work OS mini app page: Strategic context … Product map … Initiatives …"

*Rule:* the document's information architecture mirrors the product's own, so the reader can map document → screen. Strong constraint for the mini-site listing and the demo: one information model across all five artifacts. → C9, C11 · A1, A4, A5.

**R17 — When restructuring someone else's document, confirm before adding or dropping entries.**
> "If this regrouping removes something from Vlad's document or adds new entries or raises questions — confirm with me first, then proceed."

*Rule:* a re-cut of an author's document is allowed to re-shape, not to silently change the content set. Directly relevant to the skills: the packaging skills must surface add/drop diffs rather than absorb them. → all artifacts.

**R18 — Delete anything that blurs a message we already delivered elsewhere.**
> "I would remove 'Payworks readiness snapshot & priority actions' as it blurs our other communication where we already made some highlights."

*Rule:* one artifact, one message; don't restate a judgment that another channel already owns. → A2, A3, A5.

**R19 — Add a "how to use this" block with literal worked examples.**
> "I would add a highlight block above all the tables … that would emphasize that customization and changes to files are strongly recommended to be done not manually to the files, but through the chat with claude (give examples: 'here is my segmentation matrix, pls use it to update your segmentation files…' or 'change our current ARR to 200M everywhere in main context files' …)"

*Rule:* where the reader will have to act, give them the exact phrasing, not the principle. → A4, A5.

**R20 — Page budget is a real constraint, and voice fidelity is the acceptance test.**
> "cut last page with 'sources analyzed' so that it's minus 1 page." · "Make them closer to my sentences" (both 2026-09-08).

*Rule:* hold a stated page count by cutting the least load-bearing section; and when the author's own sentences exist, the rewrite converges on them rather than on the model's phrasing. → all artifacts.

### From the packaging rooms Vlad's work was measured against (Gero session, Oracle syncs)

**R21 — Tiers correlate to level of integration, not to feature count.**
> "Almost like a menu… so even the most lazy account executive can explain it." — Gero, 2026-06-26

*Rule:* S/M/L is an integration-depth ladder that a non-technical seller can recite. → C6 · A2, A3, A5.

**R22 — Never label the top tier "hardening".**
> "I would not put anything in the right bucket where people are like, hold on, what do you mean you hardened it? What is it before?" — Gero, 2026-06-26

*Rule:* production hardening is included in L but stays implicit; L is sold as telemetry + local tailoring. → C6.

**R23 — S and L are optional; the path is a choice, not a staircase.**
> "S and L are optional / color-coded. A fully-bought-in customer can skip the POC and go straight to M; a budget-constrained customer with a uniform global process may not need L." — call note, 2026-06-26

*Rule:* the tier table must sell three entry points, not one sequence. → C6.

**R24 — Don't build packaging in a vacuum.**
> "В вакууме просто что-то фигачить, бессмысленно." ("Just hammering something out in a vacuum is pointless.") — Alex, 2026-07-14

*Rule:* packaging investment is gated on real partner/market pull; reactive productization of delivered cases first. → project-level gate on all five artifacts.

**R25 — Standardize the engagement, not the software.**
> "a universal product is unrealistic; the realistic play is standardizing the *engagement process* — fixed-scope … POC packages." — Olha's framing, 2026-06-12, adopted into the wiki

*Rule:* the unit of productization is a scoped engagement with a price and a timeline, not a product SKU. → C6, C9.

**R26 — Some cases stay opportunistic; not everything is packageable.**
> "I just don't think you could package cuOpt because it's an optimizer… On the other side, if everyone is doing the same optimization on the same underlying parameters in FSM, maybe." — Gero, 2026-06-26. And: complex/variable cases (airline contract analysis / Riyadh Air, construction/media VSS) *"stay opportunistic"*.

*Rule:* the packaging skill must be able to conclude "this is not a pack" and say why (variability of the underlying systems, KPI promise differing per case). Note the irony worth flagging to Alex: **Riyadh Air was the case Gero explicitly parked as unpackageable on 2026-06-26, and it became pack 2 anyway** — so the criterion moved, and the skills should ask what changed.
*Governs:* the go/no-go step before C1.

### From `SS-work split + packaging.xlsx` — the per-capability × phase packaging sheets

Source for R27–R29: `/Users/olekorlov/Library/CloudStorage/OneDrive-SoftServe,Inc/Projects/Oracle/Packs/Use case maps/SoftServe-NVIDIA-Productization Use cases-Pipeline_Oracle solutions — SS-work split + packaging.xlsx`, sheets **"Pkg — Workforce scheduling"** and **"Pkg — Doc processing"**. Header of the second: *"Per-use-case package scope by phase. Sources: SS-work split (row 12) · Riyadh Post-PoC backlog · AI-Q SoWs · EMEA S/M/L package model."* **This is the most complete existing instance of component C6 and it is the one to model the skill on.**

**R27 — Package scope is bounded by counted allowances, each with worked examples.**
> "Up to **5** non-native business rules, i.e.: - within-day job reassignment; - part-time availability; - job / group-level assignment approval"
> "Up to **10** custom KPIs & reports, i.e.: - utilization by filter criteria; - rule-impact on utilization; - decision summary page"
> "Up to **4** essential data integrations: ➡️ work orders & scheduling demand; ⬅️ field service / WFM (OFS-class); ⬅️ HR payroll; ⬅️ BI tools"
> "Up to **5** custom access roles" · "Up to **3** new contract types / languages, i.e.: - cargo handling; - catering / fuel; - Arabic"
> — Phase-2 (M) cells, both Pkg sheets

*Rule:* every tier cell that could be open-ended gets a **number plus 2–3 concrete "i.e." examples** — never a qualitative promise. The number is the commercial boundary; the examples make it legible to a seller. Directions are marked: **➡️ read-in · ⬅️ write-out**.
*Governs:* C6, C9 · A1, A2, A3.

**R28 — The custom work is decomposed by delivery layer, not by feature.**
> Row axis of both Pkg sheets: **Discovery · Infra/platform wiring · Configuration · UI · Business logic · Analytics · AI pipeline · Integrations · Access rights · Observability · Roll-out · Duration · Pricing.**
> And in the `Roadmap × pipeline` sheet, every custom-work cell is written as: *"• Discovery / • UI: … / • Backend: … / • AI pipeline: … / • Configuration: …"* then *"• Integrations: … / • Roll-out"*.

*Rule:* scope per tier is expressed on a fixed layer taxonomy so two packs are comparable and nothing is forgotten. `X` is written explicitly where a layer carries no work.
*Governs:* C6, C9, C10, C11 · A1.

**R29 — Price and duration are sourced from real SoWs, and the first customer is excluded from the package math.**
> Doc-processing sheet: *"Fixed-price PoC ~**€165–200k** (Riyadh 10 wks; **DHL €192.5k · NHS €198.5k · KPN €164.9k**; often MDF-funded)"* · *"Consumption (OCI + NVAIE + GPU) ~**€0.5–2.1M/yr** at production scale (AI-Q SoW sizing: KPN €0.48M · NHS €1.32M · DHL €2.1M)"* · *"Capacity-POD; scales with # stations / contract types (multi-year)"*
> Footnotes on both sheets: *"\* Applicable for customers who go live **after** Riyadh Air / Bosch — Riyadh's / Bosch's SOW is more extensive as the AI accelerator pack is **built along the way**. \*\* **Critical customer feature requests may fall outside the package framing.**"*
> And: *"PoC = fixed-price SoW (often MDF-funded). M/L priced by delivery-capacity PODs (phased), **not a single tag** — per SI practice. Run cost = OCI + NVIDIA AI Enterprise + GPU consumption (client-paid). **Figures indicative, ex-VAT; first-of-kind PoCs compress as the pack matures.**"*

*Rule:* derive tier prices from the actual signed SoWs in the pipeline, show the range and the constituent deals, separate **services (fixed / POD)** from **consumption (client-paid)**, and carry two standing caveats — the pilot customer's SoW is bigger than the package because the pack was built during it, and a package framing does not bind critical feature requests.
*Governs:* C6, C12 · A2, A3, A5.

---

## 3. The packaging PROCESS Alex prescribed

Reconstructed as a numbered procedure. Steps 3–6 are his explicit **"three-step process"** (his words) plus the up-front gap task he appended; the rest is the surrounding scaffolding from his own artifacts.

0. **Gate:** is there real partner/market pull for this pack, or are we building in a vacuum? (R24) Is this case packageable at all, or does it stay opportunistic? (R26)
1. **Start from one delivered or live engagement.** Every pack derives from a real PoC (WfO ← Bosch · Large docs ← Riyadh Air · Account Insights ← DHL). *The generalization past that customer is the actual product work.*
2. **Enumerate the workflow as N steps** (Vlad's document case ran to 10) and, for each step, fill the three lenses: what the vendor pack provided · what we implemented · what stays custom per engagement (R8).
3. **Up-front vendor-taxonomy gap task** (run this BEFORE the differentiation pass, as its own prompt): *"I see it as these steps; look at such-and-such vendors and, based on how they structure their set of capabilities, highlight which steps I'm missing or where there are clearly other tasks."* Expect noise; harvest only the gaps (R5, R1).
4. **Differentiation pass across the vertical scenarios:** *"for each of the N steps, what the specific differences may be across each of the 3 scenarios"*, with a **"what matters here"** column per cell and the correspondence set defined in advance (R3).
5. **Widen the prompt deliberately:** *"here are the N steps; I see examples of differences like this — in contracts with vendors this matters, here it doesn't — develop the theme and think where else there may be differences"* (R3/R4).
6. **Adjudicate.** Sort the generated differences into real vs. filler yourself. The payoff is not the list — it is the justified confidence that the scenario space was swept and the generalization is wide enough (R4).
7. **Interrogate every step for its failure path** — what happens when the expected thing isn't there? No handling = an explicit "not covered" row and an OUT OF SCOPE line (R2).
8. **Run the four-axis specificity test** on every feature: customer-specific · engine-specific · use-case-specific · industry-specific (R9). Label, don't delete.
9. **Add the cross-vertical extensions** the delivered case never had, from the market taxonomy (R5) — Alex's own sheet labels this block "(my additions)".
10. **Finish the table's CONTENTS. Formatting is a separate, later pass** (R6). The completed table is the spine; the deck, one-pager, demo and listing all derive from it.
10a. **Build the per-capability × phase packaging sheet** on the fixed layer taxonomy (R28), with counted allowances and worked examples in every open-ended cell (R27), and prices/durations sourced from the real SoWs in the pipeline (R29). This is component C6 and it lives *between* the feature table and the external artifacts.
11. **Derive the external artifacts** on the fixed one-pager anatomy (R10, R11), with the S/M/L tier table on integration depth (R21–R23) and every figure caveated (R13). Keep features and architecture layers in separate blocks (R11b); do not let the packaging tagline become the one-liner (R11a).
12. **Close the loop: name the skills.** Describe post-factum the steps the analytical work actually consisted of, cluster them into 2–3 self-acceleration skills, write them as you go, and name in the artifact itself which reusable asset would accelerate each capability (R7).

---

## 4. The S/M/L model (PoV / Integration / Scaling)

### Origin and ownership
- **2026-06-15 (SoftServe internal whiteboard, superseded):** S = PoC/PoV (business + operational KPI check, "you give us data and we prove the value", per use case) · M = Integration (OFS, SCM&OTM, AltraDocs, Fusion apps component-wise; e.g. 5,000 users as a limit) · L = **Product** (advanced AI telemetry, tailoring to local-market needs, tech hardening "between the lines"). Source: `context/areas/softserve/docs/oracle-packages-tshirt-sizing.md`.
- **2026-06-26 (Gero session — authoritative):** co-designed live with Gero Gunkel (Oracle). SoftServe's internal S/M/XL sketch matched almost exactly ("convergence confirmed"). L renamed **Scale**.

### The tiers as settled

| | **S — PoV / POC ("Test")** | **M — Integration ("Pilot") / Roll-out** | **L — Scaling** |
|---|---|---|---|
| Marketing label (Gero) | "Proving AI value" | "Delivering real business impact" | "Scaling the impact" |
| Scope | "You give us data, we prove value on your data." **Zero integration**, separate/test env, possibly test data. Fixed scope. Per use case. | **Live, fully-integrated MVP** (e.g. into Field Service Management via API). **~1–2 API integrations** for data ingestion (+ optional client auth/security: Okta, API gateway). **~1–2 key markets / ~500 users**. | Many markets (e.g. 15); **local customizations** (e.g. France labor rules); **advanced AI telemetry**. Production hardening included but **never labelled**. |
| Duration (Gero, 06-26) | ~6–10 weeks | — | — |
| Price (Gero, 06-26) | ~$100K | — | — |
| **WfO one-pager (Alex, 2026-07-13)** | services **€90K** one-time · infra **€4K/month** · **2 months** | services **€300–500K** · infra **~€25K/month*** · **3–5 months** | **to be defined** · **3–12 months** |
| **Large docs one-pager (2026-09-10)** | services **€75K** · infra **€0** · **2 months** | services **€300–500K** · infra **~€10K/month*** · **3–5 months** | to be defined · **3–12 months** |
| Feature rows scale | ◐ partial | ● included | ●● multi-region / multi-type / advanced |

\* infra price indicative, depends on usage / volume / rule complexity.

### In/out rules and who decided what
- **Tiers correlate to level of integration, not feature count** — Gero (R21).
- **"Almost like a menu… so even the most lazy account executive can explain it"** — Gero; the model is a quasi-rate-card for the AE.
- **S and L are optional, colour-coded** — Gero. Big-wallet: S→M→L. Bought-in: straight to M. Uniform-global-process: no L (R23).
- **"Integration" ≠ a native UI inside OFS** — that needs Oracle's product team and its own roadmap. M means a **background data exchange via existing OFS APIs** — Gero.
- **Hardening stays implicit in L** (R22) — Gero.
- **Anchor everything to Oracle Fusion Apps first** — Gero: with Fusion the workflow API endpoints are known by definition (no requirement engineering), Fusion reps have a warm path to the app owner, and reps are compensated on OCI consumption. **Bosch / OFS is "step zero"**: *"if we can't make it work for this Bosch use case, we might as well stop."* Then extend to SCM/OTM — packageable "almost without having done it" because the endpoints are known.
- **Complex/variable cases stay opportunistic** — Gero named airline contract analysis ("RIAD" / Riyadh Air, AI-Q) and construction/media VSS. (See the irony flagged in R26.)
- **Reference points Gero owed:** CSS "Activate AI" packages (with the caveat they are ~10× simpler — Fusion feature activation, very low outcome uncertainty; *"SoftServe's packages will need more caveats and colour"*) and AIDP professional-services pricing (~$200–300K for a 6-month pilot).
- **Structure Gero asked for:** *"~3 slides per shared solution (e.g. AI Assistant) tailorable by vertical … + more specific vertical cases"* — an early statement of the vertical-framing component (C5).
- **Later drift worth noting:** **Account Insights has no S/M/L at all.** Its section-deck block is reframed as **"WHAT THE POC BUYS"** (PoC · 12 weeks · €192.5K, with IN / NOT IN SCOPE lists) rather than inventing indicative tiers — Alex chose honest absence over a fabricated tier table (`oracle-packs.md`). **The skills must allow a pack to have no S/M/L.**

### The working model is SIX columns, not three — `SS-work split + packaging.xlsx`

The one-pagers publish three tiers, but Alex's internal packaging sheets (`Pkg — Workforce scheduling`, `Pkg — Doc processing`) run six columns, and the extra three are where most of the scope actually lives:

| Column | Label as written |
|---|---|
| 0 | **OCI AI accelerator pack / OOTB** — what the Oracle/NVIDIA pack gives before anyone bills a day |
| 1 | **Phase 1: Proof of Value** *(aka "S-package" / **"Spark"**)* |
| 2 | **Phase 2: Limited roll-out** *(aka "M-package" / **"Scale"**, "Integration")* |
| 3 | **Phase 3: Scaling** *(aka "L-package" / **"Lighthouse"**)* |
| 4 | **Customer COE setup** — enablement: OCI + NVIDIA platform training & certification; custom-solution training (architecture, rules/prompts, ops); AI operating model, governance & intake/prioritization; knowledge transfer + runbooks → customer self-extends |
| 5 | **Managed service** — SLA support & incident response; monitoring & health ops; rules/model maintenance & re-tuning; platform & pack version upgrades; periodic accuracy/KPI review & cost optimization |

**Row axis (the layer taxonomy, R28):** Discovery · Infra/platform wiring · Configuration · UI · Business logic · Analytics · AI pipeline · Integrations · Access rights · Observability · Roll-out · **Duration** · **Pricing**.

**Durations here differ from the published one-pagers** — worth resolving before the skills bake either in:

| | OOTB | S / Spark | M / Scale | L / Lighthouse | COE | Managed |
|---|---|---|---|---|---|---|
| Packaging sheet | self-service (hours–days) | **1–3 months** | **4–12 months** | **12–36 months** | ~2–6 weeks (or ongoing program) | ongoing, annual renewable |
| Published one-pagers (WfO 07-13, Large docs 09-10) | — | **2 months** | **3–5 months** | **3–12 months** | — | — |

Attribution of the sheet durations, as written on it: *"SoftServe EMEA **'Journey to Agentic Enterprise'** S/M/L packages — Spark 1–3 mo · Scale 4–12 mo · Lighthouse 12–36 mo."* — i.e. the tier names and durations are inherited from an existing SoftServe EMEA package model, not invented for Oracle.

**Pricing rows:** S = *fixed-price SoW (often MDF-funded)* · M/L = *delivery-capacity PODs (phased), **not a single tag*** · COE = *fixed-price enablement bundle* · Managed = *annual retainer + consumption* · plus a separate **consumption** row (OCI + NVIDIA AI Enterprise + GPU, client-paid).

---

## 5. What Vlad produced vs. what Alex's artifacts contain — the rulebook delta

### Vlad's `[Oracle Packages] Large Document Extraction and Validation - Acceleration Pack One-pager.pdf` (2026-07-27)
Structure, in order:
1. Banner: `SOFTSERVE × ORACLE · OCI AI ACCELERATORS · NVIDIA AI-Q`
2. Title (C1)
3. **Scope** — one dense prose paragraph: what the pack does, step by step, ending *"It is a decision-support system: all output is human-validated before downstream use."* (C11 HITL, embedded in prose)
4. **Verticals** — 4 numbered, each with 2 worked "For example:" framings (aviation ground-handling · legal & commercial contracts · insurance policies & claims · financial & regulatory filings) (C5, well done)
5. **About this matrix** — states the three lenses and their purpose: *"Use it to decide which capabilities become part of the product and which stay custom per engagement."*
6. **Legend** (● ◐ ○ for each of two lenses)
7. **Capability matrix** — 22 rows, `AREA · CATEGORY · FEATURE · ORACLE PACK · SOFTSERVE STATUS · CUSTOM WORK (PER ENGAGEMENT)`, grouped: Document upload & preprocessing · Extraction pipeline · Data model · Review & human-in-the-loop · Export & output · Post-processing · Platform & infrastructure · Integrations (C9, C7/C8 partially)
8. **Use-case boundaries** — IN SCOPE (3) / OUT OF SCOPE (6) (C11 boundary)
9. **POC PROCESS FLOW** — a diagram (no extractable text) (C11)

### What Alex's own `Workforce Optimization - Sales one-pager` (2026-07-13) has that Vlad's 07-27 does NOT
| Missing from Vlad's Jul-27 | In Alex's Jul-13 | Component |
|---|---|---|
| **One-liner positioning line** | "Intelligent field-service planning with NVIDIA cuOpt on Oracle OCI: packaged from proof of value to enterprise scale." | C2 |
| **THE PROBLEM** — the buyer's pain, 3 named items with figures | "Suboptimal efficiency… Lower customer satisfaction… Poor scalability: planning hinges on scarce senior dispatchers" | C3 |
| **THE SOLUTION as a job reframe + outcome arrows** | "REVIEW THE PLAN, NOT BUILD IT" · Productivity ↑ · Capacity utilization ↑ · Customer wait time ↓ | C2, C3, C12 |
| **High-level architecture diagram** with labelled data flows | OFS ↔ Workforce Optimization app ↔ NVIDIA cuOpt on OCI dedicated AI cluster | C10 |
| **Customer proof strip** — 3 hard figures + the "illustrative, not contractual" caveat | ~30 min (from ~2 days) · up to +26% productivity · €190K/month avoided staffing | C12, C13 |
| **S/M/L service packages table** — price, infra price, timeline, 6 feature rows scaled ◐ ● ●● | €90K/€4K/2mo · €300–500K/~€25K/3–5mo · TBD/3–12mo | **C6 — the single biggest gap** |
| **"WHY IT SELLS: FOR ORACLE ACCOUNT TEAMS"** — the partner's own economics | OFS cross-sell, net-new OCI consumption, repeatable | (partner motive; not in the 13 — **candidate 14th component**) |
| **Named human + CTA** | "See the fit in one of your accounts?" → Karsten Tramborg, Alliances & Partnerships Director | C13 |

**And what Vlad's has that Alex's does not:** the **three-lens capability matrix at row level** (Alex's lives in the xlsx, not on the one-pager), the **explicit IN/OUT scope block**, and the **PoC process flow**. These are the internal-scoping half.

**Where the "10 steps" of the 2026-07-24 sync came from.** `…/Customers/RiyahdAir/NEW_Architecture Vision - Riyadh Air v3.docx` (delivery doc, §8 "AI Extraction Pipeline") defines the page-routed modular pipeline as **Pass 0: Classify · Pass 1b: Continuation verify · Pass 2: Extract · Pass 3: Enrich · Pass 4: Confidence · Pass 5: Coverage audit**, plus §8.2 *Prompt Design Principles* and §8.3 *Two-Layer JSON Schema*; §3 User Journey, §4 Major Solution Components, §5 PoC UI Concept, §6.4 Out of Scope, §7 Solution Architecture. The step table Alex and Vlad were arguing over ("human in the loop… decisioning… and validation — what is that, the one after human-in-the-loop?") is the generalization of this delivered pipeline — **which is the process in miniature: delivery architecture doc → generalized step list → capability matrix → packaging sheet → external artifacts.**

### Reading of the delta
Vlad's Jul-27 artifact is an **internal scoping document wearing a one-pager's clothes** — it answers "what is product vs. custom" (Alex's actual 07-24 assignment: *finish the table*) but not "why would anyone buy this". It is, correctly, step 10 of the process and not step 11. **The Sep-10 pair closes the gap by splitting the job into two documents:**
- `Intelligent Document Extraction - Sales one-pager - Oracle.pdf` — reproduces Alex's WfO anatomy line for line, including the headline pattern ("THE SOLUTION: **REVIEW THE DATA, NOT TYPE IT**"), the architecture diagram, the Riyadh Air proof strip with the same caveat wording, real S/M/L prices (€75K / €300–500K / TBD) and the "why it sells for Oracle account teams" block.
- `AI Signal-Impact Engine - Accelerator One-pager.pdf` — keeps Vlad's internal anatomy (Scope · Where it applies · three-lens matrix · IN/OUT scope) and **adds the fourth lens, "ARTIFACT TO ACCELERATE THE DEVELOPMENT"**.

**So the rulebook for "what a pack one-pager must have" is two documents, not one:**
- **Internal / scoping one-pager** (Vlad's anatomy): scope prose with HITL · verticals with worked examples · three-lens (now four-lens) capability matrix · IN/OUT scope · PoC process flow.
- **External / sales one-pager** (Alex's anatomy): banner · name · one-liner · problem · solution-as-job-reframe with outcome arrows · architecture diagram · proof strip with caveat · S/M/L with prices and timelines · why-it-sells-for-the-partner · verticals · named CTA.
A pack is complete when both exist and agree.

---

## 6. Gaps — what has no transcript here, and what to ask Alex to export

**Syncs with no transcript in this repo:**
1. **The 2026-07-24 "Oracle Productization & BA JumpStart Sync" itself is only 30% captured** — Alex pasted 0:03–0:35 and 27:02–30:52; **26 minutes (0:35–27:02) are missing**, and that is exactly the stretch where he walked the 10-step table with Vlad. *Highest-value export.*
2. **`Intro meeting  onboarding Vladyslav Butenko-20260706_142606-Meeting Transcript.mp4`** — OneDrive `Recordings/`, **609 KB** (a transcript-render video, not a full recording). Exists; not transcribed here (per instruction). Ask Alex for the Teams `.vtt`/`.docx` transcript.
3. **`T-Shirt Packaging approach discussion-20260612_093209-Meeting Recording.mp4`** — OneDrive `Projects/Oracle/`, **304 MB**. The first packaging-approach meeting; never transcribed.
4. **`Current Team's projects scope for potential productization-20260701_113802-Meeting Recording.mp4`** — OneDrive `Recordings/`, **414 MB**. This one *is* covered by the 2026-07-01 call note; no export needed.
5. **`Large Document Extraction and Validation Demo.mp4`** — OneDrive `Customers/RiyahdAir/`, **159 MB**, 2026-09-15. Unnarrated per the wiki, but worth confirming.
6. **Every other Alex↔Vlad weekly sync.** The pasted transcript implies a recurring cadence ("let's aim next time…", "next time: you do discovery…"), but **no sync after 2026-07-24 appears anywhere** — not in `calls/oracle/`, not in `calls/jumpstart-pm/`, not in the local session transcripts. The Teams recordings sit on SharePoint and the `ms365` MCP is **not logged in in this session**.

**Full OneDrive recording inventory (so Alex can pick):** the only Oracle/Vlad-relevant items in `OneDrive-SoftServe,Inc/Recordings/` are the Butenko onboarding (609 KB, 2026-07-06), *Current Team's projects scope for potential productization* (414 MB, 2026-07-01), *Oleg / Alex sync* (294 MB, 2026-06-23), three *Oracle partnership next steps — Neil meeting prep* fragments (2026-07-11), *Payworks — PM Jumpstart program — sync* (190 MB, 2026-07-27) and *SBG discussion* (65 MB, 2026-08-20); plus *T-Shirt Packaging approach discussion* (304 MB, 2026-06-12) directly under `Projects/Oracle/`. **No recording of any Alex↔Vlad packaging sync is on this disk** — they are SharePoint-only.

**Ask Alex to export, in priority order:**
1. The **full** 2026-07-24 Teams transcript (the missing 26 minutes).
2. Every subsequent "Oracle Productization & BA JumpStart Sync" occurrence (recurring Teams series) — the 2026-08-xx and 2026-09-xx instances, where the Account Insights pack and the Sep-10 artifacts were reviewed.
3. The 2026-07-06 Butenko onboarding transcript.
4. The 2026-06-12 "T-Shirt Packaging approach discussion" recording.
5. Any Teams chat with Vlad carrying written feedback on the Jul-27 and Sep-10 one-pagers (chat, not meetings — the tracker's *"Alex: provide HTML to Vlad"* suggests a written channel exists).

**Other gaps / open questions for Alex:**
- **`context/areas/softserve/oracle-team.md` has no Vlad entry at all**, and `oracle-packs.md` says *"Vlad (inferred: Vlad Selyotkin or Vladyslav Butenko — **not disambiguated in the tracker**)"*. Confirm which Vlad owns the pack demo videos, then fix the wiki. The evidence here (Alex's 2026-09-10 turn: *"For Large document processing and Account insights I just added additional files from Vlad recently"*, plus the 2026-09-08 *"the report Vlad prepared"* for Payworks) points to **Butenko** for the packaging and Payworks work.
- **Who wrote the Sep-10 large-doc sales one-pager and service-packages deck** — Vlad, Alex, or a session? It reproduces Alex's template exactly; the tracker still shows *"Alex: provide HTML to Vlad"*, so the handover may be mid-flight.
- **Riyadh Air was parked as unpackageable by Gero on 2026-06-26 and became pack 2 anyway.** What changed? The answer is a criterion the go/no-go skill needs.
- **Is "why it sells for the partner" a 14th component?** It appears in both external one-pagers and in none of the 13.
- **Alex's `interactive-demo-playbook.md` and the 2026-09-15/16/17 demo reviews are a much richer, better-captured feedback corpus than the Vlad thread** — for the demo artifact (A4), the rules are already written down in `.claude/references/interactive-demo-playbook.md` and in `oracle-packs.md` § Decisions. Do not re-derive them from here.

---

### Source files consulted (absolute paths)
- `/private/tmp/claude-502/-Users-olekorlov-Documents-GitHub-AO-Personal-OS/36510c6c-a29a-49a1-a75e-5e2290081ee1/scratchpad/vlad-2026-07-24-transcript-partial.md`
- `/Users/olekorlov/Documents/GitHub/AO-Personal-OS/context/areas/softserve/calls/oracle/2026-06-12_151312_one-on-one_20260612143223E84CB5DA.md`
- `/Users/olekorlov/Documents/GitHub/AO-Personal-OS/context/areas/softserve/calls/oracle/2026-06-26_sales-call_gero-tshirt-packaging.md`
- `/Users/olekorlov/Documents/GitHub/AO-Personal-OS/context/areas/softserve/docs/oracle-packages-tshirt-sizing.md`
- `/Users/olekorlov/Documents/GitHub/AO-Personal-OS/context/areas/softserve/docs/2026-06-26_gero-tshirt-packaging-transcript.md`
- `/Users/olekorlov/Documents/GitHub/AO-Personal-OS/context/areas/softserve/calls/oracle/2026-07-01_200832_default_20260701190225719D2348.md`
- `/Users/olekorlov/Documents/GitHub/AO-Personal-OS/context/areas/softserve/calls/oracle/2026-07-14_194126_sales-call_202607141106438F5F7917.md`
- `/Users/olekorlov/Documents/GitHub/AO-Personal-OS/context/areas/softserve/calls/oracle/2026-07-30_134222_sales-call_20260724123234A771B64E.md` (NOT the Vlad sync)
- `/Users/olekorlov/Documents/GitHub/AO-Personal-OS/context/areas/softserve/calls/oracle/2026-07-30_141406_sales-call_20260728150352C40DCE8E.md`
- `/Users/olekorlov/Documents/GitHub/AO-Personal-OS/context/areas/softserve/calls/oracle/2026-08-18_124942_default_202608181205216609E8E0.md`
- `/Users/olekorlov/Documents/GitHub/AO-Personal-OS/context/areas/softserve/calls/jumpstart-pm/2026-08-27_202539_default_pasted-workos-rnd-demo.md`
- `/Users/olekorlov/Documents/GitHub/AO-Personal-OS/context/areas/softserve/oracle-packs.md` · `oracle.md` · `oracle-team.md`
- `/Users/olekorlov/Library/CloudStorage/OneDrive-SoftServe,Inc/Projects/Oracle/Packs/Workforce optimization package/Workforce optimization_productization.xlsx`
- `…/Packs/Workforce optimization package/Workforce Optimization - Sales one-pager - Oracle.pdf`
- `…/Packs/Large Document Extraction and review package/[Oracle Packages] Large Document Extraction and Validation - Acceleration Pack One-pager.pdf`
- `…/Packs/Large Document Extraction and review package/Intelligent Document Extraction - Sales one-pager - Oracle.pdf`
- `…/Packs/Account Insights/AI Signal-Impact Engine - Accelerator One-pager.pdf`
- `…/Packs/Use case maps/SoftServe-NVIDIA-Productization Use cases-Pipeline_Oracle solutions — SS-work split + packaging.xlsx` (5 sheets: `Roadmap × pipeline` · `Short version` · `Oracle AI Accelerator Packs` · `Pkg — Workforce scheduling` · `Pkg — Doc processing`) — **the single most useful existing artifact for component C6**
- `…/Customers/DHL/UC #6 DHL Client Compass - #2.docx`
- `…/Customers/RiyahdAir/RiyadhAir_AI-Q_case_slides.pptx`
- `/Users/olekorlov/.claude/projects/-Users-olekorlov-Documents-GitHub-AO-Personal-OS/fb1bc804-dfcc-410b-a1bf-6af135c39233.jsonl` (2026-09-08) · `99e4dea1-…jsonl` (2026-09-10) · `deb798ac-…jsonl` (2026-09-10)
- Extracted text: `…/scratchpad/C-work/*.txt`
