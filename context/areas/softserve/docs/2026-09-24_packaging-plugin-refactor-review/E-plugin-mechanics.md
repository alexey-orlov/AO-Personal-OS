# E — How Claude Code loads, copies and updates plugins (checked 2026-09-24)

_Why this matters for the refactor: the two-plugin layout, the `shared/` mirrors and the version-bump ritual all exist because of how installed plugins are copied. Sources are the official docs at https://code.claude.com/docs/en/ (page › section), plus two GitHub issues and one third-party docs mirror, marked "secondary". Checked by a docs agent; the CLI flag was also confirmed locally on Claude Code 2.1.281 (`claude --help`)._

## Facts

| # | Fact | Label | Source |
|---|---|---|---|
| 1 | A marketplace plugin is copied to `~/.claude/plugins/cache/<marketplace>/<plugin>/<version>/` **unless it loads in place**. A relative-path plugin from a marketplace added as a local directory loads in place: no copy, and edits apply at the next session or `/reload-plugins`, "you don't need a version bump". | documented | plugins-reference › Plugin caching and file resolution |
| 2 | In-place loading arrived in v2.1.273. | secondary | docs mirror, thevibeworks/claude-code-docs PR #1291 |
| 3 | The desktop app still runs the install-time cache copy. | secondary | anthropics/claude-code issue #96223 |
| 4 | A copied plugin cannot read files above its own root: a component path that escapes it is rejected (`path escapes plugin directory`), and files above the root are not copied. This is why each plugin carries its own `shared/` today. | documented | plugins-reference › Path traversal limitations; plugin-marketplaces › Files not found after installation |
| 5 | Symlinks: in a copy from a marketplace, a link to content inside the marketplace is dereferenced (content copied), and a link leaving the marketplace is skipped. Under `--plugin-dir` or a local-path install, only links that stay inside the plugin's own folder survive. | documented | plugins-reference › Share files within a marketplace with symlinks |
| 6 | A marketplace entry may use the repo root as its source (`"source": "./"`), with `strict: false` and each entry listing its own skills. | documented | plugin-marketplaces › Advanced plugin entries; › Strict mode |
| 7 | `plugin update` and auto-update skip a plugin whose resolved version **matches** the installed one (not only "is lower"). With `version` omitted, git sources resolve to the commit SHA. There is no force-refresh flag; the documented reset is clearing the cache and reinstalling. | documented | plugin-marketplaces › Version resolution and release channels; discover-plugins › Troubleshooting |
| 8 | `--plugin-dir <path>` loads a plugin for one session and takes precedence over an installed plugin of the same name; pointed at a folder of plugins, it loads each child. `CLAUDE_CODE_PLUGIN_DIRS` does the same without the flag (v2.1.280+). | documented (flag also seen in local `--help`) | plugins › Test your plugins locally |
| 9 | `${CLAUDE_PLUGIN_ROOT}` is substituted in skill content wherever it appears, but not in files Claude reads later. Four files in the plugin carry the placeholder literally: `build` cards `consistency-gate.md` and `architecture-picture.md`, `feature-list` card `build.md`, `deck/assets/README.md`. | documented; file list checked | plugins-reference › Environment variables; skills › Available string substitutions |
| 10 | Every listed skill costs context on every turn (name + description); a skill's `description` + `when_to_use` is truncated at 1,536 characters in the listing. | documented | skills › Frontmatter reference; › Find unused skills |

## What follows for this repo

- **One plugin removes the reason for the mirrors (fact 4).** Two plugins that share `shared/` need either the rsync copies or a root-source marketplace (fact 6), which would copy the whole repo, 15 MB exemplar included, once per plugin on a colleague's install. One plugin with `shared/` inside it needs neither. (inferred)
- **The README's release trap is partly out of date.** Line 41 says the plugin manager re-copies "only when the version is higher". The check is "matches" (fact 7), and on the owner's Mac terminal sessions now load the local-directory marketplace in place (facts 1–2). The desktop app still needs a new version or a cache reset (fact 3). (inferred from facts 1–3, 7)
- **Version bumps can go for colleagues' installs**: with `version` dropped from `plugin.json`, a git install updates on every new commit (fact 7). Whether the desktop app then refreshes from a directory marketplace is not documented: test it on the Mac before relying on it. (inferred)
- **The per-turn cost is real**: today's nine descriptions total about 740 words, paid on every turn of every session in which the plugin is enabled, packaging or not (fact 10; word count measured).

## Not verified

- The exact version in which in-place loading shipped (secondary source only).
- Desktop behaviour with `CLAUDE_CODE_PLUGIN_DIRS` set in `~/.claude/settings.json` (inferred to reach desktop sessions because they read the same settings; issue #86154 suggests the desktop app passes its cache copies as `--plugin-dir`, so which copy wins is unknown).
