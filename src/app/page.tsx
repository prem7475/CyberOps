import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection, FeatureSection, WorkflowSection } from "@/components/landing/sections";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col">
        <HeroSection />
        <FeatureSection />
        <WorkflowSection />

        {/* Simple CTA section */}
        <section className="py-24 bg-gradient-to-b from-[var(--bg-primary)] to-[var(--bg-secondary)] border-b border-[var(--border-primary)] text-center relative overflow-hidden">
          <div className="absolute inset-0 cyber-grid opacity-20"></div>
          <div className="container mx-auto px-4 relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to break the set?</h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto mb-10">
              Join thousands of developers and security professionals learning offensive techniques in a safe, controlled environment.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="/signup">
                {/* Fallback plain button class structure for immediate render without UI lib */}
                <button className="h-12 px-8 rounded-lg border-2 border-[var(--accent-primary)] text-[var(--accent-primary)] bg-transparent hover:bg-[var(--accent-primary)] hover:text-black shadow-[0_0_10px_rgba(0,255,136,0.3)] hover:shadow-[0_0_20px_rgba(0,255,136,0.6)] font-mono uppercase tracking-wider transition-all">
                  Create Free Account
                </button>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
