# default — 2026-10-21
_source: Teams transcript Alex pasted in chat (recording "Scientific Workflows and AI Capabilities - Offering Preparation-20261021_140416"), plus the deck that was presented, an HTML file he attached (`~/Downloads/index_v2_9179.html`, "Agentic Scientific Jumpstart", 17 slides incl. a 6-slide appendix; not committed). **Session 2 of 4** of the science Jumpstart offering preparation, presented by Taras Rumezhak and Bohdan Khomych._

> _No calendar header: transcript pasted in chat._

> _**Transcript coverage is partial.** Captured: 0:04–0:57, 5:51–18:49 and the goodbyes at 35:13. Missing: about 5 minutes of the presentation (problems C–D and the workflow menu; at 5:56 Oleh says "I think you dropped", so likely a connection drop, inferred) and about 16 minutes of discussion after Arkadiusz's opening challenge, including any answer to the deck's three asks. Alex has no lines in the captured parts, so English coaching was skipped. Speaker names are Teams display names, so their spellings are reliable: **Taras Rumezhak** (the wiki had "Romezhak", a transcript spelling), **Arkadiusz Drohomirecki**, **Adel Bibi**, **Oleh Mamchych**._

## TL;DR
- **The proposal:** four research problems answered by a menu of three workflows, ranked: **1 hypothesis → reproducible computation** (the first program: a rerunnable analysis with an independent check on the team's own past data), **2 evidence → hypothesis** (the paired entry point), **3 resource allocation across pipelines** (a logged GPU-allocation policy, a gated module built on a Danaher pattern). The first six weeks are the GTM deck's Activation Pod (assess, map, build, upskill, measure). Taras's spoken version: idea to a decided shortlist takes 2–3 months today and 1–2 weeks with agents, and a client picks the one most important workflow.
- **The captured challenge was about allocation.** Max Druchok: compute needs are not equal, since one group needs 3 GPUs for half a year to see any first evidence and another needs one GPU for three days, and evidence value doesn't scale with time spent. Adel Bibi split it in two: one scientist with dedicated GPUs and a fixed time box (the current auto-research practice) vs a group sharing a cluster on one goal, where sub-agents compete for GPUs. Taras: the individual case is easier; the group case needs refining, and the only tool he found on it is an early one from Microsoft.
- **Arkadiusz Drohomirecki opened with "this is too complicated for me":** the deck defines a perfect process, while every organisation works differently. The rest of the discussion isn't in the transcript, so it's unknown whether the three asks (agree the ranking · an owner per asset cluster for a runnable inventory by Friday · approve 5–6 discovery interviews) were agreed.

## Key points

**The deck (from the HTML Alex attached)**
- **Series and scope.** "Offering preparation · Session 2 of 4", 2026-10-21, internal working draft. Today's question: *which two or three research activities should the first program help scientists perform better, and what proof do we bring?* Ten minutes of presentation, fifteen of challenge. Next: **Thursday (2026-10-22) technology and trust**; **Friday (2026-10-23) delivery, roles, skills, packages**. Session 1 was the GTM session on 2026-10-20 (the deck's sources slide); likely the "ICP session" in the wiki (inferred).
- **Four problems → three workflows.**
  - The problems: A fragmented research knowledge (DuPont; Bayer, Boehringer: "24 years of history in Excel, OneDrive and SharePoint") · B slow validation of ideas (DuPont, Dow, internal) · C limited experimental capacity (SoftServe R&D, DuPont, Danaher; one product took ~100 formulations) · D uncertain portfolio decisions (DuPont stage-gate review; flagged as a thin source).
  - The answer is a menu, not one end-to-end transformation, because labs suffer inside one part of the process. A shared evidence record links the three workflows, and ELN, LIMS and repositories stay the systems of record.
  - Disconnected data and compliance are deferred to Thursday.
- **Ranking**, scored on room vs vendors · our proof · data access · risk:
  1. **Hypothesis → reproducible computation** (first program, medium risk). Vendor gap: Claude Science, ChatGPT Rosalind and Microsoft Discovery document no independent rerun of an analysis. Proof: the Tetra salt-solution property model (Q1 2026), a NeurIPS 2025 polymer run (−68% error, found an inflated benchmark), a formulation engine, PINN surrogates for Shell and TechnipFMC.
  2. **Evidence → hypothesis** (entry point, low risk). The most vendor-covered step; SoftServe adds a weekly watch, numbers pulled from hundreds of papers, and acceptance against an expert reference set. Proof includes the deep-research and large-document packs built for Oracle. Commercial trap: research units already testing Claude or Discovery want production, not training, so lead with production hardening.
  3. **Resource allocation across pipelines** (gated module, high risk). The largest vendor gap: no vendor documents a policy that decides where the next GPU hour goes, logs why, and is tested against a static baseline. The proof is a pattern from a Danaher design campaign, in delivery and confidential, with no results claimed. Shadow mode first.
