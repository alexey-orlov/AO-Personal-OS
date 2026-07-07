# How I AI — How I run autonomous coding agents from my phone with OpenAI Symphony + Linear

_source: youtube · channel: How I AI · published: 2026-07-06_
_video: https://www.youtube.com/watch?v=KtmaWUVdnx4_
_guests: Fana Hova (Kernel)_
_captured: 2026-07-07 (Path A) · digest run 20260707T0401_

## Summary
A builder demonstrates a practical workflow for running autonomous coding agents remotely using OpenAI Symphony plus Linear as the state machine, showing how to manage long-running runs, reviews, and PRs from a phone. The throughline: move agent execution into a cloud VPS, use Symphony to convert Linear issues into Codex workpads and rework checklists, and instrument token usage and tooling so agent runs are predictable, debuggable, and cost-effective. The same pattern extends beyond code to physical-world businesses (example: an automated trading-card buyer and inventory tools).

## Insights extracted (5)

- `pi-KtmaWUVdnx4-01` — **Shift from 'agent prompter' to 'agent manager' for long tasks** → theme [Agent delegation, loops & software factories](../../themes/agent-delegation-and-loops.md)
  - detail: Rather than prompting agents locally and juggling Kanban cards, the guest moved to managing agents running on a cloud VPS so they can be messaged via text, Linear, or shell. This lets runs persist, be inspected, and be intervened on from anywhere (including a phone) instead of dying or stalling after a few turns in a local demo. The practical payoff is being able to supervise multiple concurrent, long-running coding jobs without babysitting each conversational trace.
  - anchor: "move away from being a agent prompter" · t=195 · [▶ 3:15](https://www.youtube.com/watch?v=KtmaWUVdnx4&t=195)

- `pi-KtmaWUVdnx4-02` — **Symphony + Linear convert issues into autonomous coding runs and PRs** → theme [Agent delegation, loops & software factories](../../themes/agent-delegation-and-loops.md)
  - detail: Symphony watches a Linear board, spins up a Codex workpad with a plan, acceptance criteria, and a workflow.md, runs the agent, and then produces PRs and rework checklists for human review. In the demo the flow was: create issue in Linear → Symphony generates workpad → agent implements → human review via PR → rework checklist addresses comments → merge and mark done. That makes Linear act as the single source of truth and keeps each task's full history and artifacts in one place.
  - anchor: "turning issues into coding runtime and then" · t=315 · [▶ 5:15](https://www.youtube.com/watch?v=KtmaWUVdnx4&t=315)

- `pi-KtmaWUVdnx4-03` — **Agent runs can cost millions of tokens; track usage to budget and optimize** → theme [Agent engineering & production infra](../../themes/agent-engineering-patterns.md)
  - detail: Token consumption varies wildly by task; the guest showed tasks that were tens of tokens and one that used "221 million tokens" to rewrite storage and make a deployable Vercel app. Tracking token usage per run lets you estimate cost ahead of time and identify when tooling or clearer specs could reduce runaway consumption. Without that telemetry you can't price work or decide whether to add intermediate checks, better prompts, or helper tools.
  - anchor: "this one is like 221 million tokens" · t=490 · [▶ 8:10](https://www.youtube.com/watch?v=KtmaWUVdnx4&t=490)

- `pi-KtmaWUVdnx4-04` — **Tooling (screenshots, visual diffs, work-tree managers) matters more than orchestration** → theme [Agent engineering & production infra](../../themes/agent-engineering-patterns.md)
  - detail: Orchestration frameworks like Symphony provide the state machine, but the guest stresses that longer, reliable runs depend on the tools you give agents—e.g., Glimpse (a Playwright extension) for screenshots and visual diffs, and work-tree managers for repo hygiene. These tools let an agent continue through brittle UI or integration steps and reduce human rework; without them runs either fail or consume far more tokens. Symphony itself lacks a visual UI and cost ledger, so builders still need to add the tooling layer.
  - anchor: "less about the orchestration itself and like the tools" · t=751 · [▶ 12:31](https://www.youtube.com/watch?v=KtmaWUVdnx4&t=751)

- `pi-KtmaWUVdnx4-05` — **Autonomous agents unlock small businesses that handle messy, heterogeneous physical data** → theme [AI agents & applications](../../themes/ai-agents-and-applications.md)
  - detail: Concrete examples: an automated 'power buyer' for trading cards (Merlion Games) that crawls PSA numbers and eBay listings, and a book-cataloging use where Gemini identified 600 books from photos. These are tasks that were previously impossible to scale with classic software because the inputs are varied (images, listings, inconsistent records), but LLMs plus browser/agent tooling can extract, normalize, and act on that data. The result is new cash-generating workflows (inventory-based buying, pricing at trade shows) that amplify a single operator's capacity.
  - anchor: "trading cards is actually a great example" · t=1339 · [▶ 22:19](https://www.youtube.com/watch?v=KtmaWUVdnx4&t=1339)

_Provenance archive — generated, never hand-edited. Theme pages are the curated view._
