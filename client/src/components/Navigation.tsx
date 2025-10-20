import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import logoImage from "@assets/Logo_1760975857851.png";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsServicesOpen(false);
  }, [location]);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/team", label: "Team" },
    { href: "/blog", label: "Blog" },
    { href: "/career", label: "Career" },
    { href: "/faq", label: "FAQ" },
  ];

  const serviceLinks = [
    { href: "/services/web-development", label: "Web Development", description: "Websites & ERP Systems" },
    { href: "/services/devops", label: "DevOps", description: "Automation & CI/CD" },
    { href: "/services/cloud", label: "Cloud Infrastructure", description: "AWS, Azure & GCP" },
    { href: "/services/marketing", label: "Digital Marketing", description: "SEO & Growth" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-xl border-b border-border shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <Link href="/" data-testid="link-home">
            <div className="flex items-center gap-3 hover:opacity-90 transition-opacity rounded-md px-3 py-2 -ml-3">
              <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center shadow-lg p-1">
                <img 
                  src={logoImage} 
                  alt="NeoVedic Logo" 
                  className="w-full h-full object-contain"
                  data-testid="img-logo"
                />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                NeoVedic
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                data-testid={`link-nav-${link.label.toLowerCase().replace(/\s/g, "-")}`}
              >
                <span className="text-base font-semibold text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                  {link.label}
                </span>
              </Link>
            ))}
            
            <div 
              className="relative"
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <button 
                className="flex items-center gap-1 text-base font-semibold text-muted-foreground hover:text-foreground transition-colors"
                data-testid="button-services-dropdown"
              >
                Services
                <ChevronDown className={`w-4 h-4 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isServicesOpen && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-background/95 backdrop-blur-xl border border-border rounded-xl shadow-2xl p-3">
                  <Link href="/services">
                    <div 
                      className="px-4 py-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer group mb-2 border-b border-border pb-3"
                      data-testid="link-dropdown-all-services"
                    >
                      <div className="font-bold text-foreground group-hover:text-primary transition-colors">
                        View All Services
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Explore our complete service offerings
                      </div>
                    </div>
                  </Link>
                  {serviceLinks.map((link) => (
                    <Link key={link.href} href={link.href}>
                      <div 
                        className="px-4 py-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer group"
                        data-testid={`link-dropdown-${link.label.toLowerCase().replace(/\s/g, "-")}`}
                      >
                        <div className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          {link.label}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {link.description}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <Button size="lg" asChild className="font-semibold" data-testid="button-contact">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 hover:bg-muted/50 rounded-lg transition-colors"
            data-testid="button-mobile-menu-toggle"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-background/98 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                data-testid={`link-mobile-${link.label.toLowerCase().replace(/\s/g, "-")}`}
              >
                <span className="text-base font-semibold text-muted-foreground hover:text-foreground transition-colors py-2 block">
                  {link.label}
                </span>
              </Link>
            ))}
            <div className="pt-4 border-t border-border">
              <Link href="/services">
                <p className="text-sm font-bold text-foreground mb-3">Services</p>
              </Link>
              {serviceLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  data-testid={`link-mobile-service-${link.label.toLowerCase().replace(/\s/g, "-")}`}
                >
                  <div className="py-3 px-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="font-semibold text-foreground">{link.label}</div>
                    <div className="text-sm text-muted-foreground">{link.description}</div>
                  </div>
                </Link>
              ))}
            </div>
            <Button size="lg" className="w-full mt-2 font-semibold" asChild data-testid="button-mobile-contact">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
