import { FeedHeader } from "@/components/feed-header"
import { FeedFilters } from "@/components/feed-filters"
import { FeedList } from "@/components/feed-list"

export default function FeedPage() {
  return (
    <div className="min-h-screen bg-background">
      <FeedHeader />
      <FeedFilters />
      <FeedList />
    </div>
  )
}
