import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Shield, Lock, Eye, Database, Mail, UserCheck } from "lucide-react";

export default function PrivacyPolicy() {
  const sections = [
    {
      icon: Database,
      title: "Information We Collect",
      content: [
        {
          subtitle: "Personal Information",
          text: "We collect information that you provide directly to us, including name, email address, phone number, company name, and any other information you choose to provide when contacting us or using our services.",
        },
        {
          subtitle: "Usage Information",
          text: "We automatically collect certain information about your device and how you interact with our website, including IP address, browser type, pages visited, time spent on pages, and referring website addresses.",
        },
        {
          subtitle: "Cookies and Tracking",
          text: "We use cookies and similar tracking technologies to collect information about your browsing activities and to remember your preferences. You can control cookies through your browser settings.",
        },
      ],
    },
    {
      icon: Eye,
      title: "How We Use Your Information",
      content: [
        {
          subtitle: "Service Delivery",
          text: "We use your information to provide, maintain, and improve our services, respond to your inquiries, and communicate with you about our products and services.",
        },
        {
          subtitle: "Analytics and Improvement",
          text: "We analyze usage patterns to understand how our services are used and to improve user experience, develop new features, and enhance our website performance.",
        },
        {
          subtitle: "Marketing Communications",
          text: "With your consent, we may send you promotional materials, newsletters, and updates about our services. You can opt out of these communications at any time.",
        },
      ],
    },
    {
      icon: Lock,
      title: "Data Security",
      content: [
        {
          subtitle: "Security Measures",
          text: "We implement industry-standard security measures to protect your personal information from unauthorized access, disclosure, alteration, and destruction. This includes encryption, secure servers, and regular security audits.",
        },
        {
          subtitle: "Data Retention",
          text: "We retain your personal information only for as long as necessary to fulfill the purposes outlined in this privacy policy, unless a longer retention period is required by law.",
        },
      ],
    },
    {
      icon: UserCheck,
      title: "Your Rights",
      content: [
        {
          subtitle: "Access and Control",
          text: "You have the right to access, update, or delete your personal information. You can request a copy of your data or ask us to remove it from our systems at any time.",
        },
        {
          subtitle: "Data Portability",
          text: "You have the right to receive your personal data in a structured, commonly used, and machine-readable format and to transmit that data to another controller.",
        },
        {
          subtitle: "Withdraw Consent",
          text: "Where we rely on your consent to process your personal information, you have the right to withdraw that consent at any time.",
        },
      ],
    },
    {
      icon: Mail,
      title: "Third-Party Services",
      content: [
        {
          subtitle: "Service Providers",
          text: "We may share your information with trusted third-party service providers who assist us in operating our website, conducting our business, or servicing you. These parties are obligated to keep your information confidential.",
        },
        {
          subtitle: "Analytics Tools",
          text: "We use third-party analytics tools to help us understand how visitors use our website. These tools may collect information about your use of our services.",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Privacy Policy | NeoVedic Software"
        description="Learn how NeoVedic Software collects, uses, and protects your personal information. Read our comprehensive privacy policy."
        keywords="privacy policy, data protection, GDPR, personal information, data security"
      />
      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-32 pb-16 md:pt-40 md:pb-24 relative overflow-hidden bg-gradient-to-br from-primary/5 to-purple-500/5">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-blue-500 to-purple-600 rounded-full blur-3xl animate-pulse" />
          </div>

          <div className="relative max-w-4xl mx-auto px-6">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary/10 to-purple-500/10 border border-primary/30 mb-6">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Your Privacy Matters
              </span>
            </div>

            <h1
              className="text-4xl md:text-6xl font-bold mb-6"
              data-testid="text-privacy-heading"
            >
              Privacy Policy
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              Last updated: October 26, 2025
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              At NeoVedic Software, we are committed to protecting your privacy
              and ensuring the security of your personal information. This
              Privacy Policy explains how we collect, use, disclose, and
              safeguard your information when you visit our website or use our
              services.
            </p>
          </div>
        </section>

        {/* Policy Sections */}
        <section className="py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-6">
            <div className="space-y-12">
              {sections.map((section, index) => {
                const Icon = section.icon;
                return (
                  <div
                    key={index}
                    className="scroll-mt-24"
                    data-testid={`section-${section.title.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold">
                        {section.title}
                      </h2>
                    </div>

                    <div className="space-y-6 ml-0 md:ml-15">
                      {section.content.map((item, itemIndex) => (
                        <div
                          key={itemIndex}
                          className="bg-muted/30 rounded-lg p-6 border border-border/50"
                        >
                          <h3 className="text-lg font-semibold mb-3">
                            {item.subtitle}
                          </h3>
                          <p className="text-muted-foreground leading-relaxed">
                            {item.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Contact Section */}
            <div className="mt-16 p-8 rounded-xl bg-gradient-to-br from-primary/10 to-purple-500/10 border border-primary/20">
              <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
              <p className="text-muted-foreground mb-4">
                If you have any questions or concerns about this Privacy Policy
                or our data practices, please contact us at:
              </p>
              <div className="space-y-2">
                <p className="font-medium">NeoVedic Software</p>
                <p className="text-muted-foreground">
                  Email:{" "}
                  <a
                    href="mailto:info@neovedicsoft.com"
                    className="text-primary hover:underline"
                    data-testid="link-email-contact"
                  >
                    info@neovedicsoft.com
                  </a>
                </p>
              </div>
            </div>

            {/* Updates Notice */}
            <div className="mt-8 p-6 rounded-lg bg-amber-500/10 border border-amber-500/20">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Shield className="w-5 h-5 text-amber-600" />
                Policy Updates
              </h3>
              <p className="text-sm text-muted-foreground">
                We may update this Privacy Policy from time to time. We will
                notify you of any changes by posting the new Privacy Policy on
                this page and updating the "Last updated" date. We encourage you
                to review this Privacy Policy periodically for any changes.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
