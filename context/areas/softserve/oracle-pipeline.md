# Oracle engagements — pipeline status

_Source: Miro board **"INT Oracle Program"**, **June** view (marked **Confidential**). Screenshot shared by Alex 2026-07-13; this is the program manager's live pipeline tracker. Sibling boards exist on the same Miro (tabs: Henkel Program, REWE Stakeholders, RX PoC, Oracle AIDP, Schwarz Program, Montblanc) — not captured here._
_updated: 2026-08-18_

The single structured source of truth for **who is in the Oracle/NVIDIA accelerator-pack pipeline, at what commercial stage, and worth how much**. Complements the narrative in [oracle.md](oracle.md) (strategy/decisions/people) and the org map in [oracle-team.md](oracle-team.md). Twelve opportunities across four status bands.

> **Priority signal (2026-07-22 Neil+Gero session):** of the NVIDIA-funded pipeline, Oracle flags **NHS, Belron, and KPN** as the **most-certain upcoming opportunities** — all three currently sit in the **"Next"** band below (NHS & KPN = AIQ, €198.5k / 15 wks each, Gero owns; Belron = VSS, €171k / 12 wks, Milo Honegger owns). Oracle also offered to **add SoftServe to its pipeline-review calls** so SoftServe can see / scope / engage directly (Oracle to follow up). Separately, Oracle projects **~1,000 AI-Lakehouse + 100s AIDP qualified leads** from its Sept events at **15–20% → PoC** — a forward lead-gen funnel that will feed this pipeline. (chat, 2026-07-23)

## Delivery status — 2026-08-18 (Oracle AI Tech SteerCo)

_Portfolio review across DHL · NHS · SBG · Belron · Bosch · Sky · Riyadh at the "INT Oracle AI Tech SteerCo" (organizer Volodymyr Chornyy, 8 participants incl. Bohdan Khomych). **This section is current truth where it disagrees with the June board tables below.** Speaker attributions in the source note are hedged (Speaker A/B/C), so owners are named only where the note names them._ [SteerCo 2026-08-18](calls/oracle/2026-08-18_124942_default_202608181205216609E8E0.md)

