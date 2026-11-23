# 1 · Intake

**Find the account in the outreach list**
- Source: OneDrive `Projects/Jumpstart for scientists/Outreach/Physical & Bio AI Accounts(Outreach list).csv`, or the team's newer xlsx.
- Map the columns:
  - Owner → `rd_owner`, as written (the R&D owner);
  - CSL/Delivery → `ss_team`, verbatim, e.g. "Rob Duckworth (owner) · DO: Pavlo Chukhna";
  - Relevant service → `list_service`, verbatim;
  - the row's number → `list_row`: file line minus one, for the header.
- An account Alex adds off the list: `list_row` "—", `rd_owner` Alex, `ss_team` the owner he names, and a `flag` saying so.

**Choose the slug**
- Lowercase, with hyphens.
- Check `context/_meta/outreach-tracker.md` and the tracker first: never a second row.

**Check the selection rules** (the page fold)
- California headquarters, or the US headquarters of a foreign company.
- Tiers: P1 is Alex's, P2 is open, P3 is a colleague's.
- An exception gets a `flag` saying why.

**Internal context comes before the web**
- Decks in OneDrive `Current offerings/` and `Monthly AI products overviews/`: extract their text yourself (python-pptx) to `<scratch>/<slug>/decks.txt` for the agents.
- The wiki: `context/areas/softserve/`.
- Any account history Alex shares. It outranks a deck's summary.

**Choose the offer**
- Page 1 is one Jumpstart (Biological, or Hardware & Embedded R&D), chosen by what the account's R&D does (the page fold's definitions); stage 4 second-passes the choice.
- Use "both" only with evidence for both.
- Weak fit: say so plainly.
- No fit: skip the account and tell Alex why.

**Exemplars**
- For the rules: the re-checked rows `nextera-energy` and `blackberry`, in the tracker and as kit account files.
- For a bio page's altitude and tone: `genentech.json` (its problem row predates the money rule).

**Tell Alex in one line, then carry on:** slug, owner, offer, tier, any rule broken.
