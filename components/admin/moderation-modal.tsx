"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, CheckCircle, XCircle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

interface Problem {
  id: string
  title: string
  elevatorPitch: string
  category: string
  status: string
  authorName: string | null
  authorEmail: string | null
  createdAt: Date
}

interface ModerationModalProps {
  problem: Problem | null
  isOpen: boolean
  onClose: () => void
  onModerate: (problemId: string, action: "approve" | "reject", notes?: string) => Promise<void>
}

export function ModerationModal({
  problem,
  isOpen,
  onClose,
  onModerate,
}: ModerationModalProps) {
  const [action, setAction] = useState<"approve" | "reject" | null>(null)
  const [notes, setNotes] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (!problem || !action) return

    setIsSubmitting(true)
    try {
      await onModerate(problem.id, action, notes)
      handleClose()
    } catch (error) {
      console.error("Moderation failed:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    setAction(null)
    setNotes("")
    onClose()
  }

  if (!problem) return null

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Moderate Problem</DialogTitle>
          <DialogDescription>
            Review and decide whether to approve or reject this submission
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Problem Details */}
          <div className="space-y-4 p-4 rounded-lg border bg-secondary/20">
            <div>
              <h3 className="font-semibold text-lg mb-2">{problem.title}</h3>
              <Badge variant="secondary">{problem.category}</Badge>
            </div>

            <div>
              <Label className="text-sm text-muted-foreground">Elevator Pitch</Label>
              <p className="mt-1 text-sm">{problem.elevatorPitch}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-3 border-t">
              <div>
                <Label className="text-xs text-muted-foreground">Author</Label>
                <p className="text-sm font-medium">
                  {problem.authorName || problem.authorEmail || "Unknown"}
                </p>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Submitted</Label>
                <p className="text-sm font-medium">
                  {new Date(problem.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* Action Selection */}
          {!action && (
            <div className="space-y-3">
              <Label>Choose Action</Label>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  className="h-auto py-4 flex flex-col items-center gap-2 border-green-500/50 hover:bg-green-500/10"
                  onClick={() => setAction("approve")}
                >
                  <CheckCircle className="h-6 w-6 text-green-500" />
                  <span className="font-semibold">Approve</span>
                  <span className="text-xs text-muted-foreground">
                    Publish this problem
                  </span>
                </Button>

                <Button
                  variant="outline"
                  className="h-auto py-4 flex flex-col items-center gap-2 border-red-500/50 hover:bg-red-500/10"
                  onClick={() => setAction("reject")}
                >
                  <XCircle className="h-6 w-6 text-red-500" />
                  <span className="font-semibold">Reject</span>
                  <span className="text-xs text-muted-foreground">
                    Decline this submission
                  </span>
                </Button>
              </div>
            </div>
          )}

          {/* Notes Input (shown after action selected) */}
          <AnimatePresence>
            {action && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-2"
              >
                <Label htmlFor="notes">
                  {action === "approve" ? "Approval Notes (Optional)" : "Rejection Reason"}
                </Label>
                <Textarea
                  id="notes"
                  placeholder={
                    action === "approve"
                      ? "Add any notes about this approval..."
                      : "Explain why this problem is being rejected..."
                  }
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                  required={action === "reject"}
                />
                {action === "reject" && (
                  <p className="text-xs text-muted-foreground">
                    This message will be sent to the author via email
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action Buttons */}
          <div className="flex justify-end gap-2 pt-4 border-t">
            {action && (
              <Button variant="ghost" onClick={() => setAction(null)}>
                Back
              </Button>
            )}
            <Button variant="outline" onClick={handleClose} disabled={isSubmitting}>
              Cancel
            </Button>
            {action && (
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting || (action === "reject" && !notes.trim())}
                className={
                  action === "approve"
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-red-600 hover:bg-red-700"
                }
              >
                {isSubmitting ? "Processing..." : `Confirm ${action === "approve" ? "Approval" : "Rejection"}`}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
