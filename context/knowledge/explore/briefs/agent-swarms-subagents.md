# Subagents and Agent Swarms — research brief

_question: real use cases, demos, and how to decide between a skill vs a subagent_
_date: 2026-06-13 · sources: 5 · provenance: [drop](../../../_inbox/processed/tg-20260612-235939-84.md)_

## TL;DR

A **skill** injects a reusable prompt into the current context window — cheap, synchronous, no isolation. A **subagent** spawns a fresh isolated context with its own tool list and permission scope — expensive (15× token overhead reported), but it protects parent context from explosion and enables parallelism. An **agent swarm** is multiple subagents running concurrently, either under a central supervisor (safe, debuggable) or peer-to-peer (emergent, harder to control). The decision rule: use a skill when the behavior is reusable and the output fits the current context; spawn a subagent when the task needs isolation, parallel execution, or a restricted permission boundary.

## What's known

1. **Skill vs subagent — the architectural split** [Fact / Spring AI + VILA-Lab analysis, direct fetch]: In Claude Code, `SkillTools` inject into the current context window (low cost, synchronous), while `AgentTools` spawn isolated context windows — "only summaries return to parent; parent's context is protected from subagent verbosity." This means a subagent always pays an overhead but never pollutes the orchestrator's context.

2. **When to spawn a subagent** [Fact / VILA-Lab, direct fetch]: Four conditions justify the isolation cost: (a) task scope is large enough that intermediate steps would crowd parent context, (b) context explosion risk is high (long-running tool chains), (c) permission boundaries need enforcement (subagent gets restricted tool list), (d) specialized tool access is required (a subagent can have a different model or toolset). Decision is driven by cost-benefit analysis; no hard threshold is documented.

3. **Description-driven orchestration** [Fact / Spring AI, direct fetch]: The orchestrator's LLM decides whether to delegate by matching the user request against each registered subagent's declared `description` field. No explicit branching logic — the model makes the call. Multiple subagents can run concurrently (e.g. style-checker + security-scanner + test-coverage simultaneously). Claude Code supports up to 1,000 subagents via dynamic workflows (v2.1.154+, research preview) using orchestration scripts that hold intermediate state outside the context window.

4. **Swarm vs supervisor architectures** [Practitioner consensus / LangChain blog, Swarms.world framework docs]: Two main topologies: **Supervisor** = central orchestrator routes tasks to specialized subagents (centralized control, debuggable, better for structured workflows). **Peer-to-peer swarm** = agents independently decide when to hand off to peers (emergent, good for open-ended tasks where routing can't be pre-specified). Swarms.world framework implements semantic routing, voting systems, and event-driven coordination between peers. [Inference] Supervisor is the right default for enterprise use cases; peer-to-peer swarms suit research pipelines where agents must dynamically decompose unknown tasks.

5. **Real use cases** [Practitioner commentary / ByteByteGo analysis of Anthropic's internal system]: Anthropic's multi-agent research system uses a "lead researcher" orchestrator + parallel SearchAgent subagents + a citation subagent. Reported outcomes: 90.2% improvement over single-agent Opus on internal research evals, 90% reduction in research time, 15× token costs. ⚠ These figures come from practitioner commentary, not an Anthropic primary source — treat as directionally plausible, not exact. Other named use cases: parallel code review (style + security + test coverage subagents); customer support triage (specialized subagents per issue type); supply chain negotiation (autonomous peer agents adapting inventory across suppliers).

6. **Skill vs subagent decision table** [Practitioner consensus / Spring AI + VILA-Lab + LangChain]:

   | Criterion | Skill | Subagent |
   |---|---|---|
   | Reusability across contexts | ✓ best fit | works but overkill |
   | Context isolation needed | ✗ | ✓ required |
   | Parallel execution | ✗ | ✓ |
   | Restricted tool/permission scope | ✗ | ✓ |
   | Output fits inline in parent | ✓ | summary only |
   | Token cost | low | high (15× reported) |
   | Debuggability | simple | requires sidechain tracing |

## For Alex

- His `.claude/skills/*/SKILL.md` pattern IS the "skill" side of this decision — prompt injected inline, cheap, correct for reusable behaviors in this repo.
- The `Agent` tool calls already in use (e.g. `context-update` spawning `explore-brief`) ARE the subagent pattern — isolation + summary-back-to-parent.
- **Decision heuristic for this repo:** if a new capability needs to run in multiple different parent contexts without side effects → skill; if it needs a long tool chain, parallel execution, or a clean context boundary → subagent via the `Agent` tool.
- For SoftServe / agentic-AI SME advisory: the supervisor vs swarm choice is the key architectural question for clients. Supervisor is the safe default for structured enterprise workflows (support triage, compliance checks, code review pipelines). Peer-to-peer swarm is appropriate for open-ended research or multi-party negotiation tasks where the routing graph can't be specified in advance.

## Go deeper

- [Dive into Claude Code (VILA-Lab)](https://github.com/VILA-Lab/Dive-into-Claude-Code) — authoritative Claude Code subagent architecture analysis with compaction pipeline details
- [Spring AI: Task Subagents](https://spring.io/blog/2026/01/27/spring-ai-agentic-patterns-4-task-subagents/) — concrete code-level orchestration patterns with description-driven routing
- [Swarms.world architecture docs](https://docs.swarms.world/en/latest/swarms/concept/swarm_architectures/) — peer-to-peer swarm coordination patterns (semantic routing, voting, event-driven)
- [ByteByteGo: Anthropic multi-agent research system](https://blog.bytebytego.com/p/how-anthropic-built-a-multi-agent) — real-world orchestrator-worker system with reported performance numbers (verify against primary before citing)

## Gaps & caveats

- The 90.2% / 90% / 15× figures from Anthropic's research system are unverified (no Anthropic primary source found); treat as directional.
- "Up to 1,000 subagents" is a Claude Code research-preview capability — production limits undocumented.
- Peer-to-peer swarm real-world failure modes (deadlock, infinite delegation, cost explosion) are poorly documented in available sources.
- This brief covers Claude Code + general patterns; framework-specific details (LangGraph, AutoGen, CrewAI) are omitted — needs `/deep-research` if a specific framework choice is on the table.
