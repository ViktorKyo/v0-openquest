import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // Allow public admin routes
  if (path === '/admin/login' || path === '/admin/setup') {
    return NextResponse.next();
  }

  // Protect all /admin/* routes by checking for session cookie
  if (path.startsWith('/admin')) {
    const sessionCookie = req.cookies.get('admin_session');

    // If no session cookie, redirect to login
    // Full verification will happen in the layout
    if (!sessionCookie) {
      return NextResponse.redirect(new URL('/admin/login', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
