// ss_cal_write.swift — headless EventKit WRITER for "Busy" placeholders in one work calendar.
// Build:  swiftc ss_cal_write.swift -o .work/ss-cal-write
// Usage:  ss-cal-write                                          (SoftServe: env defaults below)
//         ss-cal-write --source <account> --calendar <title> --marker <name>   (e.g. GigaCloud's)
// Input  (stdin): JSON array of commands —
//   [{"op":"create","key":"cal:evid","start":"<rfc3339>","end":"<rfc3339>","title":"Busy","marker":"[[gcal-busy:key]]"},
//    {"op":"update","ss_id":"<calendarItemIdentifier>","key":"...","start":"...","end":"...","title":"...","marker":"..."},
//    {"op":"delete","ss_id":"<calendarItemIdentifier>"}]
// Output (stdout): JSON array — [{"op","key","ok","ss_id","error"}]; ss_id is the placeholder's stable id
// (in whichever calendar it writes). Writes only into the calendar --calendar ($CALSYNC_SS_WRITE_CAL) of
// the Exchange account --source ($CALSYNC_SS_SOURCE), and changes only events there that carry the
// [[<marker>:...]] note, --marker ($CALSYNC_REVERSE_MARKER, default gcal-busy). An empty "[]" input is a
// preflight: exit 0 when that is exactly one writable calendar, 3 when not. Unknown flag: exit 4.
import EventKit
import Foundation

let env = ProcessInfo.processInfo.environment
var wantSource = (env["CALSYNC_SS_SOURCE"] ?? "Exchange").lowercased()
var wantTitle = (env["CALSYNC_SS_WRITE_CAL"] ?? "Calendar").lowercased()
var markerName = env["CALSYNC_REVERSE_MARKER"] ?? "gcal-busy"
let argv = Array(CommandLine.arguments.dropFirst())
var ai = 0
func badArg(_ s: String) -> Never { FileHandle.standardError.write("BAD_ARG \(s)\n".data(using: .utf8)!); exit(4) }
while ai < argv.count {
    let flag = argv[ai]
    guard ["--source", "--calendar", "--marker"].contains(flag) else { badArg(flag) }
    guard ai + 1 < argv.count, !argv[ai + 1].trimmingCharacters(in: .whitespaces).isEmpty else { badArg("\(flag) needs a value") }
    let v = argv[ai + 1]
    switch flag { case "--source": wantSource = v.lowercased(); case "--calendar": wantTitle = v.lowercased()
    default: markerName = v }
    ai += 2
}
if markerName.isEmpty { badArg("empty marker") }

let store = EKEventStore()
let sem = DispatchSemaphore(value: 0)
var granted = false
let status = EKEventStore.authorizationStatus(for: .event)
if status.rawValue == 3 || status.rawValue == 1 { granted = true }
else {
    if #available(macOS 14.0, *) { store.requestFullAccessToEvents { g, _ in granted = g; sem.signal() } }
    else { store.requestAccess(to: .event) { g, _ in granted = g; sem.signal() } }
    sem.wait()
}
if !granted {
    FileHandle.standardError.write("EVENTKIT_DENIED status=\(EKEventStore.authorizationStatus(for: .event).rawValue)\n".data(using: .utf8)!)
    exit(2)
}

// The one calendar it writes into: wantTitle of the Exchange account titled wantSource, names as
// `ss-cal-read --list` prints them. No fallback to another calendar or account: Apple Calendar holds
// two Exchange accounts (SoftServe's and GigaCloud's), and each run names the one it writes.
let marker = "[[" + markerName + ":"
let targetCals = store.calendars(for: .event).filter {
    $0.source.sourceType == .exchange && $0.source.title.lowercased() == wantSource
        && $0.title.lowercased() == wantTitle && $0.allowsContentModifications }
guard targetCals.count == 1, let targetCal = targetCals.first else {
    FileHandle.standardError.write((targetCals.isEmpty ? "NO_WRITABLE_CALENDAR \(wantTitle) in \(wantSource)\n"
        : "AMBIGUOUS_CALENDAR: \(targetCals.count) accounts titled \(wantSource) have \(wantTitle)\n").data(using: .utf8)!)
    exit(3)
}
// Only our own placeholders are ever changed: in the target calendar and carrying its marker.
func isOurs(_ ev: EKEvent) -> Bool {
    ev.calendar?.calendarIdentifier == targetCal.calendarIdentifier && (ev.notes ?? "").contains(marker)
}

func esc(_ s: String) -> String {
    var o = ""
    for u in s.unicodeScalars {
        switch u { case "\"": o += "\\\""; case "\\": o += "\\\\"; case "\n": o += "\\n"
        default: if u.value >= 0x20 { o.unicodeScalars.append(u) } }
    }
    return o
}
let iso = ISO8601DateFormatter(); iso.formatOptions = [.withInternetDateTime]
let isoF = ISO8601DateFormatter(); isoF.formatOptions = [.withInternetDateTime, .withFractionalSeconds]
func parseDate(_ s: String) -> Date? { iso.date(from: s) ?? isoF.date(from: s) }
func eventById(_ id: String) -> EKEvent? { store.calendarItem(withIdentifier: id) as? EKEvent }

let inData = FileHandle.standardInput.readDataToEndOfFile()
guard let cmds = (try? JSONSerialization.jsonObject(with: inData)) as? [[String: Any]] else { print("[]"); exit(0) }

var results: [String] = []
for c in cmds {
    let op = (c["op"] as? String) ?? ""
    let key = (c["key"] as? String) ?? ""
    var ok = false
    var ssid = (c["ss_id"] as? String) ?? ""
    var err = ""
    switch op {
    case "create", "update":
        let ev: EKEvent
        if op == "update", !ssid.isEmpty, let existing = eventById(ssid), isOurs(existing) { ev = existing }
        else { ev = EKEvent(eventStore: store); ev.calendar = targetCal }   // upsert: recreate if the update target vanished
        if let s = parseDate((c["start"] as? String) ?? ""), let e = parseDate((c["end"] as? String) ?? "") {
            ev.title = (c["title"] as? String) ?? "Busy"
            ev.startDate = s; ev.endDate = e
            ev.availability = .busy                          // show as busy in Exchange free/busy
            ev.notes = (c["marker"] as? String) ?? ""        // hidden marker -> forward leg skips this event
            do { try store.save(ev, span: .thisEvent, commit: true); ok = true; ssid = ev.calendarItemIdentifier }
            catch { err = "\(error)" }
        } else { err = "bad dates" }
    case "delete":
        if ssid.isEmpty { ok = true }
        else if let ev = eventById(ssid) {
            if !isOurs(ev) { err = "refused: not a Busy placeholder in the target calendar" }
            else { do { try store.remove(ev, span: .thisEvent, commit: true); ok = true } catch { err = "\(error)" } }
        } else { ok = true }                                  // already gone
    default: err = "unknown op"
    }
    results.append("{\"op\":\"\(esc(op))\",\"key\":\"\(esc(key))\",\"ok\":\(ok),\"ss_id\":\"\(esc(ssid))\",\"error\":\"\(esc(err))\"}")
}
print("[\n" + results.joined(separator: ",\n") + "\n]")
