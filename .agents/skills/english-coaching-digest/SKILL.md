---
name: english-coaching-digest
description: Condenses a full english-coaching report into a 1–2 minute Telegram digest — title + severity totals + the top 3–4 highest-impact issues with concrete "said → correct" examples and drills. Plain text only, ≤3500 chars. Reusable on any existing coaching report.
disable-model-invocation: false
user-invocable: true
---

You condense a full `english-coaching` report into a short, vivid digest suitable for a Telegram message. The reader will see this in a messenger; they want a 1–2 minute scan that tells them exactly what to internalise from the latest session, with concrete examples — not a vague exec summary.

## Input

A full english-coaching Markdown report on stdin, or as the contents of a file the agent has been told to read. It has the structure: header line (`_User identified as: …_`), executive summary, "Top items to study" list (max 8 items, each with examples and a drill), and a "Full audit" with five sub-sections of tables.

If the input is missing, empty, or clearly not a coaching report, output exactly:

`Input is not a readable english-coaching report. Pipe the report to stdin or pass its file path.`

and stop.

## Output

**Plain text. No Markdown formatting** — Telegram will render literal `*` and `_` as characters, so do NOT use `**bold**`, `_italic_`, `` `code` ``, or `#` headers. Emojis are fine. Indentation with spaces is fine.

Shape:

```
🎓 English coaching — <call context, 4–8 words>
Severity: 🔴 X · 🟡 Y · 🟢 Z

1. <emoji> <Pattern name> (Nx)
<one sentence: rule + why it matters — concrete, not generic>
   "<said>" → "<correct>"
   "<said>" → "<correct>"
   Drill: <short rule or mnemonic>

2. <emoji> <Pattern name> (Nx)
…

3. <emoji> <Pattern name> (Nx)
…
```

**Line 1 — title.** Derive the call context from the report's `_source:_` line, the calendar header at the top of the report (attendees, title), or the user-identification line. 4–8 words. Examples:
- `🎓 English coaching — Matt Levy interview, 2026-05-22`
- `🎓 English coaching — Conga AI PM Bootcamp`
- `🎓 English coaching — GigaCloud product weekly`

If nothing in the report identifies the call, fall back to `🎓 English coaching — session <YYYY-MM-DD>`.

**Line 2 — severity totals.** Copy the `🔴 X · 🟡 Y · 🟢 Z` numbers verbatim from the report's executive summary. Do not recompute.

**Items — 3 to 4 of them.** Pick the highest-impact entries from the report's "Top items to study" list, in the report's existing order (the report already orders by impact = frequency × severity weight). For each:

- Header line: `N. <emoji> <Pattern name> (Nx)`. Take the emoji (🔴/🟡/🟢), pattern name, and instance count from the report. Drop the report's `####` Markdown prefix.
- One sentence stating the rule and why it matters. **Concrete, not generic.** Bad: *"This is a common non-native pattern."* Good: *"`feedback` / `information` / `advice` are uncountable in English — never `-s`, never `a/an`."*
- Up to **2 examples** in `"<said>" → "<correct>"` form, indented with three spaces. **Quote verbatim** from the report's example list — do not paraphrase the "said" half (the value is the reader recognising their own words). Pick the most vivid pair — usually the shortest, most concretely wrong ones.
- One indented `   Drill: <…>` line — copy the drill from the report; trim to one line if the report has multiple.
- Blank line between items.

**No link line.** The orchestrator that calls this skill appends `📄 Full report: <url>` itself. Do not invent or include one.

## Length & priorities

- Target **250–400 words total**, strictly under **3500 characters** (Telegram caps at 4096; the orchestrator appends a link line).
- If you'd exceed the budget, **drop the 4th item before cutting examples or drills**. Vividness beats coverage in a digest — the reader has the full report linked below.
- If the report's "Top items to study" list has fewer than 3 entries, emit only what's there (don't pad with audit items).

## Style

- Same evidence-bound, no-praise tone as the source report. No "great progress!", no "you're doing well on X". Just the issues.
- Mirror the report's wording. Do not introduce new examples, new pattern names, new drills, or analysis the report didn't make.
- If the report contains a `_Coverage:_` note (incomplete sweep), reflect it in one short parenthetical at the end of the severity line, e.g. `Severity: 🔴 2 · 🟡 7 · 🟢 4 (coverage: turns 1–80 of 120)`.

## Interactive vs. headless

- **Headless** (`Codex -p`, invoked by the `coaching-notify` orchestrator): emit the digest on stdout and stop. The orchestrator appends the GitHub link line and ships it.
- **Interactive** (slash command `/english-coaching-digest`): emit the digest in chat. If the user passed a file path as an argument, append a final line `📄 Full report: <path>` referencing the local path so they can click through to the source. Do NOT attempt to send to Telegram yourself — delivery is the orchestrator's job, and re-sending an existing digest is done by calling `bash automations/coaching-notify/notify.sh <path>` instead.
