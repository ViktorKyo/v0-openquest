"use client"

import { Tweet } from "react-tweet"
import { extractTweetId } from "@/lib/tweet-utils"

interface TweetEmbedsSectionProps {
  tweetUrls: string[]
}

export function TweetEmbedsSection({ tweetUrls }: TweetEmbedsSectionProps) {
  const tweetIds = tweetUrls
    .map(extractTweetId)
    .filter((id): id is string => id !== null)

  if (tweetIds.length === 0) return null

  return (
    <section className="tweet-compact">
      <h3 className="text-lg font-semibold mb-4">Related Tweets</h3>
      <div className="space-y-3">
        {tweetIds.map((id) => (
          <div key={id} className="max-w-sm [&_.react-tweet-theme]:!my-0 [&>div]:!mt-0">
            <Tweet id={id} />
          </div>
        ))}
      </div>
    </section>
  )
}
