import Link from "next/link";
import { Shield } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-[var(--bg-primary)] relative overflow-hidden">
      {/* Background aesthetics */}
      <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none"></div>
      <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-[var(--accent-primary-glow)] rounded-full blur-[100px] pointer-events-none"></div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <Link href="/" className="flex justify-center items-center space-x-2 mb-6">
          <Shield className="h-8 w-8 text-[var(--accent-primary)] glow-green rounded-full" />
          <span className="font-bold text-2xl tracking-tight text-white inline-block">
            Cyber<span className="text-[var(--accent-primary)]">Ops</span>
          </span>
        </Link>
      </div>

      <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        <div className="bg-[var(--bg-card)] py-8 px-6 sm:px-10 border border-[var(--border-primary)] rounded-xl shadow-2xl relative">
          <div className="absolute -top-px left-6 right-6 h-px bg-gradient-to-r from-transparent via-[var(--accent-primary-dim)] to-transparent"></div>
          {children}
        </div>
      </div>
    </div>
  );
}
