import type { VCThesis } from './index'

export const sequoia2025Thesis: VCThesis = {
  slug: 'sequoia-2025',
  vcName: 'Sequoia Capital',
  vcShortName: 'Sequoia',

  year: 2025,
  publishedAt: '2025-10-27',

  title: 'Investment Thesis 2025',
  subtitle: 'Backing the next Amazon of the AI era',
  brandColor: '#00A36C',

  sourceUrl: 'https://sequoiacap.com/',
  sourceName: 'Sequoia Capital',

  summary: `Sequoia Capital's investment thesis remains unchanged: pursuing "outlier founders with ideas to build generational businesses." In October 2025, the firm announced two new funds totaling $950 million—a $750 million early-stage fund targeting Series A startups and a $200 million seed fund.

Sequoia sees a multi-trillion dollar opportunity for commerce in AI and hopes to back the next Amazon for the AI era. Voice AI went mainstream in 2025, with many industries based on phone calls still waiting for AI solutions. The firm also sees significant potential in digital asset solutions for regulated financial institutions.`,

  sections: [
    {
      title: 'AI Infrastructure & Applications',
      content: `Sequoia is heavily focused on early-stage AI companies, including security testing (Xbow), AI reliability (Traversal), and open-source alternatives (Reflection AI).`,
      bulletPoints: [
        'Early-stage AI company investments',
        'AI reliability and testing infrastructure',
        'Open-source AI alternatives',
        'Security-focused AI applications',
      ],
    },
    {
      title: 'Commerce in the AI Era',
      content: `Sequoia sees a multi-trillion dollar opportunity for commerce in AI. The firm hopes to back the next Amazon for the AI era—companies that fundamentally reimagine how commerce works with AI at the core.`,
      bulletPoints: [
        'Multi-trillion dollar commerce opportunity',
        'AI-native commerce platforms',
        'The next Amazon built on AI',
      ],
    },
    {
      title: 'Voice AI',
      content: `Voice AI went mainstream in 2025. Many industries based on phone calls are still waiting for AI solutions, including the financial services industry.`,
      bulletPoints: [
        'Voice AI reaching mainstream adoption',
        'Financial services phone automation',
        'Customer service transformation',
        'Voice-first business applications',
      ],
    },
    {
      title: 'Digital Assets & Financial Services',
      content: `New regulations in the US and Europe mean financial institutions can now buy and sell cryptocurrency products to customers. Sequoia sees potential in providing digital asset solutions to regulated financial institutions.`,
      bulletPoints: [
        'Digital asset solutions for institutions',
        'Regulatory-compliant crypto products',
        'Enterprise crypto infrastructure',
      ],
    },
  ],

  hasRFSProblems: false,
  tags: ['AI', 'Commerce', 'Voice', 'Crypto', 'Enterprise'],
  themeCount: 4,
}
