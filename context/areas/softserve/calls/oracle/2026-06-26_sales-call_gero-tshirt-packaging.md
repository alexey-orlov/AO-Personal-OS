# sales-call — Oracle packaging session with Gero (S/M/L "t-shirt" packages)

_source: pasted transcript (no recording) — 2026-06-26 (inferred)_
_full transcript: [../../docs/2026-06-26_gero-tshirt-packaging-transcript.md](../../docs/2026-06-26_gero-tshirt-packaging-transcript.md)_

> **Type**: Oracle ↔ SoftServe working session — packaging the accelerator POC use cases into sellable offerings
> **Channel**: MS Teams
> **Speakers**: **A = Gero** (Gero Gunkel, Oracle — regional AI director / packaging owner). **B / C / D / E = SoftServe** team (B drives the whiteboard "translation" + asks; C holds SoftServe's internal S/M/XL view, addressed as "Vladimir"; D frames the ask + closes; E presses the sales-incentive angle). Identities beyond Gero inferred.
> _This is the dedicated Gero "discovery/packaging" call that had been set up since the 2026-06-18 onboarding, and the deliverable referenced as "discussed Tuesday" in the [2026-06-25 WfO alignment](2026-06-25_134850_one-on-one_20260625131028FE4E3D44.md)._

## TL;DR

Gero co-designed, live, the S/M/L "t-shirt" packaging model for the AI accelerator POC use cases — and crucially **anchored the whole thing to Oracle Fusion Apps** as the wedge. The three tiers map to **level of integration, not feature count**: **S = POC/POV** ("prove AI value on your data", zero integration, separate/test env, ~6–10 weeks, ~$100K), **M = Integration** ("deliver real business impact" — a live, fully-integrated MVP via APIs, ~1–2 integrations, ~500 users / 1–2 key markets), **L = Scale** ("scaling the impact" — many markets, local customizations, advanced AI telemetry). SoftServe's own internal S/M/XL sketch (Speaker C) matched almost exactly — strong convergence. Key strategic insight from Gero: **start with Bosch / Oracle Field Service Management (OFS) as "step zero"** because the Fusion API endpoints are known by definition, Fusion reps have a warm path to the app owner, and it's the minimum-viable hurdle ("if we can't make it work for Bosch, we might as well stop"). Complex/variable cases (airline contract analysis "RIAD", construction/media VSS) stay **opportunistic / ad-hoc**, not structured packages. **Action: SoftServe sends Gero the model as an Excel file; he works on it over the weekend.** Gero owes the **CSS "Activate AI" packages** + the **AIDP professional-services pricing reference** (~$200–300K for a 6-month pilot). AIDP packaging handled separately after today's AIDP onboarding session.

## Participants & roles

- **Gero (Speaker A, Oracle)** — packaging owner on Oracle side; co-designed the model in-session; owns the CSS-packages + AIDP-pricing follow-ups. Candid about Oracle's internal reorg "state of chaos" (proper work resumes July).
- **Speaker B (SoftServe)** — drove the live whiteboard "translation" of Gero's model; asked the OCI-credits, AI-Innovation-Basket, and target-domains questions. (Likely Volodymyr or Pavel — owns the packaging deliverable per prior context.)
- **Speaker C (SoftServe, "Vladimir")** — presented SoftServe's internal S/M/XL framing (limit input data → integrations → near-production); pushed to generalize integration beyond OFS (data ingestion + auth/security flavors).
- **Speaker D (SoftServe)** — framed the opening ask (wrap successful POCs into something "digestible by your salespeople"); closed the call.
- **Speaker E (SoftServe)** — pressed the sales-adoption angle: what's in it for the rep, KPIs, "have we done this before."

## Customer / partner context

- **Oracle is mid-reorg through June** — "many people moving around," a complete restructure; Gero expects proper work to resume in July. He jokes a planned customer event was over-scoped ("Oracle people presenting to Oracle people") and started too late. Implication for SoftServe: **expect Oracle-side slippage and reduced bandwidth until July.**
- **Neil** (senior, above Gero) had agreed end-of-June as the wrap-up checkpoint for the POCs → packaging; Gero hasn't spoken to Neil in a week (Neil "completely busy").
- Bohdan met "Egger/Emil" — there's a rumor SoftServe/Oracle packaging is "~80% ready"; Gero has no details and flags it needs clarifying with Bohdan.
- Two parallel packaging tracks: **(1) AI accelerators** (today's main topic) and **(2) AIDP** (handled separately after today's AIDP onboarding session).

## The S/M/L packaging model (co-designed in-session)

Tiers correlate to **level of integration**, sized as a "**menu**" / quasi-"rate card" so the "most lazy account executive" can explain it:

| Tier | Working name | Marketing label | Scope |
|------|-------------|-----------------|-------|
| **S** | POC / POV ("Test") | **"Proving AI value"** | "You give us data, we prove the value on your data." **Zero integration**, separate/test environment, possibly test data. Fixed scope, **~6–10 weeks**, **~$100K**. Per use case (route/fleet optimization, RAG chatbot). |
| **M** | Integration ("Pilot") | **"Delivering real business impact"** | A **live, fully-integrated MVP** — e.g. integrated into Field Service Management via API, run live. **~1–2 API integrations** for data ingestion (+ optionally client auth/security: Okta, API gateway). Scoped to **~1–2 key markets / ~500 users**. |
| **L** | Scale | **"Scaling the impact"** | Roll out to many markets (e.g. 15); **local customizations** per market (e.g. France labor rules); **advanced AI telemetry** for impact/usage tracking; tailoring to local needs. |

- **S and L are optional / color-coded.** A fully-bought-in customer can skip the POC and **go straight to M**; a budget-constrained customer with a uniform global process **may not need L**. → strategic upsell: big-wallet S→M→L; budget-constrained, straight to M. "Works very well for OFS."
- **SoftServe's internal sketch matched** (Speaker C): S = limit input data / test functionality; M = introduce integrations (data flow + security); XL = as close to production as wanted, full client-landscape integration. **Convergence confirmed.**
- **"Hardening" stays implicit.** Gero deliberately would NOT label L as "hardening the integration" — invites the "what was wrong before?" question. Frame L as added telemetry + local tailoring ("squeezing more value out"), keep hardening "between the lines."
- **Sales narrative** Gero scripted for the AE: "We know it works → we'd encourage you to go straight to integration. If you want to test first, fixed-scope ~6–8-week test on your data (we know the data because it's Fusion) → performance results + anonymized cross-customer dashboard → go live with 500 users → you might not even need scale if you're uniform globally."

## Key strategic decisions / alignments

1. **Anchor packaging to Oracle Fusion Apps first.** The wedge: with Fusion in the picture, **Oracle knows the workflow API endpoints by definition** (no requirement engineering), Fusion reps have a **warm path to the app owner**, and reps are compensated on OCI consumption. "When there's Fusion Apps in the picture, it's a no-brainer" (Speaker C). Client's own security (Okta/API gateway) remains a separate line item.
2. **Start with Bosch / OFS as "step zero"** — the minimum hurdle (it's Oracle's own app, expertise in-house, SoftServe already worked Bosch). "If we can't make it work for Bosch, we might as well stop." Then **stress-test internally with a few Fusion reps**.
3. **Next, extend to other Fusion-anchored use cases without having delivered them yet** — SCM / **OTM** (Oracle Transport Management → "optimized bulk upload in OTM"), Work Zone / fleet / route optimization in OFS. Because the endpoints are known, these can be packaged "almost without having done it."
4. **Keep complex/variable cases opportunistic, not structured packages** — airline contract analysis ("RIAD"/Riyad Air, AIQ), construction/media VSS — too much variability (unknown underlying systems, security). Handle ad-hoc via "reach out to the account rep."
5. **"Integration" ≠ native UI inside OFS.** Native integration needs Oracle's product team (separate dept, own roadmap — "its own journey"; Gero is pushing it via SCM calls but won't promise it). The M package means a **background data exchange via existing OFS APIs.**
6. **AIDP treated separately** — easier/known path via experience; "start small, use what we have" (Speaker E); both orgs still on a learning curve.

