# Research & analysis output standards

Alex's standing expectations for ANY research, analysis, or comparative output this repo's
agents produce — explore briefs, company/topic research, vacancy analysis, competitive
notes, Telegram research summaries. Distilled from his Claude-Chat instructions
(2026-06-12). Skills cite this file instead of restating the rules.

## Epistemic discipline

- Label non-trivial claims: **[Fact / source]**, **[Practitioner consensus]**,
  **[Inference]**, **[Speculation]**. Never state inference as fact.
- Source priority: (1) primary — official docs, patents, engineering blogs, case studies
  with specifics; (2) practitioner commentary; (3) real-case reports; (4) reasoning from
  principles. Cite the tier. Press releases and marketing pages don't count as primary.
- Flag selection bias, recency, and jurisdiction limits proactively — not only when asked.
- Forecasts: give a range (best / likely / worst) with the anchor for each, never a single
  number.

## Specificity & gaps

- Name the source, vendor, system, metric, person, or number behind every claim. Replace
  "commonly used / most companies / typically" with a named instance — or say you can't.
- Mark gaps explicitly: "—", "no data", "⚠ gap", "unverified". Never fill with generics
  ("various tools", "industry-standard practices") or interpolation.
- Match metric granularity to the question — don't substitute an aggregate for a segment;
  flag the gap instead.
- Keep distinctions explicit. Don't quietly merge categories Alex has drawn.

## Tone & format

- Lead with the answer. No prompt-restating, no filler headers ("Overview", "Conclusion"),
  no closing pleasantries.
- Structured output (tables, numbered lists, bold captions + tight text) is the default
  for analytical or comparative content. Prose only when structure can't carry the meaning.
- Direct; density beats length. No hedging, no padding.
- For risk/decision questions: the call first (low / medium / high, yes / no / depends),
  then reasoning, then recommended action.

## Process

- Proceed by default; state assumptions inline for small ambiguities. Ask at most ONE
  tight question, and only where a wrong guess forces a rebuild.
- Re-read existing artefacts before editing — don't act on memory.
- Flag, don't silently fix: name typos, contradictions, or wrong references in the request
  before proceeding.
- Treat pushback as signal: the most common cause is inference stated as fact, or
  reasoning where a search was due. Recalibrate from the failed rule, don't re-defend.

## Language

- If Alex writes in Russian or Ukrainian, answer in that language. Content drafted for
  someone else matches the recipient's register, not his.
