import { NextRequest, NextResponse } from 'next/server';
import {
  getUserByEmail,
  verifyPassword,
  setUserSession,
  updateUserLastLogin,
  checkUserStatus,
  validateEmail,
} from '@/lib/user-auth';
import { userLoginLimiter } from '@/lib/rate-limit';
import { db } from '@/lib/db/supabase';
import { users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(req: NextRequest) {
  try {
    // Rate limiting
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';

    try {
      await userLoginLimiter.check(5, ip); // 5 attempts per hour per IP
    } catch {
      return NextResponse.json(
        { error: 'Too many login attempts. Please try again in an hour.' },
        { status: 429 }
      );
    }

    const { email, password, rememberMe } = await req.json();

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Validate email format
    if (!validateEmail(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // Get user with password hash
    const [userWithPassword] = await db
      .select()
      .from(users)
      .where(eq(users.email, email.toLowerCase()))
      .limit(1);

    if (!userWithPassword) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Check if user has a password set
    if (!userWithPassword.passwordHash) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Verify password
    const isValidPassword = await verifyPassword(password, userWithPassword.passwordHash);
    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Check if user is banned or suspended
    const statusCheck = checkUserStatus(userWithPassword);
    if (!statusCheck.allowed) {
      return NextResponse.json(
        { error: statusCheck.error },
        { status: 403 }
      );
    }

    // Update last login
    await updateUserLastLogin(userWithPassword.id);

    // Set session cookie
    await setUserSession(userWithPassword.id, rememberMe === true);

    return NextResponse.json({
      success: true,
      user: {
        id: userWithPassword.id,
        email: userWithPassword.email,
        name: userWithPassword.name,
        avatarUrl: userWithPassword.avatarUrl,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Login failed. Please try again.' },
      { status: 500 }
    );
  }
}
