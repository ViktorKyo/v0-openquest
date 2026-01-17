"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, ChevronUp, Lightbulb, DollarSign, Eye, MoreVertical, MessageCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import Link from "next/link"

// Mock data
const mockProblem = {
  id: 1,
  title: "We need a better way to track carbon emissions for small businesses",
  category: "Climate tech",
  categoryColor: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  timeAgo: "2h ago",
  author: {
    name: "Sarah Chen",
    avatar: "/diverse-woman-portrait.png",
    isAnonymous: false,
  },
  upvotes: 142,
  elevatorPitch:
    "Most carbon tracking tools are built for enterprises with complex supply chains. Small businesses want to be sustainable but can't afford $10k/year software or hire a sustainability consultant.",
  fullDescription: `## The Problem

Small businesses (5-50 employees) want to track and reduce their carbon footprint, but existing solutions are:

- **Too expensive** - Enterprise tools cost $5k-50k annually
- **Too complex** - Require dedicated sustainability teams
- **Too manual** - Spreadsheet-based approaches are time-consuming

## Who This Affects

- 33M small businesses in the US alone
- Increasing pressure from customers and investors to report emissions
- Many are willing to pay $50-200/month for the right solution

## Potential Impact

If 1% of US small businesses adopted a simple carbon tracking tool at $100/month, that's a $400M annual market while helping reduce millions of tons of CO2.`,
  engagement: {
    building: 5,
    buildingAnonymous: 2,
    investors: 12,
    followers: 34,
    users: [
      { name: "Alex Kumar", avatar: "/man.jpg", type: "building" },
      { name: "Maria Garcia", avatar: "/diverse-woman-portrait.png", type: "investor" },
      { name: "James Wilson", avatar: "/man.jpg", type: "building" },
      { name: "Lisa Zhang", avatar: "/diverse-woman-portrait.png", type: "investor" },
      { name: "David Brown", avatar: "/man.jpg", type: "investor" },
    ],
  },
}

const mockComments = [
  {
    id: 1,
    author: { name: "Marcus Reid", avatar: "/man.jpg", initials: "MR" },
    content:
      "This is huge. I run a small marketing agency and we've been manually tracking this in spreadsheets. Would definitely pay for a simple solution.",
    timeAgo: "1h ago",
    upvotes: 12,
    replies: [
      {
        id: 11,
        author: { name: "Sarah Chen", avatar: "/diverse-woman-portrait.png", initials: "SC" },
        content: "Thanks Marcus! What's the biggest pain point with the spreadsheet approach for you?",
        timeAgo: "45m ago",
        upvotes: 3,
      },
      {
        id: 12,
        author: { name: "Marcus Reid", avatar: "/man.jpg", initials: "MR" },
        content:
          "Mainly keeping it updated and making sure we're calculating emissions correctly. Plus it's hard to show progress over time.",
        timeAgo: "30m ago",
        upvotes: 5,
      },
    ],
  },
  {
    id: 2,
    author: { name: "Emily Watson", avatar: "/diverse-woman-portrait.png", initials: "EW" },
    content: "Have you looked at Watershed or Persefoni? They might have SMB plans.",
    timeAgo: "50m ago",
    upvotes: 4,
    replies: [],
  },
  {
    id: 3,
    author: { name: "Alex Kumar", avatar: "/man.jpg", initials: "AK" },
    content:
      "I'm actually building something in this space! Would love to chat. The key is making data input stupid simple - probably needs to integrate with accounting software.",
    timeAgo: "40m ago",
    upvotes: 18,
    replies: [
      {
        id: 31,
        author: { name: "Jordan Lee", avatar: "/diverse-group.png", initials: "JL" },
        content: "QuickBooks integration would be killer. Most small biz expenses directly correlate to emissions.",
        timeAgo: "35m ago",
        upvotes: 8,
      },
    ],
  },
  {
    id: 4,
    author: { name: "Anonymous", avatar: "", initials: "A" },
    content: "This market is more crowded than you think. Normative, Plan A, CarbonChain all targeting SMBs now.",
    timeAgo: "25m ago",
    upvotes: 6,
    replies: [],
  },
  {
    id: 5,
    author: { name: "Rachel Adams", avatar: "/diverse-woman-portrait.png", initials: "RA" },
    content:
      "Love this. The B2B sales cycle for sustainability is brutal though. Most small businesses won't pay until they're required to report.",
    timeAgo: "15m ago",
    upvotes: 9,
    replies: [],
  },
]

