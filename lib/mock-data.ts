/**
 * OpenQuest Mock Data
 * Centralized mock data for development and testing
 */

import type { Problem, Comment, User, Category } from "./types";

// ===== MOCK USERS =====

export const mockUsers: User[] = [
  {
    id: "user1",
    username: "alexj",
    email: "alex@example.com",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=alexj",
    bio: "AI researcher, open source advocate",
    twitterHandle: "alexj",
    reputation: 450,
    createdAt: new Date("2024-11-01"),
  },
  {
    id: "user2",
    username: "sarahm",
    email: "sarah@example.com",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarahm",
    bio: "Climate journalist, investigative reporter",
    twitterHandle: "sarahm",
    reputation: 320,
    createdAt: new Date("2024-11-15"),
  },
  {
    id: "user3",
    username: "mikec",
    email: "mike@example.com",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=mikec",
    bio: "Former electrician, now building tools for trades",
    reputation: 280,
    createdAt: new Date("2024-12-01"),
  },
  {
    id: "user4",
    username: "jenl",
    email: "jen@example.com",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=jenl",
    bio: "3x founder, startup advisor",
    linkedinUrl: "https://linkedin.com/in/jenl",
    reputation: 510,
    createdAt: new Date("2024-10-20"),
  },
];

// ===== MOCK PROBLEMS =====

