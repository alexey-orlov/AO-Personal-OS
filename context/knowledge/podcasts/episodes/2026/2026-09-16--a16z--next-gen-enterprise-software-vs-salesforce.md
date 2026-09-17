# a16z — Why the Next Generation of Enterprise Software Looks Nothing Like Salesforce

_source: youtube · channel: a16z · published: 2026-09-16_
_video: https://www.youtube.com/watch?v=K5yGLO8c6T0_
_guests: Keith (Lightfield)_
_captured: 2026-09-17 (Path A) · digest run 20260917T0403_

## Summary
The guest describes pivoting from an AI presentation product to building Lightfield, a reimagined CRM that treats a company's relationship timeline as the core data primitive and layers intelligence on top. The throughline is that modern enterprise software succeeds not by reusing rigid schemas and seat-based pricing, but by assembling semistructured context from many sources, making that context queryable, and charging for the distinct kinds of value AI delivers.

## Insights extracted (5)

- `pi-K5yGLO8c6T0-01` — **They pivoted because AI presentations lacked human-audience context** → theme [Product discovery & strategy](../../themes/product-discovery-and-strategy.md)
  - detail: The team stopped chasing an AI presentation product after concluding it could never become indispensable for discerning professionals — the models lacked enough context about presenter, audience, and relationship to produce reliably high-quality, repeatable work. With ~25M users to inspect, they ran 12 B2B pilots with sales teams and discovered the harder, more valuable problem was reorganizing disparate company data so machines (and humans) could reason about relationships.
  - anchor: "we just couldn't for the life of us make good presentations" · t=174 · [▶ 2:54](https://www.youtube.com/watch?v=K5yGLO8c6T0&t=174)
- `pi-K5yGLO8c6T0-02` — **Make the activity log the canonical primitive, not isolated fields** → theme [Product discovery & strategy](../../themes/product-discovery-and-strategy.md)
  - detail: Lightfield was built around a chronological activity log that records every touchpoint (emails, calls, documents, product usage) as the canonical view of a relationship; CRM fields and stages get inferred and updated from that log. This design lets the product traverse a customer's entire history to answer open questions (e.g., is an account ready for expansion) and compare accounts by diving into the log rather than hunting for the right column.
  - anchor: "we actually built out the activity log first" · t=730 · [▶ 12:10](https://www.youtube.com/watch?v=K5yGLO8c6T0&t=730)
- `pi-K5yGLO8c6T0-03` — **Design schemaless systems: 'intelligence > schema' for onboarding** → theme [Product discovery & strategy](../../themes/product-discovery-and-strategy.md)
  - detail: Rather than forcing customers to model rigid stages and fields up front, they made Lightfield effectively schemaless: connect email, call recorders, and warehouses and let intelligence assemble relationships and infer fields. The result is a consumer-like setup (press sync, wait minutes) and the ability to recompute fields later from the activity log, avoiding the classic one-shot data-model mistake that kills CRM adoption.
  - anchor: "Intelligence is greater than than schema" · t=1026 · [▶ 17:06](https://www.youtube.com/watch?v=K5yGLO8c6T0&t=1026)
- `pi-K5yGLO8c6T0-04` — **Mixed pricing: fixed platform fee + seats for core, consumption for alpha** → theme [Growth, GTM & pricing](../../themes/growth-gtm-and-pricing.md)
  - detail: They experimented with seat-only pricing (which produced heavy head-tail usage) and pure consumption (which caused signups that didn't engage), then segmented Lightfield's value into buckets: core CRM capture (platform/seat), pipeline generation (consumption), workflow automations (paid), and high-value intelligence/forecasting (paid). This hybrid aligned incentives so routine CRM work is predictable while truly value-creating, consumption-heavy features are billed by usage.
  - anchor: "We started with pure seat pricing" · t=1954 · [▶ 32:34](https://www.youtube.com/watch?v=K5yGLO8c6T0&t=1954)
- `pi-K5yGLO8c6T0-05` — **Culture: remove rigid swim lanes so the company can iterate at speed** → theme [Leadership, careers & teams](../../themes/leadership-careers-and-teams.md)
  - detail: They abolished strict functional silos—'everyone owns product and everyone owns customer success'—running a single daily standup, stack-ranking problems, and allowing anyone free to pick the highest-priority task. Combined with LLM-augmented ramping and low barriers to start but high bar to ship, this generalist, continuously-planned approach is how a ~40-person team sustains rapid pivots and shipping velocity.
  - anchor: "everyone owns product and everyone owns customer success" · t=2270 · [▶ 37:50](https://www.youtube.com/watch?v=K5yGLO8c6T0&t=2270)

_Provenance archive — generated, never hand-edited. Theme pages are the curated view._
