// ss_cal_read.swift — headless EventKit reader for the SoftServe calendar.
// Build:  swiftc ss_cal_read.swift -o .work/ss-cal-read
// Usage:  ss-cal-read --list                 (list calendars: "[source] :: title")
//         ss-cal-read --source <substr> --days 14    (emit events JSON for matching source)
// Emits a JSON array on stdout; times are absolute ISO8601 (already correct — no tz guesswork).
import EventKit
import Foundation

var days = 14
var sourceFilter: String? = nil
var exchangeOnly = false
var listOnly = false
var args = Array(CommandLine.arguments.dropFirst())
var i = 0
while i < args.count {
    switch args[i] {
    case "--days":     if i+1 < args.count { days = Int(args[i+1]) ?? 14; i += 1 }
    case "--source":   if i+1 < args.count { sourceFilter = args[i+1].lowercased(); i += 1 }
    case "--exchange": exchangeOnly = true       // SoftServe is the only Exchange account
    case "--list":     listOnly = true
    default: break
    }
    i += 1
}

let store = EKEventStore()
let sem = DispatchSemaphore(value: 0)
var granted = false
let status = EKEventStore.authorizationStatus(for: .event)
if status.rawValue == 3 || status.rawValue == 1 {
    granted = true
} else {
    if #available(macOS 14.0, *) { store.requestFullAccessToEvents { g, _ in granted = g; sem.signal() } }
    else { store.requestAccess(to: .event) { g, _ in granted = g; sem.signal() } }
    sem.wait()
}
if !granted {
    FileHandle.standardError.write("EVENTKIT_DENIED status=\(EKEventStore.authorizationStatus(for: .event).rawValue)\n".data(using: .utf8)!)
    exit(2)
}

let cals = store.calendars(for: .event)
func typeName(_ t: EKSourceType) -> String {
    switch t { case .local: return "local"; case .exchange: return "exchange"; case .calDAV: return "calDAV"
    case .mobileMe: return "mobileMe"; case .subscribed: return "subscribed"; case .birthdays: return "birthdays"
    @unknown default: return "other" }
}
if listOnly {
    for c in cals { print("[\(c.source.title)] (\(typeName(c.source.sourceType))) :: \(c.title)") }
    exit(0)
}

func esc(_ s: String) -> String {
    var o = ""
    for u in s.unicodeScalars {
        switch u {
        case "\"": o += "\\\""
        case "\\": o += "\\\\"
        case "\n": o += "\\n"
        default: if u.value >= 0x20 { o.unicodeScalars.append(u) }
        }
    }
    return o
}
func meetingURL(_ e: EKEvent) -> String? {
    if let u = e.url?.absoluteString, !u.isEmpty { return u }
    let hay = "\(e.notes ?? "") \(e.location ?? "")"
    for p in ["https://teams.microsoft.com/[^\\s\"'<>]+",
              "https://[a-z0-9.]*zoom.us/[^\\s\"'<>]+",
              "https://meet.google.com/[^\\s\"'<>]+",
              "https://[a-z0-9.]*webex.com/[^\\s\"'<>]+"] {
        if let r = hay.range(of: p, options: .regularExpression) { return String(hay[r]) }
    }
    return nil
}

var selected = cals
if exchangeOnly { selected = selected.filter { $0.source.sourceType == .exchange } }
if let sf = sourceFilter { selected = selected.filter { $0.source.title.lowercased().contains(sf) } }
let now = Date()
let end = Calendar.current.date(byAdding: .day, value: days, to: now)!
let pred = store.predicateForEvents(withStart: now, end: end, calendars: selected.isEmpty ? nil : selected)
let iso = ISO8601DateFormatter(); iso.formatOptions = [.withInternetDateTime]; iso.timeZone = TimeZone.current  // emit local (Kyiv) wall time, not GMT

func mailFrom(_ u: URL?) -> String {
    guard let s = u?.absoluteString else { return "" }
    return s.hasPrefix("mailto:") ? String(s.dropFirst(7)) : ""
}
func pstatus(_ s: EKParticipantStatus) -> String {
    switch s {
    case .accepted: return "accepted"; case .declined: return "declined"
    case .tentative: return "tentative"; case .pending: return "needsAction"
    default: return ""
    }
}
let ssEmail = (ProcessInfo.processInfo.environment["CALSYNC_SS_EMAIL"] ?? "olekorlov@softserveinc.com").lowercased()

let evs = store.events(matching: pred).sorted { $0.startDate < $1.startDate }
var rows: [String] = []
for e in evs {
    let url = meetingURL(e)
    var attJson: [String] = []
    var myStatus = ""
    var myStatusFound = false          // pinned once EventKit's own isCurrentUser flag matches my entry
    for p in (e.attendees ?? []) {
        let email = mailFrom(p.url)
        let nm = p.name ?? email
        let st = pstatus(p.participantStatus)
        let isMe = p.isCurrentUser
        attJson.append("{\"name\":\"\(esc(nm))\",\"email\":\"\(esc(email))\",\"status\":\"\(st)\",\"is_me\":\(isMe)}")
        if isMe {                                      // primary: trust EventKit's current-user flag
            myStatus = st; myStatusFound = true
        } else if !myStatusFound && email.lowercased() == ssEmail {   // fallback: SMTP match (Exchange URLs are often X500/DN -> can miss)
            myStatus = st
        }
    }
    let orgEmail = mailFrom(e.organizer?.url)
    let orgIsMe = (e.organizer?.isCurrentUser ?? false) || (orgEmail.lowercased() == ssEmail)
    if myStatus.isEmpty && orgIsMe { myStatus = "accepted" }  // I'm the organizer -> implicitly attending
    var f = [String]()
    f.append("\"uid\":\"\(esc(e.calendarItemIdentifier))\"")
    f.append("\"title\":\"\(esc(e.title ?? ""))\"")
    f.append("\"start\":\"\(iso.string(from: e.startDate))\"")
    f.append("\"end\":\"\(iso.string(from: e.endDate))\"")
    f.append("\"all_day\":\(e.isAllDay)")
    f.append("\"location\":\"\(esc(e.location ?? ""))\"")
    f.append("\"organizer\":\"\(esc(e.organizer?.name ?? ""))\"")
    f.append("\"organizer_email\":\"\(esc(orgEmail))\"")
    f.append("\"my_status\":\"\(myStatus)\"")
    f.append("\"online\":\(url != nil)")
    f.append("\"join_url\":" + (url == nil ? "null" : "\"\(esc(url!))\""))
    f.append("\"notes\":\"\(esc(e.notes ?? ""))\"")
    f.append("\"attendees\":[\(attJson.joined(separator: ","))]")
    rows.append("{" + f.joined(separator: ",") + "}")
}
print("[\n" + rows.joined(separator: ",\n") + "\n]")
