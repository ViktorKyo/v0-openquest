/**
 * Weekend Fund Requests for Startups - Problem Library
 * Source: https://www.weekend.fund/request-for-startups
 * Founded by Ryan Hoover (Product Hunt founder) & Vedika Jain
 */

export interface WeekendFundProblem {
  id: string
  title: string
  elevatorPitch: string
  fullDescription: string
  category: string
  industryTags: string[]
  publishedDate: string
  authors: string[]
  originalUrl: string
}

export const weekendFundProblems: WeekendFundProblem[] = [
  {
    id: "wf-rfs-1",
    title: "Comply or Die: Build the Regulatory Infrastructure for Tech's Next Era",
    elevatorPitch:
      "Tech is under regulatory siege from every direction—AI licensing, teen safety laws, crypto enforcement, hardware restrictions. Every new regulation creates mandatory adoption of compliance tools. Build the infrastructure that helps companies survive the regulatory onslaught.",
    fullDescription: `Tech and its impact on humanity has become the defining political issue of our time. Politicians across the spectrum are emboldened by the industry's growing power, media-fueled fear, and highly publicized failures. The result: a tsunami of regulation that's only beginning.

## The Regulatory Onslaught:

**Teen Protection & Social Media:**
Utah's SB152 and HB311 require age verification and ban teen social media use between 10:30pm-6:30am. Arkansas, Texas, Ohio, Louisiana, and New Jersey are pushing similar legislation. The federal Kids Online Safety Act would impose new duties of care on platforms with teen users. Every social app needs to rethink their compliance strategy—or face liability.

**Artificial Intelligence:**
The EU AI Act is the most sweeping AI regulation ever enacted—requiring licensing, documentation, and audits for "high-risk" AI systems. It extends to GitHub repositories and open-source contributors. In the US, the Executive Order on AI mandates safety testing and reporting for powerful models. State-level bills are proliferating. OpenAI, Anthropic, Google—everyone is scrambling to understand their obligations.

**Cryptocurrency:**
The collapse of FTX, LUNA/UST, and Silvergate gave regulators the ammunition they needed. The SEC has declared most tokens are securities. Banking regulators have launched what critics call "Operation Choke Point 2.0." Coinbase and others are establishing operations outside the US. The regulatory clarity everyone wanted is arriving—and it's punishing.

**Hardware & Supply Chain:**
Geopolitical tensions have triggered sweeping restrictions. The CHIPS Act subsidizes domestic manufacturing while export controls block cutting-edge chips from reaching China. Florida banned DJI drones for law enforcement. The era of globalized hardware supply chains is ending.

## The Opportunity:

**Early Examples of What's Working:**
- TerraTrue: Product-compliance collaboration platform
- Hadrius: AI-powered SEC compliance
- Commonbase: PII protection and data governance
- Arklow: Data rights and consent management
- Cable: Financial crime compliance automation

## What We're Looking For:

- **Product-compliance collaboration:** Tools that bring compliance into the product development lifecycle, not as an afterthought
- **Automated risk detection:** Systems that monitor for compliance risks and trigger reviews before launches, not after enforcement actions
- **Multi-jurisdictional compliance OS:** Infrastructure that handles the fragmented patchwork of state, federal, and international regulations
- **Category-specific solutions:** Deep compliance tooling for AI, social media, crypto, and other heavily scrutinized sectors

The companies that didn't invest in compliance infrastructure are already paying the price. The ones that do will have a durable competitive advantage as regulatory complexity only increases.`,
    category: "ai-infrastructure",
    industryTags: ["Compliance", "Legal", "Enterprise", "RegTech", "AI"],
    publishedDate: "June 21, 2023",
    authors: ["Ryan Hoover", "Vedika Jain"],
    originalUrl: "https://www.weekend.fund/request-for-startups-compliance-tech",
  },
  {
    id: "wf-rfs-2",
    title: "The Enterprization of AI: Build the Missing Infrastructure Layer",
    elevatorPitch:
      "ChatGPT reached 100M users in two months. Enterprise adoption is crawling. Why? Enterprises lack the privacy, security, compliance, data integration, and governance tooling required to deploy AI responsibly. Build the infrastructure that unlocks AI for the Fortune 500.",
    fullDescription: `ChatGPT reached 100 million users in two months. Enterprise AI adoption? According to KPMG's Q4 2025 survey, **80% of enterprise leaders say cybersecurity is the single greatest barrier to achieving their AI strategy goals**—up from 68% just two quarters earlier. The gap between consumer enthusiasm and enterprise readiness is widening, not closing.

## The Evidence Is Stark

Recent enterprise surveys reveal a consistent pattern of barriers:

| Concern | % of Enterprises Citing | Change from Q1 2025 |
|---------|-------------------------|---------------------|
| Cybersecurity | 80% | +12% |
| Data privacy | 77% | +24% |
| Data quality | 65% | +28% |
| Regulatory compliance | 55% | +15% |

The numbers get worse the deeper you look:

- **53%** of organizations identify data privacy as their #1 obstacle for AI agent deployment
- **47%** of organizations using GenAI have experienced problems—hallucinations, security breaches, privacy exposure, IP leakage
- **Only 6%** have an advanced AI security strategy or defined AI TRiSM framework
- **64%** lack full visibility into their AI risks
- **22%** of GenAI prompts contain sensitive data (analysis of 1M prompts in Q2 2025)
- **50%+** of current enterprise AI adoption is estimated to be "shadow AI"—unauthorized tools employees use without IT approval

## Why This Is Getting Worse, Not Better

**The Shadow AI Problem**
Employees are using ChatGPT, Claude, and other tools with company data whether IT approves or not. An analysis of 1 million GenAI prompts found:
- 22% of files shared with AI contain sensitive information
- 4.37% of prompts include source code, access credentials, proprietary algorithms, or customer records

IT can't secure what they can't see. And they can't see most of what employees are doing with AI.

**The Agent Problem**
As companies move from chatbots to AI agents, the risk surface expands exponentially:
- Agents can take actions, not just generate text
- Agents can access systems and data autonomously
- Agents can chain together in ways that are hard to audit
- 60% of enterprises now restrict agent access to sensitive data without human oversight

According to Cloudera's 2025 report, **more than half of organizations plan to expand AI agent use, but data privacy remains the primary obstacle.**

## Real-World Scenarios

**Scenario 1: The Financial Services Firm**
A top-20 bank ran a successful pilot using GPT-4 to help analysts summarize earnings calls. When they tried to move to production, compliance blocked it:
- No audit trail of what data was sent to OpenAI
- No way to prove PII wasn't included in prompts
- No mechanism to ensure outputs didn't violate securities regulations
- No clear liability framework if AI gave bad advice

The pilot was successful. The deployment never happened. They're still looking for a solution 18 months later.

**Scenario 2: The Healthcare System**
A hospital network wanted to use AI to help nurses with patient documentation. The HIPAA implications were staggering:
- Every prompt potentially contains PHI
- OpenAI's BAA (Business Associate Agreement) wasn't sufficient for their legal team
- They needed on-premise deployment, but lacked ML infrastructure expertise
- Even anonymized data raised re-identification concerns

They ended up building a custom solution with a 6-person team over 14 months—far longer and more expensive than expected.

**Scenario 3: The Manufacturing Company**
A Fortune 500 manufacturer deployed an AI assistant for engineers. Within 3 months:
- Engineers had uploaded proprietary CAD files to get AI help
- Competitive intelligence (pricing, vendor contracts) had been pasted into prompts
- No one knew which data had been exposed or to whom

They shut it down entirely and started over with a governed solution.

## The Infrastructure Stack That's Emerging

**Security & Access Control**
- **Credal:** AI gateway that enforces data access permissions
- **Robust Intelligence:** AI security platform for adversarial testing
- **CalypsoAI:** Enterprise AI security and governance
- **Private AI:** Data redaction before it reaches AI systems

**Privacy & Compliance**
- **Gretel:** Synthetic data generation to avoid using real data
- **DynamoFL:** Federated learning for privacy-preserving AI
- **Skyflow:** Data privacy vault integrated with AI workflows
- **Protecto:** AI privacy platform for masking and anonymization

**Governance & Observability**
- **Fiddler:** AI observability and model monitoring
- **Arthur AI:** ML performance monitoring and explainability
- **Weights & Biases:** MLOps platform with governance features
- **Patronus AI:** LLM evaluation and safety testing

**Data Integration**
- **Unstructured:** ETL for unstructured data
- **LlamaIndex / LangChain:** RAG infrastructure
- **Pinecone / Weaviate:** Vector databases for enterprise data

## The Market Opportunity

The numbers are large and growing:

- **Enterprise AI spending:** $150B+ by 2027
- **AI security market:** $19B by 2028 (growing 24% CAGR)
- **Data governance market:** $6B by 2027
- **MLOps market:** $4B by 2027

But here's the key insight: most enterprises aren't in the market for AI security because they haven't deployed AI yet. They're stuck in POC purgatory—successful pilots that can't move to production.

The companies that solve the security/privacy/compliance blockers don't just sell to existing AI deployments. They unlock deployments that would otherwise never happen.

## What We're Looking For

**1. AI Gateways**
Sit between employees and AI, enforcing policies, redacting sensitive data, logging everything. Think: "Zscaler for AI."

**2. Privacy-Preserving AI Infrastructure**
Enable AI on sensitive data without exposing the data—synthetic data, federated learning, confidential computing, on-premise deployment.

**3. Governance and Audit**
Prove to regulators and auditors exactly what data AI accessed, what outputs it produced, and what decisions it influenced. The "audit trail for AI."

**4. Shadow AI Detection**
Find and govern the AI tools employees are already using without approval. Convert shadow AI into sanctioned, secured deployments.

**5. Vertical Solutions**
Purpose-built for specific regulated industries—healthcare (HIPAA), financial services (SEC, FINRA), legal (privilege), government (FedRAMP).

The enterprise AI market is massive, but most of it is locked behind security and compliance barriers. The companies that provide the keys will capture enormous value.`,
    category: "ai-infrastructure",
    industryTags: ["AI", "Enterprise", "Security", "Infrastructure", "B2B"],
    publishedDate: "July 11, 2023",
    authors: ["Ryan Hoover", "Vedika Jain"],
    originalUrl: "https://www.weekend.fund/enterprization-of-ai",
  },
  {
    id: "wf-rfs-3",
    title: "Synthetic Humans: 100x Speed, 1% Cost",
    elevatorPitch:
      "Every decade, technology replaces a human-powered process with software. Postcards → texts. Blockbuster → Netflix. The next wave: synthetic humans—software that replicates human behavior with the scalability of bits. Deliver what only humans could do at 100x speed and 1% cost.",
    fullDescription: `The arc of technology is clear: we move from atoms to bits, reducing costs and increasing accessibility while often delivering better outcomes.

We stopped writing postcards—we text. We stopped visiting Blockbuster—we press play on Netflix. We stopped fast-forwarding cassettes—we hit "next" on Spotify.

## The Next Frontier: Synthetic Humans

Synthetic humans = software that simulates the non-deterministic, nuanced, "human-ness" of people with the programmability, scalability, and instant delivery of digital products.

This isn't science fiction. The convergence of LLMs, computer vision, voice synthesis, and API connectivity has unlocked use cases that previously required real humans:

**Research & Testing:**
- Synthetic Users and Roundtable conduct user research without recruiting a single participant—AI personas provide feedback, answer questions, and simulate user behavior
- Synthetic Traffic generates realistic user sessions for UX testing without hiring testers
- Fictive and Outset replace the UX researcher entirely—AI conducts interviews through conversational interfaces

**Content & Media:**
- Synthesia, HeyGen, and InVideo create virtual presenters for sales videos, training content, and marketing—no actors, no studios, no scheduling
- Deeptune and Unilingo dub and translate videos into any language without human voice actors
- Roll.ai automates professional video production through software

**Voice & Communication:**
- ElevenLabs, PlayHT, and Deepgram convert text to natural human speech—indistinguishable from real voices
- Bland.ai, Infinitus, and FleetWorks handle phone calls autonomously—from customer support to appointment scheduling to healthcare coordination

**Connection & Companionship:**
- Replika and Character.ai provide social connection and companionship through AI personas
- Rosebud delivers therapeutic journaling and mental health support at a fraction of therapy costs

## What We're Looking For:

**Democratize Premium Services:**
Make the human-powered luxuries of the wealthy accessible to everyone. Personal stylists → AI styling. Executive coaches → AI coaching. Therapists → AI-powered mental health support (Rosebud).

**Replicate Human Judgment at Scale:**
Replace human labor in research, testing, and analysis where speed and cost matter more than perfect fidelity. Paid focus groups → AI user research. QA testers → synthetic users. Research analysts → AI research assistants.

**Enable New Forms of Creation:**
Unlock creative expression for people who couldn't access traditional mediums. $100K motion capture studios → Hallway. Professional video production → AI video generation.

**Automate Human Interfaces:**
Build "APIs" that handle the phone calls, emails, and human coordination that can't be digitized any other way. Healthcare phone calls → Infinitus. Sales development → AI SDRs.

## The 100x/1% Test:

For every startup in this category, we ask: Are you delivering 100x the speed, 100x the scale, or operating at 1% the cost of the human-powered alternative? If yes—and the output is good enough—you're building the future.`,
    category: "ai-infrastructure",
    industryTags: ["AI", "Consumer", "Media", "Enterprise", "Voice", "Video"],
    publishedDate: "August 22, 2023",
    authors: ["Ryan Hoover", "Vedika Jain"],
    originalUrl: "https://www.weekend.fund/request-for-startups-synthetic-humans",
  },
  {
    id: "wf-rfs-4",
    title: "The End of the Back Office: Kill Bit-Pushing Forever",
    elevatorPitch:
      "Technology promised to eliminate paper-pushing. Instead, we digitized the drudgery into bit-pushing—extracting data from PDFs, reconciling systems, managing approvals. LLMs can finally process unstructured data and ambiguous workflows. Build the tools that end administrative work and become the new system of record.",
    fullDescription: `The PDF is over 30 years old. It was supposed to save us from paper. Instead, it spawned entirely new categories of tedious work: extracting information from PDFs, inputting data into databases, managing complex digital filing systems, and reconciling information across dozens of disconnected tools.

Technology promised to kill paper-pushing. We just digitized the drudgery. We moved from paper-pushing to bit-pushing.

## Why The Pain Is Getting Worse:

**Tool Proliferation:**
The average enterprise uses 130+ SaaS applications. Each has its own data model, its own workflows, its own exports. Keeping information accurate and synchronized across these systems is a full-time job—often done by dozens of people manually copying data, reconciling discrepancies, and catching errors.

**Multi-Stakeholder Complexity:**
Simple decisions now require approval chains spanning legal, compliance, security, IT, and finance. A procurement request touches five departments. A new vendor requires twelve forms. The administrative burden compounds with every stakeholder added to the process.

**Compliance Overhead:**
Privacy regulations (GDPR, CCPA), security requirements (SOC 2, ISO 27001), and industry-specific rules create documentation requirements that didn't exist a decade ago. Someone has to manage all of this—usually through spreadsheets and manual processes.

## Why LLMs Change Everything:

Previous automation tools (RPA, workflow builders) could only handle structured data and deterministic processes. If the form field changed, the bot broke. If the workflow had exceptions, it required human intervention.

LLMs can process:
- **Unstructured data:** Extract information from messy documents, inconsistent formats, and natural language—invoices, contracts, emails, support tickets
- **Ambiguous workflows:** Handle exceptions, make judgment calls, and adapt to variations that would break traditional automation

As Tom Blomfield wrote: "In pretty much every old, large company, there are huge teams of people running manual processes. They're hidden away from the end customer (hence 'back office' rather than 'front office')."

LLMs are the "environmentally friendly fracking rigs, blasting value from unstructured text shale formations."

## The Companies Building This Future:

**Horizontal Platforms:**
- Luminai: AI-powered workflow automation
- Orby: Contract and invoice processing with 85% productivity improvements
- Extend: Intelligent document extraction
- Tennr: Revenue workflow automation
- Induced: AI agents that operate any software

**Vertical Solutions:**
- Adaptive: Automated bookkeeping for construction
- Coast AI: Commercial real estate workflow automation
- Reform: Invoice data capture for logistics
- Zuma: Property management automation
- Powder: Back-office automation for wealth advisors

## What We're Looking For:

**Horizontal Infrastructure:**
- Document processing systems that handle any format, any layout, any language
- Customer-facing document collection with built-in orchestration and governance
- Data routing infrastructure that moves LLM outputs to downstream systems while respecting permissions

**Department-Specific Platforms:**
- AI-native HR systems that don't just store data but process onboarding, manage benefits, and handle compliance
- Finance automation that goes beyond invoice processing to become the system of record
- Compliance platforms that automatically document, track, and report—not just alert

**Vertical Solutions:**
- Deep, industry-specific automation for real estate, healthcare, financial services, logistics, and construction—where domain knowledge creates defensibility

## The Endgame:

The startups that win won't just automate workflows—they'll become the new system of record. When AI processes every document, routes every approval, and handles every exception, the AI platform becomes the source of truth. That's the prize: not efficiency gains, but platform lock-in.`,
    category: "future-of-work",
    industryTags: ["AI", "Enterprise", "Automation", "SaaS", "Back Office"],
    publishedDate: "April 15, 2024",
    authors: ["Vedika Jain"],
    originalUrl: "https://www.weekend.fund/request-for-startups-the-end-of-the-back-office",
  },
]

