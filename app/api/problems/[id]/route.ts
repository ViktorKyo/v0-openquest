import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/supabase';
import { problems, users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { getUserSession } from '@/lib/user-auth';
import { canAccessProblem } from '@/lib/problem-access';
import { getInstitutionFlagsFromAuthorName } from '@/lib/problem-utils';

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// GET /api/problems/[id] - Get a single problem by ID
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: problemId } = await params;
    if (!UUID_RE.test(problemId)) {
      return NextResponse.json({ error: 'Invalid problem ID' }, { status: 400 });
    }

    // Fetch problem with author info
    const [result] = await db
      .select({
        id: problems.id,
        title: problems.title,
        elevatorPitch: problems.elevatorPitch,
        fullDescription: problems.fullDescription,
        category: problems.category,
        industryTags: problems.industryTags,
        status: problems.status,
        upvotes: problems.upvotes,
        commentCount: problems.commentCount,
        builderCount: problems.builderCount,
        investorCount: problems.investorCount,
        createdAt: problems.createdAt,
        publishedAt: problems.publishedAt,
        authorId: problems.authorId,
        isAnonymous: problems.isAnonymous,
        authorName: users.name,
        authorAvatarUrl: users.avatarUrl,
        involvement: problems.involvement,
        wantBuildBlocker: problems.wantBuildBlocker,
        alreadyBuildingSupport: problems.alreadyBuildingSupport,
        wantToWorkInvolvement: problems.wantToWorkInvolvement,
        deckType: problems.deckType,
        deckLink: problems.deckLink,
        forkedFromProblemId: problems.forkedFromProblemId,
        tweetUrls: problems.tweetUrls,
      })
      .from(problems)
      .leftJoin(users, eq(problems.authorId, users.id))
      .where(eq(problems.id, problemId))
      .limit(1);

    if (!result) {
      return NextResponse.json({ error: 'Problem not found' }, { status: 404 });
    }

    const session = await getUserSession(req);
    if (!canAccessProblem({ status: result.status, authorId: result.authorId, userId: session?.userId })) {
      return NextResponse.json({ error: 'Problem not found' }, { status: 404 });
    }

    const flags = getInstitutionFlagsFromAuthorName(result.authorName);

    const problem = {
      id: result.id,
      title: result.title,
      elevatorPitch: result.elevatorPitch,
      fullDescription: result.fullDescription,
      category: result.category,
      industryTags: result.industryTags,
      upvotes: result.upvotes || 0,
      commentCount: result.commentCount || 0,
      builderCount: result.builderCount || 0,
      investorCount: result.investorCount || 0,
      involvement: result.involvement,
      wantBuildBlocker: result.wantBuildBlocker,
      alreadyBuildingSupport: result.alreadyBuildingSupport || [],
      wantToWorkInvolvement: result.wantToWorkInvolvement || [],
      deckType: result.deckType,
      deckLink: result.deckLink,
      forkedFromProblemId: result.forkedFromProblemId,
      tweetUrls: (result.tweetUrls as string[]) || [],
      author: {
        id: result.authorId,
        name: result.isAnonymous ? 'Anonymous' : (result.authorName || 'Anonymous'),
        avatarUrl: result.isAnonymous ? null : result.authorAvatarUrl,
        isAnonymous: result.isAnonymous,
        isYC: flags.isYC,
        isWeekendFund: flags.isWeekendFund,
        isConviction: flags.isConviction,
        isARK: flags.isARK,
        isPathlight: flags.isPathlight,
        isAccel: flags.isAccel,
      },
      createdAt: result.createdAt,
      publishedAt: result.publishedAt,
      isYCRFS: flags.isYCRFS,
      isWeekendFundRFS: flags.isWeekendFundRFS,
      isConviction: flags.isConviction,
      isARK: flags.isARK,
      isPathlight: flags.isPathlight,
      isAccel: flags.isAccel,
    };

    return NextResponse.json({ problem });
  } catch (error) {
    console.error('Error fetching problem:', error);
    return NextResponse.json({ error: 'Failed to fetch problem' }, { status: 500 });
  }
}