## Objections / risks / open questions

- **OCI free-consumption credits as a POC→product incentive** (like hyperscalers do)? Gero "pulls a joker" — **potentially yes, but unresolved**: EMEA has a **cap on total GPUs**, so Oracle may not be allowed to give much. Deferred.
- **Fusion SaaS customers consume OCI indirectly** (no separate OCI instance). There's a way to "attach" an OCI instance to a Fusion instance, but costing/credits + **GPU availability** need more thought.
- **Can you package per-service?** AI accelerators increasingly becoming **PaaS** (more packaged → easier). **VSS is packageable** (stream → embeddings → model → annotations). **cuOpt is harder** — it's an optimizer; maybe packageable only if everyone runs the same optimization on the same FSM parameters; the **promise on KPIs/business outcome may differ per case**. Genuinely unknown.
- **CSS "Activate AI" packages caveat:** Gero will share them as a reference, but they're **~10× simpler** (Fusion feature-activation = very low outcome uncertainty, "just switch it on"). SoftServe's packages will need **more caveats and color**.
- **Target verticals not yet set** — Gero defers to **AJ + Milo** (now own quantitative GTM); for now, start with the Fusion-anchored ones (OFS, SCM/OTM) that "just should work," plus opportunistic AIDP.

## Commitments & next steps

