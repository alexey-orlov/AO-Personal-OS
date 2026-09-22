# P4 — Baseline capability audit (Oracle + NVIDIA) & failure paths

Status: IN PROGRESS (skeleton written 2026-09-22; sections fill progressively)
Research question A: is the claim "the Oracle+NVIDIA baseline provides only vector search + reranking" true?
Research question B: for each of the 12 workflow steps, what is the failure path and its industry-standard handling?

Source tiers: **T1** = primary vendor docs / GitHub / filings · **T2** = analyst / trade press · **T3** = vendor marketing / blog.

---

## Job A — What the Oracle + NVIDIA baseline actually provides

### A0. Verdict (one paragraph)
_pending_

### A1. NVIDIA AI-Q — what it is today

**What it is.** AI-Q is not a model and not a framework — it is a **deployable, self-hostable research backend shipped as an NVIDIA Blueprint**. NVIDIA's own words: "a deployable, customizable research system built on LangChain Deep Agents and accelerated by the NVIDIA NeMo Agent Toolkit" [T1: build.nvidia.com/nvidia/aiq]. The GitHub repo describes it as "an open reference example for building intelligent AI agents that connect to your enterprise data, reason using state-of-the-art models, and deliver trusted business insights" [T1: github.com/NVIDIA-AI-Blueprints/aiq].

Naming caution: two related artifact names are in circulation and they are **not** interchangeable.
- **"AI-Q NVIDIA Blueprint"** (repo `NVIDIA-AI-Blueprints/aiq`, docs `docs.nvidia.com/aiq-blueprint/`) — the current, actively versioned blueprint (v2.1.0 branch seen).
- **"AI-Q NVIDIA Blueprint for deep research" / "AI-Q Research Assistant"** (repo `NVIDIA-AI-Blueprints/aiq-research-assistant`, NGC collection `ai-research-assistant-blueprint`, RA PDF `ai-q-research-agent-blueprint`) — the deep-research packaging of the same lineage, also published as an NVIDIA Enterprise Reference Architecture.
Both are T1-documented and both ship the deep-research behaviour described below. [T1]

#### A1.1 AI-Q ↔ NeMo Agent Toolkit relationship

AI-Q is **built on top of** the NeMo Agent Toolkit, not a rename of it. The dependency is explicit and pinned: **NVIDIA NeMo Agent Toolkit 1.8.0** plus **LangChain Deep Agents 0.6.5+** and a **LangGraph** state machine [T1: github.com/NVIDIA-AI-Blueprints/aiq README]. NeMo Agent Toolkit is the open-source agent-composition/optimisation library (`github.com/NVIDIA/NeMo-Agent-Toolkit`); AI-Q is the opinionated research application assembled from it. Extensibility runs through toolkit primitives: "Custom NeMo Agent Toolkit functions let teams add internal knowledge bases or other enterprise data sources without changing agent code" [T1/T3: NVIDIA developer blog].

#### A1.2 AI-Q Research Assistant — what actually ships out of the box

From the architecture docs and repo README (all T1):

