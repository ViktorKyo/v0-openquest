import { describe, it, expect } from 'vitest';
import {
  sanitizeSearchInput,
  escapeLikeWildcards,
  MAX_SEARCH_QUERY_LENGTH,
} from '@/lib/search-utils';

describe('escapeLikeWildcards', () => {
  it('escapes percent wildcard so it is treated as a literal character', () => {
    // A search for "test%" should NOT match everything starting with "test"
    // It should only match the literal string "test%"
    expect(escapeLikeWildcards('test%')).toBe('test\\%');
  });

  it('escapes underscore wildcard so it does not match any single character', () => {
    // A search for "test_" should NOT match "testX", "test1", etc.
    // It should only match the literal string "test_"
    expect(escapeLikeWildcards('test_')).toBe('test\\_');
  });

  it('escapes backslashes to prevent escape sequence confusion', () => {
    expect(escapeLikeWildcards('test\\')).toBe('test\\\\');
  });

  it('escapes multiple wildcards in the same string', () => {
    expect(escapeLikeWildcards('%test_value%')).toBe('\\%test\\_value\\%');
  });

  it('handles strings with no special characters unchanged', () => {
    expect(escapeLikeWildcards('hello world')).toBe('hello world');
  });

  it('handles empty string', () => {
    expect(escapeLikeWildcards('')).toBe('');
  });

  it('escapes backslash before other wildcards to avoid double-escaping', () => {
    // Input: \% should become \\% (escaped backslash + escaped percent)
    // Not \\\% (which would mean escaped-backslash + literal-percent)
    const result = escapeLikeWildcards('\\%');
    expect(result).toBe('\\\\\\%');
  });

  it('handles consecutive wildcards', () => {
    expect(escapeLikeWildcards('%%')).toBe('\\%\\%');
    expect(escapeLikeWildcards('__')).toBe('\\_\\_');
  });
});

