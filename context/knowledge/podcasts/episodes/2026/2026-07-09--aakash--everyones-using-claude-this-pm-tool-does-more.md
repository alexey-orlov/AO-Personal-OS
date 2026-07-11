# Aakash Gupta — Everyone's Using Claude. This PM Tool Does More

_source: youtube · channel: Aakash Gupta · published: 2026-07-09_
_video: https://www.youtube.com/watch?v=tTTG1Nn-kkw_
_guests: Mang (founder of Aura, New Form, Dream Cut)_
_captured: 2026-07-11 (Path A) · digest run 20260711T0403_

## Summary
A hands-on walkthrough of using Codeex (the speaker's spelling of Codex) and the surrounding toolchain to turn chat-based AI into a project-first development and product workflow. The episode argues that local-first projects, agent-driven 'computer use', skill/plugin ecosystems, and eval/tracing are the practical levers PMs and founders should use to build apps, presentations, videos, and product workflows faster. It closes by arguing PMs must become more technical — not to write code but to orchestrate agents and maintain quality — or risk being displaced.

## Insights extracted (4)

- `pi-tTTG1Nn-kkw-01` — **Codex turns chat into a project-based local development environment** → theme [Agent engineering & production infra](../../themes/agent-engineering-patterns.md)
  - detail: Codeex (Codex) is presented not as a simple chat UI but as a full project workspace: projects are folders on your machine that the agent can read, edit and run, and it can generate slides, HTML, mobile apps and more. The host shows a concrete workflow — create a Projects folder in Downloads, give the agent full access, use planning mode, and then have the agent read local files, take screenshots and build deliverables — which lets the AI work with richer context and control actual tools (Figma, Xcode, Keynote) via 'computer use'. This matters because it converts chat into an operational environment, replacing many point tools and speeding iteration.
  - anchor: "the chat GBT but 10x like" · t=249 · [▶ 4:09](https://www.youtube.com/watch?v=tTTG1Nn-kkw&t=249)

- `pi-tTTG1Nn-kkw-02` — **Local-first file access massively boosts AI's effectiveness and privacy** → theme [Agent engineering & production infra](../../themes/agent-engineering-patterns.md)
  - detail: The speaker emphasizes keeping everything local (projects, markdown, assets) and using a knowledge-organizer like Obsidian so the AI can use richer, private context without depending on remote databases. He attributes this local-first mindset to the 'open claw' movement and shows how Obsidian organizes MD files while Codeex reads HTML/MD/images locally; the result is more powerful, faster and private agent behavior. The practical upshot: store and structure context on your machine so agents can act with higher accuracy and less leakage risk.
  - anchor: "this is the superpower that kind of open claw uh" · t=628 · [▶ 10:28](https://www.youtube.com/watch?v=tTTG1Nn-kkw&t=628)

- `pi-tTTG1Nn-kkw-03` — **Tracing and eval loops are essential to stop agent hallucinations** → theme [Agent engineering & production infra](../../themes/agent-engineering-patterns.md)
  - detail: When agents call tools and make multi-step decisions you must trace and evaluate each span: the creator demonstrates Arise instrumenting Claude Code to capture every tool call, which revealed a resume-feedback agent hallucinating 'React' instead of the job posting's 'Python'. Using Arise, Claude suggested four evaluation criteria, the creator ran evals, found a ~12% failure rate, implemented fixes, and saw it drop under 2% — all in about 20 minutes. The lesson: without tracing+eval you ship blind; with them you can systematically find and fix agent errors.
  - anchor: "Trace what's happening, evaluate where it fails, then fix it." · t=738 · [▶ 12:18](https://www.youtube.com/watch?v=tTTG1Nn-kkw&t=738)

- `pi-tTTG1Nn-kkw-04` — **Product managers must get technical and orchestrate agents to stay relevant** → theme [AI & the PM craft](../../themes/ai-and-the-pm-craft.md)
  - detail: The speaker argues layoffs are revealing: non-technical PMs are most at risk while PMs who know AI tooling, models and orchestration survive and thrive. He explains 'technical' doesn't mean writing lines of code — it means understanding models, skills, and how to deploy fleets of agents, then applying human judgment to the final 8–10% of quality control. Evidence: he runs multiple products (Aura, New Form, Dream Cut), manages agents and a small team, and says AI removes bureaucracy so PMs' value shifts to strategy, vision and QA.
  - anchor: "you need to get more technical" · t=3989 · [▶ 1:06:29](https://www.youtube.com/watch?v=tTTG1Nn-kkw&t=3989)

_Provenance archive — generated, never hand-edited. Theme pages are the curated view._
