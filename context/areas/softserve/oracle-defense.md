# Oracle Defense — NATO use-case menu

_status: active — Alex added 2026-08-26 to drive use-case definition: a sellable "menu" of OCI-runnable defense/AI use cases for NATO countries. **Working report + 12-case PoV menu drafted 2026-09-03** ([docs/2026-09-03_nato-ai-use-case-map.md](docs/2026-09-03_nato-ai-use-case-map.md) · [artifact](https://claude.ai/code/artifact/e3f76edc-33ad-40c8-878f-9213f3270530)); suggestions owed in Karsten's shared thread by ~Fri 2026-09-04; the ~Wed 2026-09-02 team call's outcome is not yet in the wiki_
_updated: 2026-09-03_
_source files: FreeTech one-pager (Oksana Petrukh) — [SharePoint](https://softserveinc-my.sharepoint.com/personal/ktram_softserveinc_com/Documents/Microsoft%20Teams-Chatdateien/FreeTech_UseCases_OnePager.pptx) · local copy `~/Downloads/FreeTech_UseCases_OnePager.pptx`_

## Snapshot

- **The ask (Oracle → SoftServe):** Oracle wants a "menu" of use cases it can offer NATO countries — **both miltech companies and military forces** — based on Oracle products. **Hard priority: must run on OCI**; AI Lakehouse / AIDP explicitly not discussed (opportunistic at best). Ideally backed by SoftServe's delivered experience — Oracle "knows we have huge war-related experience but doesn't know how to use it". Karsten: "literally the $100M question — a massive opportunity". (chat with Karsten, ~2026-08-26)
- **Premise check (research 2026-09-03 — [report §4](docs/2026-09-03_nato-ai-use-case-map.md)):** Karsten's "Oracle is **the major private cloud for NATO**" is **not supported by public evidence**. Verified: NCIA's ERP is **Oracle E-Business Suite + Fusion** (Finance, HR, Acquisition, Asset Management); **NCIA selected OCI in Sep 2025** for "mission-critical workloads" + three legacy data centres (Thales prime, Red Reply / Shield Reply — no value, term, region type or classification level published); NSPA codification runs on Oracle Database; a 2019 NCIA–Oracle non-classified cyber info-sharing agreement. The **classified operational tier is Google** (Distributed Cloud air-gapped for JATEC, Nov 2025) **and Palantir** (Maven Smart System NATO, accredited for the classified network 2026-06-22, running Mistral + Meta models); the €200M Protected Business Network (Accenture + Leonardo, 2026–33) runs "across a multi-cloud environment provided by NCIA". **No NATO RESTRICTED/SECRET accreditation is public for any Oracle offering.** Read: Oracle's credible space is the enterprise tier, unclassified analytics, edge, and national MoDs (**UK MoD on Oracle since 2026-01-14**, OFFICIAL-SENSITIVE) — never repeat the "major private cloud" line to a NATO buyer. (inferred from the sources in the report)
- **Customer is undefined by design:** Alex's segmentation probe (drone manufacturers needing offline CV/navigation ≠ missile manufacturers ≠ militaries wanting intelligent battlefield management ≠ defense ministries wanting multi-modal intel processing) → Karsten: "we don't know anything, and need to think about all of those and beyond". The report therefore structures the menu by cluster × buyer (forces/MoDs vs miltech) and names Oracle's own miltech channel — the **Oracle Defense Ecosystem** (3 cohorts of 10 defence-tech firms; Oracle Defence Tech Summit 2026, Brussels).
- **Origin:** the defense thread opened at the [Jul-24 exec-meeting post-mortem](oracle.md) — contact **Bram (Belgium)** via Neil's defense-SVP counterpart. First Oracle defense call ~2026-08-25 (Bram + team, incl. **Michael — from Ukraine**); Karsten requested a follow-up with Michael on high-interest NATO use cases (2026-08-26).
- **Asset base = delivered Ukraine war work only.** "FreeTech" = SoftServe's wartime engagement — non-Oracle, Ukraine-only, no other defense projects so far. Six delivered use cases (table below). **The named gap: no reusable assets** — "the lack of real assets we can show was the major issue" in comparable pursuits (Denys). The report's positioning: SoftServe's proof sits in the **physical/sensor half** of the map (autonomy, signals, edge vision, twins), Oracle's packs in the **enterprise/knowledge half** — the menu bridges the two.
- **NVIDIA angle — Nemotron, decoded ([report §3.2](docs/2026-09-03_nato-ai-use-case-map.md)):** Karsten (from NVIDIA): "#1 Public/Government topic at GTC — everyone will go for it". Nemotron is the fully-open family (weights + data + RL recipes: Nano 30B-A3B · Super 120B-A12B Mar 2026 · Ultra 550B-A55B Jun 2026 · 3.5 Lightning Aug 2026 · Nano Omni multimodal ~May 2026 · Embed/rerank · Parse · Safety Guard · streaming ASR, 40 locales) — the government pitch is "own the model outright: fine-tune on classified data, run air-gapped, no per-token meter". **On OCI it is import-only** onto a Dedicated AI Cluster (Super since 2026-03-11; Ultra NVFP4 needs B200_X4; Nano Omni in OCI Enterprise AI) — not in the hosted on-demand catalog → a cluster line item in every PoV price. No "Nemotron for Government" SKU; AWS GovCloud already runs Nemotron at FedRAMP High / IL5 (Jun 2026) while OCI US-Gov only "plans to host" (Mar 2026). Licence text differs across model cards — verify per model before contracting.
- **Karsten's framing topics** (prep meeting 2026-08-19): **1** Sensor & Detection Network · **2** Data Collection, Analysis & Communication Infrastructure · **3** Command, Control & Decision (C2D) · **4** Air Defence Systems, Drone Interceptors & other Counteractions · **5** Training of Human Capital & Continuous Improvement. The list **omits enterprise/back-office, logistics/sustainment and cyber** — the three most PoV-friendly clusters in every funded source (US Task Force Lima, UK DAIC playbook, DIANA) — the report adds them explicitly ([§3.3](docs/2026-09-03_nato-ai-use-case-map.md)).
- **Sovereignty is the wedge** (Denys): militaries insist on on-prem; NATO accepts Oracle because it is a *private* cloud. Oracle's rungs for the phase-2 conversation: EU Sovereign Cloud (Frankfurt/Madrid; OCI GenAI live; L40S/Hopper/Blackwell) → UK Sovereign Cloud → Dedicated Region (H100–GB200; 5-yr commitment) → Compute Cloud@Customer Isolated (air-gapped, 6–8-week fast-start, 4–48 L40S) → Isolated Region → Roving Edge RED v2 (3× L4).

## The menu — working recommendation (2026-09-03, not yet shared)

Twelve cases in three tiers, each with a one-line PoV scope + a defensible "why" + named NATO-side demand evidence in the report ([§0](docs/2026-09-03_nato-ai-use-case-map.md) table, [§9](docs/2026-09-03_nato-ai-use-case-map.md) cards, scorecard C1–C9):

- **MENU-now** (pack-backed, open/synthetic data, 4–8 wks, ~€60–100K): **#1** ISR footage search & summarisation (VSS pack · Channel 4/Belron · FreeTech #06) · **#2** multi-source intel fusion & daily brief, OSINT-first (AIQ · DHL Client Compass · FreeTech #02) · **#3** doctrine/STANAG/technical-manual assistant (Knowledge Chat pack · Nesma) · **#4** defence procurement & contract document intelligence (Doc Extraction pack · Riyadh Air — sits next to NCIA's EBS/Fusion estate) · **#5** fleet readiness & operations control tower (FreeTech #04 · Lakehouse; the one AIDP/Lakehouse doorway) · **#6** mission logistics optimisation — convoy routing / crew scheduling (cuOpt packs · Bosch WfO) · **#7** coalition speech & multilingual reporting (Nemotron Nano Omni / ASR NIMs).
- **MENU-differentiator** (SoftServe-only proof, needs data/asset framing): **#8** RF signal clustering (FreeTech #03) · **#9** autonomy dev-loop on OCI — synthetic data → train → sim-test (FreeTech #01/#06) · **#10** physics-informed digital twin / surrogate (FreeTech #05 · OMV Physics NeMo).
- **MENU-Oracle-native** (sells OCI/Lakehouse consumption first): **#11** cyber-defence investigation agent · **#12** governed sovereign data layer — classification-aware VPD/masking across DB · Iceberg · agents (Lakehouse QS #6 · NHS masking).
- **Suggested first wave for Karsten's thread: #1 · #2 · #4 · #5, + #3 as the cheap add-on.** **Off the menu:** pilot simulator on a game engine (no data, no asset library), interceptors / air-defence / targeting (kinetic, export-controlled), full COA/wargaming (needs C2 data; phase 2 of #5).
- **PoV fit criteria used (C1–C9):** unclassified/synthetic data path · baseline exists or is built in-PoV · W0 gate (sponsor + metric + access signed) · GA components only · a visible UI in 10 minutes · non-kinetic, human decides · repeatable across nations · Nemotron/open-weight path · KPI readout, not ROI promise. Derived from the SBG access lesson, Sky/Bosch baseline lessons, Hammad's "people are weary of pilots", Bohdan's value-realisation discipline.

## Delivered use-case base (FreeTech one-pager, shared 2026-08-25)

| # | Delivered use case | What it proves | → menu |
|---|---|---|---|
| 01 | Autonomous last-mile air delivery | Fail-safe AI navigation under lost pilot / GPS / signal; real-time monitoring + obstacle avoidance; finish-mission-or-return autonomy | #9 |
| 02 | Foresight analytics engine | Multi-source data fusion → faster threat detection; automated routine analysis → actionable, customizable intelligence reports | #2 |
| 03 | Radio cluster intelligence | Automated RF signal clustering, pattern recognition, multi-layer visualization — raw signal data → real-time insight (SIGINT) | #8 |
| 04 | Operations control tower | Real-time fleet readiness, mission tracking, resource allocation + performance analytics and maintenance planning in one platform | #5, #6 |
| 05 | UUV digital twin | Physics-informed sim (coupled CFD/PINN) for underwater vehicles, 50′–250′ depths, NVIDIA Omniverse visualization — cut testing time/cost | #10 |
| 06 | EdgeInsight visual intelligence | NVIDIA edge vision (Jetson/DeepStream + TAO, AWS Greengrass) for real-time inspection/safety; scalable OTA deployments incl. offline | #1, #9 |

Capability strip: AI/CV · autonomous systems · digital twins & simulation · signal intelligence · real-time analytics & BI · command & control. Sectors served: Defense · Public Safety · Energy · Manufacturing · Mining & Metals · Automotive. ⚠ Per-case **reusable-asset status (IP ownership, code vs know-how) unknown** — and #06's AWS Greengrass dependency needs an OCI edge answer (Roving Edge / OKE at edge) before it is shown to Oracle.

## Ideas floated so far (team chat 2026-08-25/26)

- **Control Tower analogue** — Denys: the simplest, plenty of visual + buzz; Dmytro: "too back-end-ish" → became menu #5 with a watchdog + planning UI to answer the objection.
- **Pilot simulator** — on a **game engine, not Omniverse** (Denys: too slow); Dmytro: "we are not there yet" — no data, no library of visual assets → bench.
- **Quick deployment of NVIDIA-related assets** — compelling, same maturity caveat (Dmytro) → the packs' Terraform deploy is the menu's spine.
- **Reuse civil-sector Oracle use cases** (Dmytro) + Bohdan's assignment to Alex: **reuse the existing Oracle AI Packs × military expertise** → report §6–§7 (15 of the 24 existing L2 patterns re-skin to a high-applicability defence job; 4 defence-specific L1 additions carry the FreeTech proof). Pack map: [oracle-ai-offerings](oracle-ai-offerings.md).
- Bohdan: narrow it to "a path that is easy for our counterparts to consume". Dmytro's fork (wait for Bram's ideas vs invest in a solution accelerator) → both in parallel: "think all together, define, prioritize, estimate and then decide". Denys: we need something feasible to SHOW either way.

## People

- Karsten Tramborg — SoftServe NVIDIA/Oracle relationship gateway (full entry in [oracle.md](oracle.md)); drives this stream, holds the NVIDIA + Oracle-defense contacts.
- Bohdan Khomych — brought Alex in 2026-08-26 ("help drive it this week"); back from vacation 2026-08-31 → [people page](../../people/bohdan-khomych.md)
- Dmytro Ivanov — SoftServe R&D; shaped the 2026-08-19 prep-meeting agenda; pushes "define, prioritize, estimate, then decide" (whether he is the PdM-team "Dmytro" unresolved).
- Denys Godovannyi — SoftServe R&D, simulation/technical depth (Omniverse-vs-game-engine calls); floated Control Tower + simulator.
- Oksana Petrukh — built the FreeTech one-pager (shared 2026-08-25, edit mode).
- Bram (Belgium) + team — the Oracle-side defense counterparts (inferred; surfaced via Neil's defense-SVP counterpart); **Michael** (Oracle, from Ukraine) the named use-case discussion partner.

## Decisions

- ~2026-08-26 — Deadline negotiated with Karsten: use-case suggestions by **end of next week** (~Fri 2026-09-04), in the shared thread — Karsten wanted "asap" ("tomorrow would have been a challenge"). (chat)
- 2026-08-26 — Team call proposed for **Wed 2026-09-02** (Mon Aug 31 UK bank holiday, Tue Sep 1 UA school day); AI-packs ↔ needs pre-alignment to happen before it. (thread)

## Open loops

Mine:
- **Post the NATO use-case menu in Karsten's thread by ~Fri 2026-09-04** — draft ready: lift the report's §0 (12 rows + tier legend + "not on the menu" line + the first-wave call) into a one-pager; decide whether to lead with the first wave (#1/#2/#4/#5 + #3) or the full 12.
- **Oksana + Denys pre-alignment** — bring the §9 cards + the **NATO pattern map** ([docs/2026-09-03_nato-pattern-map.csv](docs/2026-09-03_nato-pattern-map.csv); xlsx twin delivered for OneDrive `Projects/Oracle/Use case maps/`) as the packs ↔ needs mapping; collect per-case reusable-asset status for FreeTech 01–06 and the OCI answer to #06's Greengrass dependency.
- **Re-check the NATO map against the deck renderings** (partnership-vision + Business Alignment pptx in OneDrive — not reachable from the cloud session) before any slide is cut; the NATO cards were built from the Sheet twin of the xlsx.
- **Fold the Sep-2 team call outcome** (⚠ not in the wiki; if it happened, its steer supersedes the report's tiering).
- Nemotron drill-down — done in the report; residue: verify licence text per model and whether Nemotron import works in the EU Sovereign Cloud.

Theirs:
- Karsten — meeting with Michael (Oracle) on NATO-priority use cases (requested 2026-08-26, not yet scheduled).
- Bram + team (Oracle) — their relevant use-case ideas awaited.
- Oracle (via Karsten) — the load-bearing unknown: **what NCIA actually bought in Sep 2025** (deployment model, classification level, inside the PBN multi-cloud or not), and which region types / GPU shapes are in play for NATO work.
- Bohdan — steer on tiering and on the miltech-vs-forces lead buyer.

## Activity

- 2026-09-03 — [NATO pattern map](docs/2026-09-03_nato-pattern-map.csv) — the card-level adaptation of the Business-Alignment map (7 L1 × 24 L2 + 4 EXT L1s; 92 defence cards with AIDP / NVIDIA / Oracle-AI fit, Applies / Proof / Menu / Highlight-view columns; report §6.1); xlsx delivered to Alex.
- 2026-09-03 — [NATO AI use-case map — working report](docs/2026-09-03_nato-ai-use-case-map.md) — four angles (defence-AI clusters with OCI/NVIDIA/SoftServe coverage · Oracle × NATO known ground · FreeTech base · the 7-L1 map adapted + packs mapping), a starting-point list, PoV scorecard C1–C9 and a 12-case menu with first wave #1/#2/#4/#5 + #3; premise corrected (enterprise-tier Oracle inside a multi-cloud NCIA) and Nemotron-on-OCI decoded (import-only onto a Dedicated AI Cluster). Published as an artifact for the brainstorm.
- 2026-08-29 — Stream folded: Bohdan's DM + Karsten clarification chat + "Oracle Defense - prep meeting" thread history + FreeTech one-pager contents — page created. (chat, 2026-08-29)
