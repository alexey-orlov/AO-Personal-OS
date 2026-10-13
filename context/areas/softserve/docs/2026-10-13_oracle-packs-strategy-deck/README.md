# Oracle packs · packaging strategy deck (2026-10-13)

Six-slide internal executive deck on SoftServe's SoftServe template (`.claude/references/softserve-deck-base.pptx`):
1 goal · 2 Oracle AI & Data (EMEA) go-to-market, warm and cold campaigns · 3 three packaging strategies with Oracle's view ·
4 option 1, the mini-site's catalog · 5 option 2, the proposed pack set (from `../2026-10-13_oracle-pack-set-exec.pdf`) ·
6 option 3, SoftServe-expertise cases beyond databases and ERP.

Slide 6 takes its rows from `option3.json`: the nine cases that are not database- or ERP-centric from the table of the
"SoftServe OCI/AIDP expertise use cases" session (Alex pasted it 2026-10-13), each with the session's call (Pursue /
Proof only / Park); the six data- and ERP-centric cases are named in the key line, and the proof behind every case
(client names, figures, Oracle leads) is in the speaker notes. Fields: `call`, `name`, `role`, `problem`, `solution`,
`platform` (one of "OCI dedicated AI clusters", "AIDP", "AIDP + AI Lakehouse"), optional `note`; plus `key` and `notes`.

Rebuild (needs `python-pptx`, `pillow`, `lxml`): `python3 build_deck.py "Oracle packs - packaging strategy.pptx"`.
Slide 4's picture is `assets/minisite.png`, captured from the real products page by `capture_minisite.py <site checkout>`.
Render QA on Alex's Macs: `.claude/references/document-rendering.md`. Azurio and Replica are not installed on the
MacBook Air, so check fit there on a Helvetica/Georgia stand-in twin (replace the theme typefaces in a copy).
