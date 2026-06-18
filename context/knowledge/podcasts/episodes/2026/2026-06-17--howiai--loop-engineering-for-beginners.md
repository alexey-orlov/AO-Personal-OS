# How I AI — Loop engineering for beginners

_source: youtube · channel: How I AI · published: 2026-06-17_
_video: https://www.youtube.com/watch?v=JoXbk2fm7jM_
_guests: —_
_captured: 2026-06-18 (Path A) · digest run 20260618T0403_

## Summary
The video explains what an AI "loop" is, how it differs from manual chat prompting, and how to design simple, reliable automated agents that run on schedules or goals. The host demonstrates loop types and concrete examples in Claude Code and Codex (scheduled routines, automations, goal-based loops and sub-agents), lists the engineering building blocks you need, and warns about costs and brittle prompts.

## Insights extracted (5)

- `pi-JoXbk2fm7jM-01` — **A loop is an autonomous, scheduled automation an agent runs itself** → theme [Agent engineering & production infra](../../themes/agent-engineering-patterns.md)
  - detail: A loop is not a human typing messages; it's an autonomous or semi-autonomous automation that kicks off an agent on a schedule or until a measurable outcome is reached. The host defines a loop as something that can prompt itself, run repeatedly (heartbeat/cron/hooks), and either stop when time is up or when the job's success criteria are met. Understanding this distinction reframes loops as low-touch 'employees' you design and onboard with explicit jobs and exit conditions.
  - anchor: "a loop is a scheduled or kind of semi-autonomous automation" · t=350 · [▶ 5:50](https://www.youtube.com/watch?v=JoXbk2fm7jM&t=350)

- `pi-JoXbk2fm7jM-02` — **You trigger loops three practical ways: heartbeats, crons, and hooks** → theme [Agent engineering & production infra](../../themes/agent-engineering-patterns.md)
  - detail: Common trigger patterns are heartbeats (regular intervals), crons (fixed schedule times), and hooks (internal lifecycle events or external webhooks). The host gives the heartbeat example: "Every 5 minutes, check if I have a new Jira ticket, and if so, start a coding agent to triage and fix that Jira," showing how existing automation idioms map directly to prompting agents. Choosing the right trigger matters because it determines latency, cost, and how much data the loop can gather before acting.
  - anchor: "Every 5 minutes, check if I have a new Jira ticket," · t=238 · [▶ 3:58](https://www.youtube.com/watch?v=JoXbk2fm7jM&t=238)

- `pi-JoXbk2fm7jM-03` — **Goal loops run until a measurable outcome is validated** → theme [Agent engineering & production infra](../../themes/agent-engineering-patterns.md)
  - detail: A goal loop sets a concrete outcome and keeps an agent working (and spending compute) until that outcome can be validated or the agent is blocked. The video contrasts simple scheduled routines (e.g., morning briefings) with goal-based loops such as babysitting PRs until all merge checks pass, which Claude Code and Codex now support as first-class features. Goal loops are powerful because they turn open-ended work into verifiable tasks, but they require precise success criteria to avoid wasted compute.
  - anchor: "A goal is a type of loop" · t=332 · [▶ 5:32](https://www.youtube.com/watch?v=JoXbk2fm7jM&t=332)

- `pi-JoXbk2fm7jM-04` — **Five engineering primitives make loops reliable and composable** → theme [Agent engineering & production infra](../../themes/agent-engineering-patterns.md)
  - detail: To keep loops clean and safe you need: work trees (isolate agent code and avoid cross-contamination), skills (reusable task patterns), plugins/connectors (GitHub, Slack, Google Docs, etc.), sub-agents (spawned threads for federated tasks and validation), and state tracking (a to-do list or tracker like Linear). The host shows these in action—e.g., Claude Code routines using GitHub and Slack connectors and Codex spawning sub-agents to validate new skills—demonstrating how these primitives prevent conflicts and enable scale.
  - anchor: "To write an effective loop, you need these five things." · t=381 · [▶ 6:21](https://www.youtube.com/watch?v=JoXbk2fm7jM&t=381)

- `pi-JoXbk2fm7jM-05` — **Loops can burn money and produce poor results without precise prompts** → theme [Agent engineering & production infra](../../themes/agent-engineering-patterns.md)
  - detail: Two main warnings: loops are easy to run continuously and can quickly consume tokens (cost), and goal-based loops in particular demand precise evaluation criteria and prompt engineering or they'll loop inefficiently. The speaker points to real examples (automations that spawn sub-agents and run validations) and recommends monitoring cost and writing strict success criteria—otherwise you get diligent agents that keep consuming compute for marginal returns.
  - anchor: "One, loops can get expensive." · t=1544 · [▶ 25:44](https://www.youtube.com/watch?v=JoXbk2fm7jM&t=1544)

_Provenance archive — generated, never hand-edited. Theme pages are the curated view._