| Shipped component | What it does | Evidence |
|---|---|---|
| `ChatResearcherAgent` (LangGraph `StateGraph`) | Top-level orchestrator; `ChatResearcherState` carries workflow data | `agents/chat_researcher/agent.py` [T1 docs 2.1.0] |
| **Intent classifier** node | "Single LLM call: classifies intent (meta/research) and depth (shallow/deep)" | `nodes/intent_classifier.py` [T1] |
| **Clarifier agent** | "HITL plan generation and approval before deep research" — i.e. human-in-the-loop is a shipped node, not a gap | `agents/clarifier/agent.py` [T1] |
| **Shallow researcher** | "Bounded, faster researcher with tool-calling and source citation" | [T1 repo README] |
| **Deep researcher** | Multi-phase: clarify → optional **source router** → structured **plan** → **concurrent researcher workers** → **writer** synthesis | [T1 docs + README] |
| **Citation verification pipeline** | "Every research response passes through a deterministic post-processing pipeline that verifies citations against actually-retrieved sources"; removes unverifiable/unsafe URLs | [T1 docs 2.1.0] |
| **Report generation** | Long-form, citation-backed report as the deep path's output artifact | [T1] |
| **Report follow-up** | Ask questions about a completed report, or request cosmetic rewrites | [T1 build.nvidia.com] |
| **Data source registry / pluggable sources** | Web search, paper search, MCP tools, collaboration services, LlamaIndex, **NVIDIA RAG Blueprint**, **Azure AI Search**, **OpenSearch** | [T1 docs + NGC] |
| **Data-source filtering** | "Tools are filtered per request based on `data_sources`" | [T1 docs] |
| **Evaluation harnesses** | Built-in benchmarks: **FreshQA**, **Deep Research Bench**, **DeepSearchQA**; "Escalation thresholds and research loop counts are tuned through benchmarks" | [T1 docs] |
| **Policy controls** | "Opt-in policy controls through **NeMo Guardrails** middleware" | [T1 repo README] |
| **Skills / sandbox execution / durable outputs** | Runs generated code in isolated sandboxes (Modal, OpenShell providers); captures charts, CSVs, notebooks to storage | [T1] |
| **MCP server interface** | Exposes `submit_query`, `poll_query`, `get_final_report` | [T1 repo README] |
| **REST API + frontends** | Async deep-research jobs with replay; CLI, Web UI, Jupyter, Docker Compose / Helm | [T1] |
| **Workflow configuration** | YAML profiles change behaviour without code changes | [T1] |

Default NIM models declared by the blueprint: `nvidia/nemotron-3.5-lightning-30b-a3b` (intent classification, shallow research), `nvidia/nemotron-3-ultra-550b-a55b` (clarification + all deep-research roles), `nvidia/nemotron-3-embed-1b` (knowledge-layer embeddings), `nvidia/nemotron-3-nano-omni-30b-a3b-reasoning` (optional VLM) [T1 repo README]. The `build.nvidia.com` blueprint card additionally lists the retrieval stack: **Llama 3.3 Nemotron Super 49B v1.5**, **Llama 3.2 NV EmbedQA 1B v2**, **Llama 3.2 NV RerankQA 1B v2**, **NeMo Retriever Page Elements v3**, **NeMo Retriever Table Structure v1**, **NeMo Retriever Graphic Elements v1**, **NeMo Retriever OCR** [T1].

**Immediate consequence for the matrix:** the blueprint already ships planning, multi-source research, concurrent workers, report writing, citation verification, HITL plan approval, an evaluation harness and guardrails middleware. Any matrix row that says the baseline gives "nothing" for those steps is contradicted by a primary vendor page.

### A2. NVIDIA NeMo Retriever microservices

NeMo Retriever is "a collection of microservices for building and scaling multimodal data extraction, embedding, and reranking pipelines" built with NVIDIA NIM [T1: docs.nvidia.com/nemo/retriever]. Four component families, all T1-documented:

1. **Data extraction** (`github.com/NVIDIA/NeMo-Retriever`) — "a scalable, performance-oriented document content and metadata extraction microservice"; object-detection NIMs that detect and classify structured images inside enterprise documents (tables, charts, infographics) and extract text, tables, charts, images. Named members seen on the AI-Q card: **NeMo Retriever Page Elements v3**, **NeMo Retriever Table Structure v1**, **NeMo Retriever Graphic Elements v1**.
2. **Text Embedding NIM** — "state-of-the-art text and image embedding models"; semantic search / RAG. Current named model on the AI-Q card: **Llama 3.2 NV EmbedQA 1B v2**. [T1 docs.nvidia.com/nim/nemo-retriever/text-embedding/]
3. **Text Reranking NIM** — "reorder citations by how well they match a query… especially when the retrieval pipeline involves citations from different datastores". Named model: **Llama 3.2 NV RerankQA 1B v2**; a newer `nvidia/llama-nemotron-rerank-1b-v2` also exists on Hugging Face. [T1]
4. **Image OCR NIM** ("NeMo Retriever OCR") — extracts text from images, designed to pair with the object-detection NIMs. [T1]

So the *retrieval* half of the baseline is itself richer than "vector search + reranking": it includes **multimodal document ingestion/extraction (PDF tables, charts, OCR)**, which is step 2 of the workflow, not step 5.

### A3. NVIDIA NeMo Evaluator, NeMo Guardrails, and confidence/calibration tooling

