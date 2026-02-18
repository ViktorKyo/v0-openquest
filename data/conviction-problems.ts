/**
 * Conviction's Plausible AI Schemes - Problem Library
 * Source: https://www.conviction.com/startups
 * Last Updated: February 2026
 */

export interface ConvictionProblem {
  id: string
  title: string
  elevatorPitch: string
  fullDescription: string
  category: string
  industryTags: string[]
  publishedDate: string
  originalUrl: string
}

export const convictionProblems: ConvictionProblem[] = [
  {
    id: "conviction-1",
    title: "Use the Recipe: AI Application Framework",
    elevatorPitch:
      "AGI is increasingly an operational challenge of bringing tasks under distribution. Build AI applications that scale complex work across domains using reasoning models and tool access.",
    fullDescription: `## The Problem

As AI models become more capable, the challenge shifts from building smarter models to deploying them effectively. "AGI" is increasingly an operational challenge—how do you bring complex tasks under distribution using reasoning models with tool access?

## The Opportunity

The companies that master this "recipe" will be able to:
- Scale complex cognitive work across any domain
- Combine reasoning models with appropriate tool access
- Build reliable, production-ready AI systems

## Key Insight

The winners won't just have better models—they'll have better operational systems for deploying AI at scale.`,
    category: "ai-infrastructure",
    industryTags: ["AI", "Infrastructure", "Developer Tools"],
    publishedDate: "2026-01-15",
    originalUrl: "https://www.conviction.com/startups",
  },
  {
    id: "conviction-2",
    title: "Machine Verified Trades",
    elevatorPitch:
      "Years are required to train novices in electrician, HVAC, and solar installation roles. Build a full-stack services company combining minimally trained workers with AI guidance systems, AR hardware, and remote expert oversight.",
    fullDescription: `## The Problem

The skilled trades face a severe labor shortage. Training a new electrician or HVAC technician takes years, but demand for these workers is exploding due to data center buildouts, solar installations, and infrastructure modernization.

## The Solution

Build a full-stack services company that combines:
- **Minimally trained workers** who can start productive work in weeks, not years
- **AI guidance systems** that provide real-time instructions and quality verification
- **AR hardware** that overlays instructions and checklists onto the physical work environment
- **Remote expert oversight** for complex decisions and quality assurance

## The Business Model

Instead of selling software to trade companies, become the trade company. Capture the full margin while proving the model works.

## Market Size

The skilled trades market is massive—HVAC alone is $150B+ annually. Labor costs are the primary constraint on growth.`,
    category: "future-of-work",
    industryTags: ["Skilled Trades", "AI", "AR/VR", "Workforce"],
    publishedDate: "2026-01-15",
    originalUrl: "https://www.conviction.com/startups",
  },
  {
    id: "conviction-3",
    title: "The OfficeVerse: AI Agent Training Environments",
    elevatorPitch:
      "Agents trained on games and simulations lack real-world enterprise complexity. Build multi-agent simulations reflecting actual office communication (Slack, video calls, file sharing) for training domain-generalist work agents.",
    fullDescription: `## The Problem

Today's AI agents are trained in simplified environments—games, toy benchmarks, synthetic scenarios. But enterprise work involves:
- Multi-threaded conversations across Slack, email, and video calls
- Complex file sharing and document collaboration
- Organizational hierarchies and implicit social dynamics
- Ambiguous goals and shifting priorities

Agents trained on games fail when deployed in real offices.

## The Solution

Build "The OfficeVerse"—a multi-agent simulation environment that faithfully recreates:
- **Communication patterns**: Slack channels, email threads, video meetings with realistic latency and interruptions
- **Document workflows**: Shared drives, version control, approval chains
- **Organizational dynamics**: Reporting structures, meeting rhythms, stakeholder management
- **Realistic tasks**: Expense reports, project planning, vendor negotiations

## The Opportunity

The company that builds the best training environment for enterprise AI agents will have a moat. Every enterprise AI company will need to train on realistic office simulations.`,
    category: "ai-infrastructure",
    industryTags: ["AI", "Enterprise", "Simulation", "Training"],
    publishedDate: "2026-01-15",
    originalUrl: "https://www.conviction.com/startups",
  },
  {
    id: "conviction-4",
    title: "Reasoning Infrastructure for Companies",
    elevatorPitch:
      "Large enterprises lack unified reasoning systems and integration hubs for AI actions. Build a live enterprise ontology mapping plus centralized action registry for AI execution across legacy systems.",
    fullDescription: `## The Problem

Enterprises want to deploy AI across their operations, but they face fundamental infrastructure challenges:
- **Fragmented systems**: Dozens of disconnected enterprise applications
- **No shared understanding**: Different systems use different data models and terminology
- **Action complexity**: Taking action across systems requires complex integration work
- **Audit requirements**: Every AI action needs to be traceable and reversible

## The Solution

Build the reasoning infrastructure layer for enterprises:
- **Live enterprise ontology**: A continuously updated map of all entities, relationships, and business logic across systems
- **Centralized action registry**: A catalog of every action AI can take, with proper access control and audit trails
- **Integration hub**: Connectors to legacy systems that expose capabilities in a unified way
- **Reasoning layer**: The infrastructure for AI to understand context and take coordinated action

## Why This Matters

Without this infrastructure, every AI project becomes a custom integration nightmare. With it, enterprises can deploy AI agents that actually work.`,
    category: "ai-infrastructure",
    industryTags: ["AI", "Enterprise", "Infrastructure", "Integration"],
    publishedDate: "2026-01-15",
    originalUrl: "https://www.conviction.com/startups",
  },
  {
    id: "conviction-5",
    title: "Vertical Robotics: Data In, Work Out",
    elevatorPitch:
      "Healthcare faces repetitive, time-sensitive supply and sample movement between departments. Deploy robots that generate revenue while collecting deployment data for continuous improvement.",
    fullDescription: `## The Problem

Hospitals and healthcare facilities have massive amounts of repetitive logistics work:
- Moving supplies between departments
- Transporting lab samples for analysis
- Delivering medications to patient floors
- Managing inventory across locations

This work is time-sensitive, error-prone, and consumes expensive clinical staff time.

## The Strategy

Deploy robots that:
1. **Generate immediate revenue** by performing valuable work from day one
2. **Collect deployment data** from every task, building a proprietary dataset
3. **Continuously improve** using that data to handle more complex scenarios
4. **Expand scope** as capabilities improve, taking on adjacent tasks

## The Insight

Most robotics companies focus on building general-purpose robots. The better approach: pick a specific vertical, deploy robots that create immediate value, and use the deployment data to build an insurmountable advantage.

## Why Healthcare

Healthcare logistics is:
- Highly repetitive (same routes, same tasks)
- Time-sensitive (creates urgency to automate)
- Well-funded (hospitals can pay for solutions)
- Data-rich (every run generates valuable training data)`,
    category: "world-of-atoms",
    industryTags: ["Robotics", "Healthcare", "Logistics", "AI"],
    publishedDate: "2026-01-15",
    originalUrl: "https://www.conviction.com/startups",
  },
  {
    id: "conviction-6",
    title: "A Biological Needle in a Haystack",
    elevatorPitch:
      "Drug development has single-digit clinical trial success rates despite improved molecular design. Use models like single-cell perturbation datasets to 'pull forward' clinical risk to pre-clinical settings.",
    fullDescription: `## The Problem

Despite massive improvements in molecular design and drug discovery, clinical trial success rates remain in the single digits. The problem isn't finding molecules—it's predicting which molecules will actually work in humans.

Most drugs fail not because of molecular properties, but because of:
- Unexpected toxicity
- Lack of efficacy in the full biological context
- Off-target effects that only appear in complex systems

## The Solution

Use emerging biological datasets to "pull forward" clinical risk assessment:
- **Single-cell perturbation data**: Understand how drugs affect individual cells across tissues
- **Organoid models**: Test drugs on complex 3D tissue structures
- **Patient-derived systems**: Use actual patient cells to predict individual responses
- **Multi-omics integration**: Combine genomic, proteomic, and metabolomic data

## The Opportunity

The company that can reliably predict clinical outcomes from pre-clinical data will transform drug development. Every pharma company will need this capability.

## Technical Approach

Build models that can find the "biological needle in a haystack"—the specific cellular and molecular signatures that predict clinical success or failure.`,
    category: "longevity",
    industryTags: ["Biotech", "Drug Discovery", "AI", "Healthcare"],
    publishedDate: "2026-01-15",
    originalUrl: "https://www.conviction.com/startups",
  },
  {
    id: "conviction-7",
    title: "Enterprise Vibe Coding",
    elevatorPitch:
      "Consumer no-code tools lack enterprise features like access control, integrations, and compliance. Build an enterprise-specific application builder with business-oriented templates and security features.",
    fullDescription: `## The Problem

"Vibe coding"—using AI to generate applications through natural language—works well for consumer apps. But enterprises need:
- **Access control**: Who can see what data, who can take what actions
- **Integrations**: Connect to existing enterprise systems (Salesforce, SAP, Workday)
- **Compliance**: Audit trails, data retention policies, regulatory requirements
- **Security**: SOC 2, HIPAA, data encryption, SSO

Consumer no-code tools don't support these requirements.

## The Solution

Build the enterprise-grade "vibe coding" platform:
- **Security-first architecture**: Built for enterprise requirements from day one
- **Pre-built integrations**: Connect to common enterprise systems out of the box
- **Compliance automation**: Built-in support for audit trails, retention, and regulatory requirements
- **Business templates**: Start with templates designed for enterprise use cases

## The Opportunity

Every enterprise wants to build internal tools faster. They can't use consumer no-code tools because of security and compliance requirements. The enterprise vibe coding platform fills this gap.`,
    category: "ai-infrastructure",
    industryTags: ["Enterprise", "No-Code", "AI", "Developer Tools"],
    publishedDate: "2026-01-15",
    originalUrl: "https://www.conviction.com/startups",
  },
  {
    id: "conviction-8",
    title: "IT Can't Fix What IT Can't See",
    elevatorPitch:
      "50% of CMDB data is unreliable, contributing to over 60% of IT incidents caused by misconfigurations. Build agentless discovery, graph construction, and AI reasoning for robust enterprise IT visibility.",
    fullDescription: `## The Problem

Enterprise IT teams are flying blind:
- **50% of CMDB data is unreliable** according to industry studies
- **60%+ of IT incidents** are caused by misconfigurations
- **Shadow IT** means IT doesn't even know about many systems
- **Complexity grows faster** than IT teams can document

The result: outages, security vulnerabilities, and wasted troubleshooting time.

## The Solution

Build a next-generation IT visibility platform:
- **Agentless discovery**: Find and catalog all IT assets without installing anything
- **Automatic graph construction**: Build a live map of how systems connect and depend on each other
- **AI reasoning**: Use the graph to predict impact, find root causes, and suggest fixes
- **Continuous updates**: Keep the model current as the environment changes

## Why Agentless Matters

Agent-based discovery requires deploying software to every system—which is exactly the problem IT can't solve. Agentless discovery works by analyzing network traffic, API calls, and other observable data.

## The Opportunity

IT visibility is foundational. Every IT optimization, security improvement, and incident response depends on knowing what you have.`,
    category: "ai-infrastructure",
    industryTags: ["Enterprise IT", "DevOps", "AI", "Observability"],
    publishedDate: "2026-01-15",
    originalUrl: "https://www.conviction.com/startups",
  },
  {
    id: "conviction-9",
    title: "Just Go Live",
    elevatorPitch:
      "Incumbent advantage is assumed, but datasets often don't exist in useful forms. Build the first useful product, deploy, and iterate with real customer feedback loops rather than waiting for perfect data.",
    fullDescription: `## The Insight

Many AI applications assume incumbents have insurmountable data advantages. But in practice:
- Incumbent data is often in unusable formats
- Data is siloed across departments and systems
- Historical data may not reflect current needs
- Data collection processes weren't designed for AI

## The Strategy

Instead of trying to acquire massive datasets before launching:
1. **Build the first useful product** with limited data
2. **Deploy to real customers** immediately
3. **Use customer feedback** to improve the product
4. **Collect new data** designed specifically for your AI use case

## The Advantage

The company that deploys first starts the feedback loop first. Each customer interaction provides:
- New training data
- Signal on what features matter
- Understanding of edge cases
- Validation of the business model

## Examples

This approach works particularly well when:
- Existing data is locked in legacy systems
- Data formats need to change for AI use
- User behavior will shift with new AI capabilities
- First-mover advantage compounds with data`,
    category: "moonshots",
    industryTags: ["AI", "Strategy", "Startups", "Data"],
    publishedDate: "2026-01-15",
    originalUrl: "https://www.conviction.com/startups",
  },
  {
    id: "conviction-10",
    title: "The New Datacenter",
    elevatorPitch:
      "Nvidia dominance in AI chip market limits competition and supply options. Build alternative chip solutions including TPUs, reconfigurable architectures, and latency-optimized inference hardware.",
    fullDescription: `## The Problem

The AI industry has a single point of failure: Nvidia. Their GPUs power the vast majority of AI training and inference, creating:
- **Supply constraints**: Not enough chips to meet demand
- **Pricing power**: Nvidia can charge premium prices
- **Strategic risk**: Entire AI industry dependent on one company
- **Architecture lock-in**: Everything optimized for Nvidia's approach

## The Opportunity

Build alternative chip solutions:
- **Custom TPUs**: Application-specific chips optimized for particular workloads
- **Reconfigurable architectures**: FPGAs and other flexible hardware
- **Inference optimization**: Chips designed specifically for low-latency inference
- **Edge deployment**: Hardware for running AI at the edge, not in datacenters

## Why Now

- AI demand is growing faster than Nvidia can supply
- Customers are actively seeking alternatives
- New architectures may be better for specific AI workloads
- Scale economics are increasingly viable for alternatives

## The Prize

The company that breaks Nvidia's dominance captures enormous value—not by being as good at everything, but by being better at something.`,
    category: "world-of-atoms",
    industryTags: ["Hardware", "Semiconductors", "AI", "Infrastructure"],
    publishedDate: "2026-01-15",
    originalUrl: "https://www.conviction.com/startups",
  },
  {
    id: "conviction-11",
    title: "Understanding and Generating the (3D) World",
    elevatorPitch:
      "Generated 3D models lack precision needed for manufacturing and construction applications. Combine generative models with validation and simulation for production-ready 3D assets.",
    fullDescription: `## The Problem

AI can now generate impressive 3D models, but they're not production-ready:
- **Lack precision**: Dimensions aren't exact, tolerances aren't respected
- **Not manufacturable**: Generated designs can't actually be built
- **No physics validation**: Models may not work mechanically
- **Missing metadata**: CAD systems need rich attribute data, not just geometry

This gap keeps generative 3D out of serious manufacturing and construction applications.

## The Solution

Bridge generative AI with engineering requirements:
- **Precision constraints**: Generate models that respect dimensional tolerances
- **Manufacturability checking**: Validate that designs can actually be built
- **Physics simulation**: Ensure designs work mechanically
- **CAD integration**: Output in formats engineering teams can use

## The Opportunity

Generative 3D that actually works for manufacturing would transform:
- Product design (rapid prototyping, customization)
- Construction (parametric building components)
- Industrial equipment (optimized part design)
- Consumer products (mass customization)

## Technical Approach

Combine generative models with:
- CAD kernel integration for precise geometry
- Simulation engines for physics validation
- Manufacturing constraint libraries
- Standards compliance checking`,
    category: "world-of-atoms",
    industryTags: ["3D", "Manufacturing", "CAD", "AI"],
    publishedDate: "2026-01-15",
    originalUrl: "https://www.conviction.com/startups",
  },
  {
    id: "conviction-12",
    title: "Finally, Manageable Metadata",
    elevatorPitch:
      "Manual metadata collection is painful and incomplete; legacy catalogs poorly support unstructured data. Build AI-driven classification, policy application, quality detection, and lineage understanding for modern data stacks.",
    fullDescription: `## The Problem

Enterprise data is drowning in bad metadata:
- **Manual tagging is painful**: Nobody wants to classify data by hand
- **Metadata is incomplete**: Most data has minimal or outdated descriptions
- **Unstructured data is ignored**: Legacy catalogs can't handle documents, images, videos
- **Lineage is unknown**: Where did this data come from? How was it transformed?

Without good metadata, data is hard to find, trust, or govern.

## The Solution

Build AI-powered metadata management:
- **Automatic classification**: AI that understands what data contains and how to categorize it
- **Policy application**: Automatically apply retention, access, and compliance policies
- **Quality detection**: Identify data quality issues before they cause problems
- **Lineage tracking**: Understand data provenance and transformations

## Why Now

- LLMs can understand unstructured data in ways legacy systems can't
- Data volume is growing faster than manual classification can scale
- Privacy and compliance requirements are increasing
- Modern data stacks need modern metadata management

## The Opportunity

Every enterprise needs this. The company that makes metadata finally manageable will be foundational infrastructure for data-driven organizations.`,
    category: "ai-infrastructure",
    industryTags: ["Data", "Enterprise", "AI", "Governance"],
    publishedDate: "2026-01-15",
    originalUrl: "https://www.conviction.com/startups",
  },
  {
    id: "conviction-13",
    title: "Ownership is the New Sales",
    elevatorPitch:
      "Fragmented industries like HOAs, BPOs, and accounting firms are slow to adopt AI tools. Acquire and operate underinvested businesses directly rather than selling into them.",
    fullDescription: `## The Insight

Some industries are so fragmented and slow-moving that selling software into them is nearly impossible:
- **HOA management**: Thousands of small operators, minimal tech adoption
- **BPOs**: Low margins, resistant to change
- **Accounting firms**: Conservative, partner-driven decisions
- **Property management**: Fragmented, local players

These industries won't buy AI tools—but they'll sell their businesses.

## The Strategy

Instead of building software and trying to sell it:
1. **Acquire existing businesses** in fragmented industries
2. **Implement AI operations** that dramatically improve efficiency
3. **Roll up the industry** using technology-driven competitive advantage
4. **Capture the full value** of AI transformation, not just software fees

## Why This Works

- Acquisition is easier than enterprise sales in fragmented industries
- You control the technology adoption decision
- Full margin capture (operations, not just software)
- Rollup creates additional scale advantages

## Examples

This model works for industries where:
- Average business size is small
- Technology adoption is low
- Owners are approaching retirement
- AI could dramatically improve operations`,
    category: "moonshots",
    industryTags: ["Private Equity", "AI", "Operations", "Rollups"],
    publishedDate: "2026-01-15",
    originalUrl: "https://www.conviction.com/startups",
  },
  {
    id: "conviction-14",
    title: "Automated Root Cause Analysis",
    elevatorPitch:
      "On-call engineers spend hours debugging without systematic incident analysis. Build lightweight agents that access logs and metrics to retrieve context and suggest fixes based on runbooks and prior incidents.",
    fullDescription: `## The Problem

When systems break, on-call engineers face a painful process:
- **Context gathering**: Manually pulling logs, metrics, and traces
- **Hypothesis testing**: Trying different theories about what went wrong
- **Documentation searching**: Looking through runbooks and prior incidents
- **Communication**: Keeping stakeholders informed while debugging

This takes hours and burns out engineering teams.

## The Solution

Build AI agents for incident response:
- **Automatic context gathering**: Pull relevant logs, metrics, and traces immediately
- **Pattern matching**: Compare current symptoms to prior incidents
- **Runbook integration**: Suggest relevant procedures from documentation
- **Fix recommendations**: Propose likely solutions based on similar past issues

## Key Requirements

- **Lightweight deployment**: Can't add complexity to already-stressed systems
- **Access to observability data**: Integrates with existing logging and monitoring
- **Learning from history**: Gets smarter with every incident
- **Human-in-the-loop**: Suggests but doesn't take action without approval

## The Opportunity

Every engineering team deals with incidents. The company that makes incident response dramatically faster will be adopted universally.`,
    category: "ai-infrastructure",
    industryTags: ["DevOps", "AI", "Observability", "SRE"],
    publishedDate: "2026-01-15",
    originalUrl: "https://www.conviction.com/startups",
  },
  {
    id: "conviction-15",
    title: "Your Personal Seller",
    elevatorPitch:
      "SMBs managing products across platforms (Amazon, eBay, Shopify) lack sophisticated optimization. Build AI that generates alternative product listings, A/B tests variants, creates videos, and recommends untapped audiences.",
    fullDescription: `## The Problem

Small and medium e-commerce businesses struggle to optimize their sales:
- **Manual listing management**: Updating products across Amazon, eBay, Shopify
- **No optimization**: Using the same title and images everywhere
- **No testing**: Unable to A/B test different approaches
- **Missed opportunities**: Don't know which audiences or channels to target

Large brands have teams for this. SMBs do it manually or not at all.

## The Solution

Build an AI-powered sales optimization platform:
- **Listing generation**: Create optimized titles, descriptions, and keywords for each platform
- **A/B testing**: Automatically test variants and converge on winners
- **Video creation**: Generate product videos from images and specifications
- **Audience discovery**: Identify untapped customer segments and channels

## Why AI Changes This

Previously, this level of optimization required expensive agencies or in-house teams. AI makes it accessible to any seller:
- Generate dozens of listing variants instantly
- Run continuous experiments without manual work
- Create video content without production costs
- Analyze data across platforms to find opportunities

## The Opportunity

E-commerce is enormous and growing. Most of it is SMBs who desperately need these tools but can't afford enterprise solutions.`,
    category: "creator-economy",
    industryTags: ["E-commerce", "AI", "SMB", "Marketing"],
    publishedDate: "2026-01-15",
    originalUrl: "https://www.conviction.com/startups",
  },
  {
    id: "conviction-16",
    title: "Next-Gen Autocomplete",
    elevatorPitch:
      "There's no Copilot-like experience for general computing (email, browsing, authoring). Build a browser extension that learns personal writing style, handles multimodal input (screenshots, voice), and provides second-brain functionality.",
    fullDescription: `## The Problem

Developers have Copilot—AI that understands their context and helps them code. Everyone else has... generic chatbots.

Knowledge workers spend hours daily:
- Writing emails and messages
- Composing documents
- Filling out forms
- Taking and organizing notes

None of this has the fluid, context-aware AI assistance that developers enjoy.

## The Solution

Build the personal AI layer for all computing:
- **Browser extension**: Works everywhere you work online
- **Personal style learning**: Adapts to your writing voice and preferences
- **Multimodal input**: Accept screenshots, voice, and text
- **Second brain**: Remembers context across sessions and applications

## Technical Approach

- Learn from user's writing patterns (with permission)
- Integrate with email, documents, and web forms
- Support voice input for hands-free operation
- Build memory of user's projects, contacts, and preferences

## The Opportunity

Everyone who uses a computer could benefit from this. The market is essentially everyone who does knowledge work.`,
    category: "ai-infrastructure",
    industryTags: ["AI", "Productivity", "Consumer", "Browser Extension"],
    publishedDate: "2026-01-15",
    originalUrl: "https://www.conviction.com/startups",
  },
  {
    id: "conviction-17",
    title: "The All-Seeing Eye",
    elevatorPitch:
      "Millions of deployed cameras lack rich indexing and semantic understanding. Build full-stack security services using on-device models for sophisticated computer vision analysis.",
    fullDescription: `## The Problem

There are millions of security cameras deployed worldwide, but most are barely used:
- **No indexing**: Footage is recorded but never searchable
- **No understanding**: Can detect motion but not understand what's happening
- **Reactive only**: Review footage after incidents, can't prevent them
- **Siloed systems**: Each camera is an island, no coordination

## The Solution

Build AI-powered video understanding at scale:
- **Semantic indexing**: Search footage by what's happening, not just when
- **Real-time analysis**: Understand events as they occur
- **On-device processing**: Run AI models on camera hardware, not in the cloud
- **Cross-camera coordination**: Understand events across multiple views

## Why On-Device Matters

- **Privacy**: Video never leaves the premises
- **Latency**: Real-time response without network delays
- **Bandwidth**: Don't need to stream everything to the cloud
- **Reliability**: Works even when internet is down

## The Business Model

Full-stack security services: don't just sell software, provide the complete security solution. Capture the full value of better security, not just a software license.`,
    category: "ai-infrastructure",
    industryTags: ["Security", "Computer Vision", "AI", "IoT"],
    publishedDate: "2026-01-15",
    originalUrl: "https://www.conviction.com/startups",
  },
  {
    id: "conviction-18",
    title: "The (Smart, Social) Sims",
    elevatorPitch:
      "Most entertainment focuses on productivity agents; there's a gap in personalized, social entertainment. Build game worlds with interesting AI agents that have their own lives, hierarchical memory, and interactive capabilities.",
    fullDescription: `## The Insight

AI development focuses heavily on productivity: assistants that help you work, agents that complete tasks, tools that make you more efficient.

But humans also want to be entertained. And AI could create entirely new forms of entertainment.

## The Vision

Imagine game worlds where:
- **AI characters have lives**: They pursue their own goals, form relationships, have memories
- **Hierarchical memory**: Characters remember important events and forget trivia, like humans
- **Genuine interaction**: You can have real conversations, not scripted dialogue trees
- **Emergent stories**: Narratives arise from character interactions, not pre-written plots

## Why This Matters

The Sims proved people love simulated social worlds. But The Sims characters are simple: scripted behaviors, no real memory, no genuine conversation. AI can create something fundamentally more interesting.

## Technical Challenges

- **Persistent memory**: Characters need to remember across sessions
- **Believable behavior**: AI must act consistently with personality
- **Social dynamics**: Multiple characters interacting realistically
- **Player agency**: Allow meaningful player influence without breaking immersion

## The Opportunity

Gaming is a $200B+ industry. AI-native entertainment could capture significant share by offering experiences that weren't previously possible.`,
    category: "creator-economy",
    industryTags: ["Gaming", "AI", "Entertainment", "Social"],
    publishedDate: "2026-01-15",
    originalUrl: "https://www.conviction.com/startups",
  },
  {
    id: "conviction-19",
    title: "Knock My SOX Off",
    elevatorPitch:
      "Sarbanes-Oxley compliance costs millions annually with manual reporting and testing. Build agents that automate internal control verification, user access auditing, and policy adherence checking.",
    fullDescription: `## The Problem

Sarbanes-Oxley (SOX) compliance is a massive burden for public companies:
- **Millions in annual costs**: Large companies spend $2-5M+ on SOX compliance
- **Manual testing**: Auditors manually verify internal controls
- **User access reviews**: Quarterly reviews of who has access to what
- **Policy verification**: Checking that policies are actually followed

This is repetitive, expensive, and still error-prone.

## The Solution

Build AI agents for compliance automation:
- **Internal control testing**: Automatically verify that controls are working
- **Access auditing**: Continuously monitor user access and flag anomalies
- **Policy adherence**: Check that processes follow documented policies
- **Evidence collection**: Automatically gather audit evidence

## Why AI Makes This Possible

SOX compliance is:
- **Rule-based**: Clear requirements that can be encoded
- **Data-rich**: Evidence exists in system logs and documents
- **Repetitive**: Same tests performed quarter after quarter
- **High-value**: Significant cost savings justify investment

## The Opportunity

Every public company needs this. The company that automates SOX compliance will have sticky, high-value enterprise customers.`,
    category: "rebuild-money",
    industryTags: ["Compliance", "AI", "Enterprise", "Finance"],
    publishedDate: "2026-01-15",
    originalUrl: "https://www.conviction.com/startups",
  },
  {
    id: "conviction-20",
    title: "Save Us Money",
    elevatorPitch:
      "Price monitoring and deal negotiation is fragmented across platforms. Build web agents that aggregate demand, track savings, negotiate deals, and execute purchases on behalf of consumers.",
    fullDescription: `## The Problem

Consumers leave money on the table because saving money takes work:
- **Price monitoring**: Tracking prices across retailers is tedious
- **Deal hunting**: Finding the best deals requires constant attention
- **Negotiation**: Many prices are negotiable, but people don't try
- **Group buying**: Aggregating demand could get better prices, but logistics are hard

## The Solution

Build AI agents that save money for consumers:
- **Price tracking**: Monitor prices across all retailers automatically
- **Deal discovery**: Find and surface relevant deals
- **Negotiation**: Negotiate prices on behalf of users
- **Demand aggregation**: Combine buying power for better group deals
- **Purchase execution**: Complete transactions when criteria are met

## Technical Approach

Web agents that can:
- Navigate e-commerce sites
- Compare prices across platforms
- Interact with chat and email for negotiation
- Execute purchases securely

## The Business Model

Take a percentage of savings delivered. Aligned incentives: you only make money when customers save money.

## The Opportunity

Consumer spending is massive. Even saving people a few percent represents enormous value.`,
    category: "rebuild-money",
    industryTags: ["Consumer", "AI", "E-commerce", "Fintech"],
    publishedDate: "2026-01-15",
    originalUrl: "https://www.conviction.com/startups",
  },
  {
    id: "conviction-21",
    title: "Loosening the Legacy Grip",
    elevatorPitch:
      "Mainframe apps (COBOL, Assembler) are difficult to migrate due to language, complexity, tight coupling, and compliance risk. Use code generation to systematically extract logic, translate to modern languages, and generate documentation.",
    fullDescription: `## The Problem

Trillions of dollars of business logic runs on legacy mainframes:
- Written in COBOL, Assembler, PL/I, and other ancient languages
- Deeply intertwined with business processes
- Poorly documented
- Maintained by aging workforce

Migrating this code is incredibly difficult:
- **Language barriers**: Few developers know these languages
- **Complexity**: Decades of changes create tangled logic
- **Risk**: Any mistake could break critical business processes
- **Compliance**: Regulated industries need careful migration

## The Solution

Use AI for systematic legacy migration:
- **Logic extraction**: Understand what legacy code actually does
- **Translation**: Convert to modern languages with validated correctness
- **Documentation generation**: Create documentation that never existed
- **Test generation**: Build test suites to validate migration
- **Incremental migration**: Move piece by piece, not big bang

## Why AI Changes This

Previous migration tools required extensive manual analysis. LLMs can:
- Read and understand legacy code
- Generate equivalent modern implementations
- Create comprehensive documentation
- Build test cases from behavior analysis

## The Opportunity

Mainframe modernization is a $15B+ market that's been stuck for decades. AI could finally make it tractable.`,
    category: "ai-infrastructure",
    industryTags: ["Enterprise", "Legacy", "AI", "Developer Tools"],
    publishedDate: "2026-01-15",
    originalUrl: "https://www.conviction.com/startups",
  },
  {
    id: "conviction-22",
    title: "Accessible Government Services",
    elevatorPitch:
      "Navigating government programs (benefits, permits, visas, taxes) requires expertise across unintelligible systems. Build natural language chat agents for government service workflows and form completion.",
    fullDescription: `## The Problem

Government services are notoriously difficult to navigate:
- **Complex requirements**: Eligibility rules span hundreds of pages
- **Jargon-heavy**: Forms use language citizens don't understand
- **Fragmented**: Different agencies, different systems, different rules
- **High stakes**: Mistakes can mean denied benefits, legal issues, or delayed visas

People hire lawyers and consultants just to navigate bureaucracy.

## The Solution

Build AI assistants for government services:
- **Natural language interface**: Explain what you need in plain English
- **Eligibility determination**: Understand which programs you qualify for
- **Form completion**: Fill out forms correctly based on your situation
- **Process tracking**: Know where you are in the process and what's next

## Why This Matters

Government services exist to help people, but complexity creates barriers:
- Benefits go unclaimed because people don't know they qualify
- Mistakes on forms cause delays and denials
- Vulnerable populations are most hurt by complexity

## The Opportunity

Government touches everyone. The company that makes government services accessible has an enormous market and significant social impact.`,
    category: "future-of-work",
    industryTags: ["Government", "AI", "Consumer", "Social Impact"],
    publishedDate: "2026-01-15",
    originalUrl: "https://www.conviction.com/startups",
  },
  {
    id: "conviction-23",
    title: "Many, Many, Materials",
    elevatorPitch:
      "Novel material proposal was traditionally bespoke with limited access to computational design capability. Build autonomous lab systems proposing and synthesizing novel compounds for diverse industrial applications.",
    fullDescription: `## The Problem

Materials science is bottlenecked by:
- **Slow discovery**: Finding new materials with desired properties takes years
- **Limited exploration**: Only a tiny fraction of possible materials are tested
- **Expensive experiments**: Physical synthesis and testing is costly
- **Expert dependency**: Requires PhD-level expertise to propose candidates

## The Solution

Build autonomous materials discovery systems:
- **AI-driven proposal**: Generate candidates with predicted properties
- **Automated synthesis**: Robotic systems that create proposed materials
- **High-throughput testing**: Characterize materials at scale
- **Learning loop**: Use results to improve predictions

## Applications

Novel materials are needed for:
- **Batteries**: Better energy storage for EVs and grid
- **Solar cells**: More efficient photovoltaics
- **Catalysts**: Cheaper, cleaner chemical processes
- **Alloys**: Stronger, lighter structural materials
- **Semiconductors**: Better chips for AI and computing

## The Opportunity

Materials are foundational to almost every industry. The company that can discover new materials faster will have impact across the economy.`,
    category: "world-of-atoms",
    industryTags: ["Materials Science", "AI", "Chemistry", "Manufacturing"],
    publishedDate: "2026-01-15",
    originalUrl: "https://www.conviction.com/startups",
  },
  {
    id: "conviction-24",
    title: "Web Data APIs",
    elevatorPitch:
      "AI models need live data access but existing APIs lack page content, outlinks, and edit history. Bootstrap comprehensive, vertically-focused web indexes with parsed content and real-time updates.",
    fullDescription: `## The Problem

AI applications need access to web data, but current options are limited:
- **Search APIs**: Return URLs but not content
- **Scraping**: Brittle, expensive, often blocked
- **Common Crawl**: Stale and incomplete
- **No structure**: Raw HTML, not parsed and organized content

## The Solution

Build web data infrastructure for AI:
- **Comprehensive indexing**: Full page content, not just URLs
- **Structured parsing**: Clean, organized content extraction
- **Relationships**: Outlinks, citations, references
- **History**: Track changes over time
- **Real-time updates**: Fresh data, not stale crawls
- **Vertical focus**: Deep coverage of specific domains

## Why Vertical Focus

Trying to index the entire web is expensive and unnecessary. Start with vertically-focused indexes:
- Academic papers and citations
- News and current events
- Business and company information
- Product and e-commerce data

## The Opportunity

Every AI application needs data. The company that provides clean, fresh, comprehensive web data will be infrastructure for the AI industry.`,
    category: "ai-infrastructure",
    industryTags: ["Data", "AI", "Infrastructure", "Web"],
    publishedDate: "2026-01-15",
    originalUrl: "https://www.conviction.com/startups",
  },
  {
    id: "conviction-25",
    title: "Always Pick Up the Phone",
    elevatorPitch:
      "Businesses miss approximately 50% of inbound calls, which is critical for lead generation. Build voice-based transactional systems handling qualification, reservations, appointments, and order tracking.",
    fullDescription: `## The Problem

Small businesses miss half their calls:
- **50% missed call rate** across SMBs
- Every missed call is a missed customer
- Staffing for call handling is expensive
- After-hours calls go completely unanswered

For service businesses, missed calls directly equal lost revenue.

## The Solution

Build AI-powered voice systems for small business:
- **Always available**: Answer every call, 24/7
- **Qualification**: Understand what the caller needs
- **Transactions**: Handle reservations, appointments, orders
- **Escalation**: Route complex issues to humans
- **Follow-up**: Confirm appointments, send reminders

## Why Voice Matters

- Many customers prefer calling over apps or websites
- Voice is the natural interface for urgent requests
- Phone calls have higher conversion than digital channels
- Local businesses often lack sophisticated digital presence

## Target Verticals

- **Restaurants**: Reservations, takeout orders
- **Home services**: Appointment scheduling, quotes
- **Healthcare**: Appointment booking, prescription refills
- **Retail**: Inventory checks, order status

## The Opportunity

There are millions of small businesses missing millions of calls. The company that helps them answer every call will have massive reach.`,
    category: "ai-infrastructure",
    industryTags: ["Voice AI", "SMB", "Customer Service", "AI"],
    publishedDate: "2026-01-15",
    originalUrl: "https://www.conviction.com/startups",
  },
  {
    id: "conviction-26",
    title: "Autonomous HR (and IT) Helpdesk",
    elevatorPitch:
      "Large HR teams handle high-volume repetitive events like hiring, exits, and role changes with manual processing. Build conversational search interfacing with HRIS systems for access-controlled answers and automated record updates.",
    fullDescription: `## The Problem

HR and IT helpdesks handle enormous volumes of repetitive requests:
- "What's my PTO balance?"
- "How do I enroll in benefits?"
- "I need access to this system"
- "What's the policy on remote work?"
- "How do I submit an expense report?"

Each request takes time from HR/IT staff, even when the answer is straightforward.

## The Solution

Build autonomous helpdesk agents:
- **Conversational interface**: Employees ask questions naturally
- **HRIS/ITSM integration**: Connect to systems of record
- **Access control**: Only share information employees should see
- **Action execution**: Update records, submit requests, grant access
- **Escalation**: Route complex issues to human agents

## Key Capabilities

- Understand employee questions in natural language
- Retrieve answers from connected systems
- Take actions within security boundaries
- Learn from interactions to improve over time

## The Opportunity

Every large company has HR and IT helpdesks. Automating routine queries frees human staff for complex work while providing faster service to employees.`,
    category: "ai-infrastructure",
    industryTags: ["HR", "IT", "Enterprise", "AI"],
    publishedDate: "2026-01-15",
    originalUrl: "https://www.conviction.com/startups",
  },
]

/**
 * Get Conviction author data
 */
export const convictionAuthor = {
  name: "Conviction",
  username: "conviction",
  avatar: "/images/conviction-logo.png",
  verified: true,
  badge: "Conviction",
  profileUrl: "https://www.conviction.com/startups",
  isAnonymous: false,
}

/**
 * Transform Conviction problem to display format
 */
export function transformConvictionProblem(problem: ConvictionProblem) {
  return {
    id: problem.id,
    title: problem.title,
    elevatorPitch: problem.elevatorPitch,
    fullDescription: problem.fullDescription,
    category: problem.category,
    categorySlug: problem.category,
    author: convictionAuthor,

    // Conviction-specific metadata
    source: "Conviction",
    publishedDate: problem.publishedDate,
    originalUrl: problem.originalUrl,
    industryTags: problem.industryTags,

    // Engagement
    upvotes: 0,
    commentCount: 0,
    builderCount: 0,
    investorCount: 0,

    // Display
    involvement: "just-sharing" as const,
    isAnonymous: false,
    createdAt: new Date(problem.publishedDate),

    // Flags
    isConviction: true,
    isEditable: false,
    isForkable: true,
  }
}
