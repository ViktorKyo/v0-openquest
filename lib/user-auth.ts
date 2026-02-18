import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { db } from './db/supabase';
import { userProfiles, users, userSessions } from './db/schema';
import { and, eq, gt, isNull } from 'drizzle-orm';

const COOKIE_NAME = 'user_session';
const BCRYPT_ROUNDS = 12;

export interface UserSession {
  userId: string;
  email: string;
  name: string | null;
  avatarUrl: string | null;
}

interface SessionMetadata {
  ipAddress?: string;
  userAgent?: string;
}

export interface User {
  id: string;
  email: string;
  name: string | null;
  avatarUrl: string | null;
  createdAt: Date;
  isSuspended: boolean | null;
  isBanned: boolean | null;
  suspensionReason: string | null;
  banReason: string | null;
  suspendedUntil: Date | null;
}

export type UserStatus = 'active' | 'suspended' | 'banned';

export interface UserProfile {
  userId: string;
  headline: string | null;
  bio: string | null;
  location: string | null;
  timezone: string | null;
  linkedinUrl: string | null;
  twitterUrl: string | null;
  websiteUrl: string | null;
  profileVisibilityDefault: 'public' | 'private';
  createdAt: Date;
  updatedAt: Date;
}

export interface UserWithProfile extends User {
  status: UserStatus;
  profileCompletionScore: number;
  hasCompletedOnboarding: boolean;
  profile: UserProfile | null;
}

// ============================================
// PASSWORD HASHING
// ============================================
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, BCRYPT_ROUNDS);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// ============================================
// TOKEN GENERATION
// ============================================
export function generateResetToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

// ============================================
// SESSION MANAGEMENT
// ============================================
export async function createUserSession(
  userId: string,
  rememberMe: boolean = false,
  metadata?: SessionMetadata
): Promise<string> {
  const token = crypto.randomBytes(48).toString('base64url');
  const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
  const now = new Date();
  const expiresAt = new Date(
    now.getTime() + (rememberMe ? 30 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000)
  );

  await db.insert(userSessions).values({
    userId,
    sessionTokenHash: tokenHash,
    rememberMe,
    ipAddress: metadata?.ipAddress || null,
    userAgent: metadata?.userAgent || null,
    expiresAt,
    lastSeenAt: now,
  });

  return token;
}

export async function verifyUserSession(token: string): Promise<UserSession | null> {
  try {
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
    const [result] = await db
      .select({
        userId: users.id,
        email: users.email,
        name: users.name,
        avatarUrl: users.avatarUrl,
        isBanned: users.isBanned,
        isSuspended: users.isSuspended,
        suspendedUntil: users.suspendedUntil,
      })
      .from(userSessions)
      .innerJoin(users, eq(userSessions.userId, users.id))
      .where(
        and(
          eq(userSessions.sessionTokenHash, tokenHash),
          isNull(userSessions.revokedAt),
          gt(userSessions.expiresAt, new Date())
        )
      )
      .limit(1);

    if (!result) {
      return null;
    }

    // Check if user is banned
    if (result.isBanned) {
      return null;
    }

    // Check if user is suspended and suspension hasn't expired
    if (result.isSuspended && result.suspendedUntil) {
      if (new Date() < new Date(result.suspendedUntil)) {
        return null;
      }
      // Suspension expired, could auto-unsuspend here
    }

    return {
      userId: result.userId,
      email: result.email,
      name: result.name,
      avatarUrl: result.avatarUrl,
    };
  } catch (error) {
    return null;
  }
}

export async function getUserSession(req?: NextRequest): Promise<UserSession | null> {
  try {
    const cookieStore = await cookies();
    const token = req
      ? req.cookies.get(COOKIE_NAME)?.value
      : cookieStore.get(COOKIE_NAME)?.value;

    if (!token) {
      return null;
    }

    return await verifyUserSession(token);
  } catch (error) {
    return null;
  }
}

export async function setUserSession(
  userId: string,
  rememberMe: boolean = false,
  metadata?: SessionMetadata
) {
  const token = await createUserSession(userId, rememberMe, metadata);
  const cookieStore = await cookies();

  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: rememberMe ? 30 * 24 * 60 * 60 : 24 * 60 * 60, // 30 days or 24 hours
    path: '/',
  });
}

