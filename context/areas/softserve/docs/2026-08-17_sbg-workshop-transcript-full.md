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

Speaker C: Yeah, so from the SoftServe, we appreciate this meeting. So through the several rounds of the sessions, we already identified out of 3 sessions the one use case, potential one, which we can use for as AI use case. So now in the meeting, we wanted to this workshop to discuss more current process of the planning team, the potential, the future-to-be process, what the business problems we have, and how we can and identify actually in the end requirements to the POC, proof of concept solution. Dmytro, would you be so kind to share? I know we prepared from our side some board that we can discuss with you, and before that we would like to a little bit onboard with the process for the workshop that we have. Yeah, if we move to the beginning, So currently, as I mentioned, our workshop is intended for the discussion, for the justification and confirmation about the business case and collection of the requirements, and we will be doing this on this like exemplary project that you gave to us to validate, including the data availability. So actually this workshop is intended to prepare and check all necessary items before actually planning the start date and move on with project start. And this workshop actually split by some timetable, so we can, as we already opening and to do some introduction session, we wanted to discuss with you First of all, some reference case studies, as we mentioned, then we move to discussion about, by SBG team, about this process, how you guys working, and on the exemplary project you will show us, display how the chain flow is working at your site, what the problems you also have and how this AI intelligent solution can help you to improve and speed up some of the activities, operational activities at your site. As well as we will move to success criteria and then discuss about the data availability and how actually our POC gonna be structured in terms of the time scope, and we will wrap up this by the end of the workshop. And if we move a little bit here, just wanted to remind us about what did we select for our use case, because I believe there's some new people also joined our team, and CBG team, and this is good to make a pause actually and look about the use case. So as use case, we selecting the project packaging strategy optimization, and our intention here to look for the historical data about the existing projects and identify some, I would say, some deviations between the planned versus actual scope and schedule per work packages, identify common patterns, and give this at your hand for the historical insight analysis. And during This project?

Speaker B: Yeah. Sorry, just to— any clarification so far from the business team? Because these are very important and we need to understand the objective from SVG team, from our business team. We have new faces today and new team, a few members from Mr. Mustafa team as well. So Dr. Ramadan, Engineer Mustafa, if you have any clarification so far, from you or from your team, please, please feel free to interrupt and clarify.

Speaker G: Thank you, Mr. Raja. Thank you very much. There's just one concern for me, especially that, you know, we're talking to big players like Oracle and the partners. Are we still thinking of proof of concept at this stage? It's just an open question. Why do we need to go to proof of concept? Remember, we're doing something that is more or less standard, which is the, you know, planning cycle. And maybe I would have thought we skip the proof of concept because it's already proven the advantages of AI and digging into data and coming up with things. There are even AI-enabled scheduling software out in the market So really, that's selling. So are we going to go through this long journey? And it's tedious, it's long, it's expensive. Uh, what is the rationale of proof of concept rather than moving to MVP or, you know, just getting the thing off?

Speaker B: Sure, sure. Um, the, the— see, for MVP, uh, we would plan for an investment, uh, uh, from, uh, from SBG and BHG side, but we have not reached the stage there yet. This proof of concept is a joint, uh, you know, collaboration and an investment from NVIDIA and Oracle themselves. So we, we are not investing anything here. So, um, it's, it's an interest from all the parties here. So they want to invest with us, uh, and, and because we have a huge potential for a collaboration with with NVIDIA and Oracle. So that's the rationale behind it. So once we have the proof of concept and once we achieve the outcome, um, we will, we will present our investment. We will work with them and understand other use cases as well. We will estimate our further investment in this technology and then we will take it to board. So at this stage, I think we should focus on, focus on this one subject, uh, one use case, and then see where we head. Because everywhere we hear AI, AI, but— But we need to see the value out of it, and then we can go ahead and invest.

Speaker G: It's an internal investment. Yeah, we need to prove it. So I understand the IP side is taking care of.

