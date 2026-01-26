import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Cookie } from "lucide-react"

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-20">
        <div className="mx-auto max-w-4xl px-6">
          {/* Hero */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent/10 mb-6">
              <Cookie className="w-8 h-8 text-accent" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Cookie Policy</h1>
            <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          {/* Content */}
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">What Are Cookies</h2>
              <p className="text-muted-foreground mb-4">
                Cookies are small text files that are placed on your device when you visit our website. They help us
                provide you with a better experience by remembering your preferences and understanding how you use our
                platform.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">How We Use Cookies</h2>
              <p className="text-muted-foreground mb-4">OpenQuest uses cookies for the following purposes:</p>

              <h3 className="text-xl font-semibold mb-3 mt-6">Essential Cookies</h3>
              <p className="text-muted-foreground mb-4">
                These cookies are necessary for the website to function properly. They enable core functionality such
                as security, authentication, and accessibility.
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                <li>Authentication and session management</li>
                <li>Security and fraud prevention</li>
                <li>Remembering your preferences</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-6">Analytics Cookies</h3>
              <p className="text-muted-foreground mb-4">
                These cookies help us understand how visitors interact with our website by collecting and reporting
                information anonymously.
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                <li>Page views and navigation patterns</li>
                <li>Time spent on pages</li>
                <li>Referring websites</li>
                <li>Device and browser information</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-6">Functional Cookies</h3>
              <p className="text-muted-foreground mb-4">
                These cookies enable enhanced functionality and personalization on our website.
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                <li>Remembering your display preferences (dark mode, etc.)</li>
                <li>Saving your filter and sort preferences</li>
                <li>Personalized content recommendations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Third-Party Cookies</h2>
              <p className="text-muted-foreground mb-4">
                We may also use cookies from trusted third-party services to help us analyze website usage and improve
                our services. These include:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                <li>Google Analytics for website analytics</li>
                <li>Authentication providers for secure login</li>
                <li>Content delivery networks for performance</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Managing Cookies</h2>
              <p className="text-muted-foreground mb-4">
                You can control and manage cookies in various ways:
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-6">Browser Settings</h3>
              <p className="text-muted-foreground mb-4">
                Most web browsers allow you to control cookies through their settings. You can typically:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                <li>View what cookies are stored</li>
                <li>Delete all or specific cookies</li>
                <li>Block third-party cookies</li>
                <li>Block all cookies from specific websites</li>
                <li>Block all cookies entirely</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-6">Impact of Disabling Cookies</h3>
              <p className="text-muted-foreground mb-4">
                Please note that disabling cookies may impact your experience on OpenQuest. Some features may not work
                properly, and you may need to re-enter information more frequently.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Cookie Retention</h2>
              <p className="text-muted-foreground mb-4">
                Different cookies have different retention periods:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                <li>
                  <strong>Session cookies:</strong> Deleted when you close your browser
                </li>
                <li>
                  <strong>Persistent cookies:</strong> Remain on your device for a set period (typically 1-2 years) or
                  until you delete them
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Updates to This Policy</h2>
              <p className="text-muted-foreground mb-4">
                We may update this Cookie Policy from time to time. We will notify you of any changes by posting the
                new policy on this page with an updated "Last updated" date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
              <p className="text-muted-foreground mb-4">
                If you have questions about our use of cookies, please contact us at:
              </p>
              <p className="text-muted-foreground">
                <a
                  href="mailto:privacy@openquest.com"
                  className="text-accent hover:text-accent/80 transition-colors"
                >
                  privacy@openquest.com
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
