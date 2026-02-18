import type { VCThesis } from './index'

export const pathlight2026Thesis: VCThesis = {
  slug: 'pathlight-2026',
  vcName: 'Pathlight Ventures',
  vcShortName: 'Pathlight',

  year: 2026,
  publishedAt: '2026-02-01',

  title: 'Request for Startups 2026',
  subtitle: '9 focus areas for B2B founders',
  brandColor: '#10B981',

  sourceUrl: 'https://www.pathlight.vc/theses',
  sourceName: 'Pathlight Theses',

  summary: `Pathlight Ventures is a seed-stage VC investing in B2B software, focusing on companies that serve SMBs and mid-market enterprises. Their 2026 RFS covers nine distinct problem areas spanning infrastructure, AI systems, hardware, financial services, security, government operations, and healthcare modernization.

The firm has published multiple RFS documents including focus areas on Voice AI as an Operating System, State and Local Government Modernization, and AI-Native Systems Integration.`,

  sections: [
    {
      title: 'AI-Native Systems Integrator',
      content: `Build the next generation of systems integrators that leverage AI to deliver faster, cheaper, and better implementations than traditional consulting firms.`,
      bulletPoints: [
        'AI-powered implementation and integration',
        'Faster delivery than traditional consultants',
        'Scalable expertise through AI augmentation',
      ],
    },
    {
      title: 'Vertical Hardware & Applied Robotics',
      content: `Deploy purpose-built hardware and robotics solutions in specific verticals where automation can deliver immediate ROI.`,
      bulletPoints: [
        'Purpose-built hardware for specific industries',
        'Robotics with immediate deployment value',
        'Data collection for continuous improvement',
      ],
    },
    {
      title: 'Capital Markets Infrastructure',
      content: `Modernize the plumbing of financial markets with better data, faster execution, and improved transparency.`,
      bulletPoints: [
        'Digitizing financial systems',
        'Real-time settlement infrastructure',
        'B2B financial transparency tools',
      ],
    },
    {
      title: 'Agentic AdTech',
      content: `Build AI-native advertising technology that can autonomously optimize campaigns, create content, and target audiences.`,
      bulletPoints: [
        'Autonomous campaign optimization',
        'AI-generated ad creative at scale',
        'Intelligent audience targeting',
      ],
    },
    {
      title: 'Energy, Utilities & Built Environment',
      content: `Next-generation solutions for energy management, utility operations, and building efficiency.`,
      bulletPoints: [
        'Smart grid management',
        'Building automation and efficiency',
        'Renewable energy optimization',
      ],
    },
    {
      title: 'Security Infrastructure',
      content: `Security solutions spanning physical, cyber, and critical infrastructure protection.`,
      bulletPoints: [
        'Physical security modernization',
        'Cybersecurity for SMBs via MSPs',
        'Critical infrastructure protection',
      ],
    },
    {
      title: 'Government & Public Safety',
      content: `Digital modernization of government operations and public safety systems.`,
      bulletPoints: [
        'State and local government modernization',
        'Public safety technology',
        'Citizen service automation',
      ],
    },
    {
      title: 'Healthcare Stack Modernization',
      content: `Rebuild the modern healthcare technology stack from the ground up.`,
      bulletPoints: [
        'Healthcare operations efficiency',
        'Patient communication automation',
        'Clinical workflow optimization',
      ],
    },
    {
      title: 'Voice AI as an Operating System',
      content: `Build voice-first interfaces that can handle complex business workflows and transactions.`,
      bulletPoints: [
        'Voice-based transactional systems',
        'Call handling for SMBs',
        'Natural language business automation',
      ],
    },
  ],

  hasRFSProblems: true,
  rfsPageUrl: undefined,
  tags: ['B2B', 'SMB', 'AI', 'Healthcare', 'Government', 'Security'],
  problemCount: 9,
  themeCount: 9,
}
