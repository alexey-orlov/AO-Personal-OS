# AO-personal-OS

Personal operating system for AI-assisted work: reusable agent skills, automations that run them, and the artefacts they produce — all versioned and synced across devices via Git.

## Layout

    .claude/skills/ Reusable agent skills. Each is a folder containing a
                    SKILL.md with frontmatter (name, description,
                    disable-model-invocation, user-invocable). Claude Code
                    exposes them as slash commands; automations also inline
                    the SKILL.md as a plain prompt.
        classify/           one-token call-type classifier (pipeline-internal)
        default/            default call brief
        interview/          job-interview debrief
        one-on-one/         1:1 / peer-sync summary
        sales-call/         B2B SaaS sales-call analysis
        english-coaching/   English language coaching on the user's speech

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
- **Adding a skill:** create `.claude/skills/<name>/SKILL.md` with frontmatter (`name`, `description`, `disable-model-invocation: false`, `user-invocable: true`) followed by the prompt body. Folder name must match `name:`. It becomes `/<name>` in Claude Code automatically.
- **Adding an automation:** new folder under `automations/` with its own
  `README.md` and `setup.sh`.

## Agent context

`CLAUDE.md` (root + per-automation) gives Claude Code persistent context — structure, conventions, commands, and environment gotchas. Read by every Claude Code session.

## Active automations

- `automations/call-pipeline` — see its README to install/run.
