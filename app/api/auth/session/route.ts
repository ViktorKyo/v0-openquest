import { NextResponse } from 'next/server';
import { getUserSession, getUserWithProfileById } from '@/lib/user-auth';

export async function GET() {
  try {
    const session = await getUserSession();

    if (!session) {
      return NextResponse.json({
        authenticated: false,
        user: null,
      });
    }

    const user = await getUserWithProfileById(session.userId);
    if (!user) {
      return NextResponse.json({
        authenticated: false,
        user: null,
      });
    }

    return NextResponse.json({
      authenticated: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        avatarUrl: user.avatarUrl,
        status: user.status,
        hasCompletedOnboarding: user.hasCompletedOnboarding,
        profileCompletionScore: user.profileCompletionScore,
      },
    });
  } catch (error) {
    console.error('Session check error:', error);
    return NextResponse.json({
      authenticated: false,
      user: null,
    });
  }
}
