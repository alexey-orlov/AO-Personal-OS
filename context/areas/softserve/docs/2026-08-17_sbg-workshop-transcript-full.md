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

Speaker H: Excuse me. Well, actually, I, I, I, what was stated by Engineer Mustafa, it's very crucial. And this, I think, clarifies some issues related to the how it goes. for the previous project. But actually, we need to highlight that we started since about 2 years a central department called Corporate Planning Department, called, as stated by Engineer Mustafa, Control Department, who take the lead starting from the tender stage and try to standardize The the schedules, the projects, the the process and procedure for the overall project from early stage, which is the tender. Preparing taking the same process and procedure, the same quality of all the projects scheduled. This is never contradict with the vision of. the project manager who in this stage may be assigned/not yet in this stage.

Speaker G: Right.

Speaker H: So we need at this stage to take the lead from the corporate control team, and we started already this process for— in the new project such as 7 projects. Stadium project, Jeddah Tower project. But for sure, the point raised by Engineer Mustafa related the supply chain and to have the portfolio for the subcontractors database, all that not yet activated as stated by Helmut self. So, but I just wanted to raise that at this stage, recently we have, as we said, new corporate planning department who took the lead starting from tender until the— when this finish, when this lead finished by the approval of each project baseline schedule. So we have one step ahead starting from the tender Between cost and planning to understand the project and to with the hand in hand with the each project director. Once we get, once we get, do you want to add something, G Mustafa?

Speaker G: No, no, go ahead, go ahead. I fully agree with what you said, hundred percent.

Speaker H: Yes. So after we reach to this stage, we got the approval. The project director took the lead. He started assigning his own team mobilized on site. Then all the control shifted with the project manager or the project director to be for completely 100% from site after signing the contract.

Speaker I: So sorry, the qualification question. of this new department, the goal will be to have a smooth transition, as you mentioned, from the pre-tender stage towards the project planning stage, and the transition of, let's say, knowledge and artifacts towards the assigned project manager.

Speaker H: Not only that, but the one we have due to limited staff, we have the people who started the project starting from day 1, maybe they— a lot of scenarios. Maybe they shift to the site themselves with the project manager or the project director, and this happened, this scenario happened. Maybe they transfer— we transfer those roles to be the project sponsor from the corporate control department, maybe like that. So he— they will— they have real knowledge. about the project since day 1, and they continue hand in hand because all of our target win-win strategy with the project director. We are not— we have just came to take the lead starting from day 0, let's say. After, any question?

Speaker I: No, no, no, thanks for clarification. Go ahead.

Speaker H: Starting from this stage, we can go now only and only now to the node or the code execution. And this execution we transfer from planning to control. At this stage, we have again the standard methodology for how to control the project. We have standard— we are not here working— Before we go there, I just want to confirm what stated Very valuable information by engineer Mustafa that previously it was projectized. They working in island for each project based on the old strategy because he only the one who know what happened in the project and it was it is very hard to penetrate that this privacy for and this separate island doing the new strategy this give us. an opportunity to penetrate each project with our one step ahead, as I clarified before, and working hand in hand with each project. So we try not only to be weak matrix, but— or functional matrix. At least we have a strong matrix working with the projects, each project. And to have more transparency, more clarified progress status hand in hand with the project to confirm the transparency. So starting from that, we go to execution. Execution, as I said before, we have to— we cannot dictate the projects about the control 100% methodology because we, as you know, in construction industry, we have plenty of stakeholders, internal and external, and the lead for sure with the client and his supervision team, his PMC, PMO at site. So we have to respect their vision of how to control or how to, uh, measuring, uh, progress measuring tool. So we respect this criteria, but may— in the meantime, we need by any meaning to implement our earned value management strategy on site. It means that we have since day one, when we prepare our baseline schedule We inject this progress measuring tool to be able to see what is the actual earned value achieved and what is the remaining. Is it within budget, out of budget? And this role covered for sure hand in hand with the cost control department and the control team and the corporate, corporate control team. So whatever the progress measuring tool from the site, we— one of our roles to have earned value management controlling the site. This during execution, this is what I want to see. And regarding that, so maybe we have— if this progress measuring tool accepted from all the stakeholders, it's okay. If not, we keep this in addition to any other Progress measuring tool requested by each project stakeholders. Then this also cover the performance review with you, and if you want, I don't, I don't this exactly. I want clarify from you what do you mean with performance review?

Speaker I: So thank you so much for that overview. It gives a lot of clarity and also interesting maybe to dive in that progress measurement tool that you mentioned. But for performance review, so that's our core assumption here that we want to validate with you. So when the project finishes and you have this defined, as you mentioned, on the day zero, criteria, metrics, the vendor selection, and they are due after the project the review of the performance was, uh, you know, uh, lessons learned, uh, you know, planned versus fact. Um, so both qualitative and quantitative. I assume quantitative are happening in this program, this measurement tool that you have. But yeah, curious to learn more if there is the formal procedure of doing review after the completed project and comparing the plan to Clear question, uh, and I—

Speaker H: this exactly what I just wanted to confirm, that this what you mean.

Speaker G: Yeah.

Speaker H: Uh, it is— we are talking about the same coin with 2 faces. You are talking about the quantity, I'm talking about the earned value. The quantity executed, when you multiply with the price, From the BQ, you will get the earned value. So this, if we plan, if we plan, if we plan for the, uh, we have planned quantities, uh, uh, we versus the actual executed quantities, we can, we always present the standard Projects KPIs, maybe SBI, maybe CBI. CBI actually it is not that easy because we we have to get drop internet as usual like that. We have to. I'm talking to you.

Speaker G: I have to connect to you. Yeah, yeah.

Speaker H: I'm just connecting.

Speaker B: Sorry.

Speaker E: What's the last time?

Speaker I: Sorry, we stopped hear you. I don't know if that's intended or yeah, continue to talk, but we stopped to hear you.

Speaker D: I think the room also froze, right? Yeah, my connection went.

Speaker I: Doctor, Doctor Ram. Can you hear us now?

Speaker G: Yes, yes.

Speaker I: Yeah, I think, I think we haven't heard the last minute because I think you get frozen and muted. So if you can repeat, please, if there— if you describe that performance part in more details. You stopped at the project KPIs are presented, I assume, at the end of the project and monitored throughout the project. But if you can elaborate More details on that.

Speaker H: Yeah, and I give you. I just give you two examples as I told you. So we we usually present SPI and CPI. SPI directly from the schedule we can get it. But regarding the CPI, we it is not that easy because sometimes it needs some confidential information related. to finance, related to actual paid expenses. So it is not maybe internal presentation or something like that. It is not common to present that. So I actually, I just want to add something. Sometimes we deal with what you call performance. Here we deal with this as the Efficiency. What is the meaning of efficiency? Efficiency, I noted that I transfer the quantities to manpower. So when we based on productivity manual, sometimes we after we execute, our colleague raise his hand. You can ask the point.

