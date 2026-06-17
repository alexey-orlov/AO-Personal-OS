#!/usr/bin/env bash
# build.sh — compile the desktop wrapper into ~/Applications/Clockify Panel.app,
# ad-hoc sign it, and install a login agent that launches it. Idempotent.
set -euo pipefail
cd "$(dirname "$0")"

APP_NAME="Clockify Panel"
EXE="ClockifyPanel"
APP_DIR="$HOME/Applications/${APP_NAME}.app"

command -v xcrun >/dev/null || { echo "ERROR: xcrun not found (install Xcode Command Line Tools)." >&2; exit 1; }
SDK="$(xcrun --show-sdk-path)"
ARCH="$(uname -m)"                       # arm64 or x86_64
TARGET="${ARCH}-apple-macos12.0"

echo "Compiling (target $TARGET, sdk $SDK) …"
mkdir -p build
# Invoke via `xcrun` so SDKROOT is set, and pin the deployment target so the
# compiler doesn't try to load a stdlib for the bare host OS version.
xcrun swiftc ClockifyPanel.swift -O \
  -sdk "$SDK" -target "$TARGET" \
  -o "build/$EXE" -framework Cocoa -framework WebKit

echo "Generating app icon …"
xcrun swiftc make_icon.swift -O -sdk "$SDK" -target "$TARGET" -o build/make_icon -framework Cocoa
build/make_icon build/icon_1024.png
ICONSET="build/AppIcon.iconset"
rm -rf "$ICONSET"; mkdir -p "$ICONSET"
for sz in 16 32 128 256 512; do
  sips -z $sz $sz       build/icon_1024.png --out "$ICONSET/icon_${sz}x${sz}.png"    >/dev/null
  sips -z $((sz*2)) $((sz*2)) build/icon_1024.png --out "$ICONSET/icon_${sz}x${sz}@2x.png" >/dev/null
done
iconutil -c icns "$ICONSET" -o build/AppIcon.icns

echo "Assembling ${APP_DIR} …"
# stop any running instance so the binary can be replaced
pkill -f "${APP_NAME}.app/Contents/MacOS/${EXE}" 2>/dev/null || true
rm -rf "$APP_DIR"
mkdir -p "$APP_DIR/Contents/MacOS" "$APP_DIR/Contents/Resources"
cp "build/$EXE" "$APP_DIR/Contents/MacOS/$EXE"
cp Info.plist "$APP_DIR/Contents/Info.plist"
cp build/AppIcon.icns "$APP_DIR/Contents/Resources/AppIcon.icns"
chmod +x "$APP_DIR/Contents/MacOS/$EXE"

echo "Ad-hoc code-signing …"
codesign --force --deep -s - "$APP_DIR" 2>/dev/null || echo "  (codesign skipped)"

echo "Installing login agent …"
mkdir -p "$HOME/Library/LaunchAgents"
PLIST_DST="$HOME/Library/LaunchAgents/com.user.clockify-widget.plist"
sed "s|__APP__|$APP_DIR|g" com.user.clockify-widget.plist > "$PLIST_DST"
launchctl unload "$PLIST_DST" 2>/dev/null || true
launchctl load "$PLIST_DST"   # RunAtLoad launches the panel now and at every login

echo ""
echo "Done. '${APP_NAME}' is installed at ${APP_DIR} and starts at login."
echo "It needs the local server running (the clockify-panel launchd agent on :7878)."
echo "Move it with Cmd+drag, resize from edges, Cmd+R reload, Cmd+Q quit."
