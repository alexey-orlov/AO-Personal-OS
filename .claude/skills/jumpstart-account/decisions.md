# jumpstart-account: decisions and the incidents behind them

Rationale lives here; the runtime cards hold only the rules. Never load this file at runtime.

## Where the skill comes from
- **The first 13 rows** (Nov 12-14, 2026), built in the session "Account research for AI Jumpstart in Physical AI". Alex's brief listed the columns: what the company does, R&D units and what they build per offer, buyer and champion roles, named people (empty when unsure), buying signals with links, definitions of bio and hardware work, team sizes by three methods.
- **The bulk two-pager session** "AI jumpstart sales one-pagers" (Nov 13-14). Its rules:
  - page 2 is drafted, fact-checked and edited by one agent per account, matched to the approved Genentech table;
  - Oracle bullets name platforms only;
  - links print as captions;
  - page 2 fills its sheet;
  - accounts the offer doesn't fit are skipped (Benchling).
- **Alex's later challenges**, each now a check:
  - a CEO quote is no trigger (Generac, Nov 13);
  - ALSO's signals came from the wrong team;
  - likely problems must end on money (ALSO, Horizon);
  - "former client" rested on one CRM flag (Brain Corp);
  - Horizon is not bio;
  - the fit blocks needed verifying (Horizon, Maximo);
  - entry price ~$75K for small teams;
  - the new rows needed the same checks (NextEra, BlackBerry, Nov 18).

## Incidents that shaped specific rules
- **Second pass on Oracle Yes:** NextEra's "we delivered Unifier" rested on one bare credential line. It was narrowed to "on our Oracle credentials list (scope to confirm)".
- **Stale hook:** NextEra's Teams-note hook was a Feb 2025 job ad. It was replaced by the Duane Arnold control-room upgrade.
- **"Hiring" vs "sought":** BlackBerry's two-pager said "hiring" when every dated ad had closed.
- **TI in the 2026 list:** BlackBerry's note listed TI among 2026 chips, but TI's newest QNX BSPs are from 2025.
- **Titles:** Justin Moon is SVP on LinkedIn and VP in QNX's releases, hence the neutral title on the page.
- **Misattributed remark:** the tracker credited a colleague's sim-to-real remark to the AM.
- **Account history beats a deck:** the 6 Nov hardware deck counted two of BlackBerry's three QNX opportunities and read them as legacy-code work. The account team's history (19 Nov) corrected it.
- **Scratchpad cleanup:** macOS emptied the scratchpad mid-project twice. It took the kit's `build.py` (Nov 17) and the research JSON (Nov 22), hence the durable kit in OneDrive and `research/<slug>/`.
- **Agents and python3:** agents may not run python3, which is not allow-listed. An unattended agent that hits a prompt hangs (CLAUDE.md, Subagents), so the main session extracts deck text for them.
- **Fresh review (Nov 22):**
  - the template must keep the unused offer half empty, as the reviewed rows do;
  - a new tracking doc is created with `set`;
  - the outreach list's Owner column is the R&D owner;
  - the hook rule's one home is the message-writing playbook.
- **Careers redirects (L'Oréal, Nov 22):** every careers.loreal.com job page renders the careers homepage to a fetcher, even for open ads, so the research agents first read a redirect as "closed". The verify brief now says a redirect proves nothing and dates a closure from a dated copy (an aggregator).
- **Alex's own note (L'Oréal, Nov 22):** Alex wrote and sent the L'Oréal note himself, in four bubbles, and the checker's three-bubble rule would have forced a rewrite of a sent note. `teams_note.author: "alex"` marks his notes and the checker skips the playbook checks for them. The page labels three slots (Hi, Pitch, 2-pager), so his extra middle bubbles join `msgs[1]` rather than shifting the labels. It is an explicit field rather than a phrase in `note` (CLAUDE.md: one explicit source per state).
- **Confidence of names (Nov 22):** the reviewed rows label names seen only in Sales Navigator as high (Genentech's Karin Briner, BlackBerry's Shahed Bhuiyan), except BlackBerry's Jordan Edgecombe (medium, 'no public source'). Card 03 now states the rule the majority follows: a current card shows the role, so the name is high.
- **First runs of the new checker on the reviewed rows (Nov 22):**
  - BlackBerry's page names Jordan Edgecombe as a champion, though the tracker gives him medium confidence;
  - Generac's Edge AI evidence keeps a Jan 2021 SmartCamera item that is older than five years, although its Nov 2026 item makes the same point.
  - Alex had both fixed the same day: Edgecombe relabelled high; the 2021 item dropped, the "on the device" detection marked inferred (the current page claims on-device processing and person detection without linking them), and a caveat cut off at "Generac proper…" completed from the row's own evidence.

## Choices
- **Page 1 is one of two Jumpstarts only.** Alex, Nov 18: "we consider only between 2 kinds of jumpstarts".
- **The checker's FAILs are hard rules; its WARNs are judgment calls,** each needing a line in the report.
