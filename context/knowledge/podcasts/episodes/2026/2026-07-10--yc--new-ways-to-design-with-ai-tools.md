# Y Combinator — New Ways To Design With AI Tools

_source: youtube · channel: Y Combinator · published: 2026-07-10_
_video: https://www.youtube.com/watch?v=VbqaL_eHhKY_
_guests: Ev_
_captured: 2026-07-11 (Path A) · digest run 20260711T0403_

## Summary
The conversation shows how designers are using AI agents to change workflows: recording project conversations, feeding that context to models, and one-shoting many design iterations to discover surprising, usable ideas. The central argument is that treating transcripts and markdown 'souls' as source-of-truth plus lightweight, disposable tooling (agents, shaders, pinboards) lets designers move faster, get more original results, and even let users drive product changes via agent-backed feature requests.

## Insights extracted (4)

- `pi-VbqaL_eHhKY-01` — **Treat meeting transcripts as a project's single source of truth** → theme [Agent delegation, loops & software factories](../../themes/agent-delegation-and-loops.md)
  - detail: Record every meeting and dump all transcripts into a single soul.md (or a small hierarchy of MD files) so an agent can access exhaustive context: manifesto, meeting notes, article titles, and visual references. The guest shows this feeding process produced richer, more targeted outputs because the agent can surface details you forgot—like a party date or a barcode idea—and it becomes trivial to reuse the same context across design, copy, and engineering decisions. This matters because agents only outperform human iteration when they have deep, organized context to reason over, turning scattered notes into reusable knowledge.
  - anchor: "I dumped the transcripts into a soul.md file" · t=852 · [▶ 14:12](https://www.youtube.com/watch?v=VbqaL_eHhKY&t=852)

- `pi-VbqaL_eHhKY-02` — **One-shot many AI-generated website iterations to discover original designs** → theme [Product discovery & strategy](../../themes/product-discovery-and-strategy.md)
  - detail: Instead of crafting dozens of manual mocks, the team fed a moodboard plus project content to an agent and asked for many complete website variants (they ran 16 iterations as a test). They bookmarked/pinned favorable results, mixed pieces across iterations, and found agent surprises—interactive maps, embedded party dates, unique hover effects—that wouldn't have emerged from a single human designer. The payoff is speed and serendipity: you explore a broader design space fast and salvage unexpected, high-value ideas rather than rely on generic, single-shot outputs.
  - anchor: "I asked it to do that 16 different times." · t=1038 · [▶ 17:18](https://www.youtube.com/watch?v=VbqaL_eHhKY&t=1038)

- `pi-VbqaL_eHhKY-03` — **Make separate 'human' and 'machine' versions of sites for agents** → theme [AI agents & applications](../../themes/ai-agents-and-applications.md)
  - detail: Design a human-facing site and a distilled machine-readable markdown version so agents can ingest only the exact content they need; Paxel includes a markdown copy and a copy-to-clipboard affordance so an agent or developer can drop the page into an LLM environment. Agents don't need visuals but they need precise, sanitized text (and warnings like 'do not run commands'), so this split both improves agent reliability and accelerates agent-driven workflows such as automated QA, summarization, or generation. It reframes design as a dual exercise—visual craft for people and semantic clarity for models.
  - anchor: "version of the website that is for humans" · t=432 · [▶ 7:12](https://www.youtube.com/watch?v=VbqaL_eHhKY&t=432)

- `pi-VbqaL_eHhKY-04` — **Let users submit prompts that spawn agents which open PRs** → theme [Agent delegation, loops & software factories](../../themes/agent-delegation-and-loops.md)
  - detail: The site includes a feature-request form that fires an agent on submission; that agent creates a pull request automatically and the team then decides whether to merge it. The UI even labels the button 'send to an agent'—the backend literally turns the user's prompt into actionable code changes—so end users can propose features or bug fixes without knowing Git. This pattern can democratize product evolution and make software highly personal and extensible while preserving human review as the final gate.
  - anchor: "the CTA in the in the button say send to an agent" · t=560 · [▶ 9:20](https://www.youtube.com/watch?v=VbqaL_eHhKY&t=560)

_Provenance archive — generated, never hand-edited. Theme pages are the curated view._
