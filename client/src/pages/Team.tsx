import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Users, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import { pagesSEO } from "@/lib/seo-config";
import { useQuery } from "@tanstack/react-query";
import type { TeamMember as TeamMemberType } from "@shared/schema";

export default function Team() {
  const { data: teamMembers, isLoading } = useQuery<TeamMemberType[]>({
    queryKey: ["/api/team"],
  });

  const sortedTeamMembers = teamMembers
    ? [...teamMembers].sort((a, b) => a.order - b.order)
    : [];

  return (
    <div className="min-h-screen">
      <SEO
        title={pagesSEO.team.title}
        description={pagesSEO.team.description}
        keywords={pagesSEO.team.keywords}
      />
      <Navigation />
      
      <section className="pt-32 pb-20 px-6 bg-gradient-to-br from-primary/10 to-purple-500/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 to-transparent" />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 bg-background/80 backdrop-blur-sm px-6 py-3 rounded-full mb-8 border border-border">
            <Users className="w-5 h-5 text-primary" />
            <span className="font-semibold text-sm" data-testid="text-team-badge">Our Leadership Team</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6" data-testid="text-team-title">
            Meet the Minds Behind NeoVedic
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-team-description">
            Our experienced leadership team brings together decades of expertise in technology, innovation, and business strategy to deliver exceptional results.
          </p>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <Card key={i} className="p-8 animate-pulse">
                  <div className="w-24 h-24 rounded-full bg-muted mb-6 mx-auto" />
                  <div className="space-y-4">
                    <div className="h-6 bg-muted rounded w-3/4 mx-auto" />
                    <div className="h-4 bg-muted rounded w-1/2 mx-auto" />
                    <div className="h-4 bg-muted rounded w-full" />
                    <div className="h-4 bg-muted rounded w-full" />
                    <div className="flex gap-3 justify-center">
                      <div className="w-10 h-10 bg-muted rounded-full" />
                      <div className="w-10 h-10 bg-muted rounded-full" />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : sortedTeamMembers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {sortedTeamMembers.map((member, index) => (
                <Card 
                  key={member.id} 
                  className="p-8 hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/30 group"
                  data-testid={`card-team-member-${index}`}
                >
                  <div className="w-24 h-24 rounded-full overflow-hidden mb-6 mx-auto group-hover:scale-110 transition-transform ring-4 ring-primary/20">
                    <img 
                      src={member.photoUrl} 
                      alt={member.name}
                      className="w-full h-full object-cover"
                      data-testid={`img-team-photo-${index}`}
                    />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-center" data-testid={`text-name-${index}`}>
                    {member.name}
                  </h3>
                  <p className="text-primary font-semibold text-center mb-4" data-testid={`text-role-${index}`}>
                    {member.role}
                  </p>
                  <p className="text-muted-foreground text-center leading-relaxed mb-6" data-testid={`text-description-${index}`}>
                    {member.bio}
                  </p>
                  <div className="flex gap-3 justify-center">
                    {member.linkedinUrl && (
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                        data-testid={`button-linkedin-${index}`}
                        asChild
                      >
                        <a href={member.linkedinUrl} target="_blank" rel="noopener noreferrer">
                          <Linkedin className="w-5 h-5" />
                        </a>
                      </Button>
                    )}
                    {member.twitterUrl && (
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                        data-testid={`button-twitter-${index}`}
                        asChild
                      >
                        <a href={member.twitterUrl} target="_blank" rel="noopener noreferrer">
                          <Mail className="w-5 h-5" />
                        </a>
                      </Button>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">No Team Members Yet</h3>
              <p className="text-muted-foreground">
                Check back soon to meet our team!
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
