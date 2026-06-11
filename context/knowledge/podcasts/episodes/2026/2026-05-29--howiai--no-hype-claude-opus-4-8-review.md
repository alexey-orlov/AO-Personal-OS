# How I AI — No hype Claude Opus 4.8 review—my real experience

_source: youtube · channel: How I AI · published: 2026-05-29_
_video: https://www.youtube.com/watch?v=h0gZf1hL4D4_
_guests: —_
_captured: 2026-06-11 (Path A) · digest run 20260529T0855_

## Summary
The reviewer tests Anthropic's Claude Opus 4.8 across coding and business workflows and contrasts it with Opus 4.7. He finds Opus 4.8 fast, pleasant, and strong for one-shot prototypes, but repeatedly failing on the final 10% of work: edge-case bugs, integration issues with existing codebases, and unsupported hallucinations. Recommendation: good for greenfield prototypes and ergonomics/scale features, but stick with 4.7 or heavy validation for strategy and mission-critical code.

## Insights extracted (5)

- `pi-h0gZf1hL4D4-01` — **Excels one-shot but fails the last 10% consistently** → theme [AI agents & applications](../../themes/ai-agents-and-applications.md)
  - detail: When asked to plan and autonomously code a feature, Opus 4.8 could take a spec, write code for about twenty minutes, and ship a working preview — a true one-shot success. However, when the reviewer pushed the feature live and iterated (bug-hunting, refinements, follow-ups) the model repeatedly struggled on the final ~10% of work, introducing bugs and failing to finish details. That pattern matters because real engineering is heavy on iteration and edge-case fixes, not just initial scaffolding.
  - anchor: "—" · t=171 · [▶ 2:51](https://www.youtube.com/watch?v=h0gZf1hL4D4&t=171)

- `pi-h0gZf1hL4D4-02` — **Hallucinates and invents facts during follow-ups** → theme [AI agents & applications](../../themes/ai-agents-and-applications.md)
  - detail: During debugging and business-analysis follow-ups the reviewer observed Opus 4.8 fabricate statements and assert hypotheses as facts instead of grounding them in data. He reports the model "100% made up things based on hypothesis not data," even on high-effort tasks, which is unusual compared with other models he's used. That behavior undermines trusting the model for verification tasks or any work that requires accurate evidence-checking.
  - anchor: "—" · t=220 · [▶ 3:40](https://www.youtube.com/watch?v=h0gZf1hL4D4&t=220)

- `pi-h0gZf1hL4D4-03` — **Fails to integrate into existing codebases; edges produce bugs** → theme [AI agents & applications](../../themes/ai-agents-and-applications.md)
  - detail: When pointed at live repos and asked to rebase and reconcile branches after a large PR, Opus 4.8 repeatedly introduced edge-case bugs and required cycle-after-cycle of fixes. The reviewer says it struggled to 'understand the elevation at which it should be operating' — i.e., where to safely modify code versus where to leave invariants alone. In practice this means the model is risky on maintenance tasks and real engineering pipelines without heavy human oversight.
  - anchor: "—" · t=265 · [▶ 4:25](https://www.youtube.com/watch?v=h0gZf1hL4D4&t=265)

- `pi-h0gZf1hL4D4-04` — **Overconfident, narrow vision: latches on to tiny data points** → theme [AI agents & applications](../../themes/ai-agents-and-applications.md)
  - detail: Compared to Opus 4.7, which the reviewer describes as numbers-anchored and context-aware, Opus 4.8 over-weights small signals and draws strong conclusions from them. The model sometimes claimed it hadn't searched GitHub or validated a bug, yet still asserted confident recommendations — a pattern the reviewer attributes to the model being 'overtuned' and having a narrow operational focus. That trade-off appears to favor speed and brevity at the cost of broader contextualization and accuracy.
  - anchor: "—" · t=623 · [▶ 10:23](https://www.youtube.com/watch?v=h0gZf1hL4D4&t=623)

- `pi-h0gZf1hL4D4-05` — **Ergonomics are strong: voice, speed, tooling, and new features** → theme [AI agents & applications](../../themes/ai-agents-and-applications.md)
  - detail: The reviewer praises Opus 4.8 for a pleasant, concise voice ("not an annoying girlfriend"), token efficiency, fast responses in fast mode, and good tool use. He also highlights new platform features: cloud code now supports dynamic workflows (hundreds of parallel subagents) and cloud.ai/co-work expose effort-control settings from low to max. These strengths make the model attractive for rapid prototyping and experiments, provided outputs are validated for accuracy.
  - anchor: "—" · t=574 · [▶ 9:34](https://www.youtube.com/watch?v=h0gZf1hL4D4&t=574)

_Provenance archive — generated, never hand-edited. Theme pages are the curated view._
