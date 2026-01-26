import { NextResponse } from 'next/server';
import { db } from '@/lib/db/supabase';
import { adminUsers } from '@/lib/db/schema';
import { generateAdminId } from '@/lib/admin-auth';
import { count } from 'drizzle-orm';

export async function GET() {
  try {
    // Check if any admin users exist
    const [result] = await db.select({ count: count() }).from(adminUsers);
    const adminCount = result.count;

    if (adminCount > 0) {
      return NextResponse.json(
        { error: 'Setup already completed. Admin users exist.' },
        { status: 403 }
      );
    }

    return NextResponse.json({ canSetup: true });
  } catch (error) {
    console.error('Setup check error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { name, email } = await req.json();

    // Check if any admin users exist
    const [result] = await db.select({ count: count() }).from(adminUsers);
    const adminCount = result.count;

    if (adminCount > 0) {
      return NextResponse.json(
        { error: 'Setup already completed. Admin users exist.' },
        { status: 403 }
      );
    }

    // Generate admin ID
    const adminId = generateAdminId();

    // Create first admin user
    const [newAdmin] = await db
      .insert(adminUsers)
      .values({
        adminId,
        name: name || null,
        email: email || null,
        role: 'super_admin',
        isActive: true,
      })
      .returning();

    return NextResponse.json({
      success: true,
      adminId,
      message: 'First admin user created successfully!',
    });
  } catch (error) {
    console.error('Setup error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
