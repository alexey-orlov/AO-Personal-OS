# 6 · Two-pager content (page 2, the account fit)

**The file**
- Fill `templates/two-pager-account.json` into OneDrive `one-pager-build/accounts/<slug>.json`.
- If the file exists, read it first and keep Alex's edits.
- Page 1 comes from the kit: `hw.json` or `bio.json`, never edited per account.

**Rows, in this order, with these labels**
1. `Account`: "<Name> · <kind of company in a few words>, <HQ city>". Then SoftServe's relationship, only as the record proves it ("SoftServe client"). Add a pending merger or another fact a seller must know.
2. `Est. R&D headcount`: "~N <who is counted>, of <total> staff". N is the tracker estimate, exactly. Where no team exists, "No firmware team; nearest: ~N …".
3. `What their R&D builds` (hardware) or `What they research` (bio): concrete nouns, no marketing words.
4. `Likely problem`: a named role, their situation, and what it costs the business, ending on money. Mark it "(inferred)".
5. `Need signals`: the one or two strongest current signals, each dated "(Mon YYYY)". Closed ads are "sought". An executive's remark never leads. Omit the row when no S or M signal is a real hook.

**Other R&D solutions**
Add a bullet only when the tracker verdict is Yes:
- `Oracle solutions`: names only the Oracle platforms the account runs, never a use case. `url` is `https://oracle-softservedev-practice.web.app/`, `url_label` is "Oracle mini-site".
- `Edge AI Kit`: the tracker's dated one-liner, not starting with the kit's name. `url` is the Edge AI Kit deck link copied from an existing account file, `url_label` is "Edge AI Kit deck".
- A link prints as its caption, never as a bare URL.

**Champions**
- Two or three "Name, short title" entries, titles of six words or fewer.
- High confidence only: champions first, then buyers.
- Keep `champions_note` as it is.

**Price**
- `deal_prices: {"Essential": "from ~$75K"}` when the team to train is about ten engineers or fewer (Horizon, Maximo).
- Say so in the report.

**Style**
- Plain words a seller grasps cold; no em dashes; dates like "Mar 2026".
- Numbers exactly as in the tracker.
- Aim for 22 words a row, as on Genentech's page. The page-length check in stage 7 is the hard limit.

**Pipeline, one account per agent** (`agent-briefs.md`)
1. **Draft** from the tracker doc, matching Genentech.
2. **Fact-check:** a fresh agent checks every number, date, name and title against the record. It web-checks each champion and drops anyone a public source contradicts.
3. **Plain-language edit:** facts untouched.

The main session reads the result last, then builds it.
