# Agentic AI frameworks landscape (2026) — research brief

_question: what are the 10 agentic AI frameworks in the KDnuggets roundup, and what's a systemic view / map of the layers they cover?_
_date: 2026-07-04 · sources: 5 · provenance: [drop](../../_inbox/processed/tg-20260703-182932-183.md)_

## TL;DR
Modern agentic frameworks are converging on the same six-layer stack (tool-use, orchestration, state/memory, evaluation, observability, deployment) rather than staying thin LLM+tool wrappers **[Practitioner consensus, tier 2]**. They differ mainly in the orchestration layer: **LangGraph** (explicit state-graph, most control, steepest curve), **CrewAI** (role-based crews, fastest prototyping, least control), and **AutoGen/AG2** (conversational GroupChat) are the three dominant coordination models **[Practitioner consensus, tier 2]**. The KDnuggets source article itself (published 2026-07-02) could not be fetched directly (403 — see Gaps); its confirmed contents overlap with, but are not identical to, this broader landscape.

## What's known
1. **KDnuggets' framing** — the article argues frameworks have moved past "a wrapper around an LLM and a few tools" to managing state, memory, tool use, evaluations, and deployment as first-class concerns **[Fact/source, tier 2 — search-engine cache of the article, kdnuggets.com/10-agentic-ai-frameworks-you-should-know-in-2026, published 2026-07-02]**.
2. **Frameworks confirmed as covered** in that article (5 of the claimed 10 — direct fetch of the full page returned HTTP 403 for this run; see Gaps):
   - **LangGraph** — graph-of-states/transitions model; framed as the pick when you need full control (long-running agents, customer support, research assistants, coding workflows, ops tools) **[Fact/source, tier 2]**.
   - **CrewAI** — role/backstory/goal-defined agents assembled into a "crew"; framed for research, reporting, business automation, internal ops — especially where the workflow must stay legible to non-technical stakeholders **[Fact/source, tier 2]**.
   - **OpenAI Agents SDK** — deliberately minimal: tool-using agents without adopting a large orchestration framework **[Fact/source, tier 2]**.
   - **Google ADK (Agent Development Kit)** — code-first: agents, tools, sessions, memory, evaluations, multi-agent patterns, deployment workflows, plus a local dev UI to inspect/test before pushing to cloud **[Fact/source, tier 2]**.
   - **Mastra** — TypeScript-first, full-stack: agents, workflows, memory, MCP support, RAG, evals, observability; integrates with React/Next.js/Node **[Fact/source, tier 2]**.
   - Remaining ~5 of the article's 10 are unconfirmed for this specific list (candidates seen across adjacent 2026 roundups: AutoGen/AG2, LlamaIndex, Haystack, Microsoft Semantic Kernel, DSPy — **[Inference]**, not verified against the source article).
3. **Orchestration models are the real axis of differentiation**, not features: graph-based (explicit, most control) vs. role-based (framework infers coordination, fastest to a prototype) vs. conversational GroupChat (AutoGen/AG2) **[Practitioner consensus, tier 2 — cross-referenced across alicelabs.ai, uvik.net, pecollective.com 2026 comparisons]**.
4. **Tradeoffs track a consistent pattern** across independent 2026 comparisons: LangGraph = steepest learning curve / most control / most production-mature; CrewAI = easiest curve / least control / solid production readiness; AutoGen = medium on both, "improving" on production readiness **[Practitioner consensus, tier 2]**.
5. **One named benchmark**: an independent 2026 comparison ran ~2,000 task instances across LangGraph, LangChain, AutoGen, and CrewAI on the same underlying model; LangGraph was fastest on latency across all five tested tasks **[Practitioner consensus, tier 2 — cited by alicelabs.ai; original benchmark source not independently verified]**.
6. **One named efficiency data point**: CrewAI's 2026 benchmarks show ~18% more token overhead than a comparable LangGraph implementation for a 3-agent ticket-triage-and-resolution crew **[Practitioner consensus, tier 2 — same source]**.
7. **A systemic layer map**, synthesized from the frameworks above and consistent with how KDnuggets itself frames "beyond LLM+tools" **[Inference, built from tier-2 sources, not asserted by any single source as this exact taxonomy]**:
   - **Tool-use / agent-loop** (baseline in all) — OpenAI Agents SDK is the minimal-surface example.
   - **Orchestration/coordination** — graph (LangGraph) vs. role-based crew (CrewAI) vs. conversational (AutoGen).
   - **State & memory** — checkpoints (LangGraph), sessions/memory (Google ADK, Mastra).
   - **Tool/protocol integration** — MCP support named explicitly for Mastra; not confirmed for the others in this set.
   - **Evaluation & observability** — evals (Google ADK, Mastra), observability tooling (Mastra).
   - **Deployment & dev tooling** — local dev UI pre-cloud (Google ADK), deployment workflows (Google ADK).
   - **Ecosystem fit** — TypeScript/full-stack (Mastra, integrates React/Next/Node) vs. Python-centric (LangGraph, CrewAI, AutoGen, Google ADK).

