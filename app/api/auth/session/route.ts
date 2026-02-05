import { NextResponse } from 'next/server';
import { getUserSession } from '@/lib/user-auth';

export async function GET() {
  try {
    const session = await getUserSession();

    if (!session) {
      return NextResponse.json({
        authenticated: false,
        user: null,
      });
    }

    return NextResponse.json({
      authenticated: true,
      user: {
        id: session.userId,
        email: session.email,
        name: session.name,
        avatarUrl: session.avatarUrl,
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
