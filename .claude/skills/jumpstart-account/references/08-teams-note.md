# 8 · Teams note to the account's owner

**How to write it**
- Invoke `message-writing` and follow its playbook "Chat first contact": three bubbles, the hook rule, the combined question, and Alex's English and Ukrainian forms.
- This card adds only what is specific to the tracker.

**Fields** (`teams_note`)
- `to`, `lang` ("EN" or "UA"), `attach` ("<Account> two-pager"), an optional `note`.
- `msgs`: three messages.
- An optional `alt`: {`label`, `msgs`}, for a co-owner's follow-up.

**Language**
- The message-writing skill's language rule decides: colleagues who write in Ukrainian get Ukrainian.

**The hook**
- Take it from stage 4's best hook.
- When no current sign of AI on the team's radar exists, the research line stays out (the playbook's rule).
- When the fit is weak, the note says so.

**Alex's own draft**
- When Alex writes the note himself, edit it with message-writing's editing rules (minimal changes), then store his final text in `teams_note`.

**Sent stays sent**
- Before changing a note, read `tracking/<slug>.status`.
- If it is `reached-out` or later, or Alex says the note went out: draft a follow-up and leave the note as sent.
- When a hook changes before sending, list the changes in the report.
