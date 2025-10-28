import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/40 via-transparent to-transparent" />
      
      <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-32 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="space-y-6" data-testid="hero-content">
            <h1 className="text-[32px] md:text-[50px] lg:text-[56px] leading-[44px] md:leading-[64px] lg:leading-[72px] font-medium tracking-tight">
              <span className="text-[#060821]">
                Innovate, Build &
                <br />
                Scale
              </span>
              <br />
              <span className="text-orange-500">
                With Full-Stack{" "}
              </span>
              <span className="text-[#060821]">
                Digital Intelligence
              </span>
            </h1>

            <p className="text-base md:text-lg text-gray-600 max-w-xl leading-relaxed">
              Crafting Intelligent Solutions That Drive Business Growth.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                asChild 
                className="bg-blue-900 hover:bg-blue-800 text-white px-8 py-6 text-base font-semibold rounded-full"
                data-testid="button-hero-speak-expert"
              >
                <Link href="/contact">Speak With Expert</Link>
              </Button>
            </div>
          </div>

          <div className="relative flex items-center justify-center lg:justify-end" data-testid="hero-animation">
            <div className="relative w-full max-w-md aspect-square">
              <div className="absolute inset-0 flex items-center justify-center animate-float">
                <div className="relative w-80 h-80 md:w-96 md:h-96">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 opacity-90 blur-2xl animate-pulse" />
                  
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-600 via-purple-600 to-blue-700 opacity-80 blur-xl" 
                       style={{ clipPath: 'ellipse(50% 40% at 50% 60%)' }} />
                  
                  <div className="absolute inset-8 rounded-full bg-gradient-to-br from-orange-300 via-purple-400 to-blue-500 shadow-2xl">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tl from-transparent via-white/20 to-white/40" />
                    
                    <div className="absolute top-1/4 left-1/4 w-20 h-20 rounded-full bg-white/40 blur-xl" />
                    <div className="absolute bottom-1/3 right-1/3 w-16 h-16 rounded-full bg-white/30 blur-lg" />
                    
                    <div className="absolute inset-0 rounded-full" 
                         style={{
                           background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 50%, rgba(0,0,0,0.2) 100%)',
                         }} />
                  </div>

                  <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-orange-400/20 via-purple-500/20 to-blue-600/20 blur-3xl animate-pulse" 
                       style={{ animationDelay: '1s', animationDuration: '3s' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
