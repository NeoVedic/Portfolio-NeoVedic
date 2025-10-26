import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, Search, Share2, BarChart3, ArrowRight, Check } from "lucide-react";
import { Link } from "wouter";
import { SEO } from "@/components/SEO";
import { pagesSEO } from "@/lib/seo-config";

export default function Marketing() {
  const offerings = [
    {
      icon: Search,
      title: "SEO Optimization",
      description: "Dominate search rankings with comprehensive SEO strategies that drive organic traffic.",
      features: ["Keyword Research", "On-Page SEO", "Technical SEO", "Link Building"],
    },
    {
      icon: Share2,
      title: "Social Media Marketing",
      description: "Build your brand presence across all major social platforms with engaging content.",
      features: ["Content Creation", "Community Management", "Paid Campaigns", "Influencer Outreach"],
    },
    {
      icon: BarChart3,
      title: "Analytics & Insights",
      description: "Data-driven decisions with comprehensive tracking and performance analysis.",
      features: ["Google Analytics", "Conversion Tracking", "A/B Testing", "ROI Measurement"],
    },
    {
      icon: TrendingUp,
      title: "Growth Marketing",
      description: "Accelerate growth with proven strategies and conversion rate optimization.",
      features: ["Funnel Optimization", "Email Marketing", "Retargeting", "Growth Hacking"],
    },
  ];

  const channels = [
    { name: "Google Ads", color: "from-blue-500 to-green-500" },
    { name: "Facebook Ads", color: "from-blue-600 to-indigo-600" },
    { name: "LinkedIn", color: "from-blue-700 to-blue-900" },
    { name: "Instagram", color: "from-pink-500 to-purple-600" },
    { name: "Twitter/X", color: "from-gray-700 to-black" },
    { name: "TikTok", color: "from-gray-800 to-pink-500" },
  ];

  const benefits = [
    "3x increase in organic traffic within 6 months",
    "ROI-focused campaigns with measurable results",
    "Brand awareness across all major platforms",
    "Conversion rate optimization for maximum impact",
    "Detailed analytics and monthly reporting",
    "Dedicated marketing strategist for your account",
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title={pagesSEO.marketing.title}
        description={pagesSEO.marketing.description}
        keywords={pagesSEO.marketing.keywords}
      />
      <Navigation />
      
      <main className="flex-1">
        <section className="pt-32 pb-20 md:pt-40 md:pb-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-background to-red-500/10" />
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl" />
          
          <div className="relative max-w-7xl mx-auto px-6">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 mb-6">
                <TrendingUp className="w-4 h-4 text-orange-500" />
                <span className="text-sm font-medium text-orange-600 dark:text-orange-400">Digital Marketing</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
                Drive Growth With <br />
                <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                  Data-Driven Marketing
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl">
                Transform your digital presence with strategic marketing campaigns that deliver 
                measurable results. From SEO to social media, we've got you covered.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild data-testid="button-marketing-get-started">
                  <a href="#contact">
                    <span className="flex items-center gap-2">
                      Get Started
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild data-testid="button-marketing-case-studies">
                  <a href="/#services">Case Studies</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-32 bg-muted/30">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Marketing Services</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {offerings.map((offering) => {
                const Icon = offering.icon;
                return (
                  <Card key={offering.title} className="p-8" data-testid={`card-offering-${offering.title.toLowerCase().replace(/\s+/g, '-')}`}>
                    <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center mb-6">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-2xl font-semibold mb-3">{offering.title}</h3>
                    <p className="text-muted-foreground mb-6">{offering.description}</p>
                    <ul className="space-y-2">
                      {offering.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm">
                          <Check className="w-4 h-4 text-orange-500" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-20 md:py-32">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Marketing Channels</h2>
                <p className="text-muted-foreground mb-8">
                  Multi-channel expertise to reach your audience wherever they are. 
                  We create cohesive campaigns across all platforms.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {channels.map((channel) => (
                    <div
                      key={channel.name}
                      className={`px-4 py-3 rounded-lg bg-gradient-to-br ${channel.color} text-white font-medium text-center`}
                      data-testid={`badge-channel-${channel.name.toLowerCase().replace(/\//g, '').replace(/\s/g, '')}`}
                    >
                      {channel.name}
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold mb-6">Results You Can Expect</h3>
                <div className="space-y-4">
                  {benefits.map((benefit) => (
                    <div key={benefit} className="flex items-start gap-3" data-testid="item-benefit">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                      <p className="text-muted-foreground">{benefit}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-32 bg-gradient-to-br from-orange-500/10 to-red-500/10">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Grow Your Brand?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Let's create a marketing strategy that drives real business results.
            </p>
            <Button size="lg" asChild data-testid="button-marketing-cta-contact">
              <a href="#contact">
                <span className="flex items-center gap-2">
                  Start Growing Today
                  <ArrowRight className="w-4 h-4" />
                </span>
              </a>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
