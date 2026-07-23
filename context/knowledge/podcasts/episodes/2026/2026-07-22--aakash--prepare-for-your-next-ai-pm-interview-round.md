# Aakash Gupta — Prepare for this round before your next AI PM interview...

_source: youtube · channel: Aakash Gupta · published: 2026-07-22_
_video: https://www.youtube.com/watch?v=iBKrijO1PBQ_
_guests: —_
_captured: 2026-07-23 (Path A) · digest run 20260723T0405_

## Summary
A practical walkthrough of the technical concepts AI product managers must know for interviews and building products: how LLMs work, tool/function calling, agent design (skills), orchestration (LangChain), RAG, and routing to models. The throughline is that PMs should reason about mechanisms and engineering trade-offs (when to ground, when to use a cheap model, when to add orchestration) rather than reciting definitions.

## Insights extracted (5)

- `pi-iBKrijO1PBQ-01` — **LLMs predict next tokens; they are not databases** → theme [Model reviews & benchmarks](../../themes/model-reviews-and-benchmarks.md)
  - detail: An LLM works by predicting the most probable next token given its input distribution — not by 'looking up' facts. That explains hallucinations: the model will confidently output a plausible token even if it's false, because nothing in the runtime forces it to check external truth. This distinction matters for product design and interviews: you fix factual correctness by grounding (retrieval or tools), not by a longer or sterner prompt.
  - anchor: "Fundamentally, LLMs are predicting the next token" · t=202 · [▶ 3:22](https://www.youtube.com/watch?v=iBKrijO1PBQ&t=202)

- `pi-iBKrijO1PBQ-02` — **Temperature is the sampling dial that trades safety for creativity** → theme [Model reviews & benchmarks](../../themes/model-reviews-and-benchmarks.md)
  - detail: Temperature controls how peaked or flat the token probability distribution is: lower values sharpen the top tokens (deterministic, repeatable outputs) while higher values flatten it (more varied, creative responses). The presenter demoed this: at temperature 0 the model repeatedly returned the same animal; at temperature 2 it produced unusual outputs like "axelottle." Understanding this helps you tune for consistency (e.g., QA, product text) versus novelty (e.g., creative copy).
  - anchor: "So temperature sets how risky the pick is" · t=227 · [▶ 3:47](https://www.youtube.com/watch?v=iBKrijO1PBQ&t=227)

- `pi-iBKrijO1PBQ-03` — **Grounding via retrieval or tools is the practical cure for hallucination** → theme [AI & the PM craft](../../themes/ai-and-the-pm-craft.md)
  - detail: When correctness matters, the speaker recommends grounding LLM answers by retrieving real content or calling authoritative tools rather than relying on the model's internal probabilities. Practically, the model emits a structured JSON tool call; your application executes the function (e.g., weather, search), returns results to the model, and the model composes a grounded answer — shown in demos that returned population and weather with sources. You should also measure faithfulness (does the answer trace to retrieved text) and retrieval quality as separate evals.
  - anchor: "When the answer has to be right, I ground it" · t=2164 · [▶ 36:04](https://www.youtube.com/watch?v=iBKrijO1PBQ&t=2164)

- `pi-iBKrijO1PBQ-04` — **Agent skills (prompt + tool + skill) are the runtime know-how that improves outputs** → theme [Agent engineering & production infra](../../themes/agent-engineering-patterns.md)
  - detail: Defining an agent is more than a prompt: it's the prompt, the set of callable tools/APIs, and reusable 'skills' (packaged instructions, routing, context priority and scripts). The presenter showed a PRD-drafting skill inside a PM OS that read context, found an existing PRD, and produced a launch-ready draft while asking fewer clarifying questions — demonstrating that skills reduce human input and produce higher-quality, consistent outputs without retraining the model. Skills are therefore a high-alpha design choice for production agents.
  - anchor: "but really it's prompt plus tool plus skill" · t=737 · [▶ 12:17](https://www.youtube.com/watch?v=iBKrijO1PBQ&t=737)

- `pi-iBKrijO1PBQ-05` — **Route queries to different models to balance cost and quality** → theme [AI & the PM craft](../../themes/ai-and-the-pm-craft.md)
  - detail: Not every query needs the biggest model: a lightweight classifier or embedding match can route trivial requests (e.g., "what is 2+2") to cheap models and reserve large models for complex reasoning. The video demos a router that selects GPT-4-mini for simple math and a larger model for harder tasks, then compares token counts and costs to show how per-call savings scale dramatically over millions of queries. Building an explicit router is a core PM-level trade-off between latency, accuracy, and cost.
  - anchor: "Not every query deserves the same model" · t=1549 · [▶ 25:49](https://www.youtube.com/watch?v=iBKrijO1PBQ&t=1549)

_Provenance archive — generated, never hand-edited. Theme pages are the curated view._
