# Aakash Gupta — How to Build AI Evals Step-by-Step | Daniel McKinnon | Product Growth

_source: youtube · channel: Aakash Gupta · published: 2026-07-28_
_video: https://www.youtube.com/watch?v=ztN6bE_FuQQ_
_guests: Daniel McKinnon (Gamoff Labs)_
_captured: 2026-07-30 (Path A) · digest run 20260730T0405_

## Summary
Daniel McKinnon explains how to design offline and agentic evals to decide whether a GenAI feature is ready to ship, arguing evals are the primary way to communicate product success to engineering. He walks through a practical recipe (problem definition, prompt set, scoring) and demonstrates it with a genomics example that reveals concrete model and harness limitations.

## Insights extracted (5)

- `pi-ztN6bE_FuQQ-01` — **Offline evals are the primary product-spec communication tool** → theme [Agent engineering & production infra](../../themes/agent-engineering-patterns.md)
  - detail: An offline eval — a representative set of prompts plus answer keys and a scoring method — is the clearest way to tell engineers what "good" looks like before shipping. McKinnon argues that running a product against an offline eval early reveals whether the model, the harness, or the product needs to change and avoids frustrating users in production. This matters because GenAI behavior is complex and brittle; an offline eval creates a measurable proxy for user satisfaction you can iterate on.
  - anchor: "the key way to communicate how a product should work" · t=181 · [▶ 3:01](https://www.youtube.com/watch?v=ztN6bE_FuQQ&t=181)

- `pi-ztN6bE_FuQQ-02` — **Agentic tasks require task-based evals, not QA benchmarks** → theme [Agent engineering & production infra](../../themes/agent-engineering-patterns.md)
  - detail: Modern GenAI progress has shifted from single-turn Q&A to multi-step, tool-using agentic tasks, so old QA benchmarks (MMLU, etc.) are often saturated and uninformative. For agentic work you must construct evals that reflect multi-step procedures (reasoning, search, tool calls) and long time horizons, because success means completing a sequence of correct steps, not just giving a one-line answer. That change forces different prompt design, harness engineering, and scoring choices.
  - anchor: "the task is really different. You'll notice we have agentic" · t=781 · [▶ 13:01](https://www.youtube.com/watch?v=ztN6bE_FuQQ&t=781)

- `pi-ztN6bE_FuQQ-03` — **Build a Goldilocks prompt set (≈100 prompts) with room to improve** → theme [Agent engineering & production infra](../../themes/agent-engineering-patterns.md)
  - detail: McKinnon recommends collecting a representative set of roughly 100 prompts (can be fewer or more) that are neither trivial nor impossible so your eval scores sit around 25–50% initially. That 'room to run' lets engineering and research improve the system and you can retire easy evals as models saturate them. He emphasizes making scoring explicit (auto-score, another LLM evaluator, or human raters) so you can run experiments and track progress.
  - anchor: "Just come up with probably 100 prompts that are in this distribution." · t=488 · [▶ 8:08](https://www.youtube.com/watch?v=ztN6bE_FuQQ&t=488)

- `pi-ztN6bE_FuQQ-04` — **Agentic evals demand automated scoring because human review doesn't scale** → theme [Agent engineering & production infra](../../themes/agent-engineering-patterns.md)
  - detail: Because agentic outputs span many steps and long time horizons, human scoring is costly and often inconsistent; automated or LLM-based scoring is required to run frequent experiments at scale. McKinnon warns that some steps in a chain can be individually correct yet lead to wrong outcomes, so a scoring approach needs to capture final task success and intermediate correctness where possible. Without automated scoring, you can't iterate quickly or compare harness/model changes reliably.
  - anchor: "With agentic work, it's much more challenging" · t=898 · [▶ 14:58](https://www.youtube.com/watch?v=ztN6bE_FuQQ&t=898)

- `pi-ztN6bE_FuQQ-05` — **Real-world evals reveal surprising model and harness gaps** → theme [Model reviews & benchmarks](../../themes/model-reviews-and-benchmarks.md)
  - detail: In a live demonstration on clinical genomics, McKinnon added synthetic variants to VCFs and ran several agents: a clear example (canonical CFTR deletion) showed some agents found the cause while others hallucinated or missed it, and a much harder di-genic congenital heart disease case was only solved by a more capable agent (GPT-5.5) that retrieved and extracted a specific paper. That concrete example shows why domain expertise, careful prompt design, harnessing (tool access, retrieval), sampling, and per-domain evals are necessary to know what will work in production.
  - anchor: "I picked like one of the easiest genetic diseases" · t=1128 · [▶ 18:48](https://www.youtube.com/watch?v=ztN6bE_FuQQ&t=1128)

_Provenance archive — generated, never hand-edited. Theme pages are the curated view._
