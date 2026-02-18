'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export default function YCRFSLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen pt-16">
      <Header />
      {children}
      <Footer />
    </div>
  )
}
