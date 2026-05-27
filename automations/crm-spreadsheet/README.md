# crm-spreadsheet automation

Shared CRM integration backed by Alex's Google Sheet at
[CRM_SHEET_ID = 1w3oxlQw8FXzcHBDSLDaPN2OYQ64XAaub0epfzZzLJbI](https://docs.google.com/spreadsheets/d/1w3oxlQw8FXzcHBDSLDaPN2OYQ64XAaub0epfzZzLJbI).
Tabs: `CRM Contacts` (per-person rows) and `CRM Accounts` (per-company rows).

Any skill that needs to look up a contact's email / LIN URL / company /
angle / last-touch date pulls from here. One OAuth grant, one venv, one
lookup script — reused across skills.

## Files

- `config.sh` — env vars (`CRM_SHEET_ID`, `CRM_CONTACTS_TAB`,
  `CRM_ACCOUNTS_TAB`, `SHEETS_CREDS`, `SHEETS_TOKEN`, `PYTHON_BIN`,
  `CRM_LOOKUP`). Source from a consuming skill.
- `setup.sh` — one-time per machine. Builds venv, installs google libs +
  rapidfuzz, prints GCP OAuth-client placement instructions.
- `sheets_lookup.py` — the matched-rows reader. JSON in on stdin, JSON out
  on stdout. Always exits 0; auth/API errors degrade to `matched:false`.
- `.work/` — gitignored. Holds the venv, `sheets/credentials.json`,
  `sheets/token.json`.

## One-time setup

```bash
./setup.sh
# follow the printed instructions to enable Sheets API in GCP and
# drop credentials.json at .work/sheets/credentials.json
```

First call to `sheets_lookup.py` opens a browser once to authorise
`spreadsheets.readonly`. Token caches at `.work/sheets/token.json` and
refreshes silently afterward.

## How other skills consume this

Source the config and pipe a JSON contact list into the lookup script:

```bash
source automations/crm-spreadsheet/config.sh

echo '{
  "contacts": [
    {"raw":"John Doe, jdoe@acme.com", "name":"John Doe", "email":"jdoe@acme.com", "lin_url":null}
  ],
  "sheet_id": "'"$CRM_SHEET_ID"'",
  "contacts_tab": "'"$CRM_CONTACTS_TAB"'",
  "accounts_tab": "'"$CRM_ACCOUNTS_TAB"'"
}' | "$PYTHON_BIN" "$CRM_LOOKUP"
```

Output shape (one entry per input contact):

```json
{
  "enriched": [
    {
      "raw": "John Doe, jdoe@acme.com",
      "matched": true,
      "match_strategy": "email-exact",
      "match_confidence": 1.0,
      "row": {"name":"John Doe", "email":"jdoe@acme.com", "lin_url":"...",
              "company":"Acme Inc", "angle":"...", "last_touch_date":"2025-11-12"},
      "account": {"company":"Acme Inc", "notes":"..."}
    }
  ],
  "errors": []
}
```

## Matching algorithm

Per input contact, first hit wins:

1. **Email exact** (case-insensitive). Multiple → newest by `last_touch_date`.
2. **LIN URL exact** (normalized: strip protocol, `www.`, query, trailing slash).
3. **Fuzzy name** via rapidfuzz `WRatio`, cutoff 85. Ambiguous matches (top
   two within 5 points) treated as no-match — better than enriching with the
   wrong row.

If none hit, returns `matched: false`. Consumers proceed without enrichment;
the lookup never blocks a workflow.

## Column-name tolerance

Header names are normalized (lowercased, non-alphanumeric stripped) before
matching. Known synonyms:

| Canonical          | Synonyms                                                  |
| ------------------ | --------------------------------------------------------- |
| `name`             | name, fullname, contact, contactname, displayname         |
| `email`            | email, emailaddress, mail, personalemail, workemail       |
| `lin_url`          | linkedin, linkedinurl, linurl, linkedinprofile, lin       |
| `company`          | company, account, companyname, accountname, org           |
| `angle`            | angle, notes, angleornotes, context, comment, comments    |
| `last_touch_date`  | lasttouch, lasttouchdate, lastcontact, lastcontacted, ... |

Unknown columns pass through verbatim under their original header name.

## Current consumers

- `.claude/skills/re-engagement-outreach/` — per-contact angle / company /
  last-touch enrichment for campaign drafts.

## Likely future consumers

- `.claude/skills/draft-message/` — look up email or LIN URL when Alex
  gives only a name.
- `.claude/skills/inbox-sweep/` — enrich unknown senders with company /
  notes context before drafting.
- Any outbound-campaign skill (cold outreach, event follow-up, etc.).
