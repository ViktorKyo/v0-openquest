import { FeedHeader } from "@/components/feed-header"
import { FeedFilters } from "@/components/feed-filters"
import { FeedList } from "@/components/feed-list"
import { FeedFilterProvider } from "@/contexts/feed-filter-context"

export default function FeedPage() {
  return (
    <FeedFilterProvider>
      <div className="min-h-screen bg-background">
        <FeedHeader />
        <FeedFilters />
        <FeedList />
      </div>
    </FeedFilterProvider>
  )
}
