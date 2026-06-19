# Every — How GitHub Deals with 17 Million Pull Requests a Month

_source: youtube · channel: Every · published: 2026-06-17_
_video: https://www.youtube.com/watch?v=OCEVqy8kl7Q_
_guests: Kyle (GitHub)_
_captured: 2026-06-19 (Path A) · digest run 20260619T0402_

## Summary
A GitHub executive explains how AI agents are rapidly increasing code production and what GitHub is building to keep repositories manageable. The conversation covers agent-generated pull request volume, tools to automate reviews and merges, maintainer controls (not one-size-fits-all standards), pricing and rate-limit trade-offs, and iterative model improvement via product-driven "hill climbing."

## Insights extracted (5)

- `pi-OCEVqy8kl7Q-01` — **Agent-generated PRs are already flooding repos (millions monthly).** → theme [Agent engineering & production infra](../../themes/agent-engineering-patterns.md)
  - detail: GitHub sees enormous agent activity: in March there were 17 million pull requests created by agents alone, which multiplies the amount of code and PRs maintainers must process. To avoid dismissing this as low-value noise, GitHub is building agentic code-review and agentic-merge features that can find vulnerabilities, make fixes, wait for CI and enforce policies so PRs arrive in a reviewable state. This matters because open-source maintainers report being overwhelmed, and automation needs to both scale and preserve maintainer control.
  - anchor: "in March you know there were 17 million poll requests" · t=405 · [▶ 6:45](https://www.youtube.com/watch?v=OCEVqy8kl7Q&t=405)

- `pi-OCEVqy8kl7Q-02` — **GitHub will provide controls, not impose a single PR governance standard.** → theme [AI agents & applications](../../themes/ai-agents-and-applications.md)
  - detail: Rather than forcing one workflow, GitHub focuses on offering building blocks so communities decide who can submit PRs, what proof of contribution is required, and how vouch systems operate. Executives point to examples like Mitchell Hashimoto's vouch system to show valid community-specific practices, and say GitHub will only 'lock in' a standard if the community converges on one. That approach keeps maintainers in control and avoids creating a universal gate that would break diverse open-source norms.
  - anchor: "giving maintainers more tools to decide" · t=281 · [▶ 4:41](https://www.youtube.com/watch?v=OCEVqy8kl7Q&t=281)

- `pi-OCEVqy8kl7Q-03` — **Heavy agent usage will be managed with rate limits or usage-based tiers.** → theme [Growth, GTM & pricing](../../themes/growth-gtm-and-pricing.md)
  - detail: GitHub currently relies on familiar mechanisms—free core experiences plus API rate limits—to throttle excessive automated activity, but expects those controls to evolve as agents multiply (the example of dozens or 150 agents per user was cited). The company wants to enable large-scale agent usage for power users while preserving a good baseline free experience; model routing and auto-selection are proposed ways to reduce token costs and make pricing predictable. The implication: expect nuanced, usage-aware pricing rather than simple blanket subscriptions.
  - anchor: "we've always had you know API rate limits" · t=506 · [▶ 8:26](https://www.youtube.com/watch?v=OCEVqy8kl7Q&t=506)

- `pi-OCEVqy8kl7Q-04` — **Continuous 'hill climbing' on real product data is central to improving models.** → theme [Model reviews & benchmarks](../../themes/model-reviews-and-benchmarks.md)
  - detail: GitHub/Microsoft treat iterative improvement—using thumbs-up/down, acceptance rates, evals and telemetry—as the core way to make models better in practice, not just lab benchmarks. They run weekly hill-climbing cycles, combine hard and soft metrics, and use techniques like frontier tuning on enterprise data (e.g., M365 assets) to get meaningful gains without huge bespoke effort. That makes personalization and model routing tractable and helps avoid wild cost increases by matching problem difficulty to model choice.
  - anchor: "Every week we're talking about the hill climbing results" · t=1242 · [▶ 20:42](https://www.youtube.com/watch?v=OCEVqy8kl7Q&t=1242)

- `pi-OCEVqy8kl7Q-05` — **Developers are adopting personal agents as private productivity coaches.** → theme [AI agents & applications](../../themes/ai-agents-and-applications.md)
  - detail: Beyond code generation, people are using agents to audit personal work: the guest describes an agent (Baxter) that reads his emails and Slack, highlights recurring habits, suggests clearer metaphors, and checks whether he followed through on tasks. This 'self-improvement loop' is powerful because humans accept critical feedback from an agent more readily than from other people, and it creates continuous, personalized product value that reinforces agent adoption.
  - anchor: "my open claw that I affectionately named Baxter" · t=1578 · [▶ 26:18](https://www.youtube.com/watch?v=OCEVqy8kl7Q&t=1578)

_Provenance archive — generated, never hand-edited. Theme pages are the curated view._