Speaker I: Problem.

Speaker C: No, no, please continue. I will ask my question after your explanation. So you mentioned that you do the evaluation also by efficiency, comparing the manpower planned versus actual. But my question, so you mentioned about collection of the key KPIs of the projects, CPI, SPI, and the end of the project for the lesson learned. Are you doing this per whole project or per each work package too?

Speaker H: Actually, I mean, we are now, as clarified by Engineer Mustafa in the beginning, We, we have current status and we have targeted status which we are moving to. And we already, as I told you, we started since 2 years working to achieve this. So it is not that far, but we already started. But what currently we are dealing and presenting project by project because also we cannot— sometimes you cannot take standard from project to project. We need to agree together with the corporate level to agree how to unify the progress measuring tool on the portfolio level because sometimes, as I said previously, Some stakeholder, client stakeholder, even requested to use man-hour as a progress measuring tool. Some clients, they requested to use money as a cost. Sometimes they, they want to use something third or fourth progress measuring tool, mix it between any 2 ways. So you cannot until we agree about how to combine all by specific way, we cannot mix all together in one way. I hope that it's clear.

Speaker C: Okay, understood. And my last question would be, is there any Post performance of the subcontractor is is collected or to be collected as part of this reorganization.

Speaker H: Again, we we as as I I. It is it is a So if you have the progress measuring tool ready in one baseline schedule and separated by packages, as what it— by activity code, by activity ID, by any meaning, by the end of the day you can take any fragment as you like if you have the overall progress measuring tool which will rolling up to the project level. So when you segregate the project work packages, work breakdown structure, to which level, or you create new fragment based on the subcontractor work package, you can take this fragment and with the implemented with the progress measuring tool, which is cost, which is the earned value, which is man-hour, which is whatever And using back-to-back with the subcontractor. Clear?

Speaker C: Okay, yeah.

Speaker H: I hope that's covered your point or your question.

Speaker C: Yeah, yeah, it's covered. So this is part of your strategy for bringing the performance tool for the measurement of each such work package KPIs. And we actually thought like if such insights about the performance between the subcontractors and the variances would be beneficial for you to know as historical data available from the projects.

Speaker H: Actually, what you are talking about is very crucial and this is a real challenge. We will not. I mean, we are talking transparently. What I am telling you, this is a challenge for data collection and transparency back to back with the project between the legacy projects and new projects. We we are working hardly, and we put we evaluate. The role of NVIDIA, Oracle, XYZ to enhance the transparency and make by clear and restricted transparency strategy for data sharing between each group with the managerial level for hit or miss.

Speaker C: Okay, thank you.

Speaker I: Yeah, that, um, that's, uh, clear. Thanks for sharing that. And, um, um, also trying to combine our— obviously the, the goals of the future POCs that you'll go to it right now because they always finish on the SE state and this big goal. So, um, where you are currently in terms of that enhancement of data transparency strategy process. You mentioned a couple of points already. This is the progress measurement tool, right? But is there like some already governance how to share the data between projects in place. So that's already, let's say, part of our historical data that you provided, or it's something that's to be done in order to be able to share those data between each project to the extent that it's possible transparently. Also, it provides the insights.

Speaker G: Let me answer this. All these projects are within the SPG domain, so, you know, it just follows the DOA— who's authorized to see what. But of course, you know, at the central head office, each department gets to see all the related data for all the projects. So PMO, for example, I'm speaking on their behalf, they get to see everything that's related to schedule and cost control for sure.

Speaker I: From other projects?

Speaker G: Yeah, from all projects.

Speaker I: Okay, so that's to some extent already in place. You can go and, and check those data, but it's maybe not automatically collected project director need to go and explore it, right?

Speaker G: Correct.

Speaker I: Okay, so if you're talking about the biggest efforts point there, what would you say takes in this process the most manual time and how often does it happen, right? For example, collection of certain data, For the— if you're talking about the goal of establishing data transparency between the projects and measurements of the insights, what currently takes the most time, the most manual time? Maybe on behalf of project director, maybe on behalf of the planning team, maybe all together.

Speaker H: You are asking about the Regular, can it, uh, regular reporting duration?

Speaker I: Uh, on the stage after execution of performance review, right, when you try to do this, uh, when project is finished, right, and, uh, or maybe on the project, maybe even on the project planning phase, right? So, uh, maybe for the reporting collection, this is the biggest time effort. Manual-wise, or it's done automatically, or yeah, Milo, go ahead.

Speaker B: No, no, no.

Speaker D: I just have two or three additional questions once before we wrap up the essay, just to ask at the end.

Speaker B: Okay.

Speaker I: So so then maybe at this point, just just trying to understand on initially if we went through all the stage, we made some insights, right? But if you would say on all the stages for project, you know, director and and and the team who who tried to to when they try to gain certain insights, which step is the most manual and time-consuming right now from your perspective? And yeah, and it takes a lot of manual time to complete.

Speaker G: Look, let me try to answer this question. It's a very good question. It depends on the level of granularity we want to reach when we're reporting. You can report the whole project as just 2 numbers. One is the cost and one is the schedule where we are. That's at a very high level. So we will not know at the project level what they used to consolidate these numbers. So that's one way of looking at it. So the other way is at every node, every activity, man-hours are measured and costing is done. So that's the other extreme. And then you have me. And in fact, this is where I think AI can do a fantastic job. look at this fragmented, unstructured data that comes in different formats, multimodal, and it can get insights from it. So rather than asking us which part takes the most effort, it depends on the project itself, the project director, what's the project director focusing on measurement, What is the central PMO pushing the project director to report on? So, you know, it's— you have all the answers there. But my recommendation to you, since we're talking about, you know, a POC here, maybe this will be the outcome from Looking at all the data, not the other way around. Data science. Okay, so, you know, it's a two-way interaction, it's iterative, human in the loop, you know the whole story. But good question, thank you. Yeah?

Speaker D: No, I agree.

Speaker I: Okay, thanks for explanation. Milo, to your part, you had a few more questions.

Speaker D: So, you know, just as the discussion was going on, I was just writing down 2 or 3 things. I think they're not related to any— just one of the boxes, basically, of these, you know, 6 boxes that you see on screen, but more to the SS process today. And the first question I had was, you know, when you— so how well does the original hypothesis— you said you have a central control department, right? lay out the plan, the hypothesis for the project execution, the timeline, and the packaging, how well does that overlap in your experience now from these past 2 years with what the project director or the project manager then does after? Does he like usually follow it? Is it very superficial? And then, you know, things in reality on the ground are very different, so it's thrown out of the window and he does something completely completely different, or what is, what is, what is your first, what is your first insights from the first 2 years of transitioning to this new operating model? Is it totally different, or does it follow in line, or vary case by case?

Speaker G: I intentionally don't want to answer this and leave it to the PMO team. Okay, good. And then let me—

Speaker H: I think this is related to each project is unique.

Speaker A: You can just— but you can—

