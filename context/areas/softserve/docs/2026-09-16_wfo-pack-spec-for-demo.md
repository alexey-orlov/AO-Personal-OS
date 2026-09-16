# Workforce Optimization pack — spec distilled for the interactive demo (2026-09-16)

_Purpose: everything a session WITHOUT this Mac's OneDrive needs to build the Workforce optimization walkthrough the way the Large docs one was built. Distilled from the pack's own documents and the delivered PoC's user guide, requirements and KPI methodology. Source files (SoftServe OneDrive, this Mac only): `Projects/Oracle/Packs/Workforce optimization package/` — `Workforce Optimization - Sales one-pager - Oracle.pdf` (2026-07-13), `Workforce Optimization - Service packages - Oracle.pptx` (10 slides), `Workforce Optimization - Accelerator Pack one-pager.docx` (2026-09-10, the feature matrix), `Workforce optimization_productization.xlsx`; and `Projects/Oracle/Customers/Bosch/` — `BSH Work Zone Optimization PoC User Guide by SoftServe v3.docx`, `BSH PoC Requirements 1.6.docx`, `UC #3 Scope BSH – Work Zone Optimization with cuOpt.docx`, `KPI_Calculation_Methodology.pdf`. Site copy for the product lives in the repo: `outputs/oracle-solutions-site/site/data/content.js` (slug `workforce-optimization`)._

## 1. What the pack sells (sales one-pager + deck)

