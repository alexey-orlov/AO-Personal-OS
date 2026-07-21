# External source roots — registry

Where an area's **source files live _outside_ this repo** — local disk, Google Drive, OneDrive/SharePoint, etc. The repo holds the distilled wiki (`context/areas/<area>/`) plus only the materials Alex explicitly commits to an area's `docs/`. Bulk, binary, or private source files (decks, spreadsheets, PDFs, screenshots, recordings) stay in their external home and are pointed to from here — one uniform place, whatever the storage backend.

**Why this exists:** so any agent working an area knows where to read its raw materials, and so the convention stays the same as new areas point to different backends. In-repo committed materials are NOT tracked here — those live in the area's `docs/`.

## How agents use this
- Working an area? Read `index.md` → the area `README.md`, then check here for an external root and read from there when you need source files. The area README also carries a one-line `_source files:` pointer back to its entry.
- A `local` root resolves **only on the machine(s) named in Machine scope**. This repo syncs across devices; local paths do **not**. On any other machine — or a cloud/CI sandbox — treat the files as absent; don't assume the path exists. Check before reading.
- `gdrive` / `onedrive` roots are reachable through their connected MCP (Google Drive / `ms365`) when those tools are available in the session: the URL is for Alex to click, the id/path is what tools resolve.

## How to add an entry (the universal approach)
When Alex says *"files for area X live at \<path or URL\>"*:
1. Add a row to the **Registry** table.
2. Add a detail block under **Entries** using the schema fields.
3. If X is a wiki area, add/refresh the one-line `_source files:` pointer in `context/areas/X/README.md`'s header (the `context-update` skill preserves it on rewrite).

Keep entries at **root + a contents gloss** — map top folders to wiki subprojects where useful; do **not** enumerate every file (that rots). 

**Schema fields** — `Type` · `Location` · `Machine scope` · `Backed up` · `Contents` · `Added`:
- **Type:** `local` | `gdrive` | `onedrive` (extensible — add a backend when first needed).
- **Location:** absolute path for `local` (use the `~`-relative form as canonical so it survives a username change); share URL for cloud, with the drive/item id when a tool will resolve it.
- **Machine scope:** `local` only — the ComputerName(s) where the path resolves (the id git-autosync commits as). `-` for cloud.
- **Backed up:** cloud-sync status / durability of the root.
- **Contents:** top folder → wiki home mapping, one line.
- **Added:** YYYY-MM-DD.

Cloud `Location` examples for when they arrive — gdrive: `https://drive.google.com/drive/folders/<id>` · onedrive: `https://<tenant>-my.sharepoint.com/.../<area>` (note the drive item id alongside).

## Registry

| Area | Type | Location | Machine scope | Added |
|---|---|---|---|---|
| [softserve](../areas/softserve/README.md) | local + onedrive | `~/Library/CloudStorage/OneDrive-SoftServe,Inc` | this Mac (`KN7X2Y65NX`); OneDrive-synced, also via `ms365` MCP | 2026-06-16 (moved to OneDrive 2026-07-21) |

## Entries

### softserve — `~/Library/CloudStorage/OneDrive-SoftServe,Inc` (OneDrive root)
- **Type:** `local + onedrive` — the **SoftServe-tenant OneDrive**. The *entire* OneDrive is SoftServe context; treat the **root as the master directory for all SoftServe local files**. Synced to disk on this Mac AND reachable via the `ms365` MCP off-machine.
- **Location (local, primary):** `~/Library/CloudStorage/OneDrive-SoftServe,Inc` (resolves to `/Users/olekorlov/Library/CloudStorage/OneDrive-SoftServe,Inc` on this Mac). Convenience symlink alias: `~/OneDrive - SoftServe, Inc` → the same folder.
- **Off-machine access:** reachable through the `ms365` MCP (Microsoft Graph / OneDrive, SoftServe tenant) — so unlike the old iCloud-Documents path, cloud routines and other devices CAN read these files (resolve items by path or `search-onedrive-files`). The `ms365` server must be authenticated first (`/mcp` or `claude mcp`); it is **not** logged in by default.
- **Machine scope:** the local path resolves on this Mac (ComputerName `KN7X2Y65NX`) and any device with this OneDrive account mounted; the `ms365` route is machine-independent.
- **Backed up:** yes — OneDrive cloud sync (SoftServe tenant). Not committed to this repo.
- **Contents** (top folder → wiki home):
  - `Projects/Oracle/` → [oracle](../areas/softserve/oracle.md) — the partnership working set. Per-customer subfolders (`AIDP/`, `Belron/`, `Bosch/`, `DHL/`, `KPN/`, `NHS/`, `RiyahdAir/`, `SBG/`); `General/` (GTM deck, the partnership-vision deck drafts, pipeline review copies); `Use case maps/` (the canonical **productization pipeline spreadsheet** `SoftServe-NVIDIA-Productization Use cases-Pipeline…xlsx` + the **agentic pattern taxonomy** `AI workflow patterns - AIDP-NVIDIA-OracleAI mapping.xlsx`); `Workforce optimization package/` (WfO service-packages deck, sales one-pager, accelerator-pack one-pager); `KPIs.xlsx`; `Presentation.pptx`.
  - `Projects/Jumpstart/` → [jumpstart-pm](../areas/softserve/jumpstart-pm.md) — ADLC framework, Express SDLC assessment checklist, Conga AI-PM + Agentic-metrics decks, the AI PM Jumpstart / Jumpstart Express program outlines (v1 + v2, `.html`/`.pdf`), anonymized SDLC status reports, Daxko metrics.
  - `Projects/R&D Products strategy/` → area-level (was the old `Strategy/`) — "Strategic options" deck, product-management / product-strategy workshop files, `Workshop/`.
  - `Projects/Conga - AI-powered Product Management/`, `Projects/Meta/` → area-level / misc (Conga enablement materials; screenshots).
  - `Projects/Presentation templates/` → the SoftServe-brand deck templates (base for the partnership-vision + WfO decks).
  - Root-level context beyond `Projects/`: `Meetings/`, `Recordings/`, `Hiring/`, `Monthly AI products overviews/`, `Productization - General/` (`Customer projects.xlsx`), `Attachments/`, Teams / Copilot chat files, `Agentic Engineering.xlsx`.
- **Added:** 2026-06-16 (moved from the now-obsolete `~/Documents/Documents/SoftServe` to this OneDrive root on 2026-07-21)
