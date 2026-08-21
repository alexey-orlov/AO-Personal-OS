# SBG scoping workshop 2026-08-17 — FULL transcript (diarized)

_source: fuller diarized transcript supplied by Alex 2026-08-20 (Speaker A–J labels). **SOURCE OF TRUTH for this meeting — supersedes the two 30-min partials** ([part 1](2026-08-17_sbg-workshop-transcript-1of2.md) · [part 2](2026-08-17_sbg-workshop-transcript-2of2.md)); Bohdan's [debrief](2026-08-17_sbg-poc-workshop-debrief.md) and Dmytro's [scope draft](2026-08-20_sbg-poc-scope-draft-dundych.md) remain interpretations._
_Captures the meeting end-to-end: introductions → PoC-vs-MVP challenge → reference case → process walkthrough → challenges → package-design debate → scope options → close (timeline + data session). Diarization is imperfect — Speaker I merges several SoftServe voices (Bohdan mostly, plus Dmytro/Karsten/Khalid Soudoun intros); Speaker H merges Dr. Ramadan with (likely) Rahim Bondo. Some name tokens are garbled ("Matt", "Laura and Ophelia" ≈ NVIDIA and Oracle, "Oracle iCloud" ≈ Oracle cloud EPPM)._

**Speaker map (inferred):** A = Ahmed (SBG, digital transformation / AI / IoT) · B = Raja (+ a few mis-attributed lines) · C = Volodymyr, SoftServe delivery lead (= the notes' "Waldemar") · D = Milo Honegger (Oracle) · E = Muhammad (SBG — addressed so by Raja) · F = Taras (SoftServe) · G = Eng. Mustafa Isa (SBG VP Commercial; also carries the room-intro lines) · H = Dr. Ramadan (+ likely Rahim Bondo) · I = SoftServe merged voice · J = Ahmed Obaidah (Oracle SE)

_type: source material — read-only. Distilled state lives in [sbg-poc.md](../sbg-poc.md)._

---

Speaker A: and in digital transformation, in addition to AI and IoT. So looking forward to work with the team on this initiative.

Speaker B: So Ahmad will be engaged with us heavily on this initiative to ensure we meet our objective. And you know the other team members, we have Ilyas and Dr. Ramadan as well and his entire crew, I can see.

Speaker C: Maybe a quick intro, if you don't mind. We have also new people on our side joined recently. Maybe I can start and then pass the stage to your team, Raja, if you don't mind.

Speaker D: Yeah, yeah, sure.

Speaker B: I would appreciate the business team as well from Ramadan to introduce himself. But after you.

Speaker C: Okay, okay.

Speaker E: So sure.

Speaker G: Yes, Ramadhan as manager.

Speaker H: Shiri Bakr as senior cost manager.

Speaker G: Ramid cost control section head.

Speaker H: Rahim Bondo senior planning manager.

Speaker G: Mazen Najmami planning section head.

Speaker C: Okay, they're a little bit noisy when you're speaking, guys, not very sometimes clear. So if any options you can turn the microphone would be nice for the session onwards. Um, so let me start from my, myself introduction. So I am from SoftServe, I am on the delivery side. It's actually, uh, we, uh care about the AI projects together with Oracle Endeavor, so working with different customers to identify use cases, to shape them, and actually implement. So I am on the implementation side. I wanted to move to the delivery, so I am responsible. So, and yeah, I'm always concentrating on the technical projects especially currently NVIDIA Oracle cutting-edge technologies. So, and then I pass the stage to Bohdan.

Speaker I: My name is Bohdan, located in London as you've heard in the beginning. So I'm part of our AI R&D group focused on the Oracle practice and direction that we developed there, the pre-built packages based on the NVIDIA stack that we will be working on today with you, as well as the technical excellence in the Oracle native stack, AI Database, the AI Lakehouse, and the Fusion Apps. Nice to meet all of you. Pass over to Taras.

Speaker F: Hey all, my name is Taras Romajak. I'm located as well in London. I'm responsible for the technical overview of our AI-related activities. So I had prior experience in building AI platforms, on building the orchestration, and as well a lot of algorithmic optimization in GenAI, computer vision, etc. And it's a pleasure to meet you. And I pass my word to Dmytro.

Speaker I: Hi everyone, my name is Dmytro. I'm R&D product manager, also covering business analyst responsibilities. I currently focus on document intelligence and extracting information from complex documents and multiple data sources. On this project, I will help connect your business process and data with the POC requirements and ensure that results is useful for the people making packaging decisions.

Speaker G: Nice to meet you all.

Speaker I: And we have Karsten on our side.

Speaker B: Yeah, my name is Karsten.

Speaker I: I'm taking care of our partnership with Oracle And as well with NVIDIA. Nice to meet you all.

Speaker C: And we are complete on the software side. Milo, do you want to go around on Oracle?

Speaker B: Sure, sure, sure. Hello, everyone.

Speaker D: Pleasure to be here. Finally excited to kick these things off more formally. I'm Milo. I'm the, let's say, the single point of contact from the Oracle side for this AI Accelerator project with Saad Bin Laden Group and BIHG. And in Oracle, I'm part of the EMEA AI platform team based in Switzerland, Zurich, and my role is director AI and data. Looking forward to working together.

Speaker H: Great.

Speaker I: السلام عليكم جميعاً صباح الخير. My name is Khalid Soudoun. I'm part of the business value services team, and I am the client engagement lead for Billaden. I've been working with Billaden for for about three years now. the past 3 years, and I'm very happy to be here today to discuss with you and kickstart this project.

Speaker J: Assalamu alaikum everyone, good morning. This is Ahmed Obaidah from Oracle Solution Engineering team. I'm also on the Oracle side representing the application and the solution architecture part. I'm based in Saudi and supporting Billaden for the last almost 10 years now. So wish you all the best and thank you so much.

Speaker G: I'm Mustafa Isa, VP Commercial First Priority for Saudi Bin Laden Group, and I have my team here with me.

Speaker H: Nice to meet you.

Speaker C: Then I think we can move to folks in the room. If we can have round just of the quick introduction.

Speaker I: No bedrins nakomijuna le mic.

Speaker G: From coast control department.

Speaker B: Yeah, let's start, but the, the voice from the meeting room is not very clear. Maybe it's only for me or for others, I don't know, but I think we'll try to We'll try to communicate better. Go ahead, go ahead, Milo, go ahead, the floor is yours.

Speaker C: Okay, so maybe, Milo, if you wish, we can start.

Speaker H: Go ahead.