- **Pitch:** "Intelligent field-service planning with NVIDIA cuOpt on Oracle OCI: packaged from proof of value to enterprise scale." Solution headline **"Review the plan, not build it."** cuOpt ingests demand, availability, skills and constraints and computes the best technician-to-zone-to-job plan in minutes; dispatchers review it on a live map, re-optimize, and write the plan back to Oracle Field Service (OFS).
- **Problem:** dispatchers plan a mobile workforce by hand — work zones, technician assignments, dozens of rules and constraints → uneven workloads and under-used capacity · longer customer wait times · planning hinges on scarce senior dispatchers, new zones launch slowly.
- **Outcomes claimed:** Productivity ↑ · Capacity utilization ↑ · Customer wait time ↓.
- **Verticals (industry-agnostic framing for the demo):** residential appliance & white-goods repair · utilities (water, gas, electric) · telecom & cable · industrial, medical-device & IT-equipment service. Deck slide 3 gives one line per vertical (skills + spare parts + urgent call-outs; SLAs + outage spikes + crew certifications; tight appointment windows; asset-based engineers by skill/SLA/location).
- **Why it sells for Oracle:** natural OFS cross-sell (known endpoints, warm path), net-new OCI GPU consumption on top of the Fusion SaaS seat, repeatable across OFS customers with centralized dispatch.
- **Architecture on the one-pager:** OFS (technicians data, default allocations; field workforce & assignments) ⇄ Workforce Optimization app (optimization engine + dispatcher UI) ⇄ NVIDIA cuOpt (GPU-accelerated solver) on an OCI dedicated AI cluster; optimized allocations (zones, visits) written back.
- **Service packages (the S/M/L rows — the demo's generalization checklist):**

| | PoV · S | Roll-out · M | Scaling · L |
|---|---|---|---|
| Scope | Manual data import, limited rule set: prove the KPI gains on the customer's data | Full setup and integration, live at one location: no manual work, embedded in the workflow | Scaling across locations: heterogeneous rules and data workflows per region |
| Prices | €90K services · €4K/month infra · 2 months | €300–500K · ~€25K/month · 3–5 months | TBD · 3–12 months |
| Optimization rules & guardrails | ◐ foundational: zones, skills, planned absences | ● advanced: urgent jobs, crews, SLAs, inventory coupling | ●● region-specific rule sets |
| Re-optimization & feedback loop | — | ● feedback-driven re-optimization with alternative allocation options | ●● region-specific workflows |
| Analytics & efficiency KPIs | ● core KPIs predicted at scheduling | ● + execution-data feedback + custom analytics | ●● region-specific KPI sets |
| Oracle Field Service integration | — | ● in: staff, availability, bookings · out: allocations · in: factual durations | ●● multi-region |
| Additional data sources & BI | — | ● up to 5: booking system, inventory (parts), HR/WFM (availability), demand forecasting, BI | ●● |
| Deployment | ◐ | ● | ●● |

## 2. The feature matrix (accelerator-pack one-pager, 2026-09-10) — what "generalized" means

Area → features, with status (● OOTB · ◐ partial · ○ roadmap) and the standard customization scope:

- **Allocation rules.** Workforce availability rules: skill-based allocation ●, maximal load per day, planned-vacation reallocation, same-day sickness handling. Distance-based: max distance / travel time ○ (custom: real-time traffic). Dynamic: within-day job reassignment ○, urgent / emergency handling. Work-zone-based: default work zones per technician ●, zone-level demand, neighbouring zones, cross-zone allocation of selected technicians. Forecast-based allocation ● (forecast data provided). Commitment-based: non-movable appointments ●, different SLA types per appointment. Other: spare-parts availability ○, crew-based assignments, custom rules. **Optimization function & rule weights:** multi-objective (productivity, waiting time, workload balance) ●, hard/soft rule weighting, minimal disruption of the current allocation.
- **Review and approval workflow.** Dispatcher UI with map and table views ●; dispatcher approval / rejection; model-decision explanations and recommendations; **feedback loop** ○ — iterative feedback-based re-optimization, human-feedback-driven tuning, alternative allocation options (what-if).
- **KPIs and analytics.** Productivity (jobs / technician / day) ●, capacity utilization, travel reduction, workload balance, baseline vs optimized comparison; custom KPIs and formulas per customer.
- **Integrations.** Oracle Field Service as source/destination ○ (roadmap), demand-forecasting source, visits-booking system, inventory for spare parts, HRM for people availability, BI exports.
- The Jul-7 standard-vs-custom split (wiki, `oracle-packs.md` Pack 1): business logic (allocation rules, constraints, KPI formulas, forecasting) is per-client custom; the UI + approval workflow is the most reusable part; distance-based (zoneless) planning is effectively a separate future product.

## 3. The delivered product — flow, screens, information model (PoC user guide v3, requirements 1.6)

This is what the demo must resemble. Sanitized: no customer geography, zone names or IDs.

**Glossary the UI uses:** Work zone (a geographic service area = a set of ZIP/postcode units with planned visits) · Technician (skills + availability; generalist or specialist) · Allocation (technicians → work zones for selected working days) · Original allocation (from the uploaded input) · Optimized allocation (proposed by the app) · Dispatcher decision (approve / reject per zone, with an optional comment).

**Flow (the user guide's chapters, in order):**
1. **Run optimization** — select **Region** (location) and **period** (up to 4 weeks) → upload the **XLSX input file** (required sheets: technicians with skills and home ZIP; work zones with their ZIPs; skills / special skills; visits/jobs with appointment date, booking date, postcode, required skill, optional spare-parts and non-movable flags; technician calendars with day status and capacity) → validation errors name missing sheets/fields → click **Optimize** (up to 20 min in the real product).
2. **Dashboard opens** with the optimized allocation: a **map** (zones as areas, technicians as points) and **tables**.
3. **Work with the map** — click a zone → its ZIPs, assigned technicians, working days, task counts; click a technician → assigned zones, skills, home location, visits by date.
4. **Compare** original vs optimized on the map (the table shows optimized only).
5. **Filter** by work zone or technician (map highlights, table follows).
6. **Table → Zone View** — allocation per zone per day, the **waiting-time KPI before/after**, and the **decision controls: Approve · Reject · Comment** per zone (only here, not in Technician View). **Table → Technician View** — zone per technician per day with **productivity and capacity KPIs before/after**, plus a legend.
7. **Export** — Download the optimized results as a file including decisions and comments (the PoC is file-based; OFS write-back is the Roll-out tier).

**Planning modes in the requirements:** *roster mode* (stable recurring technician-to-zone pattern for a horizon of 2+ weeks) vs *visit-level*. Stability rules: zone assignments should not churn short-term; already-booked appointments are a core input; non-movable appointments stay; skill compatibility is enforced (at least two skill groupings); two-technician jobs out of PoC scope.

**KPIs (methodology doc, exact rules):**
- **Productivity** = for each technician, total jobs ÷ number of days with ≥1 job; headline = simple average across technicians; 2 decimals.
- **Capacity utilization** = round(jobs ÷ (working days × 7) × 100), capped 0–100%; the model assumes at most **7 jobs per working day**.
- **Average wait time** = booking date → appointment date in whole calendar days, averaged; computed per plan (current vs optimized) like-for-like.
- All three shown before/after for the same planning window.

**Technical shape (UC #3 scope):** data ingestion (CSV/XLSX, traffic API) → travel-matrix service → optimization core (cuOpt + pre/post-processing) → persistence → dispatcher dashboard (React + map view) → API gateway; OCI GPU compute (A10 for the PoC), OKE/containers, DB 26ai.

## 4. Figures and prohibitions for anything external-facing

- **Cleared external-safe figures (the site uses these):** 83% of 12 simulations positive · median **+4.5% jobs/technician/day** · 15–20% dispatcher productivity · ~5× three-year ROI · **no € figures** · customer anonymized as "a global home-appliance manufacturer" (`outputs/oracle-solutions-site/docs/PROVENANCE.md` §4). The one-pager's own "~30 min vs ~2 days", "up to +26%" and "€190K/month" are illustrative PoV claims — do not put them in the demo.
- **The rejected screenshots (ASSETS.md §1):** the real PoC captures exposed the customer's service-zone geography (municipalities, an airport), its zone-naming convention, zone counts, ten-digit technician IDs and per-technician uplifts far above the cleared median. **The demo must run on a fictional metro with invented zone names, synthetic technician names/IDs, and deltas inside the cleared band.**
- **No external map tiles.** claude.ai artifacts block every external image/tile host, and real geography is off limits anyway → draw the map as inline SVG (a fictional metro: zone polygons, technician home points, a river or ring road for realism).

## 5. What the Large docs walkthrough established (reuse, don't reinvent)

`outputs/oracle-solutions-site/site/demo/large-document-extraction/` — plain HTML/CSS/JS, no build; a guided tour engine (`STEPS[]` with target / anchor / side / auto, a click guard that only lets the designated control through, Skip = auto-perform, an end card); URL switches `?tour=off`, `?ui=clean`, `?doc=…`; two documents sharing one flow; schema-specific columns per group; validator kinds with different actions; mock processing stages; a History/audit trail; toasts for mocked downloads and sends. `tools/capture-demo-frames.mjs` drives it in headless Chrome (tour QA, `MODE=frames` step captures, `MODE=script` data-driven scenarios). Docs: site `README.md` ("The interactive walkthrough"), `docs/CONFIG.md` §3 (`demoUrl`, `demoPreviewUrl`), `docs/ASSETS.md` §1 (frame crops), `docs/PROVENANCE.md` §16.
