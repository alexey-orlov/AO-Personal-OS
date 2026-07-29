#!/usr/bin/env python3
"""digest.py — turn `gym_sheet.py progress` JSON (stdin) into the 🏋️ Telegram
digest text (stdout), per the message spec in .claude/skills/gym-log/SKILL.md.

Exists so the numbers in the digest come from the sheet via one code path,
never from an agent's mental math, and so flush_pending.sh can deliver the
digest itself instead of leaving it to a follow-up session.

    gym_sheet.py progress 7/29/2026 | digest.py | TG_TOPIC=trainings telegram_send.sh
"""
import json
import sys


def dm(date_str):
    """M/D/YYYY -> DD.MM"""
    m, d, _ = date_str.split("/")
    return f"{int(d):02d}.{int(m):02d}"


def num(v):
    """Drop the trailing .0 so 59.0 prints as 59, 22.5 stays 22.5."""
    f = float(v)
    return str(int(f)) if f == int(f) else str(f)


def signed(v):
    """Sign is always explicit — '±0' reads better than '+0' for unchanged."""
    f = float(v)
    if f == 0:
        return "±0"
    return f"+{num(f)}" if f > 0 else f"−{num(abs(f))}"


def arrow(kg):
    return " 📈" if float(kg) > 0 else (" 📉" if float(kg) < 0 else "")


def cmp_line(label, ref, show_arrow=False):
    delta = f"{signed(ref['delta_kg'])} kg"
    if ref.get("delta_pct") is not None:
        delta += f" ({signed(ref['delta_pct'])}%)"
    tail = arrow(ref["delta_kg"]) if show_arrow else ""
    return f"  vs {label} ({dm(ref['date'])}): {delta}{tail}"


def main():
    p = json.load(sys.stdin)
    ex = p.get("exercises", [])
    lines = []

    cats = list(dict.fromkeys(e["category"] for e in ex))
    lines.append(f"🏋️ {dm(p['date'])} — {', '.join(cats)}" if cats
                 else f"🏋️ {dm(p['date'])}")

    w = p.get("my_weight") or {}
    if w.get("today") is not None:
        line = f"⚖️ {num(w['today'])} kg"
        if w.get("prev"):
            line += f" ({signed(w['prev']['delta_kg'])} vs {dm(w['prev']['date'])})"
        lines.append(line)

    # All-new session: comparisons start next time — keep it to a few lines.
    if p.get("compared_count", 0) == 0 and ex:
        lines += ["", f"Session logged — {len(ex)} exercises, baselines set.",
                  "Comparisons start next time 💪"]
        print("\n".join(lines))
        return

    lines.append("")
    gained = False
    for e in ex:
        t = e["today"]
        head = f"{e['exercise']} {t['sets']}×{t['reps']} → {num(t['w_end'])} kg"
        if e.get("is_new"):
            lines.append(f"✨ {head} — first log, baseline set")
            continue
        lines.append(head)
        if e.get("prev"):
            lines.append(cmp_line("last", e["prev"], show_arrow=True))
            gained = gained or float(e["prev"]["delta_kg"]) > 0
        if e.get("base_3mo"):
            lines.append(cmp_line("3 mo", e["base_3mo"]))

    # One closing line, and only when there is real progress to point at.
    if gained:
        lines += ["", "Numbers moved up 💪"]

    print("\n".join(lines))


if __name__ == "__main__":
    main()
