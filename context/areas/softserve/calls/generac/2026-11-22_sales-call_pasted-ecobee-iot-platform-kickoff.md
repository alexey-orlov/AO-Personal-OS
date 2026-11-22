# sales-call — ecobee IoT platform (ICS) project kickoff
_source: transcript Alex pasted in chat on 2026-11-22 (English, diarized; raw text not committed). The SoftServe ↔ ecobee kickoff of the IoT platform project, with AWS present; Oksana Sharonina recorded it._

> _No date in the transcript, and Alex gave none: filed under 2026-11-22, the day he shared it. Alex was not on the call (inferred: he is not among the introductions)._

> _Speakers are diarized only, and two labels merge people: **Speaker D** is the delivery director in the introductions and **Jarek** from then on (Ryan answers him as "Jerak"); **Speaker F** is the Chicago IoT Solutions Architect, whose name comes out as "Oz", "Moez" and "Luis"; Alex heard "Moaz" and names him SoftServe's main SME on the project (chat, 2026-11-22; spelling unconfirmed). The delivery director, garbled as "Vartkundjian", is **Varty Kuyumdjian**, the DO on the outreach sheet's Generac row._

## TL;DR
- **Kickoff of SoftServe's ecobee IoT platform project.** Dave (ecobee) walked the SoftServe and AWS team through the architecture: today ~6M thermostats talk MQTT to a GCP backend; the next-generation thermostat will connect through **Generac's Universal Device Management Platform (UDMP, on AWS)** to **ICS**, a new AWS layer his team owns (Go), which translates into ecobee's GCP services. The new thermostat comes first, then the installed fleet by firmware update, then the cameras; employee field trial ~Q4 2027, launch ~Q4 2028.
- **The commercial goal (Oksana):** a statement of work for **AWS MAP funding** approved before the end of 2026, covering design, architecture and alignment now and implementation from January. Ryan (AWS) doubts there is enough information to scope it and proposed phasing, a scoping phase first; a checkpoint with JL "on Monday" expects a plan forward.
- **SoftServe's concrete entry: AWS IoT Device Shadow** (its design, the implementation, the link to the GCP services), which Dave's team, coming from GCP, has never used. Next: Steven (principal engineer) sends documentation or holds an ICS deep dive; Oksana sends slots for the next week.

## Participants & roles
| Speaker | Person | Side | Role, as stated |
|---|---|---|---|
| A | **Dave** (named by Ryan, Oksana and Lisa) | ecobee | Took over people management of the ICS team from Stephen; his team owns the ICS box. Toronto. ~3 years at ecobee, ~2 weeks on this project; before it, ran a GCP backend team for smart security and 911 escalation, whose work moves to another business unit. Team: Stephen plus two full-time engineers, two more from his old team onboarding that afternoon, one intern. |
| B | **Oksana Sharonina** (transcribed "Oksana Sharina") | SoftServe | Account manager for ecobee and Generac; has worked with Dave on earlier engagements; started the recording and ran the next steps. |
| C | **Ryan** | AWS | Senior Solutions Architect on AWS's core account team for Generac and ecobee; works closely with Scott Feldman; spent months with the DMP team, including a Well-Architected Framework review. |
| D | **Varty Kuyumdjian** (the delivery director), then **Jarek** | SoftServe | Delivery director: Generac and ecobee both in the portfolio, works with Lisa. Jarek: Poland; leads SoftServe's AWS Cloud Center of Excellence (AWS-native infrastructure, migrations, modernization); AWS ambassador and community builder; asked the architecture questions. |
| E | **Lisa** ("a shorter version of my name") | SoftServe | Delivery; has supported ecobee for several years and covers several programs. |
| F | **Moaz** (as Alex heard it; spelling unconfirmed) | SoftServe | IoT Solutions Architect, embedded and edge-to-cloud integration; Chicago. Asked about other devices, radio protocols, the offline mode and OTA. |
| G | **Volodymyr Pavlyuk** (Vlad) | SoftServe | IoT architect, industrial IoT: data pipelines, security, high-volume transfer. |
| H | **Alejandro** | SoftServe | Partnerships team; drives the AWS–SoftServe–Generac partnership. |

Named, not heard: **Stephen / Steven** (ecobee principal engineer on the ICS team; owns the technical design, pushes versioned API contracts between the boxes, holds the consumption pieces) · **Matt** (Generac; owns the DMP; Ryan also says "Mike and team", likely the same team, inferred) · **Scott Feldman** (AWS, works with Ryan; with "Jill" set the SoW ask) · **JL** (presses to close the thermostat schedule before Q4 2026 ends and holds the Monday checkpoint; role not stated; possibly the "Jill" above, inferred).

