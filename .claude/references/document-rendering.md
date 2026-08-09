# Document rendering & visual QA on this Mac (`KN7X2Y65NX`)

How to render `.pptx`/`.docx` to PDF/images for visual QA or hand-off on Alex's Mac.
Pointed from root `CLAUDE.md` — read this BEFORE rendering or QA-ing any deck/doc on this
machine. Findings are machine-specific and dated; re-verify if OS or app versions change.

## soffice (LibreOffice) — the default QA path

- LibreOffice / `soffice` **works again as of 2026-07-23** (v26.2.4.2 at
  `/Applications/LibreOffice.app/Contents/MacOS/soffice`, also `/opt/homebrew/bin/soffice`)
  — the old Gatekeeper SIGKILL (exit 137) is gone.
- So the pptx-skill's normal QA path is fine here: `soffice --headless --convert-to pdf …`
  then `pdftoppm -jpeg -r 130` → view the images (verified rendering a 38-slide deck + a
  scratch build, rc=0, real PDFs).
- Guard the Bash call with a poll-loop + `kill` since `timeout`/`gtimeout` aren't
  installed.
- Caveat: **soffice substitutes the SoftServe brand fonts (Azurio `Azurio-Regular` /
  Replica `Replica LL TT`) with a serif/sans, so trust geometry/overflow, not exact glyph
  widths** (leave ~10% slack on tight text).

## True-font QA with soffice (UPDATE 2026-07-23)

The substitution is avoidable, so soffice CAN give a pixel-accurate true-font QA +
hand-off PDF:

1. Copy the four brand faces from `/Library/Fonts/Managed/` (`Azurio-Regular*.otf`,
   `Azurio-Semibold*.otf`, `ReplicaLLTT-Regular*.ttf`, `ReplicaLLTT-Bold*.ttf`) into
   `~/Library/Fonts/` and `pkill -x soffice` so it rescans.
2. In the deck reference the **exact PostScript name `Azurio-Regular`, NOT the family
   `Azurio`** (the family substitutes to serif; `Replica LL TT` resolves fine as a
   family).
3. Remove the `~/Library/Fonts` copies afterward to leave the system clean.

Belt-and-suspenders: also measure fit with the real font files via PIL `ImageFont`
(points==px at 72dpi; box-inches×72) to prove no overflow independent of any renderer.

## PowerPoint AppleScript export — alternative true-font path

When exact brand-font fidelity matters, the **PowerPoint AppleScript export** (`open` →
`save … as save as PDF` → `close saving no`, then `pdftoppm`) is an alternative — but:

- It **failed with `-9074` on 2026-07-23 writing to `/private/tmp`, `~/Documents`, AND
  OneDrive alike** (sandbox/PDF-engine), so the soffice-with-real-fonts route above is
  the more reliable true-font path. It was verified working 2026-07-21.
- On first cold launch it may restore Alex's previously-open decks and throw AppleEvent
  `-1712` — never close presentations you didn't open.
- Wrap the whole `tell` block in `with timeout of 550 seconds` or a large deck throws
  AppleEvent `-1712` (default 60 s AppleEvent timeout); note `timeout`/`gtimeout` aren't
  installed, so guard shell-side with the Bash tool's own timeout.
- Fonts substitute (Azurio/Replica → serif/Arial) but geometry is true, so trust
  layout/overflow, not exact glyph widths.
- This beats HTML twins when surgically editing an existing branded deck (unzip → edit
  `slideN.xml` → zip). MS Word gives the same true render for `.docx`. Both may hang on
  first-launch dialogs.

## Hand-off default

Deliver the editable file and let Alex export the PDF himself.
