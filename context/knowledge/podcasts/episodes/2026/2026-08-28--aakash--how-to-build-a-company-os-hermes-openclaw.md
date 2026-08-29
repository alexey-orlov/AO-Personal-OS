# Aakash Gupta — How to build a Company Operating System with Hermes and OpenClaw

_source: youtube · channel: Aakash Gupta · published: 2026-08-28_
_video: https://www.youtube.com/watch?v=zocznD8Z-6k_
_guests: Mikail (CPO, previously Bolt and Yandex)_
_captured: 2026-08-29 (Path A) · digest run 20260829T0403_

## Summary
A CPO describes how his company built an internal "company operating system": an agentic knowledge graph + tools (OpenClaw + Hermes) that captures meetings, documents, contacts and metrics to let AI autonomously handle status, stakeholder gating, scheduling, prototypes and hiring work. The central argument: digitize organizational context into layered memory and agentic skills so AI can safely take on routine processes, freeing PMs to focus on discovery and strategic work while enabling faster iteration and measurable recall/accuracy gains.

## Insights extracted (4)

- `pi-zocznD8Z-6k-01` — **A single digitized company knowledge store lets AI act like a junior PM** → theme [AI & the PM craft](../../themes/ai-and-the-pm-craft.md)
  - detail: They built a knowledge graph in about five months that links products, teams, contacts, projects and funnel metrics; the team measures "product context coverage" (currently ~54%) and treats it as a KPI. At ~50% the agent can operate as a capable junior product manager (make backlog decisions); at ~70–90% they expect it to start assisting strategy-level decisions—so coverage is both a quality and delegation metric that directly maps to autonomy you can give the AI.
  - anchor: "single storage of this entire business, customer product" · t=206 · [▶ 3:26](https://www.youtube.com/watch?v=zocznD8Z-6k&t=206)

- `pi-zocznD8Z-6k-02` — **The CPO must own the agentic operating system, not engineering or IT** → theme [AI & the PM craft](../../themes/ai-and-the-pm-craft.md)
  - detail: Owning the agent lets the CPO iterate rules, imperatives and behavior quickly and ensures the agent impacts product decisions and business outcomes rather than becoming a slow engineering project. He argues this ownership speeds iteration and preserves product accountability—delegating ownership to an ops team costs speed and reduces organizational impact—so the CPO should treat the OS as a core product.
  - anchor: "you should own this for two reasons" · t=1287 · [▶ 21:27](https://www.youtube.com/watch?v=zocznD8Z-6k&t=1287)

- `pi-zocznD8Z-6k-03` — **Automatically generated "skills" (Hermes) raised answer accuracy by 31%** → theme [Agent engineering & production infra](../../themes/agent-engineering-patterns.md)
  - detail: They combined OpenClaw (scaffolding) with Hermes because Hermes auto-creates skills from frequent tasks; in A/B tests across five topic areas adding those skills improved recall/accuracy by ~31%. That made previously fuzzy retrievals and task-specific responses substantially more reliable, turning repeated patterns (hiring, board feedback, case building) into first-class agent capabilities.
  - anchor: "it was way more accurate in responding using those skills by 31%" · t=1404 · [▶ 23:24](https://www.youtube.com/watch?v=zocznD8Z-6k&t=1404)

- `pi-zocznD8Z-6k-04` — **Store raw transcripts + vectors (not summaries) to maximize retrieval fidelity** → theme [Agent engineering & production infra](../../themes/agent-engineering-patterns.md)
  - detail: They use a three-layer memory: knowledge graph, vector DB (for fuzzy retrieval), and raw conversation transcripts. Empirically, summarizing/transmuting transcripts reduced recall and lost nuance—"summarization actually hurts retrieval"—so they keep raw MD transcripts to preserve granular detail and improve matching for ambiguous queries.
  - anchor: "it turns out that summarization actually hurts a retrieval" · t=1563 · [▶ 26:03](https://www.youtube.com/watch?v=zocznD8Z-6k&t=1563)

_Provenance archive — generated, never hand-edited. Theme pages are the curated view._