Speaker H: it needs to be tackled case by case. You cannot pick one hypothesis and follow it as a standard horizontally for all of the projects. This is by multiple—

Speaker D: I understand that, but what you said is that during the pre- pre-tender stage, they will come up already with a timeline for the specific project at hand, right? They will have milestones, they will break it down into different phases. And so my question to you is, how well does that original plan that comes from corporate align with what's being done in the end by the project director, what's being decided?

Speaker H: Very, very good question, but it— this is one of the strong voice for SPG as a huge company with long history in construction industry. We have the capabilities who can have 2 scenarios. If this is in tender stage, sometimes we have specific time for for the project execution. So they are the one who— that we have the capabilities to judge if this is logic or not.

Speaker E: Correct.

Speaker H: Logic to be achieved, is it applicable or not? This is scenario number 1. Scenario number 2, we go to the logic or the achievable timeframe and we put it on the table with the client, what we have. So this is a very strong part in SPG for decision-making, as we call it in our meeting, from square zero for each project.

Speaker D: Very good.

Speaker H: Thank you for elaborating on that.

Speaker G: Let me give you, you know, further input. Answer, in my opinion, is very rarely has execution come even closely to our original assumptions.

Speaker H: Very rarely.

Speaker G: In the past, in the old past and in the recent past.

Speaker J: Okay?

Speaker G: For many, many reasons, and maybe these are the insights we will use AI to dig into the data and, you know, come up with. Yes, absolutely.

Speaker D: That's— no, thank you for elaborating. It's what I was sort of expecting as an answer. You know, my question there would really be like, I almost feel like there's a feedback loop missing back, you know, because over time, if that original hypothesis is bad, you would also expect the feedback loop to be there. And then for Central or corporate to get better over time as it learns from the experience on the ground, so on and so forth. But we don't have to worry about that. Let's dig into the data later on.

Speaker G: But so to your point, you know, in all fairness to PMO, they are getting the feedback from the projects and they are getting insights and they are reporting in their executive management on this. Comes the question, how reliable is this data coming from the projects themselves?

Speaker C: Yes.

Speaker G: There are always, you know, side stories to every story. Of course. I understand.

Speaker D: And then it's not just the question of how reliable is the data, the question is also, is the data acted upon and so on and so forth. We get into a whole can of worms there. But anyway, have you, have you, or, you know, have we ever tried to understand, like, if overruling of central planning by, you know, a project director has an impact on the project delays, quality shortcomings, cost overruns, and so on? This is something I would expect us to look into, right?

Speaker G: But I can answer Easily, we have a recent case. And please, gentlemen, Dr. Ramadan, Mr. Bundug, everybody, please interject. We have the recent case of King Fahd Stadium. It's a very fast-track job with the ultimatum, and we spent a good part of nine months where the project director was isolated, sitting in Riyadh, making. decisions without the support of headquarters. That is a case that everyone knows about. Good night, gentlemen.

Speaker J: This is—

Speaker H: we are not working in a factory, we are working in construction industry. So this is common practice here. It is, it is really challenges from day to day. I answer certainty for a lot of constraints related to time, related to risks, related to—

Speaker G: so— Sorry to interrupt. The question here was not this. The question here was the impact of projects going solo. Did we— do we have examples of this, and was there an impact? So A live example, we lost a good part of 6 months in King Fahd Stadium, and then we had to take remedial measures, very, very harsh ones. And you guys as PMO were not getting the feedback from the project to the level of details that you guys wanted. So they reported at a very high level rather than even, you know, by sector, by zone, by package, by, you know, trade. You weren't getting that feedback because the project was isolated. Later on, it's a different ballgame altogether. So that's an example. And, you know, records are there. Maybe, you know, when you dig into them, you'll find some—

Speaker D: Super, thank you so much. That's very helpful. Last question from my side, a bit political. Feel free to not answer. Maybe it's also something we see in the data later, but just, are packaging decisions by project managers, project directors sometimes relationship-based versus based on overall cost, quality, scope, past experience, and so on and so forth?

Speaker G: No comment. Okay, understood.

Speaker D: Good, let's move on. Tony, thank you so much for your answers, really appreciate it. Let's continue with the agenda.

Speaker I: Yeah, so I think, uh, uh, any more questions?

Speaker C: So Yeah, let's move on. Thank you.

Speaker I: All right, yeah, go ahead. You have hand raised, do you have something to ask?

Speaker D: Oh, sorry, sorry, let me take it down. It was from before.

Speaker G: Okay, perfect.

Speaker I: Uh, so, um, We have another step, right, Mudra, around the challenges and business value. We already touched that, so I'm not sure to which extent we would go deeper into the actual problems because you mentioned that the current goal of the data transparency strategy, obviously, that there is the challenges of explaining the variance, maybe the variances that happens during their performance at the package level, and the execution model visibility is limited, right, because of the high project director ownership. And that's something that kind of can be on the side of the challenges that we identified, and I think they are confirmed by our conversation. And in terms of the Like value that solution of the challenges can bring. Obviously, if there are the transparent insights, it can reduce cost and schedule for the future and improve the subcontractor resource planning model, maybe work packages decision, and have transparency with kind of comparable evidence why that or the other, you know, option is better for this particular project. Anything on this side to say that this is the most important, this is the least important from your side, or kind of this is in general good pain points from your perspective? Because I think that's where we want this to double-check with you, where our assumptions are correct.

Speaker E: I think from my side it is missing a challenge that the company assets are not considered. You may grow for the decision that subcontracting in historical data for roads packages has a bad performance in cost and time. So you decide, or the agent suggests, that it's going to be self-execution. But actually the company doesn't have the required equipment to execute this package for road slabs, for example. So you should also consider the current assets, experience, and the equipment that are in the company to be used for self-execution. Sometimes you may have to go for it. For this, some— we have some work packages we call it special packages. Usually we subcontract these packages because we don't have the experience or the equipment to do it self-execution. So this is one of the charges I think it is must.

Speaker G: Okay.

Speaker A: If you allow me just to go a little bit high level, to make a successful proof of concept for construction projects or for an entity such as SBG, where you look at, you know, 3 to 5 completed projects and you conclude, make some conclusions and assumptions based on that data. I'm not sure how this can be successful because there are a lot of information that is not there. This is construction, so maybe the whole project is stopped because maybe cash flow is not there, maybe some other issues. And this you would not capture it in data. So for a proof of concept, why are we looking at a very long process that requires huge amount of data and all data should be accurate? One missing information will really affect the whole outcome of the proof of concept and the conclusions. I'm just thinking loudly here. I'm not sure. But I feel we the scope of this POC is bigger than it should. Why don't we focus on one set of process that where we can guarantee that all the information is there, all the data is there, and then we can utilize AI? Because if the data capturing is legacy, if the data capturing is not there and we put AI, you know, it's junk in, junk out.

