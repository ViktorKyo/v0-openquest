"use client"

import { Rocket, Lightbulb, Users, DollarSign, Megaphone, Clock, Briefcase, HandHeart } from "lucide-react"
import { cn } from "@/lib/utils"

export type Involvement = "want-build" | "already-building" | "just-sharing" | "want-to-work"
export type WantBuildBlocker = "need-capital" | "need-cofounder"
export type WantToWorkInvolvement = "volunteer" | "full-time"
export type AlreadyBuildingSupport = "awareness" | "founding-team" | "cofounder" | "capital"

interface AuthorIntentTagsProps {
  involvement: Involvement
  wantBuildBlocker?: WantBuildBlocker
  wantToWorkInvolvement?: WantToWorkInvolvement
  alreadyBuildingSupport?: AlreadyBuildingSupport[]
  variant?: "compact" | "detailed"
  isAnonymous?: boolean
}

interface Tag {
  label: string
  icon: React.ReactNode
  color: string
}

function getInvolvementTag(involvement: Involvement): Tag {
  switch (involvement) {
    case "want-build":
      return {
        label: "Wants to build",
        icon: <Lightbulb className="h-3 w-3" />,
        color: "bg-purple-500/10 text-purple-400 border-purple-500/20",
      }
    case "already-building":
      return {
        label: "Building now",
        icon: <Rocket className="h-3 w-3" />,
        color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      }
    case "want-to-work":
      return {
        label: "Wants to contribute",
        icon: <HandHeart className="h-3 w-3" />,
        color: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      }
    case "just-sharing":
      return {
        label: "Open problem",
        icon: <Lightbulb className="h-3 w-3" />,
        color: "bg-gray-500/10 text-gray-400 border-gray-500/20",
      }
  }
}

function getSupportTags(
  involvement: Involvement,
  wantBuildBlocker?: WantBuildBlocker,
  wantToWorkInvolvement?: WantToWorkInvolvement,
  alreadyBuildingSupport?: AlreadyBuildingSupport[],
): Tag[] {
  const tags: Tag[] = []

  if (involvement === "want-build" && wantBuildBlocker) {
    if (wantBuildBlocker === "need-capital") {
      tags.push({
        label: "Seeking investment",
        icon: <DollarSign className="h-3 w-3" />,
        color: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
      })
    } else if (wantBuildBlocker === "need-cofounder") {
      tags.push({
        label: "Looking for co-founder",
        icon: <Users className="h-3 w-3" />,
        color: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      })
    }
  }

  if (involvement === "want-to-work" && wantToWorkInvolvement) {
    if (wantToWorkInvolvement === "volunteer") {
      tags.push({
        label: "Available to volunteer",
        icon: <Clock className="h-3 w-3" />,
        color: "bg-green-500/10 text-green-400 border-green-500/20",
      })
    } else if (wantToWorkInvolvement === "full-time") {
      tags.push({
        label: "Open to full-time",
        icon: <Briefcase className="h-3 w-3" />,
        color: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
      })
    }
  }

  if (involvement === "already-building" && alreadyBuildingSupport && alreadyBuildingSupport.length > 0) {
    // Prioritize: co-founder > capital > team > visibility
    const priorityOrder: AlreadyBuildingSupport[] = ["cofounder", "capital", "founding-team", "awareness"]
    const sortedSupport = alreadyBuildingSupport.sort(
      (a, b) => priorityOrder.indexOf(a) - priorityOrder.indexOf(b),
    )

    for (const support of sortedSupport) {
      if (support === "cofounder") {
        tags.push({
          label: "Looking for co-founder",
          icon: <Users className="h-3 w-3" />,
          color: "bg-blue-500/10 text-blue-400 border-blue-500/20",
        })
      } else if (support === "capital") {
        tags.push({
          label: "Raising capital",
          icon: <DollarSign className="h-3 w-3" />,
          color: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
        })
      } else if (support === "founding-team") {
        tags.push({
          label: "Hiring team",
          icon: <Users className="h-3 w-3" />,
          color: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
        })
      } else if (support === "awareness") {
        tags.push({
          label: "Seeking visibility",
          icon: <Megaphone className="h-3 w-3" />,
          color: "bg-pink-500/10 text-pink-400 border-pink-500/20",
        })
      }
    }
  }

  return tags
}

export function AuthorIntentTags({
  involvement,
  wantBuildBlocker,
  wantToWorkInvolvement,
  alreadyBuildingSupport,
  variant = "compact",
  isAnonymous = false,
}: AuthorIntentTagsProps) {
  // Don't show anything for "just-sharing" in compact mode
  if (involvement === "just-sharing" && variant === "compact") {
    return null
  }

  const involvementTag = getInvolvementTag(involvement)
  const supportTags = getSupportTags(involvement, wantBuildBlocker, wantToWorkInvolvement, alreadyBuildingSupport)

  // In compact mode, limit to 3 tags max (1 involvement + 2 support)
  const displayTags = variant === "compact" ? [involvementTag, ...supportTags.slice(0, 2)] : [involvementTag, ...supportTags]

  if (variant === "compact") {
    return (
      <div className="flex flex-wrap gap-1.5">
        {displayTags.map((tag, index) => (
          <span
            key={index}
            className={cn(
              "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium transition-colors",
              tag.color,
            )}
          >
            {tag.icon}
            {tag.label}
          </span>
        ))}
      </div>
    )
  }

  // Detailed variant - full callout box
  return (
    <div className="rounded-lg border border-border/50 bg-card p-4">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">
          <div className={cn("rounded-full p-2", involvementTag.color.replace("border-", "bg-").split(" ")[0])}>
            {involvementTag.icon}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm mb-1">Get Involved</h3>
          <p className="text-sm text-muted-foreground mb-3">
            {isAnonymous ? "The author" : "Author"} {getInvolvementDescription(involvement)}
            {supportTags.length > 0 && " and is looking for:"}
          </p>
          {supportTags.length > 0 && (
            <ul className="space-y-2">
              {supportTags.map((tag, index) => (
                <li key={index} className="flex items-center gap-2 text-sm">
                  <span className={cn("flex items-center gap-1", tag.color.split(" ")[1])}>
                    {tag.icon}
                    <span>{tag.label}</span>
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

function getInvolvementDescription(involvement: Involvement): string {
  switch (involvement) {
    case "want-build":
      return "wants to build this"
    case "already-building":
      return "is actively building this"
    case "want-to-work":
      return "would love to work on this"
    case "just-sharing":
      return "surfaced this problem for the community to explore"
  }
}
