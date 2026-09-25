# Aakash Gupta — Zapier's CEO Will Grade Your AI PM Skills Live | Wade Foster (Zapier)

_source: youtube · channel: Aakash Gupta · published: 2026-09-24_
_video: https://www.youtube.com/watch?v=WbvJMnlB6wA_
_guests: Wade Foster (Zapier)_
_captured: 2026-09-25 (Path A) · digest run 20260925T0403_

## Summary
Zapier CEO Wade Foster walks through how companies should evaluate AI mastery for product managers and demonstrates the rubric by grading real PM work. He argues AI skills are now baseline, while the highest value comes from building agent-driven systems that combine deterministic execution with human judgment and customer evidence. The episode includes concrete examples—an Arize evaluation loop that cut an agent error rate and a Zapier prototype that shortens development cycles by automating pipeline stages.

## Insights extracted (5)

- `pi-WbvJMnlB6wA-01` — **AI mastery is now a baseline expectation for PMs** → theme [AI & the PM craft](../../themes/ai-and-the-pm-craft.md)
  - detail: Zapier has published and updated a four-tier rubric (Unacceptable, Capable, Adaptive, Transformational) that companies are using to evaluate product managers' AI skills. By 2026, basic uses of AI—summaries, drafts, research, simple PRDs—are considered table stakes; managers are expected to go beyond that to reusable specs, rapid prototyping, and extracting user insights at scale. That raises the hiring bar and changes what counts as acceptable PM output.
  - anchor: "على كل مدير منتج الاستعداد ليتم تقييمه في إتقان الذكاء الاصطناعي." · t=— · [▶ video](https://www.youtube.com/watch?v=WbvJMnlB6wA)

- `pi-WbvJMnlB6wA-02` — **Transformational PMs build agent-driven product factories** → theme [AI & the PM craft](../../themes/ai-and-the-pm-craft.md)
  - detail: The highest tier means designing systems of agents that ingest customer signals, generate hypotheses, produce specs and prototypes, run tests, and either deploy or surface decisions for human gates. Foster shows a five-layer agent architecture and a nightly 'sifting swarm' that aggregates signals from Gong, Zendesk, Reddit and telemetry, then routes prioritized hypotheses into a build-evaluate-fix loop. He claims these pipelines can compress development from about ten days to two, turning product creation into a repeatable factory-like process.
  - anchor: "نستطيع اختصار عملية التطوير من عشرة أيام إلى يومين فقط" · t=— · [▶ video](https://www.youtube.com/watch?v=WbvJMnlB6wA)

- `pi-WbvJMnlB6wA-03` — **Human judgment prevents 'AI slop' and remains essential** → theme [AI & the PM craft](../../themes/ai-and-the-pm-craft.md)
  - detail: Foster repeatedly warns that handing everything to AI yields mediocre, uninteresting results—what people call 'AI slop'—because models lack product taste and deep customer intuition. The differentiator is combining AI speed with a human's judgment about customer problems and product trade-offs; transparent signaling (e.g., marking how much review a draft had) is also crucial so collaborators know how polished a piece is. In short, AI amplifies, but human curation decides whether outputs are valuable.
  - anchor: "وإذا تركت الذكاء الاصطناعي يقوم بكل شيء" · t=— · [▶ video](https://www.youtube.com/watch?v=WbvJMnlB6wA)

- `pi-WbvJMnlB6wA-04` — **Observability and evaluation can cut agent error rates dramatically** → theme [Eval design & agentic evaluation practice](../../themes/eval-design-and-practice.md)
  - detail: Operationalizing agents requires deterministic tracing, automated evaluation, and a repair loop: Foster demos using Arize to instrument an agent, generate evaluation criteria, measure failures, apply fixes, and re-run tests. In his example the agent's error on one task fell from ~12% to under 2% after adding tracing, evaluation rules, and a quick repair—an end-to-end cycle that took about 20 minutes. That shows why monitoring and measurable acceptance criteria are mandatory for reliable AI products.
  - anchor: "وجدت أن الوكيل يرتكب نفس النوع من الخطأ بنسبة 12%تقريباً" · t=— · [▶ video](https://www.youtube.com/watch?v=WbvJMnlB6wA)

- `pi-WbvJMnlB6wA-05` — **No-code tools must expose 'headless' APIs for agents to act** → theme [AI agents & applications](../../themes/ai-agents-and-applications.md)
  - detail: Foster frames 'the new no-code' as code under the hood: platforms like Zapier must become accessible to agents (headless/usable via APIs and MCPs) so agents can run automations deterministically and cheaply. Zapier's moat—over 9,000 integrations and a deterministic execution layer—lets agents both build automations and run them reliably (saving tokens and avoiding the user keeping a laptop open). The strategic bet: expose execution surfaces so agents, not humans, are the primary actors in automation.
  - anchor: "اللا-كود الجديد هو الكود نفسه." · t=— · [▶ video](https://www.youtube.com/watch?v=WbvJMnlB6wA)

_Provenance archive — generated, never hand-edited. Theme pages are the curated view._
