# draft-message — Telegram message templates

Verbatim templates used by `SKILL.md`. Read this file before posting any TG message. Divider character is `━━━━━━━━━━━━━━━━━━━━` (a sequence of Unicode `BOX DRAWINGS HEAVY HORIZONTAL` chars).

Only LinkedIn drafts go to TG — email drafts land in Gmail Drafts and are reviewed there. There is exactly one template in this file; the in-chat preview format lives in `SKILL.md` Step 7.

---

## (a) LIN draft (post-confirmation)

Sent via `automations/telegram/telegram_send_with_button.sh` with body on stdin and one button row: `💼 LIN: <Contact>` → `<thread_url>` (or profile URL for cold drafts).

The draft body is wrapped in a Telegram `<pre>` code block so the mobile client shows a tap-to-copy affordance on the draft alone — Alex copies just the reply, taps the button to jump to the thread, pastes. The send uses `TG_PARSE_MODE=HTML`, so every variable interpolated into the body MUST be HTML-escaped (`&`, `<`, `>`) before assembly.

### Reply-in-thread variant

```
💼 LIN draft to <Contact> (last inbound <Mon DD> · <N> days ago)
━━━━━━━━━━━━━━━━━━━━
💼 <Contact>'s last LIN message:

<Their last LIN message, full text — HTML-escaped>

━━━━━━━━━━━━━━━━━━━━
💬 Your draft:

<pre><The LIN draft body returned by message-writing — HTML-escaped></pre>
```

Notes:
- `<Mon DD>` is the date of the last inbound LIN message (e.g. `Nov 12`).
- `<N> days ago`: if `< 14 days`, write `recent`. If `> 365`, write `>1y ago`.
- "Their last LIN message" is verbatim. Do not paraphrase.
- "Your draft" is the body returned by `message-writing`. No signature on LIN drafts (per `.claude/skills/message-writing/references/linkedin.md`).
- If the message-writing draft was prefixed with `[REVIEW - sensitive]`, keep that line at the top of the `<pre>` block — Alex needs to see it on his phone too. The whole `<pre>` content is what gets copied.
- The `<pre>` tags themselves are NOT escaped — they're the parse-mode markup. Only the content inside (and content elsewhere in the body) is escaped.

### Cold outreach variant

```
💼 LIN cold draft to <Contact> (no prior thread)
━━━━━━━━━━━━━━━━━━━━
💬 Your draft:

<pre><The LIN draft body returned by message-writing — HTML-escaped></pre>
```

Notes:
- The button label is still `💼 LIN: <Contact>` but the URL is the LIN profile URL (not a thread URL) so the tap target opens the profile, from which Alex can start the DM manually.
- No "Their last message" section — there is no thread.

---

## Send pattern (bash)

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

TG_BODY="💼 LIN draft to $CONTACT_HTML (last inbound $MON_DD · $N_DAYS days ago)
━━━━━━━━━━━━━━━━━━━━
💼 $CONTACT_HTML's last LIN message:

$THEIR_MSG_HTML

━━━━━━━━━━━━━━━━━━━━
💬 Your draft:

<pre>$DRAFT_HTML</pre>"

printf '%s' "$TG_BODY" \
  | TG_TOPIC=inbox-drafts TG_PARSE_MODE=HTML "$REPO_ROOT/automations/telegram/telegram_send_with_button.sh" \
      "💼 LIN: $CONTACT" "$THREAD_OR_PROFILE_URL"
```

If `$THREAD_OR_PROFILE_URL` is empty (rare — LIN URL truly unavailable), fall back to `TG_TOPIC=inbox-drafts automations/telegram/telegram_send.sh` (no button, plain text — no HTML escape needed) and tell Alex in chat that the TG message has no button because the URL was missing.
