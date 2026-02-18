import type { Metadata } from "next"
import { Suspense } from "react"
import ProblemSubmitForm from "@/components/problem-submit-form"
import { Loader2 } from "lucide-react"

export const metadata: Metadata = {
  title: "Submit a Problem",
  description: "Share a problem you've encountered or want solved. Help founders find ideas worth building and connect with the OpenQuest community.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: { canonical: "/submit" },
  openGraph: {
    title: "Submit a Problem",
    description: "Share a problem you've encountered or want solved. Help founders find ideas worth building.",
    url: "/submit",
  },
}

export default function SubmitPage() {
  return (
    <div className="min-h-screen bg-background">
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        }
      >
        <ProblemSubmitForm />
      </Suspense>
    </div>
  )
}
