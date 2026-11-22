"""Print every sheet of an .xlsx as rows of non-empty cells (stdlib only).

Usage: python3 -I read_xlsx.py <file.xlsx> [sheet name]
"""
import re
import sys
import zipfile
import xml.etree.ElementTree as ET

NS = {
    "m": "http://schemas.openxmlformats.org/spreadsheetml/2006/main",
    "r": "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
    "rel": "http://schemas.openxmlformats.org/package/2006/relationships",
}


def col_index(ref):
    letters = re.match(r"[A-Z]+", ref).group(0)
    n = 0
    for ch in letters:
        n = n * 26 + (ord(ch) - 64)
    return n


def main():
    path = sys.argv[1]
    only = sys.argv[2] if len(sys.argv) > 2 else None
    z = zipfile.ZipFile(path)
    shared = []
    if "xl/sharedStrings.xml" in z.namelist():
        root = ET.fromstring(z.read("xl/sharedStrings.xml"))
        for si in root.findall("m:si", NS):
            shared.append("".join(t.text or "" for t in si.iter("{%s}t" % NS["m"])))
    wb = ET.fromstring(z.read("xl/workbook.xml"))
    rels = ET.fromstring(z.read("xl/_rels/workbook.xml.rels"))
    target = {r.get("Id"): r.get("Target") for r in rels.findall("rel:Relationship", NS)}
    for sh in wb.find("m:sheets", NS).findall("m:sheet", NS):
        name = sh.get("name")
        if only and name != only:
            continue
        rid = sh.get("{%s}id" % NS["r"])
        t = target[rid].lstrip("/")
        if not t.startswith("xl/"):
            t = "xl/" + t
        root = ET.fromstring(z.read(t))
        print("=== SHEET: %s ===" % name)
        for row in root.iter("{%s}row" % NS["m"]):
            cells = []
            for c in row.findall("m:c", NS):
                ref = c.get("r")
                typ = c.get("t")
                v = c.find("m:v", NS)
                val = None
                if typ == "s" and v is not None:
                    val = shared[int(v.text)]
                elif typ == "inlineStr":
                    is_ = c.find("m:is", NS)
                    val = "".join(x.text or "" for x in is_.iter("{%s}t" % NS["m"])) if is_ is not None else ""
                elif v is not None:
                    val = v.text
                if val not in (None, ""):
                    cells.append("%s=%s" % (ref, val.replace("\n", " / ")))
            if cells:
                print("ROW %s: %s" % (row.get("r"), " | ".join(cells)))


if __name__ == "__main__":
    main()
