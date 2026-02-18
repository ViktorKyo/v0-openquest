import type { VCThesis } from './index'

export const greylock2025Thesis: VCThesis = {
  slug: 'greylock-2025',
  vcName: 'Greylock Partners',
  vcShortName: 'Greylock',

  year: 2025,
  publishedAt: '2025-01-01',

  title: 'AI-First Investment Thesis',
  subtitle: 'Building with AI from inception',
  brandColor: '#374151',

  sourceUrl: 'https://greylock.com/',
  sourceName: 'Greylock Partners',

  summary: `Greylock's strategic focus is on AI-first companies, with domain expertise spanning AI, Cybersecurity, Infrastructure, SaaS, Consumer Marketplaces & Commerce, and Fintech & Crypto. Over 80% of their investments are first checks (Pre-Seed, Seed, or Series A).

The firm particularly concentrates on AI-native startups from inception—not just in core product development, but also in operational scaling.`,

  sections: [
    {
      title: 'AI-First Companies',
      content: `Greylock emphasizes AI-first companies where AI is foundational, not bolted on. They seek AI-native startups from inception.`,
      bulletPoints: [
        'AI as foundational architecture',
        'AI-native from day one',
        'Operational AI scaling',
        '80%+ first-check investments',
      ],
    },
    {
      title: 'Cybersecurity',
      content: `Security remains a core focus as AI creates new attack surfaces and defense opportunities.`,
      bulletPoints: [
        'AI-powered security tools',
        'New threat detection',
        'Identity and access management',
      ],
    },
    {
      title: 'Infrastructure',
      content: `The picks and shovels of the AI era—developer tools, data infrastructure, and compute platforms.`,
      bulletPoints: [
        'Developer tools and platforms',
        'Data infrastructure',
        'Compute and cloud services',
      ],
    },
    {
      title: 'Consumer & Commerce',
      content: `Consumer marketplaces and commerce platforms being reimagined with AI at the core.`,
      bulletPoints: [
        'AI-powered marketplaces',
        'Commerce automation',
        'Consumer AI applications',
      ],
    },
    {
      title: 'Fintech & Crypto',
      content: `Financial technology and crypto infrastructure investments.`,
      bulletPoints: [
        'Financial infrastructure',
        'Crypto platforms',
        'Payment systems',
      ],
    },
  ],

  hasRFSProblems: false,
  tags: ['AI', 'Cybersecurity', 'Infrastructure', 'Fintech', 'Consumer'],
  themeCount: 5,
}
