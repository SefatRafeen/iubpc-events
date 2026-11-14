export type WingId =
  | "competitive-programming"
  | "software-development"
  | "robotics"
  | "cybersecurity"
  | "game-development";

export interface IubpcWing {
  id: WingId;
  index: string;
  code: string;
  name: string;
  shortLabel: string;
  kicker: string;
  description: string;
  accent: string;
  pillars: string[];
  stack: string[];
  url: string;
}

export interface IubpcEvent {
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  wingId: WingId;
  wingName: string;
  wingCode: string;
  img: string;
  tags: string[];
  synopsis: string;
  url: string;
}

export const IUBPC_WINGS: IubpcWing[] = [
  {
    "id": "competitive-programming",
    "index": "01",
    "code": "CP",
    "name": "Competitive Programming",
    "shortLabel": "01 \u00b7 Competitive Programming",
    "kicker": "Coaching & Faculty Tracks \u00b7 Dept of CSE",
    "description": "Transforming foundational problem-solvers into elite algorithmic competitors through rigorous departmental coaching.",
    "accent": "#3ecf8e",
    "pillars": [
      "Structured Weekly Tracks",
      "Intra-IUB Contests (IIPC)",
      "ICPC Regional & National Delegations"
    ],
    "stack": [
      "ICPC",
      "IIPC",
      "Codeforces"
    ],
    "url": "https://iubpc.org/wings/competitive-programming"
  },
  {
    "id": "software-development",
    "index": "02",
    "code": "SWE",
    "name": "Software Development",
    "shortLabel": "02 \u00b7 Software Development",
    "kicker": "Web, Cloud & Scalable Systems \u00b7 Dev Fellowship",
    "description": "Operating as an in-house engineering squad building resilient platforms, microservices, and internal club infrastructure.",
    "accent": "#7c6aef",
    "pillars": [
      "Production First Architecture",
      "Dev Fellowship & Builder Cohorts",
      "Active Codebases & Modern Stacks"
    ],
    "stack": [
      "Full Stack",
      "Next.js",
      "PostgreSQL"
    ],
    "url": "https://iubpc.org/wings/software-development"
  },
  {
    "id": "robotics",
    "index": "03",
    "code": "ROB",
    "name": "Robotics",
    "shortLabel": "03 \u00b7 Robotics",
    "kicker": "Autonomous Systems & Hardware Engineering",
    "description": "Designing line-following robots, robotic soccer squads, and autonomous rovers for national arenas and global delegations.",
    "accent": "#3ecf8e",
    "pillars": [
      "Hardware & Circuit Prototyping",
      "Autonomous Navigation & ROS",
      "National & Global Delegations"
    ],
    "stack": [
      "Autonomous Systems",
      "ROS",
      "Microcontrollers"
    ],
    "url": "https://iubpc.org/wings/robotics"
  },
  {
    "id": "cybersecurity",
    "index": "04",
    "code": "SEC",
    "name": "Cybersecurity",
    "shortLabel": "04 \u00b7 Cybersecurity",
    "kicker": "Offensive / Defensive Labs \u00b7 Threat Modeling",
    "description": "Training ethical hackers, reverse engineers, and defensive analysts through Capture The Flag (CTF) gauntlets and security drives.",
    "accent": "#7c6aef",
    "pillars": [
      "Offensive Labs & Penetration Testing",
      "Capture The Flag (CTF) Squad",
      "Defensive Hardening & Seminars"
    ],
    "stack": [
      "Capture The Flag",
      "Web Security",
      "Reverse Engineering"
    ],
    "url": "https://iubpc.org/wings/cybersecurity"
  },
  {
    "id": "game-development",
    "index": "05",
    "code": "GAME",
    "name": "Game Development",
    "shortLabel": "05 \u00b7 Game Development",
    "kicker": "Studio Pipeline \u00b7 Interactive Graphics & Systems",
    "description": "Fusing concept art, game loops, mechanics, and physics engines into playable builds for web, mobile, and expos.",
    "accent": "#3ecf8e",
    "pillars": [
      "Studio Production Pipeline",
      "Engines & Web-First Interactive",
      "Game Jams & Campus Builds"
    ],
    "stack": [
      "Unity",
      "Godot",
      "WebAssembly"
    ],
    "url": "https://iubpc.org/wings/game-development"
  }
];

