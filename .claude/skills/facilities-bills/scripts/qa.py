#!/usr/bin/env python3
"""Check rendered Yasno PDFs against their file names before anything is uploaded.

usage: python3 -I qa.py --accounts references/yasno-accounts.json OUT_DIR

Per PDF: no page is blank (only the print header/footer); the folder's account number is in the
text. Receipts ("... платіж YYYY-MM-DD AMOUNT грн"): the amount and the date are in the text.
History ("Історія платежів YYYY"): payment rows exist and all of them are from YYYY.
Account book ("Абонентська книжка YYYY"): "YYYY рік" shown, no other year group, the right-hand
columns (Сплачено, Баланс) present — portrait prints clip them.
Exit 1 when anything fails; the run stops there.
"""
import argparse, json, os, re, subprocess, sys

MON = {"01": "січ", "02": "лют", "03": "бер", "04": "квіт", "05": "трав", "06": "черв",
       "07": "лип", "08": "серп", "09": "вер", "10": "жовт", "11": "лист", "12": "груд"}


def page_texts(pdf):
    info = subprocess.run(["pdfinfo", pdf], capture_output=True, text=True).stdout
    n = int(re.search(r"Pages:\s+(\d+)", info).group(1))
    return [subprocess.run(["pdftotext", "-f", str(i), "-l", str(i), "-layout", pdf, "-"],
                           capture_output=True, text=True).stdout for i in range(1, n + 1)]


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--accounts", required=True)
    ap.add_argument("out")
    a = ap.parse_args()
    acct = {x["folder"]: x["account_number"] for x in json.load(open(a.accounts, encoding="utf-8"))["accounts"]}
    problems, count = [], 0
    for dp, _, fs in os.walk(a.out):
        for f in sorted(fs):
            if not f.endswith(".pdf"):
                continue
            count += 1
            pdf = os.path.join(dp, f)
            folder = os.path.relpath(pdf, a.out).split(os.sep)[0]
            ps = page_texts(pdf)
            text = re.sub(r"[\s\u00a0\u202f]+", " ", " ".join(ps))
            for i, p in enumerate(ps, 1):
                body = [l for l in p.splitlines() if l.strip() and "yasno.ua/my" not in l
                        and not re.match(r"\s*\d\d\.\d\d\.\d{4}, \d\d:\d\d", l)]
                if len(body) < 2:
                    problems.append(f"{f}: page {i} is blank")
            if folder in acct and acct[folder] not in text:
                problems.append(f"{f}: account {acct[folder]} not in text")
            m = re.search(r"платіж (\d{4})-(\d\d)-(\d\d) (-?[\d.]+) грн", f)
            if m:
                y, mo, d, amt = m.groups()
                whole, frac = amt.split(".")
                spaced = f"{int(whole):,}".replace(",", " ") + "." + frac
                if f"{spaced} ₴" not in text and f"{amt} ₴" not in text:
                    problems.append(f"{f}: amount {spaced} not in text")
                if f"{int(d)} {MON[mo]} {y}" not in text:
                    problems.append(f"{f}: date {int(d)} {MON[mo]} {y} not in text")
                continue
            m = re.search(r"(Історія платежів|Абонентська книжка) (\d{4})", f)
            if not m:
                continue
            kind, y = m.groups()
            if kind == "Історія платежів":
                years = re.findall(r"\b\d{1,2} [а-яії]+ (\d{4})\b", text)
                if not years:
                    problems.append(f"{f}: no payment rows")
                other = sorted({x for x in years if x != y})
                if other:
                    problems.append(f"{f}: rows from other years {other}")
            else:
                if f"{y} рік" not in text:
                    problems.append(f"{f}: '{y} рік' missing")
                if re.search(r"\b(?!%s)\d{4} рік" % y, text):
                    problems.append(f"{f}: another year's group is shown")
                if "Баланс" not in text or "Сплачено" not in text:
                    problems.append(f"{f}: table columns clipped")
                months = len(re.findall(r"\b(?:%s) %s\b" % ("|".join(MON.values()), y), text))
                print(f"  {folder} · {kind} {y}: {months} month rows, {len(ps)} pages")
    print(f"{count} PDFs checked, {len(problems)} problems")
    for p in problems:
        print(" -", p)
    sys.exit(1 if problems or not count else 0)


if __name__ == "__main__":
    main()
