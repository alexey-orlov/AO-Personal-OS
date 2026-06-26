# Oracle packages — S/M/L T-shirt sizing (whiteboard)

_Source: whiteboard sketch shared during the 2026-06-15 Oracle 1:1 ([../calls/oracle/2026-06-15_200833_one-on-one_20260615190118D7E7175C.md](../calls/oracle/2026-06-15_200833_one-on-one_20260615190118D7E7175C.md))._
_Status: rough, not validated — captured as discussed, not a committed model._

## Sizing model — "Packages"

Three engagement tiers, sized S → M → L:

| Tier | Package | Scope / characteristics |
|------|---------|-------------------------|
| **S** | **PoC / PoV** | Business KPI + Operational KPI check. "You give us data and we prove the value." Scoped **per use case**. |
| **M** | **Integration** | OFS, SCM&OTM; Altradocs; Fusion apps (component-wise); e.g. 5,000 users as a limit. |
| **L** | **Product** | Advanced AI telemetry; tailoring to local-market needs; tech hardening of product between lines. |

## Horizontal capabilities (span all tiers)
- **AI Assistant — AIQ**
- **Workforce Optimization — CuOpt**
- **Routing Optimization — CuOpt**

## Sticky note (scope tags)
- OFS, SCM&OTM
- AI DP _(AI Data Platform)_
- Fusion apps
- Domains

---

## Refined model — Gero session 2026-06-26 (now the authoritative version)

_Source: Oracle packaging session with Gero ([../calls/oracle/2026-06-26_sales-call_gero-tshirt-packaging.md](../calls/oracle/2026-06-26_sales-call_gero-tshirt-packaging.md)). Co-designed live with Oracle; SoftServe's internal S/M/XL sketch matched it. Supersedes the rough 2026-06-15 whiteboard above._

Tiers correlate to **level of integration**, framed as a "menu" / quasi-rate-card any account exec can sell:

| Tier | Working name | Marketing label | Scope |
|------|-------------|-----------------|-------|
| **S** | POC / POV ("Test") | **Proving AI value** | "You give us data, we prove value on your data." **Zero integration**, separate/test env, possibly test data. Fixed scope, **~6–10 weeks, ~$100K**. Per use case. |
| **M** | Integration ("Pilot") | **Delivering real business impact** | **Live, fully-integrated MVP** (e.g. into Field Service Management via API). **~1–2 API integrations** for data ingestion (+ optional client auth/security). **~1–2 key markets / ~500 users**. |
| **L** | Scale | **Scaling the impact** | Many markets (e.g. 15); **local customizations** (e.g. France labor rules); **advanced AI telemetry**; local tailoring. Production hardening included but kept **implicit** (never labeled "hardening"). |

**Key refinements from Gero:**
- **Anchor everything to Oracle Fusion Apps first** — with Fusion the workflow API endpoints are known by definition (no requirement engineering), Fusion reps have a warm path to the app owner, and reps are compensated on OCI consumption.
- **Start with Bosch / OFS as "step zero"** (minimum hurdle), then extend to **SCM / OTM** ("optimized bulk upload in OTM") — Fusion-anchored cases that "just should work" can be packaged even before delivery.
- **S and L are optional** (color-coded): a bought-in customer can go **straight to M**; a uniform-global-process customer may not need L. → upsell big-wallet S→M→L; budget-constrained straight to M.
- **"Integration" ≠ native UI in OFS** (that needs Oracle's product team / own roadmap) — it means a **background data exchange via existing OFS APIs**.
- **Complex/variable cases stay opportunistic** (airline contract analysis / RIAD, construction/media VSS) — handled ad-hoc via the account rep, not as structured packages.
- **Per-service packageability:** VSS yes (stream→embeddings→model→annotations); **cuOpt uncertain** (it's an optimizer — maybe packageable only if everyone optimizes the same FSM parameters; KPI/outcome promise may differ).
- Reference assets Gero owes: **CSS "Activate AI" packages** (but ~10× simpler — Fusion feature-activation; SoftServe's need more caveats) + **AIDP professional-services pricing** (~$200–300K / 6-month pilot).
