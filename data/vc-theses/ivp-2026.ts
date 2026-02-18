import type { VCThesis } from './index'

export const ivp2026Thesis: VCThesis = {
  slug: 'ivp-2026',
  vcName: 'IVP',
  vcShortName: 'IVP',

  year: 2026,
  publishedAt: '2026-01-18',
  asOfDate: '2026-02-14',

  title: 'Investment Focus 2026',
  subtitle: 'Scalable software franchises with durable growth channels',
  brandColor: '#111827',

  sourceUrl: 'https://www.ivp.com/',
  sourceName: 'IVP',
  evidenceLinks: [
    { label: 'IVP Home', url: 'https://www.ivp.com/' },
    { label: 'IVP Portfolio', url: 'https://www.ivp.com/portfolio' },
  ],
  engagementUrl: 'https://www.ivp.com/contact',
  engagementLabel: 'Contact IVP',

  summary: `IVP's 2026 posture remains centered on breakout software companies that can scale efficiently with strong retention, expanding product surfaces, and category leadership potential. The emphasis is on high-quality growth and durable enterprise revenue architecture.`,

  sections: [
    {
      title: 'Enterprise Software at Scale',
      content: 'IVP remains focused on businesses with strong net revenue retention and multi-product expansion opportunities.',
      bulletPoints: [
        'Expansion revenue from adjacent workflows',
        'Large enterprise go-to-market repeatability',
        'Durable retention and predictable growth',
      ],
    },
    {
      title: 'AI-Enabled Workflow Transformation',
      content: 'AI is most investable where it is embedded into existing mission-critical workflows.',
      bulletPoints: [
        'Embedded AI in systems of record',
        'Automation with human override and auditability',
        'Quantifiable productivity and margin impact',
      ],
    },
    {
      title: 'Security and Infrastructure',
      content: 'Core infrastructure and cybersecurity remain critical as AI increases system complexity.',
      bulletPoints: [
        'Identity and access modernization',
        'Cloud and application security tooling',
        'Observability and incident response',
      ],
    },
    {
      title: 'What Changed in 2026',
      content: 'The priority shifted from growth-at-all-costs to efficient compounding with resilient GTM systems.',
      bulletPoints: [
        'Higher scrutiny on efficient growth quality',
        'Increased preference for platform extensibility',
        'More focus on AI + security convergence',
      ],
    },
  ],

  hasRFSProblems: false,
  tags: ['Enterprise', 'AI', 'Security', 'Infrastructure'],
  themeCount: 4,
}
