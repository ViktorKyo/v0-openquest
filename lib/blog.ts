import fs from "fs"
import path from "path"
import matter from "gray-matter"
import type { BlogPost, BlogCategory } from "@/types/blog"

const BLOG_DIR = path.join(process.cwd(), "content", "blog")
const WORDS_PER_MINUTE = 200

function calculateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE))
}

function parsePost(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.md`)
  if (!fs.existsSync(filePath)) return null

  const fileContent = fs.readFileSync(filePath, "utf-8")
  const { data, content } = matter(fileContent)

  return {
    slug,
    title: data.title,
    description: data.description,
    author: {
      name: data.author,
      role: data.authorRole,
      avatarUrl: data.authorAvatar,
    },
    publishedAt: data.publishedAt,
    updatedAt: data.updatedAt,
    category: data.category as BlogCategory,
    tags: data.tags || [],
    coverImage: data.coverImage,
    featured: data.featured || false,
    content,
    readingTime: calculateReadingTime(content),
  }
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return []

  const slugs = fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""))

  return slugs
    .map(parsePost)
    .filter((post): post is BlogPost => post !== null)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
}

export function getPostBySlug(slug: string): BlogPost | null {
  return parsePost(slug)
}

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return []

  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""))
}

export function getRelatedPosts(currentSlug: string, limit = 3): BlogPost[] {
  const current = getPostBySlug(currentSlug)
  if (!current) return []

  const allPosts = getAllPosts().filter((p) => p.slug !== currentSlug)

  const scored = allPosts.map((post) => {
    let score = 0
    if (post.category === current.category) score += 2
    score += post.tags.filter((t) => current.tags.includes(t)).length
    return { post, score }
  })

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.post)
}

export function getCategoriesWithCounts(): { category: BlogCategory; count: number }[] {
  const posts = getAllPosts()
  const counts = new Map<BlogCategory, number>()

  for (const post of posts) {
    counts.set(post.category, (counts.get(post.category) || 0) + 1)
  }

  return Array.from(counts.entries())
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count)
}
