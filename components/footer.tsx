"use client"

import { motion } from "framer-motion"
import { Compass } from "lucide-react"
import Link from "next/link"

const footerLinks = {
  Product: [
    { name: "Browse Problems", href: "/feed" },
    { name: "Submit Problem", href: "/submit" },
    { name: "Trending", href: "/feed?sort=trending" },
    { name: "Categories", href: "/#categories" },
  ],
  Resources: [
    { name: "About", href: "/about" },
    { name: "Blog", href: "https://blog.openquest.com", external: true },
    { name: "Changelog", href: "https://github.com/openquest/changelog", external: true },
    { name: "Help Center", href: "/help" },
  ],
  Legal: [
    { name: "Privacy", href: "/privacy" },
    { name: "Terms", href: "/terms" },
    { name: "Cookies", href: "/cookies" },
  ],
  Social: [
    { name: "Twitter", href: "https://twitter.com/openquest", external: true },
    { name: "Discord", href: "https://discord.gg/openquest", external: true },
    { name: "GitHub", href: "https://github.com/openquest", external: true },
  ],
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
                  <li key={link.name}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.name}
                      </a>
                    ) : (
                      <Link href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                        {link.name}
                      </Link>
                    )}
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
