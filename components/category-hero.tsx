"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Plus } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import type { CategoryData } from "@/lib/categories"

interface CategoryHeroProps {
  category: CategoryData
}

export function CategoryHero({ category }: CategoryHeroProps) {
  // Extract the base color name from the colorClass (e.g., "violet" from "bg-violet-500/10...")
  const colorName = category.color

  return (
    <div className="relative overflow-hidden border-b bg-gradient-to-b from-background to-muted/20">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div
          className={cn(
            "absolute right-0 top-0 h-[500px] w-[500px] rounded-full blur-3xl opacity-20",
            `bg-${colorName}-500`
          )}
          style={{
            background: `radial-gradient(circle, var(--${colorName}-500) 0%, transparent 70%)`,
          }}
        />
      </div>

      <div className="container mx-auto max-w-5xl px-4 py-16 sm:py-24">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/categories" className="hover:text-foreground transition-colors">
            Categories
          </Link>
          <span>/</span>
          <span className="text-foreground font-medium">{category.name}</span>
        </nav>

        {/* Category badge */}
        <div className="mb-6">
          <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-medium", category.colorClass)}>
            {category.name}
          </span>
        </div>

        {/* Hero content */}
        <div className="space-y-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">{category.tagline}</h1>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl leading-relaxed">{category.description}</p>

          {/* What we're looking for */}
          <div className="pt-6">
            <h2 className="text-lg font-semibold mb-4">What we're looking for:</h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {category.lookingFor.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className={cn("mt-1 rounded-full p-1", category.colorClass)}>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="flex flex-wrap gap-3 pt-4">
            <Button size="lg" className="gap-2" asChild>
              <Link href={`/submit?category=${category.slug}`}>
                <Plus className="h-4 w-4" />
                Submit a Problem
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#problems">View All Problems</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
