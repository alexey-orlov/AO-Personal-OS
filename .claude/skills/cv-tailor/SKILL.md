---
name: cv-tailor
description: Fine-tune Alex's master CV to a specific job description, conservatively and without breaking the layout. Produces a tailored .docx + .pdf in the Google Drive "Custom CVs" folder. Use whenever Alex shares a JD (URL or pasted text) and wants a version of his CV aimed at that role — triggers like "tailor my CV to this job", "customize my resume for this JD", "make a CV for this role/company", "fine-tune my CV for <link>", or the /cv-tailor command. Emphasis-shifting of TRUE facts only (reorder skills/tags, re-point the summary, re-phrase bullets in the role's vocabulary) — never fabrication, never a layout-breaking rewrite, and it is fine to change little or nothing when the base already fits.
disable-model-invocation: false
user-invocable: true
---

# cv-tailor — conservative JD-tailoring of the master CV

Tailor Alex's master CV to one job description and deliver a `.docx` + `.pdf` to the Drive
**Custom CVs** folder. The whole philosophy: **surgical emphasis-shifts of true facts, pixel-perfect
layout preserved, never over-tailored.** Doing very little — or nothing — is a valid, often correct
outcome. Over-tailoring is the bigger risk than under-tailoring.

**Read both references before doing anything else:**
- `references/best-practices.md` — the doctrine + the 1-10 scoring rubric (A–E).
- `references/cv-inventory.md` — Alex's defensible facts, voice markers, the exact editable zones,
  the run-level editing recipe, and positioning constraints.

All plumbing is in `scripts/cvtools.sh` (unpack / repack / pdf / render / pages / compare). The
master→pdf round-trip is byte-faithful, so the pixel-diff is a trustworthy layout gate.

## Inputs
A JD as a **URL** or **pasted text**. Optionally a target-title hint. Nothing else is needed —
never ask Alex for his contact details, links, or facts; they live in the master CV and the inventory.

## Procedure

