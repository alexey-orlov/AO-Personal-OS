# Jumpstart — PM-focused offering (design)

_status: program structure v1 authored by Alex 2026-07-14 (working-group + shared work-OS + rolling use-case wave; his Google Doc is the authoritative concept, supersedes the v0.8 design) with a client-ready 2-page outline built and in review; in parallel first live application — GI Partners (PE) PM-upskilling package for portfolio co DAX, due ~Fri Jul 17; Jun–Jul 2026 mandate (Bogdan-driven)_
_updated: 2026-07-14_

## Snapshot

- Mandate: Bogdan tapped Alex to build a comprehensive PM offering on top of Jumpstart's standard ~6-week (sometimes 90-day) "Activation Pod": week-0 mini-discovery (workshops + questionnaire) → agentic-workflow implementation → governance/enablement/training; optional hackathon. Sweet spot: inert, partially-mature mid-size orgs (eng ≲300–1000), not greenfield startups. [walkthrough](calls/2026-06-11_135929_default_20260611130042C37F547F.md)
- Why PM, why now: coverage is weak and it bit — DAX escalation after intelligence engineers ran uncustomized PM workshops (talked JIRA; client uses Aha!); Telenor product teams explicitly waiting for product-workflow agent ideas; product is the LAST domain clients automate (Telenor: zero AI in product; DAX: one team on Claude, PMs resistant); clients don't ask for PM by name yet.
- Pipeline: DAX (flagship transformation case), Telenor (exception — full Discovery done; governance deck critical, EU AI Act enforcement starts Aug), Payworks (.NET legacy modernization, 4 streams ~25 people), Iris (training + hackathon), Commerce IQ (new ~100-person ask, California, legacy modernization), nContracts (QA-specific). Demand driver: PE portfolios (e.g. GI Partners) carrying +20%→35% productivity KPIs by EOY 2026.
- Market read (Inna): coding largely "solved" by mid-2026; residual pain = context management, downstream QA pressure, backlog quality, security, governance, token cost. Positioning reframe: client asks "make us AI-ready" → SoftServe answers "be SDLC-ready" (process/infra is the real blocker). Tool-agnostic stance (Cursor, Claude Code, Copilot, even Devin).
- Assets to build on: legacy 5-level maturity slide (still resonates in presales; clients sit at 1–2); new R&D framework by Inna (built with Claude) — 3 levels × 10 dimensions → heatmap generated from a standard questionnaire; governance materials (data classification, risk tiers, agent permissions, kill switch); tiered training run mostly by Greg; metrics = velocity / quality / adoption (adoption via Jellyfish at DAX; velocity blocked by JIRA hygiene — DAX has no baseline 2 months in).
- Team shape per engagement: PM 0.5 + Architect 0.5–1 + 2 Intelligence Engineers + 1 of DevOps/QA/BA/Product — picking the wrong 4th role is a recurring failure (DAX: chose DevOps, needed QA, then Product).
- Buyer persona: CTO + ~10 VPs; the CPO operates separately and SoftServe has minimal CPO-level relationships — the open GTM question for a PM offering.
- History: Jumpstart methodology originally Alex's; exec ownership since smeared (Arkadiusz + Oleh Marchevich); knowledge-preservation gap (QA module lost with a departing contractor).
- Inna's materials received 2026-06-12 (local Jumpstart folder): ADLC Framework v1.1 (Daxko), Express SDLC Assessment Checklist, Agentic Metrics deck, Daxko ADLC metrics workbook v3, anonymized status reports. The metrics deck's four categories (Velocity / Quality / Developer Experience / Business Outcomes) are likely the "four-metric framework" Inna couldn't name (inferred).
- v0.2 offering draft: [program one-pager](../../../outputs/jumpstart-pm/jumpstart-pm-program-one-pager.md) — Week-0 Express Product Assessment → 6-week Activation Pod (4 workflow stations, 11 PM workflows) → Enablement cohorts; L1–L5 product mapping; PM metrics catalog; product governance pack; addresses the walkthrough's open design questions (readiness gate, skills-library-as-IP, CPO motion flagged as open GTM decision). v0.2 folds in external field evidence: configured-defaults distribution (HubSpot/Shopify/Anthropic), PRD-as-code (GitHub/LaunchDarkly), individual fluency rubric (Zapier), and adoption-reality defenses (MIT GenAI Divide 95%-failure root cause, METR perception gap, Gartner 40%-cancellation, post-pilot plateau tactics).

## Active threads

- **Offering definition** — v0.1 drafted ([one-pager](../../../outputs/jumpstart-pm/jumpstart-pm-program-one-pager.md)); next: review with Inna, then Bogdan. Open decisions carried in the draft: standalone vs. 4th-seat extension of engineering Jumpstart; CPO-direct GTM now vs. after 2 reference cases; PM skills library as SoftServe IP (recommended yes); pricing/sizing for smaller, higher-touch PM pods.
- **DAX PM offering (GI Partners request)** — first live application of the offering. GI Partners asked SoftServe for a PM-upskilling offering for portfolio co DAX; the first deck drew feedback (Jul 13): add trainer **bios** + make it PM-oriented (it "looked made by a technical person"). Team leaning toward proposing **tiered options** — a ~4-week practical training vs. a ~6–8-week program with real implementation ("transformation") — but wary that "transformation" reads as unwanted BCG-style strategy consulting, so keep it short/practical. Context: SoftServe's DAX activation pod has no PM yet is asked to support DAX's PMs; DAX PMs already use Claude (e.g. user stories); a reporting misalignment (PMs report to a VP Product, not the CTO) is now resolved. Deliverable: bios (~2 slides) + offering (~3–5 slides), draft circulated first, due ~**Fri Jul 17**. Blocked on GI Partners' true intent (training vs. outcome) + access to the real request owner (a DAX VP Product) — Speaker A to try a 15-min client scoping call and confirm the deadline with Daniel/Sales. [sync](calls/jumpstart-pm/2026-07-14_194924_sales-call_2026071417472224FB611D.md)

