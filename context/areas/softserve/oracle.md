# Oracle partnership — joint IP

_status: onboarding — gathering case context (Bosch, Riyadh Air); next: Olya Hanushchak + Dmytro Duchenko, then form a productization view_
_updated: 2026-06-12_

## Snapshot

- SoftServe is Oracle's first integrated partner on this IP: contributes PRs, holds a weekly sync. NHS (UK) is the first paying client using the IP. GTM via SoftServe + NVIDIA. [1:1 2026-06-09](calls/2026-06-09_183633_one-on-one_2026060917013100B193F3.md)
- Funding model on cuOpt POCs: NVIDIA (and possibly Oracle) underwrites the initial POC; client pays only if it scales — Olha's ~80% read, needs confirmation from Bohdan. [Olha sync 2026-06-12](calls/oracle/2026-06-12_151312_one-on-one_20260612143223E84CB5DA.md)
- Active client pipeline (cuOpt cases): Bosch (3–4 weeks into testing, FE off, allocations winding down), Riyadh Air (text-recognition; Dmytro Duchenko owns), DHL (early stage). Bin Laden Group dropped from the cuOpt path. [Olha sync](calls/oracle/2026-06-12_151312_one-on-one_20260612143223E84CB5DA.md)
- Bosch POC shape (reference case): cuOpt-based dispatcher assigning field technicians to zones; custom UI + custom backend wrapper around cuOpt; OFSR (intra-zone routing) explicitly out of scope. Workflow handles stable baselines, sick-leave substitutions, and locked visits — none native to cuOpt, all built on top. Started 2026-04-06; ~2 weeks discovery+workshops, then build. Team: 2 BE full, 1 FE variable (off near end), TL ~0.5→0.25, PM/BA (Olha) ~0.5→0.25, Oracle DevOps. [Olha sync](calls/oracle/2026-06-12_151312_one-on-one_20260612143223E84CB5DA.md)
- Productization framing per Olha (PM/BA on Bosch): a universal product is unrealistic; the realistic play is standardizing the *engagement process* — fixed-scope cuOpt POC packages. "Packages" lacks a shared definition across stakeholders; the SoftServe-side Oracle "packaging" meetings ran with Olya Hanushchak (FE) and Vlad Selyotkin (architect), not Olha. [Olha sync](calls/oracle/2026-06-12_151312_one-on-one_20260612143223E84CB5DA.md)
- The product mode of Alex's R&D role: joint-IP development — packaging the IP into S/M/L offerings; the other mode (productization on client engagements) lives at the area level.
- The R&D PdM team (Leonid, Dmytro, Olya, Vladyslav — ~4–5 PdMs) maps onto this work; an early deliverable is aligning the PdMs to the S/M/L packages and sketching "Roadmap v0".

## People

- Dmytro Duchenko — PdM on Riyadh Air cuOpt case; currently on vacation. (Likely the "Dmytro" of the PdM-pair Alex meets first.)
- Olya — second PdM Alex meets first (new, replacing Semenov).
- Olha Terendii (oterend@softserveinc.com) — PM/BA on the Bosch POC; the contextual entry-point for Alex into the cuOpt-POC pipeline. Was excluded from the Oracle packaging meetings and points him onward.
- Olya Hanushchak — FE on the Bosch POC; attended the Oracle packaging meetings — Alex's next contact for technical depth + packaging context. Contact to come from Olha.
- Vlad Selyotkin — architect; co-attendee of the Oracle packaging meetings with Olya Hanushchak.
- Bohdan — engagement lead / decision-maker on POC funding split (same Bohdan/Bogdan referenced elsewhere in the SoftServe engagement).
- Leonid, Vladyslav (joining) — rest of the PdM team.
- Oracle leadership + weekly-sync participants — intro pending (via the engagement lead).

## Decisions

- 2026-06-12 — Sync with Olya Hanushchak (Bosch FE, packaging-meeting attendee) and Dmytro Duchenko (Riyadh Air) before forming a productization view → they hold the technical detail and packaging context Olha lacks. [Olha sync](calls/oracle/2026-06-12_151312_one-on-one_20260612143223E84CB5DA.md)
- 2026-06-09 — Onboarding sequence agreed: case-study deck → meet Dmytro & Olya → feedback to the lead → intro to Oracle leadership + weekly session. [1:1](calls/2026-06-09_183633_one-on-one_2026060917013100B193F3.md)

## Open loops

Mine:
- Re-confirm with Bohdan whether the client pays anything for the initial POC (Olha's ~80% read: no).
- Get Olya Hanushchak's contact from Olha, then sync with her on Bosch technical depth + the Oracle packaging meetings.
- Sync with Dmytro Duchenko after his vacation on Riyadh Air / text-recognition.
- After Olya/Dmytro syncs: form own view on productization viability — universal product vs. standardized engagement SKUs.
- Read the case-study deck when it lands → meet Dmytro & Olya → report back to the lead.
- After meeting the PdMs: align team ↔ S/M/L packages, sketch Roadmap v0.

Theirs (engagement lead):
- Send the Oracle case-study deck; after Alex's PdM sync, intro to Oracle leadership + the weekly.

Theirs (Olha Terendii):
- Send Olya Hanushchak's contact to Alex.
- Maybe share the Oracle "high-level proposal" doc / Oracle UI reference (tentative).

## Activity

- 2026-06-12 — [Olha Terendii sync — Bosch POC + Oracle productization](calls/oracle/2026-06-12_151312_one-on-one_20260612143223E84CB5DA.md) — pipeline shape, Bosch case detail, Olha's productization framing; next contacts identified.
- 2026-06-09 — [1:1: Oracle context + onboarding sequence](calls/2026-06-09_183633_one-on-one_2026060917013100B193F3.md) — partnership shape and Alex's entry path set.
