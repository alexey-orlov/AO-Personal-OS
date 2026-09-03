# Oracle AI — offering topology (reference)

_status: reference doc — Oracle's AI product catalog, the layer SoftServe's verticalized accelerator packs build on_
_updated: 2026-09-03_
_source: oracle.com product pages, fetched 2026-06-18; structure list provided by Alex; the Motion-B data layer added 2026-07-23 and the **Autonomous AI Lakehouse product detail decoded at Oracle's 2026-08-05 enablement session** ([note](calls/oracle/2026-08-05_125052_default_20260805113131F0734A55.md)). Companion to [oracle.md](oracle.md) (partnership) and [oracle-team.md](oracle-team.md) (who we deal with). **Oracle's own EMEA enablement lab catalogue, the AIDP-off-the-lab-agenda move, and the accelerator→dedicated-AI-cluster monetisation link** added 2026-09-03 from the [Hammad events-GTM call](calls/oracle/2026-08-18_sales-call_hammad-events-gtm.md); the **sovereign / defence deployment line + Nemotron-on-OCI section** added 2026-09-03 from the [NATO use-case report](docs/2026-09-03_nato-ai-use-case-map.md)._

## Why this is here

Reference map of Oracle's AI offerings so partnership/prep work doesn't re-derive it. SoftServe's joint-IP packages (AIQ / cuOpt / VSS) are **verticalized "AI Accelerator Packs"** that sit on top of these services — see the mapping at the bottom. Naming reflects Oracle's post–AI World 2025 catalog (heavy rebrand: "Autonomous AI Database," GenAI pages consolidated under "OCI Enterprise AI").

## Oracle's AI taxonomy (master structure)

From the nav shared across every oracle.com/artificial-intelligence page — Oracle organizes AI into four buckets:

| Bucket | What it is | Members (page nav) |
|---|---|---|
| **Enterprise AI** | GenAI + agent build/deploy/govern layer | Enterprise AI · Generative AI Capabilities · Code Assist |
| **ML Services** | Custom ML / data science | Machine Learning Services · Data Science · VMs for Data Science · MySQL HeatWave AutoML |
| **AI Services** | Prebuilt, task-specific AI APIs (no ML expertise needed) | Digital Assistant · Speech · Language · Vision · Document Understanding · **AI Accelerator Packs** |
| **AI Infrastructure** | GPU compute + ops | AI Infrastructure · GPU Instances · GPU Scanner · Sovereign AI |

**Key tie-in:** "OCI AI Accelerator Packs" is itself a catalog item — *"full-stack AI solutions designed for specific use cases, deployed with one click in the OCI console… compress weeks of platform assembly into applications."* That IS the productization pattern SoftServe's packs follow, co-built with NVIDIA. The seven offerings below are the ones Alex flagged (the Enterprise-AI + AI-Services layers); GPU Instances / GPU Scanner / AI Infrastructure are detailed in [oracle-team.md](oracle-team.md) (Dennis Kennetz / Ritika Gupta own them).

## The offerings

### 1. OCI Generative AI — "Generative AI Capabilities"
- **URL:** https://www.oracle.com/artificial-intelligence/generative-ai/
- **What it is:** An umbrella/hub page (not a single product) for GenAI across Oracle's stack — "your choice of open source or proprietary LLMs, embedded as you need it across apps, infrastructure, and more."
- **Routes to:** Embedded GenAI in Fusion apps · **OCI Enterprise AI** · **AI Accelerator Packs** · Oracle Code Assist · OCI Data Science (custom LLMs via Hugging Face/PyTorch, Meta/Mistral models) · AI Vector Search in Oracle AI Database · HeatWave GenAI (in-DB) · Autonomous AI Database Select AI (NL→SQL).
- **Recent models (2026):** xAI Grok 4.1 Fast, Cohere Command A Vision/Reasoning, gpt-oss + Model Import; Google frontier-model collaboration. Differentiator framing: model choice, full-stack embedding, enterprise security/sovereignty, predictable pricing on OCI Supercluster.

