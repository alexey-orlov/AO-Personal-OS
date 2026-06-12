# apple-notes-sync — Drop Zone goals/tasks/insights → pinned Apple Notes

The local leg of the second-brain pipeline. Goals, tasks, and raw insights Alex posts
in the Telegram 📥 Drop Zone end up as list items inside his pinned working notes in
the Apple Notes **`_ToDo`** folder — not in repo markdown files (the old
`context/knowledge/goals-tasks.md` + `insights/` homes were retired 2026-06-12).

```
📥 Drop Zone ─▶ n8n capture ─▶ context/_inbox/ ─▶ daily cloud fold (context-update)
        A-type drops (goal/task/insight) ─▶ queue cards in context/_inbox/apple-notes/
                                                      │  (cloud can't reach Apple Notes)
   THIS automation (launchd, every 30 min, this Mac) ◀┘
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
- `notes_list.sh [--full]` / `notes_body.sh <name>` / `notes_set_body.sh <name> <html>` —
  the only sanctioned AppleScript surface. `notes_set_body.sh` is the single write
  path: scoped to `_ToDo`, refuses notes with native-checklist markup, backs up
  body + plaintext to `.work/backups/` before every write, prints post-write
  plaintext for verification.
- `com.user.apple-notes-sync.plist` + `setup.sh` — launchd install (every 30 min +
  at load; idle runs are free — no Claude invocation).

## Platform constraints (why it works the way it does)

- **No native checkboxes via scripting.** AppleScript can only write HTML; Apple
  Notes strips checklist markup on write (verified 2026-06-12). So inserted items are
  PLAIN BULLETS with a trailing `📥` marker — including todos/goals. Alex's existing
  lists are plain bullets anyway. Corollary: **keep `_ToDo` lists as plain bullets** —
  if a note is converted to native checklists in the UI, scripted writes would flatten
  the checkbox state, so `notes_set_body.sh` refuses to touch such notes and the
  skill leaves their cards queued (visible in the run summary).
- **Pinned status isn't scriptable** — folder membership is the contract: every note
  in `_ToDo` is a routing candidate. Add/remove notes there to change the set.
- Notes app doesn't need to be open or frontmost; writes work in the background.

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
