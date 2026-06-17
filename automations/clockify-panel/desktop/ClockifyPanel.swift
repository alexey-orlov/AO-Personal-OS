// ClockifyPanel.swift — a tiny always-on-top desktop panel that wraps the
// existing local Clockify web app (http://localhost:7878) in a frameless,
// rounded WKWebView window. Because it IS the web app, every feature works
// identically: push buttons, description prefill, inline editable start time,
// live sync. No reimplementation — just a native floating window.
//
// Controls:
//   • Click buttons / type in fields exactly like the web page.
//   • Cmd + drag anywhere to move the window (so normal clicks still hit the UI).
//   • Drag an edge/corner to resize. Cmd+R reloads, Cmd+Q quits.

import Cocoa
import WebKit

let panelURLString = "http://localhost:7878"
// Matches the web app background (--bg #1c1f26) to avoid a white flash on load.
let panelBG = NSColor(srgbRed: 0.110, green: 0.122, blue: 0.149, alpha: 1.0)

// Borderless windows can't become key by default, which would block typing into
// the description / start-time fields. Override so the WebView accepts input.
// Also handle window drag and Cmd shortcuts here — doing it in sendEvent is far
// more reliable for a no-Dock (accessory) app than a global event monitor.
final class WidgetWindow: NSWindow {
    override var canBecomeKey: Bool { true }
    override var canBecomeMain: Bool { true }

    private var dragOffset: NSPoint?   // cursor position within the window when a Cmd-drag begins

    override func sendEvent(_ event: NSEvent) {
        // Cmd + left-drag moves the window from anywhere; plain clicks fall
        // through to the web UI untouched.
        if event.type == .leftMouseDown, event.modifierFlags.contains(.command) {
            dragOffset = event.locationInWindow
            return
        }
        if event.type == .leftMouseDragged, let off = dragOffset {
            let m = NSEvent.mouseLocation
            setFrameOrigin(NSPoint(x: m.x - off.x, y: m.y - off.y))
            return
        }
        if event.type == .leftMouseUp, dragOffset != nil {
            dragOffset = nil
            saveFrame(usingName: "ClockifyPanelWindow")
            return
        }
        // Cmd shortcuts handled directly so they work without a Dock/menu-bar app menu.
        if event.type == .keyDown, event.modifierFlags.contains(.command),
           let d = NSApp.delegate as? AppDelegate,
           d.handleCommandKey(event.charactersIgnoringModifiers) {
            return
        }
        super.sendEvent(event)
    }
}

final class AppDelegate: NSObject, NSApplicationDelegate, WKNavigationDelegate, NSMenuDelegate {
    var window: WidgetWindow!
    var webView: WKWebView!
    // Persisted: floating (always on top) vs normal (sits behind your windows).
    var alwaysOnTop = (UserDefaults.standard.object(forKey: "alwaysOnTop") as? Bool) ?? true
    var onTopMenuItem: NSMenuItem?
    var hideShowItem: NSMenuItem?
    var statusItem: NSStatusItem?

    func applicationDidFinishLaunching(_ notification: Notification) {
        NSApp.setActivationPolicy(.accessory) // no Dock icon; it's a desktop widget

        let initial = NSRect(x: 0, y: 0, width: 360, height: 520)
        window = WidgetWindow(contentRect: initial,
                              styleMask: [.borderless, .resizable],
                              backing: .buffered,
                              defer: false)
        window.isMovableByWindowBackground = false   // we drive moves via Cmd+drag
        applyLevel()                                  // floating vs normal (persisted)
        window.isOpaque = false
        window.backgroundColor = .clear
        window.hasShadow = true
        window.minSize = NSSize(width: 150, height: 180)
        window.isReleasedWhenClosed = false
        window.setFrameAutosaveName("ClockifyPanelWindow")

        let config = WKWebViewConfiguration()
        webView = WKWebView(frame: initial, configuration: config)
        webView.navigationDelegate = self
        webView.autoresizingMask = [.width, .height]
        webView.wantsLayer = true
        webView.layer?.cornerRadius = 16
        webView.layer?.masksToBounds = true
        webView.layer?.backgroundColor = panelBG.cgColor
        if #available(macOS 12.0, *) { webView.underPageBackgroundColor = panelBG }
        window.contentView = webView

        loadPanel()

        if !window.setFrameUsingName("ClockifyPanelWindow") { window.center() }
        window.makeKeyAndOrderFront(nil)
        NSApp.activate(ignoringOtherApps: true)

        installMenu()
        installStatusItem()
    }

    func loadPanel() {
        guard let url = URL(string: panelURLString) else { return }
        webView.load(URLRequest(url: url, cachePolicy: .reloadIgnoringLocalCacheData, timeoutInterval: 10))
    }

    // The local server may not be up yet at login — keep retrying until it is.
    func webView(_ webView: WKWebView, didFail navigation: WKNavigation!, withError error: Error) { scheduleRetry() }
    func webView(_ webView: WKWebView, didFailProvisionalNavigation navigation: WKNavigation!, withError error: Error) { scheduleRetry() }
    func scheduleRetry() {
        DispatchQueue.main.asyncAfter(deadline: .now() + 2.0) { [weak self] in self?.loadPanel() }
    }

