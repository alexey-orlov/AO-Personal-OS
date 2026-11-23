# 3 · Sales Navigator: team count and names

**How to run it**
- Run it yourself in Claude in Chrome, one search at a time, at a human pace.
- The rules are in `research-standards.md`: read-only, search-result cards only.

**Set up the search**
1. Open `https://www.linkedin.com/sales/search/people`.
2. Under Current company, include the company and every LinkedIn page its staff sit under: the parent, divisions, subsidiaries (NextEra needed three).
3. Core count: a Boolean keyword query for the team the offer trains, with Function = Engineering where it helps. Example: `BSP OR "board support" OR driver OR drivers OR kernel OR "functional safety"`.
4. Read the count by zooming on "N results".

**Read the cards**
- `get_page_text` returns nothing on Sales Navigator, so use `javascript_tool`.
- Scroll in steps of five so all 25 cards render.
- Read each `ol li`'s innerText: the name, title and company line, location, and About.
- For a lead link, take the card's first `a[href*="/sales/lead/"]` and strip everything from `?_ntb` on.

**Precision and geography**
- Sample page 1 and a middle page, around 50 cards in all.
- Count a card only when its current role is the target work.
- Record each card's country.

**The LinkedIn estimate**
- Value = count × precision × 0.93 × geo.
- Geo is the sample's weighted mean of: US 1.15, India 1.15, Europe 1.25, other countries including Canada 1.30, China 2.5.
- Write the arithmetic like the reviewed rows: `core: 280 x 0.72 x 0.93 x 1.256 (geo: 32 Canada, 11 IN, 2 EU, 2 US) = 237 | keywords …; filters … | multipliers are working assumptions`.
- Combine the three estimates as `research-standards.md` says, and show all three.
- No team found (none of the sample does the work): set `applies: false`. The note gives the LinkedIn evidence and the nearest group, sized the same way.

**Names**
- Search by leadership terms, or by a site or programme name (e.g. `"Duane Arnold"`).
- Then search each top name on the web.
- Every person gets `name`, `title`, `unit`, `location`, `persona`, `confidence`, `as_of`, `src` and `url`, with `why` saying why they matter.
- Only high-confidence people go on the two-pager.
- Spell names as the company's own pages do: "Jarro", not WLRN's "Jarrow".
- Where Sales Navigator and public sources disagree on a title, use neutral wording ("head of Core Product Engineering") and record both.

**Finish**
- Close the tab when done.
- Set `people_source` to `web + Sales Navigator`.
