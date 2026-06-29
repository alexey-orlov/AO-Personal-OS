# Implementation Plan: clockify-panel-windows

## Overview

Build the Windows-native layer for the Clockify desktop widget: a PowerShell setup script, a PowerShell run/launcher script, a Python pywebview desktop wrapper, a Windows README, and a Hypothesis-based property test suite. All three runtime files land in `automations/clockify-panel/windows/`; tests go in a `tests/` subdirectory alongside them.

## Tasks

- [ ] 1. Create the `windows/` directory skeleton and shared inline C# credential helper
  - Create `automations/clockify-panel/windows/` directory (add a `.gitkeep` if empty initially).
  - Write the inline C# `CredRead`/`CredWrite` snippet (P/Invoke `advapi32.dll`) that will be embedded verbatim at the top of both PowerShell scripts via `Add-Type`. Define it as a here-string constant so both scripts source it identically.
  - Verify the C# snippet compiles cleanly under `Add-Type` (add a small self-test comment block).
  - _Requirements: 1.1, 1.4_

- [ ] 2. Implement `setup_windows.ps1` — API key storage and validation
  - [ ] 2.1 Implement argument parsing, `cmdkey` key storage, and Credential Manager read-back
    - Declare `param([string]$ApiKey, [switch]$SkipTaskScheduler)` at the top of the file.
    - Embed the inline C# helper via `Add-Type` (from task 1).
    - If `$ApiKey` is non-empty: run `cmdkey /add:clockify-panel /user:clockify /pass:$ApiKey`; exit with error on non-zero.
    - If `$ApiKey` is empty: call `CredRead` helper to check for existing credential; exit with error if absent.
    - _Requirements: 1.1, 1.2, 1.3, 1.5_

  - [ ] 2.2 Implement API key validation against Clockify
    - Call `Invoke-WebRequest https://api.clockify.me/api/v1/user` with the key in header `X-Api-Key`, `-TimeoutSec 10`.
    - On non-2xx: exit with message `"API key rejected — HTTP <status>"`.
    - On timeout: exit with message `"Connection to Clockify timed out"`.
    - On success: extract and print the workspace ID from the JSON response.
    - _Requirements: 2.1, 2.2, 2.3, 2.4_

  - [ ]* 2.3 Write property test for validation error output (Properties 3, 4)
    - **Property 3: Validation Error Message Contains HTTP Status** — generate random non-2xx status codes (300–599); assert the script's stderr contains the status code string.
    - **Property 4: Workspace ID Appears in Output** — generate random UUID-like workspace ID strings in mock JSON; assert stdout contains the exact ID.
    - **Validates: Requirements 2.2, 2.4**
    - File: `tests/test_setup_validation.py`

- [ ] 3. Implement `setup_windows.ps1` — project color normalisation
  - [ ] 3.1 Embed and invoke the Python color-normalisation snippet
    - Write the embedded Python here-string (stdlib `urllib` only, matching `setup.sh` logic) that reads project colors, compares to targets (`SS=#7E57C2`, `GC=#F44336`, `JS=#2196F3`, `EF=#4CAF50`), PUTs mismatches.
    - Non-fatal: warn per project on 403, missing project, or other HTTP error; log a summary count (updated / skipped / failed) after all four projects.
    - Invoke as `& $python -c $embeddedScript $apiKey $workspaceId`.
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6_

- [ ] 4. Implement `setup_windows.ps1` — Python and pip dependency checks
  - [ ] 4.1 Python version gate and pip check
    - Try `python --version`, fall back to `python3 --version`; parse major.minor; exit with error if below 3.8 or absent.
    - Check `pip --version`; exit with error if absent.
    - Store the resolved python executable path in `$pythonExe` for later steps.
    - _Requirements: 11.1, 11.2, 11.3, 11.4_

  - [ ]* 4.2 Write property test for Python version gate (Property 14)
    - **Property 14: Python Version Gate Rejects Below 3.8** — generate random `(major, minor, patch)` tuples; assert script accepts iff `major > 3 or (major == 3 and minor >= 8)`.
    - **Validates: Requirements 11.1, 11.2**
    - File: `tests/test_setup_deps.py`

  - [ ] 4.3 `pywebview` and `keyring` install check
    - Try `python -c "import pywebview"`; on failure, run `pip install pywebview`; re-check; exit with error if still fails.
    - Try `python -c "import keyring"`; on failure, run `pip install keyring`; re-check; exit with error if still fails.
    - _Requirements: 11.5, 11.6, 11.7, 11.8_

