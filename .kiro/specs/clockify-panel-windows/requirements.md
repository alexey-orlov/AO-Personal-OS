# Requirements Document

## Introduction

This feature delivers a Windows-native equivalent of the existing macOS Clockify time-tracking desktop widget. The widget is a lightweight, always-on-top floating panel with four project buttons (SS, GC, JS, EF) that mirror live Clockify state and allow one-click start/stop/switch of time entries. The shared cross-platform components (`server.py` and `index.html`) are reused without modification. What needs to be built is the Windows-specific layer: secure API key storage using Windows Credential Manager, auto-start at login via Windows Task Scheduler, PowerShell scripts for setup and launch, and a native floating desktop wrapper using Python + pywebview (a frameless, always-on-top WebView2-backed window with a system-tray icon).

The result is feature parity with the Mac widget: same UI, same behavior, same server — just Windows-native plumbing instead of macOS Keychain, launchd, and Swift/WKWebView.

## Glossary

- **Panel_Server**: The existing `server.py` Python HTTP server running on `127.0.0.1:7878`, shared between Mac and Windows without modification.
- **Panel_UI**: The existing `index.html` single-page interface, shared between Mac and Windows without modification.
- **Desktop_Wrapper**: The new Windows-native floating window application (`desktop_windows.py`) that wraps `http://localhost:7878` using `pywebview`.
- **Setup_Script**: The new `setup_windows.ps1` PowerShell script that stores the API key, validates it, installs the Task Scheduler task, and optionally sets project colors.
- **Run_Script**: The new `run_windows.ps1` PowerShell script that reads the API key from Credential Manager and launches the Panel_Server.
- **Credential_Manager**: Windows Credential Manager (accessed via `cmdkey.exe` and the `win32credential` or `keyring` Python library), used to store the Clockify API key securely.
- **Task_Scheduler**: Windows Task Scheduler (`schtasks.exe`) used to auto-start the Panel_Server and Desktop_Wrapper at user login.
- **System_Tray**: The Windows notification area (system tray), where the Desktop_Wrapper places its icon for window management controls.
- **pywebview**: A Python library that wraps a native OS WebView (WebView2 on Windows) to display web content in a native window.
- **WebView2**: The Microsoft Edge-based web rendering engine used by `pywebview` on Windows.
- **Clockify_API**: The Clockify REST API at `https://api.clockify.me/api/v1`.
- **CLOCKIFY_API_KEY**: The user's personal Clockify API key, stored in Credential_Manager under the target name `clockify-panel`.

---

## Requirements

### Requirement 1: Secure API Key Storage

**User Story:** As a user setting up the widget on Windows, I want my Clockify API key stored securely in Windows Credential Manager, so that the key is never written to disk as plain text or committed to the repository.

#### Acceptance Criteria

1. WHEN the Setup_Script is invoked with a Clockify API key argument, THE Setup_Script SHALL store the key in Credential_Manager under the target name `clockify-panel` using `cmdkey.exe`.
2. WHEN the Setup_Script is invoked without an argument and a key is already present in Credential_Manager, THE Setup_Script SHALL read the existing key and proceed silently without any notification to the user.
3. IF no API key is found in Credential_Manager and none is provided as an argument, THEN THE Setup_Script SHALL exit with a descriptive error message instructing the user to run `setup_windows.ps1 <API_KEY>`.
4. WHEN the Run_Script starts the Panel_Server, THE Run_Script SHALL read the API key from Credential_Manager and export it as the `CLOCKIFY_API_KEY` environment variable for the server process.
5. THE Setup_Script SHALL NOT write the API key to any file on disk (no plain-text config file, no `.env` file).

---

### Requirement 2: API Key Validation

**User Story:** As a user running setup, I want the setup script to validate my API key against Clockify before completing, so that I discover configuration errors immediately rather than at runtime.

#### Acceptance Criteria

1. WHEN the Setup_Script has obtained an API key, THE Setup_Script SHALL call `GET https://api.clockify.me/api/v1/user` with the key.
2. IF the Clockify API returns a non-2xx response, THEN THE Setup_Script SHALL exit with an error message stating the key was rejected. WHEN the API call succeeds, THE Setup_Script SHALL NOT display any error messages related to the validation step.
3. WHEN the API call succeeds, THE Setup_Script SHALL extract and display the active workspace ID to confirm identity.

---

### Requirement 3: Project Color Normalisation

**User Story:** As a user running setup, I want the four project colors in Clockify set to their canonical values (SS violet, GC red, JS blue, EF green), so that the buttons display consistent, distinguishable colors.

#### Acceptance Criteria

