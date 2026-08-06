# How I AI — Build an AI code review agent with Vercel Eve (full tutorial)

_source: youtube · channel: How I AI · published: 2026-08-05_
_video: https://www.youtube.com/watch?v=cmATJGbA8bI_
_guests: —_
_captured: 2026-08-06 (Path A) · digest run 20260806T0404_

## Summary
The host demonstrates how to build an internal GitHub PR review agent using Vercel Eve and Codex browser automation, arguing that AI-approved PRs can safely speed up engineering velocity. She walks through the agent architecture, a practical risk-scoring rubric, deployment shortcuts, and operational controls (Slack escalations, auditability) that make automatic approvals both fast and compliant.

## Insights extracted (5)

- `pi-cmATJGbA8bI-01` — **AI-approved PRs can be faster and safer than human-only reviews** → theme [Agent engineering & production infra](../../themes/agent-engineering-patterns.md)
  - detail: Intercom's experience shows AI-approved PRs were approved five times faster than human reviews and had lower revert rates, because the agent enforces consistent checks and produces auditable evidence. The host argues this makes AI an advantage for safety and quality when organizations add labeling, tracing and compliance controls (SOC2/HIPAA) rather than treating auto-approval as inherently risky.
  - anchor: "AI approved PRs are approved faster, actually five" · t=252 · [▶ 4:12](https://www.youtube.com/watch?v=cmATJGbA8bI&t=252)

- `pi-cmATJGbA8bI-02` — **Vercel Eve drastically reduces the work to deploy chat-and-review agents** → theme [Agent harness engineering](../../themes/agent-harness-engineering.md)
  - detail: Eve is essentially a directory-of-instructions model that bundles skills, tools, a sandbox, and managed connectors for Slack and GitHub, so you avoid building authentication, token refresh, and multi-channel plumbing yourself. The host finds Eve simpler and faster than alternatives (OpenClaw, Hermes) because it exposes ready-made channels, a chat SDK, and a wizard-like setup for enterprise integrations.
  - anchor: "Eve has become the simplest way for me" · t=389 · [▶ 6:29](https://www.youtube.com/watch?v=cmATJGbA8bI&t=389)

- `pi-cmATJGbA8bI-03` — **A compact risk rubric lets the agent auto-approve low-risk PRs** → theme [Agent harness engineering](../../themes/agent-harness-engineering.md)
  - detail: The agent reads the diff, scores risk using six factors (change surface/blast radius, reversibility, data/security impact, operational changes, verification/tests, and CI status), and maps numeric scores to actions: under 24 = low (auto-approve), 25–64 = medium, 65+ = high (require human). In practice the bot annotated docs PRs as low risk (e.g., 6/10 or 7/10) and auto-approved them, while a 45/100 deprecation PR was classified medium and blocked for human review.
  - anchor: "it looks at six things. How big is" · t=949 · [▶ 15:49](https://www.youtube.com/watch?v=cmATJGbA8bI&t=949)

- `pi-cmATJGbA8bI-04` — **Automating SaaS setup with browser automation speeds agent launch** → theme [AI agents & applications](../../themes/ai-agents-and-applications.md)
  - detail: Instead of manually clicking through Slack and GitHub app configuration screens (permissions, 2FA, tokens), the host used Codex's Chrome browser automation to navigate and click UI elements, reducing setup friction. She calls this a pragmatic 'hack' that let her get the GitHub app and Slack integration configured quickly without hand-editing every external console.
  - anchor: "Chrome browser use is such a useful hack" · t=676 · [▶ 11:16](https://www.youtube.com/watch?v=cmATJGbA8bI&t=676)

- `pi-cmATJGbA8bI-05` — **Continuous evals are required to keep the review agent reliable** → theme [Agent engineering & production infra](../../themes/agent-engineering-patterns.md)
  - detail: Every agent review should be logged to an internal eval platform so engineers can label whether the agent's decision was correct and why, enabling iterative improvements to scoring and prompts. The host highlights this as analogous to customer-facing model evals and essential when the agent touches critical systems like code.
  - anchor: "they run evals on this internal agent" · t=1376 · [▶ 22:56](https://www.youtube.com/watch?v=cmATJGbA8bI&t=1376)

_Provenance archive — generated, never hand-edited. Theme pages are the curated view._