export async function clearUserSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  if (token) {
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
    await db
      .update(userSessions)
      .set({ revokedAt: new Date() })
      .where(
        and(
          eq(userSessions.sessionTokenHash, tokenHash),
          isNull(userSessions.revokedAt)
        )
      );
  }

  cookieStore.delete(COOKIE_NAME);
}

// ============================================
// USER OPERATIONS
// ============================================
export async function getUserByEmail(email: string): Promise<User | null> {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.email, email.toLowerCase()))
    .limit(1);

  return user || null;
}

export async function getUserById(id: string): Promise<User | null> {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, id))
    .limit(1);

  return user || null;
}

export async function ensureUserProfile(userId: string): Promise<UserProfile> {
  const [existing] = await db
    .select()
    .from(userProfiles)
    .where(eq(userProfiles.userId, userId))
    .limit(1);

  if (existing) {
    return {
      ...existing,
      profileVisibilityDefault: existing.profileVisibilityDefault as 'public' | 'private',
    };
  }

  const [created] = await db
    .insert(userProfiles)
    .values({
      userId,
      profileVisibilityDefault: 'public',
    })
    .returning();

  return {
    ...created,
    profileVisibilityDefault: created.profileVisibilityDefault as 'public' | 'private',
  };
}

export function normalizeOptionalUrl(value: unknown): string | null {
  if (value === null || value === undefined || value === '') {
    return null;
  }

  if (typeof value !== 'string') {
    throw new Error('Invalid URL value');
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return null;
  }

  const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  let parsed: URL;
  try {
    parsed = new URL(withProtocol);
  } catch {
    throw new Error('Invalid URL format');
  }

  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
    throw new Error('URL must start with http:// or https://');
  }

  return parsed.toString();
}

export function getUserStatus(user: User): UserStatus {
  if (user.isBanned) {
    return 'banned';
  }

  if (user.isSuspended && user.suspendedUntil && new Date() < new Date(user.suspendedUntil)) {
    return 'suspended';
  }

  return 'active';
}

export function calculateProfileCompletionScore(input: {
  name: string | null;
  profile: Partial<UserProfile> | null;
}): number {
  const profile = input.profile;
  const fields = [
    !!(input.name && input.name.trim()),
    !!(profile?.headline && profile.headline.trim()),
    !!(profile?.bio && profile.bio.trim()),
    !!(profile?.location && profile.location.trim()),
    !!(profile?.timezone && profile.timezone.trim()),
    !!(profile?.linkedinUrl && profile.linkedinUrl.trim()),
    !!(profile?.twitterUrl && profile.twitterUrl.trim()),
    !!(profile?.websiteUrl && profile.websiteUrl.trim()),
  ];

  const completeCount = fields.filter(Boolean).length;
  return Math.round((completeCount / fields.length) * 100);
}

export function hasCompletedOnboarding(input: {
  name: string | null;
  profile: Partial<UserProfile> | null;
}): boolean {
  return Boolean(
    input.name &&
      input.name.trim() &&
      input.profile?.headline &&
      input.profile.headline.trim() &&
      input.profile?.bio &&
      input.profile.bio.trim()
  );
}

export async function getUserWithProfileById(userId: string): Promise<UserWithProfile | null> {
  const user = await getUserById(userId);
  if (!user) {
    return null;
  }

  const profile = await ensureUserProfile(userId);
  const completion = calculateProfileCompletionScore({ name: user.name, profile });
  const status = getUserStatus(user);

  return {
    ...user,
    status,
    profileCompletionScore: completion,
    hasCompletedOnboarding: hasCompletedOnboarding({ name: user.name, profile }),
    profile,
  };
}

export async function createUser(params: {
  email: string;
  password: string;
  name: string;
}): Promise<User> {
  const passwordHash = await hashPassword(params.password);

  const [user] = await db
    .insert(users)
    .values({
      email: params.email.toLowerCase(),
      name: params.name,
      passwordHash,
    })
    .returning();

  return user;
}

export async function updateUserLastLogin(userId: string): Promise<void> {
  await db
    .update(users)
    .set({ lastLoginAt: new Date() })
    .where(eq(users.id, userId));
}

