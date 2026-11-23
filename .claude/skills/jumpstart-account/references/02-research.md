# 2 · Research fan-out

**How**
- One Opus agent per dimension, all sent in one message, using `briefs-research.md`.
- Each writes `<scratch>/<slug>/<dimension>.json` per unit of work, in the shapes of `templates/account-doc.json`.

| Dimension | Fields | What good looks like |
|---|---|---|
| Company | `what_they_do`, `sum_what`, `hq_*`, `headcount`, `flag` | One paragraph, down to the essence. Headcount from the latest annual report, quoted and dated. |
| Units | `hw_units` / `bio_units` | Each R&D unit and what it builds, in concrete nouns, labelled F or I. |
| Roles | `*_roles`, `sum_roles_*` | The page fold's personas mapped onto this company's org, each with a why. |
| Signals | `*_signals`, `sum_signals_*` | Adoption `+` and pain `!`, dated and linked. Graded by `research-standards.md`, strongest first. |
| Oracle | `oracle`, `oracle_short`, `oracle_use`, `sum_oracle` | Confirmed use only (the page fold's rule). Record what runs instead and what is not counted. |
| Edge AI | `edge_ai` | A verdict with dated evidence (shipped, planned or hiring) and the kit's layers. |
| Size | `size_*.methods.first_principles`, `.public` | Spend or headcount × share, as low, likely and high, plus any public figure. LinkedIn comes in stage 3. |
| Angle | `angle`, `angle_note`, `sum_angle` | The lead module by its exact deck name, a ready one where it fits, with the use case and the sponsor. |
| Gaps | `gaps`, `sum_gaps` | Every search a limit or a blocked page left undone. Finish those before stage 4. |

**Summary fields (`sum_*`)**
- What Alex reads off the screen to an account exec.
- One or two dated facts in plain words.
- Never a truncated list, a count or an S/M/W code.

**Publish early**
- Write the company and the signals as soon as they're in, with `research_status: "partial"`.
