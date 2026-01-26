import { NextRequest, NextResponse } from 'next/server';
import { authenticateAdmin, setAdminSession, logAdminAction } from '@/lib/admin-auth';
import { loginLimiter } from '@/lib/rate-limit';

export async function POST(req: NextRequest) {
  try {
    // Rate limiting (disabled in development)
    const ip = req.ip || req.headers.get('x-forwarded-for') || 'unknown';

    // TODO: Re-enable rate limiting in production
    // try {
    //   await loginLimiter.check(5, ip); // 5 attempts per hour
    // } catch {
    //   return NextResponse.json(
    //     { error: 'Too many login attempts. Please try again in an hour.' },
    //     { status: 429 }
    //   );
    // }

    const { adminId, rememberMe } = await req.json();

    if (!adminId || typeof adminId !== 'string') {
      return NextResponse.json({ error: 'Admin ID is required' }, { status: 400 });
    }

    // Authenticate
    const session = await authenticateAdmin(adminId);

    if (!session) {
      // Log failed attempt
      console.log(`Failed login attempt for admin ID: ${adminId} from IP: ${ip}`);
      return NextResponse.json({ error: 'Invalid admin ID' }, { status: 401 });
    }

    // Set session cookie
    await setAdminSession(session.adminDbId, rememberMe);

    // Log successful login
    await logAdminAction({
      adminId: session.adminDbId,
      actionType: 'login',
      targetType: 'admin',
      targetId: session.adminDbId,
      notes: `Logged in from IP: ${ip}`,
    });

    return NextResponse.json({
      success: true,
      admin: {
        name: session.name,
        email: session.email,
        role: session.role,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
