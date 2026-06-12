# Jumpstart for Product — AI Activation Program for PM Organizations

_v0.1 draft for discussion with Inna / Bogdan · 2026-06-12 · owner: Alex Orlov_

## Executive summary

A 6-week Activation Pod (plus Week-0 assessment) that takes one product team from ad-hoc chat use to agent-supported product workflows — then scales by cohort, exactly like the engineering Jumpstart. Same proven spine (assess → baseline → activate → enable → hand over), new payload: the eleven PM workflows where product orgs lose time today. The wedge is already in our own data: with coding largely solved by mid-2026, the residual pain Inna names — backlog quality, context management, spec gaps — sits **upstream, in product**. Yet product is the last function clients automate (Telenor: zero AI in product; DAX: one team on Claude, PMs resistant), while PMs gain the most leverage from agents — the gap between "knowing what to build" and "shipping it" is collapsing. Engineering Jumpstart makes delivery faster; this program fixes what then becomes the bottleneck — the quality and speed of what product feeds into delivery. **First deployments are waiting in the existing pipeline:** DAX (PM gap already escalated; relationship in place) and Telenor product teams (explicitly waiting for product-workflow agent ideas; governance angle opens the door).

**Positioning mirror:** clients ask "make our PMs AI-ready"; we answer "make your product operating system AI-ready" — context, artifact hygiene, and governance are the real blockers, not tool skills. (Same reframe as "AI-ready → SDLC-ready" on the engineering side.)

## Where it sits in the SoftServe maturity model (L1–L5)

| Level | Engineering definition | Product equivalent (proposed) |
|---|---|---|
| **L1 Code Assistant** | autocomplete, single-file | ad-hoc ChatGPT/Claude drafting; no shared context, every PM prompts from scratch |
| **L2 Guided Development** | context-aware, KB-connected | skills work from the real stack (Jira/Aha!, Confluence, analytics via MCP); product context system in place |
| **L3 Delegated Engineering** | end-to-end features, human supervises | agents own workflow segments — insight triage, PRD/story drafting, prototype generation — PM reviews and approves |
| **L4 Coordinated Engineering** | multi-agent across SDLC | always-on agents across the product lifecycle: continuous competitor/insight monitoring feeding discovery |
| **L5 Software Factory** | autonomous, humans set guardrails | out of scope this program |

Clients sit at L1 (often below their own engineering org). **Program target: L1 → L3 for the pilot team, with the L2 foundations built to scale.** Maturity is measured with an extension of Inna's 3×10 questionnaire-to-heatmap framework, adding product dimensions (context readiness, artifact hygiene, insight-flow maturity, governance of customer data).

## What we automate — the PM workflow map

Grouped into four stations; each gets skills built on the client's actual tool stack during the pod:

1. **Context foundation** — the product context system: a versioned repo of strategy, positioning, personas, metric definitions, voice + MCP connections to the system of record (Jira/Aha!/Productboard, Confluence/Notion, analytics, call libraries). Built FIRST — context quality, not prompt skill, is what makes every downstream workflow work.
2. **Discovery & insight** — customer insights triage (support tickets, interviews, NPS), market research briefs, competitor monitoring, product analytics → automated "what changed and what to do" TLDRs instead of dashboard archaeology.
3. **Definition & delivery** — PRD/epic shaping, feature breakdown, story + AC writing (reuses the proven ADLC Define-phase skills: PM Shape Epic / Shape Features / Write Story), and **prototype-first definition**: PM-built working prototypes to ~70–80% replace long PRDs as the alignment artifact where suitable, with a short companion doc carrying metrics and guardrails.
4. **Communication & ops** — stakeholder updates, release communication, personal productivity, product knowledge base maintenance. Anything customer- or exec-facing ships only on named human approval.

The map applies to both customer-facing and internal product orgs; Week 0 picks the 2–3 stations with the highest pain for the pilot, not all four at once.

## Program structure

**Week 0 — Express Product Assessment** (reuses the Express SDLC Assessment pattern: intake form + 3–4 working sessions + readout). Outputs: maturity heatmap, ranked pain points, pilot team + use cases, **readiness gate** — frozen metric definitions and 2 sprints of baseline data, system-of-record hygiene confirmed (AC fields, backlog structure), licensing + data-handling sign-off. Hard lesson from DAX: no baseline = unprovable impact; and skills are customized to the client's actual stack (DAX escalated because workshops talked Jira while the client ran Aha!).

**Weeks 1–6 — Activation Pod** (one pilot product team / PM triad):
- **W1** Foundations: build the product context system, connect MCPs, intro training (incl. the core working discipline: roll context in, force clarifying questions, block premature deliverables — treat the model like an eager junior), baseline snapshot, friction log opened.
- **W2** Definition station live: epic/PRD/story skills on the real backlog; champion pairing sessions per PM.
- **W3** Discovery & insight station: triage pipeline + research/competitor skills; analytics TLDR.
- **W4** Prototype-first definition + communication station (human-approval gates configured).
- **W5** Automation: recurring agents (weekly competitor digest, insight triage, metrics TLDR); handoff handshake into engineering (pre-grooming contract — composable with engineering Jumpstart/ADLC if present).
- **W6** Measure, report, hand over: metric delta vs. baseline, outcomes report, playbook, Go/No-Go to Enablement.

Each week has a written Go/No-Go signal owned by the team champion (same mechanics as the ADLC rollout: champions, weekly micro-retros, friction log, pairing sessions).

