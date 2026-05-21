# AO-personal-OS

Personal operating system for AI-assisted work: reusable agent skills, automations that run them, and the artefacts they produce — all versioned and synced across devices via Git.

## Layout

    skills/         Reusable prompt/skill templates, grouped by domain.
                    Each is a plain .md the automations inline into Claude.
        call-analysis/      classify + per-call-type analysis templates

    automations/    Self-contained automation units. Each has its own
                    scripts, config, setup, and README.
        call-pipeline/      Voice Memo -> AssemblyAI -> Claude -> note

    outputs/        Produced artefacts (committed, so they sync everywhere).
        call-notes/         Analysis notes, one .md per call

    context/        Durable reference material the agents can draw on
                    (people, companies, frameworks). Empty for now.

## Conventions

- **Secrets never live in the repo.** API keys go in macOS Keychain. The
  `.work/` folder inside each automation (venv, audio copies, transcripts,
  per-machine state) is git-ignored.
- **Raw audio and transcripts stay local** by default (privacy); only the
  analysis notes are committed. Change this per automation if you accept the
  trade-off.
- **Adding a skill:** drop a new `skills/<domain>/<name>.md`.
- **Adding an automation:** new folder under `automations/` with its own
  `README.md` and `setup.sh`.

## Agent context

`CLAUDE.md` (root + per-automation) gives Claude Code persistent context — structure, conventions, commands, and environment gotchas. Read by every Claude Code session.

## Active automations

- `automations/call-pipeline` — see its README to install/run.
