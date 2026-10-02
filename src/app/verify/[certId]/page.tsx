"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ShieldCheck, Calendar, User, ExternalLink, ShieldAlert, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CertificateVerificationPage() {
  const params = useParams();
  const certId = params.certId as string;

  // Mock verify logic
  const isValid = certId?.length > 10;

  if (!isValid) {
    return (
      <div className="min-h-screen bg-[var(--bg-primary)] flex flex-col items-center justify-center p-6 bg-cyber-grid">
        <div className="text-center max-w-md">
          <ShieldAlert className="w-16 h-16 text-red-500 mx-auto mb-6 drop-shadow-[0_0_12px_rgba(239,68,68,0.4)]" />
          <h1 className="text-2xl font-bold text-white mb-2 tracking-tight">Invalid Certificate</h1>
          <p className="text-[var(--text-secondary)] mb-8">
            The certificate ID <span className="font-mono text-white select-all">{certId}</span> could not be verified in our registry.
          </p>
          <Link href="/">
            <Button variant="outline">Return Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex flex-col items-center justify-center p-6 bg-cyber-grid">
      <div className="max-w-2xl w-full">
        {/* Certificate Card */}
        <div className="bg-[var(--bg-card)] border border-[var(--border-accent)] shadow-[0_0_30px_rgba(0,255,136,0.1)] rounded-2xl overflow-hidden relative">
          <div className="absolute top-0 right-0 p-8 opacity-5 hover:opacity-10 transition-opacity pointer-events-none">
            <ShieldCheck className="w-64 h-64 text-[var(--accent-primary)]" />
          </div>

          <div className="p-8 md:p-12 text-center relative z-10 border-b border-[var(--border-primary)]">
            <BadgeCheck className="w-16 h-16 text-[var(--accent-primary)] mx-auto mb-6 drop-shadow-[0_0_12px_rgba(0,255,136,0.3)]" />
            <div className="text-xs font-mono text-[var(--text-tertiary)] mb-2 uppercase tracking-widest">
              Verified Credential
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-2">
              Offensive Security Fundamentals
            </h1>
            <p className="text-[var(--text-secondary)] mt-4 max-w-lg mx-auto">
              This certificate verifies the successful completion of the learning path, including all practical lab scenarios and exploitation challenges.
            </p>
          </div>

          <div className="p-8 md:p-12 bg-gradient-to-br from-[var(--bg-tertiary)] to-[var(--bg-secondary)] relative z-10">
            <div className="grid sm:grid-cols-2 gap-8">
              <div>
                <div className="text-xs font-mono text-[var(--text-tertiary)] mb-1 flex items-center">
                  <User className="w-3.5 h-3.5 mr-1" /> OPERATOR
                </div>
                <div className="text-xl font-bold text-white font-mono">0xNeo</div>
              </div>

              <div>
                <div className="text-xs font-mono text-[var(--text-tertiary)] mb-1 flex items-center">
                  <Calendar className="w-3.5 h-3.5 mr-1" /> ISSUED ON
                </div>
                <div className="text-xl font-bold text-white font-mono">2026-09-30</div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-[var(--border-primary)]">
              <div className="text-xs font-mono text-[var(--text-tertiary)] mb-1">
                CERTIFICATE ID
              </div>
              <div className="text-sm font-mono text-[var(--text-secondary)] select-all break-all bg-[var(--bg-card)] p-3 rounded border border-[var(--border-primary)] inline-block">
                {certId}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center flex-wrap gap-4 mt-8">
          <Link href="/">
             <Button variant="outline" className="min-w-[200px]">
               Back to Platform
             </Button>
          </Link>
          <Button variant="cyber" className="min-w-[200px]">
            Download PDF
          </Button>
        </div>
      </div>
    </div>
  );
}
