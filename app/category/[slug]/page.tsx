import { CategoryPage } from "@/components/category-page"
import { notFound } from "next/navigation"

// Category definitions with metadata
const CATEGORY_DATA: Record<
  string,
  {
    name: string
    description: string
    color: string
    gradient: string
    textColor: string
    relatedCategories: string[]
  }
> = {
  moonshots: {
    name: "Moonshots",
    description: "Change the trajectory of humanity",
    color: "purple",
    gradient: "from-purple-900/40 via-purple-800/30 to-background",
    textColor: "text-purple-400",
    relatedCategories: ["ai-infrastructure", "climate-tech", "longevity"],
  },
  "climate-tech": {
    name: "Climate tech",
    description: "Building a sustainable future for our planet",
    color: "emerald",
    gradient: "from-emerald-900/40 via-emerald-800/30 to-background",
    textColor: "text-emerald-400",
    relatedCategories: ["moonshots", "world-of-atoms", "future-of-work"],
  },
  "ai-infrastructure": {
    name: "AI & infrastructure",
    description: "The next generation of intelligent systems",
    color: "indigo",
    gradient: "from-indigo-900/40 via-indigo-800/30 to-background",
    textColor: "text-indigo-400",
    relatedCategories: ["moonshots", "future-of-work", "creator-economy"],
  },
  "creator-economy": {
    name: "Creator economy",
    description: "Empowering creators to build sustainable businesses",
    color: "pink",
    gradient: "from-pink-900/40 via-pink-800/30 to-background",
    textColor: "text-pink-400",
    relatedCategories: ["future-of-work", "niche-markets", "ai-infrastructure"],
  },
  "niche-markets": {
    name: "Niche markets",
    description: "Untapped opportunities waiting to be discovered",
    color: "blue",
    gradient: "from-blue-900/40 via-blue-800/30 to-background",
    textColor: "text-blue-400",
    relatedCategories: ["creator-economy", "future-of-work", "health-wellness"],
  },
  "health-wellness": {
    name: "Health & wellness",
    description: "Improving lives through better health solutions",
    color: "teal",
    gradient: "from-teal-900/40 via-teal-800/30 to-background",
    textColor: "text-teal-400",
    relatedCategories: ["longevity", "niche-markets", "future-of-work"],
  },
  education: {
    name: "Education",
    description: "Transforming how we learn and teach",
    color: "yellow",
    gradient: "from-yellow-900/40 via-yellow-800/30 to-background",
    textColor: "text-yellow-400",
    relatedCategories: ["ai-infrastructure", "future-of-work", "creator-economy"],
  },
  longevity: {
    name: "Longevity",
    description: "Extending healthspan and human potential",
    color: "cyan",
    gradient: "from-cyan-900/40 via-cyan-800/30 to-background",
    textColor: "text-cyan-400",
    relatedCategories: ["health-wellness", "moonshots", "ai-infrastructure"],
  },
  "future-of-work": {
    name: "Future of work",
    description: "Reimagining how we work and collaborate",
    color: "green",
    gradient: "from-green-900/40 via-green-800/30 to-background",
    textColor: "text-green-400",
    relatedCategories: ["ai-infrastructure", "creator-economy", "niche-markets"],
  },
  "world-of-atoms": {
    name: "World of atoms",
    description: "Hardware and physical innovations",
    color: "amber",
    gradient: "from-amber-900/40 via-amber-800/30 to-background",
    textColor: "text-amber-400",
    relatedCategories: ["climate-tech", "moonshots", "future-of-work"],
  },
}

export async function generateStaticParams() {
  return Object.keys(CATEGORY_DATA).map((slug) => ({
    slug,
  }))
}

export default function Page({ params }: { params: { slug: string } }) {
  const categoryData = CATEGORY_DATA[params.slug]

  if (!categoryData) {
    notFound()
  }

  return <CategoryPage slug={params.slug} categoryData={categoryData} />
}
