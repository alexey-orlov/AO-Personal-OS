# Oracle accelerator packs — productization

_status: three packs in flight against Alex's Q3 OKR ("3 packages ready"). **Workforce Optimization** — deck + one-pager done, feature list due 15 Sep. **Large Document Extraction and Validation** — sales one-pager + 10-slide service-packages deck built 2026-09-10, with real S/M/L pricing. **AI Signal-Impact Engine / Account Insights** — one-pager built 2026-09-10, every other artifact still open. New end-state per pack: an **Oracle Marketplace listing**._
_updated: 2026-09-10_
_source files: SoftServe OneDrive `Projects/Oracle/Packs/` → [registry](../../_meta/external-sources.md)_

## Snapshot

- **What this is:** turning the NVIDIA-built Oracle accelerator packs (AIQ / cuOpt / VSS) plus SoftServe's own delivered PoCs into repeatable offers Oracle's account teams can sell. This is the concrete carrier of Alex's Q3 OKR ("3 packages by 31 Aug" — the date passed; attribution was broadened across all near-term Oracle packages at the [2026-08-18 1:1](oracle.md)). Sits on the Motion-A / NVIDIA-pack side; the [AI Lakehouse Quick Start](oracle.md) is the Motion-B sibling.
- **Every pack is derived from one delivered or live customer PoC, then generalized past that customer:** Workforce Optimization ← **Bosch** (cuOpt) · Large Document Extraction and Validation ← **Riyadh Air** (AIQ) · AI Signal-Impact Engine ← **DHL** (AIQ). The generalization is the actual product work — and on the DHL pack it changed what the product *is* (below).
- **Folder reorg (~2026-09-10):** `Projects/Oracle/` now separates `Customers/` (Belron · Bosch · DHL · KPN · NATO · NHS · RiyahdAir · SBG) from `Packs/` (`AI Lakehouse quick start` · `Account Insights` · `Large Document Extraction and review package` · `Workforce optimization package` · `Use case maps`) plus the tracker. Packs became a first-class stream instead of an artifact inside a customer folder.
- **Standard artifact set per pack** (from the tracker): Sales deck · Sales one-pager · Feature list · Demo video · Package for Oracle Marketplace · **Oracle Marketplace listing**. The Marketplace end-state is new to the wiki — the packs are being aimed at a distribution channel, not only at Oracle reps.
- **Pricing converges on the S/M/L "t-shirt" model** Gero co-designed [2026-06-26](oracle.md) (PoV → Roll-out → Scaling) — now carrying real numbers for the first time on the document pack.
- **Naming is unsettled on two of three packs**: folder, filename and tracker row disagree. Externally-facing artifacts are the ones to trust.

## The tracker — `Packs/Oracle packages.xlsx`, "Packaging activities" (read 2026-09-10)

| Pack | Sales deck | Sales one-pager | Feature list | Demo video | Marketplace pkg | Listing |
|---|---|---|---|---|---|---|
| Workforce optimization | Done | Done | In progress · 15.09.26 | To do — *Vlad: check existing materials* | To do | To do |
| Large document extraction and validation | In progress · 15.09.26 | In progress · 15.09.26 — **Alex: provide HTML to Vlad** | In progress · 15.09.26 | *Vlad: check existing materials* | - | - |
| AI Signal-Impact Engine | - | - | - | - | - | - |

The tracker lags the files: the doc pack's deck **and** one-pager and the Signal-Impact one-pager all landed 2026-09-10 but no row is ticked. A hidden `Sheet1` in the same workbook holds the Oracle + Agentic-Jumpstart OKR tree (objectives / key results / initiatives / owners) — the packaging checklist is its "First X top priority services packaged (marketing)" initiative made concrete.

## Pack 1 — Workforce Optimization (cuOpt ← Bosch)

