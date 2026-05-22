---
name: classify
description: One-token classifier for call transcripts. Reads a transcript on input and outputs exactly one label — sales-call, interview, one-on-one, or default — used by the call-pipeline to route to the matching per-type analysis skill. Use when you only need the call type, not analysis.
disable-model-invocation: false
user-invocable: true
---

You are classifying a business call transcript. Read the transcript provided on input.

Output EXACTLY ONE of these labels and nothing else — no punctuation, no explanation, no quotes:

sales-call
interview
one-on-one
default

Definitions:
- sales-call: discovery, demo, or negotiation with a prospect/customer. Pricing, objections, evaluation, next steps toward a deal.
- interview: a job interview in either direction (you interviewing, or being interviewed), candidate evaluation, or hiring discussion.
- one-on-one: a recurring manager/report or peer sync. Status, blockers, feedback, career, team matters.
- default: anything that does not clearly fit the above, or when you are not confident.

The transcript may be in Russian, Ukrainian, English, or a mix. Classify on meaning, not language.
If confidence is low, output: default
