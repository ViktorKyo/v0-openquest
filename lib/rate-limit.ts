import { LRUCache } from 'lru-cache';
import { sql } from 'drizzle-orm';
import { db } from '@/lib/db/supabase';

type RateLimitOptions = {
  interval: number; // Time window in ms
  uniqueTokenPerInterval: number; // Max number of unique tokens
};

export function rateLimit(options: RateLimitOptions) {
  const tokenCache = new LRUCache({
    max: options.uniqueTokenPerInterval || 500,
    ttl: options.interval || 60000,
  });

  return {
    check: (limit: number, token: string) =>
      new Promise<void>((resolve, reject) => {
        const tokenCount = (tokenCache.get(token) as number[]) || [0];
        if (tokenCount[0] === 0) {
          tokenCache.set(token, tokenCount);
        }
        tokenCount[0] += 1;

        const currentUsage = tokenCount[0];
        const isRateLimited = currentUsage > limit;

        return isRateLimited ? reject() : resolve();
      }),
  };
}

class RateLimitExceededError extends Error {
  constructor() {
    super('Rate limit exceeded');
  }
}

async function checkSharedRateLimit(params: {
  action: 'user_login' | 'signup' | 'password_reset' | 'draft_update';
  token: string;
  limit: number;
  intervalMs: number;
}): Promise<void> {
  const token = params.token.trim().toLowerCase() || 'unknown';
  const key = `${params.action}:${token}`;
  const now = new Date();
  const resetThreshold = new Date(now.getTime() - params.intervalMs);

  const result = await db.execute(sql`
    INSERT INTO rate_limits (key, count, window_start, updated_at)
    VALUES (${key}, 1, ${now}, ${now})
    ON CONFLICT (key) DO UPDATE
      SET
        count = CASE
          WHEN rate_limits.window_start <= ${resetThreshold} THEN 1
          ELSE rate_limits.count + 1
        END,
        window_start = CASE
          WHEN rate_limits.window_start <= ${resetThreshold} THEN ${now}
          ELSE rate_limits.window_start
        END,
        updated_at = ${now}
    RETURNING count
  `);

  const count = Number((result as unknown as { rows?: Array<{ count: number }> })?.rows?.[0]?.count ?? 0);
  if (count > params.limit) {
    throw new RateLimitExceededError();
  }
}

// Rate limiter for admin login (5 attempts per hour per IP)
export const loginLimiter = rateLimit({
  interval: 60 * 60 * 1000, // 1 hour
  uniqueTokenPerInterval: 500, // Max 500 unique IPs tracked
});

// Rate limiter for user login (5 attempts per hour per IP)
export const userLoginLimiter = rateLimit({
  interval: 60 * 60 * 1000, // 1 hour
  uniqueTokenPerInterval: 500,
});

// Rate limiter for user signup (3 attempts per hour per IP)
export const signupLimiter = rateLimit({
  interval: 60 * 60 * 1000, // 1 hour
  uniqueTokenPerInterval: 500,
});

// Rate limiter for password reset (3 attempts per hour per email)
export const passwordResetLimiter = rateLimit({
  interval: 60 * 60 * 1000, // 1 hour
  uniqueTokenPerInterval: 500,
});

// Fallback limiter for draft updates (60 saves per minute per user)
export const draftUpdateLimiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 1000,
});

async function runWithFallback(params: {
  action: 'user_login' | 'signup' | 'password_reset' | 'draft_update';
  token: string;
  limit: number;
  intervalMs: number;
  fallbackLimiter: ReturnType<typeof rateLimit>;
}): Promise<void> {
  try {
    await checkSharedRateLimit({
      action: params.action,
      token: params.token,
      limit: params.limit,
      intervalMs: params.intervalMs,
    });
    return;
  } catch (error) {
    if (error instanceof RateLimitExceededError) {
      throw error;
    }
    // Fallback keeps auth routes functional if shared storage is unavailable.
  }

  try {
    await params.fallbackLimiter.check(params.limit, params.token.trim().toLowerCase() || 'unknown');
  } catch {
    throw new RateLimitExceededError();
  }
}

export async function checkUserLoginRateLimit(token: string): Promise<void> {
  await runWithFallback({
    action: 'user_login',
    token,
    limit: 5,
    intervalMs: 60 * 60 * 1000,
    fallbackLimiter: userLoginLimiter,
  });
}

export async function checkSignupRateLimit(token: string): Promise<void> {
  await runWithFallback({
    action: 'signup',
    token,
    limit: 3,
    intervalMs: 60 * 60 * 1000,
    fallbackLimiter: signupLimiter,
  });
}

export async function checkPasswordResetRateLimit(token: string): Promise<void> {
  await runWithFallback({
    action: 'password_reset',
    token,
    limit: 3,
    intervalMs: 60 * 60 * 1000,
    fallbackLimiter: passwordResetLimiter,
  });
}

export async function checkDraftUpdateRateLimit(token: string): Promise<void> {
  await runWithFallback({
    action: 'draft_update',
    token,
    limit: 60,
    intervalMs: 60 * 1000,
    fallbackLimiter: draftUpdateLimiter,
  });
}
