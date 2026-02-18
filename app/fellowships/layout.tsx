import type { Metadata } from 'next'
import { allFellowships } from '@/data/fellowships'

const count = allFellowships.length

export const metadata: Metadata = {
  title: 'Fellowship Guide 2026',
  description:
    `Discover ${count} top fellowships for ambitious builders, researchers, and founders. Interactive guide to funding, eligibility, and focus areas across tech, science, social impact, and more.`,
  alternates: { canonical: '/fellowships' },
  openGraph: {
    title: 'Fellowship Guide 2026',
    description:
      `Explore ${count} major fellowships for ambitious people. Find funding for your next big project.`,
    url: '/fellowships',
    images: [{ url: '/api/og?title=Fellowship%20Guide%202026&description=Discover%20top%20fellowships%20for%20ambitious%20builders%2C%20researchers%2C%20and%20founders&category=Fellowship%20Guide', width: 1200, height: 630, alt: 'Fellowship Guide 2026' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fellowship Guide 2026',
    description: `Explore ${count} major fellowships for ambitious people. Find funding for your next big project.`,
  },
}

export default function FellowshipsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
