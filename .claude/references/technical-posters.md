# Technical posters and showcase pieces

Conference posters (NVIDIA GTC and similar) and other pieces that present a SoftServe solution to engineers. Pointed from root `CLAUDE.md`; read before drafting one. Rules are Alex's, from the GTC 2027 poster round (2026-11-09), where three drafts in a row failed on the points below.

## Alex's rubric

1. **Write like an engineer.** Plain titles and headings that name the problem and the technology. No slogans, no "not X but Y", no triads, no em dashes, no abstract nouns doing the work ("first-class", "discipline").
2. **Novelty a specialist accepts.** A claim of "new" must survive a reviewer from the vendor; prefer a concrete design decision with its number (a memory limit, a re-solve rule, a threshold) over a label.
3. **Map to the vendor's technology and current priorities.** Name the exact component and version and say what it makes possible here; credit a component to the vendor's product only where that version's documentation lists it (2026-11-09: Grounding DINO and SAM 2 were printed as "VSS 3.3 components", but only the older 2.4 container lists them). Every piece carries a "what the vendor brings" table: capability → where it helps. For NVIDIA, check its current releases and event themes before writing.
4. **Simple sentences.** If a busy engineer has to read it twice, split it.
5. **Concrete over generic.** Sizes, parameters, GPU shapes, counts, model sizes, from the source documents.
6. **Combined cases stay balanced.** When one piece covers two engagements, each gets its own lane, numbers and takeaways.
7. **Architecture matches the sources, box by box.** Every node, arrow, model and GPU traces to a design or architecture document; a component the sources do not contain is not drawn. Check each one before delivery.
8. **Diagrams are internally consistent.** Legend colours match what each box is; numbering reads in order; the deciding component is drawn as the decider.
9. **No meta text on the artifact.** No disclaimers, hedges, draft lines, placeholders, "synthetic data" notes or methodological apologies. Caveats and open items go to the notes for Alex.
10. **Reads without our context.** Acronyms spelled out once; no internal names, no "the customer" or "the pilot" without saying who or what.
11. **Never show build status.** Nothing on the piece says or implies built, delivered, piloted, designed, planned, proposed, starting or next, in words or styling (no dashed "proposed" boxes, no "Next" headings), and that includes data labels and headings ("proof-of-value data", "no live tests": say "historical bookings", "past days only"). Describe the solution in the present tense. Where nothing was measured, show estimates (rule 13); never explain the absence of a measurement.
12. **Present the use case, not the engagement.** The title, challenge, takeaways and captions name the class of problem the solution serves, in the pack's own terms: visual damage assessment across asset classes, not one network's windscreens; extraction from long contracts, not an airline's ground-handling agreements; case investigation, not one hospital's complaints. The engagement's specifics appear only as benchmark data or a worked example, with no customer or internal product name, sector-only standard or geography that narrows it to one customer.
13. **Results are the strongest sourced figures, shown as change.** Take them from the pack's agreed metric set (its spec and Alex's rulings on the wiki page) and from the partner-facing ROI materials (the Oracle sales one-pager, the post-PoC business case, the executive updates), not only from the delivery report.
    - **The highlighted number is the change itself:** the percentage in big type with the from → to beside it (−97%, 2 days → 30 min). The subtitle follows the same pattern. A new value in big type with the baseline in its caption does not count (2026-11-10).
    - Add the volume view a buyer recognizes (a region's plan, a new site's agreements). A computed figure uses measured inputs and says so in its label ("at the measured rate").
    - **Every piece shows business numbers.** Where nothing was measured, use estimates built from sourced inputs (the pack's modelled metrics, published industry averages). Say "estimated" inside the metric's own wording ("an estimated 20% fewer wrong calls"), never as a footnote, a badge or a separate label (2026-11-10).
    - No footnotes under results: each qualifier goes into its own row. The arithmetic, the sources and any conflict between them go in the notes.
14. **Every vendor feature names the business outcome it moves.** The vendor table runs feature → what it does here → business outcome, with the measured number where one exists and otherwise the measure it moves (fewer missed appointments, replacements paid only when the rule requires one). Phrase outcomes as real-world impact, never as sales copy ("no license fee" reads as promotion).
15. **Novelty is emphasized, not buried.** A "What's new" block, visually distinct and placed right after the results, lists the design decisions that are new, each one a specialist accepts (rule 2), each ending on what it changes for the business.
16. **Low word density.** Same messages, same clarity for a reader with no context, fewer words: no fact stated twice across blocks, the number instead of the sentence, one idea per line.

## Procedure that worked

1. Brief = the event's call rules (exclusions, criteria, format) + the requester's ask + this rubric.
2. Draft the architecture from the engagement documents (architecture, scope, requirements), not from wiki summaries; draft the framing from the pack spec (rule 12) and the results from the pack's metric set and the ROI materials (rule 13).
3. Red-team each piece with a fresh-context reviewer that holds only the piece, the sources, this rubric and the event's own guidelines and jury criteria. It scores the piece as a juror would and returns pasteable rewrites plus a node-by-node architecture check. Run one reviewer per piece in parallel, then a last compliance pass on the final version.
4. Verify every new fact a reviewer proposes against its cited source before using it; drop unsourced ones.
5. Render and check the fit report; deliver the editable file, previews and a notes file with the open items.

## NVIDIA GTC specifics (GTC 2027 call and guidelines page, read 2026-11-09)

- Submit at `register.nvidia.com/flow/nvidia/gtc27/cfsposters/form/submittername/login` (the call page's "Submit Poster"), each author from their own NVIDIA account; the guidelines sit behind the same login at `…/gtc27/cfsresources/page/posters`.
- 43 × 24 in landscape, 1-inch white margin (design area 41 × 22 in, nothing outside it), print-ready PDF at full size, images at 300 ppi, no NVIDIA branding or logos (your own company logo is fine).
- Title at most 15 words, public description at most 100 words, up to 2 topics.
- Excluded: "promotional, business use cases, conceptual, or lack technical depth". Guideline don'ts: no promoting products or services (even your own), no marketing language, nothing not cleared for public presentation.
- Guideline do's: real-world impact with specific metrics; novel algorithms, architectures, methods or implementations; the four sections Problem Statement / Goal, Application of NVIDIA Technology, Benchmarking Methods (dataset, hardware, tools), Results and Outcomes (graphs, charts or quantitative comparisons); acronyms explained; visuals that support claims; prior work cited.
- The 2026 Top Poster Award example: a results subtitle under the title, numbered sections (Objective, Challenges, Solution, Key Achievements, References), short one-idea bullets, and the key result as "83% reduction (from 2 hours to 20 minutes)".
- Jury criteria (call page): proven technical outcomes with practical impact; significant innovation or improvement enabled by accelerated computing; a clear framework (problem or goal, NVIDIA technology applied, benchmarking method, results). Number the sections in reading order under those names, and put a goal line in the problem section.
- The submission form, 2027:
  - **Public title:** at most 12 words and 120 characters. No company-specific terms, acronyms or products. Lead with the problem, signal why it matters now, show what is novel. Print the same title on the poster, with the vendor stack and the headline result in a subtitle line under it.
  - **Header:** title, results subtitle, the authors with their affiliation, then every author's email on its own line, in author order (each submitter's address, not only the first author's).
  - **Takeaways:** 3 to 5 one-sentence takeaways, at most 260 characters each.
  - **Tags:** primary audience plus others, one key theme, primary industry plus others, and the NVIDIA technologies from a fixed list. The 2026 drafts' filled-in form is in the drafts folder's notes file.
- Toolchain and the 2026 drafts: SoftServe OneDrive `Projects/Nvidia posters/Orlov - GTC27 drafts/` (`toolchain/` regenerates the posters on the accepted SoftServe poster's master).
