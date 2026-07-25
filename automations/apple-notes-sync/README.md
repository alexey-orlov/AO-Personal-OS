# apple-notes-sync — Drop Zone goals/tasks/insights → pinned Apple Notes

The local leg of the second-brain pipeline. Goals, tasks, and raw insights Alex posts
in the Telegram 📥 Drop Zone end up as list items inside his pinned working notes in
the Apple Notes **`_ToDo`** folder — not in repo markdown files (the old
`context/knowledge/goals-tasks.md` + `insights/` homes were retired 2026-06-12).

```
📥 Drop Zone ─▶ n8n capture ─▶ context/_inbox/ ─▶ daily cloud fold (context-update)
        A-type drops (goal/task/insight) ─▶ queue cards in context/_inbox/apple-notes/
                                                      │  (cloud can't reach Apple Notes)
   THIS automation (launchd, daily at 08:00, this Mac) ◀┘
        ─▶ insert item into the matching _ToDo note (bullet, "📥" suffix)
        ─▶ refresh note snapshots → context/areas/<area>/apple-notes/<slug>.md
```

**Why split cloud/local:** Apple Notes has no server-side API — it is reachable only
from a Mac (AppleScript). The claude.ai cloud routine classifies drops and writes
queue cards; this launchd job consumes them whenever the Mac is awake. Cards simply
wait if the laptop is closed — nothing is lost.

## Components

- **Engine** = the `apple-notes-sync` skill (`.claude/skills/apple-notes-sync/SKILL.md`):
  picks the target note + block, performs the insertion, verifies, archives the card,
  refreshes snapshots. Note ↔ area map: `.claude/skills/apple-notes-sync/references/note-map.md`.
- `run.sh` — launchd entrypoint: git pull → exit fast if the queue is empty and
  snapshots are fresh → otherwise run the skill headlessly (`claude -p`, Bash limited
  to these helpers) → deliberate `notes-sync:` commit + push.
  **Failures are alerted, not swallowed** (2026-07-25): the run is timestamped, its full
  transcript is kept at `.work/last_run.out`, and any failure — or a clean run that still
  leaves cards queued — sends Alex a Telegram message with the consecutive-failure count.
  `Not logged in` is called out specifically with the `claude login` fix. Before this, a
  failure only echoed "skill run failed (non-fatal)" into `.work/launchd.log` and exited 0,
  so two days of expired CLI auth passed unnoticed and a queued card never reached Notes.
  **Residual gap:** if the agent never runs at all (launchd unloaded, Mac asleep for days)
  nothing can alert from here — a staleness check belongs in a cloud routine.
- `notes_list.sh [--full]` / `notes_body.sh <name>` / `notes_set_body.sh <name> <html>` —
  the only sanctioned AppleScript surface. `notes_set_body.sh` is the single write
  path: scoped to `_ToDo`, refuses notes with native-checklist markup, backs up
  body + plaintext to `.work/backups/` before every write, prints post-write
  plaintext for verification.
- `com.user.apple-notes-sync.plist` + `setup.sh` — launchd install (daily at 08:00,
  with wake catch-up; idle runs are free — no Claude invocation, Notes not opened).
  Blocked-on-Accessibility cards are parked in `context/_inbox/apple-notes/_blocked/`
  (out of the `-maxdepth 1` queue glob) so they don't force a run every cycle — see
  that folder's `README.md` to unblock.

## Platform constraints (why it works the way it does)

- **Native checklists are invisible to AppleScript** (verified 2026-06-12): `body`
  renders checklist items as empty `<li><br></li>`s and `plaintext` omits their text
  entirely — both read AND write are blind, and a body write DESTROYS the checklist.
  Consequences:
  - `notes_set_body.sh` refuses any note whose body shows empty list items; the
    background body-rewrite path is only for verified checklist-free (bullet-only)
    notes — for those it works with Notes closed and the screen locked.
  - Checklist-bearing notes are read via `notes_ax_read.sh` (Accessibility view of
    the open note) and extended via `notes_ax_insert.sh`: ⌘F to the anchor line →
    Return at end of line (Notes natively continues the list — a REAL checkbox row
    in a checklist) → paste item → AX-verify → ⌘Z on mismatch. Demonstrated live
    2026-06-12 (also via the desktop computer-use bridge). Needs the screen unlocked;
    queued cards simply wait otherwise.
  - **One-time grant for unattended checklist inserts:** System Settings → Privacy &
    Security → Accessibility → enable **osascript** (drag in `/usr/bin/osascript` if
    absent) and **Claude**. Until granted, `notes_ax_*` fails with error -1719 and
    checklist-bound cards stay queued (bullet-note cards are unaffected).
  - Optional upgrade: granting **Full Disk Access** would enable a direct (read-only)
    NoteStore.sqlite reader — full checklist text + checked state, headless. Not built yet.
  - **Never use `entire contents` on the Notes AX tree** (fixed in `notes_ax_read.sh`
    2026-07-25). It recursively materialises folder list + note list + body and takes
    minutes / effectively hangs once any note is large — with a 19k-char note present it
    never returned inside 90 s, so *every* checklist read silently failed for ~6 weeks and
    the -1719 permission error masked it. Walk the `scroll areas of splitter group 1` and
    match the note name in the text area's value instead: ~3 s.
  - **Empty `<li>` is ambiguous, and the guard over-refuses.** A human leaving a stray blank
    bullet produces the same `<li><br></li>` markup as a hidden checklist item, so
    `notes_set_body.sh` refuses notes that are perfectly safe to write. To resolve it, prove
    nothing is hidden — `notes_ax_read.sh` output vs `plaintext`; equal line sets means no
    invisible content — then pass `NOTES_VERIFIED_PLAINTEXT_LEN=<n>`. The script re-measures
    and refuses a stale assertion, so the override can't be used blind.
- **Pinned status isn't scriptable** — folder membership is the contract: every note
  in `_ToDo` is a routing candidate. Add/remove notes there to change the set.
- **HTML round-trip collapses consecutive spaces** in existing text (verified
  2026-06-12) — cosmetic only, but don't rely on multi-space alignment in these notes.
- **Relevance marker**: Alex ends the agent-relevant part of each note with
  `## BELOW INFO IS NOT RELEVANT FOR AGENT'S KNOWLEDGE BASE ##`. Snapshots stop there
  (the private tail never reaches the repo) and insertions always go above it.

## Recovery

Every write is preceded by a backup: `.work/backups/<stamp>-<note-slug>.html` (+ `.txt`).
Restore with `notes_set_body.sh "<note name>" .work/backups/<stamp>-<slug>.html`.

## Setup (one-time per machine)

```
automations/apple-notes-sync/setup.sh
```

Approve the macOS Automation prompt (→ Notes) on first run. The agent logs to
`.work/launchd.log`. Manual run: `automations/apple-notes-sync/run.sh`, or invoke
`/apple-notes-sync` in a Claude Code session (interactive mode also handles pasted
one-off items).
