# -*- coding: utf-8 -*-
"""
Regression tests for the two scoring bugs that actually shipped in an earlier draft.

1. pct_rank was inverted for every criterion, so Sea Ranch -- the most remote place in the set --
   scored 100 for "close to downtown SF". Any edit to pct_rank must keep these passing.
2. Rent averaged whatever bedroom counts happened to be present, so a place with only a 2BR
   figure looked systematically cheaper than one with both, because 3BRs run ~1.4x the 2BR.

Run: python3 test_scoring.py
"""
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
from score import pct_rank            # noqa: E402
from single_table import (rent_index, share_under, band, match_district,   # noqa: E402
                          classify_assignment, classify_tk)

FAILS = []


def chk(label, got, want):
    if got != want:
        FAILS.append((label, got, want))
    print(("PASS " if got == want else "FAIL "), label, "->", got)


# ---------------------------------------------------------------- pct_rank direction
chk("higher-is-better: max scores 100", pct_rank([1, 2, 3], True)[2], 100.0)
chk("higher-is-better: min scores 0", pct_rank([1, 2, 3], True)[0], 0.0)
chk("lower-is-better: min scores 100", pct_rank([1, 2, 3], False)[0], 100.0)
chk("lower-is-better: max scores 0", pct_rank([1, 2, 3], False)[2], 0.0)
chk("None is preserved", pct_rank([1, None, 3], True)[1], None)
chk("ties share a rank", pct_rank([5, 5, 1], True)[0] == pct_rank([5, 5, 1], True)[1], True)
chk("singleton scores 100", pct_rank([7], True)[0], 100.0)

# the exact failure that shipped: remote place must not win the closeness criterion
_d = pct_rank([5.0, 30.0, 137.9], higher_is_better=False)
chk("most remote place scores 0 for closeness", _d[2], 0.0)
chk("closest place scores 100 for closeness", _d[0], 100.0)

# ------------------------------------------------------- rent index bedroom consistency
# A place with only a 2BR figure must not be scored as if that 2BR were its whole-market
# average, or it outranks an identical place that happens to have both figures.
both = rent_index(3000, 4200, premium=1.40)
only2 = rent_index(3000, None, premium=1.40)
chk("2BR-only index matches the both-bedroom index at the same price level",
    abs(only2 - (3000 + 3000 * 1.40) / 2) < 0.01, True)
chk("2BR-only is NOT just the 2BR figure", only2 != 3000, True)
chk("both-bedroom index is the plain mean", both, 3600.0)
only3 = rent_index(None, 4200, premium=1.40)
chk("3BR-only index is deflated toward a 2BR-equivalent", only3 < 4200, True)
chk("no rent at all -> None", rent_index(None, None, premium=1.40), None)

# ------------------------------------------------------------------- supply banding
chk("cheap market -> Plenty under $4k", band(share_under(2400)), "Plenty")
chk("expensive market -> Almost none under $4k", band(share_under(9000)), "Almost none")
chk("no median -> blank band", band(share_under(None)), "")

# ------------------------------------------------------------- district name matching
DISTRICTS = {
    "san rafael city elementary": {"name": "San Rafael City Elementary"},
    "san rafael city high": {"name": "San Rafael City High"},
    "jefferson elementary": {"name": "Jefferson Elementary"},
    "jefferson union high": {"name": "Jefferson Union High"},
    "palo alto unified": {"name": "Palo Alto Unified"},
}
chk("strips 'School District' suffix",
    match_district("Palo Alto Unified School District", DISTRICTS)["name"], "Palo Alto Unified")
chk("picks the elementary district, not the high district",
    match_district("San Rafael City Elementary School District", DISTRICTS)["name"],
    "San Rafael City Elementary")
chk("picks the high district when that is what was asked for",
    match_district("Jefferson Union High School District", DISTRICTS)["name"],
    "Jefferson Union High")
chk("unknown district -> None", match_district("Nowhere Unified", DISTRICTS), None)
chk("empty -> None", match_district("", DISTRICTS), None)

# ------------------------------------------------- assignment classification
# The real strings the research agents returned. Most California districts are address-based
# AND mention an optional transfer, so a naive whole-string search for "choice" mislabels them
# as lotteries and applies the -18 penalty to the wrong districts.
chk("plain address-based", classify_assignment("address-based attendance area"), "address")
chk("address-based that also mentions school-choice transfers is NOT a lottery",
    classify_assignment("address-based attendance area - with an intra-district school-choice option"),
    "address")
chk("address-based with an open-enrollment lottery qualifier is NOT a lottery district",
    classify_assignment("address-based attendance area (with an optional open-enrollment lottery)"),
    "address")
chk("genuine lottery district", classify_assignment("choice lottery"), "lottery")
chk("genuine lottery with qualifier",
    classify_assignment('choice lottery - "controlled choice" within three elementary zones'),
    "lottery")
chk("unknown -> None", classify_assignment(None), None)
chk("empty -> None", classify_assignment(""), None)

# ------------------------------------------------------ TK capacity classification
# Agents often report the ABSENCE of a constraint. A bare keyword search reads
# "no TK waitlist, TK lottery, or seat cap is stated" as three constraints and applies -12.
chk("negated constraints are not a constraint",
    classify_tk("no TK waitlist, TK lottery, or TK seat cap is stated, so TK capacity is not established"),
    None)
chk("real constraint", classify_tk("Constrained. Space is capped at the home school; waiting list"), "tight")
chk("TK lottery is a constraint",
    classify_tk("site-level TK/K lotteries are held when enrollment exceeds available space"), "tight")
chk("genuinely open", classify_tk("TK at all elementary schools, no waitlist"), "open")
chk("high school district -> None", classify_tk("Not applicable - high school district"), None)
chk("empty -> None", classify_tk(""), None)

print()
if FAILS:
    print(f"{len(FAILS)} FAILURES")
    for f in FAILS:
        print("  ", f)
    sys.exit(1)
print("ALL PASS")
