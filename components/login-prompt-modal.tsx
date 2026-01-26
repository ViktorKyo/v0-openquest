"use client"

import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Lock } from "lucide-react"

interface LoginPromptModalProps {
  isOpen: boolean
  onClose: () => void
  actionDescription: string
  returnUrl?: string
}

export function LoginPromptModal({
  isOpen,
  onClose,
  actionDescription,
  returnUrl
}: LoginPromptModalProps) {
  const router = useRouter()

  const handleSignIn = () => {
    const encodedReturnUrl = returnUrl ? `?returnUrl=${encodeURIComponent(returnUrl)}` : ""
    router.push(`/login${encodedReturnUrl}`)
  }

  const handleSignUp = () => {
    const encodedReturnUrl = returnUrl ? `?returnUrl=${encodeURIComponent(returnUrl)}` : ""
    router.push(`/login${encodedReturnUrl}`)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-full">
              <Lock className="text-primary h-6 w-6" />
            </div>
          </div>
          <DialogTitle className="text-center text-xl">Sign in to continue</DialogTitle>
          <DialogDescription className="text-center">
            You need to be signed in to {actionDescription}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex-col space-y-2 sm:flex-col sm:space-y-2">
          <Button onClick={handleSignIn} className="w-full" size="lg">
            Sign In
          </Button>
          <div className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <button
              onClick={handleSignUp}
              className="text-primary hover:underline font-medium"
            >
              Sign up
            </button>
          </div>
          <Button onClick={onClose} variant="outline" className="w-full">
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
