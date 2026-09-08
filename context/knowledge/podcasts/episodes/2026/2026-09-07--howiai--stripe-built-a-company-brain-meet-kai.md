# How I AI — Stripe built a company brain: Meet Kai

_source: youtube · channel: How I AI · published: 2026-09-07_
_video: https://www.youtube.com/watch?v=AbZODZ_4VaM_
_guests: —_
_captured: 2026-09-08 (Path A) · digest run 20260908T0402_

## Summary
This episode explains why Stripe built Kai, an internal, always-on AI agent platform, and how it scales AI safely across a complex enterprise. The central argument is that successful enterprise AI requires contextualization and governance layered on top of models — plus substantial platform and data investments — not just exposing LLMs to employees.

## Insights extracted (5)

- `pi-AbZODZ_4VaM-01` — **Enterprise AI needs governance and contextualization, not just models** → theme [Agent harness engineering](../../themes/agent-harness-engineering.md)
  - detail: Stripe built Kai because the hard problem was replicating company workflows and making AI do the right thing for every employee — not just providing model access. Kai injects personal and org-level context (org chart, projects, permissions) so responses are relevant and constrained, and it runs inside Stripe's security boundaries to reduce risk. That makes the difference between a neat demo and a trustworthy, company-wide tool.
  - anchor: "how do we get AI to everyone, right?" · t=213 · [▶ 3:33](https://www.youtube.com/watch?v=AbZODZ_4VaM&t=213)

- `pi-AbZODZ_4VaM-02` — **Projects become governance layers controlling models, tools, and permissions** → theme [Agent harness engineering](../../themes/agent-harness-engineering.md)
  - detail: Stripe uses 'projects' as a configuration and governance unit: a project bundles the right skills, default models, tool policies, and human-in-the-loop rules for a given team or initiative. Projects let admins limit token spend or forbid expensive models, isolate sensitive tool access for HR, and share consistent settings across many users — reducing ad-hoc decisions and safety risks while keeping workflows low-friction for end users.
  - anchor: "projects are primarily a governance mechanism" · t=473 · [▶ 7:53](https://www.youtube.com/watch?v=AbZODZ_4VaM&t=473)

- `pi-AbZODZ_4VaM-03` — **Skills platform packages sessions into reusable, evaluable automation** → theme [Agent delegation, loops & software factories](../../themes/agent-delegation-and-loops.md)
  - detail: Kai includes a skill-builder that converts a multi-step interactive session (like creating a dashboard) into a reusable skill with a standard spec, editable draft, and evaluative suggestions. That lets non-engineers turn ad‑hoc work into repeatable, shareable automation while the platform applies telemetry and quality checks so shared skills stay reliable. The result: users can trust agents to run parts of the business instead of redoing manual steps every time.
  - anchor: "I can create a skill that basically takes what I've done" · t=1776 · [▶ 29:36](https://www.youtube.com/watch?v=AbZODZ_4VaM&t=1776)

- `pi-AbZODZ_4VaM-04` — **Pre-AI platform investments multiply agents' effectiveness** → theme [Agent engineering & production infra](../../themes/agent-engineering-patterns.md)
  - detail: Stripe's prior investments in developer experience, a resilient query layer (Trino), a data catalog, and a blessed analytics tier made agents far more effective and reliable. The platform provides a triage: use curated analytics reports first, fall back to high-quality datasets, then to raw queries — which helps agents find correct queries and avoids brittle or incorrect outputs. The conclusion: double down on platform and data teams to get the most out of agents.
  - anchor: "prior to AI there's been a commitment to developer experience" · t=1052 · [▶ 17:32](https://www.youtube.com/watch?v=AbZODZ_4VaM&t=1052)

- `pi-AbZODZ_4VaM-05` — **Agents amplify failure modes — infra hardening and agent identity are essential** → theme [Agent harness engineering](../../themes/agent-harness-engineering.md)
  - detail: Because agents can automate and parallelize many actions, they tend to 'hammer' systems, invent unexpected workflows, or go rogue; Stripe experienced near-misses early on. To manage this, Kai uses cloud-hosted sandboxes, tool policies, load-shedding tied to an 'agentic identity', and human-in-the-loop gates for sensitive actions. These infrastructure and policy measures are crucial to prevent automation from multiplying operational risk.
  - anchor: "agents are very creative at bringing your intro down" · t=1164 · [▶ 19:24](https://www.youtube.com/watch?v=AbZODZ_4VaM&t=1164)

_Provenance archive — generated, never hand-edited. Theme pages are the curated view._