**NeMo Evaluator** — a shipped, cloud-native microservice, part of the NeMo microservices platform (docs versioned through 26.3.1) [T1: docs.nvidia.com/nemo/microservices/…/evaluate/]. What it provides:
- 100+ academic benchmarks, custom metrics, and **LLM-as-a-Judge** scoring (its own documented tutorial: "Evaluate Response Quality with LLM-as-a-Judge") [T1].
- A dedicated **RAG evaluation flow** with **faithfulness, answer relevancy, context precision, recall@k** [T1: `evaluate/flows/rag.html`].
- API-driven, automatable in CI for regression testing [T1].

**NeMo Guardrails** — a shipped guardrail catalog, not a toolkit you have to write from scratch [T1: docs.nvidia.com/nemo/guardrails/]. Directly relevant rails:
- **Self-Check Fact-checking** output rail — "ensure that the answer to a RAG query is grounded in the provided evidence extracted from the knowledge base", checked against the `$relevant_chunks` context variable [T1].
- **Hallucination Detection** rail — a SelfCheckGPT variant: sample extra responses, then NLI-style consistency check of the original against them [T1].
- **AlignScore-based Fact-checking**; third-party grounding rails (**Patronus Lynx**, **Got It AI TruthChecker**) [T1 catalog].
- Plus jailbreak detection, input/output moderation, **Presidio**-based PII detection, LlamaGuard, ActiveFence, AutoAlign [T1].
- AI-Q wires these in as "opt-in policy controls through NeMo Guardrails middleware" [T1 AI-Q README].

**Calibration gap (important and honest).** What is *not* in evidence on any NVIDIA page I read: a shipped **numeric confidence score with calibration** (e.g. a calibrated probability attached to each generated claim, or magnitude scoring of a business implication). NeMo Guardrails gives **binary grounded/not-grounded verdicts**; NeMo Evaluator gives **offline aggregate scores over a dataset**. Neither is a **per-claim, runtime, calibrated confidence number**. That distinction matters for workflow step 9 and is the single most defensible "we build this" line in the matrix. [Unverified: whether a 2026 NeMo release added per-claim confidence — not found on the pages checked.]

### A4. Oracle components — exact current product names and what each provides

**Three naming corrections the matrix must absorb** (all T1):
1. **"Oracle Database 23ai" is superseded.** The current name is **Oracle AI Database 26ai**, announced 2025-10-14 at Oracle AI World; it "replaces Oracle Database 23ai" and is the long-term-support release. The vector feature name is unchanged: **Oracle AI Vector Search**. [T1: docs.oracle.com/en/database/oracle/oracle-database/26/vecse/ · T3: blogs.oracle.com/database/oracle-announces-oracle-ai-database-26ai]
2. **"Oracle Kubernetes Engine" is not a product name.** Oracle writes **"Oracle Cloud Infrastructure Kubernetes Engine (OKE)"**, short form **"Kubernetes Engine (OKE)"**. [T1: docs.oracle.com …/ContEng/Concepts/contengoverview.htm]
3. **"OCI Streaming" now names two things.** The current managed Kafka service is **Streaming with Apache Kafka** (docs path `Content/kafka/`, "OCI Streaming with Apache Kafka" in GoldenGate docs); the older **OCI Streaming** service still exists in docs. Use the Kafka name for anything new. [T1: docs.oracle.com/en-us/iaas/Content/kafka/overview.htm]

