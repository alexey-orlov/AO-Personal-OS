// ss_cal_write.swift — headless EventKit WRITER for SoftServe "Busy" placeholders.
// Build:  swiftc ss_cal_write.swift -o .work/ss-cal-write
// Input  (stdin): JSON array of commands —
//   [{"op":"create","key":"cal:evid","start":"<rfc3339>","end":"<rfc3339>","title":"Busy","marker":"[[gcal-busy]]"},
//    {"op":"update","ss_id":"<calendarItemIdentifier>","key":"...","start":"...","end":"...","title":"...","marker":"..."},
//    {"op":"delete","ss_id":"<calendarItemIdentifier>"}]
// Output (stdout): JSON array — [{"op","key","ok","ss_id","error"}]; ss_id is the placeholder's stable id.
// Writes into the writable Exchange calendar titled $CALSYNC_SS_WRITE_CAL (default "Calendar").
import EventKit
import Foundation

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

// Locate the SS Exchange calendar to write into (the main "Calendar", not Birthdays/holidays).
let wantTitle = ProcessInfo.processInfo.environment["CALSYNC_SS_WRITE_CAL"] ?? "Calendar"
let exCals = store.calendars(for: .event).filter { $0.source.sourceType == .exchange && $0.allowsContentModifications }
guard let ssCal = exCals.first(where: { $0.title == wantTitle })
        ?? exCals.first(where: { $0.title != "Birthdays" && !$0.title.lowercased().contains("holiday") }) else {
    FileHandle.standardError.write("NO_WRITABLE_EXCHANGE_CALENDAR\n".data(using: .utf8)!)
    exit(3)
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
        if op == "update", !ssid.isEmpty, let existing = eventById(ssid) { ev = existing }
        else { ev = EKEvent(eventStore: store); ev.calendar = ssCal }   // upsert: recreate if the update target vanished
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
            do { try store.remove(ev, span: .thisEvent, commit: true); ok = true } catch { err = "\(error)" }
        } else { ok = true }                                  // already gone
    default: err = "unknown op"
    }
    results.append("{\"op\":\"\(esc(op))\",\"key\":\"\(esc(key))\",\"ok\":\(ok),\"ss_id\":\"\(esc(ssid))\",\"error\":\"\(esc(err))\"}")
}
print("[\n" + results.joined(separator: ",\n") + "\n]")
