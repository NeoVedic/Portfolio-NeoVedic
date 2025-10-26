import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code2, Server, Palette, BarChart3, Cloud, Database, ArrowRight, Check, Users } from "lucide-react";
import { Link } from "wouter";
import { SEO } from "@/components/SEO";
import { pagesSEO } from "@/lib/seo-config";

export default function HireResources() {
  const expertise = [
    {
      icon: Code2,
      title: "Full Stack Developers",
      description: "Expert developers proficient in React, Node.js, Python, and modern web technologies.",
      skills: ["React & Next.js", "Node.js & Express", "Python & Django", "TypeScript"],
      gradient: "from-blue-600 to-cyan-600",
    },
    {
      icon: Server,
      title: "DevOps Engineers",
      description: "Infrastructure experts skilled in CI/CD, containerization, and cloud automation.",
      skills: ["Kubernetes & Docker", "Jenkins & GitLab CI", "Terraform & Ansible", "AWS & Azure"],
      gradient: "from-purple-600 to-pink-600",
    },
    {
      icon: Cloud,
      title: "Cloud Architects",
      description: "Senior architects designing scalable, secure cloud infrastructure solutions.",
      skills: ["AWS Solutions", "Azure Architecture", "Google Cloud Platform", "Multi-Cloud Strategy"],
      gradient: "from-emerald-600 to-teal-600",
    },
    {
      icon: Palette,
      title: "UI/UX Designers",
      description: "Creative designers crafting beautiful, intuitive user experiences.",
      skills: ["Figma & Adobe XD", "User Research", "Responsive Design", "Design Systems"],
      gradient: "from-pink-600 to-rose-600",
    },
    {
      icon: BarChart3,
      title: "Data Engineers",
      description: "Data experts building robust pipelines and analytics solutions.",
      skills: ["Big Data Processing", "ETL Pipelines", "Data Warehousing", "Analytics"],
      gradient: "from-indigo-600 to-violet-600",
    },
    {
      icon: Database,
      title: "Database Specialists",
      description: "Database professionals optimizing performance and ensuring data integrity.",
      skills: ["PostgreSQL & MySQL", "MongoDB", "Redis", "Database Optimization"],
      gradient: "from-orange-600 to-amber-600",
    },
  ];

  const benefits = [
    "Pre-vetted, highly skilled professionals",
    "Flexible engagement models (hourly, part-time, full-time)",
    "Seamless integration with your existing team",
    "Dedicated project manager for coordination",
    "No long-term contracts required",
    "Start within 48 hours of approval",
  ];

  const engagementModels = [
    {
      title: "Dedicated Resources",
      description: "Full-time dedicated professionals working exclusively on your project.",
      bestFor: "Long-term projects requiring consistent effort",
    },
    {
      title: "Project-Based Teams",
      description: "Complete teams assembled for specific project requirements.",
      bestFor: "Fixed-scope projects with defined timelines",
    },
    {
      title: "Staff Augmentation",
      description: "Scale your team quickly with experts in specific technologies.",
      bestFor: "Filling skill gaps or scaling during peak periods",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title={pagesSEO.hireResources.title}
        description={pagesSEO.hireResources.description}
        keywords={pagesSEO.hireResources.keywords}
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
              <Users className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Hire Top Talent
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-[1.1]">
              <span className="bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent">
                Scale Your Team With
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Expert Resources
              </span>
            </h1>

            <p className="text-lg md:text-2xl text-muted-foreground max-w-4xl mx-auto mb-12 leading-relaxed">
              Access pre-vetted developers, designers, and engineers on-demand. 
              Scale your team quickly with top-tier professionals who deliver results.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
              <Button size="lg" asChild className="px-8 py-6 text-lg">
                <Link href="/contact">
                  <span className="flex items-center gap-2">
                    Hire Resources Now
                    <ArrowRight className="w-5 h-5" />
                  </span>
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="px-8 py-6 text-lg">
                <Link href="/services">View Our Services</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-24 md:py-32 bg-muted/20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Available Expertise</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Hire specialists across all major technologies and domains.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {expertise.map((expert) => {
                const Icon = expert.icon;
                return (
                  <Card key={expert.title} className="p-8 hover:shadow-xl transition-all border-2 hover:border-primary/30">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${expert.gradient} flex items-center justify-center mb-6`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{expert.title}</h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">{expert.description}</p>
                    <ul className="space-y-2">
                      {expert.skills.map((skill) => (
                        <li key={skill} className="flex items-center gap-2 text-sm">
                          <Check className="w-4 h-4 text-primary" />
                          <span>{skill}</span>
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
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Engagement Models</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Flexible hiring options tailored to your project needs.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {engagementModels.map((model) => (
                <Card key={model.title} className="p-10 text-center hover:shadow-xl transition-all">
                  <h3 className="text-2xl font-bold mb-4">{model.title}</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">{model.description}</p>
                  <div className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                    <span className="text-sm font-semibold text-primary">{model.bestFor}</span>
                  </div>
                </Card>
              ))}
            </div>

            <Card className="p-12 bg-gradient-to-br from-primary/10 to-purple-500/10">
              <h3 className="text-3xl font-bold mb-8 text-center">Why Hire Through NeoVedic?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-lg font-medium">{benefit}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </section>

        <section className="py-24 md:py-40 bg-gradient-to-br from-primary/10 to-purple-500/10">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-8">Ready to Build Your Team?</h2>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed">
              Get started today and have expert resources working on your project within 48 hours.
            </p>
            <Button size="lg" asChild className="px-10 py-6 text-lg">
              <Link href="/contact">
                <span className="flex items-center gap-2">
                  Contact Us Now
                  <ArrowRight className="w-5 h-5" />
                </span>
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