- **Allocation loop (slide 4).** The scientist fixes the design space and the reward. The engine then runs allocate → generate candidates → simulate or predict → evaluate → reward → learn → reallocate (explore, exploit, stop, advance). The scientist approves the production campaign. Benefit frame: hit rate, not utilisation: "of ten proposals the engine sends forward, one or two succeed, replacing a hundred tested by hand."
- **Worked example (slide 5, labelled illustrative).** An adhesive formulation team must replace an ingredient that became unavailable, across six steps: frame · evidence · compute · select · execute · learn. Idea to a decided shortlist takes ~2–3 months today and days or weeks with agents. Physical tests, certification and customer validation are unchanged (8 months at DuPont). Three points where the workflow says no. Slide 6 walks each step: the reusable asset, the human boundary, the measure.
- **Assets (slide 7), four clusters.**
  - Jumpstart methodology: the Engineering Jumpstart runbook, maturity assessment, the **Living Research Workflow Map**, PM, QA and prototyping skills, with Payworks and AuditBoard as references.
  - Science tech as skills: delivered research.
  - Platform and packaged IP: the Oracle packs, an **Agentic OS for shared team context**, the TWC platform, a DGX Spark sidecar, the Danaher adapters.
  - Case studies: the NobleAI-in-DuPont format, the Danaher hackathon, the Haemonetics TEG 6s PoC, an Oracle-style one-day demo.
  - The shared layer is one Git repo (knowledge base, versioned skills and sub-agents, guardrails) between the scientists' chat and the team systems.
  - The Living map is the 10-20 Oleh's concept, and the Agentic OS is likely Alex's Agentic OS for Knowledge Workers (both inferred).
- **Benefit (slide 8).** It uses the **Shorter · Wider · Unchanged** frame of Alex's exec summary. Of its six measures, three are Alex's exec-summary metrics: days to a cited brief · days from a result to the next-run decision (ELN) · days from a finished run to a checked result (LIMS). The other three: the share of a closed project's answer the knowledge base recovers, outcome per GPU budget, and cost per accepted result. The rule: no percentage before a baseline. The speaker notes treat the earlier memo's 25% handling-time figure as a discussion target.
- **First program (slide 9).**
  - Week-0 gate: read access to LIMS and reports, an approved model in the client's tenant, a data owner and IP contact, an agreed AI-use clause.
  - Weeks: 1 assess · 2 map · 3–4 build · 5 upskill · 6 measure. Default content is ranks 1 + 2 on one recurring decision. Rank 3 and sim-to-real are optional gated modules.
  - Lands first at Tetra (chemicals), Bicycle (pharma, open deal) and Danaher (allocation, in delivery); next DuPont and Shell.
  - "Pod roles, skills curriculum and pricing come on Friday."
- **Asks:** 01 agree the ranking · 02 name an owner per asset cluster for a runnable-level inventory by Friday · 03 approve 5–6 discovery interviews across 2–3 shortlist accounts, to test budget, IP and buyer access.
- **Appendix.**
  - A1: Danaher as the live reference (confidential).
  - A2: vendor coverage over the same three workbenches as Alex's exec summary.
  - A3: a seven-week planning pattern that adds a week-0 readiness gate and a week-7 evidence review to the 6-week pod; "we reconcile the two on Friday".
  - A4: allocation guardrails and five signers.
  - A5: eight assumptions shared with the GTM deck. #2 (R&D leaders fund enablement), #6 (research units haven't solved it themselves) and #8 (we reach the decision-owning scientist) go first in discovery interviews.
  - A6: sources, which list **Alex's "AI Jumpstart for Scientists · exec summary"** and a 2026-10-19 "Agentic Scientific Jumpstart proposal" (author not named).

**Taras's spoken presentation (captured parts)**
- The problems come from prior experience plus presales and projects. A, fragmented knowledge, is shared with the classic Jumpstarts. On B, manual work can't test ten ideas quickly, and nobody knows whether another paper already checked an idea.
- Today's process has six gate points. A chemist (transcript "a chemist from Dana Care example": Danaher or DuPont, unclear) spends weeks searching materials, and SoftServe's own department worked the same way a year ago. Then about two weeks of scripts for the computation and four more weeks of execution: 2–3 months in all. With agents it takes 1–2 weeks:
  - build the common knowledge first;
  - retrieve internal and external research through connectors to biological and chemical sources in Claude Science (transcript "cloud science");
  - "points 3, 4, 5 we are spreading within this GPU allocation";
  - step 6 checks the results constantly, in a loop.
- In the spoken version allocation carries steps 3–5, while the deck ranks it third and gated (inferred tension).
- The first six weeks as an Activation Pod:
  - interview people and map which of the three workflows matter, "probably not all of those three, but select the most important one";
  - build with the client's team;
  - upskill, e.g. Claude Science connectors to biology sources, OpenReview and arXiv to speed up the paper search;
  - in the last week, measure how much time dropped for testing a hypothesis or for checking whether research was done before.

