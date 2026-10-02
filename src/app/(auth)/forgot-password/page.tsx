"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ForgotPasswordPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div>
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold tracking-tight text-white">
          Reset Access Keys
        </h2>
        <p className="text-sm text-[var(--text-secondary)] mt-1">
          Enter your registered address to recover your profile
        </p>
      </div>

      {!submitted ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-[var(--text-tertiary)]" />
              <Input
                type="email"
                placeholder="operator@domain.com"
                className="pl-9"
                required
              />
            </div>
          </div>

          <Button type="submit" variant="cyber" className="w-full mt-2">
            Send Reset Instructions <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </form>
      ) : (
        <div className="text-center py-4">
          <p className="text-sm text-[var(--accent-primary)] mb-4">
            If an account exists with that address, password reset instructions have been dispatched.
          </p>
          <Button variant="secondary" onClick={() => setSubmitted(false)} className="text-xs">
            Send to another address
          </Button>
        </div>
      )}

      <div className="mt-6 text-center">
        <Link
          href="/login"
          className="text-xs text-[var(--text-tertiary)] hover:text-white flex items-center justify-center gap-1"
        >
          <ArrowLeft className="w-3 h-3" /> Back to operator login
        </Link>
      </div>
    </div>
  );
}
