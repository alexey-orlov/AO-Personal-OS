# Lenny's Podcast — Where AI products go next: voice, agents, and self-driving software | Tara Sesha and Nan Yu (OpenAI)

_source: youtube · channel: Lenny's Podcast · published: 2026-09-29_
_video: https://www.youtube.com/watch?v=-ciSTkEVy30_
_guests: Tara Sesha (OpenAI), Nan Yu (OpenAI)_
_captured: 2026-09-30 (Path A) · digest run 20260930T0405_

## Summary
Two OpenAI product leaders discuss how to build practical AI products today and where interfaces will go next: voice, agentic assistants, and increasingly autonomous "self-driving" software. Their throughline is pragmatic constraint-driven design — optimize for what users can absorb, target model capabilities a few months ahead, and design systems that compose safely across platforms and third-party integrations.

## Insights extracted (5)

- `pi--ciSTkEVy30-01` — **Design products for where models will be in 2–3 months** → theme [AI agents & applications](../../themes/ai-agents-and-applications.md)
  - detail: Instead of anchoring on today's model abilities or on far-future fantasies, ship features that line up with predicted model capabilities two to three months out. The speakers use this horizon as a practical guardrail: it avoids building unusable, futuristic features while preventing teams from being left behind as the model frontier advances. This cadence keeps product investments valuable and reduces wasted work when foundations move quickly.
  - anchor: "aiming for 2 to 3 months" · t=283 · [▶ 4:43](https://www.youtube.com/watch?v=-ciSTkEVy30&t=283)
- `pi--ciSTkEVy30-02` — **Group agents; use a 'chief of staff' agent rather than dozens** → theme [AI agents & applications](../../themes/ai-agents-and-applications.md)
  - detail: Users can't realistically manage dozens of micro-agents, so the successful pattern is to bundle responsibilities and surface higher-level controllers — e.g., a "chief of staff" agent that orchestrates other specialized agents. The panelists point to human cognitive limits (and examples like people claiming to have 40 bots) to argue for hierarchical grouping, which simplifies permissions, memory segmentation, and the user's mental model. This reduces overhead and makes agent ecosystems usable rather than overwhelming.
  - anchor: "chief of staff agent that manages all the other" · t=556 · [▶ 9:16](https://www.youtube.com/watch?v=-ciSTkEVy30&t=556)
- `pi--ciSTkEVy30-03` — **Platforms must expose layered hooks plus a reliable 'last-mile' fallback** → theme [AI agents & applications](../../themes/ai-agents-and-applications.md)
  - detail: Build platforms in layers: native features, third‑party plugins/hooks, composable integrations, and a fallback mechanism (what they call 'computer use') that will always finish the job even when integrations fail. They warn that getting to 99% and failing at the last mile can be worse than not trying — users need end-to-end reliability or they'll abandon the flow. Designing for composability with a dependable fallback preserves brand quality while enabling ecosystem innovation.
  - anchor: "everything except for the last mile" · t=954 · [▶ 15:54](https://www.youtube.com/watch?v=-ciSTkEVy30&t=954)
- `pi--ciSTkEVy30-04` — **Product teams must be DM-accessible and write concrete evals for research** → theme [Eval design & agentic evaluation practice](../../themes/eval-design-and-practice.md)
  - detail: Close, direct user relationships are now essential because agent failures are subtle and require detailed follow-ups; being DM‑accessible surfaces the concrete examples researchers need. The speakers emphasize that product people should bring specific use cases, session logs, and ideally authored evals so research can turn user failures into training signals. Writing evaluations and reproducing user scenarios accelerates the post‑training loop that improves model behavior.
  - anchor: "writing evals as much as possible is like" · t=1127 · [▶ 18:47](https://www.youtube.com/watch?v=-ciSTkEVy30&t=1127)
- `pi--ciSTkEVy30-05` — **Voice and self-driving agentic experiences are the next major form factors** → theme [AI agents & applications](../../themes/ai-agents-and-applications.md)
  - detail: Both leaders predict that voice interfaces and 'self-driving' or autonomously acting products will rise strongly: voice because it maps to natural human interaction and reduces friction, and self-driving because agents that proactively fill empty-input or onboarding gaps create gentler on-ramps. They give practical examples — voice for onboarding non-technical users and self-driving agents that guide users through tasks — arguing these forms solve capability-overhang and adoption problems.
  - anchor: "I have an answer for you and it's voice" · t=1597 · [▶ 26:37](https://www.youtube.com/watch?v=-ciSTkEVy30&t=1597)

_Provenance archive — generated, never hand-edited. Theme pages are the curated view._
