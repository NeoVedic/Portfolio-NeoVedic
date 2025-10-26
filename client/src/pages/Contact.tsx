import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ContactSection } from "@/components/ContactSection";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { SEO } from "@/components/SEO";
import { pagesSEO } from "@/lib/seo-config";

export default function Contact() {
  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      details: "info@neovedicsoft.com",
      subdDetails: "Get in touch with us",
    },
    {
      icon: Phone,
      title: "Call Us",
      details: "+91 6378879085",
      subdDetails: "+91 7976358875",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: "Jagatpura, Jaipur",
      subdDetails: "Rajasthan, India",
    },
    {
      icon: Clock,
      title: "Working Hours",
      details: "Monday - Friday: 9AM - 6PM",
      subdDetails: "Saturday: 10AM - 4PM",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title={pagesSEO.contact.title}
        description={pagesSEO.contact.description}
        keywords={pagesSEO.contact.keywords}
      />
      <Navigation />
      
      <main className="flex-1">
        <section className="pt-32 pb-20 md:pt-40 md:pb-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
          
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-blue-500 to-purple-600 rounded-full blur-3xl animate-pulse" />
          </div>

          <div className="relative max-w-7xl mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary/10 via-purple-500/10 to-pink-500/10 border border-primary/30 mb-8 backdrop-blur-sm">
              <Mail className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Get In Touch
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-[1.1]">
              <span className="bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent">
                Let's Start a
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Conversation
              </span>
            </h1>

            <p className="text-lg md:text-2xl text-muted-foreground max-w-4xl mx-auto mb-12 leading-relaxed">
              Have a project in mind? We'd love to hear from you. Our team is ready to help 
              transform your ideas into reality.
            </p>
          </div>
        </section>

        <section className="py-20 md:py-32 bg-muted/20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
              {contactInfo.map((info) => {
                const Icon = info.icon;
                return (
                  <Card key={info.title} className="p-8 text-center hover:shadow-xl transition-all">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center mx-auto mb-6">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{info.title}</h3>
                    <p className="text-muted-foreground font-medium">{info.details}</p>
                    <p className="text-muted-foreground text-sm mt-1">{info.subdDetails}</p>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
