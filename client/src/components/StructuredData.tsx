import { useEffect } from "react";

interface OrganizationSchema {
  "@context": string;
  "@type": string;
  name: string;
  url: string;
  logo: string;
  description: string;
  address?: {
    "@type": string;
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    addressCountry: string;
  };
  contactPoint?: {
    "@type": string;
    telephone: string;
    contactType: string;
    email: string;
  };
  sameAs?: string[];
}

interface WebsiteSchema {
  "@context": string;
  "@type": string;
  name: string;
  url: string;
  potentialAction: {
    "@type": string;
    target: string;
    "query-input": string;
  };
}

export function OrganizationStructuredData() {
  useEffect(() => {
    const schema: OrganizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "NeoVedic Software",
      url: window.location.origin,
      logo: `${window.location.origin}/logo.png`,
      description: "NeoVedic Software delivers cutting-edge IT solutions including custom web development, mobile apps, DevOps automation, cloud infrastructure, and digital marketing.",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Jagatpura",
        addressLocality: "Jaipur",
        addressRegion: "Rajasthan",
        addressCountry: "IN",
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+91-6378879085",
        contactType: "customer service",
        email: "info@neovedicsoft.com",
      },
      sameAs: [
        "https://linkedin.com/company/neovedic",
        "https://twitter.com/neovedic",
        "https://facebook.com/neovedic",
      ],
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(schema);
    script.id = "organization-schema";
    
    const existing = document.getElementById("organization-schema");
    if (existing) {
      existing.remove();
    }
    
    document.head.appendChild(script);

    return () => {
      const schemaScript = document.getElementById("organization-schema");
      if (schemaScript) {
        schemaScript.remove();
      }
    };
  }, []);

  return null;
}

export function WebsiteStructuredData() {
  useEffect(() => {
    const schema: WebsiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "NeoVedic Software",
      url: window.location.origin,
      potentialAction: {
        "@type": "SearchAction",
        target: `${window.location.origin}/search?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(schema);
    script.id = "website-schema";
    
    const existing = document.getElementById("website-schema");
    if (existing) {
      existing.remove();
    }
    
    document.head.appendChild(script);

    return () => {
      const schemaScript = document.getElementById("website-schema");
      if (schemaScript) {
        schemaScript.remove();
      }
    };
  }, []);

  return null;
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

export function BreadcrumbStructuredData({ items }: { items: BreadcrumbItem[] }) {
  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: item.url,
      })),
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(schema);
    script.id = "breadcrumb-schema";
    
    const existing = document.getElementById("breadcrumb-schema");
    if (existing) {
      existing.remove();
    }
    
    document.head.appendChild(script);

    return () => {
      const schemaScript = document.getElementById("breadcrumb-schema");
      if (schemaScript) {
        schemaScript.remove();
      }
    };
  }, [items]);

  return null;
}

export function ServiceStructuredData({ 
  name, 
  description, 
  provider = "NeoVedic Software",
  areaServed = "Worldwide" 
}: { 
  name: string; 
  description: string;
  provider?: string;
  areaServed?: string;
}) {
  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: name,
      description: description,
      provider: {
        "@type": "Organization",
        name: provider,
      },
      areaServed: areaServed,
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(schema);
    script.id = "service-schema";
    
    const existing = document.getElementById("service-schema");
    if (existing) {
      existing.remove();
    }
    
    document.head.appendChild(script);

    return () => {
      const schemaScript = document.getElementById("service-schema");
      if (schemaScript) {
        schemaScript.remove();
      }
    };
  }, [name, description, provider, areaServed]);

  return null;
}
