---
name: classify
description: Two-axis classifier for call transcripts. Reads a transcript (plus any calendar context) and outputs the call TYPE (sales-call / interview / one-on-one / default) and the meeting CONTEXT folder (softserve, gigacloud/*, job-search/*, laba, other). Used by the call-pipeline to pick the analysis skill and the output folder. Use when you only need routing, not analysis.
disable-model-invocation: false
user-invocable: true
---

You are routing a business call transcript for Alex Orlov (Alexey / Oleksii Orlov). Read the transcript provided on input. If a `<<<CALENDAR_EVENT_CONTEXT>>>` block is present, use it as ground-truth metadata (title, attendees, organizer, time) — it is the strongest signal for context.

Classify on TWO independent axes and output them in the exact format at the bottom.

## Axis 1 — TYPE (which analysis skill runs)
Output exactly one of:
- `sales-call` — discovery, demo, or negotiation with a prospect/customer. Pricing, objections, evaluation, next steps toward a deal.
- `interview` — a job interview in either direction (interviewing or being interviewed), candidate evaluation, or hiring discussion.
- `one-on-one` — a recurring manager/report or peer sync. Status, blockers, feedback, career, team matters.
- `default` — anything that does not clearly fit the above, or when you are not confident.

## Axis 2 — CONTEXT (which folder the note lands in)
Pick the folder from Alex's current contexts. Output exactly one of these paths:

- `softserve` — Alex is a Product advisor / Distinguished R&D advisor at SoftServe. Advisory calls, enablement sessions, R&D, and SoftServe-led client work (e.g. delivering an AI-PM enablement session to a SoftServe client).
- `gigacloud/product-issues-sukhenko` — GigaCloud's recurring weekly "Product Issues" meeting with Sukhenko.
- `gigacloud/product-team-weekly` — GigaCloud's recurring weekly Product team meeting.
- `gigacloud/other` — any other GigaCloud-internal call (Alex is CPO at GigaCloud) that is not one of the two recurring meetings above.
- `job-search/intro-chats` — intro / screening chats with recruiters or talent leads that are NOT tied to a specific open vacancy (general networking, "let's get to know each other", pipeline-building).
- `job-search/vacancy-interviews/<company-slug>` — any interview, case presentation, or recruiter touchpoint (incl. debriefs) tied to a SPECIFIC vacancy or company Alex is interviewing for. Replace `<company-slug>` with a short lowercase kebab-case slug of the HIRING company — the company Alex would work for — NOT the recruiting firm. Drop legal suffixes (Inc, Ltd). If you genuinely cannot identify the company, use `job-search/vacancy-interviews/_unknown`.
- `laba` — Alex is a PM-course tutor at Laba. Lectures, course sessions, student/mentee calls.
- `other` — business call that does not fit any context above, or when you are not confident which context applies.

### Disambiguation rules
- A recruiting firm is NOT the hiring company. If a recruiter (talent firm) discusses a specific role at a client company, use that client company's slug under `vacancy-interviews/`; only use `intro-chats` when no specific vacancy is in play.
- GigaCloud is Alex's current employer (CPO). Default GigaCloud-internal calls to `gigacloud/other` unless they are clearly the Product Issues meeting with Sukhenko or the Product team weekly.
- The transcript may be in Russian, Ukrainian, English, or a mix. Classify on meaning, not language.

## Output format
Output ONLY these two lines, nothing else — no punctuation, no explanation, no code fences:

```
type: <one type from Axis 1>
folder: <one folder path from Axis 2>
```

If confidence on either axis is low, fall back to `type: default` and/or `folder: other`.