Speaker B: It's all. Yeah, it's taken care, and we have an understanding from both the management. So we don't need to you know bother about that during this session. So. We can focus on the technical part. We can focus on making this work. Rest of the things, it's in line.

Speaker G: No worries. Thank you. Thank you. Thank you.

Speaker H: Sorry for the interruption. No worries.

Speaker J: No worries.

Speaker A: Thank you.

Speaker I: It's a very important question. I just want to add one comment there that it's to the point of Rajapal that Mustafa, it's not the proof of technology in the sense. It's proof of more like value, right? So we try to understand that exact business case with the application of this technology and your data would work, right, and will help to get the benefits that you expect without yet scaling to the production setup, you know, because it requires integration and other complexity elements that we need more time to explore, right? So that's the main focus.

Speaker B: Okay, any questions from Dr. Ramadan and his team?

Speaker C: Okay.

Speaker H: No, no, it's okay, please proceed.

Speaker B: Okay, good, go ahead.

Speaker C: Okay, okay, thank you. So, and yeah, we will be building this proof of concept based on the NVIDIA and Oracle technologies like OCI and Oracle AI accelerator parks, which enable actually to speed up technology-wise proofing of the solution. So as well as like we will have some like more technical project activities, and we will discuss this on the discussion for the KPIs or what we intended to do. Then actually, this is from the introduction perspective, we also have the reference study, if we move on the bottom. So this is actually what software, what we, the partner, already did implementing the different technologies, and I pass the stage probably to Bohdan to get overview.

Speaker I: Yeah, so we just want to share that as was mentioned by also Mustafa, the technology is ready for a long time there, right, and And we know that it works. And from our experience of working with the construction domain, with the US-based partners, we know that that brings the value. And this is just one of many examples where we've been applying the technology for the construction setup. In this particular scenario, situation was a little bit different from where we are. So partner already built solution. That was an AI-powered solution to work with the complex construction dataset. But the problem was that when it was introduced to production, the accuracy was 23%. So that's the bottleneck. And from our experience, we know that it's very important to have a proper solution set up to get to really decent accuracy level. So what we did, we developed the production evaluation framework. And for you just to get an idea, that's what's important to understand whether AI is doing right or it's drifting from the correct answers in order to be able for subject matter expert team like on your side to improve the datasets, to improve the solution. And then over that collaboration, we managed to take the solution from its, you know, from its state and move to 81% of accuracy. to justify the actual business case, right? Because if it's such a low accuracy as 23%, the team will be spending more time on just reviewing the outputs and there will be no speedup. You can't trust it, the solution. You can't move with that in that automatic manner. But when you reach the 80+% accuracy, that's the threshold where, you know, when you can be confident that, like, you will save more time while reviewing the results rather than doing that from scratch. So essentially, this is an example of the very similar direction of his case where we helped to move it to the actual production, also to make you confident that we know how to make such setup, especially with Oracle and NVIDIA technology.

Speaker A: If you allow me, actually, just to— if you can go back just to the previous slide. I wasn't involved in peer discussions. So if you just go over very quickly, what are we trying to do in this proof of concept? From what I understand is you're going to take the full data of 3 to 5 completed projects and you're going to evaluate if the AI will help us in future projects or not. Did I understand here correctly?

Speaker I: So that will be validating today with you. Our assumption as for now is that we will take those 3 to 5 past projects you mentioned, and we will compare the planned and actual data if you measure the performance of those projects. Something like whether delays happened, there was some insufficient subcontractor usage, or others, and we'll help you to get kind of insight from the previous projects. That's our assumption number 1. Then we will relate together with you whether these insights can impact your future projects, right? So that's— those are the 2 value points which try to understand. First, speed up your time of evaluation of the performance of previous projects to make the right decision about vendors, procurement, and stuff. And second, how can it impact the future new projects so you can set up it with its more informed insights manner? So that's essentially 2 points, Ahmed, to your point.

