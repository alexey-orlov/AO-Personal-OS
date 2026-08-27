# default — 2026-08-27_202539
_source: pasted transcript (chat) — Alex presenting the Work OS internally to the SoftServe R&D product team, built on the Payworks delivery_

> _No calendar header: the meeting date is not stated in the transcript, and the EventKit lookup against the SoftServe Exchange calendar was unavailable in this session (access not granted to the reader binary) — this is a lookup failure, not a "no match". Filed under the processing date 2026-08-27; correct the date if it differs._

> _**Partial transcript.** Coverage is 0:21–3:43 and 38:41–42:32 — roughly 35 minutes in the middle (the bulk of the walkthrough) are missing from the input. Everything below comes from those two windows only._

> _Transcript renders "Claude Code" as "Cloud Code" throughout (known ASR artefact); corrected here._

## TL;DR
- Alex demoed the **Work OS** to SoftServe's internal R&D product team using the Payworks build — the two-role model (PM users vs. **OS admins**), gated files with enforced acknowledgement, and the initiative-centric view of the context repo — framing the role split + gating as the engagement's own innovation.
- Team questions landed on **productization gaps**: the repo is shareable for internal testing, but it is **Claude Code-only today** (GitHub *and* Azure Repos both supported; Codex switching was explicitly out of scope), and there is **no usage-analytics layer** — Payworks will be measured on token usage + Git activity, with per-user skill analytics for the OS admin on the roadmap.
- Alex closed by pushing **internal SoftServe adoption** of the Work OS — it is on the backlog, and he asked Leonid + Vladyslav for a session next week to plan it.

## Key points

**Access model — two customer-side roles**
- The customer team is deliberately split into **regular product managers** (users: interact with agents, improve the context, get insights, create documents) and **admins** who do the maintenance work and approve certain changes.
- Rationale as stated: nobody should be changing skills ad hoc, and key meta-information — company name, target customer segments — needs an approver.
- The admin role carries **more access rights at the Git level**; separately, the cloud environment itself knows which files are gated and **blocks changes to them without an explicit acknowledgement from the user**. Alex called this "another innovation… that we implemented".

**The context repository — two ways to look at it**
- **By initiative/project** (his example: a PM working on v2.0 of a credit-usage dashboard). Context physically sits in different places — a designated place for PRDs, one for relevant metrics, one for the decision log — but the agent's embedded mechanisms **cross-link everything**, so pulling all context for one initiative returns it as a set.
- The UI he demoed is "the simple assembly of the MD files sitting in the repository, nothing beyond that" — dynamic, rendered off his **local clone**, and equally navigable through the file system.
- **By library of key context items**: a general CLAUDE.md holding internal instructions; a **business-info** item with a specific template the customer fills in (industry, company stage, etc.).

**Client-maturity expectation** (post-gap)
- For less mature clients, the play is to **push them to provide the basics** rather than build it for them. Segmentation is the example: if they are product managers, the assumption is that customer segmentation exists somewhere — "otherwise, how do they work with their customers and how do they build products?" — so they find it in their documents, pull it, and hand it over.
- His recommendation to the team: **start from this approach**, while mitigating the technical and access problems hit in the first engagement.

**Q&A — Inna Abolikhina**
- *Can you share the repo with the skills, and can I test the Work OS locally?* → Yes: clone it, invent test customers, run it; feedback welcome.
- *Is it tool-agnostic if a client is on Codex or something else?* → **No, not today.** It is tailored to **Claude Code**. It does handle **both GitHub-based and Azure Repos-based repositories**. Making it switch between Codex and Claude Code is feasible as a customization, but **was not part of the scope**.

**Q&A — Leonid Pavlovskyi**
- *Is there a feedback loop from the customer* — analytics on which skills worked, which parts of the context get used vs. ignored, how much manual intervention happens, how much users rewrite the skills?
- → **On the radar and wanted, but cut for time.** With Payworks the measurement will be **token usage + Git activity**.
  - **Git activity is the meaningful proxy**: PRDs being updated, scripts being loaded shows real activity — it does not show *what* the user is doing, but it is a good signal.
  - **Tokens are "more of a vanity metric"** (his words).
  - **Roadmap**: granular per-user analytics — which user is using which skill — surfaced **to the OS admin**.

**Internal adoption**
- Alex is "really inspired by using that within us, within our teams" and wants to **double down** on running the Work OS inside SoftServe; it is already on the team's backlog.
- Offered to show updates from other customers next time.

## Decisions & commitments
- **Alex → share the Work OS repo** with the R&D product team so members (Inna first) can clone it, test against made-up customers, and send feedback. No date given.
- **Alex → Leonid Pavlovskyi + Vladyslav Butenko: meet next week** ("someday next week maybe") to work out how SoftServe adopts the Work OS internally.
- **Codex support: not in scope** — the Work OS stays Claude Code-only for now; multi-tool switching is a possible customization, not a commitment.
- **Payworks adoption measurement = token usage + Git activity** — the granular per-skill, per-user analytics were consciously deferred to the roadmap under time pressure.

## Open questions / follow-ups
- **Usage analytics for the OS admin** — which user runs which skill, which context items are actually consumed, how much manual intervention and skill-rewriting happens. Named as roadmap; no owner or date set. Leonid's full question (context utilization, manual-intervention rate, skill-rewrite rate) is broader than the token-usage + Git-activity fallback answers.
- **Internal SoftServe rollout** — needs the next-week session to convert backlog intent into a plan (owner, pilot team, which repo).
- **Tool-agnosticism** — whether Codex (or other agents) becomes a real capability or stays a per-engagement customization; relevant to any client not standardized on Claude Code.
- **Technical + access problems from the first engagement** — Alex referenced "all those edges and then technical and access problems that we ran into in our first experience" as things to mitigate, but the specifics fall inside the missing 35 minutes of transcript.
- **Repo-sharing mechanics** — which repo exactly (the Payworks demo build with mock data vs. the clean `SoftServe-Work-OS` template) and what access the R&D team needs was not stated. (inferred gap)

## Participants
- **Oleksii (Alex) Orlov** — presenter.
- **Inna Abolikhina** — asked for the repo + tool-agnosticism.
- **Leonid Pavlovskyi** — asked for the customer feedback loop / analytics.
- **Vladyslav Butenko** — named for the internal-adoption session.
- **William Florez Maestre, Dmytro Dudchenko, Nadiia Vykhrystiuk, Nadiia Svintalska** — attended; no substantive turns in the captured windows.
