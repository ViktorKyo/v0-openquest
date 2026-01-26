export interface CategoryData {
  name: string
  slug: string
  tagline: string
  description: string
  lookingFor: string[]
  color: string
  colorClass: string
  seo: {
    title: string
    description: string
  }
}

export const categories: Record<string, CategoryData> = {
  moonshots: {
    name: "Moonshots",
    slug: "moonshots",
    tagline: "The problems that define the next century",
    description:
      "Some problems are so large that solving them changes everything. Fusion energy. Brain-computer interfaces. Reversing aging. These aren't incremental improvements—they're civilizational shifts. We're looking for the technical breakthroughs and bold bets that seem impossible until they're inevitable.",
    lookingFor: [
      "Problems requiring 10x thinking, not 10% improvements",
      "Deep tech and scientific breakthroughs",
      "Long time horizons with massive payoffs",
      "Ideas that sound crazy today but obvious in hindsight",
    ],
    color: "violet",
    colorClass: "bg-violet-500/10 text-violet-400 border-violet-500/20",
    seo: {
      title: "Moonshot Problems Worth Solving | OpenQuest",
      description:
        "Explore ambitious problems in deep tech, frontier science, and breakthrough innovation. Find ideas that could define the next century.",
    },
  },
  "niche-markets": {
    name: "Niche Markets",
    slug: "niche-markets",
    tagline: "Small markets that desperately need a champion",
    description:
      "The best businesses often start in markets that look too small. Vertical SaaS for dry cleaners. Tools for independent truckers. Software for yacht brokers. These niches are ignored by big companies but represent real pain for real people. Dominate a niche, then expand.",
    lookingFor: [
      "Underserved industries with painful workflows",
      "Markets too small for incumbents to care",
      "Problems where 'good enough' solutions don't exist",
      "Opportunities to be the clear category leader",
    ],
    color: "orange",
    colorClass: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    seo: {
      title: "Niche Market Problems & Opportunities | OpenQuest",
      description:
        "Discover underserved markets and overlooked industries. Find problems in niches where you can become the dominant solution.",
    },
  },
  "future-of-work": {
    name: "Future of Work",
    slug: "future-of-work",
    tagline: "Reinventing how 4 billion people spend their days",
    description:
      "Work is being rebuilt from scratch. Remote collaboration. AI-augmented productivity. The death of the 9-to-5. The rise of the portfolio career. The companies that define how we work in 2035 are being built now. We're looking for the tools, platforms, and systems that will shape the next era of human productivity.",
    lookingFor: [
      "Tools that make remote/hybrid work actually work",
      "AI assistants that amplify human capability",
      "Solutions for the gig economy and independent workers",
      "New models for hiring, learning, and career development",
    ],
    color: "blue",
    colorClass: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    seo: {
      title: "Future of Work Problems to Solve | OpenQuest",
      description:
        "Explore problems reshaping how we work—remote collaboration, AI productivity, new career models. Find opportunities in the $4T+ workforce market.",
    },
  },
  "creator-economy": {
    name: "Creator Economy",
    slug: "creator-economy",
    tagline: "Powering the next generation of independent creators",
    description:
      "50 million people now consider themselves creators. Most make less than $500/year. The infrastructure is broken—discovery is algorithmic roulette, monetization favors platforms over people, and burnout is the norm. We need better tools for creators to build sustainable businesses around their work.",
    lookingFor: [
      "Monetization beyond ads and sponsorships",
      "Tools that help creators own their audience",
      "Solutions for creator burnout and sustainability",
      "Infrastructure for the 'middle class' of creators",
    ],
    color: "pink",
    colorClass: "bg-pink-500/10 text-pink-400 border-pink-500/20",
    seo: {
      title: "Creator Economy Problems & Opportunities | OpenQuest",
      description:
        "Discover problems facing the 50M+ creator economy. Find opportunities to build tools that help creators thrive.",
    },
  },
  longevity: {
    name: "Longevity",
    slug: "longevity",
    tagline: "Adding decades to the human healthspan",
    description:
      "The science of aging is accelerating. Senolytics. Gene therapy. Epigenetic reprogramming. For the first time, extending healthy human lifespan is a serious engineering challenge, not science fiction. The companies solving these problems won't just build billion-dollar businesses—they'll change what it means to be human.",
    lookingFor: [
      "Therapeutics targeting the biology of aging",
      "Diagnostics for early disease detection",
      "Tools to extend healthspan, not just lifespan",
      "Accessibility plays—longevity for everyone, not just billionaires",
    ],
    color: "red",
    colorClass: "bg-red-500/10 text-red-400 border-red-500/20",
    seo: {
      title: "Longevity & Healthspan Problems | OpenQuest",
      description:
        "Explore problems in aging research, longevity science, and healthspan extension. Find opportunities in the frontier of human biology.",
    },
  },
  "rebuild-money": {
    name: "Rebuild Money",
    slug: "rebuild-money",
    tagline: "Fixing the infrastructure of global finance",
    description:
      "Financial infrastructure was built for a different era. Cross-border payments take days. 2 billion people are unbanked. Small businesses can't access capital. Crypto promised a revolution but mostly delivered speculation. We're looking for practical solutions that make money work better for everyone.",
    lookingFor: [
      "Payments infrastructure that actually works globally",
      "Access to capital for underserved businesses",
      "Financial tools for the unbanked and underbanked",
      "Real utility from blockchain, not speculation",
    ],
    color: "yellow",
    colorClass: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    seo: {
      title: "Fintech Problems Worth Solving | OpenQuest",
      description:
        "Discover problems in payments, lending, and financial infrastructure. Find opportunities to rebuild how money moves.",
    },
  },
  "climate-tech": {
    name: "Climate Tech",
    slug: "climate-tech",
    tagline: "The decade that decides everything",
    description:
      "We have 10 years to fundamentally transform energy, transportation, agriculture, and manufacturing. This isn't about incremental efficiency—it's about reinventing trillion-dollar industries. The climate transition will create more wealth than the internet. The problems are urgent, massive, and solvable.",
    lookingFor: [
      "Carbon removal at gigatonne scale",
      "Clean energy generation and storage",
      "Sustainable alternatives in hard-to-decarbonize sectors",
      "Adaptation infrastructure for a changing climate",
    ],
    color: "emerald",
    colorClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    seo: {
      title: "Climate Tech Problems & Opportunities | OpenQuest",
      description:
        "Explore urgent problems in clean energy, carbon removal, and climate adaptation. Find opportunities in the $10T+ climate transition.",
    },
  },
  "ai-infrastructure": {
    name: "AI & Infrastructure",
    slug: "ai-infrastructure",
    tagline: "Building the tools that build everything else",
    description:
      "AI is the new electricity—but the infrastructure isn't ready. Model deployment is expensive. Fine-tuning is a dark art. Evaluation is broken. The picks-and-shovels opportunities in AI are as large as the applications themselves. We're looking for the platforms, tools, and infrastructure that will power the next decade of AI development.",
    lookingFor: [
      "Developer tools for building with LLMs",
      "Infrastructure for training and deployment",
      "Evaluation and testing frameworks",
      "Data infrastructure and pipelines",
    ],
    color: "cyan",
    colorClass: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    seo: {
      title: "AI Infrastructure Problems | OpenQuest",
      description:
        "Discover problems in AI tooling, model deployment, and ML infrastructure. Find opportunities to build the foundation of the AI era.",
    },
  },
  "world-of-atoms": {
    name: "World of Atoms",
    slug: "world-of-atoms",
    tagline: "Software ate the world. Now it's time to rebuild it.",
    description:
      "For two decades, the best engineers built apps. Now they're building rockets, robots, and reactors. Hardware is having a moment—manufacturing is being reinvented, supply chains are being rebuilt, and deep tech is finally investable. We're looking for problems that require moving atoms, not just bits.",
    lookingFor: [
      "Advanced manufacturing and automation",
      "Robotics for real-world applications",
      "Hardware that enables new categories",
      "Defense and aerospace innovation",
    ],
    color: "amber",
    colorClass: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    seo: {
      title: "Hardware & Deep Tech Problems | OpenQuest",
      description:
        "Explore problems in robotics, manufacturing, and hardware. Find opportunities at the frontier of the physical world.",
    },
  },
  other: {
    name: "Other",
    slug: "other",
    tagline: "The problems that defy categorization",
    description:
      "Some of the best ideas don't fit in a box. New categories. Weird intersections. Problems nobody's named yet. If your idea doesn't fit elsewhere, it belongs here. The only criteria: it should be a problem worth solving.",
    lookingFor: [
      "Problems that create new categories",
      "Unexpected intersections of industries",
      "Ideas that are hard to describe but obvious once seen",
      "Anything ambitious that doesn't fit above",
    ],
    color: "gray",
    colorClass: "bg-gray-500/10 text-gray-400 border-gray-500/20",
    seo: {
      title: "Uncategorized Problems Worth Solving | OpenQuest",
      description:
        "Explore problems that defy categorization. Find unconventional opportunities and ideas that create new categories.",
    },
  },
}

export function getCategoryBySlug(slug: string): CategoryData | undefined {
  return categories[slug]
}

export function getAllCategorySlugs(): string[] {
  return Object.keys(categories)
}

export function getAllCategories(): CategoryData[] {
  return Object.values(categories)
}
