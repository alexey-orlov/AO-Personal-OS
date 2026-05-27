# re-engagement-outreach — message templates

Verbatim templates used by `SKILL.md`. Read this file before posting any TG message or emitting the in-chat gate. Divider character is `━━━━━━━━━━━━━━━━━━━━` (a sequence of Unicode `BOX DRAWINGS HEAVY HORIZONTAL` chars). Section-heading character is `═══` (Unicode `BOX DRAWINGS DOUBLE HORIZONTAL`).

**Delivery summary** (see SKILL.md §6e and §7 for the gate phase rules):
- Pre-gate (contacts 1-3): nothing to TG. Drafts go in the in-chat gate message below.
- Post-gate, email contact: Gmail draft saved silently. No per-contact TG.
- Post-gate, LIN contact: template (b) to TG.
- End-of-run: template (e) digest + template (f) no-thread list, both to TG (silent if empty).

Templates (a) and (c) — per-contact email TG messages — are intentionally absent. Re-engagement email drafts live in Gmail; Alex reviews them in the in-chat gate or via the Gmail Drafts label.

---

## In-chat gate message (pre-gate, contacts 1-3)

Printed to the Claude Code chat after contacts 1-3 are processed (or after the last, if fewer than 3 in the campaign). The drafts render in chat as plain text, and the response is collected via the `AskUserQuestion` tool — NOT free-form chat reply. The agent's turn STOPS at the `AskUserQuestion` call until Alex picks an option.

Each pre-gate draft is rendered in full so Alex can review without opening Gmail or TG. Vary the section per channel; the gate message can contain a mix.

```
━━━━━━━━━━━━━━━━━━━━
SPOT-CHECK GATE — <K> drafts ready for review.

═══ 1. <Name> · email · Gmail draft saved ═══
Subject: Re: <thread subject>
Their last message (<Mon DD, N days ago>):
<their last message body, verbatim>

Draft:
<plain body, including standing signature block (Path B: API draft via `create_draft`)>

Open draft (desktop): https://mail.google.com/mail/u/0/#drafts/<thread_id>
Open thread: https://mail.google.com/mail/u/0/#inbox/<thread_id>

═══ 2. <Name> · linkedin · draft below (not yet posted to TG) ═══
Their last LIN message (<Mon DD, N days ago>):
<their last message, verbatim>

Suggested LIN reply:
<draft body>

LIN thread: <thread_url>

═══ 3. <Name> · no prior thread — will be listed in no-thread digest ═══

N contacts remaining (<M_email> email + <L_lin> LIN + <K_skip> no-thread).
━━━━━━━━━━━━━━━━━━━━
```

**Then immediately call `AskUserQuestion` with this shape** (do not type the question in chat; the tool renders it):

```
question: "Spot-check gate — review the <K> draft(s) above. How should I proceed?"
header:   "Gate decision"
multiSelect: false
options:
  - label: "Continue"
    description: "Process remaining contacts. Post any pre-gate LIN drafts to Telegram, then resume the per-contact loop. Email drafts already saved to Gmail remain as-is."
  - label: "Tweak voice & continue"
    description: "Same as Continue, but apply a voice tweak to all post-gate drafts. Add the tweak text as a NOTE on this option (the agent reads it from the annotation). Example note: 'shorter, drop the credentials line'. Pre-gate drafts stay as-is — only contacts processed AFTER the gate get the addendum."
  - label: "Stop"
    description: "Halt the campaign. State is saved. Pre-gate Gmail drafts remain saved (you can delete them in Gmail); pre-gate LIN drafts are discarded. No TG digests sent. Same-day re-run resumes from where you stopped."
```

The fourth "Other" option (auto-added by AskUserQuestion) is treated as a stop signal with a custom note logged into `state.json` under the campaign's `notes` field — useful if Alex types something the three options don't cover.

Notes:
- "N contacts remaining" is the literal count of unprocessed contacts (not including the K already shown above).
- Use `═══` only on the per-contact section headers; the outer divider is `━━━━━━━━━━━━━━━━━━━━`.
- If a no-thread contact lands inside the first 3, render it as a one-liner with the channel-line saying `no prior thread`. No body to show.
- If the channel decision used `lin-newer-by-14d`, mention it in the channel line: `· linkedin · LIN newer by 14d+`.
- **Desktop draft URL.** Use the recipe in [automations/gmail/draft-save.md](../../../../automations/gmail/draft-save.md): `#drafts/<thread_id>` with the 16-char hex thread ID, never the `r-…` resource ID `create_draft` returns.

---

## (b) LIN re-engagement draft (post-gate or gate-resume catch-up)

