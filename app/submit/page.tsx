import { Suspense } from "react"
import ProblemSubmitForm from "@/components/problem-submit-form"
import { Loader2 } from "lucide-react"

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
