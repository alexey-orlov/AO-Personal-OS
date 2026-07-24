# SaaStr AI — SaaStr AI Day: Tiering our Entire Customer Base in Days, Not Weeks

_source: youtube · channel: SaaStr AI · published: 2026-07-22_
_video: https://www.youtube.com/watch?v=vJYXvblW4_g_
_guests: —_
_captured: 2026-07-24 (Path A) · digest run 20260724T0404_

## Summary
A Backstory product/account leader demonstrates how they automated a customer-tiering exercise by building repeatable signals, ingesting CRM and product usage data, and running the analysis through LLM tools to produce actionable account tiers in days instead of months. The throughline: identify the handful of hard signals that predict strategic value, automate their collection and scoring, iterate with human judgment, and use the output to reassign GTM resources and create prescriptive playbooks.

## Insights extracted (4)

- `pi-vJYXvblW4_g-01` — **You can tier hundreds of accounts in days using signals plus LLMs** → theme [AI agents & applications](../../themes/ai-agents-and-applications.md)
  - detail: They built signal extractors inside Backstory (mini-LLMs) to pull CRM fields, public data, and conversation timelines, then fed those outputs plus usage and Jira data into Claude to reconcile and score accounts. The full automated run over a sample list took about 20 minutes and the end-to-end project was built in roughly 3–4 days — versus a cross-functional, quarter-long effort previously. That speed enabled a timely redistribution of seller portfolios and creation of tier-specific playbooks.
  - anchor: "we created what we called the AI maturity level signal." · t=501 · [▶ 8:21](https://www.youtube.com/watch?v=vJYXvblW4_g&t=501)
- `pi-vJYXvblW4_g-02` — **Four weighted buckets drive meaningful, actionable tiers** → theme [Growth, GTM & pricing](../../themes/growth-gtm-and-pricing.md)
  - detail: After iteration they reduced many candidate signals down to four core buckets—growth potential, AI maturity/velocity, engagement/executive visibility, and current account health—and used those to produce A–D tiers. The model produced a Tier A set of eight accounts they believe can grow 10x in 2–3 years, a Tier B of ~21 accounts on a longer horizon, Tier C as a critical juncture, and Tier D as low-priority or potential churn. Using these buckets made the tier assignments prescriptive enough to realign quotas and exec sponsorship.
  - anchor: "the growth potential in the account" · t=1277 · [▶ 21:17](https://www.youtube.com/watch?v=vJYXvblW4_g&t=1277)
- `pi-vJYXvblW4_g-03` — **Human oversight and iteration are essential; signals can contradict** → theme [Agent engineering & production infra](../../themes/agent-engineering-patterns.md)
  - detail: The presenter emphasized multiple iterations (three to four) to get signal weighting right and kept a human-in-the-loop to validate outputs and adjust rules. They started with about eight signals but narrowed to four after discovering contradictions — for example, raw feature-request counts looked negative until reconciled with high adoption, which turned them into a positive AI-forward signal. This shows automated scoring without iterative human tuning can misclassify active, strategic customers.
  - anchor: "a human in the loop is always a a a very important" · t=795 · [▶ 13:15](https://www.youtube.com/watch?v=vJYXvblW4_g&t=795)
- `pi-vJYXvblW4_g-04` — **Rich, varied connectors (CRM, Slack, Amplitude, Jira) create stronger signals** → theme [Agent engineering & production infra](../../themes/agent-engineering-patterns.md)
  - detail: Rather than relying on siloed fields, they pulled utilization (Amplitude), feature requests (Jira), chronological engagement (Backstory chronicle), and internal Slack account channels into the signal builder to capture real customer behavior and intent. The chronicle — a timeline of emails, meetings, and Slack messages — was especially valuable for executive-visibility and recent-risk signals, letting the model explain why it assigned a maturity level or tier. That breadth reduced the need for cross-functional manual data collection.
  - anchor: "what backstory calls a chronicle which is a timeline of events" · t=559 · [▶ 9:19](https://www.youtube.com/watch?v=vJYXvblW4_g&t=559)

_Provenance archive — generated, never hand-edited. Theme pages are the curated view._
