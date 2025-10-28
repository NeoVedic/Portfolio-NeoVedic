import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Globe, ArrowRight } from "lucide-react";
import { SEO } from "@/components/SEO";
import { pagesSEO } from "@/lib/seo-config";
import { useQuery } from "@tanstack/react-query";
import type { Service as ServiceType } from "@shared/schema";

function getServiceDetailUrl(title: string): string | null {
  const titleLower = title.toLowerCase();
  if (titleLower.includes('web') || titleLower.includes('development')) {
    return '/services/web-development';
  }
  if (titleLower.includes('devops')) {
    return '/services/devops';
  }
  if (titleLower.includes('cloud')) {
    return '/services/cloud';
  }
  if (titleLower.includes('marketing')) {
    return '/services/marketing';
  }
  return null;
}

export default function Services() {
  const { data: services, isLoading } = useQuery<ServiceType[]>({
    queryKey: ["/api/services"],
  });

  const sortedServices = services
    ? [...services].sort((a, b) => a.order - b.order)
    : [];

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
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                {[...Array(4)].map((_, i) => (
                  <Card key={i} className="p-10 animate-pulse">
                    <div className="space-y-4">
                      <div className="w-12 h-12 bg-muted rounded-xl" />
                      <div className="h-6 bg-muted rounded w-3/4" />
                      <div className="h-4 bg-muted rounded w-full" />
                      <div className="h-4 bg-muted rounded w-full" />
                      <div className="space-y-2">
                        <div className="h-3 bg-muted rounded w-full" />
                        <div className="h-3 bg-muted rounded w-full" />
                        <div className="h-3 bg-muted rounded w-2/3" />
                      </div>
                      <div className="h-10 bg-muted rounded w-full" />
                    </div>
                  </Card>
                ))}
              </div>
            ) : sortedServices.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                {sortedServices.map((service, index) => {
                  const gradients = [
                    "from-blue-600 to-cyan-600",
                    "from-purple-600 to-pink-600",
                    "from-emerald-600 to-teal-600",
                    "from-orange-600 to-red-600",
                  ];
                  const gradient = gradients[index % gradients.length];

                  return (
                    <Card 
                      key={service.id} 
                      className="relative p-10 hover-elevate active-elevate-2 transition-all duration-500 group overflow-hidden border-2 hover:border-primary/30"
                      data-testid={`card-service-${service.id}`}
                    >
                      <div className={`absolute -right-16 -top-16 w-48 h-48 bg-gradient-to-br ${gradient} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity`} />
                      
                      <div className="relative">
                        <div className="mb-6">
                          <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${gradient} shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform`}>
                            <img 
                              src={service.iconUrl} 
                              alt={service.title}
                              className="w-8 h-8"
                              onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none';
                              }}
                            />
                          </div>
                        </div>

                        <h3 className="text-3xl font-bold mb-4 group-hover:text-primary transition-colors" data-testid={`text-service-title-${service.id}`}>
                          {service.title}
                        </h3>

                        <p className="text-muted-foreground leading-relaxed mb-6" data-testid={`text-service-description-${service.id}`}>
                          {service.shortDescription}
                        </p>

                        {service.features && service.features.length > 0 && (
                          <ul className="space-y-3 mb-8">
                            {service.features.slice(0, 4).map((feature, idx) => (
                              <li key={idx} className="flex items-start gap-3 text-sm">
                                <div className={`mt-1 w-1.5 h-1.5 rounded-full bg-gradient-to-br ${gradient} flex-shrink-0`} />
                                <span className="text-muted-foreground leading-relaxed">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        )}

                        {getServiceDetailUrl(service.title) ? (
                          <Button 
                            variant="outline" 
                            className="w-full group/btn hover:bg-primary hover:text-primary-foreground"
                            data-testid={`button-learn-more-${service.id}`}
                            asChild
                          >
                            <a href={getServiceDetailUrl(service.title) || '#'}>
                              Learn More
                              <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                            </a>
                          </Button>
                        ) : (
                          <Button 
                            variant="outline" 
                            className="w-full group/btn hover:bg-primary hover:text-primary-foreground"
                            data-testid={`button-learn-more-${service.id}`}
                            asChild
                          >
                            <a href="/contact">
                              Contact Us
                              <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                            </a>
                          </Button>
                        )}
                      </div>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-20">
                <Globe className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">No Services Available</h3>
                <p className="text-muted-foreground">
                  Check back soon for our service offerings!
                </p>
              </div>
            )}
          </div>
        </section>

        <section className="py-24 md:py-32 bg-gradient-to-br from-primary/10 to-purple-500/10">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Let's Build Something Great Together
            </h2>
            <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
              Ready to transform your business with cutting-edge technology? Contact us today for a free consultation.
            </p>
            <Button size="lg" asChild className="px-10 py-6 text-lg">
              <a href="/contact">
                Get Started
                <ArrowRight className="w-5 h-5 ml-2" />
              </a>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