**Adoption design for resistant PMs** (the known failure mode): pick the pilot team from early adopters, not skeptics — wins pull the rest; champions get protected 10–15% AI time per sprint as a participation prerequisite; skeptics convert on demonstrated time-back, not training hours. Same plays as the leaders/laggards research, applied to product roles.

**Then — Enablement cohorts**: 4–5 product teams per cohort, 4–6 weeks each, champions coach adoption, optional hackathon. Steady state: Working Group owns the skills library; no consulting dependency.

## Metrics (baseline 2 sprints before; never rank individuals; report quarterly)

| Category | Metrics | Target / guardrail |
|---|---|---|
| Adoption (leading) | skill adoption rate per workflow; % artifacts AI-assisted | ≥80% within 3 sprints |
| Velocity | requirements cycle time (idea → dev-ready); documentation throughput; time-to-insight; prototype turnaround | ↑ vs. baseline |
| Quality | AI-draft rework rate; pre-grooming readiness rate; mid-sprint clarification requests | rework ≤10–15% |
| Experience & business | PM DX score; time saved per role/sprint | DX ≥4.0/5 |
| **Guardrails** | downstream defect escape, mid-sprint scope change | must not degrade — speed at the cost of spec quality is the failure mode |

Pair telemetry with the DX survey — divergence between "what happened" and "how it feels" is the single most informative adoption signal. Expect the J-curve: a ~3-month dip with enablement, 12+ months without (DORA 2026). Make the Wave-1 regression explicit in the governance narrative or one bad sprint kills a good skill.

## Governance & processes set up (the "basic processes" deliverable)

Extends the existing visibility / policy / enforcement operating model to product surfaces:
- **Visibility:** AI tool inventory incl. shadow AI in product roles; usage telemetry.
- **Policy:** risk tiers (T1 drafting assistant → T3 agent with write access to roadmap/customer comms); data classification for customer interviews, support tickets, PII in insight pipelines; human-in-the-loop checkpoints per tier; AI never publishes externally without a named approver.
- **Enforcement:** approved-tools registry, secret/PII scanning on prompts, audit trail, kill switch; token budgets per pod (token economics are a board-level topic since the metering shift).

EU AI Act (enforcement from Aug 2026) makes the governance module a door-opener for EU product orgs — proven at Telenor.

## Engagement team & buyer

**Pod:** Product Lead 0.5 FTE (offering owner) + 1–2 Intelligence Engineers + Product Ops/BA 0.5. This fixes the recurring "wrong 4th seat" failure on engineering pods — product expertise is in the core team, not an afterthought.
**Buyer today:** CTO + VPs (existing relationships; DAX/Telenor product teams already waiting for product-workflow agent ideas). **CPO direct motion = open GTM question** — product orgs buy separately from CTOs; the PE-portfolio productivity mandate (GI Partners: +35% by EOY 2026) is the likely entry argument.

## What the client keeps (no lock-in)

Product context system + skills library (versioned, on their marketplace) · maturity heatmap + baseline workbook · trained champions + role-based onboarding content · governance pack (tiers, registry, approval gates) · playbook + 6–12 week scale roadmap · pilot impact report.

## Reused SoftServe practice → where it lands here

| Proven practice (source) | Reused as |
|---|---|
| Express SDLC Assessment checklist | Week-0 Express Product Assessment |
| Inna's 3-level × 10-dimension heatmap | extended with product dimensions |
| ADLC Define-phase PM skills + Jira conventions ("one reader, one contract") | Definition station + artifact hygiene gate |
| Baseline workbook, 2-sprint rule, wave Go/No-Go signals (Daxko) | metrics framework + weekly gates |
| Champions / pairing / friction log / micro-retro playbook (ADLC §12) | pod adoption mechanics |
| Governance operating model + risk tiers + kill switch (sales-enablement deck) | product governance pack |
| Velocity / Quality / Experience / Business metrics framing (Agentic Metrics deck) | metric categories above — likely the "four-metric framework" from the walkthrough (inferred) |
| "What you keep" handover model, Activation→Enablement→Agentic Team scaling | program arc |
| Tiered training curriculum (Greg's workshops: LLM/agents intro → applied skills → context engineering) | adapted as the PM training track, taught on the client's own backlog |
| 10–15% protected adoption time per sprint (MIT TR × SoftServe research) | prerequisite for participating teams |

## Open decisions (for the Inna/Bogdan session)

1. Standalone offering vs. 4th-seat extension of engineering Jumpstart — or both, with the extension as the land motion?
2. CPO-direct GTM: build now or after 2 reference cases via CTO-sponsored pilots?
3. Referential PM skills/agents library as SoftServe IP (vs. case-by-case Claude-generated) — recommend yes: it's the scaling asset, the moat, and the fix for the knowledge-preservation gap (the QA module was lost with one departing contractor).
4. Pricing/sizing parity with engineering pods, given PM pods are smaller but higher-touch.

---
_Sources: Jumpstart walkthrough w/ Inna 2026-06-11 (call note in context/areas/softserve/calls/); ADLC Framework v1.1 (Daxko); Express SDLC Assessment Checklist v1.0; Daxko ADLC Metrics workbook v3; Agentic Metrics deck; Jumpstart anonymized status reports (May 2026); SS Todo note (PM workflow topics); knowledge base: ai-and-the-pm-craft theme (prototypes-replace-PRDs `pi-j1IOG8WoW1A-03`, dashboards→TLDR `pi-j1IOG8WoW1A-02`, restrain-the-eager-junior `pi-yDeFGKaSoX8-02`, PMs-ride-models `pi-4D3hDmGhFhA-06`)._
