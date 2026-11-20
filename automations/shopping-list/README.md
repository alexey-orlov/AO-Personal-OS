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

Fields: `room, place, cat, type, item, en, details, qty, prio, status, price, where, notes`. `cat` is filled from `type` when the type is already listed; `status` defaults to «Идея»; `qty` and `price` must be numbers.

How it behaves:
- Every write re-reads the sheet first, so hand edits survive, then rewrites the rows sorted room → category → type → priority → item in the order of the «Списки» tab.
- A room, category or type not yet on «Списки» is appended there, so the dropdowns know it. To place a new room in the middle of the order, write the room list on «Списки» by hand (or with `gsheets.py update`) before adding the item.
- It never writes column M («Сумма, $»): that is one ARRAYFORMULA in M1.
- Text goes in RAW, so "3/4" stays text; the «Где купить» column goes in USER_ENTERED so links stay clickable.

`SHOPPING_SHEET_ID` overrides the sheet id (e.g. for a test copy).
