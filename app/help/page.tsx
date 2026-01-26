import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HelpCircle, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default function HelpPage() {
  const faqs = [
    {
      category: "Getting Started",
      questions: [
        {
          q: "What is OpenQuest?",
          a: "OpenQuest is a community-driven platform for discovering and sharing problems worth solving. It's like Product Hunt, but for problems instead of products.",
        },
        {
          q: "How do I submit a problem?",
          a: 'Click the "Submit a Problem" button in the header, fill out the form with your problem details, and submit it for review by our curation team.',
        },
        {
          q: "Do I need an account to browse problems?",
          a: "No, you can browse problems without an account. However, you'll need to create an account to submit problems, upvote, or comment.",
        },
      ],
    },
    {
      category: "Submitting Problems",
      questions: [
        {
          q: "What makes a good problem submission?",
          a: "A good problem is specific, clearly explained, has real-world impact, and isn't already being widely solved. Focus on the 'why' it matters.",
        },
        {
          q: "How long does the review process take?",
          a: "Our curation team typically reviews submissions within 48 hours. You'll receive an email notification once your problem is reviewed.",
        },
        {
          q: "Can I edit my problem after submitting?",
          a: "Currently, you can only edit problems before they're approved. Contact us if you need to make changes to an approved problem.",
        },
        {
          q: "What is forking a problem?",
          a: "Forking allows you to take an existing problem and explore it from a different angle. Your fork must be substantially different from the original.",
        },
      ],
    },
    {
      category: "Community",
      questions: [
        {
          q: "How does upvoting work?",
          a: "Upvote problems you think are important and worth solving. Upvotes help surface the most impactful problems to the top of the feed.",
        },
        {
          q: "Can I collaborate with others on solving a problem?",
          a: "Yes! Use the comments section to discuss solutions, share insights, and connect with other builders who want to tackle the same problem.",
        },
        {
          q: "What are the community guidelines?",
          a: "Be respectful, constructive, and genuine. Share authentic problems, provide thoughtful feedback, and engage in good faith discussions.",
        },
      ],
    },
    {
      category: "Account & Privacy",
      questions: [
        {
          q: "How do I delete my account?",
          a: "Go to Settings > Account > Delete Account. Note that this action is permanent and cannot be undone.",
        },
        {
          q: "Can I submit problems anonymously?",
          a: "Yes, you can choose to submit problems anonymously during the submission process. Your username won't be displayed on anonymous submissions.",
        },
        {
          q: "How is my data used?",
          a: "We use your data to provide and improve our services. See our Privacy Policy for full details on data collection and usage.",
        },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-20">
        <div className="mx-auto max-w-5xl px-6">
          {/* Hero */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent/10 mb-6">
              <HelpCircle className="w-8 h-8 text-accent" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Help Center</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Find answers to common questions about using OpenQuest
            </p>

            {/* Search */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search help articles..."
                className="h-12 pl-12 text-base"
              />
            </div>
          </div>

          {/* FAQ Sections */}
          <div className="space-y-12">
            {faqs.map((section) => (
              <section key={section.category}>
                <h2 className="text-2xl font-bold mb-6">{section.category}</h2>
                <div className="space-y-6">
                  {section.questions.map((item, index) => (
                    <div
                      key={index}
                      className="border border-border/50 rounded-lg p-6 bg-card hover:border-border transition-colors"
                    >
                      <h3 className="text-lg font-semibold mb-3">{item.q}</h3>
                      <p className="text-muted-foreground leading-relaxed">{item.a}</p>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* Contact Section */}
          <section className="mt-16 text-center border-t border-border/40 pt-12">
            <h2 className="text-2xl font-bold mb-4">Still need help?</h2>
            <p className="text-muted-foreground mb-6">
              Can't find what you're looking for? Our team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:support@openquest.com"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-accent text-accent-foreground hover:bg-accent/90 transition-colors font-medium"
              >
                Email Support
              </a>
              <Link
                href="/about"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-border hover:bg-secondary transition-colors font-medium"
              >
                Learn More About Us
              </Link>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
