"""Contact sheet of Everkinetic drawings, to look at candidates before attaching them (README, "Skill side" step 3).

  git clone --filter=blob:none --no-checkout --depth 1 https://github.com/everkinetic/data.git automations/personal-trainer/app/.work/everkinetic
  git -C automations/personal-trainer/app/.work/everkinetic checkout HEAD -- exercises.json dist/svg
  python3 automations/personal-trainer/app/dev/contact_sheet.py <out.png> <id_num> [<id_num> ...]

One row per drawing pair, labelled: start (relaxation) and end (tension) side by side, a missing drawing in red.
Renders with headless Chrome (QuickLook's qlmanage hangs on this Mac). Open the PNG with the Read tool.
"""
import json
import os
import subprocess
import sys

APP = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
EK = os.environ.get("EVERKINETIC_DIR") or os.path.join(APP, ".work", "everkinetic")
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"


def main():
    if len(sys.argv) < 3:
        sys.exit(__doc__)
    out = os.path.abspath(sys.argv[1])
    ids = sys.argv[2:]
    meta = {e["id_num"]: e for e in json.load(open(os.path.join(EK, "exercises.json"), encoding="utf-8"))}
    rows = []
    for n in ids:
        cells = []
        for kind in ("relaxation", "tension"):
            p = os.path.join(EK, "dist", "svg", f"{n}-{kind}.svg")
            cells.append(f'<div class="c"><img src="file://{p}"><span>{kind}</span></div>' if os.path.exists(p)
                         else '<div class="c miss">no drawing</div>')
        rows.append(f'<div class="r"><div class="l">{n}<br>{meta.get(n, {}).get("name", "?")}</div>{"".join(cells)}</div>')
    html = ("<!doctype html><meta charset=utf-8><style>body{margin:0;font:14px sans-serif;background:#fff}"
            ".r{display:flex;align-items:center;border-bottom:1px solid #ccc;height:340px}.l{width:150px;padding:8px;word-break:break-word}"
            ".c{width:330px;height:330px;display:flex;flex-direction:column;align-items:center;justify-content:center}"
            ".c img{width:310px;height:300px;object-fit:contain}.c span{font-size:11px;color:#666}.miss{color:#c00}</style>" + "".join(rows))
    os.makedirs(os.path.dirname(out), exist_ok=True)
    page = out[:-4] + ".html"
    open(page, "w", encoding="utf-8").write(html)
    prof = os.path.join(os.path.dirname(out), ".chrome-profile")
    subprocess.run([CHROME, "--headless=new", "--disable-gpu", "--no-first-run", "--no-default-browser-check", f"--user-data-dir={prof}",
                    "--hide-scrollbars", "--allow-file-access-from-files", f"--window-size=820,{max(340, 340 * len(ids))}",
                    f"--screenshot={out}", "file://" + page], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, timeout=90)
    print(out if os.path.exists(out) else "FAILED: no screenshot")


if __name__ == "__main__":
    main()
