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

## Setup (once a year, by Alex, in Terminal, never through a chat session)
`claude setup-token` prints the token on screen. Output from a command run through a
chat session lands in the transcript, so run both commands in Terminal:

    claude setup-token
    security add-generic-password -U -a "$USER" -s CLAUDE_CODE_OAUTH_TOKEN -w

The second command prompts for the value, so the token never reaches shell history.
It is valid for one year. When it is rejected, the jobs alert with this same fix.
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
- `.work/alerted.<job>` — per-job alert rate-limit stamps (git-ignored)
