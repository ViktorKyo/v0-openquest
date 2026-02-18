import type { VCThesis } from './index'

export const a16z2026Thesis: VCThesis = {
  slug: 'a16z-2026',
  vcName: 'Andreessen Horowitz',
  vcShortName: 'a16z',

  year: 2026,
  publishedAt: '2025-12-15',

  title: 'Big Ideas 2026',
  subtitle: 'What a16z partners are excited to fund',
  brandColor: '#000000',

  sourceUrl: 'https://a16z.com/big-ideas-in-tech-2025/',
  sourceName: 'a16z Big Ideas',

  summary: `Andreessen Horowitz's "Big Ideas" series captures what their partners are most excited to fund. The 2026 edition reveals a clear shift: AI is moving from experimentation to production. It's no longer a separate project—it's the foundation of everything.

Two major themes emerge: renewed interest in the physical world after two decades of digital product dominance, and the transition from interfaces designed for humans to systems optimized for AI agents.

a16z raised a record-breaking $15 billion across five funds in January 2026, with $3.5 billion dedicated to AI applications. They're betting big on this thesis.`,

  sections: [
    {
      title: 'American Dynamism',
      content: `a16z believes the physical world is coming back into focus. Nuclear energy is resurging driven by AI data center demand. Space technology is enabling data centers and biomedical labs in microgravity. Defense systems are becoming decentralized with edge-based autonomous drones.

Key opportunities include nuclear power infrastructure, hardware-software integration for autonomous systems, and earth observation commercialization.`,
      bulletPoints: [
        'Nuclear energy for AI data center power demands',
        'Space technology enabling orbital infrastructure',
        'Decentralized defense with autonomous systems',
        'Robot data infrastructure at scale',
        'Free-space optical communications',
        'XR development for physical world applications',
      ],
    },
    {
      title: 'Bio + Health',
      content: `The success of GLP-1 drugs shows what's possible when breakthrough therapies reach big markets. a16z is looking for startups targeting common diseases—cardiometabolic, autoimmune, neurological—using engineered cell therapies and novel modalities.

Consumer health tech is democratizing access through AI-powered analysis, wearables, and accessible full-body screening. Healthcare AI can serve as "super staffing" to address workforce shortages.`,
      bulletPoints: [
        'Common disease therapeutics (post-GLP-1 playbook)',
        'Consumer health tech democratizing access',
        'Healthcare AI as specialist staffing',
        'Drug target discovery acceleration',
        'AI analyzing blood biomarkers and wearables',
      ],
    },
    {
      title: 'Consumer Tech',
      content: `Real-time AI applications are emerging: live video-to-video generation, AI bandmates, interactive educational tools. Specialized video generation is being optimized for specific use cases—product marketing, cinematic film, hyperrealistic avatars.

The "personal AI brain" concept is gaining traction: apps that convert digital exhaust (messages, emails, tweets) into personalized decision-making and memory tools.`,
      bulletPoints: [
        'Real-time AI for live video-to-video generation',
        'Specialized video models for specific use cases',
        'Personal AI systems for memory and decisions',
        'Qualitative data analytics merging unstructured data',
        'Personalized knowledge work that sounds like you',
      ],
    },
    {
      title: 'Crypto & Web3',
      content: `AI agents need economic infrastructure. a16z sees opportunities in enabling autonomous AI entities to custody wallets and transact across decentralized networks independently.

Sybil resistance and identity verification are critical as deepfakes proliferate. Stablecoin payment infrastructure is ready for enterprise adoption. DAOs are getting proper legal frameworks through DUNA structures.`,
      bulletPoints: [
        'AI agent economics and autonomous transactions',
        'Sybil resistance for proof-of-personhood',
        'Stablecoin enterprise payment infrastructure',
        'DAO legal frameworks (DUNA structures)',
        'Liquid democracy platforms for governance',
        'Asset tokenization including biometric data',
      ],
    },
    {
      title: 'Enterprise + Fintech',
      content: `AI won't truly transform financial services until we rebuild the infrastructure. a16z is looking for regulation-as-code systems that automate compliance, AI-powered systems that replace legacy CRM and ERP, and defensible AI products with real moats.

The winning companies build "data-to-action" platforms—AI that not only captures data but suggests and executes actions.`,
      bulletPoints: [
        'Regulation-as-code automating compliance',
        'AI replacing legacy Salesforce and Workday',
        'Defensible AI with network effects and switching costs',
        'Data-to-action platforms with execution capabilities',
        'AI-powered service consolidation (vertical rollups)',
        'White-collar AI copilots for specific roles',
      ],
    },
  ],

  hasRFSProblems: false,
  tags: ['AI', 'Defense', 'Healthcare', 'Crypto', 'Enterprise', 'Consumer'],
  themeCount: 14,
}
