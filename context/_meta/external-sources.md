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
| [civitta](../areas/civitta/README.md) (+ the Laba/PrivatBank course decks) | gdrive | Teaching-materials folder `1N6zCtx5VWja5vtT89seShWrOcsi1azK-`; GBSW 2026 folder `18Hx32ZlQpab6UGwpbr1WjBStkKbNclMa` | - (Google Drive MCP) | 2026-09-07 |

## Entries

### softserve — `~/Library/CloudStorage/OneDrive-SoftServe,Inc` (OneDrive root)
- **Type:** `local + onedrive` — the **SoftServe-tenant OneDrive**. The *entire* OneDrive is SoftServe context; treat the **root as the master directory for all SoftServe local files**. Synced to disk on this Mac AND reachable via the `ms365` MCP off-machine.
- **Location (local, primary):** `~/Library/CloudStorage/OneDrive-SoftServe,Inc` (resolves to `/Users/olekorlov/Library/CloudStorage/OneDrive-SoftServe,Inc` on this Mac). Convenience symlink alias: `~/OneDrive - SoftServe, Inc` → the same folder.
- **Off-machine access:** reachable through the `ms365` MCP (Microsoft Graph / OneDrive, SoftServe tenant) — so unlike the old iCloud-Documents path, cloud routines and other devices CAN read these files (resolve items by path or `search-onedrive-files`). The `ms365` server must be authenticated first (`/mcp` or `claude mcp`); it is **not** logged in by default.
- **Machine scope:** the local path resolves on this Mac (ComputerName `KN7X2Y65NX`) and any device with this OneDrive account mounted; the `ms365` route is machine-independent.
- **Gotcha — a file Alex just dropped into OneDrive can be a partial upload:** it shows its full size in `ls` but is a truncated zip (no central directory → `zipfile`/`unzip` fail). Check `~/Downloads/` for the complete original before assuming corruption (2026-09-02: `Presales/Toyota Oracle.pptx` was 133 MB truncated on OneDrive vs the intact 270 MB copy in Downloads). `zip -FF` repair is slow and unnecessary when the Downloads copy exists.
- **Backed up:** yes — OneDrive cloud sync (SoftServe tenant). Not committed to this repo.
- **Contents** (top folder → wiki home):
  - `Projects/Oracle/` → [oracle](../areas/softserve/oracle.md) — the partnership working set. **Reorganized ~2026-09-10 into `Customers/` + `Packs/`** (paths recorded before that date are stale):
    - `Projects/Oracle/Customers/<name>/` — per-customer working sets: `Belron/`, `Bosch/`, `DHL/` (the `UC #6 DHL Client Compass` SoW), `KPN/`, `NATO/` (→ [oracle-defense](../areas/softserve/oracle-defense.md)), `NHS/`, `RiyahdAir/`, `SBG/` (→ [sbg-poc](../areas/softserve/sbg-poc.md) — the `UC #5.1 …` SOW + the `SBG_AI-Q_PoC_WBS_…` workbook). `AIDP/` still sits at the `Projects/Oracle/` root.
    - `Projects/Oracle/Packs/` → [oracle-packs](../areas/softserve/oracle-packs.md) — the productization stream: `Oracle packages.xlsx` (the packaging tracker), `Workforce optimization package/`, `Large Document Extraction and review package/`, `Account Insights/` (the AI Signal-Impact Engine one-pager), `AI Lakehouse quick start/`, and `Use case maps/` (the **productization pipeline spreadsheet** `SoftServe-NVIDIA-Productization Use cases-Pipeline…xlsx` + the **agentic pattern taxonomy** `AI workflow patterns - AIDP-NVIDIA-OracleAI mapping.xlsx` — v2 tab, red-team report and row-writer prompt added 2026-09-07).
    - `General/` (GTM deck, partnership-vision drafts, the EMEA Business Alignment deck + its use-case-map v2 copy); `Presentation.pptx`.
  - `Projects/Jumpstart/` → [jumpstart-pm](../areas/softserve/jumpstart-pm.md) — the OFFERING-DESIGN working set: ADLC framework, Express SDLC assessment checklist, Conga AI-PM + Agentic-metrics decks, the AI PM Jumpstart / Jumpstart Express / **Light** program outlines (v1 + v2, `.html`/`.pdf`/`.pptx`/`.docx`) + the Light deck-handoff prompt and the Payworks pre-program checklist `.xlsx`, anonymized SDLC status reports, Daxko metrics.
  - `Projects/Payworks AIPM Jumpstart/` → [payworks-jumpstart](../areas/softserve/payworks-jumpstart.md) — the Payworks DELIVERY working set: the Session-1 client deck (`AI PM Jumpstart - Session 1 deck - Payworks 2026-08-12.pptx`/`.pdf`), the demo-repo upgrade spec `SPEC-demo-repo-upgrades-2026-08-11.md`, both Team OS demo repos (`SoftServe-Work-OS-main (with mock data)` / `(without mock data)`), and client-supplied material (`payworks-files/` + `.zip`).
  - `Projects/R&D Products strategy/` → area-level (was the old `Strategy/`) — "Strategic options" deck, product-management / product-strategy workshop files, `Workshop/`.
  - `Projects/Conga - AI-powered Product Management/`, `Projects/Meta/` → area-level / misc (Conga enablement materials; screenshots).
  - `Presentation templates/` (OneDrive **root**, NOT under `Projects/` — path corrected 2026-08-20 after a failed lookup) → the SoftServe-brand deck templates; canonical pick: `BEST_TEMPLATE_Oracle SoftServe EMEA Business Alignment July 2026.pptx` (base for the partnership-vision + WfO decks). Agent build kit + stripped 41 KB base: `.claude/references/softserve-deck-kit.md`.
  - Root-level context beyond `Projects/`: `Meetings/`, `Recordings/`, `Hiring/`, `Monthly AI products overviews/`, `Productization - General/` (`Customer projects.xlsx`), `Attachments/`, Teams / Copilot chat files, `Agentic Engineering.xlsx`.
