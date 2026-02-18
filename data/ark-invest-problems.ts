/**
 * ARK Invest Big Ideas 2025
 * Source: https://ark-invest.com/big-ideas-2025
 * Full Report: https://research.ark-invest.com/hubfs/1_Download_Files_ARK-Invest/Big_Ideas/ARK%20Invest%20Big%20Ideas%202025.pdf
 *
 * ARK projects disruptive innovation could command >2/3 of global equity market,
 * compounding at 38% rate through 2030. These are the specific opportunities.
 */

export interface ArkInvestProblem {
  id: string
  title: string
  elevatorPitch: string
  fullDescription: string
  category: string
  industryTags: string[]
  publishedDate: string
  originalUrl: string
}

export const arkInvestAuthor = {
  id: "ark-invest",
  username: "ARK Invest",
  avatarUrl: "",
  isARK: true,
}

export const arkInvestProblems: ArkInvestProblem[] = [
  // AI & Productivity
  {
    id: "ark-ai-productivity-software",
    title: "Build AI Software That Captures the $22-117T Productivity Opportunity",
    elevatorPitch: "AI software could boost global productivity by $22-117 trillion by 2030. OpenAI is projected to surpass $10B revenue in 2025. Build the next wave of AI productivity tools.",
    fullDescription: `## The Opportunity

AI software could boost global productivity by **$22-117 trillion by 2030**. OpenAI alone is projected to surpass **$10 billion in revenue in 2025**.

## Why Now

- Compute performance doubled **48 times in 2023**; projected **64 doublings by 2030**
- AI compute efficiency could increase **50,000x by 2030**
- AI models already outperforming human experts in coding and medical diagnostics
- Network density between disruptive technologies increased **30%** in the past year

## Market Dynamics

AI advances could push global GDP growth to **7.3% by 2030**. The economic contribution of AI could reach **$15.7 trillion by 2030**.

## What's Needed

Tools for automated decision-making, customer service enhancement, digital marketing, and financial advisory services. Software that captures knowledge work and automates workflows.`,
    category: "AI & Infrastructure",
    industryTags: ["AI", "Productivity", "Enterprise"],
    publishedDate: "2025-02-04",
    originalUrl: "https://ark-invest.com/big-ideas-2025",
  },
  {
    id: "ark-ai-advertising",
    title: "Build AI-Managed Advertising Platforms",
    elevatorPitch: "AI-managed ads are expected to capture 54% of the $1.1 trillion digital ad market by 2030. That's $594B in AI-mediated advertising spend.",
    fullDescription: `## The Opportunity

AI-managed advertising is expected to capture **54% of the $1.1 trillion digital ad market by 2030**. That's approximately **$594 billion** flowing through AI-mediated systems.

## Current State

Traditional advertising remains largely manual, with human media buyers making placement decisions. AI can optimize in real-time across millions of variables simultaneously.

## What's Needed

- AI agents that manage end-to-end advertising campaigns
- Systems that match user intent to relevant offerings without intrusive targeting
- Platforms that optimize creative, placement, and bidding simultaneously
- Tools that respect privacy while maintaining effectiveness

## The Shift

The model is moving from "interruption" to "assistance" - AI agents that help consumers find what they need rather than pushing unwanted messages.`,
    category: "AI & Infrastructure",
    industryTags: ["AI", "Advertising", "Marketing Tech"],
    publishedDate: "2025-02-04",
    originalUrl: "https://ark-invest.com/big-ideas-2025",
  },

  // Bitcoin & Crypto
  {
    id: "ark-bitcoin-institutional",
    title: "Build Infrastructure for Institutional Bitcoin Adoption",
    elevatorPitch: "Spot Bitcoin ETFs received $4B inflows on launch day (highest for any ETF ever). Bitcoin's realized market cap grew 86% in 2024. Build the rails for institutional crypto.",
    fullDescription: `## The Opportunity

Spot Bitcoin ETFs received **$4 billion in inflows on launch day** - the highest for any ETF launch in history. Bitcoin's realized market capitalization grew **86% in 2024**, reaching all-time highs.

## Key Milestone

Bitcoin's supply growth dropped below gold's for the first time post-halving, fundamentally changing its scarcity dynamics compared to traditional stores of value.

## What's Needed

- Custody solutions meeting institutional compliance requirements
- Trading infrastructure with enterprise-grade SLAs
- Risk management and reporting tools for regulated entities
- Integration with traditional portfolio management systems
- Tax and accounting automation for crypto holdings

## The Shift

Bitcoin is transitioning from speculative asset to institutional allocation. Regulatory clarity is accelerating adoption. The infrastructure to serve this market is still nascent.`,
    category: "Rebuild Money",
    industryTags: ["Bitcoin", "Institutional Finance", "Infrastructure"],
    publishedDate: "2025-02-04",
    originalUrl: "https://ark-invest.com/big-ideas-2025",
  },
  {
    id: "ark-stablecoin-payments",
    title: "Build Stablecoin Payment Infrastructure",
    elevatorPitch: "Stablecoin transaction value hit $15.6T in 2024, exceeding Visa ($13.1T) and Mastercard ($7.8T). Active wallets reached 23M. Build the payment rails of the future.",
    fullDescription: `## The Opportunity

Stablecoin transaction value reached **$15.6 trillion in 2024**, exceeding:
- Visa: $13.1 trillion
- Mastercard: $7.8 trillion

Active stablecoin wallets hit **23 million** (all-time high). December 2024 recorded **$270 billion in daily stablecoin volumes**.

## Why Stablecoins Win

- Instant settlement (vs. 2-3 day ACH)
- 24/7 operation
- Dramatically lower cross-border fees
- Programmable money enabling new use cases

## What's Needed

- Merchant acceptance infrastructure
- Banking/fiat on/off ramps at scale
- Cross-border payment corridors
- Treasury management tools for businesses
- Consumer wallets with intuitive UX
- Compliance and AML tooling

## Impact

Stablecoins are enabling financial inclusion and influencing CBDC development. They're faster and cheaper for cross-border payments than legacy systems.`,
    category: "Rebuild Money",
    industryTags: ["Stablecoins", "Payments", "Fintech"],
    publishedDate: "2025-02-04",
    originalUrl: "https://ark-invest.com/big-ideas-2025",
  },
  {
    id: "ark-layer2-scaling",
    title: "Build Ethereum Layer 2 Scaling Solutions",
    elevatorPitch: "Ethereum L2 daily transactions surpassed mainnet for the first time in 2024. Rollups and sidechains reduced fees by 90%+. Build the scalability layer.",
    fullDescription: `## The Milestone

Ethereum L2 daily transactions surpassed mainnet for the first time in 2024. This is a fundamental shift in how blockchain scales.

## The Economics

Transaction fees reduced **over 90%** via rollups and sidechains. Billions are now locked in DeFi protocols built on these scaling solutions.

## What's Needed

- New rollup implementations optimized for specific use cases
- Cross-L2 interoperability solutions
- Developer tooling that abstracts L2 complexity
- Sequencer decentralization
- Data availability layers
- Account abstraction infrastructure

## The Opportunity

Smart contract adoption is accelerating. The infrastructure layer is still being built. Winners in L2 infrastructure will capture significant value as the ecosystem grows.`,
    category: "Rebuild Money",
    industryTags: ["Blockchain", "Ethereum", "Layer 2", "Infrastructure"],
    publishedDate: "2025-02-04",
    originalUrl: "https://ark-invest.com/big-ideas-2025",
  },

  // Robotics & Automation
  {
    id: "ark-robotaxi-fleet",
    title: "Build and Operate Robotaxi Fleets at $0.25/Mile",
    elevatorPitch: "Robotaxi cost per mile expected to drop below $0.25 by 2030. The global market could reach $10 trillion. Build the autonomous mobility platform.",
    fullDescription: `## The Market

The global robotaxi market could reach **$10 trillion by 2030**. Cost per mile is expected to drop below **$0.25** - substantially cheaper than traditional ride-hailing.

## Why This Matters

At $0.25/mile, robotaxis become cheaper than car ownership for most use cases. This fundamentally changes:
- Personal transportation economics
- Urban planning
- Insurance markets
- Real estate (parking requirements)
- Automotive manufacturing

## What's Needed

- Fleet management and operations platforms
- Maintenance and charging infrastructure
- Insurance and liability frameworks
- Regulatory engagement and compliance
- Customer experience and safety systems
- Integration with public transit

## The Opportunity

The infrastructure for mobility-as-a-service is still being built. Companies that nail operations at scale will capture enormous value.`,
    category: "World of Atoms",
    industryTags: ["Autonomous Vehicles", "Transportation", "Robotics"],
    publishedDate: "2025-02-04",
    originalUrl: "https://ark-invest.com/big-ideas-2025",
  },
  {
    id: "ark-autonomous-logistics",
    title: "Build Autonomous Logistics That Cut Costs 50%",
    elevatorPitch: "Self-driving trucks show 40% reductions in fuel costs and delivery times. Autonomous delivery could cut last-mile costs 50% by 2030. Build the future of freight.",
    fullDescription: `## The Opportunity

- Self-driving truck deployments showing **40% reductions** in fuel costs and delivery times
- Autonomous delivery vehicles could cut last-mile logistics costs **50% by 2030**
- AI inventory management could reduce waste and improve efficiency **30%**

## The Problem

Logistics faces a critical driver shortage while demand continues to grow. Human drivers are constrained by hours-of-service regulations. Trucks sit idle 75% of the time.

## What's Needed

- Long-haul autonomous trucking systems
- Last-mile delivery robots and drones
- AI-powered route optimization
- Dynamic fleet management
- Warehouse automation integration
- Regulatory compliance and safety systems

## The Shift

Autonomous logistics enables 24/7 operation, predictable delivery times, and dramatically lower costs. The supply chain transformation opportunity is massive.`,
    category: "World of Atoms",
    industryTags: ["Autonomous Vehicles", "Logistics", "Supply Chain"],
    publishedDate: "2025-02-04",
    originalUrl: "https://ark-invest.com/big-ideas-2025",
  },
  {
    id: "ark-humanoid-robots",
    title: "Build Humanoid Robots Approaching Labor Cost Parity",
    elevatorPitch: "Industrial robotics expected to grow at 25% CAGR through 2030. AI humanoid robots approaching cost parity with human labor. Global robotics revenue opportunity exceeds $26T.",
    fullDescription: `## The Market

Global robotics revenue opportunity exceeds **$26 trillion**, encompassing manufacturing, warehousing, and household automation.

## Key Trends

- Industrial robotics expected to grow at **25% CAGR through 2030**
- AI humanoid robots approaching cost parity with human labor in select industries
- Potential to unlock economic value of unpaid labor (household chores, caregiving)

## Why Humanoids

Humanoid form factor can:
- Operate in human-designed environments without modification
- Use human tools and interfaces
- Replace multiple specialized devices
- Adapt to varied tasks through software updates

## What's Needed

- Cost reduction in actuators, sensors, and compute
- AI systems for dexterous manipulation
- Safety systems for human collaboration
- Task-specific training and deployment platforms
- Service and maintenance infrastructure

## The Opportunity

Adoption depends on continued cost reductions and productivity improvements. The companies that crack general-purpose humanoid robotics will create enormous value.`,
    category: "World of Atoms",
    industryTags: ["Robotics", "Manufacturing", "AI"],
    publishedDate: "2025-02-04",
    originalUrl: "https://ark-invest.com/big-ideas-2025",
  },
  {
    id: "ark-3d-printing",
    title: "Capture the $180B 3D Printing Market by 2030",
    elevatorPitch: "3D printing projected to grow at ~40% annually, reaching $180B by 2030. Manufacturers are bringing production in-house. Build the additive manufacturing future.",
    fullDescription: `## The Market

- 3D printing projected annual growth rate: **~40%**
- Expected market size by 2030: **$180 billion**
- Industry consolidation underway

## What's Driving Growth

Manufacturers are bringing 3D printing in-house for:
- Drone parts
- Nuclear components
- Aerospace parts
- Medical devices
- Consumer products

## Advantages Over Traditional Manufacturing

- No tooling costs for new designs
- On-demand production reduces inventory
- Complex geometries impossible with traditional methods
- Local production reduces supply chain risk
- Mass customization at scale

## What's Needed

- Faster print speeds for production volumes
- New materials with production-grade properties
- Quality control and certification systems
- Design software optimized for additive
- Integration with existing manufacturing workflows

## The Opportunity

3D printing is transitioning from prototyping to production. The infrastructure and tooling for this shift is still being built.`,
    category: "World of Atoms",
    industryTags: ["3D Printing", "Manufacturing", "Hardware"],
    publishedDate: "2025-02-04",
    originalUrl: "https://ark-invest.com/big-ideas-2025",
  },

  // Energy
  {
    id: "ark-battery-storage",
    title: "Build Energy Storage as Battery Costs Drop 80%",
    elevatorPitch: "Battery costs projected to decline 80% over the next decade. Distributed solar and microgrids are reshaping energy infrastructure. Build the storage layer.",
    fullDescription: `## The Opportunity

Battery costs projected to decline **80% over the next decade**. This fundamentally changes the economics of:
- Grid-scale storage
- Electric vehicles
- Distributed energy
- Backup power

## What This Enables

- Renewables become dispatchable (available when needed, not just when sun shines/wind blows)
- Grid stability without gas peakers
- Microgrids and distributed energy
- Energy arbitrage (buy low, sell high)

## What's Needed

- Grid-scale battery systems
- Battery management software
- Aggregation and virtual power plant platforms
- Financing structures for storage projects
- Integration with renewable generation
- Second-life battery markets

## The Shift

Distributed solar and microgrids are reshaping global energy infrastructure. Storage is the key enabling technology. This creates opportunities in cleantech financing and carbon credit markets.`,
    category: "Climate Tech",
    industryTags: ["Energy Storage", "Batteries", "Cleantech"],
    publishedDate: "2025-02-04",
    originalUrl: "https://ark-invest.com/big-ideas-2025",
  },
  {
    id: "ark-nuclear-smr",
    title: "Deploy Small Modular Reactors for AI Data Center Power",
    elevatorPitch: "AI data centers need massive reliable power. SMRs offer cost-competitive, low-carbon baseload. Historical pre-regulation nuclear costs are being revisited. Build the energy for AI.",
    fullDescription: `## The Problem

AI data centers require enormous, reliable power. The incremental power needed through 2030 is significant but feasible within infrastructure expansion trends.

## Why Nuclear

- Reliable, low-carbon baseload power
- Small modular reactors (SMRs) offer factory fabrication
- Improved economics compared to legacy large plants
- Historical cost declines (pre-regulatory changes) being revisited
- Cost-competitive alternatives to traditional renewables emerging

## What's Needed

- SMR designs optimized for data center co-location
- Regulatory pathways for new reactor types
- Financing structures for nuclear projects
- Fuel supply chain development
- Operations and maintenance platforms
- Decommissioning and waste solutions

## The Opportunity

Renewed nuclear interest is driven by AI power demands. The regulatory landscape is evolving to support advanced energy solutions. First movers in SMR deployment will have significant advantages.`,
    category: "Climate Tech",
    industryTags: ["Nuclear", "Energy", "Data Centers", "AI"],
    publishedDate: "2025-02-04",
    originalUrl: "https://ark-invest.com/big-ideas-2025",
  },

  // Genomics & Healthcare
  {
    id: "ark-drug-discovery-ai",
    title: "Cut Drug Development Costs from $2.4B to $0.6B with AI",
    elevatorPitch: "AI-driven drug development could reduce costs from $2.4B to $0.6B per drug and cut time-to-market by 40%. AlphaFold revolutionized protein prediction. Build the AI pharma stack.",
    fullDescription: `## The Opportunity

AI-driven drug development could:
- Reduce costs from **$2.4 billion to $0.6 billion** per drug (75% reduction)
- Cut time-to-market by **~40%**
- Save 2-5 years in discovery timelines

## Why Now

- DNA sequencing costs dropped **10^10-fold** over 35 years (exceeding Moore's Law)
- Genome analysis time: from **180 days (2001) to under 10 minutes**
- AlphaFold revolutionized protein structure prediction with "orders-of-magnitude productivity gains"
- Successive versions predict complex multi-chain protein interactions

## What's Needed

- AI models for target identification
- Virtual screening and lead optimization
- Clinical trial design and patient matching
- Regulatory submission automation
- Integration with lab automation
- Biological data infrastructure

## The Economics

Cures (vs. chronic treatments) could command higher upfront prices with significantly increased lifetime value. The pharmaceutical economics are being reset.`,
    category: "Longevity",
    industryTags: ["AI", "Drug Discovery", "Biotech", "Healthcare"],
    publishedDate: "2025-02-04",
    originalUrl: "https://ark-invest.com/big-ideas-2025",
  },
  {
    id: "ark-virtual-cells",
    title: "Build Virtual Cell Models for Drug Discovery",
    elevatorPitch: "Virtual cell models simulate cellular functions using AI and multi-scale biological data. Could save hundreds of millions in R&D per drug. Build the computational biology platform.",
    fullDescription: `## The Opportunity

Virtual cell models simulate cellular functions using AI and multi-scale biological data. They could:
- Predict drug effects before expensive wet lab experiments
- Reduce drug discovery timelines by 2-5 years
- Save hundreds of millions in R&D costs per drug

## How They Work

Combine data from:
- Genomics
- Transcriptomics
- Epigenetics
- Proteomics

To create comprehensive models of molecular changes contributing to normal development, cellular response, and disease.

## What's Needed

- Multi-omics data integration platforms
- AI models trained on biological data
- Validation against experimental results
- Interfaces for drug discovery workflows
- Cloud compute infrastructure for simulations
- Collaboration tools for research teams

## The Shift

Biology is entering a data-driven era where AI and multiomics reinforce one another. Discovery is accelerating, precision is improving, and the economics of healthcare are being reset.`,
    category: "Longevity",
    industryTags: ["AI", "Computational Biology", "Drug Discovery"],
    publishedDate: "2025-02-04",
    originalUrl: "https://ark-invest.com/big-ideas-2025",
  },
  {
    id: "ark-self-driving-labs",
    title: "Build Self-Driving Labs for High-Throughput Discovery",
    elevatorPitch: "Self-driving labs combine automation with AI for high-throughput experiments. Could reduce drug discovery timelines by 2-5 years. Build the automated research platform.",
    fullDescription: `## The Opportunity

Self-driving labs combine automation with AI for high-throughput experiments. They could:
- Run experiments 24/7 without human intervention
- Learn from results and design next experiments automatically
- Reduce discovery timelines by 2-5 years
- Dramatically increase experiment throughput

## Key Components

- Robotic liquid handling and sample preparation
- Automated analytical instruments
- AI systems for experiment design
- Data integration and analysis pipelines
- Active learning algorithms
- Lab information management systems

## What's Needed

- Modular, reconfigurable automation platforms
- AI that can design and interpret experiments
- Integration across diverse instrument types
- Collaboration with traditional wet labs
- Validation and reproducibility frameworks
- Cost-effective deployments for smaller labs

## The Impact

Self-driving labs accelerate discovery across biology, chemistry, and materials science. The economics of R&D are being fundamentally changed.`,
    category: "Longevity",
    industryTags: ["Lab Automation", "AI", "Drug Discovery", "Robotics"],
    publishedDate: "2025-02-04",
    originalUrl: "https://ark-invest.com/big-ideas-2025",
  },

  // Aerospace
  {
    id: "ark-reusable-rockets",
    title: "Build on Reusable Rocket Economics (<$1M Refurbishment)",
    elevatorPitch: "SpaceX Falcon 9 booster refurbishment costs less than $1M. Launch costs per kg to orbit have dropped dramatically. Build the space economy infrastructure.",
    fullDescription: `## The Economics

SpaceX's Falcon 9 demonstrates:
- Booster refurbishment costs: **less than $1 million**
- Dramatic cost-per-kilogram reductions to orbit
- Turnaround times significantly faster than legacy systems

## What This Enables

- Starlink satellite broadband (wouldn't exist without cheap launches)
- Proliferated LEO constellations
- Space manufacturing and research
- Lunar and Mars missions

## What's Needed

- Launch services at lower price points
- Satellite manufacturing at scale
- Ground station infrastructure
- Space-based services platforms
- In-orbit servicing and manufacturing
- Debris mitigation and space traffic management

## The Opportunity

Lower launch costs unlock new markets that weren't economically viable. The infrastructure for the space economy is being built now.`,
    category: "Moonshots",
    industryTags: ["Space", "Aerospace", "Infrastructure"],
    publishedDate: "2025-02-04",
    originalUrl: "https://ark-invest.com/big-ideas-2025",
  },
  {
    id: "ark-hypersonic-flight",
    title: "Build the Multi-Billion Dollar Hypersonic Flight Market",
    elevatorPitch: "Hypersonic flight is projected as a multi-billion dollar near-term market, with long-term potential of hundreds of billions. Build commercial hypersonic transportation.",
    fullDescription: `## The Market

- Near-term market: **multi-billion dollars**
- Long-term potential: **hundreds of billions**

## The Value Proposition

Hypersonic flight (Mach 5+) could reduce:
- Transpacific flights from 12+ hours to 2-3 hours
- Transcontinental from 5 hours to 1 hour
- Critical cargo delivery times dramatically

## Technical Challenges

- Thermal management at hypersonic speeds
- Propulsion systems (scramjets, combined cycle)
- Materials that survive extreme heat
- Sonic boom mitigation for overland flight
- Regulatory frameworks for new flight regimes

## What's Needed

- Propulsion development
- Airframe and materials innovation
- Testing and certification infrastructure
- Airport modifications for hypersonic operations
- Passenger experience design
- Regulatory engagement

## The Opportunity

Commercial hypersonic is enabled by reusable rocket technology development. The aerospace industry is on the cusp of a speed revolution.`,
    category: "Moonshots",
    industryTags: ["Aerospace", "Transportation", "Deep Tech"],
    publishedDate: "2025-02-04",
    originalUrl: "https://ark-invest.com/big-ideas-2025",
  },
]
