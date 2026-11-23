---
name: jumpstart-account
description: Add an account to the AI Jumpstart outreach tracker (the "California Jumpstart Outreach" artifact) and build its two-pager. Researches it the way the reviewed rows were researched: what the company and its R&D build, buying signals graded S/M/W and checked at their sources, Oracle and Edge AI Kit fit with an independent second pass, team size by three methods, named people from Sales Navigator. Then it writes the full tracker row, drafts the Teams note to the account's owner, and builds, checks and files the two-pager from the OneDrive kit. Also re-checks an existing row against the same gate. Use on /jumpstart-account <company>, "add <company> to the outreach table", "research <company> for the Jumpstart", "same for <company>", "make a two-pager for <company>", "re-check the new rows", "do the same checks for <company>".
disable-model-invocation: false
user-invocable: true
---

# Jumpstart account: research, tracker row, two-pager, Teams note

One account in, three things out:
- a complete row in the outreach tracker;
- a two-pager in OneDrive;
- a Teams note to the account's owner.

The row passes the same gate the reviewed rows passed before it is marked `done`. Rationale and incidents are in `decisions.md`; don't load it at runtime.

## Homes (one per thing)

| What | Home |
|---|---|
| Research: company, units, signals, people, sizes, Oracle, Edge AI, Teams note | tracker `accounts/<slug>`, https://claude.ai/artifact/5spjsfxGjGhj9ynmkh67qe (`ArtifactData`) |
| Status, next step, contacts, account summary; the wiki side | tracker `tracking/<slug>`, per `.claude/references/jumpstart-outreach-tracker.md` |
| Bio and hardware definitions, personas, where signals come from, the Oracle and Edge AI column rules | the tracker page's fold "What counts as bio or hardware…" (`Artifact` read). It wins over any summary here. |
| Research rules: signal rubric, second pass, sizing, Sales Navigator, the new-row gate | `.claude/references/research-standards.md` |
| Teams note: structure, hook rule, Alex's EN and UA forms | the `message-writing` skill, playbook "Chat first contact" |
| Two-pager build kit, its rules and sources | OneDrive `Projects/Jumpstart for scientists/Current offerings/one-pager-build/` (`README.md`, `PROVENANCE.md`) |
| Finished two-pagers | OneDrive `Current offerings/AI Jumpstart for <offer>/Account two-pagers/` |
| Research worth reusing | `one-pager-build/research/<slug>/`, since the scratchpad is temporary |

Client deal values, revenue and CRM notes stay out of this repo, except as wiki history under the tracker contract.

## Stages

Load only the card for the stage you are on:

1. Intake: `references/01-intake.md`
2. Research fan-out: `references/02-research.md`, with `briefs-common.md` and `briefs-research.md`
3. Sales Navigator, team count and names: `references/03-sales-navigator.md`
4. Verify, the gate: `references/04-verify.md`, with `briefs-common.md` and `briefs-verify.md`
5. Write the tracker row: `references/05-tracker.md`, filling `templates/account-doc.json` and `templates/tracking-doc.json`
6. Two-pager content: `references/06-two-pager-content.md`, filling `templates/two-pager-account.json`, with `briefs-page2.md`
7. Two-pager build and filing: `references/07-two-pager-build.md`
8. Teams note: `references/08-teams-note.md`
9. Check and report: `scripts/check_account.py`, then `references/09-report.md`

**Re-check mode** ("re-check the new rows", "same checks for <account>"):
1. Read the live row and the current account file.
2. Run stage 4.
3. Run stages 5 to 9 only for what changed.

**Agents**
- One account: one agent per research dimension.
- Several accounts: one agent per account at each stage.
- At most about eight web agents at once.

## Always

- **Subagents:** run them on Opus, with only Read, Grep, WebSearch and WebFetch: no Bash, so no permission prompt can hang them. Deck or PDF text an agent needs, extract it yourself into the scratchpad first. Agents never write the tracker or the kit.
- **Read before editing:** re-read the current tracker doc, account file or PDF before changing it. Alex and other sessions edit them.
- **Sent notes stay sent:** never rewrite a Teams note the account has already had.
- **Sales Navigator is read-only:** search-result cards only.
- **Facts and inferences:** every fact carries its date and link, and every inference says "(inferred)". A failed page load is "unreachable", never evidence against a claim.
- **Web queries:** never put SoftServe's name or any internal detail in one.
- **Editing this skill:** keep cards at 300 words or fewer (`python3 .claude/skills/jumpstart-account/scripts/budget.py`). Put rationale in `decisions.md`.
