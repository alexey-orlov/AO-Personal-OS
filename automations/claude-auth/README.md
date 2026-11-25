# claude-auth

Shared library: the ONE credential for every unattended `claude` run on this Mac
(the call-pipeline watcher, apple-notes-sync, ss-monthly-report, coaching-notify,
inbox-sweep-loop, the podcast-knowledge local fallback, the Telegram bridge), plus
the helpers that turn an auth failure into a named, deferred problem instead of a
silent one.

## Why
Unattended runs used to ride on the interactive `claude auth login` session, whose
refresh token can lapse. It lapsed around 2026-07-23 and again on 2026-08-24. The
second time, every headless job failed for a month: 5 voice memos were parked
unprocessed, apple-notes-sync failed 32 mornings in a row and the Telegram bridge
sat on "Not logged in". The alerts never named the cause. The call pipeline
swallowed Claude's error text, and apple-notes-sync looked for the old "Not logged
in" wording.

The token this library expects was then never saved on this Mac, so from late September
the jobs rode the interactive login again and failed once it lapsed; until 2026-11-25
every voice memo was processed by hand. A job that still works proves nothing: check that
the Keychain item exists (`security find-generic-password -s CLAUDE_CODE_OAUTH_TOKEN`,
attributes only).

## Setup (once a year, by Alex, in the macOS Terminal app, never through a chat session)
`claude setup-token` prints the token on screen, and a command run through a chat session
(a code block's Run button, or the `!` prefix) puts its output in the transcript. So run
both steps in the Terminal app:

    claude setup-token
    ~/Documents/GitHub/AO-Personal-OS/automations/claude-auth/save-token.sh

Start `save-token.sh` before copying anything, then copy the whole token when it asks (it
wraps onto two lines). The script reads the clipboard, drops the line break, refuses
anything that isn't a whole `sk-ant-oat01-` token, saves it to the Keychain item and clears
the clipboard; the token is never printed and never reaches shell history. Don't paste the
token into `security … -w`'s hidden prompt instead: on 2026-11-25 that saved a 3-character
value, and the retry pasted the token at the shell prompt.

The token is valid for one year. When it is rejected, the jobs alert with this same fix.
Without the Keychain item, `claude` falls back to the interactive login.

## Rule for callers
Every job that runs `claude` unattended sources `auth.sh` before its first claude
call, and does the following:
- After a **failed** run, check `claude_auth_failed <output files>`. An auth failure
  is **deferred**: the item is retried once auth works. It is never counted as the
  item's failure, parked, or marked done.
- Put `claude_auth_fix` in whatever the job alerts. A job that retries often (the
  call-pipeline watcher) uses `claude_auth_alert <job> [detail]`, which sends at most
  once per 24h, and `claude_auth_ok <job>` after a successful run.
- Never print `CLAUDE_CODE_OAUTH_TOKEN`.

`claude auth status` can't serve as a preflight. It reports `loggedIn: true` for any
token, including an invalid one, so only a real call proves auth.

## Files
- `auth.sh` — token export + `claude_auth_failed` / `claude_auth_fix` / `claude_auth_alert` / `claude_auth_ok`
- `save-token.sh` — saves a `claude setup-token` token from the clipboard into the Keychain item: checked, newline-proof, never printed
- `.work/alerted.<job>` — per-job alert rate-limit stamps (git-ignored)
