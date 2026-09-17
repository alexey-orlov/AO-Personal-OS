# Handoff — recover the July 2026 WfO artifact-build feedback from a cloud session

Paste the block below into EACH July session that built a Workforce Optimization (WfO) artifact, resumed in claude.ai/code (or into one fresh cloud session if it can open those transcripts). The sessions to look for, by what they produced:

| Artifact | Built | File it produced (then in `~/Documents/Documents/SoftServe/Oracle/`, now in OneDrive `Projects/Oracle/Packs/Workforce optimization package/`) |
|---|---|---|
| Feature list (productization workbook + Accelerator Pack one-pager) | 2026-07-07 | `Workforce optimization_productization.xlsx`, `Workforce Optimization - Accelerator Pack one-pager.docx/.pdf` |
| Service packages deck (S/M/L) | 2026-07-13 | `Workforce Optimization - Service packages - Oracle.pptx` |
| Sales one-pager (HTML → PDF) | 2026-07-17 | `Workforce Optimization - Sales one-pager - Oracle.html/.pdf` |
| Executive summary deck | 2026-07-17 | `Workforce Optimization - Executive summary - Oracle.pptx` (+ the EMEA Business Alignment deck copy) |
| Large Document Extraction one-pager review (Vlad's) | 2026-07-27 | `[Oracle Packages] Large Document Extraction and Validation - Acceleration Pack One-pager.pdf` |

---

```text
HANDOFF: extract the packaging-artifact learnings from THIS session into the repo.

Context. I (Alex) am building shippable Claude Code skills that produce Oracle accelerator-pack
packaging artifacts — Feature list · Sales deck · Sales one-pager · Interactive demo · Mini-site
listing — from 13 shared components: app name; one-liner; problem↔solution; ICP one-liner;
relevant verticals + vertical use-case framings; scope-of-service-packages table (PoV Jumpstart /
Integration / Scaling: per-capability handling, timeframe, cost); required Oracle products; optional
Oracle products; capabilities → features with customization scope; high-level architecture
(inputs → stack → outputs); workflow architecture (inputs → processing / human-in-the-loop →
outputs); ROI metrics. This session built one of the Workforce Optimization reference artifacts.
I need everything I corrected, rejected, confirmed or asked for in it — the skills must bake it in.

Do this, read-only except for the one output file:
1. Re-read the whole conversation. List every artifact this session produced (file name, date,
   format, final version) and the inputs I supplied (files, links, pasted text, numbers).
2. Extract EVERY correction, pushback, rejection, preference and approval in my messages. For each:
   my words verbatim (short quote) · date/time · which artifact and which of the 13 components
   it concerned · the generalized rule a skill should follow next time · whether it was a one-off
   or a standing rule. Include design/layout corrections, wording bans, number/pricing fixes,
   naming decisions, and anything I said about the audience (Oracle sellers, SoftServe sellers,
   end customers) or about what stays internal vs external.
3. Extract the production sequence that actually worked: what I asked to see first, how many
   review rounds, what unblocked approval, what I said "done" looked like.
4. Extract confirmed facts: package tiers, durations, prices, KPIs with baselines, Oracle/NVIDIA
   product names used, customer-name rules, the pack name and one-liner as finally approved.
5. Write the result to `context/areas/softserve/docs/2026-07_wfo-<artifact-slug>-build-learnings.md`
   in this repo (sections: 1 Artifacts and inputs · 2 Corrections and rules (table) · 3 Sequence
   that worked · 4 Confirmed facts · 5 Open questions I left unanswered). Evidence-bound, no
   praise, no filler, mark inferences "(inferred)". Commit with message
   "context: July WfO <artifact> build learnings (recovered from session)" on a branch named
   main-<short-slug> and push — the repo auto-merges main-* branches.
6. Reply with the file path and the 10 most important rules, one line each.
```

If a session cannot write to the repo, ask it to print the file content and paste it into the drop zone or into a local session as "fold this into context".
