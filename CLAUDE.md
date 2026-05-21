# AO-Personal-OS — agent working notes

Personal "OS" for AI-assisted work: reusable skills, automations that run them, and the artefacts they produce. Versioned in Git, synced across devices.

## Location & remote
- Local: `~/Documents/GitHub/AO-Personal-OS` (macOS, case-insensitive filesystem)
- Remote: `github.com/<user>/AO-personal-OS` — note the repo name is lowercase

## Structure (where things go)
- `skills/<domain>/*.md` — reusable prompt templates that automations inline into Claude. Plain Markdown, one file per skill.
- `automations/<name>/` — self-contained units: scripts + `config.sh` + `setup.sh` + `README.md`, plus a git-ignored `.work/` runtime dir.
- `outputs/<type>/` — produced artefacts. COMMITTED, so they sync across devices.
- `context/` — durable reference material (people, companies, frameworks).

## Hard rules
- NEVER commit secrets. API keys live in macOS Keychain (e.g. `ASSEMBLYAI_API_KEY`) and are read at runtime.
- NEVER commit `.work/` — it holds venvs, audio copies, transcripts, and per-machine state, and may contain private call content.
- Only analysis outputs are committed; raw audio and transcripts stay local by design (privacy).
- Conventional-commit-style messages (`feat:`, `fix:`, `call-note:`).

## Conventions for generated content
Evidence-bound, specific, no filler or praise. Mark inferences as "(inferred)". Use "-" for empty sections.

## Adding things
- New skill → `skills/<domain>/<name>.md`. If it's a new call type, also add the label + definition to `skills/call-analysis/classify.md`.
- New automation → new folder under `automations/` with its own `setup.sh`, `README.md`, and `.work/` for runtime/secret files.

## Active automations
- `automations/call-pipeline/` — Voice Memo → AssemblyAI → Claude → note. See its `CLAUDE.md`.