Speaker I: So yeah, that's a very good point, Ahmed. That's actually what's our next step, right? Try to narrow it down to the actual scope of the POC. So I think it's a very important point, uh, and, and, uh, let's, let's prepare the rest of the discussion there. So we know that how the overall problem and strategy looks like, understand it better. And now, yeah, what can be the actual feasible scope of the POCs that we can do? based on the already available data and the insights that we just discussed. Maybe from SBG side perspective, if you can share, and based on what we just discussed from this kind of— and we can go maybe also to to-be target state already, but it's also to-be target state of overall process, right? Not of the subset of process. So let's let's brainstorm together what can be that first point that you think if we take, we can have available data and and get.

Speaker H: Excuse me, excuse me. I I think what stated by our colleague Ahmed, it is it is very crucial. Switch but let's rephrase it. It he he he raised it. I I can rephrase it to. be single line of truth. Single line of truth, this is very crucial for us as a pain and as a challenge, which it is a very essential advantage or beneficial from any application like that.

Speaker G: Uh, let me interrupt here.

Speaker A: This is—

Speaker G: remember we spoke earlier about this, why AI, why not just standard ERP? So, you know, typically ERP, everything is deterministic. You bring AI, it's probabilistic, heuristic. It's able to look at hazy data and come up with insights. In fact, this is the reason we are getting into AI because it will be able to get insights from fragmented data. So the single source of truth is not necessarily needed in this proof of concept. In fact, if there is always one single source of truth, we'll just continue with Oracle ERP with the standard workflows, you know, Machine learning, the whole thing in a basic way. We're getting into the AI world because it's probabilistic. You sense things from fragmented data. So I hope you guys— I think one thing you need to do is, you see, Ahmed mentioned something very important. Instead of digging and looking at that, you know, since maybe this data is not representative, and that's something very important in AI, your data that you use should be representative. My argument here is, okay, we'll not start with representative data, but with human in the loop, we'll improve with time. with further insights, more samples getting into the model, you know, it improves with time. And, you know, you mentioned the 82%, for example, in your first slide. So it is a journey for us and we will be improving as we're progressing. We're not going to, you know, have high accuracy rates or single source of truth At all from the beginning. And this is where actually AI is very powerful for us to get insights from the fragmented data that we have.

Speaker I: So if you turn it into the process, right, I think, Mustafa, thank you so much for sharing that point of view. And we can validate also with everyone if everyone is aligned with that vision. If so, let's take it as a working assumption that this is what we are targeting. Maybe Dr. Ramadan and team, are you aligned with that vision as well, or any additional thoughts, comments from your side in terms of the scope, how you see that? Okay, so what we want to define now is the is the stages of the target flow of the POC that we want to develop. So our current assumption was that we have historical samples of the package context, and the process will be that currently user manually uploads all the context around the particular project or its work packages. After that, and then the question, who will be that user? Who will be the target user of such insights generation? Just also for us to confirm, is it project director or is it some different role for whom those insights about the project will be the most valuable? Is it correct to assume that this is project director, project manager?

Speaker G: Yeah, yes, it's the project director.

Speaker I: Okay, so the process will be that, uh, the, um, after the project is completed, right, the project director uploads the data to generate the, um, to run certain process with AI. And check if all the sources are missing, or maybe AI proposes what sources are missing or information is not covered. And then the report with the proposed decisions are generated. So let's discuss in more details when does it happen, this process.

Speaker G: Is it—

Speaker I: We'll tackle the process of project performance review and completion. Right stage or some other step? Maybe from that perspective you can share inputs. Uh, based on retrospective data, I would assume it's performance review of the project step, right? Oh, it's in the middle of the project.

Speaker G: Can you hear me now?

Speaker B: Sorry, can you hear me?

Speaker H: Yes.

Speaker E: Okay, sir, you were muted and they were talking. Um, I think that I'm totally not aligned with this process because, as per my understanding, the main purpose of this agent— we have a main delivery and the secondary delivery. The main delivery is to design the packages itself of the project. The secondary delivery will be to make it subcontracted or self-execution. But let's firstly begin with package design. For example, should I give the insulation of the steel structure under the steel structure package, or should I group all insulation work for insulation package? Should I make the concrete package including purchasing of the steel reinforcement, or should I make another purchase order different for the steel bars, and then I provide to subcontractors. Such decisions are part of the package design itself. The process— the process here starts with the user going to review comparable historical packages. This means that the user already has a package and is going to compare it to the previous historical data. No, this is the second step. The first step should be that the user gives the agent the new project POQ scope for contract document data, suggest the package design itself. When I give it to the whole scope for the new project that we are already starting, or it has been contracted, whatever, the agent suggests to me the packaging design, the package itself, which means split the POQ into packages, group some lines, separate some lines, relying on the historical data. So I think that should be the first step. I don't know if you agree with me or someone has a different opinion.

Speaker I: That's, that's, that's a very valid point. Um, I think that's, that makes sense, right? If you are talking about a project design stage, right? That's the stage we are talking about. I believe, yeah. And in that context, within the retrospective data that you provide, do we have this information that was collected before the project was started, or what data does it include? Does it support—

Speaker E: Prime contract, BOQ, and the agent should do it in SPC way to design packages for this new project. So yeah, answer is yes, we have the data for historical projects and we have the data of the new projects. Okay, this is just my opinion. I'm discussing it with my, my team and my colleagues.

Speaker H: Actually, I, I don't agree with this.

Speaker E: Yeah, please.

Speaker H: Actually, I don't agree with this because this completely under the, the decision should be based on the decisions of the project director or project manager who will decide maybe, and the strategic business perspective as overall, maybe they will take it all subcontractor as one general contractor. From up, maybe they will break down until the level of discipline overall. This is decision yes or no, up to which level they will break down the project. Maybe they will go to the level of doors, hardware and software, hardware and wood and leaves and that. This is all the decisions of the Subcontractor. We cannot give the key of this decision just for AI. There are some essential decisions need to be taken strategic since day one.

Speaker E: But if the agent is just supporting the project director or is it serving to think? The agent, the AI will not take the decision. It will just support the decision maker which is a project director. With ideas, but he is not enforcing the project director to make this decision. It is just a tool for the project director to think faster and more accurate. Just a tool, not a decision maker. The agent is not a decision maker. He can chat with— first proposal of the agent can be make roads packages, steel packages, and concrete packages. So the project director will chat with him.

Speaker J: No.

Speaker E: I'm not intending to give the steel structure in one package. I need 3 subcontractors. So the agent will give another suggestion. Okay, I have separated the steel structure into 3 packages as you asked.

Speaker H: So what is the strategic business of the corporate in this project? Mainly that I am the corporate, I want to make this as a subcontractor.

Speaker E: He mentioned it's this in use. This is a step he makes, record the human decisions and the previous one. We can add it. Yeah, we can add it to the agent that it should collect ideas from corporate and from project directors. At the end, the package plan will be approved by the COO. At the end, he should go to the COO and approve the package plan.

