export interface BlogAuthor {
  name: string
  role?: string
  avatarUrl?: string
}

export interface BlogPost {
  slug: string
  title: string
  description: string
  author: BlogAuthor
  publishedAt: string
  updatedAt?: string
  category: BlogCategory
  tags: string[]
  coverImage?: string
  featured?: boolean
  content: string
  readingTime: number
}

export type BlogCategory =
  | "Announcements"
  | "Insights"
  | "Guides"
  | "Community"
  | "Product"

export const BLOG_CATEGORIES: BlogCategory[] = [
  "Announcements",
  "Insights",
  "Guides",
  "Community",
  "Product",
]
