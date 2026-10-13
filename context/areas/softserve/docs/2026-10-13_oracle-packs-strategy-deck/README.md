# Oracle packs · packaging strategy deck (2026-10-13)

Six-slide internal executive deck on SoftServe's SoftServe template (`.claude/references/softserve-deck-base.pptx`):
1 goal · 2 Oracle AI & Data (EMEA) go-to-market, warm and cold campaigns · 3 three packaging strategies with Oracle's view ·
4 option 1, the mini-site's catalog · 5 option 2, the proposed pack set (from `../2026-10-13_oracle-pack-set-exec.pdf`) ·
6 option 3, SoftServe-expertise cases beyond databases and ERP.

**Open:** slide 6 is a marked placeholder. It takes its rows from `option3.json` here, the case list of the
"SoftServe OCI/AIDP expertise use cases" session (on KN7X2Y65NX). Format:

```json
{"cases": [{"name": "…", "problem": "role + situation + what it costs, ≤ 14 words",
            "solution": "what changes + the measure, ≤ 15 words",
            "platform": "OCI dedicated AI clusters | AIDP | AIDP + AI Lakehouse", "note": "optional, only if truly different"}],
 "notes": "speaker notes: sources and the SoftServe proof behind each case"}
```

Rebuild (needs `python-pptx`, `pillow`, `lxml`): `python3 build_deck.py "Oracle packs - packaging strategy.pptx"`.
Slide 4's picture is `assets/minisite.png`, captured from the real products page by `capture_minisite.py <site checkout>`.
Render QA on Alex's Macs: `.claude/references/document-rendering.md`. Azurio and Replica are not installed on the
MacBook Air, so check fit there on a Helvetica/Georgia stand-in twin (replace the theme typefaces in a copy).