## People

- Inna Abolikhina — presales + program management; walkthrough source; built the 3×10 maturity framework. See [people page](../../people/inna-abolikhina.md).
- Bogdan — exec driver behind the PM extension; gatekeeper for sharing the DAX folder/proposals.
- Nadia Zerchak — PM on DAX; built the Claude skill that generates Jumpstart's process board.
- Jorge Rojas, Inok — engineering leads on Payworks.
- Greg — Poland-based trainer, runs most Jumpstart workshops (LLM/agents intro, coding agents, context engineering).
- Arkadiusz, Oleh Marchevich — exec co-holders of Jumpstart ownership.

## Decisions

- 2026-07-14 — For the GI Partners DAX PM ask, propose **tiered options** (a practical PM training tier vs. a short outcome/"transformation" tier with real implementation), kept weeks-not-months to avoid reading as BCG-style strategy consulting. [sync](calls/jumpstart-pm/2026-07-14_194924_sales-call_2026071417472224FB611D.md)
- 2026-06-11 — Alex owns the design of the PM-focused Jumpstart extension across Jun–Jul 2026. [walkthrough](calls/2026-06-11_135929_default_20260611130042C37F547F.md)

## Open loops

Mine:
- Send the existing draft/full version of the DAX PM proposal to the team (today evening or tomorrow). [sync](calls/jumpstart-pm/2026-07-14_194924_sales-call_2026071417472224FB611D.md)
- Assemble the DAX PM package with the team — trainer bios (~2 slides) + offering (~3–5 slides) framed as tiered options — by ~**Fri Jul 17** (draft circulated first).
- Review the v0.1 one-pager with Inna (~week of Jun 15); fold in feedback, then take to Bogdan.
- Reach out to Nadia Zerchak (DAX) and Jorge Rojas / Inok (Payworks) for project depth. (inferred)

Theirs:
- Speaker A (DAX account/engagement lead) — write the offering structure/outline + bios; ask the delivery team which PM-specific skills were already built for DAX; try to arrange a 15-min client scoping call; confirm the final deadline with Daniel/Sales.
- GI Partners — confirm whether they want training only or training + implementation/transformation; possibly grant access to a client-side owner (DAX VP Product) for a 15-min scoping call.
- Inna: check with Bogdan whether the DAX project folder + proposals can be shared with Alex.

## Activity

- 2026-07-14 — [DAX PM offering sync (GI Partners request)](calls/jumpstart-pm/2026-07-14_194924_sales-call_2026071417472224FB611D.md) — internal team planning for GI Partners' request of a PM-upskilling offering for portfolio co DAX; feedback on the first deck (add trainer bios, make it PM-oriented); leaning tiered options (practical training vs. a short implementation/"transformation" program); package (bios + offering slides) due ~Fri Jul 17, draft first; blocked on GI Partners' true intent + access to the DAX VP Product owner.
- 2026-06-13 — [v0.8 Coverage map](../../../outputs/jumpstart-pm/jumpstart-pm-program-one-pager.md) — added an executive **Coverage map** mapping all 11 PM topics + the foundational artifacts (default repo, context-sources integration, context metadata, training, responsibilities, success-metrics+governance) + the activity formats (workshop / hackathon / brainstorm / live-Slack / pairing) to weeks W0–W6 + Enablement; compressed the redundant body week-list into a one-line spine so the doc stays focused. Self-scored 8.5→9.5→10 over 3 passes against clarity/systematic/non-abundant criteria (Alex's topic+artifact list as the spec).
- 2026-06-13 — [v0.7 implementation appendix](../../../outputs/jumpstart-pm/jumpstart-pm-program-one-pager.md) — added **Appendix A** (context-system build sequence + eval/test method, underperformance triage playbook, day-/week-by-week W0–W6 + Enablement with owners + exit gates + watch-outs, 18-row risk register). Built from a source-grounded research workflow (8 dimensions, adversarially verified) then hardened across **5 adversarial review rounds** (scored 7→8→8→8→8.5; each round citation-checked by fetching sources). Key fixes landed: post-pod handover-cliff risk, pilot-selection-bias risk, eval-as-tests method, context-saturation triage, EU AI Act date correction (Nov-2025 Digital Omnibus → Dec-2027), MIT/Lenny's/HubSpot citation corrections, model-tiering + memory-as-architecture + meeting-intel/deep-research frontier additions.
- 2026-06-12 — [v0.2 field calibration](../../../outputs/jumpstart-pm/jumpstart-pm-program-one-pager.md) — external research sweep (HubSpot, Shopify/First Round, Zapier, Anthropic, Stanford, Lenny's survey, MIT GenAI Divide, METR, Gartner, BCG) folded into the one-pager over 4 review turns; references section now groups company programs / frontier practice / adoption-reality research.
- 2026-06-12 — [v0.1 program one-pager](../../../outputs/jumpstart-pm/jumpstart-pm-program-one-pager.md) — drafted from the walkthrough + all six shared files + SS-todo workflow topics; ready for the Inna review session.
- 2026-06-11 — [Jumpstart program walkthrough with Inna](calls/2026-06-11_135929_default_20260611130042C37F547F.md) — offering shape, pipeline, maturity/governance assets, team shape, buyer persona, PM gaps mapped.
