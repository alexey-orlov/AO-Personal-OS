# 2 · Research fan-out

**How**
- Agents take the first five dimensions below, one each, sent in one message (`briefs-research.md`).
- Each writes `<scratch>/<slug>/<dimension>.json` per unit of work, in the shapes of `templates/account-doc.json`.
- You write Angle and Gaps yourself from their output.

**Dimensions** (fields): what good looks like
- Company, units, roles (`what_they_do`, `sum_what`, `hq_*`, `headcount`, `*_units`, `sum_units_*`, `*_roles`, `sum_roles_*`): one paragraph to the essence; headcount quoted; each unit with what it builds (F or I); the page fold's personas mapped onto this org.
- Signals (`*_signals`, `sum_signals_*`): adoption `+` and pain `!`, dated and linked, graded by `research-standards.md`, strongest first.
- Oracle (`oracle`, `oracle_short`, `oracle_use`, `sum_oracle`): confirmed use only (the page fold's rule), plus what runs instead and what is not counted.
- Edge AI (`edge_ai`): a verdict with dated evidence (shipped, planned or hiring) and the kit's layers.
- Size (`size_*.methods.first_principles`, `.public`): spend or headcount × share, as low, likely and high, plus any public figure.
- Angle, yours (`angle`, `angle_note`, `sum_angle`): the lead module by its exact name, with its use case here and the sponsor; a ready module leads where it fits.
- Gaps, yours (`gaps`, `sum_gaps`): every search a limit or block left undone, finished before stage 4.

**Modules** (the tracker page's MODULES list)
- Hardware, ready: Peripheral driver development, Legacy code modernization, Software optimization for target hardware.
- Hardware, in build: Fault diagnosis, Bench and HIL test automation, Edge AI model adaptation.
- Bio, from the science workflows page `Current offerings/index_v2_9179_6781.html`: Evidence → hypothesis, Hypothesis → reproducible computation; Resource allocation across pipelines is gated.

**Summary fields (`sum_*`)**
- One or two dated facts, in plain words Alex can read to an account exec.
- Never a truncated list, a count or an S/M/W code.

**Publish early**
- Write the company and the signals as soon as they're in, with `research_status: "partial"`.
