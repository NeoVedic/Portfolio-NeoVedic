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
  Briefcase,
} from "lucide-react";
import { SEO } from "@/components/SEO";
import { pagesSEO } from "@/lib/seo-config";
import { useQuery } from "@tanstack/react-query";
import type { Portfolio as PortfolioType } from "@shared/schema";

export default function Portfolio() {
  const { data: projects, isLoading } = useQuery<PortfolioType[]>({
    queryKey: ["/api/portfolio"],
  });

  const categories = ["All"];
  if (projects) {
    const uniqueCategories = [...new Set(projects.map(p => p.category))];
    categories.push(...uniqueCategories);
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title={pagesSEO.portfolio.title}
        description={pagesSEO.portfolio.description}
        keywords={pagesSEO.portfolio.keywords}
      />
      <Navigation />

      <main className="flex-1">
        <section className="pt-32 pb-20 md:pt-40 md:pb-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />

          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-blue-500 to-purple-600 rounded-full blur-3xl animate-pulse" />
            <div
              className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-purple-500 to-pink-600 rounded-full blur-3xl animate-pulse"
              style={{ animationDelay: "1.5s" }}
            />
          </div>

          <div className="relative max-w-7xl mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary/10 via-purple-500/10 to-pink-500/10 border border-primary/30 mb-8 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Our Portfolio
              </span>
            </div>

            <h1
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-[1.1]"
              data-testid="text-portfolio-heading"
            >
              <span className="bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent">
                Transforming Ideas Into
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Digital Excellence
              </span>
            </h1>

            <p
              className="text-lg md:text-2xl text-muted-foreground max-w-4xl mx-auto mb-12 leading-relaxed"
              data-testid="text-portfolio-description"
            >
              Explore our portfolio of successful projects spanning multiple
              industries. Each solution is crafted with precision, innovation,
              and a commitment to excellence.
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

        <section className="py-20 bg-muted/20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-4">
                <Rocket className="w-8 h-8 text-primary" />
                <h2
                  className="text-3xl md:text-4xl font-bold"
                  data-testid="text-featured-heading"
                >
                  Our Projects
                </h2>
              </div>
              <p className="text-lg text-muted-foreground max-w-3xl">
                Innovative solutions that have delivered
                exceptional results for our clients
              </p>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {[...Array(4)].map((_, i) => (
                  <Card key={i} className="overflow-hidden animate-pulse">
                    <div className="h-64 bg-muted" />
                    <div className="p-8 space-y-4">
                      <div className="h-6 bg-muted rounded w-3/4" />
                      <div className="h-4 bg-muted rounded w-full" />
                      <div className="h-4 bg-muted rounded w-full" />
                      <div className="h-10 bg-muted rounded" />
                    </div>
                  </Card>
                ))}
              </div>
            ) : projects && projects.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {projects.map((project) => (
                  <Card
                    key={project.id}
                    className="overflow-hidden hover:shadow-2xl transition-all duration-500 border-2 hover:border-primary/30 group"
                    data-testid={`card-project-${project.id}`}
                  >
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
                      <div
                        className="absolute top-4 right-4 w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg"
                      >
                        <Briefcase className="w-6 h-6 text-white" />
                      </div>
                      <Badge
                        className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm"
                        data-testid={`badge-category-${project.category.toLowerCase()}-${project.id}`}
                      >
                        {project.category}
                      </Badge>
                    </div>

                    <div className="p-8">
                      <h3
                        className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors"
                        data-testid={`text-project-title-${project.id}`}
                      >
                        {project.title}
                      </h3>
                      <p
                        className="text-muted-foreground mb-6 leading-relaxed"
                        data-testid={`text-project-description-${project.id}`}
                      >
                        {project.description}
                      </p>

                      {project.technologies && project.technologies.length > 0 && (
                        <div className="mb-6">
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {project.projectUrl && (
                        <Button
                          asChild
                          className="w-full"
                          data-testid={`button-view-live-${project.id}`}
                        >
                          <a
                            href={project.projectUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Globe className="w-4 h-4 mr-2" />
                            View Live Project
                            <ExternalLink className="w-4 h-4 ml-2" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <Briefcase className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">No Projects Yet</h3>
                <p className="text-muted-foreground">
                  Check back soon for our latest work!
                </p>
              </div>
            )}
          </div>
        </section>

        <section className="py-24 md:py-32 bg-gradient-to-br from-primary/10 to-purple-500/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 to-transparent" />
          <div className="relative max-w-4xl mx-auto px-6 text-center">
            <h2
              className="text-4xl md:text-5xl font-bold mb-6"
              data-testid="text-cta-heading"
            >
              Ready to Build Something Amazing?
            </h2>
            <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
              Let's collaborate on your next project and create solutions that
              drive real business impact.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                asChild
                className="px-10 py-6 text-lg"
                data-testid="button-start-project"
              >
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
