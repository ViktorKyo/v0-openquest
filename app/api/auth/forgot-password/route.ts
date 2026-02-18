import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { render } from '@react-email/render';
import { getUserByEmail, setPasswordResetToken, validateEmail } from '@/lib/user-auth';
import { checkPasswordResetRateLimit } from '@/lib/rate-limit';
import { PasswordResetEmail } from '@/lib/email/templates/password-reset';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    // Validate email
    if (!email || !validateEmail(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // Rate limiting by email
    try {
      await checkPasswordResetRateLimit(email.toLowerCase());
    } catch {
      // Don't reveal rate limiting - still return success
      return NextResponse.json({
        success: true,
        message: 'If an account exists with this email, you will receive a password reset link.',
      });
    }

    // Find user
    const user = await getUserByEmail(email);

    // Always return success to prevent email enumeration
    if (!user) {
      return NextResponse.json({
        success: true,
        message: 'If an account exists with this email, you will receive a password reset link.',
      });
    }

    // Generate reset token
    const token = await setPasswordResetToken(user.id);

    // Build reset URL
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || req.nextUrl.origin;
    const resetUrl = `${appUrl}/reset-password?token=${token}`;

    // Send email
    if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== 're_your_api_key_here') {
      const html = await render(
        PasswordResetEmail({
          userName: user.name || undefined,
          resetUrl,
        })
      );

      await resend.emails.send({
        from: 'OpenQuest <notifications@openquest.app>',
        to: user.email,
        subject: 'Reset your password',
        html,
      });
    } else if (process.env.NODE_ENV === 'development') {
      // Development only: log the reset URL to console
      // eslint-disable-next-line no-console
      console.log('[DEV] Password reset URL:', resetUrl);
    }

    return NextResponse.json({
      success: true,
      message: 'If an account exists with this email, you will receive a password reset link.',
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json(
      { error: 'Failed to process request. Please try again.' },
      { status: 500 }
    );
  }
}
