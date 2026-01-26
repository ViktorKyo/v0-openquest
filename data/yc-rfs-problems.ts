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
  quarter: "Fall 2025" | "Summer 2025" | "Spring 2025" | "Winter 2025"
  ycPartner?: string
  originalUrl: string
}

export const ycRfsProblems: YCProblem[] = [
  // Fall 2025 Problems
  {
    id: "yc-rfs-1",
    title: "AI-powered vocational schools for the physical infrastructure workforce",
    elevatorPitch:
      "The AI revolution needs electricians, HVAC technicians, and welders to build data centers and semiconductor fabs. We have a massive skilled trades shortage. Build AI-powered training programs that get people job-ready in months, not years.",
    fullDescription: `We talk a lot about the AI revolution in terms of models, chips, and software. But to make it a reality, there needs to be a huge buildout of physical infrastructure like data centers and semiconductor fabs.

And that's where we have a problem. While we're focused on the race for AI talent, we also have a shortage of skilled tradespeople—the electricians, the HVAC technicians, the welders—who are essential to building this physical infrastructure.

**The Opportunity:**
- The government's AI Action plan creates a forcing function with emphasis on a "worker-first" agenda
- Departments of Labor and Commerce are funding rapid retraining programs
- Employers would pay to hire well-trained workers
- AI tutoring could scale where human tutors cannot

**The Challenge:**
How do you teach someone to weld or fix pipes via AI? Unlike coding, you can't learn these skills by typing on a keyboard. This is where multimodal AI could create opportunities—voice AI coaching, AR/VR simulation with AI tutors using vision models for feedback.`,
    category: "future-of-work",
    industryTags: ["Education", "AI", "Workforce", "Hardware"],
    quarter: "Fall 2025",
    ycPartner: "Harj Taggar",
    originalUrl: "https://www.ycombinator.com/rfs",
  },
  {
    id: "yc-rfs-2",
    title: "Build on generative video as a new computing primitive",
    elevatorPitch:
      "Video generation models now produce 8-second photorealistic clips for dollars. Soon, near-perfect footage of anything will cost nearly $0. Video becomes a basic building block for software. Build the apps, tooling, and infrastructure for this new world.",
    fullDescription: `Google's Veo 3 already produces 8-second, photorealistic, sound-on clips often indistinguishable from reality. Soon, you'll be able to generate near-perfect footage of anything, on the fly, for marginal cost approaching zero.

**What This Unlocks:**
- **Media & Entertainment:** New seasons of canceled TV shows, personalized kids cartoons starring your family, AI-native TikTok where every video is made for exactly one viewer
- **Commerce:** See yourself wearing clothes while shopping, your furniture auto-staged in apartment listings
- **Gaming & Simulation:** Video games built with no game engine, APIs for infinite robotic training data, video calls with loved ones long after they're gone

We're interested in founders who treat generative video as a new computing primitive—not an output—and build new apps, tooling, and infrastructure for a world with limitless, low-latency video.`,
    category: "ai-infrastructure",
    industryTags: ["AI", "Media", "Gaming", "Developer Tools"],
    quarter: "Fall 2025",
    ycPartner: "David Lieb",
    originalUrl: "https://www.ycombinator.com/rfs",
  },
  {
    id: "yc-rfs-3",
    title: "Build a $100B company with 10 people or fewer",
    elevatorPitch:
      "AI tools now let small, high-agency teams build multi-billion dollar companies with minimal capital. Just as cloud eliminated server costs, AI eliminates headcount costs. Build the first 10-person, $100B company by optimizing for revenue per employee.",
    fullDescription: `Thanks to new AI tools, we believe it's now possible for small, high-agency teams—even solo founders—to build multi-billion dollar companies with as little as just $500k in funding.

**Why Now:**
15 years ago, cloud computing eliminated the need for physical server infrastructure, making it easier to build big companies with way less capital. This is happening again with AI tools that make it easier to scale with far fewer people.

**The Advantage:**
These small teams won't get bogged down with politics, excessive meetings, and lack of focus that grinds huge companies to a halt. They can just focus on winning with better speed and execution.

The best high-agency startups of the future will all optimize for one metric: **revenue per employee**.`,
    category: "moonshots",
    industryTags: ["AI", "Startups", "Business Model"],
    quarter: "Fall 2025",
    ycPartner: "Aaron Epstein",
    originalUrl: "https://www.ycombinator.com/rfs",
  },
  {
    id: "yc-rfs-4",
    title: "Build infrastructure for distributed multi-agent AI workflows",
    elevatorPitch:
      "AI agents are evolving from single-threaded loops into distributed workflows with hundreds of thousands of sub-agents. These systems require solving traditional distributed systems problems plus new challenges like prompt engineering at scale and debugging agent behavior.",
    fullDescription: `AI agents are evolving from single-threaded loops into distributed workflows that fan out many sub-agent calls in a single run. These multi-agent systems are useful for everything from long-running workflows to agentic mapreduce jobs where hundreds of thousands of subagents apply human-level judgment to filter and search through large amounts of data in parallel.

**The Challenges:**
These systems are difficult to build. They require solving traditional distributed systems problems to ensure high throughput and reliability while controlling costs. They also introduce new problems:
- How to write effective agent and subagent prompts
- How to handle untrusted context
- How to monitor and debug these agents

We're looking for builders who have felt this pain in production and want to make operating fleets of agents as routine and reliable as deploying a web service or running a Spark job.`,
    category: "ai-infrastructure",
    industryTags: ["AI", "Developer Tools", "Infrastructure"],
    quarter: "Fall 2025",
    ycPartner: "Pete Koomen",
    originalUrl: "https://www.ycombinator.com/rfs",
  },
  {
    id: "yc-rfs-5",
    title: "Build the AI-native Salesforce or ServiceNow",
    elevatorPitch:
      "Salesforce and ServiceNow were founded 25 years ago and rode the cloud wave to $200B+ market caps each. AI presents the same once-in-a-generation opportunity. Build enterprise software with AI embedded deeply throughout—think Cursor for sales, HR, and accounting.",
    fullDescription: `Salesforce and ServiceNow are two of the world's largest enterprise software vendors, each making more than $10B a year in revenue, each with market caps over $200B. Both were founded about 25 years ago. Coincidence? No.

**The Pattern:**
Salesforce built the first cloud-native CRM. ServiceNow built the first cloud-native ITSM. Both rode cloud computing to victory over incumbents. The same happened with NetSuite, Successfactors, and dozens of other B2B startups from the early 2000s.

**The Opportunity:**
AI presents the same once-in-a-generation opportunity. Tomorrow's enterprise software won't just be the "system of record" for human work. They'll have AI embedded deeply and thoughtfully throughout, helping employees work faster and more accurately.

Just as before, today's incumbents will struggle to rebuild around this new technology, giving startups the time they need to win. History doesn't repeat itself, but it sure does rhyme.`,
    category: "ai-infrastructure",
    industryTags: ["Enterprise", "SaaS", "AI", "B2B"],
    quarter: "Fall 2025",
    ycPartner: "Andrew Miklas",
    originalUrl: "https://www.ycombinator.com/rfs",
  },
  {
    id: "yc-rfs-6",
    title: "Replace $100B in government consulting with LLM software",
    elevatorPitch:
      "The U.S. government spends over $100B annually on consulting—not efficient or innovative. With political pressure to cut waste, software-driven government, and LLMs good enough to do consulting work, there's a massive opportunity to build software that replaces Deloitte and Accenture.",
    fullDescription: `The U.S. government spends over $100 billion a year on consulting. As you might imagine, this isn't the most efficient or innovative part of our economy.

**Why Now:**
- Political pressure to cut wasteful consulting and spending
- Every part of government now runs on software (usually custom software built by consulting companies)
- Anyone who has used government software knows we can do a lot better
- LLMs today are so good they can already do the jobs of many consulting firms

**Recent Traction:**
We've funded companies that help companies get FedRAMP approved to sell to government. We've funded companies that help government cut regulation and ensure laws are actually legal.

We think there's a lot more work that government consulting firms do that LLM software could replace.`,
    category: "ai-infrastructure",
    industryTags: ["Government", "AI", "Enterprise", "Consulting"],
    quarter: "Fall 2025",
    ycPartner: "Gustaf Alstromer",
    originalUrl: "https://www.ycombinator.com/rfs",
  },

  // Summer 2025 Problems
  {
    id: "yc-rfs-7",
    title: "Start an AI-staffed company to disrupt slow-moving incumbents",
    elevatorPitch:
      "Don't just build AI tools—build entire AI-native companies. Completely rethink legacy industries by using AI-native operations, rebuilding entire product or service categories from scratch. Be the AI law firm, not the tool for law firms.",
    fullDescription: `The opportunity isn't just to build AI tools that help existing companies. It's to build entirely new companies that use AI from the ground up to compete against slow-moving incumbents.

**The Concept:**
These companies can completely rethink legacy industries by using AI-native operations, rebuilding entire product or service categories from scratch.

**Example:**
Instead of building software that helps lawyers work faster, build an agentic legal firm that handles cases directly. It might fail—but what are startups if not a way for the market to experiment at ripping up its current operating principles?`,
    category: "moonshots",
    industryTags: ["AI", "Business Model", "Disruption"],
    quarter: "Summer 2025",
    ycPartner: "Jared Friedman",
    originalUrl: "https://www.ycombinator.com/rfs",
  },
  {
    id: "yc-rfs-8",
    title: "Reinvent phone calls with voice AI",
    elevatorPitch:
      "Phone calls haven't changed in 100 years. Advances in voice synthesis, recognition, and contextual understanding now make it possible to create intelligent agents that hold real conversations. Build the future of voice communication.",
    fullDescription: `Voice AI has reached a tipping point. The technology for natural conversation is finally here.

**The Opportunity:**
Phone calls are a $100B+ market that hasn't fundamentally changed in a century. Voice AI can now:
- Handle customer service at scale
- Schedule appointments
- Conduct sales calls
- Provide 24/7 availability
- Remember context across conversations

This isn't about robotic phone trees. It's about AI that can truly converse.`,
    category: "ai-infrastructure",
    industryTags: ["AI", "Voice", "Customer Service", "B2B"],
    quarter: "Summer 2025",
    originalUrl: "https://www.ycombinator.com/rfs",
  },
  {
    id: "yc-rfs-9",
    title: "Use AI to accelerate scientific breakthroughs",
    elevatorPitch:
      "Use AI to solve complex problems in drug discovery, chemical process optimization, metals & mining, or power grid optimization. AI can unlock insights in scientific domains that traditionally require years of experimentation and modeling.",
    fullDescription: `Science is ripe for AI-driven acceleration.

**Target Domains:**
- Drug discovery and development
- Chemical process optimization
- Metals and mining operations
- Power grid optimization
- Materials science
- Climate modeling

Founders can use AI to unlock insights in scientific domains that traditionally require years of experimentation and modeling. The goal is 10x faster discovery cycles.`,
    category: "moonshots",
    industryTags: ["AI", "Science", "Biotech", "Energy"],
    quarter: "Summer 2025",
    originalUrl: "https://www.ycombinator.com/rfs",
  },
  {
    id: "yc-rfs-10",
    title: "Build a true AI chief of staff for everyone",
    elevatorPitch:
      "Create systems that truly handle your emails, scheduling, and tasks without supervision. The goal: a seamless assistant that acts like a chief of staff, freeing people from the cognitive load of daily management.",
    fullDescription: `Everyone needs a chief of staff. Almost no one has one.

**The Vision:**
An AI assistant that:
- Actually handles your email (not just summarizes it)
- Schedules meetings without back-and-forth
- Executes tasks autonomously
- Learns your preferences over time
- Requires minimal supervision

Previous assistants failed because they created more work than they saved. The new generation of AI makes true autonomous assistance possible.`,
    category: "ai-infrastructure",
    industryTags: ["AI", "Productivity", "Consumer", "B2B"],
    quarter: "Summer 2025",
    originalUrl: "https://www.ycombinator.com/rfs",
  },
  {
    id: "yc-rfs-11",
    title: "Automate the $1T+ in healthcare administrative costs",
    elevatorPitch:
      "The U.S. healthcare system spends over $1 trillion annually on administration. AI can streamline everything from billing to documentation to prior authorization. Fix the deep inefficiencies that plague healthcare.",
    fullDescription: `Administrative costs consume over 30% of U.S. healthcare spending—more than $1 trillion annually.

**The Opportunity:**
AI startups can streamline:
- Medical billing and coding
- Clinical documentation
- Prior authorization
- Insurance claims processing
- Patient scheduling
- Revenue cycle management

Every doctor, nurse, and administrator spends hours on paperwork instead of patients. AI can give that time back.`,
    category: "longevity",
    industryTags: ["Healthcare", "AI", "B2B", "Enterprise"],
    quarter: "Summer 2025",
    originalUrl: "https://www.ycombinator.com/rfs",
  },
  {
    id: "yc-rfs-12",
    title: "Deliver personalized education through multimodal AI",
    elevatorPitch:
      "Adaptive learning tools powered by AI can provide instant, tailored feedback and instruction in a way human tutors cannot scale. Build the AI tutor that explains complex topics with multimodal explanations customized to each learner.",
    fullDescription: `The best education is 1:1 tutoring. But tutors don't scale.

**The Opportunity:**
AI tutors can:
- Adapt explanations to individual learning styles
- Use text, voice, images, and video
- Provide instant feedback
- Track progress and adjust difficulty
- Be available 24/7
- Cost nearly nothing at the margin

Every student deserves a patient, expert tutor. AI makes this possible.`,
    category: "creator-economy",
    industryTags: ["Education", "AI", "Consumer", "EdTech"],
    quarter: "Summer 2025",
    originalUrl: "https://www.ycombinator.com/rfs",
  },
  {
    id: "yc-rfs-13",
    title: "Build the software stack for robotics",
    elevatorPitch:
      "Robotics is waiting for its \"ChatGPT moment.\" Build the software foundation—intuitive interfaces, general-purpose programming environments, and development tools that make building for robots as easy as building for the web.",
    fullDescription: `Physical robots are becoming more capable every month. But the software is stuck in the past.

**What's Needed:**
- Intuitive programming environments
- General-purpose interfaces for robot control
- Simulation and testing frameworks
- Deployment and fleet management
- AI integration for perception and planning

The company that builds the "developer tools for robots" will be massive.`,
    category: "world-of-atoms",
    industryTags: ["Robotics", "Developer Tools", "AI", "Hardware"],
    quarter: "Summer 2025",
    originalUrl: "https://www.ycombinator.com/rfs",
  },
  {
    id: "yc-rfs-14",
    title: "Reshape how 1.5 billion students learn",
    elevatorPitch:
      "Education is ripe for reinvention using AI to give each learner a unique path, adjusted in real-time to their progress and needs. Build the infrastructure for personalized learning at global scale.",
    fullDescription: `1.5 billion students globally. Most receive one-size-fits-all education.

**The Vision:**
AI-powered education systems that:
- Create personalized learning paths
- Adjust in real-time based on comprehension
- Make learning engaging through interactivity
- Provide access to quality education anywhere
- Free teachers to focus on mentorship

This isn't incremental improvement—it's rebuilding education from first principles.`,
    category: "creator-economy",
    industryTags: ["Education", "AI", "Consumer", "Global"],
    quarter: "Summer 2025",
    originalUrl: "https://www.ycombinator.com/rfs",
  },
  {
    id: "yc-rfs-15",
    title: "Bring commercial-grade AI security to homes",
    elevatorPitch:
      "The $20B home security market is ripe for AI disruption. Smart devices with AI can provide 24/7 protection, anomaly detection, and intelligent decision-making that reduces false alarms and increases peace of mind.",
    fullDescription: `Home security is stuck in the past—motion sensors, basic cameras, and security guards.

**The Opportunity:**
AI-powered home security can:
- Distinguish between threats and false alarms
- Recognize residents, visitors, and strangers
- Monitor for anomalies (broken windows, water leaks, unusual activity)
- Coordinate with emergency services
- Provide commercial-grade protection at consumer prices

The $20B market is waiting for an AI-native solution.`,
    category: "ai-infrastructure",
    industryTags: ["Security", "AI", "Consumer", "Hardware"],
    quarter: "Summer 2025",
    originalUrl: "https://www.ycombinator.com/rfs",
  },
  {
    id: "yc-rfs-16",
    title: "Let employees build their own AI automation",
    elevatorPitch:
      "Non-technical employees should be able to build their own custom workflows and automations using intuitive AI interfaces. Create tools that let anyone in a company automate their repetitive tasks without engineering help.",
    fullDescription: `Every company has employees doing repetitive tasks that could be automated. But they can't code.

**The Opportunity:**
Build platforms that let any employee:
- Create AI agents for their specific workflows
- Automate data entry, reporting, and coordination
- Build without writing code
- Share agents with their team
- Iterate based on real-world results

This is "no-code" for the AI agent era.`,
    category: "future-of-work",
    industryTags: ["AI", "Enterprise", "No-Code", "Productivity"],
    quarter: "Summer 2025",
    originalUrl: "https://www.ycombinator.com/rfs",
  },
  {
    id: "yc-rfs-17",
    title: "Process email hands-free through voice",
    elevatorPitch:
      "Build voice interfaces that let people process emails hands-free. Voice-based summarization, response drafting, and prioritization could fundamentally change how we interact with our inboxes.",
    fullDescription: `Email is broken. Most knowledge workers spend 2+ hours daily in their inbox.

**The Opportunity:**
Voice-first email interfaces can:
- Summarize the day's important messages
- Draft responses through conversation
- Prioritize what needs attention
- Work while commuting or exercising
- Integrate with calendar and tasks

Email by voice isn't sci-fi anymore—it's possible now.`,
    category: "future-of-work",
    industryTags: ["AI", "Voice", "Productivity", "Consumer"],
    quarter: "Summer 2025",
    originalUrl: "https://www.ycombinator.com/rfs",
  },
  {
    id: "yc-rfs-18",
    title: "Provide unbiased financial advice at near-zero cost",
    elevatorPitch:
      "Quality financial advice is expensive and often conflicted. LLMs can now automate personalized money coaching—helping users save, invest, and plan with high trust and accessibility. Democratize financial guidance.",
    fullDescription: `Financial advisors charge 1% of assets annually. Most people can't afford good advice.

**The Opportunity:**
AI financial advisors can:
- Provide unbiased, fiduciary-level guidance
- Cost nearly nothing per user
- Personalize to individual situations
- Help with budgeting, investing, tax planning
- Serve the 90% who can't afford traditional advisors

This democratizes access to financial expertise.`,
    category: "rebuild-money",
    industryTags: ["Fintech", "AI", "Consumer", "Personal Finance"],
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