## For Alex
- Directly relevant to the agentic-AI SME side of the SoftServe engagement (Oracle AIQ/cuOpt/VSS package evaluation, R&D productization) — these frameworks are the buyer-side equivalent of what SoftServe is packaging on top of NVIDIA/Oracle infra; useful vocabulary for framing SoftServe's own "layers" (orchestration vs. eval vs. deployment) when pitching the AIDP delivery-partner story. See [oracle.md](../../areas/softserve/oracle.md).
- Personal-OS itself sits at the far "model-boxed harness" end of this same landscape (Claude Code / Claude Agent SDK doing orchestration inside one model) rather than using any of these external frameworks — worth cross-referencing against the prior [agentic architecture options comparison](agentic-architecture-options-comparison.md) brief when that tradeoff comes up again.

## Go deeper
- [10 Agentic AI Frameworks You Should Know in 2026](https://www.kdnuggets.com/10-agentic-ai-frameworks-you-should-know-in-2026) — the source article; direct fetch blocked (403) this run, worth a manual read.
- [Best AI Agent Frameworks 2026: 7 Compared](https://alicelabs.ai/en/insights/best-ai-agent-frameworks-2026) — LangGraph/CrewAI/AutoGen/Semantic Kernel head-to-head with the benchmark numbers cited above.
- [Agentic AI Frameworks: Top 10 Options in 2026 (Instaclustr)](https://www.instaclustr.com/education/agentic-ai/agentic-ai-frameworks-top-10-options-in-2026/) — a second independent top-10 list to cross-check against KDnuggets' selection.
- [awesome-ai-agents-2026 (GitHub)](https://github.com/ARUNAGIRINATHAN-K/awesome-ai-agents-2026) — 300+ frameworks catalogued with comparison guides; useful if the "layers" map needs extending beyond these 6.

## Gaps & caveats
- **The source article's exact 10-framework list was not independently confirmed.** Direct WebFetch of kdnuggets.com returned HTTP 403 on repeated attempts (bot-protection, not a proxy/network fault — verified via `$HTTPS_PROXY/__agentproxy/status`, no relay failures logged). All KDnuggets-attributed claims above come from search-engine-cached snippets of the article, which explicitly only surfaced 5 of the 10 named frameworks. Re-run with a Chrome MCP or manual browser open if the full 10 matters.
- The "systemic layer map" in point 7 is this brief's synthesis, not a taxonomy any one source asserts verbatim — treat it as [Inference] scaffolding, not a quoted framework.
- Benchmark numbers (latency, 18% token overhead) trace to secondary aggregator sites (alicelabs.ai), not to a primary benchmark report — could not verify the underlying methodology or task set in this bounded pass.
- Selection bias: most 2026 "top 10" roundups (KDnuggets, Instaclustr, Artiverse, Medium) converge on the same 5–6 headline names (LangGraph, CrewAI, AutoGen, OpenAI Agents SDK, Google ADK, Mastra) — long-tail frameworks (DSPy, Haystack, LlamaIndex, Semantic Kernel) are inconsistently included depending on the list, suggesting no fixed canon yet.