### 0. Preflight
Run `bash .claude/skills/cv-tailor/scripts/cvtools.sh doctor`. If `STATUS: NOT READY`, stop and tell
Alex exactly what's missing (the doctor prints install hints: `brew install libreoffice poppler
imagemagick`, `pip3 install defusedxml lxml`). Do not proceed without all green.

### 1. Get the JD
- URL → `WebFetch` with a prompt that extracts: company, role title, seniority, the full
  responsibilities + requirements, and the domain/keyword vocabulary the JD uses.
- If WebFetch returns thin/blocked content (common on Greenhouse/Workday/LinkedIn-gated ATS), fall
  back to the Claude-in-Chrome MCP (`navigate` → `get_page_text`). If still blocked, ask Alex to
  paste the JD text. Pasted text → use directly.
- Record **Company** and **Role** for the output filename.

### 2. Set up the workspace (fresh master every run)
Work in `WORK="${TMPDIR:-/tmp}/cv-tailor/runs/<company-role-slug>"`; `mkdir -p "$WORK"`.
- **Download the master** via a `general-purpose` subagent (keeps the base64 out of your context).
  Instruct it: call `mcp__a6cbcfee-0a3c-4f9a-8e9e-eeecc78dc903__download_file_content` with fileId
  `16ZB7bDnjzpmpE0wnU9wq6pSOu1aS0c60` (no exportMimeType — it's already .docx), base64-decode to
  `$WORK/master.docx`, and report size + `file` type. Verify it's ~500KB and a valid docx.
- **Baseline:** `cvtools.sh build "$WORK/master.docx" "$WORK/baseline"` → note `PAGES=` (the page
  count to preserve, currently 3) and the `baseline/master_page-*.png` images.
- **Unpack:** `cvtools.sh unpack "$WORK/master.docx" "$WORK/unpacked"`.

### 3. Analyze & plan (lead with the answer; bias to minimal)
From the JD, extract: the role's **mandate** (what this hire is really for — scale / 0→1 / platform /
agentic-AI / GM-P&L / turnaround), the **must-have** requirements, and the **exact terms** it uses.
Map each against Alex's defensible facts (inventory). Then **walk the safe-levers checklist in
best-practices.md §2 explicitly** — for each lever (headline reorder · skills reorder · ◆-tag reorder ·
one named-true JD requirement via a length-neutral word-swap · an attempted length-neutral About
re-point), either take it or record a concrete, defensible reason to skip it. **Skipping a zero-risk
lever — especially surfacing the role's title in the headline — is the #1 way these runs miss a 10;
restraint means not forcing risky edits, not skipping free ones.** Write a short **tailoring plan**:
for each proposed change name the zone, the exact edit, and a one-line justification on three axes —
(a) it surfaces a TRUE fact, (b) it's length-neutral, (c) it's not over-tailored. **Explicitly list
what you are leaving unchanged and why.** If the base already fits well the plan may be just a few
reorders — that is a correct, high-quality outcome — but the role's mandate must still sit in the scan path.

Do not echo the JD's sentences. Mirror its *vocabulary for things Alex genuinely did*, woven into his
own phrasing. Target ~75-80% coverage of genuinely-applicable terms — never a keyword dump.

### 4. Apply edits (safest zones first)
Edit the pretty-printed XML under `$WORK/unpacked/word/document.xml` with the **Edit tool**, following
the run-level recipe in the inventory. Order: (1) reorder Skills items, (2) reorder/swap ◆-tags,
(3) re-point the About summary (length-neutral), (4) headline reorder if warranted, (5) bullets last
and only if confidently line-count-neutral. Preserve every `<w:rPr>`, `xml:space`, and smart-quote entity.

### 5. Build & verify — the layout gate (mechanical, non-negotiable)
- `cvtools.sh repack "$WORK/unpacked" "$WORK/tailored.docx"`
- `cvtools.sh build "$WORK/tailored.docx" "$WORK/out"` → read `PAGES=`.
- **Gate 1 — page count:** `PAGES` must equal the baseline's. If not, you broke the cascade →
  revert the riskiest edit (or re-do it shorter) and rebuild. Repeat until equal.
- **Gate 2 — pixel diff:** for each page `n`, `cvtools.sh compare baseline/master_page-$n.png
  out/tailored_page-$n.png "$WORK/out/diff_$n.png"` → `DIFF_PX`. Then **Read the diff images and the
  tailored page images** and confirm visually: differences are confined to the small regions you
  intentionally edited; no block shifted, no line wrapped differently elsewhere, no heading orphaned
  at a page edge, no hanging line. A pristine page should be `DIFF_PX≈0`; an edited page shows a
  localized cluster only. Any diff *outside* an edited region = unintended reflow → fix it.
- **Gate 3 — page-edge scan:** look at the bottom of every page and the top of the next for stranded
  single lines / split blocks. Hanging lines are invisible except at the boundary.

### 6. Self-score (rubric in best-practices.md) and revise
Score A (JD-alignment), B (authenticity / no over-tailoring), C (voice/differentiation), D (layout),
E (honesty). **Gate: any dimension < 9 → revise. Honesty < 10 → hard block, must fix.** Loop steps
4–6 until it clears (cap ~4 iterations; if it can't clear, deliver the safest version and say so).
Be your own adversary on B and E especially: re-read each change asking "does this read as gamed?"
and "could Alex defend this cold?".

### 7. Deliver
- Filenames: `Alex Orlov — <Company> — <Role>.docx` and `.pdf` (keep it natural; em dash ok).
- Upload **both** to the Custom CVs folder (parentId `1ykh5bp4QMf6W0lftJwVnUpAdWG6RfBdF`) via a
  `general-purpose` subagent (base64 the local files in the subagent's context, then call
  `mcp__a6cbcfee-0a3c-4f9a-8e9e-eeecc78dc903__create_file` with `base64Content`, `contentMimeType`
  = `application/vnd.openxmlformats-officedocument.wordprocessingml.document` for the docx and
  `application/pdf` for the pdf, `parentId` the folder, `disableConversionToGoogleType: true`).
  Have it return the two `webUrl`s.
- Report to Alex: the Drive links, the **change log** (every edit, zone by zone, each as a true +
  length-neutral + not-over-tailored line), what you deliberately left unchanged, the verified page
  count + per-page DIFF_PX, and the rubric scores. If you changed little or nothing, say so plainly —
  that's a feature.

## Hard rules / self-check (consult before delivering)
- **Honesty is absolute.** Every surfaced claim passes the cold-defense test. No invented metric,
  scope, title, or skill. Reorder/re-lens TRUE facts only.
- **Layout is sacred.** Same page count; pixel-diff confined to edited regions; no widows/orphans.
  Length-neutral edits only. When in doubt, do less.
- **Don't over-tailor.** No near-verbatim JD echo, no keyword stuffing, no forced phrasing, no
  AI-sameness. Absence of a buzzword beats a gamed sentence.
- **Don't erase voice.** Keep the ◆-taxonomy, sweet-spots framing, metric-anchored register, and the
  leadership through-line. Versions must read as the same person.
- **Never mention Ukraine/Kyiv**; never add location/visa claims. Preserve the master's existing
  education line as-is.
- **No repo writes.** Working files live in temp; outputs go to Drive only.
- A run that concludes "minimal or no change needed" is a correct, high-quality outcome — not a failure.