Speaker A: Clear. For the security of the data— or sorry, for the privacy of the data, I believe a lot of these data data is related to clients. So handing it over, I'm not sure what policies we're following. Also, in regards of training AI module on those data, are you going to train the AI module on those data or not? Or only the data is being used for this project only?

Speaker I: So data will be used.

Speaker D: Maybe I can jump in here quickly.

Speaker H: Great questions.

Speaker D: So I think for the privacy data security thing, question that you asked, Ahmed, we have basically got an NDA in place, right? We have the master services agreement between Oracle and BIH, the SPG, and there's an additional NDA between SoftServe and SPG that is already in place. And of course, for the second question on training the AI, the data that you provide is exclusively used for this project and it's going to stay in OCI, right? So OCI, Oracle Cloud Infrastructure. It's not used to train any other AI project or LLM or anything like that.

Speaker I: Go ahead.

Speaker A: But I just wanted to say that for now, we just have an assumption and we're going to decide how to move forward in this meeting.

Speaker H: Yes, clear.

Speaker A: Thank you.

Speaker H: Thank you.

Speaker C: Okay, so let's then move to the— sorry, let's move to the next part of the discussion. If there is no question about the reference case study, we can start our workshop internally and we would appreciate if we, like, from project planning, from project control team, from business team, we can identify the current process. Maybe you explain more and show us examples based on the reference projects. So thank you.

Speaker I: Yeah, so here we can see our assumption, how we do see the process, right? So first you project planning and then define work package definition. But even that assumption has a lot of minor details. So, Tim, if you can explain please, how does it work, uh, who defines the packages based on which criteria, and how is it standardized across different projects? Let's start with this step of the current process so we all can understand it better.

Speaker C: And also, yeah, and please don't hesitate if you have already some overview. You can just take control and show it your side.

Speaker I: And just in case, in the room you are muted, so so we can't hear you. No.

Speaker G: Okay, Jim Mustafa, can you speak about these steps? And we will show them our data, our files, after you speak about the process.

Speaker H: Unless we are talking about the standard process happened currently, Starting from the tender phase, actually this doesn't reflect exactly what happened because actually we have the process of planning starting from before this shown in the front of us because we we always starting from the tender phase. Engineer Mustafa, you are not muted.

Speaker G: Okay, it's a good question. I would—

Speaker E: you see, we can look at it 2 ways: pre-tender, post-tender.

Speaker G: That's one way. And the other simpler way is to look at the typical project. In reality, you know, when you win a project, the project director comes And he starts the process exactly like what you have here, gentlemen. It starts with project planning. In fact, you know, the project director starts deciding how he wants to think of this project. So I would like to skip the pretender bit for the time being, and in the future we can revisit it. But, you know, I want to leave the floor to you, PMO department, to take it as if now we have signed the contract, we have a project director in place. What is the process that you typically follow for a new project that you just signed? So maybe, you know, you can get started on this.

Speaker H: Actually, this exactly happened because starting from the hiring or assigning the project director, he started putting his vision how to accomplish the scope within the contractual duration and budgeted cost. post to the required level of quality. Thus, based on that, he had prepared his own construction methodology, how to execute the scope. He started to prepare his packaging strategy, which is shown or demonstrated in front of us, how to break down the scope to packages, which package will be executed, self-execution, which by subcontractors based on each discipline qualification of, or, and the capabilities of the self-execution, or if we are looking for know-how from specific specialist subcontractor, something like that. Based on that, all these data is reflected on the baseline schedule.

Speaker I: I'm sorry if I might a little bit interrupt before we go to the actual scheduling, because this is a very important question, right? You outlined that a project director is responsible responsible for selecting the work package strategy. And the question is, it's very interesting, how does it typically happen? Is it, is there some standardized criteria that this person uses across and it's applied across all the projects? And if so, how does those criteria typically stored internally at SBG?