### 2. OCI AI Agent Platform — "OCI Enterprise AI"
- **URL:** https://www.oracle.com/artificial-intelligence/enterprise-ai/  (**GA'd 2026-03-24**)
- **What it is:** Oracle's end-to-end platform to **build, deploy, and govern production-ready AI agents** across data sources — managed access to leading models with zero-data-retention endpoints, open standards/frameworks, sovereign AI options, consistent governance.
- **How it works (4 steps):** choose best-fit foundation model → connect agent to enterprise data (structured systems + vector-search RAG for unstructured) → define agent workflow (tools/APIs it can call, multistep orchestration; **MCP** named) → deploy with IAM access control, guardrails, observability, auditability.
- **Capabilities:** flexible model routing (pick best model per request, manage consumption) · dedicated AI clusters · RAG/vector grounding · guardrails + audit logs.
- **Use cases shown:** financial analysis, business-ops multiagent automation (CRM/ERP/shipping/billing), HR/recruiting automation (+Fusion HCM), DevOps incident response, healthcare compliance, clinical assistants.
- **Partnership relevance:** this is the agent layer SoftServe's **AIQ** ("agentic enterprise research") work rides on; the governance/sovereignty story matches the sovereign + open-model pitch in the 2026-06-17 R&D update.

### 3. Oracle Digital Assistant (chatbots)
- **URL:** https://www.oracle.com/chatbots/
- **What it is:** Complete platform for conversational experiences (text, chat, voice) for business apps.
- **Capabilities:** patented deep-learning NLU (multilingual, intent/context, few-/zero-shot) · assemble assistants from **skills** (prebuilt, custom, or templated) with dialogue-flow engine + back-end integration · one unified assistant across apps · channels: Teams, Slack, WhatsApp, SMS, web chat bubble, mobile, Facebook.
- **Use cases:** HR (Fusion HCM skills), customer service (Sales/Field Service/Siebel), ERP/SCM self-service (POs, inventory, expenses). Proof points: Office Depot 15–19% containment; ECHO 70% deflection / 400% ROI.
- **Note:** predates the LLM wave (skills/intents architecture); newer agentic work lives in OCI Enterprise AI.

### 4. OCI Language
- **URL:** https://www.oracle.com/artificial-intelligence/language/
- **What it is:** Text analysis + machine translation at scale via REST/SDK — no ML expertise needed.
- **Capabilities:** 100+ language detection · 18+ entity types · sentiment (aspect-level, scored) · classification into 600+ categories + key phrases · PII masking · **custom** classification + entity models (your data) · neural machine translation across 30 languages (incl. Word/PPT/Excel/HTML/SRT docs).
- **Compliance:** HIPAA, FedRAMP; customer controls data. Free pricing tier available.
- **Partnership relevance:** NLP layer behind **AIQ** contract-extraction (Riyad Air): entity/key-value extraction, classification.

### 5. OCI Speech
- **URL:** https://www.oracle.com/artificial-intelligence/speech/
- **What it is:** Speech-to-text (STT) + text-to-speech (TTS) AI service; accurate, text-normalized, time-stamped transcription + synthesized voice.
- **Capabilities:** prebuilt acoustic/language ASR models · native multilingual (EN, ES, PT, DE, FR, IT, HI) + **OpenAI Whisper** (57+ languages) · real-time transcription (limited avail.) · neural TTS (limited avail.) · speaker diarization · word-level confidence scores · profanity filters · no data stored for training.
- **Use cases:** media captioning/indexing, call analytics (+Language for sentiment/churn), medical dictation, accessibility.

### 6. OCI Vision
- **URL:** https://www.oracle.com/artificial-intelligence/vision/
- **What it is:** Deep-learning image (and stored-video) analysis at scale; prebuilt models out of the box + custom models on your own data.
- **Capabilities:** object detection · image classification · text/OCR detection in images · **custom** vision models · stored-video analysis (labels/objects/text/faces with timestamps, GA Dec 2024) · input from OCI Object Storage.
- **Use cases:** manufacturing defect/anomaly detection, digital-asset management/tagging, scene monitoring (e.g. powerline vegetation), product/shipment counting.
- **Partnership relevance:** the vision lineage behind **VSS** (visual analysis) — e.g. the Belron windscreen image/damage-processing case (earlier mis-transcribed as "Verilon").

