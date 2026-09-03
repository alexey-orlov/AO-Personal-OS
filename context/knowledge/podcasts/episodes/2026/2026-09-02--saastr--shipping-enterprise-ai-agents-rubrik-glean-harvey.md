# SaaStr AI — Shipping Enterprise AI Agents with the CPOs of Rubrik, Glean, and Harvey

_source: youtube · channel: SaaStr AI · published: 2026-09-02_
_video: https://www.youtube.com/watch?v=3ZiEl5YoSno_
_guests: —_
_captured: 2026-09-03 (Path A) · digest run 20260903T0403_

## Summary
Product leaders from Rubrik, Glean, and Harvey discuss how companies are actually building, deploying, and governing enterprise AI agents today. The throughline is practical: agents can automate complex work (capacity planning, knowledge work, discovery) but only if teams invest in deterministic plans, strong organizational context, human-in-the-loop verification, and platform-level guardrails.

## Insights extracted (4)

- `pi-3ZiEl5YoSno-01` — **Security and recovery agents must be extremely accurate to preserve trust** → theme [Agent harness engineering](../../themes/agent-harness-engineering.md)
  - detail: In cyber-recovery use cases (Rubrik) a wrong recommendation or autonomous action can damage production systems and cost customers — so agents must produce high-accuracy, explainable plans. Rubrik describes turning an hours-or-days capacity-planning task into an agentic workflow, but stresses those plans must be deterministic (not probabilistic) and human-approved before execution. That requirement drives a very different architecture and evaluation approach than a generic chat assistant and explains why security teams are cautious about full autonomy.
  - anchor: "super super high accuracy and where we're preserving" · t=388 · [▶ 6:28](https://www.youtube.com/watch?v=3ZiEl5YoSno&t=388)

- `pi-3ZiEl5YoSno-02` — **Organizational, offline 'memory' is the competitive part of agents** → theme [AI agents & applications](../../themes/ai-agents-and-applications.md)
  - detail: Glean argues that the real value of enterprise agents is the offline-processed, firm-level context — connecting projects, people, precedents and acquisitions into a persistent memory — not just runtime retrieval. Users today spend huge amounts of their AI time 'building context'; Glean serves as a system of intelligence you can query directly or surface to other assistants (Claude, Co-pilot-style UIs), and its cloud integrations are among the fastest-growing usage modes. That superior context lets agents perform work on behalf of teams rather than forcing each user to re-feed documents every session.
  - anchor: "giving me memory across everything across my organization" · t=646 · [▶ 10:46](https://www.youtube.com/watch?v=3ZiEl5YoSno&t=646)

- `pi-3ZiEl5YoSno-03` — **Law firms want agentic work but demand verification and firm governance** → theme [AI agents & applications](../../themes/ai-agents-and-applications.md)
  - detail: Harvey reports strong adoption among sophisticated legal customers — they serve ~60%+ of AmLaw 100 and many Fortune 500 legal teams — but lawyers insist on provenance, citations, and ways to verify an agent's plan before relying on output. To address this Harvey supplies both self-serve agent builders and so-called forward-deployed or legal-engineer pods (about 180 legal engineers) who configure agents to reflect firm playbooks and enable partner/associate review workflows, because firms need reproducible, auditable processes not opaque autonomy.
  - anchor: "Can I actually verify someone else's agentic plan?" · t=843 · [▶ 14:03](https://www.youtube.com/watch?v=3ZiEl5YoSno&t=843)

- `pi-3ZiEl5YoSno-04` — **Shipping agents shifts responsibility and requires deterministic guardrails** → theme [Agent harness engineering](../../themes/agent-harness-engineering.md)
  - detail: Panelists emphasize that once agents act at scale (headless or through partners/GSIs), vendors will be held responsible for failures, so platforms must provide explainability, tracing, identity, and human-approval flows. Rubrik explains they use LLMs to draft plans but insist the recovery steps are deterministic and explainable; Glean discusses trace and persistence so agents learn from user corrections; and vendors are building platform-level evals and governance to reduce mistakes while enabling automation.
  - anchor: "are deterministic and then are explainable to the" · t=1357 · [▶ 22:37](https://www.youtube.com/watch?v=3ZiEl5YoSno&t=1357)

_Provenance archive — generated, never hand-edited. Theme pages are the curated view._
