// make_icon.swift — renders a 1024×1024 app icon (PNG) that mirrors the widget:
// a dark rounded card holding a 2×2 grid of the four project colors
// (SS violet / GC red / JS blue / EF green). Usage: make_icon [out.png]
import Cocoa

func rrect(_ r: NSRect, _ radius: CGFloat) -> NSBezierPath {
    NSBezierPath(roundedRect: r, xRadius: radius, yRadius: radius)
}
func blend(_ a: NSColor, _ b: NSColor, _ t: CGFloat) -> NSColor {
    let a1 = a.usingColorSpace(.deviceRGB)!, b1 = b.usingColorSpace(.deviceRGB)!
    return NSColor(srgbRed: a1.redComponent + (b1.redComponent - a1.redComponent) * t,
                   green: a1.greenComponent + (b1.greenComponent - a1.greenComponent) * t,
                   blue:  a1.blueComponent + (b1.blueComponent - a1.blueComponent) * t, alpha: 1)
}
func button(_ x: CGFloat, _ y: CGFloat, _ s: CGFloat, _ color: NSColor) {
    let p = rrect(NSRect(x: x, y: y, width: s, height: s), s * 0.26)
    NSGradient(starting: blend(color, .white, 0.18), ending: blend(color, .black, 0.30))!
        .draw(in: p, angle: -90)
    NSColor(white: 1, alpha: 0.18).setFill()
    rrect(NSRect(x: x + s * 0.12, y: y + s * 0.52, width: s * 0.76, height: s * 0.34), s * 0.18).fill()
}

let rep = NSBitmapImageRep(bitmapDataPlanes: nil, pixelsWide: 1024, pixelsHigh: 1024,
    bitsPerSample: 8, samplesPerPixel: 4, hasAlpha: true, isPlanar: false,
    colorSpaceName: .deviceRGB, bytesPerRow: 0, bitsPerPixel: 0)!
NSGraphicsContext.saveGraphicsState()
NSGraphicsContext.current = NSGraphicsContext(bitmapImageRep: rep)

NSColor.clear.set()
NSRect(x: 0, y: 0, width: 1024, height: 1024).fill()

let card = rrect(NSRect(x: 84, y: 84, width: 856, height: 856), 190)
NSGradient(starting: NSColor(srgbRed: 0.18, green: 0.20, blue: 0.25, alpha: 1),
           ending:   NSColor(srgbRed: 0.10, green: 0.11, blue: 0.14, alpha: 1))!
    .draw(in: card, angle: -90)
NSColor(white: 1, alpha: 0.06).setStroke()
card.lineWidth = 3
card.stroke()

let inset: CGFloat = 196, gap: CGFloat = 48
let b = (1024 - inset * 2 - gap) / 2
let xL = inset, xR = inset + b + gap
let yTop = inset + b + gap, yBot = inset
button(xL, yTop, b, NSColor(srgbRed: 0.494, green: 0.341, blue: 0.761, alpha: 1)) // SS violet
button(xR, yTop, b, NSColor(srgbRed: 0.957, green: 0.263, blue: 0.212, alpha: 1)) // GC red
button(xL, yBot, b, NSColor(srgbRed: 0.129, green: 0.588, blue: 0.953, alpha: 1)) // JS blue
button(xR, yBot, b, NSColor(srgbRed: 0.298, green: 0.686, blue: 0.314, alpha: 1)) // EF green

NSGraphicsContext.restoreGraphicsState()

let out = CommandLine.arguments.count > 1 ? CommandLine.arguments[1] : "icon_1024.png"
try! rep.representation(using: .png, properties: [:])!.write(to: URL(fileURLWithPath: out))
print("wrote \(out)")
