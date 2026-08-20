# sales-call — Ismail (Oracle) ↔ Bohdan: collaboration infrastructure + the AIDP documentation model

_source: pasted meeting notes (no recording, no transcript in repo) — received 2026-08-18; meeting date not stated (inferred: week of 2026-08-11 or 2026-08-17)_
_note: the notes state they were synthesised from two transcripts that disagree on one point (SharePoint/Slack request timing) — that item is marked unconfirmed below._

> **Type**: Oracle ↔ SoftServe partnership working session — tooling/collaboration setup and joint-delivery documentation
> **Participants**: **Ismail** (Oracle — the "Ismael / Izzy" data expert who joined Gero's team, [surfaced 2026-07-28](2026-07-30_141406_sales-call_20260728150352C40DCE8E.md)); **Bohdan** (Bohdan Khomych, SoftServe). Gero referenced throughout, not present.
> _Follows the [2026-07-28 Gero follow-up](2026-07-30_141406_sales-call_20260728150352C40DCE8E.md), where Izzy's SoftServe London visit + the shared-document / "shadow process" brainstorm were set up._

## TL;DR

- Ismail came back with concrete answers on **collaboration infrastructure** (GitLab / SharePoint / Slack / Jira) and on the **documentation model** for joint AIDP projects.
- **Oracle is capacity-constrained and says so openly**: Gero is glad SoftServe is on board because Oracle "can't scale alone with the amount of demand coming in." **5–6 customer conversations are already assigned to people**, with top-account nominations flowing in from **all six Oracle regions**. Read: SoftServe's positioning has landed — the binding constraint is now **SoftServe's readiness, not access**.
- **First real joint delivery is likely mid-to-late September** — both sides jointly agreed early September is too optimistic. That leaves a **~4–5 week runway** to have certification, tooling and AI SDLC assets ready.
- Oracle's core delivery artefact is the **SDD (Solution Definition Document)**; Ismail + Gero are building an **AIDP-tailored variant** sitting between the JEP framework SoftServe used in Berlin and a full SDD, carrying **three-way sign-off (Oracle / SoftServe / customer)**.

## Why it matters

1. **Capacity constraint confirmed from Oracle's own mouth.** The demand signal (5–6 assigned conversations; nominations from all six regions) is the strongest evidence yet that the partner-of-choice play is working. The risk shifts to SoftServe being ready.
2. **The runway is now dated.** Mid-to-late September for first joint delivery sets a hard clock on certification, tooling access and AI SDLC assets.

## Decisions & commitments from Oracle

### GitLab — in progress, Oracle's side

- Oracle is provisioning a **community-edition GitLab inside their own OCI tenancy** — **not GitHub**. Expected live **within roughly a week**.
- **Rationale**: Oracle's existing GitHub estate must stay publicly accessible; private repos would require **per-customer legal sign-off on both sides**. Self-hosting gives Oracle full control.
- **External users supported.** Model = **per-project dedicated repos**, with Oracle + SoftServe people added, and the customer too where they want in.
- **Access for SoftServe = VPN IP whitelisting** — the same pattern already running for AI Pacs / AI Accelerator access, so a **known path for SoftServe IT**.

### SharePoint + Slack — pending Oracle approval

- Both must clear **Oracle's approval process**, which Ismail described as **strict**. He is working through the request form.
- Ismail will send **a short set of basic questions** to complete the request (e.g. confirming **Bohdan's email as the point of contact** for adding people). **Bohdan committed to fast turnaround.**
- ⚠️ **Unconfirmed**: the two source transcripts differ on whether Ismail kicks the process off this week or holds it. Treat the timing as open.

### Jira — open, no commitment yet

- Oracle uses Jira, but **only in product engineering / product management**. **Sales engineering currently has no access.**
- **Gero has tasked Ismail** with finding the owner and getting the team onboarded.
- **Bohdan pushed for a shared Jira board on joint projects**, on the **traceability argument**: if AI SDLC is being run, spec and feature versioning needs a single home. **Ismail agreed Jira would be the best tool** — but this is **not yet a commitment**; it depends on his internal chase.

### Documentation model — the SDD

- Oracle's core artefact is the **Solution Definition Document (SDD)**: one PDF covering **use case, stakeholders, data models, scope of work, success criteria and architecture**.
- Ismail and Gero are building an **AIDP-tailored variant**, positioned **between the JEP framework SoftServe used in Berlin and a full SDD**: **MVP scope defined, plus an outlook on what production looks like**. Structurally very close to JEP with a few extra production sections.
- Carries **three-way sign-off: Oracle, SoftServe, and the customer.**
- **This is the document SoftServe's scope and acceptance criteria will hang off** — worth flagging to whoever owns SOW drafting on the first engagement.
- **No action needed from SoftServe yet**; it stays a work-in-progress, to be refined on the first live customer.

### AIDP product access

- Ismail will work with Gero on a **monthly sync between SoftServe's team and the AIDP / AI Lakehouse product team**, **once they are back from vacation in September** — roadmap updates, bug reports, feature-enhancement requests from customers, a continuous feedback loop.

## What SoftServe shared (and should be ready to back up)

Ismail explicitly asked **what SoftServe does that Oracle should be learning from**. Bohdan led with:

- **AI SDLC as the differentiator.** The **looped model**: PM, engineering and QA collaborating on **specs** rather than each running isolated AI skills; **specs as agent input**; automated ticket creation and triage, code generation, review, with **expert PR review where needed**. Framed as **most valuable once integration and app-dev complexity appear**, past the initial PoC stage.
- **Value-realisation discipline** — deliberately **not over-promising ROI at PoC stage**, because when funded money runs out the customer starts **auditing the promised return themselves**.
- **SOW structure** — **every person tied to specific deliverables, no passengers**.
- **Tooling** — **Jira as the default** (Linear in edge cases); **Claude used heavily internally**; SoftServe flexes to **customer-preferred coding tools and licences**, and can wire **Claude Code into a customer's Jira via MCP**. Also mentioned **Atlassian as a major customer** and SoftServe's work on **Rovo**.
- Noted **Oracle uses Codex actively**, with **Apex expected to reach comparable capability**.

## Open questions / follow-ups

- **Jira**: does Oracle sales engineering actually get onboarded, and does a shared joint-project board follow? Depends on Ismail finding the internal owner.
- **SharePoint / Slack**: approval outcome and timing — the request hasn't cleared, and even the kick-off timing is unconfirmed.
- **GitLab**: confirm the VPN IP-whitelisting request with SoftServe IT once the instance is live (~1 week out).
- **SDD variant**: SoftServe hasn't seen a draft. Whoever owns SOW drafting on the first engagement needs sight of it before scope/acceptance criteria are written.
- **Readiness against the mid-to-late-September date**: certification, tooling access, and AI SDLC assets are the named gaps — no owner or plan captured in these notes.
- Which of the 5–6 assigned Oracle customer conversations SoftServe gets pulled into, and when.