## Customer context
- **Today.** ~6M ecobee thermostats in the field run ecobee's embedded-Linux firmware and connect directly to an MQTT broker on GCP; the cameras (indoor and doorbell, wired, with detection on the device) connect the same way. Behind it sit many team-owned GCP microservices (energy, home, HVAC-partner products, smart buildings such as hotels, smart security) on Pub/Sub, with state in several databases. The admin portal (pros and customer service: settings, firmware pushes, resets) and the native iOS and Android apps (~2M daily active users) reach devices only through the cloud. Customers: ~90% US, ~10% Canada. Device config travels as an XML file that can exceed 100K.
- **The new path** (Dave's diagram; much of it still "TBD"):
  - **UDMP** (Generac, AWS), a generic "post office" that never opens the envelope: MQTT connectivity and reconnects, command-response and events, logging and telemetry, device authentication by certificate chain, OTA from S3, an API spec and SDK for the firmware. ecobee is one of three Generac business units on it; since the Well-Architected review it trends to active-active across regions with roaming devices, with nonces against duplicate messages.
  - **ICS** (ecobee, AWS, Go microservices) opens the envelopes and routes and translates to the GCP services. To build: **Device Shadow** for config and state (the RTOS firmware can't parse the XML), telemetry and log storage that feeds the admin portal without moving piles of data between clouds, **device groups for broadcasts** (every thermostat in a city or on a utility), and the plumbing for OTA triggered from the admin portal.
  - **GCP backend** stays for at least two years, with no move to AWS planned: one portal and one app, homes that mix old and new thermostats, and a device's user and home kept in GCP. An AWS–GCP private tunnel went up the day before the call (test messages only).
- **The firmware**, a separate ecobee team under separate leadership: rewritten in C/C++ on **Zephyr RTOS** (from embedded Linux) to use less memory, which is expensive. ecobee designs the board and picks the sensors; the SoC isn't chosen yet, and the firmware team works ahead on eval boards. It implements the UDMP SDK and is expected to mature more slowly than the cloud side, so ICS starts on simulators (perhaps in Docker). Also on the thermostat: BLE for onboarding; RF remote sensors whose pairing fails in some homes (the protocol is under review); Matter hub support on the roadmap, not ratified; sirens, whose commands need guaranteed delivery; OTA-delivered applets later. Ideas on the table: an offline mode (the thermostat as a local Wi-Fi network in an outage, then state catch-up with the cloud), LTE backup for future cameras.
- **Roadmap.** (1) the new thermostat, greenfield; (2) the installed fleet moved onto the new path by firmware update; (3) the cameras; eventually the GCP broker services ("core", "communicator") retire and ICS is the only device path. Firmware reaches the fleet about once a quarter today; ecobee wants continuous delivery with canary groups. Design target ~20M devices.
- **Timeline.** Employee field trial (boots, connects, OTA, logs, basic heating and cooling) ~Q4 2027; launch ~Q4 2028; ~7 internal releases through the end of 2027. A bottom-up thermostat schedule is being built and leadership wants it closed before Q4 2026 ends; the ICS schedule aligns to it.
- **Engagement shape.** Dave's team owns ICS; SoftServe's software people join around January and onboard until then; Dave asked to be challenged on the design. Budget route: AWS MAP funding through a SoW approved before year end (Oksana, citing the ask from "Jill" and Scott).

## Objections & risks
- **Not enough information to scope the MAP SoW** (Ryan: the DMP detail he holds isn't the ICS) → phase it, a scoping phase first; a plan forward for JL → open.
- **The interfaces between UDMP, ICS and firmware aren't agreed**: primitives sit in ADRs and the payloads are known, but there is no end-to-end spec, and the blocker is ownership across three teams → alignment hoped for by year end, realistically in 2027 → open.
- **The firmware lags the cloud side** → ICS builds against simulators and mocks → open.
- **No AWS IoT experience in the ICS team** → Ryan assembles training resources (Device Shadow first); SoftServe brings subject-matter experts → open.
- **GCP changes need other teams** (capacity, politics) → engage the owning teams, or SoftServe's team raises PRs for their review; a shim on the GCP side only as a fallback, which Dave dislikes → open.
- **Cross-cloud data cost** → process telemetry in AWS, move data only when needed → open.
- **Duplicate messages and failover across regions** (Jarek) → the DMP uses nonces (Ryan) → resolved for the DMP; GCP as a single point of failure behind it → open.
- **Device registration is split** (UDMP authenticates hardware and firmware; GCP maps a device to its user and home) and not yet aligned between ecobee and Generac → open.

## Commitments & next steps
Theirs:
- Dave → ask Steven for documentation or a deeper ICS session → that day or early the next week.
- Dave → share the new-thermostat and ICS schedules once the bottom-up plan exists → "in a matter of weeks".
- Ryan (AWS) → a set of AWS IoT training resources for the ICS team (Device Shadow, eventing, broadcasts to fleet segments) → no date.

Ours (SoftServe):
- Oksana → send first-half-of-day slots for the next week, for the deep dive → the next week.
- SoftServe team → review the documents, bring a plan forward to the checkpoint with JL "on Monday", and build a phased MAP request and SoW (scope, schedule, AWS consumption), its first scope likely Device Shadow → approved before the end of 2026.

## Open questions
- The kickoff's date, and what JL's Monday checkpoint decided.
- AWS consumption for the MAP request (Steven holds pieces of it).
- The size and roles of SoftServe's January team, and whether Device Shadow is all of phase 1.
- The UDMP's ICS-facing API and SDK: what is agreed, and who owns which commands.
- The firmware team: its leader, its size, the Zephyr and SoC timeline, and how it will test against ICS before boards exist.

## Notable quotes
- "we expect that the firmware will be a bit slower to like mature enough to plug into all of this" (Dave)
- "it's a little bit more on the political side than the technical side" (Dave, on API ownership)
