# How I AI — I let Codex control my browser so I don't have to

_source: youtube · channel: How I AI · published: 2026-07-22_
_video: https://www.youtube.com/watch?v=lk63Sl-LRKE_
_guests: —_
_captured: 2026-07-23 (Path A) · digest run 20260723T0405_

## Summary
The host demos using Codex's browser and computer control features to automate web tasks and product work. Central argument: giving an agent controlled access to your browser/computer can replace tedious QA, persona testing, and everyday chores—surfacing edge-case bugs and saving hours while still needing light human verification.

## Insights extracted (3)

- `pi-lk63Sl-LRKE-01` — **Browser-driven agents find exhaustive QA edge cases humans miss** → theme [Agent engineering & production infra](../../themes/agent-engineering-patterns.md)
  - detail: Running Codex as a browser agent can automatically exercise web flows across viewports, error states, and accessibility checks while taking screenshots and producing a tracked bug list. The host used it to test an onboarding flow: the agent changed viewport sizes, tested multiple sign-up paths, discovered 11 issues including one high-severity navigation blocker (a required field that still let you continue), and exported a prioritized Google Sheet with screenshots and remediation notes. This matters because automated exhaustive testing surfaces failure states a tired human QAer often skips and produces reproducible artifacts for developers.
  - anchor: "using browser use alongside a coding agent to validate changes" · t=264 · [▶ 4:24](https://www.youtube.com/watch?v=lk63Sl-LRKE&t=264)

- `pi-lk63Sl-LRKE-02` — **Persona-driven browser runs produce research-style product critiques** → theme [AI & the PM craft](../../themes/ai-and-the-pm-craft.md)
  - detail: You can prompt Codex to impersonate specific user personas, let it use the app like that persona, and then produce a research-style critique covering friction, delights, and improvements. The host (crediting EJ Lawless) had the agent act as a product manager, an engineer, and a team leader; it exercised the chat/PRD flows and surfaced real handoff problems—like inability to reference one document from another—and UX issues such as slow, opaque loading states. This technique is useful because it simulates fresh eyes across roles and discovers structural breaks in workflows that developers and designers may be blind to.
  - anchor: "impersonate specific personas of his applications and then" · t=745 · [▶ 12:25](https://www.youtube.com/watch?v=lk63Sl-LRKE&t=745)

- `pi-lk63Sl-LRKE-03` — **Letting Codex control the browser replaces many tedious web chores** → theme [AI agents & applications](../../themes/ai-agents-and-applications.md)
  - detail: Granting browser/computer access (via @browser, @chrome, or @computer) lets Codex carry out everyday tasks like triaging LinkedIn messages, curating and adding items to shopping carts, filling long forms, or even controlling a mirrored iPhone to update routers and SSH into home machines. The host shows practical examples: the agent populated a Free People cart with 10 medium items totaling $352 pre-tax, triaged unread LinkedIn messages and drafted replies, and used iPhone mirroring to adjust Wi‑Fi settings remotely. The tradeoff is occasional human verification—agents can pick inappropriate items or interpret UI states incorrectly—so a light human-in-the-loop is still recommended.
  - anchor: "reduced so much personal toil and personal digital toil" · t=174 · [▶ 2:54](https://www.youtube.com/watch?v=lk63Sl-LRKE&t=174)

_Provenance archive — generated, never hand-edited. Theme pages are the curated view._
