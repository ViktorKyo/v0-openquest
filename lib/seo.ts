import type { Metadata } from 'next'

export const BASE_URL = 'https://openquest.com'

export function canonicalUrl(path: string): string {
  return `${BASE_URL}${path}`
}

/** Default Open Graph config — merged with page-specific overrides */
export const defaultOpenGraph: Metadata['openGraph'] = {
  siteName: 'OpenQuest',
  type: 'website',
  locale: 'en_US',
}

/** Default Twitter card config */
export const defaultTwitter: Metadata['twitter'] = {
  card: 'summary_large_image',
}

/** Helper to build page metadata with consistent defaults */
export function buildMetadata({
  title,
  description,
  path,
  ogType = 'website',
  ogImage,
  article,
}: {
  title: string
  description: string
  path: string
  ogType?: 'website' | 'article'
  ogImage?: string
  article?: {
    publishedTime: string
    modifiedTime?: string
    authors?: string[]
    tags?: string[]
  }
}): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl(path),
    },
    openGraph: {
      ...defaultOpenGraph,
      title,
      description,
      url: canonicalUrl(path),
      type: ogType,
      ...(ogImage && { images: [{ url: ogImage, width: 1200, height: 630 }] }),
      ...(article && {
        publishedTime: article.publishedTime,
        ...(article.modifiedTime && { modifiedTime: article.modifiedTime }),
        ...(article.authors && { authors: article.authors }),
        ...(article.tags && { tags: article.tags }),
      }),
    },
    twitter: {
      ...defaultTwitter,
      title,
      description,
      ...(ogImage && { images: [ogImage] }),
    },
  }
}
