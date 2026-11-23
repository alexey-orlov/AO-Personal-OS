# 5 · Write the tracker row

**Fill the template**
- Fill `templates/account-doc.json`, and delete the half (bio or hw) the offer doesn't use.
- Keep the shapes exactly: the page renders them field by field.

**Header fields**
- `priority`: an integer. Alex's P1 accounts come first, in his order, then the list's order. When inserting, shift the following rows by one in a pinned `batch`.
- `rd_owner`: Alex, or the R&D owner.
- `research_status` and `sizing_status`: `done` only after stage 4.

**Write**
- New doc: `ArtifactData set accounts/<slug>` from a file, with no `if_version`.
- Existing doc: `get` it, build the change from that copy, then `update` with `if_version`.
- An array is replaced whole, so build it from the live array.
- Several docs: one pinned `batch`.
- On a version mismatch: re-read and redo, never overwrite.

**Read back**
- Query the doc and print: signal grades in order, `sum_people_*`, `people_source`, `oracle_use.cross_checked`, and message 2 of the Teams note.

**Status, contacts and the wiki**
These follow `.claude/references/jumpstart-outreach-tracker.md`. A new account needs:
- a `tracking/<slug>` doc with status `not-started` and the note's recipient as the main contact;
- a registry row in `context/_meta/outreach-tracker.md`;
- a wiki home, and the doc's `wiki_path` pointing to it.

Two more rules:
- The page saves a whole `tracking` doc at a time, so never add a field its `save()` doesn't know.
- Fold the account's story into the wiki through `context-update`.

**A new field**
- The page has to change first: `Artifact` read, merge, publish to the same URL.
- Never write a field the page doesn't render.
