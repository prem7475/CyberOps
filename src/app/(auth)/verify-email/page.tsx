"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { MailCheck, ArrowRight, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "your email";

  return (
    <div className="text-center">
      <div className="w-16 h-16 bg-[var(--accent-primary-muted)] border border-[var(--border-accent)] rounded-full flex items-center justify-center mx-auto mb-6">
        <MailCheck className="w-8 h-8 text-[var(--accent-primary)]" />
      </div>

      <h2 className="text-2xl font-bold tracking-tight text-white mb-2">
        Verify Your Identity
      </h2>

      <p className="text-sm text-[var(--text-secondary)] mb-6">
        We've dispatched a cryptographic verification token to <br />
        <span className="text-[var(--accent-primary)] font-mono font-medium">{email}</span>
      </p>

      <div className="bg-[var(--bg-tertiary)] p-4 rounded-lg border border-[var(--border-secondary)] text-left mb-6">
        <div className="text-xs font-mono text-[var(--text-tertiary)] mb-1">INSTRUCTION:</div>
        <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
          Click the link in the message to activate container spawning privileges. Links expire in 15 minutes.
        </p>
      </div>

      <div className="space-y-3">
        <Link href="/dashboard">
          <Button variant="cyber" className="w-full">
            Simulate Email Click & Enter Dashboard <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>

        <Button variant="ghost" className="w-full text-xs text-[var(--text-tertiary)] flex items-center justify-center">
          <RefreshCw className="w-3 h-3 mr-1" /> Resend verification token
        </Button>
      </div>
    </div>
  );
}
