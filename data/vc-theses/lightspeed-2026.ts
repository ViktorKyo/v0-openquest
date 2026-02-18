import type { VCThesis } from './index'

export const lightspeed2026Thesis: VCThesis = {
  slug: 'lightspeed-2026',
  vcName: 'Lightspeed Venture Partners',
  vcShortName: 'Lightspeed',

  year: 2026,
  publishedAt: '2025-12-15',

  title: 'AI-Native Investment Thesis',
  subtitle: '$9B to back category-defining AI companies',
  brandColor: '#FF6B35',

  sourceUrl: 'https://lsvp.com/',
  sourceName: 'Lightspeed Venture Partners',

  summary: `Lightspeed closed over $9 billion in committed capital across six funds in December 2025, positioning itself as a predominantly AI-focused investor. The firm has backed 165 AI-native companies including Anthropic, xAI, Databricks, Mistral, Glean, Abridge, and Skild AI.

Lightspeed's core thesis: AI is an unprecedented source of value creation, reshaping industries even faster than the platform shifts of internet, mobile, and cloud computing. The firm believes compounding progress in AI will drive profound shifts in professional services, scientific discovery, and autonomy markets in 2026.`,

  sections: [
    {
      title: 'AI-Native Companies',
      content: `Lightspeed has backed 165 AI-native companies. The firm's center of gravity is depth—building and maintaining mastery that enables unwavering conviction in the companies they back.`,
      bulletPoints: [
        'Portfolio: Anthropic, xAI, Databricks, Mistral',
        'Glean, Abridge, Skild AI investments',
        'Focus on depth over volume',
        'Long-term durable franchise building',
      ],
    },
    {
      title: 'Professional Services Transformation',
      content: `AI will drive profound shifts in professional services—legal, accounting, consulting, and other knowledge work that has historically resisted automation.`,
      bulletPoints: [
        'Legal services automation',
        'Accounting and finance transformation',
        'Consulting industry disruption',
        'Knowledge work AI augmentation',
      ],
    },
    {
      title: 'Scientific Discovery',
      content: `AI is accelerating scientific discovery in ways that weren't possible before. Drug discovery, materials science, and fundamental research are all being transformed.`,
      bulletPoints: [
        'AI-accelerated drug discovery',
        'Materials science breakthroughs',
        'Research automation and synthesis',
      ],
    },
    {
      title: 'Autonomy Markets',
      content: `Autonomous systems—vehicles, drones, robots—are reaching the capability threshold where deployment at scale becomes possible.`,
      bulletPoints: [
        'Autonomous vehicle deployment',
        'Drone automation and delivery',
        'Industrial robotics at scale',
      ],
    },
  ],

  hasRFSProblems: false,
  tags: ['AI', 'Enterprise', 'Scientific Discovery', 'Autonomy'],
  themeCount: 4,
}
