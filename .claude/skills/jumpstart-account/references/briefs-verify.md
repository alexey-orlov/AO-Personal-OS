# Agent briefs: verify (stage 4), each in a fresh agent

Prefix each with `briefs-common.md`. The input file holds the row's signals and two-pager rows.

**Second pass on a Yes** (Oracle, Edge AI)
> Independent second pass on one claim. Try to disprove it; confirm it only if the evidence survives.
> Claim: <…>. Cited source: <…>.
> Search on your own first. Then test for:
> - a job-ad line that names it only as a skill;
> - a copy you cannot trace to the company;
> - an undated page;
> - evidence older than 18 months;
> - a newer migration.
>
> Read any internal source cited (one python-pptx call), and report its exact wording.
> Verdict: confirmed, narrowed or failed, with evidence items (url, date, quote, check) and each test's result.

**Signals**
> Open every signal in `<input.json>`. Confirm:
> - the quote;
> - the true date, and for a job ad, whether it is open or closed today;
> - the team it comes from.
>
> Regrade with the rubric. Recommend keep, regrade or drop, with a reason, and give corrected text.
> A closed ad is "sought". A Sales Navigator item stays unopened: grade it on its text.

**Fit facts and the hook**
> For each two-pager claim in `<input.json>`, give a verdict (correct, wrong, outdated or unsupported), a dated source, and corrected wording.
> Find what a delay costs the business in money, with the arithmetic marked "(inferred)".
> Confirm each champion's title from a public source, or say there is none.
> Find the strongest current trigger from <the team the offer serves> (a hire, a mandate, budget, or pain in the exact work), or say plainly that none exists.
