import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Code2, Smartphone, ShoppingCart, Zap, ArrowRight, Check, 
  Globe, Building2, Database, Layers, Briefcase, TrendingUp,
  Package, Users, BarChart3, Workflow
} from "lucide-react";
import { SEO } from "@/components/SEO";
import { pagesSEO } from "@/lib/seo-config";

export default function WebDevelopment() {
  const coreOfferings = [
    {
      icon: Globe,
      title: "Corporate Websites & Portals",
      description: "Enterprise-grade corporate websites that establish your brand presence and drive business growth with stunning design and flawless performance.",
      features: [
        "Responsive Corporate Design",
        "SEO & Performance Optimized", 
        "Content Management Systems",
        "Multi-language Support"
      ],
      highlight: "Brand Identity"
    },
    {
      icon: Building2,
      title: "Custom ERP Systems",
      description: "Tailored Enterprise Resource Planning solutions that integrate all your business processes into one unified, intelligent system.",
      features: [
        "Complete Business Integration",
        "Real-time Data Analytics", 
        "Inventory & Supply Chain",
        "Financial Management"
      ],
      highlight: "Business Critical"
    },
    {
      icon: ShoppingCart,
      title: "E-commerce Platforms",
      description: "High-conversion online stores with secure payments, inventory management, and analytics to maximize your revenue.",
      features: [
        "Multi-Payment Gateway Integration",
        "Advanced Product Catalogs", 
        "Order & Shipping Management",
        "Customer Analytics & CRM"
      ],
      highlight: "Revenue Driver"
    },
    {
      icon: Smartphone,
      title: "Progressive Web Apps",
      description: "App-like experiences that work offline, send push notifications, and provide native performance across all devices.",
      features: [
        "Offline-First Functionality",
        "Push Notifications", 
        "Native App Experience",
        "Cross-Platform Deployment"
      ],
      highlight: "Modern Experience"
    },
  ];

  const erpFeatures = [
    {
      icon: Database,
      title: "Data Integration",
      description: "Centralize all business data from multiple sources into one unified system for complete visibility."
    },
    {
      icon: Workflow,
      title: "Process Automation",
      description: "Automate repetitive tasks and workflows to increase efficiency and reduce operational costs."
    },
    {
      icon: BarChart3,
      title: "Business Intelligence",
      description: "Real-time dashboards and analytics for data-driven decision making across all departments."
    },
    {
      icon: Users,
      title: "User Management",
      description: "Role-based access control and user management for secure, scalable team collaboration."
    },
    {
      icon: Package,
      title: "Inventory Control",
      description: "Complete inventory tracking, automated reordering, and supply chain optimization."
    },
    {
      icon: Briefcase,
      title: "CRM Integration",
      description: "Seamlessly integrate customer relationship management with all business operations."
    },
  ];

  const websiteTypes = [
    {
      title: "Corporate Websites",
      description: "Professional brand presence with modern design, SEO optimization, and lead generation capabilities.",
      benefits: ["Brand Authority", "Lead Generation", "24/7 Availability"]
    },
    {
      title: "Business Portals",
      description: "Secure client portals, partner dashboards, and internal systems for streamlined operations.",
      benefits: ["Client Self-Service", "Data Security", "Process Efficiency"]
    },
    {
      title: "E-commerce Sites",
      description: "Full-featured online stores that convert visitors into customers with seamless checkout experiences.",
      benefits: ["Revenue Growth", "Global Reach", "Automated Sales"]
    },
    {
      title: "SaaS Platforms",
      description: "Scalable software-as-a-service applications with subscription management and user analytics.",
      benefits: ["Recurring Revenue", "Auto-Scaling", "Global CDN"]
    },
  ];

  const techStack = [
    { name: "React", color: "from-blue-400 to-cyan-400" },
    { name: "Next.js", color: "from-gray-600 to-gray-900" },
    { name: "TypeScript", color: "from-blue-600 to-blue-800" },
    { name: "Node.js", color: "from-green-500 to-emerald-700" },
    { name: "PostgreSQL", color: "from-blue-700 to-indigo-800" },
    { name: "MongoDB", color: "from-green-600 to-teal-700" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title={pagesSEO.webDevelopment.title}
        description={pagesSEO.webDevelopment.description}
        keywords={pagesSEO.webDevelopment.keywords}
      />
      <Navigation />
      
      <main className="flex-1">
        <section className="pt-32 pb-20 md:pt-40 md:pb-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-background to-cyan-600/20" />
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-blue-500/30 to-cyan-500/30 rounded-full blur-3xl" />
          
          <div className="relative max-w-7xl mx-auto px-6">
            <div className="max-w-5xl">
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 mb-8">
                <Code2 className="w-5 h-5 text-blue-500" />
                <span className="text-sm font-bold text-blue-600 dark:text-blue-400">WEB DEVELOPMENT</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-[1.1]">
                <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                  Enterprise Websites &
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Custom ERP Solutions
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-4xl leading-relaxed">
                From <span className="font-semibold text-foreground">world-class corporate websites</span> to 
                <span className="font-semibold text-foreground"> fully integrated ERP systems</span>, we build 
                web solutions that transform how your business operates and grows.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-5">
                <Button size="lg" asChild className="px-8 py-6 text-lg" data-testid="button-webdev-get-started">
                  <a href="#contact">
                    <span className="flex items-center gap-2">
                      Start Your Project
                      <ArrowRight className="w-5 h-5" />
                    </span>
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild className="px-8 py-6 text-lg" data-testid="button-webdev-view-work">
                  <a href="#solutions">Explore Solutions</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="solutions" className="py-24 md:py-32 bg-muted/30">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Development Solutions</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Comprehensive web development services for modern businesses
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {coreOfferings.map((offering) => {
                const Icon = offering.icon;
                return (
                  <Card key={offering.title} className="relative p-10 border-2 hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl" data-testid={`card-offering-${offering.title.toLowerCase().replace(/\s+/g, '-')}`}>
                    <div className="absolute top-0 right-0 px-4 py-1.5 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-bl-lg">
                      <span className="text-xs font-bold text-blue-600">{offering.highlight}</span>
                    </div>
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center mb-8">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold mb-4">{offering.title}</h3>
                    <p className="text-muted-foreground mb-8 text-lg leading-relaxed">{offering.description}</p>
                    <ul className="space-y-3">
                      {offering.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-3">
                          <Check className="w-5 h-5 text-blue-500 flex-shrink-0" />
                          <span className="text-lg">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-24 md:py-32">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
                <Building2 className="w-5 h-5 text-blue-500" />
                <span className="text-sm font-bold text-blue-600">ENTERPRISE ERP SYSTEMS</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Complete ERP Solutions</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Integrate every aspect of your business with our custom-built ERP platforms
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {erpFeatures.map((feature) => {
                const Icon = feature.icon;
                return (
                  <Card key={feature.title} className="p-8 hover:shadow-xl transition-all">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-6">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground text-lg leading-relaxed">{feature.description}</p>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-24 md:py-32 bg-muted/30">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6">
                <Globe className="w-5 h-5 text-cyan-500" />
                <span className="text-sm font-bold text-cyan-600">WEBSITE SOLUTIONS</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Professional Website Development</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                From corporate sites to complex web applications, we deliver excellence
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {websiteTypes.map((type) => (
                <Card key={type.title} className="p-10 bg-gradient-to-br from-background to-muted/30 border-2 hover:border-cyan-500/50 transition-all">
                  <h3 className="text-3xl font-bold mb-4">{type.title}</h3>
                  <p className="text-muted-foreground mb-8 text-lg leading-relaxed">{type.description}</p>
                  <div className="flex flex-wrap gap-3">
                    {type.benefits.map((benefit) => (
                      <div key={benefit} className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30">
                        <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 md:py-32">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-8">Modern Technology Stack</h2>
                <p className="text-muted-foreground mb-10 text-xl leading-relaxed">
                  We use cutting-edge technologies to build fast, secure, and scalable 
                  web applications that deliver exceptional user experiences.
                </p>
                <div className="grid grid-cols-2 gap-4 mb-10">
                  {techStack.map((tech) => (
                    <div
                      key={tech.name}
                      className={`px-6 py-4 rounded-xl bg-gradient-to-br ${tech.color} text-white font-bold text-center text-lg shadow-lg hover:scale-105 transition-transform`}
                      data-testid={`badge-tech-${tech.name.toLowerCase().replace(/\./g, '')}`}
                    >
                      {tech.name}
                    </div>
                  ))}
                </div>
                <ul className="space-y-4">
                  {[
                    "10x faster development with modern frameworks",
                    "99.9% uptime with robust infrastructure",
                    "SEO-optimized for maximum visibility",
                    "Mobile-first responsive design"
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3" data-testid="item-benefit">
                      <Check className="w-6 h-6 text-blue-500" />
                      <span className="text-lg font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-3xl p-12">
                <Layers className="w-16 h-16 text-blue-500 mb-8" />
                <h3 className="text-3xl font-bold mb-6">Why Choose Our Development Services?</h3>
                <div className="space-y-6">
                  {[
                    {
                      title: "Enterprise-Grade Quality",
                      description: "Every line of code follows industry best practices and security standards."
                    },
                    {
                      title: "Scalable Architecture",
                      description: "Built to handle growth from day one, supporting millions of users."
                    },
                    {
                      title: "Ongoing Support",
                      description: "24/7 monitoring, maintenance, and continuous improvements."
                    },
                    {
                      title: "ROI Focused",
                      description: "Solutions designed to deliver measurable business value and growth."
                    }
                  ].map((item) => (
                    <div key={item.title}>
                      <h4 className="text-xl font-bold mb-2 flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                        {item.title}
                      </h4>
                      <p className="text-muted-foreground text-lg pl-4">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 md:py-40 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/20 to-transparent" />
          <div className="relative max-w-4xl mx-auto px-6 text-center">
            <TrendingUp className="w-20 h-20 text-blue-500 mx-auto mb-8" />
            <h2 className="text-4xl md:text-6xl font-bold mb-8">Ready to Build Something Amazing?</h2>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed">
              Let's create a web solution that drives your business forward with cutting-edge technology.
            </p>
            <Button size="lg" asChild className="px-10 py-7 text-xl" data-testid="button-webdev-cta-contact">
              <a href="#contact">
                <span className="flex items-center gap-3">
                  Start Your Project Today
                  <ArrowRight className="w-6 h-6" />
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
