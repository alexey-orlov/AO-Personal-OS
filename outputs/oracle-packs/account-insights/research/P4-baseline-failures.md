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
_pending_

| # | Exact Oracle product name | What it provides | Source | Tier |
|---|---|---|---|---|
| _pending_ | | | | |

### A5. Verdict table — 12 workflow steps vs. the Oracle+NVIDIA baseline

| # | Workflow step | Baseline coverage | Named component(s) | Source | Tier |
|---|---|---|---|---|---|
| 1 | Define entity universe | _pending_ | | | |
| 2 | Ingest signals + first-party context | _pending_ | | | |
| 3 | Filter & de-duplicate signals | _pending_ | | | |
| 4 | Resolve affected entities | _pending_ | | | |
| 5 | Retrieve & rank evidence | _pending_ | | | |
| 6 | Reason implications / opportunities / risks | _pending_ | | | |
| 7 | Map to seller's own service catalog | _pending_ | | | |
| 8 | Second-order ripple reasoning | _pending_ | | | |
| 9 | Score magnitude + confidence, cite | _pending_ | | | |
| 10 | Assemble output artifact | _pending_ | | | |
| 11 | Human review UI | _pending_ | | | |
| 12 | Downstream delivery to CRM | _pending_ | | | |

### A6. Is the "only vector search + reranking" claim accurate, understated, or overstated?
_pending_ — verdict + three strongest pieces of evidence.

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
