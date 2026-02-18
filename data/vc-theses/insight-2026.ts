import type { VCThesis } from './index'

export const insight2026Thesis: VCThesis = {
  slug: 'insight-2026',
  vcName: 'Insight Partners',
  vcShortName: 'Insight',

  year: 2026,
  publishedAt: '2026-01-22',
  asOfDate: '2026-02-14',

  title: 'Investment Focus 2026',
  subtitle: 'Global software scaleups with product depth and operational leverage',
  brandColor: '#2563EB',

  sourceUrl: 'https://www.insightpartners.com/',
  sourceName: 'Insight Partners',
  evidenceLinks: [
    { label: 'Insight Home', url: 'https://www.insightpartners.com/' },
    { label: 'About Insight', url: 'https://www.insightpartners.com/about-us/' },
  ],
  engagementUrl: 'https://www.insightpartners.com/contact/',
  engagementLabel: 'Contact Insight',

  summary: `Insight's 2026 posture remains software-first with an operating-heavy approach to scaling. The strongest themes are AI-infused enterprise software, cybersecurity, and global go-to-market expansion for category leaders.`,

  sections: [
    {
      title: 'Enterprise AI in Production',
      content: 'Insight targets software companies where AI is embedded into core workflows, not layered on as a feature.',
      bulletPoints: [
        'AI embedded in mission-critical workflows',
        'Operational gains tied to customer outcomes',
        'Clear governance and reliability standards',
      ],
    },
    {
      title: 'Cybersecurity and Trust Infrastructure',
      content: 'Security remains a durable demand area as software stacks and attack surfaces expand.',
      bulletPoints: [
        'Identity and access controls',
        'Cloud workload protection',
        'Security analytics and response tooling',
      ],
    },
    {
      title: 'Global B2B Scale',
      content: 'Insight continues to favor businesses with repeatable GTM and international expansion potential.',
      bulletPoints: [
        'Repeatable enterprise sales motion',
        'Cross-region expansion capability',
        'Platform expansion through adjacent products',
      ],
    },
    {
      title: 'What Changed in 2026',
      content: 'The market moved toward quality growth and AI differentiation that survives procurement scrutiny.',
      bulletPoints: [
        'More emphasis on efficient growth quality',
        'Higher proof requirements for AI claims',
        'Greater focus on retention and expansion durability',
      ],
    },
  ],

  hasRFSProblems: false,
  tags: ['Enterprise', 'AI', 'Cybersecurity', 'B2B'],
  themeCount: 4,
}
