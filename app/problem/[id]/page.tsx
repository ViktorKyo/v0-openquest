import { ProblemDetailPage } from "@/components/problem-detail-page"

export default async function ProblemPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <ProblemDetailPage problemId={id} />
}
