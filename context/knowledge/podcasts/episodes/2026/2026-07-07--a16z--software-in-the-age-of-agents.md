# a16z — Software in the Age of Agents | The a16z Show

_source: youtube · channel: a16z · published: 2026-07-07_
_video: https://www.youtube.com/watch?v=Mxs4erDxOEE_
_guests: Sema, Stephen_
_captured: 2026-07-08 (Path A) · digest run 20260708T0402_

## Summary
The conversation explains how the rise of agent-driven interfaces and 'headless' products is changing what matters in software: data and business logic rather than UIs. It argues that agents expose gaps—context, exception handling, permissioning—that incumbents' systems of record (CRM, ERP, SAP) weren't designed to capture, and that startups should build in-between layers or vertical, context-rich products rather than try to rip out core enterprise systems. The throughline is pragmatic: headless APIs alone don't solve the hard long tail of enterprise work; capturing context and handling exceptions is.

## Insights extracted (5)

- `pi-Mxs4erDxOEE-01` — **Headless products surface data/logic as the real product** → theme [AI agents & applications](../../themes/ai-agents-and-applications.md)
  - detail: Recent announcements like Salesforce's 'headless 360' are largely rebrands of existing APIs, but they signal a shift: the valuable asset is the underlying data and business logic, not the human-facing UI. That matters because agents (chatbots, Slackbots, MCPs) will access systems via APIs or messaging rather than clicking through screens, so vendors need to expose reliable programmatic access while preserving business rules. Notion's headless move is a clearer example because its users are more likely to build agentic workflows themselves.
  - anchor: "the data, the logic, everything stored below it" · t=179 · [▶ 2:59](https://www.youtube.com/watch?v=Mxs4erDxOEE&t=179)

- `pi-Mxs4erDxOEE-02` — **Agents fall into three functionally different categories** → theme [Agent engineering & production infra](../../themes/agent-engineering-patterns.md)
  - detail: An agent can (1) look something up (a lightweight read), (2) 'do something' (write/change, which triggers impersonation, credential and seat/licensing issues), or (3) analyze (multi-system, iterative work that amplifies hallucination risk). These categories change the engineering and product requirements: lookups are forgiving, actions require identity/permission models, and analyses need verification and multi-source grounding because incorrect steps compound. Treating all agent interactions as equivalent (just another API) hides these distinct safety and UX problems.
  - anchor: "Is it looking something up? Because that's actually" · t=474 · [▶ 7:54](https://www.youtube.com/watch?v=Mxs4erDxOEE&t=474)

- `pi-Mxs4erDxOEE-03` — **Enterprise stickiness comes from embedded workflows, money collection, and compliance** → theme [Product discovery & strategy](../../themes/product-discovery-and-strategy.md)
  - detail: Software becomes 'sticky' not merely because of UIs but because it codifies workflows, regulatory constraints, billing flows, and money collection—Stripe succeeded by solving payments complexity at scale, SAP is sticky because it encodes business rules for manufacturing and compliance. That embedded logic, customizations, and the fact that companies actually send money through these systems make displacement costly and slow. So agents may change access patterns but can't trivially replace the domain logic that runs the business.
  - anchor: "the stickiest software is software that's getting used somewhere" · t=736 · [▶ 12:16](https://www.youtube.com/watch?v=Mxs4erDxOEE&t=736)

- `pi-Mxs4erDxOEE-04` — **Agents require external context and exception handling beyond records** → theme [AI agents & applications](../../themes/ai-agents-and-applications.md)
  - detail: CRMs and ERPs often lack the informal rules and edge-case policies in humans' heads—region-specific responses, permission exceptions, and ad hoc SOPs—that agents must observe to act correctly. The panel argues this context graph (exception logic, permission rules, and nuance) is what agents need to act autonomously; capturing it requires instrumenting conversations, voice agents, or observing human workflows over time. That data exhaust is slower and messier than API reads, so trust and incremental evidence accumulation matter for adoption.
  - anchor: "It's the edge cases and the permissioning" · t=1763 · [▶ 29:23](https://www.youtube.com/watch?v=Mxs4erDxOEE&t=1763)

- `pi-Mxs4erDxOEE-05` — **Middleware/abstraction layers rarely displace incumbents directly** → theme [Product discovery & strategy](../../themes/product-discovery-and-strategy.md)
  - detail: An intermediate layer that merely abstracts multiple enterprise systems (MCPs, headless stacks) often fails because incumbents are incentivized to remain central and to extend their product rather than be disintermediated. The safer startup paths are: augment incumbents with agentic overlays that enhance discovery and action, target the handoffs between functions inside companies, or attack verticals where physical-world data and context are poorly captured today. History and examples (Workday/APIs, SAP, the unstable middleware market) show that being 'in between' or vertical is more actionable than a head-on replacement.
  - anchor: "no software wants to be disintermediated by some other layer above it" · t=2826 · [▶ 47:06](https://www.youtube.com/watch?v=Mxs4erDxOEE&t=2826)

_Provenance archive — generated, never hand-edited. Theme pages are the curated view._
