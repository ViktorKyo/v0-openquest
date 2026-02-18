import type { VCThesis } from './index'

export const gv2026Thesis: VCThesis = {
  slug: 'gv-2026',
  vcName: 'GV',
  vcShortName: 'GV',

  year: 2026,
  publishedAt: '2026-01-30',
  asOfDate: '2026-02-14',

  title: 'Investment Focus 2026',
  subtitle: 'Applied AI, life sciences, and frontier infrastructure',
  brandColor: '#0EA5E9',

  sourceUrl: 'https://www.gv.com/',
  sourceName: 'GV',
  evidenceLinks: [
    { label: 'GV Home', url: 'https://www.gv.com/' },
    { label: 'GV About', url: 'https://www.gv.com/about/' },
  ],
  engagementUrl: 'https://www.gv.com/contact/',
  engagementLabel: 'Contact GV',

  summary: `GV's 2026 themes continue to emphasize technically deep companies across AI, healthcare, and foundational infrastructure. The strongest signal is around products where data advantage and scientific depth create defensible long-term moats.`,

  sections: [
    {
      title: 'AI and Data-Driven Platforms',
      content: 'GV remains focused on AI businesses with strong technical foundations and durable data loops.',
      bulletPoints: [
        'Applied AI in enterprise and infrastructure contexts',
        'Data feedback loops that improve product quality',
        'Technically defensible product architecture',
      ],
    },
    {
      title: 'Healthcare and Biotech Innovation',
      content: 'Healthcare and life sciences continue to be core investment vectors for long-horizon impact.',
      bulletPoints: [
        'Clinical and healthcare workflow software',
        'Biotech platforms and enabling tools',
        'Data-centric healthcare infrastructure',
      ],
    },
    {
      title: 'Infrastructure and Security',
      content: 'Core infrastructure and security layers remain important as AI workloads and complexity increase.',
      bulletPoints: [
        'Cloud and developer infrastructure',
        'Security controls for modern applications',
        'Operational reliability and observability',
      ],
    },
    {
      title: 'What Changed in 2026',
      content: 'The focus shifted toward AI systems that perform reliably in production and regulated contexts.',
      bulletPoints: [
        'Higher demand for production-grade reliability',
        'More emphasis on compliance-ready architectures',
        'Greater importance of scientific and data defensibility',
      ],
    },
  ],

  hasRFSProblems: false,
  tags: ['AI', 'Healthcare', 'Biotech', 'Infrastructure'],
  themeCount: 4,
}
