import type { Metadata } from 'next'
import { allResidencies } from '@/data/residencies'

const count = allResidencies.length

export const metadata: Metadata = {
  title: 'Founder Residencies 2026',
  description:
    `Compare ${count} top founder residency programs from leading VCs. See funding, duration, location, and application status.`,
  alternates: { canonical: '/residencies' },
  openGraph: {
    title: 'Founder Residencies 2026',
    description:
      `Compare ${count} top founder residency programs and find the right fit for your -1 to 0 stage.`,
    url: '/residencies',
    images: [
      {
        url: '/api/og?title=Founder%20Residencies%202026&description=Compare%20top%20VC-backed%20residency%20programs&category=Residencies',
        width: 1200,
        height: 630,
        alt: 'Founder Residencies 2026',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Founder Residencies 2026',
    description:
      `Compare ${count} top founder residency programs and find the right fit for your -1 to 0 stage.`,
  },
}

export default function ResidenciesLayout({ children }: { children: React.ReactNode }) {
  return children
}