**Q&A (captured parts)**
- **Oleh Mamchych** restated the session's question and checked that "scientists" here means those who write experiments in code. Taras: yes. The activities are the six steps of the worked example. Taras asked to start the challenge from the problems and workflows, since the activities can change.
- **Max Druchok, on the allocation loop.**
  - The design assumes roughly equal compute demand, but one group may need 3 GPUs for half a year just to see "any sign of hope" while another needs one GPU for three days; "two weeks for everyone… does not scale."
  - Taras: allocation is adaptive, with two use cases: across scientists, and one scientist with one GPU and several hypotheses, where some hypotheses die sooner.
  - Max: even alone, the time to a first result ranges from 6 days to 6 months.
  - Taras: as a budget owner he would favour a 2-day task that gives good results.
  - Max: evidence in two days may be worth more or less than evidence in half a year; it isn't just days or megawatts. "I don't have the answer as well… it might be not that straightforward." Taras invited his ideas.
- **Adel Bibi**: these runs are for ideation and hypothesis testing before a deep dive, and he called it "a great idea" and "a very, very active question" in research. Today's auto-research practice gives the agent a time box and a budget ("you have 10 hours… 10 GPUs") and lets it decide how many GPUs to use. Two cases:
  - **Single scientist with exclusive GPUs:** the agent breaks the question into sub-questions and spends the GPUs to reach a small conclusion on the next direction within the time box.
  - **A group of 3–4 sharing a 50-GPU cluster** on the same Jumpstart program, each with a different angle on one problem (his example: safety and security from the model-parameter angle). The agent sets priorities and reallocates by task sensitivity against a global goal, beyond SLURM-style per-person queues, and sub-agents must not cross boundaries between people.
- **Taras**: the individual case is easier, from both Adel's and Max's points; the group case needs refining. The one tool he found working on it is from Microsoft, "too early".
- **Arkadiusz Drohomirecki**: "this is too complicated for me… we are trying to define a perfect process. The first problem… everyone does a little bit different things. Every organisation will be doing it a little bit different." The transcript cuts off here. It echoes Arek's 2026-10-20 argument against fully custom programs (inferred: Arek = Arkadiusz).

## Decisions & commitments
- None captured; the decision part of the call is missing from the transcript.
- **Taras** → refine the group-of-researchers allocation case and adjust the allocation framing with Max's input, if he brings ideas (no date).
- Pending from the deck, status unknown: agree the ranking · **an owner per asset cluster** → runnable-level inventory → by Friday 2026-10-23 · approve 5–6 discovery interviews across 2–3 shortlist accounts.

## Open questions / follow-ups
- **The missing ~16 minutes of discussion:** Arkadiusz's full challenge, any other challenges, and whether the asks were approved. Ask Alex whether he has the rest of the transcript or remembers the outcome.
- **Allocation, still open:** how to prioritise hypotheses when time to first evidence ranges from days to months and its value isn't proportional to cost (Max), and the shared-cluster group case (Adel).
- **Spoken vs deck emphasis:** allocation spans steps 3–5 in Taras's pitch but ranks third and gated in the deck (inferred).
- **Overlap with Alex's program-design stream (inferred).** Friday's session (delivery, roles, skills, packages) matches the scope of Alex's merged program-design deck. This deck already fixes a 6-week pod with a week-0 gate and a 7-week pattern to be "reconciled on Friday", against Alex's Light 1 + 6 weeks / Full 2 + 11 weeks plus advisory. It also reuses his frame and metrics.
- **The deck's "first program" scope vs the menu:** ranks 1 + 2 by default, while Taras said a client picks one workflow. Arkadiusz's challenge (every organisation differs) bears on the ranking.
- **Transcript spellings:** "Dana Care" (Danaher or DuPont), "Hermonetics" (Haemonetics), "Donnaher" (Danaher), "cloud science" (Claude Science), "open review archive" (OpenReview, arXiv); "He will bring Lego for me" unclear.
- **Which Oleh** was in the 2026-10-20 program-design stream: today's Oleh Mamchych (R&D), or Oleh Marchevich as the wiki inferred.

## Participants
- **Taras Rumezhak** — SoftServe R&D practice; presenter; co-author of the deck.
- **Bohdan Khomych** — co-author of the deck (life-science SME); setup lines only in the captured parts.
- **Oleh Mamchych** — R&D; opened the Q&A.
- **Max Druchok** — challenged the equal-compute assumption in allocation.
- **Adel Bibi** — framed the individual vs group allocation cases from auto-research practice.
- **Arkadiusz Drohomirecki** — "too complicated / a perfect process" challenge.
- **Inna Abolikhina** — present (goodbye only).
- Alex — no lines in the captured parts; attended, since he holds the transcript and the deck (inferred).