Speaker G: Gentlemen, I think we're all saying the same thing, including our partners. We are in a journey of discovery. The idea is we will use as much data as we have to analyze, to get insights into our historical performance and what has worked and what hasn't worked. And to what you said about using the agent to, you know, create packages. That's the clerical side. It's, of course, you can use it. It's easy, you know, tell the AI, please, you know, package in one lot all the electrical riser diagrams and, you know, make it a package for, you know, bus stops. It can do that. So that's— That's the transaction side. What Pundit is talking about is 100% correct when it comes to making such big decisions. We'll use AI. You are also correct. We'll use AI. We'll query AI to give us insights. So for example, I'll give you a very simple example. Decision at the moment. This decision is ongoing in Seven, whether to self-execute concrete or not. And Billal, for concrete, it's the largest in the Middle East. I mean, we have formwork valued at two billion riyals. So we are really big in concrete. So should we do Seven as self-executed for concrete? or subcontracted. Now, AI is not going to help us, you know, make that final decision. It is a very difficult decision that we need humans in the loop to do— not in the loop, a human to do it. It's not optional. Maybe in a few years, AGI, that will happen. But now, for the next 3 years or 5 years, we will need to make these very commercially important decisions. We will use AI to support us with data and insights. But at the end of the day, it will be the human who will do it. To get there, there is a journey which It's what we are doing right now. We're collecting the data, we will structure it, we will analyze it, and then, you know, we'll come to a point where, you know, our partners will create workflows that will put agents in the loop to help us in this process. So, and I've spoken enough about this, bring it back to you guys.

Speaker J: Sorry.

Speaker C: If I may say, I really appreciate Dr. Mustafa and Ramadan for feedback and your PMO team negotiation. So I believe we definitely talking about the same but just different time scale. So you guys talking about maybe end-to-end flow, how would you envision this, and in the end the agent can help you to create a fully automated packaging based on the historical data. But we wanted to start smaller, so being— so this AI so-called assistant will help you to get more insight when you do design and planning. So when you— we can discuss minimalistic end-to-end flow which you would expect for the POC, so you already gain some results out of this and can validate rather than, you know, trying to tackle the big elephant in the room. Yeah, and yeah, I really appreciate the discussion because this is very good direction and alignment between all of us on the target like end-to-end flow. Yeah, Taras, thank you.

Speaker F: Yeah, so just to jump in here, basically in the majority of the projects that we are delivering, there is still some human intervention and there is no idea to fully automate the process, but rather to support you on all of the stages. Why we're having this discussion is to understand what are the most time-consuming parts and bottleneck parts of your processes. Because, for example, just to give you some ideas, maybe they will spark you into some direction. So sometimes it's even access to the data because you need to make the packaging decision based on on the data that you have or maybe previous engagements or something like that. And even accessing the data can be a time-consuming part of the process. So sometimes we are helping to optimize this process as well with AI. So there are some like RAG system, context engineering, and other directions just to provide provide you all of the relevant context, all of the relevant insights on the stage when you're making the decision on the packaging. So still you are making the decision, human, but context engineering just like reduces the time for you to access data. It can be with all of the citations. So as well, you— there will be no like trust issues on the AI decisions because like we can support with citations for the relevant data. So something— think about that in this direction.

Speaker G: Yeah, with RAG you may get lost for lineage and traceability, but that's a technical thing. We'll talk about it later. And within the context, if you're going to use RAG, then maybe the full lineage Won't be there because you don't know what to prioritize.

Speaker E: Yeah, sure.

Speaker F: That's why we can switch to context engineering. But indeed, as you mentioned, this is like a technical direction. I just like jumped in not to focus on the full automation, but rather how technicalities can help you on different stages. But generally, Dr. Mustafa, with everything that you mentioned, like I am Sorry.

Speaker J: That's a—

Speaker C: maybe we can get back to the design, like potentially flow this POC outcome, if you can look here. So, um, so this is a flow to be state. Let's say that you have a and you're doing the planning, pretender planning for the project control, and you wanted to validate some of the like work packages. You already have like your historical and relationship information built in on the work packages, so you have these work packages and agent have access to the historical information when you upload several projects. So let's see that project manager, project director, they are making, collecting the work packages, making assignments of subcontractors, and then they are providing this information to the assistant to qualify this decision. With the outcome, like based on historical data, the agent, this assistant, I try to call this assistant because it will not make the full agent flow, the assistant provides to you citated output like what the subcontractor will be better to use for the reason of this, like based on the historical records of the performance for this subcontractor versus not subcontractor, of course, as well.

Speaker G: Absolutely.

Speaker C: So how do you— what is your opinion regarding this flow?

Speaker H: Regarding the historical packages, is there any way of or kind of analysis for this historical packages? Because if we are just going to take it as it is, maybe it will be misleading in our upcoming awarding of new packages. Because maybe, for example, if we didn't do good, for example, in Some packages before, but this is not related to any matter of this package. Maybe it was wrong choice of subcontractor. Maybe it was poor management in this project.

Speaker G: Maybe cash flow issue.

Speaker H: Yeah, client. A lot of a lot of reasons before we go to next step. We need like, for example, some analysis for historical packages.

Speaker C: Well, the macroeconomic influence is also possible to add, but I would suggest to limit the scope of the POC to based on your information from the project yet, like actual performance. Planned versus actual performance, and based on this confidence, get the information insights from the data. And in the future, extending the end-to-end flow, we can look about the macroeconomics of the subcontractors, maybe ranking them separately and including those into insights of the work. cash flow, macroeconomics, you mentioned probably asset requirement potentially, if this data can be accessible inside your organization as well.

Speaker H: I would give another more worst scenario that if we have the blacklist subcontractor generally, where we face— lead us to failure in different events, various events before in different projects. Those learned lessons and for previous projects and this effect on the decision-making for new projects, this is a real trap happen for each project director or project manager, new projects, if there was not the knowledge of the categories of the database of the subcontractors and their historical data to be shared. And it's a decision-making system, especially in this Because sometimes when you we have this in many projects, we find out that this again we are facing in new project due to missing this major information with decision making for the new projects. The issue how to do this in in our stream. And injected that this is compulsory to be checked or taken into consideration before decision-making?

Speaker C: Okay, I left this for our product team, how it is possible also to make such a list based on the insight on the subcontractor performance. But from my perspective, like, it's should be possible, right, to evaluate the subcontractor by performance execution for versus planned versus actual, to create a list and use this list as evidence in the citation for decision, right, team? Yes, sure.

Speaker J: If I can answer this question from the solution engineering side from Oracle, I believe yes, this will be supported with the with the procurement domain and the subcontractor management domain in Oracle as an application backside. And there are some agents to support you in this, to give you a complete list about the performance of the subcontractors, their historical trend and progress with the previous projects and ongoing contracts as well, and can recommend even who's the best-performed subcontractor by trend, by discipline. by region in order to be like shortlisted recommended subcontractors for each discipline. So this part can be used at a later stage within this selection. So we can get use of this after taking the decision that I will go with subcontractors who can be the recommended ones to work with.

