import type { Fellowship } from './index'

export const internationalGraduateFellowships: Fellowship[] = [
  // ----------------------------------------------------------------
  // 1. Fulbright U.S. Student Program
  // ----------------------------------------------------------------
  {
    slug: 'fulbright-us-student',
    name: 'Fulbright U.S. Student Program',
    shortName: 'Fulbright',
    organization: 'U.S. Department of State',

    fundingAmount: 'Fully funded (travel, living, tuition)',
    fundingMin: undefined,
    fundingMax: undefined,

    duration: '1 academic year (9–12 months)',
    applicationCycle: 'Annual',
    deadline: 'October (campus deadlines may be earlier)',
    year: 2026,

    brandColor: '#002868',
    websiteUrl: 'https://us.fulbrightonline.org',

    description:
      'The flagship international exchange program of the U.S. government, funding American students and recent graduates to study, conduct research, or teach English abroad in over 140 countries.',

    summary:
      'The Fulbright U.S. Student Program is the largest and most well-known international exchange program in the world. Established in 1946 by Senator J. William Fulbright, the program has sent over 400,000 Americans abroad and brought a similar number of international students to the United States. The program is funded by the U.S. Department of State and administered by the Institute of International Education (IIE).\n\nFulbright offers three main tracks for U.S. students: Study/Research Awards for graduate-level academic work abroad, English Teaching Assistant (ETA) Awards for teaching English in schools overseas, and Fulbright-National Geographic Storytelling Fellowships for multimedia documentation of cultural and environmental topics. Each year, approximately 2,000 grants are awarded across more than 140 countries.\n\nWhat makes Fulbright distinctive is its emphasis on cultural exchange alongside academic excellence. Fulbrighters are expected to serve as informal ambassadors, building lasting connections between the United States and their host countries. The alumni network is extraordinary — it includes 62 Nobel Laureates, 89 Pulitzer Prize winners, and countless leaders in government, academia, business, and the arts.',

    sections: [
      {
        title: 'What You Get',
        content:
          'Fulbright provides comprehensive funding to cover the costs of living and working abroad for one academic year.',
        bulletPoints: [
          'Round-trip international airfare to and from the host country',
          'Monthly living stipend calibrated to the cost of living in the host country',
          'Tuition and fees covered for study/research awards (where applicable)',
          'Health insurance coverage for the duration of the grant',
          'Settling-in allowance and baggage allowance',
          'Access to a vast global alumni network of over 400,000 Fulbright alumni',
          'Pre-departure orientation and in-country support from Fulbright commissions',
        ],
      },
      {
        title: 'Selection Process',
        content:
          'The Fulbright selection process is rigorous and multi-layered, involving both campus-level review (for current students) and national-level evaluation.',
        bulletPoints: [
          'Applicants submit a detailed project proposal or ETA statement of interest',
          'A personal statement describing motivation and cross-cultural readiness is required',
          'Three letters of recommendation and academic transcripts are part of the application',
          'Campus Fulbright advisors review applications and may conduct interviews',
          'National screening committees evaluate applications by country and discipline',
          'Host country Fulbright commissions have final approval over candidates',
          'Approximately 20–25% of applicants receive awards (varies by country)',
        ],
      },
      {
        title: 'How to Apply',
        content:
          'Applications are submitted through the Fulbright online portal. Current students should also work with their campus Fulbright advisor, as campus deadlines are often earlier than the national deadline.',
        bulletPoints: [
          'Create an account on the Fulbright application portal at us.fulbrightonline.org',
          'Select a host country and grant type (Study/Research, ETA, or Fulbright-National Geographic)',
          'Draft a detailed and well-researched project proposal or teaching statement',
          'Secure three strong letters of recommendation from faculty or supervisors',
          'If currently enrolled, coordinate with your campus Fulbright Program Advisor',
          'The national deadline is typically in early October, but campus deadlines may be in August or September',
          'Language proficiency may be required or recommended depending on the host country',
        ],
      },
    ],

    eligibility:
      'U.S. citizens or permanent residents who hold at least a bachelor\'s degree by the start of the grant. Current undergraduates may apply during their senior year. No age limit.',
    ageRange: undefined,
    geographicScope: 'us',

    category: 'international-graduate',
    tags: ['Any Field', 'Global Affairs', 'Science & Research', 'Education', 'Social Impact'],

    relatedProblemCategories: ['Education', 'Climate tech', 'Health & wellness'],
    tagCount: 5,
  },

  // ----------------------------------------------------------------
  // 2. Knight-Hennessy Scholars
  // ----------------------------------------------------------------
  {
    slug: 'knight-hennessy-scholars',
    name: 'Knight-Hennessy Scholars',
    shortName: 'Knight-Hennessy',
    organization: 'Stanford University',

    fundingAmount: 'Full funding for up to 3 years at Stanford',
    fundingMin: undefined,
    fundingMax: undefined,

    duration: 'Up to 3 years',
    applicationCycle: 'Annual',
    deadline: 'October',
    year: 2026,

    brandColor: '#8C1515',
    websiteUrl: 'https://knight-hennessy.stanford.edu',

    description:
      'The world\'s largest fully endowed graduate scholarship program, funding students from any country to pursue any graduate degree at Stanford — from the MBA to a PhD in physics to a JD or MD.',

    summary:
      'Knight-Hennessy Scholars is the largest fully endowed graduate scholarship in the world, created in 2016 with a $750 million gift from Phil Knight (co-founder of Nike) and named in honor of former Stanford president John Hennessy. The program funds up to 100 scholars each year to pursue any graduate degree at Stanford University — including the MBA, JD, MD, MA, MS, or PhD — for up to three years.\n\nWhat makes Knight-Hennessy unique among graduate scholarships is its deliberate interdisciplinarity. Scholars come from every field and every country, and the program is designed to break down the silos that typically separate students in different professional and academic programs. Through a shared cohort experience, leadership programming, and collaborative projects, the program aims to develop leaders who can work across boundaries to address complex global challenges.\n\nThe scholarship covers tuition, stipend, and travel, removing all financial barriers to a Stanford graduate education. But the program\'s real value lies in the community: Knight-Hennessy Scholars join a cohort of peers from wildly different backgrounds — a biomedical engineer from Nigeria, a human rights lawyer from Colombia, a computer scientist from Japan — united by a shared commitment to leadership and impact.',

    sections: [
      {
        title: 'What You Get',
        content:
          'Knight-Hennessy provides comprehensive funding alongside a rich leadership development experience.',
        bulletPoints: [
          'Full tuition funding for your Stanford graduate program (up to 3 years)',
          'An annual stipend to cover living expenses, books, and supplies',
          'A travel allowance for annual return trips and conference attendance',
          'A dedicated King Global Leadership Program with workshops, mentoring, and experiential learning',
          'Access to Stanford\'s full resources, including research labs, startup incubators, and career services',
          'A lifelong community of Knight-Hennessy Scholars from over 50 countries and every Stanford school',
          'Graduate housing priority and dedicated scholar community spaces',
        ],
      },
      {
        title: 'Selection Process',
        content:
          'The Knight-Hennessy selection process evaluates leadership, academic excellence, and civic commitment through a multi-stage review.',
        bulletPoints: [
          'Applicants must apply separately to both Knight-Hennessy and their chosen Stanford graduate program',
          'The Knight-Hennessy application includes essays on leadership and impact',
          'Two short video submissions (about 2 minutes each) are required as part of the application',
          'Semifinalists are invited to Stanford for an immersive weekend of interviews and group activities',
          'Selection criteria: independence of thought, purposeful leadership, and a civic mindset',
          'Approximately 75–100 scholars are selected each year from over 5,000 applicants',
          'Applicants must have earned their first undergraduate degree within the last 7 years (or be current seniors)',
        ],
      },
      {
        title: 'How to Apply',
        content:
          'The application process runs in parallel with Stanford graduate admissions. You must be admitted to a Stanford graduate program to receive the scholarship.',
        bulletPoints: [
          'Visit knight-hennessy.stanford.edu to review eligibility and timeline',
          'Submit the Knight-Hennessy application (essays and videos) by the October deadline',
          'Separately apply to your chosen Stanford graduate program by its own deadline',
          'Prepare two short videos that showcase your personality, values, and vision',
          'Secure strong letters of recommendation that speak to your leadership and character',
          'If selected as a semifinalist, attend the immersive weekend at Stanford (travel covered)',
          'Admission to a Stanford graduate program is a prerequisite — both applications must succeed',
        ],
      },
    ],

    eligibility:
      'Open to citizens of any country who are applying to any full-time graduate program at Stanford. Applicants must have earned their first bachelor\'s degree no more than 7 years prior to the start of the program, or be current undergraduates.',
    ageRange: undefined,
    geographicScope: 'global',

    category: 'international-graduate',
    tags: ['Leadership', 'Any Field', 'Entrepreneurship', 'Science & Research', 'Global Affairs'],

    relatedProblemCategories: ['Moonshots', 'AI & infrastructure', 'Climate tech', 'Future of work'],
    tagCount: 5,
  },

  // ----------------------------------------------------------------
  // 3. Gates Cambridge Scholarship
  // ----------------------------------------------------------------
  {
    slug: 'gates-cambridge-scholarship',
    name: 'Gates Cambridge Scholarship',
    shortName: 'Gates Cambridge',
    organization: 'Bill & Melinda Gates Foundation',

    fundingAmount: 'Full cost of study at University of Cambridge',
    fundingMin: undefined,
    fundingMax: undefined,

    duration: '1–4 years (depending on degree)',
    applicationCycle: 'Annual',
    deadline: 'October (US) / December (International)',
    year: 2026,

    brandColor: '#003B5C',
    websiteUrl: 'https://www.gatescambridge.org',

    description:
      'One of the most prestigious international scholarships in the world, funding outstanding students from outside the UK to pursue any postgraduate degree at the University of Cambridge.',

    summary:
      'The Gates Cambridge Scholarship was established in 2000 with a $210 million donation from the Bill & Melinda Gates Foundation — the largest single donation to a UK university from a non-British source. Each year, approximately 80 scholars from outside the United Kingdom are selected to pursue a full-time postgraduate degree at the University of Cambridge, with all costs covered.\n\nThe scholarship is open to applicants in any field and at any postgraduate level — from a one-year MPhil to a three- or four-year PhD. What distinguishes Gates Cambridge from other prestigious scholarships is its emphasis on social responsibility alongside academic excellence. The selection criteria explicitly value a commitment to improving the lives of others, leadership potential, and a desire to use one\'s education for the broader good.\n\nGates Cambridge Scholars join a vibrant community of over 2,000 alumni from more than 100 countries. The Gates Cambridge Trust provides not just financial support but also a rich program of events, workshops, and networking opportunities. Scholars frequently collaborate across disciplines and go on to become leaders in academia, policy, medicine, technology, and social enterprise.',

    sections: [
      {
        title: 'What You Get',
        content:
          'The Gates Cambridge Scholarship covers the full cost of studying at Cambridge, plus living expenses and additional discretionary funding.',
        bulletPoints: [
          'Full university fees and college fees for the duration of your course',
          'An annual maintenance stipend (living allowance) sufficient for a single student',
          'One economy round-trip airfare per year between your home country and the UK',
          'Inbound travel costs for your initial arrival at Cambridge',
          'Discretionary funding for academic development activities such as conferences and fieldwork',
          'Family allowance available for scholars with dependents',
          'Access to the Gates Cambridge Scholars community with regular events, retreats, and workshops',
        ],
      },
      {
        title: 'Selection Process',
        content:
          'The Gates Cambridge selection process is highly competitive, with around 80 scholarships awarded from approximately 6,000 applications each year.',
        bulletPoints: [
          'Applicants are assessed on four criteria: academic excellence, reasons for choosing their course, a commitment to improving the lives of others, and leadership potential',
          'US citizens apply through a separate early round with a deadline in October',
          'International applicants (non-US, non-UK) apply with a December deadline',
          'Shortlisted candidates are invited to Cambridge for interviews in January–March',
          'Interviews are conducted by panels of senior academics and Gates Cambridge alumni',
          'Applicants must also be admitted to a Cambridge postgraduate course through the normal university process',
          'The acceptance rate is approximately 1.3%, making it one of the most selective scholarships globally',
        ],
      },
      {
        title: 'How to Apply',
        content:
          'The Gates Cambridge application is integrated into the University of Cambridge graduate admissions process. You apply for the scholarship and your course simultaneously.',
        bulletPoints: [
          'Apply through the Cambridge Graduate Application Portal and tick the Gates Cambridge funding box',
          'Write a Gates Cambridge-specific personal statement (separate from your course application)',
          'Submit your course application with all required supporting materials (transcripts, references, research proposal)',
          'US applicants: deadline is typically early October; interview invitations sent in January',
          'International applicants: deadline is typically early December; interviews in March',
          'Ensure your referees understand the Gates Cambridge criteria and can speak to your leadership and social commitment',
          'Prepare for a challenging interview that explores your motivations, values, and plans',
        ],
      },
    ],

    eligibility:
      'Open to citizens of any country outside the United Kingdom who are applying to a full-time postgraduate degree at the University of Cambridge. There is no age limit. Applicants must demonstrate outstanding academic achievement and a commitment to improving the lives of others.',
    ageRange: undefined,
    geographicScope: 'global',

    category: 'international-graduate',
    tags: ['Any Field', 'Science & Research', 'Social Impact', 'Leadership', 'Global Affairs'],

    relatedProblemCategories: ['Moonshots', 'Health & wellness', 'Climate tech', 'Education'],
    tagCount: 5,
  },

  // ----------------------------------------------------------------
  // 4. Churchill Scholarship
  // ----------------------------------------------------------------
  {
    slug: 'churchill-scholarship',
    name: 'Churchill Scholarship',
    shortName: 'Churchill',
    organization: 'Winston Churchill Foundation of the United States',

    fundingAmount: 'Full funding at University of Cambridge',
    fundingMin: undefined,
    fundingMax: undefined,

    duration: '1 year (Master\'s)',
    applicationCycle: 'Annual',
    deadline: 'October (through nominating institutions)',
    year: 2026,

    brandColor: '#4A0E4E',
    websiteUrl: 'https://churchillscholarship.org',

    description:
      'A prestigious scholarship sending top American STEM students to Churchill College, Cambridge for a year of graduate study in science, mathematics, and engineering.',

    summary:
      'The Churchill Scholarship is one of the most prestigious STEM-focused scholarships available to American students. Each year, approximately 17 scholars are selected to spend a year at Churchill College, University of Cambridge, pursuing a Master\'s degree (MPhil) in science, mathematics, or engineering. The program was established in 1963 as part of Sir Winston Churchill\'s vision for Churchill College as a center of scientific and technological excellence.\n\nThe Churchill Scholarship is notable for its sharp focus on STEM fields and its deep institutional relationship with Churchill College. Unlike broader scholarships, every Churchill Scholar is a member of the same Cambridge college, creating a tight-knit community of American scientists and engineers. The year at Cambridge provides access to world-class research groups, and many Churchill Scholars go on to pursue PhDs at leading institutions back in the United States.\n\nThe program is especially valued by students who want a focused year of advanced study and research before committing to a longer doctoral program. Churchill Scholars have gone on to become MacArthur Fellows, National Academy members, startup founders, and leaders in fields ranging from quantum computing to molecular biology to climate science.',

    sections: [
      {
        title: 'What You Get',
        content:
          'The Churchill Scholarship provides full financial support for one year of graduate study at Cambridge, plus several additional benefits.',
        bulletPoints: [
          'Full tuition and fees at Churchill College, University of Cambridge',
          'A generous living allowance (stipend) for the academic year',
          'Round-trip airfare between the US and UK',
          'A special research grant of $2,000 for travel to conferences or research expenses',
          'Membership in Churchill College with access to college housing, dining, and facilities',
          'Access to the Churchill Scholar alumni network, including prominent researchers and innovators',
          'Some scholars are also awarded Kander Fellowships providing additional summer research funding',
        ],
      },
      {
        title: 'Selection Process',
        content:
          'Churchill Scholars are nominated by their home institutions and then evaluated by the Winston Churchill Foundation. The process is highly selective.',
        bulletPoints: [
          'Applicants must be nominated by one of approximately 115 participating US institutions',
          'Each institution has its own internal selection process and may nominate a limited number of candidates',
          'Nominations are reviewed by the Churchill Foundation\'s selection committee',
          'Finalists are invited to in-person interviews in New York City (or virtually)',
          'Selection criteria emphasize academic excellence, research potential, and character',
          'Approximately 17 scholarships are awarded each year from roughly 100 nominations',
          'Applicants should have a strong research record and clear plans for their Cambridge year',
        ],
      },
      {
        title: 'How to Apply',
        content:
          'The Churchill Scholarship requires nomination from a participating institution. Start by contacting your campus Churchill advisor well before the deadline.',
        bulletPoints: [
          'Identify and contact your institution\'s Churchill Scholarship advisor early (ideally spring of your junior year)',
          'Prepare a research proposal or statement of purpose for your Cambridge MPhil program',
          'Secure strong letters of recommendation from faculty who know your research work',
          'Complete the internal campus application (deadlines vary but are often in September or October)',
          'If nominated, submit the full application to the Winston Churchill Foundation',
          'Applicants must be US citizens and graduating seniors or recent graduates',
          'A strong quantitative and research background is expected — most successful applicants have significant lab or research experience',
        ],
      },
    ],

    eligibility:
      'U.S. citizens who are seniors in college or have graduated within the past 12 months. Must be applying to a STEM Master\'s program at Churchill College, Cambridge. Must be nominated by a participating institution.',
    ageRange: undefined,
    geographicScope: 'us',

    category: 'international-graduate',
    tags: ['Science & Research', 'Deep Tech', 'Climate & Energy', 'Healthcare & Biotech', 'AI & Machine Learning'],

    relatedProblemCategories: ['Moonshots', 'AI & infrastructure', 'Climate tech', 'Longevity'],
    tagCount: 5,
  },

  // ----------------------------------------------------------------
  // 5. Schwarzman Scholars
  // ----------------------------------------------------------------
  {
    slug: 'schwarzman-scholars',
    name: 'Schwarzman Scholars',
    shortName: 'Schwarzman',
    organization: 'Schwarzman Scholars / Tsinghua University',

    fundingAmount: 'Fully funded (tuition, room, board, travel)',
    fundingMin: undefined,
    fundingMax: undefined,

    duration: '1 year (Master\'s)',
    applicationCycle: 'Annual',
    deadline: 'September',
    year: 2026,

    brandColor: '#800020',
    websiteUrl: 'https://www.schwarzmanscholars.org',

    description:
      'A fully funded one-year Master\'s program at Tsinghua University in Beijing, designed to prepare future leaders to navigate the geopolitical and economic landscape of the 21st century — with China at its center.',

    summary:
      'Schwarzman Scholars is a highly selective, fully funded one-year Master\'s degree program based at Tsinghua University in Beijing, one of China\'s most prestigious universities. Founded by Stephen A. Schwarzman, CEO of Blackstone, the program was modeled on the Rhodes Scholarship with the explicit goal of creating a new generation of leaders who understand China and its role in the global order.\n\nEach year, up to 200 scholars from around the world are selected to live and study together at the purpose-built Schwarzman College on Tsinghua\'s campus. The Master\'s program offers concentrations in Public Policy, Economics & Business, and International Studies, and the curriculum combines academic coursework with a rich schedule of lectures from world leaders, field trips across China, and an intensive Mandarin language program.\n\nWhat makes Schwarzman Scholars unique is its explicit geopolitical framing. The program was created in response to the growing importance of China in global affairs and the recognition that few Western leaders have deep familiarity with Chinese institutions, culture, and governance. Scholars gain firsthand experience living in Beijing, engaging with Chinese students and leaders, and understanding the complexities of US-China relations and global governance from a Chinese perspective.',

    sections: [
      {
        title: 'What You Get',
        content:
          'Schwarzman Scholars provides an immersive, fully funded experience designed to develop globally minded leaders with deep exposure to China.',
        bulletPoints: [
          'Full tuition for the one-year Master\'s program at Tsinghua University',
          'Room and board at the Schwarzman College on the Tsinghua campus',
          'Round-trip airfare and in-country travel for program activities',
          'A personal stipend for living expenses and incidentals',
          'Intensive Mandarin language instruction regardless of prior proficiency',
          'Access to a network of high-profile speakers including heads of state, CEOs, and leading academics',
          'Field trips and study tours across China and the Asia-Pacific region',
          'Lifetime membership in the Schwarzman Scholars alumni network',
        ],
      },
      {
        title: 'Selection Process',
        content:
          'The selection process is rigorous and evaluates leadership potential, intellectual ability, and a genuine interest in understanding global affairs.',
        bulletPoints: [
          'Applications are submitted online through the Schwarzman Scholars portal',
          'The application includes essays, a resume, transcripts, and 3 letters of recommendation',
          'A short video introduction is required as part of the application',
          'Semifinalists are invited to regional interviews held in cities around the world (Beijing, Bangkok, London, New York)',
          'Interviews assess leadership, intellectual curiosity, cultural adaptability, and interpersonal skills',
          'Approximately 150–200 scholars are selected each year from over 3,000 applicants',
          'No prior knowledge of China or Mandarin is required',
        ],
      },
      {
        title: 'How to Apply',
        content:
          'Applications open annually in the spring, with a deadline typically in September. The process is conducted entirely online until the interview stage.',
        bulletPoints: [
          'Visit schwarzmanscholars.org to create an account and begin your application',
          'Applicants must hold or be completing a bachelor\'s degree and be between 18 and 28 years old',
          'Write compelling essays that demonstrate your interest in global affairs and leadership vision',
          'Select your preferred concentration: Public Policy, Economics & Business, or International Studies',
          'Prepare a short video (approximately 1 minute) introducing yourself',
          'Secure three recommendation letters from people who can speak to your leadership and character',
          'If selected for interviews, be prepared for intensive discussions about global issues and your personal goals',
        ],
      },
    ],

    eligibility:
      'Open to citizens of any country who hold or will complete a bachelor\'s degree before enrollment. Applicants must be between 18 and 28 years of age. No prior experience with China or knowledge of Mandarin is required.',
    ageRange: '18–28',
    geographicScope: 'global',

    category: 'international-graduate',
    tags: ['Global Affairs', 'Leadership', 'Policy & Government', 'Entrepreneurship', 'Any Field'],

    relatedProblemCategories: ['Future of work', 'AI & infrastructure', 'Climate tech'],
    tagCount: 5,
  },

  // ----------------------------------------------------------------
  // 6. Paul & Daisy Soros Fellowships for New Americans
  // ----------------------------------------------------------------
  {
    slug: 'paul-daisy-soros-fellowships',
    name: 'Paul & Daisy Soros Fellowships for New Americans',
    shortName: 'Soros Fellowships',
    organization: 'Paul & Daisy Soros Foundation',

    fundingAmount: 'Up to $90,000 over 2 years',
    fundingMin: undefined,
    fundingMax: 90000,

    duration: '2 years',
    applicationCycle: 'Annual',
    deadline: 'October',
    year: 2026,

    brandColor: '#2C5F2D',
    websiteUrl: 'https://www.pdsoros.org',

    description:
      'The premier graduate fellowship for immigrants and children of immigrants in the United States — providing up to $90,000 over two years for any graduate program at any US institution.',

    summary:
      'The Paul & Daisy Soros Fellowships for New Americans is the premier graduate fellowship specifically designed for immigrants and children of immigrants in the United States. Founded in 1997 by Paul Soros (a Hungarian immigrant and engineer-philanthropist) and his wife Daisy, the program provides up to $90,000 over two years to support graduate study at any accredited US institution in any field.\n\nThe fellowship is open to three categories of "New Americans": those who are naturalized citizens, those who are green card holders, or those who are the children of two parents who are both naturalized citizens. This eligibility criterion reflects the founders\' belief that immigrants and their children are a vital source of talent, creativity, and leadership in American society — and that supporting their graduate education is an investment in the country\'s future.\n\nEach year, 30 fellows are selected from over 1,800 applicants. The fellowship community now includes over 800 alumni across every field imaginable — from medicine and law to engineering, the arts, journalism, and public policy. What unites them is the shared experience of navigating multiple cultures and the drive to contribute to American society. The annual fall conference brings current fellows and alumni together for networking, mentorship, and celebration of the immigrant experience in America.',

    sections: [
      {
        title: 'What You Get',
        content:
          'The Soros Fellowship provides substantial financial support for graduate education, along with a powerful community of fellow New Americans.',
        bulletPoints: [
          'Up to $90,000 in funding over two years ($25,000/year maintenance stipend plus 50% of tuition, up to $20,000/year)',
          'Funding can be applied to any accredited graduate program in the United States — law, medicine, PhD, MBA, MFA, MPP, or any other field',
          'Membership in a community of over 800 Soros Fellows and alumni from diverse immigrant backgrounds',
          'An annual fall conference with networking, panels, and workshops',
          'Mentorship connections with senior fellows and alumni in your field',
          'Public recognition as a Soros Fellow, which carries significant prestige in academic and professional circles',
        ],
      },
      {
        title: 'Selection Process',
        content:
          'The selection process is highly competitive, with 30 fellows chosen annually from approximately 1,800 applicants. The program values both academic excellence and the unique perspectives that come from the immigrant experience.',
        bulletPoints: [
          'The application includes two personal essays: one about your identity and experience as a New American, and one about your intellectual or professional ambitions',
          'Applicants provide transcripts, standardized test scores (if applicable), a resume, and letters of recommendation',
          'Approximately 75–80 semifinalists are invited to interviews in New York City',
          'Interviews are conducted by panels of current and former Soros Fellows, board members, and external reviewers',
          'Selection criteria emphasize creativity, originality, initiative, and sustained accomplishment',
          'The program explicitly values the contributions of immigrants and seeks applicants who will enrich American society',
          'Thirty fellows are selected, and the results are announced in late January or early February',
        ],
      },
      {
        title: 'How to Apply',
        content:
          'Applications open annually in the spring, with a deadline in late October. The process is conducted through the PD Soros online portal.',
        bulletPoints: [
          'Visit pdsoros.org to review eligibility requirements and access the application portal',
          'You must be a New American: a naturalized citizen, green card holder, or child of two naturalized citizen parents',
          'You must be 30 years old or younger by the application deadline',
          'You must be in the first or second year of a graduate program, or not yet enrolled (entering the following fall)',
          'Write two compelling essays that reflect your immigrant experience and your intellectual ambitions',
          'Secure letters of recommendation that speak to your potential and character',
          'Ensure you meet the age and citizenship/immigration status requirements — these are strictly enforced',
        ],
      },
    ],

    eligibility:
      'Must be a "New American" — a naturalized U.S. citizen, green card holder, or child of two parents who are both naturalized citizens. Must be 30 or younger. Must be in the first two years of a graduate program or planning to enroll.',
    ageRange: '30 or younger',
    geographicScope: 'us',

    category: 'international-graduate',
    tags: ['Any Field', 'Leadership', 'Science & Research', 'Healthcare & Biotech', 'Social Impact'],

    relatedProblemCategories: ['Moonshots', 'Health & wellness', 'Education', 'AI & infrastructure'],
    tagCount: 5,
  },
]
