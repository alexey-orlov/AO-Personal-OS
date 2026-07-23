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
