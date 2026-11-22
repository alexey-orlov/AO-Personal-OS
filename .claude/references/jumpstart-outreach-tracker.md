# Jumpstart outreach: the tracker ↔ wiki contract

The AI Jumpstart outreach accounts live in two places that must not drift apart. The outreach tracker artifact holds the live state Alex works from; the repo wiki holds the history behind it. Every session that touches one of these accounts follows this file (Alex, 2026-11-22). The account list, the slugs and the sync ledger are in [`context/_meta/outreach-tracker.md`](../../context/_meta/outreach-tracker.md).

## One home per field

| Field | Home | Written by |
|---|---|---|
| Status: not-started · reached-out · talking · yes · no · parked | tracker `tracking/<slug>.status` | Alex in the page; an agent when an artifact moves it |
| Next step, with AM feedback (the page's "Status · next step" field) | `tracking/<slug>.notes` | same |
| Contacts, main contact (★) first, up to four | `tracking/<slug>.contacts` | same |
| Account summary: SoftServe's own context in one or two lines (the relationship, open work, where it stands), empty when there is none, never general company facts | `tracking/<slug>.account_summary` | same |
| Research: company, signals, people, sizes, Oracle, Edge AI, Teams note | tracker `accounts/<slug>` | agents only |
| Link to the wiki | `accounts/<slug>.wiki_path`, repo-relative, `#anchor` allowed | agents |
| History, decisions, provenance, open loops | the wiki home: `context/areas/softserve/<slug>.md` when the account has a page, else the outreach thread in `jumpstart-science.md#active-threads` | `context-update` |

The wiki keeps no second status. It records dated events with provenance, such as "the AM said yes (tracker, 2026-11-18)". Every account page carries a `_tracker:` header line that names the artifact and the doc.

## The key

One slug per account. It is the doc id in both tracker collections, the account page's filename when there is one, and the registry row. Never match an account by its display name.

## Repo → tracker: every fold that changes an outreach account

1. `ArtifactData get` the account's `tracking` doc and note its `version`.
2. `update` it, never `set`, pinned with `if_version`. Set the status when the artifact moved it. Rewrite `notes` to the current next step, keeping every point Alex wrote that still holds. Set `account_summary` when SoftServe's context changed. Touch `contacts` only to add a SoftServe person. Set `updated_at` only when the status or the next step changed.
3. New people or research go to `accounts/<slug>`. An array is replaced whole, so build it with jq from the current doc.
4. Write the resulting `tracking` version into the ledger.

A run without `ArtifactData` (the headless pipeline, a cloud routine) adds the slug and the change under **Pending pushes** in the registry. It never skips the push silently.

## Tracker → repo: every sweep, and every session that works on the outreach

1. `ArtifactData list` the `tracking` collection and compare each doc's `version` with the ledger.
2. For each newer doc, fold what changed (status, next step, contacts, summary) into its wiki home as dated facts with `(tracker, <date of updated_at>)` provenance, then write the new version into the ledger.
3. A `tracking` doc with no registry row is a new account: add its row and wiki home, and set its `accounts/<slug>.wiki_path`.
4. Push everything under Pending pushes, then clear them.

## Checks before finishing

- Every registry slug has an `accounts` doc with `wiki_path` and a `tracking` doc; every account page has its `_tracker:` line.
- Every ledger version equals the live `tracking` version.
- No status or next step on a wiki page contradicts the tracker.

The page saves a whole `tracking` doc at a time. A new field must be added to the page's `save()` before anything writes it, or Alex's next edit wipes it.

## Who else reads both homes

`presales-status-collector` builds Alex's weekly status for the team's xlsx from the `tracking` docs and the wiki. It never edits the xlsx; the facts it gathers fold back through `context-update`, which follows this contract.
