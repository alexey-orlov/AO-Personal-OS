"""Capture slide 4's all-products view from a local checkout of the Oracle mini-site.

Usage: python3 capture_minisite.py <Oracle-Solutions-Site checkout>
Writes <checkout>/site/index_agg.html (the real products page with the hero, filters and outcome lists hidden and
all tiles in one five-column grid), screenshots it with headless Chrome until every tile photo has loaded, and saves
the cropped result to assets/minisite.png next to this script. Delete index_agg.html from the checkout afterwards.
"""
import subprocess
import sys
from pathlib import Path

from PIL import Image, ImageChops, ImageStat

HERE = Path(__file__).resolve().parent
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
CSS = """<style id="agg">
.masthead,.catalog-hero,.rail,.products-search,.results-bar,.site-footer,.mobile-menu{display:none!important}
.rail-layout{display:block!important}
.section.catalog-body{padding:28px 36px!important;margin:0!important}
.wrap{max-width:none!important;padding:0!important;margin:0!important}
.rail-content{width:100%!important;max-width:none!important}
.ptile-grid{grid-template-columns:repeat(5,minmax(0,1fr))!important;gap:18px!important;grid-auto-rows:1fr!important}
.ptile-outcomes,.ptile-cta{display:none!important}
.ptile-title{font-size:25px!important;line-height:1.15!important}
.ptile-desc{font-size:17px!important;line-height:1.4!important}
*{animation:none!important;transition:none!important}
html,body{background:#fff!important}
</style>
<script>
new MutationObserver(function () {
  document.querySelectorAll('img[loading="lazy"]').forEach(function (i) { i.loading = 'eager'; });
}).observe(document.documentElement, {subtree: true, childList: true});
</script>"""


def main():
    site = Path(sys.argv[1]).resolve() / "site"
    page = site / "index_agg.html"
    page.write_text((site / "index.html").read_text().replace("</head>", CSS + "\n</head>", 1))
    raw = HERE / "assets" / "_raw.png"
    for attempt in range(1, 9):
        subprocess.run([CHROME, "--headless=new", "--disable-gpu", "--hide-scrollbars", "--force-device-scale-factor=2",
                        "--window-size=2400,1000", f"--virtual-time-budget={12000 + attempt * 4000}",
                        "--run-all-compositor-stages-before-draw", f"--screenshot={raw}", f"file://{page}#/products"],
                       capture_output=True)
        im = Image.open(raw).convert("RGB")
        bbox = ImageChops.difference(im, Image.new("RGB", im.size, (255, 255, 255))).getbbox()
        crop = im.crop((bbox[0] - 8, bbox[1] - 8, bbox[2] + 8, bbox[3] + 8))
        w, h = crop.size
        flat = [(r, c) for r, (y0, y1) in enumerate(((0.04, 0.18), (0.55, 0.69))) for c in range(5)
                if not (r == 1 and c == 4)
                and ImageStat.Stat(crop.crop((int(w * (c + .15) / 5), int(h * y0), int(w * (c + .85) / 5), int(h * y1)))).stddev[0] < 10]
        print(f"attempt {attempt}: tiles without a photo {flat}")
        if not flat:
            crop.save(HERE / "assets" / "minisite.png", optimize=True)
            raw.unlink()
            return 0
    return 1


if __name__ == "__main__":
    sys.exit(main())
