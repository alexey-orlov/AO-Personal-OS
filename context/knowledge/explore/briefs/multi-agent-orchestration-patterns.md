# Multi-agent orchestration: supervisor vs peer-to-peer vs scripted workflows — research brief

_question: Specific use cases for supervisor, peer-to-peer, and scripted-workflow orchestration; when (if ever) does Alex hand-design P2P vs leaving it to the platform (Claude Code)? Build on prior agent-swarms research._
_date: 2026-06-14 · sources: 5 · provenance: [drop](../../../_inbox/processed/tg-20260613-124731-97.md)_

## TL;DR

**Supervisor and scripted workflows are the two patterns Alex actually designs.** Peer-to-peer is almost entirely a platform prerogative in Claude Code — when you use dynamic workflows, Claude auto-generates the adversarial/cross-checking inter-agent topology; you don't wire agents together. The only case for hand-designed P2P is using an external framework (LangGraph, Swarms.world) to build a continuously running distributed system where the supervisor would be a single point of failure — not a fit for bounded research or content-processing tasks. In Claude Code, four primitives map cleanly to four scales: skills → subagents → agent teams (supervisor) → workflows (scripted at scale).

## What's known

1. **Claude Code's four orchestration primitives** [Fact / Anthropic official docs, direct fetch 2026-06-14]:

   | Primitive | What it is | Who decides what runs next | Intermediate results | Scale |
   |---|---|---|---|---|
   | Skill | Instructions Claude follows (prompt injection) | Claude, turn by turn | Context window | Same-context only |
   | Subagent | Isolated worker Claude spawns | Claude, turn by turn | Context window | A few delegated tasks per turn |
   | Agent team | Lead agent supervising peer sessions | Lead agent, turn by turn | Shared task list | A handful of long-running peers |
   | Workflow | JS script Claude writes; runtime executes | The script | Script variables | Dozens–hundreds per run (1,000 max, 16 concurrent) |

   "Moving the plan into code also lets a workflow apply a repeatable quality pattern: independent agents adversarially review each other's findings before they're reported." [Fact / Anthropic docs]

2. **Supervisor pattern** [Fact / Anthropic docs + practitioner consensus]: A central agent receives a goal, routes tasks to specialist workers, synthesizes results. In Claude Code = "Agent teams" (lead agent + peer sessions + shared task list). Named enterprise implementations: Claude Research (lead researcher + parallel SearchAgent subagents + citation agent), Jumpstart delivery planning analog (lead routes to documentation/code/validation streams). Scale: a handful of long-running peers. Easier to debug (all coordination passes through one node). Dominant enterprise pattern in 2026 — Microsoft Copilot Studio, Salesforce Agentforce, Lyzr Control Plane are all supervisor-variant platforms.

3. **Scripted workflows = dynamic workflows in Claude Code** [Fact / Anthropic official docs]: Claude writes a JavaScript orchestration script from your NL description; a separate runtime executes it. The plan lives in script variables — Claude's context holds only the final answer. Supports resumption (completed agents cache results). Use when: task needs more agents than one conversation can coordinate; you want the orchestration codified for rerun; task benefits from adversarial cross-checking (agents refute each other's findings before reporting). Concrete built-in: `/deep-research` (fans out web searches, cross-checks sources, votes on claims, filters uncorroborated findings). Trigger: say "workflow" or "ultracode" in a Claude Code prompt.

4. **Peer-to-peer: what it is and who designs it** [Practitioner consensus / multiple sources 2026]:
   - True P2P = agents independently decide where to route based on their own judgment, with no central orchestrator. Emerges in distributed, continuously running systems (telecom network monitoring fleet where each agent handles its segment and routes cross-segment anomalies to neighbors; multi-party supply-chain negotiation where autonomous peer agents adapt independently).
   - **In Claude Code, P2P is a platform prerogative.** Dynamic workflows auto-generate adversarial sub-agent cross-checking without Alex defining the topology. The script Claude writes IS the orchestration logic; Alex specifies the task, not the inter-agent wiring. [Fact / Anthropic docs]
   - **Hand-designed P2P only when**: (a) building with an external framework (LangGraph decentralized state graph, Swarms.world semantic routing, AutoGen group chat), AND (b) the system runs continuously at scale where a central supervisor is a genuine single-point-of-failure risk. LangGraph note: "Keep control flow logic in Python, not LLMs — an LLM routing decision introduces non-determinism that makes the graph hard to reason about and test." [Fact / LangGraph docs]

