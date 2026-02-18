import type { VCThesis } from './index'

export const lux2025Thesis: VCThesis = {
  slug: 'lux-2025',
  vcName: 'Lux Capital',
  vcShortName: 'Lux',

  year: 2025,
  publishedAt: '2025-01-01',

  title: 'Sci-Fi to Sci-Fact',
  subtitle: 'Deep tech at the frontiers of possibility',
  brandColor: '#0EA5E9',

  sourceUrl: 'https://www.luxcapital.com/',
  sourceName: 'Lux Capital',

  summary: `Lux Capital positions itself as a contrarian investor supporting "rebels at the frontiers of science and technology." The firm closed a $1.5 billion fund to invest in deep technology ventures "at the outermost edges of what is possible."

A key part of their thesis is investing "before it's obvious"—backing founders turning sci-fi into sci-fact. In 2025, Lux launched Lux Labs, a $100 million initiative supporting academic research at risk due to federal funding cuts.`,

  sections: [
    {
      title: 'AI Infrastructure',
      content: `Lux is heavily invested in AI companies including Physical Intelligence, Hugging Face, and Together AI.`,
      bulletPoints: [
        'Physical Intelligence',
        'Hugging Face',
        'Together AI',
        'AI infrastructure and compute',
      ],
    },
    {
      title: 'Defense Technology',
      content: `Defense innovation through companies like Anduril's "loyal wingman" drones and Saildrone's subsea surveillance systems.`,
      bulletPoints: [
        'Anduril (autonomous defense)',
        'Saildrone (maritime surveillance)',
        'Autonomous systems',
        'Defense innovation',
      ],
    },
    {
      title: 'Biotech & Healthcare',
      content: `Varda's space-manufactured drugs and Eikon Therapeutics' AI-driven drug discovery represent the kind of breakthrough bets Lux makes.`,
      bulletPoints: [
        'Varda (space manufacturing)',
        'Eikon Therapeutics (AI drug discovery)',
        'Novel therapeutic approaches',
        '$1.5T healthcare market opportunity',
      ],
    },
    {
      title: 'Scientific Research Support',
      content: `In 2025, Lux launched Lux Labs, a $100 million initiative supporting academic research at risk due to federal funding cuts.`,
      bulletPoints: [
        '$100M Lux Labs initiative',
        'Academic research support',
        'Filling federal funding gaps',
        'Basic science investment',
      ],
    },
    {
      title: 'IPO Pipeline',
      content: `Among Lux's top prospects to go public are weapons manufacturer Anduril, data platform Databricks, and payments provider Ramp.`,
      bulletPoints: [
        'Anduril (defense)',
        'Databricks (data)',
        'Ramp (payments)',
        'Top-quartile fund performance',
      ],
    },
  ],

  hasRFSProblems: false,
  tags: ['Deep Tech', 'AI', 'Defense', 'Biotech', 'Science'],
  themeCount: 5,
}
