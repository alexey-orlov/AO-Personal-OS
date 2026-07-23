# SaaStr AI — Copy of SaaStr AI Day: The New Agentic Support Playbook

_source: youtube · channel: SaaStr AI · published: 2026-07-22_
_video: https://www.youtube.com/watch?v=pLiXv3_wvCw_
_guests: Adith (Pylon)_
_captured: 2026-07-23 (Path A) · digest run 20260723T0405_

## Summary
The talk argues that the fastest route to better customer support is 'agentic' workflows: humans orchestrating AI agents rather than trying to fully replace humans. Pylon's product runs background agents that precompute context, perform investigations across logs/docs/code, and expose skills so support reps stay in the driver's seat, work faster, and scale without big headcount increases. The presenters give concrete examples and customer results (fewer escalations, much faster first responses) to show why augmentation beats pure automation for complex B2B support. They also explain how ongoing human–agent interactions train the agents and raise the team's baseline capability over time.

**Note:** this video is a duplicate capture of the same underlying talk as `2026-07-22--saastr--saastr-ai-day-the-new-agentic-support-playbook.md` (different videoId, title literally "Copy of..."). Its insights were folded as corroboration (second attribution lines) on the matching insight blocks in that episode's theme pages rather than as new blocks — see cross-references below.

## Insights extracted (4)

- `pi-pLiXv3_wvCw-01` — **Human-plus-AI augmentation outcompetes full automation for support** → corroborates `pi-zRxRZ-YTPCc-01` in theme [AI agents & applications](../../themes/ai-agents-and-applications.md)
  - detail: Rather than aiming to fully replace support staff, Pylon positions AI as an augmentation layer where humans orchestrate agents to do the heavy lifting. The presenters note many successful startups in coding and enterprise workflows use human+AI models (e.g., Cursor, Harvey) and contrast that with fully autonomous support bots that only resolve the easiest tickets and leave the hard, high-effort work to humans. This matters because ticket deflection percentages can be misleading: one 5,000-person company saw a bot deflect ~50% of tickets but no headcount reduction, proving augmentation is the faster route to practical impact.
  - anchor: "moving to a new agentic way of working" · t=180 · [▶ 3:00](https://www.youtube.com/watch?v=pLiXv3_wvCw&t=180)

- `pi-pLiXv3_wvCw-02` — **Background agents precompute investigations and context for each ticket** → corroborates `pi-zRxRZ-YTPCc-02` in theme [Agent engineering & production infra](../../themes/agent-engineering-patterns.md)
  - detail: Pylon's background agents automatically gather and synthesize data—past tickets, logs, code, account context, call notes and docs—so that when an agent opens a ticket it's already been investigated. That precomputation produces suggested next steps, relevant past issues, and packaged context (contact, sentiment, repro steps) which a human can accept, refine, or action via one-click skills. The effect is dramatically reduced manual lookup time and fewer escalations to engineering because the rep can act on a rich, ready-made investigation.
  - anchor: "our background agent doing all of that automatically" · t=833 · [▶ 13:53](https://www.youtube.com/watch?v=pLiXv3_wvCw&t=833)

- `pi-pLiXv3_wvCw-03` — **Agentic workflows enable scaling without increasing headcount** → corroborates `pi-zRxRZ-YTPCc-03` in theme [AI agents & applications](../../themes/ai-agents-and-applications.md)
  - detail: By shifting investigators' work into precomputed agent investigations and reusable skills, teams can support more customers without hiring proportionally more staff. Pylon cites customer outcomes like 70% fewer escalations and 64.5% faster time-to-first-response after adopting agentic workflows, and explains why simple ticket-deflection rates understate real workload: the remaining human-resolved tickets consume most effort unless you augment that human work. This lets companies 'scale with the same team you have' while improving response quality and speed.
  - anchor: "scale with the same team you have" · t=595 · [▶ 9:55](https://www.youtube.com/watch?v=pLiXv3_wvCw&t=595)

- `pi-pLiXv3_wvCw-04` — **Interacting with agents trains them, so investigations improve automatically** → corroborates `pi-zRxRZ-YTPCc-05` in theme [Agent engineering & production infra](../../themes/agent-engineering-patterns.md)
  - detail: Each time a support rep queries an agent, asks follow-ups, or runs a skill, the agent learns the team's standard checks and where to look (logs, Slack channels, code locations), encoding that expertise into future investigations. Over time this raises the floor: complex troubleshooting procedures that only one expert once knew become codified as skills anyone can invoke, improving onboarding and reducing single-person bottlenecks. The presenters describe this feedback loop as a key mechanism for continuous quality gains in support workflows.
  - anchor: "improves the quality of its investigation" · t=919 · [▶ 15:19](https://www.youtube.com/watch?v=pLiXv3_wvCw&t=919)

_Provenance archive — generated, never hand-edited. Theme pages are the curated view._
