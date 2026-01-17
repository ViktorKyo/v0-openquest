"use client"

import { motion } from "framer-motion"
import { Compass } from "lucide-react"
import Link from "next/link"

const footerLinks = {
  Product: ["Browse Problems", "Submit Problem", "Trending", "Categories"],
  Resources: ["About", "Blog", "Changelog", "Help Center"],
  Legal: ["Privacy", "Terms", "Cookies"],
  Social: ["Twitter", "Discord", "GitHub"],
}

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="border-t border-border/40 bg-secondary/20"
    >
      <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-6">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Compass className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-semibold text-foreground">OpenQuest</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              The community for discovering problems worth solving. Find your next big idea.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="mb-4 text-sm font-semibold text-foreground">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <Link href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/40 pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} OpenQuest. All rights reserved.</p>
          <p className="text-sm text-muted-foreground">Made with ♥ for problem solvers everywhere</p>
        </div>
      </div>
    </motion.footer>
  )
}
