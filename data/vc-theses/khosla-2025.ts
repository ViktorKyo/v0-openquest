import type { VCThesis } from './index'

export const khosla2025Thesis: VCThesis = {
  slug: 'khosla-2025',
  vcName: 'Khosla Ventures',
  vcShortName: 'Khosla',

  year: 2025,
  publishedAt: '2025-05-01',

  title: 'Breakthrough Technology Thesis',
  subtitle: 'Investing before it\'s obvious',
  brandColor: '#7C3AED',

  sourceUrl: 'https://www.khoslaventures.com/',
  sourceName: 'Khosla Ventures',

  summary: `Khosla Ventures is renowned for backing bold, breakthrough technologies and visionary founders capable of addressing large, material problems. Their strategy aligns with emerging market trends by prioritizing sectors such as AI, sustainability, healthcare, fintech, and deep tech.

A key part of their thesis is investing "before it's obvious"—backing technologies that seem impractical today but could transform industries tomorrow.`,

  sections: [
    {
      title: 'AI & Deep Tech',
      content: `Khosla focuses on breakthrough AI technologies and deep tech investments that could fundamentally change how industries operate.`,
      bulletPoints: [
        'Foundation model investments',
        'AI infrastructure and compute',
        'Deep learning applications',
        'Robotics and automation',
      ],
    },
    {
      title: 'Sustainability & Climate',
      content: `Long-standing commitment to sustainability, including clean energy, sustainable materials, and climate technology.`,
      bulletPoints: [
        'Clean energy technology',
        'Sustainable materials',
        'Climate tech solutions',
        'Carbon reduction technologies',
      ],
    },
    {
      title: 'Healthcare Innovation',
      content: `Healthcare investments focused on technologies that could dramatically improve outcomes and reduce costs.`,
      bulletPoints: [
        'Novel therapeutic approaches',
        'Healthcare cost reduction',
        'Diagnostic innovation',
        'Digital health platforms',
      ],
    },
    {
      title: 'AI Roll-Ups Exploration',
      content: `Khosla is experimenting with AI-infused roll-ups of mature companies—acquiring traditional businesses and transforming them with AI.`,
      bulletPoints: [
        'AI-infused business transformation',
        'Mature company acquisition',
        'Operational AI implementation',
        'Cautious validation approach',
      ],
    },
  ],

  hasRFSProblems: false,
  tags: ['AI', 'Climate', 'Healthcare', 'Deep Tech'],
  themeCount: 4,
}