- [ ] 5. Implement `setup_windows.ps1` — file installation
  - [ ] 5.1 Create install directory and copy runtime files
    - Create `$env:LOCALAPPDATA\clockify-panel\` and `logs\` subdirectory with `New-Item -Force`.
    - Copy `server.py`, `index.html`, `desktop_windows.py`, `run_windows.ps1` from the script's own directory into the install dir using `Copy-Item`; on any failure exit with the filename and reason.
    - _Requirements: 12.1, 12.2, 12.3, 10.1, 10.2, 10.3_

  - [ ]* 5.2 Write property test for byte-identical file copy (Property 13)
    - **Property 13: Installed Files Are Byte-for-Byte Identical to Sources** — generate random file content bytes; copy via the same `Copy-Item` wrapper function used in the script; assert `sha256(installed) == sha256(source)`.
    - **Validates: Requirements 10.1, 10.2, 10.3, 12.2**
    - File: `tests/test_installation.py`

- [ ] 6. Implement `setup_windows.ps1` — Task Scheduler registration
  - [ ] 6.1 Generate Task XML and register `ClockifyPanelServer` and `ClockifyPanelDesktop` tasks
    - Build two Task XML strings inline (AtLogon trigger, current user SID, `HighestAvailable`, `MultipleInstancesPolicy=IgnoreNew`, `ExecutionTimeLimit=PT0S`, `StartWhenAvailable=true`).
    - `ClockifyPanelServer` action: `powershell.exe -NonInteractive -WindowStyle Hidden -File "%LOCALAPPDATA%\clockify-panel\run_windows.ps1"`.
    - `ClockifyPanelDesktop` action: resolved `$pythonExe desktop_windows.py` in the install dir.
    - Write each XML to a temp file (UTF-16), run `schtasks /Create /XML <tmpfile> /TN <name> /F`; delete temp file after each call; exit with error on non-zero exit code.
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.6, 12.4_

  - [ ] 6.2 Immediate task start and `-SkipTaskScheduler` guard
    - After registration, attempt `schtasks /Run /TN ClockifyPanelServer` and `schtasks /Run /TN ClockifyPanelDesktop` each with a 30-second wait; warn (don't fail) if either times out or errors.
    - Wrap the entire Task Scheduler block (6.1 + 6.2) in `if (-not $SkipTaskScheduler)`.
    - _Requirements: 4.5, 4.7_

- [ ] 7. Implement `run_windows.ps1`
  - [ ] 7.1 Credential retrieval, PORT validation, and python resolution
    - Embed the same inline C# `CredRead` helper via `Add-Type`.
    - Call `CredRead` for target `clockify-panel`; exit with descriptive error if not found.
    - Read `$env:PORT`; if unset default to `7878`; validate it is an integer in [1, 65535]; exit with error if invalid.
    - Try `python`, fall back to `python3`; exit with error if neither found.
    - _Requirements: 1.4, 1.6, 5.1, 5.2, 5.3, 5.4_

  - [ ] 7.2 Log rotation and server launch
    - Check if `$env:LOCALAPPDATA\clockify-panel\logs\panel.log` exists and exceeds 5 MB; if so, rename to `panel.log.1` (overwrite).
    - Set `$env:CLOCKIFY_API_KEY` and `$env:PORT`. Start `server.py` with `& $pythonExe "$installDir\server.py"` forwarding stdout+stderr; use `-RedirectStandardOutput`/`-RedirectStandardError` to `panel.log`, or use `Start-Process` with append-mode wrapper as designed.
    - _Requirements: 5.1, 5.2, 13.1, 13.3, 13.4_

  - [ ]* 7.3 Write property tests for PORT validation and python resolver (Properties 8, 9)
    - **Property 8: Python Resolver Prefers `python` Over `python3`** — mock PATH configurations (python only, python3 only, both, neither); assert resolver picks correctly.
    - **Property 9: PORT Validation Accepts Exactly [1, 65535]** — generate random integers over the full int32 range; assert script accepts iff 1 ≤ PORT ≤ 65535.
    - **Validates: Requirements 5.2, 5.4**
    - File: `tests/test_run_script.py`

- [ ] 8. Checkpoint — ensure scripts are coherent
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 9. Implement `desktop_windows.py` — logging, prefs, and startup skeleton
  - [ ] 9.1 Configure rotating file logger and `sys.excepthook`
    - Import all required modules: `pywebview`, `pystray`, `PIL`, `keyring`, `ctypes`, `ctypes.wintypes`, `threading`, `json`, `os`, `logging`, `logging.handlers`, `urllib.request`, `time`, `sys`.
    - Define module-level constants: `SERVER_URL`, `PREFS_PATH`, `LOG_PATH`, `DEFAULT_W`, `DEFAULT_H`, `MIN_W`, `MIN_H`, `MARGIN`, `RETRY_INTERVAL`.
    - Create log directory with `os.makedirs(..., exist_ok=True)`.
    - Configure `logging.handlers.RotatingFileHandler(LOG_PATH, maxBytes=5*1024*1024, backupCount=1, mode='a')`.
    - Replace `sys.excepthook` with a function that logs the full traceback to the handler before calling the original hook.
    - _Requirements: 13.2, 13.3, 13.4_

  - [ ]* 9.2 Write property tests for log append and rotation (Properties 15, 16, 17)
    - **Property 15: Unhandled Exceptions Appear in wrapper.log** — generate random exception types and messages; raise via the custom excepthook; assert full traceback is in the log file.
    - **Property 16: Log Append Preserves Prior Content** — write random initial content; restart the handler; assert file size ≥ original.
    - **Property 17: Log Rotation Triggers at 5 MB** — write content at/above 5 MiB threshold; assert `wrapper.log.1` exists and no `.2` exists.
    - **Validates: Requirements 13.2, 13.3, 13.4**
    - File: `tests/test_logging.py`

  - [ ] 9.3 Implement preference load/save
    - Write `load_prefs()`: read `PREFS_PATH`; on `FileNotFoundError`, `json.JSONDecodeError`, or `OSError` silently return defaults; clamp any out-of-range values (negative coords → default, size < minimum → minimum).
    - Write `save_prefs(prefs: dict)`: write `PREFS_PATH` atomically (write to `.tmp` then rename); log on failure.
    - Default values: `{"x": screen_width - DEFAULT_W - MARGIN, "y": screen_height - DEFAULT_H - MARGIN, "width": DEFAULT_W, "height": DEFAULT_H, "alwaysOnTop": True}`.
    - _Requirements: 6.4, 7.5_

  - [ ]* 9.4 Write property tests for prefs round-trip and always-on-top toggle (Properties 10, 11)
    - **Property 10: Preference Restore Round-Trip** — generate random `(x, y, width, height, alwaysOnTop)` tuples; write to file; load back; assert exact restoration (or defaults on corrupt/missing).
    - **Property 11: Always-on-Top Toggle + Persist Round-Trip** — generate random initial boolean; toggle; assert inversion is persisted and reloaded correctly.
    - **Validates: Requirements 6.4, 7.3, 7.4, 7.5, 8.3**
    - File: `tests/test_prefs.py`

- [ ] 10. Implement `desktop_windows.py` — pywebview window and startup retry
  - [ ] 10.1 Create the pywebview window with connecting placeholder
    - Write `connecting.html` inline string (dark `#1c1f26` background, animated dot, "Connecting…" text matching the design spec).
    - Call `webview.create_window(title="Clockify Panel", url=<data_uri_of_connecting_html>, frameless=True, resizable=True, min_size=(MIN_W, MIN_H), on_top=prefs["alwaysOnTop"], x=prefs["x"], y=prefs["y"], width=prefs["width"], height=prefs["height"])`.
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 9.1_

  - [ ] 10.2 Implement daemon retry thread
    - Write `retry_loop(window)`: in a `while True` loop, attempt `urllib.request.urlopen(SERVER_URL, timeout=1)`; on HTTP 200, call `window.load_url(SERVER_URL)` and break; on any exception, `time.sleep(RETRY_INTERVAL)`.
    - Start as `threading.Thread(target=retry_loop, args=(window,), daemon=True).start()` before `webview.start()`.
    - _Requirements: 6.5, 9.1, 9.2, 9.3_

  - [ ]* 10.3 Write property test for startup retry (Property 12)
    - **Property 12: Startup Retry Loads Panel After Server Becomes Available** — generate random number of failed polls (0–50) before a 200; assert `window.load_url` is called exactly once after the 200 response.
    - **Validates: Requirements 9.1, 9.2**
    - File: `tests/test_retry.py`

