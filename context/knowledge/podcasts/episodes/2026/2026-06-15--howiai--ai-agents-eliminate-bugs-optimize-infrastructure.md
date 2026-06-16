# How I AI — How this startup uses AI agents to eliminate bugs and optimize infrastructure

_source: youtube · channel: How I AI · published: 2026-06-15_
_video: https://www.youtube.com/watch?v=QE_1hRLsehM_
_guests: —_
_captured: 2026-06-16 (Path A) · digest run 20260616T0402_

## Summary
The episode profiles an engineering lead who uses AI coding agents and eval-driven workflows to fix bugs, optimize query performance, and scale infrastructure experimentation. The central argument is that agents make it practical to run exhaustive, production-like benchmarks and automated evals at a scale humans cannot, which raises the engineering quality bar and reduces risk for platform changes.

## Insights extracted (4)

- `pi-QE_1hRLsehM-01` — **Agents can exhaustively test infrastructure alternatives to speed slow queries** → theme [Agent engineering & production infra](../../themes/agent-engineering-patterns.md)
  - detail: Rather than guessing which index, column-store format, or execution engine will help, the team reproduces slow production queries and uses coding agents to try every open-source column store and execution engine matrix-style. They run these experiments on production-like data (or production subsets) to measure real latency effects—examples include testing column-store formats under 4,000 concurrent reads and measuring EC2↔S3 latency. This matters because it turns risky, slow platform changes into measurable decisions you can iterate on without locking staff engineers into months-long rewrites.
  - anchor: "we will reproduce those things and use um a coding agent" · t=321 · [▶ 5:21](https://www.youtube.com/watch?v=QE_1hRLsehM&t=321)

- `pi-QE_1hRLsehM-02` — **Agents run far more rigorous benchmarks than humans can feasibly run** → theme [Agent engineering & production infra](../../themes/agent-engineering-patterns.md)
  - detail: The guest argues there is no staff engineer who can execute as many varied, continuous benchmarks and algorithmic permutations as an agent-driven process can; they cite discovering a practical Bloom filter index after a week of continuous experiments. Using agents surfaced overlooked trade-offs (e.g., query speed vs. indexing cost) because the system could run both kinds of benchmarks repeatedly and at scale. The non-obvious payoff is higher practical rigor: more complete evidence when deciding core infra changes, reducing the usual conservatism that keeps teams stuck on legacy implementations.
  - anchor: "there's no staff engineer who is running as many rigorous benchmarks" · t=679 · [▶ 11:19](https://www.youtube.com/watch?v=QE_1hRLsehM&t=679)

- `pi-QE_1hRLsehM-03` — **Eval suites are the modern PRD for AI-driven features** → theme [Agent engineering & production infra](../../themes/agent-engineering-patterns.md)
  - detail: Evals formalize 'what success looks like' the way PRDs used to, by encoding user examples and quantitative scoring so models can autonomously explore the 'how.' In practice they built datasets of doc-site questions, used models to generate and then refine scoring functions (e.g., concise code snippets, single-language answers), and applied those scorers to rank outputs automatically. This matters because it converts subjective product taste into repeatable, measurable evals—then human vibe checks (they iterate with a designer named David) are used only to refine the scorer rather than manually reviewing every example.
  - anchor: "EVELs are actually the modern version of a PRD" · t=1518 · [▶ 25:18](https://www.youtube.com/watch?v=QE_1hRLsehM&t=1518)

- `pi-QE_1hRLsehM-04` — **Primary engineering priority: build data→eval feedback pipelines and CI** → theme [Agent engineering & production infra](../../themes/agent-engineering-patterns.md)
  - detail: The guest insists the top engineering job is constructing pipelines that pull real-world data into evals and investing in CI so you can move quickly and safely; they say this beats chasing prompt tweaks or agent frameworks. Examples include teams using evals to detect where engineers hit pain points or agents ask for escalated permissions, and the repeated advice to 'fix your CI' before expecting velocity gains from AI. The takeaway is practical: without automated feedback loops and solid CI you cannot reliably scale agent-driven workflows or trust their results in production.
  - anchor: "summon from the ether of real world data" · t=2200 · [▶ 36:40](https://www.youtube.com/watch?v=QE_1hRLsehM&t=2200)

_Provenance archive — generated, never hand-edited. Theme pages are the curated view._