    // Standard menus so editing shortcuts (copy/paste/select-all) work in the
    // description / start-time fields, plus Quit. Window-level shortcuts
    // (Cmd+Q/R/T/W) are also handled in WidgetWindow.sendEvent for reliability.
    func installMenu() {
        let mainMenu = NSMenu()

        let appItem = NSMenuItem(); mainMenu.addItem(appItem)
        let appMenu = NSMenu()
        appMenu.addItem(withTitle: "Quit Clockify Panel", action: #selector(NSApplication.terminate(_:)), keyEquivalent: "q")
        appItem.submenu = appMenu

        let editItem = NSMenuItem(); mainMenu.addItem(editItem)
        let edit = NSMenu(title: "Edit")
        edit.addItem(withTitle: "Undo", action: Selector(("undo:")), keyEquivalent: "z")
        edit.addItem(withTitle: "Redo", action: Selector(("redo:")), keyEquivalent: "Z")
        edit.addItem(.separator())
        edit.addItem(withTitle: "Cut", action: #selector(NSText.cut(_:)), keyEquivalent: "x")
        edit.addItem(withTitle: "Copy", action: #selector(NSText.copy(_:)), keyEquivalent: "c")
        edit.addItem(withTitle: "Paste", action: #selector(NSText.paste(_:)), keyEquivalent: "v")
        edit.addItem(withTitle: "Select All", action: #selector(NSText.selectAll(_:)), keyEquivalent: "a")
        editItem.submenu = edit

        NSApp.mainMenu = mainMenu
    }

    // A menu-bar item is the reliable, always-available control surface for a
    // no-Dock widget: reach it, toggle on-top, recenter, or quit from here.
    func installStatusItem() {
        let item = NSStatusBar.system.statusItem(withLength: NSStatusItem.variableLength)
        if let btn = item.button {
            if let img = NSImage(systemSymbolName: "clock", accessibilityDescription: "Clockify Panel") {
                img.isTemplate = true
                btn.image = img
            } else {
                btn.title = "⏱"
            }
            btn.toolTip = "Clockify Panel"
        }
        let menu = NSMenu()
        menu.delegate = self   // so the Hide/Show label reflects current visibility
        let hs = NSMenuItem(title: "Hide", action: #selector(toggleHideShow), keyEquivalent: "h")
        menu.addItem(hs)
        hideShowItem = hs
        menu.addItem(.separator())
        let onTop = NSMenuItem(title: "Always on Top", action: #selector(toggleAlwaysOnTop), keyEquivalent: "t")
        onTop.state = alwaysOnTop ? .on : .off
        menu.addItem(onTop)
        onTopMenuItem = onTop
        menu.addItem(withTitle: "Center on Screen", action: #selector(centerWindow), keyEquivalent: "")
        menu.addItem(withTitle: "Reload", action: #selector(reloadPanel), keyEquivalent: "r")
        menu.addItem(.separator())
        menu.addItem(withTitle: "Quit", action: #selector(NSApplication.terminate(_:)), keyEquivalent: "q")
        item.menu = menu
        statusItem = item
    }

    @objc func reloadPanel() { loadPanel() }
    @objc func showFront() {
        window.makeKeyAndOrderFront(nil)
        NSApp.activate(ignoringOtherApps: true)
    }
    @objc func centerWindow() { window.center(); showFront() }
    // Hide the floating window (without quitting) / bring it back.
    @objc func toggleHideShow() {
        if window.isVisible { window.orderOut(nil) } else { showFront() }
    }
    // Keep the menu label accurate each time the menu opens.
    func menuWillOpen(_ menu: NSMenu) {
        hideShowItem?.title = window.isVisible ? "Hide" : "Show"
    }

    // Floating = always above other windows. Off = normal level, so it sits
    // among / behind your windows (like a desktop widget). Persisted.
    func applyLevel() {
        window.level = alwaysOnTop ? .floating : .normal
        window.collectionBehavior = [.canJoinAllSpaces, .fullScreenAuxiliary]
        onTopMenuItem?.state = alwaysOnTop ? .on : .off
    }
    @objc func toggleAlwaysOnTop() {
        alwaysOnTop.toggle()
        UserDefaults.standard.set(alwaysOnTop, forKey: "alwaysOnTop")
        applyLevel()
        if alwaysOnTop { showFront() }
    }

    // Called from WidgetWindow.sendEvent for Cmd shortcuts. Returns true if handled.
    func handleCommandKey(_ chars: String?) -> Bool {
        switch chars {
        case "q", "w": NSApp.terminate(nil); return true
        case "r": reloadPanel(); return true
        case "t": toggleAlwaysOnTop(); return true
        case "h": toggleHideShow(); return true
        default: return false
        }
    }

    // Stay alive in the menu bar when the window is hidden/closed, so it can be
    // re-shown from the status item. Quit only via Quit / Cmd+Q / Cmd+W.
    func applicationShouldTerminateAfterLastWindowClosed(_ sender: NSApplication) -> Bool { false }
}

let app = NSApplication.shared
let delegate = AppDelegate()
app.delegate = delegate
app.run()
