import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Server, GitBranch, Container, Activity, ArrowRight, Check, 
  TrendingUp, DollarSign, Clock, Shield, Zap, Target,
  Rocket, BarChart3, AlertTriangle
} from "lucide-react";
import { SEO } from "@/components/SEO";
import { pagesSEO } from "@/lib/seo-config";

export default function DevOps() {
  const offerings = [
    {
      icon: GitBranch,
      title: "CI/CD Automation",
      description: "Automated pipelines that reduce deployment time from days to minutes while ensuring zero-downtime releases.",
      features: [
        "Automated Testing & Quality Gates", 
        "Zero-Downtime Deployments", 
        "Instant Rollback Capability", 
        "Multi-Environment Orchestration"
      ],
    },
    {
      icon: Container,
      title: "Container Orchestration",
      description: "Enterprise Kubernetes and Docker solutions that scale automatically based on demand.",
      features: [
        "Auto-Scaling Infrastructure", 
        "Microservices Architecture", 
        "Load Balancing & Distribution", 
        "Container Security & Compliance"
      ],
    },
    {
      icon: Server,
      title: "Infrastructure as Code",
      description: "Version-controlled infrastructure using Terraform and Ansible for consistent, reproducible deployments.",
      features: [
        "Automated Provisioning", 
        "Disaster Recovery Systems", 
        "Version-Controlled Infrastructure", 
        "Cost Optimization Automation"
      ],
    },
    {
      icon: Activity,
      title: "Monitoring & Observability",
      description: "Real-time monitoring, intelligent alerting, and comprehensive logging for complete system visibility.",
      features: [
        "24/7 System Monitoring", 
        "Predictive Analytics & AI", 
        "Custom Dashboards & Alerts", 
        "Performance Optimization"
      ],
    },
  ];

  const businessBenefits = [
    {
      icon: TrendingUp,
      title: "80% Faster Time to Market",
      description: "Deploy features and updates in hours instead of weeks, giving you a competitive edge.",
      impact: "Revenue Growth"
    },
    {
      icon: DollarSign,
      title: "60% Cost Reduction",
      description: "Optimize cloud spending with automated resource management and intelligent scaling.",
      impact: "Cost Savings"
    },
    {
      icon: Shield,
      title: "99.99% Uptime Reliability",
      description: "Enterprise-grade reliability with automated failover and disaster recovery systems.",
      impact: "Business Continuity"
    },
    {
      icon: Zap,
      title: "10x Developer Productivity",
      description: "Automation eliminates manual tasks, letting your team focus on innovation.",
      impact: "Team Efficiency"
    },
    {
      icon: AlertTriangle,
      title: "90% Fewer Production Issues",
      description: "Catch bugs before they reach production with automated testing and quality gates.",
      impact: "Quality Assurance"
    },
    {
      icon: Target,
      title: "Real-Time Business Insights",
      description: "Data-driven decisions with comprehensive monitoring and analytics dashboards.",
      impact: "Strategic Advantage"
    },
  ];

  const whyDevOpsMatters = [
    {
      title: "Competitive Advantage",
      description: "Companies with mature DevOps practices deploy 200x more frequently and recover from failures 24x faster than their competitors.",
    },
    {
      title: "Business Continuity",
      description: "Downtime costs businesses an average of $5,600 per minute. Our DevOps ensures your systems stay online when it matters most.",
    },
    {
      title: "Regulatory Compliance",
      description: "Automated compliance checks and audit trails ensure you meet industry standards like SOC 2, HIPAA, and GDPR.",
    },
    {
      title: "Scalability for Growth",
      description: "Handle 10x traffic spikes without manual intervention. Your infrastructure grows automatically with your business.",
    },
  ];

  const tools = [
    { name: "Jenkins", color: "from-red-500 to-orange-500" },
    { name: "GitLab CI/CD", color: "from-orange-500 to-red-600" },
    { name: "Docker", color: "from-blue-400 to-blue-600" },
    { name: "Kubernetes", color: "from-blue-500 to-indigo-600" },
    { name: "Terraform", color: "from-purple-500 to-indigo-600" },
    { name: "Ansible", color: "from-red-600 to-gray-700" },
    { name: "Prometheus", color: "from-orange-400 to-red-500" },
    { name: "Grafana", color: "from-yellow-500 to-orange-600" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title={pagesSEO.devops.title}
        description={pagesSEO.devops.description}
        keywords={pagesSEO.devops.keywords}
      />
      <Navigation />
      
      <main className="flex-1">
        <section className="pt-32 pb-20 md:pt-40 md:pb-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-background to-pink-600/20" />
          <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-full blur-3xl" />
          
          <div className="relative max-w-7xl mx-auto px-6">
            <div className="max-w-5xl">
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 mb-8">
                <Server className="w-5 h-5 text-purple-500" />
                <span className="text-sm font-bold text-purple-600 dark:text-purple-400">DEVOPS AUTOMATION</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-[1.1]">
                <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                  Transform Business Operations
                </span>
                <br />
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  With DevOps Excellence
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-4xl leading-relaxed">
                Enterprise DevOps isn't just about technology—it's about <span className="font-semibold text-foreground">transforming how your business delivers value</span>. 
                Reduce costs by 60%, deploy 80% faster, and achieve 99.99% uptime with our proven DevOps automation.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-5">
                <Button size="lg" asChild className="px-8 py-6 text-lg" data-testid="button-devops-get-started">
                  <a href="#contact">
                    <span className="flex items-center gap-2">
                      Get Started Today
                      <ArrowRight className="w-5 h-5" />
                    </span>
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild className="px-8 py-6 text-lg" data-testid="button-devops-view-solutions">
                  <a href="#benefits">View Business Benefits</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="benefits" className="py-24 md:py-32 bg-muted/30">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Why DevOps is Critical for Your Business</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Modern businesses need speed, reliability, and efficiency. DevOps delivers all three.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {businessBenefits.map((benefit) => {
                const Icon = benefit.icon;
                return (
                  <Card key={benefit.title} className="p-8 hover:shadow-2xl transition-all duration-300 border-2 hover:border-purple-500/50">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-6">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="inline-block px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 text-xs font-bold mb-4">
                      {benefit.impact}
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{benefit.title}</h3>
                    <p className="text-muted-foreground text-lg leading-relaxed">{benefit.description}</p>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-24 md:py-32">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">The Business Impact of DevOps</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Why leading enterprises are investing heavily in DevOps transformation
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {whyDevOpsMatters.map((item) => (
                <Card key={item.title} className="p-10 bg-gradient-to-br from-background to-muted/30" data-testid="item-why-devops">
                  <div className="flex items-start gap-4">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 mt-2 flex-shrink-0" />
                    <div>
                      <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                      <p className="text-muted-foreground text-lg leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 md:py-32 bg-muted/30">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">Our DevOps Solutions</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {offerings.map((offering) => {
                const Icon = offering.icon;
                return (
                  <Card key={offering.title} className="p-10 border-2 hover:border-purple-500/50 transition-all" data-testid={`card-offering-${offering.title.toLowerCase().replace(/\s+/g, '-')}`}>
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center mb-8">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold mb-4">{offering.title}</h3>
                    <p className="text-muted-foreground mb-8 text-lg leading-relaxed">{offering.description}</p>
                    <ul className="space-y-3">
                      {offering.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-3">
                          <Check className="w-5 h-5 text-purple-500 flex-shrink-0" />
                          <span className="text-lg">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-24 md:py-32">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-8">Enterprise DevOps Tools</h2>
                <p className="text-muted-foreground mb-10 text-xl leading-relaxed">
                  We leverage industry-leading platforms to build robust, scalable DevOps pipelines 
                  that transform your software delivery process.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {tools.map((tool) => (
                    <div
                      key={tool.name}
                      className={`px-6 py-4 rounded-xl bg-gradient-to-br ${tool.color} text-white font-bold text-center text-lg shadow-lg hover:scale-105 transition-transform`}
                      data-testid={`badge-tool-${tool.name.toLowerCase().replace(/\s/g, '')}`}
                    >
                      {tool.name}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-3xl p-12">
                <Rocket className="w-16 h-16 text-purple-500 mb-8" />
                <h3 className="text-3xl font-bold mb-6">Ready to Transform Your Business?</h3>
                <p className="text-muted-foreground text-xl mb-8 leading-relaxed">
                  Join hundreds of companies that have accelerated their growth with our DevOps solutions. 
                  Get a free consultation and see how we can help you deploy faster, reduce costs, and scale effortlessly.
                </p>
                <ul className="space-y-4 mb-8">
                  {[
                    "Free DevOps Maturity Assessment",
                    "Custom ROI Analysis",
                    "Migration Strategy & Roadmap",
                    "24/7 Support & Monitoring"
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <Check className="w-6 h-6 text-purple-500" />
                      <span className="text-lg font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 md:py-40 bg-gradient-to-br from-purple-600/20 to-pink-600/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-500/20 to-transparent" />
          <div className="relative max-w-4xl mx-auto px-6 text-center">
            <BarChart3 className="w-20 h-20 text-purple-500 mx-auto mb-8" />
            <h2 className="text-4xl md:text-6xl font-bold mb-8">Start Your DevOps Transformation</h2>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed">
              Let's build an automated, scalable infrastructure that accelerates your business growth.
            </p>
            <Button size="lg" asChild className="px-10 py-7 text-xl" data-testid="button-devops-cta-contact">
              <a href="#contact">
                <span className="flex items-center gap-3">
                  Schedule Free Consultation
                  <ArrowRight className="w-6 h-6" />
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
