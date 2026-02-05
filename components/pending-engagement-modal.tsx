"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { getActionLabel, type EngagementActionType } from "@/lib/pending-engagement"

interface PendingEngagementModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  actionType: EngagementActionType
  problemTitle?: string
}

export function PendingEngagementModal({
  isOpen,
  onClose,
  onConfirm,
  actionType,
  problemTitle,
}: PendingEngagementModalProps) {
  const actionLabel = getActionLabel(actionType)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Complete Your Action</DialogTitle>
          <DialogDescription>
            You started to {actionLabel.toLowerCase()} before signing in.
            {problemTitle && (
              <>
                <br />
                <span className="font-medium text-foreground mt-1 block">
                  "{problemTitle}"
                </span>
              </>
            )}
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <p className="text-sm text-muted-foreground">
            Would you like to complete this action now?
          </p>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={onClose}>
            No, I Changed My Mind
          </Button>
          <Button onClick={onConfirm}>
            Yes, Complete Now
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