export const mockProblems: Problem[] = [
  {
    id: "1",
    title: "Open source LLM benchmark that actually matters",
    elevatorPitch:
      "Current benchmarks like MMLU don't predict real-world performance. We need benchmarks that measure what users actually care about: helpfulness, safety, and real-world reasoning.",
    fullDescription: `The AI community is obsessed with benchmarks that don't matter. MMLU, GSM8K, and similar tests measure academic knowledge, not practical usefulness.

**The Problem:**
- Models can ace benchmarks but fail at simple real-world tasks
- Benchmarks are gameable (contamination, overfitting)
- No measurement of what users value: helpfulness, honesty, harmlessness

**What's Needed:**
- Human preference-based eval suite
- Tasks that mirror real user queries (coding, writing, analysis)
- Open source, community-driven, regularly updated
- Anti-gaming measures (hidden test sets, adversarial examples)

**Market:**
- Every AI lab needs this for model development
- Enterprises need it for vendor selection
- Open source community needs transparency

**Similar attempts:** HELM, AlpacaEval, Chatbot Arena (but none are comprehensive enough)`,
    category: "AI & infrastructure",
    industryTags: ["AI", "Open Source", "Developer Tools"],
    isAnonymous: false,
    author: {
      id: "user1",
      username: "alexj",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=alexj",
    },
    authorInvolvement: "just_sharing",
    upvotes: 142,
    commentCount: 23,
    builderCount: 5,
    investorCount: 12,
    followerCount: 34,
    status: "published",
    createdAt: new Date("2025-01-15T10:30:00"),
    updatedAt: new Date("2025-01-15T10:30:00"),
  },
  {
    id: "2",
    title: "Coordinating medical care for aging parents",
    elevatorPitch:
      'Managing doctor appointments, prescriptions, insurance, and medical records for elderly parents is a nightmare. There needs to be a "command center" app for elder care coordination.',
    fullDescription: `As the sandwich generation, millions are caring for aging parents while raising kids. Medical coordination is chaos.

**Pain Points:**
- 5+ different doctor portals with different logins
- Paper prescriptions lost between pharmacy and home
- Insurance claims that make no sense
- Missed appointments because mom forgot
- No single view of medical history
- Siblings not in sync on care decisions

**What's Needed:**
- Unified dashboard for all providers
- Medication reminders + refill automation
- Appointment scheduling + transportation coordination
- Medical record aggregation (FHIR integration)
- Family collaboration tools (shared notes, decisions)
- Insurance claim tracking

**Market Size:**
- 53M+ family caregivers in US
- Average spend: $7K/year on elder care
- Growing rapidly as boomers age

**Willingness to Pay:**
I'd pay $50/month for this. So would my siblings.`,
    category: "Longevity",
    industryTags: ["Healthcare", "Consumer", "SaaS"],
    isAnonymous: true,
    author: null,
    authorInvolvement: "just_sharing",
    upvotes: 89,
    commentCount: 15,
    builderCount: 3,
    investorCount: 8,
    followerCount: 21,
    status: "published",
    createdAt: new Date("2025-01-14T14:20:00"),
    updatedAt: new Date("2025-01-14T14:20:00"),
  },
  {
    id: "3",
    title: "Better tools for climate journalists",
    elevatorPitch:
      "Climate reporters waste hours digging through datasets, academic papers, and government reports. We need specialized tools to help them find stories faster and verify claims.",
    fullDescription: `Climate journalism is critical but under-resourced. Reporters need better tools.

**Current Problems:**
- Data scattered across EPA, NOAA, NASA, universities
- No easy way to verify corporate climate claims
- Hard to find local climate impacts for stories
- Academic papers written for scientists, not journalists
- Fact-checking takes forever

**What Would Help:**
- Searchable database of climate datasets with plain-English summaries
- Corporate greenwashing detector (checks claims vs actual data)
- Local climate impact tool (show how climate change affects specific zip codes)
- Academic paper summarizer trained on climate science
- Real-time alerts for major climate events/studies

**Who'd Use It:**
- Every major newsroom's climate desk
- Freelance climate journalists
- Fact-checkers
- Environmental advocates

**Business Model:**
- Freemium for individuals
- Enterprise licenses for newsrooms ($500-2K/month)
- Could be grant-funded initially`,
    category: "Climate tech",
    industryTags: ["Media", "Climate", "SaaS"],
    isAnonymous: false,
    author: {
      id: "user2",
      username: "sarahm",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarahm",
    },
    authorInvolvement: "want_to_build",
    upvotes: 67,
    commentCount: 12,
    builderCount: 2,
    investorCount: 5,
    followerCount: 18,
    status: "published",
    createdAt: new Date("2025-01-13T09:15:00"),
    updatedAt: new Date("2025-01-13T09:15:00"),
  },
  {
    id: "4",
    title: "LinkedIn for blue-collar workers",
    elevatorPitch:
      "Electricians, plumbers, and tradespeople have no good way to build professional reputation online. Create a platform where they can showcase work, get referrals, and find better jobs.",
    fullDescription: `LinkedIn is for white-collar workers. 45M+ skilled tradespeople in the US have nothing.

**The Gap:**
- No place to build professional portfolio (photos of work, certifications)
- Referrals happen through word-of-mouth only
- Hard to find good contractors as a consumer
- No professional networking for tradespeople

**What's Needed:**
- Profile with work photos, certs, reviews
- Job board for skilled trades
- Contractor discovery for homeowners
- Networking + mentorship for trade workers
- Training/upskilling marketplace

**Market:**
- 45M+ tradespeople in US
- $1.6T+ industry
- Huge shortage of skilled workers

**Monetization:**
- Job postings
- Premium profiles
- Lead generation for contractors
- Training courses`,
    category: "Future of work",
    industryTags: ["Jobs", "Blue Collar", "Marketplace"],
    isAnonymous: false,
    author: {
      id: "user3",
      username: "mikec",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=mikec",
    },
    authorInvolvement: "already_building",
    upvotes: 156,
    commentCount: 31,
    builderCount: 8,
    investorCount: 15,
    followerCount: 45,
    status: "published",
    createdAt: new Date("2025-01-12T16:45:00"),
    updatedAt: new Date("2025-01-12T16:45:00"),
  },
  {
    id: "5",
    title: "Better way to split equity in early-stage startups",
    elevatorPitch:
      "Founding teams spend weeks negotiating equity splits and often get it wrong. Build a tool that helps founders split equity fairly based on contribution, role, and risk.",
    fullDescription: `Equity splits are one of the biggest sources of co-founder conflict. Current tools suck.

**Problems:**
- Slicing Pie (popular book/tool) is overly complex
- Most teams use gut feel or 50/50 (often wrong)
- No good way to account for:
  - Different roles (tech vs business)
  - Time commitment (full-time vs part-time)
  - Cash contributions
  - Opportunity cost
  - Risk tolerance

**What's Needed:**
- Interactive calculator that weighs multiple factors
- Scenario modeling ("what if we raise at X valuation?")
- Vesting schedule generator
- Legal doc templates
- Negotiation best practices guide

**Market:**
- 50K+ new startups/year in US
- Every one needs equity split
- $200-500 willingness to pay

**Why Now:**
- More solo founders adding co-founders later
- Remote teams = more complex equity convos
- YC/accelerators pushing better equity practices`,
    category: "Rebuild money",
    industryTags: ["Startups", "Legal", "SaaS"],
    isAnonymous: false,
    author: {
      id: "user4",
      username: "jenl",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=jenl",
    },
    authorInvolvement: "just_sharing",
    upvotes: 93,
    commentCount: 19,
    builderCount: 4,
    investorCount: 9,
    followerCount: 27,
    status: "published",
    createdAt: new Date("2025-01-11T11:00:00"),
    updatedAt: new Date("2025-01-11T11:00:00"),
  },
  {
    id: "6",
    title: "Automated manufacturing quality control with computer vision",
    elevatorPitch:
      "Small manufacturers can't afford dedicated QC staff. AI vision systems could automate defect detection at 1/10th the cost of manual inspection.",
    fullDescription: `Quality control is a huge bottleneck for small manufacturers.

**The Problem:**
- Manual inspection is slow and error-prone
- Hiring QC staff is expensive (80K+ per person)
- Defects caught too late = expensive waste
- Current AI vision systems are enterprise-only

**Solution:**
- Affordable AI vision system ($5K-10K setup)
- Works with standard cameras
- Pre-trained on common defects
- Real-time alerts
- Quality reports + analytics

**Market:**
- 250K+ small manufacturers in US
- Each spends 40-100K/year on QC
- Massive pain point

**Competition:**
- Enterprise solutions (Cognex, etc) are 100K+
- No good affordable options`,
    category: "World of atoms",
    industryTags: ["Manufacturing", "AI", "Computer Vision"],
    isAnonymous: false,
    author: {
      id: "user3",
      username: "mikec",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=mikec",
    },
    authorInvolvement: "want_to_build",
    upvotes: 78,
    commentCount: 14,
    builderCount: 6,
    investorCount: 11,
    followerCount: 22,
    status: "published",
    createdAt: new Date("2025-01-10T08:30:00"),
    updatedAt: new Date("2025-01-10T08:30:00"),
  },
  {
    id: "7",
    title: "Podcast discovery based on actual listening behavior",
    elevatorPitch:
      "Podcast apps recommend shows based on categories, not listening patterns. Build a Spotify-style recommendation engine that learns what you actually finish listening to.",
    fullDescription: `Podcast discovery is broken. Apps show you 'top charts' and category-based recommendations.

**Why Current Discovery Sucks:**
- Categories are too broad ("Business" includes everything from marketing to finance)
- Top charts are dominated by celebrities
- No personalization based on what you finish vs skip
- Can't find niche shows that match your taste

**What's Needed:**
- Recommendation algorithm based on:
  - Completion rate (did you finish episodes?)
  - Skip patterns (what parts do you skip?)
  - Listening speed (do you speed up when bored?)
  - Time of day (work vs leisure listening)
- "If you like X, try Y" suggestions
- Niche show discovery
- Playlist creation (mix episodes from different shows)

**Market:**
- 100M+ podcast listeners in US
- Everyone complains about discovery
- Could be integrated into existing apps or standalone

**Monetization:**
- Affiliate revenue from podcast platforms
- Premium features
- Show promotion tools for creators`,
    category: "Creator economy",
    industryTags: ["Audio", "Recommendations", "Consumer"],
    isAnonymous: true,
    author: null,
    authorInvolvement: "just_sharing",
    upvotes: 134,
    commentCount: 26,
    builderCount: 7,
    investorCount: 13,
    followerCount: 38,
    status: "published",
    createdAt: new Date("2025-01-09T13:20:00"),
    updatedAt: new Date("2025-01-09T13:20:00"),
  },
  {
    id: "8",
    title: "Decentralized energy grid for apartment complexes",
    elevatorPitch:
      "Apartment dwellers can't install solar panels. What if complexes became mini-grids where residents share renewable energy and storage?",
    fullDescription: `Single-family homes can go solar, but 45M+ apartment dwellers are stuck with utility power.

**The Opportunity:**
- Large rooftops on apartment buildings (mostly unused)
- Shared battery storage is more economical
- Residents want clean energy but have no options
- Building owners want to add value

**How It Works:**
- Solar panels on building roof
- Shared battery storage in basement
- Smart metering for each unit
- Residents buy into the system (like an HOA)
- Excess energy sold back to grid

**Barriers:**
- Regulatory (need to be classified as micro-utility)
- Financing (who pays upfront costs?)
- Coordination (getting residents to agree)

**Market:**
- 100K+ large apartment complexes in US
- Average building: 100-200 units
- Residents save 20-40% on electricity

**Similar Models:**
- Community solar (but not building-specific)
- Some co-ops do this, but no standardized solution`,
    category: "Climate tech",
    industryTags: ["Energy", "Real Estate", "Cleantech"],
    isAnonymous: false,
    author: {
      id: "user2",
      username: "sarahm",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarahm",
    },
    authorInvolvement: "just_sharing",
    upvotes: 112,
    commentCount: 22,
    builderCount: 4,
    investorCount: 18,
    followerCount: 31,
    status: "published",
    createdAt: new Date("2025-01-08T10:45:00"),
    updatedAt: new Date("2025-01-08T10:45:00"),
  },
  {
    id: "9",
    title: "Real-time translation for construction sites",
    elevatorPitch:
      "Construction crews are multilingual but safety instructions get lost in translation. Build real-time translation earpieces for job sites.",
    fullDescription: `Construction is one of the most dangerous jobs, and language barriers make it worse.

**The Problem:**
- 30% of construction workers are non-native English speakers
- Safety briefings often not understood
- Instructions get misinterpreted
- Accidents happen due to miscommunication

**Solution:**
- Real-time translation earpieces (like Google Pixel Buds but ruggedized)
- Pre-loaded with construction vocabulary
- Works offline (many job sites have bad connectivity)
- Durable (dust-proof, water-resistant)
- Affordable (<$100/unit)

**Market:**
- 7M+ construction workers in US
- Companies would pay for safety equipment
- Insurance companies might subsidize (fewer accidents)

**Technical Challenges:**
- Need to work in loud environments
- Construction jargon is tricky
- Must be comfortable for 8+ hour shifts

**Similar Products:**
- Consumer translation devices exist but aren't built for job sites
- This needs to be construction-specific`,
    category: "World of atoms",
    industryTags: ["Construction", "Hardware", "Safety"],
    isAnonymous: false,
    author: {
      id: "user3",
      username: "mikec",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=mikec",
    },
    authorInvolvement: "want_to_build",
    upvotes: 87,
    commentCount: 16,
    builderCount: 5,
    investorCount: 9,
    followerCount: 24,
    status: "published",
    createdAt: new Date("2025-01-07T15:10:00"),
    updatedAt: new Date("2025-01-07T15:10:00"),
  },
  {
    id: "10",
    title: "Collaborative fundraising for public school projects",
    elevatorPitch:
      "Teachers spend personal money on classroom supplies. Create a Kickstarter for specific school projects where parents, alumni, and community members can contribute.",
    fullDescription: `Teachers spend $500-1000/year of their own money on classroom supplies. This is broken.

**Current Landscape:**
- DonorsChoose exists but is slow and bureaucratic
- PTA fundraising is generic (not project-specific)
- Teachers feel guilty asking for money
- Parents want to help but don't know what's needed

**Better Solution:**
- Teacher creates project listing (specific items needed)
- Parents, alumni, community members contribute
- Transparent pricing (you see exactly where money goes)
- Fast approval (funded projects ship within days)
- Photos/updates when items arrive

**Examples:**
- "I need 30 chromebooks for my computer lab - $6000"
- "Science experiment kits for chemistry class - $450"
- "Books for classroom library - $200"

**Market:**
- 3.7M public school teachers in US
- Each could run 2-3 projects per year
- Average project size: $300-500

**Monetization:**
- Small platform fee (5-8%)
- Premium features for schools
- Corporate sponsorships

**Why Better Than DonorsChoose:**
- Faster (days not weeks)
- Community-focused (prioritizes local support)
- More transparent
- Better UX`,
    category: "Niche markets",
    industryTags: ["Education", "Crowdfunding", "Social Impact"],
    isAnonymous: false,
    author: {
      id: "user4",
      username: "jenl",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=jenl",
    },
    authorInvolvement: "just_sharing",
    upvotes: 145,
    commentCount: 28,
    builderCount: 9,
    investorCount: 16,
    followerCount: 42,
    status: "published",
    createdAt: new Date("2025-01-06T09:00:00"),
    updatedAt: new Date("2025-01-06T09:00:00"),
  },
];

