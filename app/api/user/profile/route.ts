import { NextRequest, NextResponse } from 'next/server';
import { getUserSession, getUserById, updateUserProfile } from '@/lib/user-auth';

export async function GET(req: NextRequest) {
  try {
    const session = await getUserSession(req);

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const user = await getUserById(session.userId);

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      id: user.id,
      email: user.email,
      name: user.name,
      avatarUrl: user.avatarUrl,
      createdAt: user.createdAt,
    });
  } catch (error) {
    console.error('Get profile error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch profile' },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const session = await getUserSession(req);

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { name, avatarUrl } = body;

    // Validate at least one field is provided
    if (name === undefined && avatarUrl === undefined) {
      return NextResponse.json(
        { error: 'No fields to update' },
        { status: 400 }
      );
    }

    // Build update data
    const updateData: { name?: string; avatarUrl?: string } = {};

    if (name !== undefined) {
      if (typeof name !== 'string' || name.trim().length === 0) {
        return NextResponse.json(
          { error: 'Name cannot be empty' },
          { status: 400 }
        );
      }
      updateData.name = name.trim();
    }

    if (avatarUrl !== undefined) {
      if (avatarUrl !== null && typeof avatarUrl !== 'string') {
        return NextResponse.json(
          { error: 'Invalid avatar URL' },
          { status: 400 }
        );
      }
      updateData.avatarUrl = avatarUrl;
    }

    const updatedUser = await updateUserProfile(session.userId, updateData);

    if (!updatedUser) {
      return NextResponse.json(
        { error: 'Failed to update profile' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      id: updatedUser.id,
      email: updatedUser.email,
      name: updatedUser.name,
      avatarUrl: updatedUser.avatarUrl,
      createdAt: updatedUser.createdAt,
    });
  } catch (error) {
    console.error('Update profile error:', error);
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    );
  }
}
