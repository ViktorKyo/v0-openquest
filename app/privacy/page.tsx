import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Shield } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Learn how OpenQuest collects, uses, and protects your personal information. Read our privacy policy.",
  alternates: { canonical: "/privacy" },
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-20">
        <div className="mx-auto max-w-4xl px-6">
          {/* Hero */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent/10 mb-6">
              <Shield className="w-8 h-8 text-accent" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-muted-foreground">Last updated: February 12, 2026</p>
          </div>

          {/* Content */}
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
              <p className="text-muted-foreground mb-4">
                At OpenQuest, we take your privacy seriously. This Privacy Policy explains how we collect, use,
                disclose, and safeguard your information when you use our platform.
              </p>
              <p className="text-muted-foreground mb-4">
                Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy,
                please do not access the site.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">2. Information We Collect</h2>
              <h3 className="text-xl font-semibold mb-3 mt-6">Personal Information</h3>
              <p className="text-muted-foreground mb-4">
                We may collect personal information that you voluntarily provide to us when you:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                <li>Register for an account (username, email address, profile information)</li>
                <li>Submit problems or comments (content you create on the platform)</li>
                <li>Participate in discussions (upvotes, saved problems)</li>
                <li>Contact us for support</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-6">Automatically Collected Information</h3>
              <p className="text-muted-foreground mb-4">
                We automatically collect certain information when you visit, use, or navigate OpenQuest. This
                information includes:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                <li>Log and usage data (IP address, browser type, operating system)</li>
                <li>Device information</li>
                <li>Location data</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">3. How We Use Your Information</h2>
              <p className="text-muted-foreground mb-4">We use the information we collect or receive to:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                <li>Provide, operate, and maintain our platform</li>
                <li>Improve, personalize, and expand our services</li>
                <li>Understand and analyze how you use our platform</li>
                <li>Develop new features and functionality</li>
                <li>Send service-related notices (e.g., account verification, security alerts)</li>
                <li>Detect and prevent fraud and abuse</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">4. Sharing Your Information</h2>
              <p className="text-muted-foreground mb-4">
                We may share your information in the following situations:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                <li>
                  <strong>With Your Consent:</strong> We may share your information with third parties when you give us
                  explicit consent to do so
                </li>
                <li>
                  <strong>Service Providers:</strong> We may share your information with third-party service providers
                  that perform services for us (hosting, analytics)
                </li>
                <li>
                  <strong>Legal Requirements:</strong> We may disclose your information if required by law or in
                  response to valid requests by public authorities
                </li>
                <li>
                  <strong>Business Transfers:</strong> We may share or transfer your information in connection with a
                  merger, acquisition, or sale of assets
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">5. Data Retention</h2>
              <p className="text-muted-foreground mb-4">
                We will retain your personal information only for as long as necessary to fulfill the purposes outlined
                in this Privacy Policy, unless a longer retention period is required or permitted by law.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">6. Your Privacy Rights</h2>
              <p className="text-muted-foreground mb-4">Depending on your location, you may have the following rights:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your personal information</li>
                <li>Object to processing of your personal information</li>
                <li>Request restriction of processing your personal information</li>
                <li>Data portability rights</li>
                <li>Withdraw consent at any time</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">7. Cookies and Tracking</h2>
              <p className="text-muted-foreground mb-4">
                We use cookies and similar tracking technologies to track activity on our platform and hold certain
                information. For more details, please see our{" "}
                <Link href="/cookies" className="text-accent hover:text-accent/80 transition-colors">
                  Cookie Policy
                </Link>
                . You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">8. Security</h2>
              <p className="text-muted-foreground mb-4">
                We use administrative, technical, and physical security measures to protect your personal information.
                However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute
                security.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">9. Children&apos;s Privacy</h2>
              <p className="text-muted-foreground mb-4">
                Our service is not intended for children under the age of 13. We do not knowingly collect personal
                information from children under 13. If you are a parent or guardian and believe your child has provided
                us with personal information, please contact us.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">10. California Privacy Rights</h2>
              <p className="text-muted-foreground mb-4">
                If you are a California resident, you have specific rights under the California Consumer Privacy Act
                (CCPA):
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                <li>
                  <strong>Right to Know:</strong> You can request information about the categories and specific pieces
                  of personal information we have collected about you
                </li>
                <li>
                  <strong>Right to Delete:</strong> You can request that we delete any personal information we have
                  collected from you
                </li>
                <li>
                  <strong>Right to Opt-Out:</strong> You have the right to opt out of the sale of your personal
                  information. OpenQuest does not sell your personal information
                </li>
                <li>
                  <strong>Non-Discrimination:</strong> We will not discriminate against you for exercising any of your
                  CCPA rights
                </li>
              </ul>
              <p className="text-muted-foreground mb-4">
                To exercise any of these rights, please contact us through our{" "}
                <Link href="/help" className="text-accent hover:text-accent/80 transition-colors">
                  Help Center
                </Link>
                .
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">11. Changes to This Policy</h2>
              <p className="text-muted-foreground mb-4">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the
                new Privacy Policy on this page and updating the &quot;Last updated&quot; date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">12. Contact Us</h2>
              <p className="text-muted-foreground mb-4">
                If you have questions or concerns about this Privacy Policy, please reach out through our{" "}
                <Link href="/help" className="text-accent hover:text-accent/80 transition-colors">
                  Help Center
                </Link>
                .
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
