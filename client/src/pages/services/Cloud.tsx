import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Cloud as CloudIcon, Shield, Zap, DollarSign, ArrowRight, Check } from "lucide-react";
import { Link } from "wouter";
import { SEO } from "@/components/SEO";
import { pagesSEO } from "@/lib/seo-config";

export default function Cloud() {
  const offerings = [
    {
      icon: CloudIcon,
      title: "Cloud Migration",
      description: "Seamlessly migrate your infrastructure to AWS, Azure, or Google Cloud with zero downtime.",
      features: ["Assessment & Planning", "Data Migration", "Application Modernization", "Post-Migration Support"],
    },
    {
      icon: Zap,
      title: "Auto-Scaling Solutions",
      description: "Dynamically scale your resources based on demand for optimal performance and cost.",
      features: ["Load Balancing", "Elastic Compute", "Serverless Architecture", "Real-time Scaling"],
    },
    {
      icon: Shield,
      title: "Security & Compliance",
      description: "Enterprise-grade security with compliance for GDPR, HIPAA, SOC 2, and more.",
      features: ["Identity Management", "Data Encryption", "Compliance Audits", "Threat Detection"],
    },
    {
      icon: DollarSign,
      title: "Cost Optimization",
      description: "Reduce cloud spending by up to 40% with intelligent resource management.",
      features: ["Resource Tagging", "Usage Analytics", "Reserved Instances", "Spot Instance Strategy"],
    },
  ];

  const platforms = [
    { name: "AWS", color: "from-orange-400 to-orange-600" },
    { name: "Azure", color: "from-blue-500 to-blue-700" },
    { name: "Google Cloud", color: "from-blue-400 to-green-500" },
    { name: "DigitalOcean", color: "from-blue-600 to-indigo-600" },
    { name: "Cloudflare", color: "from-orange-500 to-yellow-500" },
    { name: "Vercel", color: "from-gray-800 to-black" },
  ];

  const benefits = [
    "99.99% uptime SLA with multi-region redundancy",
    "Automatic backups and disaster recovery",
    "Pay only for what you use with flexible pricing",
    "Global CDN for lightning-fast content delivery",
    "Built-in DDoS protection and security",
    "24/7 monitoring and proactive alerts",
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title={pagesSEO.cloud.title}
        description={pagesSEO.cloud.description}
        keywords={pagesSEO.cloud.keywords}
      />
      <Navigation />
      
      <main className="flex-1">
        <section className="pt-32 pb-20 md:pt-40 md:pb-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-background to-teal-500/10" />
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl" />
          
          <div className="relative max-w-7xl mx-auto px-6">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
                <CloudIcon className="w-4 h-4 text-emerald-500" />
                <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">Cloud Infrastructure</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
                Scale Effortlessly <br />
                <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
                  In The Cloud
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl">
                Build robust, scalable cloud infrastructure on AWS, Azure, or Google Cloud. 
                Enterprise-grade security, automatic scaling, and cost optimization built-in.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild data-testid="button-cloud-get-started">
                  <a href="#contact">
                    <span className="flex items-center gap-2">
                      Get Started
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild data-testid="button-cloud-learn-more">
                  <a href="/#services">Learn More</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-32 bg-muted/30">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Cloud Services</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {offerings.map((offering) => {
                const Icon = offering.icon;
                return (
                  <Card key={offering.title} className="p-8" data-testid={`card-offering-${offering.title.toLowerCase().replace(/\s+/g, '-')}`}>
                    <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mb-6">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-2xl font-semibold mb-3">{offering.title}</h3>
                    <p className="text-muted-foreground mb-6">{offering.description}</p>
                    <ul className="space-y-2">
                      {offering.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm">
                          <Check className="w-4 h-4 text-emerald-500" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-20 md:py-32">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Cloud Platforms We Master</h2>
                <p className="text-muted-foreground mb-8">
                  Multi-cloud expertise across all major providers. We help you choose 
                  the right platform and architect solutions that maximize value.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {platforms.map((platform) => (
                    <div
                      key={platform.name}
                      className={`px-4 py-3 rounded-lg bg-gradient-to-br ${platform.color} text-white font-medium text-center`}
                      data-testid={`badge-platform-${platform.name.toLowerCase().replace(/\s/g, '')}`}
                    >
                      {platform.name}
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold mb-6">Cloud Advantages</h3>
                <div className="space-y-4">
                  {benefits.map((benefit) => (
                    <div key={benefit} className="flex items-start gap-3" data-testid="item-benefit">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                      <p className="text-muted-foreground">{benefit}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-32 bg-gradient-to-br from-emerald-500/10 to-teal-500/10">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Move to the Cloud?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Let's discuss your cloud strategy and build a scalable infrastructure.
            </p>
            <Button size="lg" asChild data-testid="button-cloud-cta-contact">
              <a href="#contact">
                <span className="flex items-center gap-2">
                  Start Your Journey
                  <ArrowRight className="w-4 h-4" />
                </span>
              </a>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
