# How I AI — The AI factory playbook for engineering teams

_source: youtube · channel: How I AI · published: 2026-09-21_
_video: https://www.youtube.com/watch?v=4_SHhSMHzNo_
_guests: Zack Lloyd (Warp)_
_captured: 2026-09-22 (Path A) · digest run 20260922T0402_

## Summary
The conversation explains what an "AI factory" is in practice: a cloud‑centralized, end‑to‑end workflow that turns public prompts into tracked product changes and continuous improvements. The central argument is that factories shift work out of local silos into observable, automatable pipelines (integrating Slack, issue trackers, Git, QA) so teams can measure throughput, cut cost via model/config choices, and let agents both execute and improve the system over time.

## Insights extracted (5)

- `pi-4_SHhSMHzNo-01` — **AI factories automate the full ticket-to-merge lifecycle in public** → theme [Agent delegation, loops & software factories](../../themes/agent-delegation-and-loops.md)
  - detail: Warp's example factory (named Wilson) takes a Slack prompt and does more than generate code: it triages the request, opens an issue in Linear, implements the change, creates a GitHub PR, runs QA (including a video of keystrokes), and merges. Because this all happens in a public channel, multiple people can observe or contribute and the artifact trail is preserved — shifting work from a local, siloed dev setup to a collaborative cloud pipeline.
  - anchor: "first it will triage whatever this is" · t=336 · [▶ 5:36](https://www.youtube.com/watch?v=4_SHhSMHzNo&t=336)

- `pi-4_SHhSMHzNo-02` — **Humans are the throughput bottleneck; measure interactions per PR** → theme [Agent delegation, loops & software factories](../../themes/agent-delegation-and-loops.md)
  - detail: Warp tracks an 'interactions per PR' metric that aggregates prompts, Slack reprompts, Linear comments and code-review corrections as a proxy for how much human steering a run needed. That matters because they see much faster agent execution (kickoff‑to‑PR ~35 minutes) but long human delays (PR to first human review ~3.5 hours), showing managers where to focus process or automation changes to increase throughput.
  - anchor: "humans are a little bit of the bottleneck in terms of production" · t=765 · [▶ 12:45](https://www.youtube.com/watch?v=4_SHhSMHzNo&t=765)

- `pi-4_SHhSMHzNo-03` — **Closed-loop scoring lets agents detect failures and self-improve factories** → theme [Eval design & agentic evaluation practice](../../themes/eval-design-and-practice.md)
  - detail: Every agent run in the factory is recorded and can be scored across dimensions using LLMs as judges (or humans/algorithms). By aggregating failed runs (e.g., redundant tests across many PRs), an observer agent can suggest specific changes to the factory code/configuration, and because the factory is defined in code, those updates can be tested and rolled out automatically — turning failure analysis into actionable factory improvements.
  - anchor: "every time an agent does a task in the factory" · t=1171 · [▶ 19:31](https://www.youtube.com/watch?v=4_SHhSMHzNo&t=1171)

- `pi-4_SHhSMHzNo-04` — **Model choice (not tools alone) is the largest cost lever** → theme [Agent harness engineering](../../themes/agent-harness-engineering.md)
  - detail: Adoption often raises per‑PR cost initially, but Warp found model selection is the main lever to reduce spend; context management is secondary. They recommend replaying past tasks under different model/configurations to measure quality vs cost tradeoffs and route workloads to the best model for that task mix, rather than assuming one model fits all.
  - anchor: "I think model is the biggest" · t=1091 · [▶ 18:11](https://www.youtube.com/watch?v=4_SHhSMHzNo&t=1091)

- `pi-4_SHhSMHzNo-05` — **Factories extend beyond engineering into design, sales, and outreach** → theme [Agent delegation, loops & software factories](../../themes/agent-delegation-and-loops.md)
  - detail: The same factory pattern applies to nontechnical workflows: Zach uses a coding agent plus Figma MCP to edit slide decks, an MCP over sales meeting transcripts to extract top customer questions, and Google CLI automations to re‑discover outreach leads. These examples show factories can centralize and automate routine CEO/GTM tasks as well as code work, letting product and go‑to‑market operations benefit from the same observability and replay capabilities.
  - anchor: "I do it through the Figma MCP" · t=1964 · [▶ 32:44](https://www.youtube.com/watch?v=4_SHhSMHzNo&t=1964)

_Provenance archive — generated, never hand-edited. Theme pages are the curated view._
