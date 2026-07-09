# How I AI — How to build a custom AI harness with Claude SDK

_source: youtube · channel: How I AI · published: 2026-07-08_
_video: https://www.youtube.com/watch?v=ofS-4RRw9zw_
_guests: —_
_captured: 2026-07-09 (Path A) · digest run 20260709T0403_

## Summary
The host explains what an AI "harness" is — simply code wrapped around an AI agent to make it reliably useful for a specific workflow — and then walks through building one using the Claude Agent SDK. He demos a concrete harness that triages and investigates Sentry bug reports, describes its architecture (TUI, adapters, artifact store, integrations), and gives practical guidance on when and how to build a harness. The central argument: constrain and codify repetitive workflows around models to get consistent, auditable, and automatable outcomes rather than relying on ad-hoc prompts.

## Insights extracted (4)

- `pi-ofS-4RRw9zw-01` — **A harness is code wrapped around an AI agent** → theme [Agent engineering & production infra](../../themes/agent-engineering-patterns.md)
  - detail: The video defines a harness as programming that surrounds an AI agent to make it more effective for a specific use case. That wrapper can be non-AI code (connectors, UI, permissions) or include AI components, but its purpose is to enforce context, allowed actions, and expected outcomes so the model behaves consistently. Understanding a harness this way demystifies terms like "codec" or "cloud code"—they're just larger, opinionated harnesses for coding workflows.
  - anchor: "A harness is some code around an AI agent." · t=146 · [▶ 2:26](https://www.youtube.com/watch?v=ofS-4RRw9zw&t=146)

- `pi-ofS-4RRw9zw-02` — **Constrain agents to get predictable, repeatable outcomes** → theme [Agent engineering & production infra](../../themes/agent-engineering-patterns.md)
  - detail: Rather than using a general-purpose coding assistant, the creator built a harness so the agent follows a precise workflow (investigate-only or edit-enabled), only calls approved tools, and produces structured artifacts each run. The Sentry bug-triage harness demonstrates this: paste a Sentry link, the harness gathers evidence, ranks root-cause hypotheses, decides whether to open a Linear ticket, and outputs an HTML/worker report—so the same steps happen every time without hand-holding. That prescriptive control reduces variability and enables auditability for operational tasks.
  - anchor: "you can be really prescriptive about what tools it's allowed to do" · t=421 · [▶ 7:01](https://www.youtube.com/watch?v=ofS-4RRw9zw&t=421)

- `pi-ofS-4RRw9zw-03` — **Build the harness around concrete adapters and an artifact store** → theme [Agent engineering & production infra](../../themes/agent-engineering-patterns.md)
  - detail: The implemented harness uses the Claude Agent SDK as the core, opinionated adapters for Sentry, Linear, GitHub and Vercel, and an artifact store that saves evidence and run outputs for future runs. Those adapters limit what data the agent sees (e.g., selected Sentry fields), and the artifact store records investigation briefs, logs, worker actions, and an HTML summary so humans and future agent runs have persistent context. This architecture makes investigations reproducible and lets the harness reuse prior evidence.
  - anchor: "it can create its own artifacts in its file store." · t=727 · [▶ 12:07](https://www.youtube.com/watch?v=ofS-4RRw9zw&t=727)

- `pi-ofS-4RRw9zw-04` — **Be extremely specific when designing and prompting a harness** → theme [Agent engineering & production infra](../../themes/agent-engineering-patterns.md)
  - detail: From the speaker's experience, creating a reliable harness requires writing down the exact workflow, choosing precise data sources, encoding required outputs, and declaring what tools or permissions are allowed. He tried dueling model/code assistants (Claude Code, Codec, Codex) and found prompts and SDK choice matter; Codex produced the best agent scaffolding but the implementation used the Claude Agent SDK—illustrating that building a harness is about workflow design as much as model selection. The practical takeaway: small, opinionated codebases (a few files and adapters) plus tests on real data are enough to get production value.
  - anchor: "I would be very specific about the workflow." · t=871 · [▶ 14:31](https://www.youtube.com/watch?v=ofS-4RRw9zw&t=871)

_Provenance archive — generated, never hand-edited. Theme pages are the curated view._
