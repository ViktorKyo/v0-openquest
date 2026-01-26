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
    title: "Build compliance infrastructure for emerging regulations",
    elevatorPitch:
      "Tech is under regulatory siege—AI, crypto, teen safety, hardware. Changing regulations create mandatory adoption of new tools. Companies need compliance infrastructure or face fines and prison. Build the tools that help companies follow emergent laws.",
    fullDescription: `Tech and its impact on humanity has been a focal point for politicians, fueled by the industry's growing influence, media-fueled fear, and past mistakes.

## The Regulatory Landscape:

- **Teen regulation:** Utah signed SB152 and HB311 requiring age verification, preventing teens from using social media between 10:30pm-6:30am. Arkansas, Texas, Ohio, Louisiana, and New Jersey are pushing similar legislation. The Senate is considering the Kids Online Safety Act.

- **AI regulation:** The EU is proposing heavy restrictions requiring companies like OpenAI to be licensed by third parties. The AI Act extends to GitHub and open source contributors. The US is evaluating its approach as illustrated in the Senate hearing with Sam Altman.

- **Crypto regulation:** Tensions are building. The collapse of UST/LUNA, FTX, and Silvergate is emboldening lawmakers. Some call this "Operation Choke Point 2.0" as companies like Coinbase establish operations outside the US.

- **Hardware regulation:** Shift toward onshoring fueled by war and macroeconomic uncertainty. Florida banned Chinese-made DJI drones for law enforcement. The CHIPS Act subsidizes US-based chip manufacturing.

## What We're Looking For:

- Tools facilitating collaboration between product and compliance teams
- Compliance monitoring that automatically flags risks and triggers reviews
- Compliance "operating systems" for fragmented regulations across states and countries
- Solutions for AI, social media, and other heavily scrutinized tech categories`,
    category: "ai-infrastructure",
    industryTags: ["Compliance", "Legal", "Enterprise", "RegTech"],
    publishedDate: "June 21, 2023",
    authors: ["Ryan Hoover", "Vedika Jain"],
    originalUrl: "https://www.weekend.fund/request-for-startups-compliance-tech",
  },
  {
    id: "wf-rfs-2",
    title: "Build the infrastructure for enterprise AI adoption",
    elevatorPitch:
      "Consumers adopted ChatGPT in months. But enterprises lack the privacy, security, compliance, and data integration tools to safely deploy AI. Stakes are higher in regulated industries. Build the tooling layer for enterprise AI adoption.",
    fullDescription: `LLMs are not just a superpower tool—they're infrastructure to create superpower tools. They're programmable with words ("natural language"). If you can speak or type, you can use these tools with far less training than traditionally required.

## The Gap:

We're seeing consumers rapidly adopt AI—ChatGPT amassed 100M users in months. But stakes are higher in the enterprise. They're even higher in regulated industries like automotive, fintech, and healthcare.

Today, enterprises lack:
- Privacy and security tooling
- Compliance infrastructure
- Data integration layers
- Workflow orchestration
- Access and permissioning controls

## What We're Looking For:

- **Enterprise-grade application builders** that ship AI-powered products using proprietary data
- **Data access, integration, and management infrastructure** that helps companies safely leverage enterprise data with LLMs
- **Workflow builders and orchestration infrastructure** that enables automation of repetitive work
- **Advanced permissioning and RBAC infrastructure** to ensure the right employees access the right data
- **Privacy and compliance tooling** for regulation-compliant AI deployment
- **Security tooling** to protect against data loss and threats from generative AI
- **Quality and performance tooling** for model evaluation and output guardrails

## Market Examples:
- StackAI, LastMileAI, Olympus (application builders)
- Usable Machines, Oxen (data infrastructure)
- Commonbase, DynamoFL, Gretel (privacy/compliance)
- Cadea, Preo, Credal (security/access control)
- OpenLayer, Guardrails (quality tooling)`,
    category: "ai-infrastructure",
    industryTags: ["AI", "Enterprise", "Security", "Infrastructure"],
    publishedDate: "July 11, 2023",
    authors: ["Ryan Hoover", "Vedika Jain"],
    originalUrl: "https://www.weekend.fund/enterprization-of-ai",
  },
  {
    id: "wf-rfs-3",
    title: "Build technology that replicates human-ness at 100x speed and 1% cost",
    elevatorPitch:
      "The world is moving from atoms to bits. The next shift is synthetic humans—software that simulates human behavior with the programmability and scalability of software. Deliver 100x the speed at 1% the cost of human-powered alternatives.",
    fullDescription: `The world is moving from atoms to bits, decreasing costs and increasing accessibility while delivering better solutions.

We don't write postcards, we text. We don't visit Blockbuster, we press Netflix. We never fast forward cassette tapes, we hit "next" on Spotify.

## The Next Shift:

Synthetic humans = software that simulates the non-deterministic behavior and "human-ness" of people with the programmability, scalability, and delivery of bits.

The combination of advancements in LLMs, computer vision, generative AI, and a more connected API ecosystem have unlocked use cases once only achieved through real humans.

## Market Examples:

- **User Research:** Synthetic Users and Roundtable offer user research without people—AI participants replace recruiting, scheduling, and interviewing humans
- **UX Testing:** Synthetic Traffic creates simulated human behavior for usability testing
- **AI Researchers:** Fictive and Outset simulate the UX researcher, asking questions through conversational UI
- **Video Dubbing:** Deeptune and Unilingo translate and dub videos without human dubbing
- **Virtual Presenters:** Synthesia, HeyGen, InVideo create virtual people for sales, marketing, and training
- **Voice Generation:** ElevenLabs, PlayHT, Deepgram turn text into human-like voices
- **AI Companions:** Replika and Character.ai replicate social interactions
- **Phone Automation:** Bland.ai, Infinitus, FleetWorks simulate human voice for phone calls

## What We're Looking For:

- Make the human-powered luxuries of the 1% affordable and accessible to everyone (e.g., Therapy → Rosebud)
- Entertain and create connection through human-like experiences (e.g., Best friend → Replika)
- Replicate human behaviors to improve execution speed and quality in research, testing, marketing (e.g., Paid actor → InVideo)
- Enable novel self-expression that unlocks new creators who might not thrive in traditional mediums (e.g., Motion capture equipment → Hallway)
- Replicate assistive work so everyone has a 24/7 teammate (e.g., Research analyst → Toliman AI)
- Interface with humans to generate "APIs" that automate laborious processes (e.g., Healthcare calls → Infinitus)

## Note on Job Displacement:

We view synthetic human technology as an enabler—empowering people to do more and opening access to solutions that were previously inaccessible or unaffordable.`,
    category: "ai-infrastructure",
    industryTags: ["AI", "Consumer", "Media", "Enterprise"],
    publishedDate: "August 22, 2023",
    authors: ["Ryan Hoover", "Vedika Jain"],
    originalUrl: "https://www.weekend.fund/request-for-startups-synthetic-humans",
  },
  {
    id: "wf-rfs-4",
    title: "Kill bit-pushing with LLM-powered workflow automation",
    elevatorPitch:
      "Technology promised to kill paper-pushing but we just digitized the drudgery into bit-pushing. LLMs finally reach unstructured data and ambiguous workflows. Build the tools that end administrative work and become the new system of record.",
    fullDescription: `Technology promised to kill paper-pushing. But we've just digitized the drudgery. We moved from paper-pushing to bit-pushing.

The PDF, now over 30 years old, ushered society's shift toward digitization. However, this also introduced new forms of tedious work: extracting information from PDFs, inputting into databases, managing complex digital filing systems.

## Why Now - The Pain is Getting Worse:

- **Greater need for integrations:** Explosion of tools means keeping data accurate across systems creates massive administrative work
- **Multi-stakeholder complexity:** Procurement requires approvals from legal, compliance, security, IT—creating administrative burden
- **Security, privacy, access concerns:** Adhering to data privacy creates administrative burden

## Why Now - Technology Unlocks:

LLMs can finally process:
- **Unstructured data:** Extract, classify, and make usable data from documents, invoices, contracts, records
- **Less-defined workflows:** Observe browser/API actions to surface automatable workflows

As Tom Blomfield wrote: "In pretty much every old, large company, there are huge teams of people running manual processes. They're hidden away from the end customer (hence 'back office' rather than 'front office')."

LLMs are "the environmentally friendly fracking rigs, blasting value from unstructured text shale formations."

## What We're Looking For:

**Horizontal:**
- LLM-powered data extraction infra for documents and unstructured data
- Customer-facing document collection infra with orchestration, permissioning, user management
- Infra for LLM-outputting data to various systems respecting permissions and governance

**Department-Specific:**
- LLM-enabled automation for HR, finance, compliance with ambition of becoming system-of-record

**Vertical:**
- LLM-enabled vertically-focused automation for real estate, financial services, healthcare

## Market Examples:
- Horizontal: Luminai, Orby, Extend, Tennr, Induced
- Vertical: Adaptive (construction), Coast AI (real estate), Reform (shipping), Zuma (property management), Powder (wealth advisors)`,
    category: "future-of-work",
    industryTags: ["AI", "Enterprise", "Automation", "SaaS"],
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