describe('sanitizeSearchInput', () => {
  describe('wildcard escaping', () => {
    it('escapes percent signs so searching for "test%" does not match everything', () => {
      const result = sanitizeSearchInput('test%');
      expect(result).toBe('test\\%');
      // When used in LIKE pattern `%test\%%`, the escaped \% is literal
      // so it only matches strings containing the literal text "test%"
    });

    it('escapes underscores so searching for "test_" does not match "testX"', () => {
      const result = sanitizeSearchInput('test_');
      expect(result).toBe('test\\_');
      // When used in LIKE pattern `%test\_%`, the escaped \_ is literal
      // so it only matches strings containing the literal text "test_"
    });

    it('escapes backslashes in search input', () => {
      const result = sanitizeSearchInput('path\\to');
      expect(result).toBe('path\\\\to');
    });

    it('escapes all wildcards in complex input', () => {
      const result = sanitizeSearchInput('100% of users_data');
      expect(result).toBe('100\\% of users\\_data');
    });
  });

  describe('SQL injection attempts', () => {
    it('handles SQL injection attempt with single quotes safely', () => {
      // Drizzle ORM parameterizes queries, so this is safe at the SQL level.
      // But we still ensure the function does not crash or behave unexpectedly.
      const result = sanitizeSearchInput("'; DROP TABLE problems; --");
      expect(result).toBe("'; DROP TABLE problems; --");
      // Single quotes are safe because Drizzle uses parameterized queries.
      // The result is used as a parameter value, not concatenated into SQL.
    });

    it('handles SQL injection with UNION SELECT', () => {
      const result = sanitizeSearchInput("' UNION SELECT * FROM users --");
      expect(result).toBe("' UNION SELECT * FROM users --");
      // Safe because Drizzle parameterizes the value
    });

    it('handles percent-based wildcard injection', () => {
      // An attacker trying to match all records by injecting %
      const result = sanitizeSearchInput('%');
      expect(result).toBe('\\%');
      // The escaped percent will not act as a wildcard
    });

    it('handles underscore-based wildcard injection', () => {
      const result = sanitizeSearchInput('_');
      expect(result).toBe('\\_');
    });
  });

  describe('input validation', () => {
    it('trims whitespace from input', () => {
      const result = sanitizeSearchInput('  hello world  ');
      expect(result).toBe('hello world');
    });

    it('returns empty string for empty input', () => {
      expect(sanitizeSearchInput('')).toBe('');
    });

    it('returns empty string for whitespace-only input', () => {
      expect(sanitizeSearchInput('   ')).toBe('');
    });

    it('returns empty string for null-like values', () => {
      // TypeScript would normally prevent this, but test runtime safety
      expect(sanitizeSearchInput(null as unknown as string)).toBe('');
      expect(sanitizeSearchInput(undefined as unknown as string)).toBe('');
    });

    it('truncates input to MAX_SEARCH_QUERY_LENGTH characters', () => {
      const longQuery = 'a'.repeat(500);
      const result = sanitizeSearchInput(longQuery);
      expect(result.length).toBe(MAX_SEARCH_QUERY_LENGTH);
    });

    it('does not truncate input within the length limit', () => {
      const query = 'a'.repeat(MAX_SEARCH_QUERY_LENGTH);
      const result = sanitizeSearchInput(query);
      expect(result.length).toBe(MAX_SEARCH_QUERY_LENGTH);
    });

    it('truncates before escaping to prevent length inflation from escaping', () => {
      // A string of 256 percent signs: after truncation it's 256 chars,
      // then after escaping each becomes \%, so the result will be longer
      // This is expected - we truncate the raw input, not the escaped output
      const query = '%'.repeat(300);
      const result = sanitizeSearchInput(query);
      // After truncation: 256 percent signs
      // After escaping: 256 * 2 = 512 characters (\% for each)
      expect(result).toBe('\\%'.repeat(MAX_SEARCH_QUERY_LENGTH));
    });
  });

  describe('normal search queries', () => {
    it('passes through normal search terms unchanged', () => {
      expect(sanitizeSearchInput('machine learning')).toBe('machine learning');
    });

    it('passes through alphanumeric input unchanged', () => {
      expect(sanitizeSearchInput('React2024')).toBe('React2024');
    });

    it('passes through hyphens and common punctuation unchanged', () => {
      expect(sanitizeSearchInput('e-commerce solutions')).toBe('e-commerce solutions');
    });

    it('preserves mixed case', () => {
      expect(sanitizeSearchInput('AI Healthcare')).toBe('AI Healthcare');
    });

    it('handles unicode characters', () => {
      expect(sanitizeSearchInput('cafe latte')).toBe('cafe latte');
    });
  });
});

describe('integration: demonstrating the vulnerability', () => {
  /**
   * These tests document the exact vulnerability that existed before the fix.
   * The old code did: query.slice(0, 200).trim()
   * This did NOT escape LIKE wildcards, so:
   *   - Searching for "%" would create pattern "%%%", matching ALL rows
   *   - Searching for "_" would create pattern "%_%", matching any row with 1+ chars
   */

  it('old sanitization would let "%" match everything (vulnerability demo)', () => {
    // Old behavior (vulnerable):
    const oldSanitize = (q: string) => q.slice(0, 200).trim();
    const oldResult = oldSanitize('%');
    // oldResult is "%" - when put in `%${oldResult}%` it becomes "%%%" which matches everything
    expect(oldResult).toBe('%');

    // New behavior (fixed):
    const newResult = sanitizeSearchInput('%');
    // newResult is "\%" - when put in `%${newResult}%` it becomes "%\%%" which matches literal "%"
    expect(newResult).toBe('\\%');
    expect(newResult).not.toBe('%');
  });

  it('old sanitization would let "_" match any single character (vulnerability demo)', () => {
    const oldSanitize = (q: string) => q.slice(0, 200).trim();
    const oldResult = oldSanitize('test_');
    expect(oldResult).toBe('test_'); // underscore NOT escaped - acts as wildcard

    const newResult = sanitizeSearchInput('test_');
    expect(newResult).toBe('test\\_'); // underscore IS escaped - treated literally
    expect(newResult).not.toBe('test_');
  });
});
