# 8 · Teams note to the account's owner

**How to write it**
- Invoke the `message-writing` skill.
- Follow its playbook "Chat first contact": three bubbles of about 100–120 words in all, Alex's own template.
- Never write the note from memory of the template.

**Field shape** (tracker `teams_note`)
```json
{"to": "<first name last name>", "lang": "EN" or "UA", "attach": "<Account> two-pager",
 "note": "<optional: who else co-owns it, what they already have>",
 "msgs": ["<hello + CRM line>", "<offer + fit + hook + combined question>", "<two-pager caption>"],
 "alt": {"label": "<who and why>", "msgs": ["…", "…", "…"]}}
```

**Language**
- Ukrainian for colleagues who write in Ukrainian; English otherwise.
- The message-writing skill's language rule decides.
- In Ukrainian, professional terms stay in English (pitch, product engineering, BSP).

**The hook** (message 2): one plain line from the strongest current signal of the team the offer serves.
- No older than 18 months.
- Never an executive's general remark, and never another function's ad.
- Keep its link at hand: Alex asks for it.
- A modest so-what ("значить, тема може бути актуальною"), never pathos.
- With no real hook, leave the line out, as Horizon's first note did.
- When the fit is weak, say so ("NextEra is a less direct fit, but…").

**The ask**
- One question that asks for their view and offers a chat next week.

**Message 3**
- The two-pager caption, with the research marked as brief:
  - "(that's just my brief research 🙂)"
  - Alex's Ukrainian form: "FYI - ось тут 2-pager для тебе про оффер + як він може мапитись на <Account> + загальне portfolio нашої R&D практики."

**Co-owners and colleagues Alex already wrote to**
- Put a short follow-up in `alt` ("Микола, ще одне: …"), with `note` explaining.

**A note already sent stays as sent**
- Before changing any note, read `tracking/<slug>.status`.
- `reached-out` or later, or Alex says it went out: leave the note alone and draft a follow-up instead.
- Changed a hook before sending? Diff the new note against the old one and list the changes in the report.
