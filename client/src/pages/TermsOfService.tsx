import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { FileText, Scale, AlertCircle, CheckCircle, XCircle, Info } from "lucide-react";

export default function TermsOfService() {
  const sections = [
    {
      icon: CheckCircle,
      title: "Acceptance of Terms",
      content: [
        {
          subtitle: "Agreement to Terms",
          text: "By accessing and using NeoVedic Software's services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.",
        },
        {
          subtitle: "Eligibility",
          text: "You must be at least 18 years old and have the legal capacity to enter into contracts to use our services. By using our services, you represent and warrant that you meet these requirements.",
        },
      ],
    },
    {
      icon: FileText,
      title: "Services Provided",
      content: [
        {
          subtitle: "Scope of Services",
          text: "NeoVedic Software provides web development, DevOps, cloud infrastructure, and digital marketing services. The specific terms of each service engagement will be outlined in separate service agreements or statements of work.",
        },
        {
          subtitle: "Service Modifications",
          text: "We reserve the right to modify, suspend, or discontinue any aspect of our services at any time. We will make reasonable efforts to notify you of any significant changes that may affect your use of our services.",
        },
        {
          subtitle: "Service Availability",
          text: "While we strive to maintain high availability, we do not guarantee uninterrupted access to our services. We may perform maintenance, updates, or experience technical issues that temporarily affect service availability.",
        },
      ],
    },
    {
      icon: Scale,
      title: "User Responsibilities",
      content: [
        {
          subtitle: "Account Security",
          text: "You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account.",
        },
        {
          subtitle: "Lawful Use",
          text: "You agree to use our services only for lawful purposes and in accordance with these Terms. You must not use our services in any way that violates applicable laws or regulations.",
        },
        {
          subtitle: "Prohibited Activities",
          text: "You must not: (a) attempt to gain unauthorized access to our systems; (b) interfere with or disrupt our services; (c) transmit viruses or malicious code; (d) violate intellectual property rights; or (e) use our services for any illegal or fraudulent purposes.",
        },
      ],
    },
    {
      icon: Info,
      title: "Intellectual Property",
      content: [
        {
          subtitle: "Our Rights",
          text: "All content, features, and functionality of our services, including but not limited to text, graphics, logos, and software, are owned by NeoVedic Software and protected by copyright, trademark, and other intellectual property laws.",
        },
        {
          subtitle: "Client Materials",
          text: "You retain all rights to any materials, content, or data you provide to us. By providing such materials, you grant us a license to use them solely for the purpose of delivering our services to you.",
        },
        {
          subtitle: "Work Product",
          text: "Upon full payment for services rendered, you will own the deliverables created specifically for you. However, we retain ownership of any pre-existing materials, templates, or frameworks used in the development process.",
        },
      ],
    },
    {
      icon: XCircle,
      title: "Limitation of Liability",
      content: [
        {
          subtitle: "Service Disclaimers",
          text: "Our services are provided 'as is' without warranties of any kind, either express or implied. We do not guarantee that our services will meet your specific requirements or that they will be error-free or uninterrupted.",
        },
        {
          subtitle: "Liability Limits",
          text: "To the maximum extent permitted by law, NeoVedic Software shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our services.",
        },
        {
          subtitle: "Maximum Liability",
          text: "Our total liability for any claims arising from or related to our services shall not exceed the amount you paid us for the specific service that gave rise to the claim during the twelve months preceding the claim.",
        },
      ],
    },
    {
      icon: AlertCircle,
      title: "Payment Terms",
      content: [
        {
          subtitle: "Fees and Pricing",
          text: "Service fees will be agreed upon in writing before work begins. All fees are exclusive of applicable taxes, which you are responsible for paying unless you provide valid tax exemption documentation.",
        },
        {
          subtitle: "Payment Schedule",
          text: "Payment terms will be specified in your service agreement. Typically, we require an upfront deposit and milestone payments as outlined in the project scope. Final payment is due upon project completion or delivery.",
        },
        {
          subtitle: "Late Payments",
          text: "Late payments may be subject to interest charges at the rate of 1.5% per month or the maximum rate permitted by law, whichever is lower. We reserve the right to suspend services for non-payment.",
        },
      ],
    },
    {
      icon: FileText,
      title: "Termination",
      content: [
        {
          subtitle: "Termination by Either Party",
          text: "Either party may terminate the service agreement with written notice as specified in the agreement. You remain responsible for payment for services rendered up to the termination date.",
        },
        {
          subtitle: "Immediate Termination",
          text: "We reserve the right to immediately terminate or suspend your access to our services if you breach these Terms, engage in fraudulent activity, or use our services in a manner that could harm our business or reputation.",
        },
        {
          subtitle: "Effect of Termination",
          text: "Upon termination, your right to use our services will immediately cease. We will provide you with any completed deliverables upon receipt of all outstanding payments.",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Terms of Service | NeoVedic Software"
        description="Read NeoVedic Software's Terms of Service to understand the rules and guidelines for using our services."
        keywords="terms of service, terms and conditions, user agreement, service terms, legal terms"
      />
      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-32 pb-16 md:pt-40 md:pb-24 relative overflow-hidden bg-gradient-to-br from-primary/5 to-purple-500/5">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-purple-500 to-pink-600 rounded-full blur-3xl animate-pulse" />
          </div>

          <div className="relative max-w-4xl mx-auto px-6">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary/10 to-purple-500/10 border border-primary/30 mb-6">
              <Scale className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Legal Agreement
              </span>
            </div>

            <h1
              className="text-4xl md:text-6xl font-bold mb-6"
              data-testid="text-terms-heading"
            >
              Terms of Service
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              Last updated: October 26, 2025
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Please read these Terms of Service carefully before using NeoVedic
              Software's services. These terms govern your use of our website and
              services and constitute a legally binding agreement between you and
              NeoVedic Software.
            </p>
          </div>
        </section>

        {/* Terms Sections */}
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

            {/* Additional Terms */}
            <div className="mt-16 space-y-8">
              <div className="p-8 rounded-xl bg-gradient-to-br from-primary/10 to-purple-500/10 border border-primary/20">
                <h2 className="text-2xl font-bold mb-4">Governing Law</h2>
                <p className="text-muted-foreground leading-relaxed">
                  These Terms shall be governed by and construed in accordance
                  with the laws of India, without regard to its conflict of law
                  provisions. Any disputes arising from these Terms or your use
                  of our services shall be subject to the exclusive jurisdiction
                  of the courts located in Maharashtra, India.
                </p>
              </div>

              <div className="p-8 rounded-xl bg-gradient-to-br from-primary/10 to-purple-500/10 border border-primary/20">
                <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
                <p className="text-muted-foreground mb-4">
                  If you have any questions about these Terms of Service, please
                  contact us:
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
            </div>

            {/* Updates Notice */}
            <div className="mt-8 p-6 rounded-lg bg-amber-500/10 border border-amber-500/20">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-amber-600" />
                Changes to Terms
              </h3>
              <p className="text-sm text-muted-foreground">
                We reserve the right to modify these Terms of Service at any
                time. We will notify you of any material changes by posting the
                updated terms on this page and updating the "Last updated" date.
                Your continued use of our services after such changes constitutes
                your acceptance of the new Terms.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