export async function updateUserPassword(userId: string, newPassword: string): Promise<void> {
  const passwordHash = await hashPassword(newPassword);
  await db
    .update(users)
    .set({
      passwordHash,
      passwordResetToken: null,
      passwordResetExpires: null,
    })
    .where(eq(users.id, userId));
}

export async function setPasswordResetToken(userId: string): Promise<string> {
  const token = generateResetToken();
  const expires = new Date();
  expires.setHours(expires.getHours() + 1); // 1 hour expiry

  await db
    .update(users)
    .set({
      passwordResetToken: token,
      passwordResetExpires: expires,
    })
    .where(eq(users.id, userId));

  return token;
}

export async function verifyPasswordResetToken(token: string): Promise<User | null> {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.passwordResetToken, token))
    .limit(1);

  if (!user) {
    return null;
  }

  // Check if token is expired
  if (!user.passwordResetExpires || new Date() > new Date(user.passwordResetExpires)) {
    return null;
  }

  return user;
}

export async function updateUserProfile(
  userId: string,
  data: {
    name?: string;
    avatarUrl?: string | null;
    headline?: string | null;
    bio?: string | null;
    location?: string | null;
    timezone?: string | null;
    linkedinUrl?: string | null;
    twitterUrl?: string | null;
    websiteUrl?: string | null;
    profileVisibilityDefault?: 'public' | 'private';
  }
): Promise<User | null> {
  const userUpdate: {
    name?: string;
    avatarUrl?: string | null;
  } = {};
  const profileUpdate: {
    headline?: string | null;
    bio?: string | null;
    location?: string | null;
    timezone?: string | null;
    linkedinUrl?: string | null;
    twitterUrl?: string | null;
    websiteUrl?: string | null;
    profileVisibilityDefault?: 'public' | 'private';
    updatedAt?: Date;
  } = {};

  if (data.name !== undefined) userUpdate.name = data.name;
  if (data.avatarUrl !== undefined) userUpdate.avatarUrl = data.avatarUrl;
  if (data.headline !== undefined) profileUpdate.headline = data.headline;
  if (data.bio !== undefined) profileUpdate.bio = data.bio;
  if (data.location !== undefined) profileUpdate.location = data.location;
  if (data.timezone !== undefined) profileUpdate.timezone = data.timezone;
  if (data.linkedinUrl !== undefined) profileUpdate.linkedinUrl = data.linkedinUrl;
  if (data.twitterUrl !== undefined) profileUpdate.twitterUrl = data.twitterUrl;
  if (data.websiteUrl !== undefined) profileUpdate.websiteUrl = data.websiteUrl;
  if (data.profileVisibilityDefault !== undefined) {
    profileUpdate.profileVisibilityDefault = data.profileVisibilityDefault;
  }

  if (Object.keys(profileUpdate).length > 0) {
    await ensureUserProfile(userId);
    profileUpdate.updatedAt = new Date();
    await db
      .update(userProfiles)
      .set(profileUpdate)
      .where(eq(userProfiles.userId, userId));
  }

  if (Object.keys(userUpdate).length === 0) {
    return getUserById(userId);
  }

  const [user] = await db.update(users).set(userUpdate).where(eq(users.id, userId)).returning();

  return user || null;
}

// ============================================
// VALIDATION HELPERS
// ============================================
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePassword(password: string): { valid: boolean; error?: string } {
  if (password.length < 8) {
    return { valid: false, error: 'Password must be at least 8 characters' };
  }
  return { valid: true };
}

// ============================================
// USER STATUS CHECKS
// ============================================
export function checkUserStatus(user: User): { allowed: boolean; error?: string } {
  const status = getUserStatus(user);

  if (status === 'banned') {
    return {
      allowed: false,
      error: user.banReason || 'Your account has been banned'
    };
  }

  if (status === 'suspended') {
    if (user.suspendedUntil && new Date() < new Date(user.suspendedUntil)) {
      const until = new Date(user.suspendedUntil).toLocaleDateString();
      return {
        allowed: false,
        error: `Your account is suspended until ${until}. ${user.suspensionReason || ''}`.trim()
      };
    }
  }

  return { allowed: true };
}
