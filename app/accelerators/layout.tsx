import type { Metadata } from 'next'
import { allAccelerators } from '@/data/accelerators'

const count = allAccelerators.length

export const metadata: Metadata = {
  title: 'Top-Tier Accelerators 2026',
  description:
    `Compare ${count} top-tier accelerators in the US, Canada, UK, and EU. See focus areas, application status, and program structure.`,
  alternates: { canonical: '/accelerators' },
  openGraph: {
    title: 'Top-Tier Accelerators 2026',
    description:
      `Compare ${count} top-tier accelerators in the West and shortlist programs by focus and application status.`,
    url: '/accelerators',
    images: [
      {
        url: '/api/og?title=Top-Tier%20Accelerators%202026&description=Compare%20the%20top%201%25%20accelerators%20in%20the%20West&category=Accelerators',
        width: 1200,
        height: 630,
        alt: 'Top-Tier Accelerators 2026',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Top-Tier Accelerators 2026',
    description:
      `Compare ${count} top-tier accelerators in the West and shortlist programs by focus and application status.`,
  },
}

export default function AcceleratorsLayout({ children }: { children: React.ReactNode }) {
  return children
}
