/* Test page only (make_harness.py inlines it): a stand-in "Google Sheets" connector for the app's sheet writer.
 * It holds the layout of "My training" as of 2026-11-24 (row 1 dates, column A/B names, column A merges, widths) and
 * applies the writes the page sends (appendDimension, insertDimension, updateCells) to that copy, so the page's own
 * read-back runs. window.__sheetRequests keeps every update_spreadsheet batch, to replay on a real scratch copy. */
(() => {
  const dates = ["7/20", "7/22", "7/24", "7/29", "7/31", "8/3", "8/5", "8/10", "8/12", "8/14", "8/17", "8/19", "9/14", "9/18", "9/21", "9/23",
    "9/25", "9/28", "10/2", "10/5", "10/7", "10/9", "10/12", "10/14", "10/16", "10/21", "10/23", "10/30", "11/23"].map(d => d + "/2026");
  const names = [["Category", "Excercise"], [], ["My weight"], ["Chest", "Жим лёжа"], ["", "Жим сидя"], ["", "Сведение рук"], ["", "Жим в брусьях сидя"], ["", "Жим 45° (Смитт)"],
    ["", "Жим L 45°"], ["", "Сведение рук лёжа"], ["", "Сведение рук сидя с нижнего блока"], ["Legs", "ГАКК присед"], ["", "Разгиб. голени"], ["", "Сгиб. голени"],
    ["", "Жим ногами сидя"], ["Back", "Верт. тяга"], ["", "Горизонт. тяга"], ["", "Тяга верт. одной рукой"], ["", "Пулловер с колен"], ["", "Тяга в упоре"],
    ["", "Сгиб. на бицепс"], ["Glutes", "Разгиб. бедра в упоре"], ["", "Отведение на ягодицы"], ["Shoulders", "Жим на плечи сидя"], ["", "Махи на плечи"],
    ["", "Реверс"], ["", "Протяжка к ключицам"], ["", "Жим гантелями сидя на плечи"], ["", "Жим в Hammer под углом 60°"], ["", "Махи на плечи одной рукой"],
    ["", "Жим сидя на плечи в Смитт"], ["Warm-up", "Combination (warm-up)"], ["", "Dog birds"], ["", "Бок. планка"], ["", "Бок. планка с поворотом"],
    ["", "Удержание резины"], ["", "Ягодичный мост"], ["", "Ягодичный мост на каждую ногу"], ["", "Ягодичный мост + жим гантелями"],
    ["", "Экстензия с контролем осанки"], ["", "Экстензия сидя с гантелью"], ["", "Махи блином вокруг головы"], ["", "Plank shoulders touch"],
    ["", "Планка со сменой рук"], ["", "Планка высокая"], ["Crossfit", "Combination (crossfit)"], ["", "Rounds"], ["", "Time cap / plan"], ["", "Finish time"],
    ["", "Pull-ups"], ["", "Thrusters"], ["", "Walking lunges"], ["", "Выпады"], ["", "Скакалка"], ["", "Dips"], ["", "T2B"], ["", "Hand stand push-ups"],
    ["", "Wall ball"], ["", "Push-ups"], ["", "Squats"], ["", "Sumo squats"], ["", "Burpees"], ["", "Box jumps"], ["", "Приседания с блином над головой"],
    ["", "Sit-ups"], ["", "Row"], ["", "Air bike"], ["", "Канат"], ["", "Протяжка с приседом"], ["", "Жим швунговый"], ["", "Зашагивание на тумбу"],
    ["", "Plank dumbbell drag"], ["", "JJ"]];
  const grid = names.map(r => r.slice());
  dates.forEach((d, k) => { const c = 2 + 4 * k; while (grid[0].length <= c) grid[0].push(""); grid[0][c] = d; });
  // the 11/23 block as logged (DK..DN = 114..117)
  const put = (r, vals) => { while (grid[r].length < 114) grid[r].push(""); vals.forEach((v, i) => { grid[r][114 + i] = v; }); };
  put(15, ["3", "12", "52.2", "59"]); put(16, ["3", "10-10-9", "52.2", "59"]); put(19, ["3", "12-9-8", "24.9", "31.8"]); put(20, ["3", "10-10-8", "36.3", "38.6"]);
  put(25, ["3", "8", "65.8", "68"]); put(31, ["Экстензия с контролем осанки 2x15 → Бок. планка с поворотом 2x15 → Dog birds 2x15"]); put(32, ["2", "15"]); put(34, ["2", "15"]); put(39, ["2", "15"]);
  const colA = [[0, 2], [3, 11], [11, 15], [15, 21], [21, 23], [23, 31], [31, 45], [45, 73]];
  const meta = { sheets: [{ properties: { sheetId: 0, title: "Sheet1", gridProperties: { columnCount: 118, rowCount: 1016 } },
    merges: [...colA.map(([a, b]) => ({ startRowIndex: a, endRowIndex: b, startColumnIndex: 0, endColumnIndex: 1 })), { startRowIndex: 0, endRowIndex: 2, startColumnIndex: 1, endColumnIndex: 2 }],
    data: [{ columnMetadata: [76, 143, 49, 60, 47, 57, ...Array.from({ length: 28 }, () => [45, 60, 47, 57]).flat()].map(p => ({ pixelSize: p })) }] }] };
  const fmt = v => v.userEnteredValue == null ? "" : "numberValue" in v.userEnteredValue ? String(v.userEnteredValue.numberValue) : String(v.userEnteredValue.stringValue);
  const serialToDate = n => { const d = new Date(Date.UTC(1899, 11, 30) + n * 864e5); return `${d.getUTCMonth() + 1}/${d.getUTCDate()}/${d.getUTCFullYear()}`; };
  const toMMSS = n => { const s = Math.round(n * 86400); return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`; };
  window.__sheetRequests = [];
  window.__sheetGrid = grid;
  window.__sheetMeta = meta;
  window.__sheetMcp = {
    async callTool(server, tool, input) {
      if (server !== "Google Sheets") throw { code: "server_not_connected" };
      if (tool === "get_spreadsheet") return { payload: { content: JSON.parse(JSON.stringify(meta)) } };
      if (tool === "get_values") return { payload: { range: input.range, values: JSON.parse(JSON.stringify(grid)) } };
      if (tool === "update_spreadsheet") {
        window.__sheetRequests.push(JSON.parse(JSON.stringify(input.requests)));
        for (const q of input.requests) {
          if (q.insertDimension && q.insertDimension.range.dimension === "ROWS") grid.splice(q.insertDimension.range.startIndex, 0, []);
          if (q.appendDimension) meta.sheets[0].properties.gridProperties.columnCount += q.appendDimension.length;
          if (q.updateCells) { const { rowIndex: r, columnIndex: c } = q.updateCells.start;
            q.updateCells.rows[0].values.forEach((v, i) => { while (grid.length <= r) grid.push([]); const row = grid[r]; while (row.length <= c + i) row.push("");
              let s = fmt(v); if (r === 0 && c >= 2 && v.userEnteredValue && "numberValue" in v.userEnteredValue) s = serialToDate(v.userEnteredValue.numberValue);
              if (grid[r][1] === "Finish time" && v.userEnteredValue && "numberValue" in v.userEnteredValue && v.userEnteredValue.numberValue < 1) s = toMMSS(v.userEnteredValue.numberValue);
              row[c + i] = s; }); }
        }
        return { payload: { replies: [] } };
      }
      throw { code: "bad_request", message: tool };
    },
  };
})();
