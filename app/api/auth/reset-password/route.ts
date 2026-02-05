import { NextRequest, NextResponse } from 'next/server';
import {
  verifyPasswordResetToken,
  updateUserPassword,
  validatePassword,
  setUserSession,
} from '@/lib/user-auth';

export async function POST(req: NextRequest) {
  try {
    const { token, password } = await req.json();

    // Validate required fields
    if (!token) {
      return NextResponse.json(
        { error: 'Reset token is required' },
        { status: 400 }
      );
    }

    if (!password) {
      return NextResponse.json(
        { error: 'Password is required' },
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

    // Verify token and get user
    const user = await verifyPasswordResetToken(token);

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid or expired reset link. Please request a new one.' },
        { status: 400 }
      );
    }

    // Update password
    await updateUserPassword(user.id, password);

    // Log user in after password reset
    await setUserSession(user.id, false);

    return NextResponse.json({
      success: true,
      message: 'Password reset successfully',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        avatarUrl: user.avatarUrl,
      },
    });
  } catch (error) {
    console.error('Reset password error:', error);
    return NextResponse.json(
      { error: 'Failed to reset password. Please try again.' },
      { status: 500 }
    );
  }
}
