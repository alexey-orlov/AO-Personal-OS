# Oracle-side team — who we deal with & what they want (reference)

_status: reference doc — decoded roster of the Oracle people on the SoftServe partnership, the two motions they sit in, and Oracle's goals_
_updated: 2026-06-18_
_source: LinkedIn + public-web research run in-session 2026-06-16 (per-profile subagents); product pages verified 2026-06-16/18; Gero role updated from the [2026-06-18 onboarding call](calls/oracle/2026-06-18_144751_sales-call_2026061814320114A9106F.md). Companion to [oracle.md](oracle.md) (partnership state) and [oracle-ai-offerings.md](oracle-ai-offerings.md) (product catalog). Inferences marked (inferred)._

## Headline

"The Oracle side" is **two parallel motions**, each staffed by senior technical specialists + PMs — and **no confirmed economic buyer in either**. Every named Oracle contact so far resolves to a senior IC or specialist, not a budget owner. Center of gravity: **US = product/strategy HQ; EMEA = the people SoftServe works with day-to-day.** NVIDIA (via gateway Karsten) is currently more central than Oracle itself.

- **Motion A — OCI AI Infrastructure (+ NVIDIA):** the weekly technical sync; the NVIDIA-built packs (AIQ / cuOpt / VSS); GPU / inference / agentic. US builds it, an EMEA "AI Centre of Excellence" deploys it.
- **Motion B — AIDP (AI Data Platform):** Oracle's Databricks/Snowflake answer; data + analytics + GenAI over enterprise/Fusion data. The 2026-06-12 AIDP call team. EMEA-anchored (Zürich, Utrecht).

## Roster

### Motion A — OCI AI Infrastructure (+ NVIDIA)

| Person | Role / title | Seniority | Focus | Base |
|---|---|---|---|---|
| **Dennis Kennetz** | Eng. Lead, OCI **AI Blueprints** (open-source inference platform on Kubernetes); OCI side of NVIDIA + Meta Llama-Stack partnerships; AI Accelerator Starter Packs; NVIDIA GTC + Oracle AI World speaker | Senior IC / tech lead | GPU inference, K8s/OKE, benchmarking; scaled AI Blueprints 0→1 to ~$20MM ARR ($100MM projected <1yr) | US (inferred) |
| **Ritika Gupta** (`rtkgupta`) | Sr. SWE, AI Frameworks / "AI Product Engineering @ OCI"; owns **OCI GPU Scanner** | Senior IC | GPU observability (Prometheus/Grafana/OpenTelemetry on OKE); K8s sig-windows | Seattle |
| **Vishnu Kammari** | **Principal PM, Applied AI & AI Infrastructure @ OCI**; ex-Google, Deloitte; AI-startup founder | Senior IC (PM) | Applied AI + AI infra (= the "Vishnu" in [oracle.md](oracle.md) re GTM-promoting the UI prototypes) | US Bay (inferred) |
| **Pulkit Sindhwani** | PM, **GenAI / Agentic / Multicloud Platform** @ Oracle (since Sep 2022) | Senior IC (PM) | GenAI+agentic GTM; Oracle DB platform across OCI/AWS/Azure/GCP | SF Bay / LA |
| **Deepak Soni** | **AI Architect, Oracle AI Centre of Excellence** (EMEA); ~5 yrs (since Feb 2021) | Senior IC architect | GPU-accelerated AI/HPC on OCI, NVIDIA stack, HPC/CAE, OKE | Málaga, ES |
| **Alessio Comisso, PhD** | **Senior GPU Solutions Specialist, OCI** (a.k.a. Senior Big Compute Specialist) | Senior IC specialist | GPU+HPC+AI on OCI, NVIDIA GPU shapes, scientific HPC; PhD computational/quantum-materials physics (Univ. Trieste) | Spain/EMEA |
| **Kenan Görücü** | **Cloud Compute Specialist, OCI EMEA**; ex-Emirates NBD | Senior IC specialist | OCI Compute/VMs, OKE, confidential computing, virtualization; emerging AI-infra (NVIDIA AI Infra cert Dec 2025) | Dubai |
| **Mirjana Rakuljić** | **Master Principal AI Architect, EMEA AI Centre of Excellence**; ex-T-Systems/NTT | Principal-level IC | Applied AI + AI-over-database: agentic AI, GenAI, Autonomous DB 23ai **Select AI**, OCI GenAI, OCI AI Agents, APEX; 20+ yr Oracle DB | Barcelona, ES |

Structure: **US build/product** = Kennetz, Gupta, Kammari, Sindhwani. **EMEA solutions / "AI Centre of Excellence"** = Soni, Comisso, Görücü, Rakuljić. Sindhwani (DB platform) and Rakuljić (Select AI / OCI AI Agents over Autonomous DB) sit on the **seam** between GPU-infra and the data platform.

