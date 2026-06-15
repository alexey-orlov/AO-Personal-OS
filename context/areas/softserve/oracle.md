# Oracle partnership — joint IP

_status: onboarding — Phase 1 (through end of Jun 2026): reactive familiarization with Oracle's three NVIDIA-built packages (AIQ / cuOpt / VSS) via Karsten as the single Oracle gateway; AIDP co-sell parallel. Next: Tue Jun 16 first Oracle call, Wed Jun 17 R&D cross-team update._
_updated: 2026-06-15 (packages whiteboard captured)_

## Snapshot

- SoftServe is Oracle's first integrated partner on this IP: contributes PRs, holds a weekly sync. NHS (UK) is the first paying client using the IP. GTM via SoftServe + NVIDIA. [1:1 2026-06-09](calls/2026-06-09_183633_one-on-one_2026060917013100B193F3.md)
- Funding model on cuOpt POCs: NVIDIA (and possibly Oracle) underwrites the initial POC; client pays only if it scales — Olha's ~80% read, needs confirmation from Bohdan. [Olha sync 2026-06-12](calls/oracle/2026-06-12_151312_one-on-one_20260612143223E84CB5DA.md)
- Oracle/NVIDIA package framing crystallized 2026-06-15: SoftServe is onboarding to three NVIDIA-built packages — **AIQ** (agentic enterprise research; AIQ Kit AR-glasses + furniture-placement is a new demoable use case), **cuOpt** (labeled "QOPT" in Oracle/SoftServe shorthand; workforce + route optimization; Bosch is the reference case), **VSS** (visual analysis). S/M/L sizing — S = PoC/PoV (per use case, value-proof), M = Integration (OFS/SCM&OTM/Altradocs/Fusion apps, component-wise), L = Product (advanced AI telemetry, local-market tailoring, tech hardening); AIQ + cuOpt span all tiers — is a whiteboard sketch, not validated; cuOpt repeatability beyond narrow verticals (e.g. retail workforce) is genuinely uncertain. [1:1 2026-06-15](calls/oracle/2026-06-15_200833_one-on-one_20260615190118D7E7175C.md) · [packages whiteboard](../docs/oracle-packages-tshirt-sizing.md)
- Active client pipeline by package: **cuOpt** — Bosch (3–4 weeks into testing, FE off, allocations winding down), DHL (early stage); Bin Laden Group dropped. **AIQ** — Riyad Air (text-recognition; Dmytro Duchenko owns — earlier characterized as cuOpt; reclassified 2026-06-15). [Olha sync](calls/oracle/2026-06-12_151312_one-on-one_20260612143223E84CB5DA.md) · [1:1 2026-06-15](calls/oracle/2026-06-15_200833_one-on-one_20260615190118D7E7175C.md)
- All Oracle stakeholder access routes through **Karsten** (NVIDIA partner sales) — single gateway by decision; targeted 1:1 follow-ups with each package owner come through him. NVIDIA relationship currently closer than Oracle's; potential GTC US speaking slot if a SoftServe case lands well. [1:1 2026-06-15](calls/oracle/2026-06-15_200833_one-on-one_20260615190118D7E7175C.md)
- Bosch POC retrospective (Speaker A's read): ~2.5 months / 2.5 FTE; most time lost to client comms gaps, not implementation. Practice can't absorb this pattern across multiple cases — billing model decision: value-based on first engagements (learning phase), managed-services / hourly only from Phase 2. [1:1 2026-06-15](calls/oracle/2026-06-15_200833_one-on-one_20260615190118D7E7175C.md)
- Bosch POC shape (reference case): cuOpt-based dispatcher assigning field technicians to zones; custom UI + custom backend wrapper around cuOpt; OFSR (intra-zone routing) explicitly out of scope. Workflow handles stable baselines, sick-leave substitutions, and locked visits — none native to cuOpt, all built on top. Started 2026-04-06; ~2 weeks discovery+workshops, then build. Team: 2 BE full, 1 FE variable (off near end), TL ~0.5→0.25, PM/BA (Olha) ~0.5→0.25, Oracle DevOps. [Olha sync](calls/oracle/2026-06-12_151312_one-on-one_20260612143223E84CB5DA.md)
- Productization framing per Olha (PM/BA on Bosch): a universal product is unrealistic; the realistic play is standardizing the *engagement process* — fixed-scope cuOpt POC packages. "Packages" lacks a shared definition across stakeholders; the SoftServe-side Oracle "packaging" meetings ran with Olya Hanushchak (FE) and Vlad Selyotkin (architect), not Olha. [Olha sync](calls/oracle/2026-06-12_151312_one-on-one_20260612143223E84CB5DA.md)
- The product mode of Alex's R&D role: joint-IP development — packaging the IP into S/M/L offerings; the other mode (productization on client engagements) lives at the area level.
- The R&D PdM team (Leonid, Dmytro, Olya, Vladyslav — ~4–5 PdMs) maps onto this work; an early deliverable is aligning the PdMs to the S/M/L packages and sketching "Roadmap v0".
- AIDP (AI Data Platform) — Oracle's Databricks/Snowflake answer (Medallion architecture, Iceberg first-class, multi-cloud) — is a parallel Oracle motion now opening for SoftServe co-sell + delivery. Intro/enablement call on 2026-06-12 with Milo / Amit / Gero; SoftServe (Vladimir, Stefan, Sergey) pushed on differentiation, SAP, NVIDIA, migration accelerators, sandbox. Now in early enablement / joint-GTM shaping. [AIDP sales call](calls/oracle/2026-06-12_173159_sales-call_2026061216024378A29A99.md)
- AIDP differentiation Oracle leads with: 20–60% TCO advantage on migrated workloads, forthcoming ontology/semantic-layer SKU, zero-copy catalog-of-catalogs, multi-cloud + on-prem. Acknowledged gaps: no dedicated Databricks/Snowflake migration tooling, NVIDIA Enterprise AI / Omniverse not a top priority, SAP S/4HANA native connector not confirmed. [AIDP sales call](calls/oracle/2026-06-12_173159_sales-call_2026061216024378A29A99.md)
- NDA blockers in flight on AIDP-adjacent deals (separate workstreams): SPG (ball in client's court, Khaled chasing 2x), NHS (Oracle chasing, ~50K medical records complexity), DHL (debating whether existing Oracle-customer status removes NDA need). Gero owns the chase. [AIDP sales call](calls/oracle/2026-06-12_173159_sales-call_2026061216024378A29A99.md)
- SoftServe has unused Oracle subscription credits that could fund an AIDP pilot — Pavel owns the check. [AIDP sales call](calls/oracle/2026-06-12_173159_sales-call_2026061216024378A29A99.md)

## People

- Dmytro Duchenko — PdM on Riyadh Air cuOpt case; currently on vacation. (Likely the "Dmytro" of the PdM-pair Alex meets first.)
- Olya — second PdM Alex meets first (new, replacing Semenov).
- Olha Terendii (oterend@softserveinc.com) — PM/BA on the Bosch POC; the contextual entry-point for Alex into the cuOpt-POC pipeline. Was excluded from the Oracle packaging meetings and points him onward.
- Olya Hanushchak — FE on the Bosch POC; attended the Oracle packaging meetings — Alex's next contact for technical depth + packaging context. Contact to come from Olha.
- Vlad Selyotkin — architect; co-attendee of the Oracle packaging meetings with Olya Hanushchak.
- Bohdan — engagement lead / decision-maker on POC funding split (same Bohdan/Bogdan referenced elsewhere in the SoftServe engagement).
- Leonid, Vladyslav (joining) — rest of the PdM team.
- Oracle leadership + weekly-sync participants — intro pending (via the engagement lead).
- Vladimir — SoftServe partnership/account lead on the Oracle AIDP motion; owns next-steps + joint-GTM follow-up with Milo. [AIDP sales call](calls/oracle/2026-06-12_173159_sales-call_2026061216024378A29A99.md)
- Stefan — SoftServe CTO Germany; led the differentiation, NVIDIA, and SAP questions on the AIDP call. [AIDP sales call](calls/oracle/2026-06-12_173159_sales-call_2026061216024378A29A99.md)
- Sergey — SoftServe; owns the migration-accelerator and sandbox-access asks on AIDP. [AIDP sales call](calls/oracle/2026-06-12_173159_sales-call_2026061216024378A29A99.md)
- Pavel (SoftServe) — owns the check on existing SoftServe Oracle subscription credits that could fund an AIDP pilot. [AIDP sales call](calls/oracle/2026-06-12_173159_sales-call_2026061216024378A29A99.md)
- Milo (Oracle) — sales/partner-facing lead on AIDP; owns commercials + joint-GTM follow-up. [AIDP sales call](calls/oracle/2026-06-12_173159_sales-call_2026061216024378A29A99.md)
- Amit (Oracle) — Black Belt, AIDP analytics specialist; ran the deck and live demo. [AIDP sales call](calls/oracle/2026-06-12_173159_sales-call_2026061216024378A29A99.md)
- Gero (Oracle) — senior sponsor on AIDP; owns the NHS / DHL NDA chase. [AIDP sales call](calls/oracle/2026-06-12_173159_sales-call_2026061216024378A29A99.md)
- Karsten — NVIDIA partner sales; single gateway for SoftServe ↔ Oracle stakeholder access on the NVIDIA-built packages. [1:1 2026-06-15](calls/oracle/2026-06-15_200833_one-on-one_20260615190118D7E7175C.md)
- Patrick — tech lead on Riyad Air (AIQ case); tentative Wed-update presenter, comfort presenting TBD. [1:1 2026-06-15](calls/oracle/2026-06-15_200833_one-on-one_20260615190118D7E7175C.md)
- Lyudmyla — SoftServe marketing; holds the AIQ Kit furniture-placement demo video. [1:1 2026-06-15](calls/oracle/2026-06-15_200833_one-on-one_20260615190118D7E7175C.md)
- Vishnu — Oracle-side contact at the Tue Jun 16 call; owns the ask on whether SoftServe can internally GTM-promote the Oracle UI prototypes. [1:1 2026-06-15](calls/oracle/2026-06-15_200833_one-on-one_20260615190118D7E7175C.md)

## Decisions

- 2026-06-15 — All Oracle stakeholder outreach routes through Karsten (NVIDIA partner sales); after Tue Jun 16 first Oracle call, request peer-to-peer monthly syncs with each package owner (AIQ / cuOpt / VSS) through him. [1:1 2026-06-15](calls/oracle/2026-06-15_200833_one-on-one_20260615190118D7E7175C.md)
- 2026-06-15 — Phase 1 (through end of Jun 2026): reactive familiarization with Oracle's packages; Phase 2: generalize the practice and productize. [1:1 2026-06-15](calls/oracle/2026-06-15_200833_one-on-one_20260615190118D7E7175C.md)
- 2026-06-15 — First Oracle engagements (Bosch-style) billed on value, not hours (learning phase); managed-services / hourly model only from Phase 2 onward. [1:1 2026-06-15](calls/oracle/2026-06-15_200833_one-on-one_20260615190118D7E7175C.md)
- 2026-06-15 — Wed Jun 17 cross-team update pitch goal: neutral-to-positive perception, not a stretch pitch — downside risk (looking weak in front of sales / CTO) > upside of overselling. [1:1 2026-06-15](calls/oracle/2026-06-15_200833_one-on-one_20260615190118D7E7175C.md)
- 2026-06-12 — AIDP (AI Data Platform) introduced as a second Oracle co-sell motion alongside cuOpt; SoftServe to start with enablement (sandbox + collateral) and shape joint-GTM packaging with Milo. [AIDP sales call](calls/oracle/2026-06-12_173159_sales-call_2026061216024378A29A99.md)
- 2026-06-12 — Sync with Olya Hanushchak (Bosch FE, packaging-meeting attendee) and Dmytro Duchenko (Riyadh Air) before forming a productization view → they hold the technical detail and packaging context Olha lacks. [Olha sync](calls/oracle/2026-06-12_151312_one-on-one_20260612143223E84CB5DA.md)
- 2026-06-09 — Onboarding sequence agreed: case-study deck → meet Dmytro & Olya → feedback to the lead → intro to Oracle leadership + weekly session. [1:1](calls/2026-06-09_183633_one-on-one_2026060917013100B193F3.md)

## Open loops

Mine:
- Tue 2026-06-16 — Attend first Oracle call: light self-intro ("first time joining, leading product initiatives in R&D, moving to California"); identify which Oracle stakeholders own which package; do not try to drive agenda.
- Wed 2026-06-17 — Present at R&D cross-team update (30-min slot): Bosch cuOpt, Riyad Air AIQ, AIQ Kit furniture demo (covering Dmytro's portion in his PTO absence). Rehearse Wed morning.
- This week — Ping Olya, Leonid, Patrick re Wed slot; ask Patrick to help build the deck by EOD Tue using the established template; check whether Patrick is comfortable presenting.
- This week — Get the AIQ Kit furniture-placement video from Lyudmyla for the deck.
- Post-Oracle-call — Via Karsten: arrange targeted 1:1 follow-ups with AIQ / cuOpt / VSS product leads; ask who owns final accelerator/package decisions on Oracle's product side; request peer-to-peer monthly sync per package owner.
- Re-confirm with Bohdan whether the client pays anything for the initial POC (Olha's ~80% read: no).
- Get Olya Hanushchak's contact from Olha, then sync with her on Bosch technical depth + the Oracle packaging meetings.
- Sync with Dmytro Duchenko after his vacation on Riyad Air AIQ / text-recognition.
- After Olya/Dmytro syncs: form own view on productization viability — universal product vs. standardized engagement SKUs (Oracle may be leaning toward shaped/templatized process: questionnaire → branching → vibe-coded UI per case).
- After meeting the PdMs: align team ↔ S/M/L packages, sketch Roadmap v0; decide whether to introduce Olya/Leonid to package-owner conversations once cadence is established.

Theirs (engagement lead):
- Intro Alex to Karsten (gateway to all Oracle stakeholder access).
- Send the Oracle case-study deck (outstanding since 2026-06-09).
- Share previous monthly-update deck template + the chat thread with the AIQ Kit video.
- Coach Alex on AIQ Kit positioning (Speaker A may cover that portion of Wed update himself given Dmytro's PTO).
- Continue pushing two Olyas (Hanushchak + Terendiy) to publish Oracle clickable UI prototypes on the SoftServe internal portal so sales can demo.
- At Tue Jun 16 Oracle call — ask Vishnu whether internal go-to-market promotion of the Oracle UI prototypes is OK.

Theirs (Olha Terendii):
- Send Olya Hanushchak's contact to Alex.
- Maybe share the Oracle "high-level proposal" doc / Oracle UI reference (tentative).

Theirs (Oracle — AIDP):
- Amit — sandbox / dev-environment access for SoftServe AIDP enablement (checking with product mgmt; Milo confirmed direction).
- Amit — send architecture diagram for "fully-on-Oracle" customer footprint.
- Milo / Speaker G — share internal HTML AIDP-vs-Databricks cost-comparison tool.
- Speaker G — full inventory of AIDP migration accelerators vs. Databricks/Snowflake (incl. ETL/migration agents, Terraform/batch heritage).
- Oracle — white paper on the "AIDP-as-mediator" story for all-Oracle estates.
- Confirmed list of out-of-the-box SAP connectors (esp. S/4HANA, BTP).
- Gero — chase NHS and DHL NDAs; report back on movement.
- Milo — host follow-up next-steps conversation with Vladimir on joint GTM / packaging / pilot path.

Theirs (SoftServe partnership team — AIDP):
- Pavel — check existing SoftServe Oracle subscription credits as possible AIDP-pilot funding (request from Vladimir).
- Vladimir — set up the GTM/packaging/pilot follow-up with Milo.
- SoftServe AIDP team — once sandbox lands, ramp hands-on AIDP expertise before next client engagement.

## Activity

- 2026-06-15 — [Packages whiteboard captured](../docs/oracle-packages-tshirt-sizing.md) — S/M/L T-shirt sizing sketch (PoC/PoV · Integration · Product; AIQ + cuOpt as cross-tier capabilities) from the 2026-06-15 1:1, transcribed to docs.
- 2026-06-15 — [1:1: Oracle packaging + Wed update prep + Karsten gateway](calls/oracle/2026-06-15_200833_one-on-one_20260615190118D7E7175C.md) — three-package framing (AIQ / cuOpt / VSS); Riyad Air reclassified as AIQ; Karsten = single Oracle gateway; Phase 1 / Phase 2 timing; value-based billing for first engagements.
- 2026-06-12 — [AIDP sales/enablement call — Oracle ↔ SoftServe](calls/oracle/2026-06-12_173159_sales-call_2026061216024378A29A99.md) — Oracle introduced the AI Data Platform; SoftServe pushed on differentiation, SAP, NVIDIA, migration accelerators, sandbox; joint GTM follow-up open.
- 2026-06-12 — [Olha Terendii sync — Bosch POC + Oracle productization](calls/oracle/2026-06-12_151312_one-on-one_20260612143223E84CB5DA.md) — pipeline shape, Bosch case detail, Olha's productization framing; next contacts identified.
- 2026-06-09 — [1:1: Oracle context + onboarding sequence](calls/2026-06-09_183633_one-on-one_2026060917013100B193F3.md) — partnership shape and Alex's entry path set.