- **Added:** 2026-06-16 (moved from the now-obsolete `~/Documents/Documents/SoftServe` to this OneDrive root on 2026-07-21)

### civitta — Alex's teaching-materials folder in Google Drive (gdrive root)
- **Type:** `gdrive` — Alex's personal Google Drive, reachable through the Google Drive MCP (`search_files` with `parentId`, `read_file_content`; Google Slides files come back slide-by-slide between `-----` markers). Also the source root for the Laba and PrivatBank course decks, so the [laba](../areas/laba/README.md) area reads from here too.
- **Location:** folder id `1N6zCtx5VWja5vtT89seShWrOcsi1azK-` (`https://drive.google.com/drive/folders/1N6zCtx5VWja5vtT89seShWrOcsi1azK-`).
- **Machine scope:** - (cloud; no local Google Drive sync on this Mac).
- **Backed up:** Google Drive.
- **Contents** (top folder → wiki home):
  - `Civitta GBSW 2026 - Market positioning & value proposition/` (`18Hx32ZlQpab6UGwpbr1WjBStkKbNclMa`) → [gbsw-2026](../areas/civitta/gbsw-2026.md) — the assembled source-slides pack (Google Slides).
  - `Challenger 3.0_Alex Orlov_Product management - startup challenges.pdf` + the Google Slides original "Product managementL startup challenges" (My Drive root, `135ioMdYH261mcX0-y8uNcDAd0Ypvp4-V1kuriPcKObw`) → [civitta](../areas/civitta/README.md) — the EN accelerator deck (used for Challenger AI 2.0 and 3.0).
  - `PB - Контент - Product management/` (`1chWxhfhwb8XTiz8OEebQAeX8vEu5P3n5`) → [laba](../areas/laba/README.md) — PrivatBank corporate PM course 2024-25: `Заняття 1..22` Google Slides, `Product management / Lectures / PDFs/`, `PB PM Course/` (offer, program + homework sheet, lecture outlines).
  - `Laba - Контент - Product management/` (`18kszvy1yCrpTT-qz71nhp7TUqekTWq-_`) → [laba](../areas/laba/README.md) — Laba PM course: `Презентації - Product management/` (`Заняття 1..17` Google Slides 2024 + 2023 `.pptx`), homework and practice folders, content plan xlsx.
  - `Lections structure/`, `Samples/`, `New requests/`, `AOrlov - Product management - Програма курсу` (sheet) — course design working files.
- **Added:** 2026-09-07 (discovered while assembling the GBSW pack; confirm with Alex if a different root is canonical).