// ===== MOCK COMMENTS =====

export const mockComments: Comment[] = [
  {
    id: "c1",
    problemId: "1",
    author: {
      id: "user5",
      username: "davidk",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=davidk",
    },
    isAnonymous: false,
    content:
      "This is spot on. I work at an AI lab and we constantly debate which benchmarks to optimize for. The problem is benchmark hacking is too easy.",
    upvotes: 12,
    parentCommentId: null,
    createdAt: new Date("2025-01-15T11:30:00"),
    updatedAt: new Date("2025-01-15T11:30:00"),
    replies: [
      {
        id: "c2",
        problemId: "1",
        author: {
          id: "user1",
          username: "alexj",
          avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=alexj",
        },
        isAnonymous: false,
        content: "Exactly! Have you seen any internal attempts to solve this at your lab?",
        upvotes: 3,
        parentCommentId: "c1",
        createdAt: new Date("2025-01-15T12:00:00"),
        updatedAt: new Date("2025-01-15T12:00:00"),
      },
    ],
  },
  {
    id: "c3",
    problemId: "1",
    author: null,
    isAnonymous: true,
    content:
      "Would love to contribute to this. I've been frustrated with MMLU being treated as gospel when it's clearly not predictive of real-world usefulness.",
    upvotes: 8,
    parentCommentId: null,
    createdAt: new Date("2025-01-15T13:15:00"),
    updatedAt: new Date("2025-01-15T13:15:00"),
  },
  {
    id: "c4",
    problemId: "4",
    author: {
      id: "user2",
      username: "sarahm",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarahm",
    },
    isAnonymous: false,
    content:
      "Love this idea. My dad is a plumber and he has no online presence. All his business comes from word of mouth, which is great but limits his growth.",
    upvotes: 15,
    parentCommentId: null,
    createdAt: new Date("2025-01-12T17:20:00"),
    updatedAt: new Date("2025-01-12T17:20:00"),
  },
];

