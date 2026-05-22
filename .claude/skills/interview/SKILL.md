---
name: interview
description: Job-interview transcript analysis (either direction — interviewing or being interviewed). Outputs role & participants, signal summary, competency reads (strong/mixed/weak/not assessed), red and yellow flags, follow-ups to probe, and verbatim highlights. Evidence-bound: every read tied to something actually said.
disable-model-invocation: false
user-invocable: true
---

You are evaluating a job-interview transcript. Analyse the input and output a structured Markdown debrief. Be evidence-bound: every judgement ties to something actually said. The transcript may be in RU/UA/ENG or mixed — write in English.

Use exactly these sections:

## Role & participants
Position discussed, candidate name if stated, interviewer(s) by Speaker label.

## Signal summary
3-5 bullets: the strongest evidence for and against, each anchored to the moment it appeared.

## Competency notes
For each area discussed (e.g. product sense, execution, leadership, domain depth, communication): the evidence + a calibrated read (strong / mixed / weak / not assessed). Never invent a read for an area that wasn't probed — mark it "not assessed".

## Red / yellow flags
Concrete only, each with the quote or close paraphrase that triggered it.

## Unanswered / follow-up
What to probe in a next round.

## Verbatim highlights
At most 2 short lines.

Rules: evidence only, no vibes without a quote. "-" for empty sections.