| # | Exact Oracle product name | What it provides (verified) | Source | Tier |
|---|---|---|---|---|
| 1 | **Oracle AI Vector Search**, a feature of **Oracle AI Database 26ai** | VECTOR datatype, vector indexes, similarity + **hybrid search** (keyword + vector) inside the converged DB; included at no extra charge | docs.oracle.com/en/database/oracle/oracle-database/26/vecse/ ; …/26/vecse/understand-hybrid-search.html | T1 |
| 2 | **OCI Generative AI** | Managed LLM inference/fine-tuning endpoints (incl. Cohere models) | oracle.com/artificial-intelligence/generative-ai/ (page blocks automated fetch; corroborated by T1 docs below) | T3/T1 |
| 3 | **OCI Generative AI Agents** | "Fully managed service…to create intelligent virtual agents." Ships: **RAG Tool**, **SQL Tool**, **Agent Tool** ("orchestrates networks of specialized agents"), **Custom Function Calling Tool**, **Custom API Endpoint Calling Tool**; plus **tools orchestration**, **multi-turn chat**, **context retention**, **custom instructions**, **Guardrails** (content moderation, prompt-injection, PII), **Human-in-the-loop** ("optional real-time monitoring and human intervention"). Knowledge bases back onto **OCI Object Storage** (service-managed vector store), **Oracle Database 23ai/26ai** vector search, and BYO **OCI Search with OpenSearch**. | docs.oracle.com/en-us/iaas/Content/generative-ai-agents/overview.htm ; …/create-knowledge-base.htm | T1 |
| 4 | **Oracle Cloud Infrastructure Document Understanding** | "extract text, tables, and other key data from document files through APIs and CLI tools"; document classification; **Key-Value Extraction powered by Large Multimodal Models (LMMs)**; custom generative + custom classic models | docs.oracle.com/en-us/iaas/Content/document-understanding/using/home.htm | T1 |
| 5 | **OCI Search with OpenSearch** | Managed OpenSearch: keyword, **vector**, and **hybrid search**; RAG pipelines and conversational search from v2.11; integrates with OCI Generative AI and OCI Generative AI Agents | oracle.com/cloud/search/ ; blogs.oracle.com/cloud-infrastructure/post/oci-search-with-opensearch-211-ai-innovations | T3/T1 |
| 6 | **OCI Object Storage** | Durable object store; also the substrate for service-managed Generative AI Agents knowledge bases | docs.oracle.com/en-us/iaas/Content/generative-ai-agents/create-knowledge-base.htm | T1 |
| 7 | **Oracle Cloud Infrastructure Kubernetes Engine (OKE)** | Managed Kubernetes; the deployment target for AI-Q's Helm chart | docs.oracle.com …/ContEng/Concepts/contengoverview.htm | T1 |
| 8 | **OCI Functions** — full name **Oracle Cloud Infrastructure Functions**; verbatim: "OCI Functions (sometimes abbreviated to just Functions, and formerly known as Oracle Functions)" | Serverless FaaS (Fn Project) | docs.oracle.com …/Functions/Concepts/functionsoverview.htm | T1 |
| 9 | **API Gateway** (OCI API Gateway) | "governed HTTP/S interfaces for other services, including OCI Functions, Kubernetes Engine, and Container Registry", with authentication and rate-limiting policy enforcement | docs.oracle.com/en-us/iaas/Content/APIGateway/Concepts/apigatewayoverview.htm | T1 |
| 10 | **Streaming with Apache Kafka** (OCI Streaming with Apache Kafka); legacy: **OCI Streaming** | Fully managed Kafka clusters (3.6.x/3.7.0), TLS 1.2, SASL_SCRAM/mTLS, Kafka ACLs | docs.oracle.com/en-us/iaas/Content/kafka/overview.htm | T1 |
| 11 | **OCI Data Science** | Notebooks, model catalog, **Model Deployment** as HTTP endpoints, and **AI Quick Actions** — "deploy, evaluate and fine tune foundation models in OCI Data Science", code-free; BYO model via OCI Object Storage | docs.oracle.com/en-us/iaas/data-science/using/ai-quick-actions.htm ; …/ai-quick-actions-model-deploy.htm | T1 |
| 12 | **Oracle Fusion Cloud Sales** (docs library: **Oracle Fusion Cloud Sales Automation**); feature **Sales Intelligence** | CRM of record. Docs guide title verbatim: "How do I get started with Sales Intelligence?" under "Oracle Fusion Cloud Sales Automation". | oracle.com/cx/sales/ ; docs.oracle.com/en/cloud/saas/sales/fasig/ | T1 |
| 13 | **Sales Command Center** (one of the **Fusion Agentic Applications for Customer Experience**, announced 2026-04-09) | "continuous monitoring, risk analysis, and next-best-action execution"; an **Account Workspace** that "prioritizes strategic accounts showing renewal, expansion, or risk signals by combining customer intelligence, account context, and external insights to generate an account strategy"; **external data source enrichment** for "real-time buying insights and automated account signals". Siblings: **Contract Compliance Workspace**, **Service Manager Workspace**, **Cross-Sell Program Workspace**, **Marketing Command Center**. | oracle.com/news/announcement/oracle-introduces-fusion-agentic-applications-for-cx-2026-04-09/ ; blogs.oracle.com/cx/oracle-fusion-cloud-cx-26c-innovation-customer-signals-connect-to-enterprise-execution | T1/T3 |