Speaker I: And that apart functionalities is already accessible to SBG team, right?

Speaker H: Actually, excuse me, excuse me. This case which I just put it on the table, this is a disaster case, but I am— I can take this disaster and clean case. But what I can assign also, or raise, maybe this is only Sometimes we reach to the level of the highest capability of subcontractors, but they again submit for new projects behind their capabilities, which was clear in the efficiency of their ongoing project. So I just confirm that I heard you are talking not only about completed projects, but also following or monitoring the Attitude or the performance of the subcontractors in the ongoing projects.

Speaker J: Yes, exactly, exactly. This is important: complete evaluation, reevaluation for the ongoing contracts and for the closed contracts as well.

Speaker H: Yes, because this I think is something of the yes from the supplier performance.

Speaker J: Reviews, whether the suppliers, vendors, subcontractors, consulting designers. So anyone that you are dealing with through the procurement and the contract department. So this is an ongoing performance review and evaluation review. It can be from quality, performance, delivery, and so on.

Speaker H: So it can be reflected in this streamline, yes?

Speaker J: We can, yes, we can use it in this. So this is one of the inputs, but I believe I will leave it to Bodan and Waldemar if he can confirm how we will do the selection or the comparison between those 2 streams. But this is one of the inputs that you will need from the application side or from Oracle side. But I believe to make it consistent, we need to agree how the project director, or we need to understand from the project director is how do you do this kind of comparison or study between the 2 streams? So I believe there will be multiple inputs to decide whether I will go to self-execution or subcontractors. The capacity of my internal manpower— do I have the available manpower or not? The available equipment or not? The capacity of the procurement department to work with me for the procurement, delivery, and inventory for the materials. The risks for all of this. This is self-execution, so there are 4 elements for the self-execution. And on the other side, the subcontractors who are available in the market, if they are local subcontractors or international ones, do we have enough cash flow or not? If this stream or discipline, for example, dominated by subcontractors only or a certain subcontractor, so I don't have a choice. So I believe After putting these criteria or the selection inputs by the project director, we are currently doing it manually and recording this data from different inputs. By that, we can agree what can the agent help you and how can, you know, dispatch or how can it access this data and give you a recommendation. So we need inputs from the application, from the costing, from the financials, from the internal manpower, from the internal material, equipment, and so on.

Speaker I: Yeah, this is—

Speaker J: if you can simulate, if you can do something like simulation of the project director without AI, without applications, how they are doing this manually currently on the running projects, and we can take it from here to I think, Ahmed, you've been interrupted.

Speaker I: We cannot hear you now. I think the point of Ahmed was clear, right? To do that kind of criteria of selection and identify the necessary data we need. So let me just say, like, 2 minutes of that. So we agreed that this particular flow for the self-service with vendor selection will be the primary flow of the POC. or those are 2 parallel flows, one kind of for the project design from the input documents based on the template, and second is like selection of the, um, and decision on the supplier list. I'm just trying to connect the dots here, sorry, and correctly put the, um, correctly put the the boundaries for that initial POC scope.

Speaker H: Actually, now you— the scenario which proposed by you, this may mean that we already skipped this period milestone, the decision taken by the project director, and now the ball in the court, in the side of the procurement, ARB, and decision-making for the— before, between the subcontractor/vendor list. We are— what we are discussing now is to take proactive decision from the project director starting from day 1 in the project.

Speaker I: Okay, so, uh, what, what, uh, uh, so initially, right, we discussed that, uh, we'll need to get the inputs from, uh, 2 sources, right? Uh, one is, uh, from the, um, information that, that the information about the new project is available, another collect data inputs from the project manager and team, and then use the comparable historical packages to create the templated project design kind of format document. That was kind of the one particular flow that we discussed, and I'm referring to that flow.

Speaker C: Yeah, but the guys, as BG mentioned, that on the screen currently there's a flow is post-planning already. Like, you have already—

Speaker I: Yeah, here it's post-planning. Yeah, it's kind of, it's a different flow. So we agreed that we are focusing on that project design step, not on the ones that we have currently on the screens, that is performance review, right? So we focus on project design, and on the project design we want to have kind of those 3 steps: get inputs from the project manager, information about the current project that is available, and then review comparable historical packages to get insights from there. Obviously, vendors— information about vendors is a big separate piece, right? And but then other available data, mostly it still will be about the subcontractors' information, and then create the target project design document that can be a recommendation for the project manager, and then they can iterate with it, giving, for example, different sources of data or getting some other inputs or ideas. Is it the correct direction, or it requires some adjustment?

Speaker H: Needs to be experimented. You cannot say like that from now.

Speaker I: Okay, okay. Um, so, um, Oliver, I see that we have 5 minutes left. We have that initial idea that we need to, to dive deeper into. Let's think how we can leverage that if you efficiently and then plan the next steps to fill the gaps of what we are missing to have the overall scoping being finalized.

Speaker C: Yeah, so from my perspective—

Speaker A: yeah, Raja, are you here? Sorry.

Speaker B: Yes, I'm here.

Speaker A: Um, to finalize the scope of the POC, or at least to choose what we are going to work on. I just have a suggestion and you are leading this. Why don't we receive by email, for example, what do you suggest from your side as Oracle and NVIDIA to focus on? And then, and what information is required for the POC to be successful? And then we can study it and reply back to you if this is what the POC should focus on instead of just deciding right now in the meeting. Because this is a critical decision.

Speaker H: If we don't—

Speaker A: if the data is not there, the POC will fail. Not because, you know, you don't have the system, not because the AI is wrong, because we didn't choose the right project or the right area where the data is available within the scope of the POC, within the scale of the POC that is being offered here.

Speaker B: I think we had multiple discussions before, and it's, it's not any one person decision. That is what I would recommend. The reason why we have the this workshop is to take the feedback from everyone, particularly from the business. So we are only facilitators. Though I'm facilitating, I'm coordinating, but it purely depends on the kind of data that we have and how comfortable businesses are sharing those data. And from the— from our and NVIDIA, what, what's possible to achieve in terms of the, the data available with us, right? So it's a freewheeling discussion so far, what I, what I have seen. But as you said, I think we have to agree on a scope, uh, not just by one person. All, all the relevant stakeholders are here, so So we have to agree on a, on a scope, you know, the achievable scope based on the data available. Okay, and end of day, I'm sure I have been listening to the conversation, we may not be able to cover the entire processes. There are 2 sides of conversations I've heard. So if we are not covering all the steps and all the processes, the outcome is not real. Right, so this is one, one part of the conversation. And the other side, we may not be able to cover the entire processes because some— somewhere the data will mislead because the, the data is not just, uh, um, you know, both internal and external factors. Sometimes the— there will be an issue in the cash flow which may not be able to capture as an insight to derive the output.

Speaker A: Right?