Sent via `automations/telegram/telegram_send_with_button.sh` with body on stdin and one button row: `💼 LIN: <Contact>` → `<thread_url>`.

The draft body is wrapped in a Telegram `<pre>` code block so the mobile client shows a tap-to-copy affordance on the draft alone — Alex copies just the reply, taps the button to jump to the thread, pastes. The send uses `TG_PARSE_MODE=HTML`, so every variable interpolated into the body MUST be HTML-escaped (`&`, `<`, `>`) before assembly.

```
💼 LIN re-engagement to <Contact> (<slug> · last touch <Mon DD> · <N> days ago)
━━━━━━━━━━━━━━━━━━━━
💼 <Contact>'s last LIN message:

<Their last LIN message, full text — HTML-escaped>

━━━━━━━━━━━━━━━━━━━━
💬 Suggested re-engagement:

<pre><The LIN draft body — HTML-escaped></pre>
```

Notes:
- `<slug>` is the campaign slug. Lets Alex distinguish drafts from different campaigns at a glance.
- `<Mon DD>` is the last-message date in the LIN thread (e.g. `Nov 12`).
- `<N> days ago` is the gap. If `< 14 days`, just write `recent`. If `> 365`, write `>1y ago`.
- "Their last LIN message" is verbatim. Do not paraphrase.
- "Suggested re-engagement" is the body returned by `message-writing`. No signature on LIN drafts (per `references/linkedin.md`).
- The `<pre>` tags themselves are NOT escaped — they're the parse-mode markup. Only the content inside (and content elsewhere in the body) is escaped.

Send pattern (bash):
```bash
# HTML-escape helper. Order matters — & first, then < and >.
html_escape() {
  local s="$1"
  s="${s//&/&amp;}"
  s="${s//</&lt;}"
  s="${s//>/&gt;}"
  printf '%s' "$s"
}

THEIR_MSG_HTML="$(html_escape "$THEIR_MSG")"
DRAFT_HTML="$(html_escape "$DRAFT_BODY")"
CONTACT_HTML="$(html_escape "$CONTACT")"

TG_BODY="💼 LIN re-engagement to $CONTACT_HTML ($SLUG · last touch $MON_DD · $N_DAYS days ago)
━━━━━━━━━━━━━━━━━━━━
💼 $CONTACT_HTML's last LIN message:

$THEIR_MSG_HTML

━━━━━━━━━━━━━━━━━━━━
💬 Suggested re-engagement:

<pre>$DRAFT_HTML</pre>"

printf '%s' "$TG_BODY" \
  | TG_PARSE_MODE=HTML "$REPO_ROOT/automations/telegram/telegram_send_with_button.sh" \
      "💼 LIN: $CONTACT" "$THREAD_URL"
```

---

## (e) End-of-run digest

Sent via `automations/telegram/telegram_send.sh` (plain text, no buttons). Only fires if `N_lin > 0` or `N_email > 0`, OR the campaign was stopped at gate with pre-gate Gmail drafts.

```
📤 re-engagement-outreach · <slug>
📧 <N_email> email drafts saved to Gmail
💼 <N_lin> LIN drafts posted above
🚫 <N_skip> no-thread (see next msg)
Status: <completed | stopped-at-gate>
```

Notes:
- Omit lines where the counter is zero, except keep `Status:`.
- "see next msg" only if template (f) is going to be sent next; otherwise drop that line.
- `Status:` is `completed` if Alex replied `continue` (or `tweak voice and continue: …`) and the loop ran to the end, or `stopped-at-gate` if he replied `stop`.

---

## (f) No-thread digest (LIN-flavored)

Sent via `automations/telegram/telegram_send.sh` (plain text, no buttons) immediately after template (e). Only fires if `N_skip > 0`. Header uses 💼 because these contacts are natural cold-LIN candidates.

```
💼 Cold-LIN candidates · <slug> · <N_skip> contacts with no prior thread
━━━━━━━━━━━━━━━━━━━━
• <Name> · <lin_url or email or name-only>
• <Name> · <lin_url or email or name-only>
• ...
━━━━━━━━━━━━━━━━━━━━
Use /message-writing to draft cold outreach for any of them.
```

Notes:
- One bullet per skipped contact, in the input order Alex pasted.
- Per-bullet identifier preference: LIN URL > email > name-only. The full LIN URL gives Alex a tap target on mobile.
- If the full list would push the message past Telegram's 4000-char limit, `telegram_send.sh` auto-truncates with `…[truncated]`. Acceptable — Alex can see the rest in the in-chat summary.
- Duplicates the same list that's printed in the in-chat end-of-run summary. The TG copy is for mobile triage.
