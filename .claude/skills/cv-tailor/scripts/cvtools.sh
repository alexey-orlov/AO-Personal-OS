#!/usr/bin/env bash
# cvtools.sh — deterministic plumbing for the cv-tailor skill.
#
# Pipeline: unpack (pretty XML, easy to edit) → surgical Edit → repack (naive
# re-zip, byte-faithful) → docx→pdf (LibreOffice) → pdf→png + page count
# (poppler) → pixel-diff vs baseline (ImageMagick). The repack is a plain zip
# (NOT the docx skill's pack.py, which needs Python ≥3.10 — this box has 3.9);
# a no-op unpack→repack round-trip was verified pixel-identical to the source.
#
# The docx skill's unpack.py lives under a hashed plugin path that changes on
# update, so we LOCATE it dynamically. unpack.py runs fine on Python 3.9.
#
# Usage:
#   cvtools.sh doctor                          # check all deps, print resolved paths
#   cvtools.sh unpack <in.docx> <dir>          # explode docx → pretty-printed XML
#   cvtools.sh repack <dir> <out.docx>         # naive re-zip dir → docx
#   cvtools.sh pdf    <in.docx> <outdir>       # docx → <outdir>/<base>.pdf (prints path)
#   cvtools.sh render <in.pdf>  <prefix>       # pdf → <prefix>-N.png @150dpi; prints "PAGES=N"
#   cvtools.sh pages  <in.pdf>                 # prints integer page count only
#   cvtools.sh build  <in.docx> <outdir>       # pdf + render in one step; prints PAGES + PDF
#   cvtools.sh compare <imgA> <imgB> <diffout> # prints "DIFF_PX=<n>" (0 = pixel-identical)
set -euo pipefail

SOFFICE_BIN="${SOFFICE_BIN:-/Applications/LibreOffice.app/Contents/MacOS/soffice}"
LO_PROFILE="${LO_PROFILE:-file://${TMPDIR:-/tmp}/cv-tailor/loprofile}"

die() { echo "cvtools: ERROR: $*" >&2; exit 1; }
abspath() { python3 -c "import os,sys;print(os.path.abspath(sys.argv[1]))" "$1"; }

locate_office() {
  local hit
  hit=$(find "$HOME/Library/Application Support/Claude" \
        -type d -path '*skills/docx/scripts/office' 2>/dev/null | head -1)
  [ -n "$hit" ] || die "could not locate the bundled docx skill (scripts/office). Is the Anthropic skills plugin installed?"
  echo "$hit"
}

# ImageMagick v7 uses `magick compare`; v6 uses `compare`.
im_compare() {
  if command -v compare >/dev/null 2>&1; then compare "$@"; else magick compare "$@"; fi
}

cmd_doctor() {
  local ok=1
  local office; office=$(locate_office) || ok=0
  echo "docx unpack.py      : ${office:-MISSING}/unpack.py"
  if [ -x "$SOFFICE_BIN" ]; then echo "soffice             : $SOFFICE_BIN"; else echo "soffice             : MISSING ($SOFFICE_BIN)"; ok=0; fi
  if command -v pdftoppm >/dev/null 2>&1; then echo "pdftoppm            : $(command -v pdftoppm)"; else echo "pdftoppm            : MISSING (brew install poppler)"; ok=0; fi
  if command -v pdfinfo  >/dev/null 2>&1; then echo "pdfinfo             : $(command -v pdfinfo)";  else echo "pdfinfo             : MISSING (brew install poppler)"; ok=0; fi
  if command -v compare >/dev/null 2>&1 || command -v magick >/dev/null 2>&1; then echo "imagemagick         : OK"; else echo "imagemagick         : MISSING (brew install imagemagick)"; ok=0; fi
  if python3 -c "import defusedxml, lxml" 2>/dev/null; then echo "python deps         : defusedxml, lxml OK"; else echo "python deps         : MISSING (pip3 install defusedxml lxml)"; ok=0; fi
  [ "$ok" = 1 ] && echo "STATUS: READY" || { echo "STATUS: NOT READY"; return 1; }
}

cmd_unpack() {
  local in; in=$(abspath "$1"); local dir; dir=$(abspath "$2")
  local office; office=$(locate_office)
  ( cd "$office/.." && python3 office/unpack.py "$in" "$dir" )
}

cmd_repack() {
  local dir; dir=$(abspath "$1"); local out; out=$(abspath "$2")
  [ -d "$dir" ] || die "repack: dir not found: $dir"
  rm -f "$out"
  ( cd "$dir" && zip -r -X -q "$out" . -x '.*' -x '__MACOSX*' -x '*/.DS_Store' )
  [ -f "$out" ] || die "repack produced no output"
  echo "$out"
}

cmd_pdf() {
  local in; in=$(abspath "$1"); local outdir; outdir=$(abspath "$2"); mkdir -p "$outdir"
  [ -x "$SOFFICE_BIN" ] || die "soffice not found at $SOFFICE_BIN"
  "$SOFFICE_BIN" --headless -env:UserInstallation="$LO_PROFILE" \
    --convert-to pdf --outdir "$outdir" "$in" >/dev/null 2>&1
  local base; base=$(basename "$in"); base="${base%.*}"
  [ -f "$outdir/$base.pdf" ] || die "PDF conversion produced no output for $in"
  echo "$outdir/$base.pdf"
}

cmd_pages() { pdfinfo "$1" | awk '/^Pages:/ {print $2}'; }

cmd_render() {
  local pdf="$1" prefix="$2"
  pdftoppm -png -r 150 "$pdf" "$prefix" >/dev/null 2>&1
  echo "PAGES=$(cmd_pages "$pdf")"
}

cmd_build() {
  local in="$1" outdir; outdir=$(abspath "$2"); mkdir -p "$outdir"
  local pdf; pdf=$(cmd_pdf "$in" "$outdir")
  local base; base=$(basename "$pdf"); base="${base%.*}"
  cmd_render "$pdf" "$outdir/${base}_page"
  echo "PDF=$pdf"
}

cmd_compare() {
  local a="$1" b="$2" out="$3"
  if [ ! -f "$a" ] || [ ! -f "$b" ]; then echo "DIFF_PX=MISSING_INPUT"; return 0; fi
  # AE = count of differing pixels. fuzz absorbs sub-pixel AA noise from re-render.
  local px
  px=$(im_compare -metric AE -fuzz 2% "$a" "$b" "$out" 2>&1 | tr -d '\n' | awk '{print $1}')
  echo "DIFF_PX=${px:-?}"
}

case "${1:-}" in
  doctor)  cmd_doctor ;;
  unpack)  shift; cmd_unpack "$@" ;;
  repack)  shift; cmd_repack "$@" ;;
  pdf)     shift; cmd_pdf "$@" ;;
  pages)   shift; cmd_pages "$@" ;;
  render)  shift; cmd_render "$@" ;;
  build)   shift; cmd_build "$@" ;;
  compare) shift; cmd_compare "$@" ;;
  *) echo "usage: cvtools.sh {doctor|unpack|repack|pdf|pages|render|build|compare} ..." >&2; exit 2 ;;
esac