Speaker B: So the output, whatever we receive from this AI model, may not be accurate and, you know, cannot be considered as a basis for the new package. But all of this, we need to remember, this is a proof of concept and we may not be able to achieve, you know, 100% efficient outcome. Okay, so all that we are trying to do is the data that we have, the process that we understand, and the AI model that can develop based on the data and process knowledge that we have and bring an estimated outcome. That's the proof of concept. This is what I would suggest from my side. But once we go for a full-fledged investment, by the time— because we don't have a solid integrated solution in place right now, so we have distributed or isolated systems. The project control is running in a system and we don't have a solid ERP, and all these data are not integrated, right? So currently we are working on a consolidated unified ERP. So we will have the finance data, the subcontracting data, uh, we will have so much of integrated, meaningful, and the actual data and the planned data because we are planning to integrate the Primavera, we are planning to integrate the finance with the unified So we will have a full-fledged system by end of 2027. So once, once we have that system, all the data that we have are populated in these systems will be more reliable. Then we can, we can focus on the realistic outcome based on these data, right? So whatever the data that we have based on the knowledge or the process knowledge knowledge that we have. So we have to, you know, estimate an outcome and see this model works or not. So that's the whole idea of POC. This is my thought process.

Speaker C: I believe we're fully aligned with this strategy, so we will use the available data and can extend the end-to-end POC. see like project to MVP production stage later. But what is important topic is left after we discuss like potential scenarios of the use of this AI assistant is actually the data availability, and this is like was planned for like second half of our workshop. How would like PMO team, like project control team, Would like to proceed with project overview and data evaluation.

Speaker E: Regarding data, I was just imagining that the agent should be alive. It should be giving you the insights based on the updated historical data, and as two projects seven and Stadiums, they are already alive. They are ongoing.

Speaker G: It didn't finish.

Speaker E: So it should be linked directly to the data in the database itself, not to export the data and give it to you. Cost data and subcontractors data are already existing in Oracle, as Ahmed mentioned, and the planning data already exists in Primavera. So if we are going to export it today, we have updates and it's Transactions every single day, so it's not going to be realistic. So why not just link it directly to Oracle as we already are connected?

Speaker B: But Muhammad, we agreed we will not do any live integration with our system. Again, this is only a POC; it's it's not the real project, or we don't have any contract. That is my understanding.

Speaker D: So far.

Speaker B: So we will not do any live integration. This is a model that we built and we see the outcome as an— again, it's a concept. We are, we are testing the concept. We are not going to rely on the outcome.

Speaker G: Okay.

Speaker B: And you are not, you are not going to design your package, the next project package, based on this POC outcome.

Speaker H: No.

Speaker B: So you will We may not be able to rely on the outcome of this POC, but we are going to, you know, test the concept and see how this, this works. And, and we can— we will do the tweaking, we will take the learning, and then we will work on this in the investment. That's the whole point.

Speaker E: Any worries? But in this case, we should provide the raw data as exported from the systems so the Agent is trained of this kind of data, so in the future we will when we start linking it, it will be workable. But if we provided our manipulated data currently from the working files, it will be trained of something that will not be provided in the future, so it will totally be failing in the future.

Speaker B: Of course, I agree with you. I'm I'm saying only not to integrate, but providing raw data ideology. I'm okay with it. The data should not be manipulated by any means.

Speaker E: Okay, so what I'd like to provide, Roodat, as I supported, and I would like to hear from Jim Mustafa opinion in this point, if you allow me.

Speaker G: Yeah, okay. To your point, Raja, you know, you mentioned something fundamental. I think, you know, we should keep it in mind. For the next session. Do we test an end-to-end workflow regardless of the quality of data that we are going to input into it? That's one option. Or do we truncate the workflow on only the part of the workflow where we have sort of good quality data that we can put into that truncated workflow? I don't know the answer to this. Our partners should be able to— you need to select something. You see, the argument for the, you know, first proposal is improve with time. You know, the first batch of data may not be representative, may be distorted, you know, the whole story, and you improve with iterations. So that's an end-to-end. with bad or lesser than ideal quality data. So that's one option. The other one is we say no, let's do the proof of concept on a shorter or a segment of the full workflow where we have representative data that's of good quality.

Speaker I: I don't know the answer, but we need to think about this because I think, Mustafa, from, from my experience is that, uh, taking one particular segment of the workflow, uh, is, uh, but at the same time spending a little of the time during such a project to design the target workflow overall without implementing it might be the, you know, optimal balanced approach. Because if you take such a big ambition as taking the whole the whole workflow, the risk is that you'll get, you know, we wouldn't achieve the, uh, the result, uh, that we expect. But if you take a segment of it and start thinking in more details and design it, but maybe without yet implementing the part of that, of the, of the bigger, uh, workflow scope where you will need to make, you know, the future investment decision on, that can be the, the path.

Speaker G: Just a comment. It should not be a very small web view.

Speaker H: A very limited view.

Speaker G: Remember, already you're just picking one element of, you know, the whole construction cycle. So you're already limited. And to limit it further, you may not capture the story there, you know. So maybe if, you know, for example, you limit it to how do you select vendors, you know, for subcontractor, that doesn't represent the scheduling cycle, if you know what I mean. Or, you know, maybe you can drop some of the difficult elements from AI and let human, you know, intervene for them. But have a full scheduled workflow, but decide many elements of it will not be automated or will not have AI in it. So maybe that's, you know, an option.

Speaker C: But definitely we shouldn't take a pretty small flow, so we believe so it should gain still proof of value, right? So it's proof of concept which gains proof of value to move to the further stage. So, and we, as Bohdan mentioned, we can expand to design the end-to-end flow and check also the data readiness during the POC based on the Primavera integration or any other tools, Oracle tools, where the data is holding on. So, but for this POC, we can like took maybe 2 scenarios which we wanted to automate and based on the historical data, on the raw data that you have. The thing actually we wanted to ask you, like maybe we can have one more meeting dedicated to the data availability so you can guide us through what you have, like raw data export. And if you can provide this before the meeting, we can have a look also and be prepared as well.

Speaker H: Okay.

Speaker G: Yeah, yes, just for clarity, because I'm hearing the word agent, my understanding is we're not at the stage of making agents, you know, to do certain activities. That's not the purpose of this.

Speaker D: Yes.

Speaker G: Is that correct?

Speaker C: Yes, that's correct.

Speaker I: Yeah, those will be the recommendations, right? Maybe in the future state, some of the part of the process can evolve to that level of maturity, and that's obviously where the industry goes. But here we are targeting the previous state where agent provides— the workflow provides recommendations. We can call it rather workflow.

Speaker G: Yeah, I mean, why I'm saying this, because, you know, there are many initiatives call them ad hoc, call them one-off, call them personal initiatives, call them anything you want. And especially with, you know, having good models out in the market, LLM models, there's a lot of work that can be done today using these models. Okay, and it's automated doesn't mean, you know, us to have sessions like this. But my response to this, these are one-off ad hoc agents creation.

