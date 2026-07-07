# Blocked apple-notes-sync cards

Cards parked here target **checklist-bearing** `_ToDo` notes and cannot be filed
headlessly: `osascript` lacks Accessibility permission, so the UI-insertion
fallback (`notes_ax_insert.sh`) fails with error **-1719**. They are held OUT of
the live queue (`../*.md`, which `run.sh` scans at `-maxdepth 1`) so the launchd
agent stops force-running — and activating Notes — every cycle on cards it can't
process.

## To unblock

1. System Settings → Privacy & Security → **Accessibility** → enable **osascript**
   (drag in `/usr/bin/osascript` if absent) and **Claude**.
2. Move the cards back into the live queue:
   ```
   mv context/_inbox/apple-notes/_blocked/*.md context/_inbox/apple-notes/
   ```
3. They'll be filed on the next run (or run `automations/apple-notes-sync/run.sh`).

Parked 2026-07-07. Cards: 95, 114, 170 → **"AI Product expertise ToDo"** /
**"Tools to build:"** block.