// ===== HELPER FUNCTIONS =====

/**
 * Get a problem by ID
 */
export function getProblemById(id: string): Problem | undefined {
  return mockProblems.find((p) => p.id === id);
}

/**
 * Get problems by category
 */
export function getProblemsByCategory(category: Category): Problem[] {
  return mockProblems.filter((p) => p.category === category);
}

/**
 * Get trending problems (sorted by trending score)
 */
export function getTrendingProblems(): Problem[] {
  // Simple trending algorithm (can be enhanced later)
  return [...mockProblems].sort((a, b) => {
    const scoreA = calculateTrendingScore(a);
    const scoreB = calculateTrendingScore(b);
    return scoreB - scoreA;
  });
}

/**
 * Get new problems (sorted by creation date)
 */
export function getNewProblems(): Problem[] {
  return [...mockProblems].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

/**
 * Calculate trending score (Hacker News style)
 */
function calculateTrendingScore(problem: Problem): number {
  const now = Date.now();
  const ageInHours = (now - problem.createdAt.getTime()) / (1000 * 60 * 60);
  const gravity = 1.8; // Higher = faster decay

  // Score = (upvotes - 1) / (age + 2)^gravity
  const score = (problem.upvotes - 1) / Math.pow(ageInHours + 2, gravity);

  // Boost for engagement (comments, builders)
  const engagementBoost = problem.commentCount * 0.5 + problem.builderCount * 2;

  return score + engagementBoost;
}

/**
 * Search problems by query
 */
export function searchProblems(query: string): Problem[] {
  const lowerQuery = query.toLowerCase();
  return mockProblems.filter(
    (p) =>
      p.title.toLowerCase().includes(lowerQuery) ||
      p.elevatorPitch.toLowerCase().includes(lowerQuery) ||
      p.industryTags.some((tag) => tag.toLowerCase().includes(lowerQuery))
  );
}

/**
 * Get comments for a problem
 */
export function getCommentsForProblem(problemId: string): Comment[] {
  return mockComments.filter((c) => c.problemId === problemId && c.parentCommentId === null);
}
