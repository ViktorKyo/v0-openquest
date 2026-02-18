export const MAX_TWEETS_PER_PROBLEM = 5;

/**
 * Extract tweet ID from various URL formats or a raw numeric ID.
 * Returns null if the input is not a valid tweet reference.
 */
export function extractTweetId(input: string): string | null {
  const trimmed = input.trim();
  if (!trimmed) return null;

  // Raw tweet ID (all digits, Twitter IDs are typically 15-20 digits)
  if (/^\d{1,20}$/.test(trimmed)) {
    return trimmed;
  }

  // URL formats: twitter.com or x.com
  try {
    const url = new URL(trimmed);
    if (
      url.hostname === 'twitter.com' ||
      url.hostname === 'www.twitter.com' ||
      url.hostname === 'x.com' ||
      url.hostname === 'www.x.com' ||
      url.hostname === 'mobile.twitter.com' ||
      url.hostname === 'mobile.x.com'
    ) {
      const match = url.pathname.match(/\/status\/(\d+)/);
      if (match) return match[1];
    }
  } catch {
    // Not a valid URL
  }

  return null;
}

/**
 * Validate and deduplicate tweet URLs.
 * Returns only valid, unique tweet URLs (up to MAX_TWEETS_PER_PROBLEM).
 */
export function validateTweetUrls(urls: unknown): string[] {
  if (!Array.isArray(urls)) return [];

  const seen = new Set<string>();
  const valid: string[] = [];

  for (const url of urls) {
    if (typeof url !== 'string') continue;
    const id = extractTweetId(url);
    if (id && !seen.has(id)) {
      seen.add(id);
      valid.push(url.trim());
    }
    if (valid.length >= MAX_TWEETS_PER_PROBLEM) break;
  }

  return valid;
}
