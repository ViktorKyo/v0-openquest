import { NextRequest, NextResponse } from 'next/server';
import {
  createUser,
  getUserByEmail,
  validateEmail,
  validatePassword,
} from '@/lib/user-auth';
import { checkSignupRateLimit } from '@/lib/rate-limit';

const SIGNUP_NEUTRAL_MESSAGE = 'If this email can be used for OpenQuest, your account is ready. Please sign in.';

export async function POST(req: NextRequest) {
  try {
    // Rate limiting
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';

    try {
      await checkSignupRateLimit(ip);
    } catch {
      return NextResponse.json(
        { error: 'Too many signup attempts. Please try again later.' },
        { status: 429 }
      );
    }

    const { email, password, name } = await req.json();

    // Validate required fields
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Email, password, and name are required' },
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

    // Validate password strength
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      return NextResponse.json(
        { error: passwordValidation.error },
        { status: 400 }
      );
    }

    // Validate name
    if (name.trim().length < 2) {
      return NextResponse.json(
        { error: 'Name must be at least 2 characters' },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        {
          success: true,
          message: SIGNUP_NEUTRAL_MESSAGE,
        },
        { status: 200 }
      );
    }

    // Create user
    await createUser({
      email,
      password,
      name: name.trim(),
    });

    return NextResponse.json({
      success: true,
      message: SIGNUP_NEUTRAL_MESSAGE,
    }, { status: 200 });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Failed to create account. Please try again.' },
      { status: 500 }
    );
  }
}
