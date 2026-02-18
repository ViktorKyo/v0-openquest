import type { VCThesis } from './index'

export const index2026Thesis: VCThesis = {
  slug: 'index-2026',
  vcName: 'Index Ventures',
  vcShortName: 'Index',

  year: 2026,
  publishedAt: '2026-01-20',
  asOfDate: '2026-02-14',

  title: 'Investment Focus 2026',
  subtitle: 'AI-native software, infrastructure, and resilient vertical systems',
  brandColor: '#111827',

  sourceUrl: 'https://www.indexventures.com/perspectives/',
  sourceName: 'Index Ventures Perspectives',
  evidenceLinks: [
    { label: 'Index Perspectives', url: 'https://www.indexventures.com/perspectives/' },
    { label: 'Index Portfolio', url: 'https://www.indexventures.com/portfolio/' },
  ],
  engagementUrl: 'https://www.indexventures.com/contact/',
  engagementLabel: 'Contact Index',

  summary: `Index Ventures continues to back category-defining software companies with clear distribution, strong product moats, and compounding data advantages. In 2026 framing, the firm signal is strongest around AI-native enterprise software, developer infrastructure, and vertical products with measurable ROI.`,

  sections: [
    {
      title: 'AI-Native Enterprise Software',
      content: 'Index remains focused on workflow software where AI changes unit economics, customer outcomes, and speed of execution.',
      bulletPoints: [
        'Copilot to autopilot transitions in core business workflows',
        'Outcome-linked pricing models',
        'Durable distribution in enterprise channels',
      ],
    },
    {
      title: 'Developer and Data Infrastructure',
      content: 'Foundational tools for building, deploying, and securing AI applications remain a durable investment area.',
      bulletPoints: [
        'Model operations and reliability layers',
        'Data pipelines for production AI workloads',
        'Security and observability for AI systems',
      ],
    },
    {
      title: 'Vertical Software with Clear ROI',
      content: 'Index prioritizes vertical products where AI produces measurable gains in labor efficiency or revenue conversion.',
      bulletPoints: [
        'Industry-specific systems of record + action',
        'Faster implementation and payback cycles',
        'Integration into existing operational workflows',
      ],
    },
    {
      title: 'What Changed in 2026',
      content: 'The narrative moved from generic AI experimentation to execution quality and durable adoption.',
      bulletPoints: [
        'More emphasis on production reliability over demos',
        'Higher bar for distribution advantage',
        'Greater focus on ROI-backed enterprise adoption',
      ],
    },
  ],

  hasRFSProblems: false,
  tags: ['AI', 'Enterprise', 'Infrastructure', 'B2B'],
  themeCount: 4,
}
