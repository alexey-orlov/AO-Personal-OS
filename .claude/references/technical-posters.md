# Technical posters and showcase pieces

Conference posters (NVIDIA GTC and similar) and other pieces that present a SoftServe solution to engineers. Pointed from root `CLAUDE.md`; read before drafting one. Rules are Alex's, from the GTC 2027 poster round (2026-11-09), where two drafts in a row failed on the points below.

## Alex's rubric

1. **Write like an engineer.** Plain titles and headings that name the problem and the technology. No slogans, no "not X but Y", no triads, no em dashes, no abstract nouns doing the work ("first-class", "discipline").
2. **Novelty a specialist accepts.** A claim of "new" must survive a reviewer from the vendor; prefer a concrete design decision with its number (a memory limit, a re-solve rule, a threshold) over a label.
3. **Map to the vendor's technology and current priorities.** Name the exact component and version and say what it makes possible here. Every piece carries a "what the vendor brings" table: capability → where it helps. For NVIDIA, check its current releases and event themes before writing.
4. **Simple sentences.** If a busy engineer has to read it twice, split it.
5. **Concrete over generic.** Sizes, parameters, GPU shapes, counts, model sizes, from the source documents.
6. **Combined cases stay balanced.** When one piece covers two engagements, each gets its own lane, numbers and takeaways.
7. **Architecture matches the sources, box by box.** Every node, arrow, model and GPU traces to a design or architecture document; a component the sources do not contain is not drawn. Check each one before delivery.
8. **Diagrams are internally consistent.** Legend colours match what each box is; numbering reads in order; the deciding component is drawn as the decider.
9. **No meta text on the artifact.** No disclaimers, hedges, draft lines, placeholders, "synthetic data" notes or methodological apologies. Caveats and open items go to the notes for Alex.
10. **Reads without our context.** Acronyms spelled out once; no internal names, no "the customer" or "the pilot" without saying who or what.
11. **Never show build status.** Nothing on the piece says or implies built, delivered, piloted, designed, planned, proposed, starting or next, in words or styling (no dashed "proposed" boxes, no "Next" headings). Describe the solution in the present tense; report results only where measured, without explaining the absence elsewhere.

## Procedure that worked

1. Brief = the event's call rules (exclusions, criteria, format) + the requester's ask + this rubric.
2. Draft from the engagement documents (architecture, scope, requirements), not from wiki summaries.
3. Red-team each piece with a fresh-context reviewer that holds only the piece, the sources and this rubric, and returns pasteable rewrites plus a node-by-node architecture check.
4. Verify every new fact a reviewer proposes against its cited source before using it; drop unsourced ones.
5. Render and check the fit report; deliver the editable file, previews and a notes file with the open items.

## NVIDIA GTC specifics (GTC 2027 call, read 2026-11-09)

- 43 × 24 in landscape, 1-inch margin, print PDF, no NVIDIA logos on the poster.
- Title at most 15 words, public description at most 100 words, up to 2 topics.
- Excluded: "promotional, business use cases, conceptual, or lack technical depth".
- Scored on proven outcomes, innovation enabled by accelerated computing, and a framework of problem, NVIDIA technology, benchmarking method and results.
- Toolchain and the 2026 drafts: SoftServe OneDrive `Projects/Nvidia posters/Orlov - GTC27 drafts/` (`toolchain/` regenerates the posters on the accepted SoftServe poster's master).
