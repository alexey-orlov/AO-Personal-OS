# Gmail draft save — canonical conventions

Conventions for saving Gmail drafts via the Gmail MCP `create_draft` tool. Used by any skill that creates drafts.

## Reply-in-thread vs cold

- **Reply-in-thread:** pass `replyToMessageId=<latest_message_id>`. Gmail attaches the draft to the same thread so it threads correctly when sent. `subject` should match the existing thread subject (Gmail handles the `Re:` prefix).
- **Cold draft (no prior thread):** pass `to=[<email>]` + `subject=<fresh subject>`. No `replyToMessageId`. Gmail creates a new thread on save.

## Path B signature handling (always, for create_draft)

Gmail does NOT auto-append the user's standing signature to drafts created via the API. The standing signature block must be inline in BOTH `body` (plain text) and `htmlBody` (HTML). This is the "Path B" handling described in [.claude/skills/message-writing/SKILL.md](../../.claude/skills/message-writing/SKILL.md) Step 3 — when calling `message-writing`, pass `signature: inline`.

Path A (`signature: gmail-auto`, no inline signature) is only for the inbox-sweep LIN→email channel-switch path that prefills Gmail iOS compose via `googlegmail://co?…`, where Gmail appends the signature server-side. Never use Path A for `create_draft`.

## The `r-…` draft URL gotcha

`create_draft` returns `{"id": "r-…"}` — this is the API draft RESOURCE ID, NOT a web-URL-usable ID. Gmail's URL fragment router (`#drafts/<id>`) silently rejects the resource ID and falls back to the drafts list (i.e. the URL "works" but lands the user on the wrong page).

**Correct desktop URLs:**
- **Reply-in-thread** (have `thread_id`): use `https://mail.google.com/mail/u/0/#all/<thread_id>` or `https://mail.google.com/mail/u/0/#drafts/<thread_id>`. Both work; `#all/` is more robust across inbox/archive state, `#drafts/` puts the user in the drafts label context.
- **Cold draft** (no `thread_id` yet): `https://mail.google.com/mail/u/0/#drafts` — opens the drafts list, the new draft sits at the top.

**Never use** `https://mail.google.com/mail/u/0/#drafts/<r-…>` — it dumps the user on the drafts-list root.

## Don't clobber user drafts

Before `create_draft` on a thread that already exists, call `list_drafts` and check whether a draft is already attached to that `threadId`. If one is, surface it to the user (in chat or TG) — never silently overwrite. Each skill defines its own UX for this (skip / ask / replace).

Note: the current Gmail MCP exposes no `delete_draft` tool. "Replace existing" in practice means saving the new draft alongside the old one and instructing the user to delete the old one manually in Gmail before sending.

## Idempotency

Re-running a skill should not double-save the same reply. Track the thread you drafted in state (keyed by `thread_id`) and consult it before drafting. Dedup scope is per-skill (per-thread for inbox-sweep, per-contact-per-campaign for re-engagement, per-invocation for draft-message); the universal rule is *check state before `create_draft`*.

## Skills that use this

Citations should be one-line: `Follow the conventions in [automations/gmail/draft-save.md](../../automations/gmail/draft-save.md)`. The skill keeps its own flow; canonical conventions live only here.

Current callers:
- `.claude/skills/inbox-sweep/SKILL.md` — Step 1 (Gmail leg)
- `.claude/skills/draft-message/SKILL.md` — Step 8a (Email delivery)
- `.claude/skills/re-engagement-outreach/SKILL.md` — Step 6d (Save draft)
