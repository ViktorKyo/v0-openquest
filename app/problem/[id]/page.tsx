import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ProblemDetailPage } from "@/components/problem-detail-page"
import { getProblemById } from "@/lib/db/queries/get-problem"
import { allProblems } from "@/data/mock-problems"
import { getInstitutionFlagsFromAuthorName } from "@/lib/problem-utils"
import type { BaseProblem, ProblemDetailApiResponse } from "@/types/problem"

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

function getMockProblemById(id: string): BaseProblem | undefined {
  return allProblems.find((problem) => String(problem.id) === id) as BaseProblem | undefined
}

function toProblemDetailApiResponse(problem: Awaited<ReturnType<typeof getProblemById>>): ProblemDetailApiResponse | null {
  if (!problem) return null
  return {
    ...problem,
    createdAt: problem.createdAt,
    publishedAt: problem.publishedAt,
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params

  try {
    let title = ""
    let category = ""
    let elevatorPitch = ""
    let fullDescription = ""

    if (UUID_RE.test(id)) {
      const dbProblem = await getProblemById(id)
      if (!dbProblem) {
        return {
          title: "Problem Not Found",
        }
      }
      title = dbProblem.title
      category = dbProblem.category
      elevatorPitch = dbProblem.elevatorPitch
      fullDescription = dbProblem.fullDescription
    } else {
      const mockProblem = getMockProblemById(id)
      if (!mockProblem) {
        return {
          title: "Problem Not Found",
        }
      }
      title = mockProblem.title
      category = mockProblem.category
      elevatorPitch = mockProblem.elevatorPitch
      fullDescription = mockProblem.fullDescription || ""
    }

    const description = elevatorPitch
      || (fullDescription ? fullDescription.slice(0, 160) : "Explore this problem on OpenQuest.")

    const ogImageUrl = `/api/og?${new URLSearchParams({
      title,
      description: description.slice(0, 140),
      ...(category ? { category } : {}),
    }).toString()}`

    return {
      title,
      description,
      alternates: { canonical: `/problem/${id}` },
      openGraph: {
        title,
        description,
        url: `/problem/${id}`,
        type: "article",
        images: [{ url: ogImageUrl, width: 1200, height: 630, alt: title }],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [ogImageUrl],
      },
    }
  } catch {
    return {
      title: "Problem",
      description: "Explore problems worth solving on OpenQuest.",
    }
  }
}

export default async function ProblemPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  if (UUID_RE.test(id)) {
    const problem = await getProblemById(id)
    if (!problem) {
      notFound()
    }
    return (
      <ProblemDetailPage
        problemId={id}
        initialProblemData={toProblemDetailApiResponse(problem)}
      />
    )
  }

  const mockProblem = getMockProblemById(id)
  if (!mockProblem) {
    notFound()
  }

  const flags = getInstitutionFlagsFromAuthorName(mockProblem.author.name || mockProblem.author.username || null)
  const mockAsApi: ProblemDetailApiResponse = {
    id: String(mockProblem.id),
    title: mockProblem.title,
    elevatorPitch: mockProblem.elevatorPitch,
    fullDescription: mockProblem.fullDescription || mockProblem.elevatorPitch,
    category: mockProblem.category,
    industryTags: mockProblem.industryTags || [],
    upvotes: mockProblem.upvotes || 0,
    commentCount: mockProblem.commentCount || 0,
    builderCount: mockProblem.builderCount || 0,
    investorCount: mockProblem.investorCount || 0,
    involvement: mockProblem.involvement || null,
    wantBuildBlocker: mockProblem.wantBuildBlocker || [],
    alreadyBuildingSupport: mockProblem.alreadyBuildingSupport || [],
    wantToWorkInvolvement: mockProblem.wantToWorkInvolvement || [],
    deckType: null,
    deckLink: null,
    forkedFromProblemId: null,
    tweetUrls: mockProblem.tweetUrls || [],
    author: {
      id: null,
      name: mockProblem.isAnonymous ? "Anonymous" : (mockProblem.author.name || mockProblem.author.username || "Anonymous"),
      avatarUrl: mockProblem.isAnonymous ? null : (mockProblem.author.avatarUrl || null),
      isAnonymous: mockProblem.isAnonymous || false,
      isYC: flags.isYC,
      isWeekendFund: flags.isWeekendFund,
      isConviction: flags.isConviction,
      isARK: flags.isARK,
      isPathlight: flags.isPathlight,
      isAccel: flags.isAccel,
    },
    createdAt: mockProblem.createdAt,
    publishedAt: mockProblem.publishedAt || null,
    isYCRFS: mockProblem.isYCRFS || false,
    isWeekendFundRFS: mockProblem.isWeekendFundRFS || false,
    isConviction: mockProblem.isConviction || false,
    isARK: mockProblem.isARK || false,
    isPathlight: mockProblem.isPathlight || false,
    isAccel: mockProblem.isAccel || false,
    ycQuarter: mockProblem.ycQuarter,
    wfPublishedDate: mockProblem.wfPublishedDate,
    convictionPublishedDate: mockProblem.convictionPublishedDate,
    arkPublishedDate: mockProblem.arkPublishedDate,
    pathlightPublishedDate: mockProblem.pathlightPublishedDate,
    accelPublishedDate: mockProblem.accelPublishedDate,
  }

  return <ProblemDetailPage problemId={id} initialProblemData={mockAsApi} />
}