### Motion B — AIDP (AI Data Platform)

| Person | Role / title | Seniority | Notes | Base |
|---|---|---|---|---|
| **Gero Gunkel** (gero.gunkel@oracle.com) | AIDP call **host/sponsor**; per Karsten (2026-06-18) Oracle **"customer CTO,"** customer-facing across data & AI, pre-sales + commercial, **leading the accelerator activities** — Karsten's main Oracle contact and the **owner of the productization/scaling workstream** Alex is joining (spans Motion B *and* Motion A) | Senior IC / AI-product specialist — **exec *pedigree*; treated as the de-facto owner/decision-maker for the accelerator workstream, but still not a confirmed budget owner** (inferred) | Ex-Group/Global Head of AI, **Zurich Insurance** (~2016–2020; Gartner innovation award 2017); then COO of ZCAM; WEF AI-in-finserv working group; LSE + IMD; NLP/doc-extraction patents. Absent from all Oracle exec rosters/AI World speaker lists; personally chases the NHS/DHL NDAs (hands-on, not VP). **Read: best champion, now also the routing/decision point for accelerator scope & prioritization — confirm whether his "commercial" remit extends to package/accelerator funding.** Alex's dedicated discovery call with him being set up (week of 2026-06-22). | Zürich, CH |
| **Amit Tyagi** (amit.tyagi@oracle.com) | AIDP **technical lead** (ran deck + live demo); title "Data Management Domain Expert – Analytics, Cloud Solutions Architect"; **author of Oracle's official AIDP onboarding blog series** | Senior IC solution architect | "Black Belt" = Oracle internal expert-SE/specialist designation. Data-platform lineage (Oracle Analytics Cloud, Autonomous DW). India-origin (possible recent relocation). | Utrecht, NL |
| **Milo** (Oracle) | AIDP **sales/partner lead**; owns commercials + joint-GTM follow-up | Unknown — **not yet researched** | **The Oracle node most likely to hold real commercial authority → research next.** | ? |

## What Oracle wants (goals — inference, well-grounded)

- **Motion A:** maximize **OCI GPU consumption** + turn NVIDIA blueprints into **repeatable, productized accelerators with reference logos** (land-grab — cf. Kennetz's $20M→$100M ARR math). SoftServe = the SI that operationalizes/hardens the IP.
- **Motion B:** **win the enterprise data-platform layer from Databricks/Snowflake** — migrate customer data estates onto AIDP on a TCO/displacement pitch. SoftServe = migration/delivery + co-sell partner.
- **Unified goal (the real one):** own the **entire enterprise-AI stack on Oracle** — the data layer (AIDP) feeding the compute/inference layer (OCI GPU). Data gravity on AIDP pulls AI workloads onto OCI GPUs; the packs give customers a reason to bring data to AIDP. **SoftServe is recruited as the delivery glue across both** — migrate the data AND run the AI on top, and prove it's repeatable.

## How they treat the engagement

- Engaged at the **senior-technical-specialist + PM tier**; genuinely strong people, but **no confirmed economic buyer** in either motion. Gero is the best champion (pedigree) and — as of 2026-06-18 — the **owner/decision point for accelerator scope & prioritization**; still unconfirmed whether his remit reaches package/accelerator *funding* (the open buyer question).
- Commercial authority most likely sits with **Milo** (Motion B) and with someone **above the specialists** on Motion A whom Alex hasn't met.
- Relationship is **technically serious but commercially early** — partner-managed from the specialist tier, not sponsored from the alliance/exec tier.
- **Highest-value next move:** map Milo + ask (via Milo and Karsten) "who owns package/accelerator funding and pricing decisions?" — the confirmed economic-buyer gap on both fronts.

## Product ownership → catalog

Full catalog + the stack picture in [oracle-ai-offerings.md](oracle-ai-offerings.md). Who works on what:

- **Vishnu Kammari** — AI Infrastructure, GPU Instances, OCI Enterprise AI, AI Services (his title spans infra + applied AI).
- **Pulkit Sindhwani** — OCI Enterprise AI (GenAI/agentic) + multicloud DB (Database@Azure/AWS/Google) + Autonomous AI Database.
- **Dennis Kennetz / Ritika Gupta** — AI Blueprints / GPU Scanner (under AI Infrastructure).
- **Gero Gunkel** — Oracle AI Data Platform (strategy/sponsor).
- **Amit Tyagi** — Oracle AI Data Platform + Analytics Cloud + Autonomous AI Database/Lakehouse + Select AI; author of the AIDP onboarding blog series.
- **Mirjana Rakuljić** — Select AI / OCI AI Agents over Autonomous DB (bridges A↔B).