### 7. OCI Document Understanding
- **URL:** https://www.oracle.com/artificial-intelligence/document-understanding/
- **What it is:** Extract text, tables, and key data from documents via API/CLI; prebuilt + custom models; built on Oracle CV + NLP.
- **Capabilities:** OCR text extraction · table extraction · key-value extraction · document classification · **custom** key-value models (label/train in OCI console, limited avail.) · JSON output to Object Storage · integrates with APEX, Digital Assistant, Data Integration → Autonomous Data Warehouse, Analytics Cloud, Process Automation (human review).
- **Use cases:** AP/invoice processing, expensing, content management, contract/form data extraction.
- **Partnership relevance:** core to **AIQ** contract-extraction (Riyad Air): page classification + per-type key-value extraction with citations + human-in-the-loop UI.

## How these map to SoftServe's Oracle packages

| SoftServe pack | Primary Oracle offerings underneath |
|---|---|
| **AIQ** (agentic enterprise research; contract extraction) | OCI Enterprise AI (agents) + Document Understanding + Language; deployed as an AI Accelerator Pack |
| **cuOpt** ("QOPT"; workforce/route optimization) | NVIDIA cuOpt on OCI GPU Instances + AI Infrastructure (not an OCI-branded AI service) |
| **VSS** (visual analysis) | OCI Vision lineage + NVIDIA visual blueprints |
| (cross-cutting) | AI Accelerator Packs = the one-click-deploy productization wrapper; Sovereign AI + open-source models = the differentiation pitch |

> Reminder: cuOpt/VSS/AIQ are **NVIDIA-built** packs delivered *on* OCI — the Oracle AI Services above are the closest Oracle-native analogues / co-deployed pieces, not always the literal engine. The packs' value-add is verticalization + custom UI + Oracle-native data, per [oracle.md](oracle.md).

## Data & managed-services layer (Motion B) — AIDP · AI Lakehouse · AIDP Innovation service

