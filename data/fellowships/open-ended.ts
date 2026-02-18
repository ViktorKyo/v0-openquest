import type { Fellowship } from './index'

export const openEndedFellowships: Fellowship[] = [
  // ----------------------------------------------------------------
  // 1. Emergent Ventures
  // ----------------------------------------------------------------
  {
    slug: 'emergent-ventures',
    name: 'Emergent Ventures',
    shortName: 'EV',
    organization: 'Mercatus Center at George Mason University',

    fundingAmount: '$1K – $50K',
    fundingMin: 1000,
    fundingMax: 50000,

    duration: 'Varies by project',
    applicationCycle: 'Rolling',
    deadline: undefined,
    year: 2026,

    brandColor: '#2E86AB',
    websiteUrl: 'https://www.mercatus.org/emergent-ventures',

    description:
      'A fellowship fund by Tyler Cowen and the Mercatus Center that supports ambitious projects across every domain — from science and technology to the arts and social innovation.',

    summary:
      'Emergent Ventures is a fellowship fund run by economist Tyler Cowen at the Mercatus Center, George Mason University. Since its launch in 2018, the program has funded hundreds of ambitious individuals and projects worldwide, with grants ranging from a few thousand dollars to $50,000 or more. Unlike most fellowships, Emergent Ventures has no thematic restrictions — the only criterion is that the applicant is working on something genuinely ambitious and high-potential.\n\nWhat makes Emergent Ventures distinctive is its speed and lack of bureaucracy. Applications are short, decisions come quickly (often within weeks), and the fund deliberately avoids the overhead of traditional grant-making. Tyler Cowen personally reviews every application, looking for a combination of talent, drive, and an idea that could shift the trajectory of a field. Past recipients include teenage scientists, first-time founders, investigative journalists, and independent researchers.\n\nThe program has expanded to include sub-tracks such as Emergent Ventures India and prizes for specific breakthroughs, making it one of the most flexible and impactful micro-grant programs in the world.',

    sections: [
      {
        title: 'What You Get',
        content:
          'Emergent Ventures provides direct financial support with minimal strings attached. The size and form of support are tailored to each recipient.',
        bulletPoints: [
          'Grants typically range from $1,000 to $50,000, with exceptional cases receiving more',
          'Funding can support travel, research, prototyping, living expenses, or whatever the project needs',
          'Some recipients receive a fellowship visit to George Mason University to work alongside the Mercatus team',
          'No equity is taken and there are no repayment obligations',
          'Access to a growing alumni network of ambitious builders and thinkers',
        ],
      },
      {
        title: 'Selection Process',
        content:
          'The selection process is intentionally streamlined. Tyler Cowen reviews applications personally, prioritizing ambition and potential impact over credentials.',
        bulletPoints: [
          'Applications are short — a few paragraphs describing you, your project, and how the funds would be used',
          'There is no formal interview process for most grants, though Tyler may reach out with follow-up questions',
          'Decisions are typically made within 2–6 weeks',
          'The program values unconventional backgrounds and contrarian thinking',
          'Previous grants or institutional affiliations are not required',
        ],
      },
      {
        title: 'How to Apply',
        content:
          'Applications are accepted on a rolling basis through the Mercatus Center website. There is no deadline — you can apply at any time with any kind of ambitious project.',
        bulletPoints: [
          'Visit the Emergent Ventures page on the Mercatus Center website',
          'Fill out the short application form describing your project and funding needs',
          'Include links to any prior work, writing, or relevant background',
          'Specify the amount you are requesting and how you plan to use it',
          'You may re-apply if your first application is not funded',
        ],
      },
    ],

    eligibility:
      'Open to anyone in the world, of any age, working on any ambitious project. There are no academic, professional, or geographic restrictions.',
    ageRange: undefined,
    geographicScope: 'global',

    category: 'open-ended',
    tags: ['Entrepreneurship', 'Science & Research', 'Any Field', 'Deep Tech', 'Social Impact'],

    relatedProblemCategories: ['Moonshots', 'AI & infrastructure', 'Climate tech', 'Education'],
    tagCount: 5,
  },

  // ----------------------------------------------------------------
  // 2. O'Shaughnessy Fellowships & Grants
  // ----------------------------------------------------------------
  {
    slug: 'oshaughnessy-fellowships',
    name: "O'Shaughnessy Fellowships & Grants",
    shortName: "O'Shaughnessy",
    organization: "O'Shaughnessy Ventures",

    fundingAmount: 'Up to $100K (Fellowships) / $10K (Grants)',
    fundingMin: 10000,
    fundingMax: 100000,

    duration: '1 year (Fellowships)',
    applicationCycle: 'Annual',
    deadline: 'Varies — typically spring',
    year: 2026,

    brandColor: '#1C1C1C',
    websiteUrl: 'https://www.oshaughnessy.com/fellowships',

    description:
      "O'Shaughnessy Ventures funds young people doing exceptional work at the intersection of science, technology, and art — with no requirement for a traditional academic path.",

    summary:
      "The O'Shaughnessy Fellowships and Grants program, created by Jim O'Shaughnessy through O'Shaughnessy Ventures, supports outstanding young builders, researchers, and creators who are pushing boundaries in science, technology, and the arts. The program offers two tracks: Fellowships of up to $100,000 for ambitious long-term projects, and Grants of $10,000 for earlier-stage work or experiments.\n\nWhat sets this program apart is its explicit embrace of unconventional paths. Many recipients are self-taught, have dropped out of traditional education, or are pursuing projects that don't fit neatly into any existing institutional category. Jim O'Shaughnessy has been a vocal advocate for supporting young people who learn by building rather than by sitting in classrooms, and the fellowship reflects that philosophy.\n\nPast fellows and grantees have gone on to start companies, publish groundbreaking research, create art installations, and build open-source tools used by thousands. The program also connects recipients with O'Shaughnessy's extensive network in finance, technology, and media.",

    sections: [
      {
        title: 'What You Get',
        content:
          "The program provides both financial support and access to O'Shaughnessy Ventures' network and resources.",
        bulletPoints: [
          'Fellowships provide up to $100,000 in unrestricted funding over one year',
          'Grants provide $10,000 for shorter-term or exploratory projects',
          "Access to O'Shaughnessy Ventures' advisor network spanning finance, tech, and media",
          'Mentorship and guidance from Jim O\'Shaughnessy and the OSV team',
          'Community of fellow recipients working across disciplines',
          'Visibility through OSV\'s media channels, including the "Infinite Loops" podcast',
        ],
      },
      {
        title: 'Selection Process',
        content:
          'Applications are reviewed by the OSV team with input from domain experts. The program values demonstrated ability and ambition over credentials.',
        bulletPoints: [
          'Applications open annually, typically in the spring',
          'Applicants submit a project description, background, and evidence of prior work',
          'Semifinalists may be invited for interviews or asked for additional materials',
          'Final decisions are made by the OSV team with input from external reviewers',
          'The program especially values applicants who have built things independently',
        ],
      },
      {
        title: 'How to Apply',
        content:
          "Visit the O'Shaughnessy Ventures website to find the current application cycle. Applications are submitted online and require a description of your project, your background, and links to prior work.",
        bulletPoints: [
          'Check the OSV website for the current application window',
          'Prepare a clear project description with measurable goals',
          'Include links to any work you have already completed or shipped',
          'Letters of recommendation are welcome but not required',
          'Both the Fellowship and Grant tracks use the same application portal',
        ],
      },
    ],

    eligibility:
      'Open to young people (typically under 25) anywhere in the world who are working on ambitious projects in science, technology, or the arts. No academic degree required.',
    ageRange: 'Under 25',
    geographicScope: 'global',

    category: 'open-ended',
    tags: ['Entrepreneurship', 'Science & Research', 'Creative Arts', 'Deep Tech', 'Any Field'],

    relatedProblemCategories: ['Moonshots', 'AI & infrastructure', 'Creator economy'],
    tagCount: 5,
  },

  // ----------------------------------------------------------------
  // 3. 1517 Fund Medici Grants
  // ----------------------------------------------------------------
  {
    slug: '1517-medici-grants',
    name: '1517 Fund Medici Grants',
    shortName: '1517 Medici',
    organization: '1517 Fund',

    fundingAmount: '$1K grants + $50K–$1M investments',
    fundingMin: 1000,
    fundingMax: 1000000,

    duration: 'One-time grant; investments vary',
    applicationCycle: 'Rolling',
    deadline: undefined,
    year: 2026,

    brandColor: '#7B2D8E',
    websiteUrl: 'https://www.1517fund.com',

    description:
      '1517 Fund backs young builders and dropouts working on hard problems. Their Medici Grants provide small, fast grants while their fund invests in the most promising projects at larger scale.',

    summary:
      '1517 Fund is a venture fund founded by Danielle Strachman and Michael Gibson, both former leaders of the Thiel Fellowship. Named after the year Martin Luther posted his 95 Theses — challenging the established institution of the church — 1517 challenges the established institution of higher education by betting on young people who learn by doing rather than by attending college.\n\nThe Medici Grants are 1517\'s mechanism for providing fast, small-scale support to young builders. Grants of around $1,000 help recipients cover immediate costs — materials, travel, server fees, prototyping — so they can keep building. For projects that demonstrate exceptional promise, 1517 Fund can follow up with venture investments ranging from $50,000 to $1 million or more.\n\nThe fund has backed hundreds of young founders, many of whom were teenagers when they received their first grant. Portfolio companies span robotics, biotech, AI, developer tools, and consumer products. 1517 is especially known for finding talent that traditional institutions overlook — homeschoolers, community college students, self-taught programmers, and teenagers building in garages.',

    sections: [
      {
        title: 'What You Get',
        content:
          '1517 offers a two-tier system: quick Medici Grants for early validation, and larger venture investments for projects that demonstrate product-market fit or technical breakthrough.',
        bulletPoints: [
          'Medici Grants of approximately $1,000, disbursed quickly with minimal paperwork',
          'Follow-on venture investments of $50K–$1M for the most promising projects',
          'No requirement to drop out of school, though the fund is known for supporting those who do',
          'Access to 1517\'s community of young founders and their extensive mentor network',
          'Invitations to 1517 retreats and events connecting builders across the portfolio',
          'Ongoing support and advice from the 1517 team as your project evolves',
        ],
      },
      {
        title: 'Selection Process',
        content:
          'The Medici Grant process is designed to be as lightweight as possible. The team wants to remove friction so young builders can focus on building.',
        bulletPoints: [
          'Applications are short and can be submitted at any time (rolling basis)',
          'The team looks for evidence of building — shipped projects, prototypes, GitHub repos, research output',
          'Age and educational status matter less than what you have already created',
          'Decisions on Medici Grants are typically made within days to weeks',
          'For venture investments, the process involves more due diligence and may include multiple conversations',
        ],
      },
      {
        title: 'How to Apply',
        content:
          'Reach out through the 1517 Fund website or connect with the team through their community channels. The fund is highly accessible and encourages direct outreach.',
        bulletPoints: [
          'Visit 1517fund.com and use the application or contact form',
          'Follow 1517 on Twitter/X — the team often discovers applicants through social media',
          'Attend 1517 events or community meetups if available in your area',
          'Share what you are building — demos, repos, and prototypes speak louder than essays',
          'Referrals from existing 1517 community members are helpful but not required',
        ],
      },
    ],

    eligibility:
      'Primarily targets young builders, typically under 23, anywhere in the world. No degree or enrollment required — in fact, the fund is known for supporting those outside traditional education.',
    ageRange: 'Under 23',
    geographicScope: 'global',

    category: 'open-ended',
    tags: ['Entrepreneurship', 'Deep Tech', 'AI & Machine Learning', 'Open Source', 'Any Field'],

    relatedProblemCategories: ['Moonshots', 'AI & infrastructure', 'Niche markets', 'Future of work'],
    tagCount: 5,
  },

  // ----------------------------------------------------------------
  // 4. Rise (Schmidt Futures + Rhodes Trust)
  // ----------------------------------------------------------------
  {
    slug: 'rise-schmidt-futures',
    name: 'Rise',
    shortName: 'Rise',
    organization: 'Schmidt Futures & Rhodes Trust',

    fundingAmount: 'Lifetime support (funding, mentorship, networking)',
    fundingMin: undefined,
    fundingMax: undefined,

    duration: 'Lifetime',
    applicationCycle: 'Annual',
    deadline: 'Typically January–February',
    year: 2026,

    brandColor: '#FF6B35',
    websiteUrl: 'https://www.risefortheworld.org',

    description:
      'Rise identifies brilliant young people aged 15–17 and provides them with lifetime support — funding, mentorship, technology, and a global community — to help them serve others for the rest of their lives.',

    summary:
      'Rise is a program created by Eric and Wendy Schmidt through Schmidt Futures, in partnership with the Rhodes Trust. It is one of the most ambitious youth programs in the world, designed to find and support exceptional young people between the ages of 15 and 17 who show the potential to serve others throughout their careers.\n\nUnlike traditional fellowships with a fixed term, Rise offers lifetime benefits. Winners receive immediate support — including technology, funding for educational opportunities, and access to a curated network of mentors — as well as ongoing resources as they progress through their education and careers. The program explicitly aims to build a global community of future leaders who will tackle the world\'s most pressing challenges.\n\nRise is open to young people in every country and does not require any particular academic achievement or test score. The selection process is holistic, looking for evidence of intellectual curiosity, a commitment to serving others, and the resilience to pursue difficult goals. Each year, approximately 100 Global Winners are selected from tens of thousands of applicants worldwide.',

    sections: [
      {
        title: 'What You Get',
        content:
          'Rise provides a comprehensive and evolving package of support that grows with you over your lifetime.',
        bulletPoints: [
          'Immediate access to technology (laptop and connectivity support)',
          'Funding for educational opportunities, gap year programs, or projects',
          'A residential summit bringing all Global Winners together for intensive programming',
          'Ongoing mentorship from leaders across sectors including tech, policy, and academia',
          'Career support and connections as you enter university and the workforce',
          'Lifetime membership in the Rise community, with access to resources and funding throughout your career',
        ],
      },
      {
        title: 'Selection Process',
        content:
          'Rise uses a multi-stage selection process designed to identify potential rather than polish. The program is deliberately looking for young people who may not have had access to elite institutions but who demonstrate extraordinary drive and empathy.',
        bulletPoints: [
          'Online application including short essays, a video, and information about your activities and interests',
          'Finalists are invited to complete additional challenges and assessments',
          'Approximately 500 finalists are selected as Rise Finalists and receive some benefits',
          'From the finalists, roughly 100 are chosen as Global Winners with the full package of lifetime support',
          'Selection criteria emphasize brilliance, integrity, commitment to others, and perseverance',
          'No standardized test scores, GPAs, or school rankings are required',
        ],
      },
      {
        title: 'How to Apply',
        content:
          'Applications open annually, typically in the fall, with a deadline in January or February. The entire process is free and conducted online.',
        bulletPoints: [
          'Visit risefortheworld.org to access the application when it opens',
          'Applicants must be between 15 and 17 years old at the time of application',
          'The application includes short-answer questions, a video component, and activity descriptions',
          'No application fee — Rise is completely free to apply to',
          'Results are announced in the summer following the application deadline',
          'Applicants who are not selected may reapply in subsequent years if still age-eligible',
        ],
      },
    ],

    eligibility:
      'Open to young people aged 15–17 anywhere in the world. No academic requirements or test scores needed. Must demonstrate intellectual curiosity and commitment to serving others.',
    ageRange: '15–17',
    geographicScope: 'global',

    category: 'open-ended',
    tags: ['Leadership', 'Social Impact', 'Any Field', 'Education', 'Global Affairs'],

    relatedProblemCategories: ['Moonshots', 'Education', 'Climate tech', 'Health & wellness'],
    tagCount: 5,
  },

  // ----------------------------------------------------------------
  // 5. Atlas Fellowship
  // ----------------------------------------------------------------
  {
    slug: 'atlas-fellowship',
    name: 'Atlas Fellowship',
    shortName: 'Atlas',
    organization: 'Atlas Fellowship',

    fundingAmount: '$10,000 scholarship + program',
    fundingMin: 10000,
    fundingMax: 10000,

    duration: '2-week program + ongoing community',
    applicationCycle: 'Annual',
    deadline: 'Typically early spring',
    year: 2026,

    brandColor: '#2563EB',
    websiteUrl: 'https://www.atlasfellowship.org',

    description:
      'The Atlas Fellowship gives $10,000 scholarships and an intensive two-week program to exceptional high school students who want to think rigorously about the world\'s most important problems.',

    summary:
      'The Atlas Fellowship is a program for high school students (and occasionally early college students) who are deeply curious about the world and want to develop the skills to think clearly about the most important problems facing humanity. Each fellow receives a $10,000 scholarship and participates in an intensive two-week summer program focused on rigorous reasoning, calibrated forecasting, and effective problem-solving.\n\nThe fellowship grew out of the effective altruism and rationality communities, and the curriculum reflects those intellectual traditions. Sessions cover topics like Bayesian reasoning, expected value calculations, cognitive biases, AI safety, biosecurity, global health, and moral philosophy. The goal is not to indoctrinate fellows into any particular worldview, but to give them the conceptual tools to reason well about complex, high-stakes questions.\n\nBeyond the summer program, Atlas fellows join a global community of intellectually ambitious young people. Many go on to attend top universities, start organizations, conduct research in AI safety or global health, or pursue other high-impact careers. The $10,000 scholarship is unrestricted and can be used for education, projects, or any other purpose.',

    sections: [
      {
        title: 'What You Get',
        content:
          'The Atlas Fellowship combines direct financial support with an intensive educational program and a lasting intellectual community.',
        bulletPoints: [
          '$10,000 unrestricted scholarship paid directly to the fellow',
          'An all-expenses-paid two-week summer program at a top university campus',
          'Curriculum covering rigorous reasoning, forecasting, AI safety, global priorities, and moral philosophy',
          'Mentorship from researchers and practitioners working on global catastrophic risks',
          'A global community of Atlas fellows connected through events, retreats, and online forums',
          'Opportunities for follow-on funding and support for projects that emerge from the fellowship',
        ],
      },
      {
        title: 'Selection Process',
        content:
          'Atlas selects for intellectual curiosity and reasoning ability, not academic credentials or extracurricular achievements.',
        bulletPoints: [
          'The application includes short essays and aptitude questions designed to test reasoning',
          'Semifinalists complete additional assessments, which may include logic puzzles and calibration exercises',
          'Finalists are invited to a virtual or in-person interview with the Atlas team',
          'Selection emphasizes clarity of thought, intellectual honesty, and genuine curiosity',
          'Typically 100–150 fellows are selected each year from thousands of applicants',
          'No minimum GPA, test scores, or school prestige required',
        ],
      },
      {
        title: 'How to Apply',
        content:
          'Applications open annually, usually in early spring. The process is entirely free and takes about 1–2 hours to complete.',
        bulletPoints: [
          'Visit atlasfellowship.org when applications open (usually January–March)',
          'Complete the online application, which includes essay questions and reasoning exercises',
          'Applicants are typically high school students aged 15–19',
          'No recommendation letters or transcripts are required in the initial application',
          'Results are announced on a rolling basis, with the summer program typically in June or July',
          'International students are welcome and travel costs are covered',
        ],
      },
    ],

    eligibility:
      'Open to high school students and early college students worldwide, typically aged 15–19. No academic prerequisites. Must demonstrate strong reasoning ability and curiosity about global priorities.',
    ageRange: '15–19',
    geographicScope: 'global',

    category: 'open-ended',
    tags: ['AI & Machine Learning', 'Science & Research', 'Education', 'Leadership', 'Any Field'],

    relatedProblemCategories: ['Moonshots', 'AI & infrastructure', 'Health & wellness', 'Education'],
    tagCount: 5,
  },

  // ----------------------------------------------------------------
  // 6. Interact Fellowship
  // ----------------------------------------------------------------
  {
    slug: 'interact-fellowship',
    name: 'Interact Fellowship',
    shortName: 'Interact',
    organization: 'Interact',

    fundingAmount: 'Retreats + project grants',
    fundingMin: undefined,
    fundingMax: undefined,

    duration: '1 year + ongoing community',
    applicationCycle: 'Annual',
    deadline: 'Varies by cohort',
    year: 2026,

    brandColor: '#10B981',
    websiteUrl: 'https://joininteract.com',

    description:
      'Interact brings together young technologists aged 18–23 who care about the societal implications of technology, through retreats, grants, and a tight-knit intellectual community.',

    summary:
      'Interact is a fellowship for young people aged 18–23 who are deeply thoughtful about the intersection of technology and society. Founded in 2016, it has become one of the most respected communities for early-career technologists who want to build responsibly and think critically about the systems they are creating.\n\nThe fellowship centers around multi-day retreats where fellows engage in intense discussions, workshops, and collaborative projects exploring questions like: How should AI systems be governed? What does equitable technology access look like? How do we build institutions that keep pace with technological change? The retreats are deliberately small (typically 25–40 fellows per cohort) to foster deep relationships and honest dialogue.\n\nBeyond the retreats, Interact provides project grants to fellows working on initiatives at the intersection of technology and public interest. The alumni network — now numbering in the hundreds — includes founders, policymakers, researchers, and engineers at organizations ranging from startups to major tech companies to government agencies. Interact fellows are united by a shared belief that building technology well requires understanding its broader social context.',

    sections: [
      {
        title: 'What You Get',
        content:
          'Interact provides a combination of intellectual community, retreats, funding, and a lifelong network of peers who care about technology and society.',
        bulletPoints: [
          'Participation in immersive multi-day retreats with curated discussions and workshops',
          'Project grants to support initiatives at the intersection of technology and public interest',
          'A cohort of 25–40 peers selected for intellectual depth, technical ability, and social awareness',
          'Access to the broader Interact alumni network spanning tech, policy, academia, and civic organizations',
          'Ongoing events, reading groups, and collaborative projects throughout the year',
          'Mentorship connections with senior leaders in technology and policy',
        ],
      },
      {
        title: 'Selection Process',
        content:
          'Interact looks for young people who combine technical fluency with genuine concern for the societal impact of technology. The process is competitive but values intellectual curiosity over credentials.',
        bulletPoints: [
          'Applications include essays about your relationship with technology and its role in society',
          'Applicants are asked to describe projects they have built or contributed to',
          'Semifinalists participate in group discussions or interviews with current fellows and organizers',
          'Selection criteria emphasize intellectual curiosity, empathy, technical ability, and collaborative spirit',
          'Cohorts are intentionally diverse across geography, discipline, and background',
          'Typically 25–40 fellows are selected per cohort from several hundred applicants',
        ],
      },
      {
        title: 'How to Apply',
        content:
          'Applications open annually, with timing varying by cohort. The process is conducted entirely online until the retreat stage.',
        bulletPoints: [
          'Visit joininteract.com to check the current application status',
          'Prepare thoughtful essays about your work and your perspective on technology and society',
          'Include links to projects, writing, or other evidence of your engagement with these topics',
          'Applicants must be between 18 and 23 years old',
          'There is no application fee',
          'International applicants are welcome and travel support is available for retreats',
        ],
      },
    ],

    eligibility:
      'Open to young people aged 18–23 worldwide who are working at or thinking deeply about the intersection of technology and society. Must have some technical background or demonstrated engagement with technology.',
    ageRange: '18–23',
    geographicScope: 'global',

    category: 'open-ended',
    tags: ['AI & Machine Learning', 'Policy & Government', 'Leadership', 'Open Source', 'Education'],

    relatedProblemCategories: ['AI & infrastructure', 'Future of work', 'Education', 'Moonshots'],
    tagCount: 5,
  },
]
