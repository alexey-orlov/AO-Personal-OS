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

Format per step: **what breaks** · **what a good system does** · **standard market term** (or "no standard term") · **coverage**: typically covered / partially covered / **typically NOT covered by anyone**.

Coverage judged against the visible market for account intelligence and signal-based selling: **ZoomInfo Copilot**, **6sense**, **Demandbase**, **Clay**, **Common Room**, **AlphaSense**, **Salesforce Agentforce**, **Oracle Sales Command Center**, and the adjacent risk-intelligence market (**Interos**, **Everstream Analytics**, **Dun & Bradstreet**). [T2/T3 for the market read; T1 where a vendor page or standard is cited.]

---

### B1. Define entity universe

**What breaks.** The universe is a stale list. Accounts that merged, were acquired, rebranded, or went private stay in; new subsidiaries and newly-qualifying accounts never enter. Subsidiaries are treated as independent companies, so the same parent's news fires three times — or a signal about the parent never reaches the rep who owns the subsidiary.

**What a good system does.** Maintains the universe as a *derived* set from firmographic criteria plus a corporate hierarchy, refreshed on a cadence, with explicit add/remove events that are auditable. Resolves parent↔subsidiary so a signal can be routed up or down the tree deliberately.

**Standard terms.** **Corporate family tree / corporate linkage** (D&B's term, keyed on **DUNS Number**); **account hierarchy** (CRM term); **ICP definition** and **named account list** (GTM terms); **TAM/SAM** for the sizing view. Stable external identifiers exist: **DUNS**, **LEI**, **LSEG PermID**.

**Coverage.** **Typically covered** for the flat list (every ABM platform sells a target-account list) but **typically NOT covered for hierarchy-aware routing**. Vendors sell the hierarchy *data*; almost nobody ships the logic that decides whether a parent-company signal is material to a subsidiary account you sell into. This is a real gap and a defensible build.

---

### B2. Ingest signals + first-party context

**What breaks.** (a) **No signal in the period** — the account is quiet and the system has nothing to say. (b) **Paywalled or inaccessible source** — the headline is visible, the substance is not; or `robots.txt` / a bot wall blocks the crawl. (c) **CRM record missing or stale** — the first-party half of the context is empty or wrong.

**What a good system does.**
- *No signal*: says so, explicitly, as a **first-class empty state** — "no material change in the last 30 days" — and never fills the gap with filler. Distinguishes **no signal** from **not checked** from **source unreachable**.
- *Paywalled*: routes to a licensed feed where one exists, records `access: denied` as provenance rather than silently using the headline, and never treats an unread article as read. Licensed-content routes are the market's answer: **LSEG**, **Dow Jones Factiva**, **AlphaSense** (which licenses broker research and expert-call transcripts precisely because they are paywalled).
- *Stale CRM*: timestamps every first-party field and shows the age next to the claim; enriches against a provider rather than trusting the record.

**Standard terms.** **Coverage gap** / **empty state** for (a) — no widely-used term of art, which is itself telling. For (b): **licensed content** / **entitlements**; no market term for "paywall-aware degradation". For (c): **data decay** — a benchmarked concept: B2B contact records decay roughly **20–30% per year** (MarketingSherpa's 2.1%/month ≈ 22.5%/yr is HubSpot's benchmark; ZoomInfo puts it at 25–30%/yr), with a **90-day refresh cadence** cited as the minimum hygiene baseline. [T2/T3: pipeline.zoominfo.com/marketing/b2b-data-decay; thisandthat.chat CRM data-decay statistics 2026]

**Coverage.** Data decay is **well covered** (it is the entire enrichment industry's pitch). **Paywall-aware degradation is typically NOT covered** — most tools either have the licence or silently skip. **The honest empty state is typically NOT covered by anyone**: signal platforms are optimised to always surface *something*, because an empty dashboard looks like a broken product. A system that says "nothing happened at this account this month, and here is what we checked" is genuinely differentiated — and is the single cheapest trust-builder in the whole workflow.

---

### B3. Filter & de-duplicate

**What breaks.** One press release is picked up by forty outlets and becomes forty "signals". A syndicated wire story, the company's own blog, and three aggregator rewrites all describe one event. Volume masquerades as significance.

**What a good system does.** Clusters at the **event** level, not the document level: one canonical event with N supporting documents, where N is evidence of *pickup*, not of *N events*. Keeps the earliest and the most authoritative source, not the most recent scrape.

**Standard terms.** **Near-duplicate detection** (MinHash / SimHash / shingling); **story clustering** or **event clustering** in news tech; **canonicalization**. In the news-standards world, **IPTC** provides item identity and revision semantics so a rewrite can be recognised as the same item.

**Coverage.** **Typically covered at the document level** (dedupe by URL/hash) and **typically NOT covered at the event level**. The common failure in shipped account-intelligence products is exactly this: the same funding round shown three times with three headlines. Event-level clustering plus a **pickup count** as a magnitude input is a build — and doubles as evidence for step 9.

---

### B4. Resolve affected entities

**What breaks.** (a) A name matches **two** accounts ("Apex Systems" the staffing firm vs. "Apex Systems" the distributor). (b) A name matches **none** — the signal names a brand, a former name, a ticker, or a local-language spelling that is not in the CRM. (c) A name matches the **wrong** account with high confidence, which is worse than no match because nothing flags it.

**What a good system does.** Treats matching as probabilistic, not boolean: returns candidates with scores, **abstains below a threshold** and routes to review rather than guessing, and blocks/canopies on strong keys (domain, ticker, DUNS, LEI, registry ID) before falling back on fuzzy name similarity. Keeps an **alias table** (former names, brands, local-language forms, common misspellings) that grows from every human correction.

**Standard terms.** **Entity resolution** (also **record linkage**, **identity resolution**, **deduplication** — related but distinct: record linkage joins across systems, deduplication works within one, identity resolution tracks one entity across touchpoints); **named entity linking / entity disambiguation** in NLP; **blocking** and **canopy clustering** for candidate generation; **lead-to-account matching (L2A)** is the market's name for the sales-specific case, and matching accuracy is a benchmarked RevOps metric. [T2: nc-squared.com L2A guide; openprisetech.com; pipeline.zoominfo.com lead-matching tools]

**Coverage.** **Covered for the CRM-internal case** — L2A matching is a mature product category (LeanData, Openprise, LeadAngel, ZoomInfo). **Typically NOT covered for the external-signal case**: linking an arbitrary news mention to *your* account object, with abstention and a review path. Vendors match a lead form to an account; matching a Reuters sentence to an account is a different and harder problem, and it is where most account-intelligence demos quietly cheat by pre-linking the data.

---

### B5. Retrieve & rank evidence

**What breaks.** (a) The retriever returns plausible but off-target passages and the ranker confidently orders noise. (b) **A non-English source** is the primary or only evidence and is silently dropped — a German regulatory filing, a Japanese earnings call, a Ukrainian procurement notice. (c) Retrieval succeeds but returns nothing *material*, and the system proceeds anyway.

**What a good system does.** Hybrid keyword+vector retrieval so exact tokens (product names, policy IDs, ticker symbols) are not lost to embedding drift; query translation and cross-lingual embeddings for (b), with the original-language quote preserved next to the translation; and an explicit **no-relevant-evidence** outcome that stops the pipeline rather than handing an empty context to a generator.

**Standard terms.** **Hybrid search**; **reranking**; **cross-lingual information retrieval (CLIR)** and **multilingual retrieval**; **recall@k**, **context precision** (NeMo Evaluator's RAG flow uses exactly these names). Demandbase advertises intent processing "in 133 languages", so multilingual coverage is a stated market feature. [T1 for the metric names; T3 for the Demandbase figure]

**Coverage.** **Well covered.** This is the one step where both the baseline and the market are strong. Non-English handling is **partially covered** — big vendors claim language coverage, but *showing the reader the original-language quote alongside the translation* is rare, and it is what makes a non-English citation auditable rather than a leap of faith.

---

### B6. Reason the "so what"

**What breaks.** The **hallucinated implication**. The facts are real and correctly cited; the inference is invented. "They opened a Warsaw office" → "therefore they are migrating their data platform" — nothing in the source says that. This is the most dangerous failure in the whole workflow because every surface check passes: the citation is real, the quote is accurate, the claim is fluent. It fails only on the logical step, which nothing in the stack inspects.

**What a good system does.** Separates **observation** (what the source says) from **inference** (what we conclude) as distinct, differently-labelled fields, so a reader can audit the leap. Constrains inference to a closed **implication taxonomy** rather than free-form speculation. Requires every inference to name the observation it rests on. Applies groundedness checks to the observation layer and *a different check* — an explicit inference-quality judgement — to the inference layer.

**Standard terms.** **Groundedness** / **faithfulness** (RAGAS and NeMo Evaluator both use "faithfulness"); **hallucination detection**; **attribution**, formalised as **AIS — "Attributable to Identified Sources"**, with **AutoAIS** as its NLI-based automation. Note the limitation precisely: **AIS measures whether a statement is supported by a source, not whether an inference from a supported statement is sound.** [T1: arxiv 2112.12870 / aclanthology.org/2023.cl-4.2 / github.com/google-research-datasets/AIS; T1: arxiv 2402.15089 AttributionBench on AutoAIS error rates]

**Coverage.** **Groundedness is covered** (NeMo Guardrails, RAGAS, Patronus Lynx, AlignScore all ship it). **Inference validity is typically NOT covered by anyone.** No product in the account-intelligence market, and no component in the Oracle+NVIDIA baseline, evaluates whether the *business conclusion* legitimately follows from the cited fact. Every vendor checks "is this quote real"; nobody checks "does this quote support this conclusion". **This is the sharpest whitespace in the entire 12 steps** and the observation/inference split is the cheapest credible answer to it.

---

### B7. Map to service catalog

**What breaks.** Every signal maps to the seller's biggest, vaguest offer, because that offer's description matches everything. Or the mapping is right in theory and wrong in practice: the recommended service is not sold in that geography, not available at that customer's tier, or already delivered to that account last quarter.

**What a good system does.** Treats the catalog as structured data with eligibility constraints (geography, segment, prerequisite, delivery capacity, already-delivered history), not as a bag of marketing text to embed. Requires the mapping to state *why* — which attribute of the signal triggers which attribute of the offer. Returns "no good fit" as a legitimate answer. Reports a mapping distribution so a flat-lining recommender (everything → one offer) is visible on day one.

**Standard terms.** **No standard market term.** The nearest adjacent names: **product/solution taxonomy mapping**, **next-best-action** (CRM), **offer eligibility** (telco/retail), **extreme multi-label classification** (the ML shape of it). The absence of an agreed term is a fair signal that the problem is not productised.

**Coverage.** **Typically NOT covered by anyone.** Market tools recommend *actions* ("send this email", "add to this sequence") and *contacts*, not *the seller's own service line*, because a seller's catalog is idiosyncratic and vendors do not want to own it. Oracle's Sales Command Center gets closest with "next-best-action execution", but that is CRM-native next action, not mapping an external event to a professional-services offer. For a systems integrator this is the highest-value proprietary asset in the product — it is where the domain knowledge actually lives.

---

### B8. Ripple reasoning

**What breaks.** Only the first-order effect is reported. "Customer X's supplier had a fire" is noted; "therefore X's Q3 shipments are at risk, therefore X's channel partners will re-plan, therefore X reopens a logistics-visibility project" is not. Or the opposite failure: unbounded speculation, a four-hop chain where hop three is invention and hop four is fantasy, and the chain is presented with the same confidence as hop one.

**What a good system does.** Requires a **traversable relationship graph** (supplier, customer, partner, competitor, subsidiary, regulator), so a ripple is a *path through recorded relationships* rather than a language-model guess. Bounds depth explicitly (typically 2). **Decays confidence with each hop** and shows the decay. Declares the relationship evidence for every hop.

**Standard terms.** In supply chain, the terms are real and established: **n-tier / multi-tier visibility**, **sub-tier visibility**, **Tier-N risk**, **cascading effects**, **disruption propagation**, **second-order effects**. Interos operates "a knowledge graph of 250 million plus companies and 11 billion supplier relationships"; Everstream sells "sub-tier visibility to uncover hidden sub-tier relationships". [T3 vendor pages; T2 D&B "Tier N Threats"; T1 academic: tandfonline.com/doi/full/10.1080/00207543.2025.2470348 on disruption propagation]

**Coverage.** **Covered in supply-chain risk intelligence, and essentially absent from sales/account intelligence.** The vocabulary and the graph both exist — in the wrong market. No account-intelligence platform reasons about second-order commercial consequences for the seller. Two honest constraints to state up front: without a relationship graph, ripple reasoning is LLM speculation wearing a diagram; and ripple claims are the ones most likely to be wrong, so hop-decayed confidence is not optional.

---

### B9. Score + cite

**What breaks.** (a) A **cited source that does not support the claim** — the URL resolves, the publication is real, the sentence is not in it, or is in it but means something else. (b) **Contradictory sources** — one says the deal closed, another says it collapsed; the system picks one, usually the one that ranked highest, and never tells the reader there was a conflict. (c) A **rumour, or a later-retracted story**, treated as fact. (d) A confidence number that is decoration — a number with no relationship to actual accuracy.

**What a good system does.**
- *(a)* Verifies citations **deterministically against what was actually retrieved**, not by asking a model whether it cited correctly. Stores the exact supporting span, not just the URL. This is the AI-Q pattern and it is the right one.
- *(b)* Surfaces the conflict as a **finding**, with both sources and their dates, rather than silently resolving it; weights by source reliability and recency, and drops confidence when sources disagree. Conflict between two reliable sources is itself a valuable signal about an account.
- *(c)* Carries **claim status** as data: `reported / confirmed / official / retracted`, with single-source claims flagged as unconfirmed. Re-checks cited sources for retraction before a briefing ships. The news industry has the standard: **IPTC NewsML-G2 `pubStatus`** with **`stat:canceled`** ("the content of the newsItem must not be used, ever") and **`stat:withheld`** ("must not be used until further notice"); NewsCodes usage is mandatory in the standard. Provenance standards exist adjacently: **C2PA / Content Credentials**, **NewsGuard** reliability ratings, **The Trust Project** indicators.
- *(d)* Reports **calibrated** confidence — confidence tracks observed accuracy — and **abstains** below threshold instead of shipping a low-confidence finding with a small number next to it.

**Standard terms.** **Citation verification** / **attribution** (**AIS / AutoAIS**); **truth discovery** (also **data fusion**; **knowledge fusion** when it feeds a knowledge base) is the established academic term for resolving conflicting values by jointly estimating source reliability and value correctness; **confidence calibration**; **selective prediction** / **classification with a reject option** / **abstention** (Chow's reject option; El-Yaniv & Wiener's risk–coverage trade-off); **uncertainty quantification**. [T1: iptc.org NewsML-G2 2.3x specification; T1: arxiv 2112.12870; T1: dl.acm.org/doi/10.14778/2168651.2168656 Bayesian truth discovery; T1: aclanthology.org/2021.acl-long.84 selective prediction]

**Coverage.**
- Citation verification: **covered** — AI-Q ships it deterministically, and RAG eval tooling is mature.
- Retraction handling: **typically NOT covered by anyone.** The IPTC standard exists and is honoured by newsrooms; **no account-intelligence product re-checks previously-cited sources for cancellation before reusing them**, and a briefing archive is a permanent record of whatever was true at scrape time. This is a genuinely unserved failure mode.
- Contradictory sources: **typically NOT covered.** Truth discovery is 15 years old in academia and effectively absent from GTM products, which show the top-ranked result and move on.
- Rumour vs. confirmed: **partially covered** — AlphaSense and financial-intelligence tools distinguish source types; general GTM signal tools do not carry claim status as a field.
- Calibrated confidence: **typically NOT covered by anyone.** Scores in this market (6sense's readiness/intent scores, Demandbase's account scores) are **ranking scores, not calibrated probabilities** — useful for sorting, not interpretable as "this is 80% likely to be true". Nothing in the Oracle+NVIDIA baseline emits one either.

---

### B10. Assemble output

**What breaks.** The briefing is long, uniform and unreadable — every account gets the same six sections whether or not there is anything to put in them, so empty sections get padded. Or the artifact is prose only, so nothing downstream can consume it. Or it silently drops a finding that did not fit the template.

**What a good system does.** Ships **two coupled representations**: a human briefing and a **structured record** against a declared schema, generated from the same underlying findings so they cannot disagree. Renders empty sections as explicitly empty. Makes length proportional to material change — a quiet account gets three lines, not three pages. Keeps every finding addressable by ID so review (step 11) and delivery (step 12) can act on individual findings.

**Standard terms.** **Structured output** / **constrained decoding** / **schema-guided generation**; **JSON Schema** as the contract; **provenance** / **lineage** for the finding→evidence link.

**Coverage.** **Partially covered.** Structured generation is a solved engineering problem and AI-Q emits durable files (charts, CSVs, notebooks). What is **typically NOT covered** is the coupling discipline — one findings model rendering to both a document and a CRM-shaped record — and **proportionality**: no product in this market is willing to produce a three-line briefing, because volume reads as value in a demo.

---

### B11. Human review

**What breaks.** Review is theatre: the reviewer sees a finished briefing and an Approve button, with no way to reject one claim, correct an entity match, or mark an inference wrong. Or review is a bottleneck: everything queues, nothing ships. Or corrections evaporate — the reviewer fixes the same wrong entity match every week because nothing learns.

**What a good system does.** Reviews at **finding granularity**, not document granularity: accept / reject / edit a single claim, with the evidence beside it. Routes by risk — high-confidence, low-stakes findings auto-ship; low-confidence or high-stakes ones queue. Captures every correction as **labelled training data** (the alias table in B4, the reliability weights in B9, the mapping rules in B7 all improve from it) and closes that loop visibly. Records who approved what, when.

**Standard terms.** **Human-in-the-loop (HITL)**; **human-on-the-loop** for the monitoring variant; **review queue** / **approval workflow**; **confidence-based routing** / **triage**; **active learning** for the correction→improvement loop; **audit trail** for the record.

**Coverage.** **Partially covered, and consistently at the wrong granularity.** AI-Q's Clarifier is HITL on the *plan*, before research runs; OCI Generative AI Agents offers "optional real-time monitoring and human intervention" on a *conversation*. Neither is review-and-correct-the-finding. **The correction feedback loop is typically NOT covered by anyone** in this market — corrections are treated as edits to one output, not as signal that improves the next run. That loop is what turns a demo into an asset that gets better, and it is cheap to build relative to its perceived value.

---

### B12. Downstream delivery

**What breaks.** (a) **The opportunity is already in the pipeline** — the system creates a duplicate, or worse, alerts a rep to something they have been working for six weeks, which destroys trust in one message. (b) Delivery is not idempotent: a retry after a timeout writes the record twice. (c) The target CRM record has changed since the run and the write clobbers a human's edit. (d) The write fails silently and the briefing never arrives, while the pipeline logs success.

**What a good system does.** Checks existing CRM state **before** writing — open opportunities, recent activity, existing tasks on the same account — and either suppresses, or reframes the finding as an *update to the existing opportunity*. Writes **idempotently** with a stable external key (**upsert** on `external_id`) so retries are safe. Uses optimistic concurrency so a stale write fails loudly rather than overwriting. Treats a failed delivery as a **failure**, never a silent success, and surfaces it where a human looks.

**Standard terms.** **CRM write-back**; **reverse ETL** / **operational analytics** / **activation** for the general pattern; **upsert** and **external ID** for the idempotency mechanism; **idempotency key**; **duplicate management** (Salesforce's own term) and **suppression** for (a); **optimistic concurrency / ETag** for (c); **dead-letter queue** for (d).

**Coverage.** **Idempotent write-back is well covered** — reverse-ETL is a mature category and CRM duplicate management is native. **Suppression against in-flight pipeline is only partially covered** and is the one that actually burns adoption: platforms dedupe *records*, few of them ask "is a human already on this?" before alerting. Alert fatigue from re-surfacing known work is the most common reason signal products get switched off, and it is a cheap, unglamorous fix.

---

### B13. Cross-cutting: the named failure modes, mapped

| Failure mode | Step | Standard term | Covered by the market? |
|---|---|---|---|
| No signal in the period | 2 | *no standard term* (empty state / coverage gap) | **NO — nobody does the honest null** |
| Rumour, or a later-retracted story | 9 | claim status; **IPTC `pubStatus` `stat:canceled` / `stat:withheld`** | **NO for retraction re-checking**; partial for rumour |
| Name matches two accounts, or none | 4 | **entity resolution / named entity linking**; **L2A matching**; abstention | Covered CRM-internally; **NO for external signal → account** |
| Paywalled / inaccessible source | 2 | licensed content, entitlements | Partial (licensing); **NO for graceful degradation + provenance** |
| CRM record missing or stale | 2 | **data decay** (20–30%/yr; 90-day refresh baseline) | **Yes — the enrichment industry's core pitch** |
| Fabricated "so what" (hallucinated implication) | 6 | **groundedness / faithfulness**; **AIS / AutoAIS** | Covered for *facts*; **NO for inference validity** |
| Cited source does not support the claim | 9 | **citation verification**, **attribution (AIS)** | **Yes** — AI-Q verifies deterministically |
| Opportunity already in the pipeline | 12 | suppression, **duplicate management** | Partial; **NO for "a human is already on this"** |
| Contradictory sources | 9 | **truth discovery / data fusion / knowledge fusion** | **NO in GTM products** (mature in academia) |
| Non-English source | 5 | **cross-lingual information retrieval (CLIR)** | Partial; **NO for original-language quote beside translation** |
| Materially stale signal | 2, 9 | recency decay, freshness, temporal validity | Partial (timestamps); **NO for materiality-aware staleness** |

### B14. What nobody covers — say this out loud

Six failure modes have **no standard handling anywhere in this market**, in the Oracle+NVIDIA baseline, or in the named competitors. Stating them plainly is more credible than a matrix of green ticks, and each is a concrete build:

1. **Inference validity.** Everyone verifies that a quote is real. Nobody verifies that the business conclusion follows from it. (Step 6 — the biggest gap, and the one that produces the most embarrassing output.)
2. **The honest empty state.** No product is willing to say "nothing material happened at this account this month, here is what we checked." Commercial incentives run the other way. (Step 2.)
3. **Retraction re-checking.** The standard exists (**IPTC `pubStatus`**); nothing in GTM re-validates a cited source before reusing it, so a briefing archive preserves retracted claims indefinitely. (Step 9.)
4. **Conflict as a finding.** Truth discovery is a 15-year-old research field with essentially zero GTM productisation. Contradiction between reliable sources is surfaced nowhere — it is silently resolved by rank order. (Step 9.)
5. **Calibrated confidence.** Market scores are ranking scores. Nothing emits a number that means "80% of claims at this confidence are correct", and nothing in the baseline emits one either. (Step 9.)
6. **The correction feedback loop.** Human corrections are treated as edits to one document, not as labelled data that improves entity matching, source reliability and catalog mapping on the next run. (Step 11.)

Two more are **covered in an adjacent market but absent here**: **ripple / n-tier reasoning** (mature in supply-chain risk — Interos, Everstream, D&B — absent in account intelligence, step 8) and **service-catalog mapping** (no standard term at all, step 7).

## Sources
_pending_

## Unverified
_pending_