export const IUBPC_EVENTS: IubpcEvent[] = [
  {
    "slug": "competitive-programming-orientation-2026-autumn",
    "title": "Competitive Programming Orientation 2026 Autumn",
    "subtitle": "Department of CSE",
    "date": "Nov 9, 2026",
    "wingId": "competitive-programming",
    "wingName": "Competitive Programming",
    "wingCode": "CP \u00b7 01",
    "img": "https://res.cloudinary.com/dvu2ihzny/image/upload/v1793604943/iubpc/event-covers/bi5iycdhpoc4rgglqpaq.jpg",
    "tags": [
      "Competitive Programming Track",
      "Campus Flagship Session"
    ],
    "synopsis": "Organized alongside the Department of CSE at Independent University, Bangladesh, the Competitive Programming Orientation 2026 Autumn introduced incoming problem-solvers to algorithmic thinking, structured weekly coaching tracks, judge platforms (Codeforces, VJudge, LightOJ), and the pathway to Intra-IUB Programming Contests (IIPC) and ICPC Dhaka Regionals.",
    "url": "https://iubpc.org/events/competitive-programming-orientation-2026-autumn"
  },
  {
    "slug": "icpc-asia-dhaka-regional-2026-online-preliminary-round-at-iub",
    "title": "ICPC Asia Dhaka Regional 2026 Online Preliminary Round at IUB",
    "subtitle": "Organized by IUBPC Competitive Programming Wing",
    "date": "Oct 30, 2026",
    "wingId": "competitive-programming",
    "wingName": "Competitive Programming",
    "wingCode": "CP \u00b7 01",
    "img": "https://res.cloudinary.com/dvu2ihzny/image/upload/v1782463697/iubpc/gallery/iitrwsnpee07akiqojku.jpg",
    "tags": [
      "Competitive Programming Track",
      "Campus Flagship Session"
    ],
    "synopsis": "Organizing Team Ahmed Zuhayr Hasan Organizer Tahmid Ul Alam Organizer Saiek Mahmud Khan Organizer",
    "url": "https://iubpc.org/events/icpc-asia-dhaka-regional-2026-online-preliminary-round-at-iub"
  },
  {
    "slug": "programming-week-summer-2026",
    "title": "Programming Week Summer 2026",
    "subtitle": "Organized by IUBPC in Collaboration with Poridhi.io & Department of CSE",
    "date": "Jul 25 \u2013 Aug 1, 2026",
    "wingId": "competitive-programming",
    "wingName": "Competitive Programming",
    "wingCode": "CP \u00b7 01",
    "img": "https://res.cloudinary.com/dvu2ihzny/image/upload/v1791066749/iubpc/event-covers/bumd5cwee1shzi0yq0es.jpg",
    "tags": [
      "Intra-IUB Programming Contest (IIPC)",
      "Tech Project Showcase",
      "Hackathon Workshop",
      "Intra-IUB Hackathon"
    ],
    "synopsis": "The Premier Summer Technical Showcase, Hackathon & Contest IUB Programming Club successfully hosted its flagship \"Programming Week Summer 2026\" , featuring competitive programming challenges, team hackathons, deployed project showcases, and mentorship from industry judges. 1. Tech Project Showcase More than 30 teams of 3-4 members participated with deployed, working projects beyond poster presentations. Champions: PIKU Robotics (Md Habibur Rahman Habib) 1st Runner-up: RoboCap (Syed Faizan) 2nd Runner-up: Error (Ramisa Islam Shreya, Suad Janeeta Rahman, Samia Jannat Mommy) 2. Hackathon in Collaboration with Poridhi.io From online submissions to high-intensity finals, top 20 teams built live prototypes solving real-world problems. 1st: RoboCap (Syed Faizan) 2nd: IUB_TechFreak (Rasheduzzaman Rochi, Mandira Paul, Fahim Shahriar Alif) 3rd: Team Doomsday (Syed Mehedi Hussain, Md. Mahmudul Hasan, Ridwan Hasan Khandakar) 3. Intra-IUB Programmin",
    "url": "https://iubpc.org/events/programming-week-summer-2026"
  },
  {
    "slug": "iubpc-recruitment-summer-2026",
    "title": "IUBPC Recruitment & Problem Solving Challenge Summer 2026",
    "subtitle": "Official IUBPC Intake Summer 2026",
    "date": "Jun 8 \u2013 Jun 10, 2026",
    "wingId": "competitive-programming",
    "wingName": "Competitive Programming",
    "wingCode": "CP \u00b7 01",
    "img": "https://res.cloudinary.com/dvu2ihzny/image/upload/v1782406436/iubpc/gallery/t7axbb5l1lafzzg0vkvi.jpg",
    "tags": [
      "Recruitment Registration & Interactive Booths",
      "Problem Solving Assessment Challenge"
    ],
    "synopsis": "Summer 2026 Flagship Recruitment Drive IUB Programming Club successfully completed its flagship recruitment drive for the Summer 2026 semester, witnessing an overwhelming response from enthusiastic new entrants. The event marked a significant expansion of the club's community, bringing together passionate students ready to enhance their problem-solving, project development, and coding skills. Recruitment Registration & Interactive Booths Problem Solving Assessment Challenge Recruitment Registration & Interactive Booths Venue Campus Concourse Reporting 9:00 AM In-person and online registration drives connecting freshers with wing leaders. Facebook Post Problem Solving Assessment Challenge Venue CSE Labs 1, 2 & 3 Reporting 2:00 PM Comprehensive problem solving test assessing logical aptitude and algorithmic agility. Visual Archive Event Gallery & Moments Photos and captured memories from this event. Full Club Gallery View photo View photo",
    "url": "https://iubpc.org/events/iubpc-recruitment-summer-2026"
  },
  {
    "slug": "national-innovation-quiz-fest-grand-finale",
    "title": "National Innovation Quiz Fest \u2014 Grand Finale",
    "subtitle": "Collaborated with Bangla Innovator",
    "date": "Apr 17, 2026",
    "wingId": "competitive-programming",
    "wingName": "Competitive Programming",
    "wingCode": "CP \u00b7 01",
    "img": "https://res.cloudinary.com/dvu2ihzny/image/upload/v1782454189/iubpc/gallery/f5fktq9rw2tu80nu4asr.jpg",
    "tags": [
      "Preliminary Elimination Round",
      "Grand Buzzer Finale & Prize Giving Ceremony"
    ],
    "synopsis": "Fostering Innovation & Academic Excellence IUB Programming Club (IUBPC) collaborated with Bangla Innovator to successfully host the Grand Finale and Prize Giving Ceremony of the National Innovation Quiz Fest The event celebrated young talent and academic excellence, awarding top innovators in the university auditorium. This partnership highlighted IUBPC\u2019s commitment to fostering innovation and supporting national-level student engagement. Preliminary Elimination Round Grand Buzzer Finale & Prize Giving Ceremony Preliminary Elimination Round Venue Auditorium Hall Reporting 10:30 AM 100 written questions spanning technological history, computing milestones, and science. Facebook Post Grand Buzzer Finale & Prize Giving Ceremony Venue University Auditorium Stage Reporting 2:30 PM Prize pool BDT 25,000 Total Prize Money + Honors Crests Top finalist teams battle on stage with electronic buzzers and rapid-fire questions. Visual Archive Event G",
    "url": "https://iubpc.org/events/national-innovation-quiz-fest-grand-finale"
  },
  {
    "slug": "iubpc-recruitment-problem-solving-spring-2026",
    "title": "IUBPC Recruitment & Problem Solving Challenge Spring 2026",
    "subtitle": "Official IUBPC Intake Spring 2026",
    "date": "Jan 25 \u2013 Jan 28, 2026",
    "wingId": "competitive-programming",
    "wingName": "Competitive Programming",
    "wingCode": "CP \u00b7 01",
    "img": "https://res.cloudinary.com/dvu2ihzny/image/upload/v1782459993/iubpc/gallery/qaoosnhgqhfcfobijhqk.jpg",
    "tags": [
      "Recruitment & Wing Induction Sessions",
      "Problem Solving Challenge Round"
    ],
    "synopsis": "Expanding the Community for Spring 2026 IUB Programming Club successfully completed its flagship recruitment drive for the semester, witnessing an overwhelming response from enthusiastic new entrants. The event marked a significant expansion of the club's community, bringing together passionate students ready to enhance their problem-solving and coding skills across all five club wings. Recruitment & Wing Induction Sessions Problem Solving Challenge Round Recruitment & Wing Induction Sessions Venue IUB Concourse & Club Booths Reporting 10:00 AM Booth registration, technical wing showcases, and peer mentorship orientation. Facebook Post Problem Solving Challenge Round Venue CSE Labs 1 & 2 Reporting 2:30 PM Prize pool Club Fast-Track Selection & Swag Pack Analytical assessment testing prospective recruits on algorithmic thinking. Visual Archive Event Gallery & Moments Photos and captured memories from this event. Full Club Gallery View ph",
    "url": "https://iubpc.org/events/iubpc-recruitment-problem-solving-spring-2026"
  },
  {
    "slug": "iipc-autumn-2025",
    "title": "Programming Week 2025 (Intra-IUB Programming Contest)",
    "subtitle": "Organized by IUBPC & Department of CSE",
    "date": "Nov 29, 2025",
    "wingId": "competitive-programming",
    "wingName": "Competitive Programming",
    "wingCode": "CP \u00b7 01",
    "img": "https://res.cloudinary.com/dvu2ihzny/image/upload/v1782463314/iubpc/gallery/as0iwiwvymjtericcwmo.jpg",
    "tags": [
      "Junior Division Arena",
      "Senior Division Arena (5 Hours)",
      "Problem Editorial & Closing Ceremony"
    ],
    "synopsis": "Core Competitive Segment of Programming Week Autumn '25 IUB Programming Club organized the Intra-IUB Programming Contest (IIPC) as the core competitive segment of Programming Week Autumn '25. Featuring separate categories for both Senior and Junior participants, the competition tested students' algorithmic problem-solving skills, strategic thinking, and coding proficiency in a high-energy environment mimicking ICPC standards with balloon runners and live leaderboard freezing. Junior Division Arena Senior Division Arena (5 Hours) Problem Editorial & Closing Ceremony Junior Division Arena Venue CSE Lab 3 Reporting 9:30 AM Dedicated contest track for freshers and 1st/2nd year coders covering foundational problem solving. Facebook Post IUB News Coverage Senior Division Arena (5 Hours) Venue CSE Computing Complex Reporting 10:00 AM Prize pool Trophies, Cash Prizes & Official Ranking Crests Advanced division with complex dynamic programming, ",
    "url": "https://iubpc.org/events/iipc-autumn-2025"
  },
  {
    "slug": "icpc-asia-dhaka-regional-2025",
    "title": "ICPC Asia Dhaka Regional 2025 Online Preliminary Round",
    "subtitle": "Organized by Department of CSE (IUBCS) & IUB Programming Club",
    "date": "Nov 15, 2025",
    "wingId": "competitive-programming",
    "wingName": "Competitive Programming",
    "wingCode": "CP \u00b7 01",
    "img": "https://res.cloudinary.com/dvu2ihzny/image/upload/v1782463697/iubpc/gallery/iitrwsnpee07akiqojku.jpg",
    "tags": [
      "Technical Verification & Warm-up",
      "5-Hour Preliminary Contest Round"
    ],
    "synopsis": "Official Preliminary Round Hosting The Department of Computer Science & Engineering (IUBCS) and IUB Programming Club hosted 29 teams for the on November 15, 2025. The event brought together IUB coders, including many first-time participants, along with representatives from BUBT, creating an exciting, high-stakes, and challenging competitive programming experience. Delegation Highlights 29 Competitive Teams: Intensive 5-hour real-time problem-solving under official ICPC regional regulations. Inter-University Collaboration: Welcoming visiting teams and fostering regional camaraderie in computational mathematics and algorithmics. Technical Verification & Warm-up 5-Hour Preliminary Contest Round Technical Verification & Warm-up Venue CSE High Performance Computing Lab Reporting 9:00 AM Environment checks, judge credentials distribution, and terminal setups. Facebook Post IUB News Coverage 5-Hour Preliminary Contest Round Venue CSE Lab 4 & 5",
    "url": "https://iubpc.org/events/icpc-asia-dhaka-regional-2025"
  },
  {
    "slug": "iipc-spring-2025",
    "title": "Intra-IUB Programming Contest (IIPC) Spring 2025",
    "subtitle": "Organized by IUB Programming Club & Dept of CSE",
    "date": "Apr 11, 2025",
    "wingId": "competitive-programming",
    "wingName": "Competitive Programming",
    "wingCode": "CP \u00b7 01",
    "img": "https://res.cloudinary.com/dvu2ihzny/image/upload/v1782455873/iubpc/gallery/ok8jd8dcjuktc5jaoy5m.jpg",
    "tags": [
      "5-Hour Main Arena Contest",
      "Editorial Walkthrough & Award Ceremony"
    ],
    "synopsis": "High-Energy Coding Marathon \"Intra-IUB Programming Contest (IIPC) - Spring 2025\" successfully concluded with an overwhelming display of problem-solving skills and competitive spirit among participants. Organized by the IUB Programming Club, the event brought together talented coders, dedicated volunteers, and faculty advisors for a high-energy coding marathon. The contest celebrated the achievements of top programmers while inspiring the entire student community. 5-Hour Main Arena Contest Editorial Walkthrough & Award Ceremony 5-Hour Main Arena Contest Venue CSE Computing Complex Reporting 9:30 AM Prize pool BDT 40,000 Cash Pool, Crests & Distinction Certificates Intense algorithmic marathon across multi-level problem sets with live score updates. Facebook Post Editorial Walkthrough & Award Ceremony Venue IUB Multipurpose Hall Reporting 4:30 PM Problem setters present full breakdowns followed by stage award distributions. Visual Archive",
    "url": "https://iubpc.org/events/iipc-spring-2025"
  },
  {
    "slug": "wordpress-campus-connect-iub",
    "title": "Wordpress Campus Connect IUB 2026",
    "subtitle": "A Global Initiative of WordPress Foundation",
    "date": "Nov 14 \u2013 Nov 18, 2026",
    "wingId": "software-development",
    "wingName": "Software Development",
    "wingCode": "SWE \u00b7 02",
    "img": "https://res.cloudinary.com/dvu2ihzny/image/upload/v1793129902/iubpc/event-covers/jcb8zvhhqfk7pvsexcej.jpg",
    "tags": [
      "Hands on Workshop",
      "Seminar & Community Pathways"
    ],
    "synopsis": "Eligibility: Open to all departments (No coding or CS background required) For more than twenty years, WordPress has quietly run over 40% of the entire internet from independent blogs to the world's biggest news outlets. It survived every web trend because it was built for real people, not just software engineers. \u200bNow, that same platform is pairing its battle-tested foundation with built-in AI tools. \u200bInstead of writing lines of code or wrestling with syntax errors, you can now use plain language to draft content, generate page layouts, and customize web pages on the fly. This event is designed to strip away the technical jargon and show you how to build, launch, and manage your own website from scratch in a single afternoon. \u200bWho This Is For? \u200bYou do not need to be a Computer Science student or know how to code. \u200bWhether you study BBA, Media Studies, English, Pharmacy, or Environmental Science, this session is for anyone who needs an ",
    "url": "https://iubpc.org/events/wordpress-campus-connect-iub"
  },
  {
    "slug": "the-future-of-programmers-in-the-ai-era",
    "title": "The Future of Programmers in the AI Era",
    "subtitle": "In Collaboration with Programing Hero",
    "date": "Sep 26, 2026",
    "wingId": "software-development",
    "wingName": "Software Development",
    "wingCode": "SWE \u00b7 02",
    "img": "https://res.cloudinary.com/dvu2ihzny/image/upload/v1790430753/iubpc/event-covers/e1mysogbapq5taeibra1.jpg",
    "tags": [
      "Online Seminar & QnA"
    ],
    "synopsis": "The world of programming is changing rapidly with the rise of Artificial Intelligence. As AI becomes a part of everyday software development, an important question arises: What does the future look like for programmers? In collaboration with the Independent University, Bangladesh Programming Club (IUBPC), Programming Hero is bringing you an exclusive session on: The Future of Programmers in the AI Era Speaker: Jhankar Mahbub, CEO, Programming Hero If you're a programming enthusiast, a CS student, or simply curious about where the tech industry is heading, this is a great opportunity to hear directly from someone who has been working closely with aspiring programmers for years. Online Seminar & QnA Starts Sep 26, 2026, 7:00 PM Ends Sep 26, 2026, 8:00 PM Venue Google Meet Registration closed Organizing Team Mohammad Zaid Iqbal Fahad Organizer Ahmed Zuhayr Hasan Organizer Tahmid Ul Alam Organizer",
    "url": "https://iubpc.org/events/the-future-of-programmers-in-the-ai-era"
  },
  {
    "slug": "bcs-ict-fest-2026-community-partner",
    "title": "Community Partnership at BCS ICT Fest 2026",
    "subtitle": "Official Community Partner \u00b7 Bangladesh Computer Samity (BCS)",
    "date": "Aug 19 \u2013 Aug 20, 2026",
    "wingId": "software-development",
    "wingName": "Software Development",
    "wingCode": "SWE \u00b7 02",
    "img": "https://res.cloudinary.com/dvu2ihzny/image/upload/v1791066267/iubpc/event-covers/enbdeqxjwwx5f0kwnfzx.jpg",
    "tags": [
      "BCS ICT Fest Exhibition & Networking Pavilions"
    ],
    "synopsis": "Connecting with National ICT Networks IUB Programming Club collaborated as an Official Community Partner for the BCS ICT Fest 2026 , organized by the Bangladesh Computer Samity (BCS) This partnership connected IUB students with national ICT networks, industry leaders, and tech enthusiasts, promoting technological collaboration across Bangladesh. BCS ICT Fest Exhibition & Networking Pavilions Venue BCS ICT Fest Convention Grounds Industry collaboration booths, networking sessions, and ICT panels. Facebook Post Organizing Team Ikram Hossain Akif Organizer",
    "url": "https://iubpc.org/events/bcs-ict-fest-2026-community-partner"
  },
  {
    "slug": "higher-education-career-in-japan-seminar",
    "title": "Higher Education to Career in Japan: Opportunities, Pathways and Future Prospects",
    "subtitle": "In Collaboration with CGP&AR and Probashi Sheba Limited",
    "date": "Aug 11, 2026",
    "wingId": "software-development",
    "wingName": "Software Development",
    "wingCode": "SWE \u00b7 02",
    "img": "https://res.cloudinary.com/dvu2ihzny/image/upload/v1791065682/iubpc/event-covers/lmjdmmwax5drjf30labu.jpg",
    "tags": [
      "Plenary Session & Keynote by Japanese Delegates"
    ],
    "synopsis": "International Career Seminar with Japanese Delegation IUB Programming Club, in collaboration with CGP&AR and Probashi Sheba Limited , hosted an international career seminar featuring distinguished academic and industry delegates from Japan. Attended by Pro Vice-Chancellor Prof. Daniel W. Lund and university leadership, the session provided students with key insights into scholarship opportunities, life in Japan, and global career pathways in the Japanese technology industry. Plenary Session & Keynote by Japanese Delegates Venue Auditorium Hall Reporting 10:00 AM Pathways for MEXT scholarships, engineering opportunities, and bilingual career mobility. Facebook Post",
    "url": "https://iubpc.org/events/higher-education-career-in-japan-seminar"
  },
  {
    "slug": "openai-and-cognition-ai-builders-meetup",
    "title": "OpenAI and Cognition hosted at IUB",
    "subtitle": "In Collaboration with DevChangeMakers",
    "date": "Aug 6, 2026",
    "wingId": "software-development",
    "wingName": "Software Development",
    "wingCode": "SWE \u00b7 02",
    "img": "https://res.cloudinary.com/dvu2ihzny/image/upload/v1791065732/iubpc/event-covers/ikrvsbgsd6f02zjzqz8h.jpg",
    "tags": [
      "Live AI Tool Deep-Dive (Codex & Devin)",
      "Live Building Sprint & Credits Distribution"
    ],
    "synopsis": "Hands-on AI Builders Meetup with OpenAI & Cognition Ambassadors IUB Programming Club, in collaboration with DevChangeMakers , hosted a hands-on \"AI Builders Meetup\" featuring Md Shahriyar Al Mustakim Mitul , Ambassador for OpenAI and Cognition. Participants gained practical insights into advanced AI tools like Codex and Devin , received free tool credits, and engaged in live project building to enhance their AI development skills. Live AI Tool Deep-Dive (Codex & Devin) Live Building Sprint & Credits Distribution Live AI Tool Deep-Dive (Codex & Devin) Venue Auditorium 2 Reporting 10:00 AM Exploring autonomous agents, developer tooling, and prompt engineering. Facebook Post Live Building Sprint & Credits Distribution Venue CSE High-Performance Lab Reporting 1:30 PM Prize pool Free Tool Credits & Swag Hands-on sprint building full-stack apps with complimentary AI tool credits. Organizing Team Ikram Hossain Akif Organizer Volunteers Tahmid ",
    "url": "https://iubpc.org/events/openai-and-cognition-ai-builders-meetup"
  },
  {
    "slug": "skills-to-success-campus-activation",
    "title": "Skills to Success: Campus Activation Program",
    "subtitle": "In Partnership with Bizzmakr",
    "date": "Jul 28, 2026",
    "wingId": "software-development",
    "wingName": "Software Development",
    "wingCode": "SWE \u00b7 02",
    "img": "https://res.cloudinary.com/dvu2ihzny/image/upload/v1791065751/iubpc/event-covers/fpzqlzjwx4xgu8rypt9s.jpg",
    "tags": [
      "AI SEO & Digital Skill Monetization Masterclass"
    ],
    "synopsis": "Bridging Academic Learning with the Global Digital Economy IUB Programming Club, in partnership with Bizzmakr , hosted \"Skills to Success\" , a career-oriented session designed to bridge academic learning with the global digital economy. Featuring industry experts in AI SEO, digital marketing, and creative media, the workshop provided students with actionable strategies for skill monetization, freelancing, and career development. AI SEO & Digital Skill Monetization Masterclass Venue Auditorium Hall Reporting 10:00 AM Practical strategies for transitioning technical skills into client consultancy and freelancing. Facebook Post Organizing Team Ikram Hossain Akif Organizer Saraf Islam Organizer",
    "url": "https://iubpc.org/events/skills-to-success-campus-activation"
  },
  {
    "slug": "5th-national-data-science-summit-2026-partnership",
    "title": "Official Club Partners at 5th National Data Science Summit 2026",
    "subtitle": "Official Club Partner",
    "date": "Jul 2 \u2013 Jul 3, 2026",
    "wingId": "software-development",
    "wingName": "Software Development",
    "wingCode": "SWE \u00b7 02",
    "img": "https://res.cloudinary.com/dvu2ihzny/image/upload/v1791065732/iubpc/event-covers/ikrvsbgsd6f02zjzqz8h.jpg",
    "tags": [
      "Summit Keynotes & AI Innovation Track"
    ],
    "synopsis": "One of the Country's Largest AI & Data Science Platforms We're proud to join forces with the 5th National Data Science Summit 2026 \u2014 one of the country's biggest stages for AI, Data Science, Innovation & Entrepreneurship. Whether you're a coder, creator, researcher, or future founder \u2014 this summit was built to empower students to build with LLMs, predictive architectures, and data-driven intelligence. Summit Keynotes & AI Innovation Track Venue National Summit Arena Sessions on foundational models, edge compute, and predictive machine learning. Facebook Post",
    "url": "https://iubpc.org/events/5th-national-data-science-summit-2026-partnership"
  },
  {
    "slug": "nsu-cybernauts-2026-idea-to-impact",
    "title": "Second-Place Achievement at NSU Cybernauts 2026 (Idea to Impact)",
    "subtitle": "Represented by IUBPC Delegation",
    "date": "Jun 30, 2026",
    "wingId": "software-development",
    "wingName": "Software Development",
    "wingCode": "SWE \u00b7 02",
    "img": "https://res.cloudinary.com/dvu2ihzny/image/upload/v1791066119/iubpc/event-covers/xtq4bdcdxurk9zfkejry.jpg",
    "tags": [
      "National Pitch & Prototype Evaluation"
    ],
    "synopsis": "National Distinction in Innovation & Impact IUB Programming Club's Director of Public Relations, Farhan Sadeque , along with his cross-university team \"Anti Khamba\" , secured Second-Place \ud83e\udd48 in the \"Idea to Impact\" segment at NSU Cybernauts 2026. Competing against more than 50 teams nationwide, the team demonstrated outstanding innovation, technical problem-solving, and pitch excellence on a national platform. National Pitch & Prototype Evaluation Venue North South University Campus Prize pool 2nd Place National Runners-up Medal & Cash Award Comprehensive jury evaluation against 50 top collegiate engineering teams. Facebook Post IUB News Coverage",
    "url": "https://iubpc.org/events/nsu-cybernauts-2026-idea-to-impact"
  },
  {
    "slug": "sqa-career-summit-2026",
    "title": "SQA Career Summit 2026",
    "subtitle": "In Collaboration with Global Tech Assure & Dept of CSE",
    "date": "Jun 14, 2026",
    "wingId": "software-development",
    "wingName": "Software Development",
    "wingCode": "SWE \u00b7 02",
    "img": "https://res.cloudinary.com/dvu2ihzny/image/upload/v1782404579/iubpc/gallery/yyo46veerattnrzzh5mz.jpg",
    "tags": [
      "Industry Panel: Modern Test Automation & QA Architecture",
      "Executive Fireside Q&A with Dr. AKM Mahbubur Rahman & Guests"
    ],
    "synopsis": "Industry Insights into Software Quality Engineering IUB Programming Club, in collaboration with Global Tech Assure , organized the \"SQA Career Summit 2026\" featuring an expert guest panel of Software Quality Assurance engineers. Attended by Dr. AKM Mahbubur Rahman , Head of the CSE Department, the seminar provided students with industry insights, practical career advice, test automation pipelines, and an interactive Q&A session. Industry Panel: Modern Test Automation & QA Architecture Executive Fireside Q&A with Dr. AKM Mahbubur Rahman & Guests Industry Panel: Modern Test Automation & QA Architecture Venue Auditorium Hall Reporting 10:00 AM Best practices in automated test suites, performance benchmarking, and continuous integration. Facebook Post Executive Fireside Q&A with Dr. AKM Mahbubur Rahman & Guests Venue Auditorium Stage Reporting 2:30 PM Interactive career dialogue mapping the trajectory from student to senior QA engineer. Vis",
    "url": "https://iubpc.org/events/sqa-career-summit-2026"
  },
  {
    "slug": "official-launch-iubpc-website-portal",
    "title": "Official Launch of IUB Programming Club Website & Recruitment Portal",
    "subtitle": "Engineered by IUBPC Senior Tech Team",
    "date": "Jun 8, 2026",
    "wingId": "software-development",
    "wingName": "Software Development",
    "wingCode": "SWE \u00b7 02",
    "img": "https://res.cloudinary.com/dvu2ihzny/image/upload/v1791066267/iubpc/event-covers/enbdeqxjwwx5f0kwnfzx.jpg",
    "tags": [
      "Official Platform Unveiling"
    ],
    "synopsis": "Centralized Platform for Operations and Outreach IUB Programming Club engineered and launched its official web platform, developed by Vice-President Tanvir Ahmed alongside Senior Developers Rashedul Islam Sabbir and Zaid Fahad Deployed to streamline the Summer 2026 Recruitment Drive, the site enables student registrations, dynamic profile creation, and centralized data management for club operations. Official Platform Unveiling Venue IUB Campus & iubpc.org Release of recruitment workflows, portfolio hubs, and member directories. Facebook Post",
    "url": "https://iubpc.org/events/official-launch-iubpc-website-portal"
  },
  {
    "slug": "gatekeeper-automated-event-attendance",
    "title": "Development of Gatekeeper: Automated Event Attendance & Self Check-in System",
    "subtitle": "Engineered by IUB Programming Club",
    "date": "Jun 8, 2026",
    "wingId": "software-development",
    "wingName": "Software Development",
    "wingCode": "SWE \u00b7 02",
    "img": "https://res.cloudinary.com/dvu2ihzny/image/upload/v1791066230/iubpc/event-covers/kcgcyuthgnhzgmokebb3.jpg",
    "tags": [
      "Platform Deployment & Access Kiosk Demonstration"
    ],
    "synopsis": "High-Throughput Verification Infrastructure IUB Programming Club engineered \"Gatekeeper\" , an automated QR code check-in platform designed to streamline event access control and participant tracking across campus. Powered by Supabase Realtime and Supabase Auth , the system provides instant validation, secure authentication, and live attendance tracking for large-scale university events and workshops. Platform Deployment & Access Kiosk Demonstration Venue Academic Concourse & Main Gate Live field validation handling concurrent participant scan throughput.",
    "url": "https://iubpc.org/events/gatekeeper-automated-event-attendance"
  },
  {
    "slug": "build-your-future-start-with-react",
    "title": "Build Your Future: Start with React",
    "subtitle": "In Collaboration with Creative IT Institute",
    "date": "Apr 9 \u2013 Apr 11, 2026",
    "wingId": "software-development",
    "wingName": "Software Development",
    "wingCode": "SWE \u00b7 02",
    "img": "https://res.cloudinary.com/dvu2ihzny/image/upload/v1782456994/iubpc/gallery/pyqwkjmr2knly7kkr54u.jpg",
    "tags": [
      "Day 1: React Fundamentals & Component Architecture (IUB Campus)",
      "Day 2: Advanced React & Live Project Deployment (Creative IT Uttara)"
    ],
    "synopsis": "Two-Day Comprehensive Frontend Workshop IUB Programming Club, in collaboration with Creative IT Institute , organized a two-day workshop on React fundamentals and advanced web development. Day 1 was hosted at the IUB campus covering core concepts, followed by Day 2 at Creative IT's Uttara campus, where students engaged in hands-on activities, real-world project builds, and deeper technical applications. Day 1: React Fundamentals & Component Architecture (IUB Campus) Day 2: Advanced React & Live Project Deployment (Creative IT Uttara) Day 1: React Fundamentals & Component Architecture (IUB Campus) Venue IUB Campus Computer Lab 3 Reporting 10:00 AM Core concepts: JSX, State, Props, Hooks, and Component Trees. Facebook Post IUB News Coverage Day 2: Advanced React & Live Project Deployment (Creative IT Uttara) Venue Creative IT Institute, Uttara Campus Reporting 10:00 AM Prize pool Certificates of Completion & Training Scholarships Advanced",
    "url": "https://iubpc.org/events/build-your-future-start-with-react"
  },
  {
    "slug": "future-of-jobs-erp-and-global-career-opportunities",
    "title": "Future of Jobs: ERP and Global Career Opportunities",
    "subtitle": "In Collaboration with DotBD Solutions Limited",
    "date": "Apr 2, 2026",
    "wingId": "software-development",
    "wingName": "Software Development",
    "wingCode": "SWE \u00b7 02",
    "img": "https://res.cloudinary.com/dvu2ihzny/image/upload/v1782457350/iubpc/gallery/fzhbbcmet23qu7naf0i8.jpg",
    "tags": [
      "Hands-on Odoo ERP Masterclass",
      "Global Careers & Enterprise Industry Q&A"
    ],
    "synopsis": "Enterprise Systems & Global Career Prospects IUB Programming Club, in collaboration with DotBD Solutions Limited , successfully conducted an interactive workshop on Enterprise Resource Planning (ERP) The session provided students with hands-on guidance on Odoo ERP , demonstrating how modern businesses integrate inventory, finance, and operations, while highlighting real-world applications and global career prospects in enterprise software. Hands-on Odoo ERP Masterclass Global Careers & Enterprise Industry Q&A Hands-on Odoo ERP Masterclass Venue Auditorium 2 Reporting 10:00 AM Walkthrough of modular ERP architecture, workflow triggers, and enterprise database integration. Facebook Post IUB News Coverage Global Careers & Enterprise Industry Q&A Venue Seminar Bay Reporting 12:30 PM Direct discussions on overseas consulting opportunities and technical certifications. Visual Archive Event Gallery & Moments Photos and captured memories from t",
    "url": "https://iubpc.org/events/future-of-jobs-erp-and-global-career-opportunities"
  },
  {
    "slug": "launch-of-chand-postal",
    "title": "Launch of Chand Postal: Digital Eid Cards Platform",
    "subtitle": "Engineered by IUBPC Software Development Wing",
    "date": "Mar 17 \u2013 Mar 25, 2026",
    "wingId": "software-development",
    "wingName": "Software Development",
    "wingCode": "SWE \u00b7 02",
    "img": "https://res.cloudinary.com/dvu2ihzny/image/upload/v1782457578/iubpc/gallery/vencgjqtllj28xkiezlg.jpg",
    "tags": [
      "Digital Card Creator & Timed Message Release"
    ],
    "synopsis": "Modernizing Cultural Traditions through Software IUB Programming Club engineered and launched \"Chand Postal\" , a digital greeting platform designed to modernize the traditional practice of sending Eid cards. The platform featured account management, timed message-locking mechanisms for holiday release, optional anonymous posting, and customized digital card creation to drive student engagement across the university. Digital Card Creator & Timed Message Release Venue Digital Web Application Rollout Custom card studio with encrypted delayed release revealed at the sighting of the Eid moon. Facebook Post Visual Archive Event Gallery & Moments Photos and captured memories from this event. Full Club Gallery View photo View photo View photo View photo View photo View photo",
    "url": "https://iubpc.org/events/launch-of-chand-postal"
  },
  {
    "slug": "launch-of-iub-confessions",
    "title": "Launch of IUB Confessions",
    "subtitle": "Engineered by IUBPC Software Development Wing",
    "date": "Feb 13 \u2013 Feb 15, 2026",
    "wingId": "software-development",
    "wingName": "Software Development",
    "wingCode": "SWE \u00b7 02",
    "img": "https://res.cloudinary.com/dvu2ihzny/image/upload/v1782459599/iubpc/gallery/lbyui7ljoipamgbi5a6b.jpg",
    "tags": [
      "Application Launch & Live Community Feed"
    ],
    "synopsis": "Campus-Wide Student Engagement IUB Programming Club developed and launched \"IUB Confessions\" , an anonymous mobile web application for campus-wide student engagement during Valentine's Day. The platform served as an active student software project showcasing rapid production deployment, user privacy controls, moderation flows, and community-driven engagement features. Application Launch & Live Community Feed Venue Campus-wide Digital Rollout Campus-wide rollout of real-time anonymous feed with moderation pipelines. Facebook Post Visual Archive Event Gallery & Moments Photos and captured memories from this event. Full Club Gallery View photo View photo",
    "url": "https://iubpc.org/events/launch-of-iub-confessions"
  },
  {
    "slug": "programming-week-autumn-2025-showcase",
    "title": "Programming Week 2025 (InnoVerse + Tech Project Showcase)",
    "subtitle": "SETS & IUB Programming Club",
    "date": "Nov 27, 2025",
    "wingId": "software-development",
    "wingName": "Software Development",
    "wingCode": "SWE \u00b7 02",
    "img": "https://res.cloudinary.com/dvu2ihzny/image/upload/v1782462317/iubpc/gallery/rugcgvzupqhuxcmypex0.jpg",
    "tags": [
      "InnoVerse: Tech Project Showcase Expo",
      "Tech Business Pitch Competition Round"
    ],
    "synopsis": "Celebrating Groundbreaking Technical Innovations IUB Programming Club organized the \"InnoVerse: Tech Business Pitch Competition\" alongside the \"Tech Project Showcase\" as part of Programming Week Autumn '25. The event provided students with a platform to present innovative technical projects, pitch software-driven business ideas, and demonstrate practical problem-solving skills to an academic and industrial audience. Event Segments Hardware & Software InnoVerse Expo: Showcasing robotics, IoT systems, and full-stack software products. Tech Business Pitch Competition: Validating market feasibility, startup models, and scalability before venture mentors. InnoVerse: Tech Project Showcase Expo Tech Business Pitch Competition Round InnoVerse: Tech Project Showcase Expo Venue Ground Floor Concourse & Exhibition Gallery Reporting 9:00 AM Stall Setup Live hardware and software demonstrations presented across interactive exhibition booths. Faceboo",
    "url": "https://iubpc.org/events/programming-week-autumn-2025-showcase"
  },
  {
    "slug": "suas-2026-usa-representation",
    "title": "Global Representation at SUAS 2026 Competition in USA",
    "subtitle": "Organized by IUBPC Robotics Wing",
    "date": "Sep 14 \u2013 Sep 18, 2026",
    "wingId": "robotics",
    "wingName": "Robotics",
    "wingCode": "ROB \u00b7 03",
    "img": "https://res.cloudinary.com/dvu2ihzny/image/upload/v1791065052/iubpc/event-covers/do6vdpazdh687q7zffma.jpg",
    "tags": [
      "Autonomous Flight Mission & Waypoint Navigation"
    ],
    "synopsis": "Autonomous Systems on the International Stage Supported by the Department of CSE, Fab Lab IUB and IUB Team FalcryX (including IUBPC Sub-Executive Mohammad Zaid Iqbal Fahad ) represented Independent University, Bangladesh and the nation at the Student Unmanned Aerial Systems (SUAS) 2026 Competition in Tulsa, Oklahoma, USA The team competed on the global stage with a fully autonomous quadcopter developed through months of rigorous engineering innovation, obstacle mapping, and onboard AI telemetry. Autonomous Flight Mission & Waypoint Navigation Venue Tulsa Flight Center, Oklahoma, USA High-altitude autonomous payload delivery, target recognition, and obstacle avoidance. Facebook Post Segment Leads & Coordinators Mohammad Zaid Iqbal Fahad AI & Integration Lead",
    "url": "https://iubpc.org/events/suas-2026-usa-representation"
  },
  {
    "slug": "react-2026-partnership",
    "title": "Official Club Partnership at REACT 2026 (Southeast University)",
    "subtitle": "Official Club Partner \u00b7 IEEE SEU Student Branch",
    "date": "Sep 10 \u2013 Sep 11, 2026",
    "wingId": "robotics",
    "wingName": "Robotics",
    "wingCode": "ROB \u00b7 03",
    "img": "https://res.cloudinary.com/dvu2ihzny/image/upload/v1782462317/iubpc/gallery/rugcgvzupqhuxcmypex0.jpg",
    "tags": [
      "REACT Technical Sessions & Paper Presentations"
    ],
    "synopsis": "Inter-University Multi-Disciplinary Research & Automation IUB Programming Club served as an Official Club Partner for \"REACT 2026\" (Research, Engineering, Automation, Computer, Technology), organized by the IEEE SEU Student Branch at Southeast University, Dhaka. This inter-university partnership facilitated student engagement in multi-disciplinary research, automation, and technological innovation across academic institutions. REACT Technical Sessions & Paper Presentations Venue Southeast University Dhaka Multi-disciplinary research sessions across robotics, automation, and intelligent systems. Facebook Post",
    "url": "https://iubpc.org/events/react-2026-partnership"
  },
  {
    "slug": "firso-2026-gold-bronze-medals",
    "title": "Gold and Bronze Medal Achievements at FIRSO 2026 National Round",
    "subtitle": "Department of CSE & IUBPC Delegations",
    "date": "Sep 4, 2026",
    "wingId": "robotics",
    "wingName": "Robotics",
    "wingCode": "ROB \u00b7 03",
    "img": "https://res.cloudinary.com/dvu2ihzny/image/upload/v1791065271/iubpc/event-covers/h0zvyiysettmmvvlmgj0.jpg",
    "tags": [
      "FIRSO National Championship Stage"
    ],
    "synopsis": "National Honors at Fibonacci International Robot & STEM Olympiad IUB Programming Club members achieved top honors at the Fibonacci International Robot & STEM Olympiad (FIRSO) 2026 National Round Gold Medal (Softech Segment): Team \"The Divergent\" (including IUBPC member Abdullah Al Rafi). Bronze Medal (GreenTech Segment): Farhan Sadeque (Director of PR) for his AI/Computer Vision project \"GreenVision\". FIRSO National Championship Stage Venue FIRSO National Arena Prize pool Gold & Bronze Medals + National Trophies Softech and GreenTech jury presentations. Facebook Post 1 Facebook Post 2 IUB Coverage 1 IUB Coverage 2 Segment Leads & Coordinators Farhan Sadeque Mohammed Abdullah Al Rafe",
    "url": "https://iubpc.org/events/firso-2026-gold-bronze-medals"
  },
  {
    "slug": "wsdg-challenge-2026-selection",
    "title": "Global Selection for WSDG Challenge 2026 in Malaysia",
    "subtitle": "Represented by Team ProtivaX",
    "date": "Aug 18, 2026",
    "wingId": "robotics",
    "wingName": "Robotics",
    "wingCode": "ROB \u00b7 03",
    "img": "https://res.cloudinary.com/dvu2ihzny/image/upload/v1791065656/iubpc/event-covers/dlz8wzoi7bq7gm0i2gyj.jpg",
    "tags": [
      "National Showcase & International Selection"
    ],
    "synopsis": "Representing Bangladesh on the World Stage IUB Programming Club member Abdullah Al Rafi Mahmud and his team \"ProtivaX\" were selected among the top 12 teams in the Project Showcase segment at RoboFusion 1.0 (UFTB) for their AI-powered learning workspace project, \"Protiva\" The selection earned the team the opportunity to represent Bangladesh internationally at the World Sustainable Development Goals (WSDG) Challenge 2026 in Malaysia National Showcase & International Selection Venue RoboFusion 1.0 UFTB Prize pool Delegation Ticket to WSDG Challenge Malaysia Selection round among top 12 national innovation finalists. Facebook Post",
    "url": "https://iubpc.org/events/wsdg-challenge-2026-selection"
  },
  {
    "slug": "fibonacci-firso-2026-partnership",
    "title": "Official Club Partnership at FIBONACCI BANGLADESH & GSO FOR FIRSO 2026",
    "subtitle": "Official Club Partner",
    "date": "Aug 11 \u2013 Aug 12, 2026",
    "wingId": "robotics",
    "wingName": "Robotics",
    "wingCode": "ROB \u00b7 03",
    "img": "https://res.cloudinary.com/dvu2ihzny/image/upload/v1791065271/iubpc/event-covers/h0zvyiysettmmvvlmgj0.jpg",
    "tags": [
      "Olympiad Collaboration & Outreach Session"
    ],
    "synopsis": "Partnering for International STEM & Robotics Olympiads IUB Programming Club served as an Official Club Partner for FIBONACCI BANGLADESH & GSO FOR FIRSO 2026 , fostering youth STEM engagement, robotic automation challenges, and national Olympiad qualifying rounds. Olympiad Collaboration & Outreach Session Venue National Arena Connecting competitive students with international Olympiad trainers. Facebook Post",
    "url": "https://iubpc.org/events/fibonacci-firso-2026-partnership"
  },
  {
    "slug": "robofusion-1-0-robo-soccer-achievement",
    "title": "2nd Runner Up Achievement at RoboFusion 1.0 (Robo Soccer)",
    "subtitle": "Supported by Department of CSE, IUB",
    "date": "Aug 8, 2026",
    "wingId": "robotics",
    "wingName": "Robotics",
    "wingCode": "ROB \u00b7 03",
    "img": "https://res.cloudinary.com/dvu2ihzny/image/upload/v1791065722/iubpc/event-covers/ynvoxaflmarblxc3nhpe.jpg",
    "tags": [
      "National Robo Soccer Arena Matches"
    ],
    "synopsis": "National Honors at National Robotics Festival IUB Programming Club's team \"IUBPC Meaw UWU\" AKM Rafiul Morshed, Tanjim Rahman Saad, Md Tanvir Ahsan Ankon, and Tahmid Ul Alam ) achieved the 2nd Runner Up position \ud83e\udd49 in the Robo Soccer competition at RoboFusion 1.0 , a national robotics festival organized by the University of Frontier Technology, Bangladesh (UFTB). Supported by the Department of CSE, the team demonstrated excellence in robotics and competitive execution on a national stage. National Robo Soccer Arena Matches Venue UFTB Festival Arena Prize pool 2nd Runner-up National Trophy & Cash Prize High-speed wireless robot soccer matches testing RF telemetry and agile chassis control. Facebook Post Segment Leads & Coordinators A.K.M Rafiul Morshed Tahmid Ul Alam MD Tanvir Ahsan Ankon Tanjim Rahman Saad",
    "url": "https://iubpc.org/events/robofusion-1-0-robo-soccer-achievement"
  },
  {
    "slug": "launching-of-delivery-bot-project",
    "title": "Launching of Delivery Bot Project",
    "subtitle": "IUBPC Robotics Wing",
    "date": "Aug 5, 2026",
    "wingId": "robotics",
    "wingName": "Robotics",
    "wingCode": "ROB \u00b7 03",
    "img": "https://res.cloudinary.com/dvu2ihzny/image/upload/v1791065739/iubpc/event-covers/jdllatlzcrmkkriuofdx.jpg",
    "tags": [
      "Autonomous Navigation Demonstration"
    ],
    "synopsis": "Intelligent Campus Item Transport Automation IUB Programming Club is developing an intelligent Delivery Bot designed to automate and streamline indoor item transport across campus. Built using advanced robotics, sensor integration, LiDAR mapping, and real-time navigation algorithms, the project highlights our club's engineering innovation and commitment to practical technical solutions. Autonomous Navigation Demonstration Venue Robotics Lab & Academic Concourse Live testing of obstacle avoidance and autonomous path planning across corridors. Video Showcase Organizing Team Ikram Hossain Akif Organizer Mohammad Zaid Iqbal Fahad Organizer Volunteers Tahmid Ul Alam Volunteer MD Tanvir Ahsan Ankon Volunteer",
    "url": "https://iubpc.org/events/launching-of-delivery-bot-project"
  },
  {
    "slug": "smuct-cse-fest-2026-ctf-achievement",
    "title": "4th Place CTF Achievement at SMUCT CSE Fest 2026 v3.0",
    "subtitle": "Represented by IUBPC Cybersecurity Wing",
    "date": "Jul 10, 2026",
    "wingId": "cybersecurity",
    "wingName": "Cybersecurity",
    "wingCode": "SEC \u00b7 04",
    "img": "https://res.cloudinary.com/dvu2ihzny/image/upload/v1791066633/iubpc/event-covers/vlnuno9ddk9xesrqro6r.jpg",
    "tags": [
      "SMUCT Jeopardy CTF Challenge Floor"
    ],
    "synopsis": "Proud Moment for IUB in the World of Cybersecurity IUB Programming Club members, competing as \"Team IUB_Sudo\" Al Amin Mollah, Suad Janeeta Rahman, and Md. Shawkot Ali ), secured 4th place in the Capture The Flag (CTF) segment at SMUCT CSE Fest 2026 v3.0. Held at Shanto-Mariam University of Creative Technology, the competition highlighted the club's growing strength and competitive technical skills in offensive security and digital forensics. SMUCT Jeopardy CTF Challenge Floor Venue Shanto-Mariam University of Creative Technology Prize pool 4th Place Nationwide Distinction Competitive hacking round with binary exploitation, web security, and crypto challenges. Facebook Post",
    "url": "https://iubpc.org/events/smuct-cse-fest-2026-ctf-achievement"
  },
  {
    "slug": "phoenix-summit-2026-partnership",
    "title": "Official Club Partnership at Phoenix Summit 2026",
    "subtitle": "Official Club Partner \u00b7 South Asia Phoenix Summit",
    "date": "Jun 26 \u2013 Jun 27, 2026",
    "wingId": "cybersecurity",
    "wingName": "Cybersecurity",
    "wingCode": "SEC \u00b7 04",
    "img": "https://res.cloudinary.com/dvu2ihzny/image/upload/v1791066133/iubpc/event-covers/wqelg0hjecnvtmr8rinq.jpg",
    "tags": [
      "Phoenix Technical Workshops & Hands-on Labs"
    ],
    "synopsis": "Making World-Class Cybersecurity Education Accessible IUB Programming Club served as an Official Club Partner for Phoenix Summit 2026 , one of South Asia\u2019s largest cybersecurity and technology summits held in Dhaka. Participating members engaged in hands-on workshops led by international experts covering Application Security, DevSecOps, and Ransomware Defense, while networking with global industry leaders and policymakers. Partnership Highlights Fully Funded Access: Secured 35 free tickets for our most active club members to attend the intensive 3-day technical workshops. University-Wide Discount: Facilitated a 50% registration discount for all IUB students who registered through our partner portal. Specialized Workshops: Covering Application Security, DevSecOps, and Ransomware Defense. Global Networking: Connected members with international CISOs, policymakers, and industry pioneers. Phoenix Technical Workshops & Hands-on Labs Venue Dh",
    "url": "https://iubpc.org/events/phoenix-summit-2026-partnership"
  },
  {
    "slug": "cybersecurity-ctf-intro-seminar",
    "title": "Cybersecurity and CTF: An Introductory Seminar",
    "subtitle": "In Collaboration with Bangladesh Computer Society (BCS)",
    "date": "Jun 20, 2026",
    "wingId": "cybersecurity",
    "wingName": "Cybersecurity",
    "wingCode": "SEC \u00b7 04",
    "img": "https://res.cloudinary.com/dvu2ihzny/image/upload/v1782405206/iubpc/gallery/obskh3xes4wikobli5yq.jpg",
    "tags": [
      "Keynote: SOC Operations, Attack Vectors & Defensive Posture",
      "Hands-on CTF Workshop & Certificate Ceremony"
    ],
    "synopsis": "Hands-on Introduction to Cyber Defense & CTF Competitions IUB Programming Club successfully hosted an introductory seminar on Cybersecurity and Capture The Flag (CTF) competitions, featuring Alin Boby, IT Security & SOC Team Lead at Janata Bank PLC The session covered cybersecurity fundamentals, real-world attack vectors, threat mitigation, and career pathways in security, culminating in a dynamic Q&A and certificate distribution for all participants. Keynote: SOC Operations, Attack Vectors & Defensive Posture Hands-on CTF Workshop & Certificate Ceremony Keynote: SOC Operations, Attack Vectors & Defensive Posture Venue Auditorium 2 Reporting 10:00 AM Presented by Alin Boby (SOC Team Lead, Janata Bank PLC) covering modern security incident management. Facebook Post Hands-on CTF Workshop & Certificate Ceremony Venue Cybersecurity Research Lab (CSE Lab 2) Reporting 1:30 PM Prize pool BCS Certified Participation Credentials Introduction to ",
    "url": "https://iubpc.org/events/cybersecurity-ctf-intro-seminar"
  },
  {
    "slug": "iubpc-orientation-summer-2026",
    "title": "IUBPC Orientation & Alumni QnA Summer 2026",
    "subtitle": "Organized by IUBPC Executive Committee",
    "date": "Jun 13, 2026",
    "wingId": "game-development",
    "wingName": "Game Development",
    "wingCode": "GAME \u00b7 05",
    "img": "https://res.cloudinary.com/dvu2ihzny/image/upload/v1782405982/iubpc/gallery/jhskzwgizgtpo3gfsmkt.jpg",
    "tags": [
      "Alumni Tech Panel & Career Guidance",
      "Ice-Breaking Games & Best Programmer Recognition"
    ],
    "synopsis": "Alumni Career Insights & New Member Induction IUB Programming Club successfully hosted its Summer 2026 Orientation, showcasing past projects and welcoming new recruits into the community. The event featured insightful career sessions by IUB tech alumni from Grameenphone, Brain Station 23, and Commure , an interactive Q&A segment, ice-breaking competitions, and a special recognition awarded to the \"Best Programmer\" for Spring 2026 contributions. Alumni Tech Panel & Career Guidance Ice-Breaking Games & Best Programmer Recognition Alumni Tech Panel & Career Guidance Venue Auditorium Hall Reporting 10:00 AM Industry insights from alumni engineers at Grameenphone, Brain Station 23, and Commure. Facebook Post Ice-Breaking Games & Best Programmer Recognition Venue Auditorium Stage Reporting 2:30 PM Prize pool Best Programmer of Spring 2026 Honor Crest Interactive contests and honoring outstanding contributors from the Spring semester. Organizi",
    "url": "https://iubpc.org/events/iubpc-orientation-summer-2026"
  },
  {
    "slug": "launch-of-treasure-hunt",
    "title": "Launch of Treasure Hunt: Hybrid Orientation Game",
    "subtitle": "Engineered by IUBPC Development Team",
    "date": "Jun 5, 2026",
    "wingId": "game-development",
    "wingName": "Game Development",
    "wingCode": "GAME \u00b7 05",
    "img": "https://res.cloudinary.com/dvu2ihzny/image/upload/v1791066212/iubpc/event-covers/cxmpr49ljmyuvmjatvd5.jpg",
    "tags": [
      "Treasure Hunt Live Campus Quest"
    ],
    "synopsis": "Real-Time Hybrid Game Engine IUB Programming Club engineered \"Treasure Hunt\" , a real-time hybrid game engine developed by Zaid Fahad using React, Tailwind 4, and Supabase Realtime Designed for the Spring 2026 orientation, the platform feature-synced live leaderboards, global countdown timers, and digital riddles linked to physical campus clues, demonstrating real-time web architecture and interactive system design. Treasure Hunt Live Campus Quest Venue IUB Campus Wide Real-time clue decryption, QR checkpoint verification, and live scoreboard racing. Facebook Post",
    "url": "https://iubpc.org/events/launch-of-treasure-hunt"
  },
  {
    "slug": "gamified-iubpc-pixel-quest",
    "title": "Gamified IUBPC Pixel Quest",
    "subtitle": "Engineered by IUBPC Software Development Wing",
    "date": "Mar 24 \u2013 Mar 28, 2026",
    "wingId": "game-development",
    "wingName": "Game Development",
    "wingCode": "GAME \u00b7 05",
    "img": "https://res.cloudinary.com/dvu2ihzny/image/upload/v1791065173/iubpc/event-covers/qytq5o093zrxldazsiep.jpg",
    "tags": [
      "Pixel Quest Interactive Onboarding"
    ],
    "synopsis": "Retro-Gamified Student Onboarding IUB Programming Club engineered a custom pixel-art themed recruitment web application using Next.js, Tailwind CSS, and Google Sheets API to replace traditional forms. Built to handle campus network unreliability through resilient submission logic and real-time state feedback, the platform elevated student onboarding while integrating seamlessly into the membership team's workflow. Pixel Quest Interactive Onboarding Venue Online Gamified step-by-step registration experience with real-time feedback and state persistence. Facebook Post",
    "url": "https://iubpc.org/events/gamified-iubpc-pixel-quest"
  },
  {
    "slug": "iubpc-orientation-iftar-spring-2026",
    "title": "IUBPC Orientation & Iftar \u2014 Spring 2026",
    "subtitle": "Organized by IUBPC Executive Committee",
    "date": "Mar 5, 2026",
    "wingId": "game-development",
    "wingName": "Game Development",
    "wingCode": "GAME \u00b7 05",
    "img": "https://res.cloudinary.com/dvu2ihzny/image/upload/v1782458652/iubpc/gallery/gg2wbbvpuphnigcoukt8.jpg",
    "tags": [
      "Spring Orientation & Custom Ice-Breaker Interactive Game",
      "Communal Iftar Gathering"
    ],
    "synopsis": "Welcoming New Recruits & Community Reunion IUB Programming Club organized its flagship Orientation and Iftar event for Spring 2026 , bringing together new entrants, senior members, and representatives from various campus clubs. Graced by the presence of the Faculty Advisor and Head Coach, the evening featured custom ice-breaking games built by the club's development team to foster community engagement and collaboration, culminating in an Iftar banquet. Spring Orientation & Custom Ice-Breaker Interactive Game Communal Iftar Gathering Spring Orientation & Custom Ice-Breaker Interactive Game Venue Auditorium Hall Reporting 3:00 PM Semester roadmap address followed by interactive web games developed by IUBPC coders. Facebook Post Communal Iftar Gathering Venue IUB Concourse & Dining Area Reporting 5:45 PM Campus-wide reunion dinner with faculty advisors, mentors, and members. Visual Archive Event Gallery & Moments Photos and captured memori",
    "url": "https://iubpc.org/events/iubpc-orientation-iftar-spring-2026"
  }
];
