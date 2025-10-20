import { Link } from "wouter";
import { Linkedin, Mail, Instagram } from "lucide-react";

export function Footer() {
  const footerSections = [
    {
      title: "Company",
      links: [
        { label: "About Us", href: "#about" },
        { label: "Portfolio", href: "/portfolio" },
        { label: "Team", href: "/team" },
        { label: "Career", href: "/career" },
      ],
    },
    {
      title: "Services",
      links: [
        { label: "Web Development", href: "/services/web-development" },
        { label: "DevOps", href: "/services/devops" },
        { label: "Cloud Infrastructure", href: "/services/cloud" },
        { label: "Digital Marketing", href: "/services/marketing" },
      ],
    },
    {
      title: "Support",
      links: [
        { label: "Contact Us", href: "/contact" },
        { label: "FAQ", href: "/faq" },
        { label: "Privacy Policy", href: "#" },
        { label: "Terms of Service", href: "#" },
      ],
    },
  ];

  const socialLinks = [
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/company/neovedic-software",
      label: "LinkedIn",
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/neovedicsoft/",
      label: "Instagram",
    },
    { icon: Mail, href: "mailto:info@neovedicsoft.com", label: "Email" },
  ];

  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
          <div className="lg:col-span-2">
            <Link href="/" data-testid="link-footer-logo">
              <div className="flex items-center gap-3 mb-4 hover-elevate active-elevate-2 rounded-md -ml-3 pl-3 py-2 inline-flex">
                <div className="w-10 h-10 rounded-md bg-gradient-to-br from-primary to-chart-2 flex items-center justify-center">
                  <span className="text-xl font-bold text-primary-foreground">
                    N
                  </span>
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-primary via-chart-2 to-chart-3 bg-clip-text text-transparent">
                  NeoVedic Software
                </span>
              </div>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Transforming businesses through innovative IT solutions. Your
              trusted partner for Web Development, DevOps, Cloud, and Marketing
              excellence.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-md bg-muted hover-elevate active-elevate-2 flex items-center justify-center transition-all"
                    data-testid={`link-social-${social.label.toLowerCase()}`}
                  >
                    <Icon className="w-5 h-5 text-muted-foreground" />
                  </a>
                );
              })}
            </div>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith("#") ? (
                      <a
                        href={link.href}
                        className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                        data-testid={`link-footer-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        data-testid={`link-footer-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                      >
                        <span className="text-muted-foreground hover:text-foreground transition-colors text-sm cursor-pointer">
                          {link.label}
                        </span>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} NeoVedic Software. All rights
            reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              data-testid="link-footer-privacy"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              data-testid="link-footer-terms"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
