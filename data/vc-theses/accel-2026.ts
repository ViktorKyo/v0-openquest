import type { VCThesis } from './index'

export const accel2026Thesis: VCThesis = {
  slug: 'accel-2026',
  vcName: 'Accel',
  vcShortName: 'Accel',

  year: 2026,
  publishedAt: '2026-02-01',
  asOfDate: '2026-02-14',

  title: 'Investment Focus 2026',
  subtitle: 'AI-first products with speed, distribution, and durable category ownership',
  brandColor: '#0F766E',

  sourceUrl: 'https://atoms.accel.com/',
  sourceName: 'Atoms by Accel',
  evidenceLinks: [
    { label: 'Atoms by Accel', url: 'https://atoms.accel.com/' },
    { label: 'Atoms India', url: 'https://atoms.accel.com/india' },
    { label: 'Accel Growth Fund 7', url: 'https://www.accel.com/noteworthies/accel-growth-fund-7-disciplined-ambition' },
  ],
  engagementUrl: 'https://atoms.accel.com/apply',
  engagementLabel: 'Apply to Accel Atoms',

  summary: `Accel's 2026 signal combines broad AI conviction with explicit founder application pathways via Atoms. The firm continues to prioritize startups with clear wedge markets, strong velocity, and potential to own enduring software categories.`,

  sections: [
    {
      title: 'Applied AI with Immediate Utility',
      content: 'Accel favors products where AI directly improves core user outcomes and time-to-value.',
      bulletPoints: [
        'Workflow-first AI adoption',
        'Rapid deployment with measurable ROI',
        'Clear path from early traction to expansion',
      ],
    },
    {
      title: 'Founder Velocity and Execution',
      content: 'Execution speed and iteration quality remain central to early-stage selection.',
      bulletPoints: [
        'Fast product iteration loops',
        'Early evidence of user pull',
        'Strong founder-market fit',
      ],
    },
    {
      title: 'Platform-Grade Market Opportunities',
      content: 'Accel continues to back markets where early products can expand into system-level platforms.',
      bulletPoints: [
        'Large adjacent workflow surfaces',
        'Data and distribution compounding',
        'Long-term category ownership potential',
      ],
    },
    {
      title: 'What Changed in 2026',
      content: 'The firm sharpened founder intake through Atoms and increased emphasis on AI-native GTM speed.',
      bulletPoints: [
        'More explicit founder call channels',
        'Higher bar for product velocity',
        'Greater focus on AI-native distribution leverage',
      ],
    },
  ],

  hasRFSProblems: false,
  tags: ['AI', 'Enterprise', 'B2B', 'Infrastructure'],
  themeCount: 4,
}
