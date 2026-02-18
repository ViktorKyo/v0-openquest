import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/', '/profile/', '/login/', '/signup/', '/reset-password/'],
    },
    sitemap: 'https://openquest.com/sitemap.xml',
  }
}
