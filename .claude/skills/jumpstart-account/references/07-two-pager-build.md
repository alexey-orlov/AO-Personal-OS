# 7 · Two-pager build and filing

**Build from the durable kit in OneDrive**
- Use the kit at `Current offerings/one-pager-build/`, never a scratchpad copy: macOS deleted one mid-project.
- One command per Bash call:
  `python3 "<kit>/build3.py" "<kit>/hw.json" --account "<kit>/accounts/<slug>.json" --out "<scratch>/<slug>"`
- Use `bio.json` for a bio account.

**Read the result**
- The build prints a words line and a QA line, then may stop on a missing `pypdf`. The PDF is still written.
- A pass needs both:
  - `pdfinfo <pdf>` shows `Pages: 2`;
  - the QA line says `page 2 ends at` 297 mm or less.
- Page 2 stretches to fill its sheet. Never add filler to it.

**When page 2 overruns**
- Cut words, never type size or margins.
- Find the rows that wrap onto an extra line: render page 2 with `pdftoppm -r 80 -png -f 2 -l 2 <pdf> <scratch>/<slug>/p` and look at it.
- Things that worked before:
  - a headcount row of one line;
  - shorter champion titles ("Sr Director");
  - one signal instead of two;
  - dropping a weak clause.
- Never drop a fact the row depends on. Rebuild after each cut.

**Look at the page yourself before filing it**
- Every row reads cold.
- Links show as captions.
- Champions are grey.
- No row is cut off.

**File it**
- Copy the PDF to `Current offerings/AI Jumpstart for <Hardware & Embedded R&D | Biological R&D>/Account two-pagers/`.
- Name it `AI Jumpstart for <offer> - Sales two-pager - internal - <Account>.pdf`.
- Replacing a file: the account file read in stage 6 already carries Alex's edits, so the rebuild keeps them.

**Provenance**
- Add a row to the kit's `PROVENANCE.md` only for page-2 wording that comes from outside the tracker: an account history, a call, Alex's message. See BlackBerry's row from 19 Nov.
- Wording taken from the tracker needs no row.

**Several accounts**
- Build them all.
- Send Alex one contact sheet of every page 2 (`SendUserFile`), plus one or two full two-pagers.

**Keep the research**
- Copy the account's research and verification JSON to `one-pager-build/research/<slug>/`, so a later re-check starts from it.
