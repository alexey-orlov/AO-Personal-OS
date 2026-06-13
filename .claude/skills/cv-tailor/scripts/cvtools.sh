#!/usr/bin/env bash
# cvtools.sh — deterministic plumbing for the cv-tailor skill.
#
# Wraps the bundled Anthropic `docx` skill's office scripts (unpack / pack /
# validate) + LibreOffice (docx→pdf) + poppler (pdf→png, page count) behind a
# small, stable interface. The docx skill lives under a hashed plugin path that
# changes on update, so we LOCATE it dynamically rather than hard-coding it.
#
# Usage:
#   cvtools.sh doctor                         # check all deps, print resolved paths
#   cvtools.sh unpack <in.docx> <dir>         # explode docx → pretty-printed XML
#   cvtools.sh pack   <dir> <out.docx> <orig> # re-zip + validate → docx
#   cvtools.sh pdf    <in.docx> <outdir>      # docx → <outdir>/<base>.pdf
#   cvtools.sh render <in.pdf> <prefix>       # pdf → <prefix>-N.png @150dpi; prints "PAGES=N"
#   cvtools.sh pages  <in.pdf>                # prints integer page count only
#   cvtools.sh build  <in.docx> <outdir>      # pdf + render in one step; prints "PAGES=N"
set -euo pipefail

SOFFICE_BIN="${SOFFICE_BIN:-/Applications/LibreOffice.app/Contents/MacOS/soffice}"
LO_PROFILE="${LO_PROFILE:-file://${TMPDIR:-/tmp}/cv-tailor/loprofile}"

die() { echo "cvtools: ERROR: $*" >&2; exit 1; }

locate_office() {
  # Find the bundled docx skill's scripts/office dir (hashed path → glob it).
  local hit
  hit=$(find "$HOME/Library/Application Support/Claude" \
        -type d -path '*skills/docx/scripts/office' 2>/dev/null | head -1)
  [ -n "$hit" ] || die "could not locate the bundled docx skill (scripts/office). Is the Anthropic skills plugin installed?"
  echo "$hit"
}

cmd_doctor() {
  local ok=1
  local office; office=$(locate_office) || ok=0
  echo "docx office scripts : ${office:-MISSING}"
  if [ -x "$SOFFICE_BIN" ]; then echo "soffice             : $SOFFICE_BIN"; else echo "soffice             : MISSING ($SOFFICE_BIN)"; ok=0; fi
  if command -v pdftoppm >/dev/null 2>&1; then echo "pdftoppm            : $(command -v pdftoppm)"; else echo "pdftoppm            : MISSING (brew install poppler)"; ok=0; fi
  if command -v pdfinfo  >/dev/null 2>&1; then echo "pdfinfo             : $(command -v pdfinfo)";  else echo "pdfinfo             : MISSING (brew install poppler)"; ok=0; fi
  if python3 -c "import defusedxml, lxml" 2>/dev/null; then echo "python deps         : defusedxml, lxml OK"; else echo "python deps         : MISSING (pip3 install defusedxml lxml)"; ok=0; fi
  [ "$ok" = 1 ] && echo "STATUS: READY" || { echo "STATUS: NOT READY"; return 1; }
}

cmd_unpack() {
  local in="$1" dir="$2"; local office; office=$(locate_office)
  ( cd "$office/.." && python3 office/unpack.py "$in" "$dir" )
}

cmd_pack() {
  local dir="$1" out="$2" orig="$3"; local office; office=$(locate_office)
  ( cd "$office/.." && python3 office/pack.py "$dir" "$out" --original "$orig" )
}

cmd_pdf() {
  local in="$1" outdir="$2"; mkdir -p "$outdir"
  [ -x "$SOFFICE_BIN" ] || die "soffice not found at $SOFFICE_BIN"
  "$SOFFICE_BIN" --headless -env:UserInstallation="$LO_PROFILE" \
    --convert-to pdf --outdir "$outdir" "$in" >/dev/null 2>&1
  local base; base=$(basename "$in"); base="${base%.*}"
  [ -f "$outdir/$base.pdf" ] || die "PDF conversion produced no output for $in"
  echo "$outdir/$base.pdf"
}

cmd_pages() {
  local pdf="$1"
  pdfinfo "$pdf" | awk '/^Pages:/ {print $2}'
}

cmd_render() {
  local pdf="$1" prefix="$2"
  pdftoppm -png -r 150 "$pdf" "$prefix" >/dev/null 2>&1
  echo "PAGES=$(cmd_pages "$pdf")"
}

cmd_build() {
  local in="$1" outdir="$2"; mkdir -p "$outdir"
  local pdf; pdf=$(cmd_pdf "$in" "$outdir")
  local base; base=$(basename "$pdf"); base="${base%.*}"
  cmd_render "$pdf" "$outdir/${base}_page"
  echo "PDF=$pdf"
}

case "${1:-}" in
  doctor) cmd_doctor ;;
  unpack) shift; cmd_unpack "$@" ;;
  pack)   shift; cmd_pack "$@" ;;
  pdf)    shift; cmd_pdf "$@" ;;
  pages)  shift; cmd_pages "$@" ;;
  render) shift; cmd_render "$@" ;;
  build)  shift; cmd_build "$@" ;;
  *) echo "usage: cvtools.sh {doctor|unpack|pack|pdf|pages|render|build} ..." >&2; exit 2 ;;
esac