Speaker H: Recently we are working as a central EPPM using Oracle iCloud to have standards for all the company. We are working recently also to make it as— to deal with this as a portfolio for the overall corporate level. But we are talking now about project by project. and not at the level of corporate, to— because, you know, we are working not only in a specific area but on maybe some project all over the Kingdom or maybe abroad. So maybe you have some capabilities of the subcontractors allocation based on geographical location in all over the kingdom. So some may be in the eastern zone, maybe in the central zone, maybe in the western zone. So we have to respect the geographical location of each subcontractor in addition to their capabilities. I hope that covers your query. Before I open—

Speaker I: So those are 2 things, like central database to inform the decision using Oracle, and second, as you mentioned, the geographical and capabilities definition of the subcontractors, right? I understand that correctly, that you have kind of centralized databases, let's say, one that has to some extent the standards on approach to the project and other is related to the subcontractor database, let's call it like that.

Speaker G: No, I don't agree with what you said. Let me clarify here. I think you are Podan?

Speaker I: Yeah, of course.

Speaker G: It's a very good question you asked. Your question was what goes behind the decision to subcontract versus self-execute? And is it a formal procedure or is it an ad hoc one based on the, you know, the tacit knowledge of the project director, the circumstances at the time?

Speaker D: Exactly.

Speaker G: Is that understood from your question?

Speaker I: Yeah, this is the next step of the question. Yeah.

Speaker G: Okay, okay. The answer is very simple. It is totally ad hoc.

Speaker I: Okay.

Speaker G: Okay. And it depends on the tacit knowledge of the project director based on the conditions at the time. Mr. Bunduk is right. He said, you know, it's corporate versus project. Here we're talking about strong matrix with weak matrix. What does the project director do when he's appointed for the project? And as you correctly said, really these things should start at the tender stage. The company should be knowing how it wants to approach this project. That's the theory. In reality, each project director comes in and he has his own, let's call it, preferences. So he will look at, you know, the variables and the facts on the ground, and he will come up with a plan. That plan may coincide with what was prepared during tender stage, or it may not coincide, or coincide fully, partially. So all the conditions are there Of course, he is controlled by a DOA, the project director. So let's say, you know, when you're packaging, this relates to supply chain. So supply chain, is it projectized? No, there's threshold and it's centralized at a certain threshold. So things are interrelated. You know, when he makes a decision about subcontracting, It's a big decision and many factors play into it. One obvious factor is the available resources. So as Mr. Buntuk said, you know, they are— they have a PMO that looks at all projects and, you know, resource leveling across projects, for example, so that we don't have people maybe even in certain regions like Riyadh Central Or maybe we're in a very remote place where it does not make sense to send our people. It makes more sense to use the local contractors in that remote area. So you've asked a very difficult question. In fact, you know, it's, you know, so many variables that go into it. Now, if you want to use AI to dig into the data available, You will find the facts, but you will not understand the rationale behind these facts. If you know, maybe you do reverse engineering on it. I don't know. And maybe that's where AI is strong.

Speaker I: So what you're referring to is that it might be hard to get rationale or criteria of selection of, for example, this particular subcontractor or subcontracted versus self-performing based on the current completed data of the projects, right? That's what you mean?

Speaker G: Yes.

Speaker I: Okay. Because just to share here the insight with you that with AI, it's very powerful when it has this context, right? Because you and the team are the experts and they have this context in their head, like for example, project director. And if AI has this context as well, the way of thinking, the criteria, then the decisions might be very powerful, right? But if it lacks this context, so we will need to think to which extent or whether it makes sense to enrich the context for AI if it doesn't exist yet to be able to get that, you know, that kind of insights quality, right? Because as you mentioned, if it might not be obvious, that might be— obviously, I see that as a potential risk there. Okay, thanks for sharing that. Maybe some on our team side has some additional question on the work package definition or execution model side at that stage? Okay, so let's proceed to the scheduling. Sorry for interrupting you, Dr. Ramadan and team, so we can— you continue to go with the scheduling piece so we can proceed to that very next step.
