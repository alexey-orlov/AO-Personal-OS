# Explore queue — articles & topics to dig into

Captured via the Drop Zone ("look into X", a URL to read, an open question). Maintained by
`context-update`; researched by the `explore-brief` skill, which writes a research brief to
[briefs/](briefs/), links it from the queue line, and posts a summary with link buttons to
the 🔭 Articles & Topics Telegram topic.

Lifecycle: `- [ ]` open → ` → [brief](briefs/<slug>.md)` appended when researched → Alex
checks the line off (`[x]`) once read/decided; checked lines move to **Explored** below
(keep ~10, prune oldest). Keep ≤40 open items; flag stale ones (>6 months) in the run
summary instead of silently deleting.

Format: `- [ ] YYYY-MM-DD — topic — why it matters ([drop](provenance))[ → [brief](briefs/<slug>.md)]`

## Open

- [ ] 2026-06-30 — agentic architecture options comparison — model-boxed harness (Claude Code style, everything inside one model) vs dedicated harness (Vercel AI SDK + Cloudflare Workers) vs enterprise platform stacks (NVIDIA AI-Q + OCI, Langfuse-based observability/orchestration, AWS/Azure native agent solutions) — tradeoffs for architecture decisions in agentic products ([drop](../../_inbox/processed/tg-20260630-135928-172.md)) → [brief](briefs/agentic-architecture-options-comparison.md)
- [ ] 2026-06-30 — agentic AI minimal stack (Gusto: Cloudflare Workers + Vercel AI SDK) — practical proof that complex custom agent platforms are unnecessary; Gusto built the agent loop on CF Workers + Vercel AI SDK, memory/artifacts as simple DB columns; implications for architecture decisions in agentic products ([drop](../../_inbox/processed/tg-20260630-074509-168.md)) → [brief](briefs/gusto-agentic-minimal-stack.md)
- [ ] 2026-06-26 — context maintenance best practices — how to keep a living wiki / knowledge base current and useful when the project underneath it constantly evolves; patterns to prevent "wiki rot"; hooks to AI-assisted context management ([drop](../../_inbox/processed/tg-20260626-190559-158.md)) → [brief](briefs/context-maintenance-best-practices.md)
- [ ] 2026-06-25 — Genie by Databricks — what it is, how it works, relevance to enterprise AI analytics and agentic data layer patterns ([drop](../../_inbox/processed/tg-20260625-082403-153.md)) → [brief](briefs/genie-databricks.md)
- [ ] 2026-06-19 — философский смысл технологий — книги от философов: экзистенциальная польза tech-работы, смысл посвящать жизнь IT/AI, technology → progress → meaning ([drop](../../_inbox/processed/tg-20260619-202053-133.md)) → [brief](briefs/philosophy-of-technology-books.md)
- [ ] 2026-06-19 — Kiro.dev (Amazon's agentic spec-driven IDE) — how does it work hands-on; Hooks, spec pipeline, vs Claude Code ([drop](../../_inbox/processed/tg-20260618-130859-126.md)) → [brief](briefs/kiro-dev.md)
- [ ] 2026-06-18 — context & harness engineering (Karpathy/Hashimoto three-eras framing) — scope of each era, divide, tooling, why "moved", canonical topology ([drop](../../_inbox/processed/tg-20260617-221224-113.md)) → [brief](briefs/context-harness-engineering-karpathy.md)
- [ ] 2026-06-18 — enterprise workflow AI equilibrium — NL layer replacing SaaS UI, platform AI vs SaaS-embedded agents, deterministic vs agentic, SaaS vs custom builds; where is the equilibrium across CRM/ERP/ops ([drop](../../_inbox/processed/tg-20260617-202524-112.md)) → [brief](briefs/enterprise-workflow-ai-equilibrium.md)
- [ ] 2026-06-18 — agentic SDLC role changes — practitioner consensus on changed roles, artifacts, rituals, team compositions; SDD in agentic context; hardest challenges ([drop](../../_inbox/processed/tg-20260617-154256-110.md)) → [brief](briefs/agentic-sdlc-role-changes.md)
- [ ] 2026-06-16 — spec-driven development — what it is specifically, its techniques, and relevance to Alex's product/AI-engineering work ([drop](../../_inbox/processed/tg-20260616-134617-107.md)) → [brief](briefs/spec-driven-development.md)
- [ ] 2026-06-13 — Opus 4.8 workflows for research / scraping in Personal OS — whether extended-thinking workflow patterns offer a better fit for multi-step research and web-scraping tasks than current skill composition ([drop](../../_inbox/processed/tg-20260613-123114-94.md)) → [brief](briefs/opus-48-workflows-research-scraping.md)
- [ ] 2026-06-13 — multi-agent orchestration: supervisor vs peer-to-peer vs scripted workflows — specific use cases for each; when (if ever) Alex hand-designs peer-to-peer vs leaving it to the platform (Claude Code); build on prior agent-swarms research ([drop](../../_inbox/processed/tg-20260613-124731-97.md)) → [brief](briefs/multi-agent-orchestration-patterns.md)
- [ ] 2026-06-12 — subagents and agent swarms — real use cases, demos, and how to decide between a skill vs a subagent ([drop](../../_inbox/processed/tg-20260612-235939-84.md)) → [brief](briefs/agent-swarms-subagents.md)
- [ ] 2026-06-11 — agent loop architecture (Karpathy) — what specifically Karpathy means by "agent loop" and how to design it well ([drop](../../_inbox/processed/tg-20260611-231405-37.md)) → [brief](briefs/agent-loop-architecture-karpathy.md)

## Explored (recent)

-
