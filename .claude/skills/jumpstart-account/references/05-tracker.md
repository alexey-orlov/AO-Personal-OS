# 5 · Write the tracker row

**Fill the template**
- Fill every field of `templates/account-doc.json`.
- The offer the account doesn't get stays in the doc with empty arrays and `size_<side>: {"applies": false, "note": "…"}`, as on the reviewed rows.
- Keep the shapes exactly: the page renders them field by field.

**Header fields**
- `priority`: an integer. Alex's P1 accounts come first, in his order, then the list's order. When inserting, shift the following rows by one in a pinned `batch`.
- `research_status` and `sizing_status`: `done` only after stage 4.

**Write `accounts/<slug>`**
- New doc: `ArtifactData set` from a file, with no `if_version`.
- Existing doc: `get`, change your copy, then `update` with `if_version`.
- An array is replaced whole, so build it from the live array.
- Several docs: one pinned `batch`.
- On a version mismatch: re-read and redo, never overwrite.

**Write `tracking/<slug>`**, per `.claude/references/jumpstart-outreach-tracker.md`
- New account:
  - `set` from `templates/tracking-doc.json`: status `not-started`, `notes` empty, `contacts` with the note's recipient first;
  - `account_summary` from `internal`: SoftServe's own context in one or two lines, or empty.
- Existing doc: `update` with `if_version` only; never `set`.
- Never add a field the page's `save()` doesn't know.

**Registry, wiki and ledger**
- The registry row in `context/_meta/outreach-tracker.md`.
- A wiki home, and the doc's `wiki_path` pointing to it.
- Fold the account into the wiki with `context-update`.
- Write the `tracking` version into the registry's Folded column.

**Read back**
- Query the doc and print: signal grades in order, `sum_people_*`, `people_source`, `oracle_use.cross_checked`, message 2 of the note.

**A new field**
- The page changes first (`Artifact` read, merge, publish to the same URL).
