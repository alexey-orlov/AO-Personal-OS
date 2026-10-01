# How I AI — Jev: 8 real use cases this fast, cheap model

_source: youtube · channel: How I AI · published: 2026-10-01 (digest date)_
_video: https://www.youtube.com/watch?v=dAIIaepNhQM_
_guests: John Lindqvist_
_captured: 2026-10-01 (Path A) · digest run 20261001T0405_

## Summary
A conversation on How I AI with John Lindqvist about Jev, a new decision-focused model from TypeSafe AI that is extremely fast and nearly free. The episode argues Jev is different from LLMs because it emits structured, typed decisions (not free text), enabling real-time voice interfaces, large-scale data matching, multi-step tool orchestration, and game-like decision trees at a fraction of the cost and latency of traditional models. The hosts demo concrete use cases (voice todo, deduplication, live presentation coach, chess/Tetris agents) and suggest design patterns for integrating Jev as a fast decision layer in products.

## Insights extracted (5)

- `pi-dAIIaepNhQM-01` — **Jev is extremely fast and nearly free for real-time use** → theme [Type-safe decision models (Jev)](../../themes/type-safe-decision-models.md)
  - detail: Jev's main practical advantage is latency and cost: it responds almost instantly and demo runs cost cents rather than dollars. John and Claire recount processing >20,000 records and even a ~5GB JSON job that cost only a few dozen cents, which makes exploratory, iterative workflows feasible where traditional LLM inference would be prohibitively slow or expensive. That change in economics unlocks interactive, real-time features and experimentation that were previously impractical.
  - anchor: "السرعة والمجانية أمران رائعان. إذا سبق لكم" · t=- · [▶ video](https://www.youtube.com/watch?v=dAIIaepNhQM)

- `pi-dAIIaepNhQM-02` — **Jev outputs structured, typed decisions instead of freeform text** → theme [Type-safe decision models (Jev)](../../themes/type-safe-decision-models.md)
  - detail: Unlike general-purpose LLMs that return unstructured text, Jev returns constrained, typed decisions and discrete outputs (choices, function calls, classifications). That makes integration with APIs and deterministic workflows much easier because the model's output can be validated, matched to functions, and used directly as program inputs without heavy postprocessing. The result is safer, more predictable automation for UIs and backend orchestration.
  - anchor: "فهو لا يُخرج نصوصًا. بل يُخرج قرارات" · t=- · [▶ video](https://www.youtube.com/watch?v=dAIIaepNhQM)

- `pi-dAIIaepNhQM-03` — **Cheap large-scale data matching and deduplication becomes practical** → theme [Type-safe decision models (Jev)](../../themes/type-safe-decision-models.md)
  - detail: John demonstrates using Jev to match and merge large datasets (tens of thousands to hundreds of thousands of records) in seconds for cents, with configurable confidence thresholds. That capability turns previously avoided tasks—like cleaning millions of JSON records or deduplicating contacts—into quick, iterative analyses you can afford to run and sample-validate with an LLM afterwards. It directly reduces engineering friction for data hygiene, PR triage, and bulk operations.
  - anchor: "لقد تم خصم 0.4 سنت منك" · t=199 · [▶ 3:19](https://www.youtube.com/watch?v=dAIIaepNhQM&t=199)

- `pi-dAIIaepNhQM-04` — **Real-time voice-driven orchestration and presentation coaching** → theme [Type-safe decision models (Jev)](../../themes/type-safe-decision-models.md)
  - detail: Jev can process streaming, unstructured voice input and map it to structured actions in real time—examples include a live todo list that classifies utterances into add/delete/priority actions and a presentation coach that tracks covered bullet points as you speak. Because the model decides when it has 'enough' to call a function, it supports always-on, low-latency workflows (live dictation, in-conference tooling) that keep users on task. This reduces friction for natural input modalities and enables interfaces that previously required heavy UX engineering.
  - anchor: "أنقر على الميكروفون وأبدأ بالتحدث، ولدي قائمة بنقاط رئيسية" · t=- · [▶ video](https://www.youtube.com/watch?v=dAIIaepNhQM)

- `pi-dAIIaepNhQM-05` — **Speed yields new decision-tree workflows — 10x faster, 4x cheaper** → theme [Type-safe decision models (Jev)](../../themes/type-safe-decision-models.md)
  - detail: In game demos (chess/Tetris) Jev was reported ~10x faster per move and ~4x cheaper than a conventional LLM pipeline, showing that speed can be the difference between interactive and unusable experiences. That performance opens up multi-step decision architectures where you can quickly narrow options with Jev and call more expensive models only for refinement, enabling hybrid chains that balance cost, latency, and intelligence. Fast decision models thus change product design trade-offs around real-time interactivity.
  - anchor: "جيف كان أسرع بعشر مرات في متوسط الحركة، وأرخص بأربع مرات." · t=- · [▶ video](https://www.youtube.com/watch?v=dAIIaepNhQM)

_Provenance archive — generated, never hand-edited. Theme pages are the curated view._
