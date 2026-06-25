# How I AI — GLM 5.2 is SO GOOD (and almost free)

_source: youtube · channel: How I AI · published: 2026-06-24_
_video: https://www.youtube.com/watch?v=ZoBfQZ5utQk_
_guests: —_
_captured: 2026-06-25 (Path A) · digest run 20260625T0403_

## Summary
The host evaluates GLM 5.2 as an open-weight large language model that approaches the performance of closed frontier models (Opus/GPT-5.5) while being far cheaper and self-hostable via providers like OpenRouter. The video demos practical integration into developer tools (Cursor, Claude Code), benchmarks/limitations (text-only, million-token context), and real workflows showing strengths in codebase understanding, HTML/CSS generation, and long-running agentic tasks, but occasional struggle with React/TypeScript.

## Insights extracted (4)

- `pi-ZoBfQZ5utQk-01` — **GLM 5.2 approaches Opus/GPT‑5.5 intelligence on benchmarks** → theme [Model reviews & benchmarks](../../themes/model-reviews-and-benchmarks.md)
  - detail: Independent benchmark suites (Frontier Sweep, Post-Train Bench, Sweep Marathon, Sweep Bench Pro) place GLM 5.2 near Opus and above Gemini/GPT-5.5 on many tests, especially in coding tasks. That positions GLM 5.2 as a frontier-class model you can actually inspect and run yourself, meaning teams can get similar capabilities without being locked into expensive commercial endpoints.
  - anchor: "GLM 5.2 is getting people sort of" · t=198 · [▶ 3:18](https://www.youtube.com/watch?v=ZoBfQZ5utQk&t=198)

- `pi-ZoBfQZ5utQk-02` — **It's text‑only but has a huge context window and modern features** → theme [Model reviews & benchmarks](../../themes/model-reviews-and-benchmarks.md)
  - detail: GLM 5.2 supports a 1,000,000-token context window and standard modern model ergonomics — streaming, function calls, context caching, structured output and MCPs — but it accepts only text input and output. That limits multimodal use cases (no images/vision), yet makes it highly suitable for long-document coding, retrieval, and autonomous agent workflows where huge context and tool calls matter.
  - anchor: "it only takes text in and only takes text out" · t=259 · [▶ 4:19](https://www.youtube.com/watch?v=ZoBfQZ5utQk&t=259)

- `pi-ZoBfQZ5utQk-03` — **Open weights + hosted routing makes GLM 5.2 dramatically cheap** → theme [Model reviews & benchmarks](../../themes/model-reviews-and-benchmarks.md)
  - detail: By routing GLM 5.2 through a provider like OpenRouter and using self-hosted or alternative inference providers, the author ran ~6 million tokens for $3.36 (with ~72% cache rate), a fraction of Opus/GPT-5.5 costs. That cost delta plus the ability to inspect weights and swap vendors matters for teams worried about vendor lock-in and API pricing volatility.
  - anchor: "I spent $3.36 on about 6 million tokens." · t=1540 · [▶ 25:40](https://www.youtube.com/watch?v=ZoBfQZ5utQk&t=1540)

- `pi-ZoBfQZ5utQk-04` — **Strong practical performance but flaky on React/TypeScript generation** → theme [Model reviews & benchmarks](../../themes/model-reviews-and-benchmarks.md)
  - detail: In demos GLM 5.2 quickly explored a codebase, produced well-formed HTML/CSS and even built a prioritized Sentry/Vercel bug-fix plan during a long run, showing good agentic and data-integration ability. However, it repeatedly struggled writing React/TypeScript code (needed iterations to compile), so while fine for front-end design, HTML, and long-running tooling tasks, teams relying heavily on React/TS should validate outputs carefully.
  - anchor: "It is really struggling to write TypeScript." · t=1360 · [▶ 22:40](https://www.youtube.com/watch?v=ZoBfQZ5utQk&t=1360)

_Provenance archive — generated, never hand-edited. Theme pages are the curated view._