1. WHEN the Setup_Script successfully validates the API key, THE Setup_Script SHALL attempt to set project colors: SS to `#7E57C2`, GC to `#F44336`, JS to `#2196F3`, EF to `#4CAF50`.
2. IF a project is not found in the workspace, THEN THE Setup_Script SHALL log a warning for that project and continue with the remaining projects.
3. IF the Clockify API returns HTTP 403 when updating a project color, THEN THE Setup_Script SHALL log a non-fatal warning instructing the user to change the color manually in the Clockify web UI, and continue.
4. IF a project color already matches the target value, THEN THE Setup_Script SHALL skip the update for that project and log that it is already correct.
5. IF a project color update fails for any reason (network error, unexpected HTTP status, etc.), THEN THE Setup_Script SHALL log a warning for that failure and continue processing the remaining projects.

---

### Requirement 4: Auto-Start at Login via Task Scheduler

**User Story:** As a user who wants the widget always available, I want both the Panel_Server and the Desktop_Wrapper to start automatically when I log in to Windows, so that the widget is ready without any manual action.

#### Acceptance Criteria

1. WHEN the Setup_Script completes successfully, THE Setup_Script SHALL register two Task Scheduler tasks: `ClockifyPanelServer` (runs `run_windows.ps1` to start Panel_Server) and `ClockifyPanelDesktop` (runs `desktop_windows.py` to start Desktop_Wrapper).
2. THE Task Scheduler tasks SHALL be configured with trigger `AtLogon` scoped to the current user.
3. THE Task Scheduler tasks SHALL be configured to run with the highest available privilege for the current user's account.
4. WHEN the Setup_Script is run again, THE Setup_Script SHALL overwrite existing tasks of the same name (idempotent).
5. WHEN the Setup_Script registers the tasks, THE Setup_Script SHALL also start both tasks immediately without requiring a logout/login cycle.
6. THE Setup_Script SHALL accept a `–SkipTaskScheduler` switch to register the key and validate without installing the scheduled tasks (for users who prefer manual launch).

---

### Requirement 5: Run Script

**User Story:** As a user or developer, I want a PowerShell script that starts the Panel_Server manually in the foreground, so that I can test the server without relying on Task Scheduler.

#### Acceptance Criteria

1. WHEN `run_windows.ps1` is executed, THE Run_Script SHALL read the `CLOCKIFY_API_KEY` from Credential_Manager and set it as an environment variable for the child process.
2. WHEN the key is retrieved, THE Run_Script SHALL start `server.py` using the system `python` (or `python3`) executable and forward all output to the console.
3. IF no API key is found in Credential_Manager, THEN THE Run_Script SHALL exit with a descriptive error before attempting to start the server.
4. THE Run_Script SHALL support an optional `PORT` environment variable override, passing it to the server process (default `7878`).

---

### Requirement 6: Desktop Wrapper — Floating Window

**User Story:** As a daily user, I want the widget to appear as a frameless, always-on-top floating window on my desktop, so that the panel is always visible and accessible while I work.

#### Acceptance Criteria

1. WHEN the Desktop_Wrapper launches, THE Desktop_Wrapper SHALL open a frameless window loading `http://localhost:7878`.
2. THE Desktop_Wrapper SHALL display the window as always-on-top by default.
3. THE Desktop_Wrapper window SHALL be resizable by dragging its edges or corners.
4. THE Desktop_Wrapper window SHALL persist its position and size across restarts using a local preferences file.
5. WHEN the Panel_Server is not yet reachable at startup, THE Desktop_Wrapper SHALL retry loading `http://localhost:7878` every 2 seconds until it succeeds, so that login start order does not matter.
6. THE Desktop_Wrapper window SHALL have rounded corners to match the panel's visual style.
7. THE Desktop_Wrapper SHALL support moving the window by holding a modifier key (Ctrl) and left-click-dragging anywhere in the window.

---

### Requirement 7: Desktop Wrapper — System Tray Icon

**User Story:** As a user with a no-taskbar-button widget, I want a system tray icon I can right-click for window controls, so that I can show/hide, toggle always-on-top, center, reload, or quit without needing the window visible.

#### Acceptance Criteria

1. WHEN the Desktop_Wrapper launches, THE Desktop_Wrapper SHALL place an icon in the Windows system tray.
2. WHEN the user right-clicks the tray icon, THE Desktop_Wrapper SHALL display a context menu with these items: **Show / Hide** (toggles window visibility), **Always on Top** (checkmark, toggles), **Center on Screen**, **Reload**, a separator, and **Quit**.
3. WHEN **Always on Top** is toggled off, THE Desktop_Wrapper SHALL lower the window to normal Z-order so it sits among other windows.
4. WHEN **Always on Top** is toggled on, THE Desktop_Wrapper SHALL raise the window above all other windows.
5. THE Desktop_Wrapper SHALL persist the Always-on-Top state across restarts.
6. WHEN the user double-clicks the tray icon, THE Desktop_Wrapper SHALL show the window and bring it to the foreground.
7. WHEN the window is closed via the OS close button (if any), THE Desktop_Wrapper SHALL hide the window rather than quitting, keeping the tray icon active.
8. WHEN **Quit** is selected from the tray menu, THE Desktop_Wrapper SHALL terminate the process completely.

