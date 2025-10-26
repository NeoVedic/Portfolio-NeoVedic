import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  canonicalUrl?: string;
  twitterCard?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

export function SEO({
  title,
  description,
  keywords = "software development, web development, DevOps, cloud services, digital marketing, IT solutions, custom software, mobile apps, UI/UX design",
  ogImage = "/og-image.png",
  ogType = "website",
  canonicalUrl,
  twitterCard = "summary_large_image",
  author = "NeoVedic Software",
  publishedTime,
  modifiedTime,
}: SEOProps) {
  useEffect(() => {
    const fullTitle = `${title} | NeoVedic Software`;
    const currentUrl = canonicalUrl || window.location.href;
    const baseUrl = window.location.origin;
    const fullOgImage = ogImage.startsWith("http") ? ogImage : `${baseUrl}${ogImage}`;

    document.title = fullTitle;

    const metaTags = [
      { name: "description", content: description },
      { name: "keywords", content: keywords },
      { name: "author", content: author },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
      { name: "googlebot", content: "index, follow" },
      
      { property: "og:title", content: fullTitle },
      { property: "og:description", content: description },
      { property: "og:type", content: ogType },
      { property: "og:url", content: currentUrl },
      { property: "og:image", content: fullOgImage },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:site_name", content: "NeoVedic Software" },
      { property: "og:locale", content: "en_US" },
      
      { name: "twitter:card", content: twitterCard },
      { name: "twitter:title", content: fullTitle },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: fullOgImage },
      
      { name: "application-name", content: "NeoVedic Software" },
      { name: "apple-mobile-web-app-title", content: "NeoVedic" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-status-bar-style", content: "default" },
    ];

    if (publishedTime) {
      metaTags.push({ property: "article:published_time", content: publishedTime });
    }
    if (modifiedTime) {
      metaTags.push({ property: "article:modified_time", content: modifiedTime });
    }

    metaTags.forEach(({ name, property, content }) => {
      const attribute = name ? "name" : "property";
      const value = name || property;
      let element = document.querySelector(`meta[${attribute}="${value}"]`);
      
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, value!);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    });

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = currentUrl;

  }, [title, description, keywords, ogImage, ogType, canonicalUrl, twitterCard, author, publishedTime, modifiedTime]);

  return null;
}
