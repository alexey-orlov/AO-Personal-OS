# Family / household instructions

These are how-to sheets that Alex prints or sends to relatives: Starlink, power stations, the Echo Show
cameras and calls. Readers are not technical and read Russian. Pointed to from root `CLAUDE.md`.

## House style
The reference is «Пароли и инструкции.docx» in Alex's Google Drive (it holds passwords; look at its layout only, never copy its content).
- A navy bar for each section: «N  Title · short subtitle». Under it, numbered steps written as
  «N.M **Lead.** action». Labels shown on screen are in bold (navy). Menu paths use «→».
- Every photo gets a caption tied to its step: «N.M · what it shows». The footer reads
  «Title · стр. X из Y».
- The whole sheet fits on **two A4 pages**. No section is split across a page break: the builder sets
  cantSplit and keepNext, and a whole section starts a new page when it does not fit.
- Round on-screen buttons (menu, settings, end call) are cut from the photos and placed inline in the
  step text.
- Alex is «Леша». Any step that needs one of his accounts begins with «Позвонить Леше», because only he
  has access to those accounts.

## Pocket cards for a phone case (2026-11-18, «Интернет в роуминге», Samsung A20)
- When the sheet has to live in a phone case, use cards of **68 × 98 mm**, eight on one A4 landscape
  sheet (4 × 2 grid, dashed cut lines, printed at 100 %). That size fits behind a Samsung A20
  (158.4 × 74.7 mm) below the camera and the rear fingerprint sensor, and inside a book-case flap.
- One topic per card: navy bar, steps, then full-screen screenshots 20–25 mm wide with captions.
  Body 9 pt Calibri; footer «Title · стр. X из 8». The first card holds the check, the map of steps
  and the last resort (the operator's support line).
- Word adds a cell's bottom margin on top of an exact row height (measured: +1.8 mm per row). Keep the
  bottom cell margin at 0 and leave the gap inside the card, then measure the cut lines on a 300 dpi
  render: rows must come out at 98.0 mm.

## Pictograms and step schemes (2026-11-18, «В аэропорту»)
- A sequence of places (вылет, пересадка, прилет) is a chain: one card per chain, 4–5 steps
  «N.M **Lead.** action», a pictogram beside each step and a blue arrow down to the next. Words as
  printed on signs are bold navy.
- A word list is EN over RU beside the sign's pictogram, ten rows per card. Words from a board or a
  boarding pass go under a drawn board or pass: real English, red rounded boxes on what to read, and the
  same flight, gate and times on both pictures.
- Pictograms are white shapes on a navy (1F3864) rounded square, the colour of the bars. No icon set is
  installed on KN7X2Y65NX: draw them as SVG and render them with headless Chrome, using its own
  `--user-data-dir` in the scratchpad; `--allow-file-access-from-files` lets the page load Calibri from
  Word's `DFonts` folder.

## Photos of screens (Alex, 2026-11-15)
- **Show the full screen. Never crop to a detail.** The reader finds the button by its place on the
  whole screen.
- **Remove reflections.** Flattening the photo and adjusting its contrast is not enough. Rebuild the
  screen instead: use clean fills for the background and the panels (a lower envelope of the photo,
  which ignores glare that adds light), and lift the text and icons from the photo inside listed boxes.
  Check the result against the photo, box by box.
- Use only red marks: rounded boxes around what to tap, and an arrow with a dot at its start for a swipe.
- Take every on-screen label from the photos of the relative's own phone, never from general knowledge of
  the menus. Samsung renames items between One UI versions: on mom's phone (One UI 7) it is «Данные в
  роуминге», not «Роуминг данных», and the network mode is «Приоритет LTE» (2026-11-18).
- A screen Alex did not photograph is drawn in the same look: clean page, cards and switches; the status
  bar, back arrow and navigation bar re-inked from a rebuilt photo of the same phone; the layout from
  Samsung's own support screenshot and the labels from samsung.com/ru. The delivery note says which
  screens are drawn.

## Checking
Render the file through Word to PDF (see `document-rendering.md`) and look at every page, then at 200 dpi
around each photo, before delivering it.
