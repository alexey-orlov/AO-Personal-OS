# Y Combinator — Open Models Change The Economics of AI

_source: youtube · channel: Y Combinator · published: 2026-09-04_
_video: https://www.youtube.com/watch?v=rY0wnfFHYbs_
_guests: Jeffrey Morgan (Ollama)_
_captured: 2026-09-05 (Path A) · digest run 20260905T0404_

## Summary
Interview with Jeffrey Morgan, co-founder and CEO of Ollama, about how open-source models are reshaping AI economics and deployment. The central argument is that lower-cost open models, plus faster agent-driven usage and efficient "flash" models, are shifting most token consumption to open weights while creating a hybrid local/cloud operating model for enterprises.

_Data-quality note: the source digest's `anchorQuote`/`tSeconds`/`link` fields for this episode came through as non-English text with no timestamp/link (upstream pipeline anomaly — flagged for `automations/podcast-streaming` to check). Anchors below fall back to the bare video URL; headline/detail are intact and verbatim._

## Insights extracted (5)

- `pi-rY0wnfFHYbs-01` — **Open models will handle most enterprise token usage** → theme [Growth, GTM & pricing](../../themes/growth-gtm-and-pricing.md)
  - detail: Open-source models remove the primary friction—cost—allowing companies to route the majority of their token traffic through open weights while retaining the option to customize and control behavior for sensitive cases. Morgan cites customer patterns and platform metrics (Ollama has millions of developers, 178k GitHub stars, and adoption in ~85% of Fortune 500) and points to AT&T moving about 40% of its token consumption to open models as a concrete example. That matters because cheaper tokens unlock far broader, higher-frequency usage inside organizations without sacrificing the ability to run critical tasks on closed or specialist models.
  - anchor: "-" · t=— · [▶ video](https://www.youtube.com/watch?v=rY0wnfFHYbs)

- `pi-rY0wnfFHYbs-02` — **Agents (Open Claw/Hermes) drove massive, exponential token growth** → theme [Agent engineering & production infra](../../themes/agent-engineering-patterns.md)
  - detail: The rise of programming agents and automation frameworks shifted usage from single-call interactions to long, tool-using agent runs that consume orders-of-magnitude more context and tokens. Morgan reports per-user context needs grew from ~128k to over 1M tokens and platform-wide growth spikes (he cites 10–20x general growth and up to ~150x in some Llama Cloud metrics), driven by agents like Open Claw that let non-developers delegate complex workflows. This changes infrastructure and cost planning: heavy agent workloads favor cheaper open models and force new capacity and orchestration designs.
  - anchor: "-" · t=— · [▶ video](https://www.youtube.com/watch?v=rY0wnfFHYbs)

- `pi-rY0wnfFHYbs-03` — **Most tokens will flow through open models, but not most spend** → theme [Growth, GTM & pricing](../../themes/growth-gtm-and-pricing.md)
  - detail: Morgan argues enterprises will route roughly 80–90% of token volume through open models because of drastically lower unit cost, yet that doesn't mean 80–90% of budget goes to open weights. The practical effect is huge token volumes at low per-token cost, while niche or hardest tasks (and some SLA-sensitive workloads) still consume the expensive closed-model budget. The distinction — token share vs. dollar share — reframes procurement and architecting router logic between open and frontier models.
  - anchor: "-" · t=— · [▶ video](https://www.youtube.com/watch?v=rY0wnfFHYbs)

- `pi-rY0wnfFHYbs-04` — **Very efficient 'flash' models will become the backbone for 80% of tasks** → theme [ML Systems & Inference Engineering](../../themes/ml-systems-and-inference-engineering.md)
  - detail: A new class of ultra‑efficient models (e.g., DeepSeek Flash) delivers far lower cost per token and per task and is already meeting the needs of roughly 80% of common workloads. Morgan points to platform adoption where DeepSeek Flash leads the fastest growth on Ollama Cloud and argues these models let companies ignore token limits the way consumer ChatGPT did — enabling heavy, inexpensive usage and composition of many small models for bigger problems. For startups and enterprises this means cheaper scale and new architectures that stitch many flash models together.
  - anchor: "-" · t=— · [▶ video](https://www.youtube.com/watch?v=rY0wnfFHYbs)

- `pi-rY0wnfFHYbs-05` — **Hybrid local + cloud deployments are the practical default** → theme [Local AI hardware & infra](../../themes/local-ai-hardware-and-infra.md)
  - detail: Enterprises will mix local, low-latency models on efficient hardware (Apple Silicon, DGX Spark) with large cloud-hosted models for the hardest agent tasks. Morgan reports strong local model use (a mix of US/EU/China models) and says cloud usage is currently dominated by Chinese models, while local deployments run a balanced set. The implication: architects should design routers that decide when to keep work on-device (cheaper/faster) and when to escalate to cloud frontier models for complexity or scale.
  - anchor: "-" · t=— · [▶ video](https://www.youtube.com/watch?v=rY0wnfFHYbs)

_Provenance archive — generated, never hand-edited. Theme pages are the curated view._
