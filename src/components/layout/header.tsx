"use client";

import Link from "next/link";
import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--border-primary)] bg-[var(--bg-primary)]/80 backdrop-blur supports-[backdrop-filter]:bg-[var(--bg-primary)]/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <Shield className="h-6 w-6 text-[var(--accent-primary)] glow-green rounded-full" />
          <span className="font-bold text-xl tracking-tight text-white inline-block">
            Cyber<span className="text-[var(--accent-primary)]">Ops</span>
          </span>
        </Link>

        <nav className="hidden md:flex gap-6 items-center flex-1 justify-center">
          <Link href="/paths" className="text-sm font-medium text-[var(--text-secondary)] hover:text-white transition-colors">
            Learning Paths
          </Link>
          <Link href="/business" className="text-sm font-medium text-[var(--text-secondary)] hover:text-white transition-colors">
            For Teams
          </Link>
          <Link href="/pricing" className="text-sm font-medium text-[var(--text-secondary)] hover:text-white transition-colors">
            Pricing
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <Link href="/login" className="hidden sm:inline-block">
            <Button variant="ghost" className="text-sm font-medium">
              Log in
            </Button>
          </Link>
          <Link href="/signup">
            <Button variant="cyber" className="text-sm font-medium text-xs py-1.5 h-auto">
              Start Hacking
            </Button>
          </Link>
        </div>
      </div>
      <div className="scanline"></div>
    </header>
  );
}