_Added 2026-07-23 from the [2026-07-22 Neil+Gero strategic alignment session](oracle.md#snapshot); the AI-Lakehouse product subsection added 2026-08-05 from Oracle's [enablement session #1](calls/oracle/2026-08-05_125052_default_20260805113131F0734A55.md). The catalog above is the Motion-A AI-services / Enterprise-AI layer SoftServe's NVIDIA packs ride on; this section captures the **data-platform + managed-services** offerings on Oracle's **Motion B**, which Oracle put front-and-center at that session (its events, lead-gen funnels, and product-team intros all treat **AI Lakehouse** and **AIDP** as separate line items)._

- **AIDP — Oracle AI Data Platform:** Oracle's broad, foundational data platform — unifies structured / unstructured / batch / real-time enterprise data into one AI-ready estate; **lakehouse architecture** (Apache Iceberg / Delta, medallion bronze→silver→gold) combining OCI + Autonomous AI Database + OCI GenAI. This is the "Databricks/Snowflake answer" the wiki has tracked since the 2026-06-12 AIDP call (differentiation = 20–60% TCO, forthcoming semantic-layer SKU, zero-copy catalog-of-catalogs, multi-cloud). Oracle projects **100s of qualified AIDP leads** from the Sept events.
- **AI Lakehouse:** Oracle markets an **"AI Lakehouse"** as a distinct offering **alongside** AIDP — its **own product team**, **own event billing**, and **own, larger lead funnel** (Oracle projects **~1,000 qualified AI-Lakehouse leads** from the Sept events, vs 100s for AIDP). **Oracle holds 8 industry-specific internal AI-Lakehouse-based accelerators** — pre-built verticalized solutions on the lakehouse; SoftServe asked for access to align its own proactive packaging with them. Product detail decoded at the 2026-08-05 enablement session → subsection below.
- **AIDP Innovation service (managed service):** a packaged **managed service priced per use case**, being stood up by **Gero's AI-&-Data PS org** and delivered by its internal **FDE team** (2–4 FDEs; use-case build in **1–2 weeks, not months**). Oracle intends to build it + drive adoption but plans to **offload customers to partners long-term** and run **blended pods** (Oracle-FDE-led or SoftServe-led); its launch may spawn **AIDP industry solutions** (industry-tailored builds). Org detail + partnership implications → [oracle-team.md](oracle-team.md).

### Autonomous AI Lakehouse — the product (decoded 2026-08-05)

_From Oracle's AI Lakehouse enablement session #1 for SoftServe (Javier, Oracle Lakehouse specialist; Gero hosting) — the delivery of the Jul-22 product-team-intro commitment. → [oracle.md#snapshot](oracle.md#snapshot)._

- **It is the Autonomous Data Warehouse, renamed.** Autonomous Data Warehouse → **Autonomous (AI) Lakehouse** is a **rebrand only — nothing changed functionally**. **"26ai" is the *version*** (vs 19c), **not a separate product**; 26ai is the version carrying the **vector** capabilities agents need. Treat "AI Lakehouse" in Oracle GTM material as this product, not a new engine.
- **Managed-service shape:** Oracle owns backups, patching, upgrades; **granular CPU scaling** (no T-shirt sizes); **workload-based auto-configuration** (e.g. hybrid columnar compression on by default for Lakehouse, off for transaction processing).
- **Claimed differentiators vs Databricks/Snowflake:** **Exadata** hardware vs their standard hardware · **converged data** — JSON, spatial, graph and vector in one database, avoiding a Mongo/Neo4j/Elastic/Snowflake engine sprawl (knowledge-graph traversal runs over the same relational data through a metadata layer, **no duplication or ETL to Neo4j**; example given: real-time circular-transaction fraud detection) · **translytical** — transactions + analytics in one DB, which matters because **agents need real-time, not historical, data**.
- **Security (a package-able strength):** SQL firewall · **virtual private database** row-level policies (e.g. country-scoped) · **dynamic data redaction / on-the-fly masking** (e.g. last 4 digits of an account) — enforced **consistently across the DB, Iceberg and the AI capabilities**. Directly relevant to the **NHS** opportunity, where masking was a hard requirement.
- **The gold-layer play (the main sales pattern):** typical customer shape is **ADP / Databricks / Spark for bronze + silver, Autonomous as the gold layer**. Oracle's cited Databricks gold-layer pain: slow queries, concurrency limits for BI users and agents, cost multiplication, and a catalog that went down frequently.
- **"Live AI Hub" quick win:** Autonomous as a **connectivity hub via database links** (Postgres, SQL Server, BigQuery, IBM, legacy Oracle) — build a semantic layer and apply AI in **~2 days without building a lakehouse from scratch**. Tooling: **Data Studio** GUI (drag-and-drop ELT, hundreds of connectors, Table AI Assistant, analytical views), **being rebuilt this summer as catalog-centric with embedded AI assistants**.
- **Multi-cloud / cost:** Autonomous appears as a **native service inside AWS/Azure/GCP regions** (Exadata sitting in the partner data centre), so the **host cloud's ingress/egress policy applies**; inside OCI there is no inter-service network traffic charge. Cross-tenancy / FastConnect cost specifics **unconfirmed** — Oracle owed a follow-up via sales. A single Autonomous instance can act as one query point across clouds and on-prem.
- **References:** few public case studies; several internal ones exist (an Exadata-19c + Databricks-on-Azure customer using Autonomous as the glue; a gaming company running bronze/silver in Spark with gold-layer departmental isolation). Oracle is open to sharing **anonymised architectures on request**. Public-web check 2026-08-21: still **no named Autonomous-AI-Lakehouse / Select-AI production customer with quantified outcomes** (product < 1 yr old) — packaging can't lean on public logos yet.
- **Select AI Agent is GA** (in 19c from RU 19.29, in 26ai from 23.26, ~Oct 2025; NL2SQL GA since 2023-09; published pre-built extensible agents) — a weeks-scale PoV runs entirely on GA features. (web, 2026-08-21)
- **Fusion connection — documentation-backed:** **FDI** (Fusion Data Intelligence, renamed "Oracle Fusion AI Data Platform") pipelines Fusion ERP/SCM/HCM/CX data **into an Autonomous AI Lakehouse instance the customer already owns** (FDI 26R2 docs), and **BICC extracts ship with every Fusion subscription** (PVO-based, full + incremental; documented path into AIDP/Iceberg). NOT documented: any direct Agent Studio ↔ Lakehouse integration — the agent-grounding story runs through AIDP/BICC. (web, 2026-08-21)
- **Oracle-run fixed-scope analogue:** **AI Factory** (2025-10-14) includes **"AI Acceleration Services"** — fixed-scope offerings with pre-built agents/use cases; partner packaging should align with it, not collide. **No Oracle-side partner lakehouse/AIDP quick start with published duration + price exists publicly** — first-mover whitespace the [AI Lakehouse Quick Start deck](oracle.md#snapshot) claims (2026-08-21); the big SIs' $1.5B+ commitments (Accenture/Infosys/Cognizant/LTIMindtree) crowd AIDP, not the lakehouse lane. (web, 2026-08-21)
- **Not yet covered (deferred to session #2, Fri 2026-08-07):** Iceberg catalog roadmap · analytical views / semantic layer · **Select AI + Select AI agent** with agent memory (claimed **~10× token savings**) · ontology creation · Iceberg performance · "Ask Oracle" prebuilt agents. Also open: which capabilities are **GA vs unreleased** (observability, data-science agents), and multi-cloud **performance** evidence.

- **Relationship (AIDP ↔ AI Lakehouse) — partly answered 2026-08-05, still genuinely open at Oracle.** Public sources are fuzzy (at AI World 2025 Oracle "finalized not one but two lakehouses," and AIDP itself embeds a lakehouse architecture), and **Oracle presents them as two distinct GTM motions** (separate product teams, event tracks, lead funnels) — so treat them as two engagement surfaces. The concrete boundary as of 2026-08-05: **ADP works with Delta only; Autonomous works with Iceberg only** — but treat this as the enablement-session read, not a public claim: **Oracle's public AIDP materials state both Delta AND Iceberg** (likely shipped-vs-roadmap nuance) — **never state "AIDP is Delta-only" externally** (web check, 2026-08-21). Today's options are (a) **recommended** — move/copy data to the gold layer via **Spark JDBC** into Autonomous, or (b) a PM workaround using **Uniform metadata + manual catalog integration**. **Native catalog integration is expected once ADP supports Iceberg ("soon", no date).** **Gero stated plainly that nobody at Oracle has a clean answer yet on how AIDP and AI Lakehouse will be *fully* integrated long-term** — so this is an Oracle-internal open question, not a SoftServe knowledge gap.

_Sources: [Pythian — AIDP overview](https://www.pythian.com/blog/oracle-ai-data-platform-aidp-no-nonsense-platform-overview), [Vigilant — AIDP market fit](https://vigilant-inc.com/oracle-ai-data-platform-what-it-is-and-where-it-fits-in-the-market/), [LeMagIT — Oracle's two lakehouses](https://www.lemagit.fr/actualites/366632762/AI-World-Oracle-finalise-non-pas-un-mais-deux-lakehouse) (web, 2026-07-23); the AI-Lakehouse-as-distinct-GTM-motion + 8 accelerators + AIDP-Innovation managed service from the 2026-07-22 session (chat, 2026-07-23)._

## How Oracle takes this catalog to market (2026-08-18, Hammad)

**The EMEA enablement lab catalogue** — what Oracle actually teaches customers hands-on at its AI Experience events (all OCI-based). Useful as a read on where Oracle is putting its own enablement weight:

- **Foundation** — AI applications with Oracle AI Database · Unified data layer with **Oracle Autonomous AI Lakehouse** · Assemble and deploy an AI agent using **RAG and SQL** (AI Data Platform foundation)
- **Advanced** — Build AI agents with **Python, RAG and LangChain** · Implement **persistent state, recall and adaptive reasoning** · **Optimise AI workload with intelligent model selection**
- **Business applications track** — Fusion-oriented
- Keynote themes: **agentic enterprise** + **AI economics**

**⚠️ AIDP is being pulled off the live-lab agenda; AI Lakehouse stays** (Hammad escalated this mid-call 2026-08-18; outcome unknown). **Read:** Oracle's internal centre of gravity for *hands-on enablement* is **Lakehouse**, even though AIDP remains a named demand priority. Partner-facing event content should lead with Lakehouse and carry AIDP as the forward-looking layer.

**How the accelerator motion monetises:** **accelerator-type projects tend to land as dedicated AI clusters** — client-committed, client-paid GPU capacity (a capability listed under *OCI Enterprise AI* above). The pack is the on-ramp; the compute commitment is the revenue. This is why Oracle's demand side pushes low-friction pilots so hard.

**SoftServe read:** the lab catalogue maps almost one-for-one onto SoftServe's own agentic-engineering capability (agent state/memory, RAG+SQL, model routing/selection economics) — **the constraint on partner content is access, not capability**. Full thread → [oracle-events-gtm.md](oracle-events-gtm.md)

## Sovereign / defence deployment line + NVIDIA on OCI (added 2026-09-03)

_From the NATO use-case research ([oracle-defense](oracle-defense.md) · [report §3.2 + §4.3](docs/2026-09-03_nato-ai-use-case-map.md)); web facts reached as search extracts of oracle.com / NVIDIA docs (the sandbox blocked the doc domains) — re-verify before client use._

**Deployment rungs a partner can build on** (public OCI → disconnected edge):

| Rung | Substance | GPUs | Accreditation |
|---|---|---|---|
| **OCI AI Accelerator Packs** (catalog announced 2026-01-12; Jun-2026 demo-day catalog = 7 packs: Vehicle Route Optimizer · Warehouse Pick Path Optimizer · Video Search & Summarization · Enterprise Knowledge Chat Agent (self-hosted + managed) · Agentic AI Starter Kit (AI-Q) · AI Document Extraction) | Terraform-deployed into the customer's own tenancy, open-source, Nemotron pre-integrated, RBAC + audit log, SSO via identity domains | public shapes L40S · H100 · H200 · B200 · B300 · GB200 · GB300 | — |
| **Oracle EU Sovereign Cloud** | Frankfurt + Madrid; EU entities + EU-resident staff; **OCI Generative AI live in Frankfurt** | L40S, Hopper, Blackwell orderable | C5 · ISO 27001/17/18/701 · DORA/NIS2 alignment |
| **UK Sovereign Cloud** | dual-region; **UK MoD agreement 2026-01-14** (Defence Digital; joins AWS + Microsoft under MODCloud) | — | OFFICIAL-SENSITIVE |
| **OCI Dedicated Region** / **Alloy** | full region in the customer's DC (100–150+ services incl. GenAI and Fusion SaaS); 5-year commitment; Alloy = partner-operated (Italy PSN) | L40S · H100/H200 · B200/GB200 (GB200 NVL72 superclusters) | national |
| **Compute Cloud@Customer Isolated** (2025-06-17) | single-rack air-gapped entry point, 6–8-week fast-start, upgrade path to an Isolated Region | 4 → 48 L40S | — |
| **Oracle Cloud Isolated Region** | air-gapped from 3 racks; Oracle-/customer-/partner-operated; reference Singapore MINDEF | GPU list unpublished (parity implied) | customer-defined |
| **Oracle National Security Regions** | US Secret / Top Secret; OCI GenAI GA in Top Secret regions 2026-01-13 | B300 | DISA IL6 — **US-only** |
| **Roving Edge** | RED v2 (2U, MIL-STD-810 case option), Ultra backpack, Station container | up to 3× L4 per RED v2 | — |
| **Oracle Defense Ecosystem** (2025-06-17 →) | 3 cohorts × 10 defence-tech partners; discounted Palantir Foundry + AIP on OCI; co-sell; Oracle Defence Tech Summit 2026, Brussels | — | — |

⚠ **No NATO RESTRICTED / NATO SECRET accreditation is public for any Oracle offering**; US and NATO accreditation paths are separate. NATO's own verifiable Oracle footprint = NCIA's E-Business Suite + Fusion ERP estate and the Sep-2025 NCIA→OCI selection (Thales prime; no value/term/region/classification published) — detail on [oracle-defense](oracle-defense.md).

**Nemotron on OCI — the nuance that changes PoV pricing:** Nemotron 3 Super (2026-03-11, first NVIDIA model there), Ultra-NVFP4 (Dedicated AI Cluster shape B200_X4) and Nano Omni (OCI Enterprise AI, ~May 2026) arrive via **OCI Generative AI Model Import onto a Dedicated AI Cluster**, or as NIM on OKE / OCI Marketplace / AI Quick Actions — **not** in the on-demand hosted catalog (Cohere, Meta Llama, xAI Grok, gpt-oss beta, Google Gemma). OCI US-Gov regions "plan to host" Nemotron (2026-03-31, not GA). Related GA items: Oracle AI Database 26ai GPU-accelerated vector indexing with NVIDIA cuVS (2026-03-17); OCI AI Blueprints (OKE stacks — vLLM serving, RAG, LoRA fine-tuning); NIM air-gapped deployment is documented on the NVIDIA side (download-to-cache → copy → run offline).
