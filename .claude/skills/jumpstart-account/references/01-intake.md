# 1 · Intake

**Find the account in the outreach list**
- Source: OneDrive `Projects/Jumpstart for scientists/Outreach/Physical & Bio AI Accounts(Outreach list).csv`, or the team's newer xlsx (see the `presales-status-collector` skill's Sources).
- Copy these verbatim: Relevant service (`list_service`), Owner and CSL/Delivery (`ss_team`, as "Name (owner) · DO Name"), and the row number (`list_row`).
- Spell names exactly as the file does.

**Choose the slug**
- Lowercase, with hyphens.
- First check `context/_meta/outreach-tracker.md` and the tracker for an existing doc, so you never create a second row.

**Check the selection rules** (the page fold's "Which accounts, in which order")
- California headquarters, or the US headquarters of a foreign company.
- Tiers: P1 is Alex's, P2 is open to claim, P3 is a colleague's (coordinate first).
- Colleagues' accounts and accounts too large to approach stay out.
- When Alex asks for an account outside the rules, add it with a `flag` saying why, e.g. "Not in California; in the table because it is yours."

**Read internal context before the web**
- The decks in OneDrive `Current offerings/` (the hardware session deck, the GTM deck) and `Monthly AI products overviews/` (Oracle executive updates, research-program revenue decks). Search each for the account name with one python-pptx call.
- The wiki: `context/areas/softserve/` and its call notes.
- Any account history Alex shares.
- Record each claim with its file and slide, or the message it came from.
- The account team's own history beats a deck's summary: a slide had counted two of BlackBerry's three opportunities and misread them.

**Choose the offer**
- Page 1 is one of the two Jumpstarts only: Biological R&D or Hardware & Embedded R&D.
- Pick by what the account's R&D does, using the page fold's definitions.
- Use "both" only with evidence for both. Drop a tag the evidence doesn't support (Horizon is not bio).
- Where the fit is weak, say so plainly in the row and the note, as for NextEra.
- Where neither offer fits, skip the account and tell Alex why. Benchling was skipped: a lab-software partner with no lab.

**Pick the exemplars to match**
- The approved page-2 table: `one-pager-build/accounts/genentech.json`.
- Fully reviewed tracker rows: `generac` and `horizon-surgical-systems`.
- Match their altitude and length; the existing cells are the spec.

**Tell Alex in one line**
- the account, slug, owner, offer and tier;
- anything that breaks the selection rules.

Then carry on.
