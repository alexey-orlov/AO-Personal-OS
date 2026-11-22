# shopping-list — the apartment shopping list helper

`shop.py` files items into the Google Sheet "Квартира — список покупок" (registry entry, columns and filling rules: `context/_meta/external-sources.md`, section "relocation: the «Квартира — список покупок» Google Sheet"). Alex dictates items in a chat session; Claude turns each into a JSON row and runs the helper. It goes through the shared Sheets credential (`automations/gsheets/`), so it works on the Mac and in cloud sessions alike.

```bash
echo '[{"room":"Гостиная","cat":"Мебель","type":"Столы","item":"Журнальный столик","en":"Coffee table","qty":1}]' \
  | python3 automations/shopping-list/shop.py add       # new rows, № assigned, date stamped
echo '[{"id":12,"status":"Куплено","price":450}]' \
  | python3 automations/shopping-list/shop.py update    # change fields by №
python3 automations/shopping-list/shop.py delete 12 14  # remove rows by №
python3 automations/shopping-list/shop.py show | sort   # print the list
```

Fields: `room, place, cat, type, item, en, details, qty, prio, status, price, ikea, where, notes`. `cat` is filled from `type` when the type is already listed; `status` defaults to «Идея»; `qty` and `price` must be numbers; `ikea` is the «Брать в IKEA» checkbox (true/false); `where` may be a formula such as `=HYPERLINK("https://…","IKEA LACK, $29.99")`.

How it behaves:
- Every write re-reads the sheet first, so hand edits survive, then rewrites the rows sorted room → category → type → priority → item in the order of the «Списки» tab.
- A room, category or type not yet on «Списки» is appended there, so the dropdowns know it. To place a new room in the middle of the order, write the room list on «Списки» by hand (or with `gsheets.py update`) before adding the item.
- Columns are found by their header text, so they can be reordered by hand; it never writes the «Сумма, $» column (one ARRAYFORMULA in its header cell).
- Cells holding a formula (the HYPERLINK links in «Где купить») are read as formulas and written back as formulas, so a re-sort keeps the links.
- Text goes in RAW, so "3/4" stays text; the «Где купить» column goes in USER_ENTERED so links stay clickable.

`SHOPPING_SHEET_ID` overrides the sheet id (e.g. for a test copy).

## Checklist page (`checklist/`)

The claude.ai page https://claude.ai/artifact/KVAmZoKZHmESb4HZvLyH1P shows the whole list in tabs by kind of thing (Мебель · Аксессуары и декор · Техника · Другое), with a store filter and «Беру» / «Не здесь» / «Куплено» / «Не нужно» on every row; marks are shared through the page's db (layout: `context/_meta/external-sources.md`). The rows are baked into the page, so after every sheet change run `python3 automations/shopping-list/checklist/build.py OUT.html` and publish OUT.html to that URL (the marks survive a republish). `build.py` holds the tab rule, the ReStore rule and the other-store hints; `checklist/target.json` is the hand-curated Target list (row № → hint); `checklist/page.html` is the page template.

## Keeping the page and the sheet in sync (always — Alex, 2026-11-22)

The sheet and the page must never disagree. Lasting marks («Куплено», «Не нужно») live in the page's db and mirror the sheet's «Статус» (Куплено, Отказались); trip marks («Беру», «Не здесь») stay on the page. Run this at the start of every turn that touches the shopping list, and again after any change to the sheet:

1. Export the db: ArtifactData `list` with `out_dir` (one call per collection: `bought`, `unneeded`, `meta`; `query.limit` 1000) for https://claude.ai/artifact/KVAmZoKZHmESb4HZvLyH1P, into one fresh folder.
2. `python3 automations/shopping-list/checklist/sync.py <folder>` shows the plan; add `--apply` to write the sheet. It decides each row three-way against `meta/sync` (the state both sides agreed on last time), so it knows which side changed; when both changed differently, the page wins and the run says so.
3. Write the printed `DB_WRITES` with one ArtifactData `batch` (deletes take the `if_version` shown next to each exported file) and the printed `META` to collection `meta`, doc `sync` (pin `if_version` once it exists).
4. If the sheet changed (here or in step 2): `python3 automations/shopping-list/checklist/build.py OUT.html` and publish OUT.html to the same URL.
