# B — Artifact ↔ Component Map (Oracle accelerator packs, WfO as reference)

Built 2026-09-17 by reading the files, not the wiki. Extracted text in `B-work/`.
Reference pack = **Workforce Optimization (WfO)**. Secondary packs consulted where WfO has no reference.

---

## 1. Artifact inventory

| # | File (absolute) | Date | Author | Format | Length | = which of the five? |
|---|---|---|---|---|---|---|
| A1 | `/Users/olekorlov/Library/CloudStorage/OneDrive-SoftServe,Inc/Projects/Oracle/Packs/Workforce optimization package/Workforce Optimization - Accelerator Pack one-pager.docx` | 2026-09-10 | Alex | .docx | 1 table, 4 areas / 13 categories / 39 features, 5 cols | **Feature list** ✅ canonical |
| A2 | `/Users/olekorlov/Documents/Documents/SoftServe/Oracle/Workforce Optimization - Accelerator Pack one-pager.docx` | 2026-07-07 | Alex | .docx | same rows, **6 cols** | Feature list (superseded) |
| A3 | `/Users/olekorlov/Documents/Documents/SoftServe/Oracle/Workforce Optimization - Sales one-pager - Oracle.html` | **2026-07-17 18:59** | Alex | HTML→print | **1× A4 page** | **Sales one-pager — build source** ✅ |
| A4 | `…/Documents/SoftServe/Oracle/Workforce Optimization - Sales one-pager - Oracle.pdf` | 2026-07-17 18:59 | Alex | PDF | **1 p.** A4 | Sales one-pager (render of A3) |
| A5 | `…/OneDrive…/Packs/Workforce optimization package/Workforce Optimization - Sales one-pager - Oracle.pdf` | **2026-07-13 16:33** | Alex | PDF | 1 p. A4 | Sales one-pager (**earlier**; the one the wiki calls authoritative) |
| A6 | `…/OneDrive…/Packs/Workforce optimization package/Workforce Optimization - Service packages - Oracle.pptx` | 2026-07-13 | Alex | .pptx 13.33×7.5in | **10 slides** | **Sales deck** ✅ canonical |
| A7 | `/Users/olekorlov/Documents/Documents/SoftServe/Oracle/Workforce Optimization - Executive summary - Oracle.pptx` | 2026-07-17 | Alex | .pptx | 2 slides (1 content + close) | **not one of the five** — Executive summary |
| A8 | `/Users/olekorlov/Downloads/Oracle SoftServe EMEA Business Alignment July 2026 - with WfO exec summary.pptx` | Jul 2026 | Alex into Oracle's deck | .pptx | 16 sl.; **WfO = slides 8 and 9** (two layout variants) | not one of the five |
| A9 | `…/OneDrive…/Monthly AI products overviews/AI Solutions review - Sep/Oracle AI Packages - section slides.pptx` | 2026-09-11 | Alex | .pptx | 10 sl., all 3 packs; **WfO = sl. 5–6** | not one of the five — internal section deck |
| A10 | `/Users/olekorlov/Documents/GitHub/AO-Personal-OS/outputs/oracle-solutions-site/site/data/content.js` → `products[]` slug `workforce-optimization` (lines **1751–2088**) | 2026-09-14…17 | agent build (Alex's brief) | JS object | 338 lines | **Mini-site listing** ✅ canonical |
| A11 | `…/outputs/oracle-solutions-site/site/data/diagrams.js` lines **67–81** | 2026-09-14 | agent build | JS object | 15 lines | Mini-site listing — architecture diagram |
| A12 | `…/outputs/oracle-solutions-site/site/demo/workforce-optimization/data.js` (+ `demo.js`, `index.html`, `demo.css`) | 2026-09-16 | agent build | JS | 27 KB data / 86 KB logic | **Interactive demo** ✅ canonical |
| A13 | `…/OneDrive…/Packs/Workforce optimization package/Workforce optimization_productization.xlsx` | 2026-07-07 | Alex | .xlsx, 4 sheets | — | working file, **not an artifact** |

**Secondary (non-WfO) references used:**
`…/Packs/Large Document Extraction and review package/Intelligent Document Extraction - Sales one-pager - Oracle.pdf` (2026-09-10, Alex, **3 pp.**) · `…/[Oracle Packages] Large Document Extraction and Validation - Acceleration Pack One-pager.pdf` (2026-07-27, **Vlad Butenko**, 3 pp., a *feature list*) · `…/Packs/Account Insights/AI Signal-Impact Engine - Accelerator One-pager.pdf` (2026-09-10, **Vlad**, 3 pp., a *feature list*).

### Section lists, in order

**A6 Sales deck (10 sl.)** — 1 Cover (`Title-AI`) · 2 `USE CASE` (Problem | Solution cards + 3 KPI chips + anchor strip) · 3 `VERTICAL APPLICATIONS` (4 cards) · 4 Today | Tomorrow (+ "Vertical case: residential appliance…") · 5 Proof/commercial case (3 stat chips + CONTEXT / SOLUTION / VALUE FOR ORACLE + NVIDIA / VALUE FOR CLIENT) · 6 `TECHNOLOGY STACK` (3 layers + pack-vs-tailored split) · 7 `Architecture` · 8 `TAILORED SOLUTION: PACKAGES` (no infra row) · 9 same **+ infra row** · 10 `…PACKAGES (DETAILED)` (prose per cell). Slides 8/9/10 are three alternates of the same table.

**A3/A4 Sales one-pager** — hero (eyebrow `OCI AI Accelerators` + H1 + sub) · `.pitch` = [The problem · The solution + 3 KPI chips + `.arch` diagram] | `.sell-card` [Why it sells: for Oracle account teams + `Where it applies` chips] · `.proof` (logo + story + 3 `.stat` + caveat) · `.packages` table · `footer.cta` (question + answer + named contact).

**A1 Feature list (Sep-10)** — title line `SOFTSERVE × ORACLE ·` · H1 `Workforce Optimization App by SoftServe` · `App.` paragraph (scope + verticals) · capability table · legend.
**A2 (Jul-07)** adds three lead paragraphs: `Scope.` · `Verticals.` · `About this matrix.`

**A7 Executive summary (sl.1)** — `USE CASE` (+ VERTICALS) | `SOLUTION LAYERS` (4-rung ladder) | `PROVEN WITH BOSCH` (3 stats) ; `SERVICE PACKAGES` (3 tier rows) | `DETAILED CAPABILITIES` (thumbnail) | `PLANNED NEXT STEPS` (3 numbered) ; footnote.

**A9 section deck sl.5** — `USE CASE` | `SOLUTION LAYERS` | `PROOF OF VALUE · BOSCH` ; `VERTICALS` (4 icon tiles) | `SERVICE PACKAGES` | `ARTIFACTS` (2 thumbnails). **sl.6** — `ARCHITECTURE` (image) | `COMMERCIAL PROOF` ; `CAPABILITIES` (Area→Category tree rendered as shapes) | `CONTACT POINTS`.

**A12 demo** — Run optimization (region + period + XLSX picker, 7 input sheets, validation warning) → 5 processing stages → dashboard (inline-SVG map + Zone View / Technician View tables) → flags/exceptions → re-optimize with feedback (3 stages) → export (18 columns) + history.

---

## 2. The mapping matrix

Columns: **FL** = Feature list (A1) · **SD** = Sales deck (A6) · **OP** = Sales one-pager (A3/A4) · **DEMO** (A12) · **SITE** = mini-site listing (A10/A11) · **[ES]** = Executive summary (A7/A8) · **[SEC]** = internal section deck (A9).

### C1 — Application name

| | Location | Verbatim | Status |
|---|---|---|---|
| FL | H1 | "Workforce Optimization App by SoftServe" | **DIVERGES** — A2 (Jul-07) says "Workforce Optimization **Accelerator Pack**" |
| SD | sl.1 title ph.; running header on sl.2–10 | "Workforce Optimization" / "OCI AI Accelerators — Workforce Optimization" | EXACT |
| OP | `<h1>` | "Workforce Optimization" | EXACT |
| DEMO | `index.html` app chrome | "Workforce optimization" (no vendor marks, by design) | EXACT |
| SITE | `name` + `headline:{accent,rest}` | `name: "Workforce optimization"` · `{accent:"WORKFORCE", rest:"OPTIMIZATION"}` | EXACT |
| [ES] | sl.1 title | "Workforce optimization — executive summary" | EXACT |
| [SEC] | sl.5/6 title | "1: Workforce optimization" | EXACT |

⚠️ Casing is inconsistent: Title Case on FL/SD/OP, sentence case on SITE/ES/SEC.

### C2 — Application one-liner

| | Location | Verbatim (≤25 w) | Status |
|---|---|---|---|
| OP | `p.sub` in hero | "Intelligent field-service planning with NVIDIA cuOpt on Oracle OCI: packaged from proof of value to enterprise scale." | **EXACT — canonical** |
| SD | sl.1 `Text Placeholder 2` line 2 | "AI accelerator service packages on Oracle OCI + NVIDIA cuOpt — from proof of value to enterprise scale" | **DIVERGES** (deck-scoped, not product-scoped) |
| [SEC] | sl.5/6 subtitle | "Intelligent field-service planning with NVIDIA cuOpt on Oracle OCI" | PARTIAL (tail dropped) |
| SITE | `oneLiner` / `shortLine` / `heroCaption` | `oneLiner`: "Optimizes field-service work zones and schedules with NVIDIA cuOpt — a region's four-week plan built in minutes…" | **DIVERGES** — three one-liners at three lengths; outcome-led, not "packaged from PoV to scale" |
| FL | `App.` sentence | "Workforce Optimization automates the planning of a mobile field-service workforce — computing the optimal technician-to-zone-to-job allocation…" | PARTIAL (scope statement, different register) |
| [ES] | — | slide carries `Goal better sales enablement…` (internal goal) | **ABSENT** |
| DEMO | — | — | **ABSENT** (by design) |

### C3 — Problem ↔ Solution

| | Location | Verbatim | Status |
|---|---|---|---|
| OP | `h2.sec` "The problem" + `ul.dash` ×3; `h2.sec` "The solution: review the plan, not build it" + `.kpis` ×3 | "Field-service operators plan their mobile workforce by hand: work zones, technician assignments, dozens of rules and constraints." | **EXACT — canonical** |
| SD | sl.2 `TextBox 8` / `TextBox 12` | "This leads to the following challenges: Suboptimal operational efficiency…" | EXACT (longer prose) |
| SD | sl.4 TODAY / TOMORROW | "What if dispatchers reviewed the plan, not built it?" | EXACT (a second, narrative form) |
| SITE | `overview.problemSolution.{problem,solution}{title,text,icon}` + `moreDetail` "Today"/"Tomorrow" + 3 sub-problem entries | title: "THE SOLUTION: REVIEW THE PLAN, NOT BUILD IT" | **EXACT** — carries both forms |
| [SEC] | sl.5 `TextBox 9` | "PROBLEM: … SOLUTION: …" in one card | EXACT (compressed) |
| [ES] | sl.1 USE CASE card | solution first; problem = one trailing sentence | PARTIAL |
| FL | `App.` clause | "…so dispatchers review and approve an optimized plan instead of building it by hand." | PARTIAL (no problem block) |
| DEMO | `flagsFor()` | expressed as live exceptions ("No cover during an absence", "Over capacity") | PARTIAL (dramatized, not stated) |

### C4 — "Relevant for": ICP one-liner

| | Location | Verbatim | Status |
|---|---|---|---|
| SITE | `overview.industriesNote` | "Any mobile field force planned against skills, availability and geography." | **EXACT — the only clean, customer-side ICP line in the set** |
| OP | `.sell-card` 3rd bullet | "**Repeatable:** fits any OFS customer with a heavy, centralized dispatch and scheduling routine" | **PARTIAL/DIVERGES** — filed under *seller* value, and gated on OFS |
| SD | sl.2 anchor strip | "…packaged so any Oracle account exec can sell it." | DIVERGES (seller ICP, not customer ICP) |
| FL · DEMO · [ES] · [SEC] | — | — | **ABSENT** |

Secondary template worth copying — **Account Insights one-pager**: "**Where it applies.** Any business that needs to turn market and customer developments into pursuable opportunities across its account base, quickly."

### C5 — Relevant verticals + per-vertical problem↔solution

| | Location | Verbatim | Status |
|---|---|---|---|
| SITE | `overview.industryCases[4]` `{industry,label,image,problem,solution}` | manufacturing: problem "In-home repair of manufactured goods is planned by hand…" / solution "The solver plans the whole region against skills, parts, travel and existing bookings at once…" | **EXACT — the only full problem↔solution-per-vertical anywhere** |
| SD | sl.3 `VERTICAL APPLICATIONS`, 4 cards | "Utilities — water · gas · electric" + "Schedule field crews across service territories against SLAs, outage spikes and crew certifications…" | **PARTIAL** — one blended line per vertical, not a problem/solution pair |
| OP | `.chips` ×4 under `Where it applies` | "Appliance & white-goods repair" · "Utilities: water, gas, electric" · "Telecom & cable" · "Industrial, medical & IT equipment" | PARTIAL (names only) |
| FL | `App.`/`Verticals.` sentence | "(1) residential appliance & white-goods repair, (2) utilities; (3) telecom & cable, (4) industrial, medical-device, IT-equipment service" | PARTIAL (names only) |
| [ES] | sl.1 `VERTICALS` line | same four, names only | PARTIAL |
| [SEC] | sl.5 four icon tiles | "Home appliance & white-goods repair" … | PARTIAL |
| DEMO | `zones[].kind: "Residential"` | — | **ABSENT** (deliberately industry-neutral) |

⚠️ **Vertical LABELS diverge.** Decks/one-pager/FL: *residential appliance & white-goods repair · utilities · telecom & cable · industrial, medical-device & IT-equipment service*. SITE re-maps to generic industries: **manufacturing · utilities · telecom · healthcare**.
Unpublished richer source: `Workforce optimization_productization.xlsx` **Sheet2** = a capability × vertical matrix (BASE / ADVANCED / SCENARIOS / CROSS-VERTICAL rows × `Bosch (HOME)* · UTIL · TEL · IND·MED·HT · CON · LOG`), and **Sheet3** names four verticals differently again: "Home & commercial services (security/alarm, HVAC, facilities) · Manufacturing — equipment & durables service · Utilities — water & wastewater · Telecommunications & Cable".

### C6 — Scope-of-service-packages table (the big one)

| | Location | Status |
|---|---|---|
| OP | `section.packages` → `table.pk`: tier headers (`t-name` + `t-size` + `t-scope`), then rows **Infrastructure price · Services price · Timeline · 6 capability rows** | **EXACT — canonical compact form** |
| SD | sl.8 (no infra row) · **sl.9** (+ infra row) · **sl.10 DETAILED** (prose per cell, not glyphs) | **EXACT — sl.10 is canonical for the detailed form**; sl.8/9/10 are three alternates |
| SITE | `jumpstart{title,promise,durationShort,pillars[3],outcomes[4],timeline[4],needs[3],investment{price,duration,includes[4],footnote},next[2]{tier,text,duration,price},cta}` + `overview.scope{in[5],out[4]}` | **DIVERGES structurally** — tiers renamed, table replaced by a Jumpstart narrative + a two-item "next" list |
| [ES] / [SEC] | three compact tier rows (name · scope · price · duration); A8 sl.9 adds "OCI infra:" lines | PARTIAL |
| DEMO | tiers appear as *surfaces*: `settings.regions[3]` (= L), `settings.connectors[6]` (= M), `sources[]` connected/configured | PARTIAL (implied, never stated) |
| FL | — | **ABSENT** (by design — no pricing in the feature list) |

**DIVERGENCE 6a — tier names.** OP/SD/ES/SEC: `PoV · "S"` / `Roll-out · "M"` / `Scaling · "L"`. SITE: `Jumpstart Proof-of-Value` / `Integration` / `Scale`.
**DIVERGENCE 6b — PoV duration.** OP/SD/ES/SEC: **"2 months"**. SITE: **"4–8 weeks"** (`durationShort`, and `timeline` runs to "Week 8").
**DIVERGENCE 6c — infrastructure price, five values for the PoV tier:**

| Source | PoV | Roll-out/Integration | Scaling |
|---|---|---|---|
| SD sl.8 | *(row absent)* | — | — |
| SD sl.9 | `€0` | `€15K / month*` | To be defined |
| [ES] A7 footnote / A8 sl.9 | `OCI infra: €0` | `~€15K / month` | — |
| **OP A5 (Jul-13)** | `€4K` | `~€25K *` | to be defined |
| **OP A3/A4 (Jul-17, newest)** | `~€2K *` | `~€25K *` | to be defined |
| SITE | `€4K/mo` | `~€25K/mo` | Scoped per engagement |

Services price is **stable everywhere**: `€90K` / `€300–500K` / `To be defined`. Timeline stable except the SITE PoV: `2 months` / `3–5 months` / `3–12 months`.

### C7 — Required Oracle products

| | Location | Verbatim | Status |
|---|---|---|---|
| SITE | `technology.stack[]…items[].required: true` | "Oracle Field Service, as source and destination" · "OCI Object Storage for the period's data" · "A dedicated AI cluster (4–8 NVIDIA A100 GPUs)" · "Object storage, networking and IAM" | **EXACT — the only artifact with an explicit required flag** |
| OP | `.arch` boxes | "Oracle Fusion Field Service" · "Oracle Cloud Infrastructure / OCI Dedicated AI cluster" | PARTIAL (diagram only, no required/optional split) |
| SD | sl.6 layer "Infrastructure / OCI + GPUs" badge `Oracle`; sl.7 "Oracle Cloud Infrastructure — Dedicated GPU cluster (4-8 NVIDIA A100 GPUs)" | PARTIAL |
| FL | integration row | "Oracle Field Service as a datasource / destination" status **○ (roadmap)** | **DIVERGES** — the one-pager architecture makes OFS the native centre; the feature list marks that integration *not implemented* |
| [ES]/[SEC] | SOLUTION LAYERS rung "OCI infrastructure + GPUs" / "Oracle" | PARTIAL |
| DEMO | `connectors[0].name: "Field-service system"` | **ABSENT by design** (de-branded) |

⚠️ Also a naming divergence: **"Oracle Field Service"** (SD sl.7, FL, SITE) vs **"Oracle Fusion Field Service"** (OP Jul-17) vs **"Oracle Field Service"** (OP Jul-13) — this is the only text difference between A5 and A4 besides the price.

### C8 — Optional Oracle products

| | Location | Verbatim | Status |
|---|---|---|---|
| SITE | `technology.stack[]…items[].required: false` | "Write-back to Oracle Field Service" *(note: "After the Jumpstart")* · "Back from Oracle Field Service: factual durations and times" · "Up to five further integrations…" | **PARTIAL** — models *"optional / deferred"*, not *"optional Oracle products"* |
| SD | sl.7 `Rounded Rectangle 35` | "Additional datasources — i.e. booking system, inventory for parts availability, HR/WFM for people availability, demand forecasting" | PARTIAL — vendor-neutral, not Oracle-specific |
| OP · FL · DEMO · [ES] · [SEC] | — | — | **ABSENT** |

→ **C8 has no true reference in the WfO set, and none in the secondary packs either.** See §4.

### C9 — Key capabilities + features grouped by capability + customization scope

| | Location | Status |
|---|---|---|
| FL | the capability table | **EXACT — canonical.** Sep-10 columns: `Area \| Category \| Features \| Current status \| Standard customization scope`. 4 Areas (Allocation rules · Review and approval workflow · KPIs and analytics · Integrations) → 13 Categories → 39 Features. **Customization scope is one merged cell per Area** (4 blocks). |
| FL A2 (Jul-07) | 6 columns: `… \| Initially available in the Oracle accelerator pack \| Currently implementation status (by SoftServe) * \| Custom work` | **DIVERGES** — the Oracle-baseline lens existed in July and was **dropped** in September |
| SITE | two renderings: `overview.features[8]` + `featuresDetail[6]{title,body}` (marketing altitude) **and** `technology.capabilities[4]{stage, items[]{name, state: supported\|partial\|roadmap}}` | **DIVERGES — the grouping axis changes from Area → flow Stage** ("Load the period's data" / "Set the rules" / "Solve the plan" / "Review, approve, measure") |
| SD | sl.10 — capability × tier, with prose per cell | PARTIAL (a third grouping axis) |
| [SEC] | sl.6 `CAPABILITIES` — the FL's Area→Category tree drawn as shapes | EXACT (names only, no status) |
| DEMO | `settings.rules[9]{name,type:"Hard"\|"Soft",desc}` + `settings.objectives[3]{name,desc,weight}` | PARTIAL — the rules, not the capability tree |
| OP | the 6 capability rows of the packages table | PARTIAL |

⚠️ **Two incompatible glyph systems.** FL legend: `●` provided OOTB · `●` *(second, differently-coloured ●)* partially implemented OOTB · `○` roadmap — **the same glyph carries two meanings, separated only by colour.** Decks/OP: `◐` partial · `●` included · `●●` multi-region/advanced · `—` not included. SITE: string `state: "supported"|"partial"|"roadmap"`.

### C10 — High-level solution architecture (inputs → stack → outputs)

| | Location | Status |
|---|---|---|
| OP | `.arch` grid `25mm 1fr 54mm`: `.ofs` (Oracle Fusion Field Service) → labelled `.pipe`s → `.oci` box containing `.obox` app ↔ `.obox` cuOpt | **EXACT — canonical compact form.** Pipe labels: "technicians data, default allocations" (right) / "optimized allocations: zones, visits" (left) |
| SD | sl.7 `Architecture` | **EXACT — canonical detailed form.** OFS + "Additional datasources" → Workforce optimization app → cuOpt on "Oracle Cloud Infrastructure / Dedicated GPU cluster (4-8 NVIDIA A100 GPUs)"; arrow labels incl. "Additional data for scheduling (i.e. spare-parts availability)" |
| SITE | `diagrams.js["workforce-optimization"]` = `{layout:"flow", sources[], group{label,nodes[]}, target{title,sub,accent}, loop}` **+** `content.js technology.stack[5]{key,label,summary,vendors[],items[]{name,required,direction:"inbound"\|"outbound",note}}` + `technology.narrative` | **EXACT — richest**; `direction` is the only machine-readable I/O marking anywhere |
| DEMO | `settings.connectors[6]{name,state,dir}` where `dir` = "In: staff, availability, bookings · Out: allocations · Back: actual durations" | EXACT (as a data model) |
| SD sl.6 | `TECHNOLOGY STACK` — **a different component**; see C13-3 | — |
| FL | — | **ABSENT** |
| [ES]/[SEC] | 4-rung SOLUTION LAYERS ladder | PARTIAL (stack, not architecture) |

### C11 — Workflow architecture (inputs → processing / human-in-the-loop → outputs)

| | Location | Status |
|---|---|---|
| SITE | `overview.steps[4]{n,title,text,image,features[]}` | **EXACT — canonical.** "Load the period's data" → "Set the rules" → "Solve the plan" → "Review, approve, measure"; each step carries the subset of `features[]` it exercises |
| DEMO | `inputSheets[7]` · `stages[5]` · `reoptStages[3]` · `flagsFor()` · `exportColumns[18]` · `priorHistory[3]` | **EXACT — canonical for the HITL loop.** Stages: "Validate the input file" → "Build the travel matrix" → "Load rules and objectives" → "Solve the allocation on the GPU solver" → "Post-process and compute KPIs" |
| SD | sl.4 TODAY / TOMORROW | PARTIAL (prose) |
| OP | solution paragraph | PARTIAL (one sentence) |
| FL | Area "Review and approval workflow" | PARTIAL (the HITL half only) |
| [ES]/[SEC] | — | **ABSENT** |

### C12 — Key performance metrics used to measure ROI

| | Location | Verbatim | Status |
|---|---|---|---|
| OP | `.stats` ×3 + `p.caveat` | "~30 min" · "up to +26%" · "€190K / month" ; caveat "KPIs measured before/after on proof-of-value data; figures are illustrative, not contractual." | **EXACT — canonical for the sales set** |
| SD | sl.5 three rounded chips + footnote | "2 days -> 30 minutes" · "up to +26%" · "€190,000 saved monthly" | EXACT |
| [ES] | sl.1 `PROVEN WITH BOSCH` ×3 | "2 days → 30 min" · "up to +26%" · "€190K / month" | EXACT |
| [SEC] | sl.5 `PROOF OF VALUE · BOSCH` ×3 | identical to [ES] | EXACT |
| FL | KPI Area rows | "Productivity (Jobs / Technician / Day)" · "Capacity Utilization" · "Travel Reduction" · "Workload Balance" · "Compare baseline vs optimized allocation" | PARTIAL — **names only, no values** |
| SITE | `overview.metrics[1]` + `metricsNote` + `roi{icon,text}` + `caseStudy{status:"modeled", metrics[2], story}` + `moreDetail` "How the KPIs are defined" | metrics: "~30 min" only · caseStudy: "+4.5%" median jobs/tech/day · "~5x" three-year return · story cites "83% of the 12 modeled simulations" and "15–20%" dispatcher productivity | **DIVERGES — a completely different figure set, customer anonymized, no € figures** |
| DEMO | computed, never quoted — `objectives[].weight` (40/35/25), `capacityPerDay: 7`, per-change `effects{jobs,waits}` | — | PARTIAL (modeled) |

**Formulas** exist in only two places, neither of them a delivered artifact: the spec doc §3 (`productivity = jobs ÷ days with ≥1 job`; `capacity = round(jobs ÷ (working days × 7) × 100)`, capped 0–100; `wait = booking→appointment in whole calendar days`) and SITE `moreDetail` "How the KPIs are defined" in prose.

### C13 — Extras the artifacts consistently carry (not in C1–C12)

| # | Component | Where | Status |
|---|---|---|---|
| **13-1** | **"Why it sells: for Oracle account teams"** — *seller* value, distinct from customer value | OP `.sell-card` (3 bullets: "A natural OFS cross-sell" / "Net-new OCI consumption" / "Repeatable"); SD sl.5 "VALUE FOR ORACLE + NVIDIA"; same block on the Large docs one-pager | **Present on every Alex-authored sales artifact; ABSENT from SITE & DEMO** (correctly — partner-facing) |
| **13-2** | **Named case study / proof block** | OP `.proof` (Bosch logo + story + 3 stats + caveat); SD sl.5; [ES]/[SEC] "PROVEN WITH BOSCH" / "PROOF OF VALUE · BOSCH"; SITE `caseStudy{descriptor,area,industry,status,metrics[],story,scope[3],ndaLine,downloadLabel}` | EXACT everywhere but **with opposite naming policy** — see C12 |
| **13-3** | **Solution-layers / vendor-attribution ladder** (Custom configuration→SoftServe · Accelerator business app→Oracle+SoftServe · cuOpt engine→NVIDIA · OCI infra+GPUs→Oracle) | SD sl.6, [ES] sl.1, [SEC] sl.5 | EXACT on all three decks; **ABSENT from OP, FL, SITE, DEMO**. Distinct from C10. |
| **13-4** | **CTA + named contact** | OP footer: "See the fit in one of your accounts?" / "Let's discuss a Proof of Value on the customer's data: 2 months to measurable KPIs." / **Karsten Tramborg, Alliances & Partnerships Director, ktram@softserveinc.com**; SITE `jumpstart.cta{label,route}` → "Start a Jumpstart conversation" (site uses `oracle@softserveinc.com`); [SEC] sl.6 → **Bohdan Khomych / RnDrequest@softserveinc.com** | **DIVERGES three ways** |
| **13-5** | **Disclaimer / caveat line** | OP `p.caveat` + `.pk-notes` `*`; SD sl.5 footnote, sl.8/9/10 legend lines; FL legend; [ES] sl.1 bottom; SITE `metricsNote`, `featuresNote`, `investment.footnote`, top-level `disclaimers` | EXACT — **universal**; SITE formalizes as named keys |
| **13-6** | **Legend / glyph key** | OP `.pk-notes`; SD sl.8/9/10; FL legend | EXACT but **two incompatible systems** (see C9) |
| **13-7** | **In-scope / out-of-scope boundary list** | SITE `overview.scope{in[5],out[4]}` | **ABSENT from every WfO deck/one-pager.** Secondary reference: Account Insights one-pager "USE-CASE BOUNDARIES / IN SCOPE (5) / OUT OF SCOPE (6)" |
| **13-8** | **Roadmap / "not in the pack today"** | FL `○` rows; SITE `moreDetail` "On the roadmap, not in the pack today" + `state:"roadmap"` | EXACT on FL + SITE; ABSENT on OP/SD |
| **13-9** | **Sales-kit / artifact inventory** | SITE `sellers.materials[5]{key,title,description,state}` (sales-deck · one-pager · feature-list · demo-video · marketplace-package); [SEC] sl.5 "ARTIFACTS" thumbnails | Only SITE + SEC |
| **13-10** | **Entry gate / what the customer must provide** | SITE `jumpstart.needs[3]` + `timeline[0]` "Week 0 · Gate" | **Only SITE** |
| **13-11** | **Tile / taxonomy metadata** | SITE `tile.outcomes[3]`, `tags[]`, `category`, `categoryChip`, `facet`, `slug` | Listing-only, by nature |
| **13-12** | **Hero image + focal point + alt text** | SITE `hero.image{file,alt,focal}`; OP base64 hero photo with `object-position: 62% 30%` | Both, differently expressed |
| **13-13** | **"About this matrix" framing paragraph** | FL A2 (Jul-07) only; also on both of Vlad's feature-list one-pagers | **DROPPED** in the Sep-10 rebuild |

---

## 3. Canonical wording per component

Authority order used: **Sales one-pager** for pitch/problem/architecture/pricing, **Feature list** for capabilities, **mini-site** for verticals/ICP/scope/workflow, **demo** for the HITL loop.

**C1** — `Workforce Optimization` (Title Case on print artifacts; `Workforce optimization` on the site).

**C2** — "Intelligent field-service planning with NVIDIA cuOpt on Oracle OCI: packaged from proof of value to enterprise scale."

**C3 problem** — "Field-service operators plan their mobile workforce by hand: work zones, technician assignments, dozens of rules and constraints."
· **Suboptimal efficiency:** uneven workloads and under-used capacity
· **Lower customer satisfaction:** longer wait times from suboptimal allocations
· **Poor scalability:** planning hinges on scarce senior dispatchers; new zones launch slowly

**C3 solution** — heading "THE SOLUTION: REVIEW THE PLAN, NOT BUILD IT"; chips `Productivity ↑` · `Capacity utilization ↑` · `Customer wait time ↓`; body "NVIDIA cuOpt ingests demand, availability, skills and constraints, and computes the best technician-to-zone-to-job plan in minutes. Dispatchers review it on a live map, re-optimize and write the plan back to Oracle Field Service."

**C4** — "Any mobile field force planned against skills, availability and geography." (SITE `industriesNote`.)

**C5** — four verticals, decks' labels + SITE's problem/solution pairs:

| Vertical (deck label) | SITE label | One-line framing (deck sl.3) |
|---|---|---|
| Residential appliance & white-goods repair | manufacturing | "Dispatch home-repair technicians by skill, spare parts and travel - absorbing urgent call-outs and no-shows without re-planning the day." |
| Utilities — water · gas · electric | utilities | "Schedule field crews across service territories against SLAs, outage spikes and crew certifications, balancing planned and emergency work." |
| Telecom & cable | telecom | "Route install-and-repair technicians to tight appointment windows across regions, matching line skills and cutting customer wait time." |
| Industrial · medical-device · IT equipment service | healthcare | "Allocate asset-based service engineers to contracted equipment by skill, SLA and location - keeping high-value machines uptime-critical." |

**C6 — the S/M/L table, verbatim (one-pager A3/A4, Jul-17, the build source).** Tier headers carry name + size letter + scope sentence:

| | **PoV · S** — "Manual data import, limited rule set: prove the KPI gains on the customer's data." | **Roll-out · M** — "Full setup and integration, live at one location: no manual work, embedded in the workflow." | **Scaling · L** — "Scaling across locations: heterogeneous rules and data workflows per region." |
|---|---|---|---|
| Infrastructure price (monthly, consumption‑based) | ~€2K* | ~€25K* | to be defined |
| Services price (one-time) | €90K | €300–500K | to be defined |
| Timeline | 2 months | 3–5 months | 3–12 months |
| Optimization rules & guardrails | ◐ | ● | ●● |
| Re-optimization & feedback loop | — | ● | ●● |
| Analytics & efficiency KPIs | ● | ● | ●● |
| Oracle Field Service integration | — | ● | ●● |
| Additional data sources & BI | — | ● | ●● |
| Deployment | ◐ | ● | ●● |

Legend: "◐ partial · ● included · ●● multi-region / advanced". Footnote: "* Indicative; depends on the usage and optimization rules complexity". *(Substitute `€4K` in the PoV infra cell for the Jul-13 / wiki-authoritative version — see §5-1.)*

**C6 detailed form (deck sl.10)** — the same rows with prose per cell, e.g. *Optimization rules & guardrails*: S "◐ Foundational allocation with recurring, most-typical constraints, i.e. zones, skills, planned absences" · M "● Advanced allocation with all operational complexities, i.e. urgent jobs, crews, SLAs, inventory-coupling" · L "●● Multiple region-specific optimization-rule configurations". *Oracle Field Service integration*: M "● In: staff, availability, booking data · Out: allocations · In: factual durations & times". *Additional data sources & BI*: M "● Up to 5 typical integrations, i.e. booking system, inventory for parts availability, HR/WFM for people availability, demand forecasting, BI". *Deployment*: S "◐ Sandboxed" · M "● Enterprise-integrated (dedicated LZ, IAM, observability)" · L "●● Enterprise-integrated, multi-zone".

**C7 required** — Oracle Field Service (source **and** destination) · OCI Object Storage · OCI dedicated AI cluster, **4–8 NVIDIA A100 GPUs** · OCI networking + IAM. (NVIDIA cuOpt is the AI engine, not an Oracle product.)

**C8 optional / deferred** — write-back to Oracle Field Service; factual durations & times back from OFS; up to five further integrations (booking · inventory · HR/WFM · demand forecasting · BI). All flagged "After the Jumpstart".

**C9 — the feature matrix column model (A1, Sep-10):**
`Area | Category | Features | Current status | Standard customization scope`
Status glyphs: `●` provided OOTB, configuration may be required · `●` *(different colour)* partially implemented OOTB, major improvements on the roadmap · `○` roadmap. `***` footnote marker on "Non-movable appointments".
Areas → categories: **Allocation rules** (Workforce availability rules · Distance-based · Dynamic · Workzone-based rules · Forecast-based rules · Commitment-based rules · Other rules · Optimization function & rule weights) · **Review and approval workflow** (Review · Feedback loop) · **KPIs and analytics** (KPI · Baseline comparison) · **Integrations** (Integrations).
Customization scope, one block per Area — verbatim for Allocation rules: "Custom rules implementation · Rules configuration · Matching rules with source data formats · Balancing optimization function with penalty / rewards, allocation rules weights tuning to achieve optimal allocation per customer · Introduction of additional optimization objectives". Review & approval: "Model decisions explanations / recommendations tuning to match custom allocation rules". KPIs: "Custom (additional) KPIs · Custom formula for KPI calculation". Integrations: "Integration configuration · Custom integrations".

**C10 architecture** — **Inputs:** Oracle Field Service (technicians data, default allocations; staff, availability, bookings) + additional data sources (booking system · inventory for parts availability · HR/WFM for people availability · demand forecasting). **Stack:** infrastructure = OCI dedicated GPU cluster (4–8 A100) + object storage/networking/IAM → engine = NVIDIA cuOpt (GPU-accelerated solver) → app = Workforce Optimization app (optimization engine + dispatcher UI) → configuration = client rules, constraints, KPI definitions. **Outputs:** optimized allocations (zones, visits) written back to Oracle Field Service; KPIs per plan version to BI.

**C11 workflow** — `Load the period's data` → `Set the rules` → `Solve the plan` → `Review, approve, measure`. HITL: dispatcher compares current vs optimized on a live map, approves/rejects/comments **per zone**, re-runs; the plan is exported only after approval. Demo realization: validate input (7 sheets) → build travel matrix → load rules & objectives (5 hard / 4 soft, capacity 7/day) → solve on GPU → post-process KPIs → flags → re-optimize with feedback → export (18 columns incl. `Decision`, `Comment`).

**C12 KPIs** — names: Productivity (jobs / technician / working day) · Capacity utilization · Travel reduction · Workload balance · customer wait time · baseline-vs-optimized comparison.
Formulas: `Productivity = total jobs ÷ days with ≥1 job`, averaged across technicians, 2 dp · `Capacity utilization = round(jobs ÷ (working days × 7) × 100)`, capped 0–100, assuming ≤7 jobs/technician/day · `Average wait = booking date → appointment date in whole calendar days`. All three computed identically on the current and the optimized plan for the same window.
Headline figures — **sales set (OP/SD/ES/SEC, named Bosch):** `~30 min` to optimize and approve a region's 4-week plan, down from ~2 days · `up to +26%` productivity gain on PoV data across US/UK/NL · `€190K / month` estimated savings at full launch, valued as staffing avoided. **Cleared set (SITE, anonymized, `status: "modeled"`):** `+4.5%` median jobs/technician/day · `~5x` three-year return · 83% of 12 simulations positive · 15–20% dispatcher productivity in the pilot · **no € figures**.

---

## 4. No-reference list

| Component | WfO reference? | Secondary reference? |
|---|---|---|
| **C8 Optional Oracle products** | **NO REFERENCE.** No artifact lists optional Oracle products as such. Nearest: SITE `required:false` (which means "deferred to the next tier", not "optional product") and SD sl.7 "Additional datasources" (vendor-neutral). | **None.** Large docs and Account Insights one-pagers have no such block either. **Genuinely new — the skill must invent its shape.** |
| **C4 ICP one-liner** | Only SITE `industriesNote`; OP/SD carry a *seller*-framed near-miss. | **Yes — Account Insights one-pager:** "Where it applies. Any business that needs to turn market and customer developments into pursuable opportunities across its account base, quickly." Best template in the estate. |
| **C5 per-vertical problem↔solution** | Only SITE `industryCases[]`. Decks give one blended line; OP/FL give names only. | **Yes — Vlad's Jul-27 Large docs one-pager** gives two worked examples per vertical under a numbered "Verticals." heading, e.g. "2. Legal & commercial contracts. For example: extract key terms, obligations, pricing and renewal/termination dates from MSAs…" |
| **C13-7 In/out-of-scope boundary** | Only SITE `overview.scope`. | **Yes — Account Insights one-pager** "USE-CASE BOUNDARIES": a one-sentence boundary statement + numbered IN SCOPE (5) and OUT OF SCOPE (6). |
| **C12 formulas** | Not in any *delivered* artifact — only the spec doc and SITE prose. | None. |
| **C6 on the Feature list** | Absent by design. | Confirmed by both of Vlad's feature lists — neither carries pricing. |
| **C13-9 sales-kit inventory** | SITE + [SEC] only. | The tracker `Oracle packages.xlsx` holds the canonical six-artifact row set. |
| **Interactive demo for any other pack component** | The demo carries C9/C10/C11 as *behaviour*, and C1/C6/C12 not at all. | Large docs demo has the same shape. |

Also worth flagging: **Vlad's two one-pagers are feature lists, not sales one-pagers** — they use the `Scope. / Verticals. / About this matrix. / LEGEND / CAPABILITY MATRIX` anatomy, which is the direct ancestor of WfO's A2 (Jul-07). Account Insights adds a 5th column, **"ARTIFACT TO ACCELERATE THE DEVELOPMENT"** (e.g. "Feed connector templates", "Relevance & de-dup skill (new)") — an internal-reuse lens no WfO artifact has.

---

## 5. Ambiguities to ask Alex

1. **Which one-pager is canonical?** `A5` (OneDrive, **2026-07-13**, PoV infra **€4K**, "Oracle Field Service") is what the wiki calls authoritative and what the mini-site copied. `A3/A4` (local, **2026-07-17**, PoV infra **~€2K**, "Oracle **Fusion** Field Service") is newer and is the HTML build source. Which price and which product name does the skill emit? *(Also: A3's `<title>` says "Workforce Optimization - **Service packages** - Oracle" — a copy-paste leftover; should the skill's template set the title from the pack name?)*
2. **Tier names — one vocabulary or two registers?** `PoV·S / Roll-out·M / Scaling·L` (print artifacts) vs `Jumpstart Proof-of-Value / Integration / Scale` (mini-site). Is the site's a deliberate customer-facing rename that the skill should emit per-channel, or drift to be reconciled?
3. **PoV duration — 2 months or 4–8 weeks?** Every print artifact says 2 months; the site says 4–8 weeks with a week-by-week timeline.
4. **C12 — which figure set per artifact?** Named-Bosch + `+26%` + `€190K/mo` still ships on the one-pager, deck, exec summary and internal section deck; the site ships the anonymized, cleared `+4.5% / ~5x / no €` set. Does the skill emit both (print = sales set, digital = cleared set), or converge?
5. **C9 grouping axis.** Canonical grouping is `Area → Category → Feature` (feature list) or `Stage → Item` (site `technology.capabilities`)? They are not derivable from one another without a mapping the skill would have to own.
6. **C9 status glyphs.** The feature list uses `●` twice with colour as the only discriminator (OOTB vs partial). Should the skill move to `● / ◐ / ○` like the decks, which would break the delivered docx's legend?
7. **C7 vs FL contradiction.** The one-pager/architecture makes Oracle Field Service the native centre of the solution; the feature list marks "Oracle Field Service as a datasource / destination" as `○ roadmap`. Which is true for the pack today, and which does C7 report?
8. **C1 for the feature list.** Jul-07 said "Workforce Optimization **Accelerator Pack**"; Sep-10 says "Workforce Optimization **App by SoftServe**". Which is the C1 value — and does C1 vary by artifact?
9. **Is "Executive summary" a sixth standardized artifact?** Two near-identical versions exist (standalone A7, plus two layout variants inside Oracle's own EMEA deck A8 slides 8–9). It is the only artifact carrying C13-3 (solution layers) + "PLANNED NEXT STEPS".
10. **C13-4 contact.** Karsten Tramborg / `ktram@` (one-pagers) vs `oracle@softserveinc.com` (site) vs Bohdan Khomych / `RnDrequest@` (internal section deck). Which does each artifact type carry?
11. **One-pager length.** WfO's is **1 A4 page**; Large docs' and Account Insights' are **3 pages**. Is the target one page, or does the format scale with the pack?
12. **Vertical label set.** Three different four-item lists exist (decks/FL · site generic industries · productization Sheet3). Which one does C5 emit?

---

## 6. Format facts for the skills

### Sales one-pager (HTML → print-to-PDF)
- **One `.page` div**, `width:210mm; height:297mm; overflow:hidden; display:flex; flex-direction:column`. `@page { size: A4; margin: 0 }`, `-webkit-print-color-adjust: exact; print-color-adjust: exact`. Rendered PDF: **1 page, 594.96 × 841.92 pt (A4)**.
- **Font:** `"Helvetica Neue", Arial, sans-serif`. No web fonts, no external assets — the SoftServe logo is an inline `<svg>`, the hero photo and Bosch logo are base64 `data:` URIs (hence 545 KB of HTML).
- **Palette:** body `#26282B` · hero/dark `#17191C` · accent blue `#1485C3` · eyebrow `#C1DFF3` · sell-card bullet orange `#F36949` · pipe/arrow `#4A8FBC` · grey fill `#EDF0F2` · light-blue fill `#F4FAFE` · border `#A9D3F1` · muted `#4C5156` · hero sub `#D9E4EC`.
- **Type scale:** `h1` 25pt/1.02 700 · `.sub` 9pt/1.4 · `h2.sec` 8pt 700 uppercase, letter-spacing `.14em`, colour `#1485C3` · body `p, li` 8.3pt/1.42 · `.eyebrow` 6.4pt 600 uppercase `.20em` · `.obox b` 7pt, `small` 6.1pt · `.oci-label` 5.9pt 700 · `.pipe-lbl` 6.1pt.
- **Layout:** `.hero` 38mm tall, `.hero-img` 46% width right with a left-to-right fade · `main { padding: 4.4mm 10mm 0; gap: 3.2mm }` · `.pitch` grid `57.5% / 39.5%`, column-gap 3% · `.arch` grid `25mm 1fr 54mm`, column-gap 2mm · dashed bullets are 1.5mm circles via `li::before`.
- **Section order (fixed):** hero → pitch (problem + solution + arch | sell-card + chips) → proof → packages → CTA footer.

### Sales deck (.pptx)
- **12192000 × 6858000 EMU = 13.33 × 7.5 in** (16:9). Template = the SoftServe EMEA master (see `.claude/references/softserve-deck-kit.md`; full template at OneDrive root `Presentation templates/BEST_TEMPLATE_Oracle SoftServe EMEA Business Alignment July 2026.pptx`).
- **Layouts used:** `Title-AI` (cover), `ShortTitle-Empty` (all content slides). The exec-summary/section decks use `Title-1Column`, `1_1-Title`, `Close`, `Divider-Orange-Gradient`, `Contents-Black`, `Title-Table`.
- **Standing geometry (inches):** running header placeholder @ (6.79, 0.31) 5.48 × 0.23 · slide-number @ (12.33, 0.22) · `Title 2` @ (0.39, 1.40) 11.80 × 0.95 · content left margin **0.42**, full content band **12.49** wide · two-column cards 6.02 wide at x = 0.42 and 6.89 · four-card grid 6.00 × 2.00 at x = 0.42 / 6.72, y = 2.48 / 4.76.
- **Package table:** 12.36–12.49 in wide, 4 columns (label + 3 tiers), 10–11 rows; legend line as a separate TextBox at y ≈ 6.63–6.84, 0.18 in tall.
- Speaker notes carry live review comments ("Efficiency KPIs <> Analytics", "Range is too wide", "Integration- emphasize more") — the skill should not reproduce them.

### Feature list (.docx)
- **Sep-10 columns (5):** `Area · Category · Features · Current status · Standard customization scope`.
- **Jul-07 columns (6):** `Area · Category · Features · Initially available in the Oracle accelerator pack · Currently implementation status (by SoftServe) * · Custom work`.
- `Area`, `Category`, `Current status` and `Standard customization scope` cells are **merged down** across their feature rows — only the first row of each group carries text.
- **Status glyphs:** `●` (U+25CF) in two colours + `○` (U+25CB); footnote markers `*`, `**`, `***` appended inline to the glyph (e.g. `●***`).
- Leading paragraphs: an all-caps kicker `SOFTSERVE × ORACLE ·` (Jul-07 adds `· OCI AI ACCELERATORS · NVIDIA cuOpt`), H1, then `App.` (Sep-10) or `Scope.` / `Verticals.` / `About this matrix.` (Jul-07) run-in bold paragraphs.

### Mini-site listing (`content.js` → `window.SITE_CONTENT.products[]`)
Per-product keys, in file order — this **is** the listing schema:
`slug · name · headline{accent,rest} · category · categoryChip · facet · oneLiner · shortLine · heroCaption · tags[] · hero{image{file,alt,focal}} · tile{outcomes[]}`
`overview{ problemSolution{problem{title,text,icon},solution{…}} · metrics[]{value,label,qualifier,icon} · metricsNote · roi{icon,text} · features[] · featuresNote · featuresDetail[]{title,body} · industriesNote · steps[]{n,title,text,image,features[]} · industryCases[]{industry,label,image,problem,solution} · scope{in[],out[]} · moreDetail[]{title,body} · caseStudy{descriptor,area,industry,status,metrics[],story,scope[]{label,value},ndaLine,downloadLabel} }`
`technology{ narrative · stack[]{key,label,summary,vendors[],items[]{name,required,direction,note}} · capabilities[]{stage,items[]{name,state}} }`
`jumpstart{ title,promise,durationShort,pillars[]{key,title,text},outcomes[],timeline[]{label,text},needs[],investment{price,duration,includes[],footnote},next[]{tier,text,duration,price},cta{label,route} }`
`sellers{ materials[]{key,title,description,state} }`
Separately, `diagrams.js` → `window.SITE_DIAGRAMS[slug] = {layout:"flow"|"hub", sources[]{title[],sub[]}, group{label[],nodes[]{title[],sub[]}}, target{title[],sub[],accent}, loop|note}` (title/sub are pre-broken line arrays).
Schema doc: `outputs/oracle-solutions-site/docs/SCHEMA.md` (§`products[]`, §`overview`, §`technology`, §`jumpstart`, §`sellers`). Rules that bind the skill: a number never renders without its footnote; `string?` absent = block does not render; absence renders as an empty instance or nothing, never as a "missing" sentence.

### Interactive demo (`site/demo/<slug>/`)
Four files, no build: `index.html · demo.css · demo.js · data.js`. `data.js` assigns `window.<PACK>_DATA` via an IIFE and returns a flat object — for WfO: `days, weeks, period, holidays, map, zones, zone, techs, tech, changes, plans, flagsFor, region, pickerFiles, inputSheets, stages, reoptStages, uploadWarning, settings, sources, exportColumns, priorHistory, user, jobTypes, slaTypes, suggestedComment, capacityPerDay`. `settings` = `{mode, horizon, capacity, minimalDisruption, objectives[]{name,desc,weight}, rules[]{name,type,desc}, regions[]{name,state,zones,techs}, connectors[]{name,state,dir}}`. URL switches `?tour=off`, `?ui=clean`. Map is inline SVG on a 1000 × 300 canvas (no tiles — claude.ai artifacts block external hosts). Build brief and pitfalls: `outputs/oracle-solutions-site/docs/HANDOFF-workforce-demo.md`.
