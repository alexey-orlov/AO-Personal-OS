# SaaStr AI — How to Build Your Own AI VP of Marketing Step-by-Step

_source: youtube · channel: SaaStr AI · published: 2026-06-26_
_video: https://www.youtube.com/watch?v=pi_tqHweR70_
_guests: —_
_captured: 2026-06-27 (Path A) · digest run 20260627T0403_

## Summary
The speaker shows how SaaStr built an "AI VP of Marketing" (nicknamed 10K) by starting with a simple dashboard and iteratively adding capabilities until the agent could autonomously run campaigns and operational tasks. The walkthrough emphasizes writing a detailed spec, hooking up real data (Salesforce, analytics, CSVs), stair-stepping features one workflow at a time, and adding guardrails so the agent acts reliably.

## Insights extracted (4)

- `pi-pi_tqHweR70-01` — **Start as a dashboard and stair-step to autonomy** → theme [Agent engineering & production infra](../../themes/agent-engineering-patterns.md)
  - detail: SaaStr's 10K began purely as a dashboard fed by Salesforce and CSVs and, over about five months of iterative work, evolved into a semi-autonomous marketing co-pilot. The speaker argues you should build one workflow at a time (dashboards → triggered emails → newsletters → autonomous campaigns) because small wins validate the data connections and make it manageable to add complexity. This approach reduces risk and delivers usable features quickly: a basic agent can be launched in 15–20 minutes, while full autonomy takes months.
  - anchor: "10K started as a dashboard. Maybe you don't" · t=951 · [▶ 15:51](https://www.youtube.com/watch?v=pi_tqHweR70&t=951)

- `pi-pi_tqHweR70-02` — **Give your agent one clear metric or goal to optimize** → theme [AI & the PM craft](../../themes/ai-and-the-pm-craft.md)
  - detail: They recommend defining a single objective (10K's phrasing was to "own the number") so the agent's recommendations and actions are goal-directed rather than scattered. Practically, that means feeding it the right data up front—marketing-sourced revenue, pipeline via Salesforce API, campaign and email metrics—so its suggestions prioritize measurable outcomes like pipeline conversion or ticket revenue. Keeping agents narrowly focused also motivates using multiple agents for different functions (marketing, CS, events) rather than one overloaded system.
  - anchor: "make sure you give your agent one goal." · t=510 · [▶ 8:30](https://www.youtube.com/watch?v=pi_tqHweR70&t=510)

- `pi-pi_tqHweR70-03` — **Agents can autonomously handle recurring marketing operations** → theme [Growth, GTM & pricing](../../themes/growth-gtm-and-pricing.md)
  - detail: The agent performs mundane but time-consuming tasks—sending attendee newsletters, triggered site follow-ups, speaker Google Calendar invites, win-back campaigns and daily Slack summaries—freeing humans for strategy. Concrete examples: 10K sent attendee reminders that correlated with ticket spikes, and it generated hundreds of personalized speaker invites in ~20 minutes (a task that previously took a week). Building these operational automations first yields high ROI and immediate time savings.
  - anchor: "don't forget to send the attendee newsletter." · t=201 · [▶ 3:21](https://www.youtube.com/watch?v=pi_tqHweR70&t=201)

- `pi-pi_tqHweR70-04` — **Human-in-the-loop guardrails are essential to prevent mistakes** → theme [Agent engineering & production infra](../../themes/agent-engineering-patterns.md)
  - detail: The team enforces two layers: things the agent may do autonomously (data pulls, idea generation) and actions that require approval (mass emails). Guardrails matter because the agent can hallucinate or fabricate outputs—one example the speaker gives is the agent initially inventing counts and then being corrected after querying the real data. The recommendation is to test sends, require permission for risky actions, and treat guardrails as more important than tweak-heavy prompt engineering.
  - anchor: "guardrails is, you know, better than prompt engineering" · t=1854 · [▶ 30:54](https://www.youtube.com/watch?v=pi_tqHweR70&t=1854)

_Provenance archive — generated, never hand-edited. Theme pages are the curated view._
