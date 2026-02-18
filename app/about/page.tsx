import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Compass, Heart, Users, Zap } from "lucide-react"

export const metadata: Metadata = {
  title: "About",
  description: "OpenQuest is a community-driven platform for discovering and sharing problems worth solving. Learn about our mission to connect founders with real problems.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About OpenQuest",
    description: "A community-driven platform for discovering and sharing problems worth solving.",
    url: "/about",
  },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-20">
        <div className="mx-auto max-w-4xl px-6">
          {/* Hero */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent/10 mb-6">
              <Compass className="w-8 h-8 text-accent" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About OpenQuest</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A community-driven platform for discovering and sharing problems worth solving
            </p>
          </div>

          {/* Mission */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-muted-foreground mb-4">
              OpenQuest exists to help builders, entrepreneurs, and innovators discover meaningful problems to solve.
              We believe that the world's greatest innovations start with identifying the right problems.
            </p>
            <p className="text-muted-foreground">
              By creating a space where people can share, discuss, and validate problems, we're accelerating the
              journey from problem discovery to solution building.
            </p>
          </section>

          {/* Values */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-8">Our Values</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border border-border/50 rounded-lg p-6">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <Heart className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-semibold mb-2">Impact First</h3>
                <p className="text-sm text-muted-foreground">
                  We prioritize problems that have the potential to create meaningful, positive change in the world.
                </p>
              </div>

              <div className="border border-border/50 rounded-lg p-6">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <Users className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-semibold mb-2">Community Driven</h3>
                <p className="text-sm text-muted-foreground">
                  Our community validates, refines, and elevates the most important problems through collective wisdom.
                </p>
              </div>

              <div className="border border-border/50 rounded-lg p-6">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <Zap className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-semibold mb-2">Action Oriented</h3>
                <p className="text-sm text-muted-foreground">
                  We're not just about discussion—we're about empowering people to take action and build solutions.
                </p>
              </div>

              <div className="border border-border/50 rounded-lg p-6">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <Compass className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-semibold mb-2">Openly Accessible</h3>
                <p className="text-sm text-muted-foreground">
                  Great ideas can come from anywhere. We keep our platform open and accessible to all problem solvers.
                </p>
              </div>
            </div>
          </section>

          {/* How it Started */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-4">How It Started</h2>
            <p className="text-muted-foreground mb-4">
              OpenQuest was born from a simple observation: there are countless talented builders looking for
              meaningful problems to solve, and countless important problems that never get the attention they deserve.
            </p>
            <p className="text-muted-foreground">
              We created this platform to bridge that gap—to make it easy for anyone to share a problem they've
              identified, get validation from others who've experienced it, and connect with people who want to
              build solutions.
            </p>
          </section>

          {/* Contact */}
          <section className="text-center border-t border-border/40 pt-12">
            <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
            <p className="text-muted-foreground mb-6">
              Have questions or want to learn more? We'd love to hear from you.
            </p>
            <a
              href="mailto:hello@openquest.com"
              className="text-accent hover:text-accent/80 transition-colors font-medium"
            >
              hello@openquest.com
            </a>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
