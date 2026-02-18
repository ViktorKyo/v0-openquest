import type { Metadata } from "next"
import { FeedHeader } from "@/components/feed-header"
import { FeedList } from "@/components/feed-list"
import { FeedFilterProvider } from "@/contexts/feed-filter-context"

export const metadata: Metadata = {
  title: "Browse Problems",
  description: "Explore startup problems worth solving. Filter by category, sort by trending or newest, and find ideas backed by top VCs and founders.",
  alternates: { canonical: "/feed" },
  openGraph: {
    title: "Browse Problems",
    description: "Explore startup problems worth solving. Filter by category and find ideas backed by top VCs and founders.",
    url: "/feed",
  },
}

type SearchParamValue = string | string[] | undefined
type FeedSearchParams = Record<string, SearchParamValue>

const SOURCE_OPTIONS = new Set(["All Sources", "VC Partners", "Community"] as const)
const SORT_OPTIONS = new Set(["Most upvoted", "Most recent", "Most discussed"] as const)

function getSingleParam(value: SearchParamValue): string | undefined {
  return Array.isArray(value) ? value[0] : value
}

function normalizeSource(value: string | undefined): "All Sources" | "VC Partners" | "Community" {
  if (value && SOURCE_OPTIONS.has(value as "All Sources" | "VC Partners" | "Community")) {
    return value as "All Sources" | "VC Partners" | "Community"
  }
  return "All Sources"
}

function normalizeSort(value: string | undefined): "Most upvoted" | "Most recent" | "Most discussed" {
  if (value && SORT_OPTIONS.has(value as "Most upvoted" | "Most recent" | "Most discussed")) {
    return value as "Most upvoted" | "Most recent" | "Most discussed"
  }
  return "Most upvoted"
}

export default async function FeedPage({
  searchParams,
}: {
  searchParams?: Promise<FeedSearchParams>
}) {
  const resolvedSearchParams = (await searchParams) || {}
  const initialSource = normalizeSource(getSingleParam(resolvedSearchParams.source))
  const initialCategory = getSingleParam(resolvedSearchParams.category) || "All Categories"
  const initialSearch = getSingleParam(resolvedSearchParams.q) || ""
  const initialSort = normalizeSort(getSingleParam(resolvedSearchParams.sort))

  return (
    <FeedFilterProvider
      initialSource={initialSource}
      initialCategory={initialCategory}
      initialSearch={initialSearch}
      initialSort={initialSort}
    >
      <div className="min-h-screen bg-background">
        <FeedHeader />
        <FeedList />
      </div>
    </FeedFilterProvider>
  )
}
