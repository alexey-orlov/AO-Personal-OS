---
name: jumpstart-customer-deck
description: Build the customer-facing AI Jumpstart for Hardware & Embedded R&D deck tailored to one account (cover, "what we see at <customer>", two framing options as problem → solution → outcome, the four "where AI agents help" workflow slides in the customer's words with removable focus frames, the program, success stories tagged with the challenge they answer), or the general untailored version, from the live offering deck with the OneDrive build kit. Use on /jumpstart-customer-deck <company>, "make the hardware Jumpstart deck for <company>", "tailor the offering deck to <company>", "same deck as ALSO for <company>", "rebuild the general customer deck", "update the ALSO deck".
disable-model-invocation: false
user-invocable: true
---

# Jumpstart customer deck (hardware & embedded)

The procedure, the rules and the field reference live in the build kit, one home each. Read them before writing anything:

- Kit: OneDrive `Projects/Jumpstart for scientists/Current offerings/deck-build/customer-decks/`
  - `TAILORING.md`: what to tailor, where the facts come from, the rules, the steps. Follow it step by step.
  - `README.md`: how the builder works and how to run it.
  - `PROVENANCE.md`: sources; add the new customer's section to it.
  - `customers/also.json`: the worked example to copy.
- Inputs: the offering deck and the "What we hear" draft in `Current offerings/AI Jumpstart for Hardware & Embedded R&D/`.
- Account facts: the outreach tracker (`accounts/<slug>`, `tracking/<slug>`; https://claude.ai/artifact/5spjsfxGjGhj9ynmkh67qe, read with `ArtifactData`) and the account's wiki page `context/areas/softserve/<slug>.md`.
- Output: `Current offerings/AI Jumpstart for Hardware & Embedded R&D/Customer decks/AI Jumpstart for Hardware & Embedded R&D - <Customer>.pptx`.

Before building, read `.claude/references/slide-design.md` and `.claude/references/client-documents.md`.

Hard limits, whatever the account notes say:
- Only public facts on slides; facts from the customer's internal documents or SoftServe's CRM may steer the choice of options and frames, never appear on a slide or in speaker notes.
- No project code names, incidents, safety or security findings, deal values or prices; roles, not names.
- Build in the scratchpad, never over a delivered deck Alex may have edited (read it first); the kit itself is edited only in OneDrive.
- After delivery, fold the result into the account's wiki page through `context-update`, and follow `.claude/references/jumpstart-outreach-tracker.md` if the tracker's next step changes.
