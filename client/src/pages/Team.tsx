import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Users, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import teamPhotoPlaceholder from "@assets/image_1760976684657.png";

export default function Team() {
  const teamMembers = [
    {
      name: "Manish Sharma",
      role: "Founder and CEO",
      description: "Visionary leader with extensive experience in driving digital transformation and business growth. Manish brings strategic insight and technical expertise to guide NeoVedic's mission of delivering AI-first solutions.",
      gradient: "from-blue-600 to-cyan-600",
      linkedin: "https://www.linkedin.com/in/manishsharma31/",
      email: "info@neovedicsoft.com",
    },
    {
      name: "Himanshu Bhargava",
      role: "Cofounder and CTO",
      description: "Technology innovator specializing in scalable architectures and cutting-edge development. Himanshu leads our technical strategy, ensuring we deliver robust, future-proof solutions to our clients.",
      gradient: "from-purple-600 to-pink-600",
      linkedin: "https://www.linkedin.com/in/himanshu-bhargava-7a6450190/",
      email: "himanshu.bhargava@neovedicsoft.com",
    },
    {
      name: "Prerak Khunteta",
      role: "Cofounder and CMO",
      description: "Strategic marketing leader with a proven track record in brand development and digital growth. Prerak spearheads our marketing initiatives, helping businesses amplify their digital presence.",
      gradient: "from-emerald-600 to-teal-600",
      linkedin: "https://www.linkedin.com/in/prerakkhunteta/",
      email: "prerak.khunteta@neovedicsoft.com",
    },
  ];

  return (
    <div className="min-h-screen">
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card 
                key={member.name} 
                className="p-8 hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/30 group"
                data-testid={`card-team-member-${index}`}
              >
                <div className="w-24 h-24 rounded-full overflow-hidden mb-6 mx-auto group-hover:scale-110 transition-transform ring-4 ring-primary/20">
                  <img 
                    src={teamPhotoPlaceholder} 
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
                  {member.description}
                </p>
                <div className="flex gap-3 justify-center">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                    data-testid={`button-linkedin-${index}`}
                    asChild
                  >
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                      <Linkedin className="w-5 h-5" />
                    </a>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                    data-testid={`button-email-${index}`}
                    asChild
                  >
                    <a href={`mailto:${member.email}`}>
                      <Mail className="w-5 h-5" />
                    </a>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-muted/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-6 text-center" data-testid="text-values-title">Our Values</h2>
          <p className="text-xl text-muted-foreground text-center mb-12">
            We believe in building a culture of innovation, collaboration, and excellence
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center" data-testid="card-value-innovation">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center mb-4 mx-auto">
                <span className="text-3xl">💡</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Innovation First</h3>
              <p className="text-muted-foreground">
                We constantly push boundaries to deliver cutting-edge solutions
              </p>
            </div>
            
            <div className="text-center" data-testid="card-value-collaboration">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center mb-4 mx-auto">
                <span className="text-3xl">🤝</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Collaboration</h3>
              <p className="text-muted-foreground">
                Together with our clients, we achieve extraordinary results
              </p>
            </div>
            
            <div className="text-center" data-testid="card-value-excellence">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center mb-4 mx-auto">
                <span className="text-3xl">⭐</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Excellence</h3>
              <p className="text-muted-foreground">
                We maintain the highest standards in everything we deliver
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-gradient-to-br from-primary/10 to-purple-500/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 to-transparent" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6" data-testid="text-join-title">Join Our Team</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            We're always looking for talented individuals who share our passion for innovation and excellence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="px-10 py-6 text-lg" data-testid="button-view-openings">
              <a href="/career">View Open Positions</a>
            </Button>
            <Button size="lg" variant="outline" asChild className="px-10 py-6 text-lg" data-testid="button-contact-team">
              <a href="/contact">Get in Touch</a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
