# a16z — Why Building an AI Agent Is Easier Than Deploying One

_source: youtube · channel: a16z · published: 2026-10-02_
_video: https://www.youtube.com/watch?v=OTQ-lFsq7zA_
_guests: Sima Amble (a16z), Vlad Kail (Leo)_
_captured: 2026-10-03 (Path A) · digest run 20261003T0404_

## Summary
The conversation argues that creating an AI agent (the model/prototype) is relatively straightforward, but deploying one into real enterprise work is hard because it requires end-to-end control, integrations across records/legal/finance systems, and customer trust. Using procurement and Leo (an AI procurement-agent startup) as a running example, the guests explain why human-in-the-loop, multi‑agent orchestration, and deep product integrations — not just better base models — determine commercial success.

## Insights extracted (4)

- `pi-OTQ-lFsq7zA-01` — **Deployment fails from trust and integration barriers, not model creation** → theme [AI agents & applications](../../themes/ai-agents-and-applications.md)
  - detail: Startups can assemble powerful agents quickly, but enterprises don't hand over end-to-end processes until they trust the product and its decisions. Vlad describes using a human-in-the-loop rollout so customers gradually let the agent handle larger-value negotiations (starting at $10k then $20k then $100k), because incumbents are constrained by legal, finance, and ERP systems and worry about breaking existing workflows. The commercial barrier is therefore operational and social, not purely technical.
  - anchor: "سنمتلك تلك الدورة الكاملة من البداية إلى النهاية" · t=- · [▶ video](https://www.youtube.com/watch?v=OTQ-lFsq7zA)

- `pi-OTQ-lFsq7zA-02` — **End-to-end procurement requires coordinated multi-agent systems** → theme [AI agents & applications](../../themes/ai-agents-and-applications.md)
  - detail: A single retrieval chatbot is insufficient: real procurement workflows need different agent types (retrieval, operations, policy, principal) to handle documents, approvals, contract clauses, news, and long-running negotiations. Vlad explains Leo's multi-agent architecture that sequences agents (e.g., inventory check, RFQ drafting, email/PDF extraction, price-reference analysis, then negotiation and shipment tracking) so a purchase—from a simple screw to complex aircraft parts—can be executed across SAP/Oracle and many stakeholders.
  - anchor: "فقط من خلال نظام متعدد الوكلاء يمكنك إنجاز المهمة" · t=- · [▶ video](https://www.youtube.com/watch?v=OTQ-lFsq7zA)

- `pi-OTQ-lFsq7zA-03` — **Quick prototypes reach ~70%; the remaining 20% is the real work** → theme [AI agents & applications](../../themes/ai-agents-and-applications.md)
  - detail: What engineers can build in hours (a retrieval agent that writes into SAP, for example) often achieves ~70% functionality but still requires humans to resolve exceptions and complete the job. Elena and Vlad recount a Fortune 500 that failed building an internal product because context quality and multi‑ERP integration were missing — the final 20% (exceptions, integrations, domain data, workflows) consumes most deployment effort and is what determines production value.
  - anchor: "ولكنك لن تصل إلا إلى 70%لنقل من الأداء" · t=- · [▶ video](https://www.youtube.com/watch?v=OTQ-lFsq7zA)

- `pi-OTQ-lFsq7zA-04` — **Both buyers and suppliers will run agents, aligning incentives across deals** → theme [AI agents & applications](../../themes/ai-agents-and-applications.md)
  - detail: Vlad predicts agents on both sides of transactions. When both buyer and supplier use agents, many of the 500–5000 sub‑tasks that determine price and timing get automated and incentives (speed, reduced friction) align, enabling faster deals and better coordination. He also notes procurement leaders can mandate supplier-side tooling, so platform effects may emerge where both parties adopt interoperable agents and shared processes (even legal coordination).
  - anchor: "في المستقبل سيكون هناك وكلاء على كلا الجانبين" · t=- · [▶ video](https://www.youtube.com/watch?v=OTQ-lFsq7zA)

_Provenance archive — generated, never hand-edited. Theme pages are the curated view._
