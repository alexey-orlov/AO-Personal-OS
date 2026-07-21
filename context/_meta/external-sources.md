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

### softserve — `~/Documents/Documents/SoftServe`
- **Type:** local
- **Location:** `~/Documents/Documents/SoftServe` (resolves to `/Users/olekorlov/Documents/Documents/SoftServe` on this Mac). The nested `Documents/Documents` is real, not a typo.
- **Machine scope:** this Mac only — ComputerName `KN7X2Y65NX` (the device git-autosync commits as). Not present on other synced devices or in cloud runs.
- **Backed up:** sits under `~/Documents`, so likely iCloud Desktop & Documents (inferred — unverified). Treat as machine-local; it is **not** committed to this repo.
- **Contents** (top folder → wiki home):
  - `Jumpstart/` → [jumpstart-pm](../areas/softserve/jumpstart-pm.md) — ADLC framework, Express SDLC assessment checklist, Conga AI-PM + Agentic-metrics decks, anonymized SDLC status reports, Daxko metrics.
  - `Oracle/` → [oracle](../areas/softserve/oracle.md) — the partnership working set. Per-customer subfolders each with a numbered use-case scope doc: `Bosch/` (UC #3, cuOpt workforce opt), `DHL/` (UC #6, deep-research "Client Compass"), `Belron/` (UC #8, VSS visual inspection), `NHS/` (UC #9, complaints-review case assistant), `KPN/` (UC #10, CS/billing case assistant), `RiyahdAir/` (AIQ doc extraction), `SBG/` (Saudi Binladin Group — discovery-stage), `AIDP/`. Plus `General materials/` (GTM decks, accelerator-pack research), the **productization pipeline spreadsheet** (`SoftServe-NVIDIA-Productization Use cases-Pipeline_Oracle solutions — SS-work split + packaging.xlsx` — the canonical customer×use-case×pack map), the **agentic pattern taxonomy** (`AI workflow patterns - AIDP-NVIDIA-OracleAI mapping.xlsx`, mirrors the "patterns" Google Sheet), WfO one-pager + service-packages deck. Note: `Conga/` moved up to the SoftServe root.
  - `Strategy/` → area-level (added since 2026-06-16) — Product Workshop deck + agenda, "Strategic options" deck.
  - `Monthly presentation/` → area-level — "R&D GenAI Solutions Monthly Update" decks (May'26, Jun'26).
  - `Conga/`, `Meta/` → area-level / misc (Conga enablement materials; screenshots).
- **Added:** 2026-06-16 (contents refreshed 2026-07-10)
