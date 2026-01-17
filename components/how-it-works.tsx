"use client"

import { motion } from "framer-motion"
import { Lightbulb, Users, Rocket } from "lucide-react"

const steps = [
  {
    icon: Lightbulb,
    title: "Share a Problem",
    description:
      "Spot a gap in the market or a pain point in daily life? Share it with the community and see if others feel the same way.",
  },
  {
    icon: Users,
    title: "Gather Feedback",
    description:
      "Get upvotes, comments, and validation from others who've experienced the same problem. Find potential collaborators.",
  },
  {
    icon: Rocket,
    title: "Build Solutions",
    description:
      "Turn validated problems into real projects. Connect with builders, find co-founders, and make an impact.",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="border-y border-border/40 bg-secondary/30 py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">How it works</h2>
          <p className="mt-4 text-lg text-muted-foreground">From idea to impact in three simple steps</p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                  <step.icon className="h-8 w-8" />
                </div>
                <div className="mb-2 flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {index + 1}
                  </span>
                  <h3 className="text-xl font-semibold text-foreground">{step.title}</h3>
                </div>
                <p className="text-muted-foreground">{step.description}</p>
              </div>

              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="absolute top-8 left-[calc(50%+4rem)] hidden h-0.5 w-[calc(100%-8rem)] bg-gradient-to-r from-border to-transparent md:block" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