5. **When to use which (decision rules)** [Inference from Anthropic docs + practitioner consensus]:
   - **Skill**: reusable behavior, output fits inline, same-context (Alex's `.claude/skills/*/SKILL.md` IS this)
   - **Subagent** (via `Agent` tool): task needs context isolation or a restricted tool boundary; output is a summary, not inline (Alex's `context-update` spawning `explore-brief` IS this)
   - **Agent team / supervisor**: a handful of long-running specialized sessions with a shared task list; structured workflows with clear routing logic
   - **Scripted workflow**: needs more agents than one conversation handles; adversarial cross-checking matters; orchestration should be repeatable and auditable; OR a research question needs fan-out + convergence before reporting
   - **P2P (external framework)**: continuous distributed system, routing graph can't be specified in advance, supervisor is a genuine SPOF — not a bounded task context

## For Alex

- **Personal OS today**: skill + subagent pattern is already correct at this scale. The `context-update` → `explore-brief` delegation IS the subagent pattern with context isolation. No need to redesign.
- **Dynamic workflows in the Personal OS**: the `explore-brief` skill's `/deep-research` approach (fan-out + cross-check) is exactly what dynamic workflows do natively. If Alex has a Max/Pro plan (workflows available on ALL paid plans as of May 2026, not just Enterprise — confirmed by docs), he can run `/deep-research <explore-topic>` directly in Claude Code as an alternative to the skill-chain. Worth trialing for heavy research items in the queue.
- **Jumpstart advisory**: the supervisor pattern is the safe, debuggable default for enterprise clients (support triage, compliance checks, code review pipelines). For DAX/Telenor agentic-workflow enablement, framing it as "orchestrator-worker" (lead agent coordinates specialist workers) is both accurate and client-intelligible. Alex never needs to design P2P for clients — platform-native dynamic workflows handle parallel adversarial review automatically.
- **P2P answer directly**: Alex designs P2P only if he builds production infrastructure on LangGraph/Swarms.world for a continuously running multi-party system. Not on the current roadmap. In Claude Code the platform handles P2P topology internally; say "ultracode" and the workflow script does it.

## Go deeper

- [Claude Code Docs: Orchestrate subagents at scale with dynamic workflows](https://code.claude.com/docs/en/workflows) — primary source; the full comparison table (skills / subagents / agent teams / workflows) and trigger details. Read before designing any multi-agent system in the OS.
- [Swarms.world architecture docs](https://docs.swarms.world/en/latest/swarms/concept/swarm_architectures/) — peer-to-peer coordination patterns (semantic routing, voting, event-driven) for when/if true P2P ever comes up in a Jumpstart client context
- [Prior brief: subagents and agent swarms](agent-swarms-subagents.md) — decision table (skill vs subagent), use cases, cost overhead; this brief extends it to the 3-pattern comparison

## Gaps & caveats

- The Anthropic "Building Effective Agents" research page returned 403 in this run — the five-workflow-type taxonomy (prompt chaining / routing / parallelization / orchestrator-workers / evaluator-optimizer) from that paper is not in this brief but is referenced elsewhere; fetch directly for the original framing.
- Agent teams (supervisor in Claude Code terminology) have limited public documentation on specific patterns beyond the table in the workflows doc — `/deep-research` + "Agent SDK" docs likely have more detail.
- P2P failure modes (deadlock, infinite delegation, cost explosion in external frameworks) are documented poorly across available sources; external framework choice needs `/deep-research` if a production P2P build is ever on the table.
