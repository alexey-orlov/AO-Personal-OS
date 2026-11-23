# 7 · Two-pager build and filing

**Build**
- Use the durable kit in OneDrive (`Current offerings/one-pager-build/`), never a scratchpad copy. Run one command per Bash call:
  `python3 "<kit>/build3.py" "<kit>/hw.json" --account "<kit>/accounts/<slug>.json" --out "<scratch>/<slug>"`
- Use `bio.json` for a bio account.

**Pass or fail**
- The build prints a QA line, then may stop on a missing `pypdf`. The PDF is still written.
- A pass needs both:
  - `pdfinfo` shows 2 pages;
  - the QA line says `page 2 ends at` 297 mm or less.
- Page 2 stretches to fill its sheet. Never add filler.

**When it overruns**
- Cut words, never type size or margins.
- Render page 2 (`pdftoppm -r 80 -png -f 2 -l 2 <pdf> <scratch>/<slug>/p`) and find the rows that wrap onto an extra line.
- Cuts that worked:
  - a one-line headcount row;
  - "Sr" titles;
  - one signal instead of two;
  - dropping a weak clause.
- Never drop a fact the row depends on. Rebuild after each cut.

**Look before filing**
- Every row reads cold.
- Links show as captions.
- Champions are grey.
- Nothing is cut off.

**File**
- Copy the PDF to `Current offerings/AI Jumpstart for <offer>/Account two-pagers/AI Jumpstart for <offer> - Sales two-pager - internal - <Account>.pdf`.

**Provenance**
- Add a kit `PROVENANCE.md` row only for page-2 wording from outside the tracker: an account history, a call, Alex's message. See BlackBerry's row of 19 Nov.

**Several accounts**
- Send Alex one contact sheet of every page 2, plus one or two full PDFs.

**Keep the research**
- Copy the research and verification JSON to `one-pager-build/research/<slug>/`.
