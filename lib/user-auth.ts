import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { db } from './db/supabase';
import { users } from './db/schema';
import { eq } from 'drizzle-orm';

const secret = new TextEncoder().encode(
  process.env.USER_SESSION_SECRET || 'user-secret-key-change-in-production'
);

const COOKIE_NAME = 'user_session';
const BCRYPT_ROUNDS = 12;

export interface UserSession {
  userId: string;
  email: string;
  name: string | null;
  avatarUrl: string | null;
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
  rememberMe: boolean = false
): Promise<string> {
  const token = await new SignJWT({ userId })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(rememberMe ? '30d' : '24h')
    .sign(secret);

  return token;
}

export async function verifyUserSession(token: string): Promise<UserSession | null> {
  try {
    const verified = await jwtVerify(token, secret);
    const userId = verified.payload.userId as string;

    // Fetch user from database
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    if (!user) {
      return null;
    }

    // Check if user is banned
    if (user.isBanned) {
      return null;
    }

    // Check if user is suspended and suspension hasn't expired
    if (user.isSuspended && user.suspendedUntil) {
      if (new Date() < new Date(user.suspendedUntil)) {
        return null;
      }
      // Suspension expired, could auto-unsuspend here
    }

    return {
      userId: user.id,
      email: user.email,
      name: user.name,
      avatarUrl: user.avatarUrl,
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

export async function setUserSession(userId: string, rememberMe: boolean = false) {
  const token = await createUserSession(userId, rememberMe);
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
  data: { name?: string; avatarUrl?: string }
): Promise<User | null> {
  const [user] = await db
    .update(users)
    .set(data)
    .where(eq(users.id, userId))
    .returning();

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
  if (user.isBanned) {
    return {
      allowed: false,
      error: user.banReason || 'Your account has been banned'
    };
  }

  if (user.isSuspended) {
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
