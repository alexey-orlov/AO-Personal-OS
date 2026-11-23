# Agent briefs (Opus, one account per agent)

Fill the `<…>` slots and send independent agents in one message. Every brief starts with COMMON.

**COMMON**
> Today is <date>. Account: <Account> (<slug>). Offer: <AI Jumpstart for Hardware & Embedded R&D | Biological R&D>: <one-line definition from the tracker page's fold>.
> Rules:
> - Every fact carries its date and a link; inferences are marked "(inferred)"; quotes are 15 words or fewer.
> - A job ad counts only if posted in the last 18 months; say whether it is open or closed today. Nothing older than five years counts at all.
> - A page that fails is "unreachable": try one other copy, then move on. That is never disproof.
> - Never put SoftServe's name or any internal detail in a query.
>
> Tools:
> - Read and Grep for files, WebSearch and WebFetch for the web.
> - Bash only for one python3 or pdftotext command per call, never `&&` or `;`.
> - No LinkedIn, no logins, no forms.
> - Write nothing except your output file.
>
> Output: write `<scratch>/<slug>/<name>.json` after your first unit of work, and rewrite it after every unit. Return 200 words or fewer.

**Research (stage 2)**
- **Company + units + roles:** what the company does (one short paragraph), headcount (latest annual report), HQ, every R&D unit and what it builds or researches (concrete nouns, F or I), and buyer, champion, co-sponsor and gatekeeper roles mapped from these personas: <page fold personas>. Fields: as in `templates/account-doc.json`.
- **Signals:** adoption `+` and pain `!` from the team the offer serves, from <page fold "where buying signals come from">. Grade each S, M or W with the rubric: <paste the rubric from research-standards.md>. List strongest first, and give a best hook.
- **Oracle:** confirmed use only (Oracle, the company or a named partner says so, or its own ads from the last 18 months); what it runs instead; migrations; items not counted, with reasons.
- **Edge AI:** does it build a device whose AI runs on the device or splits with the cloud? Dated evidence (shipped, planned, hiring), where the AI runs, vendor names only from the source that names them, the kit layers that apply, caveats.
- **Size, first principles and public:** R&D spend or headcount × the share in the target work, as low, likely and high; any public team figure.

**Verify (stage 4), each in a fresh agent**
- **Second pass:** "Independent second pass on one claim. Try to disprove it; confirm it only if the evidence survives. Claim: <…>. Cited source: <…>. Search on your own first, then test for a skill-only job-ad line, a copy you cannot trace to the company, an undated page, evidence older than 18 months, a newer migration. Verdict: confirmed, narrowed or failed, with evidence items."
- **Signals:** "Open every signal in `<input.json>`. Confirm the quote, the true date, open or closed, and the team; regrade; recommend keep, regrade or drop; give corrected text."
- **Fit facts + hook:** "Check each two-pager claim in `<input.json>` against a dated source and correct it. Find what a delay costs the business, with the arithmetic marked inferred. Find the strongest current trigger from <team>, or say there is none."

**Page 2 (stage 6)**, from the bulk two-pager workflow of 13 Nov:
- **Draft:** "Read the tracker doc `<path>` and the approved example `one-pager-build/accounts/genentech.json`. Write the rows Account, Est. R&D headcount, <What their R&D builds | What they research>, Likely problem, Need signals, plus two or three champions with high confidence. Match the example's altitude, length and tone. Use plain words, no em dashes, numbers exactly as in the record, nothing the record does not support. Say which field each row came from."
- **Fact-check:** "Assume the draft is wrong until the record proves each claim. Check every number, date, name and title. The headcount must equal the record's estimate. Need signals must be the strongest real hooks, S before M, correctly dated. Web-search each champion (name plus company) and drop anyone a public source contradicts. List every correction."
- **Edit:** "Plain-language edit for an account executive with no R&D background. No fact, number, date, name or title changes. Same rows and order; champions exactly as given."
