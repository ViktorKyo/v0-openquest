-- Add tweet_urls column for curated tweet embeds on problem pages
ALTER TABLE problems ADD COLUMN IF NOT EXISTS tweet_urls JSONB DEFAULT '[]'::jsonb;
