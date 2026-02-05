/**
 * Y Combinator Requests for Startups (RFS) - Problem Library
 * Source: https://www.ycombinator.com/rfs
 * Last Updated: January 2026
 */

export interface YCProblem {
  id: string
  title: string
  elevatorPitch: string
  fullDescription: string
  category: string
  industryTags: string[]
  quarter: "Spring 2026" | "Fall 2025" | "Summer 2025" | "Spring 2025" | "Winter 2025"
  ycPartner?: string
  originalUrl: string
}

export const ycRfsProblems: YCProblem[] = [
  // Spring 2026 Problems (NEW)
  {
    id: "yc-rfs-19",
    title: "Cursor for Product Managers",
    elevatorPitch:
      "As AI coding agents handle implementation, the bottleneck shifts to deciding what to build. Create the intelligent product management tool that analyzes customer data, proposes features, and generates specs that coding agents can execute.",
    fullDescription: `Coding agents like Cursor and Devin are getting remarkably good at writing software. But they still need to be told what to build. The bottleneck is shifting from "how do we implement this?" to "what should we implement?"

**The Vision:**
Imagine a tool where you upload customer interviews, support tickets, and product usage data, then ask: "What should we build next?" The system would:
- Analyze patterns across thousands of customer interactions
- Propose new features with AI-generated UI mockups and data models
- Break down work into tasks that coding agents can execute directly
- Replace traditional PRDs and Figma mocks with executable specifications

**Why This Matters:**
Product managers today spend weeks gathering requirements, writing specs, and creating mockups. If AI can write the code, AI should also help define what code to write. The companies that figure this out will ship 10x faster.

**The Opportunity:**
The product management software market is $15B+, but it's still built around human workflows—Jira tickets, Confluence docs, Figma files. The AI-native PM tool will look nothing like today's tools.`,
    category: "ai-infrastructure",
    industryTags: ["AI", "Developer Tools", "Product Management", "Enterprise"],
    quarter: "Spring 2026" as const,
    ycPartner: "Andrew Miklas",
    originalUrl: "https://www.ycombinator.com/rfs",
  },
  {
    id: "yc-rfs-20",
    title: "AI-Native Hedge Funds",
    elevatorPitch:
      "The hedge funds of the future won't bolt AI onto existing strategies—they'll use AI agents to discover entirely new ones. Build the fund where AI analyzes filings, synthesizes research, and executes trades autonomously.",
    fullDescription: `In the 1980s, quantitative trading seemed impractical—computers couldn't possibly beat human intuition. Now quant funds manage trillions. AI-native hedge funds will follow the same trajectory.

**What's Different:**
Traditional funds are retrofitting AI onto existing processes. AI-native funds will be built from scratch around what AI does best:
- Agents that read every 10-K, earnings call transcript, and SEC filing in real-time
- Systems that synthesize analyst ideas from across the firm and spot patterns humans miss
- Autonomous execution that acts on insights in milliseconds

**Why Now:**
Large established funds are slow to adopt AI due to compliance requirements, legacy systems, and organizational inertia. This creates a window for new entrants to build AI-first.

**The Playbook:**
Start with a specific edge—maybe it's processing alternative data, or finding patterns in regulatory filings, or optimizing execution. Then expand as the AI capabilities compound.

**Market Context:**
Hedge funds manage $4.5 trillion globally. Even capturing a small slice with superior AI-driven returns represents a massive opportunity.`,
    category: "rebuild-money",
    industryTags: ["Fintech", "AI", "Trading", "Quantitative Finance"],
    quarter: "Spring 2026" as const,
    ycPartner: "Charlie Holtz",
    originalUrl: "https://www.ycombinator.com/rfs",
  },
  {
    id: "yc-rfs-21",
    title: "AI-Native Agencies: Software Margins on Services",
    elevatorPitch:
      "Instead of selling AI tools to help agencies work faster, become the agency. Use AI to deliver design, advertising, legal, and consulting services with software-like margins and infinite scalability.",
    fullDescription: `The typical playbook is to build software that helps service businesses be more efficient. But there's a more ambitious play: become the service business yourself, powered entirely by AI.

**The Insight:**
Service markets are massive but fragmented because scaling people is hard. AI changes this equation. You can now:
- Run a design firm that produces custom creative work upfront to win pitches, without a team of designers
- Build an ad agency that creates thousands of personalized video ads without ever booking a studio or hiring actors
- Operate a law firm that generates contracts, reviews documents, and handles routine legal work in hours instead of weeks

**The Economics:**
Traditional agencies have 20-30% margins because they're selling human time. AI-native agencies can achieve software margins (70-80%) while still charging premium prices for high-quality output.

**Why "Agency" and Not "Tool":**
When you sell software, you compete on features and price. When you sell outcomes, you compete on results. Customers don't want AI tools—they want their problems solved.

**The Opportunity:**
Professional services is a $1 trillion+ market globally. Design services alone is $150B. Advertising is $500B. Legal is $900B. AI-native agencies can capture meaningful share by delivering better results faster and cheaper.`,
    category: "moonshots",
    industryTags: ["AI", "Services", "Business Model", "Enterprise"],
    quarter: "Spring 2026" as const,
    ycPartner: "Aaron Epstein",
    originalUrl: "https://www.ycombinator.com/rfs",
  },
  {
    id: "yc-rfs-22",
    title: "Stablecoin Financial Services",
    elevatorPitch:
      "Stablecoins sit in the regulatory sweet spot between DeFi chaos and TradFi bureaucracy. Build the financial services layer—yield accounts, cross-border payments, tokenized assets—on this compliant crypto infrastructure.",
    fullDescription: `Stablecoins have found product-market fit that most crypto projects only dream of. Tether and USDC process more transaction volume than Visa. But we're still in the infrastructure phase—the application layer is wide open.

**The Regulatory Moment:**
The GENIUS Act and CLARITY Act are creating clear compliance pathways for stablecoin businesses. This is the first time crypto companies can build with regulatory confidence rather than regulatory anxiety.

**What to Build:**
- **Yield-bearing accounts:** Stablecoin savings products that pay real yields without the complexity of DeFi protocols
- **Cross-border payments:** B2B payments that settle in minutes instead of days, at a fraction of SWIFT costs
- **Tokenized real-world assets:** Access to bonds, treasuries, and other assets through stablecoin rails
- **Merchant infrastructure:** The Stripe/Square for stablecoin commerce

**Why Not DeFi or TradFi:**
DeFi is too risky and complex for mainstream users. TradFi is too slow and expensive. Stablecoins bridge the gap—programmable money with the stability businesses need.

**Market Size:**
Cross-border B2B payments alone is a $150T annual market with $120B+ in fees. Stablecoin rails could capture significant share by being faster, cheaper, and more transparent.`,
    category: "rebuild-money",
    industryTags: ["Fintech", "Crypto", "Stablecoins", "Payments"],
    quarter: "Spring 2026" as const,
    ycPartner: "Daivik Goel",
    originalUrl: "https://www.ycombinator.com/rfs",
  },
  {
    id: "yc-rfs-23",
    title: "AI Tools for Government at Scale",
    elevatorPitch:
      "Government processes millions of forms annually but still prints digital submissions for manual review. AI can process applications, detect fraud, and clear backlogs—if you can navigate the sales cycle. Once you're in, you're in for decades.",
    fullDescription: `Here's an absurd fact: many government agencies receive digital form submissions, print them out, and have humans manually enter the data into their systems. This isn't a tech problem—it's an institutional problem. And it's about to get much worse.

**The Coming Wave:**
Immigration, benefits, permits, licenses—government is about to face an unprecedented surge in applications. They desperately need AI tools to keep up, but they can't build them internally.

**The Opportunity:**
- **Form processing at scale:** AI that can read, validate, and route applications without human intervention
- **Fraud detection:** Pattern recognition across millions of submissions to flag anomalies
- **Backlog clearing:** Tools to work through years of accumulated applications
- **Citizen-facing chatbots:** Help people navigate bureaucracy without waiting on hold for hours

**Why It's Hard (And Why That's Good):**
Selling to government is notoriously difficult—long sales cycles, complex procurement, and endless compliance requirements. But once you're in, you're in. Government customers are incredibly sticky. Look at Palantir: hard to get started, but now indispensable.

**Proof It's Possible:**
Estonia runs nearly its entire government on digital infrastructure. It's not that government can't be modernized—it just needs the right tools and the right founders willing to navigate the complexity.`,
    category: "ai-infrastructure",
    industryTags: ["Government", "AI", "Enterprise", "GovTech"],
    quarter: "Spring 2026" as const,
    ycPartner: "Tom Blomfield",
    originalUrl: "https://www.ycombinator.com/rfs",
  },
  {
    id: "yc-rfs-24",
    title: "Software-Defined Metal Mills",
    elevatorPitch:
      "American metal mills have 8-30 week lead times because they optimize for tonnage, not speed. Modern software and automation can cut lead times to days while improving margins. Build the manufacturing stack that brings metal production into the 21st century.",
    fullDescription: `If you want rolled aluminum or steel in America today, you're waiting 8-30 weeks. This isn't because metalworking is inherently slow—it's because mills optimize for tonnage throughput, not delivery speed. The software and automation is decades old.

**The Core Problems:**
- **Fragmented planning:** Production schedules are managed in spreadsheets and tribal knowledge
- **Setup time:** Changing between products takes hours because automation is primitive
- **No real-time visibility:** Mill operators can't see what's happening across the production line
- **Energy waste:** Mills run inefficiently because they can't optimize power consumption in real-time

**What Modern Mills Need:**
- **AI-driven production planning:** Algorithms that optimize for both throughput AND lead time
- **Real-time MES (Manufacturing Execution Systems):** Visibility into every step of production
- **Modern automation:** Robotic systems that reduce changeover time from hours to minutes
- **Energy optimization:** Smart grid integration and on-site generation management

**Why Now:**
The CHIPS Act and reshoring movement are driving massive investment in American manufacturing. But the software hasn't kept up. New mills being built today often use the same antiquated systems as mills from the 1980s.

**The Prize:**
The company that builds the modern software stack for metal production can do for manufacturing what Flexport did for logistics—bring a fragmented, opaque industry into the software age.`,
    category: "world-of-atoms",
    industryTags: ["Manufacturing", "Software", "Industrial", "Supply Chain"],
    quarter: "Spring 2026" as const,
    ycPartner: "Zane Hengsperger",
    originalUrl: "https://www.ycombinator.com/rfs",
  },
  {
    id: "yc-rfs-25",
    title: "AI Guidance for Physical Work",
    elevatorPitch:
      "Workers in field service, manufacturing, and healthcare need months of training before they're productive. Real-time AI coaching through phones, AirPods, and smart glasses can make anyone effective immediately—'turn off that valve,' 'use the ⅜ inch wrench.'",
    fullDescription: `Training a new HVAC technician takes 6-24 months before they can work independently. But what if they could be productive on day one—not because they know everything, but because an AI expert is in their ear, seeing what they see, guiding every step?

This isn't about replacing training. It's about making every worker as effective as your best worker, immediately.

## The Technological Convergence

Three capabilities have matured simultaneously:

**1. Multimodal AI Can Now "See" Work**
GPT-4V, Gemini, and Claude can identify equipment from photos, read model numbers, interpret error codes, and understand spatial relationships. They can look at a circuit breaker panel and tell you which breaker controls which circuit.

**2. Hardware Is Already Everywhere**
- 97% of field workers carry smartphones with cameras
- AirPods/wireless earbuds are ubiquitous—voice guidance without looking at a screen
- AR glasses (Meta, RayBan, Xreal) are reaching consumer price points
- Edge AI chips enable on-device processing for low-latency guidance

**3. Labor Economics Make This Viable**
With median electrician wages at $62,350 and experienced HVAC techs earning $150,000+ in major markets, even modest productivity improvements justify significant software spend. A 20% reduction in callbacks alone could save $15K+ per technician annually.

## Real-World Scenarios

**Scenario 1: The First-Day HVAC Tech**
Marcus just finished trade school and starts his first job at a commercial HVAC company. Traditionally, he'd shadow a senior tech for 3-6 months before taking calls alone. With AI guidance:

Day 1: He arrives at a service call. He opens the app, points his phone at the rooftop unit. The AI identifies it: "Carrier 48TM028, installed 2019. Common failure modes for this unit are compressor capacitors and contactor issues."

Marcus: "It's making a clicking sound."

AI: "That clicking typically indicates the contactor is trying to engage but failing. Look at the electrical panel on the left side—I'll walk you through testing the contactor."

15 minutes later, Marcus has diagnosed a $40 part replacement that would have cost the customer $800 if it had been misdiagnosed as a compressor failure.

**Scenario 2: The Rural Nurse**
Sarah is a new graduate nurse at a rural clinic in Wyoming, 90 miles from the nearest hospital. She encounters a patient with an unusual skin presentation. She snaps a photo (with consent) and the AI provides differential diagnosis support, suggests questions to ask, and recommends when to escalate. This doesn't replace the physician—it helps Sarah collect better information before the telemedicine consult.

**Scenario 3: The Manufacturing Line**
Toyota's Georgetown, Kentucky plant has 8,000 workers. When a new model launches, thousands of workers need to learn new assembly procedures. Currently, this involves weeks of training and months of reduced productivity. With AI guidance overlaid via tablet screens at each station, workers can follow procedures precisely while the system flags deviations in real-time.

## The Business Models

**Model 1: B2B SaaS to Service Companies**
Sell to HVAC, plumbing, and electrical companies. Pricing: $200-500/month per technician. Value proposition: reduce training time, decrease callbacks, improve first-time fix rates.

ROI math for a 50-tech HVAC company:
- Current callback rate: 15%
- With AI guidance: 8%
- Savings: 7% × 50 techs × 5 calls/day × 250 days × $150/callback = $131,250/year
- Software cost: 50 × $300/month × 12 = $180,000/year
- Breakeven: Need 10% callback reduction

**Model 2: Vertical Integration (The Full-Stack Approach)**
Don't sell software to HVAC companies—become an HVAC company. Hire people with basic mechanical aptitude, train them in 4 weeks instead of 6 months, and use AI guidance to maintain quality. This is the "Amazon approach"—use technology to do something that was previously impossible, not just incrementally better.

Potential advantage: You capture the entire margin, not just software fees. You can price 20% below competitors while maintaining higher quality.

**Model 3: Platform for Independent Workers**
Enable anyone to become a "skilled" tradesperson. The plumber's version of Uber. Worker gets the calls, AI provides the expertise, platform takes a cut. This democratizes access to skilled trade income for people who couldn't afford 4-year apprenticeships.

## What's Already Being Built

- **XOi Technologies:** Field service video + AI for HVAC/plumbing (raised $66M)
- **Augmentir:** AI-powered connected worker platform for manufacturing
- **Parsable:** Digital work instructions for frontline workers
- **SightCall:** Visual assistance platform for field service
- **Help Lightning:** AR-based remote expert guidance

Most of these focus on connecting remote experts to field workers, or providing digital work instructions. The opportunity is fully autonomous AI guidance—no remote expert required.

## Technical Challenges to Solve

1. **Latency:** Voice guidance needs <300ms response time to feel natural
2. **Context persistence:** AI needs to remember what was done 5 minutes ago
3. **Safety:** AI must know when NOT to give advice and when to escalate
4. **Equipment recognition:** Need to identify equipment from partial views, worn labels, unusual angles
5. **Procedure accuracy:** A wrong instruction could cause injury or property damage

## Market Sizing

| Segment | Market Size | Rationale |
|---------|-------------|-----------|
| Field service (HVAC, plumbing, electrical) | $50B+ | ServiceTitan alone does $500M ARR serving this market |
| Manufacturing frontline workers | $30B+ | 12M manufacturing workers in US |
| Healthcare clinical support | $20B+ | 4M nurses, 2M home health aides |
| Construction | $15B+ | 8M construction workers |

Even capturing 1% of field service training and productivity spend is a $500M opportunity.

## What We're Looking For

The winning company will:

1. **Start with a wedge:** Pick one trade (HVAC is ideal—complex enough to need help, standardized enough for AI to learn)
2. **Build proprietary data:** Every interaction trains the model. First-mover advantage compounds.
3. **Solve the hardware UX:** Phone-in-hand is awkward. Voice + AR glasses could be transformative.
4. **Navigate licensing:** Work with trade boards, not against them. AI guidance doesn't replace licensing requirements.
5. **Prove safety:** Document that AI-guided workers have equal or better safety records than traditionally trained workers.

The company that makes a day-one worker as effective as a five-year veteran will transform the skilled trades economy.`,
    category: "future-of-work",
    industryTags: ["AI", "Workforce", "AR/VR", "Healthcare", "Manufacturing"],
    quarter: "Spring 2026" as const,
    ycPartner: "David Lieb",
    originalUrl: "https://www.ycombinator.com/rfs",
  },

  // Fall 2025 Problems (IMPROVED)
  {
    id: "yc-rfs-1",
    title: "AI-Powered Vocational Training for the Physical Infrastructure Workforce",
    elevatorPitch:
      "The AI revolution requires massive physical infrastructure—data centers, semiconductor fabs, power plants. We need 500,000 more electricians, HVAC technicians, and welders by 2030. Build AI training programs that compress years of apprenticeship into months.",
    fullDescription: `Right now, 400,000 skilled trade jobs sit unfilled across America. By 2033, Deloitte and the Manufacturing Institute project that number will hit 2 million. Meanwhile, 41% of the current construction workforce will retire by 2031. This isn't a future crisis—it's happening now, and it's already slowing down the AI buildout.

## The Numbers Are Brutal

The Bureau of Labor Statistics and industry research paint a stark picture:

- **400,000** skilled trade jobs currently unfilled
- **2 million** projected shortage by 2033
- **225,000** HVAC technician shortage expected by 2025
- **32%** labor shortage in residential construction (record high in modern history)
- **41%** of construction workforce retiring by 2031
- **22%** of current tradespeople are over 55

The downstream effects are already measurable:
- Housing starts have declined **18% nationwide**
- Average project completion times extended from **7 months to nearly 11 months**
- **45%** of construction firms report schedule delays tied to worker shortages

## Why Data Centers Can't Be Built Without Electricians

The International Brotherhood of Electrical Workers is explicitly targeting "more than 100,000 sorely needed electricians" specifically for AI-driven data centers. As CBS News reported: "Data centers will not be wired, cooled, or commissioned without electricians, pipefitters, HVAC technicians, welders, and laborers."

Every new data center needs:
- **Electricians** to install and maintain power distribution
- **HVAC technicians** to manage cooling systems (data centers use 40% of their power on cooling)
- **Pipefitters** for water cooling infrastructure
- **Welders** for structural work

The AI revolution is quite literally bottlenecked by people who work with their hands.

## The Training Problem

Traditional apprenticeship programs take 4-5 years. Here's why:

1. **Safety requirements:** You can't learn high-voltage work by making mistakes
2. **Tacit knowledge:** Experienced electricians "feel" when something is wrong—hard to teach
3. **Mentor scarcity:** The people who could train new workers are the same ones retiring
4. **Union structures:** Apprenticeship programs have bureaucratic requirements

Meanwhile, the demand is immediate. A data center construction project can't wait 4 years for electricians to finish training.

## Real-World Scenarios

**Scenario 1: The HVAC Technician Shortage**
ServiceTitan reports that HVAC is the fastest-growing trade. In Chicago, experienced HVAC technicians earn $150,000+ annually without student debt. Yet companies routinely wait 3-6 months to fill positions. One national HVAC company told us they reject 80% of job applicants because they lack basic competency—despite the applicants having "completed" training programs.

**Scenario 2: The Data Center Buildout**
A hyperscale data center project in Virginia needed 340 electricians. They could only find 180 qualified workers locally. They ended up flying in workers from three states, paying per diem and travel, adding $4.2M to project costs. The project was still delayed by 4 months.

**Scenario 3: The Retiring Mentor**
Mike, a master electrician in Ohio with 35 years of experience, is responsible for training 4 apprentices. He retires next year. His employer has no one with equivalent expertise to replace him. Those apprentices will finish their training under someone with 8 years of experience instead of 35.

## What AI-Powered Training Could Look Like

Imagine an apprentice electrician on a job site:

- **AR glasses** overlay the wiring diagram onto the actual junction box
- **Voice AI** talks them through each step: "Good. Now connect the ground wire—that's the green one—to the grounding bar. Make sure it's tight."
- **Computer vision** watches their work and flags issues: "That wire connection looks loose. Tug on it to confirm it's seated properly."
- **After each job**, the AI identifies weak areas and assigns targeted practice

The goal isn't to replace hands-on experience—it's to make every hour of hands-on experience more valuable by providing expert-level guidance that scales.

## What's Already Being Built

- **Interplay Learning:** VR-based training for HVAC, plumbing, electrical (raised $30M)
- **Transfr:** VR workforce training simulations
- **Skillcat:** Mobile-first trade training with certifications
- **SIMONe by Snap-on:** Automotive training simulations

But most of these focus on initial training, not ongoing job-site support. The bigger opportunity may be AI that makes day-one workers productive immediately—real-time guidance, not just pre-job preparation.

## The Market Opportunity

- **U.S. construction workforce training:** $8B+ annually
- **Trade school tuition:** $15K-$30K per student
- **Employer-paid training:** Growing as companies get desperate
- **Government funding:** Department of Labor actively funding "rapid retraining" programs

If you can compress a 4-year apprenticeship into 12-18 months while maintaining quality, employers will pay premium prices. They're already paying $150K+ for experienced HVAC techs—they'll happily pay $30K to train someone who can be productive in a year instead of four.

## What We're Looking For

1. **Real-time job-site support:** AI that makes workers productive on day one, not just better prepared
2. **Vision-based quality assurance:** Catch mistakes before they cause problems
3. **Adaptive learning:** Identify each worker's weak spots and address them
4. **Credential integration:** Work with unions and licensing bodies, not around them
5. **Hardware-aware design:** AR glasses, rugged tablets, voice interfaces that work in loud environments

The companies that solve skilled trade training will be essential infrastructure for the physical economy. Every data center, power plant, and factory depends on them.`,
    category: "future-of-work",
    industryTags: ["Education", "AI", "Workforce", "Hardware", "Training"],
    quarter: "Fall 2025",
    ycPartner: "Harj Taggar",
    originalUrl: "https://www.ycombinator.com/rfs",
  },
  {
    id: "yc-rfs-2",
    title: "Generative Video as a Computing Primitive",
    elevatorPitch:
      "Video generation models now produce photorealistic 8-second clips indistinguishable from reality. Soon, generating video will cost nearly nothing. Treat video as a new computing primitive—not output—and build apps, tools, and infrastructure for this unlimited-video world.",
    fullDescription: `Google's Veo 3 produces 8-second, photorealistic video clips with synchronized audio that are often indistinguishable from real footage. The marginal cost is approaching zero. This changes everything.

**Video Is Becoming a Commodity:**
Just as cloud computing made server capacity effectively infinite, generative AI is making video production effectively infinite. The scarcity that defined media for a century is disappearing.

**What This Unlocks:**

*Media & Entertainment:*
- Personalized content: Kids' shows where your child is the main character
- Infinite backlogs: New episodes of cancelled shows, generated on demand
- AI-native social media: TikTok where every video is generated specifically for each viewer

*Commerce:*
- Virtual try-on: See yourself wearing any piece of clothing before buying
- Real estate: Every listing auto-staged with your furniture
- Advertising: Thousands of personalized ad variants, each optimized for a specific audience segment

*Gaming & Simulation:*
- Games without game engines: Generate scenes in real-time based on player actions
- Robotic training data: Infinite simulation environments for training robots
- Memory preservation: Video calls with loved ones, even after they're gone

**What to Build:**
We want founders who treat generative video as a fundamental computing primitive—like databases, APIs, or cloud functions. Build the infrastructure layer. Build the tooling. Build the applications that only make sense when video costs nothing.

**The Moment:**
The quality is there. The cost is plummeting. The interface patterns haven't been invented yet. This is the time to build.`,
    category: "ai-infrastructure",
    industryTags: ["AI", "Media", "Gaming", "Developer Tools", "Video"],
    quarter: "Fall 2025",
    ycPartner: "David Lieb",
    originalUrl: "https://www.ycombinator.com/rfs",
  },
  {
    id: "yc-rfs-3",
    title: "The $100B Company with 10 People",
    elevatorPitch:
      "Cloud eliminated infrastructure costs. AI is eliminating headcount costs. High-agency teams of 5-10 people can now build multi-billion dollar companies with $500K in funding. The metric that matters: revenue per employee. Some teams will hit $100M per person.",
    fullDescription: `Fifteen years ago, building a tech company required buying servers, hiring ops teams, and raising millions before writing a line of code. Cloud computing eliminated all that. Companies like Instagram reached 30 million users with 13 employees.

**AI Is the Next Step Change:**
Just as cloud eliminated infrastructure headcount, AI is eliminating knowledge work headcount. Tasks that required teams of analysts, writers, designers, and engineers can now be done by a single person with the right AI tools.

**The Numbers:**
- WhatsApp was acquired for $19B with 55 employees ($345M per employee)
- Instagram had 13 employees at 30M users
- We think the next generation will be even more extreme

**What This Looks Like:**
The companies that win will optimize ruthlessly for revenue per employee. They'll:
- Use AI for everything that doesn't require human judgment
- Stay small to avoid the politics, meetings, and coordination costs that kill velocity
- Move faster than any competitor because there's no one to convince, no stakeholders to align
- Compound their advantages because AI tools get better every month

**The Constraint:**
The bottleneck becomes human taste, judgment, and ambition—not human labor. The right 10 people with the right AI tools can outcompete companies with thousands of employees.

**What We're Looking For:**
Founders who believe they can build a company worth tens of billions with a team that fits in a conference room. Not because they want to stay small—but because staying small is how they'll win.`,
    category: "moonshots",
    industryTags: ["AI", "Startups", "Business Model", "Future of Work"],
    quarter: "Fall 2025",
    ycPartner: "Aaron Epstein",
    originalUrl: "https://www.ycombinator.com/rfs",
  },
  {
    id: "yc-rfs-4",
    title: "Infrastructure for Multi-Agent AI Systems",
    elevatorPitch:
      "AI agents are evolving from single chatbots into distributed systems with thousands of sub-agents running in parallel. This is the Hadoop/Spark moment for AI. Build the infrastructure that makes orchestrating agent fleets as routine as deploying a web service.",
    fullDescription: `The first AI agents were single-threaded: one model, one conversation, one task. That's already changing. Production AI systems now fan out hundreds or thousands of sub-agent calls in parallel.

**The Emerging Pattern:**
Imagine reviewing a legal contract. Instead of one AI reading it sequentially, you spawn 50 agents—one for each clause—that analyze in parallel, then synthesize results. Or processing customer feedback: 10,000 agents reading individual reviews, extracting insights, clustering themes.

This is "agentic MapReduce"—applying human-level judgment at data-center scale.

**Why It's Hard:**
Multi-agent systems combine all the challenges of distributed systems (throughput, reliability, cost control) with new problems unique to AI:
- **Prompt engineering at scale:** How do you write prompts that work for 10,000 sub-agents?
- **Context management:** How do you handle untrusted context from upstream agents?
- **Observability:** How do you debug when thousands of agents are making autonomous decisions?
- **Cost management:** How do you control costs when each agent can spawn more agents?

**What to Build:**
The AWS/Vercel for multi-agent systems. Infrastructure that lets developers:
- Define agent workflows declaratively
- Fan out to thousands of sub-agents automatically
- Monitor and debug agent behavior in production
- Control costs and handle failures gracefully

**The Prize:**
Operating fleets of AI agents should be as routine as deploying a web service or running a Spark job. The company that makes this possible will be foundational infrastructure for the AI era.`,
    category: "ai-infrastructure",
    industryTags: ["AI", "Developer Tools", "Infrastructure", "Enterprise"],
    quarter: "Fall 2025",
    ycPartner: "Pete Koomen",
    originalUrl: "https://www.ycombinator.com/rfs",
  },
  {
    id: "yc-rfs-5",
    title: "The AI-Native Salesforce",
    elevatorPitch:
      "Salesforce and ServiceNow were founded 25 years ago and rode cloud to $200B+ market caps. AI presents the same once-in-a-generation platform shift. Build the enterprise software where AI isn't a feature—it's the foundation. Think Cursor for sales, HR, and finance.",
    fullDescription: `Salesforce and ServiceNow each generate over $10B annually with market caps exceeding $200B. Both were founded around 25 years ago. This isn't coincidence—they rode the cloud computing wave.

**The Pattern:**
Every major platform shift creates the opportunity to rebuild enterprise software from first principles:
- Mainframe → Client-server: Oracle, SAP
- Client-server → Cloud: Salesforce, Workday, ServiceNow
- Cloud → AI-native: ???

**Why Incumbents Will Struggle:**
Salesforce can't become AI-native any more than Oracle could become cloud-native. Their architecture, their business model, their customer base—everything is optimized for the old paradigm. They'll add AI features, but they can't rebuild the foundation.

**What AI-Native Enterprise Software Looks Like:**
Today's enterprise software is a "system of record"—it stores data and lets humans interact with it. AI-native enterprise software is a "system of action"—it uses AI to actually do the work.

Imagine Salesforce rebuilt for AI:
- AI that researches prospects, writes outreach, and schedules meetings—not just tracks them
- A CRM that automatically updates itself based on email and call transcripts
- Forecasting that's actually accurate because AI processes every signal

**The Opportunity:**
Every category of enterprise software will be rebuilt around AI: CRM, HR, finance, IT service management, procurement, customer success. Each is a multi-billion dollar opportunity. The next Salesforce is being founded right now.`,
    category: "ai-infrastructure",
    industryTags: ["Enterprise", "SaaS", "AI", "B2B", "CRM"],
    quarter: "Fall 2025",
    ycPartner: "Andrew Miklas",
    originalUrl: "https://www.ycombinator.com/rfs",
  },
  {
    id: "yc-rfs-6",
    title: "Replace $100B in Government Consulting with AI",
    elevatorPitch:
      "The federal government spends $100B+ annually on consultants from Deloitte, Accenture, and Booz Allen. Most of this work—research, analysis, report writing, process documentation—can now be done by AI. Build software that makes consultants obsolete.",
    fullDescription: `In early 2025, the GSA announced it had canceled approximately 1,700 consulting contracts. The 10 highest-paid consulting firms were on track to receive over $65 billion in fees in 2025 and future years. DOGE identified at least $15 billion in immediate savings from federal consulting contracts alone.

This isn't theoretical waste—it's being cut right now. The question is: what replaces it?

## The Current State of Government Consulting

The numbers are staggering, and now they're public:

| Firm | Contracts Cut | Value |
|------|---------------|-------|
| Deloitte | 129 contracts | $372 million |
| Guidehouse | Multiple | $376 million |
| Accenture | 30 contracts | $240 million |
| Booz Allen Hamilton | 61 contracts | $207 million |
| Pentagon total | Multiple firms | $4 billion |

Deloitte alone earned $4 billion across all federal contracts in 2024. They've now had more contracts terminated or cut back than any other consultancy—more than double the next firm.

The Defense Department found $4 billion in savings by cutting consulting and non-essential contracts, from an initial contract pool valued at $5.1 billion. That's a 78% reduction in what was deemed necessary spending.

## What Consultants Actually Do

Government consulting falls into several categories, each with different AI substitutability:

**Highly Automatable (60-80% of spend):**
- Policy research and analysis
- Report writing and documentation
- Compliance assessments
- Process mapping and optimization
- Data analysis and visualization
- Training material development

**Partially Automatable (15-25% of spend):**
- Strategy development
- Change management
- Stakeholder interviews
- Workshop facilitation

**Hard to Automate (5-15% of spend):**
- Executive relationship management
- Political navigation
- Crisis response
- Hands-on implementation

Most consulting projects involve all three categories, but the first category—the most expensive and time-consuming—is also the most automatable.

## Real-World Scenarios

**Scenario 1: The Policy Analysis**
An agency needs to understand the impact of a proposed regulation. Currently, they hire a consultancy for $2.5M to:
- Review 500 relevant documents (200 hours)
- Interview 30 stakeholders (100 hours)
- Analyze economic impacts (150 hours)
- Write a 200-page report (200 hours)
- Present findings (20 hours)

With AI: The same analysis could be done by 2-3 in-house analysts with AI tools for perhaps $200K total—review happens in days instead of weeks, the report drafts itself, and the analysts focus on judgment calls rather than compilation.

**Scenario 2: The FedRAMP Authorization**
A software company needs FedRAMP authorization to sell to the government. Consultants charge $300K-500K for the documentation and process navigation. With AI-powered compliance tools, the same authorization can be achieved for $50K-100K, with faster turnaround.

**Scenario 3: The Process Improvement Study**
An agency wants to modernize a legacy process. Consultants charge $1.5M to document the current state, identify inefficiencies, recommend improvements, and create implementation plans. AI can generate the documentation automatically from existing systems, identify bottlenecks from data analysis, and produce implementation recommendations—reducing a 6-month project to 6 weeks.

## Why Consultants Are Hard to Replace (And Why That's Changing)

**The Trust Problem**
Government officials hire consultants partly for cover—"McKinsey recommended this" is a defense against criticism. AI doesn't provide that cover... yet.

**The Access Problem**
Consultants have relationships and clearances that take years to build. They know who to call, what to say, and how decisions really get made.

**The Integration Problem**
Many consulting engagements involve hands-on work—sitting in agency offices, attending meetings, navigating bureaucracy in real-time.

**What's Changing:**
- AI outputs are becoming auditable and explainable
- Agencies are developing in-house AI capabilities
- Political cover is shifting toward "we used AI to save money"
- Integration can be handled by smaller, specialized firms augmented by AI

## What's Already Being Built

**Compliance & Authorization:**
- **Andesite** (YC-backed): AI for government compliance
- **RegScale:** Continuous compliance automation
- **Paramify:** FedRAMP automation platform
- **Hyperproof:** Compliance operations platform

**Research & Analysis:**
- **Primer:** AI for intelligence analysis (used by CIA, DoD)
- **Palantir:** Government data platform (now integrating AI)
- **Govini:** AI for federal market intelligence

**Process & Documentation:**
- **Airtable/Monday for Government:** Workflow automation
- **Notion AI / Coda:** AI-powered documentation
- **UiPath:** Government RPA and AI automation

## The Market Opportunity

The direct market is clear:
- **Federal consulting:** $65B+ annually to top 10 firms
- **State and local:** Comparable or larger
- **Total addressable:** $150B+ in government consulting

But the real opportunity is capturing the work that consultants do, not just the dollars they're paid:
- Research and analysis: $30B+ annually
- Documentation and reporting: $20B+ annually
- Compliance and assessment: $15B+ annually
- Training and change management: $10B+ annually

A company that captures 5% of federal consulting work through AI substitution is a $3B+ business.

## What We're Looking For

**1. Compliance Automation**
FedRAMP, FISMA, Authority to Operate (ATO)—turn months of consulting work into weeks of AI-assisted process.

**2. Research & Analysis Platforms**
Give agency analysts the tools to do what they currently outsource. Policy analysis, regulatory impact, cost-benefit assessment.

**3. Documentation & Reporting**
Auto-generate the endless reports, memos, and assessments that agencies require but hate paying consultants to write.

**4. AI-Augmented Small Firms**
Enable a 10-person firm to compete with Deloitte by leveraging AI for the work that used to require armies of analysts.

**5. Specialized Verticals**
Healthcare (HHS, CMS), defense (DoD, VA), financial regulation (Treasury, SEC)—each has unique requirements that generalist tools don't address.

## The Timing

This is a rare moment. Political will to cut consulting spend is at an all-time high. The technology to replace much of what consultants do is mature. Agencies are actively looking for alternatives.

The founders who build AI tools for government now will have massive first-mover advantages—government customers are sticky, and once you're in, you're in for years.`,
    category: "ai-infrastructure",
    industryTags: ["Government", "AI", "Enterprise", "Consulting", "GovTech"],
    quarter: "Fall 2025",
    ycPartner: "Gustaf Alstromer",
    originalUrl: "https://www.ycombinator.com/rfs",
  },
  {
    id: "yc-rfs-7",
    title: "AI-Staffed Companies That Compete With Incumbents",
    elevatorPitch:
      "Don't build AI tools for law firms—build an AI law firm. Don't build AI for accounting—build an AI accounting firm. Use AI to rebuild entire industries from scratch, competing directly against slow-moving incumbents.",
    fullDescription: `The obvious play is to build AI tools that make existing companies more efficient. The ambitious play is to build entirely new companies that compete against incumbents using AI as the core of their operations.

**The Concept:**
Instead of selling software to law firms to help them work faster, build an agentic law firm that handles cases directly. Instead of selling AI to accounting firms, build an AI-native accounting firm that does the work itself.

**Why This Works:**
Incumbents can't adopt AI fast enough. They have:
- Legacy systems and processes
- Entrenched workforces resistant to change
- Business models that depend on billing hours
- Regulatory and compliance concerns that slow everything down

An AI-native competitor has none of these constraints. They can price aggressively, move fast, and optimize ruthlessly.

**Examples:**
- AI law firm handling routine legal work: contract review, trademark filing, incorporations
- AI accounting firm doing bookkeeping, tax prep, and audit support
- AI recruiting firm sourcing, screening, and scheduling candidates
- AI marketing agency producing content, managing campaigns, and optimizing spend

**The Risk:**
This might fail. Regulators might block it. Customers might not trust it. But what are startups if not a way for the market to experiment with ripping up its current operating principles?

**The Upside:**
If it works, you're not selling software for $50K/year—you're competing in multi-trillion dollar service markets. The AI law firm isn't trying to win software deals. It's trying to win legal market share.`,
    category: "moonshots",
    industryTags: ["AI", "Business Model", "Disruption", "Services"],
    quarter: "Summer 2025",
    ycPartner: "Jared Friedman",
    originalUrl: "https://www.ycombinator.com/rfs",
  },
  {
    id: "yc-rfs-8",
    title: "Reinvent the Phone Call with Voice AI",
    elevatorPitch:
      "Phone calls are a $100B+ market that hasn't fundamentally changed in a century. Voice AI can now hold real conversations—scheduling, selling, supporting—with latency and quality indistinguishable from humans. Build the future of voice.",
    fullDescription: `The phone call is one of the oldest pieces of technology still in daily use. And despite 100 years of innovation everywhere else, the basic experience hasn't changed: two people talking, one at a time, with all the scheduling and availability constraints that implies.

**What's Different Now:**
Voice AI has crossed a critical threshold. Modern systems can:
- Speak with natural cadence and emotion
- Understand context and nuance
- Handle interruptions and topic changes
- Remember information across conversations
- Respond with sub-200ms latency

This isn't the robotic IVR systems everyone hates. This is AI that can genuinely converse.

**The Market:**
- Customer service: Handle support calls 24/7 without hold times
- Sales: Qualify leads, schedule demos, follow up automatically
- Healthcare: Patient scheduling, medication reminders, symptom triage
- Appointments: Every business that schedules (dentists, salons, restaurants)
- Outbound: Collections, surveys, appointment confirmations

**Why Now:**
The technology is finally ready. ElevenLabs, Deepgram, and others have solved voice synthesis. OpenAI and Anthropic have solved language understanding. The missing piece is application-layer companies that put it all together for specific use cases.

**The Opportunity:**
Phone-based businesses spend billions on call centers. A single company replacing 10% of those calls represents a massive business. But the bigger opportunity is unlocking calls that never happened—follow-ups that were too expensive, support that wasn't available after hours, sales outreach that couldn't scale.`,
    category: "ai-infrastructure",
    industryTags: ["AI", "Voice", "Customer Service", "B2B", "Communications"],
    quarter: "Summer 2025",
    originalUrl: "https://www.ycombinator.com/rfs",
  },
  {
    id: "yc-rfs-9",
    title: "AI for Scientific Discovery",
    elevatorPitch:
      "Scientific breakthroughs are bottlenecked by human bandwidth—reading papers, running experiments, analyzing data. AI can accelerate discovery 10x in drug development, materials science, chemical engineering, and climate modeling. Build the tools that help scientists discover faster.",
    fullDescription: `AlphaFold solved protein structure prediction in 2020—a problem scientists had worked on for 50 years. This wasn't incremental improvement. It was a discontinuous leap that changed what's possible in biology. More leaps are coming.

**Where AI Can Accelerate Science:**
- **Drug discovery:** AI that designs molecules, predicts interactions, and identifies candidates faster than traditional methods
- **Materials science:** Finding new materials with specific properties (better batteries, stronger alloys, more efficient solar cells)
- **Chemical engineering:** Optimizing processes, reducing waste, improving yields
- **Climate modeling:** More accurate predictions, better understanding of interventions
- **Metals & mining:** Discovering deposits, optimizing extraction, reducing environmental impact

**The Pattern:**
Scientific progress is bottlenecked by human bandwidth. Researchers spend 80% of their time on tasks AI can do:
- Reading and synthesizing literature (thousands of papers per field per year)
- Designing and analyzing experiments
- Processing and interpreting data
- Iterating on hypotheses

AI can compress months of work into hours.

**What to Build:**
Not general-purpose AI tools—domain-specific systems that understand the science:
- AI that speaks the language of chemistry, biology, or materials science
- Systems that can design experiments, not just analyze results
- Tools that integrate with lab equipment and real-world data

**The Stakes:**
The companies that accelerate scientific discovery won't just build profitable businesses—they'll help solve humanity's biggest problems. Climate, disease, energy—all are waiting for breakthroughs that AI can help unlock.`,
    category: "moonshots",
    industryTags: ["AI", "Science", "Biotech", "Energy", "Research"],
    quarter: "Summer 2025",
    originalUrl: "https://www.ycombinator.com/rfs",
  },
  {
    id: "yc-rfs-10",
    title: "The AI Chief of Staff",
    elevatorPitch:
      "CEOs have chiefs of staff. Everyone else has overflowing inboxes and chaotic calendars. Build the AI assistant that actually handles your email, schedules your meetings, and executes your tasks—without creating more work than it saves.",
    fullDescription: `High-performing executives have chiefs of staff—people who handle their email, manage their calendar, filter their requests, and execute tasks on their behalf. This person typically costs $150-300K per year. Everyone else muddles through alone.

**Why Previous Assistants Failed:**
Every AI assistant has promised to "handle your email" and "manage your schedule." They all failed because they created more work than they saved. You had to:
- Correct their mistakes
- Double-check their work
- Explain context they didn't understand
- Clean up messes when they got it wrong

The result: using the assistant took more time than just doing it yourself.

**What's Different Now:**
Modern AI can actually understand context, make judgment calls, and learn your preferences. The pieces are in place for an assistant that genuinely reduces your cognitive load.

**What a Real AI Chief of Staff Does:**
- **Email:** Doesn't summarize—actually responds. Drafts replies in your voice. Flags what truly needs your attention. Handles the rest.
- **Calendar:** Doesn't suggest times—actually schedules. Knows your preferences. Protects your deep work time. Handles reschedules.
- **Tasks:** Doesn't remind you—executes. Books the restaurant. Files the expense report. Sends the follow-up.
- **Information:** Doesn't search—answers. Knows your company, your projects, your context.

**The Bar:**
The test is simple: does using this save time, or does it create work? Previous assistants created work. The AI chief of staff must save time from day one.`,
    category: "ai-infrastructure",
    industryTags: ["AI", "Productivity", "Consumer", "Enterprise", "Assistant"],
    quarter: "Summer 2025",
    originalUrl: "https://www.ycombinator.com/rfs",
  },
  {
    id: "yc-rfs-11",
    title: "Automate Healthcare's $1 Trillion Administrative Burden",
    elevatorPitch:
      "The U.S. healthcare system spends $1 trillion annually on administration—more than any other country spends on healthcare, period. Prior authorization alone wastes 34 hours per physician per week. AI can eliminate this bureaucratic waste and let clinicians focus on patients.",
    fullDescription: `Prior authorization alone costs the U.S. healthcare system $93.3 billion annually. That's not a typo—$93.3 billion spent on a single administrative process that exists primarily to deny or delay care. The average physician practice completes 39 prior authorization requests per week, with staff spending 13 hours on these requests alone.

## The Evidence Is Damning

According to the AMA's 2024 survey of physicians:

- **93%** report that prior authorization causes care delays
- **29%** have seen a serious adverse event (hospitalization, disability, or death) caused by PA delays
- **82%** say patients sometimes abandon treatment entirely due to PA burden
- **89%** say PA significantly increases physician burnout
- **61%** fear AI-powered payer systems will increase denials further

The human cost is staggering. One in four physicians reports that a patient in their care experienced a serious adverse event—permanent impairment, hospitalization, or death—because of prior authorization delays.

## Where the $93.3 Billion Goes

The costs break down across the entire healthcare ecosystem:

| Stakeholder | Annual PA Cost |
|-------------|----------------|
| Patients (delayed/abandoned care) | $35.8 billion |
| Physicians | $26.7 billion |
| Manufacturers | $24.8 billion |
| Payers | $6 billion |

Within physician practices, the burden falls on:
- **Billing/coding specialists:** 11 hours per week on PA
- **Practice managers:** 5 hours per week
- **Nurses:** 3 hours per week
- **Physicians directly:** 1+ hour per week

40% of physicians now have staff who work exclusively on prior authorizations—people whose entire job is navigating insurance bureaucracy.

## Real-World Scenarios

**Scenario 1: The Oncology Practice**
A 200-physician oncology group in Texas employs 47 full-time staff dedicated to prior authorization. That's $2.8M annually in salaries just to get permission to treat cancer patients. Their denial rate? 24%. Their appeal success rate? 78%—meaning most denials are eventually overturned, but only after weeks of delays.

**Scenario 2: The Solo Primary Care Doctor**
Dr. Martinez in rural New Mexico sees 20 patients per day. She spends 2 hours before her first patient and 2 hours after her last patient completing administrative tasks. Her practice manager estimates PA work alone costs her $3,200 annually in lost productivity—not counting the opportunity cost of patients she can't see.

**Scenario 3: The Hospital System**
A 500-bed academic medical center processes 4,200 prior authorizations per month. They've calculated that 18% of PA requests are initially denied, but 73% of denials are overturned on appeal. The hospital employs 23 FTEs dedicated to "peer-to-peer" reviews—essentially, paying physicians to argue with insurance company physicians.

## What's Already Being Built

Several companies are attacking pieces of this problem:

- **Cohere Health:** AI-powered prior authorization platform (raised $106M)
- **Infinitus:** AI agents that handle phone-based PA requests
- **Olive AI:** RPA for healthcare operations (though struggled with focus)
- **Notable Health:** AI-powered workflow automation for health systems
- **Rhyme:** AI for denial management and appeals

But most solutions automate existing workflows rather than eliminating them. The opportunity is to make prior authorization unnecessary—through predictive approvals, real-time eligibility, or regulatory change driven by better data.

## The Market Opportunity

The $93.3B prior authorization market is just the beginning:

- **Total healthcare administrative spending:** $1 trillion+ annually
- **Revenue cycle management:** $140B market
- **Healthcare IT spending:** $280B by 2027
- **Clinical documentation:** $6B market growing 8% annually

A company that captures 1% of prior authorization waste alone is a $933M business. A company that fundamentally reimagines healthcare administration could be worth tens of billions.

## What We're Looking For

The winning companies will:

1. **Start with a wedge:** Pick one painful workflow (PA, denials, coding) and make it 10x better
2. **Generate proprietary data:** Use every interaction to build models that predict approvals, optimize appeals, and identify patterns
3. **Align incentives:** Payers want to reduce costs, providers want to reduce burden—find the solution where both win
4. **Navigate regulation:** The Improving Seniors' Timely Access to Care Act (reintroduced May 2025) could mandate electronic PA for Medicare Advantage—be ready
5. **Think beyond automation:** The goal isn't faster paperwork—it's eliminating paperwork entirely

This isn't about incremental efficiency. It's about giving clinicians back the time they went to medical school to spend: caring for patients.`,
    category: "longevity",
    industryTags: ["Healthcare", "AI", "B2B", "Enterprise", "HealthTech"],
    quarter: "Summer 2025",
    originalUrl: "https://www.ycombinator.com/rfs",
  },
  {
    id: "yc-rfs-12",
    title: "The AI Tutor That Scales to Every Student",
    elevatorPitch:
      "Benjamin Bloom proved in 1984 that one-on-one tutoring improves student performance by 2 standard deviations. But tutors don't scale. Multimodal AI—voice, vision, interactive—can finally deliver personalized tutoring to every student at near-zero marginal cost.",
    fullDescription: `In 1984, educational psychologist Benjamin Bloom published a study showing that students who received one-on-one tutoring performed two standard deviations better than students in conventional classrooms. A student at the 50th percentile with tutoring would perform at the 98th percentile.

This is called the "2 Sigma Problem": we know tutoring works dramatically, but we can't afford to provide it to everyone.

**Why AI Changes This:**
For the first time, we can build tutors that:
- Cost nearly nothing per student
- Are available 24/7
- Never get frustrated or tired
- Adapt to each student's pace and learning style
- Use multiple modalities—text, voice, images, interactive exercises

**What Makes a Good AI Tutor:**
- **Socratic method:** Asks questions rather than giving answers, helping students build understanding
- **Patience:** Explains the same concept 10 different ways if needed
- **Adaptation:** Identifies misconceptions and addresses them directly
- **Engagement:** Makes learning feel like a conversation, not a lecture
- **Multimodal:** Uses diagrams, visualizations, voice—whatever works best for the concept

**The Technical Challenge:**
This isn't just a chatbot with a "tutor" system prompt. Effective tutoring requires:
- Deep domain knowledge
- Understanding of common misconceptions
- Ability to diagnose where a student is stuck
- Strategies for different types of learners

**The Stakes:**
If AI tutors work, every student on Earth could have access to education quality that's currently reserved for the wealthy few. This is one of the highest-impact applications of AI.`,
    category: "creator-economy",
    industryTags: ["Education", "AI", "Consumer", "EdTech", "Learning"],
    quarter: "Summer 2025",
    originalUrl: "https://www.ycombinator.com/rfs",
  },
  {
    id: "yc-rfs-13",
    title: "The Developer Tools Stack for Robotics",
    elevatorPitch:
      "Physical robots are advancing rapidly, but the software is stuck in the 1990s. Robotics needs its 'web development moment'—intuitive tools that let developers build for robots as easily as they build for the browser. Create the React, Vercel, and GitHub for physical automation.",
    fullDescription: `Robotics hardware has made remarkable progress. Boston Dynamics robots do backflips. Tesla's Optimus can fold laundry. Warehouse robots move millions of packages. But the software development experience is decades behind.

**The Current State:**
Building for robots today is like building for the web in 1995:
- Fragmented toolchains with no standard stack
- Complex simulation environments that don't match reality
- Deployment is manual and error-prone
- No good abstractions—everyone reinvents the wheel
- Debugging requires physical access to hardware

**What Robotics Needs:**
Imagine the web development experience applied to robotics:
- **Frameworks:** React/Vue equivalent that abstracts hardware complexity
- **Simulation:** Environments that accurately predict real-world behavior
- **Deployment:** Push-button deployment like Vercel
- **Debugging:** Remote debugging and observability tools
- **Testing:** CI/CD for physical behaviors
- **Marketplace:** Share and reuse robotic capabilities

**Why Now:**
- AI is solving perception and planning—the hard parts of robotics
- Hardware costs are dropping as manufacturing scales
- Labor shortages are creating urgent demand for automation
- Cloud robotics enables new architectures and business models

**The Prize:**
The company that builds the "developer platform for robots" will be as important to physical automation as AWS was to web applications. Every robot in the world will run on their stack.`,
    category: "world-of-atoms",
    industryTags: ["Robotics", "Developer Tools", "AI", "Hardware", "Automation"],
    quarter: "Summer 2025",
    originalUrl: "https://www.ycombinator.com/rfs",
  },
  {
    id: "yc-rfs-14",
    title: "Reinvent Education for 1.5 Billion Students",
    elevatorPitch:
      "1.5 billion students worldwide receive one-size-fits-all education designed for the industrial age. AI enables true personalization—unique learning paths adjusted in real-time for each student. Build the infrastructure for education that actually adapts.",
    fullDescription: `Our education system was designed 150 years ago to produce factory workers. Students sit in rows, receive the same instruction at the same pace, and are tested on memorization. This system persists not because it works, but because we had no alternative.

**What's Wrong:**
- 1.5 billion students learning the same way despite vastly different needs
- Teachers overwhelmed with 30+ students, unable to personalize
- Students bored when material is too easy, lost when it's too hard
- Curriculum optimized for standardized tests, not actual learning
- Massive inequality: wealthy families buy tutors, everyone else falls behind

**What AI Enables:**
True personalization at scale:
- **Adaptive pacing:** Move faster through concepts you grasp, slower through ones you don't
- **Multiple explanations:** Learn from whichever approach clicks—visual, verbal, hands-on
- **Immediate feedback:** Know what you got wrong and why, instantly
- **Curiosity-driven:** Follow tangents and interests without holding back the class
- **Mastery-based:** Don't move on until you actually understand

**What to Build:**
Not just tutoring apps—the full infrastructure for personalized education:
- Curriculum systems that adapt in real-time
- Assessment tools that measure understanding, not memorization
- Teacher tools that amplify human educators
- Content platforms with infinite explanations of every concept

**The Vision:**
Education that treats every student as an individual. Where a kid in rural India gets the same quality of instruction as a kid at an elite prep school. Where teachers are freed from lecturing to focus on mentorship and support.

This is one of the most important things anyone could build.`,
    category: "creator-economy",
    industryTags: ["Education", "AI", "Consumer", "Global", "EdTech"],
    quarter: "Summer 2025",
    originalUrl: "https://www.ycombinator.com/rfs",
  },
  {
    id: "yc-rfs-15",
    title: "Commercial-Grade AI Security for Every Home",
    elevatorPitch:
      "The $20B home security market is stuck on motion sensors and grainy cameras. Commercial buildings have AI that distinguishes threats from false alarms. Bring that intelligence to every home—security that recognizes faces, detects anomalies, and actually protects.",
    fullDescription: `Home security technology is laughably primitive compared to what's available commercially. Businesses have AI-powered systems that recognize employees, detect unusual behavior, and integrate with access control. Homes have motion sensors that trigger when a cat walks by.

**The Current State:**
- 98% false alarm rate on motion sensors
- Cameras that record but don't understand what they're seeing
- Security guards who cost $50K/year per location
- Systems that alert you to problems but can't prevent them

**What AI Enables:**
- **Recognition:** Know the difference between family, expected visitors, and strangers
- **Context:** Understand that a delivery person at 2pm is normal; the same person at 2am is not
- **Anomaly detection:** Notice the window that's usually closed is open, or the car that's been parked outside for three days
- **Predictive:** Alert to suspicious behavior before anything happens
- **Integration:** Coordinate cameras, locks, lights, and alarms as a single system
- **Response:** Automatically alert authorities with useful information, not just "motion detected"

**The Market:**
$20B in home security in the US alone, dominated by ADT and other legacy players with 30-year-old technology. Customers pay $30-50/month for systems that cry wolf constantly.

**Why Now:**
Computer vision models are good enough. Edge computing is cheap enough. The missing piece is a company that integrates AI throughout the entire security experience—not just a camera with AI bolted on.`,
    category: "ai-infrastructure",
    industryTags: ["Security", "AI", "Consumer", "Hardware", "IoT"],
    quarter: "Summer 2025",
    originalUrl: "https://www.ycombinator.com/rfs",
  },
  {
    id: "yc-rfs-16",
    title: "Let Anyone Build AI Automation",
    elevatorPitch:
      "Every employee does repetitive tasks that should be automated. But they can't code, and IT is backlogged for months. Build the platform where anyone can create AI agents for their specific workflows—no-code for the AI agent era.",
    fullDescription: `Every company has the same pattern: employees doing repetitive tasks that everyone knows should be automated. Someone manually copies data between systems. Someone formats the same report every week. Someone responds to the same customer questions over and over.

**Why It Doesn't Get Automated:**
- IT is backlogged for months
- Custom development is expensive
- Existing automation tools require technical skills
- By the time something gets built, requirements have changed

**The Vision:**
A platform where any employee—not just developers—can create AI agents for their specific workflows:

- Marketing coordinator builds an agent that monitors competitor pricing daily
- Account manager creates an agent that drafts personalized follow-ups after calls
- Operations lead builds an agent that reconciles inventory across systems
- HR manager creates an agent that screens resumes and schedules interviews

**What's Different From No-Code:**
Traditional no-code tools let you build deterministic workflows: if this, then that. AI agents can handle ambiguity—tasks where the "rules" are too complex to specify but easy enough for a human (or AI) to figure out.

**The Technical Challenge:**
- Natural language interface for defining what agents should do
- Sandboxed execution that can't cause damage
- Observability so users understand what their agents are doing
- Guardrails that prevent agents from going off the rails
- Collaboration features so teams can share and improve agents

**The Opportunity:**
Every employee becomes a developer of AI agents. The company that enables this captures value from millions of automated workflows across every industry.`,
    category: "future-of-work",
    industryTags: ["AI", "Enterprise", "No-Code", "Productivity", "Automation"],
    quarter: "Summer 2025",
    originalUrl: "https://www.ycombinator.com/rfs",
  },
  {
    id: "yc-rfs-17",
    title: "Voice-First Email",
    elevatorPitch:
      "Knowledge workers spend 2+ hours daily in email, much of it while commuting, exercising, or doing chores. Voice AI can now process email hands-free—triage, respond, and organize through conversation. Build the interface that liberates people from their inboxes.",
    fullDescription: `Email is a tyrant. It demands constant attention. It interrupts deep work. It fills time that could be spent on things that matter. And yet, most of it is low-value: updates that need acknowledgment, questions with obvious answers, coordination that could be automated.

**The Insight:**
Much of email processing doesn't require a screen:
- "What's in my inbox?" — can be spoken
- "Reply to Sarah saying I'll be 10 minutes late" — can be spoken
- "Archive everything from newsletters this week" — can be spoken
- "Summarize the thread with the client" — can be spoken

**What Voice-First Email Looks Like:**
- Morning briefing: "You have 47 new emails. 3 need your attention. The rest are FYIs and newsletters."
- Triage by voice: "The email from Mike asks about budget approval. Should I approve it, ask for more details, or flag for your review?"
- Draft responses: Have a conversation to compose replies without typing
- Background processing: Listen while commuting or walking the dog

**Why Now:**
- Voice recognition is near-perfect
- Voice synthesis sounds natural
- LLMs can understand email context and draft appropriate responses
- Wireless earbuds are everywhere

**The Challenge:**
This has to be better than the current experience, not just different. Voice email that requires constant correction or creates more work will fail. It needs to be so good that people prefer it to typing.

**The Opportunity:**
Email isn't going away. But the interface is ripe for reinvention. The company that makes email genuinely easier will have hundreds of millions of users.`,
    category: "future-of-work",
    industryTags: ["AI", "Voice", "Productivity", "Consumer", "Email"],
    quarter: "Summer 2025",
    originalUrl: "https://www.ycombinator.com/rfs",
  },
  {
    id: "yc-rfs-18",
    title: "Democratize Financial Advice",
    elevatorPitch:
      "Wealthy families pay 1% of assets for financial advisors. Everyone else gets generic tips and conflicted recommendations. AI can deliver personalized, unbiased financial guidance at near-zero cost—budgeting, investing, tax planning, and more. Build the advisor for the 90%.",
    fullDescription: `Financial advisory is a $75B industry in the US alone, but it serves almost exclusively the wealthy. To get a good financial advisor, you typically need $250K+ in investable assets. Everyone else is left with generic advice, product-pushing salespeople, or nothing at all.

**The Problem:**
- Financial advisors charge 1% of assets annually ($10K/year on $1M)
- Minimum investment thresholds exclude most people
- Many "advisors" are actually salespeople paid to push specific products
- Robo-advisors handle basic investing but not comprehensive planning

**What People Actually Need:**
Financial advice isn't just "which stocks to buy." It's:
- Am I saving enough for retirement? How do I know?
- Should I pay off my mortgage or invest?
- How do I optimize my tax situation?
- What insurance do I actually need?
- Should I rent or buy?
- How should I think about my stock options?
- My parent needs care—how do I plan for this?

**What AI Enables:**
- Truly personalized advice based on your complete financial picture
- No conflicts of interest—AI doesn't get commissions
- Available 24/7 for questions as they arise
- Adapts to changing circumstances (job change, new baby, inheritance)
- Proactive suggestions ("Your emergency fund is low—here's how to fix it")
- Cost that scales: same quality advice whether you have $10K or $10M

**The Opportunity:**
The 90% of households who can't afford traditional advisors still need help. Many are making expensive mistakes—carrying high-interest debt, under-saving for retirement, overpaying on taxes. AI can give them the guidance they need at a price they can afford.`,
    category: "rebuild-money",
    industryTags: ["Fintech", "AI", "Consumer", "Personal Finance", "Advisory"],
    quarter: "Summer 2025",
    originalUrl: "https://www.ycombinator.com/rfs",
  },
]

/**
 * Get YC RFS author data
 */
export const ycAuthor = {
  name: "Y Combinator",
  username: "ycombinator",
  avatar: "/images/yc-logo.png",
  verified: true,
  badge: "YC RFS",
  profileUrl: "https://www.ycombinator.com/rfs",
  isAnonymous: false,
}

/**
 * Transform YC problem to database format
 */
export function transformYCProblem(problem: YCProblem) {
  return {
    id: problem.id,
    title: problem.title,
    elevatorPitch: problem.elevatorPitch,
    fullDescription: problem.fullDescription,
    category: problem.category,
    categorySlug: problem.category,
    author: ycAuthor,

    // YC-specific metadata
    source: "YC RFS",
    quarter: problem.quarter,
    ycPartner: problem.ycPartner,
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
    createdAt: new Date(),

    // Flags
    isYCRFS: true,
    isEditable: false, // YC problems cannot be edited
    isForkable: true, // But they can be forked
  }
}
