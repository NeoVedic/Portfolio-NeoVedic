import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { ServicesSection } from "@/components/ServicesSection";
import { AboutSection } from "@/components/AboutSection";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Briefcase, Star, Quote, Building2, Rocket, Globe, Zap, Cloud, Cpu } from "lucide-react";
import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CTO, TechCorp Inc.",
      content: "NeoVedic transformed our legacy systems into a modern, scalable platform. Their expertise in cloud migration and AI integration was invaluable. The team delivered beyond our expectations.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Founder, StartupHub",
      content: "Working with NeoVedic was a game-changer for our business. They built our MVP in record time and helped us scale to handle millions of users. Highly recommend their services!",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      role: "Director of IT, Global Solutions",
      content: "The team at NeoVedic is professional, responsive, and highly skilled. They helped us implement automation that saved countless hours and significantly reduced operational costs.",
      rating: 5,
    },
  ];

  const clients = [
    { name: "TechCorp Inc.", icon: Building2, gradient: "from-blue-600 to-cyan-600" },
    { name: "StartupHub", icon: Rocket, gradient: "from-purple-600 to-pink-600" },
    { name: "Global Solutions", icon: Globe, gradient: "from-emerald-600 to-teal-600" },
    { name: "InnovateTech", icon: Zap, gradient: "from-orange-600 to-red-600" },
    { name: "Digital Dynamics", icon: Cpu, gradient: "from-indigo-600 to-purple-600" },
    { name: "CloudFirst Systems", icon: Cloud, gradient: "from-sky-600 to-blue-600" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % clients.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused, clients.length]);

  const getVisibleClients = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % clients.length;
      visible.push({ ...clients[index], slideIndex: index });
    }
    return visible;
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      
      <section className="py-20 md:py-32 bg-gradient-to-br from-primary/5 to-purple-500/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6" data-testid="text-clients-title">
              Trusted by Leading Companies
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Join hundreds of satisfied clients who have transformed their businesses with our solutions
            </p>
          </div>

          <div 
            className="relative overflow-hidden mb-20"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="flex justify-center gap-8 max-w-4xl mx-auto">
              <AnimatePresence mode="popLayout">
                {getVisibleClients().map((client, idx) => {
                  const Icon = client.icon;
                  return (
                    <motion.div
                      key={`${client.name}-${client.slideIndex}`}
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.5 }}
                      className="flex-1"
                    >
                      <Card 
                        className="p-6 hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/30 group cursor-pointer min-h-[140px] flex flex-col items-center justify-center"
                        data-testid={`card-client-${idx}`}
                      >
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${client.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        <p className="text-base font-bold text-center group-hover:text-primary transition-colors">{client.name}</p>
                      </Card>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
            <div className="flex justify-center gap-2 mt-6">
              {clients.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex 
                      ? 'bg-primary w-8' 
                      : 'bg-primary/30 hover:bg-primary/50'
                  }`}
                  data-testid={`indicator-${index}`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-center mb-4" data-testid="text-testimonials-title">
              What Our Clients Say
            </h3>
            <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto">
              Don't just take our word for it - hear from the businesses we've helped succeed
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={index} 
                className="p-8 hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/30 relative"
                data-testid={`card-testimonial-${index}`}
              >
                <div className="absolute top-6 right-6 text-primary/20">
                  <Quote className="w-12 h-12" />
                </div>
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" data-testid={`star-${index}-${i}`} />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed" data-testid={`text-testimonial-content-${index}`}>
                  "{testimonial.content}"
                </p>
                <div className="border-t pt-4">
                  <p className="font-bold" data-testid={`text-testimonial-name-${index}`}>{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground" data-testid={`text-testimonial-role-${index}`}>{testimonial.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-24 md:py-32 bg-muted/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Explore More</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover how NeoVedic Software can help accelerate your business growth
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {quickLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link key={link.href} href={link.href}>
                  <Card className="p-8 h-full hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/30 cursor-pointer group">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${link.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">{link.title}</h3>
                    <p className="text-muted-foreground text-lg leading-relaxed mb-6">{link.description}</p>
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
          <h2 className="text-4xl md:text-6xl font-bold mb-8">Ready to Transform Your Business?</h2>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed">
            Let's discuss how our enterprise solutions can drive your digital transformation and accelerate growth.
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
            <Button size="lg" variant="outline" asChild className="px-10 py-6 text-lg">
              <Link href="/services">View All Services</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