- [ ] 11. Implement `desktop_windows.py` — JS bridge injection and Ctrl+drag
  - [ ] 11.1 Obtain HWND and inject keyboard shortcut listener on page load
    - After the window is created, obtain `hwnd` via `ctypes.windll.user32.FindWindow(None, window.title)`.
    - Write `inject_bridge(window)`: call `window.evaluate_js(...)` with a JS snippet that adds a `keydown` listener checking `event.ctrlKey`; map Ctrl+R → `window.pywebview.api.reload()`, Ctrl+W/Ctrl+Q → `window.pywebview.api.hide()`, Ctrl+T → `window.pywebview.api.toggle_always_on_top()`. Use `event.preventDefault()` on all matched keys.
    - Bind `inject_bridge` to `window.events.loaded += inject_bridge` so it fires on every page load/navigation.
    - _Requirements: 8.1, 8.2, 8.3_

  - [ ] 11.2 Implement Ctrl+drag via JS mousedown/mousemove/mouseup bridge
    - Extend the injected JS: on `ctrlKey+mousedown`, call `window.pywebview.api.drag_start(event.offsetX, event.offsetY)`; on `mousemove` while button held, call `window.pywebview.api.drag_move(event.screenX, event.screenY)`; on `mouseup`, call `window.pywebview.api.drag_end()`.
    - Implement `Api` class: `drag_start(ox, oy)` stores offset; `drag_move(sx, sy)` calls `ctypes.windll.user32.SetWindowPos(hwnd, 0, sx - ox, sy - oy, 0, 0, 0x0001 | 0x0004)` (SWP_NOSIZE | SWP_NOZORDER); `drag_end()` clears offset and calls `save_prefs`.
    - _Requirements: 6.7_

