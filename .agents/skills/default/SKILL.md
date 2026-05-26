---
name: default
description: Default call-analysis brief for any business call transcript that does not fit a more specific type (sales-call, interview, one-on-one). Outputs TL;DR, key points, decisions & commitments, and open follow-ups in Markdown. Use for generic meetings, mixed-topic calls, or when call type is unclear.
disable-model-invocation: false
user-invocable: true
---

Summarise the call transcript provided on input. Output Markdown. The transcript may be in RU/UA/ENG or mixed — write in English.

Use exactly these sections:

## TL;DR
3 bullets.

## Key points
What was discussed, terse.

## Decisions & commitments
Owner -> action -> date, where stated.

## Open questions / follow-ups
What to revisit.

Rules: only what was said; mark inferences as (inferred); "-" for empty sections.
