import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FileText } from "lucide-react"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-20">
        <div className="mx-auto max-w-4xl px-6">
          {/* Hero */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent/10 mb-6">
              <FileText className="w-8 h-8 text-accent" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
            <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          {/* Content */}
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground mb-4">
                By accessing and using OpenQuest, you accept and agree to be bound by the terms and provision of this
                agreement. If you do not agree to abide by these terms, please do not use this service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">2. Use License</h2>
              <p className="text-muted-foreground mb-4">
                Permission is granted to temporarily access OpenQuest for personal, non-commercial use only. This is
                the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or for any public display</li>
                <li>Attempt to reverse engineer any software contained on OpenQuest</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">3. User Content</h2>
              <p className="text-muted-foreground mb-4">
                When you submit problems, comments, or other content to OpenQuest, you retain ownership of your
                content. However, you grant OpenQuest a worldwide, non-exclusive, royalty-free license to use,
                reproduce, modify, and display your content in connection with operating the service.
              </p>
              <p className="text-muted-foreground mb-4">You agree not to submit content that:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                <li>Violates any third party's rights</li>
                <li>Contains harmful, offensive, or inappropriate material</li>
                <li>Infringes on intellectual property rights</li>
                <li>Contains spam or unauthorized advertising</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">4. Community Guidelines</h2>
              <p className="text-muted-foreground mb-4">
                OpenQuest is built on respectful collaboration. Users are expected to:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                <li>Be respectful and constructive in all interactions</li>
                <li>Share authentic, original problems and ideas</li>
                <li>Provide thoughtful feedback to others</li>
                <li>Not engage in harassment, hate speech, or abuse</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">5. Disclaimer</h2>
              <p className="text-muted-foreground mb-4">
                The materials on OpenQuest are provided on an 'as is' basis. OpenQuest makes no warranties, expressed
                or implied, and hereby disclaims and negates all other warranties including, without limitation,
                implied warranties or conditions of merchantability, fitness for a particular purpose, or
                non-infringement of intellectual property or other violation of rights.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">6. Limitations</h2>
              <p className="text-muted-foreground mb-4">
                In no event shall OpenQuest or its suppliers be liable for any damages (including, without limitation,
                damages for loss of data or profit, or due to business interruption) arising out of the use or
                inability to use OpenQuest.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">7. Account Termination</h2>
              <p className="text-muted-foreground mb-4">
                We reserve the right to terminate or suspend access to our service immediately, without prior notice
                or liability, for any reason whatsoever, including without limitation if you breach the Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">8. Changes to Terms</h2>
              <p className="text-muted-foreground mb-4">
                OpenQuest reserves the right to revise these terms of service at any time without notice. By using
                this service you are agreeing to be bound by the then current version of these terms of service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">9. Contact Information</h2>
              <p className="text-muted-foreground mb-4">
                If you have any questions about these Terms, please contact us at:
              </p>
              <p className="text-muted-foreground">
                <a href="mailto:legal@openquest.com" className="text-accent hover:text-accent/80 transition-colors">
                  legal@openquest.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
