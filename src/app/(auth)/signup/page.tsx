"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, Mail, ArrowRight, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SignupPage() {
  const router = useRouter();
  const [handle, setHandle] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Move to verify email page
    setTimeout(() => {
      setLoading(false);
      router.push(`/verify-email?email=${encodeURIComponent(email)}`);
    }, 1000);
  };

  return (
    <div>
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold tracking-tight text-white">
          Create Operator Account
        </h2>
        <p className="text-sm text-[var(--text-secondary)] mt-1">
          Join the platform and launch your first sandbox
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] mb-1">
            Operator Handle / Call-sign
          </label>
          <div className="relative">
            <User className="absolute left-3 top-2.5 h-4 w-4 text-[var(--text-tertiary)]" />
            <Input
              type="text"
              placeholder="root_zero"
              className="pl-9"
              value={handle}
              onChange={(e) => setHandle(e.target.value)}
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] mb-1">
            Work or Personal Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-2.5 h-4 w-4 text-[var(--text-tertiary)]" />
            <Input
              type="email"
              placeholder="operator@domain.com"
              className="pl-9"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <p className="text-[10px] text-[var(--text-tertiary)] mt-1">
            Verification link will be dispatched to prevent lab resource abuse.
          </p>
        </div>

        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] mb-1">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-2.5 h-4 w-4 text-[var(--text-tertiary)]" />
            <Input
              type="password"
              placeholder="••••••••••••"
              className="pl-9"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="text-xs text-[var(--text-secondary)]">
          By signing up, you acknowledge that all lab exercises are conducted in self-contained educational sandboxes and agree to the{" "}
          <Link href="/terms" className="text-[var(--accent-primary)] hover:underline">
            Authorized Use Policy
          </Link>.
        </div>

        <Button
          type="submit"
          variant="cyber"
          className="w-full mt-2"
          disabled={loading}
        >
          {loading ? "Provisioning Profile..." : "Create Account"}
          {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
        </Button>
      </form>

      <p className="mt-8 text-center text-xs text-[var(--text-tertiary)]">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-[var(--accent-primary)] hover:underline"
        >
          Log in
        </Link>
      </p>
    </div>
  );
}
