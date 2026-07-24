# Every — Compound Engineering Now Works Better in a Multi-Model World

_source: youtube · channel: Every · published: 2026-07-22_
_video: https://www.youtube.com/watch?v=9exWJmbKeMo_
_guests: Trevan, Kieran_
_captured: 2026-07-24 (Path A) · digest run 20260724T0404_

## Summary
The video walks through a major release of the Compound Engineering repo and its new skills designed for agent-driven software and knowledge work. Central argument: to get reliable, repeatable AI-driven work you should compound knowledge into your repository and orchestrate multiple models (multi-harness) so humans do the high-level thinking and the system records learnings, adjudicates disagreements, and automates implementation and maintenance tasks. The hosts demo new skills—an Oracle/POV multimodel adjudicator, a teach/explain skill that grounds explanations in the repo, planner/implementer multi-model flows, and an automated PR babysitter—and explain tradeoffs like token-per-outcome optimization.

## Insights extracted (4)

- `pi-9exWJmbKeMo-01` — **Compound knowledge by writing AI-generated artifacts into the repo** → theme [Agent delegation, loops & software factories](../../themes/agent-delegation-and-loops.md)
  - detail: The team's core philosophy is to save AI outputs (plans, explanations, decision docs) into the project repository so future agents and humans can build on them rather than re-deriving the same knowledge. They call this compounding knowledge: agents extract learnings from runs, commit them, and a refresh skill prunes, updates, or removes stale docs—so subsequent runs are faster, more grounded, and more token-efficient. That shifts effort toward higher‑level thinking (the human-in-the-loop start/end or "AI sandwich") and reduces repeated search/grounding costs over time.
  - anchor: "by generating these solutions or files within a system" · t=194 · [▶ 3:14](https://www.youtube.com/watch?v=9exWJmbKeMo&t=194)
- `pi-9exWJmbKeMo-02` — **A multimodel Oracle gives a grounded, less-biased point of view** → theme [Agent engineering & production infra](../../themes/agent-engineering-patterns.md)
  - detail: They built a POV/oracle skill that polls multiple models (examples given: Claude, Grock, Codeex) and returns a grounded consensus or an adjudicated disagreement with citations and verified facts. The orchestrating agent can then challenge the panel for up to three rounds, which the authors found sufficient to reach agreement, stalemate, or rejection; in practice Claude often admits it missed things other models found, changing the final recommendation. That matters because single-model answers carry model-specific blind spots; a multimodel panel surfaces missing evidence and corrects bias.
  - anchor: "it starts with a unbiased polling of the Oracle panel." · t=867 · [▶ 14:27](https://www.youtube.com/watch?v=9exWJmbKeMo&t=867)
- `pi-9exWJmbKeMo-03` — **Use different models for different steps: plan with one, implement with another** → theme [Agent engineering & production infra](../../themes/agent-engineering-patterns.md)
  - detail: The release enables multi-harness flows so you can choose the best model per stage (for example, brainstorming/planning with Fable and implementing with Codeex) and avoid running expensive models for every step. Skills like LFG will orchestrate planning in one harness, parallelize implementation in another, and babysit tests/PRs after merge; config.yaml lets teams set defaults per harness. This pragmatic mixing preserves token and credit budgets while letting teams exploit the strengths of particular models for reasoning vs. code generation.
  - anchor: "planning with fable and then implementing with codeex" · t=1962 · [▶ 32:42](https://www.youtube.com/watch?v=9exWJmbKeMo&t=1962)
- `pi-9exWJmbKeMo-04` — **PR babysitting automates review, CI fixes, rebasing, and merges** → theme [Agent delegation, loops & software factories](../../themes/agent-delegation-and-loops.md)
  - detail: The 'babysit PR' capability automatically monitors a created PR, resolves CI failures, rebases safely when main shifts, responds to code review feedback, and can run for a configurable window (they mention 8 hours as an example). It's invoked by the commit-push-PR flow or run standalone and is intended to remove the repetitive, fragile post-PR work agents typically produce. This reduces human maintenance overhead and is already described as one of the most-used skills because it quietly keeps agent work production-ready.
  - anchor: "it will babysit a PR after you open it" · t=3060 · [▶ 51:00](https://www.youtube.com/watch?v=9exWJmbKeMo&t=3060)

_Provenance archive — generated, never hand-edited. Theme pages are the curated view._
