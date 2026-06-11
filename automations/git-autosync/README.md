# git-autosync

Auto-commits and pushes **any** local change in this repo so it's available on
other devices within ~30 seconds. Also pulls periodically (~every 5 min) so this
machine receives what other devices pushed. Runs as a launchd KeepAlive agent —
survives reboots, restarts itself if it dies.

## How it works
Every `POLL_SECONDS` (20s) `autosync.sh` checks `git status`. If the tree is
dirty it waits for a quiet window (`QUIET_SECONDS`, 5s — so a multi-file write
in progress isn't committed half-done), then:

1. `git add -A` + commit as `autosync: <host> <timestamp> (N changed)`
2. `git pull --rebase --autostash` (a conflicted rebase is **aborted**, never
   left jamming the repo — retried next tick)
3. `git push` (offline push defers to the next tick)

Guards: only acts on `main`; skips while a rebase/merge is in progress;
`.gitignore` still rules — `.work/`, secrets, etc. are never picked up.

## Setup (per machine)
```
./setup.sh
```
Copies `com.user.gitautosync.plist` to `~/Library/LaunchAgents/` and loads it.

New-machine gotcha (same as call-pipeline): the launchd job runs as `/bin/bash`
and needs its own **Full Disk Access** grant to read `~/Documents` — Terminal's
grant does not transfer. Push auth uses the macOS keychain credential helper
(`osxkeychain`), already configured for HTTPS GitHub.

## Operate
- Activity log: `.work/autosync.log` (git-ignored, self-trimming)
- launchd stdout/err: `/tmp/gitautosync.{out,err}.log`
- Pause: `launchctl unload ~/Library/LaunchAgents/com.user.gitautosync.plist`
- Resume / pick up config changes: `unload` then `load` the same plist
  (`autosync.sh` and `config.sh` are read once at start — reload after edits).

## Interplay with call-pipeline's git_sync.sh
Both may commit; git's index lock makes that safe. The pipeline usually wins
the race for its own outputs (nice `call-note:` messages); if autosync gets
there first the note simply lands in an `autosync:` commit. Harmless either way.
