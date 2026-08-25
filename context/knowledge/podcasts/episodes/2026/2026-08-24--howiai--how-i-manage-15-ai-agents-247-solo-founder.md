# How I AI — How I manage 15 AI agents 24/7 as a solo founder | Ryan Carson

_source: youtube · channel: How I AI · published: 2026-08-24_
_video: https://www.youtube.com/watch?v=zPfxlcVpFgs_
_guests: Ryan Carson (Untangle)_
_captured: 2026-08-25 (Path A) · digest run 20260825T0402_

## Summary
Solo-founder Ryan Carson explains how he runs his startup largely by orchestrating cloud AI agents instead of doing everything manually. The conversation argues that modern founders must become skilled 'agent managers' — structuring priorities, playbooks, and safety checks — while still doing traditional customer discovery. Carson shares concrete tooling, workflows, hiring tactics, and trade-offs between cloud agents and local/interactive assistants.

## Insights extracted (5)

- `pi-zPfxlcVpFgs-01` — **Managing fleets of AI agents is now a core founder skill** → theme [Agent delegation, loops & software factories](../../themes/agent-delegation-and-loops.md)
  - detail: Ryan treats agent management like running a team: he runs 10–15 concurrent agent threads, buckets them into P0/P1 folders, and keeps weekly priorities on a paper note to avoid drowning in context switching. He argues this is the new managerial skill set — deciding where to micromanage, where to delegate, and how to prioritize — because agents scale differently than human hires. That operational discipline is what lets a solo founder keep product momentum while agents run much of the work.
  - anchor: "the skill is managing throngs of agents." · t=672 · [▶ 11:12](https://www.youtube.com/watch?v=zPfxlcVpFgs&t=672)

- `pi-zPfxlcVpFgs-02` — **Cloud agents can become your primary development environment** → theme [Agent harness engineering](../../themes/agent-harness-engineering.md)
  - detail: Carson moved almost entirely into a cloud coding agent platform (Devon/Cognition), saying "I live in Devon. I live in the cloud," and ran up to $20k/month in usage until vendor credits arrived. He uses cloud threads, playbooks, and background agents to ship many PRs, run reviews, and record verification videos — effectively treating the cloud agent as his always-on engineering team. The payoff is asynchronous, 24/7 progress and orchestration across code, QA, and ops, at the cost of nontrivial cloud spend and vendor lock-in.
  - anchor: "I live in Devon. I live in the cloud, right?" · t=617 · [▶ 10:17](https://www.youtube.com/watch?v=zPfxlcVpFgs&t=617)

- `pi-zPfxlcVpFgs-03` — **Coding agents should handle business ops, not just code** → theme [Agent delegation, loops & software factories](../../themes/agent-delegation-and-loops.md)
  - detail: Rather than limiting agents to writing code, Carson uses them for Deal Desk, quoting, customer triage, and customer-success monitoring: "Devon runs Deal Desk for me." He built a 'Watchdog' playbook that scans customer accounts, surfaces top-three issues, checks Sentry errors and open PRs, and reports whether problems are fixed — turning raw telemetry into prioritized action items. Using agents this way reduces human triage overhead and turns background agents into cross-functional operators for scale.
  - anchor: "Devon runs Deal Desk for me." · t=1387 · [▶ 23:07](https://www.youtube.com/watch?v=zPfxlcVpFgs&t=1387)

- `pi-zPfxlcVpFgs-04` — **Automated PR risk scoring lets you safely auto-merge low-risk changes** → theme [Agent harness engineering](../../themes/agent-harness-engineering.md)
  - detail: Carson and the host use an agent (Merge Mommy) that triggers after CI and scores each PR on multiple risk dimensions, auto-approving low-risk PRs while flagging medium/high ones for human review. The guest also runs a 'land PR' playbook that executes two review loops, records a narrated verification video, and requires a 'video approved' action before merging. This setup preserves compliance and safety while dramatically increasing merge throughput for routine changes.
  - anchor: "Whenever a PR is opened and then passes all its CI checks" · t=1647 · [▶ 27:27](https://www.youtube.com/watch?v=zPfxlcVpFgs&t=1647)

- `pi-zPfxlcVpFgs-05` — **Hire by watching candidates manage agents — require a recorded build** → theme [Hiring & recruiting craft](../../themes/hiring-and-recruiting-craft.md)
  - detail: Instead of early-stage interviews, Carson asks applicants to submit a full-screen recording of themselves building a feature — letting him evaluate how they use agents and manage workflows without an initial meeting. He then advances promising hires to a paid task inside Devon so he can watch real agent-managed work and review the replay. The method prioritizes practical agent-management skill over resumes or in-person chemistry and mirrors how the company will actually operate.
  - anchor: "all I want you to do is record a video full screen" · t=2436 · [▶ 40:36](https://www.youtube.com/watch?v=zPfxlcVpFgs&t=2436)

_Provenance archive — generated, never hand-edited. Theme pages are the curated view._
