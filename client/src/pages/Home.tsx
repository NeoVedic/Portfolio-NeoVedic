import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { ServicesSection } from "@/components/ServicesSection";
import { AboutSection } from "@/components/AboutSection";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Briefcase, Star } from "lucide-react";
import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { SEO } from "@/components/SEO";
import { pagesSEO } from "@/lib/seo-config";

export default function Home() {
  const quickLinks = [
    {
      icon: Users,
      title: "Hire Resources",
      description: "Scale your team with expert developers and engineers",
      href: "/hire-resources",
      gradient: "from-blue-600 to-cyan-600",
    },
    {
      icon: Briefcase,
      title: "Career Opportunities",
      description: "Join our team of world-class professionals",
      href: "/career",
      gradient: "from-purple-600 to-pink-600",
    },
    {
      icon: Star,
      title: "Our Clients",
      description: "See how we've helped businesses transform",
      href: "/clients",
      gradient: "from-emerald-600 to-teal-600",
    },
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title={pagesSEO.home.title}
        description={pagesSEO.home.description}
        keywords={pagesSEO.home.keywords}
      />
      <Navigation />
      <HeroSection />
      <ServicesSection />
      <AboutSection />

      <section className="py-24 md:py-32 bg-muted/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Explore More
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover how NeoVedic Software can help accelerate your business
              growth
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {quickLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link key={link.href} href={link.href}>
                  <Card className="p-8 h-full hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/30 cursor-pointer group">
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${link.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                      {link.title}
                    </h3>
                    <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                      {link.description}
                    </p>
                    <div className="flex items-center gap-2 text-primary font-semibold">
                      Learn More
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-40 bg-gradient-to-br from-primary/10 to-purple-500/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 to-transparent" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed">
            Let's discuss how our enterprise solutions can drive your digital
            transformation and accelerate growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Button size="lg" asChild className="px-10 py-6 text-lg">
              <Link href="/contact">
                <span className="flex items-center gap-2">
                  Get Started Today
                  <ArrowRight className="w-5 h-5" />
                </span>
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="px-10 py-6 text-lg"
            >
              <Link href="/services">View All Services</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
