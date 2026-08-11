# a16z — Kavak's Playbook for Rebuilding a Company Around AI

_source: youtube · channel: a16z · published: 2026-08-10_
_video: https://www.youtube.com/watch?v=n34CIw3gk1k_
_guests: Ali (Kavak)_
_captured: 2026-08-11 (Path A) · digest run 20260811T0402_

## Summary
Kavak rebuilt itself from a transaction-focused used-car marketplace into an agent-driven, AI-native company by designing long-running, customer-specific agents, investing heavily in evaluation systems, and retraining its workforce. The argument: to get outsized gains from AI you must redesign organization, measurement, and feedback loops (not just bolt on models), then iterate aggressively at production scale.

## Insights extracted (5)

- `pi-n34CIw3gk1k-01` — **Rebuild the company around long-running agents, not workflows.** → theme [AI agents & applications](../../themes/ai-agents-and-applications.md)
  - detail: Kavak decided to design the firm as a system of persistent, goal-driven agents — one per customer — rather than bolting chatbots onto existing processes. Each agent holds memory of years of interactions, has long-term objectives (e.g., maximize lifetime value), and can call company APIs to act autonomously; this architectural choice required reworking APIs and data flows so agents can perform end-to-end tasks. The non-obvious payoff is that this lets the company optimize relationships over time instead of treating every contact as an isolated transaction.
  - anchor: "we bet the company in transforming to a company run" · t=202 · [▶ 3:22](https://www.youtube.com/watch?v=n34CIw3gk1k&t=202)

- `pi-n34CIw3gk1k-02` — **Customer-specific agents outperform humans at selling and retention.** → theme [Growth, GTM & pricing](../../themes/growth-gtm-and-pricing.md)
  - detail: Kavak reports that agents tripled NPS and initially converted 50% more than humans, now converting ~2.1x more; agents handle ~96% of interactions and ~95% of transactions. They spawn 100,000–200,000 agents daily, each with its own VM, memory and skills, and agents improve collectively because a mistake learned by one updates the system for all. That combination of infinite patience, full history, and integrated skills makes agents better sellers and relationship managers than siloed human experts.
  - anchor: "agent will get spawned specifically for this customer" · t=224 · [▶ 3:44](https://www.youtube.com/watch?v=n34CIw3gk1k&t=224)

- `pi-n34CIw3gk1k-03` — **Evals are the 'brakes' — invest as much in them as in agents.** → theme [Agent engineering & production infra](../../themes/agent-engineering-patterns.md)
  - detail: Kavak treats evaluation systems (evals) as essential safety and learning infrastructure and spends roughly equal engineering time, tokens, and budget on evals as on the agents themselves. Good evals let them move fast without catastrophic errors by measuring business outcomes (conversion, lifetime value, re-engagement) rather than superficial KPIs like call minutes. That discipline closes feedback loops: agents deployed to customers generate real data and labels that are used to fine-tune models and skills, producing rapid systemic improvement.
  - anchor: "in order to move fast, you need to have brakes" · t=543 · [▶ 9:03](https://www.youtube.com/watch?v=n34CIw3gk1k&t=543)

- `pi-n34CIw3gk1k-04` — **Top-down mandate plus company-wide retraining accelerates adoption.** → theme [Leadership, careers & teams](../../themes/leadership-careers-and-teams.md)
  - detail: Kavak made the transformation explicit and compulsory: leadership set the vision and launched an internal 'Jedi Academy' to teach everyone — from the CEO to mechanics — to build and collaborate with agents. This created a flattened, cross-functional org where teams either build agents, work for agents, or operate in the physical world with agent sidekicks, and humans now often act on agent prompts. The result: faster rollout, cultural alignment, and practical reskilling so staff can work productively in an agentic organization.
  - anchor: "We launched a program inside Quebec that's called the Jedi Academy" · t=1224 · [▶ 20:24](https://www.youtube.com/watch?v=n34CIw3gk1k&t=1224)

- `pi-n34CIw3gk1k-05` — **Superficial adoption yields small gains; rebuilding can unlock 10x value.** → theme [AI agents & applications](../../themes/ai-agents-and-applications.md)
  - detail: Ali argues that simply adding AI to legacy structures produces marginal (single-digit percent) improvements; to get 3x+ productivity you must redesign processes and organization around the new capability, the same way factories were redesigned for electricity. This is the basis for creative destruction: incumbents that only adopt superficially will be outcompeted by new entrants built natively around agentic AI, so founders should consider deep, vertical designs rather than horizontal add-ons.
  - anchor: "the first instinct is okay let's adopt AI" · t=319 · [▶ 5:19](https://www.youtube.com/watch?v=n34CIw3gk1k&t=319)

_Provenance archive — generated, never hand-edited. Theme pages are the curated view._
