import type { VCThesis } from './index'

export const nea2026Thesis: VCThesis = {
  slug: 'nea-2026',
  vcName: 'New Enterprise Associates',
  vcShortName: 'NEA',

  year: 2026,
  publishedAt: '2026-01-25',
  asOfDate: '2026-02-14',

  title: 'Investment Focus 2026',
  subtitle: 'Broad platform investing across technology and healthcare',
  brandColor: '#0F766E',

  sourceUrl: 'https://www.nea.com/',
  sourceName: 'NEA',
  evidenceLinks: [
    { label: 'NEA Home', url: 'https://www.nea.com/' },
    { label: 'NEA $6.2B Funds Announcement', url: 'https://www.nea.com/news/press-releases/nea-closes-on-two-funds-totaling-62-billion' },
  ],
  engagementUrl: 'https://www.nea.com/contact',
  engagementLabel: 'Contact NEA',

  summary: `NEA's 2026 signal remains broad but consistent: large opportunities at the intersection of enterprise software, healthcare innovation, and AI-enabled infrastructure. The firm's latest fund scale reinforces a multi-stage approach across company lifecycles.`,

  sections: [
    {
      title: 'Healthcare and Biotech Platforms',
      content: 'NEA continues to prioritize healthcare delivery modernization and biotech innovation with strong technical differentiation.',
      bulletPoints: [
        'Healthcare operations and workflow tooling',
        'Biotech platforms with data and experimentation advantages',
        'Clinical and operational infrastructure modernization',
      ],
    },
    {
      title: 'Enterprise and B2B Software',
      content: 'Durable enterprise software with clear buyer ROI remains central to the strategy.',
      bulletPoints: [
        'Mission-critical enterprise workflows',
        'B2B systems with measurable productivity gains',
        'Scalable GTM with strong customer retention',
      ],
    },
    {
      title: 'AI and Infrastructure',
      content: 'AI infrastructure and application layers are investable where deployment quality and reliability are defensible.',
      bulletPoints: [
        'Data and model infrastructure for production use',
        'Applied AI in regulated environments',
        'Security and governance for AI deployments',
      ],
    },
    {
      title: 'What Changed in 2026',
      content: 'Capital scale and market conditions raised the bar on execution, capital efficiency, and repeatable adoption.',
      bulletPoints: [
        'Stronger preference for execution-ready teams',
        'More explicit ROI narratives in enterprise buying cycles',
        'Deeper focus on defensibility in AI-heavy markets',
      ],
    },
  ],

  hasRFSProblems: false,
  tags: ['Healthcare', 'Biotech', 'Enterprise', 'AI'],
  themeCount: 4,
}