export function ProblemDetailPage() {
  const [upvoted, setUpvoted] = useState(false)
  const [upvoteCount, setUpvoteCount] = useState(mockProblem.upvotes)
  const [commentText, setCommentText] = useState("")
  const [comments, setComments] = useState(mockComments)
  const [showBuildModal, setShowBuildModal] = useState(false)
  const [showInvestModal, setShowInvestModal] = useState(false)
  const [showFollowModal, setShowFollowModal] = useState(false)
  const [replyingTo, setReplyingTo] = useState<number | null>(null)
  const [replyText, setReplyText] = useState("")

  const handleUpvote = () => {
    setUpvoted(!upvoted)
    setUpvoteCount(upvoted ? upvoteCount - 1 : upvoteCount + 1)
  }

  const handleCommentSubmit = () => {
    if (!commentText.trim()) return

    const newComment = {
      id: comments.length + 1,
      author: { name: "You", avatar: "/abstract-geometric-shapes.png", initials: "YO" },
      content: commentText,
      timeAgo: "just now",
      upvotes: 0,
      replies: [],
    }

    setComments([newComment, ...comments])
    setCommentText("")
  }

  const handleReplySubmit = (commentId: number) => {
    if (!replyText.trim()) return

    const newReply = {
      id: commentId * 10 + 100,
      author: { name: "You", avatar: "/abstract-geometric-shapes.png", initials: "YO" },
      content: replyText,
      timeAgo: "just now",
      upvotes: 0,
    }

    setComments(
      comments.map((comment) =>
        comment.id === commentId ? { ...comment, replies: [...(comment.replies || []), newReply] } : comment,
      ),
    )
    setReplyText("")
    setReplyingTo(null)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container max-w-5xl mx-auto px-4 py-4">
          <Link href="/feed">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to feed
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container max-w-5xl mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-[80px_1fr] lg:gap-8">
          {/* Sticky upvote button (desktop only) */}
          <div className="hidden md:block">
            <div className="sticky top-24">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={handleUpvote}
                className={cn(
                  "flex h-20 w-20 flex-col items-center justify-center rounded-xl border-2 transition-all duration-200",
                  upvoted
                    ? "border-orange-500/50 bg-orange-500/10 text-orange-500 shadow-lg shadow-orange-500/20"
                    : "border-border/60 bg-secondary/50 text-muted-foreground hover:border-orange-500/30 hover:bg-orange-500/5 hover:text-orange-500/80",
                )}
              >
                <ChevronUp className={cn("h-7 w-7 transition-transform", upvoted && "scale-110")} />
                <span className="text-base font-semibold mt-1">{upvoteCount}</span>
              </motion.button>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6">
            {/* Mobile upvote */}
            <div className="md:hidden">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={handleUpvote}
                className={cn(
                  "flex h-16 w-16 flex-col items-center justify-center rounded-xl border-2 transition-all duration-200",
                  upvoted
                    ? "border-orange-500/50 bg-orange-500/10 text-orange-500 shadow-lg shadow-orange-500/20"
                    : "border-border/60 bg-secondary/50 text-muted-foreground hover:border-orange-500/30 hover:bg-orange-500/5",
                )}
              >
                <ChevronUp className={cn("h-6 w-6 transition-transform", upvoted && "scale-110")} />
                <span className="text-sm font-semibold">{upvoteCount}</span>
              </motion.button>
            </div>

            {/* Problem Header */}
            <div>
              <div className="mb-3 flex items-center gap-2">
                <span
                  className={cn(
                    "inline-flex rounded-full border px-3 py-1 text-xs font-medium",
                    mockProblem.categoryColor,
                  )}
                >
                  {mockProblem.category}
                </span>
                <span className="text-sm text-muted-foreground">{mockProblem.timeAgo}</span>
              </div>

              <h1 className="mb-4 text-3xl font-bold leading-tight text-balance lg:text-4xl">{mockProblem.title}</h1>

              <div className="flex items-center gap-3">
                <Avatar className="size-10">
                  <AvatarImage src={mockProblem.author.avatar || "/placeholder.svg"} />
                  <AvatarFallback>
                    {mockProblem.author.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">
                    {mockProblem.author.isAnonymous ? "Anonymous" : mockProblem.author.name}
                  </p>
                  <p className="text-sm text-muted-foreground">Problem author</p>
                </div>
              </div>
            </div>

            {/* Elevator Pitch */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Elevator Pitch</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{mockProblem.elevatorPitch}</p>
              </CardContent>
            </Card>

            {/* Full Description */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Full Description</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <div
                    dangerouslySetInnerHTML={{
                      __html:
                        mockProblem.fullDescription
                          .replace(/\n/g, "<br/>")
                          .replace(/##\s/g, '<h2 class="text-xl font-bold mt-4 mb-2">')
                          .replace(/<h2/g, "</p><h2")
                          .replace(/<\/h2>/g, '</h2><p class="text-muted-foreground leading-relaxed">')
                          .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") + "</p>",
                    }}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Engagement Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Take Action</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Action Buttons */}
                <div className="grid gap-3 sm:grid-cols-3">
                  <Button onClick={() => setShowBuildModal(true)} className="gap-2 h-auto py-3">
                    <Lightbulb className="h-5 w-5" />
                    <span>I'll build this</span>
                  </Button>
                  <Button onClick={() => setShowInvestModal(true)} variant="secondary" className="gap-2 h-auto py-3">
                    <DollarSign className="h-5 w-5" />
                    <span>I'd invest</span>
                  </Button>
                  <Button onClick={() => setShowFollowModal(true)} variant="outline" className="gap-2 h-auto py-3">
                    <Eye className="h-5 w-5" />
                    <span>Follow</span>
                  </Button>
                </div>

                <Separator />

                {/* Who's Engaged */}
                <div>
                  <h3 className="font-semibold mb-4">Who's engaged</h3>

                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        {mockProblem.engagement.building} people building ({mockProblem.engagement.buildingAnonymous}{" "}
                        anonymous)
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        {mockProblem.engagement.investors} potential investors
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">{mockProblem.engagement.followers} followers</span>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  {/* User Avatars */}
                  <div className="flex flex-wrap gap-3">
                    {mockProblem.engagement.users.map((user, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Avatar className="size-8">
                          <AvatarImage src={user.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">{user.name}</span>
                          <span className="text-xs text-muted-foreground capitalize">{user.type}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Comments Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Discussion ({comments.reduce((acc, c) => acc + 1 + (c.replies?.length || 0), 0)})
                </CardTitle>
              </CardHeader>

              <Separator />

              <CardContent className="pt-6 space-y-6">
                {/* Comment Input */}
                <div className="space-y-3">
                  <Textarea
                    placeholder="Share your thoughts..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className="min-h-24"
                  />
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm" onClick={() => setCommentText("")}>
                      Cancel
                    </Button>
                    <Button size="sm" onClick={handleCommentSubmit} disabled={!commentText.trim()}>
                      Post Comment
                    </Button>
                  </div>
                </div>

                <Separator />

                {/* Comments List */}
                <div className="space-y-6">
                  {comments.map((comment) => (
                    <div key={comment.id} className="space-y-4">
                      {/* Main Comment */}
                      <div className="flex gap-3">
                        <Avatar className="size-8 shrink-0">
                          <AvatarImage src={comment.author.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="text-xs">{comment.author.initials}</AvatarFallback>
                        </Avatar>

                        <div className="flex-1 min-w-0 space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-sm">{comment.author.name}</span>
                            <span className="text-xs text-muted-foreground">{comment.timeAgo}</span>
                          </div>

                          <p className="text-sm text-muted-foreground leading-relaxed">{comment.content}</p>

                          <div className="flex items-center gap-4 text-sm">
                            <button className="flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground">
                              <ChevronUp className="h-4 w-4" />
                              <span>{comment.upvotes}</span>
                            </button>
                            <button
                              className="text-muted-foreground transition-colors hover:text-foreground"
                              onClick={() => setReplyingTo(comment.id)}
                            >
                              Reply
                            </button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <button className="text-muted-foreground transition-colors hover:text-foreground">
                                  <MoreVertical className="h-4 w-4" />
                                </button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>

                          {/* Reply Input */}
                          {replyingTo === comment.id && (
                            <div className="space-y-2 pt-2">
                              <Textarea
                                placeholder="Write a reply..."
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                className="min-h-20"
                              />
                              <div className="flex justify-end gap-2">
                                <Button variant="outline" size="sm" onClick={() => setReplyingTo(null)}>
                                  Cancel
                                </Button>
                                <Button
                                  size="sm"
                                  onClick={() => handleReplySubmit(comment.id)}
                                  disabled={!replyText.trim()}
                                >
                                  Reply
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Nested Replies */}
                      {comment.replies && comment.replies.length > 0 && (
                        <div className="ml-11 space-y-4 border-l-2 border-border/50 pl-4">
                          {comment.replies.map((reply) => (
                            <div key={reply.id} className="flex gap-3">
                              <Avatar className="size-8 shrink-0">
                                <AvatarImage src={reply.author.avatar || "/placeholder.svg"} />
                                <AvatarFallback className="text-xs">{reply.author.initials}</AvatarFallback>
                              </Avatar>

                              <div className="flex-1 min-w-0 space-y-2">
                                <div className="flex items-center gap-2">
                                  <span className="font-semibold text-sm">{reply.author.name}</span>
                                  <span className="text-xs text-muted-foreground">{reply.timeAgo}</span>
                                </div>

                                <p className="text-sm text-muted-foreground leading-relaxed">{reply.content}</p>

                                <div className="flex items-center gap-4 text-sm">
                                  <button className="flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground">
                                    <ChevronUp className="h-4 w-4" />
                                    <span>{reply.upvotes}</span>
                                  </button>
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <button className="text-muted-foreground transition-colors hover:text-foreground">
                                        <MoreVertical className="h-4 w-4" />
                                      </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuItem>Edit</DropdownMenuItem>
                                      <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Modals */}
      <Dialog open={showBuildModal} onOpenChange={setShowBuildModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>I'll build this</DialogTitle>
            <DialogDescription>
              Let others know you're working on solving this problem. You can share updates and connect with potential
              co-founders or investors.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Textarea placeholder="Share your approach or ask for collaborators..." className="min-h-24" />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowBuildModal(false)}>
              Cancel
            </Button>
            <Button onClick={() => setShowBuildModal(false)}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showInvestModal} onOpenChange={setShowInvestModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>I'd invest in this</DialogTitle>
            <DialogDescription>
              Show your interest in funding a solution to this problem. Builders will be able to reach out to you.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Textarea placeholder="What kind of solution would you invest in?" className="min-h-24" />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowInvestModal(false)}>
              Cancel
            </Button>
            <Button onClick={() => setShowInvestModal(false)}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showFollowModal} onOpenChange={setShowFollowModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Follow this problem</DialogTitle>
            <DialogDescription>
              Get notified when there are updates, new solutions, or interesting discussions about this problem.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowFollowModal(false)}>
              Cancel
            </Button>
            <Button onClick={() => setShowFollowModal(false)}>Follow</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
