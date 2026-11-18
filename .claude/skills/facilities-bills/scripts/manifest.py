#!/usr/bin/env python3
"""Build the Drive upload list for rendered PDFs.

usage: python3 -I manifest.py --accounts references/yasno-accounts.json OUT_DIR

Prints one JSON row per PDF: {"title", "parent_id", "ref", "replace"}.
- ref = the Google Drive connector's file reference, sha256:<hex>:<absolute path>. Pass it as
  create_file's base64Content: the app attaches the file itself, nothing travels through chat.
- parent_id = the account's utility folder (folder_id, e.g. <apartment>/Электроэнергия), or its
  receipts subfolder (receipts_folder_id) for files under OUT/<folder>/<sub>/. Never the apartment
  folder itself (address_folder_id).
- replace = true for the yearly pages (Абонентська книжка / Історія платежів): a file with the same
  title in that folder is trashed before the upload. Receipts are never replaced (they are skipped
  at capture time when they already exist).
"""
import argparse, hashlib, json, os


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--accounts", required=True)
    ap.add_argument("out")
    a = ap.parse_args()
    cfg = json.load(open(a.accounts, encoding="utf-8"))
    by_folder = {x["folder"]: x for x in cfg["accounts"]}
    rows = []
    for dp, _, fs in os.walk(a.out):
        for f in sorted(fs):
            if not f.endswith(".pdf"):
                continue
            path = os.path.abspath(os.path.join(dp, f))
            rel = os.path.relpath(path, os.path.abspath(a.out)).split(os.sep)
            acc = by_folder[rel[0]]
            in_sub = len(rel) == 3
            if in_sub and rel[1] != cfg["receipts_subfolder"]:
                raise SystemExit(f"unexpected subfolder {rel[1]!r} for {f}")
            sha = hashlib.sha256(open(path, "rb").read()).hexdigest()
            rows.append({"title": f, "parent_id": acc["receipts_folder_id"] if in_sub else acc["folder_id"],
                         "ref": f"sha256:{sha}:{path}", "replace": not in_sub,
                         "bytes": os.path.getsize(path)})
    rows.sort(key=lambda r: (r["parent_id"], r["title"]))
    for r in rows:
        print(json.dumps(r, ensure_ascii=False))


if __name__ == "__main__":
    main()
