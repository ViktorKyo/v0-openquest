import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';
import crypto from 'crypto';
import { db } from './db/supabase';
import { adminUsers, adminActions } from './db/schema';
import { eq } from 'drizzle-orm';

const secret = new TextEncoder().encode(
  process.env.ADMIN_SESSION_SECRET || 'your-secret-key-here-change-in-production'
);

export interface AdminSession {
  adminDbId: string; // UUID in database
  adminId: string; // admin_7k2p9xm4w1c5n8qr
  name: string | null;
  email: string | null;
  role: 'super_admin' | 'moderator' | 'analyst';
}

// ============================================
// ADMIN ID GENERATION
// ============================================
export function generateAdminId(): string {
  const bytes = crypto.randomBytes(12);
  const id = bytes
    .toString('base64')
    .replace(/[+/=]/g, '')
    .substring(0, 16);
  return `admin_${id}`;
}

// ============================================
// SESSION MANAGEMENT
// ============================================
export async function createSession(
  adminDbId: string,
  rememberMe: boolean = false
): Promise<string> {
  const token = await new SignJWT({ adminDbId })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(rememberMe ? '30d' : '24h')
    .sign(secret);

  return token;
}

export async function verifySession(token: string): Promise<AdminSession | null> {
  try {
    const verified = await jwtVerify(token, secret);
    const adminDbId = verified.payload.adminDbId as string;

    // Fetch admin from database
    const [admin] = await db
      .select()
      .from(adminUsers)
      .where(eq(adminUsers.id, adminDbId))
      .limit(1);

    if (!admin || !admin.isActive) {
      return null;
    }

    return {
      adminDbId: admin.id,
      adminId: admin.adminId,
      name: admin.name,
      email: admin.email,
      role: admin.role as 'super_admin' | 'moderator' | 'analyst',
    };
  } catch (error) {
    return null;
  }
}

export async function getAdminSession(req?: NextRequest): Promise<AdminSession | null> {
  try {
    const cookieStore = await cookies();
    const token = req
      ? req.cookies.get('admin_session')?.value
      : cookieStore.get('admin_session')?.value;

    if (!token) {
      return null;
    }

    return await verifySession(token);
  } catch (error) {
    return null;
  }
}

export async function setAdminSession(adminDbId: string, rememberMe: boolean = false) {
  const token = await createSession(adminDbId, rememberMe);
  const cookieStore = await cookies();

  cookieStore.set('admin_session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: rememberMe ? 30 * 24 * 60 * 60 : 24 * 60 * 60, // 30 days or 24 hours
    path: '/',
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_session');
}

// ============================================
// AUTHENTICATION
// ============================================
export async function authenticateAdmin(adminId: string): Promise<AdminSession | null> {
  try {
    const [admin] = await db
      .select()
      .from(adminUsers)
      .where(eq(adminUsers.adminId, adminId))
      .limit(1);

    if (!admin || !admin.isActive) {
      return null;
    }

    // Update last login
    await db
      .update(adminUsers)
      .set({ lastLogin: new Date() })
      .where(eq(adminUsers.id, admin.id));

    return {
      adminDbId: admin.id,
      adminId: admin.adminId,
      name: admin.name,
      email: admin.email,
      role: admin.role as 'super_admin' | 'moderator' | 'analyst',
    };
  } catch (error) {
    console.error('Authentication error:', error);
    return null;
  }
}

// ============================================
// AUDIT LOGGING
// ============================================
export async function logAdminAction(params: {
  adminId: string; // UUID in database
  actionType: string;
  targetType: string;
  targetId: string;
  notes?: string;
  metadata?: Record<string, any>;
}) {
  try {
    await db.insert(adminActions).values({
      adminId: params.adminId,
      actionType: params.actionType,
      targetType: params.targetType,
      targetId: params.targetId,
      notes: params.notes,
      metadata: params.metadata,
    });
  } catch (error) {
    console.error('Failed to log admin action:', error);
  }
}

// ============================================
// PERMISSION CHECKS
// ============================================
export function hasPermission(
  session: AdminSession,
  requiredRole: 'super_admin' | 'moderator' | 'analyst'
): boolean {
  const roleHierarchy = {
    super_admin: 3,
    moderator: 2,
    analyst: 1,
  };

  return roleHierarchy[session.role] >= roleHierarchy[requiredRole];
}
