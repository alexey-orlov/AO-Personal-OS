# 3 · Sales Navigator: team count and names

**How to run it**
- Yourself, in Claude in Chrome, one search at a time.
- Read-only: cards only.

**Search**
1. Open `https://www.linkedin.com/sales/search/people`.
2. Current company: the company plus every LinkedIn page its staff sit under (NextEra needed three).
3. Core count: a Boolean keyword query for the team the offer trains, plus Function = Engineering where it helps. Example: `BSP OR "board support" OR driver OR drivers OR kernel OR "functional safety"`.
4. Zoom on "N results" to read the count.

**Read the cards**
- `get_page_text` is empty on Sales Navigator, so use `javascript_tool` on each `ol li`'s innerText.
- Scroll in steps of five so all 25 cards render.
- Lead link: the card's first `a[href*="/sales/lead/"]`, cut at `?_ntb`.

**The LinkedIn estimate**
- Sample page 1 and a middle page. Note each card's country, and count a card only when its current role is the target work.
- Value = count × precision × 0.93 × geo.
- Geo is the sample's weighted mean of: US 1.15, India 1.15, Europe 1.25, other countries including Canada 1.30, China 2.5.
- Write the arithmetic as the reviewed rows do: `core: 280 x 0.72 x 0.93 x 1.256 (geo: …) = 237 | keywords …; filters … | multipliers are working assumptions`.
- Combine the three estimates as `research-standards.md` says.
- No team: `applies: false`, with the LinkedIn evidence and the nearest group in the note.

**Names**
- Search by leadership terms or a site name (`"Duane Arnold"`), then check each name on the web.
- Spell names as the company's own pages do ("Jarro", not "Jarrow").
- Where titles conflict, use neutral wording.
- Fill every person field. Only high-confidence people go on the two-pager.

**Finish:** close the tab; `people_source` = `web + Sales Navigator`.
