# Aakash Gupta — The Claude Setup That Let a PM Beat 30 Engineering Teams

_source: youtube · channel: Aakash Gupta · published: 2026-07-13_
_video: https://www.youtube.com/watch?v=uEK9ONplfRk_
_guests: Ji Nucla_
_captured: 2026-07-14 (Path A) · digest run 20260714T0404_

## Summary
A product leader (guest) walks through the full Claude ecosystem — models, surfaces, knowledge base, integrations (MCPs) and agents — and shows how she used an adversarial-agent evaluator built in Claude Code to win an internal hackathon against 30 engineering teams. The episode is a hands-on blueprint: pick the right model for the task, automate recurring PM work with co-work and skills, build a contextual knowledge base that ingests meeting transcripts and docs behind a local MCP, and run GAN-inspired adversarial loops to harden agents.

## Insights extracted (5)

- `pi-uEK9ONplfRk-01` — **A company knowledge base (layer 3) is the single biggest multiplier for Claude** → theme [AI & the PM craft](../../themes/ai-and-the-pm-craft.md)
  - detail: The knowledge base is where institutional context — strategy docs, org charts, meeting transcripts and people profiles — lives, and it turns Claude from a generic chatbot into a context-aware assistant. The guest built a 'chief of staff' KB that ingests meeting transcripts (Granola/Google Meet), PRDs and Slack threads, stores structured MD files, and surfaced relationship signals (who's an ally) and sensitivity warnings; that contextual grounding produced actionable recommendations that simple chat couldn't. Treating the KB as the priority (and putting it behind a local MCP if you need privacy) transforms recurring automations and agents from brittle to useful.
  - anchor: "Now on top of this layer is your knowledge base." · t=352 · [▶ 5:52](https://www.youtube.com/watch?v=uEK9ONplfRk&t=352)

- `pi-uEK9ONplfRk-02` — **Use the right Claude model: Haiku for volume, Sonnet for most PM work, Opus for edge-case reasoning** → theme [AI & the PM craft](../../themes/ai-and-the-pm-craft.md)
  - detail: Haiku is the fast, low-cost model for high-volume tasks like document triage, tagging or generating many variants; Sonnet is the recommended default for about 90% of PM tasks (drafting PRDs, research synthesis, roadmaps) because it balances cost and quality; Opus is reserved for high-stakes, long-horizon reasoning but can get stuck or hallucinate more easily and is more expensive. The speaker describes switching between them in practice — saving tokens with Haiku for automations, using Sonnet for day-to-day synthesis, and only moving to Opus when deeper multi-step reasoning is required.
  - anchor: "Haiku is your speed machine. It's the fastest, costefficient," · t=437 · [▶ 7:17](https://www.youtube.com/watch?v=uEK9ONplfRk&t=437)

- `pi-uEK9ONplfRk-03` — **Scheduled co-work automations can 10x–100x PM productivity by surfacing only what matters** → theme [AI & the PM craft](../../themes/ai-and-the-pm-craft.md)
  - detail: Set up scheduled runs (morning brief, standup brief, end-of-day) that pull Calendar, Gmail, Drive, Jira and Slack via connectors and apply tight output rules (e.g., morning brief <400 words, never invent deadlines). The guest described a morning 'chief of staff' automation that lists top three priorities, relevant inbox items and Jira tickets so she arrives at standup already focused; automations run on a schedule or trigger (and note: desktop app must be on for scheduled runs). This offloads busywork, enforces aggressive filtering, and lets PMs focus on decision-making.
  - anchor: "Generate my morning brief for today. Here are your data sources" · t=998 · [▶ 16:38](https://www.youtube.com/watch?v=uEK9ONplfRk&t=998)

- `pi-uEK9ONplfRk-04` — **Skills are progressive-disclosure playbooks that stop context windows from blowing up** → theme [Agent engineering & production infra](../../themes/agent-engineering-patterns.md)
  - detail: A Skill is more than a single markdown file: it's a structured set of instructions, step-wise procedures, linked supporting files (evidence_rules.mmd, templates) and optional functions that the orchestration engine loads only when needed. That progressive-loading model keeps the model's context light (only a short description initially, full instructions loaded conditionally), enables chaining and function calls, and lets you scale to dozens of skills without exhausting context memory. Human-written domain guidance still improves performance over purely AI-generated skill files, and you should update skills when the domain or outputs drift.
  - anchor: "skill is not just a markdown file." · t=1659 · [▶ 27:39](https://www.youtube.com/watch?v=uEK9ONplfRk&t=1659)

- `pi-uEK9ONplfRk-05` — **GAN-inspired adversarial evaluators can red-team agents automatically until they meet your pass criteria** → theme [Agent engineering & production infra](../../themes/agent-engineering-patterns.md)
  - detail: The guest built an adversarial-evaluator loop: a red-teaming agent generates attacks against a generator agent, the evaluator scores failures against a rubric, and the generator updates (often the system prompt) and retries until mean scores exceed a threshold (e.g., >8) or max iterations are reached. She used this setup inside Claude Code, integrated with company code, and ran iterative hardening where each iteration produced higher scores — the approach is how she won the hackathon versus 30 engineering teams because it automates improvement and exposes edge cases the developer never manually authored.
  - anchor: "they had this concept of adversarial agents" · t=193 · [▶ 3:13](https://www.youtube.com/watch?v=uEK9ONplfRk&t=193)

_Provenance archive — generated, never hand-edited. Theme pages are the curated view._
