# Oracle Defense — NATO use-case menu

_status: active — Alex added 2026-08-26 to drive use-case definition: a sellable "menu" of OCI-runnable defense/AI use cases for NATO countries; suggestions owed in the shared thread by ~Fri 2026-09-04; team call ~Wed 2026-09-02_
_updated: 2026-08-29_
_source files: FreeTech one-pager (Oksana Petrukh) — [SharePoint](https://softserveinc-my.sharepoint.com/personal/ktram_softserveinc_com/Documents/Microsoft%20Teams-Chatdateien/FreeTech_UseCases_OnePager.pptx) · local copy `~/Downloads/FreeTech_UseCases_OnePager.pptx`_

## Snapshot

- **The ask (Oracle → SoftServe):** Oracle is **the major private cloud for NATO** (incumbent) and wants a "menu" of use cases it can offer NATO countries — **both miltech companies and military forces** — based on Oracle products. **Hard priority: must run on OCI**; AI Lakehouse / AIDP explicitly not discussed (opportunistic at best). Ideally backed by SoftServe's delivered experience — Oracle "knows we have huge war-related experience but doesn't know how to use it". Karsten: "literally the $100M question — a massive opportunity". (chat with Karsten, ~2026-08-26)
- **Customer is undefined by design:** Alex's segmentation probe (drone manufacturers needing offline CV/navigation ≠ missile manufacturers ≠ militaries wanting intelligent battlefield management ≠ defense ministries wanting multi-modal intel processing) → Karsten: "we don't know anything, and need to think about all of those and beyond".
- **Origin:** materializes the defense thread opened at the [Jul-24 exec-meeting post-mortem](oracle.md) — contact **Bram (Belgium)** via Neil's defense-SVP counterpart. First Oracle defense call held ~2026-08-25 (Bram + team, incl. **Michael — from Ukraine**); Oracle side to come back with relevant ideas (inferred from thread timing: "call yesterday was good start" — Bohdan, Aug 26). Karsten requested a follow-up meeting with Michael on high-interest NATO use cases (2026-08-26).
- **Asset base = delivered Ukraine war work only.** "FreeTech" = SoftServe's wartime engagement ("our participation in the war") — non-Oracle, Ukraine-only, no other defense projects so far. Six delivered use cases on the one-pager (below). **The named gap: no reusable assets in place** — "the lack of real assets we can show was the major issue" in comparable pursuits (Denys).
- **NVIDIA angle (Karsten, from NVIDIA directly):** **Nemotron** is NVIDIA's most important topic for Public/Government at GTC, top of the agenda across their sessions — "everyone will go for Nemotron; assume NATO will like it as well"; wants a SoftServe offer built around it. Alex committed to drill down.
- Karsten's framing topics for the Oracle conversation (prep meeting 2026-08-19): **1** Sensor & Detection Network · **2** Data Collection, Analysis & Communication Infrastructure · **3** Command, Control & Decision (C2D) · **4** Air Defence Systems, Drone Interceptors & other Counteractions · **5** Training of Human Capital & Continuous Improvement.
- Denys's read worth using: military usually insists on on-prem for security/control; NATO accepts Oracle because it's a **private** cloud system — the sovereignty framing is the wedge.

## Delivered use-case base (FreeTech one-pager, shared 2026-08-25)

| # | Delivered use case | What it proves |
|---|---|---|
| 01 | Autonomous last-mile air delivery | Fail-safe AI navigation under lost pilot / GPS / signal; real-time monitoring + obstacle avoidance; finish-mission-or-return autonomy |
| 02 | Foresight analytics engine | Multi-source data fusion → faster threat detection; automated routine analysis → actionable, customizable intelligence reports |
| 03 | Radio cluster intelligence | Automated RF signal clustering, pattern recognition, multi-layer visualization — raw signal data → real-time insight (SIGINT) |
| 04 | Operations control tower | Real-time fleet readiness, mission tracking, resource allocation + performance analytics and maintenance planning in one platform |
| 05 | UUV digital twin | Physics-informed sim (coupled CFD/PINN) for underwater vehicles, 50′–250′ depths, NVIDIA Omniverse visualization — cut testing time/cost |
| 06 | EdgeInsight visual intelligence | NVIDIA edge vision (Jetson/DeepStream + TAO, AWS Greengrass) for real-time inspection/safety; scalable OTA deployments incl. offline |

Capability strip: AI/CV · autonomous systems · digital twins & simulation · signal intelligence · real-time analytics & BI · command & control. Sectors served: Defense · Public Safety · Energy · Manufacturing · Mining & Metals · Automotive.

## Ideas floated so far (team chat 2026-08-25/26)

- **Control Tower analogue** — Denys: the simplest, plenty of visual + buzz (drones, connectivity, planning, post-mortem); Dmytro: "too back-end-ish".
- **Pilot simulator** (discussed earlier in summer) — on a **game engine, not Omniverse** (Denys: too slow for this); Dmytro: compelling but "we are not there yet" — no data, no library of prepared visual assets.
- **Quick deployment of NVIDIA-related assets** — compelling, same maturity caveat (Dmytro).
- **Reuse civil-sector Oracle use cases** as starting points (Dmytro); Bohdan's assignment to Alex: **reuse from the existing Oracle AI Packs × military expertise** — pack map in [oracle-ai-offerings](oracle-ai-offerings.md).
- Bohdan's framing: narrow it to "a path that is easy for our counterparts to consume".
- Dmytro's strategic fork: wait for Bram's team to bring ideas vs. invest our own time/money in a **solution accelerator** to bootstrap; Denys: we need something feasible to SHOW either way.

## People

- Karsten Tramborg — SoftServe NVIDIA/Oracle relationship gateway (full entry in [oracle.md](oracle.md)); drives this stream, holds the NVIDIA + Oracle-defense contacts.
- Bohdan Khomych — brought Alex in 2026-08-26 ("help drive it this week"); on vacation, back Mon 2026-08-31 → [people page](../../people/bohdan-khomych.md)
- Dmytro Ivanov — SoftServe R&D; shaped the 2026-08-19 prep-meeting agenda; pushes "define, prioritize, estimate, then decide" (whether he is the PdM-team "Dmytro" unresolved).
- Denys Godovannyi — SoftServe R&D, simulation/technical depth (Omniverse-vs-game-engine calls); floated Control Tower + simulator.
- Oksana Petrukh — built the FreeTech one-pager (shared 2026-08-25, edit mode).
- Bram (Belgium) + team — the Oracle-side defense counterparts (inferred; surfaced via Neil's defense-SVP counterpart); **Michael** (Oracle, from Ukraine) the named use-case discussion partner.

## Decisions

- ~2026-08-26 — Deadline negotiated with Karsten: use-case suggestions by **end of next week** (~Fri 2026-09-04), in the shared thread — Karsten wanted "asap" ("tomorrow would have been a challenge"). (chat)
- 2026-08-26 — Team call proposed for **Wed 2026-09-02** (Mon Aug 31 UK bank holiday, Tue Sep 1 UA school day); AI-packs ↔ needs pre-alignment to happen before it. (thread)

## Open loops

Mine:
- Draft the **NATO use-case menu suggestions** → post in the shared thread by ~Fri 2026-09-04 (commitment to Karsten).
- **Nemotron drill-down** — what SoftServe can build/offer around it for Public/Government on OCI (commitment to Karsten).
- Pre-call chat with **Oksana + Denys** — align existing AI packs against actual needs seen from projects, before the Sep 2 call (Bohdan's ask).
- Confirm the Sep 2 call slot.

Theirs:
- Karsten — meeting with Michael (Oracle) on NATO-priority use cases (requested 2026-08-26, not yet scheduled).
- Bram + team (Oracle) — their relevant use-case ideas awaited.
- Bohdan — back Mon 2026-08-31, then "more efforts" on this.

## Activity

- 2026-08-29 — Stream folded: Bohdan's DM + Karsten clarification chat + "Oracle Defense - prep meeting" thread history + FreeTech one-pager contents — page created. (chat, 2026-08-29)
