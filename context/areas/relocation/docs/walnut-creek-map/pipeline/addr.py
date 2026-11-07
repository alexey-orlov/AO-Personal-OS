"""Address normalisation shared by the build scripts.

The page's JavaScript implements the same rules (normKey) so that a sheet
address finds its pre-geocoded point in the embedded cache. Keep the two in
step: suffix and directional tables, unit stripping, Mount -> Mt.
"""
import re

SUFFIX = {
    "drive": "dr", "avenue": "ave", "av": "ave", "road": "rd", "street": "st",
    "lane": "ln", "court": "ct", "boulevard": "blvd", "place": "pl",
    "circle": "cir", "terrace": "ter", "parkway": "pkwy", "highway": "hwy",
    "square": "sq", "trail": "trl", "loop": "loop", "way": "way",
}
DIRS = {"north": "n", "south": "s", "east": "e", "west": "w"}
UNIT_RE = re.compile(r"\s*(?:,\s*)?(?:apt|apartment|unit|ste|suite|bldg|#)\.?\s*#?\s*[\w-]+\s*$", re.I)


def street_line(address: str) -> str:
    """First comma part, without a trailing unit designator."""
    first = address.split(",")[0]
    first = UNIT_RE.sub("", first.strip())
    return re.sub(r"\s+", " ", first).strip()


def norm_key(address: str) -> str:
    s = street_line(address).lower().replace(".", "")
    words = s.split(" ")
    out = []
    for w in words:
        if w in ("mount",):
            w = "mt"
        w = DIRS.get(w, w)
        w = SUFFIX.get(w, w)
        out.append(w)
    return " ".join(out)


def zip_of(address: str):
    m = re.search(r"\b(9[45]\d{3})\b", address)
    return m.group(1) if m else ""


def house_number(address: str):
    m = re.match(r"\s*(\d+)", street_line(address))
    return int(m.group(1)) if m else None