- [ ] 12. Implement `desktop_windows.py` — Python API class and preference persistence
  - [ ] 12.1 Implement the `Api` class (pywebview JS bridge)
    - Add remaining `Api` methods: `reload()` → `window.load_url(SERVER_URL)`; `hide()` → `window.hide()`; `toggle_always_on_top()` → invert `state.always_on_top`, call `window.on_top = state.always_on_top`, call `save_prefs`, update tray checkmark.
    - Bind `window.events.moved += lambda _: save_prefs(...)` and `window.events.resized += lambda _: save_prefs(...)` to persist position/size on move and resize.
    - _Requirements: 7.3, 7.4, 7.5, 8.1, 8.2, 8.3_

- [ ] 13. Implement `desktop_windows.py` — pystray system tray icon
  - [ ] 13.1 Build 64×64 PIL tray icon image
    - Create a 64×64 `PIL.Image` with four colored quadrants: top-left violet (`#7E57C2`), top-right red (`#F44336`), bottom-left blue (`#2196F3`), bottom-right green (`#4CAF50`).
    - _Requirements: 7.1_

  - [ ] 13.2 Build tray menu and start pystray on a daemon thread
    - Define `pystray.MenuItem` items: "Show" / "Hide" (dynamic label based on `window.hidden`), "Always on Top" with `checked=lambda item: state.always_on_top`, "Center on Screen" → `window.move(center_x, center_y)`, "Reload", separator, "Quit".
    - Implement `quit_all()`: call `tray.stop()` then `webview.windows[0].destroy()`.
    - Start `pystray.Icon("clockify-panel", icon_image, menu=menu).run()` on `threading.Thread(daemon=True).start()`.
    - _Requirements: 7.1, 7.2, 7.3, 7.6, 7.8, 7.9_

  - [ ] 13.3 Wire tray "Hide on close" and double-click show
    - Suppress the default window close by binding `window.events.closed`; intercept via pywebview's `should_close=lambda: False` or `window.hide()` in the close handler to keep the tray icon alive.
    - Bind tray icon double-click to `window.show()` (or equivalent to bring window to front).
    - _Requirements: 7.7_

- [ ] 14. Checkpoint — ensure all Python components integrate
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 15. Write `README_windows.md`
  - [ ] 15.1 Create the Windows setup guide
    - Document prerequisites (Python 3.8+, pip, WebView2 Runtime).
    - Step-by-step setup: clone repo, `cd automations/clockify-panel/windows`, run `.\setup_windows.ps1 <API_KEY>`.
    - Manual run: `.\run_windows.ps1` and `python desktop_windows.py`.
    - Describe the tray icon, keyboard shortcuts (Ctrl+R/W/Q/T), Ctrl+drag.
    - Troubleshooting section: log locations, common errors (missing key, Python version, pywebview install).
    - _Requirements: (documentation; parallels macOS README)_

- [ ] 16. Final checkpoint — full test suite green
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP.
- All `tests/test_*.py` files live in `automations/clockify-panel/windows/tests/`.
- The inline C# `CredRead` helper is defined once in task 1 and copy-pasted verbatim into both `.ps1` files — keep them in sync.
- `webview.start()` must be called on the main thread; `pystray.Icon.run()` and the retry loop must be on daemon threads.
- Property tests use Hypothesis with `@settings(max_examples=100)`.
- For PowerShell-targeting properties (3, 4, 8, 9, 14), the Python tests mock external calls (cmdkey, schtasks, Clockify API) via `subprocess` with a thin shim or by extracting the pure logic into a testable Python helper function.

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1"] },
    { "id": 1, "tasks": ["2.1", "4.1", "5.1", "9.1", "9.3", "15.1"] },
    { "id": 2, "tasks": ["2.2", "2.3", "4.2", "4.3", "5.2", "9.2", "9.4"] },
    { "id": 3, "tasks": ["3.1", "6.1", "7.1", "10.1"] },
    { "id": 4, "tasks": ["6.2", "7.2", "7.3", "10.2", "11.1"] },
    { "id": 5, "tasks": ["10.3", "11.2", "12.1"] },
    { "id": 6, "tasks": ["13.1"] },
    { "id": 7, "tasks": ["13.2", "13.3"] }
  ]
}
```
