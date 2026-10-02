import Link from "next/link";
import { Terminal, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex flex-col items-center justify-center p-6 bg-cyber-grid">
      <div className="text-center max-w-md">
        <Terminal className="w-16 h-16 text-[var(--accent-red)] mx-auto mb-6" />
        <h1 className="text-[6rem] font-bold text-white leading-none font-mono tracking-tighter shadow-glow-red">
          404
        </h1>
        <h2 className="text-2xl font-bold font-mono text-[var(--text-secondary)] mt-4 mb-4 uppercase tracking-widest">
          Target Not Found
        </h2>
        <p className="text-[var(--text-tertiary)] mb-8 font-mono text-sm leading-relaxed">
           The requested endpoint does not exist. It may have been relocated, restricted, or completely scrubbed from the system architecture.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/">
             <Button variant="outline" className="w-full sm:w-auto">
               <Home className="w-4 h-4 mr-2" /> Return to Base
             </Button>
          </Link>
          <Link href="/dashboard">
             <Button variant="cyber" className="w-full sm:w-auto">
               Open Dashboard
             </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
