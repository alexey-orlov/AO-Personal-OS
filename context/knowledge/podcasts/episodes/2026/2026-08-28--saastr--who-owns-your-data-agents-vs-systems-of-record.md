# SaaStr AI — Who Owns Your Data Now? Agents vs. Systems of Record on The Agents #013

_source: youtube · channel: SaaStr AI · published: 2026-08-28_
_video: https://www.youtube.com/watch?v=zw0ww0exUe8_
_guests: —_
_captured: 2026-08-29 (Path A) · digest run 20260829T0403_

## Summary
The conversation examines how AI agents are beginning to own customer interactions and data, potentially supplanting traditional systems of record like CRMs. Using examples (Podium vs ServiceTitan and the hosts' own headless Salesforce stack), the hosts argue this shift creates huge new data volumes, alters vendor economics, and enables scalable, personalized workflows (like automated renewal decks). They show both the technical opportunity and the commercial friction as vendors reprice API access and customers rethink where data lives.

## Insights extracted (4)

- `pi-zw0ww0exUe8-01` — **Agents can become the system of record, displacing CRMs** → theme [AI agents & applications](../../themes/ai-agents-and-applications.md)
  - detail: Agents now do more than capture leads: they converse with customers, schedule work, track field visits, and can persist those interactions as authoritative records. The Podium–ServiceTitan example shows an agent platform effectively owning the customer lifecycle and provoking ServiceTitan to restrict data access; Podium had become "agentic" and generated substantial revenue before being cut off. This matters because when agents hold the interaction history, the traditional CRM loses its central role and vendors must rethink data ownership and integration policies.
  - anchor: "it could even share that record and become the system of record" · t=211 · [▶ 3:31](https://www.youtube.com/watch?v=zw0ww0exUe8&t=211)

- `pi-zw0ww0exUe8-02` — **Agent activity can explode CRM data costs a thousandfold** → theme [Agent engineering & production infra](../../themes/agent-engineering-patterns.md)
  - detail: Agent-driven automation generates far more stored interactions than pre-agent workflows, producing huge tables of records (example: a migration produced 40GB and Claude estimated 21 million records). The hosts note that moving that data to a Postgres-style store would be roughly 1,000x cheaper, and warn that agents could produce 100x more data per year than before. The non-obvious consequence: keeping all agent data in legacy, expensive systems of record becomes economically unsustainable and forces architectural re-evaluation.
  - anchor: "if we moved it to Postgress it would be a thousandx cheaper" · t=517 · [▶ 8:37](https://www.youtube.com/watch?v=zw0ww0exUe8&t=517)

- `pi-zw0ww0exUe8-03` — **Headless CRM plus agents automates hyper-personalized renewals at scale** → theme [AI agents & applications](../../themes/ai-agents-and-applications.md)
  - detail: By running Salesforce 'headless' and connecting agents to email, social APIs, event systems (Bisbo), and a deck generator (Gamma), the team built a renewal agent that assembles contracts, engagement history, social mentions, and email threads to produce custom renewal decks. That single agent produced ~30 tailored decks in days—work that previously would only be done for top-tier accounts—leading to higher engagement from smaller sponsors. The result shows agents can democratize high-quality, account-specific outreach without manual effort.
  - anchor: "we created a a mini renewal agent" · t=1129 · [▶ 18:49](https://www.youtube.com/watch?v=zw0ww0exUe8&t=1129)

- `pi-zw0ww0exUe8-04` — **Ratcheting API/data prices will drive customers off vendor platforms** → theme [Growth, GTM & pricing](../../themes/growth-gtm-and-pricing.md)
  - detail: Vendors responding to falling seat revenue by increasing API access fees risk accelerating customer migration: as agents create vastly more data, customers won't accept dramatically higher charges to use or extract their own data. The hosts argue this is a 'self-inflicted wound'—if platform vendors raise API costs while data volumes explode, customers will move data to cheaper stores or bypass vendor APIs entirely, creating synchronization and control problems for vendors.
  - anchor: "they jack up the price for access" · t=756 · [▶ 12:36](https://www.youtube.com/watch?v=zw0ww0exUe8&t=756)

_Provenance archive — generated, never hand-edited. Theme pages are the curated view._
