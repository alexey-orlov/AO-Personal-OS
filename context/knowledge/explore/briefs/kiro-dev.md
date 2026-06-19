# Kiro.dev — research brief

_question: play with Kiro.dev — what is it and what's worth trying hands-on?_
_date: 2026-06-19 · sources: 6 · provenance: [drop](../../../_inbox/processed/tg-20260618-130859-126.md)_

## TL;DR

Kiro is Amazon's agentic IDE (launched May 7, 2026, replacing Amazon Q Developer), built on VS Code / Code OSS. Its defining move: before writing a line of code it generates a three-file spec bundle — `requirements.md`, `design.md`, `tasks.md` — then implements from the task list. Event-driven Hooks auto-run tests, refresh docs, and cascade spec changes on file save / PR open. Getting started is friction-free: AWS Builder ID (free, no credit card) + 500 bonus credits valid 30 days. Worth an afternoon — it is the most concrete hands-on implementation of spec-driven development currently in production.

## What's known

1. **Origin and status** [Fact / AWS official / press.aboutamazon.com]: Launched publicly May 7, 2026; directly replaces Amazon Q Developer (EOL May 15, 2026). Built on Code OSS (open-source VS Code base). Access via free AWS Builder ID — no credit card, no paid AWS service required.

2. **Spec pipeline — the core differentiator** [Fact / AWS Builder Center; DEV Community snippets]: A prompt triggers three structured files before any code is written: `requirements.md` (user stories + acceptance criteria), `design.md` (system design, component breakdown, data flow), `tasks.md` (numbered implementation checklist). Kiro agents then implement task by task. The spec is source of truth; code is a build artifact. Aligns with and extends the patterns described in the [spec-driven-development brief](spec-driven-development.md).

3. **Hooks — the automation layer** [Fact / AWS Builder Center; multiple search snippets]: Event-driven Hooks defined in steering files; fire on file save, PR open, or other repo events. Use cases: auto-run tests when a component is saved, auto-update README when an API endpoint changes, regenerate fixtures, cascade spec changes downstream. Framed by AWS as solving "agent babysitting" — recurring maintenance tasks happen automatically without prompting.

4. **Model routing** [Fact / AWS Builder Center; aiwiki.ai snippet]: Routes between Claude Sonnet (reasoning-heavy spec generation) and Amazon Nova (high-throughput codegen) via Bedrock. AWS-native depth: CDK constructs, Lambda handlers, IAM policies, DynamoDB access patterns scaffolded natively from spec — Cursor and Windsurf do not match this depth in AWS-specific patterns.

5. **Pricing** [Fact / morphllm.com; stackpick.net snippets]: Free tier: 50 agentic requests/month + 500 one-time bonus credits (30-day validity) on first sign-in. Pro: $20/month (225 "vibe" requests + 125 "spec" requests). Pro+ and Power ($200/month) for higher volume. Credit model was revised from a more generous earlier system — community frustration noted. Free tier is workable for evaluation and small side projects; exhausts in under a week of sustained professional daily use.

6. **Kiro vs Cursor tradeoff** [Fact / morphllm.com comparison snippet; weavai.app snippet]: Cursor writes code immediately from a prompt; Kiro writes zero lines until the spec is approved. For fast prototyping / vibe coding, Cursor is faster. For production features where correctness and traceability matter, Kiro's spec-first model reduces intent drift. Both at $20/month Pro. Not a replacement — a different philosophy applied to different contexts.

## For Alex

- **Hands-on SDD in production**: the [spec-driven-development brief](spec-driven-development.md) covers the theory; Kiro is the most prominent live implementation. An afternoon in Kiro = walking the same pipeline he'd advise SoftServe clients to adopt. Required for credible SDD authority in the agentic-SME role, not optional.
- **Hooks ≈ Personal OS architecture**: Kiro Hooks (trigger → action on repo event) are the same philosophy as `.claude/skills/` + `automations/` — trigger-action on events. The mental model transfers; explaining Hooks to a client or in the Iris bootcamp becomes intuitive rather than theoretical.
- **Job search signal**: "I spent time in Kiro's spec pipeline on [side project]" is a concrete differentiator when interviewing for VP Product / CPO roles where everyone claims to understand agentic AI.
- **SoftServe AWS context**: if any SoftServe client runs AWS infra, Kiro's native scaffolding depth (CDK/Lambda/IAM from spec) is a genuine recommendation to make.

## Getting started (the "play with" path)

1. Go to kiro.dev → sign in with AWS Builder ID (free email-based identity, no credit card).
2. Receive 500 bonus credits valid 30 days — enough for a real exploration session.
3. Pick a small side project → ask Kiro to generate `requirements.md`, `design.md`, `tasks.md`.
4. Let it implement one task; observe how it checks work against the spec.
5. Add one Hook (e.g., auto-run tests on file save) and watch it fire.
6. Compare to Claude Code workflow — note where spec-first adds friction vs. reduces it.

## Go deeper

- [AWS Kiro: The Agentic IDE That Makes Specs the Unit of Work — AWS Builder Center](https://builder.aws.com/content/3DbBI7LQgNIcs6UUj7IPPvqFHOp/aws-kiro-the-agentic-ide-that-makes-specs-the-unit-of-work) — primary source; Hooks config and spec format in detail
- [Kiro vs Cursor (2026) — MorphLLM](https://www.morphllm.com/comparisons/kiro-vs-cursor) — most actionable tradeoff guide for deciding when to use which
- [Spec-Driven Development brief](spec-driven-development.md) — the theory this tool implements; read together for the full picture

## Gaps & caveats

- kiro.dev returns 403 in this environment; all details from search snippet summaries — consistent across 6+ sources but not verified from official docs directly.
- Pricing figures from third-party aggregators (morphllm, stackpick); treat as likely-correct, verify at kiro.dev/pricing before committing.
- ⚠ gap: Hooks configuration syntax and steering-file format not verified from primary docs in this run.
- No hands-on session from this run — "play with" intent means the brief is the briefing, not the play itself.
