import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "VCs 2026",
  description: "Interactive visualization of where top VCs are placing their bets. See consensus themes from a16z, YC, Sequoia, and more. Explore investment theses and find problems investors want solved.",
  alternates: { canonical: "/landscape" },
  openGraph: {
    title: "VCs 2026",
    description: "Interactive visualization of where top VCs are placing their bets. See consensus themes and explore investment theses.",
    url: "/landscape",
    images: [{ url: "/api/og?title=VCs%202026&description=Interactive%20visualization%20of%20where%20top%20VCs%20are%20placing%20their%20bets&category=VCs", width: 1200, height: 630, alt: "VCs 2026" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "VCs 2026",
    description: "Interactive visualization of where top VCs are placing their bets. See consensus themes and explore investment theses.",
  },
}

export default function LandscapeLayout({ children }: { children: React.ReactNode }) {
  return children
}
