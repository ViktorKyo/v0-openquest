import { NextRequest, NextResponse } from "next/server"
import { and, eq, sql } from "drizzle-orm"
import { db } from "@/lib/db/supabase"
import { problems } from "@/lib/db/schema"
import { getUserSession } from "@/lib/user-auth"
import { draftFieldsSchema, getCompletenessScore, toDbDraftValues } from "@/lib/problem-drafts"
import { checkDraftUpdateRateLimit } from "@/lib/rate-limit"

async function getOwnedDraft(problemId: string, userId: string) {
  const [draft] = await db
    .select({
      id: problems.id,
      title: problems.title,
      elevatorPitch: problems.elevatorPitch,
      fullDescription: problems.fullDescription,
      category: problems.category,
      industryTags: problems.industryTags,
      isAnonymous: problems.isAnonymous,
      involvement: problems.involvement,
      wantBuildBlocker: problems.wantBuildBlocker,
      alreadyBuildingSupport: problems.alreadyBuildingSupport,
      wantToWorkInvolvement: problems.wantToWorkInvolvement,
      deckType: problems.deckType,
      deckLink: problems.deckLink,
      forkedFromProblemId: problems.forkedFromProblemId,
      creatorLaunchCommentDraft: problems.creatorLaunchCommentDraft,
      tweetUrls: problems.tweetUrls,
      status: problems.status,
      createdAt: problems.createdAt,
      updatedAt: problems.updatedAt,
      draftUpdatedAt: problems.draftUpdatedAt,
      submissionVersion: problems.submissionVersion,
    })
    .from(problems)
    .where(and(eq(problems.id, problemId), eq(problems.authorId, userId)))
    .limit(1)

  return draft
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getUserSession(req)
    if (!session) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const { id } = await params
    const draft = await getOwnedDraft(id, session.userId)

    if (!draft || draft.status !== "draft") {
      return NextResponse.json({ error: "Draft not found" }, { status: 404 })
    }

    return NextResponse.json({
      draft: {
        id: draft.id,
        title: draft.title,
        pitch: draft.elevatorPitch,
        description: draft.fullDescription,
        category: draft.category,
        tags: draft.industryTags || [],
        anonymous: draft.isAnonymous || false,
        involvement: draft.involvement || "just-sharing",
        wantBuildBlocker: draft.wantBuildBlocker || [],
        alreadyBuildingSupport: draft.alreadyBuildingSupport || [],
        wantToWorkInvolvement: (draft.wantToWorkInvolvement as string[]) || [],
        deckType: draft.deckType || "none",
        deckLink: draft.deckLink || "",
        creatorLaunchComment: draft.creatorLaunchCommentDraft || "",
        tweetUrls: (draft.tweetUrls as string[]) || [],
        forkedFromProblemId: draft.forkedFromProblemId || undefined,
        status: draft.status,
        updatedAt: draft.updatedAt || draft.createdAt,
        submissionVersion: draft.submissionVersion,
        completenessScore: getCompletenessScore({
          title: draft.title,
          elevatorPitch: draft.elevatorPitch,
          fullDescription: draft.fullDescription,
          category: draft.category,
          involvement: draft.involvement,
        }),
      },
    })
  } catch (error) {
    console.error("Draft fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch draft" }, { status: 500 })
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getUserSession(req)
    if (!session) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    try {
      await checkDraftUpdateRateLimit(session.userId)
    } catch {
      return NextResponse.json({ error: "Too many save attempts" }, { status: 429 })
    }

    const { id } = await params
    const draft = await getOwnedDraft(id, session.userId)

    if (!draft || draft.status !== "draft") {
      return NextResponse.json({ error: "Draft not found" }, { status: 404 })
    }

    const body = await req.json()
    const { submissionVersion, ...draftBody } = body as Record<string, unknown>
    const parsed = draftFieldsSchema.safeParse(draftBody)
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid draft payload" }, { status: 400 })
    }
    if (typeof submissionVersion !== "number" || !Number.isInteger(submissionVersion) || submissionVersion < 1) {
      return NextResponse.json({ error: "Missing or invalid submission version" }, { status: 400 })
    }

    const [updated] = await db
      .update(problems)
      .set({
        ...toDbDraftValues(parsed.data),
        draftUpdatedAt: new Date(),
        updatedAt: new Date(),
        submissionVersion: sql`${problems.submissionVersion} + 1`,
      })
      .where(
        and(
          eq(problems.id, id),
          eq(problems.authorId, session.userId),
          eq(problems.status, "draft"),
          eq(problems.submissionVersion, submissionVersion),
        ),
      )
      .returning({
        id: problems.id,
        updatedAt: problems.updatedAt,
        title: problems.title,
        elevatorPitch: problems.elevatorPitch,
        fullDescription: problems.fullDescription,
        category: problems.category,
        involvement: problems.involvement,
        submissionVersion: problems.submissionVersion,
      })

    if (!updated) {
      const latestDraft = await getOwnedDraft(id, session.userId)
      if (latestDraft && latestDraft.status === "draft") {
        return NextResponse.json(
          {
            error: "Draft has been updated elsewhere. Please refresh and try again.",
            code: "VERSION_CONFLICT",
            currentSubmissionVersion: latestDraft.submissionVersion,
          },
          { status: 409 },
        )
      }
      return NextResponse.json({ error: "Draft not found" }, { status: 404 })
    }

    return NextResponse.json({
      draftId: updated.id,
      status: "draft",
      savedAt: updated.updatedAt,
      submissionVersion: updated.submissionVersion,
      validation: {
        completenessScore: getCompletenessScore({
          title: updated.title,
          elevatorPitch: updated.elevatorPitch,
          fullDescription: updated.fullDescription,
          category: updated.category,
          involvement: updated.involvement,
        }),
      },
    })
  } catch (error) {
    console.error("Draft update error:", error)
    return NextResponse.json({ error: "Failed to update draft" }, { status: 500 })
  }
}
