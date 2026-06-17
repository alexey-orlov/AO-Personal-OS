# Spec-driven development — research brief

_question: spec driven development — what is that specifically?_
_date: 2026-06-17 · sources: 6 · provenance: [drop](../../../_inbox/processed/tg-20260616-134617-107.md)_

## TL;DR

Spec-driven development (SDD) is a methodology where a formal, version-controlled specification — not code — is the single source of truth. The team (or AI agent) writes a structured spec first (goals, constraints, acceptance criteria, edge cases), then derives an implementation plan, breaks it into atomic tasks, and generates code last. It emerged in 2025 as a direct response to "vibe coding" failures — LLM agents that produce plausible-looking code that drifts from intent, hallucinates APIs, and decays as projects scale. By 2026 every major AI coding platform (AWS Kiro, GitHub Spec Kit, Claude Code, Cursor) has shipped its own SDD flavor.

## What's known

1. **Definition** [Fact / Augment Code guide; Thoughtworks 2025 blog]: SDD makes a structured spec the shared source of truth for both humans and AI. Code is a build artifact; the spec is what you version, review, and own. When requirements change, you update the spec — not the implementation.

2. **Core three-step loop** [Fact / BCMS 2026 guide; Augment Code]: Write spec → generate and validate implementation against it → update spec when requirements change. The spec is never allowed to drift behind the code.

3. **Spec format** [Practitioner consensus / multiple sources]: Typically structured Markdown. Sections: goals/purpose, requirements, constraints, acceptance criteria, edge cases. Machine-readable where possible (OpenAPI for APIs; Markdown for general product features). Must be version-controlled alongside code.

4. **vs TDD / BDD** [Fact / multiple practitioner sources]:
   - TDD = tests first (unit-level design and quality)
   - BDD = behavior first (human-readable scenarios for stakeholder alignment)
   - SDD = specification first — the spec anchors both humans AND AI agents for all downstream work (tests, docs, implementation). TDD/BDD operate within SDD; SDD sets the outer frame.

5. **Why 2025–2026** [Practitioner consensus / Thoughtworks; Medium/predict]: Root cause is "intent drift" — prompting AI with underspecified requests ("add login") lets the model pick reasonable defaults that rarely match intent. SDD front-loads alignment so agents work from explicit goals + constraints rather than guessing. JetBrains AI Pulse survey (Jan 2026, n=11,000 devs): 90% use AI at work but only 13% use it across the full SDLC — SDD is the pattern closing that gap.

6. **Multi-agent workflow pattern** [Fact / Augment Code; DeepLearning.AI SDD course]: Coordinator agent breaks spec → delegates sub-specs to Implementor sub-agents → Verifier agent checks output against the original spec before marking work done. Each implementor works from its own scoped sub-spec, not the full top-level spec.

7. **AWS Kiro** [Fact / AWS Builder Center; Softwareseni]: Amazon's agentic IDE (launched May 2026, replacing Amazon Q Developer). Built-in SDD pipeline: Requirements → Design → Tasks → Code. Event-driven hooks fire on file save / PR open to auto-run tests, update docs, cascade spec changes. Routes between Claude Sonnet (reasoning-heavy specs) and Amazon Nova (high-throughput codegen) via Bedrock.

8. **Historical roots** [Fact / search result aggregation]: Roots in 1960s NASA formal workflows and Design by Contract. Academically formalized ~2004 as a synergy of TDD + DbC. Current wave driven by LLM agentic workflows (2024–2025 inflection).

9. **Adoption friction** [Fact / JetBrains survey Jan 2026]: Only 13% of developers use AI across the full SDLC despite 90% using AI at all. Writing good specs is a skill gap — the spec must be specific enough that an AI agent can't misinterpret it; too vague and you're back to vibe coding with extra steps.

## For Alex

- **SoftServe agentic-SME role**: SDD is the central paradigm shift when restructuring engineering teams for AI ways of working. "How do we work with AI agents?" is answered by SDD: teams write specs, agents implement. The PM/BA function becomes spec authorship. Directly relevant to the Iris bootcamp Product stream and any agentic delivery methodology Alex introduces.
- **Product manager positioning**: PMs who understand SDD are the spec authors driving AI engineering pipelines — this is a concrete answer to "what does a product leader do in an AI-native team?" Worth weaving into Alex's VP Product / CPO positioning for US search.
- **Personal OS**: Alex already practices SDD informally — `CLAUDE.md` + `SKILL.md` files ARE specs that drive agent behavior. The Personal OS is an SDD system. Naming this explicitly would sharpen his ability to articulate it.
- **DeepLearning.AI course** on SDD with coding agents exists (2026) — quick credential/depth if Alex wants to sharpen this for client enablement work at SoftServe.

## Go deeper

- [Spec-Driven Development with Coding Agents — DeepLearning.AI](https://www.deeplearning.ai/courses/spec-driven-development-with-coding-agents) — structured course; most actionable for building the practice
- [Harness engineering with Kiro — AWS Builder Center](https://builder.aws.com/content/3DlOO7A9RFAazBbwbNl2iV8WHr9/harness-engineering-with-kiro-spec-driven-development-for-the-multi-agent-era) — Kiro's concrete SDD implementation; useful reference for enterprise teams
- [arXiv 2602.00180 — SDD: From Code to Contract in the Age of AI Coding](https://arxiv.org/abs/2602.00180) — academic framing of SDD; useful for rigorous positioning
- [How to write a good spec for AI agents — Addy Osmani](https://addyosmani.com/blog/good-spec/) — practical spec-writing guide from Google Chrome lead; most immediately actionable for skill-building

## Gaps & caveats

- Most practitioner blogs are 403-blocked in this environment; search snippet summaries used — claims are consistent across sources but direct quotes are limited.
- "SDD" is sometimes used loosely (any "spec first" practice) vs. strictly (executable, version-controlled spec as build artifact). Distinguish when selling the concept.
- Vibe coding vs SDD is not binary: SDD for production features, vibe coding still valid for prototypes and exploration.
- ⚠ gap: no hard data on SDD productivity gains (cycle time, defect rate) vs. traditional or vibe-coded approaches — practitioner claims only, no controlled studies found.
