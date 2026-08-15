# SaaStr AI — Agents Are Your New Power Users: How Klaviyo CEO Andrew Bialecki Is Remaking a $1.4B Business

_source: youtube · channel: SaaStr AI · published: 2026-08-14_
_video: https://www.youtube.com/watch?v=hdZY2T8o4M4_
_guests: Andrew Bialecki (Klaviyo)_
_captured: 2026-08-15 (Path A) · digest run 20260815T0405_

## Summary
Klaviyo CEO Andrew Bialecki explains how the company is rebuilding its product around autonomous agents that can both advise customers and execute marketing work on their behalf. He lays out an engineering pattern — a "dark factory" — that uses agents to decompose, generate, test, and iterate software and agent behavior at scale, and argues companies must expose agent-friendly APIs and live data to make agents reliable and valuable. The throughline: agents become the new power users, changing onboarding, experimentation, and product roadmaps.

## Insights extracted (5)

- `pi-hdZY2T8o4M4-01` — **Agents become the product's new power users from day one** → theme [AI agents & applications](../../themes/ai-agents-and-applications.md)
  - detail: Klaviyo treats agents as immediate 'power users' that can perform complex marketing tasks on behalf of novices, effectively shifting the distribution of user skill to the right. With 200,000 customers, their composer agent can propose, predict outcomes, and even execute campaigns so that merchants who previously had only an hour or two a week can get advanced results without deep product training. That matters because it reduces manual onboarding costs and unlocks value for the long tail of small businesses who can't afford specialists.
  - anchor: "Agents change that entirely. With agents, they go straight" · t=1247 · [▶ 20:47](https://www.youtube.com/watch?v=hdZY2T8o4M4&t=1247)

- `pi-hdZY2T8o4M4-02` — **A "dark factory" lets agents design, decompose, and produce production code** → theme [Agent engineering & production infra](../../themes/agent-engineering-patterns.md)
  - detail: Klaviyo built an internal system called Dark Factory where an agent acts as a PM: it breaks a high-level prompt into specifications, decomposes subsystems, writes API contracts, and generates code and tests. They used this pattern to prototype the composer agent over a single weekend and then iterate it into production with sandboxing, load tests, and human-in-the-loop review. The consequence is faster, less tangled engineering at scale — agents produce structured work that humans can review rather than a pile of ad-hoc prompts.
  - anchor: "a project an internal agent that we have called dark factory" · t=712 · [▶ 11:52](https://www.youtube.com/watch?v=hdZY2T8o4M4&t=712)

- `pi-hdZY2T8o4M4-03` — **Treat general LMs like athletes that need domain coaching and data** → theme [Agent engineering & production infra](../../themes/agent-engineering-patterns.md)
  - detail: Bialecki's metaphor: a base LLM is like a talented middle-school athlete — versatile but not elite at a specific sport unless coached and fed the right drills and film. Klaviyo boosts performance by giving agents a real-time feed of customer behavior and a 'coach' that scores proposals (predicted engagement/revenue) and suggests tuning, which materially improves campaign quality. The non-obvious point: model choice alone isn't enough — domain signals and evaluation harnesses create differentiated agent behavior.
  - anchor: "treat the underlying LM as like a very athletic middle schooler" · t=964 · [▶ 16:04](https://www.youtube.com/watch?v=hdZY2T8o4M4&t=964)

- `pi-hdZY2T8o4M4-04` — **Use agents and teams of agents to build and train other agents** → theme [Agent engineering & production infra](../../themes/agent-engineering-patterns.md)
  - detail: Rather than hand-building each customer-facing bot, Klaviyo uses agents to synthesize use cases, generate training conversations (synthetic or real), exercise APIs, and iterate until the agent reliably handles flows like refunds or purchases. They can deliver a trained agent at day one with measured resolution rates (often 50–70%) and then let customers optimize it, which sidesteps the need to teach every user to build agents. This pattern scales agent deployment across a large SMB base that couldn't otherwise afford bespoke engineering.
  - anchor: "you should use agents and teams of agents to build agents" · t=1092 · [▶ 18:12](https://www.youtube.com/watch?v=hdZY2T8o4M4&t=1092)

- `pi-hdZY2T8o4M4-05` — **Agents expose product gaps and force companies to build agent-friendly APIs** → theme [AI agents & applications](../../themes/ai-agents-and-applications.md)
  - detail: When agents try to optimize outcomes they quickly surface missing functionality or brittle interfaces — e.g., Klaviyo's composer agent requested AMP-style editing APIs to create interactive emails and asked for better experimentation primitives. Because agents can cheaply run many micro-tests (1% audience experiments) they both accelerate experimentation and reveal which APIs must be added for scale. The practical implication: invest in headless, API-first interfaces now or agents will demand—and enable—those capabilities anyway.
  - anchor: "Almost on day one, our composer agent figured out" · t=1353 · [▶ 22:33](https://www.youtube.com/watch?v=hdZY2T8o4M4&t=1353)

_Provenance archive — generated, never hand-edited. Theme pages are the curated view._
