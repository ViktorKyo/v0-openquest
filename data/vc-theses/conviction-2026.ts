import type { VCThesis } from './index'

export const conviction2026Thesis: VCThesis = {
  slug: 'conviction-2026',
  vcName: 'Conviction',
  vcShortName: 'Conviction',

  year: 2026,
  publishedAt: '2026-01-15',

  title: 'Plausible AI Schemes',
  subtitle: '26 problems Conviction wants founders to solve',
  brandColor: '#6366F1',

  sourceUrl: 'https://www.conviction.com/startups',
  sourceName: 'Conviction Startups',

  summary: `Conviction, founded by Sarah Guo (formerly Greylock), is a venture firm purpose-built for AI-Native "Software 3.0" companies. Their "Plausible AI Schemes" is a collection of 26 specific problems they believe are ripe for AI-native solutions.

The 2026 theme is "Year of the Agent Harness"—transitioning from "AI talkers" to "AI doers." The focus is on building infrastructure that allows AI agents to operate reliably and autonomously in production environments.

Key insight: Many existing beliefs about markets don't make sense anymore because AI changes technology so fundamentally. Conviction believes we can't trust previous assumptions—it takes work to find new truths.`,

  sections: [
    {
      title: 'The Recipe: AI Application Framework',
      content: `AGI is increasingly an operational challenge of bringing tasks under distribution using reasoning models with tool access. The winners won't just have better models—they'll have better operational systems for deploying AI at scale.`,
      bulletPoints: [
        'Scaling complex cognitive work across domains',
        'Combining reasoning models with tool access',
        'Building reliable, production-ready AI systems',
      ],
      relatedProblemIds: ['conviction-1'],
    },
    {
      title: 'Machine Verified Trades',
      content: `Years are required to train novices in electrician, HVAC, and solar installation roles. The opportunity: build a full-stack services company combining minimally trained workers with AI guidance systems, AR hardware, and remote expert oversight. Don't sell software to trade companies—become the trade company.`,
      bulletPoints: [
        'Workers productive in weeks instead of years',
        'AI guidance with real-time instructions',
        'AR hardware overlaying procedures',
        'Full margin capture through vertical integration',
      ],
      relatedProblemIds: ['conviction-2'],
    },
    {
      title: 'The OfficeVerse: Agent Training',
      content: `Agents trained on games and simulations lack real-world enterprise complexity. Build multi-agent simulations reflecting actual office communication (Slack, video calls, file sharing) for training domain-generalist work agents.`,
      bulletPoints: [
        'Multi-threaded Slack and email simulations',
        'Document workflow and approval chains',
        'Organizational hierarchy dynamics',
        'Realistic task completion scenarios',
      ],
      relatedProblemIds: ['conviction-3'],
    },
    {
      title: 'Enterprise Reasoning Infrastructure',
      content: `Large enterprises lack unified reasoning systems and integration hubs for AI actions. Build a live enterprise ontology mapping plus centralized action registry for AI execution across legacy systems.`,
      bulletPoints: [
        'Continuously updated entity and relationship maps',
        'Centralized action registry with access control',
        'Connectors exposing legacy capabilities uniformly',
        'Audit trails for all AI actions',
      ],
      relatedProblemIds: ['conviction-4'],
    },
    {
      title: 'Vertical Robotics: Data In, Work Out',
      content: `Healthcare faces repetitive, time-sensitive supply and sample movement between departments. Deploy robots that generate revenue while collecting deployment data for continuous improvement. Pick a specific vertical, deploy robots that create immediate value, and use the data to build an insurmountable advantage.`,
      bulletPoints: [
        'Immediate revenue from day one',
        'Proprietary deployment data collection',
        'Continuous improvement loop',
        'Healthcare logistics as ideal starting point',
      ],
      relatedProblemIds: ['conviction-5'],
    },
    {
      title: 'Biological Needle in a Haystack',
      content: `Drug development has single-digit clinical trial success rates despite improved molecular design. Use models like single-cell perturbation datasets to "pull forward" clinical risk to pre-clinical settings.`,
      bulletPoints: [
        'Single-cell perturbation data for prediction',
        'Organoid models for complex tissue testing',
        'Patient-derived systems for individual response',
        'Multi-omics integration for better predictions',
      ],
      relatedProblemIds: ['conviction-6'],
    },
    {
      title: 'Enterprise Vibe Coding',
      content: `Consumer no-code tools lack enterprise features like access control, integrations, and compliance. Build an enterprise-specific application builder with business-oriented templates and security features.`,
      bulletPoints: [
        'Security-first architecture from day one',
        'Pre-built enterprise system integrations',
        'Compliance automation and audit trails',
        'Business templates for common use cases',
      ],
      relatedProblemIds: ['conviction-7'],
    },
    {
      title: 'IT Visibility Revolution',
      content: `50% of CMDB data is unreliable, contributing to over 60% of IT incidents caused by misconfigurations. Build agentless discovery, graph construction, and AI reasoning for robust enterprise IT visibility.`,
      bulletPoints: [
        'Agentless discovery without installing anything',
        'Automatic dependency graph construction',
        'AI reasoning for impact prediction',
        'Continuous updates as environment changes',
      ],
      relatedProblemIds: ['conviction-8'],
    },
    {
      title: 'AI Hardware Alternatives',
      content: `Nvidia dominance in AI chip market limits competition and supply options. Build alternative chip solutions including TPUs, reconfigurable architectures, and latency-optimized inference hardware.`,
      bulletPoints: [
        'Application-specific chips for workloads',
        'FPGAs and reconfigurable architectures',
        'Inference-optimized low-latency hardware',
        'Edge deployment alternatives',
      ],
      relatedProblemIds: ['conviction-10'],
    },
    {
      title: 'Production-Ready 3D Generation',
      content: `Generated 3D models lack precision needed for manufacturing and construction applications. Combine generative models with validation and simulation for production-ready 3D assets.`,
      bulletPoints: [
        'Dimensional tolerance constraints',
        'Manufacturability checking',
        'Physics simulation validation',
        'CAD-compatible output formats',
      ],
      relatedProblemIds: ['conviction-11'],
    },
    {
      title: 'AI-Powered Metadata Management',
      content: `Manual metadata collection is painful and incomplete; legacy catalogs poorly support unstructured data. Build AI-driven classification, policy application, quality detection, and lineage understanding for modern data stacks.`,
      bulletPoints: [
        'Automatic data classification',
        'Policy and compliance automation',
        'Data quality detection',
        'Lineage and provenance tracking',
      ],
      relatedProblemIds: ['conviction-12'],
    },
    {
      title: 'Ownership is the New Sales',
      content: `Fragmented industries like HOAs, BPOs, and accounting firms are slow to adopt AI tools. Acquire and operate underinvested businesses directly rather than selling into them.`,
      bulletPoints: [
        'Acquire instead of sell into fragmented markets',
        'Implement AI operations post-acquisition',
        'Roll up industries with tech advantage',
        'Capture full value, not just software fees',
      ],
      relatedProblemIds: ['conviction-13'],
    },
  ],

  hasRFSProblems: true,
  rfsPageUrl: undefined, // Could create a dedicated page
  tags: ['AI', 'Enterprise', 'Healthcare', 'Robotics', 'Infrastructure'],
  problemCount: 26,
  themeCount: 12,
}
