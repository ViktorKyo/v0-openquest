import type { Residency } from './index'

export const communityResidencies: Residency[] = [
  {
    slug: 'south-park-commons',
    name: 'SPC Founder Fellowship',
    shortName: 'SPC',
    organization: 'South Park Commons',
    fundingAmount: '$400K',
    fundingMin: 400000,
    fundingMax: 400000,
    equityTerms: '7% equity via SAFE',
    duration: 'Bootcamp + open-ended residency',
    cohortSize: '~20 founders',
    cohortCadence: '2–3 cohorts/year',
    applicationCycle: 'Seasonal (Fall, Spring, Summer)',
    location: 'San Francisco & New York City',
    isLiveIn: false,
    geographicScope: 'us',
    brandColor: '#7C3AED',
    websiteUrl: 'https://www.southparkcommons.com/founder-fellowship',
    applicationStatus: 'open',
    lastVerifiedAt: '2026-02-14',
    sourceLinks: [
      { label: 'SPC Founder Fellowship', url: 'https://www.southparkcommons.com/founder-fellowship' },
      { label: 'SPC Apply', url: 'https://www.southparkcommons.com/apply' },
    ],
    description:
      'A two-phase program ($400K for 7%) designed for the -1 to 0 stage: an in-person bootcamp followed by an open-ended residency until you reach conviction.',
    summary:
      'South Park Commons\' Founder Fellowship helps entrepreneurs start a venture-scale company by targeting support at the "-1 to 0" idea stage. The program offers $400K in exchange for 7% equity via a SAFE, plus a guaranteed $600K in your next outside-led venture round.\n\nThe Fellowship has two distinct phases: a structured in-person bootcamp (in SF or NYC) followed by an open-ended residency with flexible access to offices and partners. There\'s no fixed end date — the residency lasts as long as needed to reach conviction and prepare for fundraising.',
    sections: [
      {
        title: 'Program Edge',
        content:
          'The open-ended residency format is unique — no arbitrary 12-week deadline. Plus, the guaranteed $600K follow-on removes fundraising anxiety.',
        bulletPoints: [
          '$400K upfront + guaranteed $600K in next round',
          'Structured bootcamp + open-ended residency',
          'Office space in SF and NYC',
          'Deep community of technical founders',
        ],
      },
      {
        title: 'Best Fit',
        content:
          'Technical founders who need time and community to explore ideas without the pressure of a fixed program timeline. Strong fit for people leaving Big Tech or academia.',
      },
      {
        title: 'What Makes It Different',
        content:
          'SPC blurs the line between a fellowship and a residency. The open-ended format and guaranteed follow-on funding create a safety net that encourages ambitious exploration.',
      },
    ],
    category: 'community',
    tags: ['AI', 'Deep Tech', 'Enterprise', 'Developer Tools'],
    focusAreas: ['AI', 'Deep Tech', 'Enterprise'],
    year: 2026,
  },
  {
    slug: 'a16z-speedrun',
    name: 'a16z Speedrun',
    shortName: 'Speedrun',
    organization: 'Andreessen Horowitz',
    fundingAmount: 'Up to $1M',
    fundingMin: 100000,
    fundingMax: 1000000,
    equityTerms: 'Standard pre-seed terms',
    duration: '12 weeks',
    cohortSize: '~60 companies',
    cohortCadence: '2 cohorts/year',
    applicationCycle: 'Biannual',
    deadline: 'Varies by cohort',
    location: 'Los Angeles',
    isLiveIn: false,
    geographicScope: 'global',
    brandColor: '#000000',
    websiteUrl: 'https://a16z.com/speedrun/',
    applicationStatus: 'open',
    lastVerifiedAt: '2026-02-14',
    sourceLinks: [
      { label: 'a16z Speedrun', url: 'https://a16z.com/speedrun/' },
      { label: 'Andreessen Horowitz', url: 'https://a16z.com/' },
    ],
    description:
      'Andreessen Horowitz\'s 12-week program offering up to $1M in investment, 1:1 mentoring, and $5M+ in credits from OpenAI, Anthropic, NVIDIA, and more.',
    summary:
      'a16z Speedrun is Andreessen Horowitz\'s 12-week investment and mentorship program, originally focused on young founders and now open to startups across all industries. Each cohort accepts around 60 companies, each receiving up to $1M in investment.\n\nBeyond capital, founders get 1:1 mentoring time with a16z executives and $5M+ in credits from OpenAI, Anthropic, NVIDIA, AWS, and Microsoft. The program runs in Los Angeles with two cohorts per year (Summer and Winter/Spring).',
    sections: [
      {
        title: 'Program Edge',
        content:
          'The a16z brand signal is unmatched. $5M+ in vendor credits provides significant runway for AI-heavy startups.',
        bulletPoints: [
          'Up to $1M investment per company',
          '1:1 mentoring from a16z executives',
          '$5M+ in vendor credits (OpenAI, Anthropic, NVIDIA, AWS, Microsoft)',
          'Access to a16z portfolio network',
        ],
      },
      {
        title: 'Best Fit',
        content:
          'Early-stage founders across all industries who want the a16z signal and network. Larger cohort size means less personalized attention than smaller residencies.',
      },
      {
        title: 'What Makes It Different',
        content:
          'The combination of a16z brand, massive vendor credits, and LA location (vs. SF-centric competitors) makes Speedrun unique in the residency landscape.',
      },
    ],
    category: 'community',
    tags: ['AI', 'Consumer', 'Enterprise', 'Fintech', 'Deep Tech'],
    focusAreas: ['AI', 'Consumer', 'Enterprise'],
    year: 2026,
  },
  {
    slug: 'sequoia-arc',
    name: 'Sequoia Arc',
    shortName: 'Arc',
    organization: 'Sequoia Capital',
    fundingAmount: 'Portfolio founders only',
    equityTerms: 'Existing Sequoia investment terms',
    duration: 'Varies',
    cohortCadence: 'Ongoing',
    applicationCycle: 'By invitation (portfolio)',
    location: 'San Francisco',
    isLiveIn: false,
    geographicScope: 'global',
    brandColor: '#DC2626',
    websiteUrl: 'https://www.sequoiacap.com/arc/',
    applicationStatus: 'rolling',
    lastVerifiedAt: '2026-02-14',
    sourceLinks: [
      { label: 'Sequoia Arc', url: 'https://www.sequoiacap.com/arc/' },
      { label: 'Sequoia Capital', url: 'https://www.sequoiacap.com/' },
    ],
    description:
      'Sequoia\'s company building immersion for pre-seed and seed founders in their portfolio. Deep operational support for the earliest stage.',
    summary:
      'Sequoia Arc is an intensive company building program for Sequoia Capital\'s pre-seed and seed stage founders. Unlike open-application residencies, Arc is available to founders who have already received Sequoia investment.\n\nThe program provides deep operational support — helping founders with product strategy, go-to-market, hiring, and fundraising. Arc leverages Sequoia\'s decades of experience backing companies from seed to IPO.',
    sections: [
      {
        title: 'Program Edge',
        content:
          'Sequoia\'s operational playbook and network are among the deepest in Silicon Valley.',
        bulletPoints: [
          'Access to Sequoia\'s full portfolio network',
          'Deep operational support (product, GTM, hiring)',
          'Decades of pattern recognition from seed to IPO',
          'Global reach across US, India, Southeast Asia',
        ],
      },
      {
        title: 'Best Fit',
        content:
          'Sequoia-backed founders at pre-seed or seed stage. Not open to external applications — you must be a Sequoia portfolio company.',
      },
    ],
    category: 'community',
    tags: ['AI', 'Enterprise', 'Consumer', 'Fintech'],
    focusAreas: ['AI', 'Enterprise'],
    year: 2026,
  },
  {
    slug: 'the-residency',
    name: 'The Residency',
    shortName: 'Residency',
    organization: 'The Residency',
    fundingAmount: 'No investment (paid co-living)',
    equityTerms: 'No equity taken',
    duration: '3–6 months',
    cohortCadence: 'Continuous',
    applicationCycle: 'Rolling',
    location: 'San Francisco, Bangalore, Berlin, Vienna',
    isLiveIn: true,
    geographicScope: 'global',
    brandColor: '#6366F1',
    websiteUrl: 'https://www.livetheresidency.com/',
    applicationStatus: 'open',
    lastVerifiedAt: '2026-02-14',
    sourceLinks: [
      { label: 'The Residency', url: 'https://www.livetheresidency.com/' },
      { label: 'Apply', url: 'https://www.livetheresidency.com/apply' },
      { label: 'Locations', url: 'https://www.livetheresidency.com/residencies' },
    ],
    description:
      'A global network of co-living houses for ambitious builders, founders, and engineers — live and work alongside equally ambitious peers across SF, Bangalore, Berlin, and Vienna.',
    summary:
      'The Residency is a global network of co-living/co-working houses for ambitious builders, founders, scientists, and engineers. Founded in 2022 and headquartered in San Francisco, it provides housing and workspace so residents can live and work alongside equally ambitious peers.\n\nCohorts run 3–6 months with locations in SF (deep tech/hacker house), Bangalore (early-stage exploration), Berlin (scientists and engineers), and Vienna (European hub). The Residency does not invest or take equity — it is a paid program ($500–$3,000/month) that provides community, compute credits, demo days, mentor introductions, and a "Delta" scholarship competition for free rides.',
    sections: [
      {
        title: 'Program Edge',
        content:
          'Global network of purpose-built co-living spaces. Zero equity, pure community value.',
        bulletPoints: [
          '4 global locations (SF, Bangalore, Berlin, Vienna)',
          'Co-living + co-working under one roof',
          'Compute credits, demo days, mentor intros',
          'Delta scholarship: free ride via 3-week competition',
        ],
      },
      {
        title: 'Best Fit',
        content:
          'Builders, founders, and engineers at the -1 to 0 stage who want to live among ambitious peers without giving up equity. Great for people relocating to a new city.',
      },
      {
        title: 'What Makes It Different',
        content:
          'No investment, no equity — purely a co-living community for builders. The global footprint and scholarship program make it accessible.',
      },
    ],
    category: 'community',
    tags: ['AI', 'Deep Tech', 'Consumer', 'Enterprise'],
    focusAreas: ['AI', 'Deep Tech'],
    year: 2026,
  },
]
