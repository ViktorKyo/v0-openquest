import type { VCThesis } from './index'

export const kleinerPerkins2026Thesis: VCThesis = {
  slug: 'kleiner-perkins-2026',
  vcName: 'Kleiner Perkins',
  vcShortName: 'KP',

  year: 2026,
  publishedAt: '2026-01-28',
  asOfDate: '2026-02-14',

  title: 'Investment Focus 2026',
  subtitle: 'AI-led transformation across enterprise, healthcare, and frontier systems',
  brandColor: '#15803D',

  sourceUrl: 'https://www.kleinerperkins.com/',
  sourceName: 'Kleiner Perkins',
  evidenceLinks: [
    { label: 'Kleiner Perkins Home', url: 'https://www.kleinerperkins.com/' },
    { label: 'Kleiner Perkins Portfolio', url: 'https://www.kleinerperkins.com/portfolio/' },
  ],
  engagementUrl: 'https://www.kleinerperkins.com/contact/',
  engagementLabel: 'Contact Kleiner Perkins',

  summary: `Kleiner Perkins' 2026 posture continues to center on ambitious, technically strong teams building enduring companies in AI, enterprise infrastructure, healthcare, and industrial systems. The strongest signal is long-duration conviction in category leaders with platform potential.`,

  sections: [
    {
      title: 'AI-Native Category Leaders',
      content: 'Kleiner Perkins remains focused on companies where AI meaningfully changes product and market structure.',
      bulletPoints: [
        'AI as core product architecture',
        'Strong technical moats and product defensibility',
        'Path to category-defining market position',
      ],
    },
    {
      title: 'Enterprise Infrastructure and Security',
      content: 'Infrastructure and trust layers remain critical for enterprise adoption at scale.',
      bulletPoints: [
        'Cloud and application infrastructure',
        'Security and compliance readiness',
        'Reliability and performance tooling',
      ],
    },
    {
      title: 'Healthcare and Deep Tech',
      content: 'Healthcare and deep technical domains remain priority areas for long-cycle value creation.',
      bulletPoints: [
        'Healthcare workflow modernization',
        'Biotech and science-enabled platforms',
        'Deep technical systems with long-horizon upside',
      ],
    },
    {
      title: 'What Changed in 2026',
      content: 'AI maturity shifted emphasis toward durable adoption, defensibility, and execution depth.',
      bulletPoints: [
        'Less tolerance for superficial AI positioning',
        'More focus on platform extensibility and retention',
        'Greater value placed on execution quality over narrative',
      ],
    },
  ],

  hasRFSProblems: false,
  tags: ['AI', 'Enterprise', 'Healthcare', 'Deep Tech'],
  themeCount: 4,
}
