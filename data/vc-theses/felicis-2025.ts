import type { VCThesis } from './index'

export const felicis2025Thesis: VCThesis = {
  slug: 'felicis-2025',
  vcName: 'Felicis Ventures',
  vcShortName: 'Felicis',

  year: 2025,
  publishedAt: '2025-06-12',

  title: 'Fund X Investment Thesis',
  subtitle: 'AI-first founders with conviction',
  brandColor: '#F59E0B',

  sourceUrl: 'https://www.felicis.com/',
  sourceName: 'Felicis Ventures',

  summary: `Felicis closed Fund X in June 2025, raising $900 million—their largest fund yet. Over 93% of capital goes into seed and Series A deals, led or co-led by Felicis itself. The fund places strong emphasis on transformative AI, cybersecurity, infrastructure, global resilience, and health & biotech.

Over 70% of Felicis' active portfolio companies are AI-native, making them one of the most AI-concentrated funds in venture capital.`,

  sections: [
    {
      title: 'AI-First Companies',
      content: `Felicis focuses on AI-first companies that are both horizontal platforms and vertical applications. Over 70% of their active portfolio is AI-native.`,
      bulletPoints: [
        '70%+ portfolio AI-native',
        'Horizontal AI platforms',
        'Vertical AI applications',
        '$900M Fund X for AI-first founders',
      ],
    },
    {
      title: 'Cybersecurity',
      content: `Security investments addressing new threats and opportunities created by AI.`,
      bulletPoints: [
        'AI-powered security',
        'Enterprise security platforms',
        'Identity and access solutions',
      ],
    },
    {
      title: 'Infrastructure',
      content: `Felicis considers infrastructure the "new railways of an AI-first future."`,
      bulletPoints: [
        'AI infrastructure investments',
        'Developer tools and platforms',
        'Data and compute infrastructure',
      ],
    },
    {
      title: 'Global Resilience',
      content: `Defense and energy investments for global stability and security.`,
      bulletPoints: [
        'Defense technology',
        'Energy infrastructure',
        'Critical systems resilience',
      ],
    },
    {
      title: 'Health & Biotech',
      content: `Healthcare and biotech investments leveraging AI for drug discovery and care delivery.`,
      bulletPoints: [
        'AI-powered drug discovery',
        'Healthcare delivery innovation',
        'Biotech platforms',
      ],
    },
  ],

  hasRFSProblems: false,
  tags: ['AI', 'Cybersecurity', 'Infrastructure', 'Defense', 'Healthcare'],
  themeCount: 5,
}
