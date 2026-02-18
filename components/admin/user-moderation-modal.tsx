"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { UserX, UserCheck, Ban, Shield } from "lucide-react"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface User {
  id: string
  name: string | null
  email: string
  isSuspended: boolean
  isBanned: boolean
  createdAt: string | Date
}

interface UserModerationModalProps {
  user: User | null
  isOpen: boolean
  onClose: () => void
  onModerate: (userId: string, action: string, reason?: string, duration?: string) => Promise<void>
}

export function UserModerationModal({
  user,
  isOpen,
  onClose,
  onModerate,
}: UserModerationModalProps) {
  const [action, setAction] = useState<string | null>(null)
  const [reason, setReason] = useState("")
  const [duration, setDuration] = useState("7")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (!user || !action) return

    setIsSubmitting(true)
    try {
      await onModerate(user.id, action, reason, duration)
      handleClose()
    } catch (error) {
      console.error("Moderation failed:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    setAction(null)
    setReason("")
    setDuration("7")
    onClose()
  }

  if (!user) return null

  const availableActions = []
  if (!user.isSuspended) {
    availableActions.push({ value: "suspend", label: "Suspend", icon: UserX, iconClass: "text-orange-500" })
  } else {
    availableActions.push({ value: "unsuspend", label: "Unsuspend", icon: UserCheck, iconClass: "text-green-500" })
  }

  if (!user.isBanned) {
    availableActions.push({ value: "ban", label: "Ban", icon: Ban, iconClass: "text-red-500" })
  } else {
    availableActions.push({ value: "unban", label: "Unban", icon: Shield, iconClass: "text-blue-500" })
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Moderate User</DialogTitle>
          <DialogDescription>
            Manage user access and permissions
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* User Details */}
          <div className="space-y-3 p-4 rounded-lg border bg-secondary/20">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{user.name || "Unknown"}</h3>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
              <div className="flex gap-2">
                {user.isSuspended && <Badge variant="destructive">Suspended</Badge>}
                {user.isBanned && <Badge variant="destructive">Banned</Badge>}
                {!user.isSuspended && !user.isBanned && (
                  <Badge variant="default">Active</Badge>
                )}
              </div>
            </div>
          </div>

          {/* Action Selection */}
          {!action && (
            <div className="space-y-3">
              <Label>Choose Action</Label>
              <div className="grid grid-cols-2 gap-3">
                {availableActions.map((actionOption) => {
                  const Icon = actionOption.icon
                  return (
                    <Button
                      key={actionOption.value}
                      variant="outline"
                      className="h-auto py-4 flex flex-col items-center gap-2"
                      onClick={() => setAction(actionOption.value)}
                    >
                      <Icon className={`h-6 w-6 ${actionOption.iconClass}`} />
                      <span className="font-semibold">{actionOption.label}</span>
                    </Button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Action Details */}
          <AnimatePresence>
            {action && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-4"
              >
                {action === "suspend" && (
                  <div className="space-y-2">
                    <Label htmlFor="duration">Suspension Duration</Label>
                    <Select value={duration} onValueChange={setDuration}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 day</SelectItem>
                        <SelectItem value="3">3 days</SelectItem>
                        <SelectItem value="7">7 days</SelectItem>
                        <SelectItem value="14">14 days</SelectItem>
                        <SelectItem value="30">30 days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="reason">
                    {action === "suspend" || action === "ban" ? "Reason (Required)" : "Notes (Optional)"}
                  </Label>
                  <Textarea
                    id="reason"
                    placeholder={`Explain why you are ${action}ing this user...`}
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    rows={4}
                    required={action === "suspend" || action === "ban"}
                  />
                </div>
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
                disabled={
                  isSubmitting ||
                  ((action === "suspend" || action === "ban") && !reason.trim())
                }
              >
                {isSubmitting ? "Processing..." : `Confirm ${action}`}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
