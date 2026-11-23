# 6 · Two-pager content (page 2)

**The file**
- Fill `templates/two-pager-account.json` into OneDrive `one-pager-build/accounts/<slug>.json`.
- If the file exists, read it first and keep Alex's edits.

**Rows, in this order**
1. `Account`: "<Name> · <kind of company>, <HQ city>". Add the SoftServe relationship only as the record proves it, and any merger a seller must know.
2. `Est. R&D headcount`: "~N <who is counted>, of <total> staff". N is the tracker estimate. With no team: "No firmware team; nearest: ~N …".
3. `What their R&D builds` (hw) or `What they research` (bio): concrete nouns.
4. `Likely problem`: a named role and their situation, ending on stage 4's cost to the business, then "(inferred)".
5. `Need signals`: the one or two strongest current signals from the tracker, each "(Mon YYYY)", worded as the tracker words them. Omit the row when no S or M signal is a real hook.

**Other R&D solutions** (only where the tracker verdict is Yes)
- `Oracle solutions`: the Oracle platforms the account runs, never a use case. Caption "Oracle mini-site", url `https://oracle-softservedev-practice.web.app/`.
- `Edge AI Kit`: the tracker's dated one-liner, not starting with the kit's name. Caption "Edge AI Kit deck", url from `accounts/_other_rows.json`.
- Links print as captions.

**Champions**
- Two or three "Name, short title", with titles of six words or fewer.
- People with high confidence in the tracker only: champions first, then buyers.
- `champions_note` is required: the build crashes without it.

**Price**
- Essential `"from ~$75K"` (`deal_prices`) for a team of about ten or fewer.

**Style**
- Plain words, no em dashes, dates like "Mar 2026", numbers exactly as in the tracker; about 22 words a row.

**Pipeline** (`briefs-page2.md`), one account per agent
1. Draft from the tracker doc, matched to the exemplar.
2. Fact-check in a fresh agent: the draft against the record and the stage-4 sources, champions web-checked.
3. Plain-language edit; you read it last.
