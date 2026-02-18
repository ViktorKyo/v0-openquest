import { NextRequest, NextResponse } from 'next/server';
import {
  calculateProfileCompletionScore,
  getUserSession,
  getUserWithProfileById,
  normalizeOptionalUrl,
  updateUserProfile,
} from '@/lib/user-auth';

export async function GET(req: NextRequest) {
  try {
    const session = await getUserSession(req);

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const user = await getUserWithProfileById(session.userId);

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
      headline: user.profile?.headline || null,
      bio: user.profile?.bio || null,
      location: user.profile?.location || null,
      timezone: user.profile?.timezone || null,
      linkedinUrl: user.profile?.linkedinUrl || null,
      twitterUrl: user.profile?.twitterUrl || null,
      websiteUrl: user.profile?.websiteUrl || null,
      profileVisibilityDefault: user.profile?.profileVisibilityDefault || 'public',
      status: user.status,
      hasCompletedOnboarding: user.hasCompletedOnboarding,
      profileCompletionScore: user.profileCompletionScore,
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
    const { name, avatarUrl, headline, bio, location, timezone, linkedinUrl, twitterUrl, websiteUrl, profileVisibilityDefault } = body;

    // Validate at least one field is provided
    if (
      name === undefined &&
      avatarUrl === undefined &&
      headline === undefined &&
      bio === undefined &&
      location === undefined &&
      timezone === undefined &&
      linkedinUrl === undefined &&
      twitterUrl === undefined &&
      websiteUrl === undefined &&
      profileVisibilityDefault === undefined
    ) {
      return NextResponse.json(
        { error: 'No fields to update' },
        { status: 400 }
      );
    }

    // Build update data
    const updateData: {
      name?: string;
      avatarUrl?: string | null;
      headline?: string | null;
      bio?: string | null;
      location?: string | null;
      timezone?: string | null;
      linkedinUrl?: string | null;
      twitterUrl?: string | null;
      websiteUrl?: string | null;
      profileVisibilityDefault?: 'public' | 'private';
    } = {};

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

    if (headline !== undefined) {
      if (headline !== null && typeof headline !== 'string') {
        return NextResponse.json({ error: 'Invalid headline' }, { status: 400 });
      }
      if (typeof headline === 'string' && headline.length > 120) {
        return NextResponse.json({ error: 'Headline must be 120 characters or less' }, { status: 400 });
      }
      updateData.headline = typeof headline === 'string' ? headline.trim() : null;
    }

    if (bio !== undefined) {
      if (bio !== null && typeof bio !== 'string') {
        return NextResponse.json({ error: 'Invalid bio' }, { status: 400 });
      }
      if (typeof bio === 'string' && bio.length > 500) {
        return NextResponse.json({ error: 'Bio must be 500 characters or less' }, { status: 400 });
      }
      updateData.bio = typeof bio === 'string' ? bio.trim() : null;
    }

    if (location !== undefined) {
      if (location !== null && typeof location !== 'string') {
        return NextResponse.json({ error: 'Invalid location' }, { status: 400 });
      }
      if (typeof location === 'string' && location.length > 120) {
        return NextResponse.json({ error: 'Location must be 120 characters or less' }, { status: 400 });
      }
      updateData.location = typeof location === 'string' ? location.trim() : null;
    }

    if (timezone !== undefined) {
      if (timezone !== null && typeof timezone !== 'string') {
        return NextResponse.json({ error: 'Invalid timezone' }, { status: 400 });
      }
      if (typeof timezone === 'string' && timezone.length > 64) {
        return NextResponse.json({ error: 'Timezone must be 64 characters or less' }, { status: 400 });
      }
      updateData.timezone = typeof timezone === 'string' ? timezone.trim() : null;
    }

    try {
      if (linkedinUrl !== undefined) {
        updateData.linkedinUrl = normalizeOptionalUrl(linkedinUrl);
      }
      if (twitterUrl !== undefined) {
        updateData.twitterUrl = normalizeOptionalUrl(twitterUrl);
      }
      if (websiteUrl !== undefined) {
        updateData.websiteUrl = normalizeOptionalUrl(websiteUrl);
      }
    } catch (error) {
      return NextResponse.json(
        { error: error instanceof Error ? error.message : 'Invalid URL' },
        { status: 400 }
      );
    }

    if (profileVisibilityDefault !== undefined) {
      if (profileVisibilityDefault !== 'public' && profileVisibilityDefault !== 'private') {
        return NextResponse.json(
          { error: 'profileVisibilityDefault must be public or private' },
          { status: 400 }
        );
      }
      updateData.profileVisibilityDefault = profileVisibilityDefault;
    }

    const updatedUser = await updateUserProfile(session.userId, updateData);

    if (!updatedUser) {
      return NextResponse.json(
        { error: 'Failed to update profile' },
        { status: 500 }
      );
    }

    const userWithProfile = await getUserWithProfileById(session.userId);
    if (!userWithProfile) {
      return NextResponse.json({ error: 'Failed to fetch updated profile' }, { status: 500 });
    }

    return NextResponse.json({
      id: userWithProfile.id,
      email: userWithProfile.email,
      name: userWithProfile.name,
      avatarUrl: userWithProfile.avatarUrl,
      headline: userWithProfile.profile?.headline || null,
      bio: userWithProfile.profile?.bio || null,
      location: userWithProfile.profile?.location || null,
      timezone: userWithProfile.profile?.timezone || null,
      linkedinUrl: userWithProfile.profile?.linkedinUrl || null,
      twitterUrl: userWithProfile.profile?.twitterUrl || null,
      websiteUrl: userWithProfile.profile?.websiteUrl || null,
      profileVisibilityDefault: userWithProfile.profile?.profileVisibilityDefault || 'public',
      status: userWithProfile.status,
      hasCompletedOnboarding: userWithProfile.hasCompletedOnboarding,
      profileCompletionScore: calculateProfileCompletionScore({
        name: userWithProfile.name,
        profile: userWithProfile.profile,
      }),
      createdAt: userWithProfile.createdAt,
    });
  } catch (error) {
    console.error('Update profile error:', error);
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    );
  }
}
