# NATO AI use-case map — Oracle Defense stream (working report)

_status: working report for Alex's brainstorm → feeds the use-case suggestions owed in Karsten's shared thread (~Fri 2026-09-04) and the AI-packs ↔ needs alignment with Oksana + Denys_
_updated: 2026-09-03_
_scope: four angles requested — (A) defence-AI clustering coverable by OCI + NVIDIA / AI Lakehouse / AIDP with SoftServe services on top · (B) what NATO already runs on Oracle · (C) SoftServe's delivered defence base (FreeTech one-pager) · (D) the existing Oracle use-case map adapted to NATO — then a starting-point list and a ≤12-case PoV menu_
_sources: [oracle-defense.md](../oracle-defense.md) (stream page) · [oracle-ai-offerings.md](../oracle-ai-offerings.md) · [oracle-pipeline.md](../oracle-pipeline.md) · the ["patterns" Google Sheet](https://docs.google.com/spreadsheets/d/1RXbabrjupmJPpMr80VKyB_SSjDZ4o9r4rYWe0hNSQN4/) (7 L1 × 24 L2, 2026-07-10) + its [AIDP-NVIDIA-OracleAI mapping twin](https://docs.google.com/spreadsheets/d/1KA-Ad5d-3eB7gAKnyO5m7FlmKORSI4JoNoZyPcwS1I4/) (the deck's 83-card map with fit columns) · the ["Productization use cases × AI Accelerator Packs" sheet](https://docs.google.com/spreadsheets/d/1wMe7VtcKW5tj_nYKwxOS_TII5Oh-N_0BlRFfjwKelaQ/) (2026-06-18) · Oracle×NVIDIA "Live Demo Day" webinar summary (Drive PDF, Jun 2026) · [AI Lakehouse Quick Start use cases](https://docs.google.com/spreadsheets/d/10x489OhM_ElzEiXCPSEdRn9gktEIjaO9JFsR39waAds/) (2026-08-22) · web research 2026-09-03 (labeled per claim; see §4, §3 and Sources)_

> **Labels used:** [Fact / source] · [Practitioner consensus] · [Inference] · [Speculation] · ⚠ gap. Repo-internal facts (calls, chats, sheets) are cited as (wiki: …). Nothing below has been shared with Oracle yet.

---

## 0. The answer in one screen

**Recommendation.** Lead the menu with **7 "MENU-now" cases** where an existing OCI AI Accelerator Pack (or a SoftServe productized row) intersects a FreeTech-proven capability and an unclassified/synthetic data path exists — those are 4–8-week, ~€60–100K PoVs with a UI a general can see. Add **3 "MENU-differentiator" cases** that only SoftServe can credibly bring (signals, autonomy dev-loop, physics twins) but which need a synthetic-data or engineering-partner framing to be demoable. Keep **2 "MENU-Oracle-native" cases** that ride Oracle's own strengths (sovereign data layer + Nemotron) so the menu also sells OCI consumption, not just SoftServe hours. Everything kinetic (targeting, interceptors, terminal guidance) stays **off the menu** — it fails the PoV-risk criteria and NATO's Principles of Responsible Use framing (§2).

| # | Use case (working name) | Cluster | PoV scope — one line | Why it is a good fit — one line | Reuse base | Karsten topic | Tier |
|---|---|---|---|---|---|---|---|
| 1 | **ISR footage search & summarisation** (drone / FMV / CCTV archives) | ISR & intelligence | Index a customer-supplied or open drone-video archive on OCI (VSS pack), NL search + timestamped event summaries + reviewer annotations, 6 wks | Exact fit to the shipping VSS pack (Channel 4/Belron skins) and to FreeTech #06 edge-vision proof; visual, demoable on open datasets, no classified data needed | VSS pack ✅ · Channel 4 · Belron · FreeTech #06 | 1, 2 | MENU-now |
| 2 | **Multi-source intel fusion & daily brief (OSINT-first)** | ISR & intelligence | AIQ deep-research agent over open sources + customer document sets → cited INTSUM-style briefs and entity dossiers, analyst approve/edit UI, 6–8 wks | Direct analogue of FreeTech #02 (Foresight analytics) and of the DHL "Client Compass" build; Nemotron reasoning + NeMo Retriever is exactly what NVIDIA is pitching to Gov | AIQ starter kit ✅ · DHL · FreeTech #02 | 2, 3 | MENU-now |
| 3 | **Doctrine / STANAG / technical-manual assistant** (multilingual, sovereign) | Enterprise & knowledge | Knowledge Chat Agent pack over a public corpus (STANAGs, doctrine, S1000D/IETM-style manuals) + one customer corpus; cited answers, role-scoped access, 4–6 wks | Flagship pack deploys ~as-is; Nesma/NHS/KPN harness work covers the permission layer every NATO buyer will ask for; multilingual by construction | Knowledge Chat pack ✅ · Nesma · AIQ harness | 5, 2 | MENU-now |
| 4 | **Defence procurement & contract document intelligence** | Enterprise & back-office | Document Extraction pack on tenders / contracts / maintenance & movement records → validated fields + human-review queue written to the system of record, 6 wks | Proven on Riyadh Air (3–5 days → 15 min per contract, 90–95% accuracy) with a dedicated pack; sells to agencies (NSPA/NCIA-type) and to miltech suppliers alike | Doc Extraction pack ✅ · Riyadh Air | 2 | MENU-now |
| 5 | **Fleet readiness & operations control tower** | Logistics & readiness | Synthetic-or-customer fleet/maintenance/mission data in Autonomous AI Lakehouse → readiness dashboard + exception-watchdog agent + maintenance-planning view, 6–8 wks | FreeTech #04 delivered exactly this; Denys' "simplest, most visual" pick; carries the only natural AIDP/Lakehouse doorway on the menu | FreeTech #04 · Lakehouse QS #4 (Real-Time Ops Watch) · Bosch UI patterns | 2, 3 | MENU-now |
| 6 | **Mission logistics optimisation** (convoy/resupply routing · maintenance-crew scheduling) | Logistics & readiness | cuOpt Route Optimizer pack on open maps + customer demand file; risk-layer constraints; before/after KPI harness; 6 wks (routing) or 8 wks (scheduling skin) | Two shipping cuOpt packs + Bosch WfO proof (2 days → 30 min); optimisation is the one cluster where "GPU on OCI" is visibly the product | Route Optimizer pack ✅ · Bosch WfO · Sky | 2, 3 | MENU-now |
| 7 | **Coalition speech & multilingual reporting** (radio/meeting transcription, translation, summarisation) | Comms & interoperability | Nemotron Nano Omni / Riva ASR + Nemotron translation-summarisation pipeline on recorded nets and meetings; searchable log; 4–6 wks | Nemotron-native (one model for audio/OCR/video), sovereign by design, 32-nation problem; "ambient scribe" pattern already in the map | patterns L2 "Ambient scribe" + "Transform at scale" | 2, 5 | MENU-now |
| 8 | **RF signal clustering & pattern recognition** (SIGINT/EW support) | Sensors & signals | GPU clustering + visualisation of RF captures (customer or open SDR datasets) on OCI; operator UI for cluster labelling; 8 wks | FreeTech #03 delivered; nobody else in Oracle's partner bench has it; Karsten topic 1 verbatim | FreeTech #03 | 1 | MENU-differentiator |
| 9 | **Autonomy dev-loop on OCI** (synthetic data → train → sim-test for GPS-denied navigation / detection models) | Autonomy & unmanned | Stand up Isaac Sim/Cosmos-based synthetic-data + training + evaluation pipeline on OCI GPUs for one perception or navigation model; benchmark report; 8–10 wks | FreeTech #01 proof; turns "OCI must be the platform" into the miltech-company offer (drone makers need the loop, not the cloud); keeps kinetic parts out | FreeTech #01 · FreeTech #06 | 4 (non-kinetic end), 1 | MENU-differentiator |
| 10 | **Physics-informed digital twin / simulation surrogate** (UUV, platform or infrastructure physics) | Simulation & twins | Physics NeMo surrogate for one physics problem validated vs the incumbent simulator, served as an OCI API + Omniverse view; 8–12 wks | FreeTech #05 delivered; OMV Physics-NeMo pipeline row already scoped; Karsten topic 5 (training/continuous improvement) | FreeTech #05 · OMV | 5 | MENU-differentiator |
| 11 | **Cyber-defence investigation agent** (SOC alert → verdict, CVE triage vs asset inventory) | Cyber & information | AIQ case-investigation agent over open CVE/threat feeds + synthetic SOC alerts; containment proposals for approval; 6 wks | "SecOps investigation" is a mapped L2; NATO-nation cyber budgets are steady-state; OCI security services + Nemotron give an Oracle-native story | patterns L2 "SecOps investigation" · AIQ | 2 | MENU-Oracle-native |
| 12 | **Governed sovereign data layer for AI** (classification-aware row/column security across DB · Iceberg · agents) | Cross-cutting platform | Autonomous AI Lakehouse gold layer with VPD/masking/SQL-firewall policies + one role-scoped agent (same question, different answers by clearance); 4–6 wks | Turns Oracle's strongest defence argument (sovereign private cloud + data-layer controls) into a demo; regulated variant already designed in the Lakehouse QS sheet (#6) | Lakehouse QS #6 · NHS masking work | 2 | MENU-Oracle-native |

_Tier legend: **MENU-now** = pack-backed, demoable on open/synthetic data, 4–8 wks · **MENU-differentiator** = SoftServe-only proof, needs data/asset framing · **MENU-Oracle-native** = sells OCI/Lakehouse consumption first. Karsten topics: 1 Sensor & Detection Network · 2 Data Collection, Analysis & Comms Infrastructure · 3 C2 & Decision · 4 Air Defence / Interceptors / Counteractions · 5 Training & Continuous Improvement (wiki: oracle-defense.md)._

**What is deliberately not on the menu** (and why): pilot simulator on a game engine (Denys/Dmytro: no data, no asset library — bench); interceptor / air-defence / targeting (kinetic, export-controlled, un-demoable without classified data); full COA/wargaming decision support (needs C2 system data and a doctrine model — bench as phase 2 of #5). See §10.

**Suggested first wave for Karsten's thread (4 + 1):** #1 · #2 · #4 · #5, with #3 as the low-cost add-on. Reason: each has a shipping pack or GA data layer underneath, a FreeTech or pipeline proof, an open-data demo path, and a named NATO-side demand signal (table below). #6/#7 follow as fast seconds; #8–#10 are the "only SoftServe can" tier for the miltech conversation; #11/#12 are the Oracle-consumption tier.

**What the 2026-09-03 research changed in this picture** (detail in §3.2–§4): (1) Oracle's verifiable NATO position is the **enterprise tier** — NCIA's ERP is Oracle E-Business Suite + Fusion and NCIA picked OCI in Sep 2025 for "mission-critical workloads" and three data centres — while the **classified operational tier is Google (JATEC) and Palantir (Maven Smart System NATO)**; so the menu leads with enterprise, analytics, edge and national-MoD work, not classified C2. (2) **Nemotron on OCI is import-only** onto a Dedicated AI Cluster (Super since Mar 2026, Ultra needs B200_X4, Nano Omni in OCI Enterprise AI since ~May 2026) — a cluster line item in every PoV price. (3) Every funded source splits **mission vs enterprise, and the enterprise half is bigger** — Karsten's five topics omit enterprise/back-office, logistics/sustainment and cyber, the three most PoV-friendly clusters; the menu adds them deliberately. (4) The **UK MoD is on Oracle since 2026-01-14** and its Defence AI Centre playbook publishes case studies that map almost one-for-one onto #1, #3, #5, #6, #8 — the strongest single-nation doorway.

**Demand evidence per menu case** (named programmes, not "typically"; labels and sources in §3.3–§4.4):

| # | NATO / nation demand signal | Closest existing system (competitor or analogue) |
|---|---|---|
| 1 | DIANA 2027 "sensing & data processing for ISR"; UK DAIC "AI at the Edge"; Uranos KI (DE, €136M) | Avengers (UA, ~12,000 detections/week); Maven Smart System |
| 2 | NATO SITCEN OSINT AI Alerting Platform RFP (⚠ status unverified); 2024 AI Strategy adds disinformation/info-ops; DIANA "Data-Assisted Decision Making" | Griselda (UA, 28 s ingest-to-retrieval); AI FELIX (NATO ACT) |
| 3 | UK DAIC "Intelligent Search & Document Discovery", "LLMs for Defence"; GenAI.mil (3M seats); AI FELIX | GenAI.mil, Army Enterprise LLM Workspace |
| 4 | Task Force Lima enterprise bucket (finance, HR, procurement); NCIA's own EBS/Fusion estate | — (no NATO-side IDP programme found ⚠) |
| 5 | USAF PANDA/CBM+ (C3 AI, system of record); UK "Spare Parts Failure Prediction", "Typhoon Predictive Maintenance Optimisation"; DIANA "Critical Infrastructure & Logistics" | C3 AI PANDA |
| 6 | UK DAIC "Last-Mile Resupply"; DIANA 2027 "Responsive Logistics" | — |
| 7 | DIANA "Advanced Communications"; JATEC scope includes machine translation; NATO interoperability priority (2024) | Google (JATEC translation) |
| 8 | UK DAIC "RF Signal Analysis"; DIANA "Contested Electromagnetic Environments"; DARPA ARC/BLADE | BAE cognitive EW |
| 9 | DIANA "Autonomy & Uncrewed Systems" (2026) / "multidomain autonomy" (2027); Netherlands "synthetic data factory"; Avengers Labs (5M annotated frames opened to partners, Aug 2026) | Helsing, Quantum Systems, The Fourth Law |
| 10 | EDA "simulation" as a top-3 affected area; EDA TAID "Mission Training"; EDF-2026 M&S-supported AI | — |
| 11 | NCIA NCSC replacement (est. €27.1M); Leonardo AI multi-agent cyber platform inside PBN; DARPA AIxCC open-source cyber reasoning systems; EDA "Active Autonomous Cyber Defence" | Leonardo Global Cybersec Platform |
| 12 | EDA TAID "Data-Centric Security"; DIANA 2024 "Data & Information Security"; NATO Data Exploitation Framework + Data Quality Framework (Aug 2025) | Palantir (data on NATO servers) |

---

## 1. The frame — what Oracle asked and what constrains the answer

| Constraint | Source | Consequence for the menu |
|---|---|---|
| Oracle presents itself as **the major private cloud for NATO** and wants a sellable **menu of OCI-runnable defence/AI use cases** for NATO countries — **miltech companies + military forces** | Karsten chat ~2026-08-26 (wiki) — [Practitioner claim; **public evidence supports an enterprise-tier position only, inside a multi-cloud NCIA** → §4] | Menu must address two buyers with different jobs: forces/MoDs (operate) and miltech vendors (build); do not repeat the "major private cloud" line to a NATO buyer. |
| **Hard priority: must run on OCI.** AI Lakehouse / AIDP "not discussed — opportunistic at best" | Karsten (wiki) | Every case names its OCI footprint; Lakehouse appears only where it is the natural data layer (#5, #12). |
| **Customer undefined by design** ("we don't know anything, and need to think about all of those and beyond") | Karsten answering Alex's segmentation probe (wiki) | Structure by cluster + buyer, not by a single persona; make the menu a discovery instrument. |
| Asset base = **delivered Ukraine war work only** (FreeTech, 6 cases, non-Oracle); **no reusable assets** is the named gap | Denys, Bohdan (wiki) | Fit = FreeTech proof × Oracle pack; do not promise reusable code — promise a repeatable PoV shape. |
| NVIDIA angle = **Nemotron** ("#1 Public/Government topic at GTC; everyone will go for it") | Karsten from NVIDIA (wiki) | Every case states its Nemotron role; §3 carries what Nemotron actually is (research). |
| Karsten's 5 framing topics (1 Sensor & Detection · 2 Data/Analysis/Comms · 3 C2D · 4 Air Defence/Interceptors · 5 Training) | prep meeting 2026-08-19 (wiki) | Menu tags each case to a topic; topic 4 is covered only at its non-kinetic end. |
| **Sovereignty is the wedge**: militaries insist on on-prem; NATO accepts Oracle because it is a *private* cloud | Denys (wiki) | Prefer cases whose phase-2 path is Dedicated / Isolated Region + open-weight models (§4). |
| Deadline: suggestions in Karsten's thread **~Fri 2026-09-04**; team call was proposed for **Wed 2026-09-02** | wiki decisions | ⚠ gap — the Sep-2 call outcome is not in the wiki; if it happened, its steer supersedes §0's tiering. |
| Team's own reads: Control Tower = simplest/most visual (Denys) but "too back-end-ish" (Dmytro); simulator "not there yet"; reuse civil Oracle cases (Dmytro); reuse AI Packs × military expertise (Bohdan); "a path easy for our counterparts to consume" (Bohdan) | thread 2026-08-25/26 (wiki) | Every case gets a human-in-the-loop UI; the packs map (§7) is the spine of the menu. |

---

## 2. PoV fit criteria (scorecard used for §0 and §9)

Derived from what has actually cost SoftServe time on Oracle PoCs, not from a template:

| # | Criterion | Evidence it matters | How a case passes |
|---|---|---|---|
| C1 | **Data path without accreditation** — an unclassified, open or synthetic dataset exists so the PoV runs in a standard OCI tenancy; classified variant is phase 2 | SBG: access, not data, became the critical path (~2-week guest accounts, director sign-off) (wiki: sbg-poc) | Name the open dataset or synthetic generator in the scope statement. |
| C2 | **Baseline exists or is produced inside the PoV** | Sky (no baseline), Bosch (disputed metric) (wiki: oracle-pipeline 2026-08-18) | Scope line includes a before/after or side-by-side readout. |
| C3 | **W0 gate**: sponsor + success metric + data access signed before the clock starts | Lakehouse Quick Start design; Hammad: "people are very weary of pilots" (wiki) | Fixed scope, fixed duration; 4–8 wks; fee band €60–100K (WfO PoV €90K/2 mo; Lakehouse QS €30–50K/30–45 d; packs sheet: existing accelerator 4 wks/75K, new accelerator 12 wks/180K). |
| C4 | **GA components only** — an existing OCI pack or a SoftServe productized row underneath | Packs deploy in 30–40 min via Resource Manager/Terraform (webinar summary); packs judged to save only ~1 wk of boilerplate but they de-risk (wiki: 2026-07-01) | Column "Reuse base" in §0 must be non-empty. |
| C5 | **Visible artefact** — a UI a non-technical officer sees in 10 minutes | Hammad: "what do I hand a client at the end of a session"; Denys: "something feasible to SHOW"; Dmytro's "too back-end-ish" objection | Each card in §9 names the screen. |
| C6 | **Non-kinetic, non-lethal function**; no weapons-system integration; human decides | NATO Principles of Responsible Use (§4); export-control exposure for a Ukrainian-staffed vendor | Kinetic asks routed to "bench / partner-led". |
| C7 | **Repeatable across nations** — multilingual, STANAG/doctrine-agnostic, both buyer types | Oracle wants a menu for "NATO countries", not one MoD | Card states the second buyer. |
| C8 | **Nemotron / open-weight path** — the model layer can be swapped to Nemotron for the sovereign phase | Karsten's ask; packs ship Nemotron-pre-integrated (webinar) | Card names the Nemotron role. |
| C9 | **KPI readout, not ROI promise** | Bohdan's value-realisation discipline: over-promised ROI gets audited when funded money runs out (wiki: 2026-08-18) | Card names one operational KPI. |

Scoring in §9: ✅ passes · ◐ partially · ✖ fails.

---

## 3. Angle A — defence-AI cluster map, with OCI + NVIDIA + SoftServe coverage

_Clustering principle: **mission domain** (rows) × **AI capability pattern** (columns of the existing map + four defence-specific additions, §6). Named real instances per cluster come from the taxonomy research (§3.1, labeled) and are there so the brainstorm can say "X already does this" rather than "typically"._

### 3.1 The clusters

| # | Cluster (mission domain) | What it covers | Typical data / deployment | OCI + NVIDIA coverage | SoftServe coverage | PoV-friendliness [Inference] |
|---|---|---|---|---|---|---|
| A | **ISR & intelligence analysis** (multi-INT fusion, GEOINT/EO, FMV, OSINT) | fusion of reports/imagery/video/open sources into briefs, target folders, change detection | imagery, video, text; classified in ops, open-source variants exist; cloud + edge | VSS pack, AIQ pack (Nemotron + NeMo Retriever), OCI Vision, GPU shapes | FreeTech #02 (Foresight), #06 (EdgeInsight); DHL deep-research; Channel 4/Belron VSS | High on open data (drone datasets, Sentinel, OSINT); classified phase 2 |
| B | **C2 & decision support** (COP, COA analysis, wargaming, planning assistants) | situational awareness, plan generation/evaluation, staff assistants | structured C2 feeds + doctrine; classified; on-prem/mission networks | Data-analysis agents (Select AI, Lakehouse), cuOpt for planning sub-problems, AIQ | FreeTech #04 (control tower); Bosch WfO decision UI | Medium-low: needs C2 data; demo only on synthetic scenarios |
| C | **Autonomy & unmanned systems** (air/ground/sea/underwater; counter-UAS detection) | navigation in GNSS-denied, perception, swarming, mission autonomy; C-UAS sensing | sensor logs, sim data; edge deployment; cloud for training/sim | OCI GPUs for training, Isaac Sim / Cosmos / Omniverse (verify OCI availability §3.2), NIM at edge (Roving Edge — verify §4) | FreeTech #01 (last-mile autonomy), #06 (edge CV) | Medium: dev-loop PoV is demoable; the vehicle itself is not the PoV |
| D | **Logistics, sustainment & readiness** (predictive maintenance, spares, fleet readiness, convoy routing, crew scheduling, depots) | availability forecasting, supply/network allocation, movement planning, maintenance scheduling | ERP/EAM/maintenance records, telematics; enterprise cloud OK | cuOpt Route + Warehouse packs, Lakehouse/ADW, Fusion SCM adjacency, Physics NeMo for component-life models | FreeTech #04; Bosch WfO; Sky fleet; SBG project intelligence | High: synthetic fleet data is easy; KPI = availability/turnaround |
| E | **Cyber defence & information environment** (SOC, CVE/patch, threat intel, FIMI/disinfo monitoring) | alert investigation, exposure triage, narrative/OSINT monitoring | logs, feeds, open threat data; enterprise cloud / sovereign | AIQ case agents, OCI security services, NVIDIA Morpheus (verify on OCI §3.2) | patterns L2 SecOps; no delivered defence cyber reference ⚠ | High on open feeds; crowded market |
| F | **Training, simulation & digital twins** (synthetic environments, surrogates, AAR analytics, tutoring) | physics surrogates, exercise data analytics, scenario generation, after-action review | sim outputs, exercise logs; cloud GPU | Physics NeMo, Omniverse, OCI GPU shapes; data-analysis agents | FreeTech #05 (UUV twin); OMV surrogate; simulator idea (parked) | Medium: surrogate PoV demoable; full simulator not |
| G | **Enterprise & back-office** (procurement/contracts, HR, finance, knowledge mgmt, compliance/export control, records) | IDP, RAG assistants, bid drafting, policy checks, redaction | documents, ERP; enterprise cloud; often Oracle apps already | Doc Extraction pack, Knowledge Chat pack, AIQ, OCI Language (PII masking, translation), Fusion apps | Riyadh Air, Nesma, NHS, KPN, SBG | Highest: unclassified by nature, packs exist |
| H | **Communications & interoperability** (multilingual speech/translation, network ops, spectrum) | transcription/translation of nets and meetings, summarisation, comms incident RCA | audio, text; sovereign models required | Nemotron Nano Omni (ASR/OCR/video in one), Riva (verify on OCI §3.2), OCI Speech/Language | patterns L2 Ambient scribe / Transform at scale; no delivered defence reference ⚠ | High: recorded audio + public corpora |
| I | **Sensors & signals** (EW/SIGINT clustering, acoustic, radar/EO detection, perimeter security) | RF pattern recognition, detection networks, edge vision | RF captures, camera streams; edge + cloud; sensitive in ops | OCI GPUs for clustering/training, VSS live-monitoring, DeepStream/TAO at edge, Holoscan (verify) | FreeTech #03 (Radio cluster), #06 | Medium: open SDR/RF datasets exist; real captures classified |
| J | **Force protection & critical infrastructure** (base security, energy resilience, CBRN) | camera/sensor monitoring, anomaly alerts, resilience planning | camera streams, SCADA; edge + cloud | VSS live monitoring, cuOpt, Lakehouse | FreeTech #06; Belron/Channel 4 | High for camera-based cases |
| K | **Medical & human performance** (triage, health analytics, fitness) | casualty triage aid, health surveillance | health records; regulated | Knowledge Chat, data-analysis agents, NHS pattern | NHS complaints (healthcare AIQ) | Medium: data regulated; synthetic OK |
| L | **Space & EO** (space domain awareness, satellite imagery pipelines) | object tracking, imagery processing | telemetry, imagery; cloud | OCI GPUs, Vision | ⚠ no delivered reference | Medium-low |
| X | **Cross-cutting platform** (sovereign AI platform, air-gap deployment, guardrails, classification handling, MLOps, data platform) | the harness every cluster needs | — | Dedicated/Isolated Region, Autonomous AI Lakehouse security stack (VPD, masking, SQL firewall), AIQ harness, NeMo Guardrails, Nemotron open weights | AIQ enterprise harness row (permissions, observability, connectors) | High: demoable as a role-scoped agent; sells OCI consumption |

_Named instances per cluster (programmes, vendors, countries, years, 2025–26 funding) → §3.4; the "verify" pointers in the coverage column are answered in §3.2 (Nano Omni and the ASR NIMs are on OCI; Morpheus is dated; Isaac/Cosmos/Omniverse run on OCI GPU but have no Oracle pack or published reference architecture) and §4.3 (Roving Edge = 3× L4)._

### 3.2 NVIDIA building blocks on OCI — what is verified vs assumed

**Call:** Nemotron is the government headline because it is the only frontier-class stack a nation can **own outright** (open weights + training data + RL environments + recipes → fine-tune on classified corpora, run air-gapped, audit, no per-token meter). On OCI it is **import-only** — Nemotron 3 Super / Ultra / Nano Omni run via **OCI Generative AI Model Import onto a Dedicated AI Cluster** (hourly), or as NIM on OKE / Marketplace / AI Quick Actions — **not** in Oracle's on-demand hosted catalog (Cohere, Llama, Grok, gpt-oss beta, Gemma). That changes how a PoV is costed: a dedicated cluster line item from day one. [Inference from the facts below]

⚠ Method caveat: NVIDIA and Oracle doc domains were egress-blocked; every row is a search-engine extract of the primary page — verify licence and shape names against the model card / doc page before quoting.

| Block | What it is (one line) | Maturity | On OCI | Label · date |
|---|---|---|---|---|
| **Nemotron 3 Nano** 30B-A3B | small hybrid Mamba-Transformer MoE, 1M context | released | import / NIM | [Fact / tier-2 extracts] Dec 2025 |
| **Nemotron 3 Super** 120B-A12B | mid-size reasoning model, 1M context | released at GTC | **OCI Model Import — first NVIDIA model there** | [Fact / Oracle release notes, secondary] 2026-03-11 |
| **Nemotron 3 Ultra** 550B-A55B | frontier-class open model, NVFP4 on Blackwell | released | import; recommended DAC shape **B200_X4** | [Fact / Oracle release notes, secondary] 2026-06-04 |
| **Nemotron 3.5 Lightning** 30B-A3B | newest small model | released | import / NIM | [Fact / tier-2] 2026-08-11 |
| **Nemotron 3 Nano Omni** | one model for text + PDF + image + audio + video (OCR, ASR, video-to-text) | released | **in OCI Enterprise AI** | [Fact / Oracle blog, secondary] ~2026-05-14 |
| **Nemotron 3 Embed 8B/1B, llama-nemotron rerank/embed-vl** | multilingual retrieval (26 languages; #1 RTEB Jul 2026) | GA NIMs | NIM | [Fact / HF blog] 2026 |
| **Nemotron Parse · Safety Guard (23 categories, 9 languages)** | document parsing; content safety | released | NIM | [Fact / tier-2/3] 2026 |
| **Nemotron-3.5-ASR-Streaming 0.6B** (40 locales) · **Parakeet-TDT-0.6b-v3 / Canary-1b-v2** (25+ EU languages) · Nemotron Speech Streaming / VoiceChat (EA) | streaming ASR, full-duplex speech | GA NIMs / EA | NIM on OCI GPU | [Fact / tier-2] Jun 2026 |
| **AI-Q blueprint** (= SoftServe's "AIQ") | deep-research agent: shallow cited answers + long-form reports; NeMo Agent Toolkit + LangChain Deep Agents | `release/2.1`; **GA label ⚠ unverified** | **Agentic AI Starter Kit pack** | [Fact / docs.nvidia.com, secondary] |
| **NeMo Retriever · NeMo Guardrails / NemoGuard NIMs** | citation-aware multilingual RAG; content-safety, topic-control, jailbreak detection | GA (Guardrails v0.22) | NIM | [Fact / secondary] |
| **VSS** (Video Search & Summarization) | video-analytics agent: alerts, visual Q&A, auto-reporting; multi-live-stream, audio transcription; uses Cosmos VLM + Nemotron LLM | **GA 2.4.1**, docs 3.0.0 | **VSS pack** | [Fact / docs.nvidia.com, secondary] |
| **cuOpt** | GPU LP/MIP/VRP solver | **open source, Apache 2.0** | **Route + Warehouse packs** | [Fact / github] 2026 |
| **Morpheus** | cyber AI framework, CVE-analysis blueprint | docs at 25.06 — **dated** | no pack; OKE | [Fact / secondary] |
| **Metropolis / DeepStream · Holoscan** | vision pipelines; sensor-edge streaming inference | mature / open source | OKE; **Roving Edge L4** | [Fact / secondary] |
| **Isaac / Isaac Sim 6.0 · Omniverse + PhysicsNeMo · Cosmos 3 / Cosmos Reason 2** | robotics sim + synthetic data; digital twins & physics surrogates; world models + physical-AI VLM (**not** "Cosmos-Nemotron") | released (Cosmos 3: 2026-05-31) | OCI GPU/OKE; **no Oracle pack; OCI reference architecture ⚠ unverified** | [Fact / secondary] |
| **OCI AI Blueprints** (`oracle-quickstart/oci-ai-blueprints`) | OKE stacks: vLLM serving, multi-node RDMA inference, RAG stack, LoRA fine-tuning, benchmarks, GPU health | available | — | [Fact / github] |
| **OCI GPU shapes** | BM.GPU.L40S.4 · H100.8 · H200.8 · **B200.8 · B300.8 · GB200.4 · GB300.4** | GA | public regions; see §4.3 for sovereign/edge | [Fact / oracle.com, secondary] |
| **Oracle AI Database 26ai + NVIDIA cuVS** | GPU-accelerated vector index build | GA | — | [Fact / Oracle blog, secondary] 2026-03-17 |
| **Air-gap path** | NIM `download-to-cache` → copy → run with no NGC key (zero outbound calls); NIM Operator caching; GPU Operator air-gapped install; VLM / NemoGuard air-gap pages | documented | Isolated Region / CC@C Isolated; Roving Edge | [Fact / docs.nvidia.com, secondary] |

**Government proof points (verified):** NVIDIA **AI Factory for Government** reference design (2025-10-28; FIPS 140-3 crypto, STIG-hardened configs; includes Nemotron) · **Palantir × NVIDIA** engine to train/deploy Nemotron in classified, air-gapped, sovereign environments — customer changes the weights (2026-06-29) · **Nemotron on AWS Bedrock GovCloud at FedRAMP High + DoD IL4/5** (Jun 2026 — AWS ahead of OCI on this milestone; OCI US Gov regions "plan to host" Nemotron per 2026-03-31, not GA) · DOE Argonne Solstice/Equinox (NVIDIA + Oracle, 2025-10-28) · **Nemotron Coalition** (Mistral, Cursor, LangChain, Perplexity… — Mar 2026). [Fact / tier-2 releases + NVIDIA blogs, secondary]

**Corrections to internal assumptions:** there is **no "Nemotron for Government" SKU** — the gov packaging is the AI Factory for Government design + partner engines; the **licence is contested across sources** (OpenMDW-1.1 on some model cards vs the NVIDIA Nemotron Open Model License PDF of 2025-12-12 — both permissive: commercial use, derivatives, outputs owned by the customer) → verify per model before any contract; **Roving Edge's L4s will not hold Super/Ultra** — an edge PoV runs Nano/Lightning NVFP4, an ASR NIM or a DeepStream pipeline. [Inference]

### 3.3 How primary sources cluster defence AI — and the reconciliation with Karsten's 5 topics

**Call:** no primary defence source publishes a use-case taxonomy in an integrator's sense — NATO's two AI strategies are **governance** documents (levels "enterprise / mission support / operational", six principles, interoperability, test-evaluation-verification-validation). Usable clusterings sit at three layers: **challenge calls** (DIANA 2023→2027, EDF), **functional splits** (US CDAO warfighting vs enterprise; UK DAIC "problem spaces") and **named delivery programmes**. Every source that actually spends money splits the same two ways — **mission/warfighting vs enterprise/back-office — and the enterprise half is larger, less contested and easier to sell** (GenAI.mil: 3M seats; Task Force Lima: ~60% of 180+ GenAI use cases were chatbot-shaped). [Fact + Inference / research 2026-09-03, all items secondary extracts — see method caveat in §4]

| Source (date) | Categories as published | Read for the menu |
|---|---|---|
| **NATO AI Strategy** (2021-10-22) → **revised** (2024-07-10) | 2021: three levels — enterprise, mission support, operational; six Principles of Responsible Use. 2024: implement the principles · interoperability · combine AI with other EDTs · expand the ecosystem (DIANA, NIF) · Alliance-wide TEV&V via DIANA test centres · new: AI-enabled disinformation / information operations | Sell at the **enterprise and mission-support levels**; write "explainability & traceability" into every card (citations, audit logs). |
| **DIANA** 2023 → 2024 → 2026 → 2027 | 2023: energy resilience · secure information sharing · sensing & surveillance. 2024: Energy & Power · Data & Information Security · Sensing & Surveillance · Human Health & Performance · Critical Infrastructure & Logistics. 2026: the 10 areas in §4.4. 2027: the 6 challenges in §4.4 | NATO's own demand list; mapped to the menu in §4.5 (4). |
| **US CDAO / DoD** | JAIC-era National Mission Initiatives: Joint Warfighting Ops · Warfighter Health · Business Process Transformation · Threat Reduction & Protection · Joint Logistics (predictive maintenance) · Joint Information Warfare. **Task Force Lima** (2023–24): 180+ GenAI cases → 15 areas in two buckets — *warfighting functions* (C2, decision support) and *enterprise management* (finance, HR, healthcare info). **AI Rapid Capabilities Cell** (Dec 2024, ~$100M): C2 & decision support, software development, cybersecurity, uncrewed systems, healthcare info, procurement. **AI Acceleration Strategy** (2026-01-12): warfighting · intelligence · enterprise operations; GenAI.mil (2025-12-09, 3M seats) | The enterprise bucket is where volume is; C2 is incumbent-locked. |
| **UK MoD** — Defence AI Strategy (2022-06-15) · **DAIC Defence AI Playbook** (Jan/Feb 2024) · SDR 2025 | Playbook problem spaces: **Recognise · Comprehend · Predict · Simulate · Decide** (+ a sixth, unverified). Case studies: **Spare Parts Failure Prediction · AI at the Edge · Intelligent Search & Document Discovery · Object Detection in Satellite Imagery · RF Signal Analysis · AI-Assisted Operational Planning · LLMs for Defence · Last-Mile Resupply · Typhoon Predictive Maintenance Optimisation** (GenAI over maintenance narratives). SDR 2025: Digital Targeting Web (>£1bn, MVP 2026), SECRET-level defence cloud MVP 2026 | The playbook's case list maps almost one-for-one onto #3, #5, #6, #8, #1 — and the UK MoD is on Oracle since 2026-01-14 (§4.3). Strongest national doorway. |
| **EDA / EDF** | EDA 2020: three areas "most affected" — multi-sensor fusion, predictive maintenance, simulation. **TAID Annex 04 "AI Use Cases for Defence"** (2025-05-09), nine: Decision-Making in MDO · Failure of a Decision Support System · Collision Avoidance/swarming · Mission Training · Aerial Refuelling · **Data-Centric Security** · Military Approval/Certification · Meaningful Human Control · Active Autonomous Cyber Defence. EDF-2025: 57 projects ≈ €1.07bn (2026-04-15); EDF-2026 WP: ~€1bn, 31 topics, €30M for two "AI-based tactical situational awareness" projects; M&S-supported AI for decision-making & training | "Data-Centric Security" = #12's vocabulary; "Mission Training" = the bench AAR case. |
| **Nations** | **Germany:** Uranos KI (2025-12-03; €57M fixed / €136M total; Helsing ~€34M, Airbus + Quantum Systems ~€23M — AI-fused multi-sensor tactical reconnaissance); CIHBw 200+ projects; BWI €6bn to 2029; pCloudBW = Google Distributed Cloud air-gapped (target end-2027). **France:** AMIAD (2024-05-01; €300M endowment, ~€2bn in the LPM; ASGARD supercomputer Sep 2025; autonomy + counter-drone). **Netherlands:** €310M drones + AI in 2025; "synthetic data factory"; Palantir MSS with a stated 2-year alternative requirement. **Poland:** MoD AI strategy 2024–2039; AI Centre under the Cyberspace Defence Forces (Mar 2025) — intelligence, reconnaissance, autonomous combat systems, decision support, logistics. **Nordics/Baltics:** no published list ⚠ | Germany's cloud is Google; the Netherlands wants a Palantir alternative in 2 years [Fact] — an opening for an Oracle-hosted analytics stack [Speculation]. |
| **Ukraine practice** (the base SoftServe's proof comes from) | **Delta** (situational awareness / BMS, force-wide Aug 2025) · **Avengers** (CV: ~12,000 enemy units detected weekly, ~2.2 s classification; runs inside Delta's VEZHA video module; **Avengers Labs** — 5M annotated frames, opened to partner countries Aug 2026) · **Griselda** (Brave1; multi-source intel fusion, 28 s ingest-to-retrieval, integrated into Delta) · terminal-guidance autonomy (The Fourth Law, Swarmer; $50–150 onboard CV modules) · Brave1: 540+ grants, >UAH 2bn in two years | FreeTech #02/#03/#06 are the same job families as Griselda / Avengers — say so in the narrative, without claiming those systems. "Kropyva" and Unmanned Systems Forces programme lines **unverified — do not cite**. |
| **Analysts** | McKinsey *Capturing the AI advantage in defense* (2025/26): >600 AI efforts "from back-office to warfighting", traction in targeting, cyber, select autonomy. CSET (Apr 2025): frames decision-support AI by scope, data quality, human-machine interaction | Tier 2 — use for framing only. |

**Reconciliation — Karsten's five topics vs the clusters and the sources:**

| Karsten topic | Clusters (§3.1) | What the sources show | Menu |
|---|---|---|---|
| 1 Sensor & Detection Network | I, A, J | DIANA sensing/ISR + Contested EM; Uranos KI; Avengers; UK "RF Signal Analysis", "AI at the Edge" | #1, #8 |
| 2 Data Collection, Analysis & Comms Infrastructure | A, H, X | Griselda; FMN Spiral 4; PBN; JATEC (incl. machine translation); NATO SITCEN OSINT AI Alerting Platform RFP (⚠ status unverified) | #2, #7, #12 |
| 3 Command, Control & Decision | B | MSS NATO, eAirC2, UK Digital Targeting Web, Palantir £240.6M — **incumbent-locked, classified** | phase 2 of #5; bench |
| 4 Air Defence, Interceptors, Counteractions | J / bench | DIANA 2027 air-defence countermeasures; Anduril C-UAS (NL, May 2026); HX-2/Virtus (DE, ~€268M each) — kinetic, hardware-bound | non-kinetic sensing only (#1/#8 stack) |
| 5 Training of Human Capital & Continuous Improvement | F, G | JWC "AI in Audacious Training" (MSS-generated exercise injects, Jan 2026); EDA "Mission Training"; ACT **AI FELIX** (Command Read Board assistant) | #3, #10; bench AAR |
| **(missing from the list)** Enterprise & back-office · Logistics & sustainment · Cyber | G, D, E | GenAI.mil 3M seats; USAF PANDA/CBM+ predictive maintenance (C3 AI, system of record Apr 2023, under a $450M OTA); UK Typhoon PMO, Last-Mile Resupply; DARPA AIxCC (Aug 2025, 7 open-source cyber reasoning systems); NCIA NCSC replacement €27.1M | **#4, #5, #6, #11 — the most PoV-friendly clusters; add them to the Oracle conversation explicitly** |

### 3.4 Named instances and 2025–26 funding per cluster (the "X already does this" column)

| Cluster | Named instances (programme / vendor / country / year) | Funding signal 2025–26 [Fact unless marked] |
|---|---|---|
| A ISR & intel | NGA Maven / Maven Smart System (US 2023–26); Avengers, Griselda (UA); Uranos KI (DE 2025); MAINSAIL (NATO ACT); UK "Object Detection in Satellite Imagery" | MSS ceiling ~$1.3bn to 2029; NGA SEQUOIA labelling up to $708M/7 yrs (Nov 2025); Maxar GEOINT portal ~$359M; Uranos KI €136M |
| B C2 & decision support | MSS NATO (NCIA, Mar 2025 → accredited 2026-06-22); eAirC2 (Anduril Lattice / Palantir / Athea, Jul 2026, 9-month bake-off); Delta (UA); UK Digital Targeting Web; DARPA SCEPTER | UK–Palantir £240.6M (2026–29); UK ASGARD framework (26 suppliers, Jan 2026); eAirC2 undisclosed |
| C Autonomy | Helsing HX-2, STARK Virtus (DE, Feb 2026); The Fourth Law, Swarmer (UA); DIANA 2027 "multidomain autonomy" | ~€268M each (HX-2 option to €1.46bn) |
| D Logistics & readiness | USAF PANDA/CBM+ (C3 AI); UK Typhoon Predictive Maintenance Optimisation; UK Last-Mile Resupply; DIANA "Responsive Logistics" / "Critical Infrastructure & Logistics" | PANDA $13M task order under a $450M OTA |
| E Cyber | DARPA AIxCC (Aug 2025; Team Atlanta $4M, Trail of Bits $3M, Theori $1.5M); Leonardo Global Cybersec Platform inside PBN (2026); EDA "Active Autonomous Cyber Defence" | NCIA NCSC end-of-life replacement est. €27.1M |
| F Training & simulation | JWC "AI in Audacious Training" (Jan 2026); DARPA SCEPTER (~$39M/3 yrs); EDF M&S-supported AI; EDA "Mission Training" | EDF-2026 topic |
| G Enterprise & back-office | GenAI.mil (Gemini for Government, 2025-12-09; ChatGPT Mil + Grok added 2026); Army Enterprise LLM Workspace (Ask Sage / Microsoft, IL5); NIPRGPT (USAF); CamoGPT (Army); **AI FELIX** (NATO ACT); UK "Intelligent Search & Document Discovery", "LLMs for Defence"; NCIA's Oracle EBS/Fusion estate | GenAI.mil 3M seats; CDAO prototype awards up to $200M each to OpenAI, Google, Anthropic, xAI (mid-2025) |
| H Comms & interoperability | FMN Spiral 4; DIANA "Advanced Communications"; JATEC GDC scope includes machine translation | — |
| I Sensors & signals | DARPA ARC / BLADE (BAE, cognitive EW); UK "RF Signal Analysis"; DIANA "Contested Electromagnetic Environments" | — |
| J Force protection / C-UAS | Anduril counter-UAS (NL, 2026-05-07; signature → IOC < 1 month); DIANA air-defence countermeasures | undisclosed |
| K Medical & human performance | APPRAISE-HRI (first FDA-cleared DoD AI SaMD); 120+ Military Health System AI projects; DIANA "Human Survivability" (2027) | — |
| L Space & EO | DIANA "Resilient Space Operations"; NGA SEQUOIA; Maxar | see A |
| X Platform & sovereignty | NCIA → OCI (Sep 2025); JATEC → Google Distributed Cloud (Nov 2025); PBN (Accenture + Leonardo, ~€200M/7 yrs); HERMES (CGI + secunet, Dec 2025); pCloudBW (DE, Google, end-2027); Delos Cloud (DE); SecNumCloud 3.2 (FR); EDA "Data-Centric Security"; NATO TEV&V | **NATO Rapid Adoption Action Plan** (2025-06-25): 24-month adoption target, market research ≤3 months, TEVV + integration ≤12 months — the speed argument for fixed-scope PoVs |

**Selection-bias flag:** the map over-represents anglophone and EU-institutional sources; DE/FR/PL/NL internal taxonomies were reached through English reporting and are under-sampled.

---

## 4. Angle B — Oracle × NATO: what is known, what is assumed

**Call: "Oracle is the major private cloud for NATO" is not supported by public evidence.** What is supported: Oracle holds NATO's **enterprise/business tier** — NCIA's ERP estate runs on Oracle E-Business Suite + Fusion, and NCIA chose OCI in Sep 2025 for "mission-critical workloads" and three legacy data centres — inside an NCIA that is **explicitly multi-cloud**, where the **classified operational tier is visibly held by Google (JATEC) and Palantir (Maven Smart System NATO)**. [Inference from the facts in 4.1–4.2] Treat Karsten's line as Oracle's internal framing, not a fact to repeat to a NATO buyer.

⚠ Method caveat (research 2026-09-03): `nato.int`, `ncia.nato.int`, `act.nato.int`, `diana.nato.int`, `docs.oracle.com`, `blogs.oracle.com` and most trade press were unreachable from this sandbox; `oracle.com` was fetched directly. NATO-side items are search-engine extracts of the primary pages — re-read against the primary page before anything goes into a client document.

### 4.1 Verified NATO-side Oracle footprint

| Entity | Evidence | Label · date |
|---|---|---|
| **NCIA — cloud** | NCIA to move mission-critical workloads + **three legacy data centres** to OCI; **Thales** prime, Red Reply + Shield Reply as Oracle partners, Proximus networking; Oracle cites "sovereign cloud capabilities… data residency… operational controls". **No value, term, region type or classification level published.** | [Fact / Oracle press release — tier 2] 2025-09-11 |
| **NCIA — ERP** | Primary ERP = **Oracle E-Business Suite + Oracle Fusion** (Finance, HR, Acquisition, Asset Management; Service Support & Business Applications portfolio) | [Fact / ncia.nato.int, secondary extract] undated |
| **NCIA — ERP corroboration** | Live contractor roles at NCIA Mons for "Oracle EBS 12.2", EBS Finance SME, EBS Architect, EBS inventory/asset data migration | [Fact / recruiter listings — tier 3] 2025–2026 |
| **NCIA — cyber** | Industry Partnership Agreement with Oracle for bilateral exchange of **non-classified** cyber-threat data (NICP; Oracle one of 20 firms) | [Fact / ncia.nato.int, secondary extract] 2019-05-21 |
| **NSPA** | Oracle Database underneath AC/135 codification tooling; NSPA logistics processes are **SAP-based** — Oracle here is a database, not the ERP | [Fact / NSPA ePortal fact sheet, secondary extract] undated |
| **NATO HQ / ACT / ACO** | No public evidence of Oracle products | ⚠ gap |

### 4.2 Who holds the other tiers (competitive context a NATO buyer already lives in)

| Vendor | What | Label · date |
|---|---|---|
| **Google Distributed Cloud air-gapped** | Selected by NCIA for **JATEC** (NATO-Ukraine Joint Analysis, Training and Education Centre) to run **classified** workloads and AI models; "multi-million-dollar", value undisclosed | [Fact / Google press release — tier 2] 2025-11-24 |
| **Accenture + Leonardo** | **Protected Business Network** — ~**€200M**, 2026–2033, ~29,000 users, "the foundation for classified digital operations across the NATO Enterprise", delivered "across a **multi-cloud environment provided by NCIA**"; Leonardo brings an AI multi-agent cyber-defence platform | [Fact / Accenture + NCIA releases — tier 2] 2026-07-07/08 |
| **Palantir — Maven Smart System NATO** | Procured for ACO/SHAPE in ~6 months, 50+ apps built in 2025, **full accreditation for the classified network 2026-06-22**, runs **Mistral AI and Meta** models, "NATO data on NATO servers in NATO data centres" | [Fact / SHAPE + NCIA releases, Janes] 2025-03-25 → 2026-06-22 |

[Speculation] Oracle may be one of the clouds inside the PBN multi-cloud — **no source says so; do not assert it.**

### 4.3 Oracle's defence / sovereign line a partner can build on

| Offering | Substance | GPUs | Accreditation | Label · date |
|---|---|---|---|---|
| **OCI Dedicated Region** | full OCI region in the customer's DC, 100–150+ services incl. GenAI and **Oracle SaaS (ERP/HCM/SCM)**; 3 → 450+ racks; **5-year consumption commitment** | **L40S, H100/H200, B200/GB200** orderable; GB200 NVL72 superclusters extended to Dedicated Region & Alloy | inherits the nation's | [Fact / oracle.com FAQ + blog, 2024-09 → 2026] |
| **Oracle Cloud Isolated Region** | air-gapped, not internet-connected, from 3 racks; Oracle-, customer- or partner-operated with cleared staff; reference: **Singapore MINDEF/DSTA** (non-NATO) | **no published GPU list** → parity implied only | customer-defined | [Fact / oracle.com] · GPUs [Inference] |
| **Compute Cloud@Customer Isolated** | single-rack air-gapped entry point, **Fast-Start 6–8 weeks**, upgrade path to Isolated Region; Fujitsu Defence & National Security a named integrator | **4 → 48 NVIDIA L40S** via GPU expansion racks | — | [Fact / Oracle release — tier 2] 2025-06-17 |
| **Oracle National Security Regions** | US Secret/Top Secret; OCI GenAI GA in Top Secret regions 2026-01-13; B300 shape; Grok 4 available | B300 | DISA IL6, ICD 503/705 — **US-only** | [Fact / oracle.com + release notes] 2026 |
| **Oracle EU Sovereign Cloud** | Frankfurt + Madrid, EU-incorporated entities, **EU-resident support staff**; **OCI Generative AI live in Frankfurt**; Nemotron import there ⚠ unverified | **L40S, Hopper, Blackwell orderable** (first GPU shapes deployed) | SOC 1/2/3, **C5**, ENS, ISO 27001/17/18/701, DORA/NIS2 alignment | [Fact / oracle.com FAQ + sovereign-AI blog] |
| **UK** | Oracle UK Sovereign Cloud (dual-region, **OFFICIAL-SENSITIVE**); **UK MoD agreement 2026-01-14** — Defence Digital, legacy migration + AI; Oracle joins AWS and Microsoft under **MODCloud** ("multi-vendor strategy"); value undisclosed | — | OFFICIAL-SENSITIVE | [Fact / oracle.com release — tier 2] 2026-01-14 |
| **Oracle Alloy** | partner-operated OCI; Italy's Polo Strategico Nazionale (with TIM), Japan | as Dedicated Region | national | [Fact / oracle.com, secondary] |
| **Roving Edge Infrastructure** | **RED v2** 2U, <35 lb, connected or disconnected; MIL-STD-810 ruggedised case with EMI shielding; **Ultra** <5 lb backpack; **Roving Edge Station** 25-ft container with 2×42U racks "for classified operations" | **up to 3× NVIDIA L4** per RED v2 | — | [Fact / oracle.com FAQ + Oracle blog] |
| **Oracle Defense Ecosystem (ODE)** | launched 2025-06-17; three cohorts of 10 defence-tech partners; benefits: discounted **Palantir Foundry + AIP on OCI**, DoD landing zone, CMMC support, co-sell, monthly defence-CTO access; entry point **Oracle Defence Tech Summit 2026, Brussels** | — | — | [Fact / oracle.com] 2025-06-17 → 2026-06-25 |
| **NATO accreditation** | **No evidence that any Oracle offering holds NATO RESTRICTED or NATO SECRET accreditation**; US (FedRAMP/IL) and NATO paths are separate and non-substitutable | — | ⚠ | [Practitioner consensus / vendor-compliance commentary — tier 2–3] |

### 4.4 NATO's AI direction (what a partner's menu must visibly align with)

- **AI Strategy** — summary published 2021-10-22; **revised strategy released 2024-07-10** (Washington Summit). Four thrusts: advance the Principles of Responsible Use · **interoperability** of AI across the Alliance · integrate AI with other emerging & disruptive technologies · expand the AI ecosystem. New in 2024: AI-enabled **disinformation / information operations** and protection against **adversarial use of AI**. [Fact / nato.int, secondary extract]
- **Principles of Responsible Use (6):** Lawfulness · Responsibility & Accountability · Explainability & Traceability · Reliability · Governability · Bias Mitigation — across the capability lifecycle. [Fact / nato.int official text, secondary extract] 2021-10-22 → criterion C6 in §2.
- **DIANA 2026 cohort** — 150 innovators across **10 challenge areas**: Energy & Power · Advanced Communications · **Contested Electromagnetic Environments** · Human Resilience & Biotech · **Critical Infrastructure & Logistics** · Operations in Extreme Environments · Maritime Operations · Resilient Space · **Autonomy & Uncrewed Systems** · **Data-Assisted Decision Making**. [Fact / diana.nato.int, secondary extract]
- **DIANA 2027 challenges** (announced 2026-06-01): human survivability · **multidomain autonomy of uncrewed systems** · **sensing and data processing for intelligence and surveillance** · operational resilience in contested environments · **responsive logistics** · scalable air-defence countermeasures. [Fact / diana.nato.int, secondary extract]
- **NATO Innovation Fund** — €1bn, 24 nations, 15-year life, seed–Series B in AI/quantum/space/materials/robotics. [Fact / nif.fund, secondary] 2024 →
- **NCIA:** AI Horizon Scanning initiative with NATO STO; contract T&Cs carry **tailored subsets for "AI Systems or AI-Enabled Services"** (a compliance hook for partners); NATO Software Factory accreditation revalidated Feb 2026; **NATO Cyber Security Centre** end-of-life replacement est. **€27.1M**. [Fact / ncia.nato.int, secondary extract]
- **ACT / JWC / JISR:** Innovation Continuum advanced MDO AI, **JISR Asset Planner**, MAINSAIL; 2026 Beacon project "AI in Audacious Training"; **Task Force X** (maritime autonomy); JISR exercise Northern Spirit 2025 (biometrics / identity intelligence). [Fact / act.nato.int + ncia.nato.int, secondary extract]
- **Data:** Data Exploitation Framework Policy (Oct 2022), Data Quality Framework (2025-08-06), Data-Centric Reference Architecture; **Federated Mission Networking Spiral 4** is the current baseline. [Fact / nato.int, secondary extract]
- ❌ "Project Boreas" — no NATO AI programme of that name found; do not use the name.

### 4.5 What this changes in the menu

1. **The enterprise doorway is literal, not metaphorical.** NCIA runs Oracle EBS/Fusion; the Lakehouse Quick Start's "Fusion doorway" pattern (FDI/BICC land Fusion data in a customer-owned Autonomous instance → governed gold layer → agent) applies to a NATO agency as written. Cases **#3, #4, #12** sit next to that estate; **#5** does once maintenance/asset data is in Fusion Asset Management. [Inference]
2. **Do not pitch classified C2.** That tier is Palantir + Google today, accredited and in production. SoftServe/Oracle's credible space is **unclassified analytics, enterprise, edge and national-MoD** work — with the **UK MoD (on Oracle since 2026-01-14, OFFICIAL-SENSITIVE)** the most concrete national doorway; SoftServe already has the UK regional director (Adrian James) and NHS/Sky/Channel 4/Belron deals in the UK. [Inference]
3. **The miltech buyer has a named Oracle vehicle: ODE.** Three cohorts of defence-tech firms and a Brussels Defence Tech Summit are Oracle's own miltech channel; **#8, #9, #10** are shaped as "SoftServe builds it on OCI for an ODE member" offers, and the ODE benefit list (discounted Palantir Foundry/AIP on OCI) tells us Palantir is a co-resident on the platform, not only a competitor. [Inference]
4. **DIANA's published challenge areas are NATO's own demand statement — use them as the "why" column.** Mapping: sensing & data processing for ISR → #1, #8 · Contested Electromagnetic Environments → #8 · Advanced Communications → #7 · Critical Infrastructure & Logistics / responsive logistics → #5, #6 · Autonomy & Uncrewed Systems / multidomain autonomy → #9 · Data-Assisted Decision Making → #2, #5, #11 · scalable air-defence countermeasures → bench only (kinetic).
5. **Accreditation is the honest limit.** No Oracle NATO-SECRET path is public; every PoV on the menu must be sold as unclassified-first, with Dedicated Region / CC@C Isolated (6–8-week fast-start, 4–48 L40S) as the named phase-2 environment.

---

## 5. Angle C — SoftServe's delivered defence base (FreeTech one-pager) → clusters, proof, reuse

⚠ gap: the one-pager itself (SharePoint, Karsten's Teams files; local copy on Alex's Mac) is not reachable from this session — mapping below uses the wiki's capture of its six cases (wiki: oracle-defense.md, shared 2026-08-25).

| # | Delivered case | Cluster (§3) | What it proves (from the one-pager) | Oracle/NVIDIA analogue we can bind it to | Reusable asset today? | Menu case |
|---|---|---|---|---|---|---|
| 01 | Autonomous last-mile air delivery | C Autonomy | fail-safe navigation under lost pilot/GPS/signal; real-time monitoring + obstacle avoidance | OCI GPUs + Isaac Sim / Cosmos for the training & sim loop; NIM at edge | ⚠ unknown — IP likely client-owned; ask Oksana | #9 |
| 02 | Foresight analytics engine | A ISR & intel | multi-source fusion → faster threat detection; automated routine analysis → customisable reports | AIQ pack (Nemotron reasoning + NeMo Retriever); DHL Client Compass / Context Fabric engine (wiki: 2026-06-17) | Context Fabric is SoftServe-internal (reusable engine) [Inference from 2026-06-17 note] | #2 |
| 03 | Radio cluster intelligence | I Sensors & signals | automated RF clustering, pattern recognition, multi-layer visualisation → real-time SIGINT insight | OCI GPU shapes (clustering at scale); no Oracle pack | ⚠ unknown | #8 |
| 04 | Operations control tower | D Logistics & readiness / B C2 | fleet readiness, mission tracking, resource allocation, performance analytics, maintenance planning in one platform | Autonomous AI Lakehouse (real-time ops watch), cuOpt for allocation, Bosch approve/reject UI pattern | ⚠ unknown; UI patterns reusable from Bosch WfO [Inference] | #5, #6 |
| 05 | UUV digital twin | F Simulation & twins | coupled CFD/PINN physics-informed sim, 50′–250′ depths, Omniverse visualisation → cut testing time/cost | Physics NeMo surrogate (OMV row), OCI GPU | pipeline pattern reusable (OMV) [Inference] | #10 |
| 06 | EdgeInsight visual intelligence | I Sensors / J Force protection / A ISR | NVIDIA edge vision (Jetson/DeepStream + TAO, AWS Greengrass) for real-time inspection/safety; OTA incl. offline | VSS pack (cloud side), DeepStream/TAO (edge side); AWS Greengrass must be swapped for an OCI path (Roving Edge / OKE at edge — verify §4) | training/deployment pipeline reusable; Greengrass dependency is the catch [Inference] | #1, #9 |

Capability strip on the one-pager (AI/CV · autonomous systems · digital twins & simulation · signal intelligence · real-time analytics & BI · command & control) maps to clusters A/C/F/I/D/B — i.e., SoftServe's proof is concentrated in the **physical/sensor** half of the map, while the **Oracle packs** are concentrated in the **enterprise/knowledge** half (§7). The menu's job is to bridge the two.

---

## 6. Angle D — the existing Oracle use-case map (7 L1 / 24 L2) adapted to NATO

_Source: the "patterns" sheet (2026-07-10), the map cited across the partnership decks. Rule applied: keep the L1/L2 skeleton, re-skin each L2 with the defence job it maps to, and mark applicability. Nothing in the sheet was merged or renamed — the four defence-specific L1 additions are appended, not folded in._

| L1 (existing) | L2 (existing) | NATO / defence re-skin | Applies? | Menu |
|---|---|---|---|---|
| Enterprise knowledge assistant (RAG) | Employee knowledge assistant | Doctrine, SOP, policy & HR-regulation assistant (STANAGs, national regs) | ✅ high | #3 |
| | Customer self-service assistant | Personnel / reservist / veteran self-service (pay, entitlements); recruitment front door | ◐ medium | bench |
| | Technical corpus assistant | Maintainer's manual assistant (IETM/S1000D, fault codes, service bulletins) | ✅ high | #3 (variant) |
| Real-time human augmentation | Contact-center agent assist | Duty-officer / service-desk assist (IT, logistics help desk) | ◐ low-medium | — |
| | Ambient scribe | Radio-net & meeting transcription, multilingual summarised logs | ✅ high | #7 |
| Deep research & investigation | Company research agent | OSINT entity/target dossiers; supplier due diligence (defence supply-chain risk) | ✅ high | #2 |
| | Case investigation (event-triggered) | Incident / after-action investigation; vetting case assembly; cyber-incident case file | ✅ high | #11 (cyber), bench (AAR) |
| | RFP and bid response drafting | **Miltech buyer:** tender responses to NSPA/NCIA/EDF calls; **forces:** requirement/spec drafting | ✅ high (miltech) | bench (strong for vendors) |
| | Scheduled intelligence briefs & reporting | Daily INTSUM / morning brief from open + internal sources | ✅ high | #2 |
| Data analysis agents | Conversational analytics (NL→SQL) | Readiness / logistics / personnel metrics Q&A over the ops data mart | ✅ high | #5 |
| | Code-executing analyst (what-ifs) | Resupply / force-generation scenario what-ifs; COA comparison | ◐ medium (data-heavy, sensitive) | bench (phase 2 of #5) |
| Per-item processing pipelines | Extract to system of record (IDP) | Contracts, tenders, maintenance & movement records, customs docs → validated fields | ✅ high | #4 |
| | Classify and route intake | SITREP/report/message triage; classification-marking assist; ticket routing | ✅ high | #4 (variant) |
| | Review, compare, verify | Export-control (ITAR/EAR/EU dual-use) screening; spec-vs-delivery verification; contract compliance | ✅ high | bench (strong for vendors) |
| | Transform at scale | Multilingual translation/summarisation of reports and manuals at coalition scale | ✅ high | #7 |
| | Batch media processing (VSS-lite) | ISR footage / FMV / CCTV indexing, object & event search, compliance flags | ✅ high | #1 |
| | Net-new content generation | Training content, exercise scenario & briefing-pack drafting | ◐ medium | bench |
| Task & transaction agents | Employee service fulfillment | IT/HR service-desk automation at MoD scale | ◐ medium | — |
| | Customer transaction agent | Requisition / movement request execution | ◐ low-medium | — |
| | Back-office exception worker | Supply-chain exception worker (stuck requisitions, unmatched deliveries) | ◐ medium | bench |
| | Long-running stateful orchestrator | Deployment-readiness orchestration (medical, training, clearances, kit) | ◐ medium | bench |
| Closed-loop ops agents | ITOps / AIOps incident RCA | Mission-network / comms incident RCA | ◐ medium-high | bench |
| | SecOps investigation (CVE) | SOC alert-to-verdict; CVE exposure triage vs asset inventory | ✅ high | #11 |
| | Business-process watchdog | Readiness & supply watchdog (late/short signals, maintenance due, SLA breaches) | ✅ high | #5 |

**Defence-specific L1 additions (not in the enterprise map by design — the sheet excludes the cuOpt "optimisation-solver family" and has no physical-AI patterns):**

| New L1 | L2s | Coverage | Menu |
|---|---|---|---|
| **P1 Sensor & signal perception** | EO/IR/FMV object & change detection · RF/SIGINT clustering · acoustic/radar classification · edge vision | VSS, OCI Vision, DeepStream/TAO, OCI GPU; FreeTech #03, #06 | #1, #8 |
| **P2 Autonomy & robotics** | GNSS-denied navigation · perception for UxS · swarming/mission autonomy · C-UAS detection (non-kinetic) | Isaac Sim/Cosmos/Omniverse on OCI GPU (verify), NIM at edge; FreeTech #01 | #9 |
| **P3 Simulation, digital twins & physics-AI** | physics surrogates · synthetic environments · exercise/AAR analytics | Physics NeMo, Omniverse; FreeTech #05, OMV | #10 |
| **P4 Optimisation & planning** (the cuOpt family) | routing/convoys · crew & maintenance scheduling · network/supply allocation · depot pick-paths | Route Optimizer + Warehouse packs, cuOpt engine; Bosch, Sky | #6 |

_Read: 15 of 24 existing L2s re-skin to a high-applicability defence job; the four additions carry SoftServe's actual defence proof. That asymmetry is the whole positioning: Oracle's packs cover the enterprise half, SoftServe's war work covers the physical half._

### 6.1 The NATO adaptation of the card-level map (the deck / xlsx working-file structure)

The map Oracle saw in the Neil Business Alignment session is the **card-level** rendering of this taxonomy — 7 L1 groups → 24 L2 runs → 83 example cards, with the **AIDP fit / NVIDIA blueprint / Oracle AI service** columns from the working file (`AI workflow patterns - AIDP-NVIDIA-OracleAI mapping.xlsx`; its Google-Sheet twin is the second "patterns" sheet of 2026-07-10), shown three ways in the deck (neutral → ramp-up-highlighted → strategic ≈60%). The NATO adaptation rebuilds exactly that structure with defence cards:

- **File:** `2026-09-03_nato-pattern-map.csv` (this folder; the xlsx twin "NATO adaptation - AI workflow patterns - AIDP-NVIDIA-OracleAI mapping - 2026-09-03.xlsx" was delivered to Alex for the OneDrive `Projects/Oracle/Use case maps/` folder). Same 12 columns as the source + four NATO columns: **Applies** (✅ / ◐ / ✖) · **Proof** (FreeTech # / pipeline client) · **Menu #** · **Highlight view** (first-wave / menu / —), plus Karsten topic and Buyer.
- **Size:** 36 L2 rows — the 24 enterprise L2s (names unchanged, every card re-written for a defence actor in the source's "Actor — job; outcome" register) + 12 L2s under the four **EXT** L1s (sensor & signal perception · autonomy & robotics, non-kinetic · simulation, twins & physics-AI · optimisation & planning / cuOpt) — **92 cards** vs the source's 83.
- **The three renderings, NATO version:** (1) neutral = all 92 cards · (2) **proven** = 18 rows / 49 cards carrying a FreeTech # or a pipeline client (Riyadh Air, DHL, NHS, Nesma, Channel 4, Belron, Bosch, Sky, OMV) · (3) **NATO menu** = 20 rows / 57 cards on the 12-case menu, with the **first wave** (#1 #2 #4 #5 + #3) bold at 7 rows / 24 cards. The ≈60% "strategic" band of the enterprise deck becomes ≈62% (57/92) here — the same shape of story.
- **Stack-fit columns kept from the source** wherever the L2 is unchanged (so the NATO map stays reconcilable with the enterprise one); updated only where a newer fact applies (Ambient scribe → Nemotron Nano Omni / ASR NIMs; IDP → the AI Document Extraction pack; VSS-lite → the VSS pack; SecOps → the AI-Q-based Vulnerability Analysis blueprint). EXT rows carry their own fit (Metropolis/TAO, RAPIDS, Isaac/Cosmos, PhysicsNeMo/Omniverse, cuOpt packs; Roving Edge as the OCI edge runtime).
- ⚠ The pptx renderings (partnership-vision deck, Business Alignment deck) live in the SoftServe OneDrive and were not reachable from this session — the NATO cards were built from the Sheet twin, so the deck's exact visual grouping should be re-checked against the file before slides are cut.

---

## 7. Angle D′ — Oracle AI Accelerator Packs + SoftServe productized rows → NATO relevance

_Sources: Oracle×NVIDIA "Live Demo Day" webinar summary (seven packs, Jun 2026; all Terraform-deployed into the customer's own tenancy, open-source, Nemotron-pre-integrated, vLLM serving, Prometheus/Grafana, auth service, RBAC + audit log) and the "Productization use cases × AI Accelerator Packs" sheet (2026-06-18)._

| OCI pack (Jun 2026 catalog) | Engine | Defence job it can carry | Pack fit | SoftServe row / proof | Menu |
|---|---|---|---|---|---|
| Video Search & Summarization | NVIDIA VSS (VLM + LLM + RAG) | ISR footage indexing; base/perimeter live monitoring; broadcast-style compliance review of collected media | ✅ exact | Channel 4 (retrospective search) · Belron (visual inspection) · VSS live-monitoring row | #1, #5-adjacent |
| Enterprise Knowledge Chat Agent (self-hosted / managed) | Enterprise RAG | Doctrine/STANAG/manual assistant; policy Q&A | ✅ exact | Nesma · NHS · KPN (all flagged 🟡 in the sheet: every AI-Q SOW scoped OUT RBAC / permissions / observability / integration → the SoftServe harness row is the value-add) | #3 |
| Agentic AI Starter Kit | NVIDIA AIQ (Nemotron + NeMo Retriever + NeMo Agent Toolkit) | Intel fusion & briefs; case/cyber investigation; supplier due diligence | ✅ scaffold | DHL Client Compass · SBG · AIQ enterprise harness row | #2, #11 |
| AI Document Extraction (contracts, invoices, forms) | VLM extraction (Qwen3-VL per sheet) on managed H100 DAC | Procurement/contract/maintenance-record extraction | ✅ exact | Riyadh Air (3–5 d → 15 min; 90–95%) | #4 |
| Vehicle Route Optimizer | NVIDIA cuOpt | Convoy/resupply routing with time windows & risk constraints | ✅ exact | Sky fleet (proposal); Bosch geo-dispatch | #6 |
| Warehouse Pick Path Optimizer | NVIDIA cuOpt | Depot / ammunition-store pick & wave planning (NSPA-type depots) | ✅ exact | — (no customer) | bench |
| (row, no pack) Workforce shift scheduling | cuOpt custom | Maintenance-crew / watch-bill scheduling | ⚠ custom on cuOpt | Bosch WfO (2 d → 30 min; up to +26% on PoV data) | #6 (scheduling skin) |
| (row, no pack) Supply-chain / network optimisation | cuOpt engine | Spares/fuel allocation across depots under disruption | ➖ custom | "talk to your supply chain" webinar demo only | bench |
| (row, no pack) Physics-AI surrogate | Physics NeMo | UUV/platform/infrastructure physics surrogates | ➖ NVIDIA framework, not a pack | OMV | #10 |
| (row, no pack) Multimodal / AR assistant | AIQ + VLM | Maintainer AR assistant over manuals | ➖ custom | Northumbrian Water (status unverified) | bench |

_Why this matters for NATO specifically: the packs' architecture — everything inside the customer's tenancy, open-source repos, swappable models, RBAC + audit log, SSO via Oracle identity domains — is the sovereignty story Denys named as the wedge; Nemotron's licence (any commercial use, derivative works allowed, outputs owned by the customer, optional Oracle+NVIDIA SLA support) is what lets a nation fine-tune on its own data later. [Fact / webinar summary, Jun 2026]_

---

## 8. Starting-point list — the known ground

**(a) What we know about Oracle ↔ NATO** → §4 (research-labeled). Internal signals: Oracle's defence counterpart chain is Neil → his defence-SVP counterpart → **Bram (Belgium) + team incl. Michael (from Ukraine)**; first defence call ~2026-08-25; Karsten requested a Michael follow-up on high-interest NATO cases (wiki).

**(b) What suits their needs best from OCI / AIDP / AI Lakehouse** [Inference from §3.2, §4 + §7]:
- Packs run inside the customer tenancy (public or private OCI), open-source, RBAC + audit log, SSO via Oracle identity domains → maps to NATO's private-cloud posture and to the "explainability & traceability" principle.
- Autonomous AI Lakehouse security stack — virtual private database (row-level, e.g. country-scoped), on-the-fly masking, SQL firewall, enforced across DB/Iceberg/AI → classification-aware data access is a native feature, not a build (wiki: 2026-08-05 enablement); GPU-accelerated vector indexing with NVIDIA cuVS is GA in 26ai (Mar 2026).
- Nemotron on OCI via **Model Import onto a Dedicated AI Cluster** (Super, Ultra-NVFP4 on B200_X4, Nano Omni in OCI Enterprise AI) + open weights → sovereign phase without a vendor lock, but priced as a dedicated cluster from day one.
- Deployment ladder for the phase-2 conversation: commercial EU region → **EU Sovereign Cloud** (Frankfurt/Madrid; C5/ISO; OCI GenAI live; L40S/Hopper/Blackwell) → **UK Sovereign Cloud** (OFFICIAL-SENSITIVE; MoD agreement Jan 2026) → **Dedicated Region** (H100/H200/B200/GB200; 5-year commitment) → **Compute Cloud@Customer Isolated** (air-gapped, 6–8-week fast-start, 4–48 L40S) → **Isolated Region** (GPU list unpublished) → **Roving Edge RED v2** (3× L4; ruggedised; container "Station") for disconnected ops. No NATO SECRET accreditation is public for any rung.
- The miltech doorway: **Oracle Defense Ecosystem** cohorts + the Oracle Defence Tech Summit 2026 (Brussels).
- AIDP/Lakehouse only as the data layer of #5/#12 — Karsten's "opportunistic" rule respected.

**(c) What we already scoped or built that fits** (from the pipeline + packs sheet + FreeTech):
- Riyadh Air document extraction (delivered, UAT) → #4 · DHL Client Compass deep-research (in delivery) → #2 · Channel 4 / Belron VSS (contracted) → #1 · Bosch WfO cuOpt (delivered) + Sky fleet (proposal) → #6 · NHS complaints case-agent (funded, undated) → #11 pattern · Nesma technical-corpus RAG (pending) → #3 · OMV Physics NeMo (pending) → #10 · SBG project-package intelligence (live) → readiness/analytics pattern for #5.
- FreeTech 01–06 → #1, #2, #5, #8, #9, #10 (§5).
- Lakehouse Quick Start cases #4 (Real-Time Ops Watch) and #6 (regulated variant) → #5, #12.

---

## 9. The 12-case menu — detail cards

_Each card: scope · why fit · stack · data path (C1) · KPI (C9) · buyer(s) (C7) · Nemotron role (C8) · risks · scorecard. Kept to the register of the WfO/Lakehouse decks so cards can be lifted into a one-pager._

### #1 ISR footage search & summarisation
- **Scope (6 wks):** deploy the VSS pack in the customer's OCI tenancy; ingest an archive of drone/FMV/CCTV footage (customer-supplied or an open drone dataset); natural-language scene search, timestamped event summaries, reviewer annotations fed back for tuning; "ISR review" skin on the pack's existing broadcast-compliance UI.
- **Why fit:** exact pack fit (the webinar demoed this skin end-to-end); Channel 4 and Belron give two contracted proofs; FreeTech #06 gives the defence-vision credibility; visual in minutes.
- **Stack:** OCI OKE + GPU, VSS blueprint (GA 2.4.1; docs 3.0.0 — multi-live-stream, audio transcription; Cosmos VLM + Nemotron LLM inside), Nemotron/Llama VLM via OCI Enterprise AI, Object Storage, RBAC/audit from the pack.
- **Data path:** open drone datasets for the demo; customer archive for the PoV; classified FMV only in a Dedicated Region / CC@C Isolated phase 2 (research read: ISR on real data is the least PoV-friendly cluster — the open-data scoping is what makes this sellable).
- **KPI:** analyst minutes per hour of footage reviewed; recall on a labelled event set.
- **Buyers:** forces (ISR units, base security); miltech (drone/sensor vendors adding search to their product).
- **Nemotron role:** VLM/LLM swap-in for the sovereign phase; Nano Omni for the video-to-text path.
- **Risks:** footage classification; edge ingestion outside the PoV.
- **Scorecard:** C1 ✅ C2 ✅ C3 ✅ C4 ✅ C5 ✅ C6 ✅ C7 ✅ C8 ✅ C9 ✅

### #2 Multi-source intel fusion & daily brief (OSINT-first)
- **Scope (6–8 wks):** AIQ-based deep-research agent over open sources (news, official releases, ship/flight open feeds, selected social) plus one customer document set; produces cited entity dossiers and a scheduled INTSUM-style brief; analyst approve/edit UI with source links; evaluation harness on a fixed question set.
- **Why fit:** FreeTech #02 delivered the same job in wartime; DHL Client Compass is the same architecture in delivery; AIQ = Nemotron reasoning + NeMo Retriever + Agent Toolkit, i.e., the exact NVIDIA public-sector pitch.
- **Stack:** Agentic AI Starter Kit (AI-Q blueprint `release/2.1` — GA label ⚠ unverified), Nemotron Super (OCI Model Import, Mar 2026) / Nano, NeMo Retriever (26 languages), OCI Object Storage / Autonomous for the corpus; SoftServe harness for permissions + observability.
- **Data path:** OSINT is unclassified by definition; customer corpus optional. Demand evidence: a NATO SITCEN OSINT AI Alerting Platform RFP exists (⚠ date/value/award unverified); Griselda (UA) is the delivered analogue.
- **KPI:** brief preparation time; citation precision on the question set.
- **Buyers:** forces/MoD intel & policy staffs; NATO agencies; miltech (threat-intel product teams).
- **Nemotron role:** the reasoning model of record.
- **Risks:** hallucination optics in an intel context → citations + eval harness mandatory; source-licensing for scraped feeds.
- **Scorecard:** C1 ✅ C2 ◐ (baseline = current manual brief time) C3 ✅ C4 ✅ C5 ✅ C6 ✅ C7 ✅ C8 ✅ C9 ✅

### #3 Doctrine / STANAG / technical-manual assistant
- **Scope (4–6 wks):** Knowledge Chat Agent pack (self-hosted edition) over a public corpus (unclassified STANAGs/APs, national doctrine, sample S1000D manuals) + one customer corpus; multilingual Q&A with clause-level citations; role-scoped retrieval (two roles) from the SoftServe harness.
- **Why fit:** flagship pack, ~out-of-box; every AI-Q SOW so far scoped OUT permissions/observability — precisely the layer a NATO buyer asks about first, and SoftServe's harness row exists for it; Nesma (engineering-archive search) is the closest analogue. Demand evidence: UK DAIC "Intelligent Search & Document Discovery" and "LLMs for Defence"; NATO ACT's own **AI FELIX** Command Read Board assistant; GenAI.mil's 3M seats show the enterprise-assistant bucket is the volume business.
- **Stack:** Knowledge Chat pack, Nemotron Nano/Super, OCI Language for translation where needed.
- **Data path:** public corpus + customer unclassified manuals.
- **KPI:** answer accuracy on a 100-question set; time-to-answer vs manual lookup.
- **Buyers:** forces (training, maintenance, staff); miltech (product manuals for their operators).
- **Nemotron role:** generation + embedding path (NeMo Retriever).
- **Risks:** "commodity RAG" pressure — differentiate on the permission model and multilingual corpus.
- **Scorecard:** C1 ✅ C2 ✅ C3 ✅ C4 ✅ C5 ✅ C6 ✅ C7 ✅ C8 ✅ C9 ✅

### #4 Defence procurement & contract document intelligence
- **Scope (6 wks):** Document Extraction pack on 3 document types (tender/contract, maintenance record, movement/customs document); page classification → per-type extraction with citations → deterministic validation → human review queue → write to a target table/system; confidence badges.
- **Why fit:** Riyadh Air proved the pattern (3–5 days → 15 min per contract, 90–95% dry-run accuracy) on the very pack; agencies and suppliers both drown in these documents; unclassified by nature; and it sits directly next to the one Oracle estate NATO verifiably runs — NCIA's E-Business Suite + Fusion (Finance, HR, Acquisition, Asset Management) — so the "Fusion doorway" pattern applies as written. ⚠ No NATO-side IDP programme was found publicly; the demand evidence is the US Task Force Lima enterprise bucket (procurement, finance, HR).
- **Stack:** AI Document Extraction pack (VLM), Nemotron Nano Omni as the sovereign OCR/VLM alternative, OCI Document Understanding/Language as Oracle-native components, Autonomous DB target.
- **Data path:** public tender documents (agency portals) + customer samples.
- **KPI:** minutes per document; field-level accuracy; exception rate.
- **Buyers:** procurement agencies; MoD commercial teams; miltech vendors (bid/contract ops).
- **Nemotron role:** Nano Omni replaces the third-party VLM in the sovereign phase.
- **Risks:** scanned-PDF quality; multi-language forms.
- **Scorecard:** C1 ✅ C2 ✅ C3 ✅ C4 ✅ C5 ✅ C6 ✅ C7 ✅ C8 ✅ C9 ✅

### #5 Fleet readiness & operations control tower
- **Scope (6–8 wks):** Autonomous AI Lakehouse gold layer over fleet/maintenance/mission data (synthetic generator if the customer cannot release data); readiness dashboard; conversational analytics (Select AI); one exception-watchdog agent (maintenance due, spares short, mission conflicts) with alerting; maintenance-planning view with approve/reject.
- **Why fit:** FreeTech #04 delivered this platform in wartime; Denys' "simplest, most visual"; the only case where AIDP/Lakehouse is the natural layer, so it carries Oracle's Motion-B consumption; addresses Dmytro's "back-end-ish" objection with the watchdog + planning UI. The taxonomy research rates logistics/sustainment/predictive maintenance the **most PoV-friendly cluster of all** (low-classification maintenance/ERP data, arithmetic ROI) — demand evidence: USAF PANDA/CBM+ (C3 AI, system of record since Apr 2023), UK "Spare Parts Failure Prediction" and "Typhoon Predictive Maintenance Optimisation", DIANA "Critical Infrastructure & Logistics" / "Responsive Logistics".
- **Stack:** Autonomous AI Lakehouse (26ai, Select AI agent GA), GoldenGate CDC optional (Lakehouse QS #4), cuOpt for allocation (optional), Bosch-style map/approve UI.
- **Data path:** synthetic fleet dataset; customer EAM/ERP extract phase 2 (NATO-nation MoDs often on Oracle apps — verify §4).
- **KPI:** time to readiness picture; exceptions caught before due date.
- **Buyers:** forces (logistics/maintenance commands); NATO agencies (NSPA-type); miltech (fleet operators, MRO providers).
- **Nemotron role:** the NL layer over the mart in the sovereign phase (Select AI is Oracle-native; Nemotron via OCI Enterprise AI).
- **Risks:** "too back-end-ish" if the UI is skimped; data extraction from legacy EAM.
- **Scorecard:** C1 ✅ (synthetic) C2 ◐ C3 ✅ C4 ◐ (Lakehouse GA, no pack) C5 ✅ C6 ✅ C7 ✅ C8 ◐ C9 ✅

### #6 Mission logistics optimisation (routing · scheduling)
- **Scope (6 wks routing / 8 wks scheduling):** Vehicle Route Optimizer pack on open maps with the customer's demand file (stops, time windows, vehicle capacities) plus risk-layer constraints (avoid zones, convoy spacing); before/after KPI harness; dispatcher approve/reject UI. Scheduling skin: maintenance-crew / watch-bill optimisation on the Bosch WfO base.
- **Why fit:** two shipping cuOpt packs + Bosch (2 days → 30 min, up to +26% productivity on PoV data) — optimisation is where GPU-on-OCI is visibly the product, and Sky already surfaced the baseline lesson to design around.
- **Stack:** cuOpt (open source, Apache 2.0) NIM on OCI GPU, Route Optimizer pack, map/distance provider, WfO constraint-mapping library.
- **Data path:** open maps + synthetic demand; customer file for the PoV. Demand evidence: UK DAIC "Last-Mile Resupply"; DIANA 2027 "Responsive Logistics".
- **KPI:** planning time; km/fuel; coverage; baseline established in week 1 (C2).
- **Buyers:** forces (movement control, maintenance units); NATO logistics agencies; miltech (fleet/MRO operators).
- **Nemotron role:** optional NL "talk to your plan" layer (webinar demo pattern).
- **Risks:** no baseline (Sky); constraint explosion → cap at 5 rules as in the WfO M-package.
- **Scorecard:** C1 ✅ C2 ◐ C3 ✅ C4 ✅ C5 ✅ C6 ✅ C7 ✅ C8 ◐ C9 ✅

### #7 Coalition speech & multilingual reporting
- **Scope (4–6 wks):** ASR (Nemotron Nano Omni / Riva) on recorded radio nets and meetings in 3 NATO languages; diarisation; translation + summarisation into a searchable, timestamped log; correction UI; accuracy readout by language.
- **Why fit:** Nemotron-native and sovereign by design (audio never leaves the tenancy); a 32-nation interoperability problem; the "ambient scribe" and "transform at scale" L2s already sit in the map; small, fast, cheap.
- **Stack:** Nemotron 3 Nano Omni (ASR/OCR/video in one model — **in OCI Enterprise AI since ~May 2026**) or the streaming ASR NIMs (Nemotron-3.5-ASR-Streaming 0.6B, 40 locales; Parakeet-TDT-0.6b-v3 / Canary-1b-v2, 25+ European languages) on OCI GPU; OCI Speech/Language as Oracle-native alternatives; Autonomous DB for the log.
- **Data path:** public multilingual speech corpora + customer recordings. Demand evidence: DIANA "Advanced Communications"; interoperability is a named 2024 NATO AI-strategy priority; JATEC's Google scope includes machine translation (the competitor's foothold).
- **KPI:** word-error rate per language; minutes saved per meeting/net hour.
- **Buyers:** forces (HQ staffs, multinational units); NATO bodies; miltech (radio/C2 vendors).
- **Nemotron role:** the whole pipeline.
- **Risks:** radio audio quality; low-resource languages; Roving Edge's L4s hold the ASR NIM and Nano/Lightning NVFP4, not Super/Ultra (edge variant must be scoped accordingly).
- **Scorecard:** C1 ✅ C2 ✅ C3 ✅ C4 ✅ C5 ✅ C6 ✅ C7 ✅ C8 ✅ C9 ✅

### #8 RF signal clustering & pattern recognition (SIGINT/EW support)
- **Scope (8 wks):** GPU-accelerated clustering and pattern recognition on RF captures (open SDR/RadioML-type datasets or customer captures); multi-layer visualisation; operator UI to label clusters; drift/novelty detection.
- **Why fit:** FreeTech #03 delivered; Karsten's topic 1 verbatim; a capability no other Oracle partner shows; high curiosity value with the Oracle defence team.
- **Stack:** OCI GPU shapes, RAPIDS/cuML, custom pipeline; no pack.
- **Data path:** open RF datasets for the demo; customer captures are sensitive → phase 2 in CC@C Isolated / an Isolated Region (research read: EW/SIGINT data is inherently classified — the demo credibility rests on the FreeTech story, not the dataset). Demand evidence: UK DAIC "RF Signal Analysis"; DIANA "Contested Electromagnetic Environments"; DARPA ARC/BLADE.
- **KPI:** clustering purity on a labelled set; time from capture to insight.
- **Buyers:** forces (EW units); miltech (EW/SDR vendors).
- **Nemotron role:** none in the core (classic ML); optional LLM report layer.
- **Risks:** demo credibility on synthetic data; export-control sensitivity of real work; no pack → 8+ wks.
- **Scorecard:** C1 ◐ C2 ◐ C3 ✅ C4 ✖ C5 ✅ C6 ✅ C7 ◐ C8 ✖ C9 ◐

### #9 Autonomy dev-loop on OCI (synthetic data → train → sim-test)
- **Scope (8–10 wks):** stand up on OCI GPUs a synthetic-data generation + training + evaluation pipeline (Isaac Sim 6.0 / Cosmos 3 + Cosmos Reason 2 / Omniverse — run on OCI GPU/OKE; **no Oracle pack and no published OCI reference architecture ⚠**) for one perception or GNSS-denied navigation model; benchmark on a public dataset; deliver the pipeline as the reusable asset. Demand evidence: DIANA "Autonomy & Uncrewed Systems" (2026) / "multidomain autonomy" (2027); the Netherlands' "synthetic data factory"; Ukraine's Avengers Labs (5M annotated frames opened to partner countries, Aug 2026) shows the data-loop is the shared need.
- **Why fit:** FreeTech #01 + #06 are SoftServe's most differentiated proof; for miltech companies "OCI must be the platform" only makes sense as the dev-loop, not the vehicle; keeps the kinetic end out.
- **Stack:** OCI GPU (H100/H200/B200 — shapes to verify), NVIDIA Isaac/Cosmos, TAO, NIM packaging for the edge target.
- **Data path:** synthetic + public datasets.
- **KPI:** model accuracy vs baseline; sim-to-real gap on a fixed test; pipeline wall-clock.
- **Buyers:** miltech (drone/UGV makers) first; forces' innovation units second.
- **Nemotron role:** VLM annotation/QA in the data loop (Nemotron Nano Omni; the physical-AI VLM line is **Cosmos Reason 2**, a separate family — "Cosmos-Nemotron" is not a current product name).
- **Risks:** not a "menu" case for a general; edge hardware outside scope; Greengrass dependency in FreeTech #06 must be replaced.
- **Scorecard:** C1 ✅ C2 ◐ C3 ✅ C4 ◐ C5 ◐ C6 ✅ C7 ◐ C8 ◐ C9 ✅

### #10 Physics-informed digital twin / simulation surrogate
- **Scope (8–12 wks):** Physics NeMo surrogate for one physics problem (hydrodynamics of a UUV, structural/thermal of a platform component, or blast/infrastructure), validated against the incumbent simulator, served as an OCI API with an Omniverse visual; scenario dashboard.
- **Why fit:** FreeTech #05 delivered (coupled CFD/PINN, Omniverse); the OMV Physics-NeMo row already defines the productized shape; Karsten topic 5 (continuous improvement/testing).
- **Stack:** Physics NeMo, OCI GPU, Omniverse (verify OCI path), model-as-API.
- **Data path:** customer simulation datasets (unclassified engineering data) or a public CFD case.
- **KPI:** surrogate speed-up × accuracy vs simulator; scenarios per day.
- **Buyers:** miltech (naval/aero/vehicle OEMs); defence R&D labs.
- **Nemotron role:** none in core.
- **Risks:** needs an engineering partner with data; 12 wks tests the PoV envelope.
- **Scorecard:** C1 ◐ C2 ✅ C3 ✅ C4 ◐ C5 ◐ C6 ✅ C7 ◐ C8 ✖ C9 ✅

### #11 Cyber-defence investigation agent
- **Scope (6 wks):** AIQ case-investigation agent over open CVE/threat feeds and a synthetic SOC alert stream + the customer's (unclassified) asset inventory; exposure triage, alert-to-verdict narratives, containment proposals for approval; audit trail.
- **Why fit:** "SecOps investigation" is a mapped L2; every NATO nation funds cyber every year; OCI security services + Nemotron give an Oracle-native, sovereign story; NCIRC-type buyers are recognisable.
- **Stack:** AIQ starter kit, Nemotron, OCI Logging/Security services; NVIDIA Morpheus is available but **dated** (docs at 25.06) — prefer the AI-Q agent + the open-source cyber reasoning systems DARPA AIxCC released (Aug 2025) as reference code.
- **Data path:** open feeds + synthetic alerts. Demand evidence: NCIA's NATO Cyber Security Centre end-of-life replacement (est. €27.1M); Leonardo's AI multi-agent cyber platform inside the €200M PBN; EDA TAID "Active Autonomous Cyber Defence".
- **KPI:** mean time to triage; analyst hours per incident.
- **Buyers:** forces/MoD SOCs; NATO agencies; miltech (product security).
- **Nemotron role:** reasoning + report generation.
- **Risks:** crowded market (Palantir/Microsoft/Google-class incumbents); needs a SoftServe cyber reference ⚠.
- **Scorecard:** C1 ✅ C2 ◐ C3 ✅ C4 ✅ C5 ✅ C6 ✅ C7 ✅ C8 ✅ C9 ✅

### #12 Governed sovereign data layer for AI
- **Scope (4–6 wks):** Autonomous AI Lakehouse instance with classification-aware policies (virtual private database rows by nation/clearance, dynamic masking, SQL firewall) enforced across DB, Iceberg and the agent; one role-scoped agent demo — same question, different answers by clearance; policy audit report.
- **Why fit:** converts Oracle's strongest defence argument (sovereign private cloud + data-layer controls) into something a CISO can see; the regulated variant is already designed in the Lakehouse QS sheet (#6) and NHS surfaced masking as a hard requirement; sells consumption before any use case. Demand evidence: EDA TAID "Data-Centric Security" (May 2025); DIANA 2024 "Data & Information Security"; NATO's Data Exploitation Framework Policy (2022) and Data Quality Framework (Aug 2025) — "data-centric security" is the buyer's own vocabulary.
- **Stack:** Autonomous AI Lakehouse 26ai, Select AI agent, OCI IAM/identity domains; Nemotron via OCI Enterprise AI.
- **Data path:** synthetic personnel/logistics dataset.
- **KPI:** policy coverage; zero cross-clearance leakage on a test suite.
- **Buyers:** MoD/NATO CIO & security offices; miltech handling controlled data.
- **Nemotron role:** the agent model in the sovereign phase.
- **Risks:** ⚠ Iceberg-side masking undocumented (Lakehouse QS note — verify with Javier); "config ≠ product" — only sells attached to #3/#5.
- **Scorecard:** C1 ✅ C2 ✅ C3 ✅ C4 ✅ C5 ✅ C6 ✅ C7 ✅ C8 ◐ C9 ◐

---

## 10. Bench — kept out of the 12, kept for the brainstorm

| Idea | Why not now | Trigger to promote |
|---|---|---|
| Tender/bid response drafting for miltech vendors (NSPA/NCIA/EDF calls) | strong but vendor-only; overlaps #3/#4 stack | if Oracle's segment turns out to be miltech-heavy |
| Export-control / classification-marking screening (review-compare-verify) | needs a legal-rule corpus per nation | a customer with an export-control backlog |
| After-action review analytics (exercise logs → findings) | Karsten topic 5 fit, but needs exercise data | a training command sponsor |
| COA / what-if analyst; wargaming support | needs C2 data + doctrine model; C6/C1 fail | phase 2 of #5 once a mart exists |
| Pilot / crew simulator on a game engine | team verdict: no data, no asset library | a partner with the visual asset library |
| Depot pick-path optimisation (Warehouse pack) | exact pack fit but no proof and small ticket | an NSPA-type depot sponsor |
| Maintainer AR/multimodal assistant | no pack, AR hardware | a maintenance command with devices |
| Deployment-readiness orchestrator; supply exception worker | valuable but integration-heavy (M-package) | after #5 lands |
| Counter-UAS detection (non-kinetic sensing) | sensitive; sits on #1/#8 stack | Oracle defence team asks for topic 4 explicitly |
| Space domain awareness / EO pipelines | no delivered reference | a space agency lead |

---

## 11. Open questions, gaps, next steps

**For Alex's brainstorm / the Oksana + Denys pre-alignment**
1. Which FreeTech assets are actually **reusable** (IP ownership, code vs. know-how) — one line per case (01–06)?
2. Does SoftServe hold or can it obtain a **NATO/EU facility & personnel clearance** path? Without it every case stops at the unclassified phase — acceptable for PoVs, must be stated.
3. FreeTech #06 runs on **AWS Greengrass** — what is the OCI edge answer (Roving Edge / OKE at edge)? Verify before showing it to Oracle.
4. Confirm the **Sep-2 team call** outcome (⚠ not in the wiki) and whether Karsten's Michael meeting happened.

**For Karsten / Michael / Bram (Oracle)**
5. Which of the two buyers (forces vs miltech) does Oracle's NATO channel actually reach first, and via which contracting vehicle (NCIA/NSPA frameworks vs national MoDs vs the Oracle Defense Ecosystem)?
6. **What exactly did NCIA buy in Sep 2025** — deployment model (EU Sovereign Cloud / Dedicated Region / Isolated Region), classification level, and whether it sits inside the PBN multi-cloud? This is the single most load-bearing unknown (§4.1–4.2).
7. Which OCI region types are in play for NATO work and which **GPU shapes** are available in each — in particular inside an Isolated Region (unpublished) and whether **Nemotron import works in the EU Sovereign Cloud** (unverified)?
8. Are Oracle's 8 internal AI-Lakehouse industry accelerators relevant to public sector / defence? (open since 2026-07-22)
9. Is there an Oracle public-sector Nemotron story to align with — the OCI US-Gov "plans to host Nemotron" (Mar 2026) is not GA, and AWS GovCloud already runs Nemotron at FedRAMP High / IL5 (Jun 2026)?
10. Does Oracle's Thales / Red Reply / Shield Reply NCIA delivery chain leave room for a SoftServe pod, or is the NATO agency work already staffed?

**Gaps in this report** — ⚠ FreeTech one-pager not read directly · ⚠ Sep-2 call outcome unknown · ⚠ Karsten's "major private cloud for NATO" claim: §4 shows what is public (enterprise tier, multi-cloud NCIA) · ⚠ no SoftServe defence reference in cyber (#11) or speech (#7) — both rest on packs/models, not delivered proof · ⚠ **all NATO/NVIDIA/Oracle-docs facts are search-engine extracts** (the sandbox's egress policy blocked the primary domains) — re-read before any client-facing use · ⚠ Nemotron licence text differs across model cards (OpenMDW-1.1 vs NVIDIA Nemotron Open Model License) · ⚠ Ukraine "Kropyva" and Unmanned Systems Forces programme lines unverified · ⚠ AI-Q GA status and VSS 3.0 GA date unverified.

**Suggested next step (deliverable for Sep 4):** lift §0 into a one-page "NATO use-case menu" for Karsten's thread (the 12 rows + tier legend + the "not on the menu" line), and bring the §9 cards to the Oksana/Denys pre-alignment as the packs ↔ needs mapping.

---

## Sources

_Internal:_ [oracle-defense.md](../oracle-defense.md) · [oracle.md](../oracle.md) · [oracle-ai-offerings.md](../oracle-ai-offerings.md) · [oracle-pipeline.md](../oracle-pipeline.md) · [sbg-poc.md](../sbg-poc.md) · [oracle-packages-tshirt-sizing.md](oracle-packages-tshirt-sizing.md) · call notes [2026-06-17 R&D cross-team update](../calls/oracle/2026-06-17_180940_default_20260617170801ABB6DADE.md), [2026-07-24 post-mortem](../calls/oracle/2026-07-30_134222_sales-call_20260724123234A771B64E.md), [2026-08-18 Hammad events-GTM](../calls/oracle/2026-08-18_sales-call_hammad-events-gtm.md) · Google Drive: "patterns" sheet (2026-07-10) · "SoftServe × Oracle — Productization use cases × AI Accelerator Packs" (2026-06-18) · "Oracle-NVIDIA AI Accelerator Packs — Webinar Summary" (PDF, Jun 2026) · "AI Lakehouse Quick Start — use cases" (2026-08-22).

_Web (research 2026-09-03; tier in brackets; NATO/NVIDIA/Oracle-docs items reached as search extracts — see caveats):_
- Oracle: [NCIA selects OCI, 2025-09-11 (tier 2 PR)](https://www.oracle.com/news/announcement/nato-communications-and-information-agency-selects-oci-2025-09-11/) · [UK MoD collaboration, 2026-01-14 (tier 2)](https://www.oracle.com/uk/news/announcement/oracle-expands-collaboration-with-ministry-of-defence-2026-01-14/) · [Compute Cloud@Customer Isolated, 2025-06-17 (tier 2)](https://www.oracle.com/news/announcement/oracle-advances-national-security-with-new-sovereign-air-gapped-cloud-offering-2025-06-17/) · [Isolated Region](https://www.oracle.com/government/govcloud/isolated/) · [Classified cloud / ONSR](https://www.oracle.com/government/govcloud/classified/) · [Dedicated Region FAQ](https://www.oracle.com/cloud/cloud-at-customer/dedicated-region/faq/) · [Roving Edge FAQ](https://www.oracle.com/europe/cloud/roving-edge-infrastructure/faq/) · [EU Sovereign Cloud FAQ](https://www.oracle.com/cloud/eu-sovereign-cloud/faq/) · [Defense Ecosystem launch, 2025-06-17](https://www.oracle.com/news/announcement/oracle-launches-first-of-its-kind-defense-ecosystem-to-redefine-national-security-innovation-2025-06-17/) · [ODE third cohort, 2026-06-25](https://www.oracle.com/news/announcement/oracle-strengthens-defense-ecosystem-to-help-emerging-technology-companies-scale-mission-ready-capabilities-2026-06-25/) · [US Gov AI infrastructure, 2026-03-31](https://www.oracle.com/news/announcement/blog/oracle-expands-ai-infrastructure-options-for-us-government-customers-2026-03-31/) · [Nemotron 3 Super import (release notes)](https://docs.oracle.com/en-us/iaas/releasenotes/generative-ai/nvidia-nemotron-3-super.htm) · [Nemotron 3 Ultra import](https://docs.oracle.com/en-us/iaas/releasenotes/generative-ai/nvidia-nemotron-3-ultra-nvfp4.htm) · [Nano Omni on OCI (blog)](https://blogs.oracle.com/cloud-infrastructure/nvidia-nemotron-3-nano-omni) · [OCI AI Accelerator Packs (blog)](https://blogs.oracle.com/cloud-infrastructure/oci-ai-accelerator-packs) · [OCI AI Blueprints (GitHub)](https://github.com/oracle-quickstart/oci-ai-blueprints) · [Sovereign AI (blog)](https://blogs.oracle.com/cloud-infrastructure/sovereign-ai) · [GTC 2026 announcements (blog)](https://blogs.oracle.com/cloud-infrastructure/oracle-nvidia-gtc-2026-key-announcements) · [Roving Edge Device v2 (blog)](https://blogs.oracle.com/cloud-infrastructure/empowering-edge-oracle-roving-edge-device-2nd-gen)
- NATO / agencies: [NCIA: Oracle cyber agreement, 2019](https://www.ncia.nato.int/about-us/newsroom/nato-agency--oracle-sign-cyber-information-sharing-agreement-) · [NCIA: Service Support & Business Applications](https://www.ncia.nato.int/about-us/service-portfolio/service-support-and-business-applications) · [NCIA: €200M PBN contract](https://www.ncia.nato.int/newsroom/news/nato-advances-towards-more-agile-and-resilient-digital-infrastructure-through-200meur-contract-with-industry) · [NCIA: MSS NATO](https://www.ncia.nato.int/newsroom/news/nato-acquires-aienabled-warfighting-system) · [NCIA: eAirC2 awards](https://www.ncia.nato.int/newsroom/news/nato-accelerates-transformation-of-air-command-and-control-with-key-contract-awards) · [NCIA: AI strategic initiative](https://www.ncia.nato.int/about-us/newsroom/nato-launches-artificial-intelligence-strategic-initiative) · [NCIA: NCSC procurement](https://www.ncia.nato.int/about-us/newsroom/nato-cyber-security-centre-plans-to-acquire-new-cyber-defence-systems) · [NATO: revised AI Strategy 2024](https://www.nato.int/cps/on/natohq/news_227234.htm) · [NATO: 2021 AI Strategy summary](https://www.nato.int/cps/em/natohq/official_texts_187617.htm) · [NATO: Rapid Adoption Action Plan, 2025-06-25](https://www.nato.int/en/about-us/official-texts-and-resources/official-texts/2025/06/25/summary-of-natos-rapid-adoption-action-plan) · [NATO: Data Exploitation Framework Policy](https://www.nato.int/cps/en/natohq/official_texts_210002.htm) · [NATO: Data Quality Framework, 2025-08-06](https://www.nato.int/cps/en/natohq/official_texts_237308.htm) · [SHAPE: MSS full technical operational capability](https://shape.nato.int/news-archive/2026/nato-maven-smart-system-achieves-full-technical-operational-capability-) · [DIANA 2026 cohort](https://www.diana.nato.int/connect/nato-diana-announces-largestever-cohort-150-innovators-selected-across-ten-challenge-areas-for-2026-challenge-programme.html) · [DIANA 2027 challenges](https://www.diana.nato.int/connect/nato-diana-unveils-six-new-challenges-to-tackle-evolving-defence-and-security-needs.html) · [ACT: MAINSAIL](https://act.nato.int/article/mainsail-sinbad/) · [JWC: AI in training](https://jwc.nato.int/article/jwc-advances-ai-nato-training/) · [NSPA: ERP & codification fact sheet](https://eportal.nspa.nato.int/ac135/data/pdf/ERP_and_Codification_System_Structures-Fact-Sheet.pdf) · [NATO Innovation Fund](https://www.nif.fund/)
- Nations / EU / US: [UK Defence AI Strategy 2022](https://assets.publishing.service.gov.uk/media/62a7543ee90e070396c9f7d2/Defence_Artificial_Intelligence_Strategy.pdf) · [UK DAIC Defence AI Playbook 2024](https://assets.publishing.service.gov.uk/media/65bb75fa21f73f0014e0ba51/Defence_AI_Playbook.pdf) · [UK SDR 2025](https://assets.publishing.service.gov.uk/media/683d89f181deb72cce2680a5/The_Strategic_Defence_Review_2025_-_Making_Britain_Safer_-_secure_at_home__strong_abroad.pdf) · [UK–Palantir £240.6M (tier 2)](https://www.publictechnology.net/2026/01/29/defence-and-security/mod-signs-240m-palantir-deal-as-ministers-insist-uk-defence-data-remains-sovereign/) · [EDA TAID Annex 04 AI use cases, 2025-05-09](https://eda.europa.eu/docs/default-source/eda-publications/taid-annex-04-ai-use-cases-for-defence-v-1-0.pdf) · [EC: AI in Defence factsheet, Dec 2025](https://defence-industry-space.ec.europa.eu/system/files/2025-12/Factsheet%20AI%20in%20Defence.pdf) · [EC: EDF-2025 results, 2026-04-15](https://defence-industry-space.ec.europa.eu/commission-invest-eur107-billion-57-defence-projects-supporting-european-readiness-flagships-2026-04-15_en) · [DoD Data, Analytics & AI Adoption Strategy, 2023-11-02](https://media.defense.gov/2023/Nov/02/2003333301/-1/-1/1/DAAIS_FACTSHEET.PDF) · [CDAO AI Rapid Capabilities Cell, Dec 2024](https://ai.mil/Portals/137/Documents/Resources%20Page/2024-12-CDAO-Artificial-Intelligence-Rapid-Capabilities-Cell.pdf) · [DoW AI Strategy, 2026-01-12](https://media.defense.gov/2026/Jan/12/2003855671/-1/-1/0/ARTIFICIAL-INTELLIGENCE-STRATEGY-FOR-THE-DEPARTMENT-OF-WAR.PDF) · [Task Force Lima 180+ use cases (tier 2)](https://defensescoop.com/2023/11/06/inside-task-force-limas-exploration-of-180-plus-generative-ai-use-cases-for-dod/) · [DARPA AIxCC results, Aug 2025](https://www.darpa.mil/news/2025/aixcc-results) · [C3 AI: USAF PANDA system of record](https://c3.ai/air-force-selects-ai-enabled-predictive-maintenance-program-as-system-of-record/) · [NGA SEQUOIA $708M](https://www.nga.mil/news/NGA_announces_$708M_data_labeling_RFP.html) · [Uranos KI (hartpunkt, tier 2)](https://www.hartpunkt.de/uranos-ki-kuenstliche-intelligenz-fuer-die-gefechtsaufklaerung-der-bataillonsebene/) · [AMIAD (defense.gouv.fr)](https://www.defense.gouv.fr/amiad-agence-ia-defense) · [Dutch defence industry & innovation strategy 2025–29](https://english.defensie.nl/site/binaries/site-content/collections/documents/2025/04/04/defence-strategy-for-industry-and-innovation-2025-2029/) · [Poland AI Centre (tier 2)](https://www.army-technology.com/news/poland-ai-implementation-center/)
- Ukraine practice: [MoD UA: 12,000 targets weekly (Avengers)](https://mod.gov.ua/en/news/12-000-enemy-targets-are-detected-by-the-ukrainian-military-weekly) · [MoD UA: Avengers Labs](https://mod.gov.ua/en/news/ukrainian-defense-companies-to-train-their-own-ai-models-on-the-avengers-labs-platform) · [Delta (Euromaidan Press, tier 3)](https://euromaidanpress.com/2025/08/07/ukraines-delta-battlefield-management-system/) · [Brave1](https://brave1.gov.ua/en)
- Competing vendors: [Google Cloud + NATO JATEC, 2025-11-24 (tier 2)](https://www.googlecloudpresscorner.com/2025-11-24-NATO-and-Google-Cloud-Sign-Multi-Million-Dollar-Deal-for-AI-Enabled-Sovereign-Cloud) · [Accenture PBN, Jul 2026 (tier 2)](https://newsroom.accenture.com/news/2026/nato-announces-major-contract-with-accenture-to-help-advance-towards-a-more-agile-and-resilient-digital-infrastructure) · [Palantir × NVIDIA Nemotron engine, 2026-06-29 (tier 2)](https://www.businesswire.com/news/home/20260629390275/en/Palantir-Launches-Engine-for-Deploying-NVIDIA-Nemotron-Open-Models-in-Sovereign-Environments) · [Nemotron on AWS GovCloud FedRAMP High / IL5, Jun 2026](https://aws.amazon.com/about-aws/whats-new/2026/06/addl-bedrock-model-fedramp-il-5-govcloud/)
- NVIDIA: [Nemotron 3 Super (dev blog)](https://developer.nvidia.com/blog/introducing-nemotron-3-super-an-open-hybrid-mamba-transformer-moe-for-agentic-reasoning/) · [Inside Nemotron 3](https://developer.nvidia.com/blog/inside-nvidia-nemotron-3-techniques-tools-and-data-that-make-it-efficient-and-accurate/) · [Nemotron 3.5 Lightning](https://blogs.nvidia.com/blog/nemotron-lightning-switchyard-rtx-dgx/) · [Nano Omni](https://blogs.nvidia.com/blog/nemotron-3-nano-omni-multimodal-ai-agents/) · [Nemotron Open Model License](https://www.nvidia.com/en-us/agreements/enterprise-software/nvidia-nemotron-open-model-license) · [AI Factory for Government, 2025-10-28](https://blogs.nvidia.com/blog/us-technology-leaders-ai-factory-design-government/) · [AI-Q blueprint docs](https://docs.nvidia.com/aiq-blueprint/latest/index.html) · [VSS 3.0 docs](https://docs.nvidia.com/vss/3.0.0/overview/3.0.0/) · [cuOpt (GitHub)](https://github.com/NVIDIA/cuopt) · [NIM air-gap deployment](https://docs.nvidia.com/nim/large-language-models/2.0.4-pb6/deployment/air-gap-deployment.html) · [NIM on Oracle](https://docs.nvidia.com/nim/large-language-models/2.0.0/deployment/csp-deployment/oracle.html) · [Nemotron Coalition, Mar 2026 (tier 2)](https://investor.nvidia.com/news/press-release-details/2026/NVIDIA-Launches-Nemotron-Coalition-of-Leading-Global-AI-Labs-to-Advance-Open-Frontier-Models/default.aspx)