- One-pager rebuilt 2026-09-10 as a `.docx` ("Workforce Optimization App by SoftServe"): a one-line app definition, then a large feature matrix — **Area / Category / Feature / Current status (● available · ○ not) / Standard customization scope**. Areas: allocation rules (availability · distance · dynamic · work-zone · forecast · commitment · other, plus optimization function & rule weights) · review-and-approval workflow (dispatcher UI, approval, model-decision explanations, feedback loop) · KPIs & analytics (productivity, capacity utilization, travel reduction, workload balance, baseline-vs-optimized) · integrations (Oracle Field Service as source/destination, demand forecasting, visits booking).
- Its ●/○ statuses re-state the [2026-07-07 standard-vs-custom split](oracle.md): work-zone-based rules and forecast-based allocation are in; distance/travel-time, dynamic within-day reassignment, spare parts, crew assignments and the feedback loop are not.
- **(my read) Format diverges from the other two packs' one-pagers** — a feature matrix rather than a narrative sales page. The series has not converged on one anatomy; worth a deliberate call before the Marketplace round.

## Pack 2 — Large Document Extraction and Validation (AIQ ← Riyadh Air)

_Two artifacts built 2026-09-10: `Intelligent Document Extraction - Sales one-pager - Oracle.pdf` (3 pp.) and `Intelligent Document Extraction - Service packages deck.pptx` (10 slides, image-rendered with full speaker notes). They supersede the Jul-27 `[Oracle Packages] Large Document Extraction and Validation - Acceleration Pack One-pager.pdf`. External name on both = **"Large Document Extraction and Validation"** under an "OCI AI ACCELERATORS" banner; "Intelligent Document Extraction" is only the filename, and the folder says "…and review package"._

