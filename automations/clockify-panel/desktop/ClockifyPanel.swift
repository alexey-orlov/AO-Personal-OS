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
final class WidgetWindow: NSWindow {
    override var canBecomeKey: Bool { true }
    override var canBecomeMain: Bool { true }
}

final class AppDelegate: NSObject, NSApplicationDelegate, WKNavigationDelegate {
    var window: WidgetWindow!
    var webView: WKWebView!

    func applicationDidFinishLaunching(_ notification: Notification) {
        NSApp.setActivationPolicy(.accessory) // no Dock icon; it's a desktop widget

        let initial = NSRect(x: 0, y: 0, width: 360, height: 520)
        window = WidgetWindow(contentRect: initial,
                              styleMask: [.borderless, .resizable],
                              backing: .buffered,
                              defer: false)
        window.isMovableByWindowBackground = false   // we drive moves via Cmd+drag
        window.level = .floating                      // stays above normal windows
        window.collectionBehavior = [.canJoinAllSpaces, .fullScreenAuxiliary]
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
        installDragMonitor()
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

    func installMenu() {
        let mainMenu = NSMenu()
        let appItem = NSMenuItem()
        mainMenu.addItem(appItem)
        let appMenu = NSMenu()
        appMenu.addItem(withTitle: "Reload", action: #selector(reloadPanel), keyEquivalent: "r")
        appMenu.addItem(NSMenuItem.separator())
        appMenu.addItem(withTitle: "Quit", action: #selector(NSApplication.terminate(_:)), keyEquivalent: "q")
        appItem.submenu = appMenu
        NSApp.mainMenu = mainMenu
    }
    @objc func reloadPanel() { loadPanel() }

    // Cmd + left-drag moves the window from anywhere; plain clicks fall through
    // to the web UI (buttons, field) untouched.
    func installDragMonitor() {
        NSEvent.addLocalMonitorForEvents(matching: [.leftMouseDown]) { [weak self] event in
            guard let self = self, let win = self.window, event.window === win else { return event }
            if event.modifierFlags.contains(.command) {
                win.performDrag(with: event)
                return nil
            }
            return event
        }
    }

    func applicationShouldTerminateAfterLastWindowClosed(_ sender: NSApplication) -> Bool { true }
}

let app = NSApplication.shared
let delegate = AppDelegate()
app.delegate = delegate
app.run()
