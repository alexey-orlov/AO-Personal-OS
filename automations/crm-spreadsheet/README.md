# crm-spreadsheet automation

Shared CRM integration backed by Alex's Google Sheet at
[CRM_SHEET_ID = 1w3oxlQw8FXzcHBDSLDaPN2OYQ64XAaub0epfzZzLJbI](https://docs.google.com/spreadsheets/d/1w3oxlQw8FXzcHBDSLDaPN2OYQ64XAaub0epfzZzLJbI).
Tabs: `CRM Contacts` (per-person rows) and `CRM Accounts` (per-company rows).

Any skill that needs to look up a contact's email / LIN URL / company /
angle / last-touch date pulls from here. One lookup script, one venv
(rapidfuzz) — reused across skills. The credential is NOT here: it is the
shared Google Sheets credential in `automations/gsheets/` (one read-write
token for every sheet; the `GSHEETS_TOKEN_JSON` env var in cloud sessions),
so the lookup works on the Mac and in Claude Code cloud sessions alike.

## Files

- `config.sh` — sources `automations/gsheets/config.sh` (credential,
  `PYTHON_BIN`, `GSHEETS`) and adds the CRM-specific env: `CRM_SHEET_ID`,
  `CRM_CONTACTS_TAB`, `CRM_ACCOUNTS_TAB`, `CRM_LOOKUP`; prefers this
  automation's venv when it exists. Source from a consuming skill.
- `setup.sh` — one-time per machine. Builds the venv with rapidfuzz and
  checks that the shared credential is in place.
- `sheets_lookup.py` — the matched-rows reader. JSON in on stdin, JSON out
  on stdout. Always exits 0; auth/API errors degrade to `matched:false`.
  Stdlib Sheets client via `gsheets.py`; rapidfuzz optional.
- `.work/` — gitignored. Holds the venv. Until 2026-09 it also held the
  OAuth client and a read-only token: `automations/gsheets/setup.sh` copies
  the client to the shared location; the read-only token is no longer used.

## One-time setup

```bash
automations/gsheets/setup.sh          # the shared credential (skip if done)
automations/crm-spreadsheet/setup.sh  # venv + rapidfuzz
```

No browser consent here — `gsheets.py auth` (run by the first script only
when there is no token yet) is the single consent flow in the repo.

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
- `.claude/skills/draft-message/` — fallback lookup of an email / LIN URL
  when Alex gives only a name and no prior thread exists.

## Likely future consumers

- `.claude/skills/inbox-sweep/` — enrich unknown senders with company /
  notes context before drafting.
- Any outbound-campaign skill (cold outreach, event follow-up, etc.).
