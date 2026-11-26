---
name: jumpstart-customer-deck
description: Build the customer-facing AI Jumpstart for Hardware & Embedded R&D deck tailored to one account (a cover co-branded with the customer's logo; two bold opening statements; "what we hear" situations, challenges and why AI chat isn't enough; "our read of <customer>" with their product photos and two possible starting points; one challenge → solution → outcome slide per starting point, tagged as a hypothesis; a one-page overview of the four workflows and one colour-coded slide per workflow with the starting points washed; AI Jumpstart at a glance, how we build and run it, the weekly program template, program focus and two program focus examples; success stories tagged with the challenge they answer), or the general untailored version, from the live offering deck with the OneDrive build kit. Use on /jumpstart-customer-deck <company>, "make the hardware Jumpstart deck for <company>", "tailor the offering deck to <company>", "same deck as ALSO for <company>", "rebuild the general customer deck", "update the ALSO deck".
disable-model-invocation: false
user-invocable: true
---

# Jumpstart customer deck (hardware & embedded)

The procedure, the rules and the field reference live in the build kit, one home each. Read them before writing anything:

- Kit: OneDrive `Projects/Jumpstart for scientists/Current offerings/deck-build/customer-decks/`
  - `TAILORING.md`: the spine (the six challenges), the deck flow, where the facts come from, the rules, the steps. Follow it step by step.
  - `README.md`: how the builder works and how to run it.
  - `PROVENANCE.md`: sources; add the new customer's section to it.
  - `customers/also.json`: the worked example to copy.
- Inputs: the offering deck and the "What we hear" draft in `Current offerings/AI Jumpstart for Hardware & Embedded R&D/`.
- Account facts: the outreach tracker (`accounts/<slug>`, `tracking/<slug>`; https://claude.ai/artifact/5spjsfxGjGhj9ynmkh67qe, read with `ArtifactData`), the account's wiki page `context/areas/softserve/<slug>.md`, and the customer's own website for product names and photos.
- Output: `Current offerings/AI Jumpstart for Hardware & Embedded R&D/Customer decks/AI Jumpstart for Hardware & Embedded R&D - <Customer>.pptx`.

Before building, read `.claude/references/slide-design.md` (rules 27, 33, 41, 43–62) and `.claude/references/client-documents.md`.

Hard limits, whatever the account notes say:
- Only public facts on slides; facts from the customer's internal documents or SoftServe's CRM may steer the picks and washes, never appear on a slide or in speaker notes.
- No project code names, incidents, safety or security findings, deal values or prices; no people's names, and no guessed owner on any label ("Challenge", never "The CTO's challenge").
- Every reference after "What we hear" uses the six challenges' pictograms and names verbatim, never numbers, and in the challenges' one colour (orange), the customer's starting points included; no second taxonomy; one name per thing across the deck (a fresh reader's terminology pass before delivery; every second name found goes into `base.json` "glossary").
- One icon per concept: a session type, deliverable or program element that carries an icon takes it from `base.json` "concepts" on every slide that names it; add a concept there, never a one-off icon in a slide's data.
- Titles name the slide in one line (the build flags HEAD); what it says goes in the line under it.
- The build's checks are part of done: no FIT, ORPH, HEAD, WORDS, MISS, OVERVIEW, SYN or ICON line, no new slide over its word budget.
- Evidence on the opening statements is readable at a glance: one unit, one population, plain captions, its source checked at the source page; the overview shows the same work in every row that has it (the build checks it).
- Alex's saved copy of a delivered deck: diff it first; port additions and rewordings into the JSON; a removal of something he asked for (a starting-point slide) is a question for him, asked in the same turn, never adopted silently (`client-documents.md`, living documents).
- Every engineering team the buyer leads finds itself in the deck: team markers on the challenges, starting points, examples and cases; no shared slide assumes boards (`slide-design.md` rule 62).
- Customer decks go out without speaker notes (`speaker_notes: false` in `base.json`; the notes texts stay in the kit as its record).
- Product photos and the logo: ask before downloading, only from the customer's own site; crop photos with `prep_photos.py`, make the logo a white and a black transparent PNG; keep them in the kit next to the customer file; never use a competitor's branded product as a stand-in.
- Before delivery, two fresh-context reviews of the rendered PDF (Opus, deck only): a presentation designer and a skeptical VP of Engineering at the customer; apply what they find (Alex, 2026-11-25).
- Build in the scratchpad, never over a delivered deck Alex may have edited (read and diff it first; keep his file in `Customer decks/_previous/` before replacing it); the kit itself is edited only in OneDrive.
- After delivery, fold the result into the account's wiki page through `context-update`, and follow `.claude/references/jumpstart-outreach-tracker.md` if the tracker's next step changes.
