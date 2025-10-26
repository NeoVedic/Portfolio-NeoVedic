import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";
import { SEO } from "@/components/SEO";
import { pagesSEO } from "@/lib/seo-config";

export default function FAQ() {
  const faqCategories = [
    {
      category: "General",
      questions: [
        {
          question: "What services does NeoVedic offer?",
          answer: "NeoVedic provides comprehensive digital transformation services including web development, DevOps automation, cloud infrastructure management, and digital marketing. We specialize in creating AI-first solutions tailored to enterprise needs.",
        },
        {
          question: "How long has NeoVedic been in business?",
          answer: "NeoVedic has been delivering cutting-edge technology solutions since our inception. We bring years of combined expertise from our team of seasoned professionals who have worked with Fortune 500 companies.",
        },
        {
          question: "What industries do you serve?",
          answer: "We serve a diverse range of industries including finance, healthcare, e-commerce, manufacturing, and technology startups. Our solutions are adaptable to meet the unique challenges of any sector.",
        },
      ],
    },
    {
      category: "Services & Solutions",
      questions: [
        {
          question: "Do you offer custom software development?",
          answer: "Yes, we specialize in custom software development tailored to your specific business requirements. From enterprise resource planning (ERP) systems to customer-facing web applications, we build scalable solutions using the latest technologies.",
        },
        {
          question: "What cloud platforms do you work with?",
          answer: "We are experienced with all major cloud platforms including Amazon Web Services (AWS), Microsoft Azure, and Google Cloud Platform (GCP). We help you choose the right platform based on your specific needs and budget.",
        },
        {
          question: "Can you help migrate our existing infrastructure to the cloud?",
          answer: "Absolutely! We provide complete cloud migration services including assessment, planning, execution, and post-migration support. We ensure minimal downtime and a smooth transition for your business.",
        },
        {
          question: "Do you provide ongoing support and maintenance?",
          answer: "Yes, we offer comprehensive support and maintenance packages to ensure your systems run smoothly. Our support includes bug fixes, security updates, performance optimization, and feature enhancements.",
        },
      ],
    },
    {
      category: "Hiring & Careers",
      questions: [
        {
          question: "Can I hire developers from NeoVedic for my project?",
          answer: "Yes! We offer resource augmentation services where you can hire our expert developers, DevOps engineers, and other IT professionals to work on your projects. They integrate seamlessly with your existing team.",
        },
        {
          question: "Are you hiring? How can I join NeoVedic?",
          answer: "We're always looking for talented individuals to join our team! Visit our Career page to view current openings and submit your application. We value innovation, collaboration, and continuous learning.",
        },
        {
          question: "What is the hiring process like?",
          answer: "Our hiring process typically includes an initial screening, technical assessment, interviews with the team, and a final discussion. We aim to make the process smooth and respectful of your time.",
        },
      ],
    },
    {
      category: "Pricing & Process",
      questions: [
        {
          question: "How do you price your services?",
          answer: "We offer flexible pricing models including fixed-price projects, time and material, and dedicated team arrangements. Pricing depends on project scope, complexity, and timeline. Contact us for a detailed quote.",
        },
        {
          question: "What is your typical project timeline?",
          answer: "Project timelines vary based on scope and complexity. A simple website might take 2-4 weeks, while enterprise solutions can take several months. We provide detailed timelines during the planning phase.",
        },
        {
          question: "Do you sign NDAs and maintain confidentiality?",
          answer: "Absolutely. We take client confidentiality very seriously. We're happy to sign NDAs and have strict internal policies to protect your intellectual property and sensitive information.",
        },
        {
          question: "What is your development process?",
          answer: "We follow agile methodologies with regular sprints, daily standups, and continuous delivery. You'll have full visibility into the development process with regular demos and updates.",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title={pagesSEO.faq.title}
        description={pagesSEO.faq.description}
        keywords={pagesSEO.faq.keywords}
      />
      <Navigation />
      
      <section className="pt-32 pb-20 px-6 bg-gradient-to-br from-primary/10 to-purple-500/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 to-transparent" />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 bg-background/80 backdrop-blur-sm px-6 py-3 rounded-full mb-8 border border-border">
            <HelpCircle className="w-5 h-5 text-primary" />
            <span className="font-semibold text-sm" data-testid="text-faq-badge">Frequently Asked Questions</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6" data-testid="text-faq-title">
            How Can We Help You?
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-faq-description">
            Find answers to common questions about our services, processes, and how we can help transform your business.
          </p>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          {faqCategories.map((category, categoryIndex) => (
            <div key={category.category} className="mb-12">
              <h2 className="text-3xl font-bold mb-6" data-testid={`text-category-${category.category.toLowerCase().replace(/\s/g, "-")}`}>
                {category.category}
              </h2>
              <Accordion type="single" collapsible className="w-full">
                {category.questions.map((faq, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`item-${categoryIndex}-${index}`}
                    data-testid={`accordion-item-${categoryIndex}-${index}`}
                  >
                    <AccordionTrigger 
                      className="text-left text-lg font-semibold hover:text-primary transition-colors"
                      data-testid={`accordion-trigger-${categoryIndex}-${index}`}
                    >
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent 
                      className="text-muted-foreground text-base leading-relaxed"
                      data-testid={`accordion-content-${categoryIndex}-${index}`}
                    >
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 px-6 bg-muted/20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6" data-testid="text-still-questions">
            Still Have Questions?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Can't find the answer you're looking for? Our team is here to help you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center h-12 px-8 rounded-md bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
              data-testid="button-contact-us"
            >
              Contact Us
            </a>
            <a
              href="/services"
              className="inline-flex items-center justify-center h-12 px-8 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground font-semibold transition-colors"
              data-testid="button-view-services"
            >
              View Our Services
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
