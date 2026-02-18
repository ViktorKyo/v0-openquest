import type { VCThesis } from './index'

export const ycSpring2026Thesis: VCThesis = {
  slug: 'yc-spring-2026',
  vcName: 'Y Combinator',
  vcShortName: 'YC',

  year: 2026,
  quarter: 'Spring 2026',
  publishedAt: '2026-01-15',

  title: 'Requests for Startups',
  subtitle: 'Problems YC wants founders to solve in Spring 2026',
  brandColor: '#F26625',

  sourceUrl: 'https://www.ycombinator.com/rfs',
  sourceName: 'Y Combinator RFS',

  summary: `Y Combinator's Request for Startups (RFS) is their tradition of sharing ideas they want founders to tackle. The Spring 2026 batch focuses heavily on AI-native companies—where AI is the foundation, not just a feature. Removing AI would mean the business couldn't exist.

The thesis is clear: we're past the experimentation phase. AI is now the base layer for new companies. YC is looking for founders who understand this shift and are building accordingly.

Key themes include AI for product management, AI-native hedge funds, AI-powered agencies, stablecoin financial services, government AI tools, and real-time AI guidance for physical work.`,

  sections: [
    {
      title: 'AI for Product Management',
      content: `As AI coding agents handle implementation, the bottleneck shifts to deciding what to build. YC wants tools that analyze customer data, propose features, and generate specs that coding agents can execute.

The vision: upload customer interviews and product usage data, then ask "What should we build next?" The system would analyze patterns across thousands of customer interactions, propose features with AI-generated mockups, and break down work into tasks for coding agents.`,
      bulletPoints: [
        'Analyze customer interviews and usage patterns',
        'Generate feature proposals with mockups',
        'Create executable specifications for coding agents',
        'Replace traditional PRDs and Figma mocks',
      ],
      relatedProblemIds: ['yc-rfs-19'],
    },
    {
      title: 'AI-Native Hedge Funds',
      content: `The hedge funds of the future won't bolt AI onto existing strategies—they'll use AI agents to discover entirely new ones. YC sees an opportunity for funds built entirely around AI agents that analyze market data and execute trades autonomously.

Traditional funds are retrofitting AI onto existing processes. AI-native funds will be built from scratch around what AI does best: reading every filing in real-time, synthesizing research across the firm, and executing on insights in milliseconds.`,
      bulletPoints: [
        'AI agents analyzing all SEC filings in real-time',
        'Synthesis across analyst ideas to spot patterns',
        'Autonomous execution on market insights',
        '$4.5 trillion hedge fund market opportunity',
      ],
      relatedProblemIds: ['yc-rfs-20'],
    },
    {
      title: 'AI-Powered Agencies',
      content: `Instead of selling AI tools to agencies, become the agency. Use AI to deliver design, advertising, legal, and consulting services with software-like margins (70-80%) instead of traditional agency margins (20-30%).

The insight: when you sell software, you compete on features and price. When you sell outcomes, you compete on results. Customers don't want AI tools—they want their problems solved.`,
      bulletPoints: [
        'Design firms producing custom work without designers',
        'Ad agencies creating thousands of personalized videos',
        'Law firms generating contracts in hours, not weeks',
        'Software margins (70-80%) on service revenue',
      ],
      relatedProblemIds: ['yc-rfs-21'],
    },
    {
      title: 'Stablecoin Financial Services',
      content: `Stablecoins sit in the regulatory sweet spot between DeFi chaos and TradFi bureaucracy. The GENIUS Act and CLARITY Act are creating clear compliance pathways for stablecoin businesses.

The application layer is wide open: yield-bearing accounts, cross-border B2B payments that settle in minutes, tokenized real-world assets, and merchant infrastructure for stablecoin commerce.`,
      bulletPoints: [
        'Yield-bearing stablecoin savings products',
        'Cross-border payments settling in minutes vs days',
        'Tokenized access to bonds and treasuries',
        '$150T cross-border B2B payments market',
      ],
      relatedProblemIds: ['yc-rfs-22'],
    },
    {
      title: 'AI Tools for Government',
      content: `Government agencies receive digital submissions, print them out, and have humans manually enter data. This is about to get much worse as agencies face unprecedented surges in applications. They desperately need AI tools but can't build them internally.

The opportunity: form processing at scale, fraud detection across millions of submissions, backlog clearing, and citizen-facing chatbots. Once you're in, you're in for decades.`,
      bulletPoints: [
        'Automated form processing without human intervention',
        'Pattern recognition for fraud detection',
        'Tools to work through years of accumulated applications',
        'Government customers are incredibly sticky',
      ],
      relatedProblemIds: ['yc-rfs-23'],
    },
    {
      title: 'Software-Defined Metal Mills',
      content: `American metal mills have 8-30 week lead times because they optimize for tonnage, not speed. The software and automation is decades old. Modern mills need AI-driven production planning, real-time visibility, and automation that reduces changeover time from hours to minutes.

The CHIPS Act and reshoring movement are driving massive investment in American manufacturing, but the software hasn't kept up.`,
      bulletPoints: [
        'AI-driven production planning for throughput AND speed',
        'Real-time MES visibility across production lines',
        'Robotic systems reducing changeover time',
        'Smart grid integration for energy optimization',
      ],
      relatedProblemIds: ['yc-rfs-24'],
    },
    {
      title: 'AI Guidance for Physical Work',
      content: `Training a new HVAC technician takes 6-24 months. But what if they could be productive on day one with an AI expert in their ear, seeing what they see, guiding every step?

Multimodal AI can now identify equipment from photos, read model numbers, and understand spatial relationships. Combined with smartphones and AR glasses, this enables real-time expert guidance at scale.`,
      bulletPoints: [
        'Real-time voice guidance through AirPods',
        'Computer vision identifying equipment and issues',
        'Day-one productivity instead of months of training',
        '$50B+ field service market opportunity',
      ],
      relatedProblemIds: ['yc-rfs-25'],
    },
  ],

  hasRFSProblems: true,
  rfsPageUrl: '/yc-rfs',
  tags: ['AI', 'Fintech', 'Government', 'Manufacturing', 'Healthcare'],
  problemCount: 10,
  themeCount: 7,
}
