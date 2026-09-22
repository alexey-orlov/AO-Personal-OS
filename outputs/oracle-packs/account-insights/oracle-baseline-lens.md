# What the Oracle + NVIDIA baseline provides — per feature

_Fine grain: the 52 features as first drafted. The brief's capability tree was grouped to 24 rows on 2026-09-22 so the feature list fits one page; this table keeps the finer grain. Research lens kept beside the brief, not inside it: the brief's feature entries carry only what the schema defines. Derived 2026-09-22 from the baseline research (`research/P4-baseline-failures.md`, verdict table) and the vendor study (`research/P2-vendor-gaps.md`), applied feature by feature. Baseline = NVIDIA AI-Q Blueprint 2.x with NeMo Retriever / Guardrails / Evaluator, deployed on OCI. Vlad's 2026-09-10 one-pager credited the baseline with one capability (vector search + reranking); this table is the corrected read. Alex's decision (2026-09-22): correct it quietly — honest statuses, not a sales argument._

**Glyphs.** Ours: ● available · ◐ partially available · ○ on the roadmap. Baseline: ● provides it · ◐ provides a primitive, the domain logic is ours · ○ nothing in the baseline.

| Area | Category | Feature | Ours | Baseline | What that means |
|---|---|---|:-:|:-:|---|
| Account universe & grounding | The account universe | In-scope account list and tiering | ◐ | ○ | nothing in the baseline |
| Account universe & grounding | The account universe | Account framing from CRM (the relationship in the client's own words) | ◐ | ○ | nothing in the baseline |
| Account universe & grounding | The account universe | Entity grouping by legal hierarchy rather than name match | ○ | ○ | nothing in the baseline |
| Account universe & grounding | Sources | Signal ingestion — news, filings, disclosures | ◐ | ◐ | provides a primitive; the domain logic is ours |
| Account universe & grounding | Sources | Commercial data feeds | ◐ | ◐ | provides a primitive; the domain logic is ours |
| Account universe & grounding | Sources | Public filings via EDGAR and IR pages | ◐ | ◐ | provides a primitive; the domain logic is ours |
| Account universe & grounding | Sources | Service-line capability catalog from the client's own material | ◐ | ○ | nothing in the baseline |
| Account universe & grounding | Sources | Source-licensing and redistribution-rights gate | ○ | ○ | nothing in the baseline |
| Account universe & grounding | Sources | Native multilingual processing | ○ | ◐ | provides a primitive; the domain logic is ours |
| Signal intake & normalization | Trigger | Signal-triggered — scheduled scan and manual submit | ◐ | ○ | nothing in the baseline |
| Signal intake & normalization | Trigger | Account-triggered — research one account on demand or before a meeting | ◐ | ● | provides it |
| Signal intake & normalization | Trigger | Recurrence as a standing subscription per account | ○ | ○ | nothing in the baseline |
| Signal intake & normalization | Trigger | Deadline-bound trigger — emit ahead of a dated instrument with no new signal | ○ | ○ | nothing in the baseline |
| Signal intake & normalization | Normalization | Relevance filter — is this a genuine signal | ◐ | ◐ | provides a primitive; the domain logic is ours |
| Signal intake & normalization | Normalization | De-duplication — one story across many sources becomes one signal | ◐ | ◐ | provides a primitive; the domain logic is ours |
| Signal intake & normalization | Normalization | Account resolution — which in-scope accounts a signal affects | ◐ | ○ | nothing in the baseline |
| Signal intake & normalization | Normalization | Fan-out — one signal, one record per affected account | ◐ | ○ | nothing in the baseline |
| Signal intake & normalization | Normalization | Delta reasoning — what changed since the last delivered record | ○ | ○ | nothing in the baseline |
| Signal intake & normalization | Normalization | Provenance class — filing · disclosure · reported · rumour · model output | ○ | ○ | nothing in the baseline |
| Implication reasoning | Evidence | Evidence assembly and ranking across first-party and public sources | ● | ● | provides it |
| Implication reasoning | Evidence | Evidence set shown for review before the reasoning | ○ | ○ | nothing in the baseline |
| Implication reasoning | Evidence | Contradiction between reliable sources surfaced as a finding | ○ | ○ | nothing in the baseline |
| Implication reasoning | The implication | Opportunity and risk reasoning — the "so what" per account | ◐ | ◐ | provides a primitive; the domain logic is ours |
| Implication reasoning | The implication | Dual implication — one signal yields an opportunity and a risk, routed separately | ○ | ○ | nothing in the baseline |
| Implication reasoning | The implication | Inference validity — does the conclusion follow from the cited evidence | ○ | ○ | nothing in the baseline |
| Implication reasoning | Catalog mapping | Opportunity mapped to a named service line the client actually sells | ◐ | ○ | nothing in the baseline |
| Implication reasoning | Catalog mapping | Catalog target configurable — offering · lever · mitigation · none | ○ | ○ | nothing in the baseline |
| Implication reasoning | Catalog mapping | Demand-gap stream — implications that mapped to nothing, emitted as a product-gap feed | ○ | ○ | nothing in the baseline |
| Implication reasoning | Ripple | Cross-account ripple, descriptive, up to two levels | ◐ | ○ | nothing in the baseline |
| Implication reasoning | Ripple | Graph-backed ripple over a licensed relationship graph | ○ | ○ | nothing in the baseline |
| Implication reasoning | Ripple | Portfolio aggregation — correlated groups evaluated as the unit | ○ | ○ | nothing in the baseline |
| Implication reasoning | Scoring | Magnitude and confidence scored 0-10 per item | ◐ | ○ | nothing in the baseline |
| Implication reasoning | Scoring | Calibrated confidence tested against realized outcomes | ○ | ○ | nothing in the baseline |
| Implication reasoning | Scoring | Cost-aware ranking under a capacity constraint | ○ | ○ | nothing in the baseline |
| Review & evidence | The reviewer | Reviewer UI — opportunities, sources, confidence, approve / reject with comment | ● | ◐ | provides a primitive; the domain logic is ours |
| Review & evidence | The reviewer | Citations and evidence traceability with visible chain of thought | ● | ● | provides it |
| Review & evidence | The reviewer | Human triage of raw inbound before anything is written | ○ | ○ | nothing in the baseline |
| Review & evidence | The reviewer | Reviewer disagreement analysed as a signal against the rule | ○ | ○ | nothing in the baseline |
| Review & evidence | Evaluation | Evaluation harness — correctness and confidence calibration | ◐ | ◐ | provides a primitive; the domain logic is ours |
| Review & evidence | Evaluation | Human-feedback capture as an input | ◐ | ○ | nothing in the baseline |
| Review & evidence | Evaluation | Feedback-driven tuning — a persisted learning loop | ○ | ○ | nothing in the baseline |
| Review & evidence | Evaluation | Negative assertion — "screened, nothing found, on date X, against sources Y" | ○ | ○ | nothing in the baseline |
| Review & evidence | Evaluation | Point-in-time replay of a past record on the evidence that existed then | ○ | ○ | nothing in the baseline |
| Review & evidence | Evaluation | Retraction re-checking against source publication status | ○ | ○ | nothing in the baseline |
| Output & delivery | The record | Structured per-account record — account, trigger, summary, reasoning, scored opportunities | ◐ | ○ | nothing in the baseline |
| Output & delivery | The record | Narrative briefing and discussion guide as an alternative output contract | ◐ | ● | provides it |
| Output & delivery | The record | Confidence threshold filtering low-confidence items | ◐ | ○ | nothing in the baseline |
| Output & delivery | Delivery | Export to the client's sales system | ◐ | ◐ | provides a primitive; the domain logic is ours |
| Output & delivery | Delivery | Routing to the named owner of that account | ○ | ○ | nothing in the baseline |
| Output & delivery | Delivery | Live write-back with idempotency and dedupe-on-write | ○ | ○ | nothing in the baseline |
| Output & delivery | Delivery | Outcome capture — pursued · won · lost · false positive — fed back to scoring | ○ | ○ | nothing in the baseline |
| Output & delivery | Delivery | Acting on opportunities — auto-outreach, task creation, workflow automation | ○ | ○ | nothing in the baseline |

**Tally (52 features).** Baseline provides: 4 · primitive only: 10 · nothing: 38. The four things the baseline does not touch at all — the account universe, account resolution, mapping to the client's own service catalog, cross-account ripple — are the pack.
