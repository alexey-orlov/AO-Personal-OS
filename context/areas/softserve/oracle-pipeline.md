# Oracle engagements — pipeline status

_Source: Miro board **"INT Oracle Program"**, **June** view (marked **Confidential**). Screenshot shared by Alex 2026-07-13; this is the program manager's live pipeline tracker. Sibling boards exist on the same Miro (tabs: Henkel Program, REWE Stakeholders, RX PoC, Oracle AIDP, Schwarz Program, Montblanc) — not captured here._
_updated: 2026-07-13_

The single structured source of truth for **who is in the Oracle/NVIDIA accelerator-pack pipeline, at what commercial stage, and worth how much**. Complements the narrative in [oracle.md](oracle.md) (strategy/decisions/people) and the org map in [oracle-team.md](oracle-team.md). Twelve opportunities across four status bands.

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
| **— Unknown status —** | | | | | | | | | |
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
