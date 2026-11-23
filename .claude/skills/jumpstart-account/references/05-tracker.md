# 5 · Write the tracker row

**Fill the template**
- Fill `templates/account-doc.json` for every field. Delete the bio or hw half the offer doesn't use.
- Keep the shapes exactly as given: the page renders them field by field.

**Header fields**
- `priority`: an integer. Alex's own accounts (P1) come first, in his order; then the list's order. When inserting, shift the following rows by one, in a pinned `batch`.
- `tier`: P1, P2 or P3.
- `rd_owner`: Alex, or the R&D colleague who owns the account.
- `research_status` and `sizing_status`: `done` only after stage 4.
- `wiki_path`: the account's wiki home (see the contract below).

**Write**
- A new doc: `ArtifactData set accounts/<slug>` from a file (`file_path`), with no `if_version`.
- An existing doc:
  1. `get` it into the scratchpad;
  2. build the change from that copy;
  3. `update` with `if_version`.
- An array is replaced whole, so build it from the live array.
- Several docs: one pinned `batch`.
- On a `version_mismatch`, re-read and redo the change. Never overwrite.

**Read back**
- Query the doc and print these fields: signal grades in order, `sum_people_*`, `people_source`, `oracle_use.cross_checked`, and message 2 of the Teams note.

**Status, contacts and the wiki**
- These follow `.claude/references/jumpstart-outreach-tracker.md`. For a new account that means:
  - a `tracking/<slug>` doc with status `not-started` and the Teams note's recipient as the main contact;
  - a registry row in `context/_meta/outreach-tracker.md`;
  - a wiki home;
  - the doc's `wiki_path`.
- The page saves a whole `tracking` doc at a time. Never add a field to it that the page's `save()` doesn't know.
- Fold the account's story into the wiki through `context-update`, which follows the same contract.

**Where to look**
- The page shows the row as a one-line summary per column, with "Show details" for the rest.
- If a new field is needed, the page has to change first. Read it with `Artifact` read, merge, and publish to the same URL. Never write a field the page doesn't render.
