import { MetadataRoute } from 'next'
import { allVCTheses } from '@/data/vc-theses'
import { getAllThemeSlugs } from '@/lib/funding-themes'
import { allFellowships } from '@/data/fellowships'
import { getAllFocusSlugs } from '@/lib/fellowship-themes'
import { allAccelerators } from '@/data/accelerators'
import { getAllAcceleratorFocusSlugs } from '@/lib/accelerator-themes'
import { allResidencies } from '@/data/residencies'
import { getAllResidencyFocusSlugs } from '@/lib/residency-themes'
import { categories } from '@/lib/categories'
import { db } from '@/lib/db/supabase'
import { problems } from '@/lib/db/schema'
import { inArray } from 'drizzle-orm'
import { getAllPosts } from '@/lib/blog'
import { PUBLIC_PROBLEM_STATUSES } from '@/lib/problem-access'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://openquest.com'

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/feed`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/landscape`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/categories`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/yc-rfs`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/submit`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/help`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  // VC thesis pages (landscape)
  const vcThesisPages: MetadataRoute.Sitemap = allVCTheses.map((thesis) => ({
    url: `${baseUrl}/landscape/${thesis.slug}`,
    lastModified: new Date(thesis.lastUpdated || thesis.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // Theme pages
  const themeSlugs = getAllThemeSlugs()
  const themePages: MetadataRoute.Sitemap = themeSlugs.map((slug) => ({
    url: `${baseUrl}/landscape/theme/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // Category pages
  const categoryPages: MetadataRoute.Sitemap = Object.values(categories).map((category) => ({
    url: `${baseUrl}/category/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // Fellowship hub page
  const fellowshipPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/fellowships`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...allFellowships.map((fellowship) => ({
      url: `${baseUrl}/fellowships/${fellowship.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ]

  // Accelerator hub/detail/focus pages
  const acceleratorPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/accelerators`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...allAccelerators.map((accelerator) => ({
      url: `${baseUrl}/accelerators/${accelerator.slug}`,
      lastModified: accelerator.lastVerifiedAt ? new Date(accelerator.lastVerifiedAt) : new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ]

  const acceleratorFocusSlugs = getAllAcceleratorFocusSlugs()
  const acceleratorFocusPages: MetadataRoute.Sitemap = acceleratorFocusSlugs.map((slug) => ({
    url: `${baseUrl}/accelerators/focus/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // Residency hub/detail/focus pages
  const residencyPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/residencies`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...allResidencies.map((residency) => ({
      url: `${baseUrl}/residencies/${residency.slug}`,
      lastModified: residency.lastVerifiedAt ? new Date(residency.lastVerifiedAt) : new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ]

  const residencyFocusSlugs = getAllResidencyFocusSlugs()
  const residencyFocusPages: MetadataRoute.Sitemap = residencyFocusSlugs.map((slug) => ({
    url: `${baseUrl}/residencies/focus/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // Fellowship focus area pages
  const focusSlugs = getAllFocusSlugs()
  const focusPages: MetadataRoute.Sitemap = focusSlugs.map((slug) => ({
    url: `${baseUrl}/fellowships/focus/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // Published problem pages
  let problemPages: MetadataRoute.Sitemap = []
  try {
    const publishedProblems = await db
      .select({
        id: problems.id,
        publishedAt: problems.publishedAt,
      })
      .from(problems)
      .where(inArray(problems.status, [...PUBLIC_PROBLEM_STATUSES]))

    problemPages = publishedProblems.map((problem) => ({
      url: `${baseUrl}/problem/${problem.id}`,
      lastModified: problem.publishedAt ? new Date(problem.publishedAt) : new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))
  } catch {
    // DB may not be available during build — skip problem pages
  }

  // Blog pages
  const blogPosts = getAllPosts()
  const latestPostDate = blogPosts.length > 0
    ? new Date(blogPosts[0].updatedAt || blogPosts[0].publishedAt)
    : new Date()
  const blogPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/blog`,
      lastModified: latestPostDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...blogPosts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(post.publishedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ]

  return [
    ...staticPages,
    ...vcThesisPages,
    ...themePages,
    ...fellowshipPages,
    ...focusPages,
    ...acceleratorPages,
    ...acceleratorFocusPages,
    ...residencyPages,
    ...residencyFocusPages,
    ...categoryPages,
    ...problemPages,
    ...blogPages,
  ]
}
