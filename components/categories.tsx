"use client"

import { motion } from "framer-motion"

const categories = [
  { name: "Moonshots", color: "bg-violet-500/10 text-violet-400 border-violet-500/20" },
  { name: "Niche markets", color: "bg-orange-500/10 text-orange-400 border-orange-500/20" },
  { name: "Future of work", color: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
  { name: "Creator economy", color: "bg-pink-500/10 text-pink-400 border-pink-500/20" },
  { name: "Longevity", color: "bg-red-500/10 text-red-400 border-red-500/20" },
  { name: "Rebuild money", color: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" },
  { name: "Climate tech", color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
  { name: "AI & infrastructure", color: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20" },
  { name: "World of atoms", color: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
  { name: "Other", color: "bg-gray-500/10 text-gray-400 border-gray-500/20" },
]

export function Categories() {
  return (
    <section id="categories" className="py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Explore by category</h2>
          <p className="mt-4 text-lg text-muted-foreground">Find problems in the space you're passionate about</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3"
        >
          {categories.map((category, index) => (
            <motion.button
              key={category.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`rounded-full border px-5 py-2.5 text-sm font-medium transition-all hover:shadow-lg ${category.color}`}
            >
              {category.name}
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
