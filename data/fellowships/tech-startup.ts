import type { Fellowship } from './index'

export const techStartupFellowships: Fellowship[] = [
  // ----------------------------------------------------------------
  // 1. Thiel Fellowship
  // ----------------------------------------------------------------
  {
    slug: 'thiel-fellowship',
    name: 'Thiel Fellowship',
    shortName: 'Thiel',
    organization: 'Thiel Foundation',
    fundingAmount: '$200,000 over 2 years',
    fundingMin: 200000,
    fundingMax: 200000,
    duration: '2 years',
    applicationCycle: 'Annual (applications open in fall)',
    deadline: 'December 31, 2025',
    year: 2026,
    brandColor: '#00A651',
    websiteUrl: 'https://thielfellowship.org',
    description:
      'The Thiel Fellowship gives $200,000 to young people under 22 who want to build new things instead of sitting in a classroom. Founded by Peter Thiel, the program encourages ambitious individuals to pursue bold ideas outside of traditional education.',
    summary:
      'The Thiel Fellowship is one of the most unconventional and high-profile fellowships in the world. Founded in 2011 by PayPal co-founder and venture capitalist Peter Thiel, the program offers $200,000 over two years to individuals under 22 who want to drop out of (or skip) college to pursue ambitious projects in technology, science, and social innovation.\n\nWhat sets the Thiel Fellowship apart is its contrarian thesis: that for the most talented young people, the opportunity cost of attending college is too high. Fellows join a tight-knit community of builders and gain access to mentors from the Thiel network, including founders, investors, and scientists. The fellowship has no curriculum, no required milestones, and no equity stake — it is a pure bet on the individual.\n\nNotable alumni include Vitalik Buterin (Ethereum), Austin Russell (Luminar Technologies, youngest self-made billionaire), Laura Deming (Longevity Fund), and Dylan Field (Figma). The fellowship has produced multiple unicorn founders and some of the most influential technologists of the past decade.',
    sections: [
      {
        title: 'What You Get',
        content:
          'The fellowship provides substantial financial support along with an unparalleled network of mentors and peers.',
        bulletPoints: [
          '$200,000 in unrestricted funding paid over two years ($100K/year)',
          'Access to a network of 200+ Thiel Fellowship alumni',
          'Mentorship from founders, investors, and scientists in the Thiel network',
          'Introductions to potential co-founders, early employees, and investors',
          'Invitations to exclusive retreats and community events',
          'No equity taken — the funding is a grant, not an investment',
        ],
      },
      {
        title: 'Selection Process',
        content:
          'The Thiel Fellowship is extremely competitive, typically receiving over 3,000 applications for 20-25 spots each year.',
        bulletPoints: [
          'Online application with essays on your project, vision, and why now',
          'Semifinalist interviews with Thiel Foundation team',
          'Finalist weekend in San Francisco with presentations and group activities',
          'Final selection by a committee that includes Peter Thiel',
          'Acceptance rate is under 1%, making it one of the most selective programs',
          'Strong bias toward applicants who have already started building something',
        ],
      },
      {
        title: 'Notable Alumni',
        content:
          'The Thiel Fellowship has an extraordinary track record of producing world-changing founders and technologists.',
        bulletPoints: [
          'Vitalik Buterin — co-founder of Ethereum',
          'Austin Russell — founder & CEO of Luminar Technologies (youngest self-made billionaire at IPO)',
          'Dylan Field — co-founder & CEO of Figma (acquired by Adobe for $20B, deal later unwound)',
          'Laura Deming — founder of The Longevity Fund',
          'Ritesh Agarwal — founder & CEO of OYO Rooms',
          'Paul Gu — co-founder of Upstart (IPO in 2020)',
        ],
      },
    ],
    eligibility: 'Must be 22 years old or younger at the time of application. Open to individuals worldwide. No citizenship or residency requirements. Applicants must be willing to pursue their project full-time.',
    ageRange: 'Under 22',
    geographicScope: 'global',
    category: 'tech-startup',
    tags: ['Entrepreneurship', 'Deep Tech', 'AI & Machine Learning', 'Science & Research', 'Any Field'],
    relatedProblemCategories: ['Moonshots', 'AI & infrastructure', 'Climate tech', 'Longevity'],
    tagCount: 5,
  },

  // ----------------------------------------------------------------
  // 2. Y Combinator
  // ----------------------------------------------------------------
  {
    slug: 'y-combinator',
    name: 'Y Combinator',
    shortName: 'YC',
    organization: 'Y Combinator',
    fundingAmount: '$500,000 investment',
    fundingMin: 500000,
    fundingMax: 500000,
    duration: '3 months (batch) + ongoing support',
    applicationCycle: 'Biannual (Winter and Summer batches)',
    deadline: 'October 2025 (Winter), April 2026 (Summer)',
    year: 2026,
    brandColor: '#FF6600',
    websiteUrl: 'https://www.ycombinator.com',
    description:
      'Y Combinator is the world\'s most prestigious startup accelerator, investing $500,000 in early-stage companies through its iconic 3-month batch program. YC has funded over 5,000 startups including Airbnb, Stripe, Dropbox, and Reddit.',
    summary:
      'Y Combinator is widely regarded as the most influential startup accelerator in the world. Founded in 2005 by Paul Graham, Jessica Livingston, Robert Morris, and Trevor Blackwell, YC has funded over 5,000 companies with a combined valuation exceeding $600 billion. The program runs twice a year in San Francisco, with each batch accepting roughly 200-250 companies.\n\nYC invests $500,000 in each startup: $125,000 for 7% equity through the standard deal, plus $375,000 on an uncapped SAFE. In return, founders get three months of intensive mentorship, weekly dinners with successful founders and investors, and access to the most powerful alumni network in startups. The batch culminates in Demo Day, where companies pitch to a curated audience of top investors.\n\nThe YC alumni network is unmatched. Companies like Airbnb, Stripe, Coinbase, DoorDash, Instacart, Reddit, Dropbox, Twitch, and Cruise all went through YC. The "YC mafia" effect means that being a YC company opens doors with customers, partners, recruits, and investors for years after the program.',
    sections: [
      {
        title: 'What You Get',
        content:
          'YC provides funding, mentorship, and the most powerful startup network in the world.',
        bulletPoints: [
          '$500,000 total investment ($125K for 7% + $375K uncapped SAFE)',
          '3-month intensive batch program in San Francisco',
          'Weekly office hours with YC partners (experienced founders and investors)',
          'Weekly dinners with successful founders and domain experts',
          'Demo Day presentation to 1,000+ top investors',
          'Lifetime access to the YC alumni network (5,000+ companies)',
          'Bookface internal platform for founder-to-founder help',
          'Group partner assigned to work closely with your company',
        ],
      },
      {
        title: 'What They Look For',
        content:
          'YC evaluates founders first and ideas second. They are looking for determined people who can build quickly and adapt.',
        bulletPoints: [
          'Strong technical founding teams (at least one technical co-founder preferred)',
          'Clear understanding of the problem you are solving and for whom',
          'Evidence of velocity — what have you built or shipped recently?',
          'Large market opportunity with a credible path to growth',
          'Founder-market fit: why are you the right team for this problem?',
          'Solo founders are accepted but co-founding teams are preferred',
          'All stages welcome, from idea-stage to post-revenue',
        ],
      },
      {
        title: 'How to Apply',
        content:
          'The YC application is famously short and focused on substance over polish.',
        bulletPoints: [
          'Apply online at ycombinator.com/apply — the form takes 30-60 minutes',
          'Short-answer questions about your team, product, market, and traction',
          'Optional 1-minute demo video showing your product in action',
          'Finalists invited for a 10-minute interview (in person or over video)',
          'Interviews are rapid-fire Q&A — be concise and honest',
          'Decisions are communicated within days of the interview',
          'You can (and many do) apply multiple times before being accepted',
        ],
      },
    ],
    eligibility: 'Open to founders of any age, nationality, and background. At least one founder must be able to relocate to the San Francisco Bay Area for the 3-month batch. Companies at any stage from idea to post-revenue are eligible.',
    geographicScope: 'global',
    category: 'tech-startup',
    tags: ['Entrepreneurship', 'AI & Machine Learning', 'Deep Tech', 'Healthcare & Biotech', 'Climate & Energy'],
    relatedProblemCategories: ['Moonshots', 'AI & infrastructure', 'Climate tech', 'Health & wellness', 'Niche markets', 'Creator economy', 'Future of work'],
    tagCount: 5,
  },

  // ----------------------------------------------------------------
  // 3. YC Summer Fellows
  // ----------------------------------------------------------------
  {
    slug: 'yc-summer-fellows',
    name: 'YC Summer Fellows',
    shortName: 'YC Fellows',
    organization: 'Y Combinator',
    fundingAmount: '$20,000 + $90,000 compute credits',
    fundingMin: 20000,
    fundingMax: 110000,
    duration: '8 weeks (summer)',
    applicationCycle: 'Annual (spring applications)',
    deadline: 'April 2026',
    year: 2026,
    brandColor: '#FF8533',
    websiteUrl: 'https://www.ycombinator.com/summer-fellows',
    description:
      'YC Summer Fellows is a program for current students to spend their summer building an AI startup. Fellows receive $20,000 in funding, $90,000 in compute credits, and mentorship from YC partners without giving up any equity.',
    summary:
      'YC Summer Fellows is Y Combinator\'s program specifically designed for university students who want to spend their summer building an AI-focused startup. Launched as a way to identify and support the next generation of founders before they graduate, the program provides $20,000 in cash and $90,000 in compute credits — all with zero equity taken.\n\nThe program runs for 8 weeks during the summer and gives fellows access to YC\'s partner network, office hours, and community resources. Unlike the main YC batch, Summer Fellows is explicitly designed for students who are still in school and may not be ready to commit full-time to a startup. The goal is to give talented builders the resources and mentorship to explore ambitious AI projects.\n\nFellows who demonstrate exceptional progress during the summer may be fast-tracked into a future YC batch. The program is particularly focused on AI applications and infrastructure, reflecting YC\'s current investment thesis that AI represents the largest technological shift since the internet.',
    sections: [
      {
        title: 'What You Get',
        content:
          'A substantial package designed to let students focus entirely on building during the summer.',
        bulletPoints: [
          '$20,000 in unrestricted cash funding',
          '$90,000 in compute credits for AI/ML workloads',
          'Zero equity taken — this is a grant, not an investment',
          'Weekly office hours with YC partners',
          'Access to YC founder community and events',
          'Potential fast-track into a future YC batch',
          'Co-working space access in San Francisco',
        ],
      },
      {
        title: 'Selection Process',
        content:
          'The program targets current students with strong technical skills and ambitious AI project ideas.',
        bulletPoints: [
          'Must be a current university student (undergraduate or graduate)',
          'Strong preference for students with demonstrated technical ability (open source contributions, research, side projects)',
          'Application focuses on what you want to build and why AI is central to it',
          'Short interview with YC partners if selected as a finalist',
          'Teams of 1-3 students are eligible',
          'US-based students preferred but international students studying in the US are eligible',
        ],
      },
    ],
    eligibility: 'Must be a current student at an accredited university. Teams of 1-3 are accepted. At least one team member should have strong technical/engineering skills. US-based students or international students studying at a US university are eligible.',
    ageRange: '18-28 (typical student age)',
    geographicScope: 'us',
    category: 'tech-startup',
    tags: ['AI & Machine Learning', 'Entrepreneurship', 'Deep Tech', 'Education'],
    relatedProblemCategories: ['AI & infrastructure', 'Moonshots', 'Future of work'],
    tagCount: 4,
  },

  // ----------------------------------------------------------------
  // 4. Entrepreneur First
  // ----------------------------------------------------------------
  {
    slug: 'entrepreneur-first',
    name: 'Entrepreneur First',
    shortName: 'EF',
    organization: 'Entrepreneur First',
    fundingAmount: 'Stipend + up to $250,000 investment',
    fundingMin: 0,
    fundingMax: 250000,
    duration: '6 months (Form + Launch)',
    applicationCycle: 'Rolling (multiple cohorts per year)',
    year: 2026,
    brandColor: '#1A1A2E',
    websiteUrl: 'https://www.joinef.com',
    description:
      'Entrepreneur First is the world\'s leading talent investor, helping exceptional individuals find co-founders and build startups from scratch. EF provides a stipend during co-founder matching and up to $250,000 in investment at company formation.',
    summary:
      'Entrepreneur First takes a fundamentally different approach to startup building. Rather than investing in existing companies, EF invests in individuals before they even have a co-founder or an idea. The program brings together exceptional technical and commercial talent, helps them find co-founders through a structured matching process, and then supports the newly formed teams as they identify problems and build solutions.\n\nThe program runs in two phases. During the "Form" phase (roughly 8 weeks), individuals join a cohort and explore potential co-founder partnerships while developing startup ideas. Teams that form and show promise move into the "Launch" phase, where EF invests up to $250,000 and provides intensive support to build an MVP and find product-market fit. Not everyone who enters the Form phase will form a company — and that is by design.\n\nFounded in London in 2011, EF now operates cohorts in London, Bangalore, Singapore, Paris, Berlin, and Toronto. The program has helped create over 700 companies with a combined valuation exceeding $10 billion, including Tractable (AI for accident repair, valued at $1B+), Magic Pony (acquired by Twitter), and Cleo (AI financial assistant).',
    sections: [
      {
        title: 'What You Get',
        content:
          'EF provides the full stack of support needed to go from individual talent to funded startup.',
        bulletPoints: [
          'Monthly stipend during the Form phase to cover living expenses',
          'Up to $250,000 investment when your company is formed',
          'Structured co-founder matching process with other exceptional individuals',
          'Dedicated cohort facilitators and startup advisors',
          'Office space in the cohort city for the duration of the program',
          'Access to EF\'s global network of 700+ alumni companies',
          'Follow-on funding support and investor introductions at Demo Day',
        ],
      },
      {
        title: 'What They Look For',
        content:
          'EF selects for individual talent and ambition, not existing companies or ideas. They look for people with an "edge" — a unique advantage in some domain.',
        bulletPoints: [
          'Deep technical expertise (PhD, strong engineering background, or domain mastery)',
          'Commercial talent with relevant industry experience and strong networks',
          'Ambition to build a large, venture-scale company',
          'Openness to finding a co-founder and pivoting on ideas',
          'Track record of exceptional achievement (academic, professional, or entrepreneurial)',
          'No existing company required — individuals apply, not teams',
          'Typical cohort members include AI researchers, fintech operators, biotech scientists, and senior engineers',
        ],
      },
      {
        title: 'Global Cohorts',
        content:
          'EF runs cohorts across multiple cities worldwide, each with its own local ecosystem and community.',
        bulletPoints: [
          'London — EF\'s founding city, strong in fintech, deep tech, and AI',
          'Bangalore — India\'s startup capital, focus on B2B SaaS and AI',
          'Singapore — hub for Southeast Asian markets',
          'Paris — growing European tech scene with strong AI research talent',
          'Berlin — Germany\'s startup hub, strong engineering talent pool',
          'Toronto — North American base, strong AI/ML research community',
        ],
      },
    ],
    eligibility: 'Open to individuals (not teams) worldwide. Typical candidates have 2-10 years of experience in technical or commercial roles. No prior startup experience required. Must be willing to relocate to the cohort city for the program duration.',
    geographicScope: 'global',
    category: 'tech-startup',
    tags: ['Entrepreneurship', 'AI & Machine Learning', 'Deep Tech', 'Healthcare & Biotech'],
    relatedProblemCategories: ['AI & infrastructure', 'Moonshots', 'Climate tech', 'Health & wellness', 'Future of work'],
    tagCount: 4,
  },

  // ----------------------------------------------------------------
  // 5. On Deck Founder Fellowship
  // ----------------------------------------------------------------
  {
    slug: 'on-deck-founder-fellowship',
    name: 'On Deck Founder Fellowship',
    shortName: 'On Deck',
    organization: 'On Deck',
    fundingAmount: 'Community & network (no direct funding)',
    fundingMin: 0,
    fundingMax: 0,
    duration: '10 weeks + ongoing community',
    applicationCycle: 'Rolling (multiple cohorts per year)',
    year: 2026,
    brandColor: '#6366F1',
    websiteUrl: 'https://www.beondeck.com',
    description:
      'The On Deck Founder Fellowship is a community-driven program that connects ambitious founders with peers, mentors, and investors. While it does not provide direct funding, it offers one of the strongest founder networks in tech.',
    summary:
      'The On Deck Founder Fellowship (ODF) is designed for people who are actively building or about to start a company. Unlike traditional accelerators, On Deck focuses primarily on community and network effects rather than capital. The program brings together cohorts of ambitious founders and provides structured programming, peer accountability, and access to a curated network of operators, investors, and domain experts.\n\nWhat makes On Deck unique is the density and quality of its community. Each cohort includes founders across a wide range of stages and sectors, creating organic opportunities for collaboration, customer discovery, co-founder matching, and fundraising introductions. The program runs for 10 weeks with weekly sessions, small-group discussions, and 1:1 matching, but the community access is ongoing.\n\nOn Deck has expanded beyond founders to include fellowships for writers, podcast hosts, angels, and other creator archetypes, but the Founder Fellowship remains the flagship program. Notable alumni have gone on to raise from top-tier VCs and build companies across AI, fintech, climate, and healthcare.',
    sections: [
      {
        title: 'What You Get',
        content:
          'On Deck provides community infrastructure and network access that would take years to build independently.',
        bulletPoints: [
          'Curated cohort of 150-200 ambitious founders across stages and sectors',
          'Structured weekly programming with expert sessions and workshops',
          'Small-group peer pods for accountability and support',
          'Algorithmic 1:1 matching with relevant founders and mentors',
          'Access to the broader On Deck community (5,000+ members across all programs)',
          'Investor office hours and warm introductions to top VCs',
          'Lifetime access to the On Deck Slack, events, and community platform',
          'Optional co-working and in-person events in San Francisco and New York',
        ],
      },
      {
        title: 'Who Should Apply',
        content:
          'On Deck is best suited for founders who are early in their journey and want to accelerate through community rather than capital.',
        bulletPoints: [
          'Pre-launch founders exploring ideas and looking for co-founders',
          'Early-stage founders who have started building and want peer support',
          'Experienced operators considering the leap to founding a company',
          'Founders who value network effects and community-driven growth',
          'International founders who want to plug into the US tech ecosystem',
          'The program charges a fellowship fee (with scholarships available)',
        ],
      },
    ],
    eligibility: 'Open to aspiring and active founders worldwide. No age restrictions. Fellowship fee applies with need-based scholarships available. Applicants are evaluated on ambition, track record, and what they can contribute to the community.',
    geographicScope: 'global',
    category: 'tech-startup',
    tags: ['Entrepreneurship', 'Leadership', 'AI & Machine Learning', 'Any Field'],
    relatedProblemCategories: ['AI & infrastructure', 'Creator economy', 'Future of work', 'Niche markets'],
    tagCount: 4,
  },

  // ----------------------------------------------------------------
  // 6. Z Fellows
  // ----------------------------------------------------------------
  {
    slug: 'z-fellows',
    name: 'Z Fellows',
    shortName: 'Z Fellows',
    organization: 'Z Fellows',
    fundingAmount: '$10,000 at $1B valuation cap',
    fundingMin: 10000,
    fundingMax: 10000,
    duration: '2 weeks (intensive) + ongoing support',
    applicationCycle: 'Multiple cohorts per year',
    year: 2026,
    brandColor: '#000000',
    websiteUrl: 'https://www.zfellows.com',
    description:
      'Z Fellows invests $10,000 at a $1 billion valuation cap in exceptional young builders. The program runs an intensive 2-week sprint in San Francisco, connecting fellows with top founders, investors, and each other.',
    summary:
      'Z Fellows is one of the most founder-friendly programs in the startup ecosystem. The program invests $10,000 in each fellow on a SAFE note with a $1 billion valuation cap — a deal so favorable that it effectively functions as a grant. This structure means founders give up virtually no equity while gaining access to an incredible network of mentors and peers.\n\nThe program runs intensive 2-week cohorts in San Francisco, bringing together a small group of 15-20 exceptional young builders. During the sprint, fellows meet with successful founders, investors, and operators for daily fireside chats, workshops, and 1:1 mentorship sessions. Past speakers and mentors have included founders from companies like Notion, Scale AI, and Figma.\n\nZ Fellows is explicitly designed for young, ambitious people who are building something — whether it is a startup, an open-source project, a research initiative, or something entirely new. The program has a strong bias toward action and execution over credentials. Fellows are selected based on what they have already built and the clarity of their vision for what comes next.',
    sections: [
      {
        title: 'What You Get',
        content:
          'An extremely founder-friendly deal combined with an intensive community experience.',
        bulletPoints: [
          '$10,000 investment on a SAFE with a $1 billion valuation cap',
          '2-week intensive program in San Francisco with housing provided',
          'Daily fireside chats with top founders and investors',
          'Mentorship from successful operators in your domain',
          'Tight-knit cohort of 15-20 exceptional young builders',
          'Ongoing access to the Z Fellows alumni network',
          'Follow-up support for fundraising and recruiting',
        ],
      },
      {
        title: 'What They Look For',
        content:
          'Z Fellows cares about what you have built and what you want to build, not your resume.',
        bulletPoints: [
          'Demonstrated ability to build and ship products or projects',
          'Clear, ambitious vision for what you want to work on',
          'Young builders — most fellows are in their late teens to mid-20s',
          'Technical skills are valued but not required — designers, researchers, and operators also accepted',
          'International applicants welcome — diverse cohorts are a priority',
          'No company or startup required — individuals working on ambitious projects are eligible',
        ],
      },
    ],
    eligibility: 'Open to ambitious young builders worldwide. No formal age requirement, but most fellows are 17-25. No company required — individuals with ambitious projects are eligible. Must be able to travel to San Francisco for the 2-week program.',
    ageRange: '17-25 (typical)',
    geographicScope: 'global',
    category: 'tech-startup',
    tags: ['Entrepreneurship', 'AI & Machine Learning', 'Deep Tech', 'Open Source'],
    relatedProblemCategories: ['Moonshots', 'AI & infrastructure', 'Creator economy'],
    tagCount: 4,
  },

  // ----------------------------------------------------------------
  // 7. Neo Scholars
  // ----------------------------------------------------------------
  {
    slug: 'neo-scholars',
    name: 'Neo Scholars',
    shortName: 'Neo',
    organization: 'Neo (Ali Partovi)',
    fundingAmount: 'Mentorship & network (no direct funding)',
    fundingMin: 0,
    fundingMax: 0,
    duration: '1 year (renewable)',
    applicationCycle: 'Annual (spring applications)',
    deadline: 'March 2026',
    year: 2026,
    brandColor: '#4F46E5',
    websiteUrl: 'https://neo.com',
    description:
      'Neo Scholars connects top computer science undergraduates with mentorship from leading tech founders and executives. Founded by Ali Partovi, the program offers a curated network and career acceleration without requiring equity or a startup.',
    summary:
      'Neo is a highly selective community founded by Ali Partovi (CEO of Neo, co-founder of LinkExchange, advisor to Dropbox and Facebook) that identifies exceptional computer science undergraduates and connects them with mentorship from some of the most influential people in tech. The program is not an accelerator or a fellowship in the traditional sense — it is a talent network designed to help the most promising young technologists find their path.\n\nNeo Scholars are matched with mentors who are senior leaders at top tech companies, successful founders, and prominent investors. Past mentors have included the CEOs of major tech companies and founders of unicorn startups. Scholars also gain access to exclusive events, a tight-knit peer community, and recruiting opportunities at top companies and startups.\n\nThe program does not provide direct funding and does not take equity. Instead, it operates on the thesis that connecting exceptional people with the right mentors and peers at a formative time in their careers creates outsized long-term value. Many Neo Scholars have gone on to found companies, join early-stage startups, or take leadership roles at major tech companies.',
    sections: [
      {
        title: 'What You Get',
        content:
          'Neo provides mentorship and network access that is virtually impossible to get as an undergraduate.',
        bulletPoints: [
          '1:1 mentorship from top tech founders, executives, and investors',
          'Access to the Neo community of scholars and alumni',
          'Exclusive events and dinners with prominent figures in tech',
          'Recruiting introductions to top startups and tech companies',
          'Annual retreat with the full Neo community',
          'No equity taken and no funding provided — pure mentorship and network',
          'Renewable for multiple years of undergraduate study',
        ],
      },
      {
        title: 'Selection Criteria',
        content:
          'Neo looks for the most exceptional CS undergraduates in the country, selecting roughly 20-30 scholars per year.',
        bulletPoints: [
          'Must be a current undergraduate studying computer science or a related field',
          'Enrolled at a US university (domestic and international students at US schools are eligible)',
          'Demonstrated technical excellence through coursework, projects, research, or competitions',
          'Entrepreneurial mindset — interest in building products or starting companies',
          'Leadership experience in technical communities, clubs, or open-source projects',
          'Strong recommendation from a professor, employer, or mentor',
          'Acceptance rate is extremely low — typically under 2%',
        ],
      },
    ],
    eligibility: 'Must be a current undergraduate at a US university studying computer science or a closely related field. Open to domestic and international students enrolled at US institutions. Typically apply in sophomore or junior year.',
    ageRange: '18-22 (undergraduate)',
    geographicScope: 'us',
    category: 'tech-startup',
    tags: ['AI & Machine Learning', 'Entrepreneurship', 'Leadership', 'Open Source', 'Education'],
    relatedProblemCategories: ['AI & infrastructure', 'Future of work'],
    tagCount: 5,
  },

  // ----------------------------------------------------------------
  // 8. Kleiner Perkins Fellows
  // ----------------------------------------------------------------
  {
    slug: 'kleiner-perkins-fellows',
    name: 'Kleiner Perkins Fellows',
    shortName: 'KP Fellows',
    organization: 'Kleiner Perkins',
    fundingAmount: 'Paid internship (competitive salary)',
    fundingMin: 0,
    fundingMax: 0,
    duration: '12 weeks (summer)',
    applicationCycle: 'Annual (winter applications for summer program)',
    deadline: 'January 2026',
    year: 2026,
    brandColor: '#00875A',
    websiteUrl: 'https://fellows.kleinerperkins.com',
    description:
      'The Kleiner Perkins Fellows program places top engineering and design students at KP portfolio companies for a summer internship. Fellows gain hands-on startup experience and join a prestigious alumni network of tech leaders.',
    summary:
      'The Kleiner Perkins Fellows program is one of the most prestigious internship programs in Silicon Valley. Run by legendary venture capital firm Kleiner Perkins, the program selects exceptional engineering and design students and places them at top KP portfolio companies for a summer internship. What makes the program special is the combination of hands-on startup experience with the broader KP community and network.\n\nFellows are not placed at just any company — they are matched with some of the most exciting startups in the KP portfolio, working on meaningful projects alongside experienced engineering and design teams. Past host companies have included firms across AI, enterprise software, consumer tech, and climate. The matching process considers both the fellow\'s interests and skills and the company\'s needs.\n\nBeyond the internship itself, KP Fellows gain lifetime access to a powerful alumni network that includes founders, CTOs, and design leaders at major tech companies. The program has been running for over a decade and its alumni have gone on to found companies, lead engineering teams at FAANG companies, and become venture capitalists themselves. Many fellows describe the KP community as one of the most valuable professional networks they have ever joined.',
    sections: [
      {
        title: 'What You Get',
        content:
          'A world-class internship experience combined with the prestige and network of Kleiner Perkins.',
        bulletPoints: [
          'Paid summer internship at a top KP portfolio company (12 weeks)',
          'Competitive salary commensurate with top tech internships',
          'Curated matching based on your skills, interests, and career goals',
          'Weekly programming with KP partners, portfolio founders, and fellow fellows',
          'Exclusive events, dinners, and workshops throughout the summer',
          'Lifetime access to the KP Fellows alumni network (1,000+ members)',
          'Mentorship from KP investors and portfolio company executives',
        ],
      },
      {
        title: 'How to Apply',
        content:
          'The KP Fellows application is competitive, selecting roughly 50-80 fellows from thousands of applicants.',
        bulletPoints: [
          'Apply online through the KP Fellows website in January',
          'Application includes resume, portfolio (for designers), and short essays',
          'Strong emphasis on demonstrated technical or design skills',
          'Side projects, open-source contributions, and hackathon wins are valued',
          'Phone or video interviews with the KP Fellows team',
          'Final selections made by March for the following summer',
          'Engineering and design tracks have separate application processes',
        ],
      },
      {
        title: 'Who Should Apply',
        content:
          'The program is designed for top students who are passionate about technology and want exposure to the startup ecosystem.',
        bulletPoints: [
          'Current undergraduate or graduate students in CS, engineering, or design',
          'Must be authorized to work in the United States',
          'Strong builders — people who create things outside of class',
          'Interest in startups and venture-backed companies',
          'Prior internship experience is helpful but not required',
          'Applicants from all US universities are welcome (not limited to top-10 schools)',
        ],
      },
    ],
    eligibility: 'Must be a current undergraduate or graduate student studying computer science, engineering, design, or a related field. Must be authorized to work in the United States. Must be available for a 12-week summer internship.',
    ageRange: '18-28 (student)',
    geographicScope: 'us',
    category: 'tech-startup',
    tags: ['Entrepreneurship', 'AI & Machine Learning', 'Leadership', 'Open Source'],
    relatedProblemCategories: ['AI & infrastructure', 'Creator economy', 'Future of work'],
    tagCount: 4,
  },
  {
    slug: 'south-park-commons-fellowship',
    name: 'South Park Commons Fellowship',
    shortName: 'SPC',
    organization: 'South Park Commons',
    fundingAmount: 'Community-first fellowship (no standard grant)',
    fundingMin: 0,
    fundingMax: 0,
    duration: 'Cohort-based program (typically multi-month)',
    applicationCycle: 'Recurring cohorts (apply for upcoming batch)',
    deadline: 'Varies by cohort',
    year: 2026,
    brandColor: '#111827',
    websiteUrl: 'https://www.southparkcommons.com/fellowship',
    applicationStatus: 'closed',
    lastVerifiedAt: '2026-02-14',
    sourceLinks: [
      { label: 'SPC Fellowship', url: 'https://www.southparkcommons.com/fellowship' },
      { label: 'SPC Home', url: 'https://www.southparkcommons.com/' },
    ],
    description:
      'South Park Commons Fellowship is a pre-idea and early-idea program for exceptional technologists and domain experts who want to explore startup ideas inside a dense founder community.',
    summary:
      'South Park Commons (SPC) has become one of the highest-signal early founder communities in tech. The Fellowship is designed for people before traditional accelerator readiness: talented builders, operators, and researchers who want a structured environment to refine ideas, test hypotheses, and find collaborators.\n\nRather than fixed curriculum or demo-day pressure, SPC emphasizes community density, peer feedback, and high-quality conversations with members and alumni. Fellows often enter pre-formation and leave with sharper problem selection, stronger conviction, and early momentum toward company formation.\n\nIn tech circles, SPC is widely viewed as a strong bridge between individual talent and venture-scale company building, especially for founders who are still in exploration mode.',
    sections: [
      {
        title: 'What You Get',
        content:
          'SPC offers community leverage and founder development before the typical accelerator stage.',
        bulletPoints: [
          'Access to SPC founder and builder community',
          'Structured sessions and feedback loops for idea exploration',
          'Peer introductions and potential collaborator discovery',
          'Regular access to operators, founders, and investors in the network',
        ],
      },
      {
        title: 'Who It Fits Best',
        content:
          'The fellowship is strongest for people who are highly capable but still exploring the right startup thesis.',
        bulletPoints: [
          'Technical builders or domain experts in exploration phase',
          'Future founders before company incorporation',
          'People seeking high-quality peer network density',
          'Teams or individuals validating problem selection',
        ],
      },
      {
        title: 'Selection Signal',
        content:
          'SPC is selective and prioritizes candidate quality, trajectory, and contribution to the community.',
        bulletPoints: [
          'Strong prior evidence of building or domain excellence',
          'Clear motivation to start and iterate quickly',
          'High expected contribution to cohort quality',
          'Alignment with SPC community norms and pace',
        ],
      },
    ],
    eligibility:
      'Open to founders-in-progress, technologists, and operators. Exact requirements vary by cohort and location. Fellowship is generally targeted at people seriously exploring startup formation.',
    geographicScope: 'global',
    category: 'tech-startup',
    tags: ['Entrepreneurship', 'AI & Machine Learning', 'Deep Tech', 'Leadership'],
    relatedProblemCategories: ['AI & infrastructure', 'Future of work', 'Moonshots'],
    tagCount: 4,
  },
  {
    slug: 'true-ventures-fellowship',
    name: 'True Ventures Fellowship',
    shortName: 'True Fellowship',
    organization: 'True Ventures',
    fundingAmount: 'Paid fellowship placement (varies by host role)',
    fundingMin: 0,
    fundingMax: 0,
    duration: 'Summer fellowship (cohort-based)',
    applicationCycle: 'Annual',
    deadline: 'Varies by year',
    year: 2026,
    brandColor: '#C2410C',
    websiteUrl: 'https://www.trueventures.com/fellowship/',
    applicationStatus: 'closed',
    lastVerifiedAt: '2026-02-14',
    sourceLinks: [
      { label: 'True Ventures Fellowship', url: 'https://www.trueventures.com/fellowship/' },
      { label: 'True Ventures', url: 'https://www.trueventures.com/' },
    ],
    description:
      'True Ventures Fellowship connects top students and emerging builders with startup roles inside the True portfolio, combining operating exposure with a strong founder network.',
    summary:
      'The True Ventures Fellowship is a long-running tech fellowship focused on placing high-potential fellows into startup operating roles across the True portfolio. The program is known for giving fellows direct experience with early-stage execution while surrounding them with a high-signal peer and mentor network.\n\nUnlike purely educational programs, the fellowship emphasizes real work inside active startups. Fellows gain practical exposure to product, engineering, design, and go-to-market execution while receiving additional programming from the True network.\n\nIn practice, the program functions as a strong on-ramp into the startup ecosystem for future founders and early operators.',
    sections: [
      {
        title: 'What You Get',
        content:
          'The fellowship combines startup execution experience with high-quality network access.',
        bulletPoints: [
          'Placement at a True portfolio company',
          'Hands-on work on product, engineering, design, or GTM initiatives',
          'Cohort programming with other fellows',
          'Access to founders and operators in the True ecosystem',
        ],
      },
      {
        title: 'Who Should Apply',
        content:
          'The program is geared toward ambitious students and early-career builders targeting startup careers.',
        bulletPoints: [
          'Students with strong technical or product skill development',
          'People targeting startup operating roles',
          'Future founders seeking ecosystem immersion',
          'Candidates with strong execution orientation',
        ],
      },
      {
        title: 'Program Signal',
        content:
          'The fellowship is recognized in tech circles as a practical talent pipeline into venture-backed startups.',
        bulletPoints: [
          'Portfolio-backed role exposure',
          'Structured cohort and mentor environment',
          'Network effects from founder/operator interactions',
          'Career acceleration through startup experience',
        ],
      },
    ],
    eligibility:
      'Typically open to students and recent graduates interested in startup roles. Specific role and location requirements vary by participating company and cohort cycle.',
    geographicScope: 'us',
    category: 'tech-startup',
    tags: ['Entrepreneurship', 'Leadership', 'Education', 'AI & Machine Learning'],
    relatedProblemCategories: ['Future of work', 'AI & infrastructure', 'Creator economy'],
    tagCount: 4,
  },

  // ----------------------------------------------------------------
  // 12. Soma Capital Fellows
  // ----------------------------------------------------------------
  {
    slug: 'soma-capital-fellows',
    name: 'Soma Capital Fellows',
    shortName: 'Soma',
    organization: 'Soma Capital',
    fundingAmount: '$100K (up to $1M)',
    fundingMin: 100000,
    fundingMax: 1000000,
    duration: 'Cohort-based (ongoing support)',
    applicationCycle: 'Periodic (batch-based)',
    year: 2026,
    brandColor: '#0D9488',
    websiteUrl: 'https://programs.somacap.com/fellows',
    applicationStatus: 'open',
    lastVerifiedAt: '2026-02-14',
    sourceLinks: [
      { label: 'Soma Fellows', url: 'https://programs.somacap.com/fellows' },
      { label: 'Soma Capital', url: 'https://www.somacap.com/' },
    ],
    description:
      'Soma Capital\'s fellowship invests $100K (up to $1M) via uncapped SAFE in early-stage founders, with weekly office hours, virtual Demo Day, and investor introductions. 19 unicorns in portfolio.',
    summary:
      'Soma Capital Fellows is a remote-first fellowship program that invests $100K via an uncapped SAFE (0% immediate equity dilution), with the potential for up to $1M for founders starting their own company. The program also offers placement opportunities at top Soma portfolio companies like Cognition, Mercor, and Ramp.\n\nThe fellowship includes weekly office hours, a virtual Demo Day, and investor introductions from Soma\'s extensive network. The program is fully remote with optional in-person networking events. Soma Capital\'s portfolio includes 19 unicorns, including Gecko Robotics, Mercor, and Moniepoint.',
    sections: [
      {
        title: 'What You Get',
        content:
          'Investment with founder-friendly terms plus access to Soma\'s portfolio network.',
        bulletPoints: [
          '$100K via uncapped SAFE (up to $1M)',
          'Zero immediate equity dilution',
          'Weekly office hours with Soma team',
          'Virtual Demo Day and investor introductions',
          'Optional placement at portfolio companies (Cognition, Mercor, Ramp)',
        ],
      },
      {
        title: 'Who Should Apply',
        content:
          'Early-stage founders building technology companies who want remote-friendly support with minimal strings attached.',
        bulletPoints: [
          'Founders at pre-seed or idea stage',
          'Technical and non-technical founders welcome',
          'Remote-first — no relocation required',
          'Open to founders starting a company or joining a portfolio company',
        ],
      },
      {
        title: 'Selection Signal',
        content:
          'Soma evaluates founders on ambition, technical aptitude, and market insight rather than traction alone.',
        bulletPoints: [
          'Portfolio of 19 unicorns demonstrates strong selection',
          'Focus on founder quality over current metrics',
          'Batch-based applications with rolling review',
        ],
      },
    ],
    eligibility:
      'Open to early-stage founders globally. No formal age requirement. Founders can apply to start their own company or join a Soma portfolio company.',
    geographicScope: 'global',
    category: 'tech-startup',
    tags: ['Entrepreneurship', 'AI & Machine Learning', 'Leadership'],
    relatedProblemCategories: ['AI & infrastructure', 'Future of work'],
    tagCount: 3,
  },
]