⚠️ **Scoping note on rows 12–13.** Fusion Cloud CX is a **separately licensed SaaS application**, not part of the OCI + NVIDIA infrastructure stack. It belongs in the "what Oracle provides" column, but it is as much a **competitive overlap** as a building block: Sales Command Center is doing signal-led account monitoring with external enrichment and recommended next moves. If the integrator's target customer already owns Fusion CX, steps 1, 2, 6, 10, 11 and 12 have a native Oracle answer — that is a positioning risk the matrix should state, not hide.

### A5. Verdict table — 12 workflow steps vs. the Oracle+NVIDIA baseline

Baseline defined as: **NVIDIA AI-Q Blueprint 2.x (with NeMo Agent Toolkit, NeMo Retriever, NeMo Guardrails, NeMo Evaluator) deployed on OCI** — a combination NVIDIA itself documents ("Deploy a Production-Ready NVIDIA AI-Q Blueprint on Oracle Cloud Infrastructure", AI-Q 2.0, Terraform + Helm on **OKE**, with VCN, Flexible Load Balancer, **OCI Vault**, Block Volume/CSI for PostgreSQL) [T1/T3: developer.nvidia.com blog]. Oracle SaaS (Fusion Cloud CX) is marked separately where it applies.

Legend: **full** = works out of the box for a generic case · **partial** = a shipped primitive exists but the domain logic/config is yours · **none** = nothing in the baseline addresses it.

