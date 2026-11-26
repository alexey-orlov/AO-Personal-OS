---
name: jumpstart-customer-deck
description: Build the customer-facing AI Jumpstart for Hardware & Embedded R&D deck tailored to one account (cover; "what we hear" situations, challenges and why AI doesn't deliver that speed yet; "our read of <customer>" with their product photos and two picked challenges; one problem → solution → outcome slide per pick; the four "where AI agents help" workflow slides in the customer's words with removable, challenge-numbered focus frames; the program with its focus modules and two "inside the modules" slides; success stories tagged with the challenge they answer), or the general untailored version, from the live offering deck with the OneDrive build kit. Use on /jumpstart-customer-deck <company>, "make the hardware Jumpstart deck for <company>", "tailor the offering deck to <company>", "same deck as ALSO for <company>", "rebuild the general customer deck", "update the ALSO deck".
disable-model-invocation: false
user-invocable: true
---

# Jumpstart customer deck (hardware & embedded)

The procedure, the rules and the field reference live in the build kit, one home each. Read them before writing anything:

- Kit: OneDrive `Projects/Jumpstart for scientists/Current offerings/deck-build/customer-decks/`
  - `TAILORING.md`: the spine (the five challenges), the deck flow, where the facts come from, the rules, the steps. Follow it step by step.
  - `README.md`: how the builder works and how to run it.
  - `PROVENANCE.md`: sources; add the new customer's section to it.
  - `customers/also.json`: the worked example to copy.
- Inputs: the offering deck and the "What we hear" draft in `Current offerings/AI Jumpstart for Hardware & Embedded R&D/`.
- Account facts: the outreach tracker (`accounts/<slug>`, `tracking/<slug>`; https://claude.ai/artifact/5spjsfxGjGhj9ynmkh67qe, read with `ArtifactData`), the account's wiki page `context/areas/softserve/<slug>.md`, and the customer's own website for product names and photos.
- Output: `Current offerings/AI Jumpstart for Hardware & Embedded R&D/Customer decks/AI Jumpstart for Hardware & Embedded R&D - <Customer>.pptx`.

Before building, read `.claude/references/slide-design.md` (rules 41, 43, 44) and `.claude/references/client-documents.md`.

Hard limits, whatever the account notes say:
- Only public facts on slides; facts from the customer's internal documents or SoftServe's CRM may steer the picks and frames, never appear on a slide or in speaker notes.
- No project code names, incidents, safety or security findings, deal values or prices; no people's names, and no guessed owner on any label ("Challenge", never "The CTO's challenge").
- Every reference after "What we hear" uses the five challenges' numbers and names verbatim; no second taxonomy.
- The build's word counts are part of done: no new slide over its budget.
- Product photos: download only from the customer's own site, crop with `prep_photos.py`, keep them in the kit next to the customer file; never use a competitor's branded product as a stand-in.
- Build in the scratchpad, never over a delivered deck Alex may have edited (read and diff it first; keep his file in `Customer decks/_previous/` before replacing it); the kit itself is edited only in OneDrive.
- After delivery, fold the result into the account's wiki page through `context-update`, and follow `.claude/references/jumpstart-outreach-tracker.md` if the tracker's next step changes.
