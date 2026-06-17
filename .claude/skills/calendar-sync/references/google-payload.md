# Google event shape & connector mapping

Target calendar: `orlov.alexej@gmail.com` (primary; the connector defaults to primary).
`reconcile` already builds a `payload` per create/update — map its keys to the tool params below.

## create_event  (for each `creates[].payload`)
| payload key | connector param | value |
|---|---|---|
| `summary` | `summary` | `SS: <source title>` |
| `startTime` / `endTime` | `startTime` / `endTime` | Kyiv ISO with offset (e.g. `2026-06-17T18:00:00+03:00`) |
| `timeZone` | `timeZone` | `Europe/Kyiv` |
| `attendees` | `attendees` | **exactly** `[{"email":"orlov.alexej@gmail.com"}]` |
| `location` | `location` | the join URL if any, else the source location |
| `description` | `description` | `Join: <url>` (if any) + the hidden `[[ss-sync:…]]` marker |
| `visibility` | `visibility` | `private` |
| `notificationLevel` | `notificationLevel` | `NONE` |
| `allDay` | `allDay` | only for all-day events |

After the call, record the returned event id into the `applied.creates[]` entry.

## update_event  (for each `updates[]`)
- `eventId` = `updates[].google_event_id` (**required**).
- Push: `summary`, `startTime`, `endTime`, `timeZone`, `location`, `description`, `visibility`, `notificationLevel:"NONE"`.
- **Do not** touch attendees — they're already just Alex. (Don't pass `addedAttendees`/`removedAttendeeEmails`.)

## delete_event  (for each `deletes[]`)
- `eventId` = `deletes[].google_event_id`, `notificationLevel:"NONE"`.

## Hard rules (re-stated — these protect Alex)
- Attendees are **always** exactly `orlov.alexej@gmail.com`. Never copy SS invitees/organizers onto the Google event — that would email his colleagues from his personal account.
- `notificationLevel` is **always** `NONE` on create, update, and delete — nothing is emailed to anyone.
- Never strip the `[[ss-sync:…]]` marker from a description; it's how the next run re-links and how we stay idempotent without a ledger.
- We attach Teams/Zoom/Webex links via `location` + a `Join:` line (not `addGoogleMeetUrl`, which is Meet-only).