| # | Workflow step | Coverage | Named component(s) | Source | Tier |
|---|---|---|---|---|---|
| 1 | Define entity universe | **none** (infra) / **partial** (Fusion) | Nothing in AI-Q or OCI defines an account universe. The nearest is **Oracle Fusion Cloud Sales** as the account system of record, and **Sales Command Center**'s Account Workspace which "prioritizes strategic accounts showing renewal, expansion, or risk signals" — but that is a separate SaaS licence, not the AI-Q/OCI baseline. | oracle.com/news/…fusion-agentic-applications-for-cx-2026-04-09 | T1 |
| 2 | Ingest signals + first-party context | **partial→full** | AI-Q **pluggable data sources / data source registry**: web search, paper search, **MCP tools**, collaboration services, LlamaIndex, **NVIDIA RAG Blueprint**, **Azure AI Search**, **OpenSearch**. Document-side: **NeMo Retriever extraction** (Page Elements v3, Table Structure v1, Graphic Elements v1, **NeMo Retriever OCR**) and **OCI Document Understanding** (classification, "Key-Value Extraction powered by Large Multimodal Models"). Streaming: **Streaming with Apache Kafka**. First-party CRM context has no connector — that is yours. | docs.nvidia.com/aiq-blueprint/2.1.0/ ; docs.oracle.com …/document-understanding/using/home.htm ; …/Content/kafka/overview.htm | T1 |
| 3 | Filter & de-duplicate signals | **partial** | AI-Q ships **data-source filtering** ("Tools are filtered per request based on `data_sources`") and the intent classifier's shallow/deep routing — both are *relevance* gating, not *near-duplicate clustering*. No shipped story-clustering / near-dup detector anywhere in the stack. Reranking (**Llama 3.2 NV RerankQA 1B v2**) suppresses redundancy incidentally, not by design. | docs.nvidia.com/aiq-blueprint/2.1.0/architecture/overview.html | T1 |
| 4 | Resolve affected entities | **none** | No entity resolution / named-entity-linking service in AI-Q, NeMo, or OCI AI services. Oracle has master-data tooling in the Fusion/EBS world but nothing wired into this stack. This is a genuine build. | (absence verified across docs.nvidia.com/aiq-blueprint, docs.nvidia.com/nemo, docs.oracle.com AI services) | T1 (absence) |
| 5 | Retrieve & rank evidence | **full** | **Oracle AI Vector Search** in **Oracle AI Database 26ai** (incl. **hybrid search**), **OCI Search with OpenSearch** (keyword + vector + hybrid), **NeMo Retriever Embedding NIM** (**Llama 3.2 NV EmbedQA 1B v2**), **NeMo Retriever Text Reranking NIM** (**Llama 3.2 NV RerankQA 1B v2**), plus AI-Q's own concurrent researcher workers and optional **source router**. | docs.oracle.com/…/26/vecse/ ; docs.nvidia.com/nemo/retriever/ ; build.nvidia.com/nvidia/aiq | T1 |
| 6 | Reason implications / opportunities / risks | **partial→full (generic)** | AI-Q's **deep research agent** already does structured planning → concurrent researcher sub-agents → **writer** synthesis, on **nemotron-3-ultra-550b-a55b**; LangChain Deep Agents 0.6.5+ on NeMo Agent Toolkit 1.8.0. Generic "so what" reasoning is shipped. *Account-specific* implication taxonomy (opportunity vs. risk vs. timing) is prompt/config work on top — not absent, but not free. | github.com/NVIDIA-AI-Blueprints/aiq ; build.nvidia.com/nvidia/aiq | T1 |
| 7 | Map to seller's own service catalog | **none** | Nothing in the baseline knows a seller's offer catalog. AI-Q can retrieve a catalog if you index it (step 5), but the mapping logic, the taxonomy and the eligibility rules are entirely yours. | (absence verified) | T1 (absence) |
| 8 | Second-order ripple reasoning | **none** | No component models cascading/n-th-order effects across an account graph or supply chain. AI-Q's planner will follow a research chain if instructed, but there is no shipped ripple/propagation model, and no account or supply-chain graph to propagate over. | (absence verified) | T1 (absence) |
| 9 | Score magnitude + confidence, cite | **partial** — **citation: full; confidence: none** | **Citations are shipped and verified**: "Every research response passes through a deterministic post-processing pipeline that verifies citations against actually-retrieved sources", removing unverifiable/unsafe URLs. **Grounding checks are shipped**: NeMo Guardrails **Self-Check Fact-checking** (against `$relevant_chunks`), **Hallucination Detection** (SelfCheckGPT-style NLI consistency), **AlignScore**, Patronus Lynx, Got It AI TruthChecker. **What is NOT shipped**: a per-claim calibrated confidence number, or any notion of business *magnitude*. Guardrails returns binary grounded/not; NeMo Evaluator scores datasets offline, not claims at runtime. | docs.nvidia.com/aiq-blueprint/2.1.0/architecture/overview.html ; docs.nvidia.com/nemo/guardrails/…/fact-checking ; …/guardrail-catalog | T1 |
| 10 | Assemble output artifact | **full (briefing) / none (structured record)** | The deep path's native output **is** a long-form, citation-backed **report**, plus **durable generated files** (charts, CSVs, notebooks) and **report follow-up** (Q&A and cosmetic rewrites over a finished report). A *structured record* conforming to a CRM object schema is not an AI-Q output type. | build.nvidia.com/nvidia/aiq ; github.com/NVIDIA-AI-Blueprints/aiq | T1 |
| 11 | Human review UI | **partial→full** | AI-Q ships a **Clarifier agent** doing "HITL plan generation and approval before deep research", a **Next.js web UI** frontend, and CLI/Jupyter/async-API frontends. **OCI Generative AI Agents** separately lists "Human-in-the-loop — optional real-time monitoring and human intervention". What is missing is *review-and-edit-the-finding* (approve/reject/correct a claim before it ships), as opposed to *approve-the-plan*. | docs.nvidia.com/aiq-blueprint/2.1.0/architecture/overview.html ; docs.oracle.com …/generative-ai-agents/overview.htm | T1 |
| 12 | Downstream delivery to CRM | **none (integration primitives only)** | No CRM writer. The baseline gives you plumbing: AI-Q's **MCP server** (`submit_query`, `poll_query`, `get_final_report`) and **REST API**; OCI's **API Gateway**, **OCI Functions**, **Streaming with Apache Kafka**; OCI Generative AI Agents' **Custom Function Calling Tool** and **Custom API Endpoint Calling Tool**. The Fusion Cloud Sales object mapping, idempotency and dedupe-on-write are yours. | github.com/NVIDIA-AI-Blueprints/aiq ; docs.oracle.com …/generative-ai-agents/overview.htm ; …/APIGateway/Concepts/apigatewayoverview.htm | T1 |

