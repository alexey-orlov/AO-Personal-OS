# How I AI — OpenAI DevDay 2026: Dots, Spaces, and ULTRAFAST

_source: youtube · channel: How I AI · published: 2026-10-01 (digest date)_
_video: https://www.youtube.com/watch?v=pJNM1z9l5mU_
_guests: Kath (product lead, Sites)_
_captured: 2026-10-01 (Path A) · digest run 20261001T0405_

## Summary
A rapid recap of OpenAI DevDay 2026 that focuses on three product thrusts — personal agents called Dots, collaborative work surfaces (Spaces and Sites), and new model options that trade speed, cost, and capability. The throughline is that OpenAI is stitching agents, documents, and low-latency/high-cost models into end-to-end developer and enterprise workflows that enable new real-time user experiences and tighter data governance.

## Insights extracted (5)

- `pi-pJNM1z9l5mU-01` — **Dots act as proactive, memory-enabled personal delegates** → theme [AI agents & applications](../../themes/ai-agents-and-applications.md)
  - detail: Dots are persistent agents that can live in the cloud but also access your local machine, be installed into Slack, and even accept or place calls. Early testing shows they can do real work — shopping, coding, scheduling with memory-aware reminders — and be proactive (e.g., suggesting November options for a task). The UX and information architecture are still rough (confusion between dot threads, chat threads, and codeex threads), but the core capability — a delegate that can act autonomously with memory — is solid and likely to change personal productivity patterns.
  - anchor: "In addition to their computer, you can give" · t=154 · [▶ 2:34](https://www.youtube.com/watch?v=pJNM1z9l5mU&t=154)

- `pi-pJNM1z9l5mU-02` — **Spaces create AI-native collaborative docs for humans and agents** → theme [AI agents & applications](../../themes/ai-agents-and-applications.md)
  - detail: Spaces is a shared workspace in ChatGPT where humans and agents co-edit documents, slides, and other artifacts with built-in sharing and permissions. The host demonstrates practical uses — a dot-created 'personal scratch pad' for to-dos, collaborative slide editing, and agent-driven document updates — showing this is more than content generation: it's an agent-aware collaboration layer. For enterprises, Spaces is positioned as the kind of AI-native document and slide platform they’ve been waiting for and could compete directly with existing suites that lack agent integration.
  - anchor: "Space is a place in chat GBT where" · t=424 · [▶ 7:04](https://www.youtube.com/watch?v=pJNM1z9l5mU&t=424)

- `pi-pJNM1z9l5mU-03` — **Sites can bundle connectors/plugins to share governed data apps** → theme [AI agents & applications](../../themes/ai-agents-and-applications.md)
  - detail: OpenAI Sites now let you include connectors and plugins (e.g., a Snowflake plugin) so a shared web app can surface live, connector-backed data while enforcing per-user access controls. In practice, a teammate who lacks Snowflake access will not see the same report, solving the enterprise problem of sharing prototype/vibecoded tools and dashboards securely. This feature directly targets the common ask from companies: how to deploy internal AI apps with proper governance, permissioning, and reusable data connectors.
  - anchor: "you can now bundle connectors and plugins" · t=669 · [▶ 11:09](https://www.youtube.com/watch?v=pJNM1z9l5mU&t=669)

- `pi-pJNM1z9l5mU-04` — **Decisions API adds rapid decision-making models with vision** → theme [Type-safe decision models (Jev)](../../themes/type-safe-decision-models.md)
  - detail: The Decisions API is a low-latency, constrained-output model (positioned as a Jev-style competitor) that includes vision, enabling very fast classification/selection tasks. The presenter used it to scan ~100 video frames and pick non-awkward thumbnail frames in under ten seconds and to classify a hot dog image with instant high confidence, illustrating real-world automation wins for media pipelines and UX flows. Because it pairs speed with visual input, it can be slotted into product stacks where quick, deterministic choices matter.
  - anchor: "decisions API and it has vision" · t=906 · [▶ 15:06](https://www.youtube.com/watch?v=pJNM1z9l5mU&t=906)

- `pi-pJNM1z9l5mU-05` — **UltraFast (Astra) enables near-real-time intelligent apps but costs much more** → theme [ML Systems & Inference Engineering](../../themes/ml-systems-and-inference-engineering.md)
  - detail: OpenAI offers an 'ultra fast' mode (about 8x the speed of normal) for top-tier models like Astra; the tradeoff is much higher cost (the demo cost the presenter roughly $97 for 30 minutes). That latency/speed profile enabled demos not practical before: real-time SVG sketch collaboration and live 3D scene editing (a small multiplayer-ish game where the model renders scene changes instantly). The capability points to new UX classes — interactive, model-driven apps — but current economics and some remaining latency mean it's exciting for prototypes and premium experiences, not yet cheap mass deployment.
  - anchor: "on ultra fast which is eight times as fast" · t=1057 · [▶ 17:37](https://www.youtube.com/watch?v=pJNM1z9l5mU&t=1057)

_Provenance archive — generated, never hand-edited. Theme pages are the curated view._
