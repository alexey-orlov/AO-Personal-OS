# Matching, diffing & deletion rules

The canonical algorithm is `sync_core.py` (`reconcile`). This doc explains what it
guarantees so you can trust its output; don't re-implement it by hand.

## Identity
- **Ownership marker:** every copy we create has both an `SS: ` title prefix **and** a hidden
  `[[ss-sync:<source_key>]] [[ss-hash:<hash>]]` line in its description. `extract` reads these
  back from `list_events` so updates/deletes always target the right Google event id.
- **source_key** — stable handle for an SS meeting:
  - `id:<owa_id>` when the OWA event id was captured (best — survives reschedules), else
  - `td:<sha(normalized_title + Kyiv calendar-date)>`.
  - Consequence with the `td:` fallback: a **same-day** time change → same key → **update**;
    a **cross-day** move → key changes → delete old + create new (net-correct). Recurring
    daily meetings stay distinct (one key per date).
- **content_hash** = sha(normalized_title, start_kiev, end_kiev, location, join_url). Drives
  "did it change?".

## Match order (per source event)
1. **Ledger / marker hit** (same `source_key`): hash equal → **skip (up-to-date)**; else **update**.
2. **Native duplicate**: a non-marked Google event with the same normalized title, starting
   within ±90 min, and with `olekorlov@softserveinc.com` among its attendees/organizer →
   **skip (native-duplicate)** — already represented; never duplicated, never modified.
3. Otherwise → **create**.

## Normalization
- Strip a leading `SS:` and any cancellation prefix, collapse whitespace, casefold (for keys/matching).
- The copied title keeps the real source title (prefix re-applied as `SS: `).

## Cancellations & deletions
- A source title starting with a cancel word (`Отменено`/`Отменена`/`Скасовано`/`Відмінено`/
  `Cancelled`/`Canceled`, any case, followed by `:`/`-`) is **not** mirrored; if a copy exists it's **deleted**.
- Any owned copy whose `source_key` is **absent** from the current SS read, and whose start is
  at/after the window start, is **deleted** (meeting removed or moved out of the 2-week window).
- **Safety:** all deletions are suppressed when `source_complete:false`. Native (un-marked)
  events are never deleted.

## Window
Monday 00:00 of the current week through +`CALSYNC_DAYS_AHEAD` (14) days, `Europe/Kyiv`.