- **DHL — Client Compass (AIQ):** kickoff **slipped again to Aug 27** — the client changed its briefing/completion format and asked to move the start; workshop days **27 · 28 · 31 August**, then a **September start on a 3-month engagement**. **OCI setup is done by Oracle's BlackBelt team** — a setup SoftServe has no prior experience with. Two scope questions are open before the workshops: whether **Oracle provides an accelerator or the build goes fully custom on AIQ**, and whether **Oracle co-builds the custom UI or leaves UX/360 to SoftServe** (on Bosch it left it to SoftServe) — needs alignment with the Oracle/"Madresa" side on the change they introduced. **Contact with Oracle's product team has gone stale**: the prior contact moved to a compute / "TPU-related" department (= Vishnu's [Jun-23 move](oracle.md#snapshot), inferred) and the **new product lead** (transcribed **"Polkov"** — likely **Pulkit Sindhwani**, inferred) must be re-approached, LinkedIn as fallback, otherwise re-open the channel via "Hero" (Gero or Hamad — unresolved in the transcript).
- **NHS — complaints analysis (AIQ):** still **no confirmed start date — October likely, September possible**. The blocker remains **data-privacy alignment**. Judged deferrable by a month without major impact.
- **SBG — AI-Powered Document Intelligence (AIQ, ~€170k): the live one**, "one of the largest after DHL"; the second SBG deal (**QOP / workforce planning**) runs in parallel. **Scoping workshop #2 (2026-08-17) went fine but missed its goal — scope not finalized.** Three stakeholder groups (governance · management · engineering/execution · project control attended; **PMO largely silent**) with partly competing interests must **jointly pick one use case**. **Value hypothesis:** the client's own stated biggest inconsistency is the **handoff between tender and control/execution** (teams in silos) → link the two by feeding **historical project records into tender planning**, then **assist/improve post-tender documents**. Of three scope options discussed (one nobody could recall), stakeholders lean to a **partial-AI flow — manual input + AI validation via AIQ**, not full automation. **Expectation deliberately set that this is an Oracle/NVIDIA-funded experiment, not a production solution** — useful cover, though delivery quality still matters. Two notable workshop inputs: **no transparency into how project managers pick vendors** ("no comments" when relationship-based decisions were raised), and a **new "strategic planning" department** whose stated goal is to penetrate that PM black box. **Blocker:** the client sent a **data file before the meeting that SoftServe has no access to** — needed to judge feasibility. **Plan:** finalize the case + proposal, review the client data, validate estimates and **send the SoW to Oracle next week**; wrap-up targeted within ~two weeks.
- **Belron (VSS):** **contract/funding from Oracle in place**, indicative **September start**, dependent on the tender — the client appears set to move ahead, **possibly with two vendors**. An additional **+€80k proposal for a Discovery of the next mobile applications** is in. Team named: **Serhii Tychenko, Oleh, Serhii Molodtsev, Leonid**. **SoW signed; the NVIDIA-side signature is believed still outstanding** — at the 2026-08-17 meeting an **NVIDIA contact was unaware the funding was signed**, politically awkward, so a cleanly framed status note is wanted. Friction flag: **partner-side communication isn't being shared with SoftServe** and SoftServe wasn't included in their planning calls.
- **Bosch — Work Zone Optimization (cuOpt): parked as pending on the business case.** The client (**Michael**) asked whether the system can be adjusted to be more scalable / cover broader scope, but **there is no strong case for the investment** — the claimed **~€1M savings is a stretch; realistically ~€300k per year of forecasting against a ~€450k implementation estimate** (which can be cut). Engine tuning gave nothing (job-per-time limit raised 6 → 7–8, no result). **Metric dispute:** the productivity gain was measured on **field engineers** (PoC ~15–20% in some locations, **2.2% in one**) and then **extrapolated to dispatcher headcount** — possibly incorrectly, since dispatcher time saved may not have been counted properly; **KPIs change often, so Friday's results need validating before use**. Ongoing friction with the product team over acceptance — the solution **needed manual adjustment per new contract, wasn't scale/production-ready and had no integration** (expectations were set up front). A **release drop landed 2026-08-17, not yet tested**. A **Hamad ↔ Riyan meeting in London this week (Thu or Fri)** may be joined by Bohdan/Olia — unconfirmed.
- **Sky Group — cuOpt fleet management (was "Unknown status"): now an active proposal.** The presentation is being **trimmed and re-cut to add the approach and SoftServe's project vision**, then goes to **Bohdan for review** (pending Oleh's input) and a call is set up. **Main risk: it is an optimization case with no known baseline** — planning time would be saved, but the size of the optimization against their current manual approach is unknown and no metrics exist; optimization data may exist (**Deepak's / Cambridge Consulting work**), a manual-approach baseline likely does not. **Stance: soften commitments so the baseline is established inside the PoC rather than committed up front**, and raise the baseline gap as a separate formal topic with the client. The **client is pushing for a September start**, so a **deadline for having all contracts signed** is to be set. **Staffing:** needs a strong technical or product lead — **Vitya** (recent CMX Energy experience with NVIDIA-based model development, more capacity from next week) is the suggested fit, **Denys** considered for solution support; product side leans on **Vladyslav / Leonid**.
- **Riyadh (Riyadh Air, inferred):** **~10 threads** and a **large program being organized with Oracle** — strong traction; unclear whether other vendors or the client's own professional services are involved. Open alignment points: **managed service / territory design**, and **cost loading for infrastructure covering several use cases**.

## Legend

**Commercial funnel** columns are the deal-progression milestones: **mini SOW** (initial small SOW) → **MDF** (Market Development Funds — NVIDIA/Oracle co-marketing money) → **NDA** → **SOW** (full statement of work) → **PO** (purchase order).
- ✅ = done (green check)
- ✖ = not done (circle-X). Board colours it **orange** = active blocker / attention needed, **grey** = not yet started _(inferred from colour)_.
- ◐ = in progress / partial (a greyed, not-green check — e.g. KPN MDF)
- – = not shown / not yet applicable

**Delivery timeline** (Mar–Sep '26) uses moon-phase glyphs per month, with milestone dates annotated in-cell. Exact Miro legend not shown → read _(inferred)_ as: ● full = active/peak delivery month or completion · ◑ half = ramping up, or winding down through UAT/acceptance · ○ empty = planned, no activity yet.

## Opportunities

| Opportunity | Client | Pkg | HQ | Industry | POC value | POC dur. | Risk | Oracle priority | Oracle owner |
|---|---|---|---|---|---|---|---|---|---|
| **— Active —** | | | | | | | | | |
| Work Zone Optimization with cuOpt | Bosch | cuOpt | Germany | Manufacture | €124k | 10 wks | Medium | High | Gero Gunkel |
| Intelligent Document Information Extraction | Riyadh Air | AIQ _(inf.)_ | SA | Airlines | €68k | 8 wks | Medium | High | Hammad Hussain |
| **— Next —** | | | | | | | | | |
| DHL Client Compass | DHL | AIQ _(inf.)_ | Germany | Supply Chain / Logistics | €226k → 192k | 12 wks | **High** | High | Gero Gunkel |
| AI-assisted research analysis of operational complaints (AI-Q) | NHS | AIQ | UK | Healthcare | €198.5k | 15 wks | **High** | High | Gero Gunkel |
| AI-Powered Document Intelligence (AI-Q) | SBGOM (SBG) | AIQ | SA | Construction | €171k | 12 wks | Medium | High | Gero Gunkel |
| Belron | Belron | VSS _(inf.)_ | UK | Automotive services | €171k | 12 wks | Medium | High | Milo Honegger |
| AI Video Compliance Review (VSS) | Channel 4 | VSS | UK | Media | €83k | 6 wks | Medium | High | A. J. (Adrian James) |
| KPN telco customer service AI assistant (AI-Q) | KPN | AIQ | ND | Telco | €198.5k | 15 wks | Medium | High | Gero Gunkel |
| **— Pending —** | | | | | | | | | |
| Workforce Planning & Scheduling with cuOpt | SBGOM (SBG) | cuOpt | SA | Construction | €120k | 10 wks | Medium | High | Gero Gunkel |
| Nesma & Partners | Nesma & Partners | AIQ _(inf.)_ | SA | Construction | €151k | 12 wks | Medium | High | Milo Honegger |
| Simulation Acceleration with Physics NeMo | OMV | Physics NeMo | Austria | Oil & Gas / Energy | €120k | 12 wks | Medium | Low | Gero Gunkel |
| **— Unknown status —** _(June board; Sky has since moved — see [2026-08-18 status](#delivery-status--2026-08-18-oracle-ai-tech-steerco))_ | | | | | | | | | |
| CuOpt Fleet Management | Sky Group | cuOpt | UK | Media | – | – | Medium | Low | A. J. _(partly cut off)_ |

_HQ codes: SA = Saudi Arabia · ND = Netherlands · UK · Germany · Austria. Pkg inferred from opportunity name + the [oracle.md](oracle.md) case mapping where the board doesn't label it._

## Commercial funnel (deal stage)

| Opportunity (client) | mini SOW | MDF | NDA | SOW | PO |
|---|---|---|---|---|---|
| **— Active —** | | | | | |
| Work Zone Optimization (Bosch) | ✅ | ✅ | ✅ | ✅ | ✅ |
| Intelligent Doc Extraction (Riyadh Air) | ✅ | ✅ | ✅ | ✅ | ✅ |
| **— Next —** | | | | | |
| DHL Client Compass (DHL) | ✅ | ✅ | ✅ | ✅ | ✅ |
| Complaints analysis (NHS) | ✅ | ✅ | ✖ orange | ✖ orange | ✖ grey |
| Doc Intelligence (SBG) | ✅ | ✅ | ✖ orange | ✖ grey | ✖ grey |
| Belron | ✅ | ✅ | ✖ orange | ✖ orange | ✖ grey |
| Video Compliance (Channel 4) | ✅ | ✅ | ✖ orange | ✅ | ✅ |
| Telco assistant (KPN) | ✅ | ◐ grey | – | – | – |
| **— Pending —** | | | | | |
| Workforce Planning (SBG) | ✅ | ✅ | ✖ orange | ✖ grey | ✖ grey |
| Nesma & Partners | ✅ | ✖ orange | – | – | – |
| Simulation / Physics NeMo (OMV) | ✅ | ✅ | ✖ grey | – | – |
| **— Unknown —** | | | | | |
| CuOpt Fleet Management (Sky Group) | – | – | ✖ grey | – | – |

## Delivery timeline (the two Active + DHL)

_June board view — **superseded for DHL, Belron, Bosch and Sky** by the [2026-08-18 status](#delivery-status--2026-08-18-oracle-ai-tech-steerco) above (DHL now starts Aug 27 → September; Belron indicative September; Bosch parked; Sky in active proposal, client pushing September)._

- **Bosch — Work Zone Optimization (cuOpt):** Apr ● (kickoff 02.04) · May ● · Jun ◑ (**delivered 11.06, in UAT**) · Jul ◑ (**due 09.07**) · Aug ○ · Sep ○. Client contact: **Mikhail Arzamastsev**, Head of CoE, WFM Solution, Field Service.
- **Riyadh Air — Intelligent Document Information Extraction (AIQ):** Apr ◑ (14.04) · May ● · Jun ◑ (**delivered 09.06, in UAT**) · Jul ◑ (**due 07.07**) · Aug ○ · Sep ○.
- **DHL — Client Compass (AIQ):** ramping — Jul ◑ · Aug ◐ · Sep ● (target). Full commercial stack already closed (PO ✅).
- NHS shows Aug ◑ · Sep ○; SBG-doc shows Sep ○ — planned starts, not yet begun. Remaining Next/Pending/Unknown rows carry no timeline yet.

## What this adds / reconciles vs. the narrative wiki

- **Oracle owners now named per deal** — resolves earlier inferences in [oracle.md](oracle.md)/[oracle-team.md](oracle-team.md):
  - **Hammad Hussain** owns **Riyadh Air** → confirms the wiki's "Hamad ≈ Hiro" (Middle East regional AI director / integration-vision champion).
  - **Milo Honegger** = full name for "Milo" (owns **Belron** + **Nesma**; also the AIDP sales/partner lead).
  - **A. J. = Adrian James** (UK regional AI director) owns **Channel 4** + **Sky Group**.
  - **Gero Gunkel** owns the bulk: Bosch, DHL, NHS, both SBG deals, KPN, OMV.
- **SBG (Saudi Binladin Group) has TWO opportunities**, not one: doc intelligence (AIQ, *Next*) **and** Workforce Planning & Scheduling (cuOpt, *Pending*) — both past mini SOW + MDF. (Wiki had SBG as "discovery-stage, not in the productization pipeline" — now concretely two-deep.)
- **OMV — Simulation Acceleration with Physics NeMo** (Oil & Gas, Austria) is a **new pipeline entry** not in the wiki's 8-named-customer list; the first NeMo/simulation deal with a client attached.
- **Channel 4** (VSS, media) now carries **SOW ✅ + PO ✅** — furthest-along of the "Next" band commercially despite the open NDA.
- **DHL NDA now ✅** — closes the wiki's open question ("debating whether existing Oracle-customer status removes the NDA need").
- **Both Active POCs delivered & in UAT** (Bosch 11.06, Riyadh Air 09.06), full mini SOW→PO stack closed on both.
- **POC financials captured** (new): total pipeline value ≈ €1.6M across 11 costed POCs; largest = DHL €226k→192k, NHS & KPN €198.5k each; smallest = Riyadh Air €68k, Channel 4 €83k.
- **Name reconciliation:** "Riyadh Air" = the wiki's Riyad Air / "RIAD" / "Rioter"; "Work Zone Optimization" = the Bosch cuOpt workforce case; "AI-Q" = AIQ.
