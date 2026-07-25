# Every — How to Build a Multi-Agent Review Swarm

_source: youtube · channel: Every · published: 2026-07-24_
_video: https://www.youtube.com/watch?v=qtKkzsQjAy0_
_guests: Ryan_
_captured: 2026-07-25 (Path A) · digest run 20260725T0404_

## Summary
A Notion engineer describes building a multi-agent developer workflow that runs inside Notion: it can spin up cloud VMs, explore repos, generate tasks, open PRs, monitor CI, and iterate on fixes. The throughline is that embedding flexible compute and custom agent skills in the product eliminates context-switching and busywork, while enabling rigorous multi-model code review and maintainability checks.

## Insights extracted (4)

- `pi-qtKkzsQjAy0-01` — **Embedding cloud VMs into Notion lets agents run real code** → theme [Agent engineering & production infra](../../themes/agent-engineering-patterns.md)
  - detail: Notion AI can attach pre-built cloud VMs (they call them Boxy) instead of a minimal sandbox so the agent can run bash, create HTML/PowerPoint files, and explore the actual codebase. In practice the agent can traverse the repo, run commands, and produce actionable artifacts (e.g., a task with code pointers and verification steps) without the user having to run anything locally. That matters because it removes environment and context friction that normally stops AI from doing deeper engineering work.
  - anchor: "right now we're like using Vercel sandboxes" · t=143 · [▶ 2:23](https://www.youtube.com/watch?v=qtKkzsQjAy0&t=143)

- `pi-qtKkzsQjAy0-02` — **An agent can implement a feature end-to-end and manage CI** → theme [Agent delegation, loops & software factories](../../themes/agent-delegation-and-loops.md)
  - detail: The speaker describes a workflow where the agent generates the work, iterates in a dedicated chat thread, opens a PR, watches continuous integration, and fixes type errors or failing tests automatically. He gives a concrete example: he started the process at 12:53, left for meetings, and returned at 2:27 to find the PR up and tests passing. This shows agents can do not just prototyping but complete, monitored delivery of code, drastically reducing manual busywork and triage.
  - anchor: "Then I want it to monitor um all of our continuous integration" · t=390 · [▶ 6:30](https://www.youtube.com/watch?v=qtKkzsQjAy0&t=390)

- `pi-qtKkzsQjAy0-03` — **A 'review swarm' slices changes and runs specialized reviewers** → theme [Agent engineering & production infra](../../themes/agent-engineering-patterns.md)
  - detail: They built a review swarm skill that splits a change set into domains (frontend, backend, etc.), then delegates each slice to separate reviewers focused on correctness and maintainability. Each slice is checked by multiple models (GPT and Opus), and a top-level agent aggregates findings into an actionable report and loops until issues are resolved. This produces a review that catches bugs plus higher-level problems like pattern duplication, maintainability, and scalability risks—something a single-pass review often misses.
  - anchor: "review swarm skill to essentially take a change set" · t=612 · [▶ 10:12](https://www.youtube.com/watch?v=qtKkzsQjAy0&t=612)

- `pi-qtKkzsQjAy0-04` — **You can quickly customize agent skills using Codex inside Notion** → theme [Agent harness engineering](../../themes/agent-harness-engineering.md)
  - detail: When existing skills don't match their needs, the team used Codex to inspect, analyze, and build new skills tailored to their criteria (for example, the particular review rules they care about). Because Notion is the source of truth and the agents update notes and specs as they work, the custom skill becomes a living, reproducible workflow rather than ad-hoc automation. The implication is democratized automation: engineers can iterate on and own their review/automation logic instead of waiting for vendor features.
  - anchor: "I just opened codex and I was like" · t=694 · [▶ 11:34](https://www.youtube.com/watch?v=qtKkzsQjAy0&t=694)

_Provenance archive — generated, never hand-edited. Theme pages are the curated view._