export const weekendFundAuthor = {
  name: "Weekend Fund",
  username: "weekendfund",
  avatar: "/images/weekend-fund-logo.png",
  verified: true,
  badge: "Weekend Fund RFS",
  profileUrl: "https://www.weekend.fund/request-for-startups",
  isAnonymous: false,
}

// Transform Weekend Fund problem to match app format
export function transformWeekendFundProblem(problem: WeekendFundProblem, index: number) {
  return {
    id: problem.id,
    title: problem.title,
    elevatorPitch: problem.elevatorPitch,
    fullDescription: problem.fullDescription,
    author: {
      username: weekendFundAuthor.username,
      avatarUrl: weekendFundAuthor.avatar,
      isWeekendFund: true,
      verified: true,
    },
    category: getCategoryDisplayName(problem.category),
    upvotes: 120 + index * 15, // Simulate varying popularity
    commentCount: 8 + index * 2,
    builderCount: 3 + index,
    investorCount: 6 + index,
    createdAt: new Date(problem.publishedDate),
    isAnonymous: false,
    involvement: "just-sharing" as const,
    isWeekendFundRFS: true,
    wfPublishedDate: problem.publishedDate,
    wfAuthors: problem.authors,
  }
}

// Helper to map category slugs to display names
function getCategoryDisplayName(slug: string): string {
  const mapping: Record<string, string> = {
    "future-of-work": "Future of Work",
    "ai-infrastructure": "AI & Infrastructure",
    moonshots: "Moonshots",
    "creator-economy": "Creator Economy",
    longevity: "Longevity",
    "rebuild-money": "Rebuild Money",
    "climate-tech": "Climate Tech",
    "world-of-atoms": "World of Atoms",
    "niche-markets": "Niche Markets",
    other: "Other",
  }
  return mapping[slug] || slug
}
