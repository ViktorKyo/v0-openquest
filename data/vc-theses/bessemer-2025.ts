import type { VCThesis } from './index'

export const bessemer2025Thesis: VCThesis = {
  slug: 'bessemer-2025',
  vcName: 'Bessemer Venture Partners',
  vcShortName: 'Bessemer',

  year: 2025,
  publishedAt: '2025-10-01',

  title: 'Roadmap Investment Thesis',
  subtitle: 'Deep roadmaps across AI, defense, and services',
  brandColor: '#1E40AF',

  sourceUrl: 'https://www.bvp.com/atlas',
  sourceName: 'Bessemer Atlas',

  summary: `Bessemer's approach focuses on conviction over consensus, with partners developing deep, long-term roadmaps in areas like cloud, healthcare, and AI rather than chasing trends. The firm has invested more than $1 billion into AI startups across nine roadmap categories.

In 2025, Bessemer launched two new funds: $1 billion for BVP Forge II and $350 million for their second India fund. Their European Resilience Roadmap focuses on defense, space sovereignty, and advanced manufacturing.`,

  sections: [
    {
      title: 'AI-Native Roadmap',
      content: `Bessemer announced its commitment to backing AI-Native founders everywhere. The firm has invested more than $1 billion into AI startups across nine categories.`,
      bulletPoints: [
        'Data and cloud infrastructure',
        'Vertical SaaS applications',
        'Horizontal SaaS platforms',
        'Developer platforms and tools',
        'Fintech, healthcare, deep tech',
        'Consumer and cybersecurity AI',
      ],
    },
    {
      title: 'European Resilience Roadmap',
      content: `Five core investment domains define future resilience: physical autonomy, aerial defence, command and control, space sovereignty, and advanced manufacturing.`,
      bulletPoints: [
        'Physical autonomy systems',
        'Aerial defense technology',
        'Command and control infrastructure',
        'Space sovereignty solutions',
        'Advanced additive manufacturing',
        'Critical materials independence',
      ],
    },
    {
      title: 'AI Services Roadmap',
      content: `Bessemer revealed their thesis on how AI-native companies will disrupt India's $264 billion IT services sector.`,
      bulletPoints: [
        'IT services sector disruption',
        'AI-native service delivery',
        '$264B market opportunity',
        'Automation of professional services',
      ],
    },
    {
      title: 'Sector-Specific Deep Dives',
      content: `Bessemer develops thesis-driven roadmaps for specific sectors, spending years developing expertise before making investments.`,
      bulletPoints: [
        'Healthcare transformation',
        'Fintech infrastructure',
        'Cybersecurity evolution',
        'Developer tools and platforms',
      ],
    },
  ],

  hasRFSProblems: false,
  tags: ['AI', 'Defense', 'Healthcare', 'Fintech', 'Enterprise'],
  themeCount: 9,
}
