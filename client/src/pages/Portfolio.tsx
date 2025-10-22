import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ExternalLink, 
  Globe, 
  Sparkles,
  Rocket,
  TrendingUp,
  ShoppingCart,
  Hospital,
  GraduationCap,
  DollarSign,
  Building2
} from "lucide-react";

export default function Portfolio() {
  const projects = [
    {
      id: 1,
      title: "Enterprise E-Commerce Platform",
      description: "A scalable e-commerce solution with real-time inventory management, AI-powered recommendations, and integrated payment processing. Built for high-traffic retail operations.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
      category: "E-Commerce",
      client: {
        name: "RetailCo International",
        industry: "Retail & Fashion",
        location: "New York, USA"
      },
      icon: ShoppingCart,
      gradient: "from-blue-600 to-cyan-600",
      liveUrl: "https://demo-ecommerce.example.com",
      featured: true
    },
    {
      id: 2,
      title: "Healthcare Management System",
      description: "HIPAA-compliant healthcare platform with patient portal, appointment scheduling, electronic health records, and telemedicine integration.",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=500&fit=crop",
      category: "Healthcare",
      client: {
        name: "MediCare Plus",
        industry: "Healthcare Services",
        location: "California, USA"
      },
      icon: Hospital,
      gradient: "from-emerald-600 to-teal-600",
      liveUrl: "https://demo-healthcare.example.com",
      featured: true
    },
    {
      id: 3,
      title: "AI-Powered Learning Platform",
      description: "Adaptive learning platform with personalized course recommendations, progress tracking, live classes, and certification management using machine learning.",
      image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=500&fit=crop",
      category: "Education",
      client: {
        name: "EduTech Global",
        industry: "Education Technology",
        location: "London, UK"
      },
      icon: GraduationCap,
      gradient: "from-purple-600 to-pink-600",
      liveUrl: "https://demo-learning.example.com",
      featured: true
    },
    {
      id: 4,
      title: "FinTech Analytics Dashboard",
      description: "Real-time financial analytics platform with portfolio tracking, market insights, automated trading signals, and comprehensive risk management tools.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop",
      category: "Finance",
      client: {
        name: "InvestPro Capital",
        industry: "Financial Services",
        location: "Singapore"
      },
      icon: DollarSign,
      gradient: "from-orange-600 to-red-600",
      liveUrl: "https://demo-fintech.example.com",
      featured: false
    },
    {
      id: 5,
      title: "Smart IoT Fleet Management",
      description: "IoT-based fleet tracking system with GPS monitoring, predictive maintenance, fuel optimization, and driver behavior analytics.",
      image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&h=500&fit=crop",
      category: "IoT",
      client: {
        name: "LogiTrans Solutions",
        industry: "Logistics & Transport",
        location: "Dubai, UAE"
      },
      icon: TrendingUp,
      gradient: "from-indigo-600 to-purple-600",
      liveUrl: "https://demo-fleet.example.com",
      featured: false
    },
    {
      id: 6,
      title: "Social Media Analytics Suite",
      description: "Comprehensive social media management platform with sentiment analysis, influencer tracking, campaign management, and ROI analytics.",
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=500&fit=crop",
      category: "Marketing",
      client: {
        name: "BrandBoost Agency",
        industry: "Digital Marketing",
        location: "Toronto, Canada"
      },
      icon: TrendingUp,
      gradient: "from-pink-600 to-rose-600",
      liveUrl: "https://demo-social.example.com",
      featured: false
    }
  ];

  const categories = ["All", "E-Commerce", "Healthcare", "Education", "Finance", "IoT", "Marketing"];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-32 pb-20 md:pt-40 md:pb-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
          
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-blue-500 to-purple-600 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-purple-500 to-pink-600 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1.5s" }} />
          </div>

          <div className="relative max-w-7xl mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary/10 via-purple-500/10 to-pink-500/10 border border-primary/30 mb-8 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Our Portfolio
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-[1.1]" data-testid="text-portfolio-heading">
              <span className="bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent">
                Transforming Ideas Into
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Digital Excellence
              </span>
            </h1>

            <p className="text-lg md:text-2xl text-muted-foreground max-w-4xl mx-auto mb-12 leading-relaxed" data-testid="text-portfolio-description">
              Explore our portfolio of successful projects spanning multiple industries. 
              Each solution is crafted with precision, innovation, and a commitment to excellence.
            </p>

            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {categories.map((category) => (
                <Badge 
                  key={category} 
                  variant="outline" 
                  className="px-5 py-2.5 text-sm font-medium hover:bg-primary hover:text-primary-foreground cursor-pointer transition-all"
                  data-testid={`badge-category-${category.toLowerCase()}`}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Projects */}
        <section className="py-20 bg-muted/20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-4">
                <Rocket className="w-8 h-8 text-primary" />
                <h2 className="text-3xl md:text-4xl font-bold" data-testid="text-featured-heading">
                  Featured Projects
                </h2>
              </div>
              <p className="text-lg text-muted-foreground max-w-3xl">
                Our most impactful and innovative solutions that have delivered exceptional results for our clients
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
              {projects.filter(p => p.featured).map((project) => {
                const Icon = project.icon;
                return (
                  <Card 
                    key={project.id} 
                    className="overflow-hidden hover:shadow-2xl transition-all duration-500 border-2 hover:border-primary/30 group"
                    data-testid={`card-project-${project.id}`}
                  >
                    <div className="relative h-64 overflow-hidden">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
                      <div className={`absolute top-4 right-4 w-12 h-12 rounded-xl bg-gradient-to-br ${project.gradient} flex items-center justify-center shadow-lg`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <Badge className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm" data-testid={`badge-category-${project.category.toLowerCase()}-${project.id}`}>
                        {project.category}
                      </Badge>
                    </div>

                    <div className="p-8">
                      <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors" data-testid={`text-project-title-${project.id}`}>
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground mb-6 leading-relaxed" data-testid={`text-project-description-${project.id}`}>
                        {project.description}
                      </p>

                      {/* Client Information */}
                      <div className="mb-6 p-5 rounded-lg bg-muted/50 border border-border/50">
                        <div className="flex items-center gap-2 mb-3">
                          <Building2 className="w-4 h-4 text-primary" />
                          <span className="font-semibold text-sm text-muted-foreground">Client Information</span>
                        </div>
                        <div className="space-y-2">
                          <div>
                            <span className="text-sm font-semibold" data-testid={`text-client-name-${project.id}`}>{project.client.name}</span>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {project.client.industry} • {project.client.location}
                          </div>
                        </div>
                      </div>

                      <Button 
                        asChild 
                        className="w-full"
                        data-testid={`button-view-live-${project.id}`}
                      >
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          <Globe className="w-4 h-4 mr-2" />
                          View Live Project
                          <ExternalLink className="w-4 h-4 ml-2" />
                        </a>
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 md:py-32 bg-gradient-to-br from-primary/10 to-purple-500/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 to-transparent" />
          <div className="relative max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6" data-testid="text-cta-heading">
              Ready to Build Something Amazing?
            </h2>
            <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
              Let's collaborate on your next project and create solutions that drive real business impact.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="px-10 py-6 text-lg" data-testid="button-start-project">
                <a href="/contact">
                  Start Your Project
                  <ExternalLink className="w-5 h-5 ml-2" />
                </a>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                asChild 
                className="px-10 py-6 text-lg"
                data-testid="button-view-services"
              >
                <a href="/services">View Our Services</a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
