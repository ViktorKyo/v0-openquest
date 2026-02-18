import type { Fellowship } from './index'

export const researchScienceFellowships: Fellowship[] = [
  // ----------------------------------------------------------------
  // 1. Rhodes Scholarship
  // ----------------------------------------------------------------
  {
    slug: 'rhodes-scholarship',
    name: 'Rhodes Scholarship',
    shortName: 'Rhodes',
    organization: 'Rhodes Trust',
    fundingAmount: 'Full funding at University of Oxford (tuition + stipend)',
    fundingMin: 75000,
    fundingMax: 100000,
    duration: '2-3 years (depending on degree)',
    applicationCycle: 'Annual (applications open in spring, due in fall)',
    deadline: 'October 2025',
    year: 2026,
    brandColor: '#002147',
    websiteUrl: 'https://www.rhodeshouse.ox.ac.uk',
    description:
      'The Rhodes Scholarship is the oldest and most prestigious international scholarship, fully funding graduate study at the University of Oxford. Established in 1903, it selects exceptional young leaders from over 60 countries each year.',
    summary:
      'The Rhodes Scholarship is widely considered the most prestigious academic award in the world. Established in 1903 through the will of Cecil Rhodes, the scholarship fully funds graduate study at the University of Oxford for exceptional young people who demonstrate outstanding intellect, character, leadership, and commitment to service. Approximately 100 scholars are selected each year from over 60 countries.\n\nRhodes Scholars receive full tuition at Oxford, a generous living stipend, health insurance, and travel allowances. They can pursue virtually any graduate degree the university offers, from a second BA to a DPhil (PhD). The scholarship community at Rhodes House provides a rich intellectual and social environment, with regular events, lectures, and retreats that bring together current scholars and the global alumni network.\n\nThe Rhodes alumni network is one of the most accomplished in the world. Rhodes Scholars include former US President Bill Clinton, astronomer Edwin Hubble, Nobel laureate economist Michael Spence, former Australian Prime Minister Bob Hawke, journalist Rachel Maddow, and LinkedIn co-founder Reid Hoffman. The scholarship continues to be a transformative experience that shapes careers in government, academia, business, journalism, and public service.',
    sections: [
      {
        title: 'What You Get',
        content:
          'The Rhodes Scholarship covers the full cost of studying at Oxford, one of the world\'s greatest universities.',
        bulletPoints: [
          'Full tuition fees for your chosen Oxford degree program',
          'Annual living stipend (approximately $20,000-$22,000 per year)',
          'Economy class airfare to and from Oxford each year',
          'Health insurance coverage for the duration of the scholarship',
          'Access to Rhodes House, a dedicated community hub for scholars',
          'Regular intellectual programming: lectures, symposia, and retreats',
          'Lifetime membership in the Rhodes Scholar alumni network (8,000+ members)',
          'Possible funding for a second degree at Oxford (up to 3 years total)',
        ],
      },
      {
        title: 'Selection Process',
        content:
          'The Rhodes selection process is rigorous and highly competitive, evaluating candidates on four criteria established by Cecil Rhodes.',
        bulletPoints: [
          'Literary and scholastic attainment (academic excellence)',
          'Energy to use one\'s talents to the full (ambition and follow-through)',
          'Truth, courage, devotion to duty, and kindliness (character)',
          'Moral force of character and instincts to lead (leadership)',
          'Application includes transcripts, personal statement, and 5-8 recommendation letters',
          'District-level interviews followed by state/national finals',
          'Final interviews are conducted by committees of Rhodes alumni and leaders',
          'Approximately 32 scholars selected from the US; ~100 globally each year',
        ],
      },
      {
        title: 'Notable Alumni',
        content:
          'Rhodes Scholars have gone on to leadership positions across every major field of human endeavor.',
        bulletPoints: [
          'Bill Clinton — 42nd President of the United States',
          'Edwin Hubble — astronomer who proved the universe is expanding',
          'Reid Hoffman — co-founder of LinkedIn',
          'Rachel Maddow — journalist and MSNBC host',
          'Susan Rice — former US National Security Advisor',
          'Cory Booker — US Senator',
          'Ronan Farrow — Pulitzer Prize-winning journalist',
          'Pete Buttigieg — US Secretary of Transportation',
        ],
      },
    ],
    eligibility: 'Age requirements vary by country (typically 18-28). Must hold at least a bachelor\'s degree by the start of the scholarship. Applicants must apply through their country of citizenship or legal residency. Strong academic record required (GPA typically 3.7+).',
    ageRange: '18-28 (varies by country)',
    geographicScope: 'multi-country',
    category: 'research-science',
    tags: ['Any Field', 'Leadership', 'Global Affairs', 'Science & Research', 'Social Impact'],
    relatedProblemCategories: ['Moonshots', 'Education', 'Health & wellness', 'Climate tech'],
    tagCount: 5,
  },

  // ----------------------------------------------------------------
  // 2. Marshall Scholarship
  // ----------------------------------------------------------------
  {
    slug: 'marshall-scholarship',
    name: 'Marshall Scholarship',
    shortName: 'Marshall',
    organization: 'UK Government (Foreign, Commonwealth & Development Office)',
    fundingAmount: 'Full funding at any UK university (tuition + stipend)',
    fundingMin: 60000,
    fundingMax: 90000,
    duration: '2 years (extendable to 3)',
    applicationCycle: 'Annual (applications due in early fall)',
    deadline: 'September 2025',
    year: 2026,
    brandColor: '#003078',
    websiteUrl: 'https://www.marshallscholarship.org',
    description:
      'The Marshall Scholarship funds outstanding young Americans to pursue graduate study at any UK university. Established in 1953 as a gesture of gratitude for the Marshall Plan, the program selects approximately 50 scholars each year.',
    summary:
      'The Marshall Scholarship is one of the most prestigious postgraduate awards available to American students. Established in 1953 by the British government as a living gift to the United States in gratitude for the Marshall Plan, the scholarship finances young Americans of high ability to study for graduate degrees at any university in the United Kingdom.\n\nUnlike the Rhodes Scholarship, which is restricted to Oxford, Marshall Scholars can attend any UK university, including Cambridge, Imperial College London, the London School of Economics, Edinburgh, UCL, and many others. This flexibility allows scholars to pursue the specific programs and supervisors that best match their academic and professional goals. Approximately 50 scholars are selected each year.\n\nMarshall Scholars have gone on to distinguished careers in government, academia, business, science, and the arts. Notable alumni include Supreme Court Justice Neil Gorsuch, former National Security Advisor Thomas Donilon, Pulitzer Prize-winning author Anne Applebaum, and Ray Dalio (founder of Bridgewater Associates). The scholarship emphasizes not only academic excellence but also the potential to strengthen the US-UK relationship and make a significant contribution to society.',
    sections: [
      {
        title: 'What You Get',
        content:
          'The Marshall Scholarship provides comprehensive funding to study at the UK university of your choice.',
        bulletPoints: [
          'Full tuition fees at any UK university for up to 2 years (extendable to 3)',
          'Annual personal living allowance (approximately $15,000-$18,000)',
          'Annual book grant for academic materials',
          'Thesis/research grant for dissertation-related expenses',
          'Economy class return airfare to the UK',
          'Arrival allowance to help with settling-in costs',
          'Fares and expenses for travel to the UK in connection with the scholarship',
          'Optional extension to a third year for PhD or second master\'s degree',
        ],
      },
      {
        title: 'Selection Criteria',
        content:
          'The Marshall Scholarship evaluates candidates on academic merit, leadership, and ambassadorial potential.',
        bulletPoints: [
          'Must be a US citizen with a minimum GPA of 3.7 from an accredited US university',
          'Must have graduated from undergraduate no more than 3 years prior',
          'Demonstrated academic distinction and intellectual curiosity',
          'Strong leadership record in campus and community activities',
          'Clear, well-articulated plan for graduate study and how it connects to career goals',
          'Potential to serve as an ambassador between the US and UK',
          'Application includes personal statement, proposed program of study, and 4 reference letters',
          'Regional interviews conducted at British consulates across the US',
        ],
      },
      {
        title: 'How to Apply',
        content:
          'The Marshall application process begins at your undergraduate institution and progresses through regional interviews.',
        bulletPoints: [
          'Many universities have internal deadlines in August, before the national deadline in September',
          'Check with your campus fellowship advisor early — most schools have a pre-screening process',
          'Apply to specific degree programs at UK universities (you must identify these in advance)',
          'Strong applications demonstrate a clear link between your past work, proposed study, and future goals',
          'Regional finalists are interviewed by committees at British consulates',
          'Results announced in November for the following academic year',
        ],
      },
    ],
    eligibility: 'Must be a US citizen. Must hold a bachelor\'s degree from an accredited US university with a minimum GPA of 3.7. Must have graduated within the past 3 years. Cannot already hold a degree from a UK institution.',
    ageRange: '20-30 (within 3 years of graduation)',
    geographicScope: 'us',
    category: 'research-science',
    tags: ['Any Field', 'Leadership', 'Global Affairs', 'Science & Research', 'Policy & Government'],
    relatedProblemCategories: ['Education', 'Moonshots', 'Climate tech'],
    tagCount: 5,
  },

  // ----------------------------------------------------------------
  // 3. Hertz Fellowship
  // ----------------------------------------------------------------
  {
    slug: 'hertz-fellowship',
    name: 'Hertz Fellowship',
    shortName: 'Hertz',
    organization: 'Fannie and John Hertz Foundation',
    fundingAmount: '$250,000+ over 5 years',
    fundingMin: 250000,
    fundingMax: 250000,
    duration: 'Up to 5 years of PhD study',
    applicationCycle: 'Annual (applications open in August, due in October)',
    deadline: 'October 2025',
    year: 2026,
    brandColor: '#8B0000',
    websiteUrl: 'https://www.hertzfoundation.org',
    description:
      'The Hertz Fellowship provides up to $250,000 in funding for PhD students in the applied physical, biological, and engineering sciences. It is one of the most generous and selective doctoral fellowships in the United States.',
    summary:
      'The Hertz Fellowship is one of the most prestigious and financially generous doctoral fellowships in the United States. Funded by the Fannie and John Hertz Foundation, the fellowship supports PhD students whose work has the potential for real-world application in the physical, biological, and engineering sciences. The foundation was established in 1957 by John Hertz (founder of the Hertz car rental company and Yellow Cab) with a mission to support America\'s most promising applied scientists and engineers.\n\nThe fellowship provides a personal stipend of $50,000 per year for up to five years, plus full tuition at one of the foundation\'s partner universities. The total value can exceed $250,000, making it one of the largest individual graduate fellowships available. Critically, the Hertz Fellowship allows recipients to pursue any research direction — there are no restrictions on topic, and fellows are free to change advisors or even fields during their PhD.\n\nHertz Fellows form a community of approximately 1,200 alumni, many of whom have gone on to become leaders in science, technology, and policy. The community includes Nobel laureates, MacArthur Fellows, National Academy members, and founders of major technology companies. The fellowship is known for its rigorous and unusual selection process, which emphasizes creative problem-solving and independent thinking over conventional metrics.',
    sections: [
      {
        title: 'What You Get',
        content:
          'One of the most generous PhD fellowships in the world, designed to free fellows from financial constraints so they can pursue ambitious research.',
        bulletPoints: [
          '$50,000 annual personal stipend for up to 5 years',
          'Full tuition coverage at a Hertz-affiliated university',
          'Total value exceeding $250,000 over the fellowship period',
          'Complete freedom to choose and change research direction',
          'No service obligation or research restrictions',
          'Lifetime membership in the Hertz Fellow community (1,200+ members)',
          'Annual symposium for current fellows and alumni',
          'Can be held concurrently with other fellowships (e.g., NSF GRFP)',
        ],
      },
      {
        title: 'Selection Process',
        content:
          'The Hertz selection process is famously rigorous, designed to identify independent thinkers and creative problem-solvers.',
        bulletPoints: [
          'Approximately 700 applications for 12-15 fellowships per year (under 2% acceptance rate)',
          'Application includes detailed research proposal, transcripts, and recommendations',
          'First-round technical interview with Hertz alumni (often a deep dive into your research)',
          'Second-round interview that may include on-the-spot problem-solving challenges',
          'Interviewers probe for intellectual depth, creativity, and ability to think on your feet',
          'The foundation values "maverick" thinkers who challenge conventional approaches',
          'Must be a US citizen or permanent resident',
          'Must attend a Hertz-affiliated university (includes most top research universities)',
        ],
      },
      {
        title: 'Notable Alumni',
        content:
          'Hertz Fellows have made foundational contributions across science, technology, and entrepreneurship.',
        bulletPoints: [
          'Multiple Nobel Prize laureates in Physics and Chemistry',
          'Founders of technology companies including major defense and biotech firms',
          'Leaders at national laboratories (Los Alamos, Lawrence Livermore, Sandia)',
          'Senior officials at DARPA, NASA, and the Department of Energy',
          'Professors at nearly every top research university in the US',
          'MacArthur "Genius Grant" recipients across multiple disciplines',
        ],
      },
    ],
    eligibility: 'Must be a US citizen or permanent resident. Must be applying to or enrolled in a PhD program in the applied physical, biological, or engineering sciences at a Hertz-affiliated university. First-year and prospective PhD students are preferred.',
    geographicScope: 'us',
    category: 'research-science',
    tags: ['Science & Research', 'Deep Tech', 'Healthcare & Biotech', 'Climate & Energy'],
    relatedProblemCategories: ['Moonshots', 'Climate tech', 'Health & wellness', 'Longevity', 'AI & infrastructure'],
    tagCount: 4,
  },

  // ----------------------------------------------------------------
  // 4. NSF GRFP
  // ----------------------------------------------------------------
  {
    slug: 'nsf-grfp',
    name: 'NSF Graduate Research Fellowship Program (GRFP)',
    shortName: 'NSF GRFP',
    organization: 'National Science Foundation',
    fundingAmount: '$37,000/year stipend + $16,000 education allowance',
    fundingMin: 111000,
    fundingMax: 159000,
    duration: '3 years of support over a 5-year period',
    applicationCycle: 'Annual (applications due in October)',
    deadline: 'October 2025',
    year: 2026,
    brandColor: '#003DA5',
    websiteUrl: 'https://www.nsfgrfp.org',
    description:
      'The NSF GRFP is the premier federal fellowship for STEM graduate students, providing three years of financial support including a $37,000 annual stipend and $16,000 education allowance. Over 2,000 fellowships are awarded annually.',
    summary:
      'The National Science Foundation Graduate Research Fellowship Program (GRFP) is the oldest and most prestigious federal fellowship for graduate students in STEM fields. Established in 1952, the GRFP has supported over 60,000 fellows, including more than 40 Nobel laureates and numerous leaders in science, engineering, and technology. The program provides three years of financial support over a five-year fellowship period.\n\nThe GRFP awards approximately 2,000 new fellowships each year, making it by far the largest fellowship program for STEM graduate students in the United States. Each fellow receives an annual stipend of $37,000 and a $16,000 cost-of-education allowance paid to the institution. The fellowship is portable, meaning it can be used at any accredited US institution, and fellows can defer or suspend the fellowship to accommodate research needs, internships, or personal circumstances.\n\nBeyond the financial support, the NSF GRFP is a career-defining credential. It signals that the federal government has identified the recipient as one of the most promising early-career researchers in their field. GRFP fellows gain access to professional development opportunities, INTERN supplements for non-academic research experiences, and the broader NSF community. The fellowship is particularly valuable because it provides unrestricted funding — fellows can pursue any research topic within NSF-supported fields.',
    sections: [
      {
        title: 'What You Get',
        content:
          'Substantial multi-year funding with the flexibility to pursue your research interests freely.',
        bulletPoints: [
          '$37,000 annual stipend for 3 years of support',
          '$16,000 annual cost-of-education allowance paid to your institution',
          'Total value of $159,000 over the 3 years of support',
          '5-year fellowship window (use 3 years of funding flexibly within 5 years)',
          'Portable to any accredited US graduate institution',
          'INTERN supplement available for non-academic research experiences',
          'International research opportunities through partnerships',
          'Can be held concurrently with other fellowships (rules vary)',
          'Access to NSF professional development and networking events',
        ],
      },
      {
        title: 'How to Apply',
        content:
          'The GRFP application is evaluated primarily on intellectual merit and broader impacts.',
        bulletPoints: [
          'Personal statement (up to 3 pages) describing your background, motivations, and goals',
          'Graduate research plan (up to 2 pages) outlining a proposed research project',
          'Three reference letters from faculty, research supervisors, or mentors',
          'Transcripts from all post-secondary institutions attended',
          'Evaluated on two criteria: Intellectual Merit and Broader Impacts',
          'Broader Impacts includes outreach, mentoring, diversity, and societal benefit',
          'Senior undergraduate students and first/second-year graduate students are eligible',
          'You may only apply once as an undergraduate and once as a graduate student',
        ],
      },
      {
        title: 'Eligible Fields',
        content:
          'The GRFP supports research in all NSF-funded fields of science, technology, engineering, and mathematics.',
        bulletPoints: [
          'Biological sciences (ecology, molecular biology, neuroscience, etc.)',
          'Computer and information sciences (AI, systems, HCI, etc.)',
          'Engineering (electrical, mechanical, chemical, biomedical, etc.)',
          'Geosciences (atmospheric, earth, ocean sciences)',
          'Mathematical sciences (pure math, applied math, statistics)',
          'Physics and astronomy',
          'Chemistry and materials science',
          'Social, behavioral, and economic sciences (psychology, economics, sociology)',
          'STEM education research',
        ],
      },
    ],
    eligibility: 'Must be a US citizen, US national, or permanent resident. Must be enrolled in or applying to a research-based graduate program in an NSF-supported STEM field at an accredited US institution. Senior undergraduates and first- or second-year graduate students are eligible.',
    geographicScope: 'us',
    category: 'research-science',
    tags: ['Science & Research', 'AI & Machine Learning', 'Climate & Energy', 'Healthcare & Biotech', 'Deep Tech'],
    relatedProblemCategories: ['Moonshots', 'Climate tech', 'Health & wellness', 'AI & infrastructure', 'Education'],
    tagCount: 5,
  },

  // ----------------------------------------------------------------
  // 5. Schmidt Science Fellows
  // ----------------------------------------------------------------
  {
    slug: 'schmidt-science-fellows',
    name: 'Schmidt Science Fellows',
    shortName: 'Schmidt',
    organization: 'Schmidt Sciences (in partnership with Rhodes Trust)',
    fundingAmount: 'Fully funded 2-year postdoctoral fellowship',
    fundingMin: 100000,
    fundingMax: 200000,
    duration: '2 years',
    applicationCycle: 'Annual (nominations open in fall, applications in winter)',
    deadline: 'January 2026',
    year: 2026,
    brandColor: '#1B365D',
    websiteUrl: 'https://schmidtsciencefellows.org',
    description:
      'Schmidt Science Fellows supports exceptional early-career scientists in pivoting to a new field for interdisciplinary postdoctoral research. The program is funded by Schmidt Sciences and administered in partnership with the Rhodes Trust.',
    summary:
      'The Schmidt Science Fellows program was created to break down the silos that prevent scientific breakthroughs. Founded by Eric and Wendy Schmidt through Schmidt Sciences, and administered in partnership with the Rhodes Trust, the fellowship supports exceptional postdoctoral researchers who want to pivot into a new scientific discipline. The core premise is that the most important discoveries of the 21st century will come from scientists who can bridge multiple fields.\n\nEach year, approximately 20-30 fellows are selected from a global pool of recently completed PhD graduates. The fellowship provides full funding for a two-year postdoc at a world-class laboratory in a field different from the fellow\'s PhD discipline. For example, a physicist might do their postdoc in computational biology, or a computer scientist might pivot to climate science. This deliberate field-switching is the defining feature of the program.\n\nFellows also participate in a comprehensive leadership development program, including global convenings, mentorship from senior scientists, and training in science communication, policy, and entrepreneurship. The fellowship community is deliberately small and tight-knit, creating deep bonds between fellows across disciplines and geographies. Schmidt Science Fellows are expected to become leaders who drive interdisciplinary science throughout their careers.',
    sections: [
      {
        title: 'What You Get',
        content:
          'A fully funded postdoctoral experience designed to transform your research trajectory.',
        bulletPoints: [
          'Competitive postdoctoral salary for 2 years (varies by host institution and location)',
          'Research and travel funding to support your work and collaboration',
          'Placement at a world-class laboratory in a field outside your PhD discipline',
          'Global convenings bringing together the full fellow cohort multiple times per year',
          'Leadership training in communication, policy, management, and entrepreneurship',
          'Mentorship from senior scientists and leaders across disciplines',
          'Lifetime membership in the Schmidt Science Fellows community',
          'Support in identifying and securing your post-fellowship career position',
        ],
      },
      {
        title: 'What They Look For',
        content:
          'The program seeks exceptional scientists who are eager to step outside their comfort zone and work across disciplines.',
        bulletPoints: [
          'Must have completed (or be near completion of) a PhD in a natural science, engineering, mathematics, or computing field',
          'Must propose a postdoctoral research plan in a discipline substantially different from your PhD',
          'Track record of outstanding research achievement during PhD',
          'Demonstrated intellectual curiosity and willingness to take risks',
          'Leadership potential and commitment to using science for societal benefit',
          'Nominations typically come through university departmental channels',
          'Strong preference for candidates within 1-2 years of PhD completion',
          'Global eligibility — fellows come from and work in institutions worldwide',
        ],
      },
    ],
    eligibility: 'Must hold a PhD (or be near completion) in natural sciences, engineering, mathematics, or computing. Must be within approximately 1-2 years of PhD completion. Must propose a postdoctoral plan in a discipline substantially different from the PhD field. Open to candidates of all nationalities.',
    geographicScope: 'global',
    category: 'research-science',
    tags: ['Science & Research', 'AI & Machine Learning', 'Healthcare & Biotech', 'Climate & Energy', 'Deep Tech'],
    relatedProblemCategories: ['Moonshots', 'Health & wellness', 'Climate tech', 'AI & infrastructure', 'Longevity'],
    tagCount: 5,
  },

  // ----------------------------------------------------------------
  // 6. Google PhD Fellowship
  // ----------------------------------------------------------------
  {
    slug: 'google-phd-fellowship',
    name: 'Google PhD Fellowship',
    shortName: 'Google PhD',
    organization: 'Google Research',
    fundingAmount: '$85,000/year (stipend + tuition)',
    fundingMin: 85000,
    fundingMax: 255000,
    duration: 'Up to 3 years',
    applicationCycle: 'Annual (nominations in spring)',
    deadline: 'April 2026',
    year: 2026,
    brandColor: '#4285F4',
    websiteUrl: 'https://research.google/programs-and-events/phd-fellowship/',
    description:
      'The Google PhD Fellowship recognizes and supports outstanding PhD students doing exceptional research in computer science, AI, and related fields. Fellows receive $85,000 per year and are matched with a Google Research mentor.',
    summary:
      'The Google PhD Fellowship is one of the most coveted industry research fellowships for doctoral students in computer science and related fields. The program recognizes exceptional PhD students who are already making significant research contributions and provides financial support along with direct mentorship from a Google Research scientist.\n\nFellows receive approximately $85,000 per year, which includes both a stipend and an educational allowance. The fellowship can last up to three years, representing a total value of up to $255,000. But the financial support is only part of the value — fellows are paired with a Google Research mentor who provides guidance, collaboration opportunities, and a window into the research happening at one of the world\'s most important technology companies.\n\nThe Google PhD Fellowship covers a wide range of research areas, from core AI and machine learning to quantum computing, natural language processing, human-computer interaction, and algorithms. The program operates globally, with separate tracks for students in North America, Europe, the Middle East, Africa, and the Asia-Pacific region. Being selected as a Google PhD Fellow is a powerful signal of research excellence that opens doors in both academia and industry.',
    sections: [
      {
        title: 'What You Get',
        content:
          'Substantial financial support combined with direct access to Google\'s research organization.',
        bulletPoints: [
          'Approximately $85,000 per year (stipend + tuition/fees)',
          'Up to 3 years of funding (total value up to $255,000)',
          'Dedicated Google Research mentor in your research area',
          'Invitation to the annual Google PhD Fellow Summit',
          'Opportunities for summer internships at Google Research',
          'Access to Google compute resources for research',
          'Recognition and credential that is highly valued in academia and industry',
          'Networking with other Google PhD Fellows worldwide',
        ],
      },
      {
        title: 'Research Areas',
        content:
          'The fellowship covers a broad range of topics at the frontier of computer science and related disciplines.',
        bulletPoints: [
          'Machine Learning and AI (core ML, reinforcement learning, generative models)',
          'Natural Language Processing and Understanding',
          'Computer Vision and Computational Photography',
          'Algorithms, Optimization, and Markets',
          'Human-Computer Interaction',
          'Quantum Computing',
          'Security, Privacy, and Cryptography',
          'Systems and Networking',
          'Health and Bioscience (computational biology, medical AI)',
          'Responsible AI and Ethics',
        ],
      },
      {
        title: 'How to Apply',
        content:
          'The Google PhD Fellowship is nomination-based — you cannot apply directly.',
        bulletPoints: [
          'Students must be nominated by their PhD advisor or department',
          'Each university department typically receives a limited number of nomination slots',
          'Nomination packages include research statement, CV, publications, and advisor letter',
          'Must be a full-time PhD student who has completed at least one year of graduate study',
          'Strong publication record in top-tier venues is expected',
          'Selection committee includes Google Research scientists and external reviewers',
          'Regional tracks have separate timelines (North America nominations typically in spring)',
        ],
      },
    ],
    eligibility: 'Must be a full-time PhD student who has completed at least one year of study. Must be nominated by their university department (direct applications not accepted). Open to students at universities worldwide. Must be studying computer science, AI, or a closely related field.',
    geographicScope: 'global',
    category: 'research-science',
    tags: ['AI & Machine Learning', 'Science & Research', 'Deep Tech', 'Healthcare & Biotech'],
    relatedProblemCategories: ['AI & infrastructure', 'Moonshots', 'Health & wellness'],
    tagCount: 4,
  },

  // ----------------------------------------------------------------
  // 7. Meta Research PhD Fellowship
  // ----------------------------------------------------------------
  {
    slug: 'meta-research-phd-fellowship',
    name: 'Meta Research PhD Fellowship',
    shortName: 'Meta PhD',
    organization: 'Meta',
    fundingAmount: 'Tuition + $42,000/year stipend',
    fundingMin: 42000,
    fundingMax: 168000,
    duration: 'Up to 2 years (renewable for additional 2 years)',
    applicationCycle: 'Annual (applications in fall)',
    deadline: 'October 2025',
    year: 2026,
    brandColor: '#0668E1',
    websiteUrl: 'https://research.facebook.com/fellowship/',
    description:
      'The Meta Research PhD Fellowship supports outstanding PhD students doing pioneering research in AI, computer science, and related fields. Fellows receive full tuition coverage, a $42,000 annual stipend, and mentorship from Meta researchers.',
    summary:
      'The Meta Research PhD Fellowship (formerly the Facebook Fellowship) is a competitive program that supports PhD students conducting cutting-edge research in areas aligned with Meta\'s research priorities. The fellowship provides full tuition coverage and a $42,000 annual stipend, along with access to Meta\'s research organization and the opportunity to intern at Meta\'s research labs.\n\nThe fellowship reflects Meta\'s heavy investment in fundamental research, particularly in AI, augmented reality, virtual reality, and the underlying technologies that power large-scale social platforms. Fellows are selected based on the strength and relevance of their research, their potential to become leaders in their field, and the alignment of their work with Meta\'s research directions.\n\nMeta\'s research organization — FAIR (Fundamental AI Research), Reality Labs Research, and other teams — includes some of the most prolific AI researchers in the world, including Yann LeCun (Turing Award winner and Meta\'s Chief AI Scientist). Fellows gain access to this intellectual community through mentorship, internship opportunities, and invitations to research events. The fellowship has supported many students who have gone on to become prominent researchers and faculty members.',
    sections: [
      {
        title: 'What You Get',
        content:
          'Comprehensive financial support and access to one of the world\'s leading AI research organizations.',
        bulletPoints: [
          'Full tuition and fees coverage',
          '$42,000 annual stipend for living expenses',
          'Up to 2 years of support, renewable for an additional 2 years in some cases',
          'Conference travel budget for presenting research',
          'Paid summer internship opportunity at Meta Research',
          'Mentorship from a Meta researcher in your area',
          'Invitation to the Meta Research PhD Fellow Summit',
          'Access to Meta compute infrastructure for research projects',
        ],
      },
      {
        title: 'Research Areas',
        content:
          'The fellowship covers research areas spanning AI, systems, and emerging computing platforms.',
        bulletPoints: [
          'AI and Machine Learning (NLP, computer vision, reinforcement learning, generative AI)',
          'AR/VR and Spatial Computing (rendering, sensing, haptics, audio)',
          'Systems and Infrastructure (distributed systems, databases, networking)',
          'Security and Privacy',
          'Human-Computer Interaction and Social Computing',
          'Computational Social Science',
          'Economics and Computation',
          'Programming Languages and Software Engineering',
        ],
      },
      {
        title: 'How to Apply',
        content:
          'Unlike the Google PhD Fellowship, the Meta Research PhD Fellowship accepts direct applications from students.',
        bulletPoints: [
          'Apply directly through the Meta Research fellowship portal',
          'Application includes research statement, CV, publication list, and transcripts',
          'Two recommendation letters (one must be from your PhD advisor)',
          'Must be a full-time PhD student in at least their second year',
          'Strong publication record in top-tier venues is expected',
          'Demonstrated research impact and clear future research direction',
          'Open to students at accredited universities worldwide',
          'Selections announced in late winter/early spring',
        ],
      },
    ],
    eligibility: 'Must be a full-time PhD student enrolled at an accredited university worldwide. Must have completed at least one year of PhD study by the fellowship start date. Must be studying computer science, AI, electrical engineering, or a closely related field. Open to students of any nationality.',
    geographicScope: 'global',
    category: 'research-science',
    tags: ['AI & Machine Learning', 'Science & Research', 'Deep Tech'],
    relatedProblemCategories: ['AI & infrastructure', 'Moonshots', 'Future of work'],
    tagCount: 3,
  },

  // ----------------------------------------------------------------
  // 8. DeepMind Postdoctoral Fellowship
  // ----------------------------------------------------------------
  {
    slug: 'deepmind-postdoctoral-fellowship',
    name: 'DeepMind Postdoctoral Fellowship',
    shortName: 'DeepMind',
    organization: 'Google DeepMind',
    fundingAmount: 'Fully funded postdoctoral position',
    fundingMin: 60000,
    fundingMax: 90000,
    duration: '2 years',
    applicationCycle: 'Annual (varies by partner institution)',
    year: 2026,
    brandColor: '#5F6368',
    websiteUrl: 'https://deepmind.google/about/education/',
    description:
      'The DeepMind Postdoctoral Fellowship places early-career AI researchers at top UK universities to pursue independent research at the intersection of AI and scientific discovery. The fellowship is fully funded by Google DeepMind.',
    summary:
      'The DeepMind Postdoctoral Fellowship is designed to nurture the next generation of AI researchers by placing them at leading UK universities with full funding from Google DeepMind. The fellowship supports researchers who want to pursue ambitious, independent research at the intersection of artificial intelligence and other scientific disciplines, including biology, physics, mathematics, neuroscience, and beyond.\n\nDeepMind has established fellowship partnerships with several top UK universities, including University College London (UCL), the University of Oxford, the University of Cambridge, and others. Fellows hold their positions at the university and have access to DeepMind\'s research community, including seminars, reading groups, and informal collaboration with DeepMind researchers. The program explicitly encourages work that bridges AI methodology with scientific applications.\n\nThe fellowship reflects DeepMind\'s founding mission to "solve intelligence and then use it to solve everything else." DeepMind\'s research breakthroughs — including AlphaFold (protein structure prediction), AlphaGo (game-playing AI), and contributions to weather forecasting and materials science — demonstrate the potential of AI-driven scientific discovery. The postdoctoral fellowship aims to grow the pipeline of researchers who can carry this work forward.',
    sections: [
      {
        title: 'What You Get',
        content:
          'A fully funded postdoctoral research position at a world-class UK university with connections to Google DeepMind.',
        bulletPoints: [
          'Competitive postdoctoral salary funded by Google DeepMind (in line with UK university scales)',
          'Research budget for equipment, travel, and conferences',
          '2-year appointment at a DeepMind partner university (UCL, Oxford, Cambridge, etc.)',
          'Access to DeepMind seminars, reading groups, and research community',
          'Opportunities for informal collaboration with DeepMind research scientists',
          'Mentorship from both university faculty and DeepMind researchers',
          'Complete academic freedom to define your research agenda',
          'Support for publishing and presenting at top conferences',
        ],
      },
      {
        title: 'What They Look For',
        content:
          'The fellowship seeks exceptional researchers who can advance AI and apply it to fundamental scientific questions.',
        bulletPoints: [
          'PhD in computer science, machine learning, mathematics, neuroscience, physics, or a related field',
          'Strong publication record demonstrating both technical depth and originality',
          'Research vision that connects AI with scientific discovery or fundamental understanding',
          'Interest in interdisciplinary work (e.g., AI for biology, physics, mathematics)',
          'Ability to work independently while also collaborating across institutions',
          'Typically within 1-3 years of PhD completion',
          'Applications typically go through the partner university\'s postdoctoral hiring process',
        ],
      },
    ],
    eligibility: 'Must hold a PhD (or be near completion) in computer science, machine learning, mathematics, neuroscience, physics, or a closely related field. Must be eligible to work in the United Kingdom. Typically within 1-3 years of PhD completion.',
    geographicScope: 'uk',
    category: 'research-science',
    tags: ['AI & Machine Learning', 'Science & Research', 'Deep Tech', 'Healthcare & Biotech'],
    relatedProblemCategories: ['AI & infrastructure', 'Moonshots', 'Health & wellness', 'Longevity'],
    tagCount: 4,
  },

  // ----------------------------------------------------------------
  // 9. Activate Fellowship
  // ----------------------------------------------------------------
  {
    slug: 'activate-fellowship',
    name: 'Activate Fellowship',
    shortName: 'Activate',
    organization: 'Activate',
    fundingAmount: '$100,000+ research funding + lab access',
    fundingMin: 100000,
    fundingMax: 200000,
    duration: '2 years',
    applicationCycle: 'Annual (applications in late fall/early winter)',
    deadline: 'December 2025',
    year: 2026,
    brandColor: '#E63946',
    websiteUrl: 'https://www.activate.org',
    description:
      'The Activate Fellowship supports scientist-entrepreneurs who are commercializing deep tech innovations. Fellows receive funding, lab access at partner institutions, and intensive entrepreneurship training over a 2-year program.',
    summary:
      'Activate (formerly Cyclotron Road, founded at Lawrence Berkeley National Laboratory) is the leading fellowship program for scientists and engineers who want to turn breakthrough research into real-world products and companies. The program bridges the gap between lab discovery and startup formation — the so-called "valley of death" where promising technologies often stall because researchers lack the resources, skills, and networks to commercialize their work.\n\nFellows receive over $100,000 in funding, access to world-class research facilities at Activate\'s partner institutions (including Lawrence Berkeley National Laboratory, Oak Ridge National Laboratory, and partner universities), and an intensive 2-year entrepreneurship curriculum. The program covers everything from IP strategy and fundraising to customer discovery and team building. Fellows are embedded in a cohort of fellow scientist-entrepreneurs and supported by mentors from the worlds of science, venture capital, and industry.\n\nActivate has helped launch over 100 companies that have collectively raised over $3 billion in follow-on funding. These companies work on some of the hardest problems in energy, materials, biology, and manufacturing. The fellowship is unique in that it explicitly targets the commercialization gap — it is designed for researchers who have made a scientific breakthrough and need support to turn it into a viable business.',
    sections: [
      {
        title: 'What You Get',
        content:
          'A comprehensive package designed to help scientists transition from research to entrepreneurship.',
        bulletPoints: [
          'Over $100,000 in research and living funding over 2 years',
          'Access to world-class laboratory facilities at partner national labs and universities',
          'Dedicated lab space and equipment for your research and prototyping',
          'Intensive entrepreneurship curriculum covering IP, fundraising, go-to-market, and team building',
          'Cohort of 15-20 fellow scientist-entrepreneurs for peer support and collaboration',
          'Mentorship from experienced entrepreneurs, VCs, and industry experts',
          'Connections to the Activate alumni network (100+ companies, $3B+ raised)',
          'Support in raising follow-on funding from grants, VCs, and strategic investors',
        ],
      },
      {
        title: 'What They Look For',
        content:
          'Activate seeks researchers with breakthrough technologies that can address major societal challenges through commercialization.',
        bulletPoints: [
          'PhD or equivalent research experience in a physical science, engineering, or biological field',
          'A specific technology or scientific breakthrough with commercial potential',
          'Focus areas include energy, climate, advanced materials, manufacturing, biology, and computing',
          'Willingness to commit full-time to the program for 2 years',
          'Entrepreneurial drive — genuine desire to build a company, not just publish papers',
          'No company required at time of application (pre-formation is fine)',
          'Must be eligible to work in the United States',
          'Strong preference for technologies at the "valley of death" stage (proven in lab, not yet commercialized)',
        ],
      },
      {
        title: 'Program Locations',
        content:
          'Activate runs programs at multiple locations, each with access to unique research infrastructure.',
        bulletPoints: [
          'Berkeley, CA — embedded at Lawrence Berkeley National Laboratory (LBNL), the flagship site',
          'New York, NY — partnerships with NYC-area research institutions',
          'Houston, TX — focused on energy, materials, and industrial technologies',
          'Oak Ridge, TN — embedded at Oak Ridge National Laboratory (ORNL)',
          'Each location has access to specialized equipment, clean rooms, and fabrication facilities',
          'Fellows choose a location based on the infrastructure needs of their technology',
        ],
      },
    ],
    eligibility: 'Must hold a PhD or equivalent research experience in a physical science, engineering, or biological field. Must have a specific technology with commercial potential. Must be eligible to work in the United States. Must commit full-time to the 2-year program.',
    geographicScope: 'us',
    category: 'research-science',
    tags: ['Deep Tech', 'Climate & Energy', 'Science & Research', 'Entrepreneurship', 'Healthcare & Biotech'],
    relatedProblemCategories: ['Moonshots', 'Climate tech', 'Health & wellness', 'AI & infrastructure', 'Longevity'],
    tagCount: 5,
  },
]
