# Y Combinator — Boris Cherny: Building Claude Code

_source: youtube · channel: Y Combinator · published: 2026-07-27_
_video: https://www.youtube.com/watch?v=qyPCVqFUyDo_
_guests: Boris Cherny_
_captured: 2026-07-28 (Path A) · digest run 20260728T0404_

## Summary
Boris Cherny describes how he builds Claude Code (a harness/product around Claude) by repeatedly deleting and re‑building prompts, harness code, and tooling each model generation to elicit new capabilities. He argues for an empirical, ablation-driven workflow ("unhobbling") that pairs strong safety layers with dynamic orchestration of many agents to solve long, complex engineering tasks faster than humans.

## Insights extracted (5)

- `pi-qyPCVqFUyDo-01` — **Three complementary defenses eliminate prompt injection attacks** → theme [Agent engineering & production infra](../../themes/agent-engineering-patterns.md)
  - detail: Claude Code combines a mechanistic-interpretability prompt-injection classifier (they literally watch neurons that light up on injections), an auto-mode classifier, and additional harness protections. After roughly three years of work using these layers together they report they "cannot demonstrate prompt injection anymore," which matters because it enables agentic, write-access workflows without trivial adversarial override. This is an architecture-level safety claim backed by their internal research and instrumentation.
  - anchor: "a prompt injection classifier which we run for all traffic" · t=171 · [▶ 2:51](https://www.youtube.com/watch?v=qyPCVqFUyDo&t=171)

- `pi-qyPCVqFUyDo-02` — **Delete most system prompts each model release and re-add only what's needed** → theme [Agent engineering & production infra](../../themes/agent-engineering-patterns.md)
  - detail: For Opus 5 they removed over 80% of the system prompt and run ablations: delete the prompt, then bring lines back one at a time to measure impact. Models increasingly internalize behaviors older prompts were correcting for, so prompts can become unnecessary or even hobbling; the right approach is to empirically observe repeated failures and only restore instructions that the model demonstrably needs. They provide a "simple mode" to strip prompts as an intentional experiment to find what truly matters.
  - anchor: "we deleted 80% of the system prompt." · t=270 · [▶ 4:30](https://www.youtube.com/watch?v=qyPCVqFUyDo&t=270)

- `pi-qyPCVqFUyDo-03` — **Evals last longer than prompts but still saturate quickly** → theme [Agent engineering & production infra](../../themes/agent-engineering-patterns.md)
  - detail: Evaluation suites are more stable than harness code or system prompts and you should append to them across generations, but they typically only survive one to a few model generations before saturating. Boris says an eval might live for "one, two, three model generations" because exponential model improvements often hit and exhaust old evals, forcing new, empirically derived tests. The practical implication: keep evals, but continually refresh them when models outgrow the checks.
  - anchor: "an EVO might live for maybe one, two, three model generations." · t=602 · [▶ 10:02](https://www.youtube.com/watch?v=qyPCVqFUyDo&t=602)

- `pi-qyPCVqFUyDo-04` — **Unhobbling products reveals massive latent model capabilities** → theme [Agent engineering & production infra](../../themes/agent-engineering-patterns.md)
  - detail: Hobbling is when product scaffolding prevents the model from showing what it can do; product overhang is the set of capabilities models already have but products don't surface. The original Claude Code removed restrictive scaffolding (e.g., single-line autocompletes) so the model could write whole files and features; today similar removal of constraints lets models do much harder tasks like rewriting entire runtimes. Recognizing and removing unnecessary constraints is a repeatable path to new product breakthroughs.
  - anchor: "We call this product overhang." · t=722 · [▶ 12:02](https://www.youtube.com/watch?v=qyPCVqFUyDo&t=722)

- `pi-qyPCVqFUyDo-05` — **Dynamic workflows scale test-time compute to thousands of agents** → theme [Agent delegation, loops & software factories](../../themes/agent-delegation-and-loops.md)
  - detail: Claude Code's dynamic workflows spin up bun sandboxes and orchestrate agents in parallel and sequence (an algebra for agents) so a single task can fan out into thousands of workers, verifying and summarizing results. They used this to rewrite a major runtime (Zig→Rust for Bun) in about 11 days—work that previously would take engineers many months—plus they run daily routines (dead-code cleanup, abstraction unification) that operate like hundreds to thousands of tiny maintenance agents. This reframes orchestration as a new form of test‑time compute that multiplies developer throughput.
  - anchor: "To use dynamic workflows is a fairly new feature" · t=1525 · [▶ 25:25](https://www.youtube.com/watch?v=qyPCVqFUyDo&t=1525)

_Provenance archive — generated, never hand-edited. Theme pages are the curated view._
