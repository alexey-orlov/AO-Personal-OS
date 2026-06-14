# Opus 4.8 workflows for research / scraping — research brief

_question: Do Opus 4.8 "dynamic workflow" patterns offer a better fit for multi-step research and web-scraping tasks in the Personal OS than the current sequential skill composition?_
_date: 2026-06-14 · sources: 5 · provenance: [drop](../../../_inbox/processed/tg-20260613-123114-94.md)_

## TL;DR

**Dynamic workflows are a Claude Code–specific feature (Enterprise/Team/Max, v2.1.154+)** that auto-generates a JavaScript orchestration script spinning up to 1,000 parallel subagents per run. For the Personal OS they're overkill at routine scale but worth trialing for heavy multi-source research (complex explore briefs, market sweeps) — not for web scraping, where the bottleneck is site rate-limiting, not parallel planning. The current skill-composition pattern (sequential agent calls) stays the right default for bounded, queue-clearing tasks.

## What's known

1. **How dynamic workflows work** [Fact / Anthropic announcement + practitioner reports, May 2026]: You add the word "workflow" to a Claude Code prompt or run `/effort ultracode`. Claude writes a JavaScript orchestration script on-the-fly; a separate runtime executes it and spawns parallel subagents. Intermediate results live in script variables (not Claude's context), so the context window holds only the final answer. Cap: 16 concurrent agents, 1,000 total per run.

2. **Platform gate** [Fact / Anthropic docs]: Requires Claude Code Enterprise, Team, or Max plan AND Claude Code ≥ v2.1.154. Not available via API or standard claude.ai Pro. As of May 2026 this is a research preview.

3. **Performance on research** [Fact / Anthropic internal benchmark, cited in release]: Anthropic's multi-agent research variant (orchestrator + parallel Sonnet subagents) scores 90.2% better than single-agent Opus on their internal research evaluations. Agents attack a problem from independent angles; adversarial sub-agents try to refute findings; iteration continues until convergence.

4. **Cost multiplier** [Practitioner consensus, multiple community reports]: A workflow run burns substantially more tokens than a standard session — each subagent carries its own context overhead. Hundreds of agents = bill can spike orders of magnitude above a single-turn run. No public per-workflow pricing as of research preview.

5. **Dynamic vs scripted** [Inference from architecture]: "Dynamic" = Claude writes the orchestration code from your NL prompt, good when parallelism pattern isn't known in advance. "Scripted" = you write or specify the flow (e.g., the current Personal OS skills). Scripted has lower cost, predictable behavior, easier debugging. Dynamic trades cost for auto-planning and massive parallelism.

6. **Web scraping specifically** [Inference]: Dynamic workflows don't help with scraping's actual bottlenecks — rate limits, auth walls, JS rendering. Parallel subagents hitting the same site simultaneously would likely hit blocks faster. The Fable-5-for-scraping article (decodo.com) focuses on model capability (parsing structure), not orchestration — scraping pain is extraction quality + maintenance, addressed by the model, not by parallelism.

## For Alex

- **Current Personal OS skills (explore-brief, deep-research, inbox-sweep, book-finder)** are sequential and manually bounded — this is fine at the current queue depth (2–5 items/day). Dynamic workflows would meaningfully accelerate only if a single task requires 10+ parallel research sub-queries (e.g., a market sweep across 20 companies or a comprehensive AI research plan).
- **Concrete trial candidate**: the "AI research: comprehensive plan so far" task (drop 100 / tg-96) and the multi-agent orchestration explore brief — both benefit from parallel angle-coverage. These are natural first runs if Alex has a Max plan or Enterprise access.
- **Personal OS build** (drop 95 — comprehensive backlog): dynamic workflows won't help here; the backlog is a context-assembly task, not a parallel-research task. Skill composition or a single-agent sweep is the right tool.
- **Scraping tasks in the OS**: currently none at scale. If Alex adds scraping (e.g., LSN recruiter search), sequential fetching per domain is safer; model quality (Sonnet or Opus) is the lever, not orchestration parallelism.

## Go deeper

- [A harness for every task: dynamic workflows in Claude Code](https://claude.com/blog/a-harness-for-every-task-dynamic-workflows-in-claude-code) — Anthropic's own explainer; primary source (blocked in this run — fetch directly from browser)
- [Anthropic ships Claude Opus 4.8 alongside dynamic workflows (MarkTechPost)](https://www.marktechpost.com/2026/05/28/anthropic-ships-claude-opus-4-8-alongside-dynamic-workflows-and-cheaper-fast-mode-with-workflows-capped-at-1000-subagents/) — most detailed technical summary found in search
- [Claude Opus 4.8 /ultracode: I ran a 200-agent swarm (marc0.dev)](https://www.marc0.dev/en/blog/ai-agents/claude-opus-4-8-dynamic-workflows-ultracode-200-agent-swarm) — practitioner cost/result report; primary data on real-world token spend

## Gaps & caveats

- All primary Anthropic URLs returned 403 in this run; facts sourced from search result snippets + practitioner summaries (tier 2–3). The Anthropic blog post is the ground truth — read it before committing to a trial.
- No public token-cost data for workflow runs; "substantially more" is practitioner consensus without a specific multiplier.
- The 90.2% research-eval improvement figure is Anthropic's internal benchmark — methodology and baseline undisclosed; treat as directional, not literal.
- Web scraping with dynamic workflows is [Speculation] — no practitioner reports found specifically on that use case.