**Gero (Oracle):**
- Get SoftServe the **CSS "Activate AI" package deals** (Oracle-internal; "we'll work it out") — as a reference, with the ~10×-simpler caveat. _(His stated closing action item.)_
- Pull the **AIDP professional-services cost component** from his product team (~$200–250K, maybe $300K, for a 6-month CSS-built pilot) as a headline-price reference point.
- After today's AIDP onboarding session, walk through AIDP components and bring in AIDP experts to sanity-check assumptions.
- Loop in **AJ + Milo** on target verticals / quantitative GTM.
- Work on the SoftServe Excel model **over the weekend**.

**SoftServe:**
- **Send Gero the S/M/L model as an Excel file.**
- Build the package model **anchored on OFS first** (Bosch), then **SCM/OTM** — Fusion-anchored, "just should work."
- Structure: **~3 slides per shared solution** (e.g. AI Assistant) **tailorable by vertical** (AI assistant for construction / logistics / healthcare) + more **specific vertical cases** (workforce optimization on OFS).
- Follow up with Oracle **product teams** on how to consume the existing Fusion APIs.
- Treat **AIDP packaging separately** (after today's onboarding).

## Notable quotes

- **Gero:** "Almost like a menu… so even the most lazy account executive can explain it."
- **Gero:** "A really good step zero on the whole ladder would be Bosch… if we can't make it work for this Bosch use case, we might as well stop."
- **Gero:** "When we say integration, we don't mean… a screen within OFS, but that there's a data exchange in the background."
- **Gero (on the L tier):** "I would not put anything in the right bucket where people are like, hold on, what do you mean you hardened it? What is it before?"
- **Gero (on cuOpt packageability):** "I just don't think you could package cuOpt because it's an optimizer… On the other side, if everyone is doing the same optimization on the same underlying parameters in FSM, maybe."
- **Gero (medium-term):** AI Innovation Basket could let customers buy professional services delivered by "a trusted third party like you" — a new SoftServe channel into Oracle's thousands of renewals; today limited to Oracle Consulting by legal liability.

## Follow-up next time

- Confirm with Bohdan the "~80% ready packaging" rumor (Egger/Emil) — what actually exists.
- Reconcile this S/M/L model with the [2026-06-15 whiteboard](../../docs/oracle-packages-tshirt-sizing.md) and SoftServe's internal S/M/XL → single canonical model.
- Resolve the OCI-credits / GPU-cap question and the Fusion↔OCI "attach" path before promising any consumption incentive.
- Decide cuOpt packageability (per-service vs per-outcome promise).
- Get target verticals from AJ + Milo to drive the domain-specific slides.
- Medium-term: pursue the **AI Innovation Basket as a SoftServe channel** (accredited-third-party professional services) — Gero flagged it as a this-FY discussion.
