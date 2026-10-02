import Link from "next/link";
import { Shield } from "lucide-react";
import { Github, Twitter, Linkedin } from "@/components/ui/icons";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border-primary)] bg-[var(--bg-secondary)] mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Shield className="h-5 w-5 text-[var(--accent-primary)]" />
              <span className="font-bold text-lg text-white">
                Cyber<span className="text-[var(--accent-primary)]">Ops</span>
              </span>
            </Link>
            <p className="text-sm text-[var(--text-secondary)] mb-4 max-w-xs">
              A premium, hands-on cybersecurity learning & practice platform. Completely real techniques, zero real consequences.
            </p>
            <div className="flex space-x-4">
              <Link href="https://github.com" className="text-[var(--text-tertiary)] hover:text-white transition-colors">
                <Github size={18} />
              </Link>
              <Link href="https://twitter.com" className="text-[var(--text-tertiary)] hover:text-white transition-colors">
                <Twitter size={18} />
              </Link>
              <Link href="https://linkedin.com" className="text-[var(--text-tertiary)] hover:text-white transition-colors">
                <Linkedin size={18} />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Platform</h3>
            <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
              <li><Link href="/paths" className="hover:text-[var(--accent-primary)] transition-colors">Learning Paths</Link></li>
              <li><Link href="/labs" className="hover:text-[var(--accent-primary)] transition-colors">Live Labs</Link></li>
              <li><Link href="/leaderboard" className="hover:text-[var(--accent-primary)] transition-colors">Leaderboard</Link></li>
              <li><Link href="/pricing" className="hover:text-[var(--accent-primary)] transition-colors">Pricing</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
              <li><Link href="/blog" className="hover:text-[var(--accent-primary)] transition-colors">Blog</Link></li>
              <li><Link href="/tools" className="hover:text-[var(--accent-primary)] transition-colors">Tools Reference</Link></li>
              <li><Link href="/community" className="hover:text-[var(--accent-primary)] transition-colors">Community Discord</Link></li>
              <li><Link href="/support" className="hover:text-[var(--accent-primary)] transition-colors">Support</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
              <li><Link href="/terms" className="hover:text-[var(--accent-primary)] transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-[var(--accent-primary)] transition-colors">Privacy Policy</Link></li>
              <li><Link href="/authorized-use" className="hover:text-[var(--accent-primary)] transition-colors">Authorized Use Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[var(--border-primary)] mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-[var(--text-tertiary)]">
          <p>© {new Date().getFullYear()} CyberOps Inc. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Designed for educational purposes only.</p>
        </div>
      </div>
    </footer>
  );
}