---

### Requirement 8: Desktop Wrapper — Keyboard Shortcuts

**User Story:** As a keyboard-oriented user, I want keyboard shortcuts for common window actions when the panel has focus, so that I can control the widget without touching the tray icon.

#### Acceptance Criteria

1. WHEN the Desktop_Wrapper window has focus and the user presses `Ctrl+R`, THE Desktop_Wrapper SHALL reload `http://localhost:7878`.
2. WHEN the Desktop_Wrapper window has focus and the user presses `Ctrl+W` or `Ctrl+Q`, THE Desktop_Wrapper SHALL hide the window (equivalent to "Hide" from the tray menu).
3. WHEN the Desktop_Wrapper window has focus and the user presses `Ctrl+T`, THE Desktop_Wrapper SHALL toggle the Always-on-Top state.

---

### Requirement 9: Desktop Wrapper — Startup Retry and Server Dependency

**User Story:** As a user who starts the widget at login alongside the server, I want the Desktop_Wrapper to keep retrying until the server is available, so that I don't need to control startup order.

#### Acceptance Criteria

1. WHEN the Desktop_Wrapper first loads `http://localhost:7878` and the connection is refused, THE Desktop_Wrapper SHALL display a "Connecting…" placeholder and retry every 2 seconds.
2. WHEN the Panel_Server becomes reachable after a retry, THE Desktop_Wrapper SHALL load the panel UI automatically without user intervention.
3. THE retry loop SHALL continue indefinitely until either the server responds or the Desktop_Wrapper is quit.

---

### Requirement 10: Shared Components Remain Unchanged

**User Story:** As a developer maintaining both Mac and Windows versions, I want `server.py` and `index.html` to remain unmodified, so that fixes and features apply to both platforms simultaneously.

#### Acceptance Criteria

1. THE Windows implementation SHALL NOT modify `server.py`.
2. THE Windows implementation SHALL NOT modify `index.html`.
3. THE Windows implementation SHALL source `server.py` and `index.html` from the same directory as the Mac version (`automations/clockify-panel/`).

---

### Requirement 11: Python and Dependency Setup

**User Story:** As a new user installing the widget, I want the setup script to check for required Python dependencies and install them if missing, so that the widget works out of the box without manual pip commands.

#### Acceptance Criteria

1. WHEN the Setup_Script runs, THE Setup_Script SHALL verify that Python 3.8 or later is available on `PATH`.
2. IF Python is not found, THEN THE Setup_Script SHALL exit with an error message instructing the user to install Python from `python.org` and re-run.
3. WHEN Python is confirmed available, THE Setup_Script SHALL verify that `pywebview` is installed.
4. IF `pywebview` is not installed, THEN THE Setup_Script SHALL install it via `pip install pywebview` and confirm success before continuing.
5. WHEN the Setup_Script runs, THE Setup_Script SHALL verify that `keyring` is installed (used for Credential_Manager access from Python).
6. IF `keyring` is not installed, THEN THE Setup_Script SHALL install it via `pip install keyring` and confirm success before continuing.

---

### Requirement 12: Installation Directory

**User Story:** As a Windows user, I want the runtime files installed to a standard user-writable location, so that the Task Scheduler tasks can launch the widget without UAC elevation.

#### Acceptance Criteria

1. WHEN the Setup_Script installs the runtime copy, THE Setup_Script SHALL copy `server.py`, `index.html`, `desktop_windows.py`, and `run_windows.ps1` to `%LOCALAPPDATA%\clockify-panel\`.
2. WHEN files are already present in the install directory, THE Setup_Script SHALL overwrite them (idempotent).
3. THE Task Scheduler tasks SHALL reference the installed copies in `%LOCALAPPDATA%\clockify-panel\`, not the repo path, so that the repo directory can be on a network share or moved.

---

### Requirement 13: Logging

**User Story:** As a user troubleshooting the widget, I want server and wrapper logs written to a predictable location, so that I can diagnose startup or API errors without hunting for log output.

#### Acceptance Criteria

1. WHEN the Panel_Server is started by the Task Scheduler task, THE Panel_Server's stdout and stderr SHALL be redirected to `%LOCALAPPDATA%\clockify-panel\logs\panel.log`.
2. WHEN the Desktop_Wrapper encounters an unhandled exception at startup, THE Desktop_Wrapper SHALL write the traceback to `%LOCALAPPDATA%\clockify-panel\logs\wrapper.log`.
3. THE log files SHALL be appended to (not overwritten) on each start, so that recent history is preserved.
