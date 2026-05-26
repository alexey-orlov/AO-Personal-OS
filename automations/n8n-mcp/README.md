# n8n-mcp — Claude Code <-> n8n bridge

Registers the [`czlonkowski/n8n-mcp`](https://github.com/czlonkowski/n8n-mcp) MCP server with Claude Code at user scope so any Claude Code session (CLI or VS Code extension) can read, build, and edit workflows in n8n by chat.

## Setup (one-time, per machine)

```
./setup.sh
```

If the n8n API key is not yet in Keychain, prints the one-liner to add it and exits without registering. Once the key is in Keychain, re-running registers the MCP server.

The server runs locally via `npx -y n8n-mcp` in stdio mode — no daemon, no exposed port. Claude Code spawns it on session start and kills it on exit. Npx caches the package after first run, so subsequent launches are instant.

`setup.sh` registers `npx` by absolute path and injects its directory into the spawned process's `PATH`. This is required because Claude Code (especially the VS Code extension) launches MCP servers with a minimal `PATH` that excludes Homebrew/nvm dirs — without these fixes the registration succeeds but the spawn fails with `command not found` for `npx`, or `env: node: No such file or directory` from npx's own shebang.

## Config

- `N8N_API_KEY` — macOS Keychain (service `N8N_API_KEY`, account `$USER`). Add or rotate with:
    ```
    security add-generic-password -U -a "$USER" -s N8N_API_KEY -w '<key>'
    ```
- `N8N_API_URL` — defaults to `https://alexorlovco.app.n8n.cloud` in `config.sh`. Override with the env var of the same name before running `setup.sh` for a different instance.

## Rotating the key

```
security add-generic-password -U -a "$USER" -s N8N_API_KEY -w '<new-key>'
./setup.sh
```

Then restart Claude Code so the new value is loaded into the MCP child process.

## Verifying

After restarting Claude Code, in any session:

> List my n8n workflows.

Claude calls the MCP server's list-workflows tool and reports back.

## Working rules (enforced in chat, not in code)

- Never edit a production workflow directly — duplicate, edit the copy, get approval, then promote.
- Always show the planned change before pushing it to n8n.
- Validate node configs against the schema before writing.

## Caveat

`claude mcp add -e N8N_API_KEY=...` stores the key verbatim in `~/.claude.json`. Keychain is read once by `setup.sh`, not on every MCP launch — Claude Code's MCP env-var mechanism does not support runtime secret resolution. The key is in your home dir, not in any repo.

## Files

- `setup.sh` — registers / re-registers the MCP server.
- `config.sh` — exports `N8N_API_URL` and `N8N_API_KEY` for `setup.sh`.
- `README.md` — this file.