- **Pitch:** "Turn long, complex documents into trusted, validated structured data with NVIDIA AI-Q on Oracle OCI: packaged from proof of value to enterprise scale." Solution headline — **"review the data, not type it"**: AI-Q classifies each document, routes it page by page, extracts target fields against business rules, **scores confidence and cites the source page for every value**; reviewers validate and approve in a split-view UI, then export.
- **Problem framing:** slow onboarding (3–5 days per contract, ~1 month to bring a new station online) · costly errors (manual transcription → rate mismatches and duplicate billing that surface late, at invoice matching) · poor scalability (throughput hinges on scarce specialists, so backlogs build).
- **Architecture shown:** contract repository (source PDFs) → *[OCI: Document Extraction app (extraction pipeline + reviewer UI) ↕ NVIDIA AI-Q (GPU-accelerated extraction, VLM + RAG) ↕ **GenAI Dedicated AI Cluster (H100)** + Oracle ADB]* → cost / ERP systems (extracted data, rates & terms, cited).
- **Why it sells — written for Oracle account teams:** net-new OCI consumption (recurring GPU + GenAI on **dedicated OCI clusters**, on top of the existing Oracle estate — the monetisation pattern Hammad described in [oracle-ai-offerings](oracle-ai-offerings.md)) · a warm path into the account (bounded, high-value PoC on one document type, proving accuracy and effort savings in ~2 months) · repeatable across aviation, legal, insurance, finance.
- **Where it applies:** aviation ground-handling contracts (SGHA) · legal & commercial contracts · insurance policies & claims · financial & regulatory filings.
- **Riyadh Air case study (the pack's proof point):** Riyadh Air keyed ground-handling contract rates into **AltraDOC** (a cost-management SaaS) by hand, reading 60–100-page SGHAs page by page, **3–5 days per contract**. With the **DOX** extraction app on OCI, reviewers validate AI-extracted rates side-by-side with the source PDF — every value cited to its page — and export in minutes. Metrics printed: **~5–15 min** to extract a 60–100-page contract end-to-end · **up to −20%** manual data-entry effort (PoC target) · ground-handling contracts are **7–12% of DOC** (operating cost), protected from transcription error. Carries the honest caveat: *"targets from the proof-of-value; figures are illustrative, not contractual."*
- **Service packages — the first pack with real prices:**

| | **PoV · S** | **Roll-out · M** | **Scaling · L** |
|---|---|---|---|
| Scope | Manual upload, core field schema — prove accuracy and effort savings on the customer's own contracts | Full setup and integration, live for one document type; no manual plumbing, embedded in the workflow | Across document types, volume and business units; type-specific schemas and validation |
| Services (one-time) | **€75K** | **€300–500K** | to be defined |
| Infrastructure (monthly, consumption) | **€0** | **~€10K*** | to be defined |
| Timeline | 2 months | 3–5 months | 3–12 months |

  Feature rows scale ◐ partial → ● included → ●● multi-type/advanced across: classification & routing · extraction rules & field schema · confidence scoring & validation · human-in-the-loop review UI · accuracy benchmarking & KPIs · source/target integration (absent in S) · deployment. *Infra price is indicative — depends on document volume, page counts and pipeline complexity.
- **CTA names Karsten Tramborg** — "Alliances & Partnerships Director, SoftServe", ktram@softserveinc.com (the title is new; the wiki had him as the NVIDIA/Oracle relationship gateway, which the one-pager confirms is a SoftServe-side role).
- Deck narrative (10 slides, from its speaker notes): family intro → problem/solution → where it applies → today-vs-tomorrow reviewer flow → value for Oracle+NVIDIA (recurring OCI GPU + GenAI consumption) and for the client (operators review instead of transcribe) → the layer cake (OCI + GPUs → NVIDIA AI-Q stack → business application = Oracle accelerator pack **plus a tailored SoftServe solution**) → reference architecture → the three packages → pricing → feature-by-feature detail.

## Pack 3 — AI Signal-Impact Engine / Account Insights (AIQ ← DHL)

_`Packs/Account Insights/AI Signal-Impact Engine - Accelerator One-pager.pdf`, 3 pp., built 2026-09-10. Alex's working name is either "Account Insights" (folder, positioning slide) or "AI Signal-Impact Engine" (document, tracker row)._

- **The shift from the DHL original is real, not cosmetic.** The contracted DHL PoC ([`Customers/DHL/UC #6 DHL Client Compass - #2.docx`](oracle-pipeline.md), €192,525 / 12 wks) delivers, per account, an **executive customer briefing + a discussion guide (talking points, questions, next steps) + a source list**, benchmarked against manually written "golden" briefings — i.e. *a document a salesperson reads before a meeting*. The pack instead takes **one real-world signal (news article, filing, disclosure) and emits structured JSON per affected account**, identifying the concrete **opportunities and risks** that signal creates. Unit of work moved from *account → narrative* to *signal → machine-readable opportunity set*.
- **What it does:** reasons the "so what" for that account's business; derives candidate opportunities and flags material risks; **maps each opportunity to a concrete client service line**; foresees **descriptive second-order / cross-account ripples (≤2 levels)** across suppliers, customers and competitors; **scores each item by magnitude and confidence (0–10)**; cites the source evidence. Grounded in the client's own data (CRM + account framing, capability catalog, public filings) with a human review step. One JSON per affected account, flowing into downstream sales systems. Explicitly: **it informs decisions and does not act on them.**
- **Deliberately widened past logistics** — four target verticals with worked examples: logistics & supply chain · financial services & banking · industrial & manufacturing · **private equity funds** (thesis-relevant opportunities across portfolio companies; event-driven screening of pipeline targets).
- **Proof: none yet** — "PoC in preparation (DHL), results to follow." The pack is being written ahead of its own evidence.
- **Capability matrix, three lenses** (Oracle pack provides / SoftServe status / custom work per engagement) plus a fourth column naming the **artifact that would accelerate development**. The honest read: **almost nothing comes from the Oracle + NVIDIA AI-Q RAG baseline** — only *vector search + reranking* is marked as provided. Everything else is SoftServe-side, and most of it is "planned/committed in the DHL PoC, or only partially available". Two capabilities are fully available today: the **reviewer UI** and **citations / evidence traceability + visible chain of thought**.
- **The reusable-artifact backlog the matrix names** (this is the productization to-do list): feed connector templates · commercial data-source evaluator · internal-system extract validator + grounding profiler · capability scraper · relevance & de-dup skill *(new)* · opportunity-reasoning prompt library *(new)* · capability-mapping subagent + service-catalog schema + opportunity drafter · Signal → Opportunity JSON schema *(new)* · opportunity evaluation harness *(new)* · CRM export connector.
- **Out of scope, stated plainly** (6): acting on opportunities (auto-outreach, CRM task creation, workflow automation) · validating candidates against the client's existing pipeline (post-PoC) · monetary sizing and interactive Q&A · live integration and persistence (CRM write-back, persistent signal store, feedback loop) · deep financial/quantitative modeling · native multilingual. Closing caveat: it is a **non-deterministic reasoning system, so a dedicated evaluation plan (correctness + confidence calibration) is part of the work**.
- **A working reviewer UI exists** — WIP customer-story slides Alex shared (chat, 2026-09-10) show a screenshot of it: signal inbox → a Bloomberg 2026-08-18 Meta article → account card (Meta Platforms, NASDAQ: META, AMER, Technology) with DHL's relationship framing → **Opportunity 1** (Meta — "consumer-hardware demand softens", moderate, confidence 8/10, DHL relevance: eCommerce/Express) and **Opportunity 2** (**HPE** — "capex pivots further to AI / data centers", medium, 7/10, Global Forwarding + Supply Chain) with a **cross-account effect flagged to Vertiv** → Approve / Reject + a reviewer comment field, annotated *"captured as reviewer feedback — never written back to CRM in this PoC."* Two things to note: the demo fans one signal out to three named accounts (Meta, HPE, Vertiv), which is the pack's whole differentiator; and the slides still carry a template-leftover header ("EDGE AI KIT · CUSTOMER STORY · XR") plus a WIP badge. **The slides are not in the OneDrive pack folder** — only the PDF is.
- **The packaging spreadsheet has not caught up.** `Packs/Use case maps/…SS-work split + packaging.xlsx` still describes DHL as "Enterprise deep research agent → per-account insight briefings", with custom work listed as "briefing + discussion-guide templates, signal taxonomy mapped to DHL offerings" — the pre-shift product. It has per-use-case packaging sheets for **workforce scheduling** and **doc processing** but **none for account insights**.

## People

- **Karsten Tramborg** — Alliances & Partnerships Director, SoftServe (title from the doc-pack one-pager, 2026-09-10); the named CTA on the sales one-pagers. Full entry in [oracle.md](oracle.md).
- **Vlad** (inferred: Vlad Selyotkin or Vladyslav Butenko — not disambiguated in the tracker) — owns demo videos across packs and receives Alex's one-pager HTML.
- **Gero Gunkel** (Oracle CTO) — the S/M/L model's co-designer and the customer for packaging input → [oracle-team.md](oracle-team.md).

## Open loops

**Mine**
- **Provide the doc-pack one-pager HTML to Vlad** (tracker item, due 15.09.26) — with the deck and PDF already built, confirm what is still owed.
- **Feature lists due 15.09.26** for Workforce Optimization and Large Document Extraction — the tracker's only dated commitments.
- **Decide the AI Signal-Impact Engine / Account Insights name** and apply it to folder, files and tracker row before anything goes to Oracle.
- **Reconcile the packaging spreadsheet with the shifted DHL pack** — its DHL row and custom-work columns still describe briefings/discussion guides; there is no "Pkg — Account insights" sheet.
- **Resolve the DHL divergence:** the signed UC #6 scope promises briefings + discussion guides; the pack promises signal→opportunity JSON. Either the DHL PoC is delivering the new shape (and the SoW needs an agreed change) or the pack is a generalization DHL never asked for. Unanswered from the artifacts.
- Decide whether the one-pager series converges on one anatomy (WfO feature matrix vs. narrative sales page) before the Marketplace round.

**Theirs**
- **Vlad** — check existing materials for demo videos on both packs.
- Oracle Marketplace packaging + listing: no owner, no date, no process captured yet for any pack.

## Activity

- 2026-09-10 — Pack stream folded: `Packs/` reorg, `Oracle packages.xlsx` tracker, the AI Signal-Impact Engine one-pager, the Large Document Extraction one-pager + service-packages deck, and the rebuilt WfO one-pager. Page created. (chat, 2026-09-10)
