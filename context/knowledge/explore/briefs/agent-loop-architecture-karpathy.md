# Agent loop architecture (Karpathy) — research brief

_question: what specifically Karpathy means by "agent loop" and how to design it well_
_date: 2026-06-12 · sources: 5 · provenance: [drop](../../_inbox/processed/tg-20260611-231405-37.md)_

## TL;DR

Karpathy uses "agent loop" in two connected senses. Generally: the canonical agent
architecture — an LLM calling tools in a plain while-loop, with the context window as its
working memory (his "LLM = CPU, context window = RAM" framing). Specifically and most
recently: **`karpathy/autoresearch`** (GitHub, ~March 2026) — a deliberately minimal agent
loop for autonomous overnight ML experimentation: the agent may edit exactly ONE file, runs
a time-boxed (5-min) experiment, keeps the change only if a single fixed metric improves,
reverts otherwise, and repeats ~100×/night. "Designing it well" is almost entirely harness
design, not loop design: dumb loop, strict constraints, curated context.

## What's known

1. [Fact — `karpathy/autoresearch` README, tier 1] The loop is three files: `program.md`
   (rules/strategy for the agent, incl. autonomy rules like "NEVER STOP"), `prepare.py`
   (immutable evaluator — data pipeline + the fitness function `val_bpb`), `train.py` (the
   only file the agent may modify). Fixed 5-minute wall-clock budget per experiment, single
   GPU, hill-climbing with `git reset` on regressions. Agent-agnostic (Claude, Copilot…).
2. [Fact — GitHub Discussions, via kingy.ai write-up, tier 3] Community runs report
   val_bpb 0.9979 → 0.9697 over 126 autonomous experiments — the loop genuinely climbs.
3. [Fact — Karpathy, Software 3.0 / LLM-OS framing, tier 1–2] "Context engineering is the
   delicate art and science of filling the context window with just the right information
   for the next step." Each loop iteration's real job is context curation, not prompting.
4. [Practitioner consensus — Anthropic "Building Effective Agents"; Braintrust] Agents are
   "LLMs using tools based on environmental feedback in a loop"; the three components are
   environment, tools, system prompt. Keep the implementation as simple as possible —
   complexity kills iteration speed; invest in tools and evals, not orchestration.
5. [Practitioner consensus — Braintrust telemetry] Tool responses are ~67.6% of loop tokens
   (system prompt ~3.4%), and context accumulates — step 10 re-processes steps 1–9. Tool
   OUTPUT curation is the highest-leverage design surface; verbose JSON is the main rot vector.
6. [Inference — distilled design checklist] (a) dumb while-loop, smart harness; (b) one
   mutable surface, one immutable evaluator; (c) a single cheap objective metric; (d) time/
   step budgets + revert-on-failure; (e) tool outputs trimmed to what the next step needs;
   (f) autonomy rules written down explicitly in the program file, not implied.

## For Alex

- Goal **g1** (Personal OS as a personal→team reference): this repo's engine-vs-scheduler +
  ledger + bounded-rewrite patterns ARE agent-loop harness design — autoresearch is the
  citable reference model for that argument.
- Tasks **t2/t4** (vacancy screener, company researcher): build each as one mutable
  artifact + fixed evaluator + bounded runs, not as an open-ended agent.
- Direct teaching material for the SoftServe agentic-AI SME / Jumpstart-PM threads.

## Go deeper

- [karpathy/autoresearch](https://github.com/karpathy/autoresearch) — the primary source; read `program.md` first.
- [Anthropic — Building Effective Agents](https://www.anthropic.com/research/building-effective-agents) — the practitioner canon for when/how to loop.
- [Braintrust — The canonical agent architecture: a while loop with tools](https://www.braintrust.dev/blog/agent-while-loop) — pseudocode + token-budget data.
- [Anthropic — Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) — the curation half of the loop.

## Gaps & caveats

- The exact utterance behind the drop ("agent loop", Karpathy) is unverified — he has no
  single canonical essay titled that; autoresearch (timing matches the Jun 2026 buzz) is the
  best-fit referent, the LLM-OS framing the runner-up. ⚠ unconfirmed which Alex saw.
- Autoresearch results are community-reported (tier 3), not independently reproduced.
- Karpathy is publicly skeptical of long-horizon autonomous agents ("decade of agents",
  Dwarkesh interview, Oct 2025) — the minimal-harness design is consistent with that
  skepticism, but I did not re-verify the interview content here.
