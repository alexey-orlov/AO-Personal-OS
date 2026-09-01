# How I AI — I built a Claude Cowork system that does a week of PM work in a day

_source: youtube · channel: How I AI · published: 2026-08-31_
_video: https://www.youtube.com/watch?v=p2qmX6TM0kw_
_guests: Daniel Bloom (Mio)_
_captured: 2026-09-01 (Path A) · digest run 20260901T0401_

## Summary
Daniel Bloom demonstrates a personal AI workflow built on Claude + Co‑work that automates the repetitive coordination work of product management so he can do in one day what used to take him a week. The system centralizes context (Notion), ingests Slack/calendar/meeting transcripts, runs recurring automations (weekly prep, morning brief), and continuously self‑improves by turning repeated patterns into new skills and fixes. He also describes how he scaled the setup across his company using a guided "workstation" onboarding skill.

## Insights extracted (4)

- `pi-p2qmX6TM0kw-01` — **A well‑integrated agent can compress a week's PM overhead into a day** → theme [AI & the PM craft](../../themes/ai-and-the-pm-craft.md)
  - detail: Bloom reports that after centralizing context and automating recurring flows with Claude + Co‑work he can complete in a single day what previously took him a full week. The system pulls from Notion, Slack, calendar, meeting transcripts and runs weekly and daily automations that surface priorities and action items, so the coordination work that used to fragment his time is handled by the agent. That frees him for deeper work (customer interviews, research) and is the crux of the productivity claim.
  - anchor: "I'm really able to do in a day now" · t=1376 · [▶ 22:56](https://www.youtube.com/watch?v=p2qmX6TM0kw&t=1376)

- `pi-p2qmX6TM0kw-02` — **Two technical rules make an agent genuinely useful: self‑rewrite and deep integrations** → theme [Agent harness engineering](../../themes/agent-harness-engineering.md)
  - detail: Bloom argues a personal agent must (A) be able to rewrite its own core files so it continuously improves, and (B) connect deeply to your ecosystem (Notion, Slack, calendar, Chrome, transcripts). He showed this by having Claude save unknown terms into context, update knowledge files on a schedule, and use connectors to read meeting transcripts and Slack so decisions reflect current reality. Without both abilities the agent drifts from how you actually work and loses its value.
  - anchor: "rewrite its own uh, core files and that means" · t=361 · [▶ 6:01](https://www.youtube.com/watch?v=p2qmX6TM0kw&t=361)

- `pi-p2qmX6TM0kw-03` — **Daily 'morning brief' and weekly prep bridge roadmap and real‑time chaos** → theme [Agent delegation, loops & software factories](../../themes/agent-delegation-and-loops.md)
  - detail: Bloom's weekly prep automation aggregates data from Notion, calendar, Slack and Granola transcripts to recommend weekly priorities and populate his Notion board, while the morning brief scans recent meetings and messages to surface one‑line summaries and explicit action items. He uses Granola transcripts to produce concise meeting summaries and flag tasks that require follow‑up, and Notion becomes mostly read‑only as Claude manages updates. This design closes the gap between tidy plans and the messy flow of Slack/meetings so nothing important falls through the cracks.
  - anchor: "it takes the granola transcripts uh and it gives me a oneliner" · t=1923 · [▶ 32:03](https://www.youtube.com/watch?v=p2qmX6TM0kw&t=1923)

- `pi-p2qmX6TM0kw-04` — **Automated self‑improvement loops convert repeated behavior into durable skills** → theme [Agent delegation, loops & software factories](../../themes/agent-delegation-and-loops.md)
  - detail: Bloom built a scheduled 'self‑improvement' task that runs weekly to learn from his interactions: it detects drafts he rewrote to learn his editing preferences, proposes turning recurring actions into new skills, surfaces friction telemetry from skills, and audits external tips before adopting them. Example: the system finds draft messages he rewrote and ingests the final form so Claude adapts its future drafts; another skill, 'improve', critically evaluates hype articles before implementing suggestions. These loops dramatically reduce ongoing maintenance and let the agent compound improvements with little manual work.
  - anchor: "called the self-improvement uh loop. It's a scheduled test task" · t=1666 · [▶ 27:46](https://www.youtube.com/watch?v=p2qmX6TM0kw&t=1666)

_Provenance archive — generated, never hand-edited. Theme pages are the curated view._
