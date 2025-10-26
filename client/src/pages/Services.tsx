import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code2, Server, Cloud, TrendingUp, ArrowRight, Globe } from "lucide-react";
import { Link } from "wouter";
import { SEO } from "@/components/SEO";
import { pagesSEO } from "@/lib/seo-config";

export default function Services() {
  const services = [
    {
      icon: Code2,
      title: "Web Development",
      description: "Enterprise-grade web applications, corporate websites, and custom ERP systems built with cutting-edge technologies.",
      features: [
        "Corporate Websites & Portals",
        "Custom ERP Systems", 
        "E-commerce Platforms",
        "Progressive Web Apps"
      ],
      gradient: "from-blue-600 to-cyan-600",
      href: "/services/web-development",
      testId: "card-service-web-development",
      highlight: "ERP & Website Solutions"
    },
    {
      icon: Server,
      title: "DevOps Services",
      description: "Accelerate delivery and reduce costs with enterprise DevOps automation, CI/CD pipelines, and infrastructure optimization.",
      features: [
        "80% Faster Deployments",
        "99.99% Uptime Reliability", 
        "Automated CI/CD Pipelines",
        "Infrastructure as Code"
      ],
      gradient: "from-purple-600 to-pink-600",
      href: "/services/devops",
      testId: "card-service-devops",
      highlight: "Business Critical"
    },
    {
      icon: Cloud,
      title: "Cloud Infrastructure",
      description: "Enterprise cloud solutions on AWS, Azure, and GCP with auto-scaling, security, and cost optimization.",
      features: [
        "Multi-Cloud Architecture",
        "Security & Compliance", 
        "Auto-Scaling Solutions",
        "60% Cost Reduction"
      ],
      gradient: "from-emerald-600 to-teal-600",
      href: "/services/cloud",
      testId: "card-service-cloud",
      highlight: "Enterprise Scale"
    },
    {
      icon: TrendingUp,
      title: "Digital Marketing",
      description: "Data-driven marketing strategies that generate leads, increase conversions, and maximize ROI.",
      features: [
        "SEO & SEM Optimization",
        "Content Marketing Strategy", 
        "Social Media Growth",
        "Analytics & ROI Tracking"
      ],
      gradient: "from-orange-600 to-red-600",
      href: "/services/marketing",
      testId: "card-service-marketing",
      highlight: "Growth Focused"
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title={pagesSEO.services.title}
        description={pagesSEO.services.description}
        keywords={pagesSEO.services.keywords}
      />
      <Navigation />
      
      <main className="flex-1">
        <section className="pt-32 pb-20 md:pt-40 md:pb-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
          
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-blue-500 to-purple-600 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-purple-500 to-pink-600 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1.5s" }} />
          </div>

          <div className="relative max-w-7xl mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary/10 via-purple-500/10 to-pink-500/10 border border-primary/30 mb-8 backdrop-blur-sm">
              <Globe className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Our Services
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-[1.1]">
              <span className="bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent">
                Comprehensive IT Solutions
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                For Modern Businesses
              </span>
            </h1>

            <p className="text-lg md:text-2xl text-muted-foreground max-w-4xl mx-auto mb-12 leading-relaxed">
              From cutting-edge web development to enterprise DevOps automation, we deliver 
              world-class technology solutions that drive business growth and digital transformation.
            </p>
          </div>
        </section>

        <section className="py-24 md:py-40 bg-muted/20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <Card 
                    key={service.title} 
                    className="relative p-10 hover-elevate active-elevate-2 transition-all duration-500 group overflow-hidden border-2 hover:border-primary/30"
                    data-testid={service.testId}
                  >
                    <div className="absolute top-0 right-0 px-4 py-1.5 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-bl-lg">
                      <span className="text-xs font-bold text-primary">{service.highlight}</span>
                    </div>

                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>

                    <h3 className="text-3xl font-bold mb-4 group-hover:text-primary transition-colors">{service.title}</h3>
                    <p className="text-muted-foreground mb-8 text-lg leading-relaxed">{service.description}</p>

                    <ul className="space-y-3 mb-8">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-3 text-base">
                          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-purple-600" />
                          <span className="text-foreground font-medium">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button variant="ghost" asChild className="group/btn p-0 h-auto text-lg font-semibold">
                      <Link href={service.href}>
                        <span className="flex items-center gap-2 text-primary">
                          Learn More
                          <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
                        </span>
                      </Link>
                    </Button>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-24 md:py-40 bg-gradient-to-br from-primary/10 to-purple-500/10">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-8">Ready to Get Started?</h2>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed">
              Let's discuss how our services can transform your business and accelerate growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <Button size="lg" asChild className="px-8 py-6 text-lg">
                <Link href="/contact">
                  <span className="flex items-center gap-2">
                    Contact Us
                    <ArrowRight className="w-5 h-5" />
                  </span>
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="px-8 py-6 text-lg">
                <Link href="/hire-resources">Hire Our Experts</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