Speaker B: Mm-hmm.

Speaker G: It is not at this level, corporate level, of having something with an IP for the company going forward. So I agree with Raja, what he's doing, this is a representation of a lot of things going forward rather than a one-off person solution. You enter the computer, you, you know, you do a model and create an agent. We can all do this individually, but this is something different, and I would like to hear from Mr. Raja on this.

Speaker B: राजा मैंने इंटरेस्ट फ्रॉम योर साइड ऑन दिस। हाँ, आई एग्रीड। सो वी आर टेस्टिंग द कॉन्सेप्ट। आई जस्ट वांट टू रिएटरेट। वी आर टेस्टिंग द कॉन्सेप्ट ऑफ़ द मॉडल। सो आई डोंट आई डोंट थिंक वी कैन कवर द इंटर कंस्ट्रक्शन प्रोसेस हियर। या बट टू माय पॉइंट, सम पीपल आर Developing agents as we speak to do certain tasks.

Speaker G: Now, how does this reconcile with what we're now doing with Oracle and with video? I know they don't conflict, but if we want to roll out things at—

Speaker B: No, who's developing agents, Engineer Mustafa?

Speaker G: Me, I'm developing agents. I can develop agents on little tasks, chatbots, things. I can do that. Anyone can do that. But is this the purpose, or we're talking about solutions that can be embedded within our workflow?

Speaker B: No, I see. So far what I— We can build agents. So, but anyway, we need an investment, right? And we need to understand all of these processes and data available, and we have to build our own model. I don't think we have, you know, gone far with this conversation and we get into the execution of the model itself. I'm not sure why I'll be going back to that question, why we need this exercise with NVIDIA. Um, see, we, we, we can build agents. I know our team has built some agents in, uh, um, um, Copilot and other, uh, um, other, other platforms, uh, and, and that is, that is solving some of the purposes. They, they read the set of documents and giving you the, you know, the legal clause and quick check. And of course it adds value to the business. But on the other hand, we cannot deny the capabilities of NVIDIA and Oracle and the capabilities they bring to the construction sector. So we are just exploring. We are exploring.

Speaker G: To your point, Matt, it's exactly the point I wanted to bring. The importance of having Laura and Ophelia with us. And we are a bit— again, we have a lot of data that can be used to take this forward. I am 100% aligned on this. That's what I wanted to highlight.

Speaker B: Yeah, yeah, see, but again, so The whole exercise what we are trying to do is understand the processes. You want to go for the full process, as long as you have all the data and inputs for these processes, we can cover the full process. Or we can truncate the processes, certain, you know, take a certain input, couple of steps and see the outcome based on the data available. It's completely up to business what is practically possible, what kind of data that you can share, and the process that you can share and cover, right? So we have— see, okay, so we have 2 approaches here, okay? Either business, if you wanted to cover the entire process. Are we ready to share the data? Are we— have the practical data for all these, all these steps so that we can see the outcome?

Speaker G: Okay.

Speaker B: Or truncate the process, take a use case, because again, this is not a full-fledged contract, so we have a certain time limitation. Uh, take a, you know, few steps and ensure we have the data for these steps, and then we build the model and see the outcome. So again, we understand the concept, and then you extend it to a bigger audience, bigger processes, bigger datasets in, in a real project. So, um, this is what I would say.

Speaker I: Just quickly adding, Mustafa, to your point on how does it compare to like some, um, agents that can be created within just low-code or just in general with that, with the AI tooling itself that probably each of us does in everyday job to speed up their processes, right? So I think when everyone does it on a personal level, right, it's a different approach, different input data, context is different. So quality output is different and cost of that workflow is different. So that's kind of something that on the level of company like yours, it's hard to control and hard to ensure the consistency. And the goal here is also, if there are such knowledge already, as you mentioned, you build some agents for some of the steps of the workflow that helps you, that will be more than, you know, um, kind of encouraged to bring it there. And you think what can we incorporate that you already proven and, and made sense. But essentially the goal also to make it as some workflow that benefits everyone and delivers the necessary level of quality with optimal level of cost as well, right? Because cost is also important component there. So that's what I want to highlight as well. So, well, yeah, well, yeah, I am— I'm from your proposal in terms of additional kind of session on the data. I think it might be reasonably next step, and maybe between now and then we can think around that. We can refine the target user flow based on what we discussed. That can It's my proposal, but yeah, that's also—

Speaker B: I think we are running out of time. We have other meetings as well. We have to schedule another session to have the final scoping and decision before we could start your actual model, you know, start building the model.

Speaker C: Mr. Rajaj, I just wanted to— guys, I'm from engineering. I wanted to onboard you about the process quickly. Dmytro, can you go to the last slide for the timelines? Just timeline-wise, upon all our alignment, I wanted to stick a little bit to the— so potentially we see like for the project overall, for the kickoff, the beginning of September is a good time for the kickoff of the project, and for this time we can use the 2 following weeks for the alignment and data for the data alignment and the selection, what we wanted to do. So from our side, we debriefing the POV/POC scope, we are analyzing the data that you have and sharing with us, and we can kick off like beginning of September the whole project. And whole project actually will take 12 weeks, so we'll still do more detailed discovery, technical setup, and work with data. on the use case, so following with 2 to 4 weeks of the UAT and acceptance from your side. So the sooner we kick off the project, the better we will fit in our year enumeration, the calendar one.

Speaker B: Yeah, yes, so I agree. I think the first week of September we can kickstart it. We have another 2 weeks to define our scope and Check on the available data. I think we need to have one more session in this week, or I'm okay with it. I would appreciate listeners to participate actively as as we have done today. I really appreciate the efforts from everybody today sharing their opinions and stuff. I think the next next week. We should focus more on the data availability next session, and then we can we can start.

Speaker C: Mr. Rajah, maybe we can have a meeting on Monday the same time dedicated for data.

Speaker B: Yes, I'm I'm okay with that. Dr. Ramadan and Engineer Mustafa, is it okay next Monday sometime?

Speaker C: Just propose a slot time slot and please the same slot but in one week.

Speaker G: It's okay from my side, that's fine.

Speaker B: Okay, we'll schedule it.

Speaker C: Okay, thank you. And feel free to share the data we have already in place. If you can share some like datasets already from your side, from project, we can have a look up front the meeting and be prepared already asking the concrete questions.

Speaker B: Okay, but to the— to our business team, so to— you know what data to be shared with them, or do we need a checklist? Uh, you need a checklist?

Speaker H: It will be great if you share checklist, please.

Speaker B: Uh, yeah, please. I think last time there was a document shared, but it covers the entire Okay, we're prepared to release and share with the team today. Just an email, just share the checklist and whatever the data we'll have, we'll share a raw sample of data to you to look at.

Speaker H: Okay, thank you very much.

Speaker B: Okay, thank you everyone.

Speaker C: Thank you.

Speaker I: Thank you very much for your time today.
