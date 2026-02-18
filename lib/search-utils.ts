/**
 * Search utility functions for sanitizing user input before SQL LIKE queries.
 *
 * SQL LIKE/ILIKE patterns treat certain characters as wildcards:
 *   %  - matches any sequence of zero or more characters
 *   _  - matches any single character
 *   \  - escape character (in PostgreSQL)
 *
 * When user input is interpolated into a LIKE pattern without escaping these
 * characters, a search for "test%" would match "test", "testing", "tester", etc.
 * (i.e., everything starting with "test") instead of literally matching "test%".
 *
 * This module provides functions to escape these wildcards so user input is
 * treated as literal text within LIKE patterns.
 */

/** Maximum allowed length for search queries */
export const MAX_SEARCH_QUERY_LENGTH = 256;

/**
 * Escapes SQL LIKE/ILIKE wildcard characters in a string so they are treated
 * as literal characters in PostgreSQL LIKE patterns.
 *
 * Escaping order matters: backslashes must be escaped first to avoid
 * double-escaping the backslashes we insert for other characters.
 *
 * @param input - The raw string to escape
 * @returns The string with LIKE wildcards escaped using backslash
 */
export function escapeLikeWildcards(input: string): string {
  return input
    .replace(/\\/g, '\\\\')  // escape backslashes first
    .replace(/%/g, '\\%')    // escape percent
    .replace(/_/g, '\\_');   // escape underscore
}

/**
 * Sanitizes a search query for safe use in SQL LIKE/ILIKE patterns.
 *
 * This function:
 * 1. Trims leading/trailing whitespace
 * 2. Truncates to MAX_SEARCH_QUERY_LENGTH characters
 * 3. Escapes SQL LIKE wildcard characters (%, _, \)
 *
 * The returned string is safe to interpolate into a LIKE pattern like:
 *   `%${sanitized}%`
 *
 * @param query - The raw user-provided search query
 * @returns A sanitized string safe for use in LIKE patterns
 */
export function sanitizeSearchInput(query: string): string {
  if (!query || typeof query !== 'string') {
    return '';
  }

  const trimmed = query.trim();

  if (trimmed.length === 0) {
    return '';
  }

  const truncated = trimmed.slice(0, MAX_SEARCH_QUERY_LENGTH);

  return escapeLikeWildcards(truncated);
}
