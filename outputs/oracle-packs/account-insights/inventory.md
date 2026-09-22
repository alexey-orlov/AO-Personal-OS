# Input inventory — Account Insights pack

_Read 2026-09-22. Every file below was opened; nothing is reported from a filename._

| # | File | What it is | Extracted | Status |
|---|---|---|---|---|
| 1 | `Customers/DHL/UC #6 DHL Client Compass - #2.docx` | The signed SoW. 12 weeks, €192,525, 4 phases, full team table, tech stack, prerequisites, 22 assumptions, 5 deliverable groups. | `sources/dhl-uc6-sow.txt` (30.8 KB) via zip+XML strip — `python-docx` is not installed on this Mac | read in full |
| 2 | `Packs/Account Insights/AI Signal-Impact Engine - Accelerator One-pager.pdf` | Vlad's packaging attempt, 3 pp., 2026-09-10. Scope para, 4 verticals with worked examples, a ~25-row capability matrix on 4 lenses, IN/OUT OF SCOPE. | `sources/account-insights-onepager.txt` via `pdftotext -layout` | read in full |
| 3 | `Monthly AI products overviews/…/Oracle AI Packages - section slides.pptx` **slides 9–10** | The WIP customer-story slides. Slide 9: problem/solution, solution layers, verticals, "WHAT THE POC PACKAGE BUYS", artifacts. Slide 10: capability list, architecture, reviewer-UI screenshot, contacts. | text via `python-pptx`; images to scratchpad; `slide10_59.jpg` read as an image | read in full |

## What only source 3 carries

- **The evaluation design**: _"Focus: accuracy + confidence — what the PoC measures, against reviewer approve / reject."_ The SoW instead specifies benchmarking against manually written "golden" briefings. Two different evaluation designs; this is the signal-shape one.
- **"7 external data sources"** — news on target customers, the client's own product offering, firmographic data, organization insights, CRM data, "and more".
- **€190K** as the rounded commercial value, against €192,525 in the SoW.
- **The real reviewer UI** (screenshot), which is the product's actual information model — see below.
- **The architecture's own words**: `NVIDIA AI-Q — RAG baseline: vector search + reranking`.

## The reviewer UI, read off the screenshot — the product's real information model

Signal inbox → signal detail, with `Reviewer view` / `JSON payload` tabs and `Download JSON`.

- **Account card** — Name · Sector · Region · Ticker, plus a **client-relationship framing** ("Logistics for consumer hardware … and inbound logistics for data-center / AI-infrastructure buildout"). The relationship line is first-party context, not public data.
- **Review progress** — Approved / Rejected / Undecided counters.
- **Trigger** — type badge (`news_article`), headline, Source, Date, URL.
- **Article summary**, then **Impact reasoning** — the "so what" as prose, explicitly second-order ("could reshape Meta's spending priorities, changing what DHL moves … and rippling to related accounts").
- **Opportunities**, numbered and **account-tagged** — title, description, `OPPORTUNITY SIZE` (moderate / medium), `CONFIDENCE` bar + `8 / 10`, **`DHL relevance` → a named service line**, `Awaiting review` badge, Approve / Reject, and a free-text "Why this is or isn't pursuable".
- **Cross-account effects** — a chip for the affected third account plus the ripple sentence.
- Every action annotated _"Captured as reviewer feedback — never written back to CRM in this PoC."_

**One tension worth recording:** the one-pager says the output is *"one JSON per affected account"*, but the UI shows **one signal view carrying opportunities for several accounts** (Meta = account 1, HPE = account 8, Vertiv as a cross-account effect). The unit of *reasoning* is the signal; the unit of *delivery* is the account. Both statements are true of different layers, and the artifacts should say so rather than picking one.

## Gaps

- **No record of the 2026-09-10 packaging session** with Vlad — no recording in `OneDrive/Recordings/`, nothing in `OneDrive/Meetings/`, no call note in the repo. The decisions behind the one-pager are undocumented.
- **No delivered results** — the PoC had not started. Nothing in any artifact may print a performance figure.
- **The Oracle-pack column is asserted, not sourced.** Vlad's matrix marks the Oracle+NVIDIA baseline as providing exactly one capability (vector search + reranking). No citation supports it, and the P4 research contradicts it.
