# Aakash Gupta — How to Build an AI-Native Product Team in 2026 | Charles Zedlewski | Product Growth

_source: youtube · channel: Aakash Gupta · published: 2026-09-14_
_video: https://www.youtube.com/watch?v=8TgxUPSuvNQ_
_guests: Charles Zedlewski (TogetherAI), Nicolina (Product Manager, Together), Pavit Alawalia (Product Manager, Together), Assan (Developer Experience, Together)_
_captured: 2026-09-15 (Path A) · digest run 20260915T0403_

## Summary
Together AI walks through how they restructured product work around shared context, reusable skills, and agent-driven sandboxes so teams can automate repeatable tasks while keeping humans in the decision loop. The throughline: centralize the right context and skills, let harnesses and agents execute repeatable work (research → PRD → PR → PR review), and continuously evaluate agents to prevent hallucinations and stale docs.

## Insights extracted (5)

- `pi-8TgxUPSuvNQ-01` — **A shared markdown repo turns AI context into reusable, team-wide skills** → theme [Agent engineering & production infra](../../themes/agent-engineering-patterns.md)
  - detail: Together built a centralized 'product repository' of markdown and YAML files that hold cross-team context (strategy, milestones, customer intelligence) and repeatable skills. That repo lets any PM or agent pull relevant strategy, past work, and research outputs—avoiding duplicated investigations and letting someone compose a high-quality sprint topline update in minutes rather than 10–30 minutes. The non-obvious point: centralizing human-written context (not code) is what lets multimodel harnesses produce consistent, reusable outputs across teams.
  - anchor: "and so that became this together product repository." · t=270 · [▶ 4:30](https://www.youtube.com/watch?v=8TgxUPSuvNQ&t=270)

- `pi-8TgxUPSuvNQ-02` — **Agent-driven goals can spawn sub-agents to produce production PRs** → theme [Agent engineering & production infra](../../themes/agent-engineering-patterns.md)
  - detail: PMs give a single 'goal' prompt like 'give me production ready PRs for a feature to resize' and the harness spawns multiple sub-agents (research, PRD, PR writer, validators) that interrogate tickets, repos, and prototypes to produce draft PRs and one-pagers. In practice this pipeline found 19 relevant support tickets in two months and surfaced prior partial work, so PMs avoid duplicating effort and get high‑fidelity PRs faster while maintaining human-in-the-loop decision points. The mechanism matters: agents do orchestration and drafting; humans keep final trade-off and scope judgments.
  - anchor: "give me production ready PRs for a feature to resize." · t=1051 · [▶ 17:31](https://www.youtube.com/watch?v=8TgxUPSuvNQ&t=1051)

- `pi-8TgxUPSuvNQ-03` — **Orchestrator gives leaders a lightweight, company-wide bird's-eye sandbox** → theme [Agent engineering & production infra](../../themes/agent-engineering-patterns.md)
  - detail: Orchestrator is an internal tool that points at every major repo, inherits local MCPs/skills, and can spin sandboxes to interrogate code or even generate small PRs—without cloning everyone's local environment. It supports multi-harness, multi-model routing and only requires a few weeks-to-a-month of engineering time to get a working version, so companies can offer a 'casual' explorer UI for non-specialists to answer targeted questions across teams. The practical payoff is fast cross-team visibility without forcing everyone to learn deep context.
  - anchor: "So we built this great internal tool which we call orchestrator." · t=2127 · [▶ 35:27](https://www.youtube.com/watch?v=8TgxUPSuvNQ&t=2127)

- `pi-8TgxUPSuvNQ-04` — **Continuous trace→evaluate→fix loops stop agents from shipping blindly** → theme [Eval design & agentic evaluation practice](../../themes/eval-design-and-practice.md) (merged into `pi-tTTG1Nn-kkw-03`)
  - detail: Together emphasizes instrumenting agents (traces of tool calls and decisions), running evals in sandboxes, and fixing failures discovered by automated tests or eval platforms (they demo both an in-house agent-evals tool and Arise). Example evidence: an eval revealed an agent hallucinating React instead of Python; after guided fixes an eval metric dropped from ~12% failures to under 2%—showing fast, measurable improvement. The non-obvious takeaway: without tracing and evals you ship blind; with them you get targeted doc and product fixes driven by agent behavior.
  - anchor: "Trace what's happening, evaluate where it fails, then fix it." · t=860 · [▶ 14:20](https://www.youtube.com/watch?v=8TgxUPSuvNQ&t=860)

- `pi-8TgxUPSuvNQ-05` — **AI increases throughput but not magical, 3x velocity gains** → theme [Agent engineering & production infra](../../themes/agent-engineering-patterns.md)
  - detail: Together reports meaningful but measured productivity improvements (more than single‑digit percentages), and is skeptical of headline '3x' velocity claims. They avoided runaway token costs by running their own open-weight models and designing for collective team productivity (shared skills and evaluation), not just individual output. The pragmatic point: expect real savings in repeated tasks and faster discovery, but plan architecture and cost controls—owning models and sharing context are key levers.
  - anchor: "I find claims of 3x to be very suspicious." · t=3369 · [▶ 56:09](https://www.youtube.com/watch?v=8TgxUPSuvNQ&t=3369)

_Provenance archive — generated, never hand-edited. Theme pages are the curated view._
