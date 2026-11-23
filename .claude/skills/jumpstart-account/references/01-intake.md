# 1 · Intake

**Find the account in the outreach list**
- Source: OneDrive `Projects/Jumpstart for scientists/Outreach/Physical & Bio AI Accounts(Outreach list).csv`, or the team's newer xlsx (see `presales-status-collector`, Sources).
- Copy these verbatim: Relevant service (`list_service`), Owner and CSL/Delivery (`ss_team`, as "Name (owner) · DO Name"), and the row number (`list_row`).
- An account Alex adds that is not on the list:
  - `list_row` is "—";
  - `flag` says so.

**Choose the slug**
- Lowercase, with hyphens.
- Check `context/_meta/outreach-tracker.md` and the tracker first, so you never create a second row.

**Check the selection rules** (the page fold)
- California headquarters, or the US headquarters of a foreign company.
- Tiers: P1 is Alex's, P2 is open, P3 is a colleague's (coordinate first).
- Colleagues' accounts and accounts too large to approach stay out.
- An exception Alex asks for gets a `flag` saying why.

**Read internal context before the web**
- Decks: OneDrive `Current offerings/` and `Monthly AI products overviews/`. Search each with one python-pptx call.
- The wiki: `context/areas/softserve/`.
- Any account history Alex shares.
- Record each claim with its file and slide.
- The account team's own history beats a deck's summary: a slide had miscounted BlackBerry's opportunities.

**Choose the offer**
- Page 1 is one Jumpstart, Biological R&D or Hardware & Embedded R&D, chosen by what the account's R&D does (the page fold's definitions).
- Use "both" only with evidence for both, and drop a tag the evidence doesn't support.
- Weak fit: say so plainly (NextEra).
- No fit: skip the account and tell Alex why (Benchling, a lab-software partner with no lab).

**Pick the exemplars**
- The approved page-2 table: `one-pager-build/accounts/genentech.json`.
- Reviewed tracker rows: `generac`, `horizon-surgical-systems`.
- Match their altitude and length.

**Tell Alex in one line, then carry on**
- slug, owner, offer, tier;
- any rule the account breaks.
