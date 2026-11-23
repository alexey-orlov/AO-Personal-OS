# 2 · Research fan-out

- **One account:** one Opus agent per dimension below, sent in one message. Several accounts: one agent per account per dimension group.
- **Prompts:** use `agent-briefs.md`.
- **Output:** each agent writes JSON in the shape of its fields in `templates/account-doc.json`.
- **Progress:** each agent updates `<scratch>/<slug>/<dimension>.json` after every unit of work.

| Dimension | Tracker fields | What good looks like |
|---|---|---|
| Company | `what_they_do`, `sum_what`, `hq_text`, `hq_california`, `headcount`, `flag` | One short paragraph down to the essence. Headcount from the latest 10-K or an equivalent, with quote, date and link. |
| Units | `hw_units` and/or `bio_units` | Each R&D unit and what it builds or produces, in concrete nouns (devices, chips, modalities), labelled F or I. |
| Roles | `*_roles`, `sum_roles_*` | The decks' personas from the page fold (buyer, champion, co-sponsor, gatekeeper), mapped onto this company's own org, each with a why. |
| Signals | `*_signals`, `sum_signals_*` | Signals dated and linked: adoption `+` and pain `!`. Use the page fold's list of where to look, and the rubric in `research-standards.md`. List them strongest first. |
| Oracle | `oracle`, `oracle_short`, `oracle_use`, `sum_oracle` | Confirmed use only (the page fold's Oracle rule). Record what runs instead, any migrations, and the items not counted. |
| Edge AI | `edge_ai` | A verdict with dated evidence, saying whether it is shipped, planned or being hired for; the kit's layers that apply; caveats. |
| Size, first principles | `size_*.methods.first_principles`, `.public` | Headcount or R&D spend times the relevant share, as low, likely and high, plus any public figure. The LinkedIn count comes in stage 3. |
| Angle | `angle`, `angle_note`, `sum_angle` | The lead module by its exact deck name (the page's MODULES list), and one of the ready modules where it fits. Name the offer's use case and the sponsor. |
| Gaps | `gaps`, `sum_gaps` | Every search a limit or a blocked page left undone. Finish those searches before stage 4. |

**Summary fields (`sum_*`)**
- What Alex reads off the screen to an account exec.
- One or two dated facts in plain words, written by hand.
- Never a truncated list, a count or an S/M/W code.

**Where to send Alex a first look**
- Publish the company and the signals as soon as they land: write `research_status: "partial"` on a new row.
- Alex starts working from partial rows.
