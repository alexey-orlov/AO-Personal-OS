// ss_cal_read.swift — headless EventKit reader for the calendars in Apple Calendar.
// Build:  swiftc ss_cal_read.swift -o .work/ss-cal-read
// Usage:  ss-cal-read --list                 (list calendars: "[source] (type) :: title")
//         ss-cal-read --type exchange --source Exchange --days 14          (SoftServe's account, from now)
//         ss-cal-read --source <account> --calendar <title> --from <iso8601> --days 17
//         (--source the account title, --calendar the calendar title, both exact and case-insensitive,
//          as --list prints them; --type the account type as --list prints it; --from the window start,
//          default now). Two accounts with the --source title, or an unknown flag, are errors: a read is
//          never widened to calendars nobody named.
// Emits a JSON array on stdout; times are absolute ISO8601 (already correct — no tz guesswork).
import EventKit
import Foundation

var days = 14
var sourceFilter: String? = nil
var typeFilter: String? = nil
var calendarFilter: String? = nil
var fromArg: String? = nil
var listOnly = false
var args = Array(CommandLine.arguments.dropFirst())
var i = 0
while i < args.count {
    switch args[i] {
    case "--days":     if i+1 < args.count { days = Int(args[i+1]) ?? 14; i += 1 }
    case "--source":   if i+1 < args.count { sourceFilter = args[i+1].lowercased(); i += 1 }
    case "--type":     if i+1 < args.count { typeFilter = args[i+1].lowercased(); i += 1 }
    case "--calendar": if i+1 < args.count { calendarFilter = args[i+1].lowercased(); i += 1 }
    case "--from":     if i+1 < args.count { fromArg = args[i+1]; i += 1 }
    case "--list":     listOnly = true
    default:           // e.g. the retired --exchange, which read every Exchange account as SoftServe
        FileHandle.standardError.write("BAD_ARG \(args[i])\n".data(using: .utf8)!); exit(4)
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
if let sf = sourceFilter { selected = selected.filter { $0.source.title.lowercased() == sf } }
if let tf = typeFilter { selected = selected.filter { typeName($0.source.sourceType) == tf } }
if let cf = calendarFilter { selected = selected.filter { $0.title.lowercased() == cf } }
// A filter that matches no calendar is a failed read, not an empty one: never fall back to every
// calendar (EventKit's nil = all), and never report "no events" for an account that isn't there.
let filtered = sourceFilter != nil || typeFilter != nil || calendarFilter != nil
if filtered && selected.isEmpty {
    FileHandle.standardError.write("NO_MATCHING_CALENDAR\n".data(using: .utf8)!); exit(5)
}
// An account title two accounts share can't tell them apart: macOS names a new Exchange account
// "Exchange" by default, so a second one would be read as SoftServe. Rename one in Internet Accounts.
if let sf = sourceFilter, Set(selected.map { $0.source.sourceIdentifier }).count > 1 {
    FileHandle.standardError.write("AMBIGUOUS_SOURCE \(sf): two accounts have this title\n".data(using: .utf8)!); exit(6)
}
let iso = ISO8601DateFormatter(); iso.formatOptions = [.withInternetDateTime]; iso.timeZone = TimeZone.current  // emit local (Kyiv) wall time, not GMT
let isoIn = ISO8601DateFormatter(); isoIn.formatOptions = [.withInternetDateTime]
let isoInF = ISO8601DateFormatter(); isoInF.formatOptions = [.withInternetDateTime, .withFractionalSeconds]
var now = Date()
if let fa = fromArg {
    guard let d = isoIn.date(from: fa) ?? isoInF.date(from: fa) else {
        FileHandle.standardError.write("BAD_FROM \(fa)\n".data(using: .utf8)!); exit(4)
    }
    now = d
}
let end = Calendar.current.date(byAdding: .day, value: days, to: now)!
let pred = store.predicateForEvents(withStart: now, end: end, calendars: selected.isEmpty ? nil : selected)

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
func availName(_ a: EKEventAvailability) -> String {
    switch a {
    case .busy: return "busy"; case .free: return "free"; case .tentative: return "tentative"
    case .unavailable: return "unavailable"; case .notSupported: return "notSupported"
    @unknown default: return "unknown"
    }
}
func statusName(_ s: EKEventStatus) -> String {
    switch s {
    case .none: return "none"; case .confirmed: return "confirmed"; case .tentative: return "tentative"
    case .canceled: return "canceled"
    @unknown default: return "unknown"
    }
}

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
    f.append("\"recurring\":\(e.hasRecurrenceRules)")   // a series shares one id across instances -> key must add the date
    f.append("\"location\":\"\(esc(e.location ?? ""))\"")
    f.append("\"organizer\":\"\(esc(e.organizer?.name ?? ""))\"")
    f.append("\"organizer_email\":\"\(esc(orgEmail))\"")
    f.append("\"my_status\":\"\(myStatus)\"")
    f.append("\"online\":\(url != nil)")
    f.append("\"join_url\":" + (url == nil ? "null" : "\"\(esc(url!))\""))
    f.append("\"notes\":\"\(esc(e.notes ?? ""))\"")
    f.append("\"attendees\":[\(attJson.joined(separator: ","))]")
    // which calendar it came from, and what the reverse leg needs to block it without Google's copy
    f.append("\"calendar\":\"\(esc(e.calendar?.title ?? ""))\"")
    f.append("\"source\":\"\(esc(e.calendar?.source?.title ?? ""))\"")
    f.append("\"source_type\":\"\(e.calendar?.source.map { typeName($0.sourceType) } ?? "")\"")
    f.append("\"external_id\":\"\(esc(e.calendarItemExternalIdentifier ?? ""))\"")   // the iCal UID
    if let od = e.occurrenceDate { f.append("\"occurrence\":\"\(iso.string(from: od))\"") }   // original start in a series
    else { f.append("\"occurrence\":null") }
    f.append("\"detached\":\(e.isDetached)")
    f.append("\"availability\":\"\(availName(e.availability))\"")
    f.append("\"status\":\"\(statusName(e.status))\"")
    rows.append("{" + f.joined(separator: ",") + "}")
}
print("[\n" + rows.joined(separator: ",\n") + "\n]")
