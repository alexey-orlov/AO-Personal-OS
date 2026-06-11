# How I AI — Conductor CEO Charlie Holtz Walks Us Through His AI Coding Setup

_source: youtube · channel: How I AI · published: 2026-06-05_
_video: https://www.youtube.com/watch?v=fQmlML9Lay4_
_guests: Charlie Holtz (Conductor)_
_captured: 2026-06-11 (Path A) · digest run 20260605T0401_

## Summary
Charlie Holtz demos how Conductor blends agent-driven coding with human oversight, describing the team's opinionated UI, workflows, and infra choices that make AI-assisted development practical. His throughline: treat code as malleable output produced by prompts, enforce human boundaries and PR workflows to prevent AI-produced rot, and spend on model context and local inference to make the system responsive.

## Insights extracted (5)

- `pi-fQmlML9Lay4-01` — **Prompts, not code, are becoming the primary product** → theme [AI agents & applications](../../themes/ai-agents-and-applications.md)
  - detail: Holtz argues that generated code is increasingly a disposable byproduct — "sawdust" — of specifying intent to models, because you can rerun prompts on newer models to get different implementations. He points to features like a "submit a prompt" experiment and compares malleable software to video-game modding: the skeleton stays the same while users customize behavior. This reframes developer work: invest more in prompt design and high-level contracts than in treating code as the single source of long-term truth.
  - anchor: "—" · t=897 · [▶ 14:57](https://www.youtube.com/watch?v=fQmlML9Lay4&t=897)

- `pi-fQmlML9Lay4-02` — **Never allow AI to be your software architect** → theme [AI agents & applications](../../themes/ai-agents-and-applications.md)
  - detail: Conductor deliberately keeps architectural and UX decisions human-driven: the team designed concepts like workspaces, sidebars, and the "open in" behavior through human choice rather than leaving them to the models. They maintain 'slot-free zones' and human-only files (e.g., lines marked "do not touch if you are an AI") so core APIs and contracts remain human-written and reviewed. That boundary prevents vicious cycles where AI trained on bad generated code would produce progressively worse results.
  - anchor: "—" · t=427 · [▶ 7:07](https://www.youtube.com/watch?v=fQmlML9Lay4&t=427)

- `pi-fQmlML9Lay4-03` — **Conductor enforces a strict PR-first workflow; no direct edits** → theme [AI agents & applications](../../themes/ai-agents-and-applications.md)
  - detail: The product prevents direct file edits: work is done in a workspace/work-tree that must create a PR and be merged, with a left-side status panel showing in progress → review → done. Holtz describes UI affordances (archive, merge, checks tab) that integrate PR checks and make agent output subject to standard code-review gates. This enforces human oversight and keeps agent changes auditable and reversible.
  - anchor: "—" · t=548 · [▶ 9:08](https://www.youtube.com/watch?v=fQmlML9Lay4&t=548)

- `pi-fQmlML9Lay4-04` — **They run local models and beefy hardware for responsiveness** → theme [AI agents & applications](../../themes/ai-agents-and-applications.md)
  - detail: Holtz runs local inference for things like text-to-speech (Parakeet) on a 128 GB RAM machine to get low-latency, private interactions, and has a low-spec MacBook Neo to test constrained environments. Local models and powerful desktop hardware let features like speaking edits, fast-mode token-maxing, and persistent agents feel responsive and practical. Choosing where models run (local vs cloud) shapes the UX and the kinds of agents you can safely operate.
  - anchor: "—" · t=272 · [▶ 4:32](https://www.youtube.com/watch?v=fQmlML9Lay4&t=272)

- `pi-fQmlML9Lay4-05` — **Token-maxing is deliberate; they spend heavily for quality** → theme [AI agents & applications](../../themes/ai-agents-and-applications.md)
  - detail: Holtz says he once spent $22,000 on tokens in a month (July 2025) while launching Conductor, arguing for 'fast mode' and maximizing context to get higher-quality outputs. At the same time, the team intentionally tries to keep lines of code minimal to avoid codebase bloat, preferring expensive, high-effort model runs over churning out more LOC. That reflects a trade-off: pay for model context and iteration, but constrain generated code surface area with reviews and boundaries.
  - anchor: "—" · t=733 · [▶ 12:13](https://www.youtube.com/watch?v=fQmlML9Lay4&t=733)

_Provenance archive — generated, never hand-edited. Theme pages are the curated view._
