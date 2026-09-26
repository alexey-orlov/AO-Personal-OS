#!/bin/zsh
# pp_render.sh <deck.pptx> <outdir> [dpi=110] [pages e.g. "1,4,7"]
# True-font render: an ACTIVATED Microsoft PowerPoint exports a PDF via AppleScript, PyMuPDF rasterises it
# into s01.png… plus 3×3 contact sheets. Needs python with pymupdf + pillow (set PY=…/venv/bin/python).
# Recipe and failure modes: .claude/references/document-rendering.md
set -u
DECK="$1"; OUT="$2"; DPI="${3:-110}"; PAGES="${4:-}"; PY="${PY:-python3}"
PPC="$HOME/Library/Containers/com.microsoft.Powerpoint/Data/Documents/qa"   # PowerPoint's sandbox: always writable
mkdir -p "$PPC/out" "$OUT"
NAME="qa_$(date +%H%M%S)_$(basename "$DECK")"
cp "$DECK" "$PPC/$NAME"
open -a "Microsoft PowerPoint" "$PPC/$NAME"          # never AppleScript `open` — it hangs PowerPoint's event queue
for i in {1..40}; do
  R=$(perl -e 'alarm 15; exec @ARGV' osascript -e 'tell application "Microsoft PowerPoint" to get name of presentations' 2>/dev/null)
  [[ "$R" == *"$NAME"* ]] && break
  perl -e 'select(undef,undef,undef,1.5)'
done
PDF="$PPC/out/${NAME%.pptx}.pdf"
perl -e 'alarm 280; exec @ARGV' osascript -e 'with timeout of 270 seconds' \
  -e "tell application \"Microsoft PowerPoint\" to save presentation \"$NAME\" in (POSIX file \"$PDF\") as save as PDF" \
  -e 'end timeout' 2>&1
perl -e 'alarm 60; exec @ARGV' osascript -e 'tell application "Microsoft PowerPoint"' \
  -e "if (name of presentations) contains \"$NAME\" then close presentation \"$NAME\" saving no" -e 'end tell' >/dev/null 2>&1
rm -f "$PPC/$NAME"
[[ -s "$PDF" ]] || { echo "NO PDF produced — is PowerPoint activated (no 'View Only' banner)?"; exit 1; }
"$PY" - "$PDF" "$OUT" "$DPI" "$PAGES" <<'PY'
import fitz, sys, os
from PIL import Image, ImageDraw
pdf, out, dpi, pages = sys.argv[1], sys.argv[2], int(sys.argv[3]), sys.argv[4]
want = {int(x) for x in pages.split(',')} if pages else None
doc = fitz.open(pdf); made = []
for i, pg in enumerate(doc, 1):
    if want and i not in want: continue
    p = os.path.join(out, f"s{i:02d}.png"); pg.get_pixmap(dpi=dpi).save(p); made.append((i, p))
print("pages", doc.page_count, "rendered", len(made))
tw = 740
for n in range(0, len(made), 9):
    chunk = made[n:n + 9]; ims = []
    for i, p in chunk:
        im = Image.open(p).convert('RGB'); ims.append((i, im.resize((tw, int(im.height * tw / im.width)))))
    th = max(im.height for _, im in ims); rows = (len(ims) + 2) // 3
    sheet = Image.new('RGB', (3 * (tw + 12) + 12, rows * (th + 34) + 12), 'white'); d = ImageDraw.Draw(sheet)
    for k, (i, im) in enumerate(ims):
        x = 12 + (k % 3) * (tw + 12); y = 12 + (k // 3) * (th + 34)
        d.text((x, y), f"slide {i}", fill='black'); sheet.paste(im, (x, y + 20))
    cp = os.path.join(out, f"contact{n // 9 + 1}.jpg"); sheet.save(cp, quality=88); print("contact", cp)
PY
