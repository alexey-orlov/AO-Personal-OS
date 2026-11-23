# Agent briefs: the common block (prefix every brief with it)

> Today is <date>. Account: <Account> (<slug>). Offer: <AI Jumpstart for Hardware & Embedded R&D | Biological R&D>: <one-line definition from the tracker page's fold>.
> Read first:
> - `<scratch>/<slug>/context.md`: the offer definitions, personas, where signals come from, the column rules;
> - the S/M/W rubric in `.claude/references/research-standards.md` ("Red-team account research");
> - `<scratch>/<slug>/decks.txt`, when present: internal deck text.
>
> **Rules**
> - Every fact carries its date and a link; inferences are marked "(inferred)"; quotes are 15 words or fewer.
> - A job ad counts only if posted in the last 18 months; say whether it is open or closed today.
> - Nothing older than five years counts.
> - A page that fails is "unreachable": try one other copy, then move on. It is never disproof.
> - Never put SoftServe's name or any internal detail in a query.
>
> **Tools**
> - Read and Grep for files, WebSearch and WebFetch for the web.
> - No Bash: a permission prompt would hang you.
> - No LinkedIn, no logins, no forms.
> - Write nothing except your output file.
>
> **Output**
> - Write `<scratch>/<slug>/<name>.json` after your first unit of work, and rewrite it after every unit.
> - Return 200 words or fewer.

**Before sending any brief:** write `context.md` (copy the page fold's sections) and `decks.txt` (your python-pptx extract).

Model: `opus`, one account per agent; send independent agents in one message.
