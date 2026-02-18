import type { VCThesis } from './index'

export const foundersFund2025Thesis: VCThesis = {
  slug: 'founders-fund-2025',
  vcName: 'Founders Fund',
  vcShortName: 'FF',

  year: 2025,
  publishedAt: '2025-09-01',

  title: 'Hard Tech Investment Thesis',
  subtitle: 'Backing transformational technology',
  brandColor: '#1F2937',

  sourceUrl: 'https://foundersfund.com/',
  sourceName: 'Founders Fund',

  summary: `Founders Fund is renowned for its investment thesis centered on backing ambitious, transformational technologies with the potential to reshape industries. The firm has evolved from an initial focus on consumer internet to embracing "hard tech" sectors like AI, biotech, defense, and space.

In 2025, Founders Fund raised its third growth fund at $4.6 billion for late-stage investments, with partners indicating concentrated bets of about $460 million per company.`,

  sections: [
    {
      title: 'Hard Tech Focus',
      content: `The firm's strategic direction has shifted to "hard tech" sectors: AI infrastructure, biotech, defense technology, and space exploration.`,
      bulletPoints: [
        'AI infrastructure investments',
        'Biotech and life sciences',
        'Defense and aerospace',
        'Space technology (SpaceX)',
      ],
    },
    {
      title: 'Contrarian Bets',
      content: `Founders Fund is known for contrarian investments—betting on technologies and founders that others overlook or dismiss.`,
      bulletPoints: [
        'Generational company building',
        'Technologies others dismiss',
        'Long-term transformational potential',
      ],
    },
    {
      title: 'Alternative Energy & Nuclear',
      content: `Recent investments highlight interest in alternative energy and nuclear technology as critical infrastructure for AI and beyond.`,
      bulletPoints: [
        'Nuclear energy investments',
        'Alternative energy infrastructure',
        'AI power requirements',
      ],
    },
    {
      title: 'Late-Stage Growth',
      content: `The third growth fund focuses on concentrated late-stage bets, with approximately $460 million per company across 10 portfolio companies.`,
      bulletPoints: [
        '$4.6B growth fund',
        'Concentrated portfolio strategy',
        '~$460M per company',
        '10 portfolio companies target',
      ],
    },
  ],

  hasRFSProblems: false,
  tags: ['Defense', 'Space', 'AI', 'Biotech', 'Energy'],
  themeCount: 4,
}
