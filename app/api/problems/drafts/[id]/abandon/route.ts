import { NextRequest, NextResponse } from "next/server"
import { and, eq } from "drizzle-orm"
import { db } from "@/lib/db/supabase"
import { problems } from "@/lib/db/schema"
import { getUserSession } from "@/lib/user-auth"

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getUserSession(req)
    if (!session) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const { id } = await params

    const [archived] = await db
      .update(problems)
      .set({
        status: "archived",
        updatedAt: new Date(),
      })
      .where(and(eq(problems.id, id), eq(problems.authorId, session.userId), eq(problems.status, "draft")))
      .returning({
        id: problems.id,
        status: problems.status,
      })

    if (!archived) {
      return NextResponse.json({ error: "Draft not found" }, { status: 404 })
    }

    return NextResponse.json({ draftId: archived.id, status: archived.status })
  } catch (error) {
    console.error("Draft abandon error:", error)
    return NextResponse.json({ error: "Failed to abandon draft" }, { status: 500 })
  }
}
