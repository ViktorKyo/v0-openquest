"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Clock, Sparkles, ArrowRight } from "lucide-react"
import Link from "next/link"

interface SubmissionSuccessModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SubmissionSuccessModal({ isOpen, onClose }: SubmissionSuccessModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-card border border-border/50 rounded-2xl shadow-2xl max-w-lg w-full p-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Success Icon */}
              <div className="flex justify-center mb-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="relative"
                >
                  <div className="bg-accent/10 rounded-full p-4">
                    <CheckCircle2 className="h-12 w-12 text-accent" />
                  </div>
                  {/* Sparkle effect */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="absolute -top-1 -right-1"
                  >
                    <Sparkles className="h-6 w-6 text-accent" />
                  </motion.div>
                </motion.div>
              </div>

              {/* Title */}
              <h2 className="text-2xl font-bold text-center mb-3">Submission Received!</h2>

              {/* Main message */}
              <p className="text-muted-foreground text-center mb-6">
                Thank you for contributing to OpenQuest. Your problem is now under review by our curation team.
              </p>

              {/* What happens next */}
              <div className="space-y-4 mb-6 bg-secondary/50 rounded-lg p-6">
                <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
                  What Happens Next
                </h3>

                <div className="space-y-3">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 mt-0.5">
                      <div className="bg-accent/10 rounded-full p-1.5">
                        <CheckCircle2 className="h-4 w-4 text-accent" />
                      </div>
                    </div>
                    <div>
                      <p className="font-medium text-sm">Expert Review</p>
                      <p className="text-muted-foreground text-xs">
                        Our team reviews every submission to ensure quality and relevance
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex-shrink-0 mt-0.5">
                      <div className="bg-accent/10 rounded-full p-1.5">
                        <Sparkles className="h-4 w-4 text-accent" />
                      </div>
                    </div>
                    <div>
                      <p className="font-medium text-sm">World-Changing Focus</p>
                      <p className="text-muted-foreground text-xs">
                        We prioritize ambitious problems with massive potential impact
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex-shrink-0 mt-0.5">
                      <div className="bg-accent/10 rounded-full p-1.5">
                        <Clock className="h-4 w-4 text-accent" />
                      </div>
                    </div>
                    <div>
                      <p className="font-medium text-sm">48-Hour Timeline</p>
                      <p className="text-muted-foreground text-xs">
                        Expect to hear back within 48 hours via email
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Call to action */}
              <div className="text-center mb-4">
                <p className="text-sm text-muted-foreground">
                  In the meantime, explore other problems on the platform
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild className="flex-1" size="lg">
                  <Link href="/feed">
                    Browse Problems
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" onClick={onClose} className="flex-1" size="lg">
                  Close
                </Button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