**Tally:** full **3** (5, 6-generic, 10-briefing) · partial **5** (2, 3, 9, 11, 12-primitives) · none **4** (1-infra, 4, 7, 8).

### A6. Is the "only vector search + reranking" claim accurate, understated, or overstated?

> **Verdict: the claim badly UNDERSTATES the baseline. It is wrong, and wrong in the expensive direction** — it would have the integrator budget to build things NVIDIA already ships and defends with benchmarks.

"Vector search + reranking" describes **step 5 only**. The evidence puts at least six more steps partly or wholly inside the baseline. The three strongest pieces of evidence:

1. **AI-Q's deep research agent already produces the artifact.** Planner + concurrent researcher sub-agents + writer synthesis producing a "long-form, citation-backed report", with **report follow-up** on the finished report — that is steps 6 and 10, shipped. [T1: github.com/NVIDIA-AI-Blueprints/aiq; build.nvidia.com/nvidia/aiq]
2. **Citation integrity is shipped as deterministic code, not left to the model.** "Every research response passes through a deterministic post-processing pipeline that verifies citations against actually-retrieved sources" and removes unverifiable URLs — that is the hardest half of step 9, and the matrix claims the baseline gives none of it. [T1: docs.nvidia.com/aiq-blueprint/2.1.0/architecture/overview.html]
3. **Human-in-the-loop and evaluation are shipped nodes, not roadmap.** A **Clarifier agent** for "HITL plan generation and approval before deep research" (step 11), and built-in **FreshQA / Deep Research Bench / DeepSearchQA** harnesses with "escalation thresholds and research loop counts…tuned through benchmarks". OCI Generative AI Agents independently lists human-in-the-loop, guardrails and tool orchestration. [T1: docs.nvidia.com/aiq-blueprint/2.1.0/; docs.oracle.com …/generative-ai-agents/overview.htm]

Supporting: NVIDIA itself publishes an **AI-Q 2.0 on OCI** reference deployment (Terraform + Helm on **OKE**), so "Oracle + NVIDIA baseline" is not a hypothetical assembly — it is a documented joint artifact.

**Where the matrix is right, and where the real product is.** Four steps are genuinely uncovered and they are the ones that matter commercially: **(4) entity resolution**, **(7) mapping to the seller's own service catalog**, **(8) second-order ripple reasoning**, **(1) defining and maintaining the entity universe** — plus the two hard halves of partials: **per-claim calibrated confidence and business magnitude** (step 9) and **CRM-schema structured output with idempotent write-back** (steps 10 and 12). That is the defensible "ours". Claiming 23 of 25 capabilities as proprietary will not survive a technical review by anyone who has read the AI-Q README.

---

## Job B — Failure paths for the 12 steps

Format per step: **what breaks** · **what a good system does** · **industry-standard term (if one exists)** · **typically covered / typically NOT covered by products in this space**.

### B1. Define entity universe
_pending_

### B2. Ingest signals + first-party context
_pending_

### B3. Filter & de-duplicate
_pending_

### B4. Resolve affected entities
_pending_

### B5. Retrieve & rank evidence
_pending_

### B6. Reason the "so what"
_pending_

### B7. Map to service catalog
_pending_

### B8. Ripple reasoning
_pending_

### B9. Score + cite
_pending_

### B10. Assemble output
_pending_

### B11. Human review
_pending_

### B12. Downstream delivery
_pending_

### B13. Cross-cutting failure modes (the named list)
_pending_ — no signal in period · rumour/retraction · ambiguous or unmatched entity name · paywalled source · missing/stale CRM record · fabricated implication · citation that does not support the claim · opportunity already in pipeline · contradictory sources · non-English source · materially stale signal.

### B14. What nobody covers
_pending_ — explicit list of failure modes with no standard market handling.

---

## Sources
_pending_

## Unverified
_pending_
