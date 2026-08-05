# Oracle AI — offering topology (reference)

_status: reference doc — Oracle's AI product catalog, the layer SoftServe's verticalized accelerator packs build on_
_updated: 2026-07-23_
_source: oracle.com product pages, fetched 2026-06-18; structure list provided by Alex. Companion to [oracle.md](oracle.md) (partnership) and [oracle-team.md](oracle-team.md) (who we deal with)._

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

_Added 2026-07-23 from the [2026-07-22 Neil+Gero strategic alignment session](oracle.md#snapshot). The catalog above is the Motion-A AI-services / Enterprise-AI layer SoftServe's NVIDIA packs ride on; this section captures the **data-platform + managed-services** offerings on Oracle's **Motion B**, which Oracle put front-and-center at that session (its events, lead-gen funnels, and product-team intros all treat **AI Lakehouse** and **AIDP** as separate line items)._

- **AIDP — Oracle AI Data Platform:** Oracle's broad, foundational data platform — unifies structured / unstructured / batch / real-time enterprise data into one AI-ready estate; **lakehouse architecture** (Apache Iceberg / Delta, medallion bronze→silver→gold) combining OCI + Autonomous AI Database + OCI GenAI. This is the "Databricks/Snowflake answer" the wiki has tracked since the 2026-06-12 AIDP call (differentiation = 20–60% TCO, forthcoming semantic-layer SKU, zero-copy catalog-of-catalogs, multi-cloud). Oracle projects **100s of qualified AIDP leads** from the Sept events.
- **AI Lakehouse:** Oracle markets an **"AI Lakehouse"** as a distinct offering **alongside** AIDP — its **own product team**, **own event billing**, and **own, larger lead funnel** (Oracle projects **~1,000 qualified AI-Lakehouse leads** from the Sept events, vs 100s for AIDP). **Oracle holds 8 industry-specific internal AI-Lakehouse-based accelerators** — pre-built verticalized solutions on the lakehouse; SoftServe asked for access to align its own proactive packaging with them. Product detail decoded at the 2026-08-05 enablement session → next subsection.

### Autonomous AI Lakehouse — the product (decoded 2026-08-05)

_From Oracle's AI Lakehouse enablement session #1 for SoftServe (Javier, Oracle Lakehouse specialist; Gero hosting) — the delivery of the Jul-22 product-team-intro commitment. → [oracle.md#snapshot](oracle.md#snapshot)._

- **It is the Autonomous Data Warehouse, renamed.** Autonomous Data Warehouse → **Autonomous (AI) Lakehouse** is a **rebrand only — nothing changed functionally**. **"26ai" is the *version*** (vs 19c), **not a separate product**; 26ai is the version carrying the **vector** capabilities agents need. Treat "AI Lakehouse" in Oracle GTM material as this product, not a new engine.
- **Managed-service shape:** Oracle owns backups, patching, upgrades; **granular CPU scaling** (no T-shirt sizes); **workload-based auto-configuration** (e.g. hybrid columnar compression on by default for Lakehouse, off for transaction processing).
- **Claimed differentiators vs Databricks/Snowflake:** **Exadata** hardware vs their standard hardware · **converged data** — JSON, spatial, graph and vector in one database, avoiding a Mongo/Neo4j/Elastic/Snowflake engine sprawl (knowledge-graph traversal runs over the same relational data through a metadata layer, **no duplication or ETL to Neo4j**; example given: real-time circular-transaction fraud detection) · **translytical** — transactions + analytics in one DB, which matters because **agents need real-time, not historical, data**.
- **Security (a package-able strength):** SQL firewall · **virtual private database** row-level policies (e.g. country-scoped) · **dynamic data redaction / on-the-fly masking** (e.g. last 4 digits of an account) — enforced **consistently across the DB, Iceberg and the AI capabilities**. Directly relevant to the **NHS** opportunity, where masking was a hard requirement.
- **The gold-layer play (the main sales pattern):** typical customer shape is **ADP / Databricks / Spark for bronze + silver, Autonomous as the gold layer**. Oracle's cited Databricks gold-layer pain: slow queries, concurrency limits for BI users and agents, cost multiplication, and a catalog that went down frequently.
- **"Live AI Hub" quick win:** Autonomous as a **connectivity hub via database links** (Postgres, SQL Server, BigQuery, IBM, legacy Oracle) — build a semantic layer and apply AI in **~2 days without building a lakehouse from scratch**. Tooling: **Data Studio** GUI (drag-and-drop ELT, hundreds of connectors, Table AI Assistant, analytical views), **being rebuilt this summer as catalog-centric with embedded AI assistants**.
- **Multi-cloud / cost:** Autonomous appears as a **native service inside AWS/Azure/GCP regions** (Exadata sitting in the partner data centre), so the **host cloud's ingress/egress policy applies**; inside OCI there is no inter-service network traffic charge. Cross-tenancy / FastConnect cost specifics **unconfirmed** — Oracle owed a follow-up via sales. A single Autonomous instance can act as one query point across clouds and on-prem.
- **References:** few public case studies; several internal ones exist (an Exadata-19c + Databricks-on-Azure customer using Autonomous as the glue; a gaming company running bronze/silver in Spark with gold-layer departmental isolation). Oracle is open to sharing **anonymised architectures on request**.
- **Not yet covered (deferred to session #2, Fri 2026-08-07):** Iceberg catalog roadmap · analytical views / semantic layer · **Select AI + Select AI agent** with agent memory (claimed **~10× token savings**) · ontology creation · Iceberg performance · "Ask Oracle" prebuilt agents. Also open: which capabilities are **GA vs unreleased** (observability, data-science agents), and multi-cloud **performance** evidence.

- **Relationship (AIDP ↔ AI Lakehouse) — partly answered 2026-08-05, still genuinely open at Oracle.** Public sources are fuzzy (at AI World 2025 Oracle "finalized not one but two lakehouses," and AIDP itself embeds a lakehouse architecture), and **Oracle presents them as two distinct GTM motions** (separate product teams, event tracks, lead funnels) — so treat them as two engagement surfaces. The concrete boundary as of 2026-08-05: **ADP works with Delta only; Autonomous works with Iceberg only.** Today's options are (a) **recommended** — move/copy data to the gold layer via **Spark JDBC** into Autonomous, or (b) a PM workaround using **Uniform metadata + manual catalog integration**. **Native catalog integration is expected once ADP supports Iceberg ("soon", no date).** **Gero stated plainly that nobody at Oracle has a clean answer yet on how AIDP and AI Lakehouse will be *fully* integrated long-term** — so this is an Oracle-internal open question, not a SoftServe knowledge gap.
- **AIDP Innovation service (managed service):** a packaged **managed service priced per use case**, being stood up by **Gero's AI-&-Data PS org** and delivered by its internal **FDE team** (2–4 FDEs; use-case build in **1–2 weeks, not months**). Oracle intends to build it + drive adoption but plans to **offload customers to partners long-term** and run **blended pods** (Oracle-FDE-led or SoftServe-led); its launch may spawn **AIDP industry solutions** (industry-tailored builds). Org detail + partnership implications → [oracle-team.md](oracle-team.md).

_Sources: [Pythian — AIDP overview](https://www.pythian.com/blog/oracle-ai-data-platform-aidp-no-nonsense-platform-overview), [Vigilant — AIDP market fit](https://vigilant-inc.com/oracle-ai-data-platform-what-it-is-and-where-it-fits-in-the-market/), [LeMagIT — Oracle's two lakehouses](https://www.lemagit.fr/actualites/366632762/AI-World-Oracle-finalise-non-pas-un-mais-deux-lakehouse) (web, 2026-07-23); the AI-Lakehouse-as-distinct-GTM-motion + 8 accelerators + AIDP-Innovation managed service from the 2026-07-22 session (chat, 2026-07-23)._
